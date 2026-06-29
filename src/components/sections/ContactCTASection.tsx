import Card from '@/components/ui/Card';
import LinkButton from '@/components/ui/LinkButton';
import type { SiteLink } from '@/types/content';
import type { HomeSectionCopy } from '@/types/home';

export default function ContactCTASection({ copy, links }: { copy: HomeSectionCopy; links: readonly SiteLink[] }) {
  return <section aria-labelledby="contact-cta-heading" className="section-shell">
    <Card className="hero-backdrop relative overflow-hidden rounded-[var(--radius-panel)] border-[var(--color-accent-violet)] p-7 sm:p-12">
      <div aria-hidden="true" className="quiet-grid pointer-events-none absolute inset-0" />
      <div className="relative">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-cyan)]">{copy.eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight" id="contact-cta-heading">{copy.heading}</h2>
      <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">{copy.summary}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        {links.map((link, index) => <LinkButton emphasis={index === links.length - 1 ? 'primary' : 'secondary'} external={link.external} href={link.href} key={link.id} label={link.label} />)}
      </div>
      </div>
    </Card>
  </section>;
}
