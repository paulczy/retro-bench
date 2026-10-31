# fa-sinclair-rest: adversarial fix review

Scope: every data table row in factcheck-full-fixes-a.md lines 279-435, plus Additional corrections (fa-sinclair-rest). One table row is one item, including rows that group several pins or steps. Total: 108. Disagreement bullets and Not fixed prose are context, not additional table items.

No source, app, or documentation files were modified. Nothing was committed. All review artifacts are under .factcheck-tmp/fixreview2/.

Inspected actual git diff (fa-sinclair-rest/scope.diff and data.diff), then evaluated the data scripts in a read-only Node VM to inspect the fully resolved records and inherited fields (records.json). Independently opened the documents. Curl -L -A Mozilla/5.0 was attempted into the assigned directory. Windows Schannel failed HTTPS with SEC_E_NO_CREDENTIALS; successful HTTPS downloads used Python urllib with the same browser user agent. PDFs were extracted with pdftotext -layout. Relevant scanned pages were rendered with pdftoppm -f N -l N -r 110 -png and visually inspected. The manifest records original URLs and download results. Archive page-view wrappers alone were not accepted as document evidence: manual PDFs were downloaded separately.

CORRECT on a flagged item means an honest, visible quarantine, not certification of the quarantined claim. WRONG covers proven false data or a claimed quarantine that never reaches the technician. UNPROVEN states the exact remaining evidence gap. Source-scope cleanup does not imply an independently true fact was wrong.

Executed the actual extracted viewPower function with resolved TS1000 rails and test points, toggled verify, and asserted identical HTML. See verify-render-proof.json and verify-render-proof.html. First-ten and clock renderers do emit CHECK. TS1500 rails also have visible Not sourced for this board notes; TS1000 rails do not.

Principle mapping: all findings map to prove-it-works. Incorrect shared chip identity, a retained wrong probe location, and ineffective quarantine flags also map to fix-root-causes. No race or shared-state mutation problem was established; serialize-shared-state-mutations is not applicable.


| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 108 | 98 | 7 | 3 |

## Per-item decisions

### 001. Log line 283: 01:162 / dram4116 pin 14 DOUT
**CORRECT.** s013 PDF105 printed V-40 DATA OUTPUT CONTROL explicitly covers read-modify-write/delayed-write driven output, early-write Hi-Z and /CAS-high Hi-Z. Needed: old otherwise-Hi-Z excluded driven cases.

### 002. Log line 284: 02:184-187 / zx80 / zx81 / +2 / +3 CPU clock scope
**CORRECT.** s004 ZX80 X1 6.5 MHz/divider; s008 ZX81 X1/CPU path; s022 PDF2 +2 3.54690 MHz; s025 +3 specification 3.54690 MHz. Named machine sources support retained rates separately from Z80 voltage sheet s003. No numeric change needed.

### 003. Log line 285: 26:165 / spectrum firstTen 4
**CORRECT.** s015 Retroleum No Boot/lower-RAM section explicitly says investigate either rail more than1 V out and keep checks short because new TR4/5 may cook. Needed repair-threshold distinction from service-manual tolerance.

### 004. Log line 286: 32:54 / zx80-edge B2 expect
**CORRECT.** Viewed s004.png input9 V-11 V and s008.png SRC049 input+7 V to11 V. Resolved zxEdgePins applies the proper range separately. Needed: ZX80 inherited ZX81 lower limit.

### 005. Log line 287: 32:74 / zx80 firstTen 3
**CORRECT.** s004 establishes regulator wiring, not exhaustive low-rail fault attribution. Step3 verify present and actually rendered CHECK by firstTenBlock. Honest quarantine of unproved diagnosis; needed.

### 006. Log line 288: 32:76 / zx80 rail +9 V where
**CORRECT.** s004 shows input connection; rail location now removes terminal assertion. Removal present. Source cleanup only: tip polarity independently supported by s001 PDF6.

### 007. Log line 289: 32:85 / zx80 firstTen 1
**CORRECT.** s001 PDF6 gives9 V/600mA/tip-positive, no14 V unloaded. Step1 actually loses14 V clause. Needed for this step source; separate supply note still attributes it to k1.

### 008. Log line 290: 32:88 / zx80 firstTen 6
**CORRECT.** s001 PDF17 supports Q->NEW, NEWLINE clearing, not keyboard-only diagnosis. New suspect wording and visible CHECK honestly quarantine inference. Needed.

### 009. Log line 291: 32:100 / ula_zx81 pin 12 probe
**CORRECT.** s009 Rea /MREQ-A14 table supports selection, not stuck-HIGH=no-RAM diagnosis. Actual pin12 probe removes diagnosis. Needed.

### 010. Log line 292: 32:103 / ula_zx81 pin 15 probe
**CORRECT.** s009 Rea internal-control-port section explicitly OUT FE enables NMI, OUT FD disables. New pin15 probe conditions pulses on enabled generator. Needed: display-running condition was incomplete.

### 011. Log line 293: 32:120 / ula_zx81 pin 35
**CORRECT.** Viewed s008 SRC049 external network: pin35/X1 6.5 MHz/C6 100 pF/C7 47 pF/R4 18K. New text matches. Needed: X1 not sole external part.

### 012. Log line 294: 32:144 / zx81 clock Field rate
**CORRECT.** s008 identifies pin22 USA/UK but not numerical field rates. Clock verify now visible via clocksBlock. Honest quarantine, not proof of50/60 Hz. Needed.

### 013. Log line 295: 32:191 / zx81 firstTen 3
**CORRECT.** s008 supports nominal+5 V, not tolerance/hot-chip fault diagnosis. New step3+5 V and visible CHECK correctly quarantine. Needed range removal.

### 014. Log line 296: 32:194 / zx81 rail +9 V
**CORRECT.** s008 explicitly marks input+7 V to11 V DC. New rail note quotes that and removes dropout claim. Needed source cleanup.

### 015. Log line 297: 32:195 / zx81 rail +5 V note
**CORRECT.** s008 gives wiring, not hot-regulator attribution. Rail diagnostic note absent in diff/resolved data. Needed removal.

### 016. Log line 298: 32:224 / ula_spectrum pin 19 KB0
**CORRECT.** Viewed issue3.png KB pull-ups R65-R69; s012 PDF14 prose saysR64-R68, PDF45 parts saysR65-R69. New Issue3-specific text and conflict are accurate. Needed.

### 017. Log line 299: 33:8 / spectrum firstTen 1 ifNot
**CORRECT.** s012 PDF26 supports voltage check, not over900mA short diagnosis. Both that and polarity clause removed from step1. Needed source cleanup; polarity itself independently provable.

### 018. Log line 300: 33:9 / spectrum firstTen 2 ifNot
**CORRECT.** s012 PDFs26/31 support regulator checks, not wrong-polarity failure attribution (s015 does). Clause removed from step2. Needed citation cleanup.

### 019. Log line 301: 33:10 / spectrum firstTen 3 ifNot
**CORRECT.** s012 PDF30 sec6.1 supports TR4/TR5 checks/change both if TR4 fails again; s013/s015 support restoring bias before new original RAM. New text drops coil-buzz equivalence/certain death. Needed.

### 020. Log line 302: 33:12 / spectrum testPoint CPU clock scope
**CORRECT.** s016 WoS states3.5 MHz/69888 T states; s012 PDFs26/32 contain conflicting/rounded labels. Scope note explicitly names WoS, Clocks cites it. Retained3.5 MHz justified; no rate correction needed.

### 021. Log line 303: 33:13 / spectrum firstTen 7
**CORRECT.** s012 PDF26 lists lines to check, not all static idle states/power-on trace. Step7 now visibly CHECK. Honest quarantine needed.

### 022. Log line 304: 33:14 / spectrum firstTen 8
**CORRECT.** s012 PDF27 supports isolation/replacement order, not every ULA pin/rate in step8. Added visible CHECK honestly quarantines remaining details. Needed.

### 023. Log line 305: 33:17 / spectrum rail +12 V note
**CORRECT.** s015 lower-RAM section says out-of-whack rails may damage all4116s. New +12 V note removes claim low+12 V necessarily kills RAM. Needed.

### 024. Log line 306: 33:19 / spectrum rail -5 V note
**CORRECT.** s015 same paragraph supports damage risk. New -5 V note is defensible; old endangers was already a risk statement, so change not essential.

### 025. Log line 307: 33:21 / spectrum firstTen 6
**CORRECT.** s016 proves3.5 MHz; s012 PDF32 supports component checks, not measured full0-5 V swing. Step names WoS and visibly CHECK flags residual waveform claim. Needed quarantine.

### 026. Log line 308: 33:22-24 / spectrum Y, U, V scope notes
**CORRECT.** s012 PDF31 drawings supply waveforms; s016 gives224 T states/3.5 MHz=64 us. New notes separate sources and remove logo attribution/silent misprint correction. Needed.

### 027. Log line 309: 34:7-10 / spectrum128-mic T/S, spectrum128-tv 1/2
**CORRECT.** s020/s027 external-connection guidance does not establish individual MIC/RF terminal assignments. All four affected resolved pins carry verify; connector renderer emits CHECK. Honest quarantine needed.

### 028. Log line 310: 34:25-28 / spectrum128-edge A15-A18
**CORRECT.** All resolved128 A15-A18 carry verify; s020 text does not establish borrowed48K video pin routing. Per-pin CHECK rendered. Honest quarantine, not proven assignments.

### 029. Log line 311: 34:56 / spectrum128-edge B20
**CORRECT.** s020 PDF25 sec6.1 says -5 V for expansion; PDF40 parts IC6-13/15-22=4164. New B20 -5 V nominal/expansion-only matches. Needed instead of4116 Vbb limits.

### 030. Log line 312: 34:58 / spectrum128-edge B22
**CORRECT.** s020 PDF33 printed4.4 specifiesIC33 pin14 +12 V +/-0.5 V. New B22+11.5to+12.5 V and added reference match. Needed.

### 031. Log line 313: 34:64, 34:65 / spectrum128 firstTen 1, 2
**CORRECT.** s020 PDF32 printed4.3 supportsC50+9 V +/-2 V/below7 V regulator behavior, not pack/socket diagnosis. Step1 deletes diagnosis; step2 visible CHECK for unproved hot-regulator rule. Needed.

### 032. Log line 314: 34:67 / spectrum128 firstTen 4
**WRONG.** HIGH: step4 still sends probe to IC34 leg1 for -12 V, although its warning names correct IC33. s020 PDF25 sec6.1 assigns -12 V toIC33; PDF40 parts IC33=1488/IC34=1489. Opened maker mc1488.pdf p1: negative-supply pin1. Right location IC33 pin1. CHECK does not turn IC34 into a -12 V point; incomplete fix.

### 033. Log line 315: 34:69, 34:70 / spectrum128 firstTen 6, 7
**CORRECT.** s020 PDF33 gives rates/locations, not replacement order/conclusive fault rules. Steps6/7 now visibly CHECK. Honest quarantine needed.

### 034. Log line 316: 34:78, 34:79 / spectrum128 crystal / CPU clock scope notes
**CORRECT.** s020 PDF36 oscillogramsC/D are waveform evidence, not replacement instructions. Both replacement-order clauses removed from scope notes. Needed cleanup.

### 035. Log line 317: 34:82, 34:148 / +2 / +3 firstTen 1
**CORRECT.** Viewed s022 PDF8 flowchart and s025 flowchart: BREAK during power connection, picture/sound/tuneTV. Bars/tone/user-manual clauses removed. Narrower then-tuneTV claim fits. Needed.

### 036. Log line 318: 34:84, 34:150 / +2 / +3 firstTen 3
**CORRECT.** s022 PDF8 printed3 asks Picture/sound on TV?; s025 same. New picture and sound matches, unlike repeating-tone/colour-bars specifics. Needed.

### 037. Log line 319: 34:100, 34:101, 34:139 / spectrumplus2-edge A3, A4, B22
**CORRECT.** s022 PDF4/5 diagrams/edge table label5 V/9 V/12 V, without48K DRAM tolerances. New nominal +2A3/A4/B22 match. Needed.

### 038. Log line 320: 34:108 / spectrumplus2-edge A13
**UNPROVEN.** Original cited s022 PDF4/5 gating transistor designator too coarse to conclusively read. Independently downloaded p2-main.jpg Ian Worsley2001 redraw agreesTR7, but is not the cited maker scan. Cannot certify substitution solely against cited source; reviewer is not proof.

### 039. Log line 321: 34:110-113 / spectrumplus2-edge A15-A18
**CORRECT.** Viewed s022 PDF5 printed7 edge table A15-A18 NOT USED. Resolved +2 pins nc/N-C with no inherited voltage expectations. Needed board-specific correction.

### 040. Log line 322: 34:119 / spectrumplus2-edge A25
**CORRECT.** s022 PDF4 ROMSEL series resistor R24/680R; PDF7 printed5 parts list R24 among680 ohm parts. New A25 matches, corroborated by p2-main.jpg. Needed instead of inheritedR33.

### 041. Log line 323: 34:131 / spectrumplus2-edge B13
**CORRECT.** s022 diagram takes INT toB13 but no exact20ms period. New once-per-frame avoids unsupported precision. Needed;48K timing does not establish exact+2 period.

### 042. Log line 324: 34:137 / spectrumplus2-edge B20
**CORRECT.** s022 PDF7 parts IC17-32 KM4164B-15; PDF4/5 converter/edge provide -5 V for expansion. New B20 distinguishes RAM and removes4116 tolerance. Needed.

### 043. Log line 325: 34:140 / spectrumplus2-edge B23
**CORRECT.** Viewed s022 PDF5 printed7 edge B23 12 V AC and PDF4 converter tap. Resolved B23 name/description match; no inherited negative expect remains. Needed instead of steady -12 V label.

### 044. Log line 326: 34:152 / +3 firstTen 5
**CORRECT.** s025 diagnostic flowchart asks menu appears, not A:/M: listing. New Opening menu only matches. Needed unsupported screen-content removal.

### 045. Log line 327: 34:154 / +3 firstTen 7 ifNot
**CORRECT.** s025 printed3 requires BREAK/reset test card beforeQAZMLP; printed17 describes separate expansion serviceROM, border-colour fallback, address/bank once running. New distinction correct and CHECK visible. Needed sequence correction.

### 046. Log line 328: 35:73 / zx81 clock CPU
**CORRECT.** s009 describes ULA/CLK pin14/filter/TR2, not a measured whole CPU-pin6 rate. New clock CHECK rendered. Honest quarantine; s008 independently supports wiring.

### 047. Log line 329: 35:75-77, 38:243 / zx81 firstTen 4, 5, 7, 6
**CORRECT.** s008 disprovesX1-only; s009 permits software-disabledNMI. Steps4/5/6/7 visibly CHECK; X1-only gone, C6/C7/R4 and disabled-NMI case added. Needed; replacement order/power-on trace remain quarantined.

### 048. Log line 330: 35:132 / dram4116 replacement Retroleum lower RAM
**CORRECT.** s019 proves SRAM module/turned-pin requirements, not removed sindik.at board-wide -5 V load claim. Sentence actually removed. Needed source cleanup.

### 049. Log line 331: 36:137-140 / spectrum clocks pixel, CPU, line, frame
**CORRECT.** s016 proves timing rates, not physical ULA locations. All four clock rows visibly CHECK. Honest location quarantine, unchanged supported rates. Needed.

### 050. Log line 332: 36:152, 36:157 / spectrumplus3-joystick pins 2, 8 COMMON
**CORRECT.** s029 ch10 labels joystick2/8 common; viewed p3-circuit19.png traces commons to keyboard scan/address lines, not ground. Both resolved pins kbd, no0 V expect. Needed safety correction.

### 051. Log line 333: 36:259 / spectrumplus3-exp L4
**CORRECT.** s029 expansion lower4=N/C. Historical48K comparison actually removed. Correct source cleanup; independent48K source could prove comparison.

### 052. Log line 334: 36:273 / spectrumplus3-exp L19
**CORRECT.** s029 gives RESET identity, not timed power-on transition. L19 expect actually removed. Needed.

### 053. Log line 335: 37:0, 37:1 / +3 clocks CPU, AY
**CORRECT.** s026 ch8part30 gives3.5469 MHzCPU/1.7734 MHzAY, not DIP pins. Both clock CHECK flags rendered. Honest pin quarantine, unchanged rates. Needed.

### 054. Log line 336: 37:96 / ula_spectrum replacement Nebula
**CORRECT.** s063 PDF1 supports fragile pins/obstructing socketed IC3/4/24/25 soldering/Issue2 VR1/VR2 readjustment. Issue coverage/-7 equivalence/supplied socket absent and removed. Needed.

### 055. Log line 337: 38:187 / ula_zx81 replacement vLA81
**CORRECT.** s060 maker product description supports settings/socket/pins; no TS1000-specific frequency instruction. TS1000 parenthesis actually removed. Needed source cleanup.

### 056. Log line 338: 38:211, 220, 221, 228, 229 / cpuz80 pins 6, 16, 17, 25, 26
**CORRECT.** s010 printed5-8/PDF19-22 gives generic CLK/INT/NMI/BUSRQ/RESET functions, wired-OR pull-up conditional. New probes generic and pull-up conditional. Needed shared-record correction.

### 057. Log line 339: 38:222 / cpuz80 pin 18 /HALT
**CORRECT.** s010 PDF20 printed6 HALT resumes for NMI/enabledINT; RESET resets CPU. New text includes those and reset, preservesNOP refresh. Needed: not every interrupt exitsHALT.

### 058. Log line 340: 38:224 / cpuz80 pin 20 /IORQ probe
**CORRECT.** s010 PDF20 printed6 saysIORQ concurrentM1 during interrupt acknowledge. Probe now includes it. Needed: port-access-only false.

### 059. Log line 346: 02:188 / ts1000 testPoint CPU clock scope
**WRONG.** MEDIUM: TS1000 CPU-clock testPoint.verify exists but viewPower ignores it; scopeBlock receives scope only. Actual renderer proof verify-render-proof.json: flags on/off produce identicalHTML. s008 isZX81, notTS1000 validation; claimed quarantine invisible. Needed warning not implemented.

### 060. Log line 347: 02:189 / ts2068 testPoint CPU clock scope
**CORRECT.** s035 printed42/PDF50 sec2.1.8.2 explicitly14.112 MHz/4=3.528 MHz. Note names source, Clocks linksPDF50. Keeping rate justified; genericZ80 sheet supplies voltage limits separately.

### 061. Log line 348: 18:49 / ts1000-tv pin 1 expect
**CORRECT.** um1000 ch1 printed7/PDF15 specifies channel2or3/underside selector; s031 corroborates. New RF expect removes explicitMHz not given there. Needed source cleanup, not new channel numbers.

### 062. Log line 349: 18:50 / ts1500 rail +5 V
**CORRECT.** TS1500 +5 V now nominal; verify retained AND visible note explicitly Not sourced for this board. Old 4.9-5.2 range unproved. Honest uncertainty even though renderer ignores rail.verify; needed range removal.

### 063. Log line 350: 18:51-52 / ts1500 rails +12 V, -5 V
**CORRECT.** Both TS1500 rails retain verify and visible Not sourced for this board notes. No TS1500 schematic proving converter wiring cited. Honest quarantine-only disposition; no numeric fix.

### 064. Log line 351: 18:53 / ts2068 testPoint composite video scope
**CORRECT.** s035 printed42/PDF50 sec2.1.8.3:14.112 MHz/896=15.75 kHz->63.492 us, rounded63.5 us. Note explicitly names source and Clocks reference. Retained period justified.

### 065. Log line 352: 18:60 / ts2068 firstTen 1 expect
**CORRECT.** Viewed cc19 PDF9 printed8 Power Supply:20.4 V atJ1/inputU8 etc. New expect attributes20.4 V on-board toSams and drops separately sourced14-25 V range. Needed source cleanup; not an exact adapter acceptance limit.

### 066. Log line 353: 18:62 / ts2068 firstTen 3 expect
**CORRECT.** cc19 PDF9 printed8 specifies12.0 V atU8 output, no11.5-12.5 tolerance. New nominal matches. Needed unsupported-tolerance removal.

### 067. Log line 354: 18:63 / ts2068 firstTen 4 expect
**CORRECT.** cc19 PDF9 printed8 gives5.2 V atQ1 collector; chip rail nominal+5 V without4.75-5.25 acceptance limits fits schematic. Needed tolerance removal; Sams5.2 V retained.

### 068. Log line 355: 32:145 / ts1000 clock Resonator X1
**CORRECT.** s008 isZX81 diagram, not TS1000-specific resonator validation. Existing clock verify rendered byclocksBlock. Honest retained quarantine; no new numeric correction.

### 069. Log line 356: 32:146 / ts1000 clock Field rate
**CORRECT.** s008 USA/UK strap does not itself specify TS1000 field frequency. New clock CHECK visible. Honest quarantine, not60 Hz proof; needed.

### 070. Log line 357: 32:193 / ts1000 firstTen 3
**CORRECT.** s008 nominal+5 V does not establish TS1000 6116 wiring/tolerance. Step3 now nominal+5 V and visiblyCHECK. Needed range removal/quarantine.

### 071. Log line 358: 32:201 / ts1000 firstTen 1
**CORRECT.** s005 PDF8 explicitlyZX81 gives8-12 V loaded, notTS1000 nominal9/unloaded14. s031 supplies those community adapter values separately. New step1 CHECK visibly preserves cross-model sourcing limitation. Needed quarantine, not newly manufacturer-proven behavior.

### 072. Log line 359: 32:202 / ts1000 firstTen 2
**CORRECT.** s005 PDF5 faultfinding isZX81 kit evidence, notTS1000 diagnosis validation. Step2 now visiblyCHECK. Honest quarantine of copied hot-regulator rule. Needed.

### 073. Log line 360: 32:203 / ts1000 rail Power in
**WRONG.** MEDIUM: new TS1000 input-rail verify never reaches viewPower/printHTML. Row has no visible qualification for untraced board/load claim. s031 gives nominal9/unloaded14, not a loaded regulation trace. Range removal sound, quarantine ineffective; renderer proof identical withflags on/off.

### 074. Log line 361: 32:204 / ts1000 rail +5 V
**WRONG.** MEDIUM: nominal+5 V replacement sensible, but claimed rail verify ignored. s008 isZX81, notTS1000 6116 board proof; note only says Same7805 arrangement. UnlikeTS1500, no visible unsourced warning. Actual rendering identical withverify toggled.

### 075. Log line 362: 32:205 / ts1000 rail GND
**WRONG.** MEDIUM: new TS1000 GND-rail verify ignored, so6116 pin12 location still presented withoutCHECK. s008 showsZX81 2114/4118 alternatives, notTS1000 6116 wiring. Syntactic flag does not communicate quarantine.

### 076. Log line 363: 33:137 / ts1000-edge B1 expect
**CORRECT.** s031 expansion identifies regulated+5 V, no4.9-5.2 V range. New B1 nominal matches. Needed unsupported-range removal.

### 077. Log line 364: 33:138 / ts1000-edge B2 expect
**CORRECT.** s031 explicitly nominal9 V unregulated, about14 V unloaded, Uss from powerconnector. New B2 matches. Needed instead of unsupported8-14 V range.

### 078. Log line 365: 35:74 / ts1000 clock CPU clock
**CORRECT.** s009 describesZX81 logic, notTS1000 measured clock. Existing TS1000 CPU-clock CHECK visible via clocksBlock. Honest retained quarantine, no new rate proof.

### 079. Log line 366: 35:78-81 / ts1000 firstTen 4, 5, 7, 8
**CORRECT.** s009 ZX81 ULA notes do not validateTS1000 fault/replacement rules. Steps4/5/7/8 all newly visiblyCHECK. Honest quarantine needed.

### 080. Log line 367: 38:244 / ts1000 firstTen 6 reset
**CORRECT.** s010 PDF20 gives reset behavior/minimumclocks, notTS1000 power-on RC trace. New step6 CHECK visible. Honest quarantine needed.

### 081. Log line 373: 01:54 / grom0430 replacement TI-GROMmy
**UNPROVEN.** Retained TI-GROMmy record unchanged. Viewed s046 PDF64 sheet62:U500/U501/U502 correct; log incorrectly calls this sheet60/PDF62, which isCPU. Actual replacement Wayback source returns429, includingHTTPS retry. Websearch foundGrommy2 material, not proof of exact older board/two-socket/8KB-each/FinalGROM claims. Schematic proves designators only.

### 082. Log line 374: 14:198 / ti994a testPoint GROM clock scope note
**CORRECT.** Viewed s056 PDF83 printed5-5 andPDF51 printed3-8:crystal/24 gives447.4 kHz rounded. Note now explicitly attributes nominalrate toVDP manual and removes timebase correction. Old425-470 kHz range actually supported as425.12-469.88 byVDP manual: deleting it was unnecessary, not a factual correction.

### 083. Log line 375: 14:199 / ti994a testPoint composite at VDP scope note
**CORRECT.** s056 PDF51 Table3-3 gives342pixel clocks, pixelclock=crystal/2 ->63.695 us. Note removes unrelated electrical-level claims and names timing source; Sams s047 remains captured-level source. Needed source separation.

### 084. Log line 376: 14:200 / ti994a testPoint video out scope note
**CORRECT.** s056 PDF51 supports63.7 us line period. New output note namesVDP manual/Clocks, s047 supplies capture. Needed attribution, no numeric correction.

### 085. Log line 377: 14:204 / ti994a testPoint CPU phases scope
**CORRECT.** Diff actually removes25%duty/10-12Vspec clause. s047 PDF11 photos provide measured phases, not a general acceptance specification. Deleted claims absent fromnew scope block. Needed source cleanup.

### 086. Log line 378: 14:205 / ti994a testPoint tank scope note
**CORRECT.** s047 oscillator/counter material supplies scope evidence, not removedTI chartp87 attribution. Attribution actually gone. Needed source cleanup; tank12 MHz/1Vp-p remainSams readings.

### 087. Log line 379: 14:206 / ti994a testPoint OSCOUT scope note
**CORRECT.** s047 OSCOUT photo is waveform evidence. Both4x-rule/fault-attribution clauses actually removed. Needed cleanup, no new substitute inference.

### 088. Log line 380: 14:207 / ti994a testPoint 9901 TTL clock scope
**CORRECT.** s047 TTL-phase capture does not supply precise75%duty. Both duty property/quarter-cycle sentence removed. Needed, no replacement duty invented.

### 089. Log line 381: 14:208 / ti994a firstTen 1
**CORRECT.** firstTen1 already visiblyCHECK. s047 service-check prose does not give all stated connector-pinAC numbers. Kept values honestly quarantined, not certified. No new fact fix claimed.

### 090. Log line 382: 14:209 / ti994a firstTen 3 ifNot
**CORRECT.** s047 servicecheck3(a) givesCPU voltage tests, not proof everyloaded collapse=short orTIchart rule. New suspect wording/deletedchart/pinclause/visibleCHECK honestly quarantine. Needed.

### 091. Log line 383: 30:83 / vdp9918 replacement F18A / F18A-MK2
**CORRECT.** Read s072 archivedmaker pinout:originalF18A35/36NC; MK2 pin35GPIO13N/36GPIO12P, nonhostFPGA I/O3.3VONLY. New version distinction/removal of production statistics matches. Needed safety correction; archiveworks/livecertificatefails.

### 092. Log line 384: 31:42 / ti994a clock VDP crystal Y100
**CORRECT.** Viewed s046 PDF61 sheet59:Y10010.7 MHz onVDP39/40. s056 PDF51 gives exact10.738635 MHz. New label separates diagramlocation/exactrate source. Needed board-wiring attribution.

### 093. Log line 385: 31:44 / ti994a clock GROMCLK to GROM pin 13
**CORRECT.** Viewed s046 PDF64 sheet62:SH1-U100-37 GRMCLK connectsGROM pin13 onU500/501/502. Keptlocation correct; no fix needed.

### 094. Log line 386: 31:73 / psg76489 pin 4 READY
**CORRECT.** Viewed s065 PDF4 transfer text approximately32clocks SN76489AN; PDF1 footnote givesSN76494 four vs32. New familyqualified nominal32 statement supported; approximately preferable for a strict timing limit. Needed qualification. Logp5 ispinassignment, nottransferparagraph.

### 095. Log line 387: 31:82 / psg76489 pin 14 CLOCK
**CORRECT.** s046 PDF64 differentiatesSN76489 3.58 MHz/SN94624 447 kHz feeds; s065 notSN94624 maker sheet. Pin14 verify and explicit noSN94624-sheet statement remainvisible. Honest quarantine.

### 096. Log line 388: 31:105 / grom0430 pin 10 /GS
**CORRECT.** s045 PDF57 printed48 GROMPAGING explicitly currentpageonly fordatareads/allGROMs foraddressreads. New /GS distinction matches. Needed.

### 097. Log line 389: 31:219-222 / tms9901 pins 12-15 IC3-IC0
**CORRECT.** Viewed s046 PDF62 sheet60:9900pin33+5 V/pins34-36ground; PDF63 sheet61 routes9901 INTREQ11 and noIC3-IC0 outputs. New fixed-level-1/unwired code outputs correct. Needed.

### 098. Log line 390: 31:320 / ti994a-cartridge pin 33 GROM VSS
**CORRECT.** Viewed s046 PDF64 sheet62:J500pin33/GROM16s go toCR500/R501bias rather than directground; pins2/35/36ground. New power/below-ground description correct. Needed safety correction.

### 099. Log line 391: 31:323 / ti994a firstTen 2
**CORRECT.** s045 PDFs93-94 printed34-35 supports -5Vstartup and+12Vdependency of+5Vswitcher. SamsL6 clause removed, newstep2CHECK visible for remainingdiagnosticassumptions. Source cleanup needed; L6value itself independently supported bys047 servicecheck2(c), not false.

### 100. Log line 392: 31:328 / ti994a rail -5 V note
**CORRECT.** s045 startupsequencing/s013 4116biasrequirements supportrisk, notcertainimmediatedeath. New rail note appropriately weakens claim. Needed.

### 101. Log line 393: 32:5 / vdp9918 replacement PICO9918
**CORRECT.** s074 README Hardware explicitly PROv2.x(v2.0)=RP2350, earlierintegratedboardsRP2040. New version distinction supported. Needed:blanketRP2040 outdated.

### 102. Log line 403: batch-01 / mcu6801 datasheets (coleco.js)
**CORRECT.** Viewed s077 PDF46 printed3-1 containsFigure3-1MC6801. Actual coleco label now3-1, anchor46. Needed page correction.

### 103. Log line 404: batch-04 / c128 IEC source (commodore.js)
**CORRECT.** Viewed s145 PDF57 SerialBus footer54. Actual C128 label54, anchor57correct. Needed.

### 104. Log line 405: batch-12 / cpu6502c datasheets (atari.js)
**CORRECT.** Viewed atari600 PDF15 Figure1-3 footer1-5. Actual source labelnow1-5/anchor15. Needed page-label correction.

### 105. Log line 406: batch-38 / Disk II sources (apple.js)
**WRONG.** MEDIUM: all three page-label corrections are off by+1. Viewed Sather PDF240/leafn239 Figure9.7 footer9-10; PDF241/n240 Table9.1 footer9-11; PDF243/n242 DriveOff/On footer9-13. New 9-11/9-12/9-14 wrong; old labels correct. Leaf URLs still correct.

### 106. Log line 407: batch-03, 04, 06, 21 / Ray Carlsen pages
**UNPROVEN.** No Carlsen link change; live/Waybackpairs exist. BrowserUA requests tolivePS/1541-II/fix1541/1581texts406, archives429;1571wiringimageworks. Websearch confirms1541directory, notfulltextclaims/eachHTTP200. CannotrepeatlogHTTP200 assertion ascurrentproof.

### 107. Log line 408: batch-30 / vdp9918 F18A replacement (ti.js)
**CORRECT.** Actual vdp9918 datasheets containlive pinout andworking s072 Wayback. Read archive full pinout/MK2 section. Live certificate failure real; readable fallback present. No link fix needed.

### 108. Log line 459: cpuz80 pin 11
**WRONG.** HIGH: cpuz80pin11 newGND/ground false. s010 PDF19 printed5 Figure3 says+5Vpin11/GNDpin29; s004/s008 agree. RestoreVCC,+5Vsupply,typepower. Existingprobe still+4.75to+5.25 V. Groundclipat11 can short+5Vtoground. Additionalcorrection wasunneededanddangerous.

## Findings, ordered by severity

1. **HIGH — Z80 pin 11 is incorrectly ground.** src/data/sinclair.js:241 changes VCC/type power to GND/type ground while retaining a +5 V probe expectation. UM0080 printed p. 5, Figure 3 (PDF p. 19) explicitly shows +5 V on pin 11 and GND on pin 29. Restore VCC, +5 V supply, type power. Clipping an earth-referenced oscilloscope ground to pin 11 can short the +5 V rail.

2. **HIGH — The 128 -12 V check still sends the technician to IC34 leg 1.** src/data/sinclair.js:1094 acknowledges IC33 in the heading but retains IC34 in where. The manual section 6.1 (PDF 25) assigns -12 V to IC33; its parts list (PDF 40) identifies IC33 as 1488 and IC34 as 1489. Independently opened TI MC1488 maker sheet p. 1 gives the negative supply on DIP pin 1. Correct the actionable location to IC33 pin 1, or remove it until verified. A visible CHECK and contradictory heading do not resolve a wrong probe target.

3. **MEDIUM — Four scoped TS1000 quarantine items do not render a warning.** src/data/timex.js:421-427, log rows 02:188 and 32:203-205. Actual viewPower code at src/app.js:1160-1163 ignores rail/test-point verify, including the test point whose scope is drawn. The executed function generates identical HTML with flags on or off. These references do not establish TS1000-specific board wiring/measurement behavior. Add a visible qualification or remove unproved claims; data flags alone do not implement quarantine. TS1500 visible unsourced notes are a different case.

4. **MEDIUM — Sather page-label edits regress correct labels.** src/data/apple.js:603,619,659,694,868-869. Figure 9.7 is printed p. 9-10 (PDF 240 / leaf n239); Table 9.1 p. 9-11 (PDF 241 / n240); Drive Off/On p. 9-13 (PDF 243 / n242). Restore those original labels. Existing leaf URLs are correct.

5. **MEDIUM — TI-GROMmy capability claims remain unproven.** src/data/ti.js:455. The schematic proves the three GROM designators, not a modern replacement board, two-socket footprint, 8 KB per GROM, or FinalGROM behavior. The actual cited replacement page returned 429; web search found later Grommy2 material, not proof of this exact older product. Quarantine or remove claims until the cited source can be read. The log also misidentifies the GROM schematic as sheet 60: it is sheet 62, PDF 64.

6. **MEDIUM — +2 TR7 correction remains unproven against the cited maker scan.** src/data/sinclair.js:782. The cited scan cannot settle the designator. An independently opened Ian Worsley redraw agrees with TR7, but it is not the cited maker source; do not accept the previous reviewer as the missing evidence.

7. **LOW — Carlsen HTTP 200 claim is not reproducible here.** Live text requests returned 406 and archive text copies 429; the 1571 wiring image was accessible. Both links are present, but their presence is not proof of unreadable source contents.

## Source index

All sNNN IDs map to original URLs in fa-sinclair-rest/manifest.json. Successful PDFs are sNNN.pdf with sNNN.txt extraction; HTML/image downloads are sNNN.bin. The assigned directory also contains the relevant page PNGs and crops. Extra source downloads:

- cc19.pdf: https://archive.org/download/TimexSinclairEphemera/CC-19_Timex%20_Sinclair%202068.pdf
- um1000.pdf: https://archive.org/download/timex-sinclair-1000-user-manual/Timex-Sinclair1000UserManual.pdf
- atari600.pdf: https://archive.org/download/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf
- sather.pdf: https://archive.org/download/understanding_the_apple_ii/understanding_the_apple_ii_text.pdf
- mc1488.pdf: https://www.ti.com/lit/ds/symlink/mc1488.pdf
- p2-main.jpg: https://spectrumforeveryone.com/wp-content/uploads/2017/11/ZX-Spectrum-Plus-2-Schematics.jpg (Ian Worsley redraw, not a substitute for the cited maker source)
- p3-circuit.bin and p3-circuit19.bin: linked circuit pages 18/19 in the cited k1 +2A/+3 manual directory (s025 URL).
- issue3.bin: the cited k1 Issue 3 Schaltbild.gif.

No hardware was powered or probed. This was a full scoped document review plus focused renderer execution, not physical-board validation.
