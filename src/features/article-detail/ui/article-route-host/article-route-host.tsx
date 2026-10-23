'use client';

import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from 'next/navigation';
import { useCallback, useMemo, useState, type ReactNode } from 'react';

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
  const [height, setHeight] = useState(0);
  const [mapArticles, registerMapArticles] = useState<LocatedArticle[]>([]);
  const openArticle = useCallback(
    (id: string) => router.push('/incidents/' + id, { scroll: false }),
    [router],
  );
  const replaceArticle = useCallback(
    (id: string) => router.replace('/incidents/' + id, { scroll: false }),
    [router],
  );
  const close = useCallback(() => router.back(), [router]);
  const retry = useCallback(() => router.refresh(), [router]);
  const value = useMemo(
    () => ({
      active,
      sourcePath,
      height,
      mapArticles,
      openArticle,
      replaceArticle,
      close,
      setHeight,
      registerMapArticles,
      retry,
    }),
    [
      active,
      sourcePath,
      height,
      mapArticles,
      openArticle,
      replaceArticle,
      close,
      retry,
    ],
  );

  return (
    <ArticleSheetContext value={value}>
      <AppShell backgroundPath={active ? sourcePath : pathname} inert={active}>
        {children}
      </AppShell>
      {article}
    </ArticleSheetContext>
  );
}
