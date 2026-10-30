# Coleco: waveforms, first ten minutes, clocks, replacements (features 1-4, 6), 2026-10-30

Data in `src/data/coleco.js` (power.colecovision and power.adam: `testPoints[].scope`, `firstTen`, `clocks`; `replacements` on `ls-controller`; a no-replacement note in the `mcu6801` summary).
`node scripts/validate-data.mjs coleco heathkit`: 0 FAIL; no new WARN for Coleco machines.

## Sams Computerfacts: not found

The brief expected a Sams ColecoVision folder (VG series, 1983) and an ADAM folder (CC series, 1984). Neither was found online:
- archive.org advanced search: titles with "computerfacts" (about 60 folders, none Coleco), "sams coleco", "sams adam", "coleco"/"colecovision"/"adam" with sams, computerfacts or photofact. No match.
- adamarchive.org archive search: "sams" finds only *The Toolkit Series, Coleco ADAM Edition* (Howard W. Sams, 1985), a programming book, not a Computerfacts folder; "computerfacts" and "photofact" find nothing.
- colecovisionadam.com technical pages, and web searches for Sams Computerfacts ColecoVision or ADAM: nothing.

So no block carries `sams: true`, and there are no Sams-versus-Coleco conflicts. Coleco's own Technical Manual has oscilloscope pictures with volts/div and time/div, and these are service-manual captures. They are used as `basis: 'capture'` instead.

## Sources

| Source | URL | Used for |
|---|---|---|
| ColecoVision Technical Manual (Coleco, 1983) | https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf | Signal pictures VII-4 to VII-19 (PDF pp. 59-74), flow charts sheets 7, 8, 11, 12 (PDF pp. 41, 43, 50, 51), tips p. 78 |
| ColecoVision KiCad redraw Rev J, sheets 5 and 6 | https://colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf | Clock chain (Y1, U22, U8B, Q2, PCLK, VCLK); controller input bias (U25/U26 22 kΩ to 2.5 V) |
| Coleco ADAM Technical Reference Manual | (as in coleco.md) | 2.1.2 6801 clock (p. 18), 2.2.8 clock generation (p. 35), 3.7 link speed (p. 62), 6.3 cable voltages (p. 49), appendix R60 note (p. 141) |
| ADAM System Check-Out and Trouble-Shooting Guide (Coleco, 1983) | https://archive.org/download/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco.pdf#page=4 | Power-on behaviour and reset switches (printed p. 2) |
| Motorola Single-Chip Microcomputer Data (1984), MC6801 | http://www.bitsavers.org/components/motorola/_dataBooks/1984_Motorola_Single-Chip_Microcomputer_Data.pdf#page=103 | E timing tcyc 1 µs, PWEL 430 ns, PWEH 450 ns (p. 3-56); VOL 0.5 V, VOH 2.4 V (p. 3-54) |
| Zilog Z80 CPU Product Specification (Mar 1978) | http://www.bitsavers.org/components/zilog/z80/03-0027-02_Z80_CPU_Product_Specification_Mar78.pdf#page=8 | Clock input limits 0.45 V / VCC - 0.6 V |
| TMS9918A/9928A/9929A VDP Data Manual | https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf#page=51 | 342 clocks per line, 262 lines (line and frame rates) |
| TI SN74LS541 and SN74HCT541 product pages | https://www.ti.com/product/SN74LS541, https://www.ti.com/product/SN74HCT541 | Both ACTIVE with DIP (N) parts |

All URLs returned 200 or 206 on 2026-10-30.

## Scope blocks

ColecoVision, all `basis: 'capture'` from the Technical Manual pictures. Levels were read off the graticule, with ground on the 0% line (the U1:16 picture, "basically a 5 VDC level", only reads 5 V that way).

| Test point | where | f / period | Levels | Picture |
|---|---|---|---|---|
| Z80 clock | Z80A pin 6 | 3.579545 MHz, 50% | 0 to 4.9 V | VII-5 U1:6 |
| Master oscillator | U22:8 | 7.15909 MHz | 0 to 3.1 V | VII-19 U22:8 |
| VDP clock | TMS9918A pin 40 | 10.738635 MHz | 0 to 3.4 V | VII-17 U9:40 |
| Colour reference (J4:8) | cv-rf-riser pin 8 | 3.579545 MHz, sine | 8.6 to 10.6 V | VII-5 J4:8 |
| Sound clock | SN76489 pin 14 | 3.579545 MHz | 0.2 to 2.3 V | VII-18 U20:14 |
| VDP luma Y (new) | TMS9918A pin 36 | 63.7 µs video line | 1.6 (sync) to 3.3 V | VII-16 U9:36 |
| RF board +12 V (new) | cv-rf-riser pin 4 | dc | 12 V | VII-4 J4:4 |

ADAM, `basis: 'datasheet'`: Z80 clock (Z80A pin 6, 3.579545 MHz, 50% duty from TRM 2.2.8, levels from the Z80 clock-input limits) and 6801 E (6801 pin 40, 1 MHz, 50%, MC6801 VOL/VOH).

Not added:
- J4:6 composite: the picture's 0.2 ms/div shows dips every 0.66 ms, which does not fit a 63.5 µs line, so it was left out.
- R-Y, B-Y, audio, bus lines, spinner signals: no frequency to give.
- ADAMnet: irregular serial data with no repeating shape. It is a text test point plus a 62.5 kHz bit-rate clock row instead.
- The ADAM's 7.16 MHz and VDP clock: no designator can be read and no level is given.

## Conflicts and misprints

- The U22:8 picture is labelled 5 µs/div and U20:14 0.5 µs/div. Both show cycles that only fit 50 ns/div at their frequencies. The notes call them misprints.
- The colour reference J4:8 is drawn as a 2 V p-p sine near +9.6 V. It is recorded as drawn; check it on a real board.

## firstTen

- ColecoVision, 8 steps: supply unloaded at cv-power, +5 V (Z80A pin 11, LS138 pin 16), VRAM and RF rails, reset, master oscillator, CPU clock, VDP clock, then NMI/INT/HALT. Each step is sourced to flow chart sheet 7, 8, 11 or 12.
- ADAM, 8 steps: printer supply rails at the J9 cable, power-on behaviour, +5 V, VRAM rails, reset, Z80 clock, 6801 E, then ADAMnet activity. Sources are the TRM and the Coleco guide.

## clocks

- ColecoVision, 7 rows: Y1/U22 7.15909 MHz, CPU 3.579545 MHz, PCLK, VCLK 10.738635 MHz, J4:8, line rate 15.70 kHz, frame rate 59.9 Hz.
- ADAM, 7 rows: 7.15909 MHz oscillator, Z80 (also on expansion pin 45), VDP, 6801 4 MHz and 1 MHz E, ADAMnet 62.5 kbit/s, line rate.

## Replacements

- ls-controller (74LS541): SN74LS541N (warns that a 74LS244 has a different pinout) and SN74HCT541N (warns never to fit an HC part: the inputs rest at about 2.5 V).
- mcu6801: no part exists (each 6801 has its own mask ROM). This is stated in the summary, because a replacements row needs a buyable part.
- vdp9918 (TMS9928A, F18A): defined in ti.js, which already has F18A and PICO9918 rows. Not edited.

## For other files

- ti.js vdp9918: the F18A row could say that ColecoVision consoles use the 9928A pin set, where pins 35, 36 and 38 carry B-Y, Y and R-Y.
