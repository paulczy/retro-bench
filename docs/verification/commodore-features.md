# Commodore: waveforms, first ten minutes, clocks, replacements (roadmap features 1 to 6)

Data in `src/data/commodore.js` (`power.<machine>.firstTen`, `.clocks`, `testPoints[].scope`, `chips.<id>.replacements`).
Shared source helpers (`SAMS_*`, `CBMF`) sit after `CBMD_SRC`. Validator: 0 FAIL, warnings unchanged (90).

## Sams Computerfacts folders used

| Machine | Folder | Pages read |
|---|---|---|
| C64 | CC17, C64 (1984 version): https://archive.org/details/sams-computerfacts-cc17-c64-1984-version | 4 service checks, 9 schematic and waveforms, 14-15 troubleshooting |
| C128 | CC18: https://archive.org/details/SAMS_Computerfacts_CC18_C128 | 3 service checks, 9 adjustments, 12 and 49 schematic, 25 troubleshooting, 33 parts |
| C16 | CC8: https://archive.org/details/SAMS_Computerfacts_CC8_Commodore_16 | 4 service checks, 10 schematic and waveforms (image only, no text layer) |
| Plus/4 | CC9: https://archive.org/details/SAMS_Computerfacts_Commodore_Plus_4_1985-01_Howard_W_Sams_Co_CC9 | 3 service checks, 12 schematic, 18 troubleshooting, 21 parts |
| 1541 | CD4, VIC-1541/1541: https://archive.org/details/sams-computerfacts-cd4-1541 | 10 schematic (short board 251748: UC4 6502, UC1 325572) |
| 1571 | CD12: https://archive.org/details/SAMS_Computerfacts_CD12_1571 | 4 service checks, 11 schematic, 24 troubleshooting |
| 1581 | CD22: https://archive.org/details/SAMS_Computerfacts_CD22_1581 | 5 service checks, 12 schematic |

Also on archive.org, not used this pass: CC4 (C64, image only), CC20 (64C), CSCS25 (C128D), CD20 (1541-II).
No Sams folder found for the VIC-20 or the PET (archive.org and zimmers.net searched).

Reading the photos: Sams prints the p-p swing, the sweep per cm and the DC level of the bottom line; the
graticule is 9 cm. `low` is the bottom-line value and `high` is bottom + p-p. Frequencies come from the maker's
documents, never from counting cycles.

## Scope blocks (all `basis: 'capture'`)

| Machine | Test point | Sams reading |
|---|---|---|
| C64 | CIA pin 25 (Φ2) | 5 V p-p over 0 V, 0.2 µs/cm |
| C64 | VIC-II pin 16 (AEC, measured at U8 7406 pin 3) | 4.5 V p-p over 0 V, 0.5 µs/cm |
| C64 | 6510 pin 5 (CAEC) | 5 V p-p over 0 V, 0.2 µs/cm |
| C16 | TED pin 14 (master clock, at Q2) | 3.6 V p-p over 0 V, 0.2 µs/cm |
| Plus/4 | TED pin 14 | 4 V p-p over 0 V, 0.2 µs/cm |
| 1541 | 6502 pin 37 (at R1 on the 1 MHz line) | 4.2 V p-p over 0 V, 0.5 µs/cm, 4 cycles |
| 1541 | 6502 pin 39 | 5 V p-p over 0 V, 0.5 µs/cm, 4 cycles |
| 1571 | 251829 pin 1 (16 MHz) | 4.8 V p-p over 0 V, 0.1 µs/cm, sine-like |
| 1571 | 6502 pin 37 | 3.5 V p-p over 0 V, 0.2 µs/cm (1541 mode) |
| 1571 | 6502 pin 39 | 5 V p-p over 0 V, 0.2 µs/cm |
| 1581 | Y1 16 MHz module | 3 V p-p over a 0.7 V bottom line, 0.1 µs/cm |
| 1581 | 6502 pin 37 | 4 V p-p over 0 V, 0.5 µs/cm (2 MHz) |

The CC17 C64 photos do not fit their printed sweep: three cycles of the 1 MHz Φ2 in 9 × 0.2 µs. Levels kept,
noted on each block. The drive photos fit their sweeps.

Not added, and why:
- C64 /RAS (4164 pin 4), /CAS (PLA pin 18), BA, R/W, keyboard, POT and video photos exist, but no document in
  hand gives their repetition rate, and `f` or `period` is required.
- C128 CC18: the 8502 pin 1, MMU GAEC and 74LS257 MUX photos use a -2 V or -2.5 V bottom line (AC-coupled view),
  so absolute levels cannot be read. The scan has no video, VDC or RAM sheet.
- C16 and Plus/4 /RAS and MUX (TED pins 10, 9): same reason as the C64 strobes.
- No datasheet-basis blocks. None of the candidates has both a datasheet timing diagram for the levels and a
  schematic frequency in hand.

## Conflicts

- C64 reset: the service manual (PDF p. 9) gives a 556 pulse of about 0.5 s; Sams CC17 (p. 14) says the probe
  reads LOW for about two seconds. firstTen uses the manual.
- C64 brick: Sams CC17 power check (p. 4) says 5.08 V "across pins 2 and 4 of CN7", but its own troubleshooting
  says 4.91 V at pin 5, and the 902503-02 schematic puts +5 V on pin 5 (pin 4 not connected). Sams error;
  firstTen uses pin 5 to pin 2 with the 5.08 V value.
- C64 +5 V rail: Sams reads 4.9 V at the IC pins, just under our 4.95-5.10 V. `conflict` set on the rail row.
- C16 supply: Sams CC8 expects about 13 V DC from the unloaded pack; schematic 251788 rates it 9 V DC. `conflict`
  set on the `+9 V DC in` rail row.
- C128 CPU clock: Sams CC18 labels 8502 pin 1 "2MHz" (someone wrote "1 MHz ?" on the scanned photo). The test
  point keeps 1 MHz, with 2 MHz in FAST mode.
- 1581 CN1: Sams CD22 (p. 5) agrees with the schematic: +5 V on CN1 pin 4, +12 V on pin 1. Added to the supply
  note, which records Carlsen's opposite reading.

## Fixes made on the way

- 1571 and 1581 `where` strings named `64H157`, `64H156` and `WD1770`, which match no chip short and did not
  link. They now read `251829 pin 1`, `251828 pin 37` and `1770 pin N`.
- C16 and Plus/4 no longer share one test-point array. `CBM264_TP(scope)` copies `CBM264_TESTPOINTS` and adds
  each machine's own Sams capture to TED pin 14.

## Gaps

- VIC-20 PAL crystal: no source in hand, so the clocks table gives NTSC only.
- C128 PAL: only the dot clock and crystal have PAL values, both taken from the 8701 notes on C64C schematic 250469.
- The 1541 gate arrays (325572, 251828, 251829) have no replacements: no purchasable part or wiki page found.
- 4464/41464 RAM: no backed swap. They are not pin-compatible with the 4164.
- The 6526 vs 8521 timer-interrupt difference is not stated, because none of the sources in hand gives it.
