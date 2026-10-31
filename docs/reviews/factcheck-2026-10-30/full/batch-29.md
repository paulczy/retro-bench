| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 4 | 3 | 0 | 1 |
| chip-pin | 95 | 82 | 10 | 3 |
| connector-pin | 123 | 116 | 6 | 1 |
| first-ten | 8 | 4 | 1 | 3 |
| rail | 7 | 5 | 0 | 2 |
| **Total** | **237** | **210** | **17** | **10** |

[Per-item evidence ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-29-ledger.md). Verified 237 unique rows, covering items 0–236.

1. **High — items 1–2:** GIME crystal labels are reversed. Correct: **pin 2 EXTAL, pin 3 XTAL**. Both the service manual p. 96 and revised schematic p. 1 agree.
2. **High — items 121, 186:** Printer BUSY/ready belongs on **serial pin 2**, not pin 1. Printer use leaves pin 1 unconnected. CoCo 3 manual p. 48; Technical Reference PDF p. 45.
3. **Medium — items 49–56:** GIME **RAMD7–RAMD0, pins 57–64, are inputs**, not bidirectional terminals. The block diagram feeds them into data latches. CoCo 3 manual p. 96.
4. **Medium — items 93, 172:** Cartridge sound pin 35 lacks onboard AC coupling. The cartridge must provide that coupling; clarify the requirement. CoCo 3 manual pp. 43, 49; Technical Reference PDF p. 74.
5. **Medium — item 112:** RGB pin 10 is electrically connected as **monitor sense with a pull-up**, despite its NC classification. Revised schematic p. 1; CoCo 3 manual p. 41.
6. **Medium — item 137:** LOW does not universally stop the CPU. HALT stops program flow; NMI invokes an interrupt handler; FIRQ can be masked. CoCo 3 manual p. 32.
7. **Medium — item 189:** Eight printer data bits require a ROM qualification. Earlier BASIC uses **seven bits**; revision 1.1 changes to eight. Technical Reference PDF p. 45.

No dead links. The [RGB pinout source](https://old.pinouts.ru/Video/Cm8CoCoRGB_pinout.shtml) incorrectly calls pin 10 unconnected. The Technical Reference’s cartridge-range prose also conflicts with the second cited manual; the ledger records that discrepancy.

Findings map to **prove-it-works**; repeated table errors also map to **fix-root-causes**. No application data changed.