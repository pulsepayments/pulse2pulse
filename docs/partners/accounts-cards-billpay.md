# Partner research: virtual accounts, cards, mobile money and bill pay (Zambia)

Desk research as of **23 Nov 2026**. **[U] = unverified.** Some hosts (Maplerad help, Bridge API docs, Currencycloud support, Flutterwave dev docs, zambialii) were blocked during research, so confirm in writing with each partner. Public information only, no contract terms.

## 1. Virtual accounts (USD / GBP / EUR, and ZMW)
| Provider | Offer | Zambian holders? | Model and constraints |
|---|---|---|---|
| **Bridge (Stripe)** | USD ACH/wire and EUR SEPA accounts that settle in stablecoin | Serves "most non-OFAC countries" in tiers. Zambia's tier is [U]. A Bridge-based product (VaultLeap) lists Zambia. | Partner API, with KYC done by Bridge. EUR requires a sales conversation. https://apidocs.bridge.xyz/get-started/guides/move-money/virtualaccounts |
| **Fincra** | USD/GBP/EUR (and CAD) accounts via API; collections in 30+ African currencies | Zambia not named [U] | Personal foreign-currency accounts are in the individual's name. EUR is for individuals only. Limit is 10k/month per account. https://docs.fincra.com/docs/request-fcy-virtual-account |
| **Grey** | USD/GBP/EUR accounts, cards, payouts | Says Zambians can open accounts (its consumer app) | Using it for our own users needs case-by-case approval. More competitor than infrastructure. https://grey.co/legal/business-acceptable-use-policy |
| **Graph** | USD business accounts and cards for African SMEs (Graph Connect) | [U] | https://partners.circle.com/partner/graph |
| **Currencycloud (Visa)** | Named multi-currency accounts | Zambia appears in its permitted-jurisdiction table, but the client type is [U] | One client type lets unregulated companies serve customers under Currencycloud's coverage |
| **Maplerad** | Cards, collections, payouts in 25+ countries | Zambia not confirmed [U] | |
| Banking Circle, Modulr/ClearBank, Column, Lead, Cross River | UK/EU/US banking-as-a-service | Unlikely for Zambian consumers [U] | |

**ZMW wallets** require a BoZ-designated e-money issuer, or a partnership with one (a bank or mobile network operator). Yellow Card and DusuPay list ZMW collections and payouts.

## 2. Cards (USD)
| Provider | Offer | Africa / Zambia | Notes |
|---|---|---|---|
| **Bridge + Visa** | Stablecoin-linked Visa cards | Live in 18 countries (Mar 2026); Africa targeted for end of 2026 [U] | https://corporate.visa.com/en/sites/visa-perspectives/press-releases/visa-bridge-stablecoin-linked-card-expansion.html |
| **Rain** | Stablecoin card issuing. Visa member; Mastercard Principal Member since May 2026 | Plans for Africa [U] | |
| **Scale + Mastercard** | Single-integration card issuing with regulatory support | **Includes Zambia** (Mar 2026) | https://techcabal.com/2026/03/26/scale-partners-with-mastercard-to-simplify-card-issuance-across-five-african-markets/ |
| **Bitnob** | Virtual USD cards via API (pre-approval). $1 to issue; top-up fee $1 or 1% | Country list [U] | https://docs.bitnob.com/docs/virtual-card |
| **Kulipa** | Stablecoin card program manager | Conflicting reports on whether it is operating, so check its status | |
| **Union54** (Lusaka) | Issuing API | Halted after chargeback fraud; current status [U] | Cautionary tale on BIN-sponsor risk |
| Sudo Africa, Maplerad | Card APIs | No evidence of Zambia | |
| Marqeta, Stripe Issuing | Card issuing | Not viable for Zambian residents [U] | |

## 3. Mobile money, payouts and bill pay in Zambia
| Provider | Offer | Notes |
|---|---|---|
| **Flutterwave** | BoZ Payment System licence (Feb 2025). Mobile money and card collections and payouts | Bill-pay [U] |
| **Lipila** | Zambian gateway: MTN, Airtel and Zamtel collections and disbursements, cards, bank. Has a sandbox | Bill-pay [U] |
| **Cellulant (Tingg)** | One API. Powers ZESCO and 5 water utilities; pay-TV via Zanaco | Strongest documented utility coverage |
| **Kazang** (Lesaka) | Airtime, ZESCO, DStv/GOtv via 12k+ terminals | No public API; sales contact needed |
| **Sampay** | Claims APIs incl. ZESCO and ZRA [U] | |
| **MTN MoMo API** | Collections and disbursements | Country KYC plus contract required; manual production keys |
| **Airtel Money Open API** | Collections and disbursements | Zambia coverage [U] |
| **Zoona** | Remittance receive (with Western Union and Chipper, Jul 2025) | |

## Provisional shortlist
- **Virtual accounts:** Bridge (USD/EUR; get Zambia tier in writing) → Fincra as alternative (adds GBP). Clarify Currencycloud.
- **Cards:** Scale + Mastercard for a Zambia-local program. Rain or Bridge-Visa for stablecoin USD cards once Zambia is live. Bitnob as an interim option.
- **Payouts and payment links:** Lipila or Flutterwave. **Bills:** Cellulant Tingg, with Kazang or Sampay as fallback. Go direct to MTN/Airtel later.

## Key risks
1. BoZ designation and licensing perimeter for the front-end (see `regulatory-map.md`).
2. Currency Directives 2025: domestic payroll, bills and invoices must settle in ZMW.
3. BIN sponsor reserves and chargeback liability (Union54 lesson).
4. KYC on NRC (National Registration Card) documents; Zambia flagged as higher risk by US/EU providers; source-of-funds checks.
5. Stablecoin counterparty risk and the BoZ VASP regime for partners.
6. The mobile money levy adds to payout cost.
