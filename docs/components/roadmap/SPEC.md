# Roadmap Components Specification

## Purpose

Render structured roadmap data as an accessible product strategy dashboard.

## Responsibilities

- `RoadmapShowcase` owns the full heading, summary, update label, and timeline composition.
- `RoadmapTimeline` renders ordered lanes and phases.
- `RoadmapPhaseCard` and `RoadmapMilestoneList` render nested roadmap detail.
- `RoadmapStatusBadge` communicates all six statuses with text.
- `RoadmapProgressRail` is decorative only.
- `RoadmapPreview` derives compact shipped/current/planned summaries from adapter output.

## Rules

- Content comes only from `src/content/roadmaps.ts`.
- Components consume typed props and M2 semantic tokens.
- Mobile layout is vertical and must not overflow.
- Empty links and milestones degrade cleanly.

M7 renders one optional preview with a polished missing-data fallback and no copied milestones.

M12 adds a layered strategy header, premium interactive phase cards, and a restrained
violet-to-neutral progress rail while preserving textual status and roadmap data ownership.
