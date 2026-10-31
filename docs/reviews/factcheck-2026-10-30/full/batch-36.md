| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 29 | 27 | 2 | 0 |
| connector-pin | 235 | 231 | 2 | 2 |
| clock-row | 15 | 5 | 0 | 10 |
| rail | 2 | 2 | 0 | 0 |
| replacement-modern | 1 | 1 | 0 | 0 |
| **Total** | **282** | **266** | **4** | **12** |

Every item has a decision and evidence in the [batch-36 ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-36-ledger.md).

1. **HIGH — Items 152, 157: +3 joystick pins 2 and 8 are incorrectly classified as ground.** They are scanned keyboard commons, not fixed 0 V. Remove `type: ground` and the `0 V` expectation. Using either as a probe ground can hold the scan line low. The connection is shown on [service-manual circuit page 19](https://k1.spdns.de/Vintage/Sinclair/86/ZX%20Spectrum%2B3/Repair/Service%20Manuals/Service%20Manual%20%2B2A%2C%20%2B3A/zx_spectrum_128_plus_3_service_manual_19.PNG). Maps to **prove-it-works**, **fix-root-causes**.

2. **HIGH — Items 0, 1: Oric ULA names are swapped.** Pin **1 is MUX**; pin **2 is MA5**. Their descriptions already describe those respective functions, creating contradictory probing guidance. Pin 1 drives the external multiplexers’ select inputs; pin 2 drives an address input. See [Oric Owner 5, PDF pages 44–45](https://library.defence-force.org/books/content/oric_owner/OricOwner_05.pdf#page=44). Maps to **prove-it-works**, **fix-root-causes**.

Unavailable or conflicting source links:

- Nine archive URLs were blocked or refused connections: Oric schematic sheets 1/2 and ULA/expansion/keyboard wiki pages; CPCWiki FDC/CRTC/Gate Array/PAL16L8 pages. Exact URLs and recovery locations are recorded in the ledger. The schematics and CPCWiki documents were recovered from mirrors; these failures do **not** establish permanently dead links.
- The [Atmos manual, printed page 285](https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=290) reverses the red/blue socket labels relative to both circuit schematics. Items 78/80 follow the schematic evidence.

The 12 unverifiable items have specific unsupported subclaims documented individually. No data files were changed; no physical board was tested.