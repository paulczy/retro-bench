**Block commit.** Both additional corrections reverse values that were originally correct.

| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 138 | 85 | 2 | 51 |

1. **High — Model III/4, `fdc1793`, pin 20 (`fc-b-x1`).** Changed ground to **+5 V**. WD specifies **20 = VSS/ground; 21 = VCC/+5 V**. Following the new advice could short a supply to ground. **Old value correct.** Checked [FD179X-02, p. 2](https://bitsavers.org/components/westernDigital/FD179X-02_Data_Sheet_May1980.pdf#page=2).

2. **High — IBM machines, `cpu8088`, RESET pin 21 (`fc-b-x2`).** Changed active HIGH/restart LOW to active LOW/restart HIGH. Intel explicitly specifies **active HIGH for at least four clocks; restart when LOW**. The retained probe instruction also contradicts the change. **Old value correct.** Checked [Intel handbook, printed p. 3-81, PDF 261](https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf#page=261).

3. **Medium — 27 HERO 1 connector rows remain unproven.** For example, `hero1-p403` pin 21 retains its +5 V assignment while adding `verify: true`. The cited book’s [p. 99](https://archive.org/details/hero1advancedpro0000robi/page/99) could not be read; its PDF returns HTTP 401. The flag establishes no hardware fact. Old assignments remain unproven too.

4. **Medium — Retained connector geometry lacks physical-view evidence.** For example, CoCo 1 `coco-cart` retains its odd/even geometry with a new verification flag. [Table 5, printed p. 36](https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%20Technical%20Reference%20Manual%20(Tandy).pdf#page=43) supplies signal numbers, but no contact-face orientation. Neither old nor new geometry is proven.

5. **Medium — `sc02` replacement equivalence remains unproven.** Adding `verify: true` does not establish SSI 263A/263AP interchangeability with SC-02. The cited [Silicon Systems p. 1-42](https://bitsavers.org/components/siliconSystems/_dataBooks/1985_Silicon_Systems_Data_Book.pdf#page=50) describes SSI 263A alone.

6. **Low — `gime-tcc1014` adds “often sold out.”** The [product page](https://cocobits.org/products/gime-z-upgrade-for-the-color-computer-3) proves current sold-out status, not frequency over time.

[Complete per-item ledger, including old-value decisions](P:/retro-bench/.tmp/review-fix/.factcheck-tmp/fixreview/skeptic-b-ledger.md).

No data files changed or committed.