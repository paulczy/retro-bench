Reviewed commit `d2ee928` against the code and loaded data. **10 findings FIXED; 2 PARTLY FIXED.** No files modified.

Node verification: **166 scope blocks rendered without exceptions, NaN or Infinity**. Validator baseline: **0 FAIL, 278 WARN**.

1. **FIXED — PLA replacement advice.** Both replacement names and notes explicitly restrict C64 parts versus PLA264 for C16/Plus/4. Rendering still shows both, but compatibility is unambiguous. [commodore.js:1037](/P:/retro-bench/.tmp/review/src/data/commodore.js:1037)

2. **PARTLY FIXED — Print safety omissions.** Generated Oric and Atmos cards now contain **7/7 `ifNot` texts and 7/7 supply notes**. However, supply text remains inside the `rails.length` condition: Spectrum +2/+3 have no captured rails, so their cards omit all three supply notes, including +2’s instruction to measure polarity before connecting. Across the data, **888/891 safety texts survive**. [app.js:1229](/P:/retro-bench/.tmp/review/src/app.js:1229), [sinclair.js:1035](/P:/retro-bench/.tmp/review/src/data/sinclair.js:1035)

3. **FIXED — Malformed notes import.** Own-property checks reject inherited identifiers. The original `c64`/`__proto__` reproduction returns `{added:1, unknown:1}`; listing and export work. Unknown previously stored identifiers receive string fallback names. [app.js:1241](/P:/retro-bench/.tmp/review/src/app.js:1241), [app.js:1268](/P:/retro-bench/.tmp/review/src/app.js:1268)

4. **FIXED — Failed note writes.** Storage writes return success/failure; flushing deletes pending text only after success. With `setItem` throwing, Node confirmed pending text survives and reappears in the textarea; import reports `failed:1, added:0`. [app.js:15](/P:/retro-bench/.tmp/review/src/app.js:15), [app.js:1282](/P:/retro-bench/.tmp/review/src/app.js:1282), [app.js:1329](/P:/retro-bench/.tmp/review/src/app.js:1329)

5. **FIXED — Installation isolation.** Keys include the encoded application directory. Independent `/a/index.html` and `/b/index.html` harnesses listed only their respective notes. Migration has a separate regression below. [app.js:1239](/P:/retro-bench/.tmp/review/src/app.js:1239)

6. **FIXED — Electron blanking level.** Data now supplies `black: '2.9 V'`; rendering derives its position from the supplied levels. Node reconstructed the porch voltage as exactly **2.9 V**. [acorn.js:1366](/P:/retro-bench/.tmp/review/src/data/acorn.js:1366), [app.js:284](/P:/retro-bench/.tmp/review/src/app.js:284)

7. **FIXED — Invented duty cycles.** Unknown duties draw trigger edges and dashed level guides. MSX2 `/INT` now uses falling polarity without inventing pulse width. A synthetic 10% LOW-duty case produced segments `[[0.1,0],[0.9,1]]`. [app.js:315](/P:/retro-bench/.tmp/review/src/app.js:315), [msx.js:534](/P:/retro-bench/.tmp/review/src/data/msx.js:534)

8. **PARTLY FIXED — Assumed voltage baselines.** The affected fields now use `pp`; Node confirmed AC coupling, no ground marker and no absolute trigger voltage. But visible notes still claim “drawn from 0 V,” “starts at 0 V,” and “assumes 0 V at the bottom,” contradicting the corrected drawings. [acorn.js:1364](/P:/retro-bench/.tmp/review/src/data/acorn.js:1364), [msx.js:531](/P:/retro-bench/.tmp/review/src/data/msx.js:531), [msx.js:535](/P:/retro-bench/.tmp/review/src/data/msx.js:535)

9. **FIXED — Original validation holes.** All six original mutations now fail: 250% duty, frequency trailing garbage, inconsistent frequency/period, overflowing voltage, missing DC level and zero clock frequency. DC `high: '0 V'` now produces valid settings. [validate-data.mjs:124](/P:/retro-bench/.tmp/review/scripts/validate-data.mjs:124), [validate-data.mjs:220](/P:/retro-bench/.tmp/review/scripts/validate-data.mjs:220), [app.js:271](/P:/retro-bench/.tmp/review/src/app.js:271)

10. **FIXED — Sams caveats.** Both named citations now have `sams:true`; related supply/connector citations were corrected too. Missing Sams flags now generate warnings. [apple.js:524](/P:/retro-bench/.tmp/review/src/data/apple.js:524), [ti.js:355](/P:/retro-bench/.tmp/review/src/data/ti.js:355), [validate-data.mjs:84](/P:/retro-bench/.tmp/review/scripts/validate-data.mjs:84)

11. **FIXED — MSX pin links.** All five originally affected references generated connector links in Node. Ordinary rail/test-point locations now reach validation. [msx.js:496](/P:/retro-bench/.tmp/review/src/data/msx.js:496), [validate-data.mjs:197](/P:/retro-bench/.tmp/review/scripts/validate-data.mjs:197)

12. **FIXED — Cycle-range contract.** Documentation now promises 1.5–5 cycles; the implementation selects accordingly. Current data spans **1.77725–3.925 cycles**. [data-schema.md:223](/P:/retro-bench/.tmp/review/docs/data-schema.md:223), [app.js:246](/P:/retro-bench/.tmp/review/src/app.js:246)

Two additional regressions reproduced:

- **Medium — Failed migration hides existing notes.** Seed `rb-note:m:c64`, then make writes throw. Migration retains the legacy key, but listing returns zero notes and export excludes its text because enumeration accepts only the new prefix. This silently removes access to existing notes when storage is full. [app.js:1254](/P:/retro-bench/.tmp/review/src/app.js:1254), [app.js:1260](/P:/retro-bench/.tmp/review/src/app.js:1260)
- **Medium — New sync aliases bypass validation.** `sync:'1 V', high:'0 V'` passes despite reversed levels; the ordering check examines only `low`. `sync:'0 V', pp:'1 V'` passes without warnings but renders no volts/div because `sync` prevents the `pp` branch. A valid sync-only baseline also produces a false missing-level **WARN**. [validate-data.mjs:133](/P:/retro-bench/.tmp/review/scripts/validate-data.mjs:133), [validate-data.mjs:140](/P:/retro-bench/.tmp/review/scripts/validate-data.mjs:140), [app.js:285](/P:/retro-bench/.tmp/review/src/app.js:285)

No false **FAIL** reproduced on committed data. Browser pagination was not checked.

**Verdict: ship after fixes — preserve access after failed migration; print supply warnings without requiring rails; correct stale baseline notes; reconcile sync/pp validation and rendering.**
