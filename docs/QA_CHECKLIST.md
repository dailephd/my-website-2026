# QA Checklist

Manual pass to run before deployment, in addition to (not instead of) `npm run check:release`.
See `docs/RELEASE_READINESS.md` for the automated checklist this complements.

## Visual check

- [ ] Check all six palettes in Light, Dark, and System modes; Mineral Research is the default.
- [ ] Violet & Graphite retains its historical graphite/violet/cyan identity and meets current functional contrast requirements.
- [ ] Navbar logo (`SiteLogoMark`) reads clearly at header size in both themes.
- [ ] No layout shift or overlapping elements on any of the six routes.

## Route check

- [ ] `/`, `/projects`, `/projects/my-dev-kit`, `/publications`, `/about`, `/contact` all load.
- [ ] `/work` redirects to `/projects` (not a 404, not a stale page).
- [ ] No navigation link points at `/products`, `/products/my-dev-kit`, or `/writing`.
- [ ] Browser tab favicon renders (check both light/dark OS theme if supported by the browser).

## Content check

- [ ] Homepage: business framing (dailephd LLC) is primary; no stale "personal website" language.
- [ ] `/about`: Dai Le's professional/research background renders completely.
- [ ] `/projects`: current products/projects render, followed by "Archived projects"; archived
      cards show title/description/notes but no tag pills.
- [ ] `/projects/my-dev-kit`: four product panels each show a GitHub link, an npm link, and a
      working Roadmap toggle with an ascending version timeline.
- [ ] No placeholder or invented content anywhere.

## Publications check

- [ ] All listed publications are real, verified records — no fabricated DOIs/abstracts.
- [ ] Author list bolds "Dai Le" (and "Le Dai" name-order variant) correctly.
- [ ] Abstract and BibTeX sections expand/collapse via keyboard (Tab + Enter/Space) as well as
      mouse.
- [ ] DOI links open the correct external resource in a new tab.

## Contact form check

- [ ] Client-side validation blocks empty/invalid submissions before any network request.
- [ ] Submitting a valid message shows a success state (real send requires `RESEND_API_KEY` and
      `CONTACT_FROM_EMAIL` configured in the target environment — see
      `docs/WORKFLOWS.md`).
- [ ] Submitting with missing required fields shows a clear, specific error message.
- [ ] GitHub and LinkedIn profile links on `/contact` open in a new tab with `rel="noreferrer"`.

## Accessibility check

- [ ] Skip-to-main-content link is the first focusable element and is visible on focus.
- [ ] Each route has exactly one `h1`.
- [ ] All interactive elements are keyboard-reachable with a visible focus ring.
- [ ] Status/state is conveyed as text, not color alone.
- [ ] `prefers-reduced-motion: reduce` removes non-essential transitions.

## Responsive check

- [ ] No horizontal scrolling at mobile (390px) or tablet (768px) widths on any route.
- [ ] Product/project card grids collapse to a single column on narrow viewports.
- [ ] The my-dev-kit relationship diagram and its Roadmap timelines remain readable on mobile,
      including the longest (my-dev-kit-lab) version history.

## SEO check

- [ ] Each route has a unique, accurate `<title>` and description.
- [ ] `sitemap.xml` lists exactly the six live routes.
- [ ] `robots.txt` allows crawling (unless intentionally set to noindex for a preview
      environment).
- [ ] Open Graph preview images load for each route.

## Release-readiness commands to run before sign-off

```
npm run typecheck
npm run lint
npm run validate:content
npm run validate:links
npm run test
npm run build
npm run check:release
npm run dev:web -- --port 3100   # separate terminal
npm run test:e2e
```
