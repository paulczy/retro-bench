# Apple features 1-6 verification: waveforms, Sams, first ten minutes, clocks, replacements — 2026-10-30

Data added to `src/data/apple.js` in the shape of docs/data-schema.md, last section. `node scripts/validate-data.mjs apple`:
0 FAIL, no Apple warnings.

## Sams folders used

| Folder | archive.org item | Used |
|---|---|---|
| CC1, Apple II and II Plus (CF1, 1984) | `Sams_Computer_Facts_Apple_II_II_Plus` | Timing generator schematic waveforms (p. 5, n12); troubleshooting: oscillator at UB2-10, dividers, CPU and chip-select checks (pp. 12-13, n19-n20) |
| CC10, Apple IIe (3-85) | `Sams_Computer_Facts_Apple_IIe` | Service check 1 "Computer dead" (scan p. 9, n8); replacement parts (n7); parts list replacement data (p. 17, n36); CPU, timing and video schematic waveforms (scan pp. 61, 62, 64; n60, n61, n63). The scan also binds Apple technical-procedures pages (board ID, ROM sets, n3-n6). |
| CSCS7, Apple IIc (9-85) | `Sams_Computer_Facts_Apple_IIc` (image only; OCR from the item's djvu text) | Troubleshooting: power supply and CPU operation (p. 8, n12); schematic waveforms at the 65C02, OS1 and TMG (scan pp. 5, 6; p. 27 = n4, n5, n31) |
| CD6, Disk II (A2M0003) | `Sams_Technical_Disk_II` | Analog board schematic waveforms at TP5 and TP7 (p. 15, n26); parts list replacement data (p. 8, n19) |

No Sams folder was found for the DuoDisk or UniDisk 5.25 (the IIc folder points to CSCS7-A for its own disk drive; not on archive.org).

How Sams waveforms were read (CC10 schematic notes): each photo is 7 cm wide; the figures beside it are the p-p reading,
the time per cm and the DC level of the trace bottom. `low` = trace-bottom level, `high` = low + p-p. Frequencies come from
Sather Table 3.1 (II: n37; IIe: Sather IIe n46) or the Apple manuals, never from counting cycles in a photo. Sams designators
on the II/II Plus match Apple's board grid (Sams UB1 pins 3, 6, 7, 15 = Sather's B1-3, B1-6, B1-7, B1-15); on the IIe and IIc
they are Sams's own, so `where` names them as "Sams designator".

## Scope blocks (all basis `capture`)

| Machine | Test point | Sams reading | Where Sams probed |
|---|---|---|---|
| II / II Plus | 14M | 4.5 V p-p, 0.2 µs/cm, 0 V | UB2-8 (74S86) |
| II / II Plus | Colour reference | 4 V, 0.2 µs, 0 V | UB1-3 |
| II / II Plus | Φ0, Φ1 | 4.1 V, 0.2 µs, 0 V | UB1-7, UB1-6 |
| IIe | Master clock (14M) | 4.2 V, 0.2 µs, 0.2 V | UE1-11 (74LS125) |
| IIe | 7M | 5 V, 0.2 µs, 0 V | UC1-6 (74F109) |
| IIe | PHI0 | 5 V, 0.5 µs, -1 V | 6502 pin 37 |
| IIe | PHI1, Q3, /PRAS | 5 V, 0.5 / 0.2 / 0.2 µs, -1 V | timing HAL UD1 pins 14, 16, 19 |
| IIe | Video out | 2.5 V, 10 µs, 0 V | Q2 emitter, ahead of R8 75 Ω |
| IIc | Master clock | 4.7 V, 0.1 µs, 0 V | OS1 pin 3 |
| IIc | 7M, VID7M | 4.7 V / 5 V, 0.1 µs, 0 V | TMG pins 2, 13 |
| IIc | PHI0 | 4 V, 0.5 µs, 0 V | 65C02 pin 37 |
| Disk II | TP5 comparator offset | 5 V, 10 µs, -4 V | TP5 |
| Disk II | TP7 read data | 3.5 V, 10 µs, 0 V | TP7 |

The IIe video period (63.7 µs = 64 × 0.978 µs + 1.117 µs) and the Disk II pulse spacing (4 µs bit cell, Sather p. 9-24) are
from Sather, as the notes say.

No `datasheet`-basis blocks were needed: every clock the brief listed has a Sams photo. Not backed and left without a scope
block: Disk II TP8/TP9 (Apple's figure has no graticule, so no period), TP1/ribbon pin 16 (no photo, no levels in hand),
IIe SYNC and MMU outputs (not periodic), IIc colour reference, Q3 and Φ1 (photos present but the arrows could not be matched
to a pin with confidence), Q3 and /RAS on the II (same).

## firstTen and clocks

| Machine | firstTen | clocks | Main sources |
|---|---|---|---|
| II / II Plus (shared `iiPower`) | 7 | 7 | II Reference Manual pp. 92, 94; Sams CC1 pp. 12-13; Sather Fig. 3.2, Table 3.1 |
| IIe | 8 | 7 | IIe TRM p. 160, Tables 7-20/7-21; Sams CC10 service check 1; Sather IIe Table 3.1 |
| IIc | 7 | 6 | Sams CSCS7 p. 8; IIc TRM TMG pinouts p. 245 |
| Disk II | 8 | 2 | Disk ][ Technical Procedures pp. 2.8, 3.4-3.6, 5.5; Sams CD6 p. 6; Sather pp. 9-6, 9-9, 9-24 |
| DuoDisk | 7 | 2 | DuoDisk Technical Procedures pp. 3.2, 4.2, 4.5; TA37054 cable table |
| UniDisk 5.25 | 6 | 4 | IIc TRM pp. 234, 247-248, 273; TA37054; DuoDisk TP p. 2.2 |

The DuoDisk and UniDisk controller-card sequencer clock rows carry `verify: true`: the card is the Disk II circuit, but its
74LS323/74LS174 pin use was taken from the Disk II card.

## Replacements

| Chip | Rows | Source |
|---|---|---|
| cpu6502 | 65C02 (pin-compatible, Enhanced IIe ROM rule); WDC W65C02S (modern: pins 1, 5, 36) | Apple board-ID page in the CC10 scan; WDC data sheet pp. 9-13 |
| mmu344, iou344 | Another 344-0010 / 344-0020 only | Sams CC10 p. 17: no replacement data for either |
| mc3470 | MC3470A; ECG3470 | Motorola data sheet p. 1; Sams CD6 p. 8 |
| ca3146 | CA3146AE; CA3046 (VCEO 15 V trap); RCA SK3697 | RCA 1978 databook PDF pp. 115, 211; Sams CD6 p. 8 |
| ls125 | 74HCT125 | TI SN74HCT125 pp. 3-4 |
| ls259 | 9334 / 74259; 74HCT259 | Sams CC10 parts (N9334N on the Disk II card); TI CD74HCT259 p. 3 |
| ls174 | 74HCT174 (switched-VCC trap) | TI CD74HCT174 pp. 1, 3 |

Not added: ULN2003 vs µPA2003 (`uln2003` is defined in commodore.js; Sams CD6 crosses the ULN2003A to NTE2013 / ECG2013 /
SK9093, for whoever owns that file); the IWM (no source found that says whether anything substitutes); 74LS323 (no HCT part);
the 2716-for-2316 adapter (the chip summary already says it; no adapter source in hand).

## Conflicts recorded

- IIe +5 V rail: Sams CC10 gives 5.3 V at P14 pin 3 with the supply unplugged from the board (also 12.5, -11.9, -5.0 V on pins
  4-6). Apple's 4.85-5.15 V stands; `conflict` on the rail.
- IIc +15 V in: Sams CSCS7 reads 18.2 V off load across plug pins 2 and 6; Apple's +15 V stands; `conflict` on the rail.

## Open points (not changed)

- Disk II TP5: on Apple schematic 050-0007-H TP5 appears to hang on the MC3470 pin 7 node (with R33), and Sams also draws it
  on pin 7. The data says pin 6. Needs a clean look at the schematic before changing.
- IIe chip locations: Sams CC10 puts the 6502 at UC4, the MMU at UE4 and the IOU at UE5; apple.js says 6502 B4, MMU E6.
  Sams designators may not match Apple's silkscreen; check against a board photo.
