| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 201 | 182 | 12 | 7 |
| clock-row | 5 | 3 | 1 | 1 |
| connector-pin | 53 | 53 | 0 | 0 |
| rail | 7 | 4 | 0 | 3 |
| first-ten | 2 | 2 | 0 | 0 |
| **Total** | **268** | **244** | **13** | **11** |

[Per-item ledger, including evidence and unverifiable reasons](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-21-ledger.md). All 268 items received a decision.

The following page numbers refer to the [C128 Service Manual](https://archive.org/download/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08.pdf), except finding 10.

1. **High — i=0,1: 4164 pin names swapped.** Pin **1 is NC**; pin **2 is DIN**. The current names contradict both the pinout and their own descriptions. **Page 18, PDF 20.**

2. **High — i=95: VIC-IIe pin 15 direction reversed.** `/DMAACK` is an **output**, not an input. The VIC generates the acknowledgement. **Pages 34–35, PDF 36–37.**

3. **High — i=133: MMU pin 17 direction reversed.** MUX is an **input**, driven by VIC pin 21. Treating it as an output misidentifies the signal source. **Pages 27, 35, 67; PDF 29, 37, 72.**

4. **Medium — i=112–114: VIC address destinations wrong.** Pins **40–42, A8–A10**, are static addresses for nonmultiplexed character-ROM/color-RAM accesses. Their descriptions incorrectly identify the DRAM address path. **Page 35, PDF 37.**

5. **Medium — i=148: MMU clock source wrong.** PHI0 at **pin 33** comes from the VIC/system clock path. The CPU receives that clock; it does not generate it. **Pages 7, 27, 35, 67.**

6. **Medium — i=172: PLA pin 13 function misleading.** Although labelled “Z80 EN,” this input receives **Z80 BUSACK**, indicating that the Z80 relinquishes the bus. The MMU has the separate Z80-enable output. **Pages 29, 67.**

7. **Medium — i=185: SDEN expansion wrong.** PLA **pin 29** enables the buffer between the data bus and **S DATA** bus. It is not sprite enable. **Page 29, PDF 31.**

8. **Medium — i=193: IOCS selects the wrong listed device.** PLA **pin 38** enables decoding for CIA, SID, VDC and expansion I/O. The **VIC has its separate select at pin 42**. **Page 29, PDF 31.**

9. **Medium — i=198: GWE function overstated.** PLA **pin 44** is the **active-low color-RAM write enable**, not a global write enable. DRAM writes use DWE at pin 40. **Page 29, PDF 31.**

10. **Low — i=212: Horizontal frequency differs from its citation.** Figure 18 gives **15.835 kHz at Z50 pin 11**, not 15.836 kHz. This small difference is within ordinary clock variation. **[TRS-80 handbook](https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf#page=70), page 69, PDF 70.**

Findings map to **prove-it-works**; the signal-definition errors also map to **fix-root-causes**. No shared-state mutation finding applies.

Source links: no dead or wrong targets established. The cited [Carlsen Wayback copy](https://web.archive.org/web/20260823132238/https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt) was **blocked: HTTP 429**; its live counterpart returned **406**. Searches found no accessible replacement.

No live data was modified.