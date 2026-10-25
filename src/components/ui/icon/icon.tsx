const glyphs = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4m10-4v4M3 10h18m-14 4h2m4 0h2m-8 3h2" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  link: (
    <>
      <path d="m10 13 4-4m-5 7-1 1a4.2 4.2 0 0 1-6-6l4-4a4.2 4.2 0 0 1 6 0m0 2 1-1a4.2 4.2 0 0 1 6 6l-4 4a4.2 4.2 0 0 1-6 0" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  flame: (
    <path d="M13 2c1 5-4 6-4 10-2-1-3-3-3-3-5 7-1 13 6 13s11-7 7-12c0 3-2 4-2 4 0-5-2-8-4-12Z" />
  ),
  traffic: (
    <>
      <path d="M5 18h14M7 18v-6a5 5 0 0 1 10 0v6M12 2v2M3 6l2 2m14 0 2-2" />
      <path d="M9 21h6m-5-9a2 2 0 0 1 2-2" />
    </>
  ),
  warning: (
    <>
      <path d="m12 3 10 18H2L12 3Zm0 6v5" />
      <circle cx="12" cy="17.5" r=".5" fill="currentColor" stroke="none" />
    </>
  ),
  snow: (
    <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M4 11l4-1-1-4m13 7-4 1 1 4M7 18l1-4-4-1m13-7-1 4 4 1" />
  ),
  wind: (
    <path d="M3 8h12a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h5a3 3 0 1 1-3 3" />
  ),
  'chevron-down': <path d="m4 8 8 8 8-8" />,
  'arrow-right': <path d="M3 12h18m-7-7 7 7-7 7" />,
};

export type IconName = keyof typeof glyphs;

export type IconSize = 'indicator' | 'compact' | 'default' | 'action';

const sizes: Record<IconSize, string> = {
  indicator: 'size-icon-indicator',
  compact: 'size-icon-compact',
  default: 'size-icon-default',
  action: 'size-icon-action',
};

export function Icon({
  name,
  size = 'default',
  className = '',
}: {
  name: IconName;
  size?: IconSize;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`block shrink-0 ${sizes[size]} ${className}`}
    >
      {glyphs[name]}
    </svg>
  );
}
