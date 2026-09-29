import type { HTMLAttributes } from 'react';

/** Shared diagram surface. Topology and layout stay with the caller via `className`. */
export default function DiagramCanvas({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={className ? 'diagram-canvas ' + className : 'diagram-canvas'} />;
}
