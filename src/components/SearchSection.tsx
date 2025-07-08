'use client';

import { useState } from 'react';

interface SearchSectionProps {
  onSearch: (query: string, tags: string[]) => void;
}

export default function SearchSection({ onSearch }: SearchSectionProps) {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Next', 'React']);

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSearch = () => {
    onSearch(query, selectedTags);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* タグフィルター付き検索 */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="flex items-center flex-wrap gap-2 mr-3">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center text-white ${
                tag === 'Next' ? 'bg-blue-500' : 'bg-teal-500'
              }`}
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
        <input
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder=""
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="material-icons absolute right-5 text-gray-400 cursor-pointer">
          search
        </button>
      </div>

      {/* プレーンテキスト検索 */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <input
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Hinted search text"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="material-icons absolute right-5 text-gray-400 cursor-pointer">
          search
        </button>
      </div>
    </div>
  );
}