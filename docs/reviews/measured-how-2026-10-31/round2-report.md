# Round 2 — Skeptic fact-check

Checked all 15 round 1 table rows, all 30 measured conditions for the seven requested machines, and all four glossary entries. Scanned source pages were rendered and read as images. `src/` was not edited.

**49 ledger rows: 41 OK, 3 WRONG, 0 OVERSTATED, 5 UNPROVABLE.** Counts include intentional overlap between the requested scopes. There are **two distinct numerical defects**:

- `src/data/ibm.js:1714`, pc5150 condition 6: **500 ms should be 100 ms**, measured after outputs reach their minimum sense levels. The five-second off interval is correct. Source: [11477e534b00.pdf#page=35](src/11477e534b00.pdf#page=35), printed p. 1-27. This also fails the corresponding round 1 row.
- `src/data/tandy.js:2586`, model3 condition 5: minimum +5 V load **0.75 A should be 0.45 A**. The stated **11.11 Ω** is correct. Source: [e233389ec9f7.pdf#page=75](src/e233389ec9f7.pdf#page=75), printed p. 68, Table 1.

TI [b67ff7d6068d.pdf#page=4](src/b67ff7d6068d.pdf#page=4) confirms **VIL ≤0.8 V / VIH ≥2 V** for SN74LS00. It does not establish probe L/H displays or the pulsing explanation. Those three entries yield five UNPROVABLE rows when repeated round 1 checks are included. Their explicit “General explanation” labels are clear; the verdict identifies missing evidence, not false definitions.

The remaining checks pass, including IBM pins and loads, PCjr connector sequence, Spectrum input/load extremes and ×10 probe, the six waveform-note rewrites, Apple II Plus removal, and Model III ripple-footnote scope.

Full evidence and page links: [round2-ledger.md](round2-ledger.md).
