import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

export default function PlannedPage({ title }: { title: string }) {
  return (
    <section className="py-12 sm:py-16">
      <Card>
        <SectionHeader
          description="This route is part of the website shell. Its full feature content is planned for a later milestone."
          level={1}
          title={title}
        />
      </Card>
    </section>
  );
}
