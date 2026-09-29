import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { getAboutProfile } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(routeMetadata.about);

export default function AboutPage() {
  const about = getAboutProfile();

  return (
    <div className="space-y-16 py-10 sm:py-16 lg:space-y-20">
      <section aria-labelledby="about-heading">
        <h1
          className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl"
          id="about-heading"
        >
          About {about.profile.name}
        </h1>
        {about.profile.intro ? (
          <p className="mt-5 max-w-3xl text-lg text-[var(--color-text-secondary)]">
            {about.profile.intro}
          </p>
        ) : null}
        {about.profile.locationLabel ? (
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            {about.profile.locationLabel}
          </p>
        ) : null}
      </section>

      {about.profile.professionalSummary ? (
        <section aria-labelledby="professional-heading">
          <SectionHeader
            description="Software development, AI model evaluation, and scientific work through dailephd LLC."
            headingId="professional-heading"
            title="Professional background"
          />
          <Card className="premium-card-interactive">
            <p className="text-[var(--color-text-secondary)]">{about.profile.professionalSummary}</p>
          </Card>
        </section>
      ) : null}

      <section aria-labelledby="research-background-heading">
        <SectionHeader
          description="Bacterial physiology at Emory University and retinal developmental biology at KAIST."
          headingId="research-background-heading"
          title="Research background"
        />
        <div className="flex flex-col gap-4">
          {about.researchFocus.map((item) => (
            <Card as="article" className="premium-card-interactive" key={item.id}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-[var(--color-text-secondary)]">{item.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${item.title} areas`}>
                {item.areas.map((area) => (
                  <li key={area}>
                    <Badge>{area}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {about.profile.aiComputingSummary ? (
        <section aria-labelledby="ai-computing-heading">
          <SectionHeader
            description="Frontier-model evaluation, benchmark design, scientific reasoning, and AI-assisted software workflows."
            headingId="ai-computing-heading"
            title="AI model evaluation and computing"
          />
          <Card className="premium-card-interactive">
            <p className="text-[var(--color-text-secondary)]">{about.profile.aiComputingSummary}</p>
          </Card>
        </section>
      ) : null}

      <section aria-labelledby="education-heading">
        <SectionHeader headingId="education-heading" title="Education" />
        <div className="flex flex-col gap-4">
          {about.education.map((item) => (
            <Card as="article" className="premium-card-interactive" key={item.id}>
              <h3 className="text-lg font-semibold">
                {item.degree} in {item.field}
              </h3>
              {item.institution ? (
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{item.institution}</p>
              ) : null}
              {item.dateLabel ? (
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.dateLabel}</p>
              ) : null}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
