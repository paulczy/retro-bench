| Kind | Items | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| chip-pin | 53 | 49 | 3 | 1 |
| clock-row | 5 | 4 | 1 | 0 |
| connector-pin | 159 | 159 | 0 | 0 |
| first-ten | 4 | 1 | 0 | 3 |
| rail | 4 | 3 | 1 | 0 |
| **Total** | **225** | **216** | **5** | **4** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/full/batch-24-ledger.md)

1. **High — i=0,1: SSI 263A pin names swapped.** Pin **1 is AO**, the audio output; pin **3 is TP1**, “do not use.” The descriptions match their pin numbers, but the names direct technicians incorrectly. [SSI data book, pp. 1-42, 1-45](https://bitsavers.org/components/siliconSystems/_dataBooks/1985_Silicon_Systems_Data_Book.pdf#page=53). Maps to **prove-it-works**.

2. **Medium — i=51: DRQ incorrectly routed to NMI.** On the Model III, **DRQ clears CPU wait**; **INTRQ generates the end-of-transfer NMI**, subject to enable. [Model III manual, pp. 45–46](https://archive.org/download/Model_III_Technical_Reference_Manual_1981_Tandy/Model_III_Technical_Reference_Manual_1981_Tandy.pdf#page=56). Maps to **fix-root-causes**.

3. **Medium — i=57: Timer clock ignores selection state.** 8253 **CLK1 pin 15** receives **1.1925 MHz when port A0 bit 5=0**, but **timer 0’s output when bit 5=1**. [PCjr TechRef, p. 2-35](https://bitsavers.org/pdf/ibm/pc/pc_jr/PCjr_Technical_Reference_Nov83.pdf#page=61). Maps to **prove-it-works**.

4. **Medium — i=224: Transformer test names the wrong measurement location.** Measure **15–30 VAC across pins 1 and 3 of the disconnected transformer cable plug**, with the system switch off. The system’s socket P is the wrong endpoint. [IBM HMS, p. 3-020-8](https://minuszerodegrees.net/manuals/IBM/IBM%204860%20(PCjr)%20-%20Hardware%20Maintenance%20and%20Service%20-%20SEP83.pdf#page=62). Maps to **prove-it-works**.

All five document links are live. **i=224 cites the wrong document for its HMS test**; **i=217 omits the HMS citation** supporting its attributed diskette-connector test. The four unverifiable items—50, 217, 219, 220—have exact limitations recorded in the ledger.