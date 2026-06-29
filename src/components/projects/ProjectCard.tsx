import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import ProjectLinkList from '@/components/projects/ProjectLinkList';
import { cn } from '@/lib/utils';
import type { Project, ProjectCategory, ProjectStatus } from '@/types/project';

const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active',
  'in-development': 'In development',
  maintained: 'Maintained',
  experimental: 'Experimental',
  archived: 'Archived',
  planned: 'Planned',
};

const categoryLabels: Record<ProjectCategory, string> = {
  'developer-tooling': 'Developer tooling',
  'scientific-software': 'Scientific software',
  'website-product-lab': 'Website and product lab',
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="h-full" data-project-slug={project.slug}>
      <Card
        className={cn(
          'premium-card-interactive flex h-full flex-col',
          project.featured &&
            'border-[var(--color-accent-violet)] bg-[var(--color-elevated)] shadow-[var(--shadow-card-hover)]',
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{statusLabels[project.status]}</Badge>
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            {categoryLabels[project.category]}
          </span>
        </div>

        {project.featured ? (
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-violet)]">
            Featured project
          </p>
        ) : null}

        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          {project.title}
        </h3>
        <p className="mt-4 text-[var(--color-text-secondary)]">{project.summary}</p>
        {project.longSummary ? (
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{project.longSummary}</p>
        ) : null}

        <p className="mt-5 text-sm text-[var(--color-text-secondary)]">
          <span className="font-semibold text-[var(--color-text-primary)]">Role:</span>{' '}
          {project.role}
        </p>

        <ul aria-label={`${project.title} technology stack`} className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <ProjectLinkList links={project.links} />
        </div>
      </Card>
    </article>
  );
}
