# SEO Components Spec

## Component purpose

Define the metadata and structured-data helpers used to generate consistent SEO output across pages.

## Responsibilities

- Centralize metadata generation.
- Support canonical URLs and Open Graph defaults.
- Support structured data for relevant page types.
- Centralize all existing public route configurations.
- Omit missing or invalid preview images safely.

## Inputs and outputs

- Inputs: local content, route keys, and `NEXT_PUBLIC_SITE_URL`.
- Outputs: metadata, canonicals, social cards, JSON-LD, sitemap, and robots.

## Metadata quality

- Titles align with visible page purpose.
- Images are accepted only at 1200×630.
- Structured data contains no invented social or organization fields.
