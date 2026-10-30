# Clock pins: expected frequency per machine

Checked 2026-10-30. Goal: every `type: 'clock'` pin on a ready machine has a `power.clocks` (or test point / rail)
row whose `where` names it, so PIN DETAIL shows the frequency expected on that machine.

`node scripts/validate-data.mjs | grep -c "clock has no expected frequency"`: **137 before, 57 after** (0 FAIL).

## Pins covered, by machine

| Machine | Pins now covered | Source of the wiring / frequency |
|---|---|---|
| pet | 6502 pin 3, 39; PIA pin 25; VIA pin 25; CRTC pin 23 | Dynamic PET 320349 sheets 1-3 (pin 39 to A10 7417 as BΦ2, to C5/C6/C7 pin 25; pin 3 open); Universal board 8032087 sheet 10 (CRTC E on BΦ2) |
| vic20 | VIC pin 35, 38, 39; 6502 pin 3, 39; VIA pin 25 | Version E schematic (UE1/UE2 two-phase oscillator into pins 38/39; PΦ1 pin 35 through UE3 to Φ0); VIC-I notes (zimmers) for 14.31818 / 4.433618 MHz |
| c128 | SID pin 6; CIA pin 25; MMU pin 33 | 310378 sheet 1 (SID PHI IN on 1MHZ; MMU ΦIN on the 2MHZ net with 8502 ΦIN); SM 314001-08 p. 6 (I/O chips stay on 1 MHz) |
| c1541 | VIA pin 25; 6502 pin 3; 325572 pin 19; 251828 pin 21, 37; 251829 pin 1 | 251748 rev E sheets 2-3; 1541 SM clock circuits (16 MHz / 13-16 per zone); 1571 SM gate array table |
| c1571 | 251828 pin 21; VIA pin 25; CIA pin 25; 6502 pin 3 | 310420 (T1 OSC to U5/U6, PHI_1 through FB2/R2); 1571 SM p. 8 |
| c1581 | 6502 pin 3, 39 | 252380 sheets 1-3 (PHI_1 open; PHI_2 via FB2/R3 to 8520 pin 25) |
| apple2, apple2plus | 6502 pin 3 | MOS 6500 data sheet p. 4 (Φ1/Φ2 out follow Φ0) |
| apple2e | 6502 pin 3, 39 | MOS 6500 data sheet p. 4 |
| atari400, atari800 | 6502 pin 3; PIA pin 25 | Hardware Manual Φ2 rate; 6500 data sheet (PIA feed not traced, said so in the note) |
| atari130xe | ANTIC pin 29 | Sams 130XE Φ2 row; ANTIC pinout (Φ2 input) |
| colecovision, adam | TMS9918A pin 37 | VDP Data Manual 5.5 (GROMCLK = crystal / 24); CV Rev J redraw sheet 8 shows it open |
| hero1 | ADC0804 pin 4 | ET-18 Technical Manual p. 77 (phase 2 clock to U602 pin 4) |
| herojr | PIA pin 25; ACIA pin 14; TL851 pin 10 | HERO Jr TM p. 24 (E = 1 MHz); TL851 data sheet (/8.5, /4.5) with the 420 kHz Y301 |
| pc5150, xt5160 | 8237A pin 12; 8087 pin 19; 6845 pin 21 | PC / XT Technical Reference (coprocessor uses the same clock; DMA five-clock transfers; MDA 9-dot box at 16.257 MHz) |
| cpc464 | 40010 pin 4, 14, 19 | Existing CPC rows (40010 boards); CPCWiki Gate Array (/CPU ADDR is 1 MHz) |
| cpc664, cpc6128 | 40010 pin 14 | CPCWiki Gate Array |
| bbcb | VIA pin 25; ACIA pin 14; 7002 pin 2; SERPROC pin 10; ADLC pin 13; SN76489 pin 14; 1770 pin 18 | Circuit diagram 105,000/C (1MHZE, 2MHZE, 4MHZ labels); SM 3.1; WD1770 data sheet |
| bbcmaster | 65SC12 pin 39; SAA5050 pin 20; VIA pin 25; ACIA pin 14; SERPROC pin 10; 7002 pin 2; RTC pin 3, 21 | Master SM 7.1.2, p. 22; drawing 0143,000 (1MHzE to IC45/IC48/IC49; CKFS to +5VB, CKOUT to TP1); MC146818A data sheet |
| electron | 6502 pin 3, 39; 74LS169 pin 2; 7474 pin 3, 11 | Electron SM 5, 8.7 c), 8.8 |
| coco1, coco2, coco3 | SAM pin 6 (coco1); PIA pin 25 | Existing E rows; 6821 E is the bus clock |
| model4 | 1793 pin 24 | Model 4 TRM (1983) 4.1.5, p. 60 |
| dragon32, dragon64 | PIA pin 25; 6551 pin 7, 27 | CD41505 sheet 3 (6551 pin 27 on E, crystal on pins 6-7) |

## Pins left, and why

| Machine | Pin | Reason |
|---|---|---|
| vic20 | VIC pin 36 | PΦ2 out is not connected on Version E. The old row said VIC pin 36 drove the CPU; the schematic shows pin 35. |
| plus4 | 6551 pin 5 | RxC: baud clock set by software (or input). |
| plus4 | 6551 pin 27 | Φ2 feed not traced (the 7501 clock changes 0.88 / 1.76 MHz). |
| c128 | VDC pin 1 | CCLK = dot clock / character width set in VDC R22; no source states the rate. |
| c128 | PLA pin 47 | CLK is fed by /CAS (310378 sheet 1), a DRAM strobe, not a fixed clock. |
| c1541 | 325572 pin 23 | CLK-IN feed not traced on 251748. |
| c1541, c1571 | 251828 pin 32, 251829 pin 12 | PLL sampling clock follows motor speed; no frequency in the 1571 SM. |
| c1581 | 8520 pin 19 | No clock: TOD is a J1/R5 strap (WD1770 vs WD1772). Chip text corrected. |
| c1581 | 8520 pin 40 | CNT: Timer A shift clock, burst only, set by software (max φ2/4). |
| apple2, apple2plus | MM5740 pin 3 | 7400 RC oscillator on the keyboard; no frequency in the Reference Manual. |
| colecovision, adam | TMS9918A pin 38 | These use the 9928A: pin 38 is R-Y, not a clock. |
| colecovision, adam | TMS9918A pin 39 | Open on the CV Rev J redraw (VCLK drives pin 40 only); ADAM not checked. |
| adam | SN76489 pin 14 | TRM does not state the sound clock. |
| ti994a | TIM9904 pin 2, 17 | TANK2 is a tank node (no sourced value); OSCIN is tied to +5 V (R604). |
| mc10 | 6803 pin 2 | XTAL1: the clock comes in on EXTAL from the MC1372; pin 2 use not shown. |
| model1 | 1771 pin 26 | FDCLOCK is only used with external separation (XTDS low); EI wiring not checked. |
| model3, model4 | 1793 pin 26 | RCLK from the WD1691 follows the read data. |
| hero1 | ADC0804 pin 19 | External clock on CLK IN; CLK R has no oscillator. |
| hero1, herojr | SC-01A pin 15, 16 | Internal RC oscillator with a pitch pot: no fixed frequency. |
| herojr | RTC pin 21 | CKFS state not read; CKOUT is time base / 1 or / 4. |
| herojr | ADC0831 pin 7 | Bit-banged by software from PIA $D841. |
| herojr, bbcb, bbcmaster | ACIA pin 3, 4 | Baud clocks picked by jumper (HERO Jr) or SERPROC register &FE10. |
| bbcb, bbcmaster | SERPROC pin 18, 26 | Software-set baud clocks to the ACIA. |
| bbcb, bbcmaster | ADLC pin 4, 5 | Econet clock from the network master station. |
| bbcmaster | ADLC pin 13 | On the Econet module (Φ2 IN at SK5 pin 4); module not drawn. |
| bbcb, bbcmaster | 7002 pin 1 | XO not used with the external clock (Master: NC). |
| bbcb | 8271 pin 3 | Trace not readable on the 105,000/C scan. |
| pc5150, xt5160 | 8284A pin 14 | EFI unused: the board runs the 8284A from its crystal. |
| cpc664, cpc6128 | 765 pin 21, 22 | WCK rate and the RDW window come from the FDC9216 board logic; no source states them. |
| dragon64 | 6551 pin 5 | RxC open on CD41505 sheet 3. |

## Shared pin text made generic

- `cia6526` pin 25, `sid6581` pin 6: "Phase 2 system clock input" (was "from the CPU (6510 pin 39)", shown on the C128).
- `serproc` pin 10: "Enable (bus clock) input" (BBC B uses 2MHzE, the Master 1MHzE).
- `cpu6809e` pin 34, `vdg6847` pin 33, `sam6883` pins 5 and 7: CoCo values removed (wrong on the Dragon).
- `fdc1793` pin 24: Model III U24 detail moved to the Model III clocks row.
- `rtc146818` pin 2: HERO Jr crystal value removed (rows carry it).
- `cia8520` pin 19: corrected (not a φ2 clock on the 1581).
- Left as is: `sc01a` pins 15/16 (HERO 1 RC parts; no clocks row can hold them without a frequency) and the "5150:" tagged notes on `clk8284`.

## Found on the way

- `vdp9918` pins 39/40: ti.js names 39 XTAL1 and 40 XTAL2; the ColecoVision Rev J redraw labels 40 XTAL1 and 39 XTAL2. Check against the TI data manual pin table.
- C1541/C1571: the data uses the 40-pin 251828-01 numbering; 1541-II and 1571 boards carry the 42-pin -02 (OSC on 23).
