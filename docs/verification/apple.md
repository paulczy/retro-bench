# Apple verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| Apple II Reference Manual (1979, II and II+) | https://archive.org/details/Apple_II_Reference_Manual_1979_Apple | Power supply (pp. 92-94), 9316B ROM pinout (p. 95), video jacks and auxiliary video (pp. 97-98), game I/O (p. 100), keyboard connector (pp. 102-103), cassette (p. 103), power connector (p. 104), speaker and slots (pp. 105-109), memory map (p. 68) |
| Apple II Red Book (1978) | https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/machines/Apple%20II%20Reference%20Manual%20-%20The%20Red%20Book%20v2.pdf | Switching supply operation, minimum load, rail tolerances (pp. 110-111) |
| Apple IIe Technical Reference Manual (1985) | https://archive.org/details/Apple_IIe_Technical_Reference_Manual | PSU specs and connector (pp. 159-161), MMU and IOU pinouts (pp. 165-167), keyboard, speaker, cassette, video, game I/O (pp. 186-191), expansion and auxiliary slots (pp. 195-199), memory map (p. 73), reset (p. 91) |
| Apple IIe Technical Reference Manual (1987 edition) | https://archive.org/details/apple-iie-technical-reference-manual-1987-edition | Corrected keyboard connector table (pp. 187-188) |
| Apple IIc Technical Reference Manual (2nd ed.) | https://archive.org/details/Apple_IIc_Technical_Reference_Manual | External supply and internal converter (pp. 233-234), MMU, IOU, TMG, GLU, IWM pinouts (pp. 242-248), headphone jack (p. 256), video, DB-15, disk DB-19, serial DIN-5, 6551, mouse and hand-control DE-9 (pp. 270-287) |
| MOS 6500 Microprocessors data sheet (Nov 1985) | http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf | 6502 40-pin pinout (p. 10) |
| WDC W65C02S data sheet | https://www.westerndesigncenter.com/wdc/documentation/w65c02s.pdf | W65C02S pinout (p. 13): VPB, MLB, BE differences |
| GI AY-5-3600 data sheet | http://www.bitsavers.org/components/gi/_dataSheets/AY-5-3600.pdf | Pin configuration, option pins, supply conditions |
| National 1977 MOS/LSI Databook, MM5740 | http://www.bitsavers.org/components/national/_dataBooks/1977_National_MOS_LSI_databook.pdf | MM5740 connection diagram and supplies (pp. 10-2 to 10-4, PDF p. 575) |
| Computer History Museum catalog 102735572 | https://www.computerhistory.org/collections/catalog/102735572 | IIc brick model number A2M4017 |
| Applefritter node 33594 (forum, secondary) | https://www.applefritter.com/node/33594 | RIFA X2 caps in Astec supplies; Dyna-Comp in later IIe (marked verify) |

Page anchors use archive.org leaf numbers (`/page/n<PDF page - 1>`). Every URL above returned HTTP 200 on 2026-10-30.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| cpu6502 | 40/40 | MOS 6500 data sheet (Nov 1985), p. 10 (WDC W65C02S differences noted on pins 1, 5, 36) |
| mmu344 (IIe MMU) | 40/40 | IIe TRM Figure 7-2 / Table 7-6, p. 165 |
| iou344 (IIe IOU) | 40/40 | IIe TRM Figure 7-3 / Table 7-7, p. 167 |
| kbd3600 (AY-5-3600) | 40/40 | GI AY-5-3600 data sheet |
| rom2316 (9316B) | 24/24 | Apple II Reference Manual Figure 13, p. 95 |
| kbd5740 (MM5740) | 40/40 | National 1977 MOS/LSI Databook, p. 10-2 |
| iwm344 (IWM) | 28/28, new table | IIc TRM Figure 11-9 / Table 11-11, pp. 247-248 |
| mmu2c (IIc MMU) | 40/40, new chip | IIc TRM Figure 11-5 / Table 11-7, p. 242 |
| iou2c (IIc IOU) | 40/40, new chip | IIc TRM Figure 11-6 / Table 11-8, pp. 243-244 |
| tmg2c (IIc TMG) | 20/20, new chip (2 pins keep verify) | IIc TRM Figure 11-7 / Table 11-9, p. 245 |
| glu2c (IIc GLU) | 24/24, new chip (3 pins keep verify) | IIc TRM Figure 11-8 / Table 11-10, p. 246 |

Totals: 224 existing pins checked, 152 new pins entered from the IIc TRM, 5 pins still `verify`.

## Changes

| Chip / connector | Pin | Old → new | Source |
|---|---|---|---|
| mmu344 | 6-13 | ORA0-ORA7 → RA0-RA7 | IIe TRM Fig. 7-2 |
| mmu344 | 19, 20 | "Enable EF ROM" / "Enable CD ROM" → ROM enables tied together | IIe TRM Table 7-6 |
| mmu344 | 23 | /CASEN → /RAMEN (enables main RAM) | IIe TRM Table 7-6 |
| mmu344 | 24 | CXXXOUT → Cxxx | IIe TRM Table 7-6 |
| iou344 | 2 | /LGRTXT → GR (graphics mode enable) | IIe TRM Fig. 7-3 |
| iou344 | 5 | SEGC → VC (vertical counter) | IIe TRM Fig. 7-3 |
| iou344 | 6 | /80COL → /80VID | IIe TRM Fig. 7-3 |
| iou344 | 17-24 | ORA0-ORA7 → RA0-RA7 | IIe TRM Fig. 7-3 |
| iou344 | 31, 32 | IAKD, IKSTRB → AKD, KSTRB | IIe TRM Fig. 7-3 |
| iou344 | summary | "one doc lists Vcc as 27" note removed; TRM confirms pin 28 = +5 V | IIe TRM Fig. 7-3 |
| kbd3600 | 15 | VDD type power → ground (VDD = GND) | AY-5-3600 data sheet, standard conditions |
| kbd3600 | location | "Keyboard PCB" → main board (keyboard on 26-pin ribbon) | IIe TRM p. 187 |
| rom2316 | 9-11, 13-17 | O0-O7 → D0-D7 | II Ref. Manual Fig. 13 |
| rom2316 | 18 | /CE (2716) → CS2, active HIGH, tied to /INH | II Ref. Manual pp. 94-95 |
| rom2316 | 20 | /OE (2716) → /CS1 | II Ref. Manual Fig. 13 |
| rom2316 | 21 | Vpp (2716) → /CS3 | II Ref. Manual Fig. 13 |
| rom2316 | short | 2716 → 9316B (rails text updated) | II Ref. Manual Fig. 13 |
| kbd5740 | 2 | VLL power → ground (0 V) | MM5740 data sheet |
| kbd5740 | 32 | VSS "0 V" ground → +5 V supply | MM5740 data sheet, note 1 |
| kbd5740 | 14 | DStrbC dir out → in (data strobe control input) | MM5740 data sheet |
| kbd5740 | 20 | ShiftLk dir in → bidir (Shift Lock I/O) | MM5740 data sheet |
| iwm344 | all | pins null → full 28-pin table | IIc TRM Fig. 11-9 |
| 2e-game9 | 4 | PB2 → PDL2 | IIe TRM Table 7-19 |
| 2e-game9 | 6 | PB0 → PB2 | IIe TRM Table 7-19 |
| 2e-game9 | 7 | PDL2 → PB0 | IIe TRM Table 7-19 |
| ii-slot | name | "slots 1-7" → "slots 0-7"; slot 0 has no I/O SELECT | II Ref. Manual Table 33 |
| ii-game16 | 2, 3 | "Open-Apple / Closed-Apple" removed (IIe only) | II Ref. Manual Table 29 |
| ii-slot, 2e-slot | all | partial table with `'2-17'` ranges → 50 numbered pins | II Ref. Manual Fig. 21; IIe TRM Table 7-20 |
| ii-cass, 2e-cass | all | pins 'in'/'out' → separate IN and OUT jacks (T/S); `ii-cass-out`, `2e-cass-out` added | II Ref. Manual p. 103; IIe TRM p. 189 |
| ii-video, 2e-video | all | 'tip'/'shell' → 1 (centre) / 2 (sleeve) | II Ref. Manual p. 97; IIe TRM p. 186 |
| iiRails | expect | +5 4.9-5.2 → 4.85-5.15 V; +12 → 11.3-12.3 V; -5 → -4.7 to -5.7 V; -12 → -11 to -13 V | Red Book p. 111 |
| apple2e rails | expect | aligned to TRM Table 7-2 (+5 ±3%, +11.8 ±6%, -5.2 ±10%, -12 ±10%) | IIe TRM p. 159 |

## Conflicts

- `ii-video-aux` pins 3 and 4: II Reference Manual Table 28 gives 3 = +12 V, 4 = -5 V; its own Figure 15 labels them the other way, and IIe TRM Table 7-15 has 3 = -5 V, 4 = +12 V. Table 28 kept as primary; both pins `verify` with `conflict`.
- `2c-disk` pin 17: IIc TRM Figure 11-26 says DR2*, Table 11-18 says DR1*. Kept /DR2 (the external port is drive 2); `verify` with `conflict`.
- `2e-kbd`: 1985 IIe TRM Table 7-16 lists pin 1 twice (Y0 and LCNTL') and omits 11 and 18. The 1987 edition puts LCNTL' on 11 and X1 on 18. Settled in favour of the 1987 edition.
- iou344 RA0-RA7 direction: the TRM describes them as video-refresh address outputs; kept `bidir` because the IOU also takes the low CPU address from them (it has only A6 as a direct address input). Not flagged as a pin conflict.

## Still missing

- tmg2c pins 7 (TEXT) and 11 (/TMGEN); glu2c pins 13 (/GLUEN), 16 (TEXT) and 19 (CREF): the IIc TRM names them but does not give direction. Marked `verify`.
- IIc custom-chip part numbers and board locations: not in the IIc TRM. Left out.
- IIe MMU/IOU 344-0010 / 344-0020 part numbers are the chip markings; the TRM does not print them.
- `2e-kbd` physical layout: the TRM gives pin numbers only. The drawing assumes a 2 x 13 header with odd pins in one row (said in the summary).
- `2e-aux` side assignment: the TRM gives pin numbers only. The drawing assumes 1-30 / 31-60 like the slots (said in the summary).
- `2e-psu` pad drawing reuses the II's Figure 19; the IIe TRM only lists pin numbers.
- PSU maker part numbers: Astec AA11040 (II/II+/early IIe) and Dyna-Comp (later IIe) come from a forum thread, not Apple documents. Dyna-Comp model number not found.
- IIc -5 V rail test point: the TRM says it is derived from -12 V but gives no pin. Rail marked `verify`.
- DIN-7 and DIN-5 (240°) numbering follows IIc TRM Figures 11-1 and 11-30. If the app's `din7` / `din5-240` drawings number differently, the drawing will be wrong, not the table.
- Sams Computerfacts for the IIe and Sather's "Understanding the Apple IIe" were not used (the Sather link stays as a `verify` datasheet entry).
- Apple III (`apple3`, planned): no chips, connectors or power added.
- `apple2c` is still `status: 'sheet'` (no quickref or symptoms yet), so the validator warns that it has connectors and power.

## For other files

- `acia6551` (commodore.js): matches IIc TRM Figure 11-29 (IIc uses pin 6 XTLI as BCLK; pins 5, 7, 11 unconnected on the IIc). No contradiction.
- `dram4116` (sinclair.js) and `dram4164` (commodore.js): not checked in this pass.
