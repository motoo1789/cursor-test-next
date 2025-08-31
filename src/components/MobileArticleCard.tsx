import Link from 'next/link';
import { Article, User, Tag, Icon } from '@prisma/client';

type ArticleWithRelations = Article & {
  author: User;
  tags: Tag[];
  icon: Icon;
};

interface MobileArticleCardProps {
  article: ArticleWithRelations;
}

export default function MobileArticleCard({ article }: MobileArticleCardProps) {
  return (
    <Link 
      href={`/articles/${article.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex gap-4">
        {/* アイコン画像（モバイル用は小さめ） */}
        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
          {article.icon?.url ? (
            <img 
              src={article.icon.url} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-gray-400 text-xl">📄</div>
            </div>
          )}
        </div>

        {/* コンテンツ */}
        <div className="flex-1 min-w-0">
          {/* タイトル */}
          <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
            {article.title}
          </h3>

          {/* メタ情報 */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>{article.author.name || article.author.username}</span>
            <span>•</span>
            <time dateTime={article.publishedAt.toISOString()}>
              {new Date(article.publishedAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
            </time>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>❤️</span>
              <span>{article.like}</span>
            </div>
          </div>

          {/* タグ（最大2個） */}
          <div className="flex gap-1">
            {article.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag.id}
                className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full"
              >
                {tag.name}
              </span>
            ))}
            {article.tags.length > 2 && (
              <span className="text-gray-400 text-xs">+{article.tags.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}