'use client';

import { createContext, useContext } from 'react';

import type { LocatedArticle } from '@/features/map/model/map-article.types';

export type ArticleSheetRoute = {
  active: boolean;
  sourcePath: string;
  height: number;
  mapArticles: LocatedArticle[];
  openArticle(id: string): void;
  close(): void;
  replaceArticle(id: string): void;
  setHeight(height: number): void;
  registerMapArticles(items: LocatedArticle[]): void;
  retry(): void;
};

export const ArticleSheetContext = createContext<ArticleSheetRoute | null>(
  null,
);

export function useArticleSheetRoute() {
  return useContext(ArticleSheetContext);
}
