| Coverage—all 4 hunks, 5 final records | Source checked | Decision |
|---|---|---|
| R5-1: Portable step 3 | HMS 0020-3, rendered at 150 dpi | No finding: rail checks, limits and branches match |
| R5-1: Portable step 4 | HMS 0020-4; continuation 0020-5, 150 dpi | No finding: speaker procedure matches |
| R5-2: `sc01a` chip | ET-18 printed pp. 50 and 78, 150 dpi | **High: false source attribution** |
| R5-2: HERO 1 speech symptom | Same scans; executed screen renderer | No finding: R515/R15 disagreement and CHECK appear |
| R5-3: Dragon supply note | Original SA2121 sheet | No finding: all three current limits match |

1. **High — blocks commit: the chip conflict invents R516.**  
   [heathkit.js:173](P:/retro-bench/.tmp/review-fix5/src/data/heathkit.js:173) says printed page 50 names pitch control **R516**. The [opened page 50 scan](P:/retro-bench/.tmp/review-fix5/.factcheck-tmp/heath-60.png) clearly names **R515**; [page 78](P:/retro-bench/.tmp/review-fix5/.factcheck-tmp/heath-90.png) says **R15**. The current record therefore contradicts both its source and the supplied patch/Round 5 log.

   Executing the current renderers reproduces the false “Sources disagree” statement on the HERO 1 and HERO Jr chip grids and print cards. CHECK and `(unverified)` appear, but the attributed source text is still false. Change **R516 → R515** in this conflict field.

No medium or low findings established. Only `.factcheck-tmp` artifacts were written. Browser access failed; renderer execution was checked, but visual screen/print layout remains unverified.