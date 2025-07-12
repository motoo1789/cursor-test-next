import React from 'react'

interface ArticleCreateFormProps {
  title: string
  setTitle: (title: string) => void
  selectedTag: string
  setSelectedTag: (tag: string) => void
  selectedIcon: string
  setSelectedIcon: (icon: string) => void
}

export default function ArticleCreateForm({
  title,
  setTitle,
  selectedTag,
  setSelectedTag,
  selectedIcon,
  setSelectedIcon
}: ArticleCreateFormProps) {
  const tags = ['技術', 'デザイン', 'ビジネス', 'その他']
  const icons = ['記事', '質問', 'イベント', 'アイデア']

  return (
    <div className="mb-8">
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          placeholder="タイトル"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <select
            value={selectedTag}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTag(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          >
            <option value="">タグを選択</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <span className="text-2xl">⌄</span>
          </div>
        </div>
        
        <div className="relative">
          <select
            value={selectedIcon}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedIcon(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          >
            <option value="">アイコンを選択</option>
            {icons.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <span className="text-2xl">⌄</span>
          </div>
        </div>
      </div>
    </div>
  )
}