# Board photos: verification

Date: 2026-10-30. Data: `src/data/photos.js`. Images: `photos/`. Survey: `docs/research/board-photos.md`.

## Method

- Licence, author and original URL were read from each Commons file page (MediaWiki API: the page wikitext and `extmetadata`) on 2026-10-30, then the original file was downloaded.
- Each original was resized to a 1600 px long edge and saved as WebP quality 80 (Python Pillow, Lanczos). Camera EXIF orientation was applied, so the pixels match the file page. No crops and no other edits.
- Chips were found by reading the silkscreen designator next to each chip on crops of the original. A box placed by part marking or by position, with no legible designator, is listed in `verify`.
- Every box was drawn back onto the resized image and checked by eye. Boxes are [x, y, w, h] fractions of the image.
- `node .tmp/photo-scripts/test-photos.js` (a stand-in for `RCS.addPhotos` until the app loader exists): every chip id is in the machine's `chips`, every box is inside 0-1, every file exists with a 1600 px long edge. Result: 0 FAIL.

"Not on this board" means the chip is fitted elsewhere (a plug-in card, the keyboard PCB, another board revision) or the socket is empty.

## Per photo

| Machine | File | Licence | Placed | In `verify` | Missing | Notes |
|---|---|---|---|---|---|---|
| c64 | c64-250407.webp | CC BY-SA 4.0, Sven.petersen | cia6526, cpu6510, rom2364, rom2332, pla82s100, sid6581, sram2114 (U6 colour RAM), dram4164 | none | vic2: U19 is under the closed RF shield | Assy 250407, artwork 251137 Rev B. Board still in the case. |
| vic20 | vic20-mainboard.webp | Public domain (PD-self), Sven.petersen | via6522, vic6560, sram2114, rom2332, cpu6502, rom2364 | none | none | PAL (6561E, KERNAL 901486-07). Assy number not visible, so `board` does not match a schematics.js entry. Wires cross the top half; the UAB3 label is under a wire. |
| plus4 | plus4-310163.webp | Public domain (PD-self), Journey234 | cpu7501, acia6551, pio6529 (U5), rom23128, pla82s100, dram4164 | rom23128, pla82s100 | ted7360: under the RF shield | Assy 310163. The ROM and PLA designators are not legible; placed by marking (318004/318006/317053/317054, 251641-02). Second 6529 (U27) at the lower left. |
| c128 | c128-flat.webp | CC BY-SA 2.5, Bill Bertram | all 10 (cia6526 box is U4) | none | none | Licence conflict on the file page: template CC BY-SA 2.5, author text "CC-BY-2.5". Treated as BY-SA. |
| c1541 | c1541-250442.webp | Public domain (PD-self), Evan-Amos | cpu6502 (UC4), via6522 (UC3+UC2), ga325572 (UC1), rom2364 (UB3+UB4), sram6116 (UB2), ttl7406 (UB1) | none | not on this board: ga251828, ga251829, rom27128, sram2114, uln2003 | Assy 250442, PCB 251830 Rev A. Shot at about 15 degrees, so boxes are approximate. |
| apple2 | apple2-mainboard.webp | CC BY 2.0, Steve Jurvetson (Flickr, review passed) | cpu6502, rom2316, dram4116 | none | kbd5740: on the keyboard PCB | Revision not readable. Board prints function labels (6502, ROM-F8 to ROM-D0, RAM). |
| apple2e | apple2e-820-0087.webp | CC0 1.0, Nicolasfoster | cpu6502, mmu344, iou344, kbd3600 | none | dram4164: this board uses two 64K x 4 RAMs (cols 8-9) | 820-0087-C / 607-0187-C (1986). Not the 820-0064 listed in schematics.js. Encoder is an SMC KR9600-PRO (silk AY3600931 PRO). |
| apple2c | apple2c-820-0115.webp | Public domain (PD-self), Evan-Amos | all 7 | none | none | 820-0115-C. Function names printed on the board. acia6551 box covers SER 1 and SER 2. |
| atari800 | atari800-motherboard.webp | Public domain (PD-self), Evan-Amos | pokey (A101), pia6520 (A102) | none | not on this board: cpu6502, antic, gtia, dram4116, osrom (plug-in cards) | Motherboard Rev A only. The card cage covers the top half. |
| atari800xl | atari800xl-mainboard.webp | CC BY-SA 4.0, Multicherry (attribution requested as "Multicherry") | dram4164, gtia (U17), antic (U7), cpu6502c (U8), pia6520 (U23), pokey (U22), mmu61618 (U3) | none | freddie: this board has 74LS158 muxes, no FREDDIE | PAL, Taiwan build. Perspective corrected by the uploader. |
| colecovision | colecovision-75743.webp | Public domain (PD-self), Evan-Amos | all 8 | none | none | PCB 75743 Rev H2-1. VDP (U9) under its clip-on heatsink; box covers the heatsink. |
| spectrum | spectrum-issue4b.webp | Public Domain Mark (Flickr), AUIC Oficial / Fernando Sáenz | ula_spectrum, cpuz80, rom23128, dram4116, dram4532 | ula_spectrum, cpuz80, rom23128 | none | Issue 4B. Heatsink hides the CPU and ROM tops and the IC1-IC5 labels. ULA read by marking (Ferranti 6C001E-7). |
| zx81 | zx81-mainboard.webp | CC BY-SA 2.0, liftarn (Flickr import) | ula_zx81, rom_zx81, cpuz80 | all 3 | sram2114: the IC4b 2114 site is empty; one 24-pin RAM is fitted instead | Substitute photo (see below). Issue not visible. Angled, in the open lower case, hands in the frame. Placed by marking (Ferranti ULA 2C184E, NEC D2364C, NEC D780C-1). |
| ts1000 | ts1000-mainboard.webp | Public domain (PD-self), MarcoTangerino | ula_zx81 (IC1), cpuz80, rom_zx81 (IC2), sram6116 (IC4) | cpuz80 | none | Silkscreen "Sinclair ZX81 ISS 3" on a Timex unit: one NEC D4016 at IC4; IC4A/IC4B empty. |
| dragon32 | dragon32-pc10087.webp | GFDL 1.2, Roberto Carlos Fernández Gerhardt (from The Dragon Archive) | vdg6847 (IC12), sam6883, rom-dragon32-basic (IC17+IC18), cpu6809e (IC19), pia6821 (IC26), mux14529 (IC20), dram4116 | sam6883, dram4116 | none | PC10087 "CPU UK 32K MK II", side 2 issue 5. Second PIA is IC35. GFDL: the app must ship the GFDL 1.2 text. |
| pc5150 | pc5150-16-64kb.webp | CC BY-SA 3.0, German | cpu8088, bus8288 (U6), clk8284 (U11), pic8259 (U2), ppi8255 (U36), dma8237 (U35), pit8253 (U34), dram4116 | cpu8088 | fpu8087: socket U4 empty. crtc6845: on the video card | "16KB-64KB CPU" board. RAM is AM9016 (a 4116 type), banks 0-3. |
| xt5160 | xt5160-64-256kb.webp | CC BY-SA 4.0, Mister_rf | cpu8088, bus8288 (U8), clk8284, ppi8255 (U29), dma8237 (U28), pit8253 (U26), pic8259 (U25), dram4164 | cpu8088, clk8284 | fpu8087: socket empty. dram41256: not on this board. crtc6845: on the video card | "64-256KB SYSTEM BOARD". Mixed RAM makers in banks 0-3. |
| portable5155 | portable5155-64-256kb.webp | CC BY 2.0, tony_duell (Flickr, review passed) | cpu8088, bus8288, clk8284 (U1), ppi8255 (U29), dma8237 (U28), pit8253 (U26), pic8259 (U25), dram4164 | cpu8088, bus8288 | fpu8087: socket U4 empty. crtc6845: on the video card | Angled bench shot, boxes approximate. Banks 0-1 carry HY53C256 parts (an upgrade); dram4164 box covers banks 2-3 only. |
| pcjr | pcjr-mainboard.webp | CC BY-SA 4.0, Binarysequence | cpu8088, pic8259, pit8253, ppi8255, crtc6845, sn76496, clk8284 | all 7 | pcjr_ga: not identified with certainty (40-pin IBM 1503730 is a candidate) | No reference designators near the chips; all placed by part marking. The survey said the photo is rotated 180 degrees. It is not: cartridge slots at the bottom (front), sidecar connector on the right, so `rotate: 0`. Chips are fitted both ways, so some markings read upside down. |
| model1 | model1-1700069.webp | CC BY-SA 4.0, Binarysequence | cpuz80 (Z40), dram4116 (Z13-Z20), cg-mcm6670 (Z29), sram2102 (Z45-Z48), rom-trs80-model1 (Z33+Z34) | none | fdc1771: in the Expansion Interface | CPU board, serial 112788, revision not readable. Keyboard in front; a ribbon cable covers the lower left, including Z61-Z63. |

## ZX81

`File:Sinclair ZX81 PCB Revision 3.JPG` (CC BY-SA 4.0, Binarysequence), the survey's pick, shows a closed ZX81 case, not the PCB. The file has one upload (2016-05-04, 3648 x 2736) and its title is wrong. It is not used. The survey's alternate, `File:SinclairZX81PCB.jpg` (CC BY-SA 2.0, liftarn, Flickr import), shows the PCB and is used instead. It is a weaker photo: angled, hands at the edges, and no chip designators visible, so every box is in `verify`.

## Odd findings

- The survey's ZX81 pick ("PCB Revision 3") is a photo of the closed case; replaced by the alternate.
- Two boards do not match a board in `schematics.js`: the VIC-20 (no assy number visible) and the Apple IIe (820-0087-C; only 820-0064 is listed).
- The survey's "angled" warnings for c1541 and portable5155 hold. No perspective correction was made (that would be an adaptation); boxes are drawn on the angled image and are slightly loose.
- Spectrum Issue 4B, C64 and Plus/4: shields or heatsinks hide the video chip or CPU. Those chips are either missing or in `verify`.
