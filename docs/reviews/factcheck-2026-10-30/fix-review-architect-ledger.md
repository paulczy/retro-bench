# Architect fix review ledger

Verdict: BLOCK COMMIT. Four independent supply/reset reversals are high severity. Every ordinary git diff -- src/data hunk has a decision below.

Scope accounting: one item = one ordinary Git hunk, including every added/removed field in that hunk. A hunk with mixed outcomes gets WRONG if any changed assertion is contradicted, otherwise UNPROVEN if any claim remains unestablished, otherwise CORRECT. Full per-item diff follows the decision table, so no changed field is omitted from the inventory. CORRECT means the change checked here matches its named source; it does not certify unchanged surrounding claims. UNPROVEN is not a pass, including edits that merely append verify: true to unproven instructions.

A/B mapping names refer to rows in docs/verification/factcheck-fixes-a.md or factcheck-fixes-b.md. A prose-only mention is listed UNLOGGED, because the requested method specifically requires a matching row. A partly matched hunk is counted mapped but its extra prose-only portions are named in its note/full diff.

Method: requested curl.exe -L -A Mozilla/5.0 attempted for all 474 collected source URLs; HTTP and TLS results retained in architect-assets/Snnn-fetch.json. Windows Schannel HTTPS failed with SEC_E_NO_CREDENTIALS. Python urllib retrieved available HTTPS documents; results and actual download URLs are in corresponding -fallback.json files. PDFs were run through pdftotext -layout; relevant scanned pages rendered with pdftoppm -f N -l N -r 110 -png, with reviewed images retained. Web search was used for blocked Carlsen, CPC and HERO sources. No claims were accepted from the fix logs. Archive multi-file identifiers require the actual named publication: SUM v4 n1 and the specified Sinc-Link issues were downloaded separately after rejecting an unrelated smallest-PDF result. The HERO advanced-programming book download is encrypted, not readable evidence. Some very large broad source downloads hit the 90MB acquisition ceiling; those cannot establish a claim absent an intact alternative. Download success alone never establishes correctness.

| Items (hunks) | CORRECT | WRONG | UNPROVEN | Mapped to a row | Unlogged |
|---:|---:|---:|---:|---:|---:|
| 293 | 152 | 5 | 136 | 248 | 45 |

Unlogged hunk IDs: H001, H002, H006, H011, H013, H017, H018, H019, H020, H021, H022, H157, H158, H163, H164, H166, H169, H186, H189, H195, H196, H197, H198, H200, H201, H203, H204, H205, H209, H217, H229, H247, H248, H249, H250, H251, H256, H269, H271, H273, H274, H275, H276, H278, H279.

## Findings

1. **HIGH — cpu6502 pin 8: supply changed to ground.** H051 (apple.js, new line1269). MOS 6500 datasheet PDF10 shows VCC8 and VSS1/21. Restore VCC, power type, +5V probe. Shared across Apple, PET/VIC20, Commodore drives, Atari400/800, BBC/Electron and Oric. A meter ground clip attached to the new supposed ground would short a live supply. Principle: boundary-discipline, foundational-thinking.
2. **HIGH — cia6526 pin 20: supply changed to ground.** H107 (commodore.js, new line1066). C64 Programmer Reference PDF439, printed420, shows VCC20 and VSS1. Restore VCC +5V. Affects C64/C128/1571 shared record. Principle: boundary-discipline, foundational-thinking.
3. **HIGH — fdc1793 pin 20: ground changed to +5V.** H266 (tandy.js, new line831). FD179X-02 datasheet p2 assigns VSS20, VCC21, VDD40. Restore ground20; +5V belongs21. Affects ModelIII/4. Principle: boundary-discipline.
4. **HIGH — cpu8088 pin 21 reset polarity reversed.** H210 (ibm.js, line153). Intel8088 PDF3 Table1 requires HIGH for at least4clocks and resumes when LOW. New text says LOW then HIGH and contradicts its own retained probe. Affects5150/5160/PCjr/5155/HERO2000. Principle: boundary-discipline.
5. **MEDIUM — CPC6128 printer pin27 source conflict hidden.** H023/H033. CPC664 ch7p41 says GND27; the6128 ch7p41 omits27 and says all other pinsNC. But6128 service manual PDF17, printed19-20, printer ground group explicitly includes27. The new conditional limits GND27 to664 and new text treats6128 asNC without preserving this conflict. Mark uncertain until board/revision-specific evidence settles it. Principle: foundational-thinking, boundary-discipline.
6. **MEDIUM — C16 regulator evidence points to wrong device page and overstates a threshold.** H145: new ua78.pdf#page=6 opens7808 section7.6;7805 section7.5 is PDF5. That table characterizes7-20V input and2V typical dropout at1A; it is not proof of an exact board cutoff below7V. Correct citation to5 and distinguish characterized minimum from a measured dropout boundary. Principle: boundary-discipline.
7. **MEDIUM — unproven records remain operational instructions.** Examples H0759464pin2 conversion, H09923128pin20 mask-dependent text with activeLow metadata, H175-H194 HERO connector tables from encrypted source, H280/H282 SN94624clock/replacements using SN76489/76494 sheet. A verify marker is an uncertainty annotation, not source proof; the app still renders pin-compatible tags, diagrams and probe/rework text. The row-by-row UNPROVEN reasons below must be settled or unsupported claims removed before this meets the stated facts-only goal. Principle: boundary-discipline, redesign-from-first-principles.
8. **MEDIUM — Plus4 source split inherits unsupported amplitude instructions.** H086/H120 correctly separate NC8 from C16+5V8. New plus4-video nevertheless inherits1Vpp/75ohm expectations for pins1/4 while replacing sources with CN7 net drawings S204/S207 that give no such amplitude/load specification. Source ownership needs to follow each retained claim. Principle: boundary-discipline, foundational-thinking.
9. **LOW — 45 hunks have no fix-log table row.** They are individually listed above and in the ledger, including H250 photo-box reassignment and multiple citation/role/uncertainty changes. Prose mentions were not silently counted as rows. This is an audit-trail gap, not proof the values are false. Principle: foundational-thinking.

## Orientation audit

Changed pin1/rowA configurations checked: C16/Plus4 expansion S205 external view (1right, numericstop); C64 expansion S022 PDF415 (1right); C128 expansion S218 PDF409 explicitly rear view (1right); Atari cartridge/ECI S261 PDF24 and S274 PDF7 front view (lettersabove numbers); DiskII mechanism S246 photo (Aleft/component side); TS2068dock S101 PDF67 front view (evensabove,2left). src/connectors.js rowA/pin1 semantics were read, not assumed. No changed scheme field found. Uncertainty-marked edges without physical evidence remain UNPROVEN in their rows.

## Source removals / weakening

No original source document was globally dropped except replacement of the minuszerodegrees motherboard-revision page with the concrete XT upgrade procedure S170; S170 pp521-523 strengthens the claimed steps. Removed URL anchors were C128video406 to407 (andRGBI407to408),1541spec5to4, Sinc-Linkv3n5/n9to/n8,SUMv4n1/n5to/n4,andHD6309PDF13to14; replacements checked. New plus4-video substitutes a two-source CN7 array for inherited C16/TED references: good for pin8 but does not prove inherited video amplitudes. Numerous Carlsen Wayback additions are unreadable or playback wrappers; source availability metadata is not identity/content verification. See each affected hunk.

## Per-item decisions

| Item | File / new hunk | Fix-log row | Decision | Record / change | Source page checked | Reason / remaining gap |
|---|---|---|---|---|---|---|
| [H001](#h001) | src/data/acorn.js:1 | UNLOGGED | CORRECT | BBC ModelB schematic title | S447 p1 | Title block reads103,000/C. |
| [H002](#h002) | src/data/acorn.js:15 | UNLOGGED | CORRECT | BBC mirror | S447 p1 | Opens correct ModelB circuit. |
| [H003](#h003) | src/data/acorn.js:160 | B rest-minimalist-d#956 | CORRECT | Master bus4 | S142 p54 | 1E named;no duty-cycle guarantee. |
| [H004](#h004) | src/data/acorn.js:169 | B rest-minimalist-d#959 | CORRECT | Master bus18-25 | S142 p27;S339 sheet2 | PBC EX bus shared with externalTube. |
| [H005](#h005) | src/data/acorn.js:181 | B rest-minimalist-d#964,#965 | CORRECT | Tube supply31,33,35,37,39 | S142 p55 | Nominal5V;no tolerance. |
| [H006](#h006) | src/data/acorn.js:206 | UNLOGGED | CORRECT | BBC connector citation labels | S447 p1 | Only drawing-number corrections. |
| [H007](#h007) | src/data/acorn.js:270 | B rest-minimalist-d#945,#946;skeptic#319-325 | CORRECT | BBC PSU/aux3,4,6 | S338 Power supply;S447 p1 | Nominal rails and issue2 isolation documented;relabels only logged in prose. |
| [H008](#h008) | src/data/acorn.js:356 | B architect#68 | UNPROVEN | Master cartridge orientation | S339 sheet1 | Schematic lacks external face view;verify does not prove geometry. |
| [H009](#h009) | src/data/acorn.js:393 | B rest-minimalist-d#972,#973;skeptic#327-333 | CORRECT | Master battery2/PSU | S340 PDF233 F.3-2;S142 p6 | 3V lithium and nominal PSU labels supported. |
| [H010](#h010) | src/data/acorn.js:614 | B rest-architect#214,#215 | UNPROVEN | VIDPROC replacements/citations | S184 VideoULA;S447 p1 | Drawing label correct;VC2069/VC2023 maker comparison missing. |
| [H011](#h011) | src/data/acorn.js:629 | UNLOGGED | CORRECT | VIDPROC8 ModelB qualifier | S447 p1 IC6/43 | Board designator qualified correctly. |
| [H012](#h012) | src/data/acorn.js:658 | B rest-architect#216,#217 | UNPROVEN | SERPROC variants/citations | S185 extension;S186 PDF51 | R75values supported;no full maker comparison of variants. |
| [H013](#h013) | src/data/acorn.js:672 | UNLOGGED | CORRECT | SERPROC15 RC qualifier | S447 p1 IC7 | ModelB R75/C28 qualifier supported. |
| [H014](#h014) | src/data/acorn.js:694 | B architect#219 | UNPROVEN | SAA5053/54/55 | S188 variants;S447 p1 | Secondary variants list insufficient for compatibility. |
| [H015](#h015) | src/data/acorn.js:788 | B architect#222 | CORRECT | 1581 WD1772 J1 | S047 PDF20 printed17 note1 | J1 removed for1772;installed for1770. |
| [H016](#h016) | src/data/acorn.js:811 | B architect#221 | CORRECT | WD1770 INTRQ28 | S189 PDF55 printed45 | Completion sets;status read/new command clears;not a pulse. |
| [H017](#h017) | src/data/acorn.js:820 | UNLOGGED | CORRECT | BBC ADC/DRAM/clock source labels | S447 p1 | Only drawing-number corrections;103,000/C visible. |
| [H018](#h018) | src/data/acorn.js:884 | UNLOGGED | CORRECT | BBC ADC/DRAM/clock source labels | S447 p1 | Only drawing-number corrections;103,000/C visible. |
| [H019](#h019) | src/data/acorn.js:1248 | UNLOGGED | CORRECT | BBC ADC/DRAM/clock source labels | S447 p1 | Only drawing-number corrections;103,000/C visible. |
| [H020](#h020) | src/data/acorn.js:1259 | UNLOGGED | CORRECT | BBC power/resources source mirror | S447 p1 | Correct title and working mirror;logged in prose only. |
| [H021](#h021) | src/data/acorn.js:1623 | UNLOGGED | CORRECT | BBC power/resources source mirror | S447 p1 | Correct title and working mirror;logged in prose only. |
| [H022](#h022) | src/data/amstrad.js:53 | UNLOGGED | CORRECT | CPC expansion27 supply | S175 PDF17 | Nominal5V shown;no tolerance. |
| [H023](#h023) | src/data/amstrad.js:83 | B rest-minimalist-c#910 | UNPROVEN | CPC664 printer27 GND | S175 PDF17 printed19-20 rendered;S325 PDF352 printedch7p41;S328 PDF306 | Source conflict:664 ground27 supported;6128 user table says all other pins NC (27 omitted),but6128 service CPU circuit explicitly grounds27. New conditional/rationale chooses NC without conflict note. |
| [H024](#h024) | src/data/amstrad.js:128 | B skeptic#310,#311,#313,#316 | UNPROVEN | CPC fivevolt1/2 | S171 CP001;S320 PDF29 J301 | 464 polarity inferred,not proven;nominal5V supported. |
| [H025](#h025) | src/data/amstrad.js:211 | B rest-minimalist-c#337 | CORRECT | CPC6128 RAM locations | S175 PDF17 | CAS0 firstIC127-134;CAS1 secondIC119-126. |
| [H026](#h026) | src/data/amstrad.js:223 | B rest-architect#209 | UNPROVEN | 40008 replacement | S173 failure429;S171 circuit | No40008 maker comparison. |
| [H027](#h027) | src/data/amstrad.js:317 | B rest-minimalist-c#337 | CORRECT | PAL40030 summary/16/17 | S175 PDF17 | CAS1/R160 secondIC119-126;CAS0/R161 firstIC127-134. |
| [H028](#h028) | src/data/amstrad.js:340 | B rest-minimalist-c#337 | CORRECT | PAL40030 summary/16/17 | S175 PDF17 | CAS1/R160 secondIC119-126;CAS0/R161 firstIC127-134. |
| [H029](#h029) | src/data/amstrad.js:349 | B architect#210;rest-architect#211 | UNPROVEN | 23256 summary/27C256 adapter | S175 PDF17;S179 pp1-2 | CPC wiring/VPP supported;mask-ROM maker equivalence missing. |
| [H030](#h030) | src/data/amstrad.js:368 | B architect#210;rest-minimalist-c#342 | CORRECT | 23256 pins20/22/27 | S175 PDF17 | Generic select/address text removes unsupported board polarity. |
| [H031](#h031) | src/data/amstrad.js:386 | B rest-architect#212,#213 | UNPROVEN | 765 alternatives | S182 failure429;S180 | No UMC/Zilog pin/electrical comparison. |
| [H032](#h032) | src/data/amstrad.js:448 | B rest-minimalist-c#337 | CORRECT | CPC6128 RAM fault notes | S175 PDF17 | Correct CAS bank designators. |
| [H033](#h033) | src/data/amstrad.js:461 | B rest-minimalist-c#910 | UNPROVEN | CPC printer notes | S175 PDF17 printed19-20 rendered;S325 PDF352 printedch7p41;S328 PDF306 | Source conflict:664 ground27 supported;6128 user table says all other pins NC (27 omitted),but6128 service CPU circuit explicitly grounds27. New conditional/rationale chooses NC without conflict note. |
| [H034](#h034) | src/data/apple.js:360 | A S#79-89,RMa#533 | CORRECT | DiskII ribbon9/11-13/15/17/19 | S068 p1;S074 p1 | Nominal-12/+5/+12;unsupported bands removed. |
| [H035](#h035) | src/data/apple.js:439 | A RA#102,#105,#106 | UNPROVEN | ECG3470/SK3697/9334/74259 | S067 parts;S052 parts | Cross-reference not maker electrical/pin comparison. |
| [H036](#h036) | src/data/apple.js:511 | A RA#102,#105,#106 | UNPROVEN | ECG3470/SK3697/9334/74259 | S067 parts;S052 parts | Cross-reference not maker electrical/pin comparison. |
| [H037](#h037) | src/data/apple.js:644 | A RA#102,#105,#106 | UNPROVEN | ECG3470/SK3697/9334/74259 | S067 parts;S052 parts | Cross-reference not maker electrical/pin comparison. |
| [H038](#h038) | src/data/apple.js:744 | A RA#38,F15 | CORRECT | DiskII mech rowA | S246 photo;S068 p1 | A on component-sideleft;letters above numbers matches. |
| [H039](#h039) | src/data/apple.js:782 | A RMa#544,S#122-133 | CORRECT | DB19 pins5-8 | S250 pp1-2;S065 PDF262 table11-4 | Nominal cable rails;IIc12V tolerance10percent. |
| [H040](#h040) | src/data/apple.js:793 | A S#98-115,RMa#537,#541;RMa#544 | CORRECT | DB19pin16/DB25supplies | S250 pp1-2 | Nominal voltages match Apple table. |
| [H041](#h041) | src/data/apple.js:806 | A S#98-115,RMa#537,#541;RMa#544 | CORRECT | DB19pin16/DB25supplies | S250 pp1-2 | Nominal voltages match Apple table. |
| [H042](#h042) | src/data/apple.js:818 | A S#98-115,RMa#537,#541;RMa#544 | CORRECT | DB19pin16/DB25supplies | S250 pp1-2 | Nominal voltages match Apple table. |
| [H043](#h043) | src/data/apple.js:848 | A RMa#544,S#122-133 | CORRECT | IIc converter citation | S065 PDF262 printed234 | 12Vplus/minus10percent in table11-4. |
| [H044](#h044) | src/data/apple.js:1013 | A S#79-89,RMa#533 | CORRECT | DiskII rails/checklist | S068 p1;S074 p1 | Nominal schematic supplies replace invented bands. |
| [H045](#h045) | src/data/apple.js:1045 | A S#79-89,RMa#533 | CORRECT | DiskII rails/checklist | S068 p1;S074 p1 | Nominal schematic supplies replace invented bands. |
| [H046](#h046) | src/data/apple.js:1069 | A S#98-115,RMa#537,#541;RMa#544,S#122-133 | CORRECT | Duo/Uni rails/checklists | S250 pp1-2;S065 PDF262 | Nominals and IIc12Vtolerance supported. |
| [H047](#h047) | src/data/apple.js:1090 | A S#98-115,RMa#537,#541;RMa#544,S#122-133 | CORRECT | Duo/Uni rails/checklists | S250 pp1-2;S065 PDF262 | Nominals and IIc12Vtolerance supported. |
| [H048](#h048) | src/data/apple.js:1101 | A S#98-115,RMa#537,#541;RMa#544,S#122-133 | CORRECT | Duo/Uni rails/checklists | S250 pp1-2;S065 PDF262 | Nominals and IIc12Vtolerance supported. |
| [H049](#h049) | src/data/apple.js:1145 | A S#98-115,RMa#537,#541;RMa#544,S#122-133 | CORRECT | Duo/Uni rails/checklists | S250 pp1-2;S065 PDF262 | Nominals and IIc12Vtolerance supported. |
| [H050](#h050) | src/data/apple.js:1238 | A RA#97 | UNPROVEN | 65C02 shared substitute | S049 Apple logicboard page | Apple evidence does not cover all15listing machines. |
| [H051](#h051) | src/data/apple.js:1266 | A fc-a-x2 | WRONG | cpu6502 pin8 | S051 PDF10 rendered | 8isVCC+5V;VSS1/21.Newground label/type/probe reverses supply. |
| [H052](#h052) | src/data/apple.js:1325 | A RMa#131 | CORRECT | IIe MMU24 Cxxx | S057 PDF170 printed7-2 | C000-CFFF I/O with ROMswitch exceptions. |
| [H053](#h053) | src/data/apple.js:1351 | A RMa#131 | CORRECT | IIe MMU24 Cxxx | S057 PDF170 printed7-2 | C000-CFFF I/O with ROMswitch exceptions. |
| [H054](#h054) | src/data/apple.js:1393 | A RMa#136 | CORRECT | IIe IOU15 RESET | S059 PDF76 printed4-2 | Responds toRESET and pullsLOW atpoweron;no open-drain specification. |
| [H055](#h055) | src/data/apple.js:1410 | A RMa#136 | CORRECT | IIe IOU15 RESET | S059 PDF76 printed4-2 | Responds toRESET and pullsLOW atpoweron;no open-drain specification. |
| [H056](#h056) | src/data/apple.js:1456 | A RMa#139,#140 | CORRECT | AY53600 option1-5 | S060 PDF2 printed3-24 rendered | Each option/direction matches chart;4/5canoutput bymask. |
| [H057](#h057) | src/data/apple.js:1504 | A A#100,F6 | CORRECT | 2316 pins18/20/21 | S063 PDF105 printed94;S064 PDF44 printed33 rendered | Apple/ModelIII wiring differs as described;generic mask-dependent selects appropriate. |
| [H058](#h058) | src/data/apple.js:1517 | A A#100,F6 | CORRECT | 2316 pins18/20/21 | S063 PDF105 printed94;S064 PDF44 printed33 rendered | Apple/ModelIII wiring differs as described;generic mask-dependent selects appropriate. |
| [H059](#h059) | src/data/apple.js:1537 | A A#100,F6 | CORRECT | 2316 pins18/20/21 | S063 PDF105 printed94;S064 PDF44 printed33 rendered | Apple/ModelIII wiring differs as described;generic mask-dependent selects appropriate. |
| [H060](#h060) | src/data/apple.js:1839 | A RMa#152 | UNPROVEN | IIc GLU14 MD7 | S065 printed246 | Pin-name drawing insufficient for direction. |
| [H061](#h061) | src/data/apple.js:1991 | A A#30 | UNPROVEN | IIe aux edge | S235 TRM table | No physical face/start view. |
| [H062](#h062) | src/data/atari.js:85 | A RMa#168,#169 | UNPROVEN | ANTIC14R/W,19A14 | S076 Fig1-4;S077 Fig1-4 | Assignment figures lack direction;retained bidir unproven. |
| [H063](#h063) | src/data/atari.js:238 | A RA#108,#109 | UNPROVEN | ANTIC alternatives | S079 FAQ;S076 | Partnumber list not electrical comparison. |
| [H064](#h064) | src/data/atari.js:261 | A RA#110,#111 | UNPROVEN | CTIA/GTIA alternatives | S079 FAQ;S080 | Regional variants lack complete maker comparison. |
| [H065](#h065) | src/data/atari.js:283 | A RA#112 | UNPROVEN | POKEY suffixes | S084 suffix list;S082 | Secondary list insufficient for electrical equivalence. |
| [H066](#h066) | src/data/atari.js:312 | A RA#113 | UNPROVEN | FREDDIE replacements | S086 parts;S087 circuit | One fitted part does not prove other variant. |
| [H067](#h067) | src/data/atari.js:378 | A RMa#552,#563,#584,#594 | CORRECT | Atari controller7 | S078 schematic;S076 figures | Nominal5V;4.9V explicitly sample reading. |
| [H068](#h068) | src/data/atari.js:452 | A S#138-142,RMa#569;RA#43,#44 | UNPROVEN | Atari400/800 AC contacts | S258 schematic | 9VAC supported;centre/sleeve view not proven despite retained pin descriptions. |
| [H069](#h069) | src/data/atari.js:964 | A A#41,#42;RMa report | CORRECT | Atari cartridge/SIOlabel | S261 PDF24;S274 PDF7;S257 PDF131 | Letters top/numbers bottom;SIO printed146;Sams frontview supplies left/right. |
| [H070](#h070) | src/data/atari.js:989 | A A#41,#42 | CORRECT | Atari400/800/right/XL cart | S261 PDF24;S274 PDF7;S259 | Letters top;Aopposite1;frontview supports orientation. |
| [H071](#h071) | src/data/atari.js:1027 | A A#47 | CORRECT | AtariECI J4B | S274 PDF7 printed25 rendered | A-Habove1-7;A/1left. |
| [H072](#h072) | src/data/coleco.js:68 | A A#48,#49 | UNPROVEN | Coleco cart orientation | S202 connector sheet;S279 table | No external face/start view;checking pin30 cannot resolve ambiguous drawing itself. |
| [H073](#h073) | src/data/coleco.js:202 | A F4,A#170 | CORRECT | Coleco U2 classification | S202 PDF9 rendered | Stock9464 differs from2764;new record separation supported. |
| [H074](#h074) | src/data/coleco.js:224 | A F4,A#170 | CORRECT | Coleco U2 classification | S202 PDF9 rendered | Stock9464 differs from2764;new record separation supported. |
| [H075](#h075) | src/data/coleco.js:233 | A F4,A#170 | UNPROVEN | rom9464-cv full map/rework | S202 PDF9 rendered | Stock pinmap matches;pad2 conversion-toA12 trace not drawn (NC2),so new rework claim not proven. |
| [H076](#h076) | src/data/coleco.js:369 | A F4,A#170 | CORRECT | Coleco deadconsole suspect | S202 PDF9 | Stock BIOS now references stock9464. |
| [H077](#h077) | src/data/coleco.js:406 | A A#31,#48,#49 | UNPROVEN | Coleco J1/J2 orientation | S202 connector sheets | Logical schematics do not prove exterior orientation. |
| [H078](#h078) | src/data/coleco.js:421 | A A#31,#48,#49 | UNPROVEN | Coleco J1/J2 orientation | S202 connector sheets | Logical schematics do not prove exterior orientation. |
| [H079](#h079) | src/data/coleco.js:485 | A A#48,#49;RMa#620,#622,#623 | UNPROVEN | ADAM cart/controller/expansion | S279 tables | Removing Coleco-specific range/2.2V is appropriate;edge orientation remains unproven. |
| [H080](#h080) | src/data/commodore.js:49 | A F14 C16 manual | CORRECT | C16 serial mirror | S005 PDF12 | Same schematic material;opens. |
| [H081](#h081) | src/data/commodore.js:60 | A M#424;F14 | CORRECT | C16/Plus4 cassette5 | S005 PDF11;S204 map | C16 CPUroute supported;Plus4map lacks route,now explicitly qualified. |
| [H082](#h082) | src/data/commodore.js:95 | A F14 C16 manual | CORRECT | C16 joystick mirror | S005 PDF12 | Alternate circuit page opens. |
| [H083](#h083) | src/data/commodore.js:106 | A A#7,M#427;F14 | CORRECT | C16 video8 | S005 PDF11;S204 | C16+5V8 differs fromPlus4NC8. |
| [H084](#h084) | src/data/commodore.js:115 | A A#7,M#427;F14 | CORRECT | C16 video8 | S005 PDF11;S204 | C16+5V8 differs fromPlus4NC8. |
| [H085](#h085) | src/data/commodore.js:129 | A A#8,A#9 | CORRECT | C16/Plus4 exp pin1 | S205 printed33 rendered | External25..1top;1right,Aunder1. |
| [H086](#h086) | src/data/commodore.js:188 | A A#7,M#427;F14 | UNPROVEN | plus4-video pin8/inherited fields | S204 CN7;S207 PDF21 | NC7/8supported,but inherited1Vpp expectations1/4 unproven by new netdrawings;source array replaced. |
| [H087](#h087) | src/data/commodore.js:270 | A F14 Carlsen links | UNPROVEN | RCWB snapshot collection | S006,S024,S025,S034,S035,S038,S210,S224,S227,S232,S234,S388,S393,S405 fetch logs | Mirrors429/refused or Wayback wrapper without payload;availability not document proof. |
| [H088](#h088) | src/data/commodore.js:299 | A M#477 | CORRECT | IEC DATA5 deletion | S047 PDF20 | ActiveLOW serial wiring;unsupported bus-hang diagnosis removed. |
| [H089](#h089) | src/data/commodore.js:370 | A M#6 | CORRECT | C16/Plus4 CPU rate | S003 pp33,35 | 1.788MHz rounds1.79;894kHz rounds0.89. |
| [H090](#h090) | src/data/commodore.js:386 | A M#6 | CORRECT | C16/Plus4 CPU rate | S003 pp33,35 | 1.788MHz rounds1.79;894kHz rounds0.89. |
| [H091](#h091) | src/data/commodore.js:476 | A M#6;RA#71 | UNPROVEN | 7501 summary/8501 substitute | S003 pp33,35;S001 failure406 | Clock supported;8501 maker comparison missing. |
| [H092](#h092) | src/data/commodore.js:487 | A M#6;F14 | UNPROVEN | 7501pin1/citations | S003 pp14,33,35;S005 PDF12;S006 failure | Clock/mirror schematic supported;Carlsen snapshot unreadable. |
| [H093](#h093) | src/data/commodore.js:548 | A RA#72;F14 | UNPROVEN | 8360 replacement | S007 TEDvariants;S005 PDF11 | No8360 electrical/pin comparison. |
| [H094](#h094) | src/data/commodore.js:564 | A M#5,#6 | CORRECT | TED7R/W,12clock | S003 pp9,33,35 | Input plus open-source pullup;NTSC/PAL doubledrates match. |
| [H095](#h095) | src/data/commodore.js:622 | A F14 C16 manual | CORRECT | 6529 mirror | S005 PDF13 | Corresponding assignment data. |
| [H096](#h096) | src/data/commodore.js:709 | A RA#75;rule6 | UNPROVEN | 4164 alternatives/41256adapter | S009 RAMbank;S010 PDF103 | A8tie/refresh supported;MT4264maker comparison missing. |
| [H097](#h097) | src/data/commodore.js:755 | A F14 C16 manual | CORRECT | 4416 mirror | S005 PDF11 | Corresponding RAM circuit. |
| [H098](#h098) | src/data/commodore.js:788 | A RA#79,F21 | UNPROVEN | 23128 machine summary | S005 PDF11;S014 p10;S015;S018 failure | C16/Spectrum supported;Oric archive inaccessible and generic mask polarity not maker-proven. |
| [H099](#h099) | src/data/commodore.js:812 | A RA#79,F21;F14 | UNPROVEN | 23128 selects20/22/27 | S005 PDF11;S014 p10;S015 | Pin20text mask-dependent but metadata/name still activeLOW;need specific mask evidence or neutral metadata. |
| [H100](#h100) | src/data/commodore.js:833 | A F3,rule6 | CORRECT | 27128 adapter classification | S017 PDF411;S005 PDF11 | VPP/PGM differ from mask selects;not unconditional dropin. |
| [H101](#h101) | src/data/commodore.js:847 | A RA#82,#83;F14 | UNPROVEN | 8500/8502 substitutes | S019,S020 failures406;S024,S025 refused | Experiment and maker comparison unreadable. |
| [H102](#h102) | src/data/commodore.js:913 | A RA#84 | UNPROVEN | 8562/8565 substitute | S026 VICtable | Secondary supply table not full maker compatibility proof. |
| [H103](#h103) | src/data/commodore.js:921 | A M#33,#34,#37,#38 | CORRECT | VICII24-29/35-38 andsources | S022 PDF469 printed450;S027 section3.14.6 | A5-A0bidirectional;D8-D11alwaysinputs. |
| [H104](#h104) | src/data/commodore.js:949 | A M#33,#34,#37,#38 | CORRECT | VICII24-29/35-38 andsources | S022 PDF469 printed450;S027 section3.14.6 | A5-A0bidirectional;D8-D11alwaysinputs. |
| [H105](#h105) | src/data/commodore.js:979 | A rule6;RA#86 | UNPROVEN | SID8580 rework | S030 failure406;S034 failure429 | Reclassifyadapterprudent;precise filter/supply/digi rework not proven against unreadable text. |
| [H106](#h106) | src/data/commodore.js:988 | A F14 Carlsen links | UNPROVEN | SID mirrors | S034 failure429;S035 refused | No readable payload. |
| [H107](#h107) | src/data/commodore.js:1034 | A M#42-44;RA#87,#88;fc-a-x1 | WRONG | cia6526 pin20 andporttext | S022 PDF439 printed420 rendered;pp328-330,343 | 20isVCC+5V;1isVSS.Newground/type/probefalse.Keyboardcorrection supported;substitutes unproven. |
| [H108](#h108) | src/data/commodore.js:1103 | A F14 C16 manual | CORRECT | PLA264 mirror | S005 PDF13 | Corresponding chip assignment data. |
| [H109](#h109) | src/data/commodore.js:1238 | A M#58,#59,#62 | CORRECT | VIC6560 pins5-8/21-34 | S042 zip6560-09;S043 p212 | Address bidirectional;upper color-nibble inputs only. |
| [H110](#h110) | src/data/commodore.js:1248 | A M#58,#59,#62 | CORRECT | VIC6560 pins5-8/21-34 | S042 zip6560-09;S043 p212 | Address bidirectional;upper color-nibble inputs only. |
| [H111](#h111) | src/data/commodore.js:1264 | A M#58,#59,#62 | CORRECT | VIC6560 pins5-8/21-34 | S042 zip6560-09;S043 p212 | Address bidirectional;upper color-nibble inputs only. |
| [H112](#h112) | src/data/commodore.js:1324 | A RA#92,F21 | CORRECT | VIA6522 CB2pin19 | S045 VIAsheet | Generic handshake/shift function;PET-only beep clause removed. |
| [H113](#h113) | src/data/commodore.js:1559 | A M#87 | CORRECT | 8563 DA0-7pins26-33 | S011 PDF40 printed38 rendered | Local address bus separate fromDDbidirectionaldata. |
| [H114](#h114) | src/data/commodore.js:1595 | A RA#94;F14 | UNPROVEN | 8564adapter/mirror | S020 failure406;S025 refused | Cross-connect experiment not verified. |
| [H115](#h115) | src/data/commodore.js:1634 | A M#94,#95 | CORRECT | VICIIe32-37 | S011 PDF37 printed35 rendered | Row/column output;register-address input latched fallingRAS. |
| [H116](#h116) | src/data/commodore.js:1764 | A M#104 | CORRECT | 8721 CLRBNK32 | S011 PDF31 printed29 rendered | Explicit colorRAMbankselectoutput. |
| [H117](#h117) | src/data/commodore.js:2002 | A M#125 | CORRECT | 8520 SP39 | S046 serialsection;S047 PDF20 | Bidirectional serial function;universalLOW-on-output removed. |
| [H118](#h118) | src/data/commodore.js:2270 | A S#2;F14 | CORRECT | C16power2nominal | S005 PDF11 CN8 | Nominal9V;unsupported7.5V threshold removed. |
| [H119](#h119) | src/data/commodore.js:2297 | A S#4 | CORRECT | Plus4power1nominal | S206 PSUdiagram | Outputannotated5.2V;nominal5V supported. |
| [H120](#h120) | src/data/commodore.js:2347 | A A#7,M#427 | CORRECT | Plus4 video record selection | S204 CN7;S207 PDF21 | OwnNC8map;inheritedamplitudeissue recorded86. |
| [H121](#h121) | src/data/commodore.js:2363 | A S#13 | UNPROVEN | C64power5and5.5Vdamage | S209 failure406;S210 wrapper | Nominal5V supported;5.5Vdestruction threshold lacks readable sourcepayload. |
| [H122](#h122) | src/data/commodore.js:2405 | A M#433,#443 | CORRECT | C64video1/4amplitude | S022 PDF415 printed396 | Pinout gives names,not1Vpp75ohm specification. |
| [H123](#h123) | src/data/commodore.js:2465 | A A#14 | CORRECT | C64exp pin1end | S022 PDF415 printed396 rendered | 22..1top;Z..Abelow;1/Aatright. |
| [H124](#h124) | src/data/commodore.js:2629 | A M#433,#443 | CORRECT | VIC20video5amplitude | S211 schematic | Name supported;no1Vpp75ohm criterion. |
| [H125](#h125) | src/data/commodore.js:2773 | A M#454 | CORRECT | VIC20cassette6/F | S211 cassettecircuit | Removedunsourcedfullkeylist/idlecriterion. |
| [H126](#h126) | src/data/commodore.js:2796 | A M#455,#456 | UNPROVEN | PETIEEE activeLOW/verify | S212 drawing | No electricalidledata;deletion appropriate,retainedactiveLOWclaims unproven. |
| [H127](#h127) | src/data/commodore.js:2845 | A M#457,#459,#460 | UNPROVEN | PETuser11andC-L | S213 drawing | Addressesremoved;GRAPHICfunctionstillnotprovenbybarename. |
| [H128](#h128) | src/data/commodore.js:2876 | A M#461 | CORRECT | PETcassette1/2expectremoval | S214 drawing | Barepinout lacksvoltage/keybehavior;unsupported expectations removed. |
| [H129](#h129) | src/data/commodore.js:2902 | A M#461 | CORRECT | PETcassette1/2expectremoval | S214 drawing | Barepinout lacksvoltage/keybehavior;unsupported expectations removed. |
| [H130](#h130) | src/data/commodore.js:2969 | A S#21 | CORRECT | C128power1 | S011 powerschematic | 5Vnominal;no narrow band. |
| [H131](#h131) | src/data/commodore.js:3001 | A M report C128anchors | CORRECT | C128RGBI/videoanchors | S218 PDF407,408 | Printed397composite/PDF407;398RGBI/PDF408. |
| [H132](#h132) | src/data/commodore.js:3024 | A M report C128anchors | CORRECT | C128RGBI/videoanchors | S218 PDF407,408 | Printed397composite/PDF407;398RGBI/PDF408. |
| [H133](#h133) | src/data/commodore.js:3045 | A M report C128anchors | CORRECT | C128seriallabel | S218 PDF404 printed394 | Figure12-5on394. |
| [H134](#h134) | src/data/commodore.js:3095 | A rule4;M report C128anchors | CORRECT | C128expview/citation | S218 PDF409 printed399 rendered | Explicitbackview;1upperright. |
| [H135](#h135) | src/data/commodore.js:3145 | A rule4;M report C128anchors | CORRECT | C128expview/citation | S218 PDF409 printed399 rendered | Explicitbackview;1upperright. |
| [H136](#h136) | src/data/commodore.js:3170 | A M report C128anchors | CORRECT | C128controller/cassetteanchors | S218 PDF408,409 | Controller399/PDF409;cassette398/PDF408. |
| [H137](#h137) | src/data/commodore.js:3197 | A M report C128anchors | CORRECT | C128controller/cassetteanchors | S218 PDF408,409 | Controller399/PDF409;cassette398/PDF408. |
| [H138](#h138) | src/data/commodore.js:3249 | A F14 Carlsen links | UNPROVEN | 1541/IIconnectormirrors | S223,S224,S226,S227 fetch logs | Original406;mirrors429;contentnotcompared. |
| [H139](#h139) | src/data/commodore.js:3273 | A F14 Carlsen links | UNPROVEN | 1541/IIconnectormirrors | S223,S224,S226,S227 fetch logs | Original406;mirrors429;contentnotcompared. |
| [H140](#h140) | src/data/commodore.js:3341 | A F14 Carlsen links | UNPROVEN | 1541/IIconnectormirrors | S223,S224,S226,S227 fetch logs | Original406;mirrors429;contentnotcompared. |
| [H141](#h141) | src/data/commodore.js:3390 | A F14 Carlsen links | UNPROVEN | 1571wiringmirror | S231 image;S232 refused | Originalopens;addedmirrornotcompared. |
| [H142](#h142) | src/data/commodore.js:3435 | A F14 Carlsen links | UNPROVEN | 1581connectormirrors | S233 failure406;S234 refused | Addedsourceunreadable. |
| [H143](#h143) | src/data/commodore.js:3454 | A F14 Carlsen links | UNPROVEN | 1581connectormirrors | S233 failure406;S234 refused | Addedsourceunreadable. |
| [H144](#h144) | src/data/commodore.js:3488 | A F14 Carlsen links | UNPROVEN | 1581connectormirrors | S233 failure406;S234 refused | Addedsourceunreadable. |
| [H145](#h145) | src/data/commodore.js:3517 | A S#2;F14 | WRONG | C16 7805citation/dropoutnote | S383 PDF5 section7.5;PDF6 section7.6 rendered | 7805tableon5,not6(7808).7Vcharacterization/2Vtypicaldropoutdoesnotproveexactuniversalcutoff. |
| [H146](#h146) | src/data/commodore.js:3625 | A F14 Carlsen links | UNPROVEN | C64blankscreenmirror | S385 failure406;S388 refused | No readable snapshot. |
| [H147](#h147) | src/data/commodore.js:3669 | A F14 Carlsen links | UNPROVEN | VIC20mirror | S389 failure406;S393 refused | No readable snapshot. |
| [H148](#h148) | src/data/commodore.js:3696 | A S#19 | CORRECT | PETJ8/J10/J11feeds | S395 sheet9 rendered | J8AC1/4/5,8/9;J10+16V4/5,-9V1/2;J11+9V1/4/6andJ8pin2. |
| [H149](#h149) | src/data/commodore.js:3707 | A S#19 | CORRECT | PETJ8/J10/J11feeds | S395 sheet9 rendered | J8AC1/4/5,8/9;J10+16V4/5,-9V1/2;J11+9V1/4/6andJ8pin2. |
| [H150](#h150) | src/data/commodore.js:3803 | A S report1541spec;F14 | UNPROVEN | 1541specanchor/mirrors | S220 PDF4;S224,S227 failures429 | Specpage4correct;mirrorcontentnotproven. |
| [H151](#h151) | src/data/commodore.js:3832 | A F14 Carlsen links | UNPROVEN | 1541powermirror | S226 failure406;S227 failure429 | No readable payload. |
| [H152](#h152) | src/data/commodore.js:3866 | A F14 Carlsen links | UNPROVEN | 1571PSU/wiringmirrors | S404,S405,S232 fetch logs | Wiringoriginalopens;mirroridentitynotproven. |
| [H153](#h153) | src/data/commodore.js:3924 | A F14 Carlsen links | UNPROVEN | 1581powercitations | S234 refused;S224 failure429 | Unreadableaddedsource. |
| [H154](#h154) | src/data/commodore.js:3943 | A F14 Carlsen links | UNPROVEN | 1581powercitations | S234 refused;S224 failure429 | Unreadableaddedsource. |
| [H155](#h155) | src/data/commodore.js:4616 | A F14 Carlsen links | UNPROVEN | 1541quickrefmirror | S227 failure429 | Unreadableaddedsource. |
| [H156](#h156) | src/data/commodore.js:4742 | A F14 Carlsen links | UNPROVEN | 1581quickrefmirror | S234 refused | Unreadableaddedsource. |
| [H157](#h157) | src/data/dragon.js:184 | UNLOGGED | UNPROVEN | Dragon32/64cartorientation | S342 table;S354 schematic | ProseCardedgesonly;notable row;noexternalfaceview. |
| [H158](#h158) | src/data/dragon.js:266 | UNLOGGED | UNPROVEN | Dragon32/64cartorientation | S342 table;S354 schematic | ProseCardedgesonly;notable row;noexternalfaceview. |
| [H159](#h159) | src/data/dragon.js:556 | B architect#225 | CORRECT | MC14529B genericpins/boardsummary | S193 PDF506 printed7-457 rendered;S194;S196 sheet2 | Truth table matches;Dragon/CoCoroutes qualified;R48value notasserted. |
| [H160](#h160) | src/data/dragon.js:564 | B architect#225 | CORRECT | MC14529B genericpins/boardsummary | S193 PDF506 printed7-457 rendered;S194;S196 sheet2 | Truth table matches;Dragon/CoCoroutes qualified;R48value notasserted. |
| [H161](#h161) | src/data/heathkit.js:59 | B rest-architect#164 | CORRECT | HERO1MC6802RE36 | S135 sheet2 U401;S134 p1 | RE36grounded;internalRAMdisabledwithRELOW;HEROJrconditional. |
| [H162](#h162) | src/data/heathkit.js:75 | B rest-minimalist-c#260 | CORRECT | 6808 BA7 | S134 p7 rendered | Dataoff,addressnottristate;newwarningcorrect. |
| [H163](#h163) | src/data/heathkit.js:112 | UNLOGGED | CORRECT | PIA6821role | S136 pin/functions | Generictwo8bitports;sharedpassproseonly,notable row. |
| [H164](#h164) | src/data/heathkit.js:202 | UNLOGGED | UNPROVEN | 6116role/summary | S135 CPUboard;S137 EPROMsheet | Generic2Kx8roleplausible,butEPROMsheetnot6116evidence;fullrobotRAMmapnotprovedhere.Proseonly. |
| [H165](#h165) | src/data/heathkit.js:240 | B architect#170 | CORRECT | 2764sharedsummary | S138 p1;S202 PDF9;S447 IC88 | GenericEPROMpinout;stockColecoexcludedexplicitly. |
| [H166](#h166) | src/data/heathkit.js:283 | UNLOGGED | CORRECT | 27128genericrole | S139 p1 | 16Kx8EPROM;HEROusequalified.Proseonly. |
| [H167](#h167) | src/data/heathkit.js:326 | B rest-architect#175 | UNPROVEN | 146818summary/MOT1 | S141 signals;S142 pp21,23;S314 | GenericRTCandMasterVIAinterface supported;allnewHERO-specificdecoded/wakerateclaimsnotindependentlyproven. |
| [H168](#h168) | src/data/heathkit.js:346 | B rest-architect#175 | CORRECT | 146818pins13/18/19/23and6850role | S141 signals;S143 p1 | Genericfunctionsremoveboard-onlyclaims.ACIAroleportionproseonly. |
| [H169](#h169) | src/data/heathkit.js:399 | UNLOGGED | CORRECT | 74LS138role | S144 p1 | 3to8decoder;proseonly. |
| [H170](#h170) | src/data/heathkit.js:514 | B rest-architect#180 | CORRECT | TL852CNnote | S146 product;S145 package | TIactiveDIPpart;unsupportedresistoradviseremoved. |
| [H171](#h171) | src/data/heathkit.js:544 | B rest-architect#181 | UNPROVEN | MSM5832RSsubstitute | S147 printed251 | Noevidenceofnomodernreplacement/fullpackageequivalence. |
| [H172](#h172) | src/data/heathkit.js:594 | B rest-architect#182 | UNPROVEN | SC02/SSI263A | S148 printed1-42 | SSIsheetdoesnotestablishSC02identityorabsenceofemulator. |
| [H173](#h173) | src/data/heathkit.js:695 | B skeptic#247,#249,#252,#253 | CORRECT | HERO1charger3/5/8/9 | S303 PDF84,85 printed72,73 | 13.9Vfloat;inputcanfall14Vwithdischargedbatteries. |
| [H174](#h174) | src/data/heathkit.js:718 | B rest-minimalist-c#764 | UNPROVEN | HERO1P2013/4/5/10 | S303 pp72-73;S300 | Batterytextsupported;5Vconnectorpinmappingstillunproven/verify. |
| [H175](#h175) | src/data/heathkit.js:740 | B skeptic#252,#253;rest-minimalist-c#766,#767 | UNPROVEN | HERO1P202/P4011-10 | S303 pp72-73;S304 encrypted | Chargertextsupported;P401tableunreadableencrypted. |
| [H176](#h176) | src/data/heathkit.js:778 | B rest-minimalist-c#766,#767(P401) | UNPROVEN | HERO1P40111-20 | S304 encrypted | Allchangedrowsremainunproven,including17/18nominal5V. |
| [H177](#h177) | src/data/heathkit.js:828 | B rest-minimalist-c#773 | UNPROVEN | HERO1P40321-30 | S306 encrypted | Allretainedfunctions/voltagesunproven,notjustpin21. |
| [H178](#h178) | src/data/heathkit.js:846 | B rest-minimalist-c#774 | UNPROVEN | HERO1P40431-54 | S306 encrypted | Allchangedflaggedpinsreviewed;tablesunavailable. |
| [H179](#h179) | src/data/heathkit.js:878 | B rest-minimalist-c#775,#776,#777 | UNPROVEN | HERO1P40555-78 | S307 encrypted | Allchangedflaggedpinsunproven. |
| [H180](#h180) | src/data/heathkit.js:895 | B rest-minimalist-c#778 | UNPROVEN | HERO1P4061-10 | S307 encrypted | Select/addressmappingunreadable. |
| [H181](#h181) | src/data/heathkit.js:905 | B rest-minimalist-c#779,#780,#781 | UNPROVEN | HERO1P4071-10 | S308 encrypted | Rawbusassignmentsunreadable. |
| [H182](#h182) | src/data/heathkit.js:915 | B rest-minimalist-c#783,#784 | UNPROVEN | HERO1P4081-10 | S308 encrypted | Highaddressorder/selectsunreadable. |
| [H183](#h183) | src/data/heathkit.js:925 | B rest-minimalist-c#785 | UNPROVEN | HERO1P308109-118 | S309 encrypted | AllNC/datarowsunproven. |
| [H184](#h184) | src/data/heathkit.js:935 | B rest-minimalist-c#786,#787 | UNPROVEN | HERO1P306129-138 | S309 encrypted | Allsleep/datarowsunproven. |
| [H185](#h185) | src/data/heathkit.js:945 | B rest-minimalist-c#788 | UNPROVEN | HERO1P307119-128 | S309 encrypted | Allground/power/limit/speechrowsunproven. |
| [H186](#h186) | src/data/heathkit.js:962 | UNLOGGED | UNPROVEN | HERO1P31089-98 | S310 encrypted | Drive/speedbitsunproven;noexacttable row forP310(otherdriveconnectorslogged). |
| [H187](#h187) | src/data/heathkit.js:974 | B rest-minimalist-c#789 | UNPROVEN | HERO1P30999-108 | S310 encrypted | Allsteering/pivotphaseorderunproven. |
| [H188](#h188) | src/data/heathkit.js:985 | B rest-minimalist-c#790 | UNPROVEN | HERO1P315159-168 | S310 encrypted | Allmotorphaseorderunproven. |
| [H189](#h189) | src/data/heathkit.js:996 | UNLOGGED | UNPROVEN | HERO1P316149-158 | S310 encrypted | Supply/strobe/armselectunproven;noexacttable row. |
| [H190](#h190) | src/data/heathkit.js:1013 | B rest-minimalist-c#791 | UNPROVEN | HERO1P317139-148 | S310 encrypted | Allfunctionsremainunproven. |
| [H191](#h191) | src/data/heathkit.js:1030 | B rest-minimalist-c#792,#793 | UNPROVEN | HERO1P31179-88 | S311 encrypted;S303 p73 | Genericbatterytextsupported;connectoridentityunproven. |
| [H192](#h192) | src/data/heathkit.js:1047 | B rest-minimalist-c#794 | UNPROVEN | HERO1P312189-198 | S311 encrypted | Allpower/sensebitsunproven. |
| [H193](#h193) | src/data/heathkit.js:1058 | B rest-minimalist-c#795,#796 | UNPROVEN | HERO1P313179-188 | S311 encrypted | Allstatus/rotary/direction/triggerunproven. |
| [H194](#h194) | src/data/heathkit.js:1075 | B rest-minimalist-c#797 | UNPROVEN | HERO1P314169-178 | S311 encrypted | Pitch/phonememapunproven;conflictadmitsrenumberedduplicateswithoutindependentsource. |
| [H195](#h195) | src/data/heathkit.js:1108 | UNLOGGED | CORRECT | HERO1P50113battery | S303 pp72-73 | Nominal12/float13.9/low10supported;Rangesproseonly. |
| [H196](#h196) | src/data/heathkit.js:1143 | UNLOGGED | UNPROVEN | HEROJrbattery1 | S313 sheet1 | Nominal12Vbutpinstillverify;exactrouteunsettled.Rangesproseonly. |
| [H197](#h197) | src/data/heathkit.js:1155 | UNLOGGED | CORRECT | HEROJrRS232label | S314 PDF26 printed24 rendered | Page24hasRS232section;Labelsproseonly. |
| [H198](#h198) | src/data/heathkit.js:1164 | UNLOGGED | CORRECT | HEROJrRS232label | S314 PDF26 printed24 rendered | Page24hasRS232section;Labelsproseonly. |
| [H199](#h199) | src/data/heathkit.js:1181 | B rest-minimalist-c#803 | UNPROVEN | HEROJrP20110/11/13 | S313 sheets1/3/4 | Nominalremovalprudent;fullawake/sleepconnectorroutenotestablished. |
| [H200](#h200) | src/data/heathkit.js:1219 | UNLOGGED | UNPROVEN | HEROJrP202/P301supplies | S313 sheets1/3/4 | Nominalplausible;exactconnectorrouteunsettled.Rangesproseonly. |
| [H201](#h201) | src/data/heathkit.js:1228 | UNLOGGED | UNPROVEN | HEROJrP202/P301supplies | S313 sheets1/3/4 | Nominalplausible;exactconnectorrouteunsettled.Rangesproseonly. |
| [H202](#h202) | src/data/heathkit.js:1306 | B rest-minimalist-c#810 | UNPROVEN | HEROJrP2032 | S313 sheet1 | Nominalremovesinventedband;exactrouteunsettled. |
| [H203](#h203) | src/data/heathkit.js:1322 | UNLOGGED | UNPROVEN | HEROJrreceiver/HERO2000power | S313;S316 truncatedPDF | Nominalsnotconnectoridentityproof.Rangesproseonly. |
| [H204](#h204) | src/data/heathkit.js:1337 | UNLOGGED | UNPROVEN | HEROJrreceiver/HERO2000power | S313;S316 truncatedPDF | Nominalsnotconnectoridentityproof.Rangesproseonly. |
| [H205](#h205) | src/data/heathkit.js:1403 | UNLOGGED | UNPROVEN | HEROJrreceiver/HERO2000power | S313;S316 truncatedPDF | Nominalsnotconnectoridentityproof.Rangesproseonly. |
| [H206](#h206) | src/data/heathkit.js:1441 | B skeptic#244 | CORRECT | HERO1chargeroutput | S303 PDF10,84,85 | 27Vmax/1.75Amax;14Vpossible;13.9Vfloat. |
| [H207](#h207) | src/data/heathkit.js:1452 | B skeptic#244,#247,#249,#252,#253 | CORRECT | HERO1sourcelabels | S303 PDF10,84,85 | Printed8specs;72-73charger/circuit. |
| [H208](#h208) | src/data/heathkit.js:1483 | B skeptic#244,#247,#249,#252,#253 | CORRECT | HERO1sourcelabels | S303 PDF10,84,85 | Printed8specs;72-73charger/circuit. |
| [H209](#h209) | src/data/heathkit.js:1531 | UNLOGGED | CORRECT | HEROJrchassislabel | S314 PDF43 printed41 rendered | B1/B2/F1/chargerlist41.Labelsproseonly. |
| [H210](#h210) | src/data/ibm.js:150 | B fc-b-x2 | WRONG | Shared8088 RESET21 | S150 PDF3 Table1 rendered | ActiveHIGH4clocks;restartwhenLOW.Newdescriptionreversesbothandcontradictsprobe. |
| [H211](#h211) | src/data/ibm.js:195 | B skeptic#267 | CORRECT | 8284RES11timing | S156 PDF35 printed1-27 | PC100msaftersenselevels;no500msupperbound. |
| [H212](#h212) | src/data/ibm.js:218 | B rest-minimalist-c#302,#304 | UNPROVEN | 8288IOB1/CEN15 | S149 8288description;S156 boarddiagram | Retained5150tiestoverify;fullboardtracenotestablished. |
| [H213](#h213) | src/data/ibm.js:232 | B rest-minimalist-c#302,#304 | UNPROVEN | 8288IOB1/CEN15 | S149 8288description;S156 boarddiagram | Retained5150tiestoverify;fullboardtracenotestablished. |
| [H214](#h214) | src/data/ibm.js:329 | B architect#194 | UNPROVEN | 8255genericsummary/boarduses | S149;S156 p1-12;S175 PDF17;S358 | Genericrolesupported;largenewsummarycoversseveralmachineswithoutcompleteperbitboardproof. |
| [H215](#h215) | src/data/ibm.js:349 | B architect#194 | CORRECT | 8255PA/PB/PCgenericpins | S149 8255table;S160 p3 | ProgrammedI/Odirections;generictextappliesacrossmachines. |
| [H216](#h216) | src/data/ibm.js:402 | B architect#194 | CORRECT | PCjr8255perbitsummary | S157 PDF56-60 printed2-30..34 | Complete PPI bit assignments and descriptions match the moved PCjr summary, including sound-source table. |
| [H217](#h217) | src/data/ibm.js:420 | UNLOGGED | UNPROVEN | XTmemoryWaybacksource | S168 failure406;S169 refused | Noaddedpayload;Linksproseonly. |
| [H218](#h218) | src/data/ibm.js:442 | B rest-architect#208 | CORRECT | XT640Kprocedure/sourcechange | S170 pp1-3 printed521-523 | U84LS158/E2orU44jumper/banks/SW1-3,4off/memorycardremovalexplicit;newsource stronger. |
| [H219](#h219) | src/data/ibm.js:458 | B rest-minimalist-c#314 | CORRECT | 8237DREQ2pin17 | S156 PDF26 printed1-18;diskettesection | B6isDRQ2,diskettechannel2. |
| [H220](#h220) | src/data/ibm.js:478 | B rest-minimalist-c#314 | CORRECT | 8237DREQ2pin17 | S156 PDF26 printed1-18;diskettesection | B6isDRQ2,diskettechannel2. |
| [H221](#h221) | src/data/ibm.js:564 | B rest-architect#200 | UNPROVEN | 6845role/IBMratesmoved | S164 pp8-9 | Genericcontrollersupported;IBMMDA/CGAapproximateratesneedcardspecificprogrammingevidence. |
| [H222](#h222) | src/data/ibm.js:583 | B rest-architect#200 | CORRECT | 6845CLK21/HS39 | S164 pp8-9 | Characterclock;programmedhorizontalrate,notfixedIBMrates. |
| [H223](#h223) | src/data/ibm.js:601 | B rest-architect#200 | CORRECT | 6845CLK21/HS39 | S164 pp8-9 | Characterclock;programmedhorizontalrate,notfixedIBMrates. |
| [H224](#h224) | src/data/ibm.js:642 | B rest-minimalist-c#855,#861;skeptic#295 | CORRECT | 5155nominalhelper | S159 pp3-8..3-10 | Portablesourcenominalrails;helperreplacesexactbands. |
| [H225](#h225) | src/data/ibm.js:819 | B skeptic#267 | CORRECT | P8-1PowerGood | S156 printed1-27;S159 printed3-9 | PC100ms;XT/Portable100-500msqualified. |
| [H226](#h226) | src/data/ibm.js:851 | B rest-architect#185 | UNPROVEN | V20replacement | S151 failure406 | NoNECmakercomparison;verifydoesnotprovepincompatible. |
| [H227](#h227) | src/data/ibm.js:867 | B rest-architect#190,#196 | UNPROVEN | 82C55hold/8259A-2 | S160 p3;S149 PICtimings | Bus-holdcorrectionsupported;PICfullelectricalcompatibilitynotestablished. |
| [H228](#h228) | src/data/ibm.js:878 | B rest-architect#199,#203,#204 | UNPROVEN | 8087grades/CRTCvariants | S163 failure406;S167 archivedCRTC | Secondarytypesnotmakercomparison;8087reportunreadable. |
| [H229](#h229) | src/data/ibm.js:1049 | UNLOGGED | CORRECT | XTslotlabel | S159 PDF36 printed1-17 | Correctprintedpage;Labelsproseonly. |
| [H230](#h230) | src/data/ibm.js:1067 | B rest-minimalist-c#855;skeptic#295 | CORRECT | 5155PSUnominals | S159 printed3-10 | NominalP8/P9railssupported,notborrowedwindows. |
| [H231](#h231) | src/data/ibm.js:1077 | B rest-minimalist-c#861;skeptic#307 | UNPROVEN | 5155slot/PCjrtransformer | S159 PDF36;S157 printed2-138;S318 PDF62 | 5155nominals/15-30VAC1to3supported;PCjrphysicalpinorientationstillunproven. |
| [H232](#h232) | src/data/ibm.js:1202 | B architect#66 | UNPROVEN | PCjrcartridgeorientation | S157 PDF143 printed2-117 | Topofcartridgeisnotslotexternalview;newlookingdirectioninferenceunproven. |
| [H233](#h233) | src/data/ibm.js:1221 | B architect#67 | UNPROVEN | PCjrsidecarorientation | S157 PDF48 printed2-22 | Pinlistlacksexternalrow/startview. |
| [H234](#h234) | src/data/ibm.js:1258 | B skeptic#267 | CORRECT | 5150PowerGoodnotes/rail/test/checklist | S156 PDF35 printed1-27 | Atleast100ms;upper500msremoved. |
| [H235](#h235) | src/data/ibm.js:1275 | B skeptic#267 | CORRECT | 5150PowerGoodnotes/rail/test/checklist | S156 PDF35 printed1-27 | Atleast100ms;upper500msremoved. |
| [H236](#h236) | src/data/ibm.js:1284 | B skeptic#267 | CORRECT | 5150PowerGoodnotes/rail/test/checklist | S156 PDF35 printed1-27 | Atleast100ms;upper500msremoved. |
| [H237](#h237) | src/data/ibm.js:1321 | B skeptic#267 | CORRECT | 5150PowerGoodnotes/rail/test/checklist | S156 PDF35 printed1-27 | Atleast100ms;upper500msremoved. |
| [H238](#h238) | src/data/ibm.js:1461 | B skeptic#307 | CORRECT | PCjrtransformeroutput/rail | S318 PDF62 printed3-020-8;S157 printed2-138 | Unplugged15-30VACbetween1/3;notassumed17+17centre. |
| [H239](#h239) | src/data/ibm.js:1472 | B skeptic#307 | CORRECT | PCjrtransformeroutput/rail | S318 PDF62 printed3-020-8;S157 printed2-138 | Unplugged15-30VACbetween1/3;notassumed17+17centre. |
| [H240](#h240) | src/data/msx.js:36 | B skeptic#358,#409 | UNPROVEN | MSXcart3/5/orientation | S358 PDF34-36 printed31-33 | Reserved5/CS12note supported;noexternalfaceviewforgeometry. |
| [H241](#h241) | src/data/msx.js:55 | B skeptic#398,#400,#401,#403,#449,#451,#452,#454 | CORRECT | MSXcart45/47/48/50 | S358 PDF35-37 printed32-34 | Nominal+5/+12/-12andcapacities;notolerances. |
| [H242](#h242) | src/data/msx.js:84 | B rest-minimalist-d#1013 | UNPROVEN | MSXtapeREMOTE6/7 | S358 PDF19 printed16 | Motorcontrollabels,butnoswitchingcircuit;closedcontactexpectationunproven. |
| [H243](#h243) | src/data/msx.js:207 | B architect#228 | CORRECT | V9958adapterclassification | S197 PDF7-8 printed3-4 | Pin4/8/21/26/27differencesrequireadaptation. |
| [H244](#h244) | src/data/oric.js:11 | B rest-minimalist-d#1035 | CORRECT | Oricservicemanualaddition | S376 pp12-13 | Opens;resetexternallygeneratedinputdescribed. |
| [H245](#h245) | src/data/oric.js:32 | B architect#69;rest-minimalist-d#1035 | UNPROVEN | Oric1orientation/reset4 | S374 PDF289 printed284;S376 p13 | Atmosview/resetinputsupported;Oric1physicalviewnotproven. |
| [H246](#h246) | src/data/oric.js:49 | B architect#69;rest-minimalist-d#1030 | UNPROVEN | Oricexp33/printerorientation | S374 PDF289 printed284;S376 | Nominal5Vsupported;Oric1viewstillborrowedfromAtmos. |
| [H247](#h247) | src/data/oric.js:135 | UNLOGGED | UNPROVEN | Orickeyboard14 | S018,S372 failures;S373 circuit | Nominalremovalprudent;exactPL3routeunsettled.Rangesproseonly. |
| [H248](#h248) | src/data/oric.js:190 | UNLOGGED | CORRECT | Oriccircuitmirrors | S373 OricOwner5circuits | Workingcircuitsourceadded;originalskept.Linksproseonly;doesnotproveAtmoskeyboardequivalence. |
| [H249](#h249) | src/data/oric.js:378 | UNLOGGED | CORRECT | Oriccircuitmirrors | S373 OricOwner5circuits | Workingcircuitsourceadded;originalskept.Linksproseonly;doesnotproveAtmoskeyboardequivalence. |
| [H250](#h250) | src/data/photos.js:137 | UNLOGGED | UNPROVEN | ColecophotoU2box2764to9464 | S474 photo;S202 PDF9 | Sameboxreasonable,butphotonotfittedmaskidentityproof.Notable row;Aexplicitlylefttoothers. |
| [H251](#h251) | src/data/schematics.js:551 | UNLOGGED | CORRECT | ModelIschematicTRHmirror | S292 PDF114 | Openswithschematic.Linksproseonly. |
| [H252](#h252) | src/data/sinclair.js:315 | A RMb#189;RA#119 | UNPROVEN | ZX81ULA36/2C210E | S090;S091;S088 | Directionandfullreplacementcompatibilitynotestablishedbytheseassignments/secondarynotes. |
| [H253](#h253) | src/data/sinclair.js:364 | A RA#121 | UNPROVEN | ZX81ROMmachinesummary | S090 SRC049 | ZX81routesupported;TS1000followsschematicassumed;TS1500explicitlyunconfirmed. |
| [H254](#h254) | src/data/sinclair.js:387 | A RA#121,#123;RAreportSincLink | UNPROVEN | ZX81ROM20/adapteranchor | S090;S092 PDF9;S093 | SincLinkcorrectanchor;OSHParklistingdoesnotproveallEEPROMadapterwiring. |
| [H255](#h255) | src/data/sinclair.js:519 | A RA#128-130 | UNPROVEN | SpectrumULAvariants | S095 ULAtypes | Secondaryissuelistnotmakerpin/electricalproof. |
| [H256](#h256) | src/data/tandy.js:17 | UNLOGGED | CORRECT | TRHmirrorhelper | S292 PDF53/92/114 | Workingmatchingtext-layercopy.Linksproseonly. |
| [H257](#h257) | src/data/tandy.js:126 | B rest-minimalist-b#760 | UNPROVEN | Model4printerfactory | S299 PDF37 printed21 rendered | U66supported;status29/30/32routingstillunchecked. |
| [H258](#h258) | src/data/tandy.js:355 | B rest-architect#144 | CORRECT | 6809summary/CoCo3NC | S115 p6;S122 p1 rendered | CoCo3 drawing shows NC on5/6/33/36/38 and grounded TSC39; generic role covers Dragon. |
| [H259](#h259) | src/data/tandy.js:368 | B rest-architect#144 | CORRECT | 6809IRQ3/BS5/BA6;6309anchor | S115 p6 rendered;S117 p14 | BA/BStablematches;ErrorTrappingatPDF14. |
| [H260](#h260) | src/data/tandy.js:403 | B rest-architect#144,#148 | UNPROVEN | 6809controlpins/6847summary | S115 pp6-8;S118;S125 | HALT/genericfunctionssupported;allcrossmachineHS/SAMroutesnottraced. |
| [H261](#h261) | src/data/tandy.js:468 | B rest-architect#148,#151 | CORRECT | 6847HS38/6883role | S118 pinfunction;S120 PDF4 | GenericHSandSAMtimingfunctions;Dragonscorrectlyincluded. |
| [H262](#h262) | src/data/tandy.js:503 | B rest-architect#151 | CORRECT | SAM6883E14clock | S120 PDF4 printed5-326;MPUrate section | Ratebitsgivecrystal/16slow,/8fast;0.89/1.79at14.31818MHz. |
| [H263](#h263) | src/data/tandy.js:546 | B rest-architect#154 | UNPROVEN | GIME-Z/TCC1014 | S123 product;S124 versions | MakerproductprovesFPGA/turbo/2MB;1986/1987substitutionnomakercomparison. |
| [H264](#h264) | src/data/tandy.js:622 | B rest-architect#155 | UNPROVEN | HD6803alternative | S127 PDF353;S126 parts | Hitachicompatibilitystatement/Tandyalternative;nofullelectricalboardcomparison. |
| [H265](#h265) | src/data/tandy.js:758 | B rest-architect#159 | UNPROVEN | PercomDoubler | S130 producthistory | No adaptercircuit;flagdoesnotprovewiring. |
| [H266](#h266) | src/data/tandy.js:828 | B fc-b-x1 | WRONG | ModelIII/4 FD1793pin20 | S131 PDF2 printed2 rendered | 20VSSground;21VCC+5V;40VDD+12V.New+5V20false. |
| [H267](#h267) | src/data/tandy.js:935 | B architect#59,#60 | UNPROVEN | CoCo1/2cartorientation | S286 p36;S116 p53 | Signal listsnotexternalfaceview. |
| [H268](#h268) | src/data/tandy.js:1001 | B architect#59,#60 | UNPROVEN | CoCo1/2cartorientation | S286 p36;S116 p53 | Signal listsnotexternalfaceview. |
| [H269](#h269) | src/data/tandy.js:1047 | UNLOGGED | UNPROVEN | CoCo3cartorientation | S121 CN1 | Noexteriorview;Cardedgesproseonly. |
| [H270](#h270) | src/data/tandy.js:1156 | B architect#61 | UNPROVEN | MC10edgeorientation | S126 Table1 p15 | Pinlistnotphysicalview. |
| [H271](#h271) | src/data/tandy.js:1243 | UNLOGGED | CORRECT | ModelIexpansionmirror | S292 PDF92 printed91 Fig22 | Sourceopens;Linksproseonly. |
| [H272](#h272) | src/data/tandy.js:1299 | B architect#62 | UNPROVEN | EIprinterJ4orientation | S129 sheet2 | Logicalpinoutnotexteriorview. |
| [H273](#h273) | src/data/tandy.js:1318 | UNLOGGED | UNPROVEN | EIdiskJ5orientation | S129 sheet2 | Noexternalrow/startview;Cardedgesproseonly. |
| [H274](#h274) | src/data/tandy.js:1359 | UNLOGGED | UNPROVEN | ModelIIIIO/printer,Model4IOviews | S064 connectorsection;S299 IOsection | Noexplicitexteriorrow/endproof;Cardedgesproseonly. |
| [H275](#h275) | src/data/tandy.js:1370 | UNLOGGED | UNPROVEN | ModelIIIIO/printer,Model4IOviews | S064 connectorsection;S299 IOsection | Noexplicitexteriorrow/endproof;Cardedgesproseonly. |
| [H276](#h276) | src/data/tandy.js:1456 | UNLOGGED | UNPROVEN | ModelIIIIO/printer,Model4IOviews | S064 connectorsection;S299 IOsection | Noexplicitexteriorrow/endproof;Cardedgesproseonly. |
| [H277](#h277) | src/data/tandy.js:1469 | B rest-minimalist-b#760 | UNPROVEN | Model4printerU66/U67 | S299 PDF37 printed21 | Latches/buffersmatch;physicalpinmapstillborrowed/statusunchecked. |
| [H278](#h278) | src/data/tandy.js:1867 | UNLOGGED | CORRECT | ModelIpowersupply/resourcesTRHmirror | S292 PDF53-55 | Workingcopy;Linksproseonly. |
| [H279](#h279) | src/data/tandy.js:2510 | UNLOGGED | CORRECT | ModelIpowersupply/resourcesTRHmirror | S292 PDF53-55 | Workingcopy;Linksproseonly. |
| [H280](#h280) | src/data/ti.js:154 | A A#137 | UNPROVEN | PSG76489CLOCK14 | S111 p1;S112 circuit | 76494dividerproven;SN94624equivalenceassumed,nomakersheet. |
| [H281](#h281) | src/data/ti.js:374 | A A#135,#136,F3 | UNPROVEN | 9918familyadapters/F18Amirror | S103 pp53-54;S108 failure429;S109 TLSfailure | 9928/9929videochangesupported;9118familyandmirrorunproven. |
| [H282](#h282) | src/data/ti.js:399 | A RA#138,#139;rule6 | UNPROVEN | PSGsubstitutionnotes | S111 p1;S113 parts | 76489divider/NC9supported;SN94624counterpart/electricalcompatibilityunproven. |
| [H283](#h283) | src/data/ti.js:466 | A RA#142,F16 | CORRECT | TMS2532adapter21 | S010 PDF207-208;S112 PDF62 rendered | TI2532 VPP21 must be5V to read; U610/U611 pin21 ground visible in console circuit, so lift and tie required. |
| [H284](#h284) | src/data/ti.js:486 | A RA#143 | UNPROVEN | 6810NTE/ECGsubstitutes | S113 parts | Crossreferencenotmakercomparison. |
| [H285](#h285) | src/data/ti.js:512 | A RMb#695,S#204-206,F7 | UNPROVEN | TIpower1/2/4 | S285 printed21 | Unequaltapnotcentre;physicalpinidentities/conflictinglabelsstillverify. |
| [H286](#h286) | src/data/ti.js:629 | A RMb#699 | CORRECT | TIIO41IAQHA | S112 PDF62 printed60 rendered | U605 OR gate inputs from HOLDA and IAQ; output net IAQHA explicitly I/O port41. |
| [H287](#h287) | src/data/ti.js:642 | A A#57 | UNPROVEN | TIcartridgeview | S105 printed105;S112 J500 | Logicalcolumnsarenotexternalup/downview. |
| [H288](#h288) | src/data/timex.js:13 | A SreportSUMlink | CORRECT | SUMarticleanchor | S283 PDF5 page/n4 | Correctpowersupplyarticlepage5. |
| [H289](#h289) | src/data/timex.js:159 | A F21 | CORRECT | AY8912CLOCK15genericprobe | S100 pp11-12 | Genericinputclock;machine-specificratesremoved. |
| [H290](#h290) | src/data/timex.js:316 | A S#200,#202 | CORRECT | TS2068power2 | S283 PDF5;S101 powerspec | 21Vstockoutputwithoutunsupportedunloadedcondition. |
| [H291](#h291) | src/data/timex.js:349 | A A#56 | CORRECT | TS2068dockJ4view | S101 PDF67 printed59 rendered | Frontviewevenstop2left;oddsbelow1left. |
| [H292](#h292) | src/data/timex.js:467 | A S#200,#202 | CORRECT | TS2068supply/rawrail | S283 PDF5 | Stock21Vattributionand15-16Vheatreductionfaithful. |
| [H293](#h293) | src/data/timex.js:480 | A S#200,#202 | CORRECT | TS2068supply/rawrail | S283 PDF5 | Stock21Vattributionand15-16Vheatreductionfaithful. |

## Exact changed fields by item

### H001

src/data/acorn.js @@ -1,6 +1,6 @@

```diff
-   the Model B circuit diagram 105,000/C, the Master main PCB diagram 0143,000 and the chip data sheets; see docs/verification/acorn.md.
+   the Model B circuit diagram 103,000/C, the Master main PCB diagram 0143,000 and the chip data sheets; see docs/verification/acorn.md.
```

### H002

src/data/acorn.js @@ -15,6 +15,7 @@ Object.assign(RCS.terms, {

```diff
+const CDM = 'https://www.goffart.co.uk/museum/schematics/bbc_b.pdf';
```

### H003

src/data/acorn.js @@ -159,7 +160,7 @@ const printerPins = early => {

```diff
-  const ev = [['R/W', 'ctrl', 'Read/not write from the CPU, buffered.'], ['1MHzE', 'clock', 'The 1 MHz system clock, 50% square wave.'], ['/NMI', 'ctrl', 'To the CPU NMI, pulled up by 3K3. Disc and Econet use NMI too.'],
+  const ev = [['R/W', 'ctrl', 'Read/not write from the CPU, buffered.'], ['1MHzE', 'clock', master ? 'The 1 MHz system clock.' : 'The 1 MHz system clock, 50% square wave.'], ['/NMI', 'ctrl', 'To the CPU NMI, pulled up by 3K3. Disc and Econet use NMI too.'],
```

### H004

src/data/acorn.js @@ -168,7 +169,7 @@ const oneMhzPins = master => {

```diff
-  ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'].forEach((d, i) => p.push({ n: 18 + i, name: d, type: 'data', desc: `Buffered data bus bit ${i} (enabled only for FRED and JIM).` }));
+  ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'].forEach((d, i) => p.push({ n: 18 + i, name: d, type: 'data', desc: master ? `Buffered data bus bit ${i}: the PBC EX bus (ED${i}), shared with the external Tube.` : `Buffered data bus bit ${i} (enabled only for FRED and JIM).` }));
```

### H005

src/data/acorn.js @@ -180,7 +181,7 @@ const tubePins = master => {

```diff
-    p.push({ n: odd, name: pw ? '+5 V' : '0 V', type: pw ? 'power' : 'ground', desc: pw ? '+5 V for the second processor interface.' : 'Ground.', expect: pw ? '+4.75 to +5.25 V' : '0 V' });
+    p.push({ n: odd, name: pw ? '+5 V' : '0 V', type: pw ? 'power' : 'ground', desc: pw ? '+5 V for the second processor interface.' : 'Ground.', expect: pw ? '+5 V' : '0 V' });
```

### H006

src/data/acorn.js @@ -205,55 +206,55 @@ const discPins = master => {

```diff
-  { id: 'bbcb-uhf', name: 'UHF out (TV)', kind: 'Phono socket, UHF channel 36 PAL', geo: 'rca', verifiedAgainst: 'BBC Microcomputer Service Manual 1.2.1, 3.4; Model B circuit diagram 105,000/C',
+  { id: 'bbcb-uhf', name: 'UHF out (TV)', kind: 'Phono socket, UHF channel 36 PAL', geo: 'rca', verifiedAgainst: 'BBC Microcomputer Service Manual 1.2.1, 3.4; Model B circuit diagram 103,000/C',
-    sources: [S('BBC Microcomputer Service Manual, 3.4 RGB + PAL encoder + UHF output', SM), S('Circuit diagram for BBC Microcomputer 105,000/C (UHF, SK2, SK3 area)', CD)] },
+    sources: [S('BBC Microcomputer Service Manual, 3.4 RGB + PAL encoder + UHF output', SM), S('Circuit diagram for BBC Microcomputer 103,000/C (UHF, SK2, SK3 area)', CD)] },
-  { id: 'bbcb-rgb', name: 'RGB (SK3)', kind: 'DIN-6 240° socket', geo: 'din6', gender: 'female', verifiedAgainst: 'Model B circuit diagram 105,000/C (SK3, DIN viewed from outside); Master Series Service Manual p. 51',
+  { id: 'bbcb-rgb', name: 'RGB (SK3)', kind: 'DIN-6 240° socket', geo: 'din6', gender: 'female', verifiedAgainst: 'Model B circuit diagram 103,000/C (SK3, DIN viewed from outside); Master Series Service Manual p. 51',
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, RGB connector SK3', CD), S('BBC Microcomputer Service Manual, 1.2.2 and 7.1', SM), S('Master Series Service Manual, SK9 RGB figure, p. 51', MSM(51))] },
-  { id: 'bbcb-rs423', name: 'RS423 serial (SK4)', kind: "5-pin 'domino' DIN socket, pins A-E", geo: 'custom', pads: DOMINO_PADS, outline: DOMINO_OUTLINE, gender: 'female', verifiedAgainst: 'Master Series Service Manual p. 51 (SK10 figure); Model B circuit diagram 105,000/C (SK4); BBC User Guide p. 376',
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, RGB connector SK3', CD), S('BBC Microcomputer Service Manual, 1.2.2 and 7.1', SM), S('Master Series Service Manual, SK9 RGB figure, p. 51', MSM(51))] },
+  { id: 'bbcb-rs423', name: 'RS423 serial (SK4)', kind: "5-pin 'domino' DIN socket, pins A-E", geo: 'custom', pads: DOMINO_PADS, outline: DOMINO_OUTLINE, gender: 'female', verifiedAgainst: 'Master Series Service Manual p. 51 (SK10 figure); Model B circuit diagram 103,000/C (SK4); BBC User Guide p. 376',
-    sources: [S('Master Series Service Manual, SK10 RS423 figure, p. 51', MSM(51)), S('Circuit diagram for BBC Microcomputer 105,000/C, RS423 connector SK4 and IC75/IC74', CD), S('BBC Microcomputer System User Guide (1984), serial printer connections, p. 376', UG(388)), S('BBC Microcomputer Service Manual, 3.5 and 7.1', SM)] },
-  { id: 'bbcb-cassette', name: 'Cassette (SK5)', kind: 'DIN-7 270° socket', geo: 'din7', gender: 'female', verifiedAgainst: 'Model B circuit diagram 105,000/C (SK5); Master Series Service Manual p. 51',
+    sources: [S('Master Series Service Manual, SK10 RS423 figure, p. 51', MSM(51)), S('Circuit diagram for BBC Microcomputer 103,000/C, RS423 connector SK4 and IC75/IC74', CD), S('BBC Microcomputer System User Guide (1984), serial printer connections, p. 376', UG(388)), S('BBC Microcomputer Service Manual, 3.5 and 7.1', SM)] },
+  { id: 'bbcb-cassette', name: 'Cassette (SK5)', kind: 'DIN-7 270° socket', geo: 'din7', gender: 'female', verifiedAgainst: 'Model B circuit diagram 103,000/C (SK5); Master Series Service Manual p. 51',
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, cassette connector SK5', CD), S('Master Series Service Manual, SK11 cassette figure, p. 51', MSM(51)), S('BBC Microcomputer Service Manual, 3.5, 6.4 and 7.1', SM)] },
-  { id: 'bbcb-analogue', name: 'Analogue in (SK6)', kind: 'DA-15 socket (15-way D-type)', geo: 'da15', gender: 'female', verifiedAgainst: 'Model B circuit diagram 105,000/C (paddle and light pen connector SK6); Master Series Service Manual p. 52',
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, cassette connector SK5', CD), S('Master Series Service Manual, SK11 cassette figure, p. 51', MSM(51)), S('BBC Microcomputer Service Manual, 3.5, 6.4 and 7.1', SM)] },
+  { id: 'bbcb-analogue', name: 'Analogue in (SK6)', kind: 'DA-15 socket (15-way D-type)', geo: 'da15', gender: 'female', verifiedAgainst: 'Model B circuit diagram 103,000/C (paddle and light pen connector SK6); Master Series Service Manual p. 52',
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, SK6', CD), S('Master Series Service Manual, SK12 analogue in, p. 52', MSM(52)), S('Advanced User Guide, ch. 26 (ADC, joystick connections)', AUG)] },
-  { id: 'bbcb-econet', name: 'Econet (SK7)', kind: 'DIN-5 180° socket', geo: 'din5-180', gender: 'female', verifiedAgainst: 'Model B circuit diagram 105,000/C (SK7); Master Series Service Manual p. 52',
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, SK6', CD), S('Master Series Service Manual, SK12 analogue in, p. 52', MSM(52)), S('Advanced User Guide, ch. 26 (ADC, joystick connections)', AUG)] },
+  { id: 'bbcb-econet', name: 'Econet (SK7)', kind: 'DIN-5 180° socket', geo: 'din5-180', gender: 'female', verifiedAgainst: 'Model B circuit diagram 103,000/C (SK7); Master Series Service Manual p. 52',
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, Econet connector SK7', CD), S('Master Series Service Manual, SK7 ECONET figure, p. 52', MSM(52)), S('BBC Microcomputer Service Manual, 3.12 Econet', SM)] },
-  { id: 'bbcb-disc', name: 'Disc drive (PL8)', kind: '34-way IDC header under the case', geo: 'custom', pads: hdrPads(34), outline: hdrOutline(34), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL8)',
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, Econet connector SK7', CD), S('Master Series Service Manual, SK7 ECONET figure, p. 52', MSM(52)), S('BBC Microcomputer Service Manual, 3.12 Econet', SM)] },
+  { id: 'bbcb-disc', name: 'Disc drive (PL8)', kind: '34-way IDC header under the case', geo: 'custom', pads: hdrPads(34), outline: hdrOutline(34), gender: 'male', verifiedAgainst: 'Model B circuit diagram 103,000/C (PL8)',
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, disc connector PL8', CD), S('BBC Microcomputer Service Manual, 3.10 Disc interface', SM)] },
-  { id: 'bbcb-printer', name: 'Printer (PL9)', kind: '26-way IDC header under the case', geo: 'custom', pads: hdrPads(26), outline: hdrOutline(26), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL9); BBC User Guide p. 375; Master Series Service Manual p. 53',
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, disc connector PL8', CD), S('BBC Microcomputer Service Manual, 3.10 Disc interface', SM)] },
+  { id: 'bbcb-printer', name: 'Printer (PL9)', kind: '26-way IDC header under the case', geo: 'custom', pads: hdrPads(26), outline: hdrOutline(26), gender: 'male', verifiedAgainst: 'Model B circuit diagram 103,000/C (PL9); BBC User Guide p. 375; Master Series Service Manual p. 53',
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, printer connector PL9', CD), S('BBC Microcomputer System User Guide (1984), parallel printer connections, p. 375', UG(387)), S('Master Series Service Manual, PL3 printer, p. 53', MSM(53)), S('BBC Microcomputer Service Manual, 4.2 and 7.2', SM)] },
-  { id: 'bbcb-user', name: 'User port (PL10)', kind: '20-way IDC header under the case', geo: 'custom', pads: hdrPads(20), outline: hdrOutline(20), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL10); Master Series Service Manual p. 54; Advanced User Guide 24.2',
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, printer connector PL9', CD), S('BBC Microcomputer System User Guide (1984), parallel printer connections, p. 375', UG(387)), S('Master Series Service Manual, PL3 printer, p. 53', MSM(53)), S('BBC Microcomputer Service Manual, 4.2 and 7.2', SM)] },
+  { id: 'bbcb-user', name: 'User port (PL10)', kind: '20-way IDC header under the case', geo: 'custom', pads: hdrPads(20), outline: hdrOutline(20), gender: 'male', verifiedAgainst: 'Model B circuit diagram 103,000/C (PL10); Master Series Service Manual p. 54; Advanced User Guide 24.2',
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, user I/O connector PL10', CD), S('Master Series Service Manual, PL4 user port, p. 54', MSM(54)), S('Advanced User Guide, 24.2 Port B, the user port', AUG)] },
-  { id: 'bbcb-1mhz', name: '1 MHz bus (PL11)', kind: '34-way IDC header under the front edge', geo: 'custom', pads: hdrPads(34), outline: hdrOutline(34), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL11); Advanced User Guide 28.4; Master Series Service Manual p. 54',
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, user I/O connector PL10', CD), S('Master Series Service Manual, PL4 user port, p. 54', MSM(54)), S('Advanced User Guide, 24.2 Port B, the user port', AUG)] },
+  { id: 'bbcb-1mhz', name: '1 MHz bus (PL11)', kind: '34-way IDC header under the front edge', geo: 'custom', pads: hdrPads(34), outline: hdrOutline(34), gender: 'male', verifiedAgainst: 'Model B circuit diagram 103,000/C (PL11); Advanced User Guide 28.4; Master Series Service Manual p. 54',
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, 1 MHz extension bus PL11', CD), S('Advanced User Guide, ch. 28 The one megahertz bus, 28.4 Bus signal definitions', AUG), S('Master Series Service Manual, PL5 1MHz bus, p. 54', MSM(54))] },
-  { id: 'bbcb-tube', name: 'Tube (PL12)', kind: '40-way IDC header under the case', geo: 'custom', pads: hdrPads(40), outline: hdrOutline(40), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL12); Master Series Service Manual p. 55',
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, 1 MHz extension bus PL11', CD), S('Advanced User Guide, ch. 28 The one megahertz bus, 28.4 Bus signal definitions', AUG), S('Master Series Service Manual, PL5 1MHz bus, p. 54', MSM(54))] },
+  { id: 'bbcb-tube', name: 'Tube (PL12)', kind: '40-way IDC header under the case', geo: 'custom', pads: hdrPads(40), outline: hdrOutline(40), gender: 'male', verifiedAgainst: 'Model B circuit diagram 103,000/C (PL12); Master Series Service Manual p. 55',
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, Acorn Tube PL12', CD), S('Master Series Service Manual, PL6 TUBE, p. 55', MSM(55)), S('BBC Microcomputer Service Manual, 6.4 (solder bridges)', SM)] },
-  { id: 'bbcb-kbd', name: 'Keyboard (PL13)', kind: '17-way single-row header (keyboard ribbon)', geo: 'custom', pads: rowPads(Array.from({ length: 17 }, (_, i) => i + 1)), outline: ROW_OUTLINE, gender: 'male', verify: true, verifiedAgainst: 'Model B circuit diagram 105,000/C (PL13), pins 1-12 and 15 read',
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, Acorn Tube PL12', CD), S('Master Series Service Manual, PL6 TUBE, p. 55', MSM(55)), S('BBC Microcomputer Service Manual, 6.4 (solder bridges)', SM)] },
+  { id: 'bbcb-kbd', name: 'Keyboard (PL13)', kind: '17-way single-row header (keyboard ribbon)', geo: 'custom', pads: rowPads(Array.from({ length: 17 }, (_, i) => i + 1)), outline: ROW_OUTLINE, gender: 'male', verify: true, verifiedAgainst: 'Model B circuit diagram 103,000/C (PL13), pins 1-12 and 15 read',
```

### H007

src/data/acorn.js @@ -269,22 +270,22 @@ const bbcbConnectors = [

```diff
-    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, keyboard connector PL13', CD), S('BBC Microcomputer Service Manual, 3.7 Keyboard', SM)] },
+    sources: [S('Circuit diagram for BBC Microcomputer 103,000/C, keyboard connector PL13', CD), S('BBC Microcomputer Service Manual, 3.7 Keyboard', SM)] },
-    pins: TABS7.map(n => n.startsWith('+5V') ? { n, name: '+5 V', type: 'power', desc: 'One of three +5 V feeds (red lead), joined on the board.', expect: '+4.9 to +5.2 V' }
+    pins: TABS7.map(n => n.startsWith('+5V') ? { n, name: '+5 V', type: 'power', desc: 'One of three +5 V feeds (red lead). Most boards join them; some early issue 2 boards have three separate +5 V rails, so check all three.', expect: '+5 V' }
-      : { n, name: '-5 V', type: 'power', desc: '-5 V (purple lead; brown on the linear supply). Needed only by cassette, sound, speech and RS423.', expect: '-4.75 to -5.25 V' }),
+      : { n, name: '-5 V', type: 'power', desc: '-5 V (purple lead; brown on the linear supply). Needed only by cassette, sound, speech and RS423.', expect: '-5 V' }),
-      { n: 3, name: '+5 V', type: 'power', desc: '+5 V, 1.25 A (yellow wire).', expect: '+4.9 to +5.2 V' },
-      { n: 4, name: '+12 V', type: 'power', desc: '+12 V, 1.25 A (brown wire).', expect: '+11.4 to +12.6 V' },
+      { n: 3, name: '+5 V', type: 'power', desc: '+5 V, 1.25 A (yellow wire).', expect: '+5 V' },
+      { n: 4, name: '+12 V', type: 'power', desc: '+12 V, 1.25 A (brown wire).', expect: '+12 V' },
-      { n: 6, name: '-5 V', type: 'power', desc: '-5 V, 75 mA (no wire in the standard lead).', expect: '-4.75 to -5.25 V' }
+      { n: 6, name: '-5 V', type: 'power', desc: '-5 V, 75 mA (no wire in the standard lead).', expect: '-5 V' }
```

### H008

src/data/acorn.js @@ -355,7 +356,7 @@ const masterConnectors = [

```diff
-    summary: 'Two Electron-style ROM cartridge slots above the keypad, wired in parallel (b10 joins them unless LK21 links it to the light pen). Row a is drawn on top. a9 is -5 V via LK2/R9, a10 reads low on a Master (LK12 B), a17 is the 16 MHz clock link (LK6). Pins a9, a18, a21 and b10 are read from the drawing and marked verify. Worn or bent blades and Electron-only cartridges are the usual faults.',
+    summary: 'Two Electron-style ROM cartridge slots above the keypad, wired in parallel (b10 joins them unless LK21 links it to the light pen). Row a is drawn on top; the schematic does not show which face of the slot row a is on (verify). a9 is -5 V via LK2/R9, a10 reads low on a Master (LK12 B), a17 is the 16 MHz clock link (LK6). Pins a9, a18, a21 and b10 are read from the drawing and marked verify. Worn or bent blades and Electron-only cartridges are the usual faults.',
```

### H009

src/data/acorn.js @@ -392,15 +393,15 @@ const masterConnectors = [

```diff
-      { n: 2, name: 'BAT +', type: 'power', desc: 'Battery positive to the clock supply (through R23 / Q4 on the drawing).', expect: 'About 3 V (at least 2.6 V at the clock chip, mains off)' },
+      { n: 2, name: 'BAT +', type: 'power', desc: 'Battery positive to the clock supply (through R23 / Q4 on the drawing).', expect: 'About 3 V with the original 3.0 V lithium cell (at least 2.6 V at the clock chip, mains off)' },
-    sources: [S('Master main PCB circuit diagram 0143,000 sheet 2, PL8', MSCH), S('Master Series Service Manual, 3 Disassembly (PL8 either way round) and 7.4.3', MSM(7)), S('linuxjedi.co.uk, Restoring a BBC Master 128 part 1 (leaked pack)', LJ, true)] },
+    sources: [S('Master main PCB circuit diagram 0143,000 sheet 2, PL8', MSCH), S('Master Series Service Manual, 3 Disassembly (PL8 either way round) and 7.4.3', MSM(7)), S('Master Reference Manual Part 1, F.3-2 Battery backed CMOS clock and RAM (3.0 V lithium cell)', MRM1(233)), S('linuxjedi.co.uk, Restoring a BBC Master 128 part 1 (leaked pack)', LJ, true)] },
-    pins: TABS7.map(n => n.startsWith('+5V') ? { n, name: '+5 V', type: 'power', desc: '+5 V feed (red wire).', expect: '+4.9 to +5.2 V' }
+    pins: TABS7.map(n => n.startsWith('+5V') ? { n, name: '+5 V', type: 'power', desc: '+5 V feed (red wire).', expect: '+5 V' }
-      : { n, name: '-5 V', type: 'power', desc: '-5 V (purple wire): RS423 driver, cassette and audio stages.', expect: '-4.75 to -5.25 V' }),
+      : { n, name: '-5 V', type: 'power', desc: '-5 V (purple wire): RS423 driver, cassette and audio stages.', expect: '-5 V' }),
```

### H010

src/data/acorn.js @@ -613,11 +614,11 @@ RCS.add({

```diff
-      verifiedAgainst: 'Model B circuit diagram 105,000/C (IC6 pins 1-3, 9-28); BBC Service Manual 6.3 (pins 4-7); Master Series Service Manual 7.1.2 and 7.3.4 (pins 4-8, 9-14); Master PCB diagram supply table (1, 16)',
-      datasheets: [S('Circuit diagram for BBC Microcomputer 105,000/C, IC6 video processor', CD), S('Master Series Service Manual, 7.1.2 and 7.3.4, pp. 32, 39', MSM(32)), S('BeebWiki, Video ULA (pinout, registers; secondary)', BW_VULA, true)],
+      verifiedAgainst: 'Model B circuit diagram 103,000/C (IC6 pins 1-3, 9-28); BBC Service Manual 6.3 (pins 4-7); Master Series Service Manual 7.1.2 and 7.3.4 (pins 4-8, 9-14); Master PCB diagram supply table (1, 16)',
+      datasheets: [S('Circuit diagram for BBC Microcomputer 103,000/C, IC6 video processor', CD), S('Master Series Service Manual, 7.1.2 and 7.3.4, pp. 32, 39', MSM(32)), S('BeebWiki, Video ULA (pinout, registers; secondary)', BW_VULA, true)],
-        { part: 'VLSI VC2069 VIDPROC', kind: 'pin-compatible', note: 'Functionally and physically compatible with the Ferranti 5C094 Video ULA (Acorn part 201,647).', source: S('BeebWiki, Video ULA (5C094, VC 2023, VC 2069)', BW_VULA) },
-        { part: 'VLSI VC2023 VIDPROC', kind: 'pin-compatible', note: 'The first VLSI revision needed a patch wire soldered on the main board. Fit a VC2069 where you can; a board that carries the wire was modified for a VC2023.', source: S('BeebWiki, Video ULA (5C094, VC 2023, VC 2069)', BW_VULA) },
+        { part: 'VLSI VC2069 VIDPROC', kind: 'pin-compatible', verify: true, note: 'Functionally and physically compatible with the Ferranti 5C094 Video ULA (Acorn part 201,647), per BeebWiki. No maker data sheet for either part was found.', source: S('BeebWiki, Video ULA (5C094, VC 2023, VC 2069)', BW_VULA) },
+        { part: 'VLSI VC2023 VIDPROC', kind: 'adapter', verify: true, note: 'The first VLSI revision needed a patch wire soldered on the main board; the source does not say where the wire goes. Fit a VC2069 where you can; a board that carries the wire was modified for a VC2023.', source: S('BeebWiki, Video ULA (5C094, VC 2023, VC 2069)', BW_VULA) },
```

### H011

src/data/acorn.js @@ -628,7 +629,7 @@ RCS.add({

```diff
-        { n: 8, name: '16MHz', type: 'clock', dir: 'in', desc: '16 MHz master clock in from the crystal oscillator (IC43).', terms: ['crystal'], probe: 'About 4 V p-p, 16 MHz. Missing = RAS/CAS stuck and DRAM can overheat; do not run it long.' },
+        { n: 8, name: '16MHz', type: 'clock', dir: 'in', desc: '16 MHz master clock in from the crystal oscillator (IC43 on the Model B).', terms: ['crystal'], probe: 'About 4 V p-p, 16 MHz. Missing = RAS/CAS stuck and DRAM can overheat; do not run it long.' },
```

### H012

src/data/acorn.js @@ -657,11 +658,11 @@ RCS.add({

```diff
-      verifiedAgainst: 'Model B circuit diagram 105,000/C (IC7, all 28 pins); Master Series Service Manual 7.6-7.7 (pins 12, 20, 23, 25, 27); Master PCB supply table (14, 28)',
-      datasheets: [S('Circuit diagram for BBC Microcomputer 105,000/C, IC7 serial interface 2C199', CD), S('Master Series Service Manual, 7.6 and 7.7, pp. 41-43', MSM(41)), S('BeebWiki, Serial ULA (secondary)', BW_SULA, true)],
+      verifiedAgainst: 'Model B circuit diagram 103,000/C (IC7, all 28 pins); Master Series Service Manual 7.6-7.7 (pins 12, 20, 23, 25, 27); Master PCB supply table (14, 28)',
+      datasheets: [S('Circuit diagram for BBC Microcomputer 103,000/C, IC7 serial interface 2C199', CD), S('Master Series Service Manual, 7.6 and 7.7, pp. 41-43', MSM(41)), S('BeebWiki, Serial ULA (secondary)', BW_SULA, true)],
-        { part: 'VLSI VC2026 SERPROC', kind: 'pin-compatible', note: 'Second source for the Ferranti 2C199. Its register bit 3 can swap the cassette tones, so BASICODE 2 (The Chip Shop), Facemaker and Caveman Capers load only on the Ferranti part.', source: S('BeebWiki, Serial ULA (VLSI extension and incompatible tapes)', BW_SULA) },
-        { part: 'Ferranti 2C199E, -3 or -7', kind: 'pin-compatible', note: 'R75 must match the ULA issue: 100K or 56K for 2C199E and 2C199E-3, 82K for 2C199E-7, or tapes load unreliably.', source: S('BBC Microcomputer Service Manual (Oct 1985), 6.4 Most common faults (R75 by serial processor issue), p. 41', SM85P(51)) }
+        { part: 'VLSI VC2026 SERPROC', kind: 'pin-compatible', verify: true, note: 'Second source for the Ferranti 2C199, per BeebWiki; no maker data sheet for either part was found. Its register bit 3 can swap the cassette tones, so BASICODE 2 (The Chip Shop), Facemaker and Caveman Capers load only on the Ferranti part.', source: S('BeebWiki, Serial ULA (VLSI extension and incompatible tapes)', BW_SULA) },
+        { part: 'Ferranti 2C199E, -3 or -7', kind: 'pin-compatible', verify: true, note: 'R75 must match the ULA issue: 100K or 56K for 2C199E and 2C199E-3, 82K for 2C199E-7, or tapes load unreliably. No Ferranti data sheet for the issues was found.', source: S('BBC Microcomputer Service Manual (Oct 1985), 6.4 Most common faults (R75 by serial processor issue), p. 41', SM85P(51)) }
```

### H013

src/data/acorn.js @@ -671,7 +672,7 @@ RCS.add({

```diff
-        { n: 15, name: 'CR', type: 'ctrl', dir: '-', desc: 'Timing RC for carrier detect (R75 to +5 V, C28 to ground).' },
+        { n: 15, name: 'CR', type: 'ctrl', dir: '-', desc: 'Timing RC for carrier detect (Model B: R75 to +5 V, C28 to ground).' },
```

### H014

src/data/acorn.js @@ -693,11 +694,11 @@ RCS.add({

```diff
-      verifiedAgainst: 'Philips SAA5050 data sheet, August 1978 (pinning and application data); Model B circuit diagram 105,000/C (IC5); Master Series Service Manual 7.3.4/7.3.6',
-      datasheets: [S('Philips Semiconductors and ICs Part 6b (1979), SAA5050 data sheet, pinning p. 2', PHIL79), S('Circuit diagram for BBC Microcomputer 105,000/C, IC5', CD)],
+      verifiedAgainst: 'Philips SAA5050 data sheet, August 1978 (pinning and application data); Model B circuit diagram 103,000/C (IC5); Master Series Service Manual 7.3.4/7.3.6',
+      datasheets: [S('Philips Semiconductors and ICs Part 6b (1979), SAA5050 data sheet, pinning p. 2', PHIL79), S('Circuit diagram for BBC Microcomputer 103,000/C, IC5', CD)],
-        { part: 'SAA5053 / SAA5054 / SAA5055', kind: 'pin-compatible', note: 'Later national variants (the SAA5054 is given as Belgian or French depending on the source); the character set differs. No maker data sheet for these was found.', source: S('Wikipedia, Mullard SAA5050, variants (secondary)', WIKI_SAA, true) }
+        { part: 'SAA5053 / SAA5054 / SAA5055', kind: 'pin-compatible', verify: true, note: 'Later national variants (the SAA5054 is given as Belgian or French depending on the source); the character set differs. No maker data sheet for these was found.', source: S('Wikipedia, Mullard SAA5050, variants (secondary)', WIKI_SAA, true) }
```

### H015

src/data/acorn.js @@ -787,7 +788,7 @@ RCS.add({

```diff
-        { part: 'WD1772', kind: 'pin-compatible', note: 'Same pins, but the four step-rate codes give 2, 3, 5 and 6 ms instead of 6, 12, 20 and 30 ms. Software set for a slow 1770 rate steps a 1772 much faster, which old drives can miss.', source: S('Western Digital 1984 Storage Products Handbook, WD1770/1772 stepping rate table, p. 48', WD84P(58)) }
+        { part: 'WD1772', kind: 'pin-compatible', note: 'Same pins, but the four step-rate codes give 2, 3, 5 and 6 ms instead of 6, 12, 20 and 30 ms. Software set for a slow 1770 rate steps a 1772 much faster, which old drives can miss. Commodore 1581: remove jumper J1 when U4 is a WD1772 (installed for a WD1770), per the schematic note (1581 Service Manual, sheet 3 of 4, p. 17).', source: S('Western Digital 1984 Storage Products Handbook, WD1770/1772 stepping rate table, p. 48', WD84P(58)) }
```

### H016

src/data/acorn.js @@ -810,7 +811,7 @@ RCS.add({

```diff
-        { n: 28, name: 'INTRQ', type: 'ctrl', dir: 'out', desc: 'Interrupt request: a high pulse at the end of each command.', terms: ['irq'] }
+        { n: 28, name: 'INTRQ', type: 'ctrl', dir: 'out', desc: 'Interrupt request: set HIGH when a command completes; it stays HIGH until the Status Register is read or a new command is written.', terms: ['irq'] }
```

### H017

src/data/acorn.js @@ -819,7 +820,7 @@ RCS.add({

```diff
-      verifiedAgainst: 'NEC 1982 Microcomputer Catalog, uPD7002 data sheet p. 483 (pin configuration and names); Model B circuit diagram 105,000/C (IC73); Master Series Service Manual 7.5',
+      verifiedAgainst: 'NEC 1982 Microcomputer Catalog, uPD7002 data sheet p. 483 (pin configuration and names); Model B circuit diagram 103,000/C (IC73); Master Series Service Manual 7.5',
```

### H018

src/data/acorn.js @@ -883,8 +884,8 @@ RCS.add({

```diff
-      verifiedAgainst: 'Mostek MK4516 data sheet (1980 Memory Data Book p. V-47), the same single-supply 16-pin pinout; Model B circuit diagram 105,000/C (IC53-68 signal pins)',
-      datasheets: [S('Mostek 1980 Memory Data Book, MK4516 16K x 1 dynamic RAM, p. V-47', MOSTEK80), S('Circuit diagram for BBC Microcomputer 105,000/C, IC53-IC68 4816A-3', CD)],
+      verifiedAgainst: 'Mostek MK4516 data sheet (1980 Memory Data Book p. V-47), the same single-supply 16-pin pinout; Model B circuit diagram 103,000/C (IC53-68 signal pins)',
+      datasheets: [S('Mostek 1980 Memory Data Book, MK4516 16K x 1 dynamic RAM, p. V-47', MOSTEK80), S('Circuit diagram for BBC Microcomputer 103,000/C, IC53-IC68 4816A-3', CD)],
```

### H019

src/data/acorn.js @@ -1247,10 +1248,10 @@ RCS.add({

```diff
-        { name: '1MHzE system 1 MHz (2 MHz divided by a D-type, IC34)', where: '1 MHz bus (PL11) pin 4; VIA pin 25 (IC3, IC69); ACIA pin 14 (IC4); 7002 pin 2 (IC73 X1)', f: '1 MHz', source: S('BBC Microcomputer Service Manual (Oct 1985), 3.1, p. 9', SM85P(19)), note: 'Circuit diagram 105,000/C labels the VIA, ACIA E and uPD7002 X1 inputs 1MHZE. The 7002 XO (pin 1) is not used with this external clock.' },
-        { name: '2MHzE (2 MHz, one cycle masked during 1 MHz accesses)', where: 'SERPROC pin 10 (IC7); ADLC pin 13 (IC89)', f: '2 MHz', source: S('BBC Microcomputer Service Manual (Oct 1985), 3.1: 2 MHzE and the 1 MHz cycle stretch, p. 9', SM85P(19)), note: 'Circuit diagram 105,000/C labels both E inputs 2MHZE.' },
-        { name: 'Sound generator clock', where: 'SN76489 pin 14 (IC18)', f: '4 MHz', source: S('Circuit diagram for BBC Microcomputer 105,000/C: IC18 76489 CLK (pin 14) on 4MHZ', CD) },
-        { name: '1770 disc upgrade clock', where: '1770 pin 18', f: '8 MHz', source: S('Western Digital 1984 Storage Products Handbook, WD1770/1772 data sheet: CLK 8 MHz 50% duty, pp. 43-44', WD84), note: 'Only on a 1770 upgrade board in place of the 8271; the board is not on the 105,000 diagram.' },
+        { name: '1MHzE system 1 MHz (2 MHz divided by a D-type, IC34)', where: '1 MHz bus (PL11) pin 4; VIA pin 25 (IC3, IC69); ACIA pin 14 (IC4); 7002 pin 2 (IC73 X1)', f: '1 MHz', source: S('BBC Microcomputer Service Manual (Oct 1985), 3.1, p. 9', SM85P(19)), note: 'Circuit diagram 103,000/C labels the VIA, ACIA E and uPD7002 X1 inputs 1MHZE. The 7002 XO (pin 1) is not used with this external clock.' },
+        { name: '2MHzE (2 MHz, one cycle masked during 1 MHz accesses)', where: 'SERPROC pin 10 (IC7); ADLC pin 13 (IC89)', f: '2 MHz', source: S('BBC Microcomputer Service Manual (Oct 1985), 3.1: 2 MHzE and the 1 MHz cycle stretch, p. 9', SM85P(19)), note: 'Circuit diagram 103,000/C labels both E inputs 2MHZE.' },
+        { name: 'Sound generator clock', where: 'SN76489 pin 14 (IC18)', f: '4 MHz', source: S('Circuit diagram for BBC Microcomputer 103,000/C: IC18 76489 CLK (pin 14) on 4MHZ', CD) },
+        { name: '1770 disc upgrade clock', where: '1770 pin 18', f: '8 MHz', source: S('Western Digital 1984 Storage Products Handbook, WD1770/1772 data sheet: CLK 8 MHz 50% duty, pp. 43-44', WD84), note: 'Only on a 1770 upgrade board in place of the 8271; the board is not on the 103,000 diagram.' },
```

### H020

src/data/acorn.js @@ -1258,7 +1259,7 @@ RCS.add({

```diff
-      sources: [S('BBC Microcomputer Service Manual, 3.1, 3.3, 3.5, 3.14, 6.3 Fault isolation, 6.4 Most common faults', SM), S('Circuit diagram for BBC Microcomputer 105,000/C', CD), S('BBC Microcomputer Service Manual, October 1985 edition (Acorn part 0433,001), section 1', SM85)]
+      sources: [S('BBC Microcomputer Service Manual, 3.1, 3.3, 3.5, 3.14, 6.3 Fault isolation, 6.4 Most common faults', SM), S('Circuit diagram for BBC Microcomputer 103,000/C', CD), S('Circuit diagram for BBC Microcomputer 103,000/C (goffart.co.uk copy)', CDM), S('BBC Microcomputer Service Manual, October 1985 edition (Acorn part 0433,001), section 1', SM85)]
```

### H021

src/data/acorn.js @@ -1622,7 +1623,8 @@ RCS.add({

```diff
-    { name: 'Circuit diagram for BBC Microcomputer 105,000/C', url: CD, what: 'Full Model B main board schematic, 600 dpi scan (Web Archive copy of regregex.bbcmicro.net).' },
+    { name: 'Circuit diagram for BBC Microcomputer 103,000/C', url: CD, what: 'Full Model B main board schematic, 600 dpi scan (Web Archive copy of regregex.bbcmicro.net).' },
+    { name: 'Circuit diagram for BBC Microcomputer 103,000/C (goffart.co.uk scan)', url: CDM, what: 'Second copy of the Model B schematic; use it when the Web Archive copy returns HTTP 429.' },
```

### H022

src/data/amstrad.js @@ -53,7 +53,7 @@ const expansion = (mid, src) => ({

```diff
-    c(27, '+5 V', 'power', 'Computer +5 V, straight from the monitor supply.', { expect: V5 }),
+    c(27, '+5 V', 'power', 'Computer +5 V, straight from the monitor supply.', { expect: '+5 V DC' }),
```

### H023

src/data/amstrad.js @@ -83,8 +83,8 @@ const printer = (mid, src, extra = '') => ({

```diff
-    ...[19, 20, 21, 22, 23, 24, 25, 26, 28, 33].map(n => c(n, 'GND', 'ground', 'Ground return.', { expect: '0 V' })),
-    ...[10, 12, 13, 15, 17, 27, 29, 30, 31, 32, 34, 35].map(n => c(n, 'NC', 'nc', 'Not connected.'))
+    ...[19, 20, 21, 22, 23, 24, 25, 26, ...(mid === 'cpc664' ? [27] : []), 28, 33].map(n => c(n, 'GND', 'ground', 'Ground return.', { expect: '0 V' })),
+    ...[10, 12, 13, 15, 17, ...(mid === 'cpc664' ? [] : [27]), 29, 30, 31, 32, 34, 35].map(n => c(n, 'NC', 'nc', 'Not connected.'))
```

### H024

src/data/amstrad.js @@ -128,9 +128,9 @@ const fiveV = (mid, src, verify) => Object.assign({

```diff
-  pins: [c(1, '+5 V', 'power', 'Centre pin. Regulated +5 V from the monitor.', { expect: V5 }), c(2, 'GND', 'ground', 'Outer sleeve.', { expect: '0 V' })],
+  pins: [c(1, '+5 V', 'power', 'Centre pin. Regulated +5 V from the monitor.', { expect: '+5 V DC', ...(verify ? { verify: true } : {}) }), c(2, 'GND', 'ground', 'Outer sleeve.', { expect: '0 V', ...(verify ? { verify: true } : {}) })],
-}, verify ? { verify: true } : {});
+}, verify ? { verify: true, summary: 'The only supply input: regulated +5 V from the monitor (GT64/CTM640) or the MP-1 modulator. Nothing in the computer regulates it, so 5.5 V on this pin reaches every chip. Measure the monitor lead unloaded and on load before plugging it in. The 464 sources label the socket +5 V and 0 V but do not say which contact is the centre; centre positive is taken from the 664 and 6128 drawing of the same part (verify).' } : {});
```

### H025

src/data/amstrad.js @@ -211,7 +211,7 @@ RCS.add({

```diff
-    cpc6128: { cpuz80: 'IC111 (Z8400APS)', crtc6845: 'IC108 (HD6845SP)', dram4164: 'IC119-IC126 bank 0, IC127-IC134 bank 1 (HM4864U-2 or MSM3764-20RS)', ppi8255: 'IC107 (M5L8255AP-5)', ay8912: 'IC102', rom23128: 'IC204 (AMSDOS ROM, TMM23128P, Amstrad 40015)' }
+    cpc6128: { cpuz80: 'IC111 (Z8400APS)', crtc6845: 'IC108 (HD6845SP)', dram4164: 'IC127-IC134 bank 0 (first 64K), IC119-IC126 bank 1 (second 64K) (HM4864U-2 or MSM3764-20RS)', ppi8255: 'IC107 (M5L8255AP-5)', ay8912: 'IC102', rom23128: 'IC204 (AMSDOS ROM, TMM23128P, Amstrad 40015)' }
```

### H026

src/data/amstrad.js @@ -223,7 +223,7 @@ RCS.add({

```diff
-        { part: 'Amstrad 40008', kind: 'pin-compatible', note: 'Updated 40007 on the same pinout; it also needs the cooling plate. The 40010 has a rearranged pinout and does not fit a 40007 board.', source: W_GAPIN },
+        { part: 'Amstrad 40008', kind: 'pin-compatible', verify: true, note: 'Updated 40007 on the same pinout, per CPCWiki; it also needs the cooling plate. No Amstrad pin or electrical sheet for the 40008 was found. The 40010 has a rearranged pinout and does not fit a 40007 board.', source: W_GAPIN },
```

### H027

src/data/amstrad.js @@ -317,7 +317,7 @@ RCS.add({

```diff
-      summary: 'Holds the 6128 RAM configuration register: an OUT to &7Fxx with D7 and D6 both HIGH latches D0-D2. It then steers /CAS to bank 0 (IC119-126) or bank 1 (IC127-134) and rewrites A14/A15 for the multiplexers, so a block of the second 64K appears at &4000 or elsewhere. Without it (64K builds) links LK5, LK6 and LK8 are closed. A bad PAL gives a 6128 that works in BASIC but fails CP/M Plus or |BANK commands.',
+      summary: 'Holds the 6128 RAM configuration register: an OUT to &7Fxx with D7 and D6 both HIGH latches D0-D2. It then steers /CAS to bank 0 (IC127-134) or bank 1 (IC119-126) and rewrites A14/A15 for the multiplexers, so a block of the second 64K appears at &4000 or elsewhere. Without it (64K builds) links LK5, LK6 and LK8 are closed. A bad PAL gives a 6128 that works in BASIC but fails CP/M Plus or |BANK commands.',
```

### H028

src/data/amstrad.js @@ -340,8 +340,8 @@ RCS.add({

```diff
-        p(16, '/CAS1', 'ctrl', 'out', 'CAS for bank 1 (IC127-134) through R160, 47 ohms.', { terms: ['ras-cas'] }),
-        p(17, '/CAS0', 'ctrl', 'out', 'CAS for bank 0 (IC119-126) through R161, 47 ohms.', { terms: ['ras-cas'] }),
+        p(16, '/CAS1', 'ctrl', 'out', 'CAS for bank 1, the second 64K (IC119-126), through R160, 47 ohms.', { terms: ['ras-cas'] }),
+        p(17, '/CAS0', 'ctrl', 'out', 'CAS for bank 0, the first 64K (IC127-134), through R161, 47 ohms.', { terms: ['ras-cas'] }),
```

### H029

src/data/amstrad.js @@ -349,15 +349,15 @@ RCS.add({

```diff
-      role: 'OS firmware ($0000-$3FFF lower ROM) and Locomotive BASIC ($C000-$FFFF upper ROM 0) in one 32K chip', pkg: 'DIP-28',
+      role: '32K x 8 mask ROM in the 27256 pinout.', pkg: 'DIP-28',
-      summary: 'Generic pin table; the 23256 is a 27256-pinout mask ROM. Board wiring on the CPC: A14 (pin 27) picks the half: LOW for the OS lower ROM, HIGH for BASIC. The Gate Array /ROMEN drives /CS (pin 20); /OE (pin 22) is held LOW by 2.2K and pulled HIGH by ROMDIS when an expansion ROM takes over. Each model has its own ROM; they are not interchangeable without the matching firmware. A 27256 EPROM fits with pin 1 (VPP) tied to +5 V. Pin table from the CPC6128 schematic.',
+      summary: 'Generic pin table; the 23256 is a 27256-pinout mask ROM. CPC: the OS firmware ($0000-$3FFF lower ROM) and Locomotive BASIC ($C000-$FFFF upper ROM 0) in one 32K chip. How /CS (pin 20), /OE (pin 22) and A14 (pin 27) are driven depends on the board. CPC 464, 664 and 6128 (IC103): the Gate Array /ROMEN drives /CS; /OE is held LOW by 2.2 kΩ (R112 on the 6128) and pulled HIGH by expansion ROMDIS (pin 43) when an expansion ROM takes over. Each model has its own ROM; they are not interchangeable without the matching firmware. A 27256 EPROM needs pin 1 (VPP) at +5 V. Pin table from the CPC6128 schematic.',
-        { part: '27256 / 27C256 EPROM', kind: 'pin-compatible', note: 'Same pinout, but pin 1 is VPP and must sit at VCC in read mode (VCC - 0.7 V to VCC); the CPC leaves pin 1 unconnected, so tie it to +5 V. Burn the image for that model: 464, 664 and 6128 firmware differ.', source: MC27C256 }
+        { part: '27256 / 27C256 EPROM', kind: 'adapter', verify: true, note: 'Same pinout except pin 1, which is VPP on the EPROM and must sit at VCC in read mode (VCC - 0.7 V to VCC). Rework: where the board leaves pin 1 open (the CPC), bend pin 1 out of the socket and wire it to +5 V (pin 28). Burn the image for that model: 464, 664 and 6128 firmware differ. No 23256 mask-ROM data sheet was found to compare the other pins.', source: MC27C256 }
```

### H030

src/data/amstrad.js @@ -368,12 +368,12 @@ RCS.add({

```diff
-        p(20, '/CS', 'ctrl', 'in', 'Chip select from Gate Array /ROMEN.', { terms: ['cs'], probe: 'Pulses LOW on ROM reads' }),
+        p(20, '/CS', 'ctrl', 'in', 'Chip select. Active LOW.', { terms: ['cs'], probe: 'Pulses LOW on ROM reads' }),
-        p(22, '/OE', 'ctrl', 'in', 'Output enable: 2.2K (R112) to 0 V, HIGH from expansion ROMDIS (pin 43).', { probe: 'LOW while the ROM is selected' }),
+        p(22, '/OE', 'ctrl', 'in', 'Output enable. Active LOW: the outputs drive the bus only while /CS and /OE are both LOW.'),
-        p(27, 'A14', 'addr', 'in', 'Address bit 14: LOW selects the OS half, HIGH the BASIC half.'),
+        p(27, 'A14', 'addr', 'in', 'Address bit 14.'),
```

### H031

src/data/amstrad.js @@ -386,8 +386,8 @@ RCS.add({

```diff
-        { part: 'Intel 8272A / UMC UM8272A', kind: 'pin-compatible', note: 'The 8272 is the same design as the uPD765 under a cross-licence; UMC UM8272A parts were fitted in CPCs. Timings scale with the clock: the CPC runs any of them at 4 MHz.', source: W_FDC },
-        { part: 'NEC uPD765AC-2 / Zilog Z765A', kind: 'pin-compatible', note: 'Other makers\' 765s found on CPC boards; all should behave almost identically.', source: W_FDC }
+        { part: 'Intel 8272A / UMC UM8272A', kind: 'pin-compatible', verify: true, note: 'The 8272 is the same design as the uPD765 under a cross-licence; the NEC and Intel DIP-40 pin maps agree. UMC UM8272A parts were fitted in CPCs, but no UMC data sheet was found. Timings scale with the clock: the CPC runs any of them at 4 MHz.', source: W_FDC },
+        { part: 'NEC uPD765AC-2 / Zilog Z765A', kind: 'pin-compatible', verify: true, note: 'Other makers\' 765s found on CPC boards, per CPCWiki. Their own data sheets were not found to compare electrical limits.', source: W_FDC }
```

### H032

src/data/amstrad.js @@ -448,8 +448,8 @@ RCS.add({

```diff
-      { symptom: 'BASIC works, CP/M Plus or |BANK commands fail', suspects: ['pal40030', 'dram4164'], note: 'The second 64K (IC127-134) or the 40030 PAL. Check /CAS1 at 40030 pin 16 pulses after a bank switch.' },
-      { symptom: 'Garbage screen, no sign-on', suspects: ['dram4164', 'pal40030', 'ga40010'], note: 'Bank 0 (IC119-126) holds the screen and BASIC. Check /CAS0 at 40030 pin 17 and /RAS from the Gate Array.' },
+      { symptom: 'BASIC works, CP/M Plus or |BANK commands fail', suspects: ['pal40030', 'dram4164'], note: 'The second 64K (IC119-126) or the 40030 PAL. Check /CAS1 at 40030 pin 16 pulses after a bank switch.' },
+      { symptom: 'Garbage screen, no sign-on', suspects: ['dram4164', 'pal40030', 'ga40010'], note: 'Bank 0 (IC127-134) holds the screen and BASIC. Check /CAS0 at 40030 pin 17 and /RAS from the Gate Array.' },
```

### H033

src/data/amstrad.js @@ -461,13 +461,13 @@ RCS.add({

```diff
-      printer('cpc464', [...S464, um6128('ch. 7 part 9, Printer Port drawing, p. 41', 351)], ' The 464 transcribed manual lists pins 18 and 27 as GND and omits 16; the 6128 and 664 originals list 16 and not 27.'),
+      printer('cpc464', [...S464, um6128('ch. 7 part 9, Printer Port drawing, p. 41', 351)], ' The 464 transcribed manual lists pins 18 and 27 as GND and omits 16; the 6128 original lists 16 and not 27, and the 664 original lists both.'),
-      monitor('cpc664', S664), joystick('cpc664', S664), expansion('cpc664', S664), printer('cpc664', S664),
+      monitor('cpc664', S664), joystick('cpc664', S664), expansion('cpc664', S664), printer('cpc664', S664, ' The 664 manual lists pin 27 as GND (the 6128 manual leaves it out, so NC there).'),
```

### H034

src/data/apple.js @@ -360,17 +360,17 @@ const ribbonPins = (side) => {

```diff
-    { n: 9, name: '-12 V', type: 'power', desc: '-12 V from slot pin 33 (analog card C5, comparator offset pot R28).', expect: '-11 to -13 V' },
+    { n: 9, name: '-12 V', type: 'power', desc: '-12 V from slot pin 33 (analog card C5, comparator offset pot R28).', expect: '-12 V' },
-    { n: 11, name: '+5 V', type: 'power', desc: '+5 V logic supply from slot pin 25 (analog card C4, MC3470, 74LS125).', expect: '+4.75 to +5.25 V' },
-    { n: 12, name: '+5 V', type: 'power', desc: '+5 V, paralleled with pin 11.', expect: '+4.75 to +5.25 V' },
-    { n: 13, name: '+12 V', type: 'power', desc: '+12 V from slot pin 50: spindle motor, stepper, MC3470 and write driver.', expect: '+11.3 to +12.5 V' },
+    { n: 11, name: '+5 V', type: 'power', desc: '+5 V logic supply from slot pin 25 (analog card C4, MC3470, 74LS125).', expect: '+5 V' },
+    { n: 12, name: '+5 V', type: 'power', desc: '+5 V, paralleled with pin 11.', expect: '+5 V' },
+    { n: 13, name: '+12 V', type: 'power', desc: '+12 V from slot pin 50: spindle motor, stepper, MC3470 and write driver.', expect: '+12 V' },
-    { n: 15, name: '+12 V', type: 'power', desc: '+12 V, paralleled with pin 13.', expect: '+11.3 to +12.5 V' },
+    { n: 15, name: '+12 V', type: 'power', desc: '+12 V, paralleled with pin 13.', expect: '+12 V' },
-    { n: 17, name: '+12 V', type: 'power', desc: '+12 V, paralleled with pin 13.', expect: '+11.3 to +12.5 V' },
+    { n: 17, name: '+12 V', type: 'power', desc: '+12 V, paralleled with pin 13.', expect: '+12 V' },
-    { n: 19, name: '+12 V', type: 'power', desc: '+12 V, paralleled with pin 13.', expect: '+11.3 to +12.5 V' },
+    { n: 19, name: '+12 V', type: 'power', desc: '+12 V, paralleled with pin 13.', expect: '+12 V' },
```

### H035

src/data/apple.js @@ -439,7 +439,7 @@ const driveChips = {

```diff
-    { part: 'ECG3470', kind: 'pin-compatible', note: 'The cross Sams gives for the MC3470P. Apple\'s own number is 355-3470; it sits in a socket at B1.', source: S_CD6_PARTS },
+    { part: 'ECG3470', kind: 'pin-compatible', verify: true, note: 'The cross Sams gives for the MC3470P; no ECG3470 data sheet seen. Apple\'s own number is 355-3470; it sits in a socket at B1.', source: S_CD6_PARTS },
```

### H036

src/data/apple.js @@ -511,7 +511,7 @@ const driveChips = {

```diff
-    { part: 'RCA SK3697', kind: 'pin-compatible', note: 'The cross Sams gives for the CA3146E.', source: S_CD6_PARTS },
+    { part: 'RCA SK3697', kind: 'pin-compatible', verify: true, note: 'The cross Sams gives for the CA3146E; no SK3697 data sheet seen.', source: S_CD6_PARTS },
```

### H037

src/data/apple.js @@ -644,7 +644,7 @@ const driveChips = {

```diff
-    { part: '9334 or 74259', kind: 'pin-compatible', note: 'Fitted on many Disk II cards in place of the 74LS259; Sams lists an N9334N latch on the IIe\'s Disk II card.', source: S_CC10_PARTS1 },
+    { part: '9334 or 74259', kind: 'pin-compatible', verify: true, note: 'Fitted on many Disk II cards in place of the 74LS259 (9334 and 74259 data sheets not seen); Sams lists an N9334N latch on the IIe\'s Disk II card.', source: S_CC10_PARTS1 },
```

### H038

src/data/apple.js @@ -744,10 +744,10 @@ const d2CardHdr = {

```diff
-  id: 'disk2-mech', name: 'Analog card edge to the mechanism (motor, stepper, LED, write protect)', kind: '14-position double-sided card edge on the analog card (the "motor plug" pushes on)', geo: 'edge-14x14-cbm', keys: [],
+  id: 'disk2-mech', name: 'Analog card edge to the mechanism (motor, stepper, LED, write protect)', kind: '14-position double-sided card edge on the analog card (the "motor plug" pushes on)', geo: 'edge-14x14-cbm', keys: [], rowA: 'bottom',
-  verifiedAgainst: 'Apple schematic 050-0007-H, Disk II Analog Board, edge-connector block',
-  summary: 'The harness from the mechanism (stepper coils, motor speed card, IN USE LED, write-protect switch) pushes onto these fingers at the rear of the analog card; Sams calls it J2. Stepper coils sit between gated +12 V (10-12) and the ULN2003 outputs on M, N, P, R. The pin assignments are from the schematic; which side carries numbers and which letters is not stated there (the photo shows A at the left end of the component side), so the drawing is unchecked. The read/write head has its own 4-wire plug at the front (erase, two R/W ends, centre tap); no pin numbers are given for it.',
+  verifiedAgainst: 'Apple schematic 050-0007-H, Disk II Analog Board, edge-connector block; A2DP analog card photo',
+  summary: 'The harness from the mechanism (stepper coils, motor speed card, IN USE LED, write-protect switch) pushes onto these fingers at the rear of the analog card; Sams calls it J2. Stepper coils sit between gated +12 V (10-12) and the ULN2003 outputs on M, N, P, R. The pin assignments are from the schematic. The card photo shows the lettered fingers on the component side with A at the left (edge toward you, components up), so the drawing puts A-R on top and 1-14 on the solder side below, 1 under A. The read/write head has its own 4-wire plug at the front (erase, two R/W ends, centre tap); no pin numbers are given for it.',
```

### H039

src/data/apple.js @@ -782,10 +782,10 @@ const ctrlDb19 = (iic) => [

```diff
-  { n: 5, name: '-12 V', type: 'power', desc: '-12 V (DB-25 pin 23; bracketed in Apple\'s table).', expect: '-11 to -13 V' },
-  { n: 6, name: '+5 V', type: 'power', desc: '+5 V (DB-25 pin 7).', expect: '+4.75 to +5.25 V' },
-  { n: 7, name: '+12 V', type: 'power', desc: '+12 V (DB-25 pin 19).', expect: '+11.3 to +12.5 V' },
-  { n: 8, name: '+12 V', type: 'power', desc: '+12 V (DB-25 pin 20).', expect: '+11.3 to +12.5 V' },
+  { n: 5, name: '-12 V', type: 'power', desc: '-12 V (DB-25 pin 23; bracketed in Apple\'s table).', expect: '-12 V' },
+  { n: 6, name: '+5 V', type: 'power', desc: '+5 V (DB-25 pin 7).', expect: '+5 V' },
+  { n: 7, name: '+12 V', type: 'power', desc: '+12 V (DB-25 pin 19).', expect: iic ? '+12 V (IIc supply: ±10 %, 10.8 to 13.2 V)' : '+12 V' },
+  { n: 8, name: '+12 V', type: 'power', desc: '+12 V (DB-25 pin 20).', expect: iic ? '+12 V (IIc supply: ±10 %, 10.8 to 13.2 V)' : '+12 V' },
```

### H040

src/data/apple.js @@ -793,7 +793,7 @@ const ctrlDb19 = (iic) => [

```diff
-  { n: 16, name: '+5 V', type: 'power', desc: `+5 V (DB-25 pin 24).${iic ? ' Not connected on a IIc external port (IIc TRM Table 11-18).' : ''}`, expect: '+4.75 to +5.25 V on a controller card' },
+  { n: 16, name: '+5 V', type: 'power', desc: `+5 V (DB-25 pin 24).${iic ? ' Not connected on a IIc external port (IIc TRM Table 11-18).' : ''}`, expect: '+5 V on a controller card' },
```

### H041

src/data/apple.js @@ -806,7 +806,7 @@ const duoDb25Pins = [

```diff
-  { n: 7, name: '+5 V', type: 'power', desc: '+5 V (DB-19 pin 6).', expect: '+4.75 to +5.25 V' },
+  { n: 7, name: '+5 V', type: 'power', desc: '+5 V (DB-19 pin 6).', expect: '+5 V' },
```

### H042

src/data/apple.js @@ -818,12 +818,12 @@ const duoDb25Pins = [

```diff
-  { n: 19, name: '+12 V', type: 'power', desc: '+12 V (DB-19 pin 7).', expect: '+11.3 to +12.5 V' },
-  { n: 20, name: '+12 V', type: 'power', desc: '+12 V (DB-19 pin 8; Apple\'s table prints "12 volts").', expect: '+11.3 to +12.5 V' },
+  { n: 19, name: '+12 V', type: 'power', desc: '+12 V (DB-19 pin 7).', expect: '+12 V' },
+  { n: 20, name: '+12 V', type: 'power', desc: '+12 V (DB-19 pin 8; Apple\'s table prints "12 volts").', expect: '+12 V' },
-  { n: 23, name: '-12 V', type: 'power', desc: '-12 V (DB-19 pin 5).', expect: '-11 to -13 V' },
-  { n: 24, name: '+5 V', type: 'power', desc: '+5 V (DB-19 pin 16).', expect: '+4.75 to +5.25 V' },
+  { n: 23, name: '-12 V', type: 'power', desc: '-12 V (DB-19 pin 5).', expect: '-12 V' },
+  { n: 24, name: '+5 V', type: 'power', desc: '+5 V (DB-19 pin 16).', expect: '+5 V' },
```

### H043

src/data/apple.js @@ -848,7 +848,7 @@ const driveConnectors = {

```diff
-      sources: [DUOCABLE_SRC, { label: 'Apple IIc Technical Reference Manual, disk drive connector, Figure 11-26 / Table 11-18, p. 274', url: IIC(301) }, { label: 'UniDisk Owner\'s Manual, connecting a second UniDisk (daisy chain)', url: UNIMAN(13) }, { label: 'A2DP photo: UniDisk 5.25 back (daisy-chain DB-19 socket, captive cable)', url: UNIBACK }] },
+      sources: [DUOCABLE_SRC, { label: 'Apple IIc Technical Reference Manual, Table 11-4 internal converter (+12 V ±10 %), p. 234', url: IIC(261) },{ label: 'Apple IIc Technical Reference Manual, disk drive connector, Figure 11-26 / Table 11-18, p. 274', url: IIC(301) }, { label: 'UniDisk Owner\'s Manual, connecting a second UniDisk (daisy chain)', url: UNIMAN(13) }, { label: 'A2DP photo: UniDisk 5.25 back (daisy-chain DB-19 socket, captive cable)', url: UNIBACK }] },
```

### H044

src/data/apple.js @@ -1013,7 +1013,7 @@ const d2Power = {

```diff
-    { rail: '-12 V', expect: '-11 to -13 V (Sams: -12.0 V at C5 -)', where: 'disk2-ribbon pin 9; C5', note: 'Comparator offset network (R28).' },
+    { rail: '-12 V', expect: '-12 V (Sams: -12.0 V at C5 -)', where: 'disk2-ribbon pin 9; C5', note: 'Comparator offset network (R28).' },
```

### H045

src/data/apple.js @@ -1045,7 +1045,7 @@ const d2Power = {

```diff
-    { step: 2, check: 'Rails on the ribbon', where: 'disk2-ribbon pins 11, 12 (+5 V); disk2-ribbon pins 13, 15, 17, 19 (+12 V); disk2-ribbon pin 9 (-12 V)', expect: '+4.75 to +5.25 V; +11.3 to +12.5 V; -11 to -13 V',
+    { step: 2, check: 'Rails on the ribbon', where: 'disk2-ribbon pins 11, 12 (+5 V); disk2-ribbon pins 13, 15, 17, 19 (+12 V); disk2-ribbon pin 9 (-12 V)', expect: '+5 V; +12 V; -12 V',
```

### H046

src/data/apple.js @@ -1069,7 +1069,7 @@ const d2Power = {

```diff
-  { rail: '-12 V', expect: '-11 to -13 V', where: 'uni-db19 pin 5', note: iic ? 'IIc: 100 mA max.' : 'From slot pin 33. The UniDisk 5.25 needs it; the later Apple 5.25 Drive does not.' },
+  { rail: '-12 V', expect: '-12 V', where: 'uni-db19 pin 5', note: iic ? 'IIc: 100 mA max.' : 'From slot pin 33. The UniDisk 5.25 needs it; the later Apple 5.25 Drive does not.' },
```

### H047

src/data/apple.js @@ -1090,7 +1090,7 @@ const drivePower = {

```diff
-      { rail: '-12 V', expect: '-11 to -13 V', where: 'duo-db25 pin 23 (duo-db19 pin 5)', note: 'From slot pin 33.' },
+      { rail: '-12 V', expect: '-12 V', where: 'duo-db25 pin 23 (duo-db19 pin 5)', note: 'From slot pin 33.' },
```

### H048

src/data/apple.js @@ -1101,7 +1101,7 @@ const drivePower = {

```diff
-      { step: 2, check: 'Rails at the drive', where: 'duo-db25 pins 7, 24 (+5 V); duo-db25 pins 19, 20 (+12 V); duo-db25 pin 23 (-12 V)', expect: '+4.75 to +5.25 V; +11.3 to +12.5 V; -11 to -13 V',
+      { step: 2, check: 'Rails at the drive', where: 'duo-db25 pins 7, 24 (+5 V); duo-db25 pins 19, 20 (+12 V); duo-db25 pin 23 (-12 V)', expect: '+5 V; +12 V; -12 V',
```

### H049

src/data/apple.js @@ -1145,7 +1145,7 @@ const drivePower = {

```diff
-      { step: 1, check: 'Port or card power', where: 'uni-db19 pin 6 (+5 V); uni-db19 pins 7, 8 (+12 V); uni-db19 pin 5 (-12 V)', expect: '+4.75 to +5.25 V; +10.8 to +13.2 V on a IIc (+11.3 to +12.5 V on a card); -11 to -13 V',
+      { step: 1, check: 'Port or card power', where: 'uni-db19 pin 6 (+5 V); uni-db19 pins 7, 8 (+12 V); uni-db19 pin 5 (-12 V)', expect: '+5 V; +12 V (10.8 to 13.2 V on a IIc: ±10 %, IIc TRM Table 11-4); -12 V',
```

### H050

src/data/apple.js @@ -1238,7 +1238,7 @@ RCS.add({

```diff
-        { part: '65C02 (Rockwell, NCR or GTE, as in the Enhanced IIe)', kind: 'pin-compatible', note: 'On a IIe fit it only with the enhanced ROM set (342-0303 EF, 342-0304 CD, 342-0265 video); Apple calls any other mix of CPU and ROMs not acceptable.', source: { label: 'Apple IIe logic board identification, enhanced and unenhanced ROM sets, p. 1.2.2 (Apple page bound into the Sams CC10 scan)', url: SAMS2E(4), sams: true } },
+        { part: '65C02 (Rockwell, NCR or GTE, as in the Enhanced IIe)', kind: 'pin-compatible', verify: true, note: 'Documented for the IIe only; no 65C02 pin table seen for the other machines. On a IIe fit it only with the enhanced ROM set (342-0303 EF, 342-0304 CD, 342-0265 video); Apple calls any other mix of CPU and ROMs not acceptable.', source: { label: 'Apple IIe logic board identification, enhanced and unenhanced ROM sets, p. 1.2.2 (Apple page bound into the Sams CC10 scan)', url: SAMS2E(4), sams: true } },
```

### H051

src/data/apple.js @@ -1266,7 +1266,7 @@ RCS.add({

```diff
-        { n: 8, name: 'Vcc', type: 'power', dir: '-', desc: '+5 V.', terms: ['vcc'], probe: '+5 V' },
+        { n: 8, name: 'Vss', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'], probe: '0 V' },
```

### H052

src/data/apple.js @@ -1325,6 +1325,7 @@ RCS.add({

```diff
+        { label: 'Understanding the Apple IIe (Sather), p. 7-2: CXXX is the overall $C000-$CFFF I/O enable signal', url: 'https://archive.org/details/Understanding_the_Apple_IIe/page/n169' },
```

### H053

src/data/apple.js @@ -1350,7 +1351,7 @@ RCS.add({

```diff
-        { n: 24, name: 'Cxxx', type: 'ctrl', dir: 'out', desc: 'Enables peripheral-card memory ($C100-$CFFF slot ROM space).' },
+        { n: 24, name: 'Cxxx', type: 'ctrl', dir: 'out', desc: 'Enables the $C000-$CFFF I/O and peripheral decoding (built-in I/O at $C0xx and card space), subject to the ROM-select soft switches that take over parts of $C100-$CFFF.' },
```

### H054

src/data/apple.js @@ -1392,6 +1393,7 @@ RCS.add({

```diff
+        { label: 'Understanding the Apple IIe (Sather), p. 4-2: the IOU pulls RESET low at power-on', url: 'https://archive.org/details/Understanding_the_Apple_IIe/page/n75' },
```

### H055

src/data/apple.js @@ -1408,7 +1410,7 @@ RCS.add({

```diff
-        { n: 15, name: '/RESET', type: 'ctrl', dir: 'bidir', desc: 'Power-on and reset output (open drain). The IOU holds it LOW at power-up.', terms: ['reset', 'open-drain'], activeLow: true, probe: 'HIGH when running.' },
+        { n: 15, name: '/RESET', type: 'ctrl', dir: 'bidir', desc: 'Power-on reset: the IOU holds it LOW at power-up and also responds to RESET (Sather p. 4-2).', terms: ['reset'], activeLow: true, probe: 'HIGH when running.' },
```

### H056

src/data/apple.js @@ -1454,11 +1456,11 @@ RCS.add({

```diff
-        { n: 1, name: 'Option 1', type: 'ctrl', dir: 'in', desc: 'Option pin: function set by mask (external clock, lockout/rollover, complement, chip enable, any-key-down or B10).' },
-        { n: 2, name: 'Option 2', type: 'ctrl', dir: 'in', desc: 'Option pin: function set by mask (external clock, lockout/rollover, complement, chip enable, any-key-down or B10).' },
-        { n: 3, name: 'Option 3', type: 'ctrl', dir: 'in', desc: 'Option pin: function set by mask (external clock, lockout/rollover, complement, chip enable, any-key-down or B10).' },
-        { n: 4, name: 'Option 4', type: 'ctrl', dir: 'in', desc: 'Option pin: function set by mask (external clock, lockout/rollover, complement, chip enable, any-key-down or B10).' },
-        { n: 5, name: 'Option 5', type: 'ctrl', dir: 'in', desc: 'Option pin: function set by mask (external clock, lockout/rollover, complement, chip enable, any-key-down or B10).' },
+        { n: 1, name: 'Option 1', type: 'ctrl', dir: 'in', desc: 'Option pin (mask, data sheet p. 3-24): external clock input, or one of the three RC pins (1-3) of the internal oscillator.' },
+        { n: 2, name: 'Option 2', type: 'ctrl', dir: 'in', desc: 'Option pin (mask, data sheet p. 3-24): LO/RO (lockout or rollover select) or CC (complement control) input with an external clock; one of the RC oscillator pins (1-3) with the internal oscillator.' },
+        { n: 3, name: 'Option 3', type: 'ctrl', dir: 'in', desc: 'Option pin (mask, data sheet p. 3-24): CC (complement control) or CE (chip enable) input with an external clock; one of the RC oscillator pins (1-3) with the internal oscillator.' },
+        { n: 4, name: 'Option 4', type: 'ctrl', dir: 'bidir', desc: 'Option pin (mask, data sheet p. 3-24): CE input or AKO (any-key output) with an external clock; LO/RO, CC, CE or AKO with the internal oscillator. Input or output depending on the mask option.' },
+        { n: 5, name: 'Option 5', type: 'ctrl', dir: 'bidir', desc: 'Option pin (mask, data sheet p. 3-24): AKO (any-key output) or B10 (data output) with an external clock; CC, CE, AKO or B10 with the internal oscillator. Input or output depending on the mask option.' },
```

### H057

src/data/apple.js @@ -1502,10 +1504,10 @@ RCS.add({

```diff
-      role: 'Monitor, Integer BASIC and Applesoft ROMs',
+      role: '2K x 8 mask ROM: Apple II monitor and BASIC ROMs; TRS-80 ROM C and character generator',
-      summary: 'Six 24-pin sockets cover $D000-$FFFF with 2 KB mask ROMs, drawn in the manual as 9316B. /CS1 and /CS3 are active LOW and select the block; CS2 is active HIGH and follows /INH, so a card can disable every ROM. A 2716 EPROM has /CE, /OE and Vpp on pins 18, 20 and 21 with other polarities, so it needs an adapter or rewiring.',
+      summary: '24-pin 2 KB mask ROM with three chip selects (pins 18, 20, 21) whose polarity is set by the mask, so it depends on the part. Board wiring, by machine: Apple II and II Plus: six sockets cover $D000-$FFFF (drawn as 9316B); /CS1 (20) and /CS3 (21) are active LOW, tied together and driven by the 74LS138 at F12, one output per 2 KB block; CS2 (18) is active HIGH and follows the slot /INH line, so a card pulling /INH LOW turns every ROM off. TRS-80 Model III: ROM C (U106) has pin 18 grounded, pin 21 tied to +5 V and pin 20 driven by /ROMC (Technical Reference Fig. 6, p. 33). A 2716 EPROM has /CE, /OE and Vpp on pins 18, 20 and 21 with other polarities, so it needs an adapter or rewiring.',
```

### H058

src/data/apple.js @@ -1515,6 +1517,7 @@ RCS.add({

```diff
+        { label: 'TRS-80 Model III Technical Reference Manual, Figure 6 CPU schematic (U106 ROM C: pin 18 GND, 21 +5 V, 20 /ROMC), p. 33', url: 'https://archive.org/download/Model_III_Technical_Reference_Manual_1981_Tandy/Model_III_Technical_Reference_Manual_1981_Tandy.pdf#page=44' },
```

### H059

src/data/apple.js @@ -1534,10 +1537,10 @@ RCS.add({

```diff
-        { n: 18, name: 'CS2', type: 'ctrl', dir: 'in', desc: 'Chip select, active HIGH. Common to all six ROMs and tied to the slot /INH line, so a card pulling /INH LOW turns every ROM off. (2716: /CE.)', probe: 'HIGH unless a card asserts /INH' },
+        { n: 18, name: 'CS2', type: 'ctrl', dir: 'in', desc: 'Chip select; polarity set by the mask (board wiring in the summary). (2716: /CE.)' },
-        { n: 20, name: '/CS1', type: 'ctrl', dir: 'in', desc: 'Chip select, active LOW. Tied to /CS3 and driven by the 74LS138 at F12, one output per 2 KB block. (2716: /OE.)', probe: 'Pulses LOW when the CPU reads this ROM block', activeLow: true },
-        { n: 21, name: '/CS3', type: 'ctrl', dir: 'in', desc: 'Chip select, active LOW, tied to /CS1. (2716: Vpp, +5 V in read mode.)', probe: 'Same pulses as pin 20', activeLow: true },
+        { n: 20, name: 'CS1', type: 'ctrl', dir: 'in', desc: 'Chip select; polarity set by the mask (board wiring in the summary). (2716: /OE.)', probe: 'Pulses when the CPU reads this ROM' },
+        { n: 21, name: 'CS3', type: 'ctrl', dir: 'in', desc: 'Chip select; polarity set by the mask (board wiring in the summary). (2716: Vpp, +5 V in read mode.)' },
```

### H060

src/data/apple.js @@ -1836,7 +1839,7 @@ RCS.add({

```diff
-        { n: 14, name: 'MD7', type: 'data', dir: 'bidir', desc: 'Status of MMU flags on data bit 7.' },
+        { n: 14, name: 'MD7', type: 'data', dir: 'bidir', desc: 'Status of MMU flags on data bit 7.', verify: true },
```

### H061

src/data/apple.js @@ -1988,8 +1991,9 @@ RCS.add({

```diff
+        verify: true,
-        summary: 'Takes the 80-column / extended 80-column card. Carries most of the internal video and RAM-timing signals, so it is the best probe point on the board. The TRM gives pin numbers only; the drawing assumes 1-30 on one side and 31-60 on the other, like the slots.',
+        summary: 'Takes the 80-column / extended 80-column card. Carries most of the internal video and RAM-timing signals, so it is the best probe point on the board. The TRM gives pin numbers only, not which side or end they start from; the drawing assumes 1-30 on one side and 31-60 on the other, like the slots, and is not checked.',
```

### H062

src/data/atari.js @@ -85,12 +85,12 @@ const antic = [

```diff
-  { n: 14, name: 'R/W', type: 'ctrl', dir: 'bidir', desc: 'Read or write.', terms: ['rw'] },
+  { n: 14, name: 'R/W', type: 'ctrl', dir: 'bidir', desc: 'Read or write. Direction not stated in the cited pin figures.', terms: ['rw'], verify: true },
-  { n: 19, name: 'A14', type: 'addr', dir: 'bidir', desc: 'Address bus bit 14.' },
+  { n: 19, name: 'A14', type: 'addr', dir: 'bidir', desc: 'Address bus bit 14. Direction not stated in the cited pin figures.', verify: true },
```

### H063

src/data/atari.js @@ -238,10 +238,10 @@ const chipsAtari = {

```diff
-      { part: 'CO12296 (400/800/1200XL) or CO21697 (600XL/800XL/XE), NTSC', kind: 'pin-compatible',
+      { part: 'CO12296 (400/800/1200XL) or CO21697 (600XL/800XL/XE), NTSC', kind: 'pin-compatible', verify: true,
-      { part: 'CO14887 (400/800) or CO21698 (XL/XE), PAL and SECAM', kind: 'pin-compatible',
+      { part: 'CO14887 (400/800) or CO21698 (XL/XE), PAL and SECAM', kind: 'pin-compatible', verify: true,
```

### H064

src/data/atari.js @@ -261,10 +261,10 @@ const chipsAtari = {

```diff
-      { part: 'CO14805 GTIA (NTSC) for a CO12295 CTIA', kind: 'pin-compatible',
+      { part: 'CO14805 GTIA (NTSC) for a CO12295 CTIA', kind: 'pin-compatible', verify: true,
-      { part: 'CO14889 GTIA (PAL), CO20120 FGTIA (SECAM)', kind: 'pin-compatible',
+      { part: 'CO14889 GTIA (PAL), CO20120 FGTIA (SECAM)', kind: 'pin-compatible', verify: true,
```

### H065

src/data/atari.js @@ -283,7 +283,7 @@ const chipsAtari = {

```diff
-      { part: 'C012294 with any maker suffix (-01 AMI, -03 Signetics, -19 National, -22 OKI, -31 IMP)', kind: 'pin-compatible',
+      { part: 'C012294 with any maker suffix (-01 AMI, -03 Signetics, -19 National, -22 OKI, -31 IMP)', kind: 'pin-compatible', verify: true,
```

### H066

src/data/atari.js @@ -312,7 +312,7 @@ const chipsAtari = {

```diff
-      { part: 'CO61991 or CO61922 FREDDIE from another XE or late 800XL', kind: 'pin-compatible',
+      { part: 'CO61991 or CO61922 FREDDIE from another XE or late 800XL', kind: 'pin-compatible', verify: true,
```

### H067

src/data/atari.js @@ -378,7 +378,7 @@ const controller = (port, sources, extra = {}) => {

```diff
-      { n: 7, name: '+5 V', type: 'power', desc: '+5 V for the controller, 50 mA.', expect: '+4.9 to +5.0 V (Sams 130XE: 4.9 V)' },
+      { n: 7, name: '+5 V', type: 'power', desc: '+5 V for the controller, 50 mA.', expect: '+5 V (Sams measured 4.9 V on a 130XE)' },
```

### H068

src/data/atari.js @@ -452,10 +452,10 @@ const CART_SUMMARY_XL = 'The cartridge bus, 15/30 edge at 0.1 in. Contacts 1-15

```diff
-  summary: `9 V AC from the external transformer. The schematics show a two-contact jack (${j}) feeding the bridge rectifier through the power switch and the cartridge-door interlock. It is AC, so the two contacts have no polarity. The physical plug size is not in the manual; check it against your adapter. This is not a DIN socket.`,
+  summary: `9 V AC from the external transformer. The schematics show a two-contact jack (${j}) feeding the bridge rectifier through the power switch and the cartridge-door interlock. It is AC, so the two contacts have no polarity. The manual draws no physical view, so which contact is centre and which is sleeve is not sourced; the physical plug size is not in the manual either; check it against your adapter. This is not a DIN socket.`,
-    { n: 1, name: '9 V AC', type: 'power', desc: 'One leg of the 9 V AC winding (centre contact).', expect: '9-11 V AC between the two contacts with the console on' },
-    { n: 2, name: '9 V AC', type: 'power', desc: 'Other leg of the 9 V AC winding (sleeve).', expect: '9-11 V AC between the two contacts' },
+    { n: 1, name: '9 V AC', type: 'power', desc: 'One leg of the 9 V AC winding (centre contact).', expect: '9 V AC between the two contacts' },
+    { n: 2, name: '9 V AC', type: 'power', desc: 'Other leg of the 9 V AC winding (sleeve).', expect: '9 V AC between the two contacts' },
```

### H069

src/data/atari.js @@ -964,20 +964,20 @@ const xeQuickref = {

```diff
-const FSM_SIO = [S.trn(131, 'OS Manual Fig. 9-4, Serial Bus Connector, p. 145'), S.trn(537, 'Hardware Manual App. C, Serial I/O Jack, p. C-1'), S.fsm(51, 'Fig. 2-8, 800 power supply schematic, peripheral jack J204'), S.faq('SIO')];
-const XL_SIO = [S.xl(20, 'Fig. 1-9, SIO connector pin assignments, p. 1-12'), S.trn(131, 'OS Manual Fig. 9-4, Serial Bus Connector, p. 145'), S.faq('SIO')];
-const X6_SIO = [S.x6(22, 'Fig. 1-9, SIO connector pin assignments, p. 1-12'), S.trn(131, 'OS Manual Fig. 9-4, Serial Bus Connector, p. 145'), S.faq('SIO')];
+const FSM_SIO = [S.trn(131, 'OS Manual Fig. 9-4, Serial Bus Connector, p. 146'), S.trn(537, 'Hardware Manual App. C, Serial I/O Jack, p. C-1'), S.fsm(51, 'Fig. 2-8, 800 power supply schematic, peripheral jack J204'), S.faq('SIO')];
+const XL_SIO = [S.xl(20, 'Fig. 1-9, SIO connector pin assignments, p. 1-12'), S.trn(131, 'OS Manual Fig. 9-4, Serial Bus Connector, p. 146'), S.faq('SIO')];
+const X6_SIO = [S.x6(22, 'Fig. 1-9, SIO connector pin assignments, p. 1-12'), S.trn(131, 'OS Manual Fig. 9-4, Serial Bus Connector, p. 146'), S.faq('SIO')];
-  id: 'atari-cart', name: 'Left cartridge slot (A, 30 contacts)', kind: 'Card edge 15/30, 0.1 in', geo: 'edge-15x15-cbm',
+  id: 'atari-cart', name: 'Left cartridge slot (A, 30 contacts)', kind: 'Card edge 15/30, 0.1 in', geo: 'edge-15x15-cbm', rowA: 'bottom',
-  summary: 'The main cartridge slot (BASIC goes here). Numbers 1-15 on one side, letters A-S on the other. Pin names from the 800 schematic, J109.',
+  summary: 'The main cartridge slot (BASIC goes here). Letters A-S on the console-top side, numbers 1-15 on the console-bottom side, A opposite 1 (FAQ drawing; the Atari 600XL manual labels the sides the same way). Pin names from the 800 schematic, J109.',
-  sources: [S.fsm(48, 'Fig. 2-6A, 800 motherboard schematic, J108/J109, p. 2-10'), S.faq('cartridge slot')],
+  sources: [S.fsm(48, 'Fig. 2-6A, 800 motherboard schematic, J108/J109, p. 2-10'), S.faq('cartridge slot'), S.x6(24, 'Fig. 1-11, cartridge connector pin assignments (letters CONSOLE TOP, numbers CONSOLE BOTTOM), p. 1-14')],
-  id: 'atari-cart-right', name: 'Right cartridge slot (B, 800 only)', kind: 'Card edge 15/30, 0.1 in', geo: 'edge-15x15-cbm',
+  id: 'atari-cart-right', name: 'Right cartridge slot (B, 800 only)', kind: 'Card edge 15/30, 0.1 in', geo: 'edge-15x15-cbm', rowA: 'bottom',
```

### H070

src/data/atari.js @@ -989,16 +989,16 @@ const cart800Right = {

```diff
-  sources: [S.fsm(48, 'Fig. 2-6A, 800 motherboard schematic, J108, p. 2-10'), S.faq('right cartridge slot')],
+  sources: [S.fsm(48, 'Fig. 2-6A, 800 motherboard schematic, J108, p. 2-10'), S.faq('right cartridge slot'), S.x6(24, 'Fig. 1-11, cartridge connector pin assignments (letters CONSOLE TOP, numbers CONSOLE BOTTOM), p. 1-14')],
-  summary: 'The 400 has one cartridge slot, wired as the 800 left slot except that RD4 (A) is not connected (FAQ). Numbers 1-15 on one side, letters A-S on the other.',
+  summary: 'The 400 has one cartridge slot, wired as the 800 left slot except that RD4 (A) is not connected (FAQ). Letters A-S on the console-top side, numbers 1-15 on the console-bottom side, A opposite 1.',
-  id: 'atari-cart', name: 'Cartridge slot (30 contacts)', kind: 'Card edge 15/30, 0.1 in', geo: 'edge-15x15-cbm',
+  id: 'atari-cart', name: 'Cartridge slot (30 contacts)', kind: 'Card edge 15/30, 0.1 in', geo: 'edge-15x15-cbm', rowA: 'bottom',
```

### H071

src/data/atari.js @@ -1027,9 +1027,9 @@ const monitorXE = {

```diff
-  id: 'atari-eci', name: 'Enhanced Cartridge Interface (ECI, J4B)', kind: 'Card edge 7/14, beside the cartridge slot', geo: 'edge-7x7-cbm',
+  id: 'atari-eci', name: 'Enhanced Cartridge Interface (ECI, J4B)', kind: 'Card edge 7/14, beside the cartridge slot', geo: 'edge-7x7-cbm', rowA: 'bottom',
-  summary: 'The 130XE replacement for the PBI: 14 extra contacts beside the cartridge slot. A device uses both edges together. Numbers 1-7 on one side, letters A-H on the other.',
+  summary: 'The 130XE replacement for the PBI: 14 extra contacts beside the cartridge slot. A device uses both edges together. Sams J4B front view: letters A-H on top, numbers 1-7 below, A over 1 (so +5 V on 7 is lower right and ground H upper right).',
```

### H072

src/data/coleco.js @@ -68,7 +68,7 @@ const cartPins = [

```diff
-const cartSummary = 'Thirty contacts, odd numbers on one row and even on the other (2 opposite 1). The cartridge sees D0-D7, A0-A14 and four 8 KB chip selects that the console decodes (U5 74LS138); there is no R/W line, so a cartridge is ROM only. Pin 30 gives +5 V, pin 29 logic ground and pin 13 the RF shield ground. Which row faces up in the slot is not stated in the sources: check pin 30 for +5 V before you trust the drawing\'s orientation. Dirty contacts here are the most common "dead game" fault.';
+const cartSummary = 'Thirty contacts, odd numbers on one row and even on the other (2 opposite 1). The cartridge sees D0-D7, A0-A14 and four 8 KB chip selects that the console decodes (U5 74LS138); there is no R/W line, so a cartridge is ROM only. Pin 30 gives +5 V, pin 29 logic ground and pin 13 the RF shield ground. Which row faces up in the slot and which end is pin 1 are not stated in the sources, so the drawing is unchecked: check pin 30 for +5 V before you trust it. Dirty contacts here are the most common "dead game" fault.';
```

### H073

src/data/coleco.js @@ -202,7 +202,7 @@ RCS.add({

```diff
-      chips: ['cpuz80', 'vdp9918', 'psg76489', 'dram4116', 'sram2114', 'rom2764', 'ls138', 'ls-controller'],
+      chips: ['cpuz80', 'vdp9918', 'psg76489', 'dram4116', 'sram2114', 'rom9464-cv', 'rom2764', 'ls138', 'ls-controller'],
```

### H074

src/data/coleco.js @@ -224,7 +224,7 @@ RCS.add({

```diff
-      rom2764: 'U2 (9464C-0036 mask ROM; A11, A12 and enable are routed differently from a 2764: jumpers WJ4/WJ5 convert the socket for a 2764 EPROM)',
+      rom2764: 'U2 only after the EPROM conversion (solder traces cut, jumpers WJ4/WJ5 fitted). A stock board has the 9464C mask ROM, whose pins 2, 20 and 23 differ: see 9464C.',
```

### H075

src/data/coleco.js @@ -233,6 +233,46 @@ RCS.add({

```diff
+    'rom9464-cv': {
+      id: 'rom9464-cv', name: '9464C-0036 BIOS mask ROM (ColecoVision U2)', short: '9464C', family: 'Mask ROM, 8K x 8',
+      role: 'OS-7 BIOS, $0000-$1FFF', pkg: 'DIP-28',
+      machines: ['colecovision'],
+      summary: 'The stock BIOS ROM at U2. It is not a 2764 pinout: pin 2 is NC, pin 20 is A11, pin 23 is A12 and pin 22 is the enable /EP, where a 2764 has A12, /CE and A11 on 2, 20 and 23. Pins 1, 26, 27 and 28 are all tied to +5 V on the board (26 is VCC on this part, 28 on a 2764). To fit a 2764 EPROM, sever the two solder traces by U2 and add jumpers WJ4 (pin 20 to the select) and WJ5 (pin 23 to A11), as the schematic note says. /EP comes from U5 (74LS138) output O0, the $0000-$1FFF select.',
+      fails: ['Dead console, no title screen', 'Garbled title screen'],
+      heat: 'cool',
+      verifiedAgainst: 'ColecoVision schematic, KiCad redraw Rev J, sheet 9 (U2 9464C-0036)',
+      datasheets: [sch(9, 'U2 9464C-0036 pin numbers, solder traces and jumpers WJ4/WJ5 (EEPROM note)')],
+      pins: [
+        { n: 1, name: 'NC', type: 'nc', dir: '-', desc: 'No connection on the 9464C; tied to +5 V on the board (VPP on a 2764).' },
+        { n: 2, name: 'NC', type: 'nc', dir: '-', desc: 'No connection on the 9464C. A 2764 has A12 here; the board links this pad to A12 for the EPROM conversion.' },
+        { n: 3, name: 'A7', type: 'addr', dir: 'in', desc: 'Address bit 7.' },
+        { n: 4, name: 'A6', type: 'addr', dir: 'in', desc: 'Address bit 6.' },
+        { n: 5, name: 'A5', type: 'addr', dir: 'in', desc: 'Address bit 5.' },
+        { n: 6, name: 'A4', type: 'addr', dir: 'in', desc: 'Address bit 4.' },
+        { n: 7, name: 'A3', type: 'addr', dir: 'in', desc: 'Address bit 3.' },
+        { n: 8, name: 'A2', type: 'addr', dir: 'in', desc: 'Address bit 2.' },
+        { n: 9, name: 'A1', type: 'addr', dir: 'in', desc: 'Address bit 1.' },
+        { n: 10, name: 'A0', type: 'addr', dir: 'in', desc: 'Address bit 0.' },
+        { n: 11, name: 'D0', type: 'data', dir: 'out', desc: 'Data bit 0.' },
+        { n: 12, name: 'D1', type: 'data', dir: 'out', desc: 'Data bit 1.' },
+        { n: 13, name: 'D2', type: 'data', dir: 'out', desc: 'Data bit 2.' },
+        { n: 14, name: 'VSS', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'] },
+        { n: 15, name: 'D3', type: 'data', dir: 'out', desc: 'Data bit 3.' },
+        { n: 16, name: 'D4', type: 'data', dir: 'out', desc: 'Data bit 4.' },
+        { n: 17, name: 'D5', type: 'data', dir: 'out', desc: 'Data bit 5.' },
+        { n: 18, name: 'D6', type: 'data', dir: 'out', desc: 'Data bit 6.' },
+        { n: 19, name: 'D7', type: 'data', dir: 'out', desc: 'Data bit 7.' },
+        { n: 20, name: 'A11', type: 'addr', dir: 'in', desc: 'Address bit 11 (through a solder trace that the EPROM conversion severs; a 2764 has /CE here).' },
+        { n: 21, name: 'A10', type: 'addr', dir: 'in', desc: 'Address bit 10.' },
+        { n: 22, name: '/EP', type: 'ctrl', dir: 'in', desc: 'Enable, active LOW, from U5 (74LS138) O0, the $0000-$1FFF select.', activeLow: true, terms: ['cs'], probe: 'Pulses LOW while the Z80 reads the BIOS.' },
+        { n: 23, name: 'A12', type: 'addr', dir: 'in', desc: 'Address bit 12 (a 2764 has A11 here; jumper WJ5 moves A11 to this pin for an EPROM).' },
+        { n: 24, name: 'A9', type: 'addr', dir: 'in', desc: 'Address bit 9.' },
+        { n: 25, name: 'A8', type: 'addr', dir: 'in', desc: 'Address bit 8.' },
+        { n: 26, name: 'VCC', type: 'power', dir: '-', desc: '+5 V supply on the 9464C (NC on a 2764).', terms: ['vcc'] },
+        { n: 27, name: 'NC', type: 'nc', dir: '-', desc: 'No connection; tied to +5 V on the board (/PGM on a 2764).' },
+        { n: 28, name: 'NC', type: 'nc', dir: '-', desc: 'No connection on the 9464C; tied to +5 V on the board (VCC on a 2764).' },
+      ],
+    },
```

### H076

src/data/coleco.js @@ -329,7 +369,7 @@ RCS.add({

```diff
-      { symptom: 'Dead console, no boot screen', suspects: ['cpuz80', 'rom2764'], note: 'Supply first (most common failure), then the Z80 clock at pin 6 and the BIOS ROM U2.' },
+      { symptom: 'Dead console, no boot screen', suspects: ['cpuz80', 'rom9464-cv'], note: 'Supply first (most common failure), then the Z80 clock at pin 6 and the BIOS ROM U2.' },
```

### H077

src/data/coleco.js @@ -366,7 +406,7 @@ RCS.add({

```diff
-        id: 'cv-cart', name: 'Cartridge slot (J1)', kind: '30-contact card-edge socket', geo: 'edge-15x15-odd-even',
+        id: 'cv-cart', name: 'Cartridge slot (J1)', kind: '30-contact card-edge socket', geo: 'edge-15x15-odd-even', verify: true,
```

### H078

src/data/coleco.js @@ -381,7 +421,7 @@ RCS.add({

```diff
-        id: 'cv-expansion', name: 'Expansion module interface (J2)', kind: '60-contact card edge on the main board (front, behind the door)', geo: 'edge-30x30-seq',
+        id: 'cv-expansion', name: 'Expansion module interface (J2)', kind: '60-contact card edge on the main board (front, behind the door)', geo: 'edge-30x30-seq', verify: true,
```

### H079

src/data/coleco.js @@ -445,22 +485,22 @@ RCS.add({

```diff
-        id: 'adam-cart', name: 'Cartridge slot', kind: '30-contact card-edge socket', geo: 'edge-15x15-odd-even',
+        id: 'adam-cart', name: 'Cartridge slot', kind: '30-contact card-edge socket', geo: 'edge-15x15-odd-even', verify: true,
-        pins: cartPins,
+        pins: cartPins.map(p => (p.n === 22 ? { ...p, desc: 'Cartridge select 2, from the 74LS138 decoder (the address range is not given in the ADAM manual table).' } : p)),
-        summary: 'Same two ports and pinout as the ColecoVision: pin 8 strobes the joystick and left fire, pin 5 the keypad and right fire, pins 7 and 9 are the spinner inputs. Gender is taken from the ColecoVision board; the ADAM CPU board drawing does not show it.',
+        summary: 'Same two ports and pinout as the ColecoVision: pin 8 strobes the joystick and left fire, pin 5 the keypad and right fire, pins 7 and 9 are the spinner inputs. Gender is taken from the ColecoVision board; the ADAM CPU board drawing does not show it. The 2.2 V idle test in the ColecoVision Technical Manual is not given for the ADAM (its Table 1 gives 2.0 V minimum logic high).',
-        pins: ctrlPins,
+        pins: ctrlPins.map(({ expect, ...p }) => (/2\.2 V/.test(expect || '') ? p : { ...p, ...(expect ? { expect } : {}) })),
-        id: 'adam-expansion', name: 'Expansion port (P1, right side)', kind: '60-contact male card edge on the memory console', geo: 'edge-30x30-seq',
+        id: 'adam-expansion', name: 'Expansion port (P1, right side)', kind: '60-contact male card edge on the memory console', geo: 'edge-30x30-seq', verify: true,
```

### H080

src/data/commodore.js @@ -49,6 +49,7 @@ const CBM264_PORTS = [

```diff
+      { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 12', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=12' },
```

### H081

src/data/commodore.js @@ -59,18 +60,19 @@ const CBM264_PORTS = [

```diff
-    summary: 'CN3, a 7-pin mini-DIN for the 1531. Not the C64 edge: a 1530 needs an adapter. Motor power comes from Q5 (2SD880) switched by 7501 port bit 3; read goes to 7501 P4; write comes from P1; sense goes to the 6529 at $FD10.',
+    summary: 'CN3, a 7-pin mini-DIN for the 1531. Not the C64 edge: a 1530 needs an adapter. On the C16 schematic, motor power comes from Q5 (2SD880) switched by 7501 port bit 3; read goes to 7501 P4; write comes from P1; sense goes to the 6529 at $FD10.',
-      { n: 5, name: 'WRITE', type: 'io', desc: 'Tape write data from 7501 P1.' },
+      { n: 5, name: 'WRITE', type: 'io', desc: 'Tape write data (from 7501 P1 on the C16 schematic; the Plus/4 route is not on the cited map).' },
+      { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
```

### H082

src/data/commodore.js @@ -93,6 +95,7 @@ const CBM264_PORTS = [

```diff
+      { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 12', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=12' },
```

### H083

src/data/commodore.js @@ -103,7 +106,7 @@ const CBM264_PORTS = [

```diff
-    summary: 'CN6, the 8-pin video DIN fed by the RF modulator M1: separate LUM and COLOR (S-Video with a simple cable), composite and audio. Pin 8 carries +5 V on the C16 schematic; the Plus/4 map shows it unconnected, so check before wiring a cable that uses pin 8.',
+    summary: 'CN6, the 8-pin video DIN fed by the RF modulator M1: separate LUM and COLOR (S-Video with a simple cable), composite and audio. Pin 8 carries +5 V on the C16 schematic. The Plus/4 socket is different (pin 8 not connected): see its own entry.',
```

### H084

src/data/commodore.js @@ -112,10 +115,11 @@ const CBM264_PORTS = [

```diff
-      { n: 8, name: '+5 V', type: 'power', desc: '+5 V on the C16 (schematic 251788).', expect: '+5 V', conflict: 'Plus/4 térkép map shows pin 8 as N.C. on the Plus/4.' },
+      { n: 8, name: '+5 V', type: 'power', desc: '+5 V on the C16 (schematic 251788).', expect: '+5 V' },
+      { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
```

### H085

src/data/commodore.js @@ -125,9 +129,10 @@ const CBM264_PORTS = [

```diff
+    pin1: 'right',
-    verifiedAgainst: 'TED System Hardware Manual 10.1; C16 Service Manual schematic 251788 sheet 1',
-    summary: 'CN1: cartridges, RAM expansion and the 1551 disk interface. Top row 1-25, bottom row A-Z then AA, BB, CC (no G, I, O, Q). The address and data lines are unbuffered: a shorted cartridge can kill the TED or CPU.',
+    verifiedAgainst: 'TED System Hardware Manual 10.1; C16 Service Manual schematic 251788 sheet 1; Plus/4 térkép connector map (drawn from outside)',
+    summary: 'CN1: cartridges, RAM expansion and the 1551 disk interface. Seen from outside the machine: top row 25 to 1 with pin 1 at the right, bottom row CC to A with A under 1 (A-Z then AA, BB, CC; no G, I, O, Q). The address and data lines are unbuffered: a shorted cartridge can kill the TED or CPU.',
```

### H086

src/data/commodore.js @@ -183,10 +188,23 @@ const CBM264_PORTS = [

```diff
+      { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
+/* The Plus/4 video DIN (CN7) differs from the C16 one: pins 7 and 8 are both unconnected. */
+const PLUS4_VIDEO = {
+  ...CBM264_PORTS.find(c => c.id === 'c16-video'),
+  id: 'plus4-video',
+  verifiedAgainst: 'Plus/4 térkép connector map (CN7 Video); Plus/4 Service Manual 314001-04 schematic, CN7',
+  summary: 'CN7, the 8-pin video DIN fed by the RF modulator: separate LUM and COLOR (S-Video with a simple cable), composite and audio. Pins 7 and 8 are not connected on the Plus/4; the C16 has +5 V on pin 8, so a C16 cable that draws power from pin 8 gets none here.',
+  pins: CBM264_PORTS.find(c => c.id === 'c16-video').pins.map(p => (p.n === 8 ? { n: 8, name: 'NC', type: 'nc', desc: 'No connection on the Plus/4 (the C16 has +5 V here).' } : p)),
+  sources: [
+    { label: 'Plus/4 térkép connector map, CN7 Video (pins 7 and 8 N.C.)', url: 'http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg' },
+    { label: 'Plus/4 Service Manual 314001-04, schematic with CN7 (pins 7 and 8 to N.C.), PDF p. 21', url: 'http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf#page=21' },
+  ],
+};
```

### H087

src/data/commodore.js @@ -252,6 +270,24 @@ const CBMF = {

```diff
+/* Wayback Machine copies of Ray Carlsen's pages: portcommodore.com answers HTTP 406 to some clients (fact-check 2026-10-30). */
+const RCWB_ = (o, ts) => ({ label: `${o.label}, Wayback Machine copy (${ts.slice(0, 4)})`, url: `https://web.archive.org/web/${ts}/${o.url}` });
+const RCWB = {
+  rcplus4: RCWB_(CBMF.rcplus4, '20260226020821'),
+  rc64c: RCWB_(CBMF.rc64c, '20250821030246'),
+  rcsubs: RCWB_(CBMF.rcsubs, '20260823132238'),
+  rc8580: RCWB_(CBMF.rc8580, '20250414092701'),
+  rcsid: RCWB_(CBMF.rcsid, '20211202105311'),
+  rc128: RCWB_(CBMF.rc128, '20260823132230'),
+  rc64blank: RCWB_(CBMF.rc64blank, '20250819042254'),
+  rcvic20: RCWB_(CBMF.rcvic20, '20260607184337'),
+  rc64ps: RCWB_(CBMF.rc64ps, '20250312194753'),
+  rc41: RCWB_(CBMD_SRC.rc41, '20251206140425'),
+  rc41ii: RCWB_(CBMD_SRC.rc41ii, '20241209002723'),
+  rc81: RCWB_(CBMD_SRC.rc81, '20230927055247'),
+  ps1571: { label: 'Ray Carlsen 1571 folder: USA power supply diagram, Wayback Machine copy (2021)', url: 'https://web.archive.org/web/20211121065937/https://portcommodore.com/rcarlsen/cbm/1571/USA%20PS%20DIAGRAM.jpg', sams: false },
+  ps1571w: { label: 'Ray Carlsen 1571 folder: power supply wiring to main board, Wayback Machine copy (2021)', url: 'https://web.archive.org/web/20211119212743/https://portcommodore.com/rcarlsen/cbm/1571/PS%20wiring%20to%20main%20board.jpg', sams: false },
+};
```

### H088

src/data/commodore.js @@ -263,7 +299,7 @@ const CBMD_IEC = (id, where, extra, sources) => ({

```diff
-    { n: 5, name: 'DATA', type: 'serial', desc: 'Serial data, open collector in and out.', expect: 'About +5 V idle; a drive stuck LOW here hangs the whole bus' },
+    { n: 5, name: 'DATA', type: 'serial', desc: 'Serial data, open collector in and out.', expect: 'About +5 V idle; LOW when asserted' },
```

### H089

src/data/commodore.js @@ -334,7 +370,7 @@ RCS.add({

```diff
-      cpu: '7501/8501 @ 0.89/1.76 MHz',
+      cpu: '7501/8501 @ 0.89/1.79 MHz (NTSC)',
```

### H090

src/data/commodore.js @@ -350,7 +386,7 @@ RCS.add({

```diff
-      cpu: '7501/8501 @ 0.89/1.76 MHz',
+      cpu: '7501/8501 @ 0.89/1.79 MHz (NTSC)',
```

### H091

src/data/commodore.js @@ -440,10 +476,10 @@ RCS.add({

```diff
-      summary: 'HMOS 6510 variant running at 0.89 MHz (TED busy) / 1.76 MHz (dual-speed). Has a 7-bit on-chip I/O port (P0-P4, P6, P7) that drives the Datasette and IEC serial bus. GATE IN holds R/W off until /RAS. The 8501 is identical. No /NMI pin.',
+      summary: 'HMOS 6510 variant running at 0.89 MHz (TED busy) / 1.79 MHz (dual-speed; NTSC figures, PAL 0.88 / 1.77 MHz). Has a 7-bit on-chip I/O port (P0-P4, P6, P7) that drives the Datasette and IEC serial bus. GATE IN holds R/W off until /RAS. The 8501 is identical. No /NMI pin.',
-        { part: '8501', kind: 'pin-compatible', note: 'Later HMOS version fitted at the same position (U2 on the Plus/4); Carlsen lists the part as 7501/8501.', source: CBMF.rcplus4 },
+        { part: '8501', kind: 'pin-compatible', note: 'Later HMOS version fitted at the same position (U2 on the Plus/4); Carlsen lists the part as 7501/8501. No 8501 data sheet seen to compare every pin.', verify: true, source: CBMF.rcplus4 },
```

### H092

src/data/commodore.js @@ -451,9 +487,11 @@ RCS.add({

```diff
+        { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 12', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=12' },
+        RCWB.rcplus4,
-        { n: 1, name: 'Φ0 IN', type: 'clock', dir: 'in', desc: 'Clock input (PHI IN). Fed by TED pin 12 at 0.89 / 1.76 MHz.', terms: ['clock'], probe: 'Pulsing. Dead = no clock from TED or crystal.' },
+        { n: 1, name: 'Φ0 IN', type: 'clock', dir: 'in', desc: 'Clock input (PHI IN). Fed by TED pin 12 at 0.89 / 1.79 MHz (NTSC).', terms: ['clock'], probe: 'Pulsing. Dead = no clock from TED or crystal.' },
```

### H093

src/data/commodore.js @@ -510,13 +548,14 @@ RCS.add({

```diff
-        { part: '8360', kind: 'pin-compatible', note: 'Functionally the same TED in HMOS-2; most machines have the 8360. Both run hot: fit a heat sink.', source: CBMF.wiki('TED', 'TED (7360 HMOS-1, 8360 HMOS-2)') },
+        { part: '8360', kind: 'pin-compatible', note: 'Functionally the same TED in HMOS-2; most machines have the 8360. Both run hot: fit a heat sink. No 8360 pin table seen to compare.', verify: true, source: CBMF.wiki('TED', 'TED (7360 HMOS-1, 8360 HMOS-2)') },
+        { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
```

### H094

src/data/commodore.js @@ -525,12 +564,12 @@ RCS.add({

```diff
-        { n: 7, name: 'R/W', type: 'ctrl', dir: 'in', desc: 'Read/Write input from the CPU. TED also pulls it HIGH during its own fetches (open-source output).', terms: ['rw'] },
+        { n: 7, name: 'R/W', type: 'ctrl', dir: 'bidir', desc: 'Read/Write input from the CPU. TED also pulls it HIGH during its own fetches (open-source output), so it is an input and an output.', terms: ['rw'] },
-        { n: 12, name: 'Φ OUT', type: 'clock', dir: 'out', desc: 'System clock out to 7501 pin 1. Doubles during blanking: 0.89 / 1.76 MHz (NTSC).', terms: ['clock'] },
+        { n: 12, name: 'Φ OUT', type: 'clock', dir: 'out', desc: 'System clock out to 7501 pin 1. Doubles during blanking: 0.89 / 1.79 MHz NTSC (1.788 MHz), 0.88 / 1.77 MHz PAL (1.768 MHz).', terms: ['clock'] },
```

### H095

src/data/commodore.js @@ -583,6 +622,7 @@ RCS.add({

```diff
+        { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 13', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=13' },
```

### H096

src/data/commodore.js @@ -669,9 +709,9 @@ RCS.add({

```diff
-        { part: 'HM4864, MT4264, TMS4164 and other 4164s', kind: 'pin-compatible', note: 'All fitted side by side in the same C64 (Sams draws HM4864-3, MT4264-20 and TMS4164-15 in one bank). To find a dead one, piggyback a known-good chip on each in turn (Carlsen).', source: SAMS_CC17('schematic RAM bank U9-U12, U21-U24', 9) },
+        { part: 'HM4864, MT4264, TMS4164', kind: 'pin-compatible', verify: true, note: 'All fitted side by side in the same C64 (Sams draws HM4864-3, MT4264-20 and TMS4164-15 in one bank); the Hitachi and TI pinouts agree, the MT4264 sheet was not seen. Other 4164s: check the refresh row below. To find a dead one, piggyback a known-good chip on each in turn (Carlsen).', source: SAMS_CC17('schematic RAM bank U9-U12, U21-U24', 9) },
-        { part: '41256 (256K x 1)', kind: 'pin-compatible', note: 'Same pins except pin 1, which is A8 on the 41256 and NC on a 4164. Hold pin 1 at a fixed level (a link to pin 16, 0 V, is the usual way) so the chip uses one 64K quarter. It needs 256-row refresh, so it will not hold data on a 128-row (7-bit) board.', source: { label: 'TI TMS4256 data sheet (A8 on pin 1, upward pin compatible with TMS4164, 256 rows A0-A7 every 4 ms), 1984 MOS Memory Data Book p. 4-63', url: 'http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf#page=103' } },
+        { part: '41256 (256K x 1)', kind: 'adapter', note: 'Rework: pin 1 must be tied. Same pins except pin 1, which is A8 on the 41256 and NC on a 4164. Hold pin 1 at a fixed level (a link to pin 16, 0 V, is the usual way) so the chip uses one 64K quarter. It needs 256-row refresh, so it will not hold data on a 128-row (7-bit) board.', source: { label: 'TI TMS4256 data sheet (A8 on pin 1, upward pin compatible with TMS4164, 256 rows A0-A7 every 4 ms), 1984 MOS Memory Data Book p. 4-63', url: 'http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf#page=103' } },
```

### H097

src/data/commodore.js @@ -715,6 +755,7 @@ RCS.add({

```diff
+        { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
```

### H098

src/data/commodore.js @@ -747,7 +788,7 @@ RCS.add({

```diff
-      summary: '28-pin 16K x 8 mask ROM with three chip selects: pin 20, pin 22 and pin 27. The sense of each select is set by the mask, so it differs by maker: the C16 parts use 20 /CS, 22 /CE and 27 CS (active HIGH), while on the Spectrum Hitachi and NEC swap the jobs of pins 20 and 27 and links H and N above IC5 must match the ROM fitted. C16: U3 BASIC ($8000-$BFFF, TED /CS0) and U4 KERNAL ($C000-$FFFF, TED /CS1). A 27128 EPROM has /CE on 20, /OE on 22 and /PGM on 27, and reads only with pins 1 and 27 HIGH.',
+      summary: '28-pin 16K x 8 mask ROM with three chip selects: pin 20, pin 22 and pin 27. The sense of each select is set by the mask, so it differs by maker and part. Board wiring, by machine: C16: U3 BASIC ($8000-$BFFF, TED /CS0) and U4 KERNAL ($C000-$FFFF, TED /CS1); the C16 parts use 20 /CS (active LOW, C16 SM /CS2) from the TED ROM selects, 22 /CE and 27 CS (active HIGH, C16 SM CS3). Spectrum: Hitachi and NEC swap the jobs of pins 20 and 27 (NEC: 20 CE, 27 CS; Hitachi: 20 CS, 27 CE), and links H and N above IC5 must match the ROM fitted. Oric-1: pin 27 comes from /ROMDIS with a 3K3 pull-up (RP1). A 27128 EPROM has /CE on 20, /OE on 22 and /PGM on 27, and reads only with pins 1 and 27 HIGH.',
```

### H099

src/data/commodore.js @@ -771,18 +812,19 @@ RCS.add({

```diff
-        { n: 20, name: '/CS', type: 'ctrl', dir: 'in', desc: 'Chip select; polarity set by the mask, so it depends on the maker. C16: active LOW (C16 SM /CS2), driven from the TED ROM selects. Spectrum: CE on NEC, CS on Hitachi (Issue 3 diagram); links H/N swap pins 20 and 27.', terms: ['cs'], activeLow: true },
+        { n: 20, name: '/CS', type: 'ctrl', dir: 'in', desc: 'Chip select. Its polarity is set by the mask, so it depends on the maker and the part; check the board (summary) before probing for an active level.', terms: ['cs'], activeLow: true },
-        { n: 22, name: '/CE', type: 'ctrl', dir: 'in', desc: 'Chip enable, active LOW (C16 SM /CS1).', terms: ['cs'], activeLow: true },
+        { n: 22, name: '/CE', type: 'ctrl', dir: 'in', desc: 'Chip enable, active LOW (named /CS1 in the C16 manual).', terms: ['cs'], activeLow: true },
-        { n: 27, name: 'CS', type: 'ctrl', dir: 'in', desc: 'Chip select; polarity set by the mask, so it depends on the maker. C16: active HIGH (C16 SM CS3). Spectrum: CS on NEC, CE on Hitachi (links H/N). Oric-1: from /ROMDIS with a 3K3 pull-up (RP1). /PGM on a 27128: it must sit HIGH for an EPROM to read.', terms: ['cs'] },
+        { n: 27, name: 'CS', type: 'ctrl', dir: 'in', desc: 'Chip select. Its polarity is set by the mask, so it depends on the maker and the part (board wiring: see the summary). On a 27128 EPROM this pin is /PGM and must sit HIGH for the EPROM to read.', terms: ['cs'] },
+        { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
```

### H100

src/data/commodore.js @@ -791,7 +833,7 @@ RCS.add({

```diff
-        { part: '27128 / 27C128 EPROM', kind: 'pin-compatible', note: 'Same 28-pin footprint, not a drop-in: the EPROM reads only with pin 1 (VPP) and pin 27 (/PGM) HIGH and pin 20 (/CE) LOW-active. On the C16 tie pins 1 and 27 HIGH. On the Spectrum and the Oric-1, pin 27 is a board select (Spectrum links H/N; Oric /ROMDIS), so the board needs changing first.', source: { label: 'Intel 27128 data sheet, pin names and read mode, 1983 Memory Component Handbook p. 4-29', url: 'https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf#page=411' } },
+        { part: '27128 / 27C128 EPROM', kind: 'adapter', note: 'Same 28-pin footprint, not a drop-in: the EPROM reads only with pin 1 (VPP) and pin 27 (/PGM) HIGH and pin 20 (/CE) LOW-active. On the C16 tie pins 1 and 27 HIGH. On the Spectrum and the Oric-1, pin 27 is a board select (Spectrum links H/N; Oric /ROMDIS), so the board needs changing first.', source: { label: 'Intel 27128 data sheet, pin names and read mode, 1983 Memory Component Handbook p. 4-29', url: 'https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf#page=411' } },
```

### H101

src/data/commodore.js @@ -805,14 +847,16 @@ RCS.add({

```diff
-        { part: '8500', kind: 'pin-compatible', note: 'HMOS-II 6510 from the C64C, runs cooler. Carlsen found a 6510 works in a C64C and an 8500 in an old C64 passed a diagnostic, but he could not vouch for every use.', source: CBMF.rc64c },
-        { part: '8502 in a C64C (for the 8500)', kind: 'adapter', note: 'Worked through a wired adapter in a Carlsen experiment; not a tested drop-in.', source: CBMF.rcsubs },
+        { part: '8500', kind: 'pin-compatible', verify: true, note: 'HMOS-II 6510 from the C64C, runs cooler. Carlsen found a 6510 works in a C64C and an 8500 in an old C64 passed a diagnostic, but he could not vouch for every use. No 8500 data sheet seen.', source: CBMF.rc64c },
+        { part: '8502 in a C64C (for the 8500)', kind: 'adapter', verify: true, note: 'Worked through a wired adapter in a Carlsen experiment; not a tested drop-in. The adapter wiring is not given here.', source: CBMF.rcsubs },
+        RCWB.rc64c,
+        RCWB.rcsubs,
```

### H102

src/data/commodore.js @@ -869,7 +913,7 @@ RCS.add({

```diff
-        { part: '8562 (NTSC) / 8565 (PAL)', kind: 'adapter', note: 'Same 40-pin VIC-II in HMOS-II, but pin 13 (VDD) wants +5 V where the 6567/6569 wants +12 V. A breadbin board needs pin 13 changed to +5 V; a 6567/6569 will not work in a 250469 C64C, which has no +12 V there. The 856x also shows the grey-dots artefact.', source: CBMF.wiki('VIC', 'VIC (NMOS 6566/67/69 need +12 V on pin 13; HMOS-II 8562/65 +5 V only)') },
+        { part: '8562 (NTSC) / 8565 (PAL)', kind: 'adapter', verify: true, note: 'Same 40-pin VIC-II in HMOS-II, but pin 13 (VDD) wants +5 V where the 6567/6569 wants +12 V. A breadbin board needs pin 13 changed to +5 V; a 6567/6569 will not work in a 250469 C64C, which has no +12 V there. The 856x also shows the grey-dots artefact.', source: CBMF.wiki('VIC', 'VIC (NMOS 6566/67/69 need +12 V on pin 13; HMOS-II 8562/65 +5 V only)') },
```

### H103

src/data/commodore.js @@ -877,6 +921,8 @@ RCS.add({

```diff
+        { label: 'C64 Programmer\'s Reference Guide, App. N, p. 450: address pins A5-A0 are bidirectional (inputs during processor access)', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf#page=469' },
+        { label: 'Christian Bauer, The MOS 6567/6569 video controller (VIC-II), 3.14.6: D8-D11 have no tri-state drivers and are always inputs', url: 'http://www.zimmers.net/cbmpics/cbm/c64/vic-ii.txt' },
```

### H104

src/data/commodore.js @@ -903,21 +949,21 @@ RCS.add({

```diff
-        { n: 24, name: 'A0', type: 'addr', dir: 'out', desc: 'VIC-II address bus bit 0 to the DRAM (row or column, multiplexed).' },
-        { n: 25, name: 'A1', type: 'addr', dir: 'out', desc: 'VIC-II address bus bit 1 to the DRAM.' },
-        { n: 26, name: 'A2', type: 'addr', dir: 'out', desc: 'VIC-II address bus bit 2 to the DRAM.' },
-        { n: 27, name: 'A3', type: 'addr', dir: 'out', desc: 'VIC-II address bus bit 3 to the DRAM.' },
-        { n: 28, name: 'A4', type: 'addr', dir: 'out', desc: 'VIC-II address bus bit 4 to the DRAM.' },
-        { n: 29, name: 'A5', type: 'addr', dir: 'out', desc: 'VIC-II address bus bit 5 to the DRAM.' },
+        { n: 24, name: 'A0', type: 'addr', dir: 'bidir', desc: 'Address bit 0: multiplexed DRAM address out during VIC fetches; register-select input when the CPU reads or writes the VIC-II.' },
+        { n: 25, name: 'A1', type: 'addr', dir: 'bidir', desc: 'Address bit 1: DRAM address out during VIC fetches; register-select input during CPU access.' },
+        { n: 26, name: 'A2', type: 'addr', dir: 'bidir', desc: 'Address bit 2: DRAM address out during VIC fetches; register-select input during CPU access.' },
+        { n: 27, name: 'A3', type: 'addr', dir: 'bidir', desc: 'Address bit 3: DRAM address out during VIC fetches; register-select input during CPU access.' },
+        { n: 28, name: 'A4', type: 'addr', dir: 'bidir', desc: 'Address bit 4: DRAM address out during VIC fetches; register-select input during CPU access.' },
+        { n: 29, name: 'A5', type: 'addr', dir: 'bidir', desc: 'Address bit 5: DRAM address out during VIC fetches; register-select input during CPU access.' },
-        { n: 35, name: 'DB11', type: 'data', dir: 'bidir', desc: 'VIC-II data bus bit 11 (top of the 12-bit VIC bus).' },
-        { n: 36, name: 'DB10', type: 'data', dir: 'bidir', desc: 'VIC-II data bus bit 10.' },
-        { n: 37, name: 'DB9', type: 'data', dir: 'bidir', desc: 'VIC-II data bus bit 9.' },
-        { n: 38, name: 'DB8', type: 'data', dir: 'bidir', desc: 'VIC-II data bus bit 8.' },
+        { n: 35, name: 'DB11', type: 'data', dir: 'in', desc: 'Data bit 11, from the colour RAM (DB8-DB11 are the colour nybble). Input only (Bauer); DB0-DB7 are the bidirectional bus.' },
+        { n: 36, name: 'DB10', type: 'data', dir: 'in', desc: 'Data bit 10, from the colour RAM. Input only.' },
+        { n: 37, name: 'DB9', type: 'data', dir: 'in', desc: 'Data bit 9, from the colour RAM. Input only.' },
+        { n: 38, name: 'DB8', type: 'data', dir: 'in', desc: 'Data bit 8, from the colour RAM. Input only.' },
```

### H105

src/data/commodore.js @@ -933,7 +979,7 @@ RCS.add({

```diff
-        { part: '8580 in a 6581 board (or the reverse)', kind: 'pin-compatible', note: 'Same pinout, different supply and filter: the 6581 takes +12 V on pin 28 with 470 pF filter caps on pins 1-2 and 3-4; the 8580 takes +9 V with 22 nF caps. Change pin 28 to match (on a 250469 board: zener CR7 9 V to 12 V and fit R8 1 kΩ for a 6581) and swap the caps or the filter sounds wrong. An 8580 needs 330 kΩ from pin 26 to ground to play 6581-style digi samples.', source: CBMF.rc8580 },
+        { part: '8580 in a 6581 board (or the reverse)', kind: 'adapter', verify: true, note: 'Same pinout, different supply and filter, so the board needs rework: the 6581 takes +12 V on pin 28 with 470 pF filter caps on pins 1-2 and 3-4; the 8580 takes +9 V with 22 nF caps. Change pin 28 to match (on a 250469 board: zener CR7 9 V to 12 V and fit R8 1 kΩ for a 6581) and swap the caps or the filter sounds wrong. An 8580 needs 330 kΩ from pin 26 to ground to play 6581-style digi samples.', source: CBMF.rc8580 },
```

### H106

src/data/commodore.js @@ -942,6 +988,8 @@ RCS.add({

```diff
+        RCWB.rc8580,
+        RCWB.rcsid,
```

### H107

src/data/commodore.js @@ -986,35 +1034,36 @@ RCS.add({

```diff
-        { part: '6526A', kind: 'pin-compatible', note: 'Same chip rated for a 2 MHz bus; later C64s use it.', source: CBMF.wiki('CIA', 'CIA (6526 1 MHz, 6526A 2 MHz; later C64s use the 6526A or 8521)') },
-        { part: '8521', kind: 'pin-compatible', note: 'HMOS-II CIA from later C64C and C128 boards; Ray Carlsen lists it as interchangeable with the 6526 and 6526A.', source: CBMF.rc128 },
+        { part: '6526A', kind: 'pin-compatible', verify: true, note: 'Same chip rated for a 2 MHz bus; later C64s use it. No 6526A pin table seen to compare.', source: CBMF.wiki('CIA', 'CIA (6526 1 MHz, 6526A 2 MHz; later C64s use the 6526A or 8521)') },
+        { part: '8521', kind: 'pin-compatible', verify: true, note: 'HMOS-II CIA from later C64C and C128 boards; Ray Carlsen lists it as interchangeable with the 6526 and 6526A. No 8521 data sheet seen.', source: CBMF.rc128 },
+        RCWB.rc128,
-        { n: 2, name: 'PA0', type: 'io', dir: 'bidir', desc: 'Port A bit 0. CIA1: keyboard rows and joystick. CIA2: serial bus.' },
-        { n: 3, name: 'PA1', type: 'io', dir: 'bidir', desc: 'Port A bit 1. CIA1: keyboard rows and joystick. CIA2: serial bus.' },
-        { n: 4, name: 'PA2', type: 'io', dir: 'bidir', desc: 'Port A bit 2. CIA1: keyboard rows and joystick. CIA2: serial bus.' },
-        { n: 5, name: 'PA3', type: 'io', dir: 'bidir', desc: 'Port A bit 3. CIA1: keyboard rows and joystick. CIA2: serial bus.' },
-        { n: 6, name: 'PA4', type: 'io', dir: 'bidir', desc: 'Port A bit 4. CIA1: keyboard rows and joystick. CIA2: serial bus.' },
-        { n: 7, name: 'PA5', type: 'io', dir: 'bidir', desc: 'Port A bit 5. CIA1: keyboard rows and joystick. CIA2: serial bus.' },
-        { n: 8, name: 'PA6', type: 'io', dir: 'bidir', desc: 'Port A bit 6. CIA1: keyboard rows and joystick. CIA2: serial bus.' },
-        { n: 9, name: 'PA7', type: 'io', dir: 'bidir', desc: 'Port A bit 7. CIA1: keyboard rows and joystick. CIA2: serial bus.' },
-        { n: 10, name: 'PB0', type: 'io', dir: 'bidir', desc: 'Port B bit 0. CIA1: keyboard columns and joystick. CIA2: user port.' },
-        { n: 11, name: 'PB1', type: 'io', dir: 'bidir', desc: 'Port B bit 1. CIA1: keyboard columns and joystick. CIA2: user port.' },
-        { n: 12, name: 'PB2', type: 'io', dir: 'bidir', desc: 'Port B bit 2. CIA1: keyboard columns and joystick. CIA2: user port.' },
-        { n: 13, name: 'PB3', type: 'io', dir: 'bidir', desc: 'Port B bit 3. CIA1: keyboard columns and joystick. CIA2: user port.' },
-        { n: 14, name: 'PB4', type: 'io', dir: 'bidir', desc: 'Port B bit 4. CIA1: keyboard columns and joystick. CIA2: user port.' },
-        { n: 15, name: 'PB5', type: 'io', dir: 'bidir', desc: 'Port B bit 5. CIA1: keyboard columns and joystick. CIA2: user port.' },
-        { n: 16, name: 'PB6', type: 'io', dir: 'bidir', desc: 'Port B bit 6. CIA1: keyboard columns and joystick. CIA2: user port.' },
-        { n: 17, name: 'PB7', type: 'io', dir: 'bidir', desc: 'Port B bit 7. CIA1: keyboard columns and joystick. CIA2: user port.' },
+        { n: 2, name: 'PA0', type: 'io', dir: 'bidir', desc: 'Port A bit 0. C64/C128 CIA1: keyboard column out and control port 2. CIA2: VIC bank select.' },
+        { n: 3, name: 'PA1', type: 'io', dir: 'bidir', desc: 'Port A bit 1. C64/C128 CIA1: keyboard column out and control port 2. CIA2: VIC bank select.' },
+        { n: 4, name: 'PA2', type: 'io', dir: 'bidir', desc: 'Port A bit 2. C64/C128 CIA1: keyboard column out and control port 2. CIA2: RS-232 data out (user port M).' },
+        { n: 5, name: 'PA3', type: 'io', dir: 'bidir', desc: 'Port A bit 3. C64/C128 CIA1: keyboard column out and control port 2. CIA2: serial bus.' },
+        { n: 6, name: 'PA4', type: 'io', dir: 'bidir', desc: 'Port A bit 4. C64/C128 CIA1: keyboard column out and control port 2. CIA2: serial bus.' },
+        { n: 7, name: 'PA5', type: 'io', dir: 'bidir', desc: 'Port A bit 5. C64/C128 CIA1: keyboard column out. CIA2: serial bus.' },
+        { n: 8, name: 'PA6', type: 'io', dir: 'bidir', desc: 'Port A bit 6. C64/C128 CIA1: keyboard column out. CIA2: serial bus.' },
+        { n: 9, name: 'PA7', type: 'io', dir: 'bidir', desc: 'Port A bit 7. C64/C128 CIA1: keyboard column out. CIA2: serial bus.' },
+        { n: 10, name: 'PB0', type: 'io', dir: 'bidir', desc: 'Port B bit 0. C64/C128 CIA1: keyboard row in and control port 1. CIA2: user port.' },
+        { n: 11, name: 'PB1', type: 'io', dir: 'bidir', desc: 'Port B bit 1. C64/C128 CIA1: keyboard row in and control port 1. CIA2: user port.' },
+        { n: 12, name: 'PB2', type: 'io', dir: 'bidir', desc: 'Port B bit 2. C64/C128 CIA1: keyboard row in and control port 1. CIA2: user port.' },
+        { n: 13, name: 'PB3', type: 'io', dir: 'bidir', desc: 'Port B bit 3. C64/C128 CIA1: keyboard row in and control port 1. CIA2: user port.' },
+        { n: 14, name: 'PB4', type: 'io', dir: 'bidir', desc: 'Port B bit 4. C64/C128 CIA1: keyboard row in and control port 1. CIA2: user port.' },
+        { n: 15, name: 'PB5', type: 'io', dir: 'bidir', desc: 'Port B bit 5. C64/C128 CIA1: keyboard row in. CIA2: user port.' },
+        { n: 16, name: 'PB6', type: 'io', dir: 'bidir', desc: 'Port B bit 6. C64/C128 CIA1: keyboard row in. CIA2: user port.' },
+        { n: 17, name: 'PB7', type: 'io', dir: 'bidir', desc: 'Port B bit 7. C64/C128 CIA1: keyboard row in. CIA2: user port.' },
-        { n: 20, name: 'Vcc', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.95 to +5.10 V' },
+        { n: 20, name: 'Vss', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'], probe: '0 V' },
```

### H108

src/data/commodore.js @@ -1054,6 +1103,7 @@ RCS.add({

```diff
+        { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 13', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=13' },
```

### H109

src/data/commodore.js @@ -1188,7 +1238,7 @@ RCS.add({

```diff
-        { label: 'MOS 6560/6561 Video Interface Chip data sheet, p. 1 pin configuration (GIF scans)', url: 'http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6560.zip' },
+        { label: 'MOS 6560/6561 Video Interface Chip data sheet, p. 1 pin configuration and scan 6560-09 pin signal description (address bus bidirectional; DB8-DB11 colour data only) (GIF scans)', url: 'http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6560.zip' },
```

### H110

src/data/commodore.js @@ -1198,10 +1248,10 @@ RCS.add({

```diff
-        { n: 5, name: 'DB11', type: 'data', dir: 'bidir', desc: 'Data bus bit 11 (colour-RAM nybble, DB8-DB11).' },
-        { n: 6, name: 'DB10', type: 'data', dir: 'bidir', desc: 'Data bus bit 10.' },
-        { n: 7, name: 'DB9', type: 'data', dir: 'bidir', desc: 'Data bus bit 9.' },
-        { n: 8, name: 'DB8', type: 'data', dir: 'bidir', desc: 'Data bus bit 8.' },
+        { n: 5, name: 'DB11', type: 'data', dir: 'in', desc: 'Data bit 11. DB8-DB11 only read the colour nybble from colour RAM; DB0-DB7 are the bidirectional CPU bus.' },
+        { n: 6, name: 'DB10', type: 'data', dir: 'in', desc: 'Data bit 10, colour nybble from colour RAM (input only).' },
+        { n: 7, name: 'DB9', type: 'data', dir: 'in', desc: 'Data bit 9, colour nybble from colour RAM (input only).' },
+        { n: 8, name: 'DB8', type: 'data', dir: 'in', desc: 'Data bit 8, colour nybble from colour RAM (input only).' },
```

### H111

src/data/commodore.js @@ -1214,20 +1264,20 @@ RCS.add({

```diff
-        { n: 21, name: 'A0', type: 'addr', dir: 'in', desc: 'CPU address bit 0 (register select within $9000-$900F).' },
-        { n: 22, name: 'A1', type: 'addr', dir: 'in', desc: 'CPU address bit 1.' },
-        { n: 23, name: 'A2', type: 'addr', dir: 'in', desc: 'CPU address bit 2.' },
-        { n: 24, name: 'A3', type: 'addr', dir: 'in', desc: 'CPU address bit 3.' },
-        { n: 25, name: 'A4', type: 'addr', dir: 'in', desc: 'CPU address bit 4.' },
-        { n: 26, name: 'A5', type: 'addr', dir: 'in', desc: 'CPU address bit 5.' },
-        { n: 27, name: 'A6', type: 'addr', dir: 'in', desc: 'CPU address bit 6.' },
-        { n: 28, name: 'A7', type: 'addr', dir: 'in', desc: 'CPU address bit 7.' },
-        { n: 29, name: 'A8', type: 'addr', dir: 'in', desc: 'CPU address bit 8.' },
-        { n: 30, name: 'A9', type: 'addr', dir: 'in', desc: 'CPU address bit 9.' },
-        { n: 31, name: 'A10', type: 'addr', dir: 'in', desc: 'CPU address bit 10.' },
-        { n: 32, name: 'A11', type: 'addr', dir: 'in', desc: 'CPU address bit 11.' },
-        { n: 33, name: 'A12', type: 'addr', dir: 'in', desc: 'CPU address bit 12.' },
-        { n: 34, name: 'A13', type: 'addr', dir: 'in', desc: 'CPU address bit 13.' },
+        { n: 21, name: 'A0', type: 'addr', dir: 'bidir', desc: 'Address bit 0. Input while PΦ2 is high (register select within $9000-$900F); output while PΦ1 is high, when the VIC fetches screen and character data.' },
+        { n: 22, name: 'A1', type: 'addr', dir: 'bidir', desc: 'Address bit 1.' },
+        { n: 23, name: 'A2', type: 'addr', dir: 'bidir', desc: 'Address bit 2.' },
+        { n: 24, name: 'A3', type: 'addr', dir: 'bidir', desc: 'Address bit 3.' },
+        { n: 25, name: 'A4', type: 'addr', dir: 'bidir', desc: 'Address bit 4.' },
+        { n: 26, name: 'A5', type: 'addr', dir: 'bidir', desc: 'Address bit 5.' },
+        { n: 27, name: 'A6', type: 'addr', dir: 'bidir', desc: 'Address bit 6.' },
+        { n: 28, name: 'A7', type: 'addr', dir: 'bidir', desc: 'Address bit 7.' },
+        { n: 29, name: 'A8', type: 'addr', dir: 'bidir', desc: 'Address bit 8.' },
+        { n: 30, name: 'A9', type: 'addr', dir: 'bidir', desc: 'Address bit 9.' },
+        { n: 31, name: 'A10', type: 'addr', dir: 'bidir', desc: 'Address bit 10.' },
+        { n: 32, name: 'A11', type: 'addr', dir: 'bidir', desc: 'Address bit 11.' },
+        { n: 33, name: 'A12', type: 'addr', dir: 'bidir', desc: 'Address bit 12.' },
+        { n: 34, name: 'A13', type: 'addr', dir: 'bidir', desc: 'Address bit 13.' },
```

### H112

src/data/commodore.js @@ -1274,7 +1324,7 @@ RCS.add({

```diff
-        { n: 19, name: 'CB2', type: 'io', dir: 'bidir', desc: 'Handshake / shift data, port B. PET: beep sound output.' },
+        { n: 19, name: 'CB2', type: 'io', dir: 'bidir', desc: 'Handshake / shift data, port B (board use: see the summary).' },
```

### H113

src/data/commodore.js @@ -1509,14 +1559,14 @@ RCS.add({

```diff
-        { n: 26, name: 'DA0', type: 'addr', dir: 'bidir', desc: 'Video RAM address/data bus bit 0.' },
-        { n: 27, name: 'DA1', type: 'addr', dir: 'bidir', desc: 'Video RAM address/data bus bit 1.' },
-        { n: 28, name: 'DA2', type: 'addr', dir: 'bidir', desc: 'Video RAM address/data bus bit 2.' },
-        { n: 29, name: 'DA3', type: 'addr', dir: 'bidir', desc: 'Video RAM address/data bus bit 3.' },
-        { n: 30, name: 'DA4', type: 'addr', dir: 'bidir', desc: 'Video RAM address/data bus bit 4.' },
-        { n: 31, name: 'DA5', type: 'addr', dir: 'bidir', desc: 'Video RAM address/data bus bit 5.' },
-        { n: 32, name: 'DA6', type: 'addr', dir: 'bidir', desc: 'Video RAM address/data bus bit 6.' },
-        { n: 33, name: 'DA7', type: 'addr', dir: 'bidir', desc: 'Video RAM address/data bus bit 7.' },
+        { n: 26, name: 'DA0', type: 'addr', dir: 'out', desc: 'Local display DRAM address bus bit 0 (DD0-DD7 are the separate data bus).' },
+        { n: 27, name: 'DA1', type: 'addr', dir: 'out', desc: 'Local display DRAM address bus bit 1 (DD0-DD7 are the separate data bus).' },
+        { n: 28, name: 'DA2', type: 'addr', dir: 'out', desc: 'Local display DRAM address bus bit 2 (DD0-DD7 are the separate data bus).' },
+        { n: 29, name: 'DA3', type: 'addr', dir: 'out', desc: 'Local display DRAM address bus bit 3 (DD0-DD7 are the separate data bus).' },
+        { n: 30, name: 'DA4', type: 'addr', dir: 'out', desc: 'Local display DRAM address bus bit 4 (DD0-DD7 are the separate data bus).' },
+        { n: 31, name: 'DA5', type: 'addr', dir: 'out', desc: 'Local display DRAM address bus bit 5 (DD0-DD7 are the separate data bus).' },
+        { n: 32, name: 'DA6', type: 'addr', dir: 'out', desc: 'Local display DRAM address bus bit 6 (DD0-DD7 are the separate data bus).' },
+        { n: 33, name: 'DA7', type: 'addr', dir: 'out', desc: 'Local display DRAM address bus bit 7 (DD0-DD7 are the separate data bus).' },
```

### H114

src/data/commodore.js @@ -1545,10 +1595,11 @@ RCS.add({

```diff
-        { part: '8564 in a C64C (for the 8562)', kind: 'adapter', note: 'Ray Carlsen ran a C128 8564 in a 250469 C64C through a 48-to-40-pin adapter that cross-connects pins; an experiment, not a tested drop-in.', source: CBMF.rcsubs },
+        { part: '8564 in a C64C (for the 8562)', kind: 'adapter', verify: true, note: 'Ray Carlsen ran a C128 8564 in a 250469 C64C through a 48-to-40-pin adapter that cross-connects pins; an experiment, not a tested drop-in.', source: CBMF.rcsubs },
+        RCWB.rcsubs,
```

### H115

src/data/commodore.js @@ -1583,12 +1634,12 @@ RCS.add({

```diff
-        { n: 32, name: 'A0', type: 'addr', dir: 'out', desc: 'VIC-IIe address bus bit 0 to the DRAM.' },
-        { n: 33, name: 'A1', type: 'addr', dir: 'out', desc: 'VIC-IIe address bus bit 1 to the DRAM.' },
-        { n: 34, name: 'A2', type: 'addr', dir: 'out', desc: 'VIC-IIe address bus bit 2 to the DRAM.' },
-        { n: 35, name: 'A3', type: 'addr', dir: 'out', desc: 'VIC-IIe address bus bit 3 to the DRAM.' },
-        { n: 36, name: 'A4', type: 'addr', dir: 'out', desc: 'VIC-IIe address bus bit 4 to the DRAM.' },
-        { n: 37, name: 'A5', type: 'addr', dir: 'out', desc: 'VIC-IIe address bus bit 5 to the DRAM.' },
+        { n: 32, name: 'A0', type: 'addr', dir: 'bidir', desc: 'Address bit 0: multiplexed DRAM address out (A0 on the row, A8 on the column); address input latched on /RAS when the CPU reads or writes the VIC.' },
+        { n: 33, name: 'A1', type: 'addr', dir: 'bidir', desc: 'Address bit 1: multiplexed DRAM address out (A1 on the row, A9 on the column); address input latched on /RAS when the CPU reads or writes the VIC.' },
+        { n: 34, name: 'A2', type: 'addr', dir: 'bidir', desc: 'Address bit 2: multiplexed DRAM address out (A2 on the row, A10 on the column); address input latched on /RAS when the CPU reads or writes the VIC.' },
+        { n: 35, name: 'A3', type: 'addr', dir: 'bidir', desc: 'Address bit 3: multiplexed DRAM address out (A3 on the row, A11 on the column); address input latched on /RAS when the CPU reads or writes the VIC.' },
+        { n: 36, name: 'A4', type: 'addr', dir: 'bidir', desc: 'Address bit 4: multiplexed DRAM address out (A4 on the row, A12 on the column); address input latched on /RAS when the CPU reads or writes the VIC.' },
+        { n: 37, name: 'A5', type: 'addr', dir: 'bidir', desc: 'Address bit 5: multiplexed DRAM address out (A5 on the row, A13 on the column); address input latched on /RAS when the CPU reads or writes the VIC.' },
```

### H116

src/data/commodore.js @@ -1713,7 +1764,7 @@ RCS.add({

```diff
-        { n: 32, name: 'CLRBNK', type: 'ctrl', dir: 'out', desc: 'Clear bank (sheet name).' },
+        { n: 32, name: 'CLRBNK', type: 'ctrl', dir: 'out', desc: 'Colour RAM bank select output (C128 Service Manual p. 29).' },
```

### H117

src/data/commodore.js @@ -1951,7 +2002,7 @@ RCS.add({

```diff
-        { n: 39, name: 'SP', type: 'serial', dir: 'bidir', desc: 'Serial port: fast-serial data in and out (goes LOW when set to output).' },
+        { n: 39, name: 'SP', type: 'serial', dir: 'bidir', desc: 'Serial port: fast-serial data in and out.' },
```

### H118

src/data/commodore.js @@ -2219,10 +2270,11 @@ RCS.add({

```diff
-          { n: 2, name: '+9 V DC', type: 'power', desc: 'Unregulated +9 V DC to the 7805 via switch and fuse.', expect: 'About +9 V DC (above 7.5 V for the 7805 to regulate)' },
+          { n: 2, name: '+9 V DC', type: 'power', desc: 'Unregulated +9 V DC to the 7805 via switch and fuse.', expect: 'About +9 V DC' },
+          { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
```

### H119

src/data/commodore.js @@ -2245,7 +2297,7 @@ RCS.add({

```diff
-          { n: 1, name: '+5 V DC', type: 'power', desc: 'Regulated +5 V from the supply (7805 set to 5.2 V in the PSU schematic).', expect: '+5.0 to +5.25 V DC' },
+          { n: 1, name: '+5 V DC', type: 'power', desc: 'Regulated +5 V from the supply (7805 set to 5.2 V in the PSU schematic).', expect: '+5 V DC (about 5.2 V per the PSU schematic)' },
```

### H120

src/data/commodore.js @@ -2295,7 +2347,7 @@ RCS.add({

```diff
-      ...CBM264_PORTS,
+      ...CBM264_PORTS.map(c => (c.id === 'c16-video' ? PLUS4_VIDEO : c)),
```

### H121

src/data/commodore.js @@ -2311,13 +2363,14 @@ RCS.add({

```diff
-          { n: 5, name: '+5 V DC', type: 'power', desc: 'Regulated +5 V from the brick, through the power switch to the logic. F1 on the board is in the 9 V AC branch, not in this line.', expect: '+4.95 to +5.10 V DC; over 5.25 V is dangerous' },
+          { n: 5, name: '+5 V DC', type: 'power', desc: 'Regulated +5 V from the brick, through the power switch to the logic. F1 on the board is in the 9 V AC branch, not in this line.', expect: '+5 V DC; Carlsen: the C64 RAM chips are destroyed above 5.5 V' },
+          CBMF.rc64ps, RCWB.rc64ps,
```

### H122

src/data/commodore.js @@ -2352,10 +2405,10 @@ RCS.add({

```diff
-          { n: 1, name: 'LUM', type: 'video', desc: 'Luminance + sync.', expect: 'About 1 V p-p with sync into 75 Ω' },
+          { n: 1, name: 'LUM', type: 'video', desc: 'Luminance + sync.' },
-          { n: 4, name: 'VIDEO OUT', type: 'video', desc: 'Composite video out.', expect: 'About 1 V p-p with sync into 75 Ω' },
+          { n: 4, name: 'VIDEO OUT', type: 'video', desc: 'Composite video out.' },
```

### H123

src/data/commodore.js @@ -2412,8 +2465,9 @@ RCS.add({

```diff
+        pin1: 'right',
-        summary: 'CN6: cartridge ROM, I/O expansion and DMA. Top row 1-22, bottom A-Z (no G, I, O, Q). /GAME and /EXROM set the cartridge map that the PLA decodes. Never plug or unplug with the power on.',
+        summary: 'CN6: cartridge ROM, I/O expansion and DMA. Seen from the rear of the machine (PRG p. 396): top row 22 to 1 with pin 1 at the right, bottom row Z to A with A under 1 (no G, I, O, Q). /GAME and /EXROM set the cartridge map that the PLA decodes. Never plug or unplug with the power on.',
```

### H124

src/data/commodore.js @@ -2575,7 +2629,7 @@ RCS.add({

```diff
-          { n: 5, name: 'VIDEO HIGH', type: 'video', desc: 'Composite video, high level.', expect: 'About 1 V p-p with sync into 75 Ω' },
+          { n: 5, name: 'VIDEO HIGH', type: 'video', desc: 'Composite video, high level.' },
```

### H125

src/data/commodore.js @@ -2719,13 +2773,13 @@ RCS.add({

```diff
-          { n: 6, name: 'SENSE', type: 'io', desc: 'Cassette switch sense.', expect: 'HIGH (+5 V) with no key pressed; LOW with PLAY/REC/FF/REW down' },
+          { n: 6, name: 'SENSE', type: 'io', desc: 'Cassette switch sense.' },
-          { n: 'F', name: 'SENSE', type: 'io', desc: 'Same signal as pin 6.', expect: 'HIGH (+5 V) with no key pressed; LOW with PLAY/REC/FF/REW down' },
+          { n: 'F', name: 'SENSE', type: 'io', desc: 'Same signal as pin 6.' },
```

### H126

src/data/commodore.js @@ -2742,23 +2796,23 @@ RCS.add({

```diff
-          { n: 1, name: 'DIO1', type: 'data', desc: 'Data line 1 (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 2, name: 'DIO2', type: 'data', desc: 'Data line 2 (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 3, name: 'DIO3', type: 'data', desc: 'Data line 3 (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 4, name: 'DIO4', type: 'data', desc: 'Data line 4 (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 5, name: 'EOI', type: 'ctrl', desc: 'End or identify (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 6, name: 'DAV', type: 'ctrl', desc: 'Data valid (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 7, name: 'NRFD', type: 'ctrl', desc: 'Not ready for data (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 8, name: 'NDAC', type: 'ctrl', desc: 'Not data accepted (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 9, name: 'IFC', type: 'ctrl', desc: 'Interface clear (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 10, name: 'SRQ', type: 'ctrl', desc: 'Service request (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 11, name: 'ATN', type: 'ctrl', desc: 'Attention (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
+          { n: 1, name: 'DIO1', type: 'data', desc: 'Data line 1 (active LOW).', verify: true },
+          { n: 2, name: 'DIO2', type: 'data', desc: 'Data line 2 (active LOW).', verify: true },
+          { n: 3, name: 'DIO3', type: 'data', desc: 'Data line 3 (active LOW).', verify: true },
+          { n: 4, name: 'DIO4', type: 'data', desc: 'Data line 4 (active LOW).', verify: true },
+          { n: 5, name: 'EOI', type: 'ctrl', desc: 'End or identify (active LOW).', verify: true },
+          { n: 6, name: 'DAV', type: 'ctrl', desc: 'Data valid (active LOW).', verify: true },
+          { n: 7, name: 'NRFD', type: 'ctrl', desc: 'Not ready for data (active LOW).', verify: true },
+          { n: 8, name: 'NDAC', type: 'ctrl', desc: 'Not data accepted (active LOW).', verify: true },
+          { n: 9, name: 'IFC', type: 'ctrl', desc: 'Interface clear (active LOW).', verify: true },
+          { n: 10, name: 'SRQ', type: 'ctrl', desc: 'Service request (active LOW).', verify: true },
+          { n: 11, name: 'ATN', type: 'ctrl', desc: 'Attention (active LOW).', verify: true },
-          { n: 'A', name: 'DIO5', type: 'data', desc: 'Data line 5 (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 'B', name: 'DIO6', type: 'data', desc: 'Data line 6 (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 'C', name: 'DIO7', type: 'data', desc: 'Data line 7 (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 'D', name: 'DIO8', type: 'data', desc: 'Data line 8 (active LOW).', expect: 'About +5 V idle; LOW when asserted' },
-          { n: 'E', name: 'REN', type: 'ctrl', desc: 'Remote enable (active LOW).' },
+          { n: 'A', name: 'DIO5', type: 'data', desc: 'Data line 5 (active LOW).', verify: true },
+          { n: 'B', name: 'DIO6', type: 'data', desc: 'Data line 6 (active LOW).', verify: true },
+          { n: 'C', name: 'DIO7', type: 'data', desc: 'Data line 7 (active LOW).', verify: true },
+          { n: 'D', name: 'DIO8', type: 'data', desc: 'Data line 8 (active LOW).', verify: true },
+          { n: 'E', name: 'REN', type: 'ctrl', desc: 'Remote enable (active LOW).', verify: true },
```

### H127

src/data/commodore.js @@ -2791,18 +2845,18 @@ RCS.add({

```diff
-          { n: 11, name: 'GRAPHIC', type: 'ctrl', desc: 'Character set (graphic / lower case) select.' },
+          { n: 11, name: 'GRAPHIC', type: 'ctrl', desc: 'Character set (graphic / lower case) select.', verify: true },
-          { n: 'C', name: 'PA0', type: 'io', desc: 'VIA port A bit 0 ($E841, DDR $E843).' },
-          { n: 'D', name: 'PA1', type: 'io', desc: 'VIA port A bit 1 ($E841, DDR $E843).' },
-          { n: 'E', name: 'PA2', type: 'io', desc: 'VIA port A bit 2 ($E841, DDR $E843).' },
-          { n: 'F', name: 'PA3', type: 'io', desc: 'VIA port A bit 3 ($E841, DDR $E843).' },
-          { n: 'H', name: 'PA4', type: 'io', desc: 'VIA port A bit 4 ($E841, DDR $E843).' },
-          { n: 'J', name: 'PA5', type: 'io', desc: 'VIA port A bit 5 ($E841, DDR $E843).' },
-          { n: 'K', name: 'PA6', type: 'io', desc: 'VIA port A bit 6 ($E841, DDR $E843).' },
-          { n: 'L', name: 'PA7', type: 'io', desc: 'VIA port A bit 7 ($E841, DDR $E843).' },
+          { n: 'C', name: 'PA0', type: 'io', desc: 'VIA port A bit 0.' },
+          { n: 'D', name: 'PA1', type: 'io', desc: 'VIA port A bit 1.' },
+          { n: 'E', name: 'PA2', type: 'io', desc: 'VIA port A bit 2.' },
+          { n: 'F', name: 'PA3', type: 'io', desc: 'VIA port A bit 3.' },
+          { n: 'H', name: 'PA4', type: 'io', desc: 'VIA port A bit 4.' },
+          { n: 'J', name: 'PA5', type: 'io', desc: 'VIA port A bit 5.' },
+          { n: 'K', name: 'PA6', type: 'io', desc: 'VIA port A bit 6.' },
+          { n: 'L', name: 'PA7', type: 'io', desc: 'VIA port A bit 7.' },
```

### H128

src/data/commodore.js @@ -2822,16 +2876,16 @@ RCS.add({

```diff
-          { n: 3, name: 'MOTOR', type: 'power', desc: 'Cassette 1 motor supply.', expect: 'Several volts DC with the motor on; 0 V off' },
+          { n: 3, name: 'MOTOR', type: 'power', desc: 'Cassette 1 motor supply.' },
-          { n: 6, name: 'SENSE', type: 'io', desc: 'Cassette 1 switch (#1).', expect: 'HIGH (+5 V) with no key pressed; LOW with PLAY/REC/FF/REW down' },
+          { n: 6, name: 'SENSE', type: 'io', desc: 'Cassette 1 switch (#1).' },
-          { n: 'C', name: 'MOTOR', type: 'power', desc: 'Same signal as pin 3.', expect: 'Several volts DC with the motor on; 0 V off' },
+          { n: 'C', name: 'MOTOR', type: 'power', desc: 'Same signal as pin 3.' },
-          { n: 'F', name: 'SENSE', type: 'io', desc: 'Same signal as pin 6.', expect: 'HIGH (+5 V) with no key pressed; LOW with PLAY/REC/FF/REW down' },
+          { n: 'F', name: 'SENSE', type: 'io', desc: 'Same signal as pin 6.' },
```

### H129

src/data/commodore.js @@ -2848,16 +2902,16 @@ RCS.add({

```diff
-          { n: 3, name: 'MOTOR', type: 'power', desc: 'Cassette 2 motor supply.', expect: 'Several volts DC with the motor on; 0 V off' },
+          { n: 3, name: 'MOTOR', type: 'power', desc: 'Cassette 2 motor supply.' },
-          { n: 6, name: 'SENSE', type: 'io', desc: 'Cassette 2 switch (#2).', expect: 'HIGH (+5 V) with no key pressed; LOW with PLAY/REC/FF/REW down' },
+          { n: 6, name: 'SENSE', type: 'io', desc: 'Cassette 2 switch (#2).' },
-          { n: 'C', name: 'MOTOR', type: 'power', desc: 'Same signal as pin 3.', expect: 'Several volts DC with the motor on; 0 V off' },
+          { n: 'C', name: 'MOTOR', type: 'power', desc: 'Same signal as pin 3.' },
-          { n: 'F', name: 'SENSE', type: 'io', desc: 'Same signal as pin 6.', expect: 'HIGH (+5 V) with no key pressed; LOW with PLAY/REC/FF/REW down' },
+          { n: 'F', name: 'SENSE', type: 'io', desc: 'Same signal as pin 6.' },
```

### H130

src/data/commodore.js @@ -2915,7 +2969,7 @@ RCS.add({

```diff
-          { n: 1, name: '+5 V DC', type: 'power', desc: '+5 V from the supply, through SW1 to the board.', expect: '+4.95 to +5.10 V DC' },
+          { n: 1, name: '+5 V DC', type: 'power', desc: '+5 V from the supply, through SW1 to the board.', expect: '+5 V DC' },
```

### H131

src/data/commodore.js @@ -2947,7 +3001,7 @@ RCS.add({

```diff
-          { label: 'C128 Programmer\'s Reference Guide, Table 12-6 RGBI connector, p. 398', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=407' },
+          { label: 'C128 Programmer\'s Reference Guide, Table 12-6 RGBI connector, p. 398', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=408' },
```

### H132

src/data/commodore.js @@ -2970,7 +3024,7 @@ RCS.add({

```diff
-          { label: 'C128 Programmer\'s Reference Guide, Table 12-5 composite video connector, p. 397', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=406' },
+          { label: 'C128 Programmer\'s Reference Guide, Table 12-5 composite video connector, p. 397', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=407' },
```

### H133

src/data/commodore.js @@ -2991,7 +3045,7 @@ RCS.add({

```diff
-          { label: 'C128 Programmer\'s Reference Guide, Figure 12-5 serial port pinouts, p. 395', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=404' },
+          { label: 'C128 Programmer\'s Reference Guide, Figure 12-5 serial port pinouts, p. 394', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=404' },
```

### H134

src/data/commodore.js @@ -3041,8 +3095,9 @@ RCS.add({

```diff
-        verifiedAgainst: 'C128 Programmer\'s Reference Guide ch. 12, Table 12-9',
-        summary: 'CN1, same layout as the C64 expansion port. /GAME and /EXROM are read by the MMU and the PLA; a C64 cartridge holding either LOW makes the C128 start in C64 mode.',
+        pin1: 'right',
+        verifiedAgainst: 'C128 Programmer\'s Reference Guide ch. 12, Figure 12-11 and Table 12-9',
+        summary: 'CN1, same layout as the C64 expansion port. Seen from the back of the C128 (Figure 12-11): top row 22 to 1 with pin 1 at the right, bottom row Z to A. /GAME and /EXROM are read by the MMU and the PLA; a C64 cartridge holding either LOW makes the C128 start in C64 mode.',
```

### H135

src/data/commodore.js @@ -3090,7 +3145,7 @@ RCS.add({

```diff
-          { label: 'C128 Programmer\'s Reference Guide, Table 12-9 expansion port, p. 400', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=409' },
+          { label: 'C128 Programmer\'s Reference Guide, Figure 12-11 (view from the back of the C128), p. 399, and Table 12-9 expansion port, p. 400', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=409' },
```

### H136

src/data/commodore.js @@ -3115,7 +3170,7 @@ RCS.add({

```diff
-          { label: 'C128 Programmer\'s Reference Guide, Table 12-8 controller ports, p. 399', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=408' },
+          { label: 'C128 Programmer\'s Reference Guide, Table 12-8 controller ports, p. 399', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=409' },
```

### H137

src/data/commodore.js @@ -3142,7 +3197,7 @@ RCS.add({

```diff
-          { label: 'C128 Programmer\'s Reference Guide, Table 12-7 cassette port, p. 399', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=408' },
+          { label: 'C128 Programmer\'s Reference Guide, Table 12-7 cassette port, p. 398', url: 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=408' },
```

### H138

src/data/commodore.js @@ -3194,7 +3249,7 @@ RCS.add({

```diff
-          CBMD_SRC.rc41ii,
+          CBMD_SRC.rc41ii, RCWB.rc41ii,
```

### H139

src/data/commodore.js @@ -3218,7 +3273,7 @@ RCS.add({

```diff
-          CBMD_SRC.rc41,
+          CBMD_SRC.rc41, RCWB.rc41,
```

### H140

src/data/commodore.js @@ -3286,7 +3341,7 @@ RCS.add({

```diff
-        sources: [CBMD_SRC.sch355207, CBMD_SRC.rc41ii],
+        sources: [CBMD_SRC.sch355207, CBMD_SRC.rc41ii, RCWB.rc41ii],
```

### H141

src/data/commodore.js @@ -3335,7 +3390,7 @@ RCS.add({

```diff
-          { label: 'Ray Carlsen 1571 folder: power supply wiring to main board (CN1/CN1A colours, Sams-style drawing)', url: `${CBMD_RC}/1571/PS%20wiring%20to%20main%20board.jpg` , sams: false },
+          { label: 'Ray Carlsen 1571 folder: power supply wiring to main board (CN1/CN1A colours, Sams-style drawing)', url: `${CBMD_RC}/1571/PS%20wiring%20to%20main%20board.jpg` , sams: false }, RCWB.ps1571w,
```

### H142

src/data/commodore.js @@ -3380,7 +3435,7 @@ RCS.add({

```diff
-        sources: [CBMD_SRC.sch81s4, CBMD_SRC.ps312551, CBMD_SRC.rc81],
+        sources: [CBMD_SRC.sch81s4, CBMD_SRC.ps312551, CBMD_SRC.rc81, RCWB.rc81],
```

### H143

src/data/commodore.js @@ -3399,7 +3454,7 @@ RCS.add({

```diff
-        sources: [CBMD_SRC.sch81s4, CBMD_SRC.rc81],
+        sources: [CBMD_SRC.sch81s4, CBMD_SRC.rc81, RCWB.rc81],
```

### H144

src/data/commodore.js @@ -3433,7 +3488,7 @@ RCS.add({

```diff
-        sources: [CBMD_SRC.sch81s2, CBMD_SRC.rc81],
+        sources: [CBMD_SRC.sch81s2, CBMD_SRC.rc81, RCWB.rc81],
```

### H145

src/data/commodore.js @@ -3462,17 +3517,21 @@ RCS.add({

```diff
+          { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
+          { label: 'TI µA7800 series data sheet SLVS056P, 7.5 uA7805 electrical characteristics: rated for 7 V to 20 V in; dropout 2 V typical at 1 A, p. 6', url: 'https://www.ti.com/lit/ds/symlink/ua78.pdf#page=6' },
-        { rail: '+9 V DC in', expect: 'About +9 V DC (above 7.5 V)', where: 'c16-power pin 2 (CN8); 7805 VR1 input', note: 'Below about 7.5 V the 7805 drops out.', conflict: 'Sams CC8 expects about 13 V DC at the power pack plug with the C16 disconnected; 9 V DC is the loaded rating on schematic 251788. Both can be right: the pack is unregulated.' },
+        { rail: '+9 V DC in', expect: 'About +9 V DC', where: 'c16-power pin 2 (CN8); 7805 VR1 input', note: 'TI rates the 7805 for 7 V to 20 V in (2 V typical dropout), so below about 7 V it stops regulating.', conflict: 'Sams CC8 expects about 13 V DC at the power pack plug with the C16 disconnected; 9 V DC is the loaded rating on schematic 251788. Both can be right: the pack is unregulated.' },
+        { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
+        { label: 'C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 11', url: 'https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf#page=11' },
```

### H146

src/data/commodore.js @@ -3566,6 +3625,7 @@ RCS.add({

```diff
+        RCWB.rc64blank,
```

### H147

src/data/commodore.js @@ -3609,6 +3669,7 @@ RCS.add({

```diff
+        RCWB.rcvic20,
```

### H148

src/data/commodore.js @@ -3635,7 +3696,7 @@ RCS.add({

```diff
-        { rail: '+9 V unregulated', expect: 'About +9 to +10 V DC', where: 'J8 pin 2 (also J10/J11 raw power headers)', note: 'Input to the +5 V regulators.' },
+        { rail: '+9 V unregulated', expect: 'About +9 to +10 V DC', where: 'J8 pin 2; J11 pins 1, 4, 6 (raw power header)', note: 'Input to the +5 V regulators.' },
```

### H149

src/data/commodore.js @@ -3646,7 +3707,7 @@ RCS.add({

```diff
-        output: '+5 V (2 × LM340-5), +12 V (7812), -5 V (7905), from +9 V, +16 V and -9 V unregulated feeds on J8',
+        output: '+5 V (2 × LM340-5), +12 V (7812), -5 V (7905). The transformer AC enters on J8 (pins 1/4/5 and 8/9 to the on-board bridges CR1-CR9); the raw +16 V (pins 4, 5) and -9 V (pins 1, 2) are on J10, and +9 V unregulated on J11 (pins 1, 4, 6) and J8 pin 2',
```

### H150

src/data/commodore.js @@ -3742,12 +3803,12 @@ RCS.add({

```diff
-          { label: '1540/1541 Service Manual 314002-01, specification (120 V AC, 30 W), PDF p. 5', url: CBMD_SM41(5) },
+          { label: '1540/1541 Service Manual 314002-01, specification (120 V AC, 30 W), PDF p. 4', url: CBMD_SM41(4) },
-          CBMD_SRC.rc41,
+          CBMD_SRC.rc41, RCWB.rc41,
-          CBMD_SRC.rc41ii,
+          CBMD_SRC.rc41ii, RCWB.rc41ii,
```

### H151

src/data/commodore.js @@ -3771,7 +3832,7 @@ RCS.add({

```diff
-        CBMD_SRC.rc41,
+        CBMD_SRC.rc41, RCWB.rc41,
```

### H152

src/data/commodore.js @@ -3805,7 +3866,9 @@ RCS.add({

```diff
+          RCWB.ps1571,
+          RCWB.ps1571w,
```

### H153

src/data/commodore.js @@ -3861,8 +3924,8 @@ RCS.add({

```diff
-          CBMD_SRC.rc81,
-          CBMD_SRC.rc41ii,
+          CBMD_SRC.rc81, RCWB.rc81,
+          CBMD_SRC.rc41ii, RCWB.rc41ii,
```

### H154

src/data/commodore.js @@ -3880,7 +3943,7 @@ RCS.add({

```diff
-        CBMD_SRC.rc81,
+        CBMD_SRC.rc81, RCWB.rc81,
```

### H155

src/data/commodore.js @@ -4553,7 +4616,7 @@ RCS.add({

```diff
-        CBMD_SRC.rc41,
+        CBMD_SRC.rc41, RCWB.rc41,
```

### H156

src/data/commodore.js @@ -4679,7 +4742,7 @@ RCS.add({

```diff
-        CBMD_SRC.rc81,
+        CBMD_SRC.rc81, RCWB.rc81,
```

### H157

src/data/dragon.js @@ -184,7 +184,7 @@ const serPins = [

```diff
-    id: 'dragon-cart', name: 'Cartridge port', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even',
+    id: 'dragon-cart', name: 'Cartridge port', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even', verify: true,
```

### H158

src/data/dragon.js @@ -266,7 +266,7 @@ const d32Connectors = [

```diff
-    id: 'dragon-cart', name: 'Cartridge port (PL7)', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even',
+    id: 'dragon-cart', name: 'Cartridge port (PL7)', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even', verify: true,
```

### H159

src/data/dragon.js @@ -556,7 +556,7 @@ RCS.add({

```diff
-      summary: 'Two 4-to-1 analogue switches sharing the select lines A and B (PIA0 CA2 and CB2). The X half picks one of four joystick pots for the comparator; the Y half picks the sound source (DAC, cassette, cartridge, unused) and is enabled by PIA1 CB2. Dragon Data lists it first for joystick, cassette and no-sound faults. CMOS: handle it with static care.',
+      summary: 'Two 4-to-1 analogue switches sharing the select lines A and B (PIA0 CA2 and CB2). The X half picks one of four joystick pots for the comparator; the Y half picks the sound source (DAC, cassette, cartridge, unused) and is enabled by PIA1 CB2. Dragon 32 and 64 (SA2120 sheet 2, IC20): STX (pin 1) is tied to +5 V; X0-X3 are right X, right Y, left X, left Y (JOYSTK(0) to (3)); Z (pin 9) goes to the LM393 comparator through R55 (10 kΩ); Y0 is the 6-bit DAC, Y1 cassette in, Y2 cartridge sound (cartridge pin 35), Y3 held LOW; W (pin 10) feeds the modulator and the monitor socket; STY (pin 15) comes from CB2 of the $FF20 PIA. CoCo 1 (8000073 sheet 2, U9): Z goes through R48 to the LM339 comparator U14, and the sound inputs are the DAC (pin 14), cassette in (13) and cartridge sound (12), with pin 11 grounded. Dragon Data lists it first for joystick, cassette and no-sound faults. CMOS: handle it with static care.',
```

### H160

src/data/dragon.js @@ -564,28 +564,29 @@ RCS.add({

```diff
-      verifiedAgainst: 'Motorola MC14529B data sheet, block diagram and truth table, p. 7-457 (1978 Motorola CMOS Data Book); Dragon wiring from SA2120 sheet 2 (IC20) and Inside the Dragon pp. 208-209, 221',
+      verifiedAgainst: 'Motorola MC14529B data sheet, block diagram and truth table, p. 7-457 (1978 Motorola CMOS Data Book); Dragon wiring from SA2120 sheet 2 (IC20) and Inside the Dragon pp. 208-209, 221; CoCo 1 wiring from Tandy 8000073 sheet 2 (U9)',
+        { label: 'Color Computer schematic 8000073, sheet 2 (U9 MC14529B, U14 LM339), p. 71', url: 'https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%201%20Schematic%20(Tandy).pdf#page=2' },
-        { n: 1, name: 'STX', type: 'ctrl', dir: 'in', desc: 'Strobe X: enables the X half. Tied to +5 V on the Dragon, so the joystick channel is always on.', probe: 'HIGH' },
-        { n: 2, name: 'X0', type: 'io', dir: 'bidir', desc: 'X input 0: right joystick X (JOYSTK(0)).', terms: ['mux'], probe: '0–5 V with the stick' },
-        { n: 3, name: 'X1', type: 'io', dir: 'bidir', desc: 'X input 1: right joystick Y (JOYSTK(1)).', terms: ['mux'] },
-        { n: 4, name: 'X2', type: 'io', dir: 'bidir', desc: 'X input 2: left joystick X (JOYSTK(2)).', terms: ['mux'] },
-        { n: 5, name: 'X3', type: 'io', dir: 'bidir', desc: 'X input 3: left joystick Y (JOYSTK(3)).', terms: ['mux'] },
-        { n: 6, name: 'A', type: 'ctrl', dir: 'in', desc: 'Select bit A (LSB), from CA2 of the $FF00 PIA.' },
-        { n: 7, name: 'B', type: 'ctrl', dir: 'in', desc: 'Select bit B (MSB), from CB2 of the $FF00 PIA.' },
+        { n: 1, name: 'STX', type: 'ctrl', dir: 'in', desc: 'Strobe X: HIGH enables the X half; with STY also LOW the outputs are high impedance.' },
+        { n: 2, name: 'X0', type: 'io', dir: 'bidir', desc: 'X input 0, switched to Z when B and A are both LOW.', terms: ['mux'] },
+        { n: 3, name: 'X1', type: 'io', dir: 'bidir', desc: 'X input 1 (B LOW, A HIGH).', terms: ['mux'] },
+        { n: 4, name: 'X2', type: 'io', dir: 'bidir', desc: 'X input 2 (B HIGH, A LOW).', terms: ['mux'] },
+        { n: 5, name: 'X3', type: 'io', dir: 'bidir', desc: 'X input 3 (B and A HIGH).', terms: ['mux'] },
+        { n: 6, name: 'A', type: 'ctrl', dir: 'in', desc: 'Select bit A (LSB), common to both halves.' },
+        { n: 7, name: 'B', type: 'ctrl', dir: 'in', desc: 'Select bit B (MSB), common to both halves.' },
-        { n: 9, name: 'Z', type: 'io', dir: 'bidir', desc: 'X-half output: the selected pot, to the LM393 comparator through R55 (10 kΩ).', terms: ['mux'] },
-        { n: 10, name: 'W', type: 'audio', dir: 'bidir', desc: 'Y-half output: the selected sound source, to the modulator and the monitor socket.', terms: ['mux'] },
-        { n: 11, name: 'Y3', type: 'io', dir: 'bidir', desc: 'Y input 3: not used (held LOW).', terms: ['mux'] },
-        { n: 12, name: 'Y2', type: 'audio', dir: 'bidir', desc: 'Y input 2: cartridge sound (ESND, cartridge pin 35).', terms: ['mux'] },
-        { n: 13, name: 'Y1', type: 'audio', dir: 'bidir', desc: 'Y input 1: cassette input.', terms: ['mux'] },
-        { n: 14, name: 'Y0', type: 'audio', dir: 'bidir', desc: 'Y input 0: the 6-bit DAC.', terms: ['mux'] },
-        { n: 15, name: 'STY', type: 'ctrl', dir: 'in', desc: 'Strobe Y: sound enable from CB2 of the $FF20 PIA. LOW turns the Y half off for single-bit sound.' },
+        { n: 9, name: 'Z', type: 'io', dir: 'bidir', desc: 'X-half output: the selected X input.', terms: ['mux'] },
+        { n: 10, name: 'W', type: 'audio', dir: 'bidir', desc: 'Y-half output: the selected Y input.', terms: ['mux'] },
+        { n: 11, name: 'Y3', type: 'io', dir: 'bidir', desc: 'Y input 3 (B and A HIGH).', terms: ['mux'] },
+        { n: 12, name: 'Y2', type: 'audio', dir: 'bidir', desc: 'Y input 2 (B HIGH, A LOW).', terms: ['mux'] },
+        { n: 13, name: 'Y1', type: 'audio', dir: 'bidir', desc: 'Y input 1 (B LOW, A HIGH).', terms: ['mux'] },
+        { n: 14, name: 'Y0', type: 'audio', dir: 'bidir', desc: 'Y input 0, switched to W when B and A are both LOW.', terms: ['mux'] },
+        { n: 15, name: 'STY', type: 'ctrl', dir: 'in', desc: 'Strobe Y: HIGH enables the Y half; LOW turns it off (high impedance output when STX is also LOW).' },
```

### H161

src/data/heathkit.js @@ -59,13 +59,13 @@ RCS.add({

```diff
-      summary: 'The 6800-family CPU with no internal RAM. Its own oscillator divides the crystal by four to make the E clock. HERO Jr ties /HALT and MR high and pulls /IRQ up with R202; the HERO 1 ABORT switch drives /NMI (P403 pin 23). HERO 1 ties RE to ground as the datasheet requires. HERO Jr: 4 MHz crystal Y201, E = 1 MHz; HERO 1: 3.58 MHz (ROM 1.0) or 4 MHz. A dead CPU shows as a dead display and no speech; check the crystal, RESET and Vcc first.',
+      summary: 'The 6800-family CPU with no internal RAM. Its own oscillator divides the crystal by four to make the E clock. HERO Jr ties /HALT and MR high and pulls /IRQ up with R202; the HERO 1 ABORT switch drives /NMI (P403 pin 23). HERO 1 ties RE (pin 36) to ground with pins 1 and 21 (ET-18 schematic sheet 2, U401). HERO Jr: 4 MHz crystal Y201, E = 1 MHz; HERO 1: 3.58 MHz (ROM 1.0) or 4 MHz. A dead CPU shows as a dead display and no speech; check the crystal, RESET and Vcc first.',
-      datasheets: [{ label: 'Motorola MC6802/6808 datasheet DS9818-R3 (1984), pin assignment p. 1, signals p. 7-8', url: 'https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf#page=1' }],
-      verifiedAgainst: 'Motorola DS9818-R3 (pin assignment p. 1, signal descriptions p. 7-8, MR p. 11). HERO Jr TM printed p. 25-26; HERO 1 TM printed p. 78 (U401).',
+      datasheets: [{ label: 'Motorola MC6802/6808 datasheet DS9818-R3 (1984), pin assignment p. 1, signals p. 7-8', url: 'https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf#page=1' }, { label: 'ET-18 Schematics sheet 2 of 4, CPU board (U401 pins 1, 21, 36 to ground) (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Schematics%20sheet%202%20of%204%20%28arm%20drive%2C%20cpu%2C%20charger%29.pdf' }],
+      verifiedAgainst: 'Motorola DS9818-R3 (pin assignment p. 1, signal descriptions p. 7-8, MR p. 11). HERO Jr TM printed p. 25-26; HERO 1 TM printed p. 78 (U401); ET-18 schematic sheet 2 (U401).',
-        { part: 'MC6802', kind: 'pin-compatible', note: 'The same chip with 128 bytes of RAM at $0000-$007F; the data sheet calls the 6808 "identical to the MC6802 without on-board RAM". The RAM is off when RE (pin 36) is low, so a 6802 works where the board grounds RE, as the HERO 1 does. With RE high the internal RAM answers at $0000-$007F on top of the board\'s RAM. Check pin 36 on a HERO Jr before fitting one.', source: { label: 'Motorola MC6802/6808 data sheet DS9818-R3, p. 1 (description, ordering, pin assignment)', url: DS6808(1) } },
+        { part: 'MC6802', kind: 'pin-compatible', note: 'The same chip with 128 bytes of RAM at $0000-$007F; the data sheet calls the 6808 "identical to the MC6802 without on-board RAM". The RAM is off when RE (pin 36) is low, so a 6802 works where the board grounds RE, as the HERO 1 does (ET-18 schematic sheet 2: U401 pin 36 to ground). With RE high the internal RAM answers at $0000-$007F on top of the board\'s RAM. Check pin 36 on a HERO Jr before fitting one.', source: { label: 'Motorola MC6802/6808 data sheet DS9818-R3, p. 1 (description, ordering, pin assignment)', url: DS6808(1) } },
```

### H162

src/data/heathkit.js @@ -75,7 +75,7 @@ RCS.add({

```diff
-        { n: 7, name: 'BA', type: 'ctrl', dir: 'out', desc: 'Bus available: high when the CPU has stopped and freed the bus.', terms: ['ba'] },
+        { n: 7, name: 'BA', type: 'ctrl', dir: 'out', desc: 'Bus available: HIGH when the CPU has stopped (halt or WAI). The data outputs are off, but the address outputs stay driven (not three-state), so another bus master must not drive the address bus.', terms: ['ba'] },
```

### H163

src/data/heathkit.js @@ -112,7 +112,7 @@ RCS.add({

```diff
-      role: 'Two 8-bit parallel ports with handshake lines. Keypad, sensor, motor and speech control on HERO Jr.', pkg: 'DIP-40',
+      role: 'Two 8-bit parallel ports with handshake lines.', pkg: 'DIP-40',
```

### H164

src/data/heathkit.js @@ -202,9 +202,9 @@ RCS.add({

```diff
-      role: 'Program and data RAM. Stock RAM on both robots.', pkg: 'DIP-24',
+      role: '2K x 8 static RAM.', pkg: 'DIP-24',
-      summary: 'A 2K x 8 static RAM, the stock RAM on both robots. HERO 1 has two (U416 at $0000-$07FF, U415 at $0800-$0FFF) on the retained VSB rail during sleep. HERO Jr has one at U203 and takes 8K parts in U204/U205 for BASIC; its supply jumpers (J202, J204, J206) decide whether RAM keeps its contents during sleep. A bad bit shows as a program that fails in one place.',
+      summary: 'A 2K x 8 static RAM; the stock RAM on the HERO 1 and HERO Jr. HERO 1 has two (U416 at $0000-$07FF, U415 at $0800-$0FFF) on the retained VSB rail during sleep. HERO Jr has one at U203 and takes 8K parts in U204/U205 for BASIC; its supply jumpers (J202, J204, J206) decide whether RAM keeps its contents during sleep. A bad bit shows as a program that fails in one place.',
```

### H165

src/data/heathkit.js @@ -240,9 +240,9 @@ RCS.add({

```diff
-      role: 'HERO 1 system monitor ROM at U418 ($E000-$FFFF).', pkg: 'DIP-28',
+      role: '8K x 8 ROM or EPROM in the JEDEC 2764 pinout.', pkg: 'DIP-28',
-      summary: 'The 8K x 8 monitor ROM (Heath 444-198-1, available only from Heath). It sits at $E000-$FFFF. Jumpers J2, J4 and J6 must be set for the 8K part, and J12 keeps the optional U417 ROM from overlapping. A bad ROM gives a dead robot or a wrong banner. The monitor version must match the drive board.',
+      summary: 'Generic 2764 pinout; the pin text below is the EPROM. ColecoVision (U2): the stock 9464C mask ROM is wired differently (A11, A12 and enable); this map applies only after the WJ4/WJ5 conversion for a 2764. BBC Model B (IC88): the DFS or DNFS EPROM when fitted. HERO 1 (U418): the 8K x 8 monitor ROM (Heath 444-198-1, available only from Heath). It sits at $E000-$FFFF. Jumpers J2, J4 and J6 must be set for the 8K part, and J12 keeps the optional U417 ROM from overlapping. A bad ROM gives a dead robot or a wrong banner. The monitor version must match the drive board.',
```

### H166

src/data/heathkit.js @@ -283,9 +283,9 @@ RCS.add({

```diff
-      role: 'HERO Jr monitor ROMs at U207 and U208 (16K each).', pkg: 'DIP-28',
+      role: '16K x 8 ROM or EPROM in the JEDEC 27128 pinout.', pkg: 'DIP-28',
-      summary: 'The two 16K x 8 monitor ROMs. U207 is 444-283 and U208 is 444-254; errata notice 591-4523 revises both. The decoder U202 selects them across $8000-$BFFF and $E000-$FFFF (U208). A bad ROM gives a robot that will not boot, or a boot that stops at the same point each time. Check the errata revision before swapping.',
+      summary: 'HERO Jr: the two 16K x 8 monitor ROMs. U207 is 444-283 and U208 is 444-254; errata notice 591-4523 revises both. The decoder U202 selects them across $8000-$BFFF and $E000-$FFFF (U208). A bad ROM gives a robot that will not boot, or a boot that stops at the same point each time. Check the errata revision before swapping.',
```

### H167

src/data/heathkit.js @@ -326,15 +326,15 @@ RCS.add({

```diff
-      role: 'Clock, calendar, alarm and 50 bytes of battery-backed RAM. HERO Jr U213.', pkg: 'DIP-24',
+      role: 'Clock, calendar, alarm and 50 bytes of battery-backed RAM.', pkg: 'DIP-24',
-      summary: 'The clock chip at $D810-$D81F. It is multiplexed: the CPU puts an address on AD0-AD7, strobes AS, then reads or writes the data. It keeps time on a 32.768 kHz crystal. It has no battery pin: on HERO Jr its VDD comes from U209 (Vca), which stays on in sleep while SW1 is ON, so turning POWER off loses the time. /STBY blocks bus access while the main supply is down. Its IRQ pulses the sleep wake path every 5 s. A dead RTC gives a wrong or stopped clock and failed boot checks.',
+      summary: 'A multiplexed-bus clock: the CPU puts an address on AD0-AD7, strobes AS, then reads or writes the data. It keeps time on a 32.768 kHz crystal and has no battery pin, so it keeps time only while VDD stays up. /STBY blocks bus access while the main supply is down. A dead RTC gives a wrong or stopped clock and failed boot checks. HERO Jr (U213): decoded at $D810-$D81F; MOT tied high; VDD comes from U209 (Vca), which stays on in sleep while SW1 is ON, so turning POWER off loses the time; the RESET key drives /RESET; /IRQ feeds the sleep wake path (not the CPU) and pulses it every 5 s; the ROM sets SQW to 256 Hz. BBC Master (IC11): not memory-mapped; the system VIA and its addressable latch drive the clock enable, R/W, address strobe and data (Master Series Service Manual pp. 21, 23), with a 3 V lithium cell for backup.',
-      datasheets: [{ label: 'Motorola MC146818A datasheet ADI-1026 (1984), pinout p. 1, signals p. 8-10', url: 'https://www.scs.stanford.edu/22wi-cs212/pintos/specs/mc146818a.pdf#page=1' }],
+      datasheets: [{ label: 'Motorola MC146818A datasheet ADI-1026 (1984), pinout p. 1, signals p. 8-10', url: 'https://www.scs.stanford.edu/22wi-cs212/pintos/specs/mc146818a.pdf#page=1' }, { label: 'Master Series Service Manual, real time clock and system VIA addressable latch, pp. 21, 23', url: 'https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=21' }],
-        { n: 1, name: 'MOT', type: 'ctrl', dir: 'in', desc: 'Bus timing select: high = Motorola-style timing (AS, DS). Tie high on HERO Jr.' },
+        { n: 1, name: 'MOT', type: 'ctrl', dir: 'in', desc: 'Bus timing select: high = Motorola-style timing (AS, DS), low = Intel-style.' },
```

### H168

src/data/heathkit.js @@ -346,22 +346,22 @@ RCS.add({

```diff
-        { n: 13, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select, active low. Decoded from the $D810 region.', terms: ['cs', 'active-low'] },
+        { n: 13, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select, active low.', terms: ['cs', 'active-low'] },
-        { n: 18, name: '/RESET', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Reset: clears the interrupt enables but not time or RAM. The RESET key drives it on HERO Jr.', terms: ['reset', 'active-low'] },
-        { n: 19, name: '/IRQ', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Interrupt, open drain. On HERO Jr it feeds the sleep wake path, not the CPU.', terms: ['irq', 'open-drain'] },
+        { n: 18, name: '/RESET', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Reset: clears the interrupt enables but not time or RAM.', terms: ['reset', 'active-low'] },
+        { n: 19, name: '/IRQ', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Interrupt request, open drain.', terms: ['irq', 'open-drain'] },
-        { n: 23, name: 'SQW', type: 'ctrl', dir: 'out', desc: 'Square-wave output. Rate set by register A; the HERO Jr ROM programs it to 256 Hz (JR spec).' },
+        { n: 23, name: 'SQW', type: 'ctrl', dir: 'out', desc: 'Square-wave output. Rate set by register A.' },
-      role: 'Serial port for the RS-232 accessory (RTA-1-3). HERO Jr U216.', pkg: 'DIP-24',
+      role: 'Asynchronous serial interface (ACIA).', pkg: 'DIP-24',
```

### H169

src/data/heathkit.js @@ -399,7 +399,7 @@ RCS.add({

```diff
-      role: 'Address decoder. HERO 1 uses four for memory and I/O selects.', pkg: 'DIP-16',
+      role: '3-to-8 line address decoder.', pkg: 'DIP-16',
```

### H170

src/data/heathkit.js @@ -514,7 +514,7 @@ RCS.add({

```diff
-        { part: 'TL852CN', kind: 'pin-compatible', note: 'Still made by TI (status ACTIVE on 2026-10-30); CN is the DIP-16. Replace the TL851 and TL852 as a pair only if both are suspect: R358, R359 and R361 set the bias, gain and detect level around this one.', source: { label: 'TI TL852 product page', url: 'https://www.ti.com/product/TL852' } },
+        { part: 'TL852CN', kind: 'pin-compatible', note: 'Still made by TI (status ACTIVE on 2026-10-30); CN is the DIP-16.', source: { label: 'TI TL852 product page', url: 'https://www.ti.com/product/TL852' } },
```

### H171

src/data/heathkit.js @@ -544,7 +544,7 @@ RCS.add({

```diff
-        { part: 'MSM5832RS (new old stock)', kind: 'pin-compatible', note: 'No modern pin-compatible clock chip was found (searched 2026-10-30); the DIP-18 MSM5832RS itself is only new old stock. Parts such as the DS12887 have a different pinout and bus, so they need an adapter and new software.', source: { label: 'OKI 1986 Microprocessor Data Book, MSM5832RS data sheet, p. 251', url: 'https://bitsavers.org/components/oki/_dataBooks/1986_OKI_Microprocessor_Databook.pdf#page=254' } },
+        { part: 'MSM5832RS (new old stock)', kind: 'pin-compatible', verify: true, note: 'No modern pin-compatible clock chip was found (searched 2026-10-30); the DIP-18 MSM5832RS itself is only new old stock. Parts such as the DS12887 have a different pinout and bus, so they need an adapter and new software.', source: { label: 'OKI 1986 Microprocessor Data Book, MSM5832RS data sheet, p. 251', url: 'https://bitsavers.org/components/oki/_dataBooks/1986_OKI_Microprocessor_Databook.pdf#page=254' } },
```

### H172

src/data/heathkit.js @@ -594,7 +594,7 @@ RCS.add({

```diff
-        { part: 'SSI 263A / SSI 263AP (new old stock)', kind: 'pin-compatible', note: 'The Silicon Systems part that the SC-02 is the same as. None is made any more and no emulator module was found (searched 2026-10-30): only new old stock, at collector prices.', source: { label: 'Silicon Systems 1985 Data Book, SSI 263A data sheet, p. 1-42', url: 'https://bitsavers.org/components/siliconSystems/_dataBooks/1985_Silicon_Systems_Data_Book.pdf#page=50' } },
+        { part: 'SSI 263A / SSI 263AP (new old stock)', kind: 'pin-compatible', verify: true, note: 'The Silicon Systems part that the SC-02 is the same as. None is made any more and no emulator module was found (searched 2026-10-30): only new old stock, at collector prices.', source: { label: 'Silicon Systems 1985 Data Book, SSI 263A data sheet, p. 1-42', url: 'https://bitsavers.org/components/siliconSystems/_dataBooks/1985_Silicon_Systems_Data_Book.pdf#page=50' } },
```

### H173

src/data/heathkit.js @@ -695,13 +695,13 @@ RCS.add({

```diff
-          { n: 3, name: 'LOGIC CHG OUT', type: 'power', desc: 'Logic charge regulator output, from power supply board P202 pin 15.', expect: 'About 13.9 V DC with the charger on' },
+          { n: 3, name: 'LOGIC CHG OUT', type: 'power', desc: 'Logic charge regulator output, from power supply board P202 pin 15.', expect: '13.9 V float once the batteries are near full; lower while the charger is in current limit into low batteries' },
-          { n: 5, name: 'MOTOR CHG OUT', type: 'power', desc: 'Motor charge regulator output, from P202 pin 22.', expect: 'About 13.9 V DC with the charger on' },
+          { n: 5, name: 'MOTOR CHG OUT', type: 'power', desc: 'Motor charge regulator output, from P202 pin 22.', expect: '13.9 V float once the batteries are near full; lower while the charger is in current limit into low batteries' },
-          { n: 8, name: 'CHG IN (LOGIC)', type: 'power', desc: 'Charger + to logic regulator U201 input (P202 pin 14). The plug joins 8 and 9.', expect: '+25 to +27 V DC with the charger on' },
-          { n: 9, name: 'CHG IN (MOTOR)', type: 'power', desc: 'Charger + to motor regulator U204 input (P202 pin 23).', expect: '+25 to +27 V DC with the charger on' },
+          { n: 8, name: 'CHG IN (LOGIC)', type: 'power', desc: 'Charger + to logic regulator U201 input (P202 pin 14). The plug joins 8 and 9.', expect: 'About 27 V near full charge; falls to as little as 14 V while the charger is in current limit into nearly discharged batteries' },
+          { n: 9, name: 'CHG IN (MOTOR)', type: 'power', desc: 'Charger + to motor regulator U204 input (P202 pin 23).', expect: 'About 27 V near full charge; falls to as little as 14 V while the charger is in current limit into nearly discharged batteries' },
```

### H174

src/data/heathkit.js @@ -718,20 +718,21 @@ RCS.add({

```diff
-          { n: 3, name: 'LOGIC BATT +', type: 'power', desc: 'Logic battery + (+12 V system).', expect: '10-13.9 V DC' },
-          { n: 4, name: '+5V', type: 'power', desc: '+5 V logic from the switching regulator (joined to 5).', expect: '4.9-5.1 V DC', verify: true },
-          { n: 5, name: '+5V', type: 'power', desc: '+5 V logic.', expect: '4.9-5.1 V DC', verify: true },
+          { n: 3, name: 'LOGIC BATT +', type: 'power', desc: 'Logic battery + (+12 V system).', expect: '+12 V battery: 13.9 V float on charge; below 10 V the robot flags a low battery (TM printed p. 73)' },
+          { n: 4, name: '+5V', type: 'power', desc: '+5 V logic from the switching regulator (joined to 5).', expect: '+5 V DC', verify: true },
+          { n: 5, name: '+5V', type: 'power', desc: '+5 V logic.', expect: '+5 V DC', verify: true },
-          { n: 10, name: 'MOTOR BATT +', type: 'power', desc: 'Motor battery + (+12 V system).', expect: '10-13.9 V DC' },
+          { n: 10, name: 'MOTOR BATT +', type: 'power', desc: 'Motor battery + (+12 V system).', expect: '+12 V battery: 13.9 V float on charge; below 10 V the robot flags a low battery (TM printed p. 73)' },
-          { label: 'ET-18 Block Interconnect Diagram (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Block%20Interconnect%20Diagram.pdf' }
+          { label: 'ET-18 Block Interconnect Diagram (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Block%20Interconnect%20Diagram.pdf' },
+          { label: 'ET-18 Technical Manual, charger regulating and low voltage sense circuits, printed pp. 72-73 (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=85' }
```

### H175

src/data/heathkit.js @@ -739,37 +740,37 @@ RCS.add({

```diff
-          { n: 14, name: 'LOGIC REG IN', type: 'power', desc: 'Charger + into logic regulator U201 (from socket pin 8).', expect: '+25 to +27 V DC with the charger on' },
+          { n: 14, name: 'LOGIC REG IN', type: 'power', desc: 'Charger + into logic regulator U201 (from socket pin 8).', expect: 'About 27 V near full charge; falls to as little as 14 V while the charger is in current limit into nearly discharged batteries' },
-          { n: 20, name: '+12V STEERING', type: 'power', desc: '+12 V for the steering motor; joined to 21 (motor battery via SW2).', expect: '10-13.9 V DC' },
+          { n: 20, name: '+12V STEERING', type: 'power', desc: '+12 V for the steering motor; joined to 21 (motor battery via SW2).', expect: '+12 V battery: 13.9 V float on charge; below 10 V the robot flags a low battery' },
-          { n: 23, name: 'MOTOR REG IN', type: 'power', desc: 'Charger + into U204 (from socket pin 9). About 27 V here near full charge (TM).', expect: '+25 to +27 V DC with the charger on' },
+          { n: 23, name: 'MOTOR REG IN', type: 'power', desc: 'Charger + into U204 (from socket pin 9). About 27 V here near full charge (TM).', expect: 'About 27 V near full charge; falls to as little as 14 V while the charger is in current limit into nearly discharged batteries' },
-          { label: 'ET-18 Technical Manual, charger regulating circuits, printed p. 73 (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=84' }
+          { label: 'ET-18 Technical Manual, charger regulating circuits, printed pp. 72-73 (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=84' }
-          { n: 1, name: 'RESET', type: 'ctrl', desc: 'One side of the RESET button; the other side is ground. Pressing it sends a reset pulse to the 6808.' },
-          { n: 2, name: '/D0', type: 'data', desc: 'Inverted data bus D0: the segment on/off bit for the display latches.' },
-          { n: 3, name: 'BA0', type: 'addr', desc: 'Buffered address: selects the segment within a digit.' },
-          { n: 4, name: 'BA1', type: 'addr', desc: 'Buffered address: segment select.' },
-          { n: 5, name: 'BA2', type: 'addr', desc: 'Buffered address: segment select.' },
-          { n: 6, name: 'DISPLAY POWER', type: 'power', desc: 'Display power control from $C2E0 bit 4; logic 1 turns the display board on.' },
-          { n: 7, name: 'BA4', type: 'addr', desc: 'Buffered address: selects the digit.' },
-          { n: 8, name: 'BA5', type: 'addr', desc: 'Buffered address: digit select.' },
-          { n: 9, name: 'BA6', type: 'addr', desc: 'Buffered address: digit select.' },
-          { n: 10, name: '/DISP SEL', type: 'ctrl', desc: 'Display address select; low at $C110 enables the 74LS42 digit selector.' }
+          { n: 1, name: 'RESET', type: 'ctrl', desc: 'One side of the RESET button; the other side is ground. Pressing it sends a reset pulse to the 6808.', verify: true },
+          { n: 2, name: '/D0', type: 'data', desc: 'Inverted data bus D0: the segment on/off bit for the display latches.', verify: true },
+          { n: 3, name: 'BA0', type: 'addr', desc: 'Buffered address: selects the segment within a digit.', verify: true },
+          { n: 4, name: 'BA1', type: 'addr', desc: 'Buffered address: segment select.', verify: true },
+          { n: 5, name: 'BA2', type: 'addr', desc: 'Buffered address: segment select.', verify: true },
+          { n: 6, name: 'DISPLAY POWER', type: 'power', desc: 'Display power control from $C2E0 bit 4; logic 1 turns the display board on.', verify: true },
+          { n: 7, name: 'BA4', type: 'addr', desc: 'Buffered address: selects the digit.', verify: true },
+          { n: 8, name: 'BA5', type: 'addr', desc: 'Buffered address: digit select.', verify: true },
+          { n: 9, name: 'BA6', type: 'addr', desc: 'Buffered address: digit select.', verify: true },
+          { n: 10, name: '/DISP SEL', type: 'ctrl', desc: 'Display address select; low at $C110 enables the 74LS42 digit selector.', verify: true }
```

### H176

src/data/heathkit.js @@ -777,16 +778,16 @@ RCS.add({

```diff
-          { n: 11, name: 'ROW', type: 'kbd', desc: 'Key sense row input (one of six; bit order not given).' },
-          { n: 12, name: 'ROW', type: 'kbd', desc: 'Key sense row input.' },
-          { n: 13, name: 'ROW', type: 'kbd', desc: 'Key sense row input.' },
-          { n: 14, name: 'ROW', type: 'kbd', desc: 'Key sense row input.' },
-          { n: 15, name: 'ROW', type: 'kbd', desc: 'Key sense row input.' },
-          { n: 16, name: 'ROW', type: 'kbd', desc: 'Key sense row input.' },
-          { n: 17, name: '+5V', type: 'power', desc: '+5 V logic power from the power supply.', expect: '4.9-5.1 V DC' },
-          { n: 18, name: '+5V', type: 'power', desc: '+5 V logic power.', expect: '4.9-5.1 V DC' },
-          { n: 19, name: 'GND', type: 'ground', desc: 'Ground.' },
-          { n: 20, name: 'GND', type: 'ground', desc: 'Ground.' }
+          { n: 11, name: 'ROW', type: 'kbd', desc: 'Key sense row input (one of six; bit order not given).', verify: true },
+          { n: 12, name: 'ROW', type: 'kbd', desc: 'Key sense row input.', verify: true },
+          { n: 13, name: 'ROW', type: 'kbd', desc: 'Key sense row input.', verify: true },
+          { n: 14, name: 'ROW', type: 'kbd', desc: 'Key sense row input.', verify: true },
+          { n: 15, name: 'ROW', type: 'kbd', desc: 'Key sense row input.', verify: true },
+          { n: 16, name: 'ROW', type: 'kbd', desc: 'Key sense row input.', verify: true },
+          { n: 17, name: '+5V', type: 'power', desc: '+5 V logic power from the power supply.', expect: '+5 V DC', verify: true },
+          { n: 18, name: '+5V', type: 'power', desc: '+5 V logic power.', expect: '+5 V DC', verify: true },
+          { n: 19, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
+          { n: 20, name: 'GND', type: 'ground', desc: 'Ground.', verify: true }
```

### H177

src/data/heathkit.js @@ -827,16 +828,16 @@ RCS.add({

```diff
-          { n: 21, name: '+5V', type: 'power', desc: '+5 V power.', expect: '4.9-5.1 V DC' },
-          { n: 22, name: '+5V', type: 'power', desc: '+5 V power.', expect: '4.9-5.1 V DC' },
-          { n: 23, name: '/ABORT', type: 'ctrl', desc: 'One side of the ABORT switch; low (pressed) drives the 6808 NMI.' },
-          { n: 24, name: '/R/W', type: 'ctrl', desc: 'Inverted read/write to the experimental board: low on read, high on write.' },
-          { n: 25, name: 'E', type: 'clock', desc: 'The 6808 E clock, to the sense board.', expect: 'Crystal / 4 (about 0.9 or 1 MHz)' },
-          { n: 26, name: 'GND', type: 'ground', desc: 'Ground.' },
-          { n: 27, name: 'TAPE IN', type: 'audio', desc: 'Audio tape signal from the ear jack of the tape recorder.' },
-          { n: 28, name: '/EXP IRQ', type: 'ctrl', desc: 'User-defined experimental board interrupt, active low; latched by U410 into $C200 bit 7.' },
-          { n: 29, name: 'GND', type: 'ground', desc: 'Ground.' },
-          { n: 30, name: 'GND', type: 'ground', desc: 'Ground.' }
+          { n: 21, name: '+5V', type: 'power', desc: '+5 V power.', expect: '+5 V DC', verify: true },
+          { n: 22, name: '+5V', type: 'power', desc: '+5 V power.', expect: '+5 V DC', verify: true },
+          { n: 23, name: '/ABORT', type: 'ctrl', desc: 'One side of the ABORT switch; low (pressed) drives the 6808 NMI.', verify: true },
+          { n: 24, name: '/R/W', type: 'ctrl', desc: 'Inverted read/write to the experimental board: low on read, high on write.', verify: true },
+          { n: 25, name: 'E', type: 'clock', desc: 'The 6808 E clock, to the sense board.', expect: 'Crystal / 4 (about 0.9 or 1 MHz)', verify: true },
+          { n: 26, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
+          { n: 27, name: 'TAPE IN', type: 'audio', desc: 'Audio tape signal from the ear jack of the tape recorder.', verify: true },
+          { n: 28, name: '/EXP IRQ', type: 'ctrl', desc: 'User-defined experimental board interrupt, active low; latched by U410 into $C200 bit 7.', verify: true },
+          { n: 29, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
+          { n: 30, name: 'GND', type: 'ground', desc: 'Ground.', verify: true }
```

### H178

src/data/heathkit.js @@ -845,30 +846,30 @@ RCS.add({

```diff
-          { n: 31, name: 'SONAR RESET', type: 'ctrl', desc: 'Resets the sonar range timer; clearing the sonar interrupt also clears the count.' },
-          { n: 32, name: '/SONAR IRQ', type: 'ctrl', desc: 'Sonar interrupt input; a low pulse latches a pending request.' },
-          { n: 33, name: 'MOTION IRQ', type: 'ctrl', desc: 'Motion detector interrupt input.' },
-          { n: 34, name: 'LOW MOTOR IRQ', type: 'ctrl', desc: 'Low motor-voltage interrupt request.' },
-          { n: 35, name: 'LOW LOGIC IRQ', type: 'ctrl', desc: 'Low logic-voltage interrupt request.' },
-          { n: 36, name: 'RTC IRQ', type: 'ctrl', desc: 'Real-time clock 1024 Hz output when enabled; interrupts the 6808 1024 times a second.' },
-          { n: 37, name: 'PENDANT IRQ', type: 'ctrl', desc: 'Interrupt from pulling the trigger on the teaching pendant.' },
-          { n: 38, name: 'WHEEL IRQ', type: 'ctrl', desc: 'Drive wheel optical encoder pulses, conditioned for the interrupt circuit.' },
-          { n: 39, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 40, name: 'SEL SONAR', type: 'ctrl', desc: 'Address select: read the sonar range counter.' },
-          { n: 41, name: 'SEL SENSE', type: 'ctrl', desc: 'Address select: read the sense board output.' },
-          { n: 42, name: 'SEL LIMITS', type: 'ctrl', desc: 'Address select: read the limit switches and the digital tape input.' },
-          { n: 43, name: 'SEL PENDANT', type: 'ctrl', desc: 'Address select: read the teaching pendant.' },
-          { n: 44, name: 'SEL EXP IN', type: 'ctrl', desc: 'Address select: read the experimental board eight user inputs.' },
-          { n: 45, name: 'STB EXP OUT', type: 'ctrl', desc: 'Address strobe: write the experimental board eight user outputs.' },
-          { n: 46, name: 'STB SPEECH', type: 'ctrl', desc: 'Address strobe: write the phoneme code and inflection to the speech board.' },
-          { n: 47, name: 'STB STEER/PIVOT', type: 'ctrl', desc: 'Address strobe: phase signals for the steering motor and the pivot or rotate arm motor.' },
-          { n: 48, name: 'STB GRIP/SHOULDER', type: 'ctrl', desc: 'Address strobe: gripper/shoulder and extend/head motors.' },
-          { n: 49, name: 'STB MAIN DRIVE', type: 'ctrl', desc: 'Address strobe: six-bit speed, direction and enable for the main drive.' },
-          { n: 50, name: 'STB ARM SEL', type: 'ctrl', desc: 'Address strobe: arm select bits, speech strobe and light/sound select.' },
-          { n: 51, name: 'STB POWER', type: 'ctrl', desc: 'Address strobe: board power select bits and the sleep command ($C2E0).' },
-          { n: 52, name: 'VSB', type: 'power', desc: 'Standby power to the two 2K RAMs on the CPU board during sleep.' },
-          { n: 53, name: 'MEM PROTECT', type: 'ctrl', desc: 'RAM write protect during sleep; normally the memory write signal.' },
-          { n: 54, name: 'NC', type: 'nc', desc: 'Not connected.' }
+          { n: 31, name: 'SONAR RESET', type: 'ctrl', desc: 'Resets the sonar range timer; clearing the sonar interrupt also clears the count.', verify: true },
+          { n: 32, name: '/SONAR IRQ', type: 'ctrl', desc: 'Sonar interrupt input; a low pulse latches a pending request.', verify: true },
+          { n: 33, name: 'MOTION IRQ', type: 'ctrl', desc: 'Motion detector interrupt input.', verify: true },
+          { n: 34, name: 'LOW MOTOR IRQ', type: 'ctrl', desc: 'Low motor-voltage interrupt request.', verify: true },
+          { n: 35, name: 'LOW LOGIC IRQ', type: 'ctrl', desc: 'Low logic-voltage interrupt request.', verify: true },
+          { n: 36, name: 'RTC IRQ', type: 'ctrl', desc: 'Real-time clock 1024 Hz output when enabled; interrupts the 6808 1024 times a second.', verify: true },
+          { n: 37, name: 'PENDANT IRQ', type: 'ctrl', desc: 'Interrupt from pulling the trigger on the teaching pendant.', verify: true },
+          { n: 38, name: 'WHEEL IRQ', type: 'ctrl', desc: 'Drive wheel optical encoder pulses, conditioned for the interrupt circuit.', verify: true },
+          { n: 39, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 40, name: 'SEL SONAR', type: 'ctrl', desc: 'Address select: read the sonar range counter.', verify: true },
+          { n: 41, name: 'SEL SENSE', type: 'ctrl', desc: 'Address select: read the sense board output.', verify: true },
+          { n: 42, name: 'SEL LIMITS', type: 'ctrl', desc: 'Address select: read the limit switches and the digital tape input.', verify: true },
+          { n: 43, name: 'SEL PENDANT', type: 'ctrl', desc: 'Address select: read the teaching pendant.', verify: true },
+          { n: 44, name: 'SEL EXP IN', type: 'ctrl', desc: 'Address select: read the experimental board eight user inputs.', verify: true },
+          { n: 45, name: 'STB EXP OUT', type: 'ctrl', desc: 'Address strobe: write the experimental board eight user outputs.', verify: true },
+          { n: 46, name: 'STB SPEECH', type: 'ctrl', desc: 'Address strobe: write the phoneme code and inflection to the speech board.', verify: true },
+          { n: 47, name: 'STB STEER/PIVOT', type: 'ctrl', desc: 'Address strobe: phase signals for the steering motor and the pivot or rotate arm motor.', verify: true },
+          { n: 48, name: 'STB GRIP/SHOULDER', type: 'ctrl', desc: 'Address strobe: gripper/shoulder and extend/head motors.', verify: true },
+          { n: 49, name: 'STB MAIN DRIVE', type: 'ctrl', desc: 'Address strobe: six-bit speed, direction and enable for the main drive.', verify: true },
+          { n: 50, name: 'STB ARM SEL', type: 'ctrl', desc: 'Address strobe: arm select bits, speech strobe and light/sound select.', verify: true },
+          { n: 51, name: 'STB POWER', type: 'ctrl', desc: 'Address strobe: board power select bits and the sleep command ($C2E0).', verify: true },
+          { n: 52, name: 'VSB', type: 'power', desc: 'Standby power to the two 2K RAMs on the CPU board during sleep.', verify: true },
+          { n: 53, name: 'MEM PROTECT', type: 'ctrl', desc: 'RAM write protect during sleep; normally the memory write signal.', verify: true },
+          { n: 54, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true }
```

### H179

src/data/heathkit.js @@ -877,16 +878,16 @@ RCS.add({

```diff
-          { n: 55, name: '+5V', type: 'power', desc: '+5 V power supply.', expect: '4.9-5.1 V DC' },
-          { n: 56, name: '+5V', type: 'power', desc: '+5 V power supply.', expect: '4.9-5.1 V DC' },
-          { n: 57, name: 'TAPE DIGITAL', type: 'io', desc: 'Digital tape input derived from the audio input on P403 pin 27, passed to the I/O card.' },
-          { n: 58, name: 'DISPLAY POWER', type: 'power', desc: 'Display power enable from the I/O card, passed through the CPU board to P401 pin 6.' },
-          { n: 59, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 60, name: 'R/W', type: 'ctrl', desc: '6808 read/write, not inverted: high on read.' },
-          { n: 61, name: 'SEL RTC', type: 'ctrl', desc: 'Address select for the real-time clock chip.' },
-          ...hkSeq(62, 69).map(n => ({ n, name: 'BD', type: 'data', desc: 'Buffered data bus line (bit order not given).' })),
-          ...hkSeq(70, 77).map(n => ({ n, name: 'D', type: 'data', desc: 'Unbuffered 6808 data bus line (bit order not given).' })),
-          { n: 78, name: 'GND', type: 'ground', desc: 'Ground.' }
+          { n: 55, name: '+5V', type: 'power', desc: '+5 V power supply.', expect: '+5 V DC', verify: true },
+          { n: 56, name: '+5V', type: 'power', desc: '+5 V power supply.', expect: '+5 V DC', verify: true },
+          { n: 57, name: 'TAPE DIGITAL', type: 'io', desc: 'Digital tape input derived from the audio input on P403 pin 27, passed to the I/O card.', verify: true },
+          { n: 58, name: 'DISPLAY POWER', type: 'power', desc: 'Display power enable from the I/O card, passed through the CPU board to P401 pin 6.', verify: true },
+          { n: 59, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 60, name: 'R/W', type: 'ctrl', desc: '6808 read/write, not inverted: high on read.', verify: true },
+          { n: 61, name: 'SEL RTC', type: 'ctrl', desc: 'Address select for the real-time clock chip.', verify: true },
+          ...hkSeq(62, 69).map(n => ({ n, name: 'BD', type: 'data', desc: 'Buffered data bus line (bit order not given).', verify: true })),
+          ...hkSeq(70, 77).map(n => ({ n, name: 'D', type: 'data', desc: 'Unbuffered 6808 data bus line (bit order not given).', verify: true })),
+          { n: 78, name: 'GND', type: 'ground', desc: 'Ground.', verify: true }
```

### H180

src/data/heathkit.js @@ -894,9 +895,9 @@ RCS.add({

```diff
-          { n: 1, name: '/SEL 4000', type: 'ctrl', desc: 'Address select for $4000-$5FFF.' },
-          { n: 2, name: '/SEL 6000', type: 'ctrl', desc: 'Address select for $6000-$7FFF.' },
-          ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 3 + i, name: 'BA' + b, type: 'addr', desc: 'Buffered address line A' + b + '.' }))
+          { n: 1, name: '/SEL 4000', type: 'ctrl', desc: 'Address select for $4000-$5FFF.', verify: true },
+          { n: 2, name: '/SEL 6000', type: 'ctrl', desc: 'Address select for $6000-$7FFF.', verify: true },
+          ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 3 + i, name: 'BA' + b, type: 'addr', desc: 'Buffered address line A' + b + '.', verify: true }))
```

### H181

src/data/heathkit.js @@ -904,9 +905,9 @@ RCS.add({

```diff
-          { n: 1, name: 'RESET', type: 'ctrl', desc: 'Direct to the 6808 reset line; use it to reset add-on devices.' },
-          { n: 2, name: 'R/W', type: 'ctrl', desc: 'Unbuffered 6808 read/write.' },
-          ...[0, 1, 2, 3, 4, 5, 6, 7].map((b, i) => ({ n: 3 + i, name: 'D' + b, type: 'data', desc: 'Unbuffered data bus bit ' + b + '.' }))
+          { n: 1, name: 'RESET', type: 'ctrl', desc: 'Direct to the 6808 reset line; use it to reset add-on devices.', verify: true },
+          { n: 2, name: 'R/W', type: 'ctrl', desc: 'Unbuffered 6808 read/write.', verify: true },
+          ...[0, 1, 2, 3, 4, 5, 6, 7].map((b, i) => ({ n: 3 + i, name: 'D' + b, type: 'data', desc: 'Unbuffered data bus bit ' + b + '.', verify: true }))
```

### H182

src/data/heathkit.js @@ -914,9 +915,9 @@ RCS.add({

```diff
-          { n: 1, name: '/SEL 8000', type: 'ctrl', desc: 'Address select for $8000-$9FFF.' },
-          { n: 2, name: '/SEL A000', type: 'ctrl', desc: 'Address select for $A000-$BFFF.' },
-          ...[15, 14, 13, 12, 11, 10, 9, 8].map((b, i) => ({ n: 3 + i, name: 'BA' + b, type: 'addr', desc: 'Buffered address line A' + b + '.' }))
+          { n: 1, name: '/SEL 8000', type: 'ctrl', desc: 'Address select for $8000-$9FFF.', verify: true },
+          { n: 2, name: '/SEL A000', type: 'ctrl', desc: 'Address select for $A000-$BFFF.', verify: true },
+          ...[15, 14, 13, 12, 11, 10, 9, 8].map((b, i) => ({ n: 3 + i, name: 'BA' + b, type: 'addr', desc: 'Buffered address line A' + b + '.', verify: true }))
```

### H183

src/data/heathkit.js @@ -924,9 +925,9 @@ RCS.add({

```diff
-          { n: 109, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 110, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 111 + i, name: 'D' + b, type: 'io', desc: 'Experimental board D' + b + '.' }))
+          { n: 109, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 110, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 111 + i, name: 'D' + b, type: 'io', desc: 'Experimental board D' + b + '.', verify: true }))
```

### H184

src/data/heathkit.js @@ -934,9 +935,9 @@ RCS.add({

```diff
-          { n: 129, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 130, name: 'SLEEP SENSE', type: 'ctrl', desc: 'Sleep switch sense from the experimental board.' },
-          ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 131 + i, name: 'D' + b, type: 'io', desc: 'Experimental board D' + b + '.' }))
+          { n: 129, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 130, name: 'SLEEP SENSE', type: 'ctrl', desc: 'Sleep switch sense from the experimental board.', verify: true },
+          ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 131 + i, name: 'D' + b, type: 'io', desc: 'Experimental board D' + b + '.', verify: true }))
```

### H185

src/data/heathkit.js @@ -944,16 +945,16 @@ RCS.add({

```diff
-          { n: 119, name: 'GND', type: 'ground', desc: 'Ground.' },
-          { n: 120, name: '+5V', type: 'power', desc: '+5 V power.', expect: '4.9-5.1 V DC' },
-          { n: 121, name: 'TAPE IN', type: 'io', desc: 'Tape input (digital).' },
-          { n: 122, name: 'STEER LIMIT CW', type: 'io', desc: 'Steering limit, clockwise.' },
-          { n: 123, name: 'ARM LIMIT UP', type: 'io', desc: 'Arm limit, up.' },
-          { n: 124, name: 'HEAD LIMIT CCW', type: 'io', desc: 'Head limit, counterclockwise.' },
-          { n: 125, name: 'STEER LIMIT CCW', type: 'io', desc: 'Steering limit, counterclockwise.' },
-          { n: 126, name: 'ARM LIMIT DOWN', type: 'io', desc: 'Arm limit, down.' },
-          { n: 127, name: 'HEAD LIMIT CW', type: 'io', desc: 'Head limit, clockwise.' },
-          { n: 128, name: 'SPEECH REQUEST', type: 'ctrl', desc: 'Speech request (A/R) from the speech board.' }
+          { n: 119, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
+          { n: 120, name: '+5V', type: 'power', desc: '+5 V power.', expect: '+5 V DC', verify: true },
+          { n: 121, name: 'TAPE IN', type: 'io', desc: 'Tape input (digital).', verify: true },
+          { n: 122, name: 'STEER LIMIT CW', type: 'io', desc: 'Steering limit, clockwise.', verify: true },
+          { n: 123, name: 'ARM LIMIT UP', type: 'io', desc: 'Arm limit, up.', verify: true },
+          { n: 124, name: 'HEAD LIMIT CCW', type: 'io', desc: 'Head limit, counterclockwise.', verify: true },
+          { n: 125, name: 'STEER LIMIT CCW', type: 'io', desc: 'Steering limit, counterclockwise.', verify: true },
+          { n: 126, name: 'ARM LIMIT DOWN', type: 'io', desc: 'Arm limit, down.', verify: true },
+          { n: 127, name: 'HEAD LIMIT CW', type: 'io', desc: 'Head limit, clockwise.', verify: true },
+          { n: 128, name: 'SPEECH REQUEST', type: 'ctrl', desc: 'Speech request (A/R) from the speech board.', verify: true }
```

### H186

src/data/heathkit.js @@ -961,11 +962,11 @@ RCS.add({

```diff
-          { n: 89, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 90, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 91, name: 'FWD/REV', type: 'ctrl', desc: 'Forward/reverse select.' },
-          { n: 92, name: 'ON/OFF', type: 'ctrl', desc: 'Drive on/off.' },
-          ...[5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 93 + i, name: 'SPEED D' + b, type: 'ctrl', desc: 'Speed select bit D' + b + '.' }))
+          { n: 89, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 90, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 91, name: 'FWD/REV', type: 'ctrl', desc: 'Forward/reverse select.', verify: true },
+          { n: 92, name: 'ON/OFF', type: 'ctrl', desc: 'Drive on/off.', verify: true },
+          ...[5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 93 + i, name: 'SPEED D' + b, type: 'ctrl', desc: 'Speed select bit D' + b + '.', verify: true }))
```

### H187

src/data/heathkit.js @@ -973,10 +974,10 @@ RCS.add({

```diff
-          { n: 99, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 100, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          ...[4, 3, 2, 1].map((ph, i) => ({ n: 101 + i, name: 'STEER Φ' + ph, type: 'ctrl', desc: 'Steering motor phase ' + ph + '.' })),
-          ...[4, 3, 2, 1].map((ph, i) => ({ n: 105 + i, name: 'PIVOT Φ' + ph, type: 'ctrl', desc: 'Pivot/rotate motor phase ' + ph + '.' }))
+          { n: 99, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 100, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          ...[4, 3, 2, 1].map((ph, i) => ({ n: 101 + i, name: 'STEER Φ' + ph, type: 'ctrl', desc: 'Steering motor phase ' + ph + '.', verify: true })),
+          ...[4, 3, 2, 1].map((ph, i) => ({ n: 105 + i, name: 'PIVOT Φ' + ph, type: 'ctrl', desc: 'Pivot/rotate motor phase ' + ph + '.', verify: true }))
```

### H188

src/data/heathkit.js @@ -984,10 +985,10 @@ RCS.add({

```diff
-          { n: 159, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 160, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          ...[4, 3, 2, 1].map((ph, i) => ({ n: 161 + i, name: 'EXT/HEAD Φ' + ph, type: 'ctrl', desc: 'Extend/head motor phase ' + ph + '.' })),
-          ...[4, 3, 2, 1].map((ph, i) => ({ n: 165 + i, name: 'GRIP/SHLDR Φ' + ph, type: 'ctrl', desc: 'Gripper/shoulder motor phase ' + ph + '.' }))
+          { n: 159, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 160, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          ...[4, 3, 2, 1].map((ph, i) => ({ n: 161 + i, name: 'EXT/HEAD Φ' + ph, type: 'ctrl', desc: 'Extend/head motor phase ' + ph + '.', verify: true })),
+          ...[4, 3, 2, 1].map((ph, i) => ({ n: 165 + i, name: 'GRIP/SHLDR Φ' + ph, type: 'ctrl', desc: 'Gripper/shoulder motor phase ' + ph + '.', verify: true }))
```

### H189

src/data/heathkit.js @@ -995,16 +996,16 @@ RCS.add({

```diff
-          { n: 149, name: 'GND', type: 'ground', desc: 'Ground.' },
-          { n: 150, name: 'GND', type: 'ground', desc: 'Ground.' },
+          { n: 149, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
+          { n: 150, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
-          { n: 152, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 153, name: '+5V', type: 'power', desc: '+5 V power.', expect: '4.9-5.1 V DC' },
-          { n: 154, name: '+5V', type: 'power', desc: '+5 V power.', expect: '4.9-5.1 V DC' },
-          { n: 155, name: 'SPARE', type: 'nc', desc: 'Spare.' },
-          { n: 156, name: 'SPEECH STROBE', type: 'ctrl', desc: 'Speech strobe to the speech board.' },
-          { n: 157, name: 'ARM SEL A', type: 'ctrl', desc: 'Arm select: pivot, grip, extend.' },
-          { n: 158, name: 'ARM SEL B', type: 'ctrl', desc: 'Arm select: rotate, shoulder, head.' }
+          { n: 152, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 153, name: '+5V', type: 'power', desc: '+5 V power.', expect: '+5 V DC', verify: true },
+          { n: 154, name: '+5V', type: 'power', desc: '+5 V power.', expect: '+5 V DC', verify: true },
+          { n: 155, name: 'SPARE', type: 'nc', desc: 'Spare.', verify: true },
+          { n: 156, name: 'SPEECH STROBE', type: 'ctrl', desc: 'Speech strobe to the speech board.', verify: true },
+          { n: 157, name: 'ARM SEL A', type: 'ctrl', desc: 'Arm select: pivot, grip, extend.', verify: true },
+          { n: 158, name: 'ARM SEL B', type: 'ctrl', desc: 'Arm select: rotate, shoulder, head.', verify: true }
```

### H190

src/data/heathkit.js @@ -1012,16 +1013,16 @@ RCS.add({

```diff
-          { n: 139, name: 'LIGHT/SOUND SEL', type: 'ctrl', desc: 'Light/sound select.' },
-          { n: 140, name: 'SLEEP CMD', type: 'ctrl', desc: 'Sleep command.' },
-          { n: 141, name: 'SENSE PWR', type: 'ctrl', desc: 'Sense power control.' },
-          { n: 142, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 143, name: 'SPEECH PWR', type: 'ctrl', desc: 'Speech power control.' },
-          { n: 144, name: 'MOTION PWR', type: 'ctrl', desc: 'Motion detect power control.' },
-          { n: 145, name: 'SONAR PWR', type: 'ctrl', desc: 'Sonar power control.' },
-          { n: 146, name: 'GND', type: 'ground', desc: 'Ground.' },
-          { n: 147, name: 'GND', type: 'ground', desc: 'Ground.' },
-          { n: 148, name: 'TAPE OUT', type: 'audio', desc: 'Tape out signal (audio to the recorder MIC input).' }
+          { n: 139, name: 'LIGHT/SOUND SEL', type: 'ctrl', desc: 'Light/sound select.', verify: true },
+          { n: 140, name: 'SLEEP CMD', type: 'ctrl', desc: 'Sleep command.', verify: true },
+          { n: 141, name: 'SENSE PWR', type: 'ctrl', desc: 'Sense power control.', verify: true },
+          { n: 142, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 143, name: 'SPEECH PWR', type: 'ctrl', desc: 'Speech power control.', verify: true },
+          { n: 144, name: 'MOTION PWR', type: 'ctrl', desc: 'Motion detect power control.', verify: true },
+          { n: 145, name: 'SONAR PWR', type: 'ctrl', desc: 'Sonar power control.', verify: true },
+          { n: 146, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
+          { n: 147, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
+          { n: 148, name: 'TAPE OUT', type: 'audio', desc: 'Tape out signal (audio to the recorder MIC input).', verify: true }
```

### H191

src/data/heathkit.js @@ -1029,16 +1030,16 @@ RCS.add({

```diff
-          { n: 79, name: 'SONAR RX', type: 'io', desc: 'Sonar receive pulse.' },
-          { n: 80, name: 'SONAR TX', type: 'io', desc: 'Sonar transmit pulse.' },
-          { n: 81, name: 'MOTION', type: 'io', desc: 'Motion detect pulse.' },
-          { n: 82, name: 'LOW DRIVE V', type: 'ctrl', desc: 'Low drive voltage detect.' },
-          { n: 83, name: 'LOW LOGIC V', type: 'ctrl', desc: 'Low logic voltage detect.' },
-          { n: 84, name: 'OPTO C', type: 'io', desc: 'Collector of the drive opto detector.' },
-          { n: 85, name: 'OPTO A', type: 'io', desc: 'Anode of the drive opto emitter.' },
-          { n: 86, name: '+12V', type: 'power', desc: '+12 V power.', expect: '10-13.9 V DC (battery)' },
-          { n: 87, name: '/SLEEP', type: 'ctrl', desc: 'Sleep command to the power supply, active low.' },
-          { n: 88, name: '+12V', type: 'power', desc: '+12 V power.', expect: '10-13.9 V DC (battery)' }
+          { n: 79, name: 'SONAR RX', type: 'io', desc: 'Sonar receive pulse.', verify: true },
+          { n: 80, name: 'SONAR TX', type: 'io', desc: 'Sonar transmit pulse.', verify: true },
+          { n: 81, name: 'MOTION', type: 'io', desc: 'Motion detect pulse.', verify: true },
+          { n: 82, name: 'LOW DRIVE V', type: 'ctrl', desc: 'Low drive voltage detect.', verify: true },
+          { n: 83, name: 'LOW LOGIC V', type: 'ctrl', desc: 'Low logic voltage detect.', verify: true },
+          { n: 84, name: 'OPTO C', type: 'io', desc: 'Collector of the drive opto detector.', verify: true },
+          { n: 85, name: 'OPTO A', type: 'io', desc: 'Anode of the drive opto emitter.', verify: true },
+          { n: 86, name: '+12V', type: 'power', desc: '+12 V power.', expect: '+12 V battery: 13.9 V float on charge; below 10 V the robot flags a low battery', verify: true },
+          { n: 87, name: '/SLEEP', type: 'ctrl', desc: 'Sleep command to the power supply, active low.', verify: true },
+          { n: 88, name: '+12V', type: 'power', desc: '+12 V power.', expect: '+12 V battery: 13.9 V float on charge; below 10 V the robot flags a low battery', verify: true }
```

### H192

src/data/heathkit.js @@ -1046,9 +1047,9 @@ RCS.add({

```diff
-          { n: 189, name: 'GND', type: 'ground', desc: 'Ground.' },
-          { n: 190, name: '+5V', type: 'power', desc: '+5 V power.', expect: '4.9-5.1 V DC' },
-          ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 191 + i, name: 'SENSE D' + b, type: 'data', desc: 'Sense value bit D' + b + '.' }))
+          { n: 189, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
+          { n: 190, name: '+5V', type: 'power', desc: '+5 V power.', expect: '+5 V DC', verify: true },
+          ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 191 + i, name: 'SENSE D' + b, type: 'data', desc: 'Sense value bit D' + b + '.', verify: true }))
```

### H193

src/data/heathkit.js @@ -1057,16 +1058,16 @@ RCS.add({

```diff
-          { n: 179, name: 'GND', type: 'ground', desc: 'Ground.' },
-          { n: 180, name: '+5V', type: 'power', desc: '+5 V power.', expect: '4.9-5.1 V DC' },
-          { n: 181, name: '/BODY/ARM', type: 'io', desc: 'Body/arm status.' },
-          { n: 182, name: 'ROTARY D2', type: 'io', desc: 'Rotary switch code D2 (codes: Fig. 1-11).' },
-          { n: 183, name: 'ROTARY D1', type: 'io', desc: 'Rotary switch code D1.' },
-          { n: 184, name: 'ROTARY D0', type: 'io', desc: 'Rotary switch code D0.' },
-          { n: 185, name: '/RIGHT', type: 'io', desc: 'Right, active low.' },
-          { n: 186, name: '/LEFT', type: 'io', desc: 'Left, active low.' },
-          { n: 187, name: 'TRIGGER', type: 'io', desc: 'Trigger.' },
-          { n: 188, name: 'NC', type: 'nc', desc: 'Not connected.' }
+          { n: 179, name: 'GND', type: 'ground', desc: 'Ground.', verify: true },
+          { n: 180, name: '+5V', type: 'power', desc: '+5 V power.', expect: '+5 V DC', verify: true },
+          { n: 181, name: '/BODY/ARM', type: 'io', desc: 'Body/arm status.', verify: true },
+          { n: 182, name: 'ROTARY D2', type: 'io', desc: 'Rotary switch code D2 (codes: Fig. 1-11).', verify: true },
+          { n: 183, name: 'ROTARY D1', type: 'io', desc: 'Rotary switch code D1.', verify: true },
+          { n: 184, name: 'ROTARY D0', type: 'io', desc: 'Rotary switch code D0.', verify: true },
+          { n: 185, name: '/RIGHT', type: 'io', desc: 'Right, active low.', verify: true },
+          { n: 186, name: '/LEFT', type: 'io', desc: 'Left, active low.', verify: true },
+          { n: 187, name: 'TRIGGER', type: 'io', desc: 'Trigger.', verify: true },
+          { n: 188, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true }
```

### H194

src/data/heathkit.js @@ -1074,11 +1075,11 @@ RCS.add({

```diff
-          { n: 169, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 170, name: 'NC', type: 'nc', desc: 'Not connected.' },
-          { n: 171, name: 'I2', type: 'ctrl', desc: 'Pitch select I2.' },
-          { n: 172, name: 'I1', type: 'ctrl', desc: 'Pitch select I1.' },
-          ...[5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 173 + i, name: 'P' + b, type: 'data', desc: 'Phoneme code P' + b + '.', conflict: 'Table 6-13 prints these as 173, 172, 173, 174, 175, 176 (duplicate numbers); renumbered in sequence.' }))
+          { n: 169, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 170, name: 'NC', type: 'nc', desc: 'Not connected.', verify: true },
+          { n: 171, name: 'I2', type: 'ctrl', desc: 'Pitch select I2.', verify: true },
+          { n: 172, name: 'I1', type: 'ctrl', desc: 'Pitch select I1.', verify: true },
+          ...[5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 173 + i, name: 'P' + b, type: 'data', desc: 'Phoneme code P' + b + '.', conflict: 'Table 6-13 prints these as 173, 172, 173, 174, 175, 176 (duplicate numbers); renumbered in sequence.', verify: true }))
```

### H195

src/data/heathkit.js @@ -1107,7 +1108,7 @@ RCS.add({

```diff
-          { n: 13, name: '+12V', type: 'power', desc: '+12 V in (red), through L501.', expect: '10-13.9 V DC (logic battery)' },
+          { n: 13, name: '+12V', type: 'power', desc: '+12 V in (red), through L501.', expect: '+12 V battery: 13.9 V float on charge; below 10 V the robot flags a low battery' },
```

### H196

src/data/heathkit.js @@ -1142,7 +1143,7 @@ RCS.add({

```diff
-          { n: 1, name: 'BATT +', type: 'power', desc: 'To the OFF-ON switch SW1 and fuse F1 to the batteries.', expect: '11-14 V DC (battery)', verify: true },
+          { n: 1, name: 'BATT +', type: 'power', desc: 'To the OFF-ON switch SW1 and fuse F1 to the batteries.', expect: '+12 V DC (battery)', verify: true },
```

### H197

src/data/heathkit.js @@ -1154,7 +1155,7 @@ RCS.add({

```diff
-        verifiedAgainst: 'HERO Jr RS-232 Accessory manual, Detail 2-3D, printed p. 7-8; TM printed p. 25; Schematics sheet 1',
+        verifiedAgainst: 'HERO Jr RS-232 Accessory manual, Detail 2-3D, printed p. 7-8; TM printed p. 24; Schematics sheet 1',
```

### H198

src/data/heathkit.js @@ -1163,7 +1164,7 @@ RCS.add({

```diff
-          { label: 'HERO Jr Technical Manual, RS-232 interface, printed p. 25 (archive.org)', url: 'https://archive.org/download/hero-jr-technical/HeroJr%20595-3271%20Technical.pdf#page=26' }
+          { label: 'HERO Jr Technical Manual, RS-232 interface, printed p. 24 (archive.org)', url: 'https://archive.org/download/hero-jr-technical/HeroJr%20595-3271%20Technical.pdf#page=26' }
```

### H199

src/data/heathkit.js @@ -1180,10 +1181,10 @@ RCS.add({

```diff
-          { n: 10, name: '+5V', type: 'power', desc: '+5 V Vcc from switching regulator U302.', expect: '4.9-5.1 V DC awake; 0 V in sleep' },
-          { n: 11, name: '+5V', type: 'power', desc: '+5 V Vcc.', expect: '4.9-5.1 V DC awake; 0 V in sleep' },
+          { n: 10, name: '+5V', type: 'power', desc: '+5 V Vcc from switching regulator U302.', expect: '+5 V DC awake; 0 V in sleep' },
+          { n: 11, name: '+5V', type: 'power', desc: '+5 V Vcc.', expect: '+5 V DC awake; 0 V in sleep' },
-          { n: 13, name: '+12', type: 'power', desc: '+12 V battery supply.', expect: '11-14 V DC' },
+          { n: 13, name: '+12', type: 'power', desc: '+12 V battery supply.', expect: '+12 V DC' },
```

### H200

src/data/heathkit.js @@ -1218,7 +1219,7 @@ RCS.add({

```diff
-          { n: 2, name: '+12', type: 'power', desc: '+12 V from the batteries through F1 and SW1.', expect: '11-14 V DC with SW1 on' },
+          { n: 2, name: '+12', type: 'power', desc: '+12 V from the batteries through F1 and SW1.', expect: '+12 V DC with SW1 on' },
```

### H201

src/data/heathkit.js @@ -1227,7 +1228,7 @@ RCS.add({

```diff
-          { n: 1, name: '+12', type: 'power', desc: 'Motor common +12 V.', expect: '11-14 V DC' },
+          { n: 1, name: '+12', type: 'power', desc: 'Motor common +12 V.', expect: '+12 V DC' },
```

### H202

src/data/heathkit.js @@ -1305,7 +1306,7 @@ RCS.add({

```diff
-          { n: 2, name: '+12 SWITCHED', type: 'power', desc: '+12 V switched (to SW2).', expect: '11-14 V DC' },
+          { n: 2, name: '+12 SWITCHED', type: 'power', desc: '+12 V switched (to SW2).', expect: '+12 V DC (battery)' },
```

### H203

src/data/heathkit.js @@ -1321,7 +1322,7 @@ RCS.add({

```diff
-          { n: 1, name: '+12 SWITCHED', type: 'power', desc: '+12 V switched supply for the receiver.', expect: '11-14 V DC' },
+          { n: 1, name: '+12 SWITCHED', type: 'power', desc: '+12 V switched supply for the receiver.', expect: '+12 V DC' },
```

### H204

src/data/heathkit.js @@ -1336,7 +1337,7 @@ RCS.add({

```diff
-          { n: 1, name: '+5', type: 'power', desc: '+5 V.', expect: '4.9-5.1 V DC' },
+          { n: 1, name: '+5', type: 'power', desc: '+5 V.', expect: '+5 V DC' },
```

### H205

src/data/heathkit.js @@ -1402,8 +1403,8 @@ RCS.add({

```diff
-          { n: 71, name: '+5', type: 'power', desc: '+5 V.', expect: '4.9-5.1 V DC', verify: true },
-          { n: 72, name: '+5', type: 'power', desc: '+5 V.', expect: '4.9-5.1 V DC', verify: true }
+          { n: 71, name: '+5', type: 'power', desc: '+5 V.', expect: '+5 V DC', verify: true },
+          { n: 72, name: '+5', type: 'power', desc: '+5 V.', expect: '+5 V DC', verify: true }
```

### H206

src/data/heathkit.js @@ -1440,7 +1441,7 @@ RCS.add({

```diff
-        output: 'About 25-27 V DC unregulated, 1.75 A max into discharged batteries; the robot regulates it to a 13.9 V float',
+        output: 'Unregulated DC, 27 V max and 1.75 A max into discharged batteries (specifications). The voltage depends on the load: about 27 V near full charge, as little as 14 V into nearly discharged batteries. The robot regulates it to a 13.9 V float',
```

### H207

src/data/heathkit.js @@ -1451,10 +1452,10 @@ RCS.add({

```diff
-          { label: 'ET-18 Technical Manual, specifications, printed p. 9 (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=10' },
+          { label: 'ET-18 Technical Manual, specifications, printed p. 8 (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=10' },
-          { label: 'ET-18 Technical Manual, charger and power supply circuit description, printed p. 73-74 (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=84' },
+          { label: 'ET-18 Technical Manual, charger and power supply circuit description, printed pp. 72-73 (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=84' },
```

### H208

src/data/heathkit.js @@ -1482,7 +1483,7 @@ RCS.add({

```diff
-        { label: 'ET-18 Technical Manual, circuit description printed p. 73-82 (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=84' },
+        { label: 'ET-18 Technical Manual, circuit description printed p. 72-82 (archive.org)', url: 'https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=84' },
```

### H209

src/data/heathkit.js @@ -1530,7 +1531,7 @@ RCS.add({

```diff
-          { label: 'HERO Jr Technical Manual, chassis parts list (B1, B2, F1, charger), printed p. 42 (archive.org)', url: 'https://archive.org/download/hero-jr-technical/HeroJr%20595-3271%20Technical.pdf#page=43' },
+          { label: 'HERO Jr Technical Manual, chassis parts list (B1, B2, F1, charger), printed p. 41 (archive.org)', url: 'https://archive.org/download/hero-jr-technical/HeroJr%20595-3271%20Technical.pdf#page=43' },
```

### H210

src/data/ibm.js @@ -150,7 +150,7 @@

```diff
-      P(21, 'RESET', 'ctrl', 'in', 'Reset, active HIGH for at least four clocks. Execution restarts at $FFFF0 when it goes LOW.', { terms: ['reset'], probe: 'HIGH briefly at power-up, then LOW. Stuck HIGH holds the CPU in reset.' }),
+      P(21, 'RESET', 'ctrl', 'in', 'Reset, active LOW for at least four clocks. Execution restarts at $FFFF0 when it goes HIGH.', { terms: ['reset'], probe: 'HIGH briefly at power-up, then LOW. Stuck HIGH holds the CPU in reset.' }),
```

### H211

src/data/ibm.js @@ -195,7 +195,7 @@

```diff
-      P(11, '/RES', 'ctrl', 'in', 'Reset input, active LOW, Schmitt trigger. Usually an RC network or a power-good signal. 5150: P8 pin 1 Power Good.', { activeLow: true, terms: ['active-low', 'power-good'], probe: '5150: LOW at switch-on, HIGH (2.4 to 5.5 V) 100 to 500 ms after the rails settle. Stays LOW with a bad PSU.' }),
+      P(11, '/RES', 'ctrl', 'in', 'Reset input, active LOW, Schmitt trigger. Usually an RC network or a power-good signal. 5150: P8 pin 1 Power Good.', { activeLow: true, terms: ['active-low', 'power-good'], probe: '5150: LOW at switch-on, HIGH (2.4 to 5.5 V) at least 100 ms after the rails settle. Stays LOW with a bad PSU.' }),
```

### H212

src/data/ibm.js @@ -218,7 +218,7 @@

```diff
-      P(1, 'IOB', 'ctrl', 'in', 'I/O bus mode strap. HIGH: I/O bus mode. LOW: system bus mode. 5150: tied to GND.'),
+      P(1, 'IOB', 'ctrl', 'in', 'I/O bus mode strap. HIGH: I/O bus mode. LOW: system bus mode. 5150: tied to GND.', { verify: true }),
```

### H213

src/data/ibm.js @@ -232,7 +232,7 @@

```diff
-      P(15, 'CEN', 'ctrl', 'in', 'Command enable. HIGH enables the commands and DEN; LOW forces them inactive. 5150: driven by /AEN, so DMA cycles turn the 8288 commands off.'),
+      P(15, 'CEN', 'ctrl', 'in', 'Command enable. HIGH enables the commands and DEN; LOW forces them inactive. 5150: driven by /AEN, so DMA cycles turn the 8288 commands off.', { verify: true }),
```

### H214

src/data/ibm.js @@ -329,14 +329,15 @@

```diff
-  const PA = (n, bit) => P(n, 'PA' + bit, 'io', 'bidir', `Port A bit ${bit} (port $60). PC: keyboard scan-code bit ${bit}. On the 5150, with PB7 HIGH it reads switch SW1-${bit + 1} instead.`, { terms: ['kbd-serial'] });
-  const PCn = (n, bit) => P(n, 'PC' + bit, 'io', 'in', `Port C bit ${bit} (port $62). 5150: SW2 switch ${bit + 1} (PC0 reads SW2-5 when PB2 selects it). 5160: SW1 switch ${bit + 1} or ${bit + 5}, chosen by PB3.`);
+  /* Shared with the CPC and MSX: pin text is the generic 8255; each machine's port use is in the summary. Port direction is programmed, so every port pin is bidir. */
+  const PA = (n, bit) => P(n, 'PA' + bit, 'io', 'bidir', `Port A bit ${bit}.`);
+  const PCn = (n, bit) => P(n, 'PC' + bit, 'io', 'bidir', `Port C bit ${bit}.`);
-    role: 'Three 8-bit ports: keyboard data in, system control and speaker out, switch and status in.',
+    role: 'Three 8-bit programmable I/O ports (A, B, C).',
-    summary: 'Ports at $60 to $63, set up as A and C in and B out (mode word $99). Port A reads the keyboard scan code (or SW1 on the 5150). Port B gates the speaker, selects the switch bank, enables the parity and I/O-channel checks, and holds the keyboard clock. Port C reads the switches, timer 2 out and the parity flags. The 5150 and 5160 use some port B and C bits differently; each pin says which.',
+    summary: 'Three 8-bit ports whose directions are set by a control word; what each port bit does depends on the machine. IBM PC 5150, XT 5160 and Portable 5155 (U36 on the 5150): ports $60 to $63, A and C in and B out (mode word $99). PA0-PA7 read the keyboard scan code (5150: switches SW1-1 to SW1-8 while PB7 is HIGH). PB0 gates timer 2; PB1 HIGH passes timer 2 to the speaker; PB2 picks the SW2 switches port C reads (5150; spare on the 5160); PB3 HIGH turns the cassette motor off (5150) or picks the high or low SW1 nibble (5160); PB4 LOW enables the RAM parity check; PB5 LOW enables the I/O channel check; PB6 LOW holds the keyboard clock LOW; PB7 HIGH clears the keyboard (5150: also puts SW1 on port A). PC0-PC3 read SW2 switches 1-4 (5150; PC0 reads SW2-5 when PB2 selects it) or SW1 switches 1-4 or 5-8 chosen by PB3 (5160); PC4 is cassette data in (5150; spare on the 5160); PC5 timer 2 output; PC6 the I/O channel check flag; PC7 the RAM parity check flag (HIGH = error). Amstrad CPC 464, 664 and 6128 (IC107): port A is the AY-3-8912 data bus; ports B and C carry the keyboard, cassette and sound-chip control (CPC6128 service manual, CPU circuit diagram). MSX (I/O $A8-$AB): port A selects the primary slots; port C bit 4 is the cassette motor and bit 5 cassette out.',
```

### H215

src/data/ibm.js @@ -348,23 +349,23 @@

```diff
-      P(6, '/CS', 'ctrl', 'in', 'Chip select, active LOW. PC: ports $60 to $63.', AL),
+      P(6, '/CS', 'ctrl', 'in', 'Chip select, active LOW.', AL),
-      P(10, 'PC7', 'io', 'in', 'Port C bit 7. PC: RAM parity check flag (HIGH = parity error).', { terms: ['parity'] }),
-      P(11, 'PC6', 'io', 'in', 'Port C bit 6. PC: I/O channel check flag.'),
-      P(12, 'PC5', 'io', 'in', 'Port C bit 5. PC: timer channel 2 output.'),
-      P(13, 'PC4', 'io', 'in', 'Port C bit 4. 5150: cassette data in. 5160: spare.'),
+      P(10, 'PC7', 'io', 'bidir', 'Port C bit 7.'),
+      P(11, 'PC6', 'io', 'bidir', 'Port C bit 6.'),
+      P(12, 'PC5', 'io', 'bidir', 'Port C bit 5.'),
+      P(13, 'PC4', 'io', 'bidir', 'Port C bit 4.'),
-      P(18, 'PB0', 'io', 'out', 'Port B bit 0 (port $61). PC: timer 2 gate; HIGH lets counter 2 run.'),
-      P(19, 'PB1', 'io', 'out', 'Port B bit 1. PC: speaker data; HIGH passes timer 2 to the speaker.'),
-      P(20, 'PB2', 'io', 'out', 'Port B bit 2. 5150: selects which SW2 switches port C reads. 5160: spare.'),
-      P(21, 'PB3', 'io', 'out', 'Port B bit 3. 5150: cassette motor off when HIGH. 5160: selects the high or low switch nibble on port C.'),
-      P(22, 'PB4', 'io', 'out', 'Port B bit 4. PC: enable RAM parity check, active LOW.', { terms: ['parity'] }),
-      P(23, 'PB5', 'io', 'out', 'Port B bit 5. PC: enable I/O channel check, active LOW.'),
-      P(24, 'PB6', 'io', 'out', 'Port B bit 6. PC: LOW holds the keyboard clock LOW, which stops the keyboard.', { terms: ['kbd-serial'] }),
-      P(25, 'PB7', 'io', 'out', 'Port B bit 7. PC: LOW enables the keyboard; HIGH clears it (on the 5150 it also puts SW1 on port A).', { terms: ['kbd-serial'] }),
+      P(18, 'PB0', 'io', 'bidir', 'Port B bit 0.'),
+      P(19, 'PB1', 'io', 'bidir', 'Port B bit 1.'),
+      P(20, 'PB2', 'io', 'bidir', 'Port B bit 2.'),
+      P(21, 'PB3', 'io', 'bidir', 'Port B bit 3.'),
+      P(22, 'PB4', 'io', 'bidir', 'Port B bit 4.'),
+      P(23, 'PB5', 'io', 'bidir', 'Port B bit 5.'),
+      P(24, 'PB6', 'io', 'bidir', 'Port B bit 6.'),
+      P(25, 'PB7', 'io', 'bidir', 'Port B bit 7.'),
```

### H216

src/data/ibm.js @@ -401,17 +402,9 @@

```diff
-  ppi8255.summary += ' PCjr (ZM22): same ports, different bits. Port A is an output that only stores keystrokes; port B steers sound and video mode; port C reads the keyboard, the fitted options and cassette data.';
+  ppi8255.summary += ' PCjr (ZM22): same ports, different bits. PA0-PA7 are an output that only stores keystrokes for PC compatibility. PB0 gates timer 2; PB1 speaker data (0 forces the timer 2 output to 0); PB2 HIGH for alphanumeric modes, LOW for graphics; PB3 HIGH turns the cassette motor off; PB4 HIGH disables the internal beeper and the cassette motor relay; PB6 and PB5 pick the sound source to the RF modulator and audio jack (00 timer 2, 01 cassette audio in, 10 I/O channel audio, 11 SN76496); PB7 reserved. PC0 keyboard latched (a key was pressed while NMI was off); PC1 LOW = internal modem fitted; PC2 LOW = diskette card fitted; PC3 LOW = 64KB Memory and Display Expansion fitted; PC4 cassette data in; PC5 timer 2 output; PC6 keyboard data (cable or IR receiver); PC7 LOW = keyboard cable connected.';
-  const JR_PA = 'output; stores keystrokes for PC compatibility, not used by the hardware.';
-  jrPins(ppi8255, { 1: JR_PA, 2: JR_PA, 3: JR_PA, 4: JR_PA, 37: JR_PA, 38: JR_PA, 39: JR_PA, 40: JR_PA,
-    18: 'timer 2 gate (speaker).', 19: 'speaker data; 0 forces the timer 2 output to 0.', 20: 'HIGH for alphanumeric modes, LOW for graphics; steers video data into the video gate array.',
-    21: 'HIGH turns the cassette motor off.', 22: 'HIGH disables the internal beeper and the cassette motor relay.',
-    23: 'sound source select, with PB6 (PB6 PB5: 00 timer 2, 01 cassette audio in, 10 I/O channel audio, 11 SN76496) to the RF modulator and audio jack.',
-    24: 'sound source select (see PB5).', 25: 'reserved.',
-    14: 'keyboard latched (a key was pressed while NMI was off).', 15: 'LOW = internal modem card fitted.', 16: 'LOW = diskette drive card fitted.',
-    17: 'LOW = 64KB Memory and Display Expansion fitted.', 13: 'cassette data in.', 12: 'timer channel 2 output.', 11: 'keyboard data (cable or IR receiver).', 10: 'LOW = keyboard cable connected.' });
```

### H217

src/data/ibm.js @@ -427,6 +420,7 @@

```diff
+      S('Same page, Wayback Machine copy (Mar 2026; the site refuses some clients with HTTP 406)', 'https://web.archive.org/web/20260322225148/https://www.minuszerodegrees.net/5160/ram/5160_ram_256_640.htm'),
```

### H218

src/data/ibm.js @@ -448,7 +442,7 @@

```diff
-      { part: '41256 on an IBM 5160 64-256KB board', kind: 'adapter', note: 'IBM-supported change to 640 KB: 41256s in banks 0 and 1 and a jumper on pad E2 pins 1-2, which grounds U44 pin 1 (the same as wiring U44 pins 1 and 8 together). A 1986 BIOS is optional. Mark the board once done.', source: S('minuszerodegrees.net, IBM 5160 motherboard versions, note 1', MZD + '/5160/motherboard/5160_motherboard_revisions.htm') },
+      { part: '41256 on an IBM 5160 64-256KB board', kind: 'adapter', note: 'IBM-supported change to 640 KB. Rework: fit a 74LS158 multiplexer in the empty socket U84; jumper pad E2 pins 1-2, which grounds U44 pin 1 (the same as wiring U44 pins 1 and 8 together); move the 4164s to banks 2 and 3 and fit 41256s in banks 0 and 1; set SW1 switches 3 and 4 off; remove any memory card that also covers the first 640 KB. A 1986 BIOS is optional. Mark the board once done.', source: S('Upgrading and Repairing PCs, IBM XT 256K to 640K motherboard procedure, pp. 521-523 (minuszerodegrees.net copy)', MZD + '/5160/motherboard/5160_upgrading_256k_motherboard_to_640k.pdf#page=1') },
```

### H219

src/data/ibm.js @@ -464,6 +458,7 @@

```diff
+      S('IBM PC Technical Reference (Apr 1983), I/O channel diagram (B6 +DRQ2), p. 1-18, and diskette adapter +DRQ2, p. 1-178', PCTR + '#page=26'),
```

### H220

src/data/ibm.js @@ -483,7 +478,7 @@

```diff
-      P(17, 'DREQ2', 'ctrl', 'in', 'DMA request 2. PC: diskette (I/O channel B6).'),
+      P(17, 'DREQ2', 'ctrl', 'in', 'DMA request 2. PC: diskette adapter DRQ2 (I/O channel B6).'),
```

### H221

src/data/ibm.js @@ -569,10 +564,10 @@

```diff
-    role: 'Makes sync, display enable, cursor and the refresh addresses for the MDA, CGA and PCjr video.',
+    role: 'Makes sync, display enable, cursor and the video RAM refresh addresses.',
-    summary: 'Counts characters and scan lines from a character clock and gives the video RAM address (MA0 to MA13), the scan line in the row (RA0 to RA4), HS, VS, display enable and cursor. Registers are written through an index at $3B4 and data at $3B5 on the MDA, and $3D4 and $3D5 on the CGA and PCjr. HS is undefined until register R2 is programmed, so a dead or unprogrammed 6845 gives no sync. Not pin-identical to the 6545.',
+    summary: 'Counts characters and scan lines from a character clock and gives the video RAM address (MA0 to MA13), the scan line in the row (RA0 to RA4), HS, VS, display enable and cursor. Registers are written through an index at $3B4 and data at $3B5 on the MDA, and $3D4 and $3D5 on the CGA and PCjr. On the IBM cards the character clock comes from the card dot counter; HS runs at about 18 kHz on the MDA and 15.7 kHz on the CGA. HS is undefined until register R2 is programmed, so a dead or unprogrammed 6845 gives no sync. Not pin-identical to the 6545.',
```

### H222

src/data/ibm.js @@ -588,7 +583,7 @@

```diff
-      P(21, 'CLK', 'clock', 'in', 'Character clock from the card dot counter. Active edge HIGH to LOW.', { terms: ['clock'], probe: 'A steady clock at the character rate. No clock: no sync at all.' }),
+      P(21, 'CLK', 'clock', 'in', 'Character clock input. Active edge HIGH to LOW.', { terms: ['clock'], probe: 'A steady clock at the character rate. No clock: no sync at all.' }),
```

### H223

src/data/ibm.js @@ -606,7 +601,7 @@

```diff
-      P(39, 'HS', 'video', 'out', 'Horizontal sync, active HIGH, TTL.', { probe: 'MDA: about 18 kHz. CGA: about 15.7 kHz. Undefined until R2 is set.' }),
+      P(39, 'HS', 'video', 'out', 'Horizontal sync, active HIGH, TTL.', { probe: 'Pulses at the line rate once R2 is set; undefined before.' }),
```

### H224

src/data/ibm.js @@ -647,6 +642,9 @@

```diff
+  /* The 5150/5160 regulation windows are not given for the 5155 supply (XT TechRef 3-8 to 3-10 give only ratings and sense limits): nominal only there. */
+  const nominal = p => (p.expect in NOM ? { ...p, expect: NOM[p.expect] } : p);
+  const NOM = { [V.p5]: '+5 V', [V.m5]: '-5 V', [V.p12]: '+12 V', [V.m12]: '-12 V' };
```

### H225

src/data/ibm.js @@ -821,7 +819,7 @@

```diff
-    T('P8-1', 'POWER GOOD', 'ctrl', 'Power good, TTL. HIGH once all four rails are up; drives the 8284A /RES, so the CPU stays in reset without it.', { expect: '0 to 0.4 V at switch-on, then 2.4 to 5.5 V after 100 to 500 ms' }),
+    T('P8-1', 'POWER GOOD', 'ctrl', 'Power good, TTL. HIGH once all four rails are up; drives the 8284A /RES, so the CPU stays in reset without it. The XT and Portable TechRef give a 100 to 500 ms turn-on delay; the 5150 text gives at least 100 ms.', { expect: '0 to 0.4 V at switch-on, then 2.4 to 5.5 V at least 100 ms later' }),
```

### H226

src/data/ibm.js @@ -853,7 +851,7 @@

```diff
-    { part: 'NEC V20 (uPD70108)', kind: 'pin-compatible', note: 'Faster at the same clock, and adds an 8080 mode. The trap: the BIOS then runs faster than it was written for. minuszerodegrees has an early 5160 with an AST SixPakPlus that stays dead with a V20 until the card is pulled or the last BIOS is fitted. Refit the 8088 before you blame the board.', source: S('minuszerodegrees.net, problems resulting from upgrading an 8088 CPU to a V20', MZD + '/misc/v20_problems.htm') },
+    { part: 'NEC V20 (uPD70108)', kind: 'pin-compatible', verify: true, note: 'Faster at the same clock, and adds an 8080 mode. The trap: the BIOS then runs faster than it was written for. minuszerodegrees has an early 5160 with an AST SixPakPlus that stays dead with a V20 until the card is pulled or the last BIOS is fitted. Refit the 8088 before you blame the board.', source: S('minuszerodegrees.net, problems resulting from upgrading an 8088 CPU to a V20', MZD + '/misc/v20_problems.htm') },
```

### H227

src/data/ibm.js @@ -869,10 +867,10 @@

```diff
-    { part: '82C55A (Intersil)', kind: 'pin-compatible', note: 'CMOS, pin compatible with the NMOS 8255A. The trap: its ports have bus-hold circuits, so an open input holds its last level instead of floating HIGH.', source: S('Intersil 82C55A data sheet, pin description (bus hold), p. 3', RN('82c55a') + '#page=3') },
+    { part: '82C55A (Intersil)', kind: 'pin-compatible', note: 'CMOS, pin compatible with the NMOS 8255A. The trap: its ports have bus-hold circuits instead of floating. Port A holds either level, so an open port A input keeps its last level; ports B and C have bus-hold-high circuits, so an open input reads HIGH.', source: S('Intersil 82C55A data sheet, pin description (bus hold), p. 3', RN('82c55a') + '#page=3') },
-    { part: '8259A-2', kind: 'pin-compatible', note: 'The 8 MHz grade in the same data sheet.', source: S('Intel 8259A/8259A-2/8259A-8 data sheet, p. 2-120', IH + '#page=144') },
+    { part: '8259A-2', kind: 'pin-compatible', verify: true, note: 'A faster timing grade in the same data sheet, same pins. The sheet gives its pulse and delay limits but does not name a CPU clock for it.', source: S('Intel 8259A/8259A-2/8259A-8 data sheet, p. 2-120', IH + '#page=144') },
```

### H228

src/data/ibm.js @@ -880,13 +878,13 @@

```diff
-    { part: '8087, 8087-2 or 8087-1', kind: 'pin-compatible', note: 'Any grade rated 5 MHz or faster works (plain 5 MHz, -2 8 MHz, -1 10 MHz); the board still runs it at 4.77 MHz. A C8087 marked 4MHZ is unsuitable. Set SW1 switch 2 OFF after fitting one. It does not speed up software that does not use it.', source: S('minuszerodegrees.net, Intel 8087 math co-processor (speed rating, switch setting)', MZD + '/npu/8087.htm') },
+    { part: '8087, 8087-2 or 8087-1', kind: 'pin-compatible', verify: true, note: 'Any grade rated 5 MHz or faster works (plain 5 MHz, -2 8 MHz, -1 10 MHz); the board still runs it at 4.77 MHz. A C8087 marked 4MHZ is unsuitable. Set SW1 switch 2 OFF after fitting one. It does not speed up software that does not use it.', source: S('minuszerodegrees.net, Intel 8087 math co-processor (speed rating, switch setting)', MZD + '/npu/8087.htm') },
-    { part: 'HD6845S (Hitachi) or UM6845 (UMC)', kind: 'pin-compatible', note: 'Amstrad CPC: CRTC type 0, the usual CPC part (HD6845SP at IC108). The CPC community numbers the 6845 makes "types 0 to 4": same pinout, but they differ in detail, and demos and some games detect the type and break on the wrong one. Fit the same type as the original.', source: S('CPCWiki, CRTC: part numbers and type numbers (archived Jan 2025)', 'https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC') },
-    { part: 'UM6845R (UMC)', kind: 'pin-compatible', note: 'Amstrad CPC: CRTC type 1. Adds a status register (read at &BExx on the CPC) and behaves differently from type 0 in some register cases. Replace a type 1 with a type 1.', source: S('CPCWiki, CRTC: type 1 status register (archived Jan 2025)', 'https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC') },
+    { part: 'HD6845S (Hitachi) or UM6845 (UMC)', kind: 'pin-compatible', verify: true, note: 'Amstrad CPC: CRTC type 0, the usual CPC part (HD6845SP at IC108). The CPC community numbers the 6845 makes "types 0 to 4": same pinout, but they differ in detail, and demos and some games detect the type and break on the wrong one. Fit the same type as the original.', source: S('CPCWiki, CRTC: part numbers and type numbers (archived Jan 2025)', 'https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC') },
+    { part: 'UM6845R (UMC)', kind: 'pin-compatible', verify: true, note: 'Amstrad CPC: CRTC type 1. Adds a status register (read at &BExx on the CPC) and behaves differently from type 0 in some register cases. Replace a type 1 with a type 1.', source: S('CPCWiki, CRTC: type 1 status register (archived Jan 2025)', 'https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC') },
```

### H229

src/data/ibm.js @@ -1051,7 +1049,7 @@

```diff
-          sources: [S('IBM PC XT Technical Reference (Apr 1984), I/O channel diagram, p. 1-16', XTTR + '#page=36')] },
+          sources: [S('IBM PC XT Technical Reference (Apr 1984), I/O channel diagram, p. 1-17', XTTR + '#page=36')] },
```

### H230

src/data/ibm.js @@ -1069,7 +1067,7 @@

```diff
-        psuConn('p-psu', { verifiedAgainst: 'IBM PC XT Technical Reference (Apr 1984), Portable power supply and connectors, p. 3-10', sources: [S('IBM PC XT Technical Reference (Apr 1984), Portable Power Supply and Connectors, p. 3-10', XTTR + '#page=71')] }),
+        psuConn('p-psu', { pins: psuPins.map(nominal), verifiedAgainst: 'IBM PC XT Technical Reference (Apr 1984), Portable power supply and connectors, p. 3-10', sources: [S('IBM PC XT Technical Reference (Apr 1984), Portable Power Supply and Connectors, p. 3-10', XTTR + '#page=71')] }),
```

### H231

src/data/ibm.js @@ -1079,17 +1077,17 @@

```diff
-          terms: ['io-channel'], pins: slotPins(T('B8', '-CARD SLCTD', 'ctrl', 'Card selected, active LOW. Driven by the card in slot 8 only.')),
-          sources: [S('IBM PC XT Technical Reference (Apr 1984), I/O channel diagram, p. 1-16', XTTR + '#page=36'), S('IBM PC XT Technical Reference (Apr 1984), Portable system block diagram, p. xviii', XTTR + '#page=19')] },
+          terms: ['io-channel'], pins: slotPins(T('B8', '-CARD SLCTD', 'ctrl', 'Card selected, active LOW. Driven by the card in slot 8 only.')).map(nominal),
+          sources: [S('IBM PC XT Technical Reference (Apr 1984), I/O channel diagram, p. 1-17', XTTR + '#page=36'), S('IBM PC XT Technical Reference (Apr 1984), Portable system block diagram, p. xviii', XTTR + '#page=19')] },
-          verify: false, verifiedAgainst: 'PCjr Technical Reference (Nov 1983), Power Supply connector specifications, p. 2-138',
-          summary: 'The external transformer brick plugs in here. It supplies low-voltage AC, not DC: two 17 V AC legs around a centre ground. The power board inside turns it into +5 V, +12 V and -6 V. Pin order follows the manual; the socket face and polarisation were not checked.',
+          verify: true, verifiedAgainst: 'PCjr Technical Reference (Nov 1983), Power Supply connector specifications, p. 2-138; PCjr HMS (Sep 1983) p. 3-020-8',
+          summary: 'The external transformer brick plugs in here. It supplies low-voltage AC, not DC. The TechRef labels pins 1 and 3 17 V AC and pin 2 ground, but does not say how the winding is tapped, so do not assume a 17 + 17 V centre tap. IBM\'s own check: 15.0 to 30.0 V AC between pins 1 and 3 with the transformer cable unplugged from the PCjr; outside that range the transformer is bad. The power board inside turns it into +5 V, +12 V and -6 V. Pin order follows the manual; the socket face and polarisation were not checked.',
-          pins: [T('1', '17 VAC', 'power', 'Transformer AC leg.', { expect: 'About 17 V AC to pin 2', conflict: 'PCjr HMS (Sep 1983) p. 3-020-8 measures 15.0 to 30.0 V AC between pins 1 and 3; the TechRef prints 17 V AC each side of the centre, which would read about 34 V across 1 and 3.' }), T('2', 'GND', 'ground', 'Transformer centre (ground).'), T('3', '17 VAC', 'power', 'Transformer AC leg.', { expect: 'About 17 V AC to pin 2' })],
-          sources: [S('PCjr Technical Reference (Nov 1983), power supply connectors, p. 2-138', JRTR + '#page=164')] },
+          pins: [T('1', '17 VAC', 'power', 'Transformer AC output (TechRef label).', { expect: '15.0 to 30.0 V AC to pin 3, transformer unplugged (IBM HMS)', verify: true }), T('2', 'GND', 'ground', 'Ground (TechRef label). How it connects to the winding is not documented.', { verify: true }), T('3', '17 VAC', 'power', 'Transformer AC output (TechRef label).', { expect: '15.0 to 30.0 V AC to pin 1, transformer unplugged (IBM HMS)', verify: true })],
+          sources: [S('PCjr Technical Reference (Nov 1983), power supply connectors, p. 2-138', JRTR + '#page=164'), S('IBM PCjr Hardware Maintenance and Service (Sep 1983), power transformer check (pin 1 to pin 3, 15.0 to 30.0 V AC), p. 3-020-8', JRHMS + '#page=62')] },
```

### H232

src/data/ibm.js @@ -1204,8 +1202,8 @@

```diff
-          verify: false, verifiedAgainst: 'PCjr Technical Reference (Nov 1983), Program Cartridge connector specification, p. 2-117',
-          summary: 'ROM cartridges, for example Cartridge BASIC. A2 is the cartridge reset tab, a momentary reset land. A4 and A9 (-BASE 1 and -BASE 2 ROM IN CARTRIDGE) signal that a ROM is fitted. Power off before inserting one.',
+          verify: true, verifiedAgainst: 'PCjr Technical Reference (Nov 1983), Program Cartridge connector specification, p. 2-117',
+          summary: 'ROM cartridges, for example Cartridge BASIC. A2 is the cartridge reset tab, a momentary reset land. A4 and A9 (-BASE 1 and -BASE 2 ROM IN CARTRIDGE) signal that a ROM is fitted. Power off before inserting one. Layout: the TechRef draws the A row on the top of the cartridge with A1 at the left and the contacts pointing away, so looking into a slot the A row is on top and A1 at the left; IBM does not draw the slot itself (verify).',
```

### H233

src/data/ibm.js @@ -1223,8 +1221,8 @@

```diff
-          verify: false, verifiedAgainst: 'PCjr Technical Reference (Nov 1983), I/O Channel Expansion Connector Specifications, p. 2-22',
-          summary: 'The right-side bus for sidecar attachments. It carries the minimum-mode 8088 bus, with IO/-M as well as -IOR and -IOW, plus IRQ1, IRQ2, IRQ7, DRQ0 and AUDIO IN. With the internal options fitted only about 400 mA of +5 V is left for sidecars.',
+          verify: true, verifiedAgainst: 'PCjr Technical Reference (Nov 1983), I/O Channel Expansion Connector Specifications, p. 2-22',
+          summary: 'The right-side bus for sidecar attachments. It carries the minimum-mode 8088 bus, with IO/-M as well as -IOR and -IOW, plus IRQ1, IRQ2, IRQ7, DRQ0 and AUDIO IN. With the internal options fitted only about 400 mA of +5 V is left for sidecars. The TechRef gives the pin table but no view of the connector, so which row faces up and which end is pin 1 are assumed (verify).',
```

### H234

src/data/ibm.js @@ -1260,7 +1258,7 @@

```diff
-            'Power Good (P8-1) must rise 100 to 500 ms after the rails. Off for less than 5 seconds, the supply may not send it again and the board sits dead with no beep.',
+            'Power Good (P8-1) rises at least 100 ms after the rails reach their sense levels (PC TechRef p. 1-27). Off for less than 5 seconds, the supply may not send it again and the board sits dead with no beep.',
```

### H235

src/data/ibm.js @@ -1277,7 +1275,7 @@

```diff
-          { rail: 'Power Good', expect: '0 to 0.4 V at switch-on, then 2.4 to 5.5 V after 100 to 500 ms', where: 'pc-psu pin P8-1; 8284A pin 11', note: 'The 8284A holds the CPU in reset until it is HIGH. Wait at least 5 seconds off before switching on again.' },
+          { rail: 'Power Good', expect: '0 to 0.4 V at switch-on, then 2.4 to 5.5 V at least 100 ms later', where: 'pc-psu pin P8-1; 8284A pin 11', note: 'The 8284A holds the CPU in reset until it is HIGH. Wait at least 5 seconds off before switching on again.' },
```

### H236

src/data/ibm.js @@ -1286,7 +1284,7 @@

```diff
-          { tp: 'Reset in (Power Good)', where: '8284A pin 11', expect: 'LOW at switch-on, HIGH after 100 to 500 ms' },
+          { tp: 'Reset in (Power Good)', where: '8284A pin 11', expect: 'LOW at switch-on, HIGH at least 100 ms later' },
```

### H237

src/data/ibm.js @@ -1323,7 +1321,7 @@

```diff
-          { step: 2, check: 'Power Good', where: 'pc-psu pin P8-1 to pin P8-5 (at the system board connector)', expect: '+2.4 to +5.2 V DC once running; LOW for the first 100 to 500 ms',
+          { step: 2, check: 'Power Good', where: 'pc-psu pin P8-1 to pin P8-5 (at the system board connector)', expect: '+2.4 to +5.2 V DC once running; LOW for at least the first 100 ms',
```

### H238

src/data/ibm.js @@ -1463,7 +1461,7 @@

```diff
-          output: 'Transformer: 17 V AC either side of a centre ground (as printed in the TechRef). Power board: +5 V 3.6 A, +12 V 1.2 A, -6 V 0.025 A',
+          output: 'Transformer: AC output, 15.0 to 30.0 V AC between pins 1 and 3 when unplugged (IBM HMS check; the TechRef labels 1 and 3 "17 V AC" and 2 ground, winding not documented). Power board: +5 V 3.6 A, +12 V 1.2 A, -6 V 0.025 A',
```

### H239

src/data/ibm.js @@ -1474,13 +1472,14 @@

```diff
+            S('IBM PCjr Hardware Maintenance and Service (Sep 1983), power transformer check, p. 3-020-8', JRHMS + '#page=62'),
-          { rail: 'Transformer AC', expect: 'About 17 V AC, pin 1 or 3 to pin 2', where: 'Power in socket (P)', note: 'AC, not DC.' },
+          { rail: 'Transformer AC', expect: '15.0 to 30.0 V AC, pin 1 to pin 3, cable unplugged (IBM HMS)', where: 'Power in socket (P)', note: 'AC, not DC. The TechRef labels pins 1 and 3 17 V AC; how the winding is tapped to pin 2 is not documented.' },
```

### H240

src/data/msx.js @@ -36,13 +36,13 @@ Object.assign(RCS.terms, {

```diff
-  id: `${mid}-cart`, name: 'Cartridge slot', kind: '50-way 2.54 mm card-edge socket (25 + 25), odd pins one side, even the other', geo: 'edge-25x25-odd-even',
+  id: `${mid}-cart`, name: 'Cartridge slot', kind: '50-way 2.54 mm card-edge socket (25 + 25), odd pins one side, even the other', geo: 'edge-25x25-odd-even', verify: true,
-    c(3, '/CS12', 'ctrl', 'ROM select, $4000-$BFFF (one 32 KB ROM).'), c(4, '/SLTSL', 'ctrl', 'Slot select for this slot, from the slot decoder (8255 port A).'),
-    c(5, 'RSV', 'nc', 'Reserved (the book notes it for 256K ROM). Do not use.'), c(6, '/RFSH', 'ctrl', 'Z80 refresh.'),
+    c(3, '/CS12', 'ctrl', 'ROM select, $4000-$BFFF (one 32 KB ROM; the book notes it for 256K ROM).'), c(4, '/SLTSL', 'ctrl', 'Slot select for this slot, from the slot decoder (8255 port A).'),
+    c(5, 'RSV', 'nc', 'Reserved for future expansion. Do not use.'), c(6, '/RFSH', 'ctrl', 'Z80 refresh.'),
```

### H241

src/data/msx.js @@ -55,9 +55,9 @@ const cartridge = mid => ({

```diff
-    c(45, '+5 V', 'power', '+5 V supply, 300 mA per slot.', { expect: V5 }), c(46, 'SW2', 'ctrl', 'Insert/remove detect (protection); paired with SW1.'),
-    c(47, '+5 V', 'power', '+5 V supply.', { expect: V5 }), c(48, '+12 V', 'power', '+12 V supply, 50 mA.', { expect: '+11.4 to +12.6 V DC' }),
-    c(49, 'SOUNDIN', 'audio', 'Sound input from the cartridge, mixed into the computer\'s audio (-5 dBm).'), c(50, '-12 V', 'power', '-12 V supply, 50 mA.', { expect: '-11.4 to -12.6 V DC' })
+    c(45, '+5 V', 'power', '+5 V supply, 300 mA per slot.', { expect: '+5 V DC' }), c(46, 'SW2', 'ctrl', 'Insert/remove detect (protection); paired with SW1.'),
+    c(47, '+5 V', 'power', '+5 V supply.', { expect: '+5 V DC' }), c(48, '+12 V', 'power', '+12 V supply, 50 mA.', { expect: '+12 V DC' }),
+    c(49, 'SOUNDIN', 'audio', 'Sound input from the cartridge, mixed into the computer\'s audio (-5 dBm).'), c(50, '-12 V', 'power', '-12 V supply, 50 mA.', { expect: '-12 V DC' })
```

### H242

src/data/msx.js @@ -84,13 +84,13 @@ const joystick = (mid, n) => ({

```diff
-  summary: 'FSK at 1200 baud (1200 Hz = 0, two cycles of 2400 Hz = 1) or 2400 baud. The book names DIN 45326 and its drawing (key at the top) turned upright matches the standard 8-pin 270 degree numbering: 1 4 2 5 3 over the top, 6 and 7 either side of the key, 8 in the centre. CMTOUT comes from 8255 port C bit 5 through a filter; CMTIN is shaped and read on PSG port A bit 7; REMOTE is a relay contact closed by 8255 port C bit 4 (LOW = motor on). The usual adapter lead splits this into MIC, EAR and REMOTE plugs.',
+  summary: 'FSK at 1200 baud (1200 Hz = 0, two cycles of 2400 Hz = 1) or 2400 baud. The book names DIN 45326 and its drawing (key at the top) turned upright matches the standard 8-pin 270 degree numbering: 1 4 2 5 3 over the top, 6 and 7 either side of the key, 8 in the centre. CMTOUT comes from 8255 port C bit 5 through a filter; CMTIN is shaped and read on PSG port A bit 7; REMOTE is the motor control from 8255 port C bit 4 (LOW = motor on); the book does not say how it is switched (most machines use a relay). The usual adapter lead splits this into MIC, EAR and REMOTE plugs.',
-    c(6, 'REMOTE +', 'ctrl', 'Motor relay contact.', { expect: 'Closed to pin 7 while the motor is on' }),
-    c(7, 'REMOTE -', 'ctrl', 'Motor relay contact (other side).'),
+    c(6, 'REMOTE +', 'ctrl', 'Motor control, pairs with pin 7.', { expect: 'Closed to pin 7 while the motor is on', verify: true }),
+    c(7, 'REMOTE -', 'ctrl', 'Motor control, pairs with pin 6.'),
```

### H243

src/data/msx.js @@ -207,7 +207,7 @@ const vdp9938 = {

```diff
-    { part: 'Yamaha V9958 (MSX2+ VDP)', kind: 'pin-compatible',
+    { part: 'Yamaha V9958 (MSX2+ VDP)', kind: 'adapter',
```

### H244

src/data/oric.js @@ -11,6 +11,7 @@ const WB = 'https://web.archive.org/web/2025/https://wiki.defence-force.org/';

```diff
+const OSM = { label: 'Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)', url: 'https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12' };
```

### H245

src/data/oric.js @@ -31,12 +32,13 @@ const V5 = '+4.95 to +5.05 V DC';

```diff
-  summary: 'The 6502 bus on bare PCB fingers at the rear. Looking at the back of the machine, the odd row (1-33) is the lower row and the even row (2-34) the upper one, 1 and 2 at the left (Atmos manual Appendix 11). Used by the Microdisc, Cumana and Jasmin drives and the diagnostic ROM board. /MAP (1) swaps the ROM at $C000-$FFFF for the RAM under it, /ROMDIS (2) turns the BASIC ROM off, I/O CONTROL (6) disables the internal VIA so a card can answer in $0310-$03FF; /I/O (5) goes low for any access to $0300-$03FF. Pin 33 is the computer\'s own +5 V. A dirty edge gives random crashes or a dead disc interface.',
+  summary: 'The 6502 bus on bare PCB fingers at the rear. Looking at the back of the machine, the odd row (1-33) is the lower row and the even row (2-34) the upper one, 1 and 2 at the left (Atmos manual Appendix 11). Used by the Microdisc, Cumana and Jasmin drives and the diagnostic ROM board. /MAP (1) swaps the ROM at $C000-$FFFF for the RAM under it, /ROMDIS (2) turns the BASIC ROM off, I/O CONTROL (6) disables the internal VIA so a card can answer in $0310-$03FF; /I/O (5) goes low for any access to $0300-$03FF. Pin 33 is the computer\'s own +5 V. A dirty edge gives random crashes or a dead disc interface.' + (mid === 'oric1' ? ' No Oric-1 drawing of this edge was found: the row layout is taken from the Atmos drawing (verify).' : ''),
+  ...(mid === 'oric1' ? { verify: true } : {}),
-    c(4, '/RESET', 'ctrl', 'System reset: 6502 /RES (pin 40) and VIA /RES (pin 34).', { expect: '+5 V; low only during power-on reset' }),
+    c(4, '/RESET', 'ctrl', 'System reset: 6502 /RES (pin 40) and VIA /RES (pin 34). Also an input: an expansion device may pull it LOW to reset the machine.', { expect: '+5 V; LOW during power-on reset or while a device holds reset' }),
```

### H246

src/data/oric.js @@ -47,16 +49,17 @@ const expansion = (mid, src, vf) => ({

```diff
-    c(33, '+5 V', 'power', 'Computer +5 V rail (the same rail as the DC jack centre pin). Light loads only.', { expect: V5 }),
+    c(33, '+5 V', 'power', 'Computer +5 V rail (the same rail as the DC jack centre pin). Light loads only.', { expect: '+5 V DC' }),
-  sources: [...src, W_EXP], terms: ['edge-connector', 'reset', 'irq']
+  sources: [...src, W_EXP, OSM], terms: ['edge-connector', 'reset', 'irq']
-  summary: 'Eight-bit Centronics output from the VIA: data is VIA port A, STROBE is PB4, ACK comes back on CA1. Looking at the back, odd signals (1-19) are the lower row and the even grounds (2-20) the upper row, 1 at the left. Port A is shared with the AY-3-8912 data bus, so the pins toggle during sound and keyboard scans even with no printer; a printer must latch on STROBE. LPRINT and LLIST use it; the Oric MCP-40 is the matching printer.',
+  summary: 'Eight-bit Centronics output from the VIA: data is VIA port A, STROBE is PB4, ACK comes back on CA1. Looking at the back, odd signals (1-19) are the lower row and the even grounds (2-20) the upper row, 1 at the left. Port A is shared with the AY-3-8912 data bus, so the pins toggle during sound and keyboard scans even with no printer; a printer must latch on STROBE. LPRINT and LLIST use it; the Oric MCP-40 is the matching printer.' + (mid === 'oric1' ? ' No Oric-1 drawing of this edge was found: the row layout is taken from the Atmos drawing (verify).' : ''),
+  ...(mid === 'oric1' ? { verify: true } : {}),
```

### H247

src/data/oric.js @@ -132,7 +135,7 @@ const keyboard = (mid, src, vf, extra = {}) => Object.assign({

```diff
-    c(10, 'GND', 'ground', GND, { expect: '0 V' }), c(14, '+5 V', 'power', 'Keyboard decoder supply.', { expect: V5 })
+    c(10, 'GND', 'ground', GND, { expect: '0 V' }), c(14, '+5 V', 'power', 'Keyboard decoder supply.', { expect: '+5 V DC' })
```

### H248

src/data/oric.js @@ -187,7 +190,7 @@ const supplyNotes = [

```diff
-const supplySrc = [SCH1, CHK, W_REP];
+const supplySrc = [SCH1, OO5, CHK, W_REP];
```

### H249

src/data/oric.js @@ -375,28 +378,28 @@ RCS.add({

```diff
-      powerIn('oric1', [SCH1, CHK], 'Oric-1 48K circuit diagram (SK3, IC1 7905); repair checklist (centre positive)'),
-      rf('oric1', [SCH2, atm('ch. 1 Getting the ATMOS together, p. 3-4', 8), CHK], 'Oric-1 circuit diagram (modulator); Atmos manual ch. 1 and Appendix 11 drawing'),
+      powerIn('oric1', [SCH1, OO5, CHK], 'Oric-1 48K circuit diagram (SK3, IC1 7905); repair checklist (centre positive)'),
+      rf('oric1', [SCH2, OO5, atm('ch. 1 Getting the ATMOS together, p. 3-4', 8), CHK], 'Oric-1 circuit diagram (modulator); Atmos manual ch. 1 and Appendix 11 drawing'),
-      rgb('atmos', [...SA, SCH1], VFA, 'rgb'),
+      rgb('atmos', [...SA, SCH1, OO5], VFA, 'rgb'),
-      powerIn('atmos', [atm('ch. 1 Getting the ATMOS together, p. 3', 8), CHK, SCH1], 'Atmos manual ch. 1 (9 V DC, socket at the left rear); repair checklist (7905, centre positive, Oric/Atmos boards)'),
+      powerIn('atmos', [atm('ch. 1 Getting the ATMOS together, p. 3', 8), CHK, SCH1, OO5], 'Atmos manual ch. 1 (9 V DC, socket at the left rear); repair checklist (7905, centre positive, Oric/Atmos boards)'),
-      keyboard('atmos', [SCH1, W_KBD], 'Oric-1 circuit diagram PL3 (Atmos keyboard assumed the same)', { verify: true, summary: 'Not sourced for the Atmos: the pin table is the Oric-1 schematic\'s PL3, assumed unchanged because the Atmos keeps the same 8 x 8 matrix (FUNCT added at row 5, column 4). Columns are AY port A, rows VIA PB0-PB2, sense through TR2 to VIA PB3. Confirm with a meter before relying on it.' })
+      keyboard('atmos', [SCH1, OO5, W_KBD], 'Oric-1 circuit diagram PL3 (Atmos keyboard assumed the same)', { verify: true, summary: 'Not sourced for the Atmos: the pin table is the Oric-1 schematic\'s PL3, assumed unchanged because the Atmos keeps the same 8 x 8 matrix (FUNCT added at row 5, column 4). Columns are AY port A, rows VIA PB0-PB2, sense through TR2 to VIA PB3. Confirm with a meter before relying on it.' })
-      rails, testPoints, firstTen, clocks, sources: [SCH1, SCH2, CHK, DIAG]
+      rails, testPoints, firstTen, clocks, sources: [SCH1, SCH2, OO5, CHK, DIAG]
-      rails, testPoints, firstTen, clocks, sources: [CHK, DIAG, SCH1]
+      rails, testPoints, firstTen, clocks, sources: [CHK, DIAG, SCH1, OO5]
```

### H250

src/data/photos.js @@ -137,7 +137,7 @@

```diff
-        rom2764: [0.500, 0.417, 0.062, 0.168], psg76489: [0.418, 0.447, 0.040, 0.108],
+        'rom9464-cv': [0.500, 0.417, 0.062, 0.168], psg76489: [0.418, 0.447, 0.040, 0.108],
```

### H251

src/data/schematics.js @@ -551,6 +551,7 @@ RCS.addSchematics({

```diff
+    { board: 'CPU board 1700069', rev: 'A to G', years: '1977-81', kind: 'schematic', label: 'TRS-80 Technical Reference Handbook, 2nd ed.: master schematic, text-layer mirror of the same scan', url: 'https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack_text.pdf#page=114', host: 'archive.org', note: 'Use when the main PDF returns HTTP 500 (it did during the October 2026 fact-check). Same page numbers.' },
```

### H252

src/data/sinclair.js @@ -315,14 +315,14 @@ RCS.add({

```diff
-        { n: 36, name: "A3'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A3'. Driven with the character code during display refresh cycles." },
+        { n: 36, name: "A3'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A3'. Driven with the character code during display refresh cycles; whether the ULA also reads it is not stated in the sources.", verify: true },
-        { part: '2C210E', kind: 'pin-compatible', note: 'The later ZX81 ULA, with a video back porch. The 2C184E (and the older 2C158E) has none, and most colour TVs will not lock to it: a blank screen on a 2C184E machine can be a working computer.', source: S('retro.engineer, Sinclair ZX81 A (Issue 1, 2C184E ULA: video incompatible with most colour TVs)', 'https://retro.engineer/projects/2021-03-13_Sinclair_ZX81_A/') },
+        { part: '2C210E', kind: 'pin-compatible', verify: true, note: 'The later ZX81 ULA, with a video back porch. The 2C184E (and the older 2C158E) has none, and most colour TVs will not lock to it: a blank screen on a 2C184E machine can be a working computer.', source: S('retro.engineer, Sinclair ZX81 A (Issue 1, 2C184E ULA: video incompatible with most colour TVs)', 'https://retro.engineer/projects/2021-03-13_Sinclair_ZX81_A/') },
```

### H253

src/data/sinclair.js @@ -364,7 +364,7 @@ RCS.add({

```diff
-      summary: 'An 8K mask ROM in the 24-pin 2364 pinout. Selected by the ULA /ROMCS on pin 20. A0-A8 come from the ULA side of the 1 kohm resistors, so the ULA can fetch character patterns while the CPU is busy. A dead ROM gives a blank or garbage screen.',
+      summary: 'An 8K mask ROM in the 24-pin 2364 pinout, selected on pin 20. Board wiring (ZX81 circuit diagram SRC 049; the TS1000 board follows it): /ROMCS comes from ULA pin 13 through R28 (680 ohm), and an add-on can pull it HIGH from edge pin B23 to switch the ROM out; A0-A8 come from the ULA side of the 1 kohm resistors, so the ULA can fetch character patterns while the CPU is busy. The TS1500 wiring is not confirmed. A dead ROM gives a blank or garbage screen.',
```

### H254

src/data/sinclair.js @@ -387,15 +387,15 @@ RCS.add({

```diff
-        { n: 20, name: '/ROMCS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select from ULA pin 13 through R28 (680 ohm). An add-on can pull it HIGH from edge pin B23.', terms: ['cs'], probe: 'Pulses LOW on ROM access.' },
+        { n: 20, name: '/ROMCS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select, active LOW (board wiring: see the summary).', terms: ['cs'], probe: 'Pulses LOW on ROM access.' },
-        { part: '2764 EPROM on a 24-to-28 pin adapter', kind: 'adapter', note: 'The ZX81 ROM is a 24-pin 2364 type, so a 28-pin 2764 cannot go straight in: it sits in a 28-pin socket wired to a 24-pin plug. Sinc-Link v3 n5 gives the wiring.', source: S('Sinc-Link v3 n5 (1985), ZX81 ROM adapter: 2764 EPROM to replace the Sinclair ROM', 'https://archive.org/details/SincLink/Sinc-Link%20Vol%2003%20No%205/page/n9') },
-        { part: 'AT28C128 / AT28C256 PLCC adapter', kind: 'adapter', note: 'Shared through-hole board for ZX81 Issue 3 carrying a PLCC EEPROM; up to four ROM images, picked with jumpers. Check the board issue before ordering.', source: S('OSH Park shared project, ZX81 ROM adapter for AT28C128/AT28C256-JU', 'https://oshpark.com/shared_projects/22vOyf1p') }
+        { part: '2764 EPROM on a 24-to-28 pin adapter', kind: 'adapter', note: 'The ZX81 ROM is a 24-pin 2364 type, so a 28-pin 2764 cannot go straight in: it sits in a 28-pin socket wired to a 24-pin plug. Sinc-Link v3 n5 gives the wiring.', source: S('Sinc-Link v3 n5 (1985), ZX81 ROM adapter: 2764 EPROM to replace the Sinclair ROM', 'https://archive.org/details/SincLink/Sinc-Link%20Vol%2003%20No%205/page/n8') },
+        { part: 'AT28C128 / AT28C256 PLCC adapter', kind: 'adapter', verify: true, note: 'Shared through-hole board for ZX81 Issue 3 carrying a PLCC EEPROM; up to four ROM images, picked with jumpers. Check the board issue before ordering.', source: S('OSH Park shared project, ZX81 ROM adapter for AT28C128/AT28C256-JU', 'https://oshpark.com/shared_projects/22vOyf1p') }
```

### H255

src/data/sinclair.js @@ -519,9 +519,9 @@ RCS.add({

```diff
-        { part: '6C001E-7', kind: 'pin-compatible', note: 'The only ULA documented for every 48K board, Issue 1 to 6A, and the one Issue 4A and later boards need (their RAM timing changes go with it).', source: S('Spectrum For Everyone, ZX Spectrum ULA Types', SFE_ULA) },
-        { part: '6C001E-5 / 6C001E-6', kind: 'pin-compatible', note: 'Issue 1, 2 and 3 boards only; not for 4A/4B, 5 or 6A. The -5 moves the whole picture one character left and lets the EAR bit float until warm, which breaks software that reads the keyboard without masking.', source: S('Spectrum For Everyone, ZX Spectrum ULA Types', SFE_ULA) },
-        { part: '5C102E / 5C112E', kind: 'pin-compatible', note: 'Issue 1 and 2 boards. A 5C102E needs the "cockroach" 74LS00 mod; a 5C112E in an Issue 1 board needs the cockroach removed.', source: S('Spectrum For Everyone, ZX Spectrum ULA Types', SFE_ULA) },
+        { part: '6C001E-7', kind: 'pin-compatible', verify: true, note: 'The only ULA documented for every 48K board, Issue 1 to 6A, and the one Issue 4A and later boards need (their RAM timing changes go with it).', source: S('Spectrum For Everyone, ZX Spectrum ULA Types', SFE_ULA) },
+        { part: '6C001E-5 / 6C001E-6', kind: 'pin-compatible', verify: true, note: 'Issue 1, 2 and 3 boards only; not for 4A/4B, 5 or 6A. The -5 moves the whole picture one character left and lets the EAR bit float until warm, which breaks software that reads the keyboard without masking.', source: S('Spectrum For Everyone, ZX Spectrum ULA Types', SFE_ULA) },
+        { part: '5C102E / 5C112E', kind: 'pin-compatible', verify: true, note: 'Issue 1 and 2 boards. A 5C102E needs the "cockroach" 74LS00 mod; a 5C112E in an Issue 1 board needs the cockroach removed.', source: S('Spectrum For Everyone, ZX Spectrum ULA Types', SFE_ULA) },
```

### H256

src/data/tandy.js @@ -17,6 +17,8 @@ const DS6883 = n => `${DS}/MC6883%20Synchronous%20Address%20Multiplexer%20(Motor

```diff
+/* Same scan, archive.org text-layer copy: the main PDF has returned HTTP 500 at times. */
+const TRH_TXT = n => `${IA}/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack_text.pdf#page=${n}`;
```

### H257

src/data/tandy.js @@ -124,6 +126,9 @@ const PRNPINS = Array.from({ length: 34 }, (_, i) => {

```diff
+/* Model 4: the latch is U66 (Model 4 TRM 3.1.11, p. 21; schematic sheet 4); the spare status routing is not checked. */
+const M4PRNPINS = PRNPINS.map(p => p.name.startsWith('DATA') ? { ...p, desc: p.desc.replace('U94', 'U66') }
+  : p.name === 'STATUS IN' ? { ...p, desc: 'Spare status input. Model 4 routing not checked.', verify: true } : p);
```

### H258

src/data/tandy.js @@ -350,9 +355,9 @@ RCS.add({

```diff
-      role: 'Main CPU, 8-bit with 16-bit registers. Same CPU in all CoCo models.', pkg: 'DIP-40',
+      role: 'Main CPU, 8-bit with 16-bit registers. Same CPU in every CoCo and in the Dragon 32 and 64.', pkg: 'DIP-40',
-      summary: 'The 6809E runs the CoCo from the E and Q clocks that the SAM (CoCo 1 and 2) or the GIME (CoCo 3) makes. No clock, no boot. It takes its reset from the power-on circuit. The CoCo 3 runs the same chip at 1.79 MHz in double-speed mode.',
+      summary: 'The 6809E runs the CoCo from the E and Q clocks that the SAM (CoCo 1 and 2) or the GIME (CoCo 3) makes. No clock, no boot. It takes its reset from the power-on circuit. The CoCo 3 runs the same chip at 1.79 MHz in double-speed mode. CoCo 3 (IC1): BS, BA, BUSY, AVMA and LIC (pins 5, 6, 33, 36, 38) are not connected and TSC (pin 39) is tied to ground.',
```

### H259

src/data/tandy.js @@ -363,15 +368,15 @@ RCS.add({

```diff
-        { part: 'Hitachi HD63B09E / HD63C09E (6309)', kind: 'pin-compatible', note: 'CMOS, object-code compatible, 2 or 3 MHz, same pinout. Trap: it traps illegal opcodes through the $FFF0 vector, so 6809 software that uses undocumented opcodes (for example $10 $20 as LBRA) crashes; the guide warns that a machine whose ROM holds $0000 in that vector may need a new ROM. Native mode needs 6309-aware software.', source: { label: 'HD63B09EP Technical Reference Guide, Error Trapping', url: HD6309TRG(13) } },
+        { part: 'Hitachi HD63B09E / HD63C09E (6309)', kind: 'pin-compatible', note: 'CMOS, object-code compatible, 2 or 3 MHz, same pinout. Trap: it traps illegal opcodes through the $FFF0 vector, so 6809 software that uses undocumented opcodes (for example $10 $20 as LBRA) crashes; the guide warns that a machine whose ROM holds $0000 in that vector may need a new ROM. Native mode needs 6309-aware software.', source: { label: 'HD63B09EP Technical Reference Guide, Error Trapping, p. 14', url: HD6309TRG(14) } },
-        { n: 3, name: '/IRQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Interrupt request. Active LOW. The PIAs and the VDG sync use it.', terms: ['irq'] },
+        { n: 3, name: '/IRQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Interrupt request. Active LOW.', terms: ['irq'] },
-        { n: 5, name: 'BS', type: 'ctrl', dir: 'out', desc: 'Bus status. HIGH with BA means the CPU is halted or in reset.', probe: 'Not connected on the CoCo 3.' },
-        { n: 6, name: 'BA', type: 'ctrl', dir: 'out', desc: 'Bus available. HIGH means the bus is released.', probe: 'Not connected on the CoCo 3.' },
+        { n: 5, name: 'BS', type: 'ctrl', dir: 'out', desc: 'Bus status. Read with BA: BA LOW and BS HIGH is an interrupt or reset acknowledge; BA HIGH and BS LOW is a SYNC acknowledge; both HIGH is a halt acknowledge.' },
+        { n: 6, name: 'BA', type: 'ctrl', dir: 'out', desc: 'Bus available. HIGH means the CPU has stopped and its address and data buses are high impedance.' },
```

### H260

src/data/tandy.js @@ -398,21 +403,21 @@ RCS.add({

```diff
-        { n: 33, name: 'BUSY', type: 'ctrl', dir: 'out', desc: 'Busy. HIGH during the read and modify cycles of a read-modify-write instruction and the first byte of a double-byte access.', probe: 'Not connected on the CoCo 3.' },
+        { n: 33, name: 'BUSY', type: 'ctrl', dir: 'out', desc: 'Busy. HIGH during the read and modify cycles of a read-modify-write instruction and the first byte of a double-byte access.' },
-        { n: 36, name: 'AVMA', type: 'ctrl', dir: 'out', desc: 'Advanced valid memory address. Tells the bus a valid address is out next cycle.', probe: 'Not connected on the CoCo 3.' },
+        { n: 36, name: 'AVMA', type: 'ctrl', dir: 'out', desc: 'Advanced valid memory address. Tells the bus a valid address is out next cycle.' },
-        { n: 38, name: 'LIC', type: 'ctrl', dir: 'out', desc: 'Last instruction cycle. HIGH on the last cycle of an opcode.', probe: 'Not connected on the CoCo 3.' },
-        { n: 39, name: 'TSC', type: 'ctrl', dir: 'in', desc: 'Three-state control. HIGH floats the address and data bus.', probe: 'Tied to ground on the CoCo 3.' },
-        { n: 40, name: '/HALT', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Halt. LOW stops the CPU at the next cycle boundary.', terms: ['active-low'] },
+        { n: 38, name: 'LIC', type: 'ctrl', dir: 'out', desc: 'Last instruction cycle. HIGH on the last cycle of an opcode.' },
+        { n: 39, name: 'TSC', type: 'ctrl', dir: 'in', desc: 'Three-state control. HIGH floats the address and data bus.' },
+        { n: 40, name: '/HALT', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Halt. LOW stops the CPU at the end of the current instruction; it stays halted, with BA and BS HIGH, until the pin goes HIGH again.', terms: ['active-low'] },
-      role: 'Text, semigraphics and colour video from screen RAM. Used in the CoCo 1, CoCo 2 and MC-10.', pkg: 'DIP-40',
+      role: 'Text, semigraphics and colour video from screen RAM. Used in the CoCo 1 and 2, the MC-10 and the Dragon 32 and 64.', pkg: 'DIP-40',
-      summary: 'The 6847 builds the picture from screen RAM and its character ROM, then sends colour and sync to the RF modulator or the composite out. It runs warm. VDG faults are video-only: a dead VDG gives no picture, but the 6809 keeps running. The CoCo 3 has no separate VDG; the GIME does its job.',
+      summary: 'The 6847 builds the picture from screen RAM and its character ROM, then sends colour and sync to the RF modulator or the composite out. It runs warm. VDG faults are video-only: a dead VDG gives no picture, but the 6809 keeps running. The CoCo 3 has no separate VDG; the GIME does its job. CoCo 1 and 2, Dragon 32 and 64: /HS (pin 38) also feeds SAM pin 9 for DRAM refresh. MC-10: there is no SAM; the 6803 and discrete logic share the video RAM.',
```

### H261

src/data/tandy.js @@ -463,14 +468,14 @@ RCS.add({

```diff
-        { n: 38, name: '/HS', type: 'video', dir: 'out', activeLow: true, desc: 'Horizontal sync output, coincident with the TV horizontal sync pulse. Goes to SAM pin 9.', terms: ['luma-chroma'] },
+        { n: 38, name: '/HS', type: 'video', dir: 'out', activeLow: true, desc: 'Horizontal sync output, coincident with the TV horizontal sync pulse.', terms: ['luma-chroma'] },
-      role: 'Makes all clocks from the 14.31818 MHz crystal, the DRAM strobes and address multiplex, and the device selects. CoCo 1 and 2 only.', pkg: 'DIP-40',
+      role: 'Makes all clocks from the 14.31818 MHz crystal, the DRAM strobes and address multiplex, and the device selects. Used in the CoCo 1 and 2 and the Dragon 32 and 64.', pkg: 'DIP-40',
```

### H262

src/data/tandy.js @@ -498,7 +503,7 @@ RCS.add({

```diff
-        { n: 14, name: 'E', type: 'clock', dir: 'out', desc: 'E (enable) clock to the 6809E pin 34 and the PIAs. 0.89 MHz.', terms: ['clock'], probe: 'Square wave at about 0.89 MHz.' },
+        { n: 14, name: 'E', type: 'clock', dir: 'out', desc: 'E (enable) clock to the 6809E pin 34 and the PIAs. Crystal / 16 at the slow MPU rate (0.89 MHz with 14.31818 MHz) or crystal / 8 at the fast rate (1.79 MHz), set by the SAM rate bits.', terms: ['clock'], probe: 'Square wave at about 0.89 MHz after reset (slow rate); 1.79 MHz if software has set the fast rate.' },
```

### H263

src/data/tandy.js @@ -541,7 +546,8 @@ RCS.add({

```diff
-        { part: 'TCC1014 GIME from another CoCo 3', kind: 'pin-compatible', verify: true, note: 'Tandy custom part with no second source or new replacement. Two production versions exist, the 1986 GIME with known bugs and the revised 1987 GIME; software that relies on either one behaves differently.', source: { label: 'CoCopedia, GIME (known versions)', url: COCOPEDIA_GIME } },
+        { part: 'GIME-Z (CoCo Bits)', kind: 'modern', note: 'FPGA replacement that fits the GIME PLCC socket. Adds faster clock modes and up to 2 MB; often sold out.', source: { label: 'CoCo Bits, GIME-Z FPGA upgrade chip (product page)', url: 'https://cocobits.org/products/gime-z-upgrade-for-the-color-computer-3' } },
+        { part: 'TCC1014 GIME from another CoCo 3', kind: 'pin-compatible', verify: true, note: 'Tandy custom part with no second source. Two production versions exist, the 1986 GIME with known bugs and the revised 1987 GIME; software that relies on either one behaves differently.', source: { label: 'CoCopedia, GIME (known versions)', url: COCOPEDIA_GIME } },
```

### H264

src/data/tandy.js @@ -616,9 +622,10 @@ RCS.add({

```diff
+        { label: 'Hitachi 8/16-bit Microprocessor Data Book (1991), HD6803 (compatible with MC6803), PDF p. 353', url: 'https://www.bitsavers.org/components/hitachi/_dataBooks/1991_M21T132_Hitatchi_8_16_Bit_Microprocessor_Data_Book.pdf#page=353' },
-        { part: 'HD6803P (Hitachi)', kind: 'pin-compatible', note: 'Tandy lists it as the alternative to the MC6803G for U1. No other part is listed.', source: { label: 'MC-10 Service Manual, parts list, Integrated Circuits (U1 MC6803G or HD6803P), p. 27', url: SM10(27) } },
+        { part: 'HD6803P (Hitachi)', kind: 'pin-compatible', note: 'Tandy lists it as the alternative to the MC6803G for U1. Hitachi data sheet says it is compatible with the MC6803 and MC6803-1 (1991 Hitachi 8/16-bit Microprocessor Data Book, HD6803, PDF p. 353). No Motorola MC6803 data sheet was opened to compare electrical limits.', source: { label: 'MC-10 Service Manual, parts list, Integrated Circuits (U1 MC6803G or HD6803P), p. 27', url: SM10(27) } },
```

### H265

src/data/tandy.js @@ -751,7 +758,7 @@ RCS.add({

```diff
-        { part: 'Percom Doubler (with the original 1771)', kind: 'adapter', note: 'Plugs into the 1771 socket in the Expansion Interface, with the 1771 moved onto it, and adds double density. No soldering; needs a doubler-aware DOS (DBLDOS, later most DOSes).', source: { label: 'trs-80.org, Percom Doubler', url: T80_DOUBLER } },
+        { part: 'Percom Doubler (with the original 1771)', kind: 'adapter', verify: true, note: 'Plugs into the 1771 socket in the Expansion Interface, with the 1771 moved onto it, and adds double density. No soldering; needs a doubler-aware DOS (DBLDOS, later most DOSes). The adapter circuit is not in the source, so its wiring is not checked.', source: { label: 'trs-80.org, Percom Doubler', url: T80_DOUBLER } },
```

### H266

src/data/tandy.js @@ -821,7 +828,7 @@ RCS.add({

```diff
-        { n: 20, name: 'VSS', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'], probe: '0 V' },
+        { n: 20, name: 'VCC', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+5 V' },
```

### H267

src/data/tandy.js @@ -928,7 +935,7 @@ RCS.add({

```diff
-        id: 'coco-cart', name: 'Cartridge slot (Program Pak)', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even',
+        id: 'coco-cart', name: 'Cartridge slot (Program Pak)', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even', verify: true,
```

### H268

src/data/tandy.js @@ -994,7 +1001,7 @@ RCS.add({

```diff
-        id: 'coco-cart', name: 'Cartridge slot (J6)', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even',
+        id: 'coco-cart', name: 'Cartridge slot (J6)', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even', verify: true,
```

### H269

src/data/tandy.js @@ -1040,7 +1047,7 @@ RCS.add({

```diff
-        id: 'coco-cart', name: 'Cartridge slot (CN1)', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even',
+        id: 'coco-cart', name: 'Cartridge slot (CN1)', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even', verify: true,
```

### H270

src/data/tandy.js @@ -1149,7 +1156,7 @@ RCS.add({

```diff
-        id: 'mc10-expansion', name: 'I/O expansion edge', kind: '34-pin card edge on the main board', geo: 'edge-17x17-odd-even',
+        id: 'mc10-expansion', name: 'I/O expansion edge', kind: '34-pin card edge on the main board', geo: 'edge-17x17-odd-even', verify: true,
```

### H271

src/data/tandy.js @@ -1236,6 +1243,7 @@ RCS.add({

```diff
+          { label: 'TRS-80 Technical Reference Handbook, Figure 22, p. 91 (same scan, text-layer mirror)', url: TRH_TXT(92) },
```

### H272

src/data/tandy.js @@ -1291,7 +1299,7 @@ RCS.add({

```diff
-        id: 'ei-printer', name: 'Expansion Interface: line printer (J4)', kind: '34-pin PCB edge (17 + 17), cable 600091 to a 36-pin printer plug', geo: 'edge-17x17-odd-even', gender: 'male',
+        id: 'ei-printer', name: 'Expansion Interface: line printer (J4)', kind: '34-pin PCB edge (17 + 17), cable 600091 to a 36-pin printer plug', geo: 'edge-17x17-odd-even', gender: 'male', verify: true,
```

### H273

src/data/tandy.js @@ -1310,7 +1318,7 @@ RCS.add({

```diff
-        id: 'ei-disk', name: 'Expansion Interface: floppy disk bus (J5)', kind: '34-pin PCB edge (17 + 17), Shugart SA400 bus', geo: 'edge-17x17-odd-even', gender: 'male',
+        id: 'ei-disk', name: 'Expansion Interface: floppy disk bus (J5)', kind: '34-pin PCB edge (17 + 17), Shugart SA400 bus', geo: 'edge-17x17-odd-even', gender: 'male', verify: true,
```

### H274

src/data/tandy.js @@ -1351,7 +1359,7 @@ RCS.add({

```diff
-        id: 'm3-iobus', name: 'I/O bus (J2, underside)', kind: '50-pin PCB edge (25 + 25)', geo: 'edge-25x25-odd-even', gender: 'male',
+        id: 'm3-iobus', name: 'I/O bus (J2, underside)', kind: '50-pin PCB edge (25 + 25)', geo: 'edge-25x25-odd-even', gender: 'male', verify: true,
```

### H275

src/data/tandy.js @@ -1362,7 +1370,7 @@ RCS.add({

```diff
-        id: 'm3-printer', name: 'Printer port (card edge)', kind: '34-pin PCB edge (17 + 17)', geo: 'edge-17x17-odd-even', gender: 'male',
+        id: 'm3-printer', name: 'Printer port (card edge)', kind: '34-pin PCB edge (17 + 17)', geo: 'edge-17x17-odd-even', gender: 'male', verify: true,
```

### H276

src/data/tandy.js @@ -1448,7 +1456,7 @@ RCS.add({

```diff
-        id: 'm4-iobus', name: 'I/O bus (J2 on the 1983 board; J4 on the gate-array board)', kind: '50-pin PCB edge (25 + 25)', geo: 'edge-25x25-odd-even', gender: 'male',
+        id: 'm4-iobus', name: 'I/O bus (J2 on the 1983 board; J4 on the gate-array board)', kind: '50-pin PCB edge (25 + 25)', geo: 'edge-25x25-odd-even', gender: 'male', verify: true,
```

### H277

src/data/tandy.js @@ -1461,8 +1469,8 @@ RCS.add({

```diff
-        summary: 'Port F8H-FBH: write the character (latched by U66, strobed by one-shot U65); read BUSY, PAPER, SELECT and FAULT on bits 7-4, as on the Model III. The pin table is the Model III schematic; the Model 4 schematic was not checked pin by pin (verify).',
-        pins: PRNPINS,
+        summary: 'Port F8H-FBH: write the character (latched by U66, strobed by one-shot U65); read BUSY, PAPER, SELECT and FAULT on bits 7-4 through buffer U67, as on the Model III. The pin table is the Model III schematic; the Model 4 schematic was not checked pin by pin (verify). The row layout (odd on one side) is the usual numbering, not drawn in the manual.',
+        pins: M4PRNPINS,
```

### H278

src/data/tandy.js @@ -1859,6 +1867,7 @@ RCS.add({

```diff
+          { label: 'TRS-80 Technical Reference Handbook, System Power Supply, pp. 52-54 (same scan, text-layer mirror)', url: TRH_TXT(53) },
```

### H279

src/data/tandy.js @@ -2501,6 +2510,7 @@ RCS.add({

```diff
+    { name: 'TRS-80 Technical Reference Handbook, 2nd ed., text-layer mirror (same archive.org scan)', url: TRH_TXT(1), what: 'Use when the main PDF returns HTTP 500. Same page numbers.' },
```

### H280

src/data/ti.js @@ -154,7 +154,7 @@ const psg76489Pins = [

```diff
-  { n: 14, name: 'CLOCK', type: 'clock', dir: 'in', desc: 'Clock input. Tone = clock / (32 x N). The SN76489AN takes up to 4 MHz; the 500 kHz parts (SN76494, SN94624) lack the divide-by-8 stage.', terms: ['clock'], probe: '3.58 MHz on an SN76489; about 447 kHz on an SN94624' },
+  { n: 14, name: 'CLOCK', type: 'clock', dir: 'in', desc: 'Clock input. SN76489AN: tone = clock / (32 x N), clock up to 4 MHz. The SN76494 drops the divide-by-8 stage (500 kHz limit, TI data sheet); the SN94624 is taken to match it, but no SN94624 data sheet was checked.', terms: ['clock'], probe: 'A steady clock at the board rate (see the machine test points).', verify: true },
```

### H281

src/data/ti.js @@ -374,11 +374,12 @@ RCS.add({

```diff
+        { label: 'F18A pin-out and compatibility (dnotq.io), Wayback Machine copy (the live page fails certificate checks for some clients)', url: 'https://web.archive.org/web/20250120011023/https://dnotq.io/f18a/pinout.html' },
-        { part: 'TMS9928A / TMS9929A', kind: 'pin-compatible', note: 'Same socket, not a drop-in. Pins 35, 36 and 38 become B-Y, Y and R-Y, so there is no composite video and no 3.58 MHz CPUCLK, and the 9929A runs 50 Hz, 313 lines. A 9918A console needs a colour-difference video stage (the PAL boards use jumpers W201-W204 on J201) before either will make a picture.', source: { label: 'TMS9918A/9928A/9929A Data Manual, 3.7.2 TMS9928A/9929A terminal assignments, p. 3-11', url: TI_DS('9918a28a29a.pdf', 54) } },
-        { part: 'TMS9118 / TMS9128 / TMS9129', kind: 'pin-compatible', note: 'Not for the TI-99/4A: they have no GROMCLK on pin 37 (not connected on the 9118, CPUCLK on the 9128/9129), so the GROMs get no clock and the console never reaches the title screen. Only pins 35 to 38 differ from the 9918A family.', source: { label: 'F18A pin-out and compatibility (Matthew Hagerty, dnotq.io)', url: 'https://dnotq.io/f18a/pinout.html' } },
+        { part: 'TMS9928A / TMS9929A', kind: 'adapter', note: 'Same socket, not a drop-in: needs a colour-difference video stage. Pins 35, 36 and 38 become B-Y, Y and R-Y, so there is no composite video and no 3.58 MHz CPUCLK, and the 9929A runs 50 Hz, 313 lines. A 9918A console needs a colour-difference video stage (the PAL boards use jumpers W201-W204 on J201) before either will make a picture.', source: { label: 'TMS9918A/9928A/9929A Data Manual, 3.7.2 TMS9928A/9929A terminal assignments, p. 3-11', url: TI_DS('9918a28a29a.pdf', 54) } },
+        { part: 'TMS9118 / TMS9128 / TMS9129', kind: 'adapter', verify: true, note: 'Pins 35-38 differ, and no TI data sheet for these parts was checked. Not for the TI-99/4A: they have no GROMCLK on pin 37 (not connected on the 9118, CPUCLK on the 9128/9129), so the GROMs get no clock and the console never reaches the title screen. Only pins 35 to 38 differ from the 9918A family.', source: { label: 'F18A pin-out and compatibility (Matthew Hagerty, dnotq.io)', url: 'https://dnotq.io/f18a/pinout.html' } },
```

### H282

src/data/ti.js @@ -398,9 +399,9 @@ RCS.add({

```diff
-        { part: 'TMS9919 = SN94624N', kind: 'pin-compatible', note: 'The same part under two numbers: Sams lists U511 as SN94624N / TMS9919. It has no divide-by-eight on the clock input, so it runs from the 447 kHz GROM clock.', source: SAMS_18 },
-        { part: 'SN76494N', kind: 'pin-compatible', note: 'TI: identical to the SN76489A but with the divide-by-eight stage removed and a 500 kHz clock limit, which matches the SN94624. Check pin 9 (AUDIO IN on the SN94624) before you rely on speech and cassette audio.', source: { label: 'SN76489AN data sheet, SN76494N footnote, p. 1', url: TI_DS('SN76489.pdf', 1) } },
-        { part: 'SN76489AN', kind: 'pin-compatible', note: 'Keeps the divide-by-eight stage and takes up to 4 MHz. Fed the 447 kHz GROM clock of an SN94624 board, every tone comes out three octaves low; it only fits a board that clocks the sound chip at 3.58 MHz. Pin 9 is N.C., so the speech and cassette audio mixed in there is lost.', source: { label: 'SN76489AN data sheet, features and SN76494N footnote, p. 1', url: TI_DS('SN76489.pdf', 1) } },
+        { part: 'TMS9919 = SN94624N', kind: 'pin-compatible', verify: true, note: 'No SN94624 or TMS9919 data sheet seen. The same part under two numbers: Sams lists U511 as SN94624N / TMS9919. It has no divide-by-eight on the clock input, so it runs from the 447 kHz GROM clock.', source: SAMS_18 },
+        { part: 'SN76494N', kind: 'pin-compatible', verify: true, note: 'TI: identical to the SN76489A but with the divide-by-eight stage removed and a 500 kHz clock limit, which matches the SN94624. Check pin 9 (AUDIO IN on the SN94624) before you rely on speech and cassette audio.', source: { label: 'SN76489AN data sheet, SN76494N footnote, p. 1', url: TI_DS('SN76489.pdf', 1) } },
+        { part: 'SN76489AN', kind: 'adapter', note: 'Needs a 3.58 MHz clock fed to pin 14 instead of the 447 kHz GROM clock, and loses the pin 9 audio input. Keeps the divide-by-eight stage and takes up to 4 MHz. Fed the 447 kHz GROM clock of an SN94624 board, every tone comes out three octaves low; it only fits a board that clocks the sound chip at 3.58 MHz. Pin 9 is N.C., so the speech and cassette audio mixed in there is lost.', source: { label: 'SN76489AN data sheet, features and SN76494N footnote, p. 1', url: TI_DS('SN76489.pdf', 1) } },
```

### H283

src/data/ti.js @@ -465,10 +466,11 @@ RCS.add({

```diff
+        { label: 'TMS2532 data sheet, TI 1984 MOS Memory Data Book: pin 18 A11, 20 PD/PGM, 21 VPP (+5 V in read mode)', url: 'http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf#page=207' },
-        { part: 'TMS2532 EPROM', kind: 'pin-compatible', note: 'TI makes the TMS4732 pin-compatible with the TMS2532 and Sams lists TMS4732/2532 for U610 and U611. The 4732 selects on pins 20 and 21 are set in the mask (both active low on the TI), and an EPROM has programming functions on pins 18, 20 and 21: check them against the EPROM sheet and burn U610 (even byte) and U611 (odd byte) separately.', source: { label: 'TMS4732 data sheet, TI MOS Memory Data Book 1986, p. 7-15', url: TI_DS('MOSMemory-1986/MOSMemory-1986-07-ROMs.pdf', 15) } },
+        { part: 'TMS2532 EPROM', kind: 'adapter', note: 'Not a drop-in. TI makes the TMS4732 pin-compatible with the TMS2532 and Sams lists TMS4732/2532 for U610 and U611, but on the 2532 pin 18 is A11, pin 20 is PD/PGM (LOW to read) and pin 21 is VPP, which must be at +5 V while reading. The console grounds pin 21 (a 4732 chip select), so lift pin 21 out of the socket and tie it to +5 V. Burn U610 (even byte) and U611 (odd byte) separately.', source: { label: 'TMS4732 data sheet, TI MOS Memory Data Book 1986, p. 7-15', url: TI_DS('MOSMemory-1986/MOSMemory-1986-07-ROMs.pdf', 15) } },
```

### H284

src/data/ti.js @@ -484,7 +486,7 @@ RCS.add({

```diff
-        { part: 'MCM6810P / NTE6810 / ECG6810', kind: 'pin-compatible', note: 'Sams cross-references U608 and U609 to these. Any 6810 from a 6800-family board fits; it must have the full six chip selects.', source: SAMS_18 },
+        { part: 'MCM6810P / NTE6810 / ECG6810', kind: 'pin-compatible', verify: true, note: 'Sams cross-references U608 and U609 to these (NTE and ECG data sheets not seen). Any 6810 from a 6800-family board fits; it must have the full six chip selects.', source: SAMS_18 },
```

### H285

src/data/ti.js @@ -510,9 +512,9 @@ RCS.add({

```diff
-          { n: 1, name: '18 VAC', type: 'power', desc: 'End of the main (18 V) section of the tapped secondary. To the bridge rectifier for +12 V and +5 V.', expect: '17-19 V AC across 1-2', verify: true, conflict: 'A 1997 label quote gives 18 V AC 18 VA on pins 1-2; an AtariAge post gives 16.0 V AC 36 VA for an AC9500. Sams rates the section 17.85 V AC. Check your label.' },
-          { n: 2, name: 'TAP', type: 'power', desc: 'Centre tap, common to both sections (the white wire).', verify: true },
-          { n: 4, name: '8.5 VAC', type: 'power', desc: 'End of the small (8.5 V) section. To D5 and the 79M05 for -5 V.', expect: '8-9 V AC across 2-4; about 26 V AC across 1-4', verify: true, conflict: 'Label quote: 8.5 V AC 1.28 VA; AtariAge: 8.0 V AC 1.0 VA. Sams: whole winding 26.40 V AC, tap at 17.85 V AC.' },
+          { n: 1, name: '18 VAC', type: 'power', desc: 'End of the main (18 V) section of the tapped secondary. To the bridge rectifier for +12 V and +5 V.', expect: 'About 18 V AC across 1-2 (Sams: 17.85 V AC section)', verify: true, conflict: 'A 1997 label quote gives 18 V AC 18 VA on pins 1-2; an AtariAge post gives 16.0 V AC 36 VA for an AC9500. Sams rates the section 17.85 V AC. Check your label.' },
+          { n: 2, name: 'TAP', type: 'power', desc: 'Secondary tap, common to both sections (the white wire). Not a centre tap: Sams rates the winding 26.40 V AC tapped at 17.85 V AC.', verify: true },
+          { n: 4, name: '8.5 VAC', type: 'power', desc: 'End of the small (8.5 V) section. To D5 and the 79M05 for -5 V.', expect: 'About 8.5 V AC across 2-4; about 26 V AC across 1-4 (Sams: 26.40 V AC whole winding)', verify: true, conflict: 'Label quote: 8.5 V AC 1.28 VA; AtariAge: 8.0 V AC 1.0 VA. Sams: whole winding 26.40 V AC, tap at 17.85 V AC.' },
```

### H286

src/data/ti.js @@ -627,7 +629,7 @@ RCS.add({

```diff
-          { n: 41, name: 'IAQ', type: 'ctrl', desc: 'The 9900 IAQ (instruction acquisition).', conflict: 'The Technical Data (A.2 and D.2.1) names pin 41 IAQ; the Servicing Manual p. 104 labels it HOLD / IAQ.' },
+          { n: 41, name: 'IAQHA', type: 'ctrl', desc: 'IAQ OR HOLDA: the 9900 instruction-acquisition signal combined with hold acknowledge on the board (schematic signal IAQHA, I/O port pin 41). Not raw IAQ.', conflict: 'The simplified tables in the Technical Data (A.2 and D.2.1) call pin 41 IAQ; the schematic names the net IAQHA and the Servicing Manual p. 104 labels it HOLD / IAQ.' },
```

### H287

src/data/ti.js @@ -640,7 +642,7 @@ RCS.add({

```diff
-        id: 'ti994a-cartridge', name: 'Cartridge (GROM) port', kind: '36-contact card-edge socket', geo: 'edge-18x18-odd-even', gender: 'female',
+        id: 'ti994a-cartridge', name: 'Cartridge (GROM) port', kind: '36-contact card-edge socket', geo: 'edge-18x18-odd-even', gender: 'female', verify: true,
```

### H288

src/data/timex.js @@ -13,7 +13,7 @@ const um15 = label => ({ label: `Timex Sinclair 1500 User Manual (1983), ${label

```diff
-const SUM = { label: 'SUM v4 n1 (Jan 1986) p. 5, 2068 power supply: make it cooler and quieter (outer contact positive)', url: 'https://archive.org/details/SinclairTimexUsersMagazine/SUM%20v4%20n1/page/n5' };
+const SUM = { label: 'SUM v4 n1 (Jan 1986) p. 5, 2068 power supply: make it cooler and quieter (outer contact positive)', url: 'https://archive.org/details/SinclairTimexUsersMagazine/SUM%20v4%20n1/page/n4' };
```

### H289

src/data/timex.js @@ -159,7 +159,7 @@ RCS.add({

```diff
-        p(15, 'CLOCK', 'clock', 'in', 'Timing reference for tone, noise and envelope.', { terms: ['clock'], probe: 'A steady clock at the board PSG rate (see the machine test points: 1.764 MHz TS2068, 1.7734 MHz Spectrum 128, 1 MHz CPC).' }),
+        p(15, 'CLOCK', 'clock', 'in', 'Timing reference for tone, noise and envelope.', { terms: ['clock'], probe: 'A steady clock at the board PSG rate (see the machine test points).' }),
```

### H290

src/data/timex.js @@ -316,7 +316,7 @@ RCS.add({

```diff
-        pins: [c(1, 'GND (DC return)', 'ground', 'Centre contact.', { expect: '0 V' }), c(2, '+15 V DC (unregulated)', 'power', 'Sleeve. Through the power switch to the regulators and P1 B3.', { expect: '+14 to +25 V DC; about 21 V unloaded' })],
+        pins: [c(1, 'GND (DC return)', 'ground', 'Centre contact.', { expect: '0 V' }), c(2, '+15 V DC (unregulated)', 'power', 'Sleeve. Through the power switch to the regulators and P1 B3.', { expect: '+14 to +25 V DC (manual); SUM measured about 21 V from the stock adapter' })],
```

### H291

src/data/timex.js @@ -349,9 +349,9 @@ RCS.add({

```diff
-      { id: 'ts2068-dock', name: 'Cartridge dock (J4, 2 x 18)', kind: 'Card-edge socket under the TCC door, 18 + 18 contacts', geo: 'edge-18x18-odd-even', pin1: 'right', keys: [2],
+      { id: 'ts2068-dock', name: 'Cartridge dock (J4, 2 x 18)', kind: 'Card-edge socket under the TCC door, 18 + 18 contacts', geo: 'edge-18x18-odd-even', rowA: 'bottom', keys: [2],
-        summary: 'The Timex Command Cartridge (ROS) dock. Odd pins meet the cartridge non-component side, even pins the component side. The manual figure (view from front) has the even row on top with 2 at the left; this drawing is that view turned half a turn, so check by number. Fingers 2 and 36 are long so +5 V and GND make first. Memo #6 puts the cartridge slot between pins 4 and 6. Clean the contacts before blaming the SCLD.',
+        summary: 'The Timex Command Cartridge (ROS) dock. Odd pins meet the cartridge non-component side, even pins the component side. Drawn as the manual figure (view from front): even row on top with 2 at the upper left, odd row below with 1 at the lower left. Fingers 2 and 36 are long so +5 V and GND make first. Memo #6 puts the cartridge slot between pins 4 and 6. Clean the contacts before blaming the SCLD.',
```

### H292

src/data/timex.js @@ -467,11 +467,11 @@ RCS.add({

```diff
-      supply: { external: true, name: 'Timex TS2068 AC adapter (DVE make; part number not confirmed)', output: '14-25 V DC unregulated at 1 A (15 V 1 A nominal; about 21 V unloaded)',
+      supply: { external: true, name: 'Timex TS2068 AC adapter (DVE make; part number not confirmed)', output: '14-25 V DC unregulated at 1 A (15 V 1 A nominal; SUM reports about 21 V from the stock adapter)',
-          'Needs at least about 15 V: below that the colour drops out and some peripherals stop. Running nearer 15-16 V than the 21 V unloaded output cuts the heat inside.',
+          'Needs at least about 15 V: below that the colour drops out and some peripherals stop. Running nearer 15-16 V than the 21 V or so from the stock adapter cuts the heat inside.',
```

### H293

src/data/timex.js @@ -480,7 +480,7 @@ RCS.add({

```diff
-        { rail: 'Power in', expect: '14-25 V DC (about 21 V unloaded)', where: 'Barrel sleeve; P1 B3 after the switch', note: 'Unregulated. Absolute range 14.75-26 V (sec. 2.3).' },
+        { rail: 'Power in', expect: '14-25 V DC (SUM: about 21 V from the stock adapter)', where: 'Barrel sleeve; P1 B3 after the switch', note: 'Unregulated. Absolute range 14.75-26 V (sec. 2.3).' },
```

## Source acquisition index

Each S-number above resolves below. Original URLs and actual fallback URLs are retained; URL access errors are not assertions that a document is globally unavailable.

- **S001** [Ray Carlsen, Plus/4 notes (plus4.txt)](https://portcommodore.com/rcarlsen/cbm/plus4/plus4.txt). Local: architect-assets/S001. HTTP Error 406: Not Acceptable.
- **S002** [MOS 7501 Microprocessor with I/O, preliminary data sheet, p. 1 (pin configuration)](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/7501/7501-01.gif). Local: architect-assets/S002. 200 http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/7501/7501-01.gif.
- **S003** [TED System Hardware Manual, 5.2 7501 Pinout, p. 14](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf). Local: architect-assets/S003. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf.
- **S004** [C16 Service Manual, schematic 251788 sheet 2 (port wiring), p. 8](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf). Local: architect-assets/S004. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf.
- **S005** [C16 Service Manual 314001-03, alternate scan (the zimmers.net PDF has a damaged page index), PDF p. 12](https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf). Local: architect-assets/S005. https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf.
- **S006** [Ray Carlsen, Plus/4 notes (plus4.txt), Wayback Machine copy (2026)](https://web.archive.org/web/20260226020821/https://portcommodore.com/rcarlsen/cbm/plus4/plus4.txt). Local: architect-assets/S006. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S007** [C64-Wiki: TED (7360 HMOS-1, 8360 HMOS-2)](https://www.c64-wiki.com/wiki/TED). Local: architect-assets/S007. https://www.c64-wiki.com/wiki/TED.
- **S008** [MOS 6529 SPI data sheet (GIF scans, zimmers.net)](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6529.zip). Local: architect-assets/S008. 200 http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6529.zip.
- **S009** [Sams CC17 C64 (1984 version), schematic RAM bank U9-U12, U21-U24, PDF p. 9](https://archive.org/details/sams-computerfacts-cc17-c64-1984-version/page/n8). Local: architect-assets/S009. https://dn760106.eu.archive.org/0/items/sams-computerfacts-cc17-c64-1984-version/SamsComputerfacts_Cc17_C641984Version.pdf.
- **S010** [TI TMS4164 data sheet, refresh (256 rows A0-A7, 4 ms), 1984 MOS Memory Data Book p. 4-41](http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf). Local: architect-assets/S010. https://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf.
- **S011** [C128 Service Manual, 4164 64K x 1 dynamic RAM pinout, p. 18](https://archive.org/download/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08.pdf). Local: architect-assets/S011. https://ia601005.us.archive.org/27/items/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08.pdf.
- **S012** [Hitachi HM4864 data sheet (128 refresh cycles, 2 ms), 1984 IC Memory Data Book p. 199](https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf). Local: architect-assets/S012. https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf.
- **S013** [Zimmers C16 & Plus/4 parts list (ROM part numbers and locations)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/parts.txt). Local: architect-assets/S013. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/parts.txt.
- **S014** [ZX Spectrum Service Manual 1.5.1 (links H and N: Hitachi and NEC use pins 20 and 27 differently), p. 10](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf). Local: architect-assets/S014. https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf.
- **S015** [ZX Spectrum Issue 3 circuit diagram, IC5 table (pin 20: NEC CE, Hitachi CS; pin 27: NEC CS, Hitachi CE)](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Circuit%20Diagrams/ZX%20Spectrum%20Issue%203%20-%20Schaltbild.gif). Local: architect-assets/S015. https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Circuit%20Diagrams/ZX%20Spectrum%20Issue%203%20-%20Schaltbild.gif.
- **S016** [Retroleum, Spectrum chips: Switchable ROM Replacement Board and Diagnostic Test ROM](https://retroleum.co.uk/zx-spectrum-chips). Local: architect-assets/S016. https://retroleum.co.uk/zx-spectrum-chips.
- **S017** [Intel 27128 data sheet, pin names and read mode, 1983 Memory Component Handbook p. 4-29](https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf). Local: architect-assets/S017. https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf.
- **S018** [Oric-1 48K circuit diagram, issue 7, sheet 2: IC9 "23128 or 2764", IC10 2764 (Defence Force wiki, archived)](https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-2s.gif). Local: architect-assets/S018. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S019** [Ray Carlsen, C64C chips vs common symptoms (c64c-ic.txt)](https://portcommodore.com/rcarlsen/cbm/c64/c64c-ic.txt). Local: architect-assets/S019. HTTP Error 406: Not Acceptable.
- **S020** [Ray Carlsen, VIC and CPU substitutions in the C64C board 250469](https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt). Local: architect-assets/S020. HTTP Error 406: Not Acceptable.
- **S021** [CSG 6510 Microprocessor with I/O data sheet, p. 1 pin configurations (GIF scans)](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6510.zip). Local: architect-assets/S021. 200 http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6510.zip.
- **S022** [C64 Programmer's Reference Guide, App. L, p. 403 pin configuration](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf). Local: architect-assets/S022. 200 http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf.
- **S023** [C64/C64C Service Manual, cassette interface (P3-P5), p. 11](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/servicemanuals/C64-C64C_Service_Manual_314001-03_(1992_Mar).pdf). Local: architect-assets/S023. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/servicemanuals/C64-C64C_Service_Manual_314001-03_(1992_Mar).pdf.
- **S024** [Ray Carlsen, C64C chips vs common symptoms (c64c-ic.txt), Wayback Machine copy (2025)](https://web.archive.org/web/20250821030246/https://portcommodore.com/rcarlsen/cbm/c64/c64c-ic.txt). Local: architect-assets/S024. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S025** [Ray Carlsen, VIC and CPU substitutions in the C64C board 250469, Wayback Machine copy (2026)](https://web.archive.org/web/20260823132238/https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt). Local: architect-assets/S025. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S026** [C64-Wiki: VIC (NMOS 6566/67/69 need +12 V on pin 13; HMOS-II 8562/65 +5 V only)](https://www.c64-wiki.com/wiki/VIC). Local: architect-assets/S026. https://www.c64-wiki.com/wiki/VIC.
- **S027** [Christian Bauer, The MOS 6567/6569 video controller (VIC-II), 2.3 pins ΦIN and Φ0](http://www.zimmers.net/cbmpics/cbm/c64/vic-ii.txt). Local: architect-assets/S027. 200 http://www.zimmers.net/cbmpics/cbm/c64/vic-ii.txt.
- **S028** [VIC-II Kawari project (GitHub README)](https://github.com/randyrossi/vicii-kawari). Local: architect-assets/S028. https://github.com/randyrossi/vicii-kawari.
- **S029** [CSG 6567 VIC-II preliminary specification](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6567_vicII_preliminary.pdf). Local: architect-assets/S029. 200 http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6567_vicII_preliminary.pdf.
- **S030** [Ray Carlsen, 8580 to 6581 (8580 to 6581.txt)](https://portcommodore.com/rcarlsen/cbm/c64/8580%20to%206581.txt). Local: architect-assets/S030. HTTP Error 406: Not Acceptable.
- **S031** [ARMSID by nobomi.cz (product page)](https://www.nobomi.cz/8bit/armsid/index_en.php). Local: architect-assets/S031. https://www.nobomi.cz/8bit/armsid/index_en.php.
- **S032** [FPGASID project page](http://www.fpgasid.de/). Local: architect-assets/S032. https://www.fpgasid.de/.
- **S033** [Ray Carlsen, SID replacements (SID replacements.txt)](https://portcommodore.com/rcarlsen/cbm/SID%20%26%20mods/SID%20replacements.txt). Local: architect-assets/S033. HTTP Error 406: Not Acceptable.
- **S034** [Ray Carlsen, 8580 to 6581 (8580 to 6581.txt), Wayback Machine copy (2025)](https://web.archive.org/web/20250414092701/https://portcommodore.com/rcarlsen/cbm/c64/8580%20to%206581.txt). Local: architect-assets/S034. HTTP Error 429: Too Many Requests.
- **S035** [Ray Carlsen, SID replacements (SID replacements.txt), Wayback Machine copy (2021)](https://web.archive.org/web/20211202105311/https://portcommodore.com/rcarlsen/cbm/SID%20%26%20mods/SID%20replacements.txt). Local: architect-assets/S035. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S036** [C64-Wiki: CIA (6526 1 MHz, 6526A 2 MHz; later C64s use the 6526A or 8521)](https://www.c64-wiki.com/wiki/CIA). Local: architect-assets/S036. https://www.c64-wiki.com/wiki/CIA.
- **S037** [Ray Carlsen, C128 chips vs symptoms (c128-ic.txt)](https://portcommodore.com/rcarlsen/cbm/c128/c128-ic.txt). Local: architect-assets/S037. HTTP Error 406: Not Acceptable.
- **S038** [Ray Carlsen, C128 chips vs symptoms (c128-ic.txt), Wayback Machine copy (2026)](https://web.archive.org/web/20260823132230/https://portcommodore.com/rcarlsen/cbm/c128/c128-ic.txt). Local: architect-assets/S038. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S039** [C64-Wiki: PLA (C64 chip), replacement parts](https://www.c64-wiki.com/wiki/PLA_(C64_chip)). Local: architect-assets/S039. https://www.c64-wiki.com/wiki/PLA_(C64_chip).
- **S040** [PLA264 project (hackup), GitHub](https://github.com/hackup/PLA264). Local: architect-assets/S040. https://github.com/hackup/PLA264.
- **S041** [C64 PLA logic equations and pin declarations (Mäkelä, Smith, Boose)](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/c64-pla.txt). Local: architect-assets/S041. 200 http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/c64-pla.txt.
- **S042** [MOS 6560/6561 Video Interface Chip data sheet, p. 1 pin configuration and scan 6560-09 pin signal description (address bus bidirectional; DB8-DB11 colour data only) (GIF scans)](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6560.zip). Local: architect-assets/S042. 200 http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6560.zip.
- **S043** [VIC-20 Programmer's Reference Guide, 6560 pin configuration, p. 212](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf). Local: architect-assets/S043. 200 http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf.
- **S044** [VIC-20 schematic 324001 sheet 1 (pin 37 used as light pen)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02a.gif). Local: architect-assets/S044. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02a.gif.
- **S045** [MOS MCS6522 VIA data sheet, p. 1 pin configuration (GIF scans)](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6522.zip). Local: architect-assets/S045. 200 http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6522.zip.
- **S046** [Commodore 8520 CIA specification 318029 rev. C, sheet 1 pin configuration (zimmers.net)](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/8520_datasheet.pdf). Local: architect-assets/S046. 200 http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/8520_datasheet.pdf.
- **S047** [1581 Service Manual 314982-01, 8520A pin assignment and signals, p. 7](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1581/1581_Service_Manual_314982-01_(1987_Jun).pdf). Local: architect-assets/S047. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1581/1581_Service_Manual_314982-01_(1987_Jun).pdf.
- **S048** [1571 Service Manual 314002-04, 6526/8520 pin assignment, p. 12](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1571/1571_Service_Manual_Preliminary_314002-04_(1986_Oct).pdf). Local: architect-assets/S048. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1571/1571_Service_Manual_Preliminary_314002-04_(1986_Oct).pdf.
- **S049** [Apple IIe logic board identification, enhanced and unenhanced ROM sets, p. 1.2.2 (Apple page bound into the Sams CC10 scan)](https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n4). Local: architect-assets/S049. https://dn720602.ca.archive.org/0/items/Sams_Computer_Facts_Apple_IIe/Sams_Computer_Facts_Apple_IIe.pdf.
- **S050** [WDC W65C02S data sheet, Bus Enable (BE) and pinout, pp. 9-13](https://www.westerndesigncenter.com/wdc/documentation/w65c02s.pdf). Local: architect-assets/S050. https://www.westerndesigncenter.com/wdc/documentation/w65c02s.pdf.
- **S051** [MOS 6500 Microprocessors data sheet (Nov 1985), p. 10: 6502 40-pin pinout](http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf). Local: architect-assets/S051. https://6502.org/documents/datasheets/mos/mos_6500_mpu_nov_1985.pdf.
- **S052** [Sams CC10 Apple IIe, parts list, semiconductors and replacement data, p. 17](https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n36). Local: architect-assets/S052. https://ia801807.us.archive.org/26/items/Sams_Computer_Facts_Apple_IIe/Sams_Computer_Facts_Apple_IIe.pdf.
- **S053** [Apple IIe Technical Reference Manual, Figure 7-2 / Table 7-6, p. 165](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n198). Local: architect-assets/S053. https://dn721808.ca.archive.org/0/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S054** [Apple schematic 050-0051-D, Apple IIe (NTSC), sheet 1: MMU UE4 (box reads 344-0100), 6502 UC4 (PDF p. 2)](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Computers/Apple%20II/Apple%20IIe/Schematics/Apple%20IIe%20-%20Schematics%20050-0051-D.pdf). Local: architect-assets/S054. https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Computers/Apple%20II/Apple%20IIe/Schematics/Apple%20IIe%20-%20Schematics%20050-0051-D.pdf.
- **S055** [Sams CC10 Apple IIe, parts list: UE4 Memory Management Unit 344-0010-B, UE5 Input/Output Unit 344-0020-A (scan p. 8)](https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n7). Local: architect-assets/S055. https://ia801807.us.archive.org/26/items/Sams_Computer_Facts_Apple_IIe/Sams_Computer_Facts_Apple_IIe.pdf.
- **S056** [Understanding the Apple IIe (Sather)](https://archive.org/details/Understanding_the_Apple_IIe). Local: architect-assets/S056. https://ia800606.us.archive.org/13/items/Understanding_the_Apple_IIe/Understanding_the_Apple_IIe_text.pdf.
- **S057** [Understanding the Apple IIe (Sather), p. 7-2: CXXX is the overall $C000-$CFFF I/O enable signal](https://archive.org/details/Understanding_the_Apple_IIe/page/n169). Local: architect-assets/S057. https://ia800606.us.archive.org/13/items/Understanding_the_Apple_IIe/Understanding_the_Apple_IIe_text.pdf.
- **S058** [Apple IIe Technical Reference Manual, Figure 7-3 / Table 7-7, p. 167](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n200). Local: architect-assets/S058. https://dn721808.ca.archive.org/0/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S059** [Understanding the Apple IIe (Sather), p. 4-2: the IOU pulls RESET low at power-on](https://archive.org/details/Understanding_the_Apple_IIe/page/n75). Local: architect-assets/S059. https://ia800606.us.archive.org/13/items/Understanding_the_Apple_IIe/Understanding_the_Apple_IIe_text.pdf.
- **S060** [GI AY-5-3600 Keyboard Encoder data sheet, pp. 3-23 to 3-24 (bitsavers)](http://www.bitsavers.org/components/gi/_dataSheets/AY-5-3600.pdf). Local: architect-assets/S060. https://www.bitsavers.org/components/gi/_dataSheets/AY-5-3600.pdf.
- **S061** [Apple IIe Technical Reference Manual, The Keyboard, p. 187](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n220). Local: architect-assets/S061. https://dn721808.ca.archive.org/0/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S062** [Apple II Reference Manual (1979), Figure 13, p. 95: 9316B ROM pinout](https://archive.org/details/Apple_II_Reference_Manual_1979_Apple/page/n105). Local: architect-assets/S062. https://dn760104.eu.archive.org/0/items/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf.
- **S063** [Apple II Reference Manual (1979), ROM Memory, p. 94](https://archive.org/details/Apple_II_Reference_Manual_1979_Apple/page/n104). Local: architect-assets/S063. https://dn760104.eu.archive.org/0/items/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf.
- **S064** [TRS-80 Model III Technical Reference Manual, Figure 6 CPU schematic (U106 ROM C: pin 18 GND, 21 +5 V, 20 /ROMC), p. 33](https://archive.org/download/Model_III_Technical_Reference_Manual_1981_Tandy/Model_III_Technical_Reference_Manual_1981_Tandy.pdf). Local: architect-assets/S064. https://dn710602.ca.archive.org/0/items/Model_III_Technical_Reference_Manual_1981_Tandy/Model_III_Technical_Reference_Manual_1981_Tandy.pdf.
- **S065** [Apple IIc Technical Reference Manual, GLU pinouts, p. 246](https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n273). Local: architect-assets/S065. https://dn790002.ca.archive.org/0/items/Apple_IIc_Technical_Reference_Manual/Apple_IIc_Technical_Reference_Manual_text.pdf.
- **S066** [Motorola MC3470/MC3470A data sheet, p. 1 (bitsavers)](http://www.bitsavers.org/components/motorola/_dataSheets/MC3470.pdf). Local: architect-assets/S066. https://www.bitsavers.org/components/motorola/_dataSheets/MC3470.pdf.
- **S067** [Sams CD6 Disk II, parts list, semiconductors and replacement data, p. 8](https://archive.org/details/Sams_Technical_Disk_II/page/n19). Local: architect-assets/S067. https://dn760109.eu.archive.org/0/items/Sams_Technical_Disk_II/Sams_Technical_Disk_II.pdf.
- **S068** [Apple schematic 050-0007-H, Disk II Analog Board (B1)](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Schematics/Apple%20Disk%20II%20-%20Schematics%20Analog%20Board%20050-0007-H.pdf). Local: architect-assets/S068. https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Schematics/Apple%20Disk%20II%20-%20Schematics%20Analog%20Board%20050-0007-H.pdf.
- **S069** [Understanding the Apple II (Sather), The Read Pulse, p. 9-9](https://archive.org/details/understanding_the_apple_ii/page/n238). Local: architect-assets/S069. https://dn760103.eu.archive.org/0/items/understanding_the_apple_ii/understanding_the_apple_ii_text.pdf.
- **S070** [RCA 1978 Linear Integrated Circuits, CA3118/CA3146/CA3183 ratings, PDF p. 211 (bitsavers)](http://www.bitsavers.org/components/rca/_dataBooks/1978_RCA_Linear_Integrated_Circuits.pdf). Local: architect-assets/S070. https://www.bitsavers.org/components/rca/_dataBooks/1978_RCA_Linear_Integrated_Circuits.pdf.
- **S071** [Sams COMPUTERFACTS CD6 Disk II, parts list (Write Amp CA3146E), p. 5](https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Sams%20Technical%20-%20Disk%20II.pdf). Local: architect-assets/S071. https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Sams%20Technical%20-%20Disk%20II.pdf.
- **S072** [TI CD74HCT259 data sheet, pin configuration, p. 3](https://www.ti.com/lit/ds/symlink/cd74hct259.pdf). Local: architect-assets/S072. https://www.ti.com/lit/ds/symlink/cd74hct259.pdf.
- **S073** [TI SN74LS259B data sheet (SDLS086), N-package pinout, p. 1](https://www.ti.com/lit/ds/symlink/sn74ls259b.pdf). Local: architect-assets/S073. https://www.ti.com/lit/ds/symlink/sn74ls259b.pdf.
- **S074** [Apple schematic 050-0005-01, Disk II Interface Card (C2)](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Interface%20Cards/Disk%20Drive%20Controllers/Apple%20Disk%20II%20Interface%20Card/Schematics/Apple%20Disk%20II%20-%20Schematics%20050-0005-01.pdf). Local: architect-assets/S074. https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Interface%20Cards/Disk%20Drive%20Controllers/Apple%20Disk%20II%20Interface%20Card/Schematics/Apple%20Disk%20II%20-%20Schematics%20050-0005-01.pdf.
- **S075** [Understanding the Apple II (Sather), Table 9.1 controller commands, p. 9-11](https://archive.org/details/understanding_the_apple_ii/page/n240). Local: architect-assets/S075. https://dn760103.eu.archive.org/0/items/understanding_the_apple_ii/understanding_the_apple_ii_text.pdf.
- **S076** [Atari 400/800 Field Service Manual (May 1983), Fig. 1-4, ANTIC pin assignments, p. 1-9](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n21). Local: architect-assets/S076. https://dn710900.ca.archive.org/0/items/atari400800fieldservicemanualmay1983/Atari%20400-800%20Field%20Service%20Manual%2C%20May%201983_text.pdf.
- **S077** [Atari 800XL Field Service Manual Rev. 01 (Feb 1984), Fig. 1-4, ANTIC pin assignments, p. 1-6](https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n13). Local: architect-assets/S077. https://dn720606.ca.archive.org/0/items/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf.
- **S078** [Sams Computerfacts CC16, Atari 130XE (1986), schematic, ANTIC U7 with logic-probe readings](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n2). Local: architect-assets/S078. https://dn790003.ca.archive.org/0/items/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/Sams%20Computerfacts%20Technical%20Service%20Data%20-%20Atari%20Model%20130XE%20Computer%20%281986%29%28Sams%29_text.pdf.
- **S079** [Atari 8-Bit FAQ 1.11, What are SALLY, ANTIC, CTIA/GTIA/FGTIA, POKEY and FREDDIE? (faqs.org), ANTIC part numbers](http://www.faqs.org/faqs/atari-8-bit/faq/section-12.html). Local: architect-assets/S079. https://www.faqs.org/faqs/atari-8-bit/faq/section-12.html.
- **S080** [Atari 400/800 Field Service Manual (May 1983), Fig. 1-5, CTIA/GTIA pin assignments, p. 1-10](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n22). Local: architect-assets/S080. https://ia801603.us.archive.org/25/items/atari400800fieldservicemanualmay1983/Atari%20400-800%20Field%20Service%20Manual%2C%20May%201983_text.pdf.
- **S081** [Atari 800XL Field Service Manual Rev. 01 (Feb 1984), Fig. 1-5, GTIA pin assignments, p. 1-7](https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n14). Local: architect-assets/S081. https://dn720606.ca.archive.org/0/items/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf.
- **S082** [Atari 400/800 Field Service Manual (May 1983), Fig. 1-6, POKEY pin assignments, p. 1-11](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n23). Local: architect-assets/S082. https://dn710900.ca.archive.org/0/items/atari400800fieldservicemanualmay1983/Atari%20400-800%20Field%20Service%20Manual%2C%20May%201983_text.pdf.
- **S083** [Atari 800XL Field Service Manual Rev. 01 (Feb 1984), Fig. 1-6, POKEY pin assignments, p. 1-8](https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n15). Local: architect-assets/S083. https://dn720606.ca.archive.org/0/items/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf.
- **S084** [Wikipedia, POKEY: part numbers and maker suffixes (cites the Atari 8-Bit FAQ)](https://en.wikipedia.org/wiki/POKEY). Local: architect-assets/S084. https://en.wikipedia.org/wiki/POKEY.
- **S085** [64kib.com, Replacing all the custom chips: PokeyMAX v1 to v4 (maker page)](https://64kib.com/chip_replacement.html). Local: architect-assets/S085. https://64kib.com/chip_replacement.html.
- **S086** [Sams Computerfacts CC16, Atari 130XE (1986), semiconductor parts list (U6 C061991-29)](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n15). Local: architect-assets/S086. https://ia600706.us.archive.org/31/items/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/Sams%20Computerfacts%20Technical%20Service%20Data%20-%20Atari%20Model%20130XE%20Computer%20%281986%29%28Sams%29_text.pdf.
- **S087** [Sams Computerfacts CC16, Atari 130XE (1986), schematic, U6](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n4). Local: architect-assets/S087. https://dn790003.ca.archive.org/0/items/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/Sams%20Computerfacts%20Technical%20Service%20Data%20-%20Atari%20Model%20130XE%20Computer%20%281986%29%28Sams%29_text.pdf.
- **S088** [retro.engineer, Sinclair ZX81 A (Issue 1, 2C184E ULA: video incompatible with most colour TVs)](https://retro.engineer/projects/2021-03-13_Sinclair_ZX81_A/). Local: architect-assets/S088. https://retro.engineer/projects/2021-03-13_Sinclair_ZX81_A/.
- **S089** [Tindie, vLA81 ZX81 ULA replacement (features)](https://www.tindie.com/products/charlieingley/vla81-zx81-ula-replacement/). Local: architect-assets/S089. https://www.tindie.com/products/charlieingley/vla81-zx81-ula-replacement/.
- **S090** [ZX81 circuit diagram, drawing SRC 049 (IC1 pin numbers)](https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif). Local: architect-assets/S090. https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif.
- **S091** [Andy Rea, ZX81 ULA replacement notes: pin functions (oldcomputer.info)](https://oldcomputer.info/8bit/zx81/ULA/ula.htm). Local: architect-assets/S091. https://oldcomputer.info/8bit/zx81/ULA/ula.htm.
- **S092** [Sinc-Link v3 n5 (1985), ZX81 ROM adapter: 2764 EPROM to replace the Sinclair ROM](https://archive.org/details/SincLink/Sinc-Link%20Vol%2003%20No%205/page/n8). Local: architect-assets/S092. https://dn760104.eu.archive.org/0/items/SincLink/Letter%20from%20George%20Chambers%20re%20TTSUG%20newsletter_text.pdf.
- **S093** [OSH Park shared project, ZX81 ROM adapter for AT28C128/AT28C256-JU](https://oshpark.com/shared_projects/22vOyf1p). Local: architect-assets/S093. https://oshpark.com/shared_projects/22vOyf1p.
- **S094** [ZX81 Service and Assembly Manual, component list (IC2 2364), p. 6](https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf). Local: architect-assets/S094. https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf.
- **S095** [Spectrum For Everyone, ZX Spectrum ULA Types](https://www.spectrumforeveryone.com/?p=59). Local: architect-assets/S095. https://www.spectrumforeveryone.com/technical/zx-spectrum-ula-types/.
- **S096** [Tindie, vLA82 Spectrum 48K ULA replacement](https://www.tindie.com/products/charlieingley/vla82-spectrum-48k-ula-replacement/). Local: architect-assets/S096. https://www.tindie.com/products/charlieingley/vla82-spectrum-48k-ula-replacement/.
- **S097** [Retroleum, Nebula fitting notes (PDF)](https://www.retroleum.co.uk/files/spectrum-nebula-fitting-narrow-pins.pdf). Local: architect-assets/S097. https://www.retroleum.co.uk/files/spectrum-nebula-fitting-narrow-pins.pdf.
- **S098** [World of Spectrum FAQ, Pinouts: ULA](https://worldofspectrum.org/faq/reference/pinouts.htm). Local: architect-assets/S098. https://worldofspectrum.org/faq/reference/pinouts.htm.
- **S099** [Sinclair Wiki, ZX Spectrum ULA (5C and 6C pinout)](https://sinclair.wiki.zxnet.co.uk/wiki/ZX_Spectrum_ULA). Local: architect-assets/S099. https://sinclair.wiki.zxnet.co.uk/wiki/ZX_Spectrum_ULA.
- **S100** [General Instrument AY-3-8910/8912 Data Manual (transcription), sec. 2.2-2.3 pin functions, p. 11-12](https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf). Local: architect-assets/S100. https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf.
- **S101** [TS2068 Technical Manual (2nd ed., Time Designs 1986), Appendix D schematic, U14 AY-3-8912](https://k1.spdns.de/Vintage/Sinclair/82/Timex%20Sinclair%202068/Tech%20Specs%20and%20Repair/Timex%20Sinclair%202068%20-%20Technical%20Manual.pdf). Local: architect-assets/S101. https://k1.spdns.de/Vintage/Sinclair/82/Timex%20Sinclair%202068/Tech%20Specs%20and%20Repair/Timex%20Sinclair%202068%20-%20Technical%20Manual.pdf.
- **S102** [Yamaha YM2149 SSG data sheet (1992), features and SEL pin, pp. 1-2](https://bitsavers.org/components/yamaha/YM2149_199209.pdf). Local: architect-assets/S102. https://bitsavers.org/components/yamaha/YM2149_199209.pdf.
- **S103** [TMS9918A/9928A/9929A VDP Data Manual (1982), 3.7.1 TMS9918A terminal assignments, pp. 3-9 to 3-10](https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf). Local: architect-assets/S103. https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf.
- **S104** [TMS9918A/9928A/9929A VDP Data Manual (Nov 1982, bitsavers), 3.7.1 terminal table: XTAL1, XTAL2 = pins 40, 39, p. 3-9](http://www.bitsavers.org/components/ti/TMS9900/TMS9918A_TMS9928A_TMS9929A_Video_Display_Processors_Data_Manual_Nov82.pdf). Local: architect-assets/S104. https://www.bitsavers.org/components/ti/TMS9900/TMS9918A_TMS9928A_TMS9929A_Video_Display_Processors_Data_Manual_Nov82.pdf.
- **S105** [TI-99/4A Servicing Manual, VDP description (oscillator, GROM clock, CPU clock), printed pp. 67-68](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI994A_HC_Servicing_Manual_Oct_1983.pdf). Local: architect-assets/S105. https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI994A_HC_Servicing_Manual_Oct_1983.pdf.
- **S106** [ColecoVision Technical Manual (Coleco, 1983), VII signal pictures: U9 (TMS9928A) pin 35 B-Y, pin 36 Y, pin 38 R-Y video outputs, PDF pp. 70-71](https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf). Local: architect-assets/S106. https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf.
- **S107** [TMS9918A/9928A/9929A Data Manual (Nov 1982), applefritter mirror](https://git.applefritter.com/Apple-1-Tools/apple1-videocard-lib/raw/branch/main/docs/TMS9918A_TMS9928A_TMS9929A_Video_Display_Processors_Data_Manual_Nov82.pdf). Local: architect-assets/S107. https://git.applefritter.com/Apple-1-Tools/apple1-videocard-lib/raw/branch/main/docs/TMS9918A_TMS9928A_TMS9929A_Video_Display_Processors_Data_Manual_Nov82.pdf.
- **S108** [F18A pin-out and compatibility (dnotq.io), Wayback Machine copy (the live page fails certificate checks for some clients)](https://web.archive.org/web/20250120011023/https://dnotq.io/f18a/pinout.html). Local: architect-assets/S108. HTTP Error 429: Too Many Requests.
- **S109** [F18A pin-out and compatibility (Matthew Hagerty, dnotq.io)](https://dnotq.io/f18a/pinout.html). Local: architect-assets/S109. <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1032)>.
- **S110** [PICO9918 project README (visrealm, GitHub)](https://github.com/visrealm/pico9918). Local: architect-assets/S110. https://github.com/visrealm/pico9918.
- **S111** [SN76489AN data sheet, pinout p. 1](https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/SN76489.pdf). Local: architect-assets/S111. https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/SN76489.pdf.
- **S112** [TI-99/4A Technical Data, schematic sheet 62 (U511 TMS9919, clock note)](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf). Local: architect-assets/S112. https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf.
- **S113** [Sams CC2 TI-99/4A, parts list (semiconductors), p. 18](https://archive.org/details/cc_2_texasinst_ti99/page/n19/mode/1up). Local: architect-assets/S113. https://dn710907.ca.archive.org/0/items/cc_2_texasinst_ti99/cc_2_texasinst_ti99_text.pdf.
- **S114** [TMS4732 data sheet, TI MOS Memory Data Book 1986, ROMs, p. 7-15](https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/MOSMemory-1986/MOSMemory-1986-07-ROMs.pdf). Local: architect-assets/S114. https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/MOSMemory-1986/MOSMemory-1986-07-ROMs.pdf.
- **S115** [Motorola MC6809E HMOS 8-bit microprocessor data sheet, Pin Assignment, p. 1](https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf). Local: architect-assets/S115. https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf.
- **S116** [Color Computer 2 Service Manual, Figure 4-2 MC6809E Pin Assignments, p. 23](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%202%20NTSC%20Service%20Manual%20(26-3026%20%26%2026-3027)%20(Tandy).pdf). Local: architect-assets/S116. https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%202%20NTSC%20Service%20Manual%20(26-3026%20%26%2026-3027)%20(Tandy).pdf.
- **S117** [HD63B09EP Technical Reference Guide, Error Trapping, p. 14](https://colorcomputerarchive.com/repo/Documents/Microprocessors/HD6309/HD63B09EP%20Technical%20Reference%20Guide.pdf). Local: architect-assets/S117. https://colorcomputerarchive.com/repo/Documents/Microprocessors/HD6309/HD63B09EP%20Technical%20Reference%20Guide.pdf.
- **S118** [Motorola MC6847 video display generator data sheet, Pin Assignment, p. 1](https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847%20MOS%20Video%20Display%20Generator%20(Motorola).pdf). Local: architect-assets/S118. https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847%20MOS%20Video%20Display%20Generator%20(Motorola).pdf.
- **S119** [Motorola MC6847T1 Advance Information, features and pin assignment, p. 1](https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847T1%20MOS%20Video%20Display%20Generator%20(Motorola).pdf). Local: architect-assets/S119. https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6847T1%20MOS%20Video%20Display%20Generator%20(Motorola).pdf.
- **S120** [Motorola SN74LS783/MC6883 synchronous address multiplexer data sheet, Pin Assignment, p. 5-323](https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf). Local: architect-assets/S120. https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf.
- **S121** [Color Computer 3 Service Manual, IC6 TCC1014 pin diagram and block diagram, p. 96](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Service%20Manual%20(Tandy).pdf). Local: architect-assets/S121. https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Service%20Manual%20(Tandy).pdf.
- **S122** [Color Computer 3 Revised Schematic (Ty Sopko), U6 TCC1014](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Revised%20Schematic%20(Ty%20Sopko).pdf). Local: architect-assets/S122. https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Revised%20Schematic%20(Ty%20Sopko).pdf.
- **S123** [CoCo Bits, GIME-Z FPGA upgrade chip (product page)](https://cocobits.org/products/gime-z-upgrade-for-the-color-computer-3). Local: architect-assets/S123. https://cocobits.org/products/gime-z-upgrade-for-the-color-computer-3.
- **S124** [CoCopedia, GIME (known versions)](https://www.cocopedia.com/wiki/index.php/GIME). Local: architect-assets/S124. https://www.cocopedia.com/wiki/index.php/GIME.
- **S125** [MC-10 Schematic D-11531, U1 MC6803](https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Schematic/MC-10%20Schematic%20(Tandy).pdf). Local: architect-assets/S125. https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Schematic/MC-10%20Schematic%20(Tandy).pdf.
- **S126** [MC-10 Service Manual, CPU-6803 and Reset Circuit, p. 12](https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf). Local: architect-assets/S126. https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf.
- **S127** [Hitachi 8/16-bit Microprocessor Data Book (1991), HD6803 (compatible with MC6803), PDF p. 353](https://www.bitsavers.org/components/hitachi/_dataBooks/1991_M21T132_Hitatchi_8_16_Bit_Microprocessor_Data_Book.pdf). Local: architect-assets/S127. https://www.bitsavers.org/components/hitachi/_dataBooks/1991_M21T132_Hitatchi_8_16_Bit_Microprocessor_Data_Book.pdf.
- **S128** [Western Digital FD1771-01 data sheet, pin connections, p. 1](https://archive.org/download/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital.pdf). Local: architect-assets/S128. https://dn760004.eu.archive.org/0/items/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital.pdf.
- **S129** [Expansion Interface Service Manual, schematic sheet 3 (Z34 FD1771B-01, J5)](https://archive.org/download/Expansion_Interface_Service_Manual_19xx_Radio_Shack/Expansion_Interface_Service_Manual_19xx_Radio_Shack.pdf). Local: architect-assets/S129. https://dn760108.eu.archive.org/0/items/Expansion_Interface_Service_Manual_19xx_Radio_Shack/Expansion_Interface_Service_Manual_19xx_Radio_Shack.pdf.
- **S130** [trs-80.org, Percom Doubler](https://www.trs-80.org/percom-doubler.html). Local: architect-assets/S130. https://www.trs-80.org/percom-doubler.html.
- **S131** [Western Digital FD179X-02 data sheet (May 1980), pin connections, p. 1](https://bitsavers.org/components/westernDigital/FD179X-02_Data_Sheet_May1980.pdf). Local: architect-assets/S131. https://bitsavers.org/components/westernDigital/FD179X-02_Data_Sheet_May1980.pdf.
- **S132** [Western Digital WD279X-02 data sheet, features and description, p. 1](https://archive.org/details/wd279x-6a91f82a09428057655792/page/n0). Local: architect-assets/S132. https://dn711105.ca.archive.org/0/items/wd279x-6a91f82a09428057655792/wd279x-6a91f82a09428057655792.pdf.
- **S133** [Western Digital WD177X-00 data sheet, features and description, p. 1](https://archive.org/details/Western_Digital_Corporation_WD177X-00_Floppy_Disk_Formatter_Controller_undated/page/n0). Local: architect-assets/S133. https://dn790001.ca.archive.org/0/items/Western_Digital_Corporation_WD177X-00_Floppy_Disk_Formatter_Controller_undated/Western_Digital_Corporation_WD177X-00_Floppy_Disk_Formatter_Controller_undated_text.pdf.
- **S134** [Motorola MC6802/6808 datasheet DS9818-R3 (1984), pin assignment p. 1, signals p. 7-8](https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf). Local: architect-assets/S134. https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf.
- **S135** [ET-18 Schematics sheet 2 of 4, CPU board (U401 pins 1, 21, 36 to ground) (archive.org)](https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Schematics%20sheet%202%20of%204%20%28arm%20drive%2C%20cpu%2C%20charger%29.pdf). Local: architect-assets/S135. https://ia601603.us.archive.org/7/items/heathkit-hero-1-ET-18/ET-18%20Schematics%20sheet%202%20of%204%20%28arm%20drive%2C%20cpu%2C%20charger%29.pdf.
- **S136** [Motorola MC6821 datasheet DS9435-R3, pin assignment p. 1 (bitsavers)](https://bitsavers.org/components/motorola/_dataSheets/6821.pdf). Local: architect-assets/S136. https://bitsavers.org/components/motorola/_dataSheets/6821.pdf.
- **S137** [Microchip 27C64 data sheet DS11107M, pin diagram, p. 1](https://ww1.microchip.com/downloads/en/DeviceDoc/11107M.pdf). Local: architect-assets/S137. https://ww1.microchip.com/downloads/en/DeviceDoc/11107M.pdf.
- **S138** [Microchip (Atmel) AT28C64B data sheet 0270L, pin configurations, p. 2](https://ww1.microchip.com/downloads/en/DeviceDoc/doc0270.pdf). Local: architect-assets/S138. https://ww1.microchip.com/downloads/en/DeviceDoc/doc0270.pdf.
- **S139** [Microchip 27C128 data sheet DS11003L, pin diagram, p. 1](https://ww1.microchip.com/downloads/en/DeviceDoc/11003L.pdf). Local: architect-assets/S139. https://ww1.microchip.com/downloads/en/DeviceDoc/11003L.pdf.
- **S140** [Microchip (Atmel) AT27C256R data sheet 0014, pin configurations, p. 2](https://ww1.microchip.com/downloads/en/DeviceDoc/doc0014.pdf). Local: architect-assets/S140. https://ww1.microchip.com/downloads/en/DeviceDoc/doc0014.pdf.
- **S141** [Motorola MC146818A datasheet ADI-1026 (1984), pinout p. 1, signals p. 8-10](https://www.scs.stanford.edu/22wi-cs212/pintos/specs/mc146818a.pdf). Local: architect-assets/S141. https://www.scs.stanford.edu/22wi-cs212/pintos/specs/mc146818a.pdf.
- **S142** [Master Series Service Manual, real time clock and system VIA addressable latch, pp. 21, 23](https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf). Local: architect-assets/S142. https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf.
- **S143** [Motorola MC6850 datasheet DS9493R4 (1985), pin assignment p. 1](https://ipv4.pccomponents.com/datasheets/MOTOR-MC6850P.pdf). Local: architect-assets/S143. https://ipv4.pccomponents.com/datasheets/MOTOR-MC6850P.pdf.
- **S144** [TI SN54/74LS138 datasheet SDLS014, p. 1](https://www.ti.com/lit/ds/symlink/sn74ls138.pdf). Local: architect-assets/S144. https://www.ti.com/lit/ds/symlink/sn74ls138.pdf.
- **S145** [TI TL852 Sonar Ranging Receiver, SLSS003 (1988), p. 1](https://www.ti.com/lit/ds/symlink/tl852.pdf). Local: architect-assets/S145. https://www.ti.com/lit/ds/symlink/tl852.pdf.
- **S146** [TI TL852 product page](https://www.ti.com/product/TL852). Local: architect-assets/S146. https://www.ti.com/product/TL852.
- **S147** [OKI MSM5832RS, 1986 OKI Microprocessor Data Book, printed p. 251 (pins p. 256-257)](https://bitsavers.org/components/oki/_dataBooks/1986_OKI_Microprocessor_Databook.pdf). Local: architect-assets/S147. https://bitsavers.org/components/oki/_dataBooks/1986_OKI_Microprocessor_Databook.pdf.
- **S148** [Silicon Systems SSI 263A, 1985 Silicon Systems Data Book, printed p. 1-42](https://bitsavers.org/components/siliconSystems/_dataBooks/1985_Silicon_Systems_Data_Book.pdf). Local: architect-assets/S148. https://bitsavers.org/components/siliconSystems/_dataBooks/1985_Silicon_Systems_Data_Book.pdf.
- **S149** [Intel iAPX 88/10 (8088) data sheet, 1983 Microprocessors and Peripherals Handbook pp. 3-79 to 3-83](https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf). Local: architect-assets/S149. https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf.
- **S150** [Intel 8088 data sheet (PCjs copy)](https://www.pcjs.org/documents/datasheets/intel/INTEL_8088_CPU.pdf). Local: architect-assets/S150. https://www.pcjs.org/documents/datasheets/intel/INTEL_8088_CPU.pdf.
- **S151** [minuszerodegrees.net, problems resulting from upgrading an 8088 CPU to a V20](https://minuszerodegrees.net/misc/v20_problems.htm). Local: architect-assets/S151. HTTP Error 406: Not Acceptable.
- **S152** [Intersil 80C88 data sheet, D.C. specifications (VIHC), p. 17](https://www.renesas.com/us/en/document/dst/80c88-datasheet). Local: architect-assets/S152. https://www.renesas.com/en/document/dst/80c88-datasheet.
- **S153** [Intersil 82C84A data sheet, p. 1](https://www.renesas.com/us/en/document/dst/82c84a-datasheet). Local: architect-assets/S153. https://www.renesas.com/en/document/dst/82c84a-datasheet.
- **S154** [Intersil 82C88 data sheet, D.C. specifications (VIHC), p. 5](https://www.renesas.com/us/en/document/dst/82c88-datasheet). Local: architect-assets/S154. https://www.renesas.com/en/document/dst/82c88-datasheet.
- **S155** [Intel 8259A data sheet, order 231468-003 (MIT copy)](https://pdos.csail.mit.edu/6.1810/2004/readings/hardware/8259A.pdf). Local: architect-assets/S155. https://pdos.csail.mit.edu/6.1810/2004/readings/hardware/8259A.pdf.
- **S156** [IBM PC Technical Reference (Apr 1983), 8088 hardware interrupt listing (PDF p. 19)](https://bitsavers.org/pdf/ibm/pc/pc/1502234_PC_Technical_Reference_Apr83.pdf). Local: architect-assets/S156. https://bitsavers.org/pdf/ibm/pc/pc/1502234_PC_Technical_Reference_Apr83.pdf.
- **S157** [PCjr Technical Reference (Nov 1983), 8259A interrupt controller and IRQ list, p. 2-15](https://bitsavers.org/pdf/ibm/pc/pc_jr/PCjr_Technical_Reference_Nov83.pdf). Local: architect-assets/S157. https://bitsavers.org/pdf/ibm/pc/pc_jr/PCjr_Technical_Reference_Nov83.pdf.
- **S158** [Intersil 82C59A data sheet, p. 1](https://www.renesas.com/us/en/document/dst/82c59a-datasheet). Local: architect-assets/S158. https://www.renesas.com/en/document/dst/82c59a-datasheet.
- **S159** [IBM PC XT Technical Reference (Apr 1984), 8255A I/O bit map, p. 1-26](https://bitsavers.org/pdf/ibm/pc/xt/6361459_PC_XT_Technical_Reference_Apr84.pdf). Local: architect-assets/S159. https://bitsavers.org/pdf/ibm/pc/xt/6361459_PC_XT_Technical_Reference_Apr84.pdf.
- **S160** [Intersil 82C55A data sheet, pin description (bus hold), p. 3](https://www.renesas.com/us/en/document/dst/82c55a-datasheet). Local: architect-assets/S160. https://www.renesas.com/en/document/dst/82c55a-datasheet.
- **S161** [Intel 8237A data sheet, order 231466-005 (MIT copy)](https://pdos.csail.mit.edu/6.1810/2004/readings/hardware/8237A.pdf). Local: architect-assets/S161. https://pdos.csail.mit.edu/6.1810/2004/readings/hardware/8237A.pdf.
- **S162** [Intersil 82C37A data sheet, D.C. specifications (VIHC), p. 16](https://www.renesas.com/us/en/document/dst/82c37a-datasheet). Local: architect-assets/S162. https://www.renesas.com/en/document/dst/82c37a-datasheet.
- **S163** [minuszerodegrees.net, Intel 8087 math co-processor (speed rating, switch setting)](https://minuszerodegrees.net/npu/8087.htm). Local: architect-assets/S163. HTTP Error 406: Not Acceptable.
- **S164** [Motorola MC6845 CRT controller data sheet, pin assignment p. 1, pin description p. 8](https://bitsavers.org/components/motorola/_dataSheets/6845.pdf). Local: architect-assets/S164. https://bitsavers.org/components/motorola/_dataSheets/6845.pdf.
- **S165** [Hitachi HD46505R CRT Controller user manual, features p. 6, electrical characteristics p. 22](https://bitsavers.org/components/hitachi/_dataSheets/HLN014_HD46505R_CRT_Controller_Users_Manual.pdf). Local: architect-assets/S165. https://bitsavers.org/components/hitachi/_dataSheets/HLN014_HD46505R_CRT_Controller_Users_Manual.pdf.
- **S166** [Rockwell R6545-1 CRT Controller data sheet (Dec 1980), features and pin configuration p. 1, R8 p. 2](https://bitsavers.org/components/rockwell/R6545-1_CRT_Controller_DataSheet_Dec1980.pdf). Local: architect-assets/S166. https://bitsavers.org/components/rockwell/R6545-1_CRT_Controller_DataSheet_Dec1980.pdf.
- **S167** [CPCWiki, CRTC: part numbers and type numbers (archived Jan 2025)](https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC). Local: architect-assets/S167. https://web.archive.org/web/20250102091704/https://www.cpcwiki.eu/index.php/CRTC.
- **S168** [minuszerodegrees.net, IBM 5160 RAM on a 256-640KB motherboard](https://minuszerodegrees.net/5160/ram/5160_ram_256_640.htm). Local: architect-assets/S168. HTTP Error 406: Not Acceptable.
- **S169** [Same page, Wayback Machine copy (Mar 2026; the site refuses some clients with HTTP 406)](https://web.archive.org/web/20260322225148/https://www.minuszerodegrees.net/5160/ram/5160_ram_256_640.htm). Local: architect-assets/S169. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S170** [Upgrading and Repairing PCs, IBM XT 256K to 640K motherboard procedure, pp. 521-523 (minuszerodegrees.net copy)](https://minuszerodegrees.net/5160/motherboard/5160_upgrading_256k_motherboard_to_640k.pdf). Local: architect-assets/S170. https://minuszerodegrees.net/5160/motherboard/5160_upgrading_256k_motherboard_to_640k.pdf.
- **S171** [Amstrad CPC464 / CTM640 / GT64 Service Manual, CPC464 circuit diagram p. 15-16, IC116 gate array](https://archive.org/details/amstrad-cpc-464-micro-computer-ctm-640-color-monitor-gt-64-green-monitor-service-manual/page/n12). Local: architect-assets/S171. https://ia800901.us.archive.org/32/items/amstrad-cpc-464-micro-computer-ctm-640-color-monitor-gt-64-green-monitor-service-manual/Amstrad_CPC464_Micro_Computer_CTM640_Color_Monitor_GT64_Green_Monitor_Service_Manual_text.pdf.
- **S172** [Amstrad CPC464 / CTM640 / GT64 Service Manual, electrical parts list p. 17 (IC116 20RA043, part 40007)](https://archive.org/details/amstrad-cpc-464-micro-computer-ctm-640-color-monitor-gt-64-green-monitor-service-manual/page/n13). Local: architect-assets/S172. https://ia800901.us.archive.org/32/items/amstrad-cpc-464-micro-computer-ctm-640-color-monitor-gt-64-green-monitor-service-manual/Amstrad_CPC464_Micro_Computer_CTM640_Color_Monitor_GT64_Green_Monitor_Service_Manual_text.pdf.
- **S173** [CPCWiki, Gate Array and ASIC Pin-Outs (archived copy)](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Gate_Array_and_ASIC_Pin-Outs). Local: architect-assets/S173. HTTP Error 429: Too Many Requests.
- **S174** [AMSGateArray: Xilinx CPLD replacements for the 40010 and 40007 (GitHub, archived 2024)](https://github.com/codedchip/AMSGateArray). Local: architect-assets/S174. https://github.com/codedchip/AMSGateArray.
- **S175** [Amstrad CPC6128 / CTM644 / GT65 Service Manual, CPU circuit diagram p. 19-20, IC118](https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n16). Local: architect-assets/S175. https://dn760100.eu.archive.org/0/items/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/Amstrad_CPC6128_Micro_Computer_CTM644_Color_Monitor_GT65_Green_Monitor_Service_Manual_text.pdf.
- **S176** [CPCWiki, PAL16L8 (archived copy)](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/PAL16L8). Local: architect-assets/S176. HTTP Error 429: Too Many Requests.
- **S177** [Amstrad CPC664 Service Manual, electrical parts list (IC103 TMM-23256P-1952, part 40022)](https://archive.org/details/amstrad-cpc-664-service-manual/page/n17). Local: architect-assets/S177. https://dn760105.eu.archive.org/0/items/amstrad-cpc-664-service-manual/Amstrad%20CPC664%20Service%20Manual_text.pdf.
- **S178** [Amstrad CPC464 / CPC6128 / GT65 / CTM644 / MP3 Service Manual Amendment (parts lists, revised schematics)](https://archive.org/details/amstrad-cpc-464-cpc-6128-micro-computer-gt-65-green-monitor-ctm-644-color-monito). Local: architect-assets/S178. https://dn721902.ca.archive.org/0/items/amstrad-cpc-464-cpc-6128-micro-computer-gt-65-green-monitor-ctm-644-color-monito/Amstrad_CPC464_CPC6128_Micro_Computer_GT65_Green_Monitor_CTM644_Color_Monitor_MP3_Modulator_CT1_Clock_Timer_Service_Manual_Amendment_text.pdf.
- **S179** [Microchip 27C256 data sheet DS11001N, pinout and read-mode VPP, pp. 1-2](https://ww1.microchip.com/downloads/en/DeviceDoc/11001N.pdf). Local: architect-assets/S179. https://ww1.microchip.com/downloads/en/DeviceDoc/11001N.pdf.
- **S180** [NEC uPD765 Floppy Disk Controller data sheet (Dec 1978), pin configuration p. 1](https://bitsavers.org/components/nec/_dataSheets/uPD765_Data_Sheet_Dec78.pdf). Local: architect-assets/S180. https://bitsavers.org/components/nec/_dataSheets/uPD765_Data_Sheet_Dec78.pdf.
- **S181** [Amstrad CPC6128 / CTM644 / GT65 Service Manual, interface circuit diagram p. 33-34, IC201](https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n27). Local: architect-assets/S181. https://dn760100.eu.archive.org/0/items/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/Amstrad_CPC6128_Micro_Computer_CTM644_Color_Monitor_GT65_Green_Monitor_Service_Manual_text.pdf.
- **S182** [CPCWiki, 765 FDC (archived copy)](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/765_FDC). Local: architect-assets/S182. HTTP Error 429: Too Many Requests.
- **S183** [Circuit diagram for BBC Microcomputer 103,000/C, IC6 video processor](https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf). Local: architect-assets/S183. HTTP Error 429: Too Many Requests.
- **S184** [BeebWiki, Video ULA (pinout, registers; secondary)](https://beebwiki.mdfs.net/Video_ULA). Local: architect-assets/S184. https://beebwiki.mdfs.net/Video_ULA.
- **S185** [BeebWiki, Serial ULA (secondary)](https://beebwiki.mdfs.net/Serial_ULA). Local: architect-assets/S185. https://beebwiki.mdfs.net/Serial_ULA.
- **S186** [BBC Microcomputer Service Manual (Oct 1985), 6.4 Most common faults (R75 by serial processor issue), p. 41](https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_BBCSMOct85_Sec1.pdf). Local: architect-assets/S186. https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_BBCSMOct85_Sec1.pdf.
- **S187** [Philips Semiconductors and ICs Part 6b (1979), SAA5050 data sheet, pinning p. 2](http://www.bitsavers.org/components/philips/_dataBooks/1979_Philips_Semiconductors_and_Integrated_Circuits_Part_6b_ICs_for_Digital_Systems_in_Radio_and_TV.pdf). Local: architect-assets/S187. https://www.bitsavers.org/components/philips/_dataBooks/1979_Philips_Semiconductors_and_Integrated_Circuits_Part_6b_ICs_for_Digital_Systems_in_Radio_and_TV.pdf.
- **S188** [Wikipedia, Mullard SAA5050, variants (secondary)](https://en.wikipedia.org/wiki/Mullard_SAA5050). Local: architect-assets/S188. https://en.wikipedia.org/wiki/Mullard_SAA5050.
- **S189** [Western Digital 1984 Storage Products Handbook, WD1770/1772 data sheet, pp. 43-44](http://www.bitsavers.org/components/westernDigital/_dataBooks/wd1984storageProducts_01.pdf). Local: architect-assets/S189. https://www.bitsavers.org/components/westernDigital/_dataBooks/wd1984storageProducts_01.pdf.
- **S190** [NEC 1982 Microcomputer Catalog, uPD7002 10-bit A/D converter, p. 483](http://www.bitsavers.org/components/nec/_dataBooks/1982_NEC_Microcomputer_Catalog.pdf). Local: architect-assets/S190. https://www.bitsavers.org/components/nec/_dataBooks/1982_NEC_Microcomputer_Catalog.pdf.
- **S191** [Mostek 1980 Memory Data Book, MK4516 16K x 1 dynamic RAM, p. V-47](http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf). Local: architect-assets/S191. https://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf.
- **S192** [SGS-Thomson HCC/HCF4529B data sheet (Sep 1988), pin connections and truth table, p. 1 (Aalborg University component library copy)](https://www.komponenten.es.aau.dk/fileadmin/komponenten/Data_Sheet/4000/4529.pdf.pdf). Local: architect-assets/S192. https://www.komponenten.es.aau.dk/fileadmin/komponenten/Data_Sheet/4000/4529.pdf.pdf.
- **S193** [Motorola MC14529B dual 4-channel analog data selector, p. 7-457 (1978 CMOS Data Book)](https://bitsavers.org/components/motorola/_dataBooks/1978_Motorola_CMOS_Data_Book.pdf). Local: architect-assets/S193. https://bitsavers.org/components/motorola/_dataBooks/1978_Motorola_CMOS_Data_Book.pdf.
- **S194** [Dragon 32 circuit diagram SA2120 sheet 2 (IC20 4529)](https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21202-IO.gif). Local: architect-assets/S194. http://dragondata.co.uk/tech/circuit-diag/D32/SA/D32-SA21202-IO.gif.
- **S195** [Inside the Dragon, sound source selection table, pp. 208-209](https://archive.worldofdragon.org/browse/downloads/Books/InsideTheDragon%20-%20Smeed%20and%20Sommerville%20(1983).pdf). Local: architect-assets/S195. https://archive.worldofdragon.org/browse/downloads/Books/InsideTheDragon%20-%20Smeed%20and%20Sommerville%20(1983).pdf.
- **S196** [Color Computer schematic 8000073, sheet 2 (U9 MC14529B, U14 LM339), p. 71](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%201%20Schematic%20(Tandy).pdf). Local: architect-assets/S196. https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%201%20Schematic%20(Tandy).pdf.
- **S197** [Yamaha V9958 MSX-Video Technical Data Book (Dec 1988), 4 Pin layout and functions, pp. 3-4 (vgamuseum.info scan)](https://vgamuseum.info/images/doc/yamaha/v9958.pdf). Local: architect-assets/S197. https://vgamuseum.info/images/doc/yamaha/v9958.pdf.
- **S198** [Yamaha V9938 MSX-Video Technical Data Book (ASCII / Nippon Gakki, Aug 1985), Part 2 sec. 2 pin assignments and functions, p. 114](https://archive.org/details/bitsavers_yamahaYamanicalDataBookAug85_6932685/page/n126). Local: architect-assets/S198. https://dn710705.ca.archive.org/0/items/bitsavers_yamahaYamanicalDataBookAug85_6932685/Yamaha_V9938_MSX-Video_Technical_Data_Book_Aug85.pdf.
- **S199** [Yamaha V9938 MSX-Video Technical Data Book (ASCII / Nippon Gakki, Aug 1985), Part 2 sec. 2 pin functions (cont.), p. 115](https://archive.org/details/bitsavers_yamahaYamanicalDataBookAug85_6932685/page/n127). Local: architect-assets/S199. https://dn710705.ca.archive.org/0/items/bitsavers_yamahaYamanicalDataBookAug85_6932685/Yamaha_V9938_MSX-Video_Technical_Data_Book_Aug85.pdf.
- **S200** [Yamaha V9938 MSX-Video Technical Data Book (ASCII / Nippon Gakki, Aug 1985), Part 2 sec. 1-4 MSX-Video circuit example (21.47727 MHz crystal, 128 KB VRAM), p. 113](https://archive.org/details/bitsavers_yamahaYamanicalDataBookAug85_6932685/page/n125). Local: architect-assets/S200. https://dn710705.ca.archive.org/0/items/bitsavers_yamahaYamanicalDataBookAug85_6932685/Yamaha_V9938_MSX-Video_Technical_Data_Book_Aug85.pdf.
- **S201** [MSX2 Technical Handbook (ASCII, transcription on archive.org), ch. 1 sec. 2 MSX2 VRAM and VDP](https://archive.org/download/MSX-MSX2TechnicalHandbook/th-1.txt). Local: architect-assets/S201. https://dn721704.ca.archive.org/0/items/MSX-MSX2TechnicalHandbook/th-1.txt.
- **S202** [ColecoVision schematic, KiCad redraw Rev J (colecovisionadam.com), sheet 9: U2 9464C-0036 pin numbers, solder traces and jumpers WJ4/WJ5 (EEPROM note)](https://colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf). Local: architect-assets/S202. https://www.colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf.
- **S203** [C64-Wiki: Commodore 16 (power 2 pins, 9 V DC, 0.8 A)](https://www.c64-wiki.com/wiki/Commodore_16). Local: architect-assets/S203. https://www.c64-wiki.com/wiki/Commodore_16.
- **S204** [Plus/4 térkép connector map: power, cassette, video, joystick, serial](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg). Local: architect-assets/S204. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg.
- **S205** [Plus/4 térkép connector map (Hungarian magazine, drawn from the real machine), p. 33](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-1.jpg). Local: architect-assets/S205. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-1.jpg.
- **S206** [Plus/4 power supply schematic and plug drawing (zimmers.net)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/powersupply.gif). Local: architect-assets/S206. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/powersupply.gif.
- **S207** [Plus/4 Service Manual 314001-04, schematic with CN7 (pins 7 and 8 to N.C.), PDF p. 21](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf). Local: architect-assets/S207. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf.
- **S208** [Commodore C64 power supply 902503-02 schematic and DIN drawing](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/c64_external_power_supply_902503-02.png). Local: architect-assets/S208. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/c64_external_power_supply_902503-02.png.
- **S209** [Ray Carlsen, All About the Commodore Power Supply (CBM PS.txt)](https://portcommodore.com/rcarlsen/cbm/c64/C64%20PS/CBM%20PS.txt). Local: architect-assets/S209. HTTP Error 406: Not Acceptable.
- **S210** [Ray Carlsen, All About the Commodore Power Supply (CBM PS.txt), Wayback Machine copy (2025)](https://web.archive.org/web/20250312194753/https://portcommodore.com/rcarlsen/cbm/c64/C64%20PS/CBM%20PS.txt). Local: architect-assets/S210. https://web.archive.org/web/20250312194753/https://portcommodore.com/rcarlsen/cbm/c64/C64%20PS/CBM%20PS.txt.
- **S211** [VIC-20 schematic 324001 sheet 2 (power jack, bridge, LM323)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02b.gif). Local: architect-assets/S211. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02b.gif.
- **S212** [PET IEEE-488 connector J1/J12 pin arrangement (zimmers.net)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/IEEE-488_pinout.gif). Local: architect-assets/S212. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/IEEE-488_pinout.gif.
- **S213** [PET user port J2 pin arrangement (zimmers.net)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/PET_User_Port_pinout.gif). Local: architect-assets/S213. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/PET_User_Port_pinout.gif.
- **S214** [PET cassette J3/J6 pin arrangement (zimmers.net)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/Datasette_pinout.gif). Local: architect-assets/S214. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/Datasette_pinout.gif.
- **S215** [PET-N video J7 pin arrangement (zimmers.net)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/PET-N_Video_pinout.gif). Local: architect-assets/S215. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/PET-N_Video_pinout.gif.
- **S216** [Dynamic PET logic diagram 320349 sheet 1 (J4, J9)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-1.gif). Local: architect-assets/S216. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-1.gif.
- **S217** [Commodore 128 System Guide, Appendix C: "five pin square plug" power socket](https://commodore.ca/manuals/128_system_guide/app-c.htm). Local: architect-assets/S217. https://commodore.ca/manuals/128_system_guide/app-c.htm.
- **S218** [C128 Programmer's Reference Guide, Table 12-6 RGBI connector, p. 398](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf). Local: architect-assets/S218. 200 http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf.
- **S219** [1541-II Service Manual Addendum 314862-01, p. 43: 1541-II schematic 355207 (board 340503)](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf). Local: architect-assets/S219. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf.
- **S220** [1540/1541 Service Manual 314002-01, serial interface, PDF p. 12](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf). Local: architect-assets/S220. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf.
- **S221** [Commodore schematic 251748 rev. E, sheet 3 left half: UC4 6502, UB3/UB4 ROM, UC2/UC3 VIA, P1 power, P2/P3 serial](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/short-251748-rev.E-left.gif). Local: architect-assets/S221. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/short-251748-rev.E-left.gif.
- **S222** [Commodore 1541-II/1571-II/1581 power supply P/N 312551-01 schematic and plug drawing (zimmers.net redraw)](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1581/powersupply.gif). Local: architect-assets/S222. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1581/powersupply.gif.
- **S223** [Ray Carlsen, 1541-II Diagnostics and Repair (1541-II.txt)](https://portcommodore.com/rcarlsen/cbm/1541/1541-II/1541-II.txt). Local: architect-assets/S223. HTTP Error 406: Not Acceptable.
- **S224** [Ray Carlsen, 1541-II Diagnostics and Repair (1541-II.txt), Wayback Machine copy (2024)](https://web.archive.org/web/20241209002723/https://portcommodore.com/rcarlsen/cbm/1541/1541-II/1541-II.txt). Local: architect-assets/S224. HTTP Error 429: Too Many Requests.
- **S225** [Commodore schematic 251748 rev. E (1541A short board 250442/250446), sheet 3 right half: UC1 325572, P5-P8](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/short-251748-rev.E-right.gif). Local: architect-assets/S225. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/short-251748-rev.E-right.gif.
- **S226** [Ray Carlsen, 1541 Diagnostics (fix1541.txt)](https://portcommodore.com/rcarlsen/cbm/1541/fix1541.txt). Local: architect-assets/S226. HTTP Error 406: Not Acceptable.
- **S227** [Ray Carlsen, 1541 Diagnostics (fix1541.txt), Wayback Machine copy (2025)](https://web.archive.org/web/20251206140425/https://portcommodore.com/rcarlsen/cbm/1541/fix1541.txt). Local: architect-assets/S227. HTTP Error 429: Too Many Requests.
- **S228** [Commodore TechTopics 15 (1985), drive runs continuously (UD2 7417)](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/tech/1541-40.gif). Local: architect-assets/S228. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/tech/1541-40.gif.
- **S229** [1571 Service Manual 314002-04, p. 19: PCB assembly 310420 schematic](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1571/310420-full.gif). Local: architect-assets/S229. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1571/310420-full.gif.
- **S230** [1571 User's Guide, Appendix F serial interface information (text edition)](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571-users-manual-1.0.txt). Local: architect-assets/S230. 200 http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571-users-manual-1.0.txt.
- **S231** [Ray Carlsen 1571 folder: power supply wiring to main board (CN1/CN1A colours, Sams-style drawing)](https://portcommodore.com/rcarlsen/cbm/1571/PS%20wiring%20to%20main%20board.jpg). Local: architect-assets/S231. https://portcommodore.com/rcarlsen/cbm/1571/PS%20wiring%20to%20main%20board.jpg.
- **S232** [Ray Carlsen 1571 folder: power supply wiring to main board, Wayback Machine copy (2021)](https://web.archive.org/web/20211119212743/https://portcommodore.com/rcarlsen/cbm/1571/PS%20wiring%20to%20main%20board.jpg). Local: architect-assets/S232. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S233** [Ray Carlsen, 1581 Disk Drive Diagnostics (1581.txt)](https://portcommodore.com/rcarlsen/cbm/1581/1581.txt). Local: architect-assets/S233. HTTP Error 406: Not Acceptable.
- **S234** [Ray Carlsen, 1581 Disk Drive Diagnostics (1581.txt), Wayback Machine copy (2023)](https://web.archive.org/web/20230927055247/https://portcommodore.com/rcarlsen/cbm/1581/1581.txt). Local: architect-assets/S234. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S235** [Apple IIe Technical Reference Manual, Table 7-3 power connector, p. 161](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n194). Local: architect-assets/S235. https://dn721808.ca.archive.org/0/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S236** [Apple II Reference Manual (1979), Figure 19 connector layout, p. 104](https://archive.org/details/Apple_II_Reference_Manual_1979_Apple/page/n114). Local: architect-assets/S236. https://dn760104.eu.archive.org/0/items/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf.
- **S237** [Apple IIe Technical Reference Manual, Table 7-19 game I/O, p. 191](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n224). Local: architect-assets/S237. https://dn721808.ca.archive.org/0/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S238** [Apple IIe Technical Reference Manual, Table 7-20 expansion slot signals, pp. 195-196](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n228). Local: architect-assets/S238. https://dn721808.ca.archive.org/0/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S239** [Apple II Reference Manual (1979), Figure 21 side layout, p. 106](https://archive.org/details/Apple_II_Reference_Manual_1979_Apple/page/n116). Local: architect-assets/S239. https://dn760104.eu.archive.org/0/items/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf.
- **S240** [Apple IIe Technical Reference Manual, Table 7-21 auxiliary slot signals, pp. 198-199](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n231). Local: architect-assets/S240. https://dn721808.ca.archive.org/0/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S241** [Apple IIe Technical Reference Manual, Video Output Signals, p. 186](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n219). Local: architect-assets/S241. https://ia801409.us.archive.org/3/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S242** [Apple IIe Technical Reference Manual, Cassette I/O, p. 189](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n222). Local: architect-assets/S242. https://dn721808.ca.archive.org/0/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S243** [Apple IIe Technical Reference Manual (1987 ed.), Table 7-16 keyboard connector, pp. 187-188](https://archive.org/details/apple-iie-technical-reference-manual-1987-edition/page/n214). Local: architect-assets/S243. https://dn710201.ca.archive.org/0/items/apple-iie-technical-reference-manual-1987-edition/Apple%20IIe%20Technical%20Reference%20Manual%20%281987%20Edition%29.pdf.
- **S244** [Apple IIe Technical Reference Manual (1985), Table 7-16, p. 188 (pin 11/18 misprint)](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n221). Local: architect-assets/S244. https://dn721808.ca.archive.org/0/items/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf.
- **S245** [Understanding the Apple II (Sather), Figure 9.3 drive connections, p. 9-6](https://archive.org/details/understanding_the_apple_ii/page/n235). Local: architect-assets/S245. https://dn760103.eu.archive.org/0/items/understanding_the_apple_ii/understanding_the_apple_ii_text.pdf.
- **S246** [Disk II analog card photo (650-0103, header pin 1 and 20 marked) (A2DP)](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Photos/Apple%20Disk%20II%20Drive%20-%20Analog%20card.jpg). Local: architect-assets/S246. https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Photos/Apple%20Disk%20II%20Drive%20-%20Analog%20card.jpg.
- **S247** [Disk [ Technical Procedures, replacing the cable (arrow to pin 1), p. 1.5](https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Apple%20Disk%20II%20Technical%20Procedures.pdf). Local: architect-assets/S247. https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Apple%20Disk%20II%20Technical%20Procedures.pdf.
- **S248** [Disk II Installation and Operating Manual, centring the connector, p. 2](https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Disk%20II%20Floppy%20Disk%20Subsystem%20Installation%20and%20Operating%20Manual.pdf). Local: architect-assets/S248. https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/Disk%20II%20Floppy%20Disk%20Subsystem%20Installation%20and%20Operating%20Manual.pdf.
- **S249** [Disk II Interface Card photo (650-X104, DRIVE 1 / DRIVE 2 headers, pins 1, 2, 19, 20 marked) (A2DP)](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Interface%20Cards/Disk%20Drive%20Controllers/Apple%20Disk%20II%20Interface%20Card/Photos/Apple%20Disk%20II%20Interface%20Card%20-%20Front.jpg). Local: architect-assets/S249. https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Interface%20Cards/Disk%20Drive%20Controllers/Apple%20Disk%20II%20Interface%20Card/Photos/Apple%20Disk%20II%20Interface%20Card%20-%20Front.jpg.
- **S250** [Apple Tech Info Library TA37054, DuoDisk: Cable Specifications and Pinouts (cable 590-0114) (A2DP)](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20DuoDisk%205.25/Documentation/Apple%20DuoDisk%20-%20Cable%20Specifications.pdf). Local: architect-assets/S250. https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20DuoDisk%205.25/Documentation/Apple%20DuoDisk%20-%20Cable%20Specifications.pdf.
- **S251** [A2DP photo: DuoDisk A9M0108 back panel (DB-25 socket, model label)](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20DuoDisk%205.25/Photos/Apple%20DuoDisk%205.25%20-%20Back.jpg). Local: architect-assets/S251. https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20DuoDisk%205.25/Photos/Apple%20DuoDisk%205.25%20-%20Back.jpg.
- **S252** [Apple IIc Technical Reference Manual, Figure 11-26 disk drive connector, p. 274](https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n301). Local: architect-assets/S252. https://dn790002.ca.archive.org/0/items/Apple_IIc_Technical_Reference_Manual/Apple_IIc_Technical_Reference_Manual_text.pdf.
- **S253** [DuoDisk Owner's Manual, fitting the D-shaped connector, p. 2-4](https://archive.org/details/addom/page/n11). Local: architect-assets/S253. https://dn790008.ca.archive.org/0/items/addom/DUODISK_OwnersManual.pdf.
- **S254** [Apple IIc Technical Reference Manual, Table 11-4 internal converter (+12 V ±10 %), p. 234](https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n261). Local: architect-assets/S254. https://dn790002.ca.archive.org/0/items/Apple_IIc_Technical_Reference_Manual/Apple_IIc_Technical_Reference_Manual_text.pdf.
- **S255** [UniDisk Owner's Manual, connecting a second UniDisk (daisy chain)](https://archive.org/details/Apple_II_UniDisk_Owners_Manual/page/n13). Local: architect-assets/S255. https://ia801906.us.archive.org/23/items/Apple_II_UniDisk_Owners_Manual/Apple_II_UniDisk_Owners_Manual_text.pdf.
- **S256** [A2DP photo: UniDisk 5.25 back (daisy-chain DB-19 socket, captive cable)](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20UniDisk%205.25/Photos/Apple%20UniDisk%205.25%20-%20Back.jpg). Local: architect-assets/S256. https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20UniDisk%205.25/Photos/Apple%20UniDisk%205.25%20-%20Back.jpg.
- **S257** [Atari Home Computer Technical Reference Notes CO16555 (1982), OS Manual Fig. 9-4, Serial Bus Connector, p. 146](http://www.bitsavers.org/pdf/atari/400_800/CO16555_Atari_Home_Computer_Technical_Reference_Notes_1982.pdf). Local: architect-assets/S257. https://www.bitsavers.org/pdf/atari/400_800/CO16555_Atari_Home_Computer_Technical_Reference_Notes_1982.pdf.
- **S258** [Atari 400/800 Field Service Manual (May 1983), Fig. 2-8, 800 power supply schematic, peripheral jack J204](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n50). Local: architect-assets/S258. https://dn710900.ca.archive.org/0/items/atari400800fieldservicemanualmay1983/Atari%20400-800%20Field%20Service%20Manual%2C%20May%201983_text.pdf.
- **S259** [Atari 8-Bit FAQ 1.14, connector pinouts (Atarimania), SIO](https://www.atarimania.com/faq-atari-400-800-xl-xe-what-are-the-pinouts-for-the-various-connectors-on-the-atari_16.html). Local: architect-assets/S259. https://www.atarimania.com/machines/atari-400-800-xl-xe/faq/16.
- **S260** [Atari 400/800 Field Service Manual (May 1983), Fig. 2-6A, 800 motherboard schematic, J108/J109, p. 2-10](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n47). Local: architect-assets/S260. https://dn710900.ca.archive.org/0/items/atari400800fieldservicemanualmay1983/Atari%20400-800%20Field%20Service%20Manual%2C%20May%201983_text.pdf.
- **S261** [Atari 600XL Field Service Manual Rev. 1, Fig. 1-11, cartridge connector pin assignments (letters CONSOLE TOP, numbers CONSOLE BOTTOM), p. 1-14](https://archive.org/details/Atari600XLComputerFieldServiceManualRev1/page/n23). Local: architect-assets/S261. https://dn710107.ca.archive.org/0/items/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf.
- **S262** [Atari 400/800 Field Service Manual (May 1983), Power Supply, p. 1-6](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n18). Local: architect-assets/S262. https://dn710900.ca.archive.org/0/items/atari400800fieldservicemanualmay1983/Atari%20400-800%20Field%20Service%20Manual%2C%20May%201983_text.pdf.
- **S263** [Atari 400/800 Field Service Manual (May 1983), Fig. 2-4, 400 power supply schematic, p. 2-8](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n45). Local: architect-assets/S263. https://dn710900.ca.archive.org/0/items/atari400800fieldservicemanualmay1983/Atari%20400-800%20Field%20Service%20Manual%2C%20May%201983_text.pdf.
- **S264** [Atari 600XL Field Service Manual Rev. 1, Fig. 1-9, SIO connector pin assignments, p. 1-12](https://archive.org/details/Atari600XLComputerFieldServiceManualRev1/page/n21). Local: architect-assets/S264. https://dn710107.ca.archive.org/0/items/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf.
- **S265** [Atari 600XL Field Service Manual Rev. 1, Fig. 1-10, controller jack pin assignments, p. 1-13](https://archive.org/details/Atari600XLComputerFieldServiceManualRev1/page/n22). Local: architect-assets/S265. https://dn710107.ca.archive.org/0/items/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf.
- **S266** [Atari 600XL Field Service Manual Rev. 1, Fig. 1-12, PBI connector pin assignments, p. 1-16](https://archive.org/details/Atari600XLComputerFieldServiceManualRev1/page/n25). Local: architect-assets/S266. https://dn710107.ca.archive.org/0/items/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf.
- **S267** [Atari 600XL Field Service Manual Rev. 1, Fig. 1-8, power supply pin assignments, p. 1-10](https://archive.org/details/Atari600XLComputerFieldServiceManualRev1/page/n19). Local: architect-assets/S267. https://dn760106.eu.archive.org/0/items/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf.
- **S268** [Atari 800XL Field Service Manual Rev. 01 (Feb 1984), Fig. 1-9, SIO connector pin assignments, p. 1-12](https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n19). Local: architect-assets/S268. https://dn720606.ca.archive.org/0/items/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf.
- **S269** [Atari 800XL Field Service Manual Rev. 01 (Feb 1984), Fig. 1-10, controller jack pin assignments, p. 1-13](https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n20). Local: architect-assets/S269. https://dn720606.ca.archive.org/0/items/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf.
- **S270** [Sams Computerfacts CC11, Atari 800XL (1985), schematic pp. 27-29, J2: 1 comp. lum., 2 ground, 3 audio, 4 comp. video, 5 NC](https://archive.org/details/atari800xlsamscomputerfactstechnicalservice/page/n24). Local: architect-assets/S270. https://dn721306.ca.archive.org/0/items/atari800xlsamscomputerfactstechnicalservice/Atari_800XL_Sams_Computerfacts_Technical_Service_text.pdf.
- **S271** [Atari 800XL Field Service Manual Rev. 01 (Feb 1984), Fig. 1-11, cartridge connector pin assignments, p. 1-14](https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n21). Local: architect-assets/S271. https://dn720606.ca.archive.org/0/items/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf.
- **S272** [Atari 800XL Field Service Manual Rev. 01 (Feb 1984), Fig. 1-12, PBI connector pin assignments, p. 1-15](https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n22). Local: architect-assets/S272. https://dn720606.ca.archive.org/0/items/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf.
- **S273** [Atari 800XL Field Service Manual Rev. 01 (Feb 1984), Fig. 1-8, power supply pin assignments, p. 1-11](https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n18). Local: architect-assets/S273. https://dn720606.ca.archive.org/0/items/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf.
- **S274** [Sams Computerfacts CC16, Atari 130XE (1986), IC pinouts and terminal guides, J1 front view](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n6). Local: architect-assets/S274. https://ia800706.us.archive.org/31/items/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/Sams%20Computerfacts%20Technical%20Service%20Data%20-%20Atari%20Model%20130XE%20Computer%20%281986%29%28Sams%29_text.pdf.
- **S275** [Sams Computerfacts CC16, Atari 130XE (1986), schematic, J1 with +4.9 V READY](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n1). Local: architect-assets/S275. https://dn760106.eu.archive.org/0/items/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/Sams%20Computerfacts%20Technical%20Service%20Data%20-%20Atari%20Model%20130XE%20Computer%20%281986%29%28Sams%29_text.pdf.
- **S276** [Sams Computerfacts CC16, Atari 130XE (1986), schematic, joystick jacks J5 (No. 2) and J6 (No. 1), +4.9 V](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n3). Local: architect-assets/S276. https://dn760106.eu.archive.org/0/items/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/Sams%20Computerfacts%20Technical%20Service%20Data%20-%20Atari%20Model%20130XE%20Computer%20%281986%29%28Sams%29_text.pdf.
- **S277** [Deathskull Labs, "Power Supply Info", ColecoVision entry (secondary)](https://arcarc.xmission.com/Web%20Archives/Deathskull%20(May-2006)/games/tech/power.html). Local: architect-assets/S277. https://arcarc.xmission.com/Web%20Archives/Deathskull%20(May-2006)/games/tech/power.html.
- **S278** [colecovision.dk, console power connector photo (rear, with wire colours)](https://www.colecovision.dk/images/cv-power-connector-big.jpg). Local: architect-assets/S278. https://www.colecovision.dk/images/cv-power-connector-big.jpg.
- **S279** [Coleco ADAM Technical Reference Manual (preliminary), section 2.1.9e, J1 cartridge connector](https://colecovisionadam.com/Coleco/adam/Documents/Manual/Coleco_ADAM_Technical_Reference_Manual.pdf). Local: architect-assets/S279. https://www.colecovisionadam.com/Coleco/adam/Documents/Manual/Coleco_ADAM_Technical_Reference_Manual.pdf.
- **S280** [Deathskull Labs, "ColecoVision Controller Port" (J. Tilton, 1998; secondary)](https://arcarc.xmission.com/Web%20Archives/Deathskull%20(May-2006)/games/tech/cvcont.html). Local: architect-assets/S280. https://arcarc.xmission.com/Web%20Archives/Deathskull%20(May-2006)/games/tech/cvcont.html.
- **S281** [AdamArchive, ADAM Universal Serial-Parallel Interface Analysis v1.0, section 6 (RJ12 is the ADAMnet norm; secondary)](https://adamarchive.org/archive/Technical/ADAM%20Hardware/ADAM%20-%20Universal%20Serial-Parallel%20Interface%20Analysis%20v1.0.pdf). Local: architect-assets/S281. https://adamarchive.org/archive/Technical/ADAM%20Hardware/ADAM%20-%20Universal%20Serial-Parallel%20Interface%20Analysis%20v1.0.pdf.
- **S282** [Hackaday.io ADAM+ project log "ADAM keyboard" (cable is 6P6C; secondary)](https://hackaday.io/project/186178-adam/log/208185-adam-keyboard). Local: architect-assets/S282. https://hackaday.io/project/186178-adam/log/208185-adam-keyboard.
- **S283** [SUM v4 n1 (Jan 1986) p. 5, 2068 power supply: make it cooler and quieter (outer contact positive)](https://archive.org/details/SinclairTimexUsersMagazine/SUM%20v4%20n1/page/n4). Local: architect-assets/S283. https://dn790003.ca.archive.org/0/items/SinclairTimexUsersMagazine/SUM%20v3%20n1_text.pdf.
- **S284** [Timex Technical Memo #6, TS2068 Connector Pinouts, SYNTAX v5 n1 (Jan 1984) p. 8-9](https://archive.org/details/SyntaxMagazine/Syntax%20v5n1/page/n7). Local: architect-assets/S284. https://ia600806.us.archive.org/0/items/SyntaxMagazine/Syntax%20CT%20User%20Groups_text.pdf.
- **S285** [Sams ComputerFacts TI-99/4A, parts list: T1 26.40 V AC tapped at 17.85 V AC](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/computerfacts/Sams%20TI994A%20ComputerFacts.pdf). Local: architect-assets/S285. https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/computerfacts/Sams%20TI994A%20ComputerFacts.pdf.
- **S286** [Color Computer Technical Reference Manual, Table 5 Cartridge Connector Signals, p. 36](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf). Local: architect-assets/S286. https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf.
- **S287** [pinouts.ru, CoCo cassette (second source)](https://old.pinouts.ru/HD/CassetteCoCo_pinout.shtml). Local: architect-assets/S287. https://old.pinouts.ru/HD/CassetteCoCo_pinout.shtml.
- **S288** [Color Computer Technical Bulletin CC:2, AC line cord termination](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Bulletins%20(Tandy).pdf). Local: architect-assets/S288. https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Bulletins%20(Tandy).pdf.
- **S289** [Sams CC13 Color Computer (26-3002), Troubleshooting, Power Supply (connector E readings), PDF p. 17](https://archive.org/details/Sams_Computerfacts_Color_Computer_1986_Howard_Sams/page/n16). Local: architect-assets/S289. https://dn760107.eu.archive.org/0/items/Sams_Computerfacts_Color_Computer_1986_Howard_Sams/Sams_Computerfacts_Color_Computer_1986_Howard_Sams_text.pdf.
- **S290** [pinouts.ru, CM-8 / CoCo RGB (second source)](https://old.pinouts.ru/Video/Cm8CoCoRGB_pinout.shtml). Local: architect-assets/S290. https://old.pinouts.ru/Video/Cm8CoCoRGB_pinout.shtml.
- **S291** [TRS-80 Technical Reference Handbook, Pin Connections for Expansion-Port Edge Card, Figure 22, p. 91](https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf). Local: architect-assets/S291. https://ia803207.us.archive.org/33/items/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf.
- **S292** [TRS-80 Technical Reference Handbook, Figure 22, p. 91 (same scan, text-layer mirror)](https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack_text.pdf). Local: architect-assets/S292. https://ia803207.us.archive.org/33/items/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack_text.pdf.
- **S293** [trs-80.org, Gold Plug 80 (tin-plated Model I edge connectors oxidise; second source)](https://www.trs-80.org/gold-plug-80.html). Local: architect-assets/S293. https://www.trs-80.org/gold-plug-80.html.
- **S294** [Sams CSCS3 TRS-80 Model I, Troubleshooting, Power Supply (J1A readings), PDF p. 18](https://archive.org/details/Sams_ComputerFacts_Model_I_1985_Howard_Sams/page/n17). Local: architect-assets/S294. https://dn711208.ca.archive.org/0/items/Sams_ComputerFacts_Model_I_1985_Howard_Sams/Sams_ComputerFacts_Model_I_1985_Howard_Sams_text.pdf.
- **S295** [trs-80.org, The Radio Shack Expansion Interface (cable history; second source)](https://www.trs-80.org/radio-shack-expansion-interface.html). Local: architect-assets/S295. https://www.trs-80.org/radio-shack-expansion-interface.html.
- **S296** [Model 4/4P Technical Reference Manual, Model 4 Gate Array I/O pin assignments (same 50-pin bus), p. 53](https://archive.org/download/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation.pdf). Local: architect-assets/S296. https://ia803207.us.archive.org/20/items/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation.pdf.
- **S297** [Model III Service Manual, Power Supply Functional Specifications (SK1-SK4 pinout), p. 67](https://archive.org/download/Model_III_Microcomputer_Service_Manual_19xx_Tandy/Model_III_Microcomputer_Service_Manual_19xx_Tandy.pdf). Local: architect-assets/S297. https://dn760108.eu.archive.org/0/items/Model_III_Microcomputer_Service_Manual_19xx_Tandy/Model_III_Microcomputer_Service_Manual_19xx_Tandy.pdf.
- **S298** [Sams Computerfacts TRS-80 Model III, Preliminary Service Checks (SK2 voltages)](https://archive.org/download/Sams_Computerfacts_TRS-80_Model_III_1985_Howard_Sams/Sams_Computerfacts_TRS-80_Model_III_1985_Howard_Sams.pdf). Local: architect-assets/S298. https://dn790002.ca.archive.org/0/items/Sams_Computerfacts_TRS-80_Model_III_1985_Howard_Sams/Sams_Computerfacts_TRS-80_Model_III_1985_Howard_Sams.pdf.
- **S299** [Model 4 Technical Reference Manual (1983), 3.1.12 I/O Connectors (J2), p. 21](https://archive.org/download/model-4-technical-reference-manual/Model%204%20Technical%20Reference%20Manual%20(1983)(Tandy%20Corporation)(pdf).pdf). Local: architect-assets/S299. https://dn720003.ca.archive.org/0/items/model-4-technical-reference-manual/Model%204%20Technical%20Reference%20Manual%20(1983)(Tandy%20Corporation)(pdf).pdf.
- **S300** [ET-18 Block Interconnect Diagram, charger and power supply corner (archive.org)](https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Block%20Interconnect%20Diagram.pdf). Local: architect-assets/S300. https://ia601603.us.archive.org/7/items/heathkit-hero-1-ET-18/ET-18%20Robot%20Block%20Interconnect%20Diagram.pdf.
- **S301** [HERO Robot FAQ 3.8, Hero-1 charger plug wiring (second source)](https://www.hero.dsavage.net/robots/Hero_FAQ.html). Local: architect-assets/S301. https://www.hero.dsavage.net/robots/Hero_FAQ.html.
- **S302** [ET-18 Schematics sheet 3 of 4, power supply circuit board (archive.org)](https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Schematics%20sheet%203%20of%204%20%28io%2C%20main%20drive%2C%20power%20supply%29.pdf). Local: architect-assets/S302. https://ia601603.us.archive.org/7/items/heathkit-hero-1-ET-18/ET-18%20Schematics%20sheet%203%20of%204%20%28io%2C%20main%20drive%2C%20power%20supply%29.pdf.
- **S303** [ET-18 Technical Manual, charger regulating and low voltage sense circuits, printed pp. 72-73 (archive.org)](https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf). Local: architect-assets/S303. https://ia601603.us.archive.org/7/items/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf.
- **S304** [HERO 1 Advanced Programming and Interfacing, Table 6-2, p. 97 (archive.org)](https://archive.org/details/hero1advancedpro0000robi/page/97). Local: architect-assets/S304. https://dn720302.ca.archive.org/0/items/hero1advancedpro0000robi/hero1advancedpro0000robi_encrypted.pdf.
- **S305** [ET-18 Schematics sheet 4 of 4, display circuit board (archive.org)](https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Schematics%20sheet%204%20of%204%20%28display%2C%20motion%29.pdf). Local: architect-assets/S305. https://ia601603.us.archive.org/7/items/heathkit-hero-1-ET-18/ET-18%20Schematics%20sheet%204%20of%204%20%28display%2C%20motion%29.pdf.
- **S306** [HERO 1 Advanced Programming and Interfacing, Table 6-4, p. 99 (archive.org)](https://archive.org/details/hero1advancedpro0000robi/page/99). Local: architect-assets/S306. https://dn720302.ca.archive.org/0/items/hero1advancedpro0000robi/hero1advancedpro0000robi_encrypted.pdf.
- **S307** [HERO 1 Advanced Programming and Interfacing, Table 6-5, p. 100 (archive.org)](https://archive.org/details/hero1advancedpro0000robi/page/100). Local: architect-assets/S307. https://dn720302.ca.archive.org/0/items/hero1advancedpro0000robi/hero1advancedpro0000robi_encrypted.pdf.
- **S308** [HERO 1 Advanced Programming and Interfacing, Table 6-6, p. 101 (archive.org)](https://archive.org/details/hero1advancedpro0000robi/page/101). Local: architect-assets/S308. https://dn720302.ca.archive.org/0/items/hero1advancedpro0000robi/hero1advancedpro0000robi_encrypted.pdf.
- **S309** [HERO 1 Advanced Programming and Interfacing, Table 6-17, p. 103 (archive.org)](https://archive.org/details/hero1advancedpro0000robi/page/103). Local: architect-assets/S309. https://dn720302.ca.archive.org/0/items/hero1advancedpro0000robi/hero1advancedpro0000robi_encrypted.pdf.
- **S310** [HERO 1 Advanced Programming and Interfacing, Table 6-11, p. 102 (archive.org)](https://archive.org/details/hero1advancedpro0000robi/page/102). Local: architect-assets/S310. https://dn720302.ca.archive.org/0/items/hero1advancedpro0000robi/hero1advancedpro0000robi_encrypted.pdf.
- **S311** [HERO 1 Advanced Programming and Interfacing, Table 6-21, p. 104 (archive.org)](https://archive.org/details/hero1advancedpro0000robi/page/104). Local: architect-assets/S311. https://dn720302.ca.archive.org/0/items/hero1advancedpro0000robi/hero1advancedpro0000robi_encrypted.pdf.
- **S312** [ET-18 Illustration Booklet, Speech Accessory Board sheets 2-3, schematic (archive.org)](https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Illustration%20Booklet%20-%20Speech%20Accessory%20Board%20sheet%202-3.pdf). Local: architect-assets/S312. https://ia601603.us.archive.org/7/items/heathkit-hero-1-ET-18/ET-18%20Robot%20Illustration%20Booklet%20-%20Speech%20Accessory%20Board%20sheet%202-3.pdf.
- **S313** [HERO Jr Schematics 595-3271, sheet 1 interconnect (archive.org)](https://archive.org/download/hero-jr-schematics/HeroJr%20595-3271%20Schematics.pdf). Local: architect-assets/S313. https://ia601803.us.archive.org/18/items/hero-jr-schematics/HeroJr%20595-3271%20Schematics.pdf.
- **S314** [HERO Jr Technical Manual, battery charger, printed p. 19 (archive.org)](https://archive.org/download/hero-jr-technical/HeroJr%20595-3271%20Technical.pdf). Local: architect-assets/S314. https://dn721208.ca.archive.org/0/items/hero-jr-technical/HeroJr%20595-3271%20Technical.pdf.
- **S315** [HERO Jr RS-232 Accessory manual, Detail 2-3D, printed p. 7 (archive.org)](https://archive.org/download/hero-jr-rs-232/HeroJr%20RS232.pdf). Local: architect-assets/S315. https://dn721301.ca.archive.org/0/items/hero-jr-rs-232/HeroJr%20RS232.pdf.
- **S316** [HERO 2000 ET-19 Schematic Diagrams 595-3416, p. 6, backplane board (archive.org)](https://archive.org/download/heathkit-hero-2000-et-19-schematic-diagrams-595-3416/heathkit-hero-2000-et-19-schematic-diagrams-595-3416.pdf). Local: architect-assets/S316. https://dn710305.ca.archive.org/0/items/heathkit-hero-2000-et-19-schematic-diagrams-595-3416/heathkit-hero-2000-et-19-schematic-diagrams-595-3416.pdf.
- **S317** [minuszerodegrees.net, 5150/5160 bench-top supply wiring (P8 pin 2 unused)](https://minuszerodegrees.net/5150_5160/psu/IBM%205150%205160%20-%20Use%20of%20a%20bench%20top%20power%20supply%20for%20crude%20testing.png). Local: architect-assets/S317. https://minuszerodegrees.net/5150_5160/psu/IBM%205150%205160%20-%20Use%20of%20a%20bench%20top%20power%20supply%20for%20crude%20testing.png.
- **S318** [IBM PCjr Hardware Maintenance and Service (Sep 1983), power transformer check (pin 1 to pin 3, 15.0 to 30.0 V AC), p. 3-020-8](https://minuszerodegrees.net/manuals/IBM/IBM%204860%20(PCjr)%20-%20Hardware%20Maintenance%20and%20Service%20-%20SEP83.pdf). Local: architect-assets/S318. https://minuszerodegrees.net/manuals/IBM/IBM%204860%20(PCjr)%20-%20Hardware%20Maintenance%20and%20Service%20-%20SEP83.pdf.
- **S319** [Amstrad CPC464 User Manual (transcribed edition), Appendix V, rear panel (5V DC socket)](https://archive.org/details/cpc464.en/page/n234). Local: architect-assets/S319. https://dn790003.ca.archive.org/0/items/cpc464.en/cpc464.en.pdf.
- **S320** [Amstrad CPC6128 / CTM644 / GT65 Service Manual, cassette control circuit diagram p. 36](https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n28). Local: architect-assets/S320. https://dn760100.eu.archive.org/0/items/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/Amstrad_CPC6128_Micro_Computer_CTM644_Color_Monitor_GT65_Green_Monitor_Service_Manual_text.pdf.
- **S321** [CPCWiki, Connector:Monitor (archived copy)](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Monitor). Local: architect-assets/S321. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S322** [Amstrad CPC6128 User Instructions, ch. 7 part 9, Joystick Socket drawing, p. 38](https://archive.org/details/amstrad-cpc-6128-user-manual/page/n348). Local: architect-assets/S322. https://dn721903.ca.archive.org/0/items/amstrad-cpc-6128-user-manual/AMSTRAD-CPC-6128-User-Manual.pdf.
- **S323** [Amstrad CPC6128 User Instructions, ch. 7 part 9, Expansion Socket drawing, p. 40](https://archive.org/details/amstrad-cpc-6128-user-manual/page/n350). Local: architect-assets/S323. https://ia801600.us.archive.org/11/items/amstrad-cpc-6128-user-manual/AMSTRAD-CPC-6128-User-Manual.pdf.
- **S324** [CPCWiki, Connector:Expansion port (archived copy)](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Expansion_port). Local: architect-assets/S324. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S325** [Amstrad CPC6128 User Instructions, ch. 7 part 9, Printer Port drawing, p. 41](https://archive.org/details/amstrad-cpc-6128-user-manual/page/n351). Local: architect-assets/S325. https://dn721903.ca.archive.org/0/items/amstrad-cpc-6128-user-manual/AMSTRAD-CPC-6128-User-Manual.pdf.
- **S326** [CPCWiki, Connector:Printer port (archived copy)](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Printer_port). Local: architect-assets/S326. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S327** [Amstrad CPC6128 User Instructions, ch. 7 part 9, Stereo Socket, p. 39](https://archive.org/details/amstrad-cpc-6128-user-manual/page/n349). Local: architect-assets/S327. https://dn721903.ca.archive.org/0/items/amstrad-cpc-6128-user-manual/AMSTRAD-CPC-6128-User-Manual.pdf.
- **S328** [Amstrad CPC664 User Instructions, ch. 1 Connecting the computer, p. 2](https://archive.org/details/amstrad-cpc664-user-manual/page/n12). Local: architect-assets/S328. https://dn710209.ca.archive.org/0/items/amstrad-cpc664-user-manual/AMSTRAD-CPC664-User-Manual.pdf.
- **S329** [Amstrad CPC6128 / CTM644 / GT65 Service Manual, technical specification, back page](https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n30). Local: architect-assets/S329. https://dn790003.ca.archive.org/0/items/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/Amstrad_CPC6128_Micro_Computer_CTM644_Color_Monitor_GT65_Green_Monitor_Service_Manual_text.pdf.
- **S330** [Amstrad CPC664 User Instructions, ch. 7 part 9 Connections, p. 38-41](https://archive.org/details/amstrad-cpc664-user-manual/page/n302). Local: architect-assets/S330. https://dn710209.ca.archive.org/0/items/amstrad-cpc664-user-manual/AMSTRAD-CPC664-User-Manual.pdf.
- **S331** [Amstrad CPC664 Service Manual, CPC664 CPU circuit diagram](https://archive.org/details/amstrad-cpc-664-service-manual/page/n16). Local: architect-assets/S331. https://dn760105.eu.archive.org/0/items/amstrad-cpc-664-service-manual/Amstrad%20CPC664%20Service%20Manual_text.pdf.
- **S332** [Amstrad CPC664 User Instructions, ch. 7 part 9, Disc Drive 2 Socket, p. 40](https://archive.org/details/amstrad-cpc664-user-manual/page/n304). Local: architect-assets/S332. https://dn760103.eu.archive.org/0/items/amstrad-cpc664-user-manual/AMSTRAD-CPC664-User-Manual.pdf.
- **S333** [Amstrad CPC664 User Instructions, ch. 7 part 9, Tape Socket, p. 39](https://archive.org/details/amstrad-cpc664-user-manual/page/n303). Local: architect-assets/S333. https://dn710209.ca.archive.org/0/items/amstrad-cpc664-user-manual/AMSTRAD-CPC664-User-Manual.pdf.
- **S334** [Amstrad CPC6128 User Instructions, ch. 1 Connecting the computer, p. 2](https://archive.org/details/amstrad-cpc-6128-user-manual/page/n14). Local: architect-assets/S334. https://dn721903.ca.archive.org/0/items/amstrad-cpc-6128-user-manual/AMSTRAD-CPC-6128-User-Manual.pdf.
- **S335** [BBC Microcomputer Service Manual, 3.4 RGB + PAL encoder + UHF output](https://acorn.huininga.nl/pub/unsorted/manuals/BBC%20Microcomputer%20Service%20Manual-HTML/BBCServiceManual.html). Local: architect-assets/S335. https://acorn.huininga.nl/pub/unsorted/manuals/BBC%20Microcomputer%20Service%20Manual-HTML/BBCServiceManual.html.
- **S336** [BBC Microcomputer System User Guide (1984), serial printer connections, p. 376](https://rk.nvg.ntnu.no/bbc/doc/BBCUserGuide-1.00.pdf). Local: architect-assets/S336. https://rk.nvg.ntnu.no/bbc/doc/BBCUserGuide-1.00.pdf.
- **S337** [Advanced User Guide, ch. 26 (ADC, joystick connections)](https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html). Local: architect-assets/S337. https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html.
- **S338** [RetroTechWiki, BBC Micro Model A/B capacitor guide (lead colours, linear supply)](https://retrotechwiki.com/BBC_Micro_Model_A/B_Capacitor_Replacement_Guide). Local: architect-assets/S338. https://retrotechwiki.com/BBC_Micro_Model_A/B_Capacitor_Replacement_Guide.
- **S339** [Master main PCB circuit diagram 0143,000 sheet 1, SK3/SK4 cartridge](https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf). Local: architect-assets/S339. https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf.
- **S340** [Master Reference Manual Part 1, F.5 links LK12, LK21](https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf). Local: architect-assets/S340. https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf.
- **S341** [linuxjedi.co.uk, Restoring a BBC Master 128 part 1 (leaked pack)](https://linuxjedi.co.uk/restoring-a-bbc-master-128-part-1/). Local: architect-assets/S341. https://linuxjedi.co.uk/restoring-a-bbc-master-128-part-1/.
- **S342** [Dragon 32 Information for Machine Code Users, Joystick controllers, p. 2](https://dragondata.worldofdragon.org/Publications/Info_for_mc_users/Info_For_Machine_Code_Users_original.pdf). Local: architect-assets/S342. http://dragondata.co.uk/Publications/Info_for_mc_users/Info_For_Machine_Code_Users_original.pdf.
- **S343** [Dragon Data Service Information RWEW/KA/0080a, Cassette faults](https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf). Local: architect-assets/S343. http://dragondata.co.uk/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf.
- **S344** [Dragon 32 Additional Information leaflet, Printer pin table, p. 3](https://dragondata.worldofdragon.org/Publications/BASIC-MAN/d32-add-info.pdf). Local: architect-assets/S344. http://dragondata.co.uk/Publications/BASIC-MAN/d32-add-info.pdf.
- **S345** [World of Dragon forum, Printer options (photo of the 20-way IDC cable; second source)](https://archive.worldofdragon.org/phpBB3/viewtopic.php?p=13200). Local: architect-assets/S345. https://archive.worldofdragon.org/phpBB3/viewtopic.php?p=13200.
- **S346** [Dragon 32 PSU diagram SA2121 (PL11), in the SA2120 Mk II set (zip)](https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA2120-D32-Cricuit-Diagram-MKII.zip). Local: architect-assets/S346. http://dragondata.co.uk/tech/circuit-diag/D32/SA2120-D32-Cricuit-Diagram-MKII.zip.
- **S347** [Dragon 32 PSU and modulator sheet (GIF scan)](https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21204-PSU-MOD.gif). Local: architect-assets/S347. http://dragondata.co.uk/tech/circuit-diag/D32/SA/D32-SA21204-PSU-MOD.gif.
- **S348** [Dragon 64 power supply CD41519 (PL11, 5 pin DIN front view)](https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D644-psu-pal-cleaned.gif). Local: architect-assets/S348. http://dragondata.co.uk/tech/circuit-diag/D64/D644-psu-pal-cleaned.gif.
- **S349** [Dragon Data repair notes, CPU and PSU modifications and compatibility (modulator types), pp. 6-9](https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32-Internal-repair-notes.pdf). Local: architect-assets/S349. http://dragondata.co.uk/tech/internal-repair-docs/Dragon-Data-Dragon_32-Internal-repair-notes.pdf.
- **S350** [The Dragon Archive wiki, PSU Pictures: transformer labels (Ref. 28475: Sec. I 8.5 V 1.5 A, Sec. II 14/28 V 0.25 A; CT type: A 8 V 1.5 A, B 28 V 250 mA) and the 9-way D plug](https://archive.worldofdragon.org/index.php?title=PSU_Pictures). Local: architect-assets/S350. https://archive.worldofdragon.org/index.php?title=PSU_Pictures.
- **S351** [Dragon 32 BASIC manual, rear-panel key (power pack socket, mains power unit)](https://dragondata.worldofdragon.org/Publications/BASIC-MAN/DRAGON_32_BASIC_MANUAL_rel-v2.pdf). Local: architect-assets/S351. http://dragondata.co.uk/Publications/BASIC-MAN/DRAGON_32_BASIC_MANUAL_rel-v2.pdf.
- **S352** [Dragon 32 circuit diagram SA2120 sheet 3 (PL6)](https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21203-vid-sound.gif). Local: architect-assets/S352. http://dragondata.co.uk/tech/circuit-diag/D32/SA/D32-SA21203-vid-sound.gif.
- **S353** [The Dragon Archive wiki, Keyboard (matrix table from Inside the Dragon)](https://archive.worldofdragon.org/index.php?title=Keyboard). Local: architect-assets/S353. https://archive.worldofdragon.org/index.php?title=Keyboard.
- **S354** [Dragon 64 CPU 64K (PAL) CD41505 sheet 1 (I/O), PL7 expansion connector](https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D641-io-pal.gif). Local: architect-assets/S354. http://dragondata.co.uk/tech/circuit-diag/D64/D641-io-pal.gif.
- **S355** [Dragon 64 Supplement, Pin-out of Dragon 64 RS232 connector, p. 8](https://dragondata.worldofdragon.org/Publications/BASIC-MAN/DD_D64_Supplement.pdf). Local: architect-assets/S355. http://dragondata.co.uk/Publications/BASIC-MAN/DD_D64_Supplement.pdf.
- **S356** [Dragon 64 CD41505 sheet 3 (PL8 RS-232 interface, 7 way DIN; IC11 SY6551)](https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D643-vid-sound-rs232.gif). Local: architect-assets/S356. http://dragondata.co.uk/tech/circuit-diag/D64/D643-vid-sound-rs232.gif.
- **S357** [The Dragon Archive wiki, Dragon 64 (Tano version)](https://archive.worldofdragon.org/index.php?title=Dragon_64). Local: architect-assets/S357. https://archive.worldofdragon.org/index.php?title=Dragon_64.
- **S358** [MSX Technical Data Book (ASCII, 1984), 1.5.2 Cartridge Bus, list of signal pins, p. 32-33](https://archive.org/details/MSXTechnicalDataBook/page/n34). Local: architect-assets/S358. https://ia600106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S359** [MSX Technical Data Book (ASCII, 1984), 1.5.4 Cartridge Power Capacity, p. 34](https://archive.org/details/MSXTechnicalDataBook/page/n36). Local: architect-assets/S359. https://ia600106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S360** [MSX Technical Data Book (ASCII, 1984), 1.4.5 Peripheral I/O Port(s), list of pins, p. 25](https://archive.org/details/MSXTechnicalDataBook/page/n27). Local: architect-assets/S360. https://ia800106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S361** [MSX Technical Data Book (ASCII, 1984), 1.4.5 circuit diagram, p. 26](https://archive.org/details/MSXTechnicalDataBook/page/n28). Local: architect-assets/S361. https://ia800106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S362** [MSX Technical Data Book (ASCII, 1984), 1.7.12 PSG Bit Assignments, p. 44](https://archive.org/details/MSXTechnicalDataBook/page/n46). Local: architect-assets/S362. https://ia800106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S363** [MSX Resource Center wiki, General Purpose port (second source)](https://www.msx.org/wiki/General_Purpose_port). Local: architect-assets/S363. https://www.msx.org/wiki/General_Purpose_port.
- **S364** [MSX Technical Data Book (ASCII, 1984), 1.4.1 Cassette Interface, p. 15-17](https://archive.org/details/MSXTechnicalDataBook/page/n17). Local: architect-assets/S364. https://ia600106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S365** [MSX Technical Data Book (ASCII, 1984), 1.4.1 table of signal pins, p. 16](https://archive.org/details/MSXTechnicalDataBook/page/n18). Local: architect-assets/S365. https://ia600106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S366** [MSX Technical Data Book (ASCII, 1984), 1.7.11 8255 (PPI) Bit Assignments, p. 43](https://archive.org/details/MSXTechnicalDataBook/page/n45). Local: architect-assets/S366. https://ia800106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S367** [MSX Technical Data Book (ASCII, 1984), 1.4.3 Printer Interface, p. 19](https://archive.org/details/MSXTechnicalDataBook/page/n21). Local: architect-assets/S367. https://ia600106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S368** [MSX Technical Data Book (ASCII, 1984), 1.7.3 Printer Port, p. 41](https://archive.org/details/MSXTechnicalDataBook/page/n43). Local: architect-assets/S368. https://ia600106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S369** [MSX Resource Center wiki, Printer port (second source)](https://www.msx.org/wiki/Printer_port). Local: architect-assets/S369. https://www.msx.org/wiki/Printer_port.
- **S370** [MSX Technical Data Book (ASCII, 1984), 1.4.8 Connectors, p. 29](https://archive.org/details/MSXTechnicalDataBook/page/n31). Local: architect-assets/S370. https://ia600106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S371** [MSX Technical Data Book (ASCII, 1984), 1.3.6 Sound, p. 14](https://archive.org/details/MSXTechnicalDataBook/page/n16). Local: architect-assets/S371. https://ia600106.us.archive.org/29/items/MSXTechnicalDataBook/MSX%20Technical%20Data%20Book_text.pdf.
- **S372** [Oric-1 48K circuit diagram, Oric Products International, issue 7 (24-2-84), sheet 1: CPU, ULA, VIA, AY, PSU, video, cassette, printer, keyboard (Defence Force wiki, archived)](https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-1s.gif). Local: architect-assets/S372. HTTP Error 429: Too Many Requests.
- **S373** [Oric Owner issue 5, circuit diagram pull-out (Oric-1, earlier issue, sharper scan), p. 44](https://library.defence-force.org/books/content/oric_owner/OricOwner_05.pdf). Local: architect-assets/S373. https://library.defence-force.com/books/content/oric_owner/OricOwner_05.pdf.
- **S374** [Oric Atmos manual (Oric Products International), Appendix 11, p. 284](https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf). Local: architect-assets/S374. https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf.
- **S375** [Defence Force Oric wiki, expansion board signals (archived copy)](https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board). Local: architect-assets/S375. HTTP Error 429: Too Many Requests.
- **S376** [Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)](https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf). Local: architect-assets/S376. https://library.defence-force.com/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf.
- **S377** [Mike Brown, Quick User Guide for the Oric Diagnostic ROM v1.08k (signal11)](https://oric.signal11.org.uk/files/pub/diag-rom/OricDiagROM1-08.pdf). Local: architect-assets/S377. https://oric.signal11.org.uk/files/pub/diag-rom/OricDiagROM1-08.pdf.
- **S378** [Oric-1 BASIC Programming Manual (John Scriven, 1983), ch. 11 Saving programs on tape, p. 105-107](https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/oric1manual.pdf). Local: architect-assets/S378. https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/oric1manual.pdf.
- **S379** [Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0 (signal11)](https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf). Local: architect-assets/S379. https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf.
- **S380** [Defence Force Oric wiki, Oric keyboard matrix (archived copy)](https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:oric_keyboard). Local: architect-assets/S380. HTTP Error 429: Too Many Requests.
- **S381** [Sams CC8 Commodore 16, Service checks, power supply check (A), PDF p. 4](https://archive.org/details/SAMS_Computerfacts_CC8_Commodore_16/page/n3). Local: architect-assets/S381. https://ia903203.us.archive.org/1/items/SAMS_Computerfacts_CC8_Commodore_16/SAMS_Computerfacts_CC8_Commodore_16.pdf.
- **S382** [Sams CC8 Commodore 16, schematic (U10 556 timer, SW2 reset), PDF p. 10](https://archive.org/details/SAMS_Computerfacts_CC8_Commodore_16/page/n9). Local: architect-assets/S382. https://ia903203.us.archive.org/1/items/SAMS_Computerfacts_CC8_Commodore_16/SAMS_Computerfacts_CC8_Commodore_16.pdf.
- **S383** [TI µA7800 series data sheet SLVS056P, 7.5 uA7805 electrical characteristics: rated for 7 V to 20 V in; dropout 2 V typical at 1 A, p. 6](https://www.ti.com/lit/ds/symlink/ua78.pdf). Local: architect-assets/S383. https://www.ti.com/lit/ds/symlink/ua78.pdf.
- **S384** [Sams CC17 C64 (1984 version), Power supply check (A, B), PDF p. 4](https://archive.org/details/sams-computerfacts-cc17-c64-1984-version/page/n3). Local: architect-assets/S384. https://dn720805.ca.archive.org/0/items/sams-computerfacts-cc17-c64-1984-version/SamsComputerfacts_Cc17_C641984Version.pdf.
- **S385** [Ray Carlsen, C64 Blank Screen (c64blank.txt)](https://portcommodore.com/rcarlsen/cbm/c64/c64blank.txt). Local: architect-assets/S385. HTTP Error 406: Not Acceptable.
- **S386** [C64C schematic 250469 rev. A (zimmers.net PDF), notes 3 and 4: Y1 and dot clock for NTSC and PAL; 8701 pins 6, 8, 13, 14](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/250469-rev.A.pdf). Local: architect-assets/S386. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/250469-rev.A.pdf.
- **S387** [C64-Wiki: MOS 6510 (0.985 MHz PAL, 1.023 MHz NTSC)](https://www.c64-wiki.com/wiki/6510). Local: architect-assets/S387. https://www.c64-wiki.com/wiki/6510.
- **S388** [Ray Carlsen, C64 Blank Screen (c64blank.txt), Wayback Machine copy (2025)](https://web.archive.org/web/20250819042254/https://portcommodore.com/rcarlsen/cbm/c64/c64blank.txt). Local: architect-assets/S388. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S389** [Ray Carlsen, VIC-20 Diagnostics and Repair (vic20.txt)](https://portcommodore.com/rcarlsen/cbm/vic20/vic20.txt). Local: architect-assets/S389. HTTP Error 406: Not Acceptable.
- **S390** [VIC-20 schematic, Version E (zimmers.net PDF): Y1 14.31818 MHz](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/VIC-20%20Schematic%20-Version%20E.pdf). Local: architect-assets/S390. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/VIC-20%20Schematic%20-Version%20E.pdf.
- **S391** [Marko Mäkelä, VIC-I notes (zimmers.net): crystal 14318181 Hz NTSC, 4433618 Hz PAL; bus clock crystal/14 NTSC, crystal/4 PAL](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/VIC-I.txt). Local: architect-assets/S391. 200 http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/VIC-I.txt.
- **S392** [C64-Wiki: VIC-20 (6502 at 1.02 MHz NTSC / 1.10 MHz PAL)](https://www.c64-wiki.com/wiki/VIC-20). Local: architect-assets/S392. https://www.c64-wiki.com/wiki/VIC-20.
- **S393** [Ray Carlsen, VIC-20 Diagnostics and Repair (vic20.txt), Wayback Machine copy (2026)](https://web.archive.org/web/20260607184337/https://portcommodore.com/rcarlsen/cbm/vic20/vic20.txt). Local: architect-assets/S393. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S394** [PET FAQ in Ray Carlsen's PET folder (petfaq.html): fuse and chip reseating](https://portcommodore.com/rcarlsen/cbm/PET/petfaq.html). Local: architect-assets/S394. HTTP Error 406: Not Acceptable.
- **S395** [Dynamic PET logic diagram 320349 sheet 9, voltage regulator](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-9.gif). Local: architect-assets/S395. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-9.gif.
- **S396** [Dynamic PET logic diagram 320349 sheet 6, master timing: Y1 16 MHz, TP9, G5 74191 (CLK8 pin 3, CLK1 pin 7)](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-6.gif). Local: architect-assets/S396. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-6.gif.
- **S397** [Dynamic PET logic diagram 320349 sheets 1-3: C4 6502 pin 39 to A10 (7417) as BΦ2, to C6/C7 6520 pin 25 and C5 6522 pin 25](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-3.gif). Local: architect-assets/S397. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-3.gif.
- **S398** [Universal Dynamic PET logic diagram 8032087 sheet 10: UB13 CRTC pin 23 (E) on BΦ2](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/univ2/8032087.pdf). Local: architect-assets/S398. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/univ2/8032087.pdf.
- **S399** [Sams CD4 VIC-1541/1541, schematic, 1 MHz line from UD5 (74177) pin 12 through L3 and R1, PDF p. 10](https://archive.org/details/sams-computerfacts-cd4-1541/page/n9). Local: architect-assets/S399. https://dn760101.eu.archive.org/0/items/sams-computerfacts-cd4-1541/SamsComputerfacts_Cd4_1541_text.pdf.
- **S400** [Commodore 1540/1541 Technical Manual 990445, 3.9.1 track adjustment (cat's eye), p. 19](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/tech/1541-19.gif). Local: architect-assets/S400. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/tech/1541-19.gif.
- **S401** [Commodore 1540/1541 Technical Manual 990445, 3.9.2 track 00 and 3.9.3 speed control, p. 20](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/tech/1541-20.gif). Local: architect-assets/S401. 200 http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/tech/1541-20.gif.
- **S402** [Sams CD12 1571, Troubleshooting, power supply, PDF p. 24](https://archive.org/details/SAMS_Computerfacts_CD12_1571/page/n23). Local: architect-assets/S402. https://dn760101.eu.archive.org/0/items/SAMS_Computerfacts_CD12_1571/SAMS_Computerfacts_CD12_1571.pdf.
- **S403** [Sams CD12 1571, Service checks, disk drive dead (B), PDF p. 4](https://archive.org/details/SAMS_Computerfacts_CD12_1571/page/n3). Local: architect-assets/S403. https://ia600503.us.archive.org/30/items/SAMS_Computerfacts_CD12_1571/SAMS_Computerfacts_CD12_1571.pdf.
- **S404** [Ray Carlsen 1571 folder: USA power supply diagram (Sams-style schematic)](https://portcommodore.com/rcarlsen/cbm/1571/USA%20PS%20DIAGRAM.jpg). Local: architect-assets/S404. https://portcommodore.com/rcarlsen/cbm/1571/USA%20PS%20DIAGRAM.jpg.
- **S405** [Ray Carlsen 1571 folder: USA power supply diagram, Wayback Machine copy (2021)](https://web.archive.org/web/20211121065937/https://portcommodore.com/rcarlsen/cbm/1571/USA%20PS%20DIAGRAM.jpg). Local: architect-assets/S405. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S406** [SAMS Computerfacts CD12, Commodore 1571 (archive.org; Sams redraw)](https://archive.org/details/SAMS_Computerfacts_CD12_1571). Local: architect-assets/S406. https://dn760101.eu.archive.org/0/items/SAMS_Computerfacts_CD12_1571/SAMS_Computerfacts_CD12_1571.pdf.
- **S407** [Sams CD12 1571, schematic, waveform at U5 (251829) pin 1, PDF p. 11](https://archive.org/details/SAMS_Computerfacts_CD12_1571/page/n10). Local: architect-assets/S407. https://ia600503.us.archive.org/30/items/SAMS_Computerfacts_CD12_1571/SAMS_Computerfacts_CD12_1571.pdf.
- **S408** [Sams CD22 1581, Service checks, drive is dead (A), PDF p. 5](https://archive.org/details/SAMS_Computerfacts_CD22_1581/page/n4). Local: architect-assets/S408. https://ia601502.us.archive.org/7/items/SAMS_Computerfacts_CD22_1581/SAMS_Computerfacts_CD22_1581.pdf.
- **S409** [Sams CD22 1581, schematic, waveform at R9 into U10 (74LS93) pin 1, PDF p. 12](https://archive.org/details/SAMS_Computerfacts_CD22_1581/page/n11). Local: architect-assets/S409. https://dn760108.eu.archive.org/0/items/SAMS_Computerfacts_CD22_1581/SAMS_Computerfacts_CD22_1581.pdf.
- **S410** [Understanding the Apple II (Sather), Power Supply (drive), p. 9-5](https://archive.org/details/understanding_the_apple_ii/page/n234). Local: architect-assets/S410. https://dn760103.eu.archive.org/0/items/understanding_the_apple_ii/understanding_the_apple_ii_text.pdf.
- **S411** [Apple Floppy Drives list (Disk II re-cabling, model numbers) (community)](https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/apple_floppy_disk_drives.pdf). Local: architect-assets/S411. https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/apple_floppy_disk_drives.pdf.
- **S412** [Sams CD6 Disk II, analog board schematic with waveforms, p. 15](https://archive.org/details/Sams_Technical_Disk_II/page/n26). Local: architect-assets/S412. https://dn760109.eu.archive.org/0/items/Sams_Technical_Disk_II/Sams_Technical_Disk_II.pdf.
- **S413** [Understanding the Apple II (Sather), Disk II overview (300 rpm), p. 9-3](https://archive.org/details/understanding_the_apple_ii/page/n232). Local: architect-assets/S413. https://dn760103.eu.archive.org/0/items/understanding_the_apple_ii/understanding_the_apple_ii_text.pdf.
- **S414** [Understanding the Apple II (Sather), Table 3.1 timing frequencies (Q3), p. 3-4](https://archive.org/details/understanding_the_apple_ii/page/n37). Local: architect-assets/S414. https://dn760103.eu.archive.org/0/items/understanding_the_apple_ii/understanding_the_apple_ii_text.pdf.
- **S415** [Understanding the Apple II (Sather), write timing (one bit every four MPU cycles), p. 9-24](https://archive.org/details/understanding_the_apple_ii/page/n253). Local: architect-assets/S415. https://dn760103.eu.archive.org/0/items/understanding_the_apple_ii/understanding_the_apple_ii_text.pdf.
- **S416** [DuoDisk Technical Procedures, product description, p. 1.2](https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/AppleService%20Technical%20Procedures%20-%20Apple%20DuoDisk.pdf). Local: architect-assets/S416. https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/hardware/storage/disks/AppleService%20Technical%20Procedures%20-%20Apple%20DuoDisk.pdf.
- **S417** [Apple IIc Technical Reference Manual, Disk I/O warning (port power for a drive only), p. 273](https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n300). Local: architect-assets/S417. https://dn790002.ca.archive.org/0/items/Apple_IIc_Technical_Reference_Manual/Apple_IIc_Technical_Reference_Manual_text.pdf.
- **S418** [Apple, UniDisk Floppy Disk power usage, Table 1 DC power requirements (9 Mar 1983) (A2DP)](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20UniDisk%205.25/Schematics/Apple%20Unidisk%20-%20Power%20Usage%20Oscilloscope%20Screens.pdf). Local: architect-assets/S418. https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20UniDisk%205.25/Schematics/Apple%20Unidisk%20-%20Power%20Usage%20Oscilloscope%20Screens.pdf.
- **S419** [Apple IIc Technical Reference Manual, IWM pinouts, pp. 247-248](https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n274). Local: architect-assets/S419. https://dn790002.ca.archive.org/0/items/Apple_IIc_Technical_Reference_Manual/Apple_IIc_Technical_Reference_Manual_text.pdf.
- **S420** [Sinc-Link v7 n1 (Jan/Feb 1989) p. 9-10, Power supply and the 2068](https://archive.org/details/SincLink/Sinc-Link%20Vol%2007%20No%201/page/n9). Local: architect-assets/S420. https://dn760104.eu.archive.org/0/items/SincLink/Letter%20from%20George%20Chambers%20re%20TTSUG%20newsletter_text.pdf.
- **S421** [Old Computer Museum: Timex Sinclair 2068 (DVE supply, 15 V 1 A DC)](https://context.oldcomputermuseum.com/timex_sinclair2068.html). Local: architect-assets/S421. https://context.oldcomputermuseum.com/timex_sinclair2068.html.
- **S422** [Sams Computerfacts CC19, Sinclair/Timex Model 2068 (1988), schematic waveform at U3 pin 14 (5.0 V p-p, 0.1 µs/cm, 0 V base), PDF p. 3](https://archive.org/details/TimexSinclairEphemera/CC-19_Timex%20_Sinclair%202068/page/n2). Local: architect-assets/S422. https://dn790002.ca.archive.org/0/items/TimexSinclairEphemera/Column%20Arrangement%20of%20Numbers_text.pdf.
- **S423** [Zilog Z80 CPU Product Specification 03-0027-02 (Mar 1978), D.C. characteristics: clock input LOW max 0.45 V, HIGH min VCC - 0.6 V, p. 8](http://www.bitsavers.org/components/zilog/z80/03-0027-02_Z80_CPU_Product_Specification_Mar78.pdf). Local: architect-assets/S423. https://www.bitsavers.org/components/zilog/z80/03-0027-02_Z80_CPU_Product_Specification_Mar78.pdf.
- **S424** [Sams Computerfacts CC19, Sinclair/Timex Model 2068 (1988), schematic waveform at composite video out J7 (1.9 V p-p, 20 µs/cm, -1 V base line), PDF p. 18](https://archive.org/details/TimexSinclairEphemera/CC-19_Timex%20_Sinclair%202068/page/n17). Local: architect-assets/S424. https://dn790002.ca.archive.org/0/items/TimexSinclairEphemera/Column%20Arrangement%20of%20Numbers_text.pdf.
- **S425** [Sams Computerfacts CC19, Sinclair/Timex Model 2068 (1988), troubleshooting, power supply dead, p. 8](https://archive.org/details/TimexSinclairEphemera/CC-19_Timex%20_Sinclair%202068/page/n8). Local: architect-assets/S425. https://dn790002.ca.archive.org/0/items/TimexSinclairEphemera/Column%20Arrangement%20of%20Numbers_text.pdf.
- **S426** [Sams Computerfacts CC19, Sinclair/Timex Model 2068 (1988), 3.58 MHz adjustment (3.5795 MHz at U4 pin 17), p. 7](https://archive.org/details/TimexSinclairEphemera/CC-19_Timex%20_Sinclair%202068/page/n7). Local: architect-assets/S426. https://dn790002.ca.archive.org/0/items/TimexSinclairEphemera/Column%20Arrangement%20of%20Numbers_text.pdf.
- **S427** [Sams CSCS3 TRS-80 Model I, schematic waveform at Z42-6 (oscillator buffer), PDF p. 13](https://archive.org/details/Sams_ComputerFacts_Model_I_1985_Howard_Sams/page/n12). Local: architect-assets/S427. https://dn711208.ca.archive.org/0/items/Sams_ComputerFacts_Model_I_1985_Howard_Sams/Sams_ComputerFacts_Model_I_1985_Howard_Sams_text.pdf.
- **S428** [HERO Jr Owner's Guide, charging the batteries, p. 6 (archive.org)](https://archive.org/download/HEROJrOwnersGuide/HERO%20Jr%20Owner%27s%20Guide.pdf). Local: architect-assets/S428. https://ia800504.us.archive.org/32/items/HEROJrOwnersGuide/HERO%20Jr%20Owner%27s%20Guide.pdf.
- **S429** [TI TL851 Sonar Ranging Control, SLSS004 (1988), oscillator divide ratios 8.5 and 4.5, p. 1](https://www.ti.com/lit/ds/symlink/tl851.pdf). Local: architect-assets/S429. https://www.ti.com/lit/ds/symlink/tl851.pdf.
- **S430** [IBM PC Technical Reference (Aug 1981), Power Supply, pp. 2-33 to 2-36](https://bitsavers.org/pdf/ibm/pc/pc/6025008_PC_Technical_Reference_Aug81.pdf). Local: architect-assets/S430. https://bitsavers.org/pdf/ibm/pc/pc/6025008_PC_Technical_Reference_Aug81.pdf.
- **S431** [minuszerodegrees.net, IBM 5150 power supply (start-up loading, minimum off time)](https://minuszerodegrees.net/5150/psu/5150_psu.htm). Local: architect-assets/S431. HTTP Error 406: Not Acceptable.
- **S432** [minuszerodegrees.net, IBM 5150 PSU power rating of each line](https://minuszerodegrees.net/5150/psu/5150_psu_line_ratings.htm). Local: architect-assets/S432. HTTP Error 406: Not Acceptable.
- **S433** [Sams CSCS2 IBM 5150, system board schematic p. 57, CLK88 waveform at U99 pin 9](https://archive.org/details/Sams_IBM_5150/page/n57). Local: architect-assets/S433. https://dn760103.eu.archive.org/0/items/Sams_IBM_5150/Sams_IBM_5150.pdf.
- **S434** [Sams CSCS2 IBM 5150, system board schematic p. 4, OSC waveform at U11 pin 12](https://archive.org/details/Sams_IBM_5150/page/n4). Local: architect-assets/S434. <urlopen error [WinError 10060] A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond>.
- **S435** [Sams CSCS2 IBM 5150, system board schematic, keyboard sheet (unnumbered), PCLK waveform at U26 pin 9](https://archive.org/details/Sams_IBM_5150/page/n64). Local: architect-assets/S435. The read operation timed out.
- **S436** [Sams CSCS2 IBM 5150, system board schematic, CPU and 8259A sheets (unnumbered), IRQ0 waveform at U2 pin 18, scan n60 to n62](https://archive.org/details/Sams_IBM_5150/page/n60). Local: architect-assets/S436. https://dn760103.eu.archive.org/0/items/Sams_IBM_5150/Sams_IBM_5150.pdf.
- **S437** [Sams CSCS2 IBM 5150, system board schematic p. 59, CLK waveform at U15 pin 7](https://archive.org/details/Sams_IBM_5150/page/n59). Local: architect-assets/S437. https://dn790008.ca.archive.org/0/items/Sams_IBM_5150/Sams_IBM_5150.pdf.
- **S438** [Sams CSCS2 IBM 5150, CSCS2-A Monochrome Display and Printer Adapter, schematic p. 16, waveform at U24 pin 6](https://archive.org/details/Sams_IBM_5150/page/n100). Local: architect-assets/S438. https://dn760103.eu.archive.org/0/items/Sams_IBM_5150/Sams_IBM_5150.pdf.
- **S439** [Sams CSCS2 IBM 5150, CSCS2-A Monochrome Display and Printer Adapter, schematic p. 3, waveform at J3 pin 8](https://archive.org/details/Sams_IBM_5150/page/n86). Local: architect-assets/S439. https://dn790008.ca.archive.org/0/items/Sams_IBM_5150/Sams_IBM_5150.pdf.
- **S440** [Sams CSCS2 IBM 5150, CSCS2-B Color/Graphics Monitor Adapter, schematic p. 3, waveform on the 3.58MHz line at U5](https://archive.org/details/Sams_IBM_5150/page/n106). Local: architect-assets/S440. https://ia800800.us.archive.org/24/items/Sams_IBM_5150/Sams_IBM_5150.pdf.
- **S441** [IBM Hardware Maintenance Service 6280087 (1986), MAP 0020 Power (PC) step 005, p. 0020-2](https://minuszerodegrees.net/hms/HMS%20-%206280087%20-%20Maps%20-%200020.pdf). Local: architect-assets/S441. https://minuszerodegrees.net/hms/HMS%20-%206280087%20-%20Maps%20-%200020.pdf.
- **S442** [minuszerodegrees.net, IBM 5150/5155/5160 minimum diagnostic configuration](https://minuszerodegrees.net/5150_5160/MDC/minimum_diag_config.htm). Local: architect-assets/S442. HTTP Error 406: Not Acceptable.
- **S443** [Sams CSCS2 IBM 5150, troubleshooting, clock generator, p. 15](https://archive.org/details/Sams_IBM_5150/page/n15). Local: architect-assets/S443. https://dn790008.ca.archive.org/0/items/Sams_IBM_5150/Sams_IBM_5150.pdf.
- **S444** [Sams CSCS2 IBM 5150, preliminary service checks, system board (B) and (C), p. VII](https://archive.org/details/Sams_IBM_5150/page/n71). Local: architect-assets/S444. HTTP Error 500: Internal Server Error.
- **S445** [Sams CSCS2 IBM 5150, schematic notes (how waveforms are read), p. 44](https://archive.org/details/Sams_IBM_5150/page/n44). Local: architect-assets/S445. https://dn760103.eu.archive.org/0/items/Sams_IBM_5150/Sams_IBM_5150.pdf.
- **S446** [Retro-Kit, BBC Micro PSU X2 capacitors (secondary)](https://www.retro-kit.co.uk/page.cfm/content/BBC-Micro-PSU-X2-capacitors/). Local: architect-assets/S446. https://www.retro-kit.co.uk/page.cfm/content/BBC-Micro-PSU-X2-capacitors/.
- **S447** [Circuit diagram for BBC Microcomputer 103,000/C (goffart.co.uk copy)](https://www.goffart.co.uk/museum/schematics/bbc_b.pdf). Local: architect-assets/S447. https://www.goffart.co.uk/museum/schematics/bbc_b.pdf.
- **S448** [Defence Force Oric wiki, Oric-1 and Atmos repairing (archived copy)](https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:repairing:oric1_atmos). Local: architect-assets/S448. <urlopen error [WinError 10061] No connection could be made because the target machine actively refused it>.
- **S449** [Mike Brown, The Oric-1/Atmos Unofficial ULA Guide v1.02, Operation: 12 MHz in on pin 7, / 2 dot clock, / 6 to 1 MHz on pin 14 (asymmetric), 64 µs lines, p. 4](https://oric.signal11.org.uk/files/pub/ula1/OricAtmosUnofficialULAGuide-1.02.pdf). Local: architect-assets/S449. https://oric.signal11.org.uk/files/pub/ula1/OricAtmosUnofficialULAGuide-1.02.pdf.
- **S450** [1541 User's Guide (DOS commands, user commands, device number), zimmers.net text edition](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541-manual.txt). Local: architect-assets/S450. 200 http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541-manual.txt.
- **S451** [1541 User's Guide (scan)](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf). Local: architect-assets/S451. 200 http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf.
- **S452** [Inside Commodore DOS (Immers and Neufeld, 1984), ch. 9.1 1541 memory and I/O, p. 181](https://archive.org/details/Inside_Commodore_Dos). Local: architect-assets/S452. https://dn720306.ca.archive.org/0/items/Inside_Commodore_Dos/Inside_Commodore_Dos.pdf.
- **S453** [1581 User's Guide (partitions, U0 commands), zimmers.net text edition](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581-manual.txt). Local: architect-assets/S453. 200 http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581-manual.txt.
- **S454** [1581 User's Guide (scan)](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf). Local: architect-assets/S454. 200 http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf.
- **S455** [](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/). Local: architect-assets/S455. https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/.
- **S456** [](https://archive.org/details/Level_II_BASIC_Reference_Manual_1979_Radio_Shack). Local: architect-assets/S456. https://dn721609.ca.archive.org/0/items/Level_II_BASIC_Reference_Manual_1979_Radio_Shack/Level_II_BASIC_Reference_Manual_1979_Radio_Shack.pdf.
- **S457** [](https://archive.org/details/Model_4_Disk_System_Owners_Manual_1983_Tandy_a). Local: architect-assets/S457. https://dn710307.ca.archive.org/0/items/Model_4_Disk_System_Owners_Manual_1983_Tandy_a/Model_4_Disk_System_Owners_Manual_1983_Tandy_a_text.pdf.
- **S458** [](https://beebwiki.mdfs.net/Main_Page). Local: architect-assets/S458. https://beebwiki.mdfs.net/Main_Page.
- **S459** [](https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf). Local: architect-assets/S459. https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf.
- **S460** [](https://archive.org/details/acorn-electron-sm). Local: architect-assets/S460. https://dn760105.eu.archive.org/0/items/acorn-electron-sm/Acorn_ElectronSM.pdf.
- **S461** [](https://archive.org/download/acorn-electron-advanced-user-guide/Electron%20Advanced%20User%20Guide.pdf). Local: architect-assets/S461. https://dn711200.ca.archive.org/0/items/acorn-electron-advanced-user-guide/Electron%20Advanced%20User%20Guide.pdf.
- **S462** [](https://archive.org/download/acorn-electron-user-guide/Acorn%20Electron%20User%20Guide.pdf). Local: architect-assets/S462. https://dn710001.ca.archive.org/0/items/acorn-electron-user-guide/Acorn%20Electron%20User%20Guide.pdf.
- **S463** [](https://chrisacorns.computinghistory.org.uk/docs/Acorn/AN/015.pdf). Local: architect-assets/S463. https://chrisacorns.computinghistory.org.uk/docs/Acorn/AN/015.pdf.
- **S464** [](https://archive.org/details/acorn-electron-plus-1-expansion-unit-user-guide). Local: architect-assets/S464. https://dn760102.eu.archive.org/0/items/acorn-electron-plus-1-expansion-unit-user-guide/Acorn-Electron-Plus-1-Expansion-Unit-User-Guide.pdf.
- **S465** [](https://chrisacorns.computinghistory.org.uk/Computers/Electron.html). Local: architect-assets/S465. https://chrisacorns.computinghistory.org.uk/Computers/Electron.html.
- **S466** [](https://classicacorn.computinghistory.org.uk/8bit_repairs/elec_ula/elec_ula.html). Local: architect-assets/S466. https://classicacorn.computinghistory.org.uk/8bit_repairs/elec_ula/elec_ula.html.
- **S467** [](https://acornelectron.co.uk/eug/02/a-trou.html). Local: architect-assets/S467. https://acornelectron.co.uk/eug/02/a-trou.html.
- **S468** [](https://linuxjedi.co.uk/acorn-electron-retro-restoration/). Local: architect-assets/S468. https://linuxjedi.co.uk/acorn-electron-retro-restoration/.
- **S469** [](https://www.bygonebytes.co.uk/More_Electron_Repairs.html). Local: architect-assets/S469. https://www.bygonebytes.co.uk/More_Electron_Repairs.html.
- **S470** [TRS-80 Micro Computer Technical Reference Handbook, 1st ed. (1978), with fold-out master schematic](https://archive.org/details/TRS-80_Micro_Computer_Technical_Reference_Handbook_1st_Edition_1978_Radio_Shack). Local: architect-assets/S470. https://dn710105.ca.archive.org/0/items/TRS-80_Micro_Computer_Technical_Reference_Handbook_1st_Edition_1978_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_1st_Edition_1978_Radio_Shack_text.pdf.
- **S471** [Radio Shack Model I schematics (8 pages)](https://archive.org/details/Model_I_Schematics_19xx_Tandy). Local: architect-assets/S471. https://ia801906.us.archive.org/4/items/Model_I_Schematics_19xx_Tandy/Model_I_Schematics_19xx_Tandy.pdf.
- **S472** [TRS-80 Model I (Japanese version) service manual and schematics](https://archive.org/details/TRS80ServiceManualForJapaneseModel1). Local: architect-assets/S472. https://ia601403.us.archive.org/14/items/TRS80ServiceManualForJapaneseModel1/Service%20Manual%20for%20Japanese%20Model%201_text.pdf.
- **S473** [Radio Shack Model I Expansion Interface schematic (Figure 13, one sheet)](https://archive.org/details/Model_I_Expansion_Interface_Schematics_19xx_Tandy). Local: architect-assets/S473. https://dn721900.ca.archive.org/0/items/Model_I_Expansion_Interface_Schematics_19xx_Tandy/Model_I_Expansion_Interface_Schematics_19xx_Tandy_text.pdf.
- **S474** [Wikimedia Commons: File:ColecoVision-Motherboard-Top.jpg](https://commons.wikimedia.org/wiki/File:ColecoVision-Motherboard-Top.jpg). Local: architect-assets/S474. https://commons.wikimedia.org/wiki/File:ColecoVision-Motherboard-Top.jpg.
