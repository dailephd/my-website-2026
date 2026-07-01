# Open Graph preview images

The metadata helper (`src/lib/seo/open-graph.ts`) accepts PNG files only when they are exactly
1200×630 pixels. If a page-specific image is missing or invalid, `resolveOpenGraphImage` falls
back to `default-og.png`; if the fallback also fails the check, no OG image is added (safe behavior).

## Current files

| File | Status | Note |
|------|--------|------|
| `default-og.png` | Placeholder (1×1) | Replace with 1200×630 fallback artwork |
| `home-og.png` | Placeholder (1×1) | Replace with homepage 1200×630 artwork |
| `work-og.png` | Placeholder (1×1) | Replace with Selected Work 1200×630 artwork |
| `products-og.png` | Placeholder (1×1) | Replace with Product Lab 1200×630 artwork |

## Missing page-specific images

These images are referenced in `src/lib/seo/metadata.ts` but do not yet exist. Until they are
added, the corresponding pages use `default-og.png` (or no OG image if that also fails the check).

| File | Route |
|------|-------|
| `my-dev-kit-og.png` | `/products/my-dev-kit` |
| `about-og.png` | `/about` |
| `writing-og.png` | `/writing` |
| `contact-og.png` | `/contact` |

## Format requirements

- PNG only
- Exactly 1200×630 pixels
- Use concise visual text and a description that matches the page metadata
- Compress before committing (avoid multi-megabyte originals)
- Use lowercase kebab-case filenames matching the route slug

## Placement workflow

1. Create real 1200×630 PNG artwork for each route
2. Compress using `pngquant` or similar
3. Place the file in this directory with the correct name
4. Run `npm run validate:links` and `npm run build` to confirm it loads correctly
