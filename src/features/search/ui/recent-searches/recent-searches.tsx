'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { KeywordLinkStatus } from '@/app/search/keyword-link-status';

function readKeywords(): string[] {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem('hh:recent-searches:v1') ?? '[]',
    );
    return Array.isArray(stored)
      ? stored.filter(
          (keyword): keyword is string =>
            typeof keyword === 'string' && keyword.trim().length > 0,
        )
      : [];
  } catch {
    return [];
  }
}

export function RecentSearches() {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    // 서버와 첫 렌더를 일치시키고 마운트 후 브라우저 저장소를 복원한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKeywords(readKeywords());
  }, []);

  return (
    <section aria-label="최근 검색" className="flex flex-col gap-3">
      <h2 className="m-0 text-xs font-bold text-muted">최근 검색</h2>
      {keywords.length === 0 ? (
        <p className="m-0 text-sm text-muted">최근 검색어가 없어요</p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {keywords.map((keyword, index) => (
            <li
              key={`${keyword}-${index}`}
              className="border-b border-solid border-border py-2 text-sm"
            >
              <Link
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="flex min-w-0 items-center gap-2 font-medium"
              >
                <span aria-hidden="true" className="shrink-0 text-muted">
                  🕒
                </span>
                <span className="min-w-0 break-words">{keyword}</span>
                <KeywordLinkStatus />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
