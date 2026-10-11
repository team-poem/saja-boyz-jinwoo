'use client';

import { useRef, useState } from 'react';
import { loadArticlePage } from '../../api/load-article-page';
import { ArticleList } from './article-list';

type ArticlePage = NonNullable<Awaited<ReturnType<typeof loadArticlePage>>>;

export function PaginatedArticleList({
  initialPage,
}: {
  initialPage: ArticlePage;
}) {
  const [page, setPage] = useState(initialPage);
  const [offset, setOffset] = useState(initialPage.items.length);
  const [pending, setPending] = useState(false);
  const inFlight = useRef(false);

  async function loadMore() {
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    try {
      const nextPage = await loadArticlePage(offset);
      if (!nextPage) return;
      setPage((previous) => ({
        ...nextPage,
        items: [...previous.items, ...nextPage.items],
      }));
      setOffset(offset + nextPage.items.length);
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  return (
    <>
      <ArticleList items={page.items} apiOrigin={page.apiOrigin} />
      {offset < page.total && (
        <button
          type="button"
          disabled={pending}
          onClick={loadMore}
          className="rounded-lg border border-solid border-border bg-surface px-3 py-2 text-brand disabled:opacity-50"
        >
          더 보기
        </button>
      )}
    </>
  );
}
