import { FiX } from 'react-icons/fi';

interface SearchFiltersNewProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  selectedTag: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
  onSortChange: (sort: string) => void;
}

const categories = [
  { value: '', label: 'すべて' },
  { value: 'tech', label: 'テクノロジー' },
  { value: 'design', label: 'デザイン' },
  { value: 'business', label: 'ビジネス' },
  { value: 'lifestyle', label: 'ライフスタイル' },
];

const tags = [
  { value: '', label: 'すべて' },
  { value: 'react', label: 'React' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'css', label: 'CSS' },
];

const sortOptions = [
  { value: 'newest', label: '新しい順' },
  { value: 'oldest', label: '古い順' },
  { value: 'popular', label: '人気順' },
  { value: 'title', label: 'タイトル順' },
];

export default function SearchFiltersNew({
  isOpen,
  onClose,
  selectedCategory,
  selectedTag,
  sortBy,
  onCategoryChange,
  onTagChange,
  onSortChange,
}: SearchFiltersNewProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">フィルター</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリー
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Tag Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                タグ
              </label>
              <select
                value={selectedTag}
                onChange={(e) => onTagChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {tags.map((tag) => (
                  <option key={tag.value} value={tag.value}>
                    {tag.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                並び順
              </label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}