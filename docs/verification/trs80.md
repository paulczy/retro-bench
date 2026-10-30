# TRS-80 Model I, III and 4 verification — 2026-10-30

Data lives in `src/data/tandy.js` (machines `model1`, `model3`, `model4`). Scanned PDFs were rendered and read as images where the OCR was garbled (schematics, pin diagrams, parts tables). Page anchors are `#page=<PDF page>`.

## Sources used

| Title | URL | What it covered |
|---|---|---|
| TRS-80 Micro Computer Technical Reference Handbook, 2nd ed. (1982) | https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf | Memory map (pp. 12-13), CPU clock and reset (p. 14), video RAMs and character generator (pp. 34-36), video mixing and Fig. 9B (pp. 42-43), cassette (pp. 45-48), power supply and AC adapter (pp. 52-54), Level II ROMs (p. 55), supply checks (p. 60), RAM/keyboard troubleshooting (p. 67), divider-chain table (p. 69), adapter failures (p. 75), expansion port table and Fig. 22 (pp. 90-91), parts list (pp. 94-97), ROM types (pp. 100-102), master schematic sheet 2 (J1, J2, J3, power supply, video RAM, Z29) |
| TRS-80 Expansion Interface Service Manual (26-1140) | https://archive.org/download/Expansion_Interface_Service_Manual_19xx_Radio_Shack/Expansion_Interface_Service_Manual_19xx_Radio_Shack.pdf | Address decoder tables (p. 3), dual cassette and printer (p. 4), RTC and FDC (p. 5), AC adapter and supply (pp. 6-8), add-on connector (p. 9), parts list, schematic sheets 1-3 (J2-J9, Z34 FD1771B-01), FD1771 appendix |
| Western Digital FD1771-01 data sheet | https://archive.org/download/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital/Western_Digital_1771-01_Data_Sheets_19xx_Western_Digital.pdf | Pin connections (p. 1), pin functions (pp. 2-3) |
| Western Digital FD179X-02 data sheet (May 1980) | https://bitsavers.org/components/westernDigital/FD179X-02_Data_Sheet_May1980.pdf | Pin connections (p. 1), pin outs (pp. 2-4) |
| Motorola 1979 Memory Data Book | https://bitsavers.org/components/motorola/_dataBooks/1979_Motorola_Memory_Data_Book.pdf | MCM6670/MCM6674 pin assignment and block diagram (p. 2-112, PDF 129) |
| Intel 1978 Component Data Catalog | https://bitsavers.org/components/intel/_dataBooks/1978_Intel_Component_Data_Catalog.pdf | 2102A pin configuration and truth table (p. 3-36, PDF 62) |
| TRS-80 Model III Technical Reference Manual (26-2109) | https://archive.org/download/Model_III_Technical_Reference_Manual_1981_Tandy/Model_III_Technical_Reference_Manual_1981_Tandy.pdf | CPU board theory (pp. 13-18), memory map (p. 14), ports (pp. 15, 21-22), I/O bus (p. 19), schematics Fig. 11 cassette J3, Fig. 12 printer, Fig. 13 I/O bus J2, FDC theory (pp. 45-47), RS-232 pin-out (pp. 57-59), power supply (pp. 69-70), video monitor specs and schematic (pp. 75-79) |
| TRS-80 Model III Service Manual | https://archive.org/download/Model_III_Microcomputer_Service_Manual_19xx_Tandy/Model_III_Microcomputer_Service_Manual_19xx_Tandy.pdf | Power supply functional specs, SK1-SK4 pinout, load and ripple tables, no-output procedure (pp. 67-70) |
| Sams Computerfacts TRS-80 Model III (1985) (secondary: a redraw) | https://archive.org/download/Sams_Computerfacts_TRS-80_Model_III_1985_Howard_Sams/Sams_Computerfacts_TRS-80_Model_III_1985_Howard_Sams.pdf | Replacement parts with designators (U77 Z80, U36, U81/U82, U104-U106, FDC U7/U11/U13, RS-232 U1/U2), preliminary service checks |
| TRS-80 Model 4 Technical Reference Manual (1983) | https://archive.org/download/model-4-technical-reference-manual/Model%204%20Technical%20Reference%20Manual%20(1983)(Tandy%20Corporation)(pdf).pdf | CPU and timing, port map, bit map, memory maps I-IV, ROM/RAM/video, cassette, printer, I/O connectors (pp. 15-21), CPU parts lists (U57, U47, U68-U70, U23, U77-U92), FDC 8858160 parts (U6), power supplies 38 W and 65 W (pp. 109-114), RCA monitor specs (p. 145) |
| TRS-80 Model 4/4P Technical Reference Manual (1985) | https://archive.org/download/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation.pdf | Model 4 I/O bus (p. 14), gate-array theory (p. 21), RS-232 pinout (p. 51), gate-array I/O pin assignments J1-J5 (p. 53) |
| Level II BASIC Reference Manual (1979) | https://archive.org/details/Level_II_BASIC_Reference_Manual_1979_Radio_Shack | Reset, special function keys (pp. 1-1, 1-2), statement names |
| Model 4 Disk System Owner's Manual (1983) | https://archive.org/details/Model_4_Disk_System_Owners_Manual_1983_Tandy_a | BASIC special keys, function keys, keyboard code map, TRSDOS 6 command names |
| trs-80.org: The Radio Shack Expansion Interface (secondary) | https://www.trs-80.org/radio-shack-expansion-interface.html | Cable history, reboots and lockups, 1980 redesign, two-adapter compartment |
| trs-80.org: Model I Keybounce (secondary) | https://www.trs-80.org/model-1-keybounce.html | Keybounce cause, KBFIX, ROM 1.3 debounce |
| trs-80.org: Gold Plug 80 (secondary) | https://www.trs-80.org/gold-plug-80.html | Tin-plated edge connector oxidation |

Every URL above returned HTTP 200/206 on 2026-10-30.

## Chips verified

| Chip | Pins checked | verifiedAgainst |
|---|---|---|
| fdc1793 (new) | 40/40 | FD179X-02 data sheet pp. 1-4 |
| fdc1771 (new) | 40/40 | FD1771-01 data sheet pp. 1-3; EI schematic sheet 3 for the EI wiring (DRQ, TG43, PH3, HLD not connected; 1 MHz clock) |
| sram2102 (new) | 16/16 | Intel 2102A data sheet, p. 3-36 |
| cg-mcm6670 (new) | 18/18 | Motorola MCM6670 data sheet, p. 2-112 |
| rom-trs80-model1 (new) | `pins: null` | Summary only: three ROM types with board-specific chip-select wiring (TRH pp. 55, 100-102) |
| crtc68045 (new) | `pins: null` | Summary only: no 68045 data sheet opened |
| ga-model4 (new) | `pins: null` | Summary only: no gate-array pinouts published |

Shared chips used, not edited: `cpuz80` (sinclair.js), `dram4116` (sinclair.js), `dram4164` (commodore.js, for the MCM6665), `sram2114` (sinclair.js), `rom2364`, `rom2332` (commodore.js), `rom2316` (apple.js, also for the MCM68A316E character generators), `mux14529` (dragon.js). Designators given through `chipLocations`.

## Changes

| Item | Old → new | Source |
|---|---|---|
| sam6883 pin 5 | desc and probe gave 14.31818 MHz as universal → "14.31818 MHz on the CoCo"; notes that the Dragon differs | Dragon agent request; CoCo TRM |
| coco1 chips | added `mux14529`, location U9 | CoCo Technical Reference Manual schematic sheet 2 (label already cited in `coco-joystick`) |
| brand blurb | CoCo only → adds TRS-80 Model I, III and 4 | — |
| machines | added model1, model3, model4 (status ready) | as above |
| connectors | added model1 (expansion edge, cassette, video, power, EI J2/J3, J4, J5, J6-J8, J9), model3 (I/O bus, printer, cassette, RS-232, PSU SK2-4, CRT J101), model4 (I/O bus, printer, cassette, RS-232, 65 W PSU TB2, CRT) | as cited per connector |

## Conflicts

- Model III FDC position: Sams gives the WD1793 as U7 (U11 WD1691, U13 WD2143); the TRM FDC parts-list scan is misaligned and reads "U10 WD1793", but its text uses U10 for a NOR gate. Used U7.
- Model III CPU parts-list scan is misaligned (it reads "U84 Z-80"); Sams gives U77. Used U77.
- Model 4 gate-array I/O table (4/4P TRM p. 53): the label EXTIO-SEL* wraps onto pin 44, shifting the printed labels of pins 44-50 by one line. Settled by the odd-signal/even-ground pattern and the Model III I/O bus schematic (43 EXTIOSEL*, 45 NC, 47 M1*, 49 IORQ*).
- EI printer J4: the schematic prints "8" for DATA 4; the odd data run and the duplicate 8 in the ground list place it at 9.
- EI disk J5: the schematic prints "3" twice in the ground list; the second is 5 (all odd pins are ground).
- Model III I/O bus J2: the schematic prints "5" for XDB1; it is 3.

## Still missing

- Model I video DIN J2: pin 1 carries +5 V on the schematic; the TRH text does not mention it. Pins 2, 3 not connected.
- Model I power DIN pin 5: no connection drawn on either schematic.
- Card-edge row orientation: given only for the Model I expansion edge (TRH Fig. 22). EI J2-J5, Model III/4 I/O bus and printer edges use odd/even numbering without a drawing of which side is up.
- Model III/4 cassette: the schematic shows CPU-board header J3; the rear DIN is assumed wired pin for pin (`verify`).
- Model III/4 RS-232 DB-25 gender: not stated in any manual read; `female` set with `verify`.
- Model 4 printer, cassette and monitor tables are the Model III ones; the Model 4 schematics (8000173, 8000187) were not checked pin by pin (`verify`). TCE monitor 8790607 not checked.
- Model 4 38 W (Astec AA11320) and Tandy 65 W (8790049) output connectors: no pin table read. Model 4P supply not covered.
- Model 4 internal boards: the original board connects the FDC and RS-232 boards through 20-pin SIL headers J7, J8 (and graphics J10); no pin tables read. There are no separate RAM/ROM boards on the Model 4 (RAM is on the CPU board; 128K adds a second 6665 row and PAL U72).
- Monitor connector pin 4 (to E304): function not labelled on the RCA schematic (`verify`).
- Model I keyboard row addresses $3801-$3880 and the TRSDOS 1.3 commands: from memory (`verify`). Model III SHIFT + 0 and the RESET/BREAK boot behaviour: from memory (`verify`); no Model III owner's manual text was reachable (archive.org item `trs80modeliiiope0000radi` returns 401).
- RIFA line-filter capacitor failures: community repair advice; the Tandy manuals list the parts (2200 pF and 0.1 µF 250 V AC metallized paper) but not the failure.
- 68045 CRTC, Model 4 gate arrays, Model I/III/4 BASIC ROMs: no pin tables (see Chips).
- Frank Durda IV's Model 4 hardware notes and pinouts.ru were not needed for any table and are not cited.

## For other files

- `rom2316` (apple.js) is now also fitted as the Model III U106 and character generator U36 and the Model 4 U70 and U23 (Motorola MCM68A316/MCM68A316E). No contradiction found; check that its chip-select descriptions suit these mask-programmed Tandy parts.
- `dram4164` (commodore.js) is used for the Model 4 MCM6665 64K × 1 DRAM (4164 pinout). No contradiction found.
- `cpuz80`, `dram4116`, `sram2114`: no contradictions found.
