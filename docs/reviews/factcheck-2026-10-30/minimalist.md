| Item kind | Checked / listed | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| Chip pins | 129 / 413 | 112 | 14 | 3 |
| Connector pins | 75 / 629 | 63 | 1 | 11 |
| **Total** | **204 / 1,042** | **175** | **15** | **14** |

**Partial coverage: 838 items remain unchecked.** Completed the Commodore items. All 1,042 supplied items have citation URLs; none are wholly unsourced.

[Full report with source links and removal recommendations](P:/retro-bench/.tmp/review/.factcheck-tmp/minimalist-report.md) · [Per-item decisions](P:/retro-bench/.tmp/review/.factcheck-tmp/minimalist/item-results.md)

1. **HIGH — WRONG: `plus4 / c16-video`, pin 8.** Its primary name and expected value say `+5 V`; the cited **Plus/4 connector image, CN7 Video**, marks it **NC**. The C16 schematic supplies the +5 V value. The existing conflict warning acknowledges the difference, but the Plus/4 power label remains wrong. **Remove the +5 V claim from the Plus/4 instance.** [Source image](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg)

2. **MEDIUM — WRONG: four VIC address-pin directions.** `vic2` pins **24 A0, 28 A4**, and `vic2e` pins **32 A0, 33 A1**, say `out`. **Correct them to `bidir`**: they accept CPU register-select addresses as well as outputting video addresses. Checked **C64 Programmer’s Reference Guide, pp. 450, 452**, and **C128 Service Manual, p. 35**.  
   :codex-file-citation{path="P:/retro-bench/.tmp/review/.factcheck-tmp/ac378202cb58.pdf" purpose="source"} :codex-file-citation{path="P:/retro-bench/.tmp/review/.factcheck-tmp/c128-mirror.pdf" purpose="source"}

3. **MEDIUM — WRONG: `vic6560`, pin 21 A0.** `in` omits its video-address output role. **Correct to `bidir` and describe both roles.** Checked **6560/6561 data sheet, scan `6560-09.gif`, Address Bus section**. [Cited scans](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6560.zip)

4. **MEDIUM — WRONG: `vdc8563`, pin 31 DA5.** It says bidirectional address/data. **DA5 is an address output**; DD0–DD7 form the separate bidirectional data bus. Checked **C128 Service Manual, p. 38 / PDF p. 40**.

5. **MEDIUM — WRONG: `vic6560`, pins 5 DB11 and 6 DB10.** Both say `bidir`. **Correct to `in`**: these upper color-data lines retrieve color/mode information. Checked **6560/6561 data sheet, scan `6560-09.gif`, Data Bus section**.

6. **MEDIUM — WRONG: `cia6526`, pins 5 PA3, 6 PA4, 15 PB5.** The CIA1 descriptions reverse the cited keyboard roles. **Port A scans columns; port B reads rows.** Also remove joystick from PB5: joystick switches occupy bits 0–4. Checked **C64 Programmer’s Reference Guide, pp. 328–329, 343**.

7. **MEDIUM — WRONG: `ted7360`, pin 7 R/W.** `in` omits the active pull-up output during TED fetches. Preserve both roles in the direction classification. Checked **TED System Hardware Manual, p. 9**.  
   :codex-file-citation{path="P:/retro-bench/.tmp/review/.factcheck-tmp/19b76c71e5d2.pdf" purpose="source"}

8. **MEDIUM — WRONG: `ted7360`, pin 12 Phi OUT.** The claimed NTSC fast clock is **1.76 MHz**. The cited manual gives **1.788 MHz**, approximately **1.79 MHz**. Checked **TED System Hardware Manual, pp. 33, 35**.

9. **MEDIUM — UNVERIFIABLE: 14 items contain unsupported extra assertions.** These include upper-bus directions on `vic2` pins **35/38**; initial LOW behavior on `cia8520` pin **39**; video amplitudes on `c64-video` pin **1** and `vic20-video` pin **5**; cassette switch behavior on `vic20-cass` **F**; electrical behavior on `pet-ieee` **5/A**; expanded behavior or register addresses on `pet-user` **11/C/K**; motor voltage on `pet-cass1` **3**; Plus/4 internal routing on `c16-cass` **5**; and the bus-failure consequence on `1541-iec` **5**. **Drop or mark those specific assertions unverified.** The full report lists each checked source page and what supported data can remain.

10. **LOW — WRONG: `pla8721`, pin 32 CLRBNK.** “Clear bank” is the wrong expansion. It is a **color RAM bank-select output**. Checked **C128 Service Manual, p. 29 / PDF p. 31**.

Principle mapping: findings 1–8 concern **outcome-oriented-execution**; removing unsupported assertions in 9–10 follows **subtract-before-you-add**. **Cost-aware-delegation** informed bounded coverage; unchecked items received no inferred verdict.

Source links needing attention:

- [C128 PRG](http://www.zimmers.net/anonftp/pub/cbm/manuals/c128/C128_Programmers_Reference_Guide.pdf#page=407): RGBI table belongs at **PDF 408**, expansion table at **410**, controller table at **409**. The cassette table’s printed page is **398**, not 399.
- [Ray Carlsen `fix1541.txt`](https://portcommodore.com/rcarlsen/cbm/1541/fix1541.txt): **HTTP 406** during this run—access-blocked, not proven permanently dead. No other link is declared dead from this partial review.