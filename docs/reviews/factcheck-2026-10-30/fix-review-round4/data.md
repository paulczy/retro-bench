| Items — all 12 patch hunks | Correct | Wrong | Unproven |
|---|---:|---:|---:|
| IBM HMS citation labels | 1 | 0 | 0 |
| IBM PC steps | 1 | 0 | 0 |
| IBM XT steps | 1 | 0 | 0 |
| IBM 5155 steps | 0 | 1 | 0 |
| Dragon PSU pin 3 | 1 | 0 | 0 |
| Dragon regulator check/source label | 1 | 0 | 0 |
| Dragon reset reversal: 33 µF / 100 kΩ | 1 | 0 | 0 |
| Dragon supply note | 0 | 0 | 1 |
| Dragon rail limits | 1 | 0 | 0 |
| Acorn RGB override | 1 | 0 | 0 |
| HERO summary and citations | 0 | 1 | 0 |
| HERO symptom note | 0 | 1 | 0 |
| **Total** | **8** | **3** | **1** |

1. **HIGH — 5155 still omits part of HMS step 007 and the speaker handoff.**  
   [ibm.js:1447](P:/retro-bench/.tmp/review-fix4/src/data/ibm.js:1447) checks only board rails. HMS requires drive-connector voltages too, then speaker continuity when all voltages pass ([007 scan](P:/retro-bench/.tmp/review-fix4/.factcheck-tmp/r4/hms-4-05.png), [008–015 scan](P:/retro-bench/.tmp/review-fix4/.factcheck-tmp/r4/hms-4-06.png)). The running renderer instead proceeds to “Display supply.” Round 4’s claim that the Portable received the same complete correction as PC/XT is false.

2. **HIGH — HERO’s documented disagreement has no CHECK mark in either affected view.**  
   [heathkit.js:171](P:/retro-bench/.tmp/review-fix4/src/data/heathkit.js:171) and line 671 explicitly describe the R515/R15 discrepancy. The scans confirm [R515 on printed page 50](P:/retro-bench/.tmp/review-fix4/.factcheck-tmp/r4/hero-60-060.png) and [R15 on printed page 78](P:/retro-bench/.tmp/review-fix4/.factcheck-tmp/r4/hero-90-090.png). Neither record carries verification flags; executing the production renderers confirms no CHECK beside either claim. The disagreement text alone does not meet your requirement.

3. **HIGH — The changed Dragon note retains an unproven failure-order claim.**  
   [dragon.js:633](P:/retro-bench/.tmp/review-fix4/src/data/dragon.js:633) still states “lose -5 V and the RAM fails first.” The [SA2121 sheet](P:/retro-bench/.tmp/review-fix4/.factcheck-tmp/r4/d32psu.gif) proves the output limits, but not which component fails first. The opened supporting repair, service and upgrade documents do not establish that ordering either. The rendered note has no CHECK. Remove that assertion or mark it unproven.

Additional checks: Model B/Master analogue designators are IC3/IC8 respectively; Electron uses independent arrays. Master’s nTUBE page correction, 27 versus 55, is supported.

Sources downloaded with curl; PDF scans rendered at ≥140 dpi. Production renderers executed; validator: **0 FAIL, 221 WARN**. No browser interaction tested. Only `.factcheck-tmp` was written; nothing committed. **Commit remains blocked.**