# Retro Bench

An offline-first web app for the 8-bit repair bench: chip pinouts you can tap, test points and
rails, connector pinouts, keyboard quirks and BASIC quick reference for the classic home
computers. Built for an iPad or iPhone propped on the bench, and for the desktop.

The design is **Silkscreen**: the circuit board is the interface. Solder-mask green or black,
silkscreen-white type, copper for whatever is live, chips drawn as footprints with their board
designators, and a copper trace from the selected pin to its detail.

## Status

Early. The data covers the Commodore 16 and Plus/4 and the Apple IIe in depth (TED, 7501, 6529,
6551, 4164, 6502, MMU, IOU, AY-5-3600) and lists the other machines from the printed cheat
sheets. The app at the root is a Tailwind v4 build that still carries the earlier "ledger" look;
porting it to Silkscreen is the current step. See [docs/mockups](docs/mockups) for the six design
explorations and `docs/mockups/index.html` for a launcher that shows them at desktop, iPad and
iPhone sizes.

## Run

```bash
npm install
npm run build        # src/input.css → dist/app.css
```

Open `index.html`. Hash routing needs no server. `npm run watch` rebuilds on change.

## Layout

- `index.html`, `src/`, `fonts/`, `dist/` — the app. `src/data.js` is the content.
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

Code is MIT ([LICENSE](LICENSE)). The reference data in `src/data.js` and the mockups' shared
data is CC BY 4.0 ([LICENSE-DATA](LICENSE-DATA)), the same terms as the cheat sheets. Product
names and trademarks belong to their owners.
