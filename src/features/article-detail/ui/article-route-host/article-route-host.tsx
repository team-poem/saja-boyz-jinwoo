'use client';

import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from 'next/navigation';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from 'react';

import { AppShell } from '@/components/layout/app-shell/app-shell';
import type { LocatedArticle } from '@/features/map/model/map-article.types';

import { ArticleSheetContext } from '../../model/article-sheet-context';

export { useArticleSheetRoute } from '../../model/article-sheet-context';

export function ArticleRouteHost({
  children,
  article,
}: {
  children?: ReactNode;
  article?: ReactNode;
}) {
  const pathname = usePathname();
  const backgroundSegments = useSelectedLayoutSegments();
  const articleSegments = useSelectedLayoutSegments('article');
  const router = useRouter();
  const active = articleSegments.includes('(.)incidents');
  const sourcePath =
    '/' +
    backgroundSegments.filter((segment) => !segment.startsWith('(')).join('/');
  const opener = useRef<HTMLElement | null>(null);
  const previousActive = useRef(false);
  const [height, setHeight] = useState(0);
  const [mapArticles, registerMapArticles] = useState<LocatedArticle[]>([]);
  const openArticle = useCallback(
    (id: string) => {
      opener.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      router.push('/incidents/' + id, { scroll: false });
    },
    [router],
  );
  const close = useCallback(() => router.back(), [router]);
  const retry = useCallback(() => router.refresh(), [router]);

  useEffect(() => {
    if (previousActive.current && !active && opener.current?.isConnected) {
      opener.current.focus({ preventScroll: true });
    }

    previousActive.current = active;
  }, [active]);

  const captureOpener = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (
        active ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href]')
          : null;

      if (
        link &&
        /^\/incidents\/[a-f0-9]{64}$/.test(link.getAttribute('href') ?? '')
      )
        opener.current = link;
    },
    [active],
  );

  const value = useMemo(
    () => ({
      active,
      sourcePath,
      height,
      mapArticles,
      openArticle,
      close,
      setHeight,
      registerMapArticles,
      retry,
    }),
    [active, sourcePath, height, mapArticles, openArticle, close, retry],
  );

  return (
    <ArticleSheetContext value={value}>
      <AppShell
        backgroundPath={active ? sourcePath : pathname}
        inert={active}
        onClickCapture={captureOpener}
      >
        {children}
      </AppShell>
      {article}
    </ArticleSheetContext>
  );
}
