# Agentic invoicing

Invoices that create, send, chase and reconcile themselves.

- **Create**: from a prompt, an email or a template. An AI agent drafts line items, tax and terms, and a human approves (always, for sending).
- **Pay**: each invoice carries a payment link and/or a dedicated virtual account reference (partner-issued), so payers can pay by card, bank or mobile money.
- **Chase**: the agent schedules polite reminders (email or WhatsApp) and escalates. Tone and schedule are configurable.
- **Reconcile**: incoming payments are matched to invoices automatically (reference, amount, payer), with exceptions surfaced to a human.
- Guardrails: the agent never moves money. It drafts and sends communications under user-approved policies, and every action is logged.
- Built with the Claude API (tool use). Model choice and evals go in an ADR.
