import Link from 'next/link';

const suggestedKeywords = [
  { keyword: '대형화재', symbol: '🔥' },
  { keyword: '교통통제', symbol: '🚨' },
  { keyword: '붕괴위험', symbol: '⚠️' },
  { keyword: '폭설피해', symbol: '❄️' },
  { keyword: '가스누출', symbol: '💨' },
  { keyword: '테러경보', symbol: '' },
];

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-5 py-5 text-sm">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="지도로 돌아가기"
          className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-solid border-border bg-surface font-bold shadow-[0_4px_8px_rgb(0_0_0/5%)]"
        >
          ←
        </Link>
        <form
          action="/search"
          method="get"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-card border-[1.5px] border-solid border-brand bg-surface px-3.5 py-2.5 shadow-[0_4px_8px_rgb(0_0_0/5%)]"
        >
          <span aria-hidden="true">🔍</span>
          <input
            type="search"
            name="q"
            defaultValue=""
            aria-label="기사 키워드 검색"
            placeholder="기사 키워드 검색"
            className="min-w-0 flex-1 border-0 bg-transparent"
          />
          <button
            type="submit"
            className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-brand"
          >
            검색
          </button>
        </form>
      </div>
      <p className="m-0 text-muted">궁금한 기사의 키워드를 검색해 보세요.</p>
      <section
        aria-labelledby="suggested-keywords"
        className="flex flex-col gap-3"
      >
        <h1
          id="suggested-keywords"
          className="m-0 text-xs font-bold text-muted"
        >
          추천 검색어
        </h1>
        <div className="flex flex-wrap gap-2">
          {suggestedKeywords.map(({ keyword, symbol }) => (
            <Link
              key={keyword}
              href={`/search?q=${encodeURIComponent(keyword)}`}
              className="rounded-lg border border-solid border-border bg-surface px-3 py-2 text-[13px]/[normal]"
            >
              {symbol && <span aria-hidden="true">{symbol} </span>}
              {keyword}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
