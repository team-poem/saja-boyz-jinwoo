'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const visitorKey = 'poem.visitor.v1';
const uuid =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

// Mounted only after a successful detail load. Server rendering and prefetch do
// not run effects; retained route content must also match the current URL.
export function ArticleViewTracker({
  id,
  apiOrigin,
}: {
  id: string;
  apiOrigin: string;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== `/incidents/${id}` || !/^[0-9a-f]{64}$/.test(id)) return;
    let sent = false;
    const record = () => {
      if (sent || document.visibilityState !== 'visible') return;
      sent = true;

      try {
        let visitor = localStorage.getItem(visitorKey);

        if (!visitor || !uuid.test(visitor)) {
          visitor = crypto.randomUUID();
          localStorage.setItem(visitorKey, visitor);
        }

        // Storage failures must not mint a new identity on every page load.
        void fetch(`${apiOrigin}/news/${id}/views`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitor_id: visitor }),
          credentials: 'omit',
          cache: 'no-store',
          keepalive: true,
          signal: AbortSignal.timeout(5000),
        }).catch(() => {});
      } catch {
        // Analytics never prevents reading an article.
      }
    };

    record();
    document.addEventListener('visibilitychange', record);

    return () => document.removeEventListener('visibilitychange', record);
  }, [id, apiOrigin, pathname]);

  return null;
}
