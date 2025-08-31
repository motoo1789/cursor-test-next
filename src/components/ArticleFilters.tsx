'use client';

import { useState } from 'react';
import { Tag } from '@prisma/client';

interface ArticleFiltersProps {
  tags: Tag[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'newest' | 'oldest' | 'popular';
  onSortChange: (sort: 'newest' | 'oldest' | 'popular') => void;
}

export default function ArticleFilters({
  tags,
  selectedTags,
  onTagChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: ArticleFiltersProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  const handleTagToggle = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onTagChange(selectedTags.filter(t => t !== tagName));
    } else {
      onTagChange([...selectedTags, tagName]);
    }
  };

  const displayedTags = showAllTags ? tags : tags.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* 検索バー */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="記事を検索..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* ソート */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">並び順</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest' | 'popular')}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="newest">新しい順</option>
          <option value="oldest">古い順</option>
          <option value="popular">人気順</option>
        </select>
      </div>

      {/* タグフィルター */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">タグで絞り込み</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {displayedTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagToggle(tag.name)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                selectedTags.includes(tag.name)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
        
        {tags.length > 10 && (
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {showAllTags ? '表示を減らす' : `他${tags.length - 10}個のタグを表示`}
          </button>
        )}

        {selectedTags.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedTags.length}個のタグで絞り込み中
              </span>
              <button
                onClick={() => onTagChange([])}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                クリア
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}