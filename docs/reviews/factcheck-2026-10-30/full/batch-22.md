| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 284 | 250 | 5 | 29 |
| clock-row | 9 | 2 | 0 | 7 |
| connector-pin | 74 | 67 | 0 | 7 |
| first-ten | 6 | 0 | 0 | 6 |
| replacement-modern | 1 | 1 | 0 | 0 |
| scope | 8 | 8 | 0 | 0 |
| **Total** | **382** | **328** | **5** | **49** |

1. **High — items 2, 3: FD1771 control-pin names swapped.** Pin **2 is `/WE`**; pin **3 is `/CS`**. Their descriptions already match the correct functions. The labels could send a technician to the wrong pin. [WD data sheet, pp. 1–2](https://archive.org/download/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital.pdf#page=2). Principles: **prove-it-works, fix-root-causes**.

2. **Medium — items 184, 187: 8088 strobe timing includes T4 incorrectly.** `/WR` at pin 29 and `/RD` at pin 32 are active during **T2, T3, and Tw**; they deassert entering T4. [Intel handbook, pp. 3-80–81](https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf#page=260). Principle: **prove-it-works**.

3. **Medium — item 313: 8237 reset does not clear all registers.** RESET clears Command, Status, Request, Temporary, and the first/last flip-flop, and sets Mask. Address, count, and base registers are not cleared. [Intel handbook, p. 2-89](https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf#page=113). Principles: **fix-root-causes, prove-it-works**.

Source-link issues:

- [IBM RAM page](https://minuszerodegrees.net/5160/ram/5160_ram_256_640.htm): blocked with HTTP 406; its [Wayback copy](https://web.archive.org/web/20260322225148/https://www.minuszerodegrees.net/5160/ram/5160_ram_256_640.htm) returned HTTP 429. Neither is proven dead.
- Scope items **374–381** name IBM frequency references but hyperlink only the Intel handbook. Correct IBM links are recorded in the ledger.

[Complete per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-22-ledger.md). No application data changed; the 49 unverifiable items remain unresolved.