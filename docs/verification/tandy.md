# Tandy verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| Color Computer Technical Reference Manual (Tandy, 26-3193) | https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf | CoCo 1: memory map (p. 4), cassette (p. 32), RS-232 Figure 13 (p. 33), power supply and 723 (pp. 33-34), cartridge Table 5 (p. 36), TV switch box (p. 41), schematic sheets 2 and 3 (joysticks P3/P4, cassette P5, power supply E1-E8, RAM U20-U27) |
| Color Computer 2 NTSC Service Manual (26-3026/3027) | https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%202%20NTSC%20Service%20Manual%20(26-3026%20%26%2026-3027)%20(Tandy).pdf | MC6809E pin figure (p. 23), SALT supply Figure 4-13 (pp. 44-46), RS-232 Figure 4-15 (p. 49), cartridge Table 3 (p. 53), transformer and joystick Figure 4-16 (p. 55), cassette/RS-232/joystick/power troubleshooting (pp. 80-86) |
| Color Computer 3 Service Manual (26-3334) | https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Service%20Manual%20(Tandy).pdf | Specs incl. RGB header, video/audio RCA, RF (pp. 23-25), SALT supply Figure 5-12 and CN7 (pp. 44-45), RS-232 Figure 5-14 (pp. 47-48), cartridge Table 3 (p. 51), transformer and joystick Figure 5-15 (p. 52), troubleshooting and power check (pp. 56-58), GIME TCC1014 pin diagram (p. 96), schematic (pp. 103-104) |
| Color Computer 3 Revised Schematic (Ty Sopko, redraw of the Tandy original) | https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Revised%20Schematic%20(Ty%20Sopko).pdf | GIME U6 pin numbers, 6809E NC pins, CN3 RGB, JK1-JK4, X1 28.63636 MHz, power section. Cross-checked against the faint Tandy original (SM pp. 103-104) |
| Color Computer Technical Bulletins (Tandy) | https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Bulletins%20(Tandy).pdf | CC:2 line-cord terminals (p. 3), CC:3 -5 V failure / C18 (p. 5), CC:15 64K upgrade power jumpers (pp. 28-34) |
| MC-10 Service Manual (26-3011, NTSC) | https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf | Specs (p. 8), CPU and reset (p. 12), RS-232 (p. 14), I/O connector Table 1 (p. 15), power supply (p. 17), troubleshooting (p. 23), connector parts list (p. 26) |
| MC-10 Schematic D-11531 (Tandy) | https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Schematic/MC-10%20Schematic%20(Tandy).pdf | U1 MC6803 pin use, J1 cassette, J2 serial, J3 8 V AC, RF out, 7805 |
| Motorola MC6809E data sheet (DS9846-R2) | https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf | Pin assignment (p. 1), BUSY description |
| Motorola MC6847/MC6847Y data sheet (DS9823-R1) | https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847%20MOS%20Video%20Display%20Generator%20(Motorola).pdf | Pin assignment (p. 1), signal descriptions (pp. 12-13) |
| Motorola SN74LS783/MC6883 data sheet | https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf | Pin assignment (p. 5-323), pin description table (p. 5-326) |
| pinouts.ru CM-8 / CoCo RGB (secondary) | https://old.pinouts.ru/Video/Cm8CoCoRGB_pinout.shtml | RGB header pin 6 key, pin 10 n/c |
| pinouts.ru CoCo cassette (secondary) | https://old.pinouts.ru/HD/CassetteCoCo_pinout.shtml | Cassette DIN-5 cross-check |

Every URL above returned HTTP 200/206 on 2026-10-30. Page anchors are `#page=<PDF page>`. Tandy PDFs are scans; pages were rendered and read as images.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| cpu6809e | 40/40 | MC6809E data sheet p. 1; NC pins from the CoCo 3 schematic |
| vdg6847 | 40/40 | MC6847 data sheet p. 1, pp. 12-13 |
| sam6883 | 40/40 | MC6883 data sheet pp. 5-323, 5-326 |
| gime-tcc1014 | 68/68, new table (was `pins: null`) | CoCo 3 SM p. 96; Sopko schematic U6 |
| cpu6803 | 40/40 | MC-10 schematic D-11531 U1; MC-10 SM p. 12 (no Motorola data sheet reached) |

Totals: 160 existing pins checked, 68 new GIME pins, 0 pins left `verify`.

## Changes

| Chip / connector | Pin | Old → new | Source |
|---|---|---|---|
| cpu6809e | 34, 35 | E, Q dir out → in (clock inputs from SAM/GIME) | MC6809E data sheet |
| cpu6809e | 33 | BUSY "waits for memory" → HIGH on RMW and first byte of double-byte access | MC6809E data sheet |
| cpu6809e | 39 | "Held LOW on the CoCo" (unsourced) → tied to ground on the CoCo 3 | Sopko schematic |
| vdg6847 | 9 | CHB "chroma B" → chroma bias reference | 6847 data sheet p. 12 |
| vdg6847 | 10, 11 | B, A → ΦB, ΦA chroma outputs | 6847 data sheet p. 1 |
| vdg6847 | 12 | /MS "mode select" → memory select (three-state control) | p. 13 |
| vdg6847 | 31, 34, 35 | INT/EXT, A/S, A/G → /INT/EXT, /A/S, /A/G (active low) | p. 1 |
| vdg6847 | 36 | RP in → /RP out | p. 13 |
| vdg6847 | 37, 38 | FS, HS → /FS, /HS (active low) | p. 1, p. 13 |
| vdg6847 | 39 | CSS "colour subcarrier sync" video out → colour set select ctrl in | p. 13 |
| sam6883 | 8 | DA0 out → in (from VDG) | 6883 p. 5-326 |
| sam6883 | 12 | /RAS → /RAS0 | 6883 p. 5-323 |
| sam6883 | 20 | VSS → GND | 6883 p. 5-323 |
| sam6883 | 28-35 | MA0-MA7 → Z0-Z7 (MA kept in desc; Z7 doubles as /RAS1) | 6883 p. 5-326 |
| cpu6803 | 22-29 | P47-P40 type data bidir → addr out (A15-A8) | MC-10 schematic |
| cpu6803 | 30-37 | P37-P30 type addr → data bidir (mux A/D) | MC-10 schematic |
| cpu6803 | 38, 39 | SC2, SC1 "mode select" in → R/W, AS outputs | MC-10 schematic; SM p. 12 (mode set by P20-P22) |
| cpu6803 | 3 | EXTAL → EXTAL2, 3.579545 MHz from modulator | schematic; SM p. 12 |
| machines coco1-3 | sound | "One-bit output" → 6-bit DAC plus single-bit | TRM p. 32; CoCo 2 SM specs |
| chipLocations | pia6821 | CoCo 2 "U8/U4" → U7/U2; CoCo 3 → IC5/IC4 | CoCo 2 SM; CoCo 3 SM |
| symptoms coco2, coco3 | PIA notes | U8/U4 → U7/U2, IC5/IC4 | same |
| power coco3 | crystal | 14.31818 MHz → 28.63636 MHz | Sopko schematic X1 |
| power mc10 | input | "+8 V DC" → 8 V AC 1.5 A adapter, about 10 V DC after bridge | MC-10 SM pp. 8, 17, 23 |
| coco-rgb | kind | DIN-10 → 10-pin header on the board bottom | CoCo 3 SM p. 25 |
| all connectors | pins | empty → full tables | as cited per connector |

## Conflicts

- gime-tcc1014 pin 20: SM p. 96 block diagram prints 26 for FIRQ (clashes with A1); schematic gives 20. Kept 20.
- cpu6803 pin 30: MC-10 SM p. 34 block diagram puts D0/A0 at 30 and D8/D9 at 38/39; schematic gives D7/A7 at 30, D0/A0 at 37. Kept the schematic.
- coco-rgb pin 10: pinouts.ru says n/c; Sopko redraw ties it to the R61/R62 pull-up node. Left `verify`.
- mc10-serial pins 1, 2: a reader note in the archive copy of the SM says CD and RS-232 IN are swapped; original text and schematic say 1 = CD, 2 = IN. Kept the original.

## Still missing

- rom-color-basic, rom-micro-basic: pin tables not captured (no ROM pinout page read).
- 6803: no Motorola MC6801/6803 data sheet reached (bitsavers returns 403); verified against the Tandy schematic only.
- Card-edge row layout (CoCo cartridge, MC-10 I/O): Tandy manuals list pins but do not draw rows. Drawn as odd/even; flagged in each summary.
- CoCo 3 RGB 2 × 5 pad order: assumed standard header numbering.
- coco-rf jack type on CoCo 1/2: RCA taken from the CoCo 3 spec (connector `verify`).
- mc10-power jack form: listed only as "POWER JACK"; barrel assumed (`verify`).
- CoCo 2 internal transformer connector: not drawn in the 26-3026 SM; no table, no `supply.connector`.
- CoCo 1 E1-E4 physical lug order and E3 raw DC value: not given in the TRM.
- "12 V rail on the F-board": not found in the TRM or the bulletins (they cover D, E and the AX-9328 revised board). Notes record the sourced D/E-board issues instead.
- "CoCo 3 -12 V": the CoCo 3 SM shows no ±12 V rail; RS-232 runs from the SALT -5 V.
- Dragon 32 (`moved to dragon.js (own brand)`): untouched.

## For other files

- pia6821 (heathkit.js): no contradiction found; only designators supplied via `chipLocations`.
- dram4116 (sinclair.js): TB CC:15 confirms 4116 pins 9 = +5 V, 8 = +12 V, 1 = -5 V on the CoCo boards.
