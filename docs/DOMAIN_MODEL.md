# Domain Model

This document describes the current content/domain types under `src/types` and where each is
defined. All content records satisfy these types (`as const satisfies readonly X[]`), and
adapters in `src/lib/content` validate required fields at read time.

## Business / Profile

`ProfileContent` (`src/types/content.ts`) — Dai Le's identity plus the dailephd LLC business
block (`BusinessInfo`: name, description, founder). Includes `technicalFocus`, `researchFocus`,
and `education` arrays used on `/about`. Content: `src/content/profile.ts`.

## Link

`SiteLink` (`src/types/content.ts`) — `id`, `label`, `href`, `kind` (`navigation | cta | social |
email | download`), `external`, `displayPriority`, `locations` (`primary | navigation | footer`).
`CtaLink` and `NavigationLink` are narrowed variants. Content: `src/content/links.ts`. A separate,
simpler `profileLinks` array (`kind: 'github' | 'linkedin'`) lives in `src/content/contact.ts` and
is the source of truth for the GitHub/LinkedIn links shown on `/contact`.

## Project

`Project` (`src/types/project.ts`) — `id`, `slug`, `title`, `summary`, optional `longSummary` and
`notes`, `status` (`active | in-development | maintained | experimental | archived | planned`),
`category`, optional `focusLabel` (overrides the category label for display), `role`, `stack`,
`featured`, `displayPriority`, `links`. Content: `src/content/projects.ts`.

### Archived Project

Not a separate type — an archived project is a `Project` record with `status: 'archived'` and
`featured: false`. `getArchivedProjects()` (`src/lib/content/get-projects.ts`) filters for these
and they render on `/projects` under the "Archived projects" heading via `ProjectGrid`/`ProjectCard`
with `showTags={false}` (tag pills intentionally hidden for archived cards; title, description,
and notes remain visible).

## Product family / my-dev-kit relationship diagram

`ProductFamily` (`src/types/product.ts`) — the my-dev-kit Ecosystem record: `id`, `slug`, `title`,
`summary`, `description`, `status`, `category`, `positioning`, `primaryAudience`, `modules`
(`ProductModule[]`), `links`, `featured`, `displayPriority`, `roadmapPlanned`. Content:
`src/content/products.ts` (`products` array).

`ProductModule` — one of the four ecosystem members (`my-dev-kit`, `my-dev-kit-orchestrator`,
`my-frontend-observer`, `my-dev-kit-lab`): `id`, `slug`, `title`, `roleLabel` (`'Codebase Intelligence' |
'Workflow Orchestration' | 'Runtime Evidence' | 'Validation Lab'`), `layerLabel`, `summary`, `description`, `status`,
`stage`, `stack`, `links` (`ProductLink[]`, one `kind: 'repository'` GitHub entry and one
`kind: 'package'` npm entry per module), and `versionRoadmap` (`ProductVersionEntry[]`: `state`,
`version`, `description` — rendered as an ordered Recent/Current/Next release snapshot inside
each product panel's collapsible Release snapshot section on `/projects/my-dev-kit`).

`ProductIndexItem` — the lighter-weight card record used for the `/projects` listing grid
(`itemType: 'product-family' | 'standalone-product'`). Content: `products.ts` (`productIndex`
array, currently the my-dev-kit family and BioLit).

The relationship among the four modules (rendered by `ProductArchitectureVisual.tsx`) is:

- `my-dev-kit` = bounded static repository evidence
- `my-dev-kit-orchestrator` = staged workflow and lifecycle control without executing agents or tools
- external human or coding agent = target-source editor
- `my-frontend-observer` = rendered browser/runtime evidence and correction input without editing source
- `my-dev-kit-lab` = optional experiments, audits, security validation, and assurance

See `docs/DIAGRAMS.md` for the diagram.

## Roadmap (full structured model)

`Roadmap` (`src/types/roadmap.ts`) — `id`, `slug`, `title`, `shortTitle`, `productSlug`,
`summary`, `status`, `updatedAt`, `lanes` (`RoadmapLane[]`), `featured`, `displayPriority`.
`RoadmapLane` → `RoadmapPhase[]` → `RoadmapMilestone[]`. Content: `src/content/roadmaps.ts`.
This full model backs `getRoadmapPreview()` (used by `ProductCard`'s optional roadmap-preview
slot) and is validated by `validateRoadmaps`; it is a distinct, richer model from the simpler
per-module `versionRoadmap` described above.

## Publication

`Publication` (`src/types/publication.ts`) — `id`, `title`, `authors` (`PublicationAuthor[]`,
each with optional `isProfileOwner`), `year`, `journal`/`venue`, `volume`, `issue`, `pages`,
`doi`, `url`, `abstract`, `bibtex`, `type`, `links` (`PublicationLink[]`), `tags`,
`displayPriority`. Content: `src/content/publications.ts`. Sorted by `getAllPublications()` —
year descending, then `displayPriority` ascending.

## Contact message / contact channel

`ContactChannel` (`src/types/contact.ts`) — `id`, `label`, `href`, `kind` (`email | github |
linkedin | website | resume | product | work | other`), `description`, `external`,
`displayPriority`, `primary`. Currently only partially used — `getContactChannels()` and
`getPrimaryContactChannels()` are legacy adapters kept for backward compatibility and return `[]`
(the contact page now renders `ContactForm` directly rather than a channel list). The "contact
message" itself is not a persisted domain type — it's the ephemeral `ContactEmailPayload`
(`senderEmail`, `title`, `message`) defined in `src/lib/server/send-contact-email.ts`, sent by
email and never stored.

## SEO metadata

`PageMetadataConfig` (`src/types/seo.ts`) — `key`, `path`, `title`, `description`, `pageType`
(`WebPage | CollectionPage`), optional `ogImagePath`. The six live routes are defined in
`routeMetadata` (`src/lib/seo/metadata.ts`) and consumed by `buildPageMetadata()` for canonical
URLs, Open Graph/Twitter cards, and by `sitemap.ts` for the sitemap.

## Route

Not a formal type — `routes` (`src/lib/routes.ts`) is the single object literal mapping route
keys to path strings (`home`, `projects`, `projectMyDevKit`, `publications`, `about`, `contact`).
Every internal `href` in content and components should reference `routes.*` rather than a literal
path string, so a route rename only requires one edit.
