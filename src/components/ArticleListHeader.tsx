import Link from 'next/link';

interface ArticleListHeaderProps {
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}

export default function ArticleListHeader({ totalCount, currentPage, itemsPerPage }: ArticleListHeaderProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">記事一覧</h1>
          <p className="text-gray-600">
            {totalCount > 0 ? (
              <>
                {totalCount}件中 {startItem}-{endItem}件を表示
              </>
            ) : (
              '記事がありません'
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* 表示切り替えボタン（将来的にグリッド/リスト表示切り替えに使用） */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button className="px-3 py-1 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-500 rounded-md">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* 新規作成ボタン */}
          <Link
            href="/articles/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新規作成
          </Link>
        </div>
      </div>
    </div>
  );
}