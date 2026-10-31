| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 191 | 9 | 1 | 181 |

1. **HIGH — blocks commit:** `cpu6809e` pin 7 was changed incorrectly to GND. Motorola DS9846-R2, page 1, identifies pin 7 as **VCC (+5 V)** and pin 1 as VSS. Grounding pin 7 could short the supply. Restore the original assignment.

2. **MEDIUM:** Repair print cards discard verification flags. Executing the actual renderer produced identical HTML with all flags removed. Unproven instructions therefore print without their uncertainty markers.

3. **LOW:** The log incorrectly credits flag additions for all 174 scoped HERO pins. Every pin record already matches HEAD, including its flag. Their cited pages are access-restricted, so all 174 underlying claims remain unproven.

[Full per-item ledger and evidence](P:/retro-bench/.tmp/review-fix2/.factcheck-tmp/fixreview2/fb-2-ledger.md).

Only `.factcheck-tmp/` was written; nothing committed. No hardware was tested.