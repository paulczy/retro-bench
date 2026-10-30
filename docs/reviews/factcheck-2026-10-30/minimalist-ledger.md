| Item index | Kind | Record | Pin | Name | Decision | Source page checked | Evidence / limitation |
|---|---|---|---|---|---|---|---|
| 0 | chip-pin | cpu7501 | 7 | A1 | CONFIRMED | 7501 data sheet p.1; TED System Hardware Manual; 14 | Pin map; address outputs per 7501 signal description, p.15. |
| 1 | chip-pin | cpu7501 | 13 | A7 | CONFIRMED | 7501 data sheet p.1; TED System Hardware Manual; 14 | Pin map; address outputs per 7501 signal description, p.15. |
| 2 | chip-pin | cpu7501 | 14 | A8 | CONFIRMED | 7501 data sheet p.1; TED System Hardware Manual; 14 | Pin map; address outputs per 7501 signal description, p.15. |
| 3 | chip-pin | cpu7501 | 15 | A9 | CONFIRMED | 7501 data sheet p.1; TED System Hardware Manual; 14 | Pin map; address outputs per 7501 signal description, p.15. |
| 4 | chip-pin | cpu7501 | 17 | A11 | CONFIRMED | 7501 data sheet p.1; TED System Hardware Manual; 14 | Pin map; address outputs per 7501 signal description, p.15. |
| 5 | chip-pin | ted7360 | 7 | R/W | WRONG | TED System Hardware Manual; 9 | dir=in omits open-source output role; R/W is input plus active pull-up output during TED fetches. |
| 6 | chip-pin | ted7360 | 12 | Φ OUT | WRONG | TED System Hardware Manual; 33,35 | NTSC fast clock is1.788MHz (about1.79MHz), not1.76MHz. Page35 explicitly distinguishes NTSC1.788 fromPAL1.768. |
| 7 | chip-pin | ted7360 | 29 | DB4 | CONFIRMED | TED System Hardware Manual; 8-9 | Names, numbers and bidirectional buses match. |
| 8 | chip-pin | ted7360 | 39 | A12 | CONFIRMED | TED System Hardware Manual; 8-9 | Names, numbers and bidirectional buses match. |
| 9 | chip-pin | ted7360 | 42 | A9 | CONFIRMED | TED System Hardware Manual; 8-9 | Names, numbers and bidirectional buses match. |
| 10 | chip-pin | ted7360 | 43 | A8 | CONFIRMED | TED System Hardware Manual; 8-9 | Names, numbers and bidirectional buses match. |
| 11 | chip-pin | pio6529 | 13 | D5 | CONFIRMED | MOS 6529 data sheet; 1 | Pin13 D5 and pin14 D4; read/write behavior and bus data direction match. |
| 12 | chip-pin | pio6529 | 14 | D4 | CONFIRMED | MOS 6529 data sheet; 1 | Pin13 D5 and pin14 D4; read/write behavior and bus data direction match. |
| 13 | chip-pin | acia6551 | 8 | /RTS | CONFIRMED | MOS 6551 data sheet; 1-2 | Pin map and block diagram arrows confirm RTS out, CTS/DCD in, DB7 bidir, IRQ out. |
| 14 | chip-pin | acia6551 | 9 | /CTS | CONFIRMED | MOS 6551 data sheet; 1-2 | Pin map and block diagram arrows confirm RTS out, CTS/DCD in, DB7 bidir, IRQ out. |
| 15 | chip-pin | acia6551 | 16 | /DCD | CONFIRMED | MOS 6551 data sheet; 1-2 | Pin map and block diagram arrows confirm RTS out, CTS/DCD in, DB7 bidir, IRQ out. |
| 16 | chip-pin | acia6551 | 25 | D7 | CONFIRMED | MOS 6551 data sheet; 1-2 | Pin map and block diagram arrows confirm RTS out, CTS/DCD in, DB7 bidir, IRQ out. |
| 17 | chip-pin | acia6551 | 26 | /IRQ | CONFIRMED | MOS 6551 data sheet; 1-2 | Pin map and block diagram arrows confirm RTS out, CTS/DCD in, DB7 bidir, IRQ out. |
| 18 | chip-pin | dram4164 | 4 | /RAS | CONFIRMED | C128 Service Manual; 18 | 4164 pinout and signal table match; output buffer supports tri-state. |
| 19 | chip-pin | dram4164 | 6 | A2 | CONFIRMED | C128 Service Manual; 18 | 4164 pinout and signal table match; output buffer supports tri-state. |
| 20 | chip-pin | dram4164 | 14 | DOUT | CONFIRMED | C128 Service Manual; 18 | 4164 pinout and signal table match; output buffer supports tri-state. |
| 21 | chip-pin | dram4416 | 14 | A0 | CONFIRMED | C16 Service Manual PDF p.11; C128 Service Manual p.19; 11 / 19 | 4416 A0 at 14, D3 at 17. DQ4 is 1-based alias; description says D3. |
| 22 | chip-pin | dram4416 | 17 | DQ4 | CONFIRMED | C16 Service Manual PDF p.11; C128 Service Manual p.19; 11 / 19 | 4416 A0 at 14, D3 at 17. DQ4 is 1-based alias; description says D3. |
| 23 | chip-pin | rom23128 | 10 | A0 | CONFIRMED | C16 Service Manual PDF p.11; TED System Hardware Manual p.25; 11 / 25 | ROM A0=10, D7/D8=19, A11=23. |
| 24 | chip-pin | rom23128 | 19 | D7 | CONFIRMED | C16 Service Manual PDF p.11; TED System Hardware Manual p.25; 11 / 25 | ROM A0=10, D7/D8=19, A11=23. |
| 25 | chip-pin | rom23128 | 23 | A11 | CONFIRMED | C16 Service Manual PDF p.11; TED System Hardware Manual p.25; 11 / 25 | ROM A0=10, D7/D8=19, A11=23. |
| 26 | chip-pin | cpu6510 | 8 | A1 | CONFIRMED | MOS 6510 data sheet; 1-2 | Address pin map and output arrows match. |
| 27 | chip-pin | cpu6510 | 14 | A7 | CONFIRMED | MOS 6510 data sheet; 1-2 | Address pin map and output arrows match. |
| 28 | chip-pin | cpu6510 | 15 | A8 | CONFIRMED | MOS 6510 data sheet; 1-2 | Address pin map and output arrows match. |
| 29 | chip-pin | cpu6510 | 18 | A11 | CONFIRMED | MOS 6510 data sheet; 1-2 | Address pin map and output arrows match. |
| 30 | chip-pin | cpu6510 | 20 | A13 | CONFIRMED | MOS 6510 data sheet; 1-2 | Address pin map and output arrows match. |
| 31 | chip-pin | cpu6510 | 26 | P3 | CONFIRMED | MOS 6510 data sheet p.1; C64/C64C Service Manual p.11; 1,11 | P3 pin26 bidir; cassette write atE/5 explicitly described. |
| 32 | chip-pin | cpu6510 | 40 | /RES | CONFIRMED | MOS 6510 data sheet / C64 Programmer's Reference Guide; 1 / 410 (PDF429) | Pin40 resetinput; lowassertion and resetvector sequenceexplicit. |
| 33 | chip-pin | vic2 | 24 | A0 | WRONG | C64 Programmer's Reference Guide; 450,452 | VIC-II A0 pin24 and A4 pin28 are bidirectional; CPU register accesses use these as inputs. |
| 34 | chip-pin | vic2 | 28 | A4 | WRONG | C64 Programmer's Reference Guide; 450,452 | VIC-II A0 pin24 and A4 pin28 are bidirectional; CPU register accesses use these as inputs. |
| 35 | chip-pin | vic2 | 30 | A6 | CONFIRMED | C64 Programmer's Reference Guide; 449,452 | A6/A7 are address outputs; A6 becomes 1 in column phase, A7 static. |
| 36 | chip-pin | vic2 | 31 | A7 | CONFIRMED | C64 Programmer's Reference Guide; 449,452 | A6/A7 are address outputs; A6 becomes 1 in column phase, A7 static. |
| 37 | chip-pin | vic2 | 35 | DB11 | UNVERIFIABLE | C64 Programmer's Reference Guide;6567 preliminary spec; 452,450;PDF1,15 | DB11pin35 andDB8pin38 map confirmed, but bidir is only expressly specified forDB0-DB7. Upper4 output capability unsubstantiated by cited text; mark directionunverified pending explicit colorbus evidence. |
| 38 | chip-pin | vic2 | 38 | DB8 | UNVERIFIABLE | C64 Programmer's Reference Guide;6567 preliminary spec; 452,450;PDF1,15 | DB11pin35 andDB8pin38 map confirmed, but bidir is only expressly specified forDB0-DB7. Upper4 output capability unsubstantiated by cited text; mark directionunverified pending explicit colorbus evidence. |
| 39 | chip-pin | sid6581 | 10 | A1 | CONFIRMED | C64 Programmer's Reference Guide / C128 Service Manual; 458, 38 | 6581 pin10 A1;15D0,22D7. Signal table and processor read/write behavior confirm directions. |
| 40 | chip-pin | sid6581 | 15 | D0 | CONFIRMED | C64 Programmer's Reference Guide / C128 Service Manual; 458, 38 | 6581 pin10 A1;15D0,22D7. Signal table and processor read/write behavior confirm directions. |
| 41 | chip-pin | sid6581 | 22 | D7 | CONFIRMED | C64 Programmer's Reference Guide / C128 Service Manual; 458, 38 | 6581 pin10 A1;15D0,22D7. Signal table and processor read/write behavior confirm directions. |
| 42 | chip-pin | cia6526 | 5 | PA3 | WRONG | C64 Programmer's Reference Guide; 328-329,420 | CIA1 port A supplies keyboard column values, not rows; correct PA3/PA4 descriptions to columns. CIA2 serial bus mapping remains supported. |
| 43 | chip-pin | cia6526 | 6 | PA4 | WRONG | C64 Programmer's Reference Guide; 328-329,420 | CIA1 port A supplies keyboard column values, not rows; correct PA3/PA4 descriptions to columns. CIA2 serial bus mapping remains supported. |
| 44 | chip-pin | cia6526 | 15 | PB5 | WRONG | C64 Programmer's Reference Guide; 328-329,343,420 | PB5 is keyboard row5 (not column) and is outside joystick bits0-4. |
| 45 | chip-pin | cia6526 | 19 | TOD | CONFIRMED | C64 Programmer's Reference Guide; 420,426-427,431 | TOD=19 50/60Hz input, RW22 input, DB4=29 bidir, RES34 low resets, RS3=35 andRS1=37 inputs. |
| 46 | chip-pin | cia6526 | 22 | R/W | CONFIRMED | C64 Programmer's Reference Guide; 420,426-427,431 | TOD=19 50/60Hz input, RW22 input, DB4=29 bidir, RES34 low resets, RS3=35 andRS1=37 inputs. |
| 47 | chip-pin | cia6526 | 29 | D4 | CONFIRMED | C64 Programmer's Reference Guide; 420,426-427,431 | TOD=19 50/60Hz input, RW22 input, DB4=29 bidir, RES34 low resets, RS3=35 andRS1=37 inputs. |
| 48 | chip-pin | cia6526 | 34 | /RES | CONFIRMED | C64 Programmer's Reference Guide; 420,426-427,431 | TOD=19 50/60Hz input, RW22 input, DB4=29 bidir, RES34 low resets, RS3=35 andRS1=37 inputs. |
| 49 | chip-pin | cia6526 | 35 | RS3 | CONFIRMED | C64 Programmer's Reference Guide; 420,426-427,431 | TOD=19 50/60Hz input, RW22 input, DB4=29 bidir, RES34 low resets, RS3=35 andRS1=37 inputs. |
| 50 | chip-pin | cia6526 | 37 | RS1 | CONFIRMED | C64 Programmer's Reference Guide; 420,426-427,431 | TOD=19 50/60Hz input, RW22 input, DB4=29 bidir, RES34 low resets, RS3=35 andRS1=37 inputs. |
| 51 | chip-pin | pla82s100 | 7 | I2 | CONFIRMED | C16 Service Manual PLA pinout; C64 PLA logic equations; PDF15; c64pla.abl pin declarations | The 82S100 input IDs and directions match: pin7 I2=HIRAM, pin8 I1=LORAM, pin24 I11=R/W. |
| 52 | chip-pin | pla82s100 | 8 | I1 | CONFIRMED | C16 Service Manual PLA pinout; C64 PLA logic equations; PDF15; c64pla.abl pin declarations | The 82S100 input IDs and directions match: pin7 I2=HIRAM, pin8 I1=LORAM, pin24 I11=R/W. |
| 53 | chip-pin | pla82s100 | 24 | I11 | CONFIRMED | C16 Service Manual PLA pinout; C64 PLA logic equations; PDF15; c64pla.abl pin declarations | The 82S100 input IDs and directions match: pin7 I2=HIRAM, pin8 I1=LORAM, pin24 I11=R/W. |
| 54 | chip-pin | rom2364 | 3 | A5 | CONFIRMED | MOS 2364 data sheet; 1 | Pin3 A5; pin15 O6 equals zero-based D5; address inputs and data outputs. |
| 55 | chip-pin | rom2364 | 15 | D5 | CONFIRMED | MOS 2364 data sheet; 1 | Pin3 A5; pin15 O6 equals zero-based D5; address inputs and data outputs. |
| 56 | chip-pin | rom2332 | 13 | D3 | CONFIRMED | MOS 2332 data sheet; 1 | Pin13 O4 equals D3; pin19 A10; ROM outputs/inputs. |
| 57 | chip-pin | rom2332 | 19 | A10 | CONFIRMED | MOS 2332 data sheet; 1 | Pin13 O4 equals D3; pin19 A10; ROM outputs/inputs. |
| 58 | chip-pin | vic6560 | 5 | DB11 | WRONG | MOS 6560/6561 data sheet; 1,9 | Pins5 DB11 and6 DB10 are color data inputs; high4 bits exclusively retrieve color/mode data, not bidirectional CPU bus. |
| 59 | chip-pin | vic6560 | 6 | DB10 | WRONG | MOS 6560/6561 data sheet; 1,9 | Pins5 DB11 and6 DB10 are color data inputs; high4 bits exclusively retrieve color/mode data, not bidirectional CPU bus. |
| 60 | chip-pin | vic6560 | 9 | D7 | CONFIRMED | MOS 6560/6561 data sheet; 1,9 | Pin9 DB7; lower8 data bus bidirectional. |
| 61 | chip-pin | vic6560 | 17 | POT X | CONFIRMED | MOS 6560/6561 data sheet; VIC20 schematic324001-02; 1,10 / sheet1 | Pin17 POTX analog input; port pin9 POTX. |
| 62 | chip-pin | vic6560 | 21 | A0 | WRONG | MOS 6560/6561 data sheet; 1,9 | A0 pin21 is bidirectional: register-select input during CPU cycles; address output during video fetch. |
| 63 | chip-pin | via6522 | 7 | PA5 | CONFIRMED | MOS 6522 data sheet; 1 | Pinout plus bidirectional port and data bus block arrows match; CS1 active high. |
| 64 | chip-pin | via6522 | 21 | /IRQ | CONFIRMED | MOS 6522 data sheet; 1 | Pinout plus bidirectional port and data bus block arrows match; CS1 active high. |
| 65 | chip-pin | via6522 | 24 | CS1 | CONFIRMED | MOS 6522 data sheet; 1 | Pinout plus bidirectional port and data bus block arrows match; CS1 active high. |
| 66 | chip-pin | via6522 | 31 | D2 | CONFIRMED | MOS 6522 data sheet; 1 | Pinout plus bidirectional port and data bus block arrows match; CS1 active high. |
| 67 | chip-pin | via6522 | 32 | D1 | CONFIRMED | MOS 6522 data sheet; 1 | Pinout plus bidirectional port and data bus block arrows match; CS1 active high. |
| 68 | chip-pin | via6522 | 36 | RS2 | CONFIRMED | MOS 6522 data sheet; 1 | Pinout plus bidirectional port and data bus block arrows match; CS1 active high. |
| 69 | chip-pin | via6522 | 37 | RS1 | CONFIRMED | MOS 6522 data sheet; 1 | Pinout plus bidirectional port and data bus block arrows match; CS1 active high. |
| 70 | chip-pin | pia6520 | 17 | PB7 | CONFIRMED | MOS 6520 data sheet; 1 | PB7 pin17; peripheral ports explicitly bidirectional. |
| 71 | chip-pin | crtc6545 | 9 | MA5 | CONFIRMED | MOS 6545-1 data sheet; 1-2 | Pinout; MA0-MA13 outputs, DB0-DB7 bidir and HSYNC out. |
| 72 | chip-pin | crtc6545 | 13 | MA9 | CONFIRMED | MOS 6545-1 data sheet; 1-2 | Pinout; MA0-MA13 outputs, DB0-DB7 bidir and HSYNC out. |
| 73 | chip-pin | crtc6545 | 17 | MA13 | CONFIRMED | MOS 6545-1 data sheet; 1-2 | Pinout; MA0-MA13 outputs, DB0-DB7 bidir and HSYNC out. |
| 74 | chip-pin | crtc6545 | 28 | D5 | CONFIRMED | MOS 6545-1 data sheet; 1-2 | Pinout; MA0-MA13 outputs, DB0-DB7 bidir and HSYNC out. |
| 75 | chip-pin | crtc6545 | 39 | HSYNC | CONFIRMED | MOS 6545-1 data sheet; 1-2 | Pinout; MA0-MA13 outputs, DB0-DB7 bidir and HSYNC out. |
| 76 | chip-pin | cpu8502 | 9 | A2 | CONFIRMED | C128 Service Manual; 7 | 8502 pinout and direction table match. |
| 77 | chip-pin | cpu8502 | 14 | A7 | CONFIRMED | C128 Service Manual; 7 | 8502 pinout and direction table match. |
| 78 | chip-pin | cpu8502 | 18 | A11 | CONFIRMED | C128 Service Manual; 7 | 8502 pinout and direction table match. |
| 79 | chip-pin | cpu8502 | 19 | A12 | CONFIRMED | C128 Service Manual; 7 | 8502 pinout and direction table match. |
| 80 | chip-pin | cpu8502 | 31 | D7 | CONFIRMED | C128 Service Manual; 7 | 8502 pinout and direction table match. |
| 81 | chip-pin | cpu8502 | 38 | D0 | CONFIRMED | C128 Service Manual; 7 | 8502 pinout and direction table match. |
| 82 | chip-pin | vdc8563 | 1 | CCLK | CONFIRMED | C128 Service Manual; 38 | 8563 pinout and signal table match. |
| 83 | chip-pin | vdc8563 | 6 | NC | CONFIRMED | C128 Service Manual; 38 | 8563 pinout and signal table match. |
| 84 | chip-pin | vdc8563 | 9 | R/W | CONFIRMED | C128 Service Manual; 38 | 8563 pinout and signal table match. |
| 85 | chip-pin | vdc8563 | 13 | D5 | CONFIRMED | C128 Service Manual; 38 | 8563 pinout and signal table match. |
| 86 | chip-pin | vdc8563 | 21 | DR/W | CONFIRMED | C128 Service Manual; 38 | 8563 pinout and signal table match. |
| 87 | chip-pin | vdc8563 | 31 | DA5 | WRONG | C128 Service Manual; 38 | DA5 pin31 is address output; DD0-DD7 are separate bidirectional data pins. Correct dir=out and address bus bit5 only. |
| 88 | chip-pin | vdc8563 | 48 | /CAS | CONFIRMED | C128 Service Manual; 38 | 8563 pinout and signal table match. |
| 89 | chip-pin | vic2e | 16 | COLOR | CONFIRMED | C128 Service Manual; 35 | 8564 pins16,19,21,29,31 match named signals and directions. |
| 90 | chip-pin | vic2e | 19 | /RAS | CONFIRMED | C128 Service Manual; 35 | 8564 pins16,19,21,29,31 match named signals and directions. |
| 91 | chip-pin | vic2e | 21 | MUX | CONFIRMED | C128 Service Manual; 35 | 8564 pins16,19,21,29,31 match named signals and directions. |
| 92 | chip-pin | vic2e | 29 | PH CL | CONFIRMED | C128 Service Manual; 35 | 8564 pins16,19,21,29,31 match named signals and directions. |
| 93 | chip-pin | vic2e | 31 | A11 | CONFIRMED | C128 Service Manual; 35 | 8564 pins16,19,21,29,31 match named signals and directions. |
| 94 | chip-pin | vic2e | 32 | A0 | WRONG | C128 Service Manual; 35 | A0/A1 pins32/33 output multiplexed addresses and accept CPU addresses; correct dir=bidir. |
| 95 | chip-pin | vic2e | 33 | A1 | WRONG | C128 Service Manual; 35 | A0/A1 pins32/33 output multiplexed addresses and accept CPU addresses; correct dir=bidir. |
| 96 | chip-pin | mmu8722 | 5 | TA13 | CONFIRMED | C128 Service Manual; 27 | 8722 pinout, directions and 40/80 sense mode match. |
| 97 | chip-pin | mmu8722 | 8 | TA10 | CONFIRMED | C128 Service Manual; 27 | 8722 pinout, directions and 40/80 sense mode match. |
| 98 | chip-pin | mmu8722 | 29 | A13 | CONFIRMED | C128 Service Manual; 27 | 8722 pinout, directions and 40/80 sense mode match. |
| 99 | chip-pin | mmu8722 | 43 | /Z80EN | CONFIRMED | C128 Service Manual; 27 | 8722 pinout, directions and 40/80 sense mode match. |
| 100 | chip-pin | mmu8722 | 48 | SENSE40 | CONFIRMED | C128 Service Manual; 27 | 8722 pinout, directions and 40/80 sense mode match. |
| 101 | chip-pin | pla8721 | 10 | R/W | CONFIRMED | C128 Service Manual; 29 | 8721 pinout and signal table match. |
| 102 | chip-pin | pla8721 | 19 | VMA4 | CONFIRMED | C128 Service Manual; 29 | 8721 pinout and signal table match. |
| 103 | chip-pin | pla8721 | 20 | VMA5 | CONFIRMED | C128 Service Manual; 29 | 8721 pinout and signal table match. |
| 104 | chip-pin | pla8721 | 32 | CLRBNK | WRONG | C128 Service Manual; 29 (PDF31) | CLRBNK pin32 is a color RAM bank-select output, not a clear-bank operation. Keep the label and replace the incorrect expansion. |
| 105 | chip-pin | pla8721 | 40 | DWE | CONFIRMED | C128 Service Manual; 29 | 8721 pinout and signal table match. |
| 106 | chip-pin | pla8721 | 46 | /CHAROM | CONFIRMED | C128 Service Manual; 29 | 8721 pinout and signal table match. |
| 107 | chip-pin | ga325572 | 2 | /B | CONFIRMED | 1541 schematic 251748 rev.E sheet3; gate-array pla.txt; sheet3 | 325572 Bbar2 drives erase-enable transistors, MTR8 from VIA PB2 and STEP1pin12 fromPB1. |
| 108 | chip-pin | ga325572 | 8 | MTR | CONFIRMED | 1541 schematic 251748 rev.E sheet3; gate-array pla.txt; sheet3 | 325572 Bbar2 drives erase-enable transistors, MTR8 from VIA PB2 and STEP1pin12 fromPB1. |
| 109 | chip-pin | ga325572 | 12 | STEP1 | CONFIRMED | 1541 schematic 251748 rev.E sheet3; gate-array pla.txt; sheet3 | 325572 Bbar2 drives erase-enable transistors, MTR8 from VIA PB2 and STEP1pin12 fromPB1. |
| 110 | chip-pin | ga251828 | 2 | YB0 | CONFIRMED | 1571 Service Manual; 4,6-8 | 40pin 251828 map with bidirectional data, OSC21,Y3=28,LOCK33 in; 251829 OSC1 in,IO2=18 low out at1000-1FFF. |
| 111 | chip-pin | ga251828 | 6 | YB4 | CONFIRMED | 1571 Service Manual; 4,6-8 | 40pin 251828 map with bidirectional data, OSC21,Y3=28,LOCK33 in; 251829 OSC1 in,IO2=18 low out at1000-1FFF. |
| 112 | chip-pin | ga251828 | 21 | OSC | CONFIRMED | 1571 Service Manual; 4,6-8 | 40pin 251828 map with bidirectional data, OSC21,Y3=28,LOCK33 in; 251829 OSC1 in,IO2=18 low out at1000-1FFF. |
| 113 | chip-pin | ga251828 | 28 | Y3 | CONFIRMED | 1571 Service Manual; 4,6-8 | 40pin 251828 map with bidirectional data, OSC21,Y3=28,LOCK33 in; 251829 OSC1 in,IO2=18 low out at1000-1FFF. |
| 114 | chip-pin | ga251828 | 33 | LOCK | CONFIRMED | 1571 Service Manual; 4,6-8 | 40pin 251828 map with bidirectional data, OSC21,Y3=28,LOCK33 in; 251829 OSC1 in,IO2=18 low out at1000-1FFF. |
| 115 | chip-pin | ga251829 | 1 | OSC | CONFIRMED | 1571 Service Manual; 4,6-8 | 40pin 251828 map with bidirectional data, OSC21,Y3=28,LOCK33 in; 251829 OSC1 in,IO2=18 low out at1000-1FFF. |
| 116 | chip-pin | ga251829 | 18 | /IO2 | CONFIRMED | 1571 Service Manual; 4,6-8 | 40pin 251828 map with bidirectional data, OSC21,Y3=28,LOCK33 in; 251829 OSC1 in,IO2=18 low out at1000-1FFF. |
| 117 | chip-pin | cia8520 | 9 | PA7 | CONFIRMED | 8520 specification sheet1;1581 Service Manual; 7-8,17 | Pinout and bus directions match; schematic252380 sheet3 pin17 PB7 trace bends down to ATN IN; PC18 is unconnected. |
| 118 | chip-pin | cia8520 | 10 | PB0 | CONFIRMED | 8520 specification sheet1;1581 Service Manual; 7-8,17 | Pinout and bus directions match; schematic252380 sheet3 pin17 PB7 trace bends down to ATN IN; PC18 is unconnected. |
| 119 | chip-pin | cia8520 | 12 | PB2 | CONFIRMED | 8520 specification sheet1;1581 Service Manual; 7-8,17 | Pinout and bus directions match; schematic252380 sheet3 pin17 PB7 trace bends down to ATN IN; PC18 is unconnected. |
| 120 | chip-pin | cia8520 | 17 | PB7 | CONFIRMED | 8520 specification sheet1;1581 Service Manual; 7-8,17 | Pinout and bus directions match; schematic252380 sheet3 pin17 PB7 trace bends down to ATN IN; PC18 is unconnected. |
| 121 | chip-pin | cia8520 | 23 | /CS | CONFIRMED | 8520 specification sheet1;1581 Service Manual; 7-8,17 | Pinout and bus directions match; schematic252380 sheet3 pin17 PB7 trace bends down to ATN IN; PC18 is unconnected. |
| 122 | chip-pin | cia8520 | 26 | DB7 | CONFIRMED | 8520 specification sheet1;1581 Service Manual; 7-8,17 | Pinout and bus directions match; schematic252380 sheet3 pin17 PB7 trace bends down to ATN IN; PC18 is unconnected. |
| 123 | chip-pin | cia8520 | 29 | DB4 | CONFIRMED | 8520 specification sheet1;1581 Service Manual; 7-8,17 | Pinout and bus directions match; schematic252380 sheet3 pin17 PB7 trace bends down to ATN IN; PC18 is unconnected. |
| 124 | chip-pin | cia8520 | 38 | RS0 | CONFIRMED | 8520 specification sheet1;1581 Service Manual; 7-8,17 | Pinout and bus directions match; schematic252380 sheet3 pin17 PB7 trace bends down to ATN IN; PC18 is unconnected. |
| 125 | chip-pin | cia8520 | 39 | SP | UNVERIFIABLE | Commodore 8520 specification 318029 rev.C; sheets1,9 | SP pin39 and its bidirectional serial-data role are supported. Section1.5.11 does not specify that merely selecting output mode forces SP LOW. Drop that initial-level assertion or mark it unverified. |
| 126 | chip-pin | ttl7406 | 4 | 2Y | CONFIRMED | TI SN7406 data sheet; 1 | Pin4=2Y, open-collector inverter output. |
| 127 | chip-pin | uln2003 | 7 | 7B | CONFIRMED | TI ULN2003A data sheet; 1,3 | Pin7=7B input, pin15=2C collector output; 500mA single output rating. |
| 128 | chip-pin | uln2003 | 15 | 2C | CONFIRMED | TI ULN2003A data sheet; 1,3 | Pin7=7B input, pin15=2C collector output; 500mA single output rating. |
| 129 | chip-pin | cpu6502 | 22 | A12 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 130 | chip-pin | cpu6502 | 30 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 131 | chip-pin | mmu344 | 24 | Cxxx | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 132 | chip-pin | mmu344 | 28 | A13 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 133 | chip-pin | mmu344 | 36 | A5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 134 | chip-pin | iou344 | 7 | CASSO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 135 | chip-pin | iou344 | 14 | R/W | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 136 | chip-pin | iou344 | 15 | /RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 137 | chip-pin | iou344 | 18 | RA1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 138 | chip-pin | iou344 | 25 | /PRAS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 139 | chip-pin | kbd3600 | 2 | Option 2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 140 | chip-pin | kbd3600 | 5 | Option 5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 141 | chip-pin | kbd3600 | 26 | Y9 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 142 | chip-pin | rom2316 | 17 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 143 | chip-pin | rom2316 | 20 | /CS1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 144 | chip-pin | kbd5740 | 8 | X5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 145 | chip-pin | mmu2c | 8 | RA2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 146 | chip-pin | iou2c | 29 | A6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 147 | chip-pin | iou2c | 36 | /RA10 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 148 | chip-pin | tmg2c | 3 | CREF | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 149 | chip-pin | tmg2c | 8 | /CASEN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 150 | chip-pin | tmg2c | 9 | /80COL | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 151 | chip-pin | glu2c | 9 | /SELIO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 152 | chip-pin | glu2c | 14 | MD7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 153 | chip-pin | glu2c | 21 | /DISK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 154 | chip-pin | ca3146 | 8 | Q3 C | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 155 | chip-pin | ca3141 | 14 | D9/D10 K | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 156 | chip-pin | disk2p5 | 11 | O5 (D4) | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 157 | chip-pin | disk2p5 | 19 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 158 | chip-pin | disk2p6 | 1 | A0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 159 | chip-pin | disk2p6 | 7 | O2 (D1) | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 160 | chip-pin | ls323 | 6 | C/QC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 161 | chip-pin | ls174 | 3 | 1D | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 162 | chip-pin | ls174 | 7 | 3Q | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 163 | chip-pin | cpu6502c | 3 | PHI1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 164 | chip-pin | cpu6502c | 16 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 165 | chip-pin | cpu6502c | 20 | A11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 166 | chip-pin | cpu6502c | 27 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 167 | chip-pin | cpu6502c | 32 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 168 | chip-pin | antic | 14 | R/W | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 169 | chip-pin | antic | 19 | A14 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 170 | chip-pin | gtia | 17 | DEL | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 171 | chip-pin | gtia | 29 | FPHI0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 172 | chip-pin | gtia | 39 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 173 | chip-pin | pokey | 9 | P7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 174 | chip-pin | pokey | 18 | /K5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 175 | chip-pin | pokey | 40 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 176 | chip-pin | dram4464 | 3 | DQ2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 177 | chip-pin | dram4464 | 5 | /RAS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 178 | chip-pin | dram4464 | 17 | DQ4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 179 | chip-pin | mcu6801 | 6 | /RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 180 | chip-pin | mcu6801 | 8 | P20 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 181 | chip-pin | mcu6801 | 37 | P30 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 182 | chip-pin | ls-controller | 2 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 183 | chip-pin | ls-controller | 15 | Y4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 184 | chip-pin | ls-controller | 18 | Y1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 185 | chip-pin | cpuz80 | 2 | A12 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 186 | chip-pin | cpuz80 | 23 | /BUSAK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 187 | chip-pin | ula_zx81 | 23 | D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 188 | chip-pin | ula_zx81 | 27 | KBD3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 189 | chip-pin | ula_zx81 | 36 | A3' | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 190 | chip-pin | sram2114 | 3 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 191 | chip-pin | sram2114 | 14 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 192 | chip-pin | sram2114 | 16 | A8 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 193 | chip-pin | rom_zx81 | 5 | A3' | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 194 | chip-pin | rom_zx81 | 6 | A2' | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 195 | chip-pin | rom_zx81 | 13 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 196 | chip-pin | dram4116 | 11 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 197 | chip-pin | dram4116 | 12 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 198 | chip-pin | dram4116 | 13 | A6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 199 | chip-pin | dram4532 | 10 | A5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 200 | chip-pin | ula_spectrum | 20 | KB1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 201 | chip-pin | ula_spectrum | 25 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 202 | chip-pin | ula_spectrum | 26 | KB4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 203 | chip-pin | scld_tx2068 | 8 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 204 | chip-pin | scld_tx2068 | 45 | A15 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 205 | chip-pin | scld_tx2068 | 60 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 206 | chip-pin | scld_tx2068 | 61 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 207 | chip-pin | ay8912 | 18 | BDIR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 208 | chip-pin | ay8912 | 20 | BC1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 209 | chip-pin | ay8912 | 21 | DA7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 210 | chip-pin | ay8912 | 28 | DA0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 211 | chip-pin | rom_ts2068_exrom | 18 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 212 | chip-pin | tms9900 | 36 | IC0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 213 | chip-pin | tms9900 | 46 | D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 214 | chip-pin | tms9900 | 49 | D8 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 215 | chip-pin | vdp9918 | 2 | /CAS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 216 | chip-pin | vdp9918 | 10 | AD0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 217 | chip-pin | vdp9918 | 14 | /CSW | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 218 | chip-pin | vdp9918 | 24 | CD0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 219 | chip-pin | vdp9918 | 28 | RD4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 220 | chip-pin | vdp9918 | 40 | XTAL1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 221 | chip-pin | tms9901 | 7 | /INT5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 222 | chip-pin | tms9901 | 10 | PHI | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 223 | chip-pin | tms9901 | 17 | /INT1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 224 | chip-pin | tms9901 | 27 | /INT14/P8 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 225 | chip-pin | tms9901 | 29 | /INT12/P10 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 226 | chip-pin | tms9904 | 1 | TANK1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 227 | chip-pin | tms9904 | 2 | TANK2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 228 | chip-pin | tms9904 | 6 | /PHI4 TTL | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 229 | chip-pin | tms9904 | 19 | XTAL2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 230 | chip-pin | grom0430 | 8 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 231 | chip-pin | romconsole | 3 | A5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 232 | chip-pin | romconsole | 21 | /S1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 233 | chip-pin | sram6810 | 5 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 234 | chip-pin | cpu6809e | 2 | /NMI | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 235 | chip-pin | cpu6809e | 30 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 236 | chip-pin | cpu6809e | 34 | E | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 237 | chip-pin | cpu6809e | 37 | /RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 238 | chip-pin | vdg6847 | 25 | DA3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 239 | chip-pin | vdg6847 | 40 | DD7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 240 | chip-pin | sam6883 | 8 | DA0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 241 | chip-pin | sam6883 | 16 | A0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 242 | chip-pin | sam6883 | 18 | A2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 243 | chip-pin | gime-tcc1014 | 15 | CPUD3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 244 | chip-pin | gime-tcc1014 | 26 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 245 | chip-pin | gime-tcc1014 | 28 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 246 | chip-pin | gime-tcc1014 | 39 | TEST | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 247 | chip-pin | gime-tcc1014 | 52 | A13 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 248 | chip-pin | gime-tcc1014 | 55 | VSYNC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 249 | chip-pin | gime-tcc1014 | 65 | CVIDEO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 250 | chip-pin | gime-tcc1014 | 67 | G | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 251 | chip-pin | sram2102 | 3 | R/W | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 252 | chip-pin | sram2102 | 7 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 253 | chip-pin | sram2102 | 16 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 254 | chip-pin | fdc1771 | 10 | /DAL3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 255 | chip-pin | fdc1771 | 26 | FDCLOCK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 256 | chip-pin | fdc1793 | 26 | RCLK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 257 | chip-pin | fdc1793 | 29 | TG43 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 258 | chip-pin | fdc1793 | 32 | READY | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 259 | chip-pin | fdc1793 | 35 | /IP | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 260 | chip-pin | cpu6808 | 7 | BA | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 261 | chip-pin | cpu6808 | 12 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 262 | chip-pin | cpu6808 | 23 | A13 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 263 | chip-pin | cpu6808 | 24 | A14 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 264 | chip-pin | cpu6808 | 26 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 265 | chip-pin | cpu6808 | 29 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 266 | chip-pin | cpu6808 | 30 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 267 | chip-pin | pia6821 | 3 | PA1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 268 | chip-pin | pia6821 | 8 | PA6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 269 | chip-pin | pia6821 | 14 | PB4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 270 | chip-pin | pia6821 | 26 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 271 | chip-pin | pia6821 | 32 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 272 | chip-pin | pia6821 | 39 | CA2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 273 | chip-pin | sc01a | 19 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 274 | chip-pin | sram6116 | 6 | A2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 275 | chip-pin | sram6116 | 19 | A10 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 276 | chip-pin | rom2764 | 7 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 277 | chip-pin | rom2764 | 9 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 278 | chip-pin | rom2764 | 12 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 279 | chip-pin | rom27128 | 26 | A13 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 280 | chip-pin | rtc146818 | 5 | AD1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 281 | chip-pin | rtc146818 | 6 | AD2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 282 | chip-pin | rtc146818 | 7 | AD3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 283 | chip-pin | acia6850 | 2 | Rx Data | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 284 | chip-pin | acia6850 | 19 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 285 | chip-pin | acia6850 | 22 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 286 | chip-pin | ls138 | 2 | B | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 287 | chip-pin | ls138 | 12 | /Y3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 288 | chip-pin | adc0804 | 7 | VIN- | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 289 | chip-pin | tl851 | 16 | BLNK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 290 | chip-pin | tl852 | 15 | GCD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 291 | chip-pin | sc02 | 11 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 292 | chip-pin | epci2661 | 3 | RxD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 293 | chip-pin | epci2661 | 5 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 294 | chip-pin | epci2661 | 8 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 295 | chip-pin | epci2661 | 11 | /CE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 296 | chip-pin | epci2661 | 15 | /TxRDY | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 297 | chip-pin | epci2661 | 27 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 298 | chip-pin | cpu8088 | 10 | AD6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 299 | chip-pin | cpu8088 | 17 | NMI | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 300 | chip-pin | cpu8088 | 18 | INTR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 301 | chip-pin | cpu8088 | 36 | A18/S5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 302 | chip-pin | bus8288 | 1 | IOB | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 303 | chip-pin | bus8288 | 4 | DT/R | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 304 | chip-pin | bus8288 | 15 | CEN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 305 | chip-pin | pic8259 | 23 | IR5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 306 | chip-pin | pic8259 | 27 | A0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 307 | chip-pin | pit8253 | 19 | A0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 308 | chip-pin | pit8253 | 21 | /CS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 309 | chip-pin | ppi8255 | 3 | PA1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 310 | chip-pin | ppi8255 | 34 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 311 | chip-pin | ppi8255 | 38 | PA6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 312 | chip-pin | dma8237 | 8 | ADSTB | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 313 | chip-pin | dma8237 | 12 | CLK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 314 | chip-pin | dma8237 | 17 | DREQ2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 315 | chip-pin | fpu8087 | 6 | A10 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 316 | chip-pin | fpu8087 | 7 | A9 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 317 | chip-pin | fpu8087 | 9 | AD7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 318 | chip-pin | fpu8087 | 13 | AD3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 319 | chip-pin | fpu8087 | 18 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 320 | chip-pin | fpu8087 | 22 | READY | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 321 | chip-pin | fpu8087 | 23 | BUSY | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 322 | chip-pin | crtc6845 | 3 | LPSTB | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 323 | chip-pin | crtc6845 | 15 | MA11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 324 | chip-pin | crtc6845 | 23 | E | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 325 | chip-pin | dram41256 | 7 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 326 | chip-pin | dram41256 | 9 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 327 | chip-pin | ga40007 | 15 | VSYNC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 328 | chip-pin | ga40007 | 21 | A14 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 329 | chip-pin | ga40007 | 24 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 330 | chip-pin | ga40007 | 34 | G | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 331 | chip-pin | ga40007 | 40 | MA0/CCLK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 332 | chip-pin | ga40010 | 12 | R | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 333 | chip-pin | ga40010 | 27 | /ROMEN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 334 | chip-pin | ga40010 | 32 | /INTERRUPT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 335 | chip-pin | pal40030 | 1 | D7·D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 336 | chip-pin | pal40030 | 6 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 337 | chip-pin | pal40030 | 16 | /CAS1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 338 | chip-pin | rom23256 | 7 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 339 | chip-pin | rom23256 | 9 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 340 | chip-pin | rom23256 | 16 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 341 | chip-pin | rom23256 | 19 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 342 | chip-pin | rom23256 | 27 | A14 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 343 | chip-pin | fdc765 | 16 | TC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 344 | chip-pin | cpu65sc12 | 6 | /NMI | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 345 | chip-pin | cpu65sc12 | 11 | A2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 346 | chip-pin | vidproc | 5 | 2MHz | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 347 | chip-pin | vidproc | 28 | CRTC CLK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 348 | chip-pin | serproc | 2 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 349 | chip-pin | serproc | 5 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 350 | chip-pin | serproc | 9 | /CS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 351 | chip-pin | serproc | 17 | RXD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 352 | chip-pin | serproc | 19 | CTSO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 353 | chip-pin | serproc | 25 | CLK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 354 | chip-pin | saa5050 | 9 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 355 | chip-pin | saa5050 | 12 | GLR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 356 | chip-pin | saa5050 | 26 | LOSE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 357 | chip-pin | fdc8271 | 4 | RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 358 | chip-pin | fdc8271 | 11 | INT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 359 | chip-pin | fdc8271 | 14 | DB2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 360 | chip-pin | fdc8271 | 15 | DB3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 361 | chip-pin | fdc1770 | 6 | DAL1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 362 | chip-pin | fdc1770 | 9 | DAL4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 363 | chip-pin | fdc1770 | 18 | CLK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 364 | chip-pin | fdc1770 | 22 | WD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 365 | chip-pin | fdc1770 | 27 | DRQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 366 | chip-pin | adc7002 | 23 | /CS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 367 | chip-pin | adc7002 | 24 | /WR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 368 | chip-pin | adlc6854 | 11 | RS1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 369 | chip-pin | adlc6854 | 24 | TDSR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 370 | chip-pin | adlc6854 | 26 | /LOC/DTR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 371 | chip-pin | dram4816 | 2 | DIN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 372 | chip-pin | dram4816 | 7 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 373 | chip-pin | dram4816 | 10 | A5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 374 | chip-pin | elk_ula | 1 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 375 | chip-pin | elk_ula | 14 | A13 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 376 | chip-pin | elk_ula | 30 | /IRQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 377 | chip-pin | elk_ula | 36 | PD2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 378 | chip-pin | elk_ula | 44 | RAM3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 379 | chip-pin | elk_ula | 58 | /RST | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 380 | chip-pin | ttl7404 | 11 | 5A | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 381 | chip-pin | ttl7404 | 12 | 6Y | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 382 | chip-pin | ttl74169 | 2 | CLK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 383 | chip-pin | ttl74169 | 11 | QD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 384 | chip-pin | ttl7474 | 1 | /1CLR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 385 | chip-pin | ttl7474 | 5 | 1Q | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 386 | chip-pin | lm324 | 2 | 1IN- | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 387 | chip-pin | rom-dragon32-basic | 4 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 388 | chip-pin | rom-dragon32-basic | 5 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 389 | chip-pin | rom-dragon32-basic | 8 | A0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 390 | chip-pin | mux14529 | 13 | Y1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 391 | chip-pin | mux14529 | 14 | Y0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 392 | chip-pin | ay8910 | 6 | IOB7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 393 | chip-pin | ay8910 | 22 | CLOCK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 394 | chip-pin | ay8910 | 29 | BC1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 395 | chip-pin | ay8910 | 36 | DA1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 396 | chip-pin | vdp9938 | 5 | HSYNC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 397 | chip-pin | vdp9938 | 29 | MODE 0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 398 | chip-pin | vdp9938 | 38 | CD2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 399 | chip-pin | vdp9938 | 42 | RD1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 400 | chip-pin | vdp9938 | 45 | RD4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 401 | chip-pin | vdp9938 | 47 | RD6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 402 | chip-pin | vdp9938 | 49 | AD0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 403 | chip-pin | vdp9938 | 55 | AD6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 404 | chip-pin | ula10017 | 3 | MA4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 405 | chip-pin | ula10017 | 4 | MA3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 406 | chip-pin | ula10017 | 9 | CAS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 407 | chip-pin | ula10017 | 14 | PHI OUT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 408 | chip-pin | ula10017 | 18 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 409 | chip-pin | ula10017 | 21 | RED | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 410 | chip-pin | ula10017 | 27 | R/W IN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 411 | chip-pin | ula10017 | 34 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 412 | chip-pin | ula10017 | 37 | MA2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 413 | connector-pin | c16/c16-joy | 5 | +5 V | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 414 | connector-pin | c16/c16-cass | 7 | GND | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 415 | connector-pin | c16/c16-video | 3 | AUDIO OUT | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 416 | connector-pin | c16/c16-exp | 16 | D5 | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 417 | connector-pin | c16/c16-exp | 24 | Φ2 | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 418 | connector-pin | c16/c16-exp | A | GND | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 419 | connector-pin | c16/c16-exp | V | A3 | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 420 | connector-pin | plus4/plus4-user | 4 | P2 | CONFIRMED | TED System Hardware Manual p.19; Plus/4 terkep map p.33; 19,33 | P2 cassette sense; 9VAC pair; TTL serial via 6551; production map places P1 on K despite draft manual CTS. |
| 421 | connector-pin | plus4/plus4-user | 10 | 9 V AC | CONFIRMED | TED System Hardware Manual p.19; Plus/4 terkep map p.33; 19,33 | P2 cassette sense; 9VAC pair; TTL serial via 6551; production map places P1 on K despite draft manual CTS. |
| 422 | connector-pin | plus4/plus4-user | C | RxD | CONFIRMED | TED System Hardware Manual p.19; Plus/4 terkep map p.33; 19,33 | P2 cassette sense; 9VAC pair; TTL serial via 6551; production map places P1 on K despite draft manual CTS. |
| 423 | connector-pin | plus4/plus4-user | K | P1 | CONFIRMED | TED System Hardware Manual p.19; Plus/4 terkep map p.33; 19,33 | P2 cassette sense; 9VAC pair; TTL serial via 6551; production map places P1 on K despite draft manual CTS. |
| 424 | connector-pin | plus4/c16-cass | 5 | WRITE | UNVERIFIABLE | C16 Service Manual schematic251788;Plus/4 connector drawing; C16 p.8 / PDF14; connectors-2.jpg | Plus/4 pin5 WRITE confirmed. CPU7501 P1 routing is documented on C16 schematic, not on the cited Plus/4 connector drawing; source silent for Plus/4-specific internal path. |
| 425 | connector-pin | plus4/c16-video | 2 | GND | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 426 | connector-pin | plus4/c16-video | 7 | NC | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 427 | connector-pin | plus4/c16-video | 8 | +5 V | WRONG | Plus/4 terkep connector map; connectors-2.jpg, single image, CN7 video | For machine=plus4, pin8 must be NC, not a +5V power contact. The shared source record already has a conflict warning, but its primary name and expected value still say +5V. Retain +5V only for the C16 instance. |
| 428 | connector-pin | plus4/c16-exp | 24 | Φ2 | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 429 | connector-pin | plus4/c16-exp | N | A9 | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 430 | connector-pin | plus4/c16-exp | Z | NC | CONFIRMED | C16 schematic 251788 sheet1; TED System Hardware Manual p.23; Plus/4 terkep pp.33-34; 7 (PDF12),23,33-34 | Connector map and artificial phi2 timing match. |
| 431 | connector-pin | c64/c64-power | 7 | 9 V AC | CONFIRMED | C64 supply902503-02 schematic; single-page | Pin7 is one leg of9VAC across6/7. |
| 432 | connector-pin | c64/c64-iec | 6 | /RESET | CONFIRMED | C64 Programmer's Reference Guide;C64/C64C Service Manual; 396 / reset circuits | IECpin6 reset activeLOW fromcomputer; pullup to5V visible in system schematic. |
| 433 | connector-pin | c64/c64-video | 1 | LUM | UNVERIFIABLE | C64 Programmer's Reference Guide;C64/C64C Service Manual; 396;10 | LUMpin1 supported, but cited pages do not specify expected1Vpp into75ohm. Remove numericallevel pending supporting source. |
| 434 | connector-pin | c64/c64-video | 6 | CHROMA | CONFIRMED | C64/C64C Service Manual; 10 | 8pin connector passes VIC chroma to monitor; pin6COLOR matches circuit; burst/chroma described by VIC source. |
| 435 | connector-pin | c64/c64-user | 6 | CNT2 | CONFIRMED | C64 Programmer's Reference Guide; 360,366-367 | User port and expansion pinouts plus FLAG2 behavior and addresses match. |
| 436 | connector-pin | c64/c64-user | B | /FLAG2 | CONFIRMED | C64 Programmer's Reference Guide; 360,366-367 | User port and expansion pinouts plus FLAG2 behavior and addresses match. |
| 437 | connector-pin | c64/c64-user | H | PB4 | CONFIRMED | C64 Programmer's Reference Guide; 360,366-367 | User port and expansion pinouts plus FLAG2 behavior and addresses match. |
| 438 | connector-pin | c64/c64-exp | 13 | /DMA | CONFIRMED | C64 Programmer's Reference Guide; 360,366-367 | User port and expansion pinouts plus FLAG2 behavior and addresses match. |
| 439 | connector-pin | c64/c64-exp | A | GND | CONFIRMED | C64 Programmer's Reference Guide; 360,366-367 | User port and expansion pinouts plus FLAG2 behavior and addresses match. |
| 440 | connector-pin | c64/c64-exp | M | A10 | CONFIRMED | C64 Programmer's Reference Guide; 360,366-367 | User port and expansion pinouts plus FLAG2 behavior and addresses match. |
| 441 | connector-pin | c64/c64-exp | S | A6 | CONFIRMED | C64 Programmer's Reference Guide; 360,366-367 | User port and expansion pinouts plus FLAG2 behavior and addresses match. |
| 442 | connector-pin | c64/c64-exp | X | A1 | CONFIRMED | C64 Programmer's Reference Guide; 360,366-367 | User port and expansion pinouts plus FLAG2 behavior and addresses match. |
| 443 | connector-pin | vic20/vic20-video | 5 | VIDEO HIGH | UNVERIFIABLE | VIC-20 Programmer's Reference Guide; 282 | Pin5 VIDEOHIGH is named, but source gives no1Vpp/75ohm level. Keepname, drop numericalexpect or markunverified. |
| 444 | connector-pin | vic20/vic20-user | M | CB2 | CONFIRMED | VIC-20 Programmer's Reference Guide; 176,230,283 | User M CB2 on VIA1 confirmed in memory map and user port handshake chapter. |
| 445 | connector-pin | vic20/vic20-cart | 3 | CD1 | CONFIRMED | VIC-20 Programmer's Reference Guide; 281 | Expansion pinout and signal names match; BLK1 address range per memory map. |
| 446 | connector-pin | vic20/vic20-cart | 10 | /BLK1 | CONFIRMED | VIC-20 Programmer's Reference Guide; 281 | Expansion pinout and signal names match; BLK1 address range per memory map. |
| 447 | connector-pin | vic20/vic20-cart | 16 | /RAM3 | CONFIRMED | VIC-20 Programmer's Reference Guide; 281 | Expansion pinout and signal names match; BLK1 address range per memory map. |
| 448 | connector-pin | vic20/vic20-cart | 18 | CR/W | CONFIRMED | VIC-20 Programmer's Reference Guide; 281 | Expansion pinout and signal names match; BLK1 address range per memory map. |
| 449 | connector-pin | vic20/vic20-cart | 20 | NC | CONFIRMED | VIC-20 Programmer's Reference Guide; 281 | Expansion pinout and signal names match; BLK1 address range per memory map. |
| 450 | connector-pin | vic20/vic20-cart | H | CA5 | CONFIRMED | VIC-20 Programmer's Reference Guide; 281 | Expansion pinout and signal names match; BLK1 address range per memory map. |
| 451 | connector-pin | vic20/vic20-cart | K | CA7 | CONFIRMED | VIC-20 Programmer's Reference Guide; 281 | Expansion pinout and signal names match; BLK1 address range per memory map. |
| 452 | connector-pin | vic20/vic20-ctrl | 4 | JOY3 | CONFIRMED | VIC20 schematic324001 sheet1;VIC20 Programmer's Reference Guide; sheet1;280,343 | Pin4JOY3 right; signal pulledhigh atrest and groundedbyjoystick. |
| 453 | connector-pin | vic20/vic20-cass | D | READ | CONFIRMED | VIC-20 Programmer's Reference Guide; 282 | D and4 are same cassette read contact. |
| 454 | connector-pin | vic20/vic20-cass | F | SENSE | UNVERIFIABLE | VIC-20 Programmer's Reference Guide; 282 | F=6 cassette switch confirmed; cited connector table gives neither logicidle voltage nor claimed exact PLAY/REC/FF/REW key behavior. |
| 455 | connector-pin | pet/pet-ieee | 5 | EOI | UNVERIFIABLE | PET IEEE488 connectorJ1/J12 drawing; single-page | 5EOI andADIO5 map confirmed. Source gives noactiveLOW/idle+5V semantics. Keepmapping; dropspecific electrical behavior or addprimaryelectricalsource. |
| 456 | connector-pin | pet/pet-ieee | A | DIO5 | UNVERIFIABLE | PET IEEE488 connectorJ1/J12 drawing; single-page | 5EOI andADIO5 map confirmed. Source gives noactiveLOW/idle+5V semantics. Keepmapping; dropspecific electrical behavior or addprimaryelectricalsource. |
| 457 | connector-pin | pet/pet-user | 11 | GRAPHIC | UNVERIFIABLE | PET User Port J2 connector drawing; single-page scan | Pin11 GRAPHIC is confirmed. The drawing does not explain the added graphic-versus-lowercase character-set selection behavior; retain the label and mark that description unverified pending a circuit/manual source. |
| 458 | connector-pin | pet/pet-user | A | GND | CONFIRMED | PET user-port J2 drawing; single-page scan | Pin11 GRAPHIC; A GND. Drawing itself supplies no extra graphic/lowercase semantic detail beyond GRAPHIC label. |
| 459 | connector-pin | pet/pet-user | C | PA0 | UNVERIFIABLE | PET User PortJ2 drawing; single-page | CPA0 andKPA6 confirmed. VIA register addresses E841/E843 absent from cited drawing; dropaddresses or adddocumentation. |
| 460 | connector-pin | pet/pet-user | K | PA6 | UNVERIFIABLE | PET User PortJ2 drawing; single-page | CPA0 andKPA6 confirmed. VIA register addresses E841/E843 absent from cited drawing; dropaddresses or adddocumentation. |
| 461 | connector-pin | pet/pet-cass1 | 3 | MOTOR | UNVERIFIABLE | PET cassetteJ3/J6 drawing; single-page | 3cassmotor confirmed; drawing supplies no motor-on/off voltage claim. Dropseveralvolts/0Vexpect or addcircuit. |
| 462 | connector-pin | pet/pet-cass2 | 1 | GND | CONFIRMED | PET cassette / PET-N Video connector drawings; single-page scans | Cassette2 pin1 and monitor pin4 are GND. |
| 463 | connector-pin | pet/pet-video | 4 | GND | CONFIRMED | PET cassette / PET-N Video connector drawings; single-page scans | Cassette2 pin1 and monitor pin4 are GND. |
| 464 | connector-pin | c128/c128-power | 5 | 9 V AC | CONFIRMED | C128 Service Manual schematic310378 sheet2; 67 | PowerCN11 pin5 9VAC second winding leg;3 is otherleg. |
| 465 | connector-pin | c128/c128-rgbi | 3 | RED | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 466 | connector-pin | c128/c128-rgbi | 6 | INTENSITY | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 467 | connector-pin | c128/c128-video | 5 | AUDIO IN | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 468 | connector-pin | c128/c128-video | 7 | NC | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 469 | connector-pin | c128/c128-user | 9 | ATN | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 470 | connector-pin | c128/c128-user | K | PB6 | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 471 | connector-pin | c128/c128-exp | 10 | /I/O2 | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 472 | connector-pin | c128/c128-exp | 17 | D4 | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 473 | connector-pin | c128/c128-exp | H | A14 | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 474 | connector-pin | c128/c128-ctrl | 8 | GND | CONFIRMED | C128 Programmer's Reference Guide; C128 Service Manual p.38; 395-400;38 | RGBI red3/intensity6 match VDC46/43; video5 audio in,7NC; user9 ATN,KPB6; expansion10 IO2,17D4,HA14; control8GND. |
| 475 | connector-pin | c128/c128-cass | 5 | WRITE | CONFIRMED | C128 Programmer's Reference Guide / C128 Service Manual schematic310378 sheet2; 398 / 67 | Cassette5 write; board signal CASS WRITE/P3 at8502pin27. |
| 476 | connector-pin | c1541/1541-iec | 3 | ATN | CONFIRMED | 1541-II schematic355207;1541 schematic251748; 43;sheet3 | IEC3 ATN inputtoVIA CA1pin40;6resetLOW toCPUreset throughSchmitt/inverter with5Vpullup. |
| 477 | connector-pin | c1541/1541-iec | 5 | DATA | UNVERIFIABLE | 1540/1541 Service Manual, PDF p.12; 1541-II schematic 355207 p.43; PDF12;43 | Pin5 DATA and bidirectional open-collector wiring are supported. The checked serial-interface section and schematics do not state the added diagnostic claim that one drive held LOW hangs the whole bus; mark that consequence unverified or cite a diagnostic source. |
| 478 | connector-pin | c1541/1541-iec | 6 | /RESET | CONFIRMED | 1541-II schematic355207;1541 schematic251748; 43;sheet3 | IEC3 ATN inputtoVIA CA1pin40;6resetLOW toCPUreset throughSchmitt/inverter with5Vpullup. |
| 479 | connector-pin | c1541/1541-xfmr | 1 | 16 V AC | CONFIRMED | 1541 schematic251748 revE sheet3;1540/1541 Service Manual; PDF8;sheet3 | P1 pins1/4 feed+12V bridgeCR3 in revE schematic; supply theory specifies16VRMS. |
| 480 | connector-pin | c1541/1541ii-power | 2 | GND | CONFIRMED | 312551-01 supply schematic / plug drawing; single-page | Pin2 Ground. |
| 481 | connector-pin | c1541/1541-head | 4 | COM | CONFIRMED | 1541 schematic251748 revE;1540/1541 Service Manual; sheet3;PDF21 | P8pin4 COM,1RW1,5RW2; service resistance table16.3ohm end-to-center. |
| 482 | connector-pin | c1541/1541-spindle | 2 | +12 V | CONFIRMED | 1541 schematic 251748 rev.E; sheet3 | Spindle connector P5 pin2 +12V. |
| 483 | connector-pin | c1571/1571-psu | 4 | +5 V | CONFIRMED | 1571 schematic310420 p.19; Ray Carlsen PSU wiring drawing; 19 / single-page | CN1pin4=+5V; wiring red; VR2015Vadjust marked. |
| 484 | connector-pin | c1571/1571-stepper | 1 | COMMON | CONFIRMED | 1571 Service Manual schematic310420; 19 | CN5 commonpin1 joinedtopin2; supplied from+12V throughQ1 MPSU51 gated by motorcontrol. |
| 485 | connector-pin | c1571/1571-stepper | 6 | PHASE D | CONFIRMED | 1571 Service Manual schematic310420; 19 | Original9625px scan, CN5 enlarged: pin6 phaseD, pin5B,pin4C,pin3A. Label readable atsource resolution. |
| 486 | connector-pin | c1581/1581-fdd | 8 | /INDEX | CONFIRMED | 1581 Service Manual schematic252380 rev4 sheet2; 16 | CN2 pin8 IP toWD1770pin24 with pullup;24 WG via7406 fromWD1770pin21. |
| 487 | connector-pin | c1581/1581-fdd | 24 | /WRITE GATE | CONFIRMED | 1581 Service Manual schematic252380 rev4 sheet2; 16 | CN2 pin8 IP toWD1770pin24 with pullup;24 WG via7406 fromWD1770pin21. |
| 488 | connector-pin | apple2/ii-game16 | 2 | PB0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 489 | connector-pin | apple2/ii-game16 | 3 | PB1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 490 | connector-pin | apple2/ii-slot | 14 | A12 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 491 | connector-pin | apple2/ii-slot | 29 | /NMI | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 492 | connector-pin | apple2/ii-slot | 34 | -5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 493 | connector-pin | apple2/ii-slot | 38 | Φ1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 494 | connector-pin | apple2/ii-cass | T | Cassette in | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 495 | connector-pin | apple2/ii-kbd | 3 | /RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 496 | connector-pin | apple2/ii-kbd | 8 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 497 | connector-pin | apple2/ii-kbd | 11 | Data 3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 498 | connector-pin | apple2/ii-kbd | 14 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 499 | connector-pin | apple2/ii-speaker | 2 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 500 | connector-pin | apple2plus/ii-psu | 6 | -5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 501 | connector-pin | apple2plus/ii-game16 | 3 | PB1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 502 | connector-pin | apple2plus/ii-slot | 4 | A2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 503 | connector-pin | apple2plus/ii-slot | 6 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 504 | connector-pin | apple2plus/ii-slot | 10 | A8 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 505 | connector-pin | apple2plus/ii-slot | 16 | A14 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 506 | connector-pin | apple2plus/ii-slot | 28 | INT IN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 507 | connector-pin | apple2plus/ii-slot | 33 | -12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 508 | connector-pin | apple2plus/ii-slot | 36 | 7M | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 509 | connector-pin | apple2plus/ii-slot | 44 | D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 510 | connector-pin | apple2plus/ii-video | 2 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 511 | connector-pin | apple2plus/ii-video-aux | 2 | VIDEO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 512 | connector-pin | apple2plus/ii-cass | T | Cassette in | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 513 | connector-pin | apple2plus/ii-kbd | 1 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 514 | connector-pin | apple2plus/ii-kbd | 7 | Data 6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 515 | connector-pin | apple2plus/ii-kbd | 12 | Data 0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 516 | connector-pin | apple2e/2e-game16 | 4 | PB2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 517 | connector-pin | apple2e/2e-slot | 11 | A9 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 518 | connector-pin | apple2e/2e-slot | 17 | A15 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 519 | connector-pin | apple2e/2e-slot | 28 | INT IN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 520 | connector-pin | apple2e/2e-slot | 41 | /DEVICE SELECT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 521 | connector-pin | apple2e/2e-slot | 46 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 522 | connector-pin | apple2e/2e-aux | 3 | /SYNC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 523 | connector-pin | apple2e/2e-aux | 7 | /WNDW | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 524 | connector-pin | apple2e/2e-aux | 10 | RA1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 525 | connector-pin | apple2e/2e-aux | 16 | MD7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 526 | connector-pin | apple2e/2e-aux | 20 | MD5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 527 | connector-pin | apple2e/2e-aux | 46 | RA6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 528 | connector-pin | apple2e/2e-kbd | 17 | X7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 529 | connector-pin | apple2e/2e-kbd | 18 | X1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 530 | connector-pin | apple2c/2c-power | 6 | +15 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 531 | connector-pin | apple2c/2c-disk | 5 | -12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 532 | connector-pin | apple2c/2c-mouse-game | 9 | YMOVE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 533 | connector-pin | disk2/disk2-ribbon | 15 | +12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 534 | connector-pin | disk2/disk2-card-hdr | 10 | /WR REQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 535 | connector-pin | disk2/disk2-mech | B | ACT LED | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 536 | connector-pin | disk2/disk2-mech | R | ΦB | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 537 | connector-pin | duodisk/duo-db25 | 7 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 538 | connector-pin | duodisk/duo-db25 | 8 | ENBL B | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 539 | connector-pin | duodisk/duo-db25 | 13 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 540 | connector-pin | duodisk/duo-db25 | 18 | Φ3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 541 | connector-pin | duodisk/duo-db25 | 24 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 542 | connector-pin | duodisk/duo-db19 | 1 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 543 | connector-pin | duodisk/duo-db19 | 6 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 544 | connector-pin | duodisk/duo-db19 | 7 | +12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 545 | connector-pin | duodisk/duo-db19 | 19 | WR DATA | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 546 | connector-pin | unidisk525/uni-db19 | 13 | Φ2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 547 | connector-pin | unidisk525/uni-db19 | 18 | RD DATA | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 548 | connector-pin | atari400/atari-sio | 4 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 549 | connector-pin | atari400/atari-sio | 7 | /COMMAND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 550 | connector-pin | atari400/atari-sio | 9 | /PROCEED | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 551 | connector-pin | atari400/atari-controller | 4 | RIGHT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 552 | connector-pin | atari400/atari-controller | 7 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 553 | connector-pin | atari400/atari-controller-2 | 8 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 554 | connector-pin | atari400/atari-controller-3 | 4 | RIGHT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 555 | connector-pin | atari400/atari-controller-3 | 8 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 556 | connector-pin | atari400/atari-controller-4 | 8 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 557 | connector-pin | atari400/atari-cart | 2 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 558 | connector-pin | atari400/atari-cart | 8 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 559 | connector-pin | atari400/atari-cart | 10 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 560 | connector-pin | atari400/atari-cart | J | A9 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 561 | connector-pin | atari800/atari-controller | 3 | LEFT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 562 | connector-pin | atari800/atari-controller | 6 | TRIG | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 563 | connector-pin | atari800/atari-controller-2 | 7 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 564 | connector-pin | atari800/atari-controller-3 | 4 | RIGHT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 565 | connector-pin | atari800/atari-controller-4 | 4 | RIGHT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 566 | connector-pin | atari800/atari-cart | 1 | /S4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 567 | connector-pin | atari800/atari-cart | A | RD4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 568 | connector-pin | atari800/atari-cart-right | 15 | /CCTL | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 569 | connector-pin | atari800/atari-power | 1 | 9 V AC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 570 | connector-pin | atari600xl/atari-sio | 11 | AUDIO IN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 571 | connector-pin | atari600xl/atari-sio | 13 | /INTERRUPT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 572 | connector-pin | atari600xl/atari-controller | 8 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 573 | connector-pin | atari600xl/atari-controller-2 | 8 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 574 | connector-pin | atari600xl/atari-cart | 6 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 575 | connector-pin | atari600xl/atari-cart | 15 | /CCTL | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 576 | connector-pin | atari600xl/atari-pbi | 9 | A6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 577 | connector-pin | atari600xl/atari-pbi | 27 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 578 | connector-pin | atari600xl/atari-pbi | 30 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 579 | connector-pin | atari600xl/atari-pbi | 36 | RDY | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 580 | connector-pin | atari800xl/atari-sio | 7 | /COMMAND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 581 | connector-pin | atari800xl/atari-sio | 11 | AUDIO IN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 582 | connector-pin | atari800xl/atari-controller-2 | 1 | FWD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 583 | connector-pin | atari800xl/atari-controller-2 | 2 | BACK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 584 | connector-pin | atari800xl/atari-controller-2 | 7 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 585 | connector-pin | atari800xl/atari-cart | 5 | A0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 586 | connector-pin | atari800xl/atari-pbi | 7 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 587 | connector-pin | atari800xl/atari-pbi | 10 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 588 | connector-pin | atari800xl/atari-pbi | 15 | A11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 589 | connector-pin | atari800xl/atari-pbi | 17 | A13 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 590 | connector-pin | atari800xl/atari-pbi | 19 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 591 | connector-pin | atari800xl/atari-pbi | 37 | Reserved | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 592 | connector-pin | atari800xl/atari-pbi | 38 | EXTENB | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 593 | connector-pin | atari800xl/atari-pbi | 40 | /REF | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 594 | connector-pin | atari130xe/atari-controller | 7 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 595 | connector-pin | atari130xe/atari-controller-2 | 9 | POT A | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 596 | connector-pin | atari130xe/atari-cart | 15 | /CCTL | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 597 | connector-pin | atari130xe/atari-cart | N | A11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 598 | connector-pin | atari130xe/atari-eci | B | /IRQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 599 | connector-pin | colecovision/cv-cart | 2 | /CS3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 600 | connector-pin | colecovision/cv-cart | 4 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 601 | connector-pin | colecovision/cv-cart | 7 | A0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 602 | connector-pin | colecovision/cv-cart | 14 | A11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 603 | connector-pin | colecovision/cv-cart | 25 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 604 | connector-pin | colecovision/cv-cart | 27 | /CS4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 605 | connector-pin | colecovision/cv-expansion | 12 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 606 | connector-pin | colecovision/cv-expansion | 19 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 607 | connector-pin | colecovision/cv-expansion | 28 | A10 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 608 | connector-pin | colecovision/cv-expansion | 29 | /MEMMAPOVR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 609 | connector-pin | colecovision/cv-expansion | 30 | /IOMAPOVR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 610 | connector-pin | colecovision/cv-expansion | 31 | EXAUD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 611 | connector-pin | colecovision/cv-expansion | 33 | EXVID | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 612 | connector-pin | colecovision/cv-expansion | 39 | /VDCRST | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 613 | connector-pin | colecovision/cv-expansion | 42 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 614 | connector-pin | colecovision/cv-expansion | 52 | /BUSAK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 615 | connector-pin | colecovision/cv-rf-riser | 6 | VIDEO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 616 | connector-pin | adam/adam-printer-power | 1 | +12 V L | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 617 | connector-pin | adam/adam-printer-power | 6 | ADAMNET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 618 | connector-pin | adam/adam-cart | 11 | A2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 619 | connector-pin | adam/adam-cart | 15 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 620 | connector-pin | adam/adam-cart | 22 | /CS2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 621 | connector-pin | adam/adam-cart | 25 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 622 | connector-pin | adam/adam-controller | 2 | DOWN / KEY D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 623 | connector-pin | adam/adam-controller | 6 | FIRE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 624 | connector-pin | adam/adam-expansion | 9 | /NMI | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 625 | connector-pin | adam/adam-expansion | 18 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 626 | connector-pin | adam/adam-expansion | 23 | A5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 627 | connector-pin | adam/adam-expansion | 39 | /VDCRST | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 628 | connector-pin | adam/adam-expansion | 53 | /RD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 629 | connector-pin | adam/adam-expansion | 58 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 630 | connector-pin | adam/adam-expansion | 60 | -5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 631 | connector-pin | adam/adam-tape-j11 | 4 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 632 | connector-pin | adam/adam-tape-j11 | 6 | +12 V L | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 633 | connector-pin | zx80/zx80-power | T | +9V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 634 | connector-pin | zx80/zx80-tv | 1 | RF | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 635 | connector-pin | zx80/zx80-edge | A2 | /RAMCS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 636 | connector-pin | zx80/zx80-edge | A18 | /BUSAK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 637 | connector-pin | zx80/zx80-edge | A21 | /RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 638 | connector-pin | zx80/zx80-edge | B1 | +5V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 639 | connector-pin | zx80/zx80-edge | B7 | A0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 640 | connector-pin | zx80/zx80-edge | B14 | A12 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 641 | connector-pin | zx81/zx81-ear | T | EAR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 642 | connector-pin | zx81/zx81-mic | T | MIC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 643 | connector-pin | zx81/zx81-edge | A22 | /M1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 644 | connector-pin | zx81/zx81-edge | B6 | /CLK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 645 | connector-pin | zx81/zx81-edge | B20 | A6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 646 | connector-pin | zx81/zx81-edge | B21 | A5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 647 | connector-pin | spectrum/spectrum-tv | 1 | RF | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 648 | connector-pin | spectrum/spectrum-tv | 2 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 649 | connector-pin | spectrum/spectrum-edge | A6 | 0V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 650 | connector-pin | spectrum/spectrum-edge | A23 | A5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 651 | connector-pin | spectrum/spectrum-edge | A24 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 652 | connector-pin | spectrum128/spectrum128-ear | T | EAR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 653 | connector-pin | spectrum128/spectrum128-ear | S | 0V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 654 | connector-pin | spectrum128/spectrum128-rgb | 7 | RED | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 655 | connector-pin | spectrum128/spectrum128-edge | A25 | /ROMCS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 656 | connector-pin | spectrum128/spectrum128-edge | B3 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 657 | connector-pin | spectrum128/spectrum128-edge | B23 | -12V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 658 | connector-pin | spectrumplus2/spectrumplus2-rgb | 1 | CVBS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 659 | connector-pin | spectrumplus2/spectrumplus2-edge | A7 | 0V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 660 | connector-pin | spectrumplus2/spectrumplus2-edge | A10 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 661 | connector-pin | spectrumplus2/spectrumplus2-edge | A19 | /BUSRQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 662 | connector-pin | spectrumplus2/spectrumplus2-edge | A26 | /BUSACK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 663 | connector-pin | spectrumplus2/spectrumplus2-edge | B1 | A15 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 664 | connector-pin | spectrumplus2/spectrumplus2-edge | B4 | N/C | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 665 | connector-pin | spectrumplus2/spectrumplus2-edge | B10 | D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 666 | connector-pin | spectrumplus2/spectrumplus2-edge | B15 | /HALT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 667 | connector-pin | spectrumplus2/spectrumplus2-edge | B27 | A10 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 668 | connector-pin | spectrumplus3/spectrumplus3-rgb | 5 | +12V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 669 | connector-pin | spectrumplus3/spectrumplus3-joystick | 5 | UP | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 670 | connector-pin | spectrumplus3/spectrumplus3-rs232 | 4 | DTR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 671 | connector-pin | spectrumplus3/spectrumplus3-printer | 4 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 672 | connector-pin | spectrumplus3/spectrumplus3-printer | 23 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 673 | connector-pin | spectrumplus3/spectrumplus3-diskb | 7 | /WPROT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 674 | connector-pin | spectrumplus3/spectrumplus3-diskb | 11 | /WGATE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 675 | connector-pin | spectrumplus3/spectrumplus3-exp | U3 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 676 | connector-pin | spectrumplus3/spectrumplus3-exp | U5 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 677 | connector-pin | spectrumplus3/spectrumplus3-exp | U6 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 678 | connector-pin | spectrumplus3/spectrumplus3-exp | U7 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 679 | connector-pin | spectrumplus3/spectrumplus3-exp | U24 | /RFSH | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 680 | connector-pin | spectrumplus3/spectrumplus3-exp | L7 | CK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 681 | connector-pin | ts1000/ts1000-mic | S | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 682 | connector-pin | ts1000/ts1000-tv | 2 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 683 | connector-pin | ts1000/ts1000-edge | A1 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 684 | connector-pin | ts1000/ts1000-edge | A15 | /IORQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 685 | connector-pin | ts1000/ts1000-edge | A17 | /WR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 686 | connector-pin | ts1000/ts1000-edge | B15 | A11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 687 | connector-pin | ts1000/ts1000-edge | B17 | A9 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 688 | connector-pin | ts1000/ts1000-edge | B21 | A5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 689 | connector-pin | ts2068/ts2068-joy | 4 | /DIR4 (right) | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 690 | connector-pin | ts2068/ts2068-dock | 12 | A2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 691 | connector-pin | ts2068/ts2068-expansion | A19 | /RDB | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 692 | connector-pin | ts2068/ts2068-expansion | B1 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 693 | connector-pin | ts2068/ts2068-expansion | B8 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 694 | connector-pin | ts2068/ts2068-expansion | B19 | A10 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 695 | connector-pin | ti994a/ti994a-power | 2 | TAP | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 696 | connector-pin | ti994a/ti994a-io | 3 | /RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 697 | connector-pin | ti994a/ti994a-io | 14 | A8 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 698 | connector-pin | ti994a/ti994a-io | 38 | D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 699 | connector-pin | ti994a/ti994a-io | 41 | IAQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 700 | connector-pin | ti994a/ti994a-cartridge | 34 | /ROMG | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 701 | connector-pin | ti994a/ti994a-regulator-out | 4 | +5V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 702 | connector-pin | coco1/coco-cart | 1 | -12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 703 | connector-pin | coco1/coco-cart | 2 | +12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 704 | connector-pin | coco1/coco-cart | 26 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 705 | connector-pin | coco1/coco-joystick | 1 | POT A | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 706 | connector-pin | coco1/coco-cassette | 3 | MOTOR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 707 | connector-pin | coco2/coco-cart | 4 | /NMI | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 708 | connector-pin | coco2/coco-cart | 8 | /CART | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 709 | connector-pin | coco2/coco-cart | 10 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 710 | connector-pin | coco2/coco-cart | 14 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 711 | connector-pin | coco2/coco-cart | 23 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 712 | connector-pin | coco3/coco-cart | 25 | A6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 713 | connector-pin | coco3/coco-cart | 28 | A9 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 714 | connector-pin | coco3/coco-cart | 29 | A10 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 715 | connector-pin | coco3/coco-cart | 36 | /SCS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 716 | connector-pin | coco3/coco-joystick | 2 | POT B | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 717 | connector-pin | coco3/coco-cassette | 3 | MOTOR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 718 | connector-pin | mc10/mc10-expansion | 11 | R/W | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 719 | connector-pin | mc10/mc10-expansion | 23 | A11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 720 | connector-pin | mc10/mc10-cassette | 1 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 721 | connector-pin | model1/model1-exp | 2 | SYSRES* | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 722 | connector-pin | model1/model1-exp | 7 | A15 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 723 | connector-pin | model1/model1-exp | 39 | +5V / GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 724 | connector-pin | model1/model1-cassette | 1 | REM | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 725 | connector-pin | model1/model1-cassette | 2 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 726 | connector-pin | model1/model1-power | 5 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 727 | connector-pin | model1/ei-bus | 9 | A11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 728 | connector-pin | model1/ei-bus | 15 | RD* | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 729 | connector-pin | model1/ei-bus | 20 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 730 | connector-pin | model1/ei-bus | 23 | TEST* | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 731 | connector-pin | model1/ei-bus | 28 | D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 732 | connector-pin | model1/ei-bus | 31 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 733 | connector-pin | model1/ei-printer | 6 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 734 | connector-pin | model1/ei-printer | 7 | DATA 3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 735 | connector-pin | model1/ei-printer | 16 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 736 | connector-pin | model1/ei-printer | 18 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 737 | connector-pin | model1/ei-printer | 23 | OUTPAPER | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 738 | connector-pin | model1/ei-printer | 25 | UNIT SELECT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 739 | connector-pin | model1/ei-printer | 30 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 740 | connector-pin | model1/ei-disk | 5 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 741 | connector-pin | model1/ei-disk | 10 | DS1* | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 742 | connector-pin | model1/ei-disk | 17 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 743 | connector-pin | model1/ei-disk | 21 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 744 | connector-pin | model1/ei-disk | 28 | WRITE PROTECT* | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 745 | connector-pin | model1/ei-cassette | 2 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 746 | connector-pin | model3/m3-iobus | 12 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 747 | connector-pin | model3/m3-iobus | 18 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 748 | connector-pin | model3/m3-iobus | 21 | XA2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 749 | connector-pin | model3/m3-iobus | 42 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 750 | connector-pin | model3/m3-iobus | 48 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 751 | connector-pin | model3/m3-printer | 5 | DATA 1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 752 | connector-pin | model3/m3-printer | 6 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 753 | connector-pin | model3/m3-printer | 28 | FAULT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 754 | connector-pin | model3/m3-printer | 32 | STATUS IN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 755 | connector-pin | model3/m3-crt | 7 | +12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 756 | connector-pin | model4/m4-iobus | 10 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 757 | connector-pin | model4/m4-iobus | 16 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 758 | connector-pin | model4/m4-iobus | 46 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 759 | connector-pin | model4/m4-printer | 14 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 760 | connector-pin | model4/m4-printer | 17 | DATA 7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 761 | connector-pin | model4/m4-printer | 33 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 762 | connector-pin | model4/m4-cassette | 5 | CASSOUT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 763 | connector-pin | model4/m4-crt | 8 | VIDEO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 764 | connector-pin | hero1/hero1-p201 | 10 | MOTOR BATT + | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 765 | connector-pin | hero1/hero1-p202 | 15 | LOGIC REG OUT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 766 | connector-pin | hero1/hero1-p401 | 3 | BA0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 767 | connector-pin | hero1/hero1-p401 | 9 | BA6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 768 | connector-pin | hero1/hero1-p1201 | 3 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 769 | connector-pin | hero1/hero1-p1201 | 7 | A0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 770 | connector-pin | hero1/hero1-p1201 | 11 | RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 771 | connector-pin | hero1/hero1-p1201 | 20 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 772 | connector-pin | hero1/hero1-p1201 | 21 | /D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 773 | connector-pin | hero1/hero1-p403 | 21 | +5V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 774 | connector-pin | hero1/hero1-p404 | 32 | /SONAR IRQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 775 | connector-pin | hero1/hero1-p405 | 58 | DISPLAY POWER | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 776 | connector-pin | hero1/hero1-p405 | 65 | BD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 777 | connector-pin | hero1/hero1-p405 | 75 | D | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 778 | connector-pin | hero1/hero1-p406 | 5 | BA5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 779 | connector-pin | hero1/hero1-p407 | 1 | RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 780 | connector-pin | hero1/hero1-p407 | 5 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 781 | connector-pin | hero1/hero1-p407 | 7 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 782 | connector-pin | hero1/hero1-p407 | 8 | D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 783 | connector-pin | hero1/hero1-p408 | 3 | BA15 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 784 | connector-pin | hero1/hero1-p408 | 4 | BA14 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 785 | connector-pin | hero1/hero1-p308 | 110 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 786 | connector-pin | hero1/hero1-p306 | 131 | D7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 787 | connector-pin | hero1/hero1-p306 | 138 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 788 | connector-pin | hero1/hero1-p307 | 124 | HEAD LIMIT CCW | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 789 | connector-pin | hero1/hero1-p309 | 103 | STEER Φ2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 790 | connector-pin | hero1/hero1-p315 | 161 | EXT/HEAD Φ4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 791 | connector-pin | hero1/hero1-p317 | 143 | SPEECH PWR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 792 | connector-pin | hero1/hero1-p311 | 86 | +12V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 793 | connector-pin | hero1/hero1-p311 | 88 | +12V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 794 | connector-pin | hero1/hero1-p312 | 193 | SENSE D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 795 | connector-pin | hero1/hero1-p313 | 185 | /RIGHT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 796 | connector-pin | hero1/hero1-p313 | 187 | TRIGGER | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 797 | connector-pin | hero1/hero1-p314 | 177 | P1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 798 | connector-pin | hero1/hero1-p501 | 5 | P5 (D5) | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 799 | connector-pin | herojr/herojr-charger | 2 | CHARGER + | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 800 | connector-pin | herojr/herojr-charger | 4 | REG OUT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 801 | connector-pin | herojr/herojr-rs232 | 3 | RS232 XMIT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 802 | connector-pin | herojr/herojr-p201 | 9 | -10V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 803 | connector-pin | herojr/herojr-p201 | 11 | +5V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 804 | connector-pin | herojr/herojr-p201 | 22 | L/S ENABLE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 805 | connector-pin | herojr/herojr-p311 | 4 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 806 | connector-pin | herojr/herojr-p311 | 6 | PULSE DISK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 807 | connector-pin | herojr/herojr-p304 | 2 | MIC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 808 | connector-pin | herojr/herojr-p306 | 2 | LDR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 809 | connector-pin | herojr/herojr-p202 | 1 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 810 | connector-pin | herojr/herojr-p203 | 2 | +12 SWITCHED | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 811 | connector-pin | herojr/herojr-p203 | 3 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 812 | connector-pin | herojr/herojr-p203 | 8 | RS232 GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 813 | connector-pin | herojr/herojr-p205 | 5 | BIT 7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 814 | connector-pin | herojr/herojr-p205 | 11 | RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 815 | connector-pin | herojr/herojr-p205 | 22 | LED 3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 816 | connector-pin | herojr/herojr-p206 | 1 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 817 | connector-pin | hero2000/hero2000-backplane | 30 | /VI5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 818 | connector-pin | hero2000/hero2000-backplane | 32 | /VI7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 819 | connector-pin | hero2000/hero2000-backplane | 35 | /HLD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 820 | connector-pin | hero2000/hero2000-p412 | 7 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 821 | connector-pin | pc5150/pc-kbd | 4 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 822 | connector-pin | pc5150/pc-slot | A27 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 823 | connector-pin | pc5150/pc-slot | B14 | -IOR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 824 | connector-pin | pc5150/pc-slot | B16 | DRQ3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 825 | connector-pin | pc5150/pc-cga | 3 | RED | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 826 | connector-pin | pc5150/pc-cga | 5 | BLUE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 827 | connector-pin | pc5150/pc-lpt | 6 | +DATA 4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 828 | connector-pin | pc5150/pc-lpt | 12 | +P.END | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 829 | connector-pin | pc5150/pc-lpt | 13 | +SELECT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 830 | connector-pin | pc5150/pc-lpt | 21 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 831 | connector-pin | pc5150/pc-ser | 4 | RTS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 832 | connector-pin | pc5150/pc-ser | 11 | -TX LOOP | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 833 | connector-pin | pc5150/pc-ser | 21 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 834 | connector-pin | pc5150/pc-game | 6 | POSITION 1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 835 | connector-pin | xt5160/pc-kbd | 1 | +KBD CLOCK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 836 | connector-pin | xt5160/pc-kbd | 4 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 837 | connector-pin | xt5160/xt-psu | P8-3 | +12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 838 | connector-pin | xt5160/xt-slot | A11 | AEN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 839 | connector-pin | xt5160/xt-slot | A20 | A11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 840 | connector-pin | xt5160/xt-slot | B10 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 841 | connector-pin | xt5160/xt-slot | B15 | -DACK3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 842 | connector-pin | xt5160/xt-slot | B20 | CLOCK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 843 | connector-pin | xt5160/xt-cga | 8 | HORIZONTAL DRIVE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 844 | connector-pin | xt5160/xt-lpt | 1 | -STROBE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 845 | connector-pin | xt5160/xt-lpt | 7 | +DATA 5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 846 | connector-pin | xt5160/xt-lpt | 18 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 847 | connector-pin | xt5160/xt-lpt | 21 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 848 | connector-pin | xt5160/xt-ser | 21 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 849 | connector-pin | xt5160/xt-ser | 25 | -RX LOOP | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 850 | connector-pin | xt5160/xt-game | 7 | BUTTON 5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 851 | connector-pin | xt5160/xt-game | 9 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 852 | connector-pin | xt5160/xt-game | 12 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 853 | connector-pin | xt5160/xt-game | 15 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 854 | connector-pin | portable5155/p-kbd | 5 | DATA | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 855 | connector-pin | portable5155/p-psu | P9-5 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 856 | connector-pin | portable5155/p-slot | A1 | -I/O CH CK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 857 | connector-pin | portable5155/p-slot | A5 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 858 | connector-pin | portable5155/p-slot | A15 | A16 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 859 | connector-pin | portable5155/p-slot | A24 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 860 | connector-pin | portable5155/p-slot | A29 | A2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 861 | connector-pin | portable5155/p-slot | B3 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 862 | connector-pin | portable5155/p-cga-rca | 1 | VIDEO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 863 | connector-pin | pcjr/jr-psu | 2 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 864 | connector-pin | pcjr/jr-psu | 7 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 865 | connector-pin | pcjr/jr-video | A2 | LOGIC GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 866 | connector-pin | pcjr/jr-lpen | A1 | +12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 867 | connector-pin | pcjr/jr-lpen | A2 | -LIGHT PEN INPUT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 868 | connector-pin | pcjr/jr-lpen | B2 | -LIGHT PEN SWITCH | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 869 | connector-pin | pcjr/jr-kbd | A1 | KEY | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 870 | connector-pin | pcjr/jr-kbd | B2 | -CABLE CONNECT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 871 | connector-pin | pcjr/jr-joy | B1 | SHIELD GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 872 | connector-pin | pcjr/jr-joy | B2 | X-AXIS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 873 | connector-pin | pcjr/jr-ser | A3 | RTS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 874 | connector-pin | pcjr/jr-cass | A1 | LOGIC GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 875 | connector-pin | pcjr/jr-cass | A4 | MOTOR CONTROL | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 876 | connector-pin | pcjr/jr-cass | B3 | MOTOR CONTROL SW | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 877 | connector-pin | pcjr/jr-cart | A4 | -BASE 1 ROM IN CARTRIDGE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 878 | connector-pin | pcjr/jr-cart | A7 | A9 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 879 | connector-pin | pcjr/jr-cart | A12 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 880 | connector-pin | pcjr/jr-cart | A18 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 881 | connector-pin | pcjr/jr-cart | B3 | -CS3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 882 | connector-pin | pcjr/jr-cart | B5 | A12 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 883 | connector-pin | pcjr/jr-cart | B12 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 884 | connector-pin | pcjr/jr-io | A5 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 885 | connector-pin | pcjr/jr-io | A22 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 886 | connector-pin | pcjr/jr-io | A23 | HLDA | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 887 | connector-pin | pcjr/jr-io | A28 | IRQ1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 888 | connector-pin | pcjr/jr-io | B2 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 889 | connector-pin | pcjr/jr-io | B4 | SHIELD GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 890 | connector-pin | pcjr/jr-io | B17 | SHIELD GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 891 | connector-pin | pcjr/jr-io | B25 | IO/-M | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 892 | connector-pin | pcjr/jr-io | B30 | AUDIO IN | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 893 | connector-pin | cpc464/cpc464-exp | 28 | /MREQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 894 | connector-pin | cpc464/cpc464-exp | 37 | /BUSRQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 895 | connector-pin | cpc464/cpc464-printer | 19 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 896 | connector-pin | cpc464/cpc464-printer | 22 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 897 | connector-pin | cpc464/cpc464-printer | 26 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 898 | connector-pin | cpc664/cpc664-5v | 2 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 899 | connector-pin | cpc664/cpc664-exp | 3 | A15 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 900 | connector-pin | cpc664/cpc664-exp | 7 | A11 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 901 | connector-pin | cpc664/cpc664-exp | 20 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 902 | connector-pin | cpc664/cpc664-exp | 23 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 903 | connector-pin | cpc664/cpc664-exp | 26 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 904 | connector-pin | cpc664/cpc664-exp | 34 | /HALT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 905 | connector-pin | cpc664/cpc664-exp | 38 | /BUSAK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 906 | connector-pin | cpc664/cpc664-exp | 50 | PHI | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 907 | connector-pin | cpc664/cpc664-printer | 3 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 908 | connector-pin | cpc664/cpc664-printer | 11 | BUSY | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 909 | connector-pin | cpc664/cpc664-printer | 28 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 910 | connector-pin | cpc664/cpc664-printer | 27 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 911 | connector-pin | cpc664/cpc664-printer | 31 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 912 | connector-pin | cpc664/cpc664-disc2 | 9 | /TRACK 0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 913 | connector-pin | cpc664/cpc664-disc2 | 25 | N/C | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 914 | connector-pin | cpc664/cpc664-disc2 | 27 | /INDEX | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 915 | connector-pin | cpc664/cpc664-disc2 | 33 | N/C | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 916 | connector-pin | cpc664/cpc664-disc2 | 26 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 917 | connector-pin | cpc6128/cpc6128-exp | 6 | A12 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 918 | connector-pin | cpc6128/cpc6128-exp | 14 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 919 | connector-pin | cpc6128/cpc6128-exp | 38 | /BUSAK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 920 | connector-pin | cpc6128/cpc6128-exp | 45 | RAMDIS | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 921 | connector-pin | cpc6128/cpc6128-printer | 5 | D3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 922 | connector-pin | cpc6128/cpc6128-printer | 23 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 923 | connector-pin | cpc6128/cpc6128-printer | 24 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 924 | connector-pin | cpc6128/cpc6128-printer | 15 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 925 | connector-pin | cpc6128/cpc6128-printer | 31 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 926 | connector-pin | cpc6128/cpc6128-disc2 | 9 | /TRACK 0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 927 | connector-pin | cpc6128/cpc6128-disc2 | 19 | /MOTOR ON | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 928 | connector-pin | cpc6128/cpc6128-disc2 | 29 | N/C | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 929 | connector-pin | cpc6128/cpc6128-disc2 | 8 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 930 | connector-pin | cpc6128/cpc6128-disc2 | 12 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 931 | connector-pin | cpc6128/cpc6128-disc2 | 24 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 932 | connector-pin | cpc6128/cpc6128-disc2 | 32 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 933 | connector-pin | cpc6128/cpc6128-tape | 5 | DATA OUT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 934 | connector-pin | bbcb/bbcb-rs423 | C | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 935 | connector-pin | bbcb/bbcb-analogue | 13 | PB0 (fire 0) | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 936 | connector-pin | bbcb/bbcb-disc | 11 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 937 | connector-pin | bbcb/bbcb-printer | 10 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 938 | connector-pin | bbcb/bbcb-printer | 11 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 939 | connector-pin | bbcb/bbcb-printer | 19 | /ACK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 940 | connector-pin | bbcb/bbcb-user | 18 | PB6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 941 | connector-pin | bbcb/bbcb-user | 19 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 942 | connector-pin | bbcb/bbcb-1mhz | 15 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 943 | connector-pin | bbcb/bbcb-1mhz | 20 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 944 | connector-pin | bbcb/bbcb-1mhz | 23 | D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 945 | connector-pin | bbcb/bbcb-psu | +5V-2 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 946 | connector-pin | bbcb/bbcb-auxpower | 4 | +12 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 947 | connector-pin | bbcmaster/master-rs423 | C | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 948 | connector-pin | bbcmaster/master-cassette | 4 | OUTPUT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 949 | connector-pin | bbcmaster/master-cassette | 7 | MOTOR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 950 | connector-pin | bbcmaster/master-analogue | 10 | PB1 (fire 1) | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 951 | connector-pin | bbcmaster/master-disc | 6 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 952 | connector-pin | bbcmaster/master-disc | 26 | /TR00 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 953 | connector-pin | bbcmaster/master-printer | 4 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 954 | connector-pin | bbcmaster/master-user | 4 | CB2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 955 | connector-pin | bbcmaster/master-user | 13 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 956 | connector-pin | bbcmaster/master-1mhz | 4 | 1MHzE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 957 | connector-pin | bbcmaster/master-1mhz | 9 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 958 | connector-pin | bbcmaster/master-1mhz | 13 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 959 | connector-pin | bbcmaster/master-1mhz | 23 | D5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 960 | connector-pin | bbcmaster/master-tube | 7 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 961 | connector-pin | bbcmaster/master-tube | 9 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 962 | connector-pin | bbcmaster/master-tube | 12 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 963 | connector-pin | bbcmaster/master-tube | 25 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 964 | connector-pin | bbcmaster/master-tube | 35 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 965 | connector-pin | bbcmaster/master-tube | 37 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 966 | connector-pin | bbcmaster/master-kbd11 | 7 | R1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 967 | connector-pin | bbcmaster/master-kbd11 | 15 | C5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 968 | connector-pin | bbcmaster/master-kbd24 | 2 | C7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 969 | connector-pin | bbcmaster/master-kbd24 | 14 | 0VB | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 970 | connector-pin | bbcmaster/master-cart | A7 | A12 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 971 | connector-pin | bbcmaster/master-cart | A12 | /NMI | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 972 | connector-pin | bbcmaster/master-battery | 2 | BAT + | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 973 | connector-pin | bbcmaster/master-psu | +5V-3 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 974 | connector-pin | bbcmaster/master-psu | 0V-3 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 975 | connector-pin | electron/electron-expansion | 27 | /RDY | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 976 | connector-pin | electron/electron-expansion | 29 | KEY | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 977 | connector-pin | electron/electron-expansion | 36 | A10 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 978 | connector-pin | electron/electron-expansion | 37 | A9 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 979 | connector-pin | electron/electron-expansion | 39 | A1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 980 | connector-pin | electron/electron-expansion | 42 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 981 | connector-pin | electron/electron-expansion | 50 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 982 | connector-pin | electron/electron-rgb | 5 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 983 | connector-pin | electron/electron-rgb | 6 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 984 | connector-pin | electron/electron-video | 1 | VIDEO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 985 | connector-pin | electron/electron-uhf | 2 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 986 | connector-pin | electron/electron-kbd | 15 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 987 | connector-pin | electron/electron-kbd | 16 | A6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 988 | connector-pin | electron/electron-kbd | 22 | A4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 989 | connector-pin | dragon32/dragon-cart | 14 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 990 | connector-pin | dragon32/dragon-cart | 24 | A5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 991 | connector-pin | dragon32/dragon-cart | 26 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 992 | connector-pin | dragon32/dragon-joystick | 2 | Y | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 993 | connector-pin | dragon32/dragon-printer | 14 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 994 | connector-pin | dragon32/dragon-printer | 16 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 995 | connector-pin | dragon32/dragon32-psu | 6 | VIDEO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 996 | connector-pin | dragon32/dragon-keyboard | 8 | PA6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 997 | connector-pin | dragon32/dragon-keyboard | 11 | PB2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 998 | connector-pin | dragon64/dragon-cart | 6 | E | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 999 | connector-pin | dragon64/dragon-cart | 8 | CART | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1000 | connector-pin | dragon64/dragon-cart | 26 | A7 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1001 | connector-pin | dragon64/dragon-printer | 1 | /STROBE | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1002 | connector-pin | dragon64/dragon-printer | 7 | D2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1003 | connector-pin | dragon64/dragon-printer | 11 | D4 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1004 | connector-pin | dragon64/dragon-printer | 15 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1005 | connector-pin | dragon64/dragon-printer | 12 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1006 | connector-pin | dragon64/dragon-printer | 18 | 0 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1007 | connector-pin | dragon64/dragon-serial | 2 | RXD | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1008 | connector-pin | dragon64/dragon64-psu | 6 | VIDEO | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1009 | connector-pin | msx1/msx1-cart | 2 | /CS2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1010 | connector-pin | msx1/msx1-cart | 33 | D1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1011 | connector-pin | msx1/msx1-joy1 | 4 | RIGHT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1012 | connector-pin | msx1/msx1-joy2 | 3 | LEFT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1013 | connector-pin | msx1/msx1-tape | 7 | REMOTE - | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1014 | connector-pin | msx1/msx1-printer | 13 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1015 | connector-pin | msx2/msx2-cart | 10 | /BUSDIR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1016 | connector-pin | msx2/msx2-cart | 12 | /MREQ | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1017 | connector-pin | msx2/msx2-cart | 13 | /WR | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1018 | connector-pin | msx2/msx2-cart | 18 | A15 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1019 | connector-pin | msx2/msx2-cart | 29 | A3 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1020 | connector-pin | msx2/msx2-joy1 | 9 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1021 | connector-pin | msx2/msx2-joy2 | 2 | BACK | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1022 | connector-pin | msx2/msx2-joy2 | 8 | OUTPUT | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1023 | connector-pin | msx2/msx2-tape | 3 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1024 | connector-pin | msx2/msx2-printer | 10 | NC | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1025 | connector-pin | msx2/msx2-audio | 1 | SIGNAL | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1026 | connector-pin | oric1/oric1-exp | 10 | D0 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1027 | connector-pin | oric1/oric1-exp | 14 | D6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1028 | connector-pin | oric1/oric1-exp | 17 | A2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1029 | connector-pin | oric1/oric1-exp | 23 | A6 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1030 | connector-pin | oric1/oric1-exp | 33 | +5 V | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1031 | connector-pin | oric1/oric1-tape | 2 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1032 | connector-pin | oric1/oric1-power | 2 | 9 V return | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1033 | connector-pin | oric1/oric1-kbd | 3 | COL 2 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1034 | connector-pin | atmos/atmos-exp | 1 | /MAP | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1035 | connector-pin | atmos/atmos-exp | 4 | /RESET | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1036 | connector-pin | atmos/atmos-exp | 7 | R/W | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1037 | connector-pin | atmos/atmos-exp | 30 | A12 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1038 | connector-pin | atmos/atmos-exp | 34 | GND | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1039 | connector-pin | atmos/atmos-kbd | 2 | COL 1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1040 | connector-pin | atmos/atmos-kbd | 11 | COL 5 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
| 1041 | connector-pin | atmos/atmos-kbd | 7 | ROW AD1 | NOT CHECKED | - | Outside completed coverage; no conclusion. |
