# Component Registry

| Component | Area | Status | Responsibility |
| --- | --- | --- | --- |
| `SiteShell` | layout | implemented | Composes header, main container, and footer with adapter data |
| `Header` | layout | implemented | Renders brand, primary navigation, and theme control |
| `Footer` | layout | implemented | Renders attribution and footer navigation |
| `PageContainer` | layout | implemented | Applies shared responsive page bounds |
| `Container` | UI | implemented | Generic responsive width primitive |
| `Card` | UI | implemented | Tokenized solid bordered surface |
| `LinkButton` | UI | implemented | Tokenized accessible internal/external CTA |
| `SectionHeader` | UI | implemented | Typed section heading and description |
| `HomeHero` | section | implemented | Renders profile and CTA props |
| `PlannedPage` | section | orphaned | Marks routes reserved for later milestones; not imported by any route |
| `ThemeScript` | theme | implemented | Applies persisted/system theme before visible paint (`theme-script.tsx`) |
| `ThemeProvider` | theme | implemented | Owns preference, effective theme, persistence, and system updates |
| `ThemeToggle` | theme | implemented | Cycles system, light, and dark with accessible state text |
| `ProjectCard` | selected work | implemented | Renders one project’s typed summary, status, role, stack, and links |
| `ProjectGrid` | selected work | implemented | Renders featured/standard responsive project collections and empty state |
| `ProjectLinkList` | selected work | implemented | Renders optional safe project links |
| `FeaturedWorkSection` | selected work | implemented | Compact featured preview; rendered by the homepage (see the homepage row below) |
| `ProductFamilyHero` | ecosystem | implemented | Renders family positioning, maturity, audience, and links |
| `EcosystemDiagram` | ecosystem | orphaned | Superseded by `ProductArchitectureVisual`; no live importer |
| `EcosystemModuleCard` | ecosystem | orphaned | Superseded by `ProductArchitectureVisual`; no live importer |
| `RoadmapShowcase` | roadmap | removed | Full strategy dashboard chain removed when `/projects/my-dev-kit` moved to per-module timelines |
| `RoadmapTimeline` | roadmap | implemented (live) | Ordered Recent/Current/Next release snapshot in `src/components/projects`; styled by shared `.diagram-timeline*` classes in `src/styles/diagrams.css` |
| `RoadmapPhaseCard` | roadmap | removed | Removed with the full roadmap display chain |
| `RoadmapMilestoneList` | roadmap | removed | Removed with the full roadmap display chain |
| `RoadmapStatusBadge` | roadmap | removed | Removed with the full roadmap display chain |
| `RoadmapUpdatedLabel` | roadmap | implemented | Formats the roadmap update date deterministically; no live route importer |
| `RoadmapProgressRail` | roadmap | removed | Removed with the full roadmap display chain |
| `RoadmapPreview` | roadmap | implemented | Compact derived roadmap summary; only reachable through `ProductCard`’s optional roadmap slot |
| `ProductCard` | product index | implemented | Renders product identity, maturity, links, and optional roadmap preview |
| `ProductGrid` | product index | implemented | Separates featured and secondary product cards responsively |
| `FeaturedWorkSection` | homepage | implemented | Renders the bounded selected-work preview |
| `ProductLabSection` | homepage | removed | No source file in the current repository |
| `SelectedRoadmapsSection` | homepage | removed | No source file in the current repository |
| `TechnicalFocusSection` | homepage | implemented | Renders structured capability summaries |
| `PublicationsPreviewSection` | homepage | removed | No source file in the current repository |
| `ContactCTASection` | homepage | removed | No source file in the current repository |
| `PublicationCard` | publications | implemented | Renders one verified publication with optional metadata |
| `PublicationList` | publications | implemented | Renders verified records or an honest empty state |
| `MediaCard` | gallery | orphaned | Renders optimized media with accessible metadata; no live route imports the gallery components |
| `ProjectScreenshot` | gallery | orphaned | Renders screenshot variants; no live route imports the gallery components |
| `GalleryGrid` | gallery | orphaned | Renders responsive records or the empty state; no live route imports the gallery components |
| `GalleryEmptyState` | gallery | orphaned | Explains unavailable media without fake assets; no live route imports the gallery components |
| `GalleryPreviewSection` | work | orphaned | Integrates placement-filtered media; not imported by any route |

| `WritingCard` | writing | orphaned | Renders verified published writing metadata; no live route imports the writing components |
| `WritingEmptyState` | writing | orphaned | Renders useful pathways when writing is empty; no live route imports the writing components |
| `ContactCard` | contact | orphaned | Renders one derived contact pathway; currently imported only by the orphaned `ContactPanel` |
| `ContactPanel` | contact | orphaned | Legacy channel-panel layout; the contact page renders `ContactForm` directly |

| `ProductArchitectureVisual` | ecosystem | implemented (live) | Live four-product ecosystem diagram on `/projects/my-dev-kit`; owns vertical evidence/workflow/Observer path, external source-editing actor, Observer correction loop, and optional Lab assurance lane. Orchestrator does not run agents/tools; Observer never edits source; Lab is optional. |
| `ProductLinks` | ecosystem | implemented (live) | GitHub and npm link row inside each product panel |
| `RoadmapToggle` | ecosystem | implemented (live) | Accessible collapsible Release snapshot disclosure around `RoadmapTimeline` |
| `DiagramCanvas` | diagrams | implemented (live) | Shared diagram surface (`src/components/diagrams`) |
| `DiagramNode` | diagrams | implemented (live) | Shared primary / secondary / artifact node roles |
| `DiagramConnectorPath` | diagrams | implemented (live) | Shared SVG connector path styling; coordinates stay with the caller |
| `DiagramArrowMarker` | diagrams | implemented (live) | Shared arrowhead marker |
| `DiagramLabel` | diagrams | implemented (live) | Shared connector label surface |
| `DiagramSummary` | diagrams | implemented (live) | Shared visually hidden accessible summary |

| `JsonLd` | SEO | implemented | Safely serializes local structured-data nodes |

Status reconciled against `docs/COMPONENT_MAP.md` and current imports after diagram centralization. Diagram styling is owned by `src/styles/diagrams.css`; see `docs/DIAGRAM_DESIGN.md`.

M12 refined cards, controls, section headers, shell, homepage, roadmap, and empty states without
changing component APIs. Responsive/accessibility and release hardening remain later milestones.
