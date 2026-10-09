# Component Registry

| Component | Area | Status | Responsibility |
| --- | --- | --- | --- |
| `SiteShell` | layout | implemented | Composes header, main container, and footer with adapter data |
| `Header` | layout | implemented | Renders brand, primary navigation, and theme control |
| `Footer` | layout | implemented | Renders attribution and footer navigation |
| `MobileNav` | layout | removed (Stage 2E) | Historical placeholder; current responsive navigation is owned by `Header` and `NavLink` |
| `PageContainer` | layout | implemented | Applies shared responsive page bounds |
| `Container` | UI | implemented | Generic responsive width primitive |
| `Card` | UI | implemented | Tokenized solid bordered surface |
| `LinkButton` | UI | implemented | Tokenized accessible internal/external CTA |
| `SectionHeader` | UI | implemented | Typed section heading and description |
| `Button` | UI | removed (Stage 2E) | Historical native-button wrapper; controls remain native buttons in their owning components |
| `VisuallyHidden` | UI | removed (Stage 2E) | Historical `sr-only` wrapper; current accessible markup uses the existing utility directly |
| `HomeHero` | section | implemented | Renders profile and CTA props |
| `PlannedPage` | section | removed (Stage 2E) | Historical route placeholder; the App Router owns current pages and `not-found` handles unmatched paths |
| `ThemeScript` | theme | implemented | Applies persisted palette and mode before visible paint (`theme-script.tsx`) |
| `ThemeProvider` | theme | implemented | Owns palette and mode preference, effective theme, persistence, and system updates |
| `AppearanceControl` | theme | implemented | Header dialog with palette and color mode radio groups |
| `ProjectCard` | selected work | implemented | Renders one project’s typed summary, status, role, stack, and links |
| `ProjectGrid` | selected work | implemented | Renders featured/standard responsive project collections and empty state |
| `ProjectLinkList` | selected work | implemented | Renders optional safe project links |
| `FeaturedWorkSection` | selected work | implemented | Compact featured preview; rendered by the homepage (see the homepage row below) |
| `ProductFamilyHero` | ecosystem | implemented | Renders family positioning, maturity, audience, and links |
| `EcosystemDiagram` | ecosystem | removed (Stage 2C) | Former three-module diagram source; superseded by `ProductArchitectureVisual`; implementation retained in Git history |
| `EcosystemModuleCard` | ecosystem | removed (Stage 2C) | Former module card source; superseded by `ProductArchitectureVisual`; implementation retained in Git history |
| `RoadmapShowcase` | roadmap | removed | Full strategy dashboard chain removed when `/projects/my-dev-kit` moved to per-module timelines |
| `RoadmapTimeline` | roadmap | implemented (live) | Ordered Recent/Current/Next release snapshot in `src/components/projects`; styled by shared `.diagram-timeline*` classes in `src/styles/diagrams.css` |
| `RoadmapPhaseCard` | roadmap | removed | Removed with the full roadmap display chain |
| `RoadmapMilestoneList` | roadmap | removed | Removed with the full roadmap display chain |
| `RoadmapStatusBadge` | roadmap | removed | Removed with the full roadmap display chain |
| `RoadmapUpdatedLabel` | roadmap | implemented (live) | Formats the roadmap update date inside live `RoadmapPreview` |
| `RoadmapProgressRail` | roadmap | removed | Removed with the full roadmap display chain |
| `RoadmapPreview` | roadmap | implemented (live) | Compact derived roadmap summary, reachable through `ProductCard` on `/projects` |
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
| `MediaCard` | gallery | test-only | Gallery rendering graph, exercised through component tests; no live route imports it |
| `ProjectScreenshot` | gallery | test-only | Screenshot rendering is exercised by the gallery component test; no live route imports it |
| `GalleryGrid` | gallery | test-only | Imported by gallery section and exercised by component tests; no live route importer |
| `GalleryEmptyState` | gallery | test-only | Empty-state child of `GalleryGrid`; exercised through gallery component rendering |
| `GalleryPreviewSection` | work | test-only | Imported by `tests/content/gallery-components.test.tsx`; no route imports it |

| `WritingCard` | writing | test-only | Rendered by `tests/content/writing-contact-components.test.tsx`; no live route importer |
| `WritingEmptyState` | writing | test-only | Rendered by `tests/content/writing-contact-components.test.tsx`; no live route importer |
| `ContactCard` | contact | test-only | Imported by component test and historical `ContactPanel`; `/contact` uses `ContactForm` |
| `ContactPanel` | contact | test-only | Imported by component test; historical no-form layout, not current `/contact` |

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

Reachability in this registry is not deletion permission. The four components marked removed in
Stage 2E are absent from current source; their historical implementation remains in Git history.
`GalleryPreviewSection`, gallery children, writing cards, and contact channel cards are test-only.
The live contact form and current ecosystem diagram are separate implementations.

M12 refined cards, controls, section headers, shell, homepage, roadmap, and empty states without
changing component APIs. Responsive/accessibility and release hardening were completed in M13/M14;
see `docs/PROJECT_PLAN.md` and `docs/dev_logging.md` for milestone evidence.
