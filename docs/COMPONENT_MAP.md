# Component Map

## M1 route composition

| Area | Components | Data source |
| --- | --- | --- |
| Root shell | `SiteShell`, `Header`, `PageContainer`, `Footer` | `getProfile()`, `getNavigationLinks()`, `getFooterLinks()` |
| Homepage | `HomeHero`, `Card`, `LinkButton` | `getProfile()`, `getPrimaryLinks()` |
| Planned routes | `PlannedPage`, `Card`, `SectionHeader` | Route-local placeholder title only |
| Not found | `src/app/not-found.tsx` | Static recovery copy |
| Theme runtime | `ThemeScript`, `ThemeProvider`, `ThemeToggle` | Browser storage and system color preference |
| Selected work | `ProjectCard`, `ProjectGrid`, `ProjectLinkList` | Project adapters backed by `src/content/projects.ts` |
| Homepage work preview | `FeaturedWorkSection` | Implemented but intentionally not wired into the M1-only homepage |
| my-dev-kit Ecosystem | `ProductFamilyHero`, `EcosystemDiagram`, `EcosystemModuleCard` | Product-family adapters backed by `src/content/products.ts` |
| Ecosystem roadmap | `RoadmapShowcase`, `RoadmapTimeline`, `RoadmapPhaseCard`, `RoadmapMilestoneList`, `RoadmapStatusBadge`, `RoadmapUpdatedLabel`, `RoadmapProgressRail` | Roadmap adapters backed by `src/content/roadmaps.ts` |
| Compact roadmap | `RoadmapPreview`, `SelectedRoadmapsSection` | Implemented, not yet wired into homepage composition |
| Product Lab Index | `ProductGrid`, `ProductCard`, `RoadmapPreview` | Product index view model plus roadmap adapter preview |
| About and Publications | `PublicationCard`, `PublicationList`, About sections | Profile, publication, resume, and link adapters |
| Gallery and Media | `GalleryPreviewSection`, `GalleryGrid`, `MediaCard`, `ProjectScreenshot`, `GalleryEmptyState` | Gallery placement view model backed by `src/content/gallery.ts` |
| Writing | `WritingCard`, `WritingEmptyState` | Writing index backed by `src/content/writing.ts` |
| Contact | `ContactPanel`, `ContactCard` | Profile, contact copy, and existing link adapters |
| SEO and discovery | `JsonLd`, metadata builders, sitemap, robots | Route registry plus local content |
| Premium visual layer | `Card`, `SectionHeader`, shell, hero, feature cards | Semantic tokens and reusable CSS utilities |

## M7 homepage composition

`src/app/page.tsx` obtains one `HomepageViewModel` and passes its data to `HomeHero`,
`FeaturedWorkSection`, `ProductLabSection`, `SelectedRoadmapsSection`, `TechnicalFocusSection`,
`PublicationsPreviewSection`, and `ContactCTASection`. The sections are prop-driven; structured
records remain owned by local content modules.

## Ownership rules

- UI primitives remain content-agnostic.
- Feature components receive structured content through props.
- Route files compose adapters and components.
- Later-feature components may exist as scaffold files but remain outside active route composition.

## Next update

Add M5 roadmap rendering without duplicating product-family or selected-work content.
