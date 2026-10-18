'use client';

import { ErrorBoundary } from '@suspensive/react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { Notice } from '@/components/feedback/notice';

import { FeatureError, featureErrorMessages } from '../model/feature-error';

// Keep the approved boundary module contract while the class lives in a neutral model.
export { FeatureError } from '../model/feature-error';

export function FeatureErrorBoundary({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ErrorBoundary
      resetKeys={[pathname]}
      fallback={({ reset }) => (
        <Notice
          role="alert"
          title="다시 이어서 볼까요?"
          action={
            <button type="button" onClick={reset}>
              다시 시도
            </button>
          }
        >
          화면을 표시하지 못했어요
        </Notice>
      )}
    >
      <ErrorBoundary
        resetKeys={[pathname]}
        shouldCatch={FeatureError}
        fallback={({ error, reset }) => (
          <Notice
            role="alert"
            title="다시 이어서 볼까요?"
            action={
              <button type="button" onClick={reset}>
                다시 시도
              </button>
            }
          >
            {featureErrorMessages[error.reason]}
          </Notice>
        )}
        onError={(error) => console.error('기능 오류:', error.reason)}
      >
        {children}
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
