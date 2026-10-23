'use client';

import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from 'react';

import { useArticleSheetRoute } from '../../model/article-sheet-context';

export function DetailSheet({
  titleId,
  children,
  footer,
  label,
  initialExpanded,
  onClose,
  closeLabel = '닫기',
  onHeightChange,
}: {
  titleId: string;
  children?: ReactNode;
  footer?: ReactNode;
  label?: string;
  initialExpanded?: boolean;
  onClose?(): void;
  closeLabel?: string;
  onHeightChange?(height: number): void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const closeControl = useRef<HTMLAnchorElement | HTMLButtonElement | null>(
    null,
  );
  const route = useArticleSheetRoute();
  const [expanded, setExpanded] = useState(
    () => initialExpanded ?? (!route?.active || route.sourcePath !== '/'),
  );
  const localClose = Boolean(onClose);
  const drag = useRef<{ start: number; moved: boolean } | null>(null);
  const reportHeight = route?.active ? route.setHeight : onHeightChange;

  useEffect(() => {
    const element = panel.current;

    if (!element) return;
    const update = () => reportHeight?.(element.getBoundingClientRect().height);

    update();
    const observer =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(update);

    observer?.observe(element);
    window.addEventListener('resize', update);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
      reportHeight?.(0);
    };
  }, [reportHeight]);

  useEffect(() => {
    const element = panel.current;
    const caller = document.activeElement;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const width = document.documentElement.clientWidth;
    const gutter = width > 0 ? window.innerWidth - width : 0;
    const background = localClose
      ? document.querySelector<HTMLElement>('[data-article-background]')
      : null;
    const previousInert = background?.inert;
    const previousHidden = background?.getAttribute('aria-hidden');

    if (background) {
      background.inert = true;
      background.setAttribute('aria-hidden', 'true');
    }

    document.body.style.overflow = 'hidden';
    if (gutter > 0) document.body.style.paddingRight = gutter + 'px';
    if (localClose) closeControl.current?.focus({ preventScroll: true });
    else element?.focus({ preventScroll: true });

    const containFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !element?.contains(event.target))
        element?.focus({ preventScroll: true });
    };

    document.addEventListener('focusin', containFocus);

    return () => {
      document.removeEventListener('focusin', containFocus);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = padding;

      // A group chooser can be replaced by a routed detail in the same commit.
      if (background && background.dataset.articleOverlay !== 'true') {
        background.inert = previousInert ?? false;
        if (previousHidden === null || previousHidden === undefined)
          background.removeAttribute('aria-hidden');
        else background.setAttribute('aria-hidden', previousHidden);
      }

      if (caller instanceof HTMLElement && caller.isConnected)
        caller.focus({ preventScroll: true });
    };
  }, [localClose]);

  function close(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;

    if (onClose) {
      event.preventDefault();
      onClose();
    } else if (route?.active) {
      event.preventDefault();
      route.close();
    }
  }

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-labelledby={titleId}
      tabIndex={-1}
      data-expanded={expanded}
      className={`ui-sheet-enter fixed bottom-0 left-1/2 z-40 flex max-h-[calc(100dvh_-_max(49px,env(safe-area-inset-top)))] w-full max-w-[640px] min-w-0 -translate-x-1/2 flex-col gap-4 overflow-hidden overscroll-contain rounded-t-3xl border-0 border-t border-solid border-border bg-surface p-4 pb-[max(16px,env(safe-area-inset-bottom))] text-text shadow-[0_-8px_16px_rgb(0_0_0/10%)] motion-safe:transition-[height] motion-safe:duration-200 motion-safe:ease-out ${expanded ? 'h-[calc(100dvh_-_max(49px,env(safe-area-inset-top)))]' : 'h-[53.52dvh]'}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          closeControl.current?.click();
        }

        if (event.key !== 'Tab') return;
        const controls = Array.from(
          panel.current?.querySelectorAll<HTMLElement>('*') ?? [],
        ).filter((element) =>
          element.matches(
            'a[href], button:not(:disabled), input:not(:disabled), [tabindex="0"]',
          ),
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
      }}
    >
      <div className="shrink-0">
        <button
          type="button"
          aria-label={expanded ? '기사 시트 접기' : '기사 시트 펼치기'}
          aria-expanded={expanded}
          className="ui-control flex h-6 w-full touch-none cursor-grab items-start justify-center border-0 bg-transparent p-0 active:cursor-grabbing"
          onClick={(event) => {
            if (event.detail > 0 && drag.current?.moved) {
              drag.current = null;

              return;
            }

            drag.current = null;
            setExpanded((value) => !value);
          }}
          onPointerDown={(event) => {
            drag.current = { start: event.clientY, moved: false };
            event.currentTarget.setPointerCapture?.(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (
              drag.current &&
              Math.abs(event.clientY - drag.current.start) > 12
            )
              drag.current.moved = true;
          }}
          onPointerUp={(event) => {
            if (!drag.current) return;
            const delta = event.clientY - drag.current.start;

            if (Math.abs(delta) > 24) {
              drag.current.moved = true;
              setExpanded(delta < 0);
            }
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <span
            aria-hidden="true"
            className="h-1 w-9 rounded-full bg-slate-400"
          />
        </button>
        <nav
          aria-label="기사 상세 탐색"
          className="flex h-6 items-center justify-end"
        >
          {!onClose && (
            <Link
              href="/incidents"
              scroll={false}
              aria-label="목록으로"
              className="sr-only focus:not-sr-only focus:mr-auto focus:text-sm"
            >
              목록으로
            </Link>
          )}
          {onClose ? (
            <button
              type="button"
              ref={(element) => {
                closeControl.current = element;
              }}
              aria-label={closeLabel}
              onClick={close}
              className="ui-control grid size-6 place-items-center rounded border-0 bg-transparent p-0"
            >
              <span
                aria-hidden="true"
                className="block size-6 bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/article-detail/close.svg')" }}
              />
            </button>
          ) : (
            <Link
              ref={(element) => {
                closeControl.current = element;
              }}
              href={route?.active ? route.sourcePath : '/'}
              scroll={false}
              aria-label={closeLabel}
              onClick={close}
              className="ui-control grid size-6 place-items-center rounded"
            >
              <span
                aria-hidden="true"
                className="block size-6 bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/article-detail/close.svg')" }}
              />
            </Link>
          )}
        </nav>
      </div>
      <div
        tabIndex={0}
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain [overflow-wrap:anywhere]"
      >
        {children}
      </div>
      {footer && (
        <div className="max-h-[40dvh] shrink-0 overflow-y-auto overscroll-contain">
          {footer}
        </div>
      )}
    </div>
  );
}
