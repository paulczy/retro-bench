# Per-item fact-check decisions

Index is zero-based in architect.json. A checked item has CONFIRMED, WRONG or UNVERIFIABLE status. NOT CHECKED is excluded from coverage. Shared-chip-text review concerns cross-machine scope; it is not a complete timing/electrical audit of every listed pin.

## connector-orientation

| Index | Record | Status | Evidence / limitation |
|---:|---|---|---|
| 0 | c16 / c16-joy | CONFIRMED | C16 schematic 251788 sheets 1-2, printed pp. 7-8 (working alternate scan PDF pp. 11-12); Plus/4 connector map image 2, rotated to key-down; Lumberg 0121 p. 2 for standard DINs. C16 video pin 8 is +5 V. |
| 1 | plus4 / c16-joy | CONFIRMED | C16 schematic 251788 sheets 1-2, printed pp. 7-8 (working alternate scan PDF pp. 11-12); Plus/4 connector map image 2, rotated to key-down; Lumberg 0121 p. 2 for standard DINs. C16 video pin 8 is +5 V. |
| 2 | c16 / c16-cass | CONFIRMED | C16 schematic 251788 sheets 1-2, printed pp. 7-8 (working alternate scan PDF pp. 11-12); Plus/4 connector map image 2, rotated to key-down; Lumberg 0121 p. 2 for standard DINs. C16 video pin 8 is +5 V. |
| 3 | plus4 / c16-cass | CONFIRMED | C16 schematic 251788 sheets 1-2, printed pp. 7-8 (working alternate scan PDF pp. 11-12); Plus/4 connector map image 2, rotated to key-down; Lumberg 0121 p. 2 for standard DINs. C16 video pin 8 is +5 V. |
| 4 | c16 / c16-iec | CONFIRMED | C16 schematic 251788 sheets 1-2, printed pp. 7-8 (working alternate scan PDF pp. 11-12); Plus/4 connector map image 2, rotated to key-down; Lumberg 0121 p. 2 for standard DINs. C16 video pin 8 is +5 V. |
| 5 | plus4 / c16-iec | CONFIRMED | C16 schematic 251788 sheets 1-2, printed pp. 7-8 (working alternate scan PDF pp. 11-12); Plus/4 connector map image 2, rotated to key-down; Lumberg 0121 p. 2 for standard DINs. C16 video pin 8 is +5 V. |
| 6 | c16 / c16-video | CONFIRMED | C16 schematic 251788 sheets 1-2, printed pp. 7-8 (working alternate scan PDF pp. 11-12); Plus/4 connector map image 2, rotated to key-down; Lumberg 0121 p. 2 for standard DINs. C16 video pin 8 is +5 V. |
| 7 | plus4 / c16-video | WRONG | Plus/4 c16-video pin 8 is NC, not +5 V. Connector map image 2 and Plus/4 service manual PDF p. 21 CN7 show NC on 7 and 8. C16 schematic cannot establish the Plus/4 wiring. |
| 8 | c16 / c16-exp | WRONG | Expansion port pin 1 is at the RIGHT in the external machine view, not left. Connector map image 1, printed p. 33, CN4. Both edge-25x25-cbm assigned records are mirrored. |
| 9 | plus4 / c16-exp | WRONG | Expansion port pin 1 is at the RIGHT in the external machine view, not left. Connector map image 1, printed p. 33, CN4. Both edge-25x25-cbm assigned records are mirrored. |
| 10 | plus4 / plus4-user | CONFIRMED | Plus/4 connector map image 1 p. 33: user port numbers on top, letters below, 1 at left. P1 at K; TED manual calls its function CTS. |
| 11 | c64 / c64-user | CONFIRMED | C64 Programmer Reference Appendix I, printed pp. 395 and 397, PDF pp. 414 and 416: DE9 male front, cassette 1-6 over A-F, user port 1-12 over A-N. |
| 12 | c64 / c64-power | CONFIRMED | C64/C64C service manual p. 4, PDF p. 8: machine CN7 pins 1-3 ground, 4 NC, 5 +5 V, 6/7 AC. PSU 902503-02 drawing and Lumberg 0121 p. 2 establish key-down DIN7 numbering. PSU plug NC contacts are distinct from board grounds. |
| 13 | atari600xl / atari-power | CONFIRMED | Atarimania FAQ 1.14 power, monitor and PBI drawings/tables. Standard DIN5/DIN7 checked against Lumberg 0121 p. 2. PBI odd contacts above even, pin 1 at left. 600XL field service manual Fig. 1-12, p. 1-16 also supplies the PBI table. |
| 14 | c64 / c64-exp | WRONG | C64 expansion pin 1 at RIGHT, not left; C64 Programmer Reference p. 396, PDF p. 415. VIC-20 uses this geometry with pin 1 at left, so the error is record-specific. |
| 15 | vic20 / vic20-cart | CONFIRMED | VIC-20 Programmer Reference Appendix J pp. 280-282, PDF pp. 296-298. Cartridge pin 1 at left, numeric upper row. DE9 male. DIN5 socket rotated to key-down. Cassette numeric row above letters. |
| 16 | c64 / c64-ctrl | CONFIRMED | C64 Programmer Reference Appendix I, printed pp. 395 and 397, PDF pp. 414 and 416: DE9 male front, cassette 1-6 over A-F, user port 1-12 over A-N. |
| 17 | vic20 / vic20-ctrl | CONFIRMED | VIC-20 Programmer Reference Appendix J pp. 280-282, PDF pp. 296-298. Cartridge pin 1 at left, numeric upper row. DE9 male. DIN5 socket rotated to key-down. Cassette numeric row above letters. |
| 18 | c64 / c64-cass | CONFIRMED | C64 Programmer Reference Appendix I, printed pp. 395 and 397, PDF pp. 414 and 416: DE9 male front, cassette 1-6 over A-F, user port 1-12 over A-N. |
| 19 | vic20 / vic20-cass | CONFIRMED | VIC-20 Programmer Reference Appendix J pp. 280-282, PDF pp. 296-298. Cartridge pin 1 at left, numeric upper row. DE9 male. DIN5 socket rotated to key-down. Cassette numeric row above letters. |
| 20 | vic20 / vic20-video | CONFIRMED | VIC-20 Programmer Reference Appendix J pp. 280-282, PDF pp. 296-298. Cartridge pin 1 at left, numeric upper row. DE9 male. DIN5 socket rotated to key-down. Cassette numeric row above letters. |
| 21 | atari800 / atari-monitor | CONFIRMED | Atarimania FAQ 1.14 power, monitor and PBI drawings/tables. Standard DIN5/DIN7 checked against Lumberg 0121 p. 2. PBI odd contacts above even, pin 1 at left. 600XL field service manual Fig. 1-12, p. 1-16 also supplies the PBI table. |
| 22 | c1541 / 1541ii-power | CONFIRMED | 312551-01 power supply schematic/plug drawing: 1 +5 V, 2 GND, 3 NC, 4 +12 V. Machine socket is mirror of plug; matches Lumberg 0121 04 p. 2 front view derived from female solder-side drawing. Drive manuals power sheets agree on signals. |
| 23 | c1581 / 1581-power | CONFIRMED | 312551-01 power supply schematic/plug drawing: 1 +5 V, 2 GND, 3 NC, 4 +12 V. Machine socket is mirror of plug; matches Lumberg 0121 04 p. 2 front view derived from female solder-side drawing. Drive manuals power sheets agree on signals. |
| 24 | apple2 / ii-slot | WRONG | Apple II slot pin 19 is NC generally; only slot 7 carries video-generator SYNC. It is not universal CPU opcode SYNC. Apple II Reference Manual Fig. 21 p. 106 and Table 33 p. 107, PDF pp. 117-118. Sequential opposing contact numbering otherwise matches. |
| 25 | apple2plus / ii-slot | WRONG | Apple II slot pin 19 is NC generally; only slot 7 carries video-generator SYNC. It is not universal CPU opcode SYNC. Apple II Reference Manual Fig. 21 p. 106 and Table 33 p. 107, PDF pp. 117-118. Sequential opposing contact numbering otherwise matches. |
| 26 | apple2 / ii-video | CONFIRMED | Apple II Reference Manual p. 97 (PDF 108) explicitly identifies RCA video, center signal/sleeve ground. P. 103 (PDF 114) explicitly identifies two female miniature phone cassette jacks; TS choice is correct. |
| 27 | apple2plus / ii-video | CONFIRMED | Apple II Reference Manual p. 97 (PDF 108) explicitly identifies RCA video, center signal/sleeve ground. P. 103 (PDF 114) explicitly identifies two female miniature phone cassette jacks; TS choice is correct. |
| 28 | apple2 / ii-cass | CONFIRMED | Apple II Reference Manual p. 97 (PDF 108) explicitly identifies RCA video, center signal/sleeve ground. P. 103 (PDF 114) explicitly identifies two female miniature phone cassette jacks; TS choice is correct. |
| 29 | apple2 / ii-cass-out | CONFIRMED | Apple II Reference Manual p. 97 (PDF 108) explicitly identifies RCA video, center signal/sleeve ground. P. 103 (PDF 114) explicitly identifies two female miniature phone cassette jacks; TS choice is correct. |
| 30 | apple2e / 2e-aux | UNVERIFIABLE | Apple IIe Table 7-21 pp. 198-199 establishes signals, but does not show the physical contact rows, numbering direction or socket view. No confirmation of edge-30x30-seq orientation from that cited table. |
| 31 | colecovision / cv-expansion | UNVERIFIABLE | ColecoVision redraw Rev J sheet 2 establishes 60 expansion pin signals but uses a schematic connector symbol, not a machine-facing drawing. Cannot prove the assumed sequential return numbering from that sheet. |
| 32 | apple2c / 2c-serial1 | CONFIRMED | Apple IIc Technical Reference: Fig. 11-30 p. 278 (PDF 306), DIN5-240 numbering rotated to key-down; Fig. 11-25 p. 272 (PDF 300), female DA15; audio jack diagram and description p. 256 (PDF 284), both headphone channels carry mono audio. |
| 33 | apple2c / 2c-serial2 | CONFIRMED | Apple IIc Technical Reference: Fig. 11-30 p. 278 (PDF 306), DIN5-240 numbering rotated to key-down; Fig. 11-25 p. 272 (PDF 300), female DA15; audio jack diagram and description p. 256 (PDF 284), both headphone channels carry mono audio. |
| 34 | apple2c / 2c-video-exp | CONFIRMED | Apple IIc Technical Reference: Fig. 11-30 p. 278 (PDF 306), DIN5-240 numbering rotated to key-down; Fig. 11-25 p. 272 (PDF 300), female DA15; audio jack diagram and description p. 256 (PDF 284), both headphone channels carry mono audio. |
| 35 | pc5150 / pc-game | CONFIRMED | IBM PC Technical Reference p. 1-216, PDF 224: game port connector drawing and all 15 assignments; rotate drawing to wide row on top, female numbering matches. |
| 36 | apple2c / 2c-audio | CONFIRMED | Apple IIc Technical Reference: Fig. 11-30 p. 278 (PDF 306), DIN5-240 numbering rotated to key-down; Fig. 11-25 p. 272 (PDF 300), female DA15; audio jack diagram and description p. 256 (PDF 284), both headphone channels carry mono audio. |
| 37 | spectrumplus3 / spectrumplus3-tape | CONFIRMED | Spectrum +3 manual ch. 10 Cassette unit: original fixed-width TRS lead drawing shows MIC/output on tip, EAR/input on ring, common sleeve. |
| 38 | disk2 / disk2-mech | NOT CHECKED | Not completed in this pass; no conclusion. |
| 39 | duodisk / duo-db25 | CONFIRMED | Apple TA37054 DuoDisk cable specification pp. 1-2, full DB25 pin list; rear-panel photo confirms female socket. Standard female DB25 front numbering, wide row above. |
| 40 | model3 / m3-rs232 | UNVERIFIABLE | Model III Technical Reference p. 58 (PDF 69) confirms signals but gives no front connector drawing or explicit gender on the cited pin-out page. Physical female view not established by the checked page. |
| 41 | atari400 / atari-cart | WRONG | Atarimania FAQ cartridge drawing puts letters A-S above numbers 1-15. Atari 600XL Field Service Manual Fig. 1-11 p. 1-14 (PDF 24) independently labels lettered side CONSOLE TOP and numeric side CONSOLE BOTTOM. Site swaps rows. Affects both assigned edge-15x15-cbm records. |
| 42 | atari800 / atari-cart | WRONG | Atarimania FAQ cartridge drawing puts letters A-S above numbers 1-15. Atari 600XL Field Service Manual Fig. 1-11 p. 1-14 (PDF 24) independently labels lettered side CONSOLE TOP and numeric side CONSOLE BOTTOM. Site swaps rows. Affects both assigned edge-15x15-cbm records. |
| 43 | atari400 / atari-power | NOT CHECKED | Not completed in this pass; no conclusion. |
| 44 | atari800 / atari-power | NOT CHECKED | Not completed in this pass; no conclusion. |
| 45 | atari600xl / atari-pbi | CONFIRMED | Atarimania FAQ 1.14 power, monitor and PBI drawings/tables. Standard DIN5/DIN7 checked against Lumberg 0121 p. 2. PBI odd contacts above even, pin 1 at left. 600XL field service manual Fig. 1-12, p. 1-16 also supplies the PBI table. |
| 46 | atari800xl / atari-pbi | CONFIRMED | Atarimania FAQ 1.14 power, monitor and PBI drawings/tables. Standard DIN5/DIN7 checked against Lumberg 0121 p. 2. PBI odd contacts above even, pin 1 at left. 600XL field service manual Fig. 1-12, p. 1-16 also supplies the PBI table. |
| 47 | atari130xe / atari-eci | WRONG | Atari 130XE Sams CC16 terminal guides printed p. 25 (PDF 7), J4B FRONT VIEW: A-H above 1-7. Site swaps rows. Pin 7 +5 V belongs lower right; H ground upper right. Only assigned edge-7x7-cbm record. |
| 48 | colecovision / cv-cart | UNVERIFIABLE | ADAM Technical Reference PDF p. 30 sec. 2.1.9e lists all cartridge signals but does not draw the physical rows or pin-1 end. Coleco redraw sheet 2 also lacks a front view. Odd/even physical orientation is unproven. |
| 49 | adam / adam-cart | UNVERIFIABLE | ADAM Technical Reference PDF p. 30 sec. 2.1.9e lists all cartridge signals but does not draw the physical rows or pin-1 end. Coleco redraw sheet 2 also lacks a front view. Odd/even physical orientation is unproven. |
| 50 | zx80 / zx80-edge | CONFIRMED | k1 connector-map images: pin 1 at right; ZX80/81 A on component side above B; Spectrum Issue 3 B component side above A. All listed signal labels align with the maps. ZX80 B23 NC, ZX81 B23 /ROMCS. |
| 51 | zx81 / zx81-edge | CONFIRMED | k1 connector-map images: pin 1 at right; ZX80/81 A on component side above B; Spectrum Issue 3 B component side above A. All listed signal labels align with the maps. ZX80 B23 NC, ZX81 B23 /ROMCS. |
| 52 | spectrum / spectrum-edge | CONFIRMED | k1 connector-map images: pin 1 at right; ZX80/81 A on component side above B; Spectrum Issue 3 B component side above A. All listed signal labels align with the maps. ZX80 B23 NC, ZX81 B23 /ROMCS. |
| 53 | spectrum128 / spectrum128-edge | UNVERIFIABLE | Spectrum 128 service manual sec. 6.4 p. 1.22 (PDF 25) calls A23 +12 V and B23 pulsed +12 V, conflicting with supplied A23 A5/B23 -12 V and the compatible-Spectrum source. Cannot resolve physical rails from contradictory cited sources; do not treat as confirmed. |
| 54 | spectrum128 / spectrum128-rgb | CONFIRMED | Spectrum 128 Introduction p. 3 embedded sp128031.gif, and +2 community monitor socket diagram/table: DIN8-270 standard key-down numbering; source table and stated default link conditions match. Plus2 source is explicitly secondary. |
| 55 | spectrumplus2 / spectrumplus2-rgb | CONFIRMED | Spectrum 128 Introduction p. 3 embedded sp128031.gif, and +2 community monitor socket diagram/table: DIN8-270 standard key-down numbering; source table and stated default link conditions match. Plus2 source is explicitly secondary. |
| 56 | ts2068 / ts2068-dock | WRONG | TS2068 Technical Manual Fig. 2.4.2-2 p. 59 (PDF 67) explicitly VIEW FROM FRONT: even row above odd, pin 2 upper left, pin 1 lower left. Site draws odd above even with pin 1 right, a half-turn from the working front view. |
| 57 | ti994a / ti994a-cartridge | UNVERIFIABLE | TI-99/4A Servicing Manual p. 105 (PDF 114) GROM port diagram gives odd/even columns and FRONT arrow but does not identify console top versus bottom. Pin assignments checked; row orientation not established. |
| 58 | ts2068 / ts2068-expansion | CONFIRMED | TS2068 Technical Manual Fig. 2.4.1-2 p. 54 (PDF 62), table p. 55: A component row, B noncomponent row; view from FRONT has 1 left. Site rear-facing view has 1 right. Mirroring changes horizontal direction, not row identity. |
| 59 | coco1 / coco-cart | UNVERIFIABLE | CoCo Technical Reference Table 5 p. 36 (PDF 43) and CoCo2 Table 3 p. 53 (PDF 59) establish signals but not socket-facing odd/even row orientation. CoCo2 pins 1/2 NC confirmed. Physical geometry remains unproven. |
| 60 | coco2 / coco-cart | UNVERIFIABLE | CoCo Technical Reference Table 5 p. 36 (PDF 43) and CoCo2 Table 3 p. 53 (PDF 59) establish signals but not socket-facing odd/even row orientation. CoCo2 pins 1/2 NC confirmed. Physical geometry remains unproven. |
| 61 | mc10 / mc10-expansion | UNVERIFIABLE | MC10 Service Manual Table 1 p. 15 is a pin/signal table; cited schematic also is not a physical front view. No evidence for the assumed odd/even row direction. |
| 62 | model1 / ei-printer | UNVERIFIABLE | Expansion Interface Service Manual p. 19 Fig. 7 sheet 2: J4 pin/signal schematic confirms most labels but no physical front view. Assumed odd/even row orientation not established. Schematic has DATA4 pin-number inconsistency noted in data. |
| 63 | hero2000 / hero2000-backplane | UNVERIFIABLE | HERO2000 schematic p. 6 P201-P212 lists 72 contacts in a single symbol column. It does not establish 1-36/72-37 physical side arrangement or front numbering direction. |
| 64 | pc5150 / pc-slot | CONFIRMED | IBM PC Technical Reference I/O channel diagram p. 1-18 (PDF 26): A on component side, B on solder side, pin 1 at rear. Site schematic matches after quarter-turn normalization. |
| 65 | xt5160 / xt-slot | NOT CHECKED | Not completed in this pass; no conclusion. |
| 66 | pcjr / jr-cart | UNVERIFIABLE | PCjr Technical Reference pp. 2-117 and 2-22 (PDF 143/48) establish cartridge/I/O pin assignments. Cartridge top-side drawing helps identify A, but a machine-facing insertion view and reference end for the rendered horizontal layout are not established here. |
| 67 | pcjr / jr-io | UNVERIFIABLE | PCjr Technical Reference pp. 2-117 and 2-22 (PDF 143/48) establish cartridge/I/O pin assignments. Cartridge top-side drawing helps identify A, but a machine-facing insertion view and reference end for the rendered horizontal layout are not established here. |
| 68 | bbcmaster / master-cart | UNVERIFIABLE | BBC Master schematic 0143,000/C sheet 1 lists SK3/SK4 rows a/b, but it is a schematic symbol rather than physical front view. Source does not establish rendered a-above-b orientation in the machine. |
| 69 | oric1 / oric1-printer | UNVERIFIABLE | Oric Owner issue 5 circuit p. 44 confirms PL1 signal numbering, but supplies no physical rear/socket view. Atmos Appendix 11 p. 284 provides a physical drawing for Atmos, not a direct Oric-1 front-view confirmation; avoid assuming one board view proves the other. Archived Oric-1 source was inaccessible here. |
| 70 | atmos / atmos-printer | CONFIRMED | Oric Atmos Appendix 11 p. 284 (PDF 289), explicit rear-panel and printer socket male drawing: even grounds above odd signals, 1 at lower left. Oric Owner source backs Oric-1 connection family; machine-facing layout matches. |

## shared-chip-text

| Index | Record | Status | Evidence / limitation |
|---:|---|---|---|
| 73 | acia6551 / acia6551 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 74 | dram4164 / dram4164 | CONFIRMED | Shared-text neutrality check: 4164 pin names are generic, without one-machine wiring assumptions; TED Hardware Manual sec. 6.2.1 p. 18 supports pin names. |
| 78 | dram4416 / dram4416 | CONFIRMED | Shared-text neutrality check: C16 names are explicitly identified as aliases; 4416 physical pinout in C16 schematic 251788 sheet 1 p. 7 matches. Generic pin functions, no leaked board-specific hookup. |
| 79 | rom23128 / rom23128 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 89 | rom2364 / rom2364 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 91 | rom2332 / rom2332 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 92 | via6522 / via6522 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 93 | pia6520 / pia6520 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 95 | uln2003 / uln2003 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 96 | cpu6502 / cpu6502 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 100 | rom2316 / rom2316 | WRONG | Shared rom2316 pins 18/20/21 give Apple wiring as universal. Model III ROM C U106: pin 18 GND, pin 21 +5 V, pin 20 /ROMC select. Tandy Technical Reference Fig. 6 p. 33 (PDF 44) versus Apple II Reference p. 94 (PDF 105). |
| 114 | dram4464 / dram4464 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 117 | cpuz80 / cpuz80 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 118 | ula_zx81 / ula_zx81 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 120 | sram2114 / sram2114 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 121 | rom_zx81 / rom_zx81 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 124 | dram4116 / dram4116 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 131 | ay8912 / ay8912 | CONFIRMED | AY8912 generic pin functions match GI manual sec. 2.2-2.3 pp. 10-12. Board clock examples explicitly named rather than asserted for all hosts; CPC source diagram explicitly shows 1 MHz PSG clock. |
| 134 | vdp9918 / vdp9918 | CONFIRMED | TI Data Manual sec. 3.7.1-3.7.2 pp. 3-9 to 3-11: shared text qualifies 9918A versus 9928A/9929A outputs and clocks. No unqualified one-machine board hookup in the shared pin text. |
| 137 | psg76489 / psg76489 | UNVERIFIABLE | TI SN76489AN p. 1 proves SN76494 has no /8 stage, but no manufacturer SN94624 datasheet was checked. TI-99/4A Servicing Manual p. 73 (PDF 82) itself uses N/(32*n) in its TMS9919 description. These sources do not resolve the complete shared-family clock/divider statements; no WRONG verdict on the formula. |
| 144 | cpu6809e / cpu6809e | NOT CHECKED | Not completed in this pass; no conclusion. |
| 148 | vdg6847 / vdg6847 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 151 | sam6883 / sam6883 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 166 | pia6821 / pia6821 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 168 | sram6116 / sram6116 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 170 | rom2764 / rom2764 | WRONG | ColecoVision U2 9464C-0036 is not a 2764 physical pin map: original mask ROM has pin 2 NC, pin 20 A11, pin 23 A12; shared map calls these A12, /CE, A11. Coleco redraw Rev J sheet 9, WJ4/WJ5 changeover; original layout/manual shows U2 mask ROM. Board modification note does not make stock pin text correct. |
| 172 | rom27128 / rom27128 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 175 | rtc146818 / rtc146818 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 176 | acia6850 / acia6850 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 178 | ls138 / ls138 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 183 | cpu8088 / cpu8088 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 194 | ppi8255 / ppi8255 | WRONG | Shared 8255 pins PA0-PA7 and PB/PC text assume IBM port $60-$62 and IBM wiring. CPC6128 IC107 instead drives AY data on PA and keyboard/cassette/sound control on PB/PC. CPC service manual CPU schematic printed pp. 19-20 (PDF 17) versus IBM PC p. 1-12 (PDF 20). |
| 200 | crtc6845 / crtc6845 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 210 | rom23256 / rom23256 | WRONG | Shared 23256 pins 20/22/27 describe CPC Gate Array /ROMEN, R112/expansion ROMDIS and OS/BASIC halves. 1581 U2 is DOS ROM: pin 22 tied GND, pin 20 decoded by U6, pin 27 CPU A14. 1581 manual p. 15 (PDF 18), schematic 252380 sheet 1 versus CPC6128 CPU schematic pp. 19-20. |
| 221 | fdc1770 / fdc1770 | WRONG | WD1770 shared pin 28 is described as a high pulse per command. WD handbook p. 45 (PDF 55) says it is SET at command completion and RESET by reading Status: a latched request level, not a specified short pulse. |
| 225 | mux14529 / mux14529 | WRONG | Shared MC14529 pin 9 names Dragon R55 10k and LM393. CoCo schematic 8000073 sheet 2 p. 71 instead uses R48 15k to LM339 U14; sound output network also uses different board components. Use neutral mux functions with per-machine wiring. |

## replacement-claim

| Index | Record | Status | Evidence / limitation |
|---:|---|---|---|
| 71 | cpu7501 / 8501 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 72 | ted7360 / 8360 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 75 | dram4164 / HM4864, MT4264, TMS4164 and other 4164s | NOT CHECKED | Not completed in this pass; no conclusion. |
| 76 | dram4164 / 4164 with the right refresh | NOT CHECKED | Not completed in this pass; no conclusion. |
| 77 | dram4164 / 41256 (256K x 1) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 80 | rom23128 / 27128 / 27C128 EPROM | NOT CHECKED | Not completed in this pass; no conclusion. |
| 81 | rom23128 / Two 2764 EPROMs (Oric-1) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 82 | cpu6510 / 8500 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 83 | cpu6510 / 8502 in a C64C (for the 8500) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 84 | vic2 / 8562 (NTSC) / 8565 (PAL) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 85 | vic2 / 6567R56A vs 6567R8 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 86 | sid6581 / 8580 in a 6581 board (or the reverse) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 87 | cia6526 / 6526A | NOT CHECKED | Not completed in this pass; no conclusion. |
| 88 | cia6526 / 8521 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 90 | rom2364 / 2764 to 27512 EPROM on a 2364 adapter | NOT CHECKED | Not completed in this pass; no conclusion. |
| 94 | vic2e / 8564 in a C64C (for the 8562) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 97 | cpu6502 / 65C02 (Rockwell, NCR or GTE, as in the Enhanced IIe) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 98 | mmu344 / 344-0010 MMU from another IIe | NOT CHECKED | Not completed in this pass; no conclusion. |
| 99 | iou344 / 344-0020 IOU from another IIe | NOT CHECKED | Not completed in this pass; no conclusion. |
| 101 | mc3470 / MC3470A | NOT CHECKED | Not completed in this pass; no conclusion. |
| 102 | mc3470 / ECG3470 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 103 | ca3146 / CA3146AE | NOT CHECKED | Not completed in this pass; no conclusion. |
| 104 | ca3146 / CA3046 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 105 | ca3146 / RCA SK3697 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 106 | ls259 / 9334 or 74259 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 107 | cpu6502c / C014806 SALLY from another 600XL, 800XL, 65XE, 130XE, XEGS (also in late 400/800 CPU boards, the 5200 and 7800) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 108 | antic / CO12296 (400/800/1200XL) or CO21697 (600XL/800XL/XE), NTSC | NOT CHECKED | Not completed in this pass; no conclusion. |
| 109 | antic / CO14887 (400/800) or CO21698 (XL/XE), PAL and SECAM | NOT CHECKED | Not completed in this pass; no conclusion. |
| 110 | gtia / CO14805 GTIA (NTSC) for a CO12295 CTIA | NOT CHECKED | Not completed in this pass; no conclusion. |
| 111 | gtia / CO14889 GTIA (PAL), CO20120 FGTIA (SECAM) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 112 | pokey / C012294 with any maker suffix (-01 AMI, -03 Signetics, -19 National, -22 OKI, -31 IMP) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 113 | freddie / CO61991 or CO61922 FREDDIE from another XE or late 800XL | NOT CHECKED | Not completed in this pass; no conclusion. |
| 115 | ls-controller / SN74LS541N | NOT CHECKED | Not completed in this pass; no conclusion. |
| 116 | ls-controller / SN74HCT541N | NOT CHECKED | Not completed in this pass; no conclusion. |
| 119 | ula_zx81 / 2C210E | NOT CHECKED | Not completed in this pass; no conclusion. |
| 122 | rom_zx81 / 2764 EPROM on a 24-to-28 pin adapter | NOT CHECKED | Not completed in this pass; no conclusion. |
| 123 | rom_zx81 / AT28C128 / AT28C256 PLCC adapter | NOT CHECKED | Not completed in this pass; no conclusion. |
| 125 | dram4116 / 4164 / 41256 on a 4116 adapter | NOT CHECKED | Not completed in this pass; no conclusion. |
| 126 | dram4116 / 4164 with pins 1 and 8 bent out | NOT CHECKED | Not completed in this pass; no conclusion. |
| 127 | dram4532 / 4164 (64K x 1, 128-cycle refresh) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 128 | ula_spectrum / 6C001E-7 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 129 | ula_spectrum / 6C001E-5 / 6C001E-6 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 130 | ula_spectrum / 5C102E / 5C112E | NOT CHECKED | Not completed in this pass; no conclusion. |
| 132 | ay8912 / YM2149 on a 28-pin adapter | NOT CHECKED | Not completed in this pass; no conclusion. |
| 133 | rom_ts2068_exrom / 2764 EPROM (after board rework) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 135 | vdp9918 / TMS9928A / TMS9929A | WRONG | Literal pin-compatible claim is false for a 9918A to 9928A/9929A: pins 35/36/38 change functions. TI VDP Data Manual secs. 3.7.1/3.7.2 pp. 3-9..3-11. Note acknowledges required video changes, so adapter/rewiring classification is appropriate. |
| 136 | vdp9918 / TMS9118 / TMS9128 / TMS9129 | UNVERIFIABLE | dnotq.io F18A cited page failed certificate validation; web search recovered only references, not both TI family datasheets. No checked manufacturer pinouts for TMS9118/9128/9129; replacement not established. |
| 138 | psg76489 / TMS9919 = SN94624N | NOT CHECKED | Not completed in this pass; no conclusion. |
| 139 | psg76489 / SN76494N | NOT CHECKED | Not completed in this pass; no conclusion. |
| 140 | psg76489 / SN76489AN | NOT CHECKED | Not completed in this pass; no conclusion. |
| 141 | tms9904 / SN74LS362 / TIM9904A | NOT CHECKED | Not completed in this pass; no conclusion. |
| 142 | romconsole / TMS2532 EPROM | NOT CHECKED | Not completed in this pass; no conclusion. |
| 143 | sram6810 / MCM6810P / NTE6810 / ECG6810 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 145 | cpu6809e / MC68A09E | NOT CHECKED | Not completed in this pass; no conclusion. |
| 146 | cpu6809e / MC68B09E | NOT CHECKED | Not completed in this pass; no conclusion. |
| 147 | cpu6809e / Hitachi HD63B09E / HD63C09E (6309) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 149 | vdg6847 / MC6847P from another CoCo or MC-10 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 150 | vdg6847 / MC6847T1 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 152 | sam6883 / SN74LS783 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 153 | sam6883 / SN74LS785 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 154 | gime-tcc1014 / TCC1014 GIME from another CoCo 3 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 155 | cpu6803 / HD6803P (Hitachi) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 156 | sram2102 / 2102A, 2102AL (any speed grade) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 157 | cg-mcm6670 / MCM6674 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 158 | fdc1771 / FD1771A-01 or FD1771B-01 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 159 | fdc1771 / Percom Doubler (with the original 1771) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 160 | fdc1793 / FD1797 | CONFIRMED | Western Digital FD179X-02 May 1980 datasheet p. 1 covers both parts: 1793/1797 true data bus, 1791/1795 inverted; pin 25 RG for 1791/3 versus SSO for 1795/7. Conditional note for 1797 and adapter need for inverted-bus parts match. |
| 161 | fdc1793 / FD1791 / FD1795 | CONFIRMED | Western Digital FD179X-02 May 1980 datasheet p. 1 covers both parts: 1793/1797 true data bus, 1791/1795 inverted; pin 25 RG for 1791/3 versus SSO for 1795/7. Conditional note for 1797 and adapter need for inverted-bus parts match. |
| 162 | fdc1793 / WD2793 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 163 | fdc1793 / WD1773 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 164 | cpu6808 / MC6802 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 165 | cpu6808 / MC68A08 / MC68B08 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 167 | pia6821 / MC6821P / MC68A21P / MC68B21P | NOT CHECKED | Not completed in this pass; no conclusion. |
| 169 | sram6116 / HM6116LP-2 / -3 / -4 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 171 | rom2764 / 27C64 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 173 | rom27128 / 27C128 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 174 | rom27128 / AT27C256R | NOT CHECKED | Not completed in this pass; no conclusion. |
| 177 | acia6850 / MC6850P / MC68A50P / MC68B50P | NOT CHECKED | Not completed in this pass; no conclusion. |
| 179 | tl851 / TL851CN | NOT CHECKED | Not completed in this pass; no conclusion. |
| 180 | tl852 / TL852CN | NOT CHECKED | Not completed in this pass; no conclusion. |
| 181 | msm5832 / MSM5832RS (new old stock) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 182 | sc02 / SSI 263A / SSI 263AP (new old stock) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 184 | cpu8088 / 8088-2 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 185 | cpu8088 / NEC V20 (uPD70108) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 186 | cpu8088 / Harris (Intersil) 80C88 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 187 | clk8284 / 8284A-1 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 188 | clk8284 / 82C84A (Intersil) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 189 | bus8288 / 82C88 (Intersil) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 190 | pic8259 / 8259A-2 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 191 | pic8259 / 82C59A (Intersil) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 192 | pit8253 / 8254 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 193 | pit8253 / 82C54 (Intersil) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 195 | ppi8255 / 8255A | NOT CHECKED | Not completed in this pass; no conclusion. |
| 196 | ppi8255 / 82C55A (Intersil) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 197 | dma8237 / 8237A-4 or 8237A | NOT CHECKED | Not completed in this pass; no conclusion. |
| 198 | dma8237 / 82C37A-5 (Intersil) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 199 | fpu8087 / 8087, 8087-2 or 8087-1 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 201 | crtc6845 / HD46505R (Hitachi) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 202 | crtc6845 / R6545-1 (Rockwell) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 203 | crtc6845 / HD6845S (Hitachi) or UM6845 (UMC) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 204 | crtc6845 / UM6845R (UMC) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 205 | crtc6845 / MC6845 (Motorola) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 206 | crtc6845 / HD6345 (Hitachi CRTC-II) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 207 | dram41256 / HM50256, TMS4256 and other 41256s | NOT CHECKED | Not completed in this pass; no conclusion. |
| 208 | dram41256 / 41256 on an IBM 5160 64-256KB board | NOT CHECKED | Not completed in this pass; no conclusion. |
| 209 | ga40007 / Amstrad 40008 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 211 | rom23256 / 27256 / 27C256 EPROM | NOT CHECKED | Not completed in this pass; no conclusion. |
| 212 | fdc765 / Intel 8272A / UMC UM8272A | NOT CHECKED | Not completed in this pass; no conclusion. |
| 213 | fdc765 / NEC uPD765AC-2 / Zilog Z765A | NOT CHECKED | Not completed in this pass; no conclusion. |
| 214 | vidproc / VLSI VC2069 VIDPROC | NOT CHECKED | Not completed in this pass; no conclusion. |
| 215 | vidproc / VLSI VC2023 VIDPROC | NOT CHECKED | Not completed in this pass; no conclusion. |
| 216 | serproc / VLSI VC2026 SERPROC | NOT CHECKED | Not completed in this pass; no conclusion. |
| 217 | serproc / Ferranti 2C199E, -3 or -7 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 218 | saa5050 / SAA5051 / SAA5052 | NOT CHECKED | Not completed in this pass; no conclusion. |
| 219 | saa5050 / SAA5053 / SAA5054 / SAA5055 | UNVERIFIABLE | Cited Wikipedia SAA5050 variants page is secondary and gives national variants, not both manufacturer pinouts for SAA5053/54/55. Pin-compatible claim not independently established. |
| 220 | fdc8271 / Acorn 1770 Disc Interface Module (kit 0433,050) | NOT CHECKED | Not completed in this pass; no conclusion. |
| 222 | fdc1770 / WD1772 | WRONG | WD handbook p. 48 (PDF 58) confirms step rates and family common pinout. However 1581 manual schematic sheet 3 p. 17 (PDF 20), note 1, explicitly requires J1 installed for WD1770 and removed for WD1772. Shared replacement omits this board condition. |
| 223 | rom-dragon32-basic / 2764 (to 27512) EPROM on a 2364 adapter | NOT CHECKED | Not completed in this pass; no conclusion. |
| 224 | rom-dragon64-basic / 27128 EPROM | UNVERIFIABLE | Dragon forum p=23580 reports EPROM experiments but supplies no HN613128P manufacturer pinout. Both-parts datasheet check cannot establish a Dragon64 mask-ROM-to-27128 drop-in. |
| 226 | mux14529 / HCF4529B (SGS-Thomson) | CONFIRMED | MC14529B Motorola 1978 CMOS databook p. 7-457 (PDF 506) and SGS-Thomson HCF4529B pp. 1-2 agree on pins, supply, strobes, analog mux behavior and truth table. |
| 227 | ay8910 / Yamaha YM2149 (SSG) | CONFIRMED | GI AY8910 manual sec. 2.2-2.3 and Yamaha YM2149 pp. 1-3: matching 40-pin connections; Yamaha pin 26 SEL high/open preserves clock, manufacturer explicitly supports AY8910 pin compatibility. |
| 228 | vdp9938 / Yamaha V9958 (MSX2+ VDP) | WRONG | V9938 p. 114-115 (PDF 127-128) versus V9958 pp. 3-4 (PDF 7-8): pin 21 video output becomes +5 V DAC input; 4, 26, 27 change function. Package/software compatibility does not establish pin compatibility. Must be adapter/rewiring. |
| 229 | ula10017 / HCS 10017 (new old stock) | UNVERIFIABLE | Tindie listing is a sales offer for HCS10017, not a datasheet proving pinout/compatibility across hosts. Source alone cannot satisfy requested both-parts check; no wrong electrical value established. |

## photo-outlines

| Index | Record | Status | Evidence / limitation |
|---:|---|---|---|
| 230 | vic20 /  | CONFIRMED | Opened full assigned photo with all normalized boxes overlaid. Chip markings and visible placement/designators agree; grouped boxes may enclose multiple same-type chips and supporting parts. Plus4 PLA/ROM markings cross-checked against service schematic. No box on a different chip found. |
| 231 | zx81 /  | CONFIRMED | Opened full assigned photo with all normalized boxes overlaid. Chip markings and visible placement/designators agree; grouped boxes may enclose multiple same-type chips and supporting parts. Plus4 PLA/ROM markings cross-checked against service schematic. No box on a different chip found. |
| 232 | atari800xl /  | CONFIRMED | Opened full assigned photo with all normalized boxes overlaid. Chip markings and visible placement/designators agree; grouped boxes may enclose multiple same-type chips and supporting parts. Plus4 PLA/ROM markings cross-checked against service schematic. No box on a different chip found. |
| 233 | plus4 /  | CONFIRMED | Opened full assigned photo with all normalized boxes overlaid. Chip markings and visible placement/designators agree; grouped boxes may enclose multiple same-type chips and supporting parts. Plus4 PLA/ROM markings cross-checked against service schematic. No box on a different chip found. |
| 234 | ts1000 /  | CONFIRMED | Opened full assigned photo with all normalized boxes overlaid. Chip markings and visible placement/designators agree; grouped boxes may enclose multiple same-type chips and supporting parts. Plus4 PLA/ROM markings cross-checked against service schematic. No box on a different chip found. |
| 235 | colecovision /  | CONFIRMED | Opened full assigned photo with all normalized boxes overlaid. Chip markings and visible placement/designators agree; grouped boxes may enclose multiple same-type chips and supporting parts. Plus4 PLA/ROM markings cross-checked against service schematic. No box on a different chip found. |
| 236 | apple2 /  | UNVERIFIABLE | Opened Apple II photo; boxes cover 6502, ROM row and DRAM banks. All three supplied location fields are empty, so the requested designator-level comparison cannot be completed. |
| 237 | spectrum /  | CONFIRMED | Opened full assigned photo with all normalized boxes overlaid. Chip markings and visible placement/designators agree; grouped boxes may enclose multiple same-type chips and supporting parts. Plus4 PLA/ROM markings cross-checked against service schematic. No box on a different chip found. |
| 238 | pc5150 /  | CONFIRMED | Opened full assigned photo with all normalized boxes overlaid. Chip markings and visible placement/designators agree; grouped boxes may enclose multiple same-type chips and supporting parts. Plus4 PLA/ROM markings cross-checked against service schematic. No box on a different chip found. |
| 239 | model1 /  | UNVERIFIABLE | Opened Model I photo and SRAM crop. CPU/RAM/character generator/SRAM boxes match visible components. ROM box contains ribbon-obscured Z33 region plus Z34; cannot establish the hidden ROM contents/designator placement from this image. |
