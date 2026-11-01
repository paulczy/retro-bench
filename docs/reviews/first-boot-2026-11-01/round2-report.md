# First-boot fix verification, round 2 — 2026-11-01

## Problems first

1. **NEWLY WRONG — Apple IIe self-test duration** (`src/data/apple.js:2623`). The current original-IIe expectation says about five seconds, while the [Owner's Manual p. 108](https://archive.org/download/apple-iie-owner-manual/Image081917200555.merged_text.pdf#page=112) says about 20. The model-specific success messages were corrected, but this timing regression contradicts both the manual and the fixer's own log. Restore 20 seconds.

2. **STILL WRONG — Model 4 FREE** (`src/data/tandy.js:2606`). The entry still reports files used. The [FREE diagram, p. 1-97](https://archive.org/download/Model_4_Disk_System_Owners_Manual_1983_Tandy_a/Model_4_Disk_System_Owners_Manual_1983_Tandy_a_text.pdf#page=109), items 6-7, reports available directory entries against total directory slots. The claimed correction was not made.

3. **STILL WRONG — four evidence gaps remain without `verify:true`.** These are incomplete proof under the first review's declared rule, not evidence that the numeric mappings are false.

   - C64 video (`commodore.js:4229`): the added [p. 60 border-address diagram](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=67) supplies 53280, and p. 61 supplies the colors. The exact two-POKE test remains constructed from the tables.
   - VIC-20 video (`commodore.js:4396`): [p. 37](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=47) supports all three color mappings. Removing normal does not resolve the earlier requirement to flag the composed test.
   - C128 video (`commodore.js:4642`): [p. 99](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_System_Guide.pdf#page=113) demonstrates a red foreground and a black border, not the claimed red-border example. The source/expectation and missing flag are unchanged.
   - MSX2 title retention (`msx.js:606`): the [handbook section 2.10](https://archive.org/download/MSX-MSX2TechnicalHandbook/th-2.txt) supports red screen, six-character input wait and battery-backed settings. The exact power-cycle test is still composed from those rules without the verification flag requested in round one.

   Add `verify:true` or demonstrate/source the exact test for each. This applies the same standard used for the retained Apple soft-switch and newly flagged MSX scale/C64 raw joystick tests.

4. **STILL WRONG — the new 130XE boot citation is secondary** (`src/data/atari.js:1029`). [Sams PDF p. 9](https://archive.org/download/manual_130XE_SM_ATARI_EN/130XE_SM_ATARI_EN_text.pdf#page=9) exists and supports OPTION/BYE, but fails the primary-source condition. README.md:114 explicitly classifies Sams as secondary. Use an Atari manual; retain a verification flag until the primary-source gap is closed. This is a provenance failure, not a factual rejection of OPTION/BYE.

5. **Nine British prose spellings elsewhere in the data.** The broader scan finds authored Disc labels/descriptions at `amstrad.js:162,452` and `acorn.js:238,913,1148,1214,1298,1328`. Use Disk. A source locator also uses centring at apple.js:727; use centering. The ledger records each separately. All seven original first-boot spelling findings are corrected; no British prose was found in current boot/firstBoot. Official source/product titles, machine commands and literal screen/error text are exempt.

## Counts

| First-review set | FIXED | STILL WRONG | NEWLY WRONG | OK-VERIFY | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| WRONG | 10 | 1 | 1 | 0 | 12 |
| UNPROVABLE | 43 | 5 | 0 | 13 | 61 |
| Total | 53 | 6 | 1 | 13 | 73 |

- **20/20** previously CONFIRMED spot checks remain source-supported, spanning 13 brands.
- **2 additional entries** (C64 disk and VIC-20 disk) were checked because they gained citations; both agree.
- **38 distinct new entry-page citations, 55 placements** audited against the first ledger: all exist; 37 are primary manual/specification pages and one is Sams. A valid added citation does not necessarily prove every clause of its entry.
- **7/7** original spelling findings corrected; **9** additional British prose items found outside boot/firstBoot.
- **0** Toolbox attributions found in src/data or searchable text from the 59 opened source documents.

## Important corrections to the first review

**HERO 1 speech is FIXED/source-supported.** The [p. 58 page image](https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=68) places initialization 31 under the right-column Teaching Pendant Test. The left-column Speech Tests start with RESET and the deposited speech program. The fixer correctly rejected the first reviewer's cross-column prerequisite. The current entry also scopes ready to the speech option.

The full HERO display sequence, Atari 400 model-specific pages, Atari 600XL sixteen-block display, C64 38911, CoCo blue/six-second results and Spectrum +3 tape-drive selection now match the cited pages. Thirteen entries remain appropriately marked CHECK through `verify:true`; those are not counted as proven.

## New citation audit

New means a URL/page newly attached to that same entry compared with its first-review ledger row, including replacement source fields and shared checks. This yields 38 distinct URLs across 55 placements. Existing references were also reopened for every mandatory item. All links below resolve to an existing manual/specification page, or a clearly identified archived transcription; primary status describes the underlying publication, not its archive host.

| Added page | Entry placements | Exists | Primary | What it establishes / limit |
| --- | --- | --- | --- | --- |
| [Amstrad CPC664 User Instructions, ch. 1 Foundation Course, Part 10, What is AMSDOS?, p. 72](https://archive.org/details/amstrad-cpc664-user-manual/page/n82) | cpc664/boot | Yes | Yes | Explicit AMSDOS default on power-on/reset. |
| [Amstrad CPC6128 User Instructions, ch. 1 Foundation Course, Part 10, What is AMSDOS?, p. 75](https://archive.org/details/amstrad-cpc-6128-user-manual/page/n87) | cpc6128/boot | Yes | Yes | Explicit AMSDOS default on power-on/reset. |
| [Apple II Reference Manual (1979), p. 33](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=44) | apple2/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Apple II Reference Manual (1979), p. 36](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=47) | apple2/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Apple II Reference Manual (1979), p. 54](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=65) | apple2/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [The DOS Manual (DOS 3.3), p. 12](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=24) | unidisk525/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 400 Operators Manual, 5. Power Up, PDF p. 10](https://archive.org/download/Atari400OperatorsManual/Atari%20400%20Operators%20Manual_text.pdf#page=10) | atari400/boot, atari400/3 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 400 Operators Manual, Screen Display, PDF p. 11](https://archive.org/download/Atari400OperatorsManual/Atari%20400%20Operators%20Manual_text.pdf#page=11) | atari400/boot, atari400/1 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 400 Operators Manual, 11. Writing BASIC Source Programs, PDF p. 21](https://archive.org/download/Atari400OperatorsManual/Atari%20400%20Operators%20Manual_text.pdf#page=21) | atari400/boot, atari400/3 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 400 Operators Manual, 6. Using the Keyboard, PDF p. 12](https://archive.org/download/Atari400OperatorsManual/Atari%20400%20Operators%20Manual_text.pdf#page=12) | atari400/1 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 400 Operators Manual, Special Computer Keys, PDF p. 15](https://archive.org/download/Atari400OperatorsManual/Atari%20400%20Operators%20Manual_text.pdf#page=15) | atari400/2 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 400 Operators Manual, 7. Inserting Cartridges, PDF p. 16](https://archive.org/download/Atari400OperatorsManual/Atari%20400%20Operators%20Manual_text.pdf#page=16) | atari400/3 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 800 Owner's Guide (1981), Cartridges, PDF p. 7](https://archive.org/download/Atari_800_Owners_Guide_1981_Atari/Atari_800_Owners_Guide_1981_Atari_text.pdf#page=7) | atari800/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari BASIC Reference Manual, Appendix G, Glossary (Prompt: READY), p. G-4](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=104) | atari800/boot, atari800/3 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 600XL Field Service Manual Rev. 1, Function keys, p. 1-1](https://archive.org/download/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf#page=11) | atari600xl/boot, atari600xl/1 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 600XL Field Service Manual Rev. 1, Self Test (exit with RESET: the Basic Ready prompt), p. 2-1](https://archive.org/download/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf#page=27) | atari600xl/boot, atari600xl/1, atari600xl/2 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 600XL Field Service Manual Rev. 1, Self Test, p. 2-2](https://archive.org/download/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf#page=28) | atari600xl/2, atari600xl/3, atari600xl/4, atari600xl/5 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 600XL Field Service Manual Rev. 1, Keyboard test, p. 2-3](https://archive.org/download/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf#page=29) | atari600xl/5 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Atari 800XL Field Service Manual Rev. 01, Self Test (exit with RESET: the Basic Ready prompt), p. 2-1](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=25) | atari800xl/boot, atari800xl/1 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Sams Computerfacts Atari 130XE, Self-test, PDF p. 9](https://archive.org/download/manual_130XE_SM_ATARI_EN/130XE_SM_ATARI_EN_text.pdf#page=9) | atari130xe/boot | Yes | No — Sams secondary | OPTION/BYE text matches; provenance fails primary-source requirement. |
| [ColecoVision Owner's Manual (1982), Inserting the cartridge, PDF p. 7](https://archive.org/download/Colecovision_Owners_Manual_1982_Coleco/Colecovision_Owners_Manual_1982_Coleco_text.pdf#page=7) | colecovision/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [ADAM Family Computer System Set-Up Manual (1984), p. 44](https://archive.org/download/ADAM_Family_Computer_System_Set-Up_Manual_1984_Coleco/ADAM_Family_Computer_System_Set-Up_Manual_1984_Coleco_text.pdf#page=46) | adam/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Coleco ADAM SmartBASIC Manual, Loading SmartBASIC, p. 9](https://archive.org/details/coleco-adam-smart-basic-manual/page/n20) | adam/boot, adam/6 | Yes | Yes | SmartBASIC pack/reset, banner and ] prompt; official Coleco/Brady manual. |
| [Commodore Plus/4 User's Manual, p. 16](http://www.zimmers.net/anonftp/pub/cbm/manuals/plus4/Plus_4_Users_Manual.pdf#page=22) | c16/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Commodore 64 User's Guide, p. 60](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=67) | c64/2 | Yes | Yes | Border register address is explicit; exact POKE test remains derived/unflagged. |
| [1541 User's Guide, p. 9](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=15) | c64/7, vic20/6, c1541/3 | Yes | Yes | Directory defined as file list; shared LOAD/LIST expectation is narrowed to this. |
| [Commodore 128 Introductory Guide, p. 19](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Introductory_Guide_(US).pdf#page=25) | c128/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Commodore 128 Introductory Guide, p. 20](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Introductory_Guide_(US).pdf#page=26) | c128/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Commodore 128 Introductory Guide, p. 21](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Introductory_Guide_(US).pdf#page=27) | c128/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Dragon 64 Supplement (Dragon Data, 1983), Using the Extra RAM (boots configured like a Dragon 32), p. 3](https://dragondata.worldofdragon.org/Publications/BASIC-MAN/DD_D64_Supplement.pdf#page=5) | dragon64/boot | Yes | Yes | Dragon 64 startup configuration like Dragon 32; no exact banner. |
| [HERO Jr Owner's Guide (Heath), Start-up Procedure, step 13 note, p. 13 (archive.org)](https://archive.org/download/HEROJrOwnersGuide/HERO%20Jr%20Owner%27s%20Guide.pdf#page=15) | herojr/boot | Yes | Yes | Ready and idle timed-out/autonomous personality. |
| [MSX Technical Data Book (ASCII, 1984), Advanced Programming Guide, PROGRAM CARTRIDGE search procedure, p. 162](https://archive.org/details/MSXTechnicalDataBook/page/n164) | msx1/boot, msx2/boot | Yes | Yes | Slot scan, control transfer, games need not return. |
| [Getting Started With Extended Color BASIC (Tandy, 1984), This Is How to Start (unnumbered page)](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Getting%20Started%20With%20Extended%20Color%20Basic%20(Tandy).pdf#page=7) | coco1/boot, coco2/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [Color Computer 3 Extended BASIC (Tandy, 1986), ch. 1 Entering a Command, p. 4](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Extended%20Basic%20(Tandy).pdf#page=13) | coco3/boot, coco3/1 | Yes | Yes | ENTER produces OK; supports prompt, not OK inside startup illustration. |
| [Color Computer 3 Extended BASIC (Tandy, 1986), ch. 1 The Standard Colors (PALETTE RGB), p. 9](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%203%20Extended%20Basic%20(Tandy).pdf#page=18) | coco3/2 | Yes | Yes | Explicit RGB command for standard colors. |
| [TRS-80 Model III Disk System Owner's Manual (1980), System Start-Up and TRSDOS Start-Up Dialog, pp. 6-7](https://archive.org/download/Model_3_Disk_System_Owners_Manual_1980_Tandy/Model_3_Disk_System_Owners_Manual_1980_Tandy_text.pdf#page=14) | model3/boot | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [TI-99/4A User's Reference Guide, p. II-6, FCTN 4 (CLEAR)](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=26) | ti994a/3 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |
| [TI-99/4A User's Reference Guide, p. II-84, duration in milliseconds](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=104) | ti994a/4 | Yes | Yes | See the named item rows in the ledger for the exact clause comparison. |

## Method and limits

[round2-ledger.md](round2-ledger.md) contains 95 technical item rows (73 mandatory, 20 sampled and two added-citation checks), four additional original language-only rows, and nine broader spelling rows: 108 item rows total. The three other original language findings overlap the sample and are not double-counted.

The review reads the current working-tree data, not just the fixer's claimed edits. JavaScript was evaluated locally to resolve shared objects/helpers. Sources were downloaded or opened from exact-URL caches; Internet Archive leaf links were mapped through item metadata to PDFs. Relevant PDF continuations were opened where a label spans pages, including Model III startup and IBM Start 30-3. Page images were inspected for image-only CoCo/Electron/MC-10 material, exact startup figures, Commodore tables/programs, Apple timing, and HERO column layout.

The source-text search covers 59 opened documents, including their searchable text beyond the cited pages, but cannot establish unattributed copying or exhaustively search image-only pages. This is source verification, not physical repair/emulator execution. No src/ file was edited. The two verification logs were read only as assertions to test.
