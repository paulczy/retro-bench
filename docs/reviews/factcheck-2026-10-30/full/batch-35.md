| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 43 | 43 | 0 | 0 |
| clock-row | 19 | 11 | 0 | 8 |
| connector-pin | 241 | 214 | 3 | 24 |
| first-ten | 50 | 13 | 1 | 36 |
| rail | 10 | 6 | 0 | 4 |
| replacement-modern | 4 | 1 | 0 | 3 |
| **Total** | **367** | **288** | **4** | **75** |

Complete [per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-35-ledger.md), including the exact evidence gaps.

1. **High — i=200, BBC analogue pin 10:** Labelled **PB1**, but connects to system VIA **PB5, IC3 pin 15**, as I1. PB1 instead feeds the keyboard latch. Acorn 103,000/C, sheet 1. *prove-it-works; fix-root-causes.* [Recovered original schematic](https://ftpmirror2.infania.net/sites/BBCdocs.com/BBCBMicrocomputer.zip)

2. **High — i=0, DuoDisk DB-25 pin 1:** Name **GND** is wrong; correct value is **NC**. Apple explicitly lists pin 1 as unconnected, PDF p. 2. *prove-it-works.* [Apple cable specification](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20DuoDisk%205.25/Documentation/Apple%20DuoDisk%20-%20Cable%20Specifications.pdf)

3. **High — i=1, DuoDisk DB-25 pin 2:** Name **NC** is wrong; correct value is **GND**, connected to DB-19 pin 1, PDF p. 1. *prove-it-works.* [Apple cable specification](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20DuoDisk%205.25/Documentation/Apple%20DuoDisk%20-%20Cable%20Specifications.pdf)

4. **Medium — i=127, cold VIC diagnosis:** A cold VIC may itself be defective. Carlsen directs checking missing power or ground when a **replacement also stays cold**; the record omits that condition. Unpaginated, cold-chip diagnostic paragraph. *fix-root-causes.* [Carlsen’s VIC-20 diagnostics](https://portcommodore.com/rcarlsen/cbm/vic20/vic20.txt)

Source-link issues:

- Archived BBC and Oric schematics returned **429**; BBC origin served HTML, Oric origin returned **403**. Alternative copies were checked.
- Carlsen PET FAQ and SID-replacement links remained inaccessible. A matching PET FAQ mirror was found; the SID source was not recovered.
- DuoDisk troubleshooting citation says **p. 4.2**, but its `#page=21` target is printed **p. 4.3**.

No application data was modified.