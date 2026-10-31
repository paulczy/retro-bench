| Scope items (hunks) | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 293 | 152 | 5 | 136 |

**Block commit.** Mapped **248 hunks** to fix-log rows; **45 were unlogged**. Full decisions, source pages, orientation checks and unlogged changes are in the [architect ledger](P:/retro-bench/.tmp/review-fix/.factcheck-tmp/fixreview/architect-ledger.md).

1. **High — shared `cpu6502`, pin 8:** changed from +5 V to ground. Pin 8 is **VCC**; grounds are pins 1 and 21. The new ground-probe instruction could short the supply. Checked [MOS datasheet, PDF p. 10](http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf#page=10).

2. **High — shared `cia6526`, pin 20:** changed from +5 V to ground. Pin 20 is **VCC**; pin 1 is VSS. Affects C64, C128 and 1571. Checked [C64 reference guide, printed p. 420 / PDF p. 439](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf#page=439).

3. **High — Model III/4 `fdc1793`, pin 20:** changed from ground to +5 V. Pin 20 is **VSS ground**; +5 V belongs on pin 21. Checked [WD datasheet, p. 2](https://bitsavers.org/components/westernDigital/FD179X-02_Data_Sheet_May1980.pdf#page=2).

4. **High — shared `cpu8088`, pin 21:** reset polarity reversed. RESET must be **HIGH for at least four clocks**, with execution restarting when it returns **LOW**. Checked [Intel datasheet, p. 3](https://www.pcjs.org/documents/datasheets/intel/INTEL_8088_CPU.pdf#page=3).

5. **Medium — CPC6128 printer pin 27:** the new conditional preserves NC without acknowledging contradictory sources. The user manual’s chapter 7, p. 41 implies NC; the service manual’s CPU schematic, PDF p. 17, explicitly includes pin 27 among grounds. Preserve the conflict pending board-specific proof.

6. **Medium — C16 7805 regulator:** the new citation opens the **7808** table on p. 6. The 7805 table is on **p. 5**. Its characterized input range and typical dropout do not establish an exact universal cutoff below 7 V. Checked [TI datasheet](https://www.ti.com/lit/ds/symlink/ua78.pdf#page=5).

7. **Medium — uncertainty flags leave unsupported instructions usable.** Examples include Coleco `rom9464-cv` pin 2 conversion wiring, HERO connector tables backed by an encrypted book, and SN94624 replacement guidance without its datasheet. `verify: true` does not prove these claims. The ledger identifies every unresolved item.

8. **Medium — new `plus4-video` inherits unsupported expectations:** pins 1 and 4 retain 1 V p-p/75 Ω guidance, while its replacement sources provide connector nets without those electrical limits.

9. **Low — audit trail:** 45 hunks lack matching table rows, including the Coleco photo-box reassignment. Each is listed separately in the ledger.

Findings are mapped to **boundary-discipline**, **foundational-thinking** and **redesign-from-first-principles** in the ledger. No source data was modified or committed.