| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 191 | 127 | 62 | 2 |

1. **High — 65SC12 pin 8 incorrectly changed to ground.** It is **VDD, +5 V**. Master schematic 0143,000/C, sheet 1, explicitly confirms this. Revert before committing.

2. **High — all 57 scoped Electron ULA rows retain incorrect physical geometry.** The manual places pin 1 at the top left; the selected PLCC renderer places it at the top centre. Changing the summary leaves technicians probing wrong locations.

3. **Medium — four Dragon E/Q scope rows omit the clock-mode condition.** SAM p. 5-333 specifies crystal/16 in slow mode and crystal/8 in fast mode. The fixed expected rate needs that qualification.

4. **Medium — 8284 reset diagnosis remains unproven.** The chip source does not establish “Stays LOW with a bad PSU.” That requires a specific board circuit and failure condition.

5. **Medium — XT PLL claim removed despite cited support.** XT Technical Reference p. 3-3 explicitly assigns −5 V to the diskette PLL. Reconcile the documentation conflict before calling this deletion proven.

[Full per-item ledger](P:/.tmp/../retro-bench/.tmp/review-fix2/.factcheck-tmp/fixreview2/fb-4-ledger.md)

Only `.factcheck-tmp` was written. Nothing committed; no physical bench tests performed.