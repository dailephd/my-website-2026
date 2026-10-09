# Component Map

This maps each component directory to ownership and current reachability. "Live" means imported
(directly or transitively) by a page under `src/app`; "test-only" means referenced by tests but
not by a live route; "historical/orphaned" means retained source with no live route consumer.
Removed components are identified as historical records, not current source. These classifications
are evidence, not deletion approvals. Test importers and retained plans are listed where relevant.

## Layout components (`src/components/layout`)

| Component | Owns | Status |
|---|---|---|
| `SiteShell.tsx` | Page shell: skip link, `Header`, `main` landmark, `Footer` | Live |
| `Header.tsx` | Sticky header: brand link + `SiteLogoMark`, primary nav, Appearance control | Live |
| `Footer.tsx` | Footer nav and copyright | Live |
| `NavLink.tsx` | Client component nav link with `aria-current="page"` | Live |
| `SiteLogoMark.tsx` | Theme-aware stacked "DL" monogram SVG (navbar + reusable) | Live |
| `PageContainer.tsx` | Shared max-width/padding wrapper for route content | Live |

`MobileNav.tsx` was removed in Stage 2E. Current responsive navigation is owned by `Header.tsx`
and `NavLink.tsx`; the earlier placeholder remains only in Git history and historical plans.

## Homepage sections (`src/components/sections`)

| Component | Owns | Status |
|---|---|---|
| `HomeHero.tsx` | Hero: business name, positioning, primary CTAs | Live |
| `FeaturedWorkSection.tsx` | Featured product/project cards + "View all projects" | Live |
| `TechnicalFocusSection.tsx` | Technical focus capability cards | Live |
| `BackgroundSection.tsx` | "Background and expertise" cards (Biological Sciences, About Dai Le) | Live |
| `GalleryPreviewSection.tsx` | Gallery preview section | **Test-only** (rendered by `tests/content/gallery-components.test.tsx`; no live route imports it) |

`PlannedPage.tsx` was removed in Stage 2E. Current route rendering belongs to the App Router, with
`src/app/not-found.tsx` handling unmatched paths. The earlier placeholder remains only in history.

## Project components (`src/components/projects`)

| Component | Owns | Status |
|---|---|---|
| `ProjectCard.tsx` | Project card: status, focus label, description, notes, role, tags (`showTags` prop), links | Live (Archived projects section) |
| `ProjectGrid.tsx` | Grid layout for `ProjectCard`, `quiet`/`showTags` pass-through | Live |
| `ProjectLinkList.tsx` | External/internal link list for a project card | Live |
| `ProductArchitectureVisual.tsx` | **The my-dev-kit relationship diagram** — four products around a vertical core workflow, bounded repository evidence, external implementation actor, Observer correction loop, and optional Lab assurance lane; owns local topology and composes shared `components/diagrams` primitives | Live (`/projects/my-dev-kit`) |
| `ProductLinks.tsx` | GitHub + npm link row inside each product panel | Live |
| `RoadmapTimeline.tsx` | Bounded Recent/Current/Next release snapshot inside each product panel; consumes shared `.diagram-timeline*` styles from `src/styles/diagrams.css` | Live |
| `RoadmapToggle.tsx` | Client component: accessible collapsible "Release snapshot" button (`aria-expanded`/`aria-controls`) | Live |

## Shared diagram primitives (`src/components/diagrams`)

Styled by the central `src/styles/diagrams.css`; topology and content stay with the caller.

| Component | Owns | Status |
|---|---|---|
| `DiagramCanvas.tsx` | Diagram surface (`.diagram-canvas`) | Live (via `ProductArchitectureVisual`) |
| `DiagramNode.tsx` | Primary / secondary / artifact node roles | Live (via `ProductArchitectureVisual`) |
| `DiagramConnectorPath.tsx` | SVG connector path styling (primary / secondary / feedback; data / control) | Live (via `ProductArchitectureVisual`) |
| `DiagramArrowMarker.tsx` | Shared arrowhead marker | Live (via `ProductArchitectureVisual`) |
| `DiagramLabel.tsx` | Connector label surface | Live (via `ProductArchitectureVisual`) |
| `DiagramSummary.tsx` | Visually hidden accessible summary | Live (via `ProductArchitectureVisual`) |

## Product/index components (`src/components/products`)

| Component | Owns | Status |
|---|---|---|
| `ProductCard.tsx` | Product/product-family index card (`showBadges`/`showLinks` props) | Live (`/projects`, homepage) |
| `ProductGrid.tsx` | Featured/standard product index sections | Live (`/projects`) |
| `ProductFamilyHero.tsx` | my-dev-kit Ecosystem hero on the detail page | Live (`/projects/my-dev-kit`) |
| `ProductArchitectureVisual.tsx` (in `src/components/projects`) | Current four-product ecosystem diagram and module panels | **Live** (`/projects/my-dev-kit`); sole current architecture visual owner |

The former `EcosystemDiagram.tsx` and `EcosystemModuleCard.tsx` source files were removed
after reference and reachability checks in Stage 2C. Their earlier implementation is retained
in Git history and in the explicitly historical product-card specification/milestone record.

## Publications components (`src/components/publications`)

| Component | Owns | Status |
|---|---|---|
| `PublicationCard.tsx` | Title/DOI link, author highlighting, venue, collapsible abstract, collapsible BibTeX, tags | Live |
| `PublicationList.tsx` | List/empty-state wrapper for publication cards | Live |

## Contact components (`src/components/contact`)

| Component | Owns | Status |
|---|---|---|
| `ContactForm.tsx` | Client form: fields, client validation, `POST /api/contact`, success/error state | Live |
| `ContactCard.tsx` | Earlier channel card | **Test-only** (imported by `tests/content/writing-contact-components.test.tsx`; consumed in source by historical `ContactPanel`) |
| `ContactPanel.tsx` | Earlier channel-panel layout without a form | **Test-only** (imported by `tests/content/writing-contact-components.test.tsx`; `/contact` renders `ContactForm` directly) |

## Roadmap components (`src/components/roadmap`)

| Component | Owns | Status |
|---|---|---|
| `RoadmapPreview.tsx` | Compact shipped/current/next preview card, used inside `ProductCard`'s optional roadmap slot | Live (reachable from `/projects`) |
| `RoadmapUpdatedLabel.tsx` | "Updated {date}" label inside `RoadmapPreview` | Live (transitive consumer) |

Note: the previous full-page phase/lane/milestone dashboard components (`RoadmapShowcase`,
`RoadmapPhaseCard`, `RoadmapMilestoneList`, `RoadmapStatusBadge`, `RoadmapProgressRail`) are not
part of the current source graph. `RoadmapTimeline` names the current per-product release snapshot
in `src/components/projects/RoadmapTimeline.tsx`. The `src/content/roadmaps.ts` data and adapters
remain in use for the live ProductCard preview.

## Gallery and writing components

Gallery and writing components do not back live routes. Gallery component rendering is exercised
by `tests/content/gallery-components.test.tsx`; writing cards and empty states are exercised by
`tests/content/writing-contact-components.test.tsx`. They remain retained for historical/tested
contracts; tests do not establish production reachability.

## Shared UI primitives (`src/components/ui`)

| Component | Owns | Status |
|---|---|---|
| `Card.tsx` | Base premium-card surface (`as` polymorphic element) | Live |
| `Badge.tsx` | Pill-shaped status/tag label | Live |
| `LinkButton.tsx` | Primary/secondary emphasis CTA link | Live |
| `SectionHeader.tsx` | Heading + optional description for a page section | Live |
| `Container.tsx` | Max-width content wrapper (distinct from `layout/PageContainer.tsx`) | Live |
| Native button controls | Feature-owned native controls; preserve browser keyboard and disabled behavior | Current implementations in owning components |
| `sr-only` utility | Visually hidden accessible text and controls | Existing Tailwind utility used by current components |

`Button.tsx` and `VisuallyHidden.tsx` were removed in Stage 2E. Their historical implementations
remain in Git history. Current controls use native buttons in their owning components; current
screen-reader-only behavior uses existing accessible markup and the `sr-only` utility directly.

## Theme components (`src/components/theme`)

| Component | Owns | Status |
|---|---|---|
| `ThemeProvider.tsx` | Owns palette and light/dark/system mode; applies and persists both | Live |
| `AppearanceControl.tsx` | Header "Appearance" button and dialog (palette and color mode radio groups) | Live |
| `theme-script.tsx` | Inline pre-hydration script that applies palette and mode before first paint | Live |

## SEO helpers (`src/lib/seo`, plus `src/components/seo`)

| File | Owns |
|---|---|
| `src/lib/seo/metadata.ts` | `routeMetadata`, `buildPageMetadata`, page title/description builders |
| `src/lib/seo/open-graph.ts` | Open Graph image list builder |
| `src/lib/seo/site-url.ts` | `createAbsoluteUrl`, site URL resolution from `NEXT_PUBLIC_SITE_URL` |
| `src/lib/seo/structured-data.ts` | JSON-LD builders (`Person`, `WebSite`, `CollectionPage`) |
| `src/components/seo/JsonLd.tsx` | Renders a JSON-LD `<script>` tag from a structured-data object |

## Cleanup note

The Stage 2E removals above do not change public behavior or architecture ownership. Other
historical and test-only components remain classified individually; reachability alone is not
deletion approval.
