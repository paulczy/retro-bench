| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 10 | 7 | 0 | 3 |
| connector-pin | 182 | 165 | 4 | 13 |
| first-ten | 22 | 11 | 0 | 11 |
| rail | 11 | 3 | 0 | 8 |
| scope | 7 | 1 | 2 | 4 |
| replacement-modern | 1 | 0 | 1 | 0 |
| **Total** | **233** | **187** | **7** | **39** |

[Per-item evidence ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-30-ledger.md). Unverifiable decisions identify the unsupported fields; many are voltage tolerance ranges absent from the schematics.

1. **High — MC-10 expansion labels swapped (i=3,5).** Pin **1 is GND**, and pin **3 is D0**. The records name them D0 and GND respectively, directing a technician to the wrong contact. [Service Manual, p.15, Table 1](https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Service%20Manual/MC-10%20Service%20Manual%20(NTSC)%20(Tandy).pdf#page=15).

2. **High — F18A-MK2 incorrectly described as having disconnected pins (i=83).** Original F18A pins 35/36 are NC. MK2 pins **35/36 are connected FPGA GPIO, 3.3 V only**. The replacement note conflates their electrical interfaces. [Manufacturer pinouts, “MK2 Pin Out”](https://dnotq.io/f18a/pinout.html).

3. **Medium — Dragon cassette resistor value is 1,000× too small (i=129).** The source recommends **270–470 kΩ**, not 270–470 Ω. It describes a recommended modification, not documented factory fitting. [Service Information, PDF p.1, item 4](https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=1).

4. **Medium — Dragon 64 cassette output uses different resistor references (i=181).** The drawing shows **R14, 68 kΩ**, and **R40, 33 kΩ**, not R29/R16. [CD41505, sheet 1](https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D641-io-pal.gif).

5. **Medium — Coleco RF-clock DC offset misread (i=79).** The ground marker and 2 V/div scale indicate approximately **+9.5 to +11.5 V**, not +8.6 to +10.6 V. [Technical Manual, PDF p.60, VII-5](https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf#page=60).

6. **Medium — Coleco Y-video DC levels misread (i=81).** The illustrated capture indicates approximately **2.1 V sync tip, 2.6 V blanking, and 3.9 V peaks**, rather than 1.6/2.1/3.3 V. These are approximate plot readings. [Technical Manual, PDF p.71, VII-16](https://cvaddict.com/manuals/Colecovision_Technical_Manual.pdf#page=71).

**Dead or wrong source links:** No dead links remained after retrieval recovery. **i=198 cites a [Dragon 64 schematic](https://dragondata.worldofdragon.org/tech/circuit-diag/D64/D642-cpu-pal.gif) for a Dragon 32 clock claim**; it does not establish that model’s frequency.

Mapping: all findings concern **prove-it-works**; the swapped labels, unit error, and copied model/version details also concern **fix-root-causes**. No shared-state mutation finding applies.