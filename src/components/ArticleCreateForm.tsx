import React from 'react'
import { mockTags, mockIcons } from '@/lib/mockData'

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

  return (
    <div className="mb-8">
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-[#0f1111]"
          placeholder="タイトル"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <select
            value={selectedTag}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTag(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111]"
          >
            <option value="">タグを選択</option>
            {mockTags.map((tag) => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
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
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111]"
          >
            <option value="">アイコンを選択</option>
            {mockIcons.map((icon) => (
              <option key={icon.id} value={icon.name}>
                {icon.name}
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