# Dragon Data verification — 2026-10-30

`dragon32` moved out of `tandy.js` (machine and header comment; it had no chipLocations, symptoms, connectors, power, quickref or resources). `tandy.js` no longer mentions the Dragon. New file `src/data/dragon.js`: brand `dragon`, machines `dragon32` and `dragon64`, both `ready`.

## Sources used

| Title | URL | Covered |
|---|---|---|
| Dragon 32 circuit diagram SA2120 sheets 1-3 and PSU SA2121 (GIF scans) | https://dragondata.worldofdragon.org/tech/circuit-diag/index32.html | IC designators, crystal, reset, PIA wiring, mux, joystick, cassette, printer, keyboard, expansion, PL6, PL9, PL10, PL11, regulators |
| SA2120 Mk II scan set (zip, clearer copy of the same sheets) | https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA2120-D32-Cricuit-Diagram-MKII.zip | Read for everything above; SA2121 PSU sheet |
| Dragon 64 CPU 64K (PAL) CD41505 sheets 1-3, PSU CD41519 | https://dragondata.worldofdragon.org/tech/circuit-diag/index.html | Dragon 64 designators, 14.218 MHz crystal, PL7, PL8 RS-232, 6551, PL6, PL9 9-way, PL10, PL11, LM7912, 79L05 |
| Dragon Data internal repair notes (Dragon 32) | https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32-Internal-repair-notes.pdf | Service sheets, Dragon 64 memory map (pp. 4-5), PSU/CPU board types and mods (pp. 6-14) |
| Dragon Data Service Information RWEW/KA/0080a-0082a | https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf | Symptoms and IC fault order |
| Inside the Dragon (Smeed and Sommerville, 1983) | https://archive.worldofdragon.org/browse/downloads/Books/InsideTheDragon%20-%20Smeed%20and%20Sommerville%20(1983).pdf | Cartridge pin table (pp. 221-223), printer, keyboard, joystick, sound mux select, reset (9.1), Dragon 64 appendix, PIA bit summary (App. 7) |
| Dragon 32 Information for Machine Code Users (Dragon Data, March 1983) | https://dragondata.worldofdragon.org/Publications/Info_for_mc_users/Info_For_Machine_Code_Users_original.pdf | Cassette, joystick and monitor DIN pinouts, memory map, PIA bits |
| Dragon 32 Additional Information leaflet | https://dragondata.worldofdragon.org/Publications/BASIC-MAN/d32-add-info.pdf | Printer pin table and row orientation (p. 3), memory map (p. 4) |
| Dragon 64 Supplement | https://dragondata.worldofdragon.org/Publications/BASIC-MAN/DD_D64_Supplement.pdf | RS-232 DIN pinout (p. 8), 64K mode, auto-repeat, 64K memory map |
| Dragon 32 Introduction to BASIC Programming | https://dragondata.worldofdragon.org/Publications/BASIC-MAN/DRAGON_32_BASIC_MANUAL_rel-v2.pdf | Keys, RESET behaviour, editor, BASIC syntax, rear-panel key |
| The Dragon Archive wiki: PSU Pictures | https://archive.worldofdragon.org/index.php?title=PSU_Pictures | Transformer labels (Ref. 28475: 8.5 V 1.5 A, 14/28 V 0.25 A; CT: 8 V 1.5 A, 28 V 250 mA CT) and the 9-way D plug |
| The Dragon Archive wiki: Dragon 32 - 64K Upgrade (R. W. Hall) | https://archive.worldofdragon.org/index.php?title=Dragon_32_-_64K_Upgrade | 4116 rail pins, Issue 2 RAM jumpers, IC35 pin 12 RAM sense, 128-cycle refresh 4164 |
| The Dragon Archive wiki: Keyboard, Dragon 64, Dragon 200 | https://archive.worldofdragon.org/index.php?title=Technical | Matrix, Tano and Dragon 200 notes |
| Motorola MCM68A364 data sheet, p. 2-191 (1981-82 Memory Data Book) | https://bitsavers.org/components/motorola/_dataBooks/1981_82_Motorola_Memory_Databook.pdf#page=209 | ROM pin table |
| Motorola MC14529B data sheet, p. 7-457 (1978 CMOS Data Book) | https://bitsavers.org/components/motorola/_dataBooks/1978_Motorola_CMOS_Data_Book.pdf#page=506 | Mux pin table and truth table |
| World of Dragon forum, Printer options (second source) | https://archive.worldofdragon.org/phpBB3/viewtopic.php?p=13200 | Photo: 20-way IDC socket on the Dragon end of the printer cable |

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| `rom-dragon32-basic` (new) | 24/24 | MCM68A364 data sheet Pin Assignment p. 2-191; SA2120 sheet 1 (IC17, IC18 pin numbers match) |
| `mux14529` (new) | 16/16 | MC14529B data sheet p. 7-457; Dragon wiring from SA2120 sheet 2 and Inside the Dragon pp. 208-209, 221 |
| `rom-dragon64-basic` (new) | none, `pins: null` | — |
| Shared, not edited: `cpu6809e`, `vdg6847`, `sam6883` (tandy.js), `pia6821` (heathkit.js), `dram4116` (sinclair.js), `dram4164`, `acia6551` (commodore.js) | Dragon pin uses checked against the sheets (6809E 32/34/35/37, SAM 5/6/7, VDG 33/37/38, PIA PA/PB/CA/CB, 6551 6/7/9/10/11/12/16/17, 4116 1/8/9) | listed by id with `chipLocations` |

Designators: Dragon 32 (SA2120) CPU IC19, SAM IC15, VDG IC12, PIAs IC26 ($FF00) / IC35 ($FF20), ROMs IC17 / IC18, 4116 IC1-IC8, 4529 IC20. Dragon 64 (CD41505) CPU IC38, SAM IC39, VDG IC10, PIAs IC5 / IC8, 6551 IC11, ROMs IC34 / IC37, 4164 IC15, 16, 21, 22, 26, 27, 32, 33, 4529 IC6. The Dragon 64 sheet is a poor scan; the 4164 list is read from the "to be repeated" note and the data-bit labels.

## Changes

| Item | Old → new | Source |
|---|---|---|
| `dragon32` brand | `tandy` (planned, from memory) → `dragon` (ready) | brief |
| Joystick geo | brief said `din5-180` → `din5-240` | SA2120 sheet 2 and CD41505 sheet 1 both mark PL3/PL5 "5 pin DIN 240°" |
| Power supply | brief: possibly internal linear supply → external transformer only ("power pack"), regulators on the internal PSU board | SA2121, CD41519, BASIC manual rear-panel key, PSU Pictures |
| Power connector | unknown → 9-way D (machine side pins, from the plug photo) | PSU Pictures, CD41519 PL9 numbering |
| Windings | "8.5 V AC and 28 V AC CT: verify" → confirmed: 8–8.5 V AC 1.5 A, 28 V AC CT (14-0-14) 0.25 A | transformer labels |
| Regulators | brief "7805/7812/7905" → Dragon 32: LM309, LM7812, LM7905; Dragon 64: LM309, LM7812, LM7912, plus a 79L05 on the CPU board | SA2121, CD41519, CD41505 sheet 3 |
| Printer port | brief "20-pin edge" → 2 × 10 pin header for an IDC socket | Additional Information p. 3, MC Users p. 2, forum photo |
| Cartridge pins 1, 2 | CoCo layout → both +12 V | SA2120 sheet 2, CD41505 PL7, Inside the Dragon p. 221 |

## Conflicts

- Monitor DIN pins 1 and 3: SA2121 PSU sheet labels 1 VIDEO, 3 SOUND. Dragon Data's MC Users sheet and CD41519 give 1 sound, 3 video. Data follows the latter; `conflict` set on the Dragon 32 entry.
- Master crystal: SA2120 sheet 1 marks XL2 "14.32 MHz"; CD41505 marks XL3 14.218 MHz. Dragon 32 test point says 14.218 MHz with `verify`.
- JOYSTK(0): BASIC manual says left joystick; the circuit diagram (X0 from PL3 "joystick R") and Inside the Dragon (select 00 = right X) say right. Recorded as a quirk.
- MCM68A364 pin 20: data sheet "E", polarity a mask option; SA2120 draws it with a bar. Entered as `/E` with `conflict`.
- RS-232 DIN numbering: CD41505 numbers PL8 1-7 round the socket; the Dragon 64 Supplement uses standard DIN numbers. Signals agree by position; data uses the Supplement.

## Still missing

- `rom-dragon64-basic` pin table: no Hitachi HN613128P data sheet found (bitsavers Motorola/National books checked; not searched in Hitachi books).
- LM1889 colour encoder (IC9 / IC17), LM393, 4050, LM348, 74LS244 not defined as chips; they are named in summaries only.
- Printer header and keyboard header physical pad order: the drawings use the documented row rule (printer) or a single row 1-16 (keyboard, verify).
- PSU-to-CPU connector (PL10/PL6) physical form not drawn on any sheet; pads drawn in a row.
- Card-edge row assignment (odd top or bottom) of the cartridge port: no Dragon document draws it.
- Dragon 64 -5 V rail use (79L05) and value: `verify`.
- Cold start by `POKE &H71,0` then RESET is derived from Inside the Dragon 9.1 (flag at $71 must be $55 for a warm start), not stated as a procedure: `verify`. EDIT key list partly from the CoCo editor: `verify`.
- Brief items with no source found: LM309 heat-sink problems and power-brick failure modes (not written in).
- OKI MSM3732 (half-good 64K, 8-chip Dragon 32 boards) not defined.

## For other files

- `sam6883` (tandy.js) pin 5 probe says 14.31818 MHz: true for the CoCo, but the Dragon runs 14.218 MHz (CD41505). Consider making the probe text machine-neutral.
- `mux14529` is new in dragon.js; the CoCo 1 uses the same MC14529 (U9, named in tandy.js connector text). tandy.js could list it by id with a chipLocation.
- `schematics.js` has `dragon32` entries but none for `dragon64`; the CD41505 sheets 1-3, CD41519 PSU and the FS-White-Prints zips at https://dragondata.worldofdragon.org/tech/circuit-diag/index.html are candidates.
- `docs/verification/tandy.md` line 83 still says "Dragon 32 (`planned`): untouched."
