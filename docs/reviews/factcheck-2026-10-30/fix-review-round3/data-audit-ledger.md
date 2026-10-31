# data-audit: round-three data ledger

Architect lens. Audited all 77 patch hunks; ignored only the 9 GND-to-VCC test-plant reversions. Every other hunk has an explicit decision below. No product file changed or committed.

## Coverage

| Items | CORRECT | WRONG | UNPROVEN |
|---:|---:|---:|---:|
|68 in-scope hunks (current working records)|52|2|14|

Hunk is the accounting unit; a mixed hunk receives its worst decision. WRONG H053/H072 is the actual current file, whereas their patch b/ text is correct. Exact patch alone: 54 CORRECT, 0 WRONG, 14 UNPROVEN. UNPROVEN with an honest CHECK is not by itself a new blocker.

All 68/68 map by subject to a numbered row of docs/verification/factcheck-full-fixes-c.md. There are 0 wholly unlogged hunks, but 2 unlogged subchanges: H001 also changes BBC ModelB/Electron inherited text (row43 falsely says ModelB unchanged); H006 adds pin1:corner (row45 falsely says untouched). H009 also names XC95288XL beyond the abbreviated log, directly proved by README. Two additional current-file edits are absent from patch: H053 reset values and H072 positive-rail designator.

## Method and evidence

Fresh curl -L -A Mozilla/5.0 downloads are in data-audit/. No earlier reviewer saved source was used. Windows Schannel failed; C:/msys64/usr/bin/curl.exe with OpenSSL downloaded the real documents. Archive metadata resolves original PDFs; _text.pdf and ?download=1 retries recovered IIe/HERO Jr/CPC664 original scans after archive500 responses. pdftotext -layout was run for PDFs; scans were rendered with pdftoppm at110dpi, CPC/1581 and Master drawings400dpi, Model4 clock300dpi. GIF schematics were opened as supplied; d64reset2.png is a crop of the fresh original pixels. Rendered/scanned pages, not empty OCR text, decide the scan claims.

The requested5160 startup page could not be opened: startup.html, startup-http.html and startup-retry.html contain Mod_Security Not Acceptable responses. It remains UNPROVEN. This is a source-access limit, not evidence its factual claim is wrong. TI-GROMmy Wayback DID open here, contrary to the prior log.

No shared-chip duplication was introduced. Checked core.js registration and docs/data-schema.md shared-chip rule; rom23256 is reused by MSX, and the new routing text expressly says CPC boards. Master VIA correction clones connector pins for the Master instead of changing the ModelB array. XT power correction uses an XT-only override. The RGB helper also changes other models beyond the logged scope; the Model B connector summary nevertheless retains its documented current limit.

## Hunk ledger

| Hunk | Record / b-side line | Fixes-C row | Decision | Direct source / reason |
|---|---|---|---|---|
|H001|src/data/acorn.js:94|43|CORRECT|Master.pdf p51 proves +5 V, no current rating. Deletion also changes shared bbcb/Electron pin text (unlogged scope effect), but Model B connector summary at acorn.js219 still says a few mA only, matching BBC SM7.1. Therefore no lost-warning regression is established.|
|H002|src/data/acorn.js:112|4|CORRECT|Master drawing 143,000/C sheet 2: IC8 6522 PB5 pin15 and PB4 pin14; BBC B 103,000/C uses IC3. Helper preserves the Model B array.|
|H003|src/data/acorn.js:177|44|CORRECT|master.txt PDF27 section5.4 calls nTUBE the parasite chip select. PDF55 supplies PL6 pin8 notTUBE. Log incorrectly puts the description on p55, but both pages are cited in the record.|
|H004|src/data/acorn.js:315|4|CORRECT|Master connector now calls anaPinsFor(true). Same source and pin tracing as H002.|
|H005|src/data/acorn.js:575|Explicit exclusion|EXCLUDED|GND-to-VCC undo of test plant, per user.|
|H006|src/data/acorn.js:945|45,46; partial|UNPROVEN|Electron SM PDF14 printed8 says top-left and anticlockwise, not the starting edge. verify/conflict honestly retain uncertainty. Additional pin1:corner mutation is UNLOGGED: row45 explicitly says the field was untouched.|
|H007|src/data/amstrad.js:81|57|CORRECT|CPC464 PDF13 printed16, 664 PDF17, 6128 PDF17: IC106 pin19 goes to IC110 inputs13/12, output11 STROBE. 9/10 to8 drives CRTC EN. No weakening: conflict records the reviewer disagreement.|
|H008|src/data/amstrad.js:242|40|CORRECT|Fresh archived CPCWiki Gate_Array interrupt sections explicitly give default 50Hz PAL/300Hz, Grim 1.4us and Madram request held until accepted. Text accurately attributes both incompatible accounts.|
|H009|src/data/amstrad.js:279|42|CORRECT|AMSGateArray README Current status crosses out both timing-glitch/loop warnings. Testing table lists passing demos on6128. Intro explicitly names XC95288XL. GitHub page identifies archived2024 status. Removing obsolete struck-out assertions is justified.|
|H010|src/data/amstrad.js:311|40|CORRECT|Same archived CPCWiki evidence as H008, for40010 pin32.|
|H011|src/data/amstrad.js:350|Explicit exclusion|EXCLUDED|GND-to-VCC undo of test plant, per user.|
|H012|src/data/amstrad.js:376|39|CORRECT|464 PDF13 and6128 PDF17 ROM IC103 pin22 has R112 2.2K to0V and ROMDIS. 664 PDF17 corroborates same function. CPC-specific routing is expressly qualified and does not assert MSX wiring.|
|H013|src/data/amstrad.js:515|41|UNPROVEN|464 service flowchart does not prove centre-positive polarity. Step receives verify:true; correct handling of remaining uncertainty.|
|H014|src/data/amstrad.js:563|41|UNPROVEN|664 service flowchart likewise does not prove plug polarity. Step receives verify:true.|
|H015|src/data/amstrad.js:614|41|UNPROVEN|6128 service flowchart likewise does not prove plug polarity. Step receives verify:true.|
|H016|src/data/apple.js:56|25|CORRECT|Red Book PDF114 printed111: +5.0 +/-0.15, +11.8 +/-0.5, -5.2 +/-0.5, -12 +/-1. Arithmetic matches all four edited ranges.|
|H017|src/data/apple.js:272|26|CORRECT|Same Red Book page and arithmetic as H016; the connector check now quotes the ranges.|
|H018|src/data/apple.js:601|24|CORRECT|Sather PDF243 footer9-13 contains Drive Off/On; archive leafn242 is correct.|
|H019|src/data/apple.js:617|24|CORRECT|Sather PDF240 footer9-10 contains Fig9.7; leafn239 is correct.|
|H020|src/data/apple.js:657|24|CORRECT|Sather PDF241 footer9-11 contains Table9.1; leafn240 is correct.|
|H021|src/data/apple.js:692|24|CORRECT|Sather PDF243 printed9-13 contains Drive Off/On; leafn242 is correct.|
|H022|src/data/apple.js:866|24|CORRECT|Both labels verified: Sather PDF241 Table9.1 and PDF243 Drive Off/On with one-second turn-off delay. No URL changed or weakened.|
|H023|src/data/apple.js:1090|30|UNPROVEN|No cited DuoDisk controller schematic traces slot50/33 to DB25. Rewording expressly identifies expected routing and adds verify to BOTH rails; it does not claim a completed trace.|
|H024|src/data/apple.js:1267|Explicit exclusion|EXCLUDED|GND-to-VCC undo of test plant, per user.|
|H025|src/data/apple.js:1693|27|CORRECT|IIc TRM PDF270 printed242 Table11-7 calls MMU pin21 MD7 state of flags on data bus7; no three-state qualifier. Deletion stays within what table states.|
|H026|src/data/apple.js:1739|27|CORRECT|IIc TRM PDF271 printed243 describes IOU pin9 connected to data bus7; no three-state qualifier. Removal justified.|
|H027|src/data/apple.js:2309|29|CORRECT|IIe TRM text-layer copy PDF194 printed160 enumerates rail short to ground, disconnected cable and voltage outside range. No generic overload diagnosis.|
|H028|src/data/apple.js:2319|28|CORRECT|Same IIe page explicitly describes half-second restarting until fault cleared or power off. Changed list matches all three documented causes.|
|H029|src/data/atari.js:57|Explicit exclusion|EXCLUDED|GND-to-VCC undo of test plant, per user.|
|H030|src/data/atari.js:632|23|CORRECT|SamsCC5 PDF40 waveform labels 5V,0.5us/cm without a frequency. Atari TRN PDF441 printedII.20 explicitly114 machine cycles per TV line (1.79MHZ). Added attribution accurately separates sources.|
|H031|src/data/coleco.js:469|22|CORRECT|ADAM TRM PDF49 sec6.3 pin4 Yellow -5.15VDC +.25V, no lower tolerance printed. New text does not invent a symmetric negative limit.|
|H032|src/data/coleco.js:629|18|CORRECT|Coleco TM PDF71 printedVII-16 middle U9:36 Y trace. Ground at second grid line from bottom, 1V/div. Approximately2.2V sync,2.6V blanking,3.8-3.9V picture fits the scan; explicitly approximate.|
|H033|src/data/coleco.js:678|22|CORRECT|ADAM TRM PDF49 sec6.3 supports cable-end nominal -5.15 and only +.25. Other rounded ranges unchanged.|
|H034|src/data/coleco.js:685|21|CORRECT|ADAM TRM PDF49 distinguishes cable tolerance sec6.3 from nominal rails sec6.4. Edits remove unsupported transfer of cable tolerances to chip-pin limits. No replacement chip tolerance invented.|
|H035|src/data/coleco.js:695|19|CORRECT|ADAM TRM PDF33 sec2.2.4 explicitly TI9928. The renamed chip matches the existing TMS9928A clock-row name.|
|H036|src/data/coleco.js:703|22|CORRECT|ADAM TRM PDF49 pin4 nominal -5.15V, +.25 only. New expect does not fabricate lower limit.|
|H037|src/data/coleco.js:709|20|UNPROVEN|Cable-end tolerances do not prove exact voltage at4116 pins. Step now uses approximate nominals and verify:true. Correct disclosure, not proof of the chip-end measurement.|
|H038|src/data/coleco.js:723|19|CORRECT|ADAM TRM PDF33 names9928; correction of the clock row chip name is justified, matching H035.|
|H039|src/data/commodore.js:303|1|CORRECT|1581 SM PDF20 printed17 schematic252380 sheet3: FAST CLK at CN3/CN4 pin1 via EMI1 to U11 pin6 and R26 RP1-13 1K to+5. R28 RP1-15 belongs to input5. Conditional limits change to1581 only.|
|H040|src/data/commodore.js:505|Explicit exclusion|EXCLUDED|GND-to-VCC undo of test plant, per user.|
|H041|src/data/commodore.js:577|9|CORRECT|TED manual PDF9 Dynamic RAM Control pins9-11 proves /RAS generation, not a unique dead-TED diagnosis. Unsupported diagnostic sentence removed.|
|H042|src/data/commodore.js:2567|13|UNPROVEN|C64 PRG PDF416 printed397 names cassette SENSE6/F; SM PDF15 printed11 gives P4 sense and pull-up. These cited pages do not draw the external PLAY switch state. Retained HIGH/LOW expectation is flagged on6 andF.|
|H043|src/data/commodore.js:2615|17|CORRECT|VIC20 PRG PDF298 printed282 Serial I/O identifies ATN line on this VIC20 connector; replacing accidental C64 name is correct. Existing verify stays.|
|H044|src/data/commodore.js:2712|14|UNPROVEN|VIC20 PRG PDF297 printed281 identifies /IRQ19 but does not specify idle voltage. verify added, correctly preserving the distinction.|
|H045|src/data/commodore.js:2734|14|UNPROVEN|Same table identifies /NMI W and /RESET X but not idle/pressed electrical states. Both receive verify:true.|
|H046|src/data/commodore.js:3512|10|CORRECT|TED PDF9 describes DRAM strobes; no source proof that missing /RAS alone condemns TED. Deletion removes that unproven diagnosis.|
|H047|src/data/commodore.js:3535|16|CORRECT|Deleted sentence referred to a nonexistent range. Remaining feed-to7805 agrees with C16 source schematic; no new numeric dropout claim.|
|H048|src/data/commodore.js:3594|8|CORRECT|C64 SM PDF10 describes Y1,U31 and divider/phase-lock clock circuit. No service instruction proves failed VIC-II load diagnosis. Removing that clause is source-faithful.|
|H049|src/data/commodore.js:3607|15|CORRECT|SamsCC17 text explicitly4.91V atL5 and4.9V atICs. Rewrite removes stale reference to a deleted range; no source or qualification removed.|
|H050|src/data/commodore.js:3688|12|CORRECT|PET320349 sheet9 shows VR6 7905, TP10 -5 and -9V raw input. Removed imperative was not proven by this schematic.|
|H051|src/data/commodore.js:3705|11|CORRECT|Same sheet shows VR3/VR4 LM340-5 fed from+9V onJ8-2. Removed shorted-chip/hot-regulator diagnosis was not supplied by drawing.|
|H052|src/data/dragon.js:30|52|CORRECT|SAM datasheet PDF11 printed5-333 explicitly reset selects SLOW crystal/16; FAST crystal/8; address-dependent mode chooses between. 14.218/8=1.77725MHz.|
|H053|src/data/dragon.js:409|7,52,53,54,55; late correction|WRONG|Mixed hunk: mode qualifiers, deletion of shorted-load diagnoses,50mA PSU output limit and explicitly extrapolated D32 order checked. PATCH reset values33uF/100K agree with CD41505 sheet2. CURRENT dragon.js419 instead3.3uF/10K is WRONG. Fresh schematic d64reset2.png shows C55 33u and R17 100K. Late log correction is wrong and patch is stale. D32 service information PDF2 lists SAM,ROMs,CPU,RAM; it is NOT D64 proof (step already verify).|
|H054|src/data/dragon.js:653|52|CORRECT|SAM PDF11 rate-mode table proves slow/fast qualification added to Dragon32 E test point.|
|H055|src/data/dragon.js:699|52|CORRECT|Same rate-mode evidence for Dragon64 E test point.|
|H056|src/data/heathkit.js:77|Explicit exclusion|EXCLUDED|GND-to-VCC undo of test plant, per user.|
|H057|src/data/heathkit.js:169|48|CORRECT|ET18 TM PDF90 printed78 gives P5015-10,3,4,1-2, audio21/22 acrossR503 toU502 and Q501 switching fromP50111. PDF60 printed50 names R515 pitch control (log has the printed page wrong). Removed MCX/CB/AF wiring assertions are not reintroduced.|
|H058|src/data/heathkit.js:471|5,6|CORRECT|HEROjr fresh retry PDF24 printed22 explicitly U3067 clock via $D841 U21514 and serial output viaU21515. Matches PB4/PB5 pin numbering; preexisting verify kept.|
|H059|src/data/heathkit.js:1472|47|CORRECT|MC6802/6808 DS PDF4 shows450ns min high AND low, but different maxima and no fixed50% guarantee. Deleting duty50% removes unsupported exact shape.|
|H060|src/data/heathkit.js:1546|47|CORRECT|Same data-sheet bus-timing table, HEROjr clock row; no duty ratio inferred from equal minima.|
|H061|src/data/ibm.js:170|Explicit exclusion|EXCLUDED|GND-to-VCC undo of test plant, per user.|
|H062|src/data/ibm.js:196|32|CORRECT|Intel1983 handbook PDF415 printed3-235 /RES is activeLOW Schmitt input for reset, allows RC. Does not assert every bad PSU holds itLOW. Unsupported sentence removed.|
|H063|src/data/ibm.js:1045|33|CORRECT|XT TechRef PDF68 printed3-3 explicitly -5V used by diskette PLL; PC TechRef PDF32 printed1-24 instead says dynamic-memory bias. XT-only override preserves shared psuPins and keeps verify/conflict.|
|H064|src/data/ibm.js:1325|35|UNPROVEN|HMS0020 PDF5-6 step007/008 does replace PSU after failed voltage check, BUT reached only after valid PowerGood in005. Missing PowerGood goes006->012 drive isolation (PDF6). New unconditional ANY out-of-range assembled-system instruction is not proven and lacks CHECK. Current step2 explicitly sends missing PowerGood onward to rails.|
|H065|src/data/ibm.js:1382|34|CORRECT|XT TRM PDF68 printed3-3 directly states the diskette-adapter PLL use; added note correctly attributes it.|
|H066|src/data/ibm.js:1395|35,36|UNPROVEN|Step3 has same missing HMS PowerGood precondition as H064, without verify. Step5 source startup-sequence URL returned Mod_Security Not Acceptable on fresh HTTPS/HTTP attempts; new phrasing and verify:true honestly leave reset sequence unproven.|
|H067|src/data/ibm.js:1452|37|UNPROVEN|Fresh cited5160 startup-sequence requests returned Mod_Security Not Acceptable. Portable5155 row retains verify:true, so no false proof is claimed.|
|H068|src/data/ibm.js:1496|38|CORRECT|PCjr HMS PDF56-65 printed3-020-2..11: POST after expansion removal, replace/test expansion, isolate adapter/drive/fan/modem, transformer and output tests, alternate powerboard then systemboard. New order preserves those gates.|
|H069|src/data/msx.js:131|50|UNPROVEN|MSX TDB PDF32 printed29 sec1.4.8 lists RCA2pin connectors but no centre/shell pin assignments. Both generated pins now verify:true; shared helper propagates to both MSX models and all RCA outputs.|
|H070|src/data/msx.js:382|49|CORRECT|MSX TDB PDF35-37 printed32-34 cartridge specification gives +/-12 supplies, not a4116 VRAM requirement. Unsupported extra sentence removed.|
|H071|src/data/sinclair.js:239|Explicit exclusion|EXCLUDED|GND-to-VCC undo of test plant, per user.|
|H072|src/data/sinclair.js:579|3; incompatible late row|WRONG|PATCH +12V IC33pin14 and -12V IC33pin1 is correct. CURRENT sinclair.js581 changes +12V to IC34pin14: WRONG. SM PDF33 printed4.4 explicitly IC33pin14+12V; PDF25 sec6.1 both rails toIC33; PDF40 listsIC33=1488,IC34=1489; TI1488 PDF1 pins14VCC+ and1VCC-. This current edit is absent from patch and unflagged.|
|H073|src/data/sinclair.js:1092|2|CORRECT|SM PDF25/33/40 plus TI1488 PDF1 resolve the manual typo to IC33pin1; keeps verify and explicit conflict rather than silently claiming the basic-check table saysIC33. Late log says changed backIC34, but current step4 remainsIC33.|
|H074|src/data/tandy.js:378|Explicit exclusion|EXCLUDED|GND-to-VCC undo of test plant, per user.|
|H075|src/data/tandy.js:1634|51|CORRECT|SamsCC13 PDF17 printed8 PSU troubleshooting names R67,C18,U19 for missing-5. Does not provide the deleted blanket RAM-failure claim.|
|H076|src/data/tandy.js:2039|56|CORRECT|Model4 TRM PDF31 printed15, inspected300dpi, clearly4.05504 and20.2752/5. New conflict accurately reports reviewer disagreement; not an actual numerical contradiction in source.|
|H077|src/data/ti.js:453|31|UNPROVEN|Wayback copy actually opened this audit. Author says three internal GROMs, space of two, MCU reprogramming and8K/chip, so those are supported. Specific U500-U502 labels and FinalGROM99 exclusion not established by retrieved text; retained verify:true is appropriate. Adding flag is justified, not a removal of proof.|

## Findings, severity order

1. **HIGH - Wrong Dragon64 reset parts in current working copy (H053, src/data/dragon.js:419).** Current C55=3.3uF/R17=10K contradicts CD41505 sheet2: C55=33uF/R17=100K (d64cpu.gif; d64reset2.png). Both values are tenfold wrong. Patch b/ is correct; late log correction is wrong. Restoring the source values is required; CHECK does not make a known wrong value acceptable. Principle: foundational-thinking; boundary-discipline (artifact/claim consistency).

2. **HIGH - Wrong Spectrum128 +12V probe IC (H072, src/data/sinclair.js:581).** Current fault note directs +12V to IC34pin14; source SM PDF33 printed4.4 says IC33pin14. Parts list PDF40 identifiesIC33 as1488; TI1488 PDF1 names14VCC+. IC34 is1489. Patch b/ still saysIC33. The current fault note has no verify/conflict property for this wrong positive-rail claim. Principle: foundational-thinking; boundary-discipline.

3. **HIGH - IBM source decision gate is lost (H064/H066, ibm.js:1328/1398).** Both edited ifNot values say ANY out-of-range assembled-system reading means HMS008 PSU replacement, without CHECK. HMS0020 PDF5-6 reaches007/008 only after PowerGood005 passes; failure goes006->012 and disconnects drives to find a failing load. The app preceding step2 instead tells missing PowerGood to check rails next. Therefore a no-PowerGood/low-rail case can follow an action the cited MAP does not authorize. Preserve that precondition and drive-isolation branch, or mark the unconditional claim CHECK. This is compression of a decision tree into a misleading scalar diagnosis. Principle: boundary-discipline; redesign-from-first-principles.

4. **MEDIUM - Review inputs do not represent the working copy, and geometry change is omitted.** H053/H072 b/ lines fail exact comparison with actual source. The two late log entries do not accurately describe current Spectrum edits, and the Dragon late correction contradicts the drawing. H006 adds pin1:corner despite row45 saying untouched; H001 alters more models than logged (its original Model B current limit remains in the connector summary, so no warning-loss claim is made). Regenerate the patch/log from the exact candidate before claiming every change proved. Electron edge orientation remains UNPROVEN but carries verify/conflict; this finding is traceability, not a claim its unknown orientation is definitely wrong. Principle: boundary-discipline; redesign-from-first-principles.

5. **LOW - Inaccurate page references in the log.** Row44 credits the Master parasite-select description to p55, but it is on p27 (p55 is the connector pinout). Row48 calls PDF60 the R515 pitch-control source without the correct printed page: it is printed50. Both correct document pages are available, and the data claims remain proved. Principle: boundary-discipline.

## Verification limits

This is a direct data/source audit, not a browser or hardware certification. No product edit, build, deployment, external automated CodeRabbit run, or commit was performed. Existing claims outside the edited hunks were not exhaustively re-audited. Automated file comparison and runtime Acorn data construction were used to prove the patch drift and shared-helper effect. All downloaded originals and derived evidence remain under .factcheck-tmp/r3/data-audit/.
