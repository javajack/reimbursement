# PRODUCT.md — Kharcha Dossier v2

> Working product name: **Kharcha** (Hindi/Urdu for "expense / spending"). Placeholder; trivially swappable.

## What this is

This site is a **product and build dossier** for a PURE-SOFTWARE B2B SaaS for expense reimbursement in India, delivered in two phases:

- **Phase 1 (the deep core): employee reimbursement.** Mobile-web/PWA bill capture with a document-scanner-grade camera (no stretched bills), OCR to itemised line items with a manual line-item fallback, web app for submission plus a configurable maker-checker approval flow (levels and amount thresholds), company onboarding and configuration, credit-metered pricing (unlimited users and approvers; submissions are the meter; soft paywall), and payouts via bank bulk-file export (optional Razorpay-style payout API per customer).
- **Phase 2 (separate, optional): vendor reimbursement and payouts.** Documented as a clearly scoped follow-on.

No cards. No float. No funds ever touch the platform.

The dossier serves two readers at once: a human operator absorbing one connected narrative (strategy -> Phase 1 -> engineering spec -> Phase 2), and **LLM coding agents building the API, backend, mobile web app, and web app directly from these pages** (data models, API surfaces, state machines, config schemas, screen-level UX).

## Register

**Brand / editorial** for strategy pages; **product/spec precision** for Phase 1 and Engineering Spec pages. Same visual system throughout (see DESIGN.md). It must read like a premium independent build memo, not a generic SaaS docs template.

## Primary users (readers)

- **The operator-founder** (primary): evaluating and then building this. Skeptical, time-poor, wants evidence, committed verdicts, and buildable detail.
- **LLM coding agents**: consuming the Engineering Spec and Phase 1 pages as ground truth for implementation.
- **A prospective co-founder / early hire / advisor**: needs the full picture fast via the connected narrative.

## Tone

Authoritative, candid, numerate. Operator's build memo: states opinions, commits to recommendations, surfaces risk plainly, cites sources. Spec pages are precise and exhaustive without padding. Never breathless marketing.

## Anti-references (do NOT look like these)

- Generic SaaS docs (Stripe-clone blue, Inter everywhere, identical feature-card grids).
- Finance clichés: navy + gold, glass dashboards, neon fintech.
- India clichés: tricolour, rupee-symbol logos.
- AI-slop: hero-metric template, em dashes, restated headings, side-stripe callouts.

## Strategic principles for the content

1. **Evidence over assertion.** Numbers carry provenance (analyst / vendor / govt / our derivation) and confidence when soft.
2. **Commit to decisions.** Every open question gets a recommendation and the conditions that flip it.
3. **Show the spec.** Concrete, quotable artifacts: JSON schemas, API tables, state machines, config examples, screen flows.
4. **Phase discipline.** Phase 1 is employee-only and deep; Phase 2 is vendors, separate and lighter. Never blur them.
5. **Pure-software invariants.** No cards, no float, funds never touch our accounts; bank-file export is the default payout; payment-API integration is per-customer opt-in.
6. **Pricing is a product system.** Unlimited seats, metered submissions, credit ledger, soft paywall (queue, never lose a bill), nudge loops. Specified, not just priced.

## Voice rules (apply to all authored copy)

- No em dashes. Use commas, colons, semicolons, periods, parentheses.
- No restated headings or filler intros. Every sentence earns its place.
- Indian context first: ₹ amounts, GST/PAN/IFSC/UPI, Tally, Bharat-SMB reality.
- Numbers get sources; uncertain numbers get a stated confidence/range.
