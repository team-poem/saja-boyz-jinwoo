import type { ReactNode } from 'react';

import { ArticleRouteHost } from '@/features/article-detail/ui/article-route-host/article-route-host';

export default function BrowseLayout({
  children,
  background,
}: {
  children: ReactNode;
  background: ReactNode;
}) {
  return (
    <ArticleRouteHost background={background}>{children}</ArticleRouteHost>
  );
}
