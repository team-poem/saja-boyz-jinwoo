import ArticleDetailNotFound from '@/app/incidents/[id]/not-found';
import { DetailSheet } from '@/app/incidents/[id]/detail-sheet';

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
