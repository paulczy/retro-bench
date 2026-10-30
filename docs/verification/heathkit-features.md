# Heathkit: waveforms, first ten minutes, clocks, replacements (features 1-4, 6), 2026-10-30

Data in `src/data/heathkit.js` (power.hero1, power.herojr and power.hero2000: `testPoints[].scope`, `firstTen`, `clocks`; `replacements` on 11 chips).
`node scripts/validate-data.mjs coleco heathkit`: 0 FAIL. The only Heathkit WARNs are the existing ones: hero2000 is still `planned`, and msm5832 pin 17 `/XT` "looks active-low". `/XT` is the complement crystal pin, not an active-low signal, so it was left unchanged.

No Sams folder exists for the HERO robots, so there are no Sams sources here.

## Sources

| Source | URL | Used for |
|---|---|---|
| ET-18 Technical Manual (local copy is the same file as archive.org: 55,867,914 bytes each) | https://archive.org/download/heathkit-hero-1-ET-18/ET-18%20Robot%20Technical%20Manual%20ET-18A.pdf | Troubleshooting charts printed pp. 62-63 (PDF 72-73), power supply test p. 55 (PDF 65), sonar adjustment p. 48 (PDF 58), RTC frequency counter p. 50 (PDF 60), sonar transmitter p. 76 (PDF 88), Y401 p. 79 (PDF 91) |
| HERO Jr Technical Manual 595-3271 (archive.org page map checked: PDF page = printed + 2) | https://archive.org/download/hero-jr-technical/HeroJr%20595-3271%20Technical.pdf | Troubleshooting charts pp. 13-15 (PDF 15-17), time adjustment p. 8 (PDF 10), 25 kHz regulator p. 20 (PDF 22), sonar Figure 1 p. 22 (PDF 24), CPU pin-out p. 24 (PDF 26), parts list p. 41 (PDF 43) |
| Motorola MC6802/6808 DS9818-R3 (local copy byte-identical) | https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf | p. 1 description and ordering, p. 3 DC (E: VOL 0.4 V, VOH 2.4 V) and fXTAL = 4 fo, p. 4 bus timing (PWEL and PWEH 450 ns) |
| Motorola MC6821 DS9435-R3 | https://bitsavers.org/components/motorola/_dataSheets/6821.pdf#page=1 | Ordering table (speed grades, package suffixes) |
| Motorola MC6850 DS9493R4 | https://ipv4.pccomponents.com/datasheets/MOTOR-MC6850P.pdf#page=7 | Ordering table |
| Microchip 27C64 DS11107M, 27C128 DS11003L, AT27C256R 0014, AT28C64B 0270L | ww1.microchip.com/downloads/en/DeviceDoc/ 11107M.pdf, 11003L.pdf, doc0014.pdf, doc0270.pdf | Pinouts and obsolete status (microchip.com product pages return 403 to scripts) |
| Hitachi 1984 IC Memory Data Book, HM6116LP p. 87 | https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf#page=89 | L/LP grades, data retention at 2.0 V |
| TI TL851 and TL852 product pages | https://www.ti.com/product/TL851, https://www.ti.com/product/TL852 | Both ACTIVE, CN = DIP |
| ReActiveMicro SC-01 Emulator | https://www.reactivemicro.com/product/sc-01-emulator-sound-and-speech-replacement-module/ | SC-01 replacement module (out of stock) |
| Intel 1983 Microprocessors and Peripherals Handbook, 8284A | https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf#page=415 | CLK = crystal / 3 (HERO 2000) |
| HERO 2000 Schematic Diagrams 595-3416 p. 2 | archive.org (as in heathkit.md) | Y301 15 MHz, U304 pins, U304 pin 8 to 8088 pin 19 |

All URLs returned 200 or 206 on 2026-10-30. The HERO Jr TM sometimes returns 500 from archive.org; it returned 200 on a retry.

## Scope blocks (all `basis: 'datasheet'`, none are captures)

| Machine | Test point | f | Levels | Basis |
|---|---|---|---|---|
| HERO 1 | E clock, CPU pin 37 | 0.8949 MHz, 50% | 0.4 / 2.4 V | DS9818 p. 3-4; 3.579545 MHz Y401 per TM p. 79 |
| HERO Jr | E clock, CPU pin 37 | 1 MHz, 50% | 0.4 / 2.4 V | DS9818 p. 3-4; 4 MHz Y201 per TM p. 24 |

Not added:
- HERO 1 sonar: no TL851 is fitted. The sonar uses a discrete U106A oscillator at about 32 kHz, sending 8 cycles about every 1/4 s, and no levels are given. The old TP1/TP2 test point ("values not transcribed") now reads "TP1, about 0.7 V, peak with R108" (TM p. 48), plus a transmit text row.
- HERO Jr TL851 XMIT: 16 pulses at 49.4 kHz, but the ping rate is not given, so a `burst` block cannot be drawn.
- Motor drive PWM: neither manual shows it.
- RTC crystals: no levels.
- HERO 2000: the status is still `planned` and U304 is only read as an 8284A-type part.

## firstTen

- HERO 1, 8 steps: charger input (P202 pin 14), logic and motor charge regulators (P202 pins 15 and 22, 13.8 V), logic and motor batteries (P201 pins 3 and 10), +5 V (P201 pin 4), reset and display, E clock. Sources: TM charts pp. 62-63, p. 55, p. 79.
- HERO Jr, 8 steps: charger (J1 pin 2), battery (P310 pin 2), Vcc, Vca, reset, E, RTC 32.768 kHz, sonar. Sources: TM charts pp. 13-15, pp. 8 and 24.
- HERO 2000: no firstTen. No Heath troubleshooting text was available, only the schematic.

## clocks

- HERO 1, 5 rows: Y401, E, RTC Y301 (also at U317-15), sonar 32 kHz, ping rate about 4 Hz (`verify`).
- HERO Jr, 6 rows: Y201 4 MHz, E 1 MHz, Y202 32.768 kHz, Y301 420 kHz, XMIT 49.4 kHz, U302 about 25 kHz.
- HERO 2000, 2 rows, both `verify`: Y301 15 MHz, CPU clock 5 MHz.

## Replacements

- cpu6808: MC6802 (128 bytes of RAM at $0000-$007F, disabled with RE pin 36 low; check RE on the HERO Jr), MC68A08 and MC68B08.
- pia6821: one row. P is only the plastic package; MC6821 runs 1.0 MHz, 68A21 1.5 MHz, 68B21 2.0 MHz.
- acia6850: one row with the same grades.
- rom2764: 27C64, and AT28C64B (pin 27 is /WE and must be held high).
- rom27128: 27C128, and AT27C256R (program the image twice).
- sram6116: HM6116LP grades (for the standby rails).
- sc01a: none made. The SC-01 Emulator module is listed, but is not tested in a HERO.
- sc02: SSI 263A/AP, new old stock only, no emulator.
- msm5832: MSM5832RS new old stock only; DS12887-type parts need an adapter.
- tl851 and tl852: TL851CN and TL852CN, still made by TI.

## Changes to existing data

- HERO Jr supply note: the old text came from mis-aligned OCR of the TM chart. It is rewritten from the page images: low battery with good batteries points to D304, D305, U303, U214 or U201 (it said U201, U213, U221); batteries that will not charge point to the charger, P1 or J1, P307, U301 (it said U211 or U212).
- HERO Jr charger source labels: printed p. 20 changed to printed p. 19. The #page=21 anchor was already correct.
- HERO 1 CPU crystal: the expect now cites Y401 3.579545 MHz. The 4 MHz option keeps `verify`.
- Note for other HERO Jr sources: PDF page = printed + 2 throughout. The existing "chassis parts list, printed p. 42, #page=43" label points at printed p. 41.
