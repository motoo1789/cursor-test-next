# 管理画面とパスワード認証の設定

## 実装内容

### 作成されたファイル

1. **認証関連**
   - `src/lib/auth.ts` - NextAuth設定（Credentials Provider）
   - `src/lib/password-validation.ts` - OWASP準拠のパスワードバリデーション
   - `src/app/api/auth/[...nextauth]/route.ts` - NextAuth APIルート
   - `src/app/api/auth/register/route.ts` - ユーザー登録APIエンドポイント
   - `src/types/next-auth.d.ts` - NextAuth型定義の拡張
   - `src/components/SessionProvider.tsx` - セッションプロバイダー
   - `src/middleware.ts` - 認証ミドルウェア

2. **UI コンポーネント**
   - `src/components/PasswordStrengthIndicator.tsx` - パスワード強度表示

3. **画面**
   - `src/app/auth/signin/page.tsx` - ログイン・登録画面
   - `src/app/admin/page.tsx` - 管理画面

4. **設定ファイル**
   - `.env.example` - 環境変数の設定例
   - `.env.local` - 開発環境用環境変数

### 機能

- **ログイン・登録画面**
  - ユーザー名/メールアドレス + パスワード認証
  - 新規ユーザー登録機能
  - OWASP準拠のパスワードバリデーション
  - パスワード強度表示
  - パスワード表示/非表示切り替え
  - リアルタイムバリデーション
  - レスポンシブ対応

- **管理画面**
  - article_admin.htmlを参考にしたデザイン
  - 記事一覧の表示
  - 公開/非公開の切り替え
  - 記事の削除機能
  - ユーザー情報の表示とログアウト

- **セキュリティ機能**
  - bcryptによるパスワードハッシュ化
  - OWASP準拠のパスワードポリシー
  - 一般的な弱いパスワードのブロック
  - ユーザー名/メールアドレスを含むパスワードのブロック

## パスワードポリシー (OWASP準拠)

- **最小8文字以上、最大64文字以下**
- **必須文字種**：
  - 小文字 (a-z)
  - 大文字 (A-Z)
  - 数字 (0-9)
  - 特殊文字 (!@#$%^&*()_+-=[]{}|;:,.<>?)
- **禁止事項**：
  - 一般的な弱いパスワード
  - ユーザー名やメールアドレスを含むパスワード

## 設定方法

### 1. データベースの準備

PostgreSQLデータベースが必要です。以下のいずれかの方法で準備してください：

**方法1: Dockerを使用する場合**
```bash
docker run --name postgres-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=article_db -p 5432:5432 -d postgres:15
```

**方法2: ローカルにPostgreSQLをインストール**
- PostgreSQLをインストールして起動
- データベースを作成

### 2. 環境変数の設定

`.env.local`ファイルでデータベース接続情報を設定してください：

```bash
# NextAuth設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this

# データベース設定
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

実際の値に変更してください：
- `username`: PostgreSQLのユーザー名
- `password`: PostgreSQLのパスワード
- `database_name`: 使用するデータベース名

### 3. データベースマイグレーション

データベーススキーマを作成します：

```bash
npx prisma migrate dev --name init-password-auth
npx prisma generate
```

### 4. 依存関係の確認

以下のパッケージがインストール済みです：
- `next-auth` - 認証
- `bcryptjs` - パスワードハッシュ化
- `zod` - バリデーション
- `react-icons` - アイコン

### 5. 開発サーバーの起動

```bash
npm run dev
```

## 使用方法

### 初回セットアップ後の手順

1. **PostgreSQLデータベースを起動**
2. **開発サーバーを起動**: `npm run dev`
3. **ログイン画面にアクセス**: `http://localhost:3000/auth/signin`
4. **新規登録**:
   - 「アカウントをお持ちでない方はこちら」をクリック
   - 必要な情報を入力してアカウント作成
5. **ログイン**: 作成したアカウントでログイン
6. **管理画面**: 認証後、自動的に`/admin`にリダイレクト

## セキュリティ設定

- `/admin`パスは認証が必要
- 未認証の場合、自動的にログイン画面にリダイレクト
- パスワードはbcryptで安全にハッシュ化
- セッション管理はJWTベース
- OWASP準拠のパスワードポリシー

## カスタマイズ

デザインや機能は必要に応じて以下のファイルを編集してください：
- ログイン・登録画面: `src/app/auth/signin/page.tsx`
- 管理画面: `src/app/admin/page.tsx`
- 認証設定: `src/lib/auth.ts`
- パスワードポリシー: `src/lib/password-validation.ts`

## データベース構造

```prisma
// Prismaスキーマ（PostgreSQL）
model User {
  id         String   @id @default(cuid())
  username   String   @unique
  email      String   @unique
  password   String   // bcryptでハッシュ化
  name       String?
  articles   Article[]
  createdAt  DateTime @default(now())
  modifiedAt DateTime @default(now())
}

model Article {
  id         Int      @id @default(autoincrement())
  title      String
  body       String
  like       Int      @default(0)
  published  Boolean  @default(false)
  tags       Tag[]    @relation("ArticleTags")
  author     User     @relation(fields: [authorId], references: [id])
  authorId   String   // User.idを参照
  icon       Icon     @relation(fields: [iconId], references: [id])
  iconId     Int  
  publishedAt DateTime
  createdAt  DateTime @default(now())
  modifiedAt DateTime @default(now())
}

// その他のモデル（Tag, Icon等）も既存のまま
```

### 重要な変更点
- **User.id**: `Int` → `String` (cuid()を使用)
- **Article.authorId**: `Int` → `String` (Userテーブルとの関連)
- **パスワードフィールド追加**: bcryptでハッシュ化されたパスワードを保存