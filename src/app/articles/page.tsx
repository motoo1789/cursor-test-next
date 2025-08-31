'use client';

import { useState, useMemo } from 'react';
import ArticleHeader from '@/components/ArticleHeader';
import SearchFilters from '@/components/SearchFilters';
import ArticleGrid from '@/components/ArticleGrid';
import Pagination from '@/components/Pagination';

// Sample articles data - in a real app, this would come from an API
const sampleArticles = [
  {
    id: '1',
    title: 'Next.js 14の新機能について',
    description: 'Next.js 14で追加された新機能と改善点について詳しく解説します。App Routerの進化やパフォーマンス向上について説明します。',
    tags: ['next', 'react']
  },
  {
    id: '2',
    title: 'React Hooks完全ガイド',
    description: 'React Hooksの基本から応用まで、実践的な使い方を学びます。useState、useEffect、カスタムフックの作成方法を解説します。',
    tags: ['react']
  },
  {
    id: '3',
    title: 'TypeScript型安全性のベストプラクティス',
    description: 'TypeScriptを使った型安全なコード作成のベストプラクティスを紹介します。ジェネリクスやユニオン型の活用法も説明します。',
    tags: ['typescript']
  },
  {
    id: '4',
    title: 'Tailwind CSSでモダンなUIを作る',
    description: 'Tailwind CSSを使って効率的にモダンなUIコンポーネントを作成する方法を学びます。レスポンシブデザインの実装も含みます。',
    tags: ['css', 'tailwind']
  },
  {
    id: '5',
    title: 'GraphQLとREST APIの比較',
    description: 'GraphQLとREST APIの違いとそれぞれの適用場面について解説します。実際のプロジェクトでの選択基準も説明します。',
    tags: ['graphql', 'api']
  },
  {
    id: '6',
    title: 'Dockerを使った開発環境構築',
    description: 'Dockerを使って効率的な開発環境を構築する方法を解説します。docker-composeを使った複数サービスの管理も含みます。',
    tags: ['docker', 'devops']
  }
];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['next', 'react']);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // フィルタリングされた記事
  const filteredArticles = useMemo(() => {
    return sampleArticles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => article.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  // ページネーション
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // 検索時はページを1に戻す
  };

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
    setCurrentPage(1); // フィルター変更時はページを1に戻す
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ArticleHeader />
        <SearchFilters 
          onSearchChange={handleSearchChange}
          onTagsChange={handleTagsChange}
        />
        <ArticleGrid articles={paginatedArticles} />
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}