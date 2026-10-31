| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 157 | 116 | 6 | 35 |
| first-ten | 21 | 10 | 2 | 9 |
| clock-row | 33 | 23 | 1 | 9 |
| scope | 12 | 8 | 0 | 4 |
| rail | 3 | 0 | 0 | 3 |
| **Total** | **226** | **157** | **9** | **60** |

[Complete per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-18-ledger.md). All items received a decision; no data files were modified.

1. **High — i29, Atari 800 CPU check includes ground.** Pin 21 cannot pulse. Correct address ranges are **9–20 and 22–25**; data pins are **26–33**. Sams explicitly excludes pin 21. [Source: p.11](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel800computer1984sams/page/n17). *prove-it-works*

2. **Medium — i95, Electron clocks conflated.** Expansion pin 12 is **16 MHz**; pin 13 is **16/13 MHz ≈ 1.230769 MHz**. [Source: p.228](https://archive.org/download/acorn-electron-advanced-user-guide/Electron%20Advanced%20User%20Guide.pdf#page=229). *prove-it-works*

3. **Medium — i0–1, Atari SIO clock names reverse the computer’s directions.** Atari specifies **pin 1 Clock Input; pin 2 Clock Output**. The descriptions give those correct directions, but the names reverse them. Sams uses conflicting labels; reconcile the convention explicitly. [Source: Fig.1-9](https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984/page/n19). *prove-it-works, fix-root-causes*

4. **Medium — i67, Disk II shutdown condition omitted.** The one-second delay follows an explicit **DRIVES OFF** access, not merely the last arbitrary access. Software can leave the drive enabled; RESET stops it almost immediately. [Source: p.9-13](https://archive.org/details/understanding_the_apple_ii/page/n242). *prove-it-works*

5. **Medium — i190–191, EI cassette relay misidentified.** **K1 selects cassette output 0/1**, controlled through `$37E4`; it is not the motor-on relay. Its state does not establish motor state. CR9/CR10 are also absent from the cited EI circuit. [Source: pp.4,19](https://archive.org/download/Expansion_Interface_Service_Manual_19xx_Radio_Shack/Expansion_Interface_Service_Manual_19xx_Radio_Shack.pdf#page=4). *prove-it-works, fix-root-causes*

6. **Medium — i194, wrong rectifier designator.** The EI power bridge is **CR4**, not CR8. [Source: pp.7,18](https://archive.org/download/Expansion_Interface_Service_Manual_19xx_Radio_Shack/Expansion_Interface_Service_Manual_19xx_Radio_Shack.pdf#page=18). *prove-it-works, fix-root-causes*

7. **Low — i140, incorrect schematic annotation.** J4 pin 9 is correctly assigned D3, but the cited scan labels it **DATA 4**, not “8.” [Source: p.19](https://archive.org/download/Expansion_Interface_Service_Manual_19xx_Radio_Shack/Expansion_Interface_Service_Manual_19xx_Radio_Shack.pdf#page=19). *prove-it-works*

No dead links were found. Citation coverage problems are documented individually in the ledger, including TS1500 internal rails cited to a user manual, ADAM reset-pin claims cited to a consumer troubleshooting guide, and DuoDisk/UniDisk connector claims cited to Disk II material.