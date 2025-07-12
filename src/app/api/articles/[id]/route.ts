import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 記事詳細取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        tags: true,
        author: true,
        icon: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 記事更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    const { title, body, iconId, tagIds, published, publishedAt } =
      await request.json();

    if (!title || !body || !iconId || !tagIds || tagIds.length === 0) {
      return NextResponse.json(
        { error: "Title, body, iconId, and tagIds are required" },
        { status: 400 }
      );
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        body,
        iconId,
        published,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        tags: {
          set: tagIds.map((tagId: number) => ({ id: tagId })),
        },
      },
      include: {
        tags: true,
        author: true,
        icon: true,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 記事削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
