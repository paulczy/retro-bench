| Hunk / rendered path | Verify-only | Conflict-only | Both | Verdict here |
|---|---|---|---|---|
| BASIC essentials, both halves | CHECK | CHECK + conflict text | CHECK + conflict text | CORRECT |
| Power → Probe hints | CHECK | Conflict text dropped | Conflict text dropped | WRONG |
| PAL caption: white/sync/burst/fp/hs/bp/bs, each tested | CHECK | CHECK + conflict text | CHECK + conflict text | CORRECT |

Harness: **262/264 passed**. Independently inspected injected HTML confirms both failures.

**Finding:** [src/app.js:1184](P:/retro-bench/.tmp/review-fix7/src/app.js:1184) renders `${vmark(p)}` but omits `${disagree(p)}`. Disputed probe hints retain CHECK but lose “Sources disagree:” and the dispute text. The patch includes that call; the actual file does not. The patch’s proposed Power hunk is CORRECT, but incomplete here.

HTML inspection only; browser layout was not checked. All writes stayed under `.factcheck-tmp/`.