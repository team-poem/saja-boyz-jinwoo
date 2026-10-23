import { DetailSheet } from '@/app/incidents/[id]/detail-sheet';
import { ArticleSkeleton } from '@/components/feedback/article-skeleton';

export default function LoadingArticleSheet() {
  return (
    <DetailSheet titleId="loading-article-sheet">
      <span id="loading-article-sheet" className="sr-only">
        기사 상세
      </span>
      <ArticleSkeleton label="기사를 불러오는 중" variant="detail" />
    </DetailSheet>
  );
}
