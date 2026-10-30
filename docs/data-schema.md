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
    Optional `keys: [k, ...]`: key slots cut between contact k and k+1. `edge-12x12-cbm` defaults to `[1, 10]`
    (the Commodore user port); give `keys: []` if a 12+12 edge has none.
  - single contact: `rca`, `f` (RF F-connector), `barrel` (all three: pin `1` = centre, `2` = shell or sleeve),
    `trs` (pins `T`, `R`, `S`), `ts` (pins `T`, `S`)
  - anything else: `custom`, with `pads: [{ n, x, y }]` in a 0–100 box as seen looking into the socket, plus an
    optional `outline: '<svg path d>'` in the same box (Atari SIO, TI power plug, Coleco power, headers). The app
    scales the box so the two closest pads are 50 px apart and crops to the pads and outline. Keep the outline to
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
- Write `where` as `<chip short> pin <n>` so the app can link it to the drawing.

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
