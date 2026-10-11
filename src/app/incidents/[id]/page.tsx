import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ArticleCollectionItem } from '@/features/article-list/model/article.types';
import {
  articleText,
  publicationDate,
  publicationText,
  safeSourceUrl,
} from '@/features/article-list/model/article-presentation';

export const dynamic = 'force-dynamic';

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = new URL(`/news/${id}`, process.env.NEWS_API_BASE_URL);
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  });
  if (response.status === 404) notFound();
  if (!response.ok) throw new Error('기사를 불러오지 못했어요');

  const item: ArticleCollectionItem = await response.json();
  const { article } = item;
  const publishedAt = publicationDate(article.pubDate);
  const sourceUrl =
    safeSourceUrl(article.originallink) ?? safeSourceUrl(article.link);
  const imageUrl =
    item.image_status === 'ready' &&
    item.image_url === `/images/${item.article_id}.jpg`
      ? new URL(item.image_url, url.origin).href
      : null;

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-6 bg-surface p-4 text-text">
      <nav aria-label="기사 상세 탐색" className="flex justify-between">
        <Link href="/incidents">목록으로</Link>
        <Link href="/">닫기</Link>
      </nav>
      <h1 className="m-0 text-2xl font-bold [overflow-wrap:anywhere]">
        {articleText(article.title)}
      </h1>
      {imageUrl ? (
        <figure className="m-0">
          <Image
            src={imageUrl}
            alt=""
            width={768}
            height={512}
            unoptimized
            className="h-auto w-full rounded-lg"
          />
          <figcaption className="mt-2 text-sm text-muted">
            AI 생성 이미지
          </figcaption>
        </figure>
      ) : (
        <p>이미지 없음</p>
      )}
      <p className="m-0 text-sm text-muted">
        {Number.isNaN(publishedAt.getTime()) ? (
          '발행 시각 미확인'
        ) : (
          <>
            기사 발행{' '}
            <time dateTime={publishedAt.toISOString()}>
              {publicationText(publishedAt)}
            </time>
          </>
        )}
      </p>
      <section aria-label="기사 요약">
        <h2 className="mt-0 text-lg font-bold">기사 요약</h2>
        <p className="whitespace-pre-line [overflow-wrap:anywhere]">
          {articleText(article.description)}
        </p>
      </section>
      {sourceUrl ? (
        <a href={sourceUrl} className="underline underline-offset-4">
          기사 원문
        </a>
      ) : (
        <p>원문 링크 없음</p>
      )}
    </article>
  );
}
