import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 特定のアイコンを取得する関数
async function getIconById(id: number) {
  try {
    const icon = await prisma.icon.findUnique({
      where: { id },
    });

    if (!icon) {
      return NextResponse.json({ error: "Icon not found" }, { status: 404 });
    }

    return NextResponse.json(icon);
  } catch (error) {
    console.error("Error fetching icon:", error);
    return NextResponse.json(
      { error: "Failed to fetch icon" },
      { status: 500 }
    );
  }
}

// アイコンを更新する関数
async function updateIcon(
  id: number,
  iconData: { name?: string; url?: string }
) {
  try {
    const { name, url } = iconData;

    // 更新するデータが存在するかチェック
    if (!name && !url) {
      return NextResponse.json(
        { error: "At least one field (name or url) is required for update" },
        { status: 400 }
      );
    }

    const icon = await prisma.icon.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(url && { url }),
      },
    });

    return NextResponse.json(icon);
  } catch (error) {
    console.error("Error updating icon:", error);
    return NextResponse.json(
      { error: "Failed to update icon" },
      { status: 500 }
    );
  }
}

// アイコンを削除する関数
async function deleteIcon(id: number) {
  try {
    await prisma.icon.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Icon deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting icon:", error);
    return NextResponse.json(
      { error: "Failed to delete icon" },
      { status: 500 }
    );
  }
}

// Next.js App Router用のGETハンドラー（個別アイコン取得）
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid icon ID" }, { status: 400 });
  }

  return getIconById(parsedId);
}

// Next.js App Router用のPUTハンドラー（アイコン更新）
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid icon ID" }, { status: 400 });
  }

  const body = await request.json();
  return updateIcon(parsedId, body);
}

// Next.js App Router用のDELETEハンドラー（アイコン削除）
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid icon ID" }, { status: 400 });
  }

  return deleteIcon(parsedId);
}
