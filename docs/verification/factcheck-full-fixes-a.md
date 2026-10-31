# Full fact-check fixes, agent A: 30 October 2026

Scope: every WRONG and UNVERIFIABLE row of `docs/reviews/factcheck-2026-10-30/full/batch-NN-ledger.md` whose record lives in
`commodore.js`, `apple.js`, `atari.js`, `coleco.js`, `sinclair.js`, `timex.js`, `ti.js` or `photos.js`, plus the
batch-report source findings for those files. 827 ledger rows mapped to these files; 40 were the planted canaries
(`canaries.json`) and were left alone. `photos.js` had no rows. 115 rows were WRONG, the rest UNVERIFIABLE.

How the rules were applied:
- WRONG: corrected from the cited page. Rows marked "(checked)" were opened and read for this pass (PDF page rendered
  or text read); rows marked "(per reviewer)" follow the reviewer's reading of a page that was not re-opened here.
- Unsourced acceptance ranges went back to the nominal value (rule 2). Unsupported qualifiers and diagnoses were
  removed or the field marked `verify: true` (rule 3). The app shows the CHECK stamp for `verify` on pins, connector
  pins, firstTen steps, clock rows and replacements; it does not render `verify` on rails or scope blocks, so for those
  the unsupported value or clause was removed instead.
- Shared chips (`cpuz80`, `cia6526`, `via6522`, `pia6520`, `crtc6545`, `vic2`, `sid6581`, `dram4116`) had machine
  wiring taken out of pin text (rule 5). Shared connector builders were split where one machine differs (Plus/4 copies
  of the 264 ports, Spectrum 128 and +2 edge connectors, ADAM expansion, drive IEC pins 1 and 3, Disk II card header).
- No connector `geo`, `pin1`, `rowA` or gender changed, so no drawing needed a browser check.
- Ledger index is `batch:item`. Old and new values are abbreviated.

Validation: `node scripts/validate-data.mjs <brand>` gives 0 FAIL for every brand above; the full run gives 0 FAIL.

## commodore.js

| Ledger | Record | Old | New | Source page |
|---|---|---|---|---|
| 01:35, 01:36 | vic20 clocks Φ2 out / Φ1 out | rates from the 6502 sheet | `verify: true` | - |
| 01:37-41 | pet / c1541 / c1571 / c1581 clocks Φ1 (and Φ2) out | rates from the 6502 sheet | `verify: true` | - |
| 03:0 | sid6581 replacement FPGASID | "dearer than single-chip clones" | replaces the 6581 and 8580; can act as two SIDs for stereo | fpgasid.de |
| 03:37 | rom2364 pin 20 | 2764 adapter sentence | removed | rule 3 |
| 03:42 | cpu6510 pin 2 RDY probe | HIGH | normally HIGH with LOW periods during VIC-II bus steals; stuck LOW = frozen | C64 PRG p. 449; schematic 326106 (per reviewer) |
| 03:70 | cpu6510 pin 38 probe | toggles on a running machine | changes level as the program reads and writes | rule 3 |
| 03:87 | pia6520 pin 18 CB1 | bidir | in: port B handshake / interrupt input | MCS6520 data sheet pp. 1-3 |
| 03:102, 03:135, 03:140 | pia6520 / via6522 pin 34, crtc6545 pin 2 probe | LOW at power-up, then HIGH | HIGH while running; LOW resets | rule 5 |
| 04:15 | cpu7501 pin 23 GATE | until /RAS falls | until /RAS goes LOW to HIGH; usually driven by TED MUX | TED manual pp. 14, 16 |
| 04:32 | cpu7501 pin 40 probe | ~0.3 s | briefly | rule 3 |
| 04:46 | cia8520 pin 19 TOD | WD1770/1772 strap | `verify: true` | - |
| 04:57 | cia8520 pin 34 /RES | clears all registers | reset values: ports input, timer latches all ones, control registers zero | 8520 data sheet p. 7 (per reviewer) |
| 04:62 | vic20 clock two-phase oscillator (UE2 74S02) | designators | `verify: true` | - |
| 04:65, 04:66 | c128-rgbi pins 4, 5 | TTL 0 / +5 V | TTL levels | rule 3 |
| 04:68, 04:69 | c128-rgbi pins 8, 9 | 15.7 kHz; 50/60 Hz | line / frame rate set by the VDC registers | rule 3 |
| 04:70, 04:73, 05:280, 05:282 | c128-video / c16-video pins 1, 4 | 1 V p-p into 75 Ω | removed | rule 3 |
| 04:75 | c128-video pin 8 | NC | +5 V through FB13, with `conflict` (PRG says NC); summary and source added | C128 SM 314001-08, schematic 310378 Rev. 6 sheet 3, PDF p. 74 (checked) |
| 04:83, 04:151, 04:258, 04:323, 05:11, 05:75 | c128-user 2, c128-ctrl 7, c64-user 2, c64-ctrl 7, vic20-user 2, vic20-ctrl 7 | +4.75 to +5.25 V | +5 V | rule 2 |
| 04:88, 04:262 | c128-user / c64-user pin 7 SP2 | CIA2 | kept, with `conflict` (PRG table says CIA #1; schematics CIA2) | PRG vs schematics |
| 04:111, 04:113, 04:125 | c128-exp pins 8, 11, B | C64 ranges only | C64-mode and C128-mode (MMU) mappings | C128 PRG pp. 400, 461; SM p. 29 |
| 04:112 | c128-exp pin 9 /EXROM | +5 V with no cartridge | removed; mode wording | rule 3 |
| 04:155-163 | c128-cass pins 3, 4, 6, C, F | P5, FLAG, P4, voltages | neutral; `verify: true` | rule 3 |
| 04:173, 04:202 | vic2 pin 10, sid6581 pin 8 | from the PLA | address decoding | rule 5 |
| 04:175 | vic2 pin 12 BA | 3 cycles before a badline | 3 cycles before VIC second-phase accesses (badline fetches, sprite DMA) | VIC-II article secs. 2.3, 3.5 |
| 04:182 | vic2 pin 21 | 17.734 MHz PAL | PAL pointed at the machine clocks | rule 3 |
| 04:215 | sid6581 pin 26 EXT IN | unused on a stock C64 | external audio from audio/video DIN pin 5 | C64 PRG pp. 396, 472 |
| 04:216 | sid6581 pin 27 | DIN and modulator route | to the board audio stage | rule 5 |
| 04:217-229, 04:231, 04:232 | cia6526 PA/PB, pins 21, 23 | C64/C128 wiring, PLA | C64 only; address decoding | rule 5 |
| 04:246-250 | c64-iec pins 1, 3, 4, 5 | +5 V idle, open collector | HIGH idle; `verify: true` (identical vic20-iec block edited too) | rule 3 |
| 04:265, 04:266 | c64-user pins 10, 11 | 100 mA | 50 mA, `conflict` names the appendix 100 mA | C64 PRG pp. 360, 397 |
| 04:328-337 | c64-cass 3, 6, C, F | 5-6 V; every key state | motor voltage on / 0 V off; LOW with PLAY | rule 3 |
| 05:47, 05:66, 05:67 | vic20-cart 19, W, X | +5 V idle | HIGH idle | rule 3 |
| 05:74 | vic20-ctrl pin 6 | VIC pin 37 | VIC pin 9 (LP) | VIC-20 schematic 324001 sheet 1 (per reviewer) |
| 05:80, 05:86 | vic20-cass 3, C | +9 V unregulated | neutral; `verify: true` | rule 3 |
| 05:89 | c64 clock C64C clock generator | U31 on 250469 | U20 | C64C schematic 250469 (per reviewer) |
| 05:98 | c64 firstTen 6 | not the VIC-II | a failed load such as the VIC-II can pull it down | rule 3 |
| 05:99 | c64 rail +5 V | 4.95-5.10 V; shorted chip | +5 V; check the brick, then a loading chip (Carlsen) | rule 2 |
| 05:103, 05:104, 05:188 | pet firstTen 8, BΦ2 clock rows | PET FAQ, sheets | `verify: true` | - |
| 05:110-117 | pet firstTen 2-5, rails | ranges; 4116 destruction | nominal; claims removed; step 5 `verify: true` | rule 2 |
| 05:140-154 | pet-ieee active LOW | no polarity source | pins already `verify: true`; IEEE-488 (Wikipedia) added as second source | rule 7 |
| 05:163-180 | pet-user 2, 5, 9, 10, B, M | TTL / DIAG / CB2 | `verify: true` | - |
| 05:182-185 | pet-video 1, 3, 5 | TTL, 50/60 Hz, 15.6/20 kHz | rates removed; `verify: true` | rule 3 |
| 05:209, 05:219, 05:235, 05:241 | dram4416 pin 5; rom23128 pins 1, 20, 27 | - | `verify: true` | - |
| 05:242-263 | pla82s100 pins 1, 5, 6, 9, 25, 26 | polarity / function | `verify: true` | - |
| 05:279 | c16-cass pin 6 SENSE | to the 6529 | U11 74LS125 pin 9 to pin 8, data bit 2 at $FD10-$FD1F; summary fixed | C16 SM schematic 251788 sheet 1 (per reviewer) |
| 05:283, 06:4 | c16-video / plus4-video pin 5 | to the sound chip | expansion pin 23 EXT AUDIO and the Q3 audio stage; not the TED | C16 / Plus/4 SM schematics |
| 05:294, 05:297-299, 06:127 | Plus/4 c16-joy 8, c16-cass 3/4/6, c16-iec 1 | C16 routing | new P4FIX map: neutral Plus/4 text; c16-iec pin 1 NC on the Plus/4 | Plus/4 SM PDF p. 20 CN2 (per reviewer) |
| 05:301, 05:302 | c16 rails +9 V, +5 V | TI 7805 claims; 4.9-5.2 V | removed; +5 V | rules 2, 3 |
| 06:15, 06:18 | ted7360 pins 10, 14 probe | exclusive diagnoses | softened | rule 3 |
| 06:48 | c16 clock Crystal | Y1, Q1/Q2 | `verify: true` | - |
| 06:50, 06:53 | c16 / plus4 clock CPU (single) | PAL 0.884 MHz (p. 35) | 0.8867 MHz from the pinout, p. 38; note keeps the p. 35 figure | TED manual pp. 35, 38; 17.734475 / 20 |
| 06:180 | c16 firstTen 5 | exclusive TED diagnosis | `verify: true` | - |
| 06:181 | c16 firstTen 6; 264 test point DRAM strobes | /CAS continuous | /CAS only on DRAM accesses; strobes do not clear the RAM | TED manual pp. 3, 9, 32-33 |
| 06:186 | plus4 rail +5 V | 4.9-5.2 V | +5 V (PSU drawing 5.2 V) | rule 2 |
| 06:187 | plus4 rail 9 V AC note | only the user port | also feeds the BA20 bridge (+9 V unregulated) | Plus/4 SM pp. 20-21 |
| 06:190 | vic20 rail +5 V | 4.95-5.10 V; sag = short | +5 V; later boards external +5 V; bridge and regulator first (Carlsen) | VIC 324001; Carlsen |
| 06:194 | c1541 clock bit clock | 25-30 zone | kept; note records the manual's 15-30 misprint | 1541 SM PDF p. 10 |
| 06:195, 06:197 | c1541 rail +5 V, firstTen 3 | 4.75-5.25 V | +5 V; step `verify: true` | rule 2 |
| 06:201, 07:104 | drive IEC pin 1 /SRQ | 1571 and 1581 fast clock; +5 V idle | 1571 only; +5 V idle with the computer connected | rule 3 |
| 07:7-19 | ga325572 pins 7-14, 19, 21, 22 | - | NC pins already `verify: true`; 19, 21, 22 `verify: true` | - |
| 07:68 | ga251828 pin 24 ATN | in | out, `conflict` names the p. 8 table | 1571 SM p. 7; schematic 310420 (per reviewer) |
| 07:99, 07:100 | c1541 clocks 16 MHz / gate-array CPU clock | one pin set | names the 40-pin pins and the 1541-II 42-pin U10 pins 23 / 39 | 1571 SM p. 8; 1541-II addendum p. 43 |
| 07:115 | 1571-stepper pin 4 | - | kept; already `verify: true` | - |
| 07:117 | c1571 rail +5 V note | VR201 | from the supply board | rule 3 |
| 07:123 | 1581-iec pin 3 ATN | VIA CA1 | 8520 /FLAG pin 24 and PB7 via U9/U7; CIA IRQ | 1581 SM sheet 3, PDF p. 20 (per reviewer) |
| 07:168 | c1581 rail +5 V note | sag = the brick | probably the brick; try a known-good supply (Carlsen) | Carlsen 1581 |
| 07:170-172, 37:3, 37:8 | c64 / vic20 clocks and c64 firstTen 7 | pin numbers | `verify: true` | - |
| 17:7, 17:16, 21:201, 37:4-6 | c128 clocks | PAL / pins / 1.02 MHz | `verify: true` | - |
| 17:8, 17:11, 17:13 | c128 firstTen 4, 7, 1 | 8580, FAST, crowbar | `verify: true` | - |
| 17:20, 17:21 | c16 firstTen 2, 4 | 4.9-5.2 V; PAL ±70 ppm | +5 V; step 4 `verify: true` | rule 2 |
| 17:24, 17:81 | c16 / plus4 master clock scope notes | PAL from the TED manual | PAL rate under Clocks | rule 3 |
| 17:26, 17:27, 17:32 | c1571 scope rows, firstTen 6 | 2 MHz in 1571 mode | step 6 `verify: true`; scope rows kept (rate in Clocks from the 1571 SM) | - |
| 17:39 | c1581 firstTen 1 | potted, not repairable | removed | rule 3 |
| 17:86, 17:90 | plus4 firstTen 7, 1 | 0.894 MHz; 5.3 V reject | step 7 `verify: true`; threshold removed | rule 2 |
| 17:125, 17:127, 17:128 | c64 firstTen 1, 3, 4 | 5.25 V max; 8580; 4.9-5.1 V | 5.25 V removed; about +5 V; `verify: true` | rule 2 |
| 17:129 | dram4164 replacement HM4864 / MT4264 / TMS4164 | - | kept; already `verify: true` | - |
| 17:130-132 | c64 scope Φ2, AEC, CAEC | 1.0227 MHz; badline hold | 1.02 MHz; badline clause removed | Sams CC17 |
| 21:28 | cpu8502 pin 24 | ASCII-DIN | CAPS LOCK sense (CAPLK SENSE) | C128 SM schematic |
| 21:88, 21:90 | vic2e pins 8, 10 | open-drain; badline timing | removed / LOW while the VIC needs the bus | rule 3 |
| 21:95 | vic2e pin 15 /DMAACK | in | out; N.C. on the C128 | C128 SM pp. 34-35; sheet 3 (checked: N.C.) |
| 21:112-114 | vic2e pins 40-42 | DRAM address | static outputs for character ROM and colour RAM; DRAM uses pins 32-37 | C128 SM p. 35 |
| 21:115-118 | vic2e DB8-DB11 | bidir | `verify: true` | - |
| 21:133 | mmu8722 pin 17 MUX | out | in, from VIC-IIe pin 21 | C128 SM pp. 27, 35, 67 |
| 21:148 | mmu8722 pin 33 PHI0 | from the CPU | system clock input from the VIC clock path | C128 SM |
| 21:172 | pla8721 pin 13 | Z80 enable | receives Z80 BUSACK; the Z80 enable is MMU pin 43 | C128 SM p. 29 |
| 21:185 | pla8721 pin 29 /SDEN | sprite/data enable | S-data buffer enable | C128 SM p. 29 |
| 21:193 | pla8721 pin 38 /IOCS | includes VIC | CIA1/2, I/O1/2, SID, VDC; VIC on pin 42 | C128 SM p. 29 |
| 21:198 | pla8721 pin 44 | GWE, global write enable | /GWE, colour RAM write enable, active LOW | C128 SM p. 29 |
| 21:206, 21:207 | c128 rails +5 V, +5 V (VDC) | 4.95-5.10 V; VDC diagnosis | +5 V; VDC note adds DRAM, clock, buffers | rules 2, 3 |
| 32:2, 37:7 | pla82s100 replacements | cross-machine exclusions | removed | rule 3 |
| 35:114-119, 35:121, 35:124, 35:126, 35:129, 35:130 | c1541 / c1581 / c64 / vic20 firstTen | unsourced pins, diagnoses | `verify: true` | - |
| 35:122, 35:123 | pet firstTen 1; sid6581 SwinSID | Carlsen (HTTP 406) | `verify: true` | - |
| 35:127 | vic20 firstTen 4 | cold VIC = no power | a cold VIC may itself be dead; fit a known-good one, then check pins 40 / 20 | Carlsen VIC-20 diagnostics |
| 35:131 | rom23128 Switchable ROM | IC5 socket | the ROM socket | rule 3 |

## apple.js

| Ledger | Record | Old | New | Source page |
|---|---|---|---|---|
| 01:42-45 | apple2 / apple2plus / apple2e / apple2c clock 6502 Φ1 (and Φ2) out | 1.0227 MHz from the 6502 sheet | `verify: true` | - |
| 01:79 | kbd3600 pin 31 DlyNode | dir -, external RC | dir in; external capacitor (C71 on the IIe) with the resistor inside the chip | GI AY-5-3600 p. 3-23 (per reviewer); IIe TRM p. 187 |
| 01:137 | disk2p5 pins 17, 19 | A5 = AD5 (slot 7), A7 = AD7 (slot 9) | A5 = AD7 (slot 9), A7 = AD5 (slot 7); "the card crosses A5 and A7" | Apple schematic 050-0005-01, PDF p. 2, P5 at D3 (checked) |
| 02:8 | mc3470 pin 10 probe | trim R28 | removed | rule 3 |
| 02:13 | mc3470 pin 16 probe | 150 mV with the Amplitude test | points at the Read amplitude test point | rule 3 |
| 09:175, 09:176 | apple2 / apple2plus firstTen 2 | four tolerance ranges | nominal +5.0 / +11.8 / -5.2 / -12.0 V (p. 92); `verify: true` | Apple II Reference Manual p. 92 |
| 09:177-184 | apple2 / apple2plus rails | 4.85-5.15 V etc. | +5.0 / +11.8 / -5.2 / -12.0 V; 4116 sentence removed | Apple II Reference Manual p. 92 |
| 09:202, 09:204 | rom2316 pins 18, 21 | 2716 substitution notes | removed | rule 3 |
| 09:219, 09:234 | ii-game16 pin 5 expect | 1 µs LOW pulse | about 0.5 µs (the Φ0 half of the cycle) | Apple II Reference p. 100 Table 29; Sather Table 3.1 (per reviewer) |
| 09:226-229, 09:241-244 | ii-game16 pins 12-15 expect | 0 V or +5 V | TTL LOW or HIGH | rule 3 |
| 10:139, 11:47, 11:48, 11:72 | unidisk525 firstTen 1, 5, 6, 2 | diagnoses / drive-count rule | `verify: true` | - |
| 10:163 | mmu2c pin 21 MD7 | bidir | out (three-state) | same reasoning as 11:139 |
| 10:187 | iou2c pin 7 CASSO | "cassette output on the IIe" | "Reserved on the IIc" | IIc TRM |
| 10:189 | iou2c pin 9 MD7 | bidir | out (three-state) | Sather Fig. 7.1 logic (per reviewer) |
| 10:197-204 | iou2c pins 17-24 RA0-RA7 | bidir | `verify: true` | - |
| 10:219 | tmg2c pin 2 7M | dir out | `verify: true` (TRM also calls GLU 20 the 7 MHz output) | IIc TRM p. 246 |
| 10:223 | tmg2c pin 7 TEXT | - | kept; already `verify: true` | - |
| 10:233-235, 11:45, 11:46 | apple2c / unidisk525 clocks 7M, CREF, Q3 | 7.15909 / 3.579545 / 2.0454 MHz | 7.159 / 3.5795 / 2.045 MHz | IIc TRM pp. 240, 245 |
| 11:111 | apple2e rail -5 V note | slots only | slots and internal video connector pin 3 | IIe TRM Table 7-15 p. 186 |
| 11:113 | apple2e firstTen 1 ifNot | chirping = a short | short, overload, loose cable or rail out of range; retries every half second; then suspect regulation | IIe TRM p. 160 |
| 11:137, 11:138 | mmu344 pins 19, 20 | tied together on the board | separate nets: ROMEN2 $E000-$FFFF, ROMEN1 $C100-$DFFF; do not bridge | IIe schematic sheet 1; Sather Fig. 5.13b (per reviewer) |
| 11:139 | mmu344 pin 21 MD7 | bidir | out (three-state) | Sather Fig. 5.13a (per reviewer) |
| 11:161 | iou344 pin 9 MD7 | bidir | out (three-state) | Sather Fig. 7.1 (per reviewer) |
| 11:185 | iou344 pin 38 /WNDW | LOW outside the window | HIGH during blanking (disables video ROM), LOW during active video | Sather p. 8-11 (per reviewer) |
| 11:194-197 | 2e-cass / 2e-cass-out T, S | 1 V p-p; tip/sleeve | 1 V nominal; `verify: true` on all four pins | IIe TRM p. 189 |
| 12:28 | 2e-slot pin 32 /INH | switches off ROMs | IIe: switches off RAM and ROM except $C000-$CFFF; assert in Φ1, hold through Φ0 | IIe TRM pp. 192, 196 |
| 12:46-63 and the other 2e-aux rows | 2e-aux pins | physical order unproven | kept; the connector is already `verify: true` and its summary says the order is not checked | - |
| 16:181, 16:185 | apple2 / apple2plus Φ0 scope | 1.0227 MHz, duty 50%, Sather 65th cycle | 1.02 MHz, no duty, points at Clocks | Sams CC1 timing photo |
| 16:182, 16:186 | apple2 / apple2plus Φ1 scope | 1.0227 MHz, duty 50% | 1.02 MHz, no duty | Sams CC1 |
| 16:197, 16:198 | apple2c clocks Φ0, Φ1 | 1.0227 MHz | `verify: true` | - |
| 16:199 | apple2c firstTen 1 | "case is sealed" | removed | rule 3 |
| 16:200 | apple2c firstTen 2 | Apple ranges against a Sams source | Sams readings, ranges pointed at Rails; `verify: true` | Sams CSCS7 |
| 16:209, 16:212, 16:215 | apple2c / apple2e PHI0, PHI1 scope | 1.0227 MHz, duty 50% | 1.02 MHz, no duty | Sams |
| 16:213 | apple2e testPoint Master clock where | 2e-aux pin 32 | UE1-11 (Sams), "same 14M reaches 2e-aux pin 32" | Sams CC10 |
| 16:216, 16:217 | apple2e Q3, /PRAS scope | 2.0454 MHz | 2 MHz | Sams CC10 |
| 16:218 | apple2e video scope note | Sather numbers, Apple 1 V | period pointed at Sather (Clocks); Apple 1 V removed | rule 3 |
| 17:0 | apple2e firstTen 2 expect | TRM ranges against a Sams source | Sams unloaded readings; ranges under Rails | Sams CC10 service check 1A |
| 17:4 | apple2e firstTen 6 where | 2e-aux pin 32 | UE1-12 | Sams CC10 |
| 17:123, 17:124 | disk2 TP5 / TP7 scope notes | Sather / Apple procedure | Sams levels only; bit cell pointed at Clocks | rule 3 |
| 18:67 | disk2-ribbon pin 14 expect; disk2 firstTen 3 | HIGH 1 s after the last access | HIGH about 1 s after a drives-off access ($C0E8), at once on RESET | Sather pp. 9-12, 9-13 |
| 18:69 | disk2 firstTen 7 | TP7 / 3470 pin 10 | `verify: true` | - |
| 18:71, 18:72 | duodisk / unidisk525 Bit cell | DB pins | `verify: true` | - |
| 18:84, 18:85 | duodisk / unidisk525 sequencer clock | - | kept; already `verify: true` | - |
| 18:88, 18:89 | apple2 / apple2plus firstTen 5 | about 4 V p-p | removed | rule 3 |
| 34:171-188 | disk2-card-hdr pins 2-20 | analog-board detail on the card side | card side now names only the card-side wiring | 050-0005-01 |
| 34:224 | disk2 firstTen 2 | ribbon / supply diagnosis | `verify: true` | - |
| 35:8 | duo-db25 pin 11 | left-hand drive | removed (also pin 8 right-hand, and the summary) | rule 3 |
| 35:25 | duo-db19 pin 9 | active LOW | `verify: true` | - |
| 35:35-51 | uni-db19 pins | rear UniDisk socket | kept: see disagreements | - |
| 35:52, 35:53, 35:66, 35:69, 35:70 | duodisk firstTen 2, 5, 1, 6, 7 | exclusive diagnoses | softened; `verify: true` | - |
| 35:54, 35:71 | unidisk525 firstTen 3, 4 | DuoDisk procedure | `verify: true` | - |
| 35:55 | duodisk rail +5 V | 4.75-5.25 V | +5 V | rule 2 |
| 35:56, 35:57 | duodisk rails +12, -12 V | slot pin in note | kept (slot pins are in the slot tables) | - |
| 35:58 | disk2 firstTen 1 ifNot | cause of the burst C4 | removed | rule 3 |
| 35:59 | disk2 firstTen 5 | 300 rpm; exclusive branch | 300 rpm removed, scratch disk and 128 passes added; `verify: true` | D2TP pp. 2.8-2.9 |
| 35:60 | disk2 firstTen 8 where | TP5 (3470 pin 7) | TP5 | rule 3 |
| 35:61 | disk2 rail +5 V | 4.75-5.25 V | +5 V (Sams 5.0 V) | rule 2 |
| 35:72 | disk2 firstTen 4 | 0 V off, MPSU51 | removed; `verify: true` | rule 3 |
| 37:218, 37:219 | ls174 / ls259 replacements 74HCT174 / 74HCT259 | - | `verify: true` | - |
| 38:204 | cpu6502 replacement W65C02S | NMOS comparison | `verify: true` | - |

## atari.js

| Ledger | Record | Old | New | Source page |
|---|---|---|---|---|
| 01:46, 01:47 | atari400 / atari800 clock Phase 1 out | exact PAL/NTSC from the 6502 sheet | `verify: true` | - |
| 01:50-53, 14:126 | K0 scope note (all Ataris) | 63.7 µs / 114 cycles attributed to the POKEY sheet | rate stated as half the line rate, line rates under Clocks | POKEY C012294 sheet 10 |
| 02:194, 02:195 | 400/800 clock Phase 2 | label p. II.22 | p. II.20; `verify: true` | Technical Reference Notes PDF p. 441 (printed II.20, checked) |
| 02:199, 02:240, 12:167, 14:4, 18:4 | atari-sio pin 5 expect | idles about +4 V | idles HIGH | rule 3 |
| 02:202, 02:245, 12:171, 14:9 | atari-sio pin 10 expect | +4.9 V (Sams 130XE) | +5 V | rule 3 |
| 02:204, 02:247 | atari-sio pin 12 (400/800) | +11.5 to +12.5 V | +12 V | rule 2 |
| 12:164 | atari-sio pin 2 expect | pulses only during I/O | pulses during serial I/O | rule 3 |
| 18:8, 18:12 | atari-sio pins 9, 13 | not used by the OS | `verify: true` | - |
| 02:206-273 (16 rows), 12:174, 12:175, 14:11-20 | atari-controller(-2..4) pins 1, 2 | "also trackball, touch tablet and paddle trigger" on every direction pin | pin 1: trackball X direction and stylus button; pin 2: trackball X motion; pin 3: paddle A trigger; pin 4: paddle B trigger | Technical Reference Notes p. III.24 (PDF 477, checked); FAQ |
| 17:175, 17:176, 17:183, 17:184 | controller pins 3, 4 | trackball / tablet | removed (paddle triggers only) | III.24 |
| 17:177, 17:180, 17:185 | controller pins 5, 9 expect | 0-5 V analog | removed | rule 3 |
| 02:219-277, 12:180, 14:17, 14:25, 17:187 | controller pin 7 expect | +5 V (Sams 4.9 V on 130XE) | +5 V; 50 mA attributed to the FAQ | FAQ |
| 02:283, 14:113, 18:16 | atari-monitor pin 4 expect | about 1 V p-p into 75 Ω | removed | rule 3 |
| 07:173 | pokey replacement PokeyMAX | extras need extra wiring | clause removed | rule 3 |
| 12:124 | cpu6502c pin 2 RDY | WSYNC pulses | removed | rule 3 |
| 12:127 | cpu6502c pin 6 /NMI | VBI, DLI, RESET key | display interrupts only; XL/XE RESET drives /RES pin 40 | Sams CC16 / 800XL FSM p. 1-5 (per reviewer) |
| 12:128, 12:149 | cpu6502c pins 7, 34 | stock 6502 comparison unsourced | MOS 6500 data sheet p. 10 added to datasheets | MOS 6500 (Nov 1985) p. 10 |
| 12:201, 14:39 | atari-cart pin 14 (XL/XE) | GTIA T3 on the 130XE | clause removed | rule 3 |
| 13:137 | atari-cart pin 14 (400) | RD5 disables RAM | type nc: not connected on the 400 | Atari 8-Bit FAQ cartridge table (checked: "14. RD5 ... except 400: Not Connected") |
| 12:219, 12:252 | atari-pbi pins 2, 43 | functional descriptions | "External select (input)", "Math pack disable (input)" | FAQ PBI table |
| 14:97, 14:98 | atari-pbi pins 47, 48 (600XL) | Reserved N/C | +5 V (type power), conflict keeps the FSM Fig. 1-12 reading | FAQ PBI table (checked: "47. 600XL: +5V ... 800XL: Reserved") |
| 13:0, 14:104-109, 14:132, 14:133, 17:160-166, 18:30-32, 38:190, 38:193, 38:196, 38:199 | Atari clock rows colour clock, fast phase 0, phase 0, phase 1/2 | exact PAL values not in the cited page | `verify: true` | - |
| 13:2, 13:5-7, 17:151 | 400/800 crystal and colour clock | 3.579545 MHz | crystal row 3.58 MHz; colour clock `verify: true`; 400 crystal now cites FSM p. 5-16 (400 flow chart), 800 keeps p. 7-20 | 400/800 FSM |
| 13:3, 13:4 | 400/800 firstTen 4 | FSM symptom checklist source; 4116 warning | source changed to the Sams preliminary service checks; warning removed | Sams CC5 / CC7 p. 3 |
| 13:11-18 | 400/800 rails | 4.75-5.25 / 11.5-12.5 / -4.5 to -5.5 V | +5 V / +12 V / -5 V; -5 V warning removed | rule 2 |
| 13:24 | antic pin 7 /NMI | VBI / DLI | `verify: true` | - |
| 13:27-42 | antic A0-A13, A15 | dir bidir | `verify: true` with "direction not stated in the cited pin figures" | - |
| 13:31 | antic pin 15 RDY | WSYNC | removed | rule 3 |
| 13:49 | antic pin 35 probe | Sams 800, 800XL photos | Sams 130XE photo only | Sams CC16 |
| 13:65-68 | gtia pins 12-15 | CONSOL bit numbers | removed | rule 3 |
| 13:103-110 | pokey K0-K4, KR1, KR2 probes | "all the time", "(Sams)" | "while the keyboard scan runs"; `verify: true` | - |
| 13:114 | pokey pin 29 /IRQ | interrupt causes | removed | rule 3 |
| 13:219 | atari600xl firstTen 1 ifNot | 5.25 V, fails high and kills RAM | "outside that band: do not plug it in" | 600XL FSM p. 1-10 |
| 13:222 | atari130xe rail +5 V | 4.9-5.1 V (600XL spec) | +5.0 V (Sams) | Sams CC16 p. 2 |
| 14:118, 17:170 | 800XL / 130XE HALT scope note | mode dependence, flat-LOW diagnosis | removed; line rate attributed to Hardware Manual | - |
| 14:119, 17:155, 17:171 | composite sync scope notes | PAL 15.56 kHz, p. II.22 | NTSC from Hardware Manual p. II.20, PAL under Clocks | TRN PDF p. 441 |
| 14:120, 14:121 | 800XL video / luma scope notes | unloaded, half into 75 Ω | removed; period attributed to Hardware Manual | rule 3 |
| 14:122 | XL/XE firstTen 1 brick | 4.7 Ω 5 W load, 4.9-5.1 V, 5.25 V | unloaded +5.0 V (Sams); load test moved to supply note with a 10 W resistor (5.3 W at 5 V) | Sams CC11 p. 27; arithmetic |
| 14:124 | atari130xe firstTen 2 | 800XL source | Sams CC16 p. 12 (check J7 for a short) | Sams CC16 |
| 14:127 | 800XL tape scope note | Technical Reference Notes p. 180 | OS User's Manual printed p. 195 (TRN PDF p. 180) | TRN PDF p. 180 (checked) |
| 14:131, 18:29 (and the 400, 130XE copies) | firstTen CPU running | pin 9 to pin 25 | pins 9-20 and 22-25 (pin 21 is ground) | 6502 pinout; Sams CC7 p. 11 |
| 14:134 | 800XL firstTen 5 ifNot | FSM C109 sentence | removed | rule 3 |
| 17:148 | atari400 firstTen 6 | 1.79 MHz | "about 1.79 MHz"; `verify: true` | - |
| 17:152-154 | 400 scope colour clock, phase 0, phase 2 | 3.579545 / 1.78977 MHz | 3.58 / 1.79 MHz as Sams prints | Sams CC5 p. 28 |
| 17:156 | 130XE firstTen 1 | 4.7 Ω load, 5.25 V | +5.0 V unloaded (Sams) | Sams CC16 p. 12 |
| 18:33 | 800 colour clock scope | 3.579545 MHz, FSM flow sentence | 3.58 MHz; sentence removed | Sams CC7 |
| 38:189 | 600XL firstTen 2 | 4.9-5.1 V under 4.7 Ω 5 W | about 5 V under a 4.7 Ω 10 W load | Valoroso; arithmetic |
| 38:191, 192, 194, 195, 197, 198, 200-203 | CLK_LINE / CLK_FRAME rows | GTIA pin 25 not in Altirra | `verify: true` | - |

## coleco.js

| Ledger | Record | Old | New | Source page |
|---|---|---|---|---|
| 01:232 | adam testPoint 6801 E clock scope | duty 50% | duty removed | rule 3 |
| 02:183 | adam testPoint Z80 clock scope | f 3.579545 MHz | 3.58 MHz; 50% duty kept (TRM 2.2.8 states it) | ADAM TRM p. 35 (checked) |
| 18:98 | adam firstTen 5 reset | Z80 pin 26 / 6801 pin 6 | `verify: true` | - |
| 27:191 | adam clock System oscillator | 7.15909 MHz | 7.1 MHz | ADAM TRM 2.2.8, PDF p. 35 (checked) |
| 27:192 | adam clock Z80 clock | 3.579545 MHz | 3.58 MHz | ADAM TRM PDF p. 35 |
| 27:193 | adam clock VDP clock | TMS9918A, 10.738635 MHz | "TMS9928A; third harmonic", 10.7 MHz | ADAM TRM PDF pp. 33, 35 (checked: "TI 9928", "10.7 MHz") |
| 27:227, 27:267 | cv-controller / adam-controller pin 7 | SPINNER B | SPINNER A (quadrature input A) | Deathskull "ColecoVision Controller Port", Steering Wheel table (checked) |
| 27:229, 27:269 | cv-controller / adam-controller pin 9 | SPINNER A | SPINNER B (quadrature input B) | same |
| 27:274 | adam-expansion pin 5 | $4000-$5FFF | Y2 per TRM; range noted as ColecoVision only; `verify: true` | ADAM TRM PDF p. 20 |
| 27:275 | adam-expansion pin 6 | $2000-$3FFF | Y1 per TRM; same; `verify: true` | ADAM TRM PDF p. 20 |
| 27:276 | adam-expansion pin 7 | Z80 HALT output | `conflict`: TRM prints "HALT input" | ADAM TRM PDF p. 20 |
| 27:278 | adam-expansion pin 10 | redraw net QUAD | removed for ADAM | ADAM TRM PDF p. 27 |
| 27:295 | adam-expansion pin 29 | /MEMMAPOVR, module pulls low | AUX DECODE 1: from the Memory and I/O board, selects the OS-7 ROM | ADAM TRM PDF p. 26 (checked) |
| 27:296 | adam-expansion pin 30 | /IOMAPOVR | AUX DECODE 2; `verify: true` | ADAM TRM PDF p. 20 |
| 27:300 | adam-expansion pin 34 | /EXT_RST input | GAME MODE RESET output | ADAM TRM PDF p. 20 (checked) |
| 27:320 | adam-expansion pin 56 | AUDIO | kept; already `verify: true` with the TRM wording | - |
| 27:343 | adam firstTen 3 | +4.82 to +5.15 V at the chip | about +5 V (cable tolerance named); `verify: true` | ADAM TRM 6.3 |
| 27:344 | adam firstTen 4 ifNot | "stresses the 4116" | cable / J9 / supply check only | rule 3 |
| 27:347 | adam firstTen 8 | flat-line diagnosis | `verify: true` | - |
| 28:84-86 | colecovision rails +5, +12, -5 V | 4.9-5.2 / 11.4-12.6 / -4.5 to -5.5 V | +5 V / +12 V / -5 V | rule 2 |
| 30:58 | colecovision clock CPU | U8B, R60 47 Ω | "3.58 MHz, divided by two" | Coleco TM VII-5 |
| 30:59 | colecovision clock VDP | U22A/B, L14/C92; 10.738635 MHz | third harmonic; 10.7 MHz | Coleco TM III-5 |
| 30:62 | cv-rf pin 2 | shield ground | `verify: true` | - |
| 30:68 | colecovision firstTen 1 | plug pins, readings | `verify: true` (pins from Deathskull) | - |
| 30:70 | colecovision firstTen 3 | -5 V on 4116 pin 1 | removed; +12 V checks only | Coleco TM VI-13 |
| 30:72, 30:77 | colecovision master oscillator (test point, step 5, clock) | "74LS04 output"; 5 µs/div misprint inference; 7.15909 MHz | "oscillator output"; inference removed; 7.159 MHz | Coleco TM VII-19 |
| 30:73 | colecovision firstTen 6 | 0 to about 4.9 V | removed | rule 2 |
| 30:74 | colecovision firstTen 7 | about 3.4 V peaks | removed | rule 3 |
| 30:76 | colecovision testPoint Z80 clock scope | duty 50% | removed | rule 3 |
| 30:78 | colecovision testPoint VDP clock scope | 10.738635 MHz, 0-3.4 V, U22A/B L14/C92 | 10.7 MHz, no levels, topology removed | Coleco TM VII-17 |
| 30:79 | colecovision testPoint Colour reference scope | 8.6-10.6 V | pp 2 V; DC roughly +10 to +12 V in the note | Coleco TM VII-5, PDF p. 60 (checked; see disagreements) |
| 30:80 | colecovision testPoint Sound clock scope | 0.2-2.3 V; misprint inference; R61/R64 | pp 2 V; inference and divider removed | Coleco TM VII-18 |
| 30:81 | colecovision testPoint VDP luma scope | 1.6 / 2.1 / 3.3 V | 2.0 / 2.4 (black) / 3.5 V | Coleco TM VII-16, PDF p. 71 (checked) |
| 31:37-41 | colecovision / adam clocks line rate, frame rate, GROMCLK | VDP manual only | `verify: true` | - |

## sinclair.js

| Ledger | Record | Old | New | Source page |
|---|---|---|---|---|
| 01:162 | dram4116 pin 14 DOUT | high impedance otherwise | also driven in read-modify-write and delayed-write cycles until /CAS HIGH; Hi-Z in early write | Mostek 1980 data book p. V-40 (PDF 105) |
| 02:184-187 | zx80 / zx81 / +2 / +3 CPU clock scope | rate not in Z80 sheet | kept; each note names the document the rate comes from | - |
| 26:165 | spectrum firstTen 4 | +10.8 to +13.2 V | +12 V, investigate if more than 1 V out; ifNot adds "keep powered checks short: new TR4/TR5 can burn out again" | Retroleum "Repairing a ZX Spectrum" (checked) |
| 32:54 | zx80-edge B2 expect | +7 to +11 V | ZX80: +9 to +11 V; ZX81 keeps +7 to +11 V | ZX80 / ZX81 circuit diagrams (ZX81 SRC 049 checked) |
| 32:74 | zx80 firstTen 3 | 7805 or short | `verify: true` | - |
| 32:76 | zx80 rail +9 V where | Power jack tip | Power jack | rule 3 |
| 32:85 | zx80 firstTen 1 | about 14 V no load | removed | rule 3 |
| 32:88 | zx80 firstTen 6 | "the keyboard" | "suspect the keyboard"; `verify: true` | - |
| 32:100 | ula_zx81 pin 12 probe | Stuck HIGH = no RAM | removed | rule 3 |
| 32:103 | ula_zx81 pin 15 probe | pulses while display runs | pulses while the NMI generator is on (OUT $FE on, OUT $FD off) | Rea ZX81 ULA notes |
| 32:120 | ula_zx81 pin 35 | X1 only external part | X1 plus C6 100 pF, C7 47 pF, R4 18k | ZX81 SRC 049 (checked) |
| 32:144 | zx81 clock Field rate | 50/60 Hz | `verify: true` | - |
| 32:191 | zx81 firstTen 3 | +4.75 to +5.25 V | +5 V; `verify: true` | rule 2 |
| 32:194 | zx81 rail +9 V | tip; dropout note | "Power jack"; note quotes the diagram's +7 V to 11 V | ZX81 SRC 049 |
| 32:195 | zx81 rail +5 V note | hot 7805 = short | removed | rule 3 |
| 32:224 | ula_spectrum pin 19 KB0 | R64-R68 | R65-R69 (Issue 3) with `conflict` naming the service manual's R64-R68 | Issue 3 diagram vs SM prose |
| 33:8 | spectrum firstTen 1 ifNot | >900 mA = short; centre negative | removed | rule 3 |
| 33:9 | spectrum firstTen 2 ifNot | reverse polarity kills 7805 | removed | rule 3 |
| 33:10 | spectrum firstTen 3 ifNot | coil buzz; 4116s die | TR4/TR5 check; restore -5 V before new 4116s | SM 6.1 |
| 33:12 | spectrum testPoint CPU clock scope | 3.5 MHz | kept; note and Clocks cite WoS | - |
| 33:13 | spectrum firstTen 7 | idle levels | `verify: true` | - |
| 33:14 | spectrum firstTen 8 | ULA 12/35/1 | `verify: true` | - |
| 33:17 | spectrum rail +12 V note | low +12 V kills RAM | out-of-range rails can damage the 4116s (Retroleum) | Retroleum |
| 33:19 | spectrum rail -5 V note | endangers 4116s | same | Retroleum |
| 33:21 | spectrum firstTen 6 | 3.5 MHz | names WoS; `verify: true` | - |
| 33:22-24 | spectrum Y, U, V scope notes | 64 µs as a misprint correction; logo screen | period attributed to WoS (Clocks); logo removed | - |
| 34:7-10 | spectrum128-mic T/S, spectrum128-tv 1/2 | terminal assignments | `verify: true` | - |
| 34:25-28 | spectrum128-edge A15-A18 | 48K video pins | `verify: true` | - |
| 34:56 | spectrum128-edge B20 | 4116 Vbb, -4 to -5.5 V | -5 V for expansion devices only; 128 RAM is 4164 | 128 SM 6.1 / parts list |
| 34:58 | spectrum128-edge B22 | +10.8 to +13.2 V | +11.5 to +12.5 V; 128 SM 2.3 (p. 4.4) added to sources | 128 SM p. 4.4 |
| 34:64, 34:65 | spectrum128 firstTen 1, 2 | pack/socket and short diagnosis | pack clause removed; step 2 `verify: true` | - |
| 34:67 | spectrum128 firstTen 4 | IC34 leg 1 | check text notes the IC33/IC34 inconsistency; `verify: true` | 128 SM p. 4.4 vs 6.1 |
| 34:69, 34:70 | spectrum128 firstTen 6, 7 | replacement order | `verify: true` | - |
| 34:78, 34:79 | spectrum128 crystal / CPU clock scope notes | replacement order | removed | rule 3 |
| 34:82, 34:148 | +2 / +3 firstTen 1 | bars and tone, user manual | "then tune the TV" | rule 3 |
| 34:84, 34:150 | +2 / +3 firstTen 3 | colour bars and tone | "a picture and sound" | service manual flow charts |
| 34:100, 34:101, 34:139 | spectrumplus2-edge A3, A4, B22 | 48K ranges | +5 V / +9 V DC nominal / +12 V | rule 2 |
| 34:108 | spectrumplus2-edge A13 | TR6 | TR7 | +2 SM circuit diagram (per reviewer; scan too coarse to read) |
| 34:110-113 | spectrumplus2-edge A15-A18 | VIDEO, /Y, V, U | N/C (NOT USED) | +2 SM p. 7 (PDF 5) edge table (checked) |
| 34:119 | spectrumplus2-edge A25 | R33 | R24 (680 ohm) | +2 SM circuit diagram (per reviewer) |
| 34:131 | spectrumplus2-edge B13 | every 20 ms | once per frame | rule 3 |
| 34:137 | spectrumplus2-edge B20 | 4116 Vbb, range | -5 V for expansion; +2 RAM is 4164 | +2 SM parts list |
| 34:140 | spectrumplus2-edge B23 | -12 V | 12V AC (pulsed +12 V) | +2 SM p. 7 (PDF 5) edge table (checked) |
| 34:152 | +3 firstTen 5 | drives A: and M: listed | "Opening menu" | rule 3 |
| 34:154 | +3 firstTen 7 ifNot | RAM test report after no test card | no test card: built-in diagnostics cannot start; use the service-ROM border-colour test; `verify: true` | +2A/+3 SM self-test pp. 3, 17 (per reviewer) |
| 35:73 | zx81 clock CPU | Z80 pin 6 | `verify: true` | - |
| 35:75-77, 38:243 | zx81 firstTen 4, 5, 7, 6 | X1 only; replacement order | X1 sentence removed; NMI-off case added; `verify: true` | - |
| 35:132 | dram4116 replacement Retroleum lower RAM | -5 V / sindik.at sentence | removed | rule 3 |
| 36:137-140 | spectrum clocks pixel, CPU, line, frame | pins not in WoS timing page | `verify: true` | - |
| 36:152, 36:157 | spectrumplus3-joystick pins 2, 8 COMMON | ground, 0 V | type kbd: scanned keyboard line, not ground | +3 manual ch. 10; +2A/+3 circuit (per reviewer) |
| 36:259 | spectrumplus3-exp L4 | (+9 V on the 48K) | removed | rule 3 |
| 36:273 | spectrumplus3-exp L19 | LOW then HIGH | expect removed | rule 3 |
| 37:0, 37:1 | +3 clocks CPU, AY | pin numbers | `verify: true` | - |
| 37:96 | ula_spectrum replacement Nebula | Issue 2-6, 6C001E-7, new socket | removed | rule 3 |
| 38:187 | ula_zx81 replacement vLA81 | 60 Hz on a TS1000 | removed | rule 3 |
| 38:211, 220, 221, 228, 229 | cpuz80 pins 6, 16, 17, 25, 26 | machine-specific probe text | made true for every machine (rule 5) | Zilog UM0080 pp. 5-8 |
| 38:222 | cpuz80 pin 18 /HALT | until an interrupt | until NMI, enabled INT or reset | Zilog UM0080 p. 6 |
| 38:224 | cpuz80 pin 20 /IORQ probe | port access only | also with /M1 on interrupt acknowledge | Zilog UM0080 p. 6 |

## timex.js

| Ledger | Record | Old | New | Source page |
|---|---|---|---|---|
| 02:188 | ts1000 testPoint CPU clock scope | rate from ZX81 sheet | kept; test point already `verify: true` | ZX81 SRC 049 |
| 02:189 | ts2068 testPoint CPU clock scope | 3.528 MHz | kept; rate is cited in the note and in clocks (TM 2.1.8.2 p. 42) | TS2068 TM p. 42 |
| 18:49 | ts1000-tv pin 1 expect | ch 2 (55.25 MHz) / ch 3 (61.25 MHz) | VHF channel 2 or 3 carrier | TS1000 UM ch. 1 |
| 18:50 | ts1500 rail +5 V | 4.9-5.2 V | +5 V (already verify) | rule 2 |
| 18:51-52 | ts1500 rails +12 V, -5 V | About +12 V / -5 V | kept; already `verify: true` | - |
| 18:53 | ts2068 testPoint composite video scope | 63.5 µs period | kept; the note names TM 14.112 MHz / 896 (clocks row cites TM p. 42) | TS2068 TM p. 42 |
| 18:60 | ts2068 firstTen 1 expect | 20.4 V (Sams); 14-25 V (TM) | 20.4 V DC on the board (Sams) | Sams CC19 p. 8 |
| 18:62 | ts2068 firstTen 3 expect | 12.0 V (11.5-12.5 V) | 12.0 V | Sams CC19 p. 8 |
| 18:63 | ts2068 firstTen 4 expect | 4.75-5.25 V at the chips | about +5 V at the chips | Sams CC19 p. 8 |
| 32:145 | ts1000 clock Resonator X1 | 6.5 MHz | kept; already `verify: true` | - |
| 32:146 | ts1000 clock Field rate | 60 Hz | `verify: true` | - |
| 32:193 | ts1000 firstTen 3 | +4.75 to +5.25 V | +5 V; `verify: true` | rule 2 |
| 32:201 | ts1000 firstTen 1 | +8 to +12 V on load | about +9 V on load; `verify: true` (ZX81 source) | rule 2 |
| 32:202 | ts1000 firstTen 2 | ZX81 advice | `verify: true` | - |
| 32:203 | ts1000 rail Power in | 8-12 V on load | about 9 V on load; `verify: true` | rule 2 |
| 32:204 | ts1000 rail +5 V | 4.9-5.2 V | +5 V (already verify) | rule 2 |
| 32:205 | ts1000 rail GND | pins | `verify: true` | - |
| 33:137 | ts1000-edge B1 expect | +4.9 to +5.2 V | +5 V | rule 2 |
| 33:138 | ts1000-edge B2 expect | +8 to +14 V DC | about +9 V DC (about 14 V unloaded) | k1 TS1000 Connectors |
| 35:74 | ts1000 clock CPU clock | 3.25 MHz | kept; already `verify: true` | - |
| 35:78-81 | ts1000 firstTen 4, 5, 7, 8 | ZX81 ULA notes | `verify: true` | - |
| 38:244 | ts1000 firstTen 6 reset | LOW then HIGH | `verify: true` | - |

## ti.js

| Ledger | Record | Old | New | Source page |
|---|---|---|---|---|
| 01:54 | grom0430 replacement TI-GROMmy | U500-U502; FinalGROM remark | kept; designators match the TI Technical Data schematic (U500, U501, U502 on sheet 60) | TI Technical Data PDF p. 62 |
| 14:198 | ti994a testPoint GROM clock scope note | "425 to 470 kHz"; timebase correction | range removed; rate pointed at the GROMCLK clocks row (VDP Data Manual) | rule 2 |
| 14:199 | ti994a testPoint composite at VDP scope note | VDP 5.3 sync/black/white levels | removed; period pointed at VDP Data Manual Table 3-3 | rule 3 |
| 14:200 | ti994a testPoint video out scope note | 63.7 µs unsourced | note names the VDP Data Manual (Clocks) | - |
| 14:204 | ti994a testPoint CPU phases scope | duty 25%; 10-12 V spec | duty removed; spec clause removed | rule 3 |
| 14:205 | ti994a testPoint tank scope note | "(TI chart p. 87)" | removed | rule 3 |
| 14:206 | ti994a testPoint OSCOUT scope note | 4x rule, fault attribution | removed | rule 3 |
| 14:207 | ti994a testPoint 9901 TTL clock scope | duty 75% | removed | rule 3 |
| 14:208 | ti994a firstTen 1 | 18 / 8.5 / 26 V AC | kept; already `verify: true` | - |
| 14:209 | ti994a firstTen 3 ifNot | short-hunt per TI chart p. 87; 4116 pin 1 | "suspect a short ... unplug and recheck"; `verify: true` | rule 3 |
| 30:83 | vdp9918 replacement F18A / F18A-MK2 | pins 35/36 NC for both; 2012-17, 550 boards | NC only on original F18A; MK2 pins 35/36 are 3.3 V FPGA I/O; dates and count removed | dnotq.io F18A pin-out (Wayback 20250120), "MK2 Pin Out" |
| 31:42 | ti994a clock VDP crystal Y100 | source VDP manual only | source TI Technical Data schematic sheet 59 (Y100 10.7 MHz, VDP 39-40) | TI Technical Data PDF p. 61 |
| 31:44 | ti994a clock GROMCLK to GROM pin 13 | - | kept; TI Technical Data PDF p. 64 GROM sheet shows "SH1-U100-37 (grmclk)" | TI Technical Data PDF p. 64 |
| 31:73 | psg76489 pin 4 READY | about 32 clocks | 32 clocks on SN76489AN; count differs between family members | SN76489AN data sheet p. 5 |
| 31:82 | psg76489 pin 14 CLOCK | SN94624 extrapolation | kept; already `verify: true` and says no SN94624 sheet was checked | - |
| 31:105 | grom0430 pin 10 /GS | only matching GROM drives data | data read: matching GROM only; address read: every GROM drives | TI-99/4A Servicing Manual printed p. 48 (PDF 57) |
| 31:219-222 | tms9901 pins 12-15 IC3-IC0 | "to the 9900" | not wired on the 99/4A; 9900 IC3 pin 33 to +5 V, IC2-IC0 pins 34-36 grounded (level 1); only INTREQ pin 11 routed | TI Technical Data sheet 60 (PDF p. 62), checked |
| 31:320 | ti994a-cartridge pin 33 GROM VSS | type ground | type power; biased below ground by CR500/R501; grounds are 2, 35, 36 | TI Technical Data sheet 62 (PDF p. 64) |
| 31:323 | ti994a firstTen 2 | Sams L6 21.5 V; probe order | Sams clause removed; `verify: true` | rule 3 |
| 31:328 | ti994a rail -5 V note | "the 4116s die" | "risks damaging them" | rule 3 |
| 32:5 | vdp9918 replacement PICO9918 | RP2040 | RP2040 on PICO9918 and earlier PRO; RP2350 on PRO v2.0 | visrealm/pico9918 README, "PRO v2.x" |

## photos.js

No ledger rows.

## Source labels and blocked links (batch reports)

| Report | Record | Old | New |
|---|---|---|---|
| batch-01 | mcu6801 datasheets (coleco.js) | MC6801 RM Fig. 3-1, p. 3-2 | p. 3-1 (PDF p. 46) |
| batch-04 | c128 IEC source (commodore.js) | C128 Service Manual, serial bus, p. 55 (PDF 57) | p. 54 |
| batch-12 | cpu6502c datasheets (atari.js) | 600XL FSM Fig. 1-3, p. 1-6 | p. 1-5 |
| batch-38 | Disk II sources (apple.js) | Sather Fig. 9.7 p. 9-10; Table 9.1 p. 9-11; Drive Off/On p. 9-13 | 9-11; 9-12; 9-14 |
| batch-03, 04, 06, 21 | Ray Carlsen pages | portcommodore.com 406 / Wayback 429 | no change: both the live pages (HTTP 200 with a browser user agent, checked) and the Wayback copies are already linked |
| batch-30 | vdp9918 F18A replacement (ti.js) | dnotq.io certificate failure | no change: the chip's datasheets already carry the Wayback copy as a second link |

## Disagreements with the reviewer

- 30:79 colecovision Colour reference scope (Coleco TM VII-5, PDF p. 60, checked). Reviewer reads +9.5 to +11.5 V; the
  data had +8.6 to +10.6 V. Reading the ground arrow on the rendered page gives roughly +10.4 to +12.4 V. The marker is too
  coarse to settle it, so the scope now gives only `pp: 2 V` and the note says "roughly +10 to +12 V".
- 30:81 colecovision VDP luma scope (VII-16, PDF p. 71, checked). Reviewer reads 2.1 / 2.6 / 3.9 V; my reading is
  2.0 / 2.4 / 3.5 V (sync / blanking / peak). The data now carries my reading; both are well above the old 1.6 / 2.1 / 3.3 V.
- 35:35-51 uni-db19 pins (apple.js). The reviewer judged them as the UniDisk's own rear daisy-chain socket. The record is the
  controller-card / IIc-port DB-19, sourced to TA37054 and IIc TRM Fig. 11-26; its summary already says the rear socket's
  table is not known. Kept as is.
- 02:189, 18:53 (timex), 33:12 (sinclair), 14:126 and 17:26-27 (atari, commodore) scope rates: the reviewer marked the scope's
  single source silent on the rate, but each note names the document the rate comes from and that document is cited on the
  machine's Clocks row. Kept.
- 31:44 ti994a GROMCLK to GROM pin 13: the TI Technical Data GROM sheet (PDF p. 64, checked) shows "SH1-U100-37 (grmclk)" in.
  Kept.

## Not fixed

- 34:108 and 34:119 (+2 edge A13 TR7, A25 R24) were applied from the reviewer's reading; the +2 manual scan is too coarse
  to read those designators.
- Most WRONG rows marked "(per reviewer)" were not re-opened (time); the ten marked "(checked)" were. The reviewer's
  corrections agree with the wider data and with the pages that were opened.
- Scope blocks and rails cannot show a CHECK stamp, so where a claim on them is likely but unsourced it was removed rather
  than flagged.
- Board-specific waveform rates on scope rows still rely on a second document named in the note (see disagreements).
