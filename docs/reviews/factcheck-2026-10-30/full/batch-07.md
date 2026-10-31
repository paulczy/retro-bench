| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 286 | 228 | 4 | 54 |
| chip-pin | 84 | 75 | 1 | 8 |
| clock-row | 21 | 12 | 3 | 6 |
| rail | 8 | 4 | 0 | 4 |
| first-ten | 10 | 7 | 0 | 3 |
| replacement-modern | 1 | 0 | 0 | 1 |
| scope | 1 | 0 | 0 | 1 |
| **Total** | **411** | **326** | **8** | **77** |

[Complete per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-07-ledger.md). Unverifiable includes supported pin assignments with unsupported additional claims.

1. **High — i=0, 2: transformer voltage labels conflict with their windings.** Pin 2 should read **9 V AC**; pin 4 should read **16 V AC**. Their descriptions and expectations already identify the correct winding pairs. [1541 manual, PDF p. 8](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf#page=8)

2. **High — i=69: 251828 pin 24 direction is wrong.** ATN is an **output** driving serial-data gating. The manual’s function-table wording conflicts with its block diagram and schematic. [1571 manual, printed p. 7](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1571/1571_Service_Manual_Preliminary_314002-04_(1986_Oct).pdf#page=10)

3. **High — i=99: wrong oscillator probe for the 1541-II.** Its 42-pin 251828 uses **OSC pin 23**, rather than pin 21. The 1541-II also has no 251829. Split the board/package variants. [1541-II schematic, p. 43](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf#page=7)

4. **High — i=100: wrong CPU-clock output pin for the 1541-II.** Its gate-array CK output is **pin 39**. Pin 37 is a write-data output. [1541-II schematic, p. 43](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1541-II_Service_Manual_Addendum_314862-01_(1988_Mar).pdf#page=7)

5. **High — i=123: nonexistent serial VIA input.** The 1581 ATN interrupt path uses **U5 8520 CIA /FLAG, pin 24**, rather than VIA CA1. [1581 schematic, printed p. 17](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1581/1581_Service_Manual_314982-01_(1987_Jun).pdf#page=20)

6. **Medium — i=185: wrong RTC crystal reference.** The 32.768 kHz crystal is **X1**. X3 is the PAL crystal. [Master manual, p. 40](https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=40)

7. **Medium — i=260: wrong printer-strobe circuitry.** The path uses **IC2 7438 gates**, without the claimed transistor stage. The cited source also does not establish the approximately 5 µs width. [Master manual, p. 46](https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=46)

These findings map to **prove-it-works** and **fix-root-causes**. Shared-state serialization does not apply.

**Source-link issues:** Direct Carlsen [1541](https://portcommodore.com/rcarlsen/cbm/1541/fix1541.txt) and [1581](https://portcommodore.com/rcarlsen/cbm/1581/1581.txt) notes returned HTTP 406; cited archive copies were recovered. No source was established permanently dead. Incorrect Master page locators and archive-wrapper issues are recorded in the ledger.

Only `.factcheck-tmp/` was modified.