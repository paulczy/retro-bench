| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 182 | 175 | 3 | 4 |
| connector-pin | 89 | 60 | 16 | 13 |
| scope | 11 | 0 | 0 | 11 |
| clock-row | 3 | 1 | 0 | 2 |
| **Total** | **285** | **236** | **19** | **30** |

All 285 items have individual decisions in the [ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-02-ledger.md).

1. **High — incorrect Atari paddle-trigger assignments (16 items).** Controller pins **1 and 2** are described as paddle-trigger lines. The cited pinout assigns paddle triggers to **pin 3 (A)** and **pin 4 (B)**. Pin 2 also has no listed touch-tablet function. Affects both machines, all four ports: **206–207, 213–214, 221–222, 228–229, 249–250, 256–257, 264–265, 272–273**. Replace the repeated description with each pin’s actual functions. Evidence: technical reference p. III.24 and [cited FAQ, controller-port tables](https://www.atarimania.com/faq-atari-400-800-xl-xe-what-are-the-pinouts-for-the-various-connectors-on-the-atari_16.html). Maps to **prove-it-works; fix-root-causes**.

2. **Medium — µPD7002 pin 1 has the wrong direction (item 51).** NEC identifies **X0 as an external clock input**, whereas the record calls it an oscillator output. Correct `dir` to `in` and the description accordingly. Evidence: [NEC catalog, printed p. 483, PDF p. 485](http://www.bitsavers.org/components/nec/_dataBooks/1982_NEC_Microcomputer_Catalog.pdf#page=485). Maps to **prove-it-works**.

3. **Low — guard-pin names contain an OCR error (items 54, 56).** Pins **5 and 7** are named **GD**, not **GO**. Their numbers and guard functions are correct. Evidence: the rendered NEC pin diagram and table, p. 483. Maps to **prove-it-works**.

Source-link problems:

- The [archived BBC schematic](https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf) returned **HTTP 429**; its live URL returned **401**. Blocked, not proven dead.
- The [Master analogue-port citation](https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=40) should point to **page 41**, not 40.
- Atari clock citation **PDF page 441** is printed **II.20**, not II.22. It does not establish the claimed exact PAL/NTSC frequencies.
- All **11 scope items** lack cited machine-specific frequency/wiring evidence. Eight voltage claims mention a **Sams 130XE 4.9 V measurement without citing that document**. Remaining evidence gaps are detailed individually in the ledger.

Only `.factcheck-tmp/` was modified.