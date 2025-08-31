import React from 'react';

interface Article {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
}

interface ArticleCardProps {
  article: Article;
  onClick?: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onClick 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(article.id);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* アイコン表示エリア */}
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        {article.iconUrl ? (
          <img 
            src={article.iconUrl} 
            alt={article.title}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">アイコン</span>
          </div>
        )}
      </div>
      
      {/* 記事情報 */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {article.title}
        </h2>
        <p className="text-gray-600 text-sm">
          {article.description}
        </p>
      </div>
    </div>
  );
};