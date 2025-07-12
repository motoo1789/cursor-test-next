import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 記事作成
export async function createArticle(request: NextRequest) {
  try {
    const { title, body, authorId, iconId, tagIds, published, publishedAt } =
      await request.json();

    if (
      !title ||
      !body ||
      !authorId ||
      !iconId ||
      !tagIds ||
      tagIds.length === 0
    ) {
      return NextResponse.json(
        { error: "Title, body, authorId, iconId, and tagIds are required" },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        body,
        authorId,
        iconId,
        published,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        tags: {
          connect: tagIds.map((tagId: number) => ({ id: tagId })),
        },
      },
      include: {
        tags: true,
        author: true,
        icon: true,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 記事一覧取得
export async function getAllArticles() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        tags: true,
        author: true,
        icon: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return createArticle(request);
}

export async function GET() {
  return getAllArticles();
}
