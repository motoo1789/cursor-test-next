import Link from 'next/link';
import { Article, User, Tag, Icon } from '@prisma/client';

type ArticleWithRelations = Article & {
  author: User;
  tags: Tag[];
  icon: Icon;
};

interface ArticleCardProps {
  article: ArticleWithRelations;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link 
      href={`/articles/${article.id}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden"
    >
      {/* アイコン画像 */}
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        {article.icon?.url ? (
          <img 
            src={article.icon.url} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-4xl">📄</div>
          </div>
        )}
      </div>

      {/* コンテンツエリア */}
      <div className="p-6">
        {/* タイトル */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        {/* 本文プレビュー */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.body.replace(/<[^>]*>/g, '').substring(0, 150)}...
        </p>

        {/* タグ */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag.id}
              className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="text-gray-500 text-xs">+{article.tags.length - 3}</span>
          )}
        </div>

        {/* メタ情報 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>{article.author.name || article.author.username}</span>
            <span>•</span>
            <time dateTime={article.publishedAt.toISOString()}>
              {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <span>❤️</span>
            <span>{article.like}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}