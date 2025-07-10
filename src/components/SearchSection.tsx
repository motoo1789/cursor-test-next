'use client';

import React, { useState, useCallback, useEffect } from 'react';

interface SearchSectionProps {
  onSearch: (query: string, tags: string[]) => void;
}

export default function SearchSection({ onSearch }: SearchSectionProps) {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // 利用可能なタグのリスト（モックデータから）
  const availableTags = ['Next.js', 'React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'];

  // デバウンス機能
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query, selectedTags);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, selectedTags, onSearch]);

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setQuery('');
    setSelectedTags([]);
  };

  const addTag = (tagToAdd: string) => {
    if (tagToAdd && !selectedTags.includes(tagToAdd)) {
      setSelectedTags(prev => [...prev, tagToAdd]);
    }
  };

  const handleKeyPress = (e: any, isMainSearch: boolean = false) => {
    if (e.key === 'Enter') {
      if (isMainSearch) {
        // Enterキーで即座に検索実行（デバウンスをスキップ）
        onSearch(query, selectedTags);
      } else {
        // タグ追加
        if (newTag.trim()) {
          addTag(newTag.trim());
          setNewTag('');
        }
      }
    }
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    // デバウンス機能がuseEffectで処理される
  };

  const getTagColor = (tag: string) => {
    const colors = {
      'Next.js': 'bg-black',
      'React': 'bg-blue-500',
      'TypeScript': 'bg-blue-700',
      'JavaScript': 'bg-yellow-500',
      'CSS': 'bg-blue-600',
      'Node.js': 'bg-green-600'
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="grid grid-cols-1 gap-6 mb-10">
      {/* メイン検索バー */}
      <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-3">
          <div className="relative flex-grow">
            <input
              className="w-full bg-gray-100 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="記事のタイトル、タグ、内容で検索..."
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, true)}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                title="検索をクリア"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={() => onSearch(query, selectedTags)}
            className="material-icons ml-3 text-gray-400 cursor-pointer hover:text-purple-500 transition-colors"
            title="検索実行"
          >
            search
          </button>
          {(query || selectedTags.length > 0) && (
            <button
              onClick={clearAllFilters}
              className="ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
              title="すべてのフィルターをクリア"
            >
              クリア
            </button>
          )}
        </div>

        {/* 検索状態の表示 */}
        {(query || selectedTags.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-3 p-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-600">アクティブなフィルター:</span>
            
            {query && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                検索: "{query}"
              </span>
            )}
            
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center text-white ${getTagColor(tag)}`}
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:bg-black hover:bg-opacity-20 rounded-full p-0.5 focus:outline-none focus:bg-black focus:bg-opacity-20"
                  title={`${tag}タグを削除`}
                  aria-label={`${tag}タグを削除`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {/* タグ選択エリア */}
        <div className="border-t pt-3">
          <div className="flex items-center mb-3">
            <label htmlFor="custom-tag-input" className="text-sm text-gray-600 mr-3 font-medium">
              タグで絞り込み:
            </label>
            <input
              id="custom-tag-input"
              className="flex-grow bg-gray-50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white border border-transparent focus:border-purple-300"
              placeholder="カスタムタグを入力してEnterで追加"
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            {newTag && (
              <button
                onClick={() => setNewTag('')}
                className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                title="入力をクリア"
                aria-label="カスタムタグ入力をクリア"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="mb-2">
            <span className="text-xs text-gray-500 font-medium">推奨タグ:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  disabled={isSelected}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 ${
                    isSelected
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                      : 'bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-700 hover:shadow-sm active:scale-95'
                  }`}
                  title={isSelected ? `${tag}は既に選択済み` : `${tag}タグを追加`}
                  aria-label={isSelected ? `${tag}は既に選択済み` : `${tag}タグを追加`}
                >
                  {tag} {isSelected && '✓'}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}