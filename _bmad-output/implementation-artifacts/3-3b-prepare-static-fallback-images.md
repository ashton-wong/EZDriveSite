---
title: "3.3b Prepare static fallback images"
story_id: 3.3
story_key: 3-3b-prepare-static-fallback-images
status: ready-for-dev
last_updated: 2026-05-14
epic: 3
---

## Summary

Create optimized static fallback images for 3D scenes and place them in `public/images` to be used when the 3D canvas is not loaded.

## Acceptance Criteria
- Static images exist in `public/images/` with responsive sizes and are referenced by the demo components.

## Developer Context
- Ensure image filenames match what `ThreeDCanvas` consumer expects.

## Technical Requirements
- Provide WebP and JPEG fallbacks, include `srcset` where relevant.

## Testing Requirements
- Visual verification on slow network and when WebGL unavailable.

## Status
ready-for-dev
