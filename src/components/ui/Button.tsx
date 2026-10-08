import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export default function Button({
  children,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={cn(
        'theme-transition inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-text-primary)] bg-[var(--color-text-primary)] px-5 py-2.5 font-semibold text-[var(--color-surface)] shadow-[var(--shadow-control)] hover:border-[var(--color-action-hover)] hover:bg-[var(--color-action-hover)] hover:text-[var(--color-on-accent)] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
