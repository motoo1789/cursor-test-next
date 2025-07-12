'use client';

import { useState } from 'react';
import { mockTags, mockIcons } from '@/lib/mockData';

export default function CreateArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const handleSaveDraft = () => {
    // 下書き保存処理
    console.log('下書き保存');
  };

  const handlePublishSetting = () => {
    setIsPublishModalOpen(true);
  };

  const handleClosePublishModal = () => {
    setIsPublishModalOpen(false);
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex justify-end items-center mb-8">
          <button 
            onClick={handleSaveDraft}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4 transition duration-150 ease-in-out"
          >
            下書き保存
          </button>
          <button 
            onClick={handlePublishSetting}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mr-4 transition duration-150 ease-in-out"
          >
            公開設定へ
          </button>
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
            <span className="material-icons text-white text-3xl">person</span>
          </div>
        </header>
        
        <main>
          <div className="mb-6">
            <input 
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-[#0f1111]" 
              placeholder="タイトル" 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative">
              <select 
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111]"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">タグを選択</option>
                {mockTags.map((tag) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <span className="material-icons">arrow_drop_down</span>
              </div>
            </div>
            
            <div className="relative">
              <select 
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111]"
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
              >
                <option value="">アイコンを選択</option>
                {mockIcons.map((icon) => (
                  <option key={icon.id} value={icon.name}>
                    {icon.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <span className="material-icons">arrow_drop_down</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#0f1111] mb-4">記事マークダウン</h2>
              <textarea 
                className="w-full h-96 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#0f1111]" 
                placeholder="Markdownで記事を記述してください..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#0f1111] mb-4">プレビュー</h2>
              <div className="w-full h-96 p-4 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto">
                <div className="text-[#0f1111]">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
                  ) : (
                    <p className="text-gray-500">Markdownのプレビューがここに表示されます。</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* 公開設定ポップアップ */}
        {isPublishModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0f1111]">公開設定</h2>
                <button 
                  onClick={handleClosePublishModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* 公開状態 */}
                <div>
                  <label className="block text-[#0f1111] font-medium mb-2">公開状態</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="status" value="public" className="mr-2" defaultChecked />
                      <span className="text-[#0f1111]">公開</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="status" value="private" className="mr-2" />
                      <span className="text-[#0f1111]">非公開</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="status" value="draft" className="mr-2" />
                      <span className="text-[#0f1111]">下書き</span>
                    </label>
                  </div>
                </div>
                
                {/* 公開日時設定 */}
                <div>
                  <label className="block text-[#0f1111] font-medium mb-2">公開日時</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="schedule" value="now" className="mr-2" defaultChecked />
                      <span className="text-[#0f1111]">今すぐ公開</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="schedule" value="later" className="mr-2" />
                      <span className="text-[#0f1111]">予約投稿</span>
                    </label>
                  </div>
                  <div className="mt-3">
                    <input 
                      type="datetime-local" 
                      className="w-full p-3 border border-gray-300 rounded-lg text-[#0f1111] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled
                    />
                  </div>
                </div>
                
                {/* コメント設定 */}
                <div>
                  <label className="block text-[#0f1111] font-medium mb-2">コメント設定</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-[#0f1111]">コメントを許可する</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-[#0f1111]">コメント承認制</span>
                    </label>
                  </div>
                </div>
                
                {/* ボタン */}
                <div className="flex justify-end space-x-4 mt-8 pt-4 border-t">
                  <button 
                    onClick={handleClosePublishModal}
                    className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button 
                    onClick={handleClosePublishModal}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    保存して公開
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}