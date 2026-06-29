import type { ReactNode } from 'react';

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="theme-transition inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)] shadow-sm">
      {children}
    </span>
  );
}
