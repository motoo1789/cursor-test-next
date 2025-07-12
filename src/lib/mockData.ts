import { ArticlesResponse, ArticleSummary, ArticleDetail } from '@/types/api';

export const mockTags = [
  { id: 1, name: 'Next.js', description: 'Next.jsに関する記事', color: '#000000', articleCount: 15 },
  { id: 2, name: 'React', description: 'Reactに関する記事', color: '#61DAFB', articleCount: 25 },
  { id: 3, name: 'TypeScript', description: 'TypeScriptに関する記事', color: '#3178C6', articleCount: 20 },
  { id: 4, name: 'JavaScript', description: 'JavaScriptに関する記事', color: '#F7DF1E', articleCount: 30 },
  { id: 5, name: 'CSS', description: 'CSSに関する記事', color: '#1572B6', articleCount: 18 },
  { id: 6, name: 'Node.js', description: 'Node.jsに関する記事', color: '#339933', articleCount: 12 }
];

const mockCategories = [
  { id: 1, name: 'フロントエンド', description: 'フロントエンド技術', icon: 'web', articleCount: 45 },
  { id: 2, name: 'バックエンド', description: 'バックエンド技術', icon: 'storage', articleCount: 30 },
  { id: 3, name: 'DevOps', description: 'DevOps関連技術', icon: 'cloud', articleCount: 15 }
];

const mockUsers = [
  { id: 1, githubId: 'developer1', name: '田中太郎', email: 'tanaka@example.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka', bio: 'フロントエンドエンジニア', website: 'https://tanaka.dev', createdAt: '2023-01-01T00:00:00Z', modifiedAt: '2023-01-01T00:00:00Z' },
  { id: 2, githubId: 'developer2', name: '佐藤花子', email: 'sato@example.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato', bio: 'フルスタック開発者', website: 'https://sato.dev', createdAt: '2023-01-01T00:00:00Z', modifiedAt: '2023-01-01T00:00:00Z' },
  { id: 3, githubId: 'developer3', name: '山田次郎', email: 'yamada@example.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yamada', bio: 'バックエンドエンジニア', website: 'https://yamada.dev', createdAt: '2023-01-01T00:00:00Z', modifiedAt: '2023-01-01T00:00:00Z' }
];

export const mockIcons = [
  { id: 1, name: 'React Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg' },
  { id: 2, name: 'Next.js Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg' },
  { id: 3, name: 'TypeScript Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg' },
  { id: 4, name: 'JavaScript Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg' },
  { id: 5, name: 'CSS Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/css3.svg' },
  { id: 6, name: 'Node.js Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg' }
];

const generateMockArticles = (count: number): ArticleSummary[] => {
  const articles: ArticleSummary[] = [];
  
  // 多様なタイトルパターンを定義
  const titlePatterns = [
    '{tag}を使った実践的な開発手法',
    '{tag}で始めるモダンフロントエンド開発',
    '{tag}のパフォーマンス最適化テクニック',
    '{tag}を活用したWebアプリケーション構築',
    '{tag}の基礎から応用まで',
    '{tag}でのコンポーネント設計パターン',
    '{tag}を使ったAPIの設計と実装',
    '{tag}でのテスト駆動開発',
    '{tag}のエラーハンドリング完全ガイド',
    '{tag}を使った型安全な開発手法',
    '{tag}によるレスポンシブデザインの実装',
    '{tag}を活用したSEO対策',
    '{tag}でのWebパフォーマンス改善',
    '{tag}を使ったマイクロフロントエンド設計',
    '{tag}でのCI/CD構築方法'
  ];
  
  for (let i = 1; i <= count; i++) {
    const randomTags = mockTags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
    const randomCategory = mockCategories[Math.floor(Math.random() * mockCategories.length)];
    const randomAuthor = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomIcon = mockIcons[Math.floor(Math.random() * mockIcons.length)];
    const randomTitlePattern = titlePatterns[Math.floor(Math.random() * titlePatterns.length)];
    
    articles.push({
      id: i,
      title: randomTitlePattern.replace('{tag}', randomTags[0].name),
      excerpt: `この記事では${randomTags[0].name}を使用した実践的な開発手法について詳しく解説します。初心者から上級者まで役立つ内容を網羅しており、実際のプロジェクトで活用できる知識を提供します。`,
      like: Math.floor(Math.random() * 100) + 1,
      views: Math.floor(Math.random() * 1000) + 50,
      tags: randomTags,
      category: randomCategory,
      author: randomAuthor,
      icon: randomIcon,
      publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      readingTime: Math.floor(Math.random() * 15) + 3
    });
  }
  
  return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const getMockArticles = (
  page: number = 1, 
  limit: number = 9, 
  query?: string, 
  tagNames?: string[]
): ArticlesResponse => {
  let allArticles = generateMockArticles(68); // Total 68 articles for pagination test
  
  // タグによるフィルタリング
  if (tagNames && tagNames.length > 0) {
    allArticles = allArticles.filter(article => 
      tagNames.some(tagName => 
        article.tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())
      )
    );
  }
  
  // タイトルによる検索
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    allArticles = allArticles.filter(article => {
      // タイトルに検索語が含まれているかチェック
      const titleMatch = article.title.toLowerCase().includes(searchTerm);
      
      // タグに検索語が含まれているかチェック
      const tagMatch = article.tags.some(tag => 
        tag.name.toLowerCase().includes(searchTerm)
      );
      
      // 概要に検索語が含まれているかチェック
      const excerptMatch = article.excerpt.toLowerCase().includes(searchTerm);
      
      return titleMatch || tagMatch || excerptMatch;
    });
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const articles = allArticles.slice(startIndex, endIndex);
  
  return {
    articles,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(allArticles.length / limit),
      totalItems: allArticles.length,
      hasNext: endIndex < allArticles.length,
      hasPrev: page > 1
    }
  };
};

export const getMockArticleDetail = (id: number) => {
  const allArticles = generateMockArticles(68);
  const article = allArticles.find(a => a.id === id);
  
  if (!article) {
    return null;
  }
  
  return {
    ...article,
    summary: `この記事では${article.tags[0].name}を使用した実践的な開発手法について詳しく解説します。初心者から上級者まで役立つ内容を網羅しており、実際のプロジェクトで活用できる知識を提供します。プロジェクトの設計から実装、デプロイまでの一連の流れを通して、実践的なスキルを身につけることができます。また、トラブルシューティングやパフォーマンス最適化についても触れており、実務で直面する可能性のある課題に対する解決策も提供します。`,
    techStack: article.tags.map(tag => tag.name),
    content: `# ${article.title}

## はじめに

本記事では、${article.tags[0].name}を使用した現代的な開発手法について詳しく解説していきます。実際のプロジェクトで活用できる実践的な内容を中心に、基礎から応用まで幅広くカバーしています。

## 基本的な概念

${article.tags[0].name}は現代のWeb開発において非常に重要な技術の一つです。その特徴や利点について詳しく見ていきましょう。

### 主な特徴

1. **高いパフォーマンス**: 最適化された実行速度により、ユーザー体験を向上させます
2. **開発者体験**: 豊富なツールとエコシステムにより、効率的な開発が可能です
3. **拡張性**: 大規模なアプリケーション開発にも対応できる設計となっています

## 実装例

以下は実際の実装例です：

\`\`\`javascript
// サンプルコード
function example() {
  console.log('Hello, ${article.tags[0].name}!');
  return true;
}
\`\`\`

## パフォーマンス最適化

実際のプロジェクトでは、パフォーマンスの最適化が重要になります。以下のポイントに注意して実装を進めましょう。

### 最適化のポイント

- **バンドルサイズの最適化**: 不要なコードを削減し、必要な機能のみを含める
- **レンダリングの最適化**: 効率的なレンダリング戦略を採用する
- **キャッシュ戦略**: 適切なキャッシュ戦略により、パフォーマンスを向上させる

## トラブルシューティング

開発中によく遭遇する問題とその解決策について説明します。

### よくある問題

1. **設定ミス**: 設定ファイルの記述ミスによる動作不良
2. **依存関係の競合**: パッケージ間の依存関係による問題
3. **デプロイ時のエラー**: 本番環境特有の問題

## まとめ

${article.tags[0].name}を使用した開発について、基礎から実践的な内容まで幅広く解説しました。これらの知識を活用して、より良いアプリケーション開発に取り組んでください。

今後もこの技術は進化し続けることが予想されるため、継続的な学習と実践が重要です。`
  };
};