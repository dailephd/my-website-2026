import Link from 'next/link';

import ProjectGrid from '@/components/projects/ProjectGrid';
import SectionHeader from '@/components/ui/SectionHeader';
import { routes } from '@/lib/routes';
import type { HomeSectionCopy } from '@/types/home';
import type { Project } from '@/types/project';

export default function FeaturedWorkSection({
  copy,
  projects,
}: {
  copy: HomeSectionCopy;
  projects: readonly Project[];
}) {
  return (
    <section aria-labelledby="featured-work-heading" className="section-shell">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          description={copy.summary}
          headingId="featured-work-heading"
          title={copy.heading}
        />
        <Link
          className="premium-link mb-7 rounded-sm font-medium text-[var(--color-accent-cyan)] hover:underline"
          href={routes.work}
        >
          View all selected work
        </Link>
      </div>
      <ProjectGrid featured projects={projects} />
    </section>
  );
}
