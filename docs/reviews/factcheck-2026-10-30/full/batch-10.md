| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 139 | 137 | 2 | 0 |
| chip-pin | 88 | 75 | 0 | 13 |
| rail | 5 | 5 | 0 | 0 |
| clock-row | 3 | 0 | 0 | 3 |
| first-ten | 1 | 0 | 0 | 1 |
| **Total** | **236** | **217** | **2** | **17** |

All items have individual decisions in the [ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-10-ledger.md).

1. **HIGH — Item 0, Apple II keyboard pin 1:** Correct name is **+5 V**, not STROBE. Confusing supply and logic pins can lead to an incorrect power connection. [Table 30, p. 102](https://archive.org/details/Apple_II_Reference_Manual_1979_Apple/page/n112).
2. **HIGH — Item 1, Apple II keyboard pin 2:** Correct name is **STROBE**, not +5 V. It receives keyboard pulses of at least 10 µs. [Figure 18, p. 103](https://archive.org/details/Apple_II_Reference_Manual_1979_Apple/page/n113).

**These errors occur in the supplied batch; the checkout already has both labels correct.** Both findings map to `prove-it-works` and `fix-root-causes`.

No dead or wrong-document links were found. Incomplete citations: item 139 needs the DB-19 pinout on p. 274; items 233–235 need the other-chip pinouts beyond the cited TMG page.

The 17 unverifiable items contain unsupported direction claims, clock precision, or diagnostic clauses, detailed in the ledger. No application data was changed.