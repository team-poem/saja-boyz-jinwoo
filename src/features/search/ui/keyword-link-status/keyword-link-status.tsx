'use client';

import { useLinkStatus } from 'next/link';

import { LoadingSpinner } from '@/components/feedback/loading-spinner';

export function KeywordLinkStatus() {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <span
      role="status"
      aria-busy="true"
      className="absolute inset-0 grid place-items-center rounded-[inherit] bg-surface/95 text-brand"
    >
      <span className="inline-flex size-3">
        <LoadingSpinner />
      </span>
      <span className="sr-only">검색 결과를 불러오는 중이에요</span>
    </span>
  );
}
