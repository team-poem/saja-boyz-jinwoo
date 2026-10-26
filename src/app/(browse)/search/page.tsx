import type { Metadata } from 'next';

import { pageMetadata } from '@/app/site-metadata';

export const metadata: Metadata = {
  ...pageMetadata(
    '기사 검색',
    '키워드로 사건 사고 기사를 검색하세요.',
    '/search',
  ),
  robots: { index: false, follow: true },
};

export default function BrowsePage() {
  return null;
}
