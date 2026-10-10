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

function writeKeywords(keywords: string[]) {
  try {
    localStorage.setItem('hh:recent-searches:v1', JSON.stringify(keywords));
  } catch {
    // 저장소를 사용할 수 없어도 기사 검색은 유지한다.
  }
}

export function RecentSearches({ executedKeyword = '' }) {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    const storedKeywords = readKeywords();
    const nextKeywords = (
      executedKeyword
        ? [...new Set([executedKeyword, ...storedKeywords])]
        : storedKeywords
    ).slice(0, 10);
    if (executedKeyword) {
      writeKeywords(nextKeywords);
    }
    // 서버와 첫 렌더를 일치시키고 마운트 후 브라우저 저장소를 복원한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKeywords(nextKeywords);
  }, [executedKeyword]);

  function removeKeyword(keyword: string) {
    const nextKeywords = keywords.filter((stored) => stored !== keyword);
    setKeywords(nextKeywords);
    writeKeywords(nextKeywords);
  }

  if (executedKeyword) return null;

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
              className="flex items-center justify-between gap-2 border-b border-solid border-border py-2 text-sm"
            >
              <Link
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="flex min-w-0 flex-1 items-center gap-2 font-medium"
              >
                <span aria-hidden="true" className="shrink-0 text-muted">
                  🕒
                </span>
                <span className="min-w-0 break-words">{keyword}</span>
                <KeywordLinkStatus />
              </Link>
              <button
                type="button"
                aria-label={`${keyword} 삭제`}
                onClick={() => removeKeyword(keyword)}
                className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-muted"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
