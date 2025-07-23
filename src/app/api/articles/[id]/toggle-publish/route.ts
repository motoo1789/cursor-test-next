import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// 記事の公開状態を切り替え
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    // 記事の所有者チェック
    const existingArticle = await prisma.article.findUnique({
      where: { id },
      select: { authorId: true, published: true },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    if (existingArticle.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: You can only modify your own articles" },
        { status: 403 }
      );
    }

    // 公開状態を切り替え
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        published: !existingArticle.published,
        publishedAt: !existingArticle.published ? new Date() : undefined,
        modifiedAt: new Date(),
      },
      include: {
        tags: true,
        author: true,
        icon: true,
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("Error toggling article publish status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}