import { ArticlesResponse, ArticleSummary } from '@/types/api';

const mockTags = [
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

const mockIcons = [
  { id: 1, name: 'React Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg' },
  { id: 2, name: 'Next.js Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg' },
  { id: 3, name: 'TypeScript Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg' },
  { id: 4, name: 'JavaScript Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg' },
  { id: 5, name: 'CSS Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/css3.svg' },
  { id: 6, name: 'Node.js Logo', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg' }
];

const generateMockArticles = (count: number): ArticleSummary[] => {
  const articles: ArticleSummary[] = [];
  
  for (let i = 1; i <= count; i++) {
    const randomTags = mockTags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
    const randomCategory = mockCategories[Math.floor(Math.random() * mockCategories.length)];
    const randomAuthor = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomIcon = mockIcons[Math.floor(Math.random() * mockIcons.length)];
    
    articles.push({
      id: i,
      title: `技術記事のタイトル ${i}: ${randomTags[0].name}を使った開発手法について`,
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

export const getMockArticles = (page: number = 1, limit: number = 9): ArticlesResponse => {
  const allArticles = generateMockArticles(68); // Total 68 articles for pagination test
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