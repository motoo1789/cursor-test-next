'use client'

import { useState, useEffect } from 'react'

interface MarkdownEditorProps {
  markdown: string
  setMarkdown: (markdown: string) => void
}

export default function MarkdownEditor({ markdown, setMarkdown }: MarkdownEditorProps) {
  const [previewContent, setPreviewContent] = useState('')

  useEffect(() => {
    if (markdown.trim()) {
      // 簡単なマークダウンプレビュー（基本的な変換のみ）
      const basicPreview = markdown
        .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
        .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
        .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium mb-2">$1</h3>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
        .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
        .replace(/\n/g, '<br>')
      
      setPreviewContent(basicPreview)
    } else {
      setPreviewContent('<p class="text-gray-500">Markdownのプレビューがここに表示されます。</p>')
    }
  }, [markdown])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">記事マークダウン</h2>
        <textarea
          value={markdown}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMarkdown(e.target.value)}
          className="w-full h-96 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Markdownで記事を記述してください..."
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">プレビュー</h2>
        <div 
          className="w-full h-96 p-4 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: previewContent }}
        />
      </div>
    </div>
  )
}