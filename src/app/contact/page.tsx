import Card from '@/components/ui/Card';
import ContactForm from '@/components/contact/ContactForm';
import SectionHeader from '@/components/ui/SectionHeader';
import { getContactIntro, getProfileLinks } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(routeMetadata.contact);

export default function ContactPage() {
  const intro = getContactIntro();
  const profileLinks = getProfileLinks();

  return (
    <div className="space-y-10 py-10 sm:py-16">
      <section aria-labelledby="contact-heading">
        <SectionHeader
          description={intro}
          headingId="contact-heading"
          level={1}
          title="Contact"
        />
      </section>

      <section aria-labelledby="contact-form-heading">
        <Card className="premium-card-interactive">
          <h2
            className="mb-6 text-lg font-semibold text-[var(--color-text-primary)]"
            id="contact-form-heading"
          >
            Send a message
          </h2>
          <ContactForm />
        </Card>
      </section>

      {profileLinks.length > 0 ? (
        <section aria-labelledby="profile-links-heading">
          <h2
            className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]"
            id="profile-links-heading"
          >
            Professional profiles
          </h2>
          <div className="flex flex-wrap gap-4">
            {profileLinks.map((link) => (
              <a
                key={link.id}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] transition-colors"
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
