'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { FeatureErrorBoundary } from '../../errors/feature-error-boundary/feature-error-boundary';
import { BottomNavigation } from '../bottom-navigation/bottom-navigation';
import { SearchHeader } from '../search-header/search-header';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isDedicatedScreen =
    pathname === '/report' || pathname.startsWith('/incidents/');
  const showHeader = pathname !== '/search' && !isDedicatedScreen;
  const shellClassName = isDedicatedScreen
    ? 'mx-auto min-h-dvh max-w-[640px] bg-surface pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]'
    : isHome
      ? 'relative mx-auto min-h-dvh max-w-[640px] pb-[max(110px,calc(env(safe-area-inset-bottom)_+_90px))]'
      : `mx-auto min-h-dvh max-w-[640px] px-4 pb-[110px] ${showHeader ? 'pt-[calc(12px_+_env(safe-area-inset-top))]' : 'pt-6'}`;

  return (
    <div className={shellClassName}>
      {showHeader && <SearchHeader isHome={isHome} />}
      <main id="main-content" className={isHome ? 'relative z-0' : undefined}>
        <FeatureErrorBoundary>{children}</FeatureErrorBoundary>
      </main>
      {!isDedicatedScreen && <BottomNavigation pathname={pathname} />}
    </div>
  );
}
