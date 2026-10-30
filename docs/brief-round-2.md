# Retro Bench — round 2 brief: three designs that are not a line-of-business app

Read `mockups/BRIEF.md` for the product, the audience and the data model (`../shared/data.js`,
`window.RCS`). This brief replaces its visual guidance. The user has seen the clean-tool version
(`mockups/a-bench`, `app/`) and wants three designs that **do not read as business software** but stay
fully functional and easy to use at a bench, on an iPad or iPhone, with dirty fingers.

## Banned: the line-of-business kit
None of these may appear, in any form:
- A left sidebar or rail with a tree of nav items and a grey active pill.
- A grid of white cards with 1px borders on an off-white ground.
- A 24px title row with a subtitle and a near-black primary button at the right.
- Status pills, badges, "chips" with pale tints. Say it in words or with a mark from the design's own
  vocabulary instead.
- Tables with 12px grey headers and hairline rows as the main way to show data.
- Generic sans (Inter, Geist, system-ui) as the display face. One or two faces with character,
  self-hosted as woff2 in your folder (download from Google Fonts with a browser UA; no CDN at
  runtime). Body text may fall back to a system face.
- Soft shadows, 8-16px radii on everything, gradients as decoration, glass blur.
- Icon-in-tinted-square, sparkline, KPI tile, dashboard anything.
- Continuous animation of any kind (no CRT flicker, blinking cursor, scanlines that move, pulsing
  LEDs). Static texture is fine. Transitions on open/close are fine and must respect
  `prefers-reduced-motion`.

## Required, still
- Routes: `#/` home, `#/<brand>`, `#/<brand>/<machine>`, `#/<brand>/<machine>/pinouts`,
  `#/<brand>/<machine>/chip/<chipId>` with pin selection (`?pin=N`), `#/<brand>/<machine>/quickref`,
  `#/<brand>/<machine>/ports`, `#/<brand>/<machine>/power`, `#/search?q=`, `#/glossary`, `#/resources`.
  The two deep machines are `c16` and `apple2e`; Plus/4 reuses C16 data; the rest degrade gracefully.
- Tap a pin → its detail (number, name, direction, type, description, active-low, probe hint,
  glossary terms, datasheet links). Tap a glossary term → its definition in place.
- Pinouts reachable in one tap from the machine page. A search that spans chips, pins, BASIC, keys,
  terms. Touch targets 44px. Desktop ≥1024, tablet, phone ≤480: each its own composition.
- Real content only, from data.js. `verify: true` data is marked in the design's own vocabulary.
- One self-contained `index.html` (inline CSS/JS, `<script src="../shared/data.js">`), fonts in a
  `fonts/` subfolder, a `NOTES.md` saying what the idea is, what to look at, and what is unfinished.
- Zero console errors. Click through: Home → Commodore → C16 → TED → pin 10; Home → Apple → IIe →
  quick reference; search "ras". Check 1280, 1024×768, 390 widths.

## The idea must come from the subject
Each design has one sentence: "On these screens, **[something from the tech's world]** becomes
**[the interface]**." Carry it into every screen including search, glossary and resources. The
test: if the design would work unchanged for an invoicing app, it is not done.
