# Timex Sinclair verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| TS2068 Technical Manual, 2nd ed. (Time Designs, 1986, from the Timex manual) | https://k1.spdns.de/Vintage/Sinclair/82/Timex%20Sinclair%202068/Tech%20Specs%20and%20Repair/Timex%20Sinclair%202068%20-%20Technical%20Manual.pdf | AC adapter and regulation (PDF p. 16-17), ROM and RAM (p. 26, 52), PSG (p. 27-40), joystick operation (p. 41-42), SCLD functions Table 2.1.8-1 (p. 43-49), clock (p. 50), video (p. 55-56), ratings (p. 60), P1 (p. 61-65), J4 dock (p. 66-69), cassette and joystick (p. 70-71), power plug (p. 71), monitor, RF, J9 (p. 72), schematic corrections (p. 167), parts list (p. 169-171), schematic fold-out (p. 178) |
| Timex Technical Memo #6, TS2068 Connector Pinouts (SYNTAX v5 n1, Jan 1984, p. 8-9) | https://archive.org/details/SyntaxMagazine/Syntax%20v5n1/page/n7 | Second source for P1, dock and joystick tables; joystick mate is a female DB9S |
| CATS Newsletter v4 n6 (Sep 1986) p. 10, SCLD pinout (N. Pashtoon) | https://archive.org/details/cats-newsletter/CATS%20v4%20n6%20SEp%201986/page/n9 | Traced 68-pin SCLD pinout (second source) |
| SYNTAX v4 n12 (Dec 1983) p. 1, ZX/TS subset of 2068 pins | https://archive.org/details/SyntaxMagazine/Syntax%20v4n12/page/n1 | P1 positions 4-26 = TS1000 bus minus /RAMCS, /ROMCS, 9 V |
| General Instrument AY-3-8910/8912 Data Manual (transcription) | https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf | AY-3-8912 pin functions, sec. 2.2-2.3 (PDF p. 11-12) |
| Timex Sinclair 1000 User Manual (1982) | https://archive.org/details/timex-sinclair-1000-user-manual | Sockets 9V DC IN, EAR, MIC, TV; channel switch; no power switch |
| Timex Sinclair 1500 User Manual (1983) | https://archive.org/details/timexsinclair-1500-user-manual | Sockets 9V DC, MIC, EAR, TV and rear slot; channel 3 by keypress |
| Timex Sinclair 2068 User Manual | https://archive.org/details/timex-2068-user-manual | Quickref source (keys, BASIC) |
| ZX81 Service and Assembly Manual (transcribed) | https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf | Power spec, tip positive, 8-12 V on load, 600 mA (p. 8); IC1-IC4 designators |
| k1.spdns.de, Timex Sinclair 1000 Connectors (community) | https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201000/Connectors.html | TS1000 edge layout drawing, jack types, centre +9 V, 14 V unloaded |
| k1.spdns.de TS1000 PCB issue 3 photo | https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201000/PCB/PCB%20issue%203.jpg | Single 24-pin RAM at IC4, IC1/IC2 labels, edge 1A/23A orientation |
| k1.spdns.de TS1500 PCB issue 1A photo | https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201500/TS1500%20PCB%20issue%201A.jpg | Eight 4116 at U8-U15, NCR gate array at U5 |
| LOAD ZX Timex Computer World, TS1500 (community) | https://loadzx.com/timexcomputerworld/ts1500/ | TS1500 gate array (Timex/INESC), revised ROM |
| SUM v4 n1 (Jan 1986) p. 5 | https://archive.org/details/SinclairTimexUsersMagazine/SUM%20v4%20n1/page/n5 | TS2068 plug outer contact positive; ~21 V unloaded; no colour below 15 V; tape noise above 13 V |
| Sinc-Link v7 n1 (1989) p. 9-10 | https://archive.org/details/SincLink/Sinc-Link%20Vol%2007%20No%201/page/n9 | Peripherals overloading the 2068 regulator |
| Old Computer Museum, TS2068 | https://context.oldcomputermuseum.com/timex_sinclair2068.html | DVE supply, 15 V 1 A DC (marked verify) |

Every URL above returned HTTP 200 on 2026-10-30. The CATS and SCLD figures and the schematic were read from rendered page images.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| scld_tx2068 (defined here, replaces the sinclair.js stub) | 68/68 | TS2068 TM Appendix D schematic U3 + Table 2.1.8-1; CATS v4 n6 (agrees on 64/68) |
| ay8912 (defined here, replaces the sinclair.js stub) | 28/28 | GI data manual sec. 2.2-2.3; TS2068 schematic U14 agrees on every pin |
| rom_ts2068_exrom (new) | 28/28 | TS2068 TM Appendix D schematic U20, sec. 2.1.4 |
| ula_ts1500 (new stub) | 0 (pins null) | not sourced |
| rom23128 (commodore.js), U16 | cross-checked against schematic U16: /CS 20, OE1 27, A13 26, GND 14, D0-D7 11-13/15-19 | no contradiction |
| dram4416 (commodore.js) | parts list only (TMS4416-15 U6/U7, TMS4416-20 U12/U13/U17/U18) | not re-checked pin by pin |

## Changes

| Item | Old → new | Source |
|---|---|---|
| scld_tx2068 pkg | DIP-40 (sinclair stub) → PLCC-68 | TM 2.1.8: "68-pin JEDEC leaded carrier" |
| scld_tx2068 pins | null → 68-pin table | schematic U3 |
| ay8912 pins | null → 28-pin table | GI data manual |
| ts2068 chips | dram4164 → dram4416; added rom23128, rom_ts2068_exrom | TM 2.1.5, 2.1.10, parts list |
| ts2068 cpu | 3.58 MHz → 3.528 MHz | TM 2.1.8.2 (14.112 MHz / 4) |
| ts2068 ram/rom | "72 KB bank-switched RAM" → 48 KB RAM + 24 KB ROM | TM 1.1.1 |
| ts2068 monitor | "Monitor socket" (DIN assumed) → RCA phono, composite 1 V p-p | TM 2.4.6 |
| ts2068 power | unknown polarity → 5.5/2.5 mm barrel, centre negative, 14-25 V DC 1 A | TM 2.1.1, 2.4.5; SUM v4 n1 |
| ts2068 joystick pin 9 | GND → GND with conflict, open on stock boards | TM App. D corrections; Memo #6 |
| ts2068 quickref firstLook | 72 KB → 48 KB RAM + 24 KB ROM | TM 1.1.1 |
| ts1000 chips | sram2114 ("about four 2114") → sram6116 (one 24-pin 2K x 8 at IC4) | PCB photo; 2K needs one 2K x 8 on the two-site board |
| ts1000 power | DC barrel → 3.5 mm mono jack, tip positive | TS1000 UM; ZX81 SM sec. 9; k1 |
| ts1000 RF | unknown → RCA (Cinch) | k1 Connectors |
| ts1500 chips | ula_zx81 → ula_ts1500 stub; added dram4116 (U8-U15) | LOAD ZX; PCB photo |
| ts1500 channel | — → no switch; press 3 at power-up for channel 3 | TS1500 UM |
| power where | "Z80 pin" → "Z80A pin" (matches cpuz80 short) | — |

## Conflicts

- SCLD pins 13/14: schematic OSC OUT / OSC IN; CATS XTAL in / XTAL out. Schematic used.
- SCLD pins 28/30: schematic MA6 / MA5; CATS MA5 / MA6. Schematic used (harmless swap of DRAM mux bits).
- P1 B3/B4: Appendix D corrections say "P1-4B +15V (not -15V)"; Table 2.4.1-1, Fig. 2.4.1-2 and Memo #6 give B3 +15 V, B4 +5 V. Table used.
- P1 B30 BUSISO: table lists it; schematic marks it NC.
- Joystick pin 9: Table 2.4.4-1 GND; App. D corrections say the trace is missing on the PCB; Memo #6 says unused.

## Still missing

- ula_ts1500 pinout and pin count (searched timexsinclair.com, archive.org, k1.spdns.de; TS1500 schematic article on timexsinclair.com timed out).
- TS1500 connector pin tables (power polarity, TV socket type, edge layout); no TS1500 service manual found.
- TS1000 and TS1500 adapter part numbers and ratings; TS2068 adapter part number (DVE DV-141A appears only in a forum post, not confirmed).
- TS1000 RAM marking at IC4 is unreadable in the photo; part type (2016/4016/6116) from community sources only.
- TS2068 J9 keyboard: which end is pin 0 is not stated.
- TS2068 dock key slot position is from Memo #6 only.
- timexsinclair.com/product/pins is a 1988 pinout program, not a reference page.

## For other files

- sinclair.js `scld_tx2068` and `ay8912`: timex.js now defines both with pins. Leave the sinclair.js entries as `pins: null` stubs or delete them; giving them pins too makes a duplicate FAIL. The stub's `pkg: 'DIP-40'` for the SCLD is wrong (PLCC-68).
- sinclair.js `zx81-power`: the ZX81 input is a 3.5 mm mono jack, tip positive, 8-12 V on load, at least 600 mA (ZX81 Service Manual sec. 9), not a barrel.
- sinclair.js `zx81-edge`: layout sourced above (ts1000-edge, edge-23x23-ab, pin1 right, slot at 3) applies to the ZX81.
- heathkit.js `sram6116`: no datasheet linked; it is now also fitted in the TS1000 (IC4).
- No contradiction found in cpuz80 (U19 pins agree with the TS2068 schematic), rom23128 or dram4116.
