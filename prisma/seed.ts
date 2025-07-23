import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("シードデータを開始...");

  // ユーザーを作成
  const user1 = await prisma.user.create({
    data: {
      username: "tech_writer",
      email: "tech@example.com",
      password: "hashedpassword123",
      name: "技術太郎",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "dev_guru",
      email: "dev@example.com",
      password: "hashedpassword456",
      name: "開発花子",
    },
  });

  // タグを作成
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: "Next.js" } }),
    prisma.tag.create({ data: { name: "React" } }),
    prisma.tag.create({ data: { name: "TypeScript" } }),
    prisma.tag.create({ data: { name: "JavaScript" } }),
    prisma.tag.create({ data: { name: "CSS" } }),
    prisma.tag.create({ data: { name: "Node.js" } }),
  ]);

  // アイコンを作成
  const icons = await Promise.all([
    prisma.icon.create({
      data: {
        name: "記事",
        url: "/icons/article.svg",
      },
    }),
    prisma.icon.create({
      data: {
        name: "質問",
        url: "/icons/question.svg",
      },
    }),
    prisma.icon.create({
      data: {
        name: "イベント",
        url: "/icons/event.svg",
      },
    }),
  ]);

  // サンプル記事を作成
  await prisma.article.create({
    data: {
      title: "Next.js 15の新機能解説",
      body: `# Next.js 15の新機能解説

## はじめに
Next.js 15では多くの新機能が追加されました。

## 主な新機能
- Turbopackの安定化
- App Routerの改善
- パフォーマンスの向上

## まとめ
Next.js 15は大幅な改善が施されており、開発体験が向上しています。`,
      authorId: user1.id,
      iconId: icons[0].id,
      published: true,
      publishedAt: new Date(),
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[1].id }], // Next.js, React
      },
    },
  });

  await prisma.article.create({
    data: {
      title: "TypeScriptでの型安全な開発手法",
      body: `# TypeScriptでの型安全な開発手法

## TypeScriptとは
TypeScriptはJavaScriptに型システムを追加した言語です。

## 型の定義方法
- プリミティブ型
- オブジェクト型
- 配列型
- 関数型

## まとめ
型安全な開発により、バグの早期発見が可能になります。`,
      authorId: user2.id,
      iconId: icons[0].id,
      published: true,
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1日前
      tags: {
        connect: [{ id: tags[2].id }, { id: tags[3].id }], // TypeScript, JavaScript
      },
    },
  });

  await prisma.article.create({
    data: {
      title: "CSSでのレスポンシブデザイン実装",
      body: `# CSSでのレスポンシブデザイン実装

## レスポンシブデザインとは
様々なデバイスサイズに対応したWebデザインです。

## 実装手法
- Flexbox
- CSS Grid
- Media Queries

## ベストプラクティス
モバイルファーストでの設計を心がけましょう。`,
      authorId: user1.id,
      iconId: icons[0].id,
      published: true,
      publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2日前
      tags: {
        connect: [{ id: tags[4].id }], // CSS
      },
    },
  });

  console.log("シードデータの作成が完了しました！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
