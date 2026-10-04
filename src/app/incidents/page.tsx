import {
  ArticleList,
  type ArticleCollectionItem,
} from '@/features/article-list/article-list';

export default async function IncidentsPage() {
  const url = new URL('/news', process.env.NEWS_API_BASE_URL);
  url.searchParams.set('offset', '0');
  url.searchParams.set('limit', '20');

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  });
  const { items }: { items: ArticleCollectionItem[] } = await response.json();

  return (
    <section aria-label="사건 목록">
      <h1>사건 목록</h1>
      <ArticleList items={items} />
    </section>
  );
}
