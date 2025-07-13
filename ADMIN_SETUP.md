# 管理画面とGitHub OAuth認証の設定

## 実装内容

### 作成されたファイル

1. **認証関連**
   - `src/lib/auth.ts` - NextAuth設定
   - `src/app/api/auth/[...nextauth]/route.ts` - NextAuth APIルート
   - `src/types/next-auth.d.ts` - NextAuth型定義の拡張
   - `src/components/SessionProvider.tsx` - セッションプロバイダー
   - `src/middleware.ts` - 認証ミドルウェア

2. **画面**
   - `src/app/auth/signin/page.tsx` - ログイン画面
   - `src/app/admin/page.tsx` - 管理画面

3. **設定ファイル**
   - `.env.example` - 環境変数の設定例
   - `.env.local` - 開発環境用環境変数

### 機能

- **ログイン画面**
  - モダンなデザインのGitHub OAuthログイン
  - レスポンシブ対応
  - ローディング状態の表示

- **管理画面**
  - article_admin.htmlを参考にしたデザイン
  - 記事一覧の表示
  - 公開/非公開の切り替え
  - 記事の削除機能
  - ユーザー情報の表示とログアウト

## 設定方法

### 1. GitHub OAuth アプリケーションの作成

1. GitHub設定 → Developer settings → OAuth Apps → New OAuth App
2. 以下の設定を入力：
   - Application name: `記事管理システム`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### 2. 環境変数の設定

`.env.local`ファイルを編集して、以下の値を設定してください：

```bash
# NextAuth設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this

# GitHub OAuth設定
GITHUB_ID=your-github-app-client-id
GITHUB_SECRET=your-github-app-client-secret

# データベース設定
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### 3. データベースマイグレーション

```bash
npx prisma migrate dev --name add-auth-tables
npx prisma generate
```

### 4. 依存関係の確認

以下のパッケージがインストールされています：
- `next-auth`
- `@next-auth/prisma-adapter`
- `react-icons`

### 5. 開発サーバーの起動

```bash
npm run dev
```

## 使用方法

1. `http://localhost:3000/auth/signin` でログイン画面にアクセス
2. GitHubアカウントでログイン
3. 認証後、自動的に管理画面(`/admin`)にリダイレクト
4. 管理画面で記事の管理が可能

## セキュリティ設定

- `/admin`パスは認証が必要
- 未認証の場合、自動的にログイン画面にリダイレクト
- セッション管理はNextAuthが自動処理

## 注意点

- `NEXTAUTH_SECRET`は本番環境では必ず強力な値に変更してください
- GitHub OAuth設定は実際の値を設定する必要があります
- データベース接続情報も実際の値に変更してください

## カスタマイズ

デザインや機能は必要に応じて以下のファイルを編集してください：
- ログイン画面: `src/app/auth/signin/page.tsx`
- 管理画面: `src/app/admin/page.tsx`
- 認証設定: `src/lib/auth.ts`