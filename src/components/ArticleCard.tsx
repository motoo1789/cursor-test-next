import { ArticleSummary } from '@/types/api';
import Link from 'next/link';

interface ArticleCardProps {
  article: ArticleSummary;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/articles/${article.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* アイコン表示エリア */}
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        {article.icon?.url ? (
          <img 
            src={article.icon.url} 
            alt={article.icon.name}
            className="w-24 h-24 object-cover rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">アイコン</span>
          </div>
        )}
      </div>

      {/* 記事情報 */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {article.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* メタ情報 */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="flex items-center">
            <span className="material-icons text-xs mr-1">person</span>
            {article.author.name}
          </span>
          <span className="flex items-center">
            <span className="material-icons text-xs mr-1">schedule</span>
            {article.readingTime}分
          </span>
        </div>

        {/* 統計情報 */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="flex items-center">
            <span className="material-icons text-xs mr-1">favorite</span>
            {article.like}
          </span>
          <span className="flex items-center">
            <span className="material-icons text-xs mr-1">visibility</span>
            {article.views}
          </span>
          <span className="text-xs">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="px-2 py-1 text-xs rounded-full text-white"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-300 text-gray-700">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}