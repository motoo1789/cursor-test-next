import ArticleCardNew from './ArticleCardNew';

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface ArticleGridNewProps {
  articles?: Article[];
  className?: string;
  onArticleClick?: (articleId: string) => void;
}

export default function ArticleGridNew({ 
  articles = [],
  className = "",
  onArticleClick 
}: ArticleGridNewProps) {
  // Default articles if none provided (matching the design)
  const defaultArticles: Article[] = Array.from({ length: 6 }, (_, index) => ({
    id: `article-${index + 1}`,
    title: "記事のタイトル",
    description: "ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。"
  }));

  const displayArticles = articles.length > 0 ? articles : defaultArticles;

  return (
    <main className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 ${className}`}>
      {displayArticles.map((article) => (
        <ArticleCardNew
          key={article.id}
          title={article.title}
          description={article.description}
          imageUrl={article.imageUrl}
          onClick={() => onArticleClick?.(article.id)}
        />
      ))}
    </main>
  );
}