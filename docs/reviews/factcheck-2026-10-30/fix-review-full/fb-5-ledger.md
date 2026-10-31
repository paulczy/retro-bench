# fb-5 source review ledger

Coverage: 189 items (188 main-table rows at lines 826-1013 plus 1 additional fb-5 row). Correct 155; wrong 6; unproven 28.

No data files or commits changed. Every item has a decision below. CORRECT means the revised assertion or change is supported, including an honest explicit conflict. UNPROVEN means a retained technical claim still lacks proof; the note reports whether verify is honest. WRONG means an observed contradiction. Existing wrong content in a flag-only change is not excused by the flag.

## Retrieval and direct checks

All main URLs were attempted with curl.exe -L -A Mozilla/5.0 into fb-5/. HTTPS curl failed locally with schannel SEC_E_NO_CREDENTIALS. Python urllib with the same User-Agent then retrieved PDFs/GIFs/HTML. PDFs were passed through pdftotext -layout. Relevant scanned pages were rendered with pdftoppm -f N -l N -r 110 -png and inspected directly. Source files and page renders are in fb-5/. fetch.py, extra.py and more.py preserve retrieval logic. HTTP406 IBM pages were searched and opened through the web tool; unresolved specifics are labelled unproven. Fix-agent artifacts were not evidence.

Machine-readable evaluated HEAD/current records and decisions: [decisions.json](fb-5/decisions.json). URL manifests: [main](fb-5/sources.json), [extra](fb-5/extra-sources.json), [more](fb-5/more-sources.json). Data scripts were evaluated to collect the actual records, not to infer source correctness.

Web-only fallback pages inspected: [5155 PSU](https://www.minuszerodegrees.net/5155/psu/5155_psu.htm), [5160 RAM](https://www.minuszerodegrees.net/5160/ram/5160_ram_64_256.htm), and search text for [5160 startup](https://mail.minuszerodegrees.net/5160/motherboard/IBM%205160%20-%20Startup%20sequence.htm). The independent 5155 startup page could not be fetched.

## Per-item decisions

### 28:261 — tandy.js coco2 rail +5 V (log line 826)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo2 PDF9 names stock MCM4517 and optional MC6665; PDF33 establishes a single +5V DRAM supply; PDF50 specifies ±5% regulation. The 4164-only claim was too narrow.

Log source locator: S6 PDF 9,33,50,63,86 (printed 3,27,44,57,85).

Actual NEW record (with parent source/layout context):
```json
{"rail":"+5 V","expect":"4.75–5.25 V","where":"6809E pin 7; SAM pin 40; R2 (U1 end)","note":"SALT-regulated, ±5 %. The only logic rail: the RAM runs on +5 V (standard 16K x 1 MCM4517, optional 64K x 1 MC6665 upgrade)."}
```

### 29:0 — tandy.js coco3 clock-row Crystal X1 (log line 827)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Sopko sheet1 labels X1 without a rate; CoCo3 p36 supplies 28.63636MHz NTSC. Added attribution is necessary.

Log source locator: redraw p. 1.

Actual NEW record (with parent source/layout context):
```json
{"name":"Crystal X1","where":"GIME pins 2, 3","f":"28.63636 MHz","source":{"label":"Color Computer 3 Revised Schematic (Ty Sopko), X1","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Revised%20Schematic%20(Ty%20Sopko).pdf","note":"The redraw gives no frequency; 28.63636 MHz is from the service manual p. 36."}}
```

### 29:1 — tandy.js gime-tcc1014 pin 2 (log line 828)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: False.

Sopko sheet1 and GIME block diagram p96 show pin2 EXTAL input and pin3 XTAL output. Canary values unchanged.

Log source locator: C3 p. 96; redraw p. 1.

Actual NEW record (with parent source/layout context):
```json
{"n":2,"name":"EXTAL","type":"clock","dir":"in","desc":"Crystal input. X1 is 28.63636 MHz on the NTSC board.","terms":["clock"],"probe":"28.63636 MHz. No oscillation, dead machine."}
```

### 29:2 — tandy.js gime-tcc1014 pin 3 (log line 829)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: False.

Sopko sheet1 and GIME block diagram p96 show pin2 EXTAL input and pin3 XTAL output. Canary values unchanged.

Log source locator: C3 p. 96; redraw p. 1.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"XTAL","type":"clock","dir":"out","desc":"Crystal output.","terms":["clock"]}
```

### 29:4 — tandy.js gime-tcc1014 pin 5 (log line 830)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 pp34,36 describe column strobing during RAM access; Waveform9 p66 shows active-low CAS at TP5. The universal every-cycle assertion is removed.

Log source locator: C3 pp. 34–36, 66, 96.

Actual NEW record (with parent source/layout context):
```json
{"n":5,"name":"/CAS","type":"ctrl","dir":"out","activeLow":true,"desc":"DRAM column address strobe (TP5).","terms":["ras-cas"],"probe":"Pulsing LOW during RAM accesses (service manual Waveform 9)."}
```

### 29:49 — tandy.js gime-tcc1014 pin 57 (log line 831)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p96 draws RAMD7..0 into RAM data latches, separately from bidirectional CPUD. Sopko sheet1 traces these pins to RAM outputs. Input direction is justified.

Log source locator: C3 p. 96 RAM-data bus/latches.

Actual NEW record (with parent source/layout context):
```json
{"n":57,"name":"RAMD7","type":"data","dir":"in","desc":"DRAM data bus bit 7, into the GIME data latches (the service manual block diagram draws it as an input).","terms":["dram"]}
```

### 29:50 — tandy.js gime-tcc1014 pin 58 (log line 832)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p96 draws RAMD7..0 into RAM data latches, separately from bidirectional CPUD. Sopko sheet1 traces these pins to RAM outputs. Input direction is justified.

Log source locator: C3 p. 96 RAM-data bus/latches.

Actual NEW record (with parent source/layout context):
```json
{"n":58,"name":"RAMD6","type":"data","dir":"in","desc":"DRAM data bus bit 6, into the GIME data latches (the service manual block diagram draws it as an input).","terms":["dram"]}
```

### 29:51 — tandy.js gime-tcc1014 pin 59 (log line 833)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p96 draws RAMD7..0 into RAM data latches, separately from bidirectional CPUD. Sopko sheet1 traces these pins to RAM outputs. Input direction is justified.

Log source locator: C3 p. 96 RAM-data bus/latches.

Actual NEW record (with parent source/layout context):
```json
{"n":59,"name":"RAMD5","type":"data","dir":"in","desc":"DRAM data bus bit 5, into the GIME data latches (the service manual block diagram draws it as an input).","terms":["dram"]}
```

### 29:52 — tandy.js gime-tcc1014 pin 60 (log line 834)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p96 draws RAMD7..0 into RAM data latches, separately from bidirectional CPUD. Sopko sheet1 traces these pins to RAM outputs. Input direction is justified.

Log source locator: C3 p. 96 RAM-data bus/latches.

Actual NEW record (with parent source/layout context):
```json
{"n":60,"name":"RAMD4","type":"data","dir":"in","desc":"DRAM data bus bit 4, into the GIME data latches (the service manual block diagram draws it as an input).","terms":["dram"]}
```

### 29:53 — tandy.js gime-tcc1014 pin 61 (log line 835)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p96 draws RAMD7..0 into RAM data latches, separately from bidirectional CPUD. Sopko sheet1 traces these pins to RAM outputs. Input direction is justified.

Log source locator: C3 p. 96 RAM-data bus/latches.

Actual NEW record (with parent source/layout context):
```json
{"n":61,"name":"RAMD3","type":"data","dir":"in","desc":"DRAM data bus bit 3, into the GIME data latches (the service manual block diagram draws it as an input).","terms":["dram"]}
```

### 29:54 — tandy.js gime-tcc1014 pin 62 (log line 836)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p96 draws RAMD7..0 into RAM data latches, separately from bidirectional CPUD. Sopko sheet1 traces these pins to RAM outputs. Input direction is justified.

Log source locator: C3 p. 96 RAM-data bus/latches.

Actual NEW record (with parent source/layout context):
```json
{"n":62,"name":"RAMD2","type":"data","dir":"in","desc":"DRAM data bus bit 2, into the GIME data latches (the service manual block diagram draws it as an input).","terms":["dram"]}
```

### 29:55 — tandy.js gime-tcc1014 pin 63 (log line 837)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p96 draws RAMD7..0 into RAM data latches, separately from bidirectional CPUD. Sopko sheet1 traces these pins to RAM outputs. Input direction is justified.

Log source locator: C3 p. 96 RAM-data bus/latches.

Actual NEW record (with parent source/layout context):
```json
{"n":63,"name":"RAMD1","type":"data","dir":"in","desc":"DRAM data bus bit 1, into the GIME data latches (the service manual block diagram draws it as an input).","terms":["dram"]}
```

### 29:56 — tandy.js gime-tcc1014 pin 64 (log line 838)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p96 draws RAMD7..0 into RAM data latches, separately from bidirectional CPUD. Sopko sheet1 traces these pins to RAM outputs. Input direction is justified.

Log source locator: C3 p. 96 RAM-data bus/latches.

Actual NEW record (with parent source/layout context):
```json
{"n":64,"name":"RAMD0","type":"data","dir":"in","desc":"DRAM data bus bit 0, into the GIME data latches (the service manual block diagram draws it as an input).","terms":["dram"]}
```

### 29:93 — tandy.js coco-cart pin 35 (log line 839)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p49 specifies direct cartridge sound connection, external AC coupling and 3.9Vpp ceiling; p43 explains internal bias. Sopko sheet1 shows no series coupling capacitor.

Log source locator: C3 pp. 43, 49; redraw p. 1.

Actual NEW record (with parent source/layout context):
```json
{"n":35,"name":"SND","type":"audio","desc":"Sound input, wired straight to the sound multiplexer input (no coupling capacitor on the board), so a pak can play through the TV. The pak must AC-couple its signal.","expect":"No more than 3.9 V p-p, AC-coupled by the pak","geo":"edge-20x20-odd-even","verify":true,"sources":[{"label":"Color Computer Technical Reference Manual, Table 5 Cartridge Connector Signals, p. 36","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf#page=43"},{"label":"Color Computer 2 Service Manual (26-3026), 4.13 Cartridge Connector, pp. 51-55","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%202%20NTSC%20Service%20Manual%20(26-3026%20%26%2026-3027)%20(Tandy).pdf#page=57"}],"kind":"40-pin card-edge socket"}
```

### 29:98 — tandy.js coco-joystick pin 1 (log line 840)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p43 describes six-bit joystick conversion, not the removed 0.25..4.75V software transfer window. Removal avoids unsupported precision.

Log source locator: C3 pp. 43, 52, 57; redraw p. 1.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"POT A","type":"io","desc":"Pot A wiper (yellow). Right port: mux input Y0, JOYSTK(0), horizontal. Left port: Y2, JOYSTK(2).","expect":"0–5 V with stick position; BASIC reads it as 0–63","geo":"din6","sources":[{"label":"Color Computer Technical Reference Manual, schematic sheet 2 (P3, P4, MC14529 U9), p. 67","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf#page=74"},{"label":"Color Computer 2 Service Manual, Figure 4-16 Joystick Schematic, p. 55","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%202%20NTSC%20Service%20Manual%20(26-3026%20%26%2026-3027)%20(Tandy).pdf#page=61"}],"kind":"DIN socket, 5 pins used (6-pin shell)"}
```

### 29:112 — tandy.js coco-rgb pin 10 (log line 841)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p41 names IC4 pin13 as CM-8 sense. Sopko sheet1 traces CN3 pin10 through R62 with R61 pull-up, both4.7k. The contrary NC web table is honestly retained as conflict.

Log source locator: redraw p. 1 CN3/R61/R62; C3 p. 41; RGB web table.

Actual NEW record (with parent source/layout context):
```json
{"n":10,"name":"SENSE","type":"ctrl","desc":"Monitor sense input: pulled up through R61 (4.7 kΩ) and fed through R62 to PIA IC4 pin 13, the CM-8 sense line (service manual p. 41; Sopko redraw).","verify":true,"conflict":"pinouts.ru lists pin 10 as not connected.","geo":"custom","sources":[{"label":"Color Computer 3 Service Manual, 2.1 Technical, RGB (Analog)/Sound Output, p. 25","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Service%20Manual%20(Tandy).pdf#page=25"},{"label":"Color Computer 3 Service Manual, schematic diagram (CN3 RGB OUT), p. 104","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Service%20Manual%20(Tandy).pdf#page=104"},{"label":"Color Computer 3 Revised Schematic (Ty Sopko), CN3","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Revised%20Schematic%20(Ty%20Sopko).pdf"},{"label":"pinouts.ru, CM-8 / CoCo RGB (second source)","url":"https://old.pinouts.ru/Video/Cm8CoCoRGB_pinout.shtml"}],"kind":"10-pin header on the bottom of the board","pads":[{"n":1,"x":18,"y":38},{"n":3,"x":34,"y":38},{"n":5,"x":50,"y":38},{"n":7,"x":66,"y":38},{"n":9,"x":82,"y":38},{"n":2,"x":18,"y":62},{"n":4,"x":34,"y":62},{"n":6,"x":50,"y":62},{"n":8,"x":66,"y":62},{"n":10,"x":82,"y":62}]}
```

### 29:121 — tandy.js coco-serial pin 1 (log line 842)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 pp47-48: general CD differs from BASIC printer mode. Printer pin1 is unused; BUSY is pin2.

Log source locator: C3 pp. 47–48.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"CD","type":"serial","desc":"Carrier detect / status input for general RS-232 use. Not connected for a BASIC serial printer.","geo":"din4","sources":[{"label":"Color Computer Technical Reference Manual, RS232C Interface, Figure 13, p. 33","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf#page=40"}],"kind":"4-pin DIN socket"}
```

### 29:134 — tandy.js coco3 first-ten step 5 (log line 843)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

verify:true is present and honest. CoCo3 p56 names measurements and p66 supplies waveforms, but neither proves the complete fault-is-GIME-or-load diagnosis retained in ifNot.

Log source locator: C3 pp. 36, 56, 96.

Actual NEW record (with parent source/layout context):
```json
{"step":5,"check":"Oscillator","where":"GIME pins 2, 3","expect":"28.63636 MHz at X1","ifNot":"The oscillator circuit (X1 and its parts), then the GIME (IC6).","verify":true,"source":{"label":"Color Computer 3 Service Manual, 6.4 Processing Problem (check OSC circuit), p. 56","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Service%20Manual%20(Tandy).pdf#page=56"}}
```

### 29:135 — tandy.js coco3 first-ten step 6 (log line 844)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

verify:true is present and honest. CoCo3 p56 names measurements and p66 supplies waveforms, but neither proves the complete fault-is-GIME-or-load diagnosis retained in ifNot.

Log source locator: C3 pp. 33, 36, 56, 66, 96.

Actual NEW record (with parent source/layout context):
```json
{"step":6,"check":"E and Q","where":"GIME pins 6, 7 (TP2, TP3)","expect":"0.89 MHz, Q ahead of E (Waveform 7)","ifNot":"Missing with the oscillator running: the GIME. Low swing: a load on the line (CPU, PIAs, cartridge).","verify":true,"source":{"label":"Color Computer 3 Service Manual, 6.4 Processing Problem, p. 56","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Service%20Manual%20(Tandy).pdf#page=56"}}
```

### 29:136 — tandy.js coco3 first-ten step 7 (log line 845)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

verify:true is present and honest. CoCo3 p56 names measurements and p66 supplies waveforms, but neither proves the complete fault-is-GIME-or-load diagnosis retained in ifNot.

Log source locator: C3 pp. 34–36, 56, 66, 96.

Actual NEW record (with parent source/layout context):
```json
{"step":7,"check":"RAM strobes and write enables","where":"GIME pins 4, 5, 10, 11","expect":"/RAS (TP4) and /CAS (TP5) pulsing (Waveforms 8, 9); /WE0, /WE1 pulsing on RAM writes","verify":true,"ifNot":"The GIME, or a shorted line to the RAM.","source":{"label":"Color Computer 3 Service Manual, 6.4 Processing Problem, p. 56","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Service%20Manual%20(Tandy).pdf#page=56"}}
```

### 29:137 — tandy.js coco3 first-ten step 8 (log line 846)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CoCo3 p32 distinguishes HALT from NMI and maskable FIRQ; p56 calls these normally high. They do not all halt the CPU.

Log source locator: C3 pp. 32, 56.

Actual NEW record (with parent source/layout context):
```json
{"step":8,"check":"HALT, NMI, FIRQ","where":"6809E pins 40, 2, 4","expect":"HIGH","ifNot":"HALT held LOW stops the CPU; NMI LOW makes a non-maskable interrupt; FIRQ LOW interrupts only when it is unmasked. Remove any cartridge, then trace what pulls the line LOW; then check S0 to S2 and the address decoder IC9.","source":{"label":"Color Computer 3 Service Manual, 6.4 Processing Problem, p. 56","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Service%20Manual%20(Tandy).pdf#page=56"}}
```

### 29:172 — tandy.js coco-cart pin 35 (log line 847)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TRM PDF38 Fig11/PDF42 show direct cartridge sound routing; CoCo2 PDF60 explicitly requires AC coupling and ≤3.9Vpp. New wording no longer implies onboard coupling.

Log source locator: TRM PDF pp. 38, 42, 74; C2 PDF p. 60.

Actual NEW record (with parent source/layout context):
```json
{"n":35,"name":"SND","type":"audio","desc":"Sound input, wired straight to the sound multiplexer input (no coupling capacitor on the board), so a pak can play through the TV. The pak must AC-couple its signal.","expect":"No more than 3.9 V p-p, AC-coupled by the pak","geo":"edge-20x20-odd-even","verify":true,"sources":[{"label":"Color Computer Technical Reference Manual, Table 5 Cartridge Connector Signals, p. 36","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf#page=43"},{"label":"Color Computer 2 Service Manual (26-3026), 4.13 Cartridge Connector, pp. 51-55","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%202%20NTSC%20Service%20Manual%20(26-3026%20%26%2026-3027)%20(Tandy).pdf#page=57"}],"kind":"40-pin card-edge socket"}
```

### 29:186 — tandy.js coco-serial pin 1 (log line 848)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TRM PDF40 defines CD; PDF45 says printer pin1 is unused and BUSY is pin2.

Log source locator: TRM PDF pp. 40, 45 (printed 33, 38).

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"CD","type":"serial","desc":"Carrier detect / status input for general RS-232 use. Not connected for a BASIC serial printer.","geo":"din4","sources":[{"label":"Color Computer Technical Reference Manual, RS232C Interface, Figure 13, p. 33","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf#page=40"}],"kind":"4-pin DIN socket"}
```

### 29:189 — tandy.js coco-serial pin 4 (log line 849)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TRM PDF45 printed38 note1 changes seven to eight data bits at ROM revision1.1; 600baud, two stops and no parity are stated.

Log source locator: TRM PDF p. 45 (printed 38).

Actual NEW record (with parent source/layout context):
```json
{"n":4,"name":"RS-232 OUT","type":"serial","desc":"Serial data output. BASIC prints at 600 baud, 2 stop bits, no parity; 7 data bits before Color BASIC 1.1, 8 from 1.1 on.","expect":"Swings between about +12 V and -12 V","geo":"din4","sources":[{"label":"Color Computer Technical Reference Manual, RS232C Interface, Figure 13, p. 33","url":"https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf#page=40"}],"kind":"4-pin DIN socket"}
```

### 29:196 — tandy.js coco1 rail +5 V (log line 850)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TRM PDF40-41/PDF76 give nominal +5V and1.35A. Unsupported ±5% acceptance band is removed.

Log source locator: TRM PDF pp. 40–41, 71–73, 76.

Actual NEW record (with parent source/layout context):
```json
{"rail":"+5 V","expect":"+5 V","where":"6809E pin 7; SAM pin 40; TP12","note":"Logic supply, 1.35 A maximum."}
```

### 29:199 — tandy.js coco1 rail -5 V (log line 851)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TRM PDF40/PDF76 show100µA -5V, U19 79L05 andC18 to4116 VBB. The unsupported fails-first claim is actually absent.

Log source locator: TRM PDF pp. 40–41, 75–76.

Actual NEW record (with parent source/layout context):
```json
{"rail":"-5 V","expect":"About -5 V","where":"TP11; 4116 pin 1","note":"79L05 U19, 100 µA. RAM VBB on 4116 boards; check C18."}
```

### 29:234 — tandy.js cpu6803 pin 38 (log line 852)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

D-11531 shows R/W38 and AS39 to74LS373. Hitachi HD6803 PDF353,359-360 confirms functions without the incorrect SC2/SC1 aliases.

Log source locator: MC schematic p. 1; Hitachi PDF pp. 353, 359.

Actual NEW record (with parent source/layout context):
```json
{"n":38,"name":"R/W","type":"ctrl","dir":"out","desc":"Read/write. HIGH = read.","terms":["rw"]}
```

### 29:235 — tandy.js cpu6803 pin 39 (log line 853)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

D-11531 shows R/W38 and AS39 to74LS373. Hitachi HD6803 PDF353,359-360 confirms functions without the incorrect SC2/SC1 aliases.

Log source locator: MC schematic p. 1; MC manual p. 12; Hitachi PDF pp. 353, 359–360.

Actual NEW record (with parent source/layout context):
```json
{"n":39,"name":"AS","type":"ctrl","dir":"out","desc":"Address strobe. Latches A0-A7 into the 74LS373 U2."}
```

### 30:3 — tandy.js mc10-expansion pin 1 (log line 854)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: False.

MC10 p15 Table1 and D-11531 show expansion1 GND,3 D0. Canary data unchanged.

Log source locator: MC-10 p.15 Table 1; D-11531 p.1.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"GND","type":"ground","desc":"Signal ground.","expect":"0 V","geo":"edge-17x17-odd-even","verify":true,"sources":[{"label":"MC-10 Service Manual, I/O Connector, Table 1, p. 15","url":"https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf#page=15"},{"label":"MC-10 Schematic D-11531 (expansion edge row)","url":"https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Schematic/MC-10%20Schematic%20(Tandy).pdf"}],"kind":"34-pin card edge on the main board"}
```

### 30:5 — tandy.js mc10-expansion pin 3 (log line 855)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: False.

MC10 p15 Table1 and D-11531 show expansion1 GND,3 D0. Canary data unchanged.

Log source locator: MC-10 p.15 Table 1; D-11531 p.1.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"D0","type":"data","desc":"CPU data bit 0.","geo":"edge-17x17-odd-even","verify":true,"sources":[{"label":"MC-10 Service Manual, I/O Connector, Table 1, p. 15","url":"https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf#page=15"},{"label":"MC-10 Schematic D-11531 (expansion edge row)","url":"https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Schematic/MC-10%20Schematic%20(Tandy).pdf"}],"kind":"34-pin card edge on the main board"}
```

### 30:32 — tandy.js mc10-expansion pin 32 (log line 856)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

MC10 p15 gives nominal +5V on32,250mA, without a ±5% acceptance band.

Log source locator: MC-10 p.15 Table 1.

Actual NEW record (with parent source/layout context):
```json
{"n":32,"name":"+5 V","type":"power","desc":"+5 V for the pack, 250 mA.","expect":"+5 V","geo":"edge-17x17-odd-even","verify":true,"sources":[{"label":"MC-10 Service Manual, I/O Connector, Table 1, p. 15","url":"https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf#page=15"},{"label":"MC-10 Schematic D-11531 (expansion edge row)","url":"https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Schematic/MC-10%20Schematic%20(Tandy).pdf"}],"kind":"34-pin card edge on the main board"}
```

### 30:54 — tandy.js mc10 first-ten step 8 (log line 857)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

MC10 p22 asks for indications of CPU activity after reset with both shields removed, not transitions on every data line. New verify flag exists.

Log source locator: MC-10 p.22; p.15.

Actual NEW record (with parent source/layout context):
```json
{"step":8,"check":"Address and data activity","where":"I/O expansion edge pins 3, 4, 5, 6, 7, 8, 9, 10","expect":"Signs of CPU activity on the data lines after RESET (shields off)","verify":true,"ifNot":"No activity: an input holding the 6803, or the 6803. Activity but garbage on screen: memory, a buffer, or a short on the bus.","source":{"label":"MC-10 Service Manual, Troubleshooting, p. 22","url":"https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf#page=22"}}
```

### 30:57 — tandy.js mc10 rail +5 V (log line 858)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

MC10 p17 gives nominal +5V; p22 expressly treats deviation greater than10% as a supply fault.

Log source locator: MC-10 pp.12,17,22; D-11531 p.1.

Actual NEW record (with parent source/layout context):
```json
{"rail":"+5 V","expect":"+5 V; the service manual treats more than 10 % off as a fault","where":"6803 pin 7; 7805 output","note":"U17 7805, up to 1.5 A. Probe the 6803 Vcc."}
```

### 30:118 — dragon.js dragon-serial pin 4 (log line 859)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41505 sheet3 shows drivers powered by±12V; D64 Supplement pinout agrees on signals. Neither guarantees ±10V swing; deleting that number is justified.

Log source locator: CD41505 sheet 3; D64 Supplement pp.5,8.

Actual NEW record (with parent source/layout context):
```json
{"n":4,"name":"DTR","type":"serial","desc":"Data terminal ready out, from 6551 pin 11 through a 4069 and an LM348 driver and R12 (47 Ω).","expect":"Positive when ready (driver on ±12 V)","geo":"din7","sources":[{"label":"Dragon 64 Supplement, Pin-out of Dragon 64 RS232 connector, p. 8","url":"https://dragondata.worldofdragon.org/Publications/BASIC-MAN/DD_D64_Supplement.pdf#page=10"},{"label":"Dragon 64 CD41505 sheet 3 (PL8 RS-232 interface, 7 way DIN; IC11 SY6551)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D643-vid-sound-rs232.gif"},{"label":"Inside the Dragon, Appendix 5, 2. The RS232 interface, pp. 335-339","url":"https://archive.worldofdragon.org/browse/downloads/Books/InsideTheDragon%20-%20Smeed%20and%20Sommerville%20(1983).pdf#page=342"}],"kind":"7-pin DIN socket (270°)"}
```

### 30:120 — dragon.js dragon-serial pin 6 (log line 860)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41505 sheet3 shows drivers powered by±12V; D64 Supplement pinout agrees on signals. Neither guarantees ±10V swing; deleting that number is justified.

Log source locator: CD41505 sheet 3; D64 Supplement pp.5,8.

Actual NEW record (with parent source/layout context):
```json
{"n":6,"name":"TXD","type":"serial","desc":"Transmitted data out, from 6551 pin 10 through a 4069, an LM348 driver and R8 (47 Ω). 1 start, 8 data, 2 stop bits from BASIC.","expect":"Swings positive and negative (driver on ±12 V)","geo":"din7","sources":[{"label":"Dragon 64 Supplement, Pin-out of Dragon 64 RS232 connector, p. 8","url":"https://dragondata.worldofdragon.org/Publications/BASIC-MAN/DD_D64_Supplement.pdf#page=10"},{"label":"Dragon 64 CD41505 sheet 3 (PL8 RS-232 interface, 7 way DIN; IC11 SY6551)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D643-vid-sound-rs232.gif"},{"label":"Inside the Dragon, Appendix 5, 2. The RS232 interface, pp. 335-339","url":"https://archive.worldofdragon.org/browse/downloads/Books/InsideTheDragon%20-%20Smeed%20and%20Sommerville%20(1983).pdf#page=342"}],"kind":"7-pin DIN socket (270°)"}
```

### 30:129 — dragon.js dragon-cassette pin 4 (log line 861)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Dragon Service Information PDF1 cassette item4 specifies270-470K series resistor by cutting pin4 track; item3 gives recorder peaks. Old Ω and factory-fitted wording were wrong.

Log source locator: Dragon Service Information PDF p.1, Cassette Faults item 4; SA2120 sh….

Actual NEW record (with parent source/layout context):
```json
{"n":4,"name":"CASS IN","type":"audio","desc":"From the recorder EAR socket, to the LM393 comparator and PA0 of the $FF20 PIA. To limit the signal, the Dragon Data service sheet recommends fitting 270–470 kΩ in series (cut the track to pin 4 and bridge it).","expect":"Tape audio; the Dragon 32 service sheet asks for at least +1 V and -0.5 V peaks","geo":"din5-180","sources":[{"label":"Dragon 32 Information for Machine Code Users, Cassette connections, p. 2","url":"https://dragondata.worldofdragon.org/Publications/Info_for_mc_users/Info_For_Machine_Code_Users_original.pdf#page=2"},{"label":"Dragon 32 circuit diagram SA2120 sheet 2 (PL4 cassette, relay, TR2)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21202-IO.gif"},{"label":"Dragon Data Service Information RWEW/KA/0080a, Cassette faults","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=1"}],"kind":"5-pin DIN socket (180°)"}
```

### 30:158 — dragon.js dragon32-psu pin 1 (log line 862)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SA2121 PL10 labels+12V1,+5V2,-5V3 and output table gives+5V1400mA. SA2120 sheet3 agrees; deleted tolerances are unspecified.

Log source locator: SA2121 PSU sheet; SA2120 sheet 3.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"+12 V","type":"power","desc":"+12 V from REG2 (LM7812). RAM VDD (4116 pin 8), cartridge pins 1 and 2.","expect":"+12 V","geo":"custom","sources":[{"label":"Dragon 32 PSU diagram SA2121 (PL10, output table +5 V 1400 mA, +12 V 250 mA, -5 V 50 mA)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21204-PSU-MOD.gif"},{"label":"Dragon 32 circuit diagram SA2120 sheet 3 (PL6)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21203-vid-sound.gif"},{"label":"Dragon Data repair notes, MK1 PSU and 16x16 CPU (1 kΩ across PL6 pin 9 and 0 V), p. 7","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32-Internal-repair-notes.pdf#page=7"}],"kind":"9-way board-to-board connector","pads":[{"n":1,"x":8,"y":50},{"n":2,"x":19,"y":50},{"n":3,"x":29,"y":50},{"n":4,"x":40,"y":50},{"n":5,"x":50,"y":50},{"n":6,"x":61,"y":50},{"n":7,"x":71,"y":50},{"n":8,"x":82,"y":50},{"n":9,"x":92,"y":50}]}
```

### 30:159 — dragon.js dragon32-psu pin 2 (log line 863)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SA2121 PL10 labels+12V1,+5V2,-5V3 and output table gives+5V1400mA. SA2120 sheet3 agrees; deleted tolerances are unspecified.

Log source locator: SA2121 PSU sheet; SA2120 sheet 3.

Actual NEW record (with parent source/layout context):
```json
{"n":2,"name":"+5 V","type":"power","desc":"+5 V from REG1 (LM309), 1.4 A maximum. All logic.","expect":"+5 V","geo":"custom","sources":[{"label":"Dragon 32 PSU diagram SA2121 (PL10, output table +5 V 1400 mA, +12 V 250 mA, -5 V 50 mA)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21204-PSU-MOD.gif"},{"label":"Dragon 32 circuit diagram SA2120 sheet 3 (PL6)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21203-vid-sound.gif"},{"label":"Dragon Data repair notes, MK1 PSU and 16x16 CPU (1 kΩ across PL6 pin 9 and 0 V), p. 7","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32-Internal-repair-notes.pdf#page=7"}],"kind":"9-way board-to-board connector","pads":[{"n":1,"x":8,"y":50},{"n":2,"x":19,"y":50},{"n":3,"x":29,"y":50},{"n":4,"x":40,"y":50},{"n":5,"x":50,"y":50},{"n":6,"x":61,"y":50},{"n":7,"x":71,"y":50},{"n":8,"x":82,"y":50},{"n":9,"x":92,"y":50}]}
```

### 30:160 — dragon.js dragon32-psu pin 3 (log line 864)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SA2121 PL10 labels+12V1,+5V2,-5V3 and output table gives+5V1400mA. SA2120 sheet3 agrees; deleted tolerances are unspecified.

Log source locator: SA2121 PSU sheet; SA2120 sheet 3.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"-5 V","type":"power","desc":"-5 V from REG3 (LM7905), 50 mA. RAM VBB (4116 pin 1) and the video output stage.","expect":"-5 V","geo":"custom","sources":[{"label":"Dragon 32 PSU diagram SA2121 (PL10, output table +5 V 1400 mA, +12 V 250 mA, -5 V 50 mA)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21204-PSU-MOD.gif"},{"label":"Dragon 32 circuit diagram SA2120 sheet 3 (PL6)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21203-vid-sound.gif"},{"label":"Dragon Data repair notes, MK1 PSU and 16x16 CPU (1 kΩ across PL6 pin 9 and 0 V), p. 7","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32-Internal-repair-notes.pdf#page=7"}],"kind":"9-way board-to-board connector","pads":[{"n":1,"x":8,"y":50},{"n":2,"x":19,"y":50},{"n":3,"x":29,"y":50},{"n":4,"x":40,"y":50},{"n":5,"x":50,"y":50},{"n":6,"x":61,"y":50},{"n":7,"x":71,"y":50},{"n":8,"x":82,"y":50},{"n":9,"x":92,"y":50}]}
```

### 30:166 — dragon.js dragon32 first-ten step 3 (log line 865)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SA2121 shows REG1 LM309, D1/D2/D5/D6 bridge,C6 4700µF and nominal+5V. Unsupported service-sequence wording is removed.

Log source locator: SA2121 PSU sheet.

Actual NEW record (with parent source/layout context):
```json
{"step":3,"check":"+5 V from the LM309 (REG1), switched on","where":"PSU board to CPU board (PL10 / PL6) pin 2 to pin 4","expect":"+5 V DC","ifNot":"PL10 seated, the bridge D1, D2, D5, D6 (1N4003), C6 (4700 µF), then the LM309.","source":{"label":"Dragon 32 PSU diagram SA2121 (REG1 LM309 +5 V 1400 mA, D1-D8, PL10)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21204-PSU-MOD.gif"}}
```

### 30:167 — dragon.js dragon32 first-ten step 4 (log line 866)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

SA2121 proves nominal rails but not the new categorical conclusion that a load is shorted whenever -5V approaches0V. Regulator/input-path faults are not excluded. No verify flag is present.

Log source locator: SA2121 PSU sheet; repair notes.

Actual NEW record (with parent source/layout context):
```json
{"step":4,"check":"+12 V (LM7812) and -5 V (LM7905)","where":"PSU board to CPU board (PL10 / PL6) pin 1 and pin 3, each to pin 4","expect":"+12 V on pin 1; -5 V on pin 3","ifNot":"The regulator, or its raw +18 V / -18 V from D3, D4, D7, D8. -5 V pulled towards 0 V: a load on it is shorted (the LM7905 gives only 50 mA).","source":{"label":"Dragon 32 PSU diagram SA2121 (REG2 LM7812 250 mA, REG3 LM7905 50 mA)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21204-PSU-MOD.gif"}}
```

### 30:168 — dragon.js dragon32 rail +5 V (log line 867)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SA2121 and SA2120 specify nominal+5/+12/-5V, not deleted tolerance bands. +5V1400mA is printed.

Log source locator: SA2120 sheets 1–3; SA2121 PSU.

Actual NEW record (with parent source/layout context):
```json
{"rail":"+5 V","expect":"+5 V","where":"6809E pin 7; SAM pin 40; 4116 pin 9","note":"LM309, 1.4 A maximum. The sheet gives the nominal only."}
```

### 30:169 — dragon.js dragon32 rail +12 V (log line 868)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SA2121 and SA2120 specify nominal+5/+12/-5V, not deleted tolerance bands. +5V1400mA is printed.

Log source locator: SA2120 sheets 1–3; SA2121 PSU.

Actual NEW record (with parent source/layout context):
```json
{"rail":"+12 V","expect":"+12 V","where":"4116 pin 8; dragon-cart pin 1 (cartridge)","note":"LM7812, 250 mA. RAM VDD, the relay and the cartridge."}
```

### 30:170 — dragon.js dragon32 rail -5 V (log line 869)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SA2121 and SA2120 specify nominal+5/+12/-5V, not deleted tolerance bands. +5V1400mA is printed.

Log source locator: SA2120 sheets 1–3; SA2121 PSU.

Actual NEW record (with parent source/layout context):
```json
{"rail":"-5 V","expect":"-5 V","where":"4116 pin 1","note":"LM7905, 50 mA. RAM VBB and the video output stage."}
```

### 30:180 — dragon.js dragon-cassette pin 4 (log line 870)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Shared cassette record cites corrected270-470kΩ recommendation from Service Information PDF1 and explicitly qualifies it as Dragon32 guidance.

Log source locator: CD41505 sheet 1; Machine Code Users p.2.

Actual NEW record (with parent source/layout context):
```json
{"n":4,"name":"CASS IN","type":"audio","desc":"From the recorder EAR socket, to the LM393 comparator and PA0 of the $FF20 PIA. To limit the signal, the Dragon Data service sheet recommends fitting 270–470 kΩ in series (cut the track to pin 4 and bridge it).","expect":"Tape audio; the Dragon 32 service sheet asks for at least +1 V and -0.5 V peaks","geo":"din5-180","sources":[{"label":"Dragon 64 CD41505 sheet 1 (PL4 cassette, relay, TR1)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D641-io-pal.gif"},{"label":"Dragon 32 Information for Machine Code Users, Cassette connections, p. 2","url":"https://dragondata.worldofdragon.org/Publications/Info_for_mc_users/Info_For_Machine_Code_Users_original.pdf#page=2"},{"label":"Dragon Data Service Information RWEW/KA/0080a (Dragon 32), Cassette faults: +1 V / -0.5 V input, 270-470K series resistor","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=1"}],"kind":"5-pin DIN socket (180°)"}
```

### 30:181 — dragon.js dragon-cassette pin 5 (log line 871)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41505 sheet1 shows68k series resistor and R40 33k to0V; R14 elsewhere is4k7 pull-up. Ambiguous68k designator is honestly retained as conflict.

Log source locator: CD41505 sheet 1, PL4 cassette output.

Actual NEW record (with parent source/layout context):
```json
{"n":5,"name":"CASS OUT","type":"audio","desc":"To the recorder AUX/MIC input. Taken from the 6-bit DAC through a 68 kΩ series resistor, with R40 (33 kΩ) to 0 V.","conflict":"CD41505 sheet 1: the 68 kΩ part has been read as R14, but R14 on the same sheet is the 4K7 pull-up by IC4, and the label by PL4 is illegible on this scan. R40 33 kΩ is clear.","geo":"din5-180","sources":[{"label":"Dragon 64 CD41505 sheet 1 (PL4 cassette, relay, TR1)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D641-io-pal.gif"},{"label":"Dragon 32 Information for Machine Code Users, Cassette connections, p. 2","url":"https://dragondata.worldofdragon.org/Publications/Info_for_mc_users/Info_For_Machine_Code_Users_original.pdf#page=2"},{"label":"Dragon Data Service Information RWEW/KA/0080a (Dragon 32), Cassette faults: +1 V / -0.5 V input, 270-470K series resistor","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=1"}],"kind":"5-pin DIN socket (180°)"}
```

### 30:198 — dragon.js dragon32 clock-row Master crystal XL2 (PAL only: there is n… (log line 872)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SA2120 sheet1 marks XL2 14.32MHz; CD41505 sheet2 marks XL3 14.218MHz. New row distinguishes drawings, removes unsupported NTSC nonexistence and keeps verify.

Log source locator: Cited CD41505 sheet 2 (Dragon 64).

Actual NEW record (with parent source/layout context):
```json
{"name":"Master crystal XL2","where":"SAM pin 5 and pin 6","f":"14.32 MHz (as the SA2120 sheet marks it; the Dragon 64 sheet has 14.218 MHz)","verify":true,"source":{"label":"Dragon 32 circuit diagram SA2120 sheet 1 (XL2 14.32 MHz)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21201-CPU.gif"}}
```

### 30:200 — dragon.js dragon64 first-ten step 5 (log line 873)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

CD41505 sheet2 proves nominal+5V CPU/SAM/4164, but not fault-is-break-or-chip diagnosis. Tolerance/hot-chip instructions were removed; diagnosis remains unflagged.

Log source locator: CD41505 sheet 2.

Actual NEW record (with parent source/layout context):
```json
{"step":5,"check":"+5 V at the CPU, SAM and RAM","where":"6809E pin 7; SAM pin 40; 4164 pin 8","expect":"+5 V","ifNot":"A break between PL6 and the chip, or a chip pulling the rail down. The 4164s run on +5 V only.","source":{"label":"Dragon 64 CPU 64K (PAL) CD41505 sheet 2 (CPU, SAM, 4164 supply)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D642-cpu-pal.gif"}}
```

### 30:213 — dragon.js dragon64-power pin 4 (log line 874)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519 centre tap reachesPL10 pin4 0V; no mains-earth bond is established. Earth claim is removed.

Log source locator: CD41519 PSU sheet; PSU Pictures.

Actual NEW record (with parent source/layout context):
```json
{"n":4,"name":"0 V (CT)","type":"ground","desc":"Centre tap of winding B. 0 V of the whole computer.","expect":"0 V","geo":"de9","sources":[{"label":"Dragon 64 power supply CD41519 (PL9, mains transformer, SW1)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D644-psu-pal-cleaned.gif"},{"label":"The Dragon Archive wiki, PSU Pictures: transformer labels (Ref. 28475: Sec. I 8.5 V 1.5 A, Sec. II 14/28 V 0.25 A; CT type: A 8 V 1.5 A, B 28 V 250 mA) and the 9-way D plug","url":"https://archive.worldofdragon.org/index.php?title=PSU_Pictures"},{"label":"Dragon 32 BASIC manual, rear-panel key (power pack socket, mains power unit)","url":"https://dragondata.worldofdragon.org/Publications/BASIC-MAN/DRAGON_32_BASIC_MANUAL_rel-v2.pdf#page=6"}],"kind":"9-way D socket"}
```

### 30:219 — dragon.js dragon64-psu pin 1 (log line 875)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519 PL10 marks+12V1,+5V2 (LM309),-12V3; removed tolerance bands and inherited Dragon32 current limit are unspecified.

Log source locator: CD41519 PSU; CD41505 sheet 3.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"+12 V","type":"power","desc":"+12 V from REG2 (LM7812). RS-232 drivers, cartridge pins 1 and 2.","expect":"+12 V","geo":"custom","sources":[{"label":"Dragon 64 power supply CD41519 (PL10 to CPU card)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D644-psu-pal-cleaned.gif"},{"label":"Dragon 64 CD41505 sheet 3 (PL6, 79L05)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D643-vid-sound-rs232.gif"}],"kind":"9-way board-to-board connector","pads":[{"n":1,"x":8,"y":50},{"n":2,"x":19,"y":50},{"n":3,"x":29,"y":50},{"n":4,"x":40,"y":50},{"n":5,"x":50,"y":50},{"n":6,"x":61,"y":50},{"n":7,"x":71,"y":50},{"n":8,"x":82,"y":50},{"n":9,"x":92,"y":50}]}
```

### 30:220 — dragon.js dragon64-psu pin 2 (log line 876)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519 PL10 marks+12V1,+5V2 (LM309),-12V3; removed tolerance bands and inherited Dragon32 current limit are unspecified.

Log source locator: CD41519 PSU; CD41505 sheet 3.

Actual NEW record (with parent source/layout context):
```json
{"n":2,"name":"+5 V","type":"power","desc":"+5 V from REG1 (LM309). All logic.","expect":"+5 V","geo":"custom","sources":[{"label":"Dragon 64 power supply CD41519 (PL10 to CPU card)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D644-psu-pal-cleaned.gif"},{"label":"Dragon 64 CD41505 sheet 3 (PL6, 79L05)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D643-vid-sound-rs232.gif"}],"kind":"9-way board-to-board connector","pads":[{"n":1,"x":8,"y":50},{"n":2,"x":19,"y":50},{"n":3,"x":29,"y":50},{"n":4,"x":40,"y":50},{"n":5,"x":50,"y":50},{"n":6,"x":61,"y":50},{"n":7,"x":71,"y":50},{"n":8,"x":82,"y":50},{"n":9,"x":92,"y":50}]}
```

### 30:221 — dragon.js dragon64-psu pin 3 (log line 877)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519 PL10 marks+12V1,+5V2 (LM309),-12V3; removed tolerance bands and inherited Dragon32 current limit are unspecified.

Log source locator: CD41519 PSU; CD41505 sheet 3.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"-12 V","type":"power","desc":"-12 V from REG3 (LM7912). RS-232 drivers; a 79L05 on the CPU board makes -5 V from it.","expect":"-12 V","geo":"custom","sources":[{"label":"Dragon 64 power supply CD41519 (PL10 to CPU card)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D644-psu-pal-cleaned.gif"},{"label":"Dragon 64 CD41505 sheet 3 (PL6, 79L05)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D643-vid-sound-rs232.gif"}],"kind":"9-way board-to-board connector","pads":[{"n":1,"x":8,"y":50},{"n":2,"x":19,"y":50},{"n":3,"x":29,"y":50},{"n":4,"x":40,"y":50},{"n":5,"x":50,"y":50},{"n":6,"x":61,"y":50},{"n":7,"x":71,"y":50},{"n":8,"x":82,"y":50},{"n":9,"x":92,"y":50}]}
```

### 30:226 — dragon.js dragon64-psu pin 9 (log line 878)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519 PL10 pin9 is modulator-video path. Dragon32-only1k-load suggestion is removed from Dragon64.

Log source locator: CD41519 PSU; CD41505 sheet 3.

Actual NEW record (with parent source/layout context):
```json
{"n":9,"name":"COMPOSITE","type":"video","desc":"Video to the UHF modulator.","geo":"custom","sources":[{"label":"Dragon 64 power supply CD41519 (PL10 to CPU card)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D644-psu-pal-cleaned.gif"},{"label":"Dragon 64 CD41505 sheet 3 (PL6, 79L05)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D643-vid-sound-rs232.gif"}],"kind":"9-way board-to-board connector","pads":[{"n":1,"x":8,"y":50},{"n":2,"x":19,"y":50},{"n":3,"x":29,"y":50},{"n":4,"x":40,"y":50},{"n":5,"x":50,"y":50},{"n":6,"x":61,"y":50},{"n":7,"x":71,"y":50},{"n":8,"x":82,"y":50},{"n":9,"x":92,"y":50}]}
```

### 30:227 — dragon.js dragon64 first-ten step 3 (log line 879)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519 shows four1N5401 bridge diodes,C6/C9 both4700µF and REG1 LM309. Nominal+5V supported; service-sequence claim removed.

Log source locator: CD41519 PSU sheet.

Actual NEW record (with parent source/layout context):
```json
{"step":3,"check":"+5 V from the LM309 (REG1), switched on","where":"PSU board to CPU board (PL10 / PL6) pin 2 to pin 4","expect":"+5 V DC","ifNot":"PL10 seated, the 1N5401 bridge, C6 and C9 (4700 µF), then the LM309.","source":{"label":"Dragon 64 power supply CD41519 (REG1 LM309, bridge, PL10)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D644-psu-pal-cleaned.gif"}}
```

### 30:228 — dragon.js dragon64 first-ten step 4 (log line 880)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519 shows C8 positive/C5 negative raw rails and1N4002s. CD41505 sheet3 confirms serial-driver and79L05 -12V feed.

Log source locator: CD41519 PSU sheet.

Actual NEW record (with parent source/layout context):
```json
{"step":4,"check":"+12 V (LM7812) and -12 V (LM7912)","where":"PSU board to CPU board (PL10 / PL6) pin 1 and pin 3, each to pin 4","expect":"+12 V on pin 1; -12 V on pin 3","ifNot":"The regulator, or its raw supply from the 1N4002s (C8 on the positive side, C5 on the negative). -12 V feeds the RS-232 drivers and, on the CPU board, the 79L05 that makes -5 V.","source":{"label":"Dragon 64 power supply CD41519 (LM7812, LM7912, PL10 pin 3 -12 V)","url":"https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D644-psu-pal-cleaned.gif"}}
```

### 30:229 — dragon.js dragon64 rail +5 V (log line 881)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519/CD41505 sheet3 label nominal+5/+12/-12V without deleted tolerance bands.

Log source locator: CD41519 PSU; CD41505 sheets 1–3; Inside the Dragon appendix.

Actual NEW record (with parent source/layout context):
```json
{"rail":"+5 V","expect":"+5 V","where":"6809E pin 7; SAM pin 40; 4164 pin 8; 6551 pin 15","note":"LM309 on the PSU board."}
```

### 30:230 — dragon.js dragon64 rail +12 V (log line 882)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519/CD41505 sheet3 label nominal+5/+12/-12V without deleted tolerance bands.

Log source locator: CD41519 PSU; CD41505 sheets 1–3; Inside the Dragon appendix.

Actual NEW record (with parent source/layout context):
```json
{"rail":"+12 V","expect":"+12 V","where":"dragon-cart pin 1 (cartridge); dragon-serial pin 3 (PL8, through 4.7 kΩ)","note":"LM7812. RS-232 drivers, relay, cartridge."}
```

### 30:231 — dragon.js dragon64 rail -12 V (log line 883)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41519/CD41505 sheet3 label nominal+5/+12/-12V without deleted tolerance bands.

Log source locator: CD41519 PSU; CD41505 sheets 1–3; Inside the Dragon appendix.

Actual NEW record (with parent source/layout context):
```json
{"rail":"-12 V","expect":"-12 V","where":"dragon64-psu pin 3 (PL6); dragon-serial pin 7 (PL8, through 4.7 kΩ)","note":"LM7912. RS-232 drivers and the 79L05."}
```

### 30:232 — dragon.js dragon64 rail -5 V (log line 884)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CD41505 sheet3 shows79L05-derived -5V. Nominal value supported; verify is conservative and honest.

Log source locator: CD41519 PSU; CD41505 sheets 1–3; Inside the Dragon appendix.

Actual NEW record (with parent source/layout context):
```json
{"rail":"-5 V","expect":"-5 V","where":"79L05 output on the CPU board","note":"Video output stage.","verify":true}
```

### 31:0 — dragon.js dragon32 first-ten step 6 (log line 885)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Service Information PDF3 calls for reset-switch check. SA2120 sheet1 shows CPU37,C23 1µF,R15 100k. Added verify honestly qualifies fuller diagnostic wording.

Log source locator: D0 PDF2-3.

Actual NEW record (with parent source/layout context):
```json
{"step":6,"check":"Reset","where":"6809E pin 37","expect":"LOW while RESET is held, HIGH within a moment of release","ifNot":"The RESET button, C23 (1 µF) or R15 (100 kΩ). Service sheet step 3, \"check RESET button operation\".","source":{"label":"Dragon Data Service Information RWEW/RA/0082a, A. No picture or sound: transformer, PSU board (PL10, voltages, diodes), RESET, IC15","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=3"},"verify":true}
```

### 31:1 — dragon.js dragon32 first-ten step 7 (log line 886)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

verify is honest: Service Information PDF3 gives no14.218MHz value; SA2120 instead marks14.32MHz. Data admits but does not resolve the discrepancy.

Log source locator: D0 PDF2-3.

Actual NEW record (with parent source/layout context):
```json
{"step":7,"check":"Master crystal at the SAM","where":"SAM pin 5 and pin 6","expect":"14.218 MHz (XL2; the SA2120 sheet marks 14.32 MHz)","ifNot":"The crystal and its trimmer, then IC15 (SAM): service sheet steps 4 and 5, reseat IC15, then replace it.","source":{"label":"Dragon Data Service Information RWEW/RA/0082a, A. No picture or sound: transformer, PSU board (PL10, voltages, diodes), RESET, IC15","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=3"},"verify":true}
```

### 31:2 — dragon.js dragon32 first-ten step 8 (log line 887)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

verify exists. Service Information PDF2 gives IC15/17/18/19/RAM order, but not E/Q probe frequency/phase or missing-clock diagnosis. Needs actual SAM/circuit citation.

Log source locator: D0 PDF2-3.

Actual NEW record (with parent source/layout context):
```json
{"step":8,"check":"E and Q at the CPU","where":"6809E pin 34; 6809E pin 35","expect":"About 0.89 MHz square waves, Q a quarter cycle ahead of E","ifNot":"No E or Q with the crystal running: IC15 (SAM). Clocks good but no boot: the service sheet order IC15, IC17, IC18 (ROMs), IC19 (CPU), then the RAM lines.","source":{"label":"Dragon Data Service Information RWEW/KA/0081a, Faults during program operation (IC15, IC17, IC18, IC19, RAM lines)","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=2"},"verify":true}
```

### 31:3 — dragon.js dragon64 first-ten step 6 (log line 888)

**WRONG**. Change needed: Yes. Actual scoped record changed: True.

Dragon64 advice retains Dragon32 C23 1µF/R15 100k. CD41505 sheet2 reset network instead shows C55 33µF,R17 100k,D9/D19/D20. verify does not correct wrong board references.

Log source locator: D0 PDF2-3.

Actual NEW record (with parent source/layout context):
```json
{"step":6,"check":"Reset","where":"6809E pin 37","expect":"LOW while RESET is held, HIGH within a moment of release","ifNot":"The RESET button, C23 (1 µF) or R15 (100 kΩ). Service sheet step 3, \"check RESET button operation\".","source":{"label":"Dragon Data Service Information RWEW/RA/0082a, A. No picture or sound: transformer, PSU board (PL10, voltages, diodes), RESET, IC15","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=3"},"verify":true}
```

### 31:4 — dragon.js dragon64 first-ten step 8 (log line 889)

**WRONG**. Change needed: Yes. Actual scoped record changed: True.

Claimed Dragon32 service order lists CPU before ROMs. Service Information PDF2 orders IC15,17,18,19,RAM: SAM,ROMs,CPU,RAM. New flag leaves contradiction.

Log source locator: D0 PDF2-3.

Actual NEW record (with parent source/layout context):
```json
{"step":8,"check":"E and Q at the CPU","where":"6809E pin 34; 6809E pin 35","expect":"About 0.89 MHz square waves, Q a quarter cycle ahead of E","ifNot":"No E or Q with the crystal running: the SAM (IC39). Clocks good but no boot: CPU IC38, then ROMs IC34 and IC37, then the 4164 bank (the Dragon 32 service order).","source":{"label":"Dragon Data Service Information RWEW/KA/0081a, Faults during program operation (IC15, IC17, IC18, IC19, RAM lines)","url":"https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=2"},"verify":true}
```

### 31:49 — msx.js msx1 first-ten step 3 (log line 890)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

verify exists. TI VDP PDF52 proves TMS9918A VCC33 nominal+5V, not Z80 pin11/AY pin40 or board fault diagnosis. Tolerance/hot-chip deletions honest.

Log source locator: D1/D2 PDF52 and operating conditions.

Actual NEW record (with parent source/layout context):
```json
{"step":3,"check":"+5 V at the main chips","where":"Z80A pin 11; TMS9918A pin 33; AY-3-8910 pin 40","expect":"+5 V","ifNot":"A break between the supply and the chip, or a chip pulling the rail down.","source":{"label":"TMS9918A/9928A/9929A Video Display Processors Data Manual (TI, 1982), 3.7 terminal assignments","url":"https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf#page=52"},"verify":true}
```

### 32:1 — amstrad.js ga40010 (log line 891)

**WRONG**. Change needed: Yes. Actual scoped record changed: True.

AMSGateArray README Current status strikes through both vsync/CAS glitch and irqack-loop paragraphs. Data repeats them as current limitations. Part and kind:modern also remain despite log dashes; only note changed.

Log source locator: S0 README: Current status; Testing; The boards.

Actual NEW record (with parent source/layout context):
```json
{"replacements":[{"part":"AMSGateArray, 40010 version","kind":"modern","note":"Open prototype CPLD board for the 40010 socket. It passed basic tests on a real CPC 6128 only; the author lists possible timing glitches from asynchronous logic (vsync, CAS) and a combinatorial loop. Archived in 2024, so no further fixes. The project has a separate 40007 board: the 40007 has the earlier pinout.","source":{"label":"AMSGateArray: Xilinx CPLD replacements for the 40010 and 40007 (GitHub, archived 2024)","url":"https://github.com/codedchip/AMSGateArray"}}]}
```

### 34:158 — ibm.js portable5155 first-ten step 6 (log line 892)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

verify exists. Search fallback of5160 startup establishes normal PG/reset and measured~300ms, not fault-is-chip-or-load. Independent5155 startup page remains inaccessible.

Log source locator: 5155 startup URL: blocked HTTP 406; web fallback cache miss.

Actual NEW record (with parent source/layout context):
```json
{"step":6,"check":"Power Good in, reset out","where":"8284A pin 11; 8088 pin 21","expect":"Pin 11 goes HIGH with Power Good; pin 21 is HIGH for about 300 ms, then LOW","ifNot":"Pin 11 LOW: Power Good is not reaching the board. Pin 11 HIGH but pin 21 stuck: the 8284A, or a load holding the reset line.","source":{"label":"minuszerodegrees.net, IBM 5160 startup sequence, steps 3 to 7 (the 5155 has an early 5160 board; its own startup page points there)","url":"https://minuszerodegrees.net/5160/motherboard/IBM%205160%20-%20Startup%20sequence.htm"},"verify":true}
```

### 34:159 — ibm.js portable5155 first-ten step 1 (log line 893)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

MZD5155 PSU opened via web afterHTTP406: board usually suffices, includingP8 disconnected, but one exception reported. Data says normally and adds verify: honest qualification.

Log source locator: minuszerodegrees 5155 PSU: Start-Up Loading.

Actual NEW record (with parent source/layout context):
```json
{"step":1,"check":"Selector and load","where":"115/230 V selector; P8 and P9 on the system board","expect":"Selector matches the mains. Fan starts and keeps running with the board connected","ifNot":"It needs a load on +5 V: one IDE drive, some MFM drives or the CRT alone are not enough; a working 5155 board normally is, even with P8 unplugged.","verify":true,"source":{"label":"minuszerodegrees.net, IBM 5155 power supply (start-up loading)","url":"https://minuszerodegrees.net/5155/psu/5155_psu.htm"}}
```

### 34:160 — ibm.js xt5160 first-ten step 5 (log line 894)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

Added load-held-reset alternative is circuit inference, not proven by cited5160 startup sequence (read through search fallback). Step has no verify flag.

Log source locator: minuszerodegrees 5160 Startup Sequence, steps 3-7 and note 1; linked ….

Actual NEW record (with parent source/layout context):
```json
{"step":5,"check":"Power Good in, reset out","where":"8284A pin 11; 8088 pin 21","expect":"Pin 11 goes HIGH with Power Good; pin 21 is HIGH for about 300 ms, then LOW","ifNot":"Pin 11 LOW: Power Good is not reaching the board. Pin 11 HIGH but pin 21 stuck: the 8284A, or a load holding the reset line.","source":{"label":"minuszerodegrees.net, IBM 5160 startup sequence, steps 3 to 7 and note 1","url":"https://minuszerodegrees.net/5160/motherboard/IBM%205160%20-%20Startup%20sequence.htm"}}
```

### 34:161 — ibm.js xt5160 first-ten step 8 (log line 895)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

MZD64-256KB RAM page opened via web confines silent first16KB failure to11/08/82 BIOS. Revised text respects BIOS/board scope and excludes proof for later board.

Log source locator: minuszerodegrees 5160 RAM 64-256KB: Failure of first 16 KB.

Actual NEW record (with parent source/layout context):
```json
{"step":8,"check":"Bank 0 RAM","where":"RAM bank 0 (socketed 4164, or 41256 on the 256-640 KB board)","expect":"POST gets past the memory test and beeps","verify":true,"ifNot":"Clocks and reset good but dead and silent: with the 11/08/82 BIOS, a bad chip in the first 16 KB of a 64-256 KB board halts POST with no beep (the 256-640 KB board is not covered by this source). Swap bank 0.","source":{"label":"minuszerodegrees.net, IBM 5160 RAM on a 64-256 KB motherboard","url":"https://minuszerodegrees.net/5160/ram/5160_ram_64_256.htm"}}
```

### 34:162 — ibm.js pc5150 first-ten step 2 (log line 896)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

HMS MAP0020 PDF4 step005 proves PG DC test only, not retained timing/restart/overload claims. Added verify is present and honest.

Log source locator: IBM HMS MAP 0020 PDF 4 / 0020-2 step 005.

Actual NEW record (with parent source/layout context):
```json
{"step":2,"check":"Power Good","where":"pc-psu pin P8-1 to pin P8-5 (at the system board connector)","expect":"+2.4 to +5.2 V DC once running; LOW for at least the first 100 ms","ifNot":"Missing: check the rails next. Off for less than 5 s, the supply may not send Power Good again; switch off and wait.","source":{"label":"IBM Hardware Maintenance Service 6280087 (1986), MAP 0020 Power (PC) step 005, p. 0020-2","url":"https://minuszerodegrees.net/hms/HMS%20-%206280087%20-%20Maps%20-%200020.pdf#page=4"},"verify":true}
```

### 34:163 — ibm.js pc5150 first-ten step 3 (log line 897)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

HMS PDF5-6 steps007-008 replaces PSU after loaded-system voltage tests; it does not direct doing so with only board connected. Shorted-board caveat does not establish minimum loading or complete isolation.

Log source locator: IBM HMS MAP 0020 PDF 5 / 0020-3 step 007, Fig.2.

Actual NEW record (with parent source/layout context):
```json
{"step":3,"check":"Rails at the board connector","where":"pc-psu pins P9-4, P9-5, P9-6 (+5 V); pc-psu pin P8-3 (+12 V); pc-psu pin P9-3 (-5 V); pc-psu pin P8-4 (-12 V); each to ground","expect":"+4.8 to +5.2 V; +11.5 to +12.6 V; -4.5 to -5.4 V; -10.8 to -12.9 V","ifNot":"Out of range with only the board connected: HMS step 008 replaces the supply (a shorted board can also pull a rail down).","source":{"label":"IBM Hardware Maintenance Service 6280087 (1986), MAP 0020 Power (PC) step 007, system board voltages, p. 0020-3","url":"https://minuszerodegrees.net/hms/HMS%20-%206280087%20-%20Maps%20-%200020.pdf#page=5"}}
```

### 34:164 — ibm.js xt5160 first-ten step 2 (log line 898)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

HMS MAP0020 PDF4 step005 proves PG DC test only, not retained timing/restart/overload claims. Added verify is present and honest.

Log source locator: IBM HMS MAP 0020 PDF 4 / 0020-2 step 005.

Actual NEW record (with parent source/layout context):
```json
{"step":2,"check":"Power Good","where":"xt-psu pin P8-1 to pin P8-5 (at the system board connector)","expect":"+2.4 to +5.2 V DC once running; LOW for the first 100 to 500 ms","ifNot":"Missing: check the rails next. Leave it off at least 1 s before switching on again.","source":{"label":"IBM Hardware Maintenance Service 6280087 (1986), MAP 0020 Power (PC) step 005, p. 0020-2","url":"https://minuszerodegrees.net/hms/HMS%20-%206280087%20-%20Maps%20-%200020.pdf#page=4"},"verify":true}
```

### 34:165 — ibm.js xt5160 first-ten step 3 (log line 899)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

HMS PDF5-6 steps007-008 replaces PSU after loaded-system voltage tests; it does not direct doing so with only board connected. Shorted-board caveat does not establish minimum loading or complete isolation.

Log source locator: IBM HMS MAP 0020 PDF 5 / 0020-3 step 007, Fig.2.

Actual NEW record (with parent source/layout context):
```json
{"step":3,"check":"Rails at the board connector","where":"xt-psu pins P9-4, P9-5, P9-6 (+5 V); xt-psu pin P8-3 (+12 V); xt-psu pin P9-3 (-5 V); xt-psu pin P8-4 (-12 V); each to ground","expect":"+4.8 to +5.2 V; +11.5 to +12.6 V; -4.5 to -5.4 V; -10.8 to -12.9 V","ifNot":"Out of range with only the board connected: HMS step 008 replaces the supply (a shorted board can also pull a rail down).","source":{"label":"IBM Hardware Maintenance Service 6280087 (1986), MAP 0020 Power (PC) step 007, system board voltages, p. 0020-3","url":"https://minuszerodegrees.net/hms/HMS%20-%206280087%20-%20Maps%20-%200020.pdf#page=5"}}
```

### 34:166 — ibm.js portable5155 first-ten step 2 (log line 900)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

HMS MAP0020 PDF4 step005 proves PG DC test only, not retained timing/restart/overload claims. Added verify is present and honest.

Log source locator: IBM HMS MAP 0020 PDF 4 / 0020-2 step 005.

Actual NEW record (with parent source/layout context):
```json
{"step":2,"check":"Power Good","where":"p-psu pin P8-1 to pin P8-5 (at the system board connector)","expect":"+2.4 to +5.2 V DC once running","ifNot":"Missing: check the rails. After an overload it stays off until the fault is cleared and it is switched off and on.","source":{"label":"IBM Hardware Maintenance Service 6280087 (1986), MAP 0020 Power (PC) step 005, p. 0020-2","url":"https://minuszerodegrees.net/hms/HMS%20-%206280087%20-%20Maps%20-%200020.pdf#page=4"},"verify":true}
```

### 34:168 — ibm.js pcjr first-ten step 1 (log line 901)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

PCjr HMS PDF62 printed3-020-8 directs transformer replacement after unplugged15-30VAC test, without non-resetting thermal-fuse claim. Deletion honest.

Log source locator: PCjr HMS PDF 62 / 3-020-8.

Actual NEW record (with parent source/layout context):
```json
{"step":1,"check":"Transformer output","where":"jr-power pin 1 to pin 3, with the cable unplugged from the unit","expect":"15.0 to 30.0 V AC (an AC range, not DC)","ifNot":"Replace the transformer.","source":{"label":"IBM PCjr Hardware Maintenance and Service (Sep 1983), PIC Power, p. 3-020-8","url":"https://minuszerodegrees.net/manuals/IBM/IBM%204860%20(PCjr)%20-%20Hardware%20Maintenance%20and%20Service%20-%20SEP83.pdf#page=62"}}
```

### 34:169 — ibm.js pcjr first-ten step 3 (log line 902)

**WRONG**. Change needed: Yes. Actual scoped record changed: True.

PCjr HMS PDF56-64 repeats POST after64KB expansion removal and internal disconnections, then tests transformer and power-board outputs before system-board replacement. New then-system-board shortcut omits those decision gates.

Log source locator: PCjr HMS PDF 55-61 / 3-020-1..7.

Actual NEW record (with parent source/layout context):
```json
{"step":3,"check":"Strip to the base unit (HMS PIC Power)","where":"Every outside device unplugged except the power cable and the service plug; advanced POST","expect":"One beep within a minute of switch-on","ifNot":"Beeps now: refit the devices one at a time, advanced POST after each. Still silent: remove the 64KB memory and display expansion; then disconnect the diskette adapter, drive power and fan cables and the internal modem; then the system board.","source":{"label":"IBM PCjr Hardware Maintenance and Service (Sep 1983), PIC Power, pp. 3-020-2 to 3-020-7","url":"https://minuszerodegrees.net/manuals/IBM/IBM%204860%20(PCjr)%20-%20Hardware%20Maintenance%20and%20Service%20-%20SEP83.pdf#page=56"}}
```

### 35:82 — oric.js oric1 clock-row Master crystal XT1 (PAL machine; the ULA also… (log line 903)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Oric repair checklist p3 proves12MHz IC21-to-ULA7, not crystal designator/exclusive PAL applicability. Generic name supported.

Log source locator: S15 p.3.

Actual NEW record (with parent source/layout context):
```json
{"name":"Master clock (crystal oscillator)","where":"ULA pin 7 (fed from IC21)","f":"12 MHz","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 3: Verify clocks and 4: system bus (SYNC), p. 3","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=3"}}
```

### 35:85 — oric.js oric1 clock-row Colour crystal XT2 (TV colour circuit) (log line 904)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Checklist p3 steps6-7 names8.86MHz atIC25, not XT2. Current record drops designator and names IC25, matching source.

Log source locator: S15 p.3, clock steps6-7.

Actual NEW record (with parent source/layout context):
```json
{"name":"Colour crystal (TV colour circuit)","where":"IC25","f":"8.86 MHz","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 3: Verify clocks and 4: system bus (SYNC), p. 3","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=3"}}
```

### 35:86 — oric.js atmos clock-row Master crystal XT1 (PAL machine; the ULA also… (log line 905)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Oric repair checklist p3 proves12MHz IC21-to-ULA7, not crystal designator/exclusive PAL applicability. Generic name supported.

Log source locator: S15 p.3.

Actual NEW record (with parent source/layout context):
```json
{"name":"Master clock (crystal oscillator)","where":"ULA pin 7 (fed from IC21)","f":"12 MHz","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 3: Verify clocks and 4: system bus (SYNC), p. 3","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=3"}}
```

### 35:89 — oric.js atmos clock-row Colour crystal XT2 (TV colour circuit) (log line 906)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Checklist p3 steps6-7 names8.86MHz atIC25, not XT2. Current record drops designator and names IC25, matching source.

Log source locator: S15 p.3, steps6-7.

Actual NEW record (with parent source/layout context):
```json
{"name":"Colour crystal (TV colour circuit)","where":"IC25","f":"8.86 MHz","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 3: Verify clocks and 4: system bus (SYNC), p. 3","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=3"}}
```

### 35:90 — oric.js oric1 first-ten step 1 (log line 907)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Checklist p1 specifies9V centre-positive and7905 OUT=0V,COM=+5V. Current wording matches; removed unloaded/12V categorical assertions were unsupported there.

Log source locator: S15 p.1, power steps1-4.

Actual NEW record (with parent source/layout context):
```json
{"step":1,"check":"Adapter polarity and voltage, before it goes near the board (the 7905 trap)","where":"9 V DC power socket pin 1 to pin 2","expect":"Centre positive, about 9 V DC to the sleeve","ifNot":"Do not plug it in. The 7905 sits in the negative leg: board 0 V is its OUT leg and +5 V its COM leg, so the jack sleeve is not board 0 V.","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 2: Verify power supply (225 ohm rail, 9 V centre positive, 4.95-5.05 V, 7905), p. 1","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=1"}}
```

### 35:91 — oric.js oric1 first-ten step 2 (log line 908)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Checklist pp1-2 gives approximate225Ω against good board, under50Ω skip power, >100mA DRAM suspect, >80mA out-of-circuit rejection. Revised qualifications match.

Log source locator: S15 pp.1-2.

Actual NEW record (with parent source/layout context):
```json
{"step":2,"check":"Rail resistance, unpowered, ULA and ROM out of their sockets","where":"6502 pin 8 to pin 21","expect":"About 225 Ω from +5 V to 0 V (as a known-good board); under 50 Ω, do not power up","ifNot":"Do not power it. Check C8 by the jack, then cut the 0 V feeds to the DRAMs, CPU, VIA and AY in turn as the checklist shows (a 4164 drawing over 100 mA at pin 16 is suspect; confirm out of circuit, over 80 mA is bad).","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 2: Verify power supply (225 ohm rail, 9 V centre positive, 4.95-5.05 V, 7905), p. 1","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=1"}}
```

### 35:94 — oric.js oric1 first-ten step 5 (log line 909)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Checklist p3 establishes1MHz, not asymmetry. New expectation matches; asymmetry is separately guide-sourced.

Log source locator: S15 p.3.

Actual NEW record (with parent source/layout context):
```json
{"step":5,"check":"1 MHz CPU clock from the ULA","where":"ULA pin 14 to 6502 pin 37","expect":"1 MHz","ifNot":"With 12 MHz present: the ULA, or the 6502 loading the line. Cut the track and see which side loses the clock.","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 3: Verify clocks and 4: system bus (SYNC), p. 3","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=3"}}
```

### 35:97 — oric.js atmos first-ten step 1 (log line 910)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Checklist p1 specifies9V centre-positive and7905 OUT=0V,COM=+5V. Current wording matches; removed unloaded/12V categorical assertions were unsupported there.

Log source locator: S15 p.1.

Actual NEW record (with parent source/layout context):
```json
{"step":1,"check":"Adapter polarity and voltage, before it goes near the board (the 7905 trap)","where":"9 V DC power socket pin 1 to pin 2","expect":"Centre positive, about 9 V DC to the sleeve","ifNot":"Do not plug it in. The 7905 sits in the negative leg: board 0 V is its OUT leg and +5 V its COM leg, so the jack sleeve is not board 0 V.","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 2: Verify power supply (225 ohm rail, 9 V centre positive, 4.95-5.05 V, 7905), p. 1","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=1"}}
```

### 35:98 — oric.js atmos first-ten step 2 (log line 911)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Checklist pp1-2 gives approximate225Ω against good board, under50Ω skip power, >100mA DRAM suspect, >80mA out-of-circuit rejection. Revised qualifications match.

Log source locator: S15 pp.1-2.

Actual NEW record (with parent source/layout context):
```json
{"step":2,"check":"Rail resistance, unpowered, ULA and ROM out of their sockets","where":"6502 pin 8 to pin 21","expect":"About 225 Ω from +5 V to 0 V (as a known-good board); under 50 Ω, do not power up","ifNot":"Do not power it. Check C8 by the jack, then cut the 0 V feeds to the DRAMs, CPU, VIA and AY in turn as the checklist shows (a 4164 drawing over 100 mA at pin 16 is suspect; confirm out of circuit, over 80 mA is bad).","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 2: Verify power supply (225 ohm rail, 9 V centre positive, 4.95-5.05 V, 7905), p. 1","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=1"}}
```

### 35:101 — oric.js atmos first-ten step 5 (log line 912)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Checklist p3 establishes1MHz, not asymmetry. New expectation matches; asymmetry is separately guide-sourced.

Log source locator: S15 p.3.

Actual NEW record (with parent source/layout context):
```json
{"step":5,"check":"1 MHz CPU clock from the ULA","where":"ULA pin 14 to 6502 pin 37","expect":"1 MHz","ifNot":"With 12 MHz present: the ULA, or the 6502 loading the line. Cut the track and see which side loses the clock.","source":{"label":"Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 3: Verify clocks and 4: system bus (SYNC), p. 3","url":"https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=3"}}
```

### 35:107 — oric.js oric1 clock-row CPU clock (12 MHz / 12, asymmetric) (log line 913)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

ULA guide p4 proves1MHz atULA14/asymmetry, not CPU37 wiring. Guide-backed row now stops atULA14; separate checklist-backed CPU-clock-in row supplies wiring.

Log source locator: S19 p.4.

Actual NEW record (with parent source/layout context):
```json
{"name":"CPU clock (12 MHz / 12, asymmetric)","where":"ULA pin 14","f":"1 MHz","source":{"label":"Mike Brown, The Oric-1/Atmos Unofficial ULA Guide v1.02, Operation: 12 MHz in on pin 7, / 2 dot clock, / 6 to 1 MHz on pin 14 (asymmetric), 64 µs lines, p. 4","url":"https://oric.signal11.org.uk/files/pub/ula1/OricAtmosUnofficialULAGuide-1.02.pdf#page=4"}}
```

### 35:111 — oric.js atmos clock-row CPU clock (12 MHz / 12, asymmetric) (log line 914)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

ULA guide p4 proves1MHz atULA14/asymmetry, not CPU37 wiring. Guide-backed row now stops atULA14; separate checklist-backed CPU-clock-in row supplies wiring.

Log source locator: S19 p.4.

Actual NEW record (with parent source/layout context):
```json
{"name":"CPU clock (12 MHz / 12, asymmetric)","where":"ULA pin 14","f":"1 MHz","source":{"label":"Mike Brown, The Oric-1/Atmos Unofficial ULA Guide v1.02, Operation: 12 MHz in on pin 7, / 2 dot clock, / 6 to 1 MHz on pin 14 (asymmetric), 64 µs lines, p. 4","url":"https://oric.signal11.org.uk/files/pub/ula1/OricAtmosUnofficialULAGuide-1.02.pdf#page=4"}}
```

### 35:183 — acorn.js bbcb-rgb pin 6 (log line 915)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

BBC103,000/C issue9 sheet1 supplies named connector pins at+5V; no deleted±5% band specified.

Log source locator: Acorn103,000/C issue9 sheet1 bbcb-rgb; S28p51/S31sec1.2.2,7.1.

Actual NEW record (with parent source/layout context):
```json
{"n":6,"name":"+5 V","type":"power","desc":"+5 V for the monitor lead. A few mA only.","expect":"+5 V","geo":"din6","sources":[{"label":"Circuit diagram for BBC Microcomputer 103,000/C, RGB connector SK3","url":"https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf"},{"label":"Circuit diagram for BBC Microcomputer 103,000/C (goffart.co.uk copy), RGB connector SK3","url":"https://www.goffart.co.uk/museum/schematics/bbc_b.pdf"},{"label":"BBC Microcomputer Service Manual, 1.2.2 and 7.1","url":"https://acorn.huininga.nl/pub/unsorted/manuals/BBC%20Microcomputer%20Service%20Manual-HTML/BBCServiceManual.html"},{"label":"Master Series Service Manual, SK9 RGB figure, p. 51","url":"https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=51"}],"kind":"DIN-6 240° socket"}
```

### 35:191 — acorn.js bbcb-analogue pin 1 (log line 916)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

BBC103,000/C issue9 sheet1 supplies named connector pins at+5V; no deleted±5% band specified.

Log source locator: Acorn103,000/C issue9 sheet1 bbcb-analogue; S28pp41,52/S32ch26.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"+5 V","type":"power","desc":"+5 V for paddles or joysticks.","expect":"+5 V","geo":"da15","sources":[{"label":"Circuit diagram for BBC Microcomputer 103,000/C, SK6","url":"https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf"},{"label":"Circuit diagram for BBC Microcomputer 103,000/C (goffart.co.uk copy), SK6","url":"https://www.goffart.co.uk/museum/schematics/bbc_b.pdf"},{"label":"Master Series Service Manual, SK12 analogue in, p. 52","url":"https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=52"},{"label":"Advanced User Guide, ch. 26 (ADC, joystick connections)","url":"https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html"}],"kind":"DA-15 socket (15-way D-type)"}
```

### 35:200 — acorn.js bbcb-analogue pin 10 (log line 917)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

BBC103,000/C sheet1 traces analogue10 fire1 to system VIA PB5,IC3 pin15. PB1 was wrong.

Log source locator: Acorn103,000/C issue9 sheet1 bbcb-analogue; S28pp41,52/S32ch26.

Actual NEW record (with parent source/layout context):
```json
{"n":10,"name":"PB5 (fire 1)","type":"io","desc":"Digital input I1, a fire button to system VIA PB5 (IC3 pin 15).","expect":"+5 V open, 0 V pressed","geo":"da15","sources":[{"label":"Circuit diagram for BBC Microcomputer 103,000/C, SK6","url":"https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf"},{"label":"Circuit diagram for BBC Microcomputer 103,000/C (goffart.co.uk copy), SK6","url":"https://www.goffart.co.uk/museum/schematics/bbc_b.pdf"},{"label":"Master Series Service Manual, SK12 analogue in, p. 52","url":"https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=52"},{"label":"Advanced User Guide, ch. 26 (ADC, joystick connections)","url":"https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html"}],"kind":"DA-15 socket (15-way D-type)"}
```

### 35:266 — acorn.js bbcb-user pin 1 (log line 918)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

BBC103,000/C issue9 sheet1 supplies named connector pins at+5V; no deleted±5% band specified.

Log source locator: Acorn103,000/C issue9 sheet1 bbcb-user; S28p54/S32sec24.2.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"+5 V","type":"power","desc":"+5 V supply.","expect":"+5 V","geo":"custom","sources":[{"label":"Circuit diagram for BBC Microcomputer 103,000/C, user I/O connector PL10","url":"https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf"},{"label":"Circuit diagram for BBC Microcomputer 103,000/C (goffart.co.uk copy), user I/O connector PL10","url":"https://www.goffart.co.uk/museum/schematics/bbc_b.pdf"},{"label":"Master Series Service Manual, PL4 user port, p. 54","url":"https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=54"},{"label":"Advanced User Guide, 24.2 Port B, the user port","url":"https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html"}],"kind":"20-way IDC header under the case","pads":[{"n":1,"x":4,"y":55.1},{"n":2,"x":4,"y":44.9},{"n":3,"x":14.2,"y":55.1},{"n":4,"x":14.2,"y":44.9},{"n":5,"x":24.4,"y":55.1},{"n":6,"x":24.4,"y":44.9},{"n":7,"x":34.6,"y":55.1},{"n":8,"x":34.6,"y":44.9},{"n":9,"x":44.8,"y":55.1},{"n":10,"x":44.8,"y":44.9},{"n":11,"x":55,"y":55.1},{"n":12,"x":55,"y":44.9},{"n":13,"x":65.2,"y":55.1},{"n":14,"x":65.2,"y":44.9},{"n":15,"x":75.4,"y":55.1},{"n":16,"x":75.4,"y":44.9},{"n":17,"x":85.6,"y":55.1},{"n":18,"x":85.6,"y":44.9},{"n":19,"x":95.8,"y":55.1},{"n":20,"x":95.8,"y":44.9}]}
```

### 35:268 — acorn.js bbcb-user pin 3 (log line 919)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

BBC103,000/C issue9 sheet1 supplies named connector pins at+5V; no deleted±5% band specified.

Log source locator: Acorn103,000/C issue9 sheet1 bbcb-user; S28p54/S32sec24.2.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"+5 V","type":"power","desc":"+5 V supply.","expect":"+5 V","geo":"custom","sources":[{"label":"Circuit diagram for BBC Microcomputer 103,000/C, user I/O connector PL10","url":"https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf"},{"label":"Circuit diagram for BBC Microcomputer 103,000/C (goffart.co.uk copy), user I/O connector PL10","url":"https://www.goffart.co.uk/museum/schematics/bbc_b.pdf"},{"label":"Master Series Service Manual, PL4 user port, p. 54","url":"https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=54"},{"label":"Advanced User Guide, 24.2 Port B, the user port","url":"https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html"}],"kind":"20-way IDC header under the case","pads":[{"n":1,"x":4,"y":55.1},{"n":2,"x":4,"y":44.9},{"n":3,"x":14.2,"y":55.1},{"n":4,"x":14.2,"y":44.9},{"n":5,"x":24.4,"y":55.1},{"n":6,"x":24.4,"y":44.9},{"n":7,"x":34.6,"y":55.1},{"n":8,"x":34.6,"y":44.9},{"n":9,"x":44.8,"y":55.1},{"n":10,"x":44.8,"y":44.9},{"n":11,"x":55,"y":55.1},{"n":12,"x":55,"y":44.9},{"n":13,"x":65.2,"y":55.1},{"n":14,"x":65.2,"y":44.9},{"n":15,"x":75.4,"y":55.1},{"n":16,"x":75.4,"y":44.9},{"n":17,"x":85.6,"y":55.1},{"n":18,"x":85.6,"y":44.9},{"n":19,"x":95.8,"y":55.1},{"n":20,"x":95.8,"y":44.9}]}
```

### 35:366 — acorn.js bbcb-kbd pin 15 (log line 920)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

BBC103,000/C issue9 sheet1 supplies named connector pins at+5V; no deleted±5% band specified.

Log source locator: Acorn103,000/C issue9 sheet1 bbcb-kbd; S31sec3.7.

Actual NEW record (with parent source/layout context):
```json
{"n":15,"name":"+5 V","type":"power","desc":"+5 V to the keyboard.","expect":"+5 V","geo":"custom","verify":true,"sources":[{"label":"Circuit diagram for BBC Microcomputer 103,000/C, keyboard connector PL13","url":"https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf"},{"label":"Circuit diagram for BBC Microcomputer 103,000/C (goffart.co.uk copy), keyboard connector PL13","url":"https://www.goffart.co.uk/museum/schematics/bbc_b.pdf"},{"label":"BBC Microcomputer Service Manual, 3.7 Keyboard","url":"https://acorn.huininga.nl/pub/unsorted/manuals/BBC%20Microcomputer%20Service%20Manual-HTML/BBCServiceManual.html"}],"kind":"17-way single-row header (keyboard ribbon)","pads":[{"n":1,"x":6,"y":50},{"n":2,"x":12,"y":50},{"n":3,"x":17,"y":50},{"n":4,"x":23,"y":50},{"n":5,"x":28,"y":50},{"n":6,"x":34,"y":50},{"n":7,"x":39,"y":50},{"n":8,"x":45,"y":50},{"n":9,"x":50,"y":50},{"n":10,"x":56,"y":50},{"n":11,"x":61,"y":50},{"n":12,"x":67,"y":50},{"n":13,"x":72,"y":50},{"n":14,"x":78,"y":50},{"n":15,"x":83,"y":50},{"n":16,"x":89,"y":50},{"n":17,"x":94,"y":50}]}
```

### 36:0 — oric.js ula10017 pin 1 (log line 921)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: False.

Oric Owner5 PDF44-45 shows ULA1 MUX and ULA2 MA5 to address muxes. Canary values unchanged.

Log source locator: Oric Owner 5, PDF pp.44-45; issue-7 circuit sheets 1-2 (mirror); ULA ….

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"MUX","type":"ctrl","dir":"out","desc":"Select for the external 74LS257 address mux (IC8/IC20): CPU row address or ULA address.","terms":["mux"],"probe":"1 MHz pulse train"}
```

### 36:1 — oric.js ula10017 pin 2 (log line 922)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: False.

Oric Owner5 PDF44-45 shows ULA1 MUX and ULA2 MA5 to address muxes. Canary values unchanged.

Log source locator: Oric Owner 5, PDF pp.44-45; issue-7 circuit sheets 1-2 (mirror).

Actual NEW record (with parent source/layout context):
```json
{"n":2,"name":"MA5","type":"addr","dir":"out","desc":"Multiplexed DRAM address bit 5 (column from A13 or video address), to the 74LS257.","terms":["ras-cas"]}
```

### 36:120 — amstrad.js cpc464 clock-row CRTC character clock (log line 923)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CPC464 PDF13 printed15-16 traces40007 pin40 to6845 pin21; Amendment PDF8 shows40010 CCLK4. CPCWiki CRTC proves1MHz. Source note correctly separates wiring/rate.

Log source locator: CPCWiki CRTC, oldwiki mirror: Border bytes and embedded block diagrams.

Actual NEW record (with parent source/layout context):
```json
{"name":"CRTC character clock","where":"40007 pin 40 to 6845 pin 21; 40010 boards: 40010 pin 4","f":"1 MHz","source":{"label":"CPCWiki, CRTC (types 0-4, 1 MHz clock; oldwiki mirror)","url":"https://oldwiki.cpcwiki.eu/index.php/CRTC","note":"The pin wiring is from the service manual circuit diagram (40007) and the Amendment (40010)."}}
```

### 36:121 — amstrad.js cpc664 clock-row CRTC character clock (log line 924)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CPC664/CPC6128 PDF17 printed19/19-20 traces40010 CCLK4 to6845 pin21; CPCWiki CRTC proves1MHz. Added attribution accurate.

Log source locator: CPCWiki CRTC, oldwiki mirror: Border bytes and embedded block diagrams.

Actual NEW record (with parent source/layout context):
```json
{"name":"CRTC character clock","where":"40010 pin 4 to 6845 pin 21","f":"1 MHz","source":{"label":"CPCWiki, CRTC (types 0-4, 1 MHz clock; oldwiki mirror)","url":"https://oldwiki.cpcwiki.eu/index.php/CRTC","note":"The pin wiring is from the service manual CPU circuit diagram."}}
```

### 36:122 — amstrad.js cpc6128 clock-row CRTC character clock (log line 925)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CPC664/CPC6128 PDF17 printed19/19-20 traces40010 CCLK4 to6845 pin21; CPCWiki CRTC proves1MHz. Added attribution accurate.

Log source locator: CPCWiki CRTC, oldwiki mirror: Border bytes and embedded block diagrams.

Actual NEW record (with parent source/layout context):
```json
{"name":"CRTC character clock","where":"40010 pin 4 to 6845 pin 21","f":"1 MHz","source":{"label":"CPCWiki, CRTC (types 0-4, 1 MHz clock; oldwiki mirror)","url":"https://oldwiki.cpcwiki.eu/index.php/CRTC","note":"The pin wiring is from the service manual CPU circuit diagram."}}
```

### 36:124 — amstrad.js cpc464 clock-row Interrupt (every 52 HSYNCs) (log line 926)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CPCWiki Gate_Array Interrupt generation counts52HSYNCs, resynchronises toVSYNC and permits software reset. Zilog UM0080 identifies /INT16. Nominal qualifier needed.

Log source locator: CPCWiki Gate Array, oldwiki mirror: Interrupt generation.

Actual NEW record (with parent source/layout context):
```json
{"name":"Interrupt (every 52 HSYNCs, nominal)","where":"Z80A pin 16","f":"300 Hz","source":{"label":"CPCWiki, Gate Array (registers, RAM configurations; oldwiki mirror)","url":"https://oldwiki.cpcwiki.eu/index.php/Gate_Array","note":"Z80 pin 16 is /INT (Zilog UM0080). The counter also resynchronises to VSYNC and software can reset it, so the rate is nominal."}}
```

### 36:126 — amstrad.js cpc664 clock-row Interrupt (every 52 HSYNCs) (log line 927)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CPCWiki Gate_Array Interrupt generation counts52HSYNCs, resynchronises toVSYNC and permits software reset. Zilog UM0080 identifies /INT16. Nominal qualifier needed.

Log source locator: CPCWiki Gate Array, oldwiki mirror: Interrupt generation.

Actual NEW record (with parent source/layout context):
```json
{"name":"Interrupt (every 52 HSYNCs, nominal)","where":"Z80A pin 16","f":"300 Hz","source":{"label":"CPCWiki, Gate Array (registers, RAM configurations; oldwiki mirror)","url":"https://oldwiki.cpcwiki.eu/index.php/Gate_Array","note":"Z80 pin 16 is /INT (Zilog UM0080). The counter also resynchronises to VSYNC and software can reset it, so the rate is nominal."}}
```

### 36:128 — amstrad.js cpc6128 clock-row Interrupt (every 52 HSYNCs) (log line 928)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

CPCWiki Gate_Array Interrupt generation counts52HSYNCs, resynchronises toVSYNC and permits software reset. Zilog UM0080 identifies /INT16. Nominal qualifier needed.

Log source locator: CPCWiki Gate Array, oldwiki mirror: Interrupt generation.

Actual NEW record (with parent source/layout context):
```json
{"name":"Interrupt (every 52 HSYNCs, nominal)","where":"Z80A pin 16","f":"300 Hz","source":{"label":"CPCWiki, Gate Array (registers, RAM configurations; oldwiki mirror)","url":"https://oldwiki.cpcwiki.eu/index.php/Gate_Array","note":"Z80 pin 16 is /INT (Zilog UM0080). The counter also resynchronises to VSYNC and software can reset it, so the rate is nominal."}}
```

### 37:2 — heathkit.js rom2764 (log line 929)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

AT28C64B pp1-4 gives8Kx8,PDIP NC1/26,/WE27 and read-mode /WE high. Board wiring is now conditional. Replacement/kind:modern were NOT removed despite log dashes.

Log source locator: AT28C64B pp.1-2, write-operation sections.

Actual NEW record (with parent source/layout context):
```json
{"replacements":[{"part":"27C64","kind":"pin-compatible","note":"CMOS version of the 2764 with the same pinout (pin 1 VPP, 26 NC, 27 /PGM). Microchip lists its 27C64 as obsolete, but parts are common. In the ColecoVision U2 socket, set jumpers WJ4/WJ5 for a 2764 first.","source":{"label":"Microchip 27C64 data sheet DS11107M, pin diagram, p. 1","url":"https://ww1.microchip.com/downloads/en/DeviceDoc/11107M.pdf#page=1"}},{"part":"AT28C64B","kind":"modern","note":"Electrically erasable 8K x 8 in the same 28-pin JEDEC pinout: re-program it in place of UV erasing. Pin 27 is /WE and must be held high; pin 1 and pin 26 are NC. Check that the board ties pin 27 (/PGM on a 2764) high: a socket that leaves it floating can write to the part.","source":{"label":"Microchip (Atmel) AT28C64B data sheet 0270L, pin configurations, p. 2","url":"https://ww1.microchip.com/downloads/en/DeviceDoc/doc0270.pdf#page=2"}}]}
```

### 37:9 — oric.js atmos-exp pin 2 (log line 930)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: True.

Atmos PDF289 labels expansion2 /ROMDIS,3 PHI2. Canary records unchanged.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":2,"name":"/ROMDIS","type":"ctrl","desc":"Input. Low disables the BASIC ROM (IC9 pin 27, 2K2 pull-up).","expect":"+5 V (held high by RP1)","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:10 — oric.js atmos-exp pin 3 (log line 931)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: True.

Atmos PDF289 labels expansion2 /ROMDIS,3 PHI2. Canary records unchanged.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"PHI2","type":"clock","desc":"6502 phase 2 clock out (6502 pin 39).","expect":"1 MHz square wave","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:11 — oric.js atmos-exp pin 5 (log line 932)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":5,"name":"/I/O","type":"ctrl","desc":"Output from ULA pin 25: low whenever $0300-$03FF is addressed.","expect":"Short low pulses while the VIA is in use","verify":true,"geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:12 — oric.js atmos-exp pin 6 (log line 933)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":6,"name":"I/O CONTROL","type":"ctrl","desc":"Input to VIA CS1 (pin 24). Pull low to disable the internal VIA for an external device in page 3.","expect":"+5 V (pulled up)","verify":true,"geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:13 — oric.js atmos-exp pin 8 (log line 934)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":8,"name":"/IRQ","type":"ctrl","desc":"Interrupt request into the 6502 (pin 4), shared with the VIA.","expect":"+5 V, pulled low by the VIA or a card","verify":true,"geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:14 — oric.js atmos-exp pin 9 (log line 935)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":9,"name":"D2","type":"data","desc":"Data bit 2.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:15 — oric.js atmos-exp pin 10 (log line 936)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":10,"name":"D0","type":"data","desc":"Data bit 0.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:16 — oric.js atmos-exp pin 11 (log line 937)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":11,"name":"A3","type":"addr","desc":"Address bit 3.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:17 — oric.js atmos-exp pin 12 (log line 938)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":12,"name":"D1","type":"data","desc":"Data bit 1.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:18 — oric.js atmos-exp pin 13 (log line 939)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":13,"name":"A0","type":"addr","desc":"Address bit 0.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:19 — oric.js atmos-exp pin 14 (log line 940)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":14,"name":"D6","type":"data","desc":"Data bit 6.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:20 — oric.js atmos-exp pin 15 (log line 941)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":15,"name":"A1","type":"addr","desc":"Address bit 1.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:21 — oric.js atmos-exp pin 16 (log line 942)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":16,"name":"D3","type":"data","desc":"Data bit 3.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:22 — oric.js atmos-exp pin 17 (log line 943)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":17,"name":"A2","type":"addr","desc":"Address bit 2.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:23 — oric.js atmos-exp pin 18 (log line 944)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":18,"name":"D4","type":"data","desc":"Data bit 4.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:24 — oric.js atmos-exp pin 19 (log line 945)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":19,"name":"D5","type":"data","desc":"Data bit 5.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:25 — oric.js atmos-exp pin 20 (log line 946)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":20,"name":"A4","type":"addr","desc":"Address bit 4.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:26 — oric.js atmos-exp pin 21 (log line 947)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":21,"name":"A5","type":"addr","desc":"Address bit 5.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:27 — oric.js atmos-exp pin 22 (log line 948)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":22,"name":"D7","type":"data","desc":"Data bit 7.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:28 — oric.js atmos-exp pin 23 (log line 949)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":23,"name":"A6","type":"addr","desc":"Address bit 6.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:29 — oric.js atmos-exp pin 24 (log line 950)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":24,"name":"A15","type":"addr","desc":"Address bit 15.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:30 — oric.js atmos-exp pin 25 (log line 951)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":25,"name":"A7","type":"addr","desc":"Address bit 7.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:31 — oric.js atmos-exp pin 26 (log line 952)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":26,"name":"A14","type":"addr","desc":"Address bit 14.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:32 — oric.js atmos-exp pin 27 (log line 953)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":27,"name":"A8","type":"addr","desc":"Address bit 8.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:33 — oric.js atmos-exp pin 28 (log line 954)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":28,"name":"A13","type":"addr","desc":"Address bit 13.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:34 — oric.js atmos-exp pin 29 (log line 955)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":29,"name":"A9","type":"addr","desc":"Address bit 9.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:35 — oric.js atmos-exp pin 31 (log line 956)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":31,"name":"A10","type":"addr","desc":"Address bit 10.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:36 — oric.js atmos-exp pin 32 (log line 957)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":32,"name":"A11","type":"addr","desc":"Address bit 11.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:37 — oric.js atmos-exp pin 33 (log line 958)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even row above odd,pin1 left; custom idc(34) implements this pin position. Service-manual PDF65 listsPL2 34-way right-angle IDC. Edge geometry was wrong; log-listed verify flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":33,"name":"+5 V","type":"power","desc":"Computer +5 V rail (the same rail as the DC jack centre pin).","expect":"+5 V DC","verify":true,"geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Defence Force Oric wiki, expansion board signals (archived copy)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board"},{"label":"Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":9.8,"y":53},{"n":4,"x":9.8,"y":47},{"n":5,"x":15.5,"y":53},{"n":6,"x":15.5,"y":47},{"n":7,"x":21.3,"y":53},{"n":8,"x":21.3,"y":47},{"n":9,"x":27,"y":53},{"n":10,"x":27,"y":47},{"n":11,"x":32.8,"y":53},{"n":12,"x":32.8,"y":47},{"n":13,"x":38.5,"y":53},{"n":14,"x":38.5,"y":47},{"n":15,"x":44.3,"y":53},{"n":16,"x":44.3,"y":47},{"n":17,"x":50,"y":53},{"n":18,"x":50,"y":47},{"n":19,"x":55.8,"y":53},{"n":20,"x":55.8,"y":47},{"n":21,"x":61.5,"y":53},{"n":22,"x":61.5,"y":47},{"n":23,"x":67.3,"y":53},{"n":24,"x":67.3,"y":47},{"n":25,"x":73,"y":53},{"n":26,"x":73,"y":47},{"n":27,"x":78.8,"y":53},{"n":28,"x":78.8,"y":47},{"n":29,"x":84.5,"y":53},{"n":30,"x":84.5,"y":47},{"n":31,"x":90.3,"y":53},{"n":32,"x":90.3,"y":47},{"n":33,"x":96,"y":53},{"n":34,"x":96,"y":47}]}
```

### 37:38 — oric.js atmos-printer pin 1 (log line 959)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"/STROBE","type":"ctrl","desc":"Data strobe to the printer, VIA PB4 (pin 14). Normally high, pulses low.","expect":"+5 V, low pulse per byte","verify":true,"geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:39 — oric.js atmos-printer pin 3 (log line 960)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"D0","type":"data","desc":"Data bit 0, VIA PA0 (pin 2).","verify":true,"geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:40 — oric.js atmos-printer pin 5 (log line 961)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":5,"name":"D1","type":"data","desc":"Data bit 1, VIA PA1.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:41 — oric.js atmos-printer pin 7 (log line 962)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":7,"name":"D2","type":"data","desc":"Data bit 2, VIA PA2.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:42 — oric.js atmos-printer pin 9 (log line 963)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":9,"name":"D3","type":"data","desc":"Data bit 3, VIA PA3.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:43 — oric.js atmos-printer pin 11 (log line 964)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":11,"name":"D4","type":"data","desc":"Data bit 4, VIA PA4.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:44 — oric.js atmos-printer pin 13 (log line 965)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":13,"name":"D5","type":"data","desc":"Data bit 5, VIA PA5.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:45 — oric.js atmos-printer pin 15 (log line 966)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":15,"name":"D6","type":"data","desc":"Data bit 6, VIA PA6.","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:46 — oric.js atmos-printer pin 17 (log line 967)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":17,"name":"D7","type":"data","desc":"Data bit 7, VIA PA7 (pin 9).","verify":true,"geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:47 — oric.js atmos-printer pin 19 (log line 968)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":19,"name":"/ACK","type":"ctrl","desc":"Acknowledge from the printer into VIA CA1 (pin 40).","verify":true,"geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:48 — oric.js atmos-printer pin 2 (log line 969)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":2,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:49 — oric.js atmos-printer pin 4 (log line 970)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":4,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:50 — oric.js atmos-printer pin 6 (log line 971)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":6,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:51 — oric.js atmos-printer pin 8 (log line 972)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":8,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:52 — oric.js atmos-printer pin 10 (log line 973)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":10,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:53 — oric.js atmos-printer pin 12 (log line 974)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":12,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:54 — oric.js atmos-printer pin 14 (log line 975)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":14,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:55 — oric.js atmos-printer pin 16 (log line 976)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":16,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:56 — oric.js atmos-printer pin 18 (log line 977)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":18,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:57 — oric.js atmos-printer pin 20 (log line 978)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF289: even grounds above odd signals,pin1 left; custom idc(20) implements this pin position. Service PDF65 listsPL1 20-way right-angle IDC. Log-listed flags present.

Log source locator: Atmos p.284 (PDF289); Oric service manual PDF65.

Actual NEW record (with parent source/layout context):
```json
{"n":20,"name":"GND","type":"ground","desc":"Ground return.","expect":"0 V","geo":"custom","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 11 Input/Output, p. 223-225","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=228"},{"label":"Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)","url":"https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65"}],"kind":"20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering","pads":[{"n":1,"x":4,"y":53},{"n":2,"x":4,"y":47},{"n":3,"x":14.2,"y":53},{"n":4,"x":14.2,"y":47},{"n":5,"x":24.4,"y":53},{"n":6,"x":24.4,"y":47},{"n":7,"x":34.7,"y":53},{"n":8,"x":34.7,"y":47},{"n":9,"x":44.9,"y":53},{"n":10,"x":44.9,"y":47},{"n":11,"x":55.1,"y":53},{"n":12,"x":55.1,"y":47},{"n":13,"x":65.3,"y":53},{"n":14,"x":65.3,"y":47},{"n":15,"x":75.6,"y":53},{"n":16,"x":75.6,"y":47},{"n":17,"x":85.8,"y":53},{"n":18,"x":85.8,"y":47},{"n":19,"x":96,"y":53},{"n":20,"x":96,"y":47}]}
```

### 37:61 — oric.js atmos-rgb pin 4 (log line 979)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF290 givesSYNC4; Owner5 PDF44 tracesULA16 sync; ULA guide pp4-5 supplies composite H/V timing. Current connector now cites guide.

Log source locator: Atmos p.285 (PDF290); Oric Owner 5 PDF44.

Actual NEW record (with parent source/layout context):
```json
{"n":4,"name":"SYNC","type":"video","desc":"Composite sync.","expect":"15.6 kHz line / 50 Hz frame","geo":"din5-180","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric-1 48K circuit diagram, Oric Products International, issue 7 (24-2-84), sheet 1: CPU, ULA, VIA, AY, PSU, video, cassette, printer, keyboard (Defence Force wiki, archived)","url":"https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-1s.gif"},{"label":"Oric Owner issue 5, circuit diagram pull-out (Oric-1, earlier issue, sharper scan), p. 44","url":"https://library.defence-force.org/books/content/oric_owner/OricOwner_05.pdf#page=44"},{"label":"Mike Brown, The Oric-1/Atmos Unofficial ULA Guide v1.02, Operation: 12 MHz in on pin 7, / 2 dot clock, / 6 to 1 MHz on pin 14 (asymmetric), 64 µs lines, p. 4","url":"https://oric.signal11.org.uk/files/pub/ula1/OricAtmosUnofficialULAGuide-1.02.pdf#page=4"},{"label":"Mike Brown, The Oric-1/Atmos Unofficial ULA Guide v1.02, vertical count: 312 lines (50 Hz) or 260 lines (60 Hz), p. 5","url":"https://oric.signal11.org.uk/files/pub/ula1/OricAtmosUnofficialULAGuide-1.02.pdf#page=5"}],"kind":"5-pin DIN 180 degrees"}
```

### 37:63 — oric.js atmos-tape pin 1 (log line 980)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF290 proves cassette pin function/geometry, not retained internal PB7/CB1/AY/relay wiring or tone expectation. verify is present/honest; connector source list still lacks board-level proof.

Log source locator: Atmos pp.62-65,285.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"TAPE OUT","type":"audio","desc":"To the recorder MIC/record input, from VIA PB7 (pin 17).","expect":"Tone bursts while CSAVE runs","verify":true,"geo":"din7","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 6 Tapes and Data, p. 62-65","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=67"}],"kind":"7-pin DIN 270 degrees"}
```

### 37:65 — oric.js atmos-tape pin 3 (log line 981)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF290 proves cassette pin function/geometry, not retained internal PB7/CB1/AY/relay wiring or tone expectation. verify is present/honest; connector source list still lacks board-level proof.

Log source locator: Atmos pp.62-65,285.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"TAPE IN","type":"audio","desc":"From the recorder EAR output, to the LM358 shaper and VIA CB1 (pin 18).","verify":true,"geo":"din7","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 6 Tapes and Data, p. 62-65","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=67"}],"kind":"7-pin DIN 270 degrees"}
```

### 37:66 — oric.js atmos-tape pin 4 (log line 982)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: False.

Atmos PDF290 proves cassette pin function/geometry, not retained internal PB7/CB1/AY/relay wiring or tone expectation. verify is present/honest; connector source list still lacks board-level proof.

Log source locator: Atmos p.285 (PDF290).

Actual NEW record (with parent source/layout context):
```json
{"n":4,"name":"SOUND","type":"audio","desc":"AY-3-8912 mixed output (pins 1, 4, 5).","verify":true,"geo":"din7","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 6 Tapes and Data, p. 62-65","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=67"}],"kind":"7-pin DIN 270 degrees"}
```

### 37:67 — oric.js atmos-tape pin 5 (log line 983)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: False.

Atmos PDF290 proves cassette pin function/geometry, not retained internal PB7/CB1/AY/relay wiring or tone expectation. verify is present/honest; connector source list still lacks board-level proof.

Log source locator: Atmos p.285 (PDF290).

Actual NEW record (with parent source/layout context):
```json
{"n":5,"name":"SOUND","type":"audio","desc":"Joined to pin 4 on the board.","verify":true,"geo":"din7","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 6 Tapes and Data, p. 62-65","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=67"}],"kind":"7-pin DIN 270 degrees"}
```

### 37:68 — oric.js atmos-tape pin 6 (log line 984)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

Atmos PDF290 proves cassette pin function/geometry, not retained internal PB7/CB1/AY/relay wiring or tone expectation. verify is present/honest; connector source list still lacks board-level proof.

Log source locator: Atmos p.285 (PDF290).

Actual NEW record (with parent source/layout context):
```json
{"n":6,"name":"RELAY","type":"ctrl","desc":"Motor relay contact (RL1).","verify":true,"geo":"din7","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 6 Tapes and Data, p. 62-65","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=67"}],"kind":"7-pin DIN 270 degrees"}
```

### 37:73 — oric.js atmos-tv pin 2 (log line 985)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

Atmos pp3-4/284-285 identifies TV socket, not RF-shell continuity to board0V. verify is honest.

Log source locator: Atmos pp.3-4,284-285.

Actual NEW record (with parent source/layout context):
```json
{"n":2,"name":"GND","type":"ground","desc":"Shell.","expect":"0 V","verify":true,"geo":"rca","sources":[{"label":"Oric Atmos manual (Oric Products International), Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289"},{"label":"Oric Atmos manual (Oric Products International), Appendix 11, p. 285 (RGB and cassette DINs)","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290"},{"label":"Oric Atmos manual (Oric Products International), ch. 1 Getting the ATMOS together, p. 3-4","url":"https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=8"}],"kind":"Phono socket from the UHF modulator"}
```

### 37:75 — heathkit.js sc01a (log line 986)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

ReActiveMicro page names Antonini, earlyMockingboard/arcade use and out-of-stock status; new note removes blanket manufacturing-status claim and admits undocumentedHERO use. Replacement/modern entry remains despite log dashes.

Log source locator: ReActiveMicro SC-01 Emulator product page.

Actual NEW record (with parent source/layout context):
```json
{"replacements":[{"part":"SC-01 Emulator (Alberto Antonini, sold by ReActiveMicro)","kind":"modern","note":"This plug-in module replaces the chip in pinball and early Mockingboard boards (the seller's page). It is not documented in a HERO: check speech pitch and the A/R handshake before you trust it. Out of stock when checked on 2026-10-30.","source":{"label":"ReActiveMicro, SC-01 Emulator - Sound and Speech Replacement Module","url":"https://www.reactivemicro.com/product/sc-01-emulator-sound-and-speech-replacement-module/"}}]}
```

### 37:76 — heathkit.js sc01a pin 2 (log line 987)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SC01 pp2,4 provesI2 pitch input. Two-pins-for-one wording removed. HERO1 two-line pitch wiring relocated to summary is broadly supported by ET18 TM printed78; exact mapping still needs schematic.

Log source locator: SC-01 datasheet pp.2,4.

Actual NEW record (with parent source/layout context):
```json
{"n":2,"name":"I2","type":"io","dir":"in","desc":"Pitch/inflection input bit 2."}
```

### 37:81 — heathkit.js sc01a pin 7 (log line 988)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SC01 p4 states rising-edgeSTB latching,pin7 onp2. Relocated board STB/CA2 supported byET18 TM78/JrTM27.

Log source locator: SC-01 datasheet pp.2,4.

Actual NEW record (with parent source/layout context):
```json
{"n":7,"name":"STB","type":"ctrl","dir":"in","desc":"Strobe: the phoneme code latches on the rising edge.","terms":["strobe"],"probe":"A short high pulse for each phoneme."}
```

### 37:82 — heathkit.js sc01a pin 8 (log line 989)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SC01 p4 states A/R high-to-low receipt,then low-to-high request,pin8 onp2. Universal stuck-low-no-speech diagnosis removed; JrTM27 supports relocatedCA1.

Log source locator: SC-01 datasheet pp.2,4.

Actual NEW record (with parent source/layout context):
```json
{"n":8,"name":"A/R","type":"ctrl","dir":"out","desc":"Acknowledge/request: goes low when a code is latched and high when ready for the next phoneme.","probe":"High between phonemes."}
```

### 37:83 — heathkit.js sc01a pin 9 (log line 990)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SC01 p2 namesP5 pin9,p4 six-bit code. JrTM27 supports relocated$D840 board wiring.

Log source locator: SC-01 datasheet pp.2,4.

Actual NEW record (with parent source/layout context):
```json
{"n":9,"name":"P5","type":"data","dir":"in","desc":"Phoneme code bit 5 (six-bit code)."}
```

### 37:89 — heathkit.js sc01a pin 15 (log line 991)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

SC01 pp2,4 proves MCX15-MCRC internal-RC connection. Removed HERO1 R515/C501300pF and MCX tie were relocated to new summary. ET18 TM104 proves parts,not that exact connection; speech schematic still needed.

Log source locator: SC-01 datasheet pp.2,4.

Actual NEW record (with parent source/layout context):
```json
{"n":15,"name":"MCX","type":"clock","dir":"in","desc":"Master clock input for an external clock. Tied to MCRC to use the internal RC oscillator.","terms":["clock"]}
```

### 37:92 — heathkit.js sc01a pin 20 (log line 992)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

SC01 pp2,4 provesCB20 class-B source. Removed HERO1 CB-open claim reappears in new summary; ET18 TM78 does not prove open circuit. No actual speech schematic source link was supplied.

Log source locator: SC-01 datasheet pp.2,4.

Actual NEW record (with parent source/layout context):
```json
{"n":20,"name":"CB","type":"audio","dir":"out","desc":"Class B: current source for a class B transistor audio amplifier."}
```

### 37:93 — heathkit.js sc01a pin 21 (log line 993)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

SC01 pp2,4 provesAF21 function. HERO1 AF-to-AO hard short moved to new summary; ET18 TM78 describes audio on21/22 but does not establish short. JrTM27 does supportR233/R234 coupling.

Log source locator: SC-01 datasheet pp.2,4.

Actual NEW record (with parent source/layout context):
```json
{"n":21,"name":"AF","type":"audio","dir":"in","desc":"Audio feedback from a class A or class B transistor amplifier."}
```

### 37:94 — heathkit.js sc01a pin 22 (log line 994)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

SC01 p4 establishesAO22 output; ET18 TM78 supports relocated volume/amplifier/P50215 path.

Log source locator: SC-01 datasheet pp.2,4.

Actual NEW record (with parent source/layout context):
```json
{"n":22,"name":"AO","type":"audio","dir":"out","desc":"Audio output, to the volume control and amplifier."}
```

### 37:116 — acorn.js bbcmaster clock-row RTC clock out to TP1 (CKFS high: time ba… (log line 995)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

RTC pp1,8 identifiesCKOUT21/CKFS20 and undividedOSC1 withCKFS high. Master0143,000 sheet1 tiesCKFS high/CKOUT-TP1;32.768kHz timebase supported. verify conservative.

Log source locator: MC146818A pp.1,8.

Actual NEW record (with parent source/layout context):
```json
{"name":"RTC clock out to TP1 (CKFS high: time base / 1)","where":"RTC pin 21 (TP1)","f":"32.768 kHz","verify":true,"source":{"label":"Motorola MC146818A data sheet ADI-1026: CKFS high gives CKOUT = OSC1 frequency, pp. 8-10","url":"https://www.scs.stanford.edu/22wi-cs212/pintos/specs/mc146818a.pdf#page=8"},"note":"Drawing 0143,000 ties CKFS (pin 20) to +5VB and takes CKOUT to test point TP1, the buffered clock output the service manual names."}
```

### 37:119 — acorn.js cpu65sc12 pin 4 (log line 996)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

Master sheet1 provesIRQ4/TP4/shared sources. Ref2 O.4 does not prove pulses at-least-every10ms or that any stuck level alone is fault. verify honest.

Log source locator: Master schematic sheets1-2; Reference Manual2 O.4.

Actual NEW record (with parent source/layout context):
```json
{"n":4,"name":"/IRQ","type":"ctrl","dir":"in","activeLow":true,"desc":"Interrupt request (TP4). The memory controller, RTC (via LK4) and VIAs pull it.","terms":["irq"],"probe":"Pulses at least every 10 ms from the system VIA; stuck low or high = fault.","verify":true}
```

### 37:147 — acorn.js cpu65sc12 pin 37 (log line 997)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Master0143,000 sheet1 routesVIDPROC2MHz toCPU37 andIO-controllerRDY17 toCPU2; servicep32 step5 requires clean2MHz. RDY-cycle-hold correction justified.

Log source locator: Master schematic sheet1 IC14/IC15/IC42; service manual p.32 step5.

Actual NEW record (with parent source/layout context):
```json
{"n":37,"name":"PHI2 IN","type":"clock","dir":"in","desc":"2 MHz clock in, from the VIDPROC. Slow 1 MHz devices are handled by holding the cycle with RDY (pin 2, from the I/O controller IC15 pin 17), not by stretching this clock.","terms":["clock"],"probe":"Clean 2 MHz (SM 7.1.2 step 5)."}
```

### 37:152 — acorn.js master-cart pin A1 (log line 998)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Master0143,000 sheet1 labels cartridgeA1/B1 +5VC,not deleted voltage tolerance.

Log source locator: Master schematic sheet1 SK3/SK4; service/reference manuals.

Actual NEW record (with parent source/layout context):
```json
{"n":"A1","name":"+5 V","type":"power","desc":"+5 V cartridge supply (+5VC).","expect":"+5 V","geo":"edge-22x22-ab","verify":true,"sources":[{"label":"Master main PCB circuit diagram 0143,000 sheet 1, SK3/SK4 cartridge","url":"https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf"},{"label":"Master Series Service Manual, 4 Selection links (LK2, LK6, LK12, LK21), pp. 8-10","url":"https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=8"},{"label":"Master Reference Manual Part 1, F.5 links LK12, LK21","url":"https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf#page=245"}],"kind":"44-way edge sockets, rows a and b (2 x 22)"}
```

### 37:153 — acorn.js master-cart pin A2 (log line 999)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Master0143,000 sheet1 labelsSK3 A2 AT13 andSK4 A2 AT15. verify/conflict present,explicit and honest.

Log source locator: Master schematic sheet1 SK3/SK4.

Actual NEW record (with parent source/layout context):
```json
{"n":"A2","name":"AT13","type":"addr","desc":"Memory-controller address line AT13.","verify":true,"conflict":"Drawing 0143,000 sheet 1 labels SK3 A2 AT13 but SK4 A2 AT15.","geo":"edge-22x22-ab","sources":[{"label":"Master main PCB circuit diagram 0143,000 sheet 1, SK3/SK4 cartridge","url":"https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf"},{"label":"Master Series Service Manual, 4 Selection links (LK2, LK6, LK12, LK21), pp. 8-10","url":"https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=8"},{"label":"Master Reference Manual Part 1, F.5 links LK12, LK21","url":"https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf#page=245"}],"kind":"44-way edge sockets, rows a and b (2 x 22)"}
```

### 37:166 — acorn.js master-cart pin A17 (log line 1000)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Master servicep9/ref1 PDF243-244 distinguish16MHz internal(A-B),8MHz tocart(A-B+C-D),mandatory16MHz input(B-D),withDRAM damage warning. Current expectation matches.

Log source locator: Master service manual p.9; Reference Manual1 F.5-2/3 (PDF243-244); sc….

Actual NEW record (with parent source/layout context):
```json
{"n":"A17","name":"CLOCK (LK6)","type":"clock","desc":"Main clock link LK6. As shipped (A-B) the board makes its own 16 MHz. With C-D also fitted the cartridges get the 8 MHz clock. With B-D the computer takes its 16 MHz FROM this pin, and a source MUST then be present or the DRAMs can be destroyed.","expect":"Depends on LK6: 8 MHz with A-B plus C-D; an external 16 MHz in with B-D","geo":"edge-22x22-ab","verify":true,"sources":[{"label":"Master main PCB circuit diagram 0143,000 sheet 1, SK3/SK4 cartridge","url":"https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf"},{"label":"Master Series Service Manual, 4 Selection links (LK2, LK6, LK12, LK21), pp. 8-10","url":"https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=8"},{"label":"Master Reference Manual Part 1, F.5 links LK12, LK21","url":"https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf#page=245"}],"kind":"44-way edge sockets, rows a and b (2 x 22)"}
```

### 37:172 — acorn.js master-cart pin B1 (log line 1001)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

Master0143,000 sheet1 labels cartridgeA1/B1 +5VC,not deleted voltage tolerance.

Log source locator: Master schematic sheet1 SK3/SK4; service/reference manuals.

Actual NEW record (with parent source/layout context):
```json
{"n":"B1","name":"+5 V","type":"power","desc":"+5 V (joined to a1).","expect":"+5 V","geo":"edge-22x22-ab","verify":true,"sources":[{"label":"Master main PCB circuit diagram 0143,000 sheet 1, SK3/SK4 cartridge","url":"https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf"},{"label":"Master Series Service Manual, 4 Selection links (LK2, LK6, LK12, LK21), pp. 8-10","url":"https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=8"},{"label":"Master Reference Manual Part 1, F.5 links LK12, LK21","url":"https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf#page=245"}],"kind":"44-way edge sockets, rows a and b (2 x 22)"}
```

### 37:212 — heathkit.js adc0831 pin 1 (log line 1002)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TI ADC0831 PDF2 provesCS1. JrTM PDF24 printed22 proves$D841 U21513=PB3. HERO qualification/verify honest,but ADC record needs direct board-manual citation.

Log source locator: TI ADC0831-N p.2 Fig.4.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"/CS","type":"ctrl","dir":"in","activeLow":true,"desc":"Chip select, active low. HERO Jr: from U215 port B bit 3 ($D841).","terms":["cs","active-low"],"verify":true}
```

### 37:213 — heathkit.js adc0831 pin 2 (log line 1003)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TI PDF2 provesVIN+2. JrTM PDF23 printed21 explicitly routes sound/light viaQ308 toU306 pin2. HERO qualification/verify honest; add board source.

Log source locator: TI ADC0831-N p.2 Fig.4.

Actual NEW record (with parent source/layout context):
```json
{"n":2,"name":"VIN+","type":"ctrl","dir":"in","desc":"Analog input. HERO Jr: from the sound or light path, through Q308.","verify":true}
```

### 37:214 — heathkit.js adc0831 pin 3 (log line 1004)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

TI PDF2 provesVIN-3,notHERO ground tie. JrTM21-22 does not establish tie; claimed schematic is not linked on record. verify honest.

Log source locator: TI ADC0831-N p.2 Fig.4.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"VIN-","type":"ctrl","dir":"in","desc":"Analog input, negative. HERO Jr: tied to ground for single-ended reads.","verify":true}
```

### 37:215 — heathkit.js adc0831 pin 5 (log line 1005)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

TI PDF2 provesVREF5,notR3541500Ω/R3554700Ω or+5SW reference. JrTM22 names resistors,not values.3.79V arithmetic is not board proof. verify honest.

Log source locator: TI ADC0831-N p.2 Fig.4.

Actual NEW record (with parent source/layout context):
```json
{"n":5,"name":"VREF","type":"ctrl","dir":"in","desc":"Reference. HERO Jr: 1500 ohm to +5SW and 4700 ohm to ground (R354/R355), about 3.79 V.","verify":true}
```

### 37:216 — heathkit.js adc0831 pin 6 (log line 1006)

**WRONG**. Change needed: Yes. Actual scoped record changed: True.

JrTM PDF24 printed22 routes serial data toU21515=PIA PB5,notPB4. PB4/U21514 clocks ADC. Correct pin6 board description toPB5; verify does not fix wrong pin.

Log source locator: TI ADC0831-N p.2 Fig.4.

Actual NEW record (with parent source/layout context):
```json
{"n":6,"name":"DO","type":"data","dir":"out","desc":"Serial data output. HERO Jr: read on U215 port B bit 4.","terms":["tristate"],"verify":true}
```

### 37:217 — heathkit.js adc0831 pin 7 (log line 1007)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TI PDF2 namesCLK7; JrTM PDF24 printed22 supplies it fromU21514/PB4. U215 connection correct; verify conservative. Add actual board-manual citation.

Log source locator: TI ADC0831-N p.2 Fig.4.

Actual NEW record (with parent source/layout context):
```json
{"n":7,"name":"CLK","type":"clock","dir":"in","desc":"Serial clock. HERO Jr: from U215.","terms":["clock"],"verify":true}
```

### 38:0 — acorn.js lm324 pin 1 (log line 1008)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: False.

TI LM324 p3 Fig5-1/Table5-1:PDIP1 amplifier1 output,3 noninverting input. Canary data unchanged.

Log source locator: TI LM324 p. 3, Fig. 5-1 / Table 5-1.

Actual NEW record (with parent source/layout context):
```json
{"n":1,"name":"1OUT","type":"audio","dir":"out","desc":"Amplifier 1 output."}
```

### 38:1 — acorn.js lm324 pin 3 (log line 1009)

**CORRECT**. Change needed: No; no change appropriate. Actual scoped record changed: False.

TI LM324 p3 Fig5-1/Table5-1:PDIP1 amplifier1 output,3 noninverting input. Canary data unchanged.

Log source locator: TI LM324 p. 3, Fig. 5-1 / Table 5-1.

Actual NEW record (with parent source/layout context):
```json
{"n":3,"name":"1IN+","type":"audio","dir":"in","desc":"Amplifier 1 non-inverting input."}
```

### 38:157 — heathkit.js tl851 pin 11 (log line 1010)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TI TL851 pp1-2 namesXTAL1/2 resonator nodes,without defining both ordinary inputs. Neutral direction removes unsupported assertion.

Log source locator: TI TL851 pp. 1-5.

Actual NEW record (with parent source/layout context):
```json
{"n":11,"name":"XTAL1","type":"clock","dir":"-","desc":"Ceramic resonator connection (420 kHz typical).","terms":["crystal"]}
```

### 38:158 — heathkit.js tl851 pin 12 (log line 1011)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

TI TL851 pp1-2 namesXTAL1/2 resonator nodes,without defining both ordinary inputs. Neutral direction removes unsupported assertion.

Log source locator: TI TL851 pp. 1-5.

Actual NEW record (with parent source/layout context):
```json
{"n":12,"name":"XTAL2","type":"clock","dir":"-","desc":"Ceramic resonator connection.","terms":["crystal"]}
```

### 38:205 — acorn.js cpu65sc12 (log line 1012)

**CORRECT**. Change needed: Yes. Actual scoped record changed: True.

WDC pp9-13/pin diagram provesVPB/MLB outputs andBE-high operation; Master supply table lists65SC12 ground1/5/21. Conditional board-check note supported. Replacement/modern entry still present despite log dashes.

Log source locator: WDC W65C02S pp. 9-13, Fig. 3-1.

Actual NEW record (with parent source/layout context):
```json
{"replacements":[{"part":"WDC W65C02S","kind":"modern","note":"Still made and runs the 65C02 instructions, but pins 1 (VPB) and 5 (MLB) are outputs and pin 36 (BE) must be HIGH. The 65SC12 has VSS on pins 1 and 5: check how the Master board wires pins 1, 5 and 36 before fitting one.","source":{"label":"WDC W65C02S data sheet, pin functions, pp. 9-13","url":"https://www.westerndesigncenter.com/wdc/documentation/w65c02s.pdf#page=9"}}]}
```

### 38:206 — tandy.js model4 scope CPU clock (log line 1013)

**UNPROVEN**. Change needed: Yes. Actual scoped record changed: True.

Zilog PDF33 printed37 proves0.45VLOW/VCC-0.6VHIGH; label correction right. Model4 TRM PDF31 prints4.05404MHz but20.2752MHz/5 implies4.05504: source inconsistency needs disclosure. Sams5Vpp U9-13 claim not yet directly verified.

Log source locator: Zilog PS0178 PDF p. 33 (printed p. 37), DC characteristics.

Actual NEW record (with parent source/layout context):
```json
{"f":"4.05504 MHz","low":"0.45 V","high":"4.4 V","shape":"square","basis":"datasheet","source":{"label":"Zilog PS0178 Z80 CPU Product Specification, DC Characteristics (Z8400 NMOS), clock input levels, p. 37 (PDF p. 33)","url":"https://www.zilog.com/docs/z80/ps0178.pdf#page=33"},"note":"Levels are the Z80 clock input limits (LOW under 0.45 V, HIGH over Vcc - 0.6 V), not a capture. Frequency from the Model 4 technical reference (2.02752 or 4.05504 MHz, in this page's sources); 2.02752 MHz in Model III mode. Sams CSCS13 shows PCLK at U9-13 on the gate-array board at 5 V p-p."}
```

### additional:cpu6808:8 — heathkit.js cpu6808 pin 8 (log line additional fb-5)

**WRONG**. Change needed: No; dangerous introduced error. Actual scoped record changed: True.

MotorolaDS9818-R3 PDF1 explicitly labelsVCC8 andVSS1/21. Restore8 VCC,typepower,+5V. Old data was right; grounding8 could short supply.

Log source locator: Motorola DS9818-R3 p.1.

Actual NEW record (with parent source/layout context):
```json
{"n":8,"name":"GND","type":"ground","dir":"-","desc":"Ground.","terms":["vcc"]}
```


## Findings, ordered by severity

1. **HIGH — Additional fb-5 correction grounds a supply pin.** src/data/heathkit.js:79 changes MC6808 pin 8 from VCC/power to GND/ground. Motorola DS9818-R3 p. 1 explicitly shows VCC at 8 and VSS at 1 and 21. Restore VCC, power, +5 V supply. The old value was right; the change was unnecessary and can make a technician short the supply. [Direct page render](fb-5/6808-p1.png). Principle: prove-it-works.

2. **HIGH — ADC serial-data probe goes to the clock pin.** Row 37:216, src/data/heathkit.js:473, retains U215 PB4 as the ADC0831 data input. HERO Jr TM printed p. 22 / PDF 24 sends U306 DO pin 6 to U215 pin 15. Motorola MC6821 p. 1 identifies pin 15 as PB5 and pin 14 as PB4. PB4 is the ADC clock. Correct the description to PB5; the verify flag does not fix the wrong pin. [Heath page](fb-5/jrtm-p24.png), [PIA pin assignment](fb-5/6821-p1.png). Principle: prove-it-works; fix-root-causes.

3. **HIGH — Dragon 64 reset advice uses Dragon 32 parts.** Row 31:3, src/data/dragon.js:419, has C23 1µF / R15 100k for both machines. CD41505 sheet 2 shows the Dragon 64 reset circuit around C55 33µF, R17 100k, D9/D19/D20 and CPU pin 37. C23/R15 belongs to the Dragon 32 SA2120 circuit. Split the machine-specific references. [Dragon 64 drawing](fb-5/d64cpu.gif), [enlarged detail](fb-5/d64cpu-detail.png). Principle: fix-root-causes.

4. **MEDIUM — PCjr diagnostic branch skips decision gates.** Row 34:169, src/data/ibm.js:1498, compresses a failed beep into removing the expansion, disconnecting internals, then the system board. HMS PDF 58 requires another advanced POST after expansion removal; PDF 61 tests again after internal disconnections; PDF 62-64 then checks transformer/power-board outputs. Preserve the conditional retests and power checks before condemning the system board. [Power-board test](fb-5/jrhms-p63.png). Principle: fix-root-causes.

5. **MEDIUM — Claimed Dragon service order is reversed.** Row 31:4, src/data/dragon.js:424, says CPU before ROMs while claiming the Dragon 32 service order. Service Information PDF 2 orders IC15, IC17, IC18, IC19, RAM: SAM, ROMs, CPU, RAM. A verify flag is insufficient for a known contradiction. [Service page](fb-5/dsvc-p2.png). Principle: prove-it-works.

6. **MEDIUM — AMSGateArray note presents withdrawn limitations as current.** Row 32:1, src/data/amstrad.js:281, repeats vsync/CAS timing-glitch and irqack-loop warnings. Both paragraphs are struck through in the author's current README. Remove or label them as historical; do not present deleted author statements as current evidence. [Retrieved README](fb-5/amsreadme.html), [primary repository](https://github.com/codedchip/AMSGateArray). Principle: prove-it-works.

7. **MEDIUM — 28 items remain unproven, including claims moved into another field.** Detailed decisions above distinguish honest verify flags from unflagged diagnoses. In particular, SC-01 HERO 1 MCX/MCRC, CB-open and AF/AO-short claims were removed from pin descriptions but reappear in the expanded chip summary; the cited TM prose does not establish those exact connections. Dragon 32's new categorical shorted-load diagnosis is also unsupported. Model 4 TRM PDF 31 prints 4.05404MHz while 20.2752MHz / 5 implies 4.05504MHz; the source discrepancy is not disclosed. Resolve or remove these specifics before claiming complete source proof. Principles: prove-it-works; fix-root-causes.

8. **LOW — Four logged removals did not occur.** Rows 32:1, 37:2, 37:75 and 38:205 show replacement/claim dashes, but the actual arrays retain AMSGateArray, AT28C64B, SC-01 Emulator and WDC W65C02S with kind modern. Only notes changed. This is a log-to-diff discrepancy, not a claim that every retained conditional replacement note is electrically wrong. Correct the log or perform the intended removal. Principle: prove-it-works.

The evaluated current data was collected again at the end and compared byte-for-byte with the first evaluated snapshot: identical. Review artifacts are the only writes made by this reviewer. No commit was made. Principle: serialize-shared-state-mutations.
