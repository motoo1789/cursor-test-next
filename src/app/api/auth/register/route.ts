import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/password-validation";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // バリデーション
    const validatedFields = registerSchema.safeParse(body);
    
    if (!validatedFields.success) {
      return NextResponse.json(
        { 
          error: "バリデーションエラー",
          details: validatedFields.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { username, email, name, password } = validatedFields.data;

    // 既存ユーザーチェック
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          error: existingUser.username === username 
            ? "このユーザー名は既に使用されています" 
            : "このメールアドレスは既に使用されています"
        },
        { status: 409 }
      );
    }

    // パスワードハッシュ化
    const hashedPassword = await bcrypt.hash(password, 12);

    // ユーザー作成
    const user = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { 
        message: "ユーザーが正常に作成されました",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}