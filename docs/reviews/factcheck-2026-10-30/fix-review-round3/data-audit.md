| Coverage | Items | Correct | Wrong | Unproven |
|---|---:|---:|---:|---:|
| Exact patch | 68 | 54 | 0 | 14 |
| Current working records | 68 | 52 | 2 | 14 |

All 68 hunks mapped; nine test-plant reversions excluded. Found two unlogged subchanges and two current-file edits absent from the patch.

1. **HIGH — Dragon 64 reset values are wrong.** [dragon.js:419](/P:/retro-bench/.tmp/review-fix3/src/data/dragon.js:419) has **3.3 µF / 10 kΩ**. CD41505 sheet 2 shows **C55 33 µF / R17 100 kΩ**. The patch contains the correct values; the current file does not.

2. **HIGH — Spectrum 128 names the wrong +12 V probe.** [sinclair.js:581](/P:/retro-bench/.tmp/review-fix3/src/data/sinclair.js:581) says **IC34 pin 14**. Service Manual PDF page 33 specifies **IC33 pin 14**. This erroneous edit is absent from the patch.

3. **HIGH — IBM replacement advice drops a required condition.** The PC/XT steps say any out-of-range rail means replace the PSU, without CHECK. HMS PDF pages 5–6 require Power Good to pass first; failure instead enters drive isolation. The shortened instruction is unproven.

4. **MEDIUM — Review artifacts disagree with the candidate.** Besides the two stale patch lines above, H006 changes `pin1` despite the log saying untouched. H001 changes inherited Model B/Electron pin text beyond its logged Master scope.

5. **LOW — Two logged source pages are inaccurate.** The Master parasite-select description is on page **27**, not 55; HERO pitch adjustment is printed page **50**.

Full decisions and evidence: [data-audit ledger](/P:/retro-bench/.tmp/review-fix3/.factcheck-tmp/r3/data-audit-ledger.md).

Nothing committed. Only `.factcheck-tmp/` was written. Browser behavior and physical hardware were not tested.