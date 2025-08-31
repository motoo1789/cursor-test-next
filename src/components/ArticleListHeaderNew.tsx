import { FiSearch, FiFilter } from 'react-icons/fi';

interface ArticleListHeaderNewProps {
  onSearchChange: (value: string) => void;
  onFilterToggle: () => void;
  searchValue: string;
}

export default function ArticleListHeaderNew({ 
  onSearchChange, 
  onFilterToggle, 
  searchValue 
}: ArticleListHeaderNewProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title Section */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">記事一覧</h1>
              <p className="mt-2 text-gray-600">最新の記事をチェックしてください</p>
            </div>
            
            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="relative flex-1 min-w-[300px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="記事を検索..."
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Filter Button */}
              <button
                onClick={onFilterToggle}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiFilter className="h-4 w-4 mr-2" />
                フィルター
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}