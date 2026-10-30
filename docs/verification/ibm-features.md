# IBM features 1-6 verification: waveforms, Sams, first ten minutes, clocks, replacements — 2026-10-30

Data added to `src/data/ibm.js` in the shape of docs/data-schema.md, last section. `node scripts/validate-data.mjs ibm`:
0 FAIL; the only new IBM warning is the `conflict` on `jr-power` pin 1 (below).

## Sams folders

| Folder | archive.org item | Used |
|---|---|---|
| CSCS2, IBM 5150 (9-84), with CSCS2-A (MDA and printer adapter), CSCS2-B (CGA) and CSCS2-C (disk) bound in the same scan | `Sams_IBM_5150` | System board schematic waveforms (pp. 4, 57, 59 and unnumbered sheets at scan n60, n62, n64); troubleshooting p. 15 (n15); preliminary service checks p. VII (n71); schematic notes p. 44 (n44); PSU schematic p. 53 (n53); MDA schematic pp. 3, 16 (n86, n100); CGA schematic p. 3 (n106) |

Scan leaf = PDF page - 1; links are `archive.org/details/Sams_IBM_5150/page/nN`. Sams designators on the 5150 board match
IBM's (8088 U3, 8284A U11, 8288 U6, 8259A U2, 8253 U34, 8237A U35, 8255A U36, 8087 U4).

Not found online: the XT folder (Sams CSCS10, "IBM PC-XT 5160-086", seen only as a sold eBay listing), and any Sams folder for
the PCjr or the Portable 5155. archive.org searches for "Sams", "Computerfacts" and "CSCS" with IBM, XT, PCjr, Portable,
5160 and 5155 return only the 5150 folder, the 5170 and the 5151/5153/5154 monitor and 5152 printer folders.

How Sams waveforms were read (schematic notes p. 44): each photo is 7 cm wide; the figures beside it are the p-p reading, the
time per cm and the DC level of the trace bottom. `low` = trace bottom, `high` = low + p-p. Frequencies come from the IBM
Technical Reference, never from counting cycles in a photo (the cycle counts were only used as a cross-check).

## Scope blocks

| Machine | Test point | Basis | Reading / levels | Where Sams probed |
|---|---|---|---|---|
| 5150 | CPU clock (8088 pin 19) | capture | 8 V p-p, 0.1 µs/cm, 0 V (ringing) | U99-9 on the CLK88 net |
| 5150 | Clock output (8284A pin 8) | datasheet | 0.45 / 4 V, 33 % | |
| 5150 | Oscillator (8284A pin 12) | capture | 4.2 V, 0.1 µs, 0 V | U11 pin 12 |
| 5150 | PCLK (8284A pin 2) | capture | 6 V, 0.2 µs, 0 V | U26-9 on the PCLK net |
| 5150 | Timer 0 out (8253 pin 10, 8259A pin 18), new | capture | 5 V, 10 ms, 0 V | U2 pin 18 (box on n60, arrow on n62) |
| 5150 | Refresh timer (8253 pin 13), new | capture | 4 V, 5 µs, 0 V | U34 pin 13 |
| 5150 | Bus clock (slot B20), new | capture | 6 V, 0.1 µs, 0 V | U15-7, ahead of R20 |
| 5150 | MDA dot clock, new | capture | 6 V, 0.1 µs, 0 V | MDA U24-6 (OSC1 out) |
| 5150 | MDA horizontal drive, new | capture | 5.18 V, 20 µs, 0 V | MDA J3-8 |
| 5150 | MDA vertical drive, new | capture | 5.89 V, 5 ms, 0 V | MDA J3-9 |
| 5150 | CGA colour reference, new | capture | 5 V, 0.1 µs, 0 V | CGA U5, 3.58MHz line |
| 5160, 5155 | CPU clock, Oscillator, PCLK (new on both) | datasheet | 0.45 / 4 V (CLK), 0.45 / 2.4 V (OSC, PCLK) | |
| PCjr | CPU clock | datasheet | 0.45 / 4 V, 33 % | |

Totals: 10 capture, 8 datasheet. Datasheet levels: Intel 8284A data sheet p. 3-237 (VOL 0.45 V; VOH 4 V on CLK, 2.4 V on the
other outputs) and p. 3-235 (CLK 1/3 duty, PCLK half CLK at 50 %). Frequencies: PC TechRef p. 1-19, XT TechRef pp. 1-19 and
1-21, PCjr TechRef p. 2-23.

Not backed, left without a scope block: the 8253 clock input (no Sams photo; the driving gate is not identified in hand, so
no levels), RESET and Power Good (not periodic; Sams's 0.1 ms/cm reset photo shows only the edge, so they are in firstTen
text instead), timer 2 / speaker (photo present at 0.5 ms/cm but the programmed rate when the photo was taken is not
documented), the second waveform on the RESET line (4 V at 0.2 µs/cm, arrow ambiguous), the PSU primary-side waveforms
(TP5, TP6: hot side, referenced to TP2), and the PCjr video and sound clocks (no pins captured for the gate array or the
SN76496).

## firstTen and clocks

| Machine | firstTen | clocks | Main sources |
|---|---|---|---|
| 5150 | 8 | 11 | PC TechRef pp. 1-4, 1-17, 1-19, 1-23, 1-24, 1-131, 1-132, A-83; IBM HMS 6280087 MAP 0020 pp. 0020-2, 0020-3; Sams CSCS2 pp. 4, 15, VII; minuszerodegrees MDC |
| 5160 | 8 | 8 | XT TechRef pp. 1-4, 1-13, 1-19, 1-21, 1-23, 3-3, 5-101; HMS MAP 0020; minuszerodegrees MDC, 5160 startup sequence, 5160 RAM |
| 5155 | 7 | 8 | minuszerodegrees 5155 PSU, MDC, 5155 startup; HMS MAP 0020 (covers the Portable); XT TechRef pp. 1-19, 3-7 |
| PCjr | 6 | 5 | PCjr HMS (Sep 1983) pp. 3-020-2 to 3-020-8; PCjr TechRef pp. 2-6, 2-23, 2-35, 2-89, 2-135 |

All firstTen steps start with the internal supply under load (minimum-load rule), then Power Good (HMS: 2.4 to 5.2 V DC
between P8-1 and P8-5), then the rails. PSU pins are named `P8-n`/`P9-n` in `pc-psu`; the validator's pin syntax cannot
address a hyphenated pin, so those `where` strings are plain text (no pad link).

## Replacements

| Chip | Rows | Source |
|---|---|---|
| cpu8088 | 8088-2; NEC V20 (BIOS-speed trap); Harris/Intersil 80C88 (CLK VIHC = VCC - 0.8 V trap, pair with 82C84A) | Intel p. 3-79; minuszerodegrees v20_problems; Intersil 80C88 p. 17 |
| clk8284 | 8284A-1; 82C84A | Intel p. 3-234; Intersil 82C84A p. 1 |
| bus8288 | 82C88 (CLK VIHC trap) | Intersil 82C88 p. 5 |
| pit8253 | 8254 (superset); 82C54 | Intel p. 6-150; Intersil 82C54 p. 1 |
| ppi8255 | 8255A (slower than the -5 IBM fitted); 82C55A (bus-hold trap) | Intel p. 6-183; Intersil 82C55A p. 3 |
| pic8259 | 8259A-2; 82C59A | Intel p. 2-120; Intersil 82C59A p. 1 |
| dma8237 | 8237A-4 / 8237A (too slow); 82C37A-5 (CLK VIHC trap) | Intel p. 2-88; Intersil 82C37A p. 16 |
| fpu8087 | 8087, -2, -1 (C8087 4MHZ unsuitable; SW1-2 OFF) | minuszerodegrees npu/8087 |
| crtc6845 | HD46505R; R6545-1 (register differences, 1 MHz grades too slow) | Hitachi HD46505R manual p. 22; Rockwell R6545-1 data sheet p. 1 |

The "about 1.8 MHz" CRTC clock in the 6845 rows is derived: MDA 16.257 MHz / 9-dot character box (TechRef p. 1-131), CGA
80-column 14.31818 MHz / 8.

Not added: 4164 / 41256 RAM and the 5160 64-256 KB board's 640 KB conversion. `dram4164` is defined in commodore.js and
there is no 41256 chip in the data; ibm.js does not own them. For whoever owns that file: minuszerodegrees
`/5160/ram/5160_ram_64_256.htm` and `/5160/ram/5160_ram_256_640.htm` (200 ns or faster, 4164 with pin 1 not connected;
256-640 KB board = two banks 41256 plus two banks 4164), and `/5160/motherboard/5160_motherboard_revisions.htm` note 1
(IBM conversion: jumper pad E2 pins 1-2, the same as grounding U44 pin 1).

## Conflicts recorded

- PCjr transformer: PCjr HMS p. 3-020-8 measures 15.0 to 30.0 V AC between plug pins 1 and 3; the TechRef prints 17 V AC
  each side of a centre ground (about 34 V across 1 and 3). `conflict` on `jr-power` pin 1; the TechRef text stays.
- PC/XT/Portable +5 V: HMS MAP 0020 accepts 4.8 to 5.2 V at the board connector; the TechRef rail spec is 4.80 to 5.25 V.
  The rail `expect` keeps the TechRef; firstTen quotes HMS and says so.
- PCjr +5 V: HMS checks 4.7 to 5.3 V at the power board drive connector; TechRef 4.75 to 5.25 V. firstTen quotes the TechRef
  and names the HMS range.
- 5150 supply test load: Sams p. 14 tests the unplugged supply with one 47 Ω 1 W resistor on P10 (+5 V, about 0.1 A); the
  TechRef minimum load is 2.3 A on +5 V and 0.4 A on +12 V. TechRef kept (firstTen step 1); Sams's load not used.
- 5150 CPU clock level: Sams reads 8 V p-p on the CLK88 net (ringing); the 8284A data sheet swing is 0.45 to 4 V or more.
  Both recorded: capture on 8088 pin 19 with the note, datasheet block on 8284A pin 8.
- Sams DC readings on the 5150 (+5.00, +12.00, -4.93, -11.88 V; Power Good 4.99 V) all sit inside IBM's ranges: no conflict.

## For the orchestrator

- The PCjr's 8253, 8259A and 8255A are on the board but not in `pcjr.chips`, so the PCjr timer clock row is plain text.
- `pcjr` and `portable5155` are still `status: 'sheet'` (existing warnings).
