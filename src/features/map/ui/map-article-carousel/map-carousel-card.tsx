import Link from 'next/link';

import {
  articleText,
  publicationDate,
  publicationText,
} from '@/features/article-list/model/article-presentation';

import { MapCarouselImage } from './map-carousel-image';
import type { LocatedArticle } from '../../model/map-article.types';

export function MapCarouselCard({
  item,
  apiOrigin,
}: {
  item: LocatedArticle;
  apiOrigin: string;
}) {
  const publishedAt = publicationDate(item.article.pubDate);
  const imageUrl =
    item.image_status === 'ready' &&
    /^[a-f0-9]{64}$/.test(item.article_id) &&
    item.image_url === `/images/${item.article_id}.jpg`
      ? new URL(item.image_url, apiOrigin).href
      : null;

  return (
    <article className="flex w-[200px] shrink-0 snap-start flex-col gap-2.5 rounded-card border border-solid border-white bg-floating p-3 shadow-[0_4px_16px_rgb(0_0_0/5%)]">
      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="m-0 text-[11px]/[normal] text-muted">
          {Number.isNaN(publishedAt.getTime()) ? (
            '발행 시각 미확인'
          ) : (
            <time dateTime={publishedAt.toISOString()}>
              {publicationText(publishedAt)}
            </time>
          )}
        </p>
        <h3 className="m-0 truncate text-[13px]/[normal] font-bold text-text">
          <Link href={`/incidents/${item.article_id}`}>
            {articleText(item.article.title)}
          </Link>
        </h3>
      </div>
      <MapCarouselImage key={imageUrl} src={imageUrl} />
    </article>
  );
}
