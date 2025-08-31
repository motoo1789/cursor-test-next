import React, { useState } from 'react';
import { ArticleListHeader } from './ArticleListHeader';
import { SearchFilters } from './SearchFilters';
import { ArticleGrid } from './ArticleGrid';
import { ArticlePagination } from './ArticlePagination';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
}

interface ArticleListPageProps {
  articles?: Article[];
  tags?: Tag[];
  currentPage?: number;
  totalPages?: number;
  onSearch?: (query: string) => void;
  onTagRemove?: (tagId: string) => void;
  onPageChange?: (page: number) => void;
  onArticleClick?: (articleId: string) => void;
}

export const ArticleListPage: React.FC<ArticleListPageProps> = ({
  articles,
  tags,
  currentPage = 1,
  totalPages = 68,
  onSearch,
  onTagRemove,
  onPageChange,
  onArticleClick
}) => {
  const [activeTags, setActiveTags] = useState<Tag[]>(
    tags || [
      { id: '1', name: 'Next', color: 'bg-blue-500' },
      { id: '2', name: 'React', color: 'bg-teal-500' }
    ]
  );

  const handleTagRemove = (tagId: string) => {
    setActiveTags(prev => prev.filter(tag => tag.id !== tagId));
    if (onTagRemove) {
      onTagRemove(tagId);
    }
  };

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleArticleClick = (articleId: string) => {
    if (onArticleClick) {
      onArticleClick(articleId);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <ArticleListHeader />

        {/* 検索フィルター */}
        <SearchFilters 
          tags={activeTags}
          onTagRemove={handleTagRemove}
          onSearch={handleSearch}
        />

        {/* 記事グリッド */}
        <ArticleGrid 
          articles={articles}
          onArticleClick={handleArticleClick}
        />

        {/* ページネーション */}
        <ArticlePagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};