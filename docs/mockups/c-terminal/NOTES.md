# Variant C: Terminal

Dark bench mode with restrained retro cues. One file, `index.html`, loads `../shared/data.js`. Open it by double-clicking; everything is hash-routed.

## What is distinctive

- **Command line on every screen.** The `>` prompt at the top is the search. It understands mini-syntax as well as plain substring search:
  - `ted pin 10` jumps straight to that pin (shows as a `go` result at the top).
  - `/ras` searches signal names only (leading slash = pin mode) and also matches glossary terms.
  - `c16 keys`, `2e basic`, `plus4 ports` open a section of a machine.
  - `poke`, `reset`, `pin 40` fall through to grouped results across chips, pins, BASIC, keys, memory map, terms, connectors and faults.
  - `/` or Ctrl/Cmd+K focuses it, arrows move, Enter opens, Esc closes. Enter with no selection goes to `#/search?q=`.
- **Boot-menu home.** Brand tiles carry `[1]`..`[7]` key hints and the digits work. Brand pages number their machines the same way. Machine pages take `P Q C V F` as letter keys for the menu.
- **Hybrid pinout.** Compact SVG DIP glyph (notch up, pin 1 marked with a square cap, ticks coloured by pin type) on the left, dense pin table on the right (num, name, dir, type, one-line function). Hovering or tapping either side highlights both; the glyph is sticky while the table scrolls. Table sorts by pin number or name; a `from above / from below` toggle mirrors the glyph. On phones the glyph collapses to a horizontal pin strip above the table.
- **Right drawer (40%)** for pin detail, term definitions and chip summaries, with a history stack (pin -> term -> back to pin). Below 1024 portrait and on phones it is full screen with a back arrow. Pin selection writes `?pin=N` into the hash with `replaceState`, so pin links are shareable without polluting history.
- **Glossary terms** are dotted-underline buttons. Tap opens a small popover with the short definition; `full definition` escalates to the drawer, which also lists every pin that uses the term.
- **Machine page** is a tight CPU/RAM/ROM/VIDEO/SOUND/OS key-value block, the `[P] [Q] [C] [V] [F]` menu, first-look bullets, and a symptom -> suspect-chips table whose chip buttons open the chip summary in the drawer (with "open pinout").
- **Power page** linkifies "TED pin 14", "7501 pin 40", "TED pins 10, 11", "CPU pin 8" straight to the pin on the drawing.
- Amber phosphor accent by default, `[amber]` toggles to green and persists. Nothing animates continuously; only the drawer slide and tile border colour transition, both disabled under `prefers-reduced-motion`.

## Test path (verified in Chromium, zero console errors)

Home -> `1` -> `4` -> `P` -> TED -> pin 10, and Home -> `2` -> `3` -> `Q`. Also every route in the brief, stub machines (CoCo 3, C64), chips with `pins: null`, a bad path, and phone (390), tablet portrait (820x1180) and tablet landscape (1180x820) viewports.

## Known gaps

- Dark theme only. `prefers-color-scheme: light` is not honoured; the brief's minimum was met by being dark, but there is no light variant or manual light toggle.
- The search is substring plus all-words matching, not true fuzzy matching (no typo tolerance).
- Glossary terms are shown as related-term chips under descriptions; they are not auto-linked inline inside prose.
- Glyph touch targets are the full 30-unit pin pitch (about 28 px tall on a 300 px wide glyph), under the 44 px rule on tablets. Phones use the 52x56 px strip cells instead, which do meet it.
- The `installed · works offline` indicator is static text; there is no manifest or service worker, per the brief.
- Connector search results scroll to and outline the connector on the ports page rather than opening it in the drawer.
