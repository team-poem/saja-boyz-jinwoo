import type { Metadata } from 'next';

import { pageMetadata } from '@/app/site-metadata';

export const metadata: Metadata = {
  ...pageMetadata(
    '사건 사고 기사 목록',
    '수집된 사건 사고 기사의 요약과 원문을 목록에서 확인하세요.',
    '/incidents',
  ),
};

export const dynamic = 'force-dynamic';

export default function BrowsePage() {
  return null;
}
