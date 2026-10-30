# Texas Instruments verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| TI-99/4A Console and Peripheral Expansion System Technical Data, 1049717-2 (TI, 1983) | https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf | A.2 and D.2.1 I/O port pins (PDF pp. 9, 52); A.3 memory map (p. 11); A.4 9901 bit map (p. 13); Fig. E connector pin identification (p. 20); Fig. G console power supply (p. 22); schematic sheets 59-62 (pp. 61-64): J201 video, MOLEX regulator output, U100 VDP, U102-U109 4116, U600 9900, U601 74LS362, U608/U609 MCM6810, U610/U611 TMS4732, U300 9901, J300 joystick, J400 cassette, U500-U502 TMC0430, J500 GROM port, U511 TMS9919 |
| TI-99/4A Home Computer Servicing Manual, 3rd rev. (TI Consumer Repair Center, Lubbock, Oct 1983) | https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI994A_HC_Servicing_Manual_Oct_1983.pdf | Debug list (PDF p. 16); oscillator and reset (p. 21); Fig. 4 TMS9900 pin table (p. 29); GROM description (pp. 57-59); Fig. 22 TMS9901 pin table and Table 8 I/O map (pp. 66-67); VDP and sound description (pp. 76-77, 82-85); power supply board text (pp. 93-94); troubleshooting chart (p. 96); I/O port, GROM port, cassette/joystick/video pages (pp. 113-115); TIM9904 (p. 124); 4116, 4732, 6810 pages (pp. 128-130); Fig. 49 power schematic with transformer P/N (p. 139) |
| TMS9918A/TMS9928A/TMS9929A Video Display Processors Data Manual (TI, 1982) | https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf | 3.7.1 and 3.7.2 terminal assignments (PDF pp. 52-54) |
| SN76489AN data sheet (TI) | https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/SN76489.pdf | Pinout (p. 1), pin assignment table (p. 5), SN76494 500 kHz note |
| TIM 9904A Four-Phase Clock Generator and Driver Data Manual (TI, 1982) | https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/TIM9904.pdf | Table 1 terminal assignments and Fig. 9 (PDF p. 10) |
| TI MOS Memory Data Book 1986, ROMs chapter | https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/MOSMemory-1986/MOSMemory-1986-07-ROMs.pdf | TMS4732 pinout and pin functions (PDF p. 15) |
| Sams ComputerFacts TI-99/4A (CF1, CC2) | https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/computerfacts/Sams%20TI994A%20ComputerFacts.pdf | Service checks and rail readings, AC9500, regulator B+ 21.5 V (PDF p. 4); transformer rating 26.40 V AC tapped at 17.85 V AC, RF modulator PHC004A (p. 33). Sams redraws schematics; used only as a second source and for readings |
| TI Important Safety Notice / Power Transformer Warning (1983) | https://ftp.whtech.com/datasheets%20and%20manuals/Official%20TI%20addenda%20and%20data%20sheets/Power%20supply%20safety%20notice.pdf | US transformer models AC9500 and AC95000, shock hazard, green label |
| TI Addendum: Power Transformer for the TI-99/4A (1982) | https://ftp.whtech.com/datasheets%20and%20manuals/Official%20TI%20addenda%20and%20data%20sheets/Power%20supply%20addendum.pdf | Two transformer styles, 4-pin receptacle |
| TI-99/4A User's Reference Guide | https://ftp.whtech.com/datasheets%20and%20manuals/99-4A%20Computer/userrefguide.pdf | FCTN keys (PDF pp. 13-14) |
| Mostek 1980 Memory Data Book (MK4116) | http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf | 4116 supply sequencing, cited in the supply notes (same reference sinclair.js uses) |
| cctalk, 2019-11 "TI994/A Power Supply" | https://classiccmp.org/pipermail/cctalk/2019-November/050481.html | 2-pin later supplies vs 4-pin (secondary) |
| Colin Hinson GROM notes | https://www.blunham.com/Misc/Texas/Mine/Groms.html | GROM operation (secondary) |

Page anchors are `#page=` PDF pages. Every URL in ti.js returned HTTP 200/206 on 2026-10-30. The Nouspikel pages on unige.ch serve a bot block page and the Wayback Machine returned 429, so both were dropped from the data.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| tms9900 | 64/64 | Servicing Manual Fig. 4 (TMS 9900 pin assignments) |
| vdp9918 | 40/40 | TMS9918A/9928A/9929A Data Manual 3.7.1, 3.7.2 |
| psg76489 | 16/16 | SN76489AN data sheet; Technical Data sheet 62 (TMS9919 wiring) |
| tms9901 | 40/40 | Servicing Manual Fig. 22 and Table 8; Technical Data A.4 and sheet 61 |
| tms9904 | 20/20 (new) | TIM 9904A Data Manual Table 1, Fig. 9 |
| grom0430 | 16/16 (new) | Technical Data schematic sheet 62; Servicing Manual pp. 48-50 |
| romconsole (TMS4732) | 24/24 (new) | TI MOS Memory Data Book 1986 p. 7-15 |
| sram6810 (new chip) | 24/24 (new) | Servicing Manual Fig. 39 |

Totals: 244 pins checked, 35 corrected on the existing tables, 104 newly filled, 0 chip pins left `verify`.

## Changes

| Chip / connector | Pin | Old → new | Source |
|---|---|---|---|
| vdp9918 | 11 | R/W "read or write from the CPU side", in → VRAM write strobe, out | VDP Data Manual 3.7.1 |
| vdp9918 | 25-32 | RD0-RD7 bidir → in (VRAM read data) | same |
| vdp9918 | 35 | EXTVDP ctrl in (verify) → video I/O, B-Y on 9928A/29A | same, 3.7.2 |
| vdp9918 | 40 | XTAL2 out → in | same |
| vdp9918 | 13, 36-39 | verify cleared; GROMCLK = XTAL/24, CPUCLK = XTAL/3 colour burst | same |
| vdp9918 | text | 4116/TI-specific wording made machine-neutral | — |
| psg76489 | 1-3, 10-13, 15 | LSB-first names (1 D5 … 15 D4) → TI datasheet names (1 D2, 2 D1, 3 D0 MSB, 10 D7, 11 D6, 12 D5, 13 D4, 15 D3); LSB-first name kept in desc | SN76489AN data sheet p. 1, 5 |
| psg76489 | 4 | /READY active low → READY (open collector, high = data taken) | same |
| psg76489 | name/short | "TMS9919 / SN76489", short TMS9919 → "SN76489 / SN94624 (TMS9919)", short SN76489 (neutral; ColecoVision shares it) | Sams parts list U511 SN94624N |
| tms9901 | 10 | INT7 interrupt input (verify) → PHI system clock input (TTL phase 3) | Servicing Manual Fig. 22; TI troubleshooting chart (U300 pin 10 TTL clock) |
| tms9901 | 24, 25, 35, 36, 39 | S4-S0 "keyboard column select" outputs → CRU bit-select inputs from A14-A10 | Fig. 22 (IN); Technical Data sheet 61 |
| tms9901 | 23, 27-34 | P7, P8-P15 → /INT15/P7, /INT14/P8 … /INT7/P15 (dual function) | Fig. 22 |
| tms9901 | 6-9, 17-22, 26-34, 37-38 | verify cleared; TI functions added (keyboard lines, joystick, ALPHA LOCK, cassette, audio gate) | Table 8; Technical Data A.4 |
| tms9904 | all | pins null → full table; name now "TIM9904 (SN74LS362)" | TIM 9904A Data Manual |
| grom0430 | all | pins null, pkg unknown → DIP-16 table | Technical Data sheet 62 |
| romconsole | all | "Console ROM (GROM + ROM, 12 KB)", pins null → TMS4732 4K x 8, DIP-24, U610/U611 | Data Book; Technical Data sheet 60 |
| ti994a / ti994 chips | — | sram2114 removed, sram6810 added: the scratchpad is 2 x MCM6810 (U608, U609), no 2114 is fitted | Technical Data sheet 60; Servicing Manual Fig. 39; Sams |
| ti994a machine | ram, rom, video, sound | 12 KB "GROM + ROM" → 8 KB ROM + 18 KB GROM; scratchpad and VRAM parts named; 9929A and SN94624 noted | same |
| all chips | location | added U600, U100, U511, U300, U601, U500-U502, U610/U611, U608/U609; dram4116 U102-U109 via chipLocations | Technical Data schematics; Sams |
| connectors ti994a | — | none → power, video DIN-5, joystick DE-9, cassette DE-9, 44-pin I/O port, 36-pin cartridge port, regulator output | see Sources |
| quickref firstLook | cartridge | "Power off before you change a cartridge (verify)" → inserting a cartridge resets the console | Servicing Manual p. 13 |
| quickref firstLook | speech | "side port, verify" → 44-pin I/O port on the right | Technical Data A.2 |
| quickref keys | FCTN 3 | "Erase to the end of the line" → erases the line you are typing | User's Reference Guide p. I-6 |
| quickref keys | FCTN 4 | "Break: stop a RUN" → clears the typed line; in TI BASIC also breaks | same |
| quickref memory | $0000-$1FFF | "Console ROM (GROM + ROM)" → 8 KB ROM; GROMs are not in the CPU map | Technical Data A.3 |
| quickref memory | $9000, $A000, others | verify cleared; speech write $9400, $2000-$3FFF expansion added | Technical Data A.3 |
| power rails | where | "9900 pin n" → "TMS9900 pin n" so the app links; Sams readings added | Sams p. 4 |
| resources | Nouspikel | unige.ch link removed (bot block) | — |

## Conflicts

- I/O port pin 41: Technical Data says IAQ; Servicing Manual p. 104 says HOLD / IAQ. Kept IAQ, `conflict` on the pin.
- Transformer voltages: a quoted label gives pins 1-2 18 V AC 18 VA and pins 2-4 8.5 V AC 1.28 VA; an AtariAge post gives 16.0 V AC 36 VA and 8.0 V AC 1.0 VA for an AC9500; Sams rates 26.40 V AC tapped at 17.85 V AC. `conflict` on power pins 1 and 4.
- Servicing Manual Table 8 lists CRU bit 25 as "PROG. 10 / INT 12, pin 28, mag tape data out"; the 9901 pin table makes pin 28 P9 (INT13) and the Technical Data says P9 = mag tape out. Data uses pin 28 = /INT13/P9 = MAG OUT. Not on a pin as a conflict because the 9901 datasheet table settles it.
- Video pins 2 and 5: GND on 9918A (NTSC) consoles, R-Y and B-Y on 9929A consoles via jumpers W201-W204 (schematic sheet 59). Described in the pin text.

## Still missing

- Power connector pin-to-winding mapping (1-2 = 18 V, 2-4 = 8.5 V) is from a 1997 classiccmp.org label quote and AtariAge posts seen only in search results; both hosts returned 403 to fetches, so the pins carry `verify` and the connector `verify: true`. Pin 3 is not assigned in any source; left out. TI documents (Fig. G, Fig. 49) show the three wire colours but no pin numbers.
- European transformer model numbers: not found in any TI or Sams document.
- PAL (TMS9929A) 6-pin video DIN: TI J201 numbering known, physical DIN numbering only from a community drawing on whtech (TI-994A-eurovideoport.jpg) whose numbers differ from J201. Not tabled.
- Cartridge port physical orientation (which row is up, which end is pin 1 in the slot): not drawn by TI. Signals and numbers are sourced; the drawing orientation is a guess stated in the summary.
- Regulator output Molex: which physical end is pin 1 not drawn.
- Keyboard connector J100 (internal) not added.
- TI-99/4 (ti994): left at `sheet`; the Servicing Manual 99/4 schematic package (Figs. 43-49) was not worked through.

## For other files

- dram4116 (sinclair.js): pin table matches the TI Servicing Manual Fig. 38 (TMS4116 pinout). No contradiction.
- vdp9918 and psg76489 are defined here and shared with coleco.js. The PSG data pins now use TI datasheet names (D0 = MSB on pin 3), with the LSB-first name in each desc; the chip `short` is now `SN76489` (was `TMS9919`), so any `where: 'TMS9919 pin n'` text in other files will no longer link.
