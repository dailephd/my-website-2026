import type { ReactNode } from 'react';

/** Accessible text equivalent for a diagram, visually hidden via the site `sr-only` utility. */
export default function DiagramSummary({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p className="diagram-summary sr-only" id={id}>
      {children}
    </p>
  );
}
