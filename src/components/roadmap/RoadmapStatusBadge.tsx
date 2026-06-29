import Badge from '@/components/ui/Badge';
import type { RoadmapStatus } from '@/types/roadmap';

const labels: Record<RoadmapStatus, string> = {
  shipped: 'Shipped', active: 'Active', planned: 'Planned', exploring: 'Exploring',
  paused: 'Paused', deferred: 'Deferred',
};
export default function RoadmapStatusBadge({ status }: { status: RoadmapStatus }) {
  return <Badge>Status: {labels[status]}</Badge>;
}
