# Acorn verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| BBC Microcomputer Service Manual (HTML transcription, issue 7 era) | https://acorn.huininga.nl/pub/unsorted/manuals/BBC%20Microcomputer%20Service%20Manual-HTML/BBCServiceManual.html | 1.2 spec, 1.4 assembly (seven push-on PSU leads), 2-3 circuit description, 3.14 PSU ratings and Figure 10 aux outputs, 4.2/4.4 upgrades (printer issue differences, PSU swap), 6.3-6.4 fault finding, 7.1 interfaces, 8.1 IC table, parts list item 24 (Astec SMPS 103,003) |
| BBC Microcomputer Service Manual, Oct 1985, Acorn 0433,001, section 1 (scan) | https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_BBCSMOct85_Sec1.pdf | Contents (1770 daughter board upgrade); image only, used as a pointer |
| Circuit diagram for BBC Microcomputer 105,000/C (600 dpi scan, Web Archive copy of regregex.bbcmicro.net) | https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf | IC5 SAA5050, IC6 video ULA, IC7 serial ULA, IC53-68 4816A-3 signal pins, IC73 7002 pins; PL8 disc, PL9 printer, PL10 user, PL11 1 MHz, PL12 Tube, PL13 keyboard (part), SK3 RGB, SK4 RS423, SK5 cassette, SK6 analogue, SK7 Econet. Note on drawing: DIN connectors viewed from outside the case |
| BBC Master Series Service Manual, Acorn 0443,004 issue 1 (transcribed PDF) | https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf | Links (pp. 8-10), hardware description (pp. 13-27), fault finding 7.1-7.17 with pin numbers (pp. 31-49), connector pinouts (pp. 51-56: UHF, BNC, RGB, RS423, cassette, analogue, Econet, disc, printer, user, 1 MHz, Tube, PL11/PL24 keyboard), parts list |
| BBC Master main PCB circuit diagram, Acorn 0143,000 (vector PDF, 2 sheets) | https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf | IC supply table (IC numbers, 0 V / +5 V pins, types), IC14 65SC12 pin names, SK3/SK4 cartridge pins, PL8 battery wiring |
| Advanced User Guide for the BBC Micro (HTML) | https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html | 24 user/printer ports, 25 8271 and ADLC registers, 26 ADC, 27 Tube, 28 1 MHz bus signal definitions, FRED/JIM |
| BBC Microcomputer System User Guide (1984 issue) | https://rk.nvg.ntnu.no/bbc/doc/BBCUserGuide-1.00.pdf | BREAK keys (p. 120), *TAPE/PAGE (p. 8), printer and serial cables (pp. 375-376, PDF 387-388), memory map (pp. 494-495), SHEILA table |
| Master Reference Manual Part 1 | https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf | C.4 MOS commands, BREAK effects, F.2 ROMSEL/ACCCON and ROM numbers, F.3 3.0 V lithium cell, F.5 links |
| Master Reference Manual Part 2 | https://retrosix.wiki/uploads/Master_Reference_Manual_Part_2-1.pdf | K.1 BASIC IV differences, O.4 65C12 |
| Intel 1979 Peripheral Design Handbook (bitsavers) | http://www.bitsavers.org/components/intel/_dataBooks/1979_Intel_Peripheral_Design_Handbook.pdf#page=113 | 8271 pin configuration and pin descriptions, pp. 1-108/1-109 |
| Western Digital 1984 Storage Products Handbook (bitsavers) | http://www.bitsavers.org/components/westernDigital/_dataBooks/wd1984storageProducts_01.pdf#page=53 | WD1770/1772 pin designation and pin table, pp. 43-44 |
| NEC 1982 Microcomputer Catalog (bitsavers) | http://www.bitsavers.org/components/nec/_dataBooks/1982_NEC_Microcomputer_Catalog.pdf#page=485 | uPD7002 pin configuration and names, p. 483 |
| Motorola 1983 8-Bit Microprocessor and Peripheral Data (bitsavers) | http://www.bitsavers.org/components/motorola/_dataBooks/1983_Motorola_8-Bit_Microprocessor_and_Peripheral_Data.pdf#page=568 | MC6854 pin assignment, p. 3-524 (pin 1 label faint; "Vss Pin 1" in the electrical table) |
| Philips Semiconductors and ICs Part 6b, 1979 (bitsavers) | http://www.bitsavers.org/components/philips/_dataBooks/1979_Philips_Semiconductors_and_Integrated_Circuits_Part_6b_ICs_for_Digital_Systems_in_Radio_and_TV.pdf#page=181 | SAA5050 pinning and application data (Aug 1978) |
| Mostek 1980 Memory Data Book (bitsavers) | http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf#page=112 | MK4516 pin out (same 16-pin single-supply pinout as the 4816) |
| BeebWiki Video ULA / Serial ULA (secondary) | https://beebwiki.mdfs.net/Video_ULA, https://beebwiki.mdfs.net/Serial_ULA | Pinout drawings (cross-check), part numbers VC2069/201,647, VC2026/201,648 |
| RetroTechWiki, BBC Micro Model A/B capacitor guide (secondary) | https://retrotechwiki.com/BBC_Micro_Model_A/B_Capacitor_Replacement_Guide | PSU variants (Astec, Wong's, linear), C1/C2 X2, C9, lead colours |
| Retro-Kit, BBC Micro PSU X2 capacitors; Master 128 battery maintenance (secondary) | https://www.retro-kit.co.uk/page.cfm/content/BBC-Micro-PSU-X2-capacitors/, https://www.retro-kit.co.uk/page.cfm/content/Acorn-BBC-Master-128-Battery-maintenance/index.html | X2 failure, 3 x AA pack, diode and resistor |
| linuxjedi.co.uk, Restoring a BBC Master 128 part 1 (secondary) | https://linuxjedi.co.uk/restoring-a-bbc-master-128-part-1/ | Leaked battery pack damage |

All URLs returned HTTP 200 on 2026-10-30 (the Web Archive circuit diagram returned 200 on download, 429 rate-limit on a later HEAD). stardot.org.uk returned 403 to scripted fetches and is not cited.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| cpu65sc12 | 38/40 (3 and 35 shown NC on the drawing) | Master PCB diagram 0143,000 IC14 and supply table |
| vidproc | 28/28 | Model B diagram IC6 (1-3, 9-28); BBC SM 6.3 and Master SM 7.1.2 (4-8); Master supply table (1, 16) |
| serproc | 28/28 | Model B diagram IC7; Master SM 7.6-7.7; Master supply table |
| saa5050 | 28/28 | Philips SAA5050 data sheet; Model B diagram IC5 |
| fdc8271 | 40/40 | Intel 1979 handbook pp. 1-108/109 |
| fdc1770 | 28/28 | WD1770/1772 data sheet pp. 43-44 |
| adc7002 | 28/28 | NEC 1982 catalog p. 483; Model B diagram IC73 |
| adlc6854 | 28/28 | Motorola 1983 p. 3-524 |
| dram4816 | 15/16 (pin 1 verify) | Mostek MK4516 p. V-47; Model B diagram IC53-68 |

Connectors verified pin by pin: Model B RGB, RS423, cassette, analogue, Econet, disc (except 2, 4, 34), printer, user, 1 MHz bus, Tube against the circuit diagram plus the Master tables; all Master ports except the cartridge, battery and PSU tables against the Master SM pinout appendix.

## Changes

New file content (was a planned stub). Facts that differ from the brief:

| Item | Brief | Source says |
|---|---|---|
| PSU-to-board connector (both machines) | 4 or 6-way connector | Seven separate push-on leads: +5 V x3, 0 V x3, -5 V x1 (BBC SM 1.4, 3.14; Master SM 3). The 6-way part is the auxiliary power socket for drives (BBC SM Figure 10) |
| Model B supplies | "Astec linear and switch-mode" | Astec is the switch-mode (part 103,003); the early linear supply maker is not named by Acorn |
| Master RAM | 4816/4164 | 4 x 4464 (64K x 4), IC17, IC18, IC23, IC26 (Master PCB supply table, parts list) |
| Master clock battery | leaking pack | MRM1 F.3 specifies a 3.0 V lithium cell; secondary sources describe a 3 x AA pack. Both noted |
| RS423 pins D/E | — | Acorn labels D "CTS" and E "RTS", but D is driven by the line driver (output) and E goes to the receiver (input) (Model B diagram; Master SM 5.4 text) |

## Conflicts

- Master battery type: 3.0 V lithium cell (MRM1 F.3, Master SM 5.3 "lithium manganese dioxide") vs original 3 x AA pack (Retro-Kit). Recorded in power notes, not as a pin conflict.
- Model B printer pin 21: labelled BUSY on the circuit diagram but not wired; Master SM lists NC. Entered NC with the note.
- RetroTechWiki quotes the linear supply as 2.25 A at 5 V; the service manual gives 3.75 A for the supply. The manual figure is used.

## Still missing

- Master ULAs mc_ioctl (CF30050), mc_memctl (CF30058), mc_pbc (CF30049), mc_crtcmux, mc_kbenc (CF30047), mc_chroma (CF30060): `pins: null`. The full pin lists are on the Master vector drawing (0143,000) and could be transcribed; only the pins named in the Master SM fault text are given in the summaries. mc_chroma package size not read.
- 65SC12 pins 3 and 35 (NC on the drawing; GTE data sheet not found). Pin 3 verify.
- 4816 pin 1 (MK4516 has /RFSH there; HM4816A data sheet not found). Verify.
- Model B disc connector pins 2, 4, 34 (to links S4/S10, function not traced) — verify.
- Model B keyboard PL13 pins 4, 13, 14, 16, 17 not legible on the scan; left out.
- Master cartridge pins a9 (-5 V via LK2), a18 (CRTC RST), a21 (SPEECH), b10 (LPSTB link) read from the drawing only; connector verify. Row a/b numbering follows the drawing.
- Model B aux power socket: Figure 10 has no pin numbers; numbering is ours (connector verify).
- PSU-to-board tabs: positions not drawn by Acorn; labels are ours (connector verify).
- Master PSU maker and ratings: not in the Master SM or MRM.
- Econet data/clock polarity per pin: not given in the Acorn tables.
- TMS5220/TMS6100 speech (optional, Model B IC99/IC98) not entered.
- Master 1 Mbit MOS ROM (IC24, 28-pin) and the 32K sockets IC37/IC41 have no chip entry (no rom27256 / Acorn ROM data sheet).

## For other files

- `dram4464` (atari.js) has `pins: null`. The Master SM 7.1.2 confirms on the 4464: pin 5 /RAS, pin 16 /CAS, address on 6, 7, 8, 10, 11, 12, 13, 14; Master supply table: 0 V pin 18, +5 V pin 9. Consistent with the standard 4464 pinout.
- `cpu6502`, `via6522`, `crtc6845`, `acia6850`, `psg76489`, `rtc146818`, `rom27128`, `rom2764`, `ls138`: no contradictions found against the BBC and Master manuals (6845 MA0 pin 4 to MA13 pin 17, RA0 38 to RA3 35, HSYNC 39, VSYNC 40; RTC CE 13, AS 14, R/W 15, DS 17, OSC1 2; 6502 SYNC 7, R/W 34, clock 37/3).
- The Master SM hardware description calls the sound chip an "SN7694A" (a misprint of SN76489); the drawing's supply table gives IC12 76489 (0 V pin 8, +5 V pin 16), consistent with `psg76489`.
