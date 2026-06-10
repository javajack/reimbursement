# AUTHORING GUIDE v2 — how to write each page of the Kharcha v2 dossier

You are authoring ONE page of the Kharcha v2 dossier: an Astro + Starlight site that is simultaneously (a) a connected build memo a human reads cover to cover and (b) ground truth for LLM coding agents implementing the API, backend, mobile web app, and web app. Read `research/THESIS-V2.md` first (the spine), then your assigned inputs, then write a single `.mdx` file to the exact path you are given. Do not create or edit any other file.

## The product in one breath (never contradict this)

Pure-software B2B SaaS for expense reimbursement in India. **Phase 1: employee reimbursement only**, deep: PWA/mobile-web bill capture with a document-scanner-grade camera, OCR to itemised line items, manual line-item fallback, web submission + configurable maker-checker approvals (levels and amount thresholds), company onboarding/configuration, credit-metered pricing (unlimited users and approvers; submissions are the meter; soft paywall that queues, never blocks capture), payout via bank bulk-file export by default with an optional per-customer Razorpay-style payout API. **Phase 2 (separate): vendor reimbursement and payouts.** No cards, no float, funds never touch the platform.

## Voice (non-negotiable)

- Operator's build memo: authoritative, candid, numerate, committed. Spec pages: precise and exhaustive without padding.
- **No em dashes.** Use commas, colons, semicolons, periods, parentheses. Never ` - ` as a dash or `--` in prose.
- No restated headings, no filler intros. Open with the takeaway.
- India-first: ₹ amounts, GST/PAN/IFSC/UPI/Tally. Use `₹` not "Rs".
- Every load-bearing number carries provenance (analyst / vendor / govt / primary docs / our derivation) and confidence when soft. Never launder a vendor number into a fact.
- Use ONLY figures from THESIS-V2.md or your assigned research files. Do not invent numbers. Do NOT do web research.
- Commit to decisions. When a choice exists, recommend one and state what flips it.

## Frontmatter

```mdx
---
title: Short page title
description: "One sentence, <160 chars. Wrap in double quotes ALWAYS (avoids YAML colon bugs)."
---
```

The title becomes the H1; never repeat it as a heading. No `sidebar` keys.

## MDX safety (build breaks otherwise)

- ALL JSON, code, schemas, file samples, anything with `{ }` or `<` goes inside fenced code blocks with a language (```json, ```ts, ```sql, ```http, ```text, ```bash).
- In prose, never a bare `<` before a letter/digit ("under ₹5 lakh", "not more than 13", or backtick it). Never a bare `{` in prose.
- Blank lines around `:::` asides, tables, and code fences.
- Inline JSX allowed ONLY for the documented pill/source-note spans below.

## Components and classes

Import only what you use, immediately after frontmatter:

```mdx
import { Tabs, TabItem, Steps, Badge, FileTree, LinkCard, CardGrid } from '@astrojs/starlight/components';
```

- **Asides:** `:::note` (info/reference, indigo), `:::tip` (recommendation/wedge, green), `:::caution` (watch-out, clay), `:::danger` (hard invariant / never-do, red). Title them: `:::danger[Product invariant]`.
- **Tables** for anything structured: comparisons, schemas, field lists, state transitions, pricing. This dossier is table-heavy by design.
- **Steps** for ordered flows (wizards, lifecycles). **Tabs** for true alternatives (bank-file vs payout-API; Android vs iOS). **FileTree** for repo/dir layouts. **LinkCard** only as end-of-page "continue reading" pointers. No identical card grids.
- **Pills** (raw HTML spans): verdicts `pill--build|caution|avoid`, confidence `pill--high|med|low`, outcomes `pill--allow|flag|block`, info `pill--info`. Example: `<span class="pill pill--high">High</span>`.
- **Source captions:** `<p class="source-note">Source: ... (vendor, medium confidence).</p>` under tables/figures.

## Page shape

1. Open with a 2-4 sentence lead: what this page decides/specifies and the headline takeaway.
2. H2 sections, H3 within. Prose paragraphs under ~80 words; let tables and code carry density.
3. **Phase 1 product pages:** screen-level UX detail (states, empty/error/loading, microcopy examples in tables, gesture/keyboard behavior), the ops behind the UX, and explicit acceptance criteria where natural ("Done means:").
4. **Engineering Spec pages:** written for an implementing agent. Concrete schemas (JSON Schema / SQL DDL / TypeScript types), full endpoint tables, transition tables with guards and side effects, worked examples with realistic Indian data (GSTINs like `29ABCDE1234F1Z5`, IFSC like `HDFC0001234`, ₹ amounts). An agent should be able to build WITHOUT asking questions.
5. Cross-link 3-6 related pages inline (root-relative, trailing slash, from the slug map). The narrative must feel connected: reference what came before, point to what comes next.
6. End with `## Sources` ONLY if the page makes research claims (strategy/compliance/capture-tech pages: 4-10 labelled links from your research inputs). Pure internal-spec pages (data-model, api, config-schema, state-machines) need no Sources section; their authority is THESIS-V2.
7. Length: Phase 1 pages 1,200-2,200 words; Spec pages 1,400-2,600 (code-heavy); Strategy 800-1,500; Phase 2 / Compliance / Reference 700-1,400. Substantial, never padded.

## Canonical contracts (every page MUST use these exact names)

THESIS-V2.md section "Canonical product contracts" defines: entity names, claim/approval/payout/credit state names, the six rule actions (allow, flag, warn, cap, block, route), credit semantics, capture pipeline stage names, plan names, and API conventions. Use them verbatim. If your page needs a name not defined there, derive it consistently (snake_case fields, PascalCase entities) and define it where first used.

## Slug map (cross-link with these exact root-relative paths)

Start Here: `/` home · `/start/vision-and-scope/` · `/start/how-to-read/`
Phase 1: `/phase-1/overview/` · `/phase-1/personas-and-journeys/` · `/phase-1/end-to-end-flow/` · `/phase-1/capture/camera/` · `/phase-1/capture/ocr-itemisation/` · `/phase-1/capture/manual-entry/` · `/phase-1/capture/submit-and-track/` · `/phase-1/web/employee-portal/` · `/phase-1/web/approver-experience/` · `/phase-1/web/approval-engine/` · `/phase-1/web/finance-console/` · `/phase-1/onboarding/company-onboarding/` · `/phase-1/onboarding/configuration-model/` · `/phase-1/onboarding/policy-and-rules/` · `/phase-1/credits-and-metering/` · `/phase-1/payouts/` · `/phase-1/edge-cases/` · `/phase-1/ops-runbooks/`
Spec: `/spec/architecture/` · `/spec/capture-pipeline/` · `/spec/data-model/` · `/spec/api/` · `/spec/state-machines/` · `/spec/config-schema/` · `/spec/rule-schema/` · `/spec/integrations/` · `/spec/security-and-compliance/` · `/spec/non-functionals/`
Phase 2: `/phase-2/overview/` · `/phase-2/vendor-onboarding/` · `/phase-2/vendor-tax-engine/` · `/phase-2/payouts-and-ap/`
Compliance: `/compliance/regulatory-map/` · `/compliance/money-movement/` · `/compliance/data-protection/` · `/compliance/audit-and-retention/`
Strategy: `/strategy/the-problem/` · `/strategy/market/` · `/strategy/competitors/` · `/strategy/pain-points/` · `/strategy/whitespace/` · `/strategy/pricing/` · `/strategy/gtm/` · `/strategy/unit-economics/` · `/strategy/verdict/`
Reference: `/reference/bank-files/` · `/reference/glossary/` · `/reference/sources/`

Write links root-relative exactly as above (a build plugin handles the GitHub Pages base prefix; never hardcode `/reimbursement`).

## Inputs discipline

- `research/THESIS-V2.md`: the spine. Canonical figures, invariants, contracts. Wins every conflict.
- `research/raw2/*.md`: fresh v2 research (software pain points, capture tech, OCR UX, pricing, onboarding, approvals, PWA-in-India) with sources.
- `research/raw/*.md`: v1 research (market, competitors, regulation, KYC, payouts, integrations...) still valid for strategy/compliance.
- `research/old-pages/**.mdx`: the v1 site. You may reuse strong passages and tables that remain true under v2 scope, rewritten into the new framing. Never copy anything that contradicts v2 (per-user pricing recommendations, vendor flows inside Phase 1, card content).
- Carry research caveats honestly (vendor-sourced stats stay labelled; un-fetched primary sources stay flagged).
