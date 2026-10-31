| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| replacement-modern | 6 | 3 | 1 | 2 |
| connector-pin | 154 | 151 | 3 | 0 |
| chip-pin | 107 | 103 | 3 | 1 |
| clock-row | 6 | 3 | 0 | 3 |
| first-ten | 13 | 6 | 0 | 7 |
| rail | 9 | 3 | 0 | 6 |
| **Total** | **295** | **269** | **7** | **19** |

[Per-item ledger with evidence and source pages](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-32-ledger.md)

1. **High — i6, Spectrum +2 RGB pin 2:** Rename `BRIGHT` to **0V**. Both cited RGB tables identify pin 2 as ground.
2. **High — i7, Spectrum +2 RGB pin 3:** Rename `0V` to **BRIGHT / AUDIO OUT**. The +2 table specifies BRIGHT through default LK7, or audio through LK8.
3. **Medium — i54, ZX80 edge B2:** The cited single-sheet schematic labels the input **9–11 V**, not **7–11 V**.
4. **Medium — i103, ZX81 ULA pin 15:** NMI pulses require the **NMI generator to be enabled**. Rea’s control-input discussion documents enabling through OUT `$FE` and disabling through OUT `$FD`; the probe instruction omits this condition.
5. **Medium — i120, ZX81 oscillator:** X1 is not the only external oscillator component. SRC049 also shows **C6, C7, and R4** beside ULA pin 35.
6. **Medium — i224, Spectrum keyboard pullups:** The cited Issue 3 schematic shows **R65–R69**, whereas the record says R64–R68. Service-manual p.14 repeats the latter numbering, so the sources conflict and need revision qualification.
7. **Medium — i5, PICO9918 replacement:** The current README’s **Hardware → PRO v2.x** section identifies **RP2350** for PRO v2.0. Describing the combined PICO9918/PRO entry solely as RP2040 is incomplete.

All findings map to **prove-it-works**; correcting component references and state assumptions also maps to **fix-root-causes**.

No dead links: all 22 cited URLs downloaded. **Source applicability gaps:** TS1000 items 145, 146, and 193 cite the ZX81 schematic; items 201 and 202 cite the ZX81 manual. Those sources do not directly prove the TS1000-specific claims.