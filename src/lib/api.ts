import { ArticlesResponse, ArticlesParams, ArticleDetail } from "@/types/api";
import { getMockArticles } from "./mockData";

const API_BASE_URL =
  (typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_API_URL) ||
  "http://localhost:3000";
const USE_MOCK_DATA =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

// 記事本文から要約を生成する関数
function generateExcerpt(body: string): string {
  // Markdownのヘッダーやコードブロックを除去
  const cleanText = body
    .replace(/^#+\s+/gm, "") // ヘッダー
    .replace(/```[\s\S]*?```/g, "") // コードブロック
    .replace(/`[^`]*`/g, "") // インラインコード
    .replace(/\*\*([^*]+)\*\*/g, "$1") // 太字
    .replace(/\*([^*]+)\*/g, "$1") // 斜体
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // リンク
    .replace(/\n+/g, " ") // 改行を空白に
    .trim();

  return cleanText.length > 150
    ? cleanText.substring(0, 150) + "..."
    : cleanText;
}

// 記事本文から読了時間を計算する関数
function calculateReadingTime(body: string): number {
  const wordsPerMinute = 200; // 日本語の平均読了速度（文字/分）
  const wordCount = body.replace(/\s+/g, "").length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// ランダムなビュー数を生成する関数（いいね数は削除）
function generateRandomViews() {
  return Math.floor(Math.random() * 500) + 10;
}

// デフォルトカテゴリを生成する関数
function generateDefaultCategory() {
  return {
    id: 1,
    name: "技術記事",
    description: "技術に関する記事",
    icon: "code",
    articleCount: 0,
  };
}

export async function getArticles(
  params: ArticlesParams = {}
): Promise<ArticlesResponse> {
  // 開発環境でモックデータを使用する場合
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getMockArticles(
      params.page || 1,
      params.limit || 9,
      params.query,
      params.tags
    );
  }

  try {
    // データベースから記事を取得
    const response = await fetch(`${API_BASE_URL}/api/articles`);

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const dbArticles = await response.json();

    // データベースの記事データを画面表示用の形式に変換
    const articles = dbArticles.map((article: any) => ({
      id: article.id,
      title: article.title,
      excerpt: generateExcerpt(article.body),
      like: article.like, // データベースから取得したいいね数を使用
      views: generateRandomViews(), // ビュー数のみランダム
      tags: article.tags.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        description: tag.description || "",
        color: tag.color || "#3B82F6", // デフォルト色
        articleCount: 0,
      })),
      category: generateDefaultCategory(),
      author: {
        id: article.author.id,
        githubId: article.author.githubId || "",
        name: article.author.name,
        email: article.author.email,
        avatarUrl: article.author.avatarUrl || "/default-avatar.png",
        bio: article.author.bio || "",
        website: article.author.website || "",
        createdAt: article.author.createdAt,
        modifiedAt: article.author.modifiedAt,
      },
      icon: {
        id: article.icon.id,
        name: article.icon.name,
        url: article.icon.url,
      },
      publishedAt: article.publishedAt,
      readingTime: calculateReadingTime(article.body),
    }));

    // フィルタリングとソート
    let filteredArticles = articles;

    // 検索クエリでのフィルタリング
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredArticles = articles.filter(
        (article: any) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query)
      );
    }

    // タグでのフィルタリング
    if (params.tags && params.tags.length > 0) {
      filteredArticles = filteredArticles.filter((article: any) =>
        params.tags!.some((tagName) =>
          article.tags.some((tag: any) => tag.name === tagName)
        )
      );
    }

    // ソート
    if (params.sortBy) {
      filteredArticles.sort((a: any, b: any) => {
        const aValue = a[params.sortBy!];
        const bValue = b[params.sortBy!];

        if (params.order === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    // ページネーション
    const page = params.page || 1;
    const limit = params.limit || 9;
    const totalItems = filteredArticles.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    return {
      articles: paginatedArticles,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function getArticleDetail(id: number) {
  // 開発環境でモックデータを使用する場合
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { getMockArticleDetail } = await import("./mockData");
    return getMockArticleDetail(id);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch article");
    }

    const dbArticle = await response.json();

    // データベースの記事データを画面表示用の形式に変換
    return {
      id: dbArticle.id,
      title: dbArticle.title,
      excerpt: generateExcerpt(dbArticle.body),
      like: dbArticle.like, // データベースから取得したいいね数を使用
      views: generateRandomViews(), // ビュー数のみランダム
      tags: dbArticle.tags.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        description: tag.description || "",
        color: tag.color || "#3B82F6",
        articleCount: 0,
      })),
      category: generateDefaultCategory(),
      author: {
        id: dbArticle.author.id,
        githubId: dbArticle.author.githubId || "",
        name: dbArticle.author.name,
        email: dbArticle.author.email,
        avatarUrl: dbArticle.author.avatarUrl || "/default-avatar.png",
        bio: dbArticle.author.bio || "",
        website: dbArticle.author.website || "",
        createdAt: dbArticle.author.createdAt,
        modifiedAt: dbArticle.author.modifiedAt,
      },
      icon: {
        id: dbArticle.icon.id,
        name: dbArticle.icon.name,
        url: dbArticle.icon.url,
      },
      publishedAt: dbArticle.publishedAt,
      readingTime: calculateReadingTime(dbArticle.body),
      content: dbArticle.body,
      summary: generateExcerpt(dbArticle.body),
      techStack: [], // 適当な値
    };
  } catch (error) {
    console.error("Error fetching article detail:", error);
    throw error;
  }
}
