[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/rest-minimalist-b/ledger.md) — all 228 items have a decision.

| Item kind | Checked | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| Chip pins | 77 | 76 | 0 | 1 |
| Connector pins | 151 | 148 | 3 | 0 |
| **Total** | **228** | **224** | **3** | **1** |

1. **High — WRONG, i760:** `model4 / m4-printer`, pin **17**. The description incorrectly names **U94** as the printer latch. The Model 4 uses **U66**; its Q7 output connects to printer pin 17. Correct the reference or delete that clause—it directs probing to the wrong IC. Checked: [Model 4 manual, printed p. 21, PDF p. 37](https://archive.org/download/model-4-technical-reference-manual/Model%204%20Technical%20Reference%20Manual%20(1983)(Tandy%20Corporation)(pdf).pdf#page=37), plus schematic sheet 4, PDF p. 53. *subtract-before-you-add*

2. **Medium — WRONG, i699:** `ti994a / ti994a-io`, pin **41**. This carries **IAQ OR HOLDA**, named **IAQHA**, rather than raw IAQ. Checked: [TI Technical Data, schematic p. 60, PDF p. 62](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf#page=62). Its simplified tables omit HOLDA. *outcome-oriented-execution*

3. **Medium — UNVERIFIABLE, i189:** `ula_zx81`, pin **36**, **A3′**. The cited sources support the pin number and refresh-address function, but do not establish the claimed **bidirectional** operation. Remove that direction assertion or mark it unverified; retain the supported mapping. Checked: [Andy Rea’s “Alternative address lines group”](https://oldcomputer.info/8bit/zx81/ULA/ula.htm) and schematic SRC 049. *subtract-before-you-add*

4. **Low — WRONG, i695:** `ti994a / ti994a-power`, pin **2**. “Centre tap” is inaccurate: the transformer is **26.40 VAC tapped at 17.85 VAC**, with unequal sections. Use “secondary tap, white wire.” Checked: [Sams parts list, printed p. 21, PDF p. 33](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/computerfacts/Sams%20TI994A%20ComputerFacts.pdf#page=33). *subtract-before-you-add*

Dead links: **none; all 79 cited URLs loaded**. The [Model III printer schematic](https://archive.org/download/Model_III_Technical_Reference_Manual_1981_Tandy/Model_III_Technical_Reference_Manual_1981_Tandy.pdf#page=50) cited by i760 is the wrong model for its latch reference. Additional internal source conflicts are documented in the ledger.

No source-free records occur in this supplied list. Documents were grouped and reused without sub-agents, applying *cost-aware-delegation*.