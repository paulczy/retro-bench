| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| clock-row | 21 | 18 | 2 | 1 |
| connector-pin | 215 | 211 | 4 | 0 |
| first-ten | 13 | 4 | 2 | 7 |
| rail | 13 | 9 | 3 | 1 |
| **Total** | **262** | **242** | **11** | **9** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-20-ledger.md) — verified 262 unique rows. Data files unchanged.

1. **High — items 20, 21:** Model 4 I/O-bus names are reversed. **Pin 1 is XDB0; pin 2 is GND.** The current label could direct a ground connection onto a data line. Model 4 manual, printed p.37, schematic sheet 4.

2. **High — item 2:** HERO Jr RTC measurement incorrectly specifies pins 2–3. Measure **U213 pin 2 relative to circuit ground**. U221A supplies its buffered clock; pin 3 is unused in this arrangement. HERO manual, pp.8, 27; schematic sheet 3.

3. **Medium — item 256:** The Model 4 supply procedure omits required minimum loads: **1.35 A on +5 V, 0.40 A on +12 V V2, and 0.60 A on +12 V V3**. R27/R28 adjustment means adding/removing resistors. Model 4 manual, pp.112–114.

4. **Medium — items 8, 15:** HERO Jr Vcc is not continuously zero during sleep. The RTC turns the regulator on **every five seconds** for input checks. Item 15’s **4.9–5.1 V** tolerance is also unsupported. HERO manual, p.17.

5. **Medium — item 201:** Model 4 printer strobe comes from **U65**, not U93. Model 4 manual, pp.21, 37.

6. **Medium — item 200:** Model 4 RTC interrupt is **30 Hz at 2 MHz CPU speed; 60 Hz at 4 MHz**. The record omits the fast-mode value. Model 4 manual, p.21.

7. **Medium — items 81, 189, 190:** Model III ripple limits—**50 mV peak-to-peak on +5 V; 150 mV on +12 V**—apply only under resistive test loads. The source explicitly excludes system operating conditions. Model III Service Manual, p.69.

Findings map to **prove-it-works**; repeated component and operating-condition errors also map to **fix-root-causes**.

Dead or wrong source links:

- **No dead PDFs:** all seven originals downloaded and were readable.
- The [1984 Model 4/4P pin table, p.53](https://archive.org/download/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation/Model_4_and_4P_Technical_Reference_Manual_1984_Tandy_Corporation.pdf#page=59) contains shifted J4/J5 labels after EXTIOSEL wraps. Use the schematics for those pins.
- **Item 257:** cites Tandy’s 1983 manual for a Sams-specific component diagnosis; the required Sams source is missing.
- Several HERO connector-pin claims lack schematic citations; the ledger identifies each unsupported field.