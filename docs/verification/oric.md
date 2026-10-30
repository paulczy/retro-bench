# Oric verification — 2026-10-30

## Sources used
- Oric-1 48K circuit diagram, Oric Products International, issue 7 (24-2-84), sheets 1 and 2 (Defence Force wiki, Wayback copies of `oric1-1s.gif`, `oric1-2s.gif`): ULA IC7, 6502A, VIA IC6, AY IC4, ROM IC9/IC10/IC11, DRAM IC12-IC19, mux IC8/IC20, IC21, IC22 74LS365, 7905 IC1, SK1 RGB, SK2 cassette, SK3 power, PL1 printer, PL2 expansion, PL3 keyboard.
- Oric Owner issue 5, circuit diagram pull-out, p. 44 (https://library.defence-force.org/books/content/oric_owner/OricOwner_05.pdf): an earlier issue of the same diagram at higher resolution, used to trace the RGB path through IC22 and the ULA pins.
- Oric Atmos manual (https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf): Appendix 11 (p. 284-285, expansion, printer, RGB, cassette pinouts and rear-panel drawing), ch. 11 Input/Output (p. 223-225), Appendix 5 memory map (p. 240-242), ch. 1, 2, 6, 9, Appendix 12 (keys, tape commands, keywords).
- Oric-1 BASIC Programming Manual (https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/oric1manual.pdf): set-up, reset button, tape chapter (CLOAD/CSAVE, 5-pin DIN warning).
- Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0; Diagnostic ROM guide v1.08k; Unofficial ULA Guide v1.02 (https://oric.signal11.org.uk/files/pub/...): supply, 7905, rail resistance, clocks, IC numbers, mods 52/53/56, 63b, SB1; ULA pin functions (CLK 7, PHI 14, SYNC 16, RGB 19-21, /ROMSEL 23, /I/O 25, /MAP 26, R/W 27/28, RAS 10, CAS 9, MUX 1, A8-A15, D0-D7).
- Defence Force wiki (Wayback): ULA 10017 page and its two pin drawings, keyboard matrix, repair notes, expansion signals, system labels.
- The Home Computer Advanced Course p. 269 (worldofspectrum.org): Atmos ROM fixes (TAB), FUNCT key unused by BASIC, Oric-1 calculator-style keyboard.

## Chips verified
- `ula10017` (new): all 40 pins. Names and connections read from the Oric-1 schematic and the Oric Owner 5 diagram; RAS/CAS confirmed by the diagnostic ROM guide (ULA 9/10 via IC21 9-8/11-10 to DRAM 15/4); MA0-MA7 names from the wiki v2 drawing, their mux destination from the schematic. `verifiedAgainst`: Oric-1 48K circuit diagram issue 7 and Oric Owner 5 diagram; MJB ULA and diagnostic guides; Defence Force wiki pinout.
- Shared, not edited: `cpu6502`, `via6522`, `ay8912`, `dram4164`, `rom23128`. `rom23128` is reused because the schematic's IC9 ("23128 or 2764") pinout matches it: A0-A13 on 10-3, 25, 24, 21, 23, 2, 26; D0-D7 on 11-13, 15-19; /CS 20, /OE 22, CS 27 (from /ROMDIS, 2K2 pull-up); pin 1 tied to +5 V on the Oric.

## Changes
- New file; nothing replaced.

## Conflicts
- RGB DIN pins 1 and 3: the Oric-1 schematic (traced through IC22 74LS365: ULA 19 → IC22 2/3 → SK1 1; ULA 21 → IC22 10/9 → SK1 3) gives 1 = BLUE, 3 = RED; the Atmos manual Appendix 11 gives 1 = RED, 3 = BLUE. Oric-1 entry follows the schematic, Atmos entry follows the Atmos manual; both carry `conflict`.
- ULA pins 9 and 10: the wiki v2 drawing labels 9 RAS, 10 CAS; schematic, diagnostic ROM guide and ULA guide give 9 CAS, 10 RAS (used).
- ULA pin 35: the wiki v1 drawing labels it A14 (duplicate of 29); schematic and v2 drawing give A12 (used).

## Still missing
- Atmos schematic and the Oric service manual (cpcwiki copy `Oric_-_Service_manual.pdf`): cpcwiki and the live Defence Force wiki/forum are behind a Cloudflare challenge and the PDF has no Wayback capture. So Atmos IC designators are assumed equal to the Oric-1 (the MJB checklist uses one numbering for both boards) and marked "verify" in `chipLocations`.
- Atmos keyboard connector: pin table copied from the Oric-1 PL3, connector `verify: true`. Physical pin order of PL3 not sourced on either machine (drawn as a plain row).
- Composite video on later Atmos boards: no source found; not added.
- DC jack polarity (centre positive) comes only from the MJB checklist; the schematic shows + and - without the plug. Power pins keep `verify: true`.
- Cassette DIN pins 4 and 5 (SOUND): in the Atmos manual; the schematic trace to the AY output node is faint, pins keep `verify: true`.
- 6502 designator: not printed on the schematic.
- Oric-1 16K board (RAM type) not covered.
- Oric Users Group: no current site found; Club Europe Oric (ceo.oric.org) listed instead.

## For other files
- None. The schematic agrees with the shared 6502, 6522, AY-3-8912, 4164 and 23128 pin tables at every pin used here.
- Note for the orchestrator: the Oric regulator is a 7905 in the negative leg, not a 7805.
