# Acorn features 1-6 verification: waveforms, first ten minutes, clocks, replacements — 2026-10-30

Data added to `src/data/acorn.js` in the shape of docs/data-schema.md, last section. `node scripts/validate-data.mjs acorn amstrad`:
0 FAIL, and no new warning on any Acorn machine or chip. There are no Sams folders for these machines. Every source below was fetched
on 2026-10-30.

## What the service manuals actually draw

| Manual | Scope material found | Used |
|---|---|---|
| BBC Microcomputer Service Manual, Oct 1985 (`Acorn_BBCSMOct85_Sec1.pdf`, PDF page = printed page + 10), 6.5.1 | Six photos taken with the 6.5.1 test loop running: ADC IC73 pin 23 (1 V/cm, 1 µs/cm), 8271 IC78 pin 24 (1 V/cm, 1 µs/cm), 2 MHz IC1 pin 37 with CAS0 IC45 pin 7, with CAS1 IC45 pin 5, and with RAS IC43 pin 12 (all 2 V/cm, 100 ns/cm), and R/W IC1 pin 34 under the test ROM (1 V/cm, 2 µs/cm) | 2 MHz, RAS, ADC /CS, 8271 /CS |
| Master Series Service Manual, 7 Fault finding | Figure 8 DRAM timing (2 MHz, RAS, CAS, address; no time base or volts) and text levels (16 MHz "4 V peak to peak") | 16 MHz text level |
| Electron Service Manual 0405001, 8.7 b) | Figures 4 and 5, PAL into the modulator at 50 mV/div, 10 µs/div, with printed levels | PAL line |

The brief also expected drawings of the 16 MHz, 1 MHz bus clock, video ULA outputs, cassette and Econet clock. Neither the Model B nor
the Master manual has them: the Model B has only the six 6.5.1 photos, the Master only Figure 8.

None of the photos marks a ground level. For these, `low` is `0 V` and `high` is the swing read off the graticule. Each note says
so. For the "datasheet" rows, the level comes from a figure in the manual text and the frequency from the circuit description.

## Scope blocks

| Machine | Test point | Basis | Reading | Source |
|---|---|---|---|---|
| bbcb | CPU clock in (6502 pin 37) | capture | 2 MHz, 50 %, about 4.2 V p-p | SM85 6.5.1 p. 45 |
| bbcb | DRAM RAS (74S04 pin 12, IC43), new | capture | 4 MHz, about 45 % high, about 3.6 V p-p | SM85 6.5.1 p. 46 |
| bbcb | ADC select under the test loop (7002 pin 23), new | capture | 4 µs period, 1 µs low, about 4.6 V p-p | SM85 6.5.1 p. 44 |
| bbcb | Disc controller select under the test loop (8271 pin 24), new | capture | 3.5 µs period, 0.5 µs low, about 4.6 V p-p | SM85 6.5.1 p. 45 |
| bbcmaster | Master oscillator (VIDPROC pin 8) | datasheet | 16 MHz, 4 V p-p (manual text) | MSM 7.1.2 step 3, p. 32 |
| electron | Master clock (ULA pin 49) | datasheet | 16 MHz, 4 V p-p (manual text) | ESM 8.2, p. 10 |
| electron | Cassette out (ULA pin 50) | datasheet | 2400 Hz sine, 1.8 V p-p (manual text; tone from the EAUG p. 213) | ESM 8.8, p. 13 |
| electron | PAL into the modulator, new | capture | 64 µs line, sync tip 2.6 V, black 2.9 V, burst to 3.05 V, white 3.3 V | ESM 8.7 b) Figs 4-5, pp. 12-13 |

Totals: 5 capture and 3 datasheet. The old Model B test point "CPU clock in / out" is now two rows (pin 37 with the photo, pin 3 without),
because the photo is of pin 37 only. On the Master, the oscillator `where` became `VIDPROC pin 8`. IC43's type on the Master is not clear in
the parts list scan, so the 74S04 is not listed as fitted there.

Not backed, so these have no scope block: CAS0 and CAS1 (photographed at IC45, a 74S139 that is not a chip in the file), the R/W photo
(an irregular trace that depends on the test ROM), the Master RAS and CAS (Figure 8 gives the shape but no levels, and `dram4464` in
atari.js has no pins to link) and every VIDPROC output (the manuals say "clean square wave, TTL levels" with no numbers).

## firstTen and clocks

| Machine | firstTen | clocks | Sources |
|---|---|---|---|
| bbcb | 8: +5 V at the three push-on pairs, -5 V, reset, 16 MHz, divided clocks, IRQ, SYNC/R/W, CRTC syncs | 13 | SM85 3.1, 3.3, 3.4, 3.5, 6.3 i-vi, 6.4 (PDF pp. 19, 27, 29, 49-51); AUG 19.1.4 |
| bbcmaster | 8: supply LED, +5 V, 16 MHz, VIDPROC clocks, CPU clock, bus lines, RAS/CAS, CRTC | 12 | MSM 7.1.1-7.1.3, 5, 7.2-7.7, parts list (pp. 20, 31-34, 39-44, 58); AUG 19.1.4 |
| electron | 8: adaptor AC, PSU +5 V loaded, -5 V, board current, 16 MHz, ULA outputs, CPU, ROM | 8 | ESM 5, 8.1-8.8 (PDF pp. 13, 16-19); EAUG pp. 213, 228 |

On the push-on tabs (`+5V-1` and the others) and the Master DRAM legs, the validator's pin syntax cannot address the pad (the names
contain `+` and `-`, and the 4464 has no pins). Those `where` strings avoid the word "pin" and stay plain text.

## Replacements

| Chip | Rows | Source |
|---|---|---|
| vidproc | VLSI VC2069 (pin-compatible); VC2023 (needs the patch wire); VideoNuLA (modern, A1 flying lead) | BeebWiki Video ULA |
| serproc | VLSI VC2026 (tone-swap bit breaks BASICODE 2, Facemaker, Caveman Capers); Ferranti 2C199E issues (R75 value) | BeebWiki Serial ULA; SM85 6.4 p. 41 |
| saa5050 | SAA5051/5052 (German, Swedish); SAA5053/5054/5055 (`verify`: Wikipedia only, sources disagree on the 5054) | Philips 1979 Part 6b p. 13; Wikipedia |
| fdc8271 | Acorn 1770 Disc Interface Module kit 0433,050 (adapter); RetroClinic 177x (modern) | Acorn fitting instructions PDF p. 8; Retro-Kit |
| fdc1770 | WD1772 (step rates 2/3/5/6 ms against 6/12/20/30 ms) | WD 1984 handbook p. 48 (PDF p. 58) |
| cpu65sc12 | WDC W65C02S (pins 1 VPB and 5 MLB are outputs that the Master grounds; BE on 36) | WDC data sheet pp. 9-13 |
| elk_ula | JamSoft Electron ULA, iCE40 (socket swap, NMI ignored, development stopped) | GitHub README |

No modern FPGA replacement for the BBC Serial ULA was found. For the Video ULA, the only modern replacement found is the VideoNuLA board.
The 4464 rows in the brief are not entered because `dram4464` belongs to atari.js.

## Conflicts and notes

- SM85 6.3 calls the video processor IC5 in one sentence and IC6 in the next. The circuit diagram and the chip record say IC6, and IC6 is used here.
- The SM85 6.4 scan gives R75 as "100x or 56k" for the 2C199E and 2C199E-3. It is read as 100K.
- Master SM 7.1.3 says VSYNC and HSYNC "pulse low". The 6845 data sheet gives HS and VS as active high. The firstTen text says "pulse" without a polarity.
- `ttl7404` is now also fitted on the bbcb (IC43). Its summary has one added sentence.
