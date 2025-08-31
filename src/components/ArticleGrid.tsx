import React from 'react';
import { ArticleCard } from './ArticleCard';

interface Article {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
}

interface ArticleGridProps {
  articles?: Article[];
  onArticleClick?: (articleId: string) => void;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ 
  articles = [
    {
      id: '1',
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: '2',
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: '3',
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: '4',
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: '5',
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: '6',
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    }
  ],
  onArticleClick 
}) => {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {articles.map((article) => (
        <ArticleCard 
          key={article.id}
          article={article}
          onClick={onArticleClick}
        />
      ))}
    </main>
  );
};