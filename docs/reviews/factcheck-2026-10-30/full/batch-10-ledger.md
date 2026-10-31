# batch-10 fact-check ledger

All 236 supplied items were individually decided. Verdicts apply to the supplied batch JSON. Items 0/1 have swapped keyboard labels, while src/data/apple.js:222-223 in this checkout already has the correct labels. No application data was modified.

Decision rule: CONFIRMED requires support for substantive numeric/pin/function/direction claims, with transparent arithmetic or rounding allowed. WRONG requires a source contradiction. UNVERIFIABLE identifies a particular unsupported clause even if other clauses are supported. Shared bus attachment alone does not establish bidirectionality. Rounded frequencies do not prove additional digits.

II = Apple II Reference Manual (1979); IIc = Apple IIc Technical Reference Manual (second edition). Page numbers are printed pages unless marked PDF/scan. II printed+11 = PDF page; IIc printed+28 = PDF page. Red Book printed111 = PDF114. Sams printed8 = PDF13; schematic scans5/6 are not printed pages5/6.

Acquisition: attempted curl -L -A "Mozilla/5.0"; installed curl failed locally with SEC_E_NO_CREDENTIALS before contacting the servers. Python urllib with the same User-Agent downloaded all four source documents as a transport fallback. Retained metadata, source PDFs, pdftotext -layout extracts, and pdftoppm -f N -l N -r 110 -png page images under batch-10/. Sams is scanned and was inspected visually. The original II PDF was additionally fetched for clearer schematic images; contrast/rotation images assist reading without changing source content. No dead or blocked source document was encountered.

Principles: WRONG label findings map to prove-it-works and fix-root-causes: compare batch, source, and checkout before attempting a fix to already-correct data. Evidence gaps map to prove-it-works. No serialize-shared-state-mutations finding applies to this read-only data review.

| kind | items | confirmed | wrong | unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 139 | 137 | 2 | 0 |
| chip-pin | 88 | 75 | 0 | 13 |
| rail | 5 | 5 | 0 | 0 |
| clock-row | 3 | 0 | 0 | 3 |
| first-ten | 1 | 0 | 0 | 1 |
| **Total** | **236** | **217** | **2** | **17** |

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | apple2/ii-kbd | pin 1 (STROBE) | WRONG | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 1 to +5 V. Table 30 specifies +5 V, keyboard current less than 120 mA. HIGH: batch name is wrong; correct name is +5 V. Supply and strobe labels are interchanged. The actual checkout already has the correct names at src/data/apple.js:222-223. |
| 1 | apple2/ii-kbd | pin 2 (+5 V) | WRONG | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 2 to STROBE. Table 30 specifies keyboard strobe pulse at least 10 us per key; either polarity. HIGH: batch name is wrong; correct name is STROBE. Supply and strobe labels are interchanged. The actual checkout already has the correct names at src/data/apple.js:222-223. |
| 2 | apple2/ii-kbd | pin 4 (NC) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 4 to NC. No connection; NC pin 14 is established by Fig.18 despite omission from Table 30 grouped NC row. |
| 3 | apple2/ii-kbd | pin 5 (Data 5) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 5 to Data 5. Table 30 identifies seven-bit ASCII keyboard data input. |
| 4 | apple2/ii-kbd | pin 6 (Data 4) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 6 to Data 4. Table 30 identifies seven-bit ASCII keyboard data input. |
| 5 | apple2/ii-kbd | pin 7 (Data 6) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 7 to Data 6. Table 30 identifies seven-bit ASCII keyboard data input. |
| 6 | apple2/ii-kbd | pin 9 (NC) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 9 to NC. No connection; NC pin 14 is established by Fig.18 despite omission from Table 30 grouped NC row. |
| 7 | apple2/ii-kbd | pin 10 (Data 2) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 10 to Data 2. Table 30 identifies seven-bit ASCII keyboard data input. |
| 8 | apple2/ii-kbd | pin 12 (Data 0) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 12 to Data 0. Table 30 identifies seven-bit ASCII keyboard data input. |
| 9 | apple2/ii-kbd | pin 13 (Data 1) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 13 to Data 1. Table 30 identifies seven-bit ASCII keyboard data input. |
| 10 | apple2/ii-kbd | pin 15 (-12 V) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 15 to -12 V. -12 V keyboard supply; draw less than 50 mA. |
| 11 | apple2/ii-kbd | pin 16 (NC) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 16 to NC. No connection; NC pin 14 is established by Fig.18 despite omission from Table 30 grouped NC row. |
| 12 | apple2plus/ii-kbd | pin 2 (STROBE) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 2 to STROBE. Table 30 specifies keyboard strobe pulse at least 10 us per key; either polarity. |
| 13 | apple2plus/ii-kbd | pin 3 (/RESET) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 3 to RESET. Normally high CPU reset, pulled low when RESET key pressed. |
| 14 | apple2plus/ii-kbd | pin 4 (NC) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 4 to NC. No connection; NC pin 14 is established by Fig.18 despite omission from Table 30 grouped NC row. |
| 15 | apple2plus/ii-kbd | pin 5 (Data 5) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 5 to Data 5. Table 30 identifies seven-bit ASCII keyboard data input. |
| 16 | apple2plus/ii-kbd | pin 6 (Data 4) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 6 to Data 4. Table 30 identifies seven-bit ASCII keyboard data input. |
| 17 | apple2plus/ii-kbd | pin 8 (GND) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 8 to GND. System electrical ground, the 0 V reference. |
| 18 | apple2plus/ii-kbd | pin 9 (NC) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 9 to NC. No connection; NC pin 14 is established by Fig.18 despite omission from Table 30 grouped NC row. |
| 19 | apple2plus/ii-kbd | pin 10 (Data 2) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 10 to Data 2. Table 30 identifies seven-bit ASCII keyboard data input. |
| 20 | apple2plus/ii-kbd | pin 11 (Data 3) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 11 to Data 3. Table 30 identifies seven-bit ASCII keyboard data input. |
| 21 | apple2plus/ii-kbd | pin 13 (Data 1) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 13 to Data 1. Table 30 identifies seven-bit ASCII keyboard data input. |
| 22 | apple2plus/ii-kbd | pin 14 (NC) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 14 to NC. No connection; NC pin 14 is established by Fig.18 despite omission from Table 30 grouped NC row. |
| 23 | apple2plus/ii-kbd | pin 15 (-12 V) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 15 to -12 V. -12 V keyboard supply; draw less than 50 mA. |
| 24 | apple2plus/ii-kbd | pin 16 (NC) | CONFIRMED | II pp.102-103, Table 30/Fig.18 | Fig.18 assigns pin 16 to NC. No connection; NC pin 14 is established by Fig.18 despite omission from Table 30 grouped NC row. |
| 25 | apple2/ii-cass | pin S (GND) | CONFIRMED | II pp.98,103,114 Fig.22-5 | Cassette jack schematic shows common/sleeve grounded (0 V reference); input reaches comparator and output is driven from K13 flip-flop. |
| 26 | apple2/ii-cass-out | pin T (Cassette out) | CONFIRMED | II pp.98,103,114 Fig.22-5 | Cassette output tip feeds recorder microphone input. P.103 specifies 25 mV into 100 ohms; the parent connector summary (apple.js:212) supplies that load condition. This is not an unloaded high-impedance scope amplitude specification. |
| 27 | apple2/ii-cass-out | pin S (GND) | CONFIRMED | II pp.98,103,114 Fig.22-5 | Cassette jack schematic shows common/sleeve grounded (0 V reference); input reaches comparator and output is driven from K13 flip-flop. |
| 28 | apple2plus/ii-cass | pin S (GND) | CONFIRMED | II pp.98,103,114 Fig.22-5 | Cassette jack schematic shows common/sleeve grounded (0 V reference); input reaches comparator and output is driven from K13 flip-flop. |
| 29 | apple2plus/ii-cass-out | pin T (Cassette out) | CONFIRMED | II pp.98,103,114 Fig.22-5 | Cassette output tip feeds recorder microphone input. P.103 specifies 25 mV into 100 ohms; the parent connector summary (apple.js:212) supplies that load condition. This is not an unloaded high-impedance scope amplitude specification. |
| 30 | apple2plus/ii-cass-out | pin S (GND) | CONFIRMED | II pp.98,103,114 Fig.22-5 | Cassette jack schematic shows common/sleeve grounded (0 V reference); input reaches comparator and output is driven from K13 flip-flop. |
| 31 | apple2/ii-psu | pin 1 (GND) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 1: Common ground, 0 V. |
| 32 | apple2/ii-psu | pin 2 (GND) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 2: Common ground, 0 V. |
| 33 | apple2/ii-psu | pin 3 (+5 V) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 3: +5 V, about 1.5 A for 48K without peripherals. Red Book 5.0 +/-0.15 V = 4.85-5.15 V. |
| 34 | apple2/ii-psu | pin 4 (+12 V) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 4: +12 V, about 400 mA for 48K without peripherals. Red Book 11.8 +/-0.5 V = 11.3-12.3 V. |
| 35 | apple2/ii-psu | pin 5 (-12 V) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 5: -12 V, about 12.5 mA without peripherals. Red Book -12 +/-1 V = -13 to -11 V. |
| 36 | apple2/ii-psu | pin 6 (-5 V) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 6: -5 V, about 0 mA without peripherals. Red Book -5.2 +/-0.5 V = -5.7 to -4.7 V. |
| 37 | apple2plus/ii-psu | pin 1 (GND) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 1: Common ground, 0 V. |
| 38 | apple2plus/ii-psu | pin 2 (GND) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 2: Common ground, 0 V. |
| 39 | apple2plus/ii-psu | pin 3 (+5 V) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 3: +5 V, about 1.5 A for 48K without peripherals. Red Book 5.0 +/-0.15 V = 4.85-5.15 V. |
| 40 | apple2plus/ii-psu | pin 4 (+12 V) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 4: +12 V, about 400 mA for 48K without peripherals. Red Book 11.8 +/-0.5 V = 11.3-12.3 V. |
| 41 | apple2plus/ii-psu | pin 5 (-12 V) | CONFIRMED | II p.104 Table 31/Fig.19; Red Book p.111 (PDF114) | Pin 5: -12 V, about 12.5 mA without peripherals. Red Book -12 +/-1 V = -13 to -11 V. |
| 42 | apple2/ii-speaker | pin 1 (SPKR) | CONFIRMED | II pp.98,105 Table 32/Fig.20 | Pin 1 SPKR, about 0.5 W into 8 ohms; half of K13 74LS74 toggles speaker drive through Darlington amplifier. |
| 43 | apple2plus/ii-speaker | pin 1 (SPKR) | CONFIRMED | II pp.98,105 Table 32/Fig.20 | Pin 1 SPKR, about 0.5 W into 8 ohms; half of K13 74LS74 toggles speaker drive through Darlington amplifier. |
| 44 | apple2plus/ii-speaker | pin 2 (+5 V) | CONFIRMED | II pp.98,105 Table 32/Fig.20 | Pin 2 is +5 V supply; speaker connects between supply and driver. |
| 45 | apple2/ii-slot | pin 1 (/I/O SELECT) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 1: I/O SELECT low in phase 0 for page $Cn, n=slot; absent on slot 0 (p.107). |
| 46 | apple2/ii-slot | pin 2 (A0) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 2 = A0; p.107 says buffered address valid during phase 1, held through phase 0. |
| 47 | apple2/ii-slot | pin 3 (A1) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 3 = A1; p.107 says buffered address valid during phase 1, held through phase 0. |
| 48 | apple2/ii-slot | pin 4 (A2) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 4 = A2; p.107 says buffered address valid during phase 1, held through phase 0. |
| 49 | apple2/ii-slot | pin 5 (A3) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 5 = A3; p.107 says buffered address valid during phase 1, held through phase 0. |
| 50 | apple2/ii-slot | pin 6 (A4) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 6 = A4; p.107 says buffered address valid during phase 1, held through phase 0. |
| 51 | apple2/ii-slot | pin 7 (A5) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 7 = A5; p.107 says buffered address valid during phase 1, held through phase 0. |
| 52 | apple2/ii-slot | pin 8 (A6) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 8 = A6; p.107 says buffered address valid during phase 1, held through phase 0. |
| 53 | apple2/ii-slot | pin 9 (A7) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 9 = A7; p.107 says buffered address valid during phase 1, held through phase 0. |
| 54 | apple2/ii-slot | pin 10 (A8) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 10 = A8; p.107 says buffered address valid during phase 1, held through phase 0. |
| 55 | apple2/ii-slot | pin 11 (A9) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 11 = A9; p.107 says buffered address valid during phase 1, held through phase 0. |
| 56 | apple2/ii-slot | pin 12 (A10) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 12 = A10; p.107 says buffered address valid during phase 1, held through phase 0. |
| 57 | apple2/ii-slot | pin 13 (A11) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 13 = A11; p.107 says buffered address valid during phase 1, held through phase 0. |
| 58 | apple2/ii-slot | pin 15 (A13) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 15 = A13; p.107 says buffered address valid during phase 1, held through phase 0. |
| 59 | apple2/ii-slot | pin 16 (A14) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 16 = A14; p.107 says buffered address valid during phase 1, held through phase 0. |
| 60 | apple2/ii-slot | pin 17 (A15) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 17 = A15; p.107 says buffered address valid during phase 1, held through phase 0. |
| 61 | apple2/ii-slot | pin 18 (R/W) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 18: Buffered R/W, high=read and low=write (p.107). |
| 62 | apple2/ii-slot | pin 19 (SYNC) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 19: SYNC on slot 7 only (p.107); generic Fig.21 shows NC. |
| 63 | apple2/ii-slot | pin 20 (/I/O STROBE) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 20: I/O STROBE low in phase 0 for $C800-$CFFF (p.107). |
| 64 | apple2/ii-slot | pin 21 (RDY) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 21: RDY low during phase 1 halts CPU (p.107). |
| 65 | apple2/ii-slot | pin 22 (/DMA) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 22: DMA low disables CPU address bus and halts CPU; 3-kohm pull-up to +5 V (p.107). |
| 66 | apple2/ii-slot | pin 23 (INT OUT) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 23: INT OUT daisy-chain to lower-priority devices; normally tied to pin 28 INT IN (p.107). |
| 67 | apple2/ii-slot | pin 24 (DMA OUT) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 24: DMA OUT to lower-priority devices. Fig.21 and p.108 identify DMA IN as pin 27; p.107 saying pin 22 (DMA IN) is an internal manual typo. |
| 68 | apple2/ii-slot | pin 25 (+5 V) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 25: +5 V; 500 mA available across all peripheral cards (p.107). |
| 69 | apple2/ii-slot | pin 26 (GND) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 26: System electrical ground, 0 V reference (p.107). |
| 70 | apple2/ii-slot | pin 27 (DMA IN) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 27: DMA IN from higher-priority devices; normally tied to pin 24 DMA OUT (p.108). |
| 71 | apple2/ii-slot | pin 28 (INT IN) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 28: INT IN from higher-priority devices; normally tied to pin 23 INT OUT (p.108). |
| 72 | apple2/ii-slot | pin 30 (/IRQ) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 30: IRQ, active-low interrupt request (p.108). |
| 73 | apple2/ii-slot | pin 31 (/RES) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 31: RES low starts CPU RESET (p.108); p.90 describes CPU control pull-ups to +5 V. |
| 74 | apple2/ii-slot | pin 32 (/INH) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 32: INH low disables motherboard ROMs; pulled up to +5 V (p.108). |
| 75 | apple2/ii-slot | pin 33 (-12 V) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 33: -12 V; 200 mA maximum across all peripheral boards (p.108). |
| 76 | apple2/ii-slot | pin 35 (COLOR REF) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 35: COLOR REF only on slot 7 (p.108); Table 27 p.90 specifies 3.580 MHz. Generic Fig.21 shows NC. |
| 77 | apple2/ii-slot | pin 36 (7M) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 36: 7M (p.108); Table 27 p.90 gives 7.159 MHz, rounding to 7.16 MHz. |
| 78 | apple2/ii-slot | pin 37 (Q3) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 37: Q3, asymmetric 2-MHz clock (p.108); Table 27 p.90 says twice system clock, approximately 2.04 MHz. |
| 79 | apple2/ii-slot | pin 39 (USER 1) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 39: USER 1 low disables internal I/O decoding (p.108); p.99 requires joining the board jumper solder pads. |
| 80 | apple2/ii-slot | pin 40 (Φ0) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 40: Phase 0 clock (p.109); pp.88/90 specify 1.023 MHz. |
| 81 | apple2/ii-slot | pin 41 (/DEVICE SELECT) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 41: DEVICE SELECT $C0n0-$C0nF where n=slot+8 (p.109). Phase-0 decode is shown in Fig.22-5 and CPU/I/O timing discussion. |
| 82 | apple2/ii-slot | pin 42 (D7) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 42 = D7; p.109 identifies buffered bidirectional data bus. |
| 83 | apple2/ii-slot | pin 43 (D6) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 43 = D6; p.109 identifies buffered bidirectional data bus. |
| 84 | apple2/ii-slot | pin 44 (D5) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 44 = D5; p.109 identifies buffered bidirectional data bus. |
| 85 | apple2/ii-slot | pin 45 (D4) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 45 = D4; p.109 identifies buffered bidirectional data bus. |
| 86 | apple2/ii-slot | pin 46 (D3) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 46 = D3; p.109 identifies buffered bidirectional data bus. |
| 87 | apple2/ii-slot | pin 47 (D2) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 47 = D2; p.109 identifies buffered bidirectional data bus. |
| 88 | apple2/ii-slot | pin 48 (D1) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 48 = D1; p.109 identifies buffered bidirectional data bus. |
| 89 | apple2/ii-slot | pin 49 (D0) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 49 = D0; p.109 identifies buffered bidirectional data bus. |
| 90 | apple2/ii-slot | pin 50 (+12 V) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 50: +12 V; maximum250 mA total across all peripheral cards (p.109). |
| 91 | apple2plus/ii-slot | pin 1 (/I/O SELECT) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 1: I/O SELECT low in phase 0 for page $Cn, n=slot; absent on slot 0 (p.107). |
| 92 | apple2plus/ii-slot | pin 2 (A0) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 2 = A0; p.107 says buffered address valid during phase 1, held through phase 0. |
| 93 | apple2plus/ii-slot | pin 3 (A1) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 3 = A1; p.107 says buffered address valid during phase 1, held through phase 0. |
| 94 | apple2plus/ii-slot | pin 5 (A3) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 5 = A3; p.107 says buffered address valid during phase 1, held through phase 0. |
| 95 | apple2plus/ii-slot | pin 7 (A5) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 7 = A5; p.107 says buffered address valid during phase 1, held through phase 0. |
| 96 | apple2plus/ii-slot | pin 8 (A6) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 8 = A6; p.107 says buffered address valid during phase 1, held through phase 0. |
| 97 | apple2plus/ii-slot | pin 9 (A7) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 9 = A7; p.107 says buffered address valid during phase 1, held through phase 0. |
| 98 | apple2plus/ii-slot | pin 11 (A9) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 11 = A9; p.107 says buffered address valid during phase 1, held through phase 0. |
| 99 | apple2plus/ii-slot | pin 12 (A10) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 12 = A10; p.107 says buffered address valid during phase 1, held through phase 0. |
| 100 | apple2plus/ii-slot | pin 13 (A11) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 13 = A11; p.107 says buffered address valid during phase 1, held through phase 0. |
| 101 | apple2plus/ii-slot | pin 14 (A12) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 14 = A12; p.107 says buffered address valid during phase 1, held through phase 0. |
| 102 | apple2plus/ii-slot | pin 15 (A13) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 15 = A13; p.107 says buffered address valid during phase 1, held through phase 0. |
| 103 | apple2plus/ii-slot | pin 17 (A15) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 17 = A15; p.107 says buffered address valid during phase 1, held through phase 0. |
| 104 | apple2plus/ii-slot | pin 18 (R/W) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 18: Buffered R/W, high=read and low=write (p.107). |
| 105 | apple2plus/ii-slot | pin 19 (SYNC) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 19: SYNC on slot 7 only (p.107); generic Fig.21 shows NC. |
| 106 | apple2plus/ii-slot | pin 20 (/I/O STROBE) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 20: I/O STROBE low in phase 0 for $C800-$CFFF (p.107). |
| 107 | apple2plus/ii-slot | pin 21 (RDY) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 21: RDY low during phase 1 halts CPU (p.107). |
| 108 | apple2plus/ii-slot | pin 22 (/DMA) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 22: DMA low disables CPU address bus and halts CPU; 3-kohm pull-up to +5 V (p.107). |
| 109 | apple2plus/ii-slot | pin 23 (INT OUT) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 23: INT OUT daisy-chain to lower-priority devices; normally tied to pin 28 INT IN (p.107). |
| 110 | apple2plus/ii-slot | pin 24 (DMA OUT) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 24: DMA OUT to lower-priority devices. Fig.21 and p.108 identify DMA IN as pin 27; p.107 saying pin 22 (DMA IN) is an internal manual typo. |
| 111 | apple2plus/ii-slot | pin 25 (+5 V) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 25: +5 V; 500 mA available across all peripheral cards (p.107). |
| 112 | apple2plus/ii-slot | pin 26 (GND) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 26: System electrical ground, 0 V reference (p.107). |
| 113 | apple2plus/ii-slot | pin 27 (DMA IN) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 27: DMA IN from higher-priority devices; normally tied to pin 24 DMA OUT (p.108). |
| 114 | apple2plus/ii-slot | pin 29 (/NMI) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 29: NMI, active-low nonmaskable interrupt request (p.108). |
| 115 | apple2plus/ii-slot | pin 30 (/IRQ) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 30: IRQ, active-low interrupt request (p.108). |
| 116 | apple2plus/ii-slot | pin 31 (/RES) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 31: RES low starts CPU RESET (p.108); p.90 describes CPU control pull-ups to +5 V. |
| 117 | apple2plus/ii-slot | pin 32 (/INH) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 32: INH low disables motherboard ROMs; pulled up to +5 V (p.108). |
| 118 | apple2plus/ii-slot | pin 34 (-5 V) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 34: -5 V; 200 mA maximum across all peripheral boards (p.108). |
| 119 | apple2plus/ii-slot | pin 35 (COLOR REF) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 35: COLOR REF only on slot 7 (p.108); Table 27 p.90 specifies 3.580 MHz. Generic Fig.21 shows NC. |
| 120 | apple2plus/ii-slot | pin 37 (Q3) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 37: Q3, asymmetric 2-MHz clock (p.108); Table 27 p.90 says twice system clock, approximately 2.04 MHz. |
| 121 | apple2plus/ii-slot | pin 38 (Φ1) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 38: Phase 1 clock (p.108); pp.88/90 specify 1.023 MHz. |
| 122 | apple2plus/ii-slot | pin 39 (USER 1) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 39: USER 1 low disables internal I/O decoding (p.108); p.99 requires joining the board jumper solder pads. |
| 123 | apple2plus/ii-slot | pin 40 (Φ0) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 40: Phase 0 clock (p.109); pp.88/90 specify 1.023 MHz. |
| 124 | apple2plus/ii-slot | pin 41 (/DEVICE SELECT) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 41: DEVICE SELECT $C0n0-$C0nF where n=slot+8 (p.109). Phase-0 decode is shown in Fig.22-5 and CPU/I/O timing discussion. |
| 125 | apple2plus/ii-slot | pin 42 (D7) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 42 = D7; p.109 identifies buffered bidirectional data bus. |
| 126 | apple2plus/ii-slot | pin 43 (D6) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 43 = D6; p.109 identifies buffered bidirectional data bus. |
| 127 | apple2plus/ii-slot | pin 45 (D4) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 45 = D4; p.109 identifies buffered bidirectional data bus. |
| 128 | apple2plus/ii-slot | pin 46 (D3) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 46 = D3; p.109 identifies buffered bidirectional data bus. |
| 129 | apple2plus/ii-slot | pin 47 (D2) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 47 = D2; p.109 identifies buffered bidirectional data bus. |
| 130 | apple2plus/ii-slot | pin 48 (D1) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 48 = D1; p.109 identifies buffered bidirectional data bus. |
| 131 | apple2plus/ii-slot | pin 49 (D0) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Fig.21 pin 49 = D0; p.109 identifies buffered bidirectional data bus. |
| 132 | apple2plus/ii-slot | pin 50 (+12 V) | CONFIRMED | II pp.106-109 Fig.21/Table 33; pp.88-90,99,114 where noted | Pin 50: +12 V; maximum250 mA total across all peripheral cards (p.109). |
| 133 | apple2c/2c-power | pin 1 (NC) | CONFIRMED | IIc pp.233-234 Tables 11-2/11-3/11-4, Fig.11-1 | Pin 1: Not connected. |
| 134 | apple2c/2c-power | pin 2 (GND) | CONFIRMED | IIc pp.233-234 Tables 11-2/11-3/11-4, Fig.11-1 | Pin 2: Signal/common ground, 0 V reference. |
| 135 | apple2c/2c-power | pin 3 (GND) | CONFIRMED | IIc pp.233-234 Tables 11-2/11-3/11-4, Fig.11-1 | Pin 3: Signal/common ground, 0 V reference. |
| 136 | apple2c/2c-power | pin 4 (Chassis) | CONFIRMED | IIc pp.233-234 Tables 11-2/11-3/11-4, Fig.11-1 | Pin 4: Shield/chassis ground, 0 V reference. |
| 137 | apple2c/2c-power | pin 5 (+15 V) | CONFIRMED | IIc pp.233-234 Tables 11-2/11-3/11-4, Fig.11-1 | Pin 5: +15 V DC input to converter; nominal brick voltage +15 V (p.233), converter accepts 9-20 V DC (p.234). |
| 138 | apple2c/2c-power | pin 7 (NC) | CONFIRMED | IIc pp.233-234 Tables 11-2/11-3/11-4, Fig.11-1 | Pin 7: Not connected. |
| 139 | unidisk525/Port or card power | step 1 where/expect/ifNot | UNVERIFIABLE | IIc p.234 Table 11-4; pp.273-274 Fig.11-26/Table 11-18 | Source silent on controller-card diagnostic branch and exclusive attribution of missing port power to converter. IIc numeric claims confirmed: DB-19 pin6 +5 V; pins7/8 +12 V; pin5 -12 V in Fig.11-26. +/-10% gives 10.8-13.2 V. P.234 states converter powers built-in electronics and external disk. This IIc-only source does not prove a UniDisk expansion-card fault diagnosis. |
| 140 | apple2c/+15 V in | where/expect/note | CONFIRMED | IIc pp.233-234 Tables 11-2/11-3/11-4, Fig.11-1 | External brick nominal +15 V. DIN pins5 and6 both +15 V DC inputs. Converter accepts +9 to +20 V DC. |
| 141 | apple2c/+5 V | where/expect/note | CONFIRMED | IIc pp.234,242,244,247-248,274,292; Sams scan5/printed p.8 | +5 V +/-5% = 4.75-5.25 V; maximum 1.5 A. MMU25 (Fig.11-5), IOU28 (Fig.11-6/Table 11-8), IWM26 (Fig.11-9/Table 11-11), 65C02 VDD8 (Fig.11-44a and Sams CPU schematic), disk DB-19 pin6 (Fig.11-26). Every probe point checked. |
| 142 | apple2c/+12 V | where/expect/note | CONFIRMED | IIc pp.234,271,273-274 Tables 11-4/11-17, Fig.11-26 | +12 V +/-10% = 10.8-13.2 V; maximum 0.6 A continuous. Disk pins7/8 and video expansion pin8 confirmed. Video DB-15 maximum 300 mA; p.271 warns exceeding it can damage computer/shut supply down. |
| 143 | apple2c/-12 V | where/expect/note | CONFIRMED | IIc p.234 Table 11-4; p.274 Fig.11-26 | -12 V +/-10% endpoints -13.2 and -10.8 V; 100 mA maximum. Disk pin5 -12 V is explicit in Fig.11-26 although omitted from Table 11-18. P.234 states -5 V derived from -12 V. |
| 144 | apple2c/-5 V | where/expect/note | CONFIRMED | IIc p.234 Table 11-4 and adjacent text | -5 V derived from converter -12 V; 50 mA maximum. Item claims approximate nominal value, not a tighter tolerance. |
| 145 | mmu2c | pin 2 (A0) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 2: A0, 65C02 address input bit0. |
| 146 | mmu2c | pin 3 (Φ0) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 3: Phase0 clock input; p.240 gives 1.0227 MHz, rounded 1.023 MHz. |
| 147 | mmu2c | pin 4 (Q3) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 4: Q3 timing input; p.240 gives 2.045 MHz asymmetric, approximately 2 MHz. |
| 148 | mmu2c | pin 5 (/PRAS) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 5: PRAS memory row-address strobe; generated by TMG19 (p.245), received by MMU. |
| 149 | mmu2c | pin 6 (RA0) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 6: RA0; table explicitly identifies RA0-RA7 as multiplexed address outputs. |
| 150 | mmu2c | pin 7 (RA1) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 7: RA1; table explicitly identifies RA0-RA7 as multiplexed address outputs. |
| 151 | mmu2c | pin 9 (RA3) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 9: RA3; table explicitly identifies RA0-RA7 as multiplexed address outputs. |
| 152 | mmu2c | pin 10 (RA4) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 10: RA4; table explicitly identifies RA0-RA7 as multiplexed address outputs. |
| 153 | mmu2c | pin 11 (RA5) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 11: RA5; table explicitly identifies RA0-RA7 as multiplexed address outputs. |
| 154 | mmu2c | pin 12 (RA6) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 12: RA6; table explicitly identifies RA0-RA7 as multiplexed address outputs. |
| 155 | mmu2c | pin 13 (RA7) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 13: RA7; table explicitly identifies RA0-RA7 as multiplexed address outputs. |
| 156 | mmu2c | pin 14 (R/W) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 14: R/W, 65C02 read/write control input. |
| 157 | mmu2c | pin 15 (/INH) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 15: INH inhibits main memory; explicitly tied to +5 V. |
| 158 | mmu2c | pin 16 (/C06X) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 16: C06X outputs low for $C06x during phase0; hand-control/switch mux on p.287. |
| 159 | mmu2c | pin 17 (/EN80) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 17: EN80 enables auxiliary RAM. |
| 160 | mmu2c | pin 18 (/KBD) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 18: KBD enables keyboard data bits0-6; p.255 explains ROM data enabled onto bus. |
| 161 | mmu2c | pin 19 (/ROMEN2) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 19: ROMEN2, ROM enable tied to ROMEN1 (also p.250). |
| 162 | mmu2c | pin 20 (/ROMEN1) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 20: ROMEN1, ROM enable tied to ROMEN2 (also p.250). |
| 163 | mmu2c | pin 21 (MD7) | UNVERIFIABLE | IIc p.242 Fig.11-5/Table 11-7 | Source silent on input capability in dir=bidir. Pin21 MD7 and MMU flag/status readout on data bit7 are confirmed. Being connected to a bidirectional CPU bus does not prove an input path inside MMU. |
| 164 | mmu2c | pin 22 (/C07X) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 22: C07X outputs low for $C07x during phase0; p.290 identifies paddle timer reset. |
| 165 | mmu2c | pin 23 (/CASEN) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 23: CASEN enables main RAM. |
| 166 | mmu2c | pin 24 (/SELIO) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 24: SELIO low in phase0 for $C0 page except $C08x, Bx, Cx, Fx. |
| 167 | mmu2c | pin 26 (A15) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 26: A15; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 168 | mmu2c | pin 27 (A14) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 27: A14; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 169 | mmu2c | pin 28 (A13) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 28: A13; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 170 | mmu2c | pin 29 (A12) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 29: A12; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 171 | mmu2c | pin 30 (A11) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 30: A11; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 172 | mmu2c | pin 31 (A10) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 31: A10; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 173 | mmu2c | pin 32 (A9) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 32: A9; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 174 | mmu2c | pin 33 (A8) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 33: A8; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 175 | mmu2c | pin 34 (A7) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 34: A7; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 176 | mmu2c | pin 35 (A6) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 35: A6; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 177 | mmu2c | pin 36 (A5) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 36: A5; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 178 | mmu2c | pin 37 (A4) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 37: A4; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 179 | mmu2c | pin 38 (A3) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 38: A3; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 180 | mmu2c | pin 39 (A2) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 39: A2; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 181 | mmu2c | pin 40 (A1) | CONFIRMED | IIc p.242 Fig.11-5/Table 11-7; pp.240,245,250,255,287,290 as noted | Pin 40: A1; pins26-40 are A15-A1, explicitly 65C02 address inputs. |
| 182 | iou2c | pin 2 (GR) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 2: GR graphics mode enable output. |
| 183 | iou2c | pin 3 (SEGA) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 3: SEGA with SEGB/VC selects character dot row in text mode. |
| 184 | iou2c | pin 4 (SEGB) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 4: SEGB with SEGA/VC in text; graphics low=hi-res, high=lo-res. |
| 185 | iou2c | pin 5 (VC) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 5: VC vertical-counter bit; character dot-row select or lo-res upper/lower block. |
| 186 | iou2c | pin 6 (/80COL) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 6: 80COL, 80-column video enable. |
| 187 | iou2c | pin 7 (CASSO) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin7 CASSO reserved confirmed. Source silent on added assertion that this is IIe cassette output and does not establish a usable IIc output direction. |
| 188 | iou2c | pin 8 (SPKR) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 8: SPKR speaker output; p.256 explains single IOU output bit controls speaker circuit. |
| 189 | iou2c | pin 9 (MD7) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin9 MD7 provides IOU flags on data bit7. Source silent on additional input path claimed by dir=bidir. Flag readout is not proof of bidirectionality. |
| 190 | iou2c | pin 10 (YMOVE) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 10: YMOVE mouse Y-movement input. |
| 191 | iou2c | pin 11 (NC) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 11: NC, not used. |
| 192 | iou2c | pin 12 (NC) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 12: NC, not used. |
| 193 | iou2c | pin 13 (PDL0/XMOVE) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 13: PDL0/XMOVE X-movement input; same DB-9 pin5 is paddle0 in hand-control mode (pp.284,287). |
| 194 | iou2c | pin 14 (R/W) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 14: R/W 65C02 read/write control. |
| 195 | iou2c | pin 15 (/RESET) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 15: RESET explicitly power-on/reset output; Sams p.8 describes CPU reset low then high at power-up and low while Control+Reset held. |
| 196 | iou2c | pin 16 (/IRQ) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 16: IRQ maskable interrupt to 65C02; p.243 IOU switch list includes mouse and VBL interrupts. |
| 197 | iou2c | pin 17 (RA0) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin17 RA0 and phase1 video/refresh address generation confirmed. Source silent on the extra input capability claimed by dir=bidir; shared connection to MMU outputs alone does not prove this. |
| 198 | iou2c | pin 18 (RA1) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin18 RA1 and phase1 video/refresh address generation confirmed. Source silent on the extra input capability claimed by dir=bidir; shared connection to MMU outputs alone does not prove this. |
| 199 | iou2c | pin 19 (RA2) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin19 RA2 and phase1 video/refresh address generation confirmed. Source silent on the extra input capability claimed by dir=bidir; shared connection to MMU outputs alone does not prove this. |
| 200 | iou2c | pin 20 (RA3) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin20 RA3 and phase1 video/refresh address generation confirmed. Source silent on the extra input capability claimed by dir=bidir; shared connection to MMU outputs alone does not prove this. |
| 201 | iou2c | pin 21 (RA4) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin21 RA4 and phase1 video/refresh address generation confirmed. Source silent on the extra input capability claimed by dir=bidir; shared connection to MMU outputs alone does not prove this. |
| 202 | iou2c | pin 22 (RA5) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin22 RA5 and phase1 video/refresh address generation confirmed. Source silent on the extra input capability claimed by dir=bidir; shared connection to MMU outputs alone does not prove this. |
| 203 | iou2c | pin 23 (RA6) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin23 RA6 and phase1 video/refresh address generation confirmed. Source silent on the extra input capability claimed by dir=bidir; shared connection to MMU outputs alone does not prove this. |
| 204 | iou2c | pin 24 (RA7) | UNVERIFIABLE | IIc pp.243-244 Fig.11-6/Table 11-8 | Pin24 RA7 and phase1 video/refresh address generation confirmed. Source silent on the extra input capability claimed by dir=bidir; shared connection to MMU outputs alone does not prove this. |
| 205 | iou2c | pin 25 (/PRAS) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 25: PRAS row-address strobe (phase0); TMG19 generates it. |
| 206 | iou2c | pin 26 (Φ0) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 26: Phase0 clock input; p.240 gives 1.0227 MHz, rounded 1.023 MHz. |
| 207 | iou2c | pin 27 (Q3) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 27: Q3 intermediate timing input; p.240 gives 2.045 MHz, approximately 2 MHz. |
| 208 | iou2c | pin 30 (/IOUSELIO) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 30: IOUSELIO derived from MMU SELIO24; GLU IOUHOLE controls IOUSELIO (p.246/Table 11-10 and schematic p.295). |
| 209 | iou2c | pin 31 (AKD) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 31: AKD any-key-down input from keyboard (also p.255). |
| 210 | iou2c | pin 32 (KSTRB) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 32: KSTRB keyboard strobe input (also p.255). |
| 211 | iou2c | pin 33 (VIDD7) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 33: VIDD7 video display data bit7 input; p.263 explains IOU modification of incoming high bits. |
| 212 | iou2c | pin 34 (VIDD6) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 34: VIDD6 video display data bit6 input; p.263 explains IOU modification of incoming high bits. |
| 213 | iou2c | pin 35 (/RA9) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 35: RA9 video display control output to character generator (also p.263). |
| 214 | iou2c | pin 37 (/CLRGAT) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 37: CLRGAT color-burst gate/enable output. |
| 215 | iou2c | pin 38 (/WNDW) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 38: WNDW display blanking output. |
| 216 | iou2c | pin 39 (/SYNC) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 39: SYNC display synchronization output. P.258 describes 65 horizontal-counter states per line and p.240 about 1.023 MHz clock: approximately 15.7 kHz line rate. Composite sync also includes vertical sync. |
| 217 | iou2c | pin 40 (H0) | CONFIRMED | IIc pp.243-244 Fig.11-6/Table 11-8; other pages as noted | Pin 40: H0 horizontal timing output, low bit of character counter. |
| 218 | tmg2c | pin 1 (14M) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 1: 14M explicitly 14.318-MHz master timing input. |
| 219 | tmg2c | pin 2 (7M) | UNVERIFIABLE | IIc pp.245-246 Tables 11-9/11-10, Fig.11-7/11-8 | Pin2/name/frequency confirmed. Source does not establish dir=out for TMG pin2; p.246 explicitly calls GLU20 the 7-MHz clock output. Cannot certify both ends as outputs from this source. |
| 220 | tmg2c | pin 4 (H0) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 4: H0 horizontal timing input from IOU40. |
| 221 | tmg2c | pin 5 (VIDD7) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 5: VIDD7 video data bit7 input; p.268 describes high bit sent to TMG for half-dot delay. |
| 222 | tmg2c | pin 6 (SEGB) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 6: SEGB video timing input from IOU4. |
| 223 | tmg2c | pin 7 (TEXT) | UNVERIFIABLE | IIc pp.245-246,272,292 Fig.11-7/Table 11-9 and Fig.11-44a | Pin7 TEXT/function confirmed. Direction is ambiguous across source descriptions: p.272 calls video TEXT a signal from TMG, but memory-expansion schematic p.292 routes TEXT into TMG7. Table11-9 supplies no direction. Cannot certify dir=out across board variants from this document. |
| 224 | tmg2c | pin 11 (/TMGEN) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 11: TMGEN enables master timing; schematic p.292 shows enable pulled low through RP3. |
| 225 | tmg2c | pin 12 (/LDPS) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 12: LDPS video shift-register load output; p.263 describes its operation. |
| 226 | tmg2c | pin 13 (VID7M) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 13: VID7M dot-clock enable, 7 MHz or continuous0; p.263 describes continuous-low 80-column state. |
| 227 | tmg2c | pin 14 (Φ1) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 14: Phase1 system clock output; p.240 gives 1.0227 MHz, rounded1.023 MHz. |
| 228 | tmg2c | pin 15 (Φ0) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 15: Phase0 system clock output; p.240 gives 1.0227 MHz, rounded1.023 MHz. |
| 229 | tmg2c | pin 16 (Q3) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 16: Q3 intermediate timing/strobe output; p.240 gives2.045 MHz asymmetric, approximately2.04 MHz. |
| 230 | tmg2c | pin 17 (/PCAS) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 17: PCAS RAM column-address strobe output; p.252 says TMG generates RAM strobes. |
| 231 | tmg2c | pin 18 (NC) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 18: NC reserved for testing; no usable signal is claimed. |
| 232 | tmg2c | pin 19 (/PRAS) | CONFIRMED | IIc p.245 Fig.11-7/Table 11-9; pp.240,252,263,268,292 as noted | Pin 19: PRAS RAM row-address strobe output; p.252 says TMG generates RAM strobes. |
| 233 | apple2c/7M | where/f | UNVERIFIABLE | IIc pp.245-248 Figs.11-7/11-8/11-9, Tables11-9/11-10/11-11 | Every pin checked: TMG2, GLU20, IWM24 correct. Source silent at claimed precision7.15909 MHz: p.245 specifies only7.159 MHz and p.248 says7 MHz. Rounded agreement does not establish extra digits. |
| 234 | apple2c/Colour reference (CREF) | where/f | UNVERIFIABLE | IIc pp.245-246 Figs.11-7/11-8, Tables11-9/11-10 | Both pins checked: TMG3 and GLU19 correct. Source silent at claimed precision3.579545 MHz; p.245 specifies3.5795 MHz, without the extra digits. |
| 235 | apple2c/Q3 | where/f | UNVERIFIABLE | IIc pp.240,242-245,247-248 Tables11-6 to11-11 | All four pins checked: TMG16, MMU4, IOU27, IWM25 correct. Source silent at claimed precision2.0454 MHz; p.240 gives2.045 MHz asymmetric, p.248 says2.0 MHz. Exact extra digit is not established. |

## Source links

No dead or wrong-document links found. Incomplete locators: item139 cites IIc p.234 but needs pp.273-274 for DB-19 pins and a controller-card source for its card-specific diagnosis. Clock items233-235 cite only TMG p.245 but need GLU p.246, IWM pp.247-248, MMU p.242, IOU pp.243-244 for the other pins. Additional supporting pages used for rail records are recorded in their rows.

Internal source inconsistencies were not copied into data: II p.107 DMA IN pin22 is contradicted by Fig.21 and p.108 (correct27); II Table30 omits NC14, established by Fig.18. IIc TEXT direction varies/appears ambiguous between prose and later schematic, so it remains UNVERIFIABLE.

Input SHA-256: 654ef01bf23ee9de36bb6f7e814e954c70e8758f7b35d4db61ee1d46e7082c19
