import PublicationList from '@/components/publications/PublicationList';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import LinkButton from '@/components/ui/LinkButton';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  getAboutProfile,
  getLinks,
  getPublicationSummary,
  getResumeLink,
  getResumeMetadata,
} from '@/lib/content';
import { routes } from '@/lib/routes';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(routeMetadata.about);

export default function AboutPage() {
  const about = getAboutProfile();
  const publicationSummary = getPublicationSummary();
  const resume = getResumeMetadata();
  const resumeLink = getResumeLink();
  const contactLinks = getLinks().filter((link) =>
    [routes.work, routes.products, routes.contact].some((href) => href === link.href),
  );

  return (
    <div className="space-y-16 py-10 sm:py-16 lg:space-y-20">
      <section aria-labelledby="about-heading">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-violet)]">About</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl" id="about-heading">
          Software builder with a research foundation
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-[var(--color-text-secondary)]">
          {about.profile.summary} {about.profile.subheadline}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Professional roles">
          {about.profile.primaryRoleLabels.map((role) => <li key={role}><Badge>{role}</Badge></li>)}
        </ul>
      </section>

      <section aria-labelledby="technical-focus-heading">
        <SectionHeader description="Product-building capability comes first: focused systems, useful interfaces, and maintainable engineering." headingId="technical-focus-heading" title="Technical focus" />
        <div className="grid gap-4 md:grid-cols-3">
          {about.technicalFocus.map((item) => (
            <Card as="article" className="premium-card-interactive" key={item.id}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-[var(--color-text-secondary)]">{item.summary}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="research-background-heading">
        <SectionHeader description="Scientific training supports the software practice through evidence, reproducibility, and careful treatment of uncertainty." headingId="research-background-heading" title="Research and scientific background" />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          {about.researchFocus.map((item) => (
            <Card as="article" className="premium-card-interactive" key={item.id}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-[var(--color-text-secondary)]">{item.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${item.title} areas`}>
                {item.areas.map((area) => <li key={area}><Badge>{area}</Badge></li>)}
              </ul>
            </Card>
          ))}
          {about.education.map((item) => (
            <Card as="article" className="premium-card-interactive" key={item.id}>
              <p className="text-sm font-medium text-[var(--color-accent-cyan)]">Education</p>
              <h3 className="mt-2 text-lg font-semibold">{item.degree} · {item.field}</h3>
              {item.institution ? <p className="mt-1 text-sm">{item.institution}</p> : null}
              {item.summary ? <p className="mt-3 text-[var(--color-text-secondary)]">{item.summary}</p> : null}
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="publications-heading">
        <SectionHeader description="Only verified local records are rendered; uncertain citation metadata is intentionally omitted." headingId="publications-heading" title="Publications" />
        <PublicationList publications={publicationSummary.publications} />
      </section>

      <section aria-labelledby="connect-heading">
        <SectionHeader description="Review selected work, explore the product lab, or use the contact route to start a conversation." headingId="connect-heading" title="Resume and contact" />
        <Card>
          <div className="flex flex-wrap gap-3">
            {resumeLink ? <LinkButton href={resumeLink.href} label={`Open ${resume.label}`} /> : null}
            {contactLinks.map((link) => (
              <LinkButton href={link.href} key={link.id} label={link.label} external={link.external} />
            ))}
          </div>
          {!resume.available ? <p className="mt-4 text-sm text-[var(--color-text-secondary)]">{resume.description}</p> : null}
        </Card>
      </section>
    </div>
  );
}
