---
name: compliance-guardrails
description: Boundaries that keep Pulse an unlicensed technology provider while licensed partners do regulated activity. Load BEFORE designing, building or reviewing any feature that touches funds, FX, stablecoins, accounts, cards, KYC/KYB, customer PII, marketing copy or customer T&Cs. Also load when writing partner due-diligence questions. Not legal advice. Structures must be confirmed with UK, US and Zambian counsel.
---

# Compliance guardrails (tech provider, not money transmitter)

Pulse's model: **the licensed partner is the regulated party in every money flow.** Pulse provides the software, UX, orchestration and support tooling. If a design breaks any rule below, stop and raise it. Do not code around it.

## The boundary rules
1. **Flow of funds never touches Pulse.** No Pulse-owned bank account, wallet, omnibus or "for benefit of" account sits in the payment path. Customer funds sit with the partner (safeguarded, trust or FBO accounts at the partner).
2. **No keys.** Pulse never generates, stores or co-signs keys for customer stablecoin wallets. Custody is the partner's, via partner APIs or MPC under the partner's licence.
3. **Partner is payer/merchant of record and contracting party** for the regulated service. Customer T&Cs for the payment, account or card are with the licensed entity. Pulse's own T&Cs cover only the software.
4. **KYC/KYB, sanctions, AML monitoring and travel rule are the partner's legal obligations.** Pulse may collect data in its UI and pass it to the partner (hosted or embedded flows preferred), but decisions to onboard, block, hold or file reports are the partner's. Pulse must not "approve" anyone.
5. **Pulse does not set or hold FX positions.** Quotes come from the partner. Any Pulse markup is a disclosed fee, collected per the partner contract (e.g. the partner splits the fee). Pulse never nets customer money.
6. **Ledger ≠ custody.** Pulse's internal ledger mirrors partner state for UX and reconciliation. The partner's records are authoritative. Label balances "held with <Partner>".
7. **Marketing and UI language.** Never claim Pulse is a bank or that money is "deposited with Pulse". Don't promise insurance, interest or yield. Don't make "guaranteed" speed claims. Show the regulated-entity disclosure on every money screen and in footers. UK crypto financial-promotion rules apply to anything mentioning stablecoins to UK users, so get partner and lawyer sign-off on copy.
8. **Stablecoins are plumbing, not a product.** Default UX is fiat in and fiat out. Users holding stablecoin balances, or Pulse offering crypto products, would move us into VASP/cryptoasset regimes. That is out of scope unless a partner provides it under their licence and counsel signs off.
9. **Data protection.** Pulse is a data controller for app data (UK GDPR, Zambia Data Protection Act 2021, US state laws). Minimise PII, encrypt at rest, keep a data map, sign DPAs with each partner, and check Zambian localisation and registration requirements.
10. **Complaints and disputes** route to the partner per contract. Pulse runs first-line support only.

## Feature checklist (run it on every money or PII feature, and paste the result into the PR)
- [ ] Which licensed partner performs each regulated step, and under which licence and jurisdiction?
- [ ] Does any money or crypto touch a Pulse-controlled account or key? (Must be **no**.)
- [ ] Who is the customer's contracting party for this service? Is it shown in the UI?
- [ ] Is KYC/KYB tier gating enforced by the partner's status, not by a Pulse flag?
- [ ] Are fees and FX disclosed before confirmation, with the partner quote ID stored?
- [ ] Is PII minimised, encrypted, and limited to what the partner requires?
- [ ] Is the copy free of "bank", "deposit", "guaranteed", "insured" and "earn"?
- [ ] Are limits, holds and failures surfaced honestly in the UI?
- [ ] Is this a new jurisdiction or product type? If so, an ADR plus a lawyer question is needed.

## Escalate to a human (founder or counsel) when
- A partner suggests Pulse "hold funds briefly", "settle to your account", or act as their agent or distributor.
- A feature needs Pulse to make a KYC decision, freeze funds or file a report.
- Anything involving yield, lending, credit, insurance or users holding crypto.

## References
- `references/regulatory-map.md`: per-jurisdiction notes and questions for lawyers (researched; verify before relying on it).
