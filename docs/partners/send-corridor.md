# Partner research: UK/US → Zambia send corridor (stablecoin sandwich)

Desk research as of **23 Nov 2026**. Most vendor and regulator sites were blocked during research, so facts come from **search-engine extracts of the linked URLs**. "[U]" = unverified. Confirm all fees, licences and coverage with each partner in writing.

## Comparison
| Provider | Leg | Zambia coverage | Licences | API / white-label | Settlement | Fees / minimums |
|---|---|---|---|---|---|---|
| **Bridge (Stripe)** | On-ramp | n/a | US state MTLs [U]. OCC *conditional* trust charter approval 12 Feb 2026; final approval [U] | REST API, virtual accounts, GBP via FPS for customers in 100+ countries. **Developer fee** per transaction for platforms | FPS near-instant | Off-ramp minimum £3. Pricing via sales |
| **Zero Hash** | On-ramp | n/a | FinCEN MSB, MTLs in 51 US jurisdictions, NYDFS BitLicense, Dutch EMI/MiCA. UK status [U] | API. Proven **B2B2C remittance** model (Félix) | [U] | Not public |
| **Circle Mint** | On-ramp | No Zambia corridor on Circle's payments network (CPN) found | Circle | Institutional only. GBP added Aug 2026 | Same-day [U] | ~$100k/month in practice [U] |
| **BVNK** | On-ramp (UK) | Africa [U] | FCA EMI (GBP e-money only); crypto not FCA-regulated; Malta crypto licence | API GBP/EUR/USD ↔ stablecoin | [U] | Not public |
| Transak / MoonPay | On-ramp | n/a | Mixed | Widget; white-label on-ramp only | Card speed | ~1–5.5% consumer [U] |
| **Yellow Card** | Off-ramp (+ treasury) | Zambia listed: mobile money and bank payouts | US MSB; Botswana, Poland and South Africa licences. **Zambia licence [U]**. Joined Circle's payments network Apr 2025 | B2B API (docs.yellowcard.engineering); retail app closed | Mobile money "instant"; bank via clearing | ZM mobile money 1.5% (min ZMW 1); bank 0.5% on ZMW 25k–1M (min ZMW 125); mobile money limit ZMW 100–20,000 per transaction |
| **Flutterwave** | Off-ramp | Payout docs list MTN, Airtel, Zamtel and bank | BoZ Payment System licence (Feb 2025, per a separate source); CPN member | API with sandbox; **requires prefunded ZMW** | [U] | Not public |
| **Kotani Pay** | Off-ramp | Zambia MTN; BoZ approval "pursuing" | South Africa crypto licence (2024) | API (USDC/USDT) | [U] | [U] |
| HoneyCoin | Off-ramp | Claims MTN and Airtel | Canada and US MSB, EU crypto licence | API | [U] | [U] |
| Eversend | Off-ramp | Airtel Money from USDC | [U] | API | [U] | [U] |
| Onafriq | Off-ramp | MTN and Airtel partnerships; Zambia [U] | [U] | Disbursement API; USDC settlement | Real-time (claim) | — |
| Lenco | Fiat payout backup | Zambian entity; Airtel, MTN and Zamtel | [U] | API with sandbox | — | — |
| **Conduit** | End-to-end | Zambia **not confirmed** (Africa reached via Onafriq) | US and Canada MSB | B2B API | — | — |
| **Borderless** | End-to-end | 50+ countries; Zambia [U] | Via local partner institutions | REST API | — | — |
| stables.money | End-to-end | Claims USDT → ZMW mobile money and bank | [U] | API | Rate locked at quote | — |

No Zambia evidence found for Thunes, Cellulant (collections only, no stablecoin), Chipper (may be stale), Fonbnk, Juicyway, Busha, Kyshi or Mara. Paxos and Banking Circle are too heavy for this stage.

## Provisional shortlist
- **On-ramp:** Bridge (GBP and USD, platform developer fee) → Zero Hash (US licences, B2B2C remittance) → BVNK (UK GBP) or Circle Mint at volume.
- **Off-ramp:** **Yellow Card** (published Zambia fees and limits) → Flutterwave (all 3 mobile-money networks plus bank, needs prefunding) → Kotani Pay or HoneyCoin for redundancy.
- **Pragmatic pairing:** **Bridge + Yellow Card**. Ask Conduit and Borderless to demonstrate a live ZMW corridor.
- **Top risk:** the off-ramp's BoZ VASP registration or licence. Since 30 Mar 2026, BoZ-regulated banks may not deal with unregistered virtual-asset providers.

## Due-diligence questions (send to every send-corridor partner)
1. Your BoZ registration or licence number (27 Mar 2026 deadline; Sep 2026 Directives)? If you rely on a Zambian partner, which one and under what licence?
2. Live Zambian rails (MTN, Airtel, Zamtel, banks, ZIPSS)? Success rate, p50 and p95 payout time, cut-offs?
3. Are you merchant of record and licensed remitter to the end user? Can we operate as your unlicensed tech platform, agent or program manager in the UK and in every US state?
4. Who does KYC and sanctions screening on senders and recipients? Can it be reused, and who owns the records?
5. All-in price breakdown (fee, FX spread over the BoZ mid-rate, gas)? Is the quote firm, and for how long?
6. Prefunding or float requirements (USDC vs ZMW), minimums, top-up speed?
7. Limits per transaction, day and month per recipient?
8. Failed payouts, reversals, wrong numbers: refund path and timing, and who bears the FX loss?
9. Chains and stablecoins supported; custody between legs; segregation and bankruptcy-remoteness of funds?
10. UK: FCA status today and your plan for the regime in force from Oct 2027? Do the 24h cooling-off and financial-promotion rules apply to our users?
11. US: MTL coverage by state? Who handles Reg E remittance disclosures and error resolution?
12. Sandbox with simulated Zambian mobile-money responses, webhooks and idempotency keys?
13. SOC 2, proof of reserves, last regulator inspection? Any enforcement or de-banking events in Zambia?
14. Exclusivity, volume commitments, termination, and what happens to our users if you lose your Zambian licence?
15. ZMW liquidity source, and how you handled kwacha volatility and BoZ FX measures?

**Possibly stale or weak:** Flutterwave's network list, Chipper Zambia, Zero Hash UK status, Bridge's final charter, Circle's minimum, consumer fee ranges.
