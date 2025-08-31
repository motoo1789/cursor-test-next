import React, { useState } from 'react';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface SearchFiltersProps {
  tags?: Tag[];
  onTagRemove?: (tagId: string) => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  hintedSearchPlaceholder?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  tags = [
    { id: '1', name: 'Next', color: 'bg-blue-500' },
    { id: '2', name: 'React', color: 'bg-teal-500' }
  ],
  onTagRemove,
  onSearch,
  searchPlaceholder = "",
  hintedSearchPlaceholder = "Hinted search text"
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hintedSearchQuery, setHintedSearchQuery] = useState('');

  const handleTagRemove = (tagId: string) => {
    if (onTagRemove) {
      onTagRemove(tagId);
    }
  };

  const handleSearchSubmit = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* タグ付き検索バー */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <div className="flex items-center flex-wrap gap-2 mr-3">
          {tags.map((tag) => (
            <span 
              key={tag.id}
              className={`${tag.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}
            >
              {tag.name}
              <button
                onClick={() => handleTagRemove(tag.id)}
                className="ml-1 hover:bg-black hover:bg-opacity-20 rounded-full p-0.5"
              >
                <svg 
                  className="w-3 h-3" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </span>
          ))}
        </div>
        <input 
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
          placeholder={searchPlaceholder}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit(searchQuery);
            }
          }}
        />
        <button
          onClick={() => handleSearchSubmit(searchQuery)}
          className="absolute right-5 text-gray-400 hover:text-gray-600"
        >
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>

      {/* ヒント付き検索バー */}
      <div className="relative bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center">
        <input 
          className="flex-grow bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" 
          placeholder={hintedSearchPlaceholder}
          type="text"
          value={hintedSearchQuery}
          onChange={(e) => setHintedSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit(hintedSearchQuery);
            }
          }}
        />
        <button
          onClick={() => handleSearchSubmit(hintedSearchQuery)}
          className="absolute right-5 text-gray-400 hover:text-gray-600"
        >
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};