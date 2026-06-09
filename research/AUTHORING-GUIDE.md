# AUTHORING GUIDE — how to write each dossier page

You are authoring ONE page of the Kharcha dossier, an Astro + Starlight site. Read `research/THESIS.md` (the spine) and your assigned `research/raw/*.md` file(s) before writing. Write a single `.mdx` file to the exact path you are given, then return your manifest. Do not create or edit any other file.

## Voice (non-negotiable)

- Authoritative, candid, numerate. Seasoned SaaS operator writing a build memo, not marketing.
- **No em dashes.** Use commas, colons, semicolons, periods, or parentheses. Never ` - ` as a dash or `--`.
- No restated headings, no filler intro that repeats the title. Open with the takeaway.
- India-first: ₹ amounts, GST/PAN/GSTIN/IFSC/UPI/Tally, Bharat-SMB reality.
- Every load-bearing number carries provenance and, when soft, a confidence. Distinguish three sources explicitly: analyst data, vendor-marketing, and our own derivation. Many pain stats are vendor-sourced and dramatized: label them.
- Commit to opinions. The reader wants a recommendation and the reasoning, not a survey.
- Stay consistent with THESIS canonical figures and regulatory invariants. Do not invent numbers; use only figures from THESIS.md or your raw research file. If a figure is soft, say so.

## Frontmatter

```mdx
---
title: Short page title
description: One sentence, <160 chars, what the page answers.
---
```

Do not set `sidebar` order (managed centrally). `title` becomes the H1; do not repeat it as an H2.

## MDX safety (avoid build failures)

- Put ALL JSON, code, file samples, and anything with `{ }` or `<` inside fenced code blocks with a language (```json, ```ts, ```text, ```bash).
- In prose, never write a bare `<` before a letter/number (MDX reads it as a tag). Write "not more than 13", "under ₹5 lakh", or wrap in backticks like `<=13`. Same for `{` in prose: rephrase or use backticks.
- Put blank lines around `:::` aside blocks and around tables.
- Curly-brace-free prose. If you need literal braces in text, use backticks.

## Components and classes you may use

Import only what you use, at the top after frontmatter:

```mdx
import { Card, CardGrid, LinkCard, Tabs, TabItem, Steps, Badge, FileTree, Icon } from '@astrojs/starlight/components';
```

- **Asides (preferred for callouts)** via directives. They are themed: note = indigo (reference/info), tip = green (recommendation/wedge), caution = clay (watch-out), danger = red (hard rule / regulatory invariant / do-not-do).

  ```
  :::tip[The wedge]
  Tally-native sync is the single biggest deal-maker.
  :::

  :::danger[Regulatory invariant]
  Funds must never touch an account the SaaS owns or controls.
  :::
  ```

- **Tables** for all comparisons, pricing, data, rule lists, file formats. This is a data-dense dossier; prefer tables over prose lists for structured facts.
- **Steps** for ordered flows (onboarding, the claim lifecycle). **Tabs** for parallel options (e.g., file hand-off vs partner API). Use **Card/CardGrid sparingly**: never as an identical icon+heading+text grid filler. Use **LinkCard** for "next read" navigation at the foot of a page when helpful.
- **Inline pills** (custom classes) for verdicts, confidence, and policy outcomes. Write as raw HTML spans:
  - Verdict: `<span class="pill pill--build">Build</span>` `<span class="pill pill--caution">Caution</span>` `<span class="pill pill--avoid">Avoid</span>`
  - Confidence: `<span class="pill pill--high">High</span>` `<span class="pill pill--med">Medium</span>` `<span class="pill pill--low">Low</span>`
  - Rule outcome: `<span class="pill pill--allow">Allow</span>` `<span class="pill pill--flag">Flag</span>` `<span class="pill pill--block">Block</span>`
  - Info: `<span class="pill pill--info">Note</span>`
- **Source caption**: `<p class="source-note">Source: GBTA/Visa, 2024 (analyst, medium confidence).</p>` under a table or figure.

## Page shape

1. Open with a 1-3 sentence lead stating the conclusion of the page.
2. Use H2 sections; H3 within. Keep paragraphs under ~70 words.
3. Put the hard data in tables. Use pills for verdicts/confidence. Use one or two asides for the most important callouts, not on every paragraph.
4. Cross-link 2-4 related pages inline using root-relative links with trailing slash (see slug map).
5. End with a short `## Sources` section: 4-10 markdown links to the key URLs you used (pull from your raw research file's findings `src:` lines and Sources section). Label each (analyst / vendor / govt / primary). The full aggregated bibliography lives at `/reference/sources/`.
6. Target length: substantial but lean, roughly 700-1400 words. No padding.

## Slug map (use for cross-links; root-relative, trailing slash)

- Home: `/`
- `/overview/executive-summary/` — verdict, the one-pager
- `/overview/the-problem/` — use cases, who feels the pain
- `/market/size/` — TAM/SAM/SOM
- `/market/competitors-india/` — India incumbents
- `/market/competitors-global/` — global feature bar
- `/market/pain-points/` — verified pains
- `/market/whitespace/` — the wedge and gaps
- `/users/personas/` — personas & jobs-to-be-done
- `/users/buyers-icp/` — buying committee, HR vs Finance, ICP
- `/product/workflow/` — claim lifecycle (raise to pay)
- `/product/maker-checker/` — approval state machine + DoA
- `/product/rule-engine/` — rule engine design
- `/product/non-reimbursables/` — what is not covered (GST/policy)
- `/product/ocr/` — bill digitization & fraud
- `/product/onboarding-kyc/` — registration, PAN/GSTIN/bank whitelisting
- `/product/payouts/` — disbursement & bank files
- `/product/edge-cases/` — advances, FX, per-diem, split bills, etc.
- `/product/mvp-scope/` — the over-ask, feature matrix, cut line
- `/compliance/regulatory-map/` — GST, Income Tax, TDS overview
- `/compliance/money-movement/` — RBI PA/PPI, the compliant architecture
- `/compliance/data-protection/` — DPDP & security
- `/compliance/audit-retention/` — audit trail, controls, retention
- `/business/pricing/` — pricing & packaging
- `/business/freemium/` — freemium analysis
- `/business/gtm/` — go-to-market motion
- `/business/unit-economics/` — cost stack & margins
- `/business/integrations/` — integrations & the survival question
- `/business/roadmap/` — build plan & sequencing
- `/business/risks/` — risks & failure modes
- `/business/verdict/` — final scored decision
- `/reference/rule-schema/` — rule-object JSON reference
- `/reference/bank-files/` — bank payout file formats
- `/reference/glossary/` — glossary
- `/reference/sources/` — bibliography & methodology

## Reminders

- You write MDX, not CSS. Do not add `<style>` or inline styles beyond the documented pill/source-note classes.
- Keep claims defensible. When the research flags something as un-fetched or vendor-sourced, carry that caveat; do not launder a soft number into a hard fact.
