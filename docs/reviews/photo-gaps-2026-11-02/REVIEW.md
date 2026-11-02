# Adversarial review: photo-gap changes

Reviewed `git diff HEAD` and both untracked resolution reports on November 2, 2026. No tracked files were edited. Findings are ranked within the requested WRONG / UNSOURCED / MINOR categories.

## Findings

1. **WRONG — PCjr gate-array memory-data direction.**  
   **Location:** src/data/ibm.js:662 (pins 33-40).  
   MD7-MD0 are labeled `bidir`, without `verify`. IBM's wiring shows the gate array receiving this bus: the 4164 DOUT pins drive it during RAM fetches, and ZM70's 74LS374 outputs drive it for character data. RAM writes use the separate XD/DIN path. Describing these as a bidirectional memory interface confuses the read and write paths. This direction conclusion is a circuit-tracing inference, rather than an explicit manufacturer pin-direction table.  
   **Evidence:** [IBM PCjr Technical Reference, System Board sheets 4-5, pp. B-6/B-7](https://bitsavers.org/pdf/ibm/pc/pc_jr/PCjr_Technical_Reference_Nov83.pdf#page=504); local renders [.tmp/review-evidence/pcjr-ga-memory-path.png](.tmp/review-evidence/pcjr-ga-memory-path.png) and [jr-high505.png](.tmp/review-evidence/jr-high505.png).  
   **Suggested fix:** Use `in` for MD0-MD7 for this board interface; if claiming additional internal output capability, supply a primary specification and mark that claim unverified until proven.

2. **WRONG — New location prose produces nonexistent fitted-chip designators.**  
   **Location:** src/data/ibm.js:1089, src/data/atari.js:1192; consumed by src/app.js:206 and :1434.  
   `desAll` parses every designator-shaped token in a location string. Running the actual helper against the new data yields PC 5150 ROM designators `U29,U30,U31,U32,U33,U28,A11,A12`, Atari BASIC ROM `U4,A11,A12`, and XT 23256 `U18,A14`. U28 is explicitly an empty socket; A11/A12/A14 are signal names. These become parts-list entries and search aliases. HAL's new location also contributes the manual identifier CC10; the 4118 location contributes jumper L1.  
   **Evidence:** Current location strings and the executed src/app.js `DES_RE/desAll` helper. The PC photo shows U28 empty; pin-net names are also visible in the cited IBM and Atari schematics.  
   **Suggested fix:** Keep the location field limited to fitted-device locations. Move pin-wiring explanations, empty-socket caveats, manual identifiers and jumper instructions into appropriate descriptive fields, or introduce explicit designator data.

3. **WRONG — The new XT 8 KB chip page selects 32 KB ROM images.**  
   **Location:** src/data/ibm.js:1095; src/data/roms.js:156, :159, :161; src/app.js:1293.  
   Adding `rom2764` with location U19 causes the existing `romsForChip` function to associate 5000027, 62X0854 and 68X4370 with the 8 KB device. All three records have `size: 32768`; the later two have no repeated-content qualification. A repairer following the new chip page is given images that do not fit its stated capacity. This is a data-association defect, not evidence that the photographed 6359116 is incorrectly identified.  
   **Evidence:** Executed the actual `romsForChip` and `desAll` functions against loaded data; output saved as [xt2764-matched-roms.json](.tmp/review-evidence/xt2764-matched-roms.json). The ROM records themselves give their exact source commits.  
   **Suggested fix:** Associate hashes with their actual chip/ROM configuration and scope variants appropriately. Handle oversized repeated dumps explicitly; do not attach every U19 image to a 2764 by designator alone.

4. **WRONG — Selecting a C64 revision still lists another revision's chip locations.**  
   **Location:** src/data/commodore.js:402, :908 and :5086.  
   The new default 4464 location combines U9/U10 on 250466 with U10/U11 on 250469, but there is no 250466 location override for this chip. The new 8701 location similarly combines U31 and U20 without overrides for 250425/250466. Consequently the parts list for 250466 reports U9/U10/U11 as RAM and U31/U20 as the clock, despite that board having only U9/U10 RAM and U31 clock. The photo boxes' fifth items hide this issue in their own tooltips; they do not fix the machine parts list.  
   **Evidence:** Actual `desAll` output for these default locations; C64/C64C Service Manual 314001-03, B-3 layout p. 36; crops [c64-250466-clk8701.png](.tmp/review-evidence/c64-250466-clk8701.png), [c64-250466-dram4464-U10.png](.tmp/review-evidence/c64-250466-dram4464-U10.png) and [U9](.tmp/review-evidence/c64-250466-dram4464-U9.png).  
   **Suggested fix:** Add `250466` overrides for `dram4464: 'U9, U10'` and `clk8701: 'U31'`, and a `250425` clock override. Keep the existing short-board overrides.

5. **UNSOURCED — IIe CF ROM is presented with a verified 27128 pinout.**  
   **Location:** src/data/apple.js:3208; src/data/photos.js:186.  
   The new association explicitly says the 342-0349 wiring has not been checked against a 27128. Nevertheless the chip has no verification flag for this association, its pins are unflagged, and the photo outline opens that pinout. A readable part marking and a ROM image's length establish neither VPP/PGM wiring nor EPROM compatibility. The resolution cites MAME for capacity and admits no schematic for this board was found.  
   **Evidence:** docs/verification/photo-gaps-other.md:318 and :417; [apple2e-820-0087-rom27128.png](.tmp/review-evidence/apple2e-820-0087-rom27128.png).  
   **Suggested fix:** Obtain a manufacturer/Sams drawing or data sheet that establishes the fitted part's pinout. Until then mark the association/pinout uncertain through a supported data structure or a separate verified-status-aware record. A prose caveat alone does not propagate the uncertainty flag.

6. **UNSOURCED — Newly associated keyboard ROMs inherit an unproven mask-ROM select table.**  
   **Location:** src/data/apple.js:3207 and :3212; inherited pins at :1592, :1594 and :1595.  
   The IIe/IIc keyboard ROMs are newly assigned `rom2316`, whose pins 18/20/21 are CS2/CS1/CS3 with mask-programmed polarity. The cited Apple schematics instead specify 2716 wiring, including pin 21 as VPP tied to +5 V. No primary source supplied here identifies the fitted 342-0132 mask's select polarities or proves that this generic 2316 table describes it. The record's warning that a 2716 needs an adapter is particularly misleading when reached from a socket drawn for a 2716. This finding does not assert that a suitably programmed 2316 mask could never work there.  
   **Evidence:** [Apple schematic 050-0051-D, sheet 2, UE12](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Computers/Apple%20II/Apple%20IIe/Schematics/Apple%20IIe%20-%20Schematics%20050-0051-D.pdf#page=3), [iie-2716-detail.png](.tmp/review-evidence/iie-2716-detail.png); Apple 050-0093-A sheet 3, UD16, [iic-2716-detail.png](.tmp/review-evidence/iic-2716-detail.png).  
   **Suggested fix:** Model the proven 2716-compatible board interface, or document and flag the actual mask-ROM variant and its select polarities. Do not silently inherit an unrelated machine's select-pin assumptions.

7. **MINOR — Photo verification flags contradict the documented contract.**  
   **Location:** src/data/photos.js:99, :112 and :350; docs/data-schema.md:451.  
   The schema requires a box placed from a layout without a legible photo designator to be in `verify`. The short-board rev A note says none of its designators is readable, yet only CIAs are flagged; rev B's new U1 explicitly has no printed designator but `verify` is empty. PCjr's designators are obtained from the component layout, yet all flags were cleared. Their source-backed identifications may be correct, but the solid outlines no longer mean what the schema and UI legend say.  
   **Evidence:** [c64-250469b-cia-U1-context.png](.tmp/review-evidence/c64-250469b-cia-U1-context.png), [c64-250469a-outlined.png](.tmp/review-evidence/c64-250469a-outlined.png), the corresponding photo notes, and src/app.js:1386.  
   **Suggested fix:** Follow the current contract, using `cia6526@U1` for rev B and appropriate flags elsewhere, or explicitly revise the schema and UI legend if primary-layout proof is intended to clear photo-position uncertainty.

8. **MINOR — Malformed multi-box data crashes validation.**  
   **Location:** scripts/validate-data.mjs:431.  
   An entry such as `[[0.1,0.1,0.1,0.1,'U1'], null]` first reaches the intended invalid-box check, then throws at `list.some(q => q.length !== 5)`. Validation terminates with a TypeError instead of reporting its accumulated FAIL diagnostics. Current production data does not trigger it.  
   **Evidence:** Reproduced without changing tracked files: `node .tmp/review-evidence/validator-malformed.mjs`. The temporary copy injects that value after data loading and otherwise uses the current validator.  
   **Suggested fix:** Check `Array.isArray(q)` before reading its length, or collect shape validity once and reuse it.

9. **MINOR — The PCjr's stock character ROM is 2 KB, not 4 KB.**  
   **Location:** src/data/apple.js:1997.  
   The role describes the PCjr character ROM as 4K x 8. IBM describes a 2 KB character generator. The board can accommodate a 2732-compatible replacement, but that does not make the stock 1503723 a 4 KB ROM.  
   **Evidence:** IBM PCjr Technical Reference, Video Subsystem p. 2-49, PDF p. 75; [pcjr-character-2k.png](.tmp/review-evidence/pcjr-character-2k.png).  
   **Suggested fix:** State the fitted capacity separately from the supported replacement pinout and describe W2/pin 21 in that context.

10. **MINOR — 8701 reset disagreement is not recorded as a conflict, and a better primary source resolves it.**  
    **Location:** src/data/commodore.js:924.  
    The description acknowledges inconsistent polarity notation in the C128 manual, but uses only `verify`, not the required `conflict` note. Commodore's actual chip specification provides a stronger answer: reset is active LOW, for testing, has a weak pull-up, and may be held HIGH or left open during normal operation.  
    **Evidence:** Commodore drawing 251527-01, sheet 1, [8701-spec-sheet1.png](.tmp/review-evidence/8701-spec-sheet1.png); [manufacturer scan](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/8701/8701-1.GIF).  
    **Suggested fix:** Cite that specification, represent /RESET and its polarity correctly, and retain the service-manual disagreement in `conflict`.

11. **MINOR — GI 2513 printed-page citation is off by one.**  
    **Location:** src/data/apple.js:1919 and :1921; docs/verification/photo-gaps-other.md:311.  
    The cited PDF page 44 actually prints 3-44, not 3-43. The pin assignments themselves match the sheet.  
    **Evidence:** [gi-exact2513.png](.tmp/review-evidence/gi-exact2513.png), rendered from the exact cited GI_ROMs.pdf.  
    **Suggested fix:** Correct the printed page to 3-44 in the record and audit.

## Verification and scope

- `node scripts/validate-data.mjs`: **0 FAIL, 223 WARN**. `git diff HEAD --check`: passed. Validation success does not verify electronics facts.
- Read the ten new/expanded pin tables named in the request against manufacturer manuals, drawings or data sheets. Aside from the findings above, no pin-number mismatch was established. In particular, the unusual PCjr D2/D1/D0 ordering, both bipolar PROM tables, Mostek /L on 4118 pin 19, the 2513 outputs/addresses, HAL output numbers and the 64-pin Commodore controller numbering match the drawings. Already flagged controller-variant pins remain uncertain.
- Fresh source downloads succeeded for the GI catalog, Mostek book, and Apple schematics. Several original Bitsavers/Zimmers/IBM mirror URLs returned 403/406 or fetch errors. For those, inspected the corresponding cached primary documents under the parent workspace's audit directories, copied/rasterized into [.tmp/review-evidence](.tmp/review-evidence). A blocked fetch was not treated as proof of an unsourced fact.
- Used Python with `-I` and Pillow to generate contextual crops and annotated images. Inspected C64 250469 A/B and 250466, C128, PCjr, IIe/IIc, 5155 and 5160, plus VIC-20, Plus/4, 1541, Apple II, Atari 800/800XL, ColecoVision, ZX81/TS1000, Dragon 32 and Model I. Sampled new boxes sit on the claimed packages. The 250466 clock/RAM labels, C128 U34/U19/U28, and IBM PROM positions were checked with enlarged crops. No additional definite visible non-jellybean coverage gap was established on these inspected photos; illegible or hidden devices were not guessed.
- Ran the actual boxList/rotBox helpers for single/multiple boxes and 90-degree rotation. No valid-data geometry defect was reproduced in those helpers or in per-box verification matching. No browser end-to-end run was performed.
- Opposing-model review: three `claude -p --model claude-opus-5-5 --effort medium` reviewers completed, with nonempty skeptic/architect/minimalist outputs in the evidence directory. Their shell/web actions were blocked, so their inspection was limited to readable files/cached source images; the lead performed the diff, source fetches and executable checks above. CodeRabbit's required host execution was unavailable under this session's permissions.

## Lead judgment

Accepted the reproducible location/parser, ROM-association and revision-location findings from the architecture review. Independently traced the PCjr memory bus and identified the unflagged ROM-pinout assumptions. Rejected suggestions to treat SN75188/75189 versus 1488/1489 naming as a substantive electrical defect, to treat the empty XT 8087 socket as a missing chip, or to reject the IIc's 24-to-28-pin socket offset. Those do not establish errors. The Commodore report's statement that UD1 verification also flags UB1 is stale: the actual per-box value correctly flags UD1 alone.

**Verdict: CHANGES REQUIRED — 4 WRONG, 2 UNSOURCED, 5 MINOR findings.**
