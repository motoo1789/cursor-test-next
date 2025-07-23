"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaLock, FaLockOpen, FaUser, FaSignOutAlt } from "react-icons/fa";

interface Article {
  id: number;
  title: string;
  published: boolean;
  tags: { id: number; name: string }[];
  createdAt: string;
  modifiedAt: string;
  author: { id: string; name: string };
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserArticles = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch("/api/articles/user");
        if (!response.ok) {
          throw new Error("記事の取得に失敗しました");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("記事の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchUserArticles();
  }, [session?.user?.id]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  const togglePublished = async (articleId: number) => {
    try {
      const response = await fetch(`/api/articles/${articleId}/toggle-publish`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("公開状態の変更に失敗しました");
      }

      const updatedArticle = await response.json();
      setArticles(articles.map(article => 
        article.id === articleId 
          ? { ...article, published: updatedArticle.published }
          : article
      ));
    } catch (error) {
      console.error("Error toggling publish status:", error);
      setError("公開状態の変更に失敗しました");
    }
  };

  const deleteArticle = async (articleId: number) => {
    if (!confirm("本当にこの記事を削除しますか？")) {
      return;
    }

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("記事の削除に失敗しました");
      }

      setArticles(articles.filter(article => article.id !== articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
      setError("記事の削除に失敗しました");
    }
  };

  const handleEditArticle = (articleId: number) => {
    router.push(`/admin/edit/${articleId}`);
  };

  const handleCreateArticle = () => {
    router.push("/articles/new");
  };

  if (status === "loading" || loading) {
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
            <button
              onClick={handleCreateArticle}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
            >
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

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
                    {article.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          article.published
                            ? "bg-sky-100 text-sky-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {tag.name}
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
                    onClick={() => handleEditArticle(article.id)}
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
                {article.published ? "作成日" : "最終更新"}: {new Date(article.modifiedAt).toLocaleDateString('ja-JP')}
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
            <button
              onClick={handleCreateArticle}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center mx-auto"
            >
              <FaPlus className="mr-2" />
              記事作成
            </button>
          </div>
        )}
      </div>
    </div>
  );
}