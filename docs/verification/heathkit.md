# Heathkit verification — 2026-10-30

## Sources used

| Title | URL | Covered |
|---|---|---|
| Motorola MC6802/6808/6802NS DS9818-R3 | https://alshapton.github.io/MC6800Catalogue/_downloads/b25ee82e53f4fdcaf7ce3b25eca70a01/DS-MC6802-6808-6802NS.pdf | cpu6808 pins (p. 1, 7-8, 11) |
| Motorola MC6821 DS9435-R3 (bitsavers) | https://bitsavers.org/components/motorola/_dataSheets/6821.pdf | pia6821 pins |
| Motorola MC6850 DS9493R4 | https://ipv4.pccomponents.com/datasheets/MOTOR-MC6850P.pdf | acia6850 pins |
| Motorola MC146818A ADI-1026 | https://www.scs.stanford.edu/22wi-cs212/pintos/specs/mc146818a.pdf | rtc146818 pins (p. 1, 8-10) |
| Hitachi 1984 IC Memory Data Book, HM6116 p. 65 | https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf#page=67 | sram6116 pins |
| Intel 1983 Memory Component Handbook, 2764 p. 4-19, 27128 p. 4-29 | https://bitsavers.org/components/intel/_dataBooks/1983_Memory_Component_Handbook.pdf | rom2764, rom27128 pins |
| TI SN74LS138 SDLS014 | https://www.ti.com/lit/ds/symlink/sn74ls138.pdf | ls138 pins |
| TI/National ADC0804 SNOSBI1C | https://www.ti.com/lit/ds/symlink/adc0804-n.pdf | adc0804 pins |
| TI/National ADC0831-N SNAS531B | https://www.ti.com/lit/ds/symlink/adc0831-n.pdf | adc0831 pins |
| Votrax SC-01 data sheet (1980) | https://www.redcedar.com/sc01/sc01.pdf | sc01a pins |
| TI TL851 SLSS004 / TL852 SLSS003 | https://www.ti.com/lit/ds/symlink/tl851.pdf, https://www.ti.com/lit/ds/symlink/tl852.pdf | tl851, tl852 pins (new) |
| OKI 1986 Microprocessor Data Book, MSM5832RS p. 251-257 | https://bitsavers.org/components/oki/_dataBooks/1986_OKI_Microprocessor_Databook.pdf#page=254 | msm5832 pins (new) |
| Signetics 1982 MOS Microprocessor Data Manual, SC2661 p. 1-52 | https://bitsavers.org/components/signetics/_dataBooks/1982_Signetics_MOS_Microprocessor_Data_Manual.pdf#page=57 | epci2661 pins (new) |
| Silicon Systems 1985 Data Book, SSI 263A p. 1-42 | https://bitsavers.org/components/siliconSystems/_dataBooks/1985_Silicon_Systems_Data_Book.pdf#page=50 | sc02 pins (new; SSI 263A listed as SC-02 compatible) |
| HEATHKIT HERO-1 ET-18 manuals and schematics (archive.org; same files as the local set) | https://archive.org/details/heathkit-hero-1-ET-18 | TM (specs p. 9, Fig. 4, adjustments p. 47, circuit p. 73-83), schematic sheets 2-4, block interconnect diagram, speech board sheets 2-3, Assembly Manual p. 14-16 |
| HERO 1 Advanced Programming and Interfacing (archive.org) | https://archive.org/details/hero1advancedpro0000robi | Tables 6-2 to 6-21, printed p. 97-104: every CPU and I/O board connector |
| HERO Jr Technical Manual 595-3271 (archive.org) | https://archive.org/download/hero-jr-technical/HeroJr%20595-3271%20Technical.pdf | Charger, regulators, RS-232, troubleshooting, parts (p. 13-25, 42) |
| HERO Jr Schematics 595-3271 (archive.org) | https://archive.org/download/hero-jr-schematics/HeroJr%20595-3271%20Schematics.pdf | Sheet 1 interconnect: J1/P1, P201-P206, P301-P311, J2 |
| HERO Jr RS-232 accessory manual (archive.org) | https://archive.org/download/hero-jr-rs-232/HeroJr%20RS232.pdf | J2 wiring, Detail 2-3D (p. 7-8) |
| HERO Jr Owner's Guide (archive.org) | https://archive.org/download/HEROJrOwnersGuide/HERO%20Jr%20Owner%27s%20Guide.pdf | Charging, fuse, troubleshooting |
| HERO 2000 ET-19 Schematic Diagrams 595-3416 (archive.org) | https://archive.org/details/heathkit-hero-2000-et-19-schematic-diagrams-595-3416 | CPU (p. 2), power supply (p. 4), backplane (p. 6), I/O (p. 8), charger (p. 11) |
| Hero-ROMS Hero2_IOPal.html, Hero2_MemPal.html (local P:\Hero-ROMS) | https://github.com/diivious/Hero-ROMS | HERO 2000 port map, interrupt map, PAL output pins |
| HERO Robot FAQ | https://www.hero.dsavage.net/robots/Hero_FAQ.html | Second source: batteries, chargers, HERO 2000 specs |

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| cpu6808 | 40 (pin 35 keeps verify) | Motorola DS9818-R3 |
| pia6821 | 40 | Motorola DS9435-R3 |
| acia6850 | 24 | Motorola DS9493R4 |
| rtc146818 | 24 | Motorola ADI-1026 |
| sram6116 | 24 | Hitachi HM6116, 1984 data book p. 65 |
| rom2764 | 28 | Intel 1983 handbook p. 4-19 |
| rom27128 | 28 | Intel 1983 handbook p. 4-29 |
| ls138 | 16 | TI SDLS014 |
| adc0804 | 20 | TI/National SNOSBI1C |
| adc0831 | 8 | TI/National SNAS531B; HERO Jr schematic sheet 1 (pin 8 = +5SW) |
| sc01a | 22 | Votrax SC-01 1980 |
| tl851 (new) | 16 (pin 13 keeps verify) | TI SLSS004 |
| tl852 (new) | 16 | TI SLSS003 |
| msm5832 (new) | 18 | OKI 1986 data book |
| epci2661 (new) | 28 | Signetics 1982 data manual |
| sc02 (new) | 24 | Silicon Systems SSI 263A, 1985 data book |

Total: 376 chip pins checked against a datasheet, 2 still flagged.

## Changes

| Chip or connector | Pin | Old → new | Source |
|---|---|---|---|
| rom2764 | 26 | A13 → NC | Intel 2764 pinout |
| rom27128 | 27 | A14 → /PGM (A13 stays on 26) | Intel 27128 pinout |
| rtc146818 | 16 | STBY, power, "battery input" → /STBY, ctrl in, active low (bus lockout; no battery pin) | ADI-1026 p. 8-10 |
| rtc146818 | 22 | PS dir out → in (power-sense input clears VRT) | ADI-1026 |
| pia6821 | 19 | CB2 dir out → bidir | DS9435-R3 |
| cpu6808 | 3 | /MR active low → MR active high | DS9818-R3 p. 11 |
| sc01a | 15, 16, 20, 21 | MCX "or timing resistor node" → external clock input; MCRC bidir → in (RC input); CB "audio output group" → class B current source; AF "filter output, out" → audio feedback, in | SC-01 p. 4 |
| sc01a | 5, 6, 17 | verify cleared (TPx = no connection) | SC-01 p. 2 |
| cpu6808, pia6821, acia6850 | many | HERO-specific pin text moved to the chip summary (shared chips keep machine-neutral pin text) | task rule |
| tl851, tl852, msm5832, epci2661, sc02 | all | pins: null → full tables; packages DIP-16, DIP-16, DIP-18, DIP-28, DIP-24 | datasheets above |
| cpu8088 | — | local definition removed; listed in hero2000 with `chipLocations` U311 (443-1089) | HERO 2000 schematic p. 2 |
| hero2000 machine | — | "6808 sub-processors" removed: the FAQ says six slave processors, type not given; the I/O map has two-port controller slots | HERO FAQ 2.3.2; Hero2_IOPal |
| hero1-p501 | 1-12 | phoneme bit order traced (pins 5-10 = P5-P0 = $C240 D5-D0, pins 1-2 = D7/D6 to I2/I1); pin 12 NC added | Speech board schematic |
| hero1 testPoints | charger reference | "TP8 to TP9 = 5.6 V" → TP8 to chassis 5.6 V, then TP8-TP9 = 0 V (R225); logic TP1/TP2 with R202 added | TM printed p. 47 |
| herojr rails | Vca | "MC146818 pin 16 (STBY)" → RTC pin 24 (VDD), U209 output | ADI-1026; HERO Jr TM p. 25 |
| herojr-rs232 | — | kept pins 2, 3, 7; geo db25, gender female (female contacts per the accessory manual) | RS-232 manual p. 7-8 |

## Conflicts

- hero1-p314 pins 173-178: Advanced Programming Table 6-13 prints 173, 172, 173, 174, 175, 176 for P5-P0; renumbered 173-178 in sequence.
- hero1-p202 pin 16: power supply schematic brackets 15-16 as "charger jumper" and 17 as "to ON/OFF switch"; the block diagram runs SW2 to 16. 16 and 17 are one node.
- herojr-rs232: schematic sheet 1 draws the connector with only nine positions (pins 1-9, ground at 7); the accessory manual uses holes 2, 3 and 7, which is DB-25 numbering. Entered as DB-25.
- Wire colours on HERO 1 P202 differ between the power supply schematic and the block diagram; pin roles agree.

## Still missing

- HERO 1 experimental board breadboard socket strips: the label 390-2413 is not in the scans; P1301-P1304 pin tables (only P1302-9 ABORT and P1304-10 SLEEP sourced). Looked in the TM, Assembly Manual, User's Guide, Advanced Programming.
- HERO 1 header pad layouts: all headers drawn in number order on one row (assumed); P405 pins 62-77 bit order not given; P402 row bit order not given.
- HERO 1 cassette, arm (P1502) and teaching pendant cable ends; motion board P1401.
- HERO Jr cartridge connector (RTA-1-5), IR motion detector and remote receiver cable ends; P205 pin 2 (on the scan fold); J1 face orientation; battery chemistry (manuals say "6-volt battery" only; FAQ says 4 Ah).
- HERO 2000: RS-232 data/handshake pins and shell gender on P410/P412 (only 1 and 7 traced); robot-side charger socket and battery connector; power supply board P101-P104 pin roles; backplane card-edge side assignment and the "+59" rail name (pins 67-68); PAL input pin numbers (pal-mem, pal-io stay pins: null); sc02 and PAL designators; slave processor type; quickref and symptoms (status stays planned). The 590 MB illustration booklet and the 225 MB IC data book on archive.org were not opened.

## For other files

- None. cpu8088 (ibm.js) pins U311 on the HERO 2000 schematic agree with the 8088 pinout where readable (CLK 19, RESET 21, READY 22, TEST 23, HOLD 31, HLDA 30, NMI 17, INTR 18, A16-A19 38-35); not a full check.
