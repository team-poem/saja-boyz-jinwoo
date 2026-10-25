import Link from 'next/link';

import { Notice } from '@/components/feedback/notice';
import { PaginatedArticleList } from '@/features/article-list/ui/article-list/paginated-article-list';
import { fetchArticleList } from '@/features/article-list/api/fetch-articles';

// Read runtime configuration on every request, including configuration errors.
export const dynamic = 'force-dynamic';

export default async function IncidentsPage() {
  const result = await fetchArticleList(undefined, 0, 'popular');

  return (
    <section aria-label="사건 목록">
      <h1 className="sr-only">사건 목록</h1>
      <p className="text-sm text-muted">최근 30일 인기순</p>
      <div className="flex flex-wrap gap-4 py-4 text-sm">
        <Link href="/archive" className="ui-link text-brand underline">
          기사 아카이브
        </Link>
        <Link href="/about" className="ui-link text-brand underline">
          서비스 안내
        </Link>
      </div>
      {result ? (
        <PaginatedArticleList initialPage={result} />
      ) : (
        <Notice
          role="alert"
          title="주변 소식을 다시 이어볼까요?"
          action={<Link href="/incidents">다시 시도</Link>}
        >
          기사를 불러오지 못했어요
          <p>연결을 확인한 뒤 다시 눌러주세요.</p>
        </Notice>
      )}
    </section>
  );
}
