import type { StructuredDataNode } from '@/types/seo';
import { serializeJsonLd } from '@/lib/seo/structured-data';

export default function JsonLd({ data }: { data: StructuredDataNode }) {
  return <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} type="application/ld+json" />;
}
