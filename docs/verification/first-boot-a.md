# First-boot checks, part A (verification log)

Scope: `boot` and `firstBoot` in the quickref of every non-planned machine in `commodore.js`, `apple.js`,
`atari.js`, `coleco.js`, `ti.js`, `sinclair.js` and `timex.js` (32 machines, 189 checks). Sources are
manufacturer user guides and reference manuals first, then service manuals (Coleco repair manual, Atari 800XL
Field Service Manual, Sams Computerfacts 130XE, ZX81 Service and Assembly Manual). No Classic Repair Toolbox or
Commodore Repair Toolbox material was used. Every link is the PDF that was read, with `#page=` set to the PDF
page; the label gives the printed page (or the chapter or section when the scan shows no page number).
World of Spectrum pages are HTML transcriptions of the Sinclair and Amstrad manuals and are cited by chapter or
page. Archive.org links point at the `_text.pdf` file that was searched; it has the same pages as the scan.

## How each check was proved

The page cited as `source` shows both what to type and what a working machine shows, unless an `also` is
given: then the first page gives the command and the second the result (for example a register address and a
color table). Banners that exist only as a picture in the manual were read from the page image
(C64 User's Guide p. 8: "38911 BASIC BYTES FREE"; C16 Owner's Guide p. 9: "COMMODORE BASIC V3.5 12277 BYTES
FREE"; C128 Introductory Guide p. 19: "COMMODORE BASIC V7.0 122365 BYTES FREE"; ADAM Check-Out Guide p. 3:
the ADAM'S ELECTRONIC TYPEWRITER screen; VIC-20 Personal Computing Guide p. 37: the color table, checked
against the picture because the OCR columns were shifted).

## Marked verify or conflict

- **Apple II, C050 / C051 at the Monitor prompt** (`verify`). The Reference Manual (p. 13) lists the
  graphics and text soft switches; it does not describe what the screen looks like when you read C050 from
  the Monitor.
- **Spectrum +2 (gray), boot and all five checks** (`verify`). No +2 manual was found online during this pass.
  The checks are the Spectrum 128 Introduction ones (same menu and Tape Tester); they need the +2 manual.
- **Apple IIe self-test** (`conflict`). The Owner's Manual (p. 108) says the test ends with KERNEL OK; the
  Technical Reference Manual (Automatic Self-Test, p. 95; the enhanced-IIe edition) says System OK. Both are
  quoted in the conflict text; the original and enhanced ROMs probably differ, but no source says so.

## Not proved, so left out

- **ColecoVision with no cartridge.** Neither the Owner's Manual nor the repair manual describes the BIOS
  screen with the slot empty, so `boot` names the cartridge title screen only.
- **ADAM SmartBASIC prompt.** The Set-Up Manual (p. 44) says the pack in drive A loads when COMPUTER RESET is
  pulled; it does not show the SmartBASIC screen, so the check does not name a prompt.
- **PET sound and tape.** No PET manual read here gives a beep command. The tape prompt was found only for a
  data-file write in the PET User's Handbook, so no tape check was added.
- **VIC-20 joystick.** The Programmer's Reference Guide needs DDR pokes before the port reads; too long for a
  first-boot check.
- **Apple IIc self-test.** The IIc Technical Reference (p. 52) says the Open-Apple plus Solid-Apple code at
  reset "is for production and has no end-user value", so no self-test check.
- **ZX81 BASIC checks.** The ZX81 BASIC manual was not found online; the ZX81 checks come from the Service
  and Assembly Manual fault-finding list only (4 checks).
- **TS1000 and TS1500 extra checks.** The archive.org OCR of both manuals is poor; only checks whose text
  could be read with confidence were added (3 and 2 checks). The TS1500 cursor letter is not named because the
  OCR does not show it.
- **PET printed pages.** The CBM 2001-16 to 3032 manual scan shows no page numbers; labels give chapter and
  PDF page.
- **Spectrum 48K copyright text.** The Introduction booklet transcription refers to "the copyright message"
  and shows it only as a picture; the check does not quote it.
- **Fewer than five checks:** PET (5 with the 8K banner), ZX80 (4), ZX81 (4), TS1000 (3), TS1500 (2),
  Spectrum 128 and +2 (5). Each is limited by what the sources prove.

## Code change outside the data

`diskQuick()` in `apple.js` builds the drive quickref field by field; it now passes `boot` and `firstBoot`
through so the Disk II, DuoDisk and UniDisk 5.25 entries keep them. In `atari.js` the XL and XE quickrefs
spread the 400/800 one, so each sets its own `boot` and `firstBoot`.

## Checks by machine

### Commodore 16 (c16)

- Boot: Commodore BASIC 3.5 (prompt READY.). Source: [Commodore 16 Owner's Guide, p. 9](http://www.zimmers.net/anonftp/pub/cbm/manuals/plus4/C16_Owners_Guide.pdf#page=19)
- 1. Screen and RAM: [Commodore 16 Owner's Guide, p. 9](http://www.zimmers.net/anonftp/pub/cbm/manuals/plus4/C16_Owners_Guide.pdf#page=19); also [Commodore Plus/4 User's Manual, p. 16](http://www.zimmers.net/anonftp/pub/cbm/manuals/plus4/Plus_4_Users_Manual.pdf#page=22)
- 2. Video: [Commodore 16 Owner's Guide, p. 52](http://www.zimmers.net/anonftp/pub/cbm/manuals/plus4/C16_Owners_Guide.pdf#page=76)
- 3. Keyboard: [Commodore 16 Owner's Guide, p. 18](http://www.zimmers.net/anonftp/pub/cbm/manuals/plus4/C16_Owners_Guide.pdf#page=30)
- 4. Sound: [Commodore 16 Owner's Guide, p. 45](http://www.zimmers.net/anonftp/pub/cbm/manuals/plus4/C16_Owners_Guide.pdf#page=67)
- 5. Tape: [Commodore 16 Owner's Guide, p. 28](http://www.zimmers.net/anonftp/pub/cbm/manuals/plus4/C16_Owners_Guide.pdf#page=42)
- 6. Disk: [Commodore Plus/4 User's Manual, p. 41](http://www.zimmers.net/anonftp/pub/cbm/manuals/plus4/Plus_4_Users_Manual.pdf#page=49)

### Commodore 64 (c64)

- Boot: Commodore 64 BASIC V2 (prompt READY.). Source: [Commodore 64 User's Guide, p. 8](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=17)
- 1. Screen and RAM: [Commodore 64 User's Guide, p. 8](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=17); also [Commodore 64 User's Guide, p. 9](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=18)
- 2. Video: [Commodore 64 User's Guide, p. 62](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=69); also [Commodore 64 User's Guide, p. 61](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=68)
- 3. Keyboard: [Commodore 64 User's Guide, p. 17](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=26)
- 4. Sound: [Commodore 64 User's Guide, p. 80](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=87); also [Commodore 64 User's Guide, p. 81](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=88)
- 5. Joystick: [Commodore 64 Programmer's Reference Guide, p. 344](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf#page=363)
- 6. Tape: [Commodore 64 User's Guide, p. 20](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Users_Guide.pdf#page=29)
- 7. Disk: [1541 User's Guide, p. 10](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=16)

### VIC-20 (vic20)

- Boot: CBM BASIC V2 (prompt READY.). Source: [VIC-20 Personal Computing Guide, p. 4](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=14)
- 1. Screen and RAM: [VIC-20 Personal Computing Guide, p. 4](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=14); also [VIC-20 Personal Computing Guide, p. 6](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=16)
- 2. Video: [VIC-20 Personal Computing Guide, p. 37](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=47); also [VIC-20 Personal Computing Guide, p. 36](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=46)
- 3. Keyboard: [VIC-20 Personal Computing Guide, p. 20](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=30)
- 4. Sound: [VIC-20 Personal Computing Guide, p. 71](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=81); also [VIC-20 Personal Computing Guide, p. 72](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=82)
- 5. Tape: [VIC-20 Personal Computing Guide, p. 110](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=120); also [VIC-20 Personal Computing Guide, p. 109](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Personal_Computing_Guide.pdf#page=119)
- 6. Disk: [1541 User's Guide, p. 10](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=16)

### PET / CBM (pet)

- Boot: Commodore BASIC (prompt READY.). Source: [CBM User Manual, models 2001-16 to 3032, ch. 2, PDF p. 12](http://www.zimmers.net/anonftp/pub/cbm/manuals/pet/CBM_Models_2001-16,_2016N,_2032,_2032N_and_3016,_3016N,_3032_%26_3032N.pdf#page=12)
- 1. Screen and RAM: [CBM User Manual, models 2001-16 to 3032, ch. 2, PDF p. 12](http://www.zimmers.net/anonftp/pub/cbm/manuals/pet/CBM_Models_2001-16,_2016N,_2032,_2032N_and_3016,_3016N,_3032_%26_3032N.pdf#page=12); also [CBM User Manual, models 2001-16 to 3032, ch. 2, PDF p. 13](http://www.zimmers.net/anonftp/pub/cbm/manuals/pet/CBM_Models_2001-16,_2016N,_2032,_2032N_and_3016,_3016N,_3032_%26_3032N.pdf#page=13)
- 2. Screen and RAM (8K 2001): [PET User's Handbook, p. 3](http://www.zimmers.net/anonftp/pub/cbm/manuals/pet/PET%20Users%20Handbook.pdf#page=8)
- 3. Character ROM: [CBM User Manual, models 2001-16 to 3032, ch. 2, PDF p. 14](http://www.zimmers.net/anonftp/pub/cbm/manuals/pet/CBM_Models_2001-16,_2016N,_2032,_2032N_and_3016,_3016N,_3032_%26_3032N.pdf#page=14)
- 4. Keyboard and video: [CBM User Manual, models 2001-16 to 3032, reverse field, PDF p. 34](http://www.zimmers.net/anonftp/pub/cbm/manuals/pet/CBM_Models_2001-16,_2016N,_2032,_2032N_and_3016,_3016N,_3032_%26_3032N.pdf#page=34)
- 5. Disk (BASIC 4.0): [Commodore BASIC 4.0 User's Reference Manual, p. 36](http://www.zimmers.net/anonftp/pub/cbm/manuals/pet/BASIC_v4_Users_Reference_Manual.pdf#page=36)

### Commodore 128 (c128)

- Boot: Commodore BASIC V7.0 (C128 mode) (prompt READY.). Source: [Commodore 128 Introductory Guide, p. 18](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Introductory_Guide_(US).pdf#page=24)
- 1. Screen and RAM: [Commodore 128 Introductory Guide, p. 19](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Introductory_Guide_(US).pdf#page=25); also [Commodore 128 Introductory Guide, p. 14](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Introductory_Guide_(US).pdf#page=20)
- 2. 80-column video: [Commodore 128 Introductory Guide, p. 19](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Introductory_Guide_(US).pdf#page=25); also [Commodore 128 System Guide, p. 164](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_System_Guide.pdf#page=178)
- 3. Video: [Commodore 128 System Guide, p. 97](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_System_Guide.pdf#page=111); also [Commodore 128 System Guide, p. 99](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_System_Guide.pdf#page=113)
- 4. Sound: [Commodore 128 System Guide, p. 144](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_System_Guide.pdf#page=158)
- 5. Joystick: [Commodore 128 System Guide, p. 311](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_System_Guide.pdf#page=325)
- 6. C64 mode: [Commodore 128 Introductory Guide, p. 20](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Introductory_Guide_(US).pdf#page=26)
- 7. Disk: [1571 User's Guide, p. 11](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571_Users_Guide.pdf#page=19)

### Commodore 1541 disk drive (c1541)

- Boot: No screen of its own: a power-up LED sequence. Source: [1541 User's Guide, p. 6](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=12)
- 1. Power and LEDs: [1541 User's Guide, p. 6](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=12)
- 2. Error channel: [1541 User's Guide, p. 18](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=24); also [1541 User's Guide, p. 56](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=62)
- 3. Read: [1541 User's Guide, p. 10](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=16)
- 4. Format: [1541 User's Guide, p. 15](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=21); also [1541 User's Guide, p. 28](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=34)
- 5. Write: [1541 User's Guide, p. 12](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1541_Users_Guide.pdf#page=18)

### Commodore 1571 disk drive (c1571)

- Boot: No screen of its own: a self test, then 1541 mode. Source: [1571 User's Guide, p. 5](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571_Users_Guide.pdf#page=13)
- 1. Power and self test: [1571 User's Guide, p. 5](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571_Users_Guide.pdf#page=13)
- 2. Error channel: [1571 User's Guide, p. 14](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571_Users_Guide.pdf#page=22); also [1571 User's Guide, p. 15](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571_Users_Guide.pdf#page=23)
- 3. Read: [1571 User's Guide, p. 11](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571_Users_Guide.pdf#page=19)
- 4. Format, both sides: [1571 User's Guide, p. 10](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571_Users_Guide.pdf#page=18); also [1571 User's Guide, p. 12](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571_Users_Guide.pdf#page=20)
- 5. Load: [1571 User's Guide, p. 9](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1571_Users_Guide.pdf#page=17)

### Commodore 1581 disk drive (c1581)

- Boot: No screen of its own: a self test on power-up. Source: [1581 User's Guide, p. 5](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf#page=14)
- 1. Power and self test: [1581 User's Guide, p. 5](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf#page=14)
- 2. Error channel: [1581 User's Guide, p. 16](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf#page=25); also [1581 User's Guide, p. 17](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf#page=26)
- 3. Read: [1581 User's Guide, p. 12](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf#page=21)
- 4. Load: [1581 User's Guide, p. 9](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf#page=18)
- 5. Format: [1581 User's Guide, p. 11](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf#page=20); also [1581 User's Guide, p. 12](http://www.zimmers.net/anonftp/pub/cbm/manuals/drives/1581_Users_Guide.pdf#page=21)

### Apple II (apple2)

- Boot: System Monitor (old Monitor ROM) (prompt *). Source: [Apple II Reference Manual (1979), p. 26](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=37)
- 1. Screen: [Apple II Reference Manual (1979), p. 40](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=51); also [Apple II Reference Manual (1979), p. 26](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=37)
- 2. BASIC ROMs: [Apple II Reference Manual (1979), p. 54](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=65); also [Apple II Reference Manual (1979), p. 33](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=44)
- 3. Sound: [Apple II Reference Manual (1979), p. 31](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=42)
- 4. Video (graphics switch): [Apple II Reference Manual (1979), p. 13](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=24) **verify**
- 5. Disk: [Disk II Installation and Operating Manual, p. 8](https://archive.org/download/Disk_II_Floppy_Disk_Subsystem_Installation_and_Operating_Manual/Disk_II_Floppy_Disk_Subsystem_Installation_and_Operating_Manual_text.pdf#page=12); also [The DOS Manual (DOS 3.3), p. 11](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=23)

### Apple II Plus (apple2plus)

- Boot: Applesoft II BASIC (Autostart ROM) (prompt ]). Source: [Apple II Reference Manual (1979), p. 36](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=47)
- 1. Screen: [Apple II Reference Manual (1979), p. 36](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=47); also [Apple II Reference Manual (1979), p. 33](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=44)
- 2. Sound: [Apple II Reference Manual (1979), p. 31](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=42)
- 3. Video (color): [Applesoft BASIC Programming Reference Manual, p. 5](https://archive.org/download/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer.pdf#page=20)
- 4. Video (high-res): [Applesoft BASIC Programming Reference Manual, p. 26](https://archive.org/download/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer.pdf#page=41)
- 5. Game controls: [Applesoft BASIC Programming Reference Manual, p. 90](https://archive.org/download/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer.pdf#page=102)
- 6. Disk: [The DOS Manual (DOS 3.3), p. 12](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=24); also [The DOS Manual (DOS 3.3), p. 11](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=23)

### Apple IIe (apple2e)

- Boot: Startup disk in drive 1, else Applesoft BASIC (prompt ]). Source: [Apple IIe Technical Reference Manual, ch. 4, The Cold-Start Procedure, p. 92](https://archive.org/download/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf#page=126)
- 1. Screen: [Apple IIe Owner's Manual, p. 32](https://archive.org/download/apple-iie-owner-manual/Image081917200555.merged_text.pdf#page=36); also [Apple IIe Technical Reference Manual, ch. 4, The Cold-Start Procedure, p. 92](https://archive.org/download/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf#page=126)
- 2. RAM and ROM self-test: [Apple IIe Owner's Manual, p. 108](https://archive.org/download/apple-iie-owner-manual/Image081917200555.merged_text.pdf#page=112); also [Apple IIe Technical Reference Manual, Automatic Self-Test, p. 95](https://archive.org/download/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf#page=129) **conflict**
- 3. Keyboard: [Apple IIe Owner's Manual, p. 36](https://archive.org/download/apple-iie-owner-manual/Image081917200555.merged_text.pdf#page=40)
- 4. Sound: [Apple IIe Technical Reference Manual, Control Characters With COUT1 and BASICOUT, p. 52](https://archive.org/download/Apple_IIe_Technical_Reference_Manual/Apple_IIe_Technical_Reference_Manual_text.pdf#page=86)
- 5. Video (color): [Applesoft BASIC Programming Reference Manual, p. 5](https://archive.org/download/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer.pdf#page=20)
- 6. 80-column card: [Apple IIe Owner's Manual, p. 75](https://archive.org/download/apple-iie-owner-manual/Image081917200555.merged_text.pdf#page=79)
- 7. Game controls: [Applesoft BASIC Programming Reference Manual, p. 90](https://archive.org/download/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer.pdf#page=102)
- 8. Disk: [The DOS Manual (DOS 3.3), p. 12](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=24); also [The DOS Manual (DOS 3.3), p. 11](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=23)

### Apple IIc (apple2c)

- Boot: Disk in the built-in drive, else Check Disk Drive (prompt ]). Source: [Apple IIc Technical Reference Manual, p. 51](https://archive.org/download/Apple_IIc_Technical_Reference_Manual/Apple_IIc_Technical_Reference_Manual_text.pdf#page=79)
- 1. Screen: [Apple IIc Owner's Manual, p. 12](https://archive.org/download/AppleIIcOwnersManual/Apple%20IIc%20Manual_text.pdf#page=28)
- 2. No disk: [Apple IIc Technical Reference Manual, p. 51](https://archive.org/download/Apple_IIc_Technical_Reference_Manual/Apple_IIc_Technical_Reference_Manual_text.pdf#page=79)
- 3. Keyboard: [Apple IIc Owner's Manual, p. 20](https://archive.org/download/AppleIIcOwnersManual/Apple%20IIc%20Manual_text.pdf#page=36)
- 4. Sound: [Apple IIc Technical Reference Manual, Control characters with COut1, p. 65](https://archive.org/download/Apple_IIc_Technical_Reference_Manual/Apple_IIc_Technical_Reference_Manual_text.pdf#page=93)
- 5. Video (color): [Applesoft BASIC Programming Reference Manual, p. 5](https://archive.org/download/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer.pdf#page=20)
- 6. 80 columns: [Apple IIc Owner's Manual, p. 19](https://archive.org/download/AppleIIcOwnersManual/Apple%20IIc%20Manual_text.pdf#page=35)
- 7. Game controls: [Applesoft BASIC Programming Reference Manual, p. 90](https://archive.org/download/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer/Applesoft_BASIC_Programming_Reference_Manual_Apple_Computer.pdf#page=102)
- 8. Disk restart: [Apple IIc Technical Reference Manual, p. 52](https://archive.org/download/Apple_IIc_Technical_Reference_Manual/Apple_IIc_Technical_Reference_Manual_text.pdf#page=80)

### Disk II (disk2)

- Boot: No screen of its own: the computer boots DOS from drive 1. Source: [The DOS Manual (DOS 3.3), p. 12](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=24)
- 1. Disk: [The DOS Manual (DOS 3.3), p. 12](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=24); also [The DOS Manual (DOS 3.3), p. 11](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=23)
- 2. Read: [The DOS Manual (DOS 3.3), p. 16](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=28)
- 3. Write and read back: [The DOS Manual (DOS 3.3), p. 15](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=27); also [The DOS Manual (DOS 3.3), p. 16](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=28)
- 4. Format: [The DOS Manual (DOS 3.3), p. 14](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=26)
- 5. Drive 2: [The DOS Manual (DOS 3.3), p. 22](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=34)

### DuoDisk (duodisk)

- Boot: No screen of its own: the computer boots DOS from drive 1 (left). Source: [DuoDisk Owner's Manual, Identifying Your Startup Drive, p. 3](https://archive.org/download/addom/DUODISK_OwnersManual_text.pdf#page=11)
- 1. Disk: [The DOS Manual (DOS 3.3), p. 12](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=24); also [DuoDisk Owner's Manual, Operating Your Drive, PDF p. 27](https://archive.org/download/addom/DUODISK_OwnersManual_text.pdf#page=27)
- 2. Read: [The DOS Manual (DOS 3.3), p. 16](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=28)
- 3. Right drive (drive 2): [The DOS Manual (DOS 3.3), p. 22](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=34)
- 4. Write and read back: [The DOS Manual (DOS 3.3), p. 15](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=27); also [The DOS Manual (DOS 3.3), p. 16](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=28)
- 5. Format: [The DOS Manual (DOS 3.3), p. 14](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=26)

### UniDisk 5.25 (unidisk525)

- Boot: No screen of its own: the computer boots DOS from it. Source: [UniDisk Owner's Manual, Getting Better Acquainted, PDF p. 14](https://archive.org/download/Apple_II_UniDisk_Owners_Manual/Apple_II_UniDisk_Owners_Manual_text.pdf#page=14)
- 1. Disk: [The DOS Manual (DOS 3.3), p. 12](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=24); also [UniDisk Owner's Manual, Getting Better Acquainted, PDF p. 14](https://archive.org/download/Apple_II_UniDisk_Owners_Manual/Apple_II_UniDisk_Owners_Manual_text.pdf#page=14)
- 2. Read: [The DOS Manual (DOS 3.3), p. 16](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=28)
- 3. Write and read back: [The DOS Manual (DOS 3.3), p. 15](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=27); also [The DOS Manual (DOS 3.3), p. 16](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=28)
- 4. Format: [The DOS Manual (DOS 3.3), p. 14](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=26)
- 5. Second UniDisk (drive 2): [The DOS Manual (DOS 3.3), p. 22](https://archive.org/download/The_DOS_Manual_HQ/The_DOS_Manual_HQ_text.pdf#page=34)

### Atari 400 (atari400)

- Boot: ATARI COMPUTER - MEMO PAD, or Atari BASIC with the cartridge (prompt READY). Source: [Atari 800 Owner's Guide (1981), Turning on, PDF p. 6](https://archive.org/download/Atari_800_Owners_Guide_1981_Atari/Atari_800_Owners_Guide_1981_Atari_text.pdf#page=6)
- 1. Screen: [Atari 800 Owner's Guide (1981), Turning on, PDF p. 6](https://archive.org/download/Atari_800_Owners_Guide_1981_Atari/Atari_800_Owners_Guide_1981_Atari_text.pdf#page=6)
- 2. Keyboard: [Atari 800 Owner's Guide (1981), The Atari 800 keyboard, PDF p. 8](https://archive.org/download/Atari_800_Owners_Guide_1981_Atari/Atari_800_Owners_Guide_1981_Atari_text.pdf#page=8)
- 3. BASIC cartridge: [Atari 800 Owner's Guide (1981), Cartridges, PDF p. 7](https://archive.org/download/Atari_800_Owners_Guide_1981_Atari/Atari_800_Owners_Guide_1981_Atari_text.pdf#page=7)
- 4. Video (graphics): [Atari BASIC Reference Manual, p. 51](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=61); also [Atari BASIC Reference Manual, p. 50](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=60)
- 5. Sound: [Atari BASIC Reference Manual, p. 57](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=67); also [Atari BASIC Reference Manual, p. 58](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=68)
- 6. Joystick: [Atari BASIC Reference Manual, p. 59](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=69); also [Atari BASIC Reference Manual, p. 60](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=70)
- 7. Tape: [Atari BASIC Reference Manual, p. 24](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=34)
- 8. Disk: [Atari BASIC Reference Manual, p. 31](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=41)

### Atari 800 (atari800)

- Boot: ATARI COMPUTER - MEMO PAD, or Atari BASIC with the cartridge (prompt READY). Source: [Atari 800 Owner's Guide (1981), Turning on, PDF p. 6](https://archive.org/download/Atari_800_Owners_Guide_1981_Atari/Atari_800_Owners_Guide_1981_Atari_text.pdf#page=6)
- 1. Screen: [Atari 800 Owner's Guide (1981), Turning on, PDF p. 6](https://archive.org/download/Atari_800_Owners_Guide_1981_Atari/Atari_800_Owners_Guide_1981_Atari_text.pdf#page=6)
- 2. Keyboard: [Atari 800 Owner's Guide (1981), The Atari 800 keyboard, PDF p. 8](https://archive.org/download/Atari_800_Owners_Guide_1981_Atari/Atari_800_Owners_Guide_1981_Atari_text.pdf#page=8)
- 3. BASIC cartridge: [Atari 800 Owner's Guide (1981), Cartridges, PDF p. 7](https://archive.org/download/Atari_800_Owners_Guide_1981_Atari/Atari_800_Owners_Guide_1981_Atari_text.pdf#page=7)
- 4. Video (graphics): [Atari BASIC Reference Manual, p. 51](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=61); also [Atari BASIC Reference Manual, p. 50](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=60)
- 5. Sound: [Atari BASIC Reference Manual, p. 57](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=67); also [Atari BASIC Reference Manual, p. 58](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=68)
- 6. Joystick: [Atari BASIC Reference Manual, p. 59](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=69); also [Atari BASIC Reference Manual, p. 60](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=70)
- 7. Tape: [Atari BASIC Reference Manual, p. 24](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=34)
- 8. Disk: [Atari BASIC Reference Manual, p. 31](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=41)

### Atari 600XL (atari600xl)

- Boot: Built-in Atari BASIC (prompt READY). Source: [Atari 800XL Field Service Manual Rev. 01, Function keys, p. I-1](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=9)
- 1. Screen: [Atari 800XL Field Service Manual Rev. 01, Function keys, p. I-1](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=9)
- 2. Self Test menu: [Atari 800XL Field Service Manual Rev. 01, Self Test, p. 2-1](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=25); also [Atari 800XL Field Service Manual Rev. 01, Self Test, p. 2-2](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=26)
- 3. RAM and ROM: [Atari 800XL Field Service Manual Rev. 01, Memory test, p. 2-2](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=26)
- 4. Sound and video: [Atari 800XL Field Service Manual Rev. 01, Audio Visual test, p. 2-2](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=26)
- 5. Keyboard: [Atari 800XL Field Service Manual Rev. 01, Keyboard test, p. 2-2](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=26)
- 6. Joystick: [Atari BASIC Reference Manual, p. 59](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=69); also [Atari BASIC Reference Manual, p. 60](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=70)
- 7. Tape: [Atari BASIC Reference Manual, p. 24](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=34)
- 8. Disk: [Atari BASIC Reference Manual, p. 31](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=41)

### Atari 800XL (atari800xl)

- Boot: Built-in Atari BASIC (prompt READY). Source: [Atari 800XL Field Service Manual Rev. 01, Function keys, p. I-1](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=9)
- 1. Screen: [Atari 800XL Field Service Manual Rev. 01, Function keys, p. I-1](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=9)
- 2. Self Test menu: [Atari 800XL Field Service Manual Rev. 01, Self Test, p. 2-1](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=25); also [Atari 800XL Field Service Manual Rev. 01, Self Test, p. 2-2](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=26)
- 3. RAM and ROM: [Atari 800XL Field Service Manual Rev. 01, Memory test, p. 2-2](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=26)
- 4. Sound and video: [Atari 800XL Field Service Manual Rev. 01, Audio Visual test, p. 2-2](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=26)
- 5. Keyboard: [Atari 800XL Field Service Manual Rev. 01, Keyboard test, p. 2-2](https://archive.org/download/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/Atari_800XL_Computer_Field_Service_Manual_Rev_01_Feb_1984_text.pdf#page=26)
- 6. Joystick: [Atari BASIC Reference Manual, p. 59](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=69); also [Atari BASIC Reference Manual, p. 60](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=70)
- 7. Tape: [Atari BASIC Reference Manual, p. 24](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=34)
- 8. Disk: [Atari BASIC Reference Manual, p. 31](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=41)

### Atari 130XE (atari130xe)

- Boot: Built-in Atari BASIC (prompt READY). Source: [Sams Computerfacts Atari 130XE, General operating instructions, PDF p. 14](https://archive.org/download/manual_130XE_SM_ATARI_EN/130XE_SM_ATARI_EN_text.pdf#page=14)
- 1. Screen: [Sams Computerfacts Atari 130XE, General operating instructions, PDF p. 14](https://archive.org/download/manual_130XE_SM_ATARI_EN/130XE_SM_ATARI_EN_text.pdf#page=14)
- 2. Self Test menu: [Sams Computerfacts Atari 130XE, Self-test, PDF p. 9](https://archive.org/download/manual_130XE_SM_ATARI_EN/130XE_SM_ATARI_EN_text.pdf#page=9)
- 3. RAM and ROM: [Sams Computerfacts Atari 130XE, Self-test, PDF p. 9](https://archive.org/download/manual_130XE_SM_ATARI_EN/130XE_SM_ATARI_EN_text.pdf#page=9)
- 4. Sound and video: [Sams Computerfacts Atari 130XE, Self-test, PDF p. 9](https://archive.org/download/manual_130XE_SM_ATARI_EN/130XE_SM_ATARI_EN_text.pdf#page=9)
- 5. Keyboard: [Sams Computerfacts Atari 130XE, Self-test, PDF p. 9](https://archive.org/download/manual_130XE_SM_ATARI_EN/130XE_SM_ATARI_EN_text.pdf#page=9)
- 6. Joystick: [Atari BASIC Reference Manual, p. 59](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=69); also [Atari BASIC Reference Manual, p. 60](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=70)
- 7. Tape: [Atari BASIC Reference Manual, p. 24](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=34)
- 8. Disk: [Atari BASIC Reference Manual, p. 31](https://archive.org/download/atari-400-800-basic-ref/Image091917210858.merged_text.pdf#page=41)

### ColecoVision (colecovision)

- Boot: The cartridge: its title screen, then the SKILL/PLAYER OPTION screen. Source: [ColecoVision Owner's Manual (1982), To start play, PDF p. 8](https://archive.org/download/Colecovision_Owners_Manual_1982_Coleco/Colecovision_Owners_Manual_1982_Coleco_text.pdf#page=8)
- 1. Screen and cartridge: [ColecoVision Owner's Manual (1982), To start play, PDF p. 8](https://archive.org/download/Colecovision_Owners_Manual_1982_Coleco/Colecovision_Owners_Manual_1982_Coleco_text.pdf#page=8); also [ColecoVision Owner's Manual (1982), Inserting the cartridge, PDF p. 7](https://archive.org/download/Colecovision_Owners_Manual_1982_Coleco/Colecovision_Owners_Manual_1982_Coleco_text.pdf#page=7)
- 2. Keypad: [ColecoVision Owner's Manual (1982), Hand controllers, PDF p. 8](https://archive.org/download/Colecovision_Owners_Manual_1982_Coleco/Colecovision_Owners_Manual_1982_Coleco_text.pdf#page=8)
- 3. ROM and RAM (diagnostic cartridge): [ColecoVision Technical (Repair) Manual, VI-1, diagnostic cartridge](https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf#page=29)
- 4. Video (diagnostic cartridge): [ColecoVision Technical (Repair) Manual, VI-1, diagnostic cartridge](https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf#page=29); also [ColecoVision Technical (Repair) Manual, VI-3, video and color test pictures](https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf#page=31)
- 5. Sound (diagnostic cartridge): [ColecoVision Technical (Repair) Manual, VI-1, diagnostic cartridge](https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf#page=29)
- 6. Controllers (diagnostic cartridge): [ColecoVision Technical (Repair) Manual, VI-1, diagnostic cartridge](https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf#page=29)

### Coleco ADAM (adam)

- Boot: SmartWRITER electronic typewriter. Source: [ADAM System Check-Out and Trouble-Shooting Guide (1983), Check out your system, p. 3](https://archive.org/download/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco_text.pdf#page=4)
- 1. Power and screen: [ADAM System Check-Out and Trouble-Shooting Guide (1983), Check out your system, pp. 2-3](https://archive.org/download/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco_text.pdf#page=4)
- 2. Printer: [ADAM System Check-Out and Trouble-Shooting Guide (1983), Check out your system, p. 3](https://archive.org/download/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco_text.pdf#page=4)
- 3. Keyboard and printer: [ADAM System Check-Out and Trouble-Shooting Guide (1983), Checking the keyboard, p. 5](https://archive.org/download/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco_text.pdf#page=5)
- 4. Game controller: [ADAM System Check-Out and Trouble-Shooting Guide (1983), Checking the game controller, p. 6](https://archive.org/download/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco_text.pdf#page=6)
- 5. Data pack drive: [ADAM System Check-Out and Trouble-Shooting Guide (1983), Using data packs in word processing, p. 8](https://archive.org/download/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco_text.pdf#page=7); also [ADAM System Check-Out and Trouble-Shooting Guide (1983), Checking the data pack drives, p. 7](https://archive.org/download/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco/ADAM_System_Check-Out_and_Trouble-Shooting_Guide_1983_Coleco_text.pdf#page=6)
- 6. SmartBASIC from tape: [ADAM Family Computer System Set-Up Manual (1984), p. 44](https://archive.org/download/ADAM_Family_Computer_System_Set-Up_Manual_1984_Coleco/ADAM_Family_Computer_System_Set-Up_Manual_1984_Coleco_text.pdf#page=46)
- 7. Cartridge: [ADAM Family Computer System Set-Up Manual (1984), p. 44](https://archive.org/download/ADAM_Family_Computer_System_Set-Up_Manual_1984_Coleco/ADAM_Family_Computer_System_Set-Up_Manual_1984_Coleco_text.pdf#page=46)

### TI-99/4A (ti994a)

- Boot: Master title screen, then the master selection list (prompt >). Source: [TI-99/4A User's Reference Guide, p. II-4](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=24)
- 1. Screen: [TI-99/4A User's Reference Guide, p. II-4](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=24)
- 2. Keyboard: [TI-99/4A User's Reference Guide, p. I-5](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=13)
- 3. Video: [TI-99/4A User's Reference Guide, p. II-75](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=95)
- 4. Sound: [TI-99/4A User's Reference Guide, p. II-85](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=105)
- 5. Joysticks: [TI-99/4A User's Reference Guide, p. II-90](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=110); also [TI-99/4A User's Reference Guide, p. I-5](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=13)
- 6. Tape: [TI-99/4A User's Reference Guide, p. II-42](https://archive.org/download/userrefguide/userrefguide_text.pdf#page=62)

### ZX81 (zx81)

- Boot: BASIC command mode: a clear screen with the cursor. Source: [ZX81 Service and Assembly Manual (transcribed), p. 4, faultfinding](https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf#page=5)
- 1. Power: [ZX81 Service and Assembly Manual (transcribed), p. 4, faultfinding (a)](https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf#page=5)
- 2. Screen: [ZX81 Service and Assembly Manual (transcribed), p. 4, faultfinding (a), (d)](https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf#page=5)
- 3. Keyboard: [ZX81 Service and Assembly Manual (transcribed), p. 4, faultfinding (c)](https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf#page=5)
- 4. Power supply: [ZX81 Service and Assembly Manual (transcribed), p. 4, faultfinding (e)](https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf#page=5)

### ZX Spectrum 48K (spectrum)

- Boot: Sinclair BASIC: the copyright message, K mode (prompt K). Source: [ZX Spectrum Introduction booklet, ch. 1, The computer and setting it up](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_one.html)
- 1. Screen: [ZX Spectrum Introduction booklet, ch. 1, The computer and setting it up](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_one.html); also [ZX Spectrum Introduction booklet, ch. 7, Colours](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_seven.html)
- 2. Keyboard: [ZX Spectrum Introduction booklet, ch. 2, The keyboard](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_two.html)
- 3. Video (color): [ZX Spectrum Introduction booklet, ch. 7, Colours](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_seven.html)
- 4. Sound: [ZX Spectrum Introduction booklet, ch. 8, Sound](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_eight.html)
- 5. Tape (write): [ZX Spectrum Introduction booklet, ch. 6, Using the cassette recorder](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_six.html)
- 6. Tape (read): [ZX Spectrum Introduction booklet, ch. 6, Using the cassette recorder](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_six.html)

### ZX80 (zx80)

- Boot: BASIC command mode (prompt K). Source: [Sinclair ZX80 Operating Manual, p. 11](https://archive.org/download/zx80operatingmanual/ZX80%20Operating%20Manual_text.pdf#page=8)
- 1. Screen: [Sinclair ZX80 Operating Manual, p. 11](https://archive.org/download/zx80operatingmanual/ZX80%20Operating%20Manual_text.pdf#page=8)
- 2. Keyboard and BASIC: [Sinclair ZX80 Operating Manual, p. 21](https://archive.org/download/zx80operatingmanual/ZX80%20Operating%20Manual_text.pdf#page=18)
- 3. Tape (write): [Sinclair ZX80 Operating Manual, p. 11](https://archive.org/download/zx80operatingmanual/ZX80%20Operating%20Manual_text.pdf#page=8); also [Sinclair ZX80 Operating Manual, p. 12](https://archive.org/download/zx80operatingmanual/ZX80%20Operating%20Manual_text.pdf#page=9)
- 4. Tape (read): [Sinclair ZX80 Operating Manual, p. 12](https://archive.org/download/zx80operatingmanual/ZX80%20Operating%20Manual_text.pdf#page=9)

### ZX Spectrum 128 (spectrum128)

- Boot: Main menu: Tape Loader, 128 BASIC, Calculator, 48 BASIC, Tape Tester. Source: [ZX Spectrum 128 Introduction, p. 4 (Getting started)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p04.html)
- 1. Screen: [ZX Spectrum 128 Introduction, p. 4 (Getting started)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p04.html)
- 2. Video and sound (TV test): [ZX Spectrum 128 Introduction, p. 2 (TV test screen)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p02.html)
- 3. Video (color): [ZX Spectrum 128 Introduction, p. 6 (Start typing)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p06.html); also [ZX Spectrum Introduction booklet, ch. 7, Colours](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_seven.html)
- 4. Tape: [ZX Spectrum 128 Introduction, p. 5 (Using the Tape Tester)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p05.html)
- 5. 48K mode: [ZX Spectrum 128 Introduction, p. 4 (48 BASIC)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p04.html)

### ZX Spectrum +2 (spectrumplus2)

- Boot: Main menu: Tape Loader, 128 BASIC, Calculator, 48 BASIC, Tape Tester. Source: [ZX Spectrum 128 Introduction, p. 4 (Getting started)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p04.html) **verify**
- 1. Screen: [ZX Spectrum 128 Introduction, p. 4 (Getting started)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p04.html) **verify**
- 2. Video and sound (TV test): [ZX Spectrum 128 Introduction, p. 2 (TV test screen)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p02.html) **verify**
- 3. Video (color): [ZX Spectrum 128 Introduction, p. 6 (Start typing)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p06.html); also [ZX Spectrum Introduction booklet, ch. 7, Colours](https://worldofspectrum.org/ZXSpectrumIntroduction/chapter_seven.html) **verify**
- 4. Tape: [ZX Spectrum 128 Introduction, p. 5 (Using the Tape Tester)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p05.html) **verify**
- 5. 48K mode: [ZX Spectrum 128 Introduction, p. 4 (48 BASIC)](https://worldofspectrum.org/ZXSpectrum128Manual/sp128p04.html) **verify**

### ZX Spectrum +3 (spectrumplus3)

- Boot: Opening menu: Loader, +3 BASIC, Calculator, 48 BASIC. Source: [Spectrum +3 Manual, ch. 2, The opening menu](https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter2.html)
- 1. Screen and drives: [Spectrum +3 Manual, ch. 2, The opening menu](https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter2.html)
- 2. Video and sound (test signal): [Spectrum +3 Manual, ch. 2, Preparing to tune-in your TV](https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter2.html)
- 3. Sound (AY chip): [Spectrum +3 Manual, ch. 8 part 19, Sound](https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter8pt19.html)
- 4. Sound (beeper): [Spectrum +3 Manual, ch. 8 part 19, Sound](https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter8pt19.html)
- 5. Disk: [Spectrum +3 Manual, ch. 6, Disk catalog](https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter6.html)
- 6. Tape: [Spectrum +3 Manual, ch. 8 part 20, File operations](https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter8pt20.html)
- 7. 48K mode: [Spectrum +3 Manual, ch. 7, Using 48 BASIC](https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter7.html)

### Timex Sinclair 1000 (ts1000)

- Boot: BASIC command mode: the cursor at the lower left. Source: [Timex Sinclair 1000 User Manual, p. 8](https://archive.org/download/timex-sinclair-1000-user-manual/Timex-Sinclair1000UserManual_text.pdf#page=16)
- 1. Screen: [Timex Sinclair 1000 User Manual, p. 8](https://archive.org/download/timex-sinclair-1000-user-manual/Timex-Sinclair1000UserManual_text.pdf#page=16)
- 2. Keyboard: [Timex Sinclair 1000 User Manual, p. 10](https://archive.org/download/timex-sinclair-1000-user-manual/Timex-Sinclair1000UserManual_text.pdf#page=18)
- 3. Tape: [Timex Sinclair 1000 User Manual, p. 11](https://archive.org/download/timex-sinclair-1000-user-manual/Timex-Sinclair1000UserManual_text.pdf#page=19); also [Timex Sinclair 1000 User Manual, p. 10](https://archive.org/download/timex-sinclair-1000-user-manual/Timex-Sinclair1000UserManual_text.pdf#page=18)

### Timex Sinclair 1500 (ts1500)

- Boot: BASIC command mode: the cursor at the lower left. Source: [Timex Sinclair 1500 User Manual, p. 9](https://archive.org/download/timexsinclair-1500-user-manual/timexsinclair-1500-user-manual_text.pdf#page=19)
- 1. Screen: [Timex Sinclair 1500 User Manual, p. 9](https://archive.org/download/timexsinclair-1500-user-manual/timexsinclair-1500-user-manual_text.pdf#page=19)
- 2. Keyboard: [Timex Sinclair 1500 User Manual, p. 13](https://archive.org/download/timexsinclair-1500-user-manual/timexsinclair-1500-user-manual_text.pdf#page=23)

### Timex Sinclair 2068 (ts2068)

- Boot: Timex Sinclair BASIC: the copyright notice. Source: [Timex Sinclair 2068 User Manual, ch. 1, How to set up the computer](https://archive.org/download/timex-2068-user-manual/Timex%202068%20User%20Manual_text.pdf#page=23)
- 1. Screen: [Timex Sinclair 2068 User Manual, ch. 1, How to set up the computer](https://archive.org/download/timex-2068-user-manual/Timex%202068%20User%20Manual_text.pdf#page=23)
- 2. Video (color): [Timex Sinclair 2068 User Manual, p. 56](https://archive.org/download/timex-2068-user-manual/Timex%202068%20User%20Manual_text.pdf#page=70)
- 3. Sound (beeper): [Timex Sinclair 2068 User Manual, p. 66](https://archive.org/download/timex-2068-user-manual/Timex%202068%20User%20Manual_text.pdf#page=80)
- 4. Sound (AY chip): [Timex Sinclair 2068 User Manual, p. 186](https://archive.org/download/timex-2068-user-manual/Timex%202068%20User%20Manual_text.pdf#page=200)
- 5. Joystick: [Timex Sinclair 2068 User Manual, p. 174](https://archive.org/download/timex-2068-user-manual/Timex%202068%20User%20Manual_text.pdf#page=188)
- 6. Tape: [Timex Sinclair 2068 User Manual, p. 50](https://archive.org/download/timex-2068-user-manual/Timex%202068%20User%20Manual_text.pdf#page=64)

## Review fixes

Fixes after the adversarial review of 2026-11-01 (`docs/reviews/first-boot-2026-11-01/`). Every page below was
reopened and read again for this pass. The review ran on a copy with four planted errors (C64 39811, CoCo CLS(3)
red, CoCo SOUND 2 seconds, IIe CAPS LOCK swapped); the working data already reads 38911, blue, 6 seconds and
lower case with CAPS LOCK up, so those four were left alone.

Wrong, corrected:
- **Apple IIe check 2 (self-test)**: the result now goes by model. Original IIe: KERNEL OK after about 20 seconds
  (Apple IIe Owner's Manual, p. 108, PDF p. 112). Enhanced IIe: System OK after several seconds (Apple IIe
  Technical Reference Manual, Automatic Self-Test, p. 95, PDF p. 129; the preface, p. xxix, says this edition
  describes the enhanced IIe). Any other message: power off, run the test again, then service (TRM p. 95). The
  conflict note is gone: the two manuals describe two models, not one disagreement.
- **Atari 800 check 3 (BASIC cartridge)**: the procedure now keeps POWER on and opens the door; opening switches the
  computer off and closing switches it back on, then the power light and READY (Atari 800 Owner's Guide (1981),
  Cartridges, PDF p. 7; READY as the Atari BASIC prompt: Atari BASIC Reference Manual, Appendix G, Glossary, p. G-4,
  PDF p. 104).
- **Atari 400 check 3 (BASIC cartridge)**: the 400 now has its own boot and checks 1-3 from the Atari 400 Operators
  Manual (archive.org `Atari400OperatorsManual`, no printed page numbers): 5. Power Up, PDF p. 10 (door switch,
  power light, restart on closing); Screen Display, PDF p. 11 (MEMO PAD); 6. Using the Keyboard, PDF p. 12 (cursor);
  Special Computer Keys, PDF p. 15 (inverse video); 7. Inserting Cartridges, PDF p. 16 (one slot, no "left");
  11. Writing BASIC Source Programs, PDF p. 21 (READY after inserting BASIC and powering up). The 800 manual's
  "white" cursor and color-shift clauses were dropped for the 400; this manual does not state them.
- **Spectrum +3 check 6 (tape)**: SAVE "t:" first, as the page does; at start-up the default drive is A:. The
  expectation now also gives the second block (Spectrum +3 Manual, ch. 8 part 20, File operations).

Unproven, now cited:
- **Apple II boot**: also Apple II Reference Manual (1979) p. 33 (PDF p. 44, prompts * and >), p. 36 (PDF p. 47,
  Autostart beep, APPLE ][, disk boot) and p. 54 (PDF p. 65, CTRL-B).
- **UniDisk 5.25 boot**: also The DOS Manual (DOS 3.3), p. 12 (PDF p. 24), PR#6 boots DOS.
- **Atari 400 and 800 boot**: 400 as above; 800 also Owner's Guide PDF p. 7 (door interlock) and BASIC Reference
  Manual p. G-4 (READY).
- **Atari 600XL boot and checks 1-5**: now from the Atari 600XL Field Service Manual Rev. 1 (archive.org
  `Atari600XLComputerFieldServiceManualRev1`): Function keys, p. 1-1 (PDF p. 11); Self Test, pp. 2-1 to 2-3 (PDF
  pp. 27-29). The memory test shows sixteen 1K blocks on the 600XL, not 48; the keyboard check adds the CONTROL,
  SHIFT, RESET, HELP and BREAK notes from p. 2-3. The unproven "POWER light comes on" clause was dropped from check 1.
- **Atari 800XL boot and check 1**: also 800XL Field Service Manual p. 2-1 (PDF p. 25), "the Basic Ready prompt";
  the POWER light clause was dropped.
- **Atari 130XE boot**: also Sams Computerfacts 130XE, Self-test, PDF p. 9 (OPTION or BYE).
- **Atari tape check (all five)**: "or 1010" and "READY returns" removed; Atari BASIC Reference Manual p. 24 only
  says one bell, PLAY, RETURN, and that CLOAD loads the program.
- **ColecoVision boot**: also Owner's Manual, Inserting the cartridge, PDF p. 7 (power off to insert or remove).
- **ADAM boot and check 6**: Coleco ADAM SmartBASIC Manual, Loading SmartBASIC, p. 9 (archive.org
  `coleco-adam-smart-basic-manual`, leaf n20, read from the page image): pack in, reset, "Coleco SmartBASIC V1.0"
  and the ] prompt; also Set-Up Manual p. 44 (no pack: Electronic Typewriter). Check 6 now expects the banner
  and ] instead of "SmartBASIC loads".
- **C16 boot**: also Commodore Plus/4 User's Manual p. 16 (PDF p. 22), as check 1 already cites.
- **C64 check 2 (video)**: source is now C64 User's Guide p. 60 (PDF p. 67; the page image labels 53280 BORDER
  COLOR), also p. 61 (color codes 2 red, 14 light blue).
- **C64 check 4 (sound)**: now the exact sample program of User's Guide p. 80-81 (clear chip, delay, note off);
  expect one short note. The old "steady note" from a shortened direct-mode version is gone.
- **VIC-20 check 1**: "A RAM expansion raises the number" removed. **Check 2**: "normal" removed; the values are
  read straight from the POKE 36879 table on p. 37 (page image: 26 white/red, 8 black/black, 27 white/cyan).
- **C128 boot**: also Introductory Guide pp. 19-21 (PDF pp. 25-27): C128 mode, C= for C64 mode, CP/M boot.
  Check 3 (COLOR 4,3) keeps System Guide p. 97 and p. 99; p. 99 prints COLOR 1,3 as red and COLOR 4,1 as the
  border, so the red border is shown, not guessed.
- **1541 check 3, and the C64 and VIC-20 disk checks that share it**: "disk name" and "BLOCKS FREE" removed;
  expect FOUND $ and a list of files (1541 User's Guide p. 10, also p. 9: the directory lists every file).
- **Spectrum boot**: prompt K removed; the cited ch. 1 shows the copyright message and says a key press clears it.
- **TI-99/4A check 3**: also User's Reference Guide p. II-6 (PDF p. 26), FCTN 4 (CLEAR) stops a running program.
  **Check 4**: also p. II-84 (PDF p. 104), duration in milliseconds.

Unproven, now marked verify:
- **C64 check 5 (joystick)**: Programmer's Reference Guide p. 344 reads 56320 and 56321 in a masked subroutine,
  not two raw reads in a loop.
- **ZX81 boot**: only the Service and Assembly Manual fault-finding page; no user-manual start-up page found.
- Already verify and kept: Apple II check 4 (C050/C051), Spectrum +2 boot and checks 1-5 (Spectrum 128 manual).

US spelling: ZX80 checks 1, 3 and 4, grey to gray. COLOUR in BBC/Electron commands, manual titles ("Colours") and
literal screen text were left as printed.
