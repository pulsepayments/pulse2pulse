# Pulse Africa — working memory for Claude

## Mission
Make cross-border money for Africa as fast and as good-looking as a modern neobank, starting with **UK/US → Zambia**.
Priority order: **1. Send** (stablecoin sandwich: GBP/USD → USDC/USDT → ZMW to a bank or mobile money) → 2. Receive (virtual accounts) → 3. Virtual cards → 4. Payroll, agentic invoicing, bills.

## Non-negotiables (never break these, and flag them in review)
1. **Pulse is unlicensed software.** It never holds customer funds, never holds private keys, and is never payer or merchant of record. Licensed partners do custody, KYC/AML, FX and payouts. Load the `compliance-guardrails` skill before designing any flow that touches money or PII.
2. **All money movement goes through a provider adapter.** No partner SDK calls outside `adapters/`. See the `provider-adapter` skill.
3. **Money is integer minor units plus an ISO currency code** (stablecoins use their on-chain decimals). No floats, ever. FX rates are decimal strings with an explicit rounding mode.
4. **Internal double-entry ledger** records *state and reconciliation* (mirroring partner balances), not custody. Every journal balances.
5. **Every partner call is idempotent** (an idempotency key per intent). Webhooks are verified, deduplicated and processed through a state machine.
6. **No secrets, real PII or partner contracts in the repo.** Use `.env` (gitignored) and fixtures with fake data.
7. **UI quality is a product requirement, not a polish step.** Load `pulse-design-system` before any UI work. UI is done only after a `ui-reviewer` pass on real screenshots.

## How we work
- Plans: run `/plan-council <brief>` for anything non-trivial. Plans live in `docs/plans/`, decisions in `docs/adr/`, and partner notes in `docs/partners/` (no confidential terms).
- One main agent loop plus on-demand skills. Use subagents only for parallel research or independent review:
  - `researcher`: partner, regulation and API-doc research, with cited sources.
  - `fintech-reviewer`: reviews diffs for money and compliance rule violations.
  - `ui-reviewer`: screenshots and critiques UI.
- Skills: `pulse-fintech-domain` (corridor and partner landscape), `compliance-guardrails`, `provider-adapter`, `product-modules`, `pulse-design-system`, `plan-council`.
- Branch per task, small PRs, tests with every change. Never mark work done without running it.

## Repo map
- `docs/` holds plans, ADRs and partner notes.
- `.claude/` holds skills, agents and settings.
- App code: TBD. The stack decision comes from the first council plan.

## Status
- 23 Nov 2026: repo bootstrapped with tooling. First plan: `docs/plans/plan - pulse-africa-zambia.md`.
