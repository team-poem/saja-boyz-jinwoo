import ArticleDetailNotFound from '@/app/incidents/[id]/not-found';
import { DetailSheet } from '@/features/article-detail/ui/detail-sheet/detail-sheet';

export default function MissingArticleSheet() {
  return (
    <DetailSheet titleId="missing-article-sheet">
      <span id="missing-article-sheet" className="sr-only">
        기사를 찾을 수 없어요
      </span>
      <ArticleDetailNotFound />
    </DetailSheet>
  );
}
