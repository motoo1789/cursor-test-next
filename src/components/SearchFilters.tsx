'use client';

import { useState } from 'react';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface SearchFiltersProps {
  onSearchChange?: (query: string) => void;
  onTagsChange?: (tags: string[]) => void;
}

export default function SearchFilters({ onSearchChange, onTagsChange }: SearchFiltersProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([
    { id: 'next', name: 'Next', color: 'bg-blue-500' },
    { id: 'react', name: 'React', color: 'bg-teal-500' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const removeTag = (tagId: string) => {
    const updatedTags = selectedTags.filter(tag => tag.id !== tagId);
    setSelectedTags(updatedTags);
    onTagsChange?.(updatedTags.map(tag => tag.id));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* タグフィルター */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="flex items-center flex-wrap gap-2 mr-3">
          {selectedTags.map((tag) => (
            <span 
              key={tag.id}
              className={`${tag.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}
            >
              {tag.name}
              <button
                onClick={() => removeTag(tag.id)}
                className="ml-1 hover:bg-black hover:bg-opacity-20 rounded-full p-0.5"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </span>
          ))}
        </div>
        <input 
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
          placeholder="" 
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <svg className="absolute right-5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>

      {/* 検索入力欄 */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <input 
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
          placeholder="Hinted search text" 
          type="text"
        />
        <svg className="absolute right-5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
    </div>
  );
}