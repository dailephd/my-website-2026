import type { ElementType, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export default function Card({
  as: Component = 'div',
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType }) {
  return (
    <Component
      className={cn(
        'premium-card theme-transition rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-6',
        className,
      )}
      {...props}
    />
  );
}
