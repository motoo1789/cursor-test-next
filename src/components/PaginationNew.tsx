'use client';

interface PaginationNewProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function PaginationNew({ 
  currentPage = 1,
  totalPages = 68,
  onPageChange,
  className = ""
}: PaginationNewProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Always show page 1
    if (currentPage > 3) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md"
        >
          1
        </button>
      );
    }

    // Show current page and adjacent pages
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-md ${
            i === currentPage
              ? 'bg-purple-600 text-white font-semibold'
              : 'text-gray-600 hover:bg-gray-200 hover:text-purple-600'
          }`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis and last pages
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="ellipsis" className="text-gray-600">
          ...
        </span>
      );
      
      pages.push(
        <button
          key={totalPages - 1}
          onClick={() => handlePageChange(totalPages - 1)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md"
        >
          {totalPages - 1}
        </button>
      );
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav className={`flex justify-center items-center space-x-2 ${className}`}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-2 rounded-md ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-purple-600'
        }`}
      >
        <span className="material-icons text-lg mr-1">arrow_back_ios</span>
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-2 rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-purple-600'
        }`}
      >
        Next
        <span className="material-icons text-lg ml-1">arrow_forward_ios</span>
      </button>
    </nav>
  );
}