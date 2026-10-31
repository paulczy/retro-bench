| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 233 | 227 | 4 | 2 |
| scope | 2 | 0 | 0 | 2 |
| **Total** | **235** | **227** | **4** | **4** |

1. **High — i=0,1: 2764 address-pin names swapped.** Correct: **pin 2=A12; pin 3=A7**. The descriptions already contain the correct bit numbers. [Intel handbook, p. 4-19](https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf#page=401).
2. **High — i=58: wrong latch to probe.** MCM6670 pin 1 receives bit 6 from **Z27 pin 13**, not Z28. [TRS-80 handbook, p. 35](https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf#page=36).
3. **Medium — i=125: reset behavior needs qualifications.** HS remains **undefined until R2 is programmed**. Also, RESET LOW with LPSTB HIGH selects test mode. The unconditional “outputs LOW” description misses these states. [MC6845 datasheet, p. 9](https://bitsavers.org/components/motorola/_dataSheets/6845.pdf#page=9).

Findings map to **prove-it-works**; the swapped labels and wrong latch also map to **fix-root-causes**.

Source issues:

- [CPCWiki archive](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/765_FDC): HTTP 429; live page HTTP 403.
- **i=89:** cited datasheet does not establish the claimed polarity mask option.
- **i=175:** accessible citations do not establish the 200 ms index period.
- **i=197,198:** cited NEC datasheet does not establish CPC-specific 4 MHz operation.

[Complete per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-23-ledger.md). Only `.factcheck-tmp/` was modified.