| Coverage | Items | Correct | Wrong | Unproven |
|---|---:|---:|---:|---:|
| Search flags, index propagation, result rendering | 4 hunks | 4 | 0 | 0 |
| Scope marking and parent conflicts | 2 hunks | 2 | 0 | 0 |
| Chip grids | 1 hunk | 0 | 1 | 0 |
| Connector headings and pin tables | 2 hunks | 2 | 0 | 0 |
| Printed connectors | 1 hunk | 0 | 1 | 0 |
| Package and supply-note validation | 2 hunks | 2 | 0 | 0 |
| Requested chip pin-table behavior | 1 check | 0 | 1 | 0 |
| Browser-visible behavior | 1 check | 0 | 0 | 1 |
| **Total** | **14** | **10** | **3** | **1** |

1. **High — Printed conflicts falsely say “Sources agree.”**  
   [src/app.js:126](P:/retro-bench/.tmp/review-fix4/src/app.js:126) differs from `r4-app.patch`: the working helper prints **“Sources agree:”** for a nonempty conflict. Running `printCard()` reproduces this on Dragon 32’s monitor connector. I opened its four cited sources; the ZIP’s SA2121 drawing disagrees with the owner sheet and CD41519. [Rendered evidence](P:/retro-bench/.tmp/review-fix4/.factcheck-tmp/r4/print-monitor-only.html).

2. **High — Printed connector conflicts have no CHECK or unverified marker.**  
   [src/app.js:1407](P:/retro-bench/.tmp/review-fix4/src/app.js:1407) uses `pv()`, which checks only `verify`. The real Dragon monitor connector and disputed pins have conflict text but neither marker. Injecting a connector conflict with `verify: false` reproduces the omission.

3. **High — Chip grids drop disagreement wording and text.**  
   [src/app.js:552](P:/retro-bench/.tmp/review-fix4/src/app.js:552) adds CHECK but never renders **“Sources disagree”** or the conflict. The real Electron ULA and an injected pin conflict both reproduce this. The condition also ignores `pin.verify`: an otherwise unflagged chip containing an unproven pin gets no CHECK. [Grid evidence](P:/retro-bench/.tmp/review-fix4/.factcheck-tmp/r4/grid-real.html).

4. **High — Chip pin legends still omit conflicts entirely.**  
   [src/app.js:1007](P:/retro-bench/.tmp/review-fix4/src/app.js:1007) renders only `p.verify`; it ignores `p.conflict`. An injected conflict with `verify: false` produces neither CHECK, “Sources disagree,” nor conflict text. This remains a failure of the explicitly requested on-screen pin-table behavior. [Legend evidence](P:/retro-bench/.tmp/review-fix4/.factcheck-tmp/r4/chip-pin-legend-only.html).

5. **Medium — Printed pin wording fails the exact wording requirement.**  
   The print template emits lowercase **“sources disagree:”**, rather than the required **“Sources disagree”**.

All three malformed supply-note cases exited **1 without crashing**. Baseline validation exited **0**, with 221 warnings. [Reproduction script](P:/retro-bench/.tmp/review-fix4/.factcheck-tmp/r4/probe.cjs).

Browser proof remains unproven: agent-browser repeatedly failed with “CDP response channel closed.” Curl failed with `SEC_E_NO_CREDENTIALS`; I downloaded the cited documents through Python and inspected the PDF pages at 130 dpi. Only `.factcheck-tmp/` was written, the server PID was stopped, and nothing was committed. **Commit remains blocked.**