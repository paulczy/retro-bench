# Retro Bench — PWA mockups

Three clickable prototypes of the same app, built on one shared data model, so features can be
mixed and matched into the primary prototype. Open `index.html` in this folder for a launcher
with desktop / iPad / iPhone frames, or open each `*/index.html` directly.

| | A · Bench Console | B · Field Manual | C · Terminal |
|---|---|---|---|
| Look | Clean modern tool, light + dark | Warm paper and ink, "dim lamp" dark | Dark only, amber or green phosphor |
| Shell | Left rail · content · always-open inspector | Single column · breadcrumb · section index | Command line on top · content · right drawer |
| Pinout | SVG DIP drawing, legend doubles as filter, flip to underside, list fallback | Two mirrored signal tables with colour bars and filter chips, small DIP glyph | Hybrid: sticky chip glyph synced with dense sortable table |
| Pin detail | Right inspector / bottom sheet | Margin note callout / bottom sheet | Right drawer (40%) / full screen |
| Search | Command palette (Ctrl+K), live Home field | Full-page index with kind filters | Persistent `>` prompt with mini-syntax (`ted pin 10`, `/ras`, `c16 keys`) |
| Navigation aids | Rail tree with status dots, bottom tab bar on phone | Numbered sections, "Contents" button on phone | Number keys for brands/machines, letter keys P Q C V F |
| Deep links | `…/chip/ted7360?pin=10` | `…/chip/ted7360/10` | `…/chip/ted7360?pin=10` |

Shared pieces (all three): hash routing, tap-to-open glossary popovers, `verify` badges on
reconstructed data, recent and pinned machines, Plus/4 reusing C16 data, stub machines that
degrade gracefully, no web fonts or CDN, no continuously repainting animation.

## Folders

- `shared/data.js` — the data model: brands, machines, chips with full pin tables (TED 7360,
  7501, 6529, 6551, 4164, 6502, MMU 344-0010, IOU 344-0020, AY-5-3600), glossary of 35 terms,
  symptom tables, connectors, power rails and test points, quick reference (keys, BASIC, memory
  map) for the C16 and Apple IIe, resources appendix.
- `BRIEF.md` — the requirements every prototype was built against.
- `a-bench/`, `b-datasheet/`, `c-terminal/` — one `index.html` + `NOTES.md` each.
- `screenshots/` — desktop, tablet and phone captures of each.

## Data caveats

Pin tables for the 7501 and TED follow the Plus/4 Technical Manual as transcribed on the repo's
sheets. The MMU and IOU pinouts come from the reverse-engineering project the sheets cite.
Connector pinouts, the C16 power plug and a few key combinations are marked `verify: true` and
show a badge in every prototype. Nothing here has been re-checked against a physical board.

## Round 2: three designs that are not a line-of-business app

Built against `BRIEF2.md`, which bans the sidebar + cards + tables kit. Same data, same routes.

| | D · Silkscreen | E · Service Manual | F · Instrument |
|---|---|---|---|
| Idea | The circuit board is the interface | A 1983 factory service manual opened flat | A bench analyzer with one display and soft keys |
| Look | Solder-mask green or black, silkscreen white, copper for the live thing | Paper and ink, one orange-red spot colour, big numbered figures | Putty-grey panel, amber or green phosphor display |
| Type | Barlow Condensed + Share Tech Mono | Archivo + IBM Plex Mono | B612 (panel) + Share Tech Mono (display) |
| Navigation | Breadcrumb traces, footprints with designators, phone edge-connector bar | Contents with dotted leaders, section numbers, phone sticky line | Soft keys per screen, function keys, rotary machine knob |
| Pin detail | Copper trace from the pad to a silkscreen box | Leader line to a numbered margin callout | Scope-style cursor readout under the drawing |
| Verify marker | `CHECK` stamp | † dagger | `UNCAL` annunciator |
| Folder | `d-silkscreen/` | `e-manual/` | `f-instrument/` |
