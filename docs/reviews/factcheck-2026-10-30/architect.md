| Item kind | Checked / total | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| Connector orientation | 67 / 71 | 41 | 10 | 16 |
| Shared chip text | 11 / 36 | 4 | 6 | 1 |
| Replacement claims | 11 / 123 | 4 | 3 | 4 |
| Photo outlines | 10 / 10 | 8 | 0 | 2 |
| **Total** | **99 / 240** | **57** | **19** | **23** |

**Partial coverage: 141 items remain unchecked.** All 55 photo boxes were viewed; no box on a different chip was established. Shared-chip checks concern cross-machine wording. The [per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/item-decisions.md) records every decision, source/page and limitation.

1. **High — MSX2 `vdp9938` → V9958 is not pin-compatible.** Pin **21** changes from composite VIDEO output to **+5 V DAC supply input**. Pins **4, 26 and 27** also change functions. Correct classification: adapter/rewiring. The warning in the note does not make the classification true. Checked [V9938 pp. 114–115](https://archive.org/download/bitsavers_yamahaYamanicalDataBookAug85_6932685/Yamaha_V9938_MSX-Video_Technical_Data_Book_Aug85.pdf#page=127) and [V9958 pp. 3–4](https://vgamuseum.info/images/doc/yamaha/v9958.pdf#page=7). Map: `boundary-discipline`.

2. **High — ColecoVision `rom2764`, U2, has the wrong stock-ROM pin text.** The 9464C-0036 has **2=NC, 20=A11, 23=A12**; the shared record says **A12, /CE, A11**. The EPROM pin map applies after the WJ4/WJ5 conversion, not to the stock mask ROM. Checked [schematic Rev J, sheet 9, U2](https://colecovisionadam.com/Coleco/adam/Documents/Manual/Console-Schematic.pdf#page=9). Map: `boundary-discipline`.

3. **High — C16 and Plus/4 `c16-exp` are mirrored.** The external machine view has **pin 1 at the right and 25 at the left**. The site reverses this, including the +5 V contacts. **Both assigned `edge-25x25-cbm` records are wrong.** Checked CN4 in the explicitly external-view [connector map, printed p. 33](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-1.jpg). Map: `foundational-thinking`.

4. **High — C64 `c64-exp` is mirrored.** Correct upper row is **22 … 1**, left to right. The drawn +5 V pin 2 occupies the position of real **pin 21/D0**. Checked [C64 Programmer’s Reference p. 396](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf#page=415). This geometry is **not wrong everywhere**: VIC-20 `vic20-cart` correctly numbers from the left, as [VIC-20 p. 281](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf#page=297) shows. Map: `foundational-thinking`.

5. **High — Atari 400/800 `atari-cart` swaps the rows.** Correct view has **A–S above 1–15**. The site places +5 V contact **13** on the side containing **P/A10**. **Both assigned `edge-15x15-cbm` records are wrong.** Checked the cited [FAQ cartridge drawing](https://www.atarimania.com/faq-atari-400-800-xl-xe-what-are-the-pinouts-for-the-various-connectors-on-the-atari_16.html); [Atari’s Fig. 1-11, p. 1-14](https://archive.org/download/Atari600XLComputerFieldServiceManualRev1/Atari_600XL_Computer_Field_Service_Manual_Rev_1_text.pdf#page=24) independently labels letters “console top” and numbers “console bottom.” Map: `foundational-thinking`.

6. **High — Atari 130XE `atari-eci` swaps the rows.** Correct front view has **A–H above 1–7**: **7/+5 V is lower right; H/GND is upper right**. The site reverses them. This affects the assigned `edge-7x7-cbm` geometry throughout. Checked [Sams CC16 terminal guides, printed p. 25, J4B FRONT VIEW](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n6). Map: `boundary-discipline`.

7. **High — TS2068 `ts2068-dock` is upside down relative to the working front view.** Correct J4 view has **even contacts above odd, 2 upper left and 1 lower left**. The site draws odd contacts above even, with 1 at the right. Checked [Technical Manual Fig. 2.4.2-2, p. 59](https://k1.spdns.de/Vintage/Sinclair/82/Timex%20Sinclair%202068/Tech%20Specs%20and%20Repair/Timex%20Sinclair%202068%20-%20Technical%20Manual.pdf#page=67). Map: `redesign-from-first-principles`.

8. **High — Plus/4 `c16-video` pin 8 is NC, not +5 V.** The C16 does provide +5 V there; its wiring must not be inherited by the Plus/4. Both the [connector map](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg) and [Plus/4 manual, PDF p. 21, CN7](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf#page=21) show it unconnected. Map: `boundary-discipline`.

9. **High — Shared `rom2316` applies Apple select wiring to TRS-80 ROMs.** Model III ROM C **U106 has pin 18 grounded, pin 21 tied +5 V, and pin 20 driven by /ROMC**. The shared text instead describes Apple /INH-related and pulsing select signals. Checked [Apple II p. 94](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=105) against [Model III Fig. 6, p. 33](https://archive.org/download/Model_III_Technical_Reference_Manual_1981_Tandy/Model_III_Technical_Reference_Manual_1981_Tandy.pdf#page=44). Map: `boundary-discipline`.

10. **Medium — Apple II/II Plus `ii-slot` omits slot restrictions.** **Pin 19 carries video-generator SYNC only in slot 7; other slots leave it unconnected. Pin 35 COLOR REF is also slot-7-only.** Pin 19 is not CPU opcode-fetch SYNC. Checked [Fig. 21 and Table 33, pp. 106–108](https://archive.org/download/Apple_II_Reference_Manual_1979_Apple/Apple_II_Reference_Manual_1979_Apple_text.pdf#page=117). Map: `boundary-discipline`.

11. **Medium — Shared `rom23256` pins 20/22/27 describe CPC wiring universally.** On **1581 U2**, pin **22 is hard-grounded**, pin **20 is decoded by U6**, and pin **27 addresses a DOS ROM**, not OS/BASIC halves. Checked [1581 schematic sheet 1, p. 15](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1581/1581_Service_Manual_314982-01_%281987_Jun%29.pdf#page=18), against the [CPC6128 schematic pp. 19–20](https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n16). Map: `boundary-discipline`.

12. **Medium — Shared `ppi8255` leaks IBM addresses into CPC/MSX records.** Unqualified port **$60/$62** labels accompany PA/PC pins. CPC6128 **IC107 port A connects to the AY sound-chip bus**, rather than IBM keyboard circuitry. Checked [CPC6128 schematic pp. 19–20](https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n16) versus [IBM PC p. 1-12](https://bitsavers.org/pdf/ibm/pc/pc/1502234_PC_Technical_Reference_Apr83.pdf#page=20). Map: `boundary-discipline`.

13. **Medium — Shared `mux14529` pin 9 gives Dragon references on the CoCo.** Dragon **R55/LM393** wiring does not describe the CoCo 1’s **R48/LM339 U14** path. Checked [Dragon SA2120 sheet 2](https://dragondata.worldofdragon.org/tech/circuit-diag/D32/SA/D32-SA21202-IO.gif) and [Tandy 8000073 sheet 2, printed p. 71](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%201%20Schematic%20%28Tandy%29.pdf#page=2). Map: `boundary-discipline`.

14. **Medium — `fdc1770` → WD1772 omits the 1581 jumper condition.** **J1 must be installed for WD1770 and removed for WD1772.** The stepping-rate warning alone is incomplete. Checked [1581 schematic p. 17, note 1](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1581/1581_Service_Manual_314982-01_%281987_Jun%29.pdf#page=20), alongside the [WD stepping table p. 48](http://www.bitsavers.org/components/westernDigital/_dataBooks/wd1984storageProducts_01.pdf#page=58). Map: `redesign-from-first-principles`.

15. **Medium — `vdp9918` → TMS9928A/9929A is also misclassified.** Pins **35/36/38** change from external-video/composite/CPUCLK to B−Y/Y/R−Y. The note acknowledges modifications; the classification should require circuitry/rewiring. Checked both [TI terminal tables, pp. 3-9 and 3-11](https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf#page=52). Map: `foundational-thinking`.

16. **Low — Shared `fdc1770` pin 28 should explain acknowledgement.** INTRQ is set at command completion and reset by reading Status; “a high pulse” omits that latched behavior. Checked [WD handbook p. 45, INTRQ row](http://www.bitsavers.org/components/westernDigital/_dataBooks/wd1984storageProducts_01.pdf#page=55). Map: `boundary-discipline`.

The **23 unverifiable decisions** include unsupported connector views, four replacement claims without the required pinout comparison, unresolved SN94624 clock/divider text, and two photo limitations. Spectrum 128 **A23/B23** remains unresolved because service-manual p. 1.22 conflicts with the other cited map. I did not guess between them. Details are in the ledger.

Source-link problems:

- [Cited C16 PDF](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_%281984_Oct%29.pdf): damaged page catalog. Used a [working alternate scan](https://myretrostore.co.uk/wp-content/uploads/2020/11/C16_Service_Manual_Preliminary_314001-03_1984_Oct.pdf).
- Carlsen’s [1541-II](https://portcommodore.com/rcarlsen/cbm/1541/1541-II/1541-II.txt) and [1581](https://portcommodore.com/rcarlsen/cbm/1581/1581.txt) links returned HTTP 406 here.
- [F18A compatibility page](https://dnotq.io/f18a/pinout.html): certificate failure here; replacement comparison remains incomplete.
- The Wayback-wrapped Oric schematic links were inaccessible; the readable Oric Owner schematic did not establish the physical connector view.

Only `./.factcheck-tmp/` was written.