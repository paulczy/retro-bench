# First boot checklist: review verdict (2026-11-01)

**Shipped.** 338 checks and 57 boot entries on 57 machines.

## Round 1 (Codex GPT-6.1 Sol, medium effort)
- 4 of 4 planted errors were caught. The plants are listed in .tmp/factcheck/fb-plants.txt and were never in the real data.
- 8 real errors were found and fixed.
- 61 entries were unproven. Each one now has a citation that proves it, or has the unsupported clause removed, or carries `verify`.
- 7 British spellings were found.

## Round 2 (same model, fixes only)
- 2 of 2 new planted errors were caught: the IIe self-test time and the Model 4 FREE wording.
- 53 of 73 round-1 items are fixed. 13 are correctly marked `verify`.
- 5 entries were still missing `verify`: the C64, VIC-20 and C128 border tests, the MSX2 title retention, and the 130XE boot. The 130XE boot cites a Sams page, which is a secondary source. The lead added `verify` to all five.
- 9 authored "Disc" and "centring" spellings were outside the first-boot data. The lead changed them to "Disk" and "centering". Document titles keep "Disc".
- All 20 confirmed spot checks still match their sources.
- No Repair Toolbox sources were found.
