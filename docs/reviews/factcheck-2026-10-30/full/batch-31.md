| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| first-ten | 11 | 4 | 0 | 7 |
| chip-pin | 199 | 190 | 7 | 2 |
| clock-row | 15 | 8 | 0 | 7 |
| connector-pin | 103 | 102 | 1 | 0 |
| rail | 4 | 3 | 0 | 1 |
| **Total** | **332** | **307** | **8** | **17** |

1. **High — i=5,6: VDP pin names swapped.** Pin **1 is `/RAS`**; pin **3 is `AD7`**, connected to DRAM A0. Their descriptions already match those corrected names. [VDP manual, printed pp. 3-9–3-10](https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf#page=52).

2. **High — i=219–222: nonexistent console connections.** TMS9901 IC0–IC3 outputs, pins **15–12**, are unconnected on the TI console. The CPU’s interrupt-code inputs are fixed to level 1; only the interrupt request connects from the 9901. [TI Technical Data, schematic sheets 60–61](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf#page=62).

3. **High — i=320: biased reference classified as ground.** Cartridge pin **33, GROM VSS**, sits below system ground; Sams measures approximately **−0.74 V**. Classify it as a biased reference, separate from ground pins **2, 35, 36**. [TI schematic sheet 62](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf#page=64).

4. **Medium — i=105: GROM bus-driving exception omitted.** Page matching restricts **READ DATA**. During **READ ADDRESS**, all synchronized GROMs output the address byte. [Servicing Manual, printed p. 48](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI994A_HC_Servicing_Manual_Oct_1983.pdf#page=57).

All findings map to **prove-it-works**; repeated pin and wiring errors also map to **fix-root-causes**.

**Dead or wrong source links:** None were dead. Inadequate source scope accounts for several unverifiable items: Dragon 32 sheets cited for Dragon 64 circuitry, generic VDP documentation cited for board wiring or unused outputs, and missing SN94624 timing evidence. Exact gaps appear in the ledger.

[Complete 332-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-31-ledger.md).