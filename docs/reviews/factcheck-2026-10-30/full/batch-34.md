[Per-item ledger](P:/.factcheck-tmp/full/batch-34-ledger.md) — **225/225 items decided**.

| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 10 | 10 | 0 | 0 |
| connector-pin | 169 | 134 | 12 | 23 |
| first-ten | 38 | 15 | 2 | 21 |
| rail | 6 | 6 | 0 | 0 |
| scope | 2 | 0 | 0 | 2 |
| **Total** | **225** | **165** | **14** | **46** |

1. **High — i5–6: reversed power labels in the batch.** Centre should be labelled **0V**, sleeve **+9V**, consistent with their descriptions and the [cited polarity source](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Tech%20specs/ZX%20Spectrum%20Connectors.html). **The checkout already has the correct labels**; this discrepancy is in the supplied batch. Exact 128-model polarity remains expressly unconfirmed.

2. **High — i140: +2 B23 is an AC inverter output.** The record calls it −12 V DC; the schematic labels it **+12V AC**. Treating it as a negative supply sends the technician to the wrong signal. [+2 schematic, PDF pp. 4–5](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B2/Repair/Service%20Manual%20%2B2.pdf#page=5).

3. **High — i110–113: +2 A15–A18 are unused.** Correct all four to **N/C**. VIDEO, /Y, V, U and their ULA pin references were inherited from the 48K board. [+2 schematic, PDF p. 5](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B2/Repair/Service%20Manual%20%2B2.pdf#page=5).

4. **High — i108: wrong +2 transistor reference.** The A0/IORQ gate uses **TR7**, not TR6. TR6 belongs to the sound path. [+2 schematic, PDF pp. 3–4](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B2/Repair/Service%20Manual%20%2B2.pdf#page=4).

5. **Medium — i58: wrong 128 +12 V acceptance range.** Its basic checks specify **+11.5 to +12.5 V**, rather than +10.8 to +13.2 V. [128 manual, printed p. 4.4](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B%20128K/Repair/ZX%20Spectrum%2B%20128K%20Service%20Manual.pdf#page=33).

6. **Medium — i56, i137: incorrect 4116 explanation.** Both machines use **4164 RAM**. Their −5 V output is not a 4116 Vbb rail. [128 parts list, p. 5.5](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B%20128K/Repair/ZX%20Spectrum%2B%20128K%20Service%20Manual.pdf#page=40); [+2 parts list, PDF p. 7](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B2/Repair/Service%20Manual%20%2B2.pdf#page=7).

7. **Medium — i119: wrong +2 ROM isolation resistor.** Correct **R33 → R24, 680 Ω**. [+2 schematic, PDF p. 3](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B2/Repair/Service%20Manual%20%2B2.pdf#page=3).

8. **Medium — i154: impossible diagnostic fallback.** With no test card, the separate service-ROM procedure uses **steady/flashing border colours**. An address/bank report requires the diagnostics to run first. The record conflates two diagnostic procedures. [+3 manual, printed pp. 3 and 17](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B3/Repair/Service%20Manuals/Service%20Manual%20%2B2A%2C%20%2B3A/).

9. **Medium — i169: incomplete PCjr test setup.** The cited procedure retains the **service plug**, uses advanced POST, and tests the memory expansion before disconnecting internal disk/modem equipment. “Nothing on the rear sockets” omits that setup. [PCjr HMS, pp. 3-020-1–7](https://minuszerodegrees.net/manuals/IBM/IBM%204860%20(PCjr)%20-%20Hardware%20Maintenance%20and%20Service%20-%20SEP83.pdf#page=55).

All findings map to **prove-it-works**; inherited model-specific errors also map to **fix-root-causes**. No shared-state mutation finding applies.

Source problems:

- **Blocked, not proven dead:** [5155 startup page](https://minuszerodegrees.net/5155/motherboard/IBM%205155%20-%20Startup%20sequence.htm), i158: HTTP 406; web fallback also failed.
- **Wrong model as evidence:** the [48K Issue 3 schematic](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Circuit%20Diagrams/ZX%20Spectrum%20Issue%203%20-%20Schaltbild.gif) does not establish the disputed +2 analog wiring or component references.
- **High-risk source conflict, i67:** the 128 manual prints **IC34 pin 1** for −12 V, while its power description assigns that supply to **IC33**. Marked **UNVERIFIABLE**, not certified for probing.

No application files changed.