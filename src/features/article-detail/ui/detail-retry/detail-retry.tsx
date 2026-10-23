'use client';

import Link from 'next/link';

import { useArticleSheetRoute } from '../../model/article-sheet-context';

export function DetailRetry({ id }: { id: string }) {
  const route = useArticleSheetRoute();

  return (
    <Link
      href={'/incidents/' + id}
      scroll={false}
      className="text-sm font-bold text-brand underline underline-offset-4"
      onClick={(event) => {
        if (
          !route ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        )
          return;
        event.preventDefault();
        route.retry();
      }}
    >
      다시 시도
    </Link>
  );
}
