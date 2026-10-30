# Sinclair features 1-6 verification: waveforms, Sams, first ten minutes, clocks, replacements — 2026-10-30

Data added to `src/data/sinclair.js` in the shape of docs/data-schema.md, last section. `node scripts/validate-data.mjs sinclair timex`:
0 FAIL. Sinclair warnings left: one expected (`spectrum128` crystal oscillator scope has no low/high, the manual gives none) and
one new pin conflict (ULA pin 13, below).

## Sams folders

None. Sams never published a Sinclair-branded folder. The TS1000 folder (Sams **CC14**, "Timex TS1000 / Sinclair ZX-81",
1986; the brief's "CC3" is wrong) is sold by Sams Photofact but is not on archive.org or any open host found, so the ZX81 has no
Sams data. Searched: archive.org advanced search (computerfacts, sams + timex/sinclair/zx81, CC14), timexsinclair.com,
k1.spdns.de.

## Scope blocks

| Machine | Test point | Basis | Source |
|---|---|---|---|
| Spectrum 48K | CPU clock (ULA pin 32, TR3, Z80A pin 6): 3.5 MHz, 0-5 V square | datasheet | Service Manual 5.3.1 "square wave at +5 V amplitude", p. 26; rate from 14 MHz / 4 (WoS 48K reference) |
| Spectrum 48K | Y with sync, ULA pin 17: 64 µs, +1 to +3.5 V | capture | Service Manual 6.2.4 drawing, p. 31 |
| Spectrum 48K | U, ULA pin 15: 64 µs, +2 to +3 V | capture | same drawing |
| Spectrum 48K | V, ULA pin 16: 64 µs, +1 to +3 V | capture | same drawing |
| Spectrum 128 | Crystal oscillator, IC37 leg 6: 17.73447 MHz, no levels | capture | 128 Service Manual Fig. 4.1(a) oscillogram C, p. 4.7 |
| Spectrum 128 | CPU clock, TR3 collector: 3.54689 MHz, 0-5 V | capture | oscillogram D, p. 4.7; +5 V swing from 3.8 |
| ZX81 | CPU clock, Z80A pin 6: 3.25 MHz | datasheet | Zilog Z80 Product Spec (Mar 1978) VILC/VIHC p. 8; rate from circuit diagram SRC 049 |
| ZX80 | CPU clock: 3.25 MHz | datasheet | Zilog spec; ZX80 circuit diagram |
| +3 | CPU clock: 3.5469 MHz | datasheet | Zilog spec; +3 manual ch. 8 pt 30 |

The 48K manual drawings mark the line period "65nS"; it is a misprint for 64 µs (224 T-states at 3.5 MHz, WoS 48K reference),
noted on each block. The U/V/Y traces are entered as `pulse`, not `video-line`: the drawing does not show which level is sync.

Not backed and left without a scope block: the 48K 14 MHz crystal (no levels in any Sinclair document), the TR4/TR5 converter
(the brief expected a drawing in the 48K manual: there is none; the 128 manual's oscillograms A/B show TR4 collector and base
at 10 µs/div with a 23.2 V cursor reading but no legible rate, so it is a text-only test point on the 128), IC14 pin 13
composite (timing drawing, no levels), the speaker-load waveforms 6.10 (levels, no time base), 128 oscillograms E, F, G, H, J
(no rate or no levels readable), ZX81 6.5 MHz and video (no source with levels).

## firstTen and clocks

| Machine | firstTen | clocks | Main sources |
|---|---|---|---|
| Spectrum 48K | 8 | 6 | Service Manual 3.1.2, 5.3.1, 6.1, 6.2.3, 6.3.2 (pp. 17, 26-27, 30-32); Retroleum repair guide (step 4); WoS 48K reference (clocks) |
| ZX81 | 8 | 3 (PAL/NTSC columns) | Service and Assembly Manual 6 and 9; circuit diagram SRC 049; Andy Rea ULA notes; Zilog UM0080 |
| Spectrum 128 | 8 | 5 | 128 Service Manual 2.3-2.4 and Fig. 4.1 (pp. 4.3-4.8), 5.3.2, 5.8.1 |
| ZX80 | none | 2 | circuit diagram |
| +3 | none | 2 | +3 manual ch. 8 pt 30 |
| +2 | none | none | only an image scan with no text layer |

48K order follows the brief: supply, 7805, -5 V, +12 V, then crystal, CPU clock, control lines, /INT and RAM strobes with the
manual's IC change order. +3 and ZX80 have no source with values for a fault chart (the +2A/+3 flow chart has no voltages).

## Replacements

| Chip | Rows | Sources |
|---|---|---|
| Spectrum ULA | 6C001E-7, 6C001E-5/-6, 5C102E/5C112E (pin-compatible); vLA82, Nebula (modern) | Spectrum For Everyone "ULA Types"; Tindie vLA82; Retroleum Nebula fitting notes |
| ZX81 ULA | 2C210E (pin-compatible); vLA81 (modern) | retro.engineer ZX81 A; Tindie vLA81 |
| 4116 | 4164/41256 adapter, 4164 bent-pin bodge (adapter); Retroleum lower RAM module (modern) | PCBWay 4116 adapter; Arcade Collecting; Retroleum chips |
| 4532 | 4164 with 128-cycle refresh (pin-compatible); Retroleum upper RAM module (modern) | Retroleum chips |
| ZX81 ROM | 2764 on 24-to-28 adapter; AT28C PLCC adapter | Sinc-Link v3 n5 (archive.org n9); OSH Park |

The 4116 record is shared with the Apple II and the TS1500, so its notes say where a row is Spectrum-only.
No `replacements` on the 7805: it is not a chip record. Its switch-mode drop-ins (Traco, Murata) and their Issue 2 rubber-key
fit trap went into the 48K `+5 V` rail note instead, sourced to Retroleum. The Spectrum ROM (`rom23128`) lives in commodore.js
and was not touched.

## Conflicts and corrections

- ULA pin 13: the service manual (6.3.2, 6.4.7, p. 32) says to check IC1 pin 13 for **+3 V**; the pin record says +5 V (Vcc2
  through an RC filter, WoS). Recorded as `conflict` on the pin; not settled.
- 48K Service Manual 1.3 says the Z80A "is clocked at 14.0 MHz" and the 5.3.1 table puts "14MHz squarewave" against IC1 pin 32;
  6.3.2 gives 3 MHz at pin 32 and 14 MHz at pin 39. WoS gives 3.5 MHz. The data uses 3.5 MHz and the scope note says why.
- 48K drawing "65nS" period: misprint for 64 µs (above).
- No Sams DC values to compare.
