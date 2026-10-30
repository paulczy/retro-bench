Reviewed **62ea152** against the earlier review and current data. **Six findings are fixed; three are partly fixed.** No files changed.

`node scripts/validate-data.mjs` exits **0: 0 FAIL, 105 WARN**.

| Previous finding | Result | Code/data evidence and reproduction |
|---|---|---|
| **1. C128 power footprint** | **PARTLY FIXED** | [commodore.js:2827](P:/retro-bench/.tmp/review/src/data/commodore.js:2827) correctly identifies the square socket and removes the incorrect DIN drawing. However, the requested replacement geometry is absent. The summary at **2830** still ends by questioning whether “the DIN” is 180° or 240°, contradicting its square-socket guidance. |
| **2. Spectrum expansion sides** | **FIXED** | [connectors.js:166](P:/retro-bench/.tmp/review/src/connectors.js:166) swaps the named rows; **173** generates the corresponding caption. Sinclair entries at **603, 642 and 687** set `rowA: 'bottom'`. Both views put A3 below B3 and correctly caption B1–B28 on top. Plug view reverses left/right without swapping board sides. |
| **3. Custom touch-target overlaps** | **FIXED** | [connectors.js:243](P:/retro-bench/.tmp/review/src/connectors.js:243) removes the old scale-eight ceiling; **252** bounds target radii. Every current custom layout passes the overlap check. The +3 expansion now has **50 px** adjacent centres and **44 px** targets. |
| **4. Malformed custom geometry accepted** | **FIXED** | [validate-data.mjs:89](P:/retro-bench/.tmp/review/scripts/validate-data.mjs:89) rejects missing layouts; **93–94** check coordinates and duplicate pad numbers. Repeating the original in-memory injections produces respectively **2 FAIL** for `x: 'bad'`, **1 FAIL** for duplicate numbering and **1 FAIL** for `(10000,-10000)`. A different remaining gap is described below. |
| **5. Shared AY machine-specific pins** | **PARTLY FIXED** | Joystick wiring and board straps have been removed from the affected pin descriptions. But [timex.js:150](P:/retro-bench/.tmp/review/src/data/timex.js:150) still prescribes **1.7–1.8 MHz**, naming Timex and Spectrum. This shared record also serves all three CPCs, whose own power data specifies **1 MHz** at [amstrad.js:475](P:/retro-bench/.tmp/review/src/data/amstrad.js:475) and **528**. A healthy CPC therefore contradicts its chip diagnostic. |
| **6. C64 +5 V fuse description** | **FIXED** | [commodore.js:2228](P:/retro-bench/.tmp/review/src/data/commodore.js:2228) explicitly places motherboard F1 in the 9 V AC branch and describes the separate switched +5 V path. |
| **7. Custom traces crossing contacts** | **FIXED** | [connectors.js:261](P:/retro-bench/.tmp/review/src/connectors.js:261) checks clear vertical/horizontal lanes. All current custom routes pass in both views. +3 U27 now leaves sideways and descends at **x=50.9**, avoiding L27’s **x=72.9** centre. |
| **8. Cross-installation cache deletion** | **PARTLY FIXED** | [sw.js:9](P:/retro-bench/.tmp/review/sw.js:9) separates `/a/` from `/b/`, but its lossy replacement maps **`/a-b/`, `/a/b/` and `/a_b/`** to the same namespace, `rb-_a_b_-`. Running the actual activation handler with mocked caches confirms that updating `/a/b/` deletes `/a-b/`’s old cache through **24–25**. Use an unambiguous scope encoding. **Medium severity remains.** |
| **9. Unsupported CBM sizes throwing** | **FIXED** | [connectors.js:288](P:/retro-bench/.tmp/review/src/connectors.js:288) restricts CBM bottom contacts to the supported 44. `edge-44x44-cbm` returns 88 pads; `edge-64x64-cbm` returns `null` without throwing. |

I ran an in-memory Node geometry script over every drawable connector in socket/plug views, with labels off/on: **1,568 renders and 21,076 routes**, with no unplaced pins. It parsed the emitted SVG hit areas and pad shapes and sampled trace paths, including arcs, at intervals no greater than 0.25 px.

**The universal collision claim is false**, although all current custom and multipin layouts passed:

- **Low — RCA/barrel exceptions:** [connectors.js:206](P:/retro-bench/.tmp/review/src/connectors.js:206), **209** and **310** produce concentric, overlapping hit circles and centre traces crossing the shell contact. For Apple II `ii-video`, the hit circles share `(80,74)` with radii **50 and 22**; pin 1’s route `M 80 88 L 80 170` crosses pin 2’s radius-36 annulus. There are **176 overlapping pairs and 176 crossings** across the tested variants, all RCA/barrel. Centre selection wins through drawing order, so these exceptions do not reproduce the original custom-target interception bug. Either change the drawing or qualify the claim.

Further findings:

- **Medium — New shared chips repeat the machine-specific diagnostic problem.**  
  [amstrad.js:345](P:/retro-bench/.tmp/review/src/data/amstrad.js:345) describes shared `rom23256` selection through the CPC Gate Array; **347** names R112 and expansion ROMDIS; **351** describes OS/BASIC halves. Commodore lists that same record for the 1571 and 1581 at [commodore.js:373](P:/retro-bench/.tmp/review/src/data/commodore.js:373) and **390**, so their ROM pages display CPC wiring.

  Other examples include shared ULN2003’s 1541-II R43/motor wiring at [commodore.js:1930](P:/retro-bench/.tmp/review/src/data/commodore.js:1930), shown on Disk II, and shared MC3470’s Disk II component values and TP5 calibration at [apple.js:390](P:/retro-bench/.tmp/review/src/data/apple.js:390), shown on DuoDisk. Acorn’s shared FDC record likewise carries Master-specific probing references at [acorn.js:626](P:/retro-bench/.tmp/review/src/data/acorn.js:626). Keep shared pin functions generic and attach board diagnostics to their machines.

- **Low — Connector polarity metadata violates the schema without validator warnings.**  
  I found **120 connector pins** across the requested brands/drives with leading `/` names but no `activeLow: true`. For example, Amstrad’s connector helper at [amstrad.js:31](P:/retro-bench/.tmp/review/src/data/amstrad.js:31) omits the automatic flag implemented by the chip helper immediately above it; `/MREQ` at **49** and `/STROBE` at **72** inherit that omission. The validator’s polarity warning currently covers chip pins only.

- **Low — Coincident custom pads still bypass validation and break the target guarantee.**  
  In memory, moving one C16 power pad onto the other while retaining distinct pin numbers returns **0 FAIL**. [connectors.js:252](P:/retro-bench/.tmp/review/src/connectors.js:252) calculates zero hit radii, but **311** replaces zero with the default radius through `q.hr || HIT`, creating two coincident 44 px targets. Reject coincident coordinates and preserve explicit zero values. Current checked-in custom layouts do not trigger this.

The PLCC numbering is correct: [app.js:388](P:/retro-bench/.tmp/review/src/app.js:388) passes placement checks for all six supported sizes. Both actual PLCC-68 chips render pin 1 at top centre, increasing counter-clockwise; bottom views reverse direction correctly.

Drive handling also passes: [app.js:541](P:/retro-bench/.tmp/review/src/app.js:541) reports **36 machines and 6 drives** fitted. Home and brand renders place all six drives under Drives. All **270 machine subpage renders** completed without exceptions or `undefined`/`NaN` output.

These checks exercised Node rendering and a mocked service-worker lifecycle; live browser interaction and physical-hardware verification were not performed.

**Verdict: ship after fixes — cache namespace collisions, contradictory C128 guidance, AY/shared-chip diagnostics, polarity metadata, coincident-pad validation, and the RCA/barrel collision guarantee.**
