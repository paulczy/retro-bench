| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 202 | 184 | 5 | 13 |
| chip-pin | 20 | 18 | 0 | 2 |
| clock-row | 2 | 2 | 0 | 0 |
| rail | 11 | 1 | 1 | 9 |
| first-ten | 11 | 5 | 0 | 6 |
| **Total** | **246** | **210** | **6** | **30** |

All 246 decisions and evidence are in the [per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-09-ledger.md).

1. **High — items 0, 1:** CPC464 stereo channel names are reversed. **Tip = LEFT; ring = RIGHT.** Their descriptions already contradict their names. The cited [plug diagram, chapter 7 p.39](https://archive.org/details/amstrad-cpc-6128-user-manual/page/n349), confirms the correction.

2. **Medium — item 44:** CPC664 +12 V is **not drive-motor-only**; it also supplies the LA4140 audio amplifier. See the [cassette circuit, p.36](https://archive.org/details/amstrad-cpc-664-service-manual/page/n28). The stated voltage tolerance is also unsupported.

3. **Medium — item 109:** Printer strobe comes from **74LS273 Q7, pin 19**, inverted through the 74LS132—not from the latch clock. See the [CPU schematic, pp.19–20](https://archive.org/details/amstrad-cpc-664-service-manual/page/n16).

4. **Medium — items 219, 234:** The Apple II game-port strobe’s normal LOW interval is approximately **0.49 µs**, not 1 µs. This is derived from the phase-gated behavior in [Table 29, p.100](https://archive.org/details/Apple_II_Reference_Manual_1979_Apple/page/n110) and the [Sather timing diagram, p.3-5](https://archive.org/details/understanding_the_apple_ii/page/n38). Approximately 1 µs is the complete CPU cycle.

Source-link problems: the cited CPCWiki [Expansion](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Expansion_port) and [Printer](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Printer_port) archive links returned **HTTP 429**, not proven dead. Printer pins 15/16 remain unverifiable because the recovered CPCWiki text conflicts with the manufacturer’s user manual. All cited PDFs were retrieved.