| Item kind | Checked / listed | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| Supply | 59 / 59 | 55 | 2 | 2 |
| Power-connector pin | 402 / 402 | 336 | 6 | 60 |
| Chip supply/ground pin | 313 / 313 | 313 | 0 | 0 |
| **Total** | **774 / 774** | **704** | **8** | **62** |

Every listed item received a decision. **UNVERIFIABLE means unsupported by the checked source, not necessarily electrically incorrect.** The [full report](P:/retro-bench/.tmp/review/.factcheck-tmp/skeptic-codex-87c9b5a/REPORT.md) and [774-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/skeptic-codex-87c9b5a/item-ledger.md) contain the detailed evidence. Application data was unchanged.

1. **High — WRONG: PET supply identifies the wrong connector for raw DC rails.**  
   The `pet` supply places +9 V, +16 V and −9 V feeds on **J8**. The cited drawing instead shows **+16/−9 V on J10**, and +9 V on J11 and J8 pin 2. J8 pins 8/9 feed rectifier **AC** inputs. This can direct a technician to the wrong connector and voltage type. [Commodore 320349, sheet 9](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-9.gif).  
   *Map: fix-root-causes.*

2. **High — UNVERIFIABLE: PCjr’s “17 VAC to pin 2” and center-tap claim are not established.**  
   The `pcjr` supply and `jr-power` pins **1/2/3** turn connector labels into a claim of two 17 VAC halves. The [Technical Reference, printed 2-138 / PDF 164](https://bitsavers.org/pdf/ibm/pc/pc_jr/PCjr_Technical_Reference_Nov83.pdf#page=164) does not establish that reference point. IBM’s maintenance procedure instead specifies **15–30 VAC between pins 1 and 3**, with the transformer disconnected from the machine. A 17+17 V replacement is therefore unsupported. [Maintenance manual, printed 3-020-8 / PDF 62](https://www.minuszerodegrees.net/manuals/IBM/IBM%204860%20%28PCjr%29%20-%20Hardware%20Maintenance%20and%20Service%20-%20SEP83.pdf#page=62).  
   *Map: prove-it-works.*

3. **High — UNVERIFIABLE: TI-99/4A winding voltages are not mapped to numbered contacts.**  
   `ti994a-power` pins **1/2/4** assert 18 VAC across 1–2 and 8.5 VAC across 2–4. Figure E supplies physical numbering; Figure G supplies wire colors and windings. Neither establishes the correspondence needed to prove those assignments. The other checked citations do not close that gap. [TI Technical Data, printed 18 and 20 / PDF 20–22](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf#page=20).  
   *Map: prove-it-works.*

4. **Medium — WRONG: HERO 1 charging expectations omit the load state.**  
   This affects the supply and `hero1-charger` pins **3/5/8/9**—five wrong items. The charger can fall to **about 14 V with heavily discharged batteries**, rising toward 27 V near full charge. **13.9 V is the float level**, not an unconditional reading whenever charging is on. The app’s fixed expectations can falsely condemn working hardware. [ET-18 Technical Manual, printed 72–73 / PDF 84–85](https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=85).  
   *Map: fix-root-causes.*

5. **Medium — UNVERIFIABLE: 49 items add measurement limits without a matching specification.**  
   Examples include `c64-power` pin **5** and `c128-power` pin **1**, both claiming **4.95–5.10 V**, and IBM 5150 `pc-psu` **P8-1**, adding a **500 ms upper delay** where the original paragraph specifies 100 ms after minimum sense levels are reached. Other affected records cover Apple drive connectors, Atari 400/800, BBC supplies, IBM 5155, CPC inputs and MSX cartridge rails. The full report lists every affected pin and checked page. [C64 service manual, PDF 8](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/servicemanuals/C64-C64C_Service_Manual_314001-03_(1992_Mar).pdf#page=8).  
   *Map: prove-it-works.*

6. **Medium — UNVERIFIABLE: two barrel-contact polarity records lack model-specific proof.**  
   `spectrum128-power` pins **1/2** extrapolate from a 48K reference; the cited 128K pages establish voltage and socket size, not center/sleeve polarity. `cpc464-5v` pins **1/2** assign physical contacts from a schematic that labels only +5 V/0 V. These gaps do **not** prove reversed polarity. [Spectrum 128 manual, PDF 25/39](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B%20128K/Repair/ZX%20Spectrum%2B%20128K%20Service%20Manual.pdf#page=25).  
   *Map: prove-it-works.*

7. **Low — WRONG: MSX’s 256K-ROM note belongs to pin 3, not pin 5.**  
   `msx1-cart` and `msx2-cart` pin **5** misattribute the note. The book assigns it to **pin 3, /CS12**; pin 5 remains reserved. [MSX Technical Data Book, printed 32–33 / PDF 35–36](https://archive.org/details/MSXTechnicalDataBook/page/n35).  
   *Map: fix-root-causes.*

8. **Low — UNVERIFIABLE: TS2068 adds an unsupported “unloaded” condition.**  
   The supply and `ts2068-power` pin **2** say about 21 V unloaded. SUM reports about 21 V output while discussing operating heat, without identifying a no-load measurement. The nominal/input ratings are supported; this measurement condition is not. [SUM v4 n1, printed 5 / PDF 5](https://archive.org/download/SinclairTimexUsersMagazine/SUM%20v4%20n1.pdf#page=5).  
   *Map: prove-it-works.*

The source links also need these corrections:

- **1541 specifications:** the cited PDF page 5 is a block diagram; use **PDF page 4**.
- **SUM v4 n1:** `/page/n5` opens printed page 6. The power-supply article is **printed 5**, archive index **n4**.
- **Model I Handbook:** the cited PDF returned HTTP 500; its `_text.pdf` version was readable and used.
- **Archived Oric circuit:** returned HTTP 429 during this run; the original circuit reproduced in *Oric Owner* 5, PDF pages 44–45, supplied the fallback evidence.