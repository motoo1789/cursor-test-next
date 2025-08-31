import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiEye, FiClock, FiUser } from 'react-icons/fi';
import { ArticleSummary } from '@/types/api';

interface ArticleCardProps {
  article: ArticleSummary;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/articles/${article.id}`} className="group">
      <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200 h-full">
        {/* サムネイル画像エリア */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-4xl">{article.category.icon}</div>
          <div className="absolute top-3 right-3">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Image
                src={article.icon.url}
                alt={article.icon.name}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* カテゴリ */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {article.category.name}
            </span>
          </div>

          {/* タイトル */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* 概要 */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* タグ */}
          <div className="flex flex-wrap gap-1 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag.name}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500">
                +{article.tags.length - 3}
              </span>
            )}
          </div>

          {/* 記事情報 */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FiHeart className="w-4 h-4" />
                <span>{article.like}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                <span>{article.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                <span>{article.readingTime}分</span>
              </div>
            </div>
          </div>

          {/* 著者情報 */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
            <Image
              src={article.author.avatarUrl}
              alt={article.author.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {article.author.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}