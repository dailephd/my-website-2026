import type { DiagramTone } from './DiagramConnectorPath';

/** Shared arrowhead marker. The caller supplies a unique `id` and references it via markerEnd. */
export default function DiagramArrowMarker({ id, tone }: { id: string; tone: DiagramTone }) {
  return (
    <marker id={id} markerHeight="4" markerUnits="strokeWidth" markerWidth="4" orient="auto" refX="3.5" refY="2" viewBox="0 0 4 4">
      <path className={'diagram-arrow-marker--' + tone} d="M0 0 4 2 0 4z" />
    </marker>
  );
}
