# Editing marketing copy

This document explains how marketing can update copy used on the landing page.

Files

- `content/marketing-copy.json` — primary editable file containing hero and benefit text.

Workflow

1. Edit `content/marketing-copy.json` with the desired strings for `heroTitle`, `heroSubtitle`, `ctaText`, and `benefitCards`.
2. Commit changes to the repo and trigger a new build (or run `next build` locally).
3. The landing page reads the file at build-time and displays the updated copy.

Notes

- Keep the file small and only include the fields documented.
- For runtime editing or a CMS, please open a ticket to discuss a lightweight JSON store or headless CMS integration.
