# log-c — Skeptic fact-check ledger

Intent: Retro Bench must state facts proven by cited documents and mark unproven claims CHECK. Review date: 2026-10-30. No product file was changed or committed.

Scope: all57 numbered Changes table rows, both Additional corrections rows, plus explicitly requested +2 TR7 disagreement =60 items. The other3 disagreement bullets duplicate rows1/56/57. Supply-pin test-plant reversions were excluded.

Verdicts assess FINAL data where late edits supersede the patch. Thus row7's original33uF/100k was right but final3.3uF/10k is wrong. Flag-only rows remain UNPROVEN when the underlying claim is unproven; an honest verify flag is not a finding.

| Scope | Items | Correct | Wrong | Unproven |
|---|---:|---:|---:|---:|
| Numbered Changes |57|42|3|12|
| Additional corrections |2|0|2|0|
| Additional unique disagreement |1|1|0|0|
| **Total** |**60**|**43**|**5**|**12**|

## Retrieval and direct observation

All source downloads are under log-c/. Every URL was attempted with curl.exe -L -A Mozilla/5.0. Installed curl fails HTTPS with Schannel AcquireCredentialsHandle / SEC_E_NO_CREDENTIALS. For those failures I independently fetched the exact URL with Python urllib and the same User-Agent. HTTP zimmers/Wayback downloads succeeded directly. This fallback is disclosed; no other reviewer's cached files were used.

fetch.py, manifest.json, ia.json, sources.json, Archive metadata and failures.log retain retrieval details. PDFs were processed with pdftotext -layout. Scan pages were opened as pdftoppm images at110dpi; small/faint schematic details at300-400dpi. Source schematics supplied as GIF were inspected at native resolution with saved crops. Embedded image resolution can remain lower than requested rendering resolution.

Original large Sams CC13/CSCS13 PDFs returned HTTP500; independently downloaded the same Archive item's _text.pdf derivative, extracted, rendered and inspected it. The5160 startup page returned406; rows36/37 are explicitly UNPROVEN.

Scope is cited facts and procedure fidelity, not hardware bench testing or separately owned renderer/print changes. No verdict relies on validate-data success.

## Every item

| Item | Record / claim | Verdict | Source and decision |
|---|---|---|---|
| 1 | 1581 FAST CLK pull-up | CORRECT | 1581.pdf PDF20/printed17, 252380 sheet3: U11 pin6 joins R26 RP1-13 1k and EMI1/FAST CLK. R28 RP1-15 instead joins input pin5. Read at400dpi; 1581-20-detail.png. |
| 2 | Spectrum128 firstTen4 IC33 pin1 | CORRECT | 128.pdf PDF25 section6.1 identifies IC33 as -12V user; PDF40 parts list IC33=1488/IC34=1489; 1488.pdf p1 pin1=VCC-. PDF33 prints conflicting IC34. Final step correctly retains IC33 and verify/conflict. |
| 3 | Spectrum128 RS232/MIDI/keypad fault | WRONG | Final sinclair.js:581 now says +12V at IC34 pin14. 128.pdf PDF33 printed4.4 explicitly specifies IC33 pin14; PDF25 section6.1 and PDF40 parts list agree. Correct positive-rail location: IC33 pin14. Its -12V at IC33 pin1 is correct. No CHECK on the symptom note. |
| 4 | Master analogue IC8 pins15/14 | CORRECT | master-sch.pdf sheet2 drawing143,000/C: IC8 PB5=15/PB4=14 and switch-input routes; master.pdf p52 connector10=I1/13=I0. bbc-sch.pdf 103,000/C confirms ModelB IC3. Read300dpi; VIA crops saved. |
| 5 | ADC0831 DO via U215 PB5 pin15 | CORRECT | herojr.pdf PDF24 printed22 explicitly reads serial ADC output through $D841 U215-15. Text has a conflicting CPU D3 label but physical PIA pin15 is PB5, the changed claim. |
| 6 | ADC0831 CLK via U215 PB4 pin14 | CORRECT | Same TM printed22 explicitly assigns D4 of $D841, U215-14, to U306-7 clock pulses. |
| 7 | Dragon64 reset components | WRONG | Row7 original 33uF/100k is supported. FINAL dragon.js:419 was reversed to3.3uF/10k. d64.gif CD41505 sheet2 labels C55 33uF and R17 100K. SW1 and D9/D18-D20 supported. d64-detail.png. Same defect as Additional1. |
| 8 | Remove failed-VIC clock-loading diagnosis | CORRECT | c64.pdf PDF10 describes clock oscillator/divider/PLL and VIC-derived phase0, not the removed failed-load diagnosis. Unsupported clause is absent. |
| 9 | TED RAS probe becomes activity statement | CORRECT | ted.pdf PDF9 Dynamic RAM Control pins9-11 says TED generates RAS/CAS/MUX. Final functional activity statement is supported; conclusive no-pulses means failed TED is removed. |
| 10 | C16 firstTen6 remove flat-RAS implies TED | CORRECT | Same TED PDF9 proves strobe function, not that flat RAS uniquely identifies TED failure. Removed conclusive diagnosis is absent. |
| 11 | PET +5V overheating sentence removed | CORRECT | pet.gif 320349 sheet9 shows two regulators and distribution, not the removed shorted-chip/regulator-heat conclusion. Sentence absent. |
| 12 | PET -5V step retained VR6/feed check | CORRECT | pet.gif sheet9 shows VR6 7905, -9V input and -5V output TP10. Removed DRAM-operation prohibition is not proved by the sheet. |
| 13 | C64 cassette6 verify flag | UNPROVEN | c64prg.pdf AppI PDF416 printed397 names F/6 SENSE; PDF340 printed321 says switch closed=1. These descriptions do not establish the claimed HIGH-open/LOW-PLAY state reliably. Final6 and duplicateF honestly have verify:true. |
| 14 | VIC20 cartridge19/W/X verify | UNPROVEN | vicprg.pdf PDF297-298 printed281-282 gives IRQ/NMI/RESET names, not bench idle/reset voltages. All3 final contact records have verify:true. |
| 15 | C64 +5V about4.9V normal | CORRECT | cc17.pdf PDF4 Main Board Power Check(D) specifies4.91V at L5; PDF5 drawing labels4.91V. New note is an approximate measured value, not a new acceptance range. |
| 16 | C16 +9V note feeds7805 VR1 | CORRECT | c16.pdf alternate scan PDF11 printed7, 251788 sheet1 traces CN8 through switch to VR1 input. Dangling range clause removed. |
| 17 | VIC20 IEC3 controller name | CORRECT | vicprg.pdf PDF298/printed282 names ATN3. PDF251/printed235 directly says VIC drives ATN low to start commands and other devices listen. VIC-20 is correct. |
| 18 | ColecoVision U9:36 Y levels | CORRECT | cv.pdf PDF71 VII-16 middle trace,1V/div: ground arrow one division above bottom, sync about2.2V, blanking2.6V, picture3.8-3.9V. Read high-resolution cv-middle-detail.png; approximate new values fit. |
| 19 | ADAM VDP clock name9928A | CORRECT | adam.pdf PDF33 section2.2.4 names TI9928; PDF34 refers to TMS9918A/9928A/9929A manual and component-video interface; Appendix4.2 PDF146 CPU schematic shows9928 implementation. Changed chip attribution supported. |
| 20 | ADAM VRAM rails use nominal values | CORRECT | adam.pdf PDF48-49 sections6.1/6.3/6.4 supplies nominal+12/-5 and cable limits. PDF146 CPU schematic supplies4116 nets. Final about-nominals explicitly avoid applying cable-end tolerance at pins; verify remains. |
| 21 | ADAM3 rail rows use nominal values | CORRECT | Same supply sections and Appendix4.1/4.2 PDF143/146 show logic/VRAM supply nets. Nominal+5,+12VL,-5 supported; exact cable tolerance is no longer asserted at chip pins. Schematics rendered400dpi. |
| 22 | ADAM cable -5.15V tolerance note | CORRECT | adam.pdf PDF49 section6.3 Yellow pin4 prints -5.15VDC +.25V with no negative tolerance. Final connector/supply/step1 accurately preserve that limitation. |
| 23 | Atari4001.79MHz attribution | CORRECT | cc5.pdf PDF40 schematic waveforms lack1.79MHz. atari.pdf PDF441 Hardware Manual II.20 explicitly gives114cycles/TV line and1.79MHz. Both final scope notes name this separate source. |
| 24 | Six Sather page-label corrections | CORRECT | sather.pdf PDF240 Figure9.7 footer9-10; PDF241 Table9.1 footer9-11; PDF243 Drive Off/On footer9-13. Opened all3 rendered scan pages; all6 corrected labels agree. |
| 25 | AppleII4 rail ranges | CORRECT | redbook.pdf PDF114 printed111: +5+/-.15,+11.8+/-.5,-5.2+/-.5,-12+/-1. Arithmetic gives4.85-5.15,11.3-12.3,-4.7 to-5.7,-11 to-13V. |
| 26 | AppleII firstTen2 supply ranges | CORRECT | Same Red Book page proves the four new ranges at supply connector, this step's location. Existing verify covers broader diagnostic record. |
| 27 | IIc MMU21/IOU9 qualifier deletion | CORRECT | iic.pdf PDF270-272 printed242-244 Tables11-7/11-8 describe MD7 MMU/IOU flags on data bit7 without the three-state claim. New descriptions match. |
| 28 | IIe supply chirp causes/restart | CORRECT | iie.pdf PDF194 printed160 explicitly lists ground-short, disconnected cable, out-of-range rail and restart after about half-second. Final firstTen1 matches. |
| 29 | IIe PSU chirp testPoint wording | CORRECT | Same printed160 supports retained rail-to-ground short/out-of-range causes for connected supply. Unsupported overload wording removed. |
| 30 | DuoDisk controller-to-slot tracing | UNPROVEN | duo.pdf TA37054 pp1-2 proves DB25 19/20 to DB19 7/8 +12V, DB25 23 to DB19 5 -12V. Does not trace controller to slot50/33. Both final rails explicitly say expected/untraced and have verify:true. |
| 31 | TI-GROMmy replacement verify | UNPROVEN | Wayback source independently opened successfully as grommy.html. Author supports3 internal GROMs,2-chip footprint, MCU programming and8K each. Source contains no FinalGROM comparison supporting the final categorical extra clause. verify:true remains appropriate. |
| 32 | 8284 /RES bad-PSU clause removed | CORRECT | intel.pdf PDF415 printed3-235 defines active-low Schmitt reset input usable with RC timing, not a conclusive PSU-failure indicator. Unsupported sentence absent. |
| 33 | XT P9-3 -5V usage/conflict | CORRECT | xt.pdf PDF68 printed3-3 says diskette PLL analogue circuits; pc.pdf PDF32 printed1-24 says dynamic memory bias for5150. Final wording attributes documents and flags circuit tracing not performed. |
| 34 | XT -5V rail note | CORRECT | xt.pdf PDF68/3-3 directly supports the specifically attributed XT-TechRef statement. |
| 35 | PC/XT blanket PSU replacement | WRONG | hms.pdf PDF4-6 steps005-008:007/008 requires PowerGood2.4-5.2V. Failed005 goes006 to012, isolating drives. Final firstTen2 sends missing-PG users to rails and step3 says ANY out-of-range assembled rail means PSU replacement. Preserve the actual005 gate and012 branch. |
| 36 | XT reset wording and verify | UNPROVEN | Exact cited5160 startup URL attempted with curl then urllib; HTTP406. Generic Intel reset function does not prove board-specific routing/300ms. Final verify:true honestly retains uncertainty. |
| 37 | Portable5155 reset wording | UNPROVEN | Same unavailable source. Board-specific timing and5155 applicability not proven here. Final verify:true remains. |
| 38 | PCjr diagnostic gate sequence | CORRECT | jrhms.pdf PDF56-65 printed3-020-2 through3-020-11: expansion out/POST; new-expansion gate; devices out/POST; transformer; outputs; substitute power board; system board last. New sequence preserves these gates. |
| 39 | CPC ROM /OE R112/ROMDIS | CORRECT | cpc464.pdf PDF13 printed16 and cpc6128.pdf PDF17 printed19-20: IC103 pin22 joins ROMDIS/R1122.2K to0V; CS20 joins ROMEN. OE is overridable, not hard grounded. Small details read400dpi. |
| 40 | CPC interrupt mode qualification | CORRECT | ga.html Interrupts says300Hz with50Hz PAL CRTC settings; pulse-width subsection attributes1.4us to Grim, DI-in-peace attributes held-until-accepted to Madram. Final note accurately attributes both accounts. |
| 41 | CPC centre-positive verify flags | UNPROVEN | cpc464.pdf PDF9 printed9 flowchart asks5V on cable without polarity. It cannot prove centre-positive. All3 final firstTen records carry verify:true. |
| 42 | AMSGateArray status rewrite | CORRECT | amsga.html independently fetched raw README: obsolete warnings both struck through; basic tests/demos listed for6128. amsga-page.html GitHub banner independently says archived Sep21,2024/read-only. |
| 43 | Master RGB6 current qualifier removed | CORRECT | master.pdf p51 SK9 figure gives pin6 +5V without few-mA limit. Final shared rgbPins removes unsupported limit. Log incorrectly says ModelB unchanged: shared array also changes ModelB, but removes rather than adds an unsupported claim. |
| 44 | Master nTUBE description | CORRECT | master.pdf p55 names PL6 pin8 notTUBE; p27 explicitly calls nTUBE parasite chip select. Active-low notation supported. Removed Master address-range assertion absent. |
| 45 | Electron ULA orientation summary | UNPROVEN | electron.pdf PDF14 printed8 section6 gives top-left pin1 and anti-clockwise numbering, not starting edge/pin2 position. Final text explicitly says drawing orientation unverified. |
| 46 | Electron ULA verify/conflict | UNPROVEN | Same starting-edge source gap. Final chip-level verify:true/conflict honestly covers assumed left edge. Renderer geometry excluded by scope. |
| 47 | HERO E clocks duty deletion | CORRECT | 6808.pdf p4 gives450ns minimum low/high at1MHz, not fixed50% duty. It also gives maxima: note's ONLY minimum wording is imprecise, but no fixed duty follows. Duty deletion is warranted. |
| 48 | HERO1 SC-01 wiring summary | CORRECT | hero1.pdf PDF90 printed78 gives P5015-10/code,3/strobe,4/request,1-2/inflection, audio21/22 viaR503/U502 and Q501/P50111 power. Printed78's R15 typo is resolved by PDF60 printed50 explicitly naming pitchR515. |
| 49 | MSX firstTen2 remove4116/-5 claim | CORRECT | msx.pdf PDF35-37 printed32-34 proves slot48+12/50-12 and slot power capacities, not a4116/-5 requirement. Unsupported extra sentence absent. |
| 50 | MSX RCA2 contact flags | UNPROVEN | msx.pdf PDF32 printed29 section1.4.8 lists RCA2-pin video/RF/audio, no centre/shell assignments or numbered contact orientation. Final rca() flags both contacts across both machines. |
| 51 | CoCo1 remove lose-5 RAM-failure claim | CORRECT | cc13.pdf PDF17 troubleshooting listsR67,C18,U19 for missing-5V, not the removed universal failure conclusion. Retained component check supported. |
| 52 | Dragon E/Q SLOW/FAST conditions | CORRECT | sam.pdf PDF11 printed5-333 explicitly SLOW=crystal/16 at reset, FAST=/8, address-dependent switching.14.218/8=1.77725MHz. All4 changed notes/expectations include mode condition. |
| 53 | Dragon64 mapped repair order | UNPROVEN | dragon-svc.pdf p2 proves Dragon32 IC15,IC17,IC18,IC19,RAM-lines order; d64.gif identifies corresponding64 parts. Does not prove tested applicability of that order to64. Final text explicitly calls it32 service order and retains verify:true. |
| 54 | Dragon32 LM7905 rated only50mA | UNPROVEN | d32psu.gif SA2121 names REG3 LM7905L and lists -5V output MAX I50mA. This proves board-output limit, not regulator device rating. Final unflagged wording promotes board budget to component rating. Reword as board output maximum or prove/flag device claim. |
| 55 | Dragon64 +5V diagnosis deletion | CORRECT | d64.gif CD41505 sheet2 shows+5V distribution, not removed chip-pulling-down diagnosis. Unsupported clause absent; final distribution/break check remains. |
| 56 | Model4 fast CPU clock disagreement | CORRECT | m4.pdf PDF31 printed15 clearly4.05504MHz;20.2752/5=4.05504. m4-31-detail.png. sm4.pdf PDF16 printed53 U9 PCLK13 waveform5V/0.1us. Earlier4.05404 reading rejected. |
| 57 | CPC STROBE gate disagreement | CORRECT | All3 independently opened schematics at400dpi: cpc464.pdf PDF13, cpc664.pdf PDF17, cpc6128.pdf PDF17. IC10619 to IC11013/12 to11 toSTROBE. Gate9/10 to8 instead drives CRTC EN23. Strobe crops retained. |
| Additional1 | Dragon64 late C55/R17 reversal | WRONG | CD41505 sheet2 explicitly C55 33uF and R17 100K. Late3.3uF/10k correction is false and implemented. Same root defect as row7; separate mandatory table item. |
| Additional2 | Spectrum128 late IC33 to IC34 reversal | WRONG | Basic-check table PDF33 does printIC34, but PDF25 section6.1, PDF40 parts list and1488.pdf p1 establish IC33 pin1 electrically. Retain conflict, do not reverse. Final step4 stillIC33, so this log also fails to describe final data. |
| Disagreement3 | Spectrum+2 TR7 | CORRECT | Independently downloaded p2.pdf cited+2 Service Manual, PDF4 schematic at400dpi: TR7 marked2N3904, base fromA0, IORQ resistor/output to ULA IORQ input. p2-tr7-detail.png resolves earlier coarse-scan uncertainty. |

## Findings by severity

1. **HIGH — Dragon64 reset components are both ten times too small.** src/data/dragon.js:419 has C55 3.3uF/R17 10kOhm. CD41505 sheet2 explicitly gives **33uF/100kOhm**. Late Additional1 undid the correct original row7 fix. CHECK does not justify retaining values known to be wrong. Evidence: d64.gif and d64-detail.png. Principles: prove-it-works, fix-root-causes.

2. **HIGH — Spectrum128 fault row moves the +12V probe onto the receiver.** src/data/sinclair.js:581 now says IC34 pin14. Manual PDF33/printed4.4 explicitly says **IC33 pin14**, independently consistent with PDF25 section6.1 and PDF40 parts list. The correct electrical -12V location is IC33 pin1. The symptom note has no CHECK. Principles: prove-it-works, fix-root-causes.

3. **HIGH — IBM PSU replacement loses its Power-Good gate.** src/data/ibm.js:1325-1327 and1395-1397 sends missing PowerGood to rails, then says ANY out-of-range assembled rail means replace PSU. HMS MAP0020 PDF4-6 routes failed step005 to006/012 (drive isolation); only passed PowerGood reaches007/008. A load fault can now produce a replacement instruction the cited branch does not authorize. Preserve the actual gate/isolation branch or flag/prove the alternative. Principles: fix-root-causes, prove-it-works.

4. **MEDIUM — Board supply-current limit is asserted as regulator rating.** src/data/dragon.js:409 says LM7905 rated only50mA. SA2121 lists -5V output MAX I50mA and names REG3 LM7905L. State **the board's -5V output is rated50mA maximum**, or prove/flag the device-rating claim. Principle: prove-it-works.

5. **MEDIUM — Late Spectrum verification log instructs a false reversal and does not match final data.** docs/verification/factcheck-full-fixes-c.md Additional corrections says IC33 pin1 changed toIC34 pin1. The basic-check table has that literal reference, but its own power description/parts list plus1488 pinout establish IC33. Final firstTen4 remainsIC33, correctly. Reconcile the late log without applying the false reversal. Principles: prove-it-works, serialize-shared-state-mutations.

No race is inferred: artifacts show divergent log/late/final state, not proof of concurrent editing. No finding is raised merely because an honest CHECK remains.

## Four disputed readings

| Dispute | Source verdict | Saved direct evidence |
|---|---|---|
| CPC STROBE IC110 | **13/12 to11**, all3 models | cpc464-13-detail.png; cpc664-17-strobe.png; cpc6128-17-strobe.png |
| Model4 fast clock | **4.05504MHz** | m4-31-detail.png |
| Spectrum+2 IORQ gating | **TR7,2N3904** | p2-tr7-detail.png |
| 1581 FAST CLK pull-up | **R26,RP1-13,1kOhm**; R28 is on pin5 | 1581-20-detail.png |

## Limits

Startup source406 prevents proving rows36/37; both remain flagged. Contact state/orientation, untraced DuoDisk controller route and Dragon32-to64 diagnostic applicability are explicitly counted rather than silently accepted. Renderer/print cards, Electron actual geometry and supply-pin test plants were outside scope. No hardware/browser execution test was performed; this review checks source facts and documented diagnostic branches.
