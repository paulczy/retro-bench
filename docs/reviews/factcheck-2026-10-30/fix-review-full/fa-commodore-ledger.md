# fa-commodore: adversarial fix review

Reviewed 2026-10-30. Decision: **BLOCK COMMIT**. Two high-severity factual regressions remain.

| Items | CORRECT | WRONG | UNPROVEN |
|---:|---:|---:|---:|
| 95 | 84 | 4 | 7 |

## Counting and meaning

Scope is 94 table rows at factcheck-full-fixes-a.md lines 27-120, plus the one additional fa-commodore row (7501 pin 5). Each composite log row counts once; every named subrecord was considered. CORRECT on a verify-only row means the uncertainty flag/removal is honest, **not that the retained underlying claims have become proven**. The application renders pin/connector/firstTen/clock/replacement CHECK flags; it does not render such flags on rails or scope objects.

Compared HEAD and working copies as both raw diff and evaluated JavaScript objects. The evaluation isolated RCS.add and wrote snapshots under this review directory; no application/data files were changed. Raw evidence: [diff](fa-commodore/diff.txt), [old snapshot](fa-commodore/old-data.json), [new snapshot](fa-commodore/data.json), [primitive diff](fa-commodore/runtime-diff.json), [download manifest](fa-commodore/manifest.json).

All document downloads were first attempted with curl -L -A Mozilla/5.0 into fa-commodore/. This machine curl Schannel failed on HTTPS with SEC_E_NO_CREDENTIALS; failed HTTPS downloads were retried with Python urllib, preserving the failures in manifest.json. PDFs were extracted with pdftotext -layout; scanned evidence pages were rendered with pdftoppm -f N -l N -r 110 -png and viewed directly. ZIP chip sheets were extracted and viewed. Carlsen live text returned 406 locally; accessible text was opened via web, with search used for blocked PET/SID pages. Inaccessible sources were not treated as proof. Source numbering refers to original locally downloaded artifacts below; extra-1 through extra-3 are follow-up project sources.

## Per-item decisions

### log line 27: 01:35, 01:36 — vic20 clocks Φ2 out / Φ1 out

**CORRECT**. Before: rates from the 6502 sheet. New: `verify: true`.

Both VIC20 output-clock rows actually gain verify:true. Maker p.4 proves phase relationship, not installed board rate or destinations. Honest limitation; qualification needed, frequencies remain unproven.

Sources opened: [S001](#s001).

### log line 28: 01:37-41 — pet / c1541 / c1571 / c1581 clocks Φ1 (and Φ2) out

**CORRECT**. Before: rates from the 6502 sheet. New: `verify: true`.

PET phi1, 1541 phi1, 1571 phi1/phi2 and 1581 phi1 all carry verify:true in evaluated data. General timing diagram cannot establish their board rates/wiring. Honest qualification needed; this does not certify those retained numbers.

Sources opened: [S001](#s001).

### log line 29: 03:0 — sid6581 replacement FPGASID

**CORRECT**. Before: "dearer than single-chip clones". New: replaces the 6581 and 8580; can act as two SIDs for stereo.

FPGASID maker specifications explicitly cover 6581/8580 and two SIDs for stereo. Price comparison disappears. New wording is proven; price claim was not supported by this source.

Sources opened: [S003](#s003), [Sextra-1](#sextra-1).

### log line 30: 03:37 — rom2364 pin 20

**CORRECT**. Before: 2764 adapter sentence. New: removed.

2364 sheet 1 identifies mask-programmed CS/CS-bar at pin20. The 2764 adapter clause is gone. Remaining wording matches. Removal is conservative; the maker sheet alone does not prove the adapter comparison.

Sources opened: [S005](#s005).

### log line 31: 03:42 — cpu6510 pin 2 RDY probe

**CORRECT**. Before: HIGH. New: normally HIGH with LOW periods during VIC-II bus steals; stuck LOW = frozen.

C64 PRG printed449 (PDF468) and Bauer 2.3 explicitly give BA normally high, low for VIC phase2 accesses, wired to RDY. New probe now admits badlines and sprites. Needed: steady HIGH excluded normal operation.

Sources opened: [S021](#s021), [S072](#s072).

### log line 32: 03:70 — cpu6510 pin 38 probe

**CORRECT**. Before: toggles on a running machine. New: changes level as the program reads and writes.

6510 sheet3 signal description defines HIGH read, LOW write. New statement is conditional on reads/writes and no longer requires perpetual toggling. Sensible qualification, rather than a new timing specification.

Sources opened: [S006](#s006).

### log line 33: 03:87 — pia6520 pin 18 CB1

**CORRECT**. Before: bidir. New: in: port B handshake / interrupt input.

MCS6520 sheet2 CA1/CB1 table identifies input transitions selected by CR bits1/0; sheet3 lists CB1 among inputs. Pin18 input correction is necessary.

Sources opened: [S007](#s007).

### log line 34: 03:102, 03:135, 03:140 — pia6520 / via6522 pin 34, crtc6545 pin 2 probe

**CORRECT**. Before: LOW at power-up, then HIGH. New: HIGH while running; LOW resets.

MCS6520 pin34 and MCS6522 reset input; 6545 sheet6 explicitly stops/clears scan counters while reset is LOW and starts scanning on HIGH. New generic running/reset wording is valid. Removed machine-specific power-up sequence was not established for every host.

Sources opened: [S007](#s007), [S008](#s008), [S010](#s010).

### log line 35: 04:15 — cpu7501 pin 23 GATE

**CORRECT**. Before: until /RAS falls. New: until /RAS goes LOW to HIGH; usually driven by TED MUX.

TED PDF14 states RAS low-to-high holdoff; PDF16 explicitly says GATE normally connects to MUX. New edge and usual wiring match. Needed: old falling-edge account was opposite to source.

Sources opened: [S050](#s050).

### log line 36: 04:32 — cpu7501 pin 40 probe

**CORRECT**. Before: ~0.3 s. New: briefly.

Exact 0.3s is gone from cpu7501 pin40. TED PDF15-16 defines active-low reset/minimum clocks, and C16 schematic sheet2 supplies the board reset circuit. No exact new duration asserted. Needed to remove unsupported precision.

Sources opened: [S050](#s050), [S079](#s079).

### log line 37: 04:46 — cia8520 pin 19 TOD

**CORRECT**. Before: WD1770/1772 strap. New: `verify: true`.

8520 TOD pin19 now has verify:true; 1581 sheet3 actually shows J1/R5 strap, but identifying its firmware purpose is not proven merely by a schematic. Honest qualification, not proof of DOS behavior.

Sources opened: [S070](#s070).

### log line 38: 04:57 — cia8520 pin 34 /RES

**CORRECT**. Before: clears all registers. New: reset values: ports input, timer latches all ones, control registers zero.

8520 datasheet PDF5 section1.3.7 says input ports, zero port/control registers, all-ones timer latches, other registers zero. New content matches. Needed: clear-all missed timer latches. Fix-log p.7 is wrong; reset description is PDF5.

Sources opened: [S015](#s015).

### log line 39: 04:62 — vic20 clock two-phase oscillator (UE2 74S02)

**CORRECT**. Before: designators. New: `verify: true`.

VIC20 two-phase oscillator row actually gains verify:true. Version E names parts differently from the UE2 assertion. Honest flag for board/designator mismatch; not a certification of UE2.

Sources opened: [S057](#s057).

### log line 40: 04:65, 04:66 — c128-rgbi pins 4, 5

**CORRECT**. Before: TTL 0 / +5 V. New: TTL levels.

C128 PRG chapter16 RGBI electrical table labels green/blue TTL. New TTL levels does not require outputs to reach an exact 5V. Needed to remove an unwarranted rail-to-rail level claim.

Sources opened: [S019](#s019).

### log line 41: 04:68, 04:69 — c128-rgbi pins 8, 9

**CORRECT**. Before: 15.7 kHz; 50/60 Hz. New: line / frame rate set by the VDC registers.

C128 PRG chapter11 VDC register table lists horizontal total and vertical total/adjust; chapter12 table12-6 names sync outputs. New configurable line/frame-rate wording follows. Fixed rates were too broad for a programmable VDC.

Sources opened: [S019](#s019).

### log line 42: 04:70, 04:73, 05:280, 05:282 — c128-video / c16-video pins 1, 4

**CORRECT**. Before: 1 V p-p into 75 Ω. New: removed.

C128 table12-5 and C16 schematic sheet1 identify luma/composite but do not specify the removed 1Vpp/75ohm acceptance condition. All four expectations really disappear. Honest removal needed for the cited-source scope.

Sources opened: [S019](#s019), [S079](#s079).

### log line 43: 04:75 — c128-video pin 8

**CORRECT**. Before: NC. New: +5 V through FB13, with `conflict` (PRG says NC); summary and source added.

Rendered C128 PDF74, sheet3 Rev6, CN8 pin8 is fed from +5V through FB13. PRG printed397/PDF407 says NC. New name, expectation, summary and conflict describe this discrepancy explicitly. Necessary correction.

Sources opened: [S035](#s035), [S019](#s019).

### log line 44: 04:83, 04:151, 04:258, 04:323, 05:11, 05:75 — c128-user 2, c128-ctrl 7, c64-user 2, c64-ctrl 7, vic20-user 2, vic20-ctrl 7

**CORRECT**. Before: +4.75 to +5.25 V. New: +5 V.

All six runtime connector expectations now say +5V. C128 tables12-4/12-8, C64 appendixI, VIC20 appendixJ label nominal +5V. Those pin tables do not supply the deleted tolerance. Needed to distinguish nominal from acceptance range.

Sources opened: [S019](#s019), [S021](#s021), [S034](#s034).

### log line 45: 04:88, 04:262 — c128-user / c64-user pin 7 SP2

**CORRECT**. Before: CIA2. New: kept, with `conflict` (PRG table says CIA #1; schematics CIA2).

C128 PRG printed395 and C64 printed360 both actually say CIA1 for SP2; Rev6 sheet1 wires SP2 from CIA2 U4; C64 schematic/Sams maps it to CIA2. Both conflict strings are present. Honest correction of source disagreement.

Sources opened: [S019](#s019), [S021](#s021), [S035](#s035).

### log line 46: 04:111, 04:113, 04:125 — c128-exp pins 8, 11, B

**CORRECT**. Before: C64 ranges only. New: C64-mode and C128-mode (MMU) mappings.

PRG printed461 maps external function ROM at 8000-BFFF and C000-FFFF; SM printed27 calls GAME color-RAM-bank control and EXROM expansion control in C128 mode; PLA printed29 calls ROML/H expansion selects. New mode-qualified descriptions match broadly. Necessary, since the C64 map alone was incomplete.

Sources opened: [S019](#s019), [S035](#s035).

### log line 47: 04:112 — c128-exp pin 9 /EXROM

**CORRECT**. Before: +5 V with no cartridge. New: removed; mode wording.

EXROM no-cartridge voltage expectation is absent; MMU-related control wording agrees with SM printed27 pin46. Deletion is honest: the connector table alone is no loaded-voltage measurement specification.

Sources opened: [S019](#s019), [S035](#s035).

### log line 48: 04:155-163 — c128-cass pins 3, 4, 6, C, F

**CORRECT**. Before: P5, FLAG, P4, voltages. New: neutral; `verify: true`.

C128 cassette 3/4/6/C/F all have verify:true. Table12-7 names functions only; routing was removed from 3/4/6. F still contains PLAY-state language, but is explicitly flagged. Honest qualification needed; none of these flags proves the retained switching levels.

Sources opened: [S019](#s019).

### log line 49: 04:173, 04:202 — vic2 pin 10, sid6581 pin 8

**CORRECT**. Before: from the PLA. New: address decoding.

VIC and SID selects come through decoding; C128 PLA has separate VIC select and decoded SID selection. Changing direct PLA attribution to address decoding avoids assuming one board's path for all users of a chip. Necessary generalization.

Sources opened: [S021](#s021), [S035](#s035).

### log line 50: 04:175 — vic2 pin 12 BA

**CORRECT**. Before: 3 cycles before a badline. New: 3 cycles before VIC second-phase accesses (badline fetches, sprite DMA).

Bauer section2.3 BA explicitly gives three cycles before second-phase character-pointer OR sprite access. Section3.8 confirms sprite bus use. New timing is correctly tied to the access, not the start of an entire badline. Necessary correction.

Sources opened: [S072](#s072).

### log line 51: 04:182 — vic2 pin 21

**CORRECT**. Before: 17.734 MHz PAL. New: PAL pointed at the machine clocks.

VIC pin21 no longer asserts a PAL rate in the common chip text; it points to machine clocks, whose source250469 has PAL oscillator notes. NTSC14.31818 remains supported by PRG. Conservative source qualification, no new numeric claim.

Sources opened: [S021](#s021), [S036](#s036).

### log line 52: 04:215 — sid6581 pin 26 EXT IN

**CORRECT**. Before: unused on a stock C64. New: external audio from audio/video DIN pin 5.

PRG printed396 connector table gives audio input pin5; printed472 describes SID EXTIN pin26 mixing/filtering. C64 schematic joins external audio to pin26. New routing is correct; unused-on-stock-C64 claim was false.

Sources opened: [S021](#s021).

### log line 53: 04:216 — sid6581 pin 27

**CORRECT**. Before: DIN and modulator route. New: to the board audio stage.

SID output pin27 leads to board audio transistor stages (C64 and C128 schematics). New generic description is correct and avoids assuming identical downstream DIN/modulator wiring. Appropriate generalization.

Sources opened: [S021](#s021), [S035](#s035).

### log line 54: 04:217-229, 04:231, 04:232 — cia6526 PA/PB, pins 21, 23

**CORRECT**. Before: C64/C128 wiring, PLA. New: C64 only; address decoding.

All edited CIA PA/PB examples now explicitly say C64, and IRQ/select text is C64-qualified. PRG CIA appendix plus board schematic establish C64 mapping. Does not claim C128/1571 use the same wiring now. Necessary scope qualification.

Sources opened: [S021](#s021).

### log line 55: 04:246-250 — c64-iec pins 1, 3, 4, 5

**WRONG**. Before: +5 V idle, open collector. New: HIGH idle; `verify: true` (identical vic20-iec block edited too).

Flags really exist on both IEC blocks, but the VIC20 pin3 description newly says the C64 is the controller. The VIC20 connector belongs to the VIC20 (VIC20 PRG appendixJ serial port). This is a copy error introduced by the fix. Low; say the computer/VIC20 instead.

Sources opened: [S021](#s021), [S034](#s034).

### log line 56: 04:265, 04:266 — c64-user pins 10, 11

**CORRECT**. Before: 100 mA. New: 50 mA, `conflict` names the appendix 100 mA.

C64 printed360 expressly limits the AC feed to50mA; appendix printed397 says100mA. New50mA and conflict on pin10 preserve the disagreement while choosing the lower limit. Necessary correction, both pins now50mA.

Sources opened: [S021](#s021).

### log line 57: 04:328-337 — c64-cass 3, 6, C, F

**UNPROVEN**. Before: 5-6 V; every key state. New: motor voltage on / 0 V off; LOW with PLAY.

Motor voltage numeric range and FF/REW/REC language disappear. But pin6 still asserts HIGH with no key and LOW with PLAY without verify:true; only duplicate F is flagged. Cited appendixI printed397 only names cassette signals; it does not establish switch states. Partial cleanup, add a real Datasette switch source or flag6 too. Medium.

Sources opened: [S021](#s021).

### log line 58: 05:47, 05:66, 05:67 — vic20-cart 19, W, X

**UNPROVEN**. Before: +5 V idle. New: HIGH idle.

19/W/X now say HIGH rather than +5V. Cited VIC20 appendixJ/PDF297 only lists IRQ/NMI/RESET names and no idle or reset waveform. Removing a number does not prove an idle-state claim. No verify flag is added on these pins. Medium; qualify or cite actual circuit/pull-ups.

Sources opened: [S034](#s034).

### log line 59: 05:74 — vic20-ctrl pin 6

**CORRECT**. Before: VIC pin 37. New: VIC pin 9 (LP).

VIC20 schematic324001 sheet1 visibly connects controller pin6 LIGHT PEN to UB7 LP pin9. Pin37 is an address line. Necessary correction to the actual probe destination.

Sources opened: [S055](#s055).

### log line 60: 05:80, 05:86 — vic20-cass 3, C

**CORRECT**. Before: +9 V unregulated. New: neutral; `verify: true`.

VIC20 cassette3/C are neutral and both flagged. AppendixJ lists MOTOR but not its voltage. Unsupported +9V/unregulated text is gone. Honest qualification needed.

Sources opened: [S034](#s034).

### log line 61: 05:89 — c64 clock C64C clock generator

**CORRECT**. Before: U31 on 250469. New: U20.

250469 RevA labels the8701 U20. New row says U20 rather than U31; output6/8 match the schematic. Necessary designator correction.

Sources opened: [S036](#s036).

### log line 62: 05:98 — c64 firstTen 6

**UNPROVEN**. Before: not the VIC-II. New: a failed load such as the VIC-II can pull it down.

C64 firstTen6 removes exclusive not-the-VIC-II but adds a failed load such as the VIC-II can pull it down. Cited SM PDF10 is a clock-circuit description and does not establish that new fault claim. Plausible electrical inference is not document proof; source it or remove it. Medium.

Sources opened: [S038](#s038).

### log line 63: 05:99 — c64 rail +5 V

**WRONG**. Before: 4.95-5.10 V; shorted chip. New: +5 V; check the brick, then a loading chip (Carlsen).

New nominal +5V is supported and supply-first advice agrees with Carlsen. However the same rail's conflict still says just under this range and Range kept, even though this diff deletes the range. That is now a false description of the displayed value. Low; remove/rewrite stale conflict.

Sources opened: [S021](#s021).

### log line 64: 05:103, 05:104, 05:188 — pet firstTen 8, BΦ2 clock rows

**CORRECT**. Before: PET FAQ, sheets. New: `verify: true`.

PET reset firstTen8 and both buffered-phi2 clock rows really carry verify:true. Sheets show nets, not FAQ reseating advice or all claimed frequencies. Honest qualification; this does not establish those board-general claims.

Sources opened: [S039](#s039), [S040](#s040), [S047](#s047).

### log line 65: 05:110-117 — pet firstTen 2-5, rails

**UNPROVEN**. Before: ranges; 4116 destruction. New: nominal; claims removed; step 5 `verify: true`.

All edited PET rails/steps have nominal values and step5 is flagged. But the unflagged +5V rail still asserts a shorted chip pulls one regulator down and makes it very hot; step3 still says do not run4116 without -5V. Voltage-regulator schematic320349 sheet9 proves nets/nominals, not those diagnosis/damage claims. Cleanup is incomplete. Medium.

Sources opened: [S042](#s042).

### log line 66: 05:140-154 — pet-ieee active LOW

**CORRECT**. Before: no polarity source. New: pins already `verify: true`; IEEE-488 (Wikipedia) added as second source.

IEEE connector control/data pins remain explicitly flagged; added secondary source says negative logic, asserted LOW. Downloaded IEEE-488 article supports polarity but not PET-specific driver behavior. Honest limited additional source; no assertion that all remaining PET details are now verified.

Sources opened: [S044](#s044), [S076](#s076).

### log line 67: 05:163-180 — pet-user 2, 5, 9, 10, B, M

**CORRECT**. Before: TTL / DIAG / CB2. New: `verify: true`.

All six requested PET-user pins2/5/9/10/B/M are flagged. Contact map proves names only, not TTL, DIAG action or VIA sound routing. Honest limitation; previous unsupported electrical/behavior text remains explicitly marked.

Sources opened: [S046](#s046).

### log line 68: 05:182-185 — pet-video 1, 3, 5

**CORRECT**. Before: TTL, 50/60 Hz, 15.6/20 kHz. New: rates removed; `verify: true`.

PET-video1/3/5 are flagged and all fixed frame/line rates are gone. Contact map only names VIDEO/VERT/HORZ. Honest mitigation, no unsupported new rate.

Sources opened: [S045](#s045).

### log line 69: 05:209, 05:219, 05:235, 05:241 — dram4416 pin 5; rom23128 pins 1, 20, 27

**CORRECT**. Before: -. New: `verify: true`.

4416 pin5 and ROM23128 pins1/20/27 all actually have verify:true. C16 schematic/pin-assignment table establishes names but does not certify all cross-maker masking/EPROM/probe assertions. Flags honestly retain that uncertainty.

Sources opened: [S079](#s079).

### log line 70: 05:242-263 — pla82s100 pins 1, 5, 6, 9, 25, 26

**CORRECT**. Before: polarity / function. New: `verify: true`.

PLA pins1/5/6/9/25/26 really gain verify:true. Programmed C64 PLA equations are not a universal raw82S100 programming/polarity datasheet. Honest qualification, particularly for inverted AEC and machine-specific inputs.

Sources opened: [S017](#s017).

### log line 71: 05:279 — c16-cass pin 6 SENSE

**CORRECT**. Before: to the 6529. New: U11 74LS125 pin 9 to pin 8, data bit 2 at $FD10-$FD1F; summary fixed.

C16 schematic251788 sheet1 shows CST SENSE entering U11 pin9, output8 labelled D2, gated by CASSETTE RD FD10-FD1F. Sheet2 shows6529 keyboard path. New route and summary correction are necessary and correct.

Sources opened: [S079](#s079).

### log line 72: 05:283, 06:4 — c16-video / plus4-video pin 5

**CORRECT**. Before: to the sound chip. New: expansion pin 23 EXT AUDIO and the Q3 audio stage; not the TED.

C16 sheet1 shows video audio-in linked to expansion23 EXT AUDIO and Q3 audio mixer, separate from TED sound output33. Plus4 schematic shows same external-audio path; Sams CC9 troubleshooting identifies audio transistorQ3. Old into-sound-chip routing was wrong.

Sources opened: [S079](#s079), [S049](#s049).

### log line 73: 05:294, 05:297-299, 06:127 — Plus/4 c16-joy 8, c16-cass 3/4/6, c16-iec 1

**CORRECT**. Before: C16 routing. New: new P4FIX map: neutral Plus/4 text; c16-iec pin 1 NC on the Plus/4.

Evaluated Plus4 connectors really use P4FIX:3/4/6 cassette and joystick8 descriptions become neutral; IEC1 is NC. Plus4 SM PDF20 CN2 explicitly labels pin1NC, unlike C16's pulled-up pin1. C16-specific summaries remain explicitly labelled as C16 examples. Necessary separation; Plus4 pin overrides are correctly applied.

Sources opened: [S049](#s049), [S052](#s052), [S079](#s079).

### log line 74: 05:301, 05:302 — c16 rails +9 V, +5 V

**UNPROVEN**. Before: TI 7805 claims; 4.9-5.2 V. New: removed; +5 V.

Nominal +5V is correct, and TI numeric input/dropout clause is removed. But +9V note still says sags toward the bottom of that range and data sheet gives no exact cut-off: the range was just deleted. Still unsupported/dangling regulator advice. Low; complete deletion/rewrite.

Sources opened: [S079](#s079), [S100](#s100).

### log line 75: 06:15, 06:18 — ted7360 pins 10, 14 probe

**UNPROVEN**. Before: exclusive diagnoses. New: softened.

TED14 exclusive oscillator diagnosis is gone, but TED10 still says no pulses with clock and power present: suspect the TED. Manual PDF9 defines RAS output, not this diagnostic inference or its necessary conditions. Softening dead to suspect does not source it. Medium.

Sources opened: [S050](#s050).

### log line 76: 06:48 — c16 clock Crystal

**CORRECT**. Before: Y1, Q1/Q2. New: `verify: true`.

C16 Crystal row actually gains verify:true. TED input specification PDF10 gives rate, not board Y1/Q1/Q2 designators. Honest qualification needed for mixed source scope.

Sources opened: [S050](#s050).

### log line 77: 06:50, 06:53 — c16 / plus4 clock CPU (single)

**CORRECT**. Before: PAL 0.884 MHz (p. 35). New: 0.8867 MHz from the pinout, p. 38; note keeps the p. 35 figure.

TED PDF38 pinout explicitly gives PAL886.7kHz. PDF35 says884kHz; both new rows preserve that discrepancy in the note. New0.8867MHz matches the selected pinout and17.734475/20. Necessary correction with honest source conflict.

Sources opened: [S050](#s050).

### log line 78: 06:180 — c16 firstTen 5

**CORRECT**. Before: exclusive TED diagnosis. New: `verify: true`.

C16 firstTen5 is actually flagged; PDF33 proves system clock doubling but not an exclusive TED diagnosis. Honest mitigation of the retained diagnostic and pin-specific assertions.

Sources opened: [S050](#s050).

### log line 79: 06:181 — c16 firstTen 6; 264 test point DRAM strobes

**UNPROVEN**. Before: /CAS continuous. New: /CAS only on DRAM accesses; strobes do not clear the RAM.

Manual PDF3 and32-33 prove RAS-only refresh, so corrected CAS access-only text is right. Yet firstTen6 still says Flat /RAS: the TED unconditionally, without a flag, and its sole source is pin definitions PDF9. This retains the exclusive diagnosis the neighboring TED pin fix tried to soften. Medium; remove/source/qualify.

Sources opened: [S050](#s050).

### log line 80: 06:186 — plus4 rail +5 V

**CORRECT**. Before: 4.9-5.2 V. New: +5 V (PSU drawing 5.2 V).

Plus4 PSU drawing explicitly labels5.2V; board nominal5V follows TED supply specification. New rail exposes both rather than inventing4.9-5.2 tolerance. Appropriate correction.

Sources opened: [S054](#s054).

### log line 81: 06:187 — plus4 rail 9 V AC note

**CORRECT**. Before: only the user port. New: also feeds the BA20 bridge (+9 V unregulated).

Plus4 PDF21 clearly connects both9VAC legs through BA20 to +9V UNREG, and to user port10/11. New note is correct. Old only-user-port description omitted an actual load.

Sources opened: [S049](#s049).

### log line 82: 06:190 — vic20 rail +5 V

**CORRECT**. Before: 4.95-5.10 V; sag = short. New: +5 V; later boards external +5 V; bridge and regulator first (Carlsen).

324001 sheet2 shows bridgeCR4 and LM323 VR1; Carlsen VIC20 text describes external5V on later boards and bridge/regulator/contact failures. New nominal and board distinction are correct. Needed to remove invented tolerance and premature short diagnosis.

Sources opened: [S056](#s056).

### log line 83: 06:194 — c1541 clock bit clock

**CORRECT**. Before: 25-30 zone. New: kept; note records the manual's 15-30 misprint.

1541 SM PDF10 indeed prints15-30, overlapping18-24; user guide track/sector table explicitly gives25-30. New note honestly identifies the service-manual conflict while retaining correct zones. Needed explanatory correction; numerical clock table unchanged.

Sources opened: [S059](#s059), [S024](#s024).

### log line 84: 06:195, 06:197 — c1541 rail +5 V, firstTen 3

**CORRECT**. Before: 4.75-5.25 V. New: +5 V; step `verify: true`.

1541 SM PDF8 describes regulated5V, not the deleted4.75-5.25 acceptance band; firstTen3 now flagged. Rail nominal5V is correct. Flag honestly avoids certifying its diagnostic/source mix.

Sources opened: [S059](#s059).

### log line 85: 06:201, 07:104 — drive IEC pin 1 /SRQ

**WRONG**. Before: 1571 and 1581 fast clock; +5 V idle. New: 1571 only; +5 V idle with the computer connected.

1581 SM PDF20/schematic252380 sheet3 explicitly labels IEC1 FAST CLK, connects it to CIA CNT through U13, and shows +5V pull-up R28 RP1-15 (1k). New shared text suppresses1581 fast-clock use and says the drive has no pull-up of its own. Both contradict the cited circuit. High: restore1581 clock role and make idle expectations drive-specific; no computer is needed for this1581 pull-up.

Sources opened: [S070](#s070).

### log line 86: 07:7-19 — ga325572 pins 7-14, 19, 21, 22

**CORRECT**. Before: -. New: NC pins already `verify: true`; 19, 21, 22 `verify: true`.

325572 unlisted pins7/9/11/13/14 already have verify:true;19/21/22 gain it. pla.txt gives names;251748 shows their external nets, but not every guessed function/polarity. Honest qualification. No new unsupported NC inference was silently presented as proven.

Sources opened: [S061](#s061), [S063](#s063).

### log line 87: 07:68 — ga251828 pin 24 ATN

**CORRECT**. Before: in. New: out, `conflict` names the p. 8 table.

1571 printed7 diagram has arrow out at24ATN; printed8 table says input. Schematic310420 routes24 into the DATA gate. New output plus explicit conflict is correct and needed; the function table alone was misleading.

Sources opened: [S067](#s067), [S068](#s068).

### log line 88: 07:99, 07:100 — c1541 clocks 16 MHz / gate-array CPU clock

**CORRECT**. Before: one pin set. New: names the 40-pin pins and the 1541-II 42-pin U10 pins 23 / 39.

1571 printed8 maps OSC21/23 and CK37/39 for40/42pin versions. 1541-II addendum printed43/PDF7 shows U10 OSC23 and CK39, with discrete crystal logic rather than251829. New variant-qualified rows match. Necessary probe-pin correction.

Sources opened: [S067](#s067), [S060](#s060).

### log line 89: 07:115 — 1571-stepper pin 4

**CORRECT**. Before: -. New: kept; already `verify: true`.

1571-stepper4 remains verify:true and says label partly illegible; parent connector is also flagged. No new diff at that pin is claimed. Honest pre-existing uncertainty; no extra mutation needed.

Sources opened: [S068](#s068).

### log line 90: 07:117 — c1571 rail +5 V note

**CORRECT**. Before: VR201. New: from the supply board.

Supply-board wording removes VR201 dependence (which is Sams naming). Drive block/schematic shows5V supplied through CN1. New generic attribution is correct; removing cross-document designator assumption is conservative.

Sources opened: [S067](#s067).

### log line 91: 07:123 — 1581-iec pin 3 ATN

**CORRECT**. Before: VIA CA1. New: 8520 /FLAG pin 24 and PB7 via U9/U7; CIA IRQ.

1581 sheet3 shows serialATN via U9 to CIA PB7pin17 and via U7 logic to FLAGpin24; IRQpin21 runs to CPU. New text matches and VIA-CA1 routing was wrong. Necessary correction.

Sources opened: [S070](#s070).

### log line 92: 07:168 — c1581 rail +5 V note

**CORRECT**. Before: sag = the brick. New: probably the brick; try a known-good supply (Carlsen).

Carlsen1581 Drive problems explicitly describes loaded5V sag as probably the external pack and suggests substitution. New probably/known-good advice matches; exclusive old attribution was too strong. Schematic confirms SW2 supply path.

Sources opened: [S070](#s070).

### log line 93: 07:170-172, 37:3, 37:8 — c64 / vic20 clocks and c64 firstTen 7

**CORRECT**. Before: pin numbers. New: `verify: true`.

C64 dot/phi0/phi2 clocks and firstTen7, plus targeted VIC20 output-clock row, carry verify:true. Bauer gives functions/frequencies but not every source pin/board routing claim. Honest limitation; flags are not proof of retained pin mapping.

Sources opened: [S072](#s072), [S057](#s057).

### log line 94: 17:7, 17:16, 21:201, 37:4-6 — c128 clocks

**CORRECT**. Before: PAL / pins / 1.02 MHz. New: `verify: true`.

Targeted C128 crystal/dot/system/CPU/Z80 clock rows all carry verify:true in evaluated data. Source mix includes Sams NTSC readings, common8701 notes and generic machine rates, insufficient for every PAL/pin assertion. Honest qualification needed.

Sources opened: [S035](#s035).

### log line 95: 17:8, 17:11, 17:13 — c128 firstTen 4, 7, 1

**CORRECT**. Before: 8580, FAST, crowbar. New: `verify: true`.

C128 firstTen1/4/7 all carry verify:true. Sams CC18 PDF3/25 proves basic voltages and troubleshooting but not every crowbar/8580/FAST addition. Flags honestly mark that remaining uncertainty.

Sources opened: [S035](#s035).

### log line 96: 17:20, 17:21 — c16 firstTen 2, 4

**CORRECT**. Before: 4.9-5.2 V; PAL ±70 ppm. New: +5 V; step 4 `verify: true`.

C16 firstTen2 now nominal5V at7501pin5, proven by schematic supply pin; firstTen4 is flagged because cited Sams CC8 PDF4 only gives14.31818MHz oscillator adjustment, not PAL/tolerance. Honest mixed-source correction.

Sources opened: [S079](#s079).

### log line 97: 17:24, 17:81 — c16 / plus4 master clock scope notes

**CORRECT**. Before: PAL from the TED manual. New: PAL rate under Clocks.

Both master-clock scope notes now refer PAL to Clocks. TED PDF10 explicitly gives PAL17.734475MHz, and both machines' Master clock rows cite that input specification. New cross-reference is factual; it does not prove all unchanged Sams waveform-level diagnoses.

Sources opened: [S050](#s050).

### log line 98: 17:26, 17:27, 17:32 — c1571 scope rows, firstTen 6

**CORRECT**. Before: 2 MHz in 1571 mode. New: step 6 `verify: true`; scope rows kept (rate in Clocks from the 1571 SM).

1571 firstTen6 really is flagged; both scope notes retain2MHz1571 mode. SM printed8 ACCL/CK specifies1MHz1541 and2MHz1571. Sams CD12 PDF11 shows1MHz photos, PDF24 only asks1MHz. Rates are adequately sourced by separate Clocks citation; qualification is honest.

Sources opened: [S067](#s067).

### log line 99: 17:39 — c1581 firstTen 1

**CORRECT**. Before: potted, not repairable. New: removed.

1581 firstTen1 no longer says potted/not repairable. Sams CD22 PDF5 says check supply by substitution, without asserting construction or repairability. Honest removal needed for that source.

Sources opened: [S070](#s070).

### log line 100: 17:86, 17:90 — plus4 firstTen 7, 1

**CORRECT**. Before: 0.894 MHz; 5.3 V reject. New: step 7 `verify: true`; threshold removed.

Plus4 firstTen7 carries verify:true, and step1 numeric5.3 reject threshold is gone. Sams CC9 PDF3 says5V and replace if missing; PDF18 gives clock path, while doubling comes from TED. Honest qualification/removal; not certification of every retained instruction.

Sources opened: [S050](#s050).

### log line 101: 17:125, 17:127, 17:128 — c64 firstTen 1, 3, 4

**CORRECT**. Before: 5.25 V max; 8580; 4.9-5.1 V. New: 5.25 V removed; about +5 V; `verify: true`.

C64 firstTen1/3/4 all carry verify:true and step4 is nominal about5V. Sams CC17 PDF4 supports5.08 unloaded,11.76 regulator and4.91L5 observations, not invented acceptance ranges or8580 clause. NOTE:5.25 still remains in step1 ifNot, now flagged; log removal is only true of expect, not the entire step.

Sources opened: [S021](#s021).

### log line 102: 17:129 — dram4164 replacement HM4864 / MT4264 / TMS4164

**CORRECT**. Before: -. New: kept; already `verify: true`.

HM4864/MT4264/TMS4164 replacement remains verify:true exactly as before. Sams schematic explicitly lists alternatives, but timing/suffix equivalence needs its own checks. Honest already-flagged retention; no new change needed.

Sources opened: [S021](#s021).

### log line 103: 17:130-132 — c64 scope Φ2, AEC, CAEC

**CORRECT**. Before: 1.0227 MHz; badline hold. New: 1.02 MHz; badline clause removed.

Three scope frequencies now round to1.02MHz, consistent with C64 SM CPU rate. Sams CC17 PDF9 supplies the photographed amplitudes. AEC badline text is removed from expect but remains in scope.note with explicit Bauer attribution; Bauer proves second-phase AEC holds for character fetches. Removal log is not literal for whole object, but no new unsupported fact is introduced.

Sources opened: [S021](#s021), [S072](#s072).

### log line 104: 21:28 — cpu8502 pin 24

**CORRECT**. Before: ASCII-DIN. New: CAPS LOCK sense (CAPLK SENSE).

Rev6 schematic printed67/PDF72 labels8502pin24 CAPLK SENSE. New CAPS LOCK sense removes unsupported ASCII-DIN equivalence; verify flag remains. Necessary label correction.

Sources opened: [S035](#s035).

### log line 105: 21:88, 21:90 — vic2e pins 8, 10

**CORRECT**. Before: open-drain; badline timing. New: removed / LOW while the VIC needs the bus.

SM printed35 defines IRQ low interrupt output and BA bus-available DMA output; Rev6 sheet2 gates BA to RDY. Edited IRQ no longer claims open-drain; BA no longer assigns badline-specific timing. New generic text matches. Appropriate removal.

Sources opened: [S035](#s035).

### log line 106: 21:95 — vic2e pin 15 /DMAACK

**CORRECT**. Before: in. New: out; N.C. on the C128.

SM printed34 describes VIC response with DMAACK; printed35 names pin15, and Rev6 sheet3 marks it NC. New output and unused-on-C128 statement are correct. Necessary direction correction.

Sources opened: [S035](#s035).

### log line 107: 21:112-114 — vic2e pins 40-42

**CORRECT**. Before: DRAM address. New: static outputs for character ROM and colour RAM; DRAM uses pins 32-37.

SM printed35 explicitly calls31/40-42 staticA8-A11, for characterROM/colorRAM, and32-37 multiplexedDRAM. All three changed rows now distinguish static path correctly. Necessary removal of wrong DRAM routing.

Sources opened: [S035](#s035).

### log line 108: 21:115-118 — vic2e DB8-DB11

**CORRECT**. Before: bidir. New: `verify: true`.

DB8-DB11 pins43-46 all carry verify:true. SM printed35 says extended bus for colorRAM but does not explicitly establish bidirectionality. Honest qualification of retained direction; not proven by function name alone.

Sources opened: [S035](#s035).

### log line 109: 21:133 — mmu8722 pin 17 MUX

**CORRECT**. Before: out. New: in, from VIC-IIe pin 21.

MMU printed27 says MUX clocks MMU sections; VIC printed35 identifies output21; Rev6 schematic printed67 joins that net to MMUpin17. Input direction and origin are proven; old output was wrong.

Sources opened: [S035](#s035).

### log line 110: 21:148 — mmu8722 pin 33 PHI0

**CORRECT**. Before: from the CPU. New: system clock input from the VIC clock path.

Rev6 schematic printed67 has MMUpin33 on2MHz alongside8502pin1; VIC printed35 defines system-clock output23. New VIC-path system-clock input is correct; CPU-origin claim was wrong.

Sources opened: [S035](#s035).

### log line 111: 21:172 — pla8721 pin 13

**CORRECT**. Before: Z80 enable. New: receives Z80 BUSACK; the Z80 enable is MMU pin 43.

PLA printed29 explicitly says Z80EN13 receives Z80 BUSACK. MMU printed27 says43 enables Z80/disables8502. New distinction is correct and necessary.

Sources opened: [S035](#s035).

### log line 112: 21:185 — pla8721 pin 29 /SDEN

**CORRECT**. Before: sprite/data enable. New: S-data buffer enable.

PLA printed29 SDEN29 explicitly enables buffer between data bus and S DATA bus. New definition matches; sprite/data expansion was invented. Necessary correction.

Sources opened: [S035](#s035).

### log line 113: 21:193 — pla8721 pin 38 /IOCS

**CORRECT**. Before: includes VIC. New: CIA1/2, I/O1/2, SID, VDC; VIC on pin 42.

PLA printed29 says I/O CS38 enables CIA1/2,I/O1/2,SID,8563 decoder; VIC select is42. New mapping matches. Necessary correction of decoding target.

Sources opened: [S035](#s035).

### log line 114: 21:198 — pla8721 pin 44

**CORRECT**. Before: GWE, global write enable. New: /GWE, colour RAM write enable, active LOW.

PLA printed29 calls GWE44 active-low write enable for colorRAM and DWE40 DRAM write enable. New name,activeLow and description match. Necessary polarity/function correction.

Sources opened: [S035](#s035).

### log line 115: 21:206, 21:207 — c128 rails +5 V, +5 V (VDC)

**CORRECT**. Before: 4.95-5.10 V; VDC diagnosis. New: +5 V; VDC note adds DRAM, clock, buffers.

C128 schematic shows nominal5V for CPU/VDC, localVRAM and buffer/clock paths. Carlsen C128 U22/U23/U25/U24/Y1 entries independently describe80column faults. New broader checks are supported; old exclusiveVDC diagnosis was not.

Sources opened: [S035](#s035).

### log line 116: 32:2, 37:7 — pla82s100 replacements

**CORRECT**. Before: cross-machine exclusions. New: removed.

Both cross-machine exclusion sentences actually disappear. PLA264 maker README identifies251641-02 C16/C116/Plus4 target; C64-Wiki replacement section supports timing/cartridge qualifiers left in C64 note. New text stays source-supported. Removal is conservative; target exclusions are still implied by distinct programmed devices.

Sources opened: [S017](#s017), [Sextra-2](#sextra-2), [Sextra-3](#sextra-3).

### log line 117: 35:114-119, 35:121, 35:124, 35:126, 35:129, 35:130 — c1541 / c1581 / c64 / vic20 firstTen

**CORRECT**. Before: unsourced pins, diagnoses. New: `verify: true`.

All eleven listed firstTen objects have verify:true in runtime data (1541steps1/2/4/5/7;1581step3;C64step8;VIC20steps1/3/6/7). Carlsen sources explain symptoms, not every pin. Flags honestly preserve unproven pin/diagnostic details. No claim that these rows are fully source-proven.

Sources opened: [S039](#s039), [S055](#s055).

### log line 118: 35:122, 35:123 — pet firstTen 1; sid6581 SwinSID

**CORRECT**. Before: Carlsen (HTTP 406). New: `verify: true`.

PET firstTen1 and SwinSID replacement really carry verify:true. Direct curl/urllib returned406 for their sources; PET FAQ mirror supports fuse/reseating, not all repair advice. SwinSID content could not be independently recovered here. Honest flag retention; this is not a content certification.

Sources opened: [S088](#s088), [S089](#s089).

### log line 119: 35:127 — vic20 firstTen 4

**CORRECT**. Before: cold VIC = no power. New: a cold VIC may itself be dead; fit a known-good one, then check pins 40 / 20.

Carlsen VIC20 diagnostics (cold-VIC paragraph) explicitly says cold chip may be bad, replacement first, then check power40/ground20 if replacement stays cold. New sequence follows exactly. Necessary correction of old power-only diagnosis.

Sources opened: [S055](#s055).

### log line 120: 35:131 — rom23128 Switchable ROM

**CORRECT**. Before: IC5 socket. New: the ROM socket.

Retroleum product page says16/48K only, two16K images,onboard switch accessible from expansion,no circuit modification,diagnostic variant. It does not specifyIC5 in the product prose. New ROM socket wording matches; removal conservative and source-appropriate.

Sources opened: [S097](#s097).

### additional fa-commodore correction: additional — cpu7501 pin 5

**WRONG**. Before: VCC / power. New: GND / ground.

Additional cpu7501pin5 correction is reversed. Maker7501-01.gif pin configuration givesVDD at5,VSS at20; TED PDF14 explicitly gives5VCC Power Supply+5V and20GND. Restore pin5 VCC,type power,+5V supply; only pin20 is ground. Old value was correct; no correction was needed. HIGH: treating supply pin as ground can short the5V rail; new record also contradicts its own retained+4.9to+5.2V probe.

Sources opened: [S014](#s014), [S050](#s050).

## Findings and principle mapping

1. **HIGH — Additional correction reverses 7501 power/ground.** Restore pin 5 to VCC/power/+5 V. Maker diagram and TED p.14 agree. Ground is pin20. Incorrect grounding risks a supply short. Mapping: prove-it-works; fix-root-causes.
2. **HIGH — 06:201 / 07:104 invents a shared electrical condition for all drives.** 1581 pin1 is FAST CLK and has its own 1k pull-up R28/RP1-15. Restore the 1581 role and split per-drive expectations. Mapping: prove-it-works; fix-root-causes.
3. **MEDIUM — 05:98, 06:15/18, 06:181 retain/add unsourced fault diagnoses.** A plausible suspect is not a documented conclusion, and firstTen6 still makes an exclusive TED diagnosis despite the neighboring softening. Mapping: prove-it-works; fix-root-causes.
4. **MEDIUM — 05:110-117 PET cleanup leaves unsupported rail diagnosis/damage advice unflagged.** The regulator diagram does not prove failure temperatures, cause, or DRAM damage/sequencing rules. Mapping: prove-it-works.
5. **MEDIUM — 04:328-337 cassette cleanup is asymmetric.** C64 SENSE pin6 has unproven switch-state text without CHECK; duplicate F is flagged. Mapping: fix-root-causes; prove-it-works.
6. **MEDIUM — 05:47/66/67 drops voltage numerals but retains unproven idle states.** The only cited VIC20 cartridge source is a pin-name table. Add actual circuit source or flags. Mapping: prove-it-works.
7. **LOW — 05:99 contradicts its own deletion.** C64 rail conflict still says the acceptance range is kept. Mapping: fix-root-causes.
8. **LOW — 05:301/302 leaves a dangling input-range reference.** C16 note refers to the bottom of a deleted range, still with unsourced dropout advice. Mapping: fix-root-causes.
9. **LOW — 04:246-250 introduces C64 text into the VIC20 IEC entry.** Use VIC20/computer in its ATN controller description. Mapping: fix-root-causes.

No shared-state ordering or race finding was established. serialize-shared-state-mutations is not implicated by the document/data comparisons.

## Source index

<a id="s001"></a>
**S001:** [001-mos_6500_mpu_nov_1985.pdf](http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf); [saved artifact](fa-commodore/001-mos_6500_mpu_nov_1985.pdf).

<a id="s003"></a>
**S003:** [003-](http://www.fpgasid.de/); [saved artifact](fa-commodore/003-).

<a id="s005"></a>
**S005:** [005-2364.zip](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2364.zip); [saved artifact](fa-commodore/005-2364.zip).

<a id="s006"></a>
**S006:** [006-6510.zip](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6510.zip); [saved artifact](fa-commodore/006-6510.zip).

<a id="s007"></a>
**S007:** [007-6520.zip](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6520.zip); [saved artifact](fa-commodore/007-6520.zip).

<a id="s008"></a>
**S008:** [008-6522.zip](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6522.zip); [saved artifact](fa-commodore/008-6522.zip).

<a id="s010"></a>
**S010:** [010-c6545.zip](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6545/c6545.zip); [saved artifact](fa-commodore/010-c6545.zip).

<a id="s014"></a>
**S014:** [014-7501-01.gif](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/7501/7501-01.gif); [saved artifact](fa-commodore/014-7501-01.gif).

<a id="s015"></a>
**S015:** [015-8520_datasheet.pdf](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/8520_datasheet.pdf); [saved artifact](fa-commodore/015-8520_datasheet.pdf).

<a id="s017"></a>
**S017:** [017-c64-pla.txt](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/c64-pla.txt); [saved artifact](fa-commodore/017-c64-pla.txt).

<a id="s019"></a>
**S019:** [019-C128_Programmers_Reference_Guide.pdf](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf); [saved artifact](fa-commodore/019-C128_Programmers_Reference_Guide.pdf).

<a id="s021"></a>
**S021:** [021-C64_Programmers_Reference_Guide.pdf](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf); [saved artifact](fa-commodore/021-C64_Programmers_Reference_Guide.pdf).

<a id="s024"></a>
**S024:** [024-1541_Users_Guide.pdf](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf); [saved artifact](fa-commodore/024-1541_Users_Guide.pdf).

<a id="s034"></a>
**S034:** [034-VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf); [saved artifact](fa-commodore/034-VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf).

<a id="s035"></a>
**S035:** [035-Commodore_128_128D_Service_Manual_314001-08_(1987_Nov).pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c128/servicemanuals/Commodore_128_128D_Service_Manual_314001-08_(1987_Nov).pdf); [saved artifact](fa-commodore/035-Commodore_128_128D_Service_Manual_314001-08_(1987_Nov).pdf).

<a id="s036"></a>
**S036:** [036-250469-rev.A.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/250469-rev.A.pdf); [saved artifact](fa-commodore/036-250469-rev.A.pdf).

<a id="s038"></a>
**S038:** [038-C64-C64C_Service_Manual_314001-03_(1992_Mar).pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/servicemanuals/C64-C64C_Service_Manual_314001-03_(1992_Mar).pdf); [saved artifact](fa-commodore/038-C64-C64C_Service_Manual_314001-03_(1992_Mar).pdf).

<a id="s039"></a>
**S039:** [039-320349-1.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-1.gif); [saved artifact](fa-commodore/039-320349-1.gif).

<a id="s040"></a>
**S040:** [040-320349-3.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-3.gif); [saved artifact](fa-commodore/040-320349-3.gif).

<a id="s042"></a>
**S042:** [042-320349-9.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-9.gif); [saved artifact](fa-commodore/042-320349-9.gif).

<a id="s044"></a>
**S044:** [044-IEEE-488_pinout.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/IEEE-488_pinout.gif); [saved artifact](fa-commodore/044-IEEE-488_pinout.gif).

<a id="s045"></a>
**S045:** [045-PET-N_Video_pinout.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/PET-N_Video_pinout.gif); [saved artifact](fa-commodore/045-PET-N_Video_pinout.gif).

<a id="s046"></a>
**S046:** [046-PET_User_Port_pinout.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/PET_User_Port_pinout.gif); [saved artifact](fa-commodore/046-PET_User_Port_pinout.gif).

<a id="s047"></a>
**S047:** [047-8032087.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/univ2/8032087.pdf); [saved artifact](fa-commodore/047-8032087.pdf).

<a id="s049"></a>
**S049:** [049-Plus_4_Service_Manual_314001-04_(1984_Oct).pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf); [saved artifact](fa-commodore/049-Plus_4_Service_Manual_314001-04_(1984_Oct).pdf).

<a id="s050"></a>
**S050:** [050-Plus_4_Technical_Docs.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf); [saved artifact](fa-commodore/050-Plus_4_Technical_Docs.pdf).

<a id="s052"></a>
**S052:** [052-connectors-2.jpg](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg); [saved artifact](fa-commodore/052-connectors-2.jpg).

<a id="s054"></a>
**S054:** [054-powersupply.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/powersupply.gif); [saved artifact](fa-commodore/054-powersupply.gif).

<a id="s055"></a>
**S055:** [055-324001-02a.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02a.gif); [saved artifact](fa-commodore/055-324001-02a.gif).

<a id="s056"></a>
**S056:** [056-324001-02b.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02b.gif); [saved artifact](fa-commodore/056-324001-02b.gif).

<a id="s057"></a>
**S057:** [057-VIC-20_Schematic_-Version_E.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/VIC-20%20Schematic%20-Version%20E.pdf); [saved artifact](fa-commodore/057-VIC-20_Schematic_-Version_E.pdf).

<a id="s059"></a>
**S059:** [059-1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf); [saved artifact](fa-commodore/059-1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf).

<a id="s060"></a>
**S060:** [060-1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf); [saved artifact](fa-commodore/060-1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf).

<a id="s061"></a>
**S061:** [061-pla.txt](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/pla.txt); [saved artifact](fa-commodore/061-pla.txt).

<a id="s063"></a>
**S063:** [063-short-251748-rev.E-right.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/short-251748-rev.E-right.gif); [saved artifact](fa-commodore/063-short-251748-rev.E-right.gif).

<a id="s067"></a>
**S067:** [067-1571_Service_Manual_Preliminary_314002-04_(1986_Oct).pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1571/1571_Service_Manual_Preliminary_314002-04_(1986_Oct).pdf); [saved artifact](fa-commodore/067-1571_Service_Manual_Preliminary_314002-04_(1986_Oct).pdf).

<a id="s068"></a>
**S068:** [068-310420-full.gif](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1571/310420-full.gif); [saved artifact](fa-commodore/068-310420-full.gif).

<a id="s070"></a>
**S070:** [070-1581_Service_Manual_314982-01_(1987_Jun).pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1581/1581_Service_Manual_314982-01_(1987_Jun).pdf); [saved artifact](fa-commodore/070-1581_Service_Manual_314982-01_(1987_Jun).pdf).

<a id="s072"></a>
**S072:** [072-vic-ii.txt](http://www.zimmers.net/cbmpics/cbm/c64/vic-ii.txt); [saved artifact](fa-commodore/072-vic-ii.txt).

<a id="s076"></a>
**S076:** [076-IEEE-488](https://en.wikipedia.org/wiki/IEEE-488); [saved artifact](fa-commodore/076-IEEE-488).

<a id="s079"></a>
**S079:** [079-C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf](https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf); [saved artifact](fa-commodore/079-C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf).

<a id="s088"></a>
**S088:** [088-petfaq.html](https://portcommodore.com/rcarlsen/cbm/PET/petfaq.html); Local download unavailable: HTTP Error 406: Not Acceptable. Direct web access/qualification described per item.

<a id="s089"></a>
**S089:** [089-SID_replacements.txt](https://portcommodore.com/rcarlsen/cbm/SID%20%26%20mods/SID%20replacements.txt); Local download unavailable: HTTP Error 406: Not Acceptable. Direct web access/qualification described per item.

<a id="s097"></a>
**S097:** [097-zx-spectrum-chips](https://retroleum.co.uk/zx-spectrum-chips); [saved artifact](fa-commodore/097-zx-spectrum-chips).

<a id="s100"></a>
**S100:** [100-ua78.pdf](https://www.ti.com/lit/ds/symlink/ua78.pdf); [saved artifact](fa-commodore/100-ua78.pdf).

<a id="sextra-1"></a>
**Sextra-1:** [FPGASID maker specifications](https://www.fpgasid.de/specifications); [saved artifact](fa-commodore/extra-1.html).

<a id="sextra-2"></a>
**Sextra-2:** [PLA264 maker README](https://github.com/hackup/PLA264); [saved artifact](fa-commodore/extra-2.html).

<a id="sextra-3"></a>
**Sextra-3:** [C64 PLA replacement source cited by record](https://www.c64-wiki.com/wiki/PLA_(C64_chip)); [saved artifact](fa-commodore/extra-3.html).
