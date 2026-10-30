# Acorn Electron verification — 2026-10-30

## Sources used
- Acorn Electron Service Manual, part 0405001 issue 2 (1987), https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf (also archive.org/details/acorn-electron-sm). Spec, ch. 6 ULA pin functions, ch. 8 fault finding, main PCB circuit diagram (205,000 issue 4, pp. 31-32), silk-screen, PSU board diagram, parts lists.
- Electron Advanced User Guide (archive.org/details/acorn-electron-advanced-user-guide). Memory map (ch. 12), SHEILA and ULA registers (13, 14.1), expansion connector (15.2), Appendix G main board circuit diagram issue 6.
- Acorn Electron User Guide (archive.org/details/acorn-electron-user-guide). Keyboard (pp. 17-19), FUNC keywords (pp. 42-43), tape commands (pp. 196-197).
- Acorn Support Group Application Note 015 issue 2, https://chrisacorns.computinghistory.org.uk/docs/Acorn/AN/015.pdf. Expansion connector pinout and signals, power budget, thermal fuse, ROM paging.
- TI data sheets SN74LS04/SN74S04, SN74LS169B, SN74S74/SN74LS74A, SN74LS86A, LM324 (ti.com/lit/ds/symlink/...). Pin assignments.
- Secondary: Chris's Acorns Electron page (board issues 2 and 4, Plus 3), Classic Acorn ULA repairs, Electron User Group trouble shooting, oldcomputer.info, linuxjedi.co.uk, retrorepairsandrefurbs.com, bygonebytes.co.uk, Dataserve Retro power socket.

## Chips verified
- elk_ula (12C021, PLCC-68): all 68 pins read from the SM circuit diagram (issue 4) and checked against AUG Appendix G (issue 6); every pin agrees. Functions from SM ch. 6; supply, clock and strobe pins also named in SM 8.3. Pin 49 is cut off at the page join of the SM drawing; SM 8.2 text and AUG Appendix G both give 49.
- ttl7404 (74S04 IC8), ttl74169 (74LS169 IC9), ttl7474 (74S74 IC11 / 74LS74 IC12), ttl7486 (74LS86 IC14, IC15), lm324 (IC13): pin names from the TI data sheets; Electron use of pins 2, 6, 7, 8, 14 (IC8), 2, 3-6, 8, 11, 16 (IC9), 3, 5, 6, 9, 11 (IC11/IC12), 1, 2, 11-13 (IC14), 1, 3, 4, 7, 8, 11, 14 (IC13) from the SM diagram and ch. 8.
- Shared chips listed by designator only: cpu6502 IC3, rom23256 IC2, dram4164 IC4-IC7. Their Electron pin use (6502 pins 1, 8, 21, 34, 37, 40; ROM 14, 20, 22, 28; 4164 3, 4, 8, 15, 16) matches the existing tables.

## Changes
- New machine `electron` (status ready), chips, chipLocations, symptoms, 8 connectors, power with supply, quickref, resources. Brand blurb now names the Electron.
- Shareable-chip pass (coordinator request): pin `desc` and `probe` text made generic on `fdc1770` (also fitted in the Commodore 1571/1581), `saa5050`, `fdc8271`, `adc7002`, `adlc6854`, `dram4816` and the new `ttl7404`, `ttl74169`, `ttl7474`, `ttl7486`, `lm324`; `role` made generic on the same chips. The board wiring, designators and probe values that were in the pins (Master SM 7.8 /CS, CLK and DRQ probes; SAA5050 BBC tie-offs and TR6 source; 7002 clock, VREF, port pins, /CS and /EOC routing; ADLC Econet wiring; 4816 Model B bank wiring) moved word for word into each chip's `summary`. Electron TTL wiring moved into the summaries, and two Electron test points were added (LM324 pin 7, 74LS86 pin 11). Pin names, numbers, types and directions are unchanged. The custom Acorn parts (VIDPROC, SERPROC, 65SC12, Master gate arrays, Electron ULA) keep board-specific pin text because no other brand can fit them.

## Conflicts
- None in pin tables. Note: the brief expected an on-board 7805; the SM PSU board diagram shows a bridge rectifier and a transistor switching regulator with transformer T1 (no 7805). The data follows the diagram.

## Still missing
- Power jack plug size (barrel diameter): not in any Acorn document found. Connector `electron-power` carries verify.
- PL3 and the 18 VAC tabs have no Acorn pin numbers; `electron-psu-board` uses silk-screen labels and carries verify.
- Expansion edge pin-1 end: inferred from the silk-screen (1 printed at the PSU end, so left looking into the rear); no Acorn figure states the view.
- SHIFT + BREAK boot (quickref key) is from memory: verify.
- Issue 6 board RAM is a single TM4164EA4 (64K x 4, IC20, 22-pin); no chip entry for it.
- 74S04 PAL-oscillator gate assignment (pins 1-5) read only roughly from the scan; descriptions kept generic.

## For other files
- `rom23256` (amstrad.js): pin descriptions name the CPC Gate Array (/ROMEN, ROMDIS). On the Electron /CS (pin 20) goes to link LK1 (Hitachi or Toshiba setting) and /OE (pin 22) to the ULA ROM line through link LK8. A neutral description would suit both.
- `dram4164` (commodore.js): role says "8 chips = 64 KB"; the Electron uses four as 32 KB with 4-bit access.
