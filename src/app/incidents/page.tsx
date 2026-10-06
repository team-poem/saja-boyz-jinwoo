import Link from 'next/link';
import { ArticleList } from '@/features/article-list/ui/article-list/article-list';
import { fetchArticleList } from '@/features/article-list/api/fetch-articles';

// Read runtime configuration on every request, including configuration errors.
export const dynamic = 'force-dynamic';

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
