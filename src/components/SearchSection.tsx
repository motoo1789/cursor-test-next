'use client';

import React, { useState } from 'react';

interface SearchSectionProps {
  onSearch: (query: string, tags: string[]) => void;
}

export default function SearchSection({ onSearch }: SearchSectionProps) {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // 利用可能なタグのリスト（モックデータから）
  const availableTags = ['Next.js', 'React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'];

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
    onSearch(query, selectedTags.filter(tag => tag !== tagToRemove));
  };

  const addTag = (tagToAdd: string) => {
    if (tagToAdd && !selectedTags.includes(tagToAdd)) {
      const newTags = [...selectedTags, tagToAdd];
      setSelectedTags(newTags);
      onSearch(query, newTags);
    }
  };

  const handleKeyPress = (e: any, isMainSearch: boolean = false) => {
    if (e.key === 'Enter') {
      if (isMainSearch) {
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
    // リアルタイム検索
    onSearch(newQuery, selectedTags);
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
          <input
            className="flex-grow bg-gray-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="記事のタイトル、タグ、内容で検索..."
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, true)}
          />
          <button
            onClick={() => onSearch(query, selectedTags)}
            className="material-icons ml-3 text-gray-400 cursor-pointer hover:text-purple-500 transition-colors"
          >
            search
          </button>
        </div>

        {/* 選択されたタグ */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-sm text-gray-600 mr-2">選択中のタグ:</span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center text-white ${getTagColor(tag)}`}
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="material-icons text-xs ml-1 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-full p-0.5"
                >
                  close
                </button>
              </span>
            ))}
          </div>
        )}

        {/* タグ選択エリア */}
        <div className="border-t pt-3">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600 mr-3">タグで絞り込み:</span>
            <input
              className="flex-grow bg-gray-50 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="タグ名を入力してEnterで追加"
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                disabled={selectedTags.includes(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-700 cursor-pointer'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}