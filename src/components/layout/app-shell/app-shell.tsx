import Link from 'next/link';
import type { ReactNode } from 'react';
import { FeatureErrorBoundary } from '../../errors/feature-error-boundary/feature-error-boundary';
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link href="/" className="brand">
          흉흉
        </Link>
        <Link href="/search">사건 검색</Link>
      </header>
      <main id="main-content">
        <FeatureErrorBoundary>{children}</FeatureErrorBoundary>
      </main>
      <nav className="bottom-nav" aria-label="주 메뉴">
        <Link href="/">지도</Link>
        <Link href="/report" className="report-link">
          제보하기
        </Link>
        <Link href="/incidents">목록</Link>
      </nav>
    </div>
  );
}
