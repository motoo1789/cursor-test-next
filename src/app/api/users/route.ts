import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ユーザーを作成する関数
async function createUser(userData: {
  githubId: string;
  name: string;
  email: string;
}) {
  try {
    const { githubId, name, email } = userData;

    if (!githubId || !name || !email) {
      return NextResponse.json(
        { error: "githubId, name, and email are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        githubId,
        name,
        email,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);

    // ユニーク制約違反の場合
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "User with this githubId, name, or email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// ユーザー一覧を取得する関数
async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// Next.js App Router用のPOSTハンドラー
export async function POST(request: NextRequest) {
  const body = await request.json();
  return createUser(body);
}

// Next.js App Router用のGETハンドラー
export async function GET() {
  return getAllUsers();
}
