| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 87 | 87 | 0 | 0 |
| clock-row | 7 | 7 | 0 | 0 |
| connector-pin | 173 | 169 | 2 | 2 |
| first-ten | 7 | 1 | 0 | 6 |
| rail | 10 | 8 | 0 | 2 |
| scope | 4 | 0 | 0 | 4 |
| **Total** | **288** | **272** | **2** | **14** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-33-ledger.md) records every decision and evidence gap.

1. **High — Items 0 and 1: reversed Spectrum power labels.** Correct values: **centre contact = GND/0V; sleeve = +9V**, per the cited [connector document, “Power Supply” section](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Tech%20specs/ZX%20Spectrum%20Connectors.html). Following the supplied labels could reverse supply polarity. Maps to **prove-it-works** and **fix-root-causes**.

   **Snapshot discrepancy:** these errors occur in the supplied batch JSON. The checked source at commit `4b85bd0` already has correct labels in [sinclair.js](P:/retro-bench/.tmp/review/src/data/sinclair.js:671).

Dead or wrong-document source links: **none found**. Missing citations include the WoS timing corrections and item 9’s Retroleum claim; details are in the ledger. No data files were changed.