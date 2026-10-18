import type { ReactNode } from 'react';

export function Notice({
  title,
  children,
  action,
  role = 'status',
  titleAs: Title = 'p',
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  role?: 'status' | 'alert' | 'group';
  titleAs?: 'p' | 'h1';
}) {
  return (
    <div
      role={role}
      className="rounded-2xl border border-solid border-brand/20 bg-surface p-4 text-text shadow-floating [overflow-wrap:anywhere]"
    >
      <div className="flex items-start gap-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-5 shrink-0 text-brand"
        >
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v3m0 16v3M1 12h3m16 0h3" />
        </svg>
        <div className="min-w-0 flex-1">
          <Title className="m-0 text-sm font-bold leading-5">{title}</Title>
          <div className="mt-2 text-sm leading-6 text-muted [&_p]:m-0 [&_p+p]:mt-2">
            {children}
            {action && (
              <div className="mt-3 flex flex-wrap gap-2 [&_a]:min-w-0 [&_a]:max-w-full [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:px-3 [&_a]:text-brand [&_a]:underline [&_button]:min-h-11 [&_button]:min-w-0 [&_button]:max-w-full [&_button]:cursor-pointer [&_button]:rounded-lg [&_button]:border [&_button]:border-solid [&_button]:border-brand/30 [&_button]:bg-surface [&_button]:px-3 [&_button]:py-2 [&_button]:font-[inherit] [&_button]:text-sm [&_button]:font-semibold [&_button]:text-brand [&_button]:[overflow-wrap:anywhere] [&_button:enabled:hover]:bg-brand/5 [&_button:enabled:active]:bg-brand/10 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-brand [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-50">
                {action}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
