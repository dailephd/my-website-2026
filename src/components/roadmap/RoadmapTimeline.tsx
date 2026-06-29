import RoadmapPhaseCard from './RoadmapPhaseCard';
import RoadmapProgressRail from './RoadmapProgressRail';
import RoadmapStatusBadge from './RoadmapStatusBadge';
import type { RoadmapLane } from '@/types/roadmap';

export default function RoadmapTimeline({ lanes }: { lanes: readonly RoadmapLane[] }) {
  return <div className="space-y-10">{lanes.map((lane) => <section aria-labelledby={`${lane.id}-heading`} key={lane.id}><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-semibold text-[var(--color-accent-cyan)]">{lane.roleLabel}</p><h2 className="mt-1 text-2xl font-semibold" id={`${lane.id}-heading`}>{lane.title}</h2><p className="mt-2 max-w-3xl text-sm text-[var(--color-text-secondary)]">{lane.summary}</p></div><RoadmapStatusBadge status={lane.status} /></div><RoadmapProgressRail /><div className="grid gap-5 xl:grid-cols-2">{lane.phases.map((phase) => <RoadmapPhaseCard key={phase.id} phase={phase} />)}</div></section>)}</div>;
}
