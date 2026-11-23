---
name: provider-adapter
description: The required pattern for integrating any licensed partner API at Pulse (on/off-ramps, payout networks, BaaS virtual accounts, card issuing, KYC, bill-pay aggregators). Load whenever adding, changing or testing a partner integration, a webhook handler, or a money-moving state machine.
---

# Provider adapter pattern

Partners will change (a shortlist, then swaps, then multi-partner routing). Product code must never know which partner is behind a capability.

## Shape
```
adapters/
  <capability>/            e.g. payout, onramp, virtual-accounts, cards, kyc, billpay
    port.ts|py             capability interface (the only thing product code imports)
    <partner>/             one folder per partner: client, mapper, webhook verifier
    mock/                  deterministic in-memory implementation for tests and demos
    contract.test.*        the same suite run against mock and against partner sandbox
```

## Capability interface rules
- Verbs follow the money lifecycle: `getQuote → createIntent(idempotencyKey) → getStatus → cancel?`. Webhooks map to `onEvent`.
- Inputs and outputs are **Pulse domain types**, never partner payloads. Mappers live in the partner folder.
- Amounts are `{ amountMinor: bigint/int, currency: "GBP"|"USD"|"ZMW"|"USDC"... }`. FX is `{ rate: decimal string, source, quoteId, expiresAt }`.
- Every call carries an `idempotencyKey` derived from the Pulse intent ID plus the step. Retries reuse the key.
- Errors are typed: `Retryable`, `NeedsUserAction` (e.g. more KYC), `Rejected` (with reason code), `Unknown`. `Unknown` means **reconcile, never re-send**.

## Webhooks
1. Verify the signature (partner secret, constant-time compare, timestamp tolerance). Reject unsigned webhooks.
2. Persist the raw event first, keyed on the partner event ID, and dedupe.
3. Process asynchronously. Map to a domain event and advance the intent **state machine** (only legal transitions). Post ledger entries in the same DB transaction as the state change.
4. Also poll `getStatus` for intents stuck past their SLA. Webhooks get lost.

## Transfer state machine (send corridor baseline)
`created → quoted → awaiting_funds → funds_received → converting → in_transit_onchain → payout_pending → completed`
Side exits: `needs_action`, `failed` (with refund state), `refunded`, `cancelled`. Every transition is timestamped and shown to the user as a timeline.

## Testing
- The mock adapter is deterministic and can simulate delays, failures, partial payouts and duplicate webhooks.
- Contract tests run against mock in CI and against partner sandbox nightly (when credentials exist).
- No partner credentials in the repo. Sandbox keys go through env or the environment's secret store.

## Adding a partner checklist
- [ ] Notes in `docs/partners/<partner>.md`: licences, coverage, SLAs, fees (public info only), sandbox status.
- [ ] Capability port is unchanged, or the ADR explains why it changed.
- [ ] Mapper is covered by unit tests with recorded sandbox fixtures (scrubbed).
- [ ] Webhook verifier is tested with a bad signature, a replay and a duplicate.
- [ ] The `compliance-guardrails` checklist is completed.
