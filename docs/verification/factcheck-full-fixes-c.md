# Fact-check fixes, round C (2026-10-30)

These fixes answer the fix review in `docs/reviews/factcheck-2026-10-30/fix-review-full/` (fa-*, fb-*, diff-audit and their ledgers).

Out of scope, as instructed:
- The nine "supply pin changed to ground" findings (7501.5, 6502.8, 6502C.8, Z80.11, 8088.40, 6809E.7, PAL40030.20, 65SC12.8, 6808.8). These errors were planted in the review copy only.
- The app hiding verify flags (the TS1000 rails, print cards).
- Electron ULA pin-1 geometry in the app.

Before each change I opened the cited page myself. Most pages came from the reviewers' saved copies under `.tmp/review-fix2/.factcheck-tmp/fixreview2/`. I rendered or extracted each page and read it.

**Changes made without opening the source: none.**

Every brand passes `node scripts/validate-data.mjs` with 0 FAIL. The final full run gives `RESULT: 0 FAIL, 215 WARN`. The extra warnings are the new `conflict` notes.

## Changes

| # | Finding | Record | Old | New | Source page opened |
|---|---|---|---|---|---|
| 1 | fa-commodore log 85 (HIGH) | commodore.js `CBMD_IEC` pin 1, 1581 only | "/SRQ ... passed between the two sockets", expect "+5 V idle with the computer connected (the drive has no pull-up of its own)" | 1581: name FAST CLK (/SRQ); driven by U11 (7407) pin 6 and pulled up by R26 (RP1-13, 1 kΩ); about +5 V idle with no computer. The 1541 and 1571 text is unchanged. | 1581 SM 314982-01 PDF p. 20 (printed 17), schematic 252380 sheet 3, rendered at 150 dpi and cropped |
| 2 | fa-sinclair 032 (HIGH) | sinclair.js spectrum128 firstTen 4 | where "IC34 leg 1" | where "IC33 pin 1 (1488 VCC-)", plus a conflict note that the manual prints IC34 | Spectrum 128 SM PDF 25 (6.1: -12 V to IC33), PDF 33 (2.3 prints IC34 pin 1), PDF 40 (IC33 = 1488, IC34 = 1489); TI MC1488 p. 1 (pin 1 VCC-) |
| 3 | same | sinclair.js 128 fault "RS232, MIDI and keypad dead" | "-12 V at IC34 pin 1" | "-12 V at IC33 pin 1 (the manual prints IC34)" | same as row 2 |
| 4 | fb-1 07:220 / diff-audit H001 (HIGH) | acorn.js master-analogue pins 10 and 13 | system VIA "IC3 pin 15 / pin 14" | Master: "IC8 pin 15 / pin 14" (new `anaPinsFor(true)`). The Model B keeps IC3. | Master drawing 143,000/C sheet 2 (IC8 6522: PB4 pin 14, PB5 pin 15; IC3 is the WD1770); BBC B drawing 103,000/C (IC3 6522) |
| 5 | fb-5 37:216 (HIGH) | heathkit.js adc0831 pin 6 | "read on U215 port B bit 4" | "port B bit 5 (U215 pin 15, $D841; TM printed p. 22)" | HERO Jr TM PDF 24, printed p. 22 |
| 6 | same page | heathkit.js adc0831 pin 7 | "from U215" | "from U215 port B bit 4 (U215 pin 14; TM printed p. 22)" | HERO Jr TM printed p. 22 |
| 7 | fb-5 31:3 (HIGH) | dragon.js firstTen step 6, Dragon 64 | "C23 (1 µF) or R15 (100 kΩ)", source SVC_A | D64: "SW1, C55 (33 µF) or R17 (100 kΩ), diodes D9, D18-D20", source CD41505 sheet 2. The Dragon 32 is unchanged. | CD41505 sheet 2 (d64cpu detail) |
| 8 | fa-commodore log 62 | commodore.js c64 firstTen 6 | "...; a failed load such as the VIC-II can also pull it down." | Clause removed | C64 SM 314001-03 PDF 10 (clock circuits) |
| 9 | fa-commodore log 75 | commodore.js ted7360 pin 10 probe | "... No pulses with clock and power present: suspect the TED." | "Pulses while the TED runs." | TED manual (Plus/4 Technical Docs) PDF 9, pins 9-11 |
| 10 | fa-commodore log 79 | commodore.js c16 firstTen 6 ifNot | "Flat /RAS: the TED. Strobes present..." | "Strobes present..." | same as row 9 |
| 11 | fa-commodore log 65 | commodore.js pet rail +5 V note | "...A shorted chip pulls one of them down and it gets very hot." | Sentence removed | PET schematic 320349 sheet 9 |
| 12 | same | commodore.js pet firstTen 3 ifNot | "Do not run the 4116 DRAM without it. Check VR6..." | "Check VR6 and the -9 V feed." | same as row 11 |
| 13 | fa-commodore log 57 (duplicate-flag item) | commodore.js c64-cass pin 6 | no flag | `verify: true`, to match duplicate pin F | C64 PRG App. I / memory map p. 320 (names only; switch-state OCR unclear) |
| 14 | fa-commodore log 58 | commodore.js vic20-cart pins 19, W, X | no flag | `verify: true` | VIC-20 PRG p. 281-282 (App. J, names only) |
| 15 | fa-commodore log 63 | commodore.js c64 rail +5 V conflict | "...just under this range. Range kept; it is not from a Commodore document either, so treat 4.9 V as normal." | "...on a working board: treat about 4.9 V as normal." | Sams CC17 text (4.91 V at L5) |
| 16 | fa-commodore log 74 | commodore.js c16 rail +9 V note | "...sags toward the bottom of that range...; the data sheet gives no exact cut-off." | "Feeds the 7805 (VR1)." | (deletion of a dangling clause; the range it referred to was already deleted) |
| 17 | fa-commodore log 55 | commodore.js vic20-iec pin 3 | "(the C64 is the controller)" | "(the VIC-20 is the controller)" | VIC-20 PRG p. 281 serial I/O table |
| 18 | fa-atari-coleco 81 | coleco.js colecovision testPoint VDP luma scope | low 2 V, black 2.4 V, high 3.5 V | low 2.2 V, black 2.6 V, high 3.8 V; note "about 2.2 / 2.6 / 3.8-3.9 V (read at scan resolution)" | ColecoVision TM PDF 71 (VII-16), middle U9:36 trace, rendered at 220 dpi. Ground marker on the grid line above the bottom; 1 V/div. |
| 19 | fa-atari-coleco 54 | coleco.js ADAM testPoint and clock "VDP clock" | where "TMS9918A pin 40" | "TMS9928A pin 40" | ADAM TRM PDF 33 (2.2.4, TI 9928) |
| 20 | fa-atari-coleco 66 | coleco.js adam firstTen 4 | "+11.4 to +12.5 V ... -4.90 to -5.40 V on pin 1" | "About +12 V ... about -5 V on pin 1 (the TRM tolerances are for the cable end)", `verify: true` | ADAM TRM PDF 49 (6.3: -5.15 VDC +.25 V; no negative limit printed) |
| 21 | same | coleco.js adam rails +5 V, +12 V L, -5 V (at chip pins) | cable tolerances 4.82-5.15, 11.4-12.5, -4.90 to -5.40 V | nominal "About +5 V / +12 V / -5 V", with the cable tolerance named in the note | same as row 20 |
| 22 | same | coleco.js adam-printer-power pin 4, supply note, firstTen 1 | "-4.90 to -5.40 V" | "about -5.15 V (the TRM prints +0.25 V only)" | same as row 20 |
| 23 | fa-atari-coleco 44 | atari.js 400 scopes "CPU phase 0 in" and "Phase 2" | 1.79 MHz attributed only to Sams CC5 PDF 40 | Note added: Sams prints no frequency; 1.79 MHz comes from the Atari TRN Hardware Manual p. II.20 | Sams CC5 PDF 40 (no 1.79 MHz printed); TRN PDF 441 (p. II.20, "114 machine cycles per TV line (1.79 MHZ)") |
| 24 | fa-sinclair 105 / diff-audit H074-H083 | apple.js Sather labels (6 labels) | Fig. 9.7 p. 9-11; Table 9.1 p. 9-12; Drive Off/On p. 9-14 | 9-10; 9-11; 9-13 | Sather, *Understanding the Apple II*, PDF 240 (footer 9-10), PDF 241 (9-11), PDF 243 (9-13) |
| 25 | fa-apple 5 | apple.js iiRails (4 rails) | "+5.0 V", "+11.8 V", "-5.2 V", "-12.0 V" | "4.85-5.15 V", "11.3-12.3 V", "-4.7 to -5.7 V", "-11 to -13 V", each "(Red Book p. 111)" | Red Book PDF 114 (printed 111): +5.0 ±0.15, +11.8 ±0.5, -12.0 ±1, -5.2 ±0.5 V |
| 26 | same | apple.js apple2 firstTen 2 expect | nominals (Ref. Manual p. 92) | ranges (Red Book p. 111), with the p. 92 nominals | same as row 25 |
| 27 | fa-apple 2 | apple.js mmu2c pin 21, iou2c pin 9 | "(three-state output)" | qualifier removed | IIc TRM tables (OCR); no three-state statement for the IIc |
| 28 | fa-apple 3 | apple.js apple2e firstTen 1 ifNot | overload / loose cable / good-load / regulation diagnosis | Only the three documented causes and the half-second restart | IIe TRM p. 160 (PDF 194) |
| 29 | same | apple.js apple2e testPoint PSU chirp | "a short, an overload or a rail out of range" | "a rail shorted to ground or a rail out of range" | IIe TRM p. 160 |
| 30 | fa-apple 4 | apple.js duodisk rails +12 V, -12 V | "From slot pin 50" / "From slot pin 33" | "Expected to come from slot pin ... but no DuoDisk controller schematic was found to trace it.", `verify: true` | TA37054 DuoDisk cable (DB25 19/20 +12 V, 23 -12 V) |
| 31 | fa-sinclair 081 | ti.js grom0430 replacement TI-GROMmy | no flag | `verify: true` | Tried the cited Wayback page (HTTP 429) and the live AtariAge page (HTTP 403) into `.tmp/fixes3/grommy/`. Neither opened, so I added a flag only. |
| 32 | fb-4 654 | ibm.js clk8284 pin 11 probe | "... Stays LOW with a bad PSU." | Sentence removed | Intel 1983 p. 3-235 (PDF 415), /RES description |
| 33 | fb-4 703 | ibm.js xt-psu pin P9-3 | "-5 V: dynamic RAM bias (4116 boards)." | "-5 V: analog circuits of the diskette adapter phase-lock loop (XT TechRef p. 3-3).", with a conflict note against the PC TechRef p. 1-24 (RAM bias), `verify: true` | XT TechRef p. 3-3 (PDF 68); PC TechRef p. 1-24 text ("-5 Vdc ... dynamic memory bias") |
| 34 | same | ibm.js xt5160 rail -5 V | no note | note citing XT TechRef p. 3-3 (diskette PLL) | XT TechRef p. 3-3 |
| 35 | fb-5 34:163, 34:165 | ibm.js pc5150 and xt5160 firstTen 3 ifNot | "Out of range with only the board connected: HMS step 008 replaces the supply (a shorted board...)" | "Any out of range on the assembled system: HMS step 008 replaces the supply." | HMS MAP 0020 PDF 4-6 (steps 005-008) |
| 36 | fb-5 34:160 | ibm.js xt5160 firstTen 5 | "the 8284A, or a load holding the reset line"; no flag | "reset is not being released (startup step 7)", `verify: true` | minuszerodegrees 5160 startup sequence (downloaded to `.tmp/fixes3/mzd/`) |
| 37 | fb-5 34:158 | ibm.js portable5155 firstTen 6 | same diagnosis | same rewording (already flagged) | same as row 36 |
| 38 | fb-5 34:169 (PCjr) | ibm.js pcjr firstTen 3 ifNot | "...remove the 64KB expansion; then disconnect...; then the system board." | Follows the HMS gates: expansion out and POST, then a new expansion; adapter, drive and fan cables, and modem out; transformer, then power board outputs, then another power board; system board last. Source range now 3-020-2 to 3-020-11. | PCjr HMS PDF 55-66 (3-020-1 to 3-020-11) |
| 39 | fb-1 08:163 | amstrad.js rom23256 pin 22 | "Tied LOW on the CPC boards, so /CS ... alone selects the ROM." | Pulled LOW through 2.2 kΩ (R112 on the 464 and 6128) and wired to ROMDIS; outputs drive only while /CS and /OE are both LOW | CPC464 SM p. 16 (PDF 13), CPC6128 CPU drawing (PDF 17): IC103 pin 22, R112 2.2K, ROM DIS |
| 40 | fb-1 08:66 | amstrad.js ga40007 pin 10 and ga40010 pin 32 probe | "Short LOW pulses, nominally 300 per second" | "LOW pulses, nominally 300 per second with the default PAL CRTC settings", plus the 1.4 µs (Grim) and held-until-accepted (Madram) notes | CPCWiki Gate Array page, interrupt sections |
| 41 | fb-1 08:97, 08:179, 09:46 | amstrad.js cpc464, 664, 6128 firstTen 1 | centre positive, no flag | `verify: true` | CPC464 SM p. 9 flowchart (no polarity given) |
| 42 | fb-5 32:1 | amstrad.js ga40010 replacement AMSGateArray note | "...the author lists possible timing glitches ... and a combinatorial loop." | Struck-through warnings removed; "passed basic testing and the demos the author lists on a real CPC 6128 only" | AMSGateArray README, "Current status" (both paragraphs struck through with `~~`) |
| 43 | fb-1 07:199 | acorn.js master-rgb pin 6 | "+5 V for the monitor lead. A few mA only." | "+5 V for the monitor lead." (the Model B record is unchanged) | Master SM p. 51 (SK9) |
| 44 | fb-1 07:339 | acorn.js master-tube /TUBE | "Tube select: low for $FEE0-$FEFF." | Master: "Tube select (nTUBE): the parasite chip select, active low." | Master SM p. 55 ("nTUBE Parasite chip select"); no FEE0-FEFF found in the Master sources or the AUG text |
| 45 | coordinator request | acorn.js elk_ula summary | "(drawn here with the square chip-carrier layout)" | Says the chip is drawn with pin 1 at the top-left corner, numbered anti-clockwise as the manual states, and that the manual does not give the starting edge. The `pin1` field was not touched. | Electron SM p. 8 (PDF 14), section 6 |
| 46 | same | acorn.js elk_ula chip level | none | `verify: true`; `conflict` that p. 8 does not give the starting edge, so the drawing assumes the left edge | same as row 45 |
| 47 | fb-1 08:53, 08:54 / diff-audit (HERO duty) | heathkit.js hero1 and herojr E clock scope | `duty: '50%'`, note "The 50 % duty is drawn from the equal minimum widths" | duty removed; note "The data sheet gives only minimum high and low widths (450 ns each), not a duty cycle" | MC6802/6808 DS9818-R3 p. 4, bus timing |
| 48 | fb-5 37:89, 37:92, 37:93 | heathkit.js sc01a summary, HERO 1 part | MCX tied to MCRC (R515, C501), CB open, AF tied to AO, "speech accessory schematic" | Only what ET-18 TM printed p. 78 states: P501 pins 5-10, 3, 4, 1-2; pitch control R515 sets the clock; pins 21 and 22 across R503 to U502; Q501 from P501 pin 11 | ET-18 TM PDF 90 (printed 78), PDF 60 (R515 pitch control) |
| 49 | fb-3 476 | msx.js msx1 firstTen 2 ifNot | "...Boards with 4116 VRAM also need -5 V (4116 pin 1)." | Sentence removed | MSX Technical Data Book pp. 32-34 (slot pins 48/50 only; no 4116) |
| 50 | fb-3 RCA rows (low) | msx.js `rca()` pins 1 and 2 (msx1/msx2 video, rf, audio) | no flag | `verify: true` | MSX TDB p. 29 (connector list; no centre or shell drawing) |
| 51 | fb-3 486 | tandy.js coco1 firstTen 5 ifNot | "...Lose -5 V and the RAM fails." | Sentence removed | Sams CC13 PDF 17 troubleshooting (R67, C18, U19 only) |
| 52 | fb-4 814-818 (4 rows) | dragon.js `eScope`, `qScope` notes; E clock testPoints; firstTen 8 expect | rate crystal / 16 with no mode condition | Adds: SLOW mode at reset (crystal / 16); FAST crystal / 8 (1.77725 MHz); address-dependent mode switches (SAM p. 5-333) | MC6883 data sheet p. 5-333 (PDF 11) |
| 53 | fb-5 31:4 | dragon.js Dragon 64 firstTen 8 ifNot | "CPU IC38, then ROMs IC34 and IC37, then the 4164 bank" | "SAM IC39, ROMs IC34 and IC37, CPU IC38, then the 4164 bank" (SAM, ROMs, CPU, RAM) | Dragon Data Service Information PDF 2 (IC15, IC17, IC18, IC19, RAM lines) |
| 54 | fb-5 30:167 | dragon.js Dragon 32 firstTen 4 ifNot | "-5 V pulled towards 0 V: a load on it is shorted (the LM7905 gives only 50 mA)." | "The LM7905 is rated only 50 mA (SA2121)." | SA2121 PSU sheet (REG3 LM7905, -5 V 50 mA max) |
| 55 | fb-5 30:200 | dragon.js Dragon 64 firstTen 5 ifNot | "...or a chip pulling the rail down." | Clause removed | CD41505 sheet 2 |
| 56 | fb-5 38:206 (disagreement) | tandy.js model4 testPoint CPU clock scope | no conflict | `conflict` giving both readings (review 4.05404, scan 4.05504) | Model 4 TRM p. 15 (PDF 31), read at 300 dpi |
| 57 | fb-1 14:275 (disagreement) | amstrad.js `printer()` pin 1 /STROBE | no conflict | `conflict` giving both readings; description unchanged | CPC464 SM p. 16 (PDF 13) at 400 dpi; CPC664 and CPC6128 CPU drawings (PDF 17) at 300 dpi |

## Disagreements with the reviewer (data kept)

1. **CPC printer STROBE, IC110 (fb-1 14:275, rated HIGH).**
   - All three drawings label the STROBE gate IC110 pins 13 and 12 to 11, fed from IC106 pin 19: the CPC464 (cpc464.pdf PDF 13, printed 16), the 664 and the 6128 (each PDF 17).
   - IC110 pins 9 and 10 to 8 is the gate that drives the CRTC EN pin (6845 pin 23).
   - The existing description is correct. I kept it and added a `conflict` that gives both readings.
   - Crops: `.tmp/fixes3/c464-strobe.png`, `c464-ic110b.png`, `c6128-strobe.png`, `c664-strobe.png`.
2. **Model 4 CPU clock (fb-5 38:206).**
   - TRM p. 15 prints "four (4.05504) MHz", not 4.05404, which is 20.2752 MHz / 5. There is no inconsistency.
   - Sams CSCS13 p. 53 shows a 5 V, 0.1 µs waveform on U9 PCLK (pin 13), so the 5 V p-p remark stands.
   - I kept the data and added a `conflict` with both readings.
   - Crop: `.tmp/fixes3/m4-crop.png`.
3. **+2 TR7 (fa-sinclair 038, UNPROVEN).**
   - Rendered at 400 dpi, the cited maker scan s022 PDF 4 clearly shows "2N3904 TR7" with A0 and IORQ at the ULA IORQ input. The data is correct, so no change.
   - Crop: `.tmp/fixes3/p2-tr.png`.
4. **1581 pull-up designator (fa-commodore log 85).**
   - The reviewer named R28 (RP1-15). On sheet 3, the FAST CLK net (through EMI1) meets U11 pin 6 and **R26 (RP1-13), 1 kΩ**. R28 pulls up U11 pin 5 instead.
   - The data uses R26. Crop: `.tmp/fixes3/sm81-crop.png`.

## Not fixed, or fixed only as a log correction

- **Four "removals" that never happened (fb-5 item 8).** These are AMSGateArray (32:1), AT28C64B (37:2), SC-01 Emulator (37:75) and WDC W65C02S (38:205).
  - In `factcheck-full-fixes-b.md`, the dashes in the "new" column are a logging artefact. The intended change was a note edit; each new note is in the data and each replacement was meant to stay.
  - **Correction to the log:** these rows were note rewrites, not removals. The replacements and `kind: 'modern'` are kept on purpose. (The AMSGateArray note was then corrected again in row 42 above.)
  - I did not edit fixes-b, which another agent owns.
- **HERO flag credits (fb-1 item 8, fb-2 item 3).** The log credits flag additions for 25 and 174 HERO pins whose `verify: true` was already in HEAD. Correction to the log: those flags existed before; no data changed. The cited Robinson book pages are restricted (HTTP 401), so the claims stay flagged and unproven.
- **diff-audit, 14 unlogged mirror hunks.** These are log gaps, not data errors. They are not listed again here.
- **Items still UNPROVEN that already carry an honest `verify: true` (left as they are):**
  - coco3 firstTen 5-7; dragon32 firstTen 7 and 8; msx1 firstTen 3; msx2 CPU clock row.
  - pc5150, xt5160 and portable5155 firstTen 2 (Power Good timing).
  - oric atmos-tape pins 1 and 3-6, atmos-tv pin 2.
  - adc0831 pins 3 and 5; cpu65sc12 pin 4; dram4816 pin 1; master-cassette pin 6 (relay rating); master-kbd24 pins 8 and 12; hero1-p404/p405 pins.
  - CPC firstTen 7/8 and monitor pin 4; cpc664-printer pins 15/16 (conflict noted); cpc464-5v pins 1/2.
  - adc0831 pins 6/7 keep `verify: true` even though they are now cited to the TM.
- **Carlsen access (fa-sinclair 106).** A link-availability note only; no data claim to change.
- **TS1000 rail flags and print cards.** These are app rendering issues, handled by another agent.
- **Electron ULA pin-1 geometry in the renderer.** Another agent owns this. I changed only the summary and the chip-level verify/conflict, at the coordinator's request (rows 45-46).

## Round 4

Fixes for the round-3 reviews (`fix-review-round3/log-c.md` finding 3 and 4, `data-audit.md` findings 3 to 5). Log-c findings 1, 2 and 5 and data-audit findings 1 and 2 are planted test errors and were ignored. Sources were downloaded again to `.tmp/fixes4/` and opened before each change.

| # | File and record | Change | Source opened |
|---|---|---|---|
| R4-1 | ibm.js pc5150 and xt5160 firstTen 2 and 3; portable5155 firstTen 2 and 3 | Step 2 (Power Good) missing now follows HMS step 006 to the drive check (steps 012 to 015: unplug one drive at a time; replace the drive whose removal clears the symptom), not "check the rails". Step 3 is now "Rails, only once Power Good passes"; it adds the drive power connectors that step 007 also checks; out of range with Power Good present goes to step 008 (replace the supply); all correct goes to step 009 (speaker). The Portable rows had the same "check the rails" shortcut and were fixed in the same way, because MAP 0020 Power (PC) covers the Portable. `S_HMS_PG` and `S_HMS_V` labels now name the steps used. | HMS 6280087 MAP 0020 Power (PC), PDF pp. 4-6 (printed 0020-2 to 0020-4): 005 Power Good 2.4-5.2 V pins 1-5; 006 No -> 012; 007 board and drive voltages; 008 replace supply; 012-015 drive isolation |
| R4-2 | dragon.js dragon32 firstTen 4, rails, notes, PSU pin 3, step 4 source label | "The LM7905 is rated only 50 mA" and "the -5 V regulator is a 50 mA part" now say the SA2121 output table gives the -5 V board output a 50 mA maximum. Rail notes for +12 V and -5 V now say "board output ... maximum". | SA2121 PSU sheet (D32-SA21204-PSU-MOD.gif): output table O/P -5 V MAX I 50 mA; REG3 LM7905C. No device rating on the sheet |
| R4-3 | acorn.js bbcb-rgb pin 6 | Round-3 H001 removed "A few mA only" from the shared `rgbPins`, which the Model B uses. The Model B connector now restores it with an override; the Master keeps the plain text (Master SM p. 51 gives no limit). | BBC Microcomputer Service Manual (HTML), RGB connector: "+5 volt supply ... should not be used for providing more than a few milliamps" |
| R4-3 | acorn.js bbcb-analogue pins 10 and 13 | Checked, no change: the Model B text keeps IC3 pin 15 (PB5) and IC3 pin 14 (PB4); `anaPinsFor(true)` gives IC8 only to the Master. | Circuit diagram 103,000/C (goffart copy, rendered 400 dpi): IC3 6522 PB5 pin 15, PB4 pin 14 with R67/R66 10K pull-ups; SK6 pin 10 I1, pin 13 I0 |
| R4-3 | acorn.js Electron | Checked, no change: the Electron connectors have their own pin arrays (none uses `rgbPins` or `anaPins`; confirmed by loading the data in node). `elk_ula` `pin1` not touched. | Runtime data check; Electron RGB SK2 text unchanged from its own record |
| R4-4 | log row 44 (page label) | Correction to the log: the "parasite chip select" description of nTUBE is on Master SM p. 27 (5.4 External Second Processor); p. 55 is the PL6 pinout with notTUBE on pin 8. The master-tube record already cites both pages. | Master Series Service Manual PDF p. 27 (printed 27) and p. 55 |
| R4-4 | heathkit.js sc01a summary and datasheets; hero1 symptom "speech too fast or slow"; log row 48 | Correction to the log: R515 is named the pitch control on ET-18 TM printed p. 50 (PDF 60), not only "PDF 60". Data: added the printed p. 50 source to sc01a; the summary and the symptom now say printed p. 78 misprints R515 as R15. The symptom also cited printed p. 79; the R15 text is on printed p. 78 (PDF 90). | ET-18 TM PDF 60 (printed "Page 50": "Pitch control R515"); PDF 90 (printed "Page78": "The setting of R15 controls the clock frequency") |

`node scripts/validate-data.mjs`: 0 FAIL.

## Round 5

Fixes for `docs/reviews/factcheck-2026-10-30/fix-review-round4/data.md`.

| Item | Where | Change and source opened |
|---|---|---|
| R5-1 | ibm.js `portable5155` firstTen steps 3-4 | Step 3 now follows HMS step 007 in full: board rails, then each drive power connector (pin 4 +5 V, pin 1 +12 V, to pins 2 and 3; +4.8 to +5.2 V, +11.5 to +12.6 V); out of range goes to step 008 (replace the supply), all correct goes to the speaker check. The "Display supply" step (not in the HMS at this point) is removed; the +12 V display rail stays in the rails table. New step 4 is HMS steps 009-011: power off, unplug the speaker cable, check continuity; none: replace the speaker; then reconnect and go on to step 016. Source: HMS 6280087 MAP 0020, pp. 0020-3 and 0020-4 (PDF pages 5-6, rendered at 140 dpi). |
| R5-2 | heathkit.js `sc01a` chip; hero1 symptom "Speech stops after one sound, or speech runs too fast or slow" | Added `verify: true` and `conflict` (R515 on ET-18 TM printed p. 50; R15 on printed p. 78) to both. Scans opened: ET-18 TM printed pp. 50 and 78. The chip header renders both flags. The symptom row renderer in `src/app.js` (line 886) does not yet render `verify` or `conflict`; that needs an app.js change (not owned here). |
| R5-3 | dragon.js `dragon32` supply note | Removed "lose -5 V and the RAM fails first" and "a shorted RAM chip pulls it down" (no opened source states either). The note now gives only the SA2121 output table: +5 V 1400 mA, +12 V 250 mA, -5 V 50 mA. Source opened: Dragon 32 PSU diagram SA2121. |

`node scripts/validate-data.mjs`: 0 FAIL, 224 WARN.
