import Link from 'next/link';

export default function ArticleDetailNotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 bg-surface p-4 text-text">
      <h1 className="m-0 text-2xl font-bold">기사를 찾을 수 없어요</h1>
      <Link href="/incidents" className="underline underline-offset-4">
        목록으로
      </Link>
    </section>
  );
}
