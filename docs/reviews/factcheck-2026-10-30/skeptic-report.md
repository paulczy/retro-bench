| Item kind | Checked / listed | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| supply | 59 / 59 | 55 | 2 | 2 |
| power-connector-pin | 402 / 402 | 336 | 6 | 60 |
| chip-supply-pin | 313 / 313 | 313 | 0 | 0 |
| **Total** | **774 / 774** | **704** | **8** | **62** |


All 774 listed items received a decision. The scope is skeptic.json at the supplied copy of commit 87c9b5a, not every electrical statement elsewhere in the app. CONFIRMED concerns the supplied item. UNVERIFIABLE means a remaining claim lacks support in the source checked; it does not mean the pin is electrically wrong. The [full item ledger](item-ledger.md) contains each JSON index, record, claim, decision, source and result. No application data was changed.

1. **HIGH - WRONG: PET supply names the wrong connector for raw DC rails.**
   Record `pet` supply (JSON 19) places +9 V, +16 V and -9 V unregulated feeds on J8. [Commodore320349 sheet 9](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/pet/2001N/320349-9.gif) shows the +16 V/-9 V raw-DC connections on J10, and +9 V on J11 (also J8 pin 2). J8 pins 1/5 and 8/9 feed rectifier AC inputs. Correct the connector and AC/DC identification: a technician following the present description can select a transformer-input contact as a supposed raw-DC point. The source specifically labels J10 pins 4/5 +16 V and 1/2 -9 V; J11 pins 1/4/6 +9 V. **Map: fix-root-causes.**

2. **HIGH - UNVERIFIABLE: PCjr invents a voltage reference and transformer topology.**
   Records `pcjr` supply and `jr-power` pins 1/2/3 (JSON 305-308) specify 17 VAC from either outside leg to pin 2 and call 2 the transformer center. [PCjr Technical Reference, printed 2-138 / PDF 164](https://bitsavers.org/pdf/ibm/pc/pc_jr/PCjr_Technical_Reference_Nov83.pdf#page=164) labels 1/3 as 17Vac and 2 GND, without establishing17 V-to 2 or a center-tapped winding. [IBM PCjr Hardware Maintenance and Service, printed 3-020-8 / PDF 62](https://www.minuszerodegrees.net/manuals/IBM/IBM%204860%20%28PCjr%29%20-%20Hardware%20Maintenance%20and%20Service%20-%20SEP83.pdf#page=62) instead directs a 15-30 VAC test **between 1 and 3 with the transformer disconnected from the machine**. Interpreting the app as two17 VAC halves would imply about 34 VAC end-to-end; that is an inference from the app, not an IBM rating. Use IBM's documented1-to 3 test; do not prescribe a 17+17 V replacement without a winding diagram. **Map: prove-it-works.**

3. **HIGH - UNVERIFIABLE: TI-99/4 A contact numbers are not tied to the winding claims.**
   `ti994a-power` pins 1/2/4 (JSON 204-206) assert18 VAC across 1-2,8.5 VAC across 2-4, with 2 the white common. [TI Technical Data, printed 18 / PDF 20](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf#page=20) FigureE establishes physical numbering. [printed 20 / PDF 22](https://ftp.whtech.com/datasheets%20and%20manuals/Hardware/Texas%20Instruments/TI-994A%20Console%20and%20Perhipheral%20Expansion%20System%20Technical%20Data%201049717-2%20(1983).pdf#page=22) FigureG establishes wire colors and windings, without mapping those colors to the numbered contacts. The Servicing Manual Figure 49 (PDF 139) has the same missing correspondence; SAMS printed 21/PDF 33 rates the tapped transformer but does not close it. Nominal winding voltages do not prove a numbered-pin map. Add a source showing winding-to-contact correspondence before using these records to wire power. **Map: prove-it-works.**

4. **MEDIUM - WRONG: HERO 1 charging readings omit the battery/load state.**
   The `hero1` supply plus `hero1-charger` pins 3/5/8/9 are wrong (JSON 244/247/249/252/253). The app expects25-27 V at 8/9 whenever the charger is on, and about 13.9 V at 3/5 whenever it is on. [ET-18 Technical Manual, printed 72-73 / PDF 84-85](https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf#page=85) explains that the charger's input to the robot can fall to **about 14 V with heavily discharged batteries** and rises toward 27 V near full charge.13.9 V is the regulated **float** level, not an unconditional charging reading; current limiting causes the output to follow the charging state. Correct both expected readings and their measurement conditions. Present values can falsely condemn a working charger/regulator. **Map: fix-root-causes.**

5. **MEDIUM - UNVERIFIABLE: exact measurement limits are presented without the corresponding model-specific source.**
  49 items fall in this category. The nominal rail and pin map are established; the remaining acceptance band, threshold or timing bound is not established by the pages cited. For example, `c64-power` pin 5 and `c128-power` pin 1 both give4.95-5.10 V where the checked schematics establish nominal5 V. The IIc converter table explicitly gives +/-10% for its12 V rails, while `uni-db19` uses11.3-12.5 V and-11 to -13 V without a matching host-specific acceptance specification. The original5150 PowerGood paragraph gives a 100 ms delay after minimum sense levels are reached; it does not supply the claimed500 ms upper bound. Cite the applicable test specification or label the additional limits as repair guidance. **Map: prove-it-works.**

   | Machine/record | Affected pins | Source checked / missing detail |
   |---|---|---|
   | C16 `c16-power` |2| C16 schematic251788, PDF 12:9 V/7805 circuit; no 7.5 V minimum-input specification |
   | Plus4 `plus4-power` |1| PSU schematic:5 V/5.2 V; no 5.00-5.25 V band |
   | C64 `c64-power`; C128 `c128-power` |5;1| C64 service PDF 8 and PSU drawing; C128 service PDF 72/89/90: no 4.95-5.10 V band |
   | DiskII `disk2-ribbon` |9,11,12,13,15,17,19| Analog/controller schematics and Sather printed 9-5/9-6: nominal rails, no complete host-specific bands |
   | DuoDisk `duo-db25` |7,19,20,23,24| AppleTA37054 PDF 1-2 and DuoDisk technical procedures: nominal cable map, no claimed tolerances |
   | UniDisk `uni-db19` |5,7,8,16| AppleTA37054; IIc TRM printed 234/PDF 262 and printed 274/PDF 302: host-specific limits not matched |
   | Atari400/800 `atari-power` |1,2 on each| FSM printed 1-6 and power schematics:9 VAC, without 9-11 VAC loaded acceptance band |
   | BBCB/Master PSU tabs |All three+5 V tabs and the-5 V tab on each| BBC Service3.14/6.3/6.4; Master PDF 6/7/32: rails/lead colors, without the stated voltage windows |
   | IBM5150 `pc-psu` |P8-1| TechRef printed 1-27/PDF 35:100 ms, without 500 ms upper bound |
   | IBM5155 `p-psu` |P8-3,P8-4,P9-3,P9-4,P9-5,P9-6| Portable/XT TechRef printed 3-7 to 3-10: map/ratings and sensing thresholds, without the app's normal-voltage windows |
   | CPC664/61285 V inputs |1 on each| CPC664 PDF 31; CPC6128 PDF 29: nominal5 V and contact circuit, without 4.75-5.25 V band |
   | MSX1/MSX2 cartridge slots |45,47,48,50 on each| MSX Technical Data Book printed 32-34/PDF 35-37: nominal rails/current budgets, without the app's +/-5% bands |

   The corresponding source links and the exact app claim for every affected pin are in the ledger. CPC464 pin 1 also lacks its voltage band, but is counted with the polarity finding below.

6. **MEDIUM - UNVERIFIABLE: barrel-contact polarity is not established for two model records.**
   `spectrum128-power` pins 1/2 (JSON 192-193) assign center0 V/sleeve+9 V while explicitly admitting extrapolation from 48K. [Spectrum128 Service Manual, PDF 25/39](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B%20128K/Repair/ZX%20Spectrum%2B%20128K%20Service%20Manual.pdf#page=25) establishes 9 V input and a 2.1mm coax socket on the cited pages; the other polarity citation is a 48K page. `cpc464-5v` pins 1/2 (JSON 310-311) assign center+5 V/sleeveGND, but [CPC464 Service Manual, printed 15-16 / PDF 13](https://archive.org/details/amstrad-cpc-464-micro-computer-ctm-640-color-monitor-gt-64-green-monitor-service-manual/page/n15) labels CP001+5 V/0 V without a physical-contact drawing; the checked user-manual appendix does not resolve it. These are sourcing gaps, not proof that either polarity is reversed. **Map: prove-it-works.**

7. **LOW - WRONG: MSX reserved-pin note is attached to the wrong pin.**
   `msx1-cart` and `msx2-cart` pin 5 (JSON 358/409) say the book notes that pin for 256KROM. In [MSX Technical Data Book, printed 32-33 / PDF 35-36](https://archive.org/details/MSXTechnicalDataBook/page/n35), that note belongs to **pin 3 /CS12**. Pin5 is reserved and must not be used. Move the note to 3; retain 5 as reserved. **Map: fix-root-causes.**

8. **LOW - UNVERIFIABLE: TS2068 adds an unproven no-load qualifier.**
   `ts2068` supply and `ts2068-power` pin 2 (JSON 200/202) say about 21 V **unloaded**. The manual establishes 14-25 V input and the museum page gives 15 V 1 A nominal. SUMv4n1 printed 5 describes about 21 V output in an operating-heat discussion, without calling it a no-load measurement. Sinc-Linkv7n1 printed 9-10 does not establish that condition either. Keep the distinction between the confirmed nominal/input ratings and the unproved no-load claim. [SUM original scan, PDF 5](https://archive.org/download/SinclairTimexUsersMagazine/SUM%20v4%20n1.pdf#page=5). **Map: prove-it-works.**

Dead, unavailable or wrong source links:

- The1541 specification citation points to PDF5 (block diagram). The actual120 VAC/60Hz/30 W specification is [PDF 4](http://www.zimmers.net/anonftp/pub/cbm/schematics/drives/new/1541/1540-1541_Disk_Drive_Service_Manual_314002-01_(1985_Nov).pdf#page=4).
- The SUMv4n1 citation `/page/n5` selects printed 6, a Quill article. The power-supply article is [printed 5 / PDF 5](https://archive.org/download/SinclairTimexUsersMagazine/SUM%20v4%20n1.pdf#page=5); use archive indexn4.
- The cited [ModelI Handbook PDF](https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf) returnedHTTP500 in this run. The same scan's [_text.pdf](https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack_text.pdf) was readable and used.
- The [archived Oric issue7 circuit](https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-1s.gif) returnedHTTP429 in this run. A readable original Oric circuit is reproduced in [OricOwner 5 PDF 44-45](https://library.defence-force.org/books/content/oric_owner/OricOwner_05.pdf#page=44), used to verify the listed supply and ULA facts.
- HERO 1 specifications are printed 8/PDF 10, not printed 9. HEROJr's cited chassis-parts sheet at PDF43 is printed 41, not42. These are page-label errors rather than electrical contradictions.

No finding is mapped to serialize-shared-state-mutations: this data-only audit established no shared-state failure.
