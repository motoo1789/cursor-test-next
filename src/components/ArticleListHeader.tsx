import React from 'react';

interface ArticleListHeaderProps {
  title?: string;
}

export const ArticleListHeader: React.FC<ArticleListHeaderProps> = ({ 
  title = "技術記事" 
}) => {
  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold text-purple-700">{title}</h1>
      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
        <svg 
          className="w-6 h-6 text-white" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    </header>
  );
};