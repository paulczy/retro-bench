# Data follow-ups — 2026-10-30

Files changed: `src/data/ibm.js`, `commodore.js`, `atari.js`, `apple.js`, `ti.js`. `sinclair.js` is unchanged (see 3).
`node scripts/validate-data.mjs <brand>` for ibm, commodore, sinclair, atari, apple, ti: 0 FAIL each. IBM warnings went
from 145 to 129 (15 PSU-pin warnings and the bbcmaster "4464 pins 5" warning cleared).

## Sources used

| Source | URL | Used for |
|---|---|---|
| PCjr Technical Reference (Nov 1983) | https://bitsavers.org/pdf/ibm/pc/pc_jr/PCjr_Technical_Reference_Nov83.pdf | Logic diagram sheet 1 (PDF p. 501): 8259A at ZM32, IRQ wiring. Sheet 9 (PDF p. 509): 8255A-5 at ZM22, 8253-5 at ZM23, CLK0/CLK2 from ZM34 pin 9, GATE0/GATE1 to +5 V, OUT1 open. pp. 2-6, 2-15, 2-30 to 2-35 (PDF 32, 41, 56-61): channel use, IRQ list, 8255 bits, port $A0 bit 5 |
| Hitachi 1984 IC Memory Data Book | https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf | HM50256 pin arrangement, 256 refresh cycles 4 ms (p. 219, PDF 221); HM4864 128 refresh cycles 2 ms (p. 199, PDF 201) |
| TI 1984 MOS Memory Data Book | http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf | TMS4256 (p. 4-63, PDF 103): A8 on pin 1, upward pin compatible with TMS4164, 256 rows / 4 ms. TMS4164 refresh 256 rows (PDF 81). TMS4464 pin diagram and description (pp. 4-107/108, PDF 147-148) |
| minuszerodegrees.net 5160 RAM and board pages | https://minuszerodegrees.net/5160/ram/5160_ram_256_640.htm, .../5160_motherboard_revisions.htm | 256-640KB board: banks 0-1 41256, banks 2-3 4164, 200 ns; 64-256KB conversion (E2 pins 1-2 = U44 pin 1 grounded) |
| CPCWiki, CRTC (archived 2 Jan 2025) | https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC | CRTC types 0-4 by part number, UM6845R status register, HD6345 |
| ZX Spectrum Service Manual | https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf | 1.5.1 (p. 10) links H and N swap pins 20 and 27; 4.6 (p. 24) change links with the ROM |
| ZX Spectrum Issue 3 circuit diagram | k1.spdns.de (ISS3 in sinclair.js) | IC5 table: pin 20 NEC CE / Hitachi CS; pin 27 NEC CS / Hitachi CE (read on the drawing) |
| Oric-1 48K circuit diagram issue 7, sheet 2 | Defence Force wiki (archived, SCH2 in oric.js) | IC9 "23128 OR 2764", "ICs 10 and 11 not required if IC9 is a 23128", pin 1 to +5 V, pin 27 via RP1 3K3 |
| Retroleum, ZX Spectrum chips | https://retroleum.co.uk/zx-spectrum-chips | Switchable ROM Replacement Board, Diagnostic Test ROM (a plain EPROM needs board changes) |
| Intel 27128 data sheet, 1983 Memory Component Handbook p. 4-29 | https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf#page=411 | 27128 pin names (as already cited in heathkit.js) |
| ColecoVision Technical Manual (Coleco, 1983) | https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf | U9:35 B-Y, U9:36 Y, U9:38 R-Y video outputs (PDF pp. 70-71) |
| Apple schematic 050-0007-H, Disk II analog board | A2DP mirror (D2ANALOG in apple.js), PDF p. 2 | TP5, TP6 positions around the MC3470 (read on the drawing) |
| Apple schematic 050-0051-D, Apple IIe (NTSC) | https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Computers/Apple%20II/Apple%20IIe/Schematics/Apple%20IIe%20-%20Schematics%20050-0051-D.pdf | Sheet 1 (PDF p. 2): MMU UE4, 6502 UC4 |

## Changes

1. **PCjr support chips (ibm.js).** `pic8259`, `pit8253`, `ppi8255` added to `pcjr.chips` with `chipLocations.pcjr`
   ZM32, ZM23, ZM22. PCjr pin use appended to each pin as "PCjr: ..." after the PC text (IRQ list, 8253 clocks and gates,
   all 8255 port A/B/C bits). Summaries, datasheets and `verifiedAgainst` extended. PCjr timer clock row now
   `where: '8253 pin 9 and pin 18; 8253 pin 15'` with the CLK1 select note.
2. **dram41256 (ibm.js), new.** Full 16-pin table from the Hitachi HM50256 drawing, cross-checked on the TI TMS4256
   sheet. Fitted on `xt5160` (banks 0 and 1, 256-640KB board). Replacements: other 41256s (200 ns or faster on the
   5160); the IBM 64-256KB to 640 KB conversion.
3. **Shared RAM replacements.** `dram4164` (commodore.js): row on refresh count (HM4864 128 rows / TMS4164 256 rows);
   row for a 41256 (pin 1 A8 held fixed, needs 256-row refresh). The summary now says the 4464 is not interchangeable
   and that refresh differs by maker; the old "41256 substitutes if pins 1 and 16 are linked" line moved into the row.
   The 4464 is in the summary, not a `replacements` row, because it is not a replacement. `dram4116` (sinclair.js)
   already had the adapter-board, bent-pin (-5 V / +12 V) and Retroleum module rows from the Sinclair pass; nothing
   to add. `dram41256` rows as in 2.
4. **dram4464 (atari.js).** Full 18-pin table from TMS4464 (/G 1, DQ1 2, DQ2 3, /W 4, /RAS 5, A6 6, A5 7, A4 8,
   VDD 9, A7 10, A3-A0 11-14, DQ3 15, /CAS 16, DQ4 17, VSS 18); agrees with the BBC Master pins 5, 9, 16, 18.
   Chip keeps `verify: true` for the unconfirmed 130XE fit only.
5. **crtc6845 (ibm.js).** Rows: HD6845S / UM6845 (type 0), UM6845R (type 1), MC6845 (type 2, with the note that
   types 3 and 4 are not socket parts), HD6345.
6. **rom23128 (commodore.js).** Summary and pins 20 and 27 now say the select polarity is mask-set and differs by
   maker (C16, Spectrum NEC/Hitachi, Oric /ROMDIS on 27). Datasheets: Spectrum manual 1.5.1, 4.6, Issue 3 diagram.
   Replacements: Retroleum Switchable ROM board (Spectrum 16K/48K), 27128/27C128 (not a drop-in where pin 27 is a
   board select), two 2764s on the Oric-1.
7. **vdp9918 (ti.js).** Pins 35, 36, 38 already carried no `verify` (cleared in the TI pass against the TI data
   manual). Added the ColecoVision Technical Manual as a datasheet source and to `verifiedAgainst`.
8. **apple.js.**
   - Disk II TP5 is on MC3470 **pin 7**, not 6. On 050-0007-H, C7 330 pF joins pins 6 and 7. TP5, R33 (10K pot)
     and R21 (8.2K) to +5 V sit on the pin 7 side. TP6 is on **pin 9** (R20 4.7K to +5 V, C8 between pins 8 and 9).
     The old text had TP6 on pin 8. Test point, firstTen step 8 and pin 6-9 text corrected.
   - IIe MMU is at **UE4**, not E6, on Apple's own schematic 050-0051-D (Sams CC10 agrees). The same sheet puts the
     6502 at **UC4**, not B4; corrected too. The schematic cites it on `mmu344`.
9. **ibm.js PSU pins (coordinator request).** Rails and firstTen `where` on pc5150, xt5160 and portable5155 rewritten
   to `pc-psu pin P8-3` / `xt-psu pins P9-4, P9-5, P9-6` / `p-psu pin P8-1 to pin P8-5 (at the system board
   connector)` form.

10. **Global-scope fix (coordinator request).** atari.js and commodore.js both declared `const SAMS` at top level,
    so the second file to load threw in the browser. Both bodies are now wrapped in `(() => { ... })();`. Full
    `node scripts/validate-data.mjs`: 0 FAIL.

## Still open

- Apple 050-0051-D prints the MMU part number as "344-0100"; apple.js and the chip marking say 344-0010. Not changed.
  Check a board.
- IIe IOU stays at "E5". It is not on the schematic sheets read (Sams CC10 gives UE5).
- PCjr 8259A pin 26 (/INTA) source on the PCjr board was not traced. The text says only that the 8088 makes /INTA in
  minimum mode.
- 130XE 64K x 4 fit: still no service document.
