# Component Map

This maps each component directory to what it owns and whether it is currently wired into a live
route. "Live" means imported (directly or transitively) by a page under `src/app`; "orphaned"
means the file exists but nothing in `src/app` currently imports it.

## Layout components (`src/components/layout`)

| Component | Owns | Status |
|---|---|---|
| `SiteShell.tsx` | Page shell: skip link, background glow, `Header`, `main` landmark, `Footer` | Live |
| `Header.tsx` | Sticky header: brand link + `SiteLogoMark`, primary nav, theme toggle | Live |
| `Footer.tsx` | Footer nav and copyright | Live |
| `NavLink.tsx` | Client component nav link with `aria-current="page"` | Live |
| `SiteLogoMark.tsx` | Theme-aware stacked "DL" monogram SVG (navbar + reusable) | Live |
| `PageContainer.tsx` | Shared max-width/padding wrapper for route content | Live |
| `MobileNav.tsx` | — | **Orphaned** (not imported by any route; `Header` handles all breakpoints via responsive classes) |

## Homepage sections (`src/components/sections`)

| Component | Owns | Status |
|---|---|---|
| `HomeHero.tsx` | Hero: business name, positioning, primary CTAs | Live |
| `FeaturedWorkSection.tsx` | Featured product/project cards + "View all projects" | Live |
| `TechnicalFocusSection.tsx` | Technical focus capability cards | Live |
| `BackgroundSection.tsx` | "Background and expertise" cards (Biological Sciences, About Dai Le) | Live |
| `GalleryPreviewSection.tsx`, `PlannedPage.tsx` | — | **Orphaned** (pre-date the current homepage composition) |

## Project components (`src/components/projects`)

| Component | Owns | Status |
|---|---|---|
| `ProjectCard.tsx` | Project card: status, focus label, description, notes, role, tags (`showTags` prop), links | Live (Archived projects section) |
| `ProjectGrid.tsx` | Grid layout for `ProjectCard`, `quiet`/`showTags` pass-through | Live |
| `ProjectLinkList.tsx` | External/internal link list for a project card | Live |
| `ProductArchitectureVisual.tsx` | **The my-dev-kit relationship diagram** — vertical panel layout for the three modules, packet/connector visuals | Live (`/projects/my-dev-kit`) |
| `ProductLinks.tsx` | GitHub + npm link row inside each product panel | Live |
| `RoadmapTimeline.tsx` | Compact ascending version-history timeline inside a product panel's Roadmap section | Live |
| `RoadmapToggle.tsx` | Client component: accessible collapsible "Roadmap" button (`aria-expanded`/`aria-controls`) | Live |

## Product/index components (`src/components/products`)

| Component | Owns | Status |
|---|---|---|
| `ProductCard.tsx` | Product/product-family index card (`showBadges`/`showLinks` props) | Live (`/projects`, homepage) |
| `ProductGrid.tsx` | Featured/standard product index sections | Live (`/projects`) |
| `ProductFamilyHero.tsx` | my-dev-kit Ecosystem hero on the detail page | Live (`/projects/my-dev-kit`) |
| `EcosystemDiagram.tsx`, `EcosystemModuleCard.tsx` | — | **Orphaned** (superseded by `ProductArchitectureVisual` in `components/projects`) |

## Publications components (`src/components/publications`)

| Component | Owns | Status |
|---|---|---|
| `PublicationCard.tsx` | Title/DOI link, author highlighting, venue, collapsible abstract, collapsible BibTeX, tags | Live |
| `PublicationList.tsx` | List/empty-state wrapper for publication cards | Live |

## Contact components (`src/components/contact`)

| Component | Owns | Status |
|---|---|---|
| `ContactForm.tsx` | Client form: fields, client validation, `POST /api/contact`, success/error state | Live |
| `ContactCard.tsx` | Single contact-channel card (kind-labeled) | Live (used where `ContactChannel` records are rendered) |
| `ContactPanel.tsx` | — | **Orphaned** (legacy channel-panel layout; contact page now renders `ContactForm` directly) |

## Roadmap components (`src/components/roadmap`)

| Component | Owns | Status |
|---|---|---|
| `RoadmapPreview.tsx` | Compact shipped/current/next preview card, used inside `ProductCard`'s optional roadmap slot | Live |
| `RoadmapUpdatedLabel.tsx` | "Updated {date}" label | Live |

Note: the previous full-page phase/lane/milestone roadmap display chain (`RoadmapShowcase`,
`RoadmapTimeline`, `RoadmapPhaseCard`, `RoadmapMilestoneList`, `RoadmapStatusBadge`,
`RoadmapProgressRail`) was removed when `/projects/my-dev-kit` moved to per-module collapsible
version timelines; the underlying `src/content/roadmaps.ts` data and its adapters remain in use
for `getRoadmapPreview()`.

## Gallery and writing components

`src/components/gallery/*` and `src/components/writing/*` are **entirely orphaned** — no current
route imports `src/content/gallery.ts`, `src/content/writing.ts`, or these components. They are
retained in the repository but do not back any live page.

## Shared UI primitives (`src/components/ui`)

| Component | Owns | Status |
|---|---|---|
| `Card.tsx` | Base premium-card surface (`as` polymorphic element) | Live |
| `Badge.tsx` | Pill-shaped status/tag label | Live |
| `LinkButton.tsx` | Primary/secondary emphasis CTA link | Live |
| `SectionHeader.tsx` | Heading + optional description for a page section | Live |
| `Container.tsx` | Max-width content wrapper (distinct from `layout/PageContainer.tsx`) | Live |
| `Button.tsx`, `VisuallyHidden.tsx` | — | **Orphaned** |

## Theme components (`src/components/theme`)

| Component | Owns | Status |
|---|---|---|
| `ThemeProvider.tsx` | Applies/persists light/dark/system theme | Live |
| `ThemeToggle.tsx` | Accessible theme control button in the header | Live |
| `theme-script.tsx` | Inline pre-hydration script to avoid theme flash | Live |

## SEO helpers (`src/lib/seo`, plus `src/components/seo`)

| File | Owns |
|---|---|
| `src/lib/seo/metadata.ts` | `routeMetadata`, `buildPageMetadata`, page title/description builders |
| `src/lib/seo/open-graph.ts` | Open Graph image list builder |
| `src/lib/seo/site-url.ts` | `createAbsoluteUrl`, site URL resolution from `NEXT_PUBLIC_SITE_URL` |
| `src/lib/seo/structured-data.ts` | JSON-LD builders (`Person`, `WebSite`, `CollectionPage`) |
| `src/components/seo/JsonLd.tsx` | Renders a JSON-LD `<script>` tag from a structured-data object |

## Cleanup note

The orphaned components/content listed above are not deleted by this documentation pass (that is
a separate cleanup task, not "small obvious" doc-adjacent fix). They are flagged here so future
work does not mistake them for the live implementation.
