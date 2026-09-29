'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';

export default function RoadmapToggle({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-5 border-t border-[var(--color-border)] pt-4">
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="theme-transition inline-flex min-h-9 items-center gap-1.5 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-1.5 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-accent-cyan)]"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span
          aria-hidden="true"
          className={`transition-transform motion-reduce:transition-none ${open ? 'rotate-90' : ''}`}
        >
          {'›'}
        </span>
        Release snapshot
      </button>
      <div hidden={!open} id={panelId}>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
