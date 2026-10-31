| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 221 | 210 | 4 | 7 |
| clock-row | 15 | 1 | 0 | 14 |
| first-ten | 3 | 0 | 0 | 3 |
| replacement-modern | 5 | 2 | 0 | 3 |
| scope | 1 | 0 | 0 | 1 |
| **Total** | **245** | **213** | **4** | **28** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-38-ledger.md)

1. **High — items 0–1: LM324 pin labels swapped.** DIP pin **1 is 1OUT**; pin **3 is 1IN+**. The batch reverses those labels while retaining the correct descriptions and directions. [TI datasheet, p. 3](https://www.ti.com/lit/ds/symlink/lm324.pdf#page=3). **The checkout already has both labels correct**; this discrepancy is in the supplied batch. Maps to `prove-it-works`, `fix-root-causes`.

2. **Medium — item 224: `/IORQ` probe rule excludes valid pulses.** “Port access only” is false: pin 20 also asserts during interrupt acknowledgement, together with `/M1`. [Zilog manual, printed p. 6](https://www.zilog.com/docs/z80/um0080.pdf#page=20). Maps to `prove-it-works`, `fix-root-causes`.

3. **Medium — item 222: HALT exit conditions are incomplete.** Reset also exits HALT; a maskable interrupt exits only when enabled. An arbitrary interrupt pulse does not guarantee release. [Zilog manual, printed pp. 6 and 181](https://www.zilog.com/docs/z80/um0080.pdf#page=195). Maps to `prove-it-works`, `fix-root-causes`.

No dead or blocked source links were found. Incorrect printed-page labels: Sather Figure 9.7 is **9-11**, Table 9.1 is **9-12**, and Drive Off/On is **9-14**. PS0178’s linked PDF page 33 is printed page **37**.

All items were reviewed. The 28 unverifiable items have specific evidence gaps recorded in the ledger. No application data was modified.