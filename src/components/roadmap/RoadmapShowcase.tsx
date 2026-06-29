import Card from '@/components/ui/Card';
import RoadmapTimeline from './RoadmapTimeline';
import RoadmapUpdatedLabel from './RoadmapUpdatedLabel';
import type { Roadmap } from '@/types/roadmap';

export default function RoadmapShowcase({ roadmap }: { roadmap: Roadmap }) {
  return <section aria-labelledby="roadmap-heading"><Card className="hero-backdrop mb-10 overflow-hidden rounded-[var(--radius-panel)] border-[var(--color-accent-violet)]"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-violet)]">Product strategy dashboard</p><h2 className="mt-3 text-3xl font-semibold" id="roadmap-heading">{roadmap.title}</h2><p className="mt-3 max-w-3xl text-[var(--color-text-secondary)]">{roadmap.summary}</p><div className="mt-4"><RoadmapUpdatedLabel updatedAt={roadmap.updatedAt} /></div></Card><RoadmapTimeline lanes={roadmap.lanes} /></section>;
}
