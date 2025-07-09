# 記事検索機能の実装

## 概要

記事一覧画面に、タイトルとタグによる検索機能を実装しました。現在データベースに接続していないため、モックデータを使用して動作します。

## 実装した機能

### 1. 検索バー
- **リアルタイム検索**: テキスト入力時に即座に結果がフィルタリングされます
- **検索対象**: 記事のタイトル、タグ名、概要文
- **プレースホルダー**: 「記事のタイトル、タグ、内容で検索...」

### 2. タグフィルタリング
- **利用可能なタグ**: Next.js, React, TypeScript, JavaScript, CSS, Node.js
- **タグ選択**: ボタンクリックで簡単にタグを追加
- **タグ削除**: 選択されたタグの「×」ボタンで削除
- **カスタムタグ**: 新しいタグ名を入力してEnterキーで追加可能

### 3. 視覚的フィードバック
- **選択中のタグ表示**: 色分けされたタグラベル
- **ホバーエフェクト**: ボタンやタグにホバー時の視覚効果
- **無効化状態**: 既に選択済みのタグは無効化表示

## 技術実装詳細

### モディファイされたファイル

1. **`src/types/api.ts`**
   - `ArticlesParams`インターフェースに`query`プロパティを追加

2. **`src/lib/api.ts`**
   - `getArticles`関数に検索クエリパラメータを追加
   - モックデータ関数への検索条件の受け渡し

3. **`src/lib/mockData.ts`**
   - `getMockArticles`関数の検索機能実装
   - タイトル、タグ、概要による柔軟な検索
   - 大文字小文字を無視した部分一致検索
   - より多様なタイトルパターンの追加

4. **`src/app/articles/page.tsx`**
   - 検索クエリをAPI呼び出しに追加
   - リアルタイム検索のためのuseEffect最適化

5. **`src/components/SearchSection.tsx`**
   - 完全にリニューアルしたUI/UX
   - リアルタイム検索機能
   - タグ選択・削除機能
   - カスタムタグ追加機能

### 検索ロジック

```typescript
// タイトル、タグ、概要のいずれかに検索語が含まれているかチェック
const searchTerm = query.toLowerCase().trim();
allArticles = allArticles.filter(article => {
  const titleMatch = article.title.toLowerCase().includes(searchTerm);
  const tagMatch = article.tags.some(tag => 
    tag.name.toLowerCase().includes(searchTerm)
  );
  const excerptMatch = article.excerpt.toLowerCase().includes(searchTerm);
  
  return titleMatch || tagMatch || excerptMatch;
});
```

### タグフィルタリングロジック

```typescript
// 選択されたタグのいずれかを持つ記事をフィルタリング
if (tagNames && tagNames.length > 0) {
  allArticles = allArticles.filter(article => 
    tagNames.some(tagName => 
      article.tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())
    )
  );
}
```

## 使用方法

### 基本検索
1. 検索バーに任意のキーワードを入力
2. リアルタイムで結果が絞り込まれます
3. Enterキーまたは検索ボタンで明示的な検索も可能

### タグフィルタリング
1. 「タグで絞り込み」エリアで希望のタグをクリック
2. 複数のタグを選択可能（OR条件）
3. 選択したタグの「×」ボタンで削除

### カスタムタグ追加
1. 「タグ名を入力してEnterで追加」フィールドに新しいタグ名を入力
2. Enterキーで追加

## モックデータの特徴

- **記事数**: 68件のサンプル記事
- **タイトル**: 15種類の多様なパターン
- **タグ**: 6種類の技術タグ（Next.js, React, TypeScript, JavaScript, CSS, Node.js）
- **著者**: 3名のサンプル著者
- **カテゴリ**: フロントエンド、バックエンド、DevOps

## 検索可能なキーワード例

- **技術名**: "React", "Next.js", "TypeScript"
- **開発手法**: "パフォーマンス", "テスト", "設計"
- **具体的なトピック**: "API", "コンポーネント", "CI/CD"

## 今後の拡張可能性

1. **ソート機能**: 日付、人気度、読了時間でのソート
2. **カテゴリフィルタ**: カテゴリによる絞り込み
3. **著者フィルタ**: 特定の著者による絞り込み
4. **高度な検索**: AND/OR条件の組み合わせ
5. **検索履歴**: 過去の検索クエリの保存・再利用
6. **検索候補**: 入力中の検索候補表示