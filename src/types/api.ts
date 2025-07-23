export interface User {
  id: number;
  githubId: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio?: string;
  website?: string;
  createdAt: string;
  modifiedAt: string;
}

export interface Tag {
  id: number;
  name: string;
  description?: string;
  color: string;
  articleCount: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon: string;
  articleCount: number;
}

export interface Icon {
  id: number;
  name: string;
  url: string;
}

export interface ArticleSummary {
  id: number;
  title: string;
  excerpt: string;
  like: number;
  views: number;
  tags: Tag[];
  category: Category;
  author: User;
  icon: Icon;
  publishedAt: string;
  readingTime: number;
  published: boolean;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ArticlesResponse {
  articles: ArticleSummary[];
  pagination: Pagination;
}

export interface ArticlesParams {
  page?: number;
  limit?: number;
  tags?: string[];
  query?: string;
  sortBy?: 'publishedAt' | 'like' | 'views';
  order?: 'asc' | 'desc';
}

export interface ArticleDetail extends ArticleSummary {
  content: string;
  summary: string;
  techStack: string[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}