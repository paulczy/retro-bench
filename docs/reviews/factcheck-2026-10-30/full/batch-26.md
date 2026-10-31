| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 18 | 18 | 0 | 0 |
| connector-pin | 131 | 125 | 2 | 4 |
| first-ten | 6 | 0 | 2 | 4 |
| rail | 11 | 11 | 0 | 0 |
| chip-pin | 56 | 51 | 0 | 5 |
| scope | 1 | 0 | 0 | 1 |
| **Total** | **223** | **205** | **4** | **14** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-26-ledger.md)

1. **High — Items 18–19: XT slot A1/A2 names are swapped.** Correct: **A1 = −I/O CH CK; A2 = D7**. The stored names direct technicians to the wrong signal. [IBM, printed p. 1-17 / PDF p. 36](https://bitsavers.org/pdf/ibm/pc/xt/6361459_PC_XT_Technical_Reference_Apr84.pdf#page=36).

2. **High — Item 165: Spectrum converter check omits a damage warning and changes the diagnostic threshold.** Retroleum warns that replacement TR4/TR5 can burn again, requiring brief powered checks. It also calls for investigation beyond **±1 V from +12 V**, whereas the record accepts **10.8–13.2 V**. Use the source’s diagnostic threshold and preserve its warning. [Retroleum, lower-RAM fault checks](https://blog.retroleum.co.uk/electronics-articles/repairing-a-zx-spectrum).

3. **Medium — Item 149: Bare-board XT power-up does not meet the stated minimum load.** IBM requires **2.3 A on +5 V and 0.4 A on +12 V**. With all cards and drives removed, the board supplies no sustained +12 V load. Ensure both minimum loads before interpreting supply behavior. [IBM, p. 3-4 / PDF p. 69](https://bitsavers.org/pdf/ibm/pc/xt/6361459_PC_XT_Technical_Reference_Apr84.pdf#page=69); schematic p. 1-40 / PDF p. 59.

These findings map to **prove-it-works** and **fix-root-causes**. No shared-state mutation issue applies.

Source-link issues:

- **No dead links.**
- Yamaha’s cited pp. 1–2 locator should be **pp. 2–3** for pin layout and descriptions.
- GI test-pin instructions are on **PDF p. 13**, beyond the cited pp. 11–12 range.
- Item 222 lacks the [MSX frequency citation, printed p. 14](https://archive.org/details/MSXTechnicalDataBook/page/n16).

All 223 items were checked; the 14 unsupported items remain explicitly unresolved in the ledger. Application data was unchanged.