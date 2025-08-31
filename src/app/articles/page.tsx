'use client';

import { useState, useEffect } from 'react';
import ArticleHeader from '@/components/ArticleHeader';
import SearchSection from '@/components/SearchSection';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import { ArticleSummary, Pagination as PaginationType } from '@/types/api';
import { getArticles } from '@/lib/api';

export default function ArticlesPage() {

  return (
    
    <div>
      <h1>Articles</h1>
    </div>
    
  );
}