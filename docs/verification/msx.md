# MSX verification — 2026-10-30

New brand file `src/data/msx.js`: two generic machines, `msx1` (ready) and `msx2` (ready), describing the standard rather than one maker's board.

## Sources used

| Title | URL | What it covered |
|---|---|---|
| MSX Technical Data Book (ASCII, 1984) | https://archive.org/details/MSXTechnicalDataBook | 1.1-1.3 standard and LSIs (CPU 3.579545 MHz, PSG 1.7897725 MHz, interrupts 60/50 Hz); 1.4.1 cassette (DIN 45326 8-pin, pin table and drawing, SAVE level); 1.4.3 printer (14-pin, pin table and drawing); 1.4.5 peripheral I/O port (pin table, drawing, circuit); 1.4.8 connectors (video DIN-5 table, RCA video/RF/audio); 1.5.2 cartridge bus (50 pins); 1.5.4 cartridge power; 1.7 memory and I/O maps, 8255 and PSG bit assignments; 2.1 MSX-BASIC reference (special keys, statements). Scan pages read as images (the text layer is OCR noise in tables). |
| The MSX Red Book (GitHub transcription; archive.org scan) | https://github.com/gseidler/The-MSX-Red-Book/blob/master/the_msx_red_book.md , https://archive.org/details/TheMSXRedBook | PPI ports and slot / subslot registers (ch. 1), BIOS jump table (ch. 4), keyboard decoder (STOP, CTRL-STOP, GRAPH, CODE, SHIFT+F keys, HOME), ROM search "AB" header, workspace variables and hooks (ch. 6). The archive.org PDF has a broken font encoding; the GitHub text was used for reading. |
| Yamaha V9938 MSX-Video Technical Data Book (Aug 1985) | https://archive.org/details/bitsavers_yamahaYamanicalDataBookAug85_6932685 | Part 2 sec. 2 pin assignments and functions (PDF p. 127-128, printed p. 114-115), circuit example with 21.47727 MHz crystal and 128 KB VRAM (PDF p. 126). Pin drawing read from a 300 dpi render. |
| GI AY-3-8910/8912 Data Manual (reprint, hackaday.io) | https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf | Fig. 4 AY-3-8910 pin assignments (p. 10), sec. 2.3 pin functions (p. 11-13). No original GI manual for the 8910 is on bitsavers (components/gi has only catalogs); this reprint is the one timex.js already uses. |
| Yamaha YM2149 data sheet (1992) | https://bitsavers.org/components/yamaha/YM2149_199209.pdf | Second source for the 40-pin pinout; pin 26 SEL. |
| MSX2 Technical Handbook (ASCII; text transcription on archive.org) | https://archive.org/details/MSX-MSX2TechnicalHandbook | th-1.txt: MSX2 block diagram, ROM 48 KB, RAM 64 KB, VRAM 64/128 KB, address map; th-2.txt: BASIC 2.0 additions (SCREEN 5-8, SET PAGE, COLOR=, COPY, SET ADJUST/TITLE/PROMPT/PASSWORD/SCREEN, GET/SET TIME/DATE, CALL MEMINI); th-ap.txt: I/O map ($98-$9B V9938, $AC-$AF MSX-Engine, $B4-$B5 RP-5C01, $FC-$FF mapper, $F7 A/V control, control code 18H = SELECT). |
| TMS9918A/9928A/9929A Data Manual (whtech) | https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf | Test-point pins on the existing `vdp9918` (ti.js): 33 Vcc, 12 Vss, 16 /INT, 38 CPUCLK, 39/40 XTAL. |
| MSX Resource Center wiki | https://www.msx.org/wiki/General_Purpose_port , /Printer_port , /Yamaha_S3527 , /Yamaha_S1985 | Second source for the joystick and printer pinouts; the only source found for the S3527 and S1985. |

Every URL in the file returned HTTP 200 or 206 on 2026-10-30. msx.org rate-limits (429) after a burst of requests; pages load normally when fetched slowly.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| ay8910 (defined here, 40-pin) | 40/40 | GI data manual Fig. 4 and sec. 2.3; YM2149 data sheet agrees on all 40 except pin 26 (see Conflicts). MSX use of each I/O bit from the Technical Data Book 1.7.12 and the 1.4.5 circuit. |
| vdp9938 (defined here, DIP-64 SDIP) | 64/64 | V9938 Technical Data Book Part 2 sec. 2, pin table and pin drawing agree. |
| s3527, s1985 (defined here) | pins: null | Summaries only (MSX Resource Center wiki), `verify: true`. |

Shared chips listed but not edited: cpuz80 (sinclair.js), vdp9918 (ti.js), ppi8255 (ibm.js), rom23256 (amstrad.js), dram4116 (sinclair.js), dram4164 (commodore.js). `ay8910` did not exist (timex.js has only the 28-pin `ay8912`).

## Connectors (per machine, same set on msx1 and msx2)

Cartridge slot (`edge-25x25-odd-even`, 50 pins), joystick ports 1 and 2 (`de9`, male), cassette (`din8-270`, female), printer (`custom`, 14 pads), video/audio DIN (`din5-180`), composite video, RF and audio (`rca`). All pins from the Technical Data Book. `power.supply` is `external: false` and points at the cartridge slot, whose +5 V / +12 V / -12 V pins carry the `expect` values.

## Changes

New file; no earlier data. Decisions against the brief, with the source:

| Item | Brief | Entered | Source |
|---|---|---|---|
| Cassette DIN | 262 or 270 degrees? | `din8-270`. The book names DIN 45326 and its drawing (8 in the centre, 6 and 7 at the key) turned 180 degrees matches the 270-degree layout; `src/connectors.js` also maps DIN 45326 to 8-pin 270 degrees. | TDB 1.4.1 p. 15-16 |
| RGB DIN-8 | "the standard's RGB DIN-8" | Not entered. The MSX1 standard defines only composite (DIN-5 or RCA), RF and audio; the MSX2 handbook names a "21p RGB" input on the A/V control port but gives no connector pinout. | TDB 1.4.8 p. 29; MSX2 TH appendix I/O map |
| Video DIN | — | DIN-5 180 degrees: 1 +5 V, 2 GND, 3 AUDIO, 4 MONITOR, 5 RF VIDEO. | TDB 1.4.8 p. 29 |
| Cartridge numbering | `edge-25x25-seq`? | `edge-25x25-odd-even`: the book lists odd pins in one column and even in the other (1 opposite 2). | TDB 1.5.2 p. 32 |
| Joystick pin 7 | — | Input/output. The TDB pin table prints only "Output" for pin 7, but its own circuit (p. 26) reads pin 7 on PSG IOA5 through the 74LS157, the PSG table (p. 44) lists it as TRGB input, and msx.org lists Input/Output. | TDB p. 25-26, 44 |
| RAM minimum | 8-64 KB | `ram: '8 KB to 64 KB'`. Red Book: 8 KB minimum; TDB 1.1: 16 KB minimum; MSX2 TH: "RAM size of MSX1 varied from 8K to 64K". | Red Book Introduction; TDB p. 8; MSX2 TH ch. 1 |
| Cartridge pin 12 | — | `/MREQ`; the book prints MERQ. | TDB 1.5.2 |

## Conflicts

- ay8910 pin 26: GI calls it TEST 2 (leave open); the Yamaha YM2149 makes it SEL (clock divide-by-2 when LOW, pull-up). Recorded as `conflict` on the pin; both behave the same when open.
- PSG ports: the MSX2 Technical Handbook appendix (transcription) says $A1 data read, $A2 data write; the Technical Data Book 1.7.5 and the Red Book ch. 3 both say $A1 write, $A2 read. The two primary sources are used.
- Printer and cartridge orientation: the book gives the printer drawing without saying which side it is viewed from, and does not say which cartridge face carries the odd pins. Drawn as the book draws the printer; odd pins on top for the cartridge. Stated in each summary.

## Still missing

- S3527 and S1985 pin tables: msx.org publishes 100-pin tables (community transcriptions); no Yamaha data sheet found on bitsavers (components/yamaha has YM2149, Y8950 and others, not the engines). Left `pins: null`.
- RP5C01 clock chip (MSX2): not defined as a chip.
- RGB connector: no standard pinout found (see Changes).
- Power inlet and internal PSU connector: maker-specific, no standard; described in `supply.notes` without a drawing.
- -5 V rail for 4116 VRAM and the CPU clock coming from TMS9918A pin 38: board practice, not in the standard; marked `verify: true`.
- Keys: CODE/KANA behaviour on Japanese machines and SHIFT-at-power-on to skip the disk ROM are from memory, `verify: true`.
- PSU electrolytic and backup-battery failures are repair experience, labelled as such in the notes.
- Machine-specific chip locations: none; `chipLocations` say "varies by maker".

## For other files

- `rom23256` (amstrad.js): its summary is CPC-specific (A14 halves, ROMDIS). The MSX now lists it as "the 32 KB BIOS/BASIC ROM"; MSX 32 KB ROMs do not all share the 27256 chip-select pinout. No contradiction of the amstrad pin table itself.
- `vdp9918` (ti.js): pin 38 is described as the colour burst clock; on MSX1 boards with a TMS9918A it can also be the Z80 clock (3.579545 MHz). No contradiction.
