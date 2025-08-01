"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArticleDetail, TableOfContentsItem } from "@/types/api";
import { getArticleDetail } from "@/lib/api";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleContent from "@/components/ArticleContent";
import ArticleSidebar from "@/components/ArticleSidebar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";

export default function ArticleDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLikes, setCurrentLikes] = useState(0);

  // 目次を生成する関数
  const generateTableOfContents = (content: string): TableOfContentsItem[] => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const toc: TableOfContentsItem[] = [];
    let match;

    // デフォルトの目次項目を追加
    toc.push(
      { id: "summary", title: "概要", level: 2 },
      { id: "tech-stack", title: "技術スタック", level: 2 },
      { id: "main-content", title: "本文", level: 2 }
    );

    // Markdownから見出しを抽出
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, "") // 日本語文字も含める
        .replace(/\s+/g, "-");

      // main-content セクション内の見出しとして追加
      if (level >= 2) {
        toc.push({
          id: `content-${id}`,
          title,
          level: level + 1, // レベルを調整
        });
      }
    }

    return toc;
  };

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);

      const id = parseInt(params.id as string);
      console.log("Fetching article with ID:", id);

      if (isNaN(id)) {
        console.error("Invalid article ID:", params.id);
        setError("無効な記事IDです。");
        return;
      }

      const response = await getArticleDetail(id);
      console.log("API Response:", response);

      if (!response) {
        console.error("No article found for ID:", id);
        setError("記事が見つかりませんでした。");
        return;
      }

      console.log("Article loaded successfully:", response.title);
      setArticle(response);
      setCurrentLikes(response.like || 0);
    } catch (err) {
      console.error("Error fetching article:", err);
      setError("記事の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  // いいね数変更時のハンドラー
  const handleLikeChange = (likes: number, isLiked: boolean) => {
    setCurrentLikes(likes);
    // 記事オブジェクトのlike数も更新
    if (article) {
      setArticle({
        ...article,
        like: likes,
      });
    }
    console.log(
      `いいね数が更新されました: ${likes} (いいね状態: ${
        isLiked ? "済み" : "未"
      })`
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      // フォールバック: URLをクリップボードにコピー
      navigator.clipboard.writeText(window.location.href);
      alert("URLをクリップボードにコピーしました");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <ArticleHeader />
        <div className="container mx-auto px-4 md:px-6 py-8 pt-24">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="ml-4 text-gray-600">記事を読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <ArticleHeader />
        <div className="container mx-auto px-4 md:px-6 py-8 pt-24">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <div className="flex items-center">
              <span className="material-icons mr-2">error</span>
              {error || "記事が見つかりませんでした。"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tableOfContents = generateTableOfContents(article.content);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ArticleHeader />
      <div className="container mx-auto px-4 md:px-6 py-8 pt-24">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            <ArticleContent article={article} currentLikes={currentLikes} />
            <ArticleSidebar
              tableOfContents={tableOfContents}
              onShare={handleShare}
              articleId={article.id}
              initialLikes={currentLikes}
              onLikeChange={handleLikeChange}
            />
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
