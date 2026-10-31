# fa-atari-coleco: adversarial source review

Decision: DO NOT COMMIT. SALLY pin 8 has been changed from +5 V power to ground, contrary to both Atari and MOS pin diagrams. Other wrong/unproven records are detailed below. No product file was changed.

## Coverage

Unit of coverage is one table row in the requested fix log, including grouped rows. 48 Atari rows + 34 Coleco rows + 1 additional correction = 83. Every row below has a decision. CORRECT on a removal or verify flag means the removal/qualification is honest; it does NOT certify the underlying retained claim. This distinction is essential to the counts.

| Scope | Items | CORRECT | WRONG | UNPROVEN |
|---|---:|---:|---:|---:|
| Atari | 48 | 47 | 0 | 1 |
| Coleco | 34 | 31 | 2 | 1 |
| Additional correction | 1 | 0 | 1 | 0 |
| TOTAL | 83 | 78 | 3 | 2 |

## Method and evidence handling

Read the actual uncommitted git diff and both current data files. Downloaded cited documents independently into fa-atari-coleco/. Attempted curl -L -A Mozilla/5.0 for every source. Windows curl failed TLS with SEC_E_NO_CREDENTIALS for most HTTPS requests, so used Python urllib with the same browser user agent to retrieve those sources; POKEY HTTP succeeded directly. These were local curl failures, not dead document links. Archive.org metadata was retrieved independently to resolve the actual PDF filenames. No source remained inaccessible, so no dead-link web search was needed.

Ran pdftotext -layout on downloaded PDFs. Scanned source pages were rendered with pdftoppm -f N -l N -r 110 -png; relevant PNGs are retained beside the PDFs. HTML source responses retain the .pdf download filename but are identified here as HTML. Read the source text and diagrams themselves; did not accept the log reading as evidence. Inspected waveform grid and ground markers. Values read from pictures are approximations, not electrical specifications.

Executed the actual Atari and Coleco data factories with a minimal RCS.add capture to inspect all generated models, shared connector pins, and verify propagation. The result is evaluated.json. Also executed the actual clocksBlock and printCard function bodies with deterministic formatting stubs: live clock rows show CHECK; print cards drop CHECK for both Atari 400 and ADAM. Saved generated print HTML. This is a renderer test, not a claim of physical hardware testing.

## Source key

- FSM: Atari 400/800 Field Service Manual, archive.org item atari400800fieldservicemanualmay1983; fsm.pdf. Main pages: 19 (1-6), 46 (2-8), 51 (2-13), 114 (5-16), 161 (7-20).
- XL: 800XL Field Service Manual, archive.org item atari-800-xl-computer-field-service-manual-rev-01-feb-1984; xl.pdf. Pages 13/14/15 (1-5/1-6/1-7).
- X6: 600XL Field Service Manual, archive.org item Atari600XLComputerFieldServiceManualRev1; x6.pdf. Pages 20 (1-10), 26 (1-16), 65-68 (schematic).
- CC5: Sams Atari 400, archive.org item SamsComputerfactsAtari400B; s400.pdf. PDF pages 3, 17, 40.
- CC7: Sams Atari 800, archive.org item samscomputerfactstechnicalservicedataatarimodel800computer1984sams; s800.pdf. PDF pages 3, 10, 18.
- CC11: Sams Atari 800XL, archive.org item atari800xlsamscomputerfactstechnicalservice; sxl.pdf. PDF pages 3, 7, 25, 27.
- CC16: Sams Atari 130XE, archive.org item samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams; sxe.pdf. PDF pages 3, 5, 12.
- TRN: http://www.bitsavers.org/pdf/atari/400_800/CO16555_Atari_Home_Computer_Technical_Reference_Notes_1982.pdf ; trn.pdf. PDF130-132 (printed145-147), PDF180 (printed195), PDF441 (II.20), PDF477 (III.24).
- MOS: http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf ; mos.pdf, pages4 and10.
- POKEY: http://visual6502.org/images/C012294_Pokey/pokey.pdf ; pokey.pdf, sheet10/page10.
- FAQ: https://www.atarimania.com/faq-atari-400-800-xl-xe-what-are-the-pinouts-for-the-various-connectors-on-the-atari_16.html ; faq.pdf is HTML, faq-clean.txt is stripped text. Controller, SIO, cartridge and PBI tables.
- Altirra: https://www.virtualdub.org/downloads/Altirra%20Hardware%20Reference%20Manual.pdf ; altirra.pdf, pages44 and61.
- PokeyMAX: https://64kib.com/chip_replacement.html ; max.pdf is HTML.
- Valoroso: https://www.valoroso.it/en/atari-800xl-atari-1050-shorted-power-supply/ ; valoroso.pdf is HTML.
- TM: https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf ; tm.pdf. PDF8 (III-5), 9 (III-6), 41 (VI-13), 50 (VI-22), 51 (VI-23), 60 (VII-5), 71 (VII-16), 72 (VII-17), 73 (VII-18), 74 (VII-19).
- TRM: https://colecovisionadam.com/Coleco/adam/Documents/Manual/Coleco_ADAM_Technical_Reference_Manual.pdf ; trm.pdf, PDF18,20,26,27,33,35,49,62.
- Redraw: https://colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf ; cvsch.pdf, sheet5.
- Deathskull: https://arcarc.xmission.com/Web%20Archives/Deathskull%20(May-2006)/games/tech/cvcont.html ; death.pdf is HTML, controller and steering wheel tables.
- VDP: https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf ; vdp.pdf, PDF51 (3-8), PDF83 (5-5).
- Motorola: http://www.bitsavers.org/components/motorola/_dataBooks/1984_Motorola_Single-Chip_Microcomputer_Data.pdf ; m6801.pdf, PDF101 (3-54), PDF103 (3-56).
- Z80: http://www.bitsavers.org/components/zilog/z80/03-0027-02_Z80_CPU_Product_Specification_Mar78.pdf ; z80.pdf.
- GUIDE: https://archive.org/download/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco.pdf ; guide.pdf, PDF4/printed2-3.

## Per-item ledger

### 1. Line 191 - atari400 / atari800 clock Phase 1 out

**CORRECT**. Ledger: 01:46, 01:47.

- Logged change: exact PAL/NTSC from the 6502 sheet -> `verify: true`.
- Was change needed? Yes, quarantine.
- Source decision: MOS p.4 shows phase relationship, not Atari NTSC/PAL frequencies. Both generated Phase 1 rows now have verify:true. The flag honestly preserves the unresolved board-specific rate.

### 2. Line 192 - K0 scope note (all Ataris)

**CORRECT**. Ledger: 01:50-53, 14:126.

- Logged change: 63.7 µs / 114 cycles attributed to the POKEY sheet -> rate stated as half the line rate, line rates under Clocks.
- Was change needed? Yes, attribution.
- Source decision: POKEY sheet 10 (pokey-10.png) says the binary counter counts once per line when enabled by SKCTL. K0 therefore has half the line rate; TRN PDF441/II.20 and Altirra p.61 supply line timing. This is a documented calculation, not a frequency printed on the POKEY sheet.

### 3. Line 193 - 400/800 clock Phase 2

**CORRECT**. Ledger: 02:194, 02:195.

- Logged change: label p. II.22 -> p. II.20; `verify: true`.
- Was change needed? Yes.
- Source decision: TRN PDF441 is printed II.20, and states 114 cycles/line and 1.79 MHz. Exact PAL and extra pin connections are not all established there; verify:true is present on both generated rows.

### 4. Line 194 - atari-sio pin 5 expect

**CORRECT**. Ledger: 02:199, 02:240, 12:167, 14:4, 18:4.

- Logged change: idles about +4 V -> idles HIGH.
- Was change needed? Yes, remove spurious voltage precision.
- Source decision: SIO pin 5 remains DATA OUT, idle HIGH. TRN PDF130-131 gives positive logic and stop bit HIGH; Sams CC11 PDF3 shows the output connection and its resting high voltage. The former exact-ish +4 V expectation is no longer universalized.

### 5. Line 195 - atari-sio pin 10 expect

**CORRECT**. Ledger: 02:202, 02:245, 12:171, 14:9.

- Logged change: +4.9 V (Sams 130XE) -> +5 V.
- Was change needed? Yes.
- Source decision: TRN PDF131/printed146 names pin10 +5V/READY and a +5 volt supply. FAQ SIO table agrees; a 130XE measured 4.9 V is not a nominal specification for every model.

### 6. Line 196 - atari-sio pin 12 (400/800)

**CORRECT**. Ledger: 02:204, 02:247.

- Logged change: +11.5 to +12.5 V -> +12 V.
- Was change needed? Yes.
- Source decision: TRN PDF131 and FSM PDF46/51 show +12 V on 400/800 SIO pin12. Neither supplies the deleted +/-0.5 V tolerance.

### 7. Line 197 - atari-sio pin 2 expect

**CORRECT**. Ledger: 12:164.

- Logged change: pulses only during I/O -> pulses during serial I/O.
- Was change needed? Yes, narrowing only.
- Source decision: TRN PDF130-131 explicitly states CLOCK OUT rises at the start of each output data bit and falls in its middle. It supports pulses during serial output, but not the former exclusive 'only'.

### 8. Line 198 - atari-sio pins 9, 13

**CORRECT**. Ledger: 18:8, 18:12.

- Logged change: not used by the OS -> `verify: true`.
- Was change needed? Conservative, underlying statement actually documented.
- Source decision: verify:true is present on both pins. TRN PDF131-132 describes PROCEED/INTERRUPT as unused by the present OS/peripherals and pulled HIGH. Flag is honest but unnecessary for that historical OS-specific statement.

### 9. Line 199 - atari-controller(-2..4) pins 1, 2

**CORRECT**. Ledger: 02:206-273 (16 rows), 12:174, 12:175, 14:11-20.

- Logged change: "also trackball, touch tablet and paddle trigger" on every direction pin -> pin 1: trackball X direction and stylus button; pin 2: trackball X motion; pin 3: paddle A trigger; pin 4: paddle B trigger.
- Was change needed? Yes.
- Source decision: FAQ controller tables 1-4 explicitly put trackball X direction and stylus button on pin1, X motion on pin2. TRN PDF477/III.24 puts paddle triggers on pins3/4. Evaluated shared controller factory produces the corrected distinctions for every Atari/controller instance.

### 10. Line 200 - controller pins 3, 4

**CORRECT**. Ledger: 17:175, 17:176, 17:183, 17:184.

- Logged change: trackball / tablet -> removed (paddle triggers only).
- Was change needed? Not required for factual accuracy.
- Source decision: The deletions are real. TRN PDF477 proves paddle A/B triggers; FAQ additionally proves trackball Y direction/motion and tablet left/right buttons on pins3/4. Removing those supported extra uses is conservative information loss, not a false new claim.

### 11. Line 201 - controller pins 5, 9 expect

**CORRECT**. Ledger: 17:177, 17:180, 17:185.

- Logged change: 0-5 V analog -> removed.
- Was change needed? Not required.
- Source decision: expect fields really are absent on pins5/9. FAQ controller tables explicitly say analog input 0V-5V. Removing them is honest but the cited FAQ would have supported the old range.

### 12. Line 202 - controller pin 7 expect

**CORRECT**. Ledger: 02:219-277, 12:180, 14:17, 14:25, 17:187.

- Logged change: +5 V (Sams 4.9 V on 130XE) -> +5 V; 50 mA attributed to the FAQ.
- Was change needed? Yes, nominal versus measured value.
- Source decision: FAQ controller tables state +5V, 50mA current rating on pin7 for ports1-4. All generated records now give nominal +5V and attribute 50mA to the FAQ.

### 13. Line 203 - atari-monitor pin 4 expect

**CORRECT**. Ledger: 02:283, 14:113, 18:16.

- Logged change: about 1 V p-p into 75 Ω -> removed.
- Was change needed? Yes, removal is honest.
- Source decision: The numeric expectation has been removed from shared monitor pin4; no replacement amplitude is asserted. FAQ identifies composite video but does not establish the deleted universal loaded amplitude.

### 14. Line 204 - pokey replacement PokeyMAX

**CORRECT**. Ledger: 07:173.

- Logged change: extras need extra wiring -> clause removed.
- Was change needed? Yes.
- Source decision: Opened maker page max.pdf (HTML). It identifies v4 SID/PSG/Covox features and open design, but does not establish a universal extra-wiring requirement. That clause is actually removed.

### 15. Line 205 - cpu6502c pin 2 RDY

**CORRECT**. Ledger: 12:124.

- Logged change: WSYNC pulses -> removed.
- Was change needed? Yes, narrow to observed pin state.
- Source decision: Sams CC16 PDF5 shows RDY and its 3k pullup; the new probe text is HIGH at rest. Deleted WSYNC pulse attribution no longer claims the schematic directly establishes software-dependent pulses.

### 16. Line 206 - cpu6502c pin 6 /NMI

**CORRECT**. Ledger: 12:127.

- Logged change: VBI, DLI, RESET key -> display interrupts only; XL/XE RESET drives /RES pin 40.
- Was change needed? Yes.
- Source decision: Sams CC11 PDF3 routes the reset switch through the reset circuit to CPU pin40, separately from ANTIC NMI to CPU pin6. CC16 PDF3/5 agrees on reset versus NMI wiring. Removing RESET key from the XL/XE NMI causes is necessary.

### 17. Line 207 - cpu6502c pins 7, 34

**CORRECT**. Ledger: 12:128, 12:149.

- Logged change: stock 6502 comparison unsourced -> MOS 6500 data sheet p. 10 added to datasheets.
- Was change needed? Yes, missing citation supplied.
- Source decision: MOS November1985 PDF10 explicitly shows SYNC on stock 6502 pin7 and R/W on34. 800XL FSM PDF13/Fig1-3 shows modified 6502C pins7/34 NC and R/W on36. Added citation establishes the comparison.

### 18. Line 208 - atari-cart pin 14 (XL/XE)

**CORRECT**. Ledger: 12:201, 14:39.

- Logged change: GTIA T3 on the 130XE -> clause removed.
- Was change needed? Not required if CC16 schematic is cited.
- Source decision: The cartridge description no longer contains the GTIA-T3 clause. CC16 PDF3 actually shows RD5 to GTIA pin11/T3, so deletion is conservative; it adds no false replacement statement.

### 19. Line 209 - atari-cart pin 14 (400)

**CORRECT**. Ledger: 13:137.

- Logged change: RD5 disables RAM -> type nc: not connected on the 400.
- Was change needed? Yes.
- Source decision: FAQ cartridge table explicitly says pin14 RD5 except400 Not Connected. The actual 400-specific pin object is type:nc; 800 and XL/XE remain control pins.

### 20. Line 210 - atari-pbi pins 2, 43

**CORRECT**. Ledger: 12:219, 12:252.

- Logged change: functional descriptions -> "External select (input)", "Math pack disable (input)".
- Was change needed? Yes, remove unsupported detail from this citation.
- Source decision: FAQ PBI table labels pin2 External Select (Input), pin43 Math Pack Disable (Input). The abbreviated new descriptions match it.

### 21. Line 211 - atari-pbi pins 47, 48 (600XL)

**CORRECT**. Ledger: 14:97, 14:98.

- Logged change: Reserved N/C -> +5 V (type power), conflict keeps the FSM Fig. 1-12 reading.
- Was change needed? Yes.
- Source decision: FAQ states600XL pins47/48 +5V,800XL Reserved. Rendered600XL FSM PDF26/Fig1-12 indeed says Reserved N/C, while schematic PDF68 explicitly connects47/48 to+5A. The new power type and conflict preserve the real disagreement.

### 22. Line 212 - Atari clock rows colour clock, fast phase 0, phase 0, phase 1/2

**CORRECT**. Ledger: 13:0, 14:104-109, 14:132, 14:133, 17:160-166, 18:30-32, 38:190, 38:193, 38:196, 38:199.

- Logged change: exact PAL values not in the cited page -> `verify: true`.
- Was change needed? Yes, honest quarantine.
- Source decision: Inspected generated Atari clocks: affected colour/fast/CPU rows carry verify:true. Sams pages show NTSC observations, and Altirra44/61 provide timing but not all specified package pins. The PAL/source-pin coverage gap is honestly flagged rather than declared settled.

### 23. Line 213 - 400/800 crystal and colour clock

**CORRECT**. Ledger: 13:2, 13:5-7, 17:151.

- Logged change: 3.579545 MHz -> crystal row 3.58 MHz; colour clock `verify: true`; 400 crystal now cites FSM p. 5-16 (400 flow chart), 800 keeps p. 7-20.
- Was change needed? Yes.
- Source decision: FSM PDF114/5-16 is specifically400 and says3.58MHz atR158,swapX101/Q103/Q104. PDF161/7-20 is800 and says3.58MHz atR106. Crystal rows now use3.58 and correct per-machine source; exact colour-clock rows remain flagged.

### 24. Line 214 - 400/800 firstTen 4

**CORRECT**. Ledger: 13:3, 13:4.

- Logged change: FSM symptom checklist source; 4116 warning -> source changed to the Sams preliminary service checks; warning removed.
- Was change needed? Yes, values now cited to relevant checks.
- Source decision: Sams CC5 PDF3 power checks explicitly give12.25V A201 output and-5.01V CR201 anode. CC7 PDF3 gives11.8V and-5.0V. Warning is actually removed; related supply circuit components appear in FSM PDF46/51.

### 25. Line 215 - 400/800 rails

**CORRECT**. Ledger: 13:11-18.

- Logged change: 4.75-5.25 / 11.5-12.5 / -4.5 to -5.5 V -> +5 V / +12 V / -5 V; -5 V warning removed.
- Was change needed? Yes.
- Source decision: FSM PDF19/1-6 names+5A,+5B,+12,-5 rails and distinguishes filtered video rail. PDF46/51 show regulator/zener connections. Invented tolerance bands and unsupported damage claim were removed; nominal rails are supported.

### 26. Line 216 - antic pin 7 /NMI

**CORRECT**. Ledger: 13:24.

- Logged change: VBI / DLI -> `verify: true`.
- Was change needed? Yes, honest flag.
- Source decision: ANTIC pin7 now has verify:true. FSM PDF14/Fig1-4 calls it Interrupt Output and CC16 PDF3 shows it on NMI, but those pin figures alone do not enumerate VBI/DLI causes. The remaining detail is honestly quarantined.

### 27. Line 217 - antic A0-A13, A15

**CORRECT**. Ledger: 13:27-42.

- Logged change: dir bidir -> `verify: true` with "direction not stated in the cited pin figures".
- Was change needed? Yes, honest flag.
- Source decision: FSM PDF14/Fig1-4 names the address pins without directions. Every affected pin now explicitly says direction is not stated and carries verify:true. A14 already had that qualification.

### 28. Line 218 - antic pin 15 RDY

**CORRECT**. Ledger: 13:31.

- Logged change: WSYNC -> removed.
- Was change needed? Yes, remove unsupported attribution.
- Source decision: Sams CC16 PDF3 and FSM pin figure establish RDY output to CPU, not a software-specific waveform diagnosis. WSYNC wording was actually removed.

### 29. Line 219 - antic pin 35 probe

**CORRECT**. Ledger: 13:49.

- Logged change: Sams 800, 800XL photos -> Sams 130XE photo only.
- Was change needed? Yes.
- Source decision: CC16 PDF3 shows the pin35 fast-clock waveform annotated4.5Vpp,0.1us. CC7 PDF10 has5Vpp and CC11 PDF25 has4.4Vpp instead. Restricting the4.5V assertion to130XE is necessary.

### 30. Line 220 - gtia pins 12-15

**CORRECT**. Ledger: 13:65-68.

- Logged change: CONSOL bit numbers -> removed.
- Was change needed? Yes.
- Source decision: 800XL FSM PDF15/Fig1-5 labels S0/Option,S1/Start,S2/Select,Keyboard Click. Removed bit-number equivalences were not established by that diagram; retained conflict distinguishes register ordering from pin labels.

### 31. Line 221 - pokey K0-K4, KR1, KR2 probes

**CORRECT**. Ledger: 13:103-110.

- Logged change: "all the time", "(Sams)" -> "while the keyboard scan runs"; `verify: true`.
- Was change needed? Yes, honest flags.
- Source decision: POKEY sheet10 explicitly conditions scanning on SKCTL enable, unlike 'all the time'. K0-K4 and KR1/KR2 objects now have verify:true; CC11 PDF3 shows key-held acquisition conditions. K5 is outside this row's enumerated change.

### 32. Line 222 - pokey pin 29 /IRQ

**CORRECT**. Ledger: 13:114.

- Logged change: interrupt causes -> removed.
- Was change needed? Not necessary if full POKEY documentation is used.
- Source decision: The cause list is actually removed, leaving only Interrupt request to CPU, supported by FSM POKEY pin figure and CC16 wiring. Deletion adds no new claim.

### 33. Line 223 - atari600xl firstTen 1 ifNot

**CORRECT**. Ledger: 13:219.

- Logged change: 5.25 V, fails high and kills RAM -> "outside that band: do not plug it in".
- Was change needed? Yes.
- Source decision: 600XL FSM PDF20/1-10 explicitly rates output+5VDC+/-2%. New stop condition refers to the displayed4.9-5.1V band, removing an inconsistent5.25V threshold.

### 34. Line 224 - atari130xe rail +5 V

**CORRECT**. Ledger: 13:222.

- Logged change: 4.9-5.1 V (600XL spec) -> +5.0 V (Sams).
- Was change needed? Yes.
- Source decision: CC16 PDF3/5 show5.0V supply annotations. Evaluated130XE rails use xeRails/+5.0V(Sams), not600XL's4.9-5.1V tolerance.

### 35. Line 225 - 800XL / 130XE HALT scope note

**CORRECT**. Ledger: 14:118, 17:170.

- Logged change: mode dependence, flat-LOW diagnosis -> removed; line rate attributed to Hardware Manual.
- Was change needed? Yes, honest deletion.
- Source decision: HALT scope notes no longer assert the removed mode-dependent diagnosis. CC11 PDF25 andCC16 PDF3 show HALT waveforms; TRN441 documents ANTIC cycle stealing. Period attribution now points to timing separately.

### 36. Line 226 - composite sync scope notes

**CORRECT**. Ledger: 14:119, 17:155, 17:171.

- Logged change: PAL 15.56 kHz, p. II.22 -> NTSC from Hardware Manual p. II.20, PAL under Clocks.
- Was change needed? Yes.
- Source decision: TRN PDF441/II.20 gives114 cycles at1.79MHz per line, approximately15.7kHz. PAL timing is separately in Altirra61 under Clocks. New printed-page number and attribution are correct.

### 37. Line 227 - 800XL video / luma scope notes

**CORRECT**. Ledger: 14:120, 14:121.

- Logged change: unloaded, half into 75 Ω -> removed; period attributed to Hardware Manual.
- Was change needed? Yes.
- Source decision: CC11 PDF25 shows1.5Vpp video and1.6Vpp luma but does not state the deleted unloaded/75ohm halving rule. Both unsupported claims are gone; TRN441 supports approximate63.7us line period.

### 38. Line 228 - XL/XE firstTen 1 brick

**CORRECT**. Ledger: 14:122.

- Logged change: 4.7 Ω 5 W load, 4.9-5.1 V, 5.25 V -> unloaded +5.0 V (Sams); load test moved to supply note with a 10 W resistor (5.3 W at 5 V).
- Was change needed? Yes.
- Source decision: CC11 PDF27 expressly says unplug pack and check5.0V between plugP7 pins3/1. New firstTen step matches. Supply note's resistor calculation is5^2/4.7=5.319W, so increasing5W to10W is justified arithmetic;600XL FSM20 separately supports4.9-5.1V brick rating.

### 39. Line 229 - atari130xe firstTen 2

**CORRECT**. Ledger: 14:124.

- Logged change: 800XL source -> Sams CC16 p. 12 (check J7 for a short).
- Was change needed? Yes.
- Source decision: CC16 PDF12 expressly instructs checkingJ7 pins3/1 for a short withS1ON before fitting replacement pack. Generated130XE second step now cites this source rather than800XL.

### 40. Line 230 - 800XL tape scope note

**CORRECT**. Ledger: 14:127.

- Logged change: Technical Reference Notes p. 180 -> OS User's Manual printed p. 195 (TRN PDF p. 180).
- Was change needed? Yes.
- Source decision: TRN PDF180 is printed OS195; it explicitly givesMARK5327Hz andSPACE3995Hz. The page-label correction is exact.

### 41. Line 231 - firstTen CPU running

**CORRECT**. Ledger: 14:131, 18:29 (and the 400, 130XE copies).

- Logged change: pin 9 to pin 25 -> pins 9-20 and 22-25 (pin 21 is ground).
- Was change needed? Yes, important wrong-pin fix.
- Source decision: MOS PDF10 shows6502 pin21VSS and addresses9-20,22-25. 800XL FSM13 andCC16 PDF12 agree forSALLY. All four firstTen copies exclude ground21. Sams CC5 PDF17 independently lists those split address ranges.

### 42. Line 232 - 800XL firstTen 5 ifNot

**CORRECT**. Ledger: 14:134.

- Logged change: FSM C109 sentence -> removed.
- Was change needed? Yes, removal honest.
- Source decision: The C109/FSM sentence is gone. Remaining Sams clock troubleshooting is distinct; sourceCC11 PDF7 supplies the oscillator check (source checked below in supplementary evidence).

### 43. Line 233 - atari400 firstTen 6

**CORRECT**. Ledger: 17:148.

- Logged change: 1.79 MHz -> "about 1.79 MHz"; `verify: true`.
- Was change needed? Yes, honest quarantine.
- Source decision: CC5 PDF17 asks to check waveform onCPU pin37 but gives no numericCPU frequency there. New firstTen step saysAbout1.79MHz and verify:true. This is honest about remaining source precision.

### 44. Line 234 - 400 scope colour clock, phase 0, phase 2

**UNPROVEN**. Ledger: 17:152-154.

- Logged change: 3.579545 / 1.78977 MHz -> 3.58 / 1.79 MHz as Sams prints.
- Was change needed? Precision reduction needed; incomplete.
- Source decision: CC5 PDF40 printsX1013.579575MHz and scope0.5us/cm, but does not print1.79MHz on the phase0/phase2 waveforms. New1.79 is plausible and agrees withTRN441, but these scope records cite onlyCC5PDF40 and lack either that second attribution or a flag. Rounding alone does not cure the source gap; contrast firstTen step6 now explicitly flagged. Colour-clock3.58 is a valid rounding of printed crystal rate.

### 45. Line 235 - 130XE firstTen 1

**CORRECT**. Ledger: 17:156.

- Logged change: 4.7 Ω load, 5.25 V -> +5.0 V unloaded (Sams).
- Was change needed? Yes.
- Source decision: CC16 PDF12 expressly gives5.0V at unpluggedP7 pins3/1. The new130XE step uses this unloaded measurement, not600XL tolerance or a4.7ohm test.

### 46. Line 236 - 800 colour clock scope

**CORRECT**. Ledger: 18:33.

- Logged change: 3.579545 MHz, FSM flow sentence -> 3.58 MHz; sentence removed.
- Was change needed? Yes.
- Source decision: CC7 PDF3/10 printsX1013.579575MHz, reasonably rounded3.58. DeletedFSM troubleshooting sentence is absent; remaining source note reports the printed crystal value accurately.

### 47. Line 237 - 600XL firstTen 2

**CORRECT**. Ledger: 38:189.

- Logged change: 4.9-5.1 V under 4.7 Ω 5 W -> about 5 V under a 4.7 Ω 10 W load.
- Was change needed? Yes.
- Source decision: OpenedValoroso article:4.7ohm load,nominal5V,about1A. It proposes5W, but arithmetic gives5.319W; new10W recommendation corrects that weakness. Exact4.9-5.1 was removed from this article-specific step, and source remains markedverify.

### 48. Line 238 - CLK_LINE / CLK_FRAME rows

**CORRECT**. Ledger: 38:191, 192, 194, 195, 197, 198, 200-203.

- Logged change: GTIA pin 25 not in Altirra -> `verify: true`.
- Was change needed? Yes, honest flag.
- Source decision: Altirra PDF61 Table6 supplies all four frequency values exactly. It does not specify GTIA package pin25. Both sharedCLK_LINE/CLK_FRAME now carryverify:true and evaluation confirms propagation to all five machines.

### 49. Line 244 - adam testPoint 6801 E clock scope

**CORRECT**. Ledger: 01:232.

- Logged change: duty 50% -> duty removed.
- Was change needed? Yes.
- Source decision: Motorola data book PDF103/3-56 gives ELOW min430ns,EHigh min450ns and cycle min1us, not fixed50%duty. Duty property removed; other quoted output limits are defined inPDF101/3-54.

### 50. Line 245 - adam testPoint Z80 clock scope

**CORRECT**. Ledger: 02:183.

- Logged change: f 3.579545 MHz -> 3.58 MHz; 50% duty kept (TRM 2.2.8 states it).
- Was change needed? Yes.
- Source decision: TRM PDF35 section2.2.8 explicitly says3.58MHz and50%duty from divided7.1MHz oscillator. Newf3.58 and retained50%duty match; Z80 product spec supplies threshold limits rather than captured levels.

### 51. Line 246 - adam firstTen 5 reset

**CORRECT**. Ledger: 18:98.

- Logged change: Z80 pin 26 / 6801 pin 6 -> `verify: true`.
- Was change needed? Yes, honest flag.
- Source decision: GUIDE PDF4/printed2-3 describes reset-switch positions, not voltages onZ80pin26/6801pin6. Step now hasverify:true; it no longer presents the pin-level expectation as settled by an owner's guide.

### 52. Line 247 - adam clock System oscillator

**CORRECT**. Ledger: 27:191.

- Logged change: 7.15909 MHz -> 7.1 MHz.
- Was change needed? Yes.
- Source decision: TRM PDF35 prints7.1MHz, not7.15909. New oscillator rate matches available precision; unreadable designator remains admitted.

### 53. Line 248 - adam clock Z80 clock

**CORRECT**. Ledger: 27:192.

- Logged change: 3.579545 MHz -> 3.58 MHz.
- Was change needed? Yes.
- Source decision: TRM PDF35 explicitly says system clock3.58MHz. Expansion pin45 is listed3.58MHz inTRM PDF20. New rounded rate matches both.

### 54. Line 249 - adam clock VDP clock

**WRONG**. Ledger: 27:193.

- Logged change: TMS9918A, 10.738635 MHz -> "TMS9928A; third harmonic", 10.7 MHz.
- Was change needed? Device-family correction needed but incomplete.
- Source decision: TRM PDF 33 section 2.2.4 names TI 9928; PDF 35 specifies 10.7 MHz and third harmonic tank. The clock name now says TMS9928A, but the SAME row still says TMS9918A pin 40 in where. Correct that probe label to the 9928 family consistently. New rate is correct; the device identification is internally contradictory.

### 55. Line 250 - cv-controller / adam-controller pin 7

**CORRECT**. Ledger: 27:227, 27:267.

- Logged change: SPINNER B -> SPINNER A (quadrature input A).
- Was change needed? Yes.
- Source decision: Deathskull Sub-controller 1 and Steering Wheel tables explicitly put Quadrature input A on pin 7. TRM PDF 35 independently identifies pin 7 as indirect D5. The shared controller array updates ColecoVision and ADAM.

### 56. Line 251 - cv-controller / adam-controller pin 9

**CORRECT**. Ledger: 27:229, 27:269.

- Logged change: SPINNER A -> SPINNER B (quadrature input B).
- Was change needed? Yes.
- Source decision: Deathskull same tables explicitly put Quadrature input B on pin 9. TRM PDF 35 identifies pin 9 as indirect INT. Swapping former A/B labels is supported.

### 57. Line 252 - adam-expansion pin 5

**CORRECT**. Ledger: 27:274.

- Logged change: $4000-$5FFF -> Y2 per TRM; range noted as ColecoVision only; `verify: true`.
- Was change needed? Yes, honest quarantine.
- Source decision: TRM PDF 20 lists pin 5 Y2 LS138 decoder output without an ADAM address range. New description names Y2 and limits $4000-$5FFF to ColecoVision, with verify:true. Name still inherits the range but is visibly quarantined; no newly proven ADAM mapping is claimed.

### 58. Line 253 - adam-expansion pin 6

**CORRECT**. Ledger: 27:275.

- Logged change: $2000-$3FFF -> Y1 per TRM; same; `verify: true`.
- Was change needed? Yes, honest quarantine.
- Source decision: TRM PDF 20 lists pin 6 Y1 LS138 decoder output without an ADAM address range. New description limits $2000-$3FFF to ColecoVision and adds verify:true. Same inheritance qualification as previous row.

### 59. Line 254 - adam-expansion pin 7

**CORRECT**. Ledger: 27:276.

- Logged change: Z80 HALT output -> `conflict`: TRM prints "HALT input".
- Was change needed? Yes, honest conflict.
- Source decision: TRM PDF 20 really prints HALT input at pin 7. Z80 HALT itself is an output (product specification signal descriptions). New conflict quotes the unresolved connector versus CPU direction instead of claiming the manual proves output.

### 60. Line 255 - adam-expansion pin 10

**CORRECT**. Ledger: 27:278.

- Logged change: redraw net QUAD -> removed for ADAM.
- Was change needed? Yes.
- Source decision: TRM PDF 20 names SPINNER INT DISABLE on pin 10; rendered PDF 27 says SPINDIS allows disabling spinner interrupts and is active LOW. QUAD redraw net reference was removed from the ADAM override.

### 61. Line 256 - adam-expansion pin 29

**CORRECT**. Ledger: 27:295.

- Logged change: /MEMMAPOVR, module pulls low -> AUX DECODE 1: from the Memory and I/O board, selects the OS-7 ROM.
- Was change needed? Yes.
- Source decision: TRM PDF 26 explicitly says AUXDECODE1 is generated by the Memory and I/O Board and selects or deselects OS-7 ROM. PDF 20 identifies pin 29 as AUXDECODE1. New object uses that name and function, without an invented module-pulls-low override.

### 62. Line 257 - adam-expansion pin 30

**CORRECT**. Ledger: 27:296.

- Logged change: /IOMAPOVR -> AUX DECODE 2; `verify: true`.
- Was change needed? Yes, honest quarantine.
- Source decision: TRM PDF 20 pin 30 says AUXDECODE2 input; PDF 27 does not define its usable function or polarity. New object says these are not given and has verify:true. The old /IOMAPOVR does not survive in the ADAM override.

### 63. Line 258 - adam-expansion pin 34

**CORRECT**. Ledger: 27:300.

- Logged change: /EXT_RST input -> GAME MODE RESET output.
- Was change needed? Yes, important direction fix.
- Source decision: TRM PDF 20 explicitly labels pin 34 GAME MODE RESET output. New object says output, not an input a module should drive. Old external reset input description is absent.

### 64. Line 259 - adam-expansion pin 56

**CORRECT**. Ledger: 27:320.

- Logged change: AUDIO -> kept; already `verify: true` with the TRM wording.
- Was change needed? No change needed; flag already honest.
- Source decision: TRM PDF 20 exact wording is AUDIO 76489 RDY output. Actual pin 56 object retains the ambiguity and verify:true. No diff for this already flagged record, as the log says.

### 65. Line 260 - adam firstTen 3

**CORRECT**. Ledger: 27:343.

- Logged change: +4.82 to +5.15 V at the chip -> about +5 V (cable tolerance named); `verify: true`.
- Was change needed? Yes, honest quarantine.
- Source decision: TRM PDF 49 section 6.3 is expressly the Printer/Memory Console Interface Cable table. New step 3 says About 5 V and explains 4.82-5.15 belongs at the cable end; verify:true is present. Endpoints compute as 5.075-.255=4.820 and 5.075+.079=5.154.

### 66. Line 261 - adam firstTen 4 ifNot

**UNPROVEN**. Ledger: 27:344.

- Logged change: "stresses the 4116" -> cable / J9 / supply check only.
- Was change needed? Warning removal honest; record still exceeds source.
- Source decision: The stresses-4116 sentence is gone, but this step STILL expects +11.4 to +12.5 V at 4116 pin 8 and -4.90 to -5.40 V at pin 1 without verify. TRM PDF 49 section 6.3 concerns the cable interface, not at-chip acceptance. It prints -5.15 VDC +.25 V only; no lower -.25 V tolerance is printed. Thus -5.40 V is not established even for the cable. Apply the cable versus chip distinction already used by step 3; no proven replacement at-chip limits are available here.

### 67. Line 262 - adam firstTen 8

**CORRECT**. Ledger: 27:347.

- Logged change: flat-line diagnosis -> `verify: true`.
- Was change needed? Yes, honest quarantine.
- Source decision: TRM PDF 62 section 3.7 states 62.5 kbaud, 16 us bit cell, 160 us byte, but not the flat-line diagnostic. verify:true now covers the step. TRM PDF 18 identifies the master 6801, MIOC and interface circuitry but does not prove flat line implies these component faults.

### 68. Line 263 - colecovision rails +5, +12, -5 V

**CORRECT**. Ledger: 28:84-86.

- Logged change: 4.9-5.2 / 11.4-12.6 / -4.5 to -5.5 V -> +5 V / +12 V / -5 V.
- Was change needed? Yes.
- Source decision: Coleco TM PDF 9/III-6 explicitly gives +5 VDC, +12 VDC and -5 VDC. Deleted tolerance bands do not appear there. Nominal replacements match.

### 69. Line 264 - colecovision clock CPU

**CORRECT**. Ledger: 30:58.

- Logged change: U8B, R60 47 Ω -> "3.58 MHz, divided by two".
- Was change needed? Yes, remove unsupported component detail from this citation.
- Source decision: Coleco TM PDF 60/VII-5 explicitly gives CPU 3.579545 MHz +/-100 Hz. Divide by two is independently visible in the cited redraw PDF 5: 7.159090 MHz oscillator feeds U8B 74LS74 with D connected to /Q. New name is awkward, but actual frequency and division relationship are correct. Read it as 3.58 MHz derived by division, not 1.79 MHz.

### 70. Line 265 - colecovision clock VDP

**CORRECT**. Ledger: 30:59.

- Logged change: U22A/B, L14/C92; 10.738635 MHz -> third harmonic; 10.7 MHz.
- Was change needed? Yes.
- Source decision: Coleco TM PDF 8/III-5 explicitly says 10.7 MHz is derived from 3.58 MHz by third harmonic wave shaping. New rate and description match; removed topology and extra precision are not asserted by this page.

### 71. Line 266 - cv-rf pin 2

**CORRECT**. Ledger: 30:62.

- Logged change: shield ground -> `verify: true`.
- Was change needed? Yes, honest quarantine.
- Source decision: RF connector pin 2 now has verify:true. TM RF overview does not establish the photographic jack drawing or pin number. Existing pin 1 is also flagged. Shield pin numbering is not newly claimed verified.

### 72. Line 267 - colecovision firstTen 1

**CORRECT**. Ledger: 30:68.

- Logged change: plug pins, readings -> `verify: true` (pins from Deathskull).
- Was change needed? Yes, honest quarantine.
- Source decision: verify:true is on step 1. TM PDF 41/VI-13 starts by substituting a known good supply and does not number external plug pins 1/2/3/4. Flag honestly reflects that the measurement pinout comes from secondary connector information.

### 73. Line 268 - colecovision firstTen 3

**CORRECT**. Ledger: 30:70.

- Logged change: -5 V on 4116 pin 1 -> removed; +12 V checks only.
- Was change needed? Yes.
- Source decision: TM PDF 41/VI-13 explicitly checks +12 V at U10:8 and J4:4. It does not instruct -5 V at 4116 pin 1 in this flowchart. That extra check is removed; source-listed +12 V diagnostic paths remain.

### 74. Line 269 - colecovision master oscillator (test point, step 5, clock)

**CORRECT**. Ledger: 30:72, 30:77.

- Logged change: "74LS04 output"; 5 µs/div misprint inference; 7.15909 MHz -> "oscillator output"; inference removed; 7.159 MHz.
- Was change needed? Yes forsourceprecision; removalnotnecessary forredraw.
- Source decision: TM PDF 74/VII-19 labels U22:8 7.159 MHz clock and shows about 3 V p-p at 1 V/div. Misprint inference is gone. Clock tree still has 7.15909 MHz, but cites redraw PDF 5, which prints 7.159090; this is not an unfixed TM precision claim. 74LS04 is visible in the redraw, but generic oscillator output is accurate.

### 75. Line 270 - colecovision firstTen 6

**CORRECT**. Ledger: 30:73.

- Logged change: 0 to about 4.9 V -> removed.
- Was change needed? Yes, removeunnecessaryexactlevels.
- Source decision: The 0 to 4.9 V expectation is removed. TM PDF 60 supports 3.579545 MHz +/-100 Hz; PDF 50/VI-22 supports CPU clock troubleshooting. No new voltage level is asserted.

### 76. Line 271 - colecovision firstTen 7

**CORRECT**. Ledger: 30:74.

- Logged change: about 3.4 V peaks -> removed.
- Was change needed? Yes.
- Source decision: 3.4 V peak expectation is removed. TM PDF 72/VII-17 labels the 10.7 MHz VDP clock. Flowchart TM PDF 51 checks 10.7 MHz components; new expectation has only the supported rate.

### 77. Line 272 - colecovision testPoint Z80 clock scope

**CORRECT**. Ledger: 30:76.

- Logged change: duty 50% -> removed.
- Was change needed? Not required asanapproximation; conservative.
- Source decision: Duty property is removed from CPU clock scope. TM PDF 60 shows approximately equal high and low durations but does not state an exact 50% duty specification. Deletion is honest and conservative.

### 78. Line 273 - colecovision testPoint VDP clock scope

**CORRECT**. Ledger: 30:78.

- Logged change: 10.738635 MHz, 0-3.4 V, U22A/B L14/C92 -> 10.7 MHz, no levels, topology removed.
- Was change needed? Yes.
- Source decision: TM PDF 72/VII-17 explicitly labels U9:40 10.7 MHz with 1 V/div, 50 ns/div. New 10.7 MHz and removed peak levels/topology match available evidence; III-5 supports the third harmonic note.

### 79. Line 274 - colecovision testPoint Colour reference scope

**CORRECT**. Ledger: 30:79.

- Logged change: 8.6-10.6 V -> pp 2 V; DC roughly +10 to +12 V in the note.
- Was change needed? Yes, old8.6-10.6wrong.
- Source decision: TM PDF 60/VII-5 has 2 V/div, ground arrow about one grid line above the bottom, and about one division p-p. Roughly 4.75-5.75 divisions above ground gives about 9.5-11.5 V. New roughly 10-12 V is coarse whole-volt rounding of that reading; 2 V p-p matches. Do not treat it as an exact DC acceptance band; none is given.

### 80. Line 275 - colecovision testPoint Sound clock scope

**CORRECT**. Ledger: 30:80.

- Logged change: 0.2-2.3 V; misprint inference; R61/R64 -> pp 2 V; inference and divider removed.
- Was change needed? Yes, removeunsupportedprecision/inference.
- Source decision: TM PDF 73/VII-18 shows a rounded wave of roughly 4-4.5 vertical divisions at 0.5 V/div, about 2 V p-p. Approximation is reasonable. Removed timebase misprint and R61/R64 clauses are absent; frequency elsewhere in the clock generator is documented by redraw PDF 5.

### 81. Line 276 - colecovision testPoint VDP luma scope

**WRONG**. Ledger: 30:81.

- Logged change: 1.6 / 2.1 / 3.3 V -> 2.0 / 2.4 (black) / 3.5 V.
- Was change needed? Oldreadingneededcorrection; newreadingstillwrong.
- Source decision: TM PDF 71/VII-16, middle U9:36 picture: 1 V/div, ground arrow about the first grid line above the bottom. Sync is roughly 2.1-2.3 V, blanking about 2.5-2.7 V, peak detail about 3.7-3.9 V (approximately 2.2/2.6/3.8 V at scan resolution). New 2.0/2.4/3.5 V understates especially the peak. Old 1.6/2.1/3.3 V was also wrong. Use honest approximate values or remove DC levels; neither decimal triplet is proven.

### 82. Line 277 - colecovision / adam clocks line rate, frame rate, GROMCLK

**CORRECT**. Ledger: 31:37-41.

- Logged change: VDP manual only -> `verify: true`.
- Was change needed? Yes, honest quarantine.
- Source decision: VDP manual PDF 51/3-8 proves 342 pixel clocks per line, 262 lines per frame and approximately 60 fps; PDF 83/5-5 gives GROM clock crystal/24. These pages do not prove the board's unused net and all physical connections. All three ColecoVision and two ADAM clock rows have verify:true in evaluated data.

### 83. Line 453 - cpu6502c pin 8

**WRONG**. Ledger: additional.

- Logged change: Vcc, supply -> GND, ground.
- Was change needed? No; revertthischange.
- Source decision: MOS PDF 10 explicitly marks 6502 pin 8 VCC, not ground. 800XL FSM PDF 13/Fig. 1-3 explicitly marks modified 6502C pin 8 +5V POWER, VCC. Sams CC16 PDF 5 marks U8 pin 8 supply 5.0 V and grounds 1/21. Correct object: name Vcc, type power, desc +5 V supply. Existing +5.0 V probe and vcc terms now contradict the GND label. Using pin 8 as a ground clip can short the +5 V rail.

## Findings, by severity

1. HIGH - cpu6502c pin 8 is +5 V, not ground (atari.js:59; scope line453). Atari XL FSM Fig.1-3/PDF13, MOS PDF10 and Sams CC16 PDF5 all agree. A grounded scope clip on that pin shorts the supply. Revert the GND/type-ground edit. Principle: prove-it-works; fix-root-causes.

2. MEDIUM - Coleco luma capture still has wrong DC levels (coleco.js:631; scope line276/30:81). TM VII-16/PDF71 middle capture supports approximately 2.2 V sync, 2.6 V blanking, 3.8 V peak, with scan uncertainty. New 2.0/2.4/3.5 is not a reliable reading. Do not substitute a new precise triplet without stating the uncertainty. Principle: prove-it-works.

3. MEDIUM - ADAM VDP correction leaves the wrong device in the probe location (coleco.js:725; scope line249/27:193). Name says TMS9928A, where still says TMS9918A. TRM PDF33 names TI9928. Fix the complete record consistently. Principle: fix-root-causes.

4. MEDIUM - ADAM step4 still applies cable tolerances at chip pins and invents the lower -5.40 V endpoint (coleco.js:711; scope line261/27:344). TRM section6.3/PDF49 prints -5.15V +.25V without a negative tolerance. It does not give an at-chip acceptance band. The preceding step3 correctly admits the cable-versus-chip distinction, but step4 does not. Principle: fix-root-causes; prove-it-works.

5. MEDIUM - Atari 400 scope rates retain a citation gap (atari.js:633,636; scope line234/17:152-154). CC5 PDF40 does not print the 1.79 MHz values. Cite the independent timing source explicitly, show a documented derivation, or flag the scopes; reducing digits does not prove a waveform frequency. Principle: prove-it-works.

6. MEDIUM - Supplemental delivery-path problem affecting scope flags: printCard omits verify markers for clocks and firstTen steps (src/app.js:1374,1385). Actual renderer execution: Atari400 has7 flagged clock rows, live CHECK=true, print CHECK=false; ADAM has2, live=true, print=false. Thus newly quarantined data becomes unqualified on the printed bench reference. Preserve flags on every output, including printed connector pins. Saved atari400-print.html and adam-print.html show the generated result. This is not an extra scope row and is not counted twice. Principle: prove-it-works; fix-root-causes.

No serialize-shared-state-mutations defect was established. No product edits, commits, external messages, or concurrent agents were used. All writes are under .factcheck-tmp/. No hardware was powered or probed. This review certifies source inspection, not a physical-board test.
