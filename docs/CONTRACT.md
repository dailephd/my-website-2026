# Contract

## Purpose

This document defines the project contracts for `my-website-2026`: the data shapes, ownership boundaries, invariants, and failure semantics that govern local content, metadata, theming, and route composition.

## Contract policy

- Contract owner: this repository
- Storage model: local structured content under `src/content`
- Runtime target: Next.js website
- Versioning model: Git and release based, not public package semver
- Breaking-change scope: route URLs, local content contracts, deployment behavior, SEO metadata, and component prop contracts

Every content item rendered in a list must have a stable `id` or `slug`.

## Allowed roadmap statuses

The only allowed roadmap status values are:

- `shipped`
- `active`
- `planned`
- `exploring`
- `paused`
- `deferred`

Status must be rendered as text, not color alone.

## Profile

- Defined in: `src/types/content.ts` or a future equivalent content type module
- Owner layer: `types`
- Content source: `src/content/profile.ts`
- Consumers: homepage hero, about page, contact surfaces, metadata helpers

Type shape:

```ts
interface Profile {
  id: 'profile';
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  locationLabel?: string;
  primaryRoleLabels: string[];
  summary: string;
  productLabStatement: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  primaryLinks: CtaLink[];
}
```

Invariants:

- `id` is stable.
- Identity and positioning strings are required and non-empty.
- At least one primary role label is required.
- `primaryLinks` must be meaningful visitor actions.
- Identity copy should not be duplicated directly in route files when the profile record exists.

Error semantics:

- Missing required identity fields are a content validation failure.
- Optional fields may be omitted without failing the page.

M1 CTA specialization:

```ts
interface CtaLink extends SiteLink {
  kind: 'cta';
}
```

## SiteLink

- Defined in: `src/types/content.ts`
- Owner layer: `types`
- Content sources: `src/content/profile.ts`, `src/content/links.ts`, project/product/publication records
- Consumers: navigation CTAs, project links, product links, contact links, publication links

Type shape:

```ts
interface SiteLink {
  id: string;
  label: string;
  href: string;
  kind: 'navigation' | 'cta' | 'social' | 'email' | 'download';
  external: boolean;
  displayPriority: number;
  locations: Array<'primary' | 'navigation' | 'footer'>;
}
```

Invariants:

- `id` is stable and unique within link collections.
- `label` must be meaningful and human-readable.
- `href` must be non-empty.
- Adapter output is sorted by ascending `displayPriority`.
- External links should resolve to valid absolute URLs, mailto links, or approved download targets.

Error semantics:

- Empty `label` or `href` is a validation failure.
- Broken optional links may degrade by omission if intentionally hidden before publish.

## Project

- Defined in: `src/types/project.ts`
- Owner layer: `types`
- Content source: `src/content/projects.ts`
- Consumers: `/work`, homepage featured work section, SEO helpers, project link lists

Type shape:

```ts
interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  longSummary?: string;
  status: ProjectStatus;
  category: ProjectCategory;
  role: string;
  stack: readonly string[];
  links: readonly ProjectLink[];
  featured: boolean;
  displayPriority: number;
}

type ProjectStatus =
  | 'active'
  | 'in-development'
  | 'maintained'
  | 'experimental'
  | 'archived'
  | 'planned';

interface ProjectLink {
  id: string;
  label: string;
  href: string;
  kind: 'repository' | 'package' | 'documentation' | 'website';
  external: boolean;
}
```

Invariants:

- `id` and `slug` must both be stable and unique.
- `title`, `summary`, `status`, and `role` are required.
- `stack` should reflect real technologies, not marketing filler.
- `featured` controls index prioritization but does not replace `displayPriority`.
- Adapter ordering is featured first, then ascending `displayPriority`, then title.
- Missing optional links or `longSummary` must degrade cleanly.

Error semantics:

- Missing stable identifier is a hard validation failure.
- Duplicate identifiers or slugs are hard validation failures.
- Missing optional links degrade by rendering fewer CTAs.

Adapter contract:

- `getAllProjects()` returns deterministic featured-first records.
- `getFeaturedProjects()` returns only featured records.
- `getProjectBySlug(slug)` returns a project or `undefined`.
- `getProjectsByCategory(category)` preserves deterministic ordering.
- Adapters do not import React or mutate source records.

## Product

- Defined in: `src/types/product.ts`
- Owner layer: `types`
- Content source: `src/content/products.ts`
- Consumers: `/products`, `/products/my-dev-kit`, homepage product-lab section

Type shape:

```ts
interface Product {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: string;
  featured: boolean;
  links?: SiteLink[];
}
```

Invariants:

- `slug` must be stable and route-compatible.
- `status` must describe maturity honestly.
- Product copy must not overstate incomplete work as shipped product.

Error semantics:

- Missing title/slug is a hard validation failure.
- Optional CTAs may be omitted until ready.

## ProductFamily

- Defined in: `src/types/product.ts` or a future expanded product-family type
- Owner layer: `types`
- Content source: `src/content/products.ts`
- Consumers: `/products`, `/products/my-dev-kit`, ecosystem diagram and module cards

Type shape:

```ts
interface ProductFamily {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: string;
  featured: boolean;
  modules: Array<{
    id: string;
    name: string;
    summary: string;
    role: 'Codebase Intelligence' | 'Workflow Orchestration' | 'Validation Lab';
    links: SiteLink[];
  }>;
}
```

Invariants:

- `my-dev-kit Ecosystem` is treated as one connected product family.
- Modules must map to the semantic model:
  - `my-dev-kit` -> `Codebase Intelligence`
  - `my-dev-kit-orchestrator` -> `Workflow Orchestration`
  - `my-dev-kit-lab` -> `Validation Lab`
- The family must not be presented as unrelated repos.

Error semantics:

- Missing module roles or unstable identifiers are validation failures.
- Missing optional docs or demo links degrade gracefully.

## M4 implemented ProductFamily contract

The implemented authority in `src/types/product.ts` supersedes the earlier planning shape:

- `ProductFamily` requires stable ID/slug, titles, summary/description, constrained status and
  category, positioning, audience, modules, links, featured state, priority, workflow summary,
  honest status note, and a boolean roadmap-planned marker.
- `ProductModule` requires stable ID/slug, title, semantic role/layer labels, summary/description,
  constrained status/stage, stack, optional links, and priority.
- `ProductLink` requires stable ID, label, href, kind, and explicit external behavior.
- Adapter order is deterministic; duplicate family/module IDs or slugs fail clearly.
- `getMyDevKitEcosystem()` throws when the required family is absent.
- Missing optional module links render no empty link container.

## Roadmap

M5 implementation authority:

- `RoadmapStatus` is exactly `shipped | active | planned | exploring | paused | deferred`.
- `Roadmap` requires stable ID/slug, short title, product slug, summary, status, parseable
  `updatedAt`, lanes, featured state, and display priority.
- `RoadmapLane` requires stable ID, module slug, role, summary, status, phases, and priority.
- `RoadmapPhase` requires stable ID, timeframe, priority, summary, status, milestones, and order.
- `RoadmapMilestone` requires stable ID, title, text status, summary, optional links, and order.
- Adapters reject duplicate IDs, invalid dates/statuses, and missing required ecosystem roadmap.
- Preview data is derived from milestone statuses, never copied into page components.

## M6 Product Index contract

- `ProductIndexItem` supports `product-family` and `standalone-product` entries.
- Required fields are stable ID/slug, title, summary, positioning, constrained status/category,
  featured state, priority, and links.
- Optional `detailHref` and `roadmapSlug` degrade cleanly.
- `ProductCardViewModel` combines one item with optional adapter-derived roadmap preview data.
- `ProductIndexViewModel` separates featured and standard cards deterministically.
- Duplicate IDs/slugs and unknown roadmap slugs are validation failures.

- Defined in: `src/types/roadmap.ts`
- Owner layer: `types`
- Content source: `src/content/roadmaps.ts`
- Consumers: homepage roadmap preview, `/products/my-dev-kit`, future roadmap surfaces, validation helpers

Type shape:

```ts
interface Roadmap {
  id: string;
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
  status?: 'shipped' | 'active' | 'planned' | 'exploring' | 'paused' | 'deferred';
  lanes?: RoadmapLane[];
  milestones: RoadmapMilestone[];
}
```

Invariants:

- Roadmap records live in `src/content/roadmaps.ts`.
- `slug` is stable and reusable across pages.
- `updatedAt` must be present.
- Roadmap text should not be duplicated in route-specific hardcoded copy.

Error semantics:

- Missing `slug`, `title`, or `updatedAt` is a hard validation failure.
- Missing optional lanes may still allow compact milestone-only rendering.

## RoadmapLane

- Defined in: `src/types/roadmap.ts`
- Owner layer: `types`
- Content source: `src/content/roadmaps.ts`
- Consumers: roadmap showcase components, timeline components, ecosystem page

Type shape:

```ts
interface RoadmapLane {
  id: string;
  title: string;
  summary?: string;
  status: 'shipped' | 'active' | 'planned' | 'exploring' | 'paused' | 'deferred';
  milestones: RoadmapMilestone[];
}
```

Invariants:

- Each lane has a stable `id`.
- Status must be one of the allowed roadmap statuses.
- Lane naming should align with product-family modules where applicable.

Error semantics:

- Invalid status is a hard validation failure.
- Empty milestone arrays are allowed only when the lane is intentionally a placeholder.

## RoadmapMilestone

- Defined in: `src/types/roadmap.ts`
- Owner layer: `types`
- Content source: `src/content/roadmaps.ts`
- Consumers: roadmap list, phase cards, timeline, status views

Type shape:

```ts
interface RoadmapMilestone {
  id: string;
  title: string;
  status: 'shipped' | 'active' | 'planned' | 'exploring' | 'paused' | 'deferred';
  summary?: string;
  targetWindow?: string;
  links?: SiteLink[];
}
```

Invariants:

- `id` is stable.
- `title` and `status` are required.
- Status text must be visible in the rendered UI.

Error semantics:

- Invalid status or missing identifier is a validation failure.
- Missing optional summary may render as a compact milestone.

## Publication

- Defined in: `src/types/publication.ts`
- Owner layer: `types`
- Content source: `src/content/publications.ts`
- Consumers: about page, publication preview section, metadata helpers

Type shape:

```ts
interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  links: SiteLink[];
}
```

Invariants:

- `id` or another stable unique key is required.
- `title`, `venue`, and `year` are required.
- Links should include meaningful labels such as DOI, paper, or publisher destination.

### M8 implementation

`Publication` requires `id`, `title`, verified `authors`, `summary`, `type`, `links`, `tags`,
and numeric `displayPriority`. Optional citation fields are omitted unless verified.
`getAllPublications()` sorts deterministically; `getPublicationSummary()` exposes an explicit
empty-state flag.

Error semantics:

- Missing title or stable identifier is a validation failure.
- Missing external link may still allow text-only display.

## GalleryItem

- Defined in: `src/types/gallery.ts`
- Owner layer: `types`
- Content source: `src/content/gallery.ts`
- Consumers: gallery sections, media cards, screenshot components

Type shape:

```ts
interface GalleryItem {
  id: string;
  title: string;
  imagePath: string;
  alt?: string;
  decorative?: boolean;
  caption?: string;
}
```

Invariants:

- `id` is stable.
- `imagePath` must refer to a managed local or approved remote asset path.
- Informative images need meaningful `alt` text.
- Decorative images must be hidden from assistive tech.

Error semantics:

- Missing `imagePath` is a validation failure.
- Missing `alt` for informative imagery is an accessibility/content failure.

## WritingItem

- Defined in: `src/content/writing.ts` today and should move to a shared type module when expanded
- Owner layer: currently `content`, target owner `types`
- Content source: `src/content/writing.ts`
- Consumers: `/writing`, homepage previews if added later

Type shape:

```ts
interface WritingItem {
  id: string;
  title: string;
  summary: string;
  href: string;
  publishedAt?: string;
}
```

Invariants:

- `id` or stable `href` is required for list rendering.
- If no writing items exist, the UI should show a polished empty state rather than a broken layout.

### M10 implementation

`WritingItem` requires stable `id` and `slug`, title, summary, constrained status/type, tags,
priority, and featured state. Only `published` records appear in the public index. Public records
require a verified href; adapters reject duplicate IDs and slugs.

## ContactChannel

`ContactChannel` includes `id`, `label`, `href`, constrained `kind`, description, external,
priority, and primary fields. `getContactPanel()` composes structured copy and existing links,
reports whether direct email exists, and contains no form endpoint.

Error semantics:

- Missing required fields invalidate the record.
- Empty collection is allowed and should not fail the build by itself.

## ResumeMetadata

- Defined in: `src/content/resume.ts` today and should move to a type module when expanded
- Owner layer: currently `content`, target owner `types`
- Content source: `src/content/resume.ts`
- Consumers: about page, contact page, CTA components

Type shape:

```ts
interface ResumeMetadata {
  label: string;
  href: string;
}
```

Invariants:

- The link target must be meaningful and intentional.
- The label should describe the action clearly.

Error semantics:

- Missing href is a validation failure.
- Temporarily unavailable resume assets should remove the CTA, not produce a broken download link.

### M8 implementation

`ResumeMetadata` includes `id`, `label`, `href`, `fileType`, `description`, `available`, and
optional verified `updatedAt`. `getResumeLink()` returns no link when unavailable.

`EducationItem`, `TechnicalFocusItem`, and `ResearchFocusItem` keep dates and institutions
optional so uncertain details are omitted. `getAboutProfile()` supplies `/about`.

## M9 GalleryItem

`GalleryItem` requires `id`, `title`, `src`, `alt`, `kind`, `category`, `caption`, intrinsic
`width` and `height`, `displayPriority`, and `featured`. Optional associations, placements,
tags, credit, date, thumbnail, and links support contextual reuse.

`GallerySectionViewModel` contains ordered items and `isEmpty`. Adapters validate local files,
sort featured records first, and filter by category, association, or placement.

## PageMetadata

- Defined in: `src/types/seo.ts` and produced by `src/lib/seo`
- Owner layer: `types` / `seo`
- Consumers: route modules in `src/app`, sitemap, Open Graph helpers

Type shape:

```ts
interface PageMetadata {
  title: string;
  description: string;
  path: string;
}
```

Invariants:

- Every public page must have unique metadata.
- `path` must align with the route URL.
- Metadata should be based on page intent and local content, not duplicated generic boilerplate.

Error semantics:

- Missing title or description for a public route is a release-blocking content failure.
- Canonical path mismatches are a metadata correctness failure.

### M11 implementation

`SiteMetadata` defines site defaults. `PageMetadataConfig` defines an existing route’s title,
description, schema type, and optional preview path. `OpenGraphImage` requires a verified
1200×630 local PNG.

Canonicals use `NEXT_PUBLIC_SITE_URL` or `http://localhost:3000` in development. Sitemap entries
derive from the route registry. Robots allows crawling unless `NEXT_PUBLIC_NOINDEX=true`.
External link checks require `CHECK_EXTERNAL_LINKS=true`.

## ThemePreference and EffectiveTheme

- Defined in: `src/types/theme.ts`
- Owner layer: `layout-theme`
- Consumers: theme provider, theme toggle, root layout, browser persistence logic

Type shape:

```ts
type ThemePreference = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';
```

Invariants:

- Theme preference must degrade safely when browser storage is unavailable.
- Light mode must use soft grey surfaces, not pure white.
- Dark mode must use charcoal grey surfaces, not pure black.
- Theme controls must be keyboard accessible and clearly labeled.
- Preference is persisted under `my-website-2026-theme`.
- The root element has `data-theme-preference` and an effective `data-theme`.
- The root element has class `dark` only when the effective theme is dark.
- System preference changes affect the site only while preference is `system`.

Error semantics:

- Invalid stored values should fall back to `system`.
- Failure to persist preference must not block rendering.
- Browser APIs must not be accessed without a client-side guard.

## Content adapter behavior

Owner layer: `content-adapters`

Rules:

- Required content must fail clearly when missing.
- Optional content may degrade gracefully with polished empty states.
- Validation helpers should identify which file and record failed.
- Adapters should not silently invent replacement data for missing required records.

## Metadata and route contracts

Rules:

- Public pages must have unique metadata.
- Routes in scope for v1 are:
  - `/`
  - `/work`
  - `/products`
  - `/products/my-dev-kit`
  - `/writing`
  - `/about`
  - `/contact`
- Route changes are treated as breaking changes unless redirected intentionally.

## Versioning and breaking-change policy

This repository does not publish a public API package. Versioning is Git/release based.

Breaking changes include:

- Changing a stable public route URL without an intentional redirect plan
- Changing required local content record fields without updating all producers and consumers
- Breaking Vercel deployment expectations
- Removing or duplicating SEO metadata behavior for public pages
- Changing component prop contracts in a way that breaks page composition
- Moving roadmap source-of-truth data out of `src/content/roadmaps.ts` without an approved replacement design

## Review checklist

Before merging contract-affecting changes, verify:

- Stable identifiers still exist for list-rendered records.
- Roadmap statuses remain within the approved set.
- Link labels remain meaningful.
- Image alt-text rules are preserved.
- Optional sections degrade gracefully.
- Route metadata remains unique per public page.

## M12 visual primitive contract

`Card`, buttons, badges, section headers, and feature cards retain their existing prop APIs.
Premium interaction classes are optional, non-essential, theme-token-driven, and disabled under
reduced motion. Decorative grid and glow layers use `aria-hidden` markup.
# M7 homepage contracts

- `HomeSectionCopy`: optional eyebrow plus required heading and summary.
- `TechnicalFocusItem`: stable ID, title, and concise summary.
- `HomepageContent`: homepage-only copy for all seven narrative sections.
- `HomepageViewModel`: profile, link-derived CTAs, bounded project/product previews, ecosystem
  context, and an optional roadmap preview.
- The aggregate adapter is deterministic, does not mutate source records, and does not import UI.
