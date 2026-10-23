'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';

import { DetailSheet } from '@/features/article-detail/ui/detail-sheet/detail-sheet';
import {
  articleText,
  publicationDate,
  publicationText,
} from '@/features/article-list/model/article-presentation';
import { ArticleImage } from '@/features/article-list/ui/article-image/article-image';

import type { LocatedArticle } from '../../model/map-article.types';

export function MapArticleSheet({
  items,
  apiOrigin,
  onClose,
  onHeightChange,
}: {
  items: LocatedArticle[];
  apiOrigin: string;
  onClose(): void;
  onHeightChange?(height: number): void;
}) {
  return createPortal(
    <DetailSheet
      titleId="selected-map-articles"
      label="선택한 기사"
      initialExpanded={false}
      onClose={onClose}
      closeLabel="기사 선택 닫기"
      onHeightChange={onHeightChange}
    >
      <h1
        id="selected-map-articles"
        className="m-0 text-sm font-bold text-muted"
      >
        선택한 위치의 기사 {items.length}건
      </h1>
      {items.map((item) => {
        const publishedAt = publicationDate(item.article.pubDate);
        const imageUrl =
          item.image_status === 'ready' &&
          /^[a-f0-9]{64}$/.test(item.article_id) &&
          item.image_url === '/images/' + item.article_id + '.jpg'
            ? new URL(item.image_url, apiOrigin).href
            : null;

        return (
          <article
            key={item.article_id}
            className="flex shrink-0 flex-col gap-3 rounded-lg border border-solid border-border bg-background p-2.5"
          >
            <h2 className="m-0 text-[15px]/[21px] font-extrabold text-text [overflow-wrap:anywhere]">
              <Link scroll={false} href={'/incidents/' + item.article_id}>
                {articleText(item.article.title)}
              </Link>
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="m-0 text-[13px]/[18px] font-medium text-muted">
                <span aria-hidden="true">📍 </span>
                {item.location.label}
              </p>
              <p className="m-0 text-[12px]/4 text-slate-400">
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
            </div>
            <div className="flex items-start gap-3">
              <div className="w-20 shrink-0">
                <ArticleImage key={imageUrl} src={imageUrl} />
              </div>
              <p className="m-0 min-w-0 text-[13px]/[1.5] text-muted [overflow-wrap:anywhere]">
                {articleText(item.article.description)}
              </p>
            </div>
            <p className="m-0 text-[11px]/4 text-muted">
              {item.location.precision === 'address'
                ? '기사에 언급된 주소 기준 위치'
                : item.location.precision === 'neighborhood'
                  ? '기사에 언급된 동네 기준 위치 · 실제 발생 지점과 다를 수 있습니다'
                  : '지역 대표 위치 · 실제 발생 지점과 다를 수 있습니다'}
            </p>
          </article>
        );
      })}
    </DetailSheet>,
    document.body,
  );
}
