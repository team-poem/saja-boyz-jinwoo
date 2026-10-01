'use client';
import { Suspense, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SearchHeader } from '@/components/ui/search-header';
import { BottomNav } from '@/components/ui/bottom-nav';
import { IncidentFilterControls } from '@/components/ui/incident-filter-controls';
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const browse = pathname === '/' || pathname === '/incidents';
  const fullScreen =
    pathname === '/report' || pathname.startsWith('/incidents/');
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        본문으로 이동
      </a>
      {browse && (
        <>
          <SearchHeader />
          <Suspense fallback={<div className="filter-loading" />}>
            <IncidentFilterControls />
          </Suspense>
        </>
      )}
      <main id="main-content">{children}</main>
      {!fullScreen && (
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      )}
    </div>
  );
}
