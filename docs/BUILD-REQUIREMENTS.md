# Pulse Africa: everything we need to build it

Owner key: **You** = founder action · **Claude** = I do it in the repo · **Both** = you decide, I prepare.
Cost figures are rough **estimates** for planning, not quotes. Status as of 23 Nov 2026. Source plan: `docs/plans/plan - pulse-africa-zambia.md` (v3).

---

## 1. Answers only you can give (blocking — needed first)
| # | Question | Why it matters | Owner |
|---|---|---|---|
| 1 | Investor interview: typical and max ticket size, frequency, personal vs company account, UK or US funding, who receives (own company / staff / family; bank / mobile money), current timeline and cost | Decides persona, launch country, partner limits, pricing, Phase A/B order (plan Stage 0a) | You (Claude writes the script) |
| 2 | "Virtual accounts for these people": senders, or Zambian recipients? | Re-orders modules after Send | You |
| 3 | Company name and brand for Africa ("Pulse"?), plus any existing Pulse entity, logo, colours | Prototype, domain, partner applications | You |
| 4 | Which existing Pulse company signs partner contracts (UK Ltd?), and who is the named director or UBO for KYB | Every partner onboards Pulse as a business (KYB) | You |
| 5 | Budget envelope and target pilot date | Sizes legal, pentest and infra choices | You |

## 2. Legal and company
| Need | Detail | Est. cost | Owner |
|---|---|---|---|
| Zambian fintech counsel | Opinion on TSP/BoZ designation, VASP for a non-custodial front-end, payout authorisation, DPA transfers (questions ready in `compliance-guardrails/references/regulatory-map.md`) | £3–10k | You hire · Claude drafts questions/briefs |
| UK fintech counsel | TSP exclusion vs agent/distributor with revenue share; s.21 crypto promotion; post-Oct-2027 "arranging" | £3–10k | You · Claude drafts |
| (Later) US counsel | Only when US senders are chosen | — | Later |
| Platform T&Cs + privacy policy + cookie policy | Pulse's own software terms (partners' T&Cs cover the money) | in counsel scope | Both |
| Data protection | UK ICO registration fee (~£52/yr); Zambia Data Protection Commissioner registration; DPIA; DPAs with each partner | low | You register · Claude drafts DPIA and data map |
| Insurance | Cyber + professional indemnity (partners often require it) | £1–5k/yr | You |
| Trademark + domains | Name search in the UK and Zambia; `.com`, plus `.co.zm` if wanted | £100s | You |
| Company bank account | For **Pulse's own revenue only** (never customer funds) | — | You |

## 3. Partners (you run the conversations; I prepare every call)
Questions are in `docs/partners/send-corridor.md`. Ask for **written answers, sandbox access, docs, and pricing** from each.
| Priority | Role | Talk to | What to get |
|---|---|---|---|
| 1 | **Single remitter of record** (preferred) | Conduit, Borderless, stables.money; ask BVNK, Zero Hash, Yellow Card whether they'd run it end-to-end | Remitter-of-record structure in writing, BoZ registration number, limits, p95, pricing, **a live demo transfer at the investor's ticket size** |
| 1 | Fallback pair | Bridge (on-ramp) + Yellow Card (off-ramp) | Same, plus confirmation that Yellow Card's customer would be Bridge or the sender, never Pulse |
| 2 | KYC/KYB | Usually included in the remitter; otherwise Sumsub/Persona/Smile ID (confirm Zambian NRC support [U]) | Hosted flow, reuse of results by the partner |
| 3 | Bills / mobile money | Cellulant (Tingg), Lipila, Flutterwave | Zambia billers, APIs, sandbox |
| 4 | Virtual accounts (fiat-settled) | Fincra, Currencycloud, (Bridge if fiat option exists) | Zambia eligibility in writing |
| 5 | Cards | Scale + Mastercard (Zambia), Bitnob (interim) | Program-manager terms, BIN sponsor reserves |

## 4. Accounts and services for the build (sign up when Stage 1.2 starts)
| Service | Use | Suggested | Est. cost/month (early) | Owner |
|---|---|---|---|---|
| GitHub | Code, CI (Actions), branch protection | ✅ have | £0–20 | You enable branch protection |
| Hosting (API + worker) | One Node service + job worker, UK/EU region | Fly.io or Render | £10–50 | You sign up · Claude configures |
| Hosting (web) | Next.js app | Vercel (or same host) | £0–20 | You · Claude |
| Postgres | Main DB with point-in-time recovery | Neon or Supabase (EU) | £0–25 | You · Claude |
| Domain + DNS + WAF | DNS, TLS, bot protection | Cloudflare | £0–20 | You |
| Email | Receipts and notifications | Postmark or Resend | £0–15 | You · Claude |
| SMS / WhatsApp | Recipient notifications in Zambia | Twilio or Africa's Talking; WhatsApp Business API | usage | You · Claude |
| Auth | Passkeys + magic link | Self-hosted (SimpleWebAuthn) or Clerk | £0–25 | Both |
| Secrets | API keys per environment | Doppler / 1Password / cloud KMS | £0–20 | You |
| Error tracking + logs | Errors, alerts on stuck transfers | Sentry (+ Better Stack) | £0–30 | You · Claude |
| Product analytics | Privacy-friendly, EU-hosted, **not on money pages** | PostHog EU | £0 | You · Claude |
| Support inbox | First-line support | Plain / Crisp / Intercom | £0–50 | You |
| Anthropic API key | Agentic invoicing (Phase D) | Claude API | usage | Later |
| Figma (optional) | Only if a human designer joins | — | £0–15 | Optional |

## 5. Claude Code environment: what to change so I can do more
| Need | Why | How |
|---|---|---|
| **Allow partner and regulator domains** in the cloud environment's network | Most partner docs and regulator sites were blocked during research (e.g. bridge.xyz, yellowcard.io, flutterwave.com, boz.zm, zambialii.org, afriwise.com) | Ask me and I'll request the exact hosts on an approval card; or add them in the environment settings → Network access |
| **Connectors** (Slack, Notion, Linear, …) | They are installed but failed to connect because their hosts are blocked | Tell me which you use and I'll request access for those hosts only |
| Sandbox API keys | Real adapters (Stage 5) | I request them with a secure form when needed. **Never paste keys into chat** |
| Setup script | Fresh cloud sessions start ready (deps installed) | I add it once the code exists (Stage 1.2) |
| Impeccable design-detector hooks (optional) | Automatic AI-slop/design checks on every UI edit | Off by default (they run a downloaded binary on each edit). Say "enable impeccable hooks" |
| GitHub branch protection + required checks | No unreviewed merges to main | You, in GitHub settings, once CI exists |

## 6. Design inputs (UI is crucial)
| Need | Owner |
|---|---|
| Brand direction: name, logo (or permission for me to propose one), colours, tone of voice | You decide · Claude proposes options |
| 5–6 target testers (the investor + similar senders) for the prototype walkthrough | You |
| Reference apps you love the feel of (e.g. Revolut, Wise, Cash App, Mercury) | You (3–5 names) |
| Real photography (not stock) of Zambian recipients and businesses, for trust | You (later) |
| Prototype (all core screens, live tracker, large-amount flow) | Claude, using impeccable, Emil's skills and `pulse-design-system`; reviewed by ui-reviewer |

## 7. Security and compliance deliverables
| Deliverable | When | Owner |
|---|---|---|
| Threat model (account takeover, payout redirection, partner-key leak, webhook spoofing) | Before Stage 2 | Claude |
| CI security: semgrep, gitleaks, dependency audit, SHA-pinned actions | Stage 1.2 | Claude |
| OWASP ASVS L2 self-assessment | Before pilot | Claude |
| DPIA + data map + retention schedule | Before pilot | Claude drafts · You sign |
| External penetration test | Before pilot | You hire (~£5–15k est.) · Claude fixes findings |
| Incident response runbook, key rotation | Before pilot | Claude drafts · You own |
| SOC 2 readiness | When partners require it | Later |

## 8. People
| Role | Need | Notes |
|---|---|---|
| You | Partner calls, legal, investor, brand decisions, approvals | ~the critical path in Stage 0 |
| Claude Code (me + skills/agents) | Plans, research, prototype, all code, tests, docs, reviews | Works in this repo |
| Fractional compliance advisor (optional, recommended) | Sanity-check partner structures; MLRO-type experience | A few hours a month |
| Zambia-based ops/support person (pre-pilot) | Recipient support in Bemba/Nyanja; partner liaison | Part-time |
| Human security tester | The penetration test | One-off |

## 9. Timeline (from the plan)
1. **Now → ~4 weeks: Stage 0 evidence**: investor interview, incumbent benchmark sends, partner written answers plus a demo transfer, legal opinions. In parallel, **Stage 1**: the prototype and code foundations (CI, monorepo, ledger, domain).
2. **Build (after the structure is signed): ~11.5–19 weeks**: send saga on mocks → identity/KYC → real send UI → real partner adapter (the critical path) → pilot hardening.
3. **Pilot**: ≥ 60 real transfers, p95 ≤ 60 min, cheaper than the best alternative at the investor's ticket size.
4. **Then**: payroll/bills or virtual accounts (your call from Q2), cards, agentic invoicing, each behind its own legal gate.

## 10. What I can start immediately (no answers needed)
- The investor interview script and partner call briefs.
- The clickable prototype (provisional brand).
- Stage 1.2 foundations: monorepo, CI with security scans, domain and ledger packages with property-based money tests.
- The threat model draft.
