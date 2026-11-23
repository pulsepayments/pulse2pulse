---
name: product-modules
description: Specs for Pulse's product modules - Send (UK/US→Zambia stablecoin sandwich), Virtual accounts (receive), Virtual cards, Payroll (bulk payouts), Agentic invoicing, Bill pay. Load when designing, planning, building or estimating any of these features, or deciding what Pulse vs the partner owns in a flow. Read only the module file you need.
---

# Product modules

Priority order: **Send** is the MVP and the reason the product exists. The other modules come later, in this order: Accounts → Cards → Payroll / Invoicing / Bills. Each reuses the same primitives: partner adapters, ledger, intent state machine, KYC tier, recipients and notifications.

| Module | File | Partner capability | Phase |
|---|---|---|---|
| Send | `modules/send.md` | onramp + offramp/payout (or end-to-end) | MVP |
| Virtual accounts | `modules/virtual-accounts.md` | BaaS / named accounts | 2 |
| Virtual cards | `modules/cards.md` | card issuer + BIN sponsor | 3 |
| Payroll | `modules/payroll.md` | bulk payout | 4 |
| Invoicing (agentic) | `modules/invoicing.md` | payment links / virtual accounts | 4 |
| Bill pay | `modules/bills.md` | biller aggregator | 4 |

Shared primitives (build once):
- **Identity**: the user, a KYC tier mirrored from the partner, and businesses (KYB).
- **Recipients**: bank (bank, branch, account) or mobile money (MSISDN plus network), with name-check where the partner supports it.
- **Intent**: a generic money-movement intent with a state machine and timeline (see the `provider-adapter` skill).
- **Ledger**: double-entry mirror per user, account and currency.
- **Notifications**: push, email, SMS and WhatsApp for every state change. Recipients in Zambia often prefer SMS or WhatsApp.
