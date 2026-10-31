| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 191 | 178 | 1 | 12 |

1. **High — blocks commit:** [amstrad.js:352](/P:/retro-bench/.tmp/review-fix2/src/data/amstrad.js:352) changes PAL40030 pin 20 from VCC to GND. The [maker pinout](https://www.ti.com/lit/ds/symlink/pal16l8am.pdf#page=1) specifies **pin 20 = VCC; pin 10 = GND**. Restore the original value.
2. **Medium:** MSX1 step 2 adds a 4116 pin-1/−5 V instruction without a supporting 4116 citation.
3. **Medium:** CoCo1 step 5 retains “Lose −5 V and the RAM fails.” Neither cited document proves that consequence.
4. **Low:** Ten retained MSX RCA rows assert centre/shell wiring and gender that their cited pages do not establish.

[Full per-item ledger](/P:/retro-bench/.tmp/review-fix2/.factcheck-tmp/fixreview2/fb-3-ledger.md). Correct dispositions include honestly flagged verification limitations.

Curl failed locally; independent downloads used urllib. No data edits or commits.