import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 記事を作成する関数
async function createArticle(articleData: {
  title: string;
  body: string;
  authorId: number;
  iconId: number;
  tagIds: number[];
  published: boolean;
  publishedAt: string;
}) {
  try {
    const { title, body, authorId, iconId, tagIds, published, publishedAt } =
      articleData;

    if (!title || !body || !authorId || !iconId) {
      return NextResponse.json(
        { error: "title, body, authorId, and iconId are required" },
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
        publishedAt: new Date(publishedAt),
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
      },
      include: {
        tags: true,
        author: true,
        icon: true,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    console.error("Error creating article:", error);

    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

// 記事一覧を取得する関数
async function getAllArticles() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        tags: true,
        author: true,
        icon: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// Next.js App Router用のPOSTハンドラー
export async function POST(request: NextRequest) {
  const body = await request.json();
  return createArticle(body);
}

// Next.js App Router用のGETハンドラー
export async function GET() {
  return getAllArticles();
}
