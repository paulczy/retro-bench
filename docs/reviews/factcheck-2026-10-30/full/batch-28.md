| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 131 | 128 | 3 | 0 |
| chip-supply-pin | 2 | 2 | 0 | 0 |
| clock-row | 11 | 5 | 0 | 6 |
| connector-pin | 105 | 100 | 2 | 3 |
| rail | 5 | 1 | 1 | 3 |
| scope | 7 | 0 | 0 | 7 |
| first-ten | 2 | 1 | 1 | 0 |
| **Total** | **263** | **237** | **7** | **19** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-28-ledger.md)

1. **High — items 0, 2:** Coleco BIOS ROM labels are wrong: **pin 1 is NC; pin 3 is A7**. Schematic sheet 9. These errors occur in the supplied batch; local `coleco.js` already has the correct labels.

2. **High — item 253:** Printer **BUSY and forced-ready +3–12 V belong on serial pin 2**, not pin 1. BASIC printer configuration leaves pin 1 unconnected. CoCo 2 manual, printed p.50.

3. **Medium — item 237:** Cartridge SND is connected directly to the DAC input. **The cartridge must supply AC coupling**; the computer input does not already provide it. Printed pp.54, 59.

4. **Medium — item 170:** SAM `/RAS0` does not pulse for every RAM access in two-bank configurations. Bank 1 uses `/RAS1`, pin 35. SAM datasheet, p.5-331.

5. **Medium — item 260:** Restore the interrupt-test conditions: **after power-up, no cartridge, no program executing**. Without them, legitimate interrupt activity can trigger the instruction to replace the CPU. Printed p.78.

6. **Medium — item 261:** The cited model’s standard RAM is **16K×1 MCM4517**, optionally upgraded to **64K×1 MC6665**. The blanket “RAM is 4164” claim is wrong. Printed pp.3, 27.

All findings map to **prove-it-works** and **fix-root-causes**.

No dead URLs. Items **259–260** link to PDF page 74; the cited printed page 78 is [PDF page 79](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%202%20NTSC%20Service%20Manual%20(26-3026%20%26%2026-3027)%20(Tandy).pdf#page=79). Unsupported citations and the cartridge NC-versus-ground source conflict are detailed in the ledger.

No application data was changed.