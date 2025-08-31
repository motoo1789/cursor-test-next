'use client';

import { useState, useMemo } from 'react';
import ArticleListHeaderNew from '@/components/ArticleListHeaderNew';
import SearchFiltersNew from '@/components/SearchFiltersNew';
import ArticleGridNew from '@/components/ArticleGridNew';
import PaginationNew from '@/components/PaginationNew';

// Sample articles data - in a real app, this would come from an API
const allArticles = [
  {
    id: '1',
    title: 'Next.js 15の新機能について詳しく解説',
    excerpt: 'Next.js 15がリリースされ、多くの新機能が追加されました。App Routerの改善、パフォーマンスの向上、新しいAPIについて詳しく解説します。',
    author: '田中太郎',
    publishedAt: '2024年1月15日',
    category: 'tech',
    tags: ['Next.js', 'React', 'JavaScript'],
    readTime: '5分',
    views: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop'
  },
  {
    id: '2',
    title: 'Tailwind CSSでモダンなUIを作る方法',
    excerpt: 'Tailwind CSSを使ってモダンで美しいUIを効率的に作成する方法について、実際のコード例とともに詳しく説明します。',
    author: '佐藤花子',
    publishedAt: '2024年1月12日',
    category: 'design',
    tags: ['CSS', 'Tailwind', 'UI/UX'],
    readTime: '8分',
    views: 980,
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop'
  },
  {
    id: '3',
    title: 'TypeScriptの型安全性を活用したReact開発',
    excerpt: 'TypeScriptの強力な型システムを活用して、より安全で保守性の高いReactアプリケーションを開発する方法を解説します。',
    author: '鈴木一郎',
    publishedAt: '2024年1月10日',
    category: 'tech',
    tags: ['TypeScript', 'React', '型安全性'],
    readTime: '12分',
    views: 1580,
  },
  {
    id: '4',
    title: 'フロントエンド開発者のためのパフォーマンス最適化',
    excerpt: 'Webアプリケーションのパフォーマンスを向上させるための実践的なテクニックと最適化手法について詳しく解説します。',
    author: '山田美咲',
    publishedAt: '2024年1月8日',
    category: 'tech',
    tags: ['パフォーマンス', 'Web開発', '最適化'],
    readTime: '10分',
    views: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop'
  },
  {
    id: '5',
    title: 'デザインシステムの構築と運用',
    excerpt: 'スケーラブルなデザインシステムを構築し、チーム全体で効果的に運用するためのベストプラクティスを紹介します。',
    author: '高橋健太',
    publishedAt: '2024年1月5日',
    category: 'design',
    tags: ['デザインシステム', 'UI/UX', 'チーム開発'],
    readTime: '15分',
    views: 1750,
    imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&h=450&fit=crop'
  },
  {
    id: '6',
    title: 'モバイルファーストなレスポンシブデザイン',
    excerpt: 'モバイルファーストのアプローチでレスポンシブなWebサイトを設計・実装する際のポイントと実践的なテクニックを解説します。',
    author: '伊藤優子',
    publishedAt: '2024年1月3日',
    category: 'design',
    tags: ['レスポンシブ', 'モバイル', 'CSS'],
    readTime: '7分',
    views: 1320,
  },
  {
    id: '7',
    title: 'React Hooksの効果的な使い方',
    excerpt: 'React Hooksを使って関数コンポーネントでstate管理や副作用を扱う方法について、実践的な例とともに解説します。',
    author: '中村直樹',
    publishedAt: '2024年1月1日',
    category: 'tech',
    tags: ['React', 'Hooks', 'JavaScript'],
    readTime: '9分',
    views: 1890,
    imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=450&fit=crop'
  },
  {
    id: '8',
    title: 'ユーザビリティを向上させるUIデザインの原則',
    excerpt: 'ユーザーにとって使いやすいUIを設計するための基本的な原則と実践的なテクニックについて詳しく解説します。',
    author: '小林麻衣',
    publishedAt: '2023年12月28日',
    category: 'design',
    tags: ['UI/UX', 'ユーザビリティ', 'デザイン'],
    readTime: '11分',
    views: 1456,
  },
  {
    id: '9',
    title: 'Webアクセシビリティの基礎知識',
    excerpt: 'すべてのユーザーがアクセスできるWebサイトを作るためのアクセシビリティの基礎知識と実装方法について説明します。',
    author: '森田健司',
    publishedAt: '2023年12月25日',
    category: 'tech',
    tags: ['アクセシビリティ', 'Web標準', 'HTML'],
    readTime: '13分',
    views: 1123,
    imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=450&fit=crop'
  },
];

export default function ArticlesPage() {
  const [searchValue, setSearchValue] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  
  const articlesPerPage = 6;

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = allArticles.filter((article) => {
      const matchesSearch = searchValue === '' || 
        article.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchValue.toLowerCase()) ||
        article.author.toLowerCase().includes(searchValue.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || article.category === selectedCategory;
      const matchesTag = selectedTag === '' || article.tags.some(tag => 
        tag.toLowerCase().includes(selectedTag.toLowerCase())
      );
      
      return matchesSearch && matchesCategory && matchesTag;
    });

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return b.views - a.views;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

    return filtered;
  }, [searchValue, selectedCategory, selectedTag, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage);
  const paginatedArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    switch (filterType) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'tag':
        setSelectedTag(value);
        break;
      case 'sort':
        setSortBy(value);
        break;
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ArticleListHeaderNew
        onSearchChange={handleSearchChange}
        onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
        searchValue={searchValue}
      />
      
      {/* Filters */}
      <SearchFiltersNew
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
        sortBy={sortBy}
        onCategoryChange={(value) => handleFilterChange('category', value)}
        onTagChange={(value) => handleFilterChange('tag', value)}
        onSortChange={(value) => handleFilterChange('sort', value)}
      />
      
      {/* Articles Grid */}
      <ArticleGridNew articles={paginatedArticles} />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationNew
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}