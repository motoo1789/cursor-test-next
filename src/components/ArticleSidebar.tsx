import { TableOfContentsItem } from "@/types/api";
import LikeButton from "./LikeButton";

interface ArticleSidebarProps {
  tableOfContents: TableOfContentsItem[];
  onShare?: () => void;
  articleId: number;
  initialLikes: number;
  onLikeChange?: (likes: number, isLiked: boolean) => void;
}

export default function ArticleSidebar({
  tableOfContents,
  onShare,
  articleId,
  initialLikes,
  onLikeChange,
}: ArticleSidebarProps) {
  const handleTocClick = (e: any, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
                <li key={item.id} className={`${item.level > 2 ? "pl-4" : ""}`}>
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

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* いいねボタンセクション */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              この記事はいかがでしたか？
            </h4>
            <div className="relative">
              <LikeButton
                articleId={articleId}
                initialLikes={initialLikes}
                onLikeChange={onLikeChange}
              />
            </div>
          </div>

          {/* 区切り線 */}
          <hr className="border-gray-200" />

          {/* シェアボタンセクション */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              記事をシェア
            </h4>
            <button
              onClick={onShare}
              className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
            >
              <span className="material-icons mr-2">share</span>
              記事をシェア
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
