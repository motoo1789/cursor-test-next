import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// アイコンを作成する関数
async function createIcon(iconData: { name: string; url: string }) {
  try {
    const { name, url } = iconData;

    if (!name || !url) {
      return NextResponse.json(
        { error: "name and url are required" },
        { status: 400 }
      );
    }

    const icon = await prisma.icon.create({
      data: {
        name,
        url,
      },
    });

    return NextResponse.json(icon, { status: 201 });
  } catch (error) {
    console.error("Error creating icon:", error);
    return NextResponse.json(
      { error: "Failed to create icon" },
      { status: 500 }
    );
  }
}

// アイコン一覧を取得する関数
async function getAllIcons() {
  try {
    const icons = await prisma.icon.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(icons);
  } catch (error) {
    console.error("Error fetching icons:", error);
    return NextResponse.json(
      { error: "Failed to fetch icons" },
      { status: 500 }
    );
  }
}

// Next.js App Router用のPOSTハンドラー
export async function POST(request: NextRequest) {
  const body = await request.json();
  return createIcon(body);
}

// Next.js App Router用のGETハンドラー
export async function GET() {
  return getAllIcons();
}
