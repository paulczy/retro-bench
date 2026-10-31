# Fact-check fixes, agent B, 30 October 2026

Scope: findings 1-23 of `docs/reviews/factcheck-2026-10-30/VERDICT.md` and every WRONG or UNVERIFIABLE ledger row
whose record lives in `src/data/tandy.js`, `dragon.js`, `heathkit.js`, `ibm.js`, `amstrad.js`, `acorn.js`, `msx.js`,
`oric.js` or `schematics.js` (136 rows). Every file ends `node scripts/validate-data.mjs <brand>` with 0 FAIL; the full
run is 0 FAIL, and it adds no warning to these brands compared with HEAD.

Index = ledger file and item index (`rest-*` ledgers use the original `i`). "Old" is the value the reviewer checked.

## Items fixed

| Index | File | Record | Decision | Old | New | Source page |
|---|---|---|---|---|---|---|
| architect#40 | tandy.js | model3 m3-rs232 | UNVERIFIABLE | geo db25 | No change: connector already verify: true and the summary says the gender is not stated | Model III TRM p. 58 |
| architect#59 | tandy.js | coco1 coco-cart | UNVERIFIABLE | geo edge-20x20-odd-even | connector verify: true; summary says the row layout is not drawn | CoCo TRM Table 5 p. 36; no drawing found |
| architect#60 | tandy.js | coco2 coco-cart | UNVERIFIABLE | geo edge-20x20-odd-even | connector verify: true; summary says the row layout is not drawn | CoCo 2 SM Table 3 p. 53; no drawing found |
| architect#61 | tandy.js | mc10 mc10-expansion | UNVERIFIABLE | geo edge-17x17-odd-even | connector verify: true; summary says the row layout is not drawn | MC-10 SM Table 1 p. 15; no drawing found |
| architect#62 | tandy.js | model1 ei-printer | UNVERIFIABLE | geo edge-17x17-odd-even | connector verify: true; summary says the row layout is not drawn | EI Service Manual sheet 2; no drawing found |
| rest-architect#144 | tandy.js | cpu6809e | WRONG (medium) | shared pin text | BS: BA LOW + BS HIGH = interrupt/reset ack, both HIGH = halt ack; /HALT stops at the end of the current instruction; CoCo 3 NC/ground probes moved to the chip summary; /IRQ board text removed | Motorola MC6809E data sheet p. 6 (PDF 6) |
| rest-architect#148 | tandy.js | vdg6847 | WRONG (medium) | shared pin text | Pin 38 generic; SAM pin 9 wiring moved to the summary for CoCo 1/2 and Dragon; MC-10 has no SAM | MC6847 data sheet; MC-10 schematic |
| rest-architect#151 | tandy.js | sam6883 | WRONG (medium) | shared pin text | E: crystal/16 (0.89 MHz) slow rate or crystal/8 (1.79 MHz) fast rate; probe says which | Motorola SN74LS783/MC6883 data sheet p. 5-326 |
| rest-architect#154 | tandy.js | gime-tcc1014 | WRONG (medium) | TCC1014 GIME from another CoCo 3: pin-compatible | Added GIME-Z (CoCo Bits) as a modern replacement; removed "no new replacement" | cocobits.org GIME-Z product page |
| rest-architect#155 | tandy.js | cpu6803 | UNVERIFIABLE | HD6803P (Hitachi): pin-compatible | Note cites Hitachi HD6803 "compatible with MC6803 and MC6803-1"; Hitachi sheet added to datasheets; says no Motorola sheet was opened | Hitachi 1991 8/16-bit Microprocessor Data Book, PDF p. 353 |
| rest-architect#159 | tandy.js | fdc1771 | UNVERIFIABLE | Percom Doubler (with the original 1771): adapter | verify: true; note says the adapter circuit is not in the source | trs-80.org Percom Doubler |
| rest-minimalist-b#760 | tandy.js | model4 m4-printer 17 | WRONG | DATA 7; Printer data bit 7, latched by U94 on a write to port F8H. | Model 4 printer pins use their own table: data latched by U66 (status pins 29/30/32 marked verify); summary adds U67 status buffer | Model 4 TRM 3.1.11, p. 21 (PDF 37) |
| architect#224 | dragon.js | rom-dragon64-basic | UNVERIFIABLE | 27128 EPROM: pin-compatible | No change: replacement already verify: true and says no HN613128P data sheet was found | Dragon Archive forum p=23580 |
| architect#225 | dragon.js | mux14529 | WRONG | shared pin text | Pin text generic per the MC14529B data sheet; Dragon (IC20) and CoCo 1 (U9, R48 to LM339 U14) wiring in the summary; CoCo 1 schematic added | Motorola MC14529B p. 7-457; Tandy 8000073 sheet 2 p. 71; SA2120 sheet 2 |
| architect#63 | heathkit.js | hero2000 hero2000-backplane | UNVERIFIABLE | geo edge-36x36-seq | No change: connector already verify: true and the summary says the side split is assumed | HERO 2000 schematic p. 6 |
| architect#170 | heathkit.js | rom2764 | WRONG | shared pin text | rom2764 role and summary made generic; ColecoVision (WJ4/WJ5), BBC B and HERO 1 labelled in the summary. A separate ColecoVision mask-ROM record is coleco.js (agent A) | Coleco schematic Rev J sheet 9 |
| rest-architect#164 | heathkit.js | cpu6808 | UNVERIFIABLE | MC6802: pin-compatible | Confirmed RE grounded: HERO 1 schematic sheet 2 shows U401 pins 1, 21, 36 to ground; cited in the note, summary and datasheets | ET-18 Schematics sheet 2 of 4 (CPU board) |
| rest-architect#175 | heathkit.js | rtc146818 | WRONG (medium) | shared pin text | Pins 1, 13, 18, 19, 23 generic; HERO Jr and BBC Master wiring in the summary; Master SM added | MC146818A ADI-1026; Master SM pp. 21, 23 |
| rest-architect#180 | heathkit.js | tl852 | UNVERIFIABLE | TL852CN: pin-compatible | Board advice (R358/R359/R361) removed from the note | TI TL852 product page |
| rest-architect#181 | heathkit.js | msm5832 | UNVERIFIABLE | MSM5832RS (new old stock): pin-compatible | verify: true | OKI 1986 data book p. 251 |
| rest-architect#182 | heathkit.js | sc02 | UNVERIFIABLE | SSI 263A / SSI 263AP (new old stock): pin-compatible | verify: true | Silicon Systems 1985 data book p. 1-42 |
| rest-minimalist-c#260 | heathkit.js | cpu6808   7 | WRONG | BA; Bus available: high when the CPU has stopped and freed the bus.; dir out | "HIGH when the CPU has stopped; data outputs off, address outputs stay driven (not three-state)" | Motorola DS9818-R3 p. 7 |
| rest-minimalist-c#764 | heathkit.js | hero1 hero1-p201 10 | UNVERIFIABLE | MOTOR BATT +; Motor battery + (+12 V system).; expect 10-13.9 V DC | "+12 V battery: 13.9 V float on charge; below 10 V the robot flags a low battery"; TM added (pin 3 too) | ET-18 TM printed pp. 72-73 |
| rest-minimalist-c#766 | heathkit.js | hero1 hero1-p401 3 | UNVERIFIABLE | BA0; Buffered address: selects the segment within a digit. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#767 | heathkit.js | hero1 hero1-p401 9 | UNVERIFIABLE | BA6; Buffered address: digit select. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#773 | heathkit.js | hero1 hero1-p403 21 | UNVERIFIABLE | +5V; +5 V power.; expect 4.9-5.1 V DC | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify; expect +5 V DC (range removed) | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#774 | heathkit.js | hero1 hero1-p404 32 | UNVERIFIABLE | /SONAR IRQ; Sonar interrupt input; a low pulse latches a pending request. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#775 | heathkit.js | hero1 hero1-p405 58 | UNVERIFIABLE | DISPLAY POWER; Display power enable from the I/O card, passed through the CPU board to P401 pin 6. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#776 | heathkit.js | hero1 hero1-p405 65 | UNVERIFIABLE | BD; Buffered data bus line (bit order not given). | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#777 | heathkit.js | hero1 hero1-p405 75 | UNVERIFIABLE | D; Unbuffered 6808 data bus line (bit order not given). | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#778 | heathkit.js | hero1 hero1-p406 5 | UNVERIFIABLE | BA5; Buffered address line A5. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#779 | heathkit.js | hero1 hero1-p407 1 | UNVERIFIABLE | RESET; Direct to the 6808 reset line; use it to reset add-on devices. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#780 | heathkit.js | hero1 hero1-p407 5 | UNVERIFIABLE | D2; Unbuffered data bus bit 2. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#781 | heathkit.js | hero1 hero1-p407 7 | UNVERIFIABLE | D4; Unbuffered data bus bit 4. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#782 | heathkit.js | hero1 hero1-p407 8 | UNVERIFIABLE | D5; Unbuffered data bus bit 5. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#783 | heathkit.js | hero1 hero1-p408 3 | UNVERIFIABLE | BA15; Buffered address line A15. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#784 | heathkit.js | hero1 hero1-p408 4 | UNVERIFIABLE | BA14; Buffered address line A14. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#785 | heathkit.js | hero1 hero1-p308 110 | UNVERIFIABLE | NC; Not connected. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#786 | heathkit.js | hero1 hero1-p306 131 | UNVERIFIABLE | D7; Experimental board D7. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#787 | heathkit.js | hero1 hero1-p306 138 | UNVERIFIABLE | D0; Experimental board D0. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#788 | heathkit.js | hero1 hero1-p307 124 | UNVERIFIABLE | HEAD LIMIT CCW; Head limit, counterclockwise. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#789 | heathkit.js | hero1 hero1-p309 103 | UNVERIFIABLE | STEER Φ2; Steering motor phase 2. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#790 | heathkit.js | hero1 hero1-p315 161 | UNVERIFIABLE | EXT/HEAD Φ4; Extend/head motor phase 4. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#791 | heathkit.js | hero1 hero1-p317 143 | UNVERIFIABLE | SPEECH PWR; Speech power control. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#792 | heathkit.js | hero1 hero1-p311 86 | UNVERIFIABLE | +12V; +12 V power.; expect 10-13.9 V DC (battery) | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify; expect: 13.9 V float, below 10 V low battery (ET-18 TM pp. 72-73) | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#793 | heathkit.js | hero1 hero1-p311 88 | UNVERIFIABLE | +12V; +12 V power.; expect 10-13.9 V DC (battery) | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify; expect: 13.9 V float, below 10 V low battery (ET-18 TM pp. 72-73) | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#794 | heathkit.js | hero1 hero1-p312 193 | UNVERIFIABLE | SENSE D5; Sense value bit D5. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#795 | heathkit.js | hero1 hero1-p313 185 | UNVERIFIABLE | /RIGHT; Right, active low. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#796 | heathkit.js | hero1 hero1-p313 187 | UNVERIFIABLE | TRIGGER; Trigger. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#797 | heathkit.js | hero1 hero1-p314 177 | UNVERIFIABLE | P1; Phoneme code P1. | pin verify: true (only source is the restricted HERO 1 book, HTTP 401); connector already verify | HERO 1 Advanced Programming and Interfacing (archive.org, restricted) |
| rest-minimalist-c#803 | heathkit.js | herojr herojr-p201 11 | UNVERIFIABLE | +5V; +5 V Vcc.; expect 4.9-5.1 V DC awake; 0 V in sleep | +5 V DC awake; 0 V in sleep (pin 10 too) | HERO Jr schematics sheets 1, 3-4 |
| rest-minimalist-c#810 | heathkit.js | herojr herojr-p203 2 | UNVERIFIABLE | +12 SWITCHED; +12 V switched (to SW2).; expect 11-14 V DC | +12 V DC (battery) | HERO Jr schematics sheet 1 |
| skeptic#244 | heathkit.js | hero1 | WRONG | About 25-27 V DC unregulated, 1.75 A max into discharged batteries; the robot regulates it to a 13.9 V float | Output: 27 V max / 1.75 A max; about 27 V near full charge, as low as 14 V into discharged batteries; 13.9 V float | ET-18 TM printed pp. 8, 72-73 (PDF 10, 84-85) |
| skeptic#247 | heathkit.js | hero1 hero1-charger 3 | WRONG | LOGIC CHG OUT; Logic charge regulator output, from power supply board P202 pin 15.; expect About 13.9 V DC with the charger on | "13.9 V float once the batteries are near full; lower while the charger is in current limit" | ET-18 TM printed pp. 72-73 |
| skeptic#249 | heathkit.js | hero1 hero1-charger 5 | WRONG | MOTOR CHG OUT; Motor charge regulator output, from P202 pin 22.; expect About 13.9 V DC with the charger on | As pin 3 | ET-18 TM printed pp. 72-73 |
| skeptic#252 | heathkit.js | hero1 hero1-charger 8 | WRONG | CHG IN (LOGIC); Charger + to logic regulator U201 input (P202 pin 14). The plug joins 8 and 9.; expect +25 to +27 V DC with the charger on | "About 27 V near full charge; as little as 14 V into nearly discharged batteries" (also P202 pins 14, 23) | ET-18 TM printed pp. 72-73 |
| skeptic#253 | heathkit.js | hero1 hero1-charger 9 | WRONG | CHG IN (MOTOR); Charger + to motor regulator U204 input (P202 pin 23).; expect +25 to +27 V DC with the charger on | As pin 8 | ET-18 TM printed pp. 72-73 |
| architect#66 | ibm.js | pcjr jr-cart | UNVERIFIABLE | geo edge-18x18-ab | Summary explains the layout from the "Top of Cartridge" figure; connector verify: true | PCjr TechRef p. 2-117 (PDF 143) |
| architect#67 | ibm.js | pcjr jr-io | UNVERIFIABLE | geo edge-30x30-ab | Summary says no connector view exists; connector verify: true | PCjr TechRef p. 2-22 (PDF 48) |
| architect#194 | ibm.js | ppi8255 | WRONG | shared pin text | All port pins generic (dir bidir, no $60 labels); IBM 5150/5160/5155, PCjr, CPC and MSX port maps in the summary | IBM PC TechRef p. 1-12; CPC6128 SM pp. 19-20; MSX TDB |
| rest-architect#185 | ibm.js | cpu8088 | UNVERIFIABLE | NEC V20 (uPD70108): pin-compatible | verify: true | minuszerodegrees V20 problems |
| rest-architect#190 | ibm.js | pic8259 | UNVERIFIABLE | 8259A-2: pin-compatible | Note: faster timing grade, same pins, no CPU clock named; verify: true | Intel 8259A data sheet |
| rest-architect#196 | ibm.js | ppi8255 | WRONG (medium) | 82C55A (Intersil): pin-compatible | Bus hold: port A holds either level; ports B and C hold HIGH | Intersil 82C55A data sheet p. 3 |
| rest-architect#199 | ibm.js | fpu8087 | UNVERIFIABLE | 8087, 8087-2 or 8087-1: pin-compatible | verify: true | minuszerodegrees 8087 page |
| rest-architect#200 | ibm.js | crtc6845 | WRONG (low) | shared pin text | Pin 21 "Character clock input"; pin 39 probe generic; IBM clock and MDA/CGA rates moved to the summary; role generic | Motorola 6845 pp. 8-9 |
| rest-architect#203 | ibm.js | crtc6845 | UNVERIFIABLE | HD6845S (Hitachi) or UM6845 (UMC): pin-compatible | verify: true | CPCWiki CRTC (archived, blocked) |
| rest-architect#204 | ibm.js | crtc6845 | UNVERIFIABLE | UM6845R (UMC): pin-compatible | verify: true | CPCWiki CRTC (archived, blocked) |
| rest-architect#208 | ibm.js | dram41256 | WRONG (medium) | 41256 on an IBM 5160 64-256KB board: adapter | Note adds 74LS158 at U84, banks moved, SW1-3/4 off, remove overlapping memory cards; source changed to the procedure | Upgrading and Repairing PCs pp. 521-523 (minuszerodegrees PDF) |
| rest-minimalist-c#302 | ibm.js | bus8288   1 | UNVERIFIABLE | IOB; I/O bus mode strap. HIGH: I/O bus mode. LOW: system bus mode. 5150: tied to GND.; dir in | 5150 clause kept, pin marked verify (no IBM schematic opened) | Intel handbook p. 3-247 |
| rest-minimalist-c#304 | ibm.js | bus8288   15 | UNVERIFIABLE | CEN; Command enable. HIGH enables the commands and DEN; LOW forces them inactive. 5150: driven by /AEN, so DMA cycles turn the 8288 commands | 5150 clause kept, pin marked verify | Intel handbook p. 3-247 |
| rest-minimalist-c#314 | ibm.js | dma8237   17 | UNVERIFIABLE | DREQ2; DMA request 2. PC: diskette (I/O channel B6).; dir in | "PC: diskette adapter DRQ2 (I/O channel B6)"; IBM source added | IBM PC TechRef p. 1-18 (PDF 26) and p. 1-178 |
| rest-minimalist-c#855 | ibm.js | portable5155 p-psu P9-5 | UNVERIFIABLE | +5 V; +5 V logic supply.; expect 4.80 to 5.25 V | +5 V (5155 uses nominal values on every P8/P9 rail) | XT TechRef pp. 3-8 to 3-10 |
| rest-minimalist-c#861 | ibm.js | portable5155 p-slot B3 | UNVERIFIABLE | +5 V; +5 V supply.; expect 4.80 to 5.25 V | +5 V (all 5155 slot rails nominal) | XT TechRef p. 1-17 |
| skeptic#267 | ibm.js | pc5150 pc-psu P8-1 | UNVERIFIABLE | POWER GOOD; Power good, TTL. HIGH once all four rails are up; drives the 8284A /RES, so the CPU stays in reset without it.; expect 0 to 0.4  | "2.4 to 5.5 V at least 100 ms later"; same fix in 5150 rails, test point, firstTen, note and 8284 pin 11 | PC TechRef p. 1-27 (100 ms); XT TechRef p. 3-9 (100-500 ms, XT only) |
| skeptic#295 | ibm.js | portable5155 p-psu P8-3 | UNVERIFIABLE | +12 V; +12 V: drive motors, RAM (4116 boards) and the EIA drivers.; expect 11.52 to 12.60 V | +12 V (5155 P8/P9 nominal; XT window not given for the 5155) | XT TechRef pp. 3-8 to 3-10 |
| skeptic#296 | ibm.js | portable5155 p-psu P8-4 | UNVERIFIABLE | -12 V; -12 V: EIA drivers on the serial card.; expect -10.92 to -13.20 V | -12 V (5155 P8/P9 nominal; XT window not given for the 5155) | XT TechRef pp. 3-8 to 3-10 |
| skeptic#301 | ibm.js | portable5155 p-psu P9-3 | UNVERIFIABLE | -5 V; -5 V: RAM bias on 4116 boards and the diskette adapter PLL.; expect -4.60 to -5.50 V | -5 V (5155 P8/P9 nominal; XT window not given for the 5155) | XT TechRef pp. 3-8 to 3-10 |
| skeptic#302 | ibm.js | portable5155 p-psu P9-4 | UNVERIFIABLE | +5 V; +5 V logic supply.; expect 4.80 to 5.25 V | +5 V (5155 P8/P9 nominal; XT window not given for the 5155) | XT TechRef pp. 3-8 to 3-10 |
| skeptic#303 | ibm.js | portable5155 p-psu P9-5 | UNVERIFIABLE | +5 V; +5 V logic supply.; expect 4.80 to 5.25 V | +5 V (5155 P8/P9 nominal; XT window not given for the 5155) | XT TechRef pp. 3-8 to 3-10 |
| skeptic#304 | ibm.js | portable5155 p-psu P9-6 | UNVERIFIABLE | +5 V; +5 V logic supply.; expect 4.80 to 5.25 V | +5 V (5155 P8/P9 nominal; XT window not given for the 5155) | XT TechRef pp. 3-8 to 3-10 |
| skeptic#305 | ibm.js | pcjr | UNVERIFIABLE | Transformer: 17 V AC either side of a centre ground (as printed in the TechRef). Power board: +5 V 3.6 A, +12 V 1.2 A, -6 V 0.025 A | Output: 15.0-30.0 V AC pins 1-3 unplugged (IBM HMS); TechRef labels kept, no centre-tap claim; HMS source added | PCjr HMS p. 3-020-8 (PDF 62); TechRef p. 2-138 |
| skeptic#306 | ibm.js | pcjr jr-power 1 | UNVERIFIABLE | 17 VAC; Transformer AC leg.; expect About 17 V AC to pin 2 | 17 VAC label kept; expect 15.0-30.0 V AC to pin 3, unplugged; verify: true; connector verify: true | PCjr HMS p. 3-020-8 |
| skeptic#307 | ibm.js | pcjr jr-power 2 | UNVERIFIABLE | GND; Transformer centre (ground). | "Ground (TechRef label)"; centre-tap claim removed; verify: true | PCjr TechRef p. 2-138 |
| skeptic#308 | ibm.js | pcjr jr-power 3 | UNVERIFIABLE | 17 VAC; Transformer AC leg.; expect About 17 V AC to pin 2 | As pin 1 | PCjr HMS p. 3-020-8 |
| architect#210 | amstrad.js | rom23256 | WRONG | shared pin text | Pins 20/22/27 generic; CPC wiring labelled in the summary; role made generic | CPC6128 SM CPU diagram pp. 19-20 |
| rest-architect#209 | amstrad.js | ga40007 | UNVERIFIABLE | Amstrad 40008: pin-compatible | verify: true; note says no 40008 sheet was found | CPCWiki Gate Array pin-outs (archived, blocked) |
| rest-architect#211 | amstrad.js | rom23256 | UNVERIFIABLE | 27256 / 27C256 EPROM: pin-compatible | Reclassified adapter: pin 1 VPP must be wired to +5 V; verify: true | Microchip 27C256 DS11001N pp. 1-2 |
| rest-architect#212 | amstrad.js | fdc765 | UNVERIFIABLE | Intel 8272A / UMC UM8272A: pin-compatible | verify: true; note says no UMC sheet was found | CPCWiki 765 FDC (archived) |
| rest-architect#213 | amstrad.js | fdc765 | UNVERIFIABLE | NEC uPD765AC-2 / Zilog Z765A: pin-compatible | verify: true; note says the makers' sheets were not found | CPCWiki 765 FDC (archived) |
| rest-minimalist-c#337 | amstrad.js | pal40030   16 | WRONG | /CAS1; CAS for bank 1 (IC127-134) through R160, 47 ohms.; dir out | /CAS1 to IC119-126 (second 64K); /CAS0 (pin 17) to IC127-134; summary, chipLocations and two symptom notes swapped to match | CPC6128 SM CPU diagram (PDF 17): CAS0 "1ST BANK ONLY", CAS1 "2ND BANK ONLY" |
| rest-minimalist-c#342 | amstrad.js | rom23256   27 | UNVERIFIABLE | A14; Address bit 14: LOW selects the OS half, HIGH the BASIC half.; dir in | "Address bit 14." (OS/BASIC polarity clause removed) | CPC6128 SM IC103 |
| rest-minimalist-c#910 | amstrad.js | cpc664 cpc664-printer 27 | WRONG | NC; Not connected. | CPC664 pin 27 = GND (6128 keeps NC; 464 note corrected) | CPC664 User Instructions ch. 7 p. 41 (PDF 306); CPC6128 ch. 7 p. 41 |
| skeptic#310 | amstrad.js | cpc464 cpc464-5v 1 | UNVERIFIABLE | +5 V; Centre pin. Regulated +5 V from the monitor.; expect +4.75 to +5.25 V DC | +5 V DC nominal; pins 1 and 2 verify: true; 464 summary says centre positive comes from the 664/6128 drawing | CPC464 SM CP001; CPC6128 SM J301 |
| skeptic#311 | amstrad.js | cpc464 cpc464-5v 2 | UNVERIFIABLE | GND; Outer sleeve.; expect 0 V | verify: true (centre/sleeve not in the 464 source) | CPC464 SM CP001 |
| skeptic#313 | amstrad.js | cpc664 cpc664-5v 1 | UNVERIFIABLE | +5 V; Centre pin. Regulated +5 V from the monitor.; expect +4.75 to +5.25 V DC | +5 V DC (range removed) | CPC664 SM PDF 31 |
| skeptic#316 | amstrad.js | cpc6128 cpc6128-5v 1 | UNVERIFIABLE | +5 V; Centre pin. Regulated +5 V from the monitor.; expect +4.75 to +5.25 V DC | +5 V DC (range removed) | CPC6128 SM PDF 29 |
| architect#68 | acorn.js | bbcmaster master-cart | UNVERIFIABLE | geo edge-22x22-ab | Summary says the schematic does not show which face row a is on (connector already verify) | Master schematic 0143,000 sheet 1 |
| architect#219 | acorn.js | saa5050 | UNVERIFIABLE | SAA5053 / SAA5054 / SAA5055: pin-compatible | verify: true | Wikipedia SAA5050 (secondary) |
| architect#221 | acorn.js | fdc1770 | WRONG | shared pin text | INTRQ set HIGH at command completion, held until Status is read or a command written | WD 1984 handbook p. 45 |
| architect#222 | acorn.js | fdc1770 | WRONG | WD1772: pin-compatible | WD1772 note adds 1581 jumper J1 (installed for 1770, removed for 1772) | 1581 SM schematic sheet 3, note 1, p. 17 (PDF 20) |
| rest-architect#214 | acorn.js | vidproc | UNVERIFIABLE | VLSI VC2069 VIDPROC: pin-compatible | verify: true; note says no maker sheet was found | BeebWiki Video ULA |
| rest-architect#215 | acorn.js | vidproc | UNVERIFIABLE | VLSI VC2023 VIDPROC: pin-compatible | Reclassified adapter (needs a patch wire); verify: true | BeebWiki Video ULA |
| rest-architect#216 | acorn.js | serproc | UNVERIFIABLE | VLSI VC2026 SERPROC: pin-compatible | verify: true | BeebWiki Serial ULA |
| rest-architect#217 | acorn.js | serproc | UNVERIFIABLE | Ferranti 2C199E, -3 or -7: pin-compatible | verify: true | BBC SM Oct 1985 p. 41 |
| rest-minimalist-d#945 | acorn.js | bbcb bbcb-psu +5V-2 | WRONG | +5 V; One of three +5 V feeds (red lead), joined on the board.; expect +4.9 to +5.2 V | "One of three +5 V feeds. Most boards join them; some early issue 2 boards have three separate rails, so check all three."; +5 V | retrotechwiki capacitor guide; martin-jones.com |
| rest-minimalist-d#946 | acorn.js | bbcb bbcb-auxpower 4 | UNVERIFIABLE | +12 V; +12 V, 1.25 A (brown wire).; expect +11.4 to +12.6 V | +12 V (pins 3 and 6 also nominal) | BBC SM 3.14, Figure 10 |
| rest-minimalist-d#956 | acorn.js | bbcmaster master-1mhz 4 | UNVERIFIABLE | 1MHzE; The 1 MHz system clock, 50% square wave.; expect 1 MHz square wave | Master: "The 1 MHz system clock." (50% kept for the Model B only) | Master SM p. 54 |
| rest-minimalist-d#959 | acorn.js | bbcmaster master-1mhz 23 | WRONG | D5; Buffered data bus bit 5 (enabled only for FRED and JIM). | Master D0-D7: "PBC EX bus (EDn), shared with the external Tube"; Model B text kept | Master schematic sheet 2; Master SM p. 27 |
| rest-minimalist-d#964 | acorn.js | bbcmaster master-tube 35 | UNVERIFIABLE | +5 V; +5 V for the second processor interface.; expect +4.75 to +5.25 V | +5 V (Tube +5 V pins, Model B and Master) | Master SM p. 55 |
| rest-minimalist-d#965 | acorn.js | bbcmaster master-tube 37 | UNVERIFIABLE | +5 V; +5 V for the second processor interface.; expect +4.75 to +5.25 V | +5 V | Master SM p. 55 |
| rest-minimalist-d#972 | acorn.js | bbcmaster master-battery 2 | UNVERIFIABLE | BAT +; Battery positive to the clock supply (through R23 / Q4 on the drawing).; expect About 3 V (at least 2.6 V at the clock chip, mains of | "About 3 V with the original 3.0 V lithium cell"; Master Reference Manual F.3-2 added | Master Reference Manual Part 1, F.3-2 (PDF 233) |
| rest-minimalist-d#973 | acorn.js | bbcmaster master-psu +5V-3 | UNVERIFIABLE | +5 V; +5 V feed (red wire).; expect +4.9 to +5.2 V | +5 V | Master SM pp. 6-7 |
| skeptic#319 | acorn.js | bbcb bbcb-psu +5V-1 | UNVERIFIABLE | +5 V; One of three +5 V feeds (red lead), joined on the board.; expect +4.9 to +5.2 V | +5 V; desc says commoning depends on board issue | BBC SM 3.14/6.3/6.4 |
| skeptic#321 | acorn.js | bbcb bbcb-psu +5V-2 | UNVERIFIABLE | +5 V; One of three +5 V feeds (red lead), joined on the board.; expect +4.9 to +5.2 V | +5 V; desc says commoning depends on board issue | BBC SM 3.14/6.3/6.4 |
| skeptic#323 | acorn.js | bbcb bbcb-psu +5V-3 | UNVERIFIABLE | +5 V; One of three +5 V feeds (red lead), joined on the board.; expect +4.9 to +5.2 V | +5 V; desc says commoning depends on board issue | BBC SM 3.14/6.3/6.4 |
| skeptic#325 | acorn.js | bbcb bbcb-psu -5V | UNVERIFIABLE | -5 V; -5 V (purple lead; brown on the linear supply). Needed only by cassette, sound, speech and RS423.; expect -4.75 to -5.25 V | -5 V | BBC SM 3.14 |
| skeptic#327 | acorn.js | bbcmaster master-psu +5V-1 | UNVERIFIABLE | +5 V; +5 V feed (red wire).; expect +4.9 to +5.2 V | +5 V | Master SM PDF 6/7/32 |
| skeptic#329 | acorn.js | bbcmaster master-psu +5V-2 | UNVERIFIABLE | +5 V; +5 V feed (red wire).; expect +4.9 to +5.2 V | +5 V | Master SM PDF 6/7/32 |
| skeptic#331 | acorn.js | bbcmaster master-psu +5V-3 | UNVERIFIABLE | +5 V; +5 V feed (red wire).; expect +4.9 to +5.2 V | +5 V | Master SM PDF 6/7/32 |
| skeptic#333 | acorn.js | bbcmaster master-psu -5V | UNVERIFIABLE | -5 V; -5 V (purple wire): RS423 driver, cassette and audio stages.; expect -4.75 to -5.25 V | -5 V | Master SM PDF 6/7/32 |
| architect#228 | msx.js | vdp9938 | WRONG | Yamaha V9958 (MSX2+ VDP): pin-compatible | V9958 reclassified adapter (note already lists pins 4, 8, 21, 26, 27) | V9958 data book pp. 3-4 (PDF 7-8) |
| rest-minimalist-d#1013 | msx.js | msx1 msx1-tape 7 | UNVERIFIABLE | REMOTE -; Motor relay contact (other side). | "Motor control, pairs with pin 6"; relay wording removed from pins and summary; pin 6 expect marked verify | MSX Technical Data Book p. 16 |
| skeptic#358 | msx.js | msx1 msx1-cart 5 | WRONG | RSV; Reserved (the book notes it for 256K ROM). Do not use. | Pin 5 "Reserved for future expansion. Do not use."; 256K note moved to pin 3 /CS12 | MSX Technical Data Book pp. 32-33 |
| skeptic#398 | msx.js | msx1 msx1-cart 45 | UNVERIFIABLE | +5 V; +5 V supply, 300 mA per slot.; expect +4.75 to +5.25 V DC | +5 V DC (range removed) | MSX Technical Data Book pp. 32-34 |
| skeptic#400 | msx.js | msx1 msx1-cart 47 | UNVERIFIABLE | +5 V; +5 V supply.; expect +4.75 to +5.25 V DC | +5 V DC (range removed) | MSX Technical Data Book pp. 32-34 |
| skeptic#401 | msx.js | msx1 msx1-cart 48 | UNVERIFIABLE | +12 V; +12 V supply, 50 mA.; expect +11.4 to +12.6 V DC | +12 V DC (range removed) | MSX Technical Data Book pp. 32-34 |
| skeptic#403 | msx.js | msx1 msx1-cart 50 | UNVERIFIABLE | -12 V; -12 V supply, 50 mA.; expect -11.4 to -12.6 V DC | -12 V DC (range removed) | MSX Technical Data Book pp. 32-34 |
| skeptic#409 | msx.js | msx2 msx2-cart 5 | WRONG | RSV; Reserved (the book notes it for 256K ROM). Do not use. | As msx1 (same factory) | MSX Technical Data Book pp. 32-33 |
| skeptic#449 | msx.js | msx2 msx2-cart 45 | UNVERIFIABLE | +5 V; +5 V supply, 300 mA per slot.; expect +4.75 to +5.25 V DC | +5 V DC (range removed) | MSX Technical Data Book pp. 32-34 |
| skeptic#451 | msx.js | msx2 msx2-cart 47 | UNVERIFIABLE | +5 V; +5 V supply.; expect +4.75 to +5.25 V DC | +5 V DC (range removed) | MSX Technical Data Book pp. 32-34 |
| skeptic#452 | msx.js | msx2 msx2-cart 48 | UNVERIFIABLE | +12 V; +12 V supply, 50 mA.; expect +11.4 to +12.6 V DC | +12 V DC (range removed) | MSX Technical Data Book pp. 32-34 |
| skeptic#454 | msx.js | msx2 msx2-cart 50 | UNVERIFIABLE | -12 V; -12 V supply, 50 mA.; expect -11.4 to -12.6 V DC | -12 V DC (range removed) | MSX Technical Data Book pp. 32-34 |
| architect#69 | oric.js | oric1 oric1-printer | UNVERIFIABLE | geo edge-10x10-odd-even | Oric-1 exp and printer: connector verify: true; summary says the layout is taken from the Atmos drawing | Atmos manual App. 11 p. 284; no Oric-1 drawing found (Oric-1 manual checked) |
| architect#229 | oric.js | ula10017 | UNVERIFIABLE | HCS 10017 (new old stock): pin-compatible | No change: replacement already verify: true | Tindie listing |
| rest-minimalist-d#1030 | oric.js | oric1 oric1-exp 33 | UNVERIFIABLE | +5 V; Computer +5 V rail (the same rail as the DC jack centre pin). Light loads only.; expect +4.95 to +5.05 V DC | +5 V DC (range removed; checklist range is a bench target with ULA/ROM out) | Atmos manual p. 284; Oric repair checklist p. 1 |
| rest-minimalist-d#1035 | oric.js | atmos atmos-exp 4 | WRONG | /RESET; System reset: 6502 /RES (pin 40) and VIA /RES (pin 34).; expect +5 V; low only during power-on reset | Desc adds "also an input"; expect "+5 V; LOW during power-on reset or while a device holds reset" | Oric Service Manual pp. 12-13 |

## Other changes made under the findings

- **Card edges (finding 1, rule 4).** No mirrored edge was found in these files, so no `pin1` or `rowA` changed.
  Checked against the manual's external view and in the app (port 8482): CPC 464/664/6128 expansion (CPC6128 User
  Instructions ch. 7 p. 40, viewed from rear: odd on top, 1 at the right), Model I expansion (TRS-80 TRH Figure 22,
  p. 91), Electron expansion (AN015 Figure 1 and Electron SM silk-screen p. 35), Atmos expansion and printer (Atmos
  manual App. 11 p. 284). Already confirmed by the reviewers: IBM PC and XT slots. Edges with no drawing in any
  source found now carry connector `verify: true` and say so: CoCo 1/2/3 cart, MC-10 expansion, EI J4 and J5, Model
  III I/O bus and printer, Model 4 I/O bus, Dragon 32/64 cart, MSX 1/2 cart (the data book draws the cartridge but
  not the contact faces), Oric-1 expansion and printer, PCjr cartridge and I/O. Already flagged before: EI J2/J3,
  Model 4 printer, Master cartridge, HERO 2000 backplane.
- **Shared-chip pass (findings 9, 21).** Roles that were false for some listing machines made generic: `cpu6809e`,
  `vdg6847`, `sam6883` (Dragons missing), `pia6821`, `sram6116`, `rom27128`, `acia6850`, `ls138` (HERO-only roles),
  `crtc6845` (IBM-only role), `rom23256` (CPC-only role, now labelled in the summary). Unlabelled board designators
  labelled: VIDPROC pin 8 (IC43, Model B), SERPROC pin 15 (R75/C28, Model B). 8284 pin 11 probe on the 5150: "at
  least 100 ms", not "100 to 500 ms".
- **Ranges (findings 11, 23).** Besides the flagged pins, the same unsourced bands were replaced by nominal values
  in the same records: CPC expansion pin 27; Oric keyboard pin 14; BBC Tube +5 V pins (Model B too) and auxiliary
  power pins 3 and 6; every HERO connector `4.9-5.1 V DC` (16 pins), HERO 1 `10-13.9 V DC` (4 pins, now the TM
  float/low-battery text) and HERO Jr `11-14 V DC` (5 pins).
- **Links (finding 14, rule 7).** Mirrors added, originals kept: TRS-80 TRH `_text.pdf` (tandy resources, Model I
  expansion and power, schematics.js); Oric Owner 5 circuit added wherever the archived Defence Force schematic was
  the only circuit source, and the Oric service manual pp. 12-13 for the expansion signals; goffart.co.uk copy of the
  BBC Model B schematic (resource and power sources); Wayback copy of the minuszerodegrees 5160 RAM page.
- **Labels and anchors.** BBC Model B drawing 105,000/C renamed 103,000/C in all 40 places (title block and the 4corn
  index; 105,000 is the Electron); HERO 1 specs printed p. 8; ET-18 charger text printed pp. 72-73; HERO Jr RS-232
  printed p. 24; HERO Jr chassis parts printed p. 41; XT slot diagram printed p. 1-17; HD6309 Error Trapping PDF p. 14.

## Disagreements with the reviewers

- rest-minimalist-d report finding 8 gives the Model B drawing as "103,000/IC". The title block reads **103,000/C**;
  the data now uses that.
- architect #225 gives CoCo 1 R48 as 15 kΩ. On the 8000073 sheet 2 scan the value reads closer to 10K and is not
  legible enough to settle; the data names R48 and the LM339 U14 without a value.
- skeptic #267: agreed for the 5150, but the 500 ms upper bound is in the XT TechRef p. 3-9 (5160 and 5155) and the PC
  TechRef p. 1-84 (expansion unit). The pin text now gives both, and the shared expectation says "at least 100 ms".
- No WRONG value was kept against the reviewer, so no `conflict` notes were added.

## Not fixed or left to others

- CPCWiki links (Wayback HTTP 429; the live site is behind a Cloudflare challenge): no working mirror found. Their
  records (40008, 765 variants, CRTC types, PAL16L8, expansion and printer pages) already have Amstrad manuals as
  primary sources; the replacement rows that rest on CPCWiki alone are now `verify: true`.
- Defence Force wiki pages (ULA, keyboard, repair) are behind HTTP 403/429; no mirror beyond Oric Owner 5, the Oric
  service manual and Mike Brown's ULA guide, which are already cited.
- `bus8288` pins 1 and 15: the 5150 wiring is kept and marked `verify`; the logic diagram was not read.
- Unreviewed connector pins outside power connectors still carry +/-5 % bands (for example BBC user port, MSX joystick,
  CoCo cart pin 9). They were not in the ledgers and were left as they are.
- Rail `expect` bands in `power.rails` and `firstTen` were not reviewed and are unchanged (for example CPC 4.75-5.25 V,
  HERO 1 4.9-5.1 V).
- Owned by agent A: `rom2316` (finding 6) and the TRS-80 wiring that comes off it, a separate ColecoVision mask-ROM
  record (finding 4), `via6522`, `rom23128`, `vdp9918`, `kbd3600`, `mmu344`, TI items.
