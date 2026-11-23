# Payroll (bulk payouts)

A business uploads a CSV or connects payroll, then reviews, approves and pays many recipients (bank and mobile money) in ZMW, or across borders into Zambia.

- Reuses the Send payout leg via a partner **bulk payout** API. The batch is an intent with child intents.
- Pulse features: maker/checker approval, scheduled runs, per-row validation and name-check, payslips, and export for accounting.
- Out of scope initially: tax calculation (PAYE, NAPSA, NHIMA). Show it as an integration later.
