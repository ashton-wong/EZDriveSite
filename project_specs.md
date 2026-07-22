# MotorLink Landing Page — Project Specs

## What the app does
A single-page marketing/landing site for MotorLink — an OBD-II scanner + app that translates cryptic car fault codes into plain English. Visitors can learn about the product, see pricing, and pre-order via a form.

## Who uses it
Car owners (1996+ gas vehicles) who want clarity on warning lights without needing mechanic expertise. Three customer segments: Solo (1 car), Family (up to 4 cars), and Fleets (SMB).

## Tech Stack
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS + CSS custom properties (design tokens)
- **Animations:** GSAP 3 with ScrollTrigger plugin
- **Fonts:** Fraunces (display, via Google Fonts), Inter (body)
- **Deployment:** Vercel

## Pages
- `/` — Single landing page with all sections

## Sections (top to bottom)
1. **Nav** — Sticky, links to sections, "Get MotorLink →" CTA button
2. **Hero** — Headline, subtext, CTAs, trust strip, OBD animation card
3. **Features** — 3×2 grid of coloured feature cards (Pink, Teal, Lavender, Peach, Ochre, Cream)
4. **Benefits** — Split: smart triage mock UI left, benefit bullets right
5. **Pricing** — Two cards (Solo, Family) + wide Fleets row, on dark background
6. **Compatibility** — Split: copy left, 4×3 car brand grid right
7. **Pre-order** — Dark section with a 4-field form (Name, Email, Plan dropdown, Phone)
8. **Footer** — 4-column link grid + social icons

## Animations (GSAP)
- Hero: staggered entrance on load (eyebrow → h1 → lead → CTAs → trust → card)
- Hero OBD card: vanilla JS animation loop (OBD codes → particles → English output), 5s cycle
- Features: ScrollTrigger stagger cards in from below
- Benefits: ScrollTrigger slide triage cards in from left, benefit items from right
- Pricing: ScrollTrigger scale+fade cards in
- Compatibility: ScrollTrigger stagger brand tiles
- Pre-order: ScrollTrigger fade in form
- Nav: slides down from top on load

## Tech Stack (updated)
- **Database:** Vercel Postgres / Neon (`@neondatabase/serverless` — Vercel migrated their Postgres product to Neon)
- **API:** Next.js Route Handler at `/app/api/preorder/route.ts`

## Data models

### `preorders` table (Vercel Postgres)
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PRIMARY KEY | auto-increment |
| name | VARCHAR(255) | required |
| email | VARCHAR(255) | required |
| plan | VARCHAR(50) | Solo / Family / Fleet |
| phone | VARCHAR(50) | optional |
| created_at | TIMESTAMP | defaults to NOW() |

## API Routes
- `POST /api/preorder` — validates fields, inserts a row into `preorders`, returns `{ success: true }`

## Environment Variables Required
- `POSTGRES_URL` (and related Vercel Postgres vars) — set automatically when you link a Vercel Postgres DB in the Vercel dashboard

## What "done" looks like
- `npm run build` passes with no TypeScript errors
- `npm run dev` serves at localhost:3000 with all sections rendered
- All GSAP animations trigger correctly on scroll and page load
