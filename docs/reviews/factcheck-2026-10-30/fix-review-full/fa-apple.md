| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 61 | 56 | 1 | 4 |

1. **High — blocks commit:** `cpu6502` pin 8 was incorrectly changed to GND. The maker’s pinout, p. 10, identifies it as **VCC (+5 V)**; grounds are pins 1 and 21. Grounding pin 8 shorts the supply. Restore the original value.

2. **Medium:** IIc MMU21 and IOU9 now claim three-state outputs using IIe circuit evidence. The cited IIc tables establish flag reporting but do not prove that electrical implementation. **Two items unproven.**

3. **Medium:** The revised IIe chirping-supply instructions add diagnostic steps beyond TRM p. 160. **Unproven.**

4. **Medium:** Separate slot and DuoDisk connector tables do not prove the retained controller-card rail routing. **Unproven.**

5. **Low:** The removed II/II+ voltage tolerance ranges are documented in the already-cited Red Book, p. 111. Restore the ranges with that citation.

[Full per-item ledger and evidence references](P:/retro-bench/.tmp/review-fix2/.factcheck-tmp/fixreview2/fa-apple-ledger.md).

Only `.factcheck-tmp` was written. No hardware measurements or substitution tests were performed.