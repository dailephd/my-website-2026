import type { ReactNode } from 'react';

import Container from '@/components/ui/Container';

export default function PageContainer({ children }: { children: ReactNode }) {
  return <Container className="relative">{children}</Container>;
}
