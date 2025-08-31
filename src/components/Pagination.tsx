'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      // 7ページ以下の場合は全て表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 現在のページ周辺を表示
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex justify-center items-center space-x-2">
      {/* Previous ボタン */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-2 rounded-md ${
          currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-600 hover:text-purple-600'
        }`}
      >
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        Previous
      </button>

      {/* ページ番号 */}
      {visiblePages.map((page, index) => (
        <span key={index}>
          {typeof page === 'number' ? (
            <button
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 font-semibold rounded-md ${
                page === currentPage
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-purple-600'
              }`}
            >
              {page}
            </button>
          ) : (
            <span className="text-gray-600">{page}</span>
          )}
        </span>
      ))}

      {/* Next ボタン */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-2 rounded-md ${
          currentPage === totalPages 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-600 hover:text-purple-600'
        }`}
      >
        Next
        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
    </nav>
  );
}