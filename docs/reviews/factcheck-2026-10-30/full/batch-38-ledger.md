# batch-38 fact-check ledger

Scope: all 245 input items; no sampling. Decisions apply to batch-38.json. A row is UNVERIFIABLE when even one substantive claim lacks source support; confirmed portions are identified in evidence. No unavailable source is treated as confirmation.

Checkout HEAD: 4b85bd0f9db87697ff43cd3bc8b03237f00a3a16. Batch items 0 and 1 differ from checkout acorn.js lines 1093/1095: the checkout already has the correct LM324 names. No data files were modified.

Method: downloaded each distinct cited document to batch-38/. Initial curl -L -A Mozilla/5.0 failed for HTTPS because local Schannel could not acquire credentials; requests with the same User-Agent retrieved them. All 35 cited URLs returned HTTP 200. PDF text extracted with pdftotext -layout; scanned pin diagrams and schematics rendered with pdftoppm at 110 dpi and visually inspected. Sather full OCR was retrieved through the same Internet Archive item; archive metadata and OCR are retained. Manifest records URLs/status.

Principles: prove-it-works applies throughout; fix-root-causes applies to contradictory pin labels and probe rules. serialize-shared-state-mutations has no factual application in this read-only review.

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | lm324 / chip-pin | pin 1 1IN+ | WRONG | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | DIP pin 1 is 1OUT, amplifier 1 output. Batch label 1IN+ is wrong; description and output direction are correct. Checkout acorn.js:1093 already says 1OUT. Severity high; principle prove-it-works / fix-root-causes. |
| 1 | lm324 / chip-pin | pin 3 1OUT | WRONG | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | DIP pin 3 is 1IN+, amplifier 1 positive input. Batch label 1OUT is wrong; description and input direction are correct. Checkout acorn.js:1095 already says 1IN+. Severity high; principle prove-it-works / fix-root-causes. |
| 2 | lm324 / chip-pin | pin 5 2IN+ | CONFIRMED | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | Pin 5 is amplifier 2 positive input (2IN+). |
| 3 | lm324 / chip-pin | pin 6 2IN- | CONFIRMED | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | Pin 6 is amplifier 2 negative input (2IN-). |
| 4 | lm324 / chip-pin | pin 7 2OUT | CONFIRMED | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | Pin 7 is amplifier 2 output (2OUT). |
| 5 | lm324 / chip-pin | pin 8 3OUT | CONFIRMED | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | Pin 8 is amplifier 3 output (3OUT). |
| 6 | lm324 / chip-pin | pin 9 3IN- | CONFIRMED | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | Pin 9 is amplifier 3 negative input (3IN-). |
| 7 | lm324 / chip-pin | pin 10 3IN+ | CONFIRMED | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | Pin 10 is amplifier 3 positive input (3IN+). |
| 8 | lm324 / chip-pin | pin 12 4IN+ | CONFIRMED | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | Pin 12 is amplifier 4 positive input (4IN+). |
| 9 | lm324 / chip-pin | pin 13 4IN- | CONFIRMED | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | Pin 13 is amplifier 4 negative input (4IN-). |
| 10 | lm324 / chip-pin | pin 14 4OUT | CONFIRMED | TI LM324 p. 3, Fig. 5-1 / Table 5-1 | Pin 14 is amplifier 4 output (4OUT). |
| 11 | ls323 / chip-pin | pin 1 S0 | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | S0 input is pin 1; C3 select is driven by the P6 command outputs. |
| 12 | ls323 / chip-pin | pin 2 /G1 | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Active-low G1 is pin 2, wired to slot DEV pin 41; Sather command decoding gives C0E0-C0EF for slot 6. |
| 13 | ls323 / chip-pin | pin 3 /G2 | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Active-low G2 is pin 3, wired to slot A0 pin 2. Both enables must be low: reads at even addresses. |
| 14 | ls323 / chip-pin | pin 4 G/QG | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 4 is G/QG, bidirectional parallel bit, connected to slot data bus. |
| 15 | ls323 / chip-pin | pin 5 E/QE | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 5 is E/QE, bidirectional parallel bit, connected to slot data bus. |
| 16 | ls323 / chip-pin | pin 7 A/QA | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 7 is A/QA, bidirectional parallel bit, connected to slot data bus. |
| 17 | ls323 / chip-pin | pin 8 QA' | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 8 is dedicated QA serial output, routed to P6 A1. |
| 18 | ls323 / chip-pin | pin 9 /CLR | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 9 is active-low synchronous clear; TI specifies clearing on next rising clock; P6 supplies command. |
| 19 | ls323 / chip-pin | pin 11 SR | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 11 is SR input, wired to ribbon W PROT pin 20. Sather p. 9-9 establishes HIGH for protected disk on enabled drive. |
| 20 | ls323 / chip-pin | pin 12 CLK | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 12 is clock; Q3 reaches C3 through A2 LS132, gated by DRIVE ON. Sather describes sequencer as approximately 2 MHz. |
| 21 | ls323 / chip-pin | pin 13 B/QB | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 13 is B/QB, bidirectional parallel bit on data bus. |
| 22 | ls323 / chip-pin | pin 14 D/QD | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 14 is D/QD, bidirectional parallel bit on data bus. |
| 23 | ls323 / chip-pin | pin 15 F/QF | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 15 is F/QF, bidirectional parallel bit on data bus. |
| 24 | ls323 / chip-pin | pin 16 H/QH | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 16 is H/QH, bidirectional parallel bit on data bus. |
| 25 | ls323 / chip-pin | pin 17 QH' | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 17 is dedicated QH serial output; no connection drawn on Apple C3. |
| 26 | ls323 / chip-pin | pin 18 SL | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 18 is SL input, supplied by P6 command logic. |
| 27 | ls323 / chip-pin | pin 19 S1 | CONFIRMED | TI LS323 p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14, 9-16 | Pin 19 is S1 input, supplied by P6 command logic. |
| 28 | ttl7406 / chip-pin | pin 1 1A | CONFIRMED | TI SN7406 p. 1 | 1A is input pin 1. |
| 29 | ttl7406 / chip-pin | pin 2 1Y | CONFIRMED | TI SN7406 p. 1 | 1Y is open-collector inverted output pin 2. |
| 30 | ttl7406 / chip-pin | pin 3 2A | CONFIRMED | TI SN7406 p. 1 | 2A is input pin 3. |
| 31 | ttl7406 / chip-pin | pin 5 3A | CONFIRMED | TI SN7406 p. 1 | 3A is input pin 5. |
| 32 | ttl7406 / chip-pin | pin 6 3Y | CONFIRMED | TI SN7406 p. 1 | 3Y is open-collector inverted output pin 6. |
| 33 | ttl7406 / chip-pin | pin 8 4Y | CONFIRMED | TI SN7406 p. 1 | 4Y is open-collector inverted output pin 8. |
| 34 | ttl7406 / chip-pin | pin 9 4A | CONFIRMED | TI SN7406 p. 1 | 4A is input pin 9. |
| 35 | ttl7406 / chip-pin | pin 10 5Y | CONFIRMED | TI SN7406 p. 1 | 5Y is open-collector inverted output pin 10. |
| 36 | ttl7406 / chip-pin | pin 11 5A | CONFIRMED | TI SN7406 p. 1 | 5A is input pin 11. |
| 37 | ttl7406 / chip-pin | pin 12 6Y | CONFIRMED | TI SN7406 p. 1 | 6Y is open-collector inverted output pin 12. |
| 38 | ttl7406 / chip-pin | pin 13 6A | CONFIRMED | TI SN7406 p. 1 | 6A is input pin 13. |
| 39 | ls125 / replacement-modern | 74HCT125 | CONFIRMED | TI HCT125 pp. 3-5; Apple Technical Procedures p. 5.5 (PDF 57) | N-package pinout matches LS125. HCT input thresholds are TTL-compatible; supply absolute maximum is 7 V. Apple associates failed C4 with failed LS125; analog schematic places C4 on +12 V. +12 V is not a permissible HCT supply. |
| 40 | ttl7404 / chip-pin | pin 1 1A | CONFIRMED | TI SN74LS04 p. 1 | 1A input pin 1. |
| 41 | ttl7404 / chip-pin | pin 2 1Y | CONFIRMED | TI SN74LS04 p. 1 | 1Y inverter output pin 2. |
| 42 | ttl7404 / chip-pin | pin 3 2A | CONFIRMED | TI SN74LS04 p. 1 | 2A input pin 3. |
| 43 | ttl7404 / chip-pin | pin 4 2Y | CONFIRMED | TI SN74LS04 p. 1 | 2Y inverter output pin 4. |
| 44 | ttl7404 / chip-pin | pin 5 3A | CONFIRMED | TI SN74LS04 p. 1 | 3A input pin 5. |
| 45 | ttl7404 / chip-pin | pin 6 3Y | CONFIRMED | TI SN74LS04 p. 1 | 3Y inverter output pin 6. |
| 46 | ttl7404 / chip-pin | pin 8 4Y | CONFIRMED | TI SN74LS04 p. 1 | 4Y inverter output pin 8. |
| 47 | ttl7404 / chip-pin | pin 9 4A | CONFIRMED | TI SN74LS04 p. 1 | 4A input pin 9. |
| 48 | ttl7404 / chip-pin | pin 10 5Y | CONFIRMED | TI SN74LS04 p. 1 | 5Y inverter output pin 10. |
| 49 | ttl7404 / chip-pin | pin 13 6A | CONFIRMED | TI SN74LS04 p. 1 | 6A input pin 13. |
| 50 | ls125 / chip-pin | pin 1 /1G | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 1 is active-low gate-1 enable; connected to drive enable logic via ULN2003 buffers. |
| 51 | ls125 / chip-pin | pin 2 1A | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 2 is gate-1 input, joined to write-protect switch and R12 10K to +5. Other switch connection reaches phase 1. Open/protected switch gives HIGH. |
| 52 | ls125 / chip-pin | pin 3 1Y | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 3 gate-1 output is W PROT, ribbon pin 20. |
| 53 | ls125 / chip-pin | pin 4 /2G | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 4 is active-low gate-2 enable, connected to buffered write request at pin 8. |
| 54 | ls125 / chip-pin | pin 5 2A | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 5 gate-2 input is WR DATA from ribbon pin 18. |
| 55 | ls125 / chip-pin | pin 6 2Y | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 6 gate-2 output leads to CA3146 head-driver circuitry. |
| 56 | ls125 / chip-pin | pin 8 3Y | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 8 gate-3 output joins R16 1K pull-up, ULN2003 pin 7, and LS125 gate-2 enable. |
| 57 | ls125 / chip-pin | pin 9 3A | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 9 gate-3 input is WR REQ ribbon pin 10, with R15 1K pull-up; asserted LOW for write. |
| 58 | ls125 / chip-pin | pin 10 /3G | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 10 is active-low gate-3 enable. |
| 59 | ls125 / chip-pin | pin 11 4Y | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 11 gate-4 output goes to RD DATA ribbon pin 16 and TP1; rev H adds R13 15K pull-up. |
| 60 | ls125 / chip-pin | pin 12 4A | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 12 gate-4 input receives MC3470 read output. |
| 61 | ls125 / chip-pin | pin 13 /4G | CONFIRMED | TI LS125A p. 1; Apple 050-0007-H PDF p. 2 | Pin 13 active-low gate-4 enable shares the enabled-drive control. |
| 62 | ls138 / chip-pin | pin 1 A | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | A select input is pin 1; A is least significant select. |
| 63 | ls138 / chip-pin | pin 3 C | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | C select input is pin 3. |
| 64 | ls138 / chip-pin | pin 4 /G2A | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-low G2A enable is pin 4. |
| 65 | ls138 / chip-pin | pin 5 /G2B | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-low G2B enable is pin 5. |
| 66 | ls138 / chip-pin | pin 6 G1 | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-high G1 enable is pin 6. |
| 67 | ls138 / chip-pin | pin 7 /Y7 | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-low output Y7 is pin 7. |
| 68 | ls138 / chip-pin | pin 9 /Y6 | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-low Y6 is pin 9. |
| 69 | ls138 / chip-pin | pin 10 /Y5 | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-low Y5 is pin 10. |
| 70 | ls138 / chip-pin | pin 11 /Y4 | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-low Y4 is pin 11. |
| 71 | ls138 / chip-pin | pin 13 /Y2 | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-low Y2 is pin 13. |
| 72 | ls138 / chip-pin | pin 14 /Y1 | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-low Y1 is pin 14. |
| 73 | ls138 / chip-pin | pin 15 /Y0 | CONFIRMED | TI LS138 p. 1 (visually read N-package diagram) | Active-low Y0 is pin 15. |
| 74 | ttl74169 / chip-pin | pin 1 U/D | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | U/D input is pin 1; HIGH selects increment, LOW decrement. |
| 75 | ttl74169 / chip-pin | pin 3 A | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | A preset input is pin 3, least significant. |
| 76 | ttl74169 / chip-pin | pin 4 B | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | B preset input is pin 4. |
| 77 | ttl74169 / chip-pin | pin 5 C | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | C preset input is pin 5. |
| 78 | ttl74169 / chip-pin | pin 6 D | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | D preset input is pin 6, most significant. |
| 79 | ttl74169 / chip-pin | pin 7 /ENP | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | ENP active-low enable is pin 7; both ENP and ENT must be LOW to count. |
| 80 | ttl74169 / chip-pin | pin 9 /LOAD | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | LOAD active-low input is pin 9, preset synchronous at next rising clock. |
| 81 | ttl74169 / chip-pin | pin 10 /ENT | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | ENT active-low enable is pin 10; also gates carry output. |
| 82 | ttl74169 / chip-pin | pin 12 QC | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | QC output is pin 12. |
| 83 | ttl74169 / chip-pin | pin 13 QB | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | QB output is pin 13. |
| 84 | ttl74169 / chip-pin | pin 14 QA | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | QA least-significant output is pin 14. |
| 85 | ttl74169 / chip-pin | pin 15 /RCO | CONFIRMED | TI LS169B p. 1 (visually read diagram and description) | RCO active-low output is pin 15; enabled carry marks binary terminal count, up 15 / down 0. |
| 86 | ls174 / chip-pin | pin 1 /CLR | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 1 is asynchronous active-low clear, connected to drive-on circuitry. Sather states drives off clears sequencer flip-flops. |
| 87 | ls174 / chip-pin | pin 2 1Q | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 2 is 1Q; schematic Q0 returns to P6 A7 and write-data toggle path. |
| 88 | ls174 / chip-pin | pin 4 2D | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 4 is 2D; schematic D1 connected to P6 D6 pin 13. |
| 89 | ls174 / chip-pin | pin 5 2Q | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 5 is 2Q; schematic Q1 returns to P6 A6. |
| 90 | ls174 / chip-pin | pin 6 3D | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 6 is 3D; schematic D2 connected to P6 D4 pin 11. |
| 91 | ls174 / chip-pin | pin 9 CLK | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 9 is rising-edge clock, fed by gated Q3 through LS132. Sather describes approximately 2 MHz sequencer clock. |
| 92 | ls174 / chip-pin | pin 10 4Q | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 10 is 4Q; schematic Q3 is second latched read signal, to LS132 pulse logic and P6 A4. |
| 93 | ls174 / chip-pin | pin 11 4D | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 11 is 4D; schematic D3 comes from first read latch 5Q pin 12, forming second stage. |
| 94 | ls174 / chip-pin | pin 12 5Q | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 12 is 5Q; schematic Q4 is first read latch. |
| 95 | ls174 / chip-pin | pin 13 5D | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 13 is 5D; schematic D4 receives RD DATA ribbon pin 16. |
| 96 | ls174 / chip-pin | pin 14 6D | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 14 is 6D; schematic D5 receives P6 D5 pin 12. |
| 97 | ls174 / chip-pin | pin 15 6Q | CONFIRMED | TI LS174 p. 1; Apple 050-0005-01 PDF p. 2; Sather p. 9-14 | Pin 15 is 6Q; schematic Q5 returns to P6 A0. |
| 98 | ls259 / chip-pin | pin 1 S0 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 1 select S0 is wired to A1, slot pin 3. |
| 99 | ls259 / chip-pin | pin 2 S1 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 2 select S1 is wired to A2, slot pin 4. |
| 100 | ls259 / chip-pin | pin 3 S2 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 3 select S2 is wired to A3, slot pin 5. |
| 101 | ls259 / chip-pin | pin 4 Q0 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 4 Q0 reaches ribbon phase 0 pin 2; commands C080/C081,X clear/set phase 0. |
| 102 | ls259 / chip-pin | pin 5 Q1 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 5 Q1 reaches ribbon phase 1 pin 4; commands C082/C083,X. |
| 103 | ls259 / chip-pin | pin 6 Q2 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 6 Q2 reaches ribbon phase 2 pin 6; commands C084/C085,X. |
| 104 | ls259 / chip-pin | pin 7 Q3 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 7 Q3 reaches ribbon phase 3 pin 8; commands C086/C087,X. |
| 105 | ls259 / chip-pin | pin 9 Q4 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 9 Q4 motor command reaches LS05 then 556. C088/C089,X clear/set Q4; timer delays turn-off by one second. |
| 106 | ls259 / chip-pin | pin 10 Q5 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 10 Q5 selects drive enable: C08A,X drive 1 / C08B,X drive 2. |
| 107 | ls259 / chip-pin | pin 11 Q6 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 11 Q6 is connected to P6 A2; C08C/C08D,X select shift/read versus load/write-protect sense. |
| 108 | ls259 / chip-pin | pin 12 Q7 | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 12 Q7 is connected to P6 A3; C08E/C08F,X select read/write. |
| 109 | ls259 / chip-pin | pin 13 D | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 13 data D is A0 from slot pin 2, so even/odd addresses clear/set. |
| 110 | ls259 / chip-pin | pin 14 /G | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 14 active-low G is DEV from slot pin 41; slot-6 decode C0E0-C0EF. |
| 111 | ls259 / chip-pin | pin 15 /CLR | CONFIRMED | TI LS259B p. 1; Apple 050-0005-01 PDF p. 2; Sather pp. 9-12, 9-14 | Pin 15 active-low CLR is system RESET slot pin 31; Sather Table 9.1 specifies reset clears all switches. |
| 112 | ls-controller / chip-pin | pin 1 /G1 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 1 G1 is common IOE0R on U18/U19. Decode is read E0-FF region, with A1 separating buffers. |
| 113 | ls-controller / chip-pin | pin 3 A2 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 3 A2 (KiCad A1) on U19 connects controller-1 J5 pin 4; Y2 drives D1. Manual idle input check threshold is 2.2 V. |
| 114 | ls-controller / chip-pin | pin 4 A3 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 4 A3 (KiCad A2) on U19 connects J5 pin 2, down; Y3 drives D2. Idle threshold check 2.2 V. |
| 115 | ls-controller / chip-pin | pin 5 A4 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 5 A4 (KiCad A3) on U19 connects J5 pin 3, left; Y4 drives D3. Idle threshold check 2.2 V. |
| 116 | ls-controller / chip-pin | pin 6 A5 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 6 A5 on U19 connects spinner processing signal; output is D4. |
| 117 | ls-controller / chip-pin | pin 7 A6 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 7 A6 on U19 connects controller J5 pin 7; output is D5. |
| 118 | ls-controller / chip-pin | pin 8 A7 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 8 A7 on U19 connects controller J5 pin 6, fire; output is D6. Idle input check 2.2 V. |
| 119 | ls-controller / chip-pin | pin 9 A8 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 9 A8 on U19 and corresponding U18 input join common spinner interrupt-status network; U19 output is D7. |
| 120 | ls-controller / chip-pin | pin 11 Y8 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 11 Y8 drives D7 on U19 and D0 on U18. LS541 outputs are noninverting and tri-state. |
| 121 | ls-controller / chip-pin | pin 12 Y7 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 12 Y7 drives U19 D6 / U18 D1. |
| 122 | ls-controller / chip-pin | pin 13 Y6 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 13 Y6 drives U19 D5 / U18 D2. |
| 123 | ls-controller / chip-pin | pin 14 Y5 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 14 Y5 drives U19 D4 / U18 D3. |
| 124 | ls-controller / chip-pin | pin 16 Y3 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 16 Y3 drives U19 D2 / U18 D5. |
| 125 | ls-controller / chip-pin | pin 17 Y2 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 17 Y2 drives U19 D1 / U18 D6. |
| 126 | ls-controller / chip-pin | pin 19 /G2 | CONFIRMED | TI LS541 p. 1; Coleco redraw sheet 6; Technical Manual VIII-1 (PDF 78) | Pin 19 active-low G2: U19 receives A1 directly; U18 receives A1 inverted by U7A. FC selects port 1, FF port 2. |
| 127 | ttl7486 / chip-pin | pin 1 1A | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 1 A input pin 1. |
| 128 | ttl7486 / chip-pin | pin 2 1B | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 1 B input pin 2. |
| 129 | ttl7486 / chip-pin | pin 3 1Y | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 1 XOR output pin 3. |
| 130 | ttl7486 / chip-pin | pin 4 2A | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 2 A input pin 4. |
| 131 | ttl7486 / chip-pin | pin 5 2B | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 2 B input pin 5. |
| 132 | ttl7486 / chip-pin | pin 6 2Y | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 2 XOR output pin 6. |
| 133 | ttl7486 / chip-pin | pin 8 3Y | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 3 XOR output pin 8. |
| 134 | ttl7486 / chip-pin | pin 9 3A | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 3 A input pin 9. |
| 135 | ttl7486 / chip-pin | pin 10 3B | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 3 B input pin 10. |
| 136 | ttl7486 / chip-pin | pin 11 4Y | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 4 XOR output pin 11. |
| 137 | ttl7486 / chip-pin | pin 12 4A | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 4 A input pin 12. |
| 138 | ttl7486 / chip-pin | pin 13 4B | CONFIRMED | TI LS86A p. 1 (N-package diagram / XOR description) | Gate 4 B input pin 13. |
| 139 | ttl7474 / chip-pin | pin 2 1D | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 1 D input pin 2. |
| 140 | ttl7474 / chip-pin | pin 3 1CLK | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 1 positive-edge clock input pin 3. |
| 141 | ttl7474 / chip-pin | pin 4 /1PRE | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 1 active-low preset input pin 4 sets Q HIGH. |
| 142 | ttl7474 / chip-pin | pin 6 /1Q | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 1 complementary Q output pin 6. |
| 143 | ttl7474 / chip-pin | pin 8 /2Q | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 2 complementary Q output pin 8. |
| 144 | ttl7474 / chip-pin | pin 9 2Q | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 2 Q output pin 9. |
| 145 | ttl7474 / chip-pin | pin 10 /2PRE | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 2 active-low preset pin 10. |
| 146 | ttl7474 / chip-pin | pin 11 2CLK | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 2 positive-edge clock pin 11. |
| 147 | ttl7474 / chip-pin | pin 12 2D | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 2 D input pin 12. |
| 148 | ttl7474 / chip-pin | pin 13 /2CLR | CONFIRMED | TI S74 p. 1 (N-package diagram / function table) | Flip-flop 2 active-low clear pin 13. |
| 149 | tl851 / chip-pin | pin 2 XMIT | CONFIRMED | TI TL851 pp. 1-5 | XMIT output pin 2: 16-pulse burst per INIT, typical 49.4 kHz for 420 kHz resonator. P. 3 gives typical -140 mA source current; p. 4 shows Darlington emitter follower. |
| 150 | tl851 / chip-pin | pin 4 GCD | CONFIRMED | TI TL851 pp. 1-5 | GCD output pin 4; pp. 2,4 gain sequence puts D at most significant position. P. 4 shows open collector. |
| 151 | tl851 / chip-pin | pin 5 GCA | CONFIRMED | TI TL851 pp. 1-5 | GCA output pin 5; gain sequence makes A least significant; open-collector output on p. 4. |
| 152 | tl851 / chip-pin | pin 6 GCB | CONFIRMED | TI TL851 pp. 1-5 | GCB output pin 6; gain sequence B and open-collector schematic pp. 2,4. |
| 153 | tl851 / chip-pin | pin 7 GCC | CONFIRMED | TI TL851 pp. 1-5 | GCC output pin 7; gain sequence C and open-collector schematic pp. 2,4. |
| 154 | tl851 / chip-pin | pin 8 REC | CONFIRMED | TI TL851 pp. 1-5 | REC input pin 8, with 1.2 V internal receive threshold. |
| 155 | tl851 / chip-pin | pin 9 ECHO | CONFIRMED | TI TL851 pp. 1-5 | ECHO pin 9 is open-collector output (p. 4); echo-detection waveform raises it (p. 5). |
| 156 | tl851 / chip-pin | pin 10 OSC | CONFIRMED | TI TL851 pp. 1-5 | OSC output pin 10 enabled by INIT. First 16 clocks divide resonator by 8.5; remainder divide by 4.5. |
| 157 | tl851 / chip-pin | pin 11 XTAL1 | UNVERIFIABLE | TI TL851 pp. 1-5 | XTAL1 pin 11 is resonator connection and nominal resonator is 420 kHz; source does not assign a pin I/O direction. Source silent on claimed dir=in. Severity low; prove-it-works. |
| 158 | tl851 / chip-pin | pin 12 XTAL2 | UNVERIFIABLE | TI TL851 pp. 1-5 | XTAL2 pin 12 is resonator connection; source does not assign a pin I/O direction. Source silent on claimed dir=in. Severity low; prove-it-works. |
| 159 | tl851 / chip-pin | pin 14 INIT | CONFIRMED | TI TL851 pp. 1-5 | INIT input pin 14; high initiates 16-pulse transmit; initial high must wait at least 5 ms after power. |
| 160 | tl851 / chip-pin | pin 15 BINH | CONFIRMED | TI TL851 pp. 1-5 | BINH input pin 15; HIGH bypasses internal receive blanking to allow closer echoes. |
| 161 | herojr / clock-row | TL851 pin 10 | CONFIRMED | TI TL851 pp. 1,3 | OSC pin 10; nominal 420 kHz resonator gives 420/8.5=49.4118 kHz during 16-pulse transmit and 420/4.5=93.3333 kHz after. P. 3 explicitly lists rounded typical 49.4 and 93.3 kHz. These are typical values, not a captured Hero Jr waveform. |
| 162 | tl852 / chip-pin | pin 1 G1IN | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | G1IN input pin 1; external resistor from G1IN to GADJ sets gain. |
| 163 | tl852 / chip-pin | pin 2 XIN | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | XIN pin 2 provides transformer-secondary clamp during transmit. |
| 164 | tl852 / chip-pin | pin 3 GADJ | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | GADJ pin 3 joins gain resistor from G1IN. |
| 165 | tl852 / chip-pin | pin 4 LC | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | LC pin 4 joins parallel LC circuit to VCC, controlling tuned gain/Q. |
| 166 | tl852 / chip-pin | pin 6 G1OUT | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | G1OUT first-stage output pin 6; source specifies 0.01 uF interstage AC coupling. |
| 167 | tl852 / chip-pin | pin 7 G2IN | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | G2IN second-stage input pin 7. |
| 168 | tl852 / chip-pin | pin 8 BIAS | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | BIAS pin 8 requires external 68 kohm +/-5% resistor to ground. |
| 169 | tl852 / chip-pin | pin 9 REC | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | REC output pin 9 requires 1000 pF integration capacitor to GND. |
| 170 | tl852 / chip-pin | pin 10 NC | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | Pin 10 NC; no internal connection. |
| 171 | tl852 / chip-pin | pin 11 NC | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | Pin 11 NC; no internal connection. |
| 172 | tl852 / chip-pin | pin 12 GCC | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | GCC digital gain input pin 12. |
| 173 | tl852 / chip-pin | pin 13 GCB | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | GCB digital gain input pin 13. |
| 174 | tl852 / chip-pin | pin 14 GCA | CONFIRMED | TI TL852 p. 1 (pin diagram and description) | GCA digital gain input pin 14; gain steps in Fig. 2 show A lowest weight. |
| 175 | uln2003 / chip-pin | pin 1 1B | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 1 is channel 1 base input. |
| 176 | uln2003 / chip-pin | pin 2 2B | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 2 is channel 2 base input; ULN2003 has 2.7 kohm series base resistors for TTL / 5 V CMOS. |
| 177 | uln2003 / chip-pin | pin 3 3B | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 3 is channel 3 base input; 2.7 kohm resistor, TTL / 5 V CMOS. |
| 178 | uln2003 / chip-pin | pin 4 4B | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 4 is channel 4 base input; 2.7 kohm resistor, TTL / 5 V CMOS. |
| 179 | uln2003 / chip-pin | pin 5 5B | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 5 is channel 5 base input; 2.7 kohm resistor, TTL / 5 V CMOS. |
| 180 | uln2003 / chip-pin | pin 6 6B | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 6 is channel 6 base input; 2.7 kohm resistor, TTL / 5 V CMOS. |
| 181 | uln2003 / chip-pin | pin 10 7C | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 10 is channel 7 Darlington collector output (open collector). |
| 182 | uln2003 / chip-pin | pin 11 6C | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 11 is channel 6 collector. Source rates a single pair 500 mA; package thermal/current derating still applies. |
| 183 | uln2003 / chip-pin | pin 12 5C | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 12 is channel 5 collector. Single-pair rating 500 mA; package thermal/current derating still applies. |
| 184 | uln2003 / chip-pin | pin 13 4C | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 13 is channel 4 collector. Single-pair rating 500 mA; package thermal/current derating still applies. |
| 185 | uln2003 / chip-pin | pin 14 3C | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 14 is channel 3 collector. Single-pair rating 500 mA; package thermal/current derating still applies. |
| 186 | uln2003 / chip-pin | pin 16 1C | CONFIRMED | TI ULN2003A pp. 1,3-4 | Pin 16 is channel 1 Darlington collector output (open collector). |
| 187 | ula_zx81 / replacement-modern | vLA81 (Charlie Ingley) | UNVERIFIABLE | Tindie vLA81, product description/features | Supports 2C210E, selectable back porch, video level for 75 ohm monitor or modulator, narrow pins and 50/60 Hz configuration. Source is silent on the specific TS1000=60 Hz instruction (reviews describe NTSC without stating 60 Hz). Severity medium; prove-it-works. |
| 188 | ula_spectrum / replacement-modern | vLA82 (Charlie Ingley) | CONFIRMED | Tindie vLA82, product description/features | Manufacturer explicitly identifies 6C001E-7 or earlier replacement, 6C001-7 functionality, rubber-key case clearance, small-pin socket compatibility caveat and optional turned-pin socket. |
| 189 | atari600xl / first-ten | Power in (+5 V DC) pin 1 to pin 3, on the brick plug with a 4.7 Î© 5 W resistor across it | UNVERIFIABLE | Valoroso article, power-supply load-test section and DIN7 illustration | Source specifies 5 V DC, 4.7 ohm / 5 W parallel load, just over 1 A; male contact-side illustration identifies pin 1 +5 V and pin 3 GND. It gives no 4.9-5.1 V acceptance band or explicit 600XL applicability. Source silent on these parts; severity medium, prove-it-works. |
| 190 | atari400 / clock-row | ANTIC pin 34 to 6502 pin 37 | UNVERIFIABLE | Altirra p. 44, section 3.3 | Section 3.3 explicitly gives PAL 1.773447 MHz and NTSC 1.789773 MHz. Source does not give ANTIC pin 34 or 6502 pin 37, nor the claimed board wiring. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 191 | atari400 / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 15.55655 kHz / NTSC 15.69975 kHz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 192 | atari400 / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 49.86074 Hz / NTSC 59.92271 Hz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 193 | atari800 / clock-row | ANTIC pin 34 to 6502 pin 37 | UNVERIFIABLE | Altirra p. 44, section 3.3 | Section 3.3 explicitly gives PAL 1.773447 MHz and NTSC 1.789773 MHz. Source does not give ANTIC pin 34 or 6502 pin 37, nor the claimed board wiring. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 194 | atari800 / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 15.55655 kHz / NTSC 15.69975 kHz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 195 | atari800 / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 49.86074 Hz / NTSC 59.92271 Hz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 196 | atari600xl / clock-row | 6502C pin 3 and pin 39; ANTIC pin 29; GTIA pin 30; POKEY pin 7; PIA pin 25 | UNVERIFIABLE | Altirra p. 44, section 3.3 | Section 3.3 gives PAL 1.773447 MHz and NTSC 1.789773 MHz. Source is silent on all listed physical pins: 6502C 3/39, ANTIC 29, GTIA 30, POKEY 7, PIA 25, and board-specific routing. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 197 | atari600xl / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 15.55655 kHz / NTSC 15.69975 kHz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 198 | atari600xl / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 49.86074 Hz / NTSC 59.92271 Hz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 199 | atari800xl / clock-row | 6502C pin 3 and pin 39; ANTIC pin 29; GTIA pin 30; POKEY pin 7; PIA pin 25 | UNVERIFIABLE | Altirra p. 44, section 3.3 | Section 3.3 gives PAL 1.773447 MHz and NTSC 1.789773 MHz. Source is silent on all listed physical pins: 6502C 3/39, ANTIC 29, GTIA 30, POKEY 7, PIA 25, and board-specific routing. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 200 | atari800xl / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 15.55655 kHz / NTSC 15.69975 kHz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 201 | atari800xl / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 49.86074 Hz / NTSC 59.92271 Hz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 202 | atari130xe / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 15.55655 kHz / NTSC 15.69975 kHz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 203 | atari130xe / clock-row | GTIA pin 25 (composite sync) | UNVERIFIABLE | Altirra p. 61, Table 6 | Table 6 confirms PAL 49.86074 Hz / NTSC 59.92271 Hz. Source does not identify GTIA pin 25 as composite sync. Full item UNVERIFIABLE because source is silent on probe pin claim. Severity medium; prove-it-works. |
| 204 | cpu6502 / replacement-modern | WDC W65C02S | UNVERIFIABLE | WDC W65C02S pp. 9-13, Fig. 3-1 | Source proves VPB output pin 1, MLB output pin 5, BE input pin 36; BE HIGH enables address/data/RWB and LOW floats them. It does not show the NMOS 6502 pin-1 ground or pins 5/36 NC comparison. Missing historical pinout evidence; severity medium, prove-it-works. |
| 205 | cpu65sc12 / replacement-modern | WDC W65C02S | UNVERIFIABLE | WDC W65C02S pp. 9-13, Fig. 3-1 | Source proves WDC pins 1 VPB output, 5 MLB output and 36 BE input and enabled-HIGH behavior. It is silent on BBC Master grounding pins 1 and 5 and does not establish 65SC12 board compatibility. Needs Master schematic; severity medium, prove-it-works. |
| 206 | model4 / scope | Z80A pin 6 | UNVERIFIABLE | Zilog PS0178 PDF p. 33 (printed p. 37), DC characteristics | NMOS clock LOW maximum 0.45 V, HIGH minimum VCC-0.6 V (=4.4 V at 5 V) confirmed visually. Source does not establish Model 4 4.05504/2.02752 MHz, Model III mode, Sams U9-13 or 5 V p-p. Referenced technical reference and Sams are not cited links. Source silent on those claims; severity medium, prove-it-works. |
| 207 | cpuz80 / chip-pin | pin 1 A11 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps A11 output to pin 1; address bus is tri-state. |
| 208 | cpuz80 / chip-pin | pin 3 A13 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps A13 output to pin 3. |
| 209 | cpuz80 / chip-pin | pin 4 A14 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps A14 output to pin 4. |
| 210 | cpuz80 / chip-pin | pin 5 A15 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps A15 output to pin 5; 16 address bits cover 64 KB. |
| 211 | cpuz80 / chip-pin | pin 6 CLK | UNVERIFIABLE | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps CLK input to pin 6; p. 7 calls it single-phase MOS-level clock. The cited manual gives no numerical 0-5 V swing requirement. Full item lacks cited support for the additional claim. Severity medium; prove-it-works. |
| 212 | cpuz80 / chip-pin | pin 7 D4 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps bidirectional D4 to pin 7. |
| 213 | cpuz80 / chip-pin | pin 8 D3 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps bidirectional D3 to pin 8. |
| 214 | cpuz80 / chip-pin | pin 9 D5 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps bidirectional D5 to pin 9. |
| 215 | cpuz80 / chip-pin | pin 10 D6 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps bidirectional D6 to pin 10. |
| 216 | cpuz80 / chip-pin | pin 12 D2 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps bidirectional D2 to pin 12. |
| 217 | cpuz80 / chip-pin | pin 13 D7 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps bidirectional D7 to pin 13. |
| 218 | cpuz80 / chip-pin | pin 14 D0 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps bidirectional D0 to pin 14. |
| 219 | cpuz80 / chip-pin | pin 15 D1 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | Fig. 3 maps bidirectional D1 to pin 15. |
| 220 | cpuz80 / chip-pin | pin 16 /INT | UNVERIFIABLE | Zilog UM0080 pp. 5-8 (PDF 19-22) | INT input pin 16 is active LOW; honored after instruction if IFF enabled. Source does not establish video-chip once-per-frame behavior or machine probe patterns. Full item lacks cited support for the additional claim. Severity medium; prove-it-works. |
| 221 | cpuz80 / chip-pin | pin 17 /NMI | UNVERIFIABLE | Zilog UM0080 pp. 5-8 (PDF 19-22) | NMI pin 17 is negative-edge input; restart 0066h irrespective of mask. Source does not establish display-timing NMI pulse trains on the listed machines. Full item lacks cited support for the additional claim. Severity medium; prove-it-works. |
| 222 | cpuz80 / chip-pin | pin 18 /HALT | WRONG | Zilog UM0080 pp. 5-8 (PDF 19-22); p. 14 / p. 181 | HALT output pin 18 is LOW in HALT; NOP refresh continues. P. 6 specifies NMI or enabled maskable interrupt; p. 181 also specifies reset can exit HALT. Severity medium; prove-it-works / fix-root-causes. |
| 223 | cpuz80 / chip-pin | pin 19 /MREQ | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | MREQ output pin 19 is active LOW / tri-state; asserts for memory operations, including refresh (p. 8). |
| 224 | cpuz80 / chip-pin | pin 20 /IORQ | WRONG | Zilog UM0080 pp. 5-8 (PDF 19-22) | IORQ output pin 20 is active LOW / tri-state. P. 6 explicitly says interrupt-acknowledge also asserts IORQ with M1; probe assertion port access ONLY is false. Severity medium; prove-it-works / fix-root-causes. |
| 225 | cpuz80 / chip-pin | pin 21 /RD | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | RD output pin 21 is active LOW / tri-state for memory or I/O reads. |
| 226 | cpuz80 / chip-pin | pin 22 /WR | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | WR output pin 22 is active LOW / tri-state for valid write data on memory or I/O writes. |
| 227 | cpuz80 / chip-pin | pin 24 /WAIT | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | WAIT pin 24 is active-low input; extends transfer while active and can prevent DRAM refresh if extended. |
| 228 | cpuz80 / chip-pin | pin 25 /BUSRQ | UNVERIFIABLE | Zilog UM0080 pp. 5-8 (PDF 19-22) | BUSREQ pin 25 is active-low input; floats CPU buses/control at end of current machine cycle. External pull-up required for wired-OR applications, not stated as unconditional. Full item lacks cited support for the additional claim. Severity medium; prove-it-works. |
| 229 | cpuz80 / chip-pin | pin 26 /RESET | UNVERIFIABLE | Zilog UM0080 pp. 5-8 (PDF 19-22) | RESET active-low input pin 26; three full clocks minimum, clears PC/I/R and IFF, sets mode 0. Manual does not specify external board power-on pulse. Full item lacks cited support for the additional claim. Severity medium; prove-it-works. |
| 230 | cpuz80 / chip-pin | pin 27 /M1 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | M1 output pin 27 identifies opcode fetch, and interrupt acknowledge together with IORQ. |
| 231 | cpuz80 / chip-pin | pin 28 /RFSH | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | RFSH output pin 28 with MREQ qualifies low seven address bits for refresh; p. 8 explains refresh half of fetch. |
| 232 | cpuz80 / chip-pin | pin 30 A0 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A0 output pin 30. |
| 233 | cpuz80 / chip-pin | pin 31 A1 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A1 output pin 31. |
| 234 | cpuz80 / chip-pin | pin 32 A2 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A2 output pin 32. |
| 235 | cpuz80 / chip-pin | pin 33 A3 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A3 output pin 33. |
| 236 | cpuz80 / chip-pin | pin 34 A4 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A4 output pin 34. |
| 237 | cpuz80 / chip-pin | pin 35 A5 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A5 output pin 35. |
| 238 | cpuz80 / chip-pin | pin 36 A6 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A6 output pin 36. |
| 239 | cpuz80 / chip-pin | pin 37 A7 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A7 output pin 37. |
| 240 | cpuz80 / chip-pin | pin 38 A8 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A8 output pin 38. |
| 241 | cpuz80 / chip-pin | pin 39 A9 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A9 output pin 39. |
| 242 | cpuz80 / chip-pin | pin 40 A10 | CONFIRMED | Zilog UM0080 pp. 5-8 (PDF 19-22) | A10 output pin 40. |
| 243 | zx81 / first-ten | Z80A pin 26 | UNVERIFIABLE | Zilog UM0080 pp. 5-6 (PDF 19-20) | Pin 26 is RESET, active LOW and minimum three full clocks. Continuous reset prevents execution. CPU manual does not show zx81 power-on reset circuit or its LOW-then-HIGH waveform, nor diagnose its reset components. Source silent on board-specific expectation. Severity medium; prove-it-works. |
| 244 | ts1000 / first-ten | Z80A pin 26 | UNVERIFIABLE | Zilog UM0080 pp. 5-6 (PDF 19-20) | Pin 26 is RESET, active LOW and minimum three full clocks. Continuous reset prevents execution. CPU manual does not show ts1000 power-on reset circuit or its LOW-then-HIGH waveform, nor diagnose its reset components. Source silent on board-specific expectation. Severity medium; prove-it-works. |

## Coverage

| kind | items | confirmed | wrong | unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 221 | 210 | 4 | 7 |
| clock-row | 15 | 1 | 0 | 14 |
| first-ten | 3 | 0 | 0 | 3 |
| replacement-modern | 5 | 2 | 0 | 3 |
| scope | 1 | 0 | 0 | 1 |
| TOTAL | 245 | 213 | 4 | 28 |

## Source link / locator issues

No dead or blocked sources. Several sources are insufficient for parts of their claims, as detailed per row. Sather citations have incorrect printed-page labels: Figure 9.7 is p. 9-11 (not 9-10); Table 9.1 is p. 9-12 (not 9-11); Drive Off/On is p. 9-14 (not 9-13). PS0178 #page=33 opens the correct DC table, but its printed page is 37, not 33.

## Source index

- s00: http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf; HTTP 200; 557750 bytes.
- s01: http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1571/1571_Service_Manual_Preliminary_314002-04_(1986_Oct).pdf; HTTP 200; 3398430 bytes.
- s02: https://archive.org/details/understanding_the_apple_ii/page/n239; HTTP 200; 197239 bytes.
- s03: https://archive.org/details/understanding_the_apple_ii/page/n240; HTTP 200; 202266 bytes.
- s04: https://archive.org/details/understanding_the_apple_ii/page/n242; HTTP 200; 197240 bytes.
- s05: https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf; HTTP 200; 674695 bytes.
- s06: https://colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf; HTTP 200; 381291 bytes.
- s07: https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf; HTTP 200; 3060300 bytes.
- s08: https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Interface%20Cards/Disk%20Drive%20Controllers/Apple%20Disk%20II%20Interface%20Card/Schematics/Apple%20Disk%20II%20-%20Schematics%20050-0005-01.pdf; HTTP 200; 623909 bytes.
- s09: https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Schematics/Apple%20Disk%20II%20-%20Schematics%20Analog%20Board%20050-0007-H.pdf; HTTP 200; 728727 bytes.
- s10: https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Apple%20Disk%20II%20Technical%20Procedures.pdf; HTTP 200; 7073247 bytes.
- s11: https://retrorepairsandrefurbs.com/2021/06/13/acorn-electron-repair-restoration/; HTTP 200; 200304 bytes.
- s12: https://www.ti.com/lit/ds/symlink/lm324.pdf; HTTP 200; 3960059 bytes.
- s13: https://www.ti.com/lit/ds/symlink/sn54ls323.pdf; HTTP 200; 831358 bytes.
- s14: https://www.ti.com/lit/ds/symlink/sn7406.pdf; HTTP 200; 1294535 bytes.
- s15: https://www.ti.com/lit/ds/symlink/sn74hct125.pdf; HTTP 200; 956379 bytes.
- s16: https://www.ti.com/lit/ds/symlink/sn74ls04.pdf; HTTP 200; 1542756 bytes.
- s17: https://www.ti.com/lit/ds/symlink/sn74ls125a.pdf; HTTP 200; 1517949 bytes.
- s18: https://www.ti.com/lit/ds/symlink/sn74ls138.pdf; HTTP 200; 1395027 bytes.
- s19: https://www.ti.com/lit/ds/symlink/sn74ls169b.pdf; HTTP 200; 1298086 bytes.
- s20: https://www.ti.com/lit/ds/symlink/sn74ls174.pdf; HTTP 200; 541188 bytes.
- s21: https://www.ti.com/lit/ds/symlink/sn74ls259b.pdf; HTTP 200; 500228 bytes.
- s22: https://www.ti.com/lit/ds/symlink/sn74ls541.pdf; HTTP 200; 1586883 bytes.
- s23: https://www.ti.com/lit/ds/symlink/sn74ls86a.pdf; HTTP 200; 1695660 bytes.
- s24: https://www.ti.com/lit/ds/symlink/sn74s74.pdf; HTTP 200; 1674466 bytes.
- s25: https://www.ti.com/lit/ds/symlink/tl851.pdf; HTTP 200; 376058 bytes.
- s26: https://www.ti.com/lit/ds/symlink/tl852.pdf; HTTP 200; 373843 bytes.
- s27: https://www.ti.com/lit/ds/symlink/uln2003a.pdf; HTTP 200; 1850862 bytes.
- s28: https://www.tindie.com/products/charlieingley/vla81-zx81-ula-replacement/; HTTP 200; 260439 bytes.
- s29: https://www.tindie.com/products/charlieingley/vla82-spectrum-48k-ula-replacement/; HTTP 200; 271587 bytes.
- s30: https://www.valoroso.it/en/atari-800xl-atari-1050-shorted-power-supply/; HTTP 200; 127073 bytes.
- s31: https://www.virtualdub.org/downloads/Altirra%20Hardware%20Reference%20Manual.pdf; HTTP 200; 2246568 bytes.
- s32: https://www.westerndesigncenter.com/wdc/documentation/w65c02s.pdf; HTTP 200; 2655196 bytes.
- s33: https://www.zilog.com/docs/z80/ps0178.pdf; HTTP 200; 1389263 bytes.
- s34: https://www.zilog.com/docs/z80/um0080.pdf; HTTP 200; 1587333 bytes.
