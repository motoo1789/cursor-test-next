"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaLock, FaLockOpen, FaUser, FaSignOutAlt } from "react-icons/fa";

interface Article {
  id: number;
  title: string;
  published: boolean;
  tags: string[];
  createdAt: string;
  modifiedAt: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
      published: true,
      tags: ["React", "Next.js", "TypeScript"],
      createdAt: "2023年10月26日",
      modifiedAt: "2023年10月26日",
    },
    {
      id: 2,
      title: "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
      published: false,
      tags: ["JavaScript", "Node.js"],
      createdAt: "2023年10月25日",
      modifiedAt: "2023年10月25日",
    },
    {
      id: 3,
      title: "これは下書きの記事タイトルです",
      published: false,
      tags: ["Draft"],
      createdAt: "2023年10月20日",
      modifiedAt: "2023年10月20日",
    },
  ]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  const togglePublished = (articleId: number) => {
    setArticles(articles.map(article => 
      article.id === articleId 
        ? { ...article, published: !article.published }
        : article
    ));
  };

  const deleteArticle = (articleId: number) => {
    setArticles(articles.filter(article => article.id !== articleId));
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">マイ記事</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center">
              <FaPlus className="mr-2" />
              記事作成
            </button>
            <div className="relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer shadow">
                <FaUser className="text-lg sm:text-xl" />
              </div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                !article.published ? "opacity-70" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          tag === "Draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : article.published
                            ? "bg-sky-100 text-sky-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <button
                    onClick={() => togglePublished(article.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out"
                    title={article.published ? "非公開にする" : "公開する"}
                  >
                    {article.published ? (
                      <FaLockOpen className="text-xl" />
                    ) : (
                      <FaLock className="text-xl" />
                    )}
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition duration-150 ease-in-out"
                    title="編集"
                  >
                    <FaEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() => deleteArticle(article.id)}
                    className="p-2 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-full transition duration-150 ease-in-out"
                    title="削除"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {article.published ? "作成日" : "最終更新"}: {article.modifiedAt}
              </p>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEdit className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">記事がありません</h3>
            <p className="text-gray-500 mb-4">最初の記事を作成してみましょう</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center mx-auto">
              <FaPlus className="mr-2" />
              記事作成
            </button>
          </div>
        )}
      </div>
    </div>
  );
}