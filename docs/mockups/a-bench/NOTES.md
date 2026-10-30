# Variant A: Bench Console

Open `index.html` directly (file://). Loads `../shared/data.js`; everything else is inline. About 1,000 lines, vanilla JS, hash router.

## What is distinctive

- **Three-column desktop**: left rail (brand → machine tree with status dots, collapsible per brand, state remembered), centre content, and a right **inspector that is always open**. The inspector is contextual: pin detail on a chip page, chip summary before a pin is tapped, machine facts and usual suspects on a machine page, brand resources on a brand page, bench notes and the pin-type legend on Home.
- **SVG DIP drawing**, top view, notch up, pin 1 dot top-left. Pins run down the left and up the right exactly as the data orders them; the right column is derived (pin n at top-right), not hand-placed. Stubs are colour-coded by `type` with a legend that doubles as a filter (tap Power and everything else fades to 22%). Numbers sit inside the body, names outside in monospace, and the chip's short name and package are set vertically inside the body.
- **Flip (view from below)** mirrors the layout and swaps the body to a dashed outline with a caption so you cannot mistake it for the top view. Resets when you open a different chip.
- **Diagram / List** segmented control. The list view gives 44 px rows for fat-finger use on a phone and keeps the same selection and filter state.
- **Command palette** on `/` or Ctrl/Cmd+K: grouped results (Machines, Chips, Pins, BASIC, Keys, Memory, Glossary, Connectors), arrow keys and Enter, deep links such as `#/commodore/c16/chip/cpu7501?pin=40`. The Home and `#/search` fields use the same index and update live as you type.
- **Machine page**: header card with quick facts and a Pin toggle, five door tiles with live counts ("4 of 5 chips drawn", "2 rails, 6 test points"), first-look bullets, then a horizontally scrolling symptom strip whose suspect chips link straight to the pinout. Pinouts are one tap away.
- **Quick reference** as in-page tabs (Keys / BASIC / Memory, deep-linkable with `?tab=`). BASIC essentials are a two-column table; the long groups are native `<details>` disclosure rows with item counts.
- **Responsive**: tablet collapses the rail to a 64 px icon strip (brand abbreviations C=, Ap, At, Cv, ZX, TI, TR) and the inspector slides in from the right with a Details button and close control; phone gets a five-item bottom tab bar (Home, Pinouts, Quick ref, Search, More) and pin detail as a bottom sheet with a real drag-to-dismiss handle.
- **Dark mode** toggle in the rail footer and on the More tab, persisted in localStorage; follows `prefers-color-scheme` until you choose. Pin colours are retuned per theme so Ground and NC stay legible.
- Glossary terms are tap-to-open popovers (dotted underline chips), dismiss on outside tap or Esc, with an "Open in glossary" link. `verify: true` data carries a small amber badge. Recent and pinned machines persist. "Installed · works offline" lives quietly in the rail footer, Home, and More.
- Plus/4 reuses C16 quick reference, symptoms, connectors and power with a one-line "shown from the Commodore 16 sheet" note. Stub machines render their facts and show "Not captured yet" states on each door instead of empty pages.

## What to look at

1. Home → Commodore → Commodore 16 → Pinouts → TED → pin 10. Watch the inspector switch from chip summary to pin detail; try the Power legend chip, then Flip, then the List view.
2. Press `/`, type `pin 40`, arrow down, Enter.
3. Resize to about 800 px wide (tablet) and tap a pin; then to 390 px and tap a pin, drag the sheet handle down.
4. Toggle dark mode in the rail footer; reload to confirm it sticks.
5. Apple → Apple IIe → Quick reference → BASIC tab → open "Monitor (CALL -151)".

## Known gaps

- Pin hit targets on the diagram are 114 × 32 px, not 44 px tall; the 48-pin TED would otherwise be over 1,000 px tall on a phone. The List view provides proper 44 px rows as the fallback.
- Glossary terms are shown as "Related terms" chips under each pin rather than auto-linked inside the sentence, because the data carries a `terms` array rather than inline markup.
- No service worker or manifest; the offline indicator is static as the brief asked.
- Search is substring with simple ranking (exact, prefix, contains, keyword, description); no typo tolerance.
- Pinning a machine re-renders the whole page, which scrolls to the top.
- The `#faults` door is an in-page scroll, not a route.
