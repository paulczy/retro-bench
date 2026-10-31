| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 113 | 106 | 7 | 0 |
| connector-pin | 98 | 94 | 0 | 4 |
| clock-row | 2 | 0 | 0 | 2 |
| first-ten | 4 | 0 | 1 | 3 |
| rail | 7 | 6 | 1 | 0 |
| **Total** | **224** | **206** | **9** | **9** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-11-ledger.md)

1. **High — Items 0–1: GLU signal names are swapped.** Pin **1 is 14M**, the 14.318 MHz clock input; pin **2 is A0**, the address input. The current names send a technician to the wrong pin. [IIc TRM, p. 246](https://archive.org/details/Apple_IIc_Technical_Reference_Manual/page/n273).

2. **Medium — Items 137–138: ROM enables are separate nets.** MMU pins **19 /ROMEN2** and **20 /ROMEN1** serve separate ROM ranges. The reference table’s “tied” wording conflicts with the cited board schematic and Sather’s functional diagram. Remove the tied-together claim. [Schematic, PDF p. 2](https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/Computers/Apple%20II/Apple%20IIe/Schematics/Apple%20IIe%20-%20Schematics%20050-0051-D.pdf#page=2), [Sather, p. 5-31](https://archive.org/details/Understanding_the_Apple_IIe/page/n136).

3. **Medium — Items 139 and 161: MD7 direction is wrong.** MMU pin **21** and IOU pin **9** are shown as **tri-state status outputs**, not bidirectional pins. Sharing a bidirectional CPU bus does not establish an input function. [Sather, p. 5-30](https://archive.org/details/Understanding_the_Apple_IIe/page/n135), [p. 7-4](https://archive.org/details/Understanding_the_Apple_IIe/page/n171).

4. **Medium — Item 185: blanking polarity is reversed.** IOU pin **38 goes HIGH during blanking**, outside the active display; it goes LOW during active video. [Sather, p. 8-11](https://archive.org/details/Understanding_the_Apple_IIe/page/n216).

5. **Medium — Item 111: −5 V is not “slots only.”** It also supplies the internal video connector, pin **3**, and motherboard video circuitry. [IIe TRM, p. 186](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n219).

6. **Medium — Item 113: supply cycling does not prove a short.** The manual also identifies **out-of-range supply voltage** as a restart trigger. The diagnostic instruction must include supply/regulation faults. [IIe TRM, p. 160](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n193).

These findings map to **prove-it-works** and **fix-root-causes**. No shared-state mutation finding applies.

**Dead or wrong source links:** No dead documents. Items **49–51** need converter specifications at **IIc p. 234**, rather than IWM pinouts. Item **72** lacks a citation supporting its controller-card drive limit. Items **45–46** assert more frequency precision than their source supplies. Items **194–197** lack documentary support for the cassette contact assignments; item 194 also assumes peak-to-peak voltage.

Only `.factcheck-tmp/` was written; live data was not modified.