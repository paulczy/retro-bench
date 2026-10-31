| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 9 | 1 | 0 | 8 |
| replacement-modern | 8 | 2 | 0 | 6 |
| connector-pin | 109 | 49 | 51 | 9 |
| chip-pin | 94 | 78 | 1 | 15 |
| **Total** | **220** | **130** | **52** | **38** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-37-ledger.md)

1. **High — items 9–10: Oric expansion signal names are swapped.** Pin **2 is /ROMDIS**; pin **3 is PHI2**. The descriptions match the pins, but the names contradict them. [Atmos manual, p.284 / PDF289](https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289).

2. **High — item 166: Master cartridge clock expectation ignores link settings.** The manuals specify **8 MHz output with LK6 A–B plus C–D**, or **external 16 MHz input with B–D**. They do not support “16 MHz out as shipped.” Losing the required external clock can damage DRAM. [Service manual, p.9](https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=9).

3. **High — item 153: one A2 mapping covers two different schematic connections.** The cited drawing labels **SK3 A2 as AT13**, but **SK4 A2 as AT15**. Resolve that discrepancy before publishing a shared socket pinout. [Schematic, sheet 1](https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf#page=1).

4. **Medium — items 9–57: Oric connector geometry is wrong.** PL2 and PL1 are **34-way and 20-way right-angle IDC pin headers**, not PCB edge connectors. This affects 49 records, including items 9–10 above. [Service manual, PDF65](https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65).

5. **Medium — item 147: CPU cycle extension is described as clock stretching.** The schematic supplies **2 MHz to pin 37**; the separate **RDY input at pin 2** extends cycles. Describe the RDY behavior explicitly. [Schematic, sheet 1](https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf#page=1).

All findings map to **prove-it-works**; the shared Oric errors also map to **fix-root-causes**. No shared-state mutations occurred.

**Blocked or inadequate source links:** Both archived Oric links returned **HTTP 429**, so they are blocked, not proven dead: [expansion signals](https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board), [schematic GIF](https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-1s.gif). The ledger identifies all 38 unsupported items, including clock articles that omit pin routing and component datasheets cited for HERO or Disk II board wiring.