# Dragon, MSX and Oric: features 1, 3, 4 and 6 — 2026-10-30

Scope blocks, first ten minutes, clock trees and replacements in `src/data/dragon.js`, `msx.js` and `oric.js`.
`node scripts/validate-data.mjs dragon msx oric`: 0 FAIL, no new WARN (99, the same as before the pass).
No Sams folder exists for these machines.

## Sources used

| Source | URL | Used for |
|---|---|---|
| SN74LS783/MC6883 SAM data sheet (Motorola) | https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf | DC table p. 5-324 (E, Q VOL 0.5 V, VOH VCC - 0.75 V; VClk VOL 0.6 V; other outputs VOH 2.7 V); pin table p. 5-326 (VClk = crystal / 4 square wave, E and Q 90 degrees apart) |
| Motorola MC6809E data sheet | https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf | DC p. 2 (E: VIL max 0.4 V, VIH min VCC - 0.75 V; Q: 0.6 V / 2.0 V); bus timing p. 3 (tEQ1) |
| Dragon Data Service Information RWEW/KA/0081a, RWEW/RA/0082a | https://dragondata.worldofdragon.org/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf | firstTen order: transformer, PSU board, PL10, voltages, diodes, RESET, IC15; program faults order |
| SA2121, CD41519, CD41505, SA2120 sheets; Dragon Archive wiki PSU Pictures and 64K Upgrade | (as in docs/verification/dragon.md) | Rail values, windings, 4116 rail pins, crystals |
| RETRO Innovations 2364 Adapter | https://store.go4retro.com/2364-adapter/ | 68A364 replacement |
| The Dragon Archive forum, "Eprom incompatibility?" | https://archive.worldofdragon.org/phpBB3/viewtopic.php?p=23580 | Dragon 64/200 ROM sockets with 27128 EPROMs; 27256 needs A14 tied |
| SGS-Thomson HCC/HCF4529B data sheet (Sep 1988) | https://www.komponenten.es.aau.dk/fileadmin/komponenten/Data_Sheet/4000/4529.pdf.pdf | Pin connections identical to the MC14529B |
| Sony HB-F9P/F9S Service Manual (MSX2, PAL) | https://archive.org/details/sonyhbf9psm/page/n16 | Captures on the CPU-section schematic p. 16: V9938 pin 63 "3.4 Vp-p 21.4697 MHz" (2.0 V DC), pin 8 "4.7 Vp-p 280 nS", pin 25 "4.8 Vp-p 20 mS" |
| Philips VG-8020 Service Manual (MSX1, PAL) | https://archive.org/details/philipsvg8020sm | p. 2 adjustments (VDP clock 445.32 kHz at U30 pin 37 via 10:1 probe, TC1; VR1 for 5 V on C3); p. 7 parts list (X1 10.6875 MHz, X2 14.31818 MHz) |
| Sony HB-101P/201P Service Manual (MSX1, PAL) | https://archive.org/details/sonyhb101sm/page/n59 | 6-1: CPU pin 6 adjusted to 3.562500 MHz; parts list crystal 10.6875 MHz |
| Philips VG8230/8235 Repair Method part 1 | https://archive.org/download/vg8235sm/Vg8235RepairMethod-Part1.pdf | ERR 990 (interrupt period outside 20 ± 2 ms), ERR 999 (interrupt stuck LOW), pp. 21-22 |
| Zilog Z80 CPU Product Specification (Mar 1978) | http://www.bitsavers.org/components/zilog/z80/03-0027-02_Z80_CPU_Product_Specification_Mar78.pdf | Clock input 0.45 V / VCC - 0.6 V, p. 8 |
| GI AY-3-8910/8912 Data Manual (reprint) | https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf | 7.3 DC (inputs 0.6 V / 2.4 V), 7.4 AC (clock 1-2 MHz, duty 25-75%), pp. 53-54 |
| Yamaha YM2149 data sheet | https://bitsavers.org/components/yamaha/YM2149_199209.pdf | SEL pin 26, 5-bit envelope and DAC, p. 1-3 |
| Yamaha V9958 Technical Data Book (Dec 1988) | https://vgamuseum.info/images/doc/yamaha/v9958.pdf | Pin table pp. 3-4 |
| MSX Technical Data Book; V9938 data book; TMS9918A data manual | (as in msx.js) | Rails, clock rates, interrupts, pins |
| MOS 6500 Microprocessors data sheet (Nov 1985) | http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf | 6502 clock-input limits (2.4 V / 0.4 V), p. 3 |
| Mike Brown, Oric/Atmos Repair Checksheet v1.0; Unofficial ULA Guide v1.02 | https://oric.signal11.org.uk/files/pub/ | firstTen (pp. 1, 3), clocks (ULA guide pp. 4-5) |
| Tindie, retro_devices HCS 10017 | https://www.tindie.com/products/retro_devices/1-pc-new-genuine-hcs-10017-dip40-ula-for-oric/ | ULA new old stock |

## Added

| Machine | Scope blocks | firstTen | Clocks |
|---|---|---|---|
| dragon32 | E, Q, VDG clock (datasheet, SAM output limits) | 8 | 6 (f only, PAL only) |
| dragon64 | E, Q, VDG clock (datasheet) | 8 | 6 |
| msx1 | CPU clock (datasheet, Z80), PSG clock (datasheet, AY) | 8 | 7 (PAL/NTSC) |
| msx2 | VDP crystal, CPU clock, frame interrupt (capture, Sony HB-F9P) | 8 | 5 (PAL/NTSC) |
| oric1, atmos | CPU clock from the ULA (datasheet, 6502 input limits) | 7 | 8 (f only) |

Replacements: `rom-dragon32-basic` (2364 adapter, adapter, verify), `rom-dragon64-basic` (27128, pin-compatible, verify,
forum source), `mux14529` (HCF4529B, pin-compatible), `ay8910` (YM2149, pin-compatible), `vdp9938` (V9958,
pin-compatible with the pin 4, 8, 21, 26, 27 differences), `ula10017` (HCS 10017 new old stock, verify).

## Judgement calls

- Capture levels: the Sony schematic gives peak-to-peak only. CPUCLK and /INT are drawn from 0 V; the crystal sine is
  centred on the 2.0 V DC printed at pin 63 (0.3 to 3.7 V). Each note says so.
- Dragon scopes use the SAM output limits, not the 6809E input limits (the SAM drives E and Q); the CPU limits are in
  the note. Frequencies use the 14.218 MHz crystal of CD41505.
- No scope block for: the Dragon crystal (no level source), the Oric 12 MHz (IC21's type is not legible on the
  schematic, so no inverter data sheet), Oric Φ2 (the MOS sheet gives no Φ2 OUT levels), TMS9918A clocks (no level table
  in the text-less scan), the 6847 video (inverted video, as instructed).

## Conflicts

- Dragon 32 crystal: SA2120 marks XL2 14.32 MHz; CD41505 marks XL3 14.218 MHz. Data uses 14.218 MHz with `verify` on
  the Dragon 32 clock row; every scope note states both rates (0.889 or 0.895 MHz E).
- MSX1 PAL clocks differ by maker: Philips VG-8020 runs the VDP at 10.6875 MHz and the Z80 at 14.31818 / 4 =
  3.579545 MHz; the Sony HB-101P runs the Z80 at 3.5625 MHz. The standard says 3.579545 MHz and the TMS manual
  10.738635 MHz. Both are entered as separate clock rows.
- MSX2 PAL crystal: Sony HB-F9P prints 21.4697 MHz; the V9938 book gives 21.47727 MHz. Capture uses Sony's value.
- Oric colour circuit: the existing test point says 4.43 MHz at IC24 pins 8, 12 and 5; the repair checklist (3.7)
  says 8.86 MHz there. Not settled; no subcarrier clock row added, test point left as it was.

## Not found or not done

- No oscilloscope drawings in the Dragon Data service sheets or repair notes, the Philips VG-8020 manual or the
  VG8235 repair method (its waveforms are test-program patterns, not standard signals). The Oric service manual is
  still unreachable (cpcwiki behind Cloudflare, no archive.org copy).
- S3527 / S1985: no replacement part exists; no rows.
- Dragon 64 ROM: the 27128 row rests on one forum thread; no HN613128P data sheet.

## For other files (not owned here)

- `rom23128` (commodore.js) is the Oric ROM: its owner should add the Oric replacement (2764 pair with IC10/IC11, or
  a 27128 in IC9, per the Oric-1 schematic "23128 or 2764"); the jumper details need the Oric service manual.
- App: the `video-line` shape still has no inverted option, so no 6847 traces were entered.
