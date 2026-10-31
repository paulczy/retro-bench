# batch-24 per-item fact-check ledger

All 225 items reviewed. Complete-claim decisions: supported pins/numbers with unsupported additional assertions are UNVERIFIABLE unless contradicted (WRONG). No data records modified.

All five source URLs returned HTTP200 using Python urllib with Mozilla/5.0. Required curl -L -A attempt failed locally with Schannel SEC_E_NO_CREDENTIALS for each URL. PDFs extracted with pdftotext -layout; WD and Model III image-only pages and ambiguous diagrams rendered at110dpi with pdftoppm and inspected. Source downloads 0=Model III,1=SSI,2=WD,3=PCjr TechRef,4=PCjr HMS.

Principles: wrong identities/state assumptions -> prove-it-works; DRQ/NMI and unsupported fault isolation -> fix-root-causes. No serialize-shared-state-mutations issue applies to this data batch.

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | sc02 | 1 | WRONG | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 1: AO analog audio output; VDD/2 bias; external speaker amplifier required. Record swaps AO and TP1 names; its description matches the pin but name does not. |
| 1 | sc02 | 3 | WRONG | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 3: TP1 do not use. Record swaps AO and TP1 names; its description matches the pin but name does not. |
| 2 | sc02 | 4 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 4: A/R open collector; low requests data; bar on R. |
| 3 | sc02 | 5 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 5: TP2 do not use. |
| 4 | sc02 | 6 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 6: RS2 register select, five registers. |
| 5 | sc02 | 7 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 7: RS1 register select. |
| 6 | sc02 | 8 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 8: RS0 register select. |
| 7 | sc02 | 9 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 9: D0 LSB input only. |
| 8 | sc02 | 10 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 10: D1 input only. |
| 9 | sc02 | 13 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 13: D3 input only. |
| 10 | sc02 | 14 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 14: D4 input only. |
| 11 | sc02 | 15 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 15: D5 input only. |
| 12 | sc02 | 16 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 16: D6 input only. |
| 13 | sc02 | 17 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 17: D7 MSB bidirectional; reads inverse of pin 4. |
| 14 | sc02 | 18 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 18: PD/RST low silences audio, retains bias/registers, disables A/R. |
| 15 | sc02 | 19 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 19: CS0 active high. |
| 16 | sc02 | 20 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 20: CS1 active low. |
| 17 | sc02 | 21 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 21: R/W low loads registers, high enables D7 only. |
| 18 | sc02 | 22 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 22: XCK approximately 1 or 2 MHz. |
| 19 | sc02 | 23 | CONFIRMED | SSI pp. 1-42, 1-45 (PDF 50, 53) | Pin 23: DIV2 high divides XCK by two, for approximately 2 MHz input. |
| 20 | fdc1793 | 1 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 1: NC internally tied to back-bias generator; must remain open. |
| 21 | fdc1793 | 2 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 2: WE low gates DAL to register when CS low. |
| 22 | fdc1793 | 3 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 3: CS low enables CPU communication. |
| 23 | fdc1793 | 4 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 4: RE low places register on DAL when CS low. |
| 24 | fdc1793 | 5 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 5: A0; A1:A0 00 status/command, 01 track, 10 sector, 11 data. |
| 25 | fdc1793 | 6 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 6: A1 register select. |
| 26 | fdc1793 | 7 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 7: DAL0 bidirectional data; 1793 true/non-inverted bus (also p.1 family table). |
| 27 | fdc1793 | 8 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 8: DAL1 bidirectional data; 1793 true/non-inverted bus (also p.1 family table). |
| 28 | fdc1793 | 9 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 9: DAL2 bidirectional data; 1793 true/non-inverted bus (also p.1 family table). |
| 29 | fdc1793 | 10 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 10: DAL3 bidirectional data; 1793 true/non-inverted bus (also p.1 family table). |
| 30 | fdc1793 | 11 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 11: DAL4 bidirectional data; 1793 true/non-inverted bus (also p.1 family table). |
| 31 | fdc1793 | 12 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 12: DAL5 bidirectional data; 1793 true/non-inverted bus (also p.1 family table). |
| 32 | fdc1793 | 13 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 13: DAL6 bidirectional data; 1793 true/non-inverted bus (also p.1 family table). |
| 33 | fdc1793 | 14 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 14: DAL7 bidirectional data; 1793 true/non-inverted bus (also p.1 family table). |
| 34 | fdc1793 | 15 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 15: STEP one pulse per step. |
| 35 | fdc1793 | 16 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 16: DIRC high steps in, low steps out. |
| 36 | fdc1793 | 17 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 17: EARLY high shifts current write pulse early. |
| 37 | fdc1793 | 18 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 18: LATE high shifts current write pulse late. |
| 38 | fdc1793 | 19 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 19: MR low loads command 03H; release executes RESTORE and loads sector 01H. |
| 39 | fdc1793 | 22 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 22: TEST tied to +5 V or open except voice-coil interface. |
| 40 | fdc1793 | 23 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 23: HLT high means head assumed engaged. |
| 41 | fdc1793 | 24 | CONFIRMED | WD pp.1, 2 (PDF same) | Pin 24: CLK free-running: 2 MHz 8-inch drives, 1 MHz mini-drives. |
| 42 | fdc1793 | 25 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 25: RG on 1791/3 detects zeros/ones for separator sync; SSO on 1795/7. |
| 43 | fdc1793 | 27 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 27: RAW READ negative pulse per recorded flux change. |
| 44 | fdc1793 | 28 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 28: HLD output controls head loading. |
| 45 | fdc1793 | 30 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 30: WG valid before writing. |
| 46 | fdc1793 | 31 | CONFIRMED | WD pp.1, 4 (PDF same) | Pin 31: WD 250 ns MFM, 500 ns FM per flux transition. |
| 47 | fdc1793 | 33 | CONFIRMED | WD pp.1, 4 (PDF same) | Pin 33: WG=1: WF input low terminates write; WG=0: VFOE output low during read once HLT=1. |
| 48 | fdc1793 | 34 | CONFIRMED | WD pp.1, 4 (PDF same) | Pin 34: TR00 low when head at track zero. |
| 49 | fdc1793 | 36 | CONFIRMED | WD pp.1, 4 (PDF same) | Pin 36: WPRT sampled on write command; low terminates and sets status. |
| 50 | fdc1793 | 37 | UNVERIFIABLE | WD p.4; Model III p.45 (PDF 56) | DDEN pin37 polarity confirmed. Model III F4H D7 set selects MFM, reset FM, inverted relative to DDEN. Source is silent on Model 4 routing: no Model 4 manual cited. |
| 51 | fdc1793 | 38 | WRONG | WD p.3; Model III pp.45-46 (PDF 56-57) | DRQ open drain, 10 kohm pull-up; full on read, empty on write. Model III DRQ clears CPU wait. INTRQ, not DRQ, generates end-of-transfer NMI, subject to enable. Model 4 routing not established. |
| 52 | fdc1793 | 39 | CONFIRMED | WD pp.1, 3 (PDF same) | Pin 39: INTRQ open drain; set on command completion; reset by status read or command write. |
| 53 | pcjr | Crystal | CONFIRMED | PCjr pp.2-6, B-3 (PDF 32,501) | 14.31818 MHz crystal; schematic Y1 connects 8284A X1 pin17 and X2 pin16. |
| 54 | pcjr | CLK (CPU and I/O channel) | CONFIRMED | PCjr pp.2-22-23, B-3 (PDF 48-49,501) | 14.31818 MHz /3 =4.7727267 MHz; 8284A CLK pin8 to 8088 CLK pin19; expansion A24 CLK. |
| 55 | pcjr | Colour reference | CONFIRMED | PCjr p.2-6 (PDF32) | Crystal /4 gives 3.579545 MHz color reference; no specific gate array pin claimed. |
| 56 | pcjr | Sound generator clock | CONFIRMED | PCjr p.2-89 (PDF115) | SN76496N features specify 3.579 MHz clock input; pin intentionally unspecified. |
| 57 | pcjr | Timer clock | WRONG | PCjr pp.2-35,B-11 (PDF61,509) | CLK0 pin9 and CLK2 pin18 fixed clock. CLK1 pin15 selectable: port A0 D5=0 selects 1.1925 MHz; D5=1 selects timer0 output. Single frequency does not cover both states. |
| 58 | jr-power | 1 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 1 to 17 VAC; signal and described function agree. Winding topology not documented; no center-tap claim made. |
| 59 | jr-power | 2 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 2 to GND; signal and described function agree. Winding topology not documented; no center-tap claim made. |
| 60 | jr-power | 3 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 3 to 17 VAC; signal and described function agree. Winding topology not documented; no center-tap claim made. |
| 61 | jr-psu | 1 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 1 to +12 V; signal and described function agree. |
| 62 | jr-psu | 3 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 3 to GND; signal and described function agree. |
| 63 | jr-psu | 4 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 4 to +5 V; signal and described function agree. |
| 64 | jr-psu | 5 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 5 to +5 V; signal and described function agree. |
| 65 | jr-psu | 6 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 6 to +5 V; signal and described function agree. |
| 66 | jr-psu | 8 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 8 to GND; signal and described function agree. |
| 67 | jr-psu | 9 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 9 to GND; signal and described function agree. |
| 68 | jr-psu | 10 | CONFIRMED | PCjr p.2-138 / PDF164 | Source diagram assigns 10 to +12 V; signal and described function agree. |
| 69 | jr-video | A1 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns A1 to -VERT SYNC; signal and described function agree. Digital signals are TTL; audio excepted. |
| 70 | jr-video | A3 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns A3 to -HORIZ SYNC; signal and described function agree. Digital signals are TTL; audio excepted. |
| 71 | jr-video | A4 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns A4 to BLUE; signal and described function agree. Digital signals are TTL; audio excepted. |
| 72 | jr-video | A5 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns A5 to RED; signal and described function agree. Digital signals are TTL; audio excepted. |
| 73 | jr-video | A6 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns A6 to INTEN; signal and described function agree. Digital signals are TTL; audio excepted. |
| 74 | jr-video | A7 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns A7 to GREEN; signal and described function agree. Digital signals are TTL; audio excepted. |
| 75 | jr-video | A8 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns A8 to COMP SYNC; signal and described function agree. Digital signals are TTL; audio excepted. |
| 76 | jr-video | A9 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns A9 to AUDIO; signal and described function agree. Digital signals are TTL; audio excepted. |
| 77 | jr-video | B1 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns B1 to +VERT SYNC; signal and described function agree. Digital signals are TTL; audio excepted. |
| 78 | jr-video | B2 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns B2 to LOGIC GND; signal and described function agree. Digital signals are TTL; audio excepted. |
| 79 | jr-video | B3 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns B3 to +HORIZ SYNC; signal and described function agree. Digital signals are TTL; audio excepted. |
| 80 | jr-video | B4 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns B4 to RESERVED; signal and described function agree. Digital signals are TTL; audio excepted. |
| 81 | jr-video | B5 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns B5 to LOGIC GND; signal and described function agree. Digital signals are TTL; audio excepted. |
| 82 | jr-video | B6 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns B6 to RESERVED; signal and described function agree. Digital signals are TTL; audio excepted. |
| 83 | jr-video | B7 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns B7 to RESERVED; signal and described function agree. Digital signals are TTL; audio excepted. |
| 84 | jr-video | B8 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns B8 to RESERVED; signal and described function agree. Digital signals are TTL; audio excepted. |
| 85 | jr-video | B9 | CONFIRMED | PCjr p.2-82 / PDF108 | Source diagram assigns B9 to SHIELD GND; signal and described function agree. Digital signals are TTL; audio excepted. |
| 86 | jr-comp | 1 | CONFIRMED | PCjr p.2-83 / PDF109 | Source diagram assigns 1 to VIDEO; signal and described function agree. |
| 87 | jr-comp | 2 | CONFIRMED | PCjr p.2-83 / PDF109 | Source diagram assigns 2 to GND; signal and described function agree. |
| 88 | jr-tv | A1 | CONFIRMED | PCjr p.2-83 / PDF109 | Source diagram assigns A1 to +12 V; signal and described function agree. |
| 89 | jr-tv | A2 | CONFIRMED | PCjr p.2-83 / PDF109 | Source diagram assigns A2 to KEY; signal and described function agree. |
| 90 | jr-tv | A3 | CONFIRMED | PCjr p.2-83 / PDF109 | Source diagram assigns A3 to COMPOSITE VIDEO; signal and described function agree. |
| 91 | jr-tv | B1 | CONFIRMED | PCjr p.2-83 / PDF109 | Source diagram assigns B1 to GND; signal and described function agree. |
| 92 | jr-tv | B2 | CONFIRMED | PCjr p.2-83 / PDF109 | Source diagram assigns B2 to AUDIO; signal and described function agree. |
| 93 | jr-tv | B3 | CONFIRMED | PCjr p.2-83 / PDF109 | Source diagram assigns B3 to SHIELD GND; signal and described function agree. |
| 94 | jr-lpen | A3 | CONFIRMED | PCjr p.2-75 / PDF101 | Source diagram assigns A3 to +5 V; signal and described function agree. |
| 95 | jr-lpen | B1 | CONFIRMED | PCjr p.2-75 / PDF101 | Source diagram assigns B1 to LOGIC GND; signal and described function agree. |
| 96 | jr-lpen | B3 | CONFIRMED | PCjr p.2-75 / PDF101 | Source diagram assigns B3 to UNUSED; signal and described function agree. |
| 97 | jr-kbd | A2 | CONFIRMED | PCjr p.3-88 / PDF254 | Source diagram assigns A2 to -CBL KEYBD DATA; signal and described function agree. |
| 98 | jr-kbd | A3 | CONFIRMED | PCjr p.3-88 / PDF254 | Source diagram assigns A3 to +5 V; signal and described function agree. |
| 99 | jr-kbd | B1 | CONFIRMED | PCjr p.3-88 / PDF254 | Source diagram assigns B1 to NC; signal and described function agree. B01 blank in cord table; NC means no signal listed, not an internal isolation guarantee. |
| 100 | jr-kbd | B3 | CONFIRMED | PCjr p.3-88 / PDF254 | Source diagram assigns B3 to LOGIC GND; signal and described function agree. |
| 101 | jr-ir | A1 | CONFIRMED | PCjr p.2-100 / PDF126 | Source diagram assigns A1 to +12 V; signal and described function agree. |
| 102 | jr-ir | A2 | CONFIRMED | PCjr p.2-100 / PDF126 | Source diagram assigns A2 to GND; signal and described function agree. |
| 103 | jr-ir | A3 | CONFIRMED | PCjr p.2-100 / PDF126 | Source diagram assigns A3 to GND SHIELD; signal and described function agree. |
| 104 | jr-ir | A4 | CONFIRMED | PCjr p.2-100 / PDF126 | Source diagram assigns A4 to IR TEST FREQ; signal and described function agree. A04 is input to receiver, therefore output from system. |
| 105 | jr-ir | B1 | CONFIRMED | PCjr p.2-100 / PDF126 | Source diagram assigns B1 to GND; signal and described function agree. |
| 106 | jr-ir | B2 | CONFIRMED | PCjr p.2-100 / PDF126 | Source diagram assigns B2 to +5 V; signal and described function agree. |
| 107 | jr-ir | B3 | CONFIRMED | PCjr p.2-100 / PDF126 | Source diagram assigns B3 to -IR KBD DATA; signal and described function agree. |
| 108 | jr-ir | B4 | CONFIRMED | PCjr p.2-100 / PDF126 | Source diagram assigns B4 to GND; signal and described function agree. |
| 109 | jr-joy | A1 | CONFIRMED | PCjr p.2-123 / PDF149 | Source diagram assigns A1 to KEY; signal and described function agree. |
| 110 | jr-joy | A2 | CONFIRMED | PCjr p.2-123 / PDF149 | Source diagram assigns A2 to LOGIC GND; signal and described function agree. |
| 111 | jr-joy | A3 | CONFIRMED | PCjr p.2-123 / PDF149 | Source diagram assigns A3 to Y-AXIS; signal and described function agree. |
| 112 | jr-joy | A4 | CONFIRMED | PCjr p.2-123 / PDF149 | Source diagram assigns A4 to +5 V; signal and described function agree. |
| 113 | jr-joy | B3 | CONFIRMED | PCjr p.2-123 / PDF149 | Source diagram assigns B3 to SWITCH; signal and described function agree. |
| 114 | jr-joy | B4 | CONFIRMED | PCjr p.2-123 / PDF149 | Source diagram assigns B4 to SWITCH; signal and described function agree. |
| 115 | jr-ser | A1 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns A1 to UNUSED; signal and described function agree. |
| 116 | jr-ser | A2 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns A2 to DTR; signal and described function agree. |
| 117 | jr-ser | A4 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns A4 to TXD; signal and described function agree. |
| 118 | jr-ser | A5 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns A5 to CD; signal and described function agree. |
| 119 | jr-ser | A6 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns A6 to DSR; signal and described function agree. |
| 120 | jr-ser | A7 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns A7 to CTS; signal and described function agree. |
| 121 | jr-ser | A8 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns A8 to RXD; signal and described function agree. |
| 122 | jr-ser | B1 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns B1 to SHIELD GND; signal and described function agree. |
| 123 | jr-ser | B2 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns B2 to LOGIC GND; signal and described function agree. |
| 124 | jr-ser | B3 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns B3 to LOGIC GND; signal and described function agree. |
| 125 | jr-ser | B4 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns B4 to LOGIC GND; signal and described function agree. |
| 126 | jr-ser | B5 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns B5 to LOGIC GND; signal and described function agree. |
| 127 | jr-ser | B6 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns B6 to LOGIC GND; signal and described function agree. |
| 128 | jr-ser | B7 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns B7 to LOGIC GND; signal and described function agree. |
| 129 | jr-ser | B8 | CONFIRMED | PCjr p.2-134 / PDF160 | Source diagram assigns B8 to LOGIC GND; signal and described function agree. |
| 130 | jr-cass | A2 | CONFIRMED | PCjr p.2-41 / PDF67 | Source diagram assigns A2 to CASS AUDIO IN; signal and described function agree. |
| 131 | jr-cass | A3 | CONFIRMED | PCjr p.2-41 / PDF67 | Source diagram assigns A3 to MIKE AUDIO OUT; signal and described function agree. |
| 132 | jr-cass | B1 | CONFIRMED | PCjr p.2-41 / PDF67 | Source diagram assigns B1 to KEY; signal and described function agree. |
| 133 | jr-cass | B2 | CONFIRMED | PCjr p.2-41 / PDF67 | Source diagram assigns B2 to AUX DATA OUT; signal and described function agree. |
| 134 | jr-cass | B4 | CONFIRMED | PCjr p.2-41 / PDF67 | Source diagram assigns B4 to SHIELD GND; signal and described function agree. |
| 135 | jr-audio | 1 | CONFIRMED | PCjr p.2-87 / PDF113 | Source diagram assigns 1 to AUDIO; signal and described function agree. |
| 136 | jr-audio | 2 | CONFIRMED | PCjr p.2-87 / PDF113 | Source diagram assigns 2 to GND; signal and described function agree. |
| 137 | jr-cart | A1 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A1 to GND; signal and described function agree. |
| 138 | jr-cart | A2 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A2 to CARTRIDGE RESET TAB; signal and described function agree. |
| 139 | jr-cart | A3 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A3 to -CS5; signal and described function agree. |
| 140 | jr-cart | A5 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A5 to A13; signal and described function agree. |
| 141 | jr-cart | A6 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A6 to A8; signal and described function agree. |
| 142 | jr-cart | A8 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A8 to A11; signal and described function agree. |
| 143 | jr-cart | A9 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A9 to -BASE 2 ROM IN CARTRIDGE; signal and described function agree. |
| 144 | jr-cart | A10 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A10 to A10; signal and described function agree. |
| 145 | jr-cart | A11 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A11 to D7; signal and described function agree. |
| 146 | jr-cart | A13 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A13 to D5; signal and described function agree. |
| 147 | jr-cart | A14 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A14 to D4; signal and described function agree. |
| 148 | jr-cart | A15 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A15 to D3; signal and described function agree. |
| 149 | jr-cart | A16 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A16 to -CS2; signal and described function agree. |
| 150 | jr-cart | A17 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns A17 to -CS4; signal and described function agree. |
| 151 | jr-cart | B1 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B1 to GND; signal and described function agree. |
| 152 | jr-cart | B2 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B2 to -CS7; signal and described function agree. |
| 153 | jr-cart | B4 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B4 to A14; signal and described function agree. |
| 154 | jr-cart | B6 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B6 to A7; signal and described function agree. |
| 155 | jr-cart | B7 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B7 to A6; signal and described function agree. |
| 156 | jr-cart | B8 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B8 to A5; signal and described function agree. |
| 157 | jr-cart | B9 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B9 to A4; signal and described function agree. |
| 158 | jr-cart | B10 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B10 to A3; signal and described function agree. |
| 159 | jr-cart | B11 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B11 to A2; signal and described function agree. |
| 160 | jr-cart | B13 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B13 to A0; signal and described function agree. |
| 161 | jr-cart | B14 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B14 to D0; signal and described function agree. |
| 162 | jr-cart | B15 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B15 to D1; signal and described function agree. |
| 163 | jr-cart | B16 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B16 to D2; signal and described function agree. |
| 164 | jr-cart | B17 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B17 to -CS6; signal and described function agree. |
| 165 | jr-cart | B18 | CONFIRMED | PCjr p.2-117 / PDF143 | Source diagram assigns B18 to +5 V; signal and described function agree. |
| 166 | jr-io | A1 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A1 to D0; signal and described function agree. |
| 167 | jr-io | A2 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A2 to +12 V; signal and described function agree. |
| 168 | jr-io | A3 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A3 to D3; signal and described function agree. |
| 169 | jr-io | A4 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A4 to D5; signal and described function agree. |
| 170 | jr-io | A6 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A6 to +5 V; signal and described function agree. |
| 171 | jr-io | A7 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A7 to A1; signal and described function agree. |
| 172 | jr-io | A8 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A8 to A3; signal and described function agree. |
| 173 | jr-io | A9 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A9 to A4; signal and described function agree. |
| 174 | jr-io | A10 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A10 to GND; signal and described function agree. |
| 175 | jr-io | A11 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A11 to A7; signal and described function agree. |
| 176 | jr-io | A12 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A12 to A9; signal and described function agree. |
| 177 | jr-io | A13 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A13 to A10; signal and described function agree. |
| 178 | jr-io | A14 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A14 to DRQ0; signal and described function agree. |
| 179 | jr-io | A15 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A15 to A13; signal and described function agree. |
| 180 | jr-io | A16 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A16 to A14; signal and described function agree. |
| 181 | jr-io | A17 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A17 to A16; signal and described function agree. |
| 182 | jr-io | A18 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A18 to GND; signal and described function agree. |
| 183 | jr-io | A19 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A19 to A18; signal and described function agree. |
| 184 | jr-io | A20 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A20 to -IOR; signal and described function agree. |
| 185 | jr-io | A21 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A21 to -IOW; signal and described function agree. |
| 186 | jr-io | A24 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A24 to CLK; signal and described function agree. |
| 187 | jr-io | A25 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A25 to RESET; signal and described function agree. |
| 188 | jr-io | A26 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A26 to +5 V; signal and described function agree. |
| 189 | jr-io | A27 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A27 to -HRQ; signal and described function agree. |
| 190 | jr-io | A29 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A29 to IRQ2; signal and described function agree. |
| 191 | jr-io | A30 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns A30 to RESERVED; signal and described function agree. |
| 192 | jr-io | B1 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B1 to D1; signal and described function agree. |
| 193 | jr-io | B3 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B3 to D4; signal and described function agree. |
| 194 | jr-io | B5 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B5 to D7; signal and described function agree. |
| 195 | jr-io | B6 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B6 to A0; signal and described function agree. |
| 196 | jr-io | B7 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B7 to A2; signal and described function agree. |
| 197 | jr-io | B8 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B8 to SHIELD GND; signal and described function agree. |
| 198 | jr-io | B9 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B9 to A5; signal and described function agree. |
| 199 | jr-io | B10 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B10 to A6; signal and described function agree. |
| 200 | jr-io | B11 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B11 to A8; signal and described function agree. |
| 201 | jr-io | B12 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B12 to -DACK0; signal and described function agree. |
| 202 | jr-io | B13 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B13 to A11; signal and described function agree. |
| 203 | jr-io | B14 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B14 to A12; signal and described function agree. |
| 204 | jr-io | B15 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B15 to SHIELD GND; signal and described function agree. |
| 205 | jr-io | B16 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B16 to A15; signal and described function agree. |
| 206 | jr-io | B18 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B18 to A17; signal and described function agree. |
| 207 | jr-io | B19 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B19 to A19; signal and described function agree. |
| 208 | jr-io | B20 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B20 to SHIELD GND; signal and described function agree. |
| 209 | jr-io | B21 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B21 to -MEMR; signal and described function agree. |
| 210 | jr-io | B22 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B22 to -MEMW; signal and described function agree. |
| 211 | jr-io | B23 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B23 to ALE; signal and described function agree. |
| 212 | jr-io | B24 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B24 to SHIELD GND; signal and described function agree. |
| 213 | jr-io | B26 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B26 to READY; signal and described function agree. |
| 214 | jr-io | B27 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B27 to -CARD SLCTD; signal and described function agree. |
| 215 | jr-io | B28 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B28 to SHIELD GND; signal and described function agree. |
| 216 | jr-io | B29 | CONFIRMED | PCjr p.2-22-23 / PDF48-49 | Source diagram assigns B29 to IRQ7; signal and described function agree. |
| 217 | pcjr | Power board outputs | UNVERIFIABLE | PCjr pp.2-136-138 (PDF162-164); HMS p.3-020-9 (PDF63) | Edge pins4-7 +5V,1/10 +12V,2 ground; tolerances and 5s reset supported. Cited TechRef is silent on attributed HMS 4.7-5.3V diskette test. Test exists in uncited HMS PDF63, requiring disconnected diskette and fan cables. Reset also requires fault removal. Low output alone does not isolate faulty board. |
| 218 | pcjr | Reset | CONFIRMED | PCjr pp.2-22-23,B-3 (PDF48-49,501) | A25 RESET active high at power-up,26.5us duration. Schematic: 8088 RESET pin21; 8284A RES pin11, reset output pin10. Checking the reset driving circuit follows documented connections. |
| 219 | pcjr | Crystal | UNVERIFIABLE | PCjr pp.2-6,B-3 (PDF32,501) | 14.31818MHz and 8284A X1 pin17 confirmed. Source silent on probe stopping weak crystal and proposed failure diagnosis; no measurement-method source cited. |
| 220 | pcjr | CPU clock | UNVERIFIABLE | PCjr pp.2-22-23,B-3 (PDF48-49,501) | A24,8284A pin8,8088 pin19,4.77MHz,33% duty,210ns confirmed. Source silent on asserted failure isolation: missing output requires checking crystal/input,supply,mode before condemning IC; source present/CPU absent does not prove open trace rather than load/short. |
| 221 | pcjr | +5 V | CONFIRMED | PCjr pp.2-136,2-138,B-3 (PDF162,164,501) | +5V +/-5%=4.75-5.25V;1.5-3.6A; edge pins4-7; CPU VCC pin40 in schematic. |
| 222 | pcjr | +12 V | CONFIRMED | PCjr pp.2-136,2-138 (PDF162,164) | +12V +/-5%=11.4-12.6V;0.04-1.2A; edge pins1 and10. |
| 223 | pcjr | -6 V | CONFIRMED | PCjr pp.2-136,2-138 (PDF162,164) | -6V +/-16% endpoints -6.96,-5.04V;0-25mA; minimum1.5A +5V load required. No -6V entry in edge connector table. |
| 224 | pcjr | Transformer AC | WRONG | PCjr p.2-138 (PDF164); HMS p.3-020-8 (PDF62) | HMS 15.0-30.0VAC test is between pins1 and3 of disconnected TRANSFORMER CABLE PLUG, system switch off, not system socket P. Cited TechRef only gives17VAC labels; silent on HMS range. Correct location and add HMS citation. Winding topology undocumented. |

| kind | items | confirmed | wrong | unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 53 | 49 | 3 | 1 |
| clock-row | 5 | 4 | 1 | 0 |
| connector-pin | 159 | 159 | 0 | 0 |
| first-ten | 4 | 1 | 0 | 3 |
| rail | 4 | 3 | 1 | 0 |

Wrong findings: high i0/i1 AO-TP1 swap; medium i51 DRQ/NMI, i57 timer1 selectable clock, i224 wrong side of unplugged power connection. All URLs live. i224 cites wrong document for HMS test; i217 omits HMS test citation.
