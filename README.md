# Kharcha Dossier

A research-backed **product and build dossier** for a pure-software, **employee-first expense-reimbursement SaaS for India**, published as an Astro + Starlight site (light, editorial theme). It is written for two readers at once: a human absorbing one connected narrative, and **LLM coding agents implementing the API, backend, PWA, and web app directly from the Engineering Spec pages**.

> Working product name **Kharcha** (Hindi/Urdu for "expense"). Trivially swappable.

## The stance, in one line

Conditional build. **Phase 1: employee reimbursement only**, deep: PWA bill capture engineered to document-scanner grade, honest OCR with a manual line-item fallback, configurable maker-checker approvals, onboarding to a first approved claim in one session, payouts by bank-file export (optional payout API per customer), and **credit-metered pricing (unlimited users and approvers free; submissions are the meter; a soft paywall that queues and never loses a bill)**. **Phase 2: vendors**, separately scoped. No cards, no float; funds never touch the platform.

## Site map

| Section | What it holds |
| :------ | :------------- |
| Start Here | Vision and scope, how to read (including how LLM agents consume the spec) |
| Phase 1 | The deep product core: capture, OCR, approvals, onboarding/config, credits, payouts, edge cases, ops |
| Engineering Spec | Architecture, capture pipeline, data model, API, state machines, config and rule schemas, integrations, security, NFRs |
| Phase 2 | Vendor reimbursement: onboarding/KYC, TDS/RCM tax engine, payouts and the AP adjacency |
| Compliance | Regulatory map, RBI money-movement stance, DPDP, audit and retention |
| Strategy | Problem, market, competitors, verified pain points, whitespace, metered pricing, GTM, unit economics, verdict |
| Reference | Bank file formats, glossary, sources and methodology |

## Commands

| Command           | Action                                                |
| :---------------- | :----------------------------------------------------- |
| `npm install`     | Install dependencies                                    |
| `npm run dev`     | Local dev server at `localhost:4321/reimbursement/`     |
| `npm run build`   | Build the static site to `./dist/`                      |
| `npm run preview` | Preview the production build locally                    |
| `./start.sh`      | Build, then serve on `localhost:7777/reimbursement/`    |

The site is configured with base path `/reimbursement` for GitHub Pages, so local URLs are served under `/reimbursement/` too.

## Deployment (GitHub Pages)

Pushing to `main` builds and deploys automatically via `.github/workflows/deploy.yml` (the official `withastro/action`). Live URL:

```
https://javajack.github.io/reimbursement/
```

If you later move to a custom domain served at the root, set `BASE = '/'` (and update `SITE`) in `astro.config.mjs`; the rehype base-prefix plugin becomes a no-op and the hardcoded hero links in `src/content/docs/index.mdx` should drop the `/reimbursement` prefix.

## How it was built

Two multi-agent research passes ground the content: v1 (21 agents: India market, competitors, regulation, KYC, payout rails, integrations, pricing, feasibility, plus 7 adversarial fact-checks) and v2 (10 agents: software-only pain points, mobile-web document capture, OCR itemisation UX, usage/credit pricing, onboarding and configuration, approver UX, PWA reality in India, plus 3 adversarial checks). Findings live under `research/` (`raw/`, `raw2/`, `THESIS-V2.md`); pages were authored against that spine, then adversarially reviewed and fixed. Figures carry provenance (analyst / vendor / govt / primary docs / our derivation) and confidence labels; soft numbers stay labelled.

Numbers and statutes are decision-grade research, not legal or financial advice. Re-verify regulatory specifics against primary sources before they drive code or investment.
