'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { LoadingSpinner } from '@/components/feedback/loading-spinner';

import { useArticleSheetRoute } from '../../model/article-sheet-context';

export function DetailRetry({ id }: { id: string }) {
  const route = useArticleSheetRoute();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Link
      href={'/incidents/' + id}
      scroll={false}
      aria-label="다시 시도"
      aria-busy={pending}
      aria-disabled={pending || undefined}
      className="inline-flex items-center gap-2 text-sm font-bold text-brand"
      onClick={(event) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        )
          return;
        event.preventDefault();
        if (pending) return;
        startTransition(() => {
          if (route) route.retry();
          else router.refresh();
        });
      }}
    >
      {pending && (
        <span role="status" aria-busy="true" className="inline-flex size-4">
          <LoadingSpinner />
          <span className="sr-only">기사를 다시 불러오는 중이에요</span>
        </span>
      )}
      <span className="underline underline-offset-4">다시 시도</span>
    </Link>
  );
}
