# Commodore verification — 2026-10-30

## Sources used

| Title | URL | Covered |
|---|---|---|
| C16 Service Manual PN 314001-03 (Oct 1984) | http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf | 7360, 7501, 23128, 4416 pin assignments (p. 11); 6529 and 82S100 PLA (p. 15); schematic 251788 sheets 1-3: power CN8, video CN6, cassette CN3, expansion CN1, serial CN7, joysticks CN4/CN5, 7501 port wiring |
| TED System Hardware Manual (Plus_4_Technical_Docs.pdf) | http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf | TED pinout and signals (pp. 8-9), 7501 pinout (p. 14), 4164 (p. 18), user port (p. 19), serial (p. 22), expansion (p. 23), 23128 (p. 25), +5 V budget (p. 7) |
| Plus/4 térkép connector map (Hungarian magazine), 2 pages | http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-1.jpg, connectors-2.jpg | Plus/4 user port, expansion, power, cassette, video, joystick, serial (secondary) |
| Plus/4 power supply schematic | http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/powersupply.gif | Plus/4 PSU circuit and 4-pin plug |
| Zimmers C16/Plus/4, C128, VIC-20 parts lists | .../plus4/parts.txt, .../c128/parts.txt, .../vic20/parts.txt | Chip locations (secondary) |
| MOS 7501 preliminary data sheet p. 1 | http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/7501/7501-01.gif | 7501 pin positions |
| CSG 6510 data sheet (6510.zip) | http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6510.zip | 6510 pins |
| MOS 6520, 6522, 6545-1, 6551, 6560, 6529, 2332, 2364 data sheets (zip GIF scans) | http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/ | pin configurations, p. 1 of each |
| MOS 2332 data sheet (PDF) | http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/mos_2332_rom_feb_1980.pdf | 2332 |
| CSG 6567 VIC-II preliminary spec | http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6567_vicII_preliminary.pdf | VIC-II |
| C64 PLA logic equations (c64-pla.txt) | http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/c64-pla.txt | 82S100 pin functions in the C64 |
| C64 Programmer's Reference Guide | http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf | App. I all ports (pdf pp. 414-416); App. L 6510 (422); App. M 6526 (439); App. N 6567 (471); App. O 6581 (477) |
| C64/C64C Service Manual PN 314001-03 (1992) | http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/servicemanuals/C64-C64C_Service_Manual_314001-03_(1992_Mar).pdf | Power CN7 and on-board rails (pdf p. 8), video, cassette, serial circuit theory, designators |
| C64 power supply 902503-02 schematic | http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/c64_external_power_supply_902503-02.png | Brick ratings, fuses, plug pinout |
| VIC-20 Programmer's Reference Guide | http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf | App. J all ports (pdf pp. 296-299); 6560 pinout (p. 228) |
| VIC-20 schematic 324001 sheets 1-2 | http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02a.gif, 324001-02b.gif | 6560 light pen on pin 37; power jack J1, CR4, LM323 |
| PET port pinouts (zimmers pet/ports) | http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/ | IEEE J1, user J2, cassette J3/J6, video J7 |
| Dynamic PET logic diagram 320349 sheets 1, 9 | http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-9.gif | Regulators and J8 feed; J4/J9 (not tabulated) |
| C128/128D Service Manual PN 314001-08 (archive.org PDF) | https://archive.org/download/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08.pdf | 8502 (pdf p. 9), 4164/4416 (20-21), 8722 (29), 8721 (31), 8564 (37), 8563 (40), SID (44); schematic sheet 2 power CN11/CN12 (72); PSU schematics (89-90) |
| C128 Programmer's Reference Guide | http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf | Ch. 12 port tables (pdf pp. 404-410) |
| C64-Wiki: Commodore 16 | https://www.c64-wiki.com/wiki/Commodore_16 | C16 power: 2 pins, 9 V DC (secondary) |
| User manuals (C16 Owner's Guide, Plus/4 User's Manual, C64 User's Guide, VIC-20 Personal Computing Guide, BASIC 4.0 Reference, PET 2001-8 manual, C128 System Guide) | http://www.zimmers.net/anonftp/pub/cbm/manuals/ | quickref sources (not re-checked line by line) |

All 43 distinct URLs were fetched and returned HTTP 200.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| cpu7501 | 40 | MOS 7501 data sheet; TED System Hardware Manual 5.2; C16 schematic 251788 |
| ted7360 | 48 | TED System Hardware Manual 4.3.1; C16 SM p. 11 |
| pio6529 | 20 | C16 SM p. 15 |
| acia6551 | 28 | MOS 6551 data sheet p. 1 |
| dram4164 | 16 | C128 SM p. 18; TED manual 6.2.1 |
| dram4416 (new) | 18 | C16 SM p. 11; C128 SM p. 19 |
| rom23128 (was null) | 28 | C16 SM p. 11; TED manual 11.4 |
| rom2364 (was null) | 24 | CSG 2364 data sheet p. 1 |
| rom2332 (was null) | 24 | CSG/MOS 2332 data sheet p. 1 |
| cpu6510 | 40 | CSG 6510 data sheet; C64 PRG App. L |
| vic2 | 40 | C64 PRG App. N |
| sid6581 | 28 | C64 PRG App. O; C128 SM p. 42 |
| cia6526 | 40 | C64 PRG App. M |
| pla82s100 | 28 | C16 SM p. 15 (package); c64-pla.txt (C64 functions); C64 SM text confirms F1/F2/F3/F5 |
| vic6560 | 40 | MOS 6560 data sheet; VIC-20 PRG p. 212 |
| via6522 | 40 | MOS 6522 data sheet p. 1 |
| pia6520 | 40 | MCS6520 data sheet p. 1 |
| crtc6545 | 40 | 6545-1 data sheet p. 1 |
| cpu8502 | 40 (pin 24 function kept verify) | C128 SM p. 7 |
| vdc8563 | 48 | C128 SM p. 38 |
| vic2e (8564) | 48 | C128 SM pp. 34-35 |
| mmu8722 | 48 | C128 SM p. 27 |
| pla8721 | 48 | C128 SM p. 29 |

Total 814 pins in Commodore-defined chips; 813 verified, 1 still `verify`.

## Changes

| Chip / connector | Pin | Old → new | Source |
|---|---|---|---|
| cpu7501 | 24-30 | Port functions were wrong (P7 motor, P6 DATA in, P3 ATN, P2 DATA out, P0 CLK in) → P7 serial DATA in, P6 serial CLK in, P4 cassette read, P3 cassette motor, P2 ATN out, P1 CLK out + cassette write, P0 DATA out | C16 schematic 251788 sheet 2 |
| cpu7501 | 1 | IN → Φ0 IN | 7501 data sheet, C16 SM |
| ted7360 | 5, 6 | CS0/CS1 (verify, "active low in practice") → /CS0, /CS1 active LOW | C16 SM p. 11; TED manual |
| ted7360 | 12, 14 | OUT / IN → Φ OUT / Φ IN | TED manual 4.3.1 |
| acia6551 | 6, 7 | XTLI/XTLO → XTAL1/XTAL2 | 6551 data sheet |
| cpu6510 | 1 | Φ0 in → Φ1 IN | 6510 data sheet, C64 PRG |
| cpu6510 | 39 | Φ2 out → Φ2 OUT (see Conflicts) | 6510 data sheet |
| vic2 | 21, 22 | CL / IN (verify) → ΦCOLOR (colour clock) / ΦIN (dot clock); old descs called both "crystal" pins | C64 PRG App. N |
| sid6581 | 23, 24, 27 | POTY/POTX/AUDIO → POT Y/POT X/AUDIO OUT | C64 PRG App. O |
| pla82s100 | 2-27 | Descs said pins 20-23 were A15-A12 → C64 mapping: I7-I5 = A13-A15, I4 VA14, I3 CHAREN, I2 HIRAM, I1 LORAM, I0 /CAS, I8 A12, I9 BA, I10 AEC, I11 R/W, I12 /EXROM, I13 /GAME, I14 VA13, I15 VA12; F0 CASRAM, F1 /BASIC, F2 /KERNAL, F3 /CHAROM, F4 GR/W, F5 /I/O, F6 /ROML, F7 /ROMH | c64-pla.txt; C64 SM |
| pla82s100 | machines | c64 → c64, c16 (U16), plus4 (U19) | C16 SM p. 15; parts list |
| vic6560 | 5-8 | VD11-VD8, addr out → DB11-DB8, data bidir | 6560 data sheet |
| vic6560 | 35, 36 | PHI1 out / PHI0 out → PΦ1 / PΦ2 | 6560 data sheet |
| vic6560 | 37 | LP → OPTION (light pen in the VIC-20) | data sheet; schematic 324001 |
| vic6560 | 2, 3, 17-19, 38-40 | CHROMA, SYNC/LUM, POTX, POTY, AUDIO, PHI2 in, PHI1 in, Vcc → COMP COLOR, SYNC & LUM, POT X, POT Y, COMP SND, Φ2 IN, Φ1 IN, VDD | 6560 data sheet |
| vdc8563 | 1 | CCLK in → out (character clock output) | C128 SM p. 38 |
| vdc8563 | 2 | DCLK → /DCLK | C128 SM |
| vdc8563 | 24 | TEST ctrl in → ground (tied to ground) | C128 SM |
| vdc8563 | 43-46 | Descs gave RGBI port pins 6/4/3/2 for I/B/G/R → 6/5/4/3 | C128 PRG Table 12-6 |
| vic2e | 9 | /LP → LP | C128 SM |
| vic2e | 11 | /DMAR out → /DMARQST in | C128 SM |
| vic2e | 15 | /DMAA → /DMAACK | C128 SM |
| vic2e | 16 | CL clock in → COLOR video out | C128 SM |
| vic2e | 17, 20, 21, 25 | S/LUM, CAS, MU, Z80PHI → SYNC, /CAS, MUX, Z80 | C128 SM |
| vic2e | 22 | /IDACC out → /I/O ACC in (from PLA) | C128 SM |
| vic2e | 29 | PHCL out → PH CL in (colour clock input) | C128 SM |
| mmu8722 | 44-46 | FSDIR out, /GAME in, /EXROM in → bidir | C128 SM p. 27 |
| mmu8722 | 47 | 128/64 in → out | C128 SM |
| mmu8722 | 48 | SENSE in → SENSE40 bidir | C128 SM |
| pla8721 | 7, 14, 16, 26 | VICFIX, Z80 I/O, I/O SE, VA14 out → in | C128 SM p. 29 |
| rom23128, rom2364, rom2332 | all | pins: null → full tables | see Chips verified |
| dram4416 | new | Added; C16 main RAM is 2 × 4416 (U5, U6), not 4164 | C16 SM p. 11, parts list |
| dram4164 | machines/location | c16 removed; plus4 U9-U16 → U11-U18; c128 added (U38-U53) | parts lists |
| pio6529 | location | c16 U7 → U13; plus4 U7/U8 → U5, U27 | C16 SM p. 15; parts list |
| acia6551 | location | plus4 U4 → U3 | parts list |
| c16-power | all | DIN-7, pins '?' → 2-pin socket CN8: 1 GND, 2 +9 V DC | C16 schematic sheet 1 |
| c16-cass | 7 | NC → GND | C16 schematic sheet 1 |
| c16-joy | 8 | Select / NC → SELECT (driven by U11) | C16 schematic sheet 2 |
| c16-video | 7, 8 | NC, NC → NC, +5 V | C16 schematic sheet 1 |
| c16-exp | all | 3 placeholder pins → 50-pin table | TED manual 10.1 |
| c128-power | all | "Square DIN, shared with Plus/4" → DIN-5 CN11: 1 +5 V, 2 shield, 3 9 V AC, 4 GND, 5 9 V AC | C128 SM schematic sheet 2 |
| c128-rgbi | 7 | "composite on most listings" → MONOCHROME | C128 PRG Table 12-6 |
| pet-user | all | "PB0-PB7 with CB1/CB2" → PA0-PA7 with CA1 and CB2, plus top-row video/diag lines | zimmers PET user port pinout |
| vic20-video | 1 | +6 V → +5 V REG (10 mA) | VIC-20 PRG App. J |
| vic20-power | all | "+5 V only brick" → 2-pin 9 V AC jack (324001 board) | VIC-20 schematic 324001 |
| power vic20 | test point | CPU clock at VIC pin 36 → 6502 pin 37 | 6560 data sheet (pin 36 is PΦ2) |
| power c128 | +5 V rail | square DIN note → CN11 pin 1 | C128 SM |
| symptoms c16, c64, vic20 | notes | 4164 → 4416/4164; "ROM pinout not captured"; "VIC pin 36" | as above |

## Conflicts

| Item | Pin | Disagreement |
|---|---|---|
| cpu7501 | 24, 25 | C16 SM pin-assignment page labels 24-30 as P6-P0. The 7501 data sheet, TED manual and the C16 schematic give 24 = P7, 25 = P6. Data sheet used. |
| cpu6510 | 39 | C64 PRG App. L draws "Φ2 IN"; the 6510 data sheet says Φ2 OUT. Data sheet used. |
| c16-video | 8 | C16 schematic: +5 V. Plus/4 térkép map: N.C. on the Plus/4. Schematic used (C16). |
| plus4-user | K | Plus/4 térkép map (production machine): P1. TED System Hardware Manual (pre-production): CTS. Map used. |

## Still missing

- cpu8502 pin 24 function (P6 = CAPS LOCK / ASCII-DIN sense): read from a low-resolution schematic label only; pin position is verified.
- c64-video pins 7 and 8: not in the C64 PRG table; kept as NC with `verify`.
- c16-power and plus4-power: pin functions are sourced, but the physical pad positions in the `custom` drawings are not (c16) or come from a secondary map (plus4). Connector `verify: true`.
- c128-power: the SM says "5 pin DIN" but not 180° or 240°; `din5-180` chosen, noted in the summary.
- vic20-power: only the original 2-pin 9 V AC jack (324001 board). The cost-reduced board's 7-pin DIN pinout was not sourced. The VIC-20 transformer current rating was not found.
- C128 PSU current ratings: not in the service manual.
- pet-exp (J4/J9): pin table not transcribed; kept with `verify: true`, empty pins and no geo (one WARN).
- PET power connector J8: rails taken from schematic 320349 sheet 9 but no pin table added; `supply.external: false` with no connector.
- PET 6520/6545 locations not added (board-dependent).
- Quickref text was not re-checked against the linked manuals; only `sources` added.

## For other files

- No contradictions found for `cpu6502` (apple.js), `cpuz80` and `sram2114` (sinclair.js); they were not re-verified. Locations added through `chipLocations`: VIC-20 6502 UE10, 2114 UD2, UE1, UE2, UD3-UE6; C128 Z80 U10 (zimmers parts lists).
- App/renderer: `c16-exp` uses `edge-25x25-cbm`; bottom contacts run past Z to AA, BB, CC. The `cbm` letter scheme needs to extend past Z for this port.
- `connectors.plus4` and `power.plus4` are now full entries (Plus/4 power socket, user port, then the shared 264 ports). The shared entries come from file-level consts `CBM264_PORTS` and `CBM264_TESTPOINTS` in commodore.js, so the C16 and Plus/4 share one copy in the source.
