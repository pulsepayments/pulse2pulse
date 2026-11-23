---
name: pulse-design-system
description: Pulse's UI/UX design system - brand tokens, layout, components, money-display rules, trust cues, mobile-first and low-bandwidth rules for African markets, accessibility, and the screenshot review loop. Load BEFORE writing or changing any UI (web app, mobile, emails, receipts, prototypes, marketing pages) and when reviewing UI.
---

# Pulse design system (v0, provisional until brand assets exist)

UI quality is a core differentiator. The bar: it should feel as calm, fast and trustworthy as the best neobanks, and work on a mid-range Android on 3G in Lusaka.

## Principles
1. **Money is the hero.** One primary number per screen. Large and tabular, with the currency always visible.
2. **Radical transparency.** Before confirming, show the amount sent, fees, rate (and its expiry), amount received and arrival estimate. No surprise lines.
3. **Always know where the money is.** Every transfer has a live vertical timeline (Paid → Converted → Sent → Delivered) with timestamps. Share the tracker with the recipient by link or WhatsApp.
4. **Calm, not crypto.** Fiat language by default ("Sent to Chanda's MTN wallet"). Stablecoins appear only in an optional "how it works" sheet.
5. **One primary action per screen.** Short flows: Send is no more than 4 steps for a repeat recipient.
6. **Honest states.** Design the loading, empty, error, needs-action and delayed states first, not last.

## Tokens (CSS variables; dark mode required)
- Colour: `--bg`, `--surface`, `--surface-2`, `--text`, `--text-muted`, `--border`, `--primary` (a deep, confident accent, provisional: emerald `#0E7C5A` / dark `#34D399`), `--success`, `--warning`, `--danger`, `--info`. Contrast is WCAG AA minimum, and amounts and CTAs are AAA where possible.
- Type: one variable sans (Inter or similar). Use `font-variant-numeric: tabular-nums` for all money. Scale: 12/14/16/20/24/32/44.
- Spacing is a 4px grid (4, 8, 12, 16, 24, 32, 48). Radius: 8 for inputs, 16 for cards, 999 for pills.
- Motion: 150–250ms ease-out. Respect `prefers-reduced-motion`. No decorative animation on money screens.

## Money formatting
- Use `Intl.NumberFormat` with the currency. ZMW displays as `K 1,250.00` (code `ZMW`). Never show float artefacts.
- Show both sides: "You send £500.00 → They get K 16,xxx.xx". The rate is shown as `1 GBP = xx.xxxx ZMW`, with a countdown when quoted.
- Fees are itemised, and Pulse's fee is labelled as Pulse's.

## Components (build in this order)
AmountInput (with currency switch), QuoteCard, RecipientPicker (bank and mobile-money network logos), TransferTimeline, StatusPill, BalanceCard ("held with <Partner>"), AccountDetailsCard (copy buttons), CardVisual, InvoiceRow, EmptyState, ErrorState, RegulatoryFooter.

## Africa-specific rules
- Mobile-first: design at 360×780 first, then tablet and desktop. Thumb-reachable CTAs.
- Low bandwidth: JS under ~200KB for core flows, no blocking web fonts (use `font-display: swap`), skeletons instead of spinners, and graceful offline messaging.
- Phone numbers use +260 formatting with network detection (MTN 096/076, Airtel 097/077, Zamtel 095/075; verify prefixes in the plan).
- Plain English first. Copy is i18n-ready for Bemba and Nyanja later.

## Trust cues
Regulated-partner disclosure in the footer of money screens, security messaging at KYC, a clear support entry point on every transfer, and real (not stock) photography.

## Review loop (required)
1. Build the screen. 2. Screenshot it with Playwright at 360×780 and 1440×900, in light and dark. 3. Run the `ui-reviewer` agent on the screenshots. 4. Fix the findings. 5. Attach the final screenshots to the PR.
