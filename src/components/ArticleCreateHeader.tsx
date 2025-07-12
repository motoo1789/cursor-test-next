import React from 'react'

interface ArticleCreateHeaderProps {
  onDraftSave: () => void
  onPublishSettings: () => void
  isSaving?: boolean
}

export default function ArticleCreateHeader({ 
  onDraftSave, 
  onPublishSettings,
  isSaving = false
}: ArticleCreateHeaderProps) {
  return (
    <header className="flex justify-end items-center mb-8">
      <button 
        onClick={onDraftSave}
        disabled={isSaving}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md mr-4 transition duration-150 ease-in-out"
      >
        {isSaving ? '保存中...' : '下書き保存'}
      </button>
      <button 
        onClick={onPublishSettings}
        disabled={isSaving}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md mr-4 transition duration-150 ease-in-out"
      >
        公開設定へ
      </button>
      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
        <span className="text-white text-3xl">👤</span>
      </div>
    </header>
  )
}