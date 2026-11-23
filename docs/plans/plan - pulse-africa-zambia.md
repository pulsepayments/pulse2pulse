# Plan - Pulse Africa (Zambia) v3 (23 Nov, post-council, needle-passed)

Problem: UK/US → Zambia transfers reportedly take weeks for one high-value sender (the founder's investor; anecdotal, n=1). Incumbent apps already advertise minutes for GBP→ZMW bank transfers (Revolut, WorldRemit; provider claims). So the likely wedge is **fast, transparent, high-value sends** (and later the investor-type customer's Zambian payroll and bills), not £500 retail remittance. That is unproven until Stage 0 measures it. **Metric:** p95 time from partner "funds received" event → partner "payout completed" event **≤ 60 min**, and **all-in cost (fees + FX margin vs BoZ reference rate + levy) below the best measured alternative at the investor's real ticket size**, over ≥ 60 real transfers, **reported per amount band** (e.g. <£5k, £5–35k, >£35k). Mechanism: an unlicensed software layer on a **single licensed remitter of record** (or a contracted partner chain) that uses stablecoins as its own treasury rail, behind a neobank-grade UI. Honest target: Stage 0 evidence within ~4 weeks; first live investor transfer ≈ 11.5–19 weeks of build after the structure is signed (Stages 2–6 in sequence, Engineering sizes; Stage 5 is the critical path; ~7.5–13 wk if Stages 3–4 overlap Stage 5). **Falsifiers:** (a) and (b) stop build Stage 2+; (c) stops the pilot's scale-up and all Later phases. (a) no single remitter or contracted chain (ADR-001 Option A/B) exists in which Pulse neither holds a balance nor instructs value as principal; (b) the best incumbent already moves the investor's ticket size into a ZMW bank in < 60 min (measured like-for-like, from sender payment initiation) at lower all-in cost; (c) a pilot p95 > 60 min, or any transfer refused for lack of liquidity.

## Current state (evidence)
- Repo: tooling only. `git ls-files | grep -v '^\.claude\|^docs\|^CLAUDE\|^README\|^\.gitignore' | wc -l` → 0. One commit, `8b745e2`. No `.github/` (no CI).
- Rules: `CLAUDE.md` non-negotiables 1–7; `.claude/skills/compliance-guardrails/SKILL.md` rules 1–10; adapter pattern in `.claude/skills/provider-adapter/SKILL.md`.
- Partner research (unverified desk research, from search extracts): `docs/partners/send-corridor.md`, `docs/partners/accounts-cards-billpay.md`; regulatory map in `.claude/skills/compliance-guardrails/references/regulatory-map.md`.
- **Yellow Card's B2B model is prefunded:** the integrating business tops up its own stablecoin balance, and disbursements convert from "the partner's balance" (docs.yellowcard.engineering/docs/api-glossary, /docs/settlement-api; search extract). With Pulse as integrator, that balance would be Pulse's, which breaks non-negotiable 1. Flutterwave also "requires prefunded ZMW" (`send-corridor.md`).
- Yellow Card Zambia limits: mobile money ZMW 100–20,000 per transaction (1.5%); bank 0.5% on ZMW 25k–1M (`send-corridor.md`). This leaves a gap between ZMW 20k and 25k, and a ceiling of ~ZMW 1M per transaction (≈ £36.8k at ~27.2 ZMW/GBP, Nov 2026) — *if* 25k–1M is a limit rather than a fee band; confirm in 0c.
- Bridge transfers API supports a USDC destination `to_address` and `developer_fee` (apidocs.bridge.xyz; Engineering lens). GBP via FPS needs an "FPS endorsement" through sales. Bridge's UK FCA/MLR status is unknown.
- Regulatory (secondary sources): BoZ VASP registration deadline 27 Mar 2026, and BoZ-regulated banks barred from dealing with unregistered VASPs from 30 Mar 2026; Currency Directives 2025 (domestic ZMW settlement; cross-border receipts exempt); UK s.21 crypto promotions with 24h cooling-off for first-time investors (PS23/6); UK regime live 25 Oct 2027; GENIUS Act (no yield).
- No prior councilled plans.

## Proposed change

### Stage 0: Evidence (≈ 4 weeks target, founder-led with agent support). Rows 0a–0d gate Stage 2+; 0e gates the Pilot.
Cost lines (separate budgets): benchmark sends are real transfers the investor would make anyway (fees ≈ 1% of ticket, borne by him); legal opinions are a separate counsel budget (quote first); agent research ≈ £0.
| # | What | Output (stored in repo) | Pass threshold |
|---|---|---|---|
| 0a | **Investor interview** (scripted): typical and max ticket, frequency, personal vs company account, source country and currency (UK or US), recipient type (own company, staff, family; bank or mobile money), current SWIFT timeline and cost, what "landed" means, which extra services he wants (accounts, cards, payroll, bills) | `docs/research/investor-interview.md` | Answers recorded; launch country and persona decided from them |
| 0b | **Incumbent benchmark**: 2–3 real UK→ZMW bank sends (Revolut, WorldRemit, Remitly; check Wise ZMW status) at the investor's ticket size, plus a priced SWIFT quote from a named UK bank. Log time, fee, FX margin vs the BoZ rate, caps and holds | `docs/research/benchmark.md` | Gap exists at the investor's ticket size (falsifier b not triggered) |
| 0c | **Structure**: written answers from ≥ 1 single-remitter option (Conduit, Borderless or stables.money as listed end-to-end; or ask whether BVNK, Zero Hash or Yellow Card will act end-to-end) and the Bridge+Yellow Card pair to: who is remitter of record end-to-end; whose balance any inter-leg USDC sits in; per-transfer attribution; travel-rule data flow; who owns and funds the return leg (refund after FX); BoZ registration or licence number; per-transaction, daily and float limits, bank cut-offs and p95 payout; FCA/MLR status and whether a UK sender is "buying crypto" (cooling-off). **Plus ≥ 1 single-remitter partner demonstrates a live UK→ZMW transfer at the investor's ticket size.** | `docs/partners/*.md` + **ADR-001 Remitter of record & custody topology** | A structure where Pulse never holds a balance, never instructs value as principal, and no cooling-off applies to a remittance |
| 0d | **Legal opinions**: Zambia (TSP designation, VASP for a non-custodial front-end, payout authorisation, DPA transfers), UK (TSP exclusion vs agent with revenue share; s.21 copy; post-Oct-2027 "arranging") | `docs/adr/ADR-002-regulatory-position.md` | Signed opinions name the structure as permissible |
| 0e | **Pulse revenue mechanism** confirmed (partner developer fee or rev-share) without breaking the TSP exclusion | ADR-002 | Yes |

**ADR-001 default preference (Domain/Risk):** one licensed remitter of record that takes GBP/USD, holds the stablecoin as its own treasury, and contracts the BoZ-registered payout partner itself (Option A). The fallback is a written Bridge↔Yellow Card chain where Yellow Card's customer is Bridge or the sender, never Pulse (Option B). Consumers never own the stablecoin, and Pulse is never the integrator holding a float.

### Stage 1: Can run during Stage 0 (cheap, structure-independent)
1. **Clickable hi-fi prototype**, published as a private artifact. Screens: onboarding (personal + business), home/balances, quote (incl. FX vs reference and all-in cost), **large-amount review and source of funds**, recipient (bank + mobile money, name-check), fund instructions, live tracker (shareable), receipt, business-account switch, and empty/error/needs-action states. Copy follows guardrail 7 (no crypto framing). **Gate:** the investor plus ~5 target senders complete a scripted walkthrough, with findings logged in `docs/research/prototype-tests.md`, and UK copy is partner- or lawyer-checked before any UK participant sees it.
2. **Foundations:** a pnpm-workspace monorepo with `apps/web`, `apps/api`, `adapters/<capability>/{port,mock,<partner>}` (CLAUDE.md non-negotiable 2); `packages/domain` (money types, intent state machine), `packages/ledger` (double-entry mirror incl. `in_transit` / `held_at_partner` accounts); GitHub Actions CI (typecheck, unit tests); env/secrets layout (`.env.example`); error tracking. Verify: `pnpm test` green in CI on a PR.
3. **Repo-rule sync after ADR-001 and 0a:** update `product-modules/modules/send.md` (flow, what Pulse owns, ledger sketch), `cards.md` funding, the product-modules phase table and the CLAUDE.md priority line to match ADR-001, the deferred ledger and the Phase A/B order chosen. Verify: fintech-reviewer finds no contradiction between skills and this plan.

### Stage 2+: Build (gated: Stage 0 rows 0a–0d pass; 0e before Pilot)
**Stack (simplified per Engineering):** TypeScript; Next.js web (mobile-first PWA); **one** Node API (Fastify) plus a graphile-worker process deployed together on one host (Fly/Render, UK/EU region); Postgres + Drizzle; auth via passkeys or magic link. No Turborepo or Temporal until needed.
| Stage | What | Verification | Size |
|---|---|---|---|
| 2 | Mock adapters + send saga **modelled on ADR-001** (single-remitter or contracted chain), with explicit recovery per failure point (pre-conversion, in-transit, payout-rejected-after-FX) and quote-expiry policy (the recipient amount holds; the partner bears the gap or refunds in full) | e2e on mocks: happy path, duplicate webhook, timeout, payout reject → refund, quote expiry after funding; ledger balances; `held_at_partner` alarm fires past SLA | 1.5–2 wk |
| 3 | **Identity & onboarding**: auth; partner customer creation and hosted KYC/KYB links; recipient data and name-check; DPA basis for partner data sharing | e2e on mocks + partner sandbox KYC flow | 2–3 wk |
| 4 | Web app send flow (prototype → real) on mocks | Playwright e2e at 360/1440 px, light and dark; `ui-reviewer` grade ≥ B; no regressions vs prototype findings | 2–3 wk |
| 5 | Real adapter(s) for the ADR-001 partner(s) — **critical path** | Contract tests in sandbox, **including a payout-reject → refund (return leg) test**, **plus ≥ 1 real low-value production transfer end-to-end** | 4–8 wk |
| 6 | Pilot hardening: limits sized to the investor's tickets, metric instrumentation (partner event timestamps, partner rate, BoZ rate and levy stored per intent; p95/all-in cost query), reconciliation, support console, stuck-intent alerts, drain/cutover procedure for partner failover | Recon = 0 on the production transfer and a seeded replay; the metric query returns values for the test transfers | 2–3 wk |
| Pilot | The investor plus friendly senders at limits covering real tickets | ≥ 60 transfers before reporting p95; compare to the 0b baseline | — |

### Later phases (each gated on the pilot metric met **and** its own legal gate)
| Phase | Scope | Extra gate |
|---|---|---|
| A | Whichever of {payroll + bills for business senders (pay Zambian staff and utilities from UK/US), virtual accounts} 0a ranks first. **This may override the CLAUDE.md / product-modules order (Receive → Cards → Business); Stage 1.3 records the decision.** | Payroll/bills: Currency Directives check (domestic flows settle in ZMW), biller aggregator (Cellulant) contract. Virtual accounts: as row B |
| B | The other one of the pair. Virtual accounts are named and **fiat-settled** (candidates: Fincra, Currencycloud; Bridge only if a fiat-settled option exists) | BoZ exchange-control view; partner Zambia eligibility in writing |
| C | Virtual cards (fiat-funded program, e.g. Scale+Mastercard) | Program agreement; BIN sponsor reserve terms |
| D | Agentic invoicing (Claude API; the agent drafts and chases, never moves money) | Authority-limits ADR; human approval on send |

### Agentic build setup
One main Claude Code loop + skills (domain, compliance, adapter, modules, design, plan-council) + 3 subagents (researcher, fintech-reviewer, ui-reviewer). Every money PR runs fintech-reviewer, and every UI PR runs ui-reviewer with screenshots. CI runs typecheck, tests and e2e on mocks.

### Unit economics (estimate; recomputed at the 0a ticket size)
All-in = on-ramp fee (Bridge via sales [U]) + off-ramp (YC bank 0.5% / mobile money 1.5%) + **FX margin vs BoZ reference [unknown]** + levy (ZMW 0.16–3.60/transaction, applicability [U]) + gas (<$0.10 [U]) + Pulse fee. *Assuming* on-ramp + Pulse fee of 0.5–2.0% [assumption], the fee lines are 1.0–2.5% (bank) or 2.0–3.5% (mobile money). A £100k ticket (≈ ZMW 2.7M) exceeds the ~ZMW 1M per-transaction ceiling, so it needs ~3 split transfers or a higher-limit partner; flat per-transfer costs (levy, minimums) scale with the splits. At 1–2.5%, £100k costs £1,000–2,500, so a flat SWIFT fee (£15–40 [U], unsourced) may beat Pulse unless the SWIFT FX margin is large. **Pricing must be tiered by amount band.** This is decided after 0b.

## What this does NOT do (deferred ledger)
Native mobile apps; a second sender country until the pilot passes (UK vs US decided by 0a); Zambia → abroad; **users holding stablecoin balances**; **stablecoin-settling virtual accounts and stablecoin-linked cards** (counsel gate needed; fiat-settled only in Phases B–C); any Pulse-named float or prefunding on any route; Pulse-held FX; physical cards; payroll tax (PAYE/NAPSA); multi-country expansion; credit, yield and savings; US Reg E and 50-state MTL work (until US is chosen).

## Risks
- **Perimeter (highest):** Pulse becoming de facto transmitter or VASP via an integrator-owned balance. Guard: ADR-001 + 0c/0d gates before Stage 2; fintech-reviewer blocks any Pulse-owned balance.
- **Stuck funds between legs:** guard with `held_at_partner` ledger accounts, SLA alarms, contractual return-leg owner, a sandbox test of the return leg, and a preference for a single remitter.
- **UK crypto-promotion and cooling-off:** guard with 0c/0d answers; consumers never own the stablecoin; copy sign-off before UK user tests.
- **BoZ counterparty status:** the off-ramp's registration number is verified before Stage 2; a mid-pilot plan covers loss of status (second route, drain procedure).
- **Limits and liquidity for large tickets:** written per-transaction, daily and float limits; a falsifier covers liquidity refusals.
- **Rollback in flight:** a real-rail cutover cannot be undone by "switch to mock"; a drain procedure is defined in Stage 6.
- **UI ambition vs time:** prototype and walkthrough first; the design system comes before features.

## Assumptions & open questions
- Wedge = high-value senders. This is overturned if 0a shows personal sends under ~£5k (then the consumer framing holds).
- "Virtual accounts for these people": does that mean senders (investor-type) or Zambian recipients? Phase A/B order follows 0a.
- The launch country is UK by default, but the investor's real funding account decides it.
- The stack is TypeScript (user chose "decide later"; recommended here).
- Brand assets don't exist; the design system is provisional.
- Pulse revenue comes via a partner fee mechanism, subject to 0e.

## Council (23 Nov)
- ROI: **DEFER**. The problem is never measured, and the benchmark (SWIFT) is the weakest option. The whole build is spent before showing the investor's problem is open.
- Risk: **GO-WITH-CHANGES**. In the two-partner saga Pulse instructs the transfer, and value likely sits in Pulse's name at the off-ramp. The gates were sentences.
- Engineering: **GO-WITH-CHANGES**. Yellow Card's prefunded B2B model breaks the saga and non-negotiable 1, and identity/KYC/CI are unplanned.
- Product: **GO-WITH-CHANGES**. The persona is a retail remitter, but the anchor user is a high-value sender. The prototype is undefined.
- Domain (payments/compliance): **GO-WITH-CHANGES**. There is no single remitter of record; the UK leg designed as retail crypto brings in cooling-off; limits don't fit large tickets.

**Convergent core findings:** (1) *Remitter of record and custody between the legs* (Risk F1, Engineering F1, Domain F1): the Bridge→Yellow Card saga puts Pulse in the flow of funds. (2) *Investor ticket size, persona and benchmark unknown* (ROI F1/F3, Product F1/F2, Domain F3): the metric and economics don't fit the one real user. **Restaged per DEFER (ROI):** Stage 0 evidence gates Stage 2+.

Required changes:
| Lens | Change | Status |
|---|---|---|
| ROI F1 | Incumbent benchmark at the investor's ticket size; restate the metric vs the best alternative | APPLIED (0b, opening) |
| ROI F1/F3 | Investor ticket, frequency and SWIFT timeline in writing; unit economics incl. FX vs BoZ | APPLIED (0a, Unit economics) |
| ROI F2 | Gate build on written partner answers (Q1/Q3/Q5); calendar start | APPLIED (0c gate; Stage 0 ≈ 4 wk) |
| ROI F2 | Gate Stage 1.1 prototype demos on partner answers | REJECTED: the prototype is cheap, structure-independent, and is itself the tool for partner and investor conversations; copy is gated instead |
| ROI F2 | Ask a partner to run one investor transfer through its existing corridor first | APPLIED (0c: live demonstration transfer required) |
| ROI F4 | Gate accounts and cards on the pilot metric | APPLIED (Later phases) |
| ROI F5 | ≥ 60 transfers before reporting p95; baseline alongside | APPLIED (Pilot row) |
| Risk F1 / Eng F1 / Domain F1 | ADR-001 on remitter of record, custody topology and travel-rule flow before Stage 2 | APPLIED (0c, ADR-001) |
| Risk F2 | Recovery per failure point, `held_at_partner` ledger, return-leg owner and test, stuck alarm | APPLIED (Stage 1.2 ledger, Stage 2, 0c owner question, Stage 5 return-leg test) |
| Risk F3 | Gates as artifacts; legal gate per later phase; falsifier stops Stage 2 | APPLIED (0d, Later phases, opening) |
| Risk F4 | Strike stablecoin-settling accounts and cards; no Pulse float; quote-expiry policy | APPLIED (deferred ledger, Stage 2) |
| Risk F5 / Domain F2 | Copy sign-off before UK tests; Bridge FCA status; cooling-off answer in writing | APPLIED (Stage 1.1, 0c) |
| Eng F2 | Identity & onboarding stage | APPLIED (Stage 3) |
| Eng F3 | Metric events defined by partner webhooks; instrumentation; a real production transfer in verification | APPLIED (opening, Stages 5–6) |
| Eng F4 | CI, env/secrets, error tracking; collapse the stack | APPLIED (Stage 1.2, Stack) |
| Eng F5 | Foundations during Stage 0; Stage 4 (now 5) as critical path; 11–18 wk estimate | APPLIED (Stage 1, opening, Stage 5) |
| Product F1 | Investor interview; KYB and large-amount limits | APPLIED (0a, Stage 3, Stage 6) |
| Product F2 | Competitor table; metric segmented by amount band | APPLIED (0b, opening metric per band, Unit economics) |
| Product F3 | Concrete prototype screens + investor walkthrough gate | APPLIED (Stage 1.1) |
| Product F4 | "Virtual accounts for whom" assumption | APPLIED (Assumptions, Phase A/B) |
| Product F5 | Launch country from the investor's funding account | APPLIED (0a, Assumptions) |
| Domain F3 | Limits, float, cut-offs and p95 in writing; falsifier = metric | APPLIED (0c, falsifier c) |
| Domain F4 | All-in cost = fees + FX vs BoZ + levy, stored per transfer | APPLIED (opening, Stage 6) |
| Domain F5 | BoZ registration evidence + payout-authorisation view gate Stage 2 | APPLIED (0c/0d) |

## Needle review record (23 Nov): SHIP-WITH-FIXES
- **Reproduced clean:** app-file count 0; CLAUDE.md 1–7 / guardrails 1–10; all cited files exist; Yellow Card fees and limits (send-corridor.md:13); Flutterwave prefunding; Yellow Card prefunded-balance glossary; BoZ 27 Mar / 30 Mar 2026; Currency Directives; UK 25 Oct 2027; PS23/6 24h cooling-off; levy ZMW 0.16–3.60; Revolut "within minutes"; £100k arithmetic; 6 skills and 3 agents present; council table complete (24 rows, 1 rejected).
- **Fixes baked in:** (1) build estimate corrected to 11.5–19 wk sequential; (2) critical path is Stage 5, not 4; (3) £100k example exceeds the ~ZMW 1M ceiling, so splits are noted; (4) Stage 0 cost split into benchmark fees (investor) and a counsel budget; (5) falsifier (c) scoped to pilot scale-up and Later phases; (6) live demonstration transfer added to 0c; (7) return-leg owner question in 0c and return-leg test in Stage 5; (8) single-remitter list corrected to match the partner notes; (9) Stage 1.3 added to sync repo skills with ADR-001 (send.md and cards.md patched now; full sync after 0a); (10) Phase A/B rewritten as "first/other" with explicit CLAUDE.md order override; fiat-settled VA candidates named; (11) fee-line totals labelled as an assumption; (12) metric reported per amount band.
- **NITs applied:** 0e gate scope; falsifier (a) aligned to Option A/B and "as principal"; like-for-like measurement start; fee band vs limit caveat; "Phase 1" residue; "banks" wording; cut-offs added to 0c; dark mode in Stage 4; `adapters/` placed in Stage 1.2.
- **Overruled:** none.
- **Ledger additions:** none. Edge noted: domestic payroll for Zambian businesses and non-agentic payment links sit inside Phases A/D; they are not dropped.
- **Still unverified:** WorldRemit speed claim, SWIFT £15–40, gas cost, Bridge `to_address` and FPS endorsement, Yellow Card settlement-api page, and whether 4 weeks is enough for two signed legal opinions.

## Needle report
Metric: p95 funds-received → payout-completed ≤ 60 min at an all-in cost below the best measured alternative, at the investor's ticket size, per amount band. Mechanism: a neobank-grade front-end on a single licensed remitter of record that uses stablecoins as internal treasury. Verdict: **PREPARES**. Nothing here moves the metric until real transfers run; Stage 0 is designed to find out cheaply whether the gap exists and whether a compliant structure exists. Honest number: none yet. The only data point is one anecdote (n=1), and incumbents advertise minutes for small sends. Falsified by: 0b showing incumbents already serve the investor's ticket fast and cheaper; or 0c finding no structure without a Pulse-held balance. The first measurement is the investor interview (0a) plus one benchmark send (0b), both within ~2 weeks.
