---
name: pulse-security
description: Pulse's application-security baseline for a fintech front-end that handles PII and instructs licensed partners - auth, sessions, secrets, webhook security, API hardening, PII encryption, audit logs, dependency/supply-chain, CI/agent security, and the pre-pilot security gate. Load BEFORE building auth, APIs, webhooks, data models with PII, CI workflows, or infrastructure, and when reviewing any of them. Routes to the Trail of Bits skills for deep checks.
---

# Pulse security baseline

Pulse holds no funds, but it **holds the keys to instruct partners on customers' behalf, plus their PII.** A compromised Pulse means fraudulent payout instructions and a data breach. Target: **OWASP ASVS 5.0 Level 2** for the app and **OWASP API Security Top 10** for the API.

## Must-haves (by area)
**Identity and sessions**
- Passkeys (WebAuthn) first, with magic-link fallback. No SMS-only OTP for high-risk actions (SIM-swap risk is high in mobile-money markets).
- **Step-up re-auth** (passkey) for: adding a recipient, changing payout details, sends above a threshold, changing email or phone, and creating API keys.
- Sessions: httpOnly, Secure, SameSite=Lax cookies; rotate on privilege change; idle and absolute timeouts; device list with remote logout.
- New-recipient cooling-off or confirmation, plus notifications on every sensitive change (account-takeover defence).

**API**
- Authorise every object access (BOLA/IDOR is the #1 API bug). Every query is scoped by the authenticated user or org. Write tests that try cross-tenant access.
- Validate input with schemas (zod) at the edge. Allow-list fields. Never mass-assign.
- Rate limits per user, IP and endpoint (quotes, login, OTP, recipient lookup and name-check are enumeration vectors).
- Idempotency keys on every mutating endpoint (also a security control against replays).

**Partner and webhook security** (see `provider-adapter`)
- Verify webhook signatures in constant time, with timestamp tolerance and replay dedupe. Use IP allow-lists where the partner publishes them.
- Partner API keys live only in the secret store, scoped per environment, rotated and never logged. Use separate sandbox and production accounts.
- Treat partner responses as untrusted input (validate the schema).

**Data**
- Minimise PII. Encrypt sensitive columns at the application level (KMS envelope keys). TLS everywhere. Encrypted backups. Log redaction (no PII, tokens or full account numbers in logs).
- An append-only **audit log** of every money instruction and security-relevant event (who, what, when, from where).
- Data map plus retention schedule (UK GDPR, Zambia DPA 2021). Run a DPIA before pilot.

**Web front-end**
- Strict CSP (nonces), HSTS, frame-ancestors none, no inline secrets, and Subresource Integrity for third-party scripts. **No third-party analytics or ads scripts on money pages.**
- CSRF protection on cookie-authenticated mutations.

**Supply chain and CI**
- Commit the lockfile; use `pnpm install --frozen-lockfile`; turn off install scripts by default (`ignore-scripts`, allow-list exceptions). Renovate or Dependabot with review. Pin GitHub Actions to commit SHAs. Run `supply-chain-risk-auditor` before adding a dependency with install scripts or a single maintainer.
- CI runs: typecheck, tests, **semgrep** (via the `semgrep` skill or CI), secret scanning (gitleaks), dependency audit. Give `GITHUB_TOKEN` least privilege.
- **AI agents in CI:** run the `agentic-actions-auditor` skill on any workflow that invokes Claude or another agent. Never feed untrusted PR or issue text into an agent with write or secret access.

**Infrastructure**
- Separate dev, sandbox and prod accounts and databases; prod access via SSO + MFA, least privilege, break-glass logged.
- Back up the DB with point-in-time recovery, and rehearse a restore before pilot.
- Error tracking and alerting on auth anomalies, webhook signature failures, stuck intents, and spikes in new recipients.

## Pre-pilot security gate (all required)
- [ ] Threat model for the send flow, written in `docs/adr/` (STRIDE or attack trees: account takeover, payout redirection, insider, partner-key leak, webhook spoofing).
- [ ] ASVS L2 self-assessment checklist completed.
- [ ] `semgrep` clean (or triaged), secret scan clean, dependency audit clean.
- [ ] `differential-review` on every money/auth PR (or `/security-review`).
- [ ] External penetration test (partners will ask for it, often alongside SOC 2 readiness).
- [ ] Incident response runbook + partner contacts + key-rotation procedure.

## Which deeper skill to use
| Situation | Skill |
|---|---|
| Reviewing a PR or diff for security | `differential-review` (or built-in `/security-review`) |
| Designing an API, config or SDK surface | `sharp-edges` |
| Money maths, decimals, stablecoin units | `dimensional-analysis` + `property-based-testing` |
| Static scan | `semgrep` → `sarif-parsing` |
| New dependency | `supply-chain-risk-auditor` |
| CI workflow invoking an AI agent | `agentic-actions-auditor` |
| Does the code match the plan or ADR? | `spec-to-code-compliance` |
