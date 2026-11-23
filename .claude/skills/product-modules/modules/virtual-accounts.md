# Virtual accounts (receive)

Pulse-branded account details so users can **receive** money: USD (ACH/wire), GBP (sort code/FPS), EUR (IBAN/SEPA) for Zambian freelancers and businesses, plus ZMW wallets or accounts where a local partner allows it.

- Issued by a licensed BaaS or EMI partner. Pulse is program manager or distributor. The account is **in the partner's name, for the benefit of the user** (or a named sub-account), and is disclosed as such in the UI.
- Incoming funds can auto-convert to ZMW (reusing the Send off-ramp leg) or stay in the hard currency at the partner, if the partner and Zambian exchange-control rules allow it.
- Key questions: can Zambian residents be holders, what KYC tier is required, are accounts named or pooled, what are the inbound limits, and what about statements and confirmation of payee.
- Ledger: one partner-mirrored account per currency per user. Reconcile daily against partner statements.
