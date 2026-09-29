# Contract

## Purpose

This document defines the behavioral contracts for `my-website-2026`: what each content model,
route, and key component guarantees, and what the validation/release-readiness scripts enforce.
For type shapes see `docs/DOMAIN_MODEL.md`; this document focuses on *behavior*.

## Contract policy

- Contract owner: this repository.
- Storage model: local structured content under `src/content`, no external CMS.
- Enforcement: `scripts/validate-content.mjs`, `scripts/validate-links.mjs`,
  `scripts/lint.mjs`, and the Vitest suite under `tests/content/`.
- Breaking-change policy: a change that alters a public route path, a required content field, or
  the contact API's request/response shape is a breaking change and must update this document,
  `docs/DOMAIN_MODEL.md`, and the relevant tests in the same change.

## Route contracts

| Route | Contract |
|---|---|
| `/` | Exactly one `h1`; hero, featured technical work, technical focus, background/credibility sections; no hardcoded content arrays in the page component |
| `/projects` | Current products/projects index plus an "Archived projects" section (`getArchivedProjects()`), positioned after current content; archived cards render without tag pills |
| `/projects/my-dev-kit` | Renders the my-dev-kit relationship diagram (`ProductArchitectureVisual`) with four product panels, an external implementation actor, Observer correction loop, and optional Lab assurance; each product exposes GitHub and npm links and a collapsible Release snapshot toggle |
| `/publications` | Renders only verified `Publication` records from `src/content/publications.ts` — no invented citations |
| `/about` | Dai Le's professional background, research background, and education; primary identity surface for the individual (as opposed to the business-first homepage) |
| `/contact` | Contact form (`ContactForm` → `POST /api/contact`) plus GitHub/LinkedIn profile links |
| `/work` | 301 redirect to `/projects` (`next.config.ts`), not a page |

Every route must be present in `routeMetadata` (`src/lib/seo/metadata.ts`); `sitemap.ts` derives
strictly from that object, so a route not listed there cannot appear in the sitemap, and a
sitemap entry cannot exist for a route that isn't real.

## Content contracts

- Every content array element has a stable `id` and (where applicable) `slug`; adapters throw on
  duplicates (`Duplicate project id: …`, `Duplicate product family slug: …`, etc.).
- `displayPriority` is a required numeric sort key on most content types; ordering is otherwise
  undefined and must not be inferred from array position alone (except where a comment/doc
  explicitly says order is authored and preserved — e.g. `ProductModule.versionRoadmap`, which is
  hand-ordered ascending by version and intentionally not re-sorted at runtime).
- External links (`external: true`) must render with `target="_blank"` and `rel="noreferrer"`.
- Internal links must use `routes.*`, never a raw literal path.
- No placeholder/fake content: an empty or unverified section renders an explicit, honest empty
  state (e.g. "No secondary product entries are ready yet.") rather than fabricated data.

### Roadmap contract

`src/content/roadmaps.ts` is the single source of truth for the full structured roadmap model
(lanes → phases → milestones), validated by `validateRoadmaps` and consumed by
`getRoadmapPreview()`. It is distinct from `ProductModule.versionRoadmap`, the simpler per-product
version-history list rendered inside each `/projects/my-dev-kit` product panel's collapsible
Roadmap section.

## Publication card behavior

`PublicationCard` (`src/components/publications/PublicationCard.tsx`):

1. Title links to `publication.url ?? doi.org/{doi}` when either is present; otherwise renders as
   plain text (no dead link).
2. Authors render comma-separated; **author highlighting** — any author where
   `isProfileOwner === true` or `isDaiLeAuthor(name)` returns true (matches "Dai Le" and "Le Dai"
   name-order variants) renders bold via a `strong` element, all other authors render as plain
   text.
3. Venue line joins `journal`/`venue`, `volume`, `(issue)`, `pages`/`articleNumber`, and `(year)`
   — only non-empty parts are included.
4. DOI: if `doi` is present, a `doi:{doi}` link renders below the venue line pointing at the same
   resolved URL as the title link.
5. Tags render as a badge list under an `aria-label="Research areas"` list when present.
6. **Abstract collapsible** — a native disclosure element (`details`/`summary`) labeled
   "Abstract". Multi-paragraph abstracts (`\n\n`-separated) render as separate paragraphs; a
   missing abstract renders "Abstract unavailable." rather than hiding the control.
7. **BibTeX** — a second disclosure element labeled "BibTeX", rendered only when
   `publication.bibtex` is present, showing the raw BibTeX in a preformatted code block.

Publications list order (`getAllPublications()`): year descending, then `displayPriority`
ascending. `Publication.abstract` and `.bibtex` are optional; absence must not error, only
degrade gracefully as described above.

## Contact form / API contract

**Request** — `POST /api/contact`, JSON body:

```json
{ "senderEmail": "string (required, email format)",
  "title": "string (required, ≤200 chars)",
  "message": "string (required, 10–10000 chars)",
  "companyWebsite": "string (honeypot; must be empty for real submissions)" }
```

**Server validation** (`src/app/api/contact/route.ts`):
- Malformed JSON → `400 { error }`.
- Honeypot filled → `200 { ok: true }` (silently accepted, no email sent — bot deterrence).
- Missing/invalid `senderEmail`, empty `title`, `title` over 200 chars, empty `message`, or
  `message` outside 10–10000 chars → `400 { error: <first validation message> }`.
- Valid payload → calls `sendContactEmail`.

**Email delivery** (`src/lib/server/send-contact-email.ts`, via Resend):
- Missing `RESEND_API_KEY` or `CONTACT_FROM_EMAIL` → `500 { error }` with a specific,
  non-secret config-error message (always surfaced, even in production, so misconfiguration is
  visible).
- Provider/network failure → `500 { error }`; in production the message is generic ("Unable to
  send message at this time…") to avoid leaking provider internals, while non-production
  environments see the detailed error.
- Success → `200 { ok: true }`.
- `from`: `"{CONTACT_FROM_NAME} <{CONTACT_FROM_EMAIL}>"`; `to`: `[CONTACT_TO_EMAIL]` (defaults to
  `dailephd@gmail.com`); `replyTo`: the visitor's `senderEmail` (so replying to the notification
  email replies directly to the visitor); `subject`: `"{CONTACT_SUBJECT_PREFIX} {title}"`.
- All interpolated values are HTML-escaped before being placed into the HTML email body.

## Validation contract

- `npm run validate:content` — every `src/content` module has required fields, unique ids/slugs,
  allowed enum values (statuses, categories, kinds), and internally consistent cross-references
  (e.g. a product's `roadmapSlug` must resolve to a real roadmap).
- `npm run validate:links` — every internal `href` resolves to a route declared in
  `src/lib/routes.ts`; every external `href` is a well-formed URL; every route in `routeMetadata`
  has a corresponding page file; no duplicate/conflicting favicon or robots declarations.
- `npm run lint` — custom repository rules (`scripts/lint.mjs`), separate from `next lint`.

## Release-readiness contract

`npm run check:release` (`scripts/check-release-readiness.mjs`) passes only if, in order:

1. All required release paths exist (docs, key route files, `robots.ts`/`sitemap.ts`,
   `.env.example`, `README.md`).
2. No forbidden multi-service paths exist (`apps/`, `packages/contracts`, `apps/web`,
   `apps/nlp-service`).
3. No conflicting `public/robots.txt` (the App Router `robots.ts` is the single source).
4. `typecheck`, `lint`, `validate:content`, `validate:links`, `test`, and `build` all pass, in
   that order — the first failure aborts the run.

See `docs/RELEASE_READINESS.md` for the full checklist including what this command does **not**
cover (E2E, manual visual/accessibility QA, live email delivery).
