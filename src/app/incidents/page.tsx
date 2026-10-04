import Link from 'next/link';
import {
  ArticleList,
  type ArticleCollectionItem,
} from '@/features/article-list/article-list';

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isArticleCollectionItem(
  value: unknown,
): value is ArticleCollectionItem {
  if (!isRecord(value) || !isRecord(value.article)) return false;

  return (
    typeof value.article_id === 'string' &&
    /^[a-f0-9]{64}$/.test(value.article_id) &&
    typeof value.article.title === 'string' &&
    typeof value.article.description === 'string' &&
    typeof value.article.pubDate === 'string' &&
    typeof value.article.originallink === 'string' &&
    typeof value.article.link === 'string' &&
    typeof value.image_status === 'string' &&
    (value.image_url === null || typeof value.image_url === 'string')
  );
}

async function fetchArticleList() {
  try {
    const baseUrl = process.env.NEWS_API_BASE_URL;
    if (!baseUrl) return null;

    const base = new URL(baseUrl);
    if (
      (base.protocol !== 'http:' && base.protocol !== 'https:') ||
      base.username ||
      base.password
    ) {
      return null;
    }

    const url = new URL('/news', base);
    url.searchParams.set('offset', '0');
    url.searchParams.set('limit', '20');

    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;

    const payload: unknown = await response.json();
    if (
      !isRecord(payload) ||
      typeof payload.total !== 'number' ||
      !Number.isInteger(payload.total) ||
      payload.total < 0 ||
      !Array.isArray(payload.items) ||
      !payload.items.every(isArticleCollectionItem)
    ) {
      return null;
    }

    return { items: payload.items, apiOrigin: url.origin };
  } catch {
    return null;
  }
}

export default async function IncidentsPage() {
  const result = await fetchArticleList();

  return (
    <section aria-label="사건 목록">
      <h1>사건 목록</h1>
      {result ? (
        <ArticleList items={result.items} apiOrigin={result.apiOrigin} />
      ) : (
        <div role="alert">
          기사를 불러오지 못했어요 <Link href="/incidents">다시 시도</Link>
        </div>
      )}
    </section>
  );
}
