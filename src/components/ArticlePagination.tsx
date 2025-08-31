import React from 'react';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export const ArticlePagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 68,
  onPageChange,
  onPrevious,
  onNext
}) => {
  const handlePageClick = (page: number) => {
    if (onPageChange && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (onPrevious && currentPage > 1) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (onNext && currentPage < totalPages) {
      onNext();
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // 最初のページ
    if (currentPage > 3) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md"
        >
          1
        </button>
      );
    }

    // 現在のページ周辺
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 rounded-md font-semibold ${
            i === currentPage
              ? 'bg-purple-600 text-white'
              : 'text-gray-600 hover:bg-gray-200 hover:text-purple-600'
          }`}
        >
          {i}
        </button>
      );
    }

    // 省略記号と最後のページ
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push(
          <span key="ellipsis" className="text-gray-600">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages - 1}
          onClick={() => handlePageClick(totalPages - 1)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md"
        >
          {totalPages - 1}
        </button>
      );
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav className="flex justify-center items-center space-x-2">
      {/* Previous ボタン */}
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className={`flex items-center px-3 py-2 rounded-md ${
          currentPage <= 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-purple-600'
        }`}
      >
        <svg 
          className="w-4 h-4 mr-1" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        Previous
      </button>

      {/* ページ番号 */}
      {renderPageNumbers()}

      {/* Next ボタン */}
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={`flex items-center px-3 py-2 rounded-md ${
          currentPage >= totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-purple-600'
        }`}
      >
        Next
        <svg 
          className="w-4 h-4 ml-1" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
    </nav>
  );
};