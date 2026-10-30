# Atari: test-point waveforms, first ten minutes, clocks, replacements (features 1-6)

Data in `src/data/atari.js` (power blocks `pw400` ... `pw130xe`, chip `replacements`). `node scripts/validate-data.mjs atari`: 0 FAIL, no new warnings.

## Sams Computerfacts folders used

| Machine | Folder | archive.org | Pages used (PDF page = archive leaf + 1) |
|---|---|---|---|
| 400 | CC5 (8-84) | https://archive.org/details/SamsComputerfactsAtari400B | 3 service checks, 17 troubleshooting, 40 CPU board schematic (Sams pp. 28-29) |
| 800 | CC7 (1984) | https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel800computer1984sams | 3 service checks, 18 troubleshooting, 10 CPU/main board schematic (Sams pp. 3, 42) |
| 800XL | CC11 (7-85) | https://archive.org/details/atari800xlsamscomputerfactstechnicalservice | 3 schematic p. 2, 25 schematic pp. 27-29, 6-7 troubleshooting, 27 service checks |
| 130XE | CC16 (8-86) | https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams | 3 and 5 schematic, 12-13 troubleshooting |
| 600XL | none found on archive.org | | |

Reading the photos: Sams notes say each photo is 7 cm wide, time per cm and p-p reading printed beside it, DC reference at
the bottom line. So `low` = reference, `high` = reference + p-p. Frequencies come from the Sams text where it gives one;
otherwise from the cycle count on the photo plus the named timing source (stated in each `note`).
`S.sams` (130XE) now sets `sams: true`, as the schema asks.

## Added per machine

| Machine | Scope (capture / datasheet) | firstTen | clocks |
|---|---|---|---|
| 400 | 4 / 1 (colour clock, PHI0, PHI2, CSYNC; K0 datasheet) | 7 | 7 |
| 800 | 4 / 1 (colour clock, fast phase 0, PHI0, PHI2; K0 datasheet) | 7 | 7 |
| 600XL | 0 / 1 (K0 datasheet) | 7 | 7 |
| 800XL | 11 / 0 (colour clock, fast phase 0, PHI0, PHI2, HALT, CSYNC, composite video, luma, K0, tape data out, /RAS) | 8 | 7 |
| 130XE | 9 / 1 (14.318 MHz master, colour clock, fast phase 0, PHI0, PHI1, PHI2, HALT, CSYNC, /RAS; K0 datasheet) | 8 | 7 |

The 400 and 800 no longer share one power object; each machine has its own test points. Rails on the 400/800 carry the
Sams measured values in `note`.

Datasheet basis: POKEY data sheet C012294 Rev. B (http://visual6502.org/images/C012294_Pokey/pokey.pdf): sheet 10
(K0-K5 a 6-bit counter stepped once per line), PDF p. 22 (K0-K5 VOH 4.3 V, VOL 0.4 V).

Replacements: 6502C (SALLY), ANTIC (NTSC, PAL), GTIA (CTIA upgrade, PAL/SECAM), POKEY (suffix variants, PokeyMAX),
FREDDIE (CO61991/CO61922). Supply notes: added the ami64 RetroPower regulated brick (maker page).

## Corrections

- **Fast phase 0 (GTIA pin 29 to ANTIC pin 35)** was 1.79 MHz in the test points and in the ANTIC pin 35 / GTIA pin 29
  probes, with no source. The Sams photos of the 800 (about 12 cycles at 0.5 µs/cm), 800XL (5-6 cycles at 0.2 µs/cm)
  and 130XE (2.5 cycles at 0.1 µs/cm) all show the colour clock rate, 3.58 MHz; ANTIC halves it to make PHI0 (pin 34,
  1.79 MHz on the same sheets). Changed to 3.58 MHz.
- **800XL monitor jack**: was FAQ-only with `verify: true`. The Sams 800XL schematic gives J2 1 lum., 2 ground, 3 audio,
  4 comp. video, 5 NC, matching the table. `verify` cleared, Sams added as a source.

## Conflicts and Sams quirks

- Sams CC5 and CC7 print the 400/800 crystal X101 as 3.579575 MHz (once 3.57957 MHz). The NTSC subcarrier and the 800XL
  FSM give 3.579545 MHz. Data uses 3.579545 MHz and says so in the note.
- Sams "5.0 V from pin 3 to pin 1 of P7" (XL/XE brick) agrees with our DIN numbering (1 = +5 V, 3 = return).
- No Sams DC value contradicted a field-service-manual `expect`; no `conflict` fields added.
- Sams 800XL and 130XE name GTIA pins 12, 13, 14 Start, Select, Option, the same as the 800XL FSM; the existing pin 12
  conflict note (Hardware Manual CONSOL bit order) stands.

## Not backed, left out

- 600XL: no Sams folder and no FSM waveforms with levels, so no captures. The 6502 data sheet gives no VOH/VOL for the
  clock outputs, so no datasheet PHI2 block either.
- SIO at 19.2 kbaud: the 800XL FSM gives the rate and bit order but no levels or timing diagram for the clock-out line;
  data is not periodic. No scope block.
- ANTIC and GTIA data sheets: retromicro.com is gone, the Wayback Machine refuses scripted fetches, AtariWiki returned
  502 all session. Their pin-35/29 rates rest on the Sams photos only.
- 400 fast phase 0 photo: arrow not traced with confidence; expect text only.
- Composite video and luma (800XL): Sams measured on the board; level into 75 Ω not given (the jack pin says about 1 V).
- Replacements not added for lack of a source a human can open: MMU C061618 (no maker page for a GAL/PLA substitute),
  400/800 OS ROM substitutions, 4464 equivalents. The 4164 belongs to commodore.js.
- FREDDIE has no pin table, so 130XE test points name it as "U6 (FREDDIE) input 2" (no pad link). Sams pins used:
  2 = 14.31818 MHz in, 37 = OSC out, 5 = phase 2.
