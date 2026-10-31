# batch-11 fact-check ledger

Input: batch-11.json, 224 items, read-only data snapshot specified as commit 4b85bd0. All numbers and pin references in rail, clock-row and first-ten records were checked. One decision covers the entire item; a proven pin with an unproven diagnostic clause remains UNVERIFIABLE. Frequencies described as approximate are accepted at matching precision; extra asserted digits without support are not.

Printed page numbers are given first; PDF page numbers are 1-based. Source PDFs, UTF-8 pdftotext -layout extracts, and page renders at 110 dpi are retained in batch-11/. The default Git curl failed with SEC_E_NO_CREDENTIALS; MSYS curl succeeded with -L -A Mozilla/5.0. No cited document was dead or blocked. All eight source documents were downloaded once; metadata was used to locate Internet Archive PDF derivatives.

Principle mapping: all findings concern prove-it-works; repeated signal/direction errors and diagnostic overreach also concern fix-root-causes. No shared-state mutation is reviewed or alleged; serialize-shared-state-mutations is not applicable to these static source facts.

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | glu2c | pin 1 A0 | WRONG | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 1 = 14M, master clock 14.318 MHz input. The record name is crossed with the adjacent pin; its description/type instead matches this actual signal. HIGH; prove-it-works; fix-root-causes. |
| 1 | glu2c | pin 2 14M | WRONG | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 2 = A0, address input. The record name is crossed with the adjacent pin; its description/type instead matches this actual signal. HIGH; prove-it-works; fix-root-causes. |
| 2 | glu2c | pin 3 A3 | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 3 = A3, address input. |
| 3 | glu2c | pin 4 A4 | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 4 = A4, address input. |
| 4 | glu2c | pin 5 A5 | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 5 = A5, address input. |
| 5 | glu2c | pin 6 A6 | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 6 = A6, address input. |
| 6 | glu2c | pin 7 A7 | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 7 = A7, address input. |
| 7 | glu2c | pin 8 Φ0 | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 8 = phase 0 input, 1.0227 MHz. |
| 8 | glu2c | pin 10 GR | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 10 = GR graphics select input. |
| 9 | glu2c | pin 11 /RESET | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 11 = RESET active-low system reset input. |
| 10 | glu2c | pin 13 /GLUEN | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 13 = GLUEN active-low enable input. |
| 11 | glu2c | pin 15 R/W | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 15 = R/W processor qualifier input. |
| 12 | glu2c | pin 16 TEXT | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 16 = TEXT video timing output for double hi-res or non-graphics. |
| 13 | glu2c | pin 17 NC | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 17 = NC. |
| 14 | glu2c | pin 18 NC | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 18 = NC. |
| 15 | glu2c | pin 19 CREF | CONFIRMED | IIc TRM p. 246 (PDF 274); p. 245 | Figure 11-8 / Table 11-10: pin 19 = CREF colour reference input. TMG CREF is 3.5795 MHz, p. 245. |
| 16 | glu2c | pin 20 7M | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 20 = 7M clock output. |
| 17 | glu2c | pin 22 IOUHOLE | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 22 = IOUHOLE output controls IOUSELIO. |
| 18 | glu2c | pin 23 /SER | CONFIRMED | IIc TRM p. 246 (PDF 274) | Figure 11-8 / Table 11-10: pin 23 = SER active-low serial select output. |
| 19 | iwm344 | pin 1 SEEKPH0 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 1 = SEEKPH0 stepper phase output. |
| 20 | iwm344 | pin 2 SEEKPH2 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 2 = SEEKPH2 stepper phase output. |
| 21 | iwm344 | pin 3 A0 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 3 = A0 state-bit data input. |
| 22 | iwm344 | pin 4 A1 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 4 = A1 state-bit select input. |
| 23 | iwm344 | pin 5 A2 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 5 = A2 state-bit select input. |
| 24 | iwm344 | pin 6 A3 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 6 = A3 state-bit select input. |
| 25 | iwm344 | pin 7 /DISK | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 7 = DISK active-low enable; falling edge latches A1-A3. |
| 26 | iwm344 | pin 8 WRDATA | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 8 = WRDATA serial output; each 1 bit causes a transition. |
| 27 | iwm344 | pin 9 /WRREQ | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 9 = WRREQ programmable buffered write-request output. |
| 28 | iwm344 | pin 10 D0 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 10 = D0 bidirectional data. |
| 29 | iwm344 | pin 11 D1 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 11 = D1 bidirectional data. |
| 30 | iwm344 | pin 12 D2 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 12 = D2 bidirectional data. |
| 31 | iwm344 | pin 13 D3 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 13 = D3 bidirectional data. |
| 32 | iwm344 | pin 15 D4 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 15 = D4 bidirectional data. |
| 33 | iwm344 | pin 16 D5 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 16 = D5 bidirectional data. |
| 34 | iwm344 | pin 17 D6 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 17 = D6 bidirectional data. |
| 35 | iwm344 | pin 18 D7 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 18 = D7 bidirectional data. |
| 36 | iwm344 | pin 19 /DR2 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 19 = DR2 active-low drive 2 select output. |
| 37 | iwm344 | pin 20 /DR1 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 20 = DR1 active-low drive 1 select output. |
| 38 | iwm344 | pin 21 WRPROT | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 21 = WRPROT input, status-register bit 7. |
| 39 | iwm344 | pin 22 RDDATA | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 22 = RDDATA serial input; falling transitions synchronized. |
| 40 | iwm344 | pin 23 /RESET | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 23 = RESET active-low input; inactive outputs and cleared state/mode registers. |
| 41 | iwm344 | pin 24 7M | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276); pp. 240, 245 | Figure 11-9 / Table 11-11: pin 24 = 7M clock input. TMG 7M is 7.159 MHz (p. 245), consistent with 7.16 MHz probe target. |
| 42 | iwm344 | pin 25 Q3 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276); pp. 240, 245 | Figure 11-9 / Table 11-11: pin 25 = Q3 2 MHz serial-timing clock input. Table 11-6 (p. 240) gives Q3 about 2.045 MHz and asymmetric duty cycle; 2.04 MHz is an approximate probe target. |
| 43 | iwm344 | pin 27 SEEKPH3 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 27 = SEEKPH3 stepper phase output. |
| 44 | iwm344 | pin 28 SEEKPH1 | CONFIRMED | IIc TRM pp. 247-248 (PDF 275-276) | Figure 11-9 / Table 11-11: pin 28 = SEEKPH1 stepper phase output. |
| 45 | unidisk525 | IWM 7M (IIc) | UNVERIFIABLE | IIc TRM pp. 248, 245 | Source silent on the asserted 7.15909 MHz precision. Pin 24 = 7M is proven; Table 11-11 says 7 MHz and Table 11-9 says 7.159 MHz. Cite a crystal/divider specification for the extra digits. |
| 46 | unidisk525 | IWM Q3 (IIc) | UNVERIFIABLE | IIc TRM pp. 248, 240 | Source silent on the asserted 2.0454 MHz precision. Pin 25 = Q3 is proven; Table 11-11 says 2.0 MHz and Table 11-6 says 2.045 MHz, asymmetric. |
| 47 | unidisk525 | step 5 Read data | UNVERIFIABLE | IIc TRM pp. 247-248, 274 | RDDATA is DB19 pin 18 and IWM pin 22; falling-edge pulse input is proven. Source silent on the exclusive fault diagnosis that signal at the connector but absent at the IWM proves port wiring; it does not rule out a loaded/failed input or a measurement problem. |
| 48 | unidisk525 | step 6 IIc disk clocks | UNVERIFIABLE | IIc TRM pp. 240, 245, 248 | Pin 24 = 7M (~7.159 MHz); pin 25 = Q3 (~2.045 MHz), supporting approximate 7.16/2.04 MHz. Source silent on the exclusive diagnosis that a missing clock identifies TMG and excludes drive-related loading or another failure. |
| 49 | unidisk525 | +5 V | CONFIRMED | IIc TRM p. 234, Fig. 11-26 p. 274; TA37054 p. 1 | Table 11-4: +5 V +/-5% = 4.75-5.25 V and 1.5 A converter-wide maximum. Figure 11-26 and cable table: DB19 pin 6 = +5 V. DuoDisk p. 2.2 establishes shared mechanical assembly only, not these electrical limits. |
| 50 | unidisk525 | +12 V | CONFIRMED | IIc TRM p. 234, Fig. 11-26 p. 274; TA37054 p. 1 | Table 11-4: +12 V +/-10% = 10.8-13.2 V; converter-wide 0.6 A continuous, 0.9 A intermittent, 1.5 A surge under 100 ms. Figure 11-26 / cable table: DB19 pins 7 and 8 = +12 V; converter powers internal electronics and external drive. |
| 51 | unidisk525 | -12 V | CONFIRMED | IIc TRM p. 234, Fig. 11-26 p. 274; TA37054 p. 1 | Figure 11-26 and TA37054: DB19 pin 5 = -12 V. Table 11-4: 100 mA converter-wide maximum. This is not an available accessory-power budget. |
| 52 | 2c-audio | pin T Audio | CONFIRMED | IIc TRM p. 256 (PDF 284), Fig. 11-18 | Binaural-jack drawing: two audio contacts and common ground; text says monaural audio is supplied to both channels. Tip/left and ring/right carry that same programme; sleeve is grounded. |
| 53 | 2c-audio | pin R Audio | CONFIRMED | IIc TRM p. 256 (PDF 284), Fig. 11-18 | Binaural-jack drawing: two audio contacts and common ground; text says monaural audio is supplied to both channels. Tip/left and ring/right carry that same programme; sleeve is grounded. |
| 54 | 2c-audio | pin S GND | CONFIRMED | IIc TRM p. 256 (PDF 284), Fig. 11-18 | Binaural-jack drawing: two audio contacts and common ground; text says monaural audio is supplied to both channels. Tip/left and ring/right carry that same programme; sleeve is grounded. |
| 55 | 2c-video | pin 1 VIDOUT | CONFIRMED | IIc TRM p. 270 (PDF 298) | Monitor-output paragraph: centre/tip is composite video, attenuated to about 1 V, impedance matched to 75 ohms. |
| 56 | 2c-video | pin 2 GND | CONFIRMED | IIc TRM p. 270 (PDF 298) | Monitor-output paragraph explicitly connects sleeve to ground (0 V reference). |
| 57 | 2c-video-exp | pin 1 TEXT | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 1 = TEXT, inverse GR except double hi-res, from TMG. |
| 58 | 2c-video-exp | pin 2 14M | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301); pp. 245, 258, 270 as applicable | Figure 11-25 / Table 11-17: connector pin 2 = 14M system oscillator. Table 11-9 p. 245 gives master oscillator 14.318 MHz. |
| 59 | 2c-video-exp | pin 3 /SYNC | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301); pp. 245, 258, 270 as applicable | Figure 11-25 / Table 11-17: connector pin 3 = SYNC from IOU pin 39, horizontal and vertical sync. NTSC horizontal timing approximately 15.7 kHz follows IOU scan description, p. 258. |
| 60 | 2c-video-exp | pin 4 SEGB | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 4 = SEGB vertical counter from IOU pin 4. |
| 61 | 2c-video-exp | pin 5 1VSOUND | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 5 = 1VSOUND one-volt sound from AUD pin 5. |
| 62 | 2c-video-exp | pin 6 /LDPS | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 6 = LDPS shift-register load from TMG pin 12. |
| 63 | 2c-video-exp | pin 7 /WNDW | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 7 = WNDW active-area horizontal and vertical blanking. |
| 64 | 2c-video-exp | pin 8 +12 V | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 8 = +12 V regulated, 300 mA maximum. |
| 65 | 2c-video-exp | pin 9 /PRAS | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 9 = PRAS RAM row strobe from TMG pin 19. |
| 66 | 2c-video-exp | pin 10 GR | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 10 = GR graphics enable from IOU pin 2. |
| 67 | 2c-video-exp | pin 11 /SEROUT | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 11 = SEROUT serialized character-generator output from 74LS166 pin 1, exactly as printed. |
| 68 | 2c-video-exp | pin 12 NTSC | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301); pp. 245, 258, 270 as applicable | Figure 11-25 / Table 11-17: connector pin 12 = NTSC composite video from VID hybrid. Video-output paragraph p. 270 gives approximately 1 V. |
| 69 | 2c-video-exp | pin 13 GND | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 13 = GND ground reference. |
| 70 | 2c-video-exp | pin 14 VIDD7 | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 14 = VIDD7 from 74LS374, high causes half-dot shift. |
| 71 | 2c-video-exp | pin 15 CREF | CONFIRMED | IIc TRM pp. 272-273 (PDF 300-301) | Figure 11-25 / Table 11-17: connector pin 15 = CREF from TMG pin 3, 3.58 MHz. |
| 72 | unidisk525 | step 2 Drive count | UNVERIFIABLE | IIc TRM p. 273 (PDF 301) | One external Disk IIc or similar drive and prohibition on other power use are supported. Source silent on the two-UniDisk limit per controller card or the second-card rule. A suitable additional source is DuoDisk Technical Procedures p. 1.2 (PDF 6), but this item does not cite it. |
| 73 | 2c-disk | pin 1 GND | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 1 = GND. |
| 74 | 2c-disk | pin 2 GND | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 2 = GND. |
| 75 | 2c-disk | pin 3 GND | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 3 = GND. |
| 76 | 2c-disk | pin 4 GND | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 4 = GND. |
| 77 | 2c-disk | pin 6 +5 V | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 6 = +5 V. |
| 78 | 2c-disk | pin 7 +12 V | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 7 = +12 V. |
| 79 | 2c-disk | pin 8 +12 V | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 8 = +12 V. |
| 80 | 2c-disk | pin 9 /EXTINT | CONFIRMED | IIc TRM p. 274 (PDF 302); p. 276 | Figure 11-26: DB19 pin 9 = EXTINT active-low external interrupt. Serial I/O p. 276 explicitly says port 1 reads EXTINT on the 6551 DSR input. |
| 81 | 2c-disk | pin 10 WRPROT | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 10 = WRPROT write-protect input. |
| 82 | 2c-disk | pin 11 SEEKPH0 | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 11 = SEEKPH0. |
| 83 | 2c-disk | pin 12 SEEKPH1 | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 12 = SEEKPH1. |
| 84 | 2c-disk | pin 13 SEEKPH2 | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 13 = SEEKPH2. |
| 85 | 2c-disk | pin 14 SEEKPH3 | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 14 = SEEKPH3. |
| 86 | 2c-disk | pin 15 /WRREQ | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 15 = WRREQ active-low write request. |
| 87 | 2c-disk | pin 16 NC | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 16 = NC. |
| 88 | 2c-disk | pin 17 /DR2 | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 17 = DR2 active-low external drive select. Figure labels pin 17 DR2; Table 11-18 incorrectly calls it DR1, so the figure resolves the name conflict. |
| 89 | 2c-disk | pin 18 RDDATA | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 18 = RDDATA input. |
| 90 | 2c-disk | pin 19 WRDATA | CONFIRMED | IIc TRM p. 274 (PDF 302) | Figure 11-26: DB19 pin 19 = WRDATA output. |
| 91 | 2c-serial1 | pin 1 DTR1B | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 1 = DTR Data Terminal Ready output, with port-specific 1B/2B suffixes. |
| 92 | 2c-serial1 | pin 2 TD1B | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 2 = TD Transmit Data output, with port-specific 1B/2B suffixes. |
| 93 | 2c-serial1 | pin 3 GND | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 3 = GND power/signal common, with port-specific 1B/2B suffixes. |
| 94 | 2c-serial1 | pin 4 RD1B | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 4 = RD receive/read data input, with port-specific 1B/2B suffixes. |
| 95 | 2c-serial1 | pin 5 DSR1B | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 5 = DSR Data Set Ready input, with port-specific 1B/2B suffixes. |
| 96 | 2c-serial2 | pin 1 DTR2B | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 1 = DTR Data Terminal Ready output, with port-specific 1B/2B suffixes. |
| 97 | 2c-serial2 | pin 2 TD2B | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 2 = TD Transmit Data output, with port-specific 1B/2B suffixes. |
| 98 | 2c-serial2 | pin 3 GND | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 3 = GND power/signal common, with port-specific 1B/2B suffixes. |
| 99 | 2c-serial2 | pin 4 RD2B | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 4 = RD receive/read data input, with port-specific 1B/2B suffixes. |
| 100 | 2c-serial2 | pin 5 DSR2B | CONFIRMED | IIc TRM p. 278 (PDF 306) | Figure 11-30 / Table 11-20: both 5-pin DIN ports use pin 5 = DSR Data Set Ready input, with port-specific 1B/2B suffixes. |
| 101 | 2c-mouse-game | pin 1 GAMESW1 / /MOUSEID | CONFIRMED | IIc TRM pp. 284, 287 (PDF 312, 315) | Figures 11-36, 11-39 / Tables 11-21, 11-22: DB9 pin 1 = GAMESW1 for joystick; active-low MOUSEID disables NE556 for mouse. |
| 102 | 2c-mouse-game | pin 2 +5 V | CONFIRMED | IIc TRM pp. 284, 287 (PDF 312, 315) | Figures 11-36, 11-39 / Tables 11-21, 11-22: DB9 pin 2 = +5 V, maximum 100 mA. |
| 103 | 2c-mouse-game | pin 3 GND | CONFIRMED | IIc TRM pp. 284, 287 (PDF 312, 315) | Figures 11-36, 11-39 / Tables 11-21, 11-22: DB9 pin 3 = system GND. |
| 104 | 2c-mouse-game | pin 4 XDIR | CONFIRMED | IIc TRM pp. 284, 287 (PDF 312, 315) | Figures 11-36, 11-39 / Tables 11-21, 11-22: DB9 pin 4 = XDIR for mouse; unused for hand controller. |
| 105 | 2c-mouse-game | pin 5 PDL0 / XMOVE | CONFIRMED | IIc TRM pp. 284, 287 (PDF 312, 315) | Figures 11-36, 11-39 / Tables 11-21, 11-22: DB9 pin 5 = PDL0 (150 kohm variable resistance to +5 V) / XMOVE interrupt. |
| 106 | 2c-mouse-game | pin 6 NC | CONFIRMED | IIc TRM pp. 284, 287 (PDF 312, 315) | Figures 11-36, 11-39 / Tables 11-21, 11-22: DB9 pin 6 = NC. |
| 107 | 2c-mouse-game | pin 7 GAMESW0 / /MSW | CONFIRMED | IIc TRM pp. 284, 287 (PDF 312, 315) | Figures 11-36, 11-39 / Tables 11-21, 11-22: DB9 pin 7 = GAMESW0 / active-low mouse button MSW. |
| 108 | 2c-mouse-game | pin 8 PDL1 / YDIR | CONFIRMED | IIc TRM pp. 284, 287 (PDF 312, 315) | Figures 11-36, 11-39 / Tables 11-21, 11-22: DB9 pin 8 = PDL1 / YDIR. |
| 109 | apple2e | +5 V | CONFIRMED | IIe TRM pp. 159, 161, 165, 167, 195; Sams PDF 61 | +5 V +/-3% = 4.85-5.15 V; 2.5 A maximum. PSU pin 3, MMU 25, IOU 28, 6502 pin 8 (Sams CPU schematic), expansion slot pin 25 all carry +5 V. Digital motherboard logic uses +5 V. |
| 110 | apple2e | +12 V | CONFIRMED | IIe TRM pp. 159, 161, 196 | 11.8 V +/-6% = 11.092-12.508 V, appropriately rounded 11.1-12.5 V. PSU pin 4, slot pin 50. Table 7-20 p. 196 limits total peripheral-card +12 V to 250 mA (distinct from PSU current rating). |
| 111 | apple2e | -5 V | WRONG | IIe TRM pp. 159, 161, 186, 196; Sams PDF 64 | WRONG note: -5 V is not slots-only. Table 7-15 p. 186 supplies -5 V at internal video connector pin 3, and Sams main-board video schematic PDF 64 uses -5 V at mixer Q1. Rail voltage (-5.2 V +/-10%, rounded -4.7 to -5.7 V), PSU pin 6 and slot pin 34 are correct. MEDIUM; prove-it-works; fix-root-causes. |
| 112 | apple2e | -12 V | CONFIRMED | IIe TRM pp. 159, 161, 196; Sams PDF 28 | -12 V +/-10% = -10.8 to -13.2 V; PSU pin 5 and slot pin 33. Sams keyboard troubleshooting PDF 28 explicitly measures -11.9 V at AY-5-3600 decoder UE14 pin 27. Supports keyboard negative supply and peripheral/serial-card supply. |
| 113 | apple2e | step 1 Supply chirp | WRONG | IIe TRM p. 160 (PDF 194) | WRONG ifNot: restart cycling with the board connected does not establish a short. Manual lists shorted supply, disconnected cable, OR any rail outside its normal range; stops oscillator and retries about every half-second. Correct advice must include voltage-regulation/supply faults. Source describes cycling, not an acoustic acceptance test. MEDIUM; fix-root-causes; prove-it-works. |
| 114 | 2e-psu | pin 1 GND | CONFIRMED | IIe TRM pp. 161, 159; Apple II 1979 p. 104 (PDF 115) | Table 7-3 and Apple II 1979 Table 31 / Figure 19 agree: power-connector pin 1 = common ground. |
| 115 | 2e-psu | pin 2 GND | CONFIRMED | IIe TRM pp. 161, 159; Apple II 1979 p. 104 (PDF 115) | Table 7-3 and Apple II 1979 Table 31 / Figure 19 agree: power-connector pin 2 = common ground. |
| 116 | 2e-psu | pin 3 +5 V | CONFIRMED | IIe TRM pp. 161, 159; Apple II 1979 p. 104 (PDF 115) | Table 7-3 and Apple II 1979 Table 31 / Figure 19 agree: power-connector pin 3 = +5 V. Table 7-2 p. 159 supports the stated rounded voltage interval (11.8 V +/-6%, -5.2 V +/-10%, -12 V +/-10%, +5 V +/-3%, respectively). |
| 117 | 2e-psu | pin 4 +12 V | CONFIRMED | IIe TRM pp. 161, 159; Apple II 1979 p. 104 (PDF 115) | Table 7-3 and Apple II 1979 Table 31 / Figure 19 agree: power-connector pin 4 = +12 V. Table 7-2 p. 159 supports the stated rounded voltage interval (11.8 V +/-6%, -5.2 V +/-10%, -12 V +/-10%, +5 V +/-3%, respectively). |
| 118 | 2e-psu | pin 5 -12 V | CONFIRMED | IIe TRM pp. 161, 159; Apple II 1979 p. 104 (PDF 115) | Table 7-3 and Apple II 1979 Table 31 / Figure 19 agree: power-connector pin 5 = -12 V. Table 7-2 p. 159 supports the stated rounded voltage interval (11.8 V +/-6%, -5.2 V +/-10%, -12 V +/-10%, +5 V +/-3%, respectively). |
| 119 | 2e-psu | pin 6 -5 V | CONFIRMED | IIe TRM pp. 161, 159; Apple II 1979 p. 104 (PDF 115) | Table 7-3 and Apple II 1979 Table 31 / Figure 19 agree: power-connector pin 6 = -5 V. Table 7-2 p. 159 supports the stated rounded voltage interval (11.8 V +/-6%, -5.2 V +/-10%, -12 V +/-10%, +5 V +/-3%, respectively). |
| 120 | mmu344 | pin 2 A0 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 2 = A0 address input. |
| 121 | mmu344 | pin 3 PHI0 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 3 = phase 0 clock input. CPU/system clock is approximately 1.023 MHz (TRM p. 161; nominal versus long-cycle average distinguished by Sather Table 3.1 p. 3-5). |
| 122 | mmu344 | pin 4 Q3 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 4 = Q3 timing input. Sather Table 3.1 p. 3-5 and timing diagram show Q3 approximately 2 MHz and asymmetric. |
| 123 | mmu344 | pin 5 /PRAS | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 5 = PRAS active-low timing input. |
| 124 | mmu344 | pin 6 RA0 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 6 = RA0 multiplexed address output. Sather Fig. 5.13a p. 5-30 shows row/column multiplexing and tri-state outputs; shared RA bus to IOU. |
| 125 | mmu344 | pin 7 RA1 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 7 = RA1 multiplexed address output. Sather Fig. 5.13a p. 5-30 shows row/column multiplexing and tri-state outputs; shared RA bus to IOU. |
| 126 | mmu344 | pin 8 RA2 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 8 = RA2 multiplexed address output. Sather Fig. 5.13a p. 5-30 shows row/column multiplexing and tri-state outputs; shared RA bus to IOU. |
| 127 | mmu344 | pin 9 RA3 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 9 = RA3 multiplexed address output. Sather Fig. 5.13a p. 5-30 shows row/column multiplexing and tri-state outputs; shared RA bus to IOU. |
| 128 | mmu344 | pin 10 RA4 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 10 = RA4 multiplexed address output. Sather Fig. 5.13a p. 5-30 shows row/column multiplexing and tri-state outputs; shared RA bus to IOU. |
| 129 | mmu344 | pin 11 RA5 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 11 = RA5 multiplexed address output. Sather Fig. 5.13a p. 5-30 shows row/column multiplexing and tri-state outputs; shared RA bus to IOU. |
| 130 | mmu344 | pin 12 RA6 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 12 = RA6 multiplexed address output. Sather Fig. 5.13a p. 5-30 shows row/column multiplexing and tri-state outputs; shared RA bus to IOU. |
| 131 | mmu344 | pin 13 RA7 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 13 = RA7 multiplexed address output. Sather Fig. 5.13a p. 5-30 shows row/column multiplexing and tri-state outputs; shared RA bus to IOU. |
| 132 | mmu344 | pin 14 R/W | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 14 = R/W CPU input. |
| 133 | mmu344 | pin 15 /INH | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 15 = INH active-low inhibit input. Schematic shows pull-up; Sather pp. 5-24 to 5-31 explains ROM/RAM inhibition (TRM description tied-to-5-V is incomplete). |
| 134 | mmu344 | pin 16 /DMA | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 16 = DMA active-low bus-transfer control input. |
| 135 | mmu344 | pin 17 /EN80 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 17 = EN80 active-low auxiliary-RAM enable output. |
| 136 | mmu344 | pin 18 /KBD | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 18 = KBD active-low keyboard output enable. $C000 is a valid conventional keyboard-read address; source Sather p. 5-29 additionally documents read aliases $C000-$C01F. Record does not assert exclusivity. |
| 137 | mmu344 | pin 19 /ROMEN2 | WRONG | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8; Sather pp. 5-29 to 5-31 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 19 = ROMEN2. WRONG tied-together claim: schematic sheet 1 routes these as separate nets to separate ROMs; Sather Fig. 5.13b p. 5-31 separately decodes ROMEN1 for C100-CFFF/D000-DFFF and ROMEN2 for E000-FFFF. TRM Table 7-6 itself contains the misleading tied claim. Preserve separate outputs; do not bridge them. MEDIUM; prove-it-works; fix-root-causes. |
| 138 | mmu344 | pin 20 /ROMEN1 | WRONG | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8; Sather pp. 5-29 to 5-31 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 20 = ROMEN1. WRONG tied-together claim: schematic sheet 1 routes these as separate nets to separate ROMs; Sather Fig. 5.13b p. 5-31 separately decodes ROMEN1 for C100-CFFF/D000-DFFF and ROMEN2 for E000-FFFF. TRM Table 7-6 itself contains the misleading tied claim. Preserve separate outputs; do not bridge them. MEDIUM; prove-it-works; fix-root-causes. |
| 139 | mmu344 | pin 21 MD7 | WRONG | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8; Sather p. 5-30 (PDF 136) | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 21 = MD7 status output. WRONG dir=bidir: Sather Fig. 5.13a p. 5-30 shows pin 21 driven by a tri-state status OUTPUT buffer; soft switches are controlled by address inputs. Shared connection to a bidirectional CPU data bus does not make this chip pin bidirectional. Correct dir=out. MEDIUM; prove-it-works; fix-root-causes. |
| 140 | mmu344 | pin 22 R/W245 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 22 = R/W245 74LS245 direction-control output. |
| 141 | mmu344 | pin 23 /RAMEN | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 23 = RAMEN main-RAM enable output. |
| 142 | mmu344 | pin 26 A15 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 26 = A15 input. |
| 143 | mmu344 | pin 27 A14 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 27 = A14 input. |
| 144 | mmu344 | pin 29 A12 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 29 = A12 input. |
| 145 | mmu344 | pin 30 A11 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 30 = A11 input. |
| 146 | mmu344 | pin 31 A10 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 31 = A10 input. |
| 147 | mmu344 | pin 32 A9 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 32 = A9 input. |
| 148 | mmu344 | pin 33 A8 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 33 = A8 input. |
| 149 | mmu344 | pin 34 A7 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 34 = A7 input. |
| 150 | mmu344 | pin 35 A6 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 35 = A6 input. |
| 151 | mmu344 | pin 37 A4 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 37 = A4 input. |
| 152 | mmu344 | pin 38 A3 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 38 = A3 input. |
| 153 | mmu344 | pin 39 A2 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 39 = A2 input. |
| 154 | mmu344 | pin 40 A1 | CONFIRMED | IIe TRM p. 165 (PDF 199); schematic PDF 2; Sams PDF 8 | Figure 7-2 / Table 7-6 and sheet 1: MMU pin 40 = A1 input. |
| 155 | iou344 | pin 2 GR | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 2 = GR graphics output. |
| 156 | iou344 | pin 3 SEGA | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 3 = SEGA text row select with SEGB and VC. |
| 157 | iou344 | pin 4 SEGB | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 4 = SEGB text row select; low=hi-res and high=lo-res in graphics. |
| 158 | iou344 | pin 5 VC | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 5 = VC vertical/text row select and lo-res upper/lower-block select. |
| 159 | iou344 | pin 6 /80VID | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 6 = 80VID active-low 80-column enable output. |
| 160 | iou344 | pin 8 SPKR | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 8 = SPKR speaker output. Sather Table 7.1 p. 7-5 shows speaker toggles on accesses in $C03X, including conventional $C030. |
| 161 | iou344 | pin 9 MD7 | WRONG | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4; Sather p. 7-4 (PDF 172) | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 9 = MD7 flag output. WRONG dir=bidir: Sather Fig. 7.1 p. 7-4 shows pin 9 driven by a tri-state OUTPUT buffer carrying soft-switch flags. Correct dir=out; sharing CPU data bit 7 does not establish an input function. MEDIUM; prove-it-works; fix-root-causes. |
| 162 | iou344 | pin 10 AN0 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 10 = AN0 output. |
| 163 | iou344 | pin 11 AN1 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 11 = AN1 output. |
| 164 | iou344 | pin 12 AN2 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 12 = AN2 output. |
| 165 | iou344 | pin 13 AN3 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 13 = AN3 output. |
| 166 | iou344 | pin 16 NC | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 16 = NC. |
| 167 | iou344 | pin 17 RA0 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 17 = RA0 shared address bus. IOU drives video/refresh in phase 1 (TRM p. 166); Sather pp. 2-12 to 2-13 and Fig. 7.1 p. 7-4 show it also receives CPU addressing on shared RA lines, supporting bidir. |
| 168 | iou344 | pin 19 RA2 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 19 = RA2 shared address bus. IOU drives video/refresh in phase 1 (TRM p. 166); Sather pp. 2-12 to 2-13 and Fig. 7.1 p. 7-4 show it also receives CPU addressing on shared RA lines, supporting bidir. |
| 169 | iou344 | pin 20 RA3 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 20 = RA3 shared address bus. IOU drives video/refresh in phase 1 (TRM p. 166); Sather pp. 2-12 to 2-13 and Fig. 7.1 p. 7-4 show it also receives CPU addressing on shared RA lines, supporting bidir. |
| 170 | iou344 | pin 21 RA4 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 21 = RA4 shared address bus. IOU drives video/refresh in phase 1 (TRM p. 166); Sather pp. 2-12 to 2-13 and Fig. 7.1 p. 7-4 show it also receives CPU addressing on shared RA lines, supporting bidir. |
| 171 | iou344 | pin 22 RA5 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 22 = RA5 shared address bus. IOU drives video/refresh in phase 1 (TRM p. 166); Sather pp. 2-12 to 2-13 and Fig. 7.1 p. 7-4 show it also receives CPU addressing on shared RA lines, supporting bidir. |
| 172 | iou344 | pin 23 RA6 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 23 = RA6 shared address bus. IOU drives video/refresh in phase 1 (TRM p. 166); Sather pp. 2-12 to 2-13 and Fig. 7.1 p. 7-4 show it also receives CPU addressing on shared RA lines, supporting bidir. |
| 173 | iou344 | pin 24 RA7 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 24 = RA7 shared address bus. IOU drives video/refresh in phase 1 (TRM p. 166); Sather pp. 2-12 to 2-13 and Fig. 7.1 p. 7-4 show it also receives CPU addressing on shared RA lines, supporting bidir. |
| 174 | iou344 | pin 26 PHI0 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 26 = phase 0 clock input. Sather Table 3.1 p. 3-5: nominal phase 0 approximately 1.023 MHz, Q3 approximately 2 MHz; long cycles alter average, and Q3 duty cycle is asymmetric. |
| 175 | iou344 | pin 27 Q3 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 27 = Q3 timing input. Sather Table 3.1 p. 3-5: nominal phase 0 approximately 1.023 MHz, Q3 approximately 2 MHz; long cycles alter average, and Q3 duty cycle is asymmetric. |
| 176 | iou344 | pin 29 A6 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 29 = A6 address input. |
| 177 | iou344 | pin 30 /C0XX | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 30 = C0XX I/O-enable input. Sather p. 7-2 identifies C0XX as decode-enable for the $C000-$C0FF range. |
| 178 | iou344 | pin 31 AKD | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 31 = AKD any-key-down input. |
| 179 | iou344 | pin 32 KSTRB | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 32 = KSTRB keyboard-strobe input. |
| 180 | iou344 | pin 33 VID7 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 33 = VID7 video data input. |
| 181 | iou344 | pin 34 VID6 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 34 = VID6 video data input. |
| 182 | iou344 | pin 35 /RA9 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 35 = RA9 active-low video-control output. |
| 183 | iou344 | pin 36 /RA10 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 36 = RA10 active-low video-control output. |
| 184 | iou344 | pin 37 /CLRGAT | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 37 = CLRGAT active-low colour-burst gate output. |
| 185 | iou344 | pin 38 /WNDW | WRONG | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4; Sather p. 8-11 (PDF 217) | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 38 = WNDW blanking output. WRONG polarity: Sather p. 8-11 explicitly says WNDW goes HIGH when horizontal or vertical blanking is true, and disables video ROM. Correct expectation: HIGH outside the active display, LOW during active video. Schematic ties this to character-ROM enable. MEDIUM; prove-it-works; fix-root-causes. |
| 186 | iou344 | pin 39 /SYNC | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 39 = SYNC composite sync output. Sather Table 3.1 p. 3-5 gives 912 master periods per line and 262 lines per frame, approximately 15.7 kHz / 60 Hz for NTSC; matches cited NTSC schematic. |
| 187 | iou344 | pin 40 H0 | CONFIRMED | IIe TRM pp. 166-167 (PDF 200-201); schematic PDF 4 | Figure 7-3 / Table 7-7 and sheet 3: IOU pin 40 = H0 low horizontal-counter bit output. |
| 188 | 2e-video | pin 1 Video | CONFIRMED | IIe TRM p. 186 (PDF 220) | Video-output paragraph explicitly connects RCA tip to composite video; attenuates to about 1 V with 75-ohm matching. |
| 189 | 2e-video | pin 2 GND | CONFIRMED | IIe TRM p. 186 (PDF 220) | Video-output paragraph explicitly connects RCA sleeve to ground (0 V). |
| 190 | 2e-video-int | pin 1 GROUND | CONFIRMED | IIe TRM p. 186 (PDF 220) | Table 7-15: internal video pin 1 = GROUND system common. Pin 1 is nearest keyboard and pin 4 nearest back. |
| 191 | 2e-video-int | pin 2 VIDEO | CONFIRMED | IIe TRM p. 186 (PDF 220) | Table 7-15: internal video pin 2 = VIDEO: white ~2.0 V, black ~0.75 V, sync 0.0 V; NOT short-circuit protected. Pin 1 is nearest keyboard and pin 4 nearest back. |
| 192 | 2e-video-int | pin 3 -5 V | CONFIRMED | IIe TRM p. 186 (PDF 220) | Table 7-15: internal video pin 3 = -5 V power supply. Pin 1 is nearest keyboard and pin 4 nearest back. |
| 193 | 2e-video-int | pin 4 +12 V | CONFIRMED | IIe TRM p. 186 (PDF 220) | Table 7-15: internal video pin 4 = +12 V power supply. Pin 1 is nearest keyboard and pin 4 nearest back. |
| 194 | 2e-cass | pin T Cassette in | UNVERIFIABLE | IIe TRM p. 189 (PDF 223) | Input signal is specified as 1 volt nominal from recorder earphone/monitor output, 12 kohm input impedance. Source silent on peak-to-peak interpretation and physical tip assignment; it does not prove 1 V p-p. |
| 195 | 2e-cass | pin S GND | UNVERIFIABLE | IIe TRM p. 189 (PDF 223) | Source silent on cassette-jack sleeve wiring: describes two miniature phone jacks and signal specifications, but does not identify S as board ground or explicitly give 0 V on S. Standard connector convention alone is not documentary pinout proof. |
| 196 | 2e-cass-out | pin T Cassette out | UNVERIFIABLE | IIe TRM p. 189 (PDF 223) | Output to recorder microphone is specified as 25 mV, 100-ohm output impedance. Source silent on physical tip assignment; contains no cassette tip/sleeve pinout. |
| 197 | 2e-cass-out | pin S GND | UNVERIFIABLE | IIe TRM p. 189 (PDF 223) | Source silent on cassette-output sleeve wiring: no tip/sleeve pinout or explicit 0 V assignment. |
| 198 | 2e-speaker | pin 1 SPKR | CONFIRMED | IIe TRM p. 189 (PDF 223) | Table 7-18: pin 1 SPKR supplies about 0.5 W into 8 ohms. Speaker section describes IOU bit driving AC-coupled amplifier; speaker toggles with sound. |
| 199 | 2e-speaker | pin 2 +5 V | CONFIRMED | IIe TRM p. 189 (PDF 223) | Table 7-18: pin 2 = +5 V. Source explicitly notes the speaker is NOT connected to system ground. |
| 200 | 2e-game16 | pin 1 +5 V | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 1 = +5 V, 100 mA maximum. |
| 201 | 2e-game16 | pin 2 PB0 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 2 = PB0/Open-Apple. Game-I/O prose p. 190 explicitly prescribes 560-ohm pulldowns and identifies low-power Schottky TTL inputs; keyboard switch mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 202 | 2e-game16 | pin 3 PB1 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 3 = PB1/Solid-Apple. Keyboard switch mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 203 | 2e-game16 | pin 5 /STROBE | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 5 = STROBE active-low in phase 0 for read/write $C040. |
| 204 | 2e-game16 | pin 6 PDL0 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 6 = PDL0, 150 kohm variable resistor to +5 V. |
| 205 | 2e-game16 | pin 7 PDL2 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 7 = PDL2. |
| 206 | 2e-game16 | pin 8 GND | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 8 = system GND. |
| 207 | 2e-game16 | pin 9 NC | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 9 = NC. |
| 208 | 2e-game16 | pin 10 PDL1 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 10 = PDL1. |
| 209 | 2e-game16 | pin 11 PDL3 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 11 = PDL3. |
| 210 | 2e-game16 | pin 12 AN3 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 12 = AN3 TTL output, buffer for non-TTL loads. |
| 211 | 2e-game16 | pin 13 AN2 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 13 = AN2. |
| 212 | 2e-game16 | pin 14 AN1 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 14 = AN1. |
| 213 | 2e-game16 | pin 15 AN0 | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 15 = AN0. |
| 214 | 2e-game16 | pin 16 NC | CONFIRMED | IIe TRM pp. 190-191 (PDF 224-225) | Table 7-19: internal 16-pin game connector pin 16 = NC. |
| 215 | 2e-game9 | pin 1 PB1 | CONFIRMED | IIe TRM p. 191 (PDF 225); keyboard/game mapping p. 13 | Table 7-19 back-panel column: female DB9 pin 1 = PB1/Solid-Apple. Switch-to-Apple-key mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 216 | 2e-game9 | pin 2 +5 V | CONFIRMED | IIe TRM p. 191 (PDF 225); keyboard/game mapping p. 13 | Table 7-19 back-panel column: female DB9 pin 2 = +5 V, 100 mA maximum. Switch-to-Apple-key mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 217 | 2e-game9 | pin 3 GND | CONFIRMED | IIe TRM p. 191 (PDF 225); keyboard/game mapping p. 13 | Table 7-19 back-panel column: female DB9 pin 3 = GND. Switch-to-Apple-key mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 218 | 2e-game9 | pin 4 PDL2 | CONFIRMED | IIe TRM p. 191 (PDF 225); keyboard/game mapping p. 13 | Table 7-19 back-panel column: female DB9 pin 4 = PDL2. Switch-to-Apple-key mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 219 | 2e-game9 | pin 5 PDL0 | CONFIRMED | IIe TRM p. 191 (PDF 225); keyboard/game mapping p. 13 | Table 7-19 back-panel column: female DB9 pin 5 = PDL0, 150 kohm variable resistor to +5 V. Switch-to-Apple-key mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 220 | 2e-game9 | pin 6 PB2 | CONFIRMED | IIe TRM p. 191 (PDF 225); keyboard/game mapping p. 13 | Table 7-19 back-panel column: female DB9 pin 6 = PB2. Switch-to-Apple-key mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 221 | 2e-game9 | pin 7 PB0 | CONFIRMED | IIe TRM p. 191 (PDF 225); keyboard/game mapping p. 13 | Table 7-19 back-panel column: female DB9 pin 7 = PB0/Open-Apple. Switch-to-Apple-key mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 222 | 2e-game9 | pin 8 PDL1 | CONFIRMED | IIe TRM p. 191 (PDF 225); keyboard/game mapping p. 13 | Table 7-19 back-panel column: female DB9 pin 8 = PDL1. Switch-to-Apple-key mapping explicitly given by IIe TRM p. 13 (PDF 47). |
| 223 | 2e-game9 | pin 9 PDL3 | CONFIRMED | IIe TRM p. 191 (PDF 225); keyboard/game mapping p. 13 | Table 7-19 back-panel column: female DB9 pin 9 = PDL3. Switch-to-Apple-key mapping explicitly given by IIe TRM p. 13 (PDF 47). |

## Coverage

| kind | items | confirmed | wrong | unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 113 | 106 | 7 | 0 |
| clock-row | 2 | 0 | 0 | 2 |
| connector-pin | 98 | 94 | 0 | 4 |
| first-ten | 4 | 0 | 1 | 3 |
| rail | 7 | 6 | 1 | 0 |
| TOTAL | 224 | 206 | 9 | 9 |

## Source-link audit

No dead or blocked documents. Locator/support limitations:

- Items 45-46 cite IWM pp. 247-248, which give 7 MHz / 2.0 MHz, not the claimed precision. IIc timing tables pp. 240 and 245 give 2.045 / 7.159 MHz; add a source for more precise figures.
- Items 49-51: IWM pp. 247-248 do not supply converter voltage tolerances or current budgets. Same manual Table 11-4 p. 234 and Fig. 11-26 p. 274 do. Update the locator to those pages.
- Item 72: cited IIc p. 273 does not document the controller-card drive count. DuoDisk Technical Procedures p. 1.2 (PDF 6) supports a maximum of two 5.25-inch drives per controller; cite it in this item if retained.
- Items 137-138: the linked IIe Table 7-6 is accessible but contains a conflicting tied-ROM-enable statement. Cited schematic sheet 1 and Sather Fig. 5.13b show independent enables; do not treat that table wording as electrical connectivity proof.
- Items 194-197: linked cassette section is accessible but silent on a physical tip/sleeve pinout, and on whether the nominal input voltage is peak-to-peak.

## Source inventory

- Apple II Reference Manual (1979), Figure 19 connector layout, p. 104 <https://archive.org/details/Apple_II_Reference_Manual_1979_Apple/page/n114>
- Apple IIc Technical Reference Manual, Disk I/O warning (port power for a drive only), p. 273 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n300>
- Apple IIc Technical Reference Manual, GLU pinouts, p. 246 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n273>
- Apple IIc Technical Reference Manual, IWM pinouts, pp. 247-248 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n274>
- Apple IIc Technical Reference Manual, disk drive connector, p. 274 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n301>
- Apple IIc Technical Reference Manual, hand controller connector, p. 287 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n314>
- Apple IIc Technical Reference Manual, mouse connector, p. 284 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n311>
- Apple IIc Technical Reference Manual, output jack, p. 256 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n283>
- Apple IIc Technical Reference Manual, serial port connectors, p. 278 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n305>
- Apple IIc Technical Reference Manual, video expansion connector, pp. 272-273 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n299>
- Apple IIc Technical Reference Manual, video output signals, p. 270 <https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n297>
- Apple IIe Technical Reference Manual, Cassette I/O, p. 189 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n222>
- Apple IIe Technical Reference Manual, Figure 7-2 / Table 7-6, p. 165 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n198>
- Apple IIe Technical Reference Manual, Figure 7-3 / Table 7-7, p. 167 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n200>
- Apple IIe Technical Reference Manual, MMU and IOU pinouts, pp. 165-167 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n198>
- Apple IIe Technical Reference Manual, Table 7-15 internal video connector, p. 186 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n219>
- Apple IIe Technical Reference Manual, Table 7-18 speaker connector, p. 189 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n222>
- Apple IIe Technical Reference Manual, Table 7-19 back-panel pins, p. 191 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n224>
- Apple IIe Technical Reference Manual, Table 7-19 game I/O, p. 191 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n224>
- Apple IIe Technical Reference Manual, Table 7-2 power supply specifications, p. 159 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n192>
- Apple IIe Technical Reference Manual, Table 7-3 power connector, p. 161 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n194>
- Apple IIe Technical Reference Manual, The Power Supply (protection and restart), p. 160 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n193>
- Apple IIe Technical Reference Manual, Video Output Signals, p. 186 <https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n219>
- Apple Tech Info Library TA37054, DuoDisk: Cable Specifications and Pinouts (cable 590-0114) (A2DP) <https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20DuoDisk%205.25/Documentation/Apple%20DuoDisk%20-%20Cable%20Specifications.pdf>
- Apple schematic 050-0051-D, Apple IIe (NTSC), sheet 1: MMU UE4 (box reads 344-0100), 6502 UC4 (PDF p. 2) <https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Computers/Apple%20II/Apple%20IIe/Schematics/Apple%20IIe%20-%20Schematics%20050-0051-D.pdf#page=2>
- Apple schematic 050-0051-D, Apple IIe (NTSC), sheet 3 timing/video: IOU UE5, 344-0020 (PDF p. 4) <https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Computers/Apple%20II/Apple%20IIe/Schematics/Apple%20IIe%20-%20Schematics%20050-0051-D.pdf#page=4>
- DuoDisk Technical Procedures, same mechanism in DuoDisk, UniDisk and Apple 5.25 Drive, p. 2.2 <https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/AppleService%20Technical%20Procedures%20-%20Apple%20DuoDisk.pdf#page=8>
- Sams CC10 Apple IIe, main board schematic, CPU section waveforms (scan p. 61) <https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n60>
- Sams CC10 Apple IIe, main board schematic, timing section waveforms (scan p. 62) <https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n61>
- Sams CC10 Apple IIe, main board schematic, video output waveforms (scan p. 64) <https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n63>
- Sams CC10 Apple IIe, parts list: UE4 Memory Management Unit 344-0010-B, UE5 Input/Output Unit 344-0020-A (scan p. 8) <https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n7>
- Sams CC10 Apple IIe, service checks 1, Computer dead (scan p. 9) <https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n8>
- Understanding the Apple IIe (Sather) <https://archive.org/details/Understanding_the_Apple_IIe>
- Understanding the Apple IIe (Sather), Table 3.1 timing signal durations and frequencies, p. 3-5 <https://archive.org/details/Understanding_the_Apple_IIe/page/n46>
- Understanding the Apple IIe (Sather), p. 4-2: the IOU pulls RESET low at power-on <https://archive.org/details/Understanding_the_Apple_IIe/page/n75>
- Understanding the Apple IIe (Sather), p. 7-2: CXXX is the overall $C000-$CFFF I/O enable signal <https://archive.org/details/Understanding_the_Apple_IIe/page/n169>
