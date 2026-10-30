Checked every item. The [per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/rest-architect/ledger.md) contains all 141 decisions, source pages and evidence. Site data is unchanged.

| Item kind | Checked | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-orientation | 4 | 1 | 1 | 2 |
| shared-chip-text | 25 | 17 | 7 | 1 |
| replacement-claim | 112 | 61 | 4 | 47 |
| photo-outlines | 0 | 0 | 0 | 0 |
| **Total** | **141** | **79** | **12** | **50** |

The input contains no photo-outline items. UNVERIFIABLE includes sources silent on part of a claim, especially missing second-part electrical specifications.

1. **High — i38, `disk2/disk2-mech`: connector faces reversed.** With the component side up, the lettered A–R contacts belong above the numbered 1–14 contacts. The geometry draws the opposite. This affects the listed `edge-14x14-cbm` user. Evidence: [analog-card photo, A marking](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Peripherals/Disk%20Drives/Apple%20Disk%20II/Photos/Apple%20Disk%20II%20Drive%20-%20Analog%20card.jpg). Mapping: foundational-thinking.

2. **High — i142, TI console ROM replacement: wrong pin and missing supply rework.** TMS2532 **pin 18 is A11**, not a programming function. Its **pin 21 VPP requires +5 V during reading**, while the TI console grounds that socket contact for TMS4732 selection. Isolate pin 21 and supply +5 V; the stated replacement omits this necessary change. Checked [TI memory book, PDF pp. 207–208](http://www.bitsavers.org/components/ti/_dataBooks/1984_TI_MOS_Memory_Data_Book.pdf#page=207) and [console schematic, PDF p. 62](P:/retro-bench/.tmp/review/.factcheck-tmp/rest-architect/d154.pdf:62). Mapping: boundary-discipline.

3. **Medium — i144, `cpu6809e`, pins 5/6/40: incorrect status and halt behavior.** BA/BS = **1/1 means halt acknowledge**; interrupt/reset acknowledge is **0/1**. `/HALT` stops after the current instruction, rather than at the next cycle boundary. Checked [Motorola datasheet, PDF p. 6](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf#page=6>). Mapping: foundational-thinking.

4. **Medium — i148, `vdg6847`, pin 38: CoCo wiring applied to MC-10.** “Goes to SAM pin 9” cannot describe the MC-10, which has no SAM. Keep `/HS` as the generic output function and attach its destination to each machine. Checked [MC-10 schematic, p. 1](<https://colorcomputerarchive.com/repo/MC-10/Documents/Manuals/Hardware/MC-10%20Schematic/MC-10%20Schematic%20(Tandy).pdf>). Mapping: boundary-discipline.

5. **Medium — i151, `sam6883`, pin 14: incorrect fixed clock expectation.** E is programmable at crystal/16 or crystal/8. With 14.31818 MHz, it can be approximately **0.895 or 1.790 MHz**, rather than invariably 0.89 MHz. Checked [joint SAM datasheet, PDF pp. 4–5](<https://colorcomputerarchive.com/repo/Documents/Datasheets/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf#page=4>). Mapping: foundational-thinking.

6. **Medium — i175, `rtc146818`, pin 13: HERO Jr address applied to BBC Master.** `$D810` decoding is machine-specific. BBC Master operates the RTC through the system VIA/slow bus. Checked [Master service manual, pp. 21 and 23](https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=21). Mapping: boundary-discipline.

7. **Medium — i196, `ppi8255` → 82C55A: bus-hold behavior overstated.** “An open input holds its last level” does not apply uniformly. **Port B has bus-hold high only**; Port A supports both levels. Checked [Intersil datasheet, pp. 3, 5 and 18](https://www.renesas.com/us/en/document/dst/82c55a-datasheet#page=3). Mapping: boundary-discipline.

8. **Medium — i208, XT 640 KB conversion: required U84 omitted.** The RAM and E2/U44 jumper changes are insufficient without a **74LS158 at U84**. The linked procedure explicitly requires it in step 2. Checked [upgrade procedure, printed p. 521](https://www.minuszerodegrees.net/5160/motherboard/5160_upgrading_256k_motherboard_to_640k.pdf#page=1). Mapping: foundational-thinking.

9. **Medium — i154, `gime-tcc1014`: “no new replacement” is false.** CoCo Bits documents **GIME-Z**, an FPGA replacement installed in the GIME socket. Sold-out status does not mean no replacement exists. Checked [manufacturer’s product page](https://cocobits.org/products/gime-z-upgrade-for-the-color-computer-3). Mapping: foundational-thinking.

10. **Low — i79, `rom23128`, pins 20/27: shared text contains board wiring.** C16 TED selections, Spectrum H/N links and Oric `/ROMDIS` wiring violate the requested machine-neutral boundary. These are qualified examples, not demonstrated wrong pin numbers. Checked C16 manual p. 11 and Spectrum manual pp. 10/24; links are in the ledger. Mapping: redesign-from-first-principles.

11. **Low — i92, `via6522`, pin 19: PET-only role in shared text.** The generic function is CB2 handshake/shift I/O. “PET: beep sound output” belongs with PET wiring. Checked MOS 6522 scan p. 1. Mapping: redesign-from-first-principles.

12. **Low — i200, `crtc6845`, pins 21/39: IBM-specific clock/probe context.** The card-dot-counter wording and MDA/CGA examples do not provide neutral instructions for every listed machine. BBC Master supplies its CRTC clock from VIDPROC. Checked Motorola pp. 8–9 and Master manual pp. 24–25. Mapping: redesign-from-first-principles.

**Blocked or wrong source links:**

- Unrecovered HTTP 406: [Carlsen Plus/4 note](https://portcommodore.com/rcarlsen/cbm/plus4/plus4.txt), affecting i71; [CPU/VIC substitution note](https://portcommodore.com/rcarlsen/cbm/C64C%20VIC%20%26%20CPU%20subs/CPU%20%26%20VIC%20subs.txt), affecting i83/i94.
- Oric/CPCWiki archive requests were refused; the archived BBC schematic returned 429. Recoveries and remaining gaps are documented in the [source index](P:/retro-bench/.tmp/review/.factcheck-tmp/rest-architect/source-index.md).
- **i122:** SincLink article is [IA `/page/n8`](https://archive.org/details/SincLink/Sinc-Link%20Vol%2003%20No%205/page/n8), not `/page/n9`.
- **i147:** Error Trapping is PDF **p. 14**, not the cited p. 13.
- **i65:** IBM PDF p. 36 is printed **1-17**, not 1-16.