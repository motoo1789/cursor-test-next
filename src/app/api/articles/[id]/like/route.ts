import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// いいね状態の取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const articleId = parseInt(resolvedParams.id);
    // 仮のユーザーID（実際のアプリでは認証から取得）
    const userId = 1;

    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    // 記事の存在確認
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true, like: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // いいね状態をsessionStorageまたはローカルで管理（簡易実装）
    // 実際のアプリでは UserArticleLike テーブルを作成して管理
    return NextResponse.json({
      totalLikes: article.like,
      isLiked: false, // 仮の値（実際はユーザーのいいね状態を確認）
    });
  } catch (error) {
    console.error("Error fetching like status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// いいねの追加
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const articleId = parseInt(resolvedParams.id);
    // 仮のユーザーID（実際のアプリでは認証から取得）
    const userId = 1;

    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    // 記事の存在確認
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true, like: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // いいね数を増加
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        like: article.like + 1,
      },
      select: { id: true, like: true },
    });

    return NextResponse.json({
      success: true,
      totalLikes: updatedArticle.like,
      isLiked: true,
      message: "記事にいいねしました",
    });
  } catch (error) {
    console.error("Error adding like:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// いいねの削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params;
    const articleId = parseInt(resolvedParams.id);
    // 仮のユーザーID（実際のアプリでは認証から取得）
    const userId = 1;

    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    // 記事の存在確認
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true, like: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // いいね数を減少（0未満にならないように）
    const newLikeCount = Math.max(0, article.like - 1);
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        like: newLikeCount,
      },
      select: { id: true, like: true },
    });

    return NextResponse.json({
      success: true,
      totalLikes: updatedArticle.like,
      isLiked: false,
      message: "いいねを取り消しました",
    });
  } catch (error) {
    console.error("Error removing like:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
