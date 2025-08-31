'use client';

import { useState } from 'react';
import ArticleListHeaderNew from '@/components/ArticleListHeaderNew';
import SearchFiltersNew from '@/components/SearchFiltersNew';
import ArticleGridNew from '@/components/ArticleGridNew';
import PaginationNew from '@/components/PaginationNew';

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleTagRemove = (tagId: string) => {
    console.log('Tag removed:', tagId);
  };

  const handleSearchChange = (value: string) => {
    console.log('Search changed:', value);
  };

  const handleArticleClick = (articleId: string) => {
    console.log('Article clicked:', articleId);
    // Navigate to article detail page
    // router.push(`/articles/${articleId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Page changed:', page);
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <ArticleListHeaderNew />
        
        <SearchFiltersNew 
          onTagRemove={handleTagRemove}
          onSearchChange={handleSearchChange}
        />
        
        <ArticleGridNew 
          onArticleClick={handleArticleClick}
        />
        
        <PaginationNew 
          currentPage={currentPage}
          totalPages={68}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}