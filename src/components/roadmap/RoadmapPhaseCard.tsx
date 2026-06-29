import Card from '@/components/ui/Card';
import RoadmapMilestoneList from './RoadmapMilestoneList';
import RoadmapStatusBadge from './RoadmapStatusBadge';
import type { RoadmapPhase } from '@/types/roadmap';

export default function RoadmapPhaseCard({ phase }: { phase: RoadmapPhase }) {
  return <Card className="premium-card-interactive h-full"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-violet)]">{phase.timeframe} · {phase.priority}</p><h3 className="mt-2 text-xl font-semibold">{phase.title}</h3></div><RoadmapStatusBadge status={phase.status} /></div><p className="my-5 text-sm text-[var(--color-text-secondary)]">{phase.summary}</p><RoadmapMilestoneList milestones={phase.milestones} /></Card>;
}
