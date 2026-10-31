| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 212 | 204 | 5 | 3 |
| clock-row | 13 | 0 | 0 | 13 |
| scope | 7 | 0 | 0 | 7 |
| replacement-modern | 1 | 0 | 0 | 1 |
| **Total** | **233** | **204** | **5** | **24** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-01-ledger.md). Verified all 233 item IDs appear exactly once. Only `.factcheck-tmp/` was modified.

1. **High — i0, i1: 6502 pin names swapped.** Pin **2 is RDY**; pin **3 is Φ1 OUT**. The labels could send a technician to the wrong pin. W65C02S RDY is also bidirectional, contradicting i0’s input-only direction. Sources: [MOS p.10](https://6502.org/documents/datasheets/mos/mos_6500_mpu_nov_1985.pdf#page=10), [WDC pp.10,13](https://www.westerndesigncenter.com/wdc/documentation/w65c02s.pdf#page=13).

2. **High — i137: wrong Disk II address connection.** P5 **pin 17 connects to AD7, slot pin 9**, rather than AD5, slot pin 7. AD5 connects to P5 pin 19. Source: [Apple schematic 050-0005-01, PDF p.2, D3](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Interface%20Cards/Disk%20Drive%20Controllers/Apple%20Disk%20II%20Interface%20Card/Schematics/Apple%20Disk%20II%20-%20Schematics%20050-0005-01.pdf#page=2).

3. **Medium — i79: incorrect keyboard delay-node description.** Pin 31 is an **input**. External capacitor C2 sets the delay using **internally supplied resistor R2**; the record describes an external RC pair and gives no input direction. Source: [GI AY-5-3600 p.3-23, PDF p.1](https://www.bitsavers.org/components/gi/_dataSheets/AY-5-3600.pdf#page=1).

4. **Medium — i162: incomplete 4116 output-state rule.** DOUT also drives during **delayed-write and read-modify-write cycles**, remaining valid until CAS goes high. “High impedance otherwise” is incorrect; early-write cycles keep the output disabled. Source: [Mostek p.V-40, PDF p.105](https://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf#page=105).

These findings map to **prove-it-works** and **fix-root-causes**. Shared-state mutation ordering does not apply to this audit.

**Dead, blocked, or incorrect source references:**

- The [BBC schematic Wayback link](https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf) returned **429**; its origin returned **401**. A [primary Acorn drawing mirror](https://www.4corn.co.uk/archive/diagrams/103%2C000-C%20Circuit%20Diagram%20for%20BBC%20Microcomputer.jpg) was recovered and inspected.
- The MC6801 reference-manual citation mislabels PDF p.46 as printed p.3-2; it is **p.3-1**.
- All 13 clock rows and seven scope records contain particulars their citations do not establish. The ledger identifies each unsupported frequency, connection, timing value, or duty ratio, plus the four other unverifiable records.