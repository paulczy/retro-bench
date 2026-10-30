# Tandy features 1-6 verification: waveforms, Sams, first ten minutes, clocks, replacements — 2026-10-30

Data added to `src/data/tandy.js` in the shape of docs/data-schema.md, last section. `node scripts/validate-data.mjs tandy`:
0 FAIL. The only new Tandy warnings are the five connector-pin `conflict` records below, which are intended.

## Sams folders used

| Folder | archive.org item | Used |
|---|---|---|
| CC13, Color Computer 26-3002 (1-86) | `Sams_Computerfacts_Color_Computer_1986_Howard_Sams` (image only; OCR from the item's `_text.pdf`) | Schematic waveforms at the SAM (PDF p. 11) and VDG (p. 32); troubleshooting pp. 17-18 |
| CC15, Color Computer 2 26-3134/3136 | `Sams_Computerfacts_Color_Computer_2_1986_Howard_Sams` | Schematic waveforms at the SAM, CPU (p. 11) and VDG (p. 13); troubleshooting pp. 17-18 |
| CSCS3, TRS-80 Model I | `Sams_ComputerFacts_Model_I_1985_Howard_Sams` | CPU board clock waveforms (p. 13); troubleshooting p. 18 |
| CSCS5, TRS-80 Model III | `sams-computerfacts-trs-80-model-iii-1985-howard-sams` | PCLOCK (p. 19), oscillator, HSYNC, VSYNC (p. 20); troubleshooting pp. 28-29 |
| CSCS13, Model 4 Gate Array | `Sams_Computerfacts_for_Model_4_Gate_Array_1986_Sams` | Timing array U9 waveforms (p. 16); troubleshooting pp. 44-45 |

No Sams folder for the CoCo 3, the MC-10 or the 1983 (non-gate-array) Model 4 board was found on archive.org. The CoCo 3
service manual has its own photos (section 6.11, Waveforms 1-14) but they carry no ground reference, so no levels can be read.

archive.org anchors are `details/<id>/page/n<PDF page - 1>`; checked by aspect ratio of the leaf images (foldout leaves are
the wide ones). How Sams waveforms were read: each photo is 7 cm wide; the figures beside it are the p-p reading, the time per
cm and the DC level of the trace bottom. `low` = trace-bottom level, `high` = low + p-p. Frequencies come from the Tandy
manuals or the Sams troubleshooting text, never from counting cycles in a photo.

## Scope blocks

| Machine | Test point | Basis | Reading | Probed |
|---|---|---|---|---|
| CoCo 1 | Crystal | capture | 2 V p-p on 0.6 V, 0.1 µs | SAM pin 5 |
| CoCo 1 | E, Q | capture | 5 V, 1 µs, 0 V | SAM pins 14, 13 |
| CoCo 1 | VDG clock | capture | 2.5 V on 0.6 V at VDG pin 33 (3.3 V on 0.4 V at SAM pin 7) | VDG pin 33 |
| CoCo 1 | Horizontal sync (new) | capture | 5 V, 20 µs, 0 V | SAM pin 9 |
| CoCo 1 | Field sync (new) | capture | 5 V, 5 ms, 0 V | VDG pin 37 |
| CoCo 2 | Crystal oscillator (moved to SAM pin 6) | capture | 2.6 V on 0.6 V, 0.1 µs | SAM pin 6 |
| CoCo 2 | E, Q | capture | 5.0 V, 1 µs, 0 V | SAM pins 13, 14 |
| CoCo 2 | VDG clock | capture | 4.0 V, 0.2 µs, 0 V | SAM pin 7 and VDG pin 33 |
| CoCo 2 | Horizontal sync (new) | capture | 4.8 V, 20 µs, 0 V | SAM pin 9 |
| CoCo 2 | Field sync (new) | capture | 5.0 V, 5 ms, 0 V | VDG pin 37 |
| CoCo 3 | E and Q | datasheet | 6809E E input limits 0.4 V / Vcc - 0.75 V (DS p. 2); 0.89 MHz from SM Table 3 p. 51 | GIME pins 6, 7 |
| Model I | Master oscillator | capture | 5 V, 0.2 µs, 0 V | Z42-6 |
| Model I | CPU clock | capture | 6 V p-p from -1 V, 0.2 µs | Z40 pin 6 |
| Model III | CPU clock | capture | 6 V from -0.5 V, 0.2 µs | PCLOCK (U74-8) |
| Model III | Video oscillator | capture | 3.2 V, 0.5 µs, 0 V | after U2-10 |
| Model III | Horizontal rate | capture | 5 V from -0.5 V, 20 µs | U23-13 |
| Model III | Vertical sync (new) | capture | 3 V, 5 ms, 0 V | U23-12 |
| Model 4 | Master oscillator | capture | 6 V, 0.1 µs, 0 V | U9-1 (gate-array board) |
| Model 4 | RS-232 clock | capture | 5.0 V, 0.1 µs, 0 V | U9-22 (gate-array board) |
| Model 4 | CPU clock | datasheet | Z80 clock input limits 0.45 V / Vcc - 0.6 V (Zilog PS0178 p. 33, Z8400 NMOS); 4.05504 MHz from TRM 3.1.2 | Z80A pin 6 |

Sams errata noted: CC15 labels the VDG pin 33 photo "20 µs" although it shows five cycles in 7 cm (0.2 µs/cm, as at the SAM).

Not backed, left without a scope block:
- 6847 Y (luminance) output: the data sheet (p. 3) gives sync 1.0 V, black 0.72 V, white 0.42 V, so the signal is inverted
  (sync most positive). The app's `video-line` draws `low` as the sync tip, so it cannot show it correctly. Sams levels
  (0.5 V p-p on 0.5 V) are recorded only here. ΦA/ΦB chroma (1.1 V p-p on 1 V, Sams) left out for the same reason.
- SAM /RAS, /CAS (Sams 5 V, 0.5 µs) and DA0: no sourced frequency.
- Model 4 PCLK photo at U9-13: Sams does not say which speed the photo was taken at.
- CoCo 3 crystal, composite video, RAS/CAS: Tandy photos have no ground reference; no GIME data sheet.
- MC-10: no Sams folder and no 6803 data sheet in hand (bitsavers has the MC6801 Reference Manual; not opened).

## firstTen and clocks

| Machine | firstTen | clocks | Main sources |
|---|---|---|---|
| CoCo 1 | 8 | 4 | Sams CC13 troubleshooting pp. 17-18 |
| CoCo 2 | 8 | 5 | Sams CC15 pp. 17-18; CoCo 2 SM (26-3026) 5.4.2 p. 78, SAM p. 30, PIA p. 38 |
| CoCo 3 | 8 | 4 | CoCo 3 SM 6.4 p. 56, 6.10 p. 58, 5.13 p. 52, Table 3 p. 51; Sopko schematic |
| MC-10 | 8 | 3 | MC-10 SM pp. 12, 22, 23 |
| Model I | 8 | 5 | Sams CSCS3 p. 18; TRH pp. 14, 60, 69; EI SM p. 5 |
| Model III | 8 | 6 | Sams CSCS5 pp. 28-29; Model III SM pp. 67-69; TRM pp. 13, 16, 46, 57 |
| Model 4 | 8 | 8 | Model 4 TRM pp. 15, 21, 112-114; Sams CSCS13 pp. 44-45 (gate-array board); 4/4P TRM p. 51 |

Pins on chips the file does not define (Z42, U2, U23, U9, the SALT) are written `Z42-6` style so the validator does not warn.
CoCo 2 steps mix Sams CC15 (26-3134/3136 board) and the Tandy 26-3026 manual; designators are given for both where they differ.

## Replacements

| Chip | Rows | Source |
|---|---|---|
| cpu6809e | MC68A09E (1.5 MHz); MC68B09E (2 MHz, needed for CoCo 3 double speed); HD63B09E/HD63C09E (illegal-opcode trap via $FFF0) | MC6809E DS p. 2; HD63B09EP Technical Reference Guide, Error Trapping |
| vdg6847 | MC6847P; MC6847T1 (adapter: different pinout, LS783/LS785 only) | MC6847 DS p. 1; MC6847T1 Advance Information p. 1 |
| sam6883 | SN74LS783; SN74LS785 (`verify`: differences not in hand) | MC6883 DS p. 5-323; MC6847T1 p. 1 |
| gime-tcc1014 | TCC1014 from another CoCo 3 (1986 vs 1987 versions; `verify`) | CoCopedia GIME |
| cpu6803 | HD6803P | MC-10 SM parts list p. 27 |
| sram2102 | 2102A / 2102AL any grade | Intel 1978 catalog |
| cg-mcm6670 | MCM6674 (`verify`: character set may differ) | Motorola 1979 Memory Data Book p. 2-112 |
| fdc1771 | FD1771A-01 / B-01; Percom Doubler (adapter) | WD1771 DS package page; trs-80.org |
| fdc1793 | FD1797 (`verify`, pin 25); FD1791/1795 (inverted bus); WD2793; WD1773 | FD179X-02 p. 1; WD279X-02, WD177X-00 data sheets (archive.org) |

Not added: 4116 (`dram4116`, sinclair.js) and 4164 (`dram4164`, commodore.js) replacements: those files own the chips.

## Conflicts recorded

- CoCo 1 `coco1-psu` pin 1: Sams CC13 asks for 36 V AC across connector E pins 1-2; the TRM gives a 33.5 V AC winding. TRM
  stands. E3 expect now carries the Sams reading (about 11 V DC to ground).
- Model I `model1-power` / `ei-power` pins 1, 2 (shared pin table): Sams CSCS3 reads 18.5 V AC and 23.6 V DC unplugged;
  TRH says about 17 V AC and 19.8 V DC. TRH stands.
- CoCo 2 chroma bias (VDG pin 9, new test point, in the `expect` text since test points have no conflict display): Tandy
  says usually 0.75-1 V; Sams reads 1.5 V; the 6847 data sheet gives 0.3 × Vcc.

Other changes: `chipLocations.model4.cpuz80` adds U1 on the gate-array board (Sams CSCS13).
