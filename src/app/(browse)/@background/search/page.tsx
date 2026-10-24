import Link from 'next/link';

import { Notice } from '@/components/feedback/notice';
import { loadSearchPage } from '@/features/search/api/load-search-page';
import { SearchResults } from '@/features/search/ui/search-results/search-results';
import { RecentSearches } from '@/features/search/ui/recent-searches/recent-searches';
import { KeywordLinkStatus } from '@/features/search/ui/keyword-link-status/keyword-link-status';

const suggestedKeywords = [
  { keyword: '대형화재', symbol: '🔥' },
  { keyword: '교통통제', symbol: '🚨' },
  { keyword: '붕괴위험', symbol: '⚠︎' },
  { keyword: '폭설피해', symbol: '❄️' },
  { keyword: '가스누출', symbol: '💨' },
  { keyword: '테러경보', symbol: '' },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const keyword = (Array.isArray(q) ? q[0] : q)?.trim() ?? '';
  const result = keyword ? await loadSearchPage(keyword, 0) : null;

  return (
    <div className="flex flex-col gap-5 pb-5 text-sm">
      <div className="flex h-[37px] items-center gap-3">
        <Link
          href="/"
          aria-label="지도로 돌아가기"
          className="ui-control relative flex size-9 shrink-0 items-center justify-center rounded-xl border border-solid border-border bg-surface text-[14px]/[17px] font-bold shadow-[0_4px_8px_rgb(0_0_0/5%)] after:absolute after:-inset-1 after:content-['']"
        >
          ←
        </Link>
        <form
          action="/search"
          method="get"
          className="flex h-[37px] min-w-0 flex-1 items-center rounded-card border-[1.5px] border-solid border-brand bg-surface pl-0 pr-0 shadow-[0_4px_8px_rgb(0_0_0/5%)]"
        >
          <button
            type="submit"
            aria-label="검색"
            className="-ml-2 flex size-11 shrink-0 cursor-pointer items-center justify-end rounded-xl border-0 bg-transparent p-0 pr-2 text-muted hover:opacity-80 active:opacity-60 motion-safe:transition-opacity"
          >
            <span
              aria-hidden="true"
              className="size-3.5 shrink-0 text-[14px]/[14px]"
            >
              🔍
            </span>
          </button>
          <input
            key={keyword}
            type="search"
            name="q"
            defaultValue={keyword}
            aria-label="기사 키워드 검색"
            placeholder="기사 키워드 검색"
            className="h-full min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 text-[14px]/[17px] font-semibold text-text placeholder:font-normal"
          />
          {keyword && (
            <Link
              href="/search"
              aria-label="검색어 초기화"
              className="ui-control grid size-11 shrink-0 place-items-center text-muted"
            >
              ✕
            </Link>
          )}
        </form>
      </div>
      {keyword ? (
        result ? (
          <SearchResults key={keyword} keyword={keyword} initialPage={result} />
        ) : (
          <Notice
            role="alert"
            title="검색을 다시 이어볼까요?"
            action={
              <a
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="ui-control text-brand underline"
              >
                다시 시도
              </a>
            }
          >
            <p className="m-0">검색 결과를 불러오지 못했어요</p>

            <p>검색어는 그대로 두었어요. 한 번 더 눌러주세요.</p>
          </Notice>
        )
      ) : null}
      <RecentSearches executedKeyword={keyword} />
      {!keyword && (
        <section
          aria-labelledby="suggested-keywords"
          className="flex flex-col gap-3"
        >
          <h1
            id="suggested-keywords"
            className="m-0 text-[12px]/[15px] font-bold text-muted"
          >
            추천 검색어
          </h1>
          <div className="flex flex-wrap gap-2">
            {suggestedKeywords.map(({ keyword, symbol }) => (
              <Link
                key={keyword}
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="ui-control relative inline-flex min-h-8 items-center gap-1 rounded-lg border border-solid border-border bg-surface px-3 py-0 text-[13px]/4"
              >
                {symbol && (
                  <span
                    aria-hidden="true"
                    className="w-3.5 shrink-0 text-[14px]/4"
                  >
                    {symbol}
                  </span>
                )}
                <span>{keyword}</span>
                <KeywordLinkStatus />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
