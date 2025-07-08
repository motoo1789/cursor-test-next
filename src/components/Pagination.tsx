import { Pagination as PaginationType } from '@/types/api';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export default function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { currentPage, totalPages, hasPrev, hasNext } = pagination;

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav className="flex justify-center items-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => hasPrev && onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`flex items-center px-3 py-2 rounded-md ${
          hasPrev 
            ? 'text-gray-600 hover:text-purple-600 cursor-pointer' 
            : 'text-gray-400 cursor-not-allowed'
        }`}
      >
        <span className="material-icons text-lg mr-1">arrow_back_ios</span>
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md"
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className="text-gray-600">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 font-semibold rounded-md ${
            page === currentPage
              ? 'bg-purple-600 text-white'
              : 'text-gray-600 hover:bg-gray-200 hover:text-purple-600'
          }`}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="text-gray-600">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => hasNext && onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`flex items-center px-3 py-2 rounded-md ${
          hasNext 
            ? 'text-gray-600 hover:text-purple-600 cursor-pointer' 
            : 'text-gray-400 cursor-not-allowed'
        }`}
      >
        Next
        <span className="material-icons text-lg ml-1">arrow_forward_ios</span>
      </button>
    </nav>
  );
}