'use client'

import { useState } from 'react'
import ArticleCreateHeader from '@/components/ArticleCreateHeader'
import ArticleCreateForm from '@/components/ArticleCreateForm'
import MarkdownEditor from '@/components/MarkdownEditor'

export default function ArticleCreatePage() {
  const [title, setTitle] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('')
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [markdown, setMarkdown] = useState(`# サンプル記事のタイトル

## はじめに
ここに記事の導入部分を記述します。

## 本文
### サブタイトル
ここに詳細な内容を記述します。

**太字のテキスト**や*斜体のテキスト*、\`コードブロック\`などが使用できます。

### まとめ
記事の結論をここに記述します。`)

  const handleDraftSave = () => {
    console.log('下書き保存', { title, selectedTag, selectedIcon, markdown })
    // TODO: 下書き保存のAPIを呼び出す
    alert('下書きが保存されました')
  }

  const handlePublishSettings = () => {
    console.log('公開設定へ', { title, selectedTag, selectedIcon, markdown })
    setIsPublishModalOpen(true)
  }

  const handleClosePublishModal = () => {
    setIsPublishModalOpen(false)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">記事作成</h1>
          <p className="text-gray-600">新しい記事を作成します</p>
        </div>
        
        <ArticleCreateHeader 
          onDraftSave={handleDraftSave}
          onPublishSettings={handlePublishSettings}
        />
        
        <main>
          <ArticleCreateForm 
            title={title}
            setTitle={setTitle}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          />
          
          <MarkdownEditor 
            markdown={markdown}
            setMarkdown={setMarkdown}
          />
        </main>
        
        {/* 公開設定ポップアップ */}
        {isPublishModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={handleClosePublishModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons text-3xl">close</span>
                </button>
                <h1 className="text-2xl font-bold text-[#0f1111]">公開情報の設定</h1>
                <div className="w-8"></div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#0f1111] mb-4">公開日を入力してください</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-500 mb-1" htmlFor="publish-date">日付</label>
                  <input 
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111]" 
                    id="publish-date" 
                    type="text" 
                    defaultValue="2025/04/12"
                  />
                  <p className="text-xs text-gray-500 mt-1">Supporting text</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1" htmlFor="publish-time">時間</label>
                  <input 
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111]" 
                    id="publish-time" 
                    type="text" 
                    defaultValue="19:00"
                  />
                  <p className="text-xs text-gray-500 mt-1">Supporting text</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#0f1111] mb-4">公開 / 非公開の設定</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input 
                      defaultChecked 
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      id="publish-public" 
                      name="publish-status" 
                      type="radio"
                    />
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-[#0f1111]" htmlFor="publish-public">公開</label>
                      <p className="text-gray-500">記事が閲覧可能な状態です</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input 
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      id="publish-private" 
                      name="publish-status" 
                      type="radio"
                    />
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-[#0f1111]" htmlFor="publish-private">非公開</label>
                      <p className="text-gray-500">記事は閲覧されません</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleClosePublishModal}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
              >
                設定
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}