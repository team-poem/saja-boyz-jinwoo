'use client';

export default function RouteError({
  reset,
  retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  retry?: () => void;
}) {
  return (
    <div role="alert">
      화면을 표시하지 못했어요
      <button type="button" onClick={retry ?? reset}>
        다시 시도
      </button>
    </div>
  );
}
