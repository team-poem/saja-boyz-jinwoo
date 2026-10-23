'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
  const panel = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButton.current?.focus({ preventScroll: true });
  }, [items]);

  useLayoutEffect(() => {
    const update = () =>
      onHeightChange?.(panel.current?.getBoundingClientRect().height ?? 0);

    update();
    const observer =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(update);

    if (panel.current) observer?.observe(panel.current);

    return () => {
      observer?.disconnect();
      onHeightChange?.(0);
    };
  }, [onHeightChange, items]);

  return createPortal(
    <section
      ref={panel}
      aria-label="선택한 기사"
      className="ui-sheet-enter fixed bottom-0 left-1/2 z-30 flex max-h-[65dvh] w-full max-w-[640px] -translate-x-1/2 flex-col gap-4 rounded-t-3xl border-0 border-t border-solid border-[#e3e8f0] bg-surface p-4 pb-[max(16px,env(safe-area-inset-bottom))] shadow-[0_-8px_16px_rgb(0_0_0/10%)]"
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
    >
      <div
        aria-hidden="true"
        className="h-1 w-9 shrink-0 self-center rounded-sm bg-slate-400"
      />
      <div className="flex shrink-0 items-center justify-between gap-3">
        <p className="m-0 rounded-sm border border-solid border-border bg-slate-100 px-1.5 py-0.5 text-[10px]/[normal] font-semibold text-muted">
          선택한 위치의 기사 {items.length}건
        </p>
        <button
          ref={closeButton}
          type="button"
          aria-label="기사 선택 닫기"
          onClick={onClose}
          className="ui-control relative size-6 shrink-0 border-0 bg-transparent p-0"
        >
          <Image
            src="/map/sheet-close.svg"
            alt=""
            width={40}
            height={40}
            className="absolute -top-1.5 -left-2 block max-w-none"
          />
        </button>
      </div>
      <div className="flex min-h-0 flex-col gap-4 overflow-y-auto overscroll-contain">
        {items.map((item) => {
          const publishedAt = publicationDate(item.article.pubDate);
          const imageUrl =
            item.image_status === 'ready' &&
            /^[a-f0-9]{64}$/.test(item.article_id) &&
            item.image_url === `/images/${item.article_id}.jpg`
              ? new URL(item.image_url, apiOrigin).href
              : null;

          return (
            <article
              key={item.article_id}
              className="flex shrink-0 flex-col gap-4 border-0 border-solid border-border pb-4 not-last:border-b last:pb-0"
            >
              <h2 className="m-0 text-[18px]/[normal] font-extrabold text-text [overflow-wrap:anywhere]">
                <Link scroll={false} href={`/incidents/${item.article_id}`}>
                  {articleText(item.article.title)}
                </Link>
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="m-0 text-[13px]/[normal] font-medium text-muted">
                  <span aria-hidden="true">📍 </span>
                  {item.location.label}
                </p>
                <p className="m-0 text-[12px]/[normal] text-slate-400">
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
      </div>
    </section>,
    document.body,
  );
}
