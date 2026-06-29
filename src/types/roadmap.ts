export type RoadmapStatus = 'shipped' | 'active' | 'planned' | 'exploring' | 'paused' | 'deferred';
export type RoadmapPriority = 'now' | 'next' | 'later';
export type RoadmapLinkKind = 'documentation' | 'repository' | 'package';

export interface RoadmapLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly kind: RoadmapLinkKind;
  readonly external: boolean;
}

export interface RoadmapMilestone {
  readonly id: string;
  readonly title: string;
  readonly status: RoadmapStatus;
  readonly summary: string;
  readonly links: readonly RoadmapLink[];
  readonly displayPriority: number;
}

export interface RoadmapPhase {
  readonly id: string;
  readonly title: string;
  readonly status: RoadmapStatus;
  readonly timeframe: string;
  readonly priority: RoadmapPriority;
  readonly summary: string;
  readonly milestones: readonly RoadmapMilestone[];
  readonly displayPriority: number;
}

export interface RoadmapLane {
  readonly id: string;
  readonly title: string;
  readonly roleLabel: string;
  readonly summary: string;
  readonly moduleSlug: string;
  readonly status: RoadmapStatus;
  readonly phases: readonly RoadmapPhase[];
  readonly displayPriority: number;
}

export interface Roadmap {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly productSlug: string;
  readonly summary: string;
  readonly status: RoadmapStatus;
  readonly updatedAt: string;
  readonly lanes: readonly RoadmapLane[];
  readonly featured: boolean;
  readonly displayPriority: number;
}

export interface RoadmapPreviewViewModel {
  readonly roadmap: Roadmap;
  readonly recentlyShipped: readonly RoadmapMilestone[];
  readonly currentFocus: readonly RoadmapMilestone[];
  readonly nextPlanned: readonly RoadmapMilestone[];
}

export type RoadmapRecord = Roadmap;
