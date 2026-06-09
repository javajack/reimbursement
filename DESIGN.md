# DESIGN.md — Kharcha Dossier

Editorial "ledger paper" system for a long-form, data-heavy strategy report. Light theme only. Built on Starlight; tokens override Starlight's CSS variables.

## Theme

**Light only.** Theme toggle removed. Rationale: long-form daytime reading, trust/credibility, explicit user requirement. Forced via `data-theme="light"` and a no-op `ThemeSelect` override.

## Color strategy

**Restrained → Committed.** Warm tinted-paper neutrals + one confident accent (ledger green) carrying links/nav/emphasis, with a clay secondary for flags and a red-clay for hard blocks. All OKLCH. No pure `#000`/`#fff`; every neutral tinted warm (hue ~60-90).

### Palette (OKLCH)

Neutrals (warm paper → ink):
- `paper`        `oklch(0.989 0.006 90)`  page background
- `paper-2`      `oklch(0.970 0.008 86)`  raised surface / sidebar / aside bg
- `paper-3`      `oklch(0.945 0.009 84)`  code bg, table header
- `line`         `oklch(0.885 0.010 82)`  hairlines / borders
- `line-strong`  `oklch(0.820 0.011 80)`
- `ink-faint`    `oklch(0.585 0.012 72)`  muted/meta text
- `ink-soft`     `oklch(0.420 0.012 66)`  secondary text
- `ink`          `oklch(0.245 0.012 60)`  primary text

Accent — **ledger green** (money/accounting association, muted, sophisticated; NOT navy, NOT neon):
- `accent-soft`  `oklch(0.945 0.030 165)` tint backgrounds
- `accent`       `oklch(0.520 0.090 165)` primary accent
- `accent-deep`  `oklch(0.400 0.080 165)` link text, hover, headings-accent

Secondary — **clay / terracotta** (warm flags, "watch this", per-diem highlights):
- `clay-soft`    `oklch(0.950 0.035 55)`
- `clay`         `oklch(0.585 0.130 48)`
- `clay-deep`    `oklch(0.470 0.120 48)`

Signal — **red-clay** (non-reimbursable / hard block / danger):
- `danger-soft`  `oklch(0.955 0.030 30)`
- `danger`       `oklch(0.545 0.165 28)`

Info — **muted indigo** (notes/regulatory references), used sparingly:
- `info-soft`    `oklch(0.950 0.025 265)`
- `info`         `oklch(0.500 0.090 265)`

### Semantic roles
- Links / active nav / focus: `accent-deep` text, `accent` underline.
- Allowed / pass: `accent`.
- Flag / caution / soft-policy: `clay`.
- Blocked / non-reimbursable / danger: `danger`.
- Tip / reference: `info`.

## Typography

Self-hosted via `@fontsource-variable`.
- **Display / headings:** `Newsreader Variable` (editorial serif, optical sizing). Weight 420-560. Tight tracking on large sizes. Signals "report / long-read," not "app."
- **Body / UI:** `Hanken Grotesk Variable` (warm humanist grotesk; deliberately NOT Inter). Weight 400 body, 500-600 UI emphasis.
- **Mono:** `JetBrains Mono Variable` for code, JSON specs, IFSC/GSTIN/figures-in-running-text where monospacing aids scanning.

Scale (≥1.25 contrast between steps): h1 2.6rem / h2 1.85rem / h3 1.35rem / h4 1.08rem / body 1.0625rem (17px) / small 0.875rem. Body line-height 1.7. Headings line-height 1.15, weight 540, serif.

Reading measure: content width ~52rem; prose paragraphs capped ~70ch. Tables may use full content width.

## Layout & rhythm

- Vary vertical spacing: generous space before h2 (3.2rem), tighter within sections. Not uniform padding.
- Avoid card-grid monotony. Use editorial devices: lead paragraphs, pull-stats inline, definition lists, comparison tables, labelled spec blocks. Cards only where genuinely the best affordance, never nested, never identical-grid filler.
- Sidebar: quiet, serif section labels, accent active state (left indicator is fine as nav affordance, but NOT a colored side-stripe on content callouts).

## Components (overrides)

- **Asides / callouts:** REMOVE Starlight's heavy left border-stripe (banned). Use full 1px border + tinted bg (accent/clay/danger/info soft) + colored title with inline icon. Four variants map to note→info, tip→accent, caution→clay, danger→danger.
- **Tables:** warm header row (`paper-3`), 1px `line` borders, comfortable padding, subtle row hover. Critical for data density.
- **Code / JSON:** `paper-3` bg, JetBrains Mono, expressive-code light theme tuned to paper. Used for rule-engine specs and bank-file samples.
- **Badges:** small caps, tinted-bg pill, used for verdicts (Build / Caution / Avoid), confidence (High/Med/Low), and policy outcome (Allow/Flag/Block).
- **Stat / figure:** present inline editorially. NO big-number hero-metric grid.
- **Site title:** Newsreader, with a small custom ledger mark (favicon/logo svg).

## Motion

Subtle, ease-out only (`cubic-bezier(0.22, 1, 0.36, 1)`). Link underline grow, nav hover color, aside icon. No layout-property animation, no bounce, no entrance choreography on content.

## Bans (enforced)

Side-stripe accent borders; gradient text (`background-clip:text`); decorative glassmorphism; hero-metric template; identical card grids; modals; em dashes in copy.
