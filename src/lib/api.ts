import { ArticlesResponse, ArticlesParams, ArticleDetail } from '@/types/api';
import { getMockArticles } from './mockData';

const API_BASE_URL = (typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_API_URL) || 'http://localhost:3000/api/v1';
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_URL;

export async function getArticles(params: ArticlesParams = {}): Promise<ArticlesResponse> {
  // 開発環境でAPIが設定されていない場合はモックデータを使用
  if (USE_MOCK_DATA) {
    // モックデータの場合は少し遅延を追加してローディング状態をテスト
    await new Promise(resolve => setTimeout(resolve, 800));
    return getMockArticles(params.page || 1, params.limit || 9);
  }

  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.tags && params.tags.length > 0) searchParams.set('tags', params.tags.join(','));
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.order) searchParams.set('order', params.order);

  const response = await fetch(`${API_BASE_URL}/articles?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  
  return response.json();
}

export async function getArticleDetail(id: number) {
  // 開発環境でAPIが設定されていない場合はモックデータを使用
  if (USE_MOCK_DATA) {
    // モックデータの場合は少し遅延を追加してローディング状態をテスト
    await new Promise(resolve => setTimeout(resolve, 500));
    const { getMockArticleDetail } = await import('./mockData');
    return getMockArticleDetail(id);
  }

  const response = await fetch(`${API_BASE_URL}/articles/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch article');
  }
  
  return response.json();
}