import { siteName, siteOrigin } from '@/app/site-metadata';

export function SiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          url: siteOrigin,
        }).replace(/</g, '\\u003c'),
      }}
    />
  );
}
