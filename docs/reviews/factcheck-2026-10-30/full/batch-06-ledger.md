# batch-06 fact-check ledger

Batch: 220 items (i 0-219). Data snapshot supplied as commit 4b85bd0. No data files modified.

Decision policy: a material unsupported subclaim makes the whole item UNVERIFIABLE; a contradicted subclaim makes it WRONG even when its remaining fields are supported. CONFIRMED is documentary support, not a measurement of a physical board. PDF pages below are file pages unless explicitly marked printed.

Principles: prove-it-works applies to all evidence checks; fix-root-causes applies to false exclusive diagnoses and machine data reuse. No shared-state ordering finding (serialize-shared-state-mutations) arose in this static data batch.

## Sources

- S0: [0.jpg](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg), local HTTP 200.
- S1: [1.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf), local HTTP 200.
- S2: [2.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf), local HTTP 200.
- S3: [3.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf), local HTTP 200.
- S4: [4.pdf](https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf), local HTTP 200.
- S5: [5.jpg](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-1.jpg), local HTTP 200.
- S6: [6.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/powersupply.gif), local HTTP 200.
- S7: [7.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02b.gif), local HTTP 200.
- S8: [8.pdf](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf), local HTTP 200.
- S9: [9.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02a.gif), local HTTP 200.
- S10: [10.txt](https://web.archive.org/web/20260607184337/https://portcommodore.com/rcarlsen/cbm/vic20/vic20.txt), local HTTP 000. Archive refused locally and inaccessible to web reader; live original consulted as fallback.
- S11: [11.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/VIC-20%20Schematic%20-Version%20E.pdf), local HTTP 200.
- S12: [12.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf), local HTTP 200.
- S13: [13.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/tech/1541-19.gif), local HTTP 200.
- S14: [14.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/tech/1541-20.gif), local HTTP 200.
- S15: [15.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/tech/1541-40.gif), local HTTP 200.
- S16: [16.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/short-251748-rev.E-right.gif), local HTTP 200.
- S17: [17.txt](https://portcommodore.com/rcarlsen/cbm/1541/fix1541.txt), local HTTP 000. Web reader succeeded on original text.
- S18: [18.txt](https://web.archive.org/web/20251206140425/https://portcommodore.com/rcarlsen/cbm/1541/fix1541.txt), local HTTP 000. Archive refused locally and inaccessible to web reader; live original consulted as fallback.
- S19: [19.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf), local HTTP 200.
- S20: [20.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/short-251748-rev.E-left.gif), local HTTP 200.
- S21: [21.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1581/powersupply.gif), local HTTP 200.
- S22: [22.txt](https://portcommodore.com/rcarlsen/cbm/1541/1541-II/1541-II.txt), local HTTP 000. Web reader succeeded on original text.
- S23: [23.txt](https://web.archive.org/web/20241209002723/https://portcommodore.com/rcarlsen/cbm/1541/1541-II/1541-II.txt), local HTTP 000. Archive refused locally and inaccessible to web reader; live original consulted as fallback.

Source locator problems: VIC PRG cited #page=299 has the pin table (printed 283); the actual transformer sentence is PDF p. 245 (printed 229). C16 alternate p. 11 contains both pinouts and schematic sheet 1; p. 12 contains sheet 2. The zimmers C16 PDF index is damaged but the needed pages rendered. PAL CPU rows cite timer prose on TED p. 35 rather than the CPU pinout on p. 38. Density table on 1541 p. 10 prints overlapping 15-30.

## Per-item decisions

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | plus4/plus4-video | pin 1 GND | WRONG | Connector map CN7; Plus/4 PDF p. 21 | HIGH; prove-it-works. Pin 1 is LUM (luminance and sync), not GND. Its video type/description are correct; name is wrong. |
| 1 | plus4/plus4-video | pin 2 LUM | WRONG | Connector map CN7; Plus/4 PDF p. 21 | HIGH; prove-it-works. Pin 2 is GND (0 V), not LUM. Its ground type/description are correct; name is wrong. |
| 2 | plus4/plus4-video | pin 3 AUDIO OUT | CONFIRMED | Connector map CN7; Plus/4 PDF p. 21 | CN7 pin 3 = AUDIO OUT. |
| 3 | plus4/plus4-video | pin 4 VIDEO | CONFIRMED | Connector map CN7; Plus/4 PDF p. 21 | CN7 pin 4 = COMPOSITE VIDEO OUT. |
| 4 | plus4/plus4-video | pin 5 AUDIO IN | WRONG | Plus/4 PDF pp. 20-21, CN7 pin 5 / EXT AUDIO | MEDIUM; prove-it-works. Pin 5 is audio input, routed to the external audio mixing/amplifier path (Q3/modulator), not into the TED sound chip. TED SND pin 33 is an output. |
| 5 | plus4/plus4-video | pin 6 COLOR | CONFIRMED | Plus/4 PDF pp. 20-21; connector map CN7 | CN7 pin 6 COLOR is chroma from modulator COLOR OUT; burst/chroma originates at TED COLOR (hardware manual p. 10). |
| 6 | plus4/plus4-video | pin 7 NC | CONFIRMED | Connector map CN7; Plus/4 PDF p. 21 | CN7 pin 7 = NC. |
| 7 | plus4/plus4-video | pin 8 NC | CONFIRMED | Plus/4 PDF p. 21; C16 PDF p. 12 (printed 7) | Plus/4 CN7 pin 8 is NC; C16 CN6 pin 8 is tied to +5 V. Pin 7 NC on both. |
| 8 | ted7360 | pin 1 A2 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 1 = A2. Bidirectional address bus, section 4.3.2. |
| 9 | ted7360 | pin 2 A1 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 2 = A1. Bidirectional address bus, section 4.3.2. |
| 10 | ted7360 | pin 3 A0 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 3 = A0. Bidirectional address bus, section 4.3.2. |
| 11 | ted7360 | pin 5 /CS0 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 5 = /CS0. Low ROM output select, $8000-$BFFF; active-low bar visible in C16 pin diagram. |
| 12 | ted7360 | pin 6 /CS1 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 6 = /CS1. High ROM output select, $C000-$FFFF, subject to ROM banking; active-low bar in C16 diagram. |
| 13 | ted7360 | pin 8 /IRQ | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 8 = /IRQ. Open-drain interrupt output; raster comparator plus three timers (p. 9). |
| 14 | ted7360 | pin 9 MUX | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 9 = MUX. External RAM row/column multiplex control output; Plus/4 uses 4164 RAM. |
| 15 | ted7360 | pin 10 /RAS | UNVERIFIABLE | TED pp. 8-10; C16 PDF p. 11 | Pin 10 /RAS output confirmed. Source is silent on the exclusive diagnosis "No pulses = TED dead"; it does not establish clock/power/loading prerequisites. |
| 16 | ted7360 | pin 11 /CAS | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 11 = /CAS. DRAM column-address strobe output. |
| 17 | ted7360 | pin 13 COLOR | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 13 = COLOR. Open-source chroma including burst, 1 kohm termination to ground (p. 10). |
| 18 | ted7360 | pin 14 Φ IN | UNVERIFIABLE | TED p. 10; C16 PDF p. 11 | Pin 14 and both input frequencies and +/-70 ppm confirmed. Source is silent on the probe diagnosis that a dead input uniquely identifies oscillator/crystal. |
| 19 | ted7360 | pin 15 K0 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 15 = K0. Keyboard latch input with internal pull-up; K0 freezes and K1 forces NTSC when externally driven to 10 V (p. 9). |
| 20 | ted7360 | pin 16 K1 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 16 = K1. Keyboard latch input with internal pull-up; K0 freezes and K1 forces NTSC when externally driven to 10 V (p. 9). |
| 21 | ted7360 | pin 17 K2 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 17 = K2. Keyboard latch input with internal pull-up; K0 freezes and K1 forces NTSC when externally driven to 10 V (p. 9). |
| 22 | ted7360 | pin 18 K3 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 18 = K3. Keyboard latch input with internal pull-up; K0 freezes and K1 forces NTSC when externally driven to 10 V (p. 9). |
| 23 | ted7360 | pin 19 K4 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 19 = K4. Keyboard latch input with internal pull-up; K0 freezes and K1 forces NTSC when externally driven to 10 V (p. 9). |
| 24 | ted7360 | pin 20 K5 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 20 = K5. Keyboard latch input with internal pull-up; K0 freezes and K1 forces NTSC when externally driven to 10 V (p. 9). |
| 25 | ted7360 | pin 21 K6 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 21 = K6. Keyboard latch input with internal pull-up; K0 freezes and K1 forces NTSC when externally driven to 10 V (p. 9). |
| 26 | ted7360 | pin 22 K7 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 22 = K7. Keyboard latch input with internal pull-up; K0 freezes and K1 forces NTSC when externally driven to 10 V (p. 9). |
| 27 | ted7360 | pin 23 LUM | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 23 = LUM. Sync and luminance, open drain requiring external 1 kohm pull-up (p. 10). |
| 28 | ted7360 | pin 25 DB0 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 25 = DB0. Bidirectional data bus, section 4.3.2. |
| 29 | ted7360 | pin 26 DB1 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 26 = DB1. Bidirectional data bus, section 4.3.2. |
| 30 | ted7360 | pin 27 DB2 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 27 = DB2. Bidirectional data bus, section 4.3.2. |
| 31 | ted7360 | pin 28 DB3 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 28 = DB3. Bidirectional data bus, section 4.3.2. |
| 32 | ted7360 | pin 30 DB5 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 30 = DB5. Bidirectional data bus, section 4.3.2. |
| 33 | ted7360 | pin 31 DB6 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 31 = DB6. Bidirectional data bus, section 4.3.2. |
| 34 | ted7360 | pin 32 DB7 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 32 = DB7. Bidirectional data bus, section 4.3.2. |
| 35 | ted7360 | pin 33 SND | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 33 = SND. Sound output; two generators, second selectable tone/noise (pp. 10,33). |
| 36 | ted7360 | pin 34 BA | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 34 = BA. BA low three single cycles before fetch, remains low during fetch; CPU RDY shown on C16 sheet 2. |
| 37 | ted7360 | pin 35 AEC | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 35 = AEC. AEC output; 7501 AEC pin 4 is shown in both hardware manual p. 14 and C16 pin diagram. |
| 38 | ted7360 | pin 36 A15 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 36 = A15. Bidirectional address bus, section 4.3.2. |
| 39 | ted7360 | pin 37 A14 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 37 = A14. Bidirectional address bus, section 4.3.2. |
| 40 | ted7360 | pin 38 A13 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 38 = A13. Bidirectional address bus, section 4.3.2. |
| 41 | ted7360 | pin 40 A11 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 40 = A11. Bidirectional address bus, section 4.3.2. |
| 42 | ted7360 | pin 41 A10 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 41 = A10. Bidirectional address bus, section 4.3.2. |
| 43 | ted7360 | pin 44 A7 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 44 = A7. Bidirectional address bus, section 4.3.2. |
| 44 | ted7360 | pin 45 A6 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 45 = A6. Bidirectional address bus, section 4.3.2. |
| 45 | ted7360 | pin 46 A5 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 46 = A5. Bidirectional address bus, section 4.3.2. |
| 46 | ted7360 | pin 47 A4 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 47 = A4. Bidirectional address bus, section 4.3.2. |
| 47 | ted7360 | pin 48 A3 | CONFIRMED | TED pp. 8-10,14,33; C16 PDF p. 11 | Source pin 48 = A3. Bidirectional address bus, section 4.3.2. |
| 48 | c16 | Crystal | UNVERIFIABLE | TED p. 10 | Both master input frequencies confirmed. Source is silent on C16 board reference designators Y1 and Q1/Q2; those appear in the separately cited C16 schematic, not this record citation. |
| 49 | c16 | Master clock | CONFIRMED | TED pp. 8,10 | PHI IN is pin 14; input clocks 14.31818 MHz NTSC and 17.734475 MHz PAL. |
| 50 | c16 | CPU clock (single) | WRONG | TED pp. 35,38 (pinout),14 | MEDIUM; prove-it-works. PAL CPU pin-12 clock is 886.7 kHz (0.8867 MHz) in the pinout on p. 38, not 884 kHz. P. 35 is timer prose and conflicts with the CPU pinout. NTSC 0.894 MHz is a rounded value; CPU input pin 1 confirmed on p. 14. |
| 51 | c16 | CPU clock (double, border and blanking) | CONFIRMED | TED pp. 10,14,33 | TED pin 12 system clock to 7501 pin 1; NTSC doubles from about 894 kHz to 1.788 MHz in non-display time. P. 33 retains single speed during refresh; doubling can also be disabled (p. 37). |
| 52 | plus4 | Master clock | CONFIRMED | TED pp. 8,10 | PHI IN is pin 14; input clocks 14.31818 MHz NTSC and 17.734475 MHz PAL. |
| 53 | plus4 | CPU clock (single) | WRONG | TED pp. 35,38 (pinout),14 | MEDIUM; prove-it-works. PAL CPU pin-12 clock is 886.7 kHz (0.8867 MHz) in the pinout on p. 38, not 884 kHz. P. 35 is timer prose and conflicts with the CPU pinout. NTSC 0.894 MHz is a rounded value; CPU input pin 1 confirmed on p. 14. |
| 54 | plus4 | CPU clock (double, border and blanking) | CONFIRMED | TED pp. 10,14,33 | TED pin 12 system clock to 7501 pin 1; NTSC doubles from about 894 kHz to 1.788 MHz in non-display time. P. 33 retains single speed during refresh; doubling can also be disabled (p. 37). |
| 55 | c16/c16-iec | pin 1 /SRQ IN | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 1 = SRQ IN. C16 R102 pulls the unused service-request line to +5 V. |
| 56 | c16/c16-iec | pin 2 GND | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 2 = GND. Ground connection shown. |
| 57 | c16/c16-iec | pin 3 ATN | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 3 = ATN. 7406 open-collector driver and pull-ups shown; clock/data have receive paths. |
| 58 | c16/c16-iec | pin 4 CLK | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 4 = CLK. 7406 open-collector driver and pull-ups shown; clock/data have receive paths. |
| 59 | c16/c16-iec | pin 5 DATA | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 5 = DATA. 7406 open-collector driver and pull-ups shown; clock/data have receive paths. |
| 60 | c16/c16-iec | pin 6 /RESET | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 6 = /RESET. Buffered active-low reset to serial connector, pulled high when released. |
| 61 | c16/c16-exp | pin 1 GND | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 1 = GND. Ground/0 V. |
| 62 | c16/c16-exp | pin 2 +5 V | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 2 = +5 V. Power rail +5 V. |
| 63 | c16/c16-exp | pin 3 +5 V | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 3 = +5 V. Power rail +5 V. |
| 64 | c16/c16-exp | pin 4 /IRQ | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 4 = /IRQ. Interrupt input; system pull-up shown in C16 sheet 2. |
| 65 | c16/c16-exp | pin 5 R/W | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 5 = R/W. System read/write output. |
| 66 | c16/c16-exp | pin 6 C1 HIGH | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 6 = C1 HIGH. Active-low cartridge select; C2 bank is reserved. |
| 67 | c16/c16-exp | pin 7 C2 LOW | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 7 = C2 LOW. Active-low cartridge select; C2 bank is reserved. |
| 68 | c16/c16-exp | pin 8 C2 HIGH | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 8 = C2 HIGH. Active-low cartridge select; C2 bank is reserved. |
| 69 | c16/c16-exp | pin 9 /CS1 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 9 = /CS1. TED high ROM select $C000-$FFFF (TED p. 9). |
| 70 | c16/c16-exp | pin 10 /CS0 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 10 = /CS0. TED low ROM select $8000-$BFFF (TED p. 9). |
| 71 | c16/c16-exp | pin 11 /CAS | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 11 = /CAS. Signal location verified in physical pin table and diagram. |
| 72 | c16/c16-exp | pin 12 MUX | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 12 = MUX. Signal location verified in physical pin table and diagram. |
| 73 | c16/c16-exp | pin 13 BA | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 13 = BA. Low for DMA, output only. |
| 74 | c16/c16-exp | pin 14 D7 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 14 = D7. Unbuffered system bus (section 10.2). |
| 75 | c16/c16-exp | pin 15 D6 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 15 = D6. Unbuffered system bus (section 10.2). |
| 76 | c16/c16-exp | pin 17 D4 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 17 = D4. Unbuffered system bus (section 10.2). |
| 77 | c16/c16-exp | pin 18 D3 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 18 = D3. Unbuffered system bus (section 10.2). |
| 78 | c16/c16-exp | pin 19 D2 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 19 = D2. Unbuffered system bus (section 10.2). |
| 79 | c16/c16-exp | pin 20 D1 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 20 = D1. Unbuffered system bus (section 10.2). |
| 80 | c16/c16-exp | pin 21 D0 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 21 = D0. Unbuffered system bus (section 10.2). |
| 81 | c16/c16-exp | pin 22 AEC | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 22 = AEC. Signal location verified in physical pin table and diagram. |
| 82 | c16/c16-exp | pin 23 EXT AUDIO | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 23 = EXT AUDIO. Input, 1 V p-p full scale, AC coupled (p. 24). |
| 83 | c16/c16-exp | pin 25 GND | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 25 = GND. Ground/0 V. |
| 84 | c16/c16-exp | pin B C1 LOW | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact B = C1 LOW. Active-low cartridge select; C2 bank is reserved. |
| 85 | c16/c16-exp | pin C /BRESET | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact C = /BRESET. Buffered reset output, active low. |
| 86 | c16/c16-exp | pin D /RAS | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact D = /RAS. Signal location verified in physical pin table and diagram. |
| 87 | c16/c16-exp | pin E Φ0 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact E = PHI0. Signal location verified in physical pin table and diagram. |
| 88 | c16/c16-exp | pin F A15 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact F = A15. Unbuffered system bus (section 10.2). |
| 89 | c16/c16-exp | pin H A14 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact H = A14. Unbuffered system bus (section 10.2). |
| 90 | c16/c16-exp | pin J A13 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact J = A13. Unbuffered system bus (section 10.2). |
| 91 | c16/c16-exp | pin K A12 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact K = A12. Unbuffered system bus (section 10.2). |
| 92 | c16/c16-exp | pin L A11 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact L = A11. Unbuffered system bus (section 10.2). |
| 93 | c16/c16-exp | pin M A10 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact M = A10. Unbuffered system bus (section 10.2). |
| 94 | c16/c16-exp | pin N A9 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact N = A9. Unbuffered system bus (section 10.2). |
| 95 | c16/c16-exp | pin P A8 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact P = A8. Unbuffered system bus (section 10.2). |
| 96 | c16/c16-exp | pin R A7 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact R = A7. Unbuffered system bus (section 10.2). |
| 97 | c16/c16-exp | pin S A6 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact S = A6. Unbuffered system bus (section 10.2). |
| 98 | c16/c16-exp | pin T A5 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact T = A5. Unbuffered system bus (section 10.2). |
| 99 | c16/c16-exp | pin U A4 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact U = A4. Unbuffered system bus (section 10.2). |
| 100 | c16/c16-exp | pin W A2 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact W = A2. Unbuffered system bus (section 10.2). |
| 101 | c16/c16-exp | pin X A1 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact X = A1. Unbuffered system bus (section 10.2). |
| 102 | c16/c16-exp | pin Y A0 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact Y = A0. Unbuffered system bus (section 10.2). |
| 103 | c16/c16-exp | pin Z NC | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact Z = NC. No connection. |
| 104 | c16/c16-exp | pin AA NC | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact AA = NC. No connection. |
| 105 | c16/c16-exp | pin BB NC | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact BB = NC. No connection. |
| 106 | c16/c16-exp | pin CC GND | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact CC = GND. Ground/0 V. |
| 107 | plus4/plus4-user | pin 1 GND | CONFIRMED | TED p. 19; connector map p. 33 | User contact 1 = GND. Ground/0 V. |
| 108 | plus4/plus4-user | pin 2 +5 V | CONFIRMED | TED p. 19; connector map p. 33 | User contact 2 = +5 V. +5 V supply output. |
| 109 | plus4/plus4-user | pin 3 /BRESET | CONFIRMED | TED p. 19; connector map p. 33 | User contact 3 = /BRESET. Buffered system reset output, active low. |
| 110 | plus4/plus4-user | pin 5 P3 | CONFIRMED | TED p. 19; connector map p. 33 | User contact 5 = P3. 6529 bidirectional port bit. |
| 111 | plus4/plus4-user | pin 6 P4 | CONFIRMED | TED p. 19; connector map p. 33 | User contact 6 = P4. 6529 bidirectional port bit. |
| 112 | plus4/plus4-user | pin 7 P5 | CONFIRMED | TED p. 19; connector map p. 33 | User contact 7 = P5. 6529 bidirectional port bit. |
| 113 | plus4/plus4-user | pin 8 RxC | CONFIRMED | TED p. 19; connector map p. 33 | User contact 8 = RxC. 6551 receive clock, input/output. |
| 114 | plus4/plus4-user | pin 9 ATN | CONFIRMED | TED p. 19; connector map p. 33 | User contact 9 = ATN. Attention output. |
| 115 | plus4/plus4-user | pin 11 9 V AC | CONFIRMED | TED p. 19; connector map p. 33 | User contact 11 = 9 V AC. 9 VAC winding, measured across user pins 10 and 11. |
| 116 | plus4/plus4-user | pin 12 GND | CONFIRMED | TED p. 19; connector map p. 33 | User contact 12 = GND. Ground/0 V. |
| 117 | plus4/plus4-user | pin A GND | CONFIRMED | TED p. 19; connector map p. 33 | User contact A = GND. Ground/0 V. |
| 118 | plus4/plus4-user | pin B P0 | CONFIRMED | TED p. 19; connector map p. 33 | User contact B = P0. 6529 bidirectional port bit. |
| 119 | plus4/plus4-user | pin D RTS | CONFIRMED | TED p. 19; connector map p. 33 | User contact D = RTS. 6551 handshake/data direction agrees with section 7.2; TTL levels rather than RS232 levels (connector-map prose). |
| 120 | plus4/plus4-user | pin E DTR | CONFIRMED | TED p. 19; connector map p. 33 | User contact E = DTR. 6551 handshake/data direction agrees with section 7.2; TTL levels rather than RS232 levels (connector-map prose). |
| 121 | plus4/plus4-user | pin F P7 | CONFIRMED | TED p. 19; connector map p. 33 | User contact F = P7. 6529 bidirectional port bit. |
| 122 | plus4/plus4-user | pin H DCD | CONFIRMED | TED p. 19; connector map p. 33 | User contact H = DCD. 6551 handshake/data direction agrees with section 7.2; TTL levels rather than RS232 levels (connector-map prose). |
| 123 | plus4/plus4-user | pin J P6 | CONFIRMED | TED p. 19; connector map p. 33 | User contact J = P6. 6529 bidirectional port bit. |
| 124 | plus4/plus4-user | pin L DSR | CONFIRMED | TED p. 19; connector map p. 33 | User contact L = DSR. 6551 handshake/data direction agrees with section 7.2; TTL levels rather than RS232 levels (connector-map prose). |
| 125 | plus4/plus4-user | pin M TxD | CONFIRMED | TED p. 19; connector map p. 33 | User contact M = TxD. 6551 handshake/data direction agrees with section 7.2; TTL levels rather than RS232 levels (connector-map prose). |
| 126 | plus4/plus4-user | pin N GND | CONFIRMED | TED p. 19; connector map p. 33 | User contact N = GND. Ground/0 V. |
| 127 | plus4/c16-iec | pin 1 /SRQ IN | WRONG | Plus/4 PDF p. 20, CN2; compare C16 PDF p. 14 | HIGH; fix-root-causes. Plus/4 CN2 pin 1 is explicitly NC, so /SRQ IN, R102 and +5 V idle are invalid for this machine. R102 belongs to the C16 schematic. The shared record needs machine-specific data. |
| 128 | plus4/c16-iec | pin 2 GND | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 2 = GND. Ground connection shown. |
| 129 | plus4/c16-iec | pin 3 ATN | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 3 = ATN. 7406 open-collector driver and pull-ups shown; clock/data have receive paths. |
| 130 | plus4/c16-iec | pin 4 CLK | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 4 = CLK. 7406 open-collector driver and pull-ups shown; clock/data have receive paths. |
| 131 | plus4/c16-iec | pin 5 DATA | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 5 = DATA. 7406 open-collector driver and pull-ups shown; clock/data have receive paths. |
| 132 | plus4/c16-iec | pin 6 /RESET | CONFIRMED | TED p. 22; C16 PDF p. 14 / alternate p. 12 (printed 8) | Serial pin 6 = /RESET. Buffered active-low reset to serial connector, pulled high when released. |
| 133 | plus4/c16-exp | pin 1 GND | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 1 = GND. Ground/0 V. |
| 134 | plus4/c16-exp | pin 2 +5 V | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 2 = +5 V. Power rail +5 V. |
| 135 | plus4/c16-exp | pin 3 +5 V | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 3 = +5 V. Power rail +5 V. |
| 136 | plus4/c16-exp | pin 4 /IRQ | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 4 = /IRQ. Interrupt input; system pull-up shown in C16 sheet 2. |
| 137 | plus4/c16-exp | pin 5 R/W | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 5 = R/W. System read/write output. |
| 138 | plus4/c16-exp | pin 6 C1 HIGH | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 6 = C1 HIGH. Active-low cartridge select; C2 bank is reserved. |
| 139 | plus4/c16-exp | pin 7 C2 LOW | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 7 = C2 LOW. Active-low cartridge select; C2 bank is reserved. |
| 140 | plus4/c16-exp | pin 8 C2 HIGH | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 8 = C2 HIGH. Active-low cartridge select; C2 bank is reserved. |
| 141 | plus4/c16-exp | pin 9 /CS1 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 9 = /CS1. TED high ROM select $C000-$FFFF (TED p. 9). |
| 142 | plus4/c16-exp | pin 10 /CS0 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 10 = /CS0. TED low ROM select $8000-$BFFF (TED p. 9). |
| 143 | plus4/c16-exp | pin 11 /CAS | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 11 = /CAS. Signal location verified in physical pin table and diagram. |
| 144 | plus4/c16-exp | pin 12 MUX | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 12 = MUX. Signal location verified in physical pin table and diagram. |
| 145 | plus4/c16-exp | pin 13 BA | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 13 = BA. Low for DMA, output only. |
| 146 | plus4/c16-exp | pin 14 D7 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 14 = D7. Unbuffered system bus (section 10.2). |
| 147 | plus4/c16-exp | pin 15 D6 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 15 = D6. Unbuffered system bus (section 10.2). |
| 148 | plus4/c16-exp | pin 16 D5 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 16 = D5. Unbuffered system bus (section 10.2). |
| 149 | plus4/c16-exp | pin 17 D4 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 17 = D4. Unbuffered system bus (section 10.2). |
| 150 | plus4/c16-exp | pin 18 D3 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 18 = D3. Unbuffered system bus (section 10.2). |
| 151 | plus4/c16-exp | pin 19 D2 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 19 = D2. Unbuffered system bus (section 10.2). |
| 152 | plus4/c16-exp | pin 20 D1 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 20 = D1. Unbuffered system bus (section 10.2). |
| 153 | plus4/c16-exp | pin 21 D0 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 21 = D0. Unbuffered system bus (section 10.2). |
| 154 | plus4/c16-exp | pin 22 AEC | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 22 = AEC. Signal location verified in physical pin table and diagram. |
| 155 | plus4/c16-exp | pin 23 EXT AUDIO | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 23 = EXT AUDIO. Input, 1 V p-p full scale, AC coupled (p. 24). |
| 156 | plus4/c16-exp | pin 25 GND | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact 25 = GND. Ground/0 V. |
| 157 | plus4/c16-exp | pin A GND | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact A = GND. Ground/0 V. |
| 158 | plus4/c16-exp | pin B C1 LOW | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact B = C1 LOW. Active-low cartridge select; C2 bank is reserved. |
| 159 | plus4/c16-exp | pin C /BRESET | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact C = /BRESET. Buffered reset output, active low. |
| 160 | plus4/c16-exp | pin D /RAS | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact D = /RAS. Signal location verified in physical pin table and diagram. |
| 161 | plus4/c16-exp | pin E Φ0 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact E = PHI0. Signal location verified in physical pin table and diagram. |
| 162 | plus4/c16-exp | pin F A15 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact F = A15. Unbuffered system bus (section 10.2). |
| 163 | plus4/c16-exp | pin H A14 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact H = A14. Unbuffered system bus (section 10.2). |
| 164 | plus4/c16-exp | pin J A13 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact J = A13. Unbuffered system bus (section 10.2). |
| 165 | plus4/c16-exp | pin K A12 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact K = A12. Unbuffered system bus (section 10.2). |
| 166 | plus4/c16-exp | pin L A11 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact L = A11. Unbuffered system bus (section 10.2). |
| 167 | plus4/c16-exp | pin M A10 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact M = A10. Unbuffered system bus (section 10.2). |
| 168 | plus4/c16-exp | pin P A8 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact P = A8. Unbuffered system bus (section 10.2). |
| 169 | plus4/c16-exp | pin R A7 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact R = A7. Unbuffered system bus (section 10.2). |
| 170 | plus4/c16-exp | pin S A6 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact S = A6. Unbuffered system bus (section 10.2). |
| 171 | plus4/c16-exp | pin T A5 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact T = A5. Unbuffered system bus (section 10.2). |
| 172 | plus4/c16-exp | pin U A4 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact U = A4. Unbuffered system bus (section 10.2). |
| 173 | plus4/c16-exp | pin V A3 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact V = A3. Unbuffered system bus (section 10.2). |
| 174 | plus4/c16-exp | pin W A2 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact W = A2. Unbuffered system bus (section 10.2). |
| 175 | plus4/c16-exp | pin X A1 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact X = A1. Unbuffered system bus (section 10.2). |
| 176 | plus4/c16-exp | pin Y A0 | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact Y = A0. Unbuffered system bus (section 10.2). |
| 177 | plus4/c16-exp | pin AA NC | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact AA = NC. No connection. |
| 178 | plus4/c16-exp | pin BB NC | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact BB = NC. No connection. |
| 179 | plus4/c16-exp | pin CC GND | CONFIRMED | TED pp. 23-24; connector map p. 33; C16 printed p. 7 | Expansion contact CC = GND. Ground/0 V. |
| 180 | c16 | CPU clock | UNVERIFIABLE | TED pp. 8,14,33 | Frequencies and TED pin 12 / CPU pin 1 supported by the document. Source is silent on the exclusive TED/U1 fault diagnosis when master is present but output absent. |
| 181 | c16 | DRAM strobes | WRONG | TED pp. 3,9,32-33 | MEDIUM; fix-root-causes. Pins 10 /RAS, 11 /CAS, 9 MUX are correct. /CAS is conditional on a DRAM access and is absent during RAS-only refresh; it is not continuously pulsing "likewise" with /RAS. Strobes alone do not prove the RAM chips are the fault. |
| 182 | plus4/plus4-power | pin 1 +5 V DC | CONFIRMED | Plus/4 PSU schematic; connector map power drawing | PSU pin 1 = +5.2 V regulated (7805 with lifted ground). AC is measured between pins 3 and 4, nominal 9 VAC. |
| 183 | plus4/plus4-power | pin 2 GND | CONFIRMED | Plus/4 PSU schematic; connector map power drawing | PSU pin 2 = GND. AC is measured between pins 3 and 4, nominal 9 VAC. |
| 184 | plus4/plus4-power | pin 3 9 V AC | CONFIRMED | Plus/4 PSU schematic; connector map power drawing | PSU pin 3 = 9 VAC winding. AC is measured between pins 3 and 4, nominal 9 VAC. |
| 185 | plus4/plus4-power | pin 4 9 V AC | CONFIRMED | Plus/4 PSU schematic; connector map power drawing | PSU pin 4 = 9 VAC winding. AC is measured between pins 3 and 4, nominal 9 VAC. |
| 186 | plus4 | +5 V | UNVERIFIABLE | Plus/4 PSU schematic; TED pp. 8,14,18 | Power pin 1, TED 4, CPU 5 and 4164 8 are +5 V points. PSU drawing gives +5.2 V; source is silent on a 4.9-5.2 V acceptance range and on high voltage excluding every board fault. |
| 187 | plus4 | 9 V AC | WRONG | Plus/4 PDF pp. 20-21; PSU drawing; TED p. 19 | MEDIUM; fix-root-causes. 9 VAC between power pins 3/4 and user pins 10/11 is correct. It also feeds the onboard BA20 bridge and +9 V UNREG circuitry, so "Only brought out to the user port" is false. Record citations to PSU/TED pinouts alone do not establish that claim. |
| 188 | vic20/vic20-power | pin 1 9 V AC | CONFIRMED | VIC schematic 324001 sheet 2; VIC PRG PDF p. 245 (printed 229) | Early two-pin J1 carries the external nominal 9 VAC transformer winding. Measure between its two pins; this source describes the two-pin model. |
| 189 | vic20/vic20-power | pin 2 9 V AC | CONFIRMED | VIC schematic 324001 sheet 2; VIC PRG PDF p. 245 (printed 229) | Early two-pin J1 carries the external nominal 9 VAC transformer winding. Measure between its two pins; this source describes the two-pin model. |
| 190 | vic20 | +5 V | WRONG | VIC 324001 sheets 1-2; Carlsen VIC20, regulator/bridge/fuse sections | MEDIUM; fix-root-causes. Nominal +5 V at 6502 pin 8 and LM323 VR1 output, with CR4 bridge, is supported for the early board. A sagging supply does not prove a shorted chip: Carlsen describes regulator/bridge/connection faults and checking bridge, regulator, then chips. The stated 4.95-5.10 V range is not supplied by these sources; later boards use an external +5 V supply. |
| 191 | vic20 | 9 V AC in | CONFIRMED | VIC 324001 sheets 1-2; PRG PDF p. 245 (printed 229) | J1 and user pins 10/11 connect to the nominal 9 VAC transformer supply (board switch/filter/fuse are shown). |
| 192 | vic20 | Crystal | CONFIRMED | VIC Version E schematic, single sheet | Y1 explicitly marked 14.31818 MHz. |
| 193 | c1541 | Crystal | CONFIRMED | 1541 service manual PDF p. 10 | Y1 oscillator/crystal is explicitly 16 MHz. |
| 194 | c1541 | Bit clock (density divider, 251748 short board) | UNVERIFIABLE | 1541 service manual PDF pp. 10,31 | Four frequencies and divisors 13,14,15,16 supported; short-board schematic verifies 325572 CLK pin 19. Source table prints tracks 15-30 for the third band, overlapping 18-24, rather than the claimed 25-30. The intended 25-30 is plausible but cannot be literally confirmed against this source without a corrected source. |
| 195 | c1541 | +5 V | UNVERIFIABLE | 1541 service manual PDF pp. 8,25 | +5 V at CPU pin 8 is supported. Source is silent on the 4.75-5.25 V tolerance and the attributed Carlsen LED diagnosis; Carlsen is not cited by this item (his separate text does support the symptom). |
| 196 | c1541 | CPU clock | CONFIRMED | 1541 service manual PDF pp. 10,19,25-26 | 16 MHz divided by 16 yields 1 MHz system clock; pinout and troubleshooting specify 6502 pin 37. Diagram shows oscillator/divider signal path to CPU. |
| 197 | c1541 | +5 V | UNVERIFIABLE | 1541 service manual PDF pp. 8,24-27; cited Carlsen 1541 | CPU 8 / VIA 20 supply pins and VR2 nominal +5 V supported; long-board VR2 LM323 shown on layout. Source is silent on the stated 4.75-5.25 V acceptance interval and does not document 1541-II SW1 path. The II addendum cited by other records does document SW1. |
| 198 | c1541 | +12 V | CONFIRMED | 1541 service manual PDF pp. 8,17; 251748 rev. E sheet 3 | VR1 LM340-12 output is +12 V; P7 pins 1/2 common and P5 pin 2 supply shown. Q1 produces protected +12VF for read/write circuits. |
| 199 | c1541 | +12VF | CONFIRMED | 1541 service manual PDF p. 17; 251748 rev. E sheet 3 | Q1 series pass supplies +12VF; Q2 monitors +5 V with CR5 reference and L8/C15 delay, suppressing writes while CPU lacks control during power transitions. |
| 200 | c1541 | Unregulated | CONFIRMED | Carlsen fix1541.txt, DRIVE DEAD... OR NEARLY; 251748 sheet 3 | Carlsen explicitly gives diode cathodes as unregulated about 10 V / 20 V for 5 V / 12 V sources; diagram assigns CR4 to 5 V and CR2 to 12 V side. |
| 201 | c1541/1541-iec | pin 1 /SRQ | UNVERIFIABLE | 1541-II PDF p. 7 (printed 43); 251748 sheet 3; 1541 PDF p. 12 | Pin 1 SRQ passes between sockets. Source is silent on 1571/1581 fast-serial use; standalone drive drawing shows no local pull-up for SRQ, so about +5 V requires an external pull-up/connected computer, a condition missing from record. |
| 202 | c1541/1541-iec | pin 2 GND | CONFIRMED | 1541-II PDF p. 7 (printed 43); 251748 sheet 3 | IEC pin 2 GND/0 V. |
| 203 | c1541/1541-iec | pin 4 CLK | CONFIRMED | 1541-II PDF p. 7 (printed 43); 1541 PDF p. 12 | IEC pin 4 CLK bidirectional, open-collector driver and +5 V pull-up; high when released. |
| 204 | c1541/1541ii-power | pin 1 +5 V | CONFIRMED | 1541-II PDF p. 7 (printed 43); PSU 312551-01 drawing | Power DIN pin 1 = +5 V. Both supply paths through SW1 shown. |
| 205 | c1541/1541ii-power | pin 3 NC | CONFIRMED | 1541-II PDF p. 7 (printed 43); PSU 312551-01 drawing | Power DIN pin 3 = NC. Explicitly NC in PSU drawing. |
| 206 | c1541/1541ii-power | pin 4 +12 V | CONFIRMED | 1541-II PDF p. 7 (printed 43); PSU 312551-01 drawing | Power DIN pin 4 = +12 V. Both supply paths through SW1 shown. |
| 207 | c1541/1541ii-stepper | pin 1 +12 V | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN3 | Stepper CN3 pin 1 = +12 V. Pins 1 and 2 share centre-tap supply; phase pins drawn in order 4,5,3,6 but numbered B,C,A,D respectively. |
| 208 | c1541/1541ii-stepper | pin 2 +12 V | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN3 | Stepper CN3 pin 2 = +12 V. Pins 1 and 2 share centre-tap supply; phase pins drawn in order 4,5,3,6 but numbered B,C,A,D respectively. |
| 209 | c1541/1541ii-stepper | pin 3 ΦA | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN3 | Stepper CN3 pin 3 = phase A. Pins 1 and 2 share centre-tap supply; phase pins drawn in order 4,5,3,6 but numbered B,C,A,D respectively. |
| 210 | c1541/1541ii-stepper | pin 4 ΦB | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN3 | Stepper CN3 pin 4 = phase B. Pins 1 and 2 share centre-tap supply; phase pins drawn in order 4,5,3,6 but numbered B,C,A,D respectively. |
| 211 | c1541/1541ii-stepper | pin 5 ΦC | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN3 | Stepper CN3 pin 5 = phase C. Pins 1 and 2 share centre-tap supply; phase pins drawn in order 4,5,3,6 but numbered B,C,A,D respectively. |
| 212 | c1541/1541ii-stepper | pin 6 ΦD | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN3 | Stepper CN3 pin 6 = phase D. Pins 1 and 2 share centre-tap supply; phase pins drawn in order 4,5,3,6 but numbered B,C,A,D respectively. |
| 213 | c1541/1541ii-motor | pin 1 GND | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN4 | CN4 pin 1 explicitly tied to ground, 0 V. |
| 214 | c1541/1541ii-motor | pin 2 WP LED + | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN4 | CN4 pin 2 to +5 V through R41 150 ohms, sensor LED supply. |
| 215 | c1541/1541ii-motor | pin 3 WPRT | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN4 | CN4 pin 3 WPRT, R30 15k / R10 4.7k pull-ups and U9 LS04 input shown. |
| 216 | c1541/1541ii-motor | pin 4 GND | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN4 | CN4 pin 4 explicitly tied to ground, 0 V. |
| 217 | c1541/1541ii-motor | pin 5 GND | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN4 | CN4 pin 5 explicitly tied to ground, 0 V. |
| 218 | c1541/1541ii-motor | pin 6 +12 V | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN4 | CN4 pin 6 directly +12 V motor supply. |
| 219 | c1541/1541ii-motor | pin 7 MTR | CONFIRMED | 1541-II PDF p. 7 (printed 43), CN4 | CN4 pin 7 MTR connects U13 2003 output pin 11; low-side sink enables motor. |

## Coverage

| kind | items | confirmed | wrong | unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 40 | 38 | 0 | 2 |
| clock-row | 10 | 6 | 2 | 2 |
| connector-pin | 158 | 153 | 4 | 1 |
| first-ten | 4 | 1 | 1 | 2 |
| rail | 8 | 4 | 2 | 2 |
| TOTAL | 220 | 202 | 9 | 9 |
