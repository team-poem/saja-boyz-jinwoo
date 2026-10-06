'use client';

import { ErrorBoundary } from '@suspensive/react';
import type { ReactNode } from 'react';

type FeatureErrorReason = 'network' | 'configuration' | 'invalid-response';

const messages: Record<FeatureErrorReason, string> = {
  network: '연결을 확인해 주세요.',
  configuration: '서비스 설정을 확인해 주세요.',
  'invalid-response': '응답을 확인할 수 없어요. 잠시 후 다시 시도해 주세요.',
};

export class FeatureError extends Error {
  constructor(public readonly reason: FeatureErrorReason) {
    super(reason);
    this.name = 'FeatureError';
  }
}

export function FeatureErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary fallback={<div role="alert">화면을 표시하지 못했어요</div>}>
      <ErrorBoundary
        shouldCatch={FeatureError}
        fallback={({ error }) => (
          <div role="alert">{messages[error.reason]}</div>
        )}
        onError={(error) => console.error('기능 오류:', error.reason)}
      >
        {children}
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
