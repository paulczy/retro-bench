| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 79 | 74 | 2 | 3 |

1. **High — `cia6526`, pin 20:** changed from VCC/+5 V to ground/0 V. The cited [C64 PRG, printed p. 420, PDF p. 439](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf#page=439) shows **20 = VCC**, **1 = VSS**. The old supply identity was correct. **Blocks commit.**

2. **High — `cpu6502`, pin 8:** changed from VCC/+5 V to ground/0 V. The [MOS datasheet, p. 10](http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf#page=10) shows **8 = VCC**, **1/21 = VSS**. The old value was correct. **Blocks commit.**

3. **Medium — Apple voltage cleanup is incomplete:** related Disk II, DuoDisk and UniDisk power records retain `11.3–12.5 V` after connector values were corrected. For IIc disk pins **7/8**, that contradicts the documented **10.8–13.2 V** range. [IIc TRM, p. 234, Table 11-4](https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n261).

4. **Medium — C16 regulator cutoff remains unproven:** the new “below about 7 V” failure boundary exceeds what the cited test conditions and typical dropout establish. The citation also targets p. 6; the 7805 table is on [p. 5](https://www.ti.com/lit/ds/symlink/ua78.pdf#page=5).

5. **Medium — mirror repairs remain unproven:** rows 34 and 72 include Carlsen/F18A archive copies whose actual content could not be retrieved. An archive wrapper or availability result does not prove the document is readable.

[Complete 79-item ledger, including old-value assessments and evidence](P:/retro-bench/.tmp/review-fix/.factcheck-tmp/fixreview/skeptic-a-ledger.md).

No data files edited or committed. Documentary review only; no hardware tests.