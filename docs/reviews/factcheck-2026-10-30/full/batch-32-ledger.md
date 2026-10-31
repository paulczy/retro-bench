# batch-32 fact-check ledger

Reviewed against the downloaded cited documents; full batch, no sampling. PDF pages are PDF viewer page numbers unless a printed page is explicitly named. Source fragments are locators, not separate downloads. A partially supported item is UNVERIFIABLE if any substantive claim remains unsupported; a direct contradiction takes WRONG precedence.

Principle mapping: every finding maps to **prove-it-works**; inaccurate component references/claims also map to **fix-root-causes**. **serialize-shared-state-mutations**: not applicable; no shared application data were mutated.

## Sources

- S0: [0.html](batch-32/0.html) — https://github.com/codedchip/AMSGateArray (HTTP 200).
- S1: [1.html](batch-32/1.html) — https://github.com/hackup/PLA264 (HTTP 200).
- S2: [2.html](batch-32/2.html) — https://github.com/moogway82/JamSoftElectronULA (HTTP 200).
- S3: [3.html](batch-32/3.html) — https://github.com/randyrossi/vicii-kawari (HTTP 200).
- S4: [4.html](batch-32/4.html) — https://github.com/visrealm/pico9918 (HTTP 200).
- S5: [5.html](batch-32/5.html) — https://homepages.plus.net/fruitcake/Sinclair/Spectrum128/SCARTCable/Spectrum128SCARTCablePlus2.htm (HTTP 200).
- S6: [6.html](batch-32/6.html) — https://worldofspectrum.net/ZXSpectrum128Manual/sp128p03.html (HTTP 200).
- S7: [7.pdf](batch-32/7.pdf) — https://ipv4.pccomponents.com/datasheets/MOTOR-MC6850P.pdf (HTTP 200).
- S8: [8.gif](batch-32/8.gif) — https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX80/Tech%20specs/ZX80%20Schematics.gif (HTTP 200).
- S9: [9.html](batch-32/9.html) — https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX80/Tech%20specs/Connectors.html (HTTP 200).
- S10: [10.pdf](batch-32/10.pdf) — https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX80/ZX80%20Operating%20Manual.pdf (HTTP 200).
- S11: [11.gif](batch-32/11.gif) — https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif (HTTP 200).
- S12: [12.html](batch-32/12.html) — https://oldcomputer.info/8bit/zx81/ULA/ula.htm (HTTP 200).
- S13: [13.pdf](batch-32/13.pdf) — https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf (HTTP 200).
- S14: [14.html](batch-32/14.html) — https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Tech%20specs/Connectors.html (HTTP 200).
- S15: [15.html](batch-32/15.html) — https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201000/Connectors.html (HTTP 200).
- S16: [16.jpg](batch-32/16.jpg) — https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201000/PCB/PCB%20issue%203.jpg (HTTP 200).
- S17: [17.gif](batch-32/17.gif) — https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Circuit%20Diagrams/ZX%20Spectrum%20Issue%203%20-%20Schaltbild.gif (HTTP 200).
- S18: [18.html](batch-32/18.html) — https://worldofspectrum.org/faq/reference/pinouts.htm (HTTP 200).
- S19: [19.html](batch-32/19.html) — https://sinclair.wiki.zxnet.co.uk/wiki/ZX_Spectrum_ULA (HTTP 200).
- S20: [20.pdf](batch-32/20.pdf) — https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf (HTTP 200).
- S21: [21.html](batch-32/21.html) — https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Tech%20specs/ZX%20Spectrum%20Connectors.html (HTTP 200).

All downloads succeeded. Windows curl failed before HTTP with a Schannel credential error; Python HTTPS fallback fetched the same URLs with a Mozilla user agent. Original files, extracted text and inspected image renders are retained in batch-32/. No URL classified dead.

## Coverage

| kind | items | confirmed | wrong | unverifiable |
|---|---:|---:|---:|---:|
| replacement-modern | 6 | 3 | 1 | 2 |
| connector-pin | 154 | 151 | 3 | 0 |
| chip-pin | 107 | 103 | 3 | 1 |
| clock-row | 6 | 3 | 0 | 3 |
| first-ten | 13 | 6 | 0 | 7 |
| rail | 9 | 3 | 0 | 6 |
| **Total** | **295** | **269** | **7** | **19** |

## Per-item ledger

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | ga40007 | AMSGateArray, 40007 version | CONFIRMED | S0 README: Current status; The boards | XC95288XL, 5 V tolerant I/O, 3.6 V regulator and DIP-40 carriers stated; 40007 not tested in a CPC464. Repository banner dates archive to September 21, 2024. |
| 1 | ga40010 | AMSGateArray, 40010 version | UNVERIFIABLE | S0 README: Current status; Testing; The boards | CPC6128 tests, asynchronous vsync/casgen and irqack loop are documented. Source is silent on 40008 pin compatibility; it describes only 40007 and 40010 carriers. |
| 2 | pla82s100 | C16 / Plus/4 only: PLA264 (programmed for the 251641-02) | UNVERIFIABLE | S1 README: PLA264 | 251641-02 replacement for C16, C116 and Plus/4, using programmed GAL16V8, is supported. Source is silent on the explicit assertion that a C64 replacement cannot work. |
| 3 | elk_ula | JamSoft Electron ULA (iCE40 FPGA) | CONFIRMED | S2 README: Missing features; Development; Installing into the Electron | iCE40 board/socket adapter, replacement 68-pin PGA or SIL socket, ignored NMI and likely peripheral crashes are documented. Author states he is drawing a line and publishing as-is; this is not a guarantee of no future development. |
| 4 | vic2 | VIC-II Kawari | CONFIRMED | S3 README: chip models; C64-C; clock source; Limitations/Caveats | All four revision numbers, configurable NTSC/PAL followed by cold boot, onboard oscillators, disconnected VDD and C.SRC/cartridge pin 6 cautions are present. Voltage compatibility does not guarantee short-board operation; source lists further caveats. |
| 5 | vdp9918 | PICO9918 / PICO9918 PRO | WRONG | S4 README: introduction; Hardware / PRO v2.x; Early prototype videos | Medium: RP2040 is incomplete for the combined PICO9918/PRO entry: current PRO v2.0 uses RP2350. The source distinguishes RP2040 and RP2350 variants. TI99 tests, VGA/default and HDMI/SCART dongles, power-off swap, and v0.2/v0.3 GROMCLK history match. |
| 6 | spectrumplus2-rgb | 2 BRIGHT | WRONG | S5 RGB pin table; S6 manual HTML p.3 | High: pin 2 is 0V/ground, not BRIGHT. Type, description and 0V expectation are right; name is wrong. |
| 7 | spectrumplus2-rgb | 3 0V | WRONG | S5 RGB pin table; S6 manual HTML p.3 | High: pin 3 is BRIGHT (LK7 default), or AUDIO OUT (LK8, 200 mV p-p), not 0V. Description matches, name is wrong. |
| 8 | spectrumplus2-rgb | 4 CSYNC | CONFIRMED | S5 RGB pin table and link defaults; S6 HTML p.3 | Pin 4: TTL composite sync. |
| 9 | spectrumplus2-rgb | 5 VSYNC | CONFIRMED | S5 RGB pin table and link defaults; S6 HTML p.3 | Pin 5: vertical sync on default LK1; +12V via LK3. |
| 10 | spectrumplus2-rgb | 6 GREEN | CONFIRMED | S5 RGB pin table and link defaults; S6 HTML p.3 | Pin 6: TTL green. |
| 11 | spectrumplus2-rgb | 7 RED | CONFIRMED | S5 RGB pin table and link defaults; S6 HTML p.3 | Pin 7: TTL red. |
| 12 | spectrumplus2-rgb | 8 BLUE | CONFIRMED | S5 RGB pin table and link defaults; S6 HTML p.3 | Pin 8: TTL blue. |
| 13 | acia6850 | 3 Rx CLK | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 3 = Rx CLK. Pin and direction match the pin assignment and interface description. Clock division supports 1, 16 or 64 times the bit rate (PDF pp.1,6,8). |
| 14 | acia6850 | 4 Tx CLK | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 4 = Tx CLK. Pin and direction match the pin assignment and interface description. Clock division supports 1, 16 or 64 times the bit rate (PDF pp.1,6,8). |
| 15 | acia6850 | 5 /RTS | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 5 = /RTS. Pin and direction match the pin assignment and interface description. RTS follows control bits CR5/CR6 (PDF p.9). |
| 16 | acia6850 | 6 Tx Data | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 6 = Tx Data. Pin and direction match the pin assignment and interface description. |
| 17 | acia6850 | 7 /IRQ | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 7 = /IRQ. Pin and direction match the pin assignment and interface description. Active-low open-drain IRQ described on PDF p.6. |
| 18 | acia6850 | 8 CS0 | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 8 = CS0. Pin and direction match the pin assignment and interface description. |
| 19 | acia6850 | 9 /CS2 | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 9 = /CS2. Pin and direction match the pin assignment and interface description. |
| 20 | acia6850 | 10 CS1 | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 10 = CS1. Pin and direction match the pin assignment and interface description. |
| 21 | acia6850 | 11 RS | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 11 = RS. Pin and direction match the pin assignment and interface description. RS low selects control/status; high selects data (PDF p.6). |
| 22 | acia6850 | 13 R/W | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 13 = R/W. Pin and direction match the pin assignment and interface description. |
| 23 | acia6850 | 14 E | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 14 = E. Pin and direction match the pin assignment and interface description. |
| 24 | acia6850 | 15 D7 | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 15 = D7. Pin and direction match the pin assignment and interface description. |
| 25 | acia6850 | 16 D6 | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 16 = D6. Pin and direction match the pin assignment and interface description. |
| 26 | acia6850 | 17 D5 | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 17 = D5. Pin and direction match the pin assignment and interface description. |
| 27 | acia6850 | 18 D4 | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 18 = D4. Pin and direction match the pin assignment and interface description. |
| 28 | acia6850 | 20 D2 | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 20 = D2. Pin and direction match the pin assignment and interface description. |
| 29 | acia6850 | 21 D1 | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 21 = D1. Pin and direction match the pin assignment and interface description. |
| 30 | acia6850 | 23 /DCD | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 23 = /DCD. Pin and direction match the pin assignment and interface description. DCD high inhibits/initializes receiver; interrupt depends on receive enable and running Rx clock (PDF p.9). |
| 31 | acia6850 | 24 /CTS | CONFIRMED | S7 PDF p.1 and interface text PDF pp.6,8-9 | Pin 24 = /CTS. Pin and direction match the pin assignment and interface description. CTS high inhibits TDRE (PDF pp.8-9). |
| 32 | zx80 | Crystal X1 | CONFIRMED | S8 single sheet: X1, bottom left | X1 labelled 6.5 MHz. |
| 33 | zx80 | CPU clock | CONFIRMED | S8 single sheet: IC18 divider and IC1 | 6.5 MHz X1 divided by two in IC18 feeds Z80 pin 6: 3.25 MHz. Drawing rounds the output label to 3.2 MHz. |
| 34 | zx80-edge | A1 D7 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A1 = D7; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 35 | zx80-edge | A3 KEYWAY | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A3 = KEYWAY; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 36 | zx80-edge | A4 D0 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A4 = D0; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 37 | zx80-edge | A5 D1 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A5 = D1; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 38 | zx80-edge | A6 D2 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A6 = D2; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 39 | zx80-edge | A7 D6 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A7 = D6; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 40 | zx80-edge | A8 D5 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A8 = D5; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 41 | zx80-edge | A9 D3 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A9 = D3; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 42 | zx80-edge | A10 D4 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A10 = D4; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 43 | zx80-edge | A11 /INT | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A11 = /INT; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 44 | zx80-edge | A12 /NMI | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A12 = /NMI; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 45 | zx80-edge | A13 /HALT | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A13 = /HALT; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 46 | zx80-edge | A14 /MREQ | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A14 = /MREQ; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 47 | zx80-edge | A15 /IORQ | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A15 = /IORQ; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 48 | zx80-edge | A16 /RD | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A16 = /RD; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 49 | zx80-edge | A17 /WR | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A17 = /WR; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 50 | zx80-edge | A19 /WAIT | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A19 = /WAIT; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 51 | zx80-edge | A20 /BUSRQ | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A20 = /BUSRQ; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 52 | zx80-edge | A22 /M1 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A22 = /M1; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 53 | zx80-edge | A23 /RFSH | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | A23 = /RFSH; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 54 | zx80-edge | B2 +9V | WRONG | S8 single sheet: edge rows; S9 Expansion Bus/Errata | Medium: +9V/B2 mapping is right, but the cited ZX80 schematic labels input 9-11 V, not the claimed 7-11 V. S9 states nominal 9V, not a 7V minimum. |
| 55 | zx80-edge | B3 KEYWAY | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B3 = KEYWAY; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 56 | zx80-edge | B4 0V | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B4 = 0V; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 57 | zx80-edge | B5 0V | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B5 = 0V; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 58 | zx80-edge | B6 /CLK | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B6 = /CLK; numbered from the edge-row ends in the drawing (A component side, B underside). 6.5MHz divided by two gives 3.25MHz at this clock net. |
| 59 | zx80-edge | B8 A1 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B8 = A1; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 60 | zx80-edge | B9 A2 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B9 = A2; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 61 | zx80-edge | B10 A3 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B10 = A3; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 62 | zx80-edge | B11 A15 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B11 = A15; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 63 | zx80-edge | B12 A14 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B12 = A14; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 64 | zx80-edge | B13 A13 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B13 = A13; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 65 | zx80-edge | B15 A11 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B15 = A11; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 66 | zx80-edge | B16 A10 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B16 = A10; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 67 | zx80-edge | B17 A9 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B17 = A9; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 68 | zx80-edge | B18 A8 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B18 = A8; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 69 | zx80-edge | B19 A7 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B19 = A7; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 70 | zx80-edge | B20 A6 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B20 = A6; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 71 | zx80-edge | B21 A5 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B21 = A5; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 72 | zx80-edge | B22 A4 | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B22 = A4; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 73 | zx80-edge | B23 N/C | CONFIRMED | S8 single sheet: edge rows; S9 Expansion Bus/Errata | B23 = N/C; numbered from the edge-row ends in the drawing (A component side, B underside). ZX80 ROMCS omission is explicitly corrected in S9 Errata. |
| 74 | zx80 | +5 V | UNVERIFIABLE | S8 single sheet: IC1 and IC22 | +5V at Z80 pin11 and IC22=7805 are verified. Source is silent on the diagnostic claim identifying regulator failure or a short as causes of low voltage. |
| 75 | zx80 | CPU clock | CONFIRMED | S8 single sheet: X1, IC18, IC1 | X1=6.5MHz; IC18 divides by two and clock goes to Z80 pin6, about 3.25MHz. Following X1 and divider is supported by the actual path. |
| 76 | zx80 | +9 V DC in | UNVERIFIABLE | S8 single sheet: power input and IC22 | 9V input, edge B2 and IC22=7805 verified. This drawing abstracts the power socket and does not identify which jack contact is the tip; the polarity claim needs the operating manual or S9, neither cited by this item. |
| 77 | zx80 | +5 V | CONFIRMED | S8 single sheet: power net, IC1, IC3/IC4 | IC22=7805 output is +5V, connected to Z80 pin11 and both 2114 pin18 supplies. |
| 78 | zx80 | GND | CONFIRMED | S8 single sheet: ground net | Z80 pin29, 2114 pin9 and expansion B4/B5 all join 0V. |
| 79 | zx80-power | S 0V | CONFIRMED | S9 Power Supply; S10 PDF p.6 | S9 explicitly identifies shaft/sleeve as ground, center/tip as positive 9V. |
| 80 | zx80-ear | T EAR | CONFIRMED | S8 single sheet: EAR/MIC/modulator; S9; S10 PDF p.6 | EAR tip is tape input; S9 identifies recorder EAR/line-out as source. |
| 81 | zx80-ear | S 0V | CONFIRMED | S8 single sheet: EAR/MIC/modulator; S9; S10 PDF p.6 | EAR sleeve joins common 0V. |
| 82 | zx80-mic | T MIC | CONFIRMED | S8 single sheet: EAR/MIC/modulator; S9; S10 PDF p.6 | MIC tip is tape output, from SYNC via the shown output network. |
| 83 | zx80-mic | S 0V | CONFIRMED | S8 single sheet: EAR/MIC/modulator; S9; S10 PDF p.6 | MIC sleeve joins common 0V. |
| 84 | zx80-tv | 2 GND | CONFIRMED | S8 single sheet: EAR/MIC/modulator; S9; S10 PDF p.6 | Modulator RF socket shell is grounded in the diagram. |
| 85 | zx80 | Supply | UNVERIFIABLE | S10 PDF p.6 Getting Started | 9V unregulated, 600mA and positive tip are stated. Source is silent on 14V unloaded; that value is in S9 but S9 is not cited by this item. |
| 86 | zx80 | Plug in the right socket | CONFIRMED | S10 PDF p.6 Getting Started | Manual explicitly says wrong power jack prevents operation and does not damage the ZX80. |
| 87 | zx80 | Picture | CONFIRMED | S10 PDF pp.6-7 Getting Started | Tune around UHF channel36; inverse K at lower left; retune gray display and raise brightness if needed. |
| 88 | zx80 | Keyboard and BASIC | UNVERIFIABLE | S10 PDF p.17 The Keyboard | Q produces NEW and NEWLINE clears are directly demonstrated. Source is silent on attributing every no-response state with K showing to the keyboard. |
| 89 | ula_zx81 | 1 A7' | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 1 = A7'; connection and direction match SRC049 and Rea's pin-function groups. ROM-side primed address bus has 1k isolation; character code drives A3-A8 and line counter drives A0-A2 during display refresh. |
| 90 | ula_zx81 | 2 A8' | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 2 = A8'; connection and direction match SRC049 and Rea's pin-function groups. ROM-side primed address bus has 1k isolation; character code drives A3-A8 and line counter drives A0-A2 during display refresh. |
| 91 | ula_zx81 | 3 A2' | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 3 = A2'; connection and direction match SRC049 and Rea's pin-function groups. ROM-side primed address bus has 1k isolation; character code drives A3-A8 and line counter drives A0-A2 during display refresh. |
| 92 | ula_zx81 | 4 A1' | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 4 = A1'; connection and direction match SRC049 and Rea's pin-function groups. ROM-side primed address bus has 1k isolation; character code drives A3-A8 and line counter drives A0-A2 during display refresh. |
| 93 | ula_zx81 | 5 A0' | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 5 = A0'; connection and direction match SRC049 and Rea's pin-function groups. ROM-side primed address bus has 1k isolation; character code drives A3-A8 and line counter drives A0-A2 during display refresh. |
| 94 | ula_zx81 | 6 /RD | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 6 = /RD; connection and direction match SRC049 and Rea's pin-function groups. |
| 95 | ula_zx81 | 7 /IORQ | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 7 = /IORQ; connection and direction match SRC049 and Rea's pin-function groups. |
| 96 | ula_zx81 | 8 /WR | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 8 = /WR; connection and direction match SRC049 and Rea's pin-function groups. |
| 97 | ula_zx81 | 9 /MREQ | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 9 = /MREQ; connection and direction match SRC049 and Rea's pin-function groups. |
| 98 | ula_zx81 | 10 /M1 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 10 = /M1; connection and direction match SRC049 and Rea's pin-function groups. |
| 99 | ula_zx81 | 11 A14 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 11 = A14; connection and direction match SRC049 and Rea's pin-function groups. |
| 100 | ula_zx81 | 12 /RAMCS | UNVERIFIABLE | S11 single sheet; S12 Other outputs | ULA pin 12 = /RAMCS; connection and direction match SRC049 and Rea's pin-function groups. R2=680 ohms and edge A2 are verified. Source does not establish the unconditional diagnostic Stuck HIGH = no RAM for every external-RAM configuration. |
| 101 | ula_zx81 | 13 /ROMCS | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 13 = /ROMCS; connection and direction match SRC049 and Rea's pin-function groups. Rea gives /MREQ OR A14; S11 traces R28=680 ohms to ROM20 and B23. |
| 102 | ula_zx81 | 14 /CLK | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 14 = /CLK; connection and direction match SRC049 and Rea's pin-function groups. Rea explicitly gives 3.25MHz inverse clock at pin14; TR2 drives CPU6. |
| 103 | ula_zx81 | 15 /NMI | WRONG | S12 Control input group; Other outputs; clock/hsync generator | Medium: LOW NMI pulses require the NMI generator to be enabled. Rea documents OUT $FE enabling and OUT $FD disabling it; the probe instruction omits this necessary state condition. Pin15 and its CPU connection are correct. |
| 104 | ula_zx81 | 16 TV/TAPE | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 16 = TV/TAPE; connection and direction match SRC049 and Rea's pin-function groups. |
| 105 | ula_zx81 | 17 /HALT | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 17 = /HALT; connection and direction match SRC049 and Rea's pin-function groups. |
| 106 | ula_zx81 | 18 A15 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 18 = A15; connection and direction match SRC049 and Rea's pin-function groups. |
| 107 | ula_zx81 | 19 D7 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 19 = D7; connection and direction match SRC049 and Rea's pin-function groups. |
| 108 | ula_zx81 | 20 TAPE IN | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 20 = TAPE IN; connection and direction match SRC049 and Rea's pin-function groups. C10 and R33=4.7k connect EAR to pin20. |
| 109 | ula_zx81 | 21 D6 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 21 = D6; connection and direction match SRC049 and Rea's pin-function groups. |
| 110 | ula_zx81 | 22 USA/UK | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 22 = USA/UK; connection and direction match SRC049 and Rea's pin-function groups. UK leaves strap open; US uses R30 to ground. |
| 111 | ula_zx81 | 24 D4 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 24 = D4; connection and direction match SRC049 and Rea's pin-function groups. |
| 112 | ula_zx81 | 25 KBD4 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 25 = KBD4; connection and direction match SRC049 and Rea's pin-function groups. KB1 is the five-way connector, with RP3 pullups. |
| 113 | ula_zx81 | 26 D3 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 26 = D3; connection and direction match SRC049 and Rea's pin-function groups. |
| 114 | ula_zx81 | 28 D2 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 28 = D2; connection and direction match SRC049 and Rea's pin-function groups. |
| 115 | ula_zx81 | 29 KBD2 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 29 = KBD2; connection and direction match SRC049 and Rea's pin-function groups. |
| 116 | ula_zx81 | 30 D1 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 30 = D1; connection and direction match SRC049 and Rea's pin-function groups. |
| 117 | ula_zx81 | 31 KBD1 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 31 = KBD1; connection and direction match SRC049 and Rea's pin-function groups. |
| 118 | ula_zx81 | 32 D0 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 32 = D0; connection and direction match SRC049 and Rea's pin-function groups. |
| 119 | ula_zx81 | 33 KBD0 | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 33 = KBD0; connection and direction match SRC049 and Rea's pin-function groups. |
| 120 | ula_zx81 | 35 OSC | WRONG | S11 single sheet: oscillator beside IC1; S12 oscillator discussion | Medium: X1 is not the only oscillator component outside the ULA. S11 also shows C6=100pF, C7=47pF and R4=18k in the external oscillator network. Pin35 and 6.5MHz are right. |
| 121 | ula_zx81 | 37 A4' | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 37 = A4'; connection and direction match SRC049 and Rea's pin-function groups. ROM-side primed address bus has 1k isolation; character code drives A3-A8 and line counter drives A0-A2 during display refresh. |
| 122 | ula_zx81 | 38 A5' | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 38 = A5'; connection and direction match SRC049 and Rea's pin-function groups. ROM-side primed address bus has 1k isolation; character code drives A3-A8 and line counter drives A0-A2 during display refresh. |
| 123 | ula_zx81 | 39 A6' | CONFIRMED | S11 single sheet IC1; S12 pin table and functional groups | ULA pin 39 = A6'; connection and direction match SRC049 and Rea's pin-function groups. ROM-side primed address bus has 1k isolation; character code drives A3-A8 and line counter drives A0-A2 during display refresh. |
| 124 | rom_zx81 | 1 A7' | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 1 = A7'. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 125 | rom_zx81 | 2 A6' | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 2 = A6'. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 126 | rom_zx81 | 3 A5' | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 3 = A5'. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 127 | rom_zx81 | 4 A4' | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 4 = A4'. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 128 | rom_zx81 | 7 A1' | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 7 = A1'. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 129 | rom_zx81 | 8 A0' | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 8 = A0'. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 130 | rom_zx81 | 9 D0 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 9 = D0. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 131 | rom_zx81 | 10 D1 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 10 = D1. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 132 | rom_zx81 | 11 D2 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 11 = D2. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 133 | rom_zx81 | 14 D4 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 14 = D4. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 134 | rom_zx81 | 15 D5 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 15 = D5. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 135 | rom_zx81 | 16 D6 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 16 = D6. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 136 | rom_zx81 | 17 D7 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 17 = D7. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 137 | rom_zx81 | 18 A11 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 18 = A11. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 138 | rom_zx81 | 19 A10 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 19 = A10. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 139 | rom_zx81 | 20 /ROMCS | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 20 = /ROMCS. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 140 | rom_zx81 | 21 A12 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 21 = A12. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 141 | rom_zx81 | 22 A9 | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 22 = A9. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 142 | rom_zx81 | 23 A8' | CONFIRMED | S11 single sheet IC2; S13 PDF p.7 (printed p.6) IC list | IC2 ROM pin 23 = A8'. Primed A0-A8 are on ULA side of 1k resistors; other address inputs go directly to CPU. ROM data outputs and active-low select are consistent with the circuit; component list identifies 2364. |
| 143 | zx81 | Resonator X1 | CONFIRMED | S11 single sheet: X1/IC1 pin35 | X1 is labelled ceramic 6.5MHz and connects to ULA pin35; oscillator value is common to drawn USA/UK variants. |
| 144 | zx81 | Field rate | UNVERIFIABLE | S11 single sheet: IC1 pin22/R30 | Pin22 is USA/UK strap (USA-only R30 to 0V). Source is silent on numeric 50/60Hz field rates. Pin22 itself is a static selection input, not a field-rate waveform output. |
| 145 | ts1000 | Resonator X1 | UNVERIFIABLE | S11 ZX81 single sheet | ZX81 pin35/X1=6.5MHz is verified. Cited sheet does not identify TS1000 or establish that its oscillator wiring/value follows this circuit. |
| 146 | ts1000 | Field rate | UNVERIFIABLE | S11 ZX81 single sheet | USA strap at ZX81 pin22 is supported; the source neither names TS1000 nor gives numeric 60Hz. Pin22 is a static strap, not the field waveform. |
| 147 | zx81-ear | S 0V | CONFIRMED | S11 single sheet EAR; S14 Ear In | EAR sleeve/common return connects to 0V. |
| 148 | zx81-mic | S 0V | CONFIRMED | S11 single sheet MIC; S14 Mic Out | MIC sleeve/common return connects to 0V. |
| 149 | zx81-edge | A1 D7 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A1 = D7; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 150 | zx81-edge | A2 /RAMCS | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A2 = /RAMCS; numbered from the edge-row ends in the drawing (A component side, B underside). R2 is 680 ohms from ULA pin12; internal RAM side may be overridden by external RAM. |
| 151 | zx81-edge | A3 KEYWAY | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A3 = KEYWAY; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 152 | zx81-edge | A4 D0 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A4 = D0; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 153 | zx81-edge | A5 D1 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A5 = D1; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 154 | zx81-edge | A6 D2 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A6 = D2; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 155 | zx81-edge | A7 D6 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A7 = D6; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 156 | zx81-edge | A8 D5 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A8 = D5; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 157 | zx81-edge | A9 D3 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A9 = D3; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 158 | zx81-edge | A10 D4 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A10 = D4; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 159 | zx81-edge | A11 /INT | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A11 = /INT; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 160 | zx81-edge | A12 /NMI | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A12 = /NMI; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 161 | zx81-edge | A13 /HALT | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A13 = /HALT; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 162 | zx81-edge | A14 /MREQ | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A14 = /MREQ; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 163 | zx81-edge | A15 /IORQ | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A15 = /IORQ; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 164 | zx81-edge | A16 /RD | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A16 = /RD; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 165 | zx81-edge | A17 /WR | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A17 = /WR; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 166 | zx81-edge | A18 /BUSAK | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A18 = /BUSAK; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 167 | zx81-edge | A19 /WAIT | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A19 = /WAIT; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 168 | zx81-edge | A20 /BUSRQ | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A20 = /BUSRQ; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 169 | zx81-edge | A21 /RESET | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A21 = /RESET; numbered from the edge-row ends in the drawing (A component side, B underside). CPU pin26 reset has R15/C5 power-on RC network. |
| 170 | zx81-edge | A23 /RFSH | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | A23 = /RFSH; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 171 | zx81-edge | B1 +5V | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B1 = +5V; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 172 | zx81-edge | B2 +9V | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B2 = +9V; numbered from the edge-row ends in the drawing (A component side, B underside). Input is labelled +7 to 11V in S11; B2 shares that input rail. |
| 173 | zx81-edge | B3 KEYWAY | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B3 = KEYWAY; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 174 | zx81-edge | B4 0V | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B4 = 0V; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 175 | zx81-edge | B5 0V | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B5 = 0V; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 176 | zx81-edge | B7 A0 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B7 = A0; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 177 | zx81-edge | B8 A1 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B8 = A1; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 178 | zx81-edge | B9 A2 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B9 = A2; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 179 | zx81-edge | B10 A3 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B10 = A3; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 180 | zx81-edge | B11 A15 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B11 = A15; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 181 | zx81-edge | B12 A14 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B12 = A14; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 182 | zx81-edge | B13 A13 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B13 = A13; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 183 | zx81-edge | B14 A12 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B14 = A12; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 184 | zx81-edge | B15 A11 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B15 = A11; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 185 | zx81-edge | B16 A10 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B16 = A10; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 186 | zx81-edge | B17 A9 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B17 = A9; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 187 | zx81-edge | B18 A8 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B18 = A8; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 188 | zx81-edge | B19 A7 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B19 = A7; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 189 | zx81-edge | B22 A4 | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B22 = A4; numbered from the edge-row ends in the drawing (A component side, B underside). |
| 190 | zx81-edge | B23 /ROMCS | CONFIRMED | S11 single sheet: edge rows and circuit; S14 Expansion Bus | B23 = /ROMCS; numbered from the edge-row ends in the drawing (A component side, B underside). R28 is 680 ohms from ULA13 to ROM20 and B23; driving the ROM side high deselects the ROM. |
| 191 | zx81 | +5 V on the chips | UNVERIFIABLE | S11 single sheet: supply pins | Z80 pin11, ULA40, ROM24 are +5V. Source is silent on +/-5% tolerance and the claimed diagnosis/order for shorted chips; schematic is not a Z80 voltage specification. |
| 192 | zx81 | ROM select | CONFIRMED | S11 single sheet: IC1/IC2/R28/edge | ULA13 drives ROM20 through R28=680 ohms, with edge B23 on ROM side. External high override and removing external devices to isolate it follow this circuit. |
| 193 | ts1000 | +5 V on the chips | UNVERIFIABLE | S11 ZX81 single sheet | Z80 pin11 and ULA40 shown at +5V for ZX81. Source is silent on +/-5% tolerance and TS1000-specific 6116 pin24; it draws 4118/2114 alternatives instead. |
| 194 | zx81 | +9 V DC in | UNVERIFIABLE | S11 single sheet; S12 Power and ground | +7 to 11V input, C3=22uF, edge B2 and regulator connection verified. Source is silent on a 7805 dropout threshold and power-jack tip identification; requires regulator specification/polarity source. |
| 195 | zx81 | +5 V | UNVERIFIABLE | S11 single sheet supply net; S12 Power and ground | All listed pins verified: Z80 11, ULA40, 2114 18, ROM24, regulator output = +5V. Source is silent on the deterministic claim that hot regulator plus sagging voltage means a shorted part, and on the stated replacement order. |
| 196 | zx81 | GND | CONFIRMED | S11 single sheet supply net; S12 Power and ground | Z80 29, ULA34, 2114 9 and ROM12 all join 0V. |
| 197 | zx81-power | T +9V | CONFIRMED | S13 PDF p.8 section9 and p.9 circuit; S14 Power Supply | Manual permits approximately 8-12V on load with positive jack tip; circuit shows C3/regulator input; S14 supplies 9V nominal/unregulated and about14V unloaded. |
| 198 | zx81-power | S 0V | CONFIRMED | S13 PDF p.8 section9; S14 Power Supply | Positive tip and grounded shaft/sleeve are supported explicitly. |
| 199 | zx81 | Supply on load | CONFIRMED | S13 PDF p.8 section9; PDF p.5 section6(e) | On-load 8-12V, positive tip, minimum600mA/1.2A with printer match section9. Moving black/white stripes lead to checking smoothing or insufficient voltage in section6(e). |
| 200 | zx81 | Regulator warm after two minutes | CONFIRMED | S13 PDF p.5, printed p.4 section6(a,b) | After a couple of minutes the regulator should warm. Cold directs checks to supply/correct socket near keyboard; very hot then cutting out directs checking heatsink attachment. |
| 201 | ts1000 | Adapter on load | UNVERIFIABLE | S13 PDF p.8 section9; PDF p.5 section6(e) | ZX81 input range and symptom advice are documented, but this is not a TS1000 specification. Source is silent on 14V unloaded and does not establish TS1000 applicability. |
| 202 | ts1000 | Regulator warm after two minutes | UNVERIFIABLE | S13 PDF p.5, printed p.4 section6(a,b) | Thermal advice is for ZX81 kits. Source is silent on TS1000 applicability; same-looking regulator is not direct verification of TS1000 diagnostics. |
| 203 | ts1000 | Power in | UNVERIFIABLE | S13 PDF p.8; S15 Power Supply/Expansion Bus; S16 PCB photo | TS1000 connector page supports nominal9V unregulated, tip positive and about14V unloaded, with ZX81-compatible bus. Source is silent on a TS1000-specific 8-12V loaded acceptance range; S13 gives this for ZX81 only. B2 derives from ZX81-compatible layout, not a labelled TS1000 electrical schematic. |
| 204 | ts1000 | +5 V | UNVERIFIABLE | S13 PDF p.8; S15; S16 PCB photo | No cited text specifies 4.9-5.2V or these TS1000 supply pin numbers. Photo shows devices but cannot prove the internal package pin functions or rail tolerance; no 6116 datasheet/TS1000 circuit is cited. |
| 205 | ts1000 | GND | UNVERIFIABLE | S13 PDF p.8; S15; S16 PCB photo | No cited document identifies TS1000 Z80 pin29, ULA34 or 6116 pin12 as ground. Top-side photo does not prove all electrical connections or package pin functions; need a TS1000 schematic/component pinout. |
| 206 | zx81-tv | 1 RF | CONFIRMED | S14 TV Out; S13 PDF p.5 section6(a), p.9 circuit | UHF TV output described by connector page; circuit modulator takes video only, with grounded outer contact and no sound input. |
| 207 | zx81-tv | 2 GND | CONFIRMED | S14 TV Out; S13 PDF p.9 circuit | RF connector outer shell shown at 0V. |
| 208 | ula_spectrum | 1 /CAS | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 1 = /CAS; pin identity checked against S18/S19 and Issue3 schematic (S17). RAM strobes, write decode and priority through R17-R23 are described in S20 p.10; expansion RAM control in p.11. |
| 209 | ula_spectrum | 2 /WR | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 2 = /WR; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 210 | ula_spectrum | 3 /RD | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 3 = /RD; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 211 | ula_spectrum | 4 /WE | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 4 = /WE; pin identity checked against S18/S19 and Issue3 schematic (S17). RAM strobes, write decode and priority through R17-R23 are described in S20 p.10; expansion RAM control in p.11. |
| 212 | ula_spectrum | 5 A0 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 5 = A0; pin identity checked against S18/S19 and Issue3 schematic (S17). RAM strobes, write decode and priority through R17-R23 are described in S20 p.10; expansion RAM control in p.11. |
| 213 | ula_spectrum | 6 A1 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 6 = A1; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 214 | ula_spectrum | 7 A2 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 7 = A2; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 215 | ula_spectrum | 8 A3 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 8 = A3; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 216 | ula_spectrum | 9 A4 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 9 = A4; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 217 | ula_spectrum | 10 A5 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 10 = A5; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 218 | ula_spectrum | 11 A6 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 11 = A6; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 219 | ula_spectrum | 12 /INT | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 12 = /INT; pin identity checked against S18/S19 and Issue3 schematic (S17). S20 p.8 says ULA interrupt every20ms; p.14 describes keyboard scan. |
| 220 | ula_spectrum | 15 U | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 15 = U; pin identity checked against S18/S19 and Issue3 schematic (S17). S20 p.13 describes luminance/sync and colour signals with level shifting. |
| 221 | ula_spectrum | 16 V | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 16 = V; pin identity checked against S18/S19 and Issue3 schematic (S17). S20 p.13 describes luminance/sync and colour signals with level shifting. |
| 222 | ula_spectrum | 17 /Y | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 17 = /Y; pin identity checked against S18/S19 and Issue3 schematic (S17). S20 p.13 describes luminance/sync and colour signals with level shifting. |
| 223 | ula_spectrum | 18 D0 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 18 = D0; pin identity checked against S18/S19 and Issue3 schematic (S17). S20 p.10 explains R1-R8 isolating the CPU and ULA/RAM data buses. |
| 224 | ula_spectrum | 19 KB0 | WRONG | S17 single sheet: KB1 pullups R65-R69; S20 p.14 conflicting prose | Medium: for the cited Issue3 circuit, keyboard pullups are R65-R69, not R64-R68. Pin19=KB0 and low-on-key behavior match. S20 prose says R64-R68, so cited sources conflict; retain the Issue3 component references or explicitly qualify revision. |
| 225 | ula_spectrum | 21 D1 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 21 = D1; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 226 | ula_spectrum | 22 D2 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 22 = D2; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 227 | ula_spectrum | 23 KB2 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 23 = KB2; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 228 | ula_spectrum | 24 KB3 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 24 = KB3; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 229 | ula_spectrum | 27 D4 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 27 = D4; pin identity checked against S18/S19 and Issue3 schematic (S17). S19 port description and S20 p.15 establish D3 MIC write, D4 beeper write, D6 EAR read and common analog pin28. |
| 230 | ula_spectrum | 28 SOUND | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 28 = SOUND; pin identity checked against S18/S19 and Issue3 schematic (S17). S19 port description and S20 p.15 establish D3 MIC write, D4 beeper write, D6 EAR read and common analog pin28. |
| 231 | ula_spectrum | 29 D5 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 29 = D5; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 232 | ula_spectrum | 30 D6 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 30 = D6; pin identity checked against S18/S19 and Issue3 schematic (S17). S19 port description and S20 p.15 establish D3 MIC write, D4 beeper write, D6 EAR read and common analog pin28. |
| 233 | ula_spectrum | 31 D7 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 31 = D7; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 234 | ula_spectrum | 32 CLK | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 32 = CLK; pin identity checked against S18/S19 and Issue3 schematic (S17). S18 gives inhibited CPU clock; S17 has14MHz X1 and TR3 path; S20 p.9 gives TR3 5V amplitude. 3.5MHz is the /4 CPU rate, not the erroneous14MHz CPU wording in S20. |
| 235 | ula_spectrum | 33 /IOULA | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 33 = /IOULA; pin identity checked against S18/S19 and Issue3 schematic (S17). S18 gives A0 OR /IORQ; S17 and S20 p.15 identify TR6 gating. |
| 236 | ula_spectrum | 34 /ROMCS | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 34 = /ROMCS; pin identity checked against S18/S19 and Issue3 schematic (S17). S20 p.10 states A14/A15 low and edge25A/R33 override. |
| 237 | ula_spectrum | 35 /RAS | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 35 = /RAS; pin identity checked against S18/S19 and Issue3 schematic (S17). RAM strobes, write decode and priority through R17-R23 are described in S20 p.10; expansion RAM control in p.11. |
| 238 | ula_spectrum | 36 A14 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 36 = A14; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 239 | ula_spectrum | 37 A15 | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 37 = A15; pin identity checked against S18/S19 and Issue3 schematic (S17). S17 prints27 at A15; S18/S19 both resolve the correct pin to37. |
| 240 | ula_spectrum | 38 /MREQ | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 38 = /MREQ; pin identity checked against S18/S19 and Issue3 schematic (S17). |
| 241 | ula_spectrum | 39 OSC | CONFIRMED | S17 sheet IC1; S18 ULA; S19 5C/6C; S20 pp.8-15 | ULA pin 39 = OSC; pin identity checked against S18/S19 and Issue3 schematic (S17). S18 explicitly identifies14MHz crystal with opposite end capacitively grounded; S17 shows X1/C73. |
| 242 | spectrum-edge | A1 A14 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A1 = A14, independently read in S17 edge table: A=underside, B=component side. |
| 243 | spectrum-edge | A2 A12 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A2 = A12, independently read in S17 edge table: A=underside, B=component side. |
| 244 | spectrum-edge | A3 +5V | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A3 = +5V, independently read in S17 edge table: A=underside, B=component side. Voltage supported by S20 p.17 (+5V +/-0.25V). |
| 245 | spectrum-edge | A4 +9V | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A4 = +9V, independently read in S17 edge table: A=underside, B=component side. Voltage supported by S20 p.26 (+9V +/-2V). |
| 246 | spectrum-edge | A5 SLOT | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A5 = SLOT, independently read in S17 edge table: A=underside, B=component side. |
| 247 | spectrum-edge | A7 0V | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A7 = 0V, independently read in S17 edge table: A=underside, B=component side. |
| 248 | spectrum-edge | A8 /CK | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A8 = /CK, independently read in S17 edge table: A=underside, B=component side. S18/S19 establish clock inhibition during contention; S17 traces the CPU clock to8A. |
| 249 | spectrum-edge | A9 A0 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A9 = A0, independently read in S17 edge table: A=underside, B=component side. |
| 250 | spectrum-edge | A10 A1 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A10 = A1, independently read in S17 edge table: A=underside, B=component side. |
| 251 | spectrum-edge | A11 A2 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A11 = A2, independently read in S17 edge table: A=underside, B=component side. |
| 252 | spectrum-edge | A12 A3 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A12 = A3, independently read in S17 edge table: A=underside, B=component side. |
| 253 | spectrum-edge | A13 /IORQULA | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A13 = /IORQULA, independently read in S17 edge table: A=underside, B=component side. TR6 A0/IORQ gating confirmed by S17, S18 and S20 p.15. |
| 254 | spectrum-edge | A14 0V | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A14 = 0V, independently read in S17 edge table: A=underside, B=component side. |
| 255 | spectrum-edge | A15 VIDEO | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A15 = VIDEO, independently read in S17 edge table: A=underside, B=component side. S21 explains composite colour video, inverted Y with sync, and U/V colour difference; S17 traces ULA17/16/15. |
| 256 | spectrum-edge | A16 /Y | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A16 = /Y, independently read in S17 edge table: A=underside, B=component side. S21 explains composite colour video, inverted Y with sync, and U/V colour difference; S17 traces ULA17/16/15. |
| 257 | spectrum-edge | A17 V | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A17 = V, independently read in S17 edge table: A=underside, B=component side. S21 explains composite colour video, inverted Y with sync, and U/V colour difference; S17 traces ULA17/16/15. |
| 258 | spectrum-edge | A18 U | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A18 = U, independently read in S17 edge table: A=underside, B=component side. S21 explains composite colour video, inverted Y with sync, and U/V colour difference; S17 traces ULA17/16/15. |
| 259 | spectrum-edge | A19 /BUSRQ | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A19 = /BUSRQ, independently read in S17 edge table: A=underside, B=component side. |
| 260 | spectrum-edge | A20 /RESET | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A20 = /RESET, independently read in S17 edge table: A=underside, B=component side. S17 reset pullup R31 and capacitor C27 give the power-on low then high behavior. |
| 261 | spectrum-edge | A21 A7 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A21 = A7, independently read in S17 edge table: A=underside, B=component side. |
| 262 | spectrum-edge | A22 A6 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A22 = A6, independently read in S17 edge table: A=underside, B=component side. |
| 263 | spectrum-edge | A25 /ROMCS | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A25 = /ROMCS, independently read in S17 edge table: A=underside, B=component side. S20 p.10 explicitly specifies external high ROM-disable on25A and R33 isolation. |
| 264 | spectrum-edge | A26 /BUSACK | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A26 = /BUSACK, independently read in S17 edge table: A=underside, B=component side. |
| 265 | spectrum-edge | A27 A9 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A27 = A9, independently read in S17 edge table: A=underside, B=component side. |
| 266 | spectrum-edge | A28 A11 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | A28 = A11, independently read in S17 edge table: A=underside, B=component side. |
| 267 | spectrum-edge | B1 A15 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B1 = A15, independently read in S17 edge table: A=underside, B=component side. |
| 268 | spectrum-edge | B2 A13 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B2 = A13, independently read in S17 edge table: A=underside, B=component side. |
| 269 | spectrum-edge | B3 D7 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B3 = D7, independently read in S17 edge table: A=underside, B=component side. |
| 270 | spectrum-edge | B4 N/C | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B4 = N/C, independently read in S17 edge table: A=underside, B=component side. |
| 271 | spectrum-edge | B5 SLOT | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B5 = SLOT, independently read in S17 edge table: A=underside, B=component side. |
| 272 | spectrum-edge | B6 D0 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B6 = D0, independently read in S17 edge table: A=underside, B=component side. |
| 273 | spectrum-edge | B7 D1 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B7 = D1, independently read in S17 edge table: A=underside, B=component side. |
| 274 | spectrum-edge | B8 D2 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B8 = D2, independently read in S17 edge table: A=underside, B=component side. |
| 275 | spectrum-edge | B9 D6 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B9 = D6, independently read in S17 edge table: A=underside, B=component side. |
| 276 | spectrum-edge | B10 D5 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B10 = D5, independently read in S17 edge table: A=underside, B=component side. |
| 277 | spectrum-edge | B11 D3 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B11 = D3, independently read in S17 edge table: A=underside, B=component side. |
| 278 | spectrum-edge | B12 D4 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B12 = D4, independently read in S17 edge table: A=underside, B=component side. |
| 279 | spectrum-edge | B13 /INT | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B13 = /INT, independently read in S17 edge table: A=underside, B=component side. S20 p.8 states20ms interrupt interval. |
| 280 | spectrum-edge | B14 /NMI | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B14 = /NMI, independently read in S17 edge table: A=underside, B=component side. S17 CPU NMI pin17 has R28 pullup. |
| 281 | spectrum-edge | B15 /HALT | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B15 = /HALT, independently read in S17 edge table: A=underside, B=component side. |
| 282 | spectrum-edge | B16 /MREQ | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B16 = /MREQ, independently read in S17 edge table: A=underside, B=component side. |
| 283 | spectrum-edge | B17 /IORQ | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B17 = /IORQ, independently read in S17 edge table: A=underside, B=component side. |
| 284 | spectrum-edge | B18 /RD | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B18 = /RD, independently read in S17 edge table: A=underside, B=component side. |
| 285 | spectrum-edge | B19 /WR | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B19 = /WR, independently read in S17 edge table: A=underside, B=component side. |
| 286 | spectrum-edge | B20 -5V | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B20 = -5V, independently read in S17 edge table: A=underside, B=component side. Voltage supported by S20 p.17 (-5.5 to -4V). |
| 287 | spectrum-edge | B21 /WAIT | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B21 = /WAIT, independently read in S17 edge table: A=underside, B=component side. |
| 288 | spectrum-edge | B22 +12V | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B22 = +12V, independently read in S17 edge table: A=underside, B=component side. Voltage supported by S20 p.17 (+12V +/-1.2V). |
| 289 | spectrum-edge | B23 -12V | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B23 = -12V, independently read in S17 edge table: A=underside, B=component side. S21 explicitly warns that -12V drifts; S17 shows DC-DC source. |
| 290 | spectrum-edge | B24 /M1 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B24 = /M1, independently read in S17 edge table: A=underside, B=component side. |
| 291 | spectrum-edge | B25 /RFSH | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B25 = /RFSH, independently read in S17 edge table: A=underside, B=component side. |
| 292 | spectrum-edge | B26 A8 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B26 = A8, independently read in S17 edge table: A=underside, B=component side. |
| 293 | spectrum-edge | B27 A10 | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B27 = A10, independently read in S17 edge table: A=underside, B=component side. |
| 294 | spectrum-edge | B28 N/C | CONFIRMED | S17 edge table/circuit; S21; S20 pp.10,17,26 as applicable | B28 = N/C, independently read in S17 edge table: A=underside, B=component side. |
