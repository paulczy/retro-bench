| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 226 | 217 | 4 | 5 |
| replacement-modern | 1 | 0 | 0 | 1 |
| **Total** | **227** | **217** | **4** | **6** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-03-ledger.md) — all 227 indices verified present.

1. **High — item 1, rom2332 pin 1:** Label must be **A7**, not A6. The description already correctly says address bit 7. [2332 datasheet, p.1](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2332.zip)
2. **High — item 2, rom2332 pin 2:** Label must be **A6**, not A7. The description already correctly says address bit 6. These swapped labels direct technicians to the wrong address pins. [2332 datasheet, p.1](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/2332.zip)
3. **Medium — item 87, pia6520 pin 18:** CB1 is **input-only**, not bidirectional. Change `dir` to `in`. The CA1/CB1 control table provides input-edge selection; output modes belong to CA2/CB2. [6520 datasheet, pp.2–3](http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/6520.zip)
4. **Medium — item 42, cpu6510 pin 2:** The probe expectation “HIGH” omits normal LOW periods during VIC bus accesses. Use **normally HIGH, with LOW periods during VIC bus steals**. [C64 Programmer’s Reference Guide, p.449 / PDF 468](http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf#page=468)

These findings map to **prove-it-works** and **fix-root-causes**. **serialize-shared-state-mutations** does not apply to this read-only review.

The six unverifiable items contain unsupported portions: comparative pricing (0), 2764 adapter advice (37), unconditional R/W activity (70), and host-board startup reset expectations (102, 135, 140). Exact reasons are in the ledger.

**Unavailable or incorrect citations:**

- Both Ray Carlsen Wayback links were **inaccessible**, not proven dead: [chip symptoms](https://web.archive.org/web/20250821030246/https://portcommodore.com/rcarlsen/cbm/c64/c64c-ic.txt), [CPU/VIC substitutions](https://web.archive.org/web/20260823132238/https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt). Direct originals returned HTTP 406.
- The VIC-20 pin-configuration citation is one page early: correct location is **printed p.213 / PDF page 229**, affecting all 33 VIC items. [Correct page](http://www.zimmers.net/anonftp/pub/cbm/manuals/vic20/VIC-20_Programmers_Reference_Guide_1st_Edition_6th_Printing.pdf#page=229)

Application data was unchanged. This verifies documentary support; no physical hardware testing was performed.