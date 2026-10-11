'use client';

import { useRef, useState } from 'react';

export function DetailShare({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const sharing = useRef(false);

  async function share() {
    if (sharing.current) return;
    sharing.current = true;
    setCopied(false);
    setManualUrl('');
    const url = `${window.location.origin}/incidents/${id}`;

    try {
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title, url });
          return;
        } catch (error) {
          if (
            error !== null &&
            typeof error === 'object' &&
            'name' in error &&
            error.name === 'AbortError'
          ) {
            return;
          }
        }
      }

      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      } catch {
        setManualUrl(url);
      }
    } finally {
      sharing.current = false;
    }
  }

  return (
    <div>
      <button type="button" onClick={share}>
        공유
      </button>
      {copied && <p role="status">링크를 복사했어요</p>}
      {manualUrl && (
        <div>
          <p>아래 링크를 직접 복사해 주세요.</p>
          <input aria-label="공유 링크" value={manualUrl} readOnly />
        </div>
      )}
    </div>
  );
}
