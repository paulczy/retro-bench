# batch-23 fact-check ledger

Commit reviewed: 4b85bd0. Batch input: P:/retro-bench/.tmp/factcheck/full/batch-23.json. Every item i=0..234 is decided. No live data was edited.

Decisions apply to the whole item: an unsupported material subclaim makes an item UNVERIFIABLE even when its pin assignment is confirmed. Generic signal descriptions are not treated as complete timing procedures; important source qualifications are recorded below. PDF pages are 1-based.

Source retrieval: requested curl -L -A Mozilla/5.0 was attempted for all 17 unique URLs, but local Schannel failed with SEC_E_NO_CREDENTIALS before any HTTP exchange. Python requests with the same User-Agent then recovered all documents except the CPCWiki archive (HTTP 429). Live CPCWiki also returned HTTP 403. PDFs were extracted with pdftotext -layout; scanned or ambiguous pin tables and schematics were rendered with pdftoppm at 110 dpi (the CPC FDC schematic also at 180 dpi). Inside the Dragon reports damaged xref data but its recovered text and rendered pp.208-209 are readable. Archive.org details page was resolved through its public metadata to the original service-manual PDF, stored as service.pdf.

## Coverage

| kind | items | confirmed | wrong | unverifiable |
| --- | ---: | ---: | ---: | ---: |
| chip-pin | 233 | 227 | 4 | 2 |
| scope | 2 | 0 | 0 | 2 |
| Total | 235 | 227 | 4 | 4 |

## Findings

1. HIGH: i=0,1, rom2764 pins 2/3 have swapped names. Correct pin 2=A12, pin 3=A7. Descriptions already have the correct bit numbers. Intel p.4-19, PDF 401. Principles: prove-it-works; fix-root-causes.
2. HIGH: i=58, cg-mcm6670 pin 1 originates at Z27 pin 13, not Z28. TRS-80 handbook p.35, PDF 36. Principles: prove-it-works; fix-root-causes.
3. MEDIUM: i=125, crtc6845 reset description omits the explicitly undefined HS output before R2 programming and the LPSTB test-mode condition. MC6845 p.9. Principle: prove-it-works.

There is no shared-state mutation in this data audit; serialize-shared-state-mutations has no applicable finding.

## Per-item decisions

| i | record | pin or field | decision | source page | evidence |
| ---: | --- | --- | --- | --- | --- |
| 0 | rom2764 | pin 2 / A7 / desc | WRONG | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 2 to A12. Address input, bit 12. |
| 1 | rom2764 | pin 3 / A12 / desc | WRONG | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 3 to A7. Address input, bit 7. |
| 2 | rom2764 | pin 4 / A6 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 4 to A6. Address input, bit 6. |
| 3 | rom2764 | pin 5 / A5 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 5 to A5. Address input, bit 5. |
| 4 | rom2764 | pin 6 / A4 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 6 to A4. Address input, bit 4. |
| 5 | rom2764 | pin 8 / A2 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 8 to A2. Address input, bit 2. |
| 6 | rom2764 | pin 10 / A0 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 10 to A0. Address input, bit 0. |
| 7 | rom2764 | pin 11 / D0 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 11 to D0/O0. Read data output; pin-names table calls these outputs. |
| 8 | rom2764 | pin 13 / D2 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 13 to D2/O2. Read data output; pin-names table calls these outputs. |
| 9 | rom2764 | pin 15 / D3 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 15 to D3/O3. Read data output; pin-names table calls these outputs. |
| 10 | rom2764 | pin 16 / D4 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 16 to D4/O4. Read data output; pin-names table calls these outputs. |
| 11 | rom2764 | pin 17 / D5 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 17 to D5/O5. Read data output; pin-names table calls these outputs. |
| 12 | rom2764 | pin 18 / D6 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 18 to D6/O6. Read data output; pin-names table calls these outputs. |
| 13 | rom2764 | pin 19 / D7 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 19 to D7/O7. Read data output; pin-names table calls these outputs. |
| 14 | rom2764 | pin 20 / /CE / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 20 to /CE. Mode-selection Read row requires /CE LOW and /OE LOW. |
| 15 | rom2764 | pin 21 / A10 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 21 to A10. Address input, bit 10. |
| 16 | rom2764 | pin 22 / /OE / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 22 to /OE. Read data output; pin-names table calls these outputs. |
| 17 | rom2764 | pin 23 / A11 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 23 to A11. Address input, bit 11. |
| 18 | rom2764 | pin 24 / A9 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 24 to A9. Address input, bit 9. |
| 19 | rom2764 | pin 25 / A8 / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 25 to A8. Address input, bit 8. |
| 20 | rom2764 | pin 26 / NC / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 26 to NC. 2764 NC at 26; adjacent 27128/27256 diagrams show A13. |
| 21 | rom2764 | pin 27 / /PGM / desc | CONFIRMED | Intel handbook 4-19 (PDF 401) | Figure 2 maps pin 27 to /PGM. Mode-selection Read row requires /PGM HIGH; adjacent 27256 diagram has A14 at 27. |
| 22 | rom27128 | pin 2 / A12 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 2 to A12. Address input, bit 12. |
| 23 | rom27128 | pin 3 / A7 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 3 to A7. Address input, bit 7. |
| 24 | rom27128 | pin 4 / A6 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 4 to A6. Address input, bit 6. |
| 25 | rom27128 | pin 5 / A5 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 5 to A5. Address input, bit 5. |
| 26 | rom27128 | pin 6 / A4 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 6 to A4. Address input, bit 4. |
| 27 | rom27128 | pin 7 / A3 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 7 to A3. Address input, bit 3. |
| 28 | rom27128 | pin 8 / A2 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 8 to A2. Address input, bit 2. |
| 29 | rom27128 | pin 9 / A1 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 9 to A1. Address input, bit 1. |
| 30 | rom27128 | pin 10 / A0 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 10 to A0. Address input, bit 0. |
| 31 | rom27128 | pin 11 / D0 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 11 to D0/O0. Read data output; pin-names table calls these outputs. |
| 32 | rom27128 | pin 12 / D1 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 12 to D1/O1. Read data output; pin-names table calls these outputs. |
| 33 | rom27128 | pin 13 / D2 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 13 to D2/O2. Read data output; pin-names table calls these outputs. |
| 34 | rom27128 | pin 15 / D3 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 15 to D3/O3. Read data output; pin-names table calls these outputs. |
| 35 | rom27128 | pin 16 / D4 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 16 to D4/O4. Read data output; pin-names table calls these outputs. |
| 36 | rom27128 | pin 17 / D5 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 17 to D5/O5. Read data output; pin-names table calls these outputs. |
| 37 | rom27128 | pin 18 / D6 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 18 to D6/O6. Read data output; pin-names table calls these outputs. |
| 38 | rom27128 | pin 19 / D7 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 19 to D7/O7. Read data output; pin-names table calls these outputs. |
| 39 | rom27128 | pin 20 / /CE / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 20 to /CE. Mode-selection Read row requires /CE LOW and /OE LOW. |
| 40 | rom27128 | pin 21 / A10 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 21 to A10. Address input, bit 10. |
| 41 | rom27128 | pin 22 / /OE / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 22 to /OE. Read data output; pin-names table calls these outputs. |
| 42 | rom27128 | pin 23 / A11 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 23 to A11. Address input, bit 11. |
| 43 | rom27128 | pin 24 / A9 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 24 to A9. Address input, bit 9. |
| 44 | rom27128 | pin 25 / A8 / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 25 to A8. Address input, bit 8. |
| 45 | rom27128 | pin 27 / /PGM / desc | CONFIRMED | Intel handbook 4-29 (PDF 411) | Figure 2 maps pin 27 to /PGM. Mode-selection Read row requires /PGM HIGH; adjacent 27256 diagram has A14 at 27. |
| 46 | mux14529 | pin 1 / STX / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 1 = STX. Truth table enables the corresponding half with its strobe HIGH; both strobes LOW give high impedance. |
| 47 | mux14529 | pin 2 / X0 / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 2 = X0. Truth-table B,A = 00 selects channel 0. Data paths explicitly bidirectional. |
| 48 | mux14529 | pin 3 / X1 / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 3 = X1. Truth-table B,A = 01 selects channel 1. Data paths explicitly bidirectional. |
| 49 | mux14529 | pin 4 / X2 / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 4 = X2. Truth-table B,A = 10 selects channel 2. Data paths explicitly bidirectional. |
| 50 | mux14529 | pin 5 / X3 / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 5 = X3. Truth-table B,A = 11 selects channel 3. Data paths explicitly bidirectional. |
| 51 | mux14529 | pin 6 / A / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 6 = A. Common select A is LSB and B is MSB in the truth table. |
| 52 | mux14529 | pin 7 / B / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 7 = B. Common select A is LSB and B is MSB in the truth table. |
| 53 | mux14529 | pin 9 / Z / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 9 = Z. Z carries selected X; W carries selected Y. Datasheet explicitly specifies bidirectional data paths. |
| 54 | mux14529 | pin 10 / W / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 10 = W. Z carries selected X; W carries selected Y. Datasheet explicitly specifies bidirectional data paths. |
| 55 | mux14529 | pin 11 / Y3 / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 11 = Y3. Truth-table B,A = 11 selects channel 3. Data paths explicitly bidirectional. |
| 56 | mux14529 | pin 12 / Y2 / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 12 = Y2. Truth-table B,A = 10 selects channel 2. Data paths explicitly bidirectional. |
| 57 | mux14529 | pin 15 / STY / desc | CONFIRMED | Motorola CMOS 7-457 (PDF 506) | Block diagram: pin 15 = STY. Truth table enables the corresponding half with its strobe HIGH; both strobes LOW give high impedance. |
| 58 | cg-mcm6670 | pin 1 / A6 / desc | WRONG | Motorola Memory 2-112 (PDF 129); TRS-80 handbook 35-36 (PDF 36-37) | Pin assignment and block diagram: 1 = A6. Handbook p.35 explicitly routes the bit-6 output of Z27 pin 13 to character generator Z29 pin 1. Z28 is the other ASCII latch; the stated Z28 origin is wrong. |
| 59 | cg-mcm6670 | pin 2 / A5 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129); TRS-80 handbook 35-36 (PDF 36-37) | Pin assignment and block diagram: 2 = A5. Handbook pp.35-36 identifies Z28 as the ASCII data latch, with bit 6 separately supplied by Z27 to pin 1. |
| 60 | cg-mcm6670 | pin 3 / A4 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129); TRS-80 handbook 35-36 (PDF 36-37) | Pin assignment and block diagram: 3 = A4. Handbook pp.35-36 identifies Z28 as the ASCII data latch, with bit 6 separately supplied by Z27 to pin 1. |
| 61 | cg-mcm6670 | pin 4 / A3 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129); TRS-80 handbook 35-36 (PDF 36-37) | Pin assignment and block diagram: 4 = A3. Handbook pp.35-36 identifies Z28 as the ASCII data latch, with bit 6 separately supplied by Z27 to pin 1. |
| 62 | cg-mcm6670 | pin 5 / A2 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129); TRS-80 handbook 35-36 (PDF 36-37) | Pin assignment and block diagram: 5 = A2. Handbook pp.35-36 identifies Z28 as the ASCII data latch, with bit 6 separately supplied by Z27 to pin 1. |
| 63 | cg-mcm6670 | pin 6 / A1 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129); TRS-80 handbook 35-36 (PDF 36-37) | Pin assignment and block diagram: 6 = A1. Handbook pp.35-36 identifies Z28 as the ASCII data latch, with bit 6 separately supplied by Z27 to pin 1. |
| 64 | cg-mcm6670 | pin 7 / A0 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129); TRS-80 handbook 35-36 (PDF 36-37) | Pin assignment and block diagram: 7 = A0. Handbook pp.35-36 identifies Z28 as the ASCII data latch, with bit 6 separately supplied by Z27 to pin 1. |
| 65 | cg-mcm6670 | pin 8 / RS3 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129) | Pin assignment and block diagram: 8 = RS3. Three-bit row decode selects one of seven dot rows; RS3 is MSB and RS1 LSB. |
| 66 | cg-mcm6670 | pin 10 / RS2 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129) | Pin assignment and block diagram: 10 = RS2. Three-bit row decode selects one of seven dot rows; RS3 is MSB and RS1 LSB. |
| 67 | cg-mcm6670 | pin 11 / RS1 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129) | Pin assignment and block diagram: 11 = RS1. Three-bit row decode selects one of seven dot rows; RS3 is MSB and RS1 LSB. |
| 68 | cg-mcm6670 | pin 12 / D0 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129) | Pin assignment and block diagram: 12 = D0. One of five parallel dot outputs; handbook p.36 describes row output, and shift register is the following video stage. |
| 69 | cg-mcm6670 | pin 13 / D1 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129) | Pin assignment and block diagram: 13 = D1. One of five parallel dot outputs; handbook p.36 describes row output, and shift register is the following video stage. |
| 70 | cg-mcm6670 | pin 14 / D2 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129) | Pin assignment and block diagram: 14 = D2. One of five parallel dot outputs; handbook p.36 describes row output, and shift register is the following video stage. |
| 71 | cg-mcm6670 | pin 15 / D3 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129) | Pin assignment and block diagram: 15 = D3. One of five parallel dot outputs; handbook p.36 describes row output, and shift register is the following video stage. |
| 72 | cg-mcm6670 | pin 16 / D4 / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129) | Pin assignment and block diagram: 16 = D4. One of five parallel dot outputs; handbook p.36 describes row output, and shift register is the following video stage. |
| 73 | cg-mcm6670 | pin 17 / /CS / desc | CONFIRMED | Motorola Memory 2-112 (PDF 129) | Pin assignment and block diagram: 17 = /CS. Inverted chip-select input shown controlling output buffers. |
| 74 | rom-dragon32-basic | pin 1 / A7 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 1 = A7. Address input, indicated bit. |
| 75 | rom-dragon32-basic | pin 2 / A6 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 2 = A6. Address input, indicated bit. |
| 76 | rom-dragon32-basic | pin 3 / A5 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 3 = A5. Address input, indicated bit. |
| 77 | rom-dragon32-basic | pin 6 / A2 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 6 = A2. Address input, indicated bit. |
| 78 | rom-dragon32-basic | pin 7 / A1 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 7 = A1. Address input, indicated bit. |
| 79 | rom-dragon32-basic | pin 9 / Q0 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 9 = Q0. Data output, indicated bit; Dragon sheet 1 labels the ROM bus D0-D7. |
| 80 | rom-dragon32-basic | pin 10 / Q1 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 10 = Q1. Data output, indicated bit; Dragon sheet 1 labels the ROM bus D0-D7. |
| 81 | rom-dragon32-basic | pin 11 / Q2 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 11 = Q2. Data output, indicated bit; Dragon sheet 1 labels the ROM bus D0-D7. |
| 82 | rom-dragon32-basic | pin 13 / Q3 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 13 = Q3. Data output, indicated bit; Dragon sheet 1 labels the ROM bus D0-D7. |
| 83 | rom-dragon32-basic | pin 14 / Q4 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 14 = Q4. Data output, indicated bit; Dragon sheet 1 labels the ROM bus D0-D7. |
| 84 | rom-dragon32-basic | pin 15 / Q5 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 15 = Q5. Data output, indicated bit; Dragon sheet 1 labels the ROM bus D0-D7. |
| 85 | rom-dragon32-basic | pin 16 / Q6 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 16 = Q6. Data output, indicated bit; Dragon sheet 1 labels the ROM bus D0-D7. |
| 86 | rom-dragon32-basic | pin 17 / Q7 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 17 = Q7. Data output, indicated bit; Dragon sheet 1 labels the ROM bus D0-D7. |
| 87 | rom-dragon32-basic | pin 18 / A11 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 18 = A11. Address input, indicated bit. |
| 88 | rom-dragon32-basic | pin 19 / A10 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 19 = A10. Address input, indicated bit. |
| 89 | rom-dragon32-basic | pin 20 / /E / desc / probe | UNVERIFIABLE | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 20 = /E. Address latching and output enabling are supported. Pages 2-192/2-193 specify standby E HIGH and active-low read timing. The custom-programming section p.2-194 discusses memory contents, not selectable enable polarity; no polarity mask option is stated. Dragon sheet 1 draws an active-low input. BASIC access pulses follow the selected ROM read cycle. |
| 90 | rom-dragon32-basic | pin 21 / A12 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 21 = A12. Address input, indicated bit. |
| 91 | rom-dragon32-basic | pin 22 / A9 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 22 = A9. Address input, indicated bit. |
| 92 | rom-dragon32-basic | pin 23 / A8 / desc | CONFIRMED | Motorola Memory 2-191 to 2-194 (PDF 209-212); Dragon SA2120 sheet 1 | Pin-assignment figure: pin 23 = A8. Address input, indicated bit. |
| 93 | pia6821 | pin 2 / PA0 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 2 = PA0. Peripheral data lines can each be programmed as input or output. |
| 94 | pia6821 | pin 4 / PA2 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 4 = PA2. Peripheral data lines can each be programmed as input or output. |
| 95 | pia6821 | pin 5 / PA3 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 5 = PA3. Peripheral data lines can each be programmed as input or output. |
| 96 | pia6821 | pin 6 / PA4 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 6 = PA4. Peripheral data lines can each be programmed as input or output. |
| 97 | pia6821 | pin 7 / PA5 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 7 = PA5. Peripheral data lines can each be programmed as input or output. |
| 98 | pia6821 | pin 9 / PA7 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 9 = PA7. Peripheral data lines can each be programmed as input or output. |
| 99 | pia6821 | pin 10 / PB0 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 10 = PB0. Peripheral data lines can each be programmed as input or output. |
| 100 | pia6821 | pin 11 / PB1 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 11 = PB1. Peripheral data lines can each be programmed as input or output. |
| 101 | pia6821 | pin 12 / PB2 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 12 = PB2. Peripheral data lines can each be programmed as input or output. |
| 102 | pia6821 | pin 13 / PB3 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 13 = PB3. Peripheral data lines can each be programmed as input or output. |
| 103 | pia6821 | pin 15 / PB5 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 15 = PB5. Peripheral data lines can each be programmed as input or output. |
| 104 | pia6821 | pin 16 / PB6 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 16 = PB6. Peripheral data lines can each be programmed as input or output. |
| 105 | pia6821 | pin 17 / PB7 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 17 = PB7. Peripheral data lines can each be programmed as input or output. |
| 106 | pia6821 | pin 18 / CB1 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 18 = CB1. CA1/CB1 are input-only interrupt lines; active transition is programmed by control register. |
| 107 | pia6821 | pin 19 / CB2 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 19 = CB2. CB2 is programmable as interrupt input or peripheral control output using control register B. |
| 108 | pia6821 | pin 21 / R/W / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 21 = R/W. R/W HIGH reads; LOW writes, qualified by E and chip selection. |
| 109 | pia6821 | pin 22 / CS0 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 22 = CS0. Selection requires CS0 and CS1 HIGH, /CS2 LOW. |
| 110 | pia6821 | pin 23 / /CS2 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 23 = /CS2. Selection requires CS0 and CS1 HIGH, /CS2 LOW. |
| 111 | pia6821 | pin 24 / CS1 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 24 = CS1. Selection requires CS0 and CS1 HIGH, /CS2 LOW. |
| 112 | pia6821 | pin 25 / E / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 25 = E. Enable pulse is the PIA timing input. |
| 113 | pia6821 | pin 27 / D6 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 27 = D6. Bidirectional three-state CPU data bus D0-D7. |
| 114 | pia6821 | pin 28 / D5 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 28 = D5. Bidirectional three-state CPU data bus D0-D7. |
| 115 | pia6821 | pin 29 / D4 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 29 = D4. Bidirectional three-state CPU data bus D0-D7. |
| 116 | pia6821 | pin 30 / D3 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 30 = D3. Bidirectional three-state CPU data bus D0-D7. |
| 117 | pia6821 | pin 31 / D2 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 31 = D2. Bidirectional three-state CPU data bus D0-D7. |
| 118 | pia6821 | pin 33 / D0 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 33 = D0. Bidirectional three-state CPU data bus D0-D7. |
| 119 | pia6821 | pin 34 / /RESET / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 34 = /RESET. Active-low RESET clears all PIA registers, including controls. |
| 120 | pia6821 | pin 35 / RS1 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 35 = RS1. RS0/RS1 select internal registers; table 1 gives addressing. |
| 121 | pia6821 | pin 36 / RS0 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 36 = RS0. RS0/RS1 select internal registers; table 1 gives addressing. |
| 122 | pia6821 | pin 37 / /IRQB / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 37 = /IRQB. IRQ outputs active LOW and explicitly open drain. |
| 123 | pia6821 | pin 38 / /IRQA / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 38 = /IRQA. IRQ outputs active LOW and explicitly open drain. |
| 124 | pia6821 | pin 40 / CA1 / desc | CONFIRMED | MC6821 PDF pp.1,6-8 | Pin assignment and expanded block diagram agree: pin 40 = CA1. CA1/CB1 are input-only interrupt lines; active transition is programmed by control register. |
| 125 | crtc6845 | pin 2 / /RESET / desc | WRONG | MC6845 PDF pp.1,9 | Pin-assignment figure: pin 2 = /RESET. RESET clears counters and leaves control registers unchanged, but p.9 explicitly says HS is undefined until R2 is programmed. Normal reset also requires LPSTB LOW; LPSTB HIGH selects test mode. Blanket claim that outputs are LOW omits this exception. |
| 126 | crtc6845 | pin 4 / MA0 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 4 = MA0. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 127 | crtc6845 | pin 5 / MA1 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 5 = MA1. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 128 | crtc6845 | pin 6 / MA2 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 6 = MA2. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 129 | crtc6845 | pin 7 / MA3 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 7 = MA3. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 130 | crtc6845 | pin 8 / MA4 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 8 = MA4. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 131 | crtc6845 | pin 9 / MA5 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 9 = MA5. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 132 | crtc6845 | pin 10 / MA6 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 10 = MA6. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 133 | crtc6845 | pin 11 / MA7 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 11 = MA7. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 134 | crtc6845 | pin 12 / MA8 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 12 = MA8. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 135 | crtc6845 | pin 13 / MA9 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 13 = MA9. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 136 | crtc6845 | pin 14 / MA10 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 14 = MA10. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 137 | crtc6845 | pin 16 / MA12 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 16 = MA12. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 138 | crtc6845 | pin 17 / MA13 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 17 = MA13. Memory-address output in MA0-MA13; p.8 says memory and row addresses continue during vertical retrace. |
| 139 | crtc6845 | pin 18 / DE / desc / probe | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 18 = DE. Display enable active HIGH in active display area. Timing diagram shows a horizontal enable window suppressed during vertical blanking. |
| 140 | crtc6845 | pin 19 / CURSOR / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 19 = CURSOR. Cursor output active HIGH and indicates a valid programmed cursor address. |
| 141 | crtc6845 | pin 21 / CLK / desc / probe | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 21 = CLK. Character-rate clock input; active transition HIGH to LOW (p.8). No CLK means timing generators cannot produce periodic sync. |
| 142 | crtc6845 | pin 22 / R/W / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 22 = R/W. R/W input selects write with LOW, read with HIGH. |
| 143 | crtc6845 | pin 24 / RS / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 24 = RS. RS LOW selects address register; HIGH selects pointed-to data register (pp.8-9; PCjr p.2-75). |
| 144 | crtc6845 | pin 25 / /CS / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 25 = /CS. CS selects register interface when LOW. |
| 145 | crtc6845 | pin 26 / D7 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 26 = D7. Bidirectional three-state D0-D7 processor bus. |
| 146 | crtc6845 | pin 27 / D6 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 27 = D6. Bidirectional three-state D0-D7 processor bus. |
| 147 | crtc6845 | pin 28 / D5 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 28 = D5. Bidirectional three-state D0-D7 processor bus. |
| 148 | crtc6845 | pin 29 / D4 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 29 = D4. Bidirectional three-state D0-D7 processor bus. |
| 149 | crtc6845 | pin 30 / D3 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 30 = D3. Bidirectional three-state D0-D7 processor bus. |
| 150 | crtc6845 | pin 31 / D2 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 31 = D2. Bidirectional three-state D0-D7 processor bus. |
| 151 | crtc6845 | pin 32 / D1 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 32 = D1. Bidirectional three-state D0-D7 processor bus. |
| 152 | crtc6845 | pin 33 / D0 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 33 = D0. Bidirectional three-state D0-D7 processor bus. |
| 153 | crtc6845 | pin 34 / RA4 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 34 = RA4. Row-address outputs RA0-RA4 select scan line in character-generator ROM. |
| 154 | crtc6845 | pin 35 / RA3 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 35 = RA3. Row-address outputs RA0-RA4 select scan line in character-generator ROM. |
| 155 | crtc6845 | pin 36 / RA2 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 36 = RA2. Row-address outputs RA0-RA4 select scan line in character-generator ROM. |
| 156 | crtc6845 | pin 37 / RA1 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 37 = RA1. Row-address outputs RA0-RA4 select scan line in character-generator ROM. |
| 157 | crtc6845 | pin 38 / RA0 / desc | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 38 = RA0. Row-address outputs RA0-RA4 select scan line in character-generator ROM. |
| 158 | crtc6845 | pin 39 / HS / desc / probe | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 39 = HS. HS is active-HIGH TTL-compatible horizontal sync; p.9 states undefined until R2 programmed. |
| 159 | crtc6845 | pin 40 / VS / desc / probe | CONFIRMED | MC6845 PDF pp.1,8-9 (timing/description pp.9-14 as applicable) | Pin-assignment figure: pin 40 = VS. VS is active-HIGH TTL-compatible vertical sync; timing diagrams show one pulse per frame. |
| 160 | fdc765 | pin 1 / RESET / desc / probe | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 1 = RESET. Reset idles FDC and clears drive outputs. Amstrad schematic shows RESET at 0 V in running condition. |
| 161 | fdc765 | pin 2 / /RD / desc / probe | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 2 = /RD. Active-low RD transfers FDC data to bus. Amstrad manual marks 4.6 V quiescent. |
| 162 | fdc765 | pin 3 / /WR / desc / probe | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 3 = /WR. Active-low WR transfers bus data to FDC. Amstrad manual marks 4.6 V quiescent. |
| 163 | fdc765 | pin 4 / /CS / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 4 = /CS. Active-low select. CPC schematic uses IC210-2 74LS132 with address and I/O decode for FDC access. |
| 164 | fdc765 | pin 5 / A0 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 5 = A0. A0=0 status register; A0=1 data register. |
| 165 | fdc765 | pin 6 / DB0 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 6 = DB0. Bidirectional data bus bit 0; NEC table groups pins 6-13 as DB0-DB7. |
| 166 | fdc765 | pin 7 / DB1 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 7 = DB1. Bidirectional data bus bit 1; NEC table groups pins 6-13 as DB0-DB7. |
| 167 | fdc765 | pin 8 / DB2 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 8 = DB2. Bidirectional data bus bit 2; NEC table groups pins 6-13 as DB0-DB7. |
| 168 | fdc765 | pin 9 / DB3 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 9 = DB3. Bidirectional data bus bit 3; NEC table groups pins 6-13 as DB0-DB7. |
| 169 | fdc765 | pin 10 / DB4 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 10 = DB4. Bidirectional data bus bit 4; NEC table groups pins 6-13 as DB0-DB7. |
| 170 | fdc765 | pin 11 / DB5 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 11 = DB5. Bidirectional data bus bit 5; NEC table groups pins 6-13 as DB0-DB7. |
| 171 | fdc765 | pin 12 / DB6 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 12 = DB6. Bidirectional data bus bit 6; NEC table groups pins 6-13 as DB0-DB7. |
| 172 | fdc765 | pin 13 / DB7 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 13 = DB7. Bidirectional data bus bit 7; NEC table groups pins 6-13 as DB0-DB7. |
| 173 | fdc765 | pin 14 / DRQ / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 14 = DRQ. DMA request output. CPC IC201 pin 14 explicitly has no-connection mark. |
| 174 | fdc765 | pin 15 / /DACK / desc / probe | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 15 = /DACK. Active-low DMA acknowledge. CPC pin 15 is tied through pull-up to +5 V and marked 5.0 V. |
| 175 | fdc765 | pin 17 / IDX / desc / probe | UNVERIFIABLE | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 17 = IDX. Index input is proven. Amstrad schematic marks a 2 ms index pulse; this is pulse width, not a 200 ms revolution interval. Neither accessible cited datasheet nor manual establishes the claimed 200 ms period; cited CPCWiki archive is HTTP 429 and live page HTTP 403. |
| 176 | fdc765 | pin 18 / INT / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 18 = INT. Interrupt output. CPC IC201 pin 18 has no-connection mark; main-status/data-register access supports polling. |
| 177 | fdc765 | pin 19 / CLK / desc / probe | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 19 = CLK. NEC specifies 8 MHz square-wave input. CPC manual pp.19-20 labels net S as 4 MHz, connects CPU clock to expansion CLOCK; pp.33-34 connects this CLOCK to FDC pin 19. |
| 178 | fdc765 | pin 21 / WCK / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 21 = WCK. Write-rate clock input. CPC IC213 divider feeds WCK. |
| 179 | fdc765 | pin 22 / RDW / desc / probe | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 22 = RDW. PLL read-data-window input. CPC diagram labels RDW at 250 kHz. |
| 180 | fdc765 | pin 23 / RDD / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 23 = RDD. Read data input, including clock/data bits, from CPC FDC9216 separator. |
| 181 | fdc765 | pin 24 / VCO / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 24 = VCO. VCO sync output. CPC pin 24 has no-connection mark. |
| 182 | fdc765 | pin 25 / WE / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 25 = WE. Write enable output to FDD. |
| 183 | fdc765 | pin 26 / MFM / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 26 = MFM. HIGH means MFM, LOW FM. CPC pin 26 has no-connection mark. |
| 184 | fdc765 | pin 27 / HD / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 27 = HD. Head select output; 0/1 selects head 0/1. |
| 185 | fdc765 | pin 28 / US1 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 28 = US1. Unit select bit 1 output. CPC schematic shows pin 28 unused. |
| 186 | fdc765 | pin 29 / US0 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 29 = US0. Unit select bit 0 output; CPC decoder selects the two drive connectors. |
| 187 | fdc765 | pin 30 / WDA / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 30 = WDA. Serial clock/data write output to FDD. |
| 188 | fdc765 | pin 31 / PS1 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 31 = PS1. Write precompensation PS1 output for early/late/normal MFM timing. |
| 189 | fdc765 | pin 32 / PS0 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 32 = PS0. Write precompensation PS0 output for early/late/normal MFM timing. |
| 190 | fdc765 | pin 33 / FLT/TR0 / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 33 = FLT/TR0. Fault input in read/write mode; track-zero input in seek mode. |
| 191 | fdc765 | pin 34 / WP/TS / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 34 = WP/TS. Write-protect input in read/write mode; two-sided-media input in seek mode. |
| 192 | fdc765 | pin 35 / RDY / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 35 = RDY. Ready input from FDD. |
| 193 | fdc765 | pin 36 / HDL / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 36 = HDL. Head-load output; CPC pin 36 has no-connection mark. |
| 194 | fdc765 | pin 37 / FR/STP / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 37 = FR/STP. Fault-reset output in read/write mode; step-pulse output in seek mode. |
| 195 | fdc765 | pin 38 / LCT/DIR / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 38 = LCT/DIR. Low-write-current output in read/write mode; direction output in seek mode. |
| 196 | fdc765 | pin 39 / RW/SEEK / desc | CONFIRMED | NEC PDF pp.1,3; Amstrad manual pp.19-20,33-34 (PDF 17,28) | NEC pin configuration and identification: pin 39 = RW/SEEK. HIGH selects SEEK; LOW read/write. |
| 197 | cpc664 | FDC clock: pin, frequency, levels, waveform, note | UNVERIFIABLE | NEC PDF pp.1-4,16 | Pin 19 CLK and square waveform are supported (p.3); VIL max 0.8 V and VIH min VCC-0.75 V are supported (p.2). At nominal VCC=5 V, VIH minimum is 4.25 V; this is a limit, not a measured waveform amplitude, and varies with VCC. Page 16 explicitly doubles all step/head timing at 4 rather than 8 MHz. However this sole cited document is silent on the CPC board frequency. The note mentions CPCWiki without providing it in sources; archived CPCWiki returned HTTP 429, live HTTP 403. Thus 4 MHz on this machine cannot be confirmed from this record citation. CPC6128 service manual elsewhere in batch supports its 4 MHz wiring, but is absent from this scope record. |
| 198 | cpc6128 | FDC clock: pin, frequency, levels, waveform, note | UNVERIFIABLE | NEC PDF pp.1-4,16 | Pin 19 CLK and square waveform are supported (p.3); VIL max 0.8 V and VIH min VCC-0.75 V are supported (p.2). At nominal VCC=5 V, VIH minimum is 4.25 V; this is a limit, not a measured waveform amplitude, and varies with VCC. Page 16 explicitly doubles all step/head timing at 4 rather than 8 MHz. However this sole cited document is silent on the CPC board frequency. The note mentions CPCWiki without providing it in sources; archived CPCWiki returned HTTP 429, live HTTP 403. Thus 4 MHz on this machine cannot be confirmed from this record citation. CPC6128 service manual elsewhere in batch supports its 4 MHz wiring, but is absent from this scope record. |
| 199 | msm5832 | pin 2 / WRITE / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 2 = WRITE. Write-cycle Figure 4 note 1: write occurs with CS, HOLD and WRITE HIGH. |
| 200 | msm5832 | pin 3 / READ / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 3 = READ. Read-cycle Figure 3 note 1: read occurs with CS and READ HIGH. |
| 201 | msm5832 | pin 4 / A0 / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 4 = A0. A0 register-address input (LSB). |
| 202 | msm5832 | pin 5 / A1 / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 5 = A1. A1 register-address input. |
| 203 | msm5832 | pin 6 / A2 / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 6 = A2. A2 register-address input. |
| 204 | msm5832 | pin 7 / A3 / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 7 = A3. A3 register-address input. |
| 205 | msm5832 | pin 8 / CS / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 8 = CS. CS HIGH enables the interface; LOW disables it. Higher threshold than other inputs permits power-fail lockout. |
| 206 | msm5832 | pin 9 / D0 / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 9 = D0. D0 is LSB bidirectional open-drain output; external pull-up at least 4.7 kohm. Reference table assigns D0=1024 Hz when A0-A3, READ, CS HIGH (independent of HOLD). Address HIGH alone is not a sufficient enable condition. |
| 207 | msm5832 | pin 10 / D1 / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 10 = D1. D1 bidirectional open drain; reference table gives 1 Hz with A0-A3, CS, READ HIGH and HOLD LOW. |
| 208 | msm5832 | pin 11 / D2 / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 11 = D2. D2 bidirectional open drain; reference table gives 1/60 Hz with A0-A3, CS, READ HIGH and HOLD LOW. |
| 209 | msm5832 | pin 12 / D3 / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 12 = D3. D3 MSB bidirectional open drain; reference table gives 1/3600 Hz with A0-A3, CS, READ HIGH and HOLD LOW. |
| 210 | msm5832 | pin 14 / TEST / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 14 = TEST. Normally open or grounded. With CS at VCC, test pulses directly clock the addressed counter. |
| 211 | msm5832 | pin 15 / Â±30 ADJ / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 15 = Â±30 ADJ. HIGH pulse at least 31.25 ms clears seconds 0-29; for seconds 30-59 clears seconds and increments minutes. |
| 212 | msm5832 | pin 16 / XT / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 16 = XT. 32.768 kHz crystal oscillator XT; external clock goes into XT. |
| 213 | msm5832 | pin 17 / /XT / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 17 = /XT. Complementary crystal terminal; leave open when driving XT externally. |
| 214 | msm5832 | pin 18 / HOLD / desc | CONFIRMED | OKI printed pp.251,254-258 (PDF 254,257-261) | OKI pin configuration: pin 18 = HOLD. HOLD HIGH inhibits internal 1 Hz clock; internal pull-down provided. All counters become static after 150 us setup; keep pulse less than 1 s for unchanged accuracy. |
| 215 | epci2661 | pin 1 / D2 / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 1 = D2. Data pin is part of bidirectional D0-D7 bus; table 2 explicitly identifies direction. |
| 216 | epci2661 | pin 2 / D3 / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 2 = D3. Data pin is part of bidirectional D0-D7 bus; table 2 explicitly identifies direction. |
| 217 | epci2661 | pin 6 / D5 / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 6 = D5. Data pin is part of bidirectional D0-D7 bus; table 2 explicitly identifies direction. |
| 218 | epci2661 | pin 7 / D6 / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 7 = D6. Data pin is part of bidirectional D0-D7 bus; table 2 explicitly identifies direction. |
| 219 | epci2661 | pin 9 / /TxC /XSYNC / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 9 = /TxC /XSYNC. Table 3: external transmit clock 1x/16x/64x; internal-clock mode permits 1x/16x output or external jam-sync input. |
| 220 | epci2661 | pin 10 / A1 / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 10 = A1. A1 register address input (table 4). |
| 221 | epci2661 | pin 12 / A0 / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 12 = A0. A0 register address input (table 4). |
| 222 | epci2661 | pin 13 / R/W / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 13 = R/W. Table 2 and table 4 explicitly use LOW for read and HIGH for write. |
| 223 | epci2661 | pin 14 / /RxRDY / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 14 = /RxRDY. Complement of SR1; LOW with received character pending; open drain (table 2). |
| 224 | epci2661 | pin 16 / /DCD / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 16 = /DCD. DCD must be LOW for receiver operation (table 3). |
| 225 | epci2661 | pin 17 / /CTS / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 17 = /CTS. CTS must be LOW for transmitter operation; current character completes before termination if CTS goes HIGH (table 3). |
| 226 | epci2661 | pin 18 / /TxEMT /DSCHG / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 18 = /TxEMT /DSCHG. Open-drain output for transmitter empty or DSR/DCD state change (table 2). |
| 227 | epci2661 | pin 19 / TxD / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 19 = TxD. Serial data output; mark HIGH, space LOW, held at mark when transmitter disabled (table 3). |
| 228 | epci2661 | pin 20 / BRCLK / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 20 = BRCLK. Baud-rate clock input. Table 1 gives 4.9152 MHz for A/B and 5.0688 MHz for C. |
| 229 | epci2661 | pin 21 / RESET / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 21 = RESET. Table 2: HIGH performs master reset. |
| 230 | epci2661 | pin 22 / /DSR / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 22 = /DSR. DSR general-purpose input (table 3). |
| 231 | epci2661 | pin 23 / /RTS / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 23 = /RTS. RTS general-purpose output, complement of CR5 (table 3). |
| 232 | epci2661 | pin 24 / /DTR / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 24 = /DTR. DTR general-purpose output, complement of CR1 (table 3). |
| 233 | epci2661 | pin 25 / /RxC /BKDET / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 25 = /RxC /BKDET. External receive-clock input; internal-clock mode permits 1x/16x output or break-detect output (table 3). |
| 234 | epci2661 | pin 28 / D1 / desc | CONFIRMED | Signetics 1-52 to 1-57 (PDF 57-62) | SC2661 pin configuration/designation: pin 28 = D1. Data pin is part of bidirectional D0-D7 bus; table 2 explicitly identifies direction. |

## Source availability and citation gaps

- CPCWiki archive: https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/765_FDC — blocked/rate-limited HTTP 429; live https://www.cpcwiki.eu/index.php/765_FDC returns HTTP 403. Web searches did not recover a readable copy. This is not proof that the source is permanently dead.
- i=89: linked Motorola datasheet is readable but silent on the claimed polarity mask option. Its read-cycle and standby specifications show active-low E.
- i=175: accessible sources establish the index pin and a 2 ms pulse width but do not establish the claimed 200 ms revolution period.
- i=197,198: NEC datasheet link is live and relevant to electrical limits, but silent on CPC-specific board clock frequency. Add the appropriate machine schematic source.

## Download inventory

- Source 0: https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf -> .factcheck-tmp\full\batch-23\source-0.pdf
- Source 1: https://bitsavers.org/components/motorola/_dataBooks/1978_Motorola_CMOS_Data_Book.pdf -> .factcheck-tmp\full\batch-23\source-1.pdf
- Source 2: https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21202-IO.gif -> .factcheck-tmp\full\batch-23\source-2.gif
- Source 3: https://archive.worldofdragon.org/browse/downloads/Books/InsideTheDragon%20-%20Smeed%20and%20Sommerville%20(1983).pdf -> .factcheck-tmp\full\batch-23\source-3.pdf
- Source 4: https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%201%20Schematic%20(Tandy).pdf -> .factcheck-tmp\full\batch-23\source-4.pdf
- Source 5: https://bitsavers.org/components/motorola/_dataBooks/1979_Motorola_Memory_Data_Book.pdf -> .factcheck-tmp\full\batch-23\source-5.pdf
- Source 6: https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf -> .factcheck-tmp\full\batch-23\source-6.pdf
- Source 7: https://bitsavers.org/components/motorola/_dataBooks/1981_82_Motorola_Memory_Databook.pdf -> .factcheck-tmp\full\batch-23\source-7.pdf
- Source 8: https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21201-CPU.gif -> .factcheck-tmp\full\batch-23\source-8.gif
- Source 9: https://bitsavers.org/components/motorola/_dataSheets/6821.pdf -> .factcheck-tmp\full\batch-23\source-9.pdf
- Source 10: https://bitsavers.org/components/motorola/_dataSheets/6845.pdf -> .factcheck-tmp\full\batch-23\source-10.pdf
- Source 11: https://bitsavers.org/pdf/ibm/pc/pc_jr/PCjr_Technical_Reference_Nov83.pdf -> .factcheck-tmp\full\batch-23\source-11.pdf
- Source 12: https://bitsavers.org/components/nec/_dataSheets/uPD765_Data_Sheet_Dec78.pdf -> .factcheck-tmp\full\batch-23\source-12.pdf
- Source 13: https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n27 -> .factcheck-tmp\full\batch-23\source-13.html
- Source 14: https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/765_FDC -> .factcheck-tmp\full\batch-23\source-14.html
- Source 15: https://bitsavers.org/components/oki/_dataBooks/1986_OKI_Microprocessor_Databook.pdf -> .factcheck-tmp\full\batch-23\source-15.pdf
- Source 16: https://bitsavers.org/components/signetics/_dataBooks/1982_Signetics_MOS_Microprocessor_Data_Manual.pdf -> .factcheck-tmp\full\batch-23\source-16.pdf
