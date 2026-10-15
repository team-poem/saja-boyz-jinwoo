import Link from 'next/link';

import { MapCarouselCard } from './map-carousel-card';
import type { MapArticleResult } from '../../model/map-article.types';
import { recentMapArticles } from '../../model/map-carousel-articles';

export function MapArticleCarousel({
  articles,
}: {
  articles: MapArticleResult;
}) {
  return (
    <section
      aria-label="지도 기사"
      className="flex flex-col gap-3 bg-linear-to-b from-transparent to-background/95 pt-8 pb-2"
    >
      <div className="flex items-center justify-between px-4">
        <h2 className="m-0 text-[14px]/[normal] font-extrabold text-text">
          최근 보도 기사
        </h2>
        <Link
          href="/incidents"
          className="text-[11px]/[normal] font-bold text-brand"
        >
          전체보기 →
        </Link>
      </div>
      <div className="flex snap-x snap-proximity gap-2.5 overflow-x-auto overscroll-x-contain px-4 py-1 [scroll-padding-inline:16px]">
        {recentMapArticles(articles.items).map((item) => (
          <MapCarouselCard
            key={item.article_id}
            item={item}
            apiOrigin={articles.apiOrigin}
          />
        ))}
      </div>
    </section>
  );
}
