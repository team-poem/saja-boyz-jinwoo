import { ArticleImage } from '../article-image/article-image';
import type { ArticleCollectionItem } from '../../model/article.types';
import {
  articleText,
  safeSourceUrl,
  publicationDate,
  publicationText,
} from '../../model/article-presentation';
import styles from './article-card.module.css';

export function ArticleCard({
  item,
  apiOrigin,
}: {
  item: ArticleCollectionItem;
  apiOrigin: string;
}) {
  const { article_id, article, image_status, image_url } = item;
  const publishedAt = publicationDate(article.pubDate);
  const sourceUrl =
    safeSourceUrl(article.originallink) ?? safeSourceUrl(article.link);
  const imageUrl =
    image_status === 'ready' &&
    /^[a-f0-9]{64}$/.test(article_id) &&
    image_url === `/images/${article_id}.jpg`
      ? new URL(image_url, apiOrigin).href
      : null;

  return (
    <article className={styles.card}>
      <ArticleImage key={imageUrl} src={imageUrl} />
      <h2 className={styles.title}>{articleText(article.title)}</h2>
      <p className={styles.summary}>{articleText(article.description)}</p>
      <p className={styles.publication}>
        {Number.isNaN(publishedAt.getTime()) ? (
          '발행 시각 미확인'
        ) : (
          <>
            기사 발행{' '}
            <time dateTime={publishedAt.toISOString()}>
              {publicationText(publishedAt)}
            </time>
          </>
        )}
      </p>
      {sourceUrl ? (
        <a className={styles.source} href={sourceUrl}>
          기사 원문
        </a>
      ) : (
        <span className={styles.source}>원문 링크 없음</span>
      )}
    </article>
  );
}
