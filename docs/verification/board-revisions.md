# Board revisions: boards and tags

Date: 2026-10-31. Schema: docs/data-schema.md, "Board revisions". Boards are in `src/data/schematics.js`
(`RCS.addBoards`, end of file). A record without `boards` applies to every board; only what a source states was
tagged. Classic Repair Toolbox / Commodore Repair Toolbox was not used.

Review round 1 (end of file) changes several rows below; where they differ, round 1 wins.

Short source names used below:

- **C64SM**: C64/C64C Service Manual 314001-03 (Mar 1992), zimmers.net PDF (same file as the cached copy, 5,017,624 bytes).
- **FB469**: 250469 rev A schematic drawn by Falk Brunner, zimmers.net `250469-rev.A.pdf`.
- **252311**: 250469 rev B schematic 252311 (corrected, combined), zimmers.net `250469-rev.B-corrected2.gif`.
- **KU-BOM**: bwack, KU-14194HB Rev B KiCad replica, `bom.csv` on GitHub.
- **SM41**: 1540/1541 Disk Drive Service Manual 314002-01 (Nov 1985), zimmers.net PDF.
- **ADD41**: 1541-II Service Manual Addendum 314862-01 (Mar 1988), zimmers.net PDF.
- **LEVAK** / **LEVAKP**: William Levak, `boards.txt` / `parts.txt`, zimmers.net 1541 directory.
- **SM48**: ZX Spectrum Service Manual (Spectrum For Everyone edition), k1.spdns.de PDF (same file as the cached copy, 2,165,607 bytes; printed page = PDF page).
- **A2N**: Apple Service Technical Procedures, Apple II Family Vol. One (1992), Apple IIe Service Notes p. 0.5 and Enhancement Kit Upgrade (section 4).
- **A2ID**: Apple logic board identification pages 1.2.1-1.2.4 bound in Sams CC10 Apple IIe (archive.org scan pp. 4-7).

## Commodore 64 (`c64`)

| id | name | sources |
| --- | --- | --- |
| 326298 | Assy 326298 (original) | C64SM p. 21 board identification, p. 23 parts list |
| ku14194hb | KU-14194HB (no assy number) | KU-BOM; bwack replica schematic |
| 250407 | Assy 250407 (A, CR) | C64SM p. 21, p. 30 parts list |
| 250425 | Assy 250425 / 250441 (B, B-2) | C64SM p. 21 (B-2 "all circuits remain the same"), p. 37 parts list |
| 250466 | Assy 250466 (B-3) | C64SM p. 21 (table prints 250446), p. 44 parts list (title 250466-01 C64-B3) |
| 250469a | Assy 250469 rev A (E) | C64SM p. 21, p. 50 parts list; FB469 |
| 250469b | Assy 250469 rev B (E) | 252311 |

| record | boards | source |
| --- | --- | --- |
| chipBoards.pla82s100 | 326298, ku14194hb, 250407, 250425, 250466 | C64SM pp. 23, 30, 37, 44 (U17 82S100); KU-BOM U17; p. 50: U8 251715 memory controller instead; 252311: U8 252535-01 |
| chipBoards.dram4164 | 326298, ku14194hb, 250407, 250425 | C64SM pp. 23, 30, 37 (U9-U12, U21-U24 4164); KU-BOM; p. 44 U9, U10 DRAM 64K x 4; p. 50 U10, U11 64 x 4 |
| chipBoards.rom2364 | 326298, ku14194hb, 250407, 250425, 250466 | C64SM pp. 23, 30, 37, 44 (U3 BASIC, U4 KERNAL); p. 50: U4 128K ROM 251913-01 |
| chipBoards.sram2114 | all but 250469b | C64SM pp. 23, 30, 37, 44 (U6), p. 50 (U19); 252311 has no 2114 |
| locByBoard (326298, ku14194hb, 250407, 250425, 250466).sram2114 = U6 | | C64SM pp. 23, 30, 37, 44; KU-BOM |
| locByBoard.250469a: cpu6510 U6, vic2 U7, sid6581 U9, sram2114 U19 | | C64SM p. 50; FB469 |
| locByBoard.250469b: cpu6510 U6, vic2 U7, sid6581 U9 | | 252311 |
| power rails "+12 V (VIC-II and 6581 Vdd)" | 326298, ku14194hb, 250407, 250425, 250466 | C64SM pp. 24, 31, 38, 45 (VR1 MC7812CT); KU-BOM VR1 7812; no 7812 in the p. 50 list; FB469 Q5 |
| power rails "SID supply (+9 V or +12 V)" (new record) | 250469a, 250469b | FB469 Q5 2SC1384, CR7, notes 6 and 8; 252311 same notes |
| power testPoints "PLA chip enable" | 326298, ku14194hb, 250407, 250425, 250466 | as chipBoards.pla82s100 |
| power clocks "C64C clock generator outputs" (8701) | 250425, 250466, 250469a, 250469b | C64SM p. 37 (U31 7701/8701), p. 44 (U31 8701), p. 50 (U20 8701); pp. 23, 30 and KU-BOM have U31 74LS629 |
| photos c64-250407.webp | 250407 | photo's own board field |
| schematics: 25 entries | by their `board` string (Assy 326298 -> 326298 ... Assy 250469 Rev A/B -> 250469a/b; multi-board strings to each id) | schematics.js `board`; the two "All C64 boards" rows stay untagged |

Not tagged: `sid6581` (FB469 note 6: the 250469 takes a 6581 or an 8580, so the SID type is not a board property);
`firstTen` step 3 (+12 V, already covers both); step 5 (556 reset: the 250469 list has no 556, but the step's
check holds on every board); `c64-video` (record already covers 5-pin and 8-pin).

## Commodore 1541 (`c1541`)

| id | name | sources |
| --- | --- | --- |
| 1540008 | Assy 1540008 (long board) | SM41 p. 23 model identification (schematic 1540001, four 2114s); LEVAK (calls the system board 1540001); LEVAKP |
| 1540048 | Assy 1540048 (short board, CR) | SM41 p. 23 (2048 x 8 RAM, 40-pin gate array, Alps; reset upgrade); LEVAK; LEVAKP |
| 250442 | Assy 250442 / 250446 (1541A, 1541A-2) | SM41 p. 23 (schematic 251748); LEVAK (250446: 74LS123 replaces 9602 at UD4) |
| 250448 | Assy 250448 (1541B, 1541C) | LEVAK; LEVAKP |
| 340503 | Assy 340503 (1541-II) | ADD41 p. 6 parts list; LEVAK; LEVAKP |

| record | boards | source |
| --- | --- | --- |
| chipBoards.sram2114 | 1540008 | SM41 p. 23 "Has 4 discreet 2114 RAMs"; LEVAKP "(long board)" |
| chipBoards.sram6116 | 1540048, 250442, 250448, 340503 | SM41 p. 23; LEVAKP 2016 (short board), UA3 (1541C), U5 (1541-II); ADD41 p. 6 U5 |
| chipBoards.ga325572 | 1540048, 250442 | SM41 p. 23; LEVAKP 325572-01 "(short board)" in the 1540/1541/1541A list |
| chipBoards.rom2364 | 1540008, 1540048, 250442 | LEVAKP 1540/1541/1541A list (2364 DOS ROMs); 1541C and 1541-II use one 16K ROM |
| chipBoards.rom27128 | 250448, 340503 | LEVAKP UA2 (1541C), U4 (1541-II); ADD41 p. 6 U4 |
| chipBoards.ga251828 | 250448, 340503 | LEVAKP UC4 (1541C), U10 (1541-II); ADD41 p. 6 U10 |
| chipBoards.ga251829 | 250448 | LEVAKP UC5; LEVAK: 1541-II has no 20-pin gate array |
| chipBoards.uln2003 | 340503 | ADD41 p. 6 U13 MPA2003C |
| locByBoard.250448: cpu6502 UC2, via6522 UC1/UC3, sram6116 UA3, rom27128 UA2, ga251828 UC4, ga251829 UC5 | | LEVAKP 1541B/1541C list |
| locByBoard.340503: cpu6502 U3, via6522 U6/U8, rom27128 U4, sram6116 U5, ga251828 U10, uln2003 U13, ttl7406 U7 | | ADD41 p. 6 |
| connectors 1541ii-power, 1541ii-stepper, 1541ii-motor | 340503 | ADD41; records are 1541-II only by their own sources |
| power clocks "Bit clock (density divider, 251748 short board)" | 1540048, 250442 | as chipBoards.ga325572 (pin is on the 325572) |
| power clocks "16 MHz to the gate arrays (1541B/C, 1541-II)" | 250448, 340503 | as chipBoards.ga251828 |
| power clocks "CPU clock from the gate array (1541B/C, 1541-II)" | 250448, 340503 | as chipBoards.ga251828 |
| photos c1541-250442.webp | 250442 | photo's own board field |
| schematics: 18 entries | by `board` string; the two "Long and short boards" manual rows by their `rev` list | schematics.js; Sams CD4 and the 1984 Maintenance Guide (verify, board unconfirmed) and "All 1541 boards" stay untagged |

Not tagged: `1541-head`, `1541-stepper`, `1541-spindle`, `1541-xfmr` (drawn from schematic 251748; whether the long
board and the 250448 use the same headers is not stated); rails, `testPoints` (592 read amplifier: on 250448 and
the 1541-II a hybrid replaces "many components", but the 592 is not named); `ttl7406`.

Seen, not changed: the clock records say the 1541-II gate array is the 42-pin part, but LEVAKP lists 251828-02
"42 pin" for the 1541C and 251828-01 "40 pin" for the 1541-II. Worth a check by the power-data owner.

## ZX Spectrum 48K (`spectrum`)

| id | name | sources |
| --- | --- | --- |
| issue1 | Issue 1 | SM48 4.1.2 p. 21, 4.5.1 p. 23 (32K on a subsidiary board) |
| issue2 | Issue 2 | SM48 4.1.2 p. 21, 7.3.2 p. 37 |
| issue3 | Issue 3 | SM48 4.1.2 p. 21, 7.3.3 p. 38 |
| issue3b | Issue 3B | SM48 4.4 p. 23 |
| issue4a | Issue 4A | SM48 9.5 p. 50 |
| issue4b | Issue 4B | SM48 9.6 p. 50 |
| issue5 | Issue 5 | SM48 9.7 p. 50 |
| issue6a | Issue 6A | SM48 9.9 p. 51 |

| record | boards | source |
| --- | --- | --- |
| photos spectrum-issue4b.webp | issue4b | photo's own `rev: 'Issue 4B'` |
| schematics: 18 entries | by `board` string; "Issue 4A/4B" schematic -> issue4a, issue4b; the 4A-only layout -> issue4a | schematics.js; the two "Issues 1 to 6A" manuals stay untagged |

Not tagged: no chip or power record differs by issue in a way the data models. The ULA record already covers
5C102/5C112/6C001 (and its replacements say which issue takes which); the 4532/3732 record covers both makers;
Issue 5/6A's ZX8401 replaces 74LS chips the app does not list. Issue 2 vs 3 resistors: SM48 4.1.2 gives R47,
R49, R56, R63 values by issue and ULA; no record holds component values, so nothing to tag. The SM48 keyboard
section does not differ by issue.

## Apple IIe (`apple2e`)

| id | name | sources |
| --- | --- | --- |
| reva | Rev A (820-0064-A) | A2N (64-A, 6502, 1982); A2ID 1.2.1 ("820-0064-A ... the original Apple IIe board") |
| revb | Rev B (820-0064-B), unenhanced | A2N (64-B, 6502); A2ID 1.2.2 |
| enh | Enhanced (87-A) | A2N (87-A, 65C02, 1984); A2ID 1.2.3; A2N section 4 (kit = 65C02, CD, EF and video ROMs; MMU/IOU not changed) |
| enhcf | Enhanced, CF ROM and 64K x 4 RAMs | A2ID 1.2.4 (October 1986: "identified by a) the CF ROM and b) the 64 x 4 RAMs") |

| record | boards | source |
| --- | --- | --- |
| chipBoards.dram4164 | reva, revb, enh | A2ID 1.2.4: the late board has 64 x 4 RAMs |
| photos apple2e-820-0087.webp | enhcf | photo note: 820-0087-C, two 64K x 4 RAMs, no 4164 row |
| schematics "Apple IIe schematic 050-0051-D", "Sams Computerfacts: Apple IIe" | reva, revb | their `board: '820-0064'` |

Not tagged: the repair-procedures manual (covers all), the international schematic 050-0054-A (a region variant,
not in the board list), every power and connector record (no source ties them to a revision).

## Uncertainties

- Apple IIe: A2N says only "87-A" for the enhanced board; the 820-0087 prefix comes from the photographed
  820-0087-C board. Whether the 87-A board still has eight 4164s is inferred from A2ID 1.2.4 naming the 64 x 4
  RAMs as what identifies the later board. The Platinum IIe is not a separate board here (A2N: "no major changes
  ... to the logic board circuitry"). Rev A vs Rev B circuit differences are not described in any source used.
- C64: the identification table prints the B-3 as 250446, its parts list and layout as 250466; the data keeps 250466.
- 1541: the brief's "long board 1540050 / short board 251828" does not match the sources: the long board is assy
  1540008 (schematic 1540001), and 251828 is the gate array of the 1541B/C and 1541-II, not a board.

## Review round 1

Codex skeptic review, report and ledger in `.tmp/review-boards/review-out/` (392 rows: OK 276, WRONG 29,
OVERSTATED 7, UNPROVABLE 80). Three rows (250425 clock "U13", 250469a cpu6510 "U3", dram4164 with 250466) were
planted in the review copy only; the shipped data already reads U31, U6 and no 250466. Every other WRONG and
OVERSTATED row was checked against the page named here before changing anything. No finding was rejected.

| # | finding | action | source opened |
| --- | --- | --- | --- |
| 127 | Service Manual 314001-03 tagged 250425/250466/250469a/b, but it covers the older boards and only the rev A 250469 | boards now 326298, 250407, 250425, 250466, 250469a; board string and note rewritten; "last edition" claim dropped | C64SM pp. 21, 23, 30, 37, 44, 50 |
| 131 | Sams CC17 tagged 250407 and 250425 | 250425 only; `verify` removed | CC17 PDF p. 10: U31 MOS8701; p. 9: eight 4164s |
| 133 | Sams CC20 tagged 250466 and both 250469 | 250466 only; `verify` removed | CC20 PDF p. 13 photo: ASSY NO. 250466 |
| 369 | c64 firstTen step 3 (VR1 7812, CR4, CR5, C88-C90) untagged | tagged to the five breadbin/250466 boards; new 250469 step 3 (F1, C45, CR3, CR4, C66, Q5, R100, CR7) | 252311 power section; C64SM pp. 24, 31, 38, 45 (VR1 7812) |
| 370 | c64 firstTen step 5 (556 U20, R34, C24) untagged | tagged to the five older boards; new 250469 step 5 (RP3, C43, CR5, U23 74LS14, U22) | 252311 reset section; C64SM p. 50 (U20 8701, U23 74LS14, U22 7406/7416) |
| 371 | c64 rail 9 V AC note names VR1 7812 and VR2 7805 | split: original tagged to the five older boards; 250469 variant (F1, CR2, C63, doubler to Q5; no 7812/7805) | 252311 power input |
| 372 | c64 CAEC test point says check U27 on every board | note now names U27 (74LS08) on breadbins and U3 (74LS08) pin 6 on the 250469 | 252311 (U3 pin 6 to 8500 pin 5); C64SM p. 23 (U27 74LS08) |
| sweep | c64 firstTen step 8 "PLA first" | adds "the 251715 or 252535 at U8 on the 250469" | C64SM p. 50; 252311 |
| 373, 379 | 1541 unregulated rail / firstTen step 2 at CR4/CR2 on every board | rail tagged 1540008, 1540048, 250442; firstTen step 2 tagged to the four internal-supply boards with the 250448 bridges named (CR1, CR2) | Tech manual p. 35 (long board CR2/CR4), p. 28 (1540049), p. 33B (250448 CR1, CR2); ADD41 p. 7 |
| 374 | firstTen step 4 "+12 V at CR2 anode from VR1" on every board | tagged 1540008, 1540048, 250442; 250448 variant (VR2 LM340K-12); 1541-II variants for steps 1, 2 and 4 (brick, CN3, CN4) | p. 33A parts list 250448; 312551-01 drawing; ADD41 p. 7 |
| 375 | firstTen step 5 names UB4/UC4/UC2 for every board | ifNot now lists ROM/CPU/VIA per board (251748, 250448, 1541-II) | LEVAKP; ADD41 p. 6; schematic 251748 |
| 376 | +5 V rail "always VR2" | note now names VR2 (1540008, 1540048, 250442) and VR1 (250448), brick on the 1541-II | Tech manual pp. 28, 35, 33A |
| 377 | +12 V rail "always VR1, P7, P5" | split: early boards (original), 250448 (VR2), 1541-II (brick, CN3, CN4) | p. 33A; p. 33B; ADD41 p. 7 |
| 378 | +12VF Q1/Q2 on every board | tagged 1540008, 1540048, 250442 | Tech manual p. 28 (Q1, Q2 +12VF), p. 35; p. 33B uses Q2/Q3 for +5VF |
| 380 | 592 read-amplifier alignment on every board | tagged 1540008, 1540048, 250442 | Tech manual p. 35 (two 592s), p. 28 (UF3, UF4 592); p. 33A hybrid UD1; ADD41 p. 6 CX20185 |
| 381 | "no track 0 sensor" on every board | tagged 1540008, 1540048, 250442 | LEVAK (1541C mechanism with track 0 sensor); p. 33B TRK0 SENSE |
| 382 | Φ2 clock VIA targets UC2/UC3 on every board | where names UC2/UC3 (251748), UC1/UC3 (250448), U6/U8 (1541-II) | p. 33A; ADD41 p. 6 |
| 383-386 | 1541-xfmr, 1541-head, 1541-stepper, 1541-spindle untagged | tagged 1540008, 1540048, 250442 (P1, P8 head pins 1-5, P7, P5 on both early schematics) | Tech manual p. 28 and p. 35; p. 33B uses P8 (transformer), P4 (head), P3, P5; ADD41 p. 7 uses CN2-CN7 |
| 194, 195 | gate-array clock pins tied to board (40-pin 250448, 42-pin 1541-II) | where gives both packages; note "count the pins"; `conflict` with Levak, who lists -02 for the 1541C and -01 for the 1541-II | p. 33A (UC4 251828-01, sub -02); ADD41 p. 6 (U10 -01 or -02); LEVAKP |
| 198 | CN4 shown as the only 1541-II motor header | summary says the 7-pin CN4 is the one 355207 draws and the parts list also has a 5-pin CN4 | ADD41 p. 6 (header 5 pin and 7 pin under CN4) |
| 227 | 1541-II brick drawing note "110 V", "has to be broken open" | note now: 120 V AC 60 Hz in, +5 V 1 A pin 1, +12 V 0.5 A pin 4, 5 A fuse | 312551-01 drawing |
| 149 | 1540048 "Alps mechanism" | note: -01 Alps, -03 Newtronics (Levak) | LEVAK; SM41 p. 23 |
| 259 | enhcf name "(late 1986)" | dropped from the name; note says the identification sheet is dated October 1986 | A2ID 1.2.4 |
| 267 | Sams Apple IIe scan tagged reva, revb only | untagged (covers all four boards); note says the scan binds the identification sheets | A2ID scan pp. 4-7 |
| 319 | Spectrum Issue 1 PDF tagged issue1 only | issue1, issue2; note says the PDF also has the Issue 2 layout | Issue 1/2 PDF p. 1 captions |
| 325, sweep | Issue 2 notes: "5C102 ... dead cockroach transistor patch" and "5C102 ULA" on the layout | schematic note gives 5C102 + 74LS00 spider, 5C112 + diode/resistor or TR6 mod, or 6C001; layout note drops the ULA claim | SM48 4.1.2 p. 21 |
| 337, 339 | Issue 3B "Silkscreen reads ISSUE THREE B" | layout: "Silkscreen reads ISSUE 3B"; schematic: "Drawing titled Issue 3B" | Issue 3B layout bottom line "© 1983 ISSUE 3B" |
| 349, 351 | Issue 6A "two ZX8401 chips" | one ZX8401 (IC27) replacing six 74LS chips; IC28 74LS04 | Issue 6A circuit diagram (IC27 ZX8401, IC28 74LS04); SM48 9.7, 9.9 |
| sweep | Spectrum firstTen step 8 lifts +5 V from IC25 on every issue | qualified: Issues 2 to 4B; on 5 and 6A the ZX8401 replaces six 74LS chips | SM48 9.7, 9.9 |
| sweep | Apple IIe firstTen step 8 "CD and EF ROMs" | adds "(one CF ROM on the late enhanced board)" | A2ID 1.2.4 |
| 84 ... (64 rows) | `years` spans on schematic rows unproven | `years` removed from every c64, c1541, apple2e and spectrum schematic row (71 fields, tagged and untagged); no board entry carries `years` | none states production spans |

Sweep with no change: c64 rails +5 V, test points other than CAEC, clocks, firstTen steps 1, 2, 4, 6, 7 and
connectors; c1541 test points Φ0, Φ2, reset, byte ready, spindle speed; clocks crystal, Φ0, Φ1; firstTen steps
3, 6, 7; Apple IIe power and connectors (the Sams designators are Sams's own grid and no board list shows them
differ); Spectrum rails, test points and clocks.

Validator: firstTen is now checked per board (each board's own list must run 1, 2, 3..., variants share the step
number). Result after round 1: `node scripts/validate-data.mjs` 0 FAIL, 222 WARN (was 226; none of the remaining
warnings is a board-tag error).

Not acted on (UNPROVABLE, not in scope): Commons photo licences (HTTP 403 to the reviewer), Carlsen anecdotes,
KU-14194HB "no assembly number" wording, the 1541 "Carlsen calls it 1540050" aka text.

## Review round 2

Codex skeptic review round 2, `.tmp/review-boards2/review-out/round2-report.md` and `round2-ledger.md` (current
data: OK 216, WRONG 4, OVERSTATED 38, UNPROVABLE 23). Planted in the review copy only, not in the data: 9 V AC
rail with 250469a, C43 "22 µF", 250448 step 4 "VR1" (data reads five older boards, 220 µF, VR2). Pages opened
before each change are named below.

| ledger rows | finding | action | source opened |
| --- | --- | --- | --- |
| 124 | Spectrum +12 V names D5 | where now D15/C44; `conflict` gives both (manual prose D5, drawings D15) | SM48 p. 15 prose "D5/C44"; Issue 5 and 6A circuit diagrams (D15 BA157 into C44; D1-D8 keyboard diodes) |
| 1, 6, 9, 16, 20, 21, 27, 31, 39 | c64 records name the 6510 where the 250469 has the 8500 | every c64 power `where` naming the 6510 now adds "(8500 on the 250469)" (the 250469 reset variant: "8500 at U6"); cassette port summary and pins say "CPU port" | C64SM p. 50 (U6 8500) |
| 79, 85, 90, 100, 102, 107, 109, 110 | Apple IIe records name the 6502 where enhanced boards have the 65C02 | `where` uses "CPU pin" (resolves to cpu6502, "6502 / 65C02 CPU", the first CPU-role chip of apple2e); "swap the CPU (6502, or 65C02 on enhanced boards)"; clock row renamed "CPU Φ1 and Φ2 outputs" | A2ID 1.2.3, 1.2.4. "CPU pin" was not used on the c64: there the VIC-II role also matches "CPU" |
| 4, 25 | older +12 V rail and step 3 still carry the 8580/+9 V clause | clause removed (the 250469 variants carry it) | C64SM pp. 44-45 (250466: 6581, 7812) |
| 28 | older reset "about 0.5 s" for all five boards | expect gives 1.1 x R34 x C24: 0.5 s with 10 µF (manual), 1.1 s with the 22 µF in the 250425 list | c64sm p. 9 circuit theory; parts lists pp. 30, 37, 44 (C24 10 µF / 22 µF / 10 µF) |
| 33, 159 | brick connector and supply notes: 9 V AC makes +12 V and 5 V CAN on every board; "no 9 V AC = no picture" | both now split breadbin/250466 vs 250469 (no picture only where VIC-II +12 V comes from it) | 252311 power section; C64SM p. 8 |
| 37 | expansion port: "the PLA decodes" | adds the 251715/252535 at U8 on the 250469 | C64SM p. 50; 252311 |
| sweep | cassette MOTOR "Q1-Q3" | Q1-Q3 on breadbins, Q1, Q2 on the 250469 | 252311 cassette section (Q1 2SD313, Q2 2SC1815) |
| 43, 294 | 1541-II +12 V rail lists CN4 pin 6 unqualified | note: pin 6 is on the 7-pin CN4; 5-pin header also listed | ADD41 p. 6 |
| 49 | byte ready "gate array BYTE" on every board | gate array on short boards and later, discrete logic on the long board | Tech manual p. 35 (no gate array) |
| 51 | spindle speed VR1/strobe on every board | tagged to the four internal-supply boards, `verify: true` (1541-II mechanisms vary) | LEVAKP drive list; ADD41 p. 6 |
| 53 | crystal "Y1" on every board | "Y1 (16 MHz crystal module UD2 on the 250448)" | p. 33A (UD2 crystal module 16 MHz) |
| 71 | IEC summary misses the 250448 | adds P6/P7 on the 250448 | p. 33A (P6,7 6-pin DIN); p. 33B |
| 60, 72 | 1 A line fuse stated for every mains version | "1 A slow-blow on 120 V drives" | SM41 p. 32 fuse 903556-16; p. 4 spec 120 V |
| 73 | 1541-II brick "700 mA bricks fail warm" | clause removed | not in 312551-01 or ADD41 |
| 74 | head: "pin 5 usual on Newtronics, not repairable" | clause removed; "an open one means a bad head (Carlsen)" kept | SM41 p. 21 resistance check |
| 75, 299 | stepper Q8-Q11/UD1 applied to the long board | adds long board Q4-Q7, 74LS139 decoder, 7406 UF2 | Tech manual p. 35 (reviewer zoom `render/round2-long-stepper.png`) |
| 76, 299 | spindle 7417 UD2 applied to the long board | adds 7417 at UG4 on the long board | Tech manual p. 35 |
| 160 | c1541 supply: CR4/CR2 check and C15 anecdote universal; `external: false` / `1541-xfmr` | both notes now say "1540008, 1540048 and 250442 boards". `supply` is one record per machine: it cannot carry `boards`, so `external`/`connector` stay for the internal-supply boards and the 1541-II note says so. Listed as a schema limit | p. 33A, p. 33B; ADD41 p. 7 |
| 82, 120 | AY-5-3600 named universally | "keyboard encoder; the late CF ROM board photo shows a KR9600-PRO" in the -12 V rail and the keyboard connector | photo apple2e-820-0087.webp (silk AY3600931 PRO, KR9600-PRO) |
| 120 (second part) | "1987 edition corrects pins 11/18" not shown in the 1985 scan | kept: the connector cites the 1987 TRM, Table 7-16, which reads "11 LCNTL" | cached 1987 TRM text (iie87.txt) |
| 161 | Apple supply: Astec early / Dyna-Comp late, RIFA prevalence | name now "Astec or Dyna-Comp"; the RIFA note is `{ text, verify: true }` | TRM pp. 159-160 do not name makers |
| 254 | 050-0051-D note: enhanced boards are the same PCB | note: a kit-upgraded Rev B keeps this PCB; factory enhanced boards are 820-0087 | A2ID 1.2.3, 1.2.4 |
| 257, 305 | Sams Apple IIe board string "820-0064", rev "A" | board "All IIe boards", rev "All (identification sheets)" | A2ID scan pp. 4-7 |
| 158 | Spectrum edge: only Issues 1/2 swap the side letters | summary: Issue 1/2 documents, the Issue 5 diagram and the Timex 6A drawing label underside B; go by the physical side | Issue 5 circuit diagram ("UNDERSIDE (B)", "COMPONENT SIDE (A)") |
| 139 | ULA temperature rule | `verify: true` | no source states a limit |
| 144 | 50.08 Hz frame rate | no change: already `verify: true` | |
| 115 | aux slot orientation | no change: connector already `verify: true` and says "not checked" | |
| 205 | 326106 sheet 2 "with its errors" | note now "Second sheet of the same drawing." | |
| 209 | KU-14194HB "no assy number, mostly PAL" | note: "Board identified as KU-14194HB Rev B; eight-pin video DIN. A redraw." | bwack replica title |
| 227 | diagnostic manual 326070-01 not checked | `verify: true` | |
| 228, 252, 253, 255, 256, 277 | other uncached manuals | no change: already `verify: true` | |
| 243 | "Chinese boards carry only 340503 but vary" | removed | |
| 246 | brick drawing "reverse-engineered by William Levak", "sealed" | label "Commodore 1541-II/1571-II/1581 power supply P/N 312551-01 drawing"; "sealed" removed | 312551-01 drawing (title block) |
| 273 | Issue 6A "last 48K board, also in the Spectrum+" | removed; note keeps IC27 ZX8401 and IC28 74LS04 | SM48 9.9 |
| 278-281 | photo author/licence provenance (Commons 403) | left as is: licences were checked when the photos were added (docs/verification/photos.md) | listed here only |
| 313-316 | round 1 "sweep with no change" was too broad | superseded by the rows above | |

Validation after round 2: 0 FAIL, 222 WARN.

## Review round 3

Codex GPT-6.1 Sol (medium) re-checked every round-2 row and each changed power record: 83 audit rows, OK 59. Its WRONG rows for the C64 step 8 "8502" and the Spectrum 4116 "pin 9" were planted in the review copy (both caught). Lead fixes for the rest:

| Finding | Action |
|---|---|
| 1541 Maintenance Guide labelled as Commodore's | Label now names Michael G. Peltier, Peltier Industries (title page) |
| 1541 stepper phase pins name short-board Q8-Q11 only | Desc adds the long board's Q4-Q7 |
| 1541 /MTR names UD2 only | Desc names UD2 (short) and UG4 (long) |
| Spindle speed "VR1 on the motor control board" universal | Now "the speed pot on the motor control board, where the mechanism has one" (still `verify`) |
| Spectrum ULA temperature "socket it" | Removed; record stays `verify` |
| Apple IIe RIFA claim tied to Astec | Now "many of these supplies"; still `verify` |
| Apple euro schematic "240V version" | Note reduced to what the title block shows |

Other UNPROVABLE rows are already flagged `verify` and shown with CHECK. The C64 brick record, the IIe keyboard correction and the four photo credits were confirmed from fresh sources.
