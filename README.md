# my-website-2026

The website and technical showcase for **dailephd LLC** — a single Next.js site presenting
software, data, and AI project work, with Dai Le's professional and research background
presented on the About page.

## Purpose

`my-website-2026` presents dailephd LLC as the primary business identity: custom computing
services across software, data, and AI. Dai Le's identity — software developer, AI model
evaluation specialist, and biological scientist — is presented primarily on `/about`, not as
the homepage's leading frame. The site showcases technical projects (including an archived-work
section), the `my-dev-kit` product ecosystem, verified publications, and a working contact
channel.

## Local path

`Z:\Users\newuser\Projects\my-website-2026`

## Publication and deployment targets

- Publication target: GitHub
- Deployment target: Vercel
- Neither publication nor deployment is performed by this repository's local tooling — both are
  explicit, separate, manual steps (see [Deployment](#deployment)).

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Resend (contact form email delivery)
- GitHub Actions (CI)
- Vercel (hosting target)

## Main project rules

- Single website repository — not a monorepo, no `apps/`/`packages/` split.
- Website-owned content lives locally under `src/content`; no external CMS or content package.
- Premium dual-mode grey interface: soft grey light mode (not pure white), charcoal dark mode
  (not pure black), restrained violet/cyan accents.

## Public routes

| Route | Status |
|---|---|
| `/` | Live — homepage |
| `/projects` | Live — technical projects index, including an Archived projects section |
| `/projects/my-dev-kit` | Live — my-dev-kit Ecosystem relationship diagram and product panels |
| `/publications` | Live — verified publication records |
| `/about` | Live — Dai Le's professional and research background |
| `/contact` | Live — contact form and professional profile links |
| `/work` | **Removed.** Permanently redirects (301) to `/projects` via `next.config.ts` |
| `/products`, `/products/my-dev-kit` | **Removed.** Superseded by `/projects`, `/projects/my-dev-kit` |
| `/writing` | **Removed.** No replacement route; `src/content/writing.ts` is retained but unused by any route |

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/DIAGRAMS.md`](docs/DIAGRAMS.md) for
the full route/navigation diagram.

## Content source of truth

All page content is local, typed, and validated — never hardcoded in page components.

| Domain | Source file | Adapter |
|---|---|---|
| Business/profile identity | `src/content/profile.ts` | `src/lib/content/get-profile.ts` |
| Site links (nav, footer, CTAs) | `src/content/links.ts` | `src/lib/content/get-links.ts` |
| Active + archived projects | `src/content/projects.ts` | `src/lib/content/get-projects.ts` |
| my-dev-kit product family + relationship diagram data | `src/content/products.ts` | `src/lib/content/get-products.ts` |
| Full structured roadmap (lanes/phases/milestones) | `src/content/roadmaps.ts` | `src/lib/content/get-roadmaps.ts` |
| Publications | `src/content/publications.ts` | `src/lib/content/get-publications.ts` |
| Contact intro + profile links (GitHub/LinkedIn) | `src/content/contact.ts` | `src/lib/content/get-contact.ts` |
| Homepage copy (hero, featured work, background cards) | `src/content/home.ts` | `src/lib/content/get-homepage.ts` |
| SEO route metadata | `src/lib/seo/metadata.ts` | consumed directly by pages |

`src/content/gallery.ts` and `src/content/writing.ts` remain in the repo but are not imported by
any current route — they are retained content, not active source-of-truth for a live page.

## Local development

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev` (or `npm run dev:web` to skip the Windows environment
   check)

Windows helpers:

- `npm run dev:check`
- `npm run docker:ready`

## Environment variables

Copy `.env.example` to `.env.local` for local development. Never commit `.env.local`.

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | `http://localhost:3000` | Canonical URLs, Open Graph, sitemap, robots |
| `NEXT_PUBLIC_NOINDEX` | Optional | `false` | Set `true` to block crawlers on preview/staging |
| `PUBLICATIONS_ORCID_ID` | Optional | unset | ORCID iD used by `scripts/sync-publications.mjs` |
| `RESEND_API_KEY` | Required for contact email | unset | Resend API key; server-side only, never `NEXT_PUBLIC_` |
| `CONTACT_TO_EMAIL` | Optional | `dailephd@gmail.com` | Destination inbox for contact form submissions |
| `CONTACT_FROM_EMAIL` | Required for contact email | unset | Verified Resend sender address |
| `CONTACT_FROM_NAME` | Optional | `dailephd LLC` | Display name in the outgoing "From" field |
| `CONTACT_SUBJECT_PREFIX` | Optional | `[dailephd LLC contact]` | Subject-line prefix for filtering |
| `ALLOW_REAL_CONTACT_EMAIL_TEST` | Optional | `false` | Must be `true` to allow `npm run test:contact-email` to send a real email |

## Contact form setup

The `/contact` page form (`ContactForm.tsx`) posts to `POST /api/contact`
(`src/app/api/contact/route.ts`), which validates the payload server-side and calls
`sendContactEmail` (`src/lib/server/send-contact-email.ts`), which sends through **Resend**.
Without `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` set, the route returns a clear config-error
response instead of silently failing. See `docs/WORKFLOWS.md` for the full setup and manual
test workflow, and `docs/DIAGRAMS.md` for the request/response flow diagram.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` / `npm run dev:web` | Local dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript project check |
| `npm run lint` | Custom repository lint checks (`scripts/lint.mjs`) |
| `npm run lint:next` | Next.js's own ESLint pass |
| `npm run validate:content` | Content-shape and required-field validation |
| `npm run validate:links` | Internal/external link and route-metadata validation |
| `npm run test` / `npm run test:unit` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright end-to-end tests (needs a running dev server) |
| `npm run test:all` | typecheck + lint + validate:content + validate:links + test |
| `npm run ci` | `test:all` + build |
| `npm run check:release` | Full local release-readiness gate (see below) |
| `npm run sync:publications` | Optional ORCID sync (requires `PUBLICATIONS_ORCID_ID`) |
| `npm run test:contact-email` | Optional real-email smoke test (requires explicit opt-in) |
| `npm run generate:favicons` | Regenerate favicon PNGs from the SVG source via `sharp` |
| `npm run dev:docker` / `npm run dev:docker:down` | Optional local production-style preview via Docker Compose |

## Release readiness

Run the full local quality gate before considering a branch ready to merge:

```
npm run check:release
```

This runs 9 gates in order: required release paths, forbidden multi-service paths, conflicting
public assets, typecheck, lint, validate:content, validate:links, unit tests, and production
build. **This command does not deploy, push, or publish anything** — it only validates the local
working tree. See [`docs/RELEASE_READINESS.md`](docs/RELEASE_READINESS.md) for the full checklist,
including what is *not* covered automatically (E2E, manual visual/accessibility checks, live
contact-email delivery).

E2E tests require a separately running dev server:

```
npm run dev:web -- --port 3100
npm run test:e2e
```

## Documentation

Project documentation lives in `docs/`:

- [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md) — what the site is and who it's for
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system layers and architecture diagram
- [`docs/DOMAIN_MODEL.md`](docs/DOMAIN_MODEL.md) — content/domain types
- [`docs/CONTRACT.md`](docs/CONTRACT.md) — content, route, and component behavior contracts
- [`docs/COMPONENT_MAP.md`](docs/COMPONENT_MAP.md) — component ownership map
- [`docs/WORKFLOWS.md`](docs/WORKFLOWS.md) — dev/content/release workflows
- [`docs/RELEASE_READINESS.md`](docs/RELEASE_READINESS.md) — pre-deployment checklist
- [`docs/DIAGRAMS.md`](docs/DIAGRAMS.md) — all Mermaid diagrams in one place
- [`docs/BRANCHING.md`](docs/BRANCHING.md) — local branch naming and workflow
- [`docs/QA_CHECKLIST.md`](docs/QA_CHECKLIST.md) — manual QA pass before deployment
- [`docs/DESIGN.md`](docs/DESIGN.md) — visual design system authority
- [`docs/CI_CD.md`](docs/CI_CD.md) — CI, Docker preview, and deployment model

## Deployment

- Deployment target: Vercel; publication target: GitHub.
- **This repository's local tooling does not deploy, push, or publish.** Deployment is a
  separate, manual, explicitly-instructed workflow — see `docs/WORKFLOWS.md` and
  `docs/RELEASE_READINESS.md`.
