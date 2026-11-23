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
7. **UI quality is a product requirement, not a polish step.** Load `pulse-design-system` before any UI work, and `pulse-security` before auth, API, webhook, PII or CI work. UI is done only after a `ui-reviewer` pass on real screenshots.

## How we work
- **Plans live in the main agent's context.** For non-trivial work, run `/plan-council <brief>`. It writes the plan into `docs/plans/`, and the main agent reads it and keeps it updated as work proceeds. Don't rely on a separate plan mode. Decisions go in `docs/adr/`, partner notes in `docs/partners/` (no confidential terms).
- **One main agent loop plus on-demand skills.** Never model agents on an org chart. Subagents are called like tools: one bounded job, a compact result back, and the main agent keeps control of the context. Ours:
  - `researcher`: parallel web research with cited sources.
  - `fintech-reviewer`: reviews diffs for money, compliance and security violations.
  - `ui-reviewer`: screenshots and critiques UI.
  - `impeccable-*`: helpers invoked only by the impeccable skill.
- **Evals over vibes.** `evals/` grades finished outcomes. Re-run it before keeping any change to CLAUDE.md, skills or agents, and keep rubrics non-conflicting.
- **MCP / tool design is jobs-to-be-done.** When we build tools for our own agents (e.g. agentic invoicing), design them per user job (`draft_invoice`, `chase_overdue_invoices`, `match_payment`), not one tool per API endpoint. Use the `mcp-builder` skill.
- Skills, by job:
  - Domain and money: `pulse-fintech-domain`, `compliance-guardrails`, `provider-adapter`, `product-modules`.
  - Security: `pulse-security`, which routes to `differential-review`, `sharp-edges`, `semgrep`, `sarif-parsing`, `dimensional-analysis`, `property-based-testing`, `supply-chain-risk-auditor`, `agentic-actions-auditor`, `spec-to-code-compliance`.
  - UI and design: `pulse-design-system` (Pulse rules win on conflict), `impeccable` (critique, audit, polish, harden), `frontend-design`, `emil-design-eng` and Emil's motion skills (`animate`, `review-animations`, `mobile-native`, `break-ui`, `prototype`, `pick-ui-library`…), `webapp-testing`.
  - Planning: `plan-council`. Vendored sources are in `.claude/skills/VENDORED.md`.
- Branch per task, small PRs, tests with every change. Never mark work done without running it.

## Repo map
- `docs/` holds plans, ADRs and partner notes.
- `.claude/` holds skills, agents and settings.
- `evals/` holds build-agent and product-agent evals.
- App code: TBD. The stack decision comes from the first council plan.

## Status
- 23 Nov 2026: repo bootstrapped with tooling. First plan: `docs/plans/plan - pulse-africa-zambia.md` (v3, needle-passed; next step is Stage 0 evidence plus Stage 1 prototype). Build requirements: `docs/BUILD-REQUIREMENTS.md`.
