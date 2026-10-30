| Item kind | Listed | Checked | Confirmed | Wrong | Unverifiable | Not checked |
|---|---:|---:|---:|---:|---:|---:|
| Chip pins | 413 | 129 | 112 | 14 | 3 | 284 |
| Connector pins | 629 | 75 | 63 | 1 | 11 | 554 |
| **Total** | **1,042** | **204** | **175** | **15** | **14** | **838** |

Partial fact-check of the supplied minimalist.json: completed zero-based item indices 0-128 and 413-487, the Commodore records. The other 838 items were not checked. Every one of the 1,042 listed items has at least one source URL; the supplied list contains no wholly unsourced chip or connector pin records.

An item is UNVERIFIABLE when at least one of its claims remains unsupported; this does not mean its pin number and name are necessarily wrong. Source-silent findings below identify the specific extra assertion to remove or mark unverified. Documents were cached by source, PDFs extracted with pdftotext -layout, and scan pages rendered at 110 dpi and inspected. Local curl failed on HTTPS because of Schannel credentials; Python TLS recovered those downloads. That local failure was not classified as a dead source.

The [per-item decisions](minimalist/item-results.md) and [JSON evidence ledger](minimalist/item-results.json) include all 1,042 entries, with NOT CHECKED kept separate from UNVERIFIABLE.

1. **HIGH - WRONG: plus4 / c16-video, pin 8, is presented as a supply contact.** The primary name and expected value are +5 V. The cited [Plus/4 connector map, single image, CN7 video](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg) marks pin 8 N.C. The [C16 schematic 251788 sheet 1, printed p. 7 / PDF p. 12](<http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf#page=12>) does show +5 V, but for the C16. The existing conflict warning acknowledges this difference; it does not correct the Plus/4 row's primary power label. **Correct the Plus/4 instance to NC and remove its +5 V expectation; retain +5 V for the C16.** A technician could wire a cable or seek a supply on the wrong contact.

2. **MEDIUM - WRONG: vic2 pins 24 (A0), 28 (A4), and vic2e pins 32 (A0), 33 (A1), are not output-only.** All four say dir=out. These address lines output video addresses and accept CPU register-select addresses. **Correct dir to bidir.** Checked [C64 Programmer's Reference Guide, printed pp. 450 and 452 / PDF pp. 469 and 471](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf#page=469), and [C128 Service Manual, printed p. 35 / PDF p. 37](<http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c128/servicemanuals/Commodore_128_128D_Service_Manual_314001-08_(1987_Nov).pdf#page=37>).

3. **MEDIUM - WRONG: vic6560 pin 21 (A0) omits its output role.** dir=in and the description mention only CPU register selection. The [MOS 6560/6561 data sheet, scan 6560-09.gif, Address Bus section](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6560.zip) explicitly makes pins 21-34 bidirectional: inputs during CPU access and outputs during video fetch. **Use dir=bidir and describe both roles.**

4. **MEDIUM - WRONG: vdc8563 pin 31 (DA5) is an address output, not a combined address/data pin.** The record says dir=bidir and describes an address/data bus. The [C128 Service Manual, printed p. 38 / PDF p. 40](<http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c128/servicemanuals/Commodore_128_128D_Service_Manual_314001-08_(1987_Nov).pdf#page=40>) separates DA0-DA7, the local DRAM address bus, from DD0-DD7, the bidirectional data bus. **Use dir=out, local display DRAM address bit 5.**

5. **MEDIUM - WRONG: vic6560 pins 5 (DB11) and 6 (DB10) are not bidirectional CPU data pins.** Both say dir=bidir. The [6560/6561 data sheet, scan 6560-09.gif, Data Bus section](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6560.zip) distinguishes the lower eight bidirectional CPU/display data lines from the upper four lines used exclusively to retrieve color/mode information. **Use dir=in for these two color-data pins.**

6. **MEDIUM - WRONG: cia6526 pins 5 (PA3), 6 (PA4), and 15 (PB5) reverse the documented keyboard roles.** The descriptions assign CIA1 port A to rows and port B to columns. The [C64 Programmer's Reference Guide, printed pp. 328-329 / PDF pp. 347-348](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf#page=347) assigns port A to keyboard column values and port B to row values. **Correct PA3/PA4 to column scanning and PB5 to row scanning.** Also remove joystick from PB5: the same manual, printed p. 343 / PDF p. 362, limits joystick switches to bits 0-4.

7. **MEDIUM - WRONG: ted7360 pin 7 (R/W) is labeled input-only despite an output function.** The [TED System Hardware Manual, p. 9](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf#page=9) says it accepts CPU R/W and actively pulls the line high during TED fetches through an open-source output. The prose includes that behavior but dir=in discards it. **Use an input/output classification that preserves the active pull-up output role.**

8. **MEDIUM - WRONG: ted7360 pin 12 (Phi OUT) gives the wrong NTSC fast-clock value.** It states 0.89 / 1.76 MHz (NTSC). The [TED System Hardware Manual, pp. 33 and 35](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf#page=35) gives the NTSC doubled clock as **1.788 MHz, about 1.79 MHz**; p. 35 distinguishes that from the PAL value. **Replace 1.76 MHz with the cited NTSC value, or remove the numeric pair.**

9. **MEDIUM - UNVERIFIABLE: remove or mark these unsupported extra assertions.** Keep the supported pin identities. The checked relevant source pages do not establish the following claims.

   | Record and pin | Unsupported claim | Source checked | Should the data drop it? |
   |---|---|---|---|
   | vic2, 35 DB11 and 38 DB8 | dir=bidir for the upper color-data lines | C64 PRG pp. 450, 452; 6567 preliminary specification PDF pp. 1, 15, which expressly describes DB0-DB7 as bidirectional | Drop the asserted direction or mark it unverified until an explicit upper-bus source is cited. |
   | cia8520, 39 SP | Selecting output mode makes SP go LOW | [8520 specification 318029 rev. C, sheet 9, section 1.5.11](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/8520_datasheet.pdf#page=9) | Drop that initial-level assertion; retain bidirectional serial data. |
   | c64 / c64-video, 1 LUM | About 1 V p-p into 75 ohms | C64 PRG p. 396; C64/C64C Service Manual p. 10 document the signal/routing, not that connector measurement | Drop the numeric expectation or mark it unverified. |
   | vic20 / vic20-video, 5 VIDEO HIGH | About 1 V p-p into 75 ohms | [VIC-20 PRG, p. 282 / PDF p. 298](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf#page=298) | Drop the numeric expectation or mark it unverified. |
   | vic20 / vic20-cass, F SENSE | Exact idle voltage and PLAY/REC/FF/REW switch behavior | VIC-20 PRG p. 282 gives F=6 cassette switch only | Drop the voltage/key list pending a cassette circuit or switch specification. |
   | pet / pet-ieee, 5 EOI and A DIO5 | Active-LOW behavior and approximately +5 V idle | [IEEE-488 J1/J12 connector drawing, single page](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/IEEE-488_pinout.gif) | Drop those electrical assertions or add an electrical/interface source. |
   | pet / pet-user, 11 GRAPHIC | Graphic/lowercase character-set selection behavior | [PET J2 connector drawing, single page](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/PET_User_Port_pinout.gif) labels GRAPHIC but does not explain its operation | Retain GRAPHIC; mark the expanded behavior unverified. |
   | pet / pet-user, C PA0 and K PA6 | Register addresses $E841 and $E843 | PET J2 connector drawing contains no register addresses | Drop the addresses or add a memory-map source. |
   | pet / pet-cass1, 3 MOTOR | Several volts on; 0 V off | [PET J3/J6 cassette connector drawing, single page](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/ports/Datasette_pinout.gif) gives CASS MOTOR without operating voltages | Drop the expectation or add the motor circuit. |
   | plus4 / c16-cass, 5 WRITE | Internal routing from 7501 P1 on the Plus/4 | C16 schematic 251788 sheet 2, p. 8, establishes the C16 route; the cited Plus/4 connector image establishes WRITE but not its CPU connection | Retain WRITE; drop or mark the Plus/4-specific internal route unverified. |
   | c1541 / 1541-iec, 5 DATA | One drive stuck LOW hangs the whole bus | [1540/1541 Service Manual, PDF p. 12](<http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf#page=12>) and schematic 355207 p. 43 support DATA wiring, not this diagnostic consequence | Mark the diagnostic sentence unverified or cite a diagnostic source. |

10. **LOW - WRONG: pla8721 pin 32 (CLRBNK) is expanded as Clear bank.** The [C128 Service Manual, printed p. 29 / PDF p. 31](<http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c128/servicemanuals/Commodore_128_128D_Service_Manual_314001-08_(1987_Nov).pdf#page=31>) identifies a **color RAM bank-select output**. Keep CLRBNK and replace the misleading expansion.

Principle mapping: findings 1-8 are outcome-oriented-execution; finding 9 is subtract-before-you-add; finding 10 also favors deleting an unsupported expansion. Cost-aware-delegation is reflected in bounded coverage and shared-document caching; it does not justify treating the other 838 pins as checked.

Source links needing attention:

- [C128 PRG RGBI citation #page=407](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=407): Table 12-6 is on PDF p. 408. The expansion Table 12-9 cited at PDF p. 409 is on p. 410; the controller table cited at p. 408 is on p. 409. The cassette table is printed p. 398, not the cited printed p. 399.
- [Ray Carlsen fix1541.txt](https://portcommodore.com/rcarlsen/cbm/1541/fix1541.txt): returned HTTP 406 in this run. Web search found the same URL but no recovered primary copy. Treat it as access-blocked, not proven permanently dead. The head-resistance claim was independently checked against the cited service manual.
- No other link is declared dead from this partial review. The C128 service manual was inspected through the same-document Zimmers mirror after the initial Archive.org curl/TLS failure.
