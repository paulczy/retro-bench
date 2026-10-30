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

### Coverage and error rates (both runs, every item decided)

The first run left 979 items unchecked because its prompt let reviewers stop early. A second run of five GPT-6.1 Sol
reviewers (same model and effort) checked all of them; its reports and ledgers are the `rest-*` files here.

| Slice | Checked | Confirmed | Wrong | Unverifiable | Wrong rate |
|---|---:|---:|---:|---:|---:|
| Chip power/ground pins | 313 / 313 | 313 | 0 | 0 | 0 % |
| Power-connector pins | 402 / 402 | 336 | 6 | 60 | 1.5 % |
| Supply blocks | 59 / 59 | 55 | 2 | 2 | 3.4 % |
| Connector orientation | 71 / 71 | 42 | 11 | 18 | 15 % |
| Shared-chip text | 36 / 36 | 21 | 13 | 2 | 36 % |
| Replacement claims (pin-compatible / adapter) | 123 / 123 | 65 | 7 | 51 | 5.7 % |
| Photo outlines (55 boxes, 10 photos) | 10 / 10 | 8 | 0 | 2 | 0 % |
| Random 10 % of other chip pins | 413 / 413 | 382 | 19 | 12 | 4.6 % |
| Random 10 % of other connector pins | 629 / 629 | 558 | 9 | 62 | 1.4 % |
| **All items** | **2,056** | **1,780** | **67** | **209** | **3.3 %** |

The chip-pin errors cluster in Commodore: 14 of 129 sampled Commodore pins were wrong (11 %), against 5 of 284 for every
other brand together (1.8 %). Most unverifiable items are acceptance ranges (for example 4.95–5.10 V) that the cited
source does not state, and 27 HERO 1 pins whose only source, a book on archive.org, is restricted (HTTP 401).

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


### Second-run findings

15. **[high]** Disk II `disk2-mech`: card-edge faces reversed. The lettered contacts belong above the numbered ones with
    the component side up.
    - Lens: Architect. Principle: foundational-thinking.
    - Recommendation: fix the record. This makes six mirrored card edges.
16. **[high]** The TI console ROM replacement (TMS2532) is wrong on two counts. Pin 18 is A11. Pin 21 needs +5 V while
    reading, but the TI socket grounds it.
    - Lens: Architect. Principle: boundary-discipline.
    - Recommendation: rewrite the row as an adapter that needs pin 21 lifted to +5 V.
17. **[high]** Model 4 `m4-printer` pin 17 names U94 as the latch; it is U66.
    - Lens: Minimalist. Principle: subtract-before-you-add.
    - Recommendation: fix the designator.
18. **[high]** CPC 6128 `pal40030` pin 16 /CAS1 drives IC119–IC126; the data names the other bank.
    - Lens: Minimalist. Principle: outcome-oriented-execution.
    - Recommendation: fix the chip range.
19. **[high]** CPC 664 printer pin 27 is GND, not NC.
    - Lens: Minimalist. Principle: outcome-oriented-execution.
    - Recommendation: fix the pin.
20. **[high]** `cpu6808` BA: "freed the bus" is misleading, because the address outputs stay driven.
    - Lens: Minimalist. Principle: outcome-oriented-execution.
    - Recommendation: reword from the Motorola datasheet, p. 7.
21. **[medium]** More shared-chip text tied to one machine: `vdg6847` (SAM wiring on the MC-10), `rtc146818` (a HERO Jr
    address on the BBC Master), `via6522` (PET beep), `crtc6845` (IBM clocks), `rom23128` (board links).
    - Lens: Architect. Principle: boundary-discipline.
    - Recommendation: neutral pass, as finding 9.
22. **[medium]** Chip behaviour errors:
    - `cpu6809e` BA/BS codes and /HALT timing.
    - `sam6883` E can run at 0.895 or 1.79 MHz.
    - The 82C55A bus-hold applies to port B high only.
    - The XT 640 KB conversion needs a 74LS158 at U84.
    - GIME-Z exists as a GIME replacement.
    - TI-99/4A I/O pin 41 is IAQHA.
    - The TI transformer tap is not a centre tap.
    - BBC Master 1 MHz bus pin 23 is shared with the Tube.
    - Atmos expansion /RESET is also an input.
    - `mmu344` Cxxx covers $C000–$CFFF.
    - `kbd3600` pins 2 and 5 depend on the mask option.
    - The Model B drawing number is 103,000/IC, not 105,000/C.
    - Lens: Architect and Minimalist. Principle: foundational-thinking.
    - Recommendation: fix each one from the page in the ledger.
23. **[medium]** More acceptance ranges and electrical qualifiers that the cited source does not state (Apple drives,
    Atari controllers, ADAM, HERO, IBM 5155, BBC, Oric), and 27 HERO 1 pins whose only source is restricted.
    - Lens: Minimalist. Principle: subtract-before-you-add.
    - Recommendation: as finding 11. Mark the HERO 1 pins `verify`.

### Second-run lead judgment

15–20. Accept. Each was checked against a primary source and sends a probe or a part to the wrong place.
21–22. Accept.
23. Accept. Ranges the source does not give are removed rather than relabelled: the nominal value stays, and a range
    stays only where some source states it, with that source cited. This replaces the "label typical" idea in the
    judgment on finding 11, which would still have shown numbers with nothing behind them.

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

Coverage is now complete: every item of the 2,056 has a decision. Remaining risk is concentrated where the error rate
was highest: Commodore chip pins (11 %) and card-edge orientation (15 %). Both should be re-checked in full after the
fixes, not only the sampled items.
