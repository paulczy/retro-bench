| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| connector-pin | 227 | 207 | 9 | 11 |
| chip-pin | 57 | 0 | 57 | 0 |
| clock-row | 29 | 17 | 1 | 11 |
| first-ten | 22 | 14 | 2 | 6 |
| rail | 9 | 8 | 0 | 1 |
| scope | 7 | 5 | 0 | 2 |
| replacement-modern | 1 | 1 | 0 | 0 |
| **Total** | **352** | **252** | **69** | **31** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-27-ledger.md). Item numbers below are the JSON’s zero-based `i` values.

1. **High — Wrong cassette probe pin (117).** ULA pin 59 connects through C7 to **LM324 pin 1**, not pin 14. Pin 14 belongs to an earlier amplifier stage. [Electron Service Manual, printed p.32 / PDF p.38](https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf#page=38).

2. **High — Swapped AC labels (0, 2).** Electron expansion pin **1 is 18V AC**; pin **3 is AC RETURN**. The records label them oppositely. [Acorn AN015, p.3](https://chrisacorns.computinghistory.org.uk/docs/Acorn/AN/015.pdf#page=3).

3. **High — Reset direction reversed (300).** The ADAM expansion table identifies pin 34 as **GAME MODE RESET output**, not an external reset input that a module may drive. [ADAM TRM, PDF p.20](https://colecovisionadam.com/Coleco/adam/Documents/Manual/Coleco_ADAM_Technical_Reference_Manual.pdf#page=20).

4. **Medium — Wrong ULA package in 57 records (69–125).** The manual specifies a **68-pin quad-in-line package**, not `PLCC-68`. Correct the shared package definition. [Electron Service Manual, printed p.8 / PDF p.14](https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf#page=14).

5. **Medium — Wrong ADAM video chip (193).** The source identifies a **TI 9928**, not TMS9918A. It supports approximately **10.7 MHz**, but does not establish the quoted 10.738635 MHz precision. [ADAM TRM, PDF pp.33–35](https://colecovisionadam.com/Coleco/adam/Documents/Manual/Coleco_ADAM_Technical_Reference_Manual.pdf#page=33).

6. **Medium — Independent clock overlooked (60).** “Every other clock” does not derive from the BBC’s 16 MHz oscillator. PAL colour uses the separate **Q10/X2 oscillator**, divided by IC46. [BBC Service Manual, printed p.19 / PDF p.29](https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_BBCSMOct85_Sec1.pdf#page=29).

7. **Medium — Spinner A/B names reversed (227, 229, 267, 269).** The cited controller reference calls **pin 7 quadrature A** and **pin 9 quadrature B**. The records reverse those names; the D5 and interrupt roles remain supported. [Deathskull controller reference](https://arcarc.xmission.com/Web%20Archives/Deathskull%20%28May-2006%29/games/tech/cvcont.html).

8. **Medium — Keyboard failure pattern overstated (156, 157).** A failed return does not remove a key from every column: **KBD2 has no A0 key**, and **KBD3 has no A2 key**. [Electron keyboard matrix, printed p.39 / PDF p.45](https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf#page=45).

9. **Medium — Power-disconnection step omitted (177).** Before feeling for a hot component, the source explicitly says to **disconnect the power supply**. Restore that condition. [Electron Service Manual, printed p.10 / PDF p.16](https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf#page=16).

These findings map to **prove-it-works**; repeated package and controller-label errors also map to **fix-root-causes**. No shared-state mutation finding applies.

**Dead or wrong source links:** None of the 18 URLs were dead; all downloaded successfully. Item **56** cites a [BBC A/B manual](https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_BBCSMOct85_Sec1.pdf#page=19) for a **BBC Master** claim. Item **188** omits its supporting AUG citation and misidentifies the high-tone text’s printed page: it is **212**, not 213. Item **278** mentions a redraw net name without citing that redraw.

All 352 decisions are recorded. No source data was changed; the 31 unverifiable records retain specific evidence gaps in the ledger.