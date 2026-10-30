| Item kind | Checked | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| Chip pins | 59 | 52 | 3 | 4 |
| Connector pins | 145 | 133 | 1 | 11 |
| **Total** | **204** | **185** | **4** | **15** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/rest-minimalist-a/ledger.md) contains all 204 decisions and page evidence. No high finding was established. No wholly uncited record occurs in this remainder.

1. **Medium — WRONG: `mmu344`, pin 24, Cxxx (i131).** The description restricts it to `$C100–$CFFF` slot ROM. It enables decoding throughout `$C000–$CFFF`, including built-in I/O, subject to ROM-selection switches. Correct the description. Checked Sather, **pp. 2-12 and 7-2**. [Source](https://archive.org/details/Understanding_the_Apple_IIe/page/n169)

2. **Medium — WRONG: `kbd3600`, pin 5 (i140).** Fixed direction `in` contradicts the mask-option table: pin 5 can carry **AKO or B10 outputs**, as well as input functions. Use variant-dependent direction. Checked GI **p. 3-24, PDF 2**. [Source](https://www.bitsavers.org/components/gi/_dataSheets/AY-5-3600.pdf#page=2)

3. **Medium — WRONG: `duodisk/duo-db19`, pin 7 (i544).** The stated **11.3–12.5 V** band excludes voltages permitted by the cited IIc supply specification: **+12 V ±10%, or 10.8–13.2 V**. Use a host-specific range or delete the universal band. Checked IIc TRM **p. 234, Table 11-4**. [Source](https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n261)

4. **Medium — UNVERIFIABLE voltage bands:** `disk2/disk2-ribbon` pin 15 (i533), **11.3–12.5 V**; `duodisk/duo-db25` pins 7 and 24 (i537, i541), **4.75–5.25 V**. Pin identities match, but the cited schematics/cable document do not establish those tolerances. **Drop or mark the bands unverified.** Checked Disk II schematic **PDF 2** and TA37054 **pp. 1–2**. [Cable source](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20DuoDisk%205.25/Documentation/Apple%20DuoDisk%20-%20Cable%20Specifications.pdf)

5. **Medium — UNVERIFIABLE Atari controller band:** pin 7 on `atari400/atari-controller` (i552), `atari800/atari-controller-2` (i563), `atari800xl/atari-controller-2` (i584), and `atari130xe/atari-controller` (i594). **4.9–5.0 V is not a documented tolerance.** Sams’ 4.9 V is a measurement on one 130XE. Keep nominal +5 V; delete the acceptance band. Checked Sams **PDF 4** and Atari connector tables. [Sams source](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n3)

6. **Medium — UNVERIFIABLE: `atari800/atari-power`, pin 1 (i569).** The manual specifies **9 VAC**, but does not establish **9–11 VAC under load** as an acceptance range. Drop the additional limit. Checked **p. 1-6 and Fig. 2-8, p. 2-13**. [Source](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n18)

7. **Medium — UNVERIFIABLE electrical qualifiers:** `iou344` pin 15 (i136), **open-drain**; `glu2c` pin 14 (i152), **bidirectional**; `antic` pins 14 and 19 (i168–169), **bidirectional**. The cited material establishes the signal identities but does not explicitly establish these particular electrical claims. **Mark those fields unverified or omit them.** Checked IIe TRM **p. 167**, Sather **p. 4-2**, IIc TRM **p. 246**, and Atari FSM **p. 1-9**. [IIc source](https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n273)

8. **Medium — UNVERIFIABLE: `adam/adam-controller`, pins 2 and 6 (i622–623).** Functions match; **“above 2.2 V idle”** lacks a supporting ADAM service test. Table 1 specifies **2.0 V minimum logic-high**, which is a different claim. Drop the idle threshold or cite its test procedure. Checked **PDF 21, 35 and 47**. [Source](https://colecovisionadam.com/Coleco/adam/Documents/Manual/Coleco_ADAM_Technical_Reference_Manual.pdf#page=21)

9. **Medium — UNVERIFIABLE: `adam/adam-cart`, pin 22 (i620).** The table confirms **CS2**, but does not state `$A000–$BFFF`. The appendix decoder schematic remains too degraded to trace reliably after rendering at 110 and 330 dpi. Retain CS2; mark the bank range unverified pending a readable source. Checked **PDF 30 and 146**. [Source](https://colecovisionadam.com/Coleco/adam/Documents/Manual/Coleco_ADAM_Technical_Reference_Manual.pdf#page=146)

10. **Low — WRONG description: `kbd3600`, pin 2 (i139).** The generic option list includes functions unavailable on this pin. Pin 2 supports **LO/RO, complement control, or an internal-oscillator connection**, depending on configuration. Delete the broad list. Checked GI **p. 3-24, PDF 2**. [Source](https://www.bitsavers.org/components/gi/_dataSheets/AY-5-3600.pdf#page=2)

Principle mapping: findings **1–3 → outcome-oriented-execution**; **4–10 → subtract-before-you-add**. No separate cost-aware-delegation finding applies.

**Dead or wrong source links:** No dead URL remained among 33 retrieved sources. For i548–550, the Atari technical-reference citation labels Figure 9-4 **p. 145**, but the linked **PDF page 131 is printed p. 146**. Correct the page label; the link reaches the right figure. [Source](https://www.bitsavers.org/pdf/atari/400_800/CO16555_Atari_Home_Computer_Technical_Reference_Notes_1982.pdf#page=131)