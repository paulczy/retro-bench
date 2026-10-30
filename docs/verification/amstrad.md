# Amstrad verification — 2026-10-30

## Sources used

| Title | URL | What it covered |
|---|---|---|
| Amstrad CPC464 / CTM640 / GT64 Service Manual | https://archive.org/details/amstrad-cpc-464-micro-computer-ctm-640-color-monitor-gt-64-green-monitor-service-manual | Circuit diagram (PDF p. 13): IC116 20RA043 (40007) all 40 pins, video DIN J101, power connector CP001, 16 MHz 7400 oscillator; parts list (IC103 TMM23256P-1950, IC116 20RA043 = 40007, IC117-124 HM4864U-2, J101-J104 part numbers); GT64 voltage data (L78MG) |
| Amstrad CPC664 Service Manual | https://archive.org/details/amstrad-cpc-664-service-manual | CPU circuit diagram (PDF p. 17): IC116 40010 pins, cross-check of the 6128 reading; parts list (IC103 TMM23256P-1952 = 40022, IC201 uPD765AC = 40018, IC202 FDC9216BT, IC204 TMM23128P-1951 = 40015, J301 DC jack); GT65/CTM644 regulators |
| Amstrad CPC6128 / CTM644 / GT65 Service Manual | https://archive.org/details/amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual | CPU circuit diagram (PDF p. 17): IC116 40010 all 40 pins, IC118 PAL 40030 all 20 pins, IC103 ROM all 28 pins, video DIN, joystick J102, stereo J103, printer edge, expansion edge, Z80/8255/AY/6845/4164 wiring; interface diagram (PDF p. 28): IC201 uPD765AC all 40 pins with voltages, 34-way drive edge; cassette control diagram (PDF p. 29): J301 5 V jack, CD301 12 V plug, J302 tape DIN, relay; parts list (PDF p. 18); CTM644/GT65 voltage charts; technical specification (PDF p. 31) |
| Service Manual Amendment (CPC464, CPC6128, GT65, CTM644, MP3, CT1) | https://archive.org/details/amstrad-cpc-464-cpc-6128-micro-computer-gt-65-green-monitor-ctm-644-color-monito | Later 464 parts (IC103 Amstrad 40009, IC116 AMS40010, KM4164B-15); 6128/III parts (40226, 40025, 40015, Z765APS, SED9420CAC); revised 6128 schematic with printer BUSY on 21 |
| Amstrad CPC6128 User Instructions | https://archive.org/details/amstrad-cpc-6128-user-manual | Ch. 7 part 9 connector drawings viewed from rear (PDF p. 349-352): joystick, monitor, stereo, tape, expansion, disc drive 2, printer; part 10 printer numbering; ch. 1 power leads (p. 15); ch. 3 keywords (p. 120); ch. 5 AMSDOS (p. 230) |
| Amstrad CPC664 User Instructions | https://archive.org/details/amstrad-cpc664-user-manual | Same connector drawings for the 664 (PDF p. 303-306); ch. 1 power leads; ch. 3 keywords; AMSDOS |
| Amstrad CPC464 User Manual (transcribed edition) | https://archive.org/details/cpc464.en | Appendix V rear panel pinouts (p. 235-236), memory map and keys (p. 233-234), keyword chapter |
| NEC uPD765 data sheet, Dec 1978 (bitsavers) | https://bitsavers.org/components/nec/_dataSheets/uPD765_Data_Sheet_Dec78.pdf | Pin configuration (p. 1) and pin identification (p. 3) |
| CPCWiki, Gate Array and ASIC Pin-Outs (Wayback copy) | https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Gate_Array_and_ASIC_Pin-Outs | 40007, 40010, 40030 pinouts (second source) |
| CPCWiki, Gate Array (Wayback copy) | https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Gate_Array | Registers, 6128 RAM configurations |
| CPCWiki, Connector:Expansion port / Printer port / Monitor, PAL16L8, 765 FDC (Wayback copies) | https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/Connector:Expansion_port | Second source for the ports, PAL and FDC use |

All archive.org and bitsavers URLs returned HTTP 200 on 2026-10-30. The Wayback copies of cpcwiki returned 200 when first fetched, then the Wayback Machine started rate-limiting (429/403). The live www.cpcwiki.eu returns a Cloudflare 403 to scripted requests, so only Wayback copies are linked. Schematic pins were read from rendered page images (the scans have no usable text layer).

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| ga40007 (defined here) | 40/40 | CPC464 SM circuit diagram IC116 20RA043; agrees with CPCWiki |
| ga40010 (defined here) | 40/40 | CPC6128 SM CPU circuit diagram IC116; CPC664 diagram agrees; agrees with CPCWiki |
| pal40030 (defined here) | 20/20 | CPC6128 SM CPU circuit diagram IC118; agrees with CPCWiki |
| rom23256 (defined here) | 28/28 | CPC6128 SM CPU circuit diagram IC103 |
| fdc765 (defined here) | 40/40 | NEC uPD765 data sheet p. 1 and p. 3; CPC6128 SM interface diagram IC201 |

Shared chips listed but not edited: cpuz80, crtc6845, ppi8255, ay8912, dram4164, rom23128. Their pin tables match the CPC6128 schematic wiring of IC111, IC108, IC107, IC102, IC119-134 and IC204.

Connectors: cpc464 6 (5 V, monitor, joystick, expansion, printer, stereo); cpc664 and cpc6128 9 each (adds 12 V lead, disc drive 2, tape DIN). DIN numbering in the user instructions was checked against the standard (manual drawings have the key at the top; rotated, they match DIN 45322 6-pin and DIN 41524 5-pin 180°).

## Changes

Stub file replaced; no earlier pin data existed. Corrections against sources:

| Item | Old | New | Source |
|---|---|---|---|
| Printer port numbering | (task brief) 34-pin edge, generic | Centronics numbering 1-17 top, 19-35 bottom, 19 under 1, pin 1 at the right viewed from rear; custom geo | CPC6128/664 User Instructions ch. 7 parts 9-10 |
| Printer pin 27 | GND (464 transcribed manual) | NC; pin 16 GND | 6128 and 664 originals, CPCWiki |
| Disc drive 2 orientation | — | Even (GND) row on top, 2 at the left, viewed from rear; custom geo | User Instructions ch. 7 part 9 |
| 12 V lead polarity | — | Centre (inner) GND, outer +12 V | CPC6128 SM cassette control diagram CD301 |
| 5 V socket polarity | — | Centre +5 V | CPC6128 SM cassette control diagram J301 |

## Conflicts

- Printer port, service manual numbering: the original CPC6128 SM schematic numbers the fingers odd/even (STROBE 1, D0 3 ... D7 17, BUSY 19, GND 18 and evens). The amendment's revised schematic moves BUSY to 21, which is Centronics pin 11 in that scheme. The user instructions' Centronics numbering is used; noted in the connector summary.
- Disc drive 2 pins 21, 25, 29, 31, 33: user instructions say N/C; the SM interface diagram labels 21/29/31/33 "+5V" and 25 "DRIVE SELECT 0". Recorded as `conflict` on each pin.
- Joystick pin 5: user instructions call it SPARE; the bit assignment (AY port A bit 6) is from community knowledge, `verify: true`.

## Still missing

- 464 joystick, expansion and printer drawings: the 464 manual used is a retyped edition with tables only, so the physical layout comes from the 664/6128 drawings (same connectors). The 464 5 V socket is `verify: true` (same part 170024 as the 664/6128 J301; polarity read on the 6128 only).
- Stereo jack L/R side: the schematic shows A and C on opposite sides with B mixed into both but does not mark which side is tip; L/R pins `verify: true`.
- Monitor and MP-1/MP-2 output current ratings: not in the service manuals. Regulator types and voltages are sourced (L78MG 5 V, uPC78M12 12 V, STK7308 in the CTM640/644). The CTM644 5 V regulator heat problem is from community reports, stated as such in the notes.
- Internal keyboard connector (CP101/CP102) and internal drive ribbon (CD201) / drive power (CD202) pin tables: not legible enough in the scans; not entered.
- FDC9216 / SED9420 data separator, 74LS145 and the 40226 cost-down ASIC: not defined as chips.
- HIMEM values (43903 on the 464, 42619 with AMSDOS) and the firmware RAM range are from memory, `verify: true`. SOFT 968 Firmware Guide was not found on archive.org.
- CTRL + small ENTER (RUN") on 664/6128: `verify: true`.

## For other files

No contradictions found. The CPC schematics agree with cpuz80 (sinclair.js), crtc6845 and ppi8255 (ibm.js), ay8912 (timex.js), dram4164 and rom23128 (commodore.js). Note for the orchestrator: amstrad.js now defines `rom23256` and `fdc765`; a Spectrum +3 entry should reuse `fdc765` rather than define its own uPD765.
