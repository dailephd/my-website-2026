export type DiagramTone = 'data' | 'control';
export type DiagramConnectorVariant = 'primary' | 'secondary' | 'feedback';

interface DiagramConnectorPathProps {
  /** Path geometry is owned by the caller's topology. */
  readonly d: string;
  readonly variant: DiagramConnectorVariant;
  /** Ignored for `feedback`, which is always the control tone. */
  readonly tone?: DiagramTone;
  readonly markerEnd?: string;
}

/** Shared SVG connector styling; viewport and coordinates stay local. */
export default function DiagramConnectorPath({ d, variant, tone = 'data', markerEnd }: DiagramConnectorPathProps) {
  const toneClass = variant === 'feedback' ? '' : ' diagram-connector--' + tone;
  return (
    <>
      <path aria-hidden="true" className={'diagram-connector-clearance diagram-connector-clearance--' + variant} d={d} />
      <path className={'diagram-connector diagram-connector--' + variant + toneClass} d={d} markerEnd={markerEnd} />
    </>
  );
}
