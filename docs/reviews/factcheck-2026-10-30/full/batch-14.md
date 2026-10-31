| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 202 | 183 | 9 | 10 |
| chip-pin | 53 | 49 | 1 | 3 |
| first-ten | 19 | 9 | 2 | 8 |
| scope | 19 | 6 | 0 | 13 |
| clock-row | 9 | 4 | 0 | 5 |
| rail | 4 | 0 | 0 | 4 |
| **Total** | **306** | **251** | **12** | **43** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-14-ledger.md) — verified 306 unique decisions. Unsupported portions of otherwise correct items are identified explicitly.

1. **High — i97, i98: powered contacts labelled NC.** On the **600XL**, PBI pins **47 and 48 carry +5 V**. The manual’s connector table conflicts with its own schematic; the schematic and cited FAQ agree on +5 V. [600XL schematic, PDF p. 68](https://archive.org/details/Atari600XLComputerFieldServiceManualRev1/page/n67).

2. **High — i0, i1: SIO clock names reversed.** Pin **1 is CLOCK IN**; pin **2 is CLOCK OUT**. The descriptions have the correct directions, but the names contradict them. [FSM p. 1-12](https://archive.org/details/Atari600XLComputerFieldServiceManualRev1/page/n21).

3. **High — i131: activity check includes ground.** CPU address pins are **9–20 and 22–25**. Pin **21 is ground** and must not pulse. The current range makes a healthy board fail. [Sams CPU operation](https://archive.org/details/atari800xlsamscomputerfactstechnicalservice/page/n5).

4. **High — i275: printer strobe traced to the wrong latch signal.** `/STROBE` comes from **74LS273 Q7, pin 19**, through the 74LS132 inverter. Latch clock **pin 11** is a separate signal. [CPC464 circuit diagram, pp. 15–16](https://archive.org/details/amstrad-cpc-464-micro-computer-ctm-640-color-monitor-gt-64-green-monitor-service-manual/page/n12).

5. **Medium — i122: load resistor exceeds its rating.** At the documented nominal **5 V**, a **4.7 Ω** load dissipates **5.32 W**, exceeding the specified **5 W** rating. Use a suitably rated load, such as 10 W. This is an arithmetic finding; Sams does not prescribe that load test. [Sams supply check](https://archive.org/details/atari800xlsamscomputerfactstechnicalservice/page/n26).

6. **Medium — i11, i12, i19, i20: incorrect alternate controller functions.** Paddle triggers use connector pins **3 and 4**, not **1 and 2**. The shared descriptions incorrectly assign paddle-trigger functions to all four direction pins. [Controller pinouts](https://www.atarimania.com/machines/atari-400-800-xl-xe/faq/16).

7. **Medium — i158: unconditional interrupt-pulse expectation.** V9938 `/INT` requires enabled interrupt sources and acknowledgement. It can remain HIGH when disabled or LOW until serviced; it is not inherently one LOW pulse per frame. [Yamaha register functions, pp. 4 and 9](https://archive.org/details/bitsavers_yamahaYamanicalDataBookAug85_6932685/page/n14).

These findings map to **prove-it-works** and **fix-root-causes**. Shared-state mutation ordering does not apply to this audit.

**Blocked or mismatched sources**

- The cited Wayback CPCWiki [Expansion](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Expansion_port), [Monitor](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Monitor), and [Printer](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Printer_port) links returned **HTTP 429**.
- **i124** cites an **800XL** document for a **130XE** procedure.
- **i127** names Technical Reference Notes p. **180**; the tone frequencies appear on printed OS p. **195**. Its actual linked source is Sams, which does not supply those frequencies.