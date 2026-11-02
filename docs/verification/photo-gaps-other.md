# Board photo gaps: non-Commodore machines

Date: 2026-11-02. Data: `src/data/photos.js`. Chip records and machine chip lists: `src/data/apple.js`, `atari.js`, `coleco.js`, `sinclair.js`, `timex.js`, `dragon.js`, `ibm.js`, `tandy.js`. Images: `photos/`. Crops and scripts: `.tmp/gaps-other/`.

## Scope and counts

- The brief says 16 photos. The file has 15 non-Commodore entries (one each for apple2, apple2e, apple2c, atari800, atari800xl, colecovision, spectrum, zx81, ts1000, dragon32, pc5150, xt5160, portable5155, pcjr, model1). This report covers all 15.
- Gap types: **(a)** chip id already in the machine's `chips` list, visible, not boxed (includes second instances). **(b)** non-jellybean chip with no chip record, or a record not in the machine's list.
- Jellybean parts (74xx, 4000 CMOS, 555/556, 1488/1489, op-amps, regulators, discretes) are not gaps and are listed per photo.
- Designators come from the silkscreen where legible. Where a designator is not legible, the table says so, and a designator from the data files (Sams Computerfacts via `apple.js`, `ibm.js`) is marked as such.
- No primary layout drawing was fetched for this pass. Where a chip id is "likely" or "unsure", that is because the function or pinout is inferred from the marking and the data files, not confirmed against a drawing.
- Box coordinates are approximate fractions read from crops; they are not yet overlaid on the photo.

## Summary

| Machine | (a) gaps | (b) gaps | Notes |
|---|---|---|---|
| apple2 | 0 | 1 | 2513 character ROM |
| apple2e | 0 | 5 | CF ROM, keyboard ROM, video ROM, timing HAL, 64K x 4 RAMs |
| apple2c | 0 | 4 | 16 DRAMs, keyboard ROM, video ROM, keyboard encoder |
| atari800 | 0 | 0 | motherboard only |
| atari800xl | 0 | 1 | unidentified 24-pin ROM at U4 |
| colecovision | 1 | 0 | second 74LS138 (U5) |
| spectrum | 0 | 1 | LM1889N modulator (IC14) |
| zx81 | 1 | 0 | 24-pin RAM at IC4, not a 2114 |
| ts1000 | 0 | 0 | all visible chips boxed |
| dragon32 | 1 | 1 | second PIA (IC35); LM1889N modulator |
| pc5150 | 0 | 1 | five 8K BIOS and BASIC ROMs |
| xt5160 | 0 | 1 | two 24-pin ROMs |
| portable5155 | 0 | 3 | HY53C256 banks 0-1; two ROMs |
| pcjr | 1 | 5 | video GA candidate; custom IBM 1503723; INS8250; 8 DRAMs; two ROMs |
| model1 | 0 | 0 | none confirmed |
| **Total** | **4** | **23** | 27 gap entries |

Of the 27 entries, 2 are proven (colecovision U5, dragon32 IC35). The rest are likely or unsure, as marked.

New chip types needed (no record yet):
- `rom2513`: Apple II 2513 character generator ROM (apple2).
- `hal-timing-iie`: IIe timing HAL, HAL16R8CN, 342-0170-A (PAL, apple2e).
- `uart8250`: National INS8250 ACE (pcjr).
- `pcjr-ic1503723`: IBM custom 40-pin part, function not identified (pcjr).
- `lm1889`: LM1889N video/RF modulator IC (spectrum, dragon32).
- `rom-xl-u4`: unidentified 24-pin ROM on the 800XL (atari800xl), only if confirmed as a ROM.

Existing records that need adding to machine lists (no new record):
- `rom27128`, `rom2316`, `rom2332` for apple2e and apple2c.
- `dram4464` for apple2e; `dram4164` for apple2c and pcjr.
- `kbd3600` for apple2c.
- `rom2364` for pc5150, xt5160, portable5155, pcjr.
- `rom23256` for portable5155, pcjr.
- `dram41256` for portable5155.

## apple2 (photo: apple2-mainboard.webp)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (b) 2513 character generator ROM | not legible; row A, about column 4-5 by grid | "RO-3-2513 CGR-001 / 7850U / TAIWAN" | NEW: rom2513 (Apple II char gen) | [0.295, 0.908, 0.122, 0.061] | Legible silkscreen and marking. The video string in `apple.js` says "2513 character ROM" but no chip record exists. | proven (marking); likely (location) |

Visible but not a gap (jellybean or already boxed):
- 6502 (boxed cpu6502). DRAM rows C, D, E: 24 x 4116 under one box (boxed).
- ROM-F8, F0, E8, E0, D8, D0 under one rom2316 box (boxed).
- 74LS and 74 family logic: 08, 00, 02, 74, 138, 139, 153, 154, 157, 166, 175, 194, 244, 251, 257, 283, 32, 74166.
- 8T97 and 8T28 bus drivers (logic family, treated as jellybean).
- 9334 latch, 74LS.

Hidden or empty:
- KEYBOARD socket at A7 appears empty. The MM5740 is on the keyboard PCB (`kbd5740`).
- GAME I/O socket at top right appears empty.
- One unmarked black DIP at top right (around x 0.79, y 0.12): marking not legible; not classed.

## apple2e (photo: apple2e-820-0087.webp, 820-0087-C, 1986 enhanced, CF ROM and 64K x 4 board)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (b) CF ROM (combined CD+EF) | not legible; silk "CF ROM" (around row D, column 7-8) | "AMI 8628MAL / 342-0349-A / APPLE 80-85 / PHILIPPINES", 28 pins | rom27128 (existing; 16K, 28-pin) | [0.551, 0.643, 0.072, 0.119] | Silk label and marking. `schematics.js` says the enhcf board has one CF ROM replacing the CD and EF ROMs. Pin count 28 seen on the photo. The 16K size is inferred from that. | likely |
| (b) Keyboard ROM | UD16 per Sams CC10 (data file), silk "KEYBOARD ROM" | "AMI 8629MBR / 342-0132-D / APPLE 84", 24 pins | rom2316 (existing) | [0.784, 0.661, 0.068, 0.100] | Silk label and marking. `apple.js` says the IIe keyboard ROM is a 2316. | likely |
| (b) Video (character) ROM | not legible; silk "VIDEO ROM" (row F, column 4) | "GI 8637 CEA / 342-0265-A / APPLE 83 / TAIWAN", 24 pins | rom2332 (existing; size assumed 4K) | [0.307, 0.853, 0.070, 0.100] | Silk label and marking. `apple.js` lists enhanced video ROM 342-0265. Size is an assumption (24-pin). | likely (id), unsure (size) |
| (b) Timing HAL (PAL) | UD1 per Sams CC10 (data file); silk "HA1" beside it | "HAL16R8CN 8630 / 342-0170-A / APPLE", 20 pins | NEW: hal-timing-iie (HAL16R8 PAL) | [0.046, 0.599, 0.039, 0.081] | Marking. `apple.js` names the timing HAL as UD1. | likely |
| (b) 64K x 4 RAMs (two) | not legible; silk "64KX4 RAM" at columns 8 and 9 | "JAPAN 8638 / HM50464P-15" (partly legible) | dram4464 (existing; 64K x 4) | [0.586, 0.877, 0.081, 0.074] | Silk labels, marking, and `schematics.js` (enhcf: two 64K x 4 RAMs instead of the 4164 row). | likely |

Visible but not a gap (jellybean or already boxed):
- 65C02 (G65SC02P-2, boxed cpu6502). MMU 344-0010 (boxed mmu344). IOU 344-0020 (boxed iou344). KR9600-PRO keyboard encoder, AY-3600 type (boxed kbd3600).
- 74LS244, 245, 138, 154, 251, 374, 125, 166, 02, 153, 283, 153; 74F109; 74LS10 (S10); NE558 and MM741 (linear, treated as jellybean).
- RP1 and RP3 resistor packs.

Hidden or empty:
- Card and expansion slots show no cards.
- The 4164 row listed in `apple2e` is not on this board (replaced by the two 64K x 4 parts). `dram4164` is in the list but not visible here.
- TEST pad area: a 6-pad test point, not a chip.

## apple2c (photo: apple2c-820-0115.webp, 820-0115-C, 1983)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (b) 16 DRAMs (ARD0-ARD7, MRD0-MRD7) | silk labels ARD0-ARD7 and MRD0-MRD7 (legible) | "TMS4164-15NLJ" (ARD) and "TMS4164-20NLJ" (MRD) | dram4164 (existing; not in the IIc list) | [0.824, 0.256, 0.071, 0.669] | Silk labels and marking, all 16 legible. | proven (designators); likely (id) |
| (b) Keyboard ROM (MAP) | silk "MAP 342-0132" | "8436 G / C19767 / 342-0132-C / APPLE 82-84", 24 pins | rom2316 (existing) | [0.440, 0.760, 0.108, 0.047] | Marking and silk label. Same part number as the IIe keyboard ROM. | likely |
| (b) Video (character) ROM | silk "CHAR GEN" | "8428 G / C19732 / 342-0265-A / APPLE 83", 24 pins | rom2332 (existing; size assumed 4K) | [0.644, 0.255, 0.109, 0.046] | Silk label and marking. | likely (id), unsure (size) |
| (b) Keyboard encoder | silk "KR3600-PRO" and "ENC" | "AY-5-3600-PRO / PRO-050 / G1 / TAIWAN" | kbd3600 (existing; not in the IIc list) | [0.221, 0.756, 0.180, 0.050] | Marking. | proven (marking); likely (id) |

Visible but not a gap (jellybean or already boxed):
- 65SC02 CPU (boxed cpu6502). MMU 344-0011 (boxed mmu2c). IOU 344-0021 (boxed iou2c). IWM 344-0041 (boxed iwm344). TMG HAL16R8CN 341-0170-A (boxed tmg2c). GLU HAL20XACNS 341-0243-A (boxed glu2c). Two S6551 ACIAs (boxed acia6551).
- MC1488N and MC1489N (RS-232, jellybean), NE556N, LM311, 555, 74LS32, 74LS374, 74LS245, 74LS166 (CD74HC166E), CD74HCT125, CD74HC? (RCA), 74LS251, 74LS? and 7905 regulator.
- Crystal oscillators and the CRL8432L potted module (not chips).

Hidden or empty:
- The firmware ROM (IIc ROM 255/0/3) is not on the board; "ROM 3" is a hand-written note near the bottom left.
- Power supply block, RF, and the mouse/paddle connectors: not chips.

## atari800 (photo: atari800-motherboard.webp, motherboard only)

No gaps.

Visible but not a gap:
- POKEY (boxed pokey) and 6520 PIA (boxed pia6520).
- 74LS245 (TI SN74LS245-ITALY) near the centre, and two 14-pin chips (around x 0.41-0.44, y 0.67-0.71) whose markings are not legible. Treated as logic, not classed.
- CMOS 14-pin chip near the upper right; treated as 4000 series.

Hidden or empty:
- CPU, ANTIC, GTIA, RAM and OS ROM are on plug-in cards not shown. The card cage covers the top half.

## atari800xl (photo: atari800xl-mainboard.webp, PAL, Taiwan build)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (b) Unidentified 24-pin ROM | silk "U4" beside it | "AMI 8442ML / C024947A-01 / (C) 1979 ATARI / KOREA" | NEW: rom-xl-u4, only if confirmed as a ROM (function not identified) | [0.693, 0.312, 0.077, 0.063] | Marking and silk label. "1979 ATARI" date on an XL board is odd. The part is probably a ROM but this is not confirmed. | unsure |

Visible but not a gap:
- GTIA (U17, boxed gtia), ANTIC (U7, boxed antic), CPU 6502C (U8, boxed cpu6502c), POKEY (U22, boxed pokey), PIA 6520 (U23, boxed pia6520), MMU PAL16L8A "C061618" (U5, boxed mmu61618).
- Eight MT4264-15 DRAMs at left (boxed under dram4164). These are 64K x 4 parts, the same class as the IIe 4464s. Observation only: the id `dram4164` is not the best match.
- 74LS and 74LS157, 74LS245, 74LS139 and similar: jellybean.
- Two KOYO potted modules (C016112, C016601) near the left centre: not chips as far as can be told; not classed.

Hidden or empty:
- The RF modulator (LUNGHWA) is a module. FREDDIE is absent (74LS158 multiplexers instead).

## colecovision (photo: colecovision-75743.webp, PCB 75743 Rev H2-1)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (a) Second 74LS138 | U5 (silk legible) | "74LS138N / V8312" | ls138 (in list; boxed only at U6) | [0.781, 0.607, 0.035, 0.107] | Silk label and marking. The brief's note already says U5 is "below the Z80". | proven |

Visible but not a gap:
- 8 x 4116 DRAMs (boxed under dram4116). Z80A (boxed cpuz80). TMS9928A VDP under heatsink (boxed vdp9918). SN76489AN (boxed psg76489). ROM (93640-020, GI; boxed rom9464-cv). Two 2114s (boxed sram2114). 74LS541 U18 and U19 (boxed ls-controller).
- 74LS00, 74LS04, 74LS05, 74LS74, 74LS138 (U6, boxed) and similar: jellybean.

Hidden or empty:
- Power and video connectors: not chips.

## spectrum (photo: spectrum-issue4b.webp, Issue 4B)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (b) LM1889N video/RF modulator | IC14 (silk legible) | "=S8428 / LM1889N" | NEW: lm1889 (video/RF modulator IC) | [0.170, 0.340, 0.040, 0.150] | Marking and silk label. Function (video modulator) is the usual use of LM1889, not checked against the Sinclair part list. Box is approximate. | proven (marking, designator); likely (function) |

Visible but not a gap:
- Ferranti ULA 6C001E-7 (boxed ula_spectrum). Z80A (boxed cpuz80). ROM 23128 IC5 (boxed rom23128). 8 x 4116 (boxed dram4116). 8 x 3732 (4532 class, boxed dram4532).
- 74HCT157 (IC25), 74HCT00 (IC24), 74LS32 (IC23): jellybean.
- 7805 regulator (top right) and the ASTEC UM1233 modulator (module): not chips.

Hidden or empty:
- A shield covers the top middle of the board. Anything under it is not visible.
- XB1 and XB2 black connectors: not chips.

## zx81 (photo: zx81-mainboard.webp, issue not stated)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (a) 24-pin RAM in the IC4 area | not legible; IC4b site beside it is empty | Marking not legible (blurred) | sram2114 (in list; part is a 24-pin RAM, not a 2114, so the id is a placeholder) | [0.709, 0.388, 0.079, 0.189] | Position and pin count only. The photos.js note says a single 24-pin RAM is fitted in place of the 2114 pair. | unsure |

Visible but not a gap:
- Ferranti ULA 2C184E (boxed ula_zx81). NEC D780C-1 Z80A (boxed cpuz80). NEC D2364C ROM (boxed rom_zx81).
- 7805 regulator (jellybean), 74LS-type silk labels only.

Hidden or empty:
- IC4b (outlined empty site beside the RAM): empty.
- ASTEC modulator module and keyboard connector: not chips.

## ts1000 (photo: ts1000-mainboard.webp)

No gaps.

Visible and boxed: Ferranti ULA 2C210E (ula_zx81), Z80A 8306 (cpuz80), ZCM38818P ROM (rom_zx81), NEC D4016 RAM at IC4 (sram6116).

Hidden or empty:
- IC4A and IC4B sites (outlined): empty.
- Regulator (L7805CV) and ASTEC modulator: not chips.

## dragon32 (photo: dragon32-pc10087.webp, SA2120 Mk II, PC10087 issue 5)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (a) Second PIA | IC35 (silk legible) | "MC6821P / M8N / 8304" | pia6821 (in list; boxed only at IC26) | [0.846, 0.628, 0.049, 0.298] | Silk label and marking. The brief's note already says IC35 is at the right edge. | proven |
| (b) LM1889N video/RF modulator | not legible | "LM1889N / 88250" | NEW: lm1889 | [0.160, 0.182, 0.039, 0.131] | Marking. Function (video modulator) is the usual use of LM1889, not checked. | proven (marking); likely (function) |

Visible but not a gap:
- MC6847 VDG (boxed vdg6847). SAM 74LS783 (boxed sam6883). MC6809EP (boxed cpu6809e). 16 x MK4116 in two rows (boxed dram4116). MC14529BCP (boxed mux14529; the box is on the left-side chip, which is the 4529 as read). BASIC ROMs IC17 and IC18 (boxed under one box; the box ends about 20 px short of IC18's right edge, observation only).
- MC14050BCP (IC34), 74LS02, 74LS20, 74LS32, 74LS138, 74LS390, 74LS393, 74LS240-series, 74LS373: jellybean.
- MC1408 DAC: not seen on this board.

Hidden or empty:
- Crystal oscillator, relays and the RF shield: not chips.

## pc5150 (photo: pc5150-16-64kb.webp, 16/64 KB system board)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (b) Five 8K ROMs (BIOS and cassette BASIC) | U29-U33 per `ibm.js` (BIOS at U33; cassette BASIC at U29-U32). Silk not fully legible. | "MK36708 / 5700051", "5700043", "5700035 IBM 1981 XE 8137D-N-M", "5700027 IBM 1981 XE 8135E-N-M", "MK36708 / 5700019" | rom2364 (existing; 8K x 8) | [0.528, 0.397, 0.097, 0.405] | Marking and the data-file designators. One box covers all five. | likely (id); designators from data file |

Visible but not a gap:
- 8088 (boxed cpu8088), 8284 (boxed clk8284), 8288 (boxed bus8288), 8259 (boxed pic8259), 8253 (boxed pit8253), 8255 (boxed ppi8255), 8237 (boxed dma8237), 16 x AM9016 (4116 type; boxed dram4116).
- 74LS-series and 74S-series logic; Beckman resistor networks; PE-21199 delay line (passive).

Hidden or empty:
- Bottom ROM socket (around x 0.53-0.63, y 0.82-0.91) appears empty.
- 8087 socket U4 is empty (per photos.js).

## xt5160 (photo: xt5160-64-256kb.webp, 64-256 KB system board)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (b) ROM A | not legible (silk "U25" nearby belongs to the 8259) | "AMI 8535MA8 / 6359116 / (C) IBM 1983 / PHILIPPINES", 24 pins | rom2364 (existing; 8K assumed) | [0.358, 0.071, 0.120, 0.071] | Marking. | likely (id) |
| (b) ROM B | not legible | "MK38036N-25 / 1601512 / DU / IBM CORP 1981,1983 / D IRELAND", 24 pins | rom2364 (existing; 8K assumed) | [0.358, 0.174, 0.120, 0.069] | Marking. | likely (id) |

Visible but not a gap:
- 8088 (boxed cpu8088), 8284 (boxed clk8284), 8288 (boxed bus8288), 8255 (boxed ppi8255), 8237 (boxed dma8237), 8253 (boxed pit8253), 8259 (boxed pic8259).
- 64 x DRAM (4164 class, and inmos IMS2600P-15 parts; boxed under dram4164 in four banks).
- AM25LS22PC (logic), 74LS, 74S and Portugal logic parts; Beckman and BI resistor networks.

Hidden or empty:
- 8087 socket appears empty.
- Keyboard/power connectors: not chips.

## portable5155 (photo: portable5155-64-256kb.webp, 64-256 KB system board)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (b) HY53C256 256K DRAMs, banks 0-1 (18 chips) | silk BANK 0 and BANK 1 | "HY53C256LS-10 / 8914A / KOREA" | dram41256 (existing; 256K x 1; only loc xt5160) | [0.586, 0.458, 0.138, 0.384] | Marking and silk labels. The current `dram4164` box covers banks 2-3 only. | likely |
| (b) ROM U19 (24-pin) | silk "U19" nearby | "AMD 8507MAE? / 8199116 / (C) IBM 1983 / PHILIPPINES" (partly legible) | rom2364 (existing; 8K assumed) | [0.393, 0.207, 0.092, 0.040] | Marking; same family as the XT ROM A. | likely (id), unsure (designator) |
| (b) ROM, 28-pin 32K | silk "U29" nearby | "T1501512 / 8510AAA / TMM23256P / IBM CORP" | rom23256 (existing; 32K) | [0.388, 0.265, 0.092, 0.053] | Marking. | likely |

Observation (not a gap): the clk8284 box [0.128, 0.316, 0.048, 0.032] does not sit on the chip labeled "SP8508" at about [0.207, 0.325, 0.080, 0.020]. The identity of SP8508 is not confirmed (it may be the 8284). Check the box placement before the next data pass.

Visible but not a gap:
- 8088 (boxed cpu8088), 8288 (boxed bus8288), 8255 (boxed ppi8255), 8237 (boxed dma8237), 8253 (boxed pit8253), 8259 (boxed pic8259).
- AM25LS22PC (logic). 74LS, 74F158 and 74LS245 parts: jellybean.
- PE-21199A delay line (passive).

Hidden or empty:
- U4 (8087 socket) is empty: the dark socket above the CPU.
- Banks 2-3 D4164C parts are boxed under dram4164.

## pcjr (photo: pcjr-mainboard.webp)

| Gap | Designator | Part marking | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| (a) Video gate array candidate | not legible; photos.js note says the 40-pin 1503730 is a candidate | "1503730 / L1A0091 / CAA 8434 / IBM CORP 1983" | pcjr_ga (in list; unboxed) | [0.216, 0.437, 0.150, 0.053] | Marking and the existing note. Identity not confirmed against an IBM drawing. | unsure |
| (b) Custom IBM 40-pin part | not legible | "IBM 1503723 / XE / 8427B NM / IBM 1983" | NEW: pcjr-ic1503723 (function not identified) | [0.316, 0.764, 0.095, 0.057] | Marking only. | unsure (function) |
| (b) INS8250N UART | not legible | "INS8250N / S/B8420 / National" | NEW: uart8250 | [0.153, 0.210, 0.149, 0.049] | Marking. | proven (marking) |
| (b) Eight 4164-class DRAMs (lower left) | not legible | "AMK4164ANP-15" (upside down; partly legible) | dram4164 (existing; not in the pcjr list) | [0.041, 0.748, 0.153, 0.170] | Marking. The 4164 class is read from the marking. | likely |
| (b) Mask ROM (24-pin) | not legible | "MK38050N-25 / ZA / IBM CORP 1981,1983 / D MALAYSIA" | rom2364 (existing; 8K assumed) | [0.556, 0.673, 0.110, 0.055] | Marking. | likely (id) |
| (b) Mask ROM (28-pin, 32K) | not legible | "T1504037 31 JAPAN / TMM23256P-5833 / IBM CORP 1981-1983" | rom23256 (existing; 32K) | [0.556, 0.752, 0.110, 0.057] | Marking. | likely |

Visible but not a gap:
- 8088 (boxed cpu8088), 8284A (boxed clk8284), 8259A (boxed pic8259), 8253-5 (boxed pit8253), 8255A-5 (boxed ppi8255), MC6845P (boxed crtc6845), SN76496N (boxed sn76496).
- MC14529BCP (CMOS 4000 series, jellybean). 74LS and 74S logic, SN74LS245, DM74S00, DM74LS? and similar. NE556 and MC1488 (linear, jellybean).
- PE-2121 delay line (passive).

Hidden or empty:
- Cartridge and sidecar connectors: not chips.

## model1 (photo: model1-1700069.webp, CPU board 1700069)

No gaps confirmed.

Visible and boxed: Z80A Z40 (cpuz80), 4116 x8 Z13-Z20 (dram4116), MCM6670 Z29 (cg-mcm6670), 2102 Z45-Z48 (sram2102), ROM Z33/Z34 (rom-trs80-model1).

Unsure (not classed):
- Z71 and Z72: black chips with no legible marking. Could be 2102 or 74LS parts. Not classed.
- Z23 (right of centre): marking partly legible ("MM... 62"), not identified.
- Z61-Z63 are under the ribbon cable (not visible).

Visible but not a gap: 74LS and 74LS367 and 74LS157 and similar in rows Z21-Z76; 74LS00, 74LS04, 74LS74 (jellybean). Regulator (top centre, heatsink) and the 2N6594 power transistor: not chips.

Hidden or empty:
- Expansion Interface (FDC 1771) is not on this board.
- Keyboard ribbon cable covers the lower left.

## Observations (not gaps)

- atari800xl: the MT4264 DRAMs are boxed under `dram4164`. These are 64K x 4 parts. Consider `dram4464`.
- apple2e: the two 64K x 4 RAMs are a gap (see above). The dram4164 entry is in the list but no 4164 row is on this board.
- dragon32: the BASIC ROM box ends about 20 px short of IC18's right edge.
- portable5155: clk8284 box looks misplaced (see above).

## Not read or unsure

- Apple II top-right unmarked chip (around x 0.79, y 0.12): not legible.
- Atari 800 two 14-pin chips (around x 0.41-0.44, y 0.67-0.71): not legible.
- Model I Z71, Z72 and Z23: not legible.
- Spectrum and Dragon LM1889 designator on the Dragon board: not legible.
- Designators for ROMs and DRAMs on the PC, XT, Portable and PCjr boards: taken from the silk where legible and from `ibm.js` for the PC 5150 only. Not verified against an IBM drawing.
- No web sources were fetched. The "likely" and "unsure" entries need a primary drawing or parts list before they go into `photos.js`.

## Resolution (2026-11-02)

Every box below was drawn on the photo with Pillow and checked by eye (`.tmp/gapfix-other/`). Sources were fetched and read for this pass. No Classic Repair Toolbox content was used. "Legible" means the designator or function label is readable on the photo itself.

### apple2

- **Added** `rom2513` at A5 [0.291, 0.917, 0.121, 0.050]. The silk label "2513" is legible over the chip, and the marking reads RO-3-2513 CGR-001. Position: Apple II Reference Manual (1979), p. 96 (archive.org page n106): "a type 2513 character generator at location A5".
- **New record** `rom2513` (apple.js). Pinout: General Instrument RO-3-2513 data sheet, GI ROM data book p. 3-44 (bitsavers `components/gi/_dataSheets/GI_ROMs.pdf`, PDF p. 44). The NC pins (1-3, 9, 12, 13, 23) carry `verify`. GI says the part replaces the Signetics 2513 pin for pin, but the Apple II socket wiring of those pins was not traced.
- **Rejected** the top-right chip (about x 0.79, y 0.12). Its marking is not legible, and no source found here places a non-jellybean part at that spot in row K. It is not boxed and stays unverified.

### apple2e (820-0087-C)

- **Added**, all placed by legible function labels on the board (CF ROM, KEYBOARD ROM, VIDEO ROM, 64KX4 RAM): `rom27128` (CF ROM 342-0349), `rom2316` (keyboard ROM 342-0132-D), `rom2732` (video ROM 342-0265-A) and `dram4464` (one box over both HM50464 RAMs).
- **Added** `hal-timing-iie` (HAL16R8CN 342-0170-A, silk "HAL" only). It is in `verify` because only the part marking places it.
- Sources: Apple IIe schematic 050-0051-D (mirrors.apple2.org.za). Sheet 2 has UE12 drawn as a 2716 keyboard ROM. Sheet 3 has UF4 drawn as a 2732 video ROM and UD1 as a PAL/HAL 16R8 342-0170. That drawing is for the 820-0064 board. No schematic of the 820-0087 CF ROM board was found, so the photo gives no designators. CF ROM size: MAME `apple2e.cpp` loads 342-0349 as 16 KB (0x4000). The Sams CC10 identification sheet 1.2.4 (scan p. 7) identifies the board by its CF ROM and 64K x 4 RAMs.
- `rom27128` and `dram4464` carry `chipBoards: ['enhcf']`. The CF ROM location text says its wiring is not checked against a 27128.
- **New record** `rom2732`. Its pinout is from the IBM PCjr Technical Reference, sheet 5 of 17, p. B-7 (ZM64 MK34000, all 24 pins). It matches UF4 on Apple sheet 3. A 2332 differs at pins 18, 20 and 21, so the audit's `rom2332` would have shown the wrong pinout.
- **New record** `hal-timing-iie`. Its pinout is from Apple sheet 3 (UD1, PDF p. 4). These pins carry `verify`: 2, 7 and 8 (input nets not legible), 17 (/PCAS, by elimination), 18 (no net drawn), and 10 and 20 (GND and VCC are not drawn; they follow the usual 16R8). Sams CC10 confirms PHI1 at pin 14, Q3 at pin 16 and /PRAS at pin 19.
- The existing testpoints now name HAL pins 1, 14, 15 and 16, so the clock check links them.

### apple2c (820-0115-C)

- **Added**, all by legible silk labels: `dram4164` as two boxes, ARD0-ARD7 and MRD0-MRD7 (TMS4164). Also `rom2316` (MAP, 342-0132-C), `rom2732` (CHAR GEN, 342-0265-A) and `kbd3600` (ENC, AY-5-3600-PRO).
- **Added** `rom23256`: the MON ROM, marked 23256 and 342-0033-A. The audit said the firmware ROM was not on the board. That is wrong: it is at bottom center, beside the hand-written "ROM 3".
- Designators come from schematic 050-0093-A (Asimov copy): UD16 2716 MAP and UB16 3600 PRO KEY (sheet 3/5), UE4 CHAR GEN drawn as a 28-pin 2732/2764 site (sheet 2/5), and UF4-UF11 as 6664 (sheet 2/5).

### atari800

- **Rejected.** The two "14-pin chips" are Z103 and Z104. Both designators and markings are legible: CD4051BE, RCA. They are 4000-series CMOS, so they are jellybean. The FSM text says they are the keyboard multiplexers (Atari 400/800 FSM May 1983, PDF p. 24).
- The chip at A104 is a TBA331 transistor array. The FSM parts list (PDF p. 196) gives "TRANSISTOR ARRAY A104". It is a discrete array, so it is not boxed.

### atari800xl

- **Added** `rom2364` at U4 (BASIC ROM, C024947A-01) and `rom27128` at U5 (OS ROM, C061598-29). Both designators are legible. The audit missed U5 entirely.
- Pinouts: 800XL FSM Rev 01 schematic (PDF p. 36). It draws U5 as a 16K x 8 27128 with VPP (pin 1) and PGM (pin 27) at +5 V, and U4 as an 8K x 8 BASIC ROM with A11 on pin 18, /CS on 20 and A12 on 21, which is the 2364 pinout.
- The audit's "C024947 is odd on an XL" concern is resolved: it is the BASIC ROM.
- **Rejected:** the claim that MT4264 is 64K x 4. MT4264 is a 64K x 1 part: eight chips make 64 KB, and the FSM memory section (PDF p. 17) says "eight 64K X 1 DRAMs". The `dram4164` box stays.
- Not boxed: U28 74LS75, the 4050 at U20, the 4000-series chip at U29, and the LM358. All are jellybean.

### colecovision

- **Done.** `ls138` now has two boxes with designators, U6 and U5. U5's silk and its 74LS138N marking are legible.

### spectrum

- **Rejected** the LM1889N at IC14. It is an RF/video modulator, which counts as jellybean under the brief. The note was not changed.

### zx81

- **Added** `sram4118` at IC4, in `verify`. The 24-pin RAM's marking is blurred. The ZX81 Service and Assembly Manual (transcribed, PDF pp. 2 and 7) names the 24-pin IC4 option as an MK4118. The site has links L1 and L2 beside it.
- **New record** `sram4118` (sinclair.js). Pinout: Mostek MK4118 data sheet, 1980 Mostek Memory Data Book p. VI-11 (bitsavers, PDF p. 156).
- `sram2114` stays in the machine list for 2114 boards.

### ts1000

- No change.

### dragon32

- **Done.** `pia6821` now has two boxes: IC26, and IC35 at the right edge. IC35's silk and its MC6821P marking are legible.
- **Fixed** the BASIC ROM box. It is now two boxes, IC17 and IC18 (both legible), and IC18's right edge is covered.
- **Rejected** the LM1889N. It is a modulator and so jellybean. The SA2120 Mk II drawing, sheet 3, shows it as IC9.

### pc5150

- **Added** `rom2364` as five boxes with legible designators: U33 (5700051, BIOS) and U32, U31, U30 and U29 (5700043, 5700035, 5700027 and 5700019, cassette BASIC). U28 is the empty spare socket.
- Pinout check: IBM PC Technical Reference 6025008, system board ROS sheet (PDF p. 312). It draws the 8K x 8 ROS with A11 on pin 18, /CS on 20 and A12 on 21, which matches the 2364.

### xt5160

- **Added** `rom23256` (1501512, MK38036N-25) and `rom2764` (6359116). Both are in `verify`: the U18 and U19 silk is not legible on this photo.
- Sources: XT Technical Reference 1502237 (Apr 1983), p. 1-5 (PDF p. 17): "Two module sockets ... One socket has 32K by 8 of ROM, the other 8K by 8", in 28-pin modules. Sheet 5 of 10 (PDF p. 472) draws U18 as 32K x 8, with pins 1 and 27 on A14.
- The audit's "24 pins" was wrong: both ROMs are 28-pin.
- **Added** `prom24s10` at U44. The silk U44 is legible, and the marking reads N82S129AN 6359123. The audit missed this chip.
- **New record** `prom24s10` (ibm.js). Pinout: XT TechRef sheet 3 of 10 (PDF p. 470) gives U44 as a 24S10. PCjr TechRef sheet 5 of 17 (PDF p. 505) adds VCC on pin 16 and GND on pin 8.

### portable5155

- **Fixed** `clk8284` to U1 at [0.151, 0.323, 0.056, 0.023]. The silk U1 is legible at the chip's lower left, under the left end of the CPU, and XT TechRef sheet 1 of 10 (PDF p. 468) shows U1 as the 8284A.
- The audit's guess that "SP8508" is the 8284 was not confirmed. That chip is a separate, longer National part to the right of U1. Only its date-code-style text is legible, so it stays unidentified and unboxed.
- **Added** `dram41256` over banks 0-1. The silk BANK 0/BANK 1 is legible and the RAMs are marked HY53C256LS-10.
- **Added** `rom2764` at U19 (6359116; U19 silk legible) and `rom23256` at U18 (T1501512 TMM23256P). U18 is in `verify` because its silk is not clearly legible.
- **Added** `prom24s10` at U44. The silk is legible but the marking is not.
- Two chips under blue stickers are hidden and are not gaps.

### pcjr

- Every position was proven against the component layout in the PCjr Technical Reference (Nov 1983), System Board sheet 17 of 17, p. B-19 (PDF p. 517). Part identities come from the logic sheets. `verify` is now empty, including the seven chips that were in it before.
- **Added** `pcjr_ga` at ZM36. The audit's "candidate" 1503730 is confirmed: sheet 4 of 17 (PDF p. 504) draws GATE ARRAY ZM36 with 40 pins. The record now has `pkg: 'DIP-40'`, a location and all 40 pins from that sheet, with pins 25 and 29 in `verify` because their descriptions are inferred. Its record-level `verify` was cleared.
- **Added** `uart8250` at ZM9 (sheet 8 of 17, PDF p. 508; INS8250N).
- **Added** `rom2732` at ZM64. The audit's "custom 40-pin 1503723" is wrong: it is a 24-pin character ROM. Sheet 5 of 17 draws ZM64 as an MK34000.
- **Added** `rom23256` as two boxes. XX1 is the MK38050N-25 (1504036) and ZM63 the TMM23256P (1504037). Sheet 2 of 17 (PDF p. 502) draws both as 28-pin MK38000 32K x 8. The audit's "24-pin" for the MK38050 was wrong.
- **Added** `dram4164`: ZM61, ZM62, ZM68, ZM69, ZM71, ZM72, ZM76 and ZM77 (sheet 4 of 17).
- **Added** `prom24s10` at ZM56 (TBP24S10N, sheet 5 of 17) and `prom28l22` at ZM52 (TBP28L22N, sheet 6 of 17, PDF p. 506). The audit missed both.
- **New record** `uart8250`. Pinout: XT TechRef 1502237, INS8250 Functional Pin Description, pp. 1-221 to 1-225 (PDF p. 233 on), cross-checked against PCjr sheet 8. Pin 29 is NC by elimination and carries `verify`.
- **New record** `prom28l22`. Pinout: PCjr sheet 6, all 20 pins drawn.
- The 8088, 8284A, 6845 and SN76496 designators were added to `chipLocations`: ZM40, ZM8, ZM21 and ZM20.
- New pcjr clocks: GA pin 2 is 14.31818 MHz (sheet 4). 8250 pin 16 is 1.7895 MHz (Serial Port, pp. 2-131 to 2-132, PDF p. 158). 8250 pin 15 is 16 x baud, 19.2 kHz at 1200 baud; that row is marked `verify`. The short names are now `GA` and `HAL` (one word each), so "<short> pin <n>" links.
- Jellybean, not boxed: MC14529, NE556, MC1488/1489, 74LS/74S logic and the PE-21212 delay line.

### model1

- **Rejected** all three. Z23 is a 74LS32: the photo marking ends in "LS32", and the TRS-80 Technical Reference Handbook (2nd ed.) text generates RD/WR/IN/OUT at Z23 with OR gates. Z71 is a DIP shunt ("Z71 is a DIP shunt", same handbook). Z72 is a 74LS367 buffer.
- Top center, Z1 and Z2 are 723 regulators, and Z3 is a DIP shunt. None of these are gaps.

### Records extended (not owned)

- No file outside the owned list was edited.
- `dram4164`, `rom2364`, `rom27128`, `rom2764`, `rom23256` and `dram4464` gained machines and locations through `chipLocations` in apple.js, atari.js and ibm.js. `core.js` merges those.

### Still unverified

- **IIe CF ROM** (`rom27128`): the pin wiring is not checked, because no 820-0087 schematic was found.
- **IIe timing HAL:** input nets on pins 2, 7 and 8, output 17, and the power pins.
- **ZX81 IC4:** the part identity, because the marking is blurred.
- **XT ROM designators:** not legible on the photo.
- **5155 U18 silk** and the SP8508 part.
- **Apple II top-right chip.**
- **Remaining validator WARNs:** two, for 8250 pin 9 (RCLK, whose PCjr wiring is not traced) and pin 17 (XTAL2, open on the PCjr). Neither has a sourced frequency.

## Review fixes (2026-11-02)

Fixes for the adversarial review (`.tmp/review-gaps/REVIEW.md`), findings 1, 2, 3, 5, 6, 9 and 11. Each was checked against the primary source named here. No Classic Repair Toolbox content was used.

- **Finding 1, PCjr gate array MD0-MD7 (accepted).** PCjr Technical Reference, System Board sheet 4 of 17 (p. B-6, PDF p. 504): the eight 4164 DOUT pins (pin 14) drive the MD bus, and the RAM DIN pins (pin 2) sit on a separate bus. Sheet 5 of 17 (p. B-7, PDF p. 505): the character latch ZM70 (74LS374) outputs drive MD0-MD7. Nothing on either sheet shows the gate array driving MD. Pins 33-40 are now `dir: 'in'`. IBM gives no pin-direction table for the gate array, so the direction is traced from the drawing and the pins carry `verify`.
- **Finding 2, location strings (accepted).** A copy of the app's `DES_RE`/`desAll` was run over every location and `locByBoard` value that differs from HEAD. Prose that leaked tokens was moved out of `location`:
  - pc5150 `rom2364`: U28 (empty socket) and A11/A12 removed. The 6025008 ROS wiring and the empty U28 are now in the `rom2364` summary, with the Technical Reference (PDF p. 312) added to its sources.
  - atari800xl `rom2364`: A11/A12 removed. The FSM wiring is in the `rom2364` summary, with the FSM schematic (PDF p. 36) as a source. `rom27128` at U5 did not leak and is unchanged.
  - xt5160 `rom23256` and pcjr `rom23256`: A14 removed. The `rom23256` summary now says the XT, 5155 and PCjr boards tie pins 1 and 27 both to A14. Sheet 5 of 10 (XT, PDF p. 472) and sheet 2 of 17 (PCjr, PDF p. 502) were rechecked: both draw A14 on pin 1 and pin 27. Both sheets were added as sources.
  - xt5160 `rom2764`: A13/A14 removed. The `rom2764` summary carries the U19 socket wiring (sheet 5 of 10 draws U18 and U19 on one bus; A14 on 1 and 27, A13 on 26).
  - `hal-timing-iie`: "Sams CC10" became "the Sams IIe folder" (CC10 stays in the record's sources).
  - zx81 `sram4118`: "L1" and "ZX81" removed; the link L1 instruction is in the `sram4118` summary.
  - apple2c `dram4164`: the schematic designators UF4-UF11 named the same RAMs a second time; moved to the `dram4164` summary.
  - After the change, every new or changed location yields only fitted designators.
- **Finding 3, XT U19 ROM images (accepted, fixed in `src/data/roms.js`).** MAME `ibmpc.cpp` (commit bde244d) says 5000027.u19 is FRU 6359116, the part marked on the photographed U19, and that its 32 KB contents repeat four times. It now has `chip: 'rom2764'` and a `sizeNote` saying an 8 KB dump of the chip must be repeated four times to match. 62X0854 and 68X4370 (1986) are 32 KB with no repeat noted, so they now have `chip: 'rom23256'`, a note and `verify` (no IBM drawing of the 1986 board was read). The 8K part page now lists only 5000027. **Not done (file not owned):** `scripts/roms/gen-roms.mjs` generates `roms.js`. It needs the same `chip`, `sizeNote`, `note` and `verify` fields, or the next regeneration will undo this fix.
- **Finding 5, IIe CF ROM (accepted).** No primary source for the 820-0087 wiring was found. The Apple IIe Technical Reference text, Sather and Sams CC10 were checked. Sams identifies the board only (1.2.4, scan p. 7), and a web search found nothing from Apple. `locByBoard { loc, verify }` is read by the app but rejected by the validator ("must be a non-empty string") and not in `docs/data-schema.md`, so it was not used. Instead, the photo box and the apple2e `chips`/`chipBoards` entry now point to a new record, `rom-iie-cf` (342-0349, DIP-28, `verify: true`, `pins: null`). Its sources are the Sams ID page and MAME `apple2e.cpp` line 5929 (apple2ep, 16 KB). Its summary names the 27128 pinout as likely but unchecked. The apple2e association with `rom27128` was removed. The photo note says this.
- **Finding 6, IIe/IIc keyboard ROMs (accepted).** No `rom2716` record existed in any data file. Rechecked: Apple 050-0051-D sheet 2 draws UE12 as a 2716 with VPP (21) and VCC (24) at +5 V. Apple 050-0093-A sheet 3/5 draws UD16 as a 2716 with 21 and 24 at +5 V and /CE (18) grounded. New record `rom2716`: the pin table is from the Intel 2716 data sheet, Figure 1, 1983 Memory Component Handbook p. 4-5 (PDF p. 387). It is in `verify`, because the fitted 342-0132 is an Apple mask part with no data sheet. The apple2e and apple2c `chips` lists, locations and photo boxes moved from `rom2316` to `rom2716`. `rom2316.machines` is back to apple2 and apple2plus. The `kbd3600` summary no longer calls the IIe keyboard ROM a 2316.
- **Finding 9, PCjr character ROM (accepted).** Technical Reference p. 2-49 (PDF p. 75): "The ROM character-generator consists of 2K bytes ... MCM68A316E or equivalent ... pin compatible with 2716 and 2732 EPROMS". The `rom2732` role and summary now give the 2 KB fitted size, and that page is a source. Pin 21 says jumper W2 picks +5 V or RA3 (sheet 5 of 17).
- **Finding 11, GI 2513 page (accepted).** GI_ROMs.pdf PDF p. 44 prints 3-44. The record (`verifiedAgainst` and the source label) and the line above now say p. 3-44.
