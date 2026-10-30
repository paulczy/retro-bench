# TI-99/4A: waveforms, first ten minutes, clocks, replacements (features 1-4, 6), 2026-10-30

Data in `src/data/ti.js` (power.ti994a `testPoints[].scope`, `firstTen`, `clocks`; `replacements` on six chips).
`node scripts/validate-data.mjs ti`: 0 FAIL; one new WARN (Sound out scope has no low/high, see below).

## Sources

| Source | URL | Used for |
|---|---|---|
| Sams ComputerFacts CC2, TI-99/4A Model PHC004A (CF1, 4-84), archive.org scan | https://archive.org/details/cc_2_texasinst_ti99 | Waveform photos on the schematics (leaf n0 = p. 37, n1 = pp. 35-37, n2 = p. 2), Troubleshooting p. 14 (n15) and p. 15 (n16), parts list p. 18 (n19), Service Checks insert (n21). Each leaf is a two-page spread; page links are `/page/n<leaf>/mode/1up`. The whtech copy already cited in ti.js is the same folder |
| TI-99/4A Home Computer Servicing Manual (Oct 1983) | ftp.whtech.com, Hardware/Texas Instruments/TI994A_HC_Servicing_Manual_Oct_1983.pdf | Debug list p. 8, oscillator p. 13, power board pp. 34-35, troubleshooting charts pp. 87-89 |
| TIM 9904A Data Manual (TI, 1982) | ftp.whtech.com, Datasheets - TI/TIM9904.pdf | 12 MHz = 4 x 3 MHz (p. 1), VOH/VOL (p. 9), Fig. 10 phase relationships (p. 10) |
| TMS9918A/9928A/9929A Data Manual (1982) | ftp.whtech.com, Datasheets - TI/9918a28a29a.pdf | 3.6 clocks and Table 3-3 (342 clocks per line, 262/313 lines) p. 3-8; video levels 5.3 p. 5-2; fCPUCLK/fGROMCLK 5.5 p. 5-5; 3.7.2 p. 3-11 |
| SN76489AN data sheet | ftp.whtech.com, Datasheets - TI/SN76489.pdf | SN76494 footnote (no divide-by-eight, 500 kHz), pin 9 N.C. |
| TI MOS Memory Data Book 1986, ROMs | ftp.whtech.com, Datasheets - TI/MOSMemory-1986/MOSMemory-1986-07-ROMs.pdf | TMS4732 "pin-compatible with TMS2532 EPROM", mask-programmed pins 20 and 21 |
| F18A pin-out and compatibility (Matthew Hagerty) | https://dnotq.io/f18a/pinout.html (and /f18a/intro.html) | F18A pins, TI jumpers, 9118/9128/9129 pin 37, versions |
| PICO9918 README (visrealm) | https://github.com/visrealm/pico9918 | PICO9918 outputs, TI support, GROMCLK on v0.2 |
| AtariAge "TI-GROMmy" thread, Wayback 2024-11-12 | http://web.archive.org/web/20241112173905/https://forums.atariage.com/topic/341084-ti-grommy-the-system-grom-replacement/ | Console GROM replacement (AtariAge itself returns 403) |

All URLs returned 200/206 on 2026-10-30 (the Wayback copy returned 200, then 429 from rate limiting on a recheck).
Nouspikel (unige.ch, nouspikel.com) and Mainbyte were not used: unige.ch blocks bots, nouspikel.com returns 404, and Wayback was rate limiting.

## Scope blocks (all basis: capture, Sams)

| Test point | where | f / period | Levels | Sams photo |
|---|---|---|---|---|
| CPU clocks phi1-phi4 (MOS) | TMS9900 pins 8, 9, 25, 28; TIM9904 pins 12, 11, 8, 9 | 3 MHz, duty 25% (9904A Fig. 10) | 0 to 17 V | p. 2, 17 V p-p, 0 V ref |
| CPU clock oscillator (new) | TIM9904 pin 1 | 12 MHz (Sams counter, p. 14) | -0.5 to +0.5 V | p. 2, 1 V p-p, -0.5 V ref |
| Oscillator out (new) | TIM9904 pin 16 | 12 MHz (9904A Fig. 10) | 0 to 4 V | p. 2, 4 V p-p |
| 9901 TTL clock / TTL phases | TMS9901 pin 10; TIM9904 pins 14, 15, 7, 6 | 3 MHz, duty 75% | 0 to 4.2 V | p. 2, 4.2 V p-p |
| GROM clock | TMS9918A pin 37; GROM pin 13 | 447.4 kHz (manual 5.5) | 0 to 4.5 V | p. 37, 4.5 V p-p |
| Composite video at the VDP (new) | TMS9918A pin 36 | 63.7 µs (342 pixel clocks) | 2 to 3.5 V | p. 37, 1.5 V p-p, 2 V ref |
| Video out (new) | ti994a-video pin 4 | 63.7 µs | 0 to 1 V | p. 37, 1 V p-p |
| Sound out (new) | SN76489 pin 7 | 200 Hz (Sams test program) | none | p. 14 text, 0.7 V p-p |

No `basis: 'datasheet'` block was added. Every clock the brief named either has a Sams photo (above) or has no backed shape or level:
- CPUCLK (VDP pin 38): the VDP manual gives the frequency and VOH (2.4 V min, 3.2 V typ) but no VOL for that output and no waveform. Left as text.
- CRUCLK (9900 pin 60, 9901 pin 3): Sams photographs it (5 V p-p at 2 ms/cm, bursts), but no source gives a repetition rate. No scope block.
- VDP crystal (pin 39/40): Sams prints 15 V p-p at pin 40, which is impossible on a +5 V part (probably 1.5 V with the dot lost). Left out.
- Y600 at TIM9904 pin 18 (0.6 V p-p on 0.6 V): the frequency at that pin is unclear (48 or 12 MHz, see conflicts). Left out.
- Not used because no source gives a frequency: address and data lines (Figs. 1, 2), joystick emitters (Figs. 5, 6), keyboard and U302 decoder lines, cassette header signal, CRU IN and CRU OUT, READY, INTREQ, VDP /INT, /RAS (4.3 V, 2 µs/cm), /CAS (4 V, 0.2 µs/cm), /CSR and /CSW. They could become blocks if the app gains an "irregular activity" shape.

The Sound out block has no low/high because the source gives only 0.7 V p-p, so the validator warns that volts/div cannot be derived. Left that way on purpose.

## firstTen and clocks

firstTen (8 steps): transformer AC at the power plug (`verify`: the pin-to-winding mapping is unconfirmed), regulator board unloaded with -5 V first (and B+ at L6), rails at the 9900 under load, reset (9904 pin 5, 9900 pin 6), 12 MHz at 9904 pin 1, the four 12 V clocks, READY, VDP pins 38 and 39. Sources: Sams service checks and p. 14; TI Servicing Manual pp. 8, 34-35, 87, 89.

clocks: Y600 (48 MHz, `verify`), the 12 MHz oscillator, the MOS and TTL phases at 3 MHz, Y100 10.738635 MHz (the same on PAL 9929A consoles), CPUCLK 3.579545 MHz (NTSC 9918A only; pin 38 is R-Y on a 9929A), GROMCLK 447.4 kHz, line rate 15.70 kHz, frame rate and VDP interrupt 59.9 Hz NTSC and 50.2 Hz PAL. The line and frame rates are worked out from the manual's 342 clocks per line and 262 or 313 lines at 10.738635 / 2 MHz.

## Replacements

| Chip | Rows |
|---|---|
| vdp9918 | TMS9928A/9929A (same socket, not a drop-in), TMS9118/9128/9129 (no GROMCLK, not for the TI), F18A / F18A-MK2 (modern), PICO9918 (modern) |
| psg76489 | TMS9919 = SN94624N, SN76494N, SN76489AN (divide-by-eight trap) |
| tms9904 | SN74LS362 / TIM9904A |
| grom0430 | TI-GROMmy (modern) |
| romconsole | TMS2532 EPROM |
| sram6810 | MCM6810P / NTE6810 / ECG6810 (Sams cross-reference) |
| tms9900, tms9901 | None added: no pin-compatible or modern part found, and Sams gives no cross-reference for either |
| dram4116 (4116 to 4164 adapters) | Not added: the chip is defined in another brand file. Left for that file's owner |

## Conflicts and Sams errors

- **Crystal Y600:** the TI Servicing Manual (p. 13) and the Sams schematic call it a 48 MHz third-overtone crystal. The Sams counter check (p. 14) reads 12.00 MHz at TIM9904 pin 1, and the TIM9904A manual runs the oscillator at 4 x 3 MHz = 12 MHz. The data gives 12 MHz for the oscillator and keeps 48 MHz only as the crystal's marking (`verify`).
- **MOS phase amplitude:** Sams gives 17 V p-p; the 9904A manual gives VOH of Vdd - 2 V to Vdd. The capture value is kept, and the note explains it (overshoot and ringing on a x10 probe).
- **Sams time bases:** the MOS and TTL phase photos on p. 2 say 2 µs/cm, but Figures 3 and 4 (p. 14) show the same signals at 0.2 µs/cm, the only reading that fits 3 MHz. The GROMCLK photo says 1 ms/cm; four cycles across the screen only fit about 1 µs/cm. Both are noted on the scope blocks.
- **Sams supply pins:** service check 3(a) and p. 14 list U600 pins 33 and 64 among the supply pins. Pin 33 is IC3 and pin 64 is /HOLD, both tied to +5 V on the console, so they read 5.14 V, but they are not supplies. Not carried into the data.
- **Sams DC readings against TI:** the TI documents give only nominal rails (+5, +12, -5 V) with no tolerance, and the Sams readings (5.14, 11.84, -5.15 V) fit them, so no `conflict` was recorded.
- **Sound chip clock source (not settled, outside this pass):** ti.js says SN94624 boards clock the sound chip from GROMCLK and SN76489 boards from the 3.58 MHz CPUCLK. The TI chart p. 89 checks "pin 38 VDP for clock" and "coax between VDP and sound chip" when the sound chip has no clock, while the F18A page says the 99/4A does not use CPUCLK. Check the Technical Data schematic sheet 62 before changing anything.
