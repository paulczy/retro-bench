# IBM verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| IBM PC Technical Reference, Apr 1983 (1502234) | https://bitsavers.org/pdf/ibm/pc/pc/1502234_PC_Technical_Reference_Apr83.pdf | 8255A bit map (PDF p. 20), interrupt listing (p. 19), I/O channel (pp. 26-30), PSU ratings, P8/P9, Power Good (pp. 32-36), cassette (pp. 36-39), keyboard DIN (p. 86), printer DB-25 (p. 130), MDA DE-9 (p. 137), CGA DE-9, RCA and headers (pp. 163-164), game DA-15 (p. 224), async DB-25 (p. 258), keyboard special keys (p. 327), 16/64K logic diagrams sheets 1-9 (pp. 478-486: U2, U3, U4, U6, U11, U34, U35, U36 wiring) |
| IBM PC Technical Reference, Aug 1981 (6025008) | https://bitsavers.org/pdf/ibm/pc/pc/6025008_PC_Technical_Reference_Aug81.pdf | 63.5 W PSU description and output table (pp. 49-52) |
| IBM PC XT Technical Reference, Apr 1984 (6361459) | https://bitsavers.org/pdf/ibm/pc/xt/6361459_PC_XT_Technical_Reference_Apr84.pdf | Portable block diagram (p. 19), memory map (p. 28), interrupt listing (p. 30), I/O channel (p. 36), I/O map (p. 41), 8255A bit map (p. 45), XT 130 W PSU and P8/P9 (pp. 68-73), Portable 114 W PSU, P8/P9, P12, P13 (pp. 70-75), keyboard DIN (p. 88), Portable modular keyboard jack (p. 89), keyboard special keys (p. 108) |
| IBM PCjr Technical Reference, Nov 1983 | https://bitsavers.org/pdf/ibm/pc/pc_jr/PCjr_Technical_Reference_Nov83.pdf | Component list (p. 34), board and rear-panel connector maps (pp. 36-38), I/O expansion connector (p. 48), cassette (p. 67), light pen and 6845 (p. 101), direct-drive video (p. 108), composite and TV (p. 109), audio (p. 113), SN76496N (p. 114), IR connector (p. 126), cartridge (p. 143), joystick (p. 149), serial (p. 160), 33 W PSU, transformer and power board connectors (pp. 161-165), keyboard cord (p. 254), special keys (p. 368) |
| Intel 1983 Microprocessors and Peripherals Handbook | https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf | 8237A (PDF pp. 112-114), 8259A (p. 144), 8088 (pp. 259-264), 8087 (pp. 355-357), 8284A (pp. 414-415), 8288 (pp. 427-428), 8253 (p. 669), 8255A (p. 696) |
| Motorola MC6845 data sheet | https://bitsavers.org/components/motorola/_dataSheets/6845.pdf | Pin assignment (p. 1), pin description and reset modes (pp. 8-9) |
| minuszerodegrees.net 5150 PSU | https://minuszerodegrees.net/5150/psu/5150_psu.htm | Start-up loading, 5 s off time, 63.5 W vs 63 W labels, -5 V users |
| minuszerodegrees.net 5150 PSU line ratings | https://minuszerodegrees.net/5150/psu/5150_psu_line_ratings.htm | Per-rail limits |
| minuszerodegrees.net 5160 PSU and line ratings | https://minuszerodegrees.net/5160/psu/5160_psu.htm | Start-up loading, 1 s off time |
| minuszerodegrees.net 5155 PSU and line ratings | https://minuszerodegrees.net/5155/psu/5155_psu.htm | Start-up loading quirks, no IBM schematic |
| minuszerodegrees.net bench-top supply drawing | https://minuszerodegrees.net/5150_5160/psu/IBM%205150%205160%20-%20Use%20of%20a%20bench%20top%20power%20supply%20for%20crude%20testing.png | P8 pin 2 unused on 5150/5160, 131 error without -5 V on 64-256 KB boards |
| PCjs 8088 data sheet, MIT 8259A and 8237A copies | https://www.pcjs.org/documents/datasheets/intel/INTEL_8088_CPU.pdf, https://pdos.csail.mit.edu/6.1810/2004/readings/hardware/8259A.pdf, https://pdos.csail.mit.edu/6.1810/2004/readings/hardware/8237A.pdf | Second copies, kept as links |
| IBM BASIC 1.1, BASIC 3.0, DOS 1.1, DOS 2.10 manuals | https://bitsavers.org/pdf/ibm/pc/languages/ and https://bitsavers.org/pdf/ibm/pc/dos/ | Quickref sources only (text not re-read) |

Page anchors are `#page=<PDF page>`. Every URL returned HTTP 200 on 2026-10-30. bitsavers.org returns 403 to clients without a browser user agent; browsers are fine.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| cpu8088 | 40/40 | Intel iAPX 88/10 data sheet Fig. 2, Table 1; 5150 sheet 1 (U3) |
| clk8284 (new table) | 18/18 | Intel 8284A data sheet; 5150 sheet 1 (U11) |
| bus8288 | 20/20 | Intel 8288 data sheet Fig. 2, Table 1; 5150 sheet 1 (U6) |
| pic8259 | 28/28 | Intel 8259A data sheet Fig. 2; PC and XT interrupt listings |
| pit8253 | 24/24 | Intel 8253 data sheet Fig. 2; 5150 sheet 8 (U34) |
| ppi8255 | 40/40 | Intel 8255A data sheet Fig. 2; PC and XT 8255A bit maps; 5150 sheet 9 (U36) |
| dma8237 (new table) | 40/40 | Intel 8237A data sheet Fig. 2, Table 1, note 11; 5150 sheet 4 (U35) |
| fpu8087 (new table) | 40/40 | Intel iAPX 86/20, 88/20 data sheet Fig. 2 (8088 column), Table 1; 5150 sheets 1-2 |
| crtc6845 (new table) | 40/40 | Motorola MC6845 data sheet |

290 pins checked, none left with `verify`. Designators U2, U3, U4, U6, U11, U34, U35, U36 confirmed on the 5150 logic diagrams.

## Changes

| Chip or connector | Pin | Old → new | Source |
|---|---|---|---|
| cpu8088 | 26 | max-mode S2 → /S0 | 8088 data sheet Fig. 2; 5150 sheet 1 |
| cpu8088 | 28 | max-mode S0 → /S2 | same |
| cpu8088 | 30 | max-mode RQ/GT0 → RQ/GT1 | same |
| cpu8088 | 31 | max-mode RQ/GT1 → RQ/GT0 | same |
| cpu8088 | 34 | SS0 → /SS0 (active LOW; HIGH in max mode) | data sheet |
| cpu8088 | 40 | VCC 5 percent → 10 percent | data sheet Table 1 |
| cpu8088 | all | PC-specific pin text removed (shared with heathkit); role and summary made machine-neutral | task rule |
| bus8288 | 18, 19 | /S2 "from 8088 pin 26" → pin 28; /S0 "pin 28" → pin 26 | 8088 data sheet; 5150 sheet 1 |
| bus8288 | 6 | /AEN "from the 8284" → from AEN BRD (DMA logic) | 5150 sheet 1 |
| bus8288 | 15 | CEN "PC ties it HIGH" → driven by /AEN | 5150 sheet 1 |
| bus8288 | 8, 9, 11, 12, 17 | added: 5150 uses AMWC/AIOWC; MWTC, IOWC, MCE/PDEN not connected | 5150 sheet 1 |
| pic8259 | 1, 2, 3, 16 | CS, WR, RD, SP/EN → /CS, /WR, /RD, /SP/EN | data sheet |
| pic8259 | 20, 23 | IR2 "expansion slot" → reserved; IR5 "hard disk or LPT2" → fixed disk | PC/XT interrupt listings |
| pit8253 | 13-23 | 13 OUT2→OUT1, 14 GATE2→GATE1, 15 CLK2→CLK1, 16 /CS→GATE2, 17 /RD→OUT2, 18 /WR→CLK2, 19 A1→A0, 20 A0→A1, 21 CLK1→/CS, 22 GATE1→/RD, 23 OUT1→/WR | 8253 data sheet Fig. 2 |
| ppi8255 | 10-34, 36-40 | 10 /WR→PC7, 11-18 D0-D7→PC6,PC5,PC4,PC0,PC1,PC2,PC3,PB0, 19-25 PC7..PC2→PB1..PB7, 26 PC3→VCC, 27-34 PB0-PB7→D7..D0, 36 PA7→/WR, 37-39 PA6-PA4→PA7-PA5, 40 VCC→PA4 | 8255A data sheet Fig. 2 |
| ppi8255 | PB3 | 5150 "cassette data out" → cassette motor off (data out is timer 2) | PC 8255A bit map; sheet 8 |
| pc-kbd | 3 | "pulled LOW to reset the machine" → -KBD RESET, not used by keyboard | PC TechRef p. 1-78 |
| pc-cass | 2-5 | 2 DATA IN→GND, 3 GND→motor relay N.O., 4 DATA OUT→DATA IN, 5 MOTOR GND→DATA OUT | PC TechRef p. 1-31; sheet 8 J6 |
| pc-mda | 3-9 | 3 INTENSITY, 4 VIDEO, 5 HSYNC, 6 VSYNC, 7-9 NC → 3-5 not used, 6 +INTENSITY, 7 +VIDEO, 8 +HORIZONTAL, 9 -VERTICAL | PC TechRef p. 1-129 |
| pc-cga | 2-9 | 2 RED…9 NC → 2 GND, 3 RED, 4 GREEN, 5 BLUE, 6 INTENSITY, 7 RESERVED, 8 HSYNC, 9 VSYNC | PC TechRef p. 1-155 |
| pc-ser | 1 | FG (chassis ground) → NC; added current-loop pins 9, 11, 18, 25 and all NC pins | PC TechRef p. 1-250 |
| pc-lpt | 18-25 | one "18-25" entry → eight numbered GND pins | PC TechRef p. 1-122 |
| pc-game | all | 6 partial pins → full 15-pin IBM table | PC TechRef p. 1-216 |
| xt-* | all | empty `pins: []` → full tables; XT slot B8 = -CARD SLCTD | XT TechRef pp. 1-16, 3-6, 4-13 |
| quickref xt5160 | ROM | "No Cassette BASIC ROM (verify)" → 64 KB base ROM holds BIOS and BASIC; INT 18h is Resident BASIC | XT TechRef memory map p. 1-9, interrupt vectors |
| quickref xt5160 | $C8000 | $C8000-$C9FFF (verify) → $C8000-$CBFFF fixed disk control | XT memory map |
| quickref pc5150 | SW1 | switches 5-6 table filled in, switches 7-8 added, 3-4 verify cleared | PC 8255A bit map |
| power pc5150 | rails | 4.75-5.25 V etc. → TechRef tolerances (+5 +5/-4 %, -5 +10/-8 %, +12 +5/-4 %, -12 +10/-9 %); wire colours dropped | PC TechRef p. 1-25 |
| machine pcjr | ram, rom, video, sound | verify text → 64 KB (+64 KB expansion), 64 KB ROM + 2 cartridge slots, gate array + 6845, SN76496N | PCjr TechRef p. 2-8 |
| machine pcjr, portable5155 | chips | added clk8284, crtc6845 (PCjr); fpu8087 (Portable) | PCjr TechRef p. 2-13; XT TechRef p. xviii |

## Conflicts

- 5150 PSU minimum +12 V load: Aug 1981 TechRef gives 0.0 A, Apr 1983 TechRef gives 0.4 A. Data uses Apr 1983.
- 5150 PSU -12 V maximum: TechRef 0.25 A, minuszerodegrees line-ratings page 0.3 A. Data uses the TechRef.
- XT TechRef p. 3-4 output table prints the third row as -12.0 V; it is the +12 V line (4.2 A). Noted in the supply notes.

## Still missing

- `pcjr_ga` pins: no pinout in the PCjr TechRef; not found elsewhere.
- `sn76496` pins: the PCjr TechRef gives only the part number; a TI SN76496 data sheet was not fetched.
- PCjr -6 V rail: not on the power-board connector table (p. 2-138); where it enters the board is unknown.
- PCjr Berg sockets: pin tables sourced; pad drawing follows the rear-view figure on p. 2-12 (A row over B, pin 1 left). IR header row orientation not checked.
- P8/P9 header: pinout sourced; which end of the board header faces the rear is not checked (drawn P8 left).
- PCjr transformer socket face and polarisation not checked; spare socket L and modem jack M not covered.
- CGA internal headers P1 (RF modulator) and P2 (light pen), 5155 internal keyboard cable and DIN, XT/5155 designators: not added.
- PCjr 8255, 8253 and 8259 exist but are wired differently from the 5150; not listed for the PCjr.
- pcjr and portable5155 stay `sheet`: they have no `symptoms`, which `ready` requires.
- convertible5140: no data.

## For other files

- heathkit.js `cpu8088` is a `pins: null` stub; ibm.js replaces it and core.js merges `hero2000`. No contradiction found. Its pin text is now machine-neutral.
- ibm.js connectors use the `crtc` and `rgbi` terms defined in commodore.js.
