# app — adversarial round 3 ledger

Verdict: blocks commit. No application/data files changed and nothing committed. All artifacts are under .factcheck-tmp/.

Scope: the full HEAD diff for src/app.js, src/input.css, scripts/validate-data.mjs and docs/data-schema.md. Data was loaded to test flag propagation; this is not a hardware-value audit of the data patch.

## Verification method and limits

Reproduce with: node .factcheck-tmp/r3/app/audit.cjs

The harness executes the actual app source in a Node VM with minimal DOM stubs, exporting the real functions before initial rendering. It runs the actual validator body with mutations injected in memory after data loading; each case reloads pristine data. extra.cjs adds index, geometry and all-existing-record checks. Application files are never patched.

Baseline: node scripts/validate-data.mjs exits 0, RESULT: 0 FAIL, 215 WARN. Invalid DIP-40 corner also exits 0 with 0 FAIL. See validator-baseline.json and validator-matrix.json.

Generated HTML proves returned markup, not painted pixels or pagination. Record markers are checked separately from the print-card header; unrelated power records/connectors are removed for isolation. Fixture HTML is retained beside the harness.

Python served this exact directory on port 8487. GET /src/app.js returned HTTP 200 and 161944 bytes. Exact command-line match identified server PID 34152; only that PID was terminated and its exit verified. See server-lifecycle.txt.

agent-browser 0.41.0 was available. Brave launch failed with CDP response channel closed. Doctor reported Chrome availability, but explicit Chrome/fresh-session and headed attempts also failed with the same CDP error. Both named sessions were closed. CUA fallback reported browser access host unavailable. All actual screen/print-layout checks are UNPROVEN.

src/input.css:725 adds pc-v. The served dist/app.css has no .pc-v. No build was run because it would write outside the permitted audit directory. Literal marker HTML exists; this does not claim missing CSS hides the text.

CodeRabbit was not invoked: its skill requires host execution unavailable under this session's permission policy. This ledger is direct source/runtime evidence, not a CodeRabbit report.

## External source opened

The only external citation introduced in the scoped code/documentation is the Electron Service Manual chapter 6, printed p. 8 / PDF p. 14:
https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf#page=14

HTTPS curl -L -A "Mozilla/5.0" failed with schannel SEC_E_NO_CREDENTIALS. The same host and path over HTTP succeeded with curl -L -A "Mozilla/5.0". Saved Acorn_ElectronSM.pdf; SHA256 5993bce54609a06a3abba8510366de4ea47a234fc527b02e2bf402dc612f4d03.

Ran pdftotext -layout to Acorn_ElectronSM.txt and pdftoppm -r 110 -f 14 -l 14 -png -singlefile to manual-page14.png. Opened and read the image directly. It is legible text, not a faint schematic.

CORRECT: p. 8 states a 68-pin quad in-line package, pin 1 marked at the top left, and consecutive anti-clockwise numbering. This proves the broad cited corner/direction claim.

UNPROVEN: the exact first contact edge and physical PLCC designation. The cited paragraph does not explicitly say which edge starts at pin 1 or call this PLCC. The actual elk_ula record already has verify:true and explains the assumed edge. Those flags must remain.

CORRECT implementation: all 68 generated slots checked independently and generated SVG parsed: 1–17 down left, 18–34 across bottom to right, 35–51 up right, 52–68 across top to left. Four compact/bottom-view variants pass side tests. See ula-assertions.txt, ula-positions.json and ula-*.svg. Visual presentation is still UNPROVEN.

## Findings by severity

1. HIGH — square-package rejection is disabled (scripts/validate-data.mjs:63). The false && condition prevents the error. Adding only pin1:'corner' to a valid DIP-40 passes with zero failures. QIL-18, QIL-22, SOIC-40 and PLCC-19 also pass with pins:null. Right behavior: reject packages outside the documented square PLCC/QIL rule before the null-pin early return. Principles: fix-root-causes, prove-it-works.

2. HIGH — printCard omits requested record classes entirely (src/app.js:1387, 1402–1409). It collects rails, firstTen and clocks but never emits testPoints, scopes or replacement rows. Both verify/conflict fixtures disappear with their records. This affects 12 actual flagged test points, 58 actual flagged replacements and one actual scope-only conflict. These are omissions, not printed facts silently stripped of their flags. Right behavior: emit the requested rows and explicit (unverified) / Sources disagree: text. Principles: prove-it-works, fix-root-causes.

3. HIGH — search drops conflict-only warnings (src/app.js:434–457, 1218). All eight changed index projections copy verify but omit conflict; resultItem renders only vmark. Chip, chip-pin, replacement, BASIC-essential, key, connector, connector-pin and clock conflict-only fixtures produce ordinary unqualified search rows. Right behavior: retain conflict and render its text or a CHECK marker. Other power kinds have no search entries at all; docs/data-schema.md:150–154 overstates that search contract. Principles: fix-root-causes, prove-it-works.

4. HIGH — scope blocks inherit verify but drop parent conflict (src/app.js:361, 383). A conflict-only rail/test point passed as parent produces neither CHECK nor conflict text on an otherwise clean scope. viewPower:1174 and pinScopes:392 both call this helper. The current real inherited-scope case uses verify and passes; the legal conflict-only fixture fails. Right behavior: propagate parent.conflict as well as parent.verify, without discarding a scope's own conflict. Principle: fix-root-causes.

5. MEDIUM — chip grids drop conflict-only chip flags (src/app.js:550). boardGrid adds CHECK for verify only and is used on machine pages and print cards. Actual elk_ula also has verify:true, so it does receive CHECK; this finding concerns the conflict-only input, not a wholly unmarked actual Electron chip. Right behavior: preserve conflict-only uncertainty too. Principle: fix-root-causes.

6. MEDIUM — connector print conflicts lose their explanation (src/app.js:1409). Connector rows have pv but no pconf; conflict-only connectors are unmarked. Pins retain a generic lowercase (sources disagree), but discard the actual disagreement and requested Sources disagree: wording. Verify cases pass; full conflict-text cases fail. Principle: prove-it-works.

7. MEDIUM — supply-note validator accepts malformed flags and can crash (scripts/validate-data.mjs:221). It accepts verify:'false', conflict:42 and an array with a text property. An object-valued notes container throws TypeError at .entries rather than reporting a validation failure and continuing. The crash would exit nonzero in a real process; it is not silent acceptance. Number, null, missing/numeric/empty object-text notes reject correctly; strings and valid flagged objects pass. Right behavior: check container/record shape and documented flag types. Principle: fix-root-causes.

## Every flag-loss path in the scoped changes

| Renderer path | Dropped information | Decision |
| --- | --- | --- |
| buildIndex -> resultItem: chip | conflict | WRONG |
| buildIndex -> resultItem: chip pin | conflict | WRONG |
| buildIndex -> resultItem: replacement | conflict | WRONG |
| buildIndex -> resultItem: BASIC essential | conflict | WRONG |
| buildIndex -> resultItem: key | conflict | WRONG |
| buildIndex -> resultItem: connector | conflict | WRONG |
| buildIndex -> resultItem: connector pin | conflict | WRONG |
| buildIndex -> resultItem: clock | conflict | WRONG |
| viewPower -> scopeBlock: rail | parent conflict | WRONG |
| viewPower -> scopeBlock: test point | parent conflict | WRONG |
| pinScopes -> scopeBlock: rail | parent conflict | WRONG |
| pinScopes -> scopeBlock: test point | parent conflict | WRONG |
| viewMachine -> boardGrid | conflict-only chip | WRONG |
| printCard -> boardGrid | conflict-only chip | WRONG |
| printCard: test points | entire record, both flags | WRONG |
| printCard: scopes | entire block, own flags | WRONG |
| printCard: replacements | entire row, both flags | WRONG |
| printCard: connector | conflict | WRONG |
| printCard: connector pin | explanation; generic warning remains | WRONG |

Requested direct HTML paths that preserve their own flags: supply, supply notes, rails, test points, clocks, firstTen on power; rails/test points on machine; clock/reset PIN DETAIL expectations; scope's own flags; replacement rows. Parent verify propagates to scopes. Full individual cases follow.

## Coverage interpretation

Counts below are checks, not unique hardware facts; synthetic and existing-record checks intentionally overlap. Existing records: 341 flagged records plus one inherited-scope test. The broader recursive flag-inventory.json has 391 entries because it also includes source objects and nested metadata outside these record types. No real supply or note has its own flag; those contracts were exercised with isolated fixtures.

Each existing-record decision concerns marker propagation, not the truth of its hardware values. WRONG means at least one requested path omits the record or its flag. All 58 flagged replacement rows are isolated from unrelated power/connector markers before print checking.


## Coverage

| Items | Count | CORRECT | WRONG | UNPROVEN |
| --- | ---: | ---: | ---: | ---: |
| Validator cases | 69 | 60 | 9 | 0 |
| Renderer contracts | 80 | 60 | 20 | 0 |
| ULA geometry variants | 4 | 4 | 0 | 0 |
| Existing flagged records / scope inheritance | 342 | 271 | 71 | 0 |
| Manual orientation claims | 2 | 1 | 0 | 1 |
| Visual screen / print / CSS checks | 16 | 0 | 0 | 16 |

## Visual checks

| Item | Decision | Reason |
| --- | --- | --- |
| rails screen | UNPROVEN | No working browser host; HTML checked separately. |
| test points screen | UNPROVEN | No working browser host; HTML checked separately. |
| clocks screen | UNPROVEN | No working browser host; HTML checked separately. |
| firstTen screen | UNPROVEN | No working browser host; HTML checked separately. |
| scopes screen | UNPROVEN | No working browser host; HTML checked separately. |
| replacements screen | UNPROVEN | No working browser host; HTML checked separately. |
| supply/notes screen | UNPROVEN | No working browser host; HTML checked separately. |
| rails print layout | UNPROVEN | No working browser host; HTML checked separately. |
| test points print layout | UNPROVEN | No working browser host; HTML checked separately. |
| clocks print layout | UNPROVEN | No working browser host; HTML checked separately. |
| firstTen print layout | UNPROVEN | No working browser host; HTML checked separately. |
| scopes print layout | UNPROVEN | No working browser host; HTML checked separately. |
| replacements print layout | UNPROVEN | No working browser host; HTML checked separately. |
| supply/notes print layout | UNPROVEN | No working browser host; HTML checked separately. |
| new CSS in served page | UNPROVEN | No working browser host; HTML checked separately. |
| Electron ULA actual screen | UNPROVEN | No working browser host; HTML checked separately. |

## Every validator case

| Case | Expected | Decision | Observed |
| --- | --- | --- | --- |
| DIP-40 corner | reject | WRONG | RESULT: 0 FAIL, 215 WARN |
| QIL-18 corner | reject | WRONG | RESULT: 0 FAIL, 228 WARN |
| QIL-22 corner | reject | WRONG | RESULT: 0 FAIL, 228 WARN |
| SOIC-40 corner | reject | WRONG | RESULT: 0 FAIL, 228 WARN |
| PLCC-19 corner | reject | WRONG | RESULT: 0 FAIL, 228 WARN |
| unknown pin1 value | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| PLCC-68 corner valid | accept | CORRECT | RESULT: 0 FAIL, 228 WARN |
| QIL-68 corner valid | accept | CORRECT | RESULT: 0 FAIL, 228 WARN |
| QIL-20 corner valid | accept | CORRECT | RESULT: 0 FAIL, 228 WARN |
| supply note number | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| supply note null | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| supply note emptyObject | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| supply note numberText | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| supply note emptyText | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| supply note emptyString | accept | CORRECT | RESULT: 0 FAIL, 215 WARN |
| supply note validString | accept | CORRECT | RESULT: 0 FAIL, 215 WARN |
| supply note validObject | accept | CORRECT | RESULT: 0 FAIL, 215 WARN |
| supply note arrayObject | reject | WRONG | RESULT: 0 FAIL, 215 WARN |
| supply note badVerify | reject | WRONG | RESULT: 0 FAIL, 215 WARN |
| supply note badConflict | reject | WRONG | RESULT: 0 FAIL, 215 WARN |
| notes is object | reject | WRONG | uncaught TypeError: (pw.supply.notes || []).entries is not a function or its return value is not iterable |
| scope shape | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope basis | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope missingRate | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope zeroF | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope negativeF | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope trailingF | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope infiniteF | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope zeroPeriod | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope trailingPeriod | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope mismatch | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope badVolts | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope trailingVolts | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope outOfRange | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope reversed | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope invertedFalse | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope invertedSquare | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope badSync | reject | CORRECT | RESULT: 2 FAIL, 215 WARN |
| scope syncPP | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope ppDC | reject | CORRECT | RESULT: 2 FAIL, 215 WARN |
| scope ppLevels | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope zeroPP | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope dcNoHigh | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope blackSquare | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope syncSquare | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope unequalSync | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope blackOutside | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope zeroDuty | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope hundredDuty | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope badDuty | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope badPolarity | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope noSource | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope badSource | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope scopeString | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| scope scopeArray | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| firstTen array | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| firstTen missingStep | reject | CORRECT | RESULT: 1 FAIL, 216 WARN |
| firstTen missingCheck | reject | CORRECT | RESULT: 1 FAIL, 216 WARN |
| firstTen missingWhere | reject | CORRECT | RESULT: 1 FAIL, 216 WARN |
| firstTen missingExpect | reject | CORRECT | RESULT: 1 FAIL, 216 WARN |
| clocks array | reject | CORRECT | RESULT: 1 FAIL, 218 WARN |
| clocks noName | reject | CORRECT | RESULT: 1 FAIL, 218 WARN |
| clocks noRate | reject | CORRECT | RESULT: 1 FAIL, 218 WARN |
| clocks zero | reject | CORRECT | RESULT: 1 FAIL, 218 WARN |
| clocks negative | reject | CORRECT | RESULT: 1 FAIL, 218 WARN |
| clocks malformed | accept | CORRECT | RESULT: 0 FAIL, 219 WARN |
| replacement array | reject | CORRECT | RESULT: 1 FAIL, 215 WARN |
| replacement noPart | reject | CORRECT | RESULT: 1 FAIL, 216 WARN |
| replacement badKind | reject | CORRECT | RESULT: 1 FAIL, 216 WARN |

## Every synthetic renderer / geometry case

| Case | Decision | Observed checks |
| --- | --- | --- |
| power_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| machine_verify | CORRECT | {"check":true,"conflict":false,"unverified":true} |
| pinExpect_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| print_supply_verify | CORRECT | {"check":false,"conflict":false,"unverified":true} |
| power_supply_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| print_note_verify | CORRECT | {"check":false,"conflict":false,"unverified":true} |
| power_note_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| print_rail_verify | CORRECT | {"check":false,"conflict":false,"unverified":true} |
| power_rail_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| machine_rail_verify | CORRECT | {"check":true,"conflict":false,"unverified":true} |
| pinExpect_rail_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| print_testPoint_verify | WRONG | {"check":false,"conflict":false,"unverified":false} |
| power_testPoint_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| machine_testPoint_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| pinExpect_testPoint_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| print_clock_verify | CORRECT | {"check":false,"conflict":false,"unverified":true} |
| power_clock_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| pinExpect_clock_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| print_step_verify | CORRECT | {"check":false,"conflict":false,"unverified":true} |
| power_step_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| pinExpect_step_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| scope_own_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| scope_parent_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| replacement_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| search_PROBE CLOCK_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| search_PROBE REPLACEMENT_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| print_replacement_verify | WRONG | {"check":false,"conflict":false,"unverified":false} |
| print_scope_verify | WRONG | {"check":false,"conflict":false,"unverified":false} |
| pin_scope_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| power_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| machine_conflict | CORRECT | {"check":true,"conflict":true,"unverified":false} |
| pinExpect_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| print_supply_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| power_supply_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| print_note_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| power_note_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| print_rail_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| power_rail_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| machine_rail_conflict | CORRECT | {"check":true,"conflict":true,"unverified":false} |
| pinExpect_rail_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| print_testPoint_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| power_testPoint_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| machine_testPoint_conflict | CORRECT | {"check":true,"conflict":true,"unverified":false} |
| pinExpect_testPoint_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| print_clock_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| power_clock_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| pinExpect_clock_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| print_step_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| power_step_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| pinExpect_step_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| scope_own_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| scope_parent_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| replacement_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| search_PROBE CLOCK_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| search_PROBE REPLACEMENT_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| print_replacement_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| print_scope_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| pin_scope_conflict | CORRECT | {"check":false,"conflict":true,"unverified":false} |
| index_UNIQUE CHIP_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| index_6510 pin 1  UNIQUE CHIP PIN_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| index_UNIQUE BASIC_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| index_UNIQUE KEY_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| index_UNIQUE CONNECTOR_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| index_UNIQUE CONNECTOR pin 1  UNIQUE CONNECTOR PIN_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| index_UNIQUE CLOCK_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| index_UNIQUE REPLACEMENT_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| boardGrid_verify | CORRECT | {"check":true,"conflict":false,"unverified":false} |
| print_connector_verify | CORRECT | {"check":true,"conflict":false,"unverified":true} |
| print_connector_pin_verify | CORRECT | {"check":true,"conflict":false,"unverified":true} |
| index_UNIQUE CHIP_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| index_6510 pin 1  UNIQUE CHIP PIN_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| index_UNIQUE BASIC_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| index_UNIQUE KEY_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| index_UNIQUE CONNECTOR_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| index_UNIQUE CONNECTOR pin 1  UNIQUE CONNECTOR PIN_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| index_UNIQUE CLOCK_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| index_UNIQUE REPLACEMENT_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| boardGrid_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| print_connector_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| print_connector_pin_conflict | WRONG | {"check":false,"conflict":false,"unverified":false} |
| ULA 68 pin sides compact=false flip=false | CORRECT | "1..17 left;18..34 bottom;35..51 right;52..68 top, mirrored below" |
| ULA 68 pin sides compact=false flip=true | CORRECT | "1..17 left;18..34 bottom;35..51 right;52..68 top, mirrored below" |
| ULA 68 pin sides compact=true flip=false | CORRECT | "1..17 left;18..34 bottom;35..51 right;52..68 top, mirrored below" |
| ULA 68 pin sides compact=true flip=true | CORRECT | "1..17 left;18..34 bottom;35..51 right;52..68 top, mirrored below" |

## Every existing flagged record

| Record | Decision | Path decisions |
| --- | --- | --- |
| power.bbcb.rails.3 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.bbcb.clocks.10 | CORRECT | power: CORRECT; print: CORRECT |
| power.bbcb.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.bbcmaster.rails.2 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.bbcmaster.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.bbcmaster.clocks.8 | CORRECT | power: CORRECT; print: CORRECT |
| power.bbcmaster.clocks.11 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc464.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc464.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc464.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc464.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc664.rails.1 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.cpc664.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc664.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc664.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc664.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc6128.rails.1 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.cpc6128.testPoints.5 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.cpc6128.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc6128.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc6128.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.cpc6128.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.apple2.clocks.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.apple2.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.apple2plus.clocks.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.apple2plus.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.apple2e.rails.0 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.apple2e.clocks.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.apple2c.rails.0 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.apple2c.rails.4 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.apple2c.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.apple2c.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.apple2c.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.apple2c.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.disk2.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.disk2.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.disk2.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.disk2.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.duodisk.rails.1 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.duodisk.rails.2 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.duodisk.clocks.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.duodisk.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.duodisk.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.duodisk.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.duodisk.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.duodisk.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.duodisk.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.unidisk525.testPoints.3 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.unidisk525.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.unidisk525.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.unidisk525.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.unidisk525.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.unidisk525.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.unidisk525.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.unidisk525.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.unidisk525.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari400.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari400.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari400.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari400.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari400.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari400.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari400.clocks.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari400.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800.clocks.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari600xl.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari600xl.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari600xl.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari600xl.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari600xl.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari600xl.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari600xl.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari600xl.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800xl.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800xl.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800xl.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800xl.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800xl.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari800xl.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari130xe.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari130xe.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari130xe.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari130xe.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari130xe.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.atari130xe.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.colecovision.rails.0 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.colecovision.rails.1 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.colecovision.rails.2 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.colecovision.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.colecovision.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.colecovision.clocks.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.colecovision.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.adam.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.adam.clocks.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.adam.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.adam.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.adam.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.adam.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.c16.rails.0 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.c16.clocks.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.c16.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.c16.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.plus4.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.c64.rails.0 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.c64.testPoints.7 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.c64.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.c64.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.c64.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.c64.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.c64.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.c64.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.c64.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.c64.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.vic20.testPoints.0 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.vic20.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.vic20.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.vic20.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.vic20.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.vic20.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.vic20.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.vic20.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.vic20.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.pet.testPoints.3 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.pet.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.pet.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.pet.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.pet.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.pet.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.pet.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.c128.clocks.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.c128.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.c128.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.c128.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.c128.clocks.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.c128.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.c128.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.c128.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1541.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1541.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1541.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1541.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1541.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1541.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1541.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1571.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1571.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1571.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1581.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.c1581.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.testPoints.0 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.dragon32.clocks.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon32.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon64.rails.3 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.dragon64.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon64.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon64.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon64.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon64.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon64.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.dragon64.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.hero1.rails.2 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.hero1.rails.3 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.hero1.rails.4 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.hero1.rails.6 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.hero1.rails.7 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.hero1.testPoints.0 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.hero1.clocks.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.hero1.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.hero1.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.hero1.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.hero1.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.hero1.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.herojr.rails.1 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.herojr.rails.3 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.herojr.rails.4 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.herojr.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.herojr.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.herojr.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.herojr.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.herojr.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.hero2000.rails.0 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.hero2000.rails.1 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.hero2000.rails.2 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.hero2000.rails.3 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.hero2000.testPoints.0 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.hero2000.clocks.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.hero2000.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.pc5150.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.xt5160.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.xt5160.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.xt5160.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.xt5160.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.xt5160.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.portable5155.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.portable5155.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.portable5155.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.portable5155.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.portable5155.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.pcjr.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.pcjr.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx1.rails.3 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.msx1.testPoints.2 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.msx1.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx1.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx1.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx1.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx1.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx1.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx1.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx2.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx2.clocks.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx2.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx2.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx2.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.msx2.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.zx80.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.zx80.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.zx81.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.zx81.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.zx81.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.zx81.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.zx81.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.zx81.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.zx81.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum128.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum128.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum128.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrum128.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrumplus3.clocks.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrumplus3.clocks.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.spectrumplus3.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.coco2.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.coco3.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.coco3.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.coco3.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.mc10.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.model4.testPoints.2.scope | WRONG | scope: CORRECT; print: WRONG |
| power.model4.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.ti994a.clocks.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.ti994a.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.ti994a.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.ti994a.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.rails.0 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.ts1000.rails.1 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.ts1000.rails.2 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.ts1000.testPoints.0 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.ts1000.testPoints.1 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| power.ts1000.testPoints.1.scope(parent) | CORRECT | scope: CORRECT |
| power.ts1000.clocks.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.clocks.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.clocks.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.firstTen.0 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.firstTen.1 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.firstTen.2 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.firstTen.3 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.firstTen.4 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.firstTen.5 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.firstTen.6 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1000.firstTen.7 | CORRECT | power: CORRECT; print: CORRECT |
| power.ts1500.rails.0 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.ts1500.rails.1 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.ts1500.rails.2 | CORRECT | power: CORRECT; print: CORRECT; machine: CORRECT |
| power.ts2068.testPoints.11 | WRONG | power: CORRECT; print: WRONG; machine: CORRECT |
| chips.vidproc.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.vidproc.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.serproc.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.serproc.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.saa5050.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ga40007.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.rom23256.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.fdc765.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.fdc765.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.cpu6502.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.cpu6502.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.mc3470.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ca3146.replacements.2 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ls259.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ls259.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ls174.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.antic.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.antic.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.gtia.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.gtia.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.pokey.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.freddie.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.cpu7501.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ted7360.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.dram4164.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.cpu6510.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.cpu6510.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.vic2.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.sid6581.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.sid6581.replacements.3 | WRONG | replacement: CORRECT; print: WRONG |
| chips.cia6526.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.cia6526.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.vic2e.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.rom-dragon32-basic.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.rom-dragon64-basic.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.msm5832.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.sc02.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.cpu8088.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.pic8259.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.fpu8087.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.crtc6845.replacements.2 | WRONG | replacement: CORRECT; print: WRONG |
| chips.crtc6845.replacements.3 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ula10017.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ula_zx81.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.rom_zx81.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ula_spectrum.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ula_spectrum.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.ula_spectrum.replacements.2 | WRONG | replacement: CORRECT; print: WRONG |
| chips.sam6883.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.gime-tcc1014.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.cg-mcm6670.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.fdc1771.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.fdc1793.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.vdp9918.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.psg76489.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.psg76489.replacements.1 | WRONG | replacement: CORRECT; print: WRONG |
| chips.grom0430.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
| chips.sram6810.replacements.0 | WRONG | replacement: CORRECT; print: WRONG |
