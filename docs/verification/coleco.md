# Coleco verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| ColecoVision Technical Manual (Coleco repair manual, 1983) | https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf | System description (PDF p. 4), memory and VDP clock (p. 8), hand control and power supply (p. 9), parts list with designators J1-J6, U1-U26 (p. 23), power supply part S55416 (p. 28), signal pictures J4:2-J4:8, U1, U9 (pp. 58-72), technical tips (p. 78). The V-1 schematic page is missing from this scan. |
| Coleco ADAM Technical Reference Manual (preliminary release) | https://colecovisionadam.com/Coleco/adam/Documents/Manual/Coleco_ADAM_Technical_Reference_Manual.pdf | Master 6801 and MIOC (p. 18), expansion port P1 table (p. 20), interconnects (pp. 25-29), J2/J8/J9/J1 cartridge (p. 30), controller pin out (p. 35), data drive J10/J11 (pp. 38-40), EM#3 differences incl. pins 40/45 (p. 41), keyboard (p. 44), Fig. 2-5 controller configuration (p. 47), power supply (pp. 48-49), memory map (p. 50), appendix schematics and parts list (pp. 143-150; low-resolution scans) |
| ColecoVision console schematic, KiCad redraw Rev J (colecovisionadam.com) | https://colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf | Nine sheets: J1/J2 (sheet 2), power and wire colours (3), sound (4), clock/reset (5), controllers J5/J6, U18/U19/U24 (6), VDP/VRAM (8), CPU/ROM/RAM/decoders (9). Community redraw, used as the ColecoVision schematic and checked pin by pin against the ADAM manual. |
| Motorola Single-Chip Microcomputer Data (1984), MC6801/MC6803 data sheet p. 3-52 | http://www.bitsavers.org/components/motorola/_dataBooks/1984_Motorola_Single-Chip_Microcomputer_Data.pdf#page=99 | MC6801 pin assignment |
| Motorola MC6801 Reference Manual (May 1984) | http://www.bitsavers.org/components/motorola/6801/MC6801RM_AD2_MC6801_Reference_Manual_May84.pdf#page=46 | Fig. 3-1 pin assignment; section 3 pin functions (SC1/SC2 in single-chip mode, port 2 mode/timer/SCI) |
| TI SN74LS541 data sheet SDLS180 | https://www.ti.com/lit/ds/symlink/sn74ls541.pdf | 74LS541 pinout |
| Deathskull Labs, ColecoVision Controller Port (1998) | https://arcarc.xmission.com/Web%20Archives/Deathskull%20(May-2006)/games/tech/cvcont.html | Second source for controller pins, keypad codes, EM#2 |
| Deathskull Labs, Power Supply Info | https://arcarc.xmission.com/Web%20Archives/Deathskull%20(May-2006)/games/tech/power.html | Supply ratings 0.9/0.3/0.1 A, 4-pin layout "4 1 / 3 2" (plug face) and colours |
| colecovision.dk Technical page and connector photo | https://www.colecovision.dk/technical.htm, https://www.colecovision.dk/images/cv-power-connector-big.jpg | Rear view of console J3 with wire colours (used to orient the pads); failure ranking |
| Computer History Museum 102716582 | https://www.computerhistory.org/collections/catalog/102716582 | Label "COLECO Model No. 55416 Plug In Power Supply for COLECOVISION" |
| Tom's Guide forum (rec.games.video.classic archive) | https://forums.tomsguide.com/threads/colecovision-power.248153/post-1092843 | TI-99/4A supply: same connector, 18 V AC (secondary) |
| AdamArchive, Universal Serial-Parallel Interface Analysis v1.0 | https://adamarchive.org/archive/Technical/ADAM%20Hardware/ADAM%20-%20Universal%20Serial-Parallel%20Interface%20Analysis%20v1.0.pdf | ADAMnet devices normally use RJ12 jacks (secondary) |
| Hackaday.io ADAM+ log "ADAM keyboard" | https://hackaday.io/project/186178-adam/log/208185-adam-keyboard | Keyboard cable is 6P6C (secondary) |
| The First Book of ADAM (Que, 1984) | https://colecovisionadam.com/Coleco/adam/Library/Repository/The_First_Book_of_Adam.pdf | RESET lever (PDF p. 44), PR# (p. 128) |
| Wikipedia, Coleco Adam | https://en.wikipedia.org/wiki/Coleco_Adam | Start-up surge erases media; PSU in printer (secondary, notes only) |

All 22 URLs in the file returned HTTP 200/206 on 2026-10-30. consolemods.org, gametechwiki.com and forums.atariage.com return 403 to scripted fetches and are not cited.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| mcu6801 | 40/40 | MC6801/MC6803 data sheet p. 3-52; MC6801 Reference Manual Fig. 3-1 and section 3 |
| ls-controller (now 74LS541, U18/U19) | 20/20 against the data sheet; ColecoVision usage on 18 pins from the redraw | TI SN74LS541 SDLS180; ColecoVision Technical Manual parts list and tips |

Totals: 60 chip pins checked against a data sheet, 3 corrected, 20 filled from `null`. Two pins keep `verify` (74LS541 pins 6 and 9: the ColecoVision use of those inputs, spinner-circuit status on D4 and D7, is traced from the redraw only).

Connector pins sourced: ColecoVision 111 (power 4, cartridge 30, controller 9, expansion 60, RF 2, RF riser 6); ADAM 129 (printer cable 9, cartridge 30, controller 9, expansion 60, RF 2, video 2, J10 9, J11 8).

## Changes

| Chip / connector | Pin | Old → new | Source |
|---|---|---|---|
| mcu6801 | 3 | EXTAL → EXTAL2 | MC6801 data sheet |
| mcu6801 | 38 | SC2 "mode select" input → SC2 output (OS3 output strobe in single-chip mode) | MC6801 RM 3.2 |
| mcu6801 | 39 | SC1 "mode select" → SC1 input (IS3 input strobe); mode is latched from P20-P22 at reset | MC6801 RM 3.1.9.2 |
| mcu6801 | 8-12, 21, 40 | descriptions: PC0-PC2 mode bits, TIN/TOUT/SCLK/RX/TX; E = 1 MHz on the ADAM (4 MHz crystal) | MC6801 RM; ADAM TRM p. 18 |
| ls-controller | all | `pins: null`, "part number not captured" → 74LS541 octal buffer, DIP-20, U18/U19 | CV TM parts list; redraw sheet 6; TI data sheet |
| adam-mio | name, pkg | "memory I/O chip, part not on sheet" → MIOC (Memory Input Output Controller), DIP-40, 22 in / 16 out | ADAM TRM p. 18 |
| eos-rom | role | "in the console and the printer" → on the Memory and I/O board (printer holds only its 6801) | ADAM TRM pp. 16-18, 50 |
| colecovision machine | chips | added sram2114 (U3, U4) and ls138 (U5, U6); designators via `chipLocations` for U1, U2, U9, U10-U17, U20 | CV TM parts list; redraw |
| cv-controller | 5, 8 | "ground this to select keypad/joystick mode" → strobe outputs driven LOW by the console (U24 latch, port $80 / $C0) | ADAM TRM p. 35; redraw sheet 6 |
| cv-controller | 7 | "NC?" → spinner B (D5) | ADAM TRM Fig. 2-5; redraw; Deathskull |
| cv-controller | 9 | "NC?" → spinner A (INT) | same |
| cv-controller | 1-4, 6 | joystick/keypad bits now named with their data bits (1 = D0 up, 2 = D2 down, 3 = D3 left, 4 = D1 right, 6 = D6 fire) | ADAM TRM p. 35, Fig. 2-5 |
| cv-controller | gender | none → male | redraw sheet 6 (DB9_Male) |
| cv-power | all | empty → 4-pin `custom`, male: 1 +5 V, 2 -5 V, 3 +12 V, 4 GND | redraw sheet 3; Deathskull; colecovision.dk photo |
| cv-expansion | all | empty → 60 pins, `edge-30x30-seq` | redraw sheet 2; ADAM TRM p. 20 |
| adam-adamnet | kind | "3.5 mm jacks" → 6P6C modular (RJ12 style); pins still unsourced | ADAM TRM p. 30; USP analysis; Hackaday |
| adam-printer-power | all | "+5 V, +12 V and -5 V", no table → DE-9 J9, 9 pins incl. +12VL, +12VI, ADAMnet, reset | ADAM TRM 6.3 (p. 49) |
| power colecovision | test point | "VRAM -12 V" → "VRAM +12 V" (the ColecoVision has no -12 V) | redraw sheet 8 |
| power colecovision | test points | added 7.159 MHz (U22 pin 8), 10.7 MHz VDP pin 40, 3.57954 MHz J4 pin 8, SN76489 pin 14 | CV TM pp. 8, 60, 72, 78 |
| power adam | rails | +5/+12/-5 with `verify` → TRM tolerances, +12 V split into +12VL and +12VI | ADAM TRM p. 49 |
| symptoms colecovision | VRAM note | "check the -5 V and -12 V rails" → "+12 V and -5 V" | redraw sheet 8 |
| symptoms colecovision | controllers | "decoders and the VDP scanline IRQ" → U6 (keypad), U18/U19 (inputs), U24 (spinner) | CV TM tips p. 78 |
| quickref colecovision | modules | "Expansion Module #1 (Super Action controllers)" → Atari 2600 adapter | Deathskull (2600 emulator module); ADAM TRM (EM#3 = ADAM) |
| quickref colecovision | memory | `verify` cleared; added $2000-$5FFF expansion selects | CV TM p. 8; redraw sheet 9 |
| quickref adam | keys | "Reset switch… hold for a cold reset" → computer RESET lever (pull forward; loads SmartBASIC from drive A) | First Book of ADAM p. 44 |
| quickref adam | memory | one `verify` line → lower/upper 32 KB options via port $7F | ADAM TRM p. 50 |
| terms | keypad-matrix, adamnet | rewritten to match the strobe scheme and the 62.5 kbit/s bus | ADAM TRM |

New connectors: ColecoVision cv-cart, cv-rf, cv-rf-riser (J4). ADAM adam-cart, adam-controller, adam-expansion (P1), adam-slot1, adam-slot2, adam-rf, adam-video, adam-tape-j10, adam-tape-j11. Ids kept: cv-power, cv-controller, cv-expansion, adam-adamnet, adam-printer-power, adam-memory-slots (now slot 3, J5), adam-smartkeyboard.

## Conflicts

- Expansion pin 35: redraw = PCLK (SN76489 clock); ADAM TRM P1 = "Sound chip 76489 disable, 0 V DC". Redraw kept for the ColecoVision, TRM for the ADAM's P1.
- Expansion pin 36: redraw = active-high RESET; TRM = "Not in use".
- Expansion pin 56: redraw = AUDIOOUT (U20 pin 7); TRM prints "AUDIO 76489 RDY output". Redraw kept; ADAM P1 pin 56 marked `verify`.
- Expansion pin 40: the ColecoVision has the 3.58 MHz clock through R26 (470 Ω); the ADAM's own P1 has /BIORQ. Both stated; TRM 2.4 confirms the ColecoVision clock on 40.
- These are `conflict` fields on connector pins; the validator only reports chip-pin conflicts, so they do not show as WARN.

## Still missing

- eos-rom and adam-mio pin tables: no data sheet; the TRM appendix schematic is too low-resolution to read pin numbers.
- ADAMnet jacks J2/J8 and the keyboard cable: signals known (data, reset, +5 V, ground), contact order not in the TRM text; schematic scan unreadable. Kept `verify`, no pins, no `geo` (2 WARN).
- ADAM internal slots J5, J6, J7: signal lists only (TRM 2.1.9b-d); pin numbers unreadable on the scan; no pin count confirmed. Kept `verify`, no pins, no `geo` (3 WARN).
- CV RF riser J4 pins 1 and 5: not named in the Technical Manual. Single-row pad layout assumed.
- ADAM J10/J11 single-row pad layout assumed from "9 pin header"/"8 pin header" in the blurred parts list.
- Card-edge orientation (which face is up, which end is pin 1) for the cartridge slot and both 60-pin ports: not stated in any source read.
- ADAM printer-cable DE-9 gender: read from a blurred parts list (part 75450, the same as the ColecoVision's male controller sockets). ADAM controller-port gender assumed from the ColecoVision board.
- RF and composite jacks: RCA style from photos, not a manual (`verify`).
- ColecoVision rail tolerances: not given by Coleco; expects kept `verify`.
- ADAM designators for the 6801s, VDP, PSG, DRAM: CPU and Memory and I/O board drawings unreadable.

## For other files

- rom2764 (heathkit.js): the ColecoVision BIOS U2 is a 9464C-0036 mask ROM, not 2764-pinout as fitted. The redraw (sheet 9) shows A11 on pin 20, A12 on pin 23 and pin 2 through solder traces, /EP on pin 22, pins 1, 26, 27 NC; jumpers WJ4/WJ5 convert the socket for a 2764 EPROM. Listed via `chipLocations` with that note. Separately, heathkit.js names rom2764 pin 26 "A13"; on a 2764 pin 26 is NC (A13 is the 27128).
- vdp9918 (ti.js): the ColecoVision Technical Manual signal pictures (PDF pp. 70-72) confirm the TMS9928A pins 35 = B-Y, 36 = Y, 38 = R-Y and 40 = VDP clock; the redraw adds 37 GROMCLK and 39 XTAL2 unconnected, with pin 40 driven by an external 10.7 MHz clock (no crystal). This settles the `verify` on 35, 36 and 38 for the 9928A variant.
- dram4116 (sinclair.js): the redraw (sheet 8) agrees: 1 VBB -5 V, 8 VDD +12 V, 9 VCC +5 V, 16 VSS.
- Task brief: the ADAM supply has no -12 V rail (TRM 6.1: +5, -5, +12VL, +12VI, plus 18 V unregulated in the printer). The ColecoVision supply model is 55416 (parts list S55416), not 55-9089.
