| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 106 | 74 | 2 | 30 |
| clock-row | 4 | 1 | 0 | 3 |
| connector-pin | 97 | 96 | 1 | 0 |
| first-ten | 5 | 0 | 0 | 5 |
| rail | 11 | 2 | 0 | 9 |
| **Total** | **223** | **173** | **3** | **47** |

1. **High — item 19:** ANTIC pin **2 is AN0**, not AN1. Its bit-0 description is correct. [400/800 manual, p. 1-9](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n21).
2. **High — item 20:** ANTIC pin **3 is AN1**, not AN0. Its bit-1 description is correct. [400/800 manual, p. 1-9](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n21).
3. **Medium — item 137:** Atari 400 cartridge pin **14 is not connected**. The record incorrectly gives it working RD5 RAM-deselect behavior. [400 schematic, p. 2-4](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n42).

All three findings map to **prove-it-works** and **fix-root-causes**.

No dead source documents remained. Citation problems:

- **Item 0:** cites an 800XL document for a 600XL claim.
- **Item 5:** links the 800 flowchart; the [400 flowchart is p. 5-16](https://archive.org/details/atari400800fieldservicemanualmay1983/page/n113).
- **Items 3–4, 49, 103, 110:** attribute Sams facts without the corresponding Sams citations.
- **Items 2, 5–7:** exact frequency remains unresolved: the cited document prints **3.579575 MHz**, while the records say **3.579545 MHz**.

[Complete 223-item ledger, including reasons for all 47 unverifiable decisions](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-13-ledger.md). No application data was changed.