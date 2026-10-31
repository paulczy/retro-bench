| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 128 | 124 | 0 | 4 |
| clock-row | 10 | 3 | 0 | 7 |
| connector-pin | 109 | 90 | 5 | 14 |
| first-ten | 16 | 4 | 1 | 11 |
| rail | 11 | 3 | 0 | 8 |
| scope | 2 | 0 | 0 | 2 |
| **Total** | **276** | **224** | **6** | **46** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-08-ledger.md) — verified 276 unique rows, covering indices 0–275.

1. **High — items 0, 1: BBC UHF contact names are swapped.** Centre must be **UHF**; shell must be **0 V**. The current names could direct a technician’s ground connection onto the signal contact. [Schematic, sheet 1, UM1233/E36 area](https://www.goffart.co.uk/museum/schematics/bbc_b.pdf). Maps to **prove-it-works**.

2. **Medium — items 2, 3: BBC composite-video connector has the wrong geometry.** Change `rca` to **BNC**. Centre signal and shell ground assignments agree. [Service manual, §1.2.1 and §7.1; printed p. 1](https://acorn.huininga.nl/pub/unsorted/manuals/BBC%20Microcomputer%20Service%20Manual-HTML/BBCServiceManual.html). Maps to **prove-it-works**.

3. **Medium — item 89: Later CPC464 oscillator diagnosis names the wrong component.** Boards using the 40010 need the **74HCU04 oscillator** checked, rather than the unconditional “7400 oscillator” instruction. [Service amendment, printed p. 8](https://archive.org/details/amstrad-cpc-464-cpc-6128-micro-computer-gt-65-green-monitor-ctm-644-color-monito). Maps to **prove-it-works**, **fix-root-causes**.

4. **Medium — item 247: Printer `/STROBE` has the wrong signal origin.** It comes from **74LS273 Q7, pin 19**, inverted through the 74LS132—not from the latch clock, pin 11. [CPC6128 service manual, printed pp. 19–20](https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n16). Maps to **prove-it-works**, **fix-root-causes**.

Unavailable or unsuitable source links:

- [Archived BBC schematic](https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf): HTTP 429; recovered through the matching Goffart drawing.
- Archived CPCWiki [Expansion](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Expansion_port), [Monitor](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Monitor), [Printer](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Printer_port), [Gate Array](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Gate_Array), [pinouts](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Gate_Array_and_ASIC_Pin-Outs), and [PAL16L8](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/PAL16L8): connections refused; direct live pages returned 403. PAL details were partially recovered through search.
- **Item 56:** the cited amendment does not cover CPC664. Its AY clock needs the [CPC664 service manual, printed p. 19](https://archive.org/details/amstrad-cpc-664-service-manual/page/n16).
- **Item 21:** the [BBC Advanced User Guide](https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html) does not establish Master-specific hardware claims.

The 46 unverifiable decisions identify missing proof, including voltage tolerances, lead colours, contact numbering, and machine-specific timing. No application data was modified.