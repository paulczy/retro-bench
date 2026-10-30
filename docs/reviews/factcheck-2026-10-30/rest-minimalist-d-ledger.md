# Rest Minimalist D: complete source fact-check ledger

Scope: 152 previously unchecked items from rest-minimalist-d.json, read-only data copy identified by the user as commit 87c9b5a. Every supplied index has exactly one decision. Checked fields include pin number, name, direction, description, and the expected-reading field when present. An UNVERIFIABLE row can therefore have a confirmed physical pin while an added measurement or timing claim lacks cited support. No item is classified from verifiedAgainst text.

Method: grouped 48 distinct cited documents (URL fragments and Archive.org viewer pages collapsed to documents); attempted curl -L -A Mozilla/5.0. Windows Schannel failed with SEC_E_NO_CREDENTIALS on HTTPS, so downloaded those documents with Python HTTPS using the same User-Agent and redirects. PDFs passed through pdftotext -layout. Unusable text layers were rendered with pdftoppm -f N -l N -r 110 -png and visually read. PNG/GIF pinout figures linked inside cited HTML were read as source figures. Blocked archive links were searched; replacement primary drawings and the Oric service manual are identified as fallbacks. Archive.org OCR was used only to locate additional relevant pages in the scan-only MSX book; those pages were rendered and visually checked. Artifacts, source status logs, and page renders remain in this directory.

Decision policy: WRONG requires contradictory source evidence and includes a correction. UNVERIFIABLE identifies the exact silent/blocked/dead/unreadable component. General knowledge and a similar chip data sheet alone do not confirm an actual board connection. All sampled 4816 pins were independently compared with actual 4816A-3 symbols. Connector-local application numbering disclosed in the record summary was treated as a diagram convention, not an assertion of manufacturer numbering.

| Item kind | Checked | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 64 | 64 | 0 | 0 |
| connector-pin | 88 | 77 | 3 | 8 |
| **Total** | **152** | **141** | **3** | **8** |

No source-free chip or connector records occur in the supplied list. No complete record needs deletion solely for lack of a source. The unsupported additions identified below should be removed, marked unverified, or given the precise missing citation.

Lens application: subtract-before-you-add = remove false exclusivity and unsupported precision; outcome-oriented-execution = require a decision and page evidence for every supplied index; cost-aware-delegation = reuse downloaded documents across all related pins. No code review or application changes were performed.

## Per-item evidence

Rows are grouped by the source used for the decision. PDF page numbers are one-based. Printed page numbers are separately identified. HTML documents use the named section or figure instead of an invented page number.

| Index i | Record | Pin and claim | Decision | Source page | Evidence |
|---:|---|---|---|---|---|
| 936 | bbcb/bbcb-disc | 11 0 V; expect: 0 V | CONFIRMED | [bbc-b][bbc-b] sheet 1 PL8 disc; d04 p53 | Disc connector pin 11 is on the common ground row of odd-numbered contacts. |
| 938 | bbcb/bbcb-printer | 11 D4 | CONFIRMED | [bbc-b][bbc-b] sheet 1 PL9, IC69 and IC70; d13 section 3.11 | Printer pin 11 carries D4 from VIA PA4 through the 74LS244. The service text explicitly limits these buffered printer lines to output. |
| 939 | bbcb/bbcb-printer | 19 /ACK | CONFIRMED | [bbc-b][bbc-b] sheet 1 PL9, IC69 and R162; d13 section 7.1 | Printer pin 19 ACK reaches VIA CA1, with a 4k7 pull-up shown and described. |
| 344 | cpu65sc12 | 6 /NMI (in) | CONFIRMED | [d01][d01] sheet 1, IC14; sheet 2 IC15; d04 p44 | IC14 pin 6 is active-low NMI at TP3. Disc DRQ reaches it through the I/O controller; Econet NMIN enters the same controller. |
| 345 | cpu65sc12 | 11 A2 (out) | CONFIRMED | [d01][d01] sheet 1, IC14 | Pin 11 is A2 on the CPU address output bus. |
| 351 | serproc | 17 RXD (out) | CONFIRMED | [d01][d01] sheet 2, IC48 and IC45 | SERPROC pin 17 RxD drives ACIA pin 2 RxD, establishing the outgoing direction. |
| 352 | serproc | 19 CTSO (out) | CONFIRMED | [d01][d01] sheet 2, IC48 and IC45 | SERPROC pin 19 CTSO drives the ACIA active-low CTS input at pin 24. |
| 959 | bbcmaster/master-1mhz | 23 D5 | WRONG | [d01][d01] sheet 2, PL5 pin 23 and PL6 pin 22; d04 p27; d35 PDF pp240-241 / F.4-5 to F.4-6 | WRONG: D5 is correct, but enabled only for FRED and JIM is a Model B condition. On the Master, PL5 D5 and Tube PL6 D5 are both ED5 on the same PBC EX bus, which also transfers Tube data. Correct: buffered EX-bus data bit 5, shared with the external Tube. Delete the exclusivity clause. |
| 970 | bbcmaster/master-cart | A7 A12 | CONFIRMED | [d01][d01] sheet 1, SK3/SK4 cartridge symbols (rendered crop) | Contact a7 carries A12 on both cartridge sockets. |
| 971 | bbcmaster/master-cart | A12 /NMI | CONFIRMED | [d01][d01] sheet 1, SK3/SK4 cartridge symbols (rendered crop) | Contact a12 is active-low NMI, joined to the host NMI line. |
| 972 | bbcmaster/master-battery | 2 BAT +; expect: About 3 V (at least 2.6 V at the clock chip, mains off) | UNVERIFIABLE | [d01][d01] sheet 2, PL8; d04 pp7,40; d36 battery paragraphs | Source silent on about 3 V in this item's citations. The center contact is battery positive through R23/Q4 and the service manual specifies at least 2.6 V at the clock chip with mains off. A separate primary document, Master Reference Manual Part 1 F.3-2 (d35 PDF p233), explicitly specifies the original 3.0 V lithium cell but is absent from this item's citations. Add that citation with original-cell qualification, or drop about 3 V; retain the pin and 2.6 V threshold. |
| 346 | vidproc | 5 2MHz (out) | CONFIRMED | [d04][d04] PDF/printed p32; d05 Clock division | VIDPROC pin 5 supplies the 2 MHz output; CPU clock input is pin 37. |
| 353 | serproc | 25 CLK (in) | CONFIRMED | [d04][d04] PDF/printed p42; d01 sheets 1-2; d06 Interface | Pin 25 takes a 1.23 MHz reference. Master build options use LS169 or CHROMA via LK14; the Model B reference is 16/13 MHz. |
| 934 | bbcb/bbcb-rs423 | C 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p51, RS423 drawing (rendered); bbc-b SK4 | Contact C is the central signal-ground contact on both drawings. |
| 935 | bbcb/bbcb-analogue | 13 PB0 (fire 0); expect: +5 V open, 0 V pressed | CONFIRMED | [d04][d04] PDF/printed p52; d09 section 23.1; bbc-b SK6 | Analogue contact 13 is digital input I0, labeled PB0 by the user guide. It reaches system VIA port B; the fire input is high open and low when pressed. |
| 937 | bbcb/bbcb-printer | 10 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p53; bbc-b PL9 | Printer pin 10 is 0 V. |
| 940 | bbcb/bbcb-user | 18 PB6 | CONFIRMED | [d04][d04] PDF/printed p54; d09 sections 22 and 24; bbc-b PL10 | User pin 18 is unbuffered VIA PB6. VIA timer 2 can use PB6 as its pulse-counting input. |
| 941 | bbcb/bbcb-user | 19 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p54; bbc-b PL10 | User pin 19 is 0 V. |
| 942 | bbcb/bbcb-1mhz | 15 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p54; d09 section 28.4; bbc-b PL11 | 1 MHz pin 15 is an interleaved ground contact. The bus description explains ground interleaving reduces signal interference. |
| 947 | bbcmaster/master-rs423 | C 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p51, RS423 drawing (rendered) | Master RS423 contact C is signal ground. |
| 948 | bbcmaster/master-cassette | 4 OUTPUT | CONFIRMED | [d04][d04] PDF/printed p51, cassette drawing (rendered) | Cassette contact 4 is the second output contact. |
| 949 | bbcmaster/master-cassette | 7 MOTOR | CONFIRMED | [d04][d04] PDF/printed p51, cassette drawing (rendered) | Cassette contact 7 is one side of the motor-control relay pair, with contact 6 the other side. |
| 950 | bbcmaster/master-analogue | 10 PB1 (fire 1); expect: +5 V open, 0 V pressed | CONFIRMED | [d04][d04] PDF/printed pp26,52; d01 sheet 2 SK12 | Analogue contact 10 is I1 fire-button digital input on system VIA port B. The pull-up and grounding switch give high open and low pressed. |
| 951 | bbcmaster/master-disc | 6 NC | CONFIRMED | [d04][d04] PDF/printed p53, PL1 table | Master disc pin 6 is NC. |
| 952 | bbcmaster/master-disc | 26 /TR00 | CONFIRMED | [d04][d04] PDF/printed p53, PL1 table | Master disc pin 26 is active-low track-zero indication, called notTK0 in the manual. |
| 953 | bbcmaster/master-printer | 4 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p53, PL3 table | Master printer pin 4 is 0 V. |
| 954 | bbcmaster/master-user | 4 CB2 | CONFIRMED | [d04][d04] PDF/printed p54, PL4 table; d01 sheet 2 IC6 | User pin 4 is CB2 from the user VIA. CB2 is the VIA handshake/shift-data line. |
| 955 | bbcmaster/master-user | 13 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p54, PL4 table | User pin 13 is 0 V. |
| 956 | bbcmaster/master-1mhz | 4 1MHzE; expect: 1 MHz square wave | UNVERIFIABLE | [d04][d04] PDF/printed pp8,54 | Source silent on duty cycle: PL5 pin 4 is 1E, the 1 MHz timing clock, but the cited Master manual does not specify 50 percent duty. BBC AUG section 28.4 documents 50 percent for the Model B, not this Master record. Drop the exact duty qualifier or add a Master-specific timing source; retain pin 4 and 1 MHz. |
| 957 | bbcmaster/master-1mhz | 9 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p54, PL5 table | 1 MHz pin 9 is an interleaved ground contact. |
| 958 | bbcmaster/master-1mhz | 13 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p54, PL5 table | 1 MHz pin 13 is an interleaved ground contact. |
| 960 | bbcmaster/master-tube | 7 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p55, PL6 table | Tube pin 7 is 0 V. |
| 961 | bbcmaster/master-tube | 9 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p55, PL6 table | Tube pin 9 is 0 V. |
| 962 | bbcmaster/master-tube | 12 D0 | CONFIRMED | [d04][d04] PDF/printed pp27,55; d01 sheet 2 PL6 | Tube pin 12 is D0, supplied on the Master's buffered PBC EX bus. The Model B drawing shows the direct host data bus. |
| 963 | bbcmaster/master-tube | 25 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p55, PL6 table | Tube pin 25 is 0 V. |
| 964 | bbcmaster/master-tube | 35 +5 V; expect: +4.75 to +5.25 V | UNVERIFIABLE | [d04][d04] PDF/printed pp27,55 | Source silent on tolerance: Tube pin 35 is +5 V, but the manual specifies no 4.75-5.25 V limit for the host supply. Keep the pin and nominal +5 V; remove or mark the range unverified. |
| 965 | bbcmaster/master-tube | 37 +5 V; expect: +4.75 to +5.25 V | UNVERIFIABLE | [d04][d04] PDF/printed pp27,55 | Source silent on tolerance: Tube pin 37 is +5 V, but the manual specifies no 4.75-5.25 V limit for the host supply. Keep the pin and nominal +5 V; remove or mark the range unverified. |
| 966 | bbcmaster/master-kbd11 | 7 R1 | CONFIRMED | [d04][d04] PDF/printed pp19,56 | PL11 pin 7 is R1. Keyboard rows have pull-ups; a depressed key pulls its row low when its column is selected. |
| 967 | bbcmaster/master-kbd11 | 15 C5 | CONFIRMED | [d04][d04] PDF/printed pp19,56 | PL11 pin 15 is C5. IC16's column drives are open collector and active low. |
| 968 | bbcmaster/master-kbd24 | 2 C7 | CONFIRMED | [d04][d04] PDF/printed p56 | PL24 pin 2 is C7. |
| 969 | bbcmaster/master-kbd24 | 14 0VB; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p56 | PL24 pin 14 is 0VB, ground. |
| 973 | bbcmaster/master-psu | +5V-3 +5 V; expect: +4.9 to +5.2 V | UNVERIFIABLE | [d04][d04] PDF/printed pp6-7 | Source silent on 4.9-5.2 V: reassembly specifies three red leads on +5 V tabs and warns against reversing supplies, but supplies no voltage tolerance. The +5V-3 name is an explicitly disclosed application label. Keep the nominal rail and red lead; drop or mark the range unverified. |
| 974 | bbcmaster/master-psu | 0V-3 0 V; expect: 0 V | CONFIRMED | [d04][d04] PDF/printed p6, reassembly | The manual calls for three black wires on tabs marked 0V. The application's 0V-3 is a disclosed schematic label, not an Acorn pin number. |
| 347 | vidproc | 28 CRTC CLK (out) | CONFIRMED | [d05][d05] Control register and Pinout figure; d01 sheet 1 IC42 | Pin 28 is the outgoing CRTC clock. Control bit 4 selects 1 MHz clear or 2 MHz set. |
| 348 | serproc | 2 D1 (in) | CONFIRMED | [d06][d06] Pinout figure and Control register; d01 sheet 2 IC48 | Pin 2 is D1. FE10 is a write-only control register, making D1 an input. |
| 349 | serproc | 5 D4 (in) | CONFIRMED | [d06][d06] Pinout figure and Control register; d01 sheet 2 IC48 | Pin 5 is D4, an input to the FE10 write-only control register. |
| 350 | serproc | 9 /CS (in) | CONFIRMED | [d06][d06] Pinout figure; d01 sheet 2 IC48 | Pin 9 is active-low CS; the Master schematic supplies it from SERPROC decode. |
| 354 | saa5050 | 9 D6 (in) | CONFIRMED | [d07][d07] PDF p181 / data sheet p2; p185 / p6 | Pin 9 is character input D6 in Philips one-based D1-D7 naming. The BBC schematic uses zero-based D0-D6 net names; these are different naming conventions. |
| 355 | saa5050 | 12 GLR (in) | CONFIRMED | [d07][d07] PDF p181 / data sheet p2; p185 / p6 | Pin 12 is GLR, an input for general line reset and synchronization. |
| 356 | saa5050 | 26 LOSE (in) | CONFIRMED | [d07][d07] PDF p181 / data sheet p2; p186 / p7; bbc-b IC5 | Pin 26 is the LOSE input, defining the character display period. The BBC schematic supplies a delayed display-enable signal through its timing circuit. |
| 357 | fdc8271 | 4 RESET (in) | CONFIRMED | [d08][d08] PDF pp113-114 / printed pp1-108 to 1-109 | RESET is input pin 4; high idles the controller and forces drive-interface outputs low for a reset of at least ten clocks. |
| 358 | fdc8271 | 11 INT (out) | CONFIRMED | [d08][d08] PDF pp113,115 / printed pp1-108,1-110 | Pin 11 is INT output. The control-interface description says it stays active until the result register is read; it is active high. |
| 359 | fdc8271 | 14 DB2 (bidir) | CONFIRMED | [d08][d08] PDF pp113-114 / printed pp1-108 to 1-109 | Pin 14 is DB2. The data bus on pins 12-19 is bidirectional and three-state. |
| 360 | fdc8271 | 15 DB3 (bidir) | CONFIRMED | [d08][d08] PDF pp113-114 / printed pp1-108 to 1-109 | Pin 15 is DB3 on the bidirectional three-state data bus. |
| 943 | bbcb/bbcb-1mhz | 20 D2 | CONFIRMED | [d09][d09] section 28.4; d13 section 3.13; bbc-b PL11 | Pin 20 is D2. Model B transceiver IC72 is enabled for FRED or JIM accesses. |
| 944 | bbcb/bbcb-1mhz | 23 D5 | CONFIRMED | [d09][d09] section 28.4; d13 section 3.13; bbc-b PL11 | Pin 23 is D5. The Model B buffer enable is qualified by FRED or JIM. |
| 361 | fdc1770 | 6 DAL1 (bidir) | CONFIRMED | [d10][d10] PDF pp53-54 / printed pp43-44 (rendered) | Pin 6 is DAL1. Pins 5-12 form the bidirectional DAL0-DAL7 bus. |
| 362 | fdc1770 | 9 DAL4 (bidir) | CONFIRMED | [d10][d10] PDF pp53-54 / printed pp43-44 (rendered) | Pin 9 is DAL4, a bidirectional data-access line. |
| 363 | fdc1770 | 18 CLK (in) | CONFIRMED | [d10][d10] PDF p54 / printed p44 (rendered) | Pin 18 is a clock input; the table requires 8 MHz and 50 percent duty cycle. |
| 364 | fdc1770 | 22 WD (out) | CONFIRMED | [d10][d10] PDF pp53-54 / printed pp43-44 (rendered) | Pin 22 is WD output, carrying FM or MFM clock and data pulses for writing to disk. |
| 365 | fdc1770 | 27 DRQ (out) | CONFIRMED | [d10][d10] PDF p55 / printed p45 (rendered) | Pin 27 is active-high DRQ output, signaling full read data or an empty write data register. |
| 366 | adc7002 | 23 /CS (in) | CONFIRMED | [d11][d11] PDF p485 / printed p483; d04 p41 | The 28-pin diagram places CS at pin 23; it is a control input. Master service text independently identifies chip select at pin 23. |
| 367 | adc7002 | 24 /WR (in) | CONFIRMED | [d11][d11] PDF p485 / printed p483 | The 28-pin diagram places WR at pin 24 and identifies it as a control-bus input, active low. |
| 368 | adlc6854 | 11 RS1 (in) | CONFIRMED | [d12][d12] PDF p568 / printed p3-524; PDF p580 / p3-536 | Pin assignment gives RS1 at pin 11. Register-select lines are inputs. |
| 369 | adlc6854 | 24 TDSR (out) | CONFIRMED | [d12][d12] PDF p568 / printed p3-524; PDF p581 / p3-537 | Pin 24 is TDSR. The description explicitly identifies it as transmitter data service request output. |
| 370 | adlc6854 | 26 /LOC/DTR (out) | CONFIRMED | [d12][d12] PDF p568 / printed p3-524; PDF p580 / p3-536 | Pin 26 is LOC/DTR output. Low asserts terminal-ready or on-line state; reset makes it high. |
| 946 | bbcb/bbcb-auxpower | 4 +12 V; expect: +11.4 to +12.6 V | UNVERIFIABLE | [d13][d13] section 3.14 and Figure 10 | Source silent on tolerance: Figure 10 confirms the lower-right brown-wire +12 V contact and 1.25 A rating, but does not give 11.4-12.6 V. Numbers 1-6 are disclosed application labels in figure reading order. Remove the extra range or label it an unsourced bench guideline; keep the pin and nominal voltage. |
| 371 | dram4816 | 2 DIN (in) | CONFIRMED | [d14][d14] PDF p112 / printed pV-47; bbc-b IC53-68 | MK4516 has DIN input at pin 2. The replacement BBC primary drawing shows the actual 4816A-3 chips with DI at pin 2 as well. No part-equivalence assumption is needed for this pin. |
| 372 | dram4816 | 7 A1 (in) | CONFIRMED | [d14][d14] PDF p112 / printed pV-47; bbc-b IC53-68 | MK4516 pin 7 is A1 input. BBC 4816A-3 symbols independently show A1 at pin 7. |
| 373 | dram4816 | 10 A5 (in) | CONFIRMED | [d14][d14] PDF p112 / printed pV-47; bbc-b IC53-68 | MK4516 pin 10 is A5 input. BBC 4816A-3 symbols independently show A5 at pin 10. |
| 374 | elk_ula | 1 A1 (in) | CONFIRMED | [d15][d15] PDF pp14,37 / printed pp8,31 (schematic rendered) | ULA pin 1 is A1, connected from the 6502 A1 address output. Service section 6 identifies address pins as inputs from the CPU. |
| 375 | elk_ula | 14 A13 (in) | CONFIRMED | [d15][d15] PDF pp14,37 / printed pp8,31 (schematic rendered) | ULA pin 14 is A13 input, joined to CPU A13. |
| 376 | elk_ula | 30 /IRQ (out) | CONFIRMED | [d15][d15] PDF pp14,37 / printed pp8,31; d17 p4 | ULA pin 30 drives active-low IRQ to CPU pin 4 and expansion pin 17. AN015 specifies open collector and a 3k3 pull-up inside the ULA. |
| 377 | elk_ula | 36 PD2 (bidir) | CONFIRMED | [d15][d15] PDF pp14,37 / printed pp8,31 (schematic rendered) | ULA pin 36 is PD2, joined to CPU D2. The service description explicitly says processor data lines transfer both ways. |
| 378 | elk_ula | 44 RAM3 (bidir) | CONFIRMED | [d15][d15] PDF pp13-14,37 / printed pp7-8,31 (schematic rendered) | ULA pin 44 is RAM3 to IC7 data pins. RAM data lines are bidirectional; the text assigns bits 6 and 7 to IC7. |
| 379 | elk_ula | 58 /RST (out) | CONFIRMED | [d15][d15] PDF pp14,17,37 / printed pp8,11,31; d17 p4 | ULA pin 58 drives RST to CPU pin 40 and expansion pin 15. Reset is active low at startup and when BREAK is pressed; AN015 calls it output only. |
| 982 | electron/electron-rgb | 5 0 V; expect: 0 V | CONFIRMED | [d15][d15] PDF p38 / printed p32, SK2 (rendered) | RGB contact 5 is wired to ground. |
| 983 | electron/electron-rgb | 6 +5 V; expect: +4.75 to +5.25 V | CONFIRMED | [d15][d15] PDF pp16,38 / printed pp10,32 (schematic rendered) | RGB contact 6 is the +5 V feed. Section 8.1 specifies 4.75-5.25 V for this supply. |
| 984 | electron/electron-video | 1 VIDEO; expect: 1 V p-p composite | CONFIRMED | [d15][d15] PDF pp11,38 / printed pp5,32 (schematic rendered) | SK3 center is composite video; section 3.6 specifies nominal 1 V peak-to-peak. The application uses 1 as its own center-contact label. |
| 985 | electron/electron-uhf | 2 0 V; expect: 0 V | CONFIRMED | [d15][d15] PDF pp10,38 / printed pp4,32 (schematic rendered) | SK4 UHF output is a phono connector with the shell on ground. The application uses 2 as its own shell label. |
| 986 | electron/electron-kbd | 15 A7 | CONFIRMED | [d15][d15] PDF pp37,45 / printed pp31,39; d16 PDF p221 | PL2 pin 15 is CPU A7 to a keyboard column. The Electron AUG identifies keyboard ROM slots 8 and 9 in the paged-ROM window. |
| 987 | electron/electron-kbd | 16 A6 | CONFIRMED | [d15][d15] PDF pp37,45 / printed pp31,39; d16 PDF p221 | PL2 pin 16 is CPU A6 to a keyboard column; keyboard occupies paged ROM slots 8 and 9. |
| 988 | electron/electron-kbd | 22 A4 | CONFIRMED | [d15][d15] PDF pp37,45 / printed pp31,39 (rendered) | PL2 pin 22 is CPU A4 to a keyboard column. |
| 975 | electron/electron-expansion | 27 /RDY | CONFIRMED | [d17][d17] PDF/printed pp3-4,11; d15 p37 | Expansion pin 27 is active-low, read-only 6502 RDY. R71 is 3k3 to +5 V in the schematic; AN015 p11 explicitly reuses it for the following module's buffer enable. |
| 976 | electron/electron-expansion | 29 KEY | CONFIRMED | [d17][d17] PDF/printed pp3,5 | Expansion pin 29 is the polarizing key slot, not an electrical contact. |
| 977 | electron/electron-expansion | 36 A10 | CONFIRMED | [d17][d17] PDF/printed p3 | Expansion pin 36 is A10. |
| 978 | electron/electron-expansion | 37 A9 | CONFIRMED | [d17][d17] PDF/printed p3 | Expansion pin 37 is A9. |
| 979 | electron/electron-expansion | 39 A1 | CONFIRMED | [d17][d17] PDF/printed p3 | Expansion pin 39 is A1. |
| 980 | electron/electron-expansion | 42 A4 | CONFIRMED | [d17][d17] PDF/printed p3 | Expansion pin 42 is A4. |
| 981 | electron/electron-expansion | 50 +5 V; expect: +4.75 to +5.25 V | CONFIRMED | [d17][d17] PDF/printed pp3-4; d15 PDF p16 / printed p10 | Expansion pin 50 is +5 V. The Electron supply test explicitly specifies 4.75-5.25 V, supporting the expected range. |
| 380 | ttl7404 | 11 5A (in) | CONFIRMED | [d18][d18] PDF/printed p1, DIP pin assignment | Pin 11 is 5A, the fifth inverter input. |
| 381 | ttl7404 | 12 6Y (out) | CONFIRMED | [d18][d18] PDF/printed p1, DIP pin assignment | Pin 12 is 6Y, the sixth inverter output. |
| 382 | ttl74169 | 2 CLK (in) | CONFIRMED | [d19][d19] PDF/printed p1 (rendered) | Pin 2 is CLK input. The description specifies counting on the rising edge. |
| 383 | ttl74169 | 11 QD (out) | CONFIRMED | [d19][d19] PDF/printed p1 (rendered) | Pin 11 is QD, the most significant output of the four-bit counter. |
| 384 | ttl7474 | 1 /1CLR (in) | CONFIRMED | [d20][d20] PDF/printed p1 (rendered) | DIP pin 1 is active-low 1CLR. The function table shows low Q when clear is asserted and preset is inactive. |
| 385 | ttl7474 | 5 1Q (out) | CONFIRMED | [d20][d20] PDF/printed p1 (rendered) | DIP pin 5 is 1Q, the first flip-flop non-inverted output. |
| 386 | lm324 | 2 1IN- (in) | CONFIRMED | [d21][d21] PDF/printed p3, Figure 5-1 and Table 5-1 | For the 14-pin PDIP, pin 2 is 1IN-, an input to amplifier 1's negative input. |
| 392 | ay8910 | 6 IOB7 (bidir) | CONFIRMED | [d22][d22] PDF pp10-12; d24 PDF p47 / printed p44 (rendered) | Pin 6 is bidirectional IOB7. The MSX PSG assignments identify B7 as the Japanese Kana lamp with low meaning on. |
| 393 | ay8910 | 22 CLOCK (in) | CONFIRMED | [d22][d22] PDF pp10-11, section 2.3 | Pin 22 is CLOCK input and supplies a TTL-compatible timing reference for tone, noise and envelope generators. |
| 394 | ay8910 | 29 BC1 (in) | CONFIRMED | [d22][d22] PDF pp10-11, section 2.3 | Pin 29 is BC1, bus-control input 1. |
| 395 | ay8910 | 36 DA1 (bidir) | CONFIRMED | [d22][d22] PDF pp10-11, section 2.3 | Pin 36 is DA1, part of the bidirectional DA7-DA0 data/address bus. |
| 1009 | msx1/msx1-cart | 2 /CS2 | CONFIRMED | [d24][d24] PDF pp35-36 / printed pp32-33 (rendered) | Cartridge pin 2 is CS2, a ROM read-select signal for 8000-BFFF. |
| 1010 | msx1/msx1-cart | 33 D1 | CONFIRMED | [d24][d24] PDF p35 / printed p32 (rendered) | Cartridge pin 33 is bidirectional D1. |
| 1011 | msx1/msx1-joy1 | 4 RIGHT; expect: About +5 V; 0 V when pressed | CONFIRMED | [d24][d24] PDF pp28-29,47 / printed pp25-26,44 (rendered) | Joystick 1 contact 4 is RIGHT from selected PSG port A bit 3. The circuit shows +5 V pull-up and active-low switch input. |
| 1012 | msx1/msx1-joy2 | 3 LEFT; expect: About +5 V; 0 V when pressed | CONFIRMED | [d24][d24] PDF pp28-29,47 / printed pp25-26,44 (rendered) | Joystick 2 contact 3 is LEFT from selected PSG port A bit 2, pulled high until switched to ground. |
| 1013 | msx1/msx1-tape | 7 REMOTE - | UNVERIFIABLE | [d24][d24] PDF p19 / printed p16; PDF p46 / printed p43 (rendered) | Source silent on relay implementation: the pin table confirms contact 7 REMOTE- and the PPI table identifies the motor-control signal, but the cited book does not specify that REMOTE- is a mechanical relay contact or define a dry-contact rating. Keep pin 7 REMOTE- motor control; drop relay contact or mark the implementation unverified for a generic MSX. |
| 1014 | msx1/msx1-printer | 13 NC | CONFIRMED | [d24][d24] PDF p22 / printed p19 (rendered) | Printer contact 13 is NC. |
| 1015 | msx2/msx2-cart | 10 /BUSDIR | CONFIRMED | [d24][d24] PDF pp35-36,39 / printed pp32-33,36 (rendered) | Cartridge contact 10 BUSDIR is an input to the main unit, low while the cartridge sends data to the CPU. Section 1.6.2 p36 explicitly exempts plain ROM/RAM cartridges and requires BUSDIR assertion for I/O reads and interrupt-vector transfers. |
| 1016 | msx2/msx2-cart | 12 /MREQ | CONFIRMED | [d24][d24] PDF pp35-36 / printed pp32-33 (rendered) | Cartridge contact 12 is the memory-request signal. The book indeed misspells the name MERQ. |
| 1017 | msx2/msx2-cart | 13 /WR | CONFIRMED | [d24][d24] PDF pp35-36 / printed pp32-33 (rendered) | Cartridge contact 13 is active-low WR from the CPU. |
| 1018 | msx2/msx2-cart | 18 A15 | CONFIRMED | [d24][d24] PDF p35 / printed p32 (rendered) | Cartridge contact 18 is A15. |
| 1019 | msx2/msx2-cart | 29 A3 | CONFIRMED | [d24][d24] PDF p35 / printed p32 (rendered) | Cartridge contact 29 is A3. |
| 1020 | msx2/msx2-joy1 | 9 GND; expect: 0 V | CONFIRMED | [d24][d24] PDF pp28-29 / printed pp25-26 (rendered) | Joystick contact 9 is ground. |
| 1021 | msx2/msx2-joy2 | 2 BACK; expect: About +5 V; 0 V when pressed | CONFIRMED | [d24][d24] PDF pp28-29,47 / printed pp25-26,44 (rendered) | Joystick 2 contact 2 is BACK/down, on selected PSG port A bit 1. The circuit shows a +5 V pull-up and low when pressed. |
| 1022 | msx2/msx2-joy2 | 8 OUTPUT | CONFIRMED | [d24][d24] PDF pp31,47 / printed pp28,44; d42 linked Mouse/Trackball, protocol description | Joystick 2 contact 8 is PSG B5 output (PSG table p44). The paddle section p28 explicitly sends the trigger pulse on contact 8. The Mouse/Trackball page linked by the cited general-purpose-port page describes contact 8 as the mouse protocol clock/strobe. |
| 1023 | msx2/msx2-tape | 3 GND; expect: 0 V | CONFIRMED | [d24][d24] PDF p19 / printed p16 (rendered) | Cassette contact 3 is ground. |
| 1024 | msx2/msx2-printer | 10 NC | CONFIRMED | [d24][d24] PDF p22 / printed p19 (rendered) | Printer contact 10 is NC. |
| 1025 | msx2/msx2-audio | 1 SIGNAL; expect: -5 dBm (about 0.44 V rms) | CONFIRMED | [d24][d24] PDF pp17,20,32 / printed pp14,17,29 (rendered) | RCA center carries audio. The book specifies -5 dBm on p14 and explicitly defines its 0 dBm reference as 0.775 V on p17. Using that documented reference, -5 dBm is 0.775 times 10^(-5/20) = 0.436 V rms, rounding to 0.44 V. No missing load assumption is needed under the book's stated convention. |
| 396 | vdp9938 | 5 HSYNC (bidir) | CONFIRMED | [d25][d25] PDF pp127-128 / printed pp114-115 | Pin 5 is HSYNC I/O. Upper voltage levels carry output sync; the low level is sync input. High and middle states match the recorded tri-level description. |
| 397 | vdp9938 | 29 MODE 0 (in) | CONFIRMED | [d25][d25] PDF pp126-127 / printed pp113-114 | Pin 29 is MODE0 input. The Z80 interface example joins it to the CPU's A0 line. |
| 398 | vdp9938 | 38 CD2 (bidir) | CONFIRMED | [d25][d25] PDF p127 / printed p114 | Pin 38 is CD2, a bidirectional CPU data-bus line. |
| 399 | vdp9938 | 42 RD1 (bidir) | CONFIRMED | [d25][d25] PDF p127 / printed p114 | Pin 42 is RD1, a bidirectional VRAM data-bus line. |
| 400 | vdp9938 | 45 RD4 (bidir) | CONFIRMED | [d25][d25] PDF p127 / printed p114 | Pin 45 is RD4, a bidirectional VRAM data-bus line. |
| 401 | vdp9938 | 47 RD6 (bidir) | CONFIRMED | [d25][d25] PDF p127 / printed p114 | Pin 47 is RD6, a bidirectional VRAM data-bus line. |
| 402 | vdp9938 | 49 AD0 (out) | CONFIRMED | [d25][d25] PDF p127 / printed p114 | Pin 49 is AD0, the least significant outgoing VRAM address line. Row and column addresses share the AD bus. |
| 403 | vdp9938 | 55 AD6 (out) | CONFIRMED | [d25][d25] PDF p127 / printed p114 | Pin 55 is AD6, outgoing VRAM address bit 6. |
| 404 | ula10017 | 3 MA4 (out) | CONFIRMED | [d28][d28] PDF p44, IC7 and IC8; d30 p11 | ULA pin 3 carries multiplexed address MA4 toward the external 74LS257 address multiplexer. |
| 405 | ula10017 | 4 MA3 (out) | CONFIRMED | [d28][d28] PDF p44, IC7 and IC8; d30 p11 | ULA pin 4 carries multiplexed address MA3 toward the external 74LS257 address multiplexer. |
| 406 | ula10017 | 9 CAS (out) | CONFIRMED | [d28][d28] PDF pp44-45, IC7/IC21 and RAM; d30 pp12,14-15 | ULA pin 9 is CAS; the schematic inverts it through IC21 pins 9 to 8 before the RAM active-low CAS pins. The ULA guide limits CPU-phase CAS to RAM accesses, excluding ROM and I/O page 3; video CAS cycles continue separately. |
| 410 | ula10017 | 27 R/W IN (in) | CONFIRMED | [d28][d28] PDF p44 IC5/IC7; d30 p14 | ULA pin 27 takes R/W from CPU pin 34; it is an input to the ULA. |
| 412 | ula10017 | 37 MA2 (out) | CONFIRMED | [d28][d28] PDF pp44-45, IC7 and external multiplexer; d30 p11 | ULA pin 37 is multiplexed address MA2 output to the 74LS257. |
| 1032 | oric1/oric1-power | 2 9 V return; expect: About -4 V from board 0 V with 9 V in | CONFIRMED | [d28][d28] PDF p44; d32 p1, power tests | Adapter sleeve/negative goes to the 7905 input, while adapter positive joins board +5 V. With 9 V adapter input and a 5 V regulated board rail, the sleeve is about -4 V relative to board ground. |
| 1033 | oric1/oric1-kbd | 3 COL 2 | CONFIRMED | [d28][d28] PDF p44, PL3/IC4 (rendered crop) | Keyboard contact 3 goes to AY-3-8912 IOA2 at pin 12, column 2. |
| 1039 | atmos/atmos-kbd | 2 COL 1 | CONFIRMED | [d28][d28] PDF p44, PL3/IC4 (rendered crop) | Keyboard contact 2 goes to AY IOA1 pin 13, column 1. |
| 1040 | atmos/atmos-kbd | 11 COL 5 | CONFIRMED | [d28][d28] PDF p44, PL3/IC4 (rendered crop) | Keyboard contact 11 goes to AY IOA5 pin 9, column 5. |
| 1041 | atmos/atmos-kbd | 7 ROW AD1 | CONFIRMED | [d28][d28] PDF p44, PL3/IC6 (rendered crop) | Keyboard contact 7 is row-address AD1, driven by VIA PB1 pin 11. |
| 407 | ula10017 | 14 PHI OUT (out) | CONFIRMED | [d30][d30] PDF p4; d28 p44 IC7/IC5 | Pin 14 supplies the asymmetric 1 MHz system clock derived from 12 MHz; it reaches CPU clock input pin 37. |
| 408 | ula10017 | 18 D7 (in) | CONFIRMED | [d30][d30] PDF p8; d28 p44 IC7 | D7 is input at pin 18. The guide explicitly says the ULA never drives the CPU data bus. |
| 409 | ula10017 | 21 RED (out) | CONFIRMED | [d30][d30] PDF p9; d28 p44 IC7/IC22 | Red output is pin 21, feeding TTL buffer IC22 on the schematic. |
| 411 | ula10017 | 34 D6 (in) | CONFIRMED | [d30][d30] PDF p8; d28 p44 IC7 | D6 is input at pin 34. The guide lists CPU data pin order and says the ULA never drives that bus. |
| 945 | bbcb/bbcb-psu | +5V-2 +5 V; expect: +4.9 to +5.2 V | WRONG | [d34][d34] Which supply; Expected rails; bbc-linear-primary article, measured-rails paragraph | WRONG: the unqualified joined-on-board statement excludes early Issue 2 boards with three independent 5 V rails. The cited guide explicitly records this exception, backed by first-hand continuity measurements. Correct: three +5 V feeds; commoning depends on board revision, so check all three. Red leads and nominal +5 V are supported; the additional 4.9-5.2 V range is not specified. Drop the universal commoning statement and unsupported tolerance. |
| 1026 | oric1/oric1-exp | 10 D0 | CONFIRMED | [d45][d45] PDF p289 / printed p284 (rendered); d28 p45 | Expansion contact 10 is D0 in both the manual and primary schematic. |
| 1027 | oric1/oric1-exp | 14 D6 | CONFIRMED | [d45][d45] PDF p289 / printed p284 (rendered); d28 p45 | Expansion contact 14 is D6. |
| 1028 | oric1/oric1-exp | 17 A2 | CONFIRMED | [d45][d45] PDF p289 / printed p284 (rendered); d28 p45 | Expansion contact 17 is A2. |
| 1029 | oric1/oric1-exp | 23 A6 | CONFIRMED | [d45][d45] PDF p289 / printed p284 (rendered); d28 p45 | Expansion contact 23 is A6. |
| 1030 | oric1/oric1-exp | 33 +5 V; expect: +4.95 to +5.05 V DC | UNVERIFIABLE | [d45][d45] PDF p289 / printed p284; d28 pp44-45 | Source silent on the 4.95-5.05 V range: expansion pin 33 is +5 V, joined directly to adapter-positive/board +5 V on the schematic. Neither the cited manual nor drawing supplies this tolerance. d32 repair checklist p1 gives this as a repair-test target, but d32 is not cited by this record. Add a clearly labeled checklist target with its citation, or drop the range; keep the pin. |
| 1031 | oric1/oric1-tape | 2 GND; expect: 0 V | CONFIRMED | [d45][d45] PDF p290 / printed p285 (rendered); d28 p44 | Cassette DIN contact 2 is board ground, not the negative return of the 9 V adapter. |
| 1034 | atmos/atmos-exp | 1 /MAP; expect: +5 V (held high by RP1) | CONFIRMED | [d45][d45] PDF pp228-229,289 / printed pp223-224,284; oric-service p79 | Expansion contact 1 is MAP input. Low disables internal ROM and permits upper RAM mapping; schematic IC7 pin 26 is pulled up to +5 V by RP1 2k2. Lower RAM accesses have different MAP behavior, not contradicted by this limited upper-memory description. |
| 1035 | atmos/atmos-exp | 4 /RESET; expect: +5 V; low only during power-on reset | WRONG | [d45][d45] PDF p289 / printed p284; d28 pp44-45; oric-service p13 | WRONG: pin 4 RESET and its CPU pin 40/VIA pin 34 connections are correct, but low only during power-on reset is false. The primary service manual identifies expansion RESET as an externally generated reset input; it can be asserted after startup. Correct expectation: normally high, low during power-on or an externally asserted reset. Delete only during power-on. |
| 1036 | atmos/atmos-exp | 7 R/W | CONFIRMED | [d45][d45] PDF pp229,289 / printed pp224,284; d28 p44 | Expansion contact 7 is CPU R/W, high on read and low on write. |
| 1037 | atmos/atmos-exp | 30 A12 | CONFIRMED | [d45][d45] PDF p289 / printed p284 (rendered) | Expansion contact 30 is A12. |
| 1038 | atmos/atmos-exp | 34 GND; expect: 0 V | CONFIRMED | [d45][d45] PDF p289 / printed p284 (rendered) | Expansion contact 34 is board ground. |

## Source access and link defects

| Document | Status | Local file / note |
|---|---|---|
| [d01][d01] | 200 | d01.pdf |
| [d02][d02] | 200 | d02.pdf |
| [d03][d03] | 429 | d03.html; HTTP Error 429: Too Many Requests |
| [d04][d04] | 200 | d04.pdf |
| [d05][d05] | 200 | d05.html |
| [d06][d06] | 200 | d06.html |
| [d07][d07] | 200 | d07.pdf |
| [d08][d08] | 200 | d08.pdf |
| [d09][d09] | 200 | d09.html |
| [d10][d10] | 200 | d10.pdf |
| [d11][d11] | 200 | d11.pdf |
| [d12][d12] | 200 | d12.pdf |
| [d13][d13] | 200 | d13.html |
| [d14][d14] | 200 | d14.pdf |
| [d15][d15] | 200 | d15.pdf |
| [d16][d16] | 200 | d16.pdf |
| [d17][d17] | 200 | d17.pdf |
| [d18][d18] | 200 | d18.pdf |
| [d19][d19] | 200 | d19.pdf |
| [d20][d20] | 200 | d20.pdf |
| [d21][d21] | 200 | d21.pdf |
| [d22][d22] | 200 | d22.pdf |
| [d23][d23] | 200 | d23.pdf |
| [d24][d24] | 200 | d24.pdf |
| [d25][d25] | 200 | d25.pdf |
| [d26][d26] | 200 | d26.html |
| [d27][d27] | 0 | ; <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it> |
| [d28][d28] | 200 | d28.pdf |
| [d29][d29] | 0 | ; <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it> |
| [d30][d30] | 200 | d30.pdf |
| [d31][d31] | 200 | d31.pdf |
| [d32][d32] | 200 | d32.pdf |
| [d33][d33] | 200 | d33.pdf |
| [d34][d34] | 200 | d34.html |
| [d35][d35] | 200 | d35.pdf |
| [d36][d36] | 200 | d36.html |
| [d37][d37] | 200 | d37.pdf |
| [d38][d38] | 200 | d38.pdf |
| [d39][d39] | 200 | d39.html |
| [d40][d40] | 200 | d40.html |
| [d41][d41] | 200 | d41.html |
| [d42][d42] | 200 | d42.html |
| [d43][d43] | 200 | d43.html |
| [d44][d44] | 0 | ; <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it> |
| [d45][d45] | 200 | d45.pdf |
| [d46][d46] | 0 | ; <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it> |
| [d47][d47] | 200 | d47.pdf |
| [d48][d48] | 0 | ; <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it> |

d03: Wayback returned HTTP 429. Its origin URL also failed via web retrieval (502). Replacement primary BBC drawing: bbc-b.pdf, drawing 103,000/IC, issue 9. The data repeatedly calls the BBC drawing 105,000/C, which is the Electron drawing number, not the Model B drawing. Correct the bibliography independently of the confirmed pin assignments.

d27, d29, d44, d46, d48: archived Defence Force wiki URLs refused connections (WinError 10061). They were unavailable in this session; this is not proof that their underlying content has ceased to exist. The already cited Oric Owner schematic and Atmos manual, plus the primary Oric service manual found through search, supplied the usable evidence.

The Mostek reference really is MK4516 (d14 pV-47), as its title says; it is supplemental, not a manufacturer data sheet for the actual 4816. The BBC drawing independently confirms the sampled signal pins.

Additional primary documents consulted: [BBC drawing][bbc-b], [Oric service manual][oric-service], and [Issue 2 linear PSU first-hand report][bbc-linear-primary]. The missing original-cell citation is [Master Reference Manual Part 1][d35], F.3-2 (PDF p233).

[d01]: https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf
[d02]: https://retrosix.wiki/uploads/Master_Reference_Manual_Part_2-1.pdf
[d03]: https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf
[d04]: https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf
[d05]: https://beebwiki.mdfs.net/Video_ULA
[d06]: https://beebwiki.mdfs.net/Serial_ULA
[d07]: http://www.bitsavers.org/components/philips/_dataBooks/1979_Philips_Semiconductors_and_Integrated_Circuits_Part_6b_ICs_for_Digital_Systems_in_Radio_and_TV.pdf
[d08]: http://www.bitsavers.org/components/intel/_dataBooks/1979_Intel_Peripheral_Design_Handbook.pdf
[d09]: https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html
[d10]: http://www.bitsavers.org/components/westernDigital/_dataBooks/wd1984storageProducts_01.pdf
[d11]: http://www.bitsavers.org/components/nec/_dataBooks/1982_NEC_Microcomputer_Catalog.pdf
[d12]: http://www.bitsavers.org/components/motorola/_dataBooks/1983_Motorola_8-Bit_Microprocessor_and_Peripheral_Data.pdf
[d13]: https://acorn.huininga.nl/pub/unsorted/manuals/BBC%20Microcomputer%20Service%20Manual-HTML/BBCServiceManual.html
[d14]: http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf
[d15]: https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf
[d16]: https://archive.org/download/acorn-electron-advanced-user-guide/Electron%20Advanced%20User%20Guide.pdf
[d17]: https://chrisacorns.computinghistory.org.uk/docs/Acorn/AN/015.pdf
[d18]: https://www.ti.com/lit/ds/symlink/sn74ls04.pdf
[d19]: https://www.ti.com/lit/ds/symlink/sn74ls169b.pdf
[d20]: https://www.ti.com/lit/ds/symlink/sn74s74.pdf
[d21]: https://www.ti.com/lit/ds/symlink/lm324.pdf
[d22]: https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf
[d23]: https://bitsavers.org/components/yamaha/YM2149_199209.pdf
[d24]: https://archive.org/details/MSXTechnicalDataBook
[d25]: https://archive.org/details/bitsavers_yamahaYamanicalDataBookAug85_6932685
[d26]: https://archive.org/download/MSX-MSX2TechnicalHandbook/th-1.txt
[d27]: https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-1s.gif
[d28]: https://library.defence-force.org/books/content/oric_owner/OricOwner_05.pdf
[d29]: https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:ula_10017
[d30]: https://oric.signal11.org.uk/files/pub/ula1/OricAtmosUnofficialULAGuide-1.02.pdf
[d31]: https://oric.signal11.org.uk/files/pub/diag-rom/OricDiagROM1-08.pdf
[d32]: https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf
[d33]: https://rk.nvg.ntnu.no/bbc/doc/BBCUserGuide-1.00.pdf
[d34]: https://retrotechwiki.com/BBC_Micro_Model_A/B_Capacitor_Replacement_Guide
[d35]: https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf
[d36]: https://linuxjedi.co.uk/restoring-a-bbc-master-128-part-1/
[d37]: https://archive.org/details/acorn-electron-plus-1-expansion-unit-user-guide
[d38]: https://archive.org/details/acorn-electron-plus-3-expansion-unit-user-guide
[d39]: https://chrisacorns.computinghistory.org.uk/Computers/Electron.html
[d40]: https://retrorepairsandrefurbs.com/2021/06/13/acorn-electron-repair-restoration/
[d41]: https://acornelectron.co.uk/eug/02/a-trou.html
[d42]: https://www.msx.org/wiki/General_Purpose_port
[d43]: https://www.msx.org/wiki/Printer_port
[d44]: https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-2s.gif
[d45]: https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf
[d46]: https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board
[d47]: https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/oric1manual.pdf
[d48]: https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:oric_keyboard
[bbc-b]: https://www.goffart.co.uk/museum/schematics/bbc_b.pdf
[oric-service]: https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf
[bbc-linear-primary]: https://martin-jones.com/2013/08/30/the-bbc-micro-linear-power-supply/

Linked mouse protocol source inspected: [Mouse/Trackball](https://www.msx.org/wiki/Mouse/Trackball), reached from the cited General Purpose port page; local copy msx-mouse-linked.html.
