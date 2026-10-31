# HERO 1 connector re-verification from the open ET-18 drawings — 2026-10-31

Scope: all 307 pins in `RCS.connectors.hero1` (`src/data/heathkit.js`). The aim was to replace the restricted lending book
"HERO 1 Advanced Programming and Interfacing" (archive.org/details/hero1advancedpro0000robi) with open Heathkit drawings.
The book stays as a secondary source.

## Sources used

All from https://archive.org/details/heathkit-hero-1-ET-18 (download form `https://archive.org/download/heathkit-hero-1-ET-18/<file>`).
Scans have no text layer; pages were rendered at 200-300 dpi and read as images, with nets traced on the 300 dpi render where needed.

| File | What it covered |
|---|---|
| ET-18 Schematics sheet 1 of 4 (sense, sonar rx, sonar tx, teaching pendant).pdf, p. 1 | Pendant P901: SW903 L/R, U901 rotary code, trigger |
| ET-18 Schematics sheet 2 of 4 (arm drive, cpu, charger).pdf, p. 1 | CPU board P401-P408, charger plug (printed P101) |
| ET-18 Schematics sheet 3 of 4 (io, main drive, power supply).pdf, p. 1 | I/O board P304-P317 (P304 = P404 mate, P305 = P405 mate), power supply P201/P202 |
| ET-18 Schematics sheet 4 of 4 (display, motion).pdf, p. 1 | Display board P1201 |
| ET-18 Robot Technical Manual ET-18A Errata 1.pdf, PDF pp. 1-10 | Notice 591-4163; replacement CPU and display sections (PDF p. 9); replacement block/interconnect section (PDF p. 10) |
| ET-18 Robot Technical Manual ET-18A Errata 2.pdf, PDF pp. 1-2 | Notice 591-4238; replacement motion board X-ray and schematic |
| ET-18 Robot Block Interconnect Diagram.pdf, p. 1 | Wiring overview (the Errata 1 replacement section was used where they overlap) |
| ET-18 Robot Illustration Booklet - Speech Accessory Board sheet 2-3.pdf, p. 1 | Speech board P501/P502 |
| ET-18 Schematic of the motion circuit board.pdf, X-Ray View of Motion Circuit Board.pdf | Checked; no HERO 1 connector record uses them (motion board P1401 is not in the data) |

## Pin table

Verdicts: PROVEN = the open drawing shows the same pin with the same signal (`verify` removed). CORRECTED = the drawing
disagrees and the value was changed. CONFLICT = the open drawings disagree with each other or with the data; data kept,
`conflict` note added, `verify` kept. STILL UNVERIFIED = no open drawing shows the pin; `verify` kept.
"Errata 1 PDF p. 10 (block diagram)" is the replacement Block/Interconnect section (printed page 9 of 9).

| Connector | Pin | Our value | Drawing reading | Verdict | Source (file, page) |
|---|---|---|---|---|---|
| charger | 1 | GND | P2 pin 1 BLACK (charger GND), jumper to 4; robot side to P202-24 | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 2 | LOGIC BATT + | robot P2 pin 2 to F1 (logic battery) | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 3 | LOGIC CHG OUT | robot P2 pin 3 BRN to P202-15 | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 4 | CHG GND | robot P2 pin 4 BLK to P202-13; plug jumper 1-4 | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 5 | MOTOR CHG OUT | robot P2 pin 5 YEL to P202-22 | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 6 | MOTOR BATT + | robot P2 pin 6 via F2 (motor battery) | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 7 | NC | NC | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 8 | CHG IN (LOGIC) | robot P2 pin 8 ORG to P202-14; plug jumper 8-9 | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 9 | CHG IN (MOTOR) | plug pin 9 WHITE/RED +25 V; robot P2 pin 9 RED to P202-23 | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 10 | NC | NC | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 11 | NC | NC | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| charger | 12 | NC | NC | PROVEN | Schematics sheet 2 of 4, p. 1 (charger, P101/P2 wire side); Errata 1 PDF p. 10 (block diagram) |
| p201 | 1 | LOGIC GND | LOGIC GND | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 2 | LOW LOGIC BATT | LOW LOGIC BATT | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 3 | LOGIC BATT + | LOGIC BATT + | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 4 | +5V | +5V (joined to 5) | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 5 | +5V | +5V | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 6 | CHIP SHUTOFF | CHIP SHUTOFF (block: +5V SHUT-OFF) | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 7 | LOGIC GND | LOGIC GND | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 8 | LOGIC GND | LOGIC GND | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 9 | LOGIC GND | LOGIC GND | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 10 | MOTOR BATT + | MOTOR BATT + | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 11 | LOW MOTOR BATT | LOW MOTOR BATT | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p201 | 12 | MOTOR GND | MOTOR GND | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 13 | CHG GND | CHG GND | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 14 | LOGIC REG IN | ORG into U201 IN | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 15 | LOGIC REG OUT | BLU, to charger plug jumper, from D201 (logic reg out) | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 16 | LOGIC BATT | sheet 3: 16-17 joined "to ON/OFF switch and logic batteries", 15-16 bracketed "to charger plug jumper"; block diagram: 16 GRN to SW2 | CONFLICT | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 17 | LOGIC BATT | LOGIC BATT | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 18 | GND | GND | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 19 | GND | GND | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 20 | +12V STEERING | 20-21 "to ON/OFF switch and motor batteries"; block: +12V for steering motor | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 21 | MOTOR BATT | MOTOR BATT | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 22 | MOTOR REG OUT | YEL, to charger plug jumper, from D205 (motor reg out) | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 23 | MOTOR REG IN | into U204 IN | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p202 | 24 | GND | GND | PROVEN | Schematics sheet 3 of 4, p. 1 (power supply); Errata 1 PDF p. 10 (block diagram) |
| p401 | 1 | RESET | to reset timing node D403/C428/U425B | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p401 | 2 | /D0 | D0 through inverter U424B | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p401 | 3 | BA0 | BA0 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p401 | 4 | BA1 | BA1 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p401 | 5 | BA2 | BA2 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p401 | 6 | DISPLAY POWER (type power) -> DISPLAY POWER | from P405-58; logic enable to Q1202 | CORRECTED | Schematics sheet 2 of 4, p. 1 |
| p401 | 7 | BA4 | BA4 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p401 | 8 | BA5 | BA5 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p401 | 9 | BA6 | BA6 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p401 | 10 | /DISP SEL | from address-decoder OR gate U414A | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 11 | ROW | into keypad buffer U420 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 12 | ROW | ROW | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 13 | ROW | ROW | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 14 | ROW | ROW | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 15 | ROW | ROW | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 16 | ROW | ROW | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 17 | +5V | +5 VCC (17-18 joined) | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 18 | +5V | +5V | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 19 | GND | ground (19-20 joined) | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p402 | 20 | GND | GND | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p1201 | 1 | +5V IN | into Q1201 with C1201; voltage not printed | STILL UNVERIFIED | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 2 | +5V IN | into Q1201 with C1201; voltage not printed | STILL UNVERIFIED | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 3 | GND | GND | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 4 | GND | GND | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 5 | A2 | A2 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 6 | A1 | A1 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 7 | A0 | A0 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 8 | DISPLAY POWER | DISPLAY POWER | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 9 | NC | NC | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 10 | RESET | RESET | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 11 | RESET | RESET | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 12 | GND | GND | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 13 | +5V | +5V on the +5V SOURCE rail | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 14 | NC | NC | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 15 | D4 | D4 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 16 | D3 | D3 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 17 | D2 | D2 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 18 | D5 | D5 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 19 | D1 | D1 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 20 | D0 | D0 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 21 | /D0 | /D0 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 22 | A5 | A5 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 23 | A6 | A6 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 24 | SELECT | unlabelled, to U1208 pin 12 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p1201 | 25 | A4 | A4 | PROVEN | Schematics sheet 4 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p403 | 21 | +5V | +5V | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p403 | 22 | +5V | +5V | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p403 | 23 | /ABORT | P403 TO ABORT SWITCH, into U425A (NMI) | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p403 | 24 | /R/W | TO EXP. BOARD, U424A output (R/W inverted) | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p403 | 25 | E | E via U424C/U423D; crystal/4 rate not on the drawing | STILL UNVERIFIED | Schematics sheet 2 of 4, p. 1 |
| p403 | 26 | GND | CASSETTE TAPE INPUT, to ground | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p403 | 27 | TAPE IN | CASSETTE TAPE INPUT, to R403/U425D | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p403 | 28 | /EXP IRQ | TO EXP. BOARD, into interrupt status register | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p403 | 29 | GND | GND | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p403 | 30 | GND | GND | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p404 | 31 | SONAR RESET | ULTRASONIC RANGE TIMING | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 32 | /SONAR IRQ | TO CPU IRQ (sonar gate U323B) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 33 | MOTION IRQ | MOTION DETECT | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 34 | LOW MOTOR IRQ | LOW DRIVE DETECT | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 35 | LOW LOGIC IRQ | low logic detect U324B | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 36 | RTC IRQ | RTC data line (U314 pin 2 / MSM5832) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 37 | PENDANT IRQ | pendant TRIGGER (P313-187) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 38 | WHEEL IRQ | DRIVE WHEEL SENSE U325 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 39 | NC | not on either drawing | STILL UNVERIFIED | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 40 | SEL SONAR | U421 pin 14 -> U312 enable (sonar count) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 41 | SEL SENSE | U421 pin 13 -> U303 enable (sense) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 42 | SEL LIMITS | U421 pin 12 -> U302 enable (limits) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 43 | SEL PENDANT | U421 pin 11 -> U304 enable (pendant) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 44 | SEL EXP IN | U421 pin 10 -> U301 enable (exp in) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 45 | STB EXP OUT | clock of U305 (P308 exp out) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 46 | STB SPEECH | clock of U308 (P314 speech) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 47 | STB STEER/PIVOT | clock of U306 (P309) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 48 | STB GRIP/SHOULDER | clock of U309 (P315) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 49 | STB MAIN DRIVE | clock of U307 (P310) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 50 | STB ARM SEL | clock of U310 (P316) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 51 | STB POWER | clock of U311 (P317) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 52 | VSB | RAM SUPPLY VOLTAGE (VSB) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 53 | MEM PROTECT | MEMORY PROTECT | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p404 | 54 | SEL (U421 pin 9) | CPU: U421 pin 9 (now named SEL, type ctrl); I/O board: absent | CONFLICT | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P304) |
| p405 | 55 | +5V | +5 (VCC) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 56 | +5V | +5 (VCC) | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 57 | TAPE DIGITAL | from U425D; I/O: tied to P307-121 TAPE IN | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 58 | DISPLAY POWER (type power) -> DISPLAY POWER | to P401-6; I/O: U311 pin 12 (display bit), logic line | CORRECTED | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 59 | NC | not on either drawing | STILL UNVERIFIED | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 60 | R/W | R/W | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 61 | SEL RTC | CPU decoder U414B -> I/O RTC gates U320 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 62 | BD0 | BD0 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 63 | BD1 | BD1 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 64 | BD2 | BD2 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 65 | BD3 | BD3 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 66 | BD4 | BD4 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 67 | BD5 | BD5 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 68 | BD6 | BD6 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 69 | BD7 | BD7 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 70 | D0 | D0 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 71 | D1 | D1 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 72 | D2 | D2 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 73 | D3 | D3 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 74 | D4 | D4 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 75 | D5 | D5 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 76 | D6 | D6 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 77 | D7 | D7 | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p405 | 78 | GND | GND | PROVEN | Schematics sheet 2 of 4, p. 1; Schematics sheet 3 of 4, p. 1 (P305); Errata 1 PDF p. 9 (CPU and display sections) |
| p406 | 1 | /SEL 4000 | U403 pin 13 ($4000) | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p406 | 2 | /SEL 6000 | U403 pin 12 ($6000) | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p406 | 3 | BA7 | BA7 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p406 | 4 | BA6 | BA6 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p406 | 5 | BA5 | BA5 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p406 | 6 | BA4 | BA4 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p406 | 7 | BA3 | BA3 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p406 | 8 | BA2 | BA2 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p406 | 9 | BA1 | BA1 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p406 | 10 | BA0 | BA0 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p407 | 1 | RESET | RESET (CPU pin 40) | PROVEN | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p407 | 2 | R/W -> /R/W | U424A output (R/W inverted) | CORRECTED | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p407 | 3 | D0 -> D7 |  | CORRECTED | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p407 | 4 | D1 -> D6 |  | CORRECTED | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p407 | 5 | D2 -> D5 |  | CORRECTED | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p407 | 6 | D3 -> D4 |  | CORRECTED | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p407 | 7 | D4 -> D3 |  | CORRECTED | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p407 | 8 | D5 -> D2 |  | CORRECTED | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p407 | 9 | D6 -> D1 |  | CORRECTED | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p407 | 10 | D7 -> D0 |  | CORRECTED | Schematics sheet 2 of 4, p. 1; Errata 1 PDF p. 9 (CPU and display sections) |
| p408 | 1 | /SEL 8000 | U403 pin 11 ($8000) | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p408 | 2 | /SEL A000 | U403 pin 10 ($A000) | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p408 | 3 | BA15 | BA15 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p408 | 4 | BA14 | BA14 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p408 | 5 | BA13 | BA13 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p408 | 6 | BA12 | BA12 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p408 | 7 | BA11 | BA11 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p408 | 8 | BA10 | BA10 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p408 | 9 | BA9 | BA9 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p408 | 10 | BA8 | BA8 | PROVEN | Schematics sheet 2 of 4, p. 1 |
| p308 | 109 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p308 | 110 | NC | N.C. (printed "108") | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p308 | 111 | D7 | D7 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p308 | 112 | D6 | D6 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p308 | 113 | D5 | D5 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p308 | 114 | D4 | D4 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p308 | 115 | D3 | D3 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p308 | 116 | D2 | D2 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p308 | 117 | D1 | D1 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p308 | 118 | D0 | D0 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p306 | 129 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p306 | 130 | SLEEP SENSE | block: 130 SLEEP-P306 to U304 D1 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p306 | 131 | D7 | D7 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p306 | 132 | D6 | D6 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p306 | 133 | D5 | D5 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p306 | 134 | D4 | D4 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p306 | 135 | D3 | D3 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p306 | 136 | D2 | D2 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p306 | 137 | D1 | D1 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p306 | 138 | D0 | D0 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 119 | GND | ground | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 120 | +5V | +5V | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 121 | TAPE IN | TAPE IN (D7) | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 122 | STEER LIMIT CW | sheet 3: STEER LIMIT (D6); block: STEERING C.C.W. | CONFLICT | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 123 | ARM LIMIT UP | sheet 3: ARM LIMIT (UP); block: ARM DOWN | CONFLICT | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 124 | HEAD LIMIT CCW | HEAD LIMIT (D4); block: HEAD C.C.W. | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 125 | STEER LIMIT CCW | sheet 3: STEER LIMIT (D3); block: STEERING C.W. | CONFLICT | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 126 | ARM LIMIT DOWN | sheet 3: ARM LIMIT (DOWN); block: ARM UP | CONFLICT | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 127 | HEAD LIMIT CW | HEAD LIMIT (D1); block: HEAD C.W. | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p307 | 128 | SPEECH REQUEST | SPEECH (D0) | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p310 | 89 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p310 | 90 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p310 | 91 | FWD/REV | FWD/REV | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p310 | 92 | ON/OFF | ON/OFF | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p310 | 93 | SPEED D5 | SPEED D5 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p310 | 94 | SPEED D4 | SPEED D4 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p310 | 95 | SPEED D3 | SPEED D3 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p310 | 96 | SPEED D2 | SPEED D2 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p310 | 97 | SPEED D1 | SPEED D1 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p310 | 98 | SPEED D0 | SPEED D0 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 99 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 100 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 101 | STEER Q7 | STEER Q7 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 102 | STEER Q6 | STEER Q6 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 103 | STEER Q5 | STEER Q5 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 104 | STEER Q4 | STEER Q4 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 105 | PIVOT Q3 | PIVOT Q3 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 106 | PIVOT Q2 | PIVOT Q2 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 107 | PIVOT Q1 | PIVOT Q1 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p309 | 108 | PIVOT Q0 | PIVOT Q0 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 159 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 160 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 161 | EXT/HEAD Q7 | EXT/HEAD Q7 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 162 | EXT/HEAD Q6 | EXT/HEAD Q6 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 163 | EXT/HEAD Q5 | EXT/HEAD Q5 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 164 | EXT/HEAD Q4 | EXT/HEAD Q4 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 165 | GRIP/SHLDR Q3 | GRIP/SHLDR Q3 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 166 | GRIP/SHLDR Q2 | GRIP/SHLDR Q2 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 167 | GRIP/SHLDR Q1 | GRIP/SHLDR Q1 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p315 | 168 | GRIP/SHLDR Q0 | GRIP/SHLDR Q0 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p316 | 149 | GND | GND | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p316 | 150 | GND | GND | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p316 | 151 | +6V | +6 VOLTS | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p316 | 152 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p316 | 153 | +5V | +5V | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p316 | 154 | +5V | +5V | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p316 | 155 | SPARE | LIGHT/SOUND (U310 pin 12) | CONFLICT | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p316 | 156 | SPEECH STROBE | SPEECH STROBE | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p316 | 157 | ARM SEL A -> ARM SEL B | ARM SELECT (U310 Q6); block: to P701-19 ENABLE B | CORRECTED | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p316 | 158 | ARM SEL B -> ARM SEL A | ARM SELECT (U310 Q7); block: to P701-24 ENABLE A | CORRECTED | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 139 | LIGHT/SOUND SEL | LIGHT/SOUND SEL | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 140 | SLEEP CMD | U311 pin 16 drawn to it, labelled NC | CONFLICT | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 141 | SENSE PWR | SENSE | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 142 | NC | labelled NC, U311 pin 12 drawn to it | CONFLICT | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 143 | SPEECH PWR | SPEECH PWR | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 144 | MOTION PWR | MOTION PWR | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 145 | SONAR PWR | ULTRASONIC RANGING | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 146 | GND | GND | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 147 | GND | GND | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p317 | 148 | TAPE OUT | TAPE OUT | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p311 | 79 | SONAR RX | RECEIVE PULSE | PROVEN | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p311 | 80 | SONAR TX | TRANSMIT PULSE | PROVEN | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p311 | 81 | MOTION | to Q304 MOTION DETECT | PROVEN | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p311 | 82 | LOW DRIVE V | to Q303 LOW DRIVE DETECT | PROVEN | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p311 | 83 | LOW LOGIC V | to Q302 LOW LOGIC DETECT | PROVEN | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p311 | 84 | OPTO C | opto collector to U324A | PROVEN | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p311 | 85 | OPTO A | R305 270 ohm from +5V (LED anode) | PROVEN | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p311 | 86 | +12V | 12 VOLTS IN | PROVEN | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p311 | 87 | /SLEEP (active low) -> SLEEP SHUTOFF | TO POWER SUPPLY: Q301 collector, high during sleep | CORRECTED | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p311 | 88 | +12V | 12 VOLTS IN | PROVEN | Schematics sheet 3 of 4, p. 1; TM ET-18A PDF p. 93 (printed p. 81) |
| p312 | 189 | GND | GND | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p312 | 190 | +5V | +5V | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p312 | 191 | SENSE D7 | SENSE D7 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p312 | 192 | SENSE D6 | SENSE D6 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p312 | 193 | SENSE D5 | SENSE D5 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p312 | 194 | SENSE D4 | SENSE D4 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p312 | 195 | SENSE D3 | SENSE D3 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p312 | 196 | SENSE D2 | SENSE D2 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p312 | 197 | SENSE D1 | SENSE D1 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p312 | 198 | SENSE D0 | SENSE D0 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p313 | 179 | GND | GND | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p313 | 180 | +5V | +5V | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p313 | 181 | /BODY/ARM | block: D7 ARM/BASE | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p313 | 182 | ROTARY D2 | D6, pendant U901C (rotary) | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p313 | 183 | ROTARY D1 | D5, pendant U901B (rotary) | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p313 | 184 | ROTARY D0 | D4, pendant U901A (rotary) | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p313 | 185 | /RIGHT | D3 R/L; pendant D3 = SW903 R, pull-up R901 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p313 | 186 | /LEFT | D2; pendant D2 = SW903 L, pull-up R903 | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p313 | 187 | TRIGGER | TRIGGER | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p313 | 188 | NC | N.C. | PROVEN | Schematics sheet 3 of 4, p. 1; Errata 1 PDF p. 10 (block diagram); Schematics sheet 1 of 4, p. 1 (pendant) |
| p314 | 169 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p314 | 170 | NC | NC | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p314 | 171 | I2 | INFL (bit not traced) | STILL UNVERIFIED | Schematics sheet 3 of 4, p. 1 |
| p314 | 172 | I1 | INFL (bit not traced) | STILL UNVERIFIED | Schematics sheet 3 of 4, p. 1 |
| p314 | 173 | P5 | P5 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p314 | 174 | P4 | P4 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p314 | 175 | P3 | P3 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p314 | 176 | P2 | P2 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p314 | 177 | P1 | P1 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p314 | 178 | P0 | P0 | PROVEN | Schematics sheet 3 of 4, p. 1 |
| p501 | 1 | PITCH (D7) | PITCH (D7) | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 2 | PITCH (D6) | PITCH (D6) | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 3 | STROBE | STROBE | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 4 | REQUEST | REQUEST | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 5 | P5 (D5) | P5 (D5) | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 6 | P4 (D4) | P4 (D4) | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 7 | P3 (D3) | P3 (D3) | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 8 | P2 (D2) | P2 (D2) | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 9 | P1 (D1) | P1 (D1) | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 10 | P0 (D0) | P0 (D0) | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 11 | ON/OFF | ON/OFF (booklet); ENABLE (block) | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p501 | 12 | NC | NC | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1; Errata 1 PDF p. 10 (block diagram) |
| p502 | 13 | +12V | +12V | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1 |
| p502 | 14 | GND | GND | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1 |
| p502 | 15 | AUDIO OUT | AUDIO OUT | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1 |
| p502 | 16 | NC | NC | PROVEN | Illustration Booklet Speech Accessory Board sheet 2-3, p. 1 |
| p1302 | 9 | /ABORT | no drawing | STILL UNVERIFIED | none (TM text only) |
| p1304 | 10 | /SLEEP | no drawing | STILL UNVERIFIED | none (TM text only) |

## Changes

| Connector | Pin | Old -> new | Source |
|---|---|---|---|
| hero1-p407 | 2 | `R/W` (unbuffered R/W) -> `/R/W` (R/W inverted by U424A; same net as P403-24) | Schematics sheet 2; Errata 1 PDF p. 9 |
| hero1-p407 | 3-10 | D0-D7 (order assumed) -> D7-D0 (pin 3 = D7, pin 10 = D0) | Schematics sheet 2; Errata 1 PDF p. 9 |
| hero1-p405 | 62-69 | `BD` (order not given) -> BD0-BD7 | Schematics sheet 2 (pin labels) |
| hero1-p405 | 70-77 | `D` (order not given) -> D0-D7 | Schematics sheet 2; sheet 3 P305 |
| hero1-p314 | 173-178 | P5-P0 with a "renumbered" conflict -> P5-P0 proven (U308 Q5-Q0), conflict removed | Schematics sheet 3 |
| hero1-charger | name, summary | charger plug P101 -> P2 | Errata 1 PDF p. 2 |
| hero1-p401, p406, p408, p313 | summary | "order assumed" text replaced by what the drawings show | Schematics sheets 1-3 |

Connector-level `verify` removed (every pin proven or corrected): charger, P201, P401, P402, P403, P406, P407, P408, P308,
P306, P310, P309, P315, P311, P312, P313, P501, P502. Kept on P202, P1201, P404, P405, P307, P316, P317, P314, P1302, P1304
and the experimental board.

## Conflicts

- P202 pin 16 (unchanged): sheet 3 brackets 15-16 as "to charger plug jumper" and joins 16-17 "to ON/OFF switch and logic batteries"; the block diagram runs SW2 to 16.
- P404 pin 54: the CPU schematic wires it to decoder U421 pin 9; the I/O board drawing has no pin 54; the book says NC.
- P307 pins 122, 123, 125, 126: sheet 3 labels 123 ARM LIMIT (UP) and 126 ARM LIMIT (DOWN), no steering direction; the TM port map (printed p. 120) agrees with our data (122 STEER CW, 123 ARM UP, 125 STEER CCW, 126 ARM DOWN); the Errata 1 block diagram gives 122 STEERING CCW, 123 ARM DOWN, 125 STEERING CW, 126 ARM UP.
- P316 pin 155: sheet 3 labels it LIGHT/SOUND; the TM port map and the book give $C2C0 bit 4 as spare (light/sound select is P317-139).
- P317 pin 140: sheet 3 draws U311 pin 16 (sleep bit) to it but labels it NC; the block diagram shows no wire.

## Still unverified

P404-39 and P405-59 (on neither drawing); P1201-1 and -2 (the drawing shows the supply into Q1201 but prints no voltage);
P314-171 and -172 (both INFL; which is I1 and which I2 was not traced through the pitch drivers); P1302-9 and P1304-10
(TM text only; no open drawing shows the experimental-board plugs).

## Errata

Applied to HERO 1 records:
- Errata 1 PDF p. 2 (schematic part 2): on the charger schematic change P101 to P2. Applied to `hero1-charger` (name, summary, verifiedAgainst, sources).
- Errata 1 PDF p. 5 (diode chart, page 4 of 9): D1-D4 are 3A1 diodes; factory-assembled robots use one 8129 bridge (Heath 5-88). Added to the charger note in `power.hero1.supply.notes` and `power.hero1.sources`.
- Errata 2 PDF p. 2 (replacement motion board schematic): U1401 is a 78L08 8 V regulator fed from +12 V. `+8 V motion` rail note updated and its `verify` cleared; source added to `power.hero1.sources`.
- Errata 1 PDF p. 9 (replacement CPU and display sections): used as a source for P407, P405 and P1201 (no value it changed was in our data).
- Errata 1 PDF p. 10 (replacement block/interconnect section): used as a source for the charger, P201, P202, P306, P307, P313, P501.

Not affecting our data (one line each):
- Errata 1 PDF p. 1: Figure 4 inset replaced; wire between motor batteries B1 and B2 RED -> GRN (wire colour, not in our data).
- Errata 1 PDF p. 1/4: new Figure 8B (arm, P1502).
- Errata 1 PDF p. 1/5: new diode chart (D202/D206 1N5232B, D707-D719, etc.; only the D1-D4 bridge note applied).
- Errata 1 PDF p. 1: parts list p. 87 delete U1101 CA3035V1; p. 90 new IC drawing (CA3130 for U1101, U1102); p. 93 U1102 -> U1103.
- Errata 1 PDF p. 1: parts list p. 105 R618 47 ohm -> 10 ohm, R633 2 Mohm -> 500 kohm control; add C616 10 uF, D601, D602 (sense board).
- Errata 1 PDF p. 2: sense schematic R633 2M -> 1M (disagrees with the parts list 500 k; neither part is in our data), R618 47 -> 10.
- Errata 1 PDF p. 1/6: new page 108 parts list (remote control unit, sonar receive board).
- Errata 1 PDF p. 2: parts list p. 109 R1202 and C1202 not used; display X-ray: cross out C1202, D1201, R1202 (none in our data).
- Errata 1 PDF p. 2: CPU schematic ROM #1 range E000-FFFC -> E000-FFFF (our data already says $E000-$FFFF).
- Errata 1 PDF p. 2/7-8: new sense board upper-left section and X-ray, sonar receive schematic and X-ray (P602 pin 21 clock and 23 ENABLE agree with our ADC clock entry).
- Errata 2 PDF p. 1: parts list p. 110 add R1424 470 kohm; new motion board X-ray.

## Totals (after review round 1)

| Verdict | Pins |
|---|---|
| PROVEN | 275 |
| CORRECTED | 14 |
| CONFLICT | 9 |
| STILL UNVERIFIED | 9 |
| Total | 307 |

Validation: `node scripts/validate-data.mjs heathkit` and `node scripts/validate-data.mjs` both end `0 FAIL`.

## Review round 1

A Codex reviewer re-read every pin (report `.tmp/review-hero1/review-out/report.md`, ledger `ledger.md`). The coordinator
set aside P402-18 and P501-3 (errors planted in the review copy only; the real data is +5V and STROBE) and P310-91/92
(sheet 3 shows 91 SELECT FWD/REV, 92 ON/OFF, as the data has). Every other WRONG or UNPROVABLE row was checked against the cited page.

| Finding | Action | Source |
|---|---|---|
| P311-87 `/SLEEP`, "active low" (WRONG) | Agreed. Renamed `SLEEP SHUTOFF`: Q301 collector, high for the sleep period, low normally. CORRECTED | Sheet 3 (U321 pin 7 -> R321 -> Q301, pull-up R322); TM ET-18A PDF p. 93, printed p. 81 |
| P401-6, P405-58 type `power` (WRONG) | Agreed: a logic enable to Q1202, not a supply. Type -> `ctrl`. CORRECTED | Sheets 2, 3, 4 |
| P404-54 named NC, type nc (WRONG) | Agreed for the CPU side. Renamed `SEL (U421 pin 9)`, type `ctrl`; `verify` and conflict (book NC, no I/O pin 54) kept. CONFLICT | Sheet 2; sheet 3 |
| P316-155 type nc (WRONG) | Agreed: U310 pin 12 drives it. Type -> `ctrl`; name SPARE, `verify` and the LIGHT/SOUND conflict kept. CONFLICT | Sheet 3; TM PDF p. 132 port map |
| P316-157/158 A/B swapped (WRONG) | Agreed: the block diagram runs 158 to P701-24 ENABLE A and 157 to P701-19 ENABLE B. Swapped names; function groups attributed to the TM port map. CORRECTED | Errata 1 PDF p. 10; sheet 3; TM PDF p. 132 |
| P317-142 NC though drawn to U311 (UNPROVABLE) | Agreed: the display bit (U311 pin 12) is drawn to it. `verify` and a conflict note added. CONFLICT | Sheet 3; Errata 1 PDF p. 10 |
| P404-36 1024 Hz claim (UNPROVABLE) | Agreed. Removed the 1024 Hz clause; desc now states the drawn net (U314 pin 2 clock data node to the interrupt status register). PROVEN | Sheets 2, 3 |
| P404-50 "light/sound select" (UNPROVABLE) | Agreed. Desc now says "bit 4 (see P316 pin 155)". PROVEN | Sheet 3 |
| P403-25 expect crystal/4 (UNPROVABLE) | Agreed: the rate is not on the drawing. Kept the expect, added `verify: true`. STILL UNVERIFIED | Sheet 2 |
| P309-101..108, P315-161..168 phase ordinals (UNPROVABLE) | Agreed. Renamed to the drawn latch bits (`STEER Q7`..`PIVOT Q0`, `EXT/HEAD Q7`..`GRIP/SHLDR Q0`); the book's phase number kept only as an attributed note. PROVEN | Sheet 3 |
| P501-1/2 I2/I1 aliases (UNPROVABLE) | Agreed. Removed the Votrax alias clause; SC-01A pin numbers stay (drawn). PROVEN | Speech Accessory Board sheet 2-3 |
| P314-171/172 I2/I1 (UNPROVABLE) | Already `verify: true`; unchanged. STILL UNVERIFIED | Sheet 3 |
| P1302-9, P1304-10 (UNPROVABLE) | Agreed: TM text only. Pin-level `verify: true` added. STILL UNVERIFIED | TM ET-18A PDF p. 94 |
| P1201-1/2, P404-39, P405-59 (UNPROVABLE) | Already `verify: true`; unchanged. STILL UNVERIFIED | Sheets 2, 3, 4 |
| P307-122/123/125/126, P317-140 (UNPROVABLE) | Already `verify: true` with conflict notes the reviewer called fair; unchanged. CONFLICT | Sheet 3; Errata 1 PDF p. 10 |

Every pin the review flagged that is not proven from an open drawing now carries `verify: true` (17 pins in total).
`node scripts/validate-data.mjs heathkit` and `node scripts/validate-data.mjs` end `0 FAIL`.
