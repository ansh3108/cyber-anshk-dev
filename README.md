# anshk.tech

My personal website — maximalist edition ██████

## Theme

Neo-brutalist maximalism: 3–4px pen-colored borders everywhere, hard offset
shadows, deliberately clashing accents (grape / acid green / flamingo pink /
sun yellow / neon blue), rotated sticker chips, marquee bands, and a film-grain
overlay. Ships with both themes — cream paper for light, deep walnut for dark —
via the toggle in the top nav (dark mode is warm brown, never pure black).

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (design tokens + component classes live in `app/globals.css`)
- Motion for reveal animations, `cmdk` for the ⌘K palette
- Fonts via `next/font/google`: Archivo Black (display), Inter (body),
  Instrument Serif (accents), JetBrains Mono (labels)

## Structure

- `lib/config.ts` — all displayed content (links, projects, experience, skills)
- `app/page.tsx` — one-page home (hero, about, works, experience, ecosystem,
  activity, contact)
- `app/projects`, `app/resume` — secondary pages, now linked in the top nav
- `app/api/github`, `app/api/solana` — data endpoints (not consumed by any UI yet)

## Easter egg

↑ ↑ ↓ ↓ ← → ← → B A — a cat chases your cursor.

## Stickers

The `Sticker` component (`components/Sticker.tsx`) is the signature chip used
across the site; `TechBadge` (components/tech-icon.tsx) gives every technology
a deterministic color + rotation based on its name.
