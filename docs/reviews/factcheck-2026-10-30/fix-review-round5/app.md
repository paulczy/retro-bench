| Patch hunk (+start) | Renderer coverage | Working-source result |
|---|---|---|
| 118 | Shared screen/print flags | Conflict-only loses CHECK and `(unverified)` |
| 191 | Source links/lists; conflict helper | Source conflict text omitted |
| 367 | Scope; parent flags | Conflict-only loses CHECK |
| 552 | Chip grids, including uncaptured chips and pin flags | Conflict-only loses CHECK |
| 883 | Symptoms | Conflict-only loses CHECK |
| 900 | Board/schematic sources | Conflict-only loses CHECK; conflict text omitted |
| 981 | Pinouts list; chip/pin flags | Conflict-only loses CHECK |
| 997 | Chip header | Conflict-only loses CHECK |
| 1014 | Pin legend | Conflict-only loses CHECK |
| 1033 | Replacements | Conflict-only loses CHECK |
| 1054 | Pin detail | Conflict-only loses CHECK |
| 1072 | Keys; BASIC essentials | Conflict-only loses CHECK; conflict text omitted |
| 1107 | Connector pin detail, including absent description | Conflict-only loses CHECK |
| 1135 | Connector pin legends, drawn/bare | Conflict-only loses CHECK |
| 1150 | Connector headers | Conflict-only loses CHECK |
| 1169 | Supply connector | Conflict-only loses CHECK |
| 1200 | firstTen | Conflict-only loses CHECK |
| 1218 | Clocks, frequency/PAL/NTSC; search rows | Conflict-only loses CHECK |
| 1236 | Resources | Conflict-only loses CHECK; conflict text omitted |
| 1335 | Video signal rows | Conflict-only loses CHECK |
| 1404 | Print-card chips, connectors and pins | Conflict-only loses `(unverified)` |
| Additional shared paths | Rails/test points on machine and power pages; internal/external supplies; supply notes; pin expectations/scopes | Conflict-only loses CHECK |
| Search integration | Chips, pins, keys, BASIC, connectors/pins, clocks, replacements | Conflict-only loses CHECK |
| Remaining print-card paths | Rails, supply, notes, firstTen, clocks; supply without rails | Conflict-only loses `(unverified)` |
| Video sources | Citation links and source list | Verification/conflict flags discarded |
| Ordinary page printing | All tested non-card output | No `(unverified)` annotations |

1. **High — the working source disables conflict-only marking globally.**  
   [src/app.js:124](/P:/retro-bench/.tmp/review-fix5/src/app.js:124) defines `flagged()` as `!!(x && x.verify)`. Consequently, every conflict-only path listed above loses its required mark, including print-card annotations.

   This differs from the supplied patch, whose predicate includes `x.conflict`. I reconstructed its target and confirmed this is the **only difference**: [comparison](/P:/retro-bench/.tmp/review-fix5/.factcheck-tmp/patch-vs-working.diff).

   This affects production records. Spectrum ULA pin 13 renders its dispute without CHECK. I downloaded and inspected the cited manual and original scan at **160 dpi**; both specify +3 V at that pin. See the [scan](/P:/retro-bench/.tmp/review-fix5/.factcheck-tmp/spectrum-scan-39.png) and [actual rendered detail](/P:/retro-bench/.tmp/review-fix5/.factcheck-tmp/production-spectrum-pin13.html).

2. **High — several renderers never display the conflict explanation.**  
   Independent of finding 1, conflict-only **and both-flag** records omit `Sources disagree: <text>` in:

   - `srcLink()` and every `sourceList()` caller: datasheets, connector/power/quick-reference sources, and nested replacement/clock/firstTen/scope sources.
   - `boardsBlock()` schematic entries.
   - Keys and BASIC essentials.
   - Resource rows.

   Relevant locations: [source links](/P:/retro-bench/.tmp/review-fix5/src/app.js:194), [keys/BASIC](/P:/retro-bench/.tmp/review-fix5/src/app.js:1075), [resources](/P:/retro-bench/.tmp/review-fix5/src/app.js:1239). Correcting `flagged()` alone leaves these failures intact.

3. **High — ordinary page printing does not identify unverified records.**  
   [CHECK markup](/P:/retro-bench/.tmp/review-fix5/src/app.js:119) contains no `(unverified)` text, and the print stylesheet supplies no replacement. Only `printCard()` adds that annotation.

   Therefore printed chip headers, legends/details, pinouts lists, connectors/pins, power tables, scopes, clocks, firstTen, replacements, supply notes, sources, keys, BASIC, resources, video rows, and search results lack the required annotation—even with `verify: true`. The [ordinary-print audit](/P:/retro-bench/.tmp/review-fix5/.factcheck-tmp/ordinary-print-audit.json) found **0 of 156 rendered cases** containing it after excluding embedded print cards.

4. **Medium — video-source rendering strips verification metadata entirely.**  
   [src/app.js:1388](/P:/retro-bench/.tmp/review-fix5/src/app.js:1388) rebuilds source objects using only `label`, `url`, and `note`. Verify-only, conflict-only, and both-flag sources therefore lose their warnings. Inline `vCite()` links also omit source flags and conflict explanations.

**Blocks commit.** All 21 hunks were inspected. The [Node harness](/P:/retro-bench/.tmp/review-fix5/.factcheck-tmp/review.mjs) exercised real render functions using the validator’s data-loading method: **186 cases, 70 failures, zero harness errors**. The reconstructed patch target still fails **15 cases** independently of the working-source mismatch.

Browser visual/print verification remains unavailable: agent-browser failed twice with `CDP response channel closed`. HTTP serving succeeded; only server PID **16156** was stopped. Review artifacts are confined to `.factcheck-tmp`; factual edits in `r5-data.patch` were outside this review’s scope.