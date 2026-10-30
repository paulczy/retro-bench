| Item kind | Checked | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| Chip pins | 84 | 78 | 2 | 4 |
| Connector pins | 170 | 137 | 1 | 32 |
| **Total** | **254** | **215** | **3** | **36** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/rest-minimalist-c/ledger.md) contains all 254 original indices exactly once, with evidence and dispositions.

1. **High — i260, `cpu6808`, pin 7 BA:** “freed the bus” is misleading. BA HIGH indicates the CPU has stopped, but its address outputs remain driven. Correct the description to distinguish the disabled data outputs from the active address outputs. Connecting another address driver could cause contention. Checked [Motorola datasheet, p. 7](https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf#page=7).

2. **High — i337, `pal40030`, pin 16 `/CAS1`:** The chip range is wrong. The cited diagram connects `/CAS1` through R160 to **IC119–IC126**, labeled the second bank. **IC127–IC134 use `/CAS0`**. This sends troubleshooting to the other RAM bank. Checked [CPC6128 Service Manual, printed pp. 19–20](https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual/page/n16).

3. **High — i910, `cpc664-printer`, pin 27:** Both cited primary sources identify this contact as **GND**, not NC. Correct it to “GND — ground return.” Treating it as an unused contact could short an added signal. Checked [User Instructions, chapter 7 p. 41](https://archive.org/details/amstrad-cpc664-user-manual/page/n305) and [Service Manual CPU diagram, PDF p. 17](https://archive.org/details/amstrad-cpc-664-service-manual/page/n16).

4. **Medium — four descriptions exceed their citations:**  
   **i302** `bus8288/1`, **i304** `bus8288/15`, and **i314** `dma8237/17` have confirmed generic pin functions, but their Intel citations do not establish the added IBM board connections. **i342** `rom23256/27` is A14, but the Amstrad diagrams do not establish LOW=OS/HIGH=BASIC. Remove those clauses or add supporting citations. Checked Intel printed pp. 3-247–248 and 2-88–90; Amstrad printed pp. 19–20 and amendment p. 23.

5. **Medium — five unsupported voltage bands:** **i764** `hero1-p201/10`, **i803** `herojr-p201/11`, **i810** `herojr-p203/2`, **i855** `p-psu/P9-5`, and **i861** `p-slot/B3`. Their pin identities are supported; their stated acceptance bands are not established by the citations. In particular, the 5155 records inherit regulation limits documented for the XT supply. Remove or separately source these bands. Relevant pages: HERO schematics sheets 1, 3–4; IBM power-supply sections pp. 3-4 and 3-8.

6. **Medium — 27 HERO 1 claims cannot be verified:** **i766–767 and i773–797** rely solely on restricted book tables, pp. 97–104. The PDF returns **401 Unauthorized**; searches found no accessible table copy. Each pin is individually listed in the ledger. Mark each unverified, or withhold it from actionable bench guidance.

7. **Low — incorrect printed-page locators:** i765’s charger description starts on printed **72**, not 73; i801’s RS-232 description is printed **24**, not 25; the XT slot diagram is printed **1-17**, not 1-16. Their PDF fragments remain usable.

The subtraction recommendation is to remove unsupported wording and limits, while retaining the supported pin identities. No supplied item had an empty source list.

Source access failures, distinguished from proven dead links:

- [HERO 1 book](https://archive.org/details/hero1advancedpro0000robi): restricted; PDF HTTP 401.
- CPCWiki Wayback citations blocked with HTTP 429 or connection refusal: [pinouts](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Gate_Array_and_ASIC_Pin-Outs), [Gate Array](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Gate_Array), [PAL16L8](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/PAL16L8), [FDC](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/765_FDC), [expansion](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Expansion_port), [printer](https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Printer_port).
- [5160 RAM page](https://minuszerodegrees.net/5160/ram/5160_ram_256_640.htm): download returned HTTP 406; searchable content remained accessible.