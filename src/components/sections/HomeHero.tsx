import Card from '@/components/ui/Card';
import LinkButton from '@/components/ui/LinkButton';
import type { CtaLink, ProfileContent } from '@/types/content';
import type { HomeSectionCopy } from '@/types/home';

export default function HomeHero({
  profile,
  primaryLinks,
  copy,
}: {
  profile: ProfileContent;
  primaryLinks: readonly CtaLink[];
  copy: HomeSectionCopy;
}) {
  return (
    <section aria-labelledby="home-heading" className="pb-16 pt-10 sm:pb-24 sm:pt-16">
      <Card className="hero-backdrop relative overflow-hidden rounded-[var(--radius-panel)] p-7 sm:p-12 lg:p-16">
        <div aria-hidden="true" className="quiet-grid pointer-events-none absolute inset-0" />
        <div className="relative max-w-4xl">
          <p className="eyebrow flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-primary-text)]">
            <span aria-hidden="true" className="h-px w-10 bg-[var(--color-accent-secondary)]" />
            {copy.eyebrow}
          </p>
          <h1 id="home-heading" className="mt-5 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
            {profile.business?.name ?? profile.name}
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-medium leading-snug sm:text-2xl">{copy.heading}</p>
          <p className="mt-4 max-w-3xl text-lg text-[var(--color-text-secondary)]">
            Founded and operated by {profile.name} - {profile.headline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryLinks.map((link, index) => (
              <LinkButton
                key={link.id}
                emphasis={index === 0 ? 'primary' : 'secondary'}
                external={link.external}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
