import { useId } from 'react';

import ProductLinks from './ProductLinks';
import RoadmapTimeline from './RoadmapTimeline';
import RoadmapToggle from './RoadmapToggle';
import type { ProductModule } from '@/types/product';

interface NodeCopy {
  readonly label: string;
  readonly purpose: string;
  readonly steps: readonly string[];
}

const NODE_COPY: Record<string, NodeCopy> = {
  'my-dev-kit': {
    label: 'Context acquisition layer',
    purpose: 'Retrieves bounded project context through graph-guided workflows.',
    steps: [
      'Index project',
      'Project manifest + graphs',
      'Search / Lookup / Slice / Source / Semantic view',
      'Architecture context',
    ],
  },
  'my-dev-kit-orchestrator': {
    label: 'Workflow control layer',
    purpose: 'Organizes the staged design-to-code workflow after context acquisition.',
    steps: [
      'Consume Architecture Context Packet',
      'Stage workflow',
      'Generate implementation prompts',
      'Coding agent execution',
      'Tests / Reports / Artifacts',
    ],
  },
  'my-dev-kit-lab': {
    label: 'Evaluation and visualization layer',
    purpose: 'Evaluates prompt variants, agents, and outputs through experiments and visualizations.',
    steps: [
      'Benchmark projects',
      'Prompt variants',
      'Agent adapters',
      'Experiment runner',
      'Reports / Charts / Demos / Gallery',
    ],
  },
};

const PACKET = {
  title: 'Architecture Context Packet',
  description: 'Retrieval evidence + synthesized context packet',
};

const OUTCOME_LABEL = 'artifacts and outcomes';
const FEEDBACK_LABEL = 'feedback for better prompts and workflows';

function GraphIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 20 20">
      <circle cx="4" cy="4" r="2" />
      <circle cx="16" cy="4" r="2" />
      <circle cx="10" cy="10" r="2" />
      <circle cx="4" cy="16" r="2" />
      <line x1="5.4" x2="8.6" y1="5.4" y2="8.6" />
      <line x1="14.6" x2="11.4" y1="5.4" y2="8.6" />
      <line x1="5.4" x2="8.6" y1="14.6" y2="11.4" />
    </svg>
  );
}

function StagesIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 20 20">
      <rect height="4" rx="1" width="16" x="2" y="2" />
      <rect height="4" rx="1" width="16" x="2" y="8" />
      <rect height="4" rx="1" width="16" x="2" y="14" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 20 20">
      <line stroke="currentColor" strokeWidth="1.5" x1="2" x2="2" y1="18" y2="3" />
      <line stroke="currentColor" strokeWidth="1.5" x1="2" x2="18" y1="18" y2="18" />
      <rect height="6" rx="0.5" width="3" x="4" y="12" />
      <rect height="9" rx="0.5" width="3" x="9" y="9" />
      <rect height="13" rx="0.5" width="3" x="14" y="5" />
    </svg>
  );
}

function getIcon(moduleId: string) {
  if (moduleId === 'my-dev-kit') return <GraphIcon />;
  if (moduleId === 'my-dev-kit-orchestrator') return <StagesIcon />;
  return <ChartIcon />;
}

/** Thick, glowing gradient connector between vertically stacked flow stages. Purely decorative — carries no information not already conveyed by DOM order and labels. */
function VerticalConnector({ label }: { label?: string }) {
  const gradientId = useId();
  return (
    <div className="flex flex-col items-center gap-1.5 py-1.5" role="presentation">
      <svg aria-hidden="true" className="h-10 w-5 overflow-visible" preserveAspectRatio="none" viewBox="0 0 20 100">
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-violet)" />
            <stop offset="100%" stopColor="var(--color-accent-cyan)" />
          </linearGradient>
        </defs>
        <path
          d="M10,2 L10,86"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={10}
          style={{ filter: 'drop-shadow(0 0 3px var(--color-glow-cyan))' }}
        />
        <polygon fill="var(--color-accent-cyan)" points="2,86 18,86 10,99" />
      </svg>
      {label ? (
        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-0.5 text-center text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/** Dashed upward loop indicating evaluation feedback flowing back into the orchestrator stage. */
function FeedbackConnector({ label, target }: { label: string; target: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-1.5" role="presentation">
      <svg aria-hidden="true" className="h-10 w-5 overflow-visible" preserveAspectRatio="none" viewBox="0 0 20 100">
        <path
          d="M10,98 L10,14"
          fill="none"
          stroke="var(--color-accent-violet)"
          strokeDasharray="7 6"
          strokeLinecap="round"
          strokeWidth={5}
        />
        <polygon fill="var(--color-accent-violet)" points="3,14 17,14 10,2" />
      </svg>
      <span className="max-w-[16rem] rounded-full border border-dashed border-[var(--color-accent-violet)] bg-[var(--color-surface)] px-3 py-1 text-center text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-violet)]">
        {label} — back to {target}
      </span>
    </div>
  );
}

function MiniDiagram({ title, steps }: { title: string; steps: readonly string[] }) {
  return (
    <ol aria-label={`${title} workflow steps`} className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 border-t border-[var(--color-border)] pt-4">
      {steps.map((step, index) => (
        <li className="flex items-center gap-1.5" key={step}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-card)] px-2.5 py-1 text-[0.7rem] leading-snug text-[var(--color-text-muted)]">
            <span
              aria-hidden="true"
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-[0.6rem] font-semibold text-[var(--color-accent-violet)]"
            >
              {index + 1}
            </span>
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden="true" className="text-[var(--color-accent-cyan)]">
              {'→'}
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function ModulePanel({ productModule }: { productModule: ProductModule }) {
  const moduleId = productModule.id;
  const title = productModule.title;
  const copy = NODE_COPY[moduleId];
  if (!copy) return null;

  return (
    <article
      aria-labelledby={`arch-node-${moduleId}-heading`}
      className="premium-card theme-transition motion-reduce:transition-none w-full rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-elevated)] p-6 shadow-[var(--shadow-control)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--color-accent-violet)] hover:shadow-[var(--shadow-card-hover)] motion-reduce:hover:translate-y-0 sm:p-7"
    >
      <div className="flex items-start gap-3">
        <div aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--color-accent-violet)]">
          {getIcon(moduleId)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-cyan)]">
            {copy.label}
          </p>
          <h3 className="mt-1 break-words text-xl font-semibold tracking-tight" id={`arch-node-${moduleId}-heading`}>
            {title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">{copy.purpose}</p>
        </div>
      </div>
      <MiniDiagram steps={copy.steps} title={title} />
      <ProductLinks links={productModule.links} />
      <RoadmapToggle>
        <RoadmapTimeline entries={productModule.versionRoadmap} />
      </RoadmapToggle>
    </article>
  );
}

function PacketCard() {
  return (
    <div
      aria-labelledby="arch-node-packet-heading"
      className="theme-transition motion-reduce:transition-none w-full max-w-md rounded-[var(--radius-card)] border border-[var(--color-accent-cyan)] bg-[var(--color-surface)] px-5 py-4 text-center shadow-[var(--shadow-control)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] motion-reduce:hover:translate-y-0"
      role="group"
    >
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-cyan)]">
        Handoff artifact
      </p>
      <p className="mt-1 text-base font-semibold" id="arch-node-packet-heading">
        {PACKET.title}
      </p>
      <p className="mt-1 text-[0.7rem] text-[var(--color-text-secondary)]">{PACKET.description}</p>
    </div>
  );
}

export default function ProductArchitectureVisual({ modules }: { modules: readonly ProductModule[] }) {
  const headingId = useId();
  const moduleById = new Map(modules.map((productModule) => [productModule.id, productModule]));
  const hasLab = moduleById.has('my-dev-kit-lab');
  const orchestratorModule = moduleById.get('my-dev-kit-orchestrator');
  const orchestratorTitle = orchestratorModule?.title ?? 'my-dev-kit-orchestrator';

  return (
    <section aria-labelledby={headingId}>
      <header className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight" id={headingId}>
          How the products are related
        </h2>
        <p className="mt-2 max-w-3xl text-[var(--color-text-secondary)]">
          Vertical overview of my-dev-kit, my-dev-kit-orchestrator, and my-dev-kit-lab.
        </p>
      </header>

      <div className="rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
        <div className="flex flex-col items-center gap-0">
          {moduleById.get('my-dev-kit') ? <ModulePanel productModule={moduleById.get('my-dev-kit')!} /> : null}
          <VerticalConnector label="Bounded context" />
          <PacketCard />
          <VerticalConnector label="Handoff artifact" />
          {orchestratorModule ? <ModulePanel productModule={orchestratorModule} /> : null}
          {hasLab ? (
            <>
              <VerticalConnector label={OUTCOME_LABEL} />
              <ModulePanel productModule={moduleById.get('my-dev-kit-lab')!} />
              <FeedbackConnector label={FEEDBACK_LABEL} target={orchestratorTitle} />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
