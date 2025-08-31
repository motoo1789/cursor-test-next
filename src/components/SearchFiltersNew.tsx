'use client';

import { useState } from 'react';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface SearchFiltersNewProps {
  className?: string;
  onTagRemove?: (tagId: string) => void;
  onSearchChange?: (value: string) => void;
}

export default function SearchFiltersNew({ 
  className = "",
  onTagRemove,
  onSearchChange 
}: SearchFiltersNewProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([
    { id: '1', name: 'Next', color: 'bg-blue-500' },
    { id: '2', name: 'React', color: 'bg-teal-500' }
  ]);
  const [searchValue, setSearchValue] = useState('');
  const [hintedSearchValue, setHintedSearchValue] = useState('');

  const handleTagRemove = (tagId: string) => {
    setSelectedTags(prev => prev.filter(tag => tag.id !== tagId));
    onTagRemove?.(tagId);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange?.(value);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 ${className}`}>
      {/* Search with tags */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="flex items-center flex-wrap gap-2 mr-3">
          {selectedTags.map((tag) => (
            <span 
              key={tag.id}
              className={`${tag.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}
            >
              {tag.name}
              <button 
                onClick={() => handleTagRemove(tag.id)}
                className="material-icons text-xs ml-1 cursor-pointer hover:opacity-75"
                type="button"
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
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <span className="material-icons absolute right-5 text-gray-400">search</span>
      </div>

      {/* Hinted search */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <input 
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
          placeholder="Hinted search text" 
          type="text"
          value={hintedSearchValue}
          onChange={(e) => setHintedSearchValue(e.target.value)}
        />
        <span className="material-icons absolute right-5 text-gray-400">search</span>
      </div>
    </div>
  );
}