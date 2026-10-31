# HERO 1 re-sourcing from the open ET-18 drawings (2026-10-31)

The 228 HERO 1 connector pins that cited only a restricted lending book, plus the other 79 HERO 1 pins, were re-checked against the open Heathkit ET-18 collection (https://archive.org/details/heathkit-hero-1-ET-18): schematics sheets 1-4, the block interconnect diagram, the Technical Manual and Errata 1 and 2. Data agent: Claude Opus 5.5, high effort. Reviewers: Codex GPT-6.1 Sol, medium effort.

| Round | Scope | Planted errors | Caught | Real errors found |
|---|---|---|---|---|
| 1 | all 307 HERO 1 connector pins, errata changes | 3 | 2 (missed a P310 91/92 swap; checked by hand against sheet 3) | 7, plus 31 unproven claims without a flag |
| 2 | the 12 connectors changed in round 1, every round-1 action | 3 | 3 | 0; 20 descriptions needed citations or are attributed to the book |

After round 2 the lead added the TM printed p. 73 citation to three battery expectations and the Votrax data sheet to P501. Book-only phase numbers on P309/P315 are kept as attributed notes.

Final: 275 pins proven, 14 corrected, 9 conflicts (shown as "Sources disagree"), 9 still unverified; 17 pins keep CHECK. Pin-by-pin log: `docs/verification/hero1-resource.md`.
