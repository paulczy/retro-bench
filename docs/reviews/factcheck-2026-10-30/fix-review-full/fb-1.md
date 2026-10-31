**Block commit.**

| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 185 | 126 | 4 | 55 |

1. **High — 8088 pin 40:** changed incorrectly to ground. It is **VCC, +5 V**; grounds are pins 1 and 20. [Intel data sheet, p. 3](https://www.pcjs.org/documents/datasheets/intel/INTEL_8088_CPU.pdf#page=3).
2. **High — CPC464 printer STROBE:** correct IC110 pins are **9/10 → 8**, not 12/13 → 11. Service manual pp. 15–16, PDF page 13.
3. **High — Master analogue pin 13:** correct destination is **IC8 pin 14**, not IC3 pin 14. Master schematic sheet 2.
4. **Medium — CPC ROM `/OE`:** pulled low through R112 and connected to ROMDIS—not permanently tied low. `/CS` alone does not determine selection.
5. **Medium — HERO clock duty:** equal minimum pulse widths do not establish the retained exact **50%** duty cycle.
6. **Medium — CPC power instructions:** three unflagged steps retain centre-positive polarity without supporting contact drawings.
7. **Medium — Master RGB supply:** “A few mA only” remains unsupported.
8. **Low — HERO fix log:** 25 claimed flag additions already existed in HEAD.

[Complete per-item ledger](P:/retro-bench/.tmp/review-fix2/.factcheck-tmp/fixreview2/fb-1-ledger.md) includes sources, pages, necessity assessments, and flag checks.

Curl failed TLS initialization; documented Python downloads supplied the evidence. No source files changed or committed.