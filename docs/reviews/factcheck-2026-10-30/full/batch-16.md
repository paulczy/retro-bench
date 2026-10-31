| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 171 | 143 | 2 | 26 |
| first-ten | 21 | 13 | 0 | 8 |
| clock-row | 9 | 5 | 0 | 4 |
| scope | 19 | 8 | 0 | 11 |
| **Total** | **220** | **169** | **2** | **49** |

1. **High — item 0:** MSX1 printer pin **1** is **`/PSTB`**, not `PDB0`. The swapped label identifies the wrong probe point. [MSX Technical Data Book, p. 19](https://archive.org/details/MSXTechnicalDataBook/page/n21).
2. **High — item 1:** MSX1 printer pin **2** is **`PDB0`**, not `/PSTB`. [Same source, p. 19](https://archive.org/details/MSXTechnicalDataBook/page/n21).

Both findings map to **prove-it-works** and **fix-root-causes**. The supplied batch contains these swaps; current `src/data/msx.js` already has the correct labels.

**Dead or wrong source links:** None found. The 49 unverifiable entries contain unsupported subclaims, detailed individually in the [complete ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-16-ledger.md).

All 220 items received decisions. No files outside `.factcheck-tmp` changed.