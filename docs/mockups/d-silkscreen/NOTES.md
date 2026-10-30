# Design D: Silkscreen

On these screens, **the printed circuit board** becomes **the interface**. The user is looking at a board, not at a web page.

## The idea, carried through

- The whole page is one board: a silkscreen outline with four copper-ringed mounting holes, on a matte solder-mask ground (green, or black via the `MASK` toggle). A faint fibreglass weave is the only texture. Nothing moves.
- Everything is drawn in the three materials a board has: silkscreen white for outlines and type, copper for the live thing (active trace, selected pad, links, the primary action as a copper pour), tin grey for secondary. The only other colour is the pin-convention marks on the chip: a filled red-orange square for power, a blue diamond for clock, the three-bar ground symbol in tin.
- Areas are component outlines with their label breaking the line, as on real silkscreen. Headings are designators: `U1 TED`, `TP3 Master clock`, `J1 Pinouts`.
- Two faces, both self-hosted in `fonts/`: Barlow Condensed for silkscreen labels and prose, Share Tech Mono for signal names, pin numbers, designators and values.

## What to look at

- **Home**: the title block, a search field drawn as an edge connector (gold fingers under the input), and every machine as a module footprint grouped by brand. Fitted machines (C16, Plus/4, IIe) have copper pads and a solid outline; the rest are dashed outlines marked `ON PAPER` or `NOT FITTED`. "Last on the bench" lists recent machines by designator.
- **Machine page (C16)**: the chips laid out as horizontal DIP footprints with their board designators (`U1 TED`, `U2 7501`, `U7 6529`...), fed from a vertical copper bus by short stubs. Tap a footprint for the chip. `TEST POINTS` lists rails and clocks as TP1..TPn with expected values; `TROUBLESHOOTING` maps symptom to designator, each designator a tap target into the pinout. The `J1 PINOUTS` door is a copper pour; that is the primary action.
- **Chip page (TED, pin 10)**: the DIP is a footprint seen from above, round pads with a square pad 1, pin numbers inside the body and signal names along the pads. The selected pad turns copper and a chamfered copper trace is routed from it to the `PIN DETAIL` box (around the top or bottom of the chip, whichever is nearer, when the pin is on the far side). `VIEW: TOP / BOTTOM` flips the footprint and re-routes the trace. Pin-type names filter the drawing. A full `PIN LEGEND` under the drawing is also tappable.
- **Quick reference (IIe)**: three jumper-style tabs; the active one has the copper shunt fitted. Key combos are drawn as keycap outlines, BASIC essentials as a two-column silkscreen legend, the rest in expandable groups, the memory map as a copper rail with vias.
- **Search**: edge-connector field, results grouped with designator prefixes (`U1.10 TED pin 10 /RAS`). `/` or Ctrl+K focuses it from anywhere; arrows and Enter navigate on the search page.
- **Phone (390)**: single column, footprints in two columns, pin detail as a fixed bottom panel above a fixed edge-connector bar (Home / Chips / Ref / Search / More) whose active finger is copper.
- `verify: true` data is marked with a small silkscreen `CHECK` stamp, as a QC inspector would.

## Test path

Home → Commodore → C16 → U1 TED → pin 10; Home → Apple → IIe → Quick reference; search "ras". Clicked through at 1280, 1024×768 and 390 with zero console errors.

## Unfinished

- Pin pads on the big DIP are on a 38 px pitch, so the tappable row is 38 px tall (the hit area is the full 126 px wide name-plus-pad strip). 44 px would make a 48-pin TED over 1100 px tall; this is the compromise.
- The pin-to-detail trace is drawn on desktop and tablet only; on the phone the pad turns copper and the panel slides up, no trace.
- Board layout on the machine page is schematic (rows by data order), not the real board placement. Designators come from `location`; where the sheet records a range (`U5, U6`) only the first is shown.
- Both masks are dark, so `prefers-color-scheme: light` has no light composition; the mask toggle is the manual choice.
- Glossary terms in prose are auto-linked by matching the term's own words; a few pins mention a term without using its name and only get the `TERMS` row under the description.
- The bottom panel on phone has no drag-to-dismiss, only the close button, scrim tap and Esc.
