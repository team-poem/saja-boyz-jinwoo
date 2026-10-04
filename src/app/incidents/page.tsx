import { FoundationPanel } from '@/components/layout/foundation-panel';
export default async function IncidentsPage() {
  const url = new URL('/news', process.env.NEWS_API_BASE_URL);
  url.searchParams.set('offset', '0');
  url.searchParams.set('limit', '20');

  await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  });

  return (
    <FoundationPanel
      title="사건 목록"
      description="기간·카테고리·상태 필터와 사건 카드를 연결할 자리입니다."
    />
  );
}
