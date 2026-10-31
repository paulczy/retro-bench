# Fact-check fixes, agent A — 2026-10-30

Scope: `commodore.js`, `apple.js`, `atari.js`, `coleco.js`, `sinclair.js`, `timex.js`, `ti.js`, against
`docs/reviews/factcheck-2026-10-30/` (VERDICT findings 1-23 and every WRONG / UNVERIFIABLE ledger row whose record lives
in these files). Ledger index = `<ledger>#<index>` (A = architect, M = minimalist, S = skeptic, RA = rest-architect,
RMa-d = rest-minimalist-a..d). `node scripts/validate-data.mjs` ends `0 FAIL` for each brand and for the full run.

## Items fixed

| Ledger | Record | Old | New | Source page opened |
|---|---|---|---|---|
| A#8, A#9 | `c16-exp` (C16, Plus/4) | pin 1 left | `pin1: 'right'`; summary says external view | Plus/4 térkép map p. 33, CN4 ("drawn from outside") |
| A#14 | `c64-exp` | pin 1 left | `pin1: 'right'` | C64 PRG p. 396 (PDF 415) |
| rule 4 | `c128-exp` | pin 1 left | `pin1: 'right'` | C128 PRG Fig. 12-11 p. 399 (PDF 409), "view of port from the back" |
| A#7, M#427 | Plus/4 video | shared `c16-video`, pin 8 +5 V with a conflict note | new `plus4-video` (pin 8 NC); C16 entry keeps +5 V, conflict removed | connectors-2.jpg CN7; Plus/4 SM PDF 21 |
| M#5 | `ted7360` 7 R/W | dir in | dir bidir | TED System Hardware Manual p. 9 |
| M#6 | `ted7360` 12 | 0.89 / 1.76 MHz | 0.89 / 1.79 MHz NTSC (1.788), 0.88 / 1.77 PAL; also c16/plus4 `cpu`, 7501 summary and pin 1 | TED manual pp. 33, 35 |
| M#33, M#34 | `vic2` 24 A0, 28 A4 (and A1-A3, A5) | out | bidir | C64 PRG p. 450 (PDF 469): A5-A0 bidirectional |
| M#37, M#38 | `vic2` 35-38 DB11-DB8 | bidir | in (sourced) | Bauer, VIC-II article 3.14.6: D8-D11 always inputs |
| M#42-44 | `cia6526` PA0-PA7, PB0-PB7 | CIA1 port A rows, port B columns + joystick | port A keyboard column out (+ control port 2 on bits 0-4), port B row in (+ control port 1 on 0-4); CIA2 per PRG p. 330; labelled C64/C128 | C64 PRG pp. 328-330, 343 |
| M#58, M#59 | `vic6560` 5-8 DB11-DB8 | bidir | in | 6560 data sheet scan 6560-09 |
| M#62 | `vic6560` 21 A0 (and 22-34) | in | bidir, both roles described | same page |
| M#87 | `vdc8563` 31 DA5 (and 26-33) | bidir address/data | out, local DRAM address | C128 SM p. 38 (PDF 40) |
| M#94, M#95 | `vic2e` 32-37 A0-A5 | out | bidir | C128 SM p. 35 (PDF 37) |
| M#104 | `pla8721` 32 CLRBNK | "Clear bank" | colour RAM bank select output | C128 SM p. 29 (PDF 31) |
| M#125 | `cia8520` 39 SP | "goes LOW when set to output" | clause removed | (unsupported) |
| M#424 | `c16-cass` 5 (Plus/4) | write from 7501 P1 | labelled "on the C16 schematic; Plus/4 route not on the cited map" | — |
| M#433, M#443 | `c64-video` 1 (and 4), `vic20-video` 5 | 1 V p-p into 75 Ω | expect removed | — |
| M#454 | `vic20-cass` 6/F | idle level + key list | expect removed | — |
| M#455, M#456 | `pet-ieee` 5, A (all 17 signal pins) | "About +5 V idle; LOW when asserted" | expect removed, `verify: true` on the active-LOW pins | IEEE drawing has no electrical data |
| M#457 | `pet-user` 11 GRAPHIC | behaviour | `verify: true` | — |
| M#459, M#460 | `pet-user` C-L | $E841 / $E843 | addresses removed | — |
| M#461 | `pet-cass1` 3/C (also SENSE, and `pet-cass2`) | motor / sense levels | expect removed | — |
| M#477 | `1541-iec` 5 | "a drive stuck LOW hangs the whole bus" | "LOW when asserted" | — |
| S#19 | PET supply | +9/+16/-9 V feeds on J8 | AC on J8 (1/4/5, 8/9) to on-board bridges; +16 V J10 4/5, -9 V J10 1/2, +9 V J11 1/4/6 and J8 2; rail `where` fixed | 320349 sheet 9 |
| S#2 | `c16-power` 2; C16 rail | above 7.5 V | About +9 V; rail note cites TI µA7805 (7-20 V in, 2 V dropout) | TI SLVS056P p. 6 |
| S#4 | `plus4-power` 1 | +5.0 to +5.25 V | +5 V (about 5.2 V per PSU schematic) | — |
| S#13 | `c64-power` 5 | 4.95-5.10 V | +5 V; Carlsen: RAM destroyed above 5.5 V; Carlsen PS page + mirror added | Carlsen "CBM PS.txt" |
| S#21 | `c128-power` 1 | 4.95-5.10 V | +5 V | — |
| RA#79, F21 | `rom23128` 20, 22, 27 | C16 / Spectrum / Oric wiring in pin text | generic pins; wiring moved to summary by machine | — |
| RA#92, F21 | `via6522` 19 | "PET: beep" | removed (already in summary) | 6522 sheet |
| F3, rule 6 | `rom23128` → 27128 | pin-compatible | adapter | note already said not a drop-in |
| rule 6 | `dram4164` → 41256; `sid6581` → 8580 | pin-compatible | adapter (pin 1 tie; pin 28 supply/filter rework) | — |
| RA#71,72,75,82,83,84,86,87,88,94 | 8501, 8360, HM4864/MT4264/TMS4164, 8500, 8502 adapter, 8562/8565, 8580, 6526A, 8521, 8564 adapter | — | `verify: true`, reason in note | — |
| F14 | Carlsen links (HTTP 406) | single link | Wayback copies added (`RCWB`) beside every Carlsen source in arrays and chip datasheets | archive.org availability API snapshots |
| F14 | C16 Service Manual (damaged PDF) | single link | myretrostore alternate scan added beside all 15 citations (page map 11/12→11, 14→12, 15→13) | alternate scan PDF pp. 11-13 |
| M report | C128 PRG anchors | RGBI #407, video #406, controller #408, cassette label p. 399, serial label p. 395 | #408, #407, #409, p. 398, p. 394; expansion label names Fig. 12-11 | C128 PRG PDF 404-410 |
| S report | 1541 spec | PDF p. 5 | PDF p. 4 | 1541 SM PDF 4 |
| RA#38, F15 | `disk2-mech` | numbers on top | `rowA: 'bottom'` (A-R on top, A at left) | A2DP analog-card photo |
| S#79-89, RMa#533 | `disk2-ribbon` 9, 11-19 | ±ranges | -12 / +5 / +12 V nominal (also rails, firstTen) | — |
| S#98-115, RMa#537, 541 | `duo-db25` 7, 19, 20, 23, 24 | ranges | nominal | — |
| RMa#544, S#122-133 | `duo-db19` / `uni-db19` 5-8, 16 | 11.3-12.5 V etc. | nominal; IIc instance +12 V ±10 % (10.8-13.2 V) with IIc TRM Table 11-4 added | IIc TRM p. 234 |
| A#30 | `2e-aux` | assumed orientation | `verify: true`, summary says unchecked | — |
| A#100, F6 | `rom2316` 18, 20, 21 | Apple /INH and F12 wiring, Apple polarities | generic CS1-CS3 (polarity by mask); Apple and Model III wiring in summary; Model III Fig. 6 added | Apple II RM p. 94; Model III TRM Fig. 6 p. 33 |
| RMa#131 | `mmu344` 24 Cxxx | $C100-$CFFF slot ROM | $C000-$CFFF I/O enable, subject to ROM switches | Sather p. 7-2 |
| RMa#136 | `iou344` 15 | open drain | removed; Sather p. 4-2 added | — |
| RMa#139, 140 | `kbd3600` 1-5 | generic option list, dir in | per-pin options from the chart; pins 4, 5 bidir (mask-dependent) | AY-5-3600 p. 3-24 |
| RMa#152 | `glu2c` 14 | bidir | `verify: true` | — |
| RA#97,102,105,106 | 65C02, ECG3470, SK3697, 9334/74259 | — | `verify: true` | — |
| A#41, A#42 | `atari-cart` (400, 800, also 800 right slot and XL/XE) | numbers on top | `rowA: 'bottom'` (A-S on top); 600XL FSM Fig. 1-11 added | FAQ drawing; 600XL FSM p. 1-14 (PDF 24); Sams CC16 J4A |
| A#47 | `atari-eci` | numbers on top | `rowA: 'bottom'` | Sams CC16 p. 25 (PDF 7), J4B front view |
| S#138-142, RMa#569 | `atari-power` 1, 2 | 9-11 V AC | 9 V AC | — |
| RA#43, 44 | `atari-power` contacts | — | summary says centre/sleeve not sourced (record already `verify`) | — |
| RMa#552,563,584,594 | controller pin 7 | 4.9-5.0 V | +5 V (Sams measured 4.9 V) | — |
| RMa#168, 169 | `antic` 14, 19 | bidir | `verify: true` | — |
| RA#108-113 | ANTIC, GTIA, POKEY, FREDDIE replacements | — | `verify: true` | — |
| RMa report | SIO OS Manual Fig. 9-4 label | p. 145 | p. 146 | Tech Ref Notes PDF 131 |
| F4, A#170 | ColecoVision U2 | shared `rom2764` | new `rom9464-cv` record (2 NC, 20 A11, 22 /EP, 23 A12, 26 VCC; 1/27/28 tied +5 V); symptom points to it; `rom2764` location says "only after WJ4/WJ5 conversion" | CV redraw Rev J sheet 9 |
| A#31, 48, 49 | `cv-expansion`, `cv-cart`, `adam-cart` (and `adam-expansion`) | orientation assumed | `verify: true`, summaries say unchecked | — |
| RMa#620 | `adam-cart` 22 | $A000-$BFFF | range removed on the ADAM | — |
| RMa#622, 623 | `adam-controller` 2, 6 (all 2.2 V pins) | above 2.2 V idle | removed on the ADAM | — |
| RMb#189 | `ula_zx81` 36 A3′ | bidir | `verify: true` | — |
| RA#121 | `rom_zx81` 20 | ZX81 wiring in pin text | generic; ZX81/TS1000 wiring in summary, TS1500 "not confirmed" | SRC 049 |
| RA#119, 123, 128-130 | 2C210E, AT28C adapter, 6C001E-7, -5/-6, 5C102E/5C112E | — | `verify: true` | — |
| RA report | Sinc-Link source | /page/n9 | /page/n8 | — |
| A#56 | `ts2068-dock` | odd on top, pin 1 right | `rowA: 'bottom'`, pin 1 left (even on top, 2 upper left) | TS2068 TM Fig. 2.4.2-2 p. 59 (PDF 67) |
| S#200, 202 | TS2068 supply, `ts2068-power` 2, rail | "about 21 V unloaded" | "SUM: about 21 V from the stock adapter" | SUM v4 n1 p. 5 |
| S report | SUM v4 n1 link | /page/n5 | /page/n4 | — |
| F21 | `ay8912` 15 probe | per-machine rates | "see the machine test points" | — |
| A#57 | `ti994a-cartridge` | — | `verify: true` | — |
| A#137 | `psg76489` 14 | SN94624 divider and per-machine probe | SN76494 sourced, SN94624 stated as unchecked, `verify: true`, probe generic | TI SN76489 sheet |
| A#135, F3 | `vdp9918` → 9928A/9929A | pin-compatible | adapter | TI VDP manual 3.7.2 |
| A#136 | → TMS9118/9128/9129 | pin-compatible | adapter, `verify: true`; F18A Wayback copy added | — |
| RA#138, 139, 143 | SN94624N, SN76494N, MCM6810 subs | — | `verify: true` | — |
| rule 6 | → SN76489AN | pin-compatible | adapter (3.58 MHz clock, pin 9 lost) | — |
| RA#142, F16 | `romconsole` → TMS2532 | pin-compatible | adapter: lift pin 21 to +5 V; 2532 sheet added | TI 1984 MOS Memory Data Book PDF 207 |
| RMb#695, S#204-206, F7 | `ti994a-power` 1, 2, 4 | centre tap; 17-19 / 8-9 V ranges | secondary tap (26.40 V tapped at 17.85 V); nominal with Sams values; pins stay `verify` | Sams TI-99/4A p. 21 |
| RMb#699 | `ti994a-io` 41 | IAQ | IAQHA (IAQ OR HOLDA), conflict note updated | TI Technical Data PDF 62 ("IAQHA I/O PORT #41") |

Card-edge drawings opened in the app (port 8481): c64-exp, c128-exp, c16-exp (C16, Plus/4), plus4-video, atari-cart (400,
800, 800XL), atari-eci, disk2-mech, ts2068-dock. Each caption and drawing matches its manual view.

## Disagreements with the reviewer

- A#24, A#25 `ii-slot` pins 19 and 35: the data at 87c9b5a already says "Slot 7 only … unconnected on the other slots"
  for both; no change.
- A#53 `spectrum128-edge` A23/B23 and S#192-193 `spectrum128-power`: already `verify: true` with conflict notes; no change.
- M#37/38 `vic2` DB8-DB11: reviewer wanted the direction left unverified; Bauer's VIC-II article states they are inputs,
  so the direction is now `in` with that source.

## Not fixed

- F13 (1581 WD1772 needs J1 removed) and F4's `rom2764` text: the records are `fdc1770` (acorn.js) and `rom2764`
  (heathkit.js). Commodore already says "remove J1" in the 1581 symptom and chip location.
- `photos.js` still boxes `rom2764` on the ColecoVision photo; it should move to `rom9464-cv` (file not owned), so
  `rom2764` stays in the ColecoVision chip list.
- A#236 Apple II photo: chip locations for the II have no source opened here; left empty.
- PET card edges (`pet-ieee`, `pet-user`, `pet-cass1/2`): the zimmers drawings give no view direction; left as drawn.
- Same unsourced "1 V p-p" video expects on `c16-video` / `c128-video` and "+4.75 to +5.25 V" on `ts2068-dock` pin 2 were
  not in the ledgers and were left.
- PET `power` rail `where` "J8 pin 2; J11 …" gives a WARN (no connector record for J8/J11).
