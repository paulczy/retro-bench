# Finish sheets and open checks — 2026-10-30

Files touched: `src/data/apple.js`, `sinclair.js`, `timex.js`, `ibm.js`, `ti.js`, `atari.js`.
Full `node scripts/validate-data.mjs`: 0 FAIL.

## Machines now `ready`

| Machine | Added | Sources |
|---|---|---|
| apple2c | quickref (keys, Applesoft, Monitor, memory, firstLook); 12 symptoms; clocks rows for IOU 26/27, GLU 8/19/20, 6502 3/39, 6551 6/27 (BCLK 1.789 MHz); GLU pin 19 CREF `verify` cleared | Apple IIc Technical Reference Manual 2nd ed. (pp. xxiii-xxiv, 4-9, 21, 52, 61-62, 100-101, 120-122, 204, 227-229, 246, 277); Sams CSCS7 troubleshooting pp. 8-11 (`sams: true`) |
| zx80 | quickref; 6 symptoms; firstTen (6 steps) | ZX80 Operating Manual (k1 PDF, byte-identical to the local copy) pp. 6-9, 17-22, 74-75, 87, 89-101, 105-107; ZX80 circuit diagram (k1) |
| spectrum128 | quickref; 7 symptoms (power already had firstTen and clocks) | Spectrum 128 Introduction (WoS sp128p02-p14); Spectrum 128 Service Manual 2.3-2.4, 4.1-4.4, 5.5-5.6, 6.1 |
| spectrumplus2 | quickref; 8 symptoms; power testPoint, firstTen (7), clocks (X1 35.469 MHz, CPU 3.5469 MHz); supply note (L78S05CV at PL11); chips + `dram4164`; chipLocations Z80A IC9, AY IC4, 4164 IC17-IC32 | ZX Spectrum +2 user manual (archive.org PDF) ch. 1-7; Spectrum +2 Service Manual (k1, image-only scan read from page images): spec p. 2, flow chart p. 3, test software p. 4, parts list p. 5 |
| spectrumplus3 | quickref; 8 symptoms; firstTen (7); clocks X1 35.469 MHz, X2 16 MHz, X3 6 MHz; chips + `dram4464`; chipLocations Z80A IC2, AY IC11, RAM IC3-IC6 | +3 manual (WoS) ch. 2, 3, 5, 8 pt 20, 8 pt 24; +2A/+3 Service Manual (k1 HTML): spec, self-test activation, flow chart, test software, parts list |
| ts1500 | quickref; 6 symptoms | Timex Sinclair 1500 User Manual (1983) ch. 1, 2, 3, 5, 12, App. D, E, H |
| pcjr | 12 symptoms (advanced POST table); clocks OSC (8284A pin 12) and PCLK (pin 2) | PCjr HMS (Sep 1983) pp. 2-6, 2-7, 3-000-8 to 3-000-11; Intel 8284A data sheet p. 3-235 |
| portable5155 | 10 symptoms | IBM 5155 Guide to Operations 6936571 (Jan 1984) POST examples 1-6, Tests 100, 300, 700 (minuszerodegrees PDF); HMS MAP 0020; minuszerodegrees 5155 PSU page |

New source constants: `ZX80OMP`, `UM128P`, `P2MAN`, `P2SM`, `P3MANC`, `P2SM_*`, `P3SM_*` (sinclair.js); `um15` (timex.js); `G5155` (ibm.js).

## Open checks

1. **ti.js `vdp9918` XTAL pins — fixed.** TMS9918A/9928A/9929A Data Manual (Nov 1982, bitsavers
   `components/ti/TMS9900/`): the 3.7.1 terminal table lists "XTAL1, XTAL2 — 40, 39" and Figure 4-2 (p. 4-2) wires the
   crystal to pin 40 XTAL1 and pin 39 XTAL2. The small pin drawing on p. 3-9 shows them swapped. Changed pin 39
   XTAL1 → XTAL2 and pin 40 XTAL2 → XTAL1, with a `conflict` on both pins naming the drawing. The ColecoVision redraw
   (pin 40 XTAL1) agrees. Sams counts the oscillator at pin 39; that test point is unchanged. Bitsavers pages 52 and 57
   added to `datasheets`.
2. **apple.js IIe MMU / IOU.** Apple schematic 050-0051-D sheet 1 prints "344-0100" in the UE4 box. Sams CC10 parts
   list (scan p. 8) gives UE4 = Memory Management Unit 344-0010-B and UE5 = Input/Output Unit 344-0020-A; forum
   reports of fitted chips also read 344-0010-B. Kept 344-0010 and recorded the schematic number in the `mmu344`
   summary, with Sams added to its `datasheets`. IOU designator: schematic sheet 3 (PDF p. 4) shows "UE5 IOU 344-0020",
   so `iou344` location changed **E5 → UE5**, schematic page added to its `datasheets`.
3. **atari.js 130XE 4464 — not confirmed, stays `verify`.** Sams CC16 130XE lists RAM U9-U16 (parts list) and the
   extra 64K at U26-U33, and its terminal guides show only 64K x 1 parts (MT4264-15, D4164-15); no 4464 appears.
   The `dram4464` summary now says so.

## Conflicts

- `vdp9918` pins 39/40: data manual pin drawing vs. its own table and Figure 4-2 (above).
- `mmu344`: Apple schematic 344-0100 vs. Sams 344-0010-B (summary text, not a pin field).
- +3 service manual test-software colour table names RAM IC17-IC32 (copied from the +2 manual); the +3 parts list puts
  RAM at IC3-IC6. The +3 symptom tells the tech to use the RAM test report instead.

## Still missing

- spectrum128 / spectrumplus2: AY-3-8912 pin 15 clock has no sourced rate (the 128 service manual says only "master
  clock supplied by the ULA"). WARN left.
- spectrumplus2: rails stay empty; the +2 service manual circuit diagram is too faint to read rail values from.
- ts1500: no Timex service manual or schematic found (web search, k1, timexsinclair.com), so no firstTen or clocks;
  Z80A pin 6 clock WARN left; rails stay `verify`.
- apple2c: 6551 pins 5 and 7 are not connected on the IIc (TRM Table 11-19); the clock-pin WARN stays.
- pcjr: 8284A pin 14 (EFI) and 6845 pin 21 clock WARNs left (no rate in the TechRef). portable5155: same two pins.

## For other files

- docs/roadmap.md lines 82 and 84 (vdp9918 XTAL, IIe MMU/IOU, 130XE 4464) can be marked done with the outcomes above.
