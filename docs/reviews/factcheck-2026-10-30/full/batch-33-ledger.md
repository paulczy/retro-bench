# Batch-33 fact-check ledger

All 288 items examined; indices 0-287. No data edited. A compound record is UNVERIFIABLE if any substantive claim lacks proof; supported portions are specified. WRONG requires a positive contradiction. Printed page numbers are used unless marked PDF.

Downloads: curl -L -A Mozilla/5.0 failed locally with TLS SEC_E_NO_CREDENTIALS. Python requests with the same user agent downloaded all sources successfully (HTTP 200). This was an environment failure, not dead links. PDFs were processed with pdftotext -layout; scanned pages/diagrams rendered with pdftoppm -r 110 -png and inspected directly. Archive viewer pages were resolved through metadata to exact cited issue PDFs; viewer HTML alone was not proof. Saved artifacts are in batch-33/.

Snapshot discrepancy: the supplied batch items 0/1 contain reversed signal names. The available src/data/sinclair.js lines 671-672 already use the correct names (centre 0V, sleeve +9V). WRONG decisions apply to the supplied batch JSON, not a claim that these labels remain wrong in the current source copy. No correction was made by this review.

Source keys:

- SI: [SI source](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Introduction%20Manual.pdf)
- SM: [SM source](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf)
- SC: [SC source](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Tech%20specs/ZX%20Spectrum%20Connectors.html)
- S3: [S3 source](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Circuit%20Diagrams/ZX%20Spectrum%20Issue%203%20-%20Schaltbild.gif)
- SS: [SS source](https://k1.spdns.de/Vintage/Sinclair/82/Sinclair%20ZX%20Spectrum/Repair/ZX%20Spectrum%20Service%20Manual%20(scans).pdf)
- RR: [RR source](https://blog.retroleum.co.uk/electronics-articles/repairing-a-zx-spectrum)
- RC: [RC source](https://retroleum.co.uk/zx-spectrum-chips)
- TM: [TM source](https://k1.spdns.de/Vintage/Sinclair/82/Timex%20Sinclair%202068/Tech%20Specs%20and%20Repair/Timex%20Sinclair%202068%20-%20Technical%20Manual.pdf)
- CATS: [CATS source](https://archive.org/details/cats-newsletter/CATS%20v4%20n6%20SEp%201986/page/n9)
- SYD: [SYD source](https://archive.org/details/SyntaxMagazine/Syntax%20v4n12/page/n1)
- TC: [TC source](https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201000/Connectors.html)
- SUM: [SUM source](https://archive.org/details/SinclairTimexUsersMagazine/SUM%20v4%20n1/page/n4)
- SYJ: [SYJ source](https://archive.org/details/SyntaxMagazine/Syntax%20v5n1/page/n7)
- SAMS: [SAMS source](https://archive.org/details/TimexSinclairEphemera/CC-19_Timex%20_Sinclair%202068/page/n8)

| Kind | Items | CONFIRMED | WRONG | UNVERIFIABLE |
|---|---:|---:|---:|---:|
| chip-pin | 87 | 87 | 0 | 0 |
| clock-row | 7 | 7 | 0 | 0 |
| connector-pin | 173 | 169 | 2 | 2 |
| first-ten | 7 | 1 | 0 | 6 |
| rail | 10 | 8 | 0 | 2 |
| scope | 4 | 0 | 0 | 4 |
| **Total** | **288** | **272** | **2** | **14** |

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | spectrum-power | pin 1 / +9V | WRONG | SC Power Supply (HTML) | HIGH: Correct name GND / 0V, centre negative. Name +9V contradicts the source and its own type/description/expect. Mapping: prove-it-works; fix-root-causes. |
| 1 | spectrum-power | pin 2 / 0V | WRONG | SC Power Supply (HTML); SM26 | HIGH: Correct name +9V, sleeve positive. Name 0V contradicts source and own type/description/expect. SC gives nominal9V/about15V unloaded; SM gives C50 9V +/-2V. Mapping: prove-it-works; fix-root-causes. |
| 2 | spectrum | Crystal X1 | CONFIRMED | SM13,32 | External14MHz crystal X1 p13; IC1 pin39 14MHz explicit p32. |
| 3 | spectrum | Colour subcarrier X2 | CONFIRMED | SM18 | 4.433619MHz +/-50Hz; IC14 leg17 frequency-meter connection via4.7pF explicit. Source describes test-clip modification. |
| 4 | spectrum-ear | pin T / EAR | CONFIRMED | SM15,44 | EAR LOAD input uses shared ULA pin28;3.5mm mono jack signal contact tip. |
| 5 | spectrum-ear | pin S / 0V | CONFIRMED | SM15,44 | EAR mono jack sleeve common signal return,0V. |
| 6 | spectrum-mic | pin T / MIC | CONFIRMED | SM15,44 | MIC SAVE output uses shared ULA pin28;3.5mm mono jack signal contact tip. |
| 7 | spectrum-mic | pin S / 0V | CONFIRMED | SM15,44 | MIC mono jack sleeve common signal return,0V. |
| 8 | spectrum | Supply on load | UNVERIFIABLE | SM18,26 | Source silent on far more than900mA proving a short and on centre-negative polarity. C50 positive9V +/-2V and malfunction below7V p26;9V bench supply and500-700mA 16K/700-900mA 48K consumption p18 supported. These do not prove categorical failure diagnosis. |
| 9 | spectrum | +5 V from the 7805 | UNVERIFIABLE | SM26,31 | Source silent on reverse polarity usually destroying7805. C34 5V +/-0.25V/no ripple,ULA14,CPU11 and R64/regulator/PWR-socket checks supported. Retroleum named in prose but URL absent from this item sources. |
| 10 | spectrum | -5 V from the DC-DC converter | UNVERIFIABLE | SM17,30 | Source silent on no coil buzz plus absent-5V proving TR4 failed and on new4116s dying without-5V. Pin1/-5.5 to-4V p17; changing TR4/TR5 together after repeat failure p30 supported. Appended coil-buzz note is a different PDF not cited for this item. |
| 11 | spectrum | 14 MHz crystal | CONFIRMED | SM13,32 | IC1 pin39 14MHz and crystal X1 checks explicit6.3.2;ULA oscillator role p13. |
| 12 | spectrum | CPU clock | UNVERIFIABLE | SM9,26,32 | Exact3.5MHz unproven: p32 gives3MHz at CPU6/ULA32 and14MHz at ULA39,plus3V at ULA13. P9 supports5V amplitude; R25/TR3 checks supported. Neither divide-by4 nor authoritative frequency correction supplied. |
| 13 | spectrum | Reset and idle control lines | UNVERIFIABLE | SM26 | Source silent on power-on RESET LOW then HIGH and three specified idle HIGH levels. It lists NMI17/WAIT24/BUSRQ25/RESET26 and requests good-board comparison;does not give expected states. |
| 14 | spectrum | Frame interrupt and lower RAM strobes | UNVERIFIABLE | SM8,10,27 | 20ms interrupt cadence p8,sequenced RAS/CAS p10,IC25 pin16 +5V isolation and IC13-to-IC6/ULA/CPU order p27 supported. Additional exact ULA12/35/1 references not established in cited PDF;basic-check table gives IC22 pin4 RAS/pin15 CAS. Separate circuit diagram needed. |
| 15 | spectrum | +9 V DC in | CONFIRMED | SM26; S3 power circuit | C50 positive9V +/-2V,regulator malfunction below7V;S3 raw+9V at4A matches A4. |
| 16 | spectrum | +5 V | CONFIRMED | SM17,26;S3;RC regulator listings | 4.75-5.25V/no ripple at C34/IC6 pin9/ULA14/CPU11;S3 +5V at3A. RC supports heatsink removal for Traco/Murata and horizontal mounting on Issue2 in rubber-key case. |
| 17 | spectrum | +12 V | UNVERIFIABLE | SM15,17;S3;RR initialization | 12V +/-1.2V at IC6 pin8,D5/C44,TR4/TR5,expansion22B supported. Source silent on categorical low+12V kills lower RAM: RR says out-of-whack supplies MAY damage4116s and describes RAM faults pulling rails down,not that every low12V causes destruction. |
| 18 | spectrum | +12 VA | CONFIRMED | SM15,17,26;S3 | 10.8-13.2V at LT side C52,+12VA colour supply,R62/C45 smoothing. IC14 is on-board load;schematic also takes rail to expansion. |
| 19 | spectrum | -5 V | UNVERIFIABLE | SM17;S3;RR initialization;SS PDF64 | IC6 pin1,-5.5 to-4V,expansion20B supported. Source silent on missing-5V specifically endangering4116s: RR possible damage from unspecified out-of-whack supplies;SS coexisting inverter/RAM faults without proving this exact causal claim. |
| 20 | spectrum | GND | CONFIRMED | SM26;S3 IC1/2/5/6 | Ground Z80 pin29/ULA40/ROM14 explicit p26;S3 shows4116 pin16 common0V. |
| 21 | spectrum | CPU clock | UNVERIFIABLE | SM9,10,26,32 | Source silent on verified3.5MHz or divide-by4 correction. P26 prints14MHz at ULA32;p32 prints3MHz there/14MHz at39. P9 supports5V amplitude;p10 contention pauses;p32 R25/TR3. WoS mentioned but not cited. |
| 22 | spectrum | Luminance and sync (Y) | UNVERIFIABLE | SM31 waveform image | Pin17 and1V/3.5V extrema verified. Source labels period65nS;does not establish correction to64us,224 T-states,or3.5MHz. WoS lacks actual citation. Drawing has intermediate plateau in addition to extrema. |
| 23 | spectrum | Colour difference (U) | UNVERIFIABLE | SM31 waveform image | Pin15 and2V/3V extrema verified;source silent on64us period and Sinclair-logo-screen condition. Issue1/2 VR1/VR2 checks supported. |
| 24 | spectrum | Colour difference (V) | UNVERIFIABLE | SM31 waveform image | Pin16,2V rest,+3V pulse and+1V dip verified. Item acknowledges simplified drawing;source silent on asserted64us period. |
| 25 | scld_tx2068 | pin 1 / A0 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin1 = A0. CPU address input,function/direction p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 26 | scld_tx2068 | pin 2 / A1 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin2 = A1. CPU address input,function/direction p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 27 | scld_tx2068 | pin 3 / A2 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin3 = A2. CPU address input,function/direction p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 28 | scld_tx2068 | pin 4 / A3 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin4 = A3. CPU address input,function/direction p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 29 | scld_tx2068 | pin 5 / A4 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin5 = A4. CPU address input,function/direction p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 30 | scld_tx2068 | pin 6 / A5 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin6 = A5. CPU address input,function/direction p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 31 | scld_tx2068 | pin 7 / A6 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin7 = A6. CPU address input,function/direction p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 32 | scld_tx2068 | pin 9 / A13 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin9 = A13. CPU address input,function/direction p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 33 | scld_tx2068 | pin 10 / /Î¦ | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin10 = inverted clock. Buffered inverted CPU clock to P1 B9;3.528MHz p42. TM35 specifies68-pin JEDEC leaded carrier. |
| 34 | scld_tx2068 | pin 11 / /EXROM | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin11 = /EXROM. U20 select20/P1 A27/J4 pin34;active-low Extension ROM. TM35 specifies68-pin JEDEC leaded carrier. |
| 35 | scld_tx2068 | pin 12 / /BE | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin12 = /BE. P1 A29/J4 pin33;LOW disables Home/Extension/Dock p40;pull-up supplies inactive HIGH. TM35 specifies68-pin JEDEC leaded carrier. |
| 36 | scld_tx2068 | pin 13 / OSC OUT | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin13 = OSC OUT. Oscillator output,Y1 14.112MHz p42. TM35 specifies68-pin JEDEC leaded carrier. |
| 37 | scld_tx2068 | pin 14 / OSC IN | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin14 = OSC IN. Oscillator input,Y1 14.112MHz p42;all these clocks derive from oscillator. TM35 specifies68-pin JEDEC leaded carrier. |
| 38 | scld_tx2068 | pin 15 / TAPE IN | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin15 = TAPE IN. EAR circuit TAPE IN;input during LOAD p62. TM35 specifies68-pin JEDEC leaded carrier. |
| 39 | scld_tx2068 | pin 16 / SPKR/TAPE OUT | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin16 = SPKR/TAPE OUT. Digital MIC/speaker output and P1 B2;BEEP/cassette pp40,48-49. TM35 specifies68-pin JEDEC leaded carrier. |
| 40 | scld_tx2068 | pin 17 / BC1 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin17 = BC1. BC1 to AY pin20. TM35 specifies68-pin JEDEC leaded carrier. |
| 41 | scld_tx2068 | pin 18 / BDIR | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin18 = BDIR. BDIR to AY pin18. TM35 specifies68-pin JEDEC leaded carrier. |
| 42 | scld_tx2068 | pin 19 / Î¦C | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin19 = sound clock. Sound clock to AY15;1.764MHz p40/p43 figure,14.112MHz/8. P21 prints1.76475MHz. TM35 specifies68-pin JEDEC leaded carrier. |
| 43 | scld_tx2068 | pin 20 / /TS | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin20 = /TS. Address/data tri-state during CPU/display contention p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 44 | scld_tx2068 | pin 21 / MUX | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin21 = MUX. MUX control U10/U11 74LS157 row/column select p39. TM35 specifies68-pin JEDEC leaded carrier. |
| 45 | scld_tx2068 | pin 22 / MA7 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin22 = MA7. Multiplexed display address output,MA bus pp38-39. TM35 specifies68-pin JEDEC leaded carrier. |
| 46 | scld_tx2068 | pin 23 / MA3 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin23 = MA3. Multiplexed display address output,MA bus pp38-39. TM35 specifies68-pin JEDEC leaded carrier. |
| 47 | scld_tx2068 | pin 24 / MA4 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin24 = MA4. Multiplexed display address output,MA bus pp38-39. TM35 specifies68-pin JEDEC leaded carrier. |
| 48 | scld_tx2068 | pin 25 / MA2 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin25 = MA2. Multiplexed display address output,MA bus pp38-39. TM35 specifies68-pin JEDEC leaded carrier. |
| 49 | scld_tx2068 | pin 27 / /ROMCS | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin27 = /ROMCS. U16 pin20,Home-ROM first16K active-low select p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 50 | scld_tx2068 | pin 28 / MA6 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin28 = MA6. Multiplexed display address output,MA bus pp38-39. TM35 specifies68-pin JEDEC leaded carrier. |
| 51 | scld_tx2068 | pin 29 / MA1 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin29 = MA1. Multiplexed display address output,MA bus pp38-39. TM35 specifies68-pin JEDEC leaded carrier. |
| 52 | scld_tx2068 | pin 30 / MA5 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin30 = MA5. Multiplexed display address output,MA bus pp38-39. TM35 specifies68-pin JEDEC leaded carrier. |
| 53 | scld_tx2068 | pin 31 / MA0 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin31 = MA0. Multiplexed display address output,MA bus pp38-39. TM35 specifies68-pin JEDEC leaded carrier. |
| 54 | scld_tx2068 | pin 32 / /ROSCS | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin32 = /ROSCS. Dock select J4 pin35/P1 A28 p40. TM35 specifies68-pin JEDEC leaded carrier. |
| 55 | scld_tx2068 | pin 33 / Y | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin33 = Y. Luminance/sync to U4 LM1889 pp47-48. TM35 specifies68-pin JEDEC leaded carrier. |
| 56 | scld_tx2068 | pin 34 / U | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin34 = U. U=B-Y chroma p41. TM35 specifies68-pin JEDEC leaded carrier. |
| 57 | scld_tx2068 | pin 35 / V | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin35 = V. V=R-Y chroma p39. TM35 specifies68-pin JEDEC leaded carrier. |
| 58 | scld_tx2068 | pin 36 / /RAS1 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin36 = /RAS1. U6/U7 display row strobe,read/write,refresh/display reads p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 59 | scld_tx2068 | pin 37 / /DRAMWE | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin37 = /DRAMWE. LOW write-enable display RAM only p39. TM35 specifies68-pin JEDEC leaded carrier. |
| 60 | scld_tx2068 | pin 38 / A7R | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin38 = A7R. A7+refresh via U5 upper32K4416s;AppendixD p288 corrects A7R vs A7RB. TM35 specifies68-pin JEDEC leaded carrier. |
| 61 | scld_tx2068 | pin 39 / /CAS3 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin39 = /CAS3. Home fourth16K,C000-FFFF pp36,39. TM35 specifies68-pin JEDEC leaded carrier. |
| 62 | scld_tx2068 | pin 40 / /CAS2 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin40 = /CAS2. Home third16K,8000-BFFF pp36,39. TM35 specifies68-pin JEDEC leaded carrier. |
| 63 | scld_tx2068 | pin 41 / /CAS1 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin41 = /CAS1. Display second16K,4000-7FFF pp36,39. TM35 specifies68-pin JEDEC leaded carrier. |
| 64 | scld_tx2068 | pin 42 / Î¦CPU | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin42 = CPU clock. CPU6,3.528MHz;stops HIGH during contention p42. TM35 specifies68-pin JEDEC leaded carrier. |
| 65 | scld_tx2068 | pin 44 / A14 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin44 = A14. CPU address input,function/direction p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 66 | scld_tx2068 | pin 46 / B | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin46 = B. TTL blue to P1 B29 pp41,54. TM35 specifies68-pin JEDEC leaded carrier. |
| 67 | scld_tx2068 | pin 47 / G | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin47 = G. TTL green to P1 B28 pp41,54. TM35 specifies68-pin JEDEC leaded carrier. |
| 68 | scld_tx2068 | pin 48 / R | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin48 = R. TTL red to P1 B27 pp41,54. TM35 specifies68-pin JEDEC leaded carrier. |
| 69 | scld_tx2068 | pin 49 / KB0 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin49 = KB0. J9 pin1 keyboard input. TM35 specifies68-pin JEDEC leaded carrier. |
| 70 | scld_tx2068 | pin 50 / KB1 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin50 = KB1. J9 pin2 keyboard input. TM35 specifies68-pin JEDEC leaded carrier. |
| 71 | scld_tx2068 | pin 51 / KB2 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin51 = KB2. J9 pin3 keyboard input. TM35 specifies68-pin JEDEC leaded carrier. |
| 72 | scld_tx2068 | pin 52 / KB3 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin52 = KB3. J9 pin4 keyboard input. TM35 specifies68-pin JEDEC leaded carrier. |
| 73 | scld_tx2068 | pin 53 / KB4 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin53 = KB4. J9 pin5 keyboard input. TM35 specifies68-pin JEDEC leaded carrier. |
| 74 | scld_tx2068 | pin 54 / RDIR | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin54 = RDIR. Overbar RD in schematic/RD* CATS,direction control U9 74LS245 p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 75 | scld_tx2068 | pin 55 / D1 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin55 = D1. Bidirectional data through U9/display RAM,p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 76 | scld_tx2068 | pin 56 / D2 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin56 = D2. Bidirectional data through U9/display RAM,p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 77 | scld_tx2068 | pin 57 / D0 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin57 = D0. Bidirectional data through U9/display RAM,p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 78 | scld_tx2068 | pin 58 / D3 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin58 = D3. Bidirectional data through U9/display RAM,p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 79 | scld_tx2068 | pin 59 / D5 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin59 = D5. Bidirectional data through U9/display RAM,p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 80 | scld_tx2068 | pin 62 / D7 | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin62 = D7. Bidirectional data through U9/display RAM,p38. TM35 specifies68-pin JEDEC leaded carrier. |
| 81 | scld_tx2068 | pin 63 / /RD | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin63 = /RD. Active-low CPU control input,definitions/directions pp39-40. TM35 specifies68-pin JEDEC leaded carrier. |
| 82 | scld_tx2068 | pin 64 / /IORQ | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin64 = /IORQ. Active-low CPU control input,definitions/directions pp39-40. TM35 specifies68-pin JEDEC leaded carrier. |
| 83 | scld_tx2068 | pin 65 / /WR | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin65 = /WR. Active-low CPU control input,definitions/directions pp39-40. TM35 specifies68-pin JEDEC leaded carrier. |
| 84 | scld_tx2068 | pin 66 / /MREQ | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin66 = /MREQ. Active-low CPU control input,definitions/directions pp39-40. TM35 specifies68-pin JEDEC leaded carrier. |
| 85 | scld_tx2068 | pin 67 / /INT | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin67 = /INT. Open-drain N-channel/internal pull-up p40;about17ms interrupt p44 heading,60.1145Hz p42. TM35 specifies68-pin JEDEC leaded carrier. |
| 86 | scld_tx2068 | pin 68 / /RFSH | CONFIRMED | TM PDF178 U3;printed38-44;CATS10 | U3 pin68 = /RFSH. Active-low CPU control input,definitions/directions pp39-40. TM35 specifies68-pin JEDEC leaded carrier. |
| 87 | rom_ts2068_exrom | pin 1 / NC | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin1 = NC. Pin1 unused in mask-ROM drawing;p18 requires1 and27 HIGH for2764. |
| 88 | rom_ts2068_exrom | pin 2 / A12 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin2 = A12. Address input on matching numbered address net. |
| 89 | rom_ts2068_exrom | pin 3 / A7 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin3 = A7. Address input on matching numbered address net. |
| 90 | rom_ts2068_exrom | pin 4 / A6 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin4 = A6. Address input on matching numbered address net. |
| 91 | rom_ts2068_exrom | pin 5 / A5 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin5 = A5. Address input on matching numbered address net. |
| 92 | rom_ts2068_exrom | pin 6 / A4 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin6 = A4. Address input on matching numbered address net. |
| 93 | rom_ts2068_exrom | pin 7 / A3 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin7 = A3. Address input on matching numbered address net. |
| 94 | rom_ts2068_exrom | pin 8 / A2 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin8 = A2. Address input on matching numbered address net. |
| 95 | rom_ts2068_exrom | pin 9 / A1 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin9 = A1. Address input on matching numbered address net. |
| 96 | rom_ts2068_exrom | pin 10 / A0 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin10 = A0. Address input on matching numbered address net. |
| 97 | rom_ts2068_exrom | pin 11 / D0 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin11 = D0. Data output on matching numbered data net. |
| 98 | rom_ts2068_exrom | pin 12 / D1 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin12 = D1. Data output on matching numbered data net. |
| 99 | rom_ts2068_exrom | pin 13 / D2 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin13 = D2. Data output on matching numbered data net. |
| 100 | rom_ts2068_exrom | pin 15 / D3 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin15 = D3. Data output on matching numbered data net. |
| 101 | rom_ts2068_exrom | pin 16 / D4 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin16 = D4. Data output on matching numbered data net. |
| 102 | rom_ts2068_exrom | pin 17 / D5 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin17 = D5. Data output on matching numbered data net. |
| 103 | rom_ts2068_exrom | pin 19 / D7 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin19 = D7. Data output on matching numbered data net. |
| 104 | rom_ts2068_exrom | pin 20 / /CS | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin20 = /CS. From U3 pin11/P1 A27/J4 pin34,LOW during Extension ROM reads. |
| 105 | rom_ts2068_exrom | pin 21 / A10 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin21 = A10. Address input on matching numbered address net. |
| 106 | rom_ts2068_exrom | pin 22 / /MREQ | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin22 = /MREQ. Second enable wired memory request. |
| 107 | rom_ts2068_exrom | pin 23 / A11 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin23 = A11. Address input on matching numbered address net. |
| 108 | rom_ts2068_exrom | pin 24 / A9 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin24 = A9. Address input on matching numbered address net. |
| 109 | rom_ts2068_exrom | pin 25 / A8 | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin25 = A8. Address input on matching numbered address net. |
| 110 | rom_ts2068_exrom | pin 26 / /RD | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin26 = /RD. RD enable;p18 explicitly substitutes A13 from U16 pin26 for27128 replacement. |
| 111 | rom_ts2068_exrom | pin 27 / /RD | CONFIRMED | TM PDF178 U20;printed18 | U20 2364 8Kx8 mask ROM pin27 = /RD. RD enable;p18 requires cutting input and tying+5V for EPROM. |
| 112 | ts2068 | Crystal Y1 | CONFIRMED | TM42;PDF178 U3/Y1 | AT-cut Y1 14.112MHz;schematic terminals SCLD13/14. |
| 113 | ts2068 | Pixel clock | CONFIRMED | TM42 | Internal serial pixel output1 bit/142ns,explicit7.056MHz. |
| 114 | ts2068 | CPU clock | CONFIRMED | TM42;PDF178 U3/U19 | 14.112MHz /4 =3.528MHz;SCLD42 to CPU6. |
| 115 | ts2068 | AY clock | CONFIRMED | TM40,43 figure;PDF178 U3/U14 | Figure explicitly1.764MHz=14.112MHz/8,p40 agrees;SCLD19 to AY15. Narrow cited p21 differs at1.76475MHz;other pages in same document support record. |
| 116 | ts2068 | Line rate | CONFIRMED | TM42 | 14.112MHz /896 =15.75kHz horizontal sweep,explicit. |
| 117 | ts1000-edge | pin A2 / /RAMCS | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A2 = /RAMCS,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 118 | ts1000-edge | pin A3 / SLOT | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A3 = SLOT,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 119 | ts1000-edge | pin A4 / D0 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A4 = D0,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 120 | ts1000-edge | pin A5 / D1 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A5 = D1,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 121 | ts1000-edge | pin A6 / D2 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A6 = D2,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 122 | ts1000-edge | pin A7 / D6 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A7 = D6,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 123 | ts1000-edge | pin A8 / D5 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A8 = D5,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 124 | ts1000-edge | pin A9 / D3 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A9 = D3,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 125 | ts1000-edge | pin A10 / D4 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A10 = D4,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 126 | ts1000-edge | pin A11 / /INT | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A11 = /INT,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 127 | ts1000-edge | pin A12 / /NMI | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A12 = /NMI,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 128 | ts1000-edge | pin A13 / /HALT | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A13 = /HALT,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 129 | ts1000-edge | pin A14 / /MREQ | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A14 = /MREQ,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 130 | ts1000-edge | pin A16 / /RD | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A16 = /RD,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 131 | ts1000-edge | pin A18 / /BUSAK | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A18 = /BUSAK,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 132 | ts1000-edge | pin A19 / /WAIT | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A19 = /WAIT,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 133 | ts1000-edge | pin A20 / /BUSRQ | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A20 = /BUSRQ,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 134 | ts1000-edge | pin A21 / /RESET | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A21 = /RESET,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 135 | ts1000-edge | pin A22 / /M1 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A22 = /M1,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 136 | ts1000-edge | pin A23 / /RFSH | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 A23 = /RFSH,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 137 | ts1000-edge | pin B1 / +5 V | UNVERIFIABLE | TC graphic;TM54;SYD1 | B1 regulated+5V confirmed;source silent on4.9-5.2V acceptance range. TS2068 compatibility does not establish TS1000 regulator tolerance. |
| 138 | ts1000-edge | pin B2 / +9 V | UNVERIFIABLE | TC Power Supply/graphic;SYD1 | B2 raw Uss,nominal9V/about14V unloaded confirmed;source silent on8V lower bound or8-14V operating acceptance range. Unloaded value is not an operating tolerance. |
| 139 | ts1000-edge | pin B3 / SLOT | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B3 = SLOT,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 140 | ts1000-edge | pin B4 / 0 V | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B4 = 0 V,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 141 | ts1000-edge | pin B5 / 0 V | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B5 = 0 V,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 142 | ts1000-edge | pin B6 / /CLK | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B6 = /CLK,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 143 | ts1000-edge | pin B7 / A0 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B7 = A0,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 144 | ts1000-edge | pin B8 / A1 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B8 = A1,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 145 | ts1000-edge | pin B9 / A2 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B9 = A2,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 146 | ts1000-edge | pin B10 / A3 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B10 = A3,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 147 | ts1000-edge | pin B11 / A15 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B11 = A15,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 148 | ts1000-edge | pin B12 / A14 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B12 = A14,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 149 | ts1000-edge | pin B13 / A13 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B13 = A13,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 150 | ts1000-edge | pin B14 / A12 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B14 = A12,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 151 | ts1000-edge | pin B16 / A10 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B16 = A10,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 152 | ts1000-edge | pin B18 / A8 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B18 = A8,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 153 | ts1000-edge | pin B19 / A7 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B19 = A7,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 154 | ts1000-edge | pin B20 / A6 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B20 = A6,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 155 | ts1000-edge | pin B22 / A4 | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B22 = A4,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 156 | ts1000-edge | pin B23 / /ROMCS | CONFIRMED | TC connector graphic;TM54;SYD1 | TS1000 B23 = /ROMCS,function agrees with graphic. Component A,bottom B,23 positions including slot3. SYD distinguishes missing RAMCS/ROMCS/9V on2068;original TS1000 graphic used for those signals. |
| 157 | ts2068-power | pin 1 / GND (DC return) | CONFIRMED | TM63;SUM5 | SUM explicitly inner contact negative/outer positive. Centre DC return,0V. |
| 158 | ts2068-power | pin 2 / +15 V DC (unregulated) | CONFIRMED | TM8-9,63,PDF178;SUM5 | 14-25V at1A adapter,sleeve positive,SW2 to regulators/P1 B3. SUM reports about21V stock adapter. |
| 159 | ts2068-tv | pin 1 / RF | CONFIRMED | TM64 | RCA TV modulated colour RF,channels2/3:55,250/61,250kHz +/-100kHz=55.25/61.25MHz. |
| 160 | ts2068-tv | pin 2 / GND | CONFIRMED | TM64 | RCA RF coax shield/common return,0V. |
| 161 | ts2068-monitor | pin 1 / VIDEO | CONFIRMED | TM64,47 | MONITOR RCA composite colour,explicit1V p-p +/-20%,75ohm cable. |
| 162 | ts2068-monitor | pin 2 / GND | CONFIRMED | TM64 | RCA monitor coax shield/common return,0V. |
| 163 | ts2068-ear | pin T / EAR | CONFIRMED | TM62,55 | EAR input4-10V p-p;low-pass23kHz;P1 A2 EAR in same document. |
| 164 | ts2068-ear | pin S / GND | CONFIRMED | TM62 | EAR mono mini-phone sleeve common return,0V. |
| 165 | ts2068-mic | pin T / MIC | CONFIRMED | TM62,40,49 | MIC output0.15-0.67V p-p,low-pass2.5kHz;SPKR/TAPE OUT is tape output. |
| 166 | ts2068-mic | pin S / GND | CONFIRMED | TM62 | MIC mono mini-phone sleeve common return,0V. |
| 167 | ts2068-joy | pin 1 / /DIR1 (up) | CONFIRMED | TM33-34,63,288;SYJ8-9 | Pin1 DIR1 up,bit0. MaleD9 computer connector;SYJ specifies femaleDB9S mating connector. |
| 168 | ts2068-joy | pin 2 / /DIR2 (down) | CONFIRMED | TM33-34,63,288;SYJ8-9 | Pin2 DIR2 down,bit1. MaleD9 computer connector;SYJ specifies femaleDB9S mating connector. |
| 169 | ts2068-joy | pin 3 / /DIR3 (left) | CONFIRMED | TM33-34,63,288;SYJ8-9 | Pin3 DIR3 left,bit2. MaleD9 computer connector;SYJ specifies femaleDB9S mating connector. |
| 170 | ts2068-joy | pin 5 / NC | CONFIRMED | TM33-34,63,288;SYJ8-9 | Pin5 unused. MaleD9 computer connector;SYJ specifies femaleDB9S mating connector. |
| 171 | ts2068-joy | pin 6 / /BUTTON | CONFIRMED | TM33-34,63,288;SYJ8-9 | Pin6 BUTTON,bit7;SYJ explicitly actual I/O-port button value128. MaleD9 computer connector;SYJ specifies femaleDB9S mating connector. |
| 172 | ts2068-joy | pin 7 / +5 V | CONFIRMED | TM33-34,63,288;SYJ8-9 | Pin7+5V;TM8-9 gives4.75-5.25V. MaleD9 computer connector;SYJ specifies femaleDB9S mating connector. |
| 173 | ts2068-joy | pin 8 / /READ STROBE | CONFIRMED | TM33-34,63,288;SYJ8-9 | Pin8 READ STROBE,left A8/Q8,right A9/Q7,LOW during selected F6H read,TM33/63. MaleD9 computer connector;SYJ specifies femaleDB9S mating connector. |
| 174 | ts2068-joy | pin 9 / GND | CONFIRMED | TM33-34,63,288;SYJ8-9 | Pin9 ground is intended assignment;AppendixD288 explicitly says traces omitted on2068 PCB;SYJ lists unused. Stock-open warning supported. MaleD9 computer connector;SYJ specifies femaleDB9S mating connector. |
| 175 | ts2068-dock | pin 1 / A14B | CONFIRMED | TM59-60;SYJ8 | J4 pin1 = A14B,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 176 | ts2068-dock | pin 2 / +5 V | CONFIRMED | TM59-60;SYJ8 | J4 pin2 = +5 V,explicit Table2.4.2-1. DC+5V;tolerance4.75-5.25V from TM8-9. Odd/even side orientation checked Figure2.4.2-2. |
| 177 | ts2068-dock | pin 3 / A12 | CONFIRMED | TM59-60;SYJ8 | J4 pin3 = A12,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 178 | ts2068-dock | pin 4 / A13B | CONFIRMED | TM59-60;SYJ8 | J4 pin4 = A13B,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 179 | ts2068-dock | pin 5 / D0 | CONFIRMED | TM59-60;SYJ8 | J4 pin5 = D0,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 180 | ts2068-dock | pin 6 / D7 | CONFIRMED | TM59-60;SYJ8 | J4 pin6 = D7,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 181 | ts2068-dock | pin 7 / D1 | CONFIRMED | TM59-60;SYJ8 | J4 pin7 = D1,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 182 | ts2068-dock | pin 8 / A0 | CONFIRMED | TM59-60;SYJ8 | J4 pin8 = A0,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 183 | ts2068-dock | pin 9 / D2 | CONFIRMED | TM59-60;SYJ8 | J4 pin9 = D2,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 184 | ts2068-dock | pin 10 / A1 | CONFIRMED | TM59-60;SYJ8 | J4 pin10 = A1,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 185 | ts2068-dock | pin 11 / D6 | CONFIRMED | TM59-60;SYJ8 | J4 pin11 = D6,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 186 | ts2068-dock | pin 13 / D5 | CONFIRMED | TM59-60;SYJ8 | J4 pin13 = D5,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 187 | ts2068-dock | pin 14 / A3 | CONFIRMED | TM59-60;SYJ8 | J4 pin14 = A3,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 188 | ts2068-dock | pin 15 / D3 | CONFIRMED | TM59-60;SYJ8 | J4 pin15 = D3,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 189 | ts2068-dock | pin 16 / A15B | CONFIRMED | TM59-60;SYJ8 | J4 pin16 = A15B,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 190 | ts2068-dock | pin 17 / D4 | CONFIRMED | TM59-60;SYJ8 | J4 pin17 = D4,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 191 | ts2068-dock | pin 18 / /MREQB | CONFIRMED | TM59-60;SYJ8 | J4 pin18 = /MREQB,explicit Table2.4.2-1. Active-low control/function and buffered suffix match table. Odd/even side orientation checked Figure2.4.2-2. |
| 192 | ts2068-dock | pin 19 / /IORQB | CONFIRMED | TM59-60;SYJ8 | J4 pin19 = /IORQB,explicit Table2.4.2-1. Active-low control/function and buffered suffix match table. Odd/even side orientation checked Figure2.4.2-2. |
| 193 | ts2068-dock | pin 20 / A7RB | CONFIRMED | TM59-60;SYJ8 | J4 pin20 = A7RB,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 194 | ts2068-dock | pin 21 / /RDB | CONFIRMED | TM59-60;SYJ8 | J4 pin21 = /RDB,explicit Table2.4.2-1. Active-low control/function and buffered suffix match table. Odd/even side orientation checked Figure2.4.2-2. |
| 195 | ts2068-dock | pin 22 / /M1 | CONFIRMED | TM59-60;SYJ8 | J4 pin22 = /M1,explicit Table2.4.2-1. Active-low control/function and buffered suffix match table. Odd/even side orientation checked Figure2.4.2-2. |
| 196 | ts2068-dock | pin 23 / /WRB | CONFIRMED | TM59-60;SYJ8 | J4 pin23 = /WRB,explicit Table2.4.2-1. Active-low control/function and buffered suffix match table. Odd/even side orientation checked Figure2.4.2-2. |
| 197 | ts2068-dock | pin 24 / A8 | CONFIRMED | TM59-60;SYJ8 | J4 pin24 = A8,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 198 | ts2068-dock | pin 25 / A7 | CONFIRMED | TM59-60;SYJ8 | J4 pin25 = A7,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 199 | ts2068-dock | pin 26 / A9 | CONFIRMED | TM59-60;SYJ8 | J4 pin26 = A9,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 200 | ts2068-dock | pin 27 / A6 | CONFIRMED | TM59-60;SYJ8 | J4 pin27 = A6,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 201 | ts2068-dock | pin 28 / A10 | CONFIRMED | TM59-60;SYJ8 | J4 pin28 = A10,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 202 | ts2068-dock | pin 29 / A5 | CONFIRMED | TM59-60;SYJ8 | J4 pin29 = A5,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 203 | ts2068-dock | pin 30 / A11 | CONFIRMED | TM59-60;SYJ8 | J4 pin30 = A11,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 204 | ts2068-dock | pin 31 / A4 | CONFIRMED | TM59-60;SYJ8 | J4 pin31 = A4,explicit Table2.4.2-1. Numbered address/data or buffered-refresh definition agrees. Odd/even side orientation checked Figure2.4.2-2. |
| 205 | ts2068-dock | pin 32 / /RFSHB | CONFIRMED | TM59-60;SYJ8 | J4 pin32 = /RFSHB,explicit Table2.4.2-1. Active-low control/function and buffered suffix match table. Odd/even side orientation checked Figure2.4.2-2. |
| 206 | ts2068-dock | pin 33 / /BE | CONFIRMED | TM59-60;SYJ8 | J4 pin33 = /BE,explicit Table2.4.2-1. Active-low control/function and buffered suffix match table. Odd/even side orientation checked Figure2.4.2-2. |
| 207 | ts2068-dock | pin 34 / /EXROM | CONFIRMED | TM59-60;SYJ8 | J4 pin34 = /EXROM,explicit Table2.4.2-1. Active-low control/function and buffered suffix match table. Odd/even side orientation checked Figure2.4.2-2. |
| 208 | ts2068-dock | pin 35 / /ROSCS | CONFIRMED | TM59-60;SYJ8 | J4 pin35 = /ROSCS,explicit Table2.4.2-1. Active-low control/function and buffered suffix match table. Odd/even side orientation checked Figure2.4.2-2. |
| 209 | ts2068-dock | pin 36 / GND | CONFIRMED | TM59-60;SYJ8 | J4 pin36 = GND,explicit Table2.4.2-1. Ground,0V. Odd/even side orientation checked Figure2.4.2-2. |
| 210 | ts2068-expansion | pin A1 / GND | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A1 = GND,layout/table agree. Signal/power ground distinction matches table;0V. A=component,B=solder side. |
| 211 | ts2068-expansion | pin A2 / EAR | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A2 = EAR,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 212 | ts2068-expansion | pin A3 / A7RB | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A3 = A7RB,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 213 | ts2068-expansion | pin A4 / D7 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A4 = D7,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 214 | ts2068-expansion | pin A5 / DZIN | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A5 = DZIN,layout/table agree. Daisy chain,not connected per table/schematic. A=component,B=solder side. |
| 215 | ts2068-expansion | pin A6 / SLOT | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A6 = SLOT,layout/table agree. Polarising slot6,no contact. A=component,B=solder side. |
| 216 | ts2068-expansion | pin A7 / D0 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A7 = D0,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 217 | ts2068-expansion | pin A8 / D1 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A8 = D1,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 218 | ts2068-expansion | pin A9 / D2 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A9 = D2,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 219 | ts2068-expansion | pin A10 / D6 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A10 = D6,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 220 | ts2068-expansion | pin A11 / D5 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A11 = D5,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 221 | ts2068-expansion | pin A12 / D3 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A12 = D3,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 222 | ts2068-expansion | pin A13 / D4 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A13 = D4,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 223 | ts2068-expansion | pin A14 / /INT | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A14 = /INT,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 224 | ts2068-expansion | pin A15 / /NMI | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A15 = /NMI,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 225 | ts2068-expansion | pin A16 / /HALT | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A16 = /HALT,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 226 | ts2068-expansion | pin A17 / /MREQB | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A17 = /MREQB,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 227 | ts2068-expansion | pin A18 / /IORQB | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A18 = /IORQB,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 228 | ts2068-expansion | pin A20 / /WRB | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A20 = /WRB,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 229 | ts2068-expansion | pin A21 / /BUSAK | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A21 = /BUSAK,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 230 | ts2068-expansion | pin A22 / /WAIT | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A22 = /WAIT,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 231 | ts2068-expansion | pin A23 / /BUSRQ | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A23 = /BUSRQ,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 232 | ts2068-expansion | pin A24 / /RESET | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A24 = /RESET,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 233 | ts2068-expansion | pin A25 / /M1 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A25 = /M1,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 234 | ts2068-expansion | pin A26 / /RFSHB | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A26 = /RFSHB,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 235 | ts2068-expansion | pin A27 / /EXROM | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A27 = /EXROM,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 236 | ts2068-expansion | pin A28 / /ROSCS | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A28 = /ROSCS,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 237 | ts2068-expansion | pin A29 / /BE | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A29 = /BE,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 238 | ts2068-expansion | pin A30 / IOA5 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A30 = IOA5,layout/table agree. AY portA bit5;Table2.4.1-2 p56 specifies1uF and220K pull-up. A=component,B=solder side. |
| 239 | ts2068-expansion | pin A31 / SOUND | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A31 = SOUND,layout/table agree. Table p55 explicitly analog sound0-5V. A=component,B=solder side. |
| 240 | ts2068-expansion | pin A32 / GND | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 A32 = GND,layout/table agree. Signal/power ground distinction matches table;0V. A=component,B=solder side. |
| 241 | ts2068-expansion | pin B2 / SPKR/TAPE OUT | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B2 = SPKR/TAPE OUT,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 242 | ts2068-expansion | pin B3 / +15 V | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B3 = +15 V,layout/table agree. Raw positive switched adapterDC;14-25V p8. A=component,B=solder side. |
| 243 | ts2068-expansion | pin B4 / +5 V | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B4 = +5 V,layout/table agree. Regulated+5V;4.75-5.25V pp8-9. A=component,B=solder side. |
| 244 | ts2068-expansion | pin B5 / NC | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B5 = NC,layout/table agree. Not used. A=component,B=solder side. |
| 245 | ts2068-expansion | pin B6 / SLOT | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B6 = SLOT,layout/table agree. Polarising slot6,no contact. A=component,B=solder side. |
| 246 | ts2068-expansion | pin B7 / GND | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B7 = GND,layout/table agree. Signal/power ground distinction matches table;0V. A=component,B=solder side. |
| 247 | ts2068-expansion | pin B9 / /Î¦ | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B9 = inverted clock,layout/table agree. Inverted CPU clock from SCLD10;3.528MHz p42. A=component,B=solder side. |
| 248 | ts2068-expansion | pin B10 / A0 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B10 = A0,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 249 | ts2068-expansion | pin B11 / A1 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B11 = A1,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 250 | ts2068-expansion | pin B12 / A2 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B12 = A2,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 251 | ts2068-expansion | pin B13 / A3 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B13 = A3,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 252 | ts2068-expansion | pin B14 / A15B | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B14 = A15B,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 253 | ts2068-expansion | pin B15 / A14B | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B15 = A14B,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 254 | ts2068-expansion | pin B16 / A13B | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B16 = A13B,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 255 | ts2068-expansion | pin B17 / A12 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B17 = A12,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 256 | ts2068-expansion | pin B18 / A11 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B18 = A11,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 257 | ts2068-expansion | pin B20 / A9 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B20 = A9,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 258 | ts2068-expansion | pin B21 / A8 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B21 = A8,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 259 | ts2068-expansion | pin B22 / A7 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B22 = A7,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 260 | ts2068-expansion | pin B23 / A6 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B23 = A6,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 261 | ts2068-expansion | pin B24 / A5 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B24 = A5,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 262 | ts2068-expansion | pin B25 / A4 | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B25 = A4,layout/table agree. Signal meaning/active-low/buffered designation agree. A=component,B=solder side. |
| 263 | ts2068-expansion | pin B26 / DZOUT | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B26 = DZOUT,layout/table agree. Daisy chain,not connected per table/schematic. A=component,B=solder side. |
| 264 | ts2068-expansion | pin B27 / R | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B27 = R,layout/table agree. TTL red p41/electrical table56. A=component,B=solder side. |
| 265 | ts2068-expansion | pin B28 / G | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B28 = G,layout/table agree. TTL green p41/electrical table56. A=component,B=solder side. |
| 266 | ts2068-expansion | pin B29 / B | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B29 = B,layout/table agree. TTL blue p41/electrical table56. A=component,B=solder side. |
| 267 | ts2068-expansion | pin B30 / BUSISO | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B30 = BUSISO,layout/table agree. BUSISO in table/memo,but NC in AppendixD schematic as item warns. A=component,B=solder side. |
| 268 | ts2068-expansion | pin B31 / VIDEO | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B31 = VIDEO,layout/table agree. Composite VIDEO same node as monitorJ7;1V p-p p64. A=component,B=solder side. |
| 269 | ts2068-expansion | pin B32 / GND | CONFIRMED | TM54-56,PDF178 P1;SYJ8-9 | P1 B32 = GND,layout/table agree. Signal/power ground distinction matches table;0V. A=component,B=solder side. |
| 270 | ts2068-kbd | pin 0 / GND | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin0 = GND;source explicitly numbers0-13. Ground,0V. |
| 271 | ts2068-kbd | pin 1 / KB0 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin1 = KB0;source explicitly numbers0-13. Keyboard input to SCLD pin49,AppendixD. |
| 272 | ts2068-kbd | pin 2 / KB1 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin2 = KB1;source explicitly numbers0-13. Keyboard input to SCLD pin50,AppendixD. |
| 273 | ts2068-kbd | pin 3 / KB2 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin3 = KB2;source explicitly numbers0-13. Keyboard input to SCLD pin51,AppendixD. |
| 274 | ts2068-kbd | pin 4 / KB3 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin4 = KB3;source explicitly numbers0-13. Keyboard input to SCLD pin52,AppendixD. |
| 275 | ts2068-kbd | pin 5 / KB4 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin5 = KB4;source explicitly numbers0-13. Keyboard input to SCLD pin53,AppendixD. |
| 276 | ts2068-kbd | pin 6 / CR6/A11 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin6 = CR6/A11;source explicitly numbers0-13. Exact diode/address row agrees with table. |
| 277 | ts2068-kbd | pin 7 / CR7/A10 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin7 = CR7/A10;source explicitly numbers0-13. Exact diode/address row agrees with table. |
| 278 | ts2068-kbd | pin 8 / CR8/A9 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin8 = CR8/A9;source explicitly numbers0-13. Exact diode/address row agrees with table. |
| 279 | ts2068-kbd | pin 9 / CR9/A12 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin9 = CR9/A12;source explicitly numbers0-13. Exact diode/address row agrees with table. |
| 280 | ts2068-kbd | pin 10 / CR10/A13B | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin10 = CR10/A13B;source explicitly numbers0-13. Exact diode/address row agrees with table. |
| 281 | ts2068-kbd | pin 11 / CR11/A8 | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin11 = CR11/A8;source explicitly numbers0-13. Exact diode/address row agrees with table. |
| 282 | ts2068-kbd | pin 12 / CR12/A14B | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin12 = CR12/A14B;source explicitly numbers0-13. Exact diode/address row agrees with table. |
| 283 | ts2068-kbd | pin 13 / CR13/A15B | CONFIRMED | TM64 table;PDF178 keyboard/U3 | J9 pin13 = CR13/A15B;source explicitly numbers0-13. Exact diode/address row agrees with table. |
| 284 | ts2068 | Power in | CONFIRMED | TM8-9,51(sec2.3),PDF178;SUM5 | Adapter14-25V p8;SUM about21V. Section2.3 p51 absolute DC input14.75-26V. Sleeve positive,raw switched DC P1 B3. Absolute limits and adapter range are distinct source specifications. |
| 285 | ts2068 | +5 V | CONFIRMED | TM8-9,PDF178;SAMS PDF3/18 | 5V rail4.75-5.25V at200mA-1A;78S40 switching regulatorU1. Schematic verifies CPU11/SCLD43/AY3/P1 B4. SAMS independently labels SCLD43 5.0V. |
| 286 | ts2068 | +12 V | CONFIRMED | TM8-9,parts292,PDF178;SAMS8 | 12V rail11.5-12.5V at20-100mA;78L12 regulatorU8. SAMS checks U8 input/output and names12.0V output. |
| 287 | ts2068 | GND | CONFIRMED | TM PDF178;SAMS PDF3/18 | Direct ground-net checks:CPU29/SCLD26/AY6,common0V return. |

Source-link disposition: no dead, blocked, or wrong-document source links found; all cited documents obtained. WoS has no actual source URL in the Spectrum waveform/clock citations. Item 9 names Retroleum without citing its URL. TM p21 conflicts with pp40/43 on AY clock precision; pp40/43 substantiate 1.764MHz.

Principle mapping: the two reversed power labels map to prove-it-works and fix-root-causes; correct the shared connector names together. No finding maps to serialize-shared-state-mutations: static facts were reviewed, with no shared-state mutation defect identified.
