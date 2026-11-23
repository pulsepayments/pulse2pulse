# Send: UK/US → Zambia (MVP)

## User story
A sender in the UK or US (for example an investor or diaspora family) sends GBP or USD and the recipient in Zambia gets ZMW in a bank account or mobile-money wallet in minutes, with a live tracker for both sides.

> **Structure rule (ADR-001, pending; see `docs/plans/plan - pulse-africa-zambia.md`):** prefer ONE licensed remitter of record that takes the fiat, holds the stablecoin as its own treasury and contracts the Zambian payout partner itself. A two-partner chain is acceptable only if the partners contract with each other and the off-ramp's customer is the sender or the on-ramp, **never Pulse**. Pulse never integrates as a prefunded B2B client (e.g. a Yellow Card float) and never instructs value as principal. Consumers never own the stablecoin.

## Flow (stablecoin sandwich, inside the remitter of record)
1. **Quote**: the sender enters an amount in send or receive currency. The partner returns a rate, fees and expiry. Show the all-in cost and the ZMW received.
2. **Fund**: the sender pays the partner by Open Banking/Faster Payments (UK), ACH/wire/RTP (US) or card (higher cost). Funds land with the **partner**, never Pulse.
3. **Convert**: the partner mints or buys USDC/USDT.
4. **Move**: the remitter moves the stablecoin to its contracted payout partner (internal for an end-to-end partner). Pulse only observes this via webhooks.
5. **Payout**: the off-ramp partner sells for ZMW and pays out to a bank (local clearing) or mobile money (MTN MoMo, Airtel Money, Zamtel).
6. **Complete**: both parties are notified, with a receipt PDF and a timeline.

## Pulse owns
Sender and recipient UX, quote display, orchestration of the customer journey (quote, consent, status) against the remitter's API, the state machine, the ledger mirror, notifications, support tooling, analytics and the fee configuration (collected via partner).

## Partner owns
KYC/AML on the sender (and on the recipient where required), funds custody, FX, on-chain custody and transfer, local payout, travel rule, refunds and regulatory reporting.

## Ledger sketch (mirror, per intent)
- funds_received: DR held_at_partner:GBP / CR user_pending:GBP
- converted: DR in_transit:USDC / CR held_at_partner:GBP (+ fee lines; store partner rate and BoZ reference rate)
- payout_completed: DR recipient_paid:ZMW / CR in_transit:USDC (FX at the partner rate)
- payout_rejected: DR held_at_partner:USDC / CR in_transit:USDC → refund journals; alarm if held past SLA

## MVP cut
One sender country (UK or US, chosen in the plan), one funding rail, ZMW to bank and to MTN plus Airtel mobile money, recipient name-check, a tracker and a receipt. Repeat sends and saved recipients are in. Scheduled sends are out.

## Key metrics
Time from funds_received to completed (p50 and p95), all-in cost versus bank wire and versus remittance incumbents, quote-to-send conversion, failure and refund rate.
