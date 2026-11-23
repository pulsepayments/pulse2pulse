# Send: UK/US → Zambia (MVP)

## User story
A sender in the UK or US (for example an investor or diaspora family) sends GBP or USD and the recipient in Zambia gets ZMW in a bank account or mobile-money wallet in minutes, with a live tracker for both sides.

## Flow (stablecoin sandwich)
1. **Quote**: the sender enters an amount in send or receive currency. The partner returns a rate, fees and expiry. Show the all-in cost and the ZMW received.
2. **Fund**: the sender pays the partner by Open Banking/Faster Payments (UK), ACH/wire/RTP (US) or card (higher cost). Funds land with the **partner**, never Pulse.
3. **Convert**: the partner mints or buys USDC/USDT.
4. **Move**: the stablecoin is transferred on-chain to the off-ramp partner (or stays internal for an end-to-end partner).
5. **Payout**: the off-ramp partner sells for ZMW and pays out to a bank (local clearing) or mobile money (MTN MoMo, Airtel Money, Zamtel).
6. **Complete**: both parties are notified, with a receipt PDF and a timeline.

## Pulse owns
Sender and recipient UX, quote display, orchestration across the two partners, the state machine, the ledger mirror, notifications, support tooling, analytics and the fee configuration (collected via partner).

## Partner owns
KYC/AML on the sender (and on the recipient where required), funds custody, FX, on-chain custody and transfer, local payout, travel rule, refunds and regulatory reporting.

## Ledger sketch (mirror, per intent)
- funds_received: DR partner_onramp:GBP / CR user_pending:GBP
- converted: DR partner_onramp:USDC / CR partner_onramp:GBP (and fee lines)
- payout_completed: DR recipient_paid:ZMW / CR partner_offramp:ZMW

## MVP cut
One sender country (UK or US, chosen in the plan), one funding rail, ZMW to bank and to MTN plus Airtel mobile money, recipient name-check, a tracker and a receipt. Repeat sends and saved recipients are in. Scheduled sends are out.

## Key metrics
Time from funds_received to completed (p50 and p95), all-in cost versus bank wire and versus remittance incumbents, quote-to-send conversion, failure and refund rate.
