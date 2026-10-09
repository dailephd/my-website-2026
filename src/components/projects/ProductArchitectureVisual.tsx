import { useId } from 'react';

import DiagramArrowMarker from '@/components/diagrams/DiagramArrowMarker';
import DiagramCanvas from '@/components/diagrams/DiagramCanvas';
import DiagramConnectorPath, { type DiagramTone } from '@/components/diagrams/DiagramConnectorPath';
import DiagramLabel from '@/components/diagrams/DiagramLabel';
import DiagramNode from '@/components/diagrams/DiagramNode';
import DiagramSummary from '@/components/diagrams/DiagramSummary';

import ProductLinks from './ProductLinks';
import RoadmapTimeline from './RoadmapTimeline';
import RoadmapToggle from './RoadmapToggle';
import type { ProductModule } from '@/types/product';

interface NodeCopy {
  readonly stages: readonly string[];
  readonly branches: readonly string[];
  readonly outcome: string;
  readonly tone: DiagramTone;
}

const NODE_COPY: Record<string, NodeCopy> = {
  'my-dev-kit': {
    stages: ['Index source roots', 'Manifest + semantic graphs'],
    branches: ['Search', 'Lookup', 'Slice', 'Source', 'Context'],
    outcome: 'Bounded static evidence',
    tone: 'data',
  },
  'my-dev-kit-orchestrator': {
    stages: ['Start / resume run', 'Current stage prompt', 'Artifacts + readiness'],
    branches: ['Responsibility continuity', 'Status / check', 'Judge / correction routing'],
    outcome: 'Export / handoff',
    tone: 'control',
  },
  'my-frontend-observer': {
    stages: ['Initialize project', 'Capture baseline', 'Check candidate'],
    branches: ['Before / after comparison', 'Frontend contract', 'Reference fidelity'],
    outcome: 'Viewer + correction evidence',
    tone: 'data',
  },
  'my-dev-kit-lab': {
    stages: ['Choose experiment / audit / security validation', 'Explicit target + configuration', 'Run bounded evidence workflow'],
    branches: ['Reports', 'Plots', 'Gallery / tutorial'],
    outcome: 'Reviewable assurance evidence',
    tone: 'control',
  },
};

const SUMMARY =
  'my-dev-kit produces bounded static repository evidence that can be supplied to my-dev-kit-orchestrator. The orchestrator manages staged prompts, artifacts, readiness, responsibility continuity, and correction routing but does not execute the coding agent. A human or coding agent edits target source. my-frontend-observer evaluates the rendered frontend and returns runtime evidence for review or correction without editing source. my-dev-kit-lab is an optional assurance companion for supported experiments, audits, security validation, and reports.';

function GraphIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 20 20">
      <circle cx="4" cy="4" r="2" /><circle cx="16" cy="4" r="2" /><circle cx="10" cy="10" r="2" /><circle cx="4" cy="16" r="2" />
      <line x1="5.4" x2="8.6" y1="5.4" y2="8.6" /><line x1="14.6" x2="11.4" y1="5.4" y2="8.6" /><line x1="5.4" x2="8.6" y1="14.6" y2="11.4" />
    </svg>
  );
}

function StagesIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 20 20">
      <rect height="4" rx="1" width="16" x="2" y="2" /><rect height="4" rx="1" width="16" x="2" y="8" /><rect height="4" rx="1" width="16" x="2" y="14" />
    </svg>
  );
}

function BrowserIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 20 20">
      <rect height="15" rx="2" width="18" x="1" y="2.5" /><path d="M1 7h18M4 4.8h1M7 4.8h1M10 4.8h1" />
      <path d="M6 12h4m2 0h2M6 15h8" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 20 20">
      <line stroke="currentColor" strokeWidth="1.5" x1="2" x2="2" y1="18" y2="3" /><line stroke="currentColor" strokeWidth="1.5" x1="2" x2="18" y1="18" y2="18" />
      <rect height="6" rx="0.5" width="3" x="4" y="12" /><rect height="9" rx="0.5" width="3" x="9" y="9" /><rect height="13" rx="0.5" width="3" x="14" y="5" />
    </svg>
  );
}

function EvidenceIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" viewBox="0 0 20 20">
      <path d="M5 2.5h7l3 3V17.5H5z" /><path d="M12 2.5v3h3M7.5 9h5M7.5 12h5M7.5 15h3" />
    </svg>
  );
}

function getIcon(moduleId: string) {
  if (moduleId === 'my-dev-kit') return <GraphIcon />;
  if (moduleId === 'my-dev-kit-orchestrator') return <StagesIcon />;
  if (moduleId === 'my-frontend-observer') return <BrowserIcon />;
  return <ChartIcon />;
}

function VerticalConnector({
  label,
  name,
}: {
  label: string;
  name: 'static-evidence' | 'workflow-context' | 'implementation-handoff' | 'candidate-runtime';
}) {
  const markerId = useId();
  return (
    <div className="relative z-0 flex flex-col items-center gap-1 py-2" data-diagram-connector={name}>
      <svg aria-hidden="true" className="h-12 w-8 overflow-visible" viewBox="0 0 32 56">
        <defs><DiagramArrowMarker id={markerId} tone="data" /></defs>
        <DiagramConnectorPath d="M16 2 V47" markerEnd={'url(#' + markerId + ')'} tone="data" variant="primary" />
      </svg>
      <DiagramLabel>{label}</DiagramLabel>
    </div>
  );
}

function MiniArrow({ tone }: { tone: DiagramTone }) {
  const markerId = useId();
  return (
    <svg aria-hidden="true" className="mx-auto h-6 w-6 overflow-visible" viewBox="0 0 24 28">
      <defs><DiagramArrowMarker id={markerId} tone={tone} /></defs>
      <DiagramConnectorPath d="M12 1 V20" markerEnd={'url(#' + markerId + ')'} tone={tone} variant="secondary" />
    </svg>
  );
}

function StepNode({ label, branch = false }: { label: string; branch?: boolean }) {
  return <DiagramNode className={branch ? '' : 'mx-auto w-full max-w-sm'} variant="secondary">{label}</DiagramNode>;
}

function BranchGroup({ items, tone }: { items: readonly string[]; tone: DiagramTone }) {
  const positions = items.length === 5 ? [10, 30, 50, 70, 90] : [16.67, 50, 83.33];
  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <svg aria-hidden="true" className="h-8 w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 32">
          <DiagramConnectorPath d="M50 1 V13 M10 13 H90" tone={tone} variant="secondary" />
          {positions.map((position) => <DiagramConnectorPath d={'M' + position + ' 13 V30'} key={position} tone={tone} variant="secondary" />)}
        </svg>
        <div className={'grid gap-2 ' + (items.length === 5 ? 'grid-cols-5' : 'grid-cols-3')}>
          {items.map((item) => <StepNode branch key={item} label={item} />)}
        </div>
      </div>
      <div className="sm:hidden">
        <svg aria-hidden="true" className="h-8 w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 32">
          <DiagramConnectorPath d="M50 0 V14 H0 V32" tone={tone} variant="secondary" />
        </svg>
        <div className={'diagram-rail--' + tone + ' space-y-2 border-l-[3px] pl-3'}>
          {items.map((item) => (
            <div className="flex items-center gap-2" key={item}>
              <span aria-hidden="true" className={'diagram-rail--' + tone + ' h-0 w-3 shrink-0 border-t-[3px]'} />
              <DiagramNode as="span" className="flex-1" variant="secondary">{item}</DiagramNode>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BranchMerge({ items, tone }: { items: readonly string[]; tone: DiagramTone }) {
  const positions = items.length === 5 ? [10, 30, 50, 70, 90] : [16.67, 50, 83.33];
  return (
    <>
      <svg aria-hidden="true" className="hidden h-8 w-full overflow-visible sm:block" preserveAspectRatio="none" viewBox="0 0 100 32">
        {positions.map((position) => <DiagramConnectorPath d={'M' + position + ' 1 V15 H50'} key={position} tone={tone} variant="secondary" />)}
        <DiagramConnectorPath d="M50 15 V31" tone={tone} variant="secondary" />
      </svg>
      <svg aria-hidden="true" className="h-8 w-full overflow-visible sm:hidden" preserveAspectRatio="none" viewBox="0 0 100 32">
        <DiagramConnectorPath d="M0 0 V14 H50 V32" tone={tone} variant="secondary" />
      </svg>
      <MiniArrow tone={tone} />
    </>
  );
}

function MiniDiagram({ moduleId, title, copy }: { moduleId: string; title: string; copy: NodeCopy }) {
  return (
    <div className="mt-5 border-t border-[var(--color-border)] pt-5" data-diagram-mini={moduleId}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">Internal workflow</p>
      <div aria-label={title + ' workflow steps'} className="space-y-0" role="group">
        {copy.stages.map((stage, index) => (
          <div key={stage}>
            <StepNode label={stage} />
            {index < copy.stages.length - 1 ? <MiniArrow tone={copy.tone} /> : null}
          </div>
        ))}
      </div>
      <BranchGroup items={copy.branches} tone={copy.tone} />
      <BranchMerge items={copy.branches} tone={copy.tone} />
      <div aria-label={title + ' workflow outcome'} role="group"><StepNode label={copy.outcome} /></div>
    </div>
  );
}

function ModulePanel({ productModule }: { productModule: ProductModule }) {
  const moduleId = productModule.id;
  const copy = NODE_COPY[moduleId];
  if (!copy) return null;
  return (
    <DiagramNode
      aria-labelledby={'arch-node-' + moduleId + '-heading'}
      as="article"
      className="relative z-10 w-full"
      data-diagram-node={moduleId}
      variant="primary"
    >
      <div className="flex items-start gap-3">
        <div aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--color-accent-secondary-text)]">{getIcon(moduleId)}</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-primary-text)]">{productModule.roleLabel}</p>
          <h3 className="mt-1 break-words text-xl font-semibold tracking-tight" id={'arch-node-' + moduleId + '-heading'}>{productModule.title}</h3>
          <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">{productModule.layerLabel}</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">{productModule.summary}</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">{productModule.description}</p>
        </div>
      </div>
      <MiniDiagram copy={copy} moduleId={moduleId} title={productModule.title} />
      <ProductLinks links={productModule.links} />
      <RoadmapToggle><RoadmapTimeline entries={productModule.versionRoadmap} /></RoadmapToggle>
    </DiagramNode>
  );
}

function EvidenceCard() {
  return (
    <DiagramNode
      aria-labelledby="arch-node-evidence-heading"
      className="relative z-10 mx-auto w-full max-w-md px-4 py-4 sm:px-5"
      data-diagram-node="bounded-repository-evidence"
      role="group"
      variant="artifact"
    >
      <div className="flex items-start justify-center gap-3">
        <span aria-hidden="true" className="mt-0.5 text-[var(--color-accent-primary)]"><EvidenceIcon /></span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-primary-text)]">Supplied evidence</p>
          <p className="mt-1 text-base font-semibold text-[var(--color-text-primary)]" id="arch-node-evidence-heading">Bounded Repository Evidence</p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Selected source, graph, context, and retrieval provenance supplied to the workflow.</p>
        </div>
      </div>
    </DiagramNode>
  );
}

function ExternalActor() {
  return (
    <DiagramNode
      aria-labelledby="arch-node-external-actor-heading"
      className="relative z-10 mx-auto w-full max-w-md text-left"
      data-diagram-node="external-implementation-actor"
      role="group"
      variant="secondary"
    >
      <p className="text-sm font-semibold text-[var(--color-text-primary)]" id="arch-node-external-actor-heading">External implementation actor</p>
      <p className="mt-1 text-sm font-normal text-[var(--color-text-secondary)]">A human or coding agent edits the target source. The ecosystem tools do not silently perform this step.</p>
    </DiagramNode>
  );
}

function RuntimeCorrectionConnector() {
  const markerId = useId();
  return (
    <div className="relative col-start-2 row-start-5 row-end-10 min-w-0 self-stretch" data-diagram-connector="runtime-correction">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 48 100">
        <defs><DiagramArrowMarker id={markerId} tone="control" /></defs>
        <DiagramConnectorPath d="M2 98 H26 Q36 98 36 88 V12 Q36 2 26 2 H3" markerEnd={'url(#' + markerId + ')'} variant="feedback" />
      </svg>
      <DiagramLabel className="absolute right-0 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl]" variant="feedback">
        runtime evidence + correction result
      </DiagramLabel>
    </div>
  );
}

function OptionalAssuranceConnector() {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 py-4" data-diagram-connector="optional-assurance">
      <svg aria-hidden="true" className="h-5 w-full max-w-40 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 20">
        <DiagramConnectorPath d="M1 10 H99" variant="feedback" />
      </svg>
      <DiagramLabel>optional assurance</DiagramLabel>
    </div>
  );
}

export default function ProductArchitectureVisual({ modules }: { modules: readonly ProductModule[] }) {
  const headingId = useId();
  const summaryId = useId();
  const moduleById = new Map(modules.map((productModule) => [productModule.id, productModule]));
  const devKit = moduleById.get('my-dev-kit');
  const orchestrator = moduleById.get('my-dev-kit-orchestrator');
  const observer = moduleById.get('my-frontend-observer');
  const lab = moduleById.get('my-dev-kit-lab');

  return (
    <section aria-labelledby={headingId}>
      <header className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight" id={headingId}>How the products are related</h2>
        <p className="mt-2 max-w-3xl text-[var(--color-text-secondary)]">Static repository evidence feeds staged workflow control; an external implementation actor changes source; Observer returns browser/runtime evidence for review and correction; Lab provides optional assurance when explicitly invoked.</p>
      </header>
      <DiagramCanvas aria-describedby={summaryId} data-diagram="my-dev-kit-ecosystem">
        <DiagramSummary id={summaryId}>{SUMMARY}</DiagramSummary>
        <div className="grid min-w-0 gap-x-5 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_2.25rem] sm:grid-cols-[minmax(0,1fr)_3.5rem]" data-diagram-core>
            {devKit ? <div className="col-start-1 row-start-1 min-w-0"><ModulePanel productModule={devKit} /></div> : null}
            <div className="col-start-1 row-start-2"><VerticalConnector label="bounded static evidence" name="static-evidence" /></div>
            <div className="col-start-1 row-start-3 min-w-0"><EvidenceCard /></div>
            <div className="col-start-1 row-start-4"><VerticalConnector label="supplied context evidence" name="workflow-context" /></div>
            {orchestrator ? <div className="col-start-1 row-start-5 min-w-0"><ModulePanel productModule={orchestrator} /></div> : null}
            <div className="col-start-1 row-start-6"><VerticalConnector label="stage prompt + acceptance contract" name="implementation-handoff" /></div>
            <div className="col-start-1 row-start-7 min-w-0"><ExternalActor /></div>
            <div className="col-start-1 row-start-8"><VerticalConnector label="changed application" name="candidate-runtime" /></div>
            {observer ? <div className="col-start-1 row-start-9 min-w-0"><ModulePanel productModule={observer} /></div> : null}
            <RuntimeCorrectionConnector />
          </div>
          {lab ? (
            <aside className="min-w-0 lg:self-center" aria-label="Optional assurance">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-secondary-text)]">Optional assurance</p>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Run explicitly when experiments, audits, security validation, or additional evidence are required.</p>
              <OptionalAssuranceConnector />
              <ModulePanel productModule={lab} />
            </aside>
          ) : null}
        </div>
      </DiagramCanvas>
    </section>
  );
}
