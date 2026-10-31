| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 200 | 159 | 5 | 36 |
| clock-row | 9 | 6 | 1 | 2 |
| first-ten | 9 | 3 | 0 | 6 |
| rail | 9 | 2 | 0 | 7 |
| chip-pin | 76 | 66 | 0 | 10 |
| **Total** | **303** | **236** | **6** | **61** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-05-ledger.md). All items received a decision; application files remain unchanged.

1. **High — i=0,1: VIC-20 serial names swapped.** Pin **1 is SRQ IN**; pin **2 is GND**. Their names contradict their descriptions and electrical expectations. [Reference guide, printed p. 282](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf#page=298).

2. **High — i=74: wrong VIC light-pen pin.** Controller pin 6 connects to **VIC pin 9**, not pin 37. Following the record sends the technician to a data-bus pin. [324001, sheet 1](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/vic20/324001-02a.gif).

3. **High — i=89: wrong clock-generator location.** On board **250469**, the 8701 is **U20**, not U31. Output pins 6/8 and the listed frequencies are supported. [250469 schematic, sheet 2](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/250469-rev.A.pdf#page=2).

4. **High — i=279: wrong cassette-sense route.** C16 CN3 pin 6 feeds **U11, a 74LS125**, which drives **D2** when `$FD10–$FD1F` is selected. It does not feed the 6529. [C16 schematic, printed p. 7 / PDF p. 12](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf#page=12).

5. **Medium — i=283: wrong audio-input destination.** C16 video pin 5 feeds **EXT AUDIO and the Q3 audio mixer**, rather than entering the sound chip. [C16 schematic, printed p. 7 / PDF p. 12](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/C16_Service_Manual_314001-03_(1984_Oct).pdf#page=12).

All findings map to **prove-it-works**; findings 4–5 also map to **fix-root-causes**. No shared-state mutation issue applies.

**Unavailable or mismatched citations:**

- Both cited Wayback snapshots were inaccessible: [power-supply article](https://web.archive.org/web/20250312194753/https://portcommodore.com/rcarlsen/cbm/c64/C64%20PS/CBM%20PS.txt) and [blank-screen article](https://web.archive.org/web/20250819042254/https://portcommodore.com/rcarlsen/cbm/c64/c64blank.txt). Their live originals were readable; deletion was not established.
- The C16 schematics do not establish Plus/4 component routing for i=294,297–299.
- i=301 claims TI regulator specifications without citing a TI data sheet.

The 61 unverifiable decisions identify the unsupported claims individually, including voltage tolerances, waveform limits, and diagnostic instructions. No hardware was powered or probed.