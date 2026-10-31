# Round 2 fact-check ledger — Skeptic

Reviewed current `src/data/*.js`, not the round 1 assertions. All page numbers below are one-based PDF pages; printed pages are identified separately. Links address the local source PDFs. Scanned pages were rendered and read as images; renders are in `review-out/src/`. No application source was edited.

Verdicts: OK = the relevant claim matches the cited page; WRONG = direct contradiction; OVERSTATED = source supports a narrower claim; UNPROVABLE = part of the requested entry cannot be established from the specified source. An UNPROVABLE explanation is not necessarily false. The general NMOS/CMOS caution is treated as a scope caveat, not as a claim that TI documents those other families.

Coverage: 15 round 1 table rows + 30 individual machine conditions + 4 glossary entries = **49 rows**. Repeated checks are intentionally retained. Totals: **41 OK / 3 WRONG / 0 OVERSTATED / 5 UNPROVABLE**. The three WRONG rows represent **two distinct data defects**; the five UNPROVABLE rows represent three glossary entries repeated across scope sections.

## Every row of “Review round 1”

| ID | Current data checked | Verdict | Source file#page and evidence |
|---|---|---|---|
| R01 | `commodore.js`, c64 condition 3: DC coupling / AC after DC reference / bottom-line reference | OK | [39ce2bc9ca86.pdf#page=24](src/39ce2bc9ca86.pdf#page=24), schematic notes: all three clauses match. “0” qualifies reference-voltage waveforms, not every waveform's bottom line. |
| R02 | `commodore.js`, c128 condition 4: same rewrite | OK | [c3ec4483b1fc.pdf#page=44](src/c3ec4483b1fc.pdf#page=44), printed p. 34: DC on zero-reference waveforms; AC after measuring DC reference when necessary; reference at bottom line. |
| R03 | `atari.js`, atari400 condition 4: same rewrite | OK | [7f69a100ccb7.pdf#page=34](src/7f69a100ccb7.pdf#page=34), printed p. 22: matching DC/AC sequence and bottom-line DC reference. |
| R04 | `ti.js`, ti994a condition 3: same rewrite | OK | [6781235ee268.pdf#page=13](src/6781235ee268.pdf#page=13), right-hand folder p. 11: all clauses match. The data's archive leaf n12 corresponds to PDF p. 13, not PDF p. 11. |
| R05 | `timex.js`, ts2068 condition 3: same rewrite | OK | [46f1ae375099.pdf#page=8](src/46f1ae375099.pdf#page=8), printed p. 7, schematic notes: matching sequence and reference. |
| R06 | `apple.js`, apple2 condition 4: same rewrite | OK | [067f23b15d73.pdf#page=19](src/067f23b15d73.pdf#page=19), folder p. 11: matching DC/AC sequence and bottom-line reference. |
| R07 | `ibm.js`, pc5150 / xt5160 / portable5155 condition 1: display, expansion unit, 301 | OK | [2d35cccbb27d.pdf#page=3](src/2d35cccbb27d.pdf#page=3), step 001 preserves primary display and attached expansion unit; 301 “may occur.” All three machines share this current string. |
| R08 | `ibm.js`, pc5150 condition 6: current delay is **500 ms** | WRONG | [11477e534b00.pdf#page=35](src/11477e534b00.pdf#page=35), printed p. 1-27: **100 ms**, after the output voltages reach their respective minimum sense levels. Current text contradicts both the source and the log's claimed correction. |
| R09 | `ibm.js`, pcjr condition 2: drive connector, then fan on next page | OK | [101fccdf4466.pdf#page=63](src/101fccdf4466.pdf#page=63) and [#page=64](src/101fccdf4466.pdf#page=64): separate drive and fan measurements, respectively. |
| R10 | `sinclair.js`, spectrum128 condition 1: basic checks for failure to initialise | OK | [6dde3ad812c4.pdf#page=32](src/6dde3ad812c4.pdf#page=32), printed p. 4.3, §2.3: expected screen is described, then basic checks apply if initialisation fails. |
| R11 | `apple.js`, apple2plus: removal of Red Book minimum-load condition/source | OK | Current entry contains only digital-meter and ×10-probe conditions, supported by [067f23b15d73.pdf#page=19](src/067f23b15d73.pdf#page=19) and [#page=35](src/067f23b15d73.pdf#page=35). [c97b0de8cd42.pdf#page=114](src/c97b0de8cd42.pdf#page=114), printed p. 111, gives the Apple II 9 W roughly 50/50 load; no claim of II Plus applicability remains. |
| R12 | `tandy.js`, model3 condition 6: resistive-load qualification only on ripple | OK | [e233389ec9f7.pdf#page=76](src/e233389ec9f7.pdf#page=76), printed p. 69, Table 2: asterisk is beneath RIPPLE. Current ripple values and qualification match. |
| R13 | `core.js`, ttl: removed floating/fighting inference; input thresholds | OK | [b67ff7d6068d.pdf#page=4](src/b67ff7d6068d.pdf#page=4), §6.3: VIL max 0.8 V for SN74LS00, VIH min 2 V; no defined LOW/HIGH band between. The floating/fighting claim is absent. |
| R14 | `core.js`, pulsing: labelled general explanation plus thresholds | UNPROVABLE | [b67ff7d6068d.pdf#page=4](src/b67ff7d6068d.pdf#page=4): thresholds match; page does not define repetitive switching, clocks, bus activity, or “pulsing.” Old probe/meter-average claims are absent, but the whole present entry is not verifiable from this page. |
| R15 | `core.js`, logic-low / logic-high: labelled probe-display explanations | UNPROVABLE | [b67ff7d6068d.pdf#page=4](src/b67ff7d6068d.pdf#page=4): supports 0.8 V max / 2 V min, but says nothing about a probe marking L/H. Labelling those sentences “General explanation” makes the distinction clear, but supplies no supporting evidence. |

## All measured conditions for the seven requested machines

Condition numbering is one-based after expanding shared arrays (`...map`, `...sams`).

| ID | Current condition | Verdict | Source file#page and digit-level comparison |
|---|---|---|---|
| M01 | `ibm.js` pc5150 #1: step 001 setup | OK | [2d35cccbb27d.pdf#page=3](src/2d35cccbb27d.pdf#page=3): off, keyboard/external devices disconnected except primary display and attached expansion unit, on; 301 may occur. |
| M02 | pc5150 #2: Power Good pins 1 and 5; 2.4–5.2 V DC, on | OK | [2d35cccbb27d.pdf#page=4](src/2d35cccbb27d.pdf#page=4), steps 003/005: system unit powered on; pin **1** to **5 (ground)**, **2.4–5.2 Vdc**. |
| M03 | pc5150 #3: rail lead assignments and powered supply | OK | [2d35cccbb27d.pdf#page=5](src/2d35cccbb27d.pdf#page=5), Figures 2/3: board +5 V, −lead **5**, +lead **10**, 4.8–5.2 V; drive +5 V, −lead **2**, +lead **4**, 4.8–5.2 V. |
| M04 | pc5150 #4: board resistance setup | OK | [2d35cccbb27d.pdf#page=10](src/2d35cccbb27d.pdf#page=10), step 036: off, supply disconnected from board, all option adapters removed; Figure 5 follows on [#page=11](src/2d35cccbb27d.pdf#page=11). |
| M05 | pc5150 #5: minimum loads +5 V 2.3 A; +12 V 0.4 A; negatives none | OK | [11477e534b00.pdf#page=33](src/11477e534b00.pdf#page=33), printed p. 1-25: minimum column **2.3, 0.0, 0.4, 0.0 A** for +5, −5, +12, −12 V. |
| M06 | pc5150 #6: off ≥5 seconds; 500 ms delay after minimum sense levels | WRONG | [11477e534b00.pdf#page=35](src/11477e534b00.pdf#page=35), printed p. 1-27: **5 seconds** is correct; delay is **100 ms**, not **500 ms**. Same defect as R08. |
| M07 | pc5150 #7: Sams ground/on/no keys/digital meter/no signal/×10 | OK | [d11aa6486cf8.pdf#page=45](src/d11aa6486cf8.pdf#page=45), printed p. 44: schematic notes support ground, on/no keys, digital meter/no signal; safety item **6** requires isolation **×10** probe. |
| M08 | `ibm.js` xt5160 #1: step 001 setup | OK | [2d35cccbb27d.pdf#page=3](src/2d35cccbb27d.pdf#page=3): display/expansion exceptions retained; 301 may occur. |
| M09 | xt5160 #2: Power Good pins 1/5, 2.4–5.2 V DC | OK | [2d35cccbb27d.pdf#page=4](src/2d35cccbb27d.pdf#page=4): pin **1**, ground **5**, **2.4–5.2 Vdc**, power on. |
| M10 | xt5160 #3: board and drive rail test leads | OK | [2d35cccbb27d.pdf#page=5](src/2d35cccbb27d.pdf#page=5): +5 V board −**5**/+**10**, drive −**2**/+**4**. |
| M11 | xt5160 #4: resistance setup | OK | [2d35cccbb27d.pdf#page=10](src/2d35cccbb27d.pdf#page=10): step 036 specifies off, supply disconnected, adapters removed; [#page=11](src/2d35cccbb27d.pdf#page=11) holds Figure 5. |
| M12 | xt5160 #5: minimum loads +5 V 2.3 A; +12 V 0.4 A; negatives none | OK | [c08f3d417885.pdf#page=69](src/c08f3d417885.pdf#page=69), printed p. 3-4: **2.3 / 0.0 / 0.4 / 0.0 A** for +5 / −5 / +12 / −12 V. |
| M13 | `ibm.js` portable5155 #1: step 001 setup | OK | [2d35cccbb27d.pdf#page=3](src/2d35cccbb27d.pdf#page=3): same shared text, including expansion unit and optional 301. |
| M14 | portable5155 #2: Power Good pins 1/5, 2.4–5.2 V DC | OK | [2d35cccbb27d.pdf#page=4](src/2d35cccbb27d.pdf#page=4): pin **1**, ground **5**, **2.4–5.2 Vdc**, on. |
| M15 | portable5155 #3: board and drive rail test leads | OK | [2d35cccbb27d.pdf#page=5](src/2d35cccbb27d.pdf#page=5): board −**5**/+**10**, drive −**2**/+**4** for +5 V. |
| M16 | portable5155 #4: resistance setup | OK | [2d35cccbb27d.pdf#page=10](src/2d35cccbb27d.pdf#page=10) and [#page=11](src/2d35cccbb27d.pdf#page=11): off, disconnect supply, remove adapters, then Figure 5. |
| M17 | portable5155 #5: minimum loads 2.3 A / 0.04 A / 0.5 A; negatives none | OK | [c08f3d417885.pdf#page=75](src/c08f3d417885.pdf#page=75), printed p. 3-8: +5 **2.3 A**; +12 **0.04 A**; +12 display **0.5 A**; −5/−12 **0.0 A**. |
| M18 | `ibm.js` pcjr #1: unloaded transformer, pins 1/3, 15.0–30.0 V AC | OK | [101fccdf4466.pdf#page=62](src/101fccdf4466.pdf#page=62), printed p. 3-020-8: switch off; unplug from **P**; cable plug pin **1** to **3**, **15.0–30.0 Vac**. |
| M19 | pcjr #2: disconnected drive/fan; transformer reconnected; on; separate connector checks | OK | [101fccdf4466.pdf#page=63](src/101fccdf4466.pdf#page=63): exact sequence; drive checks **1→2 = 11.4–12.6 Vdc**, **4→3 = 4.7–5.3 Vdc**. [#page=64](src/101fccdf4466.pdf#page=64): fan **2→1** and **2→3**, both **11.4–12.6 Vdc**. Those extra ranges are source cross-checks, not numbers asserted in the condition. |
| M20 | `sinclair.js` spectrum128 #1: switch-on screen and non-initialisation checks | OK | [6dde3ad812c4.pdf#page=32](src/6dde3ad812c4.pdf#page=32), §2.3: **© 1985 Sinclair Research Ltd**, lower left; subsequent basic checks for failure to initialise. |
| M21 | spectrum128 #2: external supply load/input extremes | OK | [6dde3ad812c4.pdf#page=32](src/6dde3ad812c4.pdf#page=32), §2.2: **215 V AC / 1.4 A**, trough **≥7.0 V**; **265 V AC / 600 mA**, peak **<13 V**. All digits and inequalities match. |
| M22 | spectrum128 #3: storage scope ×10, 0.02 µs/cm rise time | OK | [6dde3ad812c4.pdf#page=31](src/6dde3ad812c4.pdf#page=31), printed p. 4.2: **storage oscilloscope**, **×10**, **0.02 us/cm**. Odd rise-time unit is reproduced from the source, not silently corrected. |
| M23 | `apple.js` apple2plus #1: digital meter | OK | [067f23b15d73.pdf#page=19](src/067f23b15d73.pdf#page=19), folder p. 11: “Voltages measured with digital meter”; folder covers II/II Plus. |
| M24 | apple2plus #2: isolation ×10 scope probe | OK | [067f23b15d73.pdf#page=35](src/067f23b15d73.pdf#page=35), printed p. 27, safety item **6**: isolation **times 10** probe. |
| M25 | `tandy.js` model3 #1: voltages/waveforms from ground unless noted | OK | [28e021989f11.pdf#page=34](src/28e021989f11.pdf#page=34), printed p. 17: matching ground-reference clause. |
| M26 | model3 #2: on, no keys, unless noted | OK | [28e021989f11.pdf#page=34](src/28e021989f11.pdf#page=34): matches general note; its disk-drive/interface BASIC-loop exception remains covered by “unless noted.” |
| M27 | model3 #3: digital meter, no signal | OK | [28e021989f11.pdf#page=34](src/28e021989f11.pdf#page=34): “Voltages measured with digital meter, no signal.” |
| M28 | model3 #4: isolated variac setup; ≥500 VA; DVMs; +5 V at 50 mV/div; ×10/×100 | OK | [e233389ec9f7.pdf#page=74](src/e233389ec9f7.pdf#page=74), printed p. 67: **minimum 500 VA** isolation transformer; input and +5 V DVMs; scope **50 mV/div**; **X10 and X100** probes. |
| M29 | model3 #5: +5 V 0.75 A / 11.11 Ω; +12 V 0.3 A / 40 Ω; −12 unloaded; startup | WRONG | [e233389ec9f7.pdf#page=75](src/e233389ec9f7.pdf#page=75), printed p. 68, Table 1: +5 V minimum is **0.45 A**, not **0.75 A**; **11.11 Ω** is correct (5/11.11 ≈ 0.45). +12 **0.3 A / 40 Ω**, −12 **NONE / OPEN**, startup **40–60 VAC**, regulation at **95 VAC** all match. |
| M30 | model3 #6: five performance combinations; voltage limits and resistive-load ripple | OK | [e233389ec9f7.pdf#page=76](src/e233389ec9f7.pdf#page=76), printed p. 69: five rows (95/max-all; 128/max-all; 120/+5 max, others min; 128/min-all; 95/min-all). +5 limits **4.75–5.25 V**; ripple +5 **50 mV p-p**, ±12 **150 mV p-p**; resistive-load-only footnote is keyed to ripple. |

## Each requested glossary entry against TI page 4

| ID | Entry in `src/data/core.js` | Verdict | Source file#page and evidence |
|---|---|---|---|
| G01 | `ttl` | OK | [b67ff7d6068d.pdf#page=4](src/b67ff7d6068d.pdf#page=4), §6.3: SN74LS00 **VIL max 0.8 V**, **VIH min 2 V**. No LOW/HIGH input band is specified between them. Input thresholds, not output-voltage guarantees. Caveat appropriately directs other chips to their own sheets. |
| G02 | `logic-low` | UNPROVABLE | [b67ff7d6068d.pdf#page=4](src/b67ff7d6068d.pdf#page=4): **0.8 V max** is correct. “Steady” and the labelled general claim that a logic probe marks **L** are not established by this page; no probe model/specification is cited. |
| G03 | `logic-high` | UNPROVABLE | [b67ff7d6068d.pdf#page=4](src/b67ff7d6068d.pdf#page=4): **2 V min** is correct. “Steady” and the labelled general claim that a logic probe marks **H** are not established by this page; no probe model/specification is cited. |
| G04 | `pulsing` | UNPROVABLE | [b67ff7d6068d.pdf#page=4](src/b67ff7d6068d.pdf#page=4): LOW **≤0.8 V**, HIGH **≥2 V** match. Repeated switching and clock/bus examples are labelled general explanation but are absent from this page. This is a citation-coverage gap, not evidence that the definition is false. |

## Required corrections and evidence limits

1. `src/data/ibm.js:1714`: replace **500 ms** with **100 ms** in pc5150 measured condition 6. Keep the five-second off interval and minimum-sense-level timing reference.
2. `src/data/tandy.js:2586`: replace **0.75 A** with **0.45 A** in model3 measured condition 5. Keep **11.11 Ω**.
3. If every glossary sentence must be source-backed, add a suitable logic-probe reference for L/H indications and a digital-logic reference for pulsing. TI page 4 supports only the stated electrical thresholds, not these explanations. The explanations are already explicitly labelled general; do not describe them as disproved.

The review copy already had tracked source modifications when inspected. Git status alone therefore cannot establish what a reviewer changed; this review performed no writes under `src/`.
