# Pulse Africa

Fast, beautiful cross-border money for Africa, starting with **UK/US → Zambia**.

Senders fund in GBP or USD. Licensed partners convert to a stablecoin, move it on-chain, and pay out in ZMW to a Zambian bank account or mobile-money wallet in minutes rather than weeks (the "stablecoin sandwich"). On top of sending, Pulse offers virtual accounts, virtual cards, payroll, agentic invoicing and bill pay.

**Pulse is a technology platform, not a bank or money transmitter.** Regulated activity is performed by licensed partners that Pulse integrates and white-labels.

## Working in this repo with Claude Code
- `CLAUDE.md` holds the rules every session follows. Read it first.
- `/plan-council <brief>` produces a plan reviewed by a council of reviewers and fact-checked, written to `docs/plans/`.
- Skills in `.claude/skills/` load on demand (domain, compliance, adapters, product modules, design system).
- Agents in `.claude/agents/`: `researcher`, `fintech-reviewer`, `ui-reviewer`.

## Layout
```
docs/plans/     councilled plans
docs/adr/       architecture decision records
docs/partners/  partner research and due-diligence notes (no confidential terms)
.claude/        Claude Code skills, agents and settings
```
