| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 13 | 13 | 0 | 0 |
| connector-pin | 253 | 249 | 4 | 0 |
| first-ten | 1 | 0 | 0 | 1 |
| rail | 5 | 3 | 1 | 1 |
| **Total** | **272** | **265** | **5** | **2** |

1. **High — Keyboard signals swapped (i=13,14).** Correct names: **pin 1 = CLOCK; pin 2 = DATA**. The descriptions already describe the correct functions, contradicting their names and directing technicians to the wrong signal. Proven by [PC p. 1-78](https://bitsavers.org/pdf/ibm/pc/pc/1502234_PC_Technical_Reference_Apr83.pdf#page=86) and XT p. 4-13. Maps to **prove-it-works**, **fix-root-causes**.

2. **Medium — Wrong supply assigned to diskette PLL (i=30,178,270).** The IBM adapter’s MC4044 phase detector and 74LS624 oscillator use **+5 V**, not −5 V. Correct the repeated PLL attribution; the −5 V connector pins and voltage limits themselves are correct. Proven by [schematic D-58](https://bitsavers.org/pdf/ibm/pc/pc/1502234_PC_Technical_Reference_Apr83.pdf#page=533). Maps to **prove-it-works**, **fix-root-causes**.

**Unverifiable:** i=266’s bare-board load assurance and fan diagnosis; i=267’s “about 3 A for the board.” The cited text does not establish these claims.

**Dead or wrong source links:** None dead or pointing to the wrong document. Item 2’s citation labels printed p. **1-35** as **1-34**; its PDF anchor is correct.

[Full per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-25-ledger.md)