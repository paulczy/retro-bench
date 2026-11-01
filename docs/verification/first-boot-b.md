# First-boot checks, set B

Scope: `boot` and `firstBoot` in the quickref of every non-planned machine in `tandy.js`, `heathkit.js`, `ibm.js`,
`amstrad.js`, `acorn.js`, `dragon.js`, `msx.js` and `oric.js` (25 machines, 149 checks). The planned HERO 2000 and
IBM Convertible have no quickref and were skipped.

Method: every manual was downloaded and read page by page (text layer where it had one, page images where it did
not). Each check cites the page that shows both what to type and what a working machine shows. Labels carry the
printed page; the link carries the PDF page (`#page=N`, or `/page/nN` = PDF page N+1 on archive.org viewer links).
No Classic Repair Toolbox or Commodore Repair Toolbox material was used. Nothing was taken from memory.

Marked `verify` (2): BBC Master `boot` (the startup text is not printed in the manual), Dragon 64 check 1 (banner
taken from the Dragon 32 manual).
Marked `conflict` (2): CPC6128 sound (239 vs 478 for middle C), Model 4 check 1 (date format DD/MM/YY vs mm/dd/yy
in the same manual).

Sources used:
- Tandy: Getting Started With Color BASIC (1980 and Color Computer 2 editions), Getting Started With Extended Color
  BASIC (1984), Color Computer and Color Computer 2 Operation Manuals, Color Computer 3 Extended BASIC (1986), MC-10
  Operation and Language Reference Manual (colorcomputerarchive.com); Level II BASIC Reference Manual (1979), Model III
  Operation and BASIC Language Reference Manual (1980), Model III Disk System Owner's Manual (1980), Model 4 Disk System
  Owner's Manual (1983) (archive.org).
- Heathkit: ET-18 Technical Manual (Operation Check and Initial Tests, pp. 54-58); HERO Jr Owner's Guide (archive.org).
- IBM: Guide to Operations, revised April 1984 (PC and PC XT); 5155 Guide to Operations (Jan 1984, minuszerodegrees);
  PCjr Guide to Operations 6322959 (archive.org).
- Amstrad: CPC464 User Manual (transcribed), CPC664 and CPC6128 User Instructions (archive.org scans).
- Acorn: BBC Microcomputer System User Guide (1984), Master Reference Manual Part 1, Acorn Electron User Guide.
- Dragon: Dragon 32 Introduction to BASIC Programming, Dragon 64 Supplement (dragondata.worldofdragon.org).
- MSX: MSX Technical Data Book (ASCII, 1984), MSX2 Technical Handbook (ASCII, transcription).
- Oric: Oric-1 BASIC Programming Manual, Oric Atmos manual (defence-force.org).

### Color Computer 1 (`coco1`)

- Boot: Color BASIC (Extended Color BASIC when the Extended ROM is fitted), prompt "OK". Getting Started With Color BASIC (Radio Shack, 1980), To Get Started, p. 2 (PDF p. 6)
- 1. Video: `Power on with no cartridge`. Getting Started With Color BASIC (Radio Shack, 1980), To Get Started, p. 2 (PDF p. 6); also Getting Started With Extended Color BASIC (Tandy, 1984), This Is How to Start (unnumbered page) (PDF p. 7)
- 2. Video: `CLS(3)`. Getting Started With Color BASIC (Radio Shack, 1980), It's a Show Off, Too, p. 12 (PDF p. 16)
- 3. Color: `NEW, then 5 FOR X = 0 TO 63 / 10 FOR Y = 0 TO 31 / 15 C = INT(X/8 + 1) / 20 SET(X,Y,C) / 25 NEXT Y, X / 30 GOTO 30, then RUN`. TRS-80 Color Computer Operation Manual (Radio Shack), Color Adjustment Test, p. 24 (PDF p. 25)
- 4. Sound: `SOUND 1, 100`. Getting Started With Color BASIC (Radio Shack, 1980), Computer Sound Off, p. 13 (PDF p. 17)
- 5. Keyboard: `SHIFT + 0, then type a few letters`. TRS-80 Color Computer Operation Manual (Radio Shack), Using the Keyboard, p. 18 (PDF p. 19)
- 6. RAM: `PRINT MEM`. Getting Started With Extended Color BASIC (Tandy, 1984), For Long Programs, p. 76 (PDF p. 79)
- 7. Graphics (Extended BASIC): `5 PMODE 1,1 / 10 PCLS / 20 SCREEN 1,1 / 30 PSET(10,20,8) / 40 GOTO 40, then RUN`. Getting Started With Extended Color BASIC (Tandy, 1984), ch. 14 Let's Get to the Point, p. 85 (PDF p. 88)
- 8. Joystick: `PRINT JOYSTK(0) with the right joystick at full left, then at full right`. Getting Started With Extended Color BASIC (Tandy, 1984), If You Have the Joysticks, pp. 129-130 (PDF p. 132)
- Not proven: PRINT MEM: the book says it prints free memory but gives no figure for a CoCo 1, so the check has no target number. The Extended BASIC banner line comes from the 1984 Extended BASIC book, which is written for the CoCo 2 and Deluxe; the CoCo 1 book shows only the Color BASIC banner.

### Color Computer 2 (`coco2`)

- Boot: Color BASIC (Extended Color BASIC when the Extended ROM is fitted), prompt "OK". Getting Started With Color BASIC, Color Computer 2 edition (Tandy), To Get Started (unnumbered page) (PDF p. 6)
- 1. Video: `Power on with no cartridge`. Getting Started With Color BASIC, Color Computer 2 edition (Tandy), To Get Started (unnumbered page) (PDF p. 6); also Getting Started With Extended Color BASIC (Tandy, 1984), This Is How to Start (unnumbered page) (PDF p. 7)
- 2. Video: `CLS(7)`. Getting Started With Extended Color BASIC (Tandy, 1984), ch. 1, p. 17 (PDF p. 20)
- 3. Color: `NEW, then 5 FOR X = 0 TO 63 / 10 FOR Y = 0 TO 31 / 15 C = INT(X/8 + 1) / 20 SET(X,Y,C) / 25 NEXT Y, X / 30 GOTO 30, then RUN`. TRS-80 Color Computer 2 Operation Manual (Tandy), Color Adjustment Test, p. 24 (PDF p. 25)
- 4. Sound: `SOUND 1, 100`. Getting Started With Extended Color BASIC (Tandy, 1984), Computer Sound Off, p. 17 (PDF p. 20)
- 5. Keyboard: `SHIFT + 0, then type a few letters`. TRS-80 Color Computer 2 Operation Manual (Tandy), Using the Keyboard, p. 18 (PDF p. 19)
- 6. RAM: `PRINT MEM`. Getting Started With Extended Color BASIC (Tandy, 1984), For Long Programs, p. 76 (PDF p. 79)
- 7. Graphics (Extended BASIC): `5 PMODE 1,1 / 10 PCLS / 20 SCREEN 1,1 / 30 PSET(10,20,8) / 40 GOTO 40, then RUN`. Getting Started With Extended Color BASIC (Tandy, 1984), ch. 14 Let's Get to the Point, p. 85 (PDF p. 88)
- 8. Joystick: `PRINT JOYSTK(0) with the right joystick at full left, then at full right`. Getting Started With Color BASIC, Color Computer 2 edition (Tandy), joystick program, p. 85 (PDF p. 90)
- Not proven: PRINT MEM has no target number (same as the CoCo 1).

### Color Computer 3 (`coco3`)

- Boot: Extended Color BASIC (Color Computer 3 version), prompt "OK". Color Computer 3 Extended BASIC (Tandy, 1986), ch. 1 This Is How to Start, p. 3 (PDF p. 12)
- 1. Video: `Power on with no cartridge`. Color Computer 3 Extended BASIC (Tandy, 1986), ch. 1 This Is How to Start, p. 3 (PDF p. 12)
- 2. Color: `CLS8 (on an RGB monitor, type PALETTE RGB first)`. Color Computer 3 Extended BASIC (Tandy, 1986), ch. 1 The CLS Command, pp. 8-9 (PDF p. 17)
- 3. Sound: `SOUND 1,100`. Color Computer 3 Extended BASIC (Tandy, 1986), ch. 1 The SOUND Command, p. 10 (PDF p. 19)
- 4. GIME text modes: `WIDTH 40, then WIDTH 80, then WIDTH 32`. Color Computer 3 Extended BASIC (Tandy, 1986), ch. 7 The WIDTH Command, p. 45 (PDF p. 54)
- 5. RAM: `PRINT MEM, right after power on`. Color Computer 3 Extended BASIC (Tandy, 1986), ch. 39 For Long Programs (MEM), p. 226 (PDF p. 243)
- 6. Keyboard: `SHIFT + 0, then type a few letters`. Color Computer 3 Extended BASIC (Tandy, 1986), ch. 1 Using the Keyboard, pp. 3-4 (PDF p. 12)
- 7. Joystick: `PRINT JOYSTK(0) with the right joystick at full left, then at full right`. Color Computer 3 Extended BASIC (Tandy, 1986), ch. 19 Joysticks, pp. 115-116 (PDF p. 124)
- Not proven: Nothing. All checks are from the CoCo 3 Extended BASIC manual. The 24872 figure is what the manual prints right after power on; a 512K machine was not checked against it.

### MC-10 (`mc10`)

- Boot: Micro Color BASIC, prompt "OK". MC-10 Operation and Language Reference Manual (Radio Shack), Turning the Power On, p. 13 (PDF p. 25)
- 1. Video: `Power on`. MC-10 Operation and Language Reference Manual (Radio Shack), Turning the Power On, p. 13 (PDF p. 25)
- 2. Reset: `Press the red RESET button on the back`. MC-10 Operation and Language Reference Manual (Radio Shack), Pressing the RESET Button, p. 14 (PDF p. 26)
- 3. RAM: `PRINT MEM, right after power on`. MC-10 Operation and Language Reference Manual (Radio Shack), Using the MC-10 (MEM function), p. 15 (PDF p. 27)
- 4. Keyboard: `SHIFT + 0, then type a few letters`. MC-10 Operation and Language Reference Manual (Radio Shack), The SHIFT Key, p. 16 (PDF p. 28)
- 5. Color: `CLS 8`. MC-10 Operation and Language Reference Manual (Radio Shack), The CLS Command, p. 52 (PDF p. 66)
- 6. Sound: `SOUND 1,100`. MC-10 Operation and Language Reference Manual (Radio Shack), The SOUND Command, p. 53 (PDF p. 67)
- Not proven: The 3142 figure is for a stock 4K machine. No source gives the figure with the 16K pack, so none is stated.

### TRS-80 Model I (`model1`)

- Boot: Level II BASIC (asks MEMORY SIZE? first), prompt ">". Level II BASIC Reference Manual (Radio Shack, 1979), Power-Up, pp. 1-1 to 1-2 (PDF p. 13)
- 1. Video: `Power on, then press ENTER at MEMORY SIZE?`. Level II BASIC Reference Manual (Radio Shack, 1979), Power-Up, pp. 1-1 to 1-2 (PDF p. 13)
- 2. RAM: `PRINT MEM`. Level II BASIC Reference Manual (Radio Shack, 1979), Power-Up, p. 1-1 (PDF p. 13); also Level II BASIC Reference Manual (Radio Shack, 1979), MEM, p. 8-5 (PDF p. 99)
- 3. Graphics: `CLS:SET(0,0):SET(127,47)`. Level II BASIC Reference Manual (Radio Shack, 1979), SET(x,y), p. 8-1 (PDF p. 95)
- 4. Tape: `CLOAD, with a recorded tape in PLAY`. Level II BASIC Reference Manual (Radio Shack, 1979), CLOAD, p. 2-2 (PDF p. 24)
- 5. Reset: `Press Reset (with the Expansion Interface, hold BREAK while you press it)`. Level II BASIC Reference Manual (Radio Shack, 1979), Reset, p. 1-2 (PDF p. 14)
- Not proven: The 3,284 and 15,572 figures are the manual's 'full memory capacity' at MEMORY SIZE?; that PRINT MEM shows the same number is reasoned from the MEM page (cited as also). No Expansion Interface or disk check: the Level II manual does not cover TRSDOS.

### TRS-80 Model III (`model3`)

- Boot: Model III BASIC (asks Cass? and Memory Size? first); TRSDOS from a disk in drive 0, prompt ">". TRS-80 Model III Operation and BASIC Language Reference Manual (Radio Shack, 1980), Power-On and Start-Up, pp. 3/1 to 3/3 (PDF p. 15)
- 1. Video: `Power on, then press ENTER at Cass? and at Memory Size?`. TRS-80 Model III Operation and BASIC Language Reference Manual (Radio Shack, 1980), Power-On, pp. 3/1 to 3/3 (PDF p. 15)
- 2. Keyboard: `SHIFT + 0, then type a few letters`. TRS-80 Model III Operation and BASIC Language Reference Manual (Radio Shack, 1980), Capitals and Lower Case, p. 4/1 (PDF p. 24)
- 3. Video: `SHIFT + right arrow, then CLEAR`. TRS-80 Model III Operation and BASIC Language Reference Manual (Radio Shack, 1980), Special Keys, p. 4/1 (PDF p. 24)
- 4. RAM: `PRINT MEM`. TRS-80 Model III Operation and BASIC Language Reference Manual (Radio Shack, 1980), MEM, p. 8/4 (PDF p. 180)
- 5. Tape: `CLOAD, with a recorded tape in PLAY`. TRS-80 Model III Operation and BASIC Language Reference Manual (Radio Shack, 1980), Loading a BASIC Program from Tape, p. 6/3 (PDF p. 34)
- 6. Disk: `TRSDOS disk in drive 0, door closed, press RESET`. TRS-80 Model III Disk System Owner's Manual (1980), System Start-Up and TRSDOS Start-Up Dialog, pp. 6-7 (PDF p. 14)
- Not proven: PRINT MEM has no target number.

### TRS-80 Model 4 (`model4`)

- Boot: TRSDOS 6 from the disk in drive 0, prompt "TRSDOS Ready". Model 4 Disk System Owner's Manual (Tandy, 1983), Loading TRSDOS, p. 1-6 (PDF p. 18)
- 1. Disk: `TRSDOS 6 disk in drive 0, power on, then type the date as mm/dd/yy`. Model 4 Disk System Owner's Manual (Tandy, 1983), Loading TRSDOS, p. 1-6 (PDF p. 18); also Model 4 Disk System Owner's Manual (Tandy, 1983), BASIC, Loading BASIC, p. 2-9 (PDF p. 173) **conflict**
- 2. Keyboard: `LIB`. Model 4 Disk System Owner's Manual (Tandy, 1983), Executing a Command, p. 1-7 (PDF p. 19)
- 3. Disk: `FREE`. Model 4 Disk System Owner's Manual (Tandy, 1983), FREE, p. 1-97 (PDF p. 109)
- 4. BASIC: `BASIC`. Model 4 Disk System Owner's Manual (Tandy, 1983), BASIC, Loading BASIC, p. 2-9 (PDF p. 173)
- 5. Sound: `SOUND 7,31 (in BASIC)`. Model 4 Disk System Owner's Manual (Tandy, 1983), BASIC, SOUND, p. 2-160 (PDF p. 324)
- Not proven: Conflict on check 1: the Owner's Manual asks for DD/MM/YY on p. 2-9 but mm/dd/yy on p. 1-6; the examples on both pages are month first, so the check uses mm/dd/yy. SOUND needs the optional sound board on units without one; the manual page does not say so, so the check does not either.

### HERO 1 (`hero1`)

- Boot: Executive Mode (keypad monitor), prompt "A moving dash on the display". ET-18 Technical Manual (Heath), Operation Check, 1. Power Up, p. 54 (archive.org) (PDF p. 64)
- 1. Display and power: `Charger connected. Sleep switch OFF, then charger and robot power ON`. ET-18 Technical Manual (Heath), Operation Check, 1. Power Up, p. 54 (archive.org) (PDF p. 64)
- 2. Reset: `RESET`. ET-18 Technical Manual (Heath), Initial Tests, Power Supply Test step 2, p. 55 (archive.org) (PDF p. 65)
- 3. Keypad and display: `RESET, A, E, then 0123`. ET-18 Technical Manual (Heath), Initial Tests, Display Tests step 2, p. 55 (archive.org) (PDF p. 65)
- 4. Motion: `31 (initialize)`. ET-18 Technical Manual (Heath), Operation Check, 2. Initialize, p. 54 (archive.org) (PDF p. 64)
- 5. Speech: `RESET, A, A, 0200, 72, FA, 4B, 20FE, RESET, A, D, 0200`. ET-18 Technical Manual (Heath), Initial Tests, Speech Tests, p. 58 (archive.org) (PDF p. 68)
- 6. Clock: `35, then two digits each for hour, minute and second, then D (AM), E (PM) or F (24-hour). Then 37`. ET-18 Technical Manual (Heath), Initial Tests, Clock Check, p. 55 (archive.org) (PDF p. 65)
- Not proven: Nothing. All checks are from the Technical Manual Operation Check and Initial Tests. The manual prints HEro1.0 at power up (p. 54) and HEro1.X after RESET (p. 55); both are quoted as printed.

### HERO Jr (`herojr`)

- Boot: Spoken self-test, then the keypad programs, prompt "The robot speaks; the red data LEDs flicker with the speech". HERO Jr Owner's Guide (Heath), Start-up Procedure, Turning it On, p. 8 (archive.org) (PDF p. 10)
- 1. Power: `POWER switch ON, SLEEP switch to NORM, then press RESET`. HERO Jr Owner's Guide (Heath), Start-up Procedure, Turning it On, p. 8 (archive.org) (PDF p. 10)
- 2. Sensors: `Follow the spoken self-test: wave a hand in front of each sensor it names`. HERO Jr Owner's Guide (Heath), Self-Diagnostics, p. 9 (archive.org) (PDF p. 11)
- 3. Speech and clock: `SPEAK, then 0 and 1`. HERO Jr Owner's Guide (Heath), Manual Entry, Speak, p. 19 (archive.org) (PDF p. 21)
- 4. Keypad: `HELP, then GUARD`. HERO Jr Owner's Guide (Heath), About the Help Key, p. 39 (archive.org) (PDF p. 41)
- 5. Motion: `DEMO`. HERO Jr Owner's Guide (Heath), Demo Program, p. 41 (archive.org) (PDF p. 43)
- Not proven: Nothing. Printed page numbers are the Owner's Guide's own (PDF page is printed page + 2).

### IBM PC 5150 (`pc5150`)

- Boot: POST, then IBM Personal Computer BASIC in ROM, prompt "Ok". IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Start 30-3, POST responses (PDF p. 49)
- 1. POST: `Power on with no diskette`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Start 30-2 to 30-3, POST responses (PDF p. 48)
- 2. Diagnostics: `Boot the Diagnostics diskette in drive A`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 010-5 (PDF p. 75)
- 3. RAM and options: `0 (RUN DIAGNOSTIC ROUTINES)`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 010-8 (PDF p. 78)
- 4. System board: `0 (RUN TESTS ONE TIME)`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 100-1 (PDF p. 81)
- 5. Keyboard: `When the keyboard test screen appears, press each key once, then hold one down`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 300-1 and 300-2 (PDF p. 91)
- 6. Video: `Answer the display test screens`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 400-2 (PDF p. 94); also IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 500-5 (PDF p. 101)
- 7. Disk: `Remove the Diagnostics diskette, insert a scratch diskette in drive A, press ENTER`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 600-1 (PDF p. 107); also IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 600-2 (PDF p. 108)
- Not proven: The Guide to Operations used is the April 1984 revision that covers both the PC and the PC XT. The 1981-82 5150 guide has the same tests on pp. 4-24 to 4-52 but was not used. Test 010-8 is inferred as the page between 010-7 and 010-9 (the scan prints no footer on it).

### IBM XT 5160 (`xt5160`)

- Boot: POST, then IBM Personal Computer BASIC in ROM, prompt "Ok". IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Start 30-3, POST responses (PDF p. 49)
- 1. POST: `Power on with no diskette`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Start 30-2 to 30-3, POST responses (PDF p. 48)
- 2. Diagnostics: `Boot the Diagnostics diskette in drive A`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 010-5 (PDF p. 75)
- 3. RAM and options: `0 (RUN DIAGNOSTIC ROUTINES)`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 010-8 (PDF p. 78)
- 4. System board: `0 (RUN TESTS ONE TIME)`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 100-1 (PDF p. 81)
- 5. Keyboard: `When the keyboard test screen appears, press each key once, then hold one down`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 300-1 and 300-2 (PDF p. 91)
- 6. Video: `Answer the display test screens`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 400-2 (PDF p. 94); also IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 500-5 (PDF p. 101)
- 7. Disk: `Remove the Diagnostics diskette, insert a scratch diskette in drive A, press ENTER`. IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 600-1 (PDF p. 107); also IBM Personal Computer Guide to Operations (rev. Apr 1984, PC and PC XT), Test 600-2 (PDF p. 108)
- Not proven: Same guide and same note on Test 010-8 as the 5150.

### IBM PCjr 4860 (`pcjr`)

- Boot: IBM Color Bar screen (self test), then IBM Personal Computer BASIC, prompt "Ok". IBM PCjr Guide to Operations (6322959), First Things First, p. 6-10 (PDF p. 152)
- 1. POST: `Power on with no cartridge or diskette`. IBM PCjr Guide to Operations (6322959), First Things First, p. 6-10 (PDF p. 152); also IBM PCjr Guide to Operations (6322959), Getting Started, pp. 2-4 to 2-5 (PDF p. 20)
- 2. RAM: `Watch the lower right corner of the Color Bar screen during the self test`. IBM PCjr Guide to Operations (6322959), Running the IBM PCjr Tests, p. 6-21 (PDF p. 163); also IBM PCjr Guide to Operations (6322959), Running the IBM PCjr Tests, p. 6-25 (PDF p. 167)
- 3. Diagnostics: `Hold Ctrl and Alt, then press Ins`. IBM PCjr Guide to Operations (6322959), Running the IBM PCjr Tests, p. 6-22 (PDF p. 164); also IBM PCjr Guide to Operations (6322959), Running the IBM PCjr Tests, p. 6-26 (PDF p. 168)
- 4. Sound: `Run Test Tag 9 (Sound Test) from the test menu`. IBM PCjr Guide to Operations (6322959), Test Tag 9 Sound Test, pp. 6-93 to 6-94 (PDF p. 235)
- 5. Keyboard: `Run Test Tag J (Keyboard Test), then press keys`. IBM PCjr Guide to Operations (6322959), Test Tag J Keyboard Test, pp. 6-103 to 6-104 (PDF p. 245)
- Not proven: The guide names each test by its Test Tag on the menu screens; the check does not say which key starts a tag.

### IBM Portable 5155 (`portable5155`)

- Boot: POST, then IBM Personal Computer BASIC in ROM, prompt "Ok". IBM 5155 Portable Guide to Operations (Jan 1984), Start 30-3, POST responses (PDF p. 55)
- 1. POST: `Power on with no diskette`. IBM 5155 Portable Guide to Operations (Jan 1984), Start 30-2 to 30-3, POST responses (PDF p. 54)
- 2. Diagnostics: `Boot the Diagnostics diskette in drive A`. IBM 5155 Portable Guide to Operations (Jan 1984), Test 010-5 (PDF p. 75)
- 3. RAM and options: `0 (RUN DIAGNOSTIC ROUTINES)`. IBM 5155 Portable Guide to Operations (Jan 1984), Test 010-8 (PDF p. 78)
- 4. System board: `0 (RUN TESTS ONE TIME)`. IBM 5155 Portable Guide to Operations (Jan 1984), Test 100-1 (PDF p. 81)
- 5. Keyboard: `At PRESS EACH KEY. HOLD FOR TYPEMATIC TEST, press each key once, then hold one down`. IBM 5155 Portable Guide to Operations (Jan 1984), Test 300-1 and 300-2 (PDF p. 91)
- 6. Video: `Answer the first display test screen`. IBM 5155 Portable Guide to Operations (Jan 1984), Test 500-1 (PDF p. 95)
- 7. Disk: `Remove the Diagnostics diskette, insert a scratch diskette in drive A, press ENTER`. IBM 5155 Portable Guide to Operations (Jan 1984), Test 600-1 (PDF p. 105); also IBM 5155 Portable Guide to Operations (Jan 1984), Test 600-2 (PDF p. 106)
- Not proven: Test 010-8 is inferred from the pages before and after it (no footer in the scan).

### Amstrad CPC 464 (`cpc464`)

- Boot: Locomotive BASIC 1.0, prompt "Ready". Amstrad CPC464 User Manual (transcribed edition), 1 setting up, sign-on screen (PDF p. 8; the transcription has no printed page numbers) (PDF p. 8)
- 1. Video: `Monitor on, then the computer POWER switch`. Amstrad CPC464 User Manual (transcribed edition), 1 setting up, sign-on screen (PDF p. 8) (PDF p. 8)
- 2. Color: `border 0`. Amstrad CPC464 User Manual (transcribed edition), Foundations 3, PEN, PAPER and BORDER (PDF p. 34) (PDF p. 34)
- 3. Sound: `10 sound 1,478,200, then run`. Amstrad CPC464 User Manual (transcribed edition), Foundations 3, SOUND (PDF p. 47) (PDF p. 47)
- 4. Tape: `load"" and press PLAY on the datacorder, then any key`. Amstrad CPC464 User Manual (transcribed edition), 1.6 Loading other software cassettes (PDF p. 15) (PDF p. 15)
- 5. Joystick: `PRINT JOY(0) while you hold the joystick left; again with Fire 2 held too`. Amstrad CPC464 User Manual (transcribed edition), ch. 8 keyword list, JOY (PDF p. 150) (PDF p. 150)
- 6. Reset: `CTRL + SHIFT + ESC`. Amstrad CPC464 User Manual (transcribed edition), 1.6 Loading other software cassettes (PDF p. 15) (PDF p. 15)
- Not proven: The CPC464 manual on archive.org is a transcription with no printed page numbers; labels give the section and the PDF page instead.

### Amstrad CPC 664 (`cpc664`)

- Boot: Locomotive BASIC 1.1 with AMSDOS, prompt "Ready". Amstrad CPC664 User Instructions, ch. 1 Foundation Course, p. 4 (PDF p. 15)
- 1. Video: `Monitor on, then the computer POWER switch`. Amstrad CPC664 User Instructions, ch. 1 Foundation Course, p. 4 (PDF p. 15)
- 2. Color: `border 13`. Amstrad CPC664 User Instructions, ch. 1 Foundation Course, p. 47 (PDF p. 58)
- 3. Sound: `10 sound 1,478,200, then run`. Amstrad CPC664 User Instructions, ch. 1 Foundation Course, p. 66 (PDF p. 77)
- 4. Disk: `cat, with a formatted disc in the drive`. Amstrad CPC664 User Instructions, ch. 1 Foundation Course, Catalog, p. 41 (PDF p. 52)
- 5. Joystick: `PRINT JOY(0) while you hold the joystick left; again with Fire 2 held too`. Amstrad CPC664 User Instructions, ch. 3 Complete List of Keywords, JOY, p. 37 (PDF p. 139)
- Not proven: Nothing.

### Amstrad CPC 6128 (`cpc6128`)

- Boot: Locomotive BASIC 1.1 with AMSDOS, prompt "Ready". Amstrad CPC6128 User Instructions, ch. 1 Foundation Course, p. 5 (PDF p. 18)
- 1. Video: `Monitor on, then the computer POWER switch`. Amstrad CPC6128 User Instructions, ch. 1 Foundation Course, p. 5 (PDF p. 18)
- 2. Color: `border 13`. Amstrad CPC6128 User Instructions, ch. 1 Foundation Course, p. 49 (PDF p. 62)
- 3. Sound: `10 sound 1,239,200, then run`. Amstrad CPC6128 User Instructions, ch. 1 Foundation Course, Part 9 Using Sound, p. 69 (PDF p. 82); also Amstrad CPC664 User Instructions, ch. 1 Foundation Course, pp. 65-66 (PDF p. 77) **conflict**
- 4. Disk: `cat, with a formatted disc in the drive`. Amstrad CPC6128 User Instructions, ch. 1 Foundation Course, Catalog, p. 44 (PDF p. 57)
- 5. Joystick: `PRINT JOY(0) while you hold the joystick left; again with Fire 2 held too`. Amstrad CPC6128 User Instructions, ch. 3 Complete List of Keywords, JOY, p. 37 (PDF p. 156)
- Not proven: Conflict: the 6128 manual calls tone period 239 middle C; the 664 and 464 manuals use 478. The check only claims a 2-second note.

### BBC Micro Model B (`bbcb`)

- Boot: BBC BASIC, prompt ">". BBC Microcomputer System User Guide (1984), 1 Getting started, p. 3 (PDF p. 15)
- 1. Power and video: `Switch on at the back, then tune the TV`. BBC Microcomputer System User Guide (1984), 1 Getting started, p. 3 (PDF p. 15)
- 2. Keyboard: `Hold any letter key down`. BBC Microcomputer System User Guide (1984), 1 Getting started, p. 5 (PDF p. 17)
- 3. Color: `MODE 5, then COLOUR 129, then type a few letters`. BBC Microcomputer System User Guide (1984), 1 Experimenting, p. 6 (PDF p. 18)
- 4. Sound: `SOUND 1,-15,100,200`. BBC Microcomputer System User Guide (1984), 1 Experimenting, p. 6 (PDF p. 18)
- 5. Tape: `*TAPE (only on a machine with a disc, Econet or other interface), then *CAT and press PLAY`. BBC Microcomputer System User Guide (1984), 4 Cataloguing a tape, p. 28 (PDF p. 40); also BBC Microcomputer System User Guide (1984), Running the WELCOME programs (*TAPE), p. 8 (PDF p. 20)
- 6. Joystick: `PRINT ADVAL(1), with the stick at one end, then the other`. BBC Microcomputer System User Guide (1984), ADVAL, p. 175 (PDF p. 187)
- Not proven: The boot message: the User Guide prints Acorn OS 64K / BASIC and says only 'a message similar to'. The check says 'a sign-on message' for that reason. No disc check: the User Guide does not cover the DFS.

### BBC Master 128 (`bbcmaster`)

- Boot: BBC BASIC IV, prompt ">". Master Reference Manual Part 1, OSBYTE 215 startup message, p. D.2-69 (PDF p. 115) **verify**
- 1. ROMs: `*ROMS`. Master Reference Manual Part 1, *ROMS, p. C.5-10 (PDF p. 39)
- 2. CMOS RAM: `*STATUS`. Master Reference Manual Part 1, *STATUS, p. C.5-12 (PDF p. 41)
- 3. Clock: `*TIME`. Master Reference Manual Part 1, *TIME, pp. C.5-12 to C.5-13 (PDF p. 41)
- 4. Sound: `CTRL + G`. Master Reference Manual Part 1, *CONFIGURE LOUD, p. C.5-4 (PDF p. 33)
- 5. Disk: `*CAT, with a disc in the drive`. Master Reference Manual Part 1, C.4 MOS command summary, p. C.4-1 (PDF p. 28)
- Not proven: Boot: the Reference Manual says the MOS shows a startup message on reset but never prints its text, and the > prompt is not shown in Part 1 or the BASIC IV section; boot is marked verify. No BASIC color or sound-command check: those would rest on the BBC B User Guide plus the statement that BASIC IV is 'very similar to BASIC II'.

### Acorn Electron (`electron`)

- Boot: BBC BASIC, prompt ">". Acorn Electron User Guide, 2 Getting started, p. 5 (PDF p. 15)
- 1. Power: `Plug in the mains adapter (there is no switch)`. Acorn Electron User Guide, 2 Connecting the Electron to the mains, p. 4 (PDF p. 14)
- 2. Video: `Tune the TV`. Acorn Electron User Guide, 2 Tuning the TV to the Electron, p. 5 (PDF p. 15)
- 3. Keyboard: `Hold SHIFT and press CAPS LK, then type letters`. Acorn Electron User Guide, 2 Now try something, p. 6 (PDF p. 16)
- 4. Color: `MODE 1, COLOUR 1, COLOUR 130, then CLS`. Acorn Electron User Guide, 20 Graphics, The COLOUR command, pp. 90-91 (PDF p. 100)
- 5. Sound: `SOUND 1,-15,0,100`. Acorn Electron User Guide, 22 Making sounds, The SOUND command, p. 116 (PDF p. 126)
- 6. Tape: `CHAIN "INTRO", then press PLAY on the recorder`. Acorn Electron User Guide, 4 The Introductory Cassette, p. 10 (PDF p. 20)
- Not proven: Nothing.

### Dragon 32 (`dragon32`)

- Boot: Dragon BASIC (Microsoft), prompt "OK". Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), Connecting Your Dragon 32, p. iv (PDF p. 8)
- 1. Video: `Switch on the TV and the computer`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), Connecting Your Dragon 32, p. iv (PDF p. 8)
- 2. Color: `CLS 3`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), CLS, p. 26 (PDF p. 40)
- 3. Sound: `SOUND 89,16`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), SOUND, p. 31 (PDF p. 45)
- 4. Tape: `CLOAD, with a recorded tape in PLAY`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), Loading Programs into Memory, p. 36 (PDF p. 50)
- 5. Joystick: `PRINT JOYSTK(0), with the left joystick at full left, then at full right`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), joysticks, p. 86 (PDF p. 100); also Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), JOYSTK, p. 68 (PDF p. 82)
- Not proven: Nothing.

### Dragon 64 (`dragon64`)

- Boot: Dragon BASIC (Microsoft), prompt "OK". Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), Connecting Your Dragon 32, p. iv (PDF p. 8)
- 1. Video: `Switch on the TV and the computer`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), Connecting Your Dragon 32, p. iv (PDF p. 8); also Dragon 64 Supplement (Dragon Data, 1983), Using the Extra RAM (boots configured like a Dragon 32), p. 3 (PDF p. 5) **verify**
- 2. Color: `CLS 3`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), CLS, p. 26 (PDF p. 40)
- 3. Sound: `SOUND 89,16`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), SOUND, p. 31 (PDF p. 45)
- 4. Tape: `CLOAD, with a recorded tape in PLAY`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), Loading Programs into Memory, p. 36 (PDF p. 50)
- 5. Joystick: `PRINT JOYSTK(0), with the left joystick at full left, then at full right`. Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), joysticks, p. 86 (PDF p. 100); also Dragon 32 Introduction to BASIC Programming (Dragon Data, 1982), JOYSTK, p. 68 (PDF p. 82)
- 6. Upper 32K RAM: `EXEC (or EXEC 48000), then PRINT MEM`. Dragon 64 Supplement (Dragon Data, 1983), Using the Extra RAM, p. 3 (PDF p. 5)
- Not proven: Check 1 is marked verify: the banner text is from the Dragon 32 manual. The Dragon 64 Supplement says the 64 starts configured like a Dragon 32 but does not print its banner.

### MSX1 (generic) (`msx1`)

- Boot: MSX-BASIC, prompt "Ok". MSX Technical Data Book (ASCII, 1984), 2.1.1 Modes of Operation, p. 46 (PDF p. 49)
- 1. Video: `Power on with no cartridge`. MSX Technical Data Book (ASCII, 1984), 2.1.1 Modes of Operation, p. 46 (PDF p. 49)
- 2. Sound: `BEEP`. MSX Technical Data Book (ASCII, 1984), 2.1 MSX-BASIC Reference Guide, BEEP, p. 93 (PDF p. 96)
- 3. PSG: `PLAY "CDEFGAB"`. MSX Technical Data Book (ASCII, 1984), 2.1 MSX-BASIC Reference Guide, PLAY, p. 93 (PDF p. 96)
- 4. RAM: `PRINT FRE(0)`. MSX Technical Data Book (ASCII, 1984), 2.1 MSX-BASIC Reference Guide, FRE, p. 80 (PDF p. 83)
- 5. Tape: `MOTOR ON, then MOTOR OFF`. MSX Technical Data Book (ASCII, 1984), 2.1 MSX-BASIC Reference Guide, MOTOR, p. 93 (PDF p. 96)
- Not proven: The Technical Data Book only says MSX-BASIC shows Ok when it starts. It does not print the sign-on text or a bytes-free figure, so the check claims only the Ok prompt. No joystick check: STICK was not found in the scan's text layer and was not read by eye.

### MSX2 (generic) (`msx2`)

- Boot: MSX-BASIC, prompt "Ok". MSX Technical Data Book (ASCII, 1984), 2.1.1 Modes of Operation, p. 46 (PDF p. 49)
- 1. Video: `Power on with no cartridge`. MSX Technical Data Book (ASCII, 1984), 2.1.1 Modes of Operation, p. 46 (PDF p. 49)
- 2. Sound: `BEEP`. MSX Technical Data Book (ASCII, 1984), 2.1 MSX-BASIC Reference Guide, BEEP, p. 93 (PDF p. 96)
- 3. PSG: `PLAY "CDEFGAB"`. MSX Technical Data Book (ASCII, 1984), 2.1 MSX-BASIC Reference Guide, PLAY, p. 93 (PDF p. 96)
- 4. RAM: `PRINT FRE(0)`. MSX Technical Data Book (ASCII, 1984), 2.1 MSX-BASIC Reference Guide, FRE, p. 80 (PDF p. 83)
- 5. Tape: `MOTOR ON, then MOTOR OFF`. MSX Technical Data Book (ASCII, 1984), 2.1 MSX-BASIC Reference Guide, MOTOR, p. 93 (PDF p. 96)
- 6. Clock: `GET TIME T$:PRINT T$`. MSX2 Technical Handbook (ASCII, transcription on archive.org), ch. 2.9 Additions for Timer Features, GET TIME and SET TIME (text file, no pages)
- 7. Clock RAM (battery): `SET TITLE "REPAIR",3, then switch off and on`. MSX2 Technical Handbook (ASCII, transcription on archive.org), ch. 2.10 Additions for Memory Switch, SET TITLE (text file, no pages)
- 8. Sound: `SET BEEP 2,4, then BEEP`. MSX2 Technical Handbook (ASCII, transcription on archive.org), ch. 2.10 Additions for Memory Switch, SET BEEP (text file, no pages)
- Not proven: The MSX2 Technical Handbook on archive.org is a 1997 transcription (no page numbers); labels give the section. The 'lost title means the battery' line is reasoned from section 2.10, which says SET TITLE is kept in the battery-powered clock RAM. Same note as MSX1 on the sign-on and the joystick.

### Oric-1 (`oric1`)

- Boot: Oric Extended BASIC V1.0, prompt "READY". Oric-1 BASIC Programming Manual (John Scriven, 1983), ch. 2 Setting the Computer Up, p. 12 (PDF p. 8)
- 1. Video: `Plug in the power supply and tune the TV to about channel 36`. Oric-1 BASIC Programming Manual (John Scriven, 1983), ch. 2 Setting the Computer Up, pp. 11-12 (PDF p. 7)
- 2. Keyboard: `Press a few letter keys, then CTRL + F`. Oric-1 BASIC Programming Manual (John Scriven, 1983), ch. 10 Sound, p. 97 (PDF p. 80)
- 3. Sound: `ZAP, then PING, SHOOT and EXPLODE`. Oric-1 BASIC Programming Manual (John Scriven, 1983), ch. 10 Sound, p. 97 (PDF p. 80)
- 4. Color: `PAPER 1`. Oric-1 BASIC Programming Manual (John Scriven, 1983), ch. 4 Colour and Graphics, p. 33 (PDF p. 26); also Oric Atmos manual (Oric Products International), ch. 7 Graphics and colour, p. 72 (PDF p. 77)
- 5. Tape: `CLOAD "", then PLAY on the recorder`. Oric-1 BASIC Programming Manual (John Scriven, 1983), ch. 11 Saving programs on tape, pp. 105-106 (PDF p. 87)
- Not proven: PAPER 1 = red: the Oric-1 manual lists the colors 0 to 7 in order without numbers, so the Atmos manual's PAPER 1 example is cited as also.

### Oric Atmos (`atmos`)

- Boot: Oric Extended BASIC V1.1, prompt "READY". Oric Atmos manual (Oric Products International), ch. 1 Getting the ATMOS together, p. 3 (PDF p. 8)
- 1. Video and RAM: `Plug in the power supply (there is no switch) and tune the TV to channel 36`. Oric Atmos manual (Oric Products International), ch. 1 Getting the ATMOS together, p. 3 (PDF p. 8)
- 2. Keyboard: `Press a few keys, then CTRL-F, then press keys again`. Oric Atmos manual (Oric Products International), ch. 2 The Language Lesson, control keys, p. 12 (PDF p. 17)
- 3. Sound: `ZAP, then SHOOT, PING and EXPLODE`. Oric Atmos manual (Oric Products International), ch. 8 The sound of music, p. 93 (PDF p. 98)
- 4. Color: `PAPER 1`. Oric Atmos manual (Oric Products International), ch. 7 Graphics and colour, p. 72 (PDF p. 77)
- 5. Tape: `CLOAD "name", then PLAY on the recorder`. Oric Atmos manual (Oric Products International), ch. 6 Tapes and Data, p. 64 (PDF p. 69)
- Not proven: Nothing.


## Review fixes

Fixes after the adversarial review of 2026-11-01 (`docs/reviews/first-boot-2026-11-01/`). Every page below was
reopened and read again for this pass; the review's suggested fix was not copied where the page said otherwise.

Wrong, corrected:
- **CPC464 check 1**: banner now reads `Amstrad 64K Microcomputer <v1>`, as printed in the cited transcription
  (CPC464 User Manual, transcribed edition, 1 setting up, PDF p. 8).
- **HERO 1 check 3 (keypad and display)**: the full key sequence from the table (RESET, A, E, 0123, C, 45, E, 6789,
  C, AB, E, CDEF) and each display it gives, ending C.dEFXX; the old 0123-only test could not light every segment
  (ET-18 Technical Manual, Initial Tests, Display Tests step 2, p. 55, read from the page image).
- **HERO 1 check 5 (speech)**: now marked "Speech option only" and says the first RESET gives "ready". The review
  asked for an "enter 31 to initialize" step; on p. 58 that step belongs to the Teaching Pendant Test, not the
  Speech Tests, so it was not added (ET-18 Technical Manual, Speech Tests, p. 58).
- **Model 4 check 3 (FREE)**: "files used out of the total" is now "directory entries available out of the total"
  (Model 4 Disk System Owner's Manual, FREE, p. 1-97, items 6 and 7).
- Not changed: CoCo 1 CLS(3) (blue) and SOUND 1,100 (about 6 seconds) were already right in the data.

Unproven, now cited:
- **CPC664 boot**: AMSDOS at power-on, `also` CPC664 User Instructions ch. 1 Part 10, What is AMSDOS?, p. 72 ("When
  the computer is switched on or reset, the system defaults to operation under AMSDOS").
- **CPC6128 boot**: same text, CPC6128 User Instructions ch. 1 Part 10, p. 75.
- **Dragon 64 boot**: `also` Dragon 64 Supplement, Using the Extra RAM, p. 3 (switched on, it is configured like a
  Dragon 32).
- **HERO 1 check 4 (motion)**: "ready" now scoped to the speech option, and the arm-time wait added, per the
  asterisk note on p. 54 (ET-18 Technical Manual, Operation Check, 2. Initialize).
- **HERO Jr boot**: now "spoken self-test and clock setting, then ready", with the idle "timed out" note; `also` HERO
  Jr Owner's Guide, Start-up Procedure, step 13 note, p. 13.
- **MSX1 and MSX2 boot**: cartridge note reworded to what the page says (BASIC scans the slots and passes control to
  each cartridge; a game need not return); `also` MSX Technical Data Book, Advanced Programming Guide, PROGRAM
  CARTRIDGE search procedure, p. 162.
- **MSX2 check 7 (SET TITLE)**: color 3 is the screen color (red screen, not red text); the unsupported "lost title
  points at the battery" clause removed (MSX2 Technical Handbook ch. 2.10, SET TITLE, Table 2.15).
- **CoCo 1 and CoCo 2 boot**: `also` Getting Started With Extended Color BASIC, This Is How to Start (Extended ROM
  banner with OK).
- **CoCo 3 boot and check 1**: `also` Color Computer 3 Extended BASIC ch. 1, Entering a Command, p. 4 (press ENTER:
  OK is the prompt); check 1 now says to press ENTER for OK instead of implying the banner shows it.
- **CoCo 3 check 2**: `also` p. 9, The Standard Colors, which gives PALETTE RGB (the old label said pp. 8-9 but
  linked p. 8 only).
- **Model III boot**: `also` Model III Disk System Owner's Manual, System Start-Up and TRSDOS Start-Up Dialog,
  pp. 6-7, for the drive-0 TRSDOS boot.
- **CPC464 check 5 (joystick)**: the inferred "20 for left with Fire 2" removed; now 4 for left and Fire 2 is bit 4
  (16), as the JOY bit table prints (CPC464 manual PDF p. 150). The shared CPC664/6128 check reads the same.
- **Dragon 64 check 6**: PRINT MEM dropped (the supplement does not show it); now "BASIC then has 41241 bytes free",
  as p. 3 prints.

Unproven, marked `verify`:
- **MSX1 and MSX2 check 3**, PLAY "CDEFGAB": the PLAY entry (Data Book p. 93) describes the notes but shows no
  worked scale.
- **BBC Master boot** stays `verify`: Master Reference Manual Part 1 gives *CONFIGURE LANG (p. C.5-4) but no page
  says the default language is BASIC IV.

HERO 1 keys: `A D addr` (keys and BASIC essentials) no longer `verify`; ET-18 Technical Manual p. 58 runs the
speech program with A D 0200. The unproven "AD0090 runs the speech demo" clause was removed.

US English: BBC B tape check (disc to disk, catalogue to catalog in prose), BBC Master disk check (disc, catalogue),
CPC664 and CPC6128 disk checks (formatted disc to disk). Section titles such as "Cataloguing a tape" and "Colour and
Graphics", and BBC/Electron COLOUR commands, are left as printed.
