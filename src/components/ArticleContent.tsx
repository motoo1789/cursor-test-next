import { ArticleDetail } from "@/types/api";

interface ArticleContentProps {
  article: ArticleDetail;
  currentLikes?: number; // リアルタイムで更新されるいいね数
}

// Simple markdown to HTML converter
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return "";

  const generateId = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, "") // 日本語文字も含める
      .replace(/\s+/g, "-");
  };

  return (
    markdown
      // Headers with IDs
      .replace(/^### (.+)$/gm, (match, title) => {
        const id = `content-${generateId(title)}`;
        return `<h3 id="${id}" class="text-xl font-semibold text-gray-700 mt-6 mb-3">${title}</h3>`;
      })
      .replace(/^## (.+)$/gm, (match, title) => {
        const id = `content-${generateId(title)}`;
        return `<h2 id="${id}" class="text-2xl font-semibold text-gray-700 mt-8 mb-4 border-b-2 border-purple-500 pb-2">${title}</h2>`;
      })
      .replace(
        /^# (.+)$/gm,
        '<h1 class="text-3xl font-bold text-gray-800 mb-6">$1</h1>'
      )
      // Bold and italic
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      // Code blocks
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$2</code></pre>'
      )
      // Inline code
      .replace(
        /`(.+?)`/g,
        '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>'
      )
      // Lists
      .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 mb-1">$2</li>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4">')
      // Line breaks
      .replace(/\n/g, "<br />")
  );
};

export default function ArticleContent({
  article,
  currentLikes,
}: ArticleContentProps) {
  // デバッグログを追加
  console.log("ArticleContent received article:", article);

  if (!article) {
    return (
      <div className="w-full md:w-3/4">
        <div className="text-center py-8">
          <p className="text-gray-600">記事データが見つかりません。</p>
        </div>
      </div>
    );
  }

  // リアルタイムのいいね数を使用（未設定の場合は記事の初期値を使用）
  const displayLikes =
    currentLikes !== undefined ? currentLikes : article.like || 0;

  return (
    <div className="w-full md:w-3/4">
      {/* 記事タイトル */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        {article.title || "無題"}
      </h1>

      {/* 記事メタ情報 */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
          <span className="flex items-center">
            <span className="material-icons text-sm mr-1">person</span>
            {article.author?.name || "不明"}
          </span>
          <span className="flex items-center">
            <span className="material-icons text-sm mr-1">schedule</span>
            {article.readingTime || 0}分
          </span>
          <span className="flex items-center">
            <span className="material-icons text-sm mr-1">calendar_today</span>
            {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">タグ:</span>
          <div className="flex flex-wrap gap-1">
            {article.tags?.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs rounded-full text-white"
                style={{ backgroundColor: tag.color || "#3B82F6" }}
              >
                {tag.name}
              </span>
            )) || <span className="text-sm text-gray-500">なし</span>}
          </div>
        </div>
      </div>

      {/* 概要セクション */}
      <section className="mb-10" id="summary">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-purple-500 pb-2">
          概要
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {article.summary || article.excerpt || "概要はありません。"}
        </p>
      </section>

      {/* 技術スタックセクション */}
      {article.techStack && article.techStack.length > 0 && (
        <section className="mb-10" id="tech-stack">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-purple-500 pb-2">
            技術スタック
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-2">
            {article.techStack.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 本文セクション */}
      <section className="mb-10" id="main-content">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-purple-500 pb-2">
          本文
        </h2>
        <div
          className="text-gray-600 leading-relaxed prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: `<div class="mb-4">${markdownToHtml(
              article.content || ""
            )}</div>`,
          }}
        />
      </section>

      {/* 統計情報 */}
      <section className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <span className="material-icons mr-2 text-blue-600">analytics</span>
          記事の統計
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mr-3">
              <span className="material-icons text-red-500">favorite</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">いいね</p>
              <p className="text-2xl font-bold text-gray-800 transition-all duration-300">
                {displayLikes}
              </p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-3">
              <span className="material-icons text-blue-500">visibility</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">閲覧数</p>
              <p className="text-2xl font-bold text-gray-800">
                {article.views || 0}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
