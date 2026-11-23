# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js + TypeScript, statically exported and hosted on Netlify. The waitlist uses Netlify Forms. Chosen by the founder (23 Nov 2026). The same codebase grows into the real app (see `docs/plans/plan - pulse-africa-zambia.md`).

## Users
- **Primary:** investors and high-net-worth individuals (and their companies) moving their **own money** between their UK/US accounts and their accounts in Zambia. Typical transfers are 5–6 figures (£10k–£999k), occasionally low 7 figures. Today a bank wire takes days to weeks, with opaque FX and no tracking.
- **Secondary (later):** Zambian businesses and individuals receiving money, running payroll, paying bills and invoicing; everyone gets virtual accounts.
- **Audiences for the current site:** prospective customers (the waitlist), prospective investors in Pulse, and prospective partners.

## Product Purpose
Make moving serious money into Zambia feel like a modern private-banking experience: quoted upfront, tracked live, landed fast. Success right now means a credible base that wins waitlist sign-ups and investor and partner conversations. Later, success is p95 delivery within 60 minutes at a lower all-in cost than a bank wire, at the customer's real ticket size.

## Positioning
Built for six- and seven-figure transfers into Zambia, a segment consumer remittance apps don't serve (low caps, retail flows) and banks serve slowly. Licensed partners run regulated activity, with modern settlement rails underneath. The customer sees a fiat-to-fiat transfer with the rate, fees and arrival shown before they commit.

## Operating Context
Senders act from London, New York and similar cities, often on mobile, moving treasury between their own entities and accounts. Recipients are Zambian bank accounts (ZMW, or possibly USD domiciliary accounts). Transfers this large involve source-of-funds checks and business (KYB) onboarding by the licensed partner.

## Capabilities and Constraints
- **Pulse is technology, not a bank or money transmitter.** Licensed partners hold funds, do KYC/AML and pay out. Copy must never say "bank", "deposit", "guaranteed", "insured", "earn" or "yield", and must never frame the product as crypto (see `.claude/skills/compliance-guardrails/SKILL.md`).
- **Speed claim:** the founder chose "in minutes". The site must word it as a design target ("designed to land in minutes") with a footnote that timing depends on partner, bank and compliance checks. It must never be presented as a guarantee.
- **No product is live yet.** The site is a waitlist plus an interactive **demo** of the send flow, clearly labelled as a preview with illustrative rates.
- **Waitlist:** one form tagged by role (sender, business, investor in Pulse, partner), with typical transfer size band and corridor. Collect minimal personal data and link a privacy notice.
- Undecided: final brand identity details, the partner names to disclose, pricing, and the launch corridor (UK vs US first).

## Brand Commitments
Name: **Pulse**. The founder wants it executed "in a more quality way": premium and credible. Identity details are to come.

## Evidence on Hand
None that can be published. There are no customers, testimonials, volumes, partners or licences to cite. **Do not fabricate** any of these, or press logos, user counts or "trusted by" claims. Research and plans live in `docs/` and are internal.

## Product Principles
1. The amount is the hero: every screen is honest about what is sent, what it costs and what lands.
2. Always know where the money is: a live, shareable status from start to finish.
3. Quiet confidence for serious money: precise and calm, never hype.
4. Fiat in, fiat out: the settlement technology stays invisible.
5. Never claim what isn't true yet: label previews, targets and partners honestly.

## Accessibility & Inclusion
WCAG 2.2 AA. Mobile-first and resilient on slower connections (Zambian recipients). Tabular numerals for all money.
