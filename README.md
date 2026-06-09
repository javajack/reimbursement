# Kharcha Dossier

A research-backed **build dossier** for an India-first employee and vendor **expense-reimbursement SaaS**, published as an Astro + Starlight documentation site (light, editorial theme).

It answers one question with evidence and a committed recommendation: is this worth building as an indie hacker or small team, and if so, how. It covers market sizing, the India and global competitive landscape, verified pain points, personas and the buying committee, the full product spec (rule engine, maker-checker, OCR, KYC, payouts, edge cases), the regulatory map (GST, Income Tax, RBI, DPDP), pricing, freemium, GTM, unit economics, integrations, the roadmap, risks, and a final scored verdict.

> Working product name **Kharcha** (Hindi/Urdu for "expense"). Trivially swappable.

## The verdict, in one line

Conditional build. Worth building only as a software-only, **Tally-native, WhatsApp-first reimbursement product for sub-200-employee Indian SMBs and field-heavy teams**, with money movement partnered out and revenue from software seats, not card float. Start at `/overview/executive-summary/` or `/business/verdict/`.

## Commands

| Command           | Action                                                        |
| :---------------- | :------------------------------------------------------------ |
| `npm install`     | Install dependencies                                          |
| `npm run dev`     | Local dev server at `localhost:4321/reimbursement/`           |
| `npm run build`   | Build the static site to `./dist/`                            |
| `npm run preview` | Preview the production build locally                          |
| `./start.sh`      | Build, then serve on `localhost:7777/reimbursement/`          |

The site is configured with base path `/reimbursement` for GitHub Pages, so local URLs are served under `/reimbursement/` too.

## Deployment (GitHub Pages)

Pushing to `main` builds and deploys automatically via `.github/workflows/deploy.yml` (the official `withastro/action`). Live URL:

```
https://javajack.github.io/reimbursement/
```

One-time setup in the GitHub repo: Settings, Pages, set Source to "GitHub Actions".

If you later move to a custom domain served at the root, set `BASE = '/'` (and update `SITE`) in `astro.config.mjs`; the rehype base-prefix plugin then becomes a no-op and the two hardcoded hero links in `src/content/docs/index.mdx` should drop the `/reimbursement` prefix.

## Structure

```
src/
  content/docs/        # the dossier pages (.mdx), grouped by section
    overview/  market/  users/  product/  compliance/  business/  reference/
  styles/custom.css    # the editorial "ledger paper" light theme (OKLCH tokens)
  components/ThemeSelect.astro  # no-op: site is light-only
  assets/mark.svg      # ledger logo
astro.config.mjs       # title, sidebar, theme wiring (remark-gfm enabled for tables)
PRODUCT.md  DESIGN.md  # the brand + design system that shaped the theme
research/              # provenance: raw per-topic research, the synthesized THESIS, sources
```

## How it was built

The content is grounded in a multi-agent research pass: 14 domain researchers plus 7 adversarial fact-checkers running live web research, synthesized into `research/THESIS.md` and then authored into the pages. Figures carry their provenance and confidence; soft and vendor-sourced numbers are labelled. See `/reference/sources/` for the method and the full bibliography, and `research/raw/` for the underlying findings.

Numbers and statutes are decision-grade research, not legal or financial advice. Re-verify regulatory specifics against primary sources before they drive code or investment.
