**Do not commit.** All 83 scope rows received a decision in the [ledger](P:/retro-bench/.tmp/review-fix2/.factcheck-tmp/fixreview2/fa-atari-coleco-ledger.md).

| Scope | Items | Correct | Wrong | Unproven |
|---|---:|---:|---:|---:|
| Atari | 48 | 47 | 0 | 1 |
| Coleco | 34 | 31 | 2 | 1 |
| Additional correction | 1 | 0 | 1 | 0 |
| **Total** | **83** | **78** | **3** | **2** |

“Correct” includes honest removals and verification flags; it does not prove the flagged claim.

1. **High — SALLY pin 8 incorrectly changed to ground.** It is **VCC, +5 V**. Atari 800XL FSM Fig. 1-3/PDF 13, MOS PDF 10, and Sams CC16 PDF 5 agree. Using this pin for a grounded probe clip can short the supply. `atari.js:59`

2. **Medium — Coleco luma levels remain wrong.** TM VII-16/PDF 71 supports approximately **2.2 V sync, 2.6 V blanking, 3.8 V peak**, with scan uncertainty—not the new 2.0/2.4/3.5 V. `coleco.js:631`

3. **Medium — ADAM VDP correction is incomplete.** The clock name says TMS9928A, but its probe location still says TMS9918A. TRM PDF 33 identifies the 9928 family. `coleco.js:725`

4. **Medium — ADAM chip-pin tolerances remain unproven.** TRM §6.3/PDF 49 specifies cable voltages. It neither establishes those limits at the 4116 pins nor prints the negative tolerance needed to derive −5.40 V. `coleco.js:711`

5. **Medium — Atari 400 scope frequencies remain unproven by their citation.** Sams CC5 PDF 40 does not print 1.79 MHz. Rounding the values does not supply the missing attribution. `atari.js:633,636`

6. **Medium — Print cards discard verification flags.** Executing the actual renderers confirmed flagged clocks display CHECK in the app but lose it when printed. This affects the newly quarantined bench data.

Findings map to **prove-it-works** and **fix-root-causes**. No shared-state mutation defect was established.

Only `.factcheck-tmp/` was written. Nothing was committed; no physical hardware testing was performed.