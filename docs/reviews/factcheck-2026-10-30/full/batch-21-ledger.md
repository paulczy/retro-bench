# batch-21 fact-check ledger

Input: batch-21.json; 268 items, i=0..267. Read-only review of supplied records. No live data changed.

Decision covers the whole supplied item. UNVERIFIABLE can mean a pin is proven but an added direction, exact number, or diagnosis is not. Evidence distinguishes those cases. Page references are printed pages with PDF page indices in parentheses.

Principle mapping: all findings map to prove-it-works; semantic/direction corrections additionally map to fix-root-causes. No shared-state mutation finding applies to this static-data review.

## Source access

- S0: [https://archive.org/download/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08.pdf](https://archive.org/download/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08/Service_Manual_128_128D_Computer_1987-11_Commodore_PN-314001-08.pdf) — Downloaded; image-only scan. Rendered cited chip pages and schematic/clock/connector sections at 110 dpi.
- S1: [http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/Plus_4_Technical_Docs.pdf) — Downloaded text PDF; page 18 pin-name column is usable but descriptions are shifted by one row. Resolve with C128 printed pinout and HM4864 data sheet.
- S2: [https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf](https://bitsavers.org/components/hitachi/_dataBooks/1984_Hitachi_IC_Memory_Data_Book_Mar84.pdf) — Downloaded and inspected.
- S3: [http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf](http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf) — Downloaded and inspected.
- S4: [https://web.archive.org/web/20260823132238/https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt](https://web.archive.org/web/20260823132238/https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt) — BLOCKED: Wayback HTTP 429; original live URL HTTP 406. Web searches returned no results. Primary C128 service manual remains available for these pin records.
- S5: [https://commodore.ca/manuals/128_system_guide/app-c.htm](https://commodore.ca/manuals/128_system_guide/app-c.htm) — Downloaded and inspected.
- S6: [https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf](https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack.pdf) — Downloaded and inspected.
- S7: [https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack_text.pdf](https://archive.org/download/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack/TRS-80_Micro_Computer_Technical_Reference_Handbook_2nd_Edition_1982_Radio_Shack_text.pdf) — Downloaded text-layer version; checked expansion table against original scan, not OCR alone.
- S8: [https://www.trs-80.org/gold-plug-80.html](https://www.trs-80.org/gold-plug-80.html) — Downloaded and inspected.
- S9: [https://archive.org/details/Sams_ComputerFacts_Model_I_1985_Howard_Sams/page/n17](https://archive.org/details/Sams_ComputerFacts_Model_I_1985_Howard_Sams/page/n17) — Item page accessible; fetched actual named PDF through archive metadata and rendered PDF 18. Distinct unloaded adapter readings retained in evidence.
- S10: [https://archive.org/download/Expansion_Interface_Service_Manual_19xx_Radio_Shack/Expansion_Interface_Service_Manual_19xx_Radio_Shack.pdf](https://archive.org/download/Expansion_Interface_Service_Manual_19xx_Radio_Shack/Expansion_Interface_Service_Manual_19xx_Radio_Shack.pdf) — Downloaded and inspected.

## Coverage

| kind | items | confirmed | wrong | unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 201 | 182 | 12 | 7 |
| clock-row | 5 | 3 | 1 | 1 |
| connector-pin | 53 | 53 | 0 | 0 |
| rail | 7 | 4 | 0 | 3 |
| first-ten | 2 | 2 | 0 | 0 |
| TOTAL | 268 | 244 | 13 | 11 |

## Per-item decisions

| i | record | pin or field | decision | source page | evidence |
|---:|---|---|---|---|---|
| 0 | dram4164 | pin 1 (DIN) | WRONG | C128 p.18 (PDF 20); TED PDF 18 | HIGH; prove-it-works; fix-root-causes. Correct name is NC at pin 1, not DIN. The record type/description already call it unused; the name contradicts both those fields and the printed pinout. The additional 41256 A8 comparison is not established by these 4164 sources. |
| 1 | dram4164 | pin 2 (NC) | WRONG | C128 p.18 (PDF 20); TED PDF 18 | HIGH; prove-it-works; fix-root-causes. Correct name is DIN at pin 2, not NC. It is the data input. Together with item 0 this is a swapped pair of names. |
| 2 | dram4164 | pin 3 (/WE) | CONFIRMED | C128 p.18 (PDF 20); TED PDF 18 | Printed diagram identifies pin 3 as /WE. Address pins are inputs; WE and CAS are active-low inputs. C128 diagram resolves the shifted TED description column. |
| 3 | dram4164 | pin 5 (A0) | CONFIRMED | C128 p.18 (PDF 20); TED PDF 18 | Printed diagram identifies pin 5 as A0. Address pins are inputs; WE and CAS are active-low inputs. C128 diagram resolves the shifted TED description column. |
| 4 | dram4164 | pin 7 (A1) | CONFIRMED | C128 p.18 (PDF 20); TED PDF 18 | Printed diagram identifies pin 7 as A1. Address pins are inputs; WE and CAS are active-low inputs. C128 diagram resolves the shifted TED description column. |
| 5 | dram4164 | pin 9 (A7) | CONFIRMED | C128 p.18 (PDF 20); TED PDF 18 | Printed diagram identifies pin 9 as A7. Address pins are inputs; WE and CAS are active-low inputs. C128 diagram resolves the shifted TED description column. |
| 6 | dram4164 | pin 10 (A5) | CONFIRMED | C128 p.18 (PDF 20); TED PDF 18 | Printed diagram identifies pin 10 as A5. Address pins are inputs; WE and CAS are active-low inputs. C128 diagram resolves the shifted TED description column. |
| 7 | dram4164 | pin 11 (A4) | CONFIRMED | C128 p.18 (PDF 20); TED PDF 18 | Printed diagram identifies pin 11 as A4. Address pins are inputs; WE and CAS are active-low inputs. C128 diagram resolves the shifted TED description column. |
| 8 | dram4164 | pin 12 (A3) | CONFIRMED | C128 p.18 (PDF 20); TED PDF 18 | Printed diagram identifies pin 12 as A3. Address pins are inputs; WE and CAS are active-low inputs. C128 diagram resolves the shifted TED description column. |
| 9 | dram4164 | pin 13 (A6) | CONFIRMED | C128 p.18 (PDF 20); TED PDF 18 | Printed diagram identifies pin 13 as A6. Address pins are inputs; WE and CAS are active-low inputs. C128 diagram resolves the shifted TED description column. |
| 10 | dram4164 | pin 15 (/CAS) | CONFIRMED | C128 p.18 (PDF 20); TED PDF 18 | Printed diagram identifies pin 15 as /CAS. Address pins are inputs; WE and CAS are active-low inputs. C128 diagram resolves the shifted TED description column. |
| 11 | cpu8502 | pin 1 (Φ0 in) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 1 as PHI0 IN. Pin description establishes the input function and polarity; AEC low makes the address bus high impedance; reset is held low then released. |
| 12 | cpu8502 | pin 2 (RDY) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 2 as RDY. Pin description establishes the input function and polarity; AEC low makes the address bus high impedance; reset is held low then released. |
| 13 | cpu8502 | pin 3 (/IRQ) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 3 as /IRQ. Pin description establishes the input function and polarity; AEC low makes the address bus high impedance; reset is held low then released. |
| 14 | cpu8502 | pin 4 (/NMI) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 4 as /NMI. Pin description establishes the input function and polarity; AEC low makes the address bus high impedance; reset is held low then released. |
| 15 | cpu8502 | pin 5 (AEC) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 5 as AEC. Pin description establishes the input function and polarity; AEC low makes the address bus high impedance; reset is held low then released. |
| 16 | cpu8502 | pin 7 (A0) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 7 as A0. Unidirectional address output; numbering matches the diagram. |
| 17 | cpu8502 | pin 8 (A1) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 8 as A1. Unidirectional address output; numbering matches the diagram. |
| 18 | cpu8502 | pin 10 (A3) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 10 as A3. Unidirectional address output; numbering matches the diagram. |
| 19 | cpu8502 | pin 11 (A4) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 11 as A4. Unidirectional address output; numbering matches the diagram. |
| 20 | cpu8502 | pin 12 (A5) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 12 as A5. Unidirectional address output; numbering matches the diagram. |
| 21 | cpu8502 | pin 13 (A6) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 13 as A6. Unidirectional address output; numbering matches the diagram. |
| 22 | cpu8502 | pin 15 (A8) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 15 as A8. Unidirectional address output; numbering matches the diagram. |
| 23 | cpu8502 | pin 16 (A9) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 16 as A9. Unidirectional address output; numbering matches the diagram. |
| 24 | cpu8502 | pin 17 (A10) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 17 as A10. Unidirectional address output; numbering matches the diagram. |
| 25 | cpu8502 | pin 20 (A13) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 20 as A13. Unidirectional address output; numbering matches the diagram. |
| 26 | cpu8502 | pin 22 (A14) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 22 as A14. Unidirectional address output; numbering matches the diagram. |
| 27 | cpu8502 | pin 23 (A15) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 23 as A15. Unidirectional address output; numbering matches the diagram. |
| 28 | cpu8502 | pin 24 (P6) | UNVERIFIABLE | C128 p.7 / p.67 (PDF 9 / 72) | Source is silent on the ASCII-DIN key designation. P6 is pin 24, bidirectional; schematic labels the connected signal CAPLK SENSE. That establishes CAPS LOCK sense, not the full regional-key claim. |
| 29 | cpu8502 | pin 25 (P5) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 25 as P5. Port is bidirectional; sheet 310378/2, p.67 (PDF 72), traces P5 motor, P4 sense, P3 write and P2/P1/P0 CHAREN/HIRAM/LORAM. |
| 30 | cpu8502 | pin 26 (P4) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 26 as P4. Port is bidirectional; sheet 310378/2, p.67 (PDF 72), traces P5 motor, P4 sense, P3 write and P2/P1/P0 CHAREN/HIRAM/LORAM. |
| 31 | cpu8502 | pin 27 (P3) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 27 as P3. Port is bidirectional; sheet 310378/2, p.67 (PDF 72), traces P5 motor, P4 sense, P3 write and P2/P1/P0 CHAREN/HIRAM/LORAM. |
| 32 | cpu8502 | pin 28 (P2) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 28 as P2. Port is bidirectional; sheet 310378/2, p.67 (PDF 72), traces P5 motor, P4 sense, P3 write and P2/P1/P0 CHAREN/HIRAM/LORAM. |
| 33 | cpu8502 | pin 29 (P1) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 29 as P1. Port is bidirectional; sheet 310378/2, p.67 (PDF 72), traces P5 motor, P4 sense, P3 write and P2/P1/P0 CHAREN/HIRAM/LORAM. |
| 34 | cpu8502 | pin 30 (P0) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 30 as P0. Port is bidirectional; sheet 310378/2, p.67 (PDF 72), traces P5 motor, P4 sense, P3 write and P2/P1/P0 CHAREN/HIRAM/LORAM. |
| 35 | cpu8502 | pin 32 (D6) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 32 as D6. D0-D7 form the bidirectional data bus. |
| 36 | cpu8502 | pin 33 (D5) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 33 as D5. D0-D7 form the bidirectional data bus. |
| 37 | cpu8502 | pin 34 (D4) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 34 as D4. D0-D7 form the bidirectional data bus. |
| 38 | cpu8502 | pin 35 (D3) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 35 as D3. D0-D7 form the bidirectional data bus. |
| 39 | cpu8502 | pin 36 (D2) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 36 as D2. D0-D7 form the bidirectional data bus. |
| 40 | cpu8502 | pin 37 (D1) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 37 as D1. D0-D7 form the bidirectional data bus. |
| 41 | cpu8502 | pin 39 (R/W) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 39 as R/W. CPU output; high reads and low writes. |
| 42 | cpu8502 | pin 40 (/RES) | CONFIRMED | C128 p.7 (PDF 9) | Printed diagram identifies pin 40 as /RES. Pin description establishes the input function and polarity; AEC low makes the address bus high impedance; reset is held low then released. |
| 43 | vdc8563 | pin 2 (/DCLK) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 2 as /DCLK. Dot clock input; sheet 3, p.68 (PDF 74), shows the separate 16 MHz oscillator Y1. |
| 44 | vdc8563 | pin 3 (HSYNC) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 3 as HSYNC. Pin function and direction agree with the pin description and sheet 3. |
| 45 | vdc8563 | pin 4 (CS) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 4 as CS high. Pin function and direction agree with the pin description and sheet 3. |
| 46 | vdc8563 | pin 5 (NC) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 5 as NC. Pin function and direction agree with the pin description and sheet 3. |
| 47 | vdc8563 | pin 7 (/CS) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 7 as /CS low. Pin function and direction agree with the pin description and sheet 3. |
| 48 | vdc8563 | pin 8 (/RS) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 8 as RS. High accesses the selected data register; low reads status or writes its address. |
| 49 | vdc8563 | pin 10 (D7) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 10 as D7. CPU data bus explicitly bidirectional. |
| 50 | vdc8563 | pin 11 (D6) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 11 as D6. CPU data bus explicitly bidirectional. |
| 51 | vdc8563 | pin 14 (D4) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 14 as D4. CPU data bus explicitly bidirectional. |
| 52 | vdc8563 | pin 15 (D3) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 15 as D3. CPU data bus explicitly bidirectional. |
| 53 | vdc8563 | pin 16 (D2) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 16 as D2. CPU data bus explicitly bidirectional. |
| 54 | vdc8563 | pin 17 (D1) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 17 as D1. CPU data bus explicitly bidirectional. |
| 55 | vdc8563 | pin 18 (D0) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 18 as D0. CPU data bus explicitly bidirectional. |
| 56 | vdc8563 | pin 19 (DISPEN) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 19 as DISPEN. Pin function and direction agree with the pin description and sheet 3. |
| 57 | vdc8563 | pin 20 (VSYNC) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 20 as VSYNC. Pin function and direction agree with the pin description and sheet 3. |
| 58 | vdc8563 | pin 22 (INIT) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 22 as INIT low. Active-low input clears internal control latches. |
| 59 | vdc8563 | pin 23 (/RES) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 23 as /RES. Reset initializes scan counters, not control registers; power-up reset net is traced on sheet 3. |
| 60 | vdc8563 | pin 25 (LPEN) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 25 as LPEN. Pin function and direction agree with the pin description and sheet 3. |
| 61 | vdc8563 | pin 26 (DA0) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 26 as DA0. Local display DRAM address output; DD is a separate bidirectional data bus. |
| 62 | vdc8563 | pin 27 (DA1) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 27 as DA1. Local display DRAM address output; DD is a separate bidirectional data bus. |
| 63 | vdc8563 | pin 28 (DA2) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 28 as DA2. Local display DRAM address output; DD is a separate bidirectional data bus. |
| 64 | vdc8563 | pin 29 (DA3) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 29 as DA3. Local display DRAM address output; DD is a separate bidirectional data bus. |
| 65 | vdc8563 | pin 30 (DA4) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 30 as DA4. Local display DRAM address output; DD is a separate bidirectional data bus. |
| 66 | vdc8563 | pin 32 (DA6) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 32 as DA6. Local display DRAM address output; DD is a separate bidirectional data bus. |
| 67 | vdc8563 | pin 33 (DA7) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 33 as DA7. Local display DRAM address output; DD is a separate bidirectional data bus. |
| 68 | vdc8563 | pin 34 (DD0) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 34 as DD0. Local DRAM data bus is explicitly bidirectional. |
| 69 | vdc8563 | pin 35 (DD1) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 35 as DD1. Local DRAM data bus is explicitly bidirectional. |
| 70 | vdc8563 | pin 36 (DD2) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 36 as DD2. Local DRAM data bus is explicitly bidirectional. |
| 71 | vdc8563 | pin 38 (DD3) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 38 as DD3. Local DRAM data bus is explicitly bidirectional. |
| 72 | vdc8563 | pin 39 (DD4) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 39 as DD4. Local DRAM data bus is explicitly bidirectional. |
| 73 | vdc8563 | pin 40 (DD5) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 40 as DD5. Local DRAM data bus is explicitly bidirectional. |
| 74 | vdc8563 | pin 41 (DD6) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 41 as DD6. Local DRAM data bus is explicitly bidirectional. |
| 75 | vdc8563 | pin 42 (DD7) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 42 as DD7. Local DRAM data bus is explicitly bidirectional. |
| 76 | vdc8563 | pin 43 (I) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 43 as I. Pixel output; RGBI connector mapping is also printed on p.32 (PDF 34) and traced on sheet 3, p.68 (PDF 74). |
| 77 | vdc8563 | pin 44 (B) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 44 as B. Pixel output; RGBI connector mapping is also printed on p.32 (PDF 34) and traced on sheet 3, p.68 (PDF 74). |
| 78 | vdc8563 | pin 45 (G) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 45 as G. Pixel output; RGBI connector mapping is also printed on p.32 (PDF 34) and traced on sheet 3, p.68 (PDF 74). |
| 79 | vdc8563 | pin 46 (R) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 46 as R. Pixel output; RGBI connector mapping is also printed on p.32 (PDF 34) and traced on sheet 3, p.68 (PDF 74). |
| 80 | vdc8563 | pin 47 (/RAS) | CONFIRMED | C128 p.38 (PDF 40) | Printed diagram identifies pin 47 as /RAS. Pin function and direction agree with the pin description and sheet 3. |
| 81 | vic2e | pin 1 (DB6) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 1 as DB6. Bus/video/control function agrees with the printed description. |
| 82 | vic2e | pin 2 (DB5) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 2 as DB5. Bus/video/control function agrees with the printed description. |
| 83 | vic2e | pin 3 (DB4) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 3 as DB4. Bus/video/control function agrees with the printed description. |
| 84 | vic2e | pin 4 (DB3) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 4 as DB3. Bus/video/control function agrees with the printed description. |
| 85 | vic2e | pin 5 (DB2) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 5 as DB2. Bus/video/control function agrees with the printed description. |
| 86 | vic2e | pin 6 (DB1) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 6 as DB1. Bus/video/control function agrees with the printed description. |
| 87 | vic2e | pin 7 (DB0) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 7 as DB0. Bus/video/control function agrees with the printed description. |
| 88 | vic2e | pin 8 (/IRQ) | UNVERIFIABLE | C128 p.35 (PDF 37) | Source establishes active-low IRQ output at pin 8 but is silent on the claimed open-drain output technology. A shared schematic net does not establish its transistor implementation. |
| 89 | vic2e | pin 9 (LP) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 9 as LP. Bus/video/control function agrees with the printed description. |
| 90 | vic2e | pin 10 (BA) | UNVERIFIABLE | C128 pp.34-35,67 (PDF 36-37,72) | Source establishes BA at pin 10, DMA/bus-availability output, and its gated route to RDY, but is silent on the specific badline timing asserted here. |
| 91 | vic2e | pin 11 (/DMARQST) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 11 as /DMARQST. External DMA request input is pulled high on C128. |
| 92 | vic2e | pin 12 (AEC) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 12 as AEC. AEC output low during VIC cycles or DMA, high for the processor. |
| 93 | vic2e | pin 13 (/CS) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 13 as /CS. Active-low chip-select input; sheet 2 traces the PLA VIC select. |
| 94 | vic2e | pin 14 (R/W) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 14 as R/W. Bus/video/control function agrees with the printed description. |
| 95 | vic2e | pin 15 (/DMAACK) | WRONG | C128 pp.34-35 (PDF 36-37) | HIGH; prove-it-works; fix-root-causes. Correct direction is OUT: VIC responds to an external DMA request with DMAACK. It is unused on C128. Record marks pin 15 IN. |
| 96 | vic2e | pin 17 (SYNC) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 17 as SYNC. Bus/video/control function agrees with the printed description. |
| 97 | vic2e | pin 18 (1MHz) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 18 as 1MHz. System clock output at approximately 1 MHz. |
| 98 | vic2e | pin 20 (/CAS) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 20 as /CAS. Bus/video/control function agrees with the printed description. |
| 99 | vic2e | pin 22 (/I/O ACC) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 22 as /I/O ACC. Bus/video/control function agrees with the printed description. |
| 100 | vic2e | pin 23 (2MHz) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 23 as 2MHz. Changes between 1 and 2 MHz depending on VIC/DMA/I/O cycles; probe expectation must be read with that stated condition. |
| 101 | vic2e | pin 25 (Z80) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 25 as Z80 PHI. Special 4 MHz Z80 clock; p.34 describes bursts in the low half of the 1 MHz clock. |
| 102 | vic2e | pin 26 (K0) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 26 as K0. Extended keyboard strobe output. |
| 103 | vic2e | pin 27 (K1) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 27 as K1. Extended keyboard strobe output. |
| 104 | vic2e | pin 28 (K2) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 28 as K2. Extended keyboard strobe output. |
| 105 | vic2e | pin 30 (PH IN) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 30 as PH IN. Dot/shift-rate clock input, reference for system clocks. |
| 106 | vic2e | pin 34 (A2) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 34 as A2/A10. Row A2-A5, column A10-A13; these pins serve as CPU address inputs latched on the falling RAS edge. |
| 107 | vic2e | pin 35 (A3) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 35 as A3/A11. Row A2-A5, column A10-A13; these pins serve as CPU address inputs latched on the falling RAS edge. |
| 108 | vic2e | pin 36 (A4) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 36 as A4/A12. Row A2-A5, column A10-A13; these pins serve as CPU address inputs latched on the falling RAS edge. |
| 109 | vic2e | pin 37 (A5) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 37 as A5/A13. Row A2-A5, column A10-A13; these pins serve as CPU address inputs latched on the falling RAS edge. |
| 110 | vic2e | pin 38 (A6) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 38 as A6. VIC address output; sheet 3 traces these address lines into the memory-address path. |
| 111 | vic2e | pin 39 (A7) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 39 as A7. VIC address output; sheet 3 traces these address lines into the memory-address path. |
| 112 | vic2e | pin 40 (A8) | WRONG | C128 p.35 (PDF 37); sheet 3 p.68 (PDF 74) | MEDIUM; prove-it-works; fix-root-causes. Pin 40 (A8) is a static address output used for nonmultiplexed character-ROM/color-RAM accesses. It is not the claimed DRAM address path; multiplexed DRAM row/column addressing uses A0-A5 (pins 32-37). |
| 113 | vic2e | pin 41 (A9) | WRONG | C128 p.35 (PDF 37); sheet 3 p.68 (PDF 74) | MEDIUM; prove-it-works; fix-root-causes. Pin 41 (A9) is a static address output used for nonmultiplexed character-ROM/color-RAM accesses. It is not the claimed DRAM address path; multiplexed DRAM row/column addressing uses A0-A5 (pins 32-37). |
| 114 | vic2e | pin 42 (A10) | WRONG | C128 p.35 (PDF 37); sheet 3 p.68 (PDF 74) | MEDIUM; prove-it-works; fix-root-causes. Pin 42 (A10) is a static address output used for nonmultiplexed character-ROM/color-RAM accesses. It is not the claimed DRAM address path; multiplexed DRAM row/column addressing uses A0-A5 (pins 32-37). |
| 115 | vic2e | pin 43 (DB11) | UNVERIFIABLE | C128 p.35 (PDF 37) | Source establishes DB11 at pin 43 and communication with color RAM, but is silent on whether these extended data pins are bidirectional. Do not inherit the explicit DB0-DB7 direction statement for DB8-DB11. |
| 116 | vic2e | pin 44 (DB10) | UNVERIFIABLE | C128 p.35 (PDF 37) | Source establishes DB10 at pin 44 and communication with color RAM, but is silent on whether these extended data pins are bidirectional. Do not inherit the explicit DB0-DB7 direction statement for DB8-DB11. |
| 117 | vic2e | pin 45 (DB9) | UNVERIFIABLE | C128 p.35 (PDF 37) | Source establishes DB9 at pin 45 and communication with color RAM, but is silent on whether these extended data pins are bidirectional. Do not inherit the explicit DB0-DB7 direction statement for DB8-DB11. |
| 118 | vic2e | pin 46 (DB8) | UNVERIFIABLE | C128 p.35 (PDF 37) | Source establishes DB8 at pin 46 and communication with color RAM, but is silent on whether these extended data pins are bidirectional. Do not inherit the explicit DB0-DB7 direction statement for DB8-DB11. |
| 119 | vic2e | pin 47 (DB7) | CONFIRMED | C128 p.35 (PDF 37) | Printed diagram identifies pin 47 as DB7. Bus/video/control function agrees with the printed description. |
| 120 | mmu8722 | pin 2 (/RESET) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 2 as /RESET. CPU/control input function agrees with description and schematic. |
| 121 | mmu8722 | pin 3 (TA15) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 3 as TA15. Translated-address output, tri-stated during VIC access as described. |
| 122 | mmu8722 | pin 4 (TA14) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 4 as TA14. Translated-address output, tri-stated during VIC access as described. |
| 123 | mmu8722 | pin 6 (TA12) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 6 as TA12. Translated-address output, tri-stated during VIC access as described. |
| 124 | mmu8722 | pin 7 (TA11) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 7 as TA11. Translated-address output, tri-stated during VIC access as described. |
| 125 | mmu8722 | pin 9 (TA9) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 9 as TA9. Translated-address output, tri-stated during VIC access as described. |
| 126 | mmu8722 | pin 10 (TA8) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 10 as TA8. Translated-address output, tri-stated during VIC access as described. |
| 127 | mmu8722 | pin 11 (/CAS1) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 11 as /CAS1. CAS0 enables the first 64K bank; CAS1 enables the second. |
| 128 | mmu8722 | pin 12 (/CAS0) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 12 as /CAS0. CAS0 enables the first 64K bank; CAS1 enables the second. |
| 129 | mmu8722 | pin 13 (I/O SEL) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 13 as I/O SEL (MS2). CPU/control input function agrees with description and schematic. |
| 130 | mmu8722 | pin 14 (MS1) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 14 as MS1. Diagram and schematic use MS1 at 14 and MS0 at 15; prose heading lists MS0/MS1 in the opposite order. Record follows the diagram. |
| 131 | mmu8722 | pin 15 (MS0) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 15 as MS0. Diagram and schematic use MS1 at 14 and MS0 at 15; prose heading lists MS0/MS1 in the opposite order. Record follows the diagram. |
| 132 | mmu8722 | pin 16 (AEC) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 16 as AEC. CPU/control input function agrees with description and schematic. |
| 133 | mmu8722 | pin 17 (MUX) | WRONG | C128 p.27 / p.35 / p.67 (PDF 29 / 37 / 72) | HIGH; prove-it-works; fix-root-causes. Correct direction is IN. VIC pin 21 generates MUX; the same net enters MMU pin 17 and clocks MMU sections. Record calls MMU pin 17 an output and signal generator. |
| 134 | mmu8722 | pin 18 (A0) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 18 as A0. CPU/control input function agrees with description and schematic. |
| 135 | mmu8722 | pin 19 (A1) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 19 as A1. CPU/control input function agrees with description and schematic. |
| 136 | mmu8722 | pin 20 (A2) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 20 as A2. CPU/control input function agrees with description and schematic. |
| 137 | mmu8722 | pin 21 (A3) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 21 as A3. CPU/control input function agrees with description and schematic. |
| 138 | mmu8722 | pin 22 (A4/5) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 22 as A4/5. Combined CPU address pairs reduce pin count; matches A4/5 and A6/7. |
| 139 | mmu8722 | pin 23 (A6/7) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 23 as A6/7. Combined CPU address pairs reduce pin count; matches A4/5 and A6/7. |
| 140 | mmu8722 | pin 24 (A8) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 24 as A8. CPU/control input function agrees with description and schematic. |
| 141 | mmu8722 | pin 25 (A9) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 25 as A9. CPU/control input function agrees with description and schematic. |
| 142 | mmu8722 | pin 26 (A10) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 26 as A10. CPU/control input function agrees with description and schematic. |
| 143 | mmu8722 | pin 27 (A11) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 27 as A11. CPU/control input function agrees with description and schematic. |
| 144 | mmu8722 | pin 28 (A12) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 28 as A12. CPU/control input function agrees with description and schematic. |
| 145 | mmu8722 | pin 30 (A14) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 30 as A14. CPU/control input function agrees with description and schematic. |
| 146 | mmu8722 | pin 31 (A15) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 31 as A15. CPU/control input function agrees with description and schematic. |
| 147 | mmu8722 | pin 32 (R/W) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 32 as R/W. CPU/control input function agrees with description and schematic. |
| 148 | mmu8722 | pin 33 (PHI0) | WRONG | C128 pp.7,27,35,67 (PDF 9,29,37,72) | MEDIUM; prove-it-works; fix-root-causes. PHI0 pin 33 is a presystem-clock input, sourced from the VIC clock path. The 8502 pin 1 is itself a clock input. Correct description: clock input from VIC/system clock, not from CPU. |
| 149 | mmu8722 | pin 35 (D0) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 35 as D0. System data bus connects to the CPU bus on sheet 2; MMU register reads/writes establish both transfer directions (register section pp.21-26). |
| 150 | mmu8722 | pin 36 (D1) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 36 as D1. System data bus connects to the CPU bus on sheet 2; MMU register reads/writes establish both transfer directions (register section pp.21-26). |
| 151 | mmu8722 | pin 37 (D2) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 37 as D2. System data bus connects to the CPU bus on sheet 2; MMU register reads/writes establish both transfer directions (register section pp.21-26). |
| 152 | mmu8722 | pin 38 (D3) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 38 as D3. System data bus connects to the CPU bus on sheet 2; MMU register reads/writes establish both transfer directions (register section pp.21-26). |
| 153 | mmu8722 | pin 39 (D4) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 39 as D4. System data bus connects to the CPU bus on sheet 2; MMU register reads/writes establish both transfer directions (register section pp.21-26). |
| 154 | mmu8722 | pin 40 (D5) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 40 as D5. System data bus connects to the CPU bus on sheet 2; MMU register reads/writes establish both transfer directions (register section pp.21-26). |
| 155 | mmu8722 | pin 41 (D6) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 41 as D6. System data bus connects to the CPU bus on sheet 2; MMU register reads/writes establish both transfer directions (register section pp.21-26). |
| 156 | mmu8722 | pin 42 (D7) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 42 as D7. System data bus connects to the CPU bus on sheet 2; MMU register reads/writes establish both transfer directions (register section pp.21-26). |
| 157 | mmu8722 | pin 44 (FSDIR) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 44 as FSDIR. Explicitly bidirectional fast-serial direction port. |
| 158 | mmu8722 | pin 45 (/GAME) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 45 as /GAME. C64 mode senses cartridge signal; C128 mode uses GAME for color-RAM banking and EXROM for expansion control. |
| 159 | mmu8722 | pin 46 (/EXROM) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 46 as /EXROM. C64 mode senses cartridge signal; C128 mode uses GAME for color-RAM banking and EXROM for expansion control. |
| 160 | mmu8722 | pin 47 (128/64) | CONFIRMED | C128 p.27 (PDF 29) | Printed diagram identifies pin 47 as 128/64. Output low in C64 mode, high in C128 mode. |
| 161 | pla8721 | pin 1 (A15) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 1 as A15. Input/output function matches the printed pin description. |
| 162 | pla8721 | pin 2 (A14) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 2 as A14. Input/output function matches the printed pin description. |
| 163 | pla8721 | pin 3 (A13) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 3 as A13. Input/output function matches the printed pin description. |
| 164 | pla8721 | pin 4 (A12) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 4 as A12. Input/output function matches the printed pin description. |
| 165 | pla8721 | pin 5 (A11) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 5 as A11. Input/output function matches the printed pin description. |
| 166 | pla8721 | pin 6 (A10) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 6 as A10. Input/output function matches the printed pin description. |
| 167 | pla8721 | pin 7 (VICFIX) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 7 as VICFIX. Input/output function matches the printed pin description. |
| 168 | pla8721 | pin 8 (DMAACK) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 8 as DMAACK. Input/output function matches the printed pin description. |
| 169 | pla8721 | pin 9 (AEC) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 9 as AEC. Input/output function matches the printed pin description. |
| 170 | pla8721 | pin 11 (GAME) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 11 as GAME. Input/output function matches the printed pin description. |
| 171 | pla8721 | pin 12 (EXROM) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 12 as EXROM. Input/output function matches the printed pin description. |
| 172 | pla8721 | pin 13 (Z80 EN) | WRONG | C128 p.29 / p.67 (PDF 31 / 72) | MEDIUM; prove-it-works; fix-root-causes. Pin 13 is labelled Z80 EN on the PLA diagram but receives Z80 BUSACK, indicating that the Z80 relinquishes the bus. Describing this PLA input as Z80 enable misstates its function; the MMU has the separate actual Z80EN output at pin 43. |
| 173 | pla8721 | pin 14 (Z80 I/O) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 14 as Z80 I/O. Input/output function matches the printed pin description. |
| 174 | pla8721 | pin 15 (64/128) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 15 as 64/128. Input/output function matches the printed pin description. |
| 175 | pla8721 | pin 16 (I/O SE) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 16 as I/O SE. Input/output function matches the printed pin description. |
| 176 | pla8721 | pin 17 (ROMBNKHI) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 17 as ROMBNKHI. Pin diagram and sheet 2 show HI at 17, LO at 18; prose order is inconsistent. |
| 177 | pla8721 | pin 18 (ROMBNKLO) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 18 as ROMBNKLO. Pin diagram and sheet 2 show HI at 17, LO at 18; prose order is inconsistent. |
| 178 | pla8721 | pin 21 (BA) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 21 as BA. Input/output function matches the printed pin description. |
| 179 | pla8721 | pin 22 (LORAM) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 22 as LORAM. Input/output function matches the printed pin description. |
| 180 | pla8721 | pin 23 (HIRAM) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 23 as HIRAM. Input/output function matches the printed pin description. |
| 181 | pla8721 | pin 25 (CHAREN) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 25 as CHAREN. Input/output function matches the printed pin description. |
| 182 | pla8721 | pin 26 (VA14) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 26 as VA14. Address input from the 6526 selecting video bank in C64 mode. |
| 183 | pla8721 | pin 27 (128/256) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 27 as 128/256 ROM size. Selects 128K versus 256K ROM parts, high versus low. This is ROM organization, not installed system RAM. |
| 184 | pla8721 | pin 28 (N/C) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 28 as NC. Input/output function matches the printed pin description. |
| 185 | pla8721 | pin 29 (/SDEN) | WRONG | C128 p.29 (PDF 31) | MEDIUM; prove-it-works; fix-root-causes. SDEN enables the buffer between the data bus and S DATA bus. Correct description: S-data buffer enable. The cited source gives no sprite-enable function. |
| 186 | pla8721 | pin 30 (/ROML) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 30 as /ROML. Active-low ROM selection output. |
| 187 | pla8721 | pin 31 (/ROMH) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 31 as /ROMH. Active-low ROM selection output. |
| 188 | pla8721 | pin 33 (/FROM) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 33 as /FROM. Active-low ROM selection output. |
| 189 | pla8721 | pin 34 (/ROM4) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 34 as /ROM4. Active-low ROM selection output. |
| 190 | pla8721 | pin 35 (/ROM3) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 35 as /ROM3. Active-low ROM selection output. |
| 191 | pla8721 | pin 36 (/ROM2) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 36 as /ROM2. Active-low ROM selection output. |
| 192 | pla8721 | pin 37 (/ROM1) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 37 as /ROM1. Active-low ROM selection output. |
| 193 | pla8721 | pin 38 (/IOCS) | WRONG | C128 p.29 (PDF 31) | MEDIUM; prove-it-works; fix-root-causes. IOCS pin 38 enables the external decoder for CIA1/2, I/O1/2, SID and 8563 VDC. VIC is selected separately by PLA pin 42. Correct the inclusion of VIC in this list. |
| 194 | pla8721 | pin 39 (DIR) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 39 as DIR. Controls direction of the data-to-S-data buffer. |
| 195 | pla8721 | pin 41 (CASENB) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 41 as CASENB. CAS enable output gates MMU CAS signals and is latched using MUX. |
| 196 | pla8721 | pin 42 (/VIC) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 42 as /VIC. Input/output function matches the printed pin description. |
| 197 | pla8721 | pin 43 (/IOACC) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 43 as /IOACC. Input/output function matches the printed pin description. |
| 198 | pla8721 | pin 44 (GWE) | WRONG | C128 p.29 (PDF 31) | MEDIUM; prove-it-works; fix-root-causes. GWE pin 44 is an active-low write enable for COLOR RAM. It is not a global memory-write enable; pin 40 DWE handles DRAM writes. Preserve active-low polarity in the description/name. |
| 199 | pla8721 | pin 45 (/COLRAM) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 45 as /COLRAM. Input/output function matches the printed pin description. |
| 200 | pla8721 | pin 47 (CLK) | CONFIRMED | C128 p.29 (PDF 31) | Printed diagram identifies pin 47 as CLK. Input/output function matches the printed pin description. |
| 201 | c128 | 1 MHz clock to the I/O chips | UNVERIFIABLE | C128 p.6 / p.38 / p.56 (PDF 8 / 40 / 58) | Source establishes a nominal 1 MHz I/O clock (SID pin 6; CIA pin 25), but the cited discussion is silent on the exact NTSC 1.02 MHz figure. The 8701 section specifies the dot clock but the inspected material does not document the divider necessary to prove this exact I/O value. |
| 202 | c128-power | pin 1 (+5 V DC) | CONFIRMED | C128 schematic 310378/2 p.67 (PDF 72); System Guide Appendix C.1 | CN11 pin 1 is +5IN; SW1 switches that supply to the board. System Guide explicitly identifies the five-pin square power plug. |
| 203 | c128-power | pin 2 (SHIELD) | CONFIRMED | C128 schematic 310378/2 p.67 (PDF 72); System Guide Appendix C.1 | CN11 pin 2 is SHLD and tied to chassis/shield ground. System Guide explicitly identifies the five-pin square power plug. |
| 204 | c128-power | pin 3 (9 V AC) | CONFIRMED | C128 schematic 310378/2 p.67 (PDF 72); System Guide Appendix C.1 | CN11 pin 3 is 9VAC1IN and passes through L5; AC is measured across the winding legs. System Guide explicitly identifies the five-pin square power plug. |
| 205 | c128-power | pin 4 (GND) | CONFIRMED | C128 schematic 310378/2 p.67 (PDF 72); System Guide Appendix C.1 | CN11 pin 4 is SIG GND. System Guide explicitly identifies the five-pin square power plug. |
| 206 | c128 | +5 V | UNVERIFIABLE | C128 pp.7,67 (PDF 9,72); System Guide Appendix C.1 | Source is silent on the exact 4.95-5.10 V acceptance band. Nominal +5 V at 8502 pin 6 and CN11 pin 1, via SW1, is supported. The schematic calls CN11 a five-pin DIN while System Guide describes a square plug; retain the square physical description and do not infer a tolerance from the nominal voltage. |
| 207 | c128 | +5 V (VDC) | UNVERIFIABLE | C128 p.38 / p.68 (PDF 40 / 74) | +5 V at VDC pin 37 is confirmed. Source is silent on the diagnostic conclusion that an absent 80-column display with this voltage points at the VDC; its schematic also contains local DRAM, clock and output-buffer dependencies. |
| 208 | c128 | +12 V | CONFIRMED | C128 p.38 / p.67 / p.83 (PDF 40 / 72 / 96) | 6581 pin 28 is 12 V; U59 is the 7812 deriving the rail from rectified AC. Later 252451/2 sheet shows the 6581/8580 option and CR17 voltage-drop provision. The 9 V qualification applies to the named 8580 variant, not every machine called C128D. |
| 209 | c128 | 9 V AC | CONFIRMED | C128 sheet 2 p.67 (PDF 72); System Guide Appendix C.2.6 | CN11 pins 3 and 5 are the two AC winding inputs; AC outputs feed user-port pins 10 and 11, rectifier CR13, unregulated rail and the 12 V regulator path. Measure AC between the two winding legs. |
| 210 | model1 | Crystal Y1 (master oscillator) | CONFIRMED | TRS p.14 (PDF 15) | Y1 is 10.6445 MHz. Z42 pin 6 is the buffered oscillator output explicitly approved as a clock measurement point; pin 5 is specifically discouraged. |
| 211 | model1 | CPU clock (÷6, Z56) | CONFIRMED | TRS p.14 (PDF 15) | Z56 divides master clock by six, approximately 1.774 MHz, then buffer Z72 drives Z80 pin 6. |
| 212 | model1 | Horizontal reference (HDRV) | WRONG | TRS p.69 Figure 18 (PDF 70) | LOW; prove-it-works. Correct quoted table value is 15.835 kHz at Z50 pin 11, not 15.836 kHz. Table uses a 10.641099 MHz reference (0.03% slow); nominal-crystal calculations must be labelled separately. This small difference is not evidence of hardware failure. |
| 213 | model1 | Vertical reference (VDRV) | CONFIRMED | TRS p.69 Figure 18 (PDF 70) | VDRV vertical reference is 60.00 Hz at Z32 pin 11 in the source table. |
| 214 | model1-exp | pin 1 (RAS*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 1 to RAS*, viewed from rear of keyboard assembly, odd/even edge numbering. Output controls the row/column access or multiplexer for 16-pin dynamic RAM. |
| 215 | model1-exp | pin 3 (CAS*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 3 to CAS*, viewed from rear of keyboard assembly, odd/even edge numbering. Output controls the row/column access or multiplexer for 16-pin dynamic RAM. |
| 216 | model1-exp | pin 4 (A10) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 4 to A10, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 217 | model1-exp | pin 5 (A12) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 5 to A12, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 218 | model1-exp | pin 6 (A13) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 6 to A13, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 219 | model1-exp | pin 8 (GND) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 8 to GND, viewed from rear of keyboard assembly, odd/even edge numbering. Signal ground is the voltage reference. |
| 220 | model1-exp | pin 9 (A11) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 9 to A11, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 221 | model1-exp | pin 10 (A14) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 10 to A14, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 222 | model1-exp | pin 11 (A8) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 11 to A8, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 223 | model1-exp | pin 12 (OUT*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 12 to OUT*, viewed from rear of keyboard assembly, odd/even edge numbering. Source distinguishes memory strobes from peripheral-port strobes, with active-low polarity. |
| 224 | model1-exp | pin 13 (WR*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 13 to WR*, viewed from rear of keyboard assembly, odd/even edge numbering. Source distinguishes memory strobes from peripheral-port strobes, with active-low polarity. |
| 225 | model1-exp | pin 14 (INTAK*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 14 to INTAK*, viewed from rear of keyboard assembly, odd/even edge numbering. Goes low when the CPU enters an interrupt mode. |
| 226 | model1-exp | pin 15 (RD*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 15 to RD*, viewed from rear of keyboard assembly, odd/even edge numbering. Source distinguishes memory strobes from peripheral-port strobes, with active-low polarity. |
| 227 | model1-exp | pin 16 (MUX) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 16 to MUX, viewed from rear of keyboard assembly, odd/even edge numbering. Output controls the row/column access or multiplexer for 16-pin dynamic RAM. |
| 228 | model1-exp | pin 17 (A9) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 17 to A9, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 229 | model1-exp | pin 18 (D4) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 18 to D4, viewed from rear of keyboard assembly, odd/even edge numbering. Data bus is bidirectional; source calls for tri-state buffers. |
| 230 | model1-exp | pin 19 (IN*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 19 to IN*, viewed from rear of keyboard assembly, odd/even edge numbering. Source distinguishes memory strobes from peripheral-port strobes, with active-low polarity. |
| 231 | model1-exp | pin 20 (D7) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 20 to D7, viewed from rear of keyboard assembly, odd/even edge numbering. Data bus is bidirectional; source calls for tri-state buffers. |
| 232 | model1-exp | pin 21 (INT*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93); EI manual p.5 | Figure 22 assigns pin 21 to INT*, viewed from rear of keyboard assembly, odd/even edge numbering. Maskable interrupt; explanation gives address 0038 hex in the supported interrupt mode. Expansion Interface manual p.5 documents RTC and FDC interrupt sources. |
| 233 | model1-exp | pin 22 (D1) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 22 to D1, viewed from rear of keyboard assembly, odd/even edge numbering. Data bus is bidirectional; source calls for tri-state buffers. |
| 234 | model1-exp | pin 23 (TEST*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 23 to TEST*, viewed from rear of keyboard assembly, odd/even edge numbering. Low tri-states the listed address, data and control buffers. Factory testing is the normal use; source also permits some troubleshooting use. |
| 235 | model1-exp | pin 24 (D6) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 24 to D6, viewed from rear of keyboard assembly, odd/even edge numbering. Data bus is bidirectional; source calls for tri-state buffers. |
| 236 | model1-exp | pin 25 (A0) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 25 to A0, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 237 | model1-exp | pin 26 (D3) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 26 to D3, viewed from rear of keyboard assembly, odd/even edge numbering. Data bus is bidirectional; source calls for tri-state buffers. |
| 238 | model1-exp | pin 27 (A1) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 27 to A1, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 239 | model1-exp | pin 28 (D5) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 28 to D5, viewed from rear of keyboard assembly, odd/even edge numbering. Data bus is bidirectional; source calls for tri-state buffers. |
| 240 | model1-exp | pin 29 (GND) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 29 to GND, viewed from rear of keyboard assembly, odd/even edge numbering. Signal ground is the voltage reference. |
| 241 | model1-exp | pin 30 (D0) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 30 to D0, viewed from rear of keyboard assembly, odd/even edge numbering. Data bus is bidirectional; source calls for tri-state buffers. |
| 242 | model1-exp | pin 31 (A4) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 31 to A4, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 243 | model1-exp | pin 32 (D2) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 32 to D2, viewed from rear of keyboard assembly, odd/even edge numbering. Data bus is bidirectional; source calls for tri-state buffers. |
| 244 | model1-exp | pin 33 (WAIT*) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 33 to WAIT*, viewed from rear of keyboard assembly, odd/even edge numbering. Input pauses CPU while low for slow memory/peripheral response. |
| 245 | model1-exp | pin 34 (A3) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 34 to A3, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 246 | model1-exp | pin 35 (A5) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 35 to A5, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 247 | model1-exp | pin 36 (A7) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 36 to A7, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 248 | model1-exp | pin 37 (GND) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 37 to GND, viewed from rear of keyboard assembly, odd/even edge numbering. Signal ground is the voltage reference. |
| 249 | model1-exp | pin 38 (A6) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 38 to A6, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 250 | model1-exp | pin 40 (A2) | CONFIRMED | TRS pp.90-92 Figure 22 (PDF 91-93) | Figure 22 assigns pin 40 to A2, viewed from rear of keyboard assembly, odd/even edge numbering. Explanation states address outputs each drive one TTL load. |
| 251 | model1-cassette | pin 3 (REM) | CONFIRMED | TRS pp.45,115 (PDF 46,115) | J3 pins 1 and 3 are K1 relay contacts; closing them runs motor. CR9/CR10 suppress contact spikes; motor off leaves contacts open. |
| 252 | model1-cassette | pin 4 (CASSIN) | CONFIRMED | TRS pp.48,115 (PDF 49,115) | J3 pin 4 is CASSIN, feeding Z4 LM3900 input filter/rectifier/level detector. EAR is the recorder playback output feeding this AC signal. |
| 253 | model1-cassette | pin 5 (CASSOUT) | CONFIRMED | TRS pp.46-47,115 (PDF 47-48,115) | J3 pin 5 feeds recorder AUX. Z59 and R53-R56 form stepped audio; Figure 10 explicitly shows 0, 0.46 and 0.85 V levels. |
| 254 | model1-video | pin 1 (+5 V) | CONFIRMED | TRS pp.54,60,115 (PDF 55,61,115) | J2 pin 1 connects to +5 V/Q2 emitter; supply tolerance is 5 V plus/minus 5%, giving 4.75-5.25 V. |
| 255 | model1-video | pin 2 (NC) | CONFIRMED | TRS p.115 sheet 2 (PDF 115) | J2 front-view connector leaves pin 2 unwired. |
| 256 | model1-video | pin 3 (NC) | CONFIRMED | TRS p.115 sheet 2 (PDF 115) | J2 front-view connector leaves pin 3 unwired. |
| 257 | model1-video | pin 4 (VIDEO) | CONFIRMED | TRS pp.42-43,115 (PDF 43-44,115) | J2 pin 4 is Q1 MPS3904 emitter output. Description specifies driving a 75-ohm path; Figure 9B shows 0 V sync tip and 1.8 V white level. |
| 258 | model1-video | pin 5 (GND) | CONFIRMED | TRS p.115 sheet 2 (PDF 115) | J2 pin 5 is grounded. |
| 259 | model1-power | pin 1 (14 V AC) | CONFIRMED | TRS pp.52,54,115 (PDF 53,55,115); Sams PDF 18 | Adapter winding rated 14 VAC, 1 A; J1 pins 1 and 3 feed CR8. Handbook p.54 gives about 17 VAC in operation. Sams gives a separate 18.5 VAC check with adapter disconnected; do not interchange load states. |
| 260 | model1-power | pin 2 (+19.8 V DC) | CONFIRMED | TRS pp.52,115 (PDF 53,115); Sams PDF 18 | Adapter second winding is rectified internally, rated 19.8 VDC about 350 mA, enters J1 pin 2 with return pin 4. Handbook describes approximately 20 V after filtering; Sams disconnected-adapter test instead specifies 23.6 V. |
| 261 | model1-power | pin 3 (14 V AC) | CONFIRMED | TRS pp.52,54,115 (PDF 53,55,115); Sams PDF 18 | J1 pin 3 is the opposite end of the 14 VAC winding from pin 1. Handbook gives about 17 VAC between 1 and 3 in operation; Sams disconnected check is 18.5 VAC. |
| 262 | model1-power | pin 4 (GND) | CONFIRMED | TRS pp.52,115 (PDF 53,115) | J1 pin 4 is the common center-tap/DC return grounded in the schematic. |
| 263 | model1 | step 3 | CONFIRMED | TRS pp.52,54,60,113,115 (PDF 53,55,61,114,115) | Measure top/edge end of R18; 12 V plus/minus 5% is 11.4-12.6 V; adjust R10 first. RAM pin 8 joins +12 V. Q6/Z2 supply that rail and the Z1 control/reference supply, so +5 regulation requires +12. |
| 264 | model1 | step 4 | CONFIRMED | TRS pp.54,60,113,115 (PDF 55,61,114,115) | Z80 supply is pin 11; left R4 is the +5 test point. 5 V plus/minus 5% gives 4.75-5.25 V; adjust R5 only after +12 is correct. Q4 pass transistor, Q3 driver, Q5 limiting and Z1 723 pins 2-7,10,11,13 are all present in the schematic. |
| 265 | model1 | +5 V | CONFIRMED | TRS pp.54,60,113,115 (PDF 55,61,114,115) | +5 V at Z80 pin 11 and left R4; 4.75-5.25 V, adjusted with R5. CR1 is the 6.2 V protective zener used when +12 shorts to +5, forcing current limiting. |
| 266 | model1 | +12 V | CONFIRMED | TRS pp.52,54,60,113,115 (PDF 53,55,61,114,115) | +12 V at RAM pin 8/top R18; 11.4-12.6 V with R10 adjustment. +12 must be checked/adjusted before +5. |
| 267 | model1 | -5 V | UNVERIFIABLE | TRS pp.52,54,60,113,115 (PDF 53,55,61,114,115) | -5 V plus/minus 5% is confirmed at RAM pin 1/CR2 anode; R19 and CR2 (1N5231, 5.1 V zener) are shown. Source is silent on the asserted failure-order prognosis that RAM fails first when this supply is lost. It establishes RAM needs this rail, not a guaranteed failure sequence. |
