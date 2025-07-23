import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// ユーザー固有の記事一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const articles = await prisma.article.findMany({
      where: {
        authorId: session.user.id,
      },
      include: {
        tags: true,
        author: true,
        icon: true,
      },
      orderBy: {
        modifiedAt: "desc",
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching user articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}