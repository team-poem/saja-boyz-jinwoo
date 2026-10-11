import { DetailImage } from './detail-image';
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isDetailItem(
  value: unknown,
  id: string,
): value is ArticleCollectionItem {
  if (!isRecord(value) || !isRecord(value.article)) return false;
  return (
    value.article_id === id &&
    typeof value.article.title === 'string' &&
    typeof value.article.description === 'string' &&
    typeof value.article.pubDate === 'string' &&
    typeof value.article.originallink === 'string' &&
    typeof value.article.link === 'string' &&
    typeof value.image_status === 'string' &&
    (value.image_url === null || typeof value.image_url === 'string')
  );
}

async function fetchDetail(id: string) {
  try {
    const base = new URL(process.env.NEWS_API_BASE_URL ?? '');
    if (
      (base.protocol !== 'http:' && base.protocol !== 'https:') ||
      base.username ||
      base.password
    ) {
      return { status: 'error' } as const;
    }
    const url = new URL(`/news/${id}`, base);
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (response.status === 404) return { status: 'not-found' } as const;
    if (!response.ok) return { status: 'error' } as const;
    const item: unknown = await response.json();
    if (!isDetailItem(item, id)) return { status: 'error' } as const;
    return { status: 'success', item, apiOrigin: url.origin } as const;
  } catch {
    return { status: 'error' } as const;
  }
}

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^[a-f0-9]{64}$/.test(id)) notFound();
  const result = await fetchDetail(id);
  if (result.status === 'not-found') notFound();
  if (result.status === 'error') {
    return (
      <div role="alert" className="mx-auto max-w-3xl bg-surface p-4 text-text">
        <p>기사를 불러오지 못했어요</p>
        <Link href={`/incidents/${id}`}>다시 시도</Link>
      </div>
    );
  }
  const { item, apiOrigin } = result;
  const { article } = item;
  const publishedAt = publicationDate(article.pubDate);
  const sourceUrl =
    safeSourceUrl(article.originallink) ?? safeSourceUrl(article.link);
  const imageUrl =
    item.image_status === 'ready' &&
    item.image_url === `/images/${item.article_id}.jpg`
      ? new URL(item.image_url, apiOrigin).href
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
      <DetailImage key={imageUrl} src={imageUrl} />
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
      <button type="button">공유</button>
    </article>
  );
}
