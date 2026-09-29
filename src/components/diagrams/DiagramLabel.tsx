import type { HTMLAttributes } from 'react';

interface DiagramLabelProps extends HTMLAttributes<HTMLSpanElement> {
  readonly variant?: 'connector' | 'feedback';
}

/** Shared connector label surface and typography. Placement stays with the caller. */
export default function DiagramLabel({ variant = 'connector', className, ...props }: DiagramLabelProps) {
  const base = 'diagram-connector-label' + (variant === 'feedback' ? ' diagram-connector-label--feedback' : '');
  return <span {...props} className={className ? base + ' ' + className : base} />;
}
