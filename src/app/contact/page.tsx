import ContactPanel from '@/components/contact/ContactPanel';
import SectionHeader from '@/components/ui/SectionHeader';
import { getContactPanel, getProfile } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(routeMetadata.contact);

export default function ContactPage() {
  const profile = getProfile();
  const panel = getContactPanel();
  return (
    <div className="space-y-10 py-10 sm:py-16">
      <section aria-labelledby="contact-heading">
        <SectionHeader
          description={`${profile.name} builds developer tools, applied AI systems, and scientific software. Use the pathways below for project and product context.`}
          headingId="contact-heading"
          level={1}
          title="Contact"
        />
      </section>
      <ContactPanel panel={panel} />
    </div>
  );
}
