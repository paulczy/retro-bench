# Apple disk drives verification — 2026-10-30

Disk II (with the Disk II Interface Card), DuoDisk and UniDisk 5.25, added to `src/data/apple.js` as machines with
`kind: 'drive'`.

## Sources used

| Source | URL | Covered |
|---|---|---|
| Apple schematic 050-0005-01, Disk II Interface Card (rev 01, 1978) | mirrors.apple2.org.za A2DP `.../Apple Disk II Interface Card/Schematics/Apple Disk II - Schematics 050-0005-01.pdf#page=2` | 20-pin header pinout (card side), P5/P6/74LS323/74LS174/74LS259 pin use, Q1-Q3 power switching |
| Apple schematic 050-0007-H, Disk II Analog Board (revs 00-H) | A2DP `.../Apple Disk II/Schematics/Apple Disk II - Schematics Analog Board 050-0007-H.pdf#page=2` | 20-pin header (drive side), edge connector to the mechanism, ULN2003/74LS125/MC3470/CA3146 pin use, TP1-TP9, revision history |
| Disk ][ Technical Procedures (Apple, 1982-84) | asimov `.../storage/disks/Apple Disk II Technical Procedures.pdf` (also archive.org `Apple_Disk_II_Technical_Procedures`) | Cable fitting, DSPEED (±26, set -5..0), write-protect adjustment, amplitude/azimuth/radial/comparator-offset tests, troubleshooting chart, analog-card chip-swap charts (D4 2003, B4 74LS125, A3 CA3146, B1 3470; C4 470 µF 6.3 V) |
| Disk II Floppy Disk Subsystem Installation and Operating Manual | asimov `.../Disk II Floppy Disk Subsystem Installation and Operating Manual.pdf` | Centring the ribbon plug, DRIVE 1/DRIVE 2 headers |
| Understanding the Apple II (Sather), ch. 9 | archive.org `understanding_the_apple_ii` pages n230-n267 | 300 rpm, drive power, Figure 9.3 drive pinout, write protect via phase 1, MC3470 and R21 change, Table 9.1 soft switches, drive-on actions (sequencer power), 1 s turn-off, boot recalibration (80 steps, 38-40 tracks) |
| Sams COMPUTERFACTS CD6, Apple II Model A2M0003 (Disk II), 3-85 | asimov `.../Sams Technical - Disk II.pdf` (archive.org `Sams_Technical_Disk_II`) | Model number, parts list (CA3146E write amp, CX065B speed IC, VR1 50 kΩ), service voltages (11.6/10.8 V at Q1, 5.0 V C4, -12.0 V C5, 10.4/6.0 V motor), strobe speed check, J2 stepper check |
| AppleService Technical Procedures, Apple DuoDisk (1985-89) | asimov `.../AppleService Technical Procedures - Apple DuoDisk.pdf` | Product description, same mechanism as UniDisk/5.25 Drive, DSPEED hole, flowchart, analog card versions, C29/C30 fix, C21 fuzz, chip-swap chart (CA3141 B1, 74LS125 B3/C3, MC3470 C1), cable 590-0114, serial < 325000 |
| Apple TIL TA37054, DuoDisk cable specifications and pinouts | A2DP `.../Apple DuoDisk 5.25/Documentation/Apple DuoDisk - Cable Specifications.pdf` | DB-19 to DB-25 pin table |
| DuoDisk Owner's Manual | archive.org `addom` | Controller card, back-panel D connector |
| UniDisk Owner's Manual (5.25) | archive.org `Apple_II_UniDisk_Owners_Manual` | Two drives per card, daisy chain, in-use light |
| Apple IIc Technical Reference Manual | archive.org `Apple_IIc_Technical_Reference_Manual` n148, n149, n261, n274, n300, n301 | External port, converter limits, port power warning, boot from external drive |
| The DOS Manual (DOS 3.3) | archive.org `The_DOS_Manual_HQ` n37, n126, n130, n162-n164 | DOS 3.3 commands and I/O ERROR causes |
| A2DP photos (analog card 650-0103, interface card 650-X104, 5.25 controller card, DuoDisk back, UniDisk back and bottom) | A2DP `Photos/` folders | Header orientation, chip markings (TBP28L22 in P5/P6), model labels A9M0108, A9M0104, connector genders |
| TI data sheets ULN2003A (SLRS027T), SN74LS125A (SDLS044A), SN74LS174 (SDLS068A), SN74LS259B (SDLS086), SN54/74LS323 (SDLS160) | ti.com symlink PDFs | Pinouts |
| Motorola MC3470/MC3470A data sheet | bitsavers `components/motorola/_dataSheets/MC3470.pdf` | Pin connection, supplies |
| RCA 1978 Linear Integrated Circuits databook | bitsavers, PDF pp. 211, 243 | CA3146 and CA3141 terminal diagrams |
| MMI 1980 Bipolar LSI Databook (2nd ed.) | bitsavers, PDF pp. 19, 22 | 6308/6309 256 × 8 pinout; cross-reference (6309 = 74S471; 74S287 = 6301 256 × 4) |
| Apple, UniDisk floppy disk power usage (9 Mar 1983) | A2DP `.../Apple UniDisk 5.25/Schematics/...Power Usage Oscilloscope Screens.pdf` | Current profile (kept `verify`: the tested drive may not be the production UniDisk 5.25) |
| "Apple Floppy Drives" list (community) | asimov `apple_floppy_disk_drives.pdf` | UniDisk needs -12 V; Disk II re-cabling. Secondary, `verify` |

## Chips verified

| Chip | Pins | verifiedAgainst |
|---|---|---|
| mc3470 (new) | 18/18 | Motorola MC3470 data sheet p. 7-109 + schematic 050-0007-H |
| ls125 (new) | 14/14 | TI SDLS044A p. 1 + 050-0007-H |
| ca3146 (new) | 14/14 | RCA 1978 databook (PDF p. 211) + 050-0007-H |
| ca3141 (new) | 16/16 | RCA 1978 databook Fig. 1 (PDF p. 243). DuoDisk board use not documented |
| disk2p5, disk2p6 (new) | 20/20 each | MMI 1980 databook p. 3-5 (6309) + 050-0005-01 |
| ls323 (new) | 20/20 | TI SDLS160 p. 1 + 050-0005-01 |
| ls259 (new) | 16/16 | TI SDLS086 p. 1 + 050-0005-01 |
| ls174 (new) | 16/16 | TI SDLS068A p. 1 + 050-0005-01 |
| uln2003 | not redefined | Defined in commodore.js; matched against TI SLRS027T and fitted to `disk2` via `chipLocations` (D4) |
| iwm344 | unchanged pins | `unidisk525` added to `machines` with a host-side location |

## Changes

- New machines `disk2`, `duodisk`, `unidisk525` (`kind: 'drive'`, `status: 'ready'`), with chips, symptoms, connectors, power and quickref.
- Connectors: `disk2-ribbon` (analog card 2 × 10 header), `disk2-card-hdr` (interface card headers), `disk2-mech` (analog card edge to the mechanism), `duo-db25`, `duo-db19`, `uni-db19`.
- `iwm344.machines`: `['apple2c']` → `['apple2c', 'unidisk525']`.
- New glossary terms: `stepper`, `darlington`, `sequencer`.

## Conflicts

- The brief calls 650-X104 the analog card. The photo shows 650-X104 is the Disk II Interface Card; the analog card is 650-0103 (assembly 605-0103, schematic 050-0007, PCB 820-0007).
- The brief asks for a 74S287/82S129 pinout for P6. Those are 256 × 4 parts in 16 pins (MMI cross-reference: 74S287 = 6301). Apple's schematic shows 6309 (256 × 8, 20 pins) for both P5 and P6, the 341-0028 dump is a full 256 × 8, and the fitted parts in the photo are TI TBP28L22. The 6309 pinout is used.
- The brief names an MC3470 "or LM311" read chain and a Sams "CSCS" series. Rev H and the Technical Procedures list only MC3470 + CA3146 + 74LS125 + 2003; no LM311 was found. The Sams packet is COMPUTERFACTS CD6 / CP6.
- IIc TRM: DB-19 pin 17 is DR2* in Figure 11-26 and DR1* in Table 11-18 (kept as `conflict` on `uni-db19` pin 17). The controller-card DB-19 (TIL TA37054) uses pin 9 for ENBL B and pin 16 for +5 V; on the IIc those are /EXTINT and NC. This is a host difference, so it is noted in the descriptions, not marked as a conflict.
- Analog card 20-pin header: the card schematic draws WR REQ and RD DATA without overbars; the analog schematic draws /WR REQ and /RD DATA with overbars. /WR REQ is used (Sather says WRITE REQUEST'); RD DATA is named without a polarity.

## Still missing

- `disk2-mech`: the pin assignments come from the schematic, but the schematic does not show which side of the edge carries numbers and which letters. The `edge-14x14-cbm` drawing is unchecked (`verify: true`).
- Read/write head plug (4 wires: erase, R/W, R/W, centre tap): the schematic gives no pin numbers, so there is no entry.
- Spindle motor and motor speed control card connectors: no pin table found in Apple or Sams documents.
- DuoDisk analog card schematic: not found. Its chips are listed with locations from the Technical Procedures. How the CA3141 is used is unknown.
- UniDisk 5.25: no analog-card parts list or schematic was found, so only the controller and IWM chips are listed. The pin table for the daisy-chain DB-19 socket on the back of the drive was not found.
- Current draw: no Apple figure for the Disk II or DuoDisk. The 1983 UniDisk power study is kept as `verify`.
- ProDOS BASIC commands (PREFIX, -name, CAT) are marked `verify`. The ProDOS User's Manual on Asimov has no text layer, and "BASIC Programming with ProDOS" on archive.org is a lending copy.
- Searched without result: an Apple 5.25 Drive / UniDisk Technical Procedures, the DuoDisk analog schematic, and a Disk II spec sheet with current.

## For other files

- `commodore.js` `uln2003`: the pinout agrees with TI SLRS027T. Its role text ("1541-II stepper phase and spindle motor drivers") and pin notes are 1541-specific. Now that the Disk II also lists it, the owner may want to make the role generic.
- `schematics.js`: the validator reports `FAIL schematics: unknown machine dragon32`. This is not from apple.js; it appeared during this session.
