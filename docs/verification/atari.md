# Atari verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| Atari 400/800 Field Service Manual (May 1983) | https://archive.org/details/atari400800fieldservicemanualmay1983 | MPU, ANTIC, CTIA/GTIA, POKEY, PIA pin assignments (Figs. 1-3 to 1-7, PDF pp. 21-25); power supply text (p. 1-6) and AC adaptor (p. 1-17); 400 and 800 power supply schematics (Figs. 2-4, 2-8: J204/J206 power in, J203 RF, J205 monitor detail); 800 motherboard schematic (Fig. 2-6A: cartridge J108/J109); board designators; parts list (AC adaptor C014319) |
| Atari 800XL Field Service Manual Rev. 01 (Feb 1984) | https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984 | 6502C, ANTIC, GTIA, POKEY, PIA pinouts (Figs. 1-3 to 1-7); MMU description (p. 1-9); power DIN-7 (Fig. 1-8), SIO (Fig. 1-9), controller (Fig. 1-10), cartridge (Fig. 1-11), PBI (Fig. 1-12); OPTION/HELP and Self-Test (p. 1-1, section 2); parts list (pp. 5-5, 5-6) |
| Atari 600XL Field Service Manual Rev. 1 | https://archive.org/details/Atari600XLComputerFieldServiceManualRev1 | 6502C pinout (Fig. 1-3); power supply rating +5 V DC ±2 %, 1.5 A, CA061982 (p. 1-10, parts list p. 5-5); SIO, controller, cartridge, PBI figures (pp. 1-12 to 1-16); designators |
| Sams Computerfacts CC16, Atari 130XE (1986) | https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams | Full schematic with voltages and logic-probe readings (PDF pp. 2-5); connector front views J1, J2, J4A, J4B, J5/J6, J7 (p. 7); semiconductor parts list (p. 16) |
| Atari Home Computer Technical Reference Notes CO16555 (1982) | http://www.bitsavers.org/pdf/atari/400_800/CO16555_Atari_Home_Computer_Technical_Reference_Notes_1982.pdf | OS Manual Fig. 9-4 SIO pinout and signal definitions (PDF p. 131); Hardware Manual controller port table (p. 477) and App. C monitor/SIO/controller pinouts (p. 537) |
| Atari 8-Bit FAQ 1.14, connector pinouts (Atarimania) | https://www.atarimania.com/faq-atari-400-800-xl-xe-what-are-the-pinouts-for-the-various-connectors-on-the-atari_16.html | Second source for every port; only source for 800 right-slot pins 1 and A, 400 RD4, 800XL monitor |
| Atari 8-Bit FAQ, power supplies | https://atarimuseum.ctrl-alt-rees.com/archives/atari-8-bit-faq/faq-doc-42.html | Transformer and brick part numbers and ratings |
| Computer History Museum 102728460 | https://www.computerhistory.org/collections/catalog/102728460 | CO17945 is the Atari 9 V AC transformer |
| Classic Computers NZ (2010) | https://classic-computers.org.nz/blog/2010-08-29-restoring-an-atari800XL.htm | 800XL brick measured 7.6 V and killed RAM (secondary, `verify`) |
| Valoroso, 800XL/1050 supply | https://www.valoroso.it/en/atari-800xl-atari-1050-shorted-power-supply/ | Load test with 4.7 Ω at the DIN pins (secondary, `verify`) |
| Atari 400/800 BASIC Reference Manual | https://archive.org/details/atari-400-800-basic-ref | Quickref BASIC source |
| Mapping the Atari, memory map | https://www.atariarchives.org/mapping/memorymap.php | Quickref memory map source |

Page anchors use archive.org leaf numbers (`/page/n<PDF page - 1>`) and `#page=` on bitsavers. All 48 source URLs in the file returned HTTP 200 on 2026-10-30. atarimax.com (old SALLY link) sits behind a Cloudflare challenge and was dropped.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| cpu6502c (SALLY) | 40/40 | 800XL FSM Fig. 1-3; 600XL FSM Fig. 1-3; Sams 130XE schematic U8 |
| antic | 40/40 | 400/800 FSM Fig. 1-4; 800XL FSM Fig. 1-4 (Sams U7 for probe readings) |
| gtia | 40/40 | 400/800 FSM Fig. 1-5; 800XL FSM Fig. 1-5; Sams U17 |
| pokey | 40/40 | 400/800 FSM Fig. 1-6; 800XL FSM Fig. 1-6 |

Totals: 160 pins checked, 23 corrected, 0 chip pins left `verify`. Two pins carry `conflict` (GTIA 12, 31).

## Changes

| Chip / connector | Pin | Old → new | Source |
|---|---|---|---|
| cpu6502c | 7 | SYNC → NC | 800XL and 600XL FSM Fig. 1-3; Sams (NC on board) |
| cpu6502c | 34 | R/W → NC | same |
| cpu6502c | 35 | HALT (verify) → /HALT input, active low | same |
| cpu6502c | 36 | "RW2 second R/W" (verify) → R/W, the only R/W | same; Sams shows 34 open |
| antic | 15 | RDY in → RDY out to the CPU | 800XL FSM Fig. 1-4 ("Ready Output") |
| antic | 35 | F0O out → FPHI0 in (from GTIA pin 29) | both FSMs (GTIA 29 = "Clock Out"); Sams wiring |
| antic | 21 | Vcc → Vdd (name) | 400/800 FSM |
| gtia | 3 | Vcc (+5 V) → Vss (0 V) | both FSMs; Sams shows pin 3 grounded |
| gtia | 27 | Vss → Vdd (+5 V) | both FSMs; Sams 5.0 V |
| gtia | 12-14 | S0-S2 "player/missile sprite lines" → console switch lines (CONSOL bits 0-2) | both FSMs |
| gtia | 15 | S3 sprite line → console speaker / keyboard click out | 800XL FSM |
| gtia | 17 | CAD3 "colour address bit 3 from ANTIC" → DEL colour delay (CADJ) | both FSMs |
| gtia | 21 | COLOR → COL (name) | both FSMs |
| gtia | 22-24 | LUM1-LUM3 → LUM0-LUM2 | both FSMs |
| gtia | 26 | HALT out → /HALT in (from ANTIC pin 9) | both FSMs; Sams wiring |
| gtia | 31 | LUM0 → LUM3 (CS2 on the CTIA) | 800XL FSM; 400/800 FSM for CTIA |
| pokey | 16 | /KR2 out → in | both FSMs (keyboard response); Sams waveform |
| pokey | 25 | /KR1 out → in | same |
| pokey | 27 | OCLK bidir → out | both FSMs ("Serial Output Clock") |
| antic | summary | XL part "CO21698" → C021697 | 600XL and 800XL parts lists, Sams |
| freddie | machines | removed from 600XL; location 130XE U6, C061991, DIP-40 | 600XL/800XL parts lists (absent); Sams |
| mmu61618 | location, role | 600XL U2, 800XL U3, 130XE U3; PLA address decoder, DIP-20 | XL FSMs; Sams |
| dram4464 | summary | Sams 130XE shows sixteen 4164 (U9-U16, U26-U33); 4464 kept as reported later boards | Sams parts list |
| atari-sio | all | unnumbered-geo table → `custom` pads from Fig. 9-4; pin 12 split per model | TRN OS Manual; XL FSMs |
| atari-cart | 16-30 | numeric 16-30 → letters A-S (`edge-15x15-cbm`) | 800 schematic J109; XL FSM Fig. 1-11 |
| power 400/800 | — | rails now name 7805 A202, 78M12 A201, -5 V zener CR201 | FSM Figs. 2-4, 2-8 |
| machines | status | 600XL, 800XL, 130XE `sheet` → `ready` (connectors, power, quickref, symptoms added) | — |

## Conflicts

- GTIA pins 12-14: 800XL FSM labels them Option, Start, Select; the Hardware Manual CONSOL register puts START on bit 0, SELECT bit 1, OPTION bit 2. Names kept neutral (S0-S2).
- GTIA pin 31 / 22-24: the chip-pinout cheat sheet calls 22-24 LUM1-3 and 31 LUM0; both FSMs call 22-24 LUM0-2 and the 800XL FSM calls 31 LUM3. FSM names used.
- 130XE monitor pin 4/5: Sams puts the COMP. VIDEO label on the pin 5 line; the Hardware Manual and FAQ give 4 = video, 5 = chroma. Manual kept.
- 130XE ECI pin 3: Sams labels it DIR, FAQ says D1XX select.
- 600XL PBI 47/48: 600XL FSM says reserved N/C; FAQ says +5 V on the 600XL.

## Still missing

- osrom, freddie, mmu61618, dram4464: no pin tables found in any service document read (FSMs, Sams). `pins: null`.
- 600XL RAM (two 16K x 4 DRAMs, U11-U12, C061505): no chip id in the data set; not added.
- 600XL GTIA, POKEY, PIA designators: parts list OCR misaligned; not filled.
- 400/800 power jack: schematics show a two-contact jack (J204 / J206); the physical plug size is not documented. Connector kept `verify: true`.
- 800 right cartridge pins 1 (R/W late) and A (PHI2), 400 pin A (RD4 not connected): FAQ only, `verify`.
- 800XL monitor jack: not in the 800XL FSM; FAQ only, whole connector `verify`.
- 800 RAM slots (3 x 22/44) and ROM personality slot: only the FAQ tables them; not added.
- 400/800 rail tolerances: not given in the FSM; expects kept `verify`.

## For other files

- pia6520 (commodore.js): no change needed. Both Atari FSMs label pin 35 "RS0"/"A0" and 36 "RS1"/"A1". That reflects Atari's wiring (A0 to pin 35, A1 to pin 36), not a different pinout: the Atari register map (PORTA $D300, PORTB $D301, PACTL $D302) needs A0 on RS1. The MOS order in commodore.js (35 RS1, 36 RS0) is right. Pins 21-25 (R/W, CS0, /CS2, CS1, ENABLE) agree.
- cpu6502 (apple.js): agrees with 400/800 FSM Fig. 1-3 (the manual misprints SYNC as "YNC").
- dram4164 (commodore.js): now also fitted in atari800xl (U9-U16) and atari130xe (U9-U16, U26-U33) via `chipLocations`.
