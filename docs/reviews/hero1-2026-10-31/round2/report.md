# HERO 1 skeptical review

Completed all 12 connectors: **150 physical positions**, including **132 populated pin records** and **18 explicitly unsourced P1302/P1304 positions**. All 15 “Review round 1” action rows were audited in the ledger appendix. No `src/` edits were made.

| Verdict | Populated records | All positions |
|---|---:|---:|
| OK | 103 | 103 |
| WRONG | 4 | 4 |
| UNPROVABLE | 25 | 43 |
| Total | 132 | 150 |

1. **High — P316-151 gives the wrong supply voltage.** Name, description and expectation say +12 V. Sheet 3 explicitly labels pin **151 “+6 VOLTS”**; 152 is NC, and 153/154 are +5 V. There is no pin-level verification flag or conflict. Treating this as a +12 V connection could misdirect repair work. Source: `ET-18 Schematics sheet 3 of 4 (io, main drive, power supply).pdf#1`.

2. **Medium — P311-82/83 are swapped.** Pin **82** goes through R311/Q303 to **LOW DRIVE DETECT**; **83** goes through R308/Q302 to **LOW LOGIC DETECT**. Both current names/descriptions reverse these functions without uncertainty flags. Same source, page 1.

3. **Medium — P404-33 identifies the wrong interrupt.** Data says TAPE IRQ/cassette interrupt. Sheet 3 P304-33 is **MOTION DETECT**, from Q304; sheet 2 P404-33 reaches U408’s motion latch. Neither pin verify nor conflict is present. Sources: schematic sheets 2 and 3, page 1 each.

4. **Low — “proven” overstates complete-field evidence on 20 records.** Sixteen P309/P315 descriptions retain book phase ordinals absent from drawings. P311-86/88 retain float/threshold expectations, and P501-3/4 retain edge/ready behavior, also absent from the drawings. Attribution or supporting TM prose does not meet the requested drawing-only criterion. Add pin verification flags or qualify the evidence policy. Connections themselves agree; these are evidence gaps, not demonstrated electrical errors.

Round-one corrections for sleep polarity, display-control types, arm-select A/B and latch-bit names match the drawings. Existing conflict notes fairly disclose the opposing readings; they do not resolve hardware ambiguity. Existing flags cover the other five populated UNPROVABLE records.

Evidence, complete field comparisons, source filenames/pages and every action audit: `ledger.md`. No hardware measurements or independent lending-book/Votrax validation were performed.
