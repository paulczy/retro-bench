# Retro Bench

An offline-first web app for the 8-bit repair bench: chip pinouts you can tap, test points and
rails, connector pinouts, keyboard quirks and BASIC quick reference for the classic home
computers. Built for an iPad or iPhone propped on the bench, and for the desktop.

## Design: Silkscreen

The circuit board is the interface. The page is one board: a silkscreen outline with four
copper-ringed mounting holes on a matte solder mask. Everything is drawn in a board's three
materials: silkscreen for outlines and type, copper for whatever is live (the selected pad, the
trace to its detail, links, the primary action as a copper pour), tin for secondary text. The only
other colours are the pin marks: a filled square for power, a diamond for clock, three bars for
ground. Nothing moves; transitions only, and none under `prefers-reduced-motion`.

- **Home**: title block, a search field drawn as an edge connector, every machine as a module
  footprint grouped by brand: solid with copper pads when fitted, dashed and marked `ON PAPER` or
  `NOT FITTED` otherwise.
- **Machine**: chips as DIP footprints with their board designators on a copper bus, `J1`–`J4`
  doors (Pinouts is the copper pour), `TEST POINTS`, `TROUBLESHOOTING`, `FIRST LOOK`.
- **Chip**: the footprint seen from above, square pad 1, names along the pads. Every pad row is a
  44 px target at every width; the drawing never scales down. The selected pad turns copper and a
  chamfered trace runs to the `PIN DETAIL` box; below 768 px the detail is a bottom panel and the
  trace runs to its copper top edge. `VIEW: TOP / BOTTOM` flips it. Tab reaches every pad, Enter
  or Space selects. Reconstructed data carries a `CHECK` stamp.
- **Ports and power**: every connector with a `geo` is drawn the same way: round DIN and mini-DIN with
  the key at the bottom, D-sub, card edge with its key slots, RCA, F, barrel, TRS, or a custom pad map.
  Pads are 44 px targets with the pin number inside; tapping a pad or a table row selects it, and a
  copper trace runs round the outside of the connector to `PIN DETAIL` (on a phone, to the bottom
  panel). `VIEW: SOCKET / PLUG` mirrors the drawing from looking into the machine's socket to looking
  at the cable's plug, and the line over the drawing says which gender and which face you are seeing. The
  power page opens with the supply and draws its connector with what each pad should read. A pin is
  linkable as `ports?c=<id>&pin=<n>`. Layouts and their sources live in `src/connectors.js`.
- **Masks**: `MASK: GREEN / BLACK / LIGHT`. Light is bare FR-4 (pale tan, dark silkscreen, deeper
  copper) for bright benches. The app follows `prefers-color-scheme` until you pick; the pick is
  kept in `localStorage`.
- **Keys**: `/` or Ctrl+K opens the finder anywhere (on the search page `/` focuses the field);
  arrows and Enter move through results; Esc closes the popover, panel or finder.

**Waveforms are idealised, never a capture.** A test point or rail with a `scope` block draws a static trace
on a 10 by 8 graticule (silkscreen hairlines, copper trace), built from its `shape` and labelled `IDEALISED FROM
CAPTURE` or `IDEALISED FROM DATASHEET`. The scope settings beside it are derived from two sourced numbers, never
typed in: the period (from `f` or `period`) gives TIME/DIV, the 1-2-5 step whose cycle count across 10 divisions
is closest to 3, within 1.5 to 5 cycles (no 1-2-5 series can hold every period to 2 to 4 cycles);
the swing `high - low` gives VOLTS/DIV, the smallest 1-2-5 step of at least swing / 5 (2.5 to 5 divisions tall).
Coupling is DC with 0 V one division up when the swing fits (AC, with no 0 V marker, when the source gives only a
peak-to-peak `pp`), probe 10x, trigger on the rising edge (falling for `polarity: 'low'`) at 1.4 V (the TTL
threshold) for logic swings that cross it, else mid-swing. A square or pulse wave without a sourced `duty` is drawn
with dashed levels and labelled "duty not in source"; a video line without a sourced `black` level is labelled
"levels to standard ratio, not to scale". The trace sits on the power page under its row (behind
a `SCOPE` disclosure on a phone) and in `PIN DETAIL` of every chip pin its `where` names.

**Print mode.** Every machine page has a `Print card` button, and the browser's own Print does the same: a
`@media print` sheet in `src/input.css` swaps the mask tokens for black on white (copper prints black, silkscreen as
dark grey hairlines), drops the strip, breadcrumb, edge bar, panels and toggles, and prints a card built for paper
instead of the screen: machine name and designator, the chip footprints with their designators, the rails, the first
ten minutes (or the generic order of checks), the clock table and every connector as a line of pin numbers and
names, no drawings. Blocks and table rows never split across a page; the connector list may run on into the next
column one connector at a time. The largest boards (BBC Master, HERO 1) still fit one Letter page.

**Bench notes.** Each machine and chip page ends with a notes field kept in `localStorage` only, under
`rb-note:m:<machine id>` or `rb-note:c:<chip id>` as `{ text, at }`. It saves 600 ms after the last key and at once
when the field loses focus, the route changes or the page is hidden, and says "Saved on this device only". Typing `/` there
types a slash rather than opening the finder. `#/notes` lists every note with a link back, a two-tap delete,
Export (a `.txt` file: one `=== machine c64: Commodore 64 ===` or `=== chip <id>: <name> ===` header per note, a line
starting `===` or `\` escaped with `\`) and Import of the same format, which merges: new notes are added, different
text is appended to the existing note. No sync, no account.

Faces are self-hosted in `fonts/`: Barlow Condensed for labels and prose, Share Tech Mono for
signal names, pin numbers, designators and values (both SIL Open Font License). Tokens, the three
masks and the silkscreen components live in `src/input.css`; chip footprints and trace routing are SVG
drawn in `src/app.js`, connector drawings in `src/connectors.js`.

## Status

Working prototype. 42 machines across ten makers (Commodore, Apple, Atari, Coleco, Sinclair, Timex
Sinclair, Texas Instruments, Tandy/TRS-80, Heathkit HERO robots, IBM), 94 chips of which 59 have
full pin tables, 77 glossary terms. Machines marked `ready` have pinouts, quick reference, ports,
power and test points, and a fault table; `sheet` machines have facts and chip lists from the printed
cheat sheets; `planned` machines are placeholders. See [docs/mockups](docs/mockups) for the six design
explorations and `docs/mockups/index.html` for a launcher that shows them at desktop, iPad and iPhone
sizes. `node scripts/validate-data.mjs` checks every data file.

- **Video signals** (`#/video`, data in `src/data/video.js`): composite levels, NTSC and PAL line and field timing,
  IBM RGBI, analogue RGB, C64 luma/chroma, RF channels and modulator inputs, drawn as one PAL line on a graticule and
  tabled with a source on every row (ITU-R BT.470-6 and BT.1700 with SMPTE 170M, the IBM PC Technical Reference,
  VESA E-EDID, the C64 PRG and service manual, 47 CFR 73.603, the Acorn Electron service manual). Linked from More,
  search, every power page's Clocks block and every connector with video pins.
- **Bench notes** (`#/notes`) and the **print card** on every machine page, described under Design.

## Run

```bash
npm install
npm run build        # src/input.css → dist/app.css
```

Open `index.html`. Hash routing needs no server, and every URL is relative, so it also runs from
`file://` or under a sub-path such as `/retro-bench/`. `npm run watch` rebuilds on change.

## Install and offline

Served over http(s), `sw.js` precaches the whole app (shell, every `src/data/*.js`, CSS, fonts,
icons, manifest) on first visit; after that it runs with no network. The strip reads `Caching…`
until the precache lands, then `Works offline`, or `Installed` when launched from the home screen.
Chrome, Edge and Android show a copper `Install` in the strip; on iPad and iPhone use Safari's
Share, then Add to Home Screen (the More page says so). When a new deploy activates, an open page
shows `Updated, reload`. From `file://` no worker is registered; nothing is needed.

`npm run build` runs Tailwind and then `scripts/build-sw-manifest.mjs`, which reads every local
`href`/`src` in `index.html`, the icons in `manifest.webmanifest` and the fonts in `fonts/`,
and writes that list plus a content hash into `sw.js`. Assets are cache-first; anything else
on the origin is network-first with a cache fallback. A new hash means a new cache; the old one
is dropped on activate. Icons are drawn by `scripts/make-icons.mjs`
(`npm i --no-save @resvg/resvg-js && npm run icons`); the PNGs are committed.

## Deploy

`.github/workflows/pages.yml` builds and publishes to GitHub Pages on every push to `main`:
<https://paulczy.github.io/retro-bench/>. One-time setup: Settings → Pages → Source: GitHub
Actions.

## Layout

- `index.html`, `src/app.js`, `src/input.css`, `fonts/`, `dist/` — the app. `src/data/` is the
  content, one file per brand (see `docs/data-schema.md`).
- `docs/mockups/` — design rounds A–F on a shared data model, each self-contained.
- `docs/brief-round-1.md`, `docs/brief-round-2.md` — what the designs were built against.
- `docs/design-notes/` — notes from the ledger pass that preceded Silkscreen.

## Data accuracy

Pin tables follow the published technical manuals as transcribed on the
[retro-computer-cheetsheets](https://github.com/paulczy/retro-computer-cheetsheets) sheets.
Anything reconstructed from incomplete sources carries `verify: true` and is marked in the UI.
Check against a datasheet before powering anything up. Corrections are welcome as issues or
pull requests.

## Licence

Code is MIT ([LICENSE](LICENSE)). The reference data in `src/data/` and the mockups' shared
data is CC BY 4.0 ([LICENSE-DATA](LICENSE-DATA)), the same terms as the cheat sheets. Product
names and trademarks belong to their owners.
