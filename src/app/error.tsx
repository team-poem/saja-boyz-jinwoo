'use client';

import { useEffect } from 'react';

import { Notice } from '@/components/feedback/notice';

import {
  FeatureError,
  featureErrorMessages,
} from '../components/errors/model/feature-error';

export default function RouteError({
  error,
  reset,
  retry,
}: {
  error: unknown;
  reset: () => void;
  retry?: () => void;
}) {
  useEffect(() => {
    if (error instanceof FeatureError) {
      console.error('기능 오류:', error.reason);
    }
  }, [error]);

  return (
    <Notice
      role="alert"
      title="다시 이어서 볼까요?"
      action={
        <button type="button" onClick={retry ?? reset}>
          다시 시도
        </button>
      }
    >
      {error instanceof FeatureError
        ? featureErrorMessages[error.reason]
        : '화면을 표시하지 못했어요'}
    </Notice>
  );
}
