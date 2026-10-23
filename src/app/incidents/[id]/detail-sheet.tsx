'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export function DetailSheet({
  titleId,
  children,
}: {
  titleId: string;
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const caller = document.activeElement;
    const overflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    panel.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = overflow;

      if (caller instanceof HTMLElement && caller.isConnected) {
        caller.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className={`fixed bottom-0 left-1/2 z-30 flex max-h-[calc(100dvh_-_max(49px,env(safe-area-inset-top)))] w-full max-w-[640px] min-w-0 -translate-x-1/2 flex-col gap-4 overflow-y-auto overscroll-contain rounded-t-3xl bg-surface px-4 pt-4 pb-[max(24px,env(safe-area-inset-bottom))] text-text shadow-[0_-8px_16px_rgb(0_0_0/10%)] ${expanded ? 'h-[calc(100dvh_-_max(49px,env(safe-area-inset-top)))]' : 'h-[53.52dvh]'}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          panel.current
            ?.querySelector<HTMLAnchorElement>('a[aria-label="닫기"]')
            ?.click();
        }

        if (event.key === 'Tab') {
          const controls = panel.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not(:disabled), input:not(:disabled), [tabindex="0"]',
          );
          const first = controls?.[0];
          const last = controls?.[controls.length - 1];

          if (
            event.shiftKey &&
            (document.activeElement === first ||
              document.activeElement === panel.current)
          ) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
    >
      <button
        type="button"
        aria-label={expanded ? '기사 시트 접기' : '기사 시트 펼치기'}
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="ui-control flex h-6 w-full shrink-0 items-center justify-center border-0 bg-transparent p-0"
      >
        <span
          aria-hidden="true"
          className="h-1 w-9 rounded-full bg-slate-300"
        />
      </button>
      {children}
    </div>
  );
}
