# Design E — "Service Manual"

On these screens, **the manufacturer's 1983 service manual** becomes **the interface**: numbered
sections and figures, callouts with leader lines, one spot colour, paper white and black ink.

## The idea, carried through

- The whole app is one numbered document. Section 1 is "Before you start"; Sections 2–8 are the
  brands (2 Commodore, 3 Apple …); machines are 2.4, 3.3 and so on; each machine has four
  sub-sections (.1 Components and pinouts, .2 Ports and connectors, .3 Power and test points,
  .4 Operation). Chips are figures: Fig. 2.4-1 is the component list, Fig. 2.4-2 is the TED
  pinout, connectors continue the figure numbering. Glossary is Appendix A, references
  Appendix B, search is the Index ("Look up").
- The running header reads `RETRO BENCH · SERVICE MANUAL · SECTION 2.4 · COMMODORE 16` and the
  footer is a page-number-like `— Section 2.4 · Commodore 16 —` plus the installed/offline line.
- Numbers in the spot colour (Commodore/Tandy cover orange-red `#d9532b`) are the links. The spot
  colour is used for section numbers, the active item, the callout tab and the leader line only.
- The pin convention is drawn in black marks, not colour: filled dot = supply, hollow dot =
  ground, triangle = clock, overline = active low (RAS with a bar instead of /RAS).
- `verify: true` data carries a dagger (†) and the footnote in the footer explains it, the way a
  manual flags an erratum.
- No sidebar, no cards, no hairline tables. Lists are manual-style with hanging numbers or
  letters; separation is by white space, scale and the occasional 3 px rule.

## Fonts

Archivo (variable, 400–800) for headings, numbers and running text; IBM Plex Mono 400/600 for
signals, commands and values. Both self-hosted in `fonts/` (latin subsets). The Greek Φ in
"Φ2" falls back to the system mono.

## What to look at

1. **Home (`#/`)**: the cover. Title set huge, "Look up:" as an index line, then CONTENTS as a
   two-column list with dotted leaders to COMPLETE / SHEET ONLY / PLANNED, then Section 1.
2. **`#/commodore/c16`**: spec sheet with big labels and mono values, "In this section" with
   leaders, Fig. 2.4-1 Major components (the figure numbers are the pinout links), the
   troubleshooting chart (symptom → component numbers), First look as lettered notes.
3. **`#/commodore/c16/chip/ted7360?pin=10`**: the figure. Tap a pin number or name: on desktop
   (≥1024) a leader runs from the signal name out to a numbered callout box in the margin,
   aligned to the pin (left-side pins route over the top of the figure, like a real manual);
   below 1024 the leader runs down the figure's edge to a callout beneath. "View from below
   (component side down)" mirrors the package. The pin-functions list below the figure also
   selects pins. Glossary terms open a boxed NOTE in place; Esc or outside tap closes it.
4. **`#/apple/apple2e/quickref`** (Section 3.3.4 Operation): keystrokes in boxes, BASIC
   essentials with hanging commands, groups that fold open (B.1 … B.10), the memory map drawn as
   stacked blocks with hatching for ROM and ruling for I/O.
5. **`#/commodore/c16/power`**: rails as a spec list, test points as TP1…TP6 callouts in probing
   order.
6. **`#/search?q=ras`**: an index page; every hit shows the figure or section it lives in
   (Fig. 2.4-2, pin 10). `/` or Ctrl/Cmd+K jumps to it, arrows + Enter navigate.
7. **Phone (≤700)**: same manual at phone width; the sticky bottom line reads
   CONTENTS · SECTION · FIG. · LOOK UP. Pin pitch stays at 44 px so pins are tappable.

## Unfinished / known gaps

- Dark mode is not implemented (the brief for this design did not require it).
- The pin figure is a fixed-pixel SVG (not scaled), so a DIP-48 is tall (~1100 px). That is
  deliberate for touch targets, but it means scrolling on a short viewport. Tablet landscape
  (1024×768) shows the callout beside the figure; you scroll to it when the pin is low.
- Connector figures are legends only: there is no drawing of the plug face yet.
- Bookmarks are a simple toggle on each machine page; recents and bookmarks share the cover.
- Pin-selection does not animate the leader; only the glossary note has a fade transition
  (disabled under `prefers-reduced-motion`).
- Search results are capped at 8 per group and have no "show more".
