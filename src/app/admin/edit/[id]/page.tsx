"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSave, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

interface Article {
  id: number;
  title: string;
  body: string;
  published: boolean;
  tags: { id: number; name: string }[];
  icon: { id: number; name: string; url: string };
  author: { id: string; name: string };
}

interface Tag {
  id: number;
  name: string;
}

interface Icon {
  id: number;
  name: string;
  url: string;
}

export default function EditArticlePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [availableIcons, setAvailableIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;

      try {
        // 記事データを取得
        const articleResponse = await fetch(`/api/articles/${params.id}`);
        if (!articleResponse.ok) {
          throw new Error("記事の取得に失敗しました");
        }
        const articleData = await articleResponse.json();

        // ユーザーが記事の作者でない場合はアクセス拒否
        if (articleData.authorId !== session?.user?.id) {
          router.push("/admin");
          return;
        }

        setArticle(articleData);
        setTitle(articleData.title);
        setBody(articleData.body);
        setPublished(articleData.published);
        setSelectedTags(articleData.tags.map((tag: any) => tag.id));
        setSelectedIcon(articleData.iconId);

        // タグとアイコンの一覧を取得
        const [tagsResponse, iconsResponse] = await Promise.all([
          fetch("/api/tags"),
          fetch("/api/icons"),
        ]);

        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          setAvailableTags(tagsData);
        }

        if (iconsResponse.ok) {
          const iconsData = await iconsResponse.json();
          setAvailableIcons(iconsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchData();
    }
  }, [params.id, session?.user?.id, router]);

  const handleSave = async () => {
    if (!title.trim() || !body.trim() || !selectedIcon || selectedTags.length === 0) {
      setError("すべての必須項目を入力してください");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/articles/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          iconId: selectedIcon,
          tagIds: selectedTags,
          published,
          publishedAt: published ? new Date().toISOString() : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("記事の更新に失敗しました");
      }

      router.push("/admin");
    } catch (error) {
      console.error("Error saving article:", error);
      setError("記事の保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const handleTagToggle = (tagId: number) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
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
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/admin")}
              className="p-2 hover:bg-gray-200 rounded-full transition duration-150 ease-in-out"
            >
              <FaArrowLeft className="text-xl text-gray-600" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">記事編集</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPublished(!published)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition duration-150 ease-in-out ${
                published
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {published ? <FaEye className="mr-2" /> : <FaEyeSlash className="mr-2" />}
              {published ? "公開" : "下書き"}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
            >
              <FaSave className="mr-2" />
              {saving ? "保存中..." : "保存"}
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              タイトル *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="記事のタイトルを入力"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
              本文 *
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="記事の本文をMarkdown形式で入力"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              アイコン *
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {availableIcons.map((icon) => (
                <button
                  key={icon.id}
                  onClick={() => setSelectedIcon(icon.id)}
                  className={`p-3 rounded-lg border-2 transition duration-150 ease-in-out ${
                    selectedIcon === icon.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <img src={icon.url} alt={icon.name} className="w-8 h-8 mx-auto" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              タグ *
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition duration-150 ease-in-out ${
                    selectedTags.includes(tag.id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}