# Timex features 1-6 verification: waveforms, Sams, first ten minutes, clocks, replacements — 2026-10-30

Data added to `src/data/timex.js` in the shape of docs/data-schema.md, last section. `node scripts/validate-data.mjs sinclair timex`:
0 FAIL, no new Timex warnings (the SCLD pin conflicts were there before).

## Sams folders

| Folder | archive.org | Used |
|---|---|---|
| CC19, Sinclair/Timex Model 2068 (1-88) | `TimexSinclairEphemera`, file `CC-19_Timex _Sinclair 2068.pdf` (26 pages) | Schematic waveform photos (PDF p. 3 = n2, PDF p. 18 = n17); miscellaneous adjustments (p. 7, n7); troubleshooting (pp. 8-9, n8-n9) |
| CC14, Timex TS1000 / Sinclair ZX-81 (1986) | not found on any open host (sold by Sams Photofact) | nothing |

The brief named the TS1000 folder "CC3" and the 2068 folder "CC-series, 1984": the numbers are CC14 and CC19 (1988).

How CC19 waveforms were read (its schematic notes): each photo is 9 cm wide; the three figures are the p-p reading, the time per
cm and the DC level of the bottom graticule line. `low` = bottom line, `high` = low + p-p. Frequencies come from the Technical
Manual (14.112 MHz, /4, /8, /896) or Sams's own adjustment text, never from counting cycles in a photo. Sams photos are not
numbered, so labels name the pin.

## Scope blocks

| Test point | Sams reading | Where | Basis |
|---|---|---|---|
| Master crystal | 5.0 V p-p, 0.1 µs/cm, 0 V, sine | U3 (SCLD) pin 14 | capture |
| AY clock | 5.0 V, 0.2 µs, 0 V | U3 pin 19 to U14 pin 15 line | capture |
| Bus clock /Φ (new test point) | 5.4 V, 0.1 µs, 0 V | U3 pin 10 (arrow on the Φ bus line) | capture |
| Composite video out (new) | 1.9 V, 20 µs, -1 V | J7 MONITOR | capture (period 63.5 µs from TM 2.1.8.3) |
| Chroma oscillator (new) | 4.0 V, 0.1 µs, 7.0 V | U4 LM1889 pin 17 | capture (3.579545 MHz, Sams adjustment) |
| CPU clock, Z80A pin 6 | Zilog limits 0.45 / 4.4 V | Z80A pin 6 | datasheet |
| TS1000 CPU clock | Zilog limits | Z80A pin 6 | datasheet |

Sams photos read but left as text-only test points (no legible rate): R-Y and B-Y at U4 pins 2 and 4 (1.0 / 0.8 V p-p,
10 µs/cm, 5 V), 78S40 U1 drive at R4 (22 V p-p, 10 µs/cm). Also unused: Q3 and Q5 video amp photos, U9 pin 1, the RGB lines,
and a 5 µs/cm pulse on AY-3-8912 pin 2 (TEST 1, which the pin table calls "leave open"; Sams logs it as pulsing).
The beeper check (5 V p-p, about 500 Hz at CR4 with BEEP running) is a text test point: Sams gives no shape.

## firstTen and clocks

| Machine | firstTen | clocks | Main sources |
|---|---|---|---|
| TS2068 | 7 | 7 (NTSC column) | Sams CC19 troubleshooting p. 8 and adjustments p. 7; Technical Manual 2.1.6.1, 2.1.8.2-2.1.8.3 |
| TS1000 | 8 | 3 (NTSC column) | ZX81 Service and Assembly Manual 6 and 9; ZX81 circuit diagram; Andy Rea ULA notes; Zilog UM0080 |
| TS1500 | none | none | no board document with values |

The TS1000 steps and clocks are the ZX81's (same ULA, resonator, ROM) with the TS1000 differences: 6116 at IC4, 60 Hz with ULA
pin 22 tied to 0 V. The two TS1000 clock rows that rest on ZX81 documents carry `verify: true`. The TC2068 (PAL) has no
sourced clocks, so the TS2068 table has only the NTSC column.

## Replacements

| Chip | Row | Source |
|---|---|---|
| AY-3-8912 | YM2149 on a 40-to-28 adapter (SEL pin 26 open or HIGH, else the clock halves) | Yamaha YM2149 data sheet pp. 1-2 |
| TS2068 Extension ROM | 2764 after the Technical Manual rework (pins 1 and 27 HIGH; A13 to pin 26 for a 27128) | TS2068 Technical Manual 2.1.4, p. 18 |
| SCLD | none: no replacement part or module exists that was found | — |

## Conflicts

- Sams vs Technical Manual DC values agree: 20.4 V at the adapter (TM 14-25 V), 12.0 V at U8 (TM 11.5-12.5 V), 5.2 V at the Q1
  collector (TM 4.75-5.25 V at the chips). No `conflict` recorded.
- AY clock: Technical Manual 2.1.6.1 prints 1.76475 MHz; 14.112 MHz / 8 = 1.764 MHz, which the data keeps. Noted in the clock
  row's source label.
- Sams's CPU-clock arrow lands on the buffered Φ line (SCLD pin 10), not ΦCPU (pin 42); the capture went on a new pin-10 test
  point and the scope note says so.
