'use client';

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function ArticleHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/articles" className="text-xl font-semibold text-gray-700">
          TechBlog
        </Link>
        <div className="flex items-center">
          <Link 
            href="/articles/new" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mr-4 transition duration-150 ease-in-out"
          >
            記事作成
          </Link>
          
          {/* Admin signin/dashboard button */}
          {session ? (
            <Link 
              href="/admin" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-4 transition duration-150 ease-in-out"
            >
              管理画面
            </Link>
          ) : (
            <Link 
              href="/auth/signin" 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mr-4 transition duration-150 ease-in-out"
            >
              管理者ログイン
            </Link>
          )}
          
          <button className="text-gray-600 hover:text-purple-600 focus:outline-none mx-2">
            <span className="material-icons">search</span>
          </button>
          <button className="text-gray-600 hover:text-purple-600 focus:outline-none mx-2">
            <span className="material-icons">notifications</span>
          </button>
          <div className="relative">
            <button className="focus:outline-none">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl">
                <span className="material-icons">person</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}