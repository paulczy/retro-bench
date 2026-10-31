# skeptic-a source review ledger

Review date: 2026-10-30. Scope: all 77 rows of Items fixed and both Additional corrections rows in docs/verification/factcheck-fixes-a.md: **79 items**. No row was sampled or skipped.

**Do not commit: two new supply-pin assignments contradict the cited pin diagrams.**

Decision applies to the actual changed claim. For a deletion or verify:true change, CORRECT means the withdrawal/explicit uncertainty is justified; it does **not** certify an unresolved hardware claim. OLD assessments distinguish disproven values from values whose evidence was merely insufficient. Grouped rows retain one coverage item but enumerate their affected parts/pins.

Evidence: scope.diff (raw scoped git diff), leaf-diff.txt (evaluated old/new field comparison), data-old.json (HEAD), data-new.json (working data), rows.json, and the downloaded documents/page images in this directory. The fix log was used only as an index. Source pin drawings, not descriptions in that log, decide the two high findings.

Download method: attempted curl -L -A Mozilla/5.0 for cited URLs; local Schannel TLS failed with SEC_E_NO_CREDENTIALS. Retried HTTPS with Python urllib using Mozilla/5.0, preserving curl failures in downloads.json, supplement.json, remaining.json. PDFs processed with pdftotext -layout. Scanned/ambiguous pages rendered with pdftoppm -f N -l N -r 110 -png and visually inspected. Archive page images fetched directly from archive.org/download/.../page/nN.jpg. Dead-link web searches and direct web opens recovered Carlsen's original CBM PS.txt and 8580 to 6581.txt, plus the F18A author's pin table; web access did not rescue the specific unavailable Wayback copies. An HTTP200 wrapper is not archived source content.

No hardware power/probe experiment was performed. This is a documentary review, not board validation. No application build is evidence for any electrical fact.

## Coverage

| Items | CORRECT | WRONG | UNPROVEN |
|---:|---:|---:|---:|
| 79 | 74 | 2 | 3 |

## Findings

1. **F1 HIGH — cia6526 pin20 (fc-a-x1).** commodore.js:1066 changes VCC/+5V to Vss/ground/0V. C64 PRG printed420/PDF439 labels20 VCC and1 VSS. Restore VCC, power, +5V. The old supply identity was right. Map: prove-it-works.
2. **F2 HIGH — cpu6502 pin8 (fc-a-x2).** apple.js:1269 changes VCC/+5V to Vss/ground/0V. MOS6500 November1985 datasheet p10 labels8 VCC and1/21 VSS; Sather AppleIIe p4-2 Fig4.1 independently agrees. Restore VCC, power, +5V. This is shared across many machines; the old value was right. Map: prove-it-works.
3. **F3 MEDIUM — partial voltage-range cleanup (items39-41).** Pin tables/firstTen are corrected, but power.disk2 +12V (ribbon13/15/17/19), power.duodisk +12V (DB25 19/20), and power.unidisk525 +12V (DB19 7/8, including IIc use) still say11.3-12.5V. Apple schematic050-0007-H p2 and TA37054 pp1-2 state nominal12V; Sams CD6 p6 gives an11.6V observation, not that tolerance. IIc TRM p234 Table11-4 explicitly allows10.8-13.2V, so the surviving UniDisk IIc window rejects documented in-spec supplies. Correct the shared rail data too; keep documented machine-specific tolerance. Map: fix-root-causes.
4. **F4 MEDIUM — c16-power/VR1 input cutoff (item25).** New note turns a TI test range and typical dropout into a board-wide stops-regulating boundary near7V. SLVS056P p5 specifies operating/test conditions and2V typical dropout at1A/25C; it does not establish an invariant cutoff for the fitted historical regulator and all loads. Keep the supported9V nominal and qualify/remove the inferred failure boundary. Its new #page=6 citation also opens the7808 table, not7805 (p5). Map: prove-it-works.
5. **F5 MEDIUM — source-repair claims remain unproven (items34,72).** Multiple exact Carlsen Wayback URLs and the added F18A snapshot could not be read; one apparent success was only archive UI HTML. Individual live claims recovered through web access do not establish that these mirror links expose the intended documents. Require actual archived content before calling the whole repair proven. Local/access failures are recorded as UNPROVEN, not a claim that the remote content is factually wrong. Map: prove-it-works.

All repository/source changes were already present. I wrote review artifacts only under .factcheck-tmp/. No commits or corrective data edits were made. No observed evidence of a state-mutation race justifies a serialize-shared-state-mutations finding.

## Per-item decisions

### 01. A#8, A#9 — `c16-exp` (C16, Plus/4)

**NEW: CORRECT. OLD: WRONG orientation.**

Changed claim: pin 1 left ? `pin1: 'right'`; summary says external view.

Source checked: MAP1 p.33 CN4.

Top numeric row runs 25 to 1 left-to-right; letter row CC to A. Text explicitly says connectors drawn from outside. C16/Plus4 shared layout now matches that view.

### 02. A#14 — `c64-exp`

**NEW: CORRECT. OLD: WRONG orientation.**

Changed claim: pin 1 left ? `pin1: 'right'`.

Source checked: C64 printed396/PDF415.

Expansion drawing has numeric22 at left and1 at right, with A below1. New pin1 right agrees.

### 03. rule 4 — `c128-exp`

**NEW: CORRECT. OLD: WRONG orientation.**

Changed claim: pin 1 left ? `pin1: 'right'`.

Source checked: C128 printed399/PDF409 Fig12-11.

View from back explicitly shows22 to1 above Z toA; pin1 right is correct.

### 04. A#7, M#427 — Plus/4 video

**NEW: CORRECT. OLD: WRONG for Plus4; CORRECT for C16.**

Changed claim: shared `c16-video`, pin 8 +5 V with a conflict note ? new `plus4-video` (pin 8 NC); C16 entry keeps +5 V, conflict removed.

Source checked: MAP2 CN7; C16 PDF11; PLUS4 PDF21.

Map labels Plus4 video8 NC. Service schematic shows it unconnected; C16 schematic251788 sheet1 supplies pin8 from5V. Separate plus4-video is justified.

### 05. M#5 — `ted7360` 7 R/W

**NEW: CORRECT. OLD: WRONG/incomplete direction.**

Changed claim: dir in ? dir bidir.

Source checked: TED PDF9.

Pin7 is read as an input but TED also actively pulls up the line during fetches; bidir describes both roles.

### 06. M#6 — `ted7360` 12

**NEW: CORRECT. OLD: WRONG NTSC double rate; old1.76 approximated PAL.**

Changed claim: 0.89 / 1.76 MHz ? 0.89 / 1.79 MHz NTSC (1.788), 0.88 / 1.77 PAL; also c16/plus4 `cpu`, 7501 summary and pin 1.

Source checked: TED PDF33,35.

NTSC894kHz/1.788MHz and PAL884kHz/1.768MHz support rounded0.89/1.79 and0.88/1.77. Checked ted pin12, cpu7501 summary/pin1, C16/Plus4 CPU text in diff.

### 07. M#33, M#34 — `vic2` 24 A0, 28 A4 (and A1-A3, A5)

**NEW: CORRECT. OLD: WRONG, output-only omits CPU access.**

Changed claim: out ? bidir.

Source checked: C64 printed450/PDF469.

Source explicitly calls A5-A0 bidirectional and inputs during processor register reads/writes. Pins24-29 now all bidir.

### 08. M#37, M#38 — `vic2` 35-38 DB11-DB8

**NEW: CORRECT. OLD: WRONG, bidir.**

Changed claim: bidir ? in (sourced).

Source checked: BAUER section3.14.6.

Bauer says extended color data lines lack tristate drivers and stay inputs. The text has a D8-D13 typo but explicitly describes four color bits; context identifies D8-D11. Pins35-38 in is supported.

### 09. M#42-44 — `cia6526` PA0-PA7, PB0-PB7

**NEW: CORRECT. OLD: WRONG CIA1 row/column assignments and blanket CIA2 serial use.**

Changed claim: CIA1 port A rows, port B columns + joystick ? port A keyboard column out (+ control port 2 on bits 0-4), port B row in (+ control port 1 on 0-4); CIA2 per PRG p. 330; labelled C64/C128.

Source checked: C64 printed328-331,343/PDF347-350,362.

DCOO writes keyboard columns; DCO1 reads rows; low5bits correspond to control2/control1. CIA2 PA0/1 bankselect,PA2 RS232,PA3-7 serial,PB user. All16 edited port-pin descriptions inspected. Log's CIA2 page330 should be331.

### 10. M#58, M#59 — `vic6560` 5-8 DB11-DB8

**NEW: CORRECT. OLD: WRONG, bidir.**

Changed claim: bidir ? in.

Source checked: VIC6560 scan6560-09.

Upper4data bits exclusively retrieve color/mode information, unlike low8which also serve CPU transfers. Pins5-8 input is supported.

### 11. M#62 — `vic6560` 21 A0 (and 22-34)

**NEW: CORRECT. OLD: WRONG, input-only.**

Changed claim: in ? bidir, both roles described.

Source checked: VIC6560 scan6560-09.

All14address pins21-34 explicitly bidirectional: CPU-register inputs in phi2, video-fetch outputs in phi1.

### 12. M#87 — `vdc8563` 31 DA5 (and 26-33)

**NEW: CORRECT. OLD: WRONG bus identity/direction.**

Changed claim: bidir address/data ? out, local DRAM address.

Source checked: C128SM printed38/PDF40.

DA0-DA7 pins26-33 are local display DRAM address bus; separate DD0-DD7 are bidirectional data. New out/address wording matches.

### 13. M#94, M#95 — `vic2e` 32-37 A0-A5

**NEW: CORRECT. OLD: WRONG, output-only.**

Changed claim: out ? bidir.

Source checked: C128SM printed35/PDF37.

Pins32-37 multiplex video addresses and serve as address inputs during CPU read/write. New bidir is correct.

### 14. M#104 — `pla8721` 32 CLRBNK

**NEW: CORRECT. OLD: WRONG expansion of CLRBNK.**

Changed claim: "Clear bank" ? colour RAM bank select output.

Source checked: C128SM printed29/PDF31.

Pin32 explicitly output for color RAM bank select; not a clear-bank command.

### 15. M#125 — `cia8520` 39 SP

**NEW: CORRECT. OLD: WRONG as an unconditional state; no such rule proven.**

Changed claim: "goes LOW when set to output" ? clause removed.

Source checked: CIA8520 PDF9/sheet9 sec1.5.11.

SP transmits register bits and retains last transmitted bit. Choosing output mode is not proof it must be LOW. Removing that clause is correct.

### 16. M#424 — `c16-cass` 5 (Plus/4)

**NEW: CORRECT. OLD: UNPROVEN for Plus4; C16 route is supported.**

Changed claim: write from 7501 P1 ? labelled "on the C16 schematic; Plus/4 route not on the cited map".

Source checked: C16 PDF11-12; MAP2 CN3.

C16 sheet1 shows cassette WRITE, and sheet2 routes CST WRT from7501 P1. Plus4 map names WRITE but no CPU route. New machine qualification is accurate.

### 17. M#433, M#443 — `c64-video` 1 (and 4), `vic20-video` 5

**NEW: CORRECT. OLD: UNPROVEN amplitude/loading, not disproved.**

Changed claim: 1 V p-p into 75 Ω ? expect removed.

Source checked: C64 printed396/PDF415; VIC20 printed282/PDF298.

Connector tables identify luminance/composite/video-high pins without the removed1Vpp/75ohm specification. All3changed expects removed.

### 18. M#454 — `vic20-cass` 6/F

**NEW: CORRECT. OLD: UNPROVEN idle level/key list.**

Changed claim: idle level + key list ? expect removed.

Source checked: VIC20 printed282/PDF298.

Source gives6/F cassette switch only; no voltage or full PLAY/REC/FF/REW behavior. Removal avoids claiming that table proves it.

### 19. M#455, M#456 — `pet-ieee` 5, A (all 17 signal pins)

**NEW: CORRECT. OLD: UNPROVEN electrical levels.**

Changed claim: "About +5 V idle; LOW when asserted" ? expect removed, `verify: true` on the active-LOW pins.

Source checked: PETIEEE single-sheet drawing.

Drawing only maps signals/numbers; it supplies no idle5V or assertion electrical specification. Changed signal expects removed and flags set. Actual signal count is16, not log's17.

### 20. M#457 — `pet-user` 11 GRAPHIC

**NEW: CORRECT. OLD: UNPROVEN behavior.**

Changed claim: behaviour ? `verify: true`.

Source checked: PETUSER single-sheet drawing.

Pin11 labelled GRAPHIC only. New verify flag correctly leaves behavior unconfirmed.

### 21. M#459, M#460 — `pet-user` C-L

**NEW: CORRECT. OLD: UNPROVEN addresses.**

Changed claim: $E841 / $E843 ? addresses removed.

Source checked: PETUSER single-sheet drawing.

C-L map PA0-PA7, but drawing gives no E841/E843 register addresses. Removed all8address claims.

### 22. M#461 — `pet-cass1` 3/C (also SENSE, and `pet-cass2`)

**NEW: CORRECT. OLD: UNPROVEN motor/sense levels.**

Changed claim: motor / sense levels ? expect removed.

Source checked: PETCASS single-sheet drawing.

BothJ3/J6 tables label3/C motor and6/F switch; no levels or key sequence given. Removed associated expects on both records.

### 23. M#477 — `1541-iec` 5

**NEW: CORRECT. OLD: UNPROVEN whole-bus diagnostic claim by this citation.**

Changed claim: "a drive stuck LOW hangs the whole bus" ? "LOW when asserted".

Source checked: DRIVE1541 PDF12 serial interface.

Source identifies DATA onpin5 and interface logic. New generic assertion wording is compatible; removed hang diagnosis is not established by that page.

### 24. S#19 — PET supply

**NEW: CORRECT. OLD: WRONG DC-feed description of J8.**

Changed claim: +9/+16/-9 V feeds on J8 ? AC on J8 (1/4/5, 8/9) to on-board bridges; +16 V J10 4/5, -9 V J10 1/2, +9 V J11 1/4/6 and J8 2; rail `where` fixed.

Source checked: PETPOWER sheet9.

J8 1/4/5 and8/9 connect to rectification; J10 4/5 raw16V and1/2 raw-9V; J11 1/4/6 andJ8 2 raw9V. Traced all listed new contacts on source.

### 25. S#2 — `c16-power` 2; C16 rail

**NEW: UNPROVEN. OLD: UNPROVEN fixed7.5V dropout boundary; nominal9V supported.**

Changed claim: above 7.5 V ? About +9 V; rail note cites TI µA7805 (7-20 V in, 2 V dropout).

Source checked: REG7805 printed/PDF5 sec7.5, not cited6; C16 PDF11.

New9V nominal is supported. TI tests7-20V under stated current/temperature/power conditions and gives2V typical dropout at1A/25C. It does not establish every board stops regulating below about7V. New causal cutoff needs qualification. Citation page6 is7808.

### 26. S#4 — `plus4-power` 1

**NEW: CORRECT. OLD: UNPROVEN tolerance interval, not disproved.**

Changed claim: +5.0 to +5.25 V ? +5 V (about 5.2 V per PSU schematic).

Source checked: PLUSPS schematic; MAP2 CN1.

Source explicitly marks output5.2V atpin1; map calls it5V. New nominal/approximate5.2 wording is supported; no5.0-5.25 tolerance is provided.

### 27. S#13 — `c64-power` 5

**NEW: CORRECT. OLD: UNPROVEN narrow4.95-5.10 tolerance.**

Changed claim: 4.95-5.10 V ? +5 V; Carlsen: RAM destroyed above 5.5 V; Carlsen PS page + mirror added.

Source checked: CARPS paragraphs at lines38-45 and112-114; C64 PDF415.

Recovered actual Carlsen text through web tool after curl406: RAM absolute max5.5V and destruction above it are explicit. Nominal5V is supported. Added archive link availability remains under34.

### 28. S#21 — `c128-power` 1

**NEW: CORRECT. OLD: UNPROVEN narrow4.95-5.10 tolerance.**

Changed claim: 4.95-5.10 V ? +5 V.

Source checked: C128SM printed67/PDF72 schematic310378 sheet2.

Power inlet +5IN supports nominal5V, not old pass/fail window.

### 29. RA#79, F21 — `rom23128` 20, 22, 27

**NEW: CORRECT. OLD: Not categorically wrong: old machine-qualified wiring mostly already distinguished boards; generic reuse could mislead.**

Changed claim: C16 / Spectrum / Oric wiring in pin text ? generic pins; wiring moved to summary by machine.

Source checked: TED PDF25; C16 PDF11.

Generic select roles and C16 mask polarities match. Machine wiring moved into summary. All3pin edits checked. This is scope clarification, not proof every old wiring statement was false.

### 30. RA#92, F21 — `via6522` 19

**NEW: CORRECT. OLD: Board-specific and not established by generic chip sheet; not disproved.**

Changed claim: "PET: beep" ? removed (already in summary).

Source checked: VIA scan6522-01.

Pin19 CB2 is a control/serial signal. Generic description now omits a PET-only use; that use survives qualified in summary. Does not prove PET cannot beep onCB2.

### 31. F3, rule 6 — `rom23128` → 27128

**NEW: CORRECT. OLD: Label misleading as a drop-in; old note already required adaptation.**

Changed claim: pin-compatible ? adapter.

Source checked: INTEL PDF411-412 printed4-29/30; TED PDF25.

27128 needsVPP pin1 atVCC in read mode and has programming function on27 versus maskROM select. Adapter category is justified. Pin27 HIGH is a safe convention, but Intel read table marks27 don't-care, so summary's pre-existing only-HIGH phrasing is too strong.

### 32. rule 6 — `dram4164` → 41256; `sid6581` → 8580

**NEW: CORRECT. OLD: Drop-in label misleading; old notes already explained rework.**

Changed claim: pin-compatible ? adapter (pin 1 tie; pin 28 supply/filter rework).

Source checked: TIMEM PDF103 printed4-63; CARSID paragraphs10-27.

41256 adds A8 pin1 requiring defined input. Carlsen explicitly documents SID pin28 12V/9V and470pF/22nF filters plusCR7/R8 changes. Both new adapter classifications reflect required board work. Does not mean physical package pin numbering changed.

### 33. RA#71,72,75,82,83,84,86,87,88,94 — 8501, 8360, HM4864/MT4264/TMS4164, 8500, 8502 adapter, 8562/8565, 8580, 6526A, 8521, 8564 adapter

**NEW: CORRECT. OLD: UNPROVEN blanket compatibility, not disproved.**

Changed claim: — ? `verify: true`, reason in note.

Source checked: REPLACEMENTS source index and C64Wiki TED/VIC/CIA; Carlsen live/archived attempts.

All10changed rows inspected:8501,8360,HM4864/MT4264/TMS4164,8500,8502adapter,8562/65,8580,6526A,8521,8564adapter now verify:true. CORRECT applies to uncertainty downgrade only; these flags do not certify interchangeability or unprovided adapter wiring. Carlsen failures are recorded.

### 34. F14 — Carlsen links (HTTP 406)

**NEW: UNPROVEN. OLD: Live-source availability problem reproduced; that does not verify mirrors.**

Changed claim: single link ? Wayback copies added (`RCWB`) beside every Carlsen source in arrays and chip datasheets.

Source checked: Download manifests: all13unique Carlsen snapshots attempted.

Originals return406 locally; most Wayback URLs refuse connections/429. One200response was only a Wayback HTML wrapper, not archived article. Availability API and added URLs do not prove all mirrored source content works. No blanket mirror-success verdict.

### 35. F14 — C16 Service Manual (damaged PDF)

**NEW: CORRECT. OLD: Old single citation was not false; reported PDF-reader breakage was not reproduced with Poppler.**

Changed claim: single link ? myretrostore alternate scan added beside all 15 citations (page map 11/12→11, 14→12, 15→13).

Source checked: ZC16 PDF11/12/14/15 images; C16 PDF11-13 images.

Opened alternate pages11,12,13: respectively schematic251788 sheets1,2,3; first includes chip pinouts, third6529/PLA. Directly compared old and alternate images:11/12 to11,14 to12,15 to13. All15 newly-added citation occurrences match. Poppler parsed/rendered the original successfully here; the label claiming a damaged index remains unconfirmed.

### 36. M report — C128 PRG anchors

**NEW: CORRECT. OLD: WRONG old anchor/printed-page locations.**

Changed claim: RGBI #407, video #406, controller #408, cassette label p. 399, serial label p. 395 ? #408, #407, #409, p. 398, p. 394; expansion label names Fig. 12-11.

Source checked: C128 PDF404,407-410.

RGBI table12-6 at408; video12-5 at407; controller12-8 at409; cassette atprinted398/PDF408; serialprinted394/PDF404; expansionFig12-11 atprinted399/PDF409. All6reported label/anchor changes checked.

### 37. S report — 1541 spec

**NEW: CORRECT. OLD: WRONG page5 target.**

Changed claim: PDF p. 5 ? PDF p. 4.

Source checked: DRIVE1541 PDF4.

Page4 contains120VAC/60Hz and30W max specification; page5 is not this specification. Both label andanchor corrected.

### 38. RA#38, F15 — `disk2-mech`

**NEW: CORRECT. OLD: WRONG row assignment for component-side view.**

Changed claim: numbers on top ? `rowA: 'bottom'` (A-R on top, A at left).

Source checked: DISKPHOTO analog-card photo; DISKSCH PDF2.

Photo shows A marked atleft on component side. LetteredA-R side is top; numeric row below. New rowA bottom matches that stated view.

### 39. S#79-89, RMa#533 — `disk2-ribbon` 9, 11-19

**NEW: CORRECT. OLD: UNPROVEN tolerance windows; nominal pin voltages supported.**

Changed claim: ±ranges ? -12 / +5 / +12 V nominal (also rails, firstTen).

Source checked: DISKSCH PDF2; DISKSAMS PDF6.

Pin9 -12V,11/12 +5V,13/15/17/19 +12V; firstTen now nominal, -12rail nominal. Source has single measured5.0/11.6/-12.0 values, not derived tolerance bands. Limitation: +12power rail still11.3-12.5V, and +5rail still4.75-5.25; see findingF3.

### 40. S#98-115, RMa#537, 541 — `duo-db25` 7, 19, 20, 23, 24

**NEW: CORRECT. OLD: UNPROVEN tolerance windows.**

Changed claim: ranges ? nominal.

Source checked: DUOCABLE PDF1-2.

DB25 7/24 +5V,19/20 +12V,23 -12V match source. firstTen nominal is correct. Related +12rail still11.3-12.5V, not proven by this cable document; seeF3.

### 41. RMa#544, S#122-133 — `duo-db19` / `uni-db19` 5-8, 16

**NEW: CORRECT. OLD: UNPROVEN generic tolerances; oldIIc10.8-13.2 value already CORRECT.**

Changed claim: 11.3-12.5 V etc. ? nominal; IIc instance +12 V ±10 % (10.8-13.2 V) with IIc TRM Table 11-4 added.

Source checked: DUOCABLE PDF1-2; IICTRM234 printed234/Table11-4.

DB19 5 -12V,6/16 +5V,7/8 +12V match cable; IIc +12 +/-10percent gives10.8-13.2. Newpin/firstTen wording correct. Related unidisk525 +12rail remains11.3-12.5 even forIIc, contradicting this source; seeF3.

### 42. A#30 — `2e-aux`

**NEW: CORRECT. OLD: UNPROVEN orientation, not disproved.**

Changed claim: assumed orientation ? `verify: true`, summary says unchecked.

Source checked: IIEAUX printed198/Table7-21.

Citedpage is signal table, not physical view. verify:true and explicit unchecked orientation are appropriate; it does not establish the old orientation was reversed.

### 43. A#100, F6 — `rom2316` 18, 20, 21

**NEW: CORRECT. OLD: WRONG as universal mask polarity/wiring; Apple-specific portion CORRECT.**

Changed claim: Apple /INH and F12 wiring, Apple polarities ? generic CS1-CS3 (polarity by mask); Apple and Model III wiring in summary; Model III Fig. 6 added.

Source checked: IIROM printed94; MODEL3 printed33/PDF44 Fig6.

Apple active-lowCS1/CS3 and highCS2 are explicit. ModelIII U106 instead has18 grounded,21 +5V,20 /ROMC. Generic18/20/21 with per-mask polarity resolves this conflict; checked all3pin edits and both summaries.

### 44. RMa#131 — `mmu344` 24 Cxxx

**NEW: CORRECT. OLD: WRONG/incomplete address range.**

Changed claim: $C100-$CFFF slot ROM ? $C000-$CFFF I/O enable, subject to ROM switches.

Source checked: SATHER7 printed7-2.

CXXX overall I/O enable includes C000-CFFF and is suppressed for specified internalROM mappings. New broader range and switch qualification agree.

### 45. RMa#136 — `iou344` 15

**NEW: CORRECT. OLD: UNPROVEN open-drain construction.**

Changed claim: open drain ? removed; Sather p. 4-2 added.

Source checked: SATHER4 printed4-2.

Source says IOU both responds to RESET and causes it to drop at powerup; it does not identify transistor output construction. New functional wording preserves proven input/output behavior.

### 46. RMa#139, 140 — `kbd3600` 1-5

**NEW: CORRECT. OLD: WRONG one-size option list and input-only direction for4/5.**

Changed claim: generic option list, dir in ? per-pin options from the chart; pins 4, 5 bidir (mask-dependent).

Source checked: AY3600 printed3-24/PDF2.

Read every chart column:1 externalclock or internal oscillator;2 LO/RO/CC;3 CC/CE;4 CE/AKO externally and LO/RO/CC/CE/AKO internally;5 AKO/B10 externally,CC/CE/AKO/B10 internally. New enumerations match. bidir here means alternative mask input/output roles, not simultaneous electrical bidirectionality.

### 47. RMa#152 — `glu2c` 14

**NEW: CORRECT. OLD: UNPROVEN bidir direction.**

Changed claim: bidir ? `verify: true`.

Source checked: IICGLU printed246 Fig11-8/Table11-10.

MD7 pin14 reports MMUflag status on busbit7; source does not state it also reads busbit7. verify:true correctly marks unsupported direction, not a proven replacement direction.

### 48. RA#97,102,105,106 — 65C02, ECG3470, SK3697, 9334/74259

**NEW: CORRECT. OLD: UNPROVEN universal interchangeability, not disproved.**

Changed claim: — ? `verify: true`.

Source checked: ENH printed1.2.2; SamsCD6 n19/printed8 and CC10 n7/printed1, both visually opened; REPLACEMENTS.

All4rows flagged:65C02,ECG3470,SK3697,9334/74259. Apple sheet proves IIe enhanced-ROM combination only. Crossreferences are not pin-for-pin sheets. New flags appropriate; old compatibility not established wrong in all cases.

### 49. A#41, A#42 — `atari-cart` (400, 800, also 800 right slot and XL/XE)

**NEW: CORRECT. OLD: WRONG numbered-row-on-top view.**

Changed claim: numbers on top ? `rowA: 'bottom'` (A-S on top); 600XL FSM Fig. 1-11 added.

Source checked: ATARI600 printed1-14/n23; SAMSXE printed25/n6 J4A.

FSM labels letters CONSOLE TOP, numbers CONSOLE BOTTOM; Sams front view J4A agrees. New bottom numeric row propagated to400/800/rightslot/XL/XE instances in evaluated diff.

### 50. A#47 — `atari-eci`

**NEW: CORRECT. OLD: WRONG numbered-row-on-top view.**

Changed claim: numbers on top ? `rowA: 'bottom'`.

Source checked: SAMSXE printed25/n6 J4B.

Front view lettersA-H above numeric1-7. New rowA bottom matches.

### 51. S#138-142, RMa#569 — `atari-power` 1, 2

**NEW: CORRECT. OLD: UNPROVEN9-11 tolerance, not disproved.**

Changed claim: 9-11 V AC ? 9 V AC.

Source checked: ATARIPOWER printed1-6.

Source explicitly says9VAC input. New nominal9VAC across the two contacts matches; no load-dependent9-11 range specified.

### 52. RA#43, 44 — `atari-power` contacts

**NEW: CORRECT. OLD: UNPROVEN center/sleeve identity.**

Changed claim: — ? summary says centre/sleeve not sourced (record already `verify`).

Source checked: ATARIPOWER printed1-6 and cited schematic references.

Source describes9VAC but does not define external barrel physical contact names. Existing verify plus new caveat properly distinguishes numeric drawing assumptions.

### 53. RMa#552,563,584,594 — controller pin 7

**NEW: CORRECT. OLD: UNPROVEN4.9-5.0 pass/fail interval.**

Changed claim: 4.9-5.0 V ? +5 V (Sams measured 4.9 V).

Source checked: ATARITRN printedIII.24/PDF477; SAMSXE schematic/n3 reference.

Controller supply nominal+5V;4.9V is one Sams measurement. New nominal+5V does not invent a tolerance. Allchangedcontroller7 instances checked in leaf diff.

### 54. RMa#168, 169 — `antic` 14, 19

**NEW: CORRECT. OLD: UNPROVEN directions.**

Changed claim: bidir ? `verify: true`.

Source checked: ANTIC printed1-9 Fig1-4.

Pin14 R/W and19 A14 are named without direction. Newflags correctly preserve uncertainty rather than assert input/output from the drawing.

### 55. RA#108-113 — ANTIC, GTIA, POKEY, FREDDIE replacements

**NEW: CORRECT. OLD: UNPROVEN cross-family/maker pin compatibility, not disproved.**

Changed claim: — ? `verify: true`.

Source checked: ATFAQ section1.11; SAMSXE pin/part diagrams; REPLACEMENTS.

BothANTIC, bothGTIA, POKEY, FREDDIE replacement entries now flagged. FAQ supplies identities/variants; it is not six complete pin comparison proofs. Metadata downgrade correct.

### 56. RMa report — SIO OS Manual Fig. 9-4 label

**NEW: CORRECT. OLD: WRONG printed145 label.**

Changed claim: p. 145 ? p. 146.

Source checked: ATARITRN PDF131.

Figure9-4 page footer146 clearly visible. New146 matches.

### 57. F4, A#170 — ColecoVision U2

**NEW: CORRECT. OLD: WRONG to use2764 stock pin table.**

Changed claim: shared `rom2764` ? new `rom9464-cv` record (2 NC, 20 A11, 22 /EP, 23 A12, 26 VCC; 1/27/28 tied +5 V); symptom points to it; `rom2764` location says "only after WJ4/WJ5 conversion".

Source checked: CV sheet9/PDF9.

Traced all28new9464C pins:2 NC,20 A11,22 /EP,23 A12,26 VCC;1/26/27/28 tied5V. WJ4/WJ5 conversion note agrees. Chip location and symptom point to newrecord; old2764 entry now conversion-only. NC statements for1/27/28 are schematic-symbol NC designations, distinct from board ties.

### 58. A#31, 48, 49 — `cv-expansion`, `cv-cart`, `adam-cart` (and `adam-expansion`)

**NEW: CORRECT. OLD: UNPROVEN physical orientations.**

Changed claim: orientation assumed ? `verify: true`, summaries say unchecked.

Source checked: ADAM PDF20,30; CV sheet2; cited CV technical manual links.

All4records cv-expansion,cv-cart,adam-cart,adam-expansion now flagged and descriptions explicit. Logical pin tables/connector symbols do not establish front-view end/row orientation.

### 59. RMa#620 — `adam-cart` 22

**NEW: CORRECT. OLD: UNPROVEN address range in cited table.**

Changed claim: $A000-$BFFF ? range removed on the ADAM.

Source checked: ADAM PDF30 sec2.1.9e.

Pin22 CS2 fromLS138 is explicit; A000-BFFF is not in this table. Removing range onADAM is supported; this does not prove that range electrically false.

### 60. RMa#622, 623 — `adam-controller` 2, 6 (all 2.2 V pins)

**NEW: CORRECT. OLD: UNPROVEN2.2V idle minimum forADAM.**

Changed claim: above 2.2 V idle ? removed on the ADAM.

Source checked: ADAM PDF35 and Table1 DC characteristics.

Controller pins1-4/6 indirect inputs refer toTable1 (VIHmin2.0V). Threshold is not measured idle voltage. New removal avoids transferring ColecoVision2.2V test toADAM.

### 61. RMb#189 — `ula_zx81` 36 A3′

**NEW: CORRECT. OLD: UNPROVEN bidir direction.**

Changed claim: bidir ? `verify: true`.

Source checked: ZXSC SRC049.

ULA36 A3prime links ROM-side address through resistor; net connectivity alone does not prove both directions. verify:true properly preserves unresolved electrical direction.

### 62. RA#121 — `rom_zx81` 20

**NEW: CORRECT. OLD: ZX81-specific portion CORRECT; TS1500 extrapolation UNPROVEN.**

Changed claim: ZX81 wiring in pin text ? generic; ZX81/TS1000 wiring in summary, TS1500 "not confirmed".

Source checked: ZXSC SRC049.

ULA13 throughR28 680ohm toROM20 and edge23B is visible. New genericpin plus qualified ZX81/TS1000 summary matches; TS1500 explicitly not confirmed.

### 63. RA#119, 123, 128-130 — 2C210E, AT28C adapter, 6C001E-7, -5/-6, 5C102E/5C112E

**NEW: CORRECT. OLD: UNPROVEN universal compatibility, not disproved.**

Changed claim: — ? `verify: true`.

Source checked: ZXRETRO; OSHPARK project22vOyf1p; SPECTRUMULA.

All5entries flagged:2C210E,AT28adapter,6C001E-7,-5/-6,5C102E/5C112E. OSHPARK restricts adapter toIssue3. Spectrum source describes board-revision constraints, but not all chip pin tables. Flagging uncertainty is appropriate.

### 64. RA report — Sinc-Link source

**NEW: CORRECT. OLD: Oldn9 not the start of cited adapter article.**

Changed claim: /page/n9 ? /page/n8.

Source checked: SINCLINK Vol3No5/n8 printed9.

Opened exact new page: heading ZX81 ROM ADAPTER2764 and24to28pin wiring diagram. Newn8 correctly reaches article; this is distinct from Vol7No1 power article.

### 65. A#56 — `ts2068-dock`

**NEW: CORRECT. OLD: WRONG orientation versus cited front view.**

Changed claim: odd on top, pin 1 right ? `rowA: 'bottom'`, pin 1 left (even on top, 2 upper left).

Source checked: TM printed59/PDF67 Fig2.4.2-2.

Even2..36 onupper component row, odd1..35 lower row; bothstart left. New rowA bottom and defaultleft agree. No half-turn applied now.

### 66. S#200, 202 — TS2068 supply, `ts2068-power` 2, rail

**NEW: CORRECT. OLD: UNPROVEN unloaded condition, not disproved.**

Changed claim: "about 21 V unloaded" ? "SUM: about 21 V from the stock adapter".

Source checked: SUM Vol4No1/n4 printed5; TM supply text.

SUM reports supply output about21V and operating nearer15-16V; it does not say unloaded. All3new supply/connector/rail phrasings remove that unsupported condition.

### 67. S report — SUM v4 n1 link

**NEW: CORRECT. OLD: WRONGn5 anchor for page5 article.**

Changed claim: /page/n5 ? /page/n4.

Source checked: SUM Vol4No1/n4 printed5.

Page image has 2068 Power Supply Make It Cooler and Quieter and printed5. Newn4 is right.

### 68. F21 — `ay8912` 15 probe

**NEW: CORRECT. OLD: Machine-specific rates may be right, but not portable chip-pin facts.**

Changed claim: per-machine rates ? "see the machine test points".

Source checked: AY8912 PDF11 sec2.3.

CLOCK pin15 is timing reference input. New steadyclock/see-machine wording agrees. No claim that every removed machine frequency was false.

### 69. A#57 — `ti994a-cartridge`

**NEW: CORRECT. OLD: UNPROVEN orientation.**

Changed claim: — ? `verify: true`.

Source checked: TIDATA PDF64 J500; Servicing Manual printed105/PDF114 GROM connector drawing.

Schematic proves logical wiring. The servicing diagram gives a FRONT arrow along the connector, but does not establish which mating row is top in the app view. New verify flag is appropriate; old orientation not proven wrong.

### 70. A#137 — `psg76489` 14

**NEW: CORRECT. OLD: SN76494 assertion CORRECT; SN94624 extrapolation UNPROVEN.**

Changed claim: SN94624 divider and per-machine probe ? SN76494 sourced, SN94624 stated as unchecked, `verify: true`, probe generic.

Source checked: SN PDF1,5.

Pin14clock,4MHz AN limit and76494 footnote500kHz/no divide8 explicit. New text accurately separates those proven facts from uncheckedSN94624; genericprobe andflag are appropriate.

### 71. A#135, F3 — `vdp9918` → 9928A/9929A

**NEW: CORRECT. OLD: Drop-in classification WRONG; old explanatory note already CORRECT.**

Changed claim: pin-compatible ? adapter.

Source checked: VDP printed3-11/PDF54 sec3.7.2.

Pins35/36/38 become B-Y/Y/R-Y, unlike9918A EXTVDP/composite/CPUCLK. New adapter class correctly requires color-difference stage; samepackage does not mean direct functional substitution.

### 72. A#136 — → TMS9118/9128/9129

**NEW: UNPROVEN. OLD: Old drop-in category misleading; pin-difference content supported by F18A author.**

Changed claim: pin-compatible ? adapter, `verify: true`; F18A Wayback copy added.

Source checked: F18A live page recovered by web search; exact Wayback URL failed.

Author's table supports9118 pin37 NC and9128/29 CPUCLK plus differences35-38. Newadapter/verify downgrade justified. Added20250120011023 archive copy could not be opened bycurl,Python,orweb; cannot certify entire row's source-repair claim. Failure is source access, not proof the pin table is false.

### 73. RA#138, 139, 143 — SN94624N, SN76494N, MCM6810 subs

**NEW: CORRECT. OLD: UNPROVEN universal substitutions, not disproved.**

Changed claim: — ? `verify: true`.

Source checked: SN PDF1/5; SAMSTI printed18/n19 semiconductor crossreference.

All3rowsSN94624/TMS9919,SN76494,MCM6810/NTE/ECG now flagged. Sams proves replacement crossreferences; TI proves76494 clockdifference, notSN94624pin9 compatibility. Flags honestly preserve missingproof.

### 74. rule 6 — → SN76489AN

**NEW: CORRECT. OLD: Wrong as drop-in; oldnote already explained clock/audio limitations.**

Changed claim: pin-compatible ? adapter (3.58 MHz clock, pin 9 lost).

Source checked: SN PDF1,5; TIDATA PDF64 U511.

AN pin9 NC and divide8 require clockchange from447kHz to3.58MHz for samepitch. Newadapter label/instruction captures existing limitations. Does not provide a complete audio-mix redesign.

### 75. RA#142, F16 — `romconsole` → TMS2532

**NEW: CORRECT. OLD: WRONG direct substitution on grounded21 socket.**

Changed claim: pin-compatible ? adapter: lift pin 21 to +5 V; 2532 sheet added.

Source checked: TIMEM PDF207-208 printed6-11/12; TIDATA printed60/PDF62 U610/U611.

2532pin21VPP must5V inread; console4732select21 is grounded. Newlift21/tie5V adapter is required. Pin18A11 and20PD/PGM agree; even/oddROM devices checked.

### 76. RMb#695, S#204-206, F7 — `ti994a-power` 1, 2, 4

**NEW: CORRECT. OLD: WRONG center-tap name; oldnominalranges UNPROVEN.**

Changed claim: centre tap; 17-19 / 8-9 V ranges ? secondary tap (26.40 V tapped at 17.85 V); nominal with Sams values; pins stay `verify`.

Source checked: SAMSTI printed21/PDF33 T1; TIDATA powerpin references.

Whole winding26.40VAC tapped at17.85V is unequal sections, remainder8.55V. Newsecondarytap plusabout18/8.5/26nominals agrees. Existingpinverify flags correctly preserve connector/labelconflicts.

### 77. RMb#699 — `ti994a-io` 41

**NEW: CORRECT. OLD: WRONG IAQ-only label.**

Changed claim: IAQ ? IAQHA (IAQ OR HOLDA), conflict note updated.

Source checked: TIDATA printed60/PDF62.

IAQ andHOLDA feedOR gateU605 and output labelledIAQHA I/O PORT#41. NewIAQHA (IAQ OR HOLDA) matches actualschematic.

### 78. fc-a-x1 — cia6526 pin 20

**NEW: WRONG. OLD: CORRECT VCC/+5V identity; old4.95-5.10 range separately unproven.**

Changed claim: Vcc, +5 V supply ? Vss, ground.

Source checked: C64 printed420/PDF439 AppM pinconfiguration.

Pin20 labelledVCC; pin1VSS. Newpin20Vss/typeground/probe0V directly contradicts source. Restorepin20VCC/power/+5V. HIGH: using it asground can short5V or give wrongdiagnosis.

### 79. fc-a-x2 — cpu6502 pin 8

**NEW: WRONG. OLD: CORRECT VCC/+5V.**

Changed claim: Vcc, +5 V ? Vss, ground.

Source checked: MOS6500 printed/PDF10 6502package; SATHER4 Fig4.1.

Pin8VCC; pins1/21VSS. Newpin8Vss/typeground/probe0V directly contradicts source. Restorepin8VCC/power/+5V. HIGH across everymachine sharingcpu6502; using supply asground can short5V.

## Source index

Aliases below identify independently opened documents. Source filenames map to original URLs in the download manifests. Generated PNG/JPG page images are retained beside them.

- **TED**: [19b76c71e5d2.pdf](19b76c71e5d2.pdf); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf).
- **ZC16**: [013b59764a21.pdf](013b59764a21.pdf); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf).
- **C16**: [bac718dedc8d.pdf](bac718dedc8d.pdf); [original source](https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf).
- **C64**: [ac378202cb58.pdf](ac378202cb58.pdf); [original source](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf).
- **C128**: [132d8e55e673.pdf](132d8e55e673.pdf); [original source](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf).
- **C128SM**: [6e57feeaa315.pdf](6e57feeaa315.pdf); [original source](https://archive.org/download/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08.pdf).
- **MAP1**: [1e86d98c05d1.jpg](1e86d98c05d1.jpg); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-1.jpg).
- **MAP2**: [b6f9d0ee44e4.jpg](b6f9d0ee44e4.jpg); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg).
- **BAUER**: [a29daee842dd.html](a29daee842dd.html); [original source](http://www.zimmers.net/cbmpics/cbm/c64/vic-ii.txt).
- **VIC6560**: [ac65d3072f91.zip](ac65d3072f91.zip); [original source](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6560.zip).
- **VIA**: [439b3ac6d9f4.zip](439b3ac6d9f4.zip); [original source](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6522.zip).
- **CIA8520**: [61846f5f39e9.pdf](61846f5f39e9.pdf); [original source](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/8520_datasheet.pdf).
- **PETPOWER**: [2f033ab2da17.gif](2f033ab2da17.gif); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-9.gif).
- **PETIEEE**: [8f54174ed024.gif](8f54174ed024.gif); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/IEEE-488_pinout.gif).
- **PETUSER**: [cb2ce8950689.gif](cb2ce8950689.gif); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/PET_User_Port_pinout.gif).
- **PETCASS**: [49510723ecc7.gif](49510723ecc7.gif); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/Datasette_pinout.gif).
- **REG7805**: [64d6aa14cb6e.pdf](64d6aa14cb6e.pdf); [original source](https://www.ti.com/lit/ds/symlink/ua78.pdf).
- **PLUSPS**: [ac41ce3b8e5f.gif](ac41ce3b8e5f.gif); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/powersupply.gif).
- **PLUS4**: [f61a0e6937ab.pdf](f61a0e6937ab.pdf); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf).
- **INTEL**: [a6bfa54dea43.pdf](a6bfa54dea43.pdf); [original source](https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf).
- **TIMEM**: [e04ea0580214.pdf](e04ea0580214.pdf); [original source](http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf).
- **MOS6500**: [c08f4570b107.pdf](c08f4570b107.pdf); [original source](http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf).
- **IIROM**: [Apple_II_Reference_Manual_1979_Apple-n104.jpg](Apple_II_Reference_Manual_1979_Apple-n104.jpg); [original source](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/page/n104.jpg).
- **MODEL3**: [4f931c06b7ee.pdf](4f931c06b7ee.pdf); [original source](https://archive.org/download/Model_III_Technical_Reference_Manual_1981_Tandy/Model_III_Technical_Reference_Manual_1981_Tandy.pdf).
- **SATHER7**: [Understanding_the_Apple_IIe-n169.jpg](Understanding_the_Apple_IIe-n169.jpg); [original source](https://archive.org/download/Understanding_the_Apple_IIe/page/n169.jpg).
- **SATHER4**: [Understanding_the_Apple_IIe-n75.jpg](Understanding_the_Apple_IIe-n75.jpg); [original source](https://archive.org/download/Understanding_the_Apple_IIe/page/n75.jpg).
- **IICTRM234**: [Apple_IIc_Technical_Reference_Manual-n261.jpg](Apple_IIc_Technical_Reference_Manual-n261.jpg); [original source](https://archive.org/download/Apple_IIc_Technical_Reference_Manual/page/n261.jpg).
- **AY3600**: [325fc766aaaa.pdf](325fc766aaaa.pdf); [original source](http://www.bitsavers.org/components/gi/_dataSheets/AY-5-3600.pdf).
- **DISKPHOTO**: [8d7e1350e82b.jpg](8d7e1350e82b.jpg); [original source](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Photos/Apple%20Disk%20II%20Drive%20-%20Analog%20card.jpg).
- **DISKSCH**: [b4a189b79f73.pdf](b4a189b79f73.pdf); [original source](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Schematics/Apple%20Disk%20II%20-%20Schematics%20Analog%20Board%20050-0007-H.pdf).
- **DISKSAMS**: [f43e43da7ea9.pdf](f43e43da7ea9.pdf); [original source](https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Sams%20Technical%20-%20Disk%20II.pdf).
- **DUOCABLE**: [aaef0bd2eea7.pdf](aaef0bd2eea7.pdf); [original source](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20DuoDisk%205.25/Documentation/Apple%20DuoDisk%20-%20Cable%20Specifications.pdf).
- **VIC20**: [d7aeb55a1db1.pdf](d7aeb55a1db1.pdf); [original source](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf).
- **DRIVE1541**: [ea23141d7f92.pdf](ea23141d7f92.pdf); [original source](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf).
- **ATARI600**: [Atari600XLComputerFieldServiceManualRev1-n23.jpg](Atari600XLComputerFieldServiceManualRev1-n23.jpg); [original source](https://archive.org/download/Atari600XLComputerFieldServiceManualRev1/page/n23.jpg).
- **SAMSXE**: [samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams-n6.jpg](samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams-n6.jpg); [original source](https://archive.org/download/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n6.jpg).
- **ATARIPOWER**: [c96f410d2c18.jpg](c96f410d2c18.jpg); [original source](https://archive.org/download/atari400800fieldservicemanualmay1983/page/n18.jpg).
- **ANTIC**: [e21c69318feb.jpg](e21c69318feb.jpg); [original source](https://archive.org/download/atari400800fieldservicemanualmay1983/page/n21.jpg).
- **ATARITRN**: [b0e0675ed354.pdf](b0e0675ed354.pdf); [original source](http://www.bitsavers.org/pdf/atari/400_800/CO16555_Atari_Home_Computer_Technical_Reference_Notes_1982.pdf).
- **CV**: [d1c1ec183725.pdf](d1c1ec183725.pdf); [original source](https://colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf).
- **ADAM**: [6a34031e86ed.pdf](6a34031e86ed.pdf); [original source](https://colecovisionadam.com/Coleco/adam/Documents/Manual/Coleco_ADAM_Technical_Reference_Manual.pdf).
- **ZXSC**: [87d5d411ac3d.gif](87d5d411ac3d.gif); [original source](https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif).
- **SINCLINK**: [513511703a3f.jpg](513511703a3f.jpg); [original source](https://archive.org/download/SincLink/Sinc-Link%20Vol%2003%20No%205/page/n8.jpg).
- **TM**: [69a19a9cf63e.pdf](69a19a9cf63e.pdf); [original source](https://k1.spdns.de/Vintage/Sinclair/82/Timex%20Sinclair%202068/Tech%20Specs%20and%20Repair/Timex%20Sinclair%202068%20-%20Technical%20Manual.pdf).
- **SUM**: [SUM_v4_n1-n4.jpg](SUM_v4_n1-n4.jpg); [original source](https://archive.org/download/SinclairTimexUsersMagazine/SUM%20v4%20n1/page/n4.jpg).
- **AY8912**: [ay8912.pdf](ay8912.pdf); [original source](https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf).
- **SN**: [6323cec3ce82.pdf](6323cec3ce82.pdf); [original source](https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/SN76489.pdf).
- **VDP**: [5d8f23b4da73.pdf](5d8f23b4da73.pdf); [original source](https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf).
- **TIDATA**: [c912cdb95e9b.pdf](c912cdb95e9b.pdf); [original source](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf).
- **SAMSTI**: [1fc80a458623.pdf](1fc80a458623.pdf); [original source](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/computerfacts/Sams%20TI994A%20ComputerFacts.pdf).
- **ENH**: [a15a3345c069.jpg](a15a3345c069.jpg); [original source](https://archive.org/download/Sams_Computer_Facts_Apple_IIe/page/n4.jpg).
- **IIEAUX**: [92face522dd7.jpg](92face522dd7.jpg); [original source](https://archive.org/download/Apple_IIe_Technical_Reference_Manual/page/n231.jpg).
- **IICGLU**: [e34712222bad.jpg](e34712222bad.jpg); [original source](https://archive.org/download/Apple_IIc_Technical_Reference_Manual/page/n273.jpg).
- **ATFAQ**: [dfff473e677f.html](dfff473e677f.html); [original source](http://www.faqs.org/faqs/atari-8-bit/faq/section-12.html).
- **ZXRETRO**: [3ee97dc76ed0.html](3ee97dc76ed0.html); [original source](https://retro.engineer/projects/2021-03-13_Sinclair_ZX81_A/).
- **OSHPARK**: [9e01250a8191.html](9e01250a8191.html); [original source](https://oshpark.com/shared_projects/22vOyf1p).
- **SPECTRUMULA**: [e562b56fd92e.html](e562b56fd92e.html); [original source](https://www.spectrumforeveryone.com/?p=59).

- **CARPS**: [Ray Carlsen, ALL ABOUT THE COMMODORE POWER SUPPLY](https://portcommodore.com/rcarlsen/cbm/c64/C64%20PS/CBM%20PS.txt), web-opened full original, paragraphs on overvoltage and nominal feeds. Local curl406 retained.
- **CARSID**: [Ray Carlsen, 8580 to 6581](https://portcommodore.com/rcarlsen/cbm/c64/8580%20to%206581.txt), web-opened original, supply/filter/board changes.
- **F18A**: [Matthew Hagerty, Pin-out and Compatibility](https://dnotq.io/f18a/pinout.html), primary author table recovered with web search. The exact added Wayback copy was unavailable.
- **REPLACEMENTS**: full source URLs, new verify flags, notes, and old/new classifications are in data-new.json/data-old.json and leaf-diff.txt. Download attempts for these cited sources are in remaining.json and supplement.json. Actual sources inspected include C64Wiki TED/VIC/CIA, Atari FAQ1.11, OSHPARK project page, SpectrumForEveryone ULA article, Apple enhanced-board sheet, and SamsTI semiconductor crossreferences. These do not establish all package-pin comparisons; only the uncertainty downgrades are accepted.

Final verification: all79 numbered entries and79 decisions counted. final-state-check.json reports no chip/connector/power/quickref data changed since the review snapshot. Additional opened sources: [TI servicing manual](tism.pdf), printed105/PDF114; [Sams CD6 printed8](samsdisk-n19.jpg); [Sams CC10 replacement table](samsiie-n7.jpg); [Sams CC17 RAM bank](samsc64-n8.jpg). Download attempts are in last-downloads.json.
