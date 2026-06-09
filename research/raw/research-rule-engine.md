# Expense-policy / audit rule engines: design of a configurable rule engine for an India-focused B2B expense & vendor reimbursement SaaS

## Executive Summary

All four reference engines (SAP Concur, Fyle/Sage, Zoho Expense, Brex/Ramp) converge on the same core abstraction: a rule is an if/then object with a CONDITION (data-object operator value, AND-combinable) and an ACTION/EXCEPTION, plus a SEVERITY and a SCOPE. Concur formalizes this as General Settings + Conditions + Exception, where exceptions are color-coded: a YELLOW flag is a soft warning that still allows submission and a RED flag is a hard stop that blocks submission/approval. Fyle exposes the cleanest three-tier action model directly usable as your taxonomy: (1) Flag for approver (soft, submit allowed, red flag shown), (2) Warn employee + require a reason/justification (soft-gated), and (3) Mark incomplete / Critical (hard block — cannot be added to a report). Fyle and Zoho also add a "Cap to amount limit" action that auto-reduces the reimbursable amount, which is the mechanism behind partial coverage of a bill. Brex and Ramp push enforcement to spend-time (auto-approve in-policy, auto-decline out-of-policy) and use "last matching rule wins" ordering with specific rules placed lower. For evaluation order, Concur/Brex evaluate per-entry and per-report; partial coverage of one bill is achieved at the LINE-ITEM (itemization) level by marking portions Personal/Non-Reimbursable or capping, then summing only reimbursable lines. India-specific rules you must build natively and that none of the global tools handle well: GSTIN validation (15-char: 2-digit state code + 10-char PAN + entity digit + 'Z' + Luhn-mod-36 checksum), GSTIN-must-match-company-for-ITC (ITC only claimable if the invoice carries the company GSTIN and appears in GSTR-2B), per-diem by city-tier (Tier-1/metro vs Tier-2/3) and employee grade since India has no statutory per-diem rates, and the 50%/40% metro/non-metro HRA distinction (8 metros from FY2026-27). I recommend a single rule-object JSON schema (id, scope, condition tree, action one of allow/flag/warn/cap/block/route, severity, enabled, priority), explicit hard-vs-soft semantics, ordered evaluation with line-item-then-claim rollup, and a "cap" action to implement partial reimbursement of a mixed bill.

## Findings



## Data Points

- Brex default receipt-required threshold: **$75 (documentation/memo triggered above $50)** (2026)  — https://www.brex.com/support/policy-engine
- Fyle example receipt-mandatory threshold: **~$100 (configurable)** (2026)  — https://www.fylehq.com/help/en/articles/8523314-configuring-a-policy-to-mandate-receipts
- GSTIN length / structure: **15 chars = state(2)+PAN(10)+entity(1)+'Z'(1)+checksum(1)** (2026)  — https://cleartax.in/s/know-your-gstin
- GSTIN checksum algorithm: **Luhn mod 36 (chars 0-9 = 0-9, A-Z = 10-35)** (2026)  — https://thegstcalculator.in/tools/gst-number-validator
- HRA metro exemption rate: **50% of basic (metro) vs 40% (non-metro)** (FY2026-27)  — https://www.financetoolspro.com/guides/tax/metro-vs-non-metro-hra-rules.html
- Metro cities at 50% HRA from FY2026-27: **8 (Mumbai, Delhi, Kolkata, Chennai, Bengaluru, Pune, Hyderabad, Ahmedabad)** (FY2026-27)  — https://taxguru.in/income-tax/hra-exemption-8-cities-qualify-50-percent-exemption-practical-guide.html
- ITC reversal trigger (unpaid supplier): **180 days from invoice date** (2024)  — https://cleartax.in/s/gst-input-tax-credit
- Ramp AI Policy Agent in-policy accuracy (vendor claim): **99% on in-policy determinations; reviews 100% of expenses** (2026)  — https://ramp.com/spend-controls
- Typical revenue lost to fraud/errors (incl. duplicates) - industry estimate: **~5% of annual revenue** (2024)  — https://www.emburse.com/resources/complete-guide-to-expense-fraud-detection
- Concur cash-advance net example: **$600 expenses - $500 advance = $100 reimbursed** (2023)  — https://pschelp.cu.edu/s/article/Concur-Expense-Reconciling-Cash-Advances
- Fyle limit aggregation windows: **Individual, Daily, Weekly, Monthly, Quarterly, Semi-Annual, Yearly** (2026)  — https://help.fylehq.com/en/articles/1203330-configure-company-policies
- Zoho rule enforcement actions: **2 (Warn / Block)** (2026)  — https://www.zoho.com/us/expense/help/managing-policies/rules/
- Fyle policy actions: **5 (Flag, Cap-to-limit, Popup/Warn, Critical/Block, Skip-approver)** (2026)  — https://help.fylehq.com/en/articles/1203330-configure-company-policies

## Entities

- **SAP Concur Audit Rules**  [Reference rule engine]  (https://help.sap.com/docs/CONCUR_EXPENSE/bb83754b1c5541808d50c09901e11475/18834fe66f091014b9c6f7af97b6e9cd.html)
  if/then rules = General Settings + Conditions + Exception; red (hard) vs yellow (soft) flags; custom + random (sampling) audit rules; itemization for partial/personal claims.
- **Fyle / Sage Expense Management Policy Engine**  [Reference rule engine]  (https://help.fylehq.com/en/articles/1203330-configure-company-policies)
  Cleanest 3-tier action model: Flag (soft) / Warn+reason (soft-gated) / Critical-incomplete (hard block). Cap-to-limit action. User+Expense property conditions, period aggregation windows. Rebranded Sage Expense Management.
- **Zoho Expense Policies & Rules**  [Reference rule engine]  (https://www.zoho.com/us/expense/help/managing-policies/rules/)
  Limit types: Fixed Amount / Expense Count / Mileage Limit over Daily/Monthly/Yearly/Custom windows, per-category; actions Warn or Block; per-diem as % of location-based amount. India-HQ vendor, INR-native.
- **Brex Policy Engine**  [Reference rule engine]  (https://www.brex.com/support/policy-engine)
  if-this-then-that, AND-combinable conditions (Amount/Category/Vendor/Type/Role/HRIS), actions require-approval/receipt/memo/attendees/block; 'last rule wins' ordering; spend-time enforcement (auto-approve/auto-decline).
- **Ramp Spend Controls**  [Reference rule engine]  (https://ramp.com/spend-controls)
  Card-level MCC allow/block lists (Allowed categories, Allowed merchants, Blocked merchants); limits reset daily/weekly/monthly; AI Policy Agent reviews 100% of expenses, claims 99% accuracy on in-policy calls.
- **GSTIN (GST Identification Number)**  [India regulation / data validation]  (https://cleartax.in/s/know-your-gstin)
  15-char: state(2)+PAN(10)+entity(1)+'Z'(1)+checksum(1); checksum = Luhn mod 36. Format check is offline; live status needs GST portal.
- **GSTR-2B / Input Tax Credit (ITC)**  [India regulation]  (https://cleartax.in/s/gst-input-tax-credit)
  ITC claimable only if company GSTIN on invoice and invoice appears in GSTR-2B; reverse ITC if supplier unpaid >180 days. Drives the GSTIN-matches-company rule.
- **Income Tax HRA metro/non-metro (50%/40%)**  [India regulation]  (https://taxguru.in/income-tax/hra-exemption-8-cities-qualify-50-percent-exemption-practical-guide.html)
  8 metro cities at 50% from FY2026-27 (Mumbai, Delhi, Kolkata, Chennai, Bengaluru, Pune, Hyderabad, Ahmedabad); others 40%. Versioned reference list for city-tier tables.
- **Merchant Category Code (MCC)**  [Payments data standard]  (https://ramp.com/blog/merchant-category-code-list)
  4-digit ISO 18245 code; basis for category allow/block rules. For reimbursement (non-card) flows, MCC may be absent — fall back to internal expense category.

## Risks / Caveats

- GSTIN checksum (Luhn mod 36) only proves the number is well-formed, NOT that it is active or that ITC is claimable. A separate live GST-portal / GSTR-2B status check is required for real ITC assurance and is rate-limited/asynchronous - treat as a distinct, optionally-async rule with its own confidence and caching.
- India has no statutory per-diem rates (confidence medium on the 'no mandate' point - sourced from HR/compliance vendors Taggd and Rydoo, not a government circular). Per-diem caps are purely policy; do not present them as legally fixed. Tax-exemption depends on actual spend, so a per-diem 'cap' is a policy control, not a tax computation.
- The 8-city 50% HRA metro list is tied to Budget 2025 / FY2026-27 and HRA specifically; do not conflate HRA metro classification with per-diem city tiers - they are different policy axes that may share city names. Keep them as separate reference tables.
- 'Last matching rule wins' (Brex) and 'most specific lower' ordering is powerful but error-prone for non-technical admins; without a clear UI showing which rule fired and why, configurable engines routinely produce surprising reimbursements. Budget for a rule-trace/explain feature from day one.
- Several vendor capability claims come from marketing pages (Ramp 99% in-policy accuracy, Fyle real-time duplicate detection) rather than independent benchmarks - treat accuracy figures as vendor-stated, medium confidence.
- Fyle is now branded 'Sage Expense Management' (Sage acquisition); some help URLs redirect from help.fylehq.com to fylehq.com/help and the product naming is in flux - cite both and expect link rot.
- Concur's authoritative audit-rule docs (help.sap.com and the official PDF setup guide) are gated/binary and could not be fully fetched; the Concur structural claims are corroborated from SAP Learning summaries and university Concur admin guides (medium-high), not the raw spec. Validate exact field/operator lists against a live Concur tenant before finalizing the spec.
- MCC-based blocklists assume card transactions; for out-of-pocket reimbursement claims there is no MCC, so an MCC rule must degrade gracefully to internal category matching or it will never fire.

## Recommendations

- Adopt a single rule-object JSON schema and persist rules as data, not code. Proposed shape: { id, name, description, scope (one of: line_item | claim | advance | vendor_invoice), enabled (bool), priority (int, lower = earlier), condition (a recursive AND/OR tree of {field, operator, value} leaves), action (one of: allow | flag | warn | cap | block | route), severity (one of: info | low | medium | high | critical), hardness (hard | soft), params (action-specific, e.g. cap_to, route_to_role, require=[receipt|gstin|memo|attendees]), message, tags, effective_from, effective_to, version }.
- Use exactly 6 action verbs and map them to the observed engines: allow (explicit pass / auto-approve, like Brex auto-approve), flag (soft red flag for approver, submit allowed - Fyle action 1 / Concur yellow), warn (soft-gated: require employee reason before submit - Fyle action 2), cap (auto-reduce reimbursable amount to a limit - Fyle/Zoho cap-to-limit; the partial-coverage primitive), block (hard stop / mark incomplete / decline - Fyle action 3 / Concur red / Ramp decline), route (send to a specific approver/grade or to random manual audit - Concur random audit + Brex require-approval).
- Make hard-vs-soft an explicit boolean field, not implied by action: 'block' is always hard; 'flag'/'warn'/'cap'/'route' are soft by default but allow a 'hardness' override. Hard rules short-circuit and prevent claim submission/approval; soft rules accumulate as exceptions the approver can override with a logged reason. Mirror Concur red/yellow semantics exactly.
- Define a deterministic evaluation order: (1) sort enabled rules by scope then priority; (2) evaluate line_item-scoped rules per line, then claim-scoped rules over the aggregated claim, then advance/vendor rules; (3) within a scope use 'last matching rule wins' for conflicting actions on the same field (Brex model) but let any 'block' override any softer action regardless of order. Document this; ordering bugs are the #1 source of wrong reimbursements.
- Implement partial coverage of one bill purely through line-item itemization + the 'cap' action: model a bill as a parent expense with N line items, evaluate each line, set each line's reimbursable_amount = min(claimed, cap) and 0 if marked non_reimbursable or blocked-hard, then claim.reimbursable_total = sum(reimbursable lines) - assigned_advance_balance. This makes 'mixed reimbursable/non-reimbursable in one bill' and advance netting fall out of the same aggregation.
- Build India-specific rules as native first-class rule types, not user-authored conditions, because they need code: GSTIN_FORMAT (offline Luhn-mod-36 + state/PAN regex), GSTIN_MATCHES_COMPANY (compare to org GSTIN for ITC), GSTIN_LIVE_STATUS (optional async GST-portal/GSTR-2B check, separate from format), PER_DIEM_CAP (keyed on city_tier x employee_grade lookup table), and ITC_ELIGIBLE (tax invoice present + company GSTIN + within 180-day payment window).
- Ship a versioned, editable reference table layer that rules read from (not hard-coded constants): city_tier mapping (with the 8-metro HRA list as a named set, effective FY2026-27), per_diem matrix [city_tier x grade x expense_type], mileage rates per vehicle class, MCC/category allow-block lists, and statutory thresholds. Add effective_from/effective_to so rules and rates can change without code deploys - India tax rules change at every budget.
- Provide duplicate-detection and weekend/holiday/recency as built-in computed conditions exposed as fields the rule engine can test (e.g. is_duplicate, days_since_spend, is_weekend, is_holiday) rather than asking admins to write them; back is_duplicate with amount+date+vendor match plus receipt-hash and cross-employee matching as the industry baseline.
- Separate spend-time controls (card MCC allow/block, declines - Ramp/Brex model) from submission-time audit (reimbursement claims), but run them through the SAME rule schema with different scope/enforcement points, so an indie team maintains one engine. For pure reimbursement (no card) the MCC field may be null; fall back to internal expense category.
- Log every rule firing as an immutable audit-trail event (rule id+version, input snapshot, action taken, severity, approver override + reason). This is required both for India GST/ITC defensibility and to match Concur/Ramp 'full audit trail' expectations, and is cheap insurance for a small team.

## Sources

- SAP Learning — Configuring Audit Rules (Concur Standard for Admins) — https://learning.sap.com/learning-journeys/getting-started-with-concur-expense-standard-for-administrators/configuring-audit-rules  (Audit rule = General Settings + Conditions + Exception; red vs yellow flag severity; if/then model.)
- SAP Help — Audit Rules (Concur Expense) — https://help.sap.com/docs/CONCUR_EXPENSE/bb83754b1c5541808d50c09901e11475/18834fe66f091014b9c6f7af97b6e9cd.html  (Authoritative (gated) reference for Concur audit rule data objects and exceptions.)
- SAP Learning — Configuring Random Audit Rules — https://learning.sap.com/courses/working-with-secondary-configuration-and-administrative-tools-in-concur-expense-professional-edition/configuring-random-audit-rules-2  (Percentage-based and sequential sampling = the 'route to manual audit' rule type.)
- Fyle Help — Configure Company Policies — https://help.fylehq.com/en/articles/1203330-configure-company-policies  (User vs Expense property conditions; aggregation windows; actions Flag/Cap/Popup/Critical/Skip-approver.)
- Fyle Help — Configuring a policy to mandate receipts — https://www.fylehq.com/help/en/articles/8523314-configuring-a-policy-to-mandate-receipts  (Explicit 3-tier action model (Flag / Warn+reason / Mark incomplete-Critical) and receipt threshold scoping.)
- Fyle — Expense Compliance product page — https://www.fylehq.com/product/compliance  (Real-time policy engine, duplicate-receipt detection, violation types, flag-before-approval.)
- Zoho Expense — Rules (User Guide) — https://www.zoho.com/us/expense/help/managing-policies/rules/  (Limit types Fixed/Count/Mileage over Daily/Monthly/Yearly/Custom; Warn vs Block; INR custom example.)
- Zoho Expense — Per Diem — https://www.zoho.com/us/expense/per-diem/  (Per-diem by location, split by expense type, % of location amount, by travel hours.)
- Brex — Policy Engine — https://www.brex.com/support/policy-engine  (if-this-then-that, AND conditions, action set, 'last rule wins' ordering, real-time re-evaluation, $75 receipt default.)
- Ramp — Spend Controls — https://ramp.com/spend-controls  (Pre-spend limits/restrictions, receipt+memo requirements, AI Policy Agent 100% review / 99% in-policy claim.)
- Ramp Help — Setting up category and merchant restrictions — https://support.ramp.com/hc/en-us/articles/1500001319081-Setting-up-category-and-merchant-restrictions  (MCC allow-list / merchant allow-list / merchant block-list model; decline on unauthorized category.)
- Ramp — Merchant Category Code Reference Guide — https://ramp.com/blog/merchant-category-code-list  (MCC reference for category-based controls.)
- ClearTax — Know your GSTIN — https://cleartax.in/s/know-your-gstin  (15-char GSTIN structure and components.)
- The GST Calculator India — GSTIN Validator & Decoder — https://thegstcalculator.in/tools/gst-number-validator  (Luhn mod 36 checksum algorithm detail for offline GSTIN validation.)
- Busy — GSTIN: 15-Digit Format, Importance & Common Issues — https://busy.in/gst/gstin-everything-you-need-to-know/  (State code / PAN / entity / Z / checksum breakdown; cancelled-but-valid caveat.)
- ClearTax — GST Input Tax Credit — https://cleartax.in/s/gst-input-tax-credit  (ITC needs invoice in GSTR-2B + valid tax invoice; 180-day reversal rule.)
- DMA — Input Tax Credits for Employee Reimbursements — https://dmainc.com/news-and-insights/input-tax-credits-for-employee-reimbursements/  (ITC on reimbursements requires company GSTIN on the invoice.)
- TaxBuddy — GST on reimbursement of travel expenses — https://www.taxbuddy.com/blog/gst-reimbursement-travel-expenses  (Invoice must carry company GSTIN and reflect in GSTR-2B for ITC.)
- Taggd — Per Diem Allowance for Indian Businesses — https://taggd.in/hr-glossary/per-diem-allowance/  (No government-mandated per-diem; tax-exempt only up to actual business spend; city-tier system.)
- Rydoo — India Per Diem compliance — https://www.rydoo.com/compliance/india/india-per-diem/  (India per-diem is employer-set; compliance context.)
- FinanceToolsPro — HRA Metro vs Non-Metro rules 2026 — https://www.financetoolspro.com/guides/tax/metro-vs-non-metro-hra-rules.html  (50% metro / 40% non-metro; 8-city list from Budget 2025.)
- TaxGuru — HRA exemption: 8 cities qualify for 50% — https://taxguru.in/income-tax/hra-exemption-8-cities-qualify-50-percent-exemption-practical-guide.html  (Authoritative-style breakdown of the 8 metro cities, effective FY2026-27.)
- Mysa — Duplicate Expense Detection: Process, Benefits, Challenges — https://www.mysa.io/glossary/duplicate-expense  (Duplicate = same amount+date+vendor plus metadata; detection approach.)
- AppZen — Double dipping: detect duplicate receipts — https://www.appzen.com/blog/duplicate-receipts  (Cross-employee receipt matching and duplicate detection.)
- Emburse — Complete Guide to Expense Fraud Detection — https://www.emburse.com/resources/complete-guide-to-expense-fraud-detection  (~5% revenue lost to fraud/errors; duplicate share.)
- University of Colorado — Concur Reconciling Cash Advances — https://pschelp.cu.edu/s/article/Concur-Expense-Reconciling-Cash-Advances  (Advance netting math ($600-$500=$100) and reconciliation flow.)
- Columbia — Reconcile personal/non-reimbursable transactions in Concur — https://travel-expense.finance.columbia.edu/news/how-do-i-reconcile-personal-or-non-reimbursable-transactions-concur  (Mark line items Personal/Non-Reimbursable = partial coverage of one bill.)

