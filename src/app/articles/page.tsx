'use client';

import { useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import SearchSection from '@/components/SearchSection';
import Pagination from '@/components/Pagination';

// 記事データの型定義
interface Article {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

// タグの型定義
interface Tag {
  id: number;
  name: string;
  color: string;
}

export default function ArticlesPage() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([
    { id: 1, name: 'Next', color: 'bg-blue-500' },
    { id: 2, name: 'React', color: 'bg-teal-500' }
  ]);
  const [searchText, setSearchText] = useState('');
  const [hintSearchText, setHintSearchText] = useState('');

  // サンプル記事データ
  const articles: Article[] = [
    {
      id: 1,
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: 2,
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: 3,
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: 4,
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: 5,
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    },
    {
      id: 6,
      title: '記事のタイトル',
      description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。'
    }
  ];

  // タグを削除する関数
  const removeTag = (tagId: number) => {
    setSelectedTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-purple-700">技術記事</h1>
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </header>

        {/* 検索エリア */}
        <SearchSection
          selectedTags={selectedTags}
          onRemoveTag={removeTag}
          searchText={searchText}
          onSearchTextChange={setSearchText}
          hintSearchText={hintSearchText}
          onHintSearchTextChange={setHintSearchText}
        />

        {/* 記事カードグリッド */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {articles.map(article => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              icon={article.icon}
            />
          ))}
        </main>

        {/* ページネーション */}
        <Pagination 
          currentPage={1}
          totalPages={68}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
      </div>
    </div>
  );
}