# Commodore board photos: unboxed chips (gap audit)

Date: 2026-11-02. Data: `src/data/photos.js` (Commodore entries: c64 x 8, vic20, plus4, c128, c1541; 12 photos in all). Machine chip lists and records: `src/data/commodore.js`. Board list and links: `RCS.boards` and `RCS.addSchematics` in `src/data/schematics.js`.

## Method

- Each photo was read at 1.6x to 6x zoom, with a labeled 0.05 coordinate grid and the current boxes drawn on it. Boxes are `[x, y, w, h]` fractions of the image as stored (`rotate: 0` for all twelve).
- A GAP is a chip the audit rules put in scope (non-jellybean, or a chip with a record that is not in the machine list), visible on the photo, and not boxed. Jellybean chips are listed as "not a gap". Hidden chips are listed separately.
- Designators were read from the silkscreen where legible. Otherwise they come from `location` in `commodore.js`, the C128 parts list (primary), or the board notes in `schematics.js` and `docs/verification/photos.md`.
- **Primary-source limits.** The C128 parts list (`zimmers.net/.../c128/parts.txt`, Levak) was fetched and read. The C64 Service Manual 314001-03 (zimmers PDF) could not be read by the fetch tool (scanned pages, no text layer), so the 250466, 250469 and 250425 designators rest on silkscreen, the existing proofs in `docs/verification/photos.md`, and the notes in `schematics.js`. The bwack KU-14194HB BOM is a community file, used only to confirm the 4164s on that board. No Classic Repair Toolbox content was used.
- Scratch images and scripts: `.tmp/gaps-commodore/` (not part of the change).

## Chip id key

- `cia6526`, `vic2`, `sid6581`, `cpu6510`, `pla82s100`, `rom2364`, `rom2332`, `sram2114`, `dram4164`: existing ids (c64).
- `rom23128`, `rom23256`, `rom2364`: existing records, not in the C64 or C128 `chips` lists. Add them to the list, with `locByBoard` where a board differs.
- `NEW: dram41464`: 41464 64K x 4 DRAM, 18-pin. No record exists.
- `NEW: clk8701`: 7701/8701 C64 clock generator (one record covers both parts; 7701 on 250425, 8701 on 250466, 250469 and C128 U28).
- `NEW: c64mc`: C64 memory controller (251715 on 250469 rev A; 252535-01 on 250469 rev B, which also holds the color RAM).
- `NEW: sram2016`: 2016 2K x 8 static RAM (C128 U19 per parts list; not located, see unsure).

## c64 (8 entries in photos.js; the brief said 7, the original 250407 Rev B makes 8)

| Photo | Designator | Part marking read | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|---|
| c64-250469a.webp (1024 x 404) | U1 | CIA marking not legible | cia6526 (second instance; add a box) | [0.656, 0.510, 0.034, 0.322] | Layout position right of the SID (CIA U1 in `commodore.js`); 314001-03 p. 41 per existing proof | likely |
| c64-250469a.webp | U4 | 23128 ROM, not legible | rom23128 (add to c64 list, `locByBoard` 250469a) | [0.133, 0.545, 0.042, 0.224] | Board notes (one 23128 BASIC/KERNAL ROM at U4, `schematics.js`); parts list 250469-01 | likely |
| c64-250469a.webp | U8 | Memory controller, not legible | NEW: c64mc | [0.320, 0.480, 0.045, 0.350] | Board notes (251715 at U8); layout position | likely |
| c64-250469a.webp | U10, U11 (order not read) | 18-pin, marking not legible | NEW: dram41464 (x2) | [0.234, 0.682, 0.021, 0.143] and [0.272, 0.682, 0.023, 0.143] | 18-pin body, two 64K x 4 DRAMs (board notes); designators per the rev B layout | likely |
| c64-250469a.webp | 8701 clock (designator not legible; rev B has U20) | "8701" not legible | NEW: clk8701 | [0.4847, 0.6454, 0.0230, 0.1196] | Position matches rev B U20 | likely |
| c64-250469b.webp (1600 x 570) | U1 | 6526 (CIA) | cia6526 (second instance; add a box) | [0.655, 0.520, 0.037, 0.350] | Right of the SID (`commodore.js` U1 CIA1); layout | likely |
| c64-250469b.webp | U4 | "251913-01", "1984 CBM", 23128 ROM | rom23128 (add to c64 list, `locByBoard` 250469b) | [0.130, 0.558, 0.037, 0.238] | Marking read on the chip. The 23128 type is inferred from the board notes; the C128 parts list gives 251913-01 as a 23128 (a different board, so a cross-check only) | proven (marking), likely (designator U4) |
| c64-250469b.webp | U8 | "252535-01", "CBM" | NEW: c64mc | [0.320, 0.500, 0.041, 0.381] | Marking read; board notes (252535-01 at U8, color RAM inside) | proven (marking), likely (designator) |
| c64-250469b.webp | U20 | "8701", "U20" legible | NEW: clk8701 | [0.4825, 0.684, 0.0225, 0.127] | Silkscreen U20 next to the chip; part marking read as 8701 | likely (part), proven (designator) |
| c64-250469b.webp | U10, U11 (silkscreen labels under the chips) | 18-pin, TI-logo body, marking not legible | NEW: dram41464 (x2) | [0.2245, 0.712, 0.021, 0.144] and [0.2615, 0.712, 0.022, 0.144] | 18 pins (9 a side); board notes (two 64K x 4 DRAMs) | likely |
| c64-250466.webp (1600 x 767) | U1 | 6526A (CIA) | cia6526 (second instance; add a box) | [0.055, 0.199, 0.036, 0.263] | Left of the boxed U2; layout (`docs/verification/photos.md`, 6526A with hidden designator) | likely |
| c64-250466.webp | U9, U10 (order not read) | OKI-type 18-pin 64K x 4, marking partly legible | NEW: dram41464 (x2) | [0.1375, 0.604, 0.020, 0.117] and [0.100, 0.604, 0.020, 0.117] | Board notes (two 64K x 4 DRAMs at U9/U10); 18 pins | likely |
| c64-250466.webp | U31 | "8701" | NEW: clk8701 | [0.631, 0.593, 0.047, 0.052] | Position at U31 (lead note; `photos.md`); part read as 8701 | likely |
| c64-250425.webp (1600 x 764) | U31 | "U31" legible; part 7701 per the docs | NEW: clk8701 (7701 variant) | [0.637, 0.600, 0.050, 0.047] | U31 legible; 7701 per `photos.md` and the board note | likely |

Boxes checked as correct, not gaps:
- **250407 Rev B and Rev A:** the cia6526 box covers both CIAs (U1 and U2). The rom2364 box covers U3 and U4. No unboxed non-jellybean. The 74LS629 clock circuit is jellybean.
- **326298:** the cia6526 box covers U1 and U2. No unboxed non-jellybean. The 74LS629 clock and the MC4044P are jellybean.
- **KU-14194HB:** the cia6526 box covers both CIAs. The 4164s are 4164-2 (bwack BOM: U9-U12, U21-U24). No unboxed non-jellybean.
- **250425:** the cia6526 box covers both CIAs (U1, U2). Only U31 (clock) is unboxed.

## vic20 (vic20-mainboard.webp, 1600 x 823)

| Designator | Part marking read | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|
| UC4 | 18-pin, "2114"-type marking partly legible | sram2114 (second instance; add a box) | [0.217, 0.436, 0.016, 0.089] | Silkscreen UC4 legible; part by marking, same family as the boxed UD/UE RAM | likely |
| UC5 | 18-pin, "2114"-type marking partly legible | sram2114 | [0.259, 0.436, 0.014, 0.089] | Silkscreen UC5 legible | likely |
| UC6 | 18-pin, "2114"-type marking partly legible | sram2114 | [0.300, 0.436, 0.016, 0.089] | Silkscreen UC6 legible | likely |

- UC2 and UC3 are 16-pin 74LS (jellybean, not a gap).
- Visible but not gaps (jellybean or unreadable): UB8, UB9, UB10, UD8, UD9 and UE8 (logic, markings not read). UD9, UB9 and UB10 are unsure (see below).
- Boxed correctly: the 6522 box covers UAB1 and UAB3; the 2364 box covers UE11 and UE12.

## plus4 (plus4-310163.webp, 1600 x 892)

| Designator | Part marking read | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|
| U27 | Marking not read (chip is 18-pin) | pio6529 (second instance; add a box) | [0.207, 0.724, 0.022, 0.143] | Silkscreen U27 under the chip; `plus4` location for pio6529 (U5, U27) | likely (designator), unsure (part) |

- Boxed correctly: the rom23128 box covers the four ROMs (U23 to U26), the pla82s100 box is U19 (251641-02), and the dram4164 box covers U11 to U18.
- The TED (U1) is under the RF shield (see Hidden).
- Unsure, not called a gap: two dark chips at about [0.262, 0.606, 0.019, 0.104] (above U22) and [0.262, 0.738, 0.019, 0.106] (U22). Markings were not legible.

## c128 (c128-flat.webp, 1600 x 1064)

Designators are from the C128 parts list (`zimmers.net/.../c128/parts.txt`, Levak, primary). The parts-list rows used are: U1, U4 6526; U18 390059-01 2364-318 character ROM; U32 251913-01 23128-045; U33 318018-02 23128; U34 318022-02 23256; U35 318020-03 23128; U36 no entry; U28 8701 clock gen; U19 2016 2K x 8 SRAM.

| Designator | Part marking read | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|
| U1 | 6526 (silkscreen U1 not seen) | cia6526 (second instance; add a box) | [0.831, 0.600, 0.041, 0.190] | Parts list (U1 and U4 6526); layout position, lower right next to the Z80 | likely |
| U32 | "251913-01", "1984 CBM" | rom23128 (add to c128 list) | [0.050, 0.510, 0.038, 0.132] | Marking read; parts list U32 251913-01 (23128-045) | proven (marking), likely (designator) |
| U33 | "318018-02" (partly read), TAIWAN | rom23128 | [0.0909, 0.510, 0.046, 0.132] | Parts list U33 318018-02 (23128-049); silkscreen U33 legible | likely |
| U34 | "318022-02" (partly read) | rom23256 (23256 per parts list; 23128 if the part is 318019) | [0.1502, 0.510, 0.0373, 0.132] | Parts list U34 318022-02 (23256); silkscreen U34 legible | likely (type unsure) |
| U35 | "318020-03", "1985 CBM" | rom23128 | [0.1514, 0.336, 0.0373, 0.131] | Marking read; parts list U35 318020-03 (23128-051) | likely |
| U18 | "390059-01", "CBM" | rom2364 (2364-318 character ROM; add to c128 list) | [0.3644, 0.7777, 0.0344, 0.1133] | Parts list U18 390059-01 (2364-318); silkscreen U18 legible | likely |
| U28 | Not located in my crops | NEW: clk8701 | (not located) | Parts list: U28 8701 CLK GEN | unsure |
| U19 | Not located in my crops | NEW: sram2016 | (not located) | Parts list: U19 2016 2K x 8 SRAM. The U19 silkscreen I did see sits beside a 74LS244, so it does not confirm the 2016 | unsure |

- U36 is an empty socket. It is not a gap.
- Boxed correctly: the cia6526 box is U4 (6526 3186); the dram4164 box covers the 16 chips U38-U53; the dram4416 pair is U23 and U25; the vic2e (U21), vdc8563 (U22), sid6581 (U5), mmu8722 (U7), pla8721 (U11), cpu8502 (U6) and cpuz80 (U10) boxes are as placed.
- Visible but not gaps (jellybean): U3 74LS138, U16 74LS14, U55 MC74F245N, U17 SN74AS, U24 74LS (markings not read), the 74LS244, 74LS373, 74LS257 and 74LS03 packages on the lower board, and the JRC 5560 op-amp (U27).

## c1541 (c1541-250442.webp, 1600 x 1150)

| Designator | Part marking read | Proposed id | Box [x, y, w, h] | Identified by | Confidence |
|---|---|---|---|---|---|
| UD1 | "EL7406", "64" | ttl7406 (second instance; the record already lists UD1) | [0.575, 0.756, 0.069, 0.058] | `commodore.js` ttl7406 location: UB1 and UD1 (short boards 251748); the 7406 at UB1 is boxed | likely |

- Boxed correctly: the cpu6502 box is UC4; the via6522 box covers UC3 and UC2; the ga325572 box is UC1; the rom2364 box covers UB3 and UB4; the sram6116 box is UB2 (TMM2016P).
- Jellybean, not gaps: 74LS14 (UA1), 74LS00 (UC7), 74LS04 (UC6), 74LS42 (UC8), 74LS193 (UE6), a 74125-type buffer (UD4 area, read as EL74125), 7407 (EL7407 H4), HD74LS86P, and two "UAS922C F6429A KOREA" packages on the right (unsure; see below).

## Visible but not a gap (jellybean), by photo

- **c64-250407 Rev B and Rev A, 326298, KU-14194HB:** the 74LS logic on the board (for example the 74LS629 clock circuit, 74LS08 and MC4044P on the 326298 sub-board, and the 14-pin U8 on KU-14194HB). Not read one by one.
- **c64-250425 and 250466:** the 74LS and CMOS logic along the lower edge. Not read one by one.
- **c64-250469a and 250469b:** the small logic packages in the lower half. Not read one by one.

## Hidden (not visible, not a gap)

- **c64-250407 Rev A and Rev B:** VIC-II U19 under the closed RF shield (the shield is marked 251024).
- **c64 KU-14194HB:** VIC-II U19 under the closed RF shield.
- **plus4:** TED U1 under the RF shield.
- **c64-250466 and c64-250425:** VIC-II visible (RF shield lid off). Not hidden.
- **c128:** no hidden chips on the flat board; U36 is an empty socket.

## Unsure (could not read or place)

- **C128 U28 (8701 clock):** the parts list places it at U28; I did not find it in my crops. Not boxed.
- **C128 U19 (2016 SRAM):** the parts list places it at U19; the nearby chip I read as U19 is a 74LS244. Not boxed.
- **C128 U24 (16-pin, near Y1):** marking not read. Not called a gap.
- **Plus/4 U21, U22 (dark chips above and at U22):** markings not read. Not called a gap.
- **VIC-20 UD9, UB9, UB10:** small logic; markings not read. Not called a gap.
- **1541 "UAS922C F6429A KOREA" (two packages on the right):** function not identified. Probably analog or power logic. Not called a gap.
- **250469a clock designator:** not legible on the 1024 px original; "U20" is taken from the rev B layout.
- **250469a and 250469b DRAM designators:** U10 and U11 are the silkscreen labels near the chips on rev B; not confirmed against the parts list.
- **250466 DRAM designator order:** U9 and U10 are per the board notes; which box is which is not read.

## Summary

| Type | Count | Items |
|---|---|---|
| (a) unboxed second instance or jellybean with a record in the machine list | 9 chips (7 items) | CIA U1: 250469a, 250469b, 250466, C128 (4); VIC-20 sram2114 UC4-UC6 (3); plus4 pio6529 U27 (1); 1541 ttl7406 UD1 (1) |
| (b) non-jellybean, record exists but not in machine list | 7 chips | rom23128 U4 on 250469a and 250469b (2); C128 rom23128 U32, U33, U35 (3); C128 rom23256 U34 (1); C128 rom2364 U18 character ROM (1) |
| (b) non-jellybean, no record | 12 chips | NEW c64mc U8 on 250469a and 250469b (2); NEW dram41464 on 250469a, 250469b, 250466 (6); NEW clk8701 on 250469a, 250469b, 250466, 250425 (4) |
| Unsure (not located or not read) | 2 chips | C128 U28 clk8701; C128 U19 sram2016 |

Chips needing new records: `dram41464`, `clk8701` (7701/8701), `c64mc` (memory controller), and `sram2016` (only if the C128 U19 is confirmed). Existing records that need adding to a machine list: `rom23128` (c64, c128), `rom23256` (c128), `rom2364` (c128).

## Notes on existing boxes

- The c64 `chips` list has no rom23128, memory controller or clock chip, so the 250469 boards cannot be fully boxed until the list is extended.
- `docs/verification/photos.md` says the c64 250469 rev A and rev B photos each have a 2114 at U19 (rev A) and none (rev B); both are consistent with the photos.
- The 250466 DRAM note in `photos.md` (two 64K x 4 at U9 and U10) matches the photo.

## Resolution (2026-11-02)

Every claim above was rechecked on the photo (zoomed crops, boxes drawn back onto the image and inspected) and against primary sources. Scratch images: `.tmp/gapfix-commodore/`. No Classic Repair Toolbox content was used.

Sources used, with the pages read:
- C64/C64C Service Manual 314001-03 (zimmers.net PDF): p. 34 parts list 250466-01 (PDF p. 44), p. 36 B-3 board layout (PDF p. 46), p. 40 parts list 250469-01 (PDF p. 50), p. 41 E board layout #250469 (PDF p. 51), parts list 250425-01 (PDF p. 37), parts list 250407 (PDF p. 30).
- Commodore schematics on zimmers.net: 252278 sheet 1 (250466, U31 8701 and U9/U10 DRAMs), 252312 rev A right half (U8 251715-01), 252311 rev B corrected (U8 252535-01, U10/U11 41464).
- C128 Service Manual 314001-08 (archive.org): p. 30, 8701 pin assignment (PDF p. 32); parts list (U28 8701, U18 390059-01, U19 2016, U32-U35 ROMs).
- C128/C128D parts list (Levak, zimmers.net) and VIC-20 and Plus/4 parts lists (zimmers.net).
- 1540/1541 Service Manual 314002-01, board layout 250442/46 (PDF p. 30): matches the photo, but the labels are too blurred to read.

### C64 250469a (rev A)
- CIA U1: box added at the right, next to the SID. Position from 314001-03 p. 41. `cia6526` stays in `verify`: the left CIA (U2) is labeled like U7 in the scanned layout, and the photo is too small to read any designator.
- U4 23128 ROM: boxed. `rom23128` added to the c64 list, `chipBoards` 250469a/250469b, location U4. Part per p. 40 (U4 251913-01, "128K ROM") and the rev B schematic (U4 23128). The default `location` carries U4, so no `locByBoard` entry is needed.
- U8 memory controller: boxed as the new record `mc251715`. Position from p. 41; part from p. 40 (U8 Memory Controller 251715-01).
- U10, U11 64K x 4 DRAMs: boxed. The existing `dram4464` (atari.js, "4464 / 41464", TI TMS4464 pin table) is the same part. The rev B schematic wires U10/U11 (41464) on pins 1, 2, 3, 4, 5, 9, 15, 16, 17, matching that table. Added to the c64 list through `chipLocations` (U9, U10) and `locByBoard` 250469a/b (U10, U11). Positions from p. 41.
- U20 clock: boxed as the new record `clk8701`. Position from p. 41; part from p. 40 (U20 8701T6 / 8701L6). The marking is not legible.
- The audit boxes were redrawn to fit the chip bodies and pins.

### C64 250469b (rev B)
- U1 CIA (6526A): boxed. No designator is printed next to it; the position is U1 on p. 41. U2 is legible, so `cia6526` is not in `verify`.
- U4 (251913-01, legible), U8 (Sharp 252535-01, legible), U10 and U11 (TI 64K x 4, legible) and U20 (8701, legible): boxed.
- The audit's U1 box started too high (y 0.520); the chip body starts at y 0.543.

### C64 250466
- The CIA U1 (6526A) box was added. Its designator is faint but readable, and p. 36 shows U1 at the left edge. The existing U2 box (x 0.090, w 0.054) overlapped U1's pins. It was moved to x 0.106, w 0.040.
- U10 and U9 (OKI 64K x 4): boxed. Both designators are legible: U10 is the left chip and U9 the right one, as on p. 36. Parts list p. 34: U9, U10 64Kx4 DRAM 390083-02.
- U31 (marked 8701, designator legible): boxed. Parts list p. 34: U31 8701T6 / 8701L6.

### C64 250425
- U31: boxed (designator legible). The part marking is not legible at this size, so the note no longer says 7701. The parts list (PDF p. 37) gives U31 "7701/8701" with one Commodore number, 251527-01. That is the source for one record covering both parts.

### C64 records and tags
- New `clk8701` (8701 / 7701), DIP-16. Full pin table from the C128 Service Manual p. 30. The Commodore schematic 252278 confirms pins 2, 4, 6, 7, 8, 9, 12-15 on a C64 board. Pin 5 is printed RESET in the pin table but drawn with a bar in the block diagram, so it carries `verify`. `chipBoards`: 250425, 250466, 250469a, 250469b. The 326298 and 250407 parts lists have a 74LS629 clock at U31 and no 8701. KU-14194HB is also left off: it is an early (1982) board like the 326298, but no Commodore parts list covers it, so that tag is an inference and should be checked.
- New `mc251715` (251715-01 / 252535-01), DIP-64. Pin table read from the Commodore schematics 252312 rev A and 252311 rev B. The two agree on every shared pin. They differ at pins 17-21: 251715 has /COLRAM at 17 and CAS0-CAS3 (not connected) at 18-21; 252535 has the color RAM data D1-D4 at 18-21. One record covers both, with both uses given on those pins; they carry `verify`, as do pin 14 (the rev B drawing has no wire there) and pins 8 and 9 (NMI/RESTORE direction read from the drawing only). The package is a shrink DIP (1.78 mm pitch, measured against the 40-pin VIC on both photos).
- Clock `where` text on c64 and c128 now names 8701 pins 6, 8, 13, 14 and 251715 pin 37, so the new clock pins have expected frequencies (no new validator warnings).
- **Not done (file not owned):** the new `chipBoards` tags (mc251715, dram4464, rom23128, clk8701) need rows in `docs/verification/board-revisions.md`.

### C128
- CIA U1: boxed (U1 legible, MOS 6526 3185). The cia6526 entry is now two boxes, U4 and U1.
- ROMs: U32 (251913-01), U33 (318018-02), U34 and U35 (318020-03) are all boxed; every designator is legible. The audit read U34 as 318022-02 (a 23256). The marking reads "...019-02", the mask code continues from U33 (2601D-290, -291), and the set matches the original ROM set in the C128 Service Manual parts list (U34 318019-02, 23128). So U34 is boxed as `rom23128`. `rom23256` was not added to c128.
- U18: boxed as `rom2364` (marking 390059-01, U18 legible). Parts list: 390059-01, 2364-318. `rom2364` now lists c128.
- U19: found. The audit had looked at the wrong chip. U19 (legible) is an HM6116P-4, which is the 2016 type. It is boxed as the existing `sram6116` (heathkit.js; Hitachi HM6116 pin table), added through `chipLocations`. No new `sram2016` record was made.
- U28: found inside the video shield frame, right of crystal Y2. It is marked MOS 8701, and the U28 silkscreen is legible. Boxed as `clk8701`.
- c128 list: rom23128, rom2364, sram6116 and clk8701 added. No c128 chip is in `verify`.

### VIC-20
- **Audit claim wrong.** UC4, UC5 and UC6 are 16-pin Mitsubishi M74LS-series logic chips, not 18-pin 2114s. The VIC-20 parts list has 2114s only at UD2, UE1-UE2 and UD3-UE6. Not a gap.
- The single sram2114 box also took in UD1, which is not a 2114. It is now two boxes: UD2-UD6 and UE1-UE6, with all designators legible.

### Plus/4
- U27: boxed as the second `pio6529` (marking 6529B, U27 legible, 20 pins). Parts list: U27 6529B SPI. The U5 box was checked: 6529B, U5 legible.
- U20-U22 are not in the Plus/4 parts list (logic). Not gaps.

### 1541 (250442)
- UD1: boxed as the second `ttl7406` (marking EL7406). The designator is not visible on the photo. The 1541 Service Manual layout (PDF p. 30) has the same footprint there but is too blurred to read. UD1 comes from elimination: the record gives the two 7406s as UB1 and UD1, and UB1 (legible) is the other one. So `ttl7406` is now in `verify`, which also flags the UB1 box.

### Still unverified
- 250469a: both CIA boxes (photo too small; layout label for U2 misprinted).
- 1541: the UD1 designator (by elimination).
- `clk8701` pin 5 name and polarity. `mc251715` pins 8, 9, 14 and 17-21 (one schematic each, or direction read from the drawing).
- The `chipBoards` tags still need rows in board-revisions.md (see above).

## Review fixes (2026-11-02)

Fixes for the adversarial review (`.tmp/review-gaps/REVIEW.md`), findings 2 (Commodore part), 4 and 10. No Classic Repair Toolbox content was used.

- **Finding 4, C64 revision locations (accepted).** C64/C64C Service Manual 314001-03, parts list 250466-01 (PDF p. 44): U9, U10 64K x 4 DRAM 390083-02, and U31 8701T6 / 8701L6. Parts list 250425-01 (PDF p. 37): U31 7701/8701. The c64 `locByBoard` now has `250466: { dram4464: 'U9, U10', clk8701: 'U31' }` and `250425: { clk8701: 'U31' }`. With a board picked, the parts list no longer shows U11 or U20 on those boards. The default text still names both layouts for the no-board view.
- **Finding 10, 8701 pin 5 (accepted).** Commodore drawing 251527-01 (IC, clock generator 8701/8701N), sheet 1 (zimmers.net `chipdata/8701/8701-1.GIF`). Its pin configuration names pin 5 Reset with a bar, drawn to +5 V. The functional description says the reset input is for test, "when held low the frequency divider is reset to a known state and frozen", and that it "has a weak pullup device and during normal operation can either be tied high or left open." Pin 5 is now `/RESET`, active LOW, with that description, and its `verify` is cleared. It carries a `conflict` because the C128 Service Manual p. 30 pin table prints RESET without a bar. The drawing was added to the sources and to `verifiedAgainst`. The validator reports pin conflicts as WARN, so this adds one WARN by design.
- **Finding 2 (Commodore part).** The c128 `rom23128` location said "C64 mode", which the designator parser read as a part "C64". It now says "64 mode". The `dram4164` summary also took the Apple IIc schematic note (UF4-UF11) that was moved out of the IIc location.
