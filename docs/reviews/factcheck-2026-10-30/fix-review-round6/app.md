| Paths / patch hunks | Pass | Fail |
|---|---|---|
| Sources, source lists, datasheets; nested sources (§191) | All three flag combinations | — |
| Board grids, captured/uncaptured chips, pin flags (§556) | All combinations | — |
| Schematic entries (§900) | All combinations | — |
| Keys (§1072) | All combinations | — |
| BASIC essentials, both columns (§1072) | CHECK marking | Conflict explanations missing |
| Resource rows (§1236) | All combinations | — |
| Video citations `vCite` (§1330) | All combinations | — |
| Video source list (§1385) | All combinations | — |
| Conflict-span styling (CSS §385) | Present | — |
| Print rules (CSS §686), source and built CSS | All emitted CHECK element types covered | — |
| Symptoms; chip headers, legends/details; replacements | All combinations | — |
| Connector headers, drawn/bare legends, details without descriptions | All combinations | — |
| Rails/test points on machine and power pages | All combinations | — |
| Supplies, notes, supply connectors | All combinations | — |
| firstTen, clocks, pin expectations/scopes | All combinations | — |
| Search: chips, pins, keys, BASIC, connectors/pins, clocks, replacements | All combinations | — |
| Print-card paths, including supply without rails | All combinations | — |
| Additional: Power “Probe hints” | — | All combinations |
| Additional: PAL diagram | — | All combinations |

All **9 patch hunks** inspected and every round-5 failure path retested. Real Node renderer execution: **264 cases, 256 passed, 8 failed, zero harness errors**. [Harness](/P:/retro-bench/.tmp/review-fix6/.factcheck-tmp/review.mjs), [results](/P:/retro-bench/.tmp/review-fix6/.factcheck-tmp/working/results.json).

1. **High — BASIC conflict fix is missing from the working source.**  
   [app.js:1078](/P:/retro-bench/.tmp/review-fix6/src/app.js:1078) emits `${vmark(e)}` without `${disagree(e)}`. Conflict-only and both-flag essentials show CHECK but omit `Sources disagree: <text>` in both columns. [Rendered evidence](/P:/retro-bench/.tmp/review-fix6/.factcheck-tmp/working/020.html).

   Reconstructing `r6-app.patch` against `base5/` proves this is the **only difference** between its JavaScript target and the working file. The reconstructed target fixes these two failures.

2. **High — Power’s probe hints discard pin warnings, including a production voltage dispute.**  
   [app.js:1184](/P:/retro-bench/.tmp/review-fix6/src/app.js:1184) renders pin names and probe text without verification marks or conflict explanations. All three injected combinations fail.

   Existing Spectrum data demonstrates the consequence: ULA pin 13 displays **“+4.75 to +5.25 V”** without CHECK or its stored dispute explaining that the manual specifies **+3 V**. [Production rendering](/P:/retro-bench/.tmp/review-fix6/.factcheck-tmp/working/production-probes-spectrum.html). This gap also exists in the reconstructed patch target.

3. **Medium — The PAL diagram drops flags from its numeric inputs.**  
   [app.js:1343](/P:/retro-bench/.tmp/review-fix6/src/app.js:1343) reads signal values without propagating their flags into the figure or caption. Injecting an unverified/conflicting peak-white value changes the displayed diagram value but produces neither CHECK nor the conflict explanation beside it. [Rendered figure](/P:/retro-bench/.tmp/review-fix6/.factcheck-tmp/working/152.html). The table below has warnings; the diagram repeats the value without them. This also predates this patch.

**Blocks commit.** The print rules themselves cover all 228 emitted warning stamps examined across `.chk`, board flags, and photo flags in both CSS files. [Print audit](/P:/retro-bench/.tmp/review-fix6/.factcheck-tmp/print-audit.json). Browser/PDF rendering was not checked.