import ArticleCard from './ArticleCard';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: string;
  views: number;
  imageUrl?: string;
}

interface ArticleGridNewProps {
  articles: Article[];
  isLoading?: boolean;
}

// Sample data for demonstration
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Next.js 15の新機能について詳しく解説',
    excerpt: 'Next.js 15がリリースされ、多くの新機能が追加されました。App Routerの改善、パフォーマンスの向上、新しいAPIについて詳しく解説します。',
    author: '田中太郎',
    publishedAt: '2024年1月15日',
    category: 'テクノロジー',
    tags: ['Next.js', 'React', 'JavaScript'],
    readTime: '5分',
    views: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop'
  },
  {
    id: '2',
    title: 'Tailwind CSSでモダンなUIを作る方法',
    excerpt: 'Tailwind CSSを使ってモダンで美しいUIを効率的に作成する方法について、実際のコード例とともに詳しく説明します。',
    author: '佐藤花子',
    publishedAt: '2024年1月12日',
    category: 'デザイン',
    tags: ['CSS', 'Tailwind', 'UI/UX'],
    readTime: '8分',
    views: 980,
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop'
  },
  {
    id: '3',
    title: 'TypeScriptの型安全性を活用したReact開発',
    excerpt: 'TypeScriptの強力な型システムを活用して、より安全で保守性の高いReactアプリケーションを開発する方法を解説します。',
    author: '鈴木一郎',
    publishedAt: '2024年1月10日',
    category: 'テクノロジー',
    tags: ['TypeScript', 'React', '型安全性'],
    readTime: '12分',
    views: 1580,
  },
  {
    id: '4',
    title: 'フロントエンド開発者のためのパフォーマンス最適化',
    excerpt: 'Webアプリケーションのパフォーマンスを向上させるための実践的なテクニックと最適化手法について詳しく解説します。',
    author: '山田美咲',
    publishedAt: '2024年1月8日',
    category: 'テクノロジー',
    tags: ['パフォーマンス', 'Web開発', '最適化'],
    readTime: '10分',
    views: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop'
  },
  {
    id: '5',
    title: 'デザインシステムの構築と運用',
    excerpt: 'スケーラブルなデザインシステムを構築し、チーム全体で効果的に運用するためのベストプラクティスを紹介します。',
    author: '高橋健太',
    publishedAt: '2024年1月5日',
    category: 'デザイン',
    tags: ['デザインシステム', 'UI/UX', 'チーム開発'],
    readTime: '15分',
    views: 1750,
    imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&h=450&fit=crop'
  },
  {
    id: '6',
    title: 'モバイルファーストなレスポンシブデザイン',
    excerpt: 'モバイルファーストのアプローチでレスポンシブなWebサイトを設計・実装する際のポイントと実践的なテクニックを解説します。',
    author: '伊藤優子',
    publishedAt: '2024年1月3日',
    category: 'デザイン',
    tags: ['レスポンシブ', 'モバイル', 'CSS'],
    readTime: '7分',
    views: 1320,
  },
];

export default function ArticleGridNew({ articles = sampleArticles, isLoading = false }: ArticleGridNewProps) {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">記事が見つかりません</h3>
          <p className="text-gray-600">検索条件を変更して再度お試しください。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            excerpt={article.excerpt}
            author={article.author}
            publishedAt={article.publishedAt}
            category={article.category}
            tags={article.tags}
            readTime={article.readTime}
            views={article.views}
            imageUrl={article.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}