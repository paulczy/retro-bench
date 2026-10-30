# Schematics, layouts and service manuals: 2026-10-30

`src/data/schematics.js` now holds 259 link entries for all 47 machines: Commodore 79, Sinclair 46, Tandy 26,
Apple 24, IBM 23, Heathkit 14, Atari 12, TI 9, Acorn 8, Timex 7, Coleco 6 and Amstrad 5. Each entry links to
one document (a schematic, a layout, a service manual or a parts list), and the app groups them by `board`. No
drawing was downloaded into the repo.

Every URL was fetched once on 2026-10-30 and returned 200, or 206 to a ranged GET. Two hosts need browser
headers: bitsavers wants `-A "Mozilla/5.0"`, and minuszerodegrees.net answers 406 unless the request also sends
`Accept` and `Accept-Language`. `node scripts/validate-data.mjs` reports 0 FAIL.

A `verify: true` entry means the link works, but which assembly or board issue the document draws is not
confirmed.

## Per machine

### Commodore (zimmers.net, archive.org Sams, bwack on GitHub)
- **pet**: Schematics for all four static 2001 boards: 320008 (6540 ROMs, 6550 RAM), 320081, 320132 and 320137. Also the 2001 video board, the dynamic board 320349 (2001N, 3000 and 9-inch 4000) with its layout and parts list, the 8032 board 8032029, universal boards 8032081 and 8032087 with layout, the 8096 64K card (a redraw) and the 8296 board 324644. Manuals: 4016/4032 technical reference, 8032 tech manual, the 40xx/80xx training manual and the 8296 service manual.
- **vic20**: The original-board Version E schematic, the PRG schematic, PAL 324001-03 rev B, NTSC 324001-02, and VIC-20CR schematic 251027 rev D (the board is 250403 according to C64-Wiki), plus the technical manual, a parts list and the VIC-1001. Not confirmed: zimmers calls 324001-02 a "CR" board, and I could not settle that 251027 is the schematic for assy 250403.
- **c64**: Every assembly is covered. 326298 (schematic 326106 with layout and parts list), KU-14194HB (bwack's KiCad replica schematic and interactive layout; Commodore never published one), 250407 (251138 with layout and parts list), 250425 (251469 with layout and parts list), 250466 (252278) and 250469 rev A (252312 and Falk Brunner's PDF) and rev B (252311). Also the 1985 and 1992 service manuals, the diagnostic manual and Sams CC4, CC17 and CC20. Which board each Sams folder draws is marked verify.
- **c16**: The C16 schematic 251788 (3 sheets), the C16 service manual, the C116 schematic 251239, a parts list and Sams CC8. I found no PCB assembly number for the C16 in any source, so the board is named by its schematic number.
- **plus4**: Schematic 310164 (4 sheets) and a Hungarian magazine scan, the service manual, Techtopics troubleshooting, a parts list and Sams CC9.
- **c128**: Schematic 310378 for the flat C128 and plastic C128D, with the rev 7A update, the C128DCR schematic (a 64'er copy of 252451, marked verify), the 1987 service manual, two diagnostic manuals, a parts list and Sams CC18 and CSCS25. The PCB assembly numbers are not on any drawing found.

### Apple (mirrors.apple2.org.za, archive.org)
- **apple2 / apple2plus**: Apple schematics (which Rev 0 to 7 board they draw is not confirmed), the 1981 Level II service manual, the Technical Procedures volumes and Sams II/II Plus. I found no assembly number online.
- **apple2e**: Schematics 050-0051-D (NTSC) and 050-0054-A (international), the 1989 repair procedures and Sams (board 820-0064-A). I found no separate drawing for the Platinum IIe.
- **apple2c**: One schematic in two scans, the 1988 repair procedures and Sams. I could not tell whether it draws the original board or the memory-expandable one.
- **apple3**: Main logic 050-0039-H, the memory boards, the 5V memory board and the power supply, plus the 1982 service reference, the 1980 rework sheets and the 1989 procedures. I found nothing for the III Plus.

### Atari (archive.org)
- **atari400 / atari800**: The May 1983 Field Service Manual (motherboard, personality, CPU and RAM board schematics and silkscreens), the 1981 System Service Manual and Sams. No document tells the early CTIA CPU board from the later GTIA board.
- **atari600xl**: Field Service Manual Rev 1 only. No Sams folder found.
- **atari800xl**: The FSM Rev 01, Sams and a third-party service manual.
- **atari130xe**: Sams and a community redraw only. I found no Atari FSM, and nothing for the 65XE.
- atariarchives.org has no service manuals, and AtariAge answers curl with 403, so neither is linked.

### Coleco (adamarchive.org, colecovision.dk)
- **colecovision**: Coleco's repair technical manual (a zip with a schematics section) and the colecovision.dk schematic. I found no PAL board drawing, no assembly numbers and no Sams folder.
- **adam**: Drushel's restored schematic set (a zip covering the Gamma logic, Delta game, buffer, disk and 64K expander boards) and Coleco's repair guides. Not found: the printer power supply.

### Sinclair (spectrumforeveryone.com, zxnet.co.uk, k1.spdns.de, archive.org Ferranti collection)
- **zx80**: One circuit diagram (issue not stated) and the kit manual.
- **zx81**: Issue 1 has a schematic, layout, service manual and parts list. **No drawing found for the common Issue 3 board** other than one user-group redraw marked verify.
- **spectrum**: Issues 1, 2, 3, 3B, 4A/4B, 5 and 6A each have a schematic and a layout, except that 4B shares the 4A layout. Also the Ferranti originals for Issues 2, 3 and 6A, and two service manuals.
- **spectrum128**: Issue 6U digital and analogue schematics, and the service manual with its foil layout and parts list. Two pre-launch Ferranti sheets are marked verify.
- **spectrumplus2** (grey): Z70500 Issue 3 main and power schematics and the service manual. No layout found.
- **spectrumplus3**: Z70830 (+3 and black +2A), Z70833 Issue 1 and 2 (+2B), Z70835 (+3B) and both Amstrad service manuals. The black +2A/+2B boards are listed here because the app's `spectrumplus2` is the grey machine. I found no drawing for Z70833 Issue 4.
- worldofspectrum.org's old technical-docs tree now returns 404/403, so none of these links use it.

### Timex (archive.org, timexsinclair.com)
- **ts1000**: Only a book with the full circuit diagram (verify). I found no Timex factory schematic or layout.
- **ts1500**: Two user-group newsletter schematics (verify). I found no factory drawing or layout.
- **ts2068**: The factory schematic (as a PDF and as an image), the technical manual with schematics, and Sams CC19.

### Texas Instruments (whtech.com, archive.org)
- **ti994a**: For the non-QI board MP 1039026: the Oct 1983 servicing manual (schematics and layout), a placement drawing, the 99/4B schematic segments, the technical data 1049717-2 and Sams CC2. For the QI board: the 99/4QI servicing manual. There is no standalone QI layout.
- **ti994**: The console specification with schematic, the 99/4 package in the servicing manual, and the technician guide.

### Tandy (colorcomputerarchive.com, dragondata.worldofdragon.org, archive.org)
- **coco1**: Service manual 26-3001/3002 with schematic 8000073 (A to D boards; which letter it draws is not confirmed), the 1982 redesign schematic 8000144 (taken to be the E board, verify), an F board capacitor list and Sams. **No Tandy schematic found for the F board.**
- **coco2**: For 26-3026/3027 (PCB 8857636), a matching manual and schematic. For 26-3134/3136, the manual and the NTSC schematic. Also a Rev A schematic for 3134A/3136A, a PAL schematic and Sams. **No document found for the Korean 26-3127 or the 26-3134B/3136B boards** (the ones with the 6847T1 and lowercase).
- **coco3**: The 26-3334 service manual (two scans), Ty Sopko's redraw and the diagnostics manual.
- **mc10**: NTSC and PAL service manuals, the fold-out schematic and a standalone schematic.
- **dragon32**: Two SA2120 schematic zips, the SA, Siemens and OKI sheet sets, and the Dragon Data internal repair notes (board ID drawings on p. 14). No document says how to tell the Siemens and OKI builds apart on the PCB. colorcomputerarchive has no Dragon service manual.

### Heathkit (archive.org)
- **hero1**: The full ET-18 set: four schematic sheets, the motion board, the interconnect diagram, the technical manual and the illustration booklet.
- **herojr**: Schematics 595-3271, the technical manual and the illustrations.
- **hero2000**: Schematic diagrams 595-3416, illustration booklet 595-3414 and the IC data. I found no technical manual.

### IBM (minuszerodegrees.net, bitsavers, archive.org)
- **pc5150**: The 16KB-64KB board is in the Aug 1981 Technical Reference (p. D-2), and the 64KB-256KB board is in the Apr 1984 edition (p. 1-37). Also linked: the Apr 1983 edition (verify), the 1981 HMS and the parts catalog.
- **xt5160**: The 64-256KB board is in the Apr 1983 and Apr 1984 Technical References. Both boards are in the Mar 1986 edition (p. 1-34 and 1-46). Also linked: the HMS and the parts catalog.
- **portable5155**: Uses the XT 64-256KB board, so it links the Mar 1986 reference, plus the Portable HMS, the repair information and the parts catalog.
- **pcjr**: The Technical Reference (two scans, marked verify because the logic pages were not opened) and the HMS.
- **convertible5140**: Technical Reference volumes 1 and 2 and the HMS. I could not confirm board logic diagrams, so these are marked verify.

### Amstrad (planned machines; archive.org)
- **cpc464, cpc664, cpc6128**: Amstrad service manuals and the amendment for the later 40226 board. I could not confirm the Z70xxx/MC00xx assembly numbers, so all entries are marked verify. cpcwiki.eu and grimware answer curl with 403 even with a browser user agent, so their board-revision pages are not linked.

### Acorn (planned machines; chrisacorns.computinghistory.org.uk, bitshifters on GitHub)
- **bbcb**: The Oct 1985 service manual (it lists the Issue 1 to 7 changes) and a one-sheet circuit diagram, probably Issue 7 (verify). There are no separate drawings for Issues 3 or 4. bbc.nvg.org did not respond.
- **bbcmaster**: The Master service manual, the main PCB circuit diagram 0143,000 and the technical drawings zip.

## Nothing online for

- C64 KU-14194HB: no Commodore drawing; bwack's replica is the only one.
- ZX81 Issue 3, apart from one user-group redraw.
- TS1000 and TS1500: no factory drawings.
- Spectrum +2B Z70833 Issue 4, and a layout for the grey +2.
- CoCo 1 F board, and the CoCo 2 26-3127 and 26-3134B/3136B boards.
- Atari 65XE, and an Atari FSM for the 130XE.
- ColecoVision PAL board.
- Apple IIe Platinum and Apple III Plus drawings.
- HERO 2000 technical manual.

## Notes

- The zip entries (ColecoVision, ADAM, Dragon 32, BBC Master and the C128 update) link to archives, not to single drawings.
- The existing credit for Ray Carlsen, `http://personalpages.tds.net/~rcarlsen/`, no longer resolves. I left it in place because I have no confirmed replacement.
