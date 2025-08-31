'use client';

import { useState, useEffect, useMemo } from 'react';
import ArticleListHeader from '@/components/ArticleListHeader';
import ArticleFilters from '@/components/ArticleFilters';
import ArticleGrid from '@/components/ArticleGrid';
import ArticleStats from '@/components/ArticleStats';
import Pagination from '@/components/Pagination';
import { Article, User, Tag, Icon } from '@prisma/client';

type ArticleWithRelations = Article & {
  author: User;
  tags: Tag[];
  icon: Icon;
};

// サンプルデータ - 実際のアプリではAPIから取得
const sampleArticles: ArticleWithRelations[] = [
  {
    id: 1,
    title: 'Next.js 15の新機能について',
    body: 'Next.js 15がリリースされ、多くの新機能が追加されました。この記事では、主要な新機能について詳しく解説します。',
    like: 42,
    published: true,
    authorId: '1',
    iconId: 1,
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    modifiedAt: new Date('2024-01-15'),
    author: { id: '1', username: 'john_doe', email: 'john@example.com', password: '', name: '田中太郎', createdAt: new Date(), modifiedAt: new Date() },
    tags: [
      { id: 1, name: 'Next.js' },
      { id: 2, name: 'React' },
      { id: 3, name: 'JavaScript' }
    ],
    icon: { id: 1, name: 'nextjs', url: 'https://via.placeholder.com/400x200/0070f3/ffffff?text=Next.js' }
  },
  {
    id: 2,
    title: 'TypeScriptの型安全性を活用した開発手法',
    body: 'TypeScriptを使用することで、より安全で保守性の高いコードを書くことができます。実践的なテクニックを紹介します。',
    like: 38,
    published: true,
    authorId: '2',
    iconId: 2,
    publishedAt: new Date('2024-01-12'),
    createdAt: new Date('2024-01-12'),
    modifiedAt: new Date('2024-01-12'),
    author: { id: '2', username: 'jane_smith', email: 'jane@example.com', password: '', name: '佐藤花子', createdAt: new Date(), modifiedAt: new Date() },
    tags: [
      { id: 4, name: 'TypeScript' },
      { id: 3, name: 'JavaScript' },
      { id: 5, name: '開発手法' }
    ],
    icon: { id: 2, name: 'typescript', url: 'https://via.placeholder.com/400x200/3178c6/ffffff?text=TypeScript' }
  },
  {
    id: 3,
    title: 'Tailwind CSSでモダンなUIを作る',
    body: 'Tailwind CSSを使用して、効率的にモダンなユーザーインターフェースを構築する方法を学びます。',
    like: 56,
    published: true,
    authorId: '3',
    iconId: 3,
    publishedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10'),
    modifiedAt: new Date('2024-01-10'),
    author: { id: '3', username: 'bob_wilson', email: 'bob@example.com', password: '', name: '山田次郎', createdAt: new Date(), modifiedAt: new Date() },
    tags: [
      { id: 6, name: 'CSS' },
      { id: 7, name: 'Tailwind' },
      { id: 8, name: 'UI/UX' }
    ],
    icon: { id: 3, name: 'tailwind', url: 'https://via.placeholder.com/400x200/06b6d4/ffffff?text=Tailwind' }
  },
  {
    id: 4,
    title: 'Reactのパフォーマンス最適化テクニック',
    body: 'Reactアプリケーションのパフォーマンスを向上させるための実践的なテクニックを紹介します。',
    like: 29,
    published: true,
    authorId: '1',
    iconId: 4,
    publishedAt: new Date('2024-01-08'),
    createdAt: new Date('2024-01-08'),
    modifiedAt: new Date('2024-01-08'),
    author: { id: '1', username: 'john_doe', email: 'john@example.com', password: '', name: '田中太郎', createdAt: new Date(), modifiedAt: new Date() },
    tags: [
      { id: 2, name: 'React' },
      { id: 9, name: 'パフォーマンス' },
      { id: 10, name: '最適化' }
    ],
    icon: { id: 4, name: 'react', url: 'https://via.placeholder.com/400x200/61dafb/000000?text=React' }
  },
  {
    id: 5,
    title: 'GraphQLとREST APIの比較',
    body: 'GraphQLとREST APIの違いについて、実際の使用例を交えながら詳しく比較していきます。',
    like: 33,
    published: true,
    authorId: '2',
    iconId: 5,
    publishedAt: new Date('2024-01-05'),
    createdAt: new Date('2024-01-05'),
    modifiedAt: new Date('2024-01-05'),
    author: { id: '2', username: 'jane_smith', email: 'jane@example.com', password: '', name: '佐藤花子', createdAt: new Date(), modifiedAt: new Date() },
    tags: [
      { id: 11, name: 'GraphQL' },
      { id: 12, name: 'REST API' },
      { id: 13, name: 'API設計' }
    ],
    icon: { id: 5, name: 'graphql', url: 'https://via.placeholder.com/400x200/e10098/ffffff?text=GraphQL' }
  },
  {
    id: 6,
    title: 'Docker入門：コンテナ化の基本',
    body: 'Dockerを使ったアプリケーションのコンテナ化について、基本的な概念から実践的な使い方まで解説します。',
    like: 45,
    published: true,
    authorId: '3',
    iconId: 6,
    publishedAt: new Date('2024-01-03'),
    createdAt: new Date('2024-01-03'),
    modifiedAt: new Date('2024-01-03'),
    author: { id: '3', username: 'bob_wilson', email: 'bob@example.com', password: '', name: '山田次郎', createdAt: new Date(), modifiedAt: new Date() },
    tags: [
      { id: 14, name: 'Docker' },
      { id: 15, name: 'DevOps' },
      { id: 16, name: 'インフラ' }
    ],
    icon: { id: 6, name: 'docker', url: 'https://via.placeholder.com/400x200/2496ed/ffffff?text=Docker' }
  }
];

const allTags: Tag[] = [
  { id: 1, name: 'Next.js' },
  { id: 2, name: 'React' },
  { id: 3, name: 'JavaScript' },
  { id: 4, name: 'TypeScript' },
  { id: 5, name: '開発手法' },
  { id: 6, name: 'CSS' },
  { id: 7, name: 'Tailwind' },
  { id: 8, name: 'UI/UX' },
  { id: 9, name: 'パフォーマンス' },
  { id: 10, name: '最適化' },
  { id: 11, name: 'GraphQL' },
  { id: 12, name: 'REST API' },
  { id: 13, name: 'API設計' },
  { id: 14, name: 'Docker' },
  { id: 15, name: 'DevOps' },
  { id: 16, name: 'インフラ' }
];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const itemsPerPage = 12;

  // フィルタリングとソート
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = sampleArticles.filter(article => {
      // 検索クエリでフィルタ
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.body.toLowerCase().includes(searchQuery.toLowerCase());

      // タグでフィルタ
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tagName => 
          article.tags.some(tag => tag.name === tagName)
        );

      return matchesSearch && matchesTags;
    });

    // ソート
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return b.like - a.like;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedTags, sortBy]);

  // ページネーション
  const totalPages = Math.ceil(filteredAndSortedArticles.length / itemsPerPage);
  const paginatedArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ページが変更されたときに先頭にスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // 統計データ
  const stats = {
    totalArticles: sampleArticles.length,
    totalTags: allTags.length,
    totalLikes: sampleArticles.reduce((sum, article) => sum + article.like, 0),
    recentArticlesCount: sampleArticles.filter(article => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(article.publishedAt) >= thirtyDaysAgo;
    }).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <ArticleListHeader 
          totalCount={filteredAndSortedArticles.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        {/* 統計情報 */}
        <ArticleStats {...stats} />

        {/* フィルター */}
        <ArticleFilters
          tags={allTags}
          selectedTags={selectedTags}
          onTagChange={setSelectedTags}
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
            setCurrentPage(1); // 検索時は1ページ目に戻る
          }}
          sortBy={sortBy}
          onSortChange={(sort) => {
            setSortBy(sort);
            setCurrentPage(1); // ソート時は1ページ目に戻る
          }}
        />

        {/* 記事グリッド */}
        <ArticleGrid 
          articles={paginatedArticles}
          loading={loading}
        />

        {/* ページネーション */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}