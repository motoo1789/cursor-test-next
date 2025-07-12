import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 特定のタグを取得する関数
async function getTagById(id: number) {
  try {
    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error) {
    console.error("Error fetching tag:", error);
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 });
  }
}

// タグを更新する関数
async function updateTag(id: number, tagData: { name?: string }) {
  try {
    const { name } = tagData;

    // 更新するデータが存在するかチェック
    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "name is required for update" },
        { status: 400 }
      );
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(tag);
  } catch (error: any) {
    console.error("Error updating tag:", error);

    // レコードが見つからない場合
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    // ユニーク制約違反の場合
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Tag name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update tag" },
      { status: 500 }
    );
  }
}

// タグを削除する関数
async function deleteTag(id: number) {
  try {
    await prisma.tag.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Tag deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting tag:", error);

    // レコードが見つからない場合
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete tag" },
      { status: 500 }
    );
  }
}

// Next.js App Router用のGETハンドラー（個別タグ取得）
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid tag ID" }, { status: 400 });
  }

  return getTagById(parsedId);
}

// Next.js App Router用のPUTハンドラー（タグ更新）
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid tag ID" }, { status: 400 });
  }

  const body = await request.json();
  return updateTag(parsedId, body);
}

// Next.js App Router用のDELETEハンドラー（タグ削除）
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid tag ID" }, { status: 400 });
  }

  return deleteTag(parsedId);
}
