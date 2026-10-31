# Skeptic fact-check report

Full coverage: **117 conditions on 28 machines**, plus four glossary entries. Every cited document was retrieved; relevant PDF pages were rendered and read, with enlarged scan details retained. See [ledger](ledger.md) for individual readings and file/page evidence. `src/` was not edited.

| Scope | OK | WRONG | OVERSTATED | UNPROVABLE |
|---|---:|---:|---:|---:|
| Conditions | 99 | 5 | 13 | 0 |
| Glossary | 2 | 0 | 2 | 0 |
| Total | **101** | **5** | **15** | **0** |

Findings, ranked by severity:

1. **High — wrong measurement pin, three records.** `pc5150`, `xt5160`, `portable5155`, condition 2: IBM MAP 0020 step 005 specifies Power Good between **pins 1 and 5**, not 3 and 5. [MAP PDF p.4](src/2d35cccbb27d.pdf#page=4).

2. **High — incorrect supply/probe settings.** `spectrum` condition 4 changes the manual's **9 V** bench setting to 12 V. `spectrum128` condition 3 changes **×10** to ×1. [Spectrum p.18](src/c5c852cc9d0b.pdf#page=18), [128 p.31](src/6dde3ad812c4.pdf#page=31).

3. **Medium — five unsupported zero-baseline claims.** `c64:3`, `c128:4`, `atari400:4`, `ti994a:3`, `ts2068:3` turn Sams's stated DC reference at the bottom line into a universal 0 V line. Preserve each waveform's stated reference.

4. **Medium — altered procedure conditions.** Three IBM condition-1 rows omit the expansion-unit exception. PC condition 6 loses the **minimum** 100 ms delay qualification. PCjr condition 2 adds measurement at the fan connector. Spectrum 128 condition 1 assumes successful initialisation, although basic checks address failure to initialise.

5. **Medium — glossary diagnosis exceeds TI.** All four entries use the correct SN74LS00 thresholds: VIL maximum **0.8 V**, VIH minimum **2 V**. TI p.4 does not establish that intermediate readings mean floating/contention, or support the pulsing entry's categorical meter advice. [TI p.4](src/b67ff7d6068d.pdf#page=4).

6. **Lower — applicability broadened.** Apple II Plus condition 3 imports a 1978 Apple II supply minimum without establishing Plus applicability. Model III condition 6 extends the ripple-column resistive-load footnote to all table limits.

Repeated meter/ground/probe instructions are present in the machine manuals. No measured condition was identified as unsupported generic bench advice or as requiring the forbidden toolboxes. This does not prove the author's source history.
