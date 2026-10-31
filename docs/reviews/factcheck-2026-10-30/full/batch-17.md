| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| first-ten | 90 | 54 | 6 | 30 |
| clock-row | 23 | 16 | 0 | 7 |
| scope | 63 | 22 | 2 | 39 |
| replacement-claim | 1 | 0 | 0 | 1 |
| connector-pin | 57 | 45 | 4 | 8 |
| **Total** | **234** | **137** | **12** | **85** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-17-ledger.md). Unverifiable items identify specific claims absent from their cited sources. Application files were not changed.

1. **High — i1, Apple IIe card removal:** The instructions omit powering off before removal and each reinsertion. Sams explicitly requires that sequence. Add OFF → remove/refit → ON → test. [PDF p. 9](https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n8)  
   Principle: **serialize-shared-state-mutations**.

2. **High — i150, i159, Atari CPU activity:** “Address pins 9 to 25” incorrectly includes **ground pin 21**. Correct to **9–20 and 22–25**. [Atari 400 PDF p. 17](https://archive.org/details/SamsComputerfactsAtari400B/page/n16), [130XE PDF p. 12](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n11)  
   Principle: **prove-it-works**.

3. **High — i173, i174, i181, i182, Atari controllers:** First-port labels are reversed: **pin 1 = FWD**, **pin 2 = BACK**. Both ports also incorrectly describe pins 1/2 as paddle-trigger contacts; paddle triggers use **pins 3/4**. [Sams PDF p. 4](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams/page/n3), [Technical Reference III.24, PDF p. 477](http://www.bitsavers.org/pdf/atari/400_800/CO16555_Atari_Home_Computer_Technical_Reference_Notes_1982.pdf#page=477)  
   Principle: **prove-it-works**.

4. **High — i41, 1581 power switch:** Sams identifies the power switch as **SW1**, not SW2. [Schematic, PDF p. 12](https://archive.org/details/SAMS_Computerfacts_CD22_1581/page/n11)  
   Principle: **prove-it-works**.

5. **High — i121, i122, IBM MDA:** The parenthetical Sams probe references are reversed: its drawing labels **horizontal J3-9**, **vertical J3-8**. Correct those references; external DE-9 numbering requires separate support. [PDF p. 87](https://archive.org/details/Sams_IBM_5150/page/n86)  
   Principle: **prove-it-works**.

6. **Medium — i2, Apple IIe beep diagnosis:** “No beep: the CPU is not running” is false as a definitive diagnosis. Sams separately covers a functioning computer with no sound: inspect **J18, speaker, then IOU**. [PDF p. 9](https://archive.org/details/Sams_Computer_Facts_Apple_IIe/page/n8)  
   Principle: **fix-root-causes**.

7. **Medium — i126, C64 unloaded brick:** An open motherboard **F1 cannot explain missing AC measured at the disconnected brick**. Sams directs supply replacement for absent/incorrect unloaded output. Move F1 into an on-board AC-loss check. [PDF p. 4](https://archive.org/details/sams-computerfacts-cc17-c64-1984-version/page/n3)  
   Principle: **fix-root-causes**.

**Dead or wrong source links**

- No dead documents found.
- **Low — i94–98:** Model 4 links point to parts-list PDF p. 44; troubleshooting is [PDF p. 45](https://archive.org/details/Sams_Computerfacts_for_Model_4_Gate_Array_1986_Sams/page/n44).
- **Low — i99:** Clock/divider troubleshooting is [PDF p. 46](https://archive.org/details/Sams_Computerfacts_for_Model_4_Gate_Array_1986_Sams/page/n45), not p. 45.
- **Low — i5–6:** Apple IIe waveform captures are on PDF pp. 21–22, rather than the linked service-check page 9.