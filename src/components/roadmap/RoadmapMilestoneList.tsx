import Link from 'next/link';
import RoadmapStatusBadge from './RoadmapStatusBadge';
import type { RoadmapMilestone } from '@/types/roadmap';

export default function RoadmapMilestoneList({ milestones }: { milestones: readonly RoadmapMilestone[] }) {
  if (!milestones.length) return <p className="text-sm text-[var(--color-text-muted)]">No milestones listed yet.</p>;
  return <ul className="space-y-3">{milestones.map((item) => <li className="rounded-lg border border-[var(--color-border)] bg-[var(--color-elevated)] p-4" key={item.id}>
    <div className="flex flex-wrap items-center justify-between gap-2"><h4 className="font-semibold">{item.title}</h4><RoadmapStatusBadge status={item.status} /></div>
    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{item.summary}</p>
    {item.links.length ? <ul className="mt-3 flex gap-3">{item.links.map((link) => <li key={link.id}><Link className="text-sm text-[var(--color-accent-cyan)]" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>{link.label}</Link></li>)}</ul> : null}
  </li>)}</ul>;
}
