# Sinclair verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| Zilog Z80 CPU User Manual UM0080 | https://www.zilog.com/docs/z80/um0080.pdf#page=19 | Z80 pin configuration (Fig. 3) and pin functions, pp. 5-7 |
| ZX81 circuit diagram, drawing SRC 049 (k1) | https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif | ULA IC1, ROM IC2, Z80 IC3, 2114 IC4a/b pin numbers; edge connector 1A-23A / 1B-23B; +7 to 11 V DC input |
| ZX81 Service and Assembly Manual (transcribed, k1) | https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf#page=8 | Component list (IC2 2364, 4118 or 2 x 2114, UM1233, 3 x 3.5 mm jacks), 6 Fault finding (p. 4), 9 Power supply (tip positive, 8-12 V, 600 mA / 1.2 A) |
| Andy Rea, ZX81 ULA notes (oldcomputer.info) | https://oldcomputer.info/8bit/zx81/ULA/ula.htm | ZX81 ULA pin functions and directions (secondary) |
| Sinclair ZX Archive, ZX81 / ZX80 / Spectrum Connectors pages | https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Tech%20specs/Connectors.html, .../80/Sinclair%20ZX80/Tech%20specs/Connectors.html, .../82/Sinclair%20ZX%20Spectrum/Tech%20specs/ZX%20Spectrum%20Connectors.html | Jack types and order, power polarity (ZX80/81 centre +9 V; Spectrum centre GND), no-load voltages, expansion bus drawings, A/B side naming note, ZX80 /ROMCS erratum |
| ZX80 Operating Manual (k1) | https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX80/ZX80%20Operating%20Manual.pdf#page=6 | 9 V DC 600 mA, tip positive, sockets MIC/EAR/POWER + phono, UHF ch 36 |
| ZX80 circuit diagram (k1) | https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX80/Tech%20specs/ZX80%20Schematics.gif | Edge connector rows, IC list (IC1 780-1, IC3/IC4 2114, IC22 7805), 6.5 MHz X1 |
| ZX Spectrum Service Manual (Spectrum For Everyone edition, k1) | https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf | 1.3-1.11 operation, 3.1.2 voltages, 3.1.4 current draw, 5.2 PSU limits, 5.3.1 checks, 6.1 TR4, 8.7 connectors, 9.2/9.6 DC-DC mod |
| ZX Spectrum Issue 3 circuit diagram (k1) | https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Circuit%20Diagrams/ZX%20Spectrum%20Issue%203%20-%20Schaltbild.gif | ULA IC1 6C001 pin numbers; edge connector table (UNDER SIDE A / COMP SIDE B); PSU |
| ZX Spectrum Introduction manual (k1) | https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Introduction%20Manual.pdf#page=7 | 9 V DC 1.4 A unregulated |
| World of Spectrum FAQ, Pinouts | https://worldofspectrum.org/faq/reference/pinouts.htm | ULA pinout, 128 and +2A/+3 RGB, PSU table |
| Sinclair Wiki, ZX Spectrum ULA | https://sinclair.wiki.zxnet.co.uk/wiki/ZX_Spectrum_ULA | 5C/6C ULA pinout (second source) |
| Mostek 1980 Memory Data Book (bitsavers) | http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf#page=98 | MK4116 pin connections (PDF p. 98); Vbb sequencing note (PDF p. 107) |
| OKI 1983 Memory Data Book (bitsavers) | http://www.bitsavers.org/components/oki/_dataBooks/1983_OKI_Memory_Data_Book.pdf#page=66 | MSM3732 pin configuration |
| TI 1982 MOS Memory Data Book (bitsavers) | http://www.bitsavers.org/components/ti/_dataBooks/1982_LCC7061_TI_MOS_Memory_Data_Book.pdf#page=40 | TMS 4164 pin diagram |
| TI 1980 MOS Memory Data Book (bitsavers) | http://www.bitsavers.org/components/ti/_dataBooks/1980_TI_The_MOS_Memory_Data_Book_for_Design_Engineers.pdf#page=83 | TMS 2114 pin diagram |
| GI 1982 Microelectronics Data Catalog (bitsavers) | http://www.bitsavers.org/components/gi/_dataBooks/1982_GI_Microelectronics_Data_Catalog.pdf#page=299 | AY-3-8910/8912 pin configurations and functions |
| Spectrum 128 Service Manual (k1) | https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B%20128K/Repair/ZX%20Spectrum%2B%20128K%20Service%20Manual.pdf | 2.2 master clock and RF sound, 5.7 RS232/MIDI, 5.8 keypad, 6 power supplies, parts lists |
| Spectrum 128 Introduction manual p. 3 (WoS) | https://worldofspectrum.net/ZXSpectrum128Manual/sp128p03.html | 128 RGB pin table; EAR/MIC on the left |
| Spectrum +3 manual, chapters 1, 8 pt 30, 10 (WoS) | https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter10.html | Every +3 socket table; 6-pin DIN PSU; clocks |
| Spectrum +2A/+3 Service Manual (HTML, k1) | https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B3/Repair/Service%20Manuals/Service%20Manual%20%2B2A%2C%20%2B3A/ | Spec, flow chart, circuit diagram (40077, joysticks) |
| +2 review (k1) | https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B2/ZX%20Spectrum%2B2%20Review.html | Grey +2 port list |
| Spectrum 128 SCART cable pages, +2 RGB (community) | https://homepages.plus.net/fruitcake/Sinclair/Spectrum128/SCARTCable/Spectrum128SCARTCablePlus2.htm | Grey +2 RGB pins and links (secondary, marked verify) |
| ZX81 / Spectrum BASIC Programming manuals (k1) | https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/ZX81%20Basic%20Programming.pdf, https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/ZX%20Spectrum%20BASIC%20programming%20(scanned%20by%20ST).pdf | Quickref sources |

All URLs returned HTTP 200 on 2026-10-30 (cpcwiki.eu, needed for the +3 PSU pinout, returned 403 and is not cited).

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| cpuz80 | 40/40 | Zilog UM0080 Fig. 3 and Pin Functions |
| ula_zx81 | 40/40 | ZX81 circuit diagram SRC 049; Rea notes for functions |
| sram2114 | 18/18 | TI TMS 2114 data sheet; ZX81 diagram |
| rom_zx81 | 24/24, new table | ZX81 circuit diagram SRC 049 (IC2); assembly manual (2364) |
| dram4116 | 16/16 | Mostek MK4116 data sheet |
| dram4532 | 16/16, new table | OKI MSM3732; TI TMS 4164; Spectrum SM 1.5.3 and 5.3.1.2 |
| ula_spectrum | 40/40 | Spectrum Issue 3 diagram; WoS FAQ; Sinclair Wiki; SM 1.3-1.10 |

Totals: 194 pins checked (154 existing, 40 new), 0 chip pins left `verify`. ay8912 (28 pins) was also checked against the GI data sheet, then removed from this file because timex.js now defines it with pins.

## Changes

| Chip or connector | Pin | Old → new | Source |
|---|---|---|---|
| ula_zx81 | 1-5, 36-39 (A0'-A8') | dir in → bidir (ULA drives them in display refresh cycles) | Rea notes; diagram (1 kohm to CPU) |
| ula_zx81 | 14 | /CLK "clock input from the Z80" in → CPU clock OUTPUT (drives Z80 pin 6 via TR2) | diagram; Rea |
| ula_zx81 | 22, 34, 35, 40 | UK/US → USA/UK; GND → 0V; "crystal" → 6.5 MHz ceramic resonator; VCC → +5V | diagram |
| ula_spectrum | 5-11 | A0-A6 "from the Z80" in → multiplexed lower-RAM address outputs | SM 1.5.2, 1.7 |
| ula_spectrum | 17 | Y → /Y (inverted luma with sync) | WoS FAQ |
| ula_spectrum | 19, 20, 23, 24, 26 | T0-T4 → KB0-KB4 | Issue 3 diagram |
| ula_spectrum | 28 | SOUND dir out → bidir (MIC, EAR and beeper on one pin) | SM 1.9 |
| ula_spectrum | 35 | /RAS "to the 4116s and the upper RAM" → lower 16K only (upper RAM strobes from IC23/IC24) | SM 1.5.3 |
| ula_spectrum | 39 | Q → OSC | Issue 3 diagram |
| ula_spectrum | summary | "holds /WAIT on contended RAM" → stops the CPU clock | SM 1.3.4, 1.5.2 |
| terms `wait`, `ula` | — | Spectrum contention via /WAIT → via clock stop | SM 1.3.4 |
| rom_zx81 | all | pins null → 24-pin 2364 table | diagram IC2 |
| dram4532 | all | pins null → 16-pin table | OKI MSM3732, TMS 4164 |
| dram4116, sram2114, cpuz80 | 4, 15 / 8 / 6, 17, 24 | Sinclair-specific text ("from the ULA", ZX81, Spectrum, C128) → machine-neutral | — |
| ay8912, scld_tx2068 | — | removed (timex.js owns them with pins) | coordinator |
| zx81-power | — | barrel, pins '?' → 3.5 mm jack (`ts`), TIP POSITIVE | assembly manual 9; k1 |
| spectrum-tv | — | "Picture and beeper share this lead" → picture only (48K sound is the internal speaker; RF sound is new on the 128) | SM 1.7; 128 SM 1.3, 2.2 |
| spectrum-edge | — | sides: A = UNDERSIDE, B = component side (brief said A = component side) | Issue 3 diagram table; SM 1.5.1 (ROMCS on 25A) |
| zx81/spectrum connectors | — | all `n: '?'` entries replaced by full tables | above |

## Conflicts

- spectrum128-edge A23 / B23: 128 SM 6.4 lists +12 V on 23A and pulsed +12 V on 23B; the 48K table has A5 and -12 V. Recorded as `conflict` on the pins.
- spectrumplus3-rs232 pin 2: +3 manual AUX section says AY bit 7 = "RS232 pin 5 (TXD in)"; its RS232 table puts TXD on pin 2. Recorded as `conflict`.
- +3 AUX: manual text says inputs on pins 2 and 5; its table says 3 and 5 (table used).
- Spectrum SM 1.3 says the Z80A is "clocked at 14.0 MHz" and the 5.3.1 table pairs the CPU clock points with "14MHz"; the CPU clock is 3.5 MHz (14 MHz / 4). 3.5 MHz kept.
- Issue 3 diagram prints ULA A15 as pin 27; 27 is D4 on the same drawing, WoS and the wiki give 37. 37 kept.
- ZX81 PSU: WoS FAQ table says 9 V 500 mA; the assembly manual asks for at least 600 mA. Brief's 700 mA not found in any source.
- WoS FAQ AY-3-8912 table (pin 2 PORT, pins 14/15 CLOCK) contradicts the GI data sheet; not used.

## Still missing

- ula_128 pin table (128 7K010E-5 48-pin, +2 40056, +2A/+3 40077): no pinout found in the 128 SM text or the +3 SM.
- scld_tx2068: left to timex.js.
- LM1889 (Spectrum IC14) and 7805 not added as chips: SM 7.1 has an LM1889 signal table but no data sheet was fetched; the 7805 `pkg` cannot pass the DIP-n check.
- Connector tables not sourced: spectrum128-keypad, spectrum128-rs232 (BT 603A, k1 128 SM figures are images); spectrumplus2-power, -tv, -sound, -rs232, -keypad (the +2 service manual is an image-only scan); spectrumplus3-power (6-pin DIN pinout: cpcwiki 403) and spectrumplus3-tv. These have no `geo`, hence the no-geo WARNs.
- PSU data: grey +2 and +3 ratings; 128 rating only as OCR text "9V 1.85A"; 48K and 128 polarity rests on k1 only (pins marked `verify`).
- Connector pins kept `verify`: spectrum and 128 power polarity (4), +2 RGB (8, community source), +2 joystick (9, taken from the +3 manual), +3 TAPE/SOUND tip/ring (2, read from ASCII art), +3 DISK B pin 6 "D4" (1).
- Edge pin-1 end (right) follows the k1 drawings and the +3 manual "viewed from rear"; not confirmed for the ZX80/81 and 48K by a Sinclair document.
- WARNs "has connectors/power but status sheet" for zx80, spectrum128, spectrumplus2, spectrumplus3 are expected: the brief asked for those blocks on all six machines.

## For other files

- timex.js `ay8912`: pin table matches the GI data sheet (all 28 pins). Its pin text is TS2068-specific (port A joystick bits, 1.764 MHz clock, BC2 and A8 tied) and now also shows on the Spectrum 128, +2 and +3, where port A runs RS232/MIDI/keypad and the clock is 1.7734 MHz. Suggest neutral pin text with the TS2068 details in its summary.
- commodore.js `rom23128` (Spectrum IC5): pins 20 and 27 are mask-programmed select inputs whose sense differs by maker. The Spectrum Issue 3 diagram table: pin 20 = CE on NEC, CS on Hitachi; pin 27 = CS on NEC, CE on Hitachi; board links H/N swap them (SM 1.5.1, 4.6). The current pin 20/22/27 text is C16-specific ("TED ROM selects", "C16 SM /CS2").
- src/connectors.js (not a data file): the `ab` edge scheme always draws row A on top. On the 48K/128/+2 Spectrum, side A is the underside, so the drawing is upside down relative to the machine; the summary says so, but a per-connector option to put row B on top would fix it.
