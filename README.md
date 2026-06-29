# my-website-2026

Modern personal website, portfolio, and product-lab repository for Dai Le.

## Purpose

`my-website-2026` is a single Next.js website that presents Dai Le as a software developer, AI builder, PhD-trained scientist, and product-focused technical founder. The site is intended to showcase selected projects, product-lab work, roadmaps, publications, writing, resume/contact links, and gallery/media assets.

## Local path

`Z:\Users\newuser\Projects\my-website-2026`

## Publication and deployment targets

- Publication target: GitHub
- Deployment target: Vercel

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- GitHub Actions
- Vercel

## Main project rules

- This repository is a single website repo, not a monorepo.
- Website-owned content is stored locally under `src/content`.
- Do not create or depend on a separate npm content package.
- The main design rule is a premium dual-mode grey interface:
  - light mode uses soft grey, not pure white
  - dark mode uses charcoal grey, not pure black

## Main routes

- `/`
- `/work`
- `/products`
- `/products/my-dev-kit`
- `/writing`
- `/about`
- `/contact`

## Current website features

- Content-powered identity, navigation, homepage hero, and footer
- Light, dark, and system theme preferences
- Browser-persisted theme choice under `my-website-2026-theme`
- Accessible theme control in the primary header
- Selected Work page at `/work`, rendered from typed local project content
- my-dev-kit Ecosystem overview at `/products/my-dev-kit`
- Three-lane my-dev-kit Ecosystem roadmap rendered from local structured content
- Product Lab Index at `/products` with an adapter-derived roadmap preview
- Homepage product-lab narrative with featured work, product, roadmap, technical focus, research
  credibility, and contact previews

## Local development

1. Install dependencies:
   `npm install`
2. Start the dev server:
   `npm run dev`

Homepage-specific copy lives in `src/content/home.ts`; identity, links, projects, products, and
roadmaps remain in their existing local content modules.

Windows helpers:

- `npm run dev:check`
- `npm run docker:ready`

## Build and check commands

- `npm run install:all`
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run test:unit`
- `npm run validate:content`
- `npm run validate:links`
- `npm run build`
- `npm run test:e2e`
- `npm run ci`
- `npm run check:release`

## Docker local production preview

- `npm run dev:docker`
- `npm run dev:docker:down`

This Docker workflow is for local production-style preview of the single Next.js site. It does not start any database, Python service, or secondary app.

## Documentation

Project documentation lives in `docs/`.

Key files:

- `docs/PROJECT_OVERVIEW.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTRACT.md`
- `docs/DESIGN.md`
- `docs/CI_CD.md`
- `docs/ROADMAP.md`

## Product story note

`my-dev-kit`, `my-dev-kit-orchestrator`, and `my-dev-kit-lab` should be presented as one connected product family: the `my-dev-kit Ecosystem`.

## About and publications

`/about` presents local profile, technical-focus, research, education, publication, and resume
metadata. Publication citations remain empty until verified, and unavailable resume files are
not exposed as downloads.

## Gallery and media

`/work` includes the local-content-driven media showcase. Add optimized assets under
`public/images`, then register verified paths, dimensions, captions, and alt text in
`src/content/gallery.ts`.

## Writing and contact

`/writing` renders verified local writing metadata or an intentional empty state. `/contact`
derives professional pathways from local link/profile content and does not include a backend
form or expose an unverified email address.

## SEO and link previews

All public routes use centralized metadata, canonicals, Open Graph/Twitter cards, JSON-LD,
sitemap, and robots outputs. Set `NEXT_PUBLIC_SITE_URL` for production URLs and run
`npm run validate:links`. Preview assets belong in `public/images/og` as 1200×630 PNG files.

## Visual system

The site uses soft-grey and charcoal themes, solid dimensional cards, restrained violet/cyan
glow, CSS-only product-lab motifs, and reduced-motion-safe interaction polish.

## Deployment

- Deployment target: Vercel
- Preview and production deployment are expected to use Vercel GitHub integration
