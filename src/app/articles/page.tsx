'use client';

import { useState, useEffect } from 'react';
import ArticleCard from '@/components/articles/ArticleCard';
import ArticleHeader from '@/components/articles/ArticleHeader';
import ArticleFilters from '@/components/articles/ArticleFilters';
import ArticlePagination from '@/components/articles/ArticlePagination';
import { ArticleSummary, ArticlesParams } from '@/types/api';

// Sample articles data - in a real app, this would come from an API
const sampleArticles: ArticleSummary[] = [
  {
    id: 1,
    title: "Next.js 15の新機能とパフォーマンス改善について",
    excerpt: "Next.js 15で追加された新機能とパフォーマンス改善について詳しく解説します。App Routerの進化やTurbopackの統合など、開発体験を向上させる機能を紹介。",
    like: 42,
    views: 1250,
    tags: [
      { id: 1, name: "Next.js", description: "", color: "#000000", articleCount: 15 },
      { id: 2, name: "React", description: "", color: "#61DAFB", articleCount: 25 },
      { id: 3, name: "JavaScript", description: "", color: "#F7DF1E", articleCount: 30 }
    ],
    category: { id: 1, name: "フロントエンド", description: "", icon: "🎨", articleCount: 45 },
    author: {
      id: 1,
      githubId: "developer1",
      name: "田中太郎",
      email: "tanaka@example.com",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      createdAt: "2024-01-01",
      modifiedAt: "2024-01-01"
    },
    icon: { id: 1, name: "nextjs", url: "https://nextjs.org/static/favicon/favicon-32x32.png" },
    publishedAt: "2024-12-15",
    readingTime: 8,
    published: true
  },
  {
    id: 2,
    title: "TypeScriptの型安全性を活用したAPIクライアント設計",
    excerpt: "TypeScriptの型システムを活用して、型安全なAPIクライアントを設計する方法を解説。zodやtRPCを使った実装例も紹介します。",
    like: 38,
    views: 980,
    tags: [
      { id: 4, name: "TypeScript", description: "", color: "#3178C6", articleCount: 20 },
      { id: 5, name: "API", description: "", color: "#FF6B6B", articleCount: 12 },
      { id: 6, name: "Zod", description: "", color: "#4F46E5", articleCount: 8 }
    ],
    category: { id: 2, name: "バックエンド", description: "", icon: "⚙️", articleCount: 32 },
    author: {
      id: 2,
      githubId: "developer2",
      name: "佐藤花子",
      email: "sato@example.com",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      createdAt: "2024-01-01",
      modifiedAt: "2024-01-01"
    },
    icon: { id: 2, name: "typescript", url: "https://www.typescriptlang.org/favicon-32x32.png" },
    publishedAt: "2024-12-10",
    readingTime: 12,
    published: true
  },
  {
    id: 3,
    title: "Prismaを使ったデータベース設計のベストプラクティス",
    excerpt: "Prismaを使用したデータベース設計の効率的な手法とパフォーマンス最適化について。リレーション設計からクエリ最適化まで幅広くカバー。",
    like: 56,
    views: 1580,
    tags: [
      { id: 7, name: "Prisma", description: "", color: "#2D3748", articleCount: 10 },
      { id: 8, name: "Database", description: "", color: "#E53E3E", articleCount: 18 },
      { id: 9, name: "PostgreSQL", description: "", color: "#336791", articleCount: 14 }
    ],
    category: { id: 2, name: "バックエンド", description: "", icon: "⚙️", articleCount: 32 },
    author: {
      id: 3,
      githubId: "developer3",
      name: "山田一郎",
      email: "yamada@example.com",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      createdAt: "2024-01-01",
      modifiedAt: "2024-01-01"
    },
    icon: { id: 3, name: "prisma", url: "https://www.prisma.io/images/favicon-32x32.png" },
    publishedAt: "2024-12-08",
    readingTime: 15,
    published: true
  }
];

export default function ArticlesPage() {
  const [articles] = useState<ArticleSummary[]>(sampleArticles);
  const [searchParams, setSearchParams] = useState<ArticlesParams>({
    page: 1,
    limit: 12,
    sortBy: 'publishedAt',
    order: 'desc'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleFilters 
          onSearch={(query) => setSearchParams(prev => ({ ...prev, query }))}
          onTagFilter={(tags) => setSearchParams(prev => ({ ...prev, tags }))}
          onSort={(sortBy, order) => setSearchParams(prev => ({ ...prev, sortBy, order }))}
        />
        
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <ArticlePagination 
          currentPage={searchParams.page || 1}
          totalPages={5}
          onPageChange={(page) => setSearchParams(prev => ({ ...prev, page }))}
        />
      </div>
    </div>
  );
}