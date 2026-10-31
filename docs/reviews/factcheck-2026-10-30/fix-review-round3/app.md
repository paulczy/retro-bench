| Coverage | Items | Correct | Wrong | Unproven |
|---|---:|---:|---:|---:|
| Validator cases | 69 | 60 | 9 | 0 |
| Renderer contracts | 80 | 60 | 20 | 0 |
| ULA geometry variants | 4 | 4 | 0 | 0 |
| Existing flags and scope inheritance | 342 | 271 | 71 | 0 |
| Manual orientation claims | 2 | 1 | 0 | 1 |
| Screen, print layout and CSS | 16 | 0 | 0 | 16 |

Checks overlap. Full evidence and every individual decision: [app ledger](/P:/retro-bench/.tmp/review-fix3/.factcheck-tmp/r3/app-ledger.md).

1. **High — commit blocker:** `false &&` disables square-package validation. The requested in-memory DIP-40 with `pin1: 'corner'` passes.
2. **High:** Print cards omit test points, scopes and replacements entirely—including 12 flagged test points and 58 flagged replacement rows.
3. **High:** Search results discard conflict flags across all eight changed record projections.
4. **High:** Scope blocks inherit a parent’s `verify` flag but discard its conflict text.
5. **Medium:** Machine and print chip grids leave conflict-only chips unmarked.
6. **Medium:** Printed connectors lose conflict warnings; connector pins retain only a generic warning without the disagreement text.
7. **Medium:** Supply-note validation accepts malformed flag types and crashes on an object-valued notes container.

ULA numbering passes all 68 position checks. The cited manual supports top-left, anti-clockwise numbering; the exact starting edge remains unproven and already flagged.

Browser launch and fallback both failed, so screen appearance and actual print layout remain unproven. No application files changed; nothing committed.