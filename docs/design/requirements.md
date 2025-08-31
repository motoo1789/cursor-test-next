# 概要

- ホームページなどに技術記事の閲覧ページを作成することを想定する
- その技術記事のページに機能一覧のページを作成する

# 機能一覧

## 記事の閲覧者

- 記事一覧表示機能
    - DBの公開日を過ぎているものを表示
    - 公開日が過ぎているものは後悔しない
- 記事検索機能
    - タグ
    - タイトル
- グッド

## 記事作成者側
- 記事作成者には管理画面を用意する、管理画面から以下の機能が使える
- 記事作成（編集も含む）
    - マークダウン
    - 一時保存機能
    - タグ付け
- 記事プレビュー機能
- 記事編集機能
    - 一時保存記事の編集
    - 投稿済みの記事の編集
- 記事公開・非公開機能
- 記事投稿機能
    - 作成した記事の即時公開
    - yyyy-mm-dd HH:MM:SSのフォーマットで予約投稿

## 認証

- 記事作成者はログインをしないといけない
- ログイン方法はgithub

## 追加機能

# 機能詳細

## 記事作成・編集に関して
- タイトル title
- 本文 body
  - マークダウンエディタで本文は作成
    - `@uiw/react-md-editor`　React向け。プレビュー機能・テーマ対応あり
  - マークダウン→HTML
    - [`remark`](https://github.com/remarkjs/remark), [`rehype`](https://github.com/rehypejs/rehype)　セキュアで拡張性高く、よく使われる構成
- 公開フラグ publish
- 公開日　openTime
- 上記の入力を行えるようにする
- 記事編集に関しても同様


## 認証

- NextAuth.js
- 記事のバージョン管理

# テーブル設計

## 記事　article

- id
- タイトル title
- 本文　body
- いいね　like
- タグ　tags
- 公開フラグ boolean or int
- auther
- 公開日　openTime
- 登録日　created
- 編集日　modified

## prisma

```tsx
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Article  {
  id        Int       @id @default(autoincrement())
  title     String
  body      String
  like      Int       @default(0)
  published Boolean   @default(false)
  tags      Tag[]     @relation("ArticleTags")
  author    User      @relation(fields: [authorId], references: [id])
  authorId  Int
  icon Icon  @relation(fields: [iconId], references: [id])
  iconId Int  
  publishedAt  DateTime
  createdAt DateTime  @default(now())
  modifiedAt DateTime @default(now())

}

model Icon {
  id        Int       @id @default(autoincrement())
  name      String
  url       String
  articles  Article[]
}

model Tag {
  id       Int        @id @default(autoincrement())
  name     String     @unique
  articles Article[]  @relation("ArticleTags") // ← Article モデルとリレーション
}

model User {
  id        Int       @id @unique @default(autoincrement())
  githubId  String    @unique
  name      String    @unique
  email     String    @unique
  articles  Article[] 
  createdAt DateTime  @default(now())
  modifiedAt DateTime @default(now())
}
```

# 技術要素

## アプリケーション

- react
- Next.js
- tailwind css
- axios
- Prisma (ORM)

## ストレージ：**Cloudflare R2**

- 10 GB までは無料で利用可能

## データベース

- vercel

## ホスティング

- vercel