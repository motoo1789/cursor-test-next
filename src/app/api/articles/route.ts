import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 記事作成
export async function createArticle(request: NextRequest) {
  try {
    const { title, body, authorId, iconId, tagIds, published, publishedAt } =
      await request.json();

    console.log("Create article request data:", {
      title,
      body: body?.substring(0, 50) + "...",
      authorId,
      iconId,
      tagIds,
      published,
      publishedAt,
    });

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

    // データの存在確認
    const authorExists = await prisma.user.findUnique({
      where: { id: String(authorId) },
    });
    console.log("Author exists:", !!authorExists, "AuthorId:", authorId);

    const iconExists = await prisma.icon.findUnique({
      where: { id: Number(iconId) },
    });
    console.log("Icon exists:", !!iconExists, "IconId:", iconId);

    const existingTags = await prisma.tag.findMany({
      where: { id: { in: tagIds.map((id: any) => Number(id)) } },
    });
    console.log(
      "Existing tags:",
      existingTags.map((t) => ({ id: t.id, name: t.name })),
      "Requested tagIds:",
      tagIds
    );

    if (!authorExists) {
      return NextResponse.json(
        { error: `Author with id ${authorId} does not exist` },
        { status: 400 }
      );
    }

    if (!iconExists) {
      return NextResponse.json(
        { error: `Icon with id ${iconId} does not exist` },
        { status: 400 }
      );
    }

    if (existingTags.length !== tagIds.length) {
      return NextResponse.json(
        {
          error: `Some tags do not exist. Found: ${existingTags.length}, Expected: ${tagIds.length}`,
        },
        { status: 400 }
      );
    }

    // 型を明示的に変換
    const article = await prisma.article.create({
      data: {
        title: String(title),
        body: String(body),
        authorId: String(authorId), // Stringに変換
        iconId: Number(iconId), // 念のため数値に変換
        published: Boolean(published),
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        tags: {
          connect: tagIds.map((tagId: number) => ({ id: Number(tagId) })),
        },
      },
      include: {
        tags: true,
        author: true,
        icon: true,
      },
    });

    console.log("Article created successfully:", article.id);
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    console.error("Error details:", error instanceof Error ? error.message : "Unknown error");
    
    if (error instanceof Error && error.message.includes("Foreign key constraint")) {
      return NextResponse.json(
        { error: "データの関連性エラー: 指定されたユーザー、アイコン、またはタグが存在しません" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: "記事の作成に失敗しました",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// 記事一覧取得
export async function getAllArticles() {
  try {
    console.log("Fetching articles from database...");

    // まずデータベース接続をテスト
    await prisma.$connect();
    console.log("Database connected successfully");

    const articles = await prisma.article.findMany({
      where: {
        published: true, // 公開されている記事のみ
        publishedAt: {
          lte: new Date(), // 公開日時が現在時刻以前
        },
      },
      include: {
        tags: true,
        author: true,
        icon: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    console.log(`Found ${articles.length} articles`);
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Detailed error fetching articles:", error);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
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
