# Content Layer Plan

## M1 implementation

- Define profile, CTA, navigation-link, and site-link types.
- Store profile and link records locally.
- Validate required profile fields.
- Sort links by `displayPriority`.
- Wire adapters into the homepage, header, and footer.

## Testing notes

- Unit tests cover required profile fields and all four M1 adapter functions.
- `npm run validate:content` checks required source files and field indicators.

## TODO

- Add deeper runtime/schema validation when later content models become real.

## M3 completion

- Added project contracts and five curated records.
- Added featured-first accessors, slug/category lookup, and duplicate detection.
- Expanded script validation for project fields, statuses, identifiers, priorities, and links.

## M4 completion

- Added the product-family/module contracts and one ecosystem family.
- Added deterministic accessors, required-family failure behavior, and duplicate validation.
- Expanded content validation for the exact three module roles and safe maturity values.

## M5 completion

- Added the ecosystem roadmap, three lanes, six phases, and ordered milestones.
- Added required-roadmap lookup, nested validation, normalization, and preview derivation.

## M6 completion

- Added three curated index entries and featured/standard accessors.
- Added card/index view models with optional roadmap preview resolution.

## M7 completion

- Added typed homepage copy and a deterministic aggregate view model.
- Added bounded project/product previews and optional roadmap handling.
- Added validation and tests for composition and source-of-truth rules.

## M8 completion

- Extended profile content with technical, research, and education records.
- Replaced the fake citation with a verified-empty typed collection.
- Added publication and guarded resume adapters with tests.

## M9 completion

- Replaced the fake gallery record with a verified-empty typed collection.
- Added deterministic validation, filtering, association, placement, and view-model adapters.
- Added local image-file validation and asset-folder guidance.

## M10 completion

- Added constrained writing and contact contracts.
- Added deterministic writing validation and verified-empty index behavior.
- Added contact composition from profile, contact copy, and existing links.

## M11 completion

- Centralized route metadata while retaining existing content ownership.
- Extended offline validation for routes, hrefs, local assets, and SEO helpers.
