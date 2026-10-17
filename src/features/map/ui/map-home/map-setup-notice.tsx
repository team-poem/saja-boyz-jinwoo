'use client';

import Link from 'next/link';

import { Notice } from '@/components/feedback/notice';
import { ServiceIntro } from '@/components/layout/service-intro';

export function MapSetupNotice() {
  return (
    <>
      <section
        aria-label="주변 지도"
        className="min-h-[320px] bg-background px-4 pt-26 pb-4"
      >
        <Notice
          titleAs="h1"
          role="alert"
          title="지도를 잠시 열 수 없어요"
          action={
            <>
              <button type="button" onClick={() => window.location.reload()}>
                다시 시도
              </button>
              <Link href="/incidents">기사 목록</Link>
              <Link href="/search">검색</Link>
            </>
          }
        >
          지도를 표시할 수 없습니다. 지도 설정은 관리자에게 문의해 주세요.
        </Notice>
      </section>
      <ServiceIntro />
    </>
  );
}
