'use client';

import { useState, useEffect } from 'react';
import ArticleHeader from '@/components/ArticleHeader';
import SearchSection from '@/components/SearchSection';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import { ArticleSummary, Pagination as PaginationType } from '@/types/api';
import { getArticles } from '@/lib/api';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fetchArticles = async (page: number = 1, query?: string, tags?: string[]) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: 9, // 3x3 grid
        ...(tags && tags.length > 0 && { tags }),
        sortBy: 'publishedAt' as const,
        order: 'desc' as const
      };

      const response = await getArticles(params);
      setArticles(response.articles);
      setPagination(response.pagination);
    } catch (err) {
      setError('記事の取得に失敗しました。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, searchQuery, selectedTags);
  }, [currentPage, searchQuery, selectedTags]);

  const handleSearch = (query: string, tags: string[]) => {
    setSearchQuery(query);
    setSelectedTags(tags);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <ArticleHeader />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">技術記事</h1>
        </div>
        
        <SearchSection onSearch={handleSearch} />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <span className="material-icons mr-2">error</span>
              {error}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <>
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </main>

            {/* Empty State */}
            {articles.length === 0 && (
              <div className="text-center py-20">
                <span className="material-icons text-6xl text-gray-400 mb-4 block">article</span>
                <h3 className="text-xl text-gray-600 mb-2">記事が見つかりませんでした</h3>
                <p className="text-gray-500">検索条件を変更してお試しください。</p>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination pagination={pagination} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </div>
    </div>
  );
}