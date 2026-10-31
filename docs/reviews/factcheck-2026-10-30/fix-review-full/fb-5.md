| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 189 | 155 | 6 | 28 |

**Commit remains blocked.** Full per-item evidence: [fb-5 ledger](/P:/retro-bench/.tmp/review-fix2/.factcheck-tmp/fixreview2/fb-5-ledger.md).

1. **High — MC6808 pin 8 incorrectly changed to ground.** Motorola DS9818-R3 p. 1 specifies **VCC**, with ground on pins 1 and 21. Restore the original supply designation.

2. **High — HERO Jr ADC data points to the wrong PIA pin.** ADC0831 pin 6 reaches **PB5, U215 pin 15**, not PB4. Heath TM printed p. 22 establishes the connection; PB4 supplies the ADC clock.

3. **High — Dragon 64 reset advice names Dragon 32 components.** CD41505 sheet 2 shows **C55 33 µF and R17 100 kΩ**, not C23 1 µF/R15. The verify flag leaves wrong component references intact.

4. **Medium — PCjr sequence skips diagnostic gates.** HMS PDF pp. 58–64 requires repeated POST tests and transformer/power-board checks before condemning the system board.

5. **Medium — Dragon replacement order contradicts its source.** Service Information PDF p. 2 orders **SAM → ROMs → CPU → RAM**; the Dragon 64 step puts CPU before ROMs.

6. **Medium — AMSGateArray repeats withdrawn warnings.** Both cited glitch/loop paragraphs are struck through in the author’s README.

7. **Medium — 28 claims remain unproven.** These include SC-01 wiring claims moved into the summary and unsupported fault conclusions. The ledger distinguishes honest flags from unresolved assertions.

8. **Low — Four logged removals never happened.** Replacement entries and `kind: 'modern'` remain for AMSGateArray, AT28C64B, SC-01 Emulator and W65C02S.

No source-data edits or commits made. Hardware operation was not tested.