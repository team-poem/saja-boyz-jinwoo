'use client';

import { DetailSheet } from '@/app/incidents/[id]/detail-sheet';
import { Notice } from '@/components/feedback/notice';

export default function ArticleSheetError({
  reset,
}: {
  error: Error & { digest?: string };
  reset(): void;
}) {
  return (
    <DetailSheet titleId="article-sheet-error">
      <Notice
        role="alert"
        title="이 소식을 다시 열어볼까요?"
        action={
          <button type="button" onClick={reset}>
            다시 시도
          </button>
        }
      >
        <p id="article-sheet-error">기사를 불러오지 못했어요</p>
        <p>연결을 확인한 뒤 다시 눌러주세요.</p>
      </Notice>
    </DetailSheet>
  );
}
