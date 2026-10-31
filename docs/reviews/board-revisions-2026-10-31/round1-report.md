# Skeptic review

**Changes required before treating the revision selector as reliable.** All 140 required records were inventoried: 24 boards, 13 chip applicability maps, 25 location overrides and 78 tagged records. The [ledger](ledger.md) expands these into 392 verdict rows, including individual board-note facts, dates and universal-record checks.

**Major — incorrect repair targets and applicability.**

- C64 250425 names the clock chip at U13; the [parts list](src/94bab741f5f5.pdf#page=37) reads **U31 7701/8701**. The 250469 rev A CPU override says U3; the [list](src/94bab741f5f5.pdf#page=50) reads **U6 8500**, with U3 being 74LS08.
- `chipBoards.dram4164` wrongly includes 250466: [U9/U10 are 64K × 4 DRAMs](src/94bab741f5f5.pdf#page=44).
- Untagged C64 reset, regulator and AEC fault instructions reference components absent or relocated on 250469. Untagged 1541 supply, alignment and mechanism records similarly send later-board users to nonexistent regulators, 592 amplifiers or incompatible headers. “Untagged means all boards” is contradicted by the schematics.
- [Sams CC20 photographs 250466](src/render/4494c12c0df8-p13-fit.png), but is also tagged for both 250469 revisions. Spectrum Issue 6A records claim two ZX8401s; the [drawing](src/render/7da2a4d47f4e.png) has **IC27 ZX8401 and IC28 74LS04**.
- 1541 clock records overgeneralize package pins. Both [250448](src/943e030c0a83.gif) and [1541-II](src/95356cd8f4c7.pdf#page=6) allow 40/42-pin gate arrays; the II schematic specifically draws 42 pins. CN4 also has mechanism-dependent variants.

**Minor — coverage and unsupported precision.** The Spectrum Issue 1 PDF also contains Issue 2; the bound Apple scan includes enhanced boards excluded by its tags. Other rows flag mechanism qualification, silkscreen wording, source conflicts and unsupported chronology. Of 80 UNPROVABLE rows, 64 concern asserted schematic production-year spans; publication dates do not establish those spans. Commons originals returned 403, so local photographs support board identity but cannot independently establish attribution/licensing.

The new **250469 SID supply rail is OK**, including Q5/CR7, both zener values and R8 removal. No forbidden Toolbox source was found or used.

**Totals: OK 276; WRONG 29; OVERSTATED 7; UNPROVABLE 80.** These are ledger-row totals, including related findings and explicit metadata checks. Downloads, error responses and rendered evidence are retained under `src/` within this output directory. Project `src/` was not edited.
