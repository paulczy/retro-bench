# Board photos with designator highlighting: licensed photo survey

Date: 2026-10-30. Scope: the 62 machine ids in `src/data/schematics.js`.
Goal: one freely licensed, top-down photo of each main board, so that a chip tapped in the app can be highlighted on the photo.

## Method

- Searched Wikimedia Commons with the MediaWiki API: full-text file search plus a walk of each machine's category and its "interiors", "internal components" and "PCB" subcategories.
- Read the licence from each file page's own wikitext (the licence template), not from search snippets. The templates found are in the "Licence" column.
- Downloaded 22 candidates at 1920 px wide, looked at each one, and kept the 10 best in `.tmp/photos/` (the folder is gitignored).
- Also checked other sources:
  - C64-Wiki: content is "GFDL unless otherwise noted" (footer of c64-wiki.com).
  - CPCWiki: behind a Cloudflare challenge, so its licence is not verified.
  - MSX Resource Center wiki: "Copyright (c) 1994-2026", no open licence. Do not use.
  - Flickr: no key-less licence search is available. Many Commons files below are Flickr imports whose licence a Flickr review bot checked (`FlickreviewR`, e.g. the Spectrum, 5155 and Apple II photos). A direct Flickr search with an API key is a follow-up.

Columns:

- **Top-down / sharp**: `flat` = straight on, `angled` = needs perspective correction, `in case` = board still in the case.
- **Silk legible**: whether the printed reference designators (U12, IC4, Z30 and so on) can be read at 1920 px.
- **Direct URL**: every original is at `https://upload.wikimedia.org/wikipedia/commons/<path>`; the path is given.

## Commodore

| Machine id | Board / revision | File page | Direct URL path | Licence | Attribution | Resolution | Top-down / sharp | Silk legible |
|---|---|---|---|---|---|---|---|---|
| c64 | Assy 250407, artwork 251137 Rev B (silkscreen visible) | [File:0430 - C64 Mainboard ASSY250407 RevB.jpg](https://commons.wikimedia.org/wiki/File:0430_-_C64_Mainboard_ASSY250407_RevB.jpg) | `8/8e/0430_-_C64_Mainboard_ASSY250407_RevB.jpg` | CC BY-SA 4.0 (`self\|cc-by-sa-4.0`) | Sven.petersen, CC BY-SA 4.0, via Wikimedia Commons | 4460x2332 | flat, in case, sharp | Yes, very clear (U1-U28, CN, R, C) |
| c64 (alt) | Assy 250425 | [File:C64 ASSY NO 250425 motherboard 1984.jpg](https://commons.wikimedia.org/wiki/File:C64_ASSY_NO_250425_motherboard_1984.jpg) | `9/90/C64_ASSY_NO_250425_motherboard_1984.jpg` | GFDL + CC BY-SA 3.0 (migrated) | Gona.eu | 2763x1319 | not viewed | not viewed |
| c64 (alt) | Long board, unknown assy | [File:C64motherboard.jpg](https://commons.wikimedia.org/wiki/File:C64motherboard.jpg) | `8/86/C64motherboard.jpg` | CC BY 2.0 (no share-alike) | Bill Bertram | 2048x953 | not viewed | not viewed |
| c64 (64C) | Short board 250469 (likely) | [File:C64Cmotherboard.jpg](https://commons.wikimedia.org/wiki/File:C64Cmotherboard.jpg) | `9/93/C64Cmotherboard.jpg` | GFDL / CC BY-SA 2.0 | Bill Bertram | 2048x730 | not viewed | not viewed |
| vic20 | Grid-designator board (UAB1, UD7, UE10); probably Assy 324001-xx, assy number not visible | [File:4860 - VIC-20 Mainboard.JPG](https://commons.wikimedia.org/wiki/File:4860_-_VIC-20_Mainboard.JPG) | `5/5b/4860_-_VIC-20_Mainboard.JPG` | Public domain (`PD-self`) | Sven.petersen (credit as courtesy) | 2844x1462 | flat, in case; loose wires cross the top half | Yes |
| vic20 (alt) | unknown | [File:Commovic20mb26049.jpg](https://commons.wikimedia.org/wiki/File:Commovic20mb26049.jpg) | `8/80/Commovic20mb26049.jpg` | CC0 | Fentriss | 7789x3814 | not viewed | not viewed |
| c16 | C16 main PCB (schematic 251788?) | [File:Commodore 16 Main PCB.jpg](https://commons.wikimedia.org/wiki/File:Commodore_16_Main_PCB.jpg) | `a/a2/Commodore_16_Main_PCB.jpg` | CC BY-SA 4.0 | CommodoreFriend | 1904x1017 | not viewed | not viewed |
| plus4 | Assy 310163 (silkscreen), schematic 310164 | [File:Plus4 main board.jpg](https://commons.wikimedia.org/wiki/File:Plus4_main_board.jpg) | `2/28/Plus4_main_board.jpg` | Public domain (`PD-self`) | Journey234 (courtesy) | 3150x1757 | flat, cut out, sharp | Yes (U2-U27, CN1-CN8) |
| c128 | Flat C128 board (matches the "C128 (flat)" entry) | [File:C128mobo.jpg](https://commons.wikimedia.org/wiki/File:C128mobo.jpg) | `0/03/C128mobo.jpg` | CC BY-SA 2.5 template; the description text says "CC-BY-2.5". See risks. | Bill Bertram | 2406x1600 | flat, cut out, sharp | Yes (U1-U68, CN1-CN12) |
| c1541 | Assy 250442 (1541A), PCB 251830 Rev A | [File:Commodore-64-1541-Floppy-Drive-Motherboard-01.jpg](https://commons.wikimedia.org/wiki/File:Commodore-64-1541-Floppy-Drive-Motherboard-01.jpg) | `b/bb/Commodore-64-1541-Floppy-Drive-Motherboard-01.jpg` | Public domain (`PD-self`) | Evan-Amos (courtesy) | 3980x2860 | angled about 15 degrees, sharp | Yes (UA1-UF4 grid) |
| c1541 (alt) | VC1541 long board | [File:Commodore VC1541 Mainboard.jpg](https://commons.wikimedia.org/wiki/File:Commodore_VC1541_Mainboard.jpg) | `0/0f/Commodore_VC1541_Mainboard.jpg` | GFDL / CC BY-SA 3.0 | MOS6502 | 1280x960 | not viewed | not viewed |
| pet | 3008 board | [File:CBM3008Platine 01 res.jpg](https://commons.wikimedia.org/wiki/File:CBM3008Platine_01_res.jpg) | `a/a3/CBM3008Platine_01_res.jpg` | CC BY-SA 3.0 | Phrontis | 800x600 | too small | No |
| pet (alt) | CBM board, model unclear | [File:Cbm-platine-og.jpg](https://commons.wikimedia.org/wiki/File:Cbm-platine-og.jpg) | `2/2e/Cbm-platine-og.jpg` | Public domain (`PD-release`) | Oguenther | 1120x840 | not viewed, low resolution | unlikely |
| c1571, c1581 | none found | | | | | | | |

## Apple

| Machine id | Board / revision | File page | Direct URL path | Licence | Attribution | Resolution | Top-down / sharp | Silk legible |
|---|---|---|---|---|---|---|---|---|
| apple2e | 820-0087-C, 607-0187-C (1986, enhanced 65C02) | [File:Apple IIe 1986 Mobo.png](https://commons.wikimedia.org/wiki/File:Apple_IIe_1986_Mobo.png) | `3/33/Apple_IIe_1986_Mobo.png` | CC0 (`self\|cc-zero`) | Nicolasfoster (courtesy) | 4000x5000 | flat, studio, very sharp | Yes (grid A-F / 1-14, C/R numbers, chip function labels) |
| apple2c | Main logic 820-0115-C (1983) | [File:Apple-IIc-Motherboard-Flat-Top.jpg](https://commons.wikimedia.org/wiki/File:Apple-IIc-Motherboard-Flat-Top.jpg) | `4/40/Apple-IIc-Motherboard-Flat-Top.jpg` | Public domain (`PD-self`) | Evan-Amos (courtesy) | 4560x4680 | flat, studio, very sharp | Yes (function names IWM, TMG, MMU, IOU, plus grid 1-19 / A-F) |
| apple2 | Original Apple II board, row/column grid A-J / 1-14; revision not readable | [File:Apple II motherboard (53171103722).jpg](https://commons.wikimedia.org/wiki/File:Apple_II_motherboard_(53171103722).jpg) | `7/75/Apple_II_motherboard_%2853171103722%29.jpg` | CC BY 2.0 (Flickr, reviewed) | Steve Jurvetson | 2610x3836 | nearly flat, slight tilt | Yes (row letters and part-type silk) |
| apple2plus | Apple II j-plus logic board (Japanese II Plus) | [File:Apple II j-plus Main Logic Board.jpeg](https://commons.wikimedia.org/wiki/File:Apple_II_j-plus_Main_Logic_Board.jpeg) | `d/d7/Apple_II_j-plus_Main_Logic_Board.jpeg` | CC BY-SA 3.0 | Sckop | 3803x6086 | not viewed | not viewed. The j-plus differs from US 820-0044 in the character ROM area. |
| apple2plus (alt) | II Plus in case with cards | [File:Apple-iiplus-inside.jpg](https://commons.wikimedia.org/wiki/File:Apple-iiplus-inside.jpg) | `4/4e/Apple-iiplus-inside.jpg` | CC BY 4.0 | Akbkuku | 4688x3856 | not viewed (cards fitted) | unlikely |
| disk2 | Disk II interface card | [File:Interface Card - Disk II Interface Apple2.jpg](https://commons.wikimedia.org/wiki/File:Interface_Card_-_Disk_II_Interface_Apple2.jpg) | `0/06/Interface_Card_-_Disk_II_Interface_Apple2.jpg` | CC BY-SA 4.0 | Erkaha | 1795x1346 | not viewed | not viewed |
| apple3, duodisk, unidisk525 | none found | | | | | | | |

## Atari

| Machine id | Board / revision | File page | Direct URL path | Licence | Attribution | Resolution | Top-down / sharp | Silk legible |
|---|---|---|---|---|---|---|---|---|
| atari800xl | 800XL main board, serial 72RHA AT8489594 | [File:Atari 800XL board top perspective fix (72RHA AT8489594 I-474).jpg](https://commons.wikimedia.org/wiki/File:Atari_800XL_board_top_perspective_fix_(72RHA_AT8489594_I-474).jpg) | `f/fd/Atari_800XL_board_top_perspective_fix_%2872RHA_AT8489594_I-474%29.jpg` | CC BY-SA 4.0; template asks for attribution "Multicherry" | Multicherry | 4701x2940 | flat (perspective-corrected), sharp | Yes (U1-U29, J1-J9) |
| atari800 | 800 motherboard (most logic is on the CPU, RAM and ROM cards) | [File:Atari-800-Motherboard-Flat-Top.jpg](https://commons.wikimedia.org/wiki/File:Atari-800-Motherboard-Flat-Top.jpg) | `0/03/Atari-800-Motherboard-Flat-Top.jpg` | Public domain (`PD-self`) | Evan-Amos (courtesy) | 3420x4590 | flat, studio | Partly; the card cage hides the top half |
| atari800 (CPU card) | 800 CPU card | [File:Atari-800-Expansion-Board-CPU.jpg](https://commons.wikimedia.org/wiki/File:Atari-800-Expansion-Board-CPU.jpg) | `3/3e/Atari-800-Expansion-Board-CPU.jpg` | Public domain | Evan-Amos | 4620x3270 | not viewed | not viewed |
| atari400 | 400 main board and daughterboard | [File:Atari 400 mainboard and daughterboard.png](https://commons.wikimedia.org/wiki/File:Atari_400_mainboard_and_daughterboard.png) | `9/93/Atari_400_mainboard_and_daughterboard.png` | CC BY-SA 4.0 | Knurrikowski | 1000x895 | too small | No |
| atari130xe | Chip close-ups only | [File:ANTIC chip on an Atari 130XE motherboard.jpg](https://commons.wikimedia.org/wiki/File:ANTIC_chip_on_an_Atari_130XE_motherboard.jpg) | `4/43/ANTIC_chip_on_an_Atari_130XE_motherboard.jpg` | CC BY-SA 3.0 | Rod Castler | 2484x1137 | partial board | n/a |
| atari600xl | none found | | | | | | | |

## Coleco

| Machine id | Board / revision | File page | Direct URL path | Licence | Attribution | Resolution | Top-down / sharp | Silk legible |
|---|---|---|---|---|---|---|---|---|
| colecovision | PCB 75743 Rev H2-1 (1982, NTSC) | [File:ColecoVision-Motherboard-Top.jpg](https://commons.wikimedia.org/wiki/File:ColecoVision-Motherboard-Top.jpg) | `9/9f/ColecoVision-Motherboard-Top.jpg` | Public domain (`PD-self`) | Evan-Amos (courtesy) | 3940x3224 | flat, studio, very sharp | Yes (U1-U26, J1-J6) |
| colecovision (alt) | unknown | [File:ColecoVision Board top-side.jpg](https://commons.wikimedia.org/wiki/File:ColecoVision_Board_top-side.jpg) | `1/15/ColecoVision_Board_top-side.jpg` | CC BY-SA 3.0 | DrWhatIKnow | 2000x3008 | not viewed | not viewed |
| adam | none found | | | | | | | |

## Sinclair and Timex

| Machine id | Board / revision | File page | Direct URL path | Licence | Attribution | Resolution | Top-down / sharp | Silk legible |
|---|---|---|---|---|---|---|---|---|
| spectrum | Issue 4B (silkscreen) | [File:Sinclair ZX Spectrum Issue 4B Motherboard.jpg](https://commons.wikimedia.org/wiki/File:Sinclair_ZX_Spectrum_Issue_4B_Motherboard.jpg) | `3/39/Sinclair_ZX_Spectrum_Issue_4B_Motherboard.jpg` | Public domain (Flickr Public Domain Mark, `PD-author-FlickrPDM`) | AUIC Oficial, photo by Fernando Sáenz (courtesy) | 5393x3248 | flat, in case, sharp; the heatsink hides the CPU and ROM | Yes (IC15-IC25, C, R) |
| spectrum (alt) | Issue 1 | [File:Sinclair ZX Spectrum Issue 1 Motherboard.jpg](https://commons.wikimedia.org/wiki/File:Sinclair_ZX_Spectrum_Issue_1_Motherboard.jpg) | `8/89/Sinclair_ZX_Spectrum_Issue_1_Motherboard.jpg` | Public domain (Flickr PDM) | AUIC Oficial / Fernando Sáenz | 5269x3358 | not viewed | not viewed |
| spectrum (alt) | Issue 6A (Spectrum+) | [File:Sinclair ZX Spectrum Plus main board Issue 6A (1984) 48K.jpg](https://commons.wikimedia.org/wiki/File:Sinclair_ZX_Spectrum_Plus_main_board_Issue_6A_(1984)_48K.jpg) | `9/93/Sinclair_ZX_Spectrum_Plus_main_board_Issue_6A_%281984%29_48K.jpg` | CC BY-SA 2.5 | Powerhp (it.wikipedia) | 2576x1932 | not viewed | not viewed |
| spectrumplus2 / spectrumplus3 | Z70833 Issue 1 (+2B; the board family of the +2A/+3) | [File:Sinclair ZX Spectrum +2B Z70833 Issue 1 Motherboard.jpg](https://commons.wikimedia.org/wiki/File:Sinclair_ZX_Spectrum_%2B2B_Z70833_Issue_1_Motherboard.jpg) | `b/bb/Sinclair_ZX_Spectrum_%2B2B_Z70833_Issue_1_Motherboard.jpg` | Public domain (Flickr PDM) | AUIC Oficial / Fernando Sáenz | 4994x2796 | not viewed | not viewed. Grey +2 boards (Z70500) are a different design. |
| zx81 | Issue 3 (silkscreen "ISS 3") | [File:Sinclair ZX81 PCB Revision 3.JPG](https://commons.wikimedia.org/wiki/File:Sinclair_ZX81_PCB_Revision_3.JPG) | `3/31/Sinclair_ZX81_PCB_Revision_3.JPG` | CC BY-SA 4.0 | Binarysequence | 3648x2736 | slight angle, sharp | Yes (IC1-IC4A/B, R, C) |
| zx81 (alt) | unknown issue | [File:SinclairZX81PCB.jpg](https://commons.wikimedia.org/wiki/File:SinclairZX81PCB.jpg) | `b/b6/SinclairZX81PCB.jpg` | CC BY-SA 2.0 | liftarn | 3072x2304 | not viewed | not viewed |
| ts1000 | Silkscreen reads "Sinclair ZX81 ISS 3" (a Timex unit with one 2K RAM) | [File:Timex Sinclair 1000 Motherboard Top.jpg](https://commons.wikimedia.org/wiki/File:Timex_Sinclair_1000_Motherboard_Top.jpg) | `8/86/Timex_Sinclair_1000_Motherboard_Top.jpg` | Public domain (`PD-self`) | MarcoTangerino (courtesy) | 3232x3067 | flat, cut out, sharp | Yes. Check against the "TS1000 main PCB" schematic before use. |
| zx80 | ZX80 board | [File:ZX80 platine.jpg](https://commons.wikimedia.org/wiki/File:ZX80_platine.jpg) | `a/a3/ZX80_platine.jpg` | CC BY-SA 4.0 | Joho345 | 724x725 | too small | No |
| spectrum128, ts1500, ts2068 | none found | | | | | | | |

## Texas Instruments

| Machine id | Board / revision | File page | Direct URL path | Licence | Attribution | Resolution | Top-down / sharp | Silk legible |
|---|---|---|---|---|---|---|---|---|
| ti994a | Rendered **illustration** of the board with numbered callouts, not a photo | [File:TI99-4A Motherboard.jpg](https://commons.wikimedia.org/wiki/File:TI99-4A_Motherboard.jpg) | `a/a2/TI99-4A_Motherboard.jpg` | CC BY-SA 3.0 DE (`Bild-CC-by-sa/3.0/de`, VRT/OTRS permission ticket 2014110510005171) | Ron Reuter (mainbyte.com) | 2500x999 | flat | No designators; it has callout numbers 1-15 instead |
| ti994 | none found | | | | | | | |

## Tandy / TRS-80 and Dragon

| Machine id | Board / revision | File page | Direct URL path | Licence | Attribution | Resolution | Top-down / sharp | Silk legible |
|---|---|---|---|---|---|---|---|---|
| model1 | Model I CPU board, serial 112788 | [File:Radio Shack Tandy TRS-80 Model I PCB.JPG](https://commons.wikimedia.org/wiki/File:Radio_Shack_Tandy_TRS-80_Model_I_PCB.JPG) | `b/b6/Radio_Shack_Tandy_TRS-80_Model_I_PCB.JPG` | CC BY-SA 4.0 | Binarysequence | 3547x2036 | slight angle; the keyboard sits in front and a ribbon cable covers about 10% | Yes (Z1-Z76) |
| dragon32 | PC10087, "CPU UK 32K MK II", Side 2 Issue 5 | [File:Dragon32 PCB Top (PC10087 Issue5).jpg](https://commons.wikimedia.org/wiki/File:Dragon32_PCB_Top_(PC10087_Issue5).jpg) | `3/37/Dragon32_PCB_Top_%28PC10087_Issue5%29.jpg` | **GFDL 1.2 only** | Roberto Carlos Fernández Gerhardt | 3180x2000 | flatbed scan, very sharp | Yes (IC1-IC35, PL1-PL7) |
| dragon32 (alt) | Issue 4 board | [File:DragonDataLtd Iss4 48256 PCB Top.jpg](https://commons.wikimedia.org/wiki/File:DragonDataLtd_Iss4_48256_PCB_Top.jpg) | `8/85/DragonDataLtd_Iss4_48256_PCB_Top.jpg` | GFDL 1.2 only | Roberto Carlos Fernández Gerhardt | 3130x1408 | not viewed | not viewed |
| coco1, coco2, coco3, mc10, model3, model4, dragon64 | none found | | | | | | | |

## Heathkit

No board photos found. Commons has only `File:Heathkit HERO Jr.jpg` (CC BY-SA 2.0, exterior). hero1, herojr and hero2000 have no photo.

## IBM

| Machine id | Board / revision | File page | Direct URL path | Licence | Attribution | Resolution | Top-down / sharp | Silk legible |
|---|---|---|---|---|---|---|---|---|
| pc5150 | 16KB-64KB CPU (silkscreen; matches the schematics entry) | [File:IBM PC Motherboard (1981).jpg](https://commons.wikimedia.org/wiki/File:IBM_PC_Motherboard_(1981).jpg) | `5/57/IBM_PC_Motherboard_%281981%29.jpg` | CC BY-SA 3.0 | German (Commons user) | 3206x2294 | flat, sharp | Yes (U1-U101) |
| xt5160 | 64-256KB System Board (silkscreen) | [File:IBM XT 5160 motherboard.jpg](https://commons.wikimedia.org/wiki/File:IBM_XT_5160_motherboard.jpg) | `9/9e/IBM_XT_5160_motherboard.jpg` | CC BY-SA 4.0 | Mister_rf | 3600x2600 | flat, studio, sharp | Yes (U1-U98, banks 0-3) |
| portable5155 | 64-256KB System Board (the XT board fitted in the 5155) | [File:Motherboard (54216337134).jpg](https://commons.wikimedia.org/wiki/File:Motherboard_(54216337134).jpg) | `8/8b/Motherboard_%2854216337134%29.jpg` | **CC BY 2.0** (Flickr, reviewed; no share-alike) | tony_duell | 3648x2736 | angled, bench background | Mostly. A CC BY fallback for xt5160 too. |
| pcjr | PCjr system board | [File:IBM PCB Jr Motherboard.jpg](https://commons.wikimedia.org/wiki/File:IBM_PCB_Jr_Motherboard.jpg) | `f/f9/IBM_PCB_Jr_Motherboard.jpg` | CC BY-SA 4.0 | Binarysequence | 4224x3264 | flat, sharp, rotated 180 degrees | Chip markings yes; few reference designators printed |
| pcjr (alt) | teardown | [File:IBM PC Jr Teardown.jpg](https://commons.wikimedia.org/wiki/File:IBM_PC_Jr_Teardown.jpg) | `5/51/IBM_PC_Jr_Teardown.jpg` | CC0 | eevblog | 4912x2134 | not viewed | not viewed |
| convertible5140 | none found | | | | | | | |

## Amstrad, Acorn, MSX, Oric

| Machine id | Board / revision | File page | Direct URL path | Licence | Attribution | Resolution | Top-down / sharp | Silk legible |
|---|---|---|---|---|---|---|---|---|
| cpc6128 | Board visible with keyboard removed, in case | [File:Amstrad CPC6128, keyboard removed.jpg](https://commons.wikimedia.org/wiki/File:Amstrad_CPC6128,_keyboard_removed.jpg) | `e/e6/Amstrad_CPC6128%2C_keyboard_removed.jpg` | CC BY 2.0 | Jesus Abizanda | 2560x1920 | not viewed (likely angled) | unknown |
| oric1 | Oric-1 board | [File:Oric1 mb.jpg](https://commons.wikimedia.org/wiki/File:Oric1_mb.jpg) | `6/66/Oric1_mb.jpg` | "PD-author", no permission ticket (weak) | Tiziano Garuti (1000bit.net) | 1127x748 | low resolution | unlikely |
| cpc464, cpc664, bbcb, bbcmaster, electron, msx1, msx2, atmos | none found on Commons | | | | | | | |

## Coverage summary

- **Usable now** (checked by eye: board fills the frame, silkscreen readable, licence fits): 18 machines. These are c64, vic20, plus4, c128, c1541, apple2, apple2e, apple2c, atari800 (partial), atari800xl, colecovision, spectrum, zx81, ts1000, dragon32 (GFDL), pc5150, xt5160 and portable5155. pcjr and model1 are usable with limits (few designators; partly covered).
- **Candidates not yet checked by eye**: c16, apple2plus (j-plus), disk2, spectrumplus2/spectrumplus3 (Z70833), c64 alternates, colecovision alt, cpc6128.
- **Nothing usable**: about 30 ids. These are pet, c1571, c1581, apple3, duodisk, unidisk525, atari400, atari600xl, atari130xe, adam, zx80, spectrum128, ts1500, ts2068, ti994a, ti994, coco1-3, mc10, dragon64, model3, model4, all three Heathkit ids, convertible5140, all Amstrad, all Acorn, both MSX ids, oric1 and atmos. The ti994a file is an illustration, not a photo.

## Shortlist for a first build (10)

Reduced copies (1920 px wide) are in `P:/retro-bench/.tmp/photos/`.

| # | Machine id | File | Licence | Why |
|---|---|---|---|---|
| 1 | c64 | 0430 - C64 Mainboard ASSY250407 RevB.jpg | CC BY-SA 4.0 | Assy 250407 matches schematics; every U/R/C label is readable |
| 2 | apple2e | Apple IIe 1986 Mobo.png | CC0 | Studio flat shot, 820-0087-C, grid coordinates printed on board |
| 3 | apple2c | Apple-IIc-Motherboard-Flat-Top.jpg | Public domain | 820-0115-C, studio flat, function labels on the silkscreen |
| 4 | colecovision | ColecoVision-Motherboard-Top.jpg | Public domain | Flat studio shot, U1-U26 clear |
| 5 | c128 | C128mobo.jpg | CC BY-SA 2.5 (see risk) | Flat C128 board cut out, all designators readable |
| 6 | xt5160 | IBM XT 5160 motherboard.jpg | CC BY-SA 4.0 | 64-256KB board, flat, very sharp |
| 7 | pc5150 | IBM PC Motherboard (1981).jpg | CC BY-SA 3.0 | 16KB-64KB CPU board as in schematics, flat |
| 8 | plus4 | Plus4 main board.jpg | Public domain | Assy 310163, flat, cut out |
| 9 | atari800xl | Atari 800XL board top perspective fix (...).jpg | CC BY-SA 4.0 | Perspective already corrected, U-numbers clear |
| 10 | spectrum | Sinclair ZX Spectrum Issue 4B Motherboard.jpg | Public domain (Flickr PDM) | Issue 4B named in silkscreen; heatsink hides IC1-IC4 area |

Next best: dragon32 (best scan of all, but GFDL-only), vic20 (PD, wires over the board), zx81 (Iss 3, CC BY-SA 4.0), c1541 (PD, angled), apple2 (CC BY 2.0).

## Licence notes

- **Public domain / CC0** (apple2e, apple2c, colecovision, plus4, spectrum, vic20, ts1000, c1541, atari800): no conditions. Credit the photographer anyway, as the project credits all sources.
- **CC BY 2.0 / 4.0** (apple2, portable5155, c64 alt, cpc6128): give the author, a link to the licence, and the source link, and say if the image was changed (cropped, scaled, perspective-corrected).
- **CC BY-SA 2.0 / 2.5 / 3.0 / 4.0** (c64, c128, xt5160, pc5150, atari800xl, zx81, pcjr, model1): same as CC BY, plus share-alike. The photo and any **adapted** version of it must stay under the same (or a compatible later) BY-SA licence. If the app shows the photo with a separate highlight overlay drawn at runtime, the photo is unchanged, so this is a collection, not an adaptation. The app code and other data stay MIT / CC BY 4.0. If the build bakes the highlights into the image, or crops or warps it, that derived image must be BY-SA. Keep the photos in their own folder with their own licence notice.
- **GFDL 1.2 only** (dragon32): the full GFDL text must ship with the app, plus a history/attribution section. That is heavy for an offline PWA. Prefer to ask the author (Roberto Carlos Fernández Gerhardt, Dragon Archive) for a CC BY-SA release, or skip it.
- **CC BY-SA 3.0 DE** (ti994a): the German port. Not a photo anyway.
- **Attribution string format** for the credits screen: `"<title>" by <author>, <licence>, via Wikimedia Commons, <file page URL>`, plus "cropped / scaled" when the image was changed.

## Risks

1. **Share-alike**. 8 of the top 25 photos are BY-SA. This is safe only if the overlay is drawn at runtime and the photo files are labelled BY-SA. The user must decide whether BY-SA images are acceptable in the repo and in the built app.
2. **C128 licence conflict**. The file page template says CC BY-SA 2.5; the author's own text on the same page says "CC-BY-2.5 — Attribution". Treat it as BY-SA 2.5 (the stricter reading) unless Bill Bertram confirms.
3. **Flickr Public Domain Mark** (spectrum, +2B). The PDM is a label, not a legal waiver. Commons accepts it under `PD-author-FlickrPDM` because the author wrote "Public Domain Work". Low risk; credit AUIC / Fernando Sáenz anyway.
4. **Oric-1 "PD-author"** has no permission ticket. Do not use without confirmation from 1000bit.net.
5. **Mixed or uncertain revisions**:
   - The VIC-20 photo shows no assy number.
   - The ts1000 photo carries "Sinclair ZX81 ISS 3" silkscreen.
   - The apple2plus photo is the Japanese j-plus.
   - The +2B photo (Z70833) fits the +2A/+3 entries, not a grey +2 (Z70500).
   - The apple2 photo's revision is not readable.

   Designator coordinates must be tied to the board/rev of the photo, not to the machine in general.
6. **Missing or poor designators**:
   - ti994a is an illustration with callout numbers.
   - pcjr prints few reference designators.
   - On the Spectrum 4B, the heatsink covers the ROM and CPU.
   - On atari800, the card cage covers the top.
   - On model1, a ribbon cable covers part of the board.
7. **Angled photos** (c1541, portable5155, zx81, model1) need a perspective correction before hotspot coordinates are mapped. A corrected copy is an adaptation (see the BY-SA note).
8. **Coverage gaps**. About half the machines, including all Amstrad, Acorn, MSX, CoCo and Heathkit, have no free photo on Commons. Options: a key-based Flickr CC search, asking owners (e.g. a CPCWiki or stardot member) for a CC BY release, or photographing boards the user owns.
