| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 227 | 161 | 5 | 61 |
| chip-pin | 32 | 28 | 1 | 3 |
| clock-row | 1 | 1 | 0 | 0 |
| **Total** | **260** | **190** | **6** | **64** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-12-ledger.md). The unverifiable count includes 54 auxiliary-slot records whose physical numbering geometry is not established by their cited table.

1. **High — Items 0–1: Apple IIe slot names swapped.** Pin **1 is /I/O SELECT**; pin **2 is A0**. Both descriptions already match the correct signals. This error exists in the supplied batch; repository code already assigns these correctly. [TRM p.195](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n228). **Principle:** prove-it-works.

2. **High — Item 127: RESET incorrectly listed as an XL/XE NMI cause.** The RESET key operates the reset circuit and CPU **/RES pin 40**, rather than **/NMI pin 6**. Sams explicitly describes testing that reset response on printed p.9; schematics show the separate nets. [Sams CC16](https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams). **Principle:** prove-it-works.

3. **High — Items 174–175: Wrong paddle-trigger pins.** Controller pins **1 and 2 are not paddle triggers**. Paddle triggers use **pins 3 and 4**. Pin 2 also lacks the claimed tablet-button function. Correct the shared direction-description helper. [Controller pinout](https://www.atarimania.com/machines/atari-400-800-xl-xe/faq/16); Technical Reference Notes p.III.24. **Principle:** fix-root-causes.

4. **Medium — Item 28: Incomplete Apple IIe /INH behavior.** It disables **RAM and ROM**, except I/O space **$C000–$CFFF**. Assert during phase 1 and hold stable throughout phase 0. The shared slot helper carries over the older Apple II ROM-only description. [TRM p.192](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n225). **Principle:** fix-root-causes.

**Dead or wrong source links:** None dead. The [600XL CPU citation](https://archive.org/details/Atari600XLComputerFieldServiceManualRev1/page/n14) reaches printed **p.1-5**, although its label says **p.1-6**. Atarimania and Bitsavers links redirect successfully.

Only `.factcheck-tmp/` was written.