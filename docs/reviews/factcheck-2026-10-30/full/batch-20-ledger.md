# Batch-20 fact-check ledger

All 262 items reviewed. One decision per item. WRONG takes precedence over additional unsupported subclaims. UNVERIFIABLE identifies a specific claim unsupported by the documents cited by that item; supported portions are retained in the evidence column. No claim was confirmed from its own wording.

Principles: all findings map to **prove-it-works**. Copied component names, omitted load conditions, and omitted operating states also map to **fix-root-causes**. **serialize-shared-state-mutations** has no applicable finding: this is a read-only data review.

## Source key

- S0: [HERO Jr Technical Manual](https://archive.org/download/hero-jr-technical/HeroJr%20595-3271%20Technical.pdf). PDF page = printed page + 2. Saved original: batch-20/s0.pdf. HTTP 200, readable scan.
- S1: [HERO Jr Schematics](https://archive.org/download/hero-jr-schematics/HeroJr%20595-3271%20Schematics.pdf). PDF pages 1-4 = schematic sheets 1-4. Saved original: batch-20/s1.pdf. HTTP 200, readable scan.
- S2: [Model 4/4P Technical Reference Manual (1984)](https://archive.org/download/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation.pdf). Hardware PDF page = printed page + 6. Saved original: batch-20/s2.pdf. HTTP 200, readable scan.
- S3: [Model 4 Technical Reference Manual (1983)](https://archive.org/download/model-4-technical-reference-manual/Model%204%20Technical%20Reference%20Manual%20(1983)(Tandy%20Corporation)(pdf).pdf). Hardware PDF page = printed page + 16. Saved original: batch-20/s3.pdf. HTTP 200, readable scan.
- S4: [Model III Service Manual](https://archive.org/download/Model_III_Microcomputer_Service_Manual_19xx_Tandy/Model_III_Microcomputer_Service_Manual_19xx_Tandy.pdf). PDF page = printed page + 7. Saved original: batch-20/s4.pdf. HTTP 200, readable scan.
- S5: [Sams Computerfacts Model III](https://archive.org/download/Sams_Computerfacts_TRS-80_Model_III_1985_Howard_Sams/Sams_Computerfacts_TRS-80_Model_III_1985_Howard_Sams.pdf). Printed service-check page II = PDF page 3. Saved original: batch-20/s5.pdf. HTTP 200, readable scan.
- S6: [Model III Technical Reference Manual](https://archive.org/download/Model_III_Technical_Reference_Manual_1981_Tandy/Model_III_Technical_Reference_Manual_1981_Tandy.pdf). PDF page = printed page + 11. Saved original: batch-20/s6.pdf. HTTP 200, readable scan.

Acquisition: requested curl -L -A Mozilla/5.0 was attempted. Windows curl failed locally with SEC_E_NO_CREDENTIALS before contacting the server. Python urllib with the same user agent retrieved all seven cited original PDFs. pdftotext -layout was run on each; these are image scans, so original pages were rendered with pdftoppm -f N -l N -r 110 -png and read visually. Archive OCR derivatives were used to locate passages, with claims checked against original page images. No cited PDF was dead or blocked.

## Citation issues

- HERO rail citation #page=21 lands on printed p.19, not the labelled p.20. It does contain the charger discussion. Pin-specific first-ten citations need the schematic where noted below.
- The Model 4/4P p.53 J4/J5 table has a printed error: EXTIOSEL splits into numbered rows 43 and 44; subsequent pin labels shift, leaving an unnumbered final GND. Use Model 4 1983 p.37 schematic or Model III Fig.13 for the correct odd-pin signals and even-pin grounds. This table error was not used to reject assignments independently established by the schematics.
- Model 4 printer, cassette and RCA CRT entries can cite their own schematics: S3 printed pp.37,39,147. Their cited Model III schematics were cross-checked against those Model 4 drawings.
- Item 257 cites Tandy 1983 for a Sams-specific gate-array supply diagnosis. The actual Sams Model 4 drawing is not cited.

## Per-item decisions

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | herojr/CPU crystal Y201 | CPU pin 38 to pin 39; name and frequency | CONFIRMED | S0 pp.24,33 | 4 MHz Y201 /4; chart identifies CPU XTAL=38, EXTAL=39. |
| 1 | herojr/E clock (crystal divided by four) | CPU pin 37; pia6821 pin 25; ACIA pin 14 (RTA-1-3 RS-232 option); name and frequency | UNVERIFIABLE | S0 pp.24,34 | 1 MHz CPU E pin 37 and PIA E pin 25 supported. Source is silent on ACIA pin 14 wiring; separately cited S1 sheet 3 would support it, but this item does not cite S1. |
| 2 | herojr/RTC crystal Y202 (oscillator U221E, buffer U221A) | RTC pin 2 to pin 3; name and frequency | WRONG | S0 pp.8,27,34 | HIGH: Measure U213 pin 2 relative to circuit ground, not pin 3. U221E/Y202 generate 32.768 kHz; U221A feeds U213-2. Pin 3 is unused in this external-clock arrangement (also shown S1 sheet 3). |
| 3 | herojr/Sonar resonator Y301 | TL851 pin 11 to pin 12; name and frequency | CONFIRMED | S0 pp.35,41 | Y301=420 kHz; TL851 XTAL1=11 and XTAL2=12. |
| 4 | herojr/Sonar transmit (resonator divided by 8.5, 16 pulses per ping) | TL851 pin 2; name and frequency | CONFIRMED | S0 pp.22-23,35 | Fig.1 U307-2 XMIT: 16 pulses at 49.4 kHz. Text specifies resonator /8.5 for first 16 cycles. |
| 5 | herojr/Switching regulator U302 (fixed frequency) | Power/sense board, U302 and Q301; name and frequency | CONFIRMED | S0 p.20 | U302 fixed oscillator approximately 25 kHz set by R309/C308; drives Q302/Q301. |
| 6 | herojr/Charger | herojr-charger pin 2 to pin 3; expectation and ifNot | UNVERIFIABLE | S0 pp.15,19 | 12 V at max charge current rising to 16 V and charger/P1/J1/P307/U301 fault candidates supported. Source is silent on charger connector pin 2-to-3. Add S1 sheet 1 citation. |
| 7 | herojr/Battery | herojr-p310 pin 2; expectation and ifNot | UNVERIFIABLE | S0 pp.13,15,20 | Below 10 V battery warning and fault lists supported. Source is silent on 11-14 V acceptance range and P310 pin 2; pin needs S1 sheet 1 citation. |
| 8 | herojr/+5 V Vcc | herojr-p201 pin 10; CPU pin 8; expectation and ifNot | WRONG | S0 pp.13,17,20-21,33 | MEDIUM: Vcc normally shuts off in sleep, but RTC pulses regulator ON every 5 seconds for CPU input checks. Unconditional 0 V asleep misses those pulses. CPU Vcc=8 supported; P201-10 needs S1 citation. |
| 9 | herojr/Vca (always-on 5 V) | RTC pin 24; expectation and ifNot | CONFIRMED | S0 pp.13,17,24,34 | U209 provides 5 V Vca while SW1 on including sleep. RTC VDD=24. Memory chart explicitly says U209 if no 5.0 V. |
| 10 | herojr/Reset | CPU pin 40; RTC pin 18; expectation and ifNot | UNVERIFIABLE | S0 pp.13,28,33-34 | CPU RESET=40, RTC RESET=18, active-low reset, U221/U222/U201 fault candidates supported. Source is silent on the stated power-up waveform/timing; explicit RC wiring needs S1 sheet 3 citation. |
| 11 | herojr/CPU clock | CPU pin 37; expectation and ifNot | UNVERIFIABLE | S0 p.24 | CPU pin 37=1 MHz from 4 MHz Y201 /4 supported. Source is silent on proposed flat-clock diagnostic order Y201 then U201. |
| 12 | herojr/Real-time clock | RTC pin 2; expectation and ifNot | UNVERIFIABLE | S0 pp.8,14-15 | U213-2, 32.768 kHz +/-0.001 kHz, C228 supported. Source is silent on no-data-LED-flashing attribution to U213/U221; p.14 instead lists P301/U304/D308. U213/U221 appear under unable to enter time/date on p.15. |
| 13 | herojr/Sonar | herojr-p201 pin 20; TL851 pin 14; TL851 pin 2; expectation and ifNot | CONFIRMED | S0 pp.14,21-23,35 | P201-20 sense enable; after 5 ms TL851 INIT pin 14; XMIT pin 2 gives 16 pulses 49.4 kHz. Fault list matches p.14 including its printed U314. |
| 14 | herojr/Battery | Low-voltage comparator U303; herojr-p310 pin 2 (switched); voltage and note | UNVERIFIABLE | S0 p.20; S1 sheets1,4 | Series 6 V batteries, switched P310-2, U303 below 10 V threshold supported. Sources silent on 12-14 hour charging advice; mentioned owner guide is not cited. |
| 15 | herojr/+5 V regulated (Vcc) | CPU pin 8 (VCC); herojr-p201 pins 10, 11; switching regulator U302; voltage and note | WRONG | S0 pp.17,20-21; S1 sheets1,3,4 | MEDIUM: Sleep includes regulator wake pulse every 5 seconds, so 0 V asleep is not unconditional. Sources specify nominal 5 V, not 4.9-5.1 V tolerance. CPU8, P201-10/11, U302, shutdown P201-14 match schematic. |
| 16 | herojr/+5 V switched (+5SW) | Q314 output; ADC0831 pin 8; TL851 pin 1; TL852 pin 5; voltage and note | CONFIRMED | S0 p.21; S1 sheets1,4 | Sense Enable P201-20 drives Q314 supplying+5SW. ADC0831 Vcc 8, TL851 Vcc 1, TL852 Vcc 5 on switched rail. |
| 17 | herojr/Vca (always on) | U209 output; RTC pin 24 (VDD); voltage and note | CONFIRMED | S0 pp.17,24; S1 sheets1,3 | U209 Vca 5 V whenever SW1 on; RTC VDD24, U221/U222/U202 powered; RAM retention J202/J204/J206. |
| 18 | herojr/-10 V | herojr-p201 pin 9; U219 pin 1; voltage and note | CONFIRMED | S0 p.21; S1 sheets1,3,4 | Negative 10 V half-wave doubler C312/D302/D303/C313 driven by Q301; P201-9, U219-1 connect to rail. |
| 19 | model4/RS-232 baud clock | Baud rate generator clock input; name and frequency | CONFIRMED | S2 p.51 | BRG U104 takes 5.0688 MHz from system timing circuit. |
| 20 | model4/m4-iobus | pin 1; name/type/description/expectation | WRONG | S3 pp.26,28,37(sheet4) | HIGH: Pin 1 = XDB0. Buffered data/address enabled by ECH bit 4 ENEXTIO. Name swapped with adjacent pin; correct name XDB0. Description/type already describe correct pin. |
| 21 | model4/m4-iobus | pin 2; name/type/description/expectation | WRONG | S3 pp.26,28,37(sheet4) | HIGH: Pin 2 = GND. All even pins explicitly grounded, 0 V. Name swapped with adjacent pin; correct name GND. Description/type already describe correct pin. |
| 22 | model4/m4-iobus | pin 3; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 3 = XDB1. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 23 | model4/m4-iobus | pin 4; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 4 = GND. All even pins explicitly grounded, 0 V. |
| 24 | model4/m4-iobus | pin 5; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 5 = XDB2. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 25 | model4/m4-iobus | pin 6; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 6 = GND. All even pins explicitly grounded, 0 V. |
| 26 | model4/m4-iobus | pin 7; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 7 = XDB3. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 27 | model4/m4-iobus | pin 8; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 8 = GND. All even pins explicitly grounded, 0 V. |
| 28 | model4/m4-iobus | pin 9; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 9 = XDB4. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 29 | model4/m4-iobus | pin 11; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 11 = XDB5. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 30 | model4/m4-iobus | pin 12; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 12 = GND. All even pins explicitly grounded, 0 V. |
| 31 | model4/m4-iobus | pin 13; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 13 = XDB6. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 32 | model4/m4-iobus | pin 14; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 14 = GND. All even pins explicitly grounded, 0 V. |
| 33 | model4/m4-iobus | pin 15; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 15 = XDB7. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 34 | model4/m4-iobus | pin 17; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 17 = XA0. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 35 | model4/m4-iobus | pin 18; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 18 = GND. All even pins explicitly grounded, 0 V. |
| 36 | model4/m4-iobus | pin 19; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 19 = XA1. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 37 | model4/m4-iobus | pin 20; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 20 = GND. All even pins explicitly grounded, 0 V. |
| 38 | model4/m4-iobus | pin 21; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 21 = XA2. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 39 | model4/m4-iobus | pin 22; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 22 = GND. All even pins explicitly grounded, 0 V. |
| 40 | model4/m4-iobus | pin 23; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 23 = XA3. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 41 | model4/m4-iobus | pin 24; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 24 = GND. All even pins explicitly grounded, 0 V. |
| 42 | model4/m4-iobus | pin 25; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 25 = XA4. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 43 | model4/m4-iobus | pin 26; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 26 = GND. All even pins explicitly grounded, 0 V. |
| 44 | model4/m4-iobus | pin 27; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 27 = XA5. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 45 | model4/m4-iobus | pin 28; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 28 = GND. All even pins explicitly grounded, 0 V. |
| 46 | model4/m4-iobus | pin 29; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 29 = XA6. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 47 | model4/m4-iobus | pin 30; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 30 = GND. All even pins explicitly grounded, 0 V. |
| 48 | model4/m4-iobus | pin 31; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 31 = XA7. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 49 | model4/m4-iobus | pin 32; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 32 = GND. All even pins explicitly grounded, 0 V. |
| 50 | model4/m4-iobus | pin 33; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 33 = XIN*. IN* gated with IORQ. |
| 51 | model4/m4-iobus | pin 34; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 34 = GND. All even pins explicitly grounded, 0 V. |
| 52 | model4/m4-iobus | pin 35; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 35 = XOUT*. OUT* gated with IORQ. |
| 53 | model4/m4-iobus | pin 36; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 36 = GND. All even pins explicitly grounded, 0 V. |
| 54 | model4/m4-iobus | pin 37; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 37 = XRESET*. Buffered system reset. |
| 55 | model4/m4-iobus | pin 38; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 38 = GND. All even pins explicitly grounded, 0 V. |
| 56 | model4/m4-iobus | pin 39; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 39 = IOBUSINT*. External interrupt, E0H bit 3 enables. |
| 57 | model4/m4-iobus | pin 40; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 40 = GND. All even pins explicitly grounded, 0 V. |
| 58 | model4/m4-iobus | pin 41; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 41 = IOBUSWAIT*. Wait input; recommended <=500 us at 25% duty; refresh inhibited. |
| 59 | model4/m4-iobus | pin 42; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 42 = GND. All even pins explicitly grounded, 0 V. |
| 60 | model4/m4-iobus | pin 43; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 43 = EXTIOSEL*. Active-low input switches data transceiver for external bus read. |
| 61 | model4/m4-iobus | pin 44; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 44 = GND. All even pins explicitly grounded, 0 V. |
| 62 | model4/m4-iobus | pin 45; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 45 = NC. Unwired contact. |
| 63 | model4/m4-iobus | pin 47; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 47 = XM1*. Buffered Z80 M1*. |
| 64 | model4/m4-iobus | pin 48; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 48 = GND. All even pins explicitly grounded, 0 V. |
| 65 | model4/m4-iobus | pin 49; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 49 = XIORQ*. Buffered Z80 IORQ*. |
| 66 | model4/m4-iobus | pin 50; name/type/description/expectation | CONFIRMED | S3 pp.26,28,37(sheet4) | Pin 50 = GND. All even pins explicitly grounded, 0 V. |
| 67 | model4/m4-rs232 | pin 1; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 1 = PGND protective ground, 0 V. |
| 68 | model4/m4-rs232 | pin 2; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 2 = TD transmit output. |
| 69 | model4/m4-rs232 | pin 3; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 3 = RD receive input. |
| 70 | model4/m4-rs232 | pin 4; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 4 = RTS output. |
| 71 | model4/m4-rs232 | pin 5; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 5 = CTS input. |
| 72 | model4/m4-rs232 | pin 6; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 6 = DSR input. |
| 73 | model4/m4-rs232 | pin 7; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 7 = SGND signal ground, 0 V. |
| 74 | model4/m4-rs232 | pin 8; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 8 = CD input. |
| 75 | model4/m4-rs232 | pin 19; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 19 = SRTS output. |
| 76 | model4/m4-rs232 | pin 20; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 20 = DTR output. |
| 77 | model4/m4-rs232 | pin 22; name/type/description/expectation | CONFIRMED | S2 pp.51,53 | DB25 pin 22 = RI input. |
| 78 | model3/m3-psu | pin 1; name/type/description/expectation | CONFIRMED | S4 pp.67-69; S5 printedII; S6 pp.13,34 | Pin 1=-12 V, max 0.1 A, magnitude 11-15 V. -12 V feeds MC7905C for RAM -5 V. |
| 79 | model3/m3-psu | pin 2; name/type/description/expectation | CONFIRMED | S4 pp.67-69; S5 printedII; S6 pp.13,34 | Pin 2=+12 V, max 2.02 A, 11.40-12.60 V; monitor/drives/RAM loads. |
| 80 | model3/m3-psu | pin 3; name/type/description/expectation | CONFIRMED | S4 pp.67-69; S5 printedII; S6 pp.13,34 | Pin 3=common, 0 V. |
| 81 | model3/m3-psu | pin 4; name/type/description/expectation | WRONG | S4 pp.67-69 | MEDIUM: Pin 4=+5 V, 2.5 A max, 4.75-5.25 V supported. 50 mV is peak-to-peak ripple under resistive test load ONLY; table footnote excludes system operating conditions. Restore that condition. |
| 82 | model3/Fuse resistor | R25 (2 Ω) on the supply board, mains off; expectation and ifNot | CONFIRMED | S4 pp.68,70-71 | R25=2 ohm, 2 W fuse resistor. Do not apply power until failure cause found. Check bridge, switching Q2, catch D3 and disconnected secondary rectifiers/capacitors. BR1/T2 text typos resolved by schematic/component list DB1/Q2. |
| 83 | model3/Supply starts on a variac | Main supply outputs (SK2, SK3, SK4) pin 4 to pin 3; expectation and ifNot | UNVERIFIABLE | S4 pp.67-68,71 | SK2/SK3/SK4 pin 4-to-3, isolation, 0.45 A +5/0.3 A +12 minimum loads, 40-60 VAC start, 95 VAC regulation, R9 B+120-140 V at 95 VAC supported. Source silent on low-B+ line-choke/SW1 diagnosis; instead lists BR1, R2, D2, C5/C6. |
| 84 | model3/Crystal Y1 (main oscillator) | Y1 at U2-8; name and frequency | CONFIRMED | S6 pp.16,36 | 10.1376 MHz Y1 oscillator; U2 pin 8 is oscillator inverter output. |
| 85 | model3/CPU clock (÷5, U62) | Z80A pin 6; name and frequency | CONFIRMED | S6 pp.13,33 | 10.1376 MHz /5 by U62=2.02752 MHz PCLOCK at Z80 pin 6. |
| 86 | model3/Horizontal drive (HDRV) | U23-13 (HSYNC); name and frequency | CONFIRMED | S6 pp.13,16,32 | HDRV15.840 kHz, U23 HSYNC output 13. |
| 87 | model3/Vertical drive (VDRV) | U23-12 (VSYNC); name and frequency | CONFIRMED | S6 pp.13,16,18,32 | VDRV nominal 50/60 Hz selected by jumper, U23 VSYNC12. |
| 88 | model3/Disk controller clock | 1793 pin 24; name and frequency | CONFIRMED | S6 pp.46,53 | 4 MHz divided twice by U24 to 1 MHz pin 8; traced to 1793 CLK24. |
| 89 | model3/RS-232 baud clock | RS-232 board BRG clock input; name and frequency | CONFIRMED | S6 p.57 | BR19411 takes 5.0688 MHz supplied by CPU board. |
| 90 | model3/m3-iobus | pin 1; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 1 = XDB0. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 91 | model3/m3-iobus | pin 2; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 2 = GND. All even pins explicitly grounded, 0 V. |
| 92 | model3/m3-iobus | pin 3; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 3 = XDB1. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 93 | model3/m3-iobus | pin 4; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 4 = GND. All even pins explicitly grounded, 0 V. |
| 94 | model3/m3-iobus | pin 5; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 5 = XDB2. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 95 | model3/m3-iobus | pin 6; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 6 = GND. All even pins explicitly grounded, 0 V. |
| 96 | model3/m3-iobus | pin 7; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 7 = XDB3. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 97 | model3/m3-iobus | pin 8; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 8 = GND. All even pins explicitly grounded, 0 V. |
| 98 | model3/m3-iobus | pin 9; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 9 = XDB4. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 99 | model3/m3-iobus | pin 10; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 10 = GND. All even pins explicitly grounded, 0 V. |
| 100 | model3/m3-iobus | pin 11; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 11 = XDB5. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 101 | model3/m3-iobus | pin 13; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 13 = XDB6. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 102 | model3/m3-iobus | pin 14; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 14 = GND. All even pins explicitly grounded, 0 V. |
| 103 | model3/m3-iobus | pin 15; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 15 = XDB7. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 104 | model3/m3-iobus | pin 16; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 16 = GND. All even pins explicitly grounded, 0 V. |
| 105 | model3/m3-iobus | pin 17; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 17 = XA0. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 106 | model3/m3-iobus | pin 19; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 19 = XA1. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 107 | model3/m3-iobus | pin 20; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 20 = GND. All even pins explicitly grounded, 0 V. |
| 108 | model3/m3-iobus | pin 22; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 22 = GND. All even pins explicitly grounded, 0 V. |
| 109 | model3/m3-iobus | pin 23; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 23 = XA3. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 110 | model3/m3-iobus | pin 24; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 24 = GND. All even pins explicitly grounded, 0 V. |
| 111 | model3/m3-iobus | pin 25; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 25 = XA4. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 112 | model3/m3-iobus | pin 26; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 26 = GND. All even pins explicitly grounded, 0 V. |
| 113 | model3/m3-iobus | pin 27; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 27 = XA5. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 114 | model3/m3-iobus | pin 28; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 28 = GND. All even pins explicitly grounded, 0 V. |
| 115 | model3/m3-iobus | pin 29; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 29 = XA6. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 116 | model3/m3-iobus | pin 30; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 30 = GND. All even pins explicitly grounded, 0 V. |
| 117 | model3/m3-iobus | pin 31; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 31 = XA7. Buffered data/address enabled by ECH bit 4 ENEXTIO. |
| 118 | model3/m3-iobus | pin 32; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 32 = GND. All even pins explicitly grounded, 0 V. |
| 119 | model3/m3-iobus | pin 33; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 33 = XIN*. IN* gated with IORQ. |
| 120 | model3/m3-iobus | pin 34; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 34 = GND. All even pins explicitly grounded, 0 V. |
| 121 | model3/m3-iobus | pin 35; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 35 = XOUT*. OUT* gated with IORQ. |
| 122 | model3/m3-iobus | pin 36; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 36 = GND. All even pins explicitly grounded, 0 V. |
| 123 | model3/m3-iobus | pin 37; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 37 = XRESET*. Buffered system reset. |
| 124 | model3/m3-iobus | pin 38; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 38 = GND. All even pins explicitly grounded, 0 V. |
| 125 | model3/m3-iobus | pin 39; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 39 = IOBUSINT*. External interrupt, E0H bit 3 enables. |
| 126 | model3/m3-iobus | pin 40; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 40 = GND. All even pins explicitly grounded, 0 V. |
| 127 | model3/m3-iobus | pin 41; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 41 = IOBUSWAIT*. Wait input; recommended <=500 us at 25% duty; refresh inhibited. |
| 128 | model3/m3-iobus | pin 43; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 43 = EXTIOSEL*. Active-low input switches data transceiver for external bus read. |
| 129 | model3/m3-iobus | pin 44; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 44 = GND. All even pins explicitly grounded, 0 V. |
| 130 | model3/m3-iobus | pin 45; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 45 = NC. Unwired contact. |
| 131 | model3/m3-iobus | pin 46; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 46 = GND. All even pins explicitly grounded, 0 V. |
| 132 | model3/m3-iobus | pin 47; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 47 = XM1*. Buffered Z80 M1*. |
| 133 | model3/m3-iobus | pin 49; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 49 = XIORQ*. Buffered Z80 IORQ*. |
| 134 | model3/m3-iobus | pin 50; name/type/description/expectation | CONFIRMED | S6 pp.19,21-22,40(Fig.13) | Pin 50 = GND. All even pins explicitly grounded, 0 V. |
| 135 | model3/m3-printer | pin 1; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 1 = STROBE*. Active-low strobe from U93 one-shot on F8H write. |
| 136 | model3/m3-printer | pin 2; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 2 = GND. Explicit schematic ground, 0 V. |
| 137 | model3/m3-printer | pin 3; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 3 = DATA 0. U94 latches data on F8H write. |
| 138 | model3/m3-printer | pin 4; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 4 = GND. Explicit schematic ground, 0 V. |
| 139 | model3/m3-printer | pin 7; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 7 = DATA 2. U94 latches data on F8H write. |
| 140 | model3/m3-printer | pin 8; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 8 = GND. Explicit schematic ground, 0 V. |
| 141 | model3/m3-printer | pin 9; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 9 = DATA 3. U94 latches data on F8H write. |
| 142 | model3/m3-printer | pin 10; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 10 = GND. Explicit schematic ground, 0 V. |
| 143 | model3/m3-printer | pin 11; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 11 = DATA 4. U94 latches data on F8H write. |
| 144 | model3/m3-printer | pin 12; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 12 = GND. Explicit schematic ground, 0 V. |
| 145 | model3/m3-printer | pin 13; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 13 = DATA 5. U94 latches data on F8H write. |
| 146 | model3/m3-printer | pin 14; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 14 = GND. Explicit schematic ground, 0 V. |
| 147 | model3/m3-printer | pin 15; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 15 = DATA 6. U94 latches data on F8H write. |
| 148 | model3/m3-printer | pin 16; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 16 = GND. Explicit schematic ground, 0 V. |
| 149 | model3/m3-printer | pin 17; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 17 = DATA 7. U94 latches data on F8H write. |
| 150 | model3/m3-printer | pin 18; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 18 = GND. Explicit schematic ground, 0 V. |
| 151 | model3/m3-printer | pin 19; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 19 = STATUS IN. Spare status input into U95.  |
| 152 | model3/m3-printer | pin 20; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 20 = GND. Explicit schematic ground, 0 V. |
| 153 | model3/m3-printer | pin 21; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 21 = BUSY. HIGH busy, F8H bit 7; 4.7 kohm pullup. |
| 154 | model3/m3-printer | pin 22; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 22 = GND. Explicit schematic ground, 0 V. |
| 155 | model3/m3-printer | pin 23; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 23 = OUTPAPER. HIGH paper out, F8H bit 6. |
| 156 | model3/m3-printer | pin 24; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 24 = GND. Explicit schematic ground, 0 V. |
| 157 | model3/m3-printer | pin 25; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 25 = UNIT SELECT. HIGH selected, F8H bit 5; 4.7 kohm pullup. |
| 158 | model3/m3-printer | pin 26; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 26 = NC. Explicit NC in drawing. |
| 159 | model3/m3-printer | pin 27; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 27 = GND. Explicit schematic ground, 0 V. |
| 160 | model3/m3-printer | pin 29; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 29 = STATUS IN. Spare status input into U95. FB2 in Model III. |
| 161 | model3/m3-printer | pin 30; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 30 = STATUS IN. Spare status input into U95. FB1 in Model III. |
| 162 | model3/m3-printer | pin 31; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 31 = NC. Explicit NC in drawing. |
| 163 | model3/m3-printer | pin 33; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 33 = NC. Explicit NC in drawing. |
| 164 | model3/m3-printer | pin 34; name/type/description/expectation | CONFIRMED | S6 pp.15,18,39(Fig.12) | Printer edge pin 34 = GND. Explicit schematic ground, 0 V. |
| 165 | model3/m3-cassette | pin 1; name/type/description/expectation | CONFIRMED | S6 pp.17-18,38(Fig.11) | K1 contact shorts 1-to-3 when ECH bit 1 set. |
| 166 | model3/m3-cassette | pin 2; name/type/description/expectation | CONFIRMED | S6 pp.17-18,38(Fig.11) | Pin 2=circuit ground, 0 V. |
| 167 | model3/m3-cassette | pin 3; name/type/description/expectation | CONFIRMED | S6 pp.17-18,38(Fig.11) | Other K1 contact, open to 1 while relay off; ModelIII CR1/CR2 shown. |
| 168 | model3/m3-cassette | pin 4; name/type/description/expectation | CONFIRMED | S6 pp.17-18,38(Fig.11) | Pin 4 cassette input; MC1741/MC1458 500 baud filter, U96 1500 baud zero-crossing. |
| 169 | model3/m3-cassette | pin 5; name/type/description/expectation | CONFIRMED | S6 pp.17-18,38(Fig.11) | Pin 5 cassette output resistor ladder; data 00=0.4 V, 01=0.8 V, 02=0 V per text. |
| 170 | model3/m3-rs232 | pin 1; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 1 = PGND protective ground, 0 V.  |
| 171 | model3/m3-rs232 | pin 2; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 2 = TD transmit output.  |
| 172 | model3/m3-rs232 | pin 3; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 3 = RD receive input. Receiver level E8H bit 0. |
| 173 | model3/m3-rs232 | pin 4; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 4 = RTS output. EAH bit 0 with UART control register disabled. |
| 174 | model3/m3-rs232 | pin 5; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 5 = CTS input. E8H bit 7. |
| 175 | model3/m3-rs232 | pin 6; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 6 = DSR input. E8H bit 6. |
| 176 | model3/m3-rs232 | pin 7; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 7 = SGND signal ground, 0 V.  |
| 177 | model3/m3-rs232 | pin 8; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 8 = CD input. E8H bit 5. |
| 178 | model3/m3-rs232 | pin 20; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 20 = DTR output. EAH bit 1 with UART control register disabled. |
| 179 | model3/m3-rs232 | pin 22; name/type/description/expectation | CONFIRMED | S6 pp.58-60 | DB25 pin 22 = RI input. E8H bit 4. |
| 180 | model3/m3-crt | pin 1; name/type/description/expectation | CONFIRMED | S6 pp.75,79; S5 printedII | CRT edge pin 1 = GND, 0 V. Connector drawing matches. |
| 181 | model3/m3-crt | pin 2; name/type/description/expectation | CONFIRMED | S6 pp.75,79; S5 printedII | CRT edge pin 2 = NC. Connector drawing matches. |
| 182 | model3/m3-crt | pin 3; name/type/description/expectation | CONFIRMED | S6 pp.75,79; S5 printedII | CRT edge pin 3 = GND, 0 V. Connector drawing matches. |
| 183 | model3/m3-crt | pin 4; name/type/description/expectation | CONFIRMED | S6 pp.75,79; S5 printedII | CRT edge pin 4 = E304 connection. Drawing directly labels E304; record asserts no further function. |
| 184 | model3/m3-crt | pin 6; name/type/description/expectation | CONFIRMED | S6 pp.75,79; S5 printedII | CRT edge pin 6 = Horizontal sync. Positive 4-25 us TTL pulses; Q701 sync input. Monitor scan nominal 15.6 kHz +/-500 Hz; CPU source 15.840 kHz. |
| 185 | model3/m3-crt | pin 8; name/type/description/expectation | CONFIRMED | S6 pp.75,79; S5 printedII | CRT edge pin 8 = Video input. Positive-white TTL4 V +/-1.5 V; amplifier Q302. |
| 186 | model3/m3-crt | pin 9; name/type/description/expectation | CONFIRMED | S6 pp.75,79; S5 printedII | CRT edge pin 9 = Vertical sync. Negative 100-1400 us TTL pulses; Q601; 50/60 Hz. |
| 187 | model3/m3-crt | pin 10; name/type/description/expectation | CONFIRMED | S6 pp.75,79; S5 printedII | CRT edge pin 10 = GND, 0 V. Connector drawing matches. |
| 188 | model3/-5 V for the 4116s | 4116 pin 1; expectation and ifNot | CONFIRMED | S6 pp.13,34 | RAM requires -5 V from MC7905C with -12 V input; schematic connects -5 V to RAM pin 1. Loss of required supply prevents valid operation; no irreversible damage inferred. |
| 189 | model3/+5 V | Z80A pin 11; m3-psu pin 4 (SK2); voltage and note | WRONG | S4 p.69; S6 pp.13,33 | MEDIUM: +5 V, Z80 pin 11, SK2 pin 4, 4.75-5.25 V correct. 50 mV ripple is peak-to-peak under resistive load only, explicitly NOT system operating conditions. |
| 190 | model3/+12 V | 4116 pin 8; m3-psu pin 2 (SK2); voltage and note | WRONG | S4 p.69; S6 p.34 | MEDIUM: +12 V at RAM pin 8, SK2 pin 2, 11.40-12.60 V correct. 150 mV ripple is peak-to-peak under resistive load only, explicitly NOT system operating conditions. |
| 191 | model3/-12 V | m3-psu pin 1 (SK2); voltage and note | CONFIRMED | S4 pp.67,69; S6 pp.34,63 | SK2 pin 1=-12 V, magnitude 11-15 V; MC7905C and RS232 draw from -12 V. |
| 192 | model3/-5 V | 4116 pin 1; MC7905C output; voltage and note | CONFIRMED | S6 pp.13,34 | MC7905C -5 V output feeds RAM VBB1. Required supply; loss means RAM cannot function, not proof of permanent damage. |
| 193 | model4/Crystal Y1 (main) | Y1; name and frequency | CONFIRMED | S3 pp.15,41 | Y1=20.2752 MHz. |
| 194 | model4/Crystal Y2 (80 × 24 video) | Y2; name and frequency | CONFIRMED | S3 pp.15,41 | Y2=12.672 MHz for 80x 24 video. |
| 195 | model4/CPU clock, Model III mode | Z80A pin 6; name and frequency | CONFIRMED | S3 pp.15,31,41 | 20.2752 MHz /10=2.02752 MHz at 40-pin Z80A clock 6; 48-pin socket alternative separately labelled. |
| 196 | model4/CPU clock, fast mode | Z80A pin 6; name and frequency | CONFIRMED | S3 pp.15,31,41 | 20.2752 MHz /5=4.05504 MHz at 40-pin Z80A clock 6. |
| 197 | model4/Dot clock, 64 × 16 | PAL U4 to shift register U11; name and frequency | CONFIRMED | S3 pp.21,35,41 | 64x 16 shift clock PAL U4 to U11=10.1376 MHz. |
| 198 | model4/Dot clock, 80 × 24 | PAL U4 to shift register U11; name and frequency | CONFIRMED | S3 pp.21,35,41 | 80x 24 shift clock PAL U4 to U11=12.672 MHz. |
| 199 | model4/Disk controller clock | 1793 pin 24; name and frequency | CONFIRMED | S3 pp.60,63 | U24 pin 8=1 MHz traced to 1793 U7 CLK24. |
| 200 | model4/Real-time clock interrupt | From VSYNC; name and frequency | WRONG | S3 p.21 section3.1.9 | MEDIUM: RTC interrupt 30 Hz in 2 MHz mode and 60 Hz in 4 MHz mode; VSYNC division bypassed in fast mode. Unqualified 30 Hz incomplete. |
| 201 | model4/m4-printer | pin 1; name/type/description/expectation | WRONG | S3 pp.18,21,37(sheet4) | MEDIUM: Printer edge pin 1 = STROBE*. Active-low strobe from U65 one-shot on F8H write. Record names Model III U93; correct Model 4 one-shot U65. |
| 202 | model4/m4-printer | pin 2; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 2 = GND. Explicit schematic ground, 0 V. |
| 203 | model4/m4-printer | pin 3; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 3 = DATA 0. U66 latches data on F8H write. |
| 204 | model4/m4-printer | pin 4; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 4 = GND. Explicit schematic ground, 0 V. |
| 205 | model4/m4-printer | pin 5; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 5 = DATA 1. U66 latches data on F8H write. |
| 206 | model4/m4-printer | pin 6; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 6 = GND. Explicit schematic ground, 0 V. |
| 207 | model4/m4-printer | pin 7; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 7 = DATA 2. U66 latches data on F8H write. |
| 208 | model4/m4-printer | pin 8; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 8 = GND. Explicit schematic ground, 0 V. |
| 209 | model4/m4-printer | pin 9; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 9 = DATA 3. U66 latches data on F8H write. |
| 210 | model4/m4-printer | pin 10; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 10 = GND. Explicit schematic ground, 0 V. |
| 211 | model4/m4-printer | pin 11; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 11 = DATA 4. U66 latches data on F8H write. |
| 212 | model4/m4-printer | pin 12; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 12 = GND. Explicit schematic ground, 0 V. |
| 213 | model4/m4-printer | pin 13; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 13 = DATA 5. U66 latches data on F8H write. |
| 214 | model4/m4-printer | pin 15; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 15 = DATA 6. U66 latches data on F8H write. |
| 215 | model4/m4-printer | pin 16; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 16 = GND. Explicit schematic ground, 0 V. |
| 216 | model4/m4-printer | pin 18; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 18 = GND. Explicit schematic ground, 0 V. |
| 217 | model4/m4-printer | pin 19; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 19 = STATUS IN. Spare status input into U67. Model 4 schematic confirms spare routing. |
| 218 | model4/m4-printer | pin 20; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 20 = GND. Explicit schematic ground, 0 V. |
| 219 | model4/m4-printer | pin 21; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 21 = BUSY. HIGH busy, F8H bit 7; 4.7 kohm pullup. |
| 220 | model4/m4-printer | pin 22; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 22 = GND. Explicit schematic ground, 0 V. |
| 221 | model4/m4-printer | pin 23; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 23 = OUTPAPER. HIGH paper out, F8H bit 6. |
| 222 | model4/m4-printer | pin 24; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 24 = GND. Explicit schematic ground, 0 V. |
| 223 | model4/m4-printer | pin 25; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 25 = UNIT SELECT. HIGH selected, F8H bit 5; 4.7 kohm pullup. |
| 224 | model4/m4-printer | pin 26; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 26 = NC. Explicit NC in drawing. |
| 225 | model4/m4-printer | pin 27; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 27 = GND. Explicit schematic ground, 0 V. |
| 226 | model4/m4-printer | pin 28; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 28 = FAULT. FAULT, F8H bit 4; 4.7 kohm pullup. |
| 227 | model4/m4-printer | pin 29; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 29 = STATUS IN. Spare status input into U67. Model 4 schematic confirms spare routing. |
| 228 | model4/m4-printer | pin 30; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 30 = STATUS IN. Spare status input into U67. Model 4 schematic confirms spare routing. |
| 229 | model4/m4-printer | pin 31; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 31 = NC. Explicit NC in drawing. |
| 230 | model4/m4-printer | pin 32; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 32 = STATUS IN. Spare status input into U67. Model 4 schematic confirms spare routing. |
| 231 | model4/m4-printer | pin 34; name/type/description/expectation | CONFIRMED | S3 pp.18,21,37(sheet4) | Printer edge pin 34 = GND. Explicit schematic ground, 0 V. |
| 232 | model4/m4-cassette | pin 1; name/type/description/expectation | CONFIRMED | S3 pp.18,21,39(sheet5) | K1 contact shorts 1-to-3 when ECH bit 1 set. |
| 233 | model4/m4-cassette | pin 2; name/type/description/expectation | CONFIRMED | S3 pp.18,21,39(sheet5) | Pin 2=circuit ground, 0 V. |
| 234 | model4/m4-cassette | pin 3; name/type/description/expectation | CONFIRMED | S3 pp.18,21,39(sheet5) | Other K1 contact, open to 1 while relay off; ModelIII CR1/CR2 shown. |
| 235 | model4/m4-cassette | pin 4; name/type/description/expectation | CONFIRMED | S3 pp.18,21,39(sheet5) | Pin 4 cassette input; 500 baud U43/U28, 1500 baud U15 comparator. |
| 236 | model4/m4-psu | pin 1; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 1 = COM. Common, 0 V. |
| 237 | model4/m4-psu | pin 2; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 2 = +12 V V2. V2 11.40-12.60 V, 0.40-2.1 A. |
| 238 | model4/m4-psu | pin 4; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 4 = -12 V V4. V4 -11.40 to -12.60 V; max 0.1 A. |
| 239 | model4/m4-psu | pin 5; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 5 = +12 V V3. V3 11.40-12.60 V, 0.60-1.5 A. Regulates with+5 V per p.113. |
| 240 | model4/m4-psu | pin 6; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 6 = +12 V V3. V3 11.40-12.60 V, 0.60-1.5 A. Regulates with+5 V per p.113. |
| 241 | model4/m4-psu | pin 7; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 7 = +12 V V3. V3 11.40-12.60 V, 0.60-1.5 A. Regulates with+5 V per p.113. |
| 242 | model4/m4-psu | pin 8; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 8 = +5 V V1. V1 5.00-5.25 V, 1.35-4.0 A, 50 mV max peak-to-peak ripple. |
| 243 | model4/m4-psu | pin 9; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 9 = +5 V V1. V1 5.00-5.25 V, 1.35-4.0 A, 50 mV max peak-to-peak ripple. |
| 244 | model4/m4-psu | pin 10; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 10 = +5 V V1. V1 5.00-5.25 V, 1.35-4.0 A, 50 mV max peak-to-peak ripple. |
| 245 | model4/m4-psu | pin 11; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 11 = COM. Common, 0 V. |
| 246 | model4/m4-psu | pin 12; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 12 = COM. Common, 0 V. |
| 247 | model4/m4-psu | pin 13; name/type/description/expectation | CONFIRMED | S3 pp.113-114 | TB2 pin 13 = COM. Common, 0 V. |
| 248 | model4/m4-crt | pin 1; name/type/description/expectation | CONFIRMED | S3 pp.145,147(RCA); S6 pp.75,79 | CRT edge pin 1 = GND, 0 V. Connector drawing matches. |
| 249 | model4/m4-crt | pin 2; name/type/description/expectation | CONFIRMED | S3 pp.145,147(RCA); S6 pp.75,79 | CRT edge pin 2 = NC. Connector drawing matches. |
| 250 | model4/m4-crt | pin 3; name/type/description/expectation | CONFIRMED | S3 pp.145,147(RCA); S6 pp.75,79 | CRT edge pin 3 = GND, 0 V. Connector drawing matches. |
| 251 | model4/m4-crt | pin 4; name/type/description/expectation | CONFIRMED | S3 pp.145,147(RCA); S6 pp.75,79 | CRT edge pin 4 = E304 connection. Drawing directly labels E304; record asserts no further function. |
| 252 | model4/m4-crt | pin 6; name/type/description/expectation | CONFIRMED | S3 pp.145,147(RCA); S6 pp.75,79 | CRT edge pin 6 = Horizontal sync. Positive 4-25 us TTL pulses; Q701 sync input. Monitor scan nominal 15.6 kHz +/-500 Hz; CPU source 15.840 kHz. |
| 253 | model4/m4-crt | pin 7; name/type/description/expectation | CONFIRMED | S3 pp.145,147(RCA); S6 pp.75,79 | CRT edge pin 7 = +12 V through F101. 12 V nominal 1 A; F101 shown. |
| 254 | model4/m4-crt | pin 9; name/type/description/expectation | CONFIRMED | S3 pp.145,147(RCA); S6 pp.75,79 | CRT edge pin 9 = Vertical sync. Negative 100-1400 us TTL pulses; Q601; 50/60 Hz. |
| 255 | model4/m4-crt | pin 10; name/type/description/expectation | CONFIRMED | S3 pp.145,147(RCA); S6 pp.75,79 | CRT edge pin 10 = GND, 0 V. Connector drawing matches. |
| 256 | model4/+5 V | 65 W supply output (TB2, Astec AA12090) pin 10 to pin 1; Z80A pin 11; expectation and ifNot | WRONG | S3 pp.112-114,31 | MEDIUM: TB2 pin 10-to-1, Z80 pin 11, 5.00-5.25 V/50 mV, R14 B+260-270 V at 95 VAC, isolation/variac supported. Setup requires ALL minimum loads:+5=1.35 A,+12V2=0.40 A,+12V3=0.60 A,-12=0 A. Record only gives+5 load. R27/R28 added/removed to adjust, not potentiometer trims. |
| 257 | model4/+12 V | 65 W supply output (TB2, Astec AA12090) pin 2 to pin 1; pin 5 to pin 1; expectation and ifNot | UNVERIFIABLE | S3 pp.113-114 | TB2 pin 2/pin 5-to-1 both 11.40-12.60 V, SCR1/Z1 crowbar advice supported. Source silent on Sams gate-array supply CR8/L4/CR6/L2/C23/C18 diagnosis; cited source Tandy 1983, not asserted Sams drawing. |
| 258 | model4/+5 V | Z80A pin 11; m4-psu pins 8, 9, 10 (TB2); voltage and note | CONFIRMED | S3 pp.31,114; S2 p.51 | +5 V V1=5.00-5.25 V, 50 mV peak-to-peak maximum; TB2 pins 8/9/10; 40-pin Z80 Vcc 11. |
| 259 | model4/+12 V (V2) | m4-psu pin 2 (TB2); voltage and note | CONFIRMED | S3 pp.31,114; S2 p.51 | +12 V V2=11.40-12.60 V, TB2 pin 2, logic supply. |
| 260 | model4/+12 V (V3) | m4-psu pins 5, 6, 7 (TB2); voltage and note | CONFIRMED | S3 pp.31,114; S2 p.51 | +12 V V3=11.40-12.60 V, TB2 pins 5/6/7, drive/monitor supply. |
| 261 | model4/-12 V | m4-psu pin 4 (TB2); voltage and note | CONFIRMED | S3 pp.31,114; S2 p.51 | -12 V V4=-11.40 to -12.60 V, TB2 pin 4; RS232 negative driver supply. |

## Coverage

| kind | items | confirmed | wrong | unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 21 | 18 | 2 | 1 |
| connector-pin | 215 | 211 | 4 | 0 |
| first-ten | 13 | 4 | 2 | 7 |
| rail | 13 | 9 | 3 | 1 |
| **Total** | **262** | **242** | **11** | **9** |
