'use client';

import { useState, useEffect, useCallback } from 'react';
import ArticleListHeader from '@/components/ArticleListHeader';
import SearchSection from '@/components/SearchSection';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import { ArticleSummary, Pagination as PaginationType, ArticlesParams } from '@/types/api';
import { getArticles } from '@/lib/api';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<ArticlesParams>({
    page: 1,
    limit: 9,
    query: '',
    tags: [],
    sortBy: 'publishedAt',
    order: 'desc',
  });

  // 記事データを取得する関数
  const fetchArticles = useCallback(async (params: ArticlesParams) => {
    setLoading(true);
    try {
      const response = await getArticles(params);
      setArticles(response.articles);
      setPagination(response.pagination);
    } catch (error) {
      console.error('記事の取得に失敗しました:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初回データ取得
  useEffect(() => {
    fetchArticles(searchParams);
  }, [fetchArticles]);

  // 検索機能
  const handleSearch = useCallback((query: string, tags: string[]) => {
    const newParams = {
      ...searchParams,
      query,
      tags,
      page: 1, // 検索時はページを1にリセット
    };
    setSearchParams(newParams);
    fetchArticles(newParams);
  }, [searchParams, fetchArticles]);

  // ページ変更機能
  const handlePageChange = useCallback((page: number) => {
    const newParams = { ...searchParams, page };
    setSearchParams(newParams);
    fetchArticles(newParams);
  }, [searchParams, fetchArticles]);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <ArticleListHeader />
        
        <SearchSection onSearch={handleSearch} />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <span className="material-icons text-6xl">article</span>
                  </div>
                  <h3 className="text-xl text-gray-600 mb-2">記事が見つかりません</h3>
                  <p className="text-gray-500">
                    検索条件を変更するか、新しい記事をお待ちください。
                  </p>
                </div>
              )}
            </main>
            
            {articles.length > 0 && pagination.totalPages > 1 && (
              <Pagination 
                pagination={pagination} 
                onPageChange={handlePageChange} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}