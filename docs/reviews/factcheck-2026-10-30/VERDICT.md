# Fact-check verdict, 30 October 2026

Reviewers: three GPT-6.1 Sol reviewers via `codex exec` at xhigh effort (model-selection: adversarial review of a whole
project's state), lenses Skeptic, Architect and Minimalist, each with web access and a generated item list. Data
reviewed: commit 87c9b5a (the live site). Per-item ledgers with the source page for every decision are in this folder.

## Intent

Every pin, connector, supply and replacement claim in Retro Bench matches the document it cites, so a technician can
probe and power a 40-year-old board without damaging it.

## Verdict: REJECT

The highest-stakes slice is clean (all 313 chip power and ground pins confirmed), but card-edge connector drawings are
mirrored on five machines, one pin-compatible claim is false, and Plus/4 video pin 8 is wrong; two reviewers found
the Plus/4 pin independently.

### Coverage and error rates

| Slice | Checked | Confirmed | Wrong | Unverifiable | Wrong rate |
|---|---:|---:|---:|---:|---:|
| Chip power/ground pins | 313 / 313 | 313 | 0 | 0 | 0 % |
| Power-connector pins | 402 / 402 | 336 | 6 | 60 | 1.5 % |
| Supply blocks | 59 / 59 | 55 | 2 | 2 | 3.4 % |
| Connector orientation | 67 / 71 | 41 | 10 | 16 | 15 % |
| Shared-chip text | 11 / 36 | 4 | 6 | 1 | 55 % |
| Replacement claims (pin-compatible / adapter) | 11 / 123 | 4 | 3 | 4 | 27 % |
| Photo outlines (55 boxes, 10 photos) | 10 / 10 | 8 | 0 | 2 | 0 % |
| Random 10 % of other chip pins | 129 / 413 | 112 | 14 | 3 | 11 % |
| Random 10 % of other connector pins | 75 / 629 | 63 | 1 | 11 | 1.3 % |

The Skeptic finished its whole list. The Architect checked 99 of 240 items and the Minimalist 204 of 1,042 (all
Commodore); the rest were not reached, and no verdict was inferred for them.

## Findings

1. **[high]** Card-edge connectors drawn mirrored or with rows swapped: C64 `c64-exp` (pin 1 must be at the right in
   the external view), C16 and Plus/4 `c16-exp`, Atari 400/800 `atari-cart` (letters above numbers), Atari 130XE
   `atari-eci`, TS2068 `ts2068-dock`. VIC-20 `vic20-cart` is correct, so the fault is per-record data (`pin1`, `rowA`),
   not the drawing code.
   - Lens: Architect. Principle: foundational-thinking.
   - Recommendation: fix the five records from the cited external-view drawings; then re-check every other card edge
     against its manual's view, because 10 of 67 orientations were wrong.
2. **[high]** Plus/4 `c16-video` pin 8 is NC on the Plus/4, but the shared C16 table labels it +5 V.
   - Lens: Architect and Minimalist. Principle: boundary-discipline.
   - Recommendation: give the Plus/4 its own video connector entry.
3. **[high]** V9938 to V9958 is classed `pin-compatible`, but pin 21 becomes a +5 V input and pins 4, 26 and 27 change.
   TMS9918A to 9928A/9929A has the same misclassification.
   - Lens: Architect. Principle: boundary-discipline.
   - Recommendation: reclassify both as `adapter`. Then re-check all 123 pin-compatible and adapter claims, since 3 of
     the 11 checked were wrong.
4. **[high]** The ColecoVision U2 uses the shared `rom2764` pin text. The stock 9464C mask ROM has 2 = NC, 20 = A11 and
   23 = A12, so the 2764 map only applies after the WJ4/WJ5 conversion.
   - Lens: Architect. Principle: boundary-discipline.
   - Recommendation: give the ColecoVision its own mask-ROM record.
5. **[high]** The PET supply puts the raw +16 V and −9 V feeds on J8. Sheet 9 shows them on J10, with J8 pins 8 and 9
   carrying AC.
   - Lens: Skeptic. Principle: fix-root-causes.
   - Recommendation: correct the supply block from 320349 sheet 9.
6. **[high]** Shared `rom2316` carries Apple select wiring onto TRS-80 ROMs.
   - Lens: Architect. Principle: boundary-discipline.
   - Recommendation: make the pin text generic and move board wiring into each machine.
7. **[high]** The PCjr's 17 + 17 V AC centre-tap claim and the TI-99/4A's winding-to-pin mapping are not established by
   any source.
   - Lens: Skeptic. Principle: prove-it-works.
   - Recommendation: mark both `verify`. Use IBM's own check (15–30 V AC across pins 1–3, transformer disconnected) as
     the PCjr expectation.
8. **[medium]** 14 chip-pin errors in the Commodore sample: VIC-II, VIC-IIe and 6560 address and data pin directions,
   CIA1 keyboard port roles reversed in the text, TED R/W direction, TED fast clock (1.788 MHz, not 1.76 MHz), VDC DA5
   and the 8721 CLRBNK name.
   - Lens: Minimalist. Principle: outcome-oriented-execution.
   - Recommendation: fix each one. An 11 % error rate on direction and description in one brand's sample means the
     other brands need the same check.
9. **[medium]** More shared-chip text leaks one machine's wiring: `rom23256` (CPC wiring on the 1581), `ppi8255` (IBM
   ports on the CPC and MSX), `mux14529` (Dragon parts on the CoCo).
   - Lens: Architect. Principle: boundary-discipline.
   - Recommendation: one pass over every chip shared across brands, applying the rule the earlier reviews set.
10. **[medium]** HERO 1 charger readings give fixed values that depend on the battery state. 13.9 V is the float
    level; the charger reads about 14 V on discharged batteries and rises toward 27 V.
    - Lens: Skeptic. Principle: fix-root-causes.
    - Recommendation: rewrite the readings with the load state.
11. **[medium]** 49 power-connector `expect` values add tolerance ranges the cited source does not give. Examples: C64
    and C128 4.95–5.10 V, and the IBM Power Good 500 ms upper limit.
    - Lens: Skeptic. Principle: prove-it-works.
    - Recommendation: keep ranges that some source gives and cite it; otherwise state the nominal value only.
12. **[medium]** Apple II `ii-slot` pins 19 and 35 are slot 7 only.
    - Lens: Architect. Principle: boundary-discipline.
    - Recommendation: say so in the pin text.
13. **[medium]** The 1581 WD1770/1772 swap needs jumper J1 changed.
    - Lens: Architect. Principle: redesign-from-first-principles.
    - Recommendation: add this to the replacement note.
14. **[low]** Smaller items:
    - MSX cartridge pin-5 note belongs on pin 3.
    - TS2068 "unloaded" condition is unsourced.
    - Spectrum 128 and CPC 464 barrel polarity rest on extrapolation.
    - `fdc1770` INTRQ wording.
    - Several page anchors are off by one.
    - Four links are blocked: Carlsen pages return HTTP 406, the F18A page has a certificate failure, Wayback Oric
      links fail, and one C16 PDF is damaged.
    - Lens: all. Principle: prove-it-works.
    - Recommendation: fix in the same pass.

## What went well

- Every chip power and ground pin, 313 of 313, matched its datasheet. This is the slice a technician probes first.
- Power-connector pins were 98.5 % right where a source settles them. No reversed polarity was proved anywhere.
- All 55 chip boxes on the 10 sampled board photos sat on the right chips.

## Lead judgment

1. Accept. A mirrored card edge sends a probe to the wrong contact, and the error repeats per record.
2. Accept. Two reviewers found it independently.
3. Accept both. The validator should also refuse `pin-compatible` when the two parts' pin tables differ; that is
   possible once both parts have records.
4. Accept.
5. Accept. It is a single-source fix from the cited sheet.
6. Accept.
7. Accept, as medium rather than high. Nothing proves the values wrong, so the honest fix is `verify` plus IBM's own
   measurement.
8. Accept. The direction errors are real but low-risk for a technician. The error rate is what matters: it justifies
   checking the other brands' pin tables.
9. Accept.
10. Accept.
11. Accept in part. Typical-value ranges help a technician, so keep them where any source gives them and label the rest
    "typical, not from the source" rather than deleting them.
12. Accept.
13. Accept.
14. Accept. Blocked links stay, since they are access-blocked, not dead, but each gets a working mirror where one
    exists.

Coverage gap: 141 Architect items and 838 Minimalist items were not reached. Given an 11 % chip-pin error rate in the
Commodore sample and 15 % on connector orientation, the unreached items should be checked before the data is called
verified. That means a second run limited to the unchecked items, after the fixes above.
