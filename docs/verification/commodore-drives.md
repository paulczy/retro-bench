# Commodore drives verification — 2026-10-30

Machines added to `src/data/commodore.js`: `c1541`, `c1571`, `c1581`, all `status: 'ready'` and `kind: 'drive'` (new machine field).

## Sources used

| Title | URL | Covered |
|---|---|---|
| 1540/1541 Service Manual 314002-01 (Nov 1985) | zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf | Spec, flash codes, circuit theory, troubleshooting, resistance checks, model ID, device number, PSU 1540002 parts. The manual has no printed page numbers; labels use PDF pages. |
| Schematic 251748 rev. E (1541A short board), left and right halves | .../1541/short-251748-rev.E-left.gif, -right.gif | UC1 325572 pins, UC4 6502, UB3/UB4 ROM, UC2/UC3 VIA, P1 transformer, P5, P7, P8 |
| Commodore 1540/1541 Technical Manual 990445 (GIF scans) | .../1541/tech/ | Long board schematic 1540008-02 (p. 35), 250448 parts (p. 33A), alignment (p. 19), speed and track 0 (p. 20), TechTopics 15 (p. 40) |
| 1541-II Service Manual Addendum 314862-01 (Mar 1988) | .../1541/1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf | Schematic 355207 (CN3, CN4, CN5/6, CN7), parts, PSU C340031-01 |
| 1571 Service Manual Preliminary 314002-04 (Oct 1986) | .../1571/1571_Service_Manual_Preliminary_314002-04_(1986_Oct).pdf | Memory map, 251828 / 251829 pin assignments, WD1770, 6526/8520, 23256, 7406, parts |
| 1571 schematic 310420 (full) | .../1571/310420-full.gif | Designators, CN1, CN5, U5 pins, U9 port use |
| 1581 Service Manual 314982-01 (Jun 1987) | .../1581/1581_Service_Manual_314982-01_(1987_Jun).pdf | Memory map, self test, 8520A and WD1770 pins, parts, schematic 252380 rev. 4 sheets 1-4 |
| 1541-II/1571-II/1581 power supply 312551-01 drawing | .../1581/powersupply.gif | Brick schematic, plug pinout, ratings |
| zimmers parts.txt, boards.txt, pla.txt, memorymap.txt, readme-1571cr.txt | .../1541/, .../1571/, .../1581/ | Part numbers, board list, gate array pinouts (second source) |
| Western Digital WD177X-00 data sheet p. 1-1 | zimmers.net/anonftp/pub/cbm/documents/chipdata/wd177x/177x01.gif | WD1770 pinout (chip itself is acorn.js's `fdc1770`) |
| Commodore 8520 CIA spec 318029 | zimmers.net/anonftp/pub/cbm/documents/chipdata/8520_datasheet.pdf | 8520 pin configuration |
| TI SN7406 SDLS031A, TI ULN2003A SLRS027T | ti.com/lit/ds/symlink/sn7406.pdf, uln2003a.pdf | 7406 and ULN2003 pinouts |
| 1541 / 1571 / 1581 User's Guides (zimmers text editions) | zimmers.net/anonftp/pub/cbm/manuals/drives/ | DOS commands, U0 commands, partitions, LEDs, 1571 memory map |
| Inside Commodore DOS (archive.org) | archive.org/details/Inside_Commodore_Dos | 1541 memory and VIA map, ch. 9.1 p. 181 |
| Ray Carlsen notes (portcommodore.com mirror; needs a browser User-Agent) | portcommodore.com/rcarlsen/cbm/ | fix1541.txt, 1541chip.txt, 1541-II.txt, 1581.txt, 1571 USA PSU diagram and wiring (Sams-style drawings) |

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| ga325572 (new) | 34 of 40 named from schematic 251748; 7, 9, 11, 13, 14 not drawn (verify); 6 named but function unknown (verify) | Schematic 251748 rev. E; 1541 SM circuit theory |
| ga251828 (new) | 40 of 40 (pin 24 direction verify) | 1571 SM p. 8 |
| ga251829 (new) | 20 of 20 | 1571 SM pp. 4, 6; schematic 310420 U5 |
| cia8520 (new) | 40 of 40; PB7 = ATN IN on the 1581 is verify | 8520 spec 318029; 1581 SM p. 7 |
| ttl7406 (new) | 14 of 14 | TI SN7406; 1571 SM p. 14 |
| uln2003 (new) | 16 of 16 | TI ULN2003A; schematic 355207 |
| via6522, cia6526, rom2364 (existing, this file) | Not re-checked; drive machines and designators added | — |
| cpu6502, sram6116, sram2114, rom27128, fdc1770, rom23256 (other files) | Listed by id with `chipLocations` only | — |

## Changes

- `via6522`, `cia6526`, `rom2364`: added `c1541` / `c1571` to `machines` and designators to `location`.
- Resources: the Ray Carlsen link `personalpages.tds.net/~rcarlsen/` is dead; replaced with the portcommodore.com mirror.
- I first defined `fdc1770` and `rom23256` here, then found that acorn.js and amstrad.js (already committed) define them with pins. I removed my copies (saved in `.tmp/cbm-drives/removed-chips.js`) and point at theirs through `chipLocations`.

## Conflicts

- 1541 VIA addresses: SM PDF p. 12-13 puts the serial VIA UC3 at $1C00 and the disk VIA UC2 at $1800. Schematic 355207 (74LS42 outputs 6 and 7), Inside Commodore DOS p. 181 and the 1571 User's Guide map give serial $1800, disk $1C00. Data uses the latter; quirk noted.
- 251828 pins 11/12: the 1571 SM pin drawing and pla.txt give STP1 = 11, STP0 = 12; the same manual's table and schematic 355207 give STEP0 = 11, STEP1 = 12. Recorded as `conflict`.
- 251828-02 42-pin pins 21/22: the 1571 SM drawing shows VCC/GND, its table says N/C; schematic 355207 wires 21 to +5 V and 22 to GND.
- 1581 CN1 (power to mechanism): schematic 252380 sheet 4 has +12 V on pin 1, +5 V on pin 4; Carlsen says the red +5 V wire goes to pin 1. Recorded as `conflict`.
- 1541 rectifier designators: SM text says CR1 feeds the 12 V regulator; schematic 251748 draws CR3 there. Data cites the schematic.

## Still missing

- 1541 long board (1540008): P1, head, stepper and motor connector pin tables (schematic scan too coarse for pin numbers); P6 sensor harness on the short boards (pins 3-7, 10, 11 not drawn, 9 and 14 unlabelled).
- 1541-II head connector CN2 and LED connector CN1; 1541C (250448) connectors.
- 1571: CN2 heads, CN3 LEDs, CN4 sensors and CN7 motor are not legible enough on the 310420 scan. CN5 stepper pins 1, 2, 4, 6 are `verify`. The 1571 Service Manual GIF zip and Sams CD12 were not opened.
- 1571 internal PSU: only a Sams-style drawing (via Carlsen); no Commodore schematic or part number found. The task brief said "7812 and 7805"; the US 1571 board is a switching supply.
- 1581 8K SRAM (LC3664 type) has no chip entry; no 6264 exists in the data.
- No "drive-motor fuse" appears in any 1541 source: the only fuse is the 1 A slow-blow line fuse F1.
- Board number 1540050 for the long board appears only in Ray Carlsen's notes; the service manual uses 1540008-01 (schematic 1540001).
- Not reached: Peltier's 1541 Troubleshooting & Repair Guide (archive.org lending only).

## For other files

- `schematics.js` still references `dragon32`, which tandy.js no longer defines (the validator's only FAIL; not from this file).
- `amstrad.js` `rom23256` pin 1 is "NC" (the CPC board). In the 1571 and 1581 the pin is VPP tied to +5 V (1571 SM p. 13); the drive designator text says so.
