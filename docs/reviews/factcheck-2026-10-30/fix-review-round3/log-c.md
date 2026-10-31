| Items reviewed | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 60 | 43 | 5 | 12 |

1. **HIGH — Dragon 64 reset values are wrong.** [dragon.js:419](/P:/retro-bench/.tmp/review-fix3/src/data/dragon.js:419) says **3.3 µF / 10 kΩ**. CD41505 sheet 2 specifies **C55 33 µF / R17 100 kΩ**.

2. **HIGH — Spectrum 128 probes the wrong chip for +12 V.** [sinclair.js:581](/P:/retro-bench/.tmp/review-fix3/src/data/sinclair.js:581) says **IC34 pin 14**. The manual specifies **IC33 pin 14**.

3. **HIGH — IBM replacement instruction drops a required diagnostic gate.** [ibm.js:1327](/P:/retro-bench/.tmp/review-fix3/src/data/ibm.js:1327) replaces the PSU for any bad rail. HMS requires Power Good to pass first; failed Power Good follows the drive-isolation branch.

4. **MEDIUM — Dragon regulator rating remains unproven.** SA2121 documents a **50 mA board-output limit**, not the claimed regulator-device rating. Reword or mark CHECK.

5. **MEDIUM — Late Spectrum correction is false and inconsistent with final data.** [verification log:122](/P:/retro-bench/.tmp/review-fix3/docs/verification/factcheck-full-fixes-c.md:122) instructs IC33 → IC34 for −12 V. The supported electrical location is **IC33 pin 1**; final step 4 correctly retains it.

Full coverage, source pages, and all four disputed-reading decisions: [log-c ledger](/P:/retro-bench/.tmp/review-fix3/.factcheck-tmp/r3/log-c-ledger.md).

Nothing committed. Only `.factcheck-tmp/` was written.