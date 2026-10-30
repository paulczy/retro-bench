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
`[{ id: 'c16-iec', name: 'Serial (IEC)', kind: 'DIN-6', verify: false, summary: '...',
   pins: [{ n: 1, name: '/SRQ', desc: '...' }], terms: ['iec'] }]`

### power
```js
{ rails: [{ rail: '+5 V', expect: '4.9–5.2 V', where: '7805 output; TED pin 4; 7501 pin 5', note: '...' }],
  testPoints: [{ tp: 'Master clock', where: 'TED pin 14', expect: '17.734 MHz PAL / 14.318 MHz NTSC' }] }
```
Write `where` as `<chip short> pin <n>` so the app can link it to the drawing.

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
