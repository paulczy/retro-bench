# batch-26 fact-check ledger

All 223 items received a decision. CONFIRMED requires support for the checked claim; unsupported substantive subclaims make the item UNVERIFIABLE. WRONG takes precedence for contradictions. PDF pages are one-based; printed section/page is supplied first. No application data was modified.

Sources downloaded once per document under batch-26/; sources.json lists original URLs. curl -L -A Mozilla/5.0 was attempted but failed locally with Schannel SEC_E_NO_CREDENTIALS. Python urllib with the same User-Agent successfully retrieved every URL (HTTP 200). This is a local curl TLS problem, not dead sources. pdftotext -layout was used; scanned tables/diagrams were rendered with pdftoppm -r 110 and inspected visually. The MSX PDF and OCR were retrieved from its archive item to read the same document locally.

Principles: contradictions and unsupported claims map to prove-it-works. Swapped names, minimum-load assumptions and diagnostic threshold mismatch also map to fix-root-causes. No shared-state mutation claim occurs: serialize-shared-state-mutations is not applicable.

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | xt5160 | Crystal; 8284A pin 16 and pin 17; 14.31818 MHz | CONFIRMED | IBM 1-4, 1-31 / PDF 23,50 | Crystal 14.31818 MHz; U1 8284 X1=16, X2=17. Manual covers both XT and Portable. |
| 1 | xt5160 | OSC; 8284A pin 12; xt-slot pin B30; 14.31818 MHz | CONFIRMED | IBM 1-17, 1-21, 1-31 / PDF 36,40,50 | OSC=14.31818 MHz; U1 OSC=12; slot B30=OSC. Manual covers both XT and Portable. |
| 2 | xt5160 | CLK (CPU and bus); 8284A pin 8; 8088 pin 19; 8288 pin 2; xt-slot pin B20; 4.7727 MHz | CONFIRMED | IBM 1-17, 1-19, 1-31 / PDF 36,38,50 | 14.31818/3=4.7727267 MHz, rounded 4.7727. U1 CLK=8; CPU CLK=19; 8288 CLK=2; slot B20=CLK. Manual covers both XT and Portable. |
| 3 | xt5160 | CLK to the coprocessor; 8087 pin 19; 4.7727 MHz | CONFIRMED | IBM 1-31, 2-4 / PDF 50,63 | 8087 CLK=19; same clock generator as CPU, 14.31818/3 MHz. Manual covers both XT and Portable. |
| 4 | xt5160 | DMA clock; 8237A pin 12; 4.7727 MHz | CONFIRMED | IBM 1-31, 1-32, 1-34 / PDF 50,51,53 | 8237 CLK=12. DMA clock derived through gating/inversion from CPU clock, same 4.7727 MHz rate. Manual covers both XT and Portable. |
| 5 | xt5160 | Timer clock; 8253 pins 9, 15, 18; 1.19318 MHz | CONFIRMED | IBM 1-23, 1-38 / PDF 42,57 | 8253 CLK0=9, CLK1=15, CLK2=18; shared divided clock. 14.31818/12=1.1931817 MHz, rounded 1.19318. Manual covers both XT and Portable. |
| 6 | xt5160 | Timer 0 (IRQ0); 8253 pin 10; 8259A pin 18; 18.2 Hz | CONFIRMED | IBM 1-31, 1-38, 5-101 / PDF 50,57,190 | 8253 OUT0=10 feeds 8259 IR0=18. BIOS gives 1193180/65536, about 18.2 interrupts/s after initialization. Manual covers both XT and Portable. |
| 7 | xt5160 | Refresh timer (counter 1); 8253 pin 13; 66.3 kHz | CONFIRMED | IBM 1-13, 1-38, 5-30 / PDF 32,57,121 | 8253 OUT1=13; BIOS divisor 18. 1.19318 MHz/18=66.2878 kHz, rounded 66.3 kHz. Refresh every 72 CPU clocks. Manual covers both XT and Portable. |
| 8 | xt5160 | CGA colour reference; CGA card, from OSC; 3.579545 MHz | CONFIRMED | IBM 1-4 / PDF 23 | 14.31818 MHz divided by 4 provides television color burst; quotient 3.579545 MHz. Manual covers both XT and Portable. |
| 9 | portable5155 | Crystal; 8284A pin 16 and pin 17; 14.31818 MHz | CONFIRMED | IBM 1-4, 1-31 / PDF 23,50 | Crystal 14.31818 MHz; U1 8284 X1=16, X2=17. Manual covers both XT and Portable. |
| 10 | portable5155 | OSC; 8284A pin 12; p-slot pin B30; 14.31818 MHz | CONFIRMED | IBM 1-17, 1-21, 1-31 / PDF 36,40,50 | OSC=14.31818 MHz; U1 OSC=12; slot B30=OSC. Manual covers both XT and Portable. |
| 11 | portable5155 | CLK (CPU and bus); 8284A pin 8; 8088 pin 19; 8288 pin 2; p-slot pin B20; 4.7727 MHz | CONFIRMED | IBM 1-17, 1-19, 1-31 / PDF 36,38,50 | 14.31818/3=4.7727267 MHz, rounded 4.7727. U1 CLK=8; CPU CLK=19; 8288 CLK=2; slot B20=CLK. Manual covers both XT and Portable. |
| 12 | portable5155 | CLK to the coprocessor; 8087 pin 19; 4.7727 MHz | CONFIRMED | IBM 1-31, 2-4 / PDF 50,63 | 8087 CLK=19; same clock generator as CPU, 14.31818/3 MHz. Manual covers both XT and Portable. |
| 13 | portable5155 | DMA clock; 8237A pin 12; 4.7727 MHz | CONFIRMED | IBM 1-31, 1-32, 1-34 / PDF 50,51,53 | 8237 CLK=12. DMA clock derived through gating/inversion from CPU clock, same 4.7727 MHz rate. Manual covers both XT and Portable. |
| 14 | portable5155 | Timer clock; 8253 pins 9, 15, 18; 1.19318 MHz | CONFIRMED | IBM 1-23, 1-38 / PDF 42,57 | 8253 CLK0=9, CLK1=15, CLK2=18; shared divided clock. 14.31818/12=1.1931817 MHz, rounded 1.19318. Manual covers both XT and Portable. |
| 15 | portable5155 | Timer 0 (IRQ0); 8253 pin 10; 8259A pin 18; 18.2 Hz | CONFIRMED | IBM 1-31, 1-38, 5-101 / PDF 50,57,190 | 8253 OUT0=10 feeds 8259 IR0=18. BIOS gives 1193180/65536, about 18.2 interrupts/s after initialization. Manual covers both XT and Portable. |
| 16 | portable5155 | Refresh timer (counter 1); 8253 pin 13; 66.3 kHz | CONFIRMED | IBM 1-13, 1-38, 5-30 / PDF 32,57,121 | 8253 OUT1=13; BIOS divisor 18. 1.19318 MHz/18=66.2878 kHz, rounded 66.3 kHz. Refresh every 72 CPU clocks. Manual covers both XT and Portable. |
| 17 | portable5155 | CGA colour reference; CGA card, from OSC; 3.579545 MHz | CONFIRMED | IBM 1-4 / PDF 23 | 14.31818 MHz divided by 4 provides television color burst; quotient 3.579545 MHz. Manual covers both XT and Portable. |
| 18 | xt5160/xt-slot | A1 | WRONG | IBM 1-17 / PDF 36 | HIGH. Diagram A1=-I/O CH CK, stored name=D7. A1 is channel check/control; A2 is D7/data. Names exchanged while types/descriptions remain at original pins. Principles: prove-it-works, fix-root-causes. |
| 19 | xt5160/xt-slot | A2 | WRONG | IBM 1-17 / PDF 36 | HIGH. Diagram A2=D7, stored name=-I/O CH CK. A1 is channel check/control; A2 is D7/data. Names exchanged while types/descriptions remain at original pins. Principles: prove-it-works, fix-root-causes. |
| 20 | xt5160/xt-slot | A3 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A3=D6. 1-18/1-19 confirms corresponding address/data bit. |
| 21 | xt5160/xt-slot | A4 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A4=D5. 1-18/1-19 confirms corresponding address/data bit. |
| 22 | xt5160/xt-slot | A5 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A5=D4. 1-18/1-19 confirms corresponding address/data bit. |
| 23 | xt5160/xt-slot | A6 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A6=D3. 1-18/1-19 confirms corresponding address/data bit. |
| 24 | xt5160/xt-slot | A7 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A7=D2. 1-18/1-19 confirms corresponding address/data bit. |
| 25 | xt5160/xt-slot | A8 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A8=D1. 1-18/1-19 confirms corresponding address/data bit. |
| 26 | xt5160/xt-slot | A9 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A9=D0. 1-18/1-19 confirms corresponding address/data bit. |
| 27 | xt5160/xt-slot | A10 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A10=I/O CH RDY. 1-20 normally HIGH; pull LOW for wait states, at most 10 clocks; 1-32 shows pull-up. |
| 28 | xt5160/xt-slot | A12 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A12=A19. 1-18/1-19 confirms corresponding address/data bit. |
| 29 | xt5160/xt-slot | A13 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A13=A18. 1-18/1-19 confirms corresponding address/data bit. |
| 30 | xt5160/xt-slot | A14 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A14=A17. 1-18/1-19 confirms corresponding address/data bit. |
| 31 | xt5160/xt-slot | A15 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A15=A16. 1-18/1-19 confirms corresponding address/data bit. |
| 32 | xt5160/xt-slot | A16 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A16=A15. 1-18/1-19 confirms corresponding address/data bit. |
| 33 | xt5160/xt-slot | A17 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A17=A14. 1-18/1-19 confirms corresponding address/data bit. |
| 34 | xt5160/xt-slot | A18 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A18=A13. 1-18/1-19 confirms corresponding address/data bit. |
| 35 | xt5160/xt-slot | A19 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A19=A12. 1-18/1-19 confirms corresponding address/data bit. |
| 36 | xt5160/xt-slot | A21 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A21=A10. 1-18/1-19 confirms corresponding address/data bit. |
| 37 | xt5160/xt-slot | A22 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A22=A9. 1-18/1-19 confirms corresponding address/data bit. |
| 38 | xt5160/xt-slot | A23 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A23=A8. 1-18/1-19 confirms corresponding address/data bit. |
| 39 | xt5160/xt-slot | A24 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A24=A7. 1-18/1-19 confirms corresponding address/data bit. |
| 40 | xt5160/xt-slot | A25 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A25=A6. 1-18/1-19 confirms corresponding address/data bit. |
| 41 | xt5160/xt-slot | A26 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A26=A5. 1-18/1-19 confirms corresponding address/data bit. |
| 42 | xt5160/xt-slot | A27 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A27=A4. 1-18/1-19 confirms corresponding address/data bit. |
| 43 | xt5160/xt-slot | A28 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A28=A3. 1-18/1-19 confirms corresponding address/data bit. |
| 44 | xt5160/xt-slot | A29 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A29=A2. 1-18/1-19 confirms corresponding address/data bit. |
| 45 | xt5160/xt-slot | A30 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A30=A1. 1-18/1-19 confirms corresponding address/data bit. |
| 46 | xt5160/xt-slot | A31 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A31=A0. 1-18/1-19 confirms corresponding address/data bit. |
| 47 | xt5160/xt-slot | B1 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B1=GND. Ground reference=0 V. |
| 48 | xt5160/xt-slot | B2 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B2=RESET DRV. 1-21 active HIGH at power-up or low line; 1-31/1-32 shows reset generation. |
| 49 | xt5160/xt-slot | B3 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40; 3-4 / PDF 69 | Diagram B3=+5 V. 3-4 output tolerance table gives 4.80-5.25 V; nominal voltage agrees. |
| 50 | xt5160/xt-slot | B4 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B4=IRQ2. 1-11 reserved; 1-20 LOW-to-HIGH interrupt request. |
| 51 | xt5160/xt-slot | B5 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40; 3-4 / PDF 69 | Diagram B5=-5 V. 3-4 output tolerance table gives -4.60 to -5.50 V; nominal voltage agrees. |
| 52 | xt5160/xt-slot | B6 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B6=DRQ2. 1-34 channel 2; diskette DMA channel documented in BIOS. |
| 53 | xt5160/xt-slot | B7 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40; 3-4 / PDF 69 | Diagram B7=-12 V. 3-4 output tolerance table gives -10.92 to -13.20 V; nominal voltage agrees. |
| 54 | xt5160/xt-slot | B8 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B8=-CARD SLCTD. 1-18/1-19 active LOW, driven by slot J8 card, open collector. |
| 55 | xt5160/xt-slot | B9 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40; 3-4 / PDF 69 | Diagram B9=+12 V. 3-4 output tolerance table gives 11.52-12.60 V; nominal voltage agrees. |
| 56 | xt5160/xt-slot | B11 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B11=-MEMW. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 57 | xt5160/xt-slot | B12 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B12=-MEMR. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 58 | xt5160/xt-slot | B13 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B13=-IOW. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 59 | xt5160/xt-slot | B14 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B14=-IOR. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 60 | xt5160/xt-slot | B16 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B16=DRQ3. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 61 | xt5160/xt-slot | B17 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B17=-DACK1. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 62 | xt5160/xt-slot | B18 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B18=DRQ1. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 63 | xt5160/xt-slot | B19 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B19=-DACK0. 1-19 refresh acknowledge active LOW; 1-13 refresh approximately every 15 us. |
| 64 | xt5160/xt-slot | B21 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B21=IRQ7. 1-11 printer; 1-20 raise and hold until acknowledged. |
| 65 | xt5160/xt-slot | B22 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B22=IRQ6. 1-11 diskette. |
| 66 | xt5160/xt-slot | B23 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B23=IRQ5. 1-11 fixed disk. |
| 67 | xt5160/xt-slot | B24 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B24=IRQ4. 1-11 primary asynchronous communications. |
| 68 | xt5160/xt-slot | B25 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B25=IRQ3. 1-11 secondary asynchronous communications. |
| 69 | xt5160/xt-slot | B26 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B26=-DACK2. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 70 | xt5160/xt-slot | B27 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B27=T/C. 1-21 active HIGH pulse at DMA terminal count. |
| 71 | xt5160/xt-slot | B28 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B28=ALE. 1-18 from 8288; falling edge latches address. |
| 72 | xt5160/xt-slot | B29 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40; 3-4 / PDF 69 | Diagram B29=+5 V. 3-4 output tolerance table gives 4.80-5.25 V; nominal voltage agrees. |
| 73 | xt5160/xt-slot | B30 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B30=OSC. 1-21 14.31818 MHz, 50% duty; 14.318 MHz is rounding. |
| 74 | xt5160/xt-slot | B31 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B31=GND. Ground reference=0 V. |
| 75 | portable5155/p-kbd | 1 | CONFIRMED | IBM 4-14 / PDF 89; 1-39 / PDF 58; 3-4 / PDF 69 | Modular 1=chassis ground. |
| 76 | portable5155/p-kbd | 2 | CONFIRMED | IBM 4-14 / PDF 89; 1-39 / PDF 58; 3-4 / PDF 69 | Modular 2=+5 V, DIN 5; 3-4 supply table gives 4.80-5.25 V. |
| 77 | portable5155/p-kbd | 3 | CONFIRMED | IBM 4-14 / PDF 89; 1-39 / PDF 58; 3-4 / PDF 69 | Modular 3=ground, DIN 4; 0 V reference. |
| 78 | portable5155/p-kbd | 4 | CONFIRMED | IBM 4-14 / PDF 89; 1-39 / PDF 58; 3-4 / PDF 69 | Modular 4=CLOCK, DIN 1; 1-39 pull-up supports HIGH at rest. |
| 79 | portable5155/p-kbd | 6 | CONFIRMED | IBM 4-14 / PDF 89; 1-39 / PDF 58; 3-4 / PDF 69 | Modular 6=chassis ground. |
| 80 | portable5155/p-psu | P8-1 | UNVERIFIABLE | IBM 3-10, 3-6 / PDF 71,73; 3-9/3-5 / PDF 70,72 | Connector P8-1=POWER GOOD; pin/nominal voltage confirmed. Source is silent on exact POWER GOOD output limits 0-0.4 V and 2.4-5.5 V (only TTL-compatible is specified), and on separate 5150 comparison. 100-500 ms delay and 8284 /RES connection (1-31) are supported. |
| 81 | portable5155/p-psu | P8-2 | UNVERIFIABLE | IBM 3-10, 3-6 / PDF 71,73 | Connector P8-2=KEY; pin/nominal voltage confirmed. XT and Portable key positions confirmed; this document is silent on the stated 5150 applicability. |
| 82 | portable5155/p-psu | P8-3 | UNVERIFIABLE | IBM 3-10, 3-6 / PDF 71,73; 3-3 / PDF 68 | Connector P8-3=+12 V; pin/nominal voltage confirmed. Drive/EIA or diskette PLL use is supported; source is silent on added 4116-board RAM supply/bias claim. The documented board uses 64K x 1 RAM (1-12). |
| 83 | portable5155/p-psu | P8-4 | CONFIRMED | IBM 3-10, 3-6 / PDF 71,73 | Connector P8-4=-12 V; pin/nominal voltage confirmed. Ground/reference or logic supply agrees. |
| 84 | portable5155/p-psu | P8-5 | CONFIRMED | IBM 3-10, 3-6 / PDF 71,73 | Connector P8-5=GND; pin/nominal voltage confirmed. Ground/reference or logic supply agrees. |
| 85 | portable5155/p-psu | P8-6 | CONFIRMED | IBM 3-10, 3-6 / PDF 71,73 | Connector P8-6=GND; pin/nominal voltage confirmed. Ground/reference or logic supply agrees. |
| 86 | portable5155/p-psu | P9-1 | CONFIRMED | IBM 3-10, 3-6 / PDF 71,73 | Connector P9-1=GND; pin/nominal voltage confirmed. Ground/reference or logic supply agrees. |
| 87 | portable5155/p-psu | P9-2 | CONFIRMED | IBM 3-10, 3-6 / PDF 71,73 | Connector P9-2=GND; pin/nominal voltage confirmed. Ground/reference or logic supply agrees. |
| 88 | portable5155/p-psu | P9-3 | UNVERIFIABLE | IBM 3-10, 3-6 / PDF 71,73; 3-3 / PDF 68 | Connector P9-3=-5 V; pin/nominal voltage confirmed. Drive/EIA or diskette PLL use is supported; source is silent on added 4116-board RAM supply/bias claim. The documented board uses 64K x 1 RAM (1-12). |
| 89 | portable5155/p-psu | P9-4 | CONFIRMED | IBM 3-10, 3-6 / PDF 71,73 | Connector P9-4=+5 V; pin/nominal voltage confirmed. Ground/reference or logic supply agrees. |
| 90 | portable5155/p-psu | P9-6 | CONFIRMED | IBM 3-10, 3-6 / PDF 71,73 | Connector P9-6=+5 V; pin/nominal voltage confirmed. Ground/reference or logic supply agrees. |
| 91 | portable5155/p-disp | 1 | CONFIRMED | IBM 3-10, 3-8 / PDF 71,75 | P12 pin 1=+12 V display. Sense window +10.8 to +15.6 V explicitly matches; this is labeled as Power Good sensing, not regulation tolerance. |
| 92 | portable5155/p-disp | 2 | CONFIRMED | IBM 3-10 / PDF 71 | P12 pin 2=ground; 0 V reference. |
| 93 | portable5155/p-slot | A2 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A2=D7. 1-18/1-19 confirms corresponding address/data bit. |
| 94 | portable5155/p-slot | A3 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A3=D6. 1-18/1-19 confirms corresponding address/data bit. |
| 95 | portable5155/p-slot | A4 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A4=D5. 1-18/1-19 confirms corresponding address/data bit. |
| 96 | portable5155/p-slot | A6 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A6=D3. 1-18/1-19 confirms corresponding address/data bit. |
| 97 | portable5155/p-slot | A7 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A7=D2. 1-18/1-19 confirms corresponding address/data bit. |
| 98 | portable5155/p-slot | A8 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A8=D1. 1-18/1-19 confirms corresponding address/data bit. |
| 99 | portable5155/p-slot | A9 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A9=D0. 1-18/1-19 confirms corresponding address/data bit. |
| 100 | portable5155/p-slot | A10 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A10=I/O CH RDY. 1-20 normally HIGH; pull LOW for wait states, at most 10 clocks; 1-32 shows pull-up. |
| 101 | portable5155/p-slot | A11 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A11=AEN. 1-18 HIGH transfers address/data and read/write ownership to DMA. |
| 102 | portable5155/p-slot | A12 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A12=A19. 1-18/1-19 confirms corresponding address/data bit. |
| 103 | portable5155/p-slot | A13 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A13=A18. 1-18/1-19 confirms corresponding address/data bit. |
| 104 | portable5155/p-slot | A14 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A14=A17. 1-18/1-19 confirms corresponding address/data bit. |
| 105 | portable5155/p-slot | A16 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A16=A15. 1-18/1-19 confirms corresponding address/data bit. |
| 106 | portable5155/p-slot | A17 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A17=A14. 1-18/1-19 confirms corresponding address/data bit. |
| 107 | portable5155/p-slot | A18 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A18=A13. 1-18/1-19 confirms corresponding address/data bit. |
| 108 | portable5155/p-slot | A19 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A19=A12. 1-18/1-19 confirms corresponding address/data bit. |
| 109 | portable5155/p-slot | A20 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A20=A11. 1-18/1-19 confirms corresponding address/data bit. |
| 110 | portable5155/p-slot | A21 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A21=A10. 1-18/1-19 confirms corresponding address/data bit. |
| 111 | portable5155/p-slot | A22 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A22=A9. 1-18/1-19 confirms corresponding address/data bit. |
| 112 | portable5155/p-slot | A23 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A23=A8. 1-18/1-19 confirms corresponding address/data bit. |
| 113 | portable5155/p-slot | A25 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A25=A6. 1-18/1-19 confirms corresponding address/data bit. |
| 114 | portable5155/p-slot | A26 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A26=A5. 1-18/1-19 confirms corresponding address/data bit. |
| 115 | portable5155/p-slot | A27 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A27=A4. 1-18/1-19 confirms corresponding address/data bit. |
| 116 | portable5155/p-slot | A28 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A28=A3. 1-18/1-19 confirms corresponding address/data bit. |
| 117 | portable5155/p-slot | A30 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A30=A1. 1-18/1-19 confirms corresponding address/data bit. |
| 118 | portable5155/p-slot | A31 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram A31=A0. 1-18/1-19 confirms corresponding address/data bit. |
| 119 | portable5155/p-slot | B1 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B1=GND. Ground reference=0 V. |
| 120 | portable5155/p-slot | B2 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B2=RESET DRV. 1-21 active HIGH at power-up or low line; 1-31/1-32 shows reset generation. |
| 121 | portable5155/p-slot | B4 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B4=IRQ2. 1-11 reserved; 1-20 LOW-to-HIGH interrupt request. |
| 122 | portable5155/p-slot | B5 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40; 3-4 / PDF 69 | Diagram B5=-5 V. 3-4 output tolerance table gives -4.60 to -5.50 V; nominal voltage agrees. |
| 123 | portable5155/p-slot | B6 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B6=DRQ2. 1-34 channel 2; diskette DMA channel documented in BIOS. |
| 124 | portable5155/p-slot | B7 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40; 3-4 / PDF 69 | Diagram B7=-12 V. 3-4 output tolerance table gives -10.92 to -13.20 V; nominal voltage agrees. |
| 125 | portable5155/p-slot | B8 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B8=-CARD SLCTD. 1-18/1-19 active LOW, driven by slot J8 card, open collector. |
| 126 | portable5155/p-slot | B9 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40; 3-4 / PDF 69 | Diagram B9=+12 V. 3-4 output tolerance table gives 11.52-12.60 V; nominal voltage agrees. |
| 127 | portable5155/p-slot | B10 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B10=GND. Ground reference=0 V. |
| 128 | portable5155/p-slot | B11 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B11=-MEMW. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 129 | portable5155/p-slot | B12 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B12=-MEMR. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 130 | portable5155/p-slot | B13 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B13=-IOW. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 131 | portable5155/p-slot | B14 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B14=-IOR. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 132 | portable5155/p-slot | B15 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B15=-DACK3. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 133 | portable5155/p-slot | B16 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B16=DRQ3. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 134 | portable5155/p-slot | B17 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B17=-DACK1. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 135 | portable5155/p-slot | B18 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B18=DRQ1. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 136 | portable5155/p-slot | B19 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B19=-DACK0. 1-19 refresh acknowledge active LOW; 1-13 refresh approximately every 15 us. |
| 137 | portable5155/p-slot | B20 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B20=CLOCK. 1-19 oscillator divided by 3; 4.77 MHz, 33% duty. |
| 138 | portable5155/p-slot | B21 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B21=IRQ7. 1-11 printer; 1-20 raise and hold until acknowledged. |
| 139 | portable5155/p-slot | B22 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B22=IRQ6. 1-11 diskette. |
| 140 | portable5155/p-slot | B23 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B23=IRQ5. 1-11 fixed disk. |
| 141 | portable5155/p-slot | B24 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B24=IRQ4. 1-11 primary asynchronous communications. |
| 142 | portable5155/p-slot | B25 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B25=IRQ3. 1-11 secondary asynchronous communications. |
| 143 | portable5155/p-slot | B26 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B26=-DACK2. 1-19/1-20 active LOW memory/I/O command or DMA acknowledge, or active HIGH DMA request, as recorded. |
| 144 | portable5155/p-slot | B27 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B27=T/C. 1-21 active HIGH pulse at DMA terminal count. |
| 145 | portable5155/p-slot | B28 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B28=ALE. 1-18 from 8288; falling edge latches address. |
| 146 | portable5155/p-slot | B29 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40; 3-4 / PDF 69 | Diagram B29=+5 V. 3-4 output tolerance table gives 4.80-5.25 V; nominal voltage agrees. |
| 147 | portable5155/p-slot | B30 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B30=OSC. 1-21 14.31818 MHz, 50% duty; 14.318 MHz is rounding. |
| 148 | portable5155/p-slot | B31 | CONFIRMED | IBM 1-17 to 1-21 / PDF 36-40 | Diagram B31=GND. Ground reference=0 V. |
| 149 | xt5160 | Supply on a load; Power P8 and P9 to the system board only; no drives, no cards | WRONG | IBM 3-4, 3-3, 1-40 / PDF 69,68,59 | MEDIUM. Minimum load is 2.3 A on +5 V AND 0.4 A on +12 V. Bare-board +12 V feeds only slot connectors/capacitors; removing cards/drives removes the specified +12 V load. Correct setup must ensure both minimum loads, including a suitable +12 V load. Bare board/fan rotation cannot prove compliance. XT text also does not prove stated mandatory power-cycling behavior. Principles: prove-it-works, fix-root-causes. |
| 150 | xt5160 | Crystal oscillator; 8284A pin 12 | UNVERIFIABLE | IBM 1-21, 1-31 / PDF 40,50 | 8284 OSC pin 12, 14.31818 MHz and 50% confirmed. Source is silent on asserted crystal-then-8284 diagnostic ordering or exclusive fault causes. |
| 151 | xt5160 | CPU clock; 8284A pin 8; 8088 pin 19; 8288 pin 2 | UNVERIFIABLE | IBM 1-19, 1-31 / PDF 38,50 | 8284 pin 8, 8088 pin 19, 8288 pin 2 and 4.77 MHz/33% confirmed. Source is silent on exclusive missing-clock fault diagnosis; schematic also includes crystal/configuration/power dependencies. |
| 152 | portable5155 | Display supply; p-disp pin 1 to pin 2 | UNVERIFIABLE | IBM 3-10, 3-8, 1-3 / PDF 71,75,22 | P12 pin 1=+12 V, pin 2=ground; sense 10.8-15.6 V, current 0.5-1.5 A, and display adapter slot 1 confirmed. Source is silent on claimed exclusive PSU-versus-display/CGA fault-isolation rule, which does not rule out cable/connector faults. |
| 153 | portable5155 | CPU clock; 8284A pin 8; 8088 pin 19 | UNVERIFIABLE | IBM 1-19, 1-31 / PDF 38,50 | 8284 pin 8 and 8088 pin 19 carry 4.77 MHz/33%; OSC pin 12=14.31818 MHz. Source is silent on prescribed diagnostic sequence and sufficiency of that test to condemn 8284. |
| 154 | xt5160 | +5 V; xt-psu pins P9-4, P9-5, P9-6; 8088 pin 40 | CONFIRMED | IBM 3-4, 3-6, 3-3, 1-31 / PDF 69,73,68,50 | +5/-4% gives 4.80-5.25 V; P9-4/5/6, CPU VCC=40. Board 2-4 A, approximately 11 A left for adapters explicitly stated. |
| 155 | xt5160 | +12 V; xt-psu pin P8-3; I/O channel B9 | CONFIRMED | IBM 3-4, 3-6, 3-3, 1-17 / PDF 69,73,68,36 | +5/-4% gives 11.52-12.60 V; P8-3, slot B9; diskette/fixed-disk use explicit. |
| 156 | xt5160 | -12 V; xt-psu pin P8-4; I/O channel B7 | CONFIRMED | IBM 3-4, 3-6, 1-17 / PDF 69,73,36 | Magnitude +10/-9% gives -13.20 to -10.92 V; P8-4, slot B7. |
| 157 | xt5160 | -5 V; xt-psu pin P9-3; I/O channel B5 | CONFIRMED | IBM 3-4, 3-6, 3-3, 1-17 / PDF 69,73,68,36 | Magnitude +10/-8% gives -5.50 to -4.60 V; P9-3, slot B5; diskette PLL use explicit. |
| 158 | xt5160 | Power Good; xt-psu pin P8-1 | CONFIRMED | IBM 3-5, 3-6 / PDF 72,73 | P8-1 POWER GOOD LOW at startup, turn-on 100-500 ms; minimum 1.0 s off before regeneration. |
| 159 | portable5155 | +5 V; p-psu pins P9-4, P9-5, P9-6; 8088 pin 40 | CONFIRMED | IBM 3-8, 3-10, 1-31 / PDF 75,71,50 | Sense +4.5 to +6.5 V; current 2.3-11.2 A; P9-4/5/6, CPU VCC=40. |
| 160 | portable5155 | +12 V; p-psu pin P8-3 | CONFIRMED | IBM 3-8, 3-10, 3-7 / PDF 75,71,74 | Sense +10.8 to +15.6 V; current 0.04-2.9 A; P8-3; diskette/EIA use explicit. |
| 161 | portable5155 | +12 V display; p-disp pin 1 (P12) | CONFIRMED | IBM 3-8, 3-10 / PDF 75,71 | Display sense +10.8 to +15.6 V; current 0.5-1.5 A; P12 pin 1. |
| 162 | portable5155 | -12 V; p-psu pin P8-4 | CONFIRMED | IBM 3-8, 3-10 / PDF 75,71 | Sense -10.2 to -15.6 V; P8-4=-12 V. |
| 163 | portable5155 | -5 V; p-psu pin P9-3 | CONFIRMED | IBM 3-8, 3-10 / PDF 75,71 | Sense -4.3 to -6.5 V; P9-3=-5 V. |
| 164 | portable5155 | Power Good; p-psu pin P8-1 | CONFIRMED | IBM 3-9, 3-10 / PDF 70,71 | P8-1 POWER GOOD LOW until outputs reach sense minima; TTL HIGH after 100-500 ms. |
| 165 | spectrum | +12 V from the DC-DC converter; 4116 pin 8 | WRONG | Retroleum HTML: No Boot, white-border/lower RAM paragraphs | HIGH. Pin 8=+12 V confirmed. Source says investigate deviation greater than 1 V from +12 V (diagnostic interval 11-13 V); stored 10.8-13.2 V accepts voltages that fail that test. Source also warns replacement TR4/TR5 may burn again and powered checks must be brief; that safety condition is omitted from this repeated converter/RAM test. Correct diagnostic threshold and restore brief-power warning; this is not a manufacturer operating-tolerance specification. Principles: prove-it-works, fix-root-causes. |
| 166 | ay8912 | 1 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 1=ANALOG C; D/A output, up to 1 V peak-to-peak (sec.2.3); audio depends on channel programming. |
| 167 | ay8912 | 2 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 2=TEST 1; GI test pin, leave open; do not use as tie point (sec.2.3). |
| 168 | ay8912 | 4 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 4=ANALOG B; D/A output, up to 1 V peak-to-peak (sec.2.3); audio depends on channel programming. |
| 169 | ay8912 | 5 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 5=ANALOG A; D/A output, up to 1 V peak-to-peak (sec.2.3); audio depends on channel programming. |
| 170 | ay8912 | 7 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 7=IOA7; Bidirectional port, on-chip pull-up (sec.2.3).  |
| 171 | ay8912 | 8 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 8=IOA6; Bidirectional port, on-chip pull-up (sec.2.3).  |
| 172 | ay8912 | 9 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 9=IOA5; Bidirectional port, on-chip pull-up (sec.2.3).  |
| 173 | ay8912 | 10 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 10=IOA4; Bidirectional port, on-chip pull-up (sec.2.3).  |
| 174 | ay8912 | 11 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 11=IOA3; Bidirectional port, on-chip pull-up (sec.2.3).  |
| 175 | ay8912 | 12 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 12=IOA2; Bidirectional port, on-chip pull-up (sec.2.3).  |
| 176 | ay8912 | 13 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 13=IOA1; Bidirectional port, on-chip pull-up (sec.2.3).  |
| 177 | ay8912 | 14 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 14=IOA0; Bidirectional port, on-chip pull-up (sec.2.3).  |
| 178 | ay8912 | 15 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 15=CLOCK; Input timing reference for tone, noise and envelope (sec.2.3). |
| 179 | ay8912 | 16 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 16=/RESET; LOW resets all registers to zero; pull-up; HIGH releases reset (sec.2.3). |
| 180 | ay8912 | 17 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 17=A8; A8 pull-up, /A9 pull-down; may be open; tie to +5 V/ground respectively in noisy applications (sec.2.3). |
| 181 | ay8912 | 19 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 19=BC2; Simplified interface ties BC2 to +5 V and drives BDIR/BC1 (sec.2.3). |
| 182 | ay8912 | 22 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 22=DA6; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 183 | ay8912 | 23 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 23=DA5; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 184 | ay8912 | 24 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 24=DA4; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 185 | ay8912 | 25 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 25=DA3; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 186 | ay8912 | 26 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 26=DA2; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 187 | ay8912 | 27 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; TS2068 Appendix D / PDF 178; 19 / PDF 27 | ay8912 pin 27=DA1; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 188 | ay8910 | 2 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 2=NC; Fig.4 labels N.C. |
| 189 | ay8910 | 3 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 3=ANALOG B; D/A output, up to 1 V peak-to-peak (sec.2.3); audio depends on channel programming. |
| 190 | ay8910 | 4 | UNVERIFIABLE | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 14/44 / PDF 17/47 | ay8910 pin 4=ANALOG A; Channel A D/A output and up-to-1 V peak-to-peak confirmed. Source is silent on mandatory power-on beep specifically on channel A; generic sound specification does not prove firmware startup behavior. |
| 191 | ay8910 | 5 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 5=NC; Fig.4 labels N.C. |
| 192 | ay8910 | 7 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 7=IOB6; Bidirectional port, on-chip pull-up (sec.2.3). B6 LOW selects J3/joystick 1, HIGH selects J4/joystick 2. |
| 193 | ay8910 | 8 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 8=IOB5; Bidirectional port, on-chip pull-up (sec.2.3). B5 -> J4 pin 8. |
| 194 | ay8910 | 9 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 9=IOB4; Bidirectional port, on-chip pull-up (sec.2.3). B4 -> J3 pin 8. |
| 195 | ay8910 | 10 | UNVERIFIABLE | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 10=IOB3; PSG-to-joystick bit/pin assignment and open-collector buffer are supported. Source is silent on specific 7407 part; generic MSX specification supplies no 7407 requirement or circuit. |
| 196 | ay8910 | 11 | UNVERIFIABLE | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 11=IOB2; PSG-to-joystick bit/pin assignment and open-collector buffer are supported. Source is silent on specific 7407 part; generic MSX specification supplies no 7407 requirement or circuit. |
| 197 | ay8910 | 12 | UNVERIFIABLE | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 12=IOB1; PSG-to-joystick bit/pin assignment and open-collector buffer are supported. Source is silent on specific 7407 part; generic MSX specification supplies no 7407 requirement or circuit. |
| 198 | ay8910 | 13 | UNVERIFIABLE | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 13=IOB0; PSG-to-joystick bit/pin assignment and open-collector buffer are supported. Source is silent on specific 7407 part; generic MSX specification supplies no 7407 requirement or circuit. |
| 199 | ay8910 | 14 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 14=IOA7; Bidirectional port, on-chip pull-up (sec.2.3). A7=CSAR cassette read. |
| 200 | ay8910 | 15 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 15=IOA6; Bidirectional port, on-chip pull-up (sec.2.3). A6 Japanese keyboard JIS HIGH, syllable LOW. |
| 201 | ay8910 | 16 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 16=IOA5; Bidirectional port, on-chip pull-up (sec.2.3). A5 selected joystick pin 7 / trigger B. |
| 202 | ay8910 | 17 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 17=IOA4; Bidirectional port, on-chip pull-up (sec.2.3). A4 selected joystick pin 6 / trigger A. |
| 203 | ay8910 | 18 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 18=IOA3; Bidirectional port, on-chip pull-up (sec.2.3). A3 RIGHT. |
| 204 | ay8910 | 19 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 19=IOA2; Bidirectional port, on-chip pull-up (sec.2.3). A2 LEFT. |
| 205 | ay8910 | 20 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 20=IOA1; Bidirectional port, on-chip pull-up (sec.2.3). A1 BACK/down. |
| 206 | ay8910 | 21 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; MSX 44 / PDF 47 | ay8910 pin 21=IOA0; Bidirectional port, on-chip pull-up (sec.2.3). A0 FWD/up. |
| 207 | ay8910 | 23 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 23=/RESET; LOW resets all registers to zero; pull-up; HIGH releases reset (sec.2.3). |
| 208 | ay8910 | 24 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 24=/A9; A8 pull-up, /A9 pull-down; may be open; tie to +5 V/ground respectively in noisy applications (sec.2.3). |
| 209 | ay8910 | 25 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 25=A8; A8 pull-up, /A9 pull-down; may be open; tie to +5 V/ground respectively in noisy applications (sec.2.3). |
| 210 | ay8910 | 26 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13; Yamaha 2-3 / PDF 2-3 | ay8910 pin 26=TEST 2; GI test pin, leave open; do not use as tie point (sec.2.3). YM2149 pin 26 SEL has pull-up; LOW divides input by 2, HIGH/open uses input clock. |
| 211 | ay8910 | 27 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 27=BDIR; BC2 HIGH: BDIR/BC1 00 inactive, 01 read, 10 write, 11 latch address. |
| 212 | ay8910 | 28 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 28=BC2; Simplified interface ties BC2 to +5 V and drives BDIR/BC1 (sec.2.3). |
| 213 | ay8910 | 30 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 30=DA7; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 214 | ay8910 | 31 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 31=DA6; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 215 | ay8910 | 32 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 32=DA5; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 216 | ay8910 | 33 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 33=DA4; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 217 | ay8910 | 34 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 34=DA3; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 218 | ay8910 | 35 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 35=DA2; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 219 | ay8910 | 37 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 37=DA0; Bidirectional data/address bus; bit ordering agrees (sec.2.3). |
| 220 | ay8910 | 38 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 38=ANALOG C; D/A output, up to 1 V peak-to-peak (sec.2.3); audio depends on channel programming. |
| 221 | ay8910 | 39 | CONFIRMED | GI Fig.4/5, sec.2.3 / PDF 10-13 | ay8910 pin 39=TEST 1; GI test pin, leave open; do not use as tie point (sec.2.3). |
| 222 | msx1 | PSG clock; AY-3-8910 pin 22 | UNVERIFIABLE | GI sec.2.3,7.3,7.4 / PDF 11,53-54 | Pin 22 CLOCK, LOW max 0.6 V, HIGH min 2.4 V, clock 1-2 MHz, duty 25-75% confirmed. Source is silent on MSX-specific 1.7897725 MHz rate. MSX book 1.3.6 (printed 14 / PDF 17) separately proves frequency but is not cited by this item; add that citation. Voltages are explicitly labeled input-limit idealization rather than measured amplitudes. |

## Coverage

| kind | items | confirmed | wrong | unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 18 | 18 | 0 | 0 |
| connector-pin | 131 | 125 | 2 | 4 |
| first-ten | 6 | 0 | 2 | 4 |
| rail | 11 | 11 | 0 | 0 |
| chip-pin | 56 | 51 | 0 | 5 |
| scope | 1 | 0 | 0 | 1 |
| TOTAL | 223 | 205 | 4 | 14 |

## Source-link audit

- No dead or blocked source links after successful fallback downloads.
- Yamaha pin layout is p.2 and pin descriptions are p.3, rather than cited p.1-2/#page=1. Use #page=2 and #page=3, especially for SEL.
- Scope item 222 needs MSX Technical Data Book 1.3.6, printed p.14 / PDF p.17: https://archive.org/details/MSXTechnicalDataBook/page/n16 . GI alone does not support the machine frequency.
- GI TEST-pin instructions are PDF p.13, outside the AY-3-8912 citation locator p.11-12; the complete document contains the evidence.
- IBM clock pin claims require schematic pages 1-31, 1-34 and 1-38 beyond prose-only clock anchors. These pages were inspected.
