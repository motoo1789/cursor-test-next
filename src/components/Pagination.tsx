interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({ 
  currentPage = 1, 
  totalPages = 68, 
  onPageChange 
}: PaginationProps) {
  return (
    <nav className="flex justify-center items-center space-x-2">
      <a 
        className="flex items-center px-3 py-2 text-gray-600 hover:text-purple-600 rounded-md cursor-pointer" 
        onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
      >
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
        </svg>
        Previous
      </a>
      
      <a 
        className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md cursor-pointer"
        onClick={() => onPageChange && onPageChange(1)}
      >
        1
      </a>
      
      <a 
        className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md cursor-pointer"
        onClick={() => onPageChange && onPageChange(2)}
      >
        2
      </a>
      
      <a 
        className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md cursor-pointer"
        onClick={() => onPageChange && onPageChange(3)}
      >
        3
      </a>
      
      <span className="text-gray-600">...</span>
      
      <a 
        className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md cursor-pointer"
        onClick={() => onPageChange && onPageChange(67)}
      >
        67
      </a>
      
      <a 
        className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-purple-600 rounded-md cursor-pointer"
        onClick={() => onPageChange && onPageChange(68)}
      >
        68
      </a>
      
      <a 
        className="flex items-center px-3 py-2 text-gray-600 hover:text-purple-600 rounded-md cursor-pointer"
        onClick={() => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        Next
        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      </a>
    </nav>
  );
}