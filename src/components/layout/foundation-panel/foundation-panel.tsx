import Link from 'next/link';
export function FoundationPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="foundation-panel">
      <p className="eyebrow">개발 준비 화면</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="route-links">
        <Link href="/">지도 홈</Link>
        <Link href="/search">검색</Link>
        <Link href="/incidents">사건 목록</Link>
        <Link href="/report">제보</Link>
      </div>
    </section>
  );
}
