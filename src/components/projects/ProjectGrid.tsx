import Card from '@/components/ui/Card';
import ProjectCard from '@/components/projects/ProjectCard';
import type { Project } from '@/types/project';

export default function ProjectGrid({
  projects,
  featured = false,
  quiet = false,
  showTags = true,
}: {
  projects: readonly Project[];
  featured?: boolean;
  quiet?: boolean;
  showTags?: boolean;
}) {
  if (projects.length === 0) {
    return (
      <Card>
        <p className="text-[var(--color-text-secondary)]">
          No projects are available in this collection yet.
        </p>
      </Card>
    );
  }

  return (
    <div
      className={
        featured
          ? 'grid gap-6 lg:grid-cols-2'
          : 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3'
      }
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} quiet={quiet} showTags={showTags} />
      ))}
    </div>
  );
}
