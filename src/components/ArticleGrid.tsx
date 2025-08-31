import ArticleCard from './ArticleCard';

interface Article {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          description={article.description}
          icon={article.icon}
        />
      ))}
    </main>
  );
}