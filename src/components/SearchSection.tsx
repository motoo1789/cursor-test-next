'use client';

import { useState } from 'react';

// タグの型定義
interface Tag {
  id: number;
  name: string;
  color: string;
}

interface SearchSectionProps {
  selectedTags: Tag[];
  onRemoveTag: (tagId: number) => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  hintSearchText: string;
  onHintSearchTextChange: (text: string) => void;
}

export default function SearchSection({
  selectedTags,
  onRemoveTag,
  searchText,
  onSearchTextChange,
  hintSearchText,
  onHintSearchTextChange
}: SearchSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* タグフィルター付き検索ボックス */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="flex items-center flex-wrap gap-2 mr-3">
          {selectedTags.map(tag => (
            <span key={tag.id} className={`${tag.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
              {tag.name}
              <button 
                onClick={() => onRemoveTag(tag.id)}
                className="ml-1 hover:bg-black hover:bg-opacity-20 rounded-full p-1"
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
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
        />
        <svg className="absolute right-5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>

      {/* ヒント付き検索ボックス */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <input 
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
          placeholder="Hinted search text" 
          type="text"
          value={hintSearchText}
          onChange={(e) => onHintSearchTextChange(e.target.value)}
        />
        <svg className="absolute right-5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
    </div>
  );
}