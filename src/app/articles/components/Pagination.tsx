interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // 全ページを表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // ページ数が多い場合の省略表示
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

  return (
    <nav className="flex justify-center items-center space-x-2">
      {/* Previous ボタン */}
      <button
        className="flex items-center px-3 py-2 text-gray-600 hover:text-purple-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span className="material-icons text-lg mr-1">arrow_back_ios</span>
        Previous
      </button>

      {/* ページ番号 */}
      {renderPageNumbers().map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="text-gray-600">...</span>
          ) : (
            <button
              className={`px-4 py-2 rounded-md font-semibold ${
                currentPage === page
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-purple-600'
              }`}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      {/* Next ボタン */}
      <button
        className="flex items-center px-3 py-2 text-gray-600 hover:text-purple-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <span className="material-icons text-lg ml-1">arrow_forward_ios</span>
      </button>
    </nav>
  );
}