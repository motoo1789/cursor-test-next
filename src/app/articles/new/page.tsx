'use client'

import { useState } from 'react'
import ArticleCreateHeader from '@/components/ArticleCreateHeader'
import ArticleCreateForm from '@/components/ArticleCreateForm'
import MarkdownEditor from '@/components/MarkdownEditor'

export default function ArticleCreatePage() {
  const [title, setTitle] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('')
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
    // TODO: 公開設定ページへ遷移
    alert('公開設定ページに遷移します')
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
      </div>
    </div>
  )
}