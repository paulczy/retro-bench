| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 144 | 117 | 6 | 21 |
| connector-pin | 193 | 161 | 4 | 28 |
| clock-row | 1 | 0 | 0 | 1 |
| **Total** | **338** | **278** | **10** | **50** |

[Full per-item ledger](P:/.tmp/review/.factcheck-tmp/full/batch-04-ledger.md)

WRONG findings, ordered by severity. All map to **prove-it-works** and **fix-root-causes**.

1. **High — i75, C128 video pin 8:** “NC” conflicts with schematic 310378 Rev. 6, which connects pin 8 to **+5 V through FB13**. Qualify by board revision. The PRG table itself is misleading. Service manual printed p.68, PDF p.74.

2. **High — i0–1, 7501 pins 1–2:** Names are swapped. **Pin 1 is Φ0 IN; pin 2 is RDY.** Their descriptions already correspond to those correct functions. MOS datasheet p.1; TED manual p.14.

3. **Medium — i15, 7501 GATE:** The cited manual specifies `/RAS` transitioning **LOW to HIGH**, not falling. TED manual pp.14,16.

4. **Medium — i57, 8520 reset:** Reset does not clear everything to zero. **Timer latches become all ones**; ports become inputs. 8520 specification sheet 5; 1581 manual p.7.

5. **Medium — i111, i113, i125, C128 expansion:** C64-mode descriptions were applied without qualification. `/GAME` has a different C128-mode role; external function ROM supports **$8000–$BFFF and $C000–$FFFF**, subject to MMU selection and I/O overlay. C128 PRG pp.461,585; service manual pp.29,52.

6. **Medium — i175, VIC-II BA:** BA falls three cycles before the relevant **VIC bus access**, not before the bad-line raster line begins. Sprite DMA also asserts BA. Bauer, sections 2.3 and 3.5.

7. **Medium — i215, SID EXT IN:** It is connected on a stock C64: **audio/video connector pin 5 feeds SID pin 26**. Remove “Unused on a stock C64.” C64/C64C service manual p.10.

Source-link problems:

- Wayback copies of [Plus/4 notes](https://web.archive.org/web/20260226020821/https://portcommodore.com/rcarlsen/cbm/plus4/plus4.txt), [8580-to-6581 notes](https://web.archive.org/web/20250414092701/https://portcommodore.com/rcarlsen/cbm/c64/8580%20to%206581.txt), [SID replacements](https://web.archive.org/web/20211202105311/https://portcommodore.com/rcarlsen/cbm/SID%20%26%20mods/SID%20replacements.txt), and [C128 chip symptoms](https://web.archive.org/web/20260823132230/https://portcommodore.com/rcarlsen/cbm/c128/c128-ic.txt) were **blocked by HTTP 429**, not proven dead.
- C128 service-manual citations mislabel PDF p.57 as printed p.55; it is p.54. PDF p.55 is printed p.52.
- C64 PRG pp.360 and 397 disagree on the user-port AC limit: **50 versus 100 mA**. Items 265–266 remain unverifiable.

No application files changed. No live-board measurements performed.