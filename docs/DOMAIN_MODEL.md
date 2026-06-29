# Domain Model

## Profile and links

`ProfileContent` owns Dai Le’s identity and positioning. `SiteLink`, `CtaLink`, and
`NavigationLink` describe stable actions used by the shell.

## Selected work

### Project

A curated technical work record with stable identity, honest maturity status, category, role,
stack, featured state, display priority, and optional links.

### ProjectStatus

One of `active`, `in-development`, `maintained`, `experimental`, `archived`, or `planned`.
Status communicates current maturity and is always rendered as text.

### ProjectLink

An optional project action with stable ID, meaningful label, safe URL, link kind, and explicit
external behavior.

## Relationships

- The `/work` route consumes project collections through adapters.
- Featured projects are a subset of all projects.
- A project can have zero or more links and stack items.
- The `my-dev-kit` projects remain related members of the future ecosystem story, while M3
  presents them as selected technical work.

## Later domains

Products beyond the ecosystem overview, publications, gallery items, writing, and resume metadata remain owned by
their later milestones.

## Roadmap domain

- A `Roadmap` belongs to a product slug and contains ordered lanes.
- A `RoadmapLane` maps to one ecosystem module and contains ordered phases.
- A `RoadmapPhase` communicates timeframe, priority, status, and milestones.
- A `RoadmapMilestone` is the smallest status-bearing direction item.
- Status is always visible text; progress rails carry no essential information.

## Product Lab Index

The index is a curated projection over product-family and standalone-product records. It relates
products to roadmaps by slug; products without roadmap data render without a preview.

## Gallery media

A `GalleryItem` relates one optimized local asset to a kind, category, optional project/product,
and page placement. Intrinsic dimensions prevent layout shift. Alt text is required unless the
item is explicitly decorative; project and product screenshots are presentation variants.

## SEO and discovery

A public route has one metadata configuration, absolute canonical URL, Open Graph/Twitter card,
and schema page type. Sitemap routes are the same registry projection. Robots is crawlable by
default, and preview images are optional verified local assets.

## Writing and contact

A `WritingItem` is public only when its status is published and its destination is verified.
`WritingIndexViewModel` supports an explicit empty state. `ContactChannel` is derived from an
existing link; `ContactPanelViewModel` groups channels and reports direct-email availability.

## Homepage narrative

`HomepageContent` owns homepage labels, summaries, technical-focus items, credibility copy, and
CTA framing. `HomepageViewModel` joins it with existing profile, link, project, product, and
roadmap adapters without becoming a second source for their records.

## About credibility model

`EducationItem`, `TechnicalFocusItem`, and `ResearchFocusItem` support the profile. `Publication`
represents only a fully verified citation; an empty collection is valid. `ResumeMetadata`
separates a planned file path from actual download availability.
