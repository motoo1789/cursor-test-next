import { TableOfContentsItem } from '@/types/api';

interface ArticleSidebarProps {
  tableOfContents: TableOfContentsItem[];
  onLike?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
}

export default function ArticleSidebar({ 
  tableOfContents, 
  onLike, 
  onShare, 
  isLiked = false 
}: ArticleSidebarProps) {
  const handleTocClick = (e: any, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-full md:w-1/4">
      <div className="sticky top-24">
        <div className="bg-gray-50 rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">目次</h3>
          <nav>
            <ul className="space-y-2">
              {tableOfContents.map((item) => (
                <li key={item.id} className={`${item.level > 2 ? 'pl-4' : ''}`}>
                  <a 
                    className="text-purple-600 hover:text-purple-800 hover:underline cursor-pointer" 
                    onClick={(e) => handleTocClick(e, item.id)}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          <button 
            onClick={onLike}
            className={`w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out ${
              isLiked 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            <span className="material-icons mr-2">thumb_up</span>
            Good
          </button>
          <button 
            onClick={onShare}
            className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
          >
            <span className="material-icons mr-2">share</span>
            Share
          </button>
        </div>
      </div>
    </aside>
  );
}