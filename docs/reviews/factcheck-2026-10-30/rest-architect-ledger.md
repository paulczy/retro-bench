# Retro Bench fact-check ledger — Architect, second run

Input: P:/retro-bench/.tmp/factcheck/rest-architect.json. Read-only site copy at commit 87c9b5a. Original item indices are preserved. There are 141 items; this list contains no photo-outline items.

Scope is the supplied factual claims, not code quality. CONFIRMED means the stated claim is supported by the inspected source and, for substitutions, compared part maps or a joint manufacturer sheet/factory adapter procedure. UNVERIFIABLE identifies a blocked/dead/unreadable source or a source silent on part of the claim; it does not assert incompatibility. A parts-list cross-reference alone does not establish both parts' electrical limits.

WRONG rows include low-severity violations of the user's explicit machine-neutral shared-text requirement; those rows distinguish qualified examples from genuinely false wiring. Medium/high findings state the correct fact.

PDF numbers below are one-based file pages. Printed page numbers are supplied where checked. Image/GIF page numbers refer to the scan. Rows are grouped by the item's original cited document; secondary sources appear in the source-page column.

Downloads were attempted using curl -L -A Mozilla/5.0. Windows curl HTTPS commonly failed with Schannel SEC_E_NO_CREDENTIALS; the same URL/User-Agent was then fetched with Python urllib. PDFs were extracted with pdftotext -layout. Scanned diagrams used pdftoppm at 110 dpi and were inspected as images. Web recovery was used for inaccessible citations and current availability. Transport details are in download-status.json, fallback-status.json and source-index.md.

| Item kind | Checked | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-orientation | 4 | 1 | 1 | 2 |
| shared-chip-text | 25 | 17 | 7 | 1 |
| replacement-claim | 112 | 61 | 4 | 47 |
| photo-outlines | 0 | 0 | 0 | 0 |
| **Total** | **141** | **79** | **12** | **50** |

## d001 — https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Schematics/Apple%20Disk%20II%20-%20Schematics%20Analog%20Board%20050-0007-H.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 38 | disk2 / disk2-mech / edge-14x14-cbm | numbered/lettered faces | WRONG (high) | [d001](<https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Schematics/Apple%20Disk%20II%20-%20Schematics%20Analog%20Board%20050-0007-H.pdf>) PDF 2; [d003](<https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Photos/Apple%20Disk%20II%20Drive%20-%20Analog%20card.jpg>) analog-card photo, A marking | The component-side fingers are lettered (A at the left in the photo); the geometry draws numbers on top and letters underneath. With the component side up, put A–R on top and 1–14 below (rowA bottom). Applies to disk2-mech, the listed user of edge-14x14-cbm. |

## d005 — https://archive.org/details/atari400800fieldservicemanualmay1983/page/n18

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 43 | atari400 / atari-power / barrel | 1,2 physical contacts | UNVERIFIABLE | [d005](<https://archive.org/details/atari400800fieldservicemanualmay1983/page/n18>) PDF 19 (1-6), 46 (2-8 Fig 2-4) | 9 VAC and two contacts are confirmed. The cited schematic has no physical mating view, standard barrel dimensions, or center/shell pin numbering; cannot confirm the exact drawn geometry from it. |
| 44 | atari800 / atari-power / barrel | 1,2 physical contacts | UNVERIFIABLE | [d005](<https://archive.org/details/atari400800fieldservicemanualmay1983/page/n18>) PDF 19 (1-6), 51 (2-13 Fig 2-8) | 9 VAC and two contacts are confirmed. The cited schematic has no physical mating view, standard barrel dimensions, or center/shell pin numbering; cannot confirm the exact drawn geometry from it. |

## d008 — https://bitsavers.org/pdf/ibm/pc/xt/6361459_PC_XT_Technical_Reference_Apr84.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 65 | xt5160 / xt-slot / edge-31x31-ab | A1–A31/B1–B31 | CONFIRMED | [d008](<https://bitsavers.org/pdf/ibm/pc/xt/6361459_PC_XT_Technical_Reference_Apr84.pdf>) PDF 36 (printed 1-17) | IBM marks A as component side and pin 1 at rear panel. Rotating the drawing 90 degrees counterclockwise gives A on top and pin 1 left, matching the geometry. Signal order and B3/B5/B7/B9 supply positions agree. |

## d009 — https://portcommodore.com/rcarlsen/cbm/plus4/plus4.txt

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 71 | cpu7501 (c16, plus4) → 8501 | 7501→8501, all pins | UNVERIFIABLE | [d009](<https://portcommodore.com/rcarlsen/cbm/plus4/plus4.txt>) blocked; [d121](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/7501/7501-01.gif>) p.1 | Blocked: Carlsen returns HTTP 406; search did not recover the cited note or an 8501 datasheet. The 7501 sheet alone cannot establish every 8501 terminal and electrical limit. |

## d010 — https://www.c64-wiki.com/wiki/TED

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 72 | ted7360 (c16, plus4) → 8360 | 7360→8360, all pins | UNVERIFIABLE | [d010](<https://www.c64-wiki.com/wiki/TED>) section7360 vs8360; [d015](<http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf>) p.11 | Silent: the wiki calls 7360/8360 functionally the same and identifies the HMOS generation, but has no 8360 pin/electrical table. Full two-part datasheet verification is unavailable. |

## d011 — http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6551.zip

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 73 | acia6551 (plus4, apple2c, dragon64) | 1–28 | CONFIRMED | [d011](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6551.zip>) 6551-1.gif (p.1); [d012](<https://www.westerndesigncenter.com/wdc/documentation/w65c51n.pdf>) pin descriptions | MOS pin configuration agrees, including VCC15, GND1, RxC5, XTAL6/7, and bus18–25. Text describes chip functions and the standard baud crystal without assuming a particular brand. |

## d013 — https://archive.org/details/sams-computerfacts-cc17-c64-1984-version/page/n8

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 75 | dram4164 (plus4, c64, c128, apple2e, atari800xl, atari130xe, adam, spectrumplus2, coco2, model4, xt5160, portable5155, cpc464, cpc664, cpc6128, electron, dragon64, msx1, oric1, atmos) → HM4864, MT4264, TMS4164 and other 4164s | 4164/HM4864/MT4264/TMS4164 | UNVERIFIABLE | [d013](<https://archive.org/details/sams-computerfacts-cc17-c64-1984-version/page/n8>) PDF 9 rendered; [d014](<http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf>) PDF 79; [d084](<https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf>) PDF 201 | Silent on the full claim: Sams lists HM4864-3, MT4264-20 and TMS4164-15 in the same C64 bank; Hitachi/TI pinouts agree. No MT4264 sheet or support for unrestricted 'other 4164s' across every listed machine was recovered. |

## d014 — http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 76 | dram4164 (plus4, c64, c128, apple2e, atari800xl, atari130xe, adam, spectrumplus2, coco2, model4, xt5160, portable5155, cpc464, cpc664, cpc6128, electron, dragon64, msx1, oric1, atmos) → 4164 with the right refresh | A0–A7 refresh | CONFIRMED | [d014](<http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf>) PDF 81; [d084](<https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf>) PDF 201,203 | TI requires 256 rows using A0–A7 within 4 ms; HM4864 requires 128 refresh cycles within 2 ms. A source that never varies A7 cannot refresh a 256-row part. The distinction is supported. |
| 77 | dram4164 (plus4, c64, c128, apple2e, atari800xl, atari130xe, adam, spectrumplus2, coco2, model4, xt5160, portable5155, cpc464, cpc664, cpc6128, electron, dragon64, msx1, oric1, atmos) → 41256 (256K x 1) | 1 A8;16 GND | CONFIRMED | [d014](<http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf>) PDF 79,103–104 | The DIP-16 maps differ at pin 1: 4164 NC becomes 4256 A8. The remaining terminals match. TMS4256 refresh still needs A0–A7, 256 rows/4 ms; strapping A8 does not fix a 128-row refresh source. |
| 114 | dram4464 (atari130xe, spectrumplus3, bbcmaster) | 1–18 | CONFIRMED | [d014](<http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf>) PDF 147–148 printed4-107/108 | The TMS4464 map agrees, including /G, /W, /RAS, /CAS, VDD on 9 and VSS on 18. The 256-row refresh and generic functional text agree. |

## d015 — http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 79 | rom23128 (c16, plus4, spectrum, ts2068, cpc664, cpc6128, oric1, atmos) | 20,27 (machine assignments) | WRONG (low) | [d015](<http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf>) PDF 11; [d018](<https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf>) PDF 10,24; [d019](<https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Circuit%20Diagrams/ZX%20Spectrum%20Issue%203%20-%20Schaltbild.gif>) IC5 table; [d185](<https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf>) PDF 79 | Address, data and supply numbering agrees. However, this shared record embeds C16 TED selects, Spectrum H/N links and Oric /ROMDIS wiring. These are explicitly qualified examples, but they fail the requested machine-neutral text boundary. Keep generic mask-select functions here and board wiring with each machine. |

## d020 — https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 80 | rom23128 (c16, plus4, spectrum, ts2068, cpc664, cpc6128, oric1, atmos) → 27128 / 27C128 EPROM | 1,20,22,27 | CONFIRMED | [d015](<http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf>) PDF 11; [d020](<https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf>) PDF 411–412; [d086](<https://ww1.microchip.com/downloads/en/DeviceDoc/11003L.pdf>) PDF 1 | EPROM pin 1 VPP and pin 27 /PGM must be high for reading, while pin 20 /CE goes low. The 23128's mask-select functions differ. The note correctly requires board rework. |
| 172 | rom27128 (herojr, c1541, bbcb, bbcmaster) | 1–28 | CONFIRMED | [d020](<https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf>) PDF 411–412 printed4-29/30 | Intel's 27128 map agrees on all address, data, select and supply terminals. Read mode requires VPP = VCC and /PGM high. Text stays generic. |

## d021 — https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-2s.gif

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 81 | rom23128 (c16, plus4, spectrum, ts2068, cpc664, cpc6128, oric1, atmos) → Two 2764 EPROMs (Oric-1) | IC9,IC10,IC11; 2764 adapter wiring | CONFIRMED | [d021](<https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-2s.gif>) blocked; alternate [d185](<https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf>) PDF 79 schematic BN0130; [d020](<https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf>) PDF 401,406 | The alternate Oric service-manual schematic labels IC9 '23128 or 2764', IC10 '2764' and IC11 '74LS00', and states IC10/11 are unnecessary with a 23128. The Intel 2764 map and read mode agree with the shown supply, select and address wiring. Original issue-7 URL is inaccessible; the manual schematic independently confirms the stated option. |

## d022 — https://portcommodore.com/rcarlsen/cbm/c64/c64c-ic.txt

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 82 | cpu6510 (c64) → 8500 | 6510→8500 | UNVERIFIABLE | [d022](<https://portcommodore.com/rcarlsen/cbm/c64/c64c-ic.txt>) Carlsen lines139–142,162–201; [d123](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6510.zip>) p.1 | Silent on independent electrical proof: Carlsen reports successful diagnostic 6510/8500 swaps and gives a common pin table. The note preserves that experimental limitation. No independent 8500 datasheet was recovered. |

## d023 — https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 83 | cpu6510 (c64) → 8502 in a C64C (for the 8500) | 8502→8500 adapter | UNVERIFIABLE | [d023](<https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt>) blocked (406) | Blocked: Carlsen returns HTTP 406 and search did not recover the cited experiment. Without its adapter diagram, the required cross-connections cannot be checked. |
| 94 | vic2e (c128) → 8564 in a C64C (for the 8562) | 8564→8562 adapter | UNVERIFIABLE | [d023](<https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt>) blocked (406) | Blocked: the same inaccessible Carlsen note as item 83. No 48-to-40-pin adapter mapping was recovered; this is missing evidence, not proof the adapter is wrong. |

## d024 — https://www.c64-wiki.com/wiki/VIC

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 84 | vic2 (c64) → 8562 (NTSC) / 8565 (PAL) | 13 VDD, all other pins | UNVERIFIABLE | [d024](<https://www.c64-wiki.com/wiki/VIC>) identification table; [d126](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6567_vicII_preliminary.pdf>) 6567 sheet | Silent on a full two-part comparison: the wiki supports the 12 V versus 5 V change and grey-dot behavior, but no 8562/8565 datasheet pin table was recovered. Supply-only rework sufficiency remains unverified. |

## d025 — http://www.zimmers.net/cbmpics/cbm/c64/vic-ii.txt

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 85 | vic2 (c64) → 6567R56A vs 6567R8 | 40-pin VIC; clock/frame timing | CONFIRMED | [d025](<http://www.zimmers.net/cbmpics/cbm/c64/vic-ii.txt>) section2.3 PhiIN/Phi0 and raster timing | Bauer specifies 6567R56A at 64 cycles/262 lines and 6567R8 at 65 cycles/263 lines, sharing the 40-pin interface. The replacement note preserves the timing difference. |

## d026 — https://portcommodore.com/rcarlsen/cbm/c64/8580%20to%206581.txt

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 86 | sid6581 (c64, c128) → 8580 in a 6581 board (or the reverse) | 28 VDD;1–4 filters;26 audio input | UNVERIFIABLE | [d026](<https://portcommodore.com/rcarlsen/cbm/c64/8580%20to%206581.txt>) Carlsen lines10–29 | Silent on complete electrical equivalence: Carlsen confirms the 12 V/9 V supplies, filter capacitors and 330 kΩ audio-input resistor. Separate 6581 and 8580 datasheets were not recovered for the required two-part comparison. |

## d027 — https://www.c64-wiki.com/wiki/CIA

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 87 | cia6526 (c64, c128, c1571) → 6526A | 6526→6526A | UNVERIFIABLE | [d027](<https://www.c64-wiki.com/wiki/CIA>) description/speed paragraph | Silent on separate variant limits: the wiki gives 6526 = 1 MHz and 6526A = 2 MHz and describes later-machine use. It has no independent 6526A pin/electrical table. |

## d028 — https://portcommodore.com/rcarlsen/cbm/c128/c128-ic.txt

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 88 | cia6526 (c64, c128, c1571) → 8521 | 6526→8521 | UNVERIFIABLE | [d028](<https://portcommodore.com/rcarlsen/cbm/c128/c128-ic.txt>) Carlsen U1/U4 | Silent on the second part's limits: Carlsen explicitly says 8521 interchanges with 6526, but no independent 8521 pin/electrical datasheet was recovered. |

## d029 — http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2364.zip

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 89 | rom2364 (c64, vic20, pet, c1541, model3, model4) | 1–24 | CONFIRMED | [d029](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2364.zip>) 2364-1.GIF p.1 | All address/data/supply pins agree. Pin20 is mask-programmed CS polarity, correctly kept neutral; 28-pin 2764 requires an adapter. |

## d031 — https://store.go4retro.com/2364-adapter/

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 90 | rom2364 (c64, vic20, pet, c1541, model3, model4) → 2764 to 27512 EPROM on a 2364 adapter | 24-to-28 adapter | CONFIRMED | [d029](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2364.zip>) p.1; [d020](<https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf>) PDF 411; [d031](<https://store.go4retro.com/2364-adapter/>) Product Overview and review2July2021 | The adapter maker lists MOS 2364/68764/68766 to 2764–27512 and provides extra-address pads/pullups. The original ROM and JEDEC EPROM terminal maps require such an adapter. The height warning is supported by the product review. |
| 223 | rom-dragon32-basic (dragon32) → 2764 (to 27512) EPROM on a 2364 adapter | MCM68A36420 /E,21 A12;adapter | CONFIRMED | [d180](<https://bitsavers.org/components/motorola/_dataBooks/1981_82_Motorola_Memory_Databook.pdf>) PDF 209–211 (printed 2-191/193); [d029](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2364.zip>) 2364 p. 1; [d031](<https://store.go4retro.com/2364-adapter/>) adapter; [d181](<https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21201-CPU.gif>) IC17/IC18 | Motorola's MCM68A364 map matches the 2364's 24 terminals, including /E on 20 and A12 on 21. The adapter maker lists 2364/68764 support. Dragon schematic IC17/IC18 use active-low selects. The note correctly leaves physical clearance untested. |

## d032 — http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2332.zip

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 91 | rom2332 (c64, vic20, pet, model3, model4) | 1–24 | CONFIRMED | [d032](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2332.zip>) 2332-1.GIF p.1; [d033](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/mos_2332_rom_feb_1980.pdf>) p.1 | Pins20/21 are the two mask-programmable selects. O1–O8 translate to D0–D7 consistently. Address and supply numbering agrees and is machine-neutral. |

## d034 — http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6522.zip

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 92 | via6522 (vic20, pet, c1541, c1571, bbcb, bbcmaster, oric1, atmos) | 19 | WRONG (low) | [d034](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6522.zip>) 6522-01.gif p.1 | Pin19 is generic CB2 control/shift I/O. The appended PET beep assignment is machine-specific and not supplied by this datasheet; move that board role to a PET-specific annotation. Other listed brands do not inherit the PET wiring. |

## d035 — http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6520.zip

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 93 | pia6520 (pet, atari400, atari800, atari600xl, atari800xl, atari130xe) | 1–40 | CONFIRMED | [d035](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6520.zip>) 6520-1.gif p.1 | The pin configuration, select polarities, clocks and buses agree; no PET-specific peripheral wiring is presented as universal. |

## d036 — https://www.ti.com/lit/ds/symlink/uln2003a.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 95 | uln2003 (c1541, disk2) | 1–16 | CONFIRMED | [d036](<https://www.ti.com/lit/ds/symlink/uln2003a.pdf>) PDF 3, input schematic and ratings | Base inputs1–7, common emitter8, diode common9 and reversed collector outputs10–16 agree. Flyback common is correctly described as load supply, not a logic VCC pin. |

## d038 — http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 96 | cpu6502 (apple2, apple2plus, apple2e, pet, vic20, c1541, c1571, c1581, apple2c, atari400, atari800, bbcb, electron, oric1, atmos) | 1–40 | CONFIRMED | [d038](<http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf>) PDF 10; [d039](<https://www.westerndesigncenter.com/wdc/documentation/w65c02s.pdf>) PDF 13 rendered | 6502 pins match MOS diagram. WDC exceptions1/5/36 are explicitly identified and agree with W65C02S. Oscillator/probe descriptions do not impose one machine's clock rate. |

## d040 — https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n4

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 97 | cpu6502 (apple2, apple2plus, apple2e, pet, vic20, c1541, c1571, c1581, apple2c, atari400, atari800, bbcb, electron, oric1, atmos) → 65C02 (Rockwell, NCR or GTE, as in the Enhanced IIe) | CPU/ROM substitution | UNVERIFIABLE | [d040](<https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n4>) PDF 5 printed1.2.2 | Silent on the broad claim: the enhanced Apple IIe CPU/ROM combination is documented. This page has no Rockwell, NCR or GTE 65C02 variant pin/electrical tables and does not establish compatibility across the other listed machines. |

## d041 — https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n36

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 98 | mmu344 (apple2e) → 344-0010 MMU from another IIe | MMU UE4, same part | CONFIRMED | [d040](<https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n4>) PDF 8,37 printed17; [d127](<https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n198>) MMU pin diagram | Sams identifies UE4 as 344-0010-B and supplies no generic substitute. The claim is limited to the same-number MMU from a compatible IIe donor. |
| 99 | iou344 (apple2e) → 344-0020 IOU from another IIe | IOU UE5, same part | CONFIRMED | [d040](<https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n4>) PDF 8,37 printed17; [d127](<https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n198>) IOU pin diagram | Sams identifies UE5 as 344-0020-A and supplies no generic substitute. The claim is limited to the same-number IIe IOU donor. |

## d042 — http://www.bitsavers.org/components/motorola/_dataSheets/MC3470.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 101 | mc3470 (disk2, duodisk) → MC3470A | same 18-pin device | CONFIRMED | [d042](<http://www.bitsavers.org/components/motorola/_dataSheets/MC3470.pdf>) PDF 1, shared MC3470/MC3470A sheet | Both grades share the datasheet and terminal assignment; A guarantees maximum 2.0% peak shift. |

## d043 — https://archive.org/details/Sams_Technical_Disk_II/page/n19

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 102 | mc3470 (disk2, duodisk) → ECG3470 | MC3470P→ECG3470 | UNVERIFIABLE | [d002](<https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Sams%20Technical%20-%20Disk%20II.pdf>)/[d043](<https://archive.org/details/Sams_Technical_Disk_II/page/n19>) PDF 20 printed8 | Silent on the substitute's limits: Sams explicitly cross-references ECG3470, but an ECG3470 datasheet was not recovered. An original MC3470 sheet and a cross-reference alone do not complete the required two-part comparison. |
| 105 | ca3146 (disk2) → RCA SK3697 | CA3146E→SK3697 | UNVERIFIABLE | [d002](<https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Sams%20Technical%20-%20Disk%20II.pdf>)/[d043](<https://archive.org/details/Sams_Technical_Disk_II/page/n19>) PDF 20 printed8; [d044](<http://www.bitsavers.org/components/rca/_dataBooks/1978_RCA_Linear_Integrated_Circuits.pdf>) PDF 211 | Silent on the substitute's limits: Sams cross-references SK3697, but no SK3697 datasheet was recovered for independent terminal/rating comparison. |

## d044 — http://www.bitsavers.org/components/rca/_dataBooks/1978_RCA_Linear_Integrated_Circuits.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 103 | ca3146 (disk2) → CA3146AE | same 14-pin array | CONFIRMED | [d044](<http://www.bitsavers.org/components/rca/_dataBooks/1978_RCA_Linear_Integrated_Circuits.pdf>) PDF 211–212 | The joint CA3146E/AE diagram gives identical terminals. VCEO is 30 V for E and 40 V for AE, supporting the higher-voltage replacement note. |
| 104 | ca3146 (disk2) → CA3046 | 1–14; VCEO | CONFIRMED | [d044](<http://www.bitsavers.org/components/rca/_dataBooks/1978_RCA_Linear_Integrated_Circuits.pdf>) PDF 115–116,211–212 | Both arrays use the same terminals. CA3046 VCEO is 15 V versus CA3146E at 30 V; the note correctly warns about reduced voltage headroom. |

## d045 — https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n7

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 106 | ls259 (disk2, duodisk, unidisk525) → 9334 or 74259 | 74LS259→9334/74259 | UNVERIFIABLE | [d040](<https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n4>) PDF 8; [d132](<https://www.ti.com/lit/ds/symlink/sn74ls259b.pdf>) PDF 1; [d133](<https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Interface%20Cards/Disk%20Drive%20Controllers/Apple%20Disk%20II%20Interface%20Card/Schematics/Apple%20Disk%20II%20-%20Schematics%20050-0005-01.pdf>) schematic | Silent on every named alternative: Sams lists N9334N and TI supplies the LS259 pinout. No separate 9334 or original 74259 datasheet was recovered to establish the whole replacement list. |

## d046 — http://www.faqs.org/faqs/atari-8-bit/faq/section-12.html

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 107 | cpu6502c (atari600xl, atari800xl, atari130xe) → C014806 SALLY from another 600XL, 800XL, 65XE, 130XE, XEGS (also in late 400/800 CPU boards, the 5200 and 7800) | 35 /HALT,36 R/W | CONFIRMED | [d046](<http://www.faqs.org/faqs/atari-8-bit/faq/section-12.html>) section1.11 SALLY; [d135](<https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n12>) PDF 13; [d136](<https://archive.org/details/Atari600XLComputerFieldServiceManualRev1/page/n14>) PDF 15 | The service pin diagrams and Atari FAQ distinguish SALLY /HALT on 35 and R/W on 36 from the standard 6502's NC terminals. The donor rule stays within C014806; it does not recommend a stock 6502 drop-in. |
| 108 | antic (atari400, atari800, atari600xl, atari800xl, atari130xe) → CO12296 (400/800/1200XL) or CO21697 (600XL/800XL/XE), NTSC | ANTIC NTSC variants | UNVERIFIABLE | [d046](<http://www.faqs.org/faqs/atari-8-bit/faq/section-12.html>) ANTIC table; [d005](<https://archive.org/details/atari400800fieldservicemanualmay1983/page/n18>) PDF 22; [d135](<https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n12>) PDF 14 | Silent on separate variant limits: the FAQ supports the NTSC part numbers/clock and service diagrams show the interface. Independent C012296 and C021697 datasheets were not recovered. |
| 109 | antic (atari400, atari800, atari600xl, atari800xl, atari130xe) → CO14887 (400/800) or CO21698 (XL/XE), PAL and SECAM | ANTIC PAL/SECAM variants | UNVERIFIABLE | [d046](<http://www.faqs.org/faqs/atari-8-bit/faq/section-12.html>) ANTIC table; service pin diagrams | Silent on separate variant limits: the FAQ supports the PAL part numbers and PAL ANTIC in SECAM machines, but has no independent C014887/C021698 pin/electrical tables. |
| 110 | gtia (atari400, atari800, atari600xl, atari800xl, atari130xe) → CO14805 GTIA (NTSC) for a CO12295 CTIA | CTIA→GTIA NTSC | UNVERIFIABLE | [d046](<http://www.faqs.org/faqs/atari-8-bit/faq/section-12.html>) CTIA/GTIA; [d005](<https://archive.org/details/atari400800fieldservicemanualmay1983/page/n18>) PDF 23; [d135](<https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n12>) PDF 15 | Silent on independent electrical comparison: the FAQ states GTIA backward compatibility and the POKE 623,64 test. Shared service-interface diagrams do not provide both CTIA and GTIA electrical datasheets. |
| 111 | gtia (atari400, atari800, atari600xl, atari800xl, atari130xe) → CO14889 GTIA (PAL), CO20120 FGTIA (SECAM) | PAL GTIA/SECAM FGTIA | UNVERIFIABLE | [d046](<http://www.faqs.org/faqs/atari-8-bit/faq/section-12.html>) CTIA/GTIA/FGTIA | Silent on both variants' electrical limits: the FAQ supports PAL ANTIC pairing and the SECAM eight-versus-sixteen-luminance difference, but has no independent GTIA/FGTIA comparison. |
| 113 | freddie (atari800xl, atari130xe) → CO61991 or CO61922 FREDDIE from another XE or late 800XL | FREDDIE C061922/C061991 | UNVERIFIABLE | [d046](<http://www.faqs.org/faqs/atari-8-bit/faq/section-12.html>) FREDDIE table; [d137](<https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n4>) PDF 16 | Silent on the older part's limits: the FAQ lists both FREDDIE numbers and Sams names C061991-29. Neither supplies a separate C061922 pin/electrical table. |

## d047 — https://en.wikipedia.org/wiki/POKEY

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 112 | pokey (atari400, atari800, atari600xl, atari800xl, atari130xe) → C012294 with any maker suffix (-01 AMI, -03 Signetics, -19 National, -22 OKI, -31 IMP) | POKEY maker suffixes | UNVERIFIABLE | [d047](<https://en.wikipedia.org/wiki/POKEY>) part-number section; [d005](<https://archive.org/details/atari400800fieldservicemanualmay1983/page/n18>) PDF 24; [d135](<https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n12>) PDF 16 | Silent on every manufacturer suffix: the citation lists the C012294 family and makers, while service manuals show the POKEY interface. Separate maker datasheets for all suffixes were not recovered. |

## d048 — https://www.ti.com/product/SN74LS541

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 115 | ls-controller (colecovision) → SN74LS541N | 1–20 | CONFIRMED | [d146](<https://www.ti.com/lit/ds/symlink/sn74ls541.pdf>) PDF 1,7; [d048](<https://www.ti.com/product/SN74LS541>) product status | TI lists DIP-20 SN74LS541N as Active Production. Its flow-through pin assignment agrees and differs from the warned-against 244 arrangement. |

## d049 — https://www.ti.com/product/SN74HCT541

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 116 | ls-controller (colecovision) → SN74HCT541N | 541 inputs2–9; VIH | CONFIRMED | [d146](<https://www.ti.com/lit/ds/symlink/sn74ls541.pdf>) pinout; [d182](<https://www.ti.com/lit/ds/symlink/sn74hct541.pdf>) PDF 3–5; [d183](<https://www.ti.com/lit/ds/symlink/sn74hc541.pdf>) recommended conditions; [d148](<https://colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf>) sheet6 rendered | HCT541 shares the 541 pin map and has VIH = 2 V; HC needs 3.15 V at VCC = 4.5 V. The Coleco redraw shows the 210 Ω/210 Ω divider and 22 kΩ U25/U26 pullups to 2V5, supporting the threshold warning. |

## d050 — https://www.zilog.com/docs/z80/um0080.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 117 | cpuz80 (zx80, zx81, spectrum, spectrum128, spectrumplus2, spectrumplus3, c128, colecovision, adam, ts1000, ts1500, ts2068, model1, model3, model4, cpc464, cpc664, cpc6128, msx1, msx2) | 1–40 | CONFIRMED | [d050](<https://www.zilog.com/docs/z80/um0080.pdf>) PDF 19–21, printed5–7 | Zilog's pin diagram and signal descriptions agree, including MOS-level CLK, seven-bit refresh, HALT NOP/refresh operation and NMI vector 0066h. Probe text keeps machine timing conditional. |

## d051 — https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 118 | ula_zx81 (zx81, ts1000) | 1–40 | CONFIRMED | [d051](<https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif>) circuitSRC049; [d052](<https://oldcomputer.info/8bit/zx81/ULA/ula.htm>) pin groups | The SRC049 circuit and ULA pin notes agree on numbering/functions. Board details are tied to the ZX81 ULA design shared by ZX81/TS1000 rather than applied to an unrelated general-purpose chip. |
| 121 | rom_zx81 (zx81, ts1000, ts1500) | ROM20 ULA13/R28;1–24 | UNVERIFIABLE | [d051](<https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif>) SRC049; [d055](<https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf>) component listp6 | Silent on the TS1500 portion: SRC049 supports the ZX81 bus/pin details, but does not establish the TS1500 ULA-pin-13/R28/edge-B23 wiring. That machine-specific text cannot be confirmed from the cited source. |

## d053 — https://retro.engineer/projects/2021-03-13_Sinclair_ZX81_A/

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 119 | ula_zx81 (zx81, ts1000) → 2C210E | 2C184E→2C210E | UNVERIFIABLE | [d053](<https://retro.engineer/projects/2021-03-13_Sinclair_ZX81_A/>) Composite video upgrade; [d052](<https://oldcomputer.info/8bit/zx81/ULA/ula.htm>) notes | Silent on complete replacement compatibility: the repair page confirms the 2C184E back-porch problem but provides no 2C210E datasheet or full electrical comparison. |

## d054 — http://www.bitsavers.org/components/ti/_dataBooks/1980_TI_The_MOS_Memory_Data_Book_for_Design_Engineers.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 120 | sram2114 (zx80, zx81, pet, vic20, c64, c1541, colecovision, model3) | 1–18 | CONFIRMED | [d054](<http://www.bitsavers.org/components/ti/_dataBooks/1980_TI_The_MOS_Memory_Data_Book_for_Design_Engineers.pdf>) PDF 83 printed79 rendered; [d051](<https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif>) IC4a/b | The TMS2114 pin map and active-low controls agree. The shared text stays generic instead of assigning fixed ZX81 RAM wiring. |

## d056 — https://archive.org/details/SincLink/Sinc-Link%20Vol%2003%20No%205/page/n9

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 122 | rom_zx81 (zx81, ts1000, ts1500) → 2764 EPROM on a 24-to-28 pin adapter | 24-to-28 ROM map | CONFIRMED | [d056](<https://archive.org/details/SincLink/Sinc-Link%20Vol%2003%20No%205/page/n9>) PDF 9 printed9 rendered; [d029](<http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2364.zip>) 2364 p.1; [d020](<https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf>) JEDEC map | The article supplies a 24-pin plug/28-pin 2764 socket map, routing A12, enable and VPP rather than proposing a drop-in. The cited /page/n9 opens PDF page 10; the article is PDF page 9 (/page/n8). |

## d057 — https://oshpark.com/shared_projects/22vOyf1p

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 123 | rom_zx81 (zx81, ts1000, ts1500) → AT28C128 / AT28C256 PLCC adapter | AT28C128/256 PLCC adapter | UNVERIFIABLE | [d057](<https://oshpark.com/shared_projects/22vOyf1p>) shared project description | Silent on routing: the project author describes a ZX81 issue-3 PLCC adapter and selectable images, but supplies no netlist or both EEPROM datasheets. Intended function alone does not establish the actual adapter map. |

## d058 — http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 124 | dram4116 (apple2, apple2plus, spectrum, atari400, atari800, colecovision, adam, ts1500, ti994a, ti994, coco1, model1, model3, model4, pc5150, dragon32, msx1) | 1–16 | CONFIRMED | [d058](<http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf>) PDF 98,107 | Mostek's pin/supply map and VBB first-on/last-off recommendation agree. VBB must not become positive relative to VSS while VDD is present. The text stays machine-neutral. |

## d059 — https://www.pcbway.com/project/shareproject/4116_adapter_c2a98c0e.html

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 125 | dram4116 (apple2, apple2plus, spectrum, atari400, atari800, colecovision, adam, ts1500, ti994a, ti994, coco1, model1, model3, model4, pc5150, dragon32, msx1) → 4164 / 41256 on a 4116 adapter | 4116→4164/41256 adapter | CONFIRMED | [d059](<https://www.pcbway.com/project/shareproject/4116_adapter_c2a98c0e.html>) projectdescription; [d058](<http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf>) PDF 98; [d014](<http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf>) PDF 79,103–104 | The project author specifies 4164/41256 support. Compared DRAM maps require the described +5 V relocation and address strapping. Mostek's sequencing rule supports retaining VBB for any remaining 4116s. |

## d060 — https://www.arcadecollecting.com/info/ram_info/4116to4164/Convert%204164%20to%204116.htm

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 126 | dram4116 (apple2, apple2plus, spectrum, atari400, atari800, colecovision, adam, ts1500, ti994a, ti994, coco1, model1, model3, model4, pc5150, dragon32, msx1) → 4164 with pins 1 and 8 bent out | 1,8,9 | CONFIRMED | [d060](<https://www.arcadecollecting.com/info/ram_info/4116to4164/Convert%204164%20to%204116.htm>) steps1–4; [d058](<http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf>) PDF 98; [d014](<http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf>) PDF 79 | 4164 NC pin 1 and VCC pin 8 must avoid the 4116 socket's -5 V/+12 V. Linking 4164 A7 pin 9 (socket +5 V) to pin 8 supplies power as instructed. The separate 4164 refresh restriction still applies. |

## d061 — https://retroleum.co.uk/zx-spectrum-chips

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 127 | dram4532 (spectrum) → 4164 (64K x 1, 128-cycle refresh) | 4532/3732→128-row4164 | CONFIRMED | [d061](<https://retroleum.co.uk/zx-spectrum-chips>) UpperRAM; [d149](<http://www.bitsavers.org/components/oki/_dataBooks/1983_OKI_Memory_Data_Book.pdf>) PDF 66; [d150](<http://www.bitsavers.org/components/ti/_dataBooks/1982_LCC7061_TI_MOS_Memory_Data_Book.pdf>) 4164 pinout | Retroleum explicitly permits individual or full replacement with 150 ns, 128-cycle 4164s using any valid TI/OKI jumper setting. Original and replacement DIP-16 maps support that upper-bank rule. |

## d062 — https://www.spectrumforeveryone.com/?p=59

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 128 | ula_spectrum (spectrum) → 6C001E-7 | ULA variant | UNVERIFIABLE | [d062](<https://www.spectrumforeveryone.com/?p=59>) What ULA works in what machine; [d018](<https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf>) service manual ULA list | Silent on the required datasheet comparison: The compatibility table lists 6C001E-7 for issues 1–6A. The note preserves the board-revision restriction. Separate Ferranti pin/electrical datasheets for the original and replacement ULA revisions were not recovered; the compatibility table confirms board restrictions only. |
| 129 | ula_spectrum (spectrum) → 6C001E-5 / 6C001E-6 | ULA variant | UNVERIFIABLE | [d062](<https://www.spectrumforeveryone.com/?p=59>) 6C001E-5/-6 and compatibility table | Silent on the required datasheet comparison: The source limits 6C001E-5/-6 to issues 1, 2 and 3 and documents the -5 character shift and EAR warm-up behavior. Separate Ferranti pin/electrical datasheets for the original and replacement ULA revisions were not recovered; the compatibility table confirms board restrictions only. |
| 130 | ula_spectrum (spectrum) → 5C102E / 5C112E | ULA variant | UNVERIFIABLE | [d062](<https://www.spectrumforeveryone.com/?p=59>) 5C102E/5C112E and compatibility table | Silent on the required datasheet comparison: The source requires the cockroach board for 5C102E, and its removal for 5C112E on issue 1. The listed combinations agree. Separate Ferranti pin/electrical datasheets for the original and replacement ULA revisions were not recovered; the compatibility table confirms board restrictions only. |

## d063 — https://bitsavers.org/components/yamaha/YM2149_199209.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 132 | ay8912 (ts2068, spectrum128, spectrumplus2, spectrumplus3, cpc464, cpc664, cpc6128, oric1, atmos) → YM2149 on a 28-pin adapter | YM2149 SEL26; 40-to-28 adapter | CONFIRMED | [d063](<https://bitsavers.org/components/yamaha/YM2149_199209.pdf>) PDF 1–3; [d153](<https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf>) AY8910/8912 pinouts | YM2149 is 40-pin and AY-3-8910-compatible, whereas AY-3-8912 is 28-pin; an adapter is necessary. SEL low divides its clock by two; open/high preserves the AY clock relationship. |

## d064 — https://k1.spdns.de/Vintage/Sinclair/82/Timex%20Sinclair%202068/Tech%20Specs%20and%20Repair/Timex%20Sinclair%202068%20-%20Technical%20Manual.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 133 | rom_ts2068_exrom (ts2068) → 2764 EPROM (after board rework) | 1,26,27 | CONFIRMED | [d064](<https://k1.spdns.de/Vintage/Sinclair/82/Timex%20Sinclair%202068/Tech%20Specs%20and%20Repair/Timex%20Sinclair%202068%20-%20Technical%20Manual.pdf>) PDF 26 printed18; [d020](<https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf>) PDF 411; [d085](<https://ww1.microchip.com/downloads/en/DeviceDoc/11107M.pdf>) PDF 1 | The Timex manual specifies isolating pin 27, tying 1/27 high and, for 27128, rerouting pin 26 from /RD to U16 A13. Intel/Microchip EPROM maps agree. |

## d065 — https://archive.org/details/cc_2_texasinst_ti99/page/n19/mode/1up

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 138 | psg76489 (ti994a, ti994, colecovision, adam, bbcb, bbcmaster) → TMS9919 = SN94624N | SN94624N/TMS9919 | UNVERIFIABLE | [d065](<https://archive.org/details/cc_2_texasinst_ti99/page/n19/mode/1up>) PDF 20 printed18 rendered; [d154](<https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf>)/[d155](<https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI994A_HC_Servicing_Manual_Oct_1983.pdf>) sound section | Silent on complete electrical equivalence: Sams names SN94624N/TMS9919 at U511. No independent SN94624/TMS9919 electrical datasheet was recovered. |
| 141 | tms9904 (ti994a, ti994) → SN74LS362 / TIM9904A | TIM9904A/SN74LS362 | CONFIRMED | [d065](<https://archive.org/details/cc_2_texasinst_ti99/page/n19/mode/1up>) PDF 20 (printed 18); [d156](<https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/TIM9904.pdf>) PDF 7–8,10 (printed 4–5,7), Table 1/Fig. 9 | Sams lists TIM9904ANL/74LS362 at U601. TI's joint manual supplies the terminal correspondence; its oscillator is four times the phase-cycle frequency, supporting 12 MHz for 3 MHz phases. |
| 143 | sram6810 (ti994a, ti994) → MCM6810P / NTE6810 / ECG6810 | MCM6810/NTE6810/ECG6810 | UNVERIFIABLE | [d065](<https://archive.org/details/cc_2_texasinst_ti99/page/n19/mode/1up>) PDF 20 printed18 rendered | Silent on the named substitutes' limits: Sams lists MCM6810P/NTE6810/ECG6810, but independent NTE/ECG datasheets were not recovered. The parts list cannot establish unrestricted 'any 6810' equivalence. |

## d066 — https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/SN76489.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 139 | psg76489 (ti994a, ti994, colecovision, adam, bbcb, bbcmaster) → SN76494N | clock14; audio9 | UNVERIFIABLE | [d066](<https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/SN76489.pdf>) PDF 1 rendered; [d065](<https://archive.org/details/cc_2_texasinst_ti99/page/n19/mode/1up>) PDF 20 | Silent on the crucial analog comparison: TI calls SN76494N identical to SN76489A except for removing divide-by-eight and specifies a 500 kHz input limit. No SN94624 sheet establishes pin 9 mixer equivalence. |
| 140 | psg76489 (ti994a, ti994, colecovision, adam, bbcb, bbcmaster) → SN76489AN | 9 NC;14 clock | CONFIRMED | [d066](<https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/SN76489.pdf>) PDF 1 rendered; [d154](<https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf>)/[d155](<https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI994A_HC_Servicing_Manual_Oct_1983.pdf>) TMS9919 circuit/sound section | SN76489AN specifies a 4 MHz clock input, divide-by-eight and NC pin 9. TI's approximately 447 kHz clock versus a required approximately 3.58 MHz input gives the warned eightfold pitch error; the unchanged mixer connection is also excluded. |

## d067 — https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/MOSMemory-1986/MOSMemory-1986-07-ROMs.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 142 | romconsole (ti994a, ti994) → TMS2532 EPROM | 18 A11;20 PD/PGM;21 VPP | WRONG (high) | [d067](<https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/MOSMemory-1986/MOSMemory-1986-07-ROMs.pdf>) PDF 15; [d014](<http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf>) PDF 207–208; [d154](<https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf>) PDF 62 ROMcrop | TMS2532 pin 18 is A11, not a programming function. Pin 21 is VPP and requires +5 V in read mode. TI's U610/U611 TMS4732 sockets ground pin 21 (/CS2). A 2532 needs pin 21 isolated and tied to +5 V; the note's pin-compatible classification omits that necessary rework. |

## d068 — https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 144 | cpu6809e (coco1, coco2, coco3, dragon32, dragon64) | 5 BS;6 BA;40 /HALT;boardprobeannotations | WRONG (medium) | [d068](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf>) PDF 1,6,9 rendered; [d069](<https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%202%20NTSC%20Service%20Manual%20(26-3026%20%26%2026-3027)%20(Tandy).pdf>) CPU section | The BA/BS table specifies 1/1 for halt acknowledge and 0/1 for interrupt/reset acknowledge. /HALT stops at the end of the current instruction, not the next cycle boundary. CoCo 3 NC/ground probe annotations also appear in this shared record. The TSC address/data/RW float description is supported on page 9. |
| 145 | cpu6809e (coco1, coco2, coco3, dragon32, dragon64) → MC68A09E | E34/Q35 frequency | CONFIRMED | [d068](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf>) PDF 1–2 (rendered) | The joint sheet gives MC68A09E the same pin map and a 0.1–1.5 MHz E/Q range. The note correctly excludes CoCo 3 fast operation at approximately 1.78 MHz. |
| 146 | cpu6809e (coco1, coco2, coco3, dragon32, dragon64) → MC68B09E | E34/Q35 frequency | CONFIRMED | [d068](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf>) PDF 1–2 (rendered) | The joint sheet gives MC68B09E the same pin map and a 0.1–2 MHz E/Q range, versus plain MC6809E at 1 MHz maximum. The fast-CoCo caveat agrees. |

## d070 — https://colorcomputerarchive.com/repo/Documents/Microprocessors/HD6309/HD63B09EP%20Technical%20Reference%20Guide.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 147 | cpu6809e (coco1, coco2, coco3, dragon32, dragon64) → Hitachi HD63B09E / HD63C09E (6309) | 6309 error vector | CONFIRMED | [d068](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf>) PDF 1–2; [d187](<https://datasheet.octopart.com/HD63C09EP-Hitachi-datasheet-182017861.pdf>) PDF 1–2 (printed 277–278); [d070](<https://colorcomputerarchive.com/repo/Documents/Microprocessors/HD6309/HD63B09EP%20Technical%20Reference%20Guide.pdf>) PDF 14 (printed 7) | Motorola and Hitachi DIP-40 maps agree. Hitachi specifies CMOS and 2/3 MHz B/C grades. The guide documents the illegal-opcode vector FFF0/FFF1 and the 10 20 LBRA example; the software warning is correct. Its cited #page=13 precedes the actual error-trapping page. |

## d071 — https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847%20MOS%20Video%20Display%20Generator%20(Motorola).pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 148 | vdg6847 (coco1, coco2, mc10, dragon32, dragon64) | 38 /HS | WRONG (medium) | [d071](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847%20MOS%20Video%20Display%20Generator%20(Motorola).pdf>) PDF 1,12–13; [d159](<https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Schematic/MC-10%20Schematic%20(Tandy).pdf>) MC10 schematic | MC6847 pin 38 is a generic /HS output. 'Goes to SAM pin 9' is CoCo/Dragon wiring and is false for the MC-10: its schematic uses discrete arbitration logic and has no SAM. Move that connection into the relevant machine records. The remaining VDG pin map agrees. |
| 149 | vdg6847 (coco1, coco2, mc10, dragon32, dragon64) → MC6847P from another CoCo or MC-10 | 1–40 | CONFIRMED | [d071](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847%20MOS%20Video%20Display%20Generator%20(Motorola).pdf>) PDF 1; [d072](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847T1%20MOS%20Video%20Display%20Generator%20(Motorola).pdf>) PDF 1 rendered | Plain MC6847 uses the shown pin assignment. The note correctly excludes a board wired for the rearranged T1 variant from this same-part donor rule. |

## d072 — https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847T1%20MOS%20Video%20Display%20Generator%20(Motorola).pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 150 | vdg6847 (coco1, coco2, mc10, dragon32, dragon64) → MC6847T1 | 12–26, data pins | CONFIRMED | [d071](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847%20MOS%20Video%20Display%20Generator%20(Motorola).pdf>) PDF 1; [d072](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847T1%20MOS%20Video%20Display%20Generator%20(Motorola).pdf>) PDF 1 rendered | The T1 map rearranges data pins and replaces DA1–DA12 with I/O/control functions while retaining DA0. Motorola names both compatible SAMs. The adapter classification, rather than drop-in replacement, is correct. |
| 153 | sam6883 (coco1, coco2, dragon32, dragon64) → SN74LS785 | 1–40 | CONFIRMED | [d073](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf>) PDF 1,4; [d072](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847T1%20MOS%20Video%20Display%20Generator%20(Motorola).pdf>) PDF 1 rendered | The joint 783/6883/785 sheet gives a common terminal assignment. The 785 additionally supports 256-row RAM and improved tolerance. The note's conservative board-matching advice is safe, although the differences are documented in that joint sheet. |

## d073 — https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 151 | sam6883 (coco1, coco2, dragon32, dragon64) | 14 E | WRONG (medium) | [d073](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf>) PDF 1,4–5 rendered (printed5-323,326–327) | The SAM's MPU rate is programmable at crystal/16 or crystal/8, rather than universally 0.89 MHz. A 14.31818 MHz crystal therefore permits approximately 0.895 or 1.790 MHz. The E probe expectation must depend on crystal and rate mode. |
| 152 | sam6883 (coco1, coco2, dragon32, dragon64) → SN74LS783 | 1–40 | CONFIRMED | [d073](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf>) PDF 1,4 rendered | SN74LS783 and MC6883 are named together on the joint datasheet and share one terminal assignment and function. |

## d074 — https://www.cocopedia.com/wiki/index.php/GIME

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 154 | gime-tcc1014 (coco3) → TCC1014 GIME from another CoCo 3 | replacementavailability | WRONG (medium) | [d074](<https://www.cocopedia.com/wiki/index.php/GIME>) Known Versions / Expansions; [CoCo Bits GIME-Z product page](<https://cocobits.org/products/gime-z-upgrade-for-the-color-computer-3>) | The original 1986/1987 GIME versions are supported. The assertion that no new replacement exists is false: CoCo Bits documents its FPGA GIME-Z socket replacement/upgrade, and the cited wiki links GIME-X. Sold-out stock does not negate the replacement's existence. |

## d075 — https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 155 | cpu6803 (mc10) → HD6803P (Hitachi) | MC6803G→HD6803P | UNVERIFIABLE | [d075](<https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf>) PDF 27; [d189](<https://www.bitsavers.org/components/hitachi/_dataBooks/1991_M21T132_Hitatchi_8_16_Bit_Microprocessor_Data_Book.pdf>) PDF 353–354 (printed 340–341) | Silent on a complete two-part comparison: Tandy lists MC6803G or HD6803P at U1, and the recovered Hitachi sheet explicitly names MC6803 compatibility and supplies its DIP-40 map. The original Motorola MC6803G electrical datasheet was not recovered; full manufacturer-to-manufacturer limits remain unverified. |

## d076 — https://bitsavers.org/components/intel/_dataBooks/1978_Intel_Component_Data_Catalog.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 156 | sram2102 (model1) → 2102A, 2102AL (any speed grade) | 2102A/AL speedgrades | CONFIRMED | [d076](<https://bitsavers.org/components/intel/_dataBooks/1978_Intel_Component_Data_Catalog.pdf>) PDF 62 printed3-30; [d160](<https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf>) VideoRAMsection | Intel's joint A/AL table gives the same pin map and 250–450 ns speed grades. The Model I 2102AN-4L requirement is 450 ns; the 174/342 mW low-power comparison agrees. |

## d077 — https://bitsavers.org/components/motorola/_dataBooks/1979_Motorola_Memory_Data_Book.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 157 | cg-mcm6670 (model1) → MCM6674 | MCM6670/MCM6674 18pins | CONFIRMED | [d077](<https://bitsavers.org/components/motorola/_dataBooks/1979_Motorola_Memory_Data_Book.pdf>) PDF 129 printed2-112 | Motorola explicitly calls MCM6674 a preprogrammed MCM6670 with the same 18 terminals. The note correctly warns that character contents need not match the TRS-80 font. |

## d078 — https://archive.org/download/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 158 | fdc1771 (model1) → FD1771A-01 or FD1771B-01 | 1 -5V;21 +5V;40 +12V;package | CONFIRMED | [d078](<https://archive.org/download/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital.pdf>) PDF 1,2,20 rendered | The joint FD1771-01 sheet identifies A ceramic and B plastic packages sharing the pin map. Pin 1 is -5 V, pin 21 +5 V and pin 40 +12 V. |

## d079 — https://www.trs-80.org/percom-doubler.html

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 159 | fdc1771 (model1) → Percom Doubler (with the original 1771) | PercomDoubler adapter | UNVERIFIABLE | [d079](<https://www.trs-80.org/percom-doubler.html>) articleinstallationdescription; [d078](<https://archive.org/download/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital.pdf>) original1771 | Silent on adapter routing: the article confirms plug-in installation, retained 1771 and DOS requirements, but supplies neither the adapter circuit nor a complete second-controller datasheet. The actual cross-connections cannot be verified. |

## d080 — https://archive.org/details/wd279x-6a91f82a09428057655792/page/n0

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 162 | fdc1793 (model3, model4) → WD2793 | 2793vs1793 supply/pins | CONFIRMED | [d080](<https://archive.org/details/wd279x-6a91f82a09428057655792/page/n0>) PDF 1–2 rendered; [d162](<https://bitsavers.org/components/westernDigital/FD179X-02_Data_Sheet_May1980.pdf>) PDF 1 rendered | The two WD sheets agree on the key differences: 1793 has +12 V on 40 and +5 V on 21; 2793 is +5 V only, with HLT on 40, ENP on 1 and added PLL terminals. Bus/software compatibility does not make it a bare-chip drop-in; the adapter classification is correct. |

## d081 — https://archive.org/details/Western_Digital_Corporation_WD177X-00_Floppy_Disk_Formatter_Controller_undated/page/n0

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 163 | fdc1793 (model3, model4) → WD1773 | WD1773 28pins vs1793 40pins | CONFIRMED | [d081](<https://archive.org/details/Western_Digital_Corporation_WD177X-00_Floppy_Disk_Formatter_Controller_undated/page/n0>) PDF 1 rendered; [d162](<https://bitsavers.org/components/westernDigital/FD179X-02_Data_Sheet_May1980.pdf>) PDF 1 | WD specifies 1773 software compatibility with 1793, but a 28-pin, +5 V-only package and internal digital separator. The original 1793 is 40-pin. An adapter is necessary. |

## d082 — https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 164 | cpu6808 (hero1, herojr) → MC6802 | 36 RE | UNVERIFIABLE | [d082](<https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf>) PDF 1,REsignaldescription | Silent on the board-specific strap: the joint Motorola sheet confirms identical terminals except for the 6802 RAM, disabled by RE pin 36 low. It does not establish that HERO 1 grounds RE. No cited HERO 1 schematic verifies that additional assertion; the conditional chip substitution itself is supported. |
| 165 | cpu6808 (hero1, herojr) → MC68A08 / MC68B08 | speedgrades/clock38–39 | CONFIRMED | [d082](<https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf>) PDF 1,3 rendered | The joint sheet gives MC68A08 a 1.5 MHz maximum/6 MHz crystal and MC68B08 a 2 MHz maximum/8 MHz crystal, both with a 0.1 MHz minimum and the original pin map. |

## d083 — https://bitsavers.org/components/motorola/_dataSheets/6821.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 166 | pia6821 (herojr, coco1, coco2, coco3, dragon32, dragon64) | 1–40 | CONFIRMED | [d083](<https://bitsavers.org/components/motorola/_dataSheets/6821.pdf>) PDF 1 rendered andsignaldescription | Motorola's pin assignment matches the ports, selects, control and data pins. The text stays generic without importing HERO Jr device roles or addresses. |
| 167 | pia6821 (herojr, coco1, coco2, coco3, dragon32, dragon64) → MC6821P / MC68A21P / MC68B21P | package/speedgrade | CONFIRMED | [d083](<https://bitsavers.org/components/motorola/_dataSheets/6821.pdf>) PDF 1 rendered | The joint sheet lists P plastic, L ceramic, S cerdip and 1/1.5/2 MHz grades with the same terminals; the C temperature-range suffix agrees. |

## d084 — https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 168 | sram6116 (hero1, herojr, c1541, c1571, ts1000) | 1–24 | CONFIRMED | [d084](<https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf>) PDF 67 printed65 rendered | The Hitachi map agrees: A7–A0, IO1–IO8 renamed D0–D7, /CS18, A10 on 19, /OE20, /WE21, VCC24 and GND12. Text stays generic. |
| 169 | sram6116 (hero1, herojr, c1541, c1571, ts1000) → HM6116LP-2 / -3 / -4 | 6116LP retention/speed | CONFIRMED | [d084](<https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf>) PDF 67,89–92 printed65,87–90 | Standard/LP pin maps agree. The joint LP sheet gives 120/150/200 ns grades and 2 V data retention with chip select held inactive; the lower standby-voltage condition is qualified. |

## d085 — https://ww1.microchip.com/downloads/en/DeviceDoc/11107M.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 171 | rom2764 (hero1, colecovision, bbcb) → 27C64 | 2764/27C64 pins1/26/27 | CONFIRMED | [d020](<https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf>) JEDEC2764/27128comparison; [d085](<https://ww1.microchip.com/downloads/en/DeviceDoc/11107M.pdf>) PDF 1; [d148](<https://colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf>) ColecoROMsheet | Intel/Microchip DIP-28 maps agree: VPP1, NC26 and /PGM27. Microchip marks 27C64 obsolete. The note preserves the Coleco ROM-jumper condition. |

## d086 — https://ww1.microchip.com/downloads/en/DeviceDoc/11003L.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 173 | rom27128 (herojr, c1541, bbcb, bbcmaster) → 27C128 | 27128→27C128 | CONFIRMED | [d020](<https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf>) PDF 411; [d086](<https://ww1.microchip.com/downloads/en/DeviceDoc/11003L.pdf>) PDF 1 | Intel NMOS and Microchip CMOS DIP-28 maps agree, including A13 on 26 and /PGM27. Microchip marks 27C128 obsolete. |

## d087 — https://ww1.microchip.com/downloads/en/DeviceDoc/doc0014.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 174 | rom27128 (herojr, c1541, bbcb, bbcmaster) → AT27C256R | 27 A14 | CONFIRMED | [d020](<https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf>) PDF 411; [d087](<https://ww1.microchip.com/downloads/en/DeviceDoc/doc0014.pdf>) PDF 2; [Microchip AT27C256R product page](<https://www.microchip.com/en-us/product/AT27C256R>), Product Status | AT27C256R has A14 on 27 instead of 27128 /PGM. Other read terminals agree; repeating the 16 KB image in both halves removes bank-selection dependence. Microchip's current product page reports In Production. |

## d088 — https://www.scs.stanford.edu/22wi-cs212/pintos/specs/mc146818a.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 175 | rtc146818 (herojr, bbcmaster) | 13 /CS;board-specific1/18/19/23 text | WRONG (medium) | [d088](<https://www.scs.stanford.edu/22wi-cs212/pintos/specs/mc146818a.pdf>) PDF 1,8–10; [d177](<https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf>) PDF 21,23 (printed21,23) | The shared /CS description asserts decoding at $D810. BBC Master instead operates its RTC through the system VIA/slow bus. Motorola defines only a generic chip-select input. HERO Jr strapping, wakeup and 256 Hz programming belong in that machine's annotations. |

## d089 — https://ipv4.pccomponents.com/datasheets/MOTOR-MC6850P.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 176 | acia6850 (herojr, bbcb, bbcmaster) | 1–24 | CONFIRMED | [d089](<https://ipv4.pccomponents.com/datasheets/MOTOR-MC6850P.pdf>) PDF 1,signaldescriptions | The Motorola pin map and baud-clock, CTS and DCD functions agree. Text does not import HERO Jr addresses or peripheral wiring. |
| 177 | acia6850 (herojr, bbcb, bbcmaster) → MC6850P / MC68A50P / MC68B50P | MC6850/A/B grades | CONFIRMED | [d089](<https://ipv4.pccomponents.com/datasheets/MOTOR-MC6850P.pdf>) PDF 7 printed9 orderingtable | The joint Motorola sheet lists the same terminals for 1/1.5/2 MHz grades and the stated package/temperature suffixes. All meet the note's 1 MHz E requirement. |

## d090 — https://www.ti.com/lit/ds/symlink/sn74ls138.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 178 | ls138 (hero1, colecovision, bbcb) | 1–16 | CONFIRMED | [d090](<https://www.ti.com/lit/ds/symlink/sn74ls138.pdf>) PDF 1 rendered | TI's decoder map agrees: enables 4/5 low, enable 6 high, Y7 on 7, Y0 on 15, GND8 and VCC16. Text stays generic. |

## d091 — https://www.ti.com/product/TL851

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 179 | tl851 (herojr) → TL851CN | TL851CN;11/12 resonator | CONFIRMED | [d164](<https://www.ti.com/lit/ds/symlink/tl851.pdf>) PDF 1,6; [d091](<https://www.ti.com/product/TL851>) productpage | TI lists TL851CN as Active Production in PDIP-16. The datasheet shows oscillator pins 11/12 and the specified 420 kHz resonator. |

## d092 — https://www.ti.com/product/TL852

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 180 | tl852 (herojr) → TL852CN | TL852CN;HEROJr R358/R359/R361 | UNVERIFIABLE | [d165](<https://www.ti.com/lit/ds/symlink/tl852.pdf>) PDF 1,6; [d092](<https://www.ti.com/product/TL852>) productpage | Silent on the board-specific advice: TI supports TL852CN as the same active PDIP-16 part, but says nothing about HERO Jr R358/R359/R361 or paired replacement. No cited HERO Jr schematic verifies those assertions. |

## d093 — https://bitsavers.org/components/oki/_dataBooks/1986_OKI_Microprocessor_Databook.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 181 | msm5832 (hero1) → MSM5832RS (new old stock) | MSM5832RS;availability | UNVERIFIABLE | [d093](<https://bitsavers.org/components/oki/_dataBooks/1986_OKI_Microprocessor_Databook.pdf>) PDF 254 printed251 | Silent on current status: the 1986 OKI book confirms the MSM5832RS pin map but cannot establish 2026 production, stock or the absence of modern replacements. No primary current-status document was recovered. |

## d094 — https://bitsavers.org/components/siliconSystems/_dataBooks/1985_Silicon_Systems_Data_Book.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 182 | sc02 (hero2000) → SSI 263A / SSI 263AP (new old stock) | SC02/SSI263A alias;availability | UNVERIFIABLE | [d094](<https://bitsavers.org/components/siliconSystems/_dataBooks/1985_Silicon_Systems_Data_Book.pdf>) PDF 50 printed1-42 | Silent on the full claim: the sheet describes SSI263A and its pin map, but does not establish the Votrax SC02 alias, current discontinuation or absence of an emulator. No separate SC02 datasheet was recovered. |

## d095 — https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 183 | cpu8088 (pc5150, xt5160, pcjr, portable5155, hero2000) | 1–40,minimum/maximum modes | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 259–263; [d096](<https://www.pcjs.org/documents/datasheets/intel/INTEL_8088_CPU.pdf>) pinout | Intel's map and mode-specific functions agree, including two ground pins, active-high RESET, the 33% duty clock and mode pin 33. Board mode remains conditional. |
| 184 | cpu8088 (pc5150, xt5160, pcjr, portable5155, hero2000) → 8088-2 | 8088/8088-2 | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 259–263 | The joint Intel 8088/8088-2 sheet gives the same pin configuration and 5/8 MHz grades. The 8 MHz grade supports operation at 4.77 MHz. |
| 187 | clk8284 (pc5150, xt5160, portable5155, pcjr) → 8284A-1 | 8284A/A-1 | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 414–418 | The joint Intel sheet gives a common pin map and explicitly rates 8284A-1 for 10 MHz. The same divider/crystal arrangement supports the original 4.77 MHz application. |
| 190 | pic8259 (pc5150, xt5160, portable5155, pcjr) → 8259A-2 | 8259A-2 speedclaim | UNVERIFIABLE | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 144–145,158–159 | Silent on the stated bus-speed grade: the joint pin map agrees, but Intel's 8259A has no clock input and the cited text does not explicitly call -2 an 8 MHz grade. Timing tables specify pulses/delays. The CPU-bus-speed assertion needs an explicit source/qualification. |
| 192 | pit8253 (pc5150, xt5160, portable5155, pcjr) → 8254 | 8253→8254 | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 669,680 | Intel's two DIP-24 maps agree. It calls 8254 a superset of 8253 and lists 8 MHz, 10 MHz -2 and status readback. |
| 195 | ppi8255 (pc5150, xt5160, portable5155, pcjr, cpc464, cpc664, cpc6128, msx1, msx2) → 8255A | 8255A-5→8255A timing | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 697 pinmap,712–713 ACtables | The joint Intel sheet gives identical terminals and longer read/write timing for the ungraded part than -5. The note prefers -5 and does not claim identical timing. |
| 197 | dma8237 (pc5150, xt5160, portable5155) → 8237A-4 or 8237A | 8237A/-4/-5 clock12 | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 112–114; [d168](<https://pdos.csail.mit.edu/6.1810/2004/readings/hardware/8237A.pdf>) jointsheet | Intel explicitly lists 3/4/5 MHz grades with a common pin map. Plain/-4 cannot meet the PC's 4.77 MHz clock; the note correctly says to avoid them. |

## d097 — https://minuszerodegrees.net/misc/v20_problems.htm

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 185 | cpu8088 (pc5150, xt5160, pcjr, portable5155, hero2000) → NEC V20 (uPD70108) | 8088→NECV20 | UNVERIFIABLE | [minuszerodegrees V20 Problems](<https://minuszerodegrees.net/misc/v20_problems.htm>), lines 0–11; [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) original 8088 sheet | Silent on the second CPU's electrical limits: the primary fault account supports the AST SixPakPlus/BIOS warning, but no NEC µPD70108 datasheet was recovered for the required two-part comparison. |

## d098 — https://www.renesas.com/us/en/document/dst/80c88-datasheet

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 186 | cpu8088 (pc5150, xt5160, pcjr, portable5155, hero2000) → Harris (Intersil) 80C88 | 80C88 CLK19 | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 259–263,8284electricaltable; [d098](<https://www.renesas.com/us/en/document/dst/80c88-datasheet>) PDF 3,13,17 | Intel and Intersil DIP-40 maps agree. The CMOS sheet lists 5/8 MHz grades and bus-hold circuits. CLK requires VCC−0.8 V, exceeding the bipolar 8284A's 4 V minimum high output; the clock-generator warning is justified. |

## d099 — https://www.renesas.com/us/en/document/dst/82c84a-datasheet

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 188 | clk8284 (pc5150, xt5160, portable5155, pcjr) → 82C84A (Intersil) | 82C84A vs8284A | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 414–418; [d099](<https://www.renesas.com/us/en/document/dst/82c84a-datasheet>) PDF 1,5,7–8 | The DIP-18 maps agree. Intersil specifies a 2.4–25 MHz crystal range and CMOS clock-output swing, supporting use with 80C88. |

## d100 — https://www.renesas.com/us/en/document/dst/82c88-datasheet

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 189 | bus8288 (pc5150, xt5160, portable5155) → 82C88 (Intersil) | 82C88 CLK2 | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) 8288sheet; [d100](<https://www.renesas.com/us/en/document/dst/82c88-datasheet>) PDF 1,5 | Intersil states bipolar 8288 compatibility and supplies matching DIP-20 terminals. CLK minimum VIH = VCC−0.8 V supports the TTL-clock caveat. |

## d101 — https://www.renesas.com/us/en/document/dst/82c59a-datasheet

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 191 | pic8259 (pc5150, xt5160, portable5155, pcjr) → 82C59A (Intersil) | 82C59A vs8259A | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 144–145; [d101](<https://www.renesas.com/us/en/document/dst/82c59a-datasheet>) PDF 1–2 | Renesas states pin compatibility with NMOS 8259A and lists 5/8/12.5 MHz versions. The two DIP-28 terminal maps agree. |

## d102 — https://www.renesas.com/us/en/document/dst/82c54-datasheet

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 193 | pit8253 (pc5150, xt5160, portable5155, pcjr) → 82C54 (Intersil) | 8253→82C54 | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 669,680; [d102](<https://www.renesas.com/us/en/document/dst/82c54-datasheet>) PDF 1 | The CMOS sheet identifies enhanced 8253/NMOS 8254 compatibility, TTL interface levels and 8/10/12 MHz grades. Its DIP-24 map agrees. |

## d103 — https://www.renesas.com/us/en/document/dst/82c55a-datasheet

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 196 | ppi8255 (pc5150, xt5160, portable5155, pcjr, cpc464, cpc664, cpc6128, msx1, msx2) → 82C55A (Intersil) | PortB18–25;PortC10–17 | WRONG (medium) | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) 8255A sheet; [d103](<https://www.renesas.com/us/en/document/dst/82c55a-datasheet>) PDF 3,5,18 | Pin compatibility is supported, but 'an open input holds its last level' overgeneralizes Port A behavior. Intersil specifies bus-hold high only for Port B; the Port B/C diagram shows pullups. Low-state retention is not specified for every port. |

## d104 — https://www.renesas.com/us/en/document/dst/82c37a-datasheet

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 198 | dma8237 (pc5150, xt5160, portable5155) → 82C37A-5 (Intersil) | 82C37A-5 clock12 | CONFIRMED | [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 112–114; [d104](<https://www.renesas.com/us/en/document/dst/82c37a-datasheet>) PDF 1–4,16 | The CMOS sheet explicitly gives 8237A pin compatibility, DC–5 MHz for -5 and CLK VIH = VCC−0.8 V, agreeing with the note. |

## d105 — https://minuszerodegrees.net/npu/8087.htm

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 199 | fpu8087 (pc5150, xt5160, portable5155) → 8087, 8087-2 or 8087-1 | 8087 speedgrade/SW1-2 | UNVERIFIABLE | [d105](<https://minuszerodegrees.net/npu/8087.htm>) Speed rating / Switch change (recovered via web); [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 355–357 (printed 3-175/177) | Silent on separate grade electrical limits: the primary reference explicitly lists plain 5 MHz, -2 at 8 MHz, -1 at 10 MHz, rejects C8087 4MHZ and requires SW1-2 OFF. Intel's recovered 8087-3 sheet supplies the family pin map, but not separate -1/-2 specifications for a full two-part comparison. |

## d106 — https://bitsavers.org/components/motorola/_dataSheets/6845.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 200 | crtc6845 (pc5150, xt5160, portable5155, pcjr, cpc464, cpc664, cpc6128, bbcb, bbcmaster) | 21 CLK;39 HS probeexamples | WRONG (low) | [d106](<https://bitsavers.org/components/motorola/_dataSheets/6845.pdf>) PDF 1,8–9; [d177](<https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf>) PDF 24–25,32 | The generic pin map/edge functions agree, but 'from the card dot counter' on pin 21 is board-specific: BBC Master supplies 1/2 MHz from VIDPROC. MDA/CGA examples on pin 39 are explicitly scoped, yet also fail the requested neutral-text boundary. |

## d108 — https://bitsavers.org/components/hitachi/_dataSheets/HLN014_HD46505R_CRT_Controller_Users_Manual.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 201 | crtc6845 (pc5150, xt5160, portable5155, pcjr, cpc464, cpc664, cpc6128, bbcb, bbcmaster) → HD46505R (Hitachi) | MC6845→HD46505R,1–40 | CONFIRMED | [d106](<https://bitsavers.org/components/motorola/_dataSheets/6845.pdf>) PDF 1; [d108](<https://bitsavers.org/components/hitachi/_dataSheets/HLN014_HD46505R_CRT_Controller_Users_Manual.pdf>) PDF 10,22 | Motorola and Hitachi DIP-40 maps agree. Hitachi specifies TTL levels and a 3 MHz character clock. Character-clock and CPU-enable speed limits remain distinct in the note. |

## d109 — https://bitsavers.org/components/rockwell/R6545-1_CRT_Controller_DataSheet_Dec1980.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 202 | crtc6845 (pc5150, xt5160, portable5155, pcjr, cpc464, cpc664, cpc6128, bbcb, bbcmaster) → R6545-1 (Rockwell) | MC6845→R6545-1 | CONFIRMED | [d106](<https://bitsavers.org/components/motorola/_dataSheets/6845.pdf>) PDF 1,8–9; [d109](<https://bitsavers.org/components/rockwell/R6545-1_CRT_Controller_DataSheet_Dec1980.pdf>) PDF 1–3 rendered | Rockwell states MC6845 pin compatibility. Its sheet confirms non-interlace, R8 mode differences, programmable VS width and a status register. 1P/1C grades are 1 MHz versus 1AP/1AC at 2 MHz. The note correctly warns that pin compatibility does not ensure the same picture. |

## d110 — https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 203 | crtc6845 (pc5150, xt5160, portable5155, pcjr, cpc464, cpc664, cpc6128, bbcb, bbcmaster) → HD6845S (Hitachi) or UM6845 (UMC) | HD6845S/UM6845 | UNVERIFIABLE | [d110](<https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC>) blocked; recoveredCPCWikiCRTCtypes; [d106](<https://bitsavers.org/components/motorola/_dataSheets/6845.pdf>) original | Silent on every named substitute's limits: recovered CPCWiki identifies type 0, and Hitachi HD6845S is documented, but no independent UMC UM6845 electrical datasheet was recovered. The archived citation is blocked. |
| 204 | crtc6845 (pc5150, xt5160, portable5155, pcjr, cpc464, cpc664, cpc6128, bbcb, bbcmaster) → UM6845R (UMC) | UM6845R | UNVERIFIABLE | [d110](<https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC>) blocked; recoveredoldwikiCRTCstatussection | Silent on complete electrical equivalence: recovered CPCWiki confirms type 1 and status at BExx, but an independent UM6845R datasheet was not accessible. The archived citation is blocked. |
| 205 | crtc6845 (pc5150, xt5160, portable5155, pcjr, cpc464, cpc664, cpc6128, bbcb, bbcmaster) → MC6845 (Motorola) | MC6845 type2 | CONFIRMED | [d106](<https://bitsavers.org/components/motorola/_dataSheets/6845.pdf>) PDF 1,8–9; recoveredCPCWikiCRTCtypes | This is a same-Motorola-part donor claim. Recovered CPCWiki lists MC6845 as type 2 and the integrated AMS40489/AMS40226 as types 3/4. The socketed-part qualification agrees. |
| 206 | crtc6845 (pc5150, xt5160, portable5155, pcjr, cpc464, cpc664, cpc6128, bbcb, bbcmaster) → HD6345 (Hitachi CRTC-II) | HD6345vsHD6845S | CONFIRMED | [d184](<https://www.farnell.com/datasheets/66151.pdf>) PDF 1–2; [d188](<https://datasheets.pl/elementy_czynne/IC/HD/HD6845S.pdf>) PDF 1 (pin map); [d106](<https://bitsavers.org/components/motorola/_dataSheets/6845.pdf>) PDF 1; recovered CPCWiki CRTC-II | Hitachi explicitly states HD6345 pin/software upward compatibility with HD6845S. Both DIP-40 maps agree with each other and MC6845; HD6345 is the 6800-bus version, using +5 V. The note distinguishes this enhanced controller rather than claiming HD6445 compatibility. |

## d111 — https://minuszerodegrees.net/5160/ram/5160_ram_256_640.htm

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 207 | dram41256 (xt5160) → HM50256, TMS4256 and other 41256s | HM50256/TMS4256,1–16 | CONFIRMED | [d084](<https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf>) PDF 221–222; [d014](<http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf>) PDF 103–104; recoveredMZD256–640KBpage | Hitachi/TI DIP-16 maps agree, including A8 on 1, VCC8, VSS16 and 256-row refresh. The IBM repair reference explicitly requires 200 ns or faster for the 41256 banks. |

## d112 — https://minuszerodegrees.net/5160/motherboard/5160_motherboard_revisions.htm

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 208 | dram41256 (xt5160) → 41256 on an IBM 5160 64-256KB board | U84 required;U44 1/8;E2 1/2 | WRONG (medium) | [minuszerodegrees motherboard Note 1](<https://minuszerodegrees.net/5160/motherboard/5160_motherboard_revisions.htm>); [linked Upgrading and Repairing PCs](<https://www.minuszerodegrees.net/5160/motherboard/5160_upgrading_256k_motherboard_to_640k.pdf>), printed 521–523 (PDF 1–3), step 2 | Banks 0/1 and the E2/U44 jumper are correct but incomplete. The linked procedure explicitly requires fitting a 74LS158 multiplexer at U84 to address the 41256s. It also specifies SW1-3/4 OFF and removal of overlapping memory cards. |

## d113 — https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Gate_Array_and_ASIC_Pin-Outs

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 209 | ga40007 (cpc464) → Amstrad 40008 | 40007→40008 | UNVERIFIABLE | [d113](<https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Gate_Array_and_ASIC_Pin-Outs>) blocked; recoveredCPCWikiGateArraypinouts; [d169](<https://archive.org/details/amstrad-cpc-464-micro-computer-ctm-640-color-monitor-gt-64-green-monitor-service-manual/page/n12>) | Silent on the full two-part comparison: recovered CPCWiki calls 40008 pin-compatible with 40007 and says both need heatsinks, unlike 40010. No independent 40008 manufacturer pin/electrical datasheet was recovered; the archive URL is blocked. |

## d114 — https://ww1.microchip.com/downloads/en/DeviceDoc/11001N.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 211 | rom23256 (cpc464, cpc664, cpc6128, c1571, c1581, electron, msx1) → 27256 / 27C256 EPROM | 23256→27256/27C256;1 VPP | UNVERIFIABLE | [d114](<https://ww1.microchip.com/downloads/en/DeviceDoc/11001N.pdf>) PDF 1–2; [d171](<https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n16>)/[d172](<https://archive.org/details/amstrad-cpc-664-service-manual/page/n17>) schematics/parts | Silent on the whole multi-machine claim: the EPROM read VPP range and CPC mask-ROM application are supported. No original 23256 manufacturer datasheet covering every listed brand, or NMOS 27256 sheet, was recovered. |

## d115 — https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/765_FDC

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 212 | fdc765 (cpc664, cpc6128) → Intel 8272A / UMC UM8272A | uPD765A→8272A/UM8272A | UNVERIFIABLE | [d174](<https://bitsavers.org/components/nec/_dataSheets/uPD765_Data_Sheet_Dec78.pdf>) NECsheet; [d095](<https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf>) PDF 754–756; recoveredCPCWiki765FDC | Silent on one named alternative: NEC/Intel DIP-40 maps and the CPC 4 MHz clock agree. The independent UMC UM8272A datasheet could not be retrieved, so the full replacement list remains unverified. |
| 213 | fdc765 (cpc664, cpc6128) → NEC uPD765AC-2 / Zilog Z765A | uPD765AC-2/Z765A | UNVERIFIABLE | [d174](<https://bitsavers.org/components/nec/_dataSheets/uPD765_Data_Sheet_Dec78.pdf>) NECsheet; recoveredCPCWiki765FDC ChipVariants | Silent on the separate variants' limits: recovered CPCWiki lists the CPC parts, but independent NEC AC-2 and Zilog Z765A datasheets were not recovered. Board photos/part names do not complete electrical comparison. |

## d116 — https://beebwiki.mdfs.net/Video_ULA

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 214 | vidproc (bbcb, bbcmaster) → VLSI VC2069 VIDPROC | 5C094→VC2069 | UNVERIFIABLE | [d116](<https://beebwiki.mdfs.net/Video_ULA>) introduction/pinout; [d177](<https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf>) MasterVIDPROCsection | Silent on an independent two-part comparison: BeebWiki calls VC2069 physically/functionally compatible and gives part 201647; the Master manual shows VIDPROC signals. Separate VC2069 and Ferranti manufacturer datasheets were not recovered. |
| 215 | vidproc (bbcb, bbcmaster) → VLSI VC2023 VIDPROC | 5C094→VC2023 patch | UNVERIFIABLE | [d116](<https://beebwiki.mdfs.net/Video_ULA>) introduction | Silent on adapter wiring: BeebWiki states that early VC2023 needs a motherboard patch wire, but provides neither the patch net nor a VC2023 datasheet. The necessary rework cannot be verified. |

## d117 — https://beebwiki.mdfs.net/Serial_ULA

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 216 | serproc (bbcb, bbcmaster) → VLSI VC2026 SERPROC | 2C199→VC2026 | UNVERIFIABLE | [d117](<https://beebwiki.mdfs.net/Serial_ULA>) introduction/SERPROCextension | Silent on a full two-part comparison: BeebWiki confirms the physical interface and bit-3 cassette-tone exception with the named programs. Both manufacturer datasheets were not recovered. |

## d118 — https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_BBCSMOct85_Sec1.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 217 | serproc (bbcb, bbcmaster) → Ferranti 2C199E, -3 or -7 | 2C199E/-3/-7;pin15 R75 | UNVERIFIABLE | [d118](<https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_BBCSMOct85_Sec1.pdf>) PDF 51 printed41 | Silent on all variant limits: Acorn confirms R75 = 100 kΩ/56 kΩ for E/-3 and 82 kΩ for -7, but separate Ferranti revision datasheets were not recovered. The resistor advice is supported; complete pin/electrical equivalence is not established. |

## d119 — http://www.bitsavers.org/components/philips/_dataBooks/1979_Philips_Semiconductors_and_Integrated_Circuits_Part_6b_ICs_for_Digital_Systems_in_Radio_and_TV.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 218 | saa5050 (bbcb, bbcmaster) → SAA5051 / SAA5052 | SAA5050→5051/5052;1–28 | CONFIRMED | [d119](<http://www.bitsavers.org/components/philips/_dataBooks/1979_Philips_Semiconductors_and_Integrated_Circuits_Part_6b_ICs_for_Digital_Systems_in_Radio_and_TV.pdf>) PDF 180–181,192,194–195 rendered | Philips says 5051 is identical except for its German font. The 5050/5052 terminal lists match all 28 pins and their +5 V/85 mA specifications. The Swedish-font qualification agrees. |

## d120 — https://chrisacorns.computinghistory.org.uk/docs/Acorn/Tech/Acorn_1770DiscIFUpgradeKit.pdf

| Index i | Record | Pin / scope | Decision | Source page checked | Evidence |
|---:|---|---|---|---|---|
| 220 | fdc8271 (bbcb) → Acorn 1770 Disc Interface Module (kit 0433,050) | 8271IC78→1770module;IC86 1/4 | CONFIRMED | [d120](<https://chrisacorns.computinghistory.org.uk/docs/Acorn/Tech/Acorn_1770DiscIFUpgradeKit.pdf>) PDF 8–9 printed6–7; [d178](<http://www.bitsavers.org/components/intel/_dataBooks/1979_Intel_Peripheral_Design_Handbook.pdf>) 8271sheet | Acorn's factory kit instructions specify IC78, cutting S9, removing IC86 LS393 and linking pins 1–4, with board-issue conditions. The claimed replacement is the adapter module, whose installation matches those instructions, rather than a bare WD1770. |

## Coverage reconciliation

Input indices and ledger indices are identical. Every item has one decision. No unchecked or duplicate item remains. Counts: {'checked': 141, 'confirmed': 79, 'wrong': 12, 'unverifiable': 50}.

Finding mappings: boundary-discipline covers chip/board wiring and electrical interfaces; foundational-thinking covers revision-dependent clocks, replacement completeness and geometry conventions; redesign-from-first-principles covers keeping device functions separate from machine-specific probe instructions. These labels identify factual boundaries, not code-change recommendations.

See [source-index.md](source-index.md) for retrieval failures, recoveries and wrong page anchors.
