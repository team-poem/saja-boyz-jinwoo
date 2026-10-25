import type { ReactNode } from 'react';

import { Icon, type IconName, type IconSize } from '../icon/icon';

const gaps = {
  compact: 'gap-icon-gap-compact',
  default: 'gap-icon-gap',
  comfortable: 'gap-icon-gap-comfortable',
};

export function IconText({
  icon,
  children,
  size = 'default',
  spacing = 'default',
  position = 'start',
  className = '',
  textClassName = '',
  iconClassName = '',
}: {
  icon: IconName;
  children: ReactNode;
  size?: IconSize;
  spacing?: keyof typeof gaps;
  position?: 'start' | 'end';
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}) {
  const glyph = <Icon name={icon} size={size} className={iconClassName} />;

  return (
    <span
      className={`inline-flex min-w-0 items-center ${gaps[spacing]} ${className}`}
    >
      {position === 'start' && glyph}
      <span className={`min-w-0 ${textClassName}`}>{children}</span>
      {position === 'end' && glyph}
    </span>
  );
}
