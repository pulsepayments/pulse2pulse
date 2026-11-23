# Regulatory map: Pulse (UK/US → Zambia)

Desk research as of **23 Nov 2026**. **Not legal advice.** Items marked [UNVERIFIED] or [PENDING] must be confirmed by counsel. Some primary hosts (zambialii.org, afriwise.com) were blocked in the research session, so re-verify the statute text directly.

## Zambia
- **Payments law.** The National Payment Systems Act 2007 is still the operative law; BoZ's 2025 annual report bases oversight on it. The **National Payment System Act 2026 (Act No. 5 of 2026)** repeals it and introduces licensing, designation and authorisation of payment service providers. As of 8 Apr 2026 it is **uncommenced** (in force by ministerial SI). [PENDING: commencement] Certificates issued under the 2007 Act stay valid (s.153).
  - https://zambialii.org/akn/zm/act/2026/5/eng@2026-04-08
  - https://www.boz.zm/sites/default/files/2026-04/Requirements%20for%20Designation%20of%20Payment%20System.pdf
- **Technical service provider (TSP).** Whether a pure software or API provider to a designated partner needs its own BoZ designation is **unconfirmed**. BoZ has historically had TSP-type categories. **Top lawyer question.**
- **Currency Directives 2025** (in force 26 Dec 2025): **domestic transactions must be priced and settled in ZMW**. Quoting or invoicing in foreign currency is allowed. Cross-border receipts and BoZ-regulated services are exempt. This affects local payroll, bills and invoices.
  - https://www.bis.org/review/r251031d.htm
  - https://www.iflr.com/article/2gjw2n5ocpr2orkmyddo1/iflr1000/zambia-the-bank-of-zambia-mandates-kwacha-settlement-for-domestic-transactions
- **Virtual assets.** BoZ, not the SEC, leads. All VASPs, resident and non-resident, had to **register by 27 Mar 2026**. Registration is preliminary and is not a licence. It reportedly covers VA↔fiat exchange, transfer, safekeeping and issuance services. A report of **BoZ Directives on Virtual Assets 2026** (Gazette Notice 1439, 18 Sep 2026; 12 months to apply for a licence; PPMLA/FIC duties) is [UNVERIFIED, single source]. → Any partner doing the Zambian leg of the sandwich must hold BoZ VASP registration or a licence.
  - https://www.zambiamonitor.com/bank-of-zambia-calls-for-registration-of-cryptocurrency-service-providers/
- **Data Protection Act 2021.** Controllers and processors register with the Data Protection Commissioner (s.20; SI 58/2021, renewed every year). Cross-border transfer needs one of: consent plus approved clauses, ministerial prescription, or Commissioner authorisation. Sensitive data needs consent to leave Zambia (Part X, ss.70–71).
  - https://zambialii.org/akn/zm/act/2021/3/eng@2021-03-24
  - https://bowmanslaw.com/insights/zambia-office-of-the-data-protection-commissioner-operational/
- **AML (FIC Act 2010, as amended).** Reporting entities do customer due diligence (CDD), suspicious transaction reports (STRs) and record-keeping. Pulse is probably not a reporting entity if it never handles funds, but partners will pass duties down by contract.
- **Mobile Money Transaction Levy** (Act 25 of 2024) adds cost to mobile-money payouts.

## UK
- **Payments and e-money.** Pulse can stay out of scope as a **technical service provider** (PSRs 2017 Sch.1 Pt.2 (j)), but only if it **never takes possession of funds**. The alternatives are to be a **registered agent** of the partner PI/EMI or an EMI distributor.
  - PERG 15 Annex 3: https://www.handbook.fca.org.uk/handbook/PERG/15/Annex3.pdf
  - FCA consultation CP26/36 proposes changes to the TSP guidance. [PENDING]
- **Crypto regime.** MLR registration applies until the new regime starts. Cryptoassets Regulations 2026: final FCA rules on 30 Jun 2026 (PS26/10 covers stablecoins). The authorisation gateway opened on 30 Sep 2026. **The regime goes live on 25 Oct 2027.** Perimeter guidance is [PENDING]. Open question: is a front-end routing users to a stablecoin partner "arranging"?
  - https://www.fca.org.uk/firms/new-regime-cryptoasset-regulation
- **Crypto financial promotions** (s.21 FSMA, since Oct 2023) must be made or approved by an authorised or MLR-registered firm. Pulse cannot self-approve. Market the product as money transfer and keep the stablecoin plumbing in the background, subject to lawyer review.

## US
- **FinCEN.** A money transmitter is an MSB (31 CFR 1010.100(ff)(5)). The payment-processor exemption fits merchant invoicing and bill-pay, **not P2P remittance**. Pulse stays outside MSB status only if it never accepts or transmits value (e.g. FIN-2013-R002).
- **States.** The agent-of-payee exemption is available in roughly half the states, narrowly in California, and doesn't fit remittance. → Use a **licensed partner MSB (licensed in all states) as transmitter of record**, with Pulse as tech provider or marketing agent.
- **GENIUS Act** (18 Jul 2025). The OCC final rule takes effect on 18 Jan 2027. After the transition ends in Jul 2028, only permitted or comparable-issuer stablecoins are allowed, and **issuers may not pay yield** → use compliant coins (e.g. USDC) and never market yield.
  - https://occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html

## What partner contracts must cover
- The partner is the payer's provider and transmitter of record, and the issuer or custodian. Its name appears on receipts.
- Funds go directly to partner or safeguarding accounts and never touch Pulse. Pulse has no keys and instructs payments only with customer-authenticated consent.
- The customer signs T&Cs with the licensed entity. Pulse has its own platform terms.
- KYC, sanctions, monitoring and suspicious activity reports (SAR/STR) belong to the partner. Pulse provides data and audit support. Data processing agreements must include a transfer mechanism compliant with the Zambian DPA.
- The partner owns complaints, Financial Ombudsman Service (FOS) referral and Reg E handling. Pulse forwards within agreed SLAs.
- The partner approves all marketing, including s.21 crypto promotions. Agent or distributor registration is used where relevant.
- Exit, wind-down and data-portability terms.

## Can / cannot
| Pulse can (unlicensed) | Pulse cannot |
|---|---|
| Build the UI and run onboarding that feeds the partner's KYC | Receive, hold or pool funds, or hold keys |
| Act as a technical service provider (APIs, data, authentication) | Be the contracting party for payments, e-money or crypto |
| Earn a fee or revenue share (structured with counsel) | Approve its own crypto promotions, or advertise yield |
| Be a UK agent or distributor, or a US marketing agent of an MSB | Run a VASP touching Zambia without BoZ registration or licence |
| Offer invoicing and payroll software with partner payouts | Say "bank", "deposits" or "account provider" |

## Questions for a Zambian lawyer
1. Does Pulse need BoZ designation as a TSP or payment system provider under the 2007 Act? Has the 2026 Act commenced, and what is the transition?
2. Were the Virtual Asset Directives 2026 issued? Does a non-resident, non-custodial front-end need to register?
3. Does a USD-stablecoin leg plus ZMW payout by a BoZ-licensed partner comply with the 2025 Currency Directives?
4. What are the data localisation and transfer mechanism requirements? Do both controller and processor need DPA registration?
5. What FIC Act duties apply to a non-custodial platform? How do the mobile-money levy and agent rules apply?

## Questions for a UK lawyer
1. Does the TSP exclusion survive a revenue share and full UX control, or must Pulse become an agent or distributor?
2. After 25 Oct 2027, is routing users to a stablecoin partner "arranging deals"?
3. How do s.21 crypto promotions apply to a remittance product with stablecoins underneath?
4. Are stablecoin payments in PSRs scope or in the new regime (PS26/10)?
5. Who owns Consumer Duty and FOS complaints across the partner chain?
