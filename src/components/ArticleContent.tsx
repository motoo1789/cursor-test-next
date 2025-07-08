import { ArticleDetail } from '@/types/api';

interface ArticleContentProps {
  article: ArticleDetail;
}

// Simple markdown to HTML converter
const markdownToHtml = (markdown: string): string => {
  const generateId = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '') // 日本語文字も含める
      .replace(/\s+/g, '-');
  };

  return markdown
    // Headers with IDs
    .replace(/^### (.+)$/gm, (match, title) => {
      const id = `content-${generateId(title)}`;
      return `<h3 id="${id}" class="text-xl font-semibold text-gray-700 mt-6 mb-3">${title}</h3>`;
    })
    .replace(/^## (.+)$/gm, (match, title) => {
      const id = `content-${generateId(title)}`;
      return `<h2 id="${id}" class="text-2xl font-semibold text-gray-700 mt-8 mb-4 border-b-2 border-purple-500 pb-2">${title}</h2>`;
    })
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-800 mb-6">$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$2</code></pre>')
    // Inline code
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
    // Lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 mb-1">$2</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4">')
    // Line breaks
    .replace(/\n/g, '<br />');
};

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="w-full md:w-3/4">
      {/* 記事タイトル */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        {article.title}
      </h1>

      {/* 概要セクション */}
      <section className="mb-10" id="summary">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-purple-500 pb-2">
          概要
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {article.summary}
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
          className="text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: `<p class="mb-4">${markdownToHtml(article.content)}</p>` 
          }}
        />
      </section>
    </div>
  );
}