# Retro Bench PWA — mockup brief (shared by all three prototypes)

## Who it is for
An amateur bench-repair tech working on 8-bit computers, with an iPad or iPhone on the bench
and sometimes a desktop. Also someone who hasn't touched a given machine in years and wants
to get back up to speed quickly. Offline-first PWA (mock the install/offline state; no service
worker needed in the mockup).

## Deliverable
One self-contained `index.html` in your assigned folder. It loads the shared data with
`<script src="../shared/data.js"></script>` (read that file first; `window.RCS` exposes
`terms, pinTypes, chips, symptoms, connectors, power, quickref, brands, machines, resources`).
Everything else (CSS, JS, SVG) inline. No CDN, no web fonts, no external requests. System font
stacks only. Must work by double-clicking the file (file:// URL, hash routing).

## Required screens (hash routes)
- `#/` Home: soft entry. Brand picker (Commodore, Apple, Atari, Coleco, Sinclair, TI, Tandy)
  plus a global search entry point and "recent / pinned" machines. Not an information dump.
- `#/<brand>` Machine picker for the brand (e.g. PET, VIC-20, C64, C16, Plus/4, C128). Show
  status: `ready` (full data), `sheet` (cheat sheet exists, not yet in app), `planned`.
- `#/<brand>/<machine>` Machine overview: a calm landing with quick facts, the "first look"
  bullets, and clear doors to Pinouts, Quick Reference, Ports & Connectors, Power & Test Points,
  and a "Common faults" strip (from `symptoms`). Pinouts must be reachable in **two taps from
  the machine page at most** (one is better).
- `#/<brand>/<machine>/pinouts` Chip list for the machine (name, role, package, heat badge,
  failure modes). Chips with `pins: null` show as "not captured yet".
- `#/<brand>/<machine>/chip/<chipId>` The pinout. Tapping a pin opens a **side panel**
  (desktop/tablet) or **bottom sheet** (phone) with: pin number, name, direction, type,
  description, active-low badge if set, probe hint if set, related glossary terms, datasheet
  links. Pins colour-coded by `type`. Pin 1 / notch orientation obvious. Include a
  "flip" or "from below" toggle if it fits your design (nice to have).
- `#/<brand>/<machine>/quickref` Keys & quirks, BASIC essentials (level 1) with expandable
  groups (level 2), memory map. Two levels of depth, never a wall of text.
- `#/<brand>/<machine>/ports` Connector pinouts from `connectors`.
- `#/<brand>/<machine>/power` Rails and test points from `power`.
- `#/search?q=` Search beyond Ctrl+F: fuzzy/substring across chips, pins (e.g. "/RAS",
  "pin 40"), BASIC commands, keys, glossary terms, connectors. Grouped results, deep links.
  Keyboard: `/` or Cmd/Ctrl+K focuses search, arrows + Enter navigate.
- `#/resources` Appendix of external links grouped general / per brand.
- `#/glossary` All terms.

Deep data exists only for **C16** (`c16`) and **Apple IIe** (`apple2e`); Plus/4 reuses C16
chips. Other machines render from stub data and should degrade gracefully.

## Interaction rules
- Glossary terms inside pin descriptions and elsewhere are **tap-to-open popovers** (not
  hover-only). Dismiss on outside tap or Esc. Mark them visually (dotted underline or chip).
- Touch targets >= 44 px. Pins on the chip drawing must be tappable on a phone.
- Responsive: desktop (>= 1024), tablet (768–1023, both orientations), phone (<= 480).
- Respect `prefers-reduced-motion`. **No continuously repainting animations** (no pulse,
  shimmer, spinners, blur loops). Transitions on open/close are fine.
- Show `verify: true` data with a small "verify" badge: the sheets flag reconstructed data.
- Mock a PWA status: "Installed · works offline" indicator somewhere unobtrusive.
- Dark mode: at minimum honour `prefers-color-scheme`; a manual toggle is a plus.

## Quality bar
- Real content from data.js everywhere; no lorem ipsum.
- Clean, readable typography; generous spacing; strong grouping. Easy to scan at arm's length.
- Vanilla JS, one file, under ~2500 lines. Render functions per route; simple hash router.
- Test: open in a browser, click through Home → Commodore → C16 → Pinouts → TED → pin 10,
  and Home → Apple → IIe → Quick Reference. Fix any console errors.

## Your variant (see the prompt you were given)
Each prototype has a different visual direction and a different pinout drawing style.
Make the differences real and opinionated so the user can pick and choose.
