export default function RoadmapUpdatedLabel({ updatedAt }: { updatedAt: string }) {
  const date = new Date(`${updatedAt}T00:00:00Z`);
  if (Number.isNaN(date.valueOf())) throw new Error(`Invalid roadmap date: ${updatedAt}`);
  return <p className="text-sm text-[var(--color-text-muted)]">Updated {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(date)}</p>;
}
