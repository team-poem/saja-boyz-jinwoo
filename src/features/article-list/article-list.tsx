import styles from './article-list.module.css';

export type ArticleCollectionItem = {
  article_id: string;
  article: {
    title: string;
    description: string;
    originallink: string;
    pubDate: string;
  };
};

const namedEntities: Record<string, string> = {
  amp: '&',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
  nbsp: '\u00a0',
};

function articleText(value: string) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(
      /&(amp|quot|apos|lt|gt|nbsp|#\d+|#x[\da-f]+);/gi,
      (entity, code: string) => {
        if (!code.startsWith('#')) return namedEntities[code.toLowerCase()];

        const hex = code[1].toLowerCase() === 'x';
        const point = Number.parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10);
        if (point > 0x10ffff || (point >= 0xd800 && point <= 0xdfff)) {
          return entity;
        }
        return String.fromCodePoint(point);
      },
    );
}

const publicationFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function publicationText(date: Date) {
  const parts = Object.fromEntries(
    publicationFormatter
      .formatToParts(date)
      .map(({ type, value }) => [type, value]),
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute} KST`;
}

export function ArticleList({
  items,
}: {
  items: readonly ArticleCollectionItem[];
}) {
  const seen = new Set<string>();
  const articles = items.filter(({ article_id }) => {
    if (seen.has(article_id)) return false;
    seen.add(article_id);
    return true;
  });

  return (
    <div className={styles.list}>
      {articles.map(({ article_id, article }) => {
        const publishedAt = new Date(article.pubDate);

        return (
          <article className={styles.card} key={article_id}>
            <h2 className={styles.title}>{articleText(article.title)}</h2>
            <p className={styles.summary}>{articleText(article.description)}</p>
            <p className={styles.publication}>
              기사 발행{' '}
              <time dateTime={publishedAt.toISOString()}>
                {publicationText(publishedAt)}
              </time>
            </p>
            <a className={styles.source} href={article.originallink}>
              기사 원문
            </a>
          </article>
        );
      })}
    </div>
  );
}
