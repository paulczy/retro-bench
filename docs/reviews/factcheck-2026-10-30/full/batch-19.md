| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 6 | 3 | 0 | 3 |
| connector-pin | 214 | 184 | 9 | 21 |
| first-ten | 8 | 3 | 1 | 4 |
| rail | 12 | 6 | 1 | 5 |
| **Total** | **240** | **196** | **11** | **33** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-19-ledger.md). All 240 indices are present exactly once. Unverifiable decisions identify the specific unsupported portion of each record.

1. **High — i=42, HERO 1 speech power.** P501-11 is a logic enable through Q502/Q501, not a +5 V supply feed. The manual documents +12 V at P502-13 and switched +12 V at U502-14. The claimed SC-01A pin-1 voltage is unproven. **Source:** Technical Manual, printed pp. 69, 78.

2. **High — i=15–16, HERO 1 P201 names swapped.** Pin **1 is logic battery ground**; pin **2 is LOW LOGIC BATTERY**, driven by U202. The current names contradict their descriptions. **Source:** schematic sheet 3, power supply.

3. **High — i=158, HERO Jr P201-12.** This is **+12 V**, not NC. Both circuit schematics show the connection omitted from the interconnect overview. **Source:** schematics sheets 3–4.

4. **High — i=219, HERO Jr P205-4.** This is **GND**, joined to pin 3, not NC. **Source:** CPU schematic, sheet 3.

5. **High — i=225, HERO Jr P205-12.** This is **RESET**, joined to pin 11, not NC. **Source:** CPU schematic, sheet 3.

6. **High — i=145–146, HERO Jr RS-232 connector sex.** The robot connector uses **female contacts**, contradicting `gender: male`. Pin-2 receive and pin-7 ground mappings are correct. **Source:** RS-232 accessory manual, printed p. 7, Detail 2-3D.

7. **Medium — i=7, HERO 1 charger threshold loses its condition.** The +25 V test belongs to a particular troubleshooting branch. It cannot serve as a universal first-check minimum: the manual permits input as low as **14 V** during current limiting with discharged batteries. **Source:** Technical Manual, printed pp. 62, 72–73.

8. **Medium — i=50, HERO 1 P1201-8 classification.** This is a **control** signal driving Q1202/Q1201, not a power pin. Correct `type` to `ctrl`. **Source:** display schematic, sheet 4.

9. **Medium — i=171, HERO Jr charger component reference.** U301 output reaches P307-1 through **D313**, not W302. **Source:** power/sense schematic, sheet 4.

These findings map to **prove-it-works** and **fix-root-causes**. No shared-state mutation finding applies.

No permanently dead link was established. The [HERO 2000 canonical PDF](https://archive.org/download/heathkit-hero-2000-et-19-schematic-diagrams-595-3416/heathkit-hero-2000-et-19-schematic-diagrams-595-3416.pdf) returned HTTP 500; its [Archive mirror](https://ia800609.us.archive.org/27/items/heathkit-hero-2000-et-19-schematic-diagrams-595-3416/heathkit-hero-2000-et-19-schematic-diagrams-595-3416.pdf) supplied the document.

Item 42 cites a sheet without the speech-board supply schematic. Items 26, 27, 30, 34, 35, 37 and 38 need the block interconnect drawing added for their socket wiring, wire identification or battery assignments.

No data files were modified.