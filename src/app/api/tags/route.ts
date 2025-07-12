import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// タグを作成する関数
async function createTag(tagData: { name: string }) {
  try {
    const { name } = tagData;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const tag = await prisma.tag.create({
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error: any) {
    console.error("Error creating tag:", error);

    // ユニーク制約違反の場合
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Tag name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 }
    );
  }
}

// タグ一覧を取得する関数
async function getAllTags() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

// Next.js App Router用のPOSTハンドラー
export async function POST(request: NextRequest) {
  const body = await request.json();
  return createTag(body);
}

// Next.js App Router用のGETハンドラー
export async function GET() {
  return getAllTags();
}
