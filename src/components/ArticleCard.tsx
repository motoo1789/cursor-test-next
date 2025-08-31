import Link from 'next/link';
import { FiCalendar, FiUser, FiTag, FiEye } from 'react-icons/fi';

interface ArticleCardProps {
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

export default function ArticleCard({
  id,
  title,
  excerpt,
  author,
  publishedAt,
  category,
  tags,
  readTime,
  views,
  imageUrl,
}: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 overflow-hidden group">
      <Link href={`/articles/${id}`} className="block">
        {/* Image Section */}
        {imageUrl ? (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-4xl text-gray-400">📄</div>
          </div>
        )}
        
        {/* Content Section */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {category}
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h2>
          
          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs text-gray-600 bg-gray-100"
                >
                  <FiTag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-gray-500">+{tags.length - 3}</span>
              )}
            </div>
          )}
          
          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FiUser className="h-4 w-4 mr-1" />
                <span>{author}</span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="h-4 w-4 mr-1" />
                <span>{publishedAt}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span>{readTime}</span>
              <div className="flex items-center">
                <FiEye className="h-4 w-4 mr-1" />
                <span>{views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}