export function MapSetupNotice() {
  return (
    <section
      aria-label="주변 지도"
      className="mt-6 min-h-[320px] rounded-card border border-solid border-border bg-background p-4"
    >
      <div role="alert" className="rounded-2xl bg-floating p-4 shadow-floating">
        <h1 className="mt-0 mb-3 text-2xl leading-[1.4]">
          지도 설정이 필요합니다
        </h1>
        <p className="text-muted leading-[1.7]">
          네이버 지도 Client ID가 설정되지 않아 지도를 표시할 수 없습니다.
          관리자는 NEXT_PUBLIC_NAVER_MAP_CLIENT_ID를 설정한 뒤 앱을 다시 빌드해
          주세요.
        </p>
      </div>
    </section>
  );
}
