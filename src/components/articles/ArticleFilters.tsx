'use client';

import { useState } from 'react';
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';

interface ArticleFiltersProps {
  onSearch: (query: string) => void;
  onTagFilter: (tags: string[]) => void;
  onSort: (sortBy: string, order: 'asc' | 'desc') => void;
}

export default function ArticleFilters({ onSearch, onTagFilter, onSort }: ArticleFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('publishedAt');
  const [selectedOrder, setSelectedOrder] = useState<'asc' | 'desc'>('desc');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSortChange = (sortBy: string, order: 'asc' | 'desc') => {
    setSelectedSort(sortBy);
    setSelectedOrder(order);
    onSort(sortBy, order);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* 検索バー */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="記事を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </form>

        {/* フィルターとソート */}
        <div className="flex gap-3 items-center">
          {/* ソート */}
          <div className="relative">
            <select
              value={`${selectedSort}-${selectedOrder}`}
              onChange={(e) => {
                const [sortBy, order] = e.target.value.split('-') as [string, 'asc' | 'desc'];
                handleSortChange(sortBy, order);
              }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="publishedAt-desc">新しい順</option>
              <option value="publishedAt-asc">古い順</option>
              <option value="like-desc">いいね数順</option>
              <option value="views-desc">閲覧数順</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* フィルターボタン */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiFilter className="w-4 h-4" />
            フィルター
          </button>
        </div>
      </div>

      {/* フィルターパネル */}
      {isFilterOpen && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">カテゴリ</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">フロントエンド</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">バックエンド</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">インフラ</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">人気タグ</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Prisma'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">読了時間</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">5分以下</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">5-10分</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">10分以上</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}