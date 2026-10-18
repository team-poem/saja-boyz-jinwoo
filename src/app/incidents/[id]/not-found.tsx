import Link from 'next/link';

import { Notice } from '@/components/feedback/notice';

export default function ArticleDetailNotFound() {
  return (
    <div className="mt-6">
      <Notice
        titleAs="h1"
        title="기사를 찾을 수 없어요"
        action={<Link href="/incidents">목록으로</Link>}
      >
        링크를 확인하거나 목록에서 다른 소식을 살펴보세요.
      </Notice>
    </div>
  );
}
