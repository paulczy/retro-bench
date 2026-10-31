| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 95 | 84 | 4 | 7 |

**Block commit.** [Per-item ledger](P:/retro-bench/.tmp/review-fix2/.factcheck-tmp/fixreview2/fa-commodore-ledger.md). “Correct” includes honest verification flags, not certification of their retained claims.

1. **High:** 7501 pin 5 was wrongly changed to GND. It is **VCC, +5 V**; ground is pin 20. Maker pin diagram and TED manual p. 14 agree.
2. **High:** Shared drive IEC text wrongly says no internal pull-up and removes the 1581 fast-clock role. The 1581 schematic shows **FAST CLK on pin 1**, with its own **1 kΩ pull-up** (PDF p. 20).
3. **Medium:** C64 clock and TED edits retain/add undocumented fault diagnoses; C16 firstTen 6 still concludes “Flat /RAS: the TED.”
4. **Medium:** PET cleanup leaves unsupported regulator-failure and DRAM advice.
5. **Medium:** C64 cassette SENSE pin 6 retains unproven switch-state expectations without a flag; duplicate F is flagged.
6. **Medium:** VIC-20 cartridge pins retain unproven idle states after merely removing voltage numerals.
7. **Low:** C64 rail conflict still says the deleted acceptance range is “kept.”
8. **Low:** C16 regulator note references the bottom of a deleted range.
9. **Low:** VIC-20 IEC description newly identifies the **C64** as its controller.

All 95 items received decisions. Data remained unchanged; nothing was committed.