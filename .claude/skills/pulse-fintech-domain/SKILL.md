---
name: pulse-fintech-domain
description: Domain knowledge for Pulse Africa - the UK/US→Zambia stablecoin-sandwich corridor, Zambian payment rails (banks, MTN/Airtel/Zamtel mobile money, ZESCO/bills), the partner landscape (on-ramps, off-ramps, BaaS, card issuers, bill aggregators) and partner due-diligence questions. Load when planning, estimating, choosing partners, writing partner integrations, or preparing for partner calls.
---

# Pulse fintech domain

## The corridor problem
UK/US → Zambia bank wires go via correspondent banks (SWIFT): days to weeks, opaque fees, poor tracking. The **stablecoin sandwich** replaces the correspondent chain:
`GBP/USD (local rail: FPS/ACH/RTP) → partner on-ramp → USDC/USDT on-chain → partner off-ramp → ZMW (bank or mobile money)`.
The target is minutes, with all-in cost below bank wires and competitive with incumbent remitters.

## Zambia essentials
- Currency is the **ZMW** (kwacha, symbol K, 2 decimals). The **Currency Directives 2025** require domestic transactions to settle in ZMW.
- Rails: banks (local clearing and ZIPSS) and **mobile money** (MTN MoMo, Airtel Money, Zamtel Kwacha), which is the dominant consumer rail. The mobile money levy (2024) adds cost.
- Bills: ZESCO (electricity tokens), water utilities, DStv/GOtv, airtime.
- Regulators: **Bank of Zambia** (payments; also leads virtual assets, with VASP registration from Mar 2026), SEC (only where a token is a security), FIC (AML), and the Data Protection Commissioner.

## Partner landscape (provisional, unverified items marked)
- Send corridor: `../../../docs/partners/send-corridor.md`. Pragmatic pairing is **Bridge (on-ramp) + Yellow Card (off-ramp)**, with Zero Hash, BVNK, Flutterwave and Kotani as alternatives.
- Accounts, cards, mobile money and bills: `../../../docs/partners/accounts-cards-billpay.md`. Candidates: Bridge or Fincra (accounts), Scale+Mastercard, Rain or Bridge-Visa (cards), Lipila or Flutterwave (payouts and links), Cellulant Tingg (bills).
- Regulation: `../compliance-guardrails/references/regulatory-map.md`.

## How to use this
- Treat every partner fact as **unverified until confirmed in writing** by the partner. Update the partner notes with the date and source when confirmed.
- When the founder has a partner call, generate a call brief: what we need, the due-diligence questions from the partner notes, and red flags.
- Prefer partners that cover several modules (fewer contracts and integrations), but always keep a second route for the send corridor.
