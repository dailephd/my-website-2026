# Gallery Components Spec

## Component purpose

Define the gallery and media presentation system for optimized image and screenshot display.

## Responsibilities

- Render gallery cards and grids.
- Support image metadata and captions.
- Preserve performance and layout stability.
- Render only adapter-validated local assets.
- Provide an honest empty state when no verified media exists.

## Inputs and outputs

- Inputs: typed `GalleryItem` records passed through props.
- Outputs: optimized Next Image figures, screenshot variants, grids, and empty states.

## Accessibility notes

- Meaningful images require alt text; decorative records must be explicit.
- Figures use captions and linked media retain keyboard focus.

Intrinsic dimensions prevent layout shift. Below-the-fold images load lazily.

M12 applies premium figure-card interactions and a layered intentional empty-state surface.
