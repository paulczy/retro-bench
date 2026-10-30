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
- **Masks**: `MASK: GREEN / BLACK / LIGHT`. Light is bare FR-4 (pale tan, dark silkscreen, deeper
  copper) for bright benches. The app follows `prefers-color-scheme` until you pick; the pick is
  kept in `localStorage`.
- **Keys**: `/` or Ctrl+K opens the finder anywhere (on the search page `/` focuses the field);
  arrows and Enter move through results; Esc closes the popover, panel or finder.

Faces are self-hosted in `fonts/`: Barlow Condensed for labels and prose, Share Tech Mono for
signal names, pin numbers, designators and values (both SIL Open Font License). Tokens, the three
masks and the silkscreen components live in `src/input.css`; footprints and trace routing are SVG
drawn in `src/app.js`.

## Status

Working prototype. 42 machines across ten makers (Commodore, Apple, Atari, Coleco, Sinclair, Timex
Sinclair, Texas Instruments, Tandy/TRS-80, Heathkit HERO robots, IBM), 94 chips of which 59 have
full pin tables, 77 glossary terms. Machines marked `ready` have pinouts, quick reference, ports,
power and test points, and a fault table; `sheet` machines have facts and chip lists from the printed
cheat sheets; `planned` machines are placeholders. See [docs/mockups](docs/mockups) for the six design
explorations and `docs/mockups/index.html` for a launcher that shows them at desktop, iPad and iPhone
sizes. `node scripts/validate-data.mjs` checks every data file.

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
