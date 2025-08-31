
'use client';

import { useState } from 'react';
import Header from './components/Header';
import SearchAndFilter from './components/SearchAndFilter';
import ArticleCard from './components/ArticleCard';
import Pagination from './components/Pagination';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

// サンプルデータ
const sampleTags: Tag[] = [
  { id: '1', name: 'Next', color: 'bg-blue-500' },
  { id: '2', name: 'React', color: 'bg-teal-500' },
];

const sampleArticles: Article[] = [
  {
    id: '1',
    title: '記事のタイトル',
    description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。',
  },
  {
    id: '2',
    title: '記事のタイトル',
    description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。',
  },
  {
    id: '3',
    title: '記事のタイトル',
    description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。',
  },
  {
    id: '4',
    title: '記事のタイトル',
    description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。',
  },
  {
    id: '5',
    title: '記事のタイトル',
    description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。',
  },
  {
    id: '6',
    title: '記事のタイトル',
    description: 'ここに記事の短い説明が入ります。読者の興味を引くような内容を記述します。',
  },
];

export default function ArticlesPage() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(sampleTags);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = 68; // サンプルデータ

  const handleTagRemove = (tagId: string) => {
    setSelectedTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleArticleClick = (articleId: string) => {
    // 記事詳細ページへの遷移処理
    console.log('Article clicked:', articleId);
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <SearchAndFilter
          selectedTags={selectedTags}
          onTagRemove={handleTagRemove}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {sampleArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => handleArticleClick(article.id)}
            />
          ))}
        </main>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}