Found 12 defects. No files changed.

1. **High — Shared PLA replacement advice recommends the wrong programmed part.**  
   [commodore.js:1037](/P:/retro-bench/.tmp/review/src/data/commodore.js:1037), [app.js:859](/P:/retro-bench/.tmp/review/src/app.js:859).  
   Open `#/commodore/c16/chip/pla82s100` or the Plus/4 equivalent: replacements target the C64’s **906114-01**, although these machines use **251641-02**. The renderer has no machine filtering. Matching the package does not make their decoding interchangeable; the [PLA264 project](https://github.com/hackup/PLA264) specifically targets the TED machines. Split or scope replacement records.

2. **High — The print card removes essential grounding precautions.**  
   [app.js:1193](/P:/retro-bench/.tmp/review/src/app.js:1193), [app.js:1195](/P:/retro-bench/.tmp/review/src/app.js:1195), [oric.js:155](/P:/retro-bench/.tmp/review/src/data/oric.js:155).  
   Print the Oric card. It omits every `ifNot`, supply note and rail note—including the instruction never to join the adapter negative/jack sleeve to board ground. Those are different potentials because of the 7905 arrangement. Generated-card inspection confirmed **zero of seven `ifNot` texts survive**. Preserve precautions needed to perform the printed checks safely.

3. **Medium — A malformed import can persistently break notes listing and export.**  
   [app.js:1226](/P:/retro-bench/.tmp/review/src/app.js:1226), [app.js:1258](/P:/retro-bench/.tmp/review/src/app.js:1258), [app.js:1272](/P:/retro-bench/.tmp/review/src/app.js:1272).  
   Import this into empty storage:

   ```text
   === machine c64 ===
   normal
   === machine __proto__ ===
   bad
   ```

   Dictionary lookup accepts inherited `__proto__`; its target name becomes `undefined`. Sorting throws `Cannot read properties of undefined (reading 'localeCompare')`. Both notes are already saved, so subsequent listing/export repeats the failure. Use own-property lookups and validate imported identifiers.

4. **Medium — Failed writes report success and discard pending notes.**  
   [app.js:14](/P:/retro-bench/.tmp/review/src/app.js:14), [app.js:1238](/P:/retro-bench/.tmp/review/src/app.js:1238), [app.js:1282](/P:/retro-bench/.tmp/review/src/app.js:1282).  
   Make `localStorage.setItem` throw `QuotaExceededError`, then type or import a note. `LS.set` swallows the failure; the UI says “Saved on this device only” or counts the note as imported. `noteFlush` clears the pending text. My harness reproduced “1 new” with no stored note. Propagate write results and retain unsaved text.

5. **Medium — Separate installations share—and can delete—each other’s notes.**  
   [app.js:1211](/P:/retro-bench/.tmp/review/src/app.js:1211).  
   Host copies under `/a/` and `/b/` on one origin. Both use `rb-note:m:c64`; editing or deleting that note in either copy changes the other. Machine/chip prefixes prevent those two kinds colliding, but there is no installation namespace. Include the application base path in storage keys.

6. **Medium — Video-line rendering contradicts a machine’s stated voltage levels.**  
   [app.js:285](/P:/retro-bench/.tmp/review/src/app.js:285), [acorn.js:1365](/P:/retro-bench/.tmp/review/src/data/acorn.js:1365).  
   Open the Electron power page’s “PAL into the modulator” trace. Its data says sync **2.6 V**, black **2.9 V**, white **3.3 V**. The renderer hardcodes blanking at 30% of the swing, producing **2.81 V**, not 2.9 V. The standard composite ratio cannot be imposed on every internal signal. Model the intermediate level or label the drawing as unscaled.

7. **Medium — Unknown duty cycles become invented timing.**  
   [app.js:280](/P:/retro-bench/.tmp/review/src/app.js:280), [msx.js:534](/P:/retro-bench/.tmp/review/src/data/msx.js:534), [oric.js:199](/P:/retro-bench/.tmp/review/src/data/oric.js:199).  
   A missing square-wave duty renders as 50%; a missing pulse duty renders as 25% HIGH. The Oric note expressly says its asymmetric duty is unknown and “none is drawn,” yet the graphic draws equal halves. MSX2 `/INT`, described as LOW pulses from a HIGH line, renders HIGH for 5 ms and LOW for 15 ms per 20 ms period. Distinguish illustrative shape from sourced pulse width/polarity.

8. **Medium — Some scope levels are explicitly assumed rather than sourced.**  
   [acorn.js:1362](/P:/retro-bench/.tmp/review/src/data/acorn.js:1362), [msx.js:530](/P:/retro-bench/.tmp/review/src/data/msx.js:530).  
   Electron cassette output supplies `low: '0 V'`, although its note admits the source gives only peak-to-peak swing. MSX2 CPUCLK similarly assumes a zero baseline. These assumptions become numeric ground positions and trigger settings. Reproduce by opening either trace. Follow the schema’s omission rule or represent swing separately from DC offset.

9. **Medium — Feature validation accepts values that produce misleading or invalid output.**  
   [validate-data.mjs:120](/P:/retro-bench/.tmp/review/scripts/validate-data.mjs:120), [validate-data.mjs:125](/P:/retro-bench/.tmp/review/scripts/validate-data.mjs:125), [app.js:236](/P:/retro-bench/.tmp/review/src/app.js:236).  
   Each independent in-memory mutation returned **0 FAIL**, without additional warnings:

   - `duty: '250%'`: renderer silently substitutes its default.
   - `f: '1 MHz garbage'`: parser accepts the prefix.
   - Contradictory `f` and `period`: renderer silently prefers `period`.
   - `high: '9'.repeat(310) + ' V'`: parses as Infinity and produces NaN scale/coordinates.
   - A DC block with no level, or a clock table containing `0 Hz`.

   Require finite quantities, appropriate bounds and consistent frequency/period values. Separately, [app.js:261](/P:/retro-bench/.tmp/review/src/app.js:261) treats valid DC `high: '0 V'` as absent and reports “no levels in the source.”

10. **Medium — Sams caveats are missing from existing citations.**  
    [apple.js:524](/P:/retro-bench/.tmp/review/src/data/apple.js:524), [ti.js:355](/P:/retro-bench/.tmp/review/src/data/ti.js:355).  
    CA3146’s Sams Disk II parts-list citation and TMS9900’s Sams rail-reading citation omit `sams: true`. Open their datasheets sections: these citations do not trigger the required redraw caveat. The validator checks an existing flag’s type but never requires it for Sams citations. Other supply/connector citations repeat this omission.

11. **Low — New MSX `where` strings remain unlinked without warnings.**  
    [msx.js:496](/P:/retro-bench/.tmp/review/src/data/msx.js:496), [msx.js:507](/P:/retro-bench/.tmp/review/src/data/msx.js:507), [validate-data.mjs:175](/P:/retro-bench/.tmp/review/scripts/validate-data.mjs:175).  
    Open `#/msx/msx1/power`: `Cartridge pin 48`, `Cartridge pin 50` and `Cartridge pin 42` remain plain text. The connector’s exact name is **Cartridge slot**. Ordinary rails/test points without scopes never reach `checkWhere`, so validation misses them. MSX2 repeats the rail problem.

12. **Low — Scope settings violate the documented cycle range.**  
    [app.js:254](/P:/retro-bench/.tmp/review/src/app.js:254).  
    Ten stored blocks fall outside 2–4 cycles: CoCo1/2 E/Q and HERO E show about **1.79**; CoCo3 shows **4.45**; Dragon E/Q show **4.44**. Open those traces to reproduce. Some periods cannot satisfy both strict 1–2–5 settings and 2–4 cycles; resolve the schema contract rather than promising both universally.

I wrote and ran an inline Node audit loading every data module and exercising the actual scope functions: **166 blocks rendered without exceptions, NaN or Infinity in current data**. Every scope had a source and basis; every Sams capture had its flag. Unit checks covered MHz/kHz/Hz, µs/us/ns/ms, mV/V, percentages, negative levels, missing levels and all six shapes.

Earlier validator protections still rejected injected duplicate-chip definitions, reciprocal fitting mismatches and coincident connector pads. Baseline validation returned **0 FAIL, 122 WARN**.

I found no note-text HTML injection; rendering escapes it. Export filenames are safe, and Blob text export uses UTF-8. The video reference’s principal line periods, sync widths, subcarriers and level conventions agree with [ITU-R BT.470](https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.470-6-199811-S!!PDF-E.pdf); the three explicitly unsupported level/termination rows carry `verify: true`.

Print CSS resets dark colours and hides controls. Current large-machine pagination remains unverified: browser launch failed with access denied, and the browser host was unavailable.

**Verdict: do not ship.**
