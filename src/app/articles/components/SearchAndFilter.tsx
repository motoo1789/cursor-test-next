'use client';

import { useState } from 'react';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface SearchAndFilterProps {
  selectedTags: Tag[];
  onTagRemove: (tagId: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchAndFilter({
  selectedTags,
  onTagRemove,
  searchValue,
  onSearchChange,
  placeholder = "Hinted search text"
}: SearchAndFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* タグフィルター付き検索ボックス */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="flex items-center flex-wrap gap-2 mr-3">
          {selectedTags.map((tag) => (
            <span 
              key={tag.id}
              className={`${tag.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}
            >
              {tag.name}
              <span 
                className="material-icons text-xs ml-1 cursor-pointer"
                onClick={() => onTagRemove(tag.id)}
              >
                close
              </span>
            </span>
          ))}
        </div>
        <input 
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
          placeholder="" 
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <span className="material-icons absolute right-5 text-gray-400">search</span>
      </div>

      {/* 通常の検索ボックス */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <input 
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
          placeholder={placeholder} 
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <span className="material-icons absolute right-5 text-gray-400">search</span>
      </div>
    </div>
  );
}