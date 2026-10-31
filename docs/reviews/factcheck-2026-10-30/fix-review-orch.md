**Block the commit: two high-severity findings.** Reviewed all 13 hunks: **10 CORRECT, 2 WRONG, 1 UNPROVEN**.

| Hunk | CORRECT | WRONG | UNPROVEN |
|---|---|---|---|
| Amstrad printer pin 27 | — | Shared wording falsely describes the CPC464 manual; see finding 1. | — |
| Disk II +12 V expectation | Nominal +12 V; Sams confirms 11.6 V at Q1 emitter, PDF p. 6. | — | — |
| `ctrlRails` +12 V expectation | IIc Table 11-4, printed p. 234, specifies ±10%: 10.8–13.2 V. Card branch retains nominal +12 V. | — | — |
| DuoDisk +12 V expectation | Apple TA37054, PDF p. 1, identifies +12 V on DB-25 pins 19/20. | — | — |
| cpu6502 pin 8 restoration | VCC / +5 V. | — | — |
| Plus/4 video mapping | — | Deletes app-used `expect` fields, including ground; see finding 2. | — |
| 1571 source verification flags | — | — | Flags are valid metadata, but the USA PSU diagram could not be inspected; see finding 3. |
| cia6526 pin 20 restoration | VCC / +5 V. | — | — |
| C16 7805 citation and note | TI SLVS056P p. 5 confirms 7–20 V test conditions and 2 V typical dropout at 1 A; no exact cutoff specified. | — | — |
| cpu8088 pin 21 restoration | RESET active HIGH. | — | — |
| GIME-Z availability deletion | Product page supports FPGA, PLCC socket, faster clocks and 2 MB; deletion adds no claim. | — | — |
| fdc1793 pin 20 restoration | VSS / ground. | — | — |
| F18A source verification flag | Valid metadata; archived pinout page opened successfully. | — | — |

1. **HIGH — Amstrad conflict text is false for the CPC464.**  
   [amstrad.js:88](/P:/retro-bench/.tmp/review-fix/src/data/amstrad.js:88) applies the new text to both 464 and 6128. The [cited CPC464 manual, PDF p. 236](https://archive.org/details/cpc464.en/page/n235), explicitly lists printer pin **27 = GND**. It does not omit it. Restrict the omission/conflict wording to the 6128, whose manual does omit 27 under “all other pins NC,” chapter 7 p. 41. The 6128 service schematic, printed pp. 19–20, lists 27 among grounds.

2. **HIGH — Plus/4 mapping loses expected readings used by the app.**  
   [commodore.js:202](/P:/retro-bench/.tmp/review-fix/src/data/commodore.js:202) strips `expect` from every inherited pin. Node confirms pin 2’s expectation becomes `undefined`; the UI reads this field in connector displays. The [cited connector map](http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/plus4/connectors-2.jpg) and service-manual PDF p. 21 identify **pin 2 = GND**, supporting **`expect: '0 V'`**. Preserve that field. Any removal of unsupported video measurements should target those measurements individually.

3. **MEDIUM — 1571 USA PSU source remains unproven.**  
   The cited USA diagram returned HTTP 429 or a bot-block response after retries. The companion wiring image opened successfully. Adding `verify: true` honestly signals uncertainty, but does not establish the inaccessible diagram’s contents.

Validation: loaded all data scripts with temporary patched copies using `node -e`; exercised both `ctrlRails` branches and all three printer variants. No syntax/runtime failures occurred. Curl TLS failures required a Python download fallback. All review writes stayed under `.factcheck-tmp/`; no browser UI test was run.