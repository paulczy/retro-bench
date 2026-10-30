# Retro Bench data schema

All content lives in `src/data/`. `core.js` holds the glossary (`terms`), the pin types, the general
resources and the `RCS.add()` hook. Each brand has its own file and calls `RCS.add({...})` once.
Files load as plain `<script>` tags in `index.html` after `core.js`; no build step, no imports.
Run `node scripts/validate-data.mjs <brand>` after every edit and fix every FAIL.

Write for a bench tech reading at arm's length: short sentences, the fact first, units on every figure,
hex as `$C000`. Everything reconstructed from memory, a forum or an unverified scan carries `verify: true`.
Never invent a fact to fill a field: leave it out or mark it `verify`.

## Brand file shape

```js
RCS.add({
  brand: { id: 'commodore', name: 'Commodore', blurb: 'One line.' },
  machines: { c16: {...}, plus4: {...} },      // key order = display order
  chips: { ted7360: {...} },                   // chips first fitted in this brand's machines
  symptoms: { c16: [ ... ] },
  connectors: { c16: [ ... ] },
  power: { c16: { rails: [...], testPoints: [...] } },
  quickref: { c16: {...} },
  resources: [ { name, url, what, verify? } ],
});
```

### machine
```js
c16: { id: 'c16', brand: 'commodore', name: 'Commodore 16', aka: 'C16 / C116 (264 series)', year: 1984,
  status: 'ready' | 'sheet' | 'planned',     // ready = has chips with pins + quickref + power + connectors + symptoms
  cpu: '7501/8501 @ 0.89/1.76 MHz', ram: '16 KB (12,277 free)', rom: 'BASIC 3.5 + KERNAL (2 × 16 KB)',
  video: 'TED 7360: 40×25 text, 320×200, 121 colours', sound: 'TED, 2 voices', os: 'Commodore BASIC 3.5',
  chips: ['ted7360', 'cpu7501', ...],        // ids; order = display order (hottest first is fine)
  tagline: 'One sentence a tech would say about it.' }
```
A chip fitted in several machines is defined once. If another brand file already defines it (the 6502 is in
`apple.js`, the 4164 in `commodore.js`; grep `src/data/*.js` for the id before defining one), just list its id
in your machine's `chips` and give its designator in `chipLocations: { vic20: { cpu6502: 'UE10' } }` at the top
level of your `RCS.add({...})`; `core.js` merges the fit and location after load, whatever the file order.
Do not edit another brand's file. Shared data (Plus/4 reusing C16) is handled in the app; do not duplicate.

New glossary terms: check `core.js` first. If a term is genuinely missing, add it at the top of your brand
file with `Object.assign(RCS.terms, { 'my-term': { term, short, long } });` before `RCS.add(...)`. Do not
edit `core.js`.

### chip
```js
ted7360: { id: 'ted7360', name: '7360 / 8360 TED', short: 'TED', family: 'MOS custom',
  role: 'Video, sound, DRAM controller, MMU, keyboard scan', pkg: 'DIP-48',   // DIP-n; pin count must equal n
  machines: ['c16', 'plus4'], location: { c16: 'U1', plus4: 'U1' },
  summary: '2–4 sentences: what it does, what is special, what to know before touching it.',
  fails: ['No picture or garbled picture', 'No sound'],   // symptoms a dead one produces
  heat: 'cool' | 'warm' | 'hot', verify: true?, verifiedAgainst: 'Commodore Plus/4 Technical Manual'?,
  datasheets: [ { label, url, verify? } ],
  pins: [ { n: 1, name: 'A2', type: 'addr', dir: 'bidir', desc: 'Address bus bit 2.',
            terms: ['clock'], activeLow: true?, probe: 'What a probe or meter should show.', verify: true? }, ... ]
  // or pins: null when not captured yet
}
```
- `type` is one of: power, ground, clock, addr, data, ctrl, io, video, audio, kbd, serial, nc.
- `dir` is one of: in, out, bidir, `-` (supply or passive).
- `name` uses a leading `/` for active-low (`/RES`, `/IRQ`) and sets `activeLow: true`.
- Pins are numbered as the datasheet does: 1 at the notch, down the left, up the right.
- `pkg: 'PLCC-n'` (square chip carrier, n a multiple of 4 with an odd count per side: 20, 28, 44, 52, 68, 84)
  draws a square footprint numbered as JEDEC does, top view: pin 1 in the middle of the top edge, then
  counter-clockwise (left along the top, down the left side, along the bottom, up the right). Any other
  package draws as a DIP.
- `terms` are glossary ids from `core.js`. Add a term there only when it is electronics vocabulary a
  tech might not know; keep `short` to one sentence and `long` to 2–3.

### symptoms
`[{ symptom: 'Black screen', suspects: ['cpu7501'], note: 'Check +5 V and /RES at pin 40 first.' }]`

### connectors
```js
[{ id: 'c64-power', name: 'Power in', kind: 'DIN-7 (Commodore power)', geo: 'din7', gender: 'female',
   verify: false, verifiedAgainst: 'C64 Programmer\'s Reference Guide, App. I',
   summary: 'What plugs in here, what to expect, what goes wrong.',
   pins: [{ n: 1, name: '9 VAC', type: 'power', desc: 'One leg of the 9 V AC winding.', expect: '9–11 V AC' }, ...],
   sources: [{ label: 'C64 PRG App. I, p. 395 (archive.org)', url: 'https://archive.org/details/.../page/n395' }],
   terms: ['iec'] }]
```
- Every pin is numbered (`n`) the way the connector standard numbers it; `n` may be a string for lettered
  contacts (`'A'`, `'B12'`). Never `'?'`: a pin whose position you cannot source is left out and the gap is
  noted in `summary` with `verify: true`.
- `type` is optional and uses the chip pin types (power, ground, video, audio, serial, ctrl, data, addr, io, nc).
- `expect` is optional: what a meter or scope should show at that pin on a working machine, with units. The power
  page writes it beside each pad of the supply connector, so keep it short (`'+4.95 to +5.10 V DC'`).
- `verify` and `conflict` work on connector pins as on chip pins (CHECK stamp; amber "Sources disagree" note).
- Pins are described **looking into the socket on the machine**. The app mirrors the drawing for the PLUG view
  itself; never enter plug-view numbering.
- `geo` picks the drawing (`src/connectors.js`; its comments name the source of every layout). One of:
  - round DIN: `din3`, `din4`, `din5-180`, `din5-240`, `din6`, `din7`, `din8-262`, `din8-270`, `mdin7`, `mdin8`.
    The app places each pin by the **standard** number (DIN 41524, 45322, 45326, 45329; mini-DIN as Wikipedia),
    drawn as the female socket from the front, key at the bottom. So enter the standard number, not a position.
    Before you trust a manual's figure, check that it uses the standard numbering. 5 pin 180°: 1 4 2 5 3 left to
    right over the top. 240° (5 and 6 pin): 1 to 5 clockwise from the left of the key, 6 in the centre. 7 pin 270°:
    1 4 2 5 3 over the top, 6 and 7 either side of the key. 8 pin 270°: as 7, plus 8 in the centre. 8 pin 262°
    (C64 A/V): 1 4 2 5 3 over the top, 7 and 8 the horseshoe ends either side of the key, 6 near the centre.
    A connector whose maker numbers it differently (for example straight round the circle) is `custom`.
  - D-sub: `de9`, `da15`, `db25`. Standard numbering: on the male face, 1 is at upper left, the wide row runs left
    to right, then the narrow row. Set `gender: 'male' | 'female'` for the socket **on the machine**, because it
    moves every pin (female puts 1 at upper right). The default is `male` and the app says so under the drawing.
    Joystick ports are usually male on the machine; video, printer and game ports are often female.
  - card edge: `edge-<top>x<bottom>-<scheme>`, scheme one of `seq` (1..N along the top, then N+1.. back along the
    bottom, so N+1 is under N, as on the Apple II slot where 1 is opposite 50), `cbm` (1..N top, letters
    A B C D E F H J K L M N P R S T U V W X Y Z bottom with A under 1, then AA BB CC past Z), `ab` (A1..An top,
    B1..Bn bottom), `odd-even` (odd numbers top, even bottom, 2 under 1). Example: C64 user port `edge-12x12-cbm`,
    IBM I/O channel `edge-31x31-ab`, Apple II slot `edge-25x25-seq`, 264-series expansion `edge-25x25-cbm`.
    Optional `pin1: 'right'` when pin 1 is at the right end looking into the socket (default `'left'`).
    Optional `rowA: 'bottom'` when the manual calls the **underside** row A (the first-named row: A, 1.., odd),
    as the Spectrum's does: the drawing then puts that row below and the other on top, so it still matches the
    machine seen from the rear (default `'top'`). The caption over the drawing says which row is on top.
    Optional `keys: [k, ...]`: key slots cut between contact k and k+1. `edge-12x12-cbm` defaults to `[1, 10]`
    (the Commodore user port); give `keys: []` if a 12+12 edge has none.
  - single contact: `rca`, `f` (RF F-connector), `barrel` (all three: pin `1` = centre, `2` = shell or sleeve),
    `trs` (pins `T`, `R`, `S`), `ts` (pins `T`, `S`)
  - anything else: `custom`, with `pads: [{ n, x, y }]` in a 0–100 box as seen looking into the socket, plus an
    optional `outline: '<svg path d>'` in the same box (Atari SIO, TI power plug, Coleco power, headers). The app
    scales the box so the two closest pads are 50 px apart (no upper limit: a dense header gets wider and scrolls
    sideways) and crops to the pads and outline. Traces leave through the gaps between pads or round the outside. Keep the outline to
    absolute commands (M L H V C Q A Z) or the crop falls back to the whole box. `gender: 'male'` draws the pads
    as pins (a header on the board); the default draws holes.
- `gender` (any geo, optional): `'male'` (pins) or `'female'` (holes) for the socket on the machine. Round DIN
  defaults to female, D-sub to male. The PLUG view always shows the other gender.
- `sources` are the documents a human can open to check the table. Use the manual, schematic or standard, with
  a page number in the label and, when the host supports it, a page anchor in the URL
  (`archive.org/details/<id>/page/n<page>`, `...pdf#page=<n>`). Forum posts are allowed only as a second source.

### power
```js
{ supply: { external: true, name: 'Commodore 251053 "brick"', output: '+5 V DC 1.5 A and 9 V AC 1 A',
            connector: 'c64-power',   // id in this machine's connectors; the app draws the PSU pinout from it
            notes: ['Epoxy-potted. The 5 V regulator drifts high and kills RAM; test unloaded, replace if over 5.2 V.'],
            sources: [{ label, url }] },
  rails: [{ rail: '+5 V', expect: '4.9–5.2 V', where: '7805 output; TED pin 4; 7501 pin 5', note: '...' }],
  testPoints: [{ tp: 'Master clock', where: 'TED pin 14', expect: '17.734 MHz PAL / 14.318 MHz NTSC' }],
  sources: [{ label, url }] }
```
- `supply.external: false` for machines with an internal supply (Apple II, PET, CoCo, IBM PC). Still fill
  `name`, `output` and `notes`, and point `connector` at the internal PSU-to-board connector if you add one to
  `connectors` (IBM P8/P9, Apple II 6-pin). The app says "Internal supply" and draws that connector.
- `notes` holds the known problems of that supply and what to check before plugging it into a board.
- Write `where` as `<chip short> pin <n>` so the app can link it to the drawing. A connector pin uses the
  connector's exact `name` or `id` (see firstTen below). The validator checks the `where` of every rail and test
  point, with or without a `scope`, and warns on a reference it cannot link.
- The print card prints every supply `note`, every rail `note` and every firstTen `ifNot`: they carry the safety
  precautions. Keep them short; the card runs to a second page rather than drop them.

### quickref
```js
{ firstLook: ['5–6 bullets a returning user needs first'],
  keys: [{ keys: 'RUN/STOP + RESTORE', does: 'Warm reset to BASIC.', verify? }],
  basic: { dialect: 'Commodore BASIC 3.5',
           essentials: [{ cmd: 'LOAD "name",8', does: '...' }],           // 10–14 most-used
           groups: [{ group: 'Program control', items: ['RUN [line]', 'LIST'] }],  // the rest, grouped
           quirks: ['3–5 gotchas'] },
  memory: [{ range: '$0000-$00FF', what: 'Zero page' }] }
```
For a machine without BASIC (a robot, an IBM PC) use `basic.dialect` for whatever the built-in language or
monitor is (HERO monitor commands, IBM Cassette BASIC / DOS commands) and keep the same shape.

## Sources, in order of trust
1. The manufacturer's technical or service manual and schematics (cite in `verifiedAgainst`).
2. The chip's own datasheet.
3. The printed cheat sheets in `paulczy/retro-computer-cheetsheets` (`chip-pinouts/*.pdf`, `basic-cheatsheets/*.pdf`; `pdftotext -layout` reads them).
4. Well-known community references (zimmers.net, Apple II Documentation Project, bitsavers). Mark `verify: true`.
5. Memory. Mark `verify: true` and say so in the summary.

## Sources and verification

Every block that a human might want to check carries a `sources` array (`connectors[]`, `power`, `quickref`,
and `datasheets` on chips): `{ label: 'Doc title, page or section', url: 'https://…', verify?: true }`.
Link the page, not the site. Prefer, in order: the manufacturer's manual or schematic on archive.org or
bitsavers, the chip datasheet (bitsavers, datasheetarchive, the maker's own PDF), a long-standing community
reference (zimmers.net, 6502.org, worldofspectrum.org, whtech.com, colorcomputerarchive.com,
minuszerodegrees.net, mirrors.apple2.org.za, atariarchives.org), then forum posts. Wikipedia may be linked for
connector standards, never as the only source for a pin table.

`verify: true` means "not yet checked against a source". Clear it on a pin only when you have read the pin's
name and function in a source you link; set `verifiedAgainst` on the chip or connector to that document's
title. A pin that a source contradicts is corrected, and the old value, new value and source go in
`docs/verification/<brand>.md`. A pin no source covers keeps `verify: true` and is listed there too.
`conflict: 'text'` on a pin records a disagreement between two sources that you could not settle.

## Schematics and credits

`src/data/schematics.js` holds links to board drawings, keyed by machine id, and the credits list. Links only:
no drawing is copied into the app.
```js
RCS.addSchematics({ c64: [
  { board: 'Assy 250407', rev: 'Rev A to C', years: '1982-83', kind: 'schematic',
    label: 'Commodore schematic 251469', url: 'http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/250407-left.gif',
    host: 'zimmers.net', note: 'Five-pin video DIN, no chroma/luma separation.' } ] });
```
- One entry per document. `board` is the assembly number printed on the PCB (or the maker's board name when
  there is none); the app groups rows by it. `kind` is `schematic`, `layout` (parts placement or silkscreen
  drawing), `manual` (service manual covering that board) or `parts`.
- `rev` and `years` describe the board, `note` says how to recognise it or what differs. `verify: true` when the
  assembly-to-document match is not confirmed.
- Credits: `RCS.addCredits([{ name, url, what }])`: the archive or person, and what of theirs we used.

## Test-point waveforms, first ten minutes, clocks, replacements, Sams

Approved features 1 to 6 on docs/roadmap.md add these optional fields. Nothing here may be invented: every
`scope` block, `firstTen` step and `replacements` row carries a source a human can open.

### scope on a test point
```js
testPoints: [{ tp: 'CPU clock', where: 'CPU pin 37', expect: '1.02 MHz square',
  scope: { f: '1.0227 MHz',            // or period: '64 µs' for video lines; one of them is required
           low: '0.2 V', high: '4.6 V', // the swing the source gives (datasheet VOL/VOH or a measured capture)
           // or pp: '1.2 V'            // peak-to-peak only, when the source gives no DC level (never with low/high)
           shape: 'square',             // square | pulse | sine | burst | video-line | dc
           duty: '50%',                 // pulse/square only; omit when unknown
           polarity: 'low',             // pulse/square only: the line idles HIGH and pulses LOW (duty is the LOW part)
           black: '2.9 V', sync: '2.6 V', // video-line only: blanking level and sync tip (sync equals low)
           inverted: true,              // video-line only: sync is the most positive level (6847 VDG); sync equals high
           basis: 'capture' | 'datasheet',   // capture = a Sams or service-manual photo; datasheet = timing diagram + schematic frequency
           source: { label: 'Sams CC17 C64, waveform 3, p. 12', url: '...', sams: true },
           note: 'Rounded edges are normal; a flat line means no clock.' } }]
```
The app derives the scope settings and draws an idealised trace labelled "idealised from <basis>":
- TIME/DIV is the 1-2-5 step whose cycle count across the 10 divisions is closest to 3, within 1.5 to 5 cycles.
  Neighbouring 1-2-5 steps are at most 2.5 times apart, so a step in that band always exists; 2 to 4 cycles cannot
  be promised for every period (a 1.118 µs CoCo E clock shows 1.8 cycles at 0.2 µs/div, or 4.5 at 0.5 µs/div).
- VOLTS/DIV is the smallest 1-2-5 step of at least swing / 5, so the swing fills 2.5 to 5 divisions.
- DC coupling with the 0 V marker; trigger on the rising edge (falling for `polarity: 'low'`) at 1.4 V for logic
  swings that cross it, else mid-swing.

Never enter settings by hand; never enter a `scope` block without `source`.
How the app reads the fields:
- Values are a number, an optional SI prefix and the unit, and nothing after it: `'1.0227 MHz'`, `'64 µs'`,
  `'-0.3 V'`, `'500 mV'`, `duty: '30%'`. Anything else ("about 1 MHz", "1 MHz PAL") fails the validator.
- Frequencies and periods must be finite and above 0. When both `f` and `period` are given they must agree within
  2% (the app uses `period`). Volts must be finite and within ±50 V. `duty` is above 0% and below 100%.
- `burst`: `f`/`period` is the repetition rate of the group, not of the pulses inside it; the app draws four
  pulses and a gap.
- `video-line`: `low` is the sync tip, `high` peak white; the picture is drawn as a flat grey midway between black
  and white. `black` (the blanking level) places the porches; `sync` may stand in for `low` and must equal it when
  both are given. Without `black` the porches sit at the standard 0.3 of the swing above the sync tip and the
  caption says "levels to standard ratio, not to scale".
- `inverted: true` (video-line only, e.g. the 6847 VDG): sync is the most positive level. `high` is then the sync
  tip and `low` peak white; `sync` may stand in for `high` and must equal it when both are given; `black` lies
  between them. The app draws the tip at the top, starts the line at the sync edge and triggers there (rising,
  midway between blanking and the tip), and labels the trace "inverted video (sync most positive)".
- Pin names with a dash (IBM `P8-3`) go after the connector's name or id in a `where`: `pc-psu pin P8-3`,
  `pc-psu pins P9-4, P9-5, P9-6`. "P8 pin 3" does not link.
- Clock and reset pins show "Expect on this <machine>" in PIN DETAIL: every `clocks`, `testPoints`, `rails` and
  `firstTen` entry whose `where` names the pin. The validator warns for each clock pin on a `ready` machine that no
  `clocks`/`testPoints`/`rails` `where` names. Accepted forms: `<chip short or id> pin <n>`, `pins <n>, <n>`, `CPU pin
  <n>`, and a bare `pin <n>` after `to`/`and`/`or`/`vs`/`from`/`then`/`with` that reuses the part before it
  (`'VIC-II pin 17 to 6510 pin 1'` names both).
- Reset pins stay `type: 'ctrl'`; the app finds them by the `reset` term or a name like `/RES`, `RESET`, `/RST`,
  `RESIN`, `/POR` (not `MR`, which is Memory Ready on the 6808; tag a master reset with the `reset` term).
- `square`/`pulse` without `duty`: only the trigger edge is drawn solid, both levels dashed, labelled "duty not in
  source". The app never draws an assumed 50% or 25%. `polarity: 'low'` is a line that idles HIGH and pulses LOW;
  `duty` is then the LOW part of the period.
- `pp` (swing only): use it when the source gives a peak-to-peak value and no DC level. Do not invent `low: '0 V'`.
  The trace is centred, with no 0 V marker, AC coupling, trigger mid-swing, labelled "no DC level in source".
- `dc` (a rail): `high` is the level and is required (`'0 V'` is a valid level); `low` may be left out;
  `f`/`period` are not needed; `pp` is not allowed.
- Leave `low`/`high` (and `pp`) out when the source gives none: the trace is drawn without a volts/div setting.
- `where` on the test point or rail decides where the trace also shows: in PIN DETAIL of every chip pin it names.

### firstTen on power
```js
power: { c64: { firstTen: [
  { step: 1, check: 'Supply unloaded', where: 'Brick DIN pin 5 to pin 2', expect: '+4.95 to +5.10 V DC',
    ifNot: 'Do not plug it in: the brick is failing high.', source: { label, url } },
  { step: 2, check: '+5 V on the board', where: 'CPU pin 6; VIC pin 40', expect: '+4.9 to +5.2 V', ifNot: 'Shorted chip or fuse; pull PLA then VIC.' },
  ... ] } }
```
Six to eight steps a tech does before pulling a chip: supply, rails, reset, master clock, CPU clock, a chip select
or bus line. `where` uses `<chip short> pin <n>` so the app links pads. The app shows these in place of the generic
"Order of checks" when present.
A connector pin is written with the connector's exact `name` or `id` from this machine's `connectors`:
`'Power in (brick) pin 5 to pin 2'` links both pads (a bare `pin <n>` after "to", "and" or "or" reuses the part
named before it). "Brick DIN pin 5" names nothing the app knows, so it stays plain text and the validator warns.
`source` is optional in the shape but expected: the validator warns on a step without one.

### clocks on power
```js
power: { c64: { clocks: [
  { name: 'Crystal', where: 'Y1', pal: '17.734475 MHz', ntsc: '14.31818 MHz', source: {...} },
  { name: 'Dot clock', where: 'VIC pin 22', pal: '7.88 MHz', ntsc: '8.18 MHz' },
  { name: 'CPU clock', where: 'VIC pin 17 to CPU pin 1', pal: '0.985 MHz', ntsc: '1.023 MHz' } ] } }
```
Use `f` instead of `pal`/`ntsc` for machines with one standard.

### replacements on a chip
```js
replacements: [
  { part: '8521', kind: 'pin-compatible', note: 'Later CIA; timer B bug differs.', source: {...} },
  { part: 'ARMSID', kind: 'modern', note: 'Drop-in SID replacement; needs the 12 V or 9 V jumper set.', source: { label, url } },
  { part: '6569 in a 6567 board', kind: 'adapter', note: 'Needs the crystal and the PAL/NTSC jumper changed.' } ]
```
`kind` is `pin-compatible`, `modern` or `adapter`. Only parts a tech can buy or has in a parts drawer.

### Sams Computerfacts citations
Any `source`/`sources` entry taken from a Sams Computerfacts folder sets `sams: true`. The validator warns on any
source whose label contains the word "Sams" without a `sams` flag; set `sams: false` on a label that names Sams but
is not a Sams folder (a community page about a Sams error). The app appends the fixed
note "Sams redraw: part numbers are Sams's own and may not match the board" and shows a `conflict` when a Sams
value disagrees with the maker's document, which wins. Where a community page documents a specific Sams error,
add it as a second source with `note`.

## Video signal reference (src/data/video.js)

Feature 5 on docs/roadmap.md. One object, loaded after `schematics.js`, rendered at `#/video`:
```js
RCS.video = {
  standards: [{ id: 'ntsc', name: 'NTSC', sub: 'M/NTSC, 525 lines, 59.94 fields' }, ...],   // the columns a row may fill
  signals: [
    { group: 'line', id: 'hs', name: 'Horizontal sync', ntsc: '4.70 ± 0.10 µs', pal: '4.7 ± 0.2 µs',
      note: 'optional', source: ['smpte-t2', 'bt470-t11'], verify: false },
    { group: 'rf', name: 'UK UHF channel 36', value: 'Vision carrier 591.25 MHz', source: 'electron-sm' } ],
  sources: [{ id: 'bt470-t11', short: 'BT.470 T1-1', label: 'ITU-R BT.470-6, Table 1-1, p. 5', url: '...#page=5', note: 'optional' }],
};
```
- `group` is one of `levels`, `line`, `field`, `rgbi`, `rgb`, `yc`, `rf`, `mod`; each is one table on the page, in that order.
- A row fills `value`, or one or more standard columns (`ntsc`, `pal`, `cga`, `mda`); the table shows the standard
  columns any of its rows use, else a single Value column.
- `source` is a source `id` or an array of them. The validator FAILS a row without one, or one naming an unknown id.
  A number no source gives carries `verify: true` and still names the nearest source.
- The line drawing reads `white`, `sync`, `burst`, `fp`, `hs`, `bp` and `bs` from the PAL column, so keep those ids.
- "Derived" in a note means arithmetic on the cited table (back porch = sync edge to blanking end, less sync width).

## Board photos

`src/data/photos.js` registers freely licensed board photos and where each chip sits on them. Images live in
`photos/` at the repo root. Licences allowed: public domain / PD mark, CC0, CC BY, CC BY-SA, GFDL (user decision
2026-10-30). Photos are shown unaltered apart from resizing; highlights are drawn by the app over the image, never
baked in.
```js
RCS.addPhotos({ c64: [{
  board: 'Assy 250407', rev: 'Rev B',                      // match a board in schematics.js when possible
  file: 'photos/c64-250407.webp', w: 1600, h: 1067,       // resized copy, long edge 1600 px, WebP q80
  side: 'component',                                       // which face is shown
  rotate: 0,                                               // degrees the app should rotate it for display (0/90/180/270)
  author: 'Name as the licence requires', licence: 'CC BY-SA 3.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  source: { label: 'Wikimedia Commons: File:....jpg', url: 'https://commons.wikimedia.org/wiki/File:....jpg' },
  chips: { cpu6510: [0.412, 0.318, 0.091, 0.142], vic6567: [...] },  // [x, y, w, h] as fractions of the image, chip id -> box
  verify: ['sid6581'],                                     // chip ids whose box was placed without a legible designator
  note: 'Optional: what differs from other revisions.' }] });
```
- Boxes are fractions (0-1) of the displayed image before `rotate`. Every key in `chips` is a chip id listed in that
  machine's `chips`. A chip placed by inference (no legible designator, position from the layout drawing) goes in
  `verify`.
- `author`, `licence`, `licenceUrl` and `source` are required; the app prints them under the photo and on the credits
  page.
- `rotate` is clockwise. `w` and `h` are the stored file's pixel size (the validator reads WebP headers and compares).
- `licence` is written as one of `PD`, `Public domain`, `CC0`, `CC BY 4.0`, `CC BY-SA 3.0` (any version), or
  `GFDL 1.2` (with `only` / `or later` if the source says so). A GFDL photo needs the matching licence text in
  `photos/GFDL-<version>.txt`. `photos/LICENSES.md` is written by `npm run build` from this file; do not edit it.
- Photos are not precached. The service worker keeps each one in a runtime cache the first time it is shown.
