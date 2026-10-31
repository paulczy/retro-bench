| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 40 | 38 | 0 | 2 |
| clock-row | 10 | 6 | 2 | 2 |
| connector-pin | 158 | 153 | 4 | 1 |
| first-ten | 4 | 1 | 1 | 2 |
| rail | 8 | 4 | 2 | 2 |
| **Total** | **220** | **202** | **9** | **9** |

Every item has a decision and evidence in the [per-item ledger](/P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-06-ledger.md). Data files were unchanged.

1. **High — i=0, 1: Plus/4 video labels swapped.** Pin **1 is LUM**, carrying luminance and sync; pin **2 is GND**, 0 V. The names contradict their otherwise correct descriptions. **Principle:** prove-it-works. [CN7 source diagram](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg)

2. **High — i=127: C16 serial data incorrectly reused for Plus/4.** Plus/4 serial **pin 1 is N.C.** The `/SRQ IN`, R102 pull-up and expected +5 V claims do not apply. **Principle:** fix-root-causes. [Plus/4 schematic, PDF p. 20](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf#page=20)

3. **Medium — i=4: Audio input destination is wrong.** Video pin 5 feeds the external audio mixing/amplifier path, rather than the TED sound chip. **Principle:** prove-it-works. [Schematic, PDF pp. 20–21](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf#page=20)

4. **Medium — i=50, 53: PAL CPU clock conflicts with the source’s CPU pinout.** That pinout gives **886.7 kHz (0.8867 MHz)**. The records instead use **884 kHz** from timer prose on p. 35. The source is internally inconsistent; timer prose cannot establish the CPU-clock value. **Principle:** prove-it-works. [TED manual, PDF p. 38](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf#page=38)

5. **Medium — i=181: `/CAS` need not pulse continuously alongside `/RAS`.** `/CAS` depends on DRAM access; refresh includes RAS-only cycles. Strobe activity also does not establish that RAM chips caused an error. **Principle:** fix-root-causes. [TED manual, PDF pp. 3, 32–33](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf#page=3)

6. **Medium — i=187: Plus/4 9 V AC serves onboard circuitry too.** It feeds the BA20 bridge and unregulated supply, contradicting “Only brought out to the user port.” **Principle:** fix-root-causes. [Schematic, PDF p. 21](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Service_Manual_314001-04_%281984_Oct%29.pdf#page=21)

7. **Medium — i=190: Sagging VIC-20 +5 V does not prove a shorted chip.** Regulator, bridge and connection faults are alternatives. The stated **4.95–5.10 V** range is unsupported, and the onboard LM323 description needs an early-board qualifier. **Principle:** fix-root-causes. [Carlsen’s diagnostics](https://portcommodore.com/rcarlsen/cbm/vic20/vic20.txt)

Source-link and locator problems:

- The three cited Wayback snapshots were inaccessible through local retrieval and the web reader. Their status is **blocked/inaccessible**, not proven permanently dead; live originals were consulted where available.
- The VIC-20 guide’s transformer sentence is at **PDF p. 245, printed p. 229**; cited `#page=299` points to a pin table.
- The 1541 clock table prints overlapping **15–30** rather than **25–30**. Item **194 remains unverifiable** for that track-range claim.