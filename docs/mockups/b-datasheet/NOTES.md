# Variant B — "Field Manual"

Open `index.html` directly (file://). Loads `../shared/data.js`; everything else is inline.

## What is distinctive

- **Paper and ink.** Cream paper, ink text, one oxblood accent used only for section numbers, links and the active pin. Charter/Georgia for everything readable; monospace only where a bench tech reads a signal, a pin number or an address. Dark mode is a "dim lamp": warm brown paper, not black. Toggle in the top bar (`Dim lamp` / `Daylight`), remembered in localStorage, follows the OS when untouched.
- **Numbered like a manual.** Every page is a title block plus numbered sections (1, 2, 2.1, 2.2.3). The section index on the right (desktop) is generated from those headings and highlights as you scroll. On tablet it collapses to a `Contents` dropdown under the title; on phone it is a floating `Contents` button that opens a bottom sheet.
- **Breadcrumb trail** in the sticky top bar: Home › Commodore › C16 › Pinouts › TED. Tablet keeps the last three crumbs, phone the last two.
- **Pinout as a two-column signal table.** Left table is pins 1–N/2 top to bottom; right table is pins N down to N/2+1 with its columns mirrored (Dir, Signal, Pin, colour bar on the outer edge), so the pair reads like the chip itself. Colour bars down the outer edges group pins by type and join across adjacent rows. Filter chips above (with counts) dim non-matching rows rather than hiding them, so the physical layout never shifts. A `From above / From below` toggle swaps the tables and redraws the glyph.
- **Chip glyph.** A small schematic DIP drawing sits in the title block; a larger one in section 1 has pin stubs coloured by type, pin-1 dot, corner pin numbers and the notch, so orientation is never in doubt.
- **Margin note.** Tapping a row opens a datasheet-style callout: on desktop it docks into the right margin above the section index (sticky, scrolls with you); on tablet it is a right-hand drawer; on phone a bottom sheet. It carries direction, type, description, active-low badge, probe hint, glossary chips, datasheet links and prev/next pin buttons. The URL updates to `#/…/chip/ted7360/10` so a pin is deep-linkable.
- **Search as an index.** Full-page results with the query in the title, filter chips per kind (Chips, Pins, BASIC, Keys, Terms, Ports) with counts, and entries written like an index: `TED, pin 10 /RAS — DRAM Row Address Strobe.` with a "where" line beneath. `/` or Ctrl/Cmd+K focuses the header box anywhere; ArrowDown from the box walks the entries, Enter opens.
- **Machine page** is a manual's first page: title block (name, aka, year, tagline, status, pin-to-home), At a glance as a two-column definition list, First look as a numbered list, then a Contents of the five doors with one-line descriptions and counts, and the Common faults table. Pinouts are one tap away.
- **Glossary popovers** on dotted terms everywhere (pin notes, connector sections, the pinouts legend). Tap to open, Esc or outside tap to close, link through to the glossary entry.
- `verify` badges on reconstructed data; `?` marks in the pin table; `Installed · works offline` in the colophon.

## Where to look

1. `#/` → Commodore → C16 → Pinouts → TED → tap pin 10 (desktop, then shrink the window to see the drawer and sheet).
2. Filter chips on the TED table (Control, then Show all); `From below` toggle.
3. `#/search?q=ras` and `#/search?q=pin 40`; try the kind chips and arrow keys.
4. `#/apple/apple2e/quickref` — expandable 2.2.n word lists.
5. `#/atari/atari800` — stub machine degrading gracefully.
6. Toggle `Dim lamp`.

## Known gaps

- Test-point and rail text ("TED pin 14") is not auto-linked to the pin note; it is plain text with a pointer to the Pinouts page.
- Search is substring/all-tokens with simple ranking, not fuzzy (no typo tolerance).
- Connector pin tables are plain tables; no drawing of the DIN/edge connector.
- No service worker; the offline indicator is a static mock as the brief allows.
- The desktop margin note pushes the section index down rather than overlaying it; on very short desktop windows the rail scrolls.
