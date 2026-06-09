# Edge cases & workflow nuances for India employee & vendor expense-reimbursement SaaS, plus a canonical maker-checker approval state machine

## Executive Summary

A robust India expense-reimbursement product must treat tax/regulatory handling as a first-class data model, not a reporting afterthought. The single most consequential design fork is employee reimbursement (cost-to-cost, receipt-backed, no TDS under Sec 192, no GST when purchased from a registered dealer in the company's name) versus vendor-invoice reimbursement (TDS under 194C/194J/195, GST/ITC eligibility, and Reverse Charge Mechanism when buying from unregistered suppliers). Because mode of payment (payroll vs direct bank transfer) does NOT change taxability — only the nature/documentation of the expense does — the product's job is to capture nature, business-nexus, and receipt evidence cleanly enough to defend an exemption under Sec 10(14)/Rule 3, and to drive both payroll and bank-payout rails. Line-item granularity is mandatory: one bill routinely mixes reimbursable + non-reimbursable and GST-eligible + blocked-ITC (Sec 17(5)) items, and partial line-item approval/rejection must be expressible. Multi-GSTIN/multi-entity is structural in India (separate registration per state, distinct-persons concept, mandatory ISD from 1 Apr 2025, cross-charge), so every expense needs entity + GSTIN + place-of-supply tagging. Statutory retention is 72 months (6 years) from the GSTR-9 due date under CGST Sec 36, extended for litigation, which dictates an immutable audit trail and document-vault retention engine. Operational edge cases — cash advances/imprest float settlement, FX rate sourcing (RBI/FBIL reference vs card vs AD-bank TT), per-diem vs actuals, mileage (no statutory rate; logbook required for Sec 10(14) exemption), corporate-card vs out-of-pocket reconciliation, duplicate/near-duplicate detection, split bills, recurring expenses, expense-on-behalf, clawbacks — each map to concrete schema and workflow requirements. The approval engine should be a maker-checker (4-eyes) finite state machine with threshold-based multi-level routing (up to ~5 levels), SLA timers with auto-escalation, and delegation for approvers on leave. India-field realities (offline/low-connectivity capture, regional-language/Indic-script OCR, DPDP data-residency preference for in-India processing) and bulk period-close processing round out the must-haves.

## Findings

- **Employee reimbursement and vendor-invoice reimbursement are fundamentally different tax objects and must be modeled as distinct entities, not the same 'expense'.** _(high)_
  Employee cost-to-cost reimbursements (receipt-backed, official duty) attract no TDS under Sec 192 and no GST when purchased from a registered dealer in the company name. Vendor/contractor reimbursements attract TDS under Sec 194C (1-2%), 194J (10%), 194R (10% perquisite), or 195 (non-resident), with TDS applying to the service portion only if reimbursables are separately invoiced with original receipts; if fees and expenses are mixed without segregation the entire amount can be subject to TDS.
  - src: https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india  |  https://www.indiafilings.com/learn/employee-reimbursement-under-gst/
- **Mode of payout (payroll vs direct bank transfer) does NOT change taxability; only the nature and documentation of the expense does.** _(high)_
  Reimbursement of expenses wholly, necessarily and exclusively incurred in performance of official duties is excluded from taxable salary regardless of whether paid directly or on the employee's behalf. Product implication: payout channel is a settlement choice (payroll component vs bank/UPI transfer), but the taxability flag is driven by expense category + receipt + business-nexus, so both rails must read the same tax classification.
  - src: https://taxsummaries.pwc.com/india/individual/income-determination  |  https://www.incometaxindia.gov.in/w/employees-benefits-allowable
- **Company-defined reimbursements (fuel, mobile/telephone, conveyance) hinge on Section 10(14) and Rule 3 perquisite valuation, and the product must capture the evidence that preserves exemption.** _(high)_
  Sec 10(14) covers allowances/reimbursements for expenses wholly, necessarily and exclusively incurred in official duties; Rule 3(7)(ix) makes employer reimbursement of mobile/telephone/internet bills non-taxable when used for official purposes with documentation; Rule 3 fuel/running-and-maintenance reimbursement can be valued at Rs 0 perquisite if the vehicle is used wholly for official duty. Personal-use portion becomes a taxable perquisite under Sec 17(2). Product must store declared official-use %, bills, and category to defend exemption.
  - src: https://www.incometaxindia.gov.in/w/employees-benefits-allowable  |  https://www.hinote.in/taxability-of-fuel-expense-reimbursement-to-employees-part-i-hinote-systems-outsourced-payroll-services-online-payroll-software/  |  https://cleartax.in/s/perquisites-in-income-tax
- **One bill mixing reimbursable + non-reimbursable AND GST-eligible + blocked-ITC items forces line-item-level data model, not header-level.** _(high)_
  GST ITC under Sec 16 requires a valid invoice in the company GSTIN with goods/services received; Sec 17(5) blocks ITC on food & beverages, club memberships, employee welfare, and motor vehicles for personal use. A single restaurant/hotel/travel bill can contain both claimable and blocked lines, so the product must split a receipt into line items each carrying its own reimbursable flag, tax-code, and ITC-eligibility.
  - src: https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india  |  https://cleartax.in/s/gst-on-reimbursement-expenses-supplier
- **Partial approvals and partial line-item rejection must be a native state, not a binary approve/reject.** _(medium)_
  Approval workflows expose statuses Processing / Pending approval / Approved / Rejected / Paid; a robust product must allow an approver to approve some lines and reject/query others (partial approval), reducing the approved amount and routing the rejected delta back to the maker without killing the whole claim. This pairs with the line-item model above.
  - src: https://www.volopay.com/expense-management/maker-checker-workflow-for-expense-approvals/  |  https://billdock.io/blog/expense-approval-workflow-design
- **Cash advances / imprest / float require an advance-issue then settlement/adjustment lifecycle distinct from straight reimbursement, hitting different ledgers.** _(high)_
  With an expense advance the employee receives funds first and presents receipts later; reconciliation verifies that remaining cash + vouchers equals the original float, with the spent amount replenished. Employee advances, vendor prepayments, and salary advances hit different ledgers and follow different rules (salary advances follow payroll cycles, expense advances need immediate bill-based settlement). Petty cash floats in India typically run Rs 5,000-20,000. Product must net advances against claims, track outstanding/unsettled advances, and support top-up/return-of-excess.
  - src: https://www.aiaccountant.com/blog/advance-expense-management-india  |  https://happay.com/blog/petty-cash-accounting/  |  https://www.enkash.com/resources/blog/what-is-imprest-cash-meaning
- **Foreign-currency expenses need a configurable FX rate-source policy with a defined rate date, because no single rate is universally correct.** _(high)_
  Companies can use official/market/bank/credit-card rate and the rate on purchase/submission/approval/reimbursement dates. RBI publishes daily reference rates for USD/EUR/GBP/JPY-INR (mean of bid/offer polled ~12 noon); since July 2018 FBIL computes/disseminates these. Best practice: RBI/FBIL reference for reporting, AD bank TT for settlement, gateway/card rate when applicable. Product must let admins pin a rate source + rate date and store both original and INR amounts plus the rate used.
  - src: https://www.rbi.org.in/scripts/referenceratearchive.aspx  |  https://www.aiaccountant.com/blog/foreign-currency-reconciliation-india  |  https://use.expensify.com/blog/accounting-foreign-currency-expense-reports
- **Per-diem vs actuals are two different claim modes with different data and audit burden; the product should support both, including hybrids.** _(high)_
  Per-diem pays a flat daily rate regardless of actual spend (low admin, no receipts) and is common in regulated/public sector; actuals require itemized receipts (richest data, highest admin). For international trips firms use per-diem schedules or actuals. Product implication: per-diem needs rate tables by city/grade and partial-day rules; actuals need receipt capture; hybrid policies (per-diem for meals, actuals for hotel) must coexist on one trip.
  - src: https://navan.com/blog/international-per-diem-rates
- **Mileage / self-driven vehicle reimbursement has NO statutory per-km rate in India; exemption depends on a logbook, so the product must compute distance and enforce log capture.** _(high)_
  India imposes no government-mandated per-km rate; employers set their own (commonly ~Rs 5/km car, Rs 3/km two-wheeler). Tax-exempt status under Sec 10(14) requires a logbook recording date, route, purpose and distance. Product must support configurable per-km rates by vehicle type, distance entry (manual or map/GPS), and mandatory logbook fields to defend the exemption.
  - src: https://motolog.app/vehicle-reimbursement-in-india  |  https://www.rydoo.com/compliance/india/india-mileage/
- **Corporate-card vs out-of-pocket spend needs reconciliation/matching so card-paid expenses are not double-reimbursed.** _(high)_
  Card feeds must be matched to submitted receipts; expense software extracts merchant, date, amount, tax and payment method and matches card transactions to expense entries to flag discrepancies. Product implication: a 'who-paid' field (company card vs personal) gates whether a claim creates a payout (out-of-pocket) or merely reconciles a card charge (no payout, just coding/ITC), preventing double payment.
  - src: https://www.coupa.com/blog/expense-fraud/  |  https://ramp.com/blog/how-to-automate-your-expense-approval-process
- **Reverse Charge Mechanism (RCM) and self-invoicing are a real compliance burden when employees buy from unregistered suppliers; the product should flag RCM-triggering spend.** _(medium)_
  Rule 47A (effective 1 Nov 2024) requires recipients to generate self-invoices within 30 days of receiving goods/services from unregistered suppliers to keep ITC eligibility; ITC must be claimed in the same tax period as payment. Product implication: detect supplier-unregistered cases, flag RCM liability, and support self-invoice generation/tracking within the 30-day window.
  - src: https://www.binarysemantics.com/blogs/reverse-charge-mechanism-rcm-under-gst-applicability-e-invoicing-import-of-services/  |  https://figmentglobal.com/reverse-charge-mechanism/
- **Multi-entity / multi-branch / multi-GSTIN is structural in India and every expense must be tagged to legal entity, GSTIN, and place of supply.** _(high)_
  Separate GST registration is mandatory per state where supplies are made; branches under one PAN are 'distinct persons' / distinct place of supply. Cross-charge applies to internally-shared services (HR, IT, accounting) as deemed supplies. ISD (Input Service Distributor) became MANDATORY from 1 Apr 2025 (Finance Act 2024 changed 'may' to 'shall' in Sec 20). Product must allocate/cost-center expenses to the correct GSTIN and support ISD/cross-charge distribution of ITC.
  - src: https://tallysolutions.com/gst/multi-gst-registration-in-different-states/  |  https://www.taxmann.com/post/blog/analysis-input-service-distributor-isd-vs-cross-charge  |  https://gstcouncil.gov.in/sites/default/files/2024-06/circular-cgst-199.pdf
- **Statutory voucher/record retention is 72 months (6 years) from the GSTR-9 due date under CGST Sec 36, extended during litigation — driving an immutable retention engine.** _(high)_
  Section 36 CGST mandates retaining books/records (tax invoices, credit/debit notes, e-Way Bills, payment & refund vouchers, returns) for 72 months from the due date of furnishing the annual return (GSTR-9). If in appeal/revision/investigation, retain until 1 year after final disposal or 72 months, whichever is later. Electronic records with reliable backup/retrievability are acceptable. Product must guarantee non-deletion within window and litigation-hold extension.
  - src: https://ardhorajiya.com/period-of-retention-of-accounts-section-36-of-gst/  |  https://www.aubsp.com/cgst-act-section-36-explained/  |  https://taxguru.in/goods-and-service-tax/accounts-other-records-gst-retention-period.html
- **An immutable, timestamped audit trail that does not rely on external email is a hard requirement for statutory audit.** _(medium)_
  Guidance: timestamp every action and maintain a complete audit trail without relying on external emails; auditors require view-only access to invoices and exportable trails for statutory audits. Product implication: append-only event log capturing who/what/when on every state change, with export and read-only auditor role.
  - src: https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india
- **Duplicate / near-duplicate / resubmission detection must run org-wide and tolerate altered amounts/dates.** _(high)_
  Receipt-fraud systems identify identical or highly similar receipts and use OCR + pattern-matching to compare against all previously submitted receipts across the organization, catching near-duplicates even when amounts or dates are slightly altered. Product implication: fingerprint receipts (hash + OCR fields) and block/flag resubmission of the same bill, including across employees and across claim periods.
  - src: https://www.taggun.io/fake-receipt-checker  |  https://www.coupa.com/blog/expense-fraud/  |  https://use.expensify.com/blog/preventing-expense-fraud
- **E-invoicing thresholds are falling fast and the product should reconcile reimbursed vendor invoices against IRN/IRP rules.** _(medium)_
  E-invoicing mandatory above Rs 5 crore turnover from 1 Apr 2024; from 1 Apr 2025 taxpayers with Rs 10 crore+ must report invoices to the IRP within 30 days; reporting threshold widely cited to drop toward Rs 2 crore (Oct 2025 per several sources). Non-generation penalty: 100% of tax due or Rs 10,000, whichever higher. Product implication: validate vendor invoices carry a valid IRN where applicable and surface 30-day reporting risk.
  - src: https://cleartax.in/s/e-invoicing-gst  |  https://www.gimbooks.com/blog/e-invoice-limit-in-india/  |  https://taxguru.in/goods-and-service-tax/mandatory-gst-e-invoicing-rules-deadlines.html
- **Maker-checker (4-eyes) with threshold-based multi-level routing and delegation-on-leave is the canonical approval engine.** _(high)_
  Maker-checker is a dual-approval / 4-eyes principle: maker submits, checker verifies and approves/rejects. Multi-level approval can route by expense range up to ~5 levels deep. Delegation lets approval authority transfer to a deputy/designated colleague for a defined period when the primary approver is on leave/unavailable, ensuring continuity. Product must support amount-threshold routing, deputy/delegate config, and out-of-office windows.
  - src: https://www.volopay.com/expense-management/maker-checker-workflow-for-expense-approvals/  |  https://www.volopay.com/blog/multi-level-approval-for-reimbursement/  |  https://argano.com/insights/articles/microsoft-expense-multilevel-approval-hierarchy-workflow.html
- **Canonical maker-checker approval state machine: defined states, roles, transitions, escalation, SLA, and delegation.** _(medium)_
  States: DRAFT -> SUBMITTED -> UNDER_REVIEW -> {PARTIALLY_APPROVED | APPROVED | REJECTED | QUERIED/SENT_BACK} -> APPROVED -> PENDING_PAYMENT -> PAID -> SETTLED/CLOSED, plus CANCELLED and RECOVERY/CLAWBACK. Roles: Maker (claimant/booker), Checker/Approver L1..Ln (amount-threshold routed, up to ~5 levels), Finance/Payout, read-only Auditor. Transitions are role-gated; an approver may approve, reject, or partially approve specific lines; QUERIED returns to maker preserving history. Escalation: per-step SLA timer (N business hours/days) auto-reminds then auto-escalates to next level (optional auto-approve below threshold), SLA breaches logged. Delegation: each approver sets a deputy + date window so claims route to the delegate during leave, with the delegation recorded in the audit trail.
  - src: https://www.volopay.com/expense-management/maker-checker-workflow-for-expense-approvals/  |  https://www.volopay.com/blog/multi-level-approval-for-reimbursement/  |  https://argano.com/insights/articles/microsoft-expense-multilevel-approval-hierarchy-workflow.html  |  https://billdock.io/blog/expense-approval-workflow-design
- **India field realities — offline/low-connectivity capture, regional-language/Indic-script receipts, and DPDP-aligned in-India data processing — are must-haves for an indie India-first product.** _(medium)_
  OCR vendors note crumpled and Indic-script receipts need explicit support; tools advertise Indian-language autoscan and 200-language parsing. Field employees capture via phone photo/email/PDF offline then sync. Privacy guidance: prefer vendors that store/process within India, log purpose at every OCR call, and apply retention limits (DPDP-aligned). Product implication: offline-first mobile capture queue, Indic OCR, and India-resident processing.
  - src: https://asprise.com/receipt-ocr/blog-IN-india-receipt-ocr-for-expense-claim  |  https://hyperverge.co/blog/receipt-scanner-app/
- **Recurring/subscription, split/shared bills, expense-on-behalf-of-others, clawbacks, and bulk period-close are recurring operational nuances each needing explicit support.** _(medium)_
  Recurring expenses (SaaS subscriptions, rent) benefit from templated/auto-recurring claims; split/shared bills need a 'who-paid' + allocation model so one payer claims and others' shares are attributed; expense-on-behalf requires a delegate/booker field separating payer from beneficiary; clawbacks/recovery need a negative-claim / netting-against-future-reimbursement or payroll-deduction path; bulk period-close needs batch approval/export at month-end. These are standard in mature expense tooling and map to schema flags (recurrence rule, split allocation, on-behalf-of, recovery ledger, batch status).
  - src: https://billdock.io/blog/expense-approval-workflow-design  |  https://www.aiaccountant.com/blog/advance-expense-management-india

## Data Points

- GST/accounting record retention period (CGST Sec 36): **72 months (6 years) from GSTR-9 annual return due date; extended to 1 year after final disposal of litigation if later** (2024-2026)  — https://ardhorajiya.com/period-of-retention-of-accounts-section-36-of-gst/
- TDS rate on contractor reimbursement (Sec 194C): **1-2% on service portion (only if reimbursables separately invoiced with receipts)** (2026)  — https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india
- TDS rate on professional reimbursement (Sec 194J): **10%** (2026)  — https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india
- TDS rate on perquisite (Sec 194R): **10% (escaped if no personal benefit, expense on client's behalf, per CBDT Circular 12/2022)** (2026)  — https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india
- GST pure-agent exclusion conditions (Rule 33): **5 conditions, all required (no markup, separate invoice, recipient's name, no title/interest, recovery at actual cost)** (2026)  — https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india
- Employee gift GST threshold: **Gifts exceeding Rs 50,000 treated as supply subject to GST** (2026)  — https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india
- RCM self-invoicing window (Rule 47A): **Self-invoice within 30 days of receipt from unregistered supplier; ITC in same tax period as payment** (2024-11-01)  — https://www.binarysemantics.com/blogs/reverse-charge-mechanism-rcm-under-gst-applicability-e-invoicing-import-of-services/
- ISD (Input Service Distributor) mandatory date: **Mandatory from 1 April 2025 (Finance Act 2024 changed 'may' to 'shall' in Sec 20 CGST)** (2025-04-01)  — https://www.taxmann.com/post/blog/analysis-input-service-distributor-isd-vs-cross-charge
- E-invoicing turnover threshold: **Mandatory above Rs 5 crore from 1 Apr 2024; widely reported drop toward Rs 2 crore (Oct 2025)** (2024-2025)  — https://cleartax.in/s/e-invoicing-gst
- E-invoice 30-day IRP reporting rule: **Turnover Rs 10 crore+ must report invoices to IRP within 30 days from 1 Apr 2025** (2025-04-01)  — https://taxguru.in/goods-and-service-tax/mandatory-gst-e-invoicing-rules-deadlines.html
- E-invoice non-generation penalty: **100% of tax due or Rs 10,000, whichever higher** (2026)  — https://cleartax.in/s/e-invoicing-gst
- Typical petty-cash / imprest float (India): **Rs 5,000 to Rs 20,000** (2024-2026)  — https://happay.com/blog/petty-cash-accounting/
- Typical mileage reimbursement rate (no statutory rate): **~Rs 5/km car, ~Rs 3/km two-wheeler (employer-defined); exemption needs logbook under Sec 10(14)** (2026)  — https://motolog.app/vehicle-reimbursement-in-india
- Medical reimbursement exemption (old regime): **Up to Rs 15,000/year with valid bills** (2024)  — https://www.bankbazaar.com/tax/exemption-on-medical-reimbursement.html
- RBI/FBIL reference rate publication: **Daily USD/EUR/GBP/JPY-INR, mean of bid/offer polled ~12 noon; FBIL computes since July 2018** (2026)  — https://www.rbi.org.in/scripts/referenceratearchive.aspx
- Multi-level approval depth (typical max): **Up to ~5 levels deep, threshold-routed by expense range** (2026)  — https://www.volopay.com/blog/multi-level-approval-for-reimbursement/
- Blocked ITC categories (Sec 17(5)): **Food & beverages, club memberships, employee welfare, motor vehicles for personal use** (2026)  — https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india

## Entities

- **CGST Act Section 36**  [regulation]  (https://taxinformation.cbic.gov.in/content-page/explore-act/1000306/1000001)
  Period of retention of accounts/records: 72 months from GSTR-9 due date; drives retention engine.
- **Income Tax Section 10(14)**  [regulation]  (https://www.incometaxindia.gov.in/w/employees-benefits-allowable)
  Exempts allowances/reimbursements wholly/necessarily/exclusively for official duties; basis for tax-free reimbursement.
- **Income Tax Rule 3 / Rule 3(7)(ix) / Section 17(2)**  [regulation]  (https://cleartax.in/s/perquisites-in-income-tax)
  Perquisite valuation: fuel/car, mobile/telephone reimbursement; personal use becomes taxable perquisite.
- **TDS Sections 192 / 194C / 194J / 194R / 195**  [regulation]  (https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india)
  Employee (192, no TDS on cost-to-cost) vs vendor/contractor/professional/non-resident TDS; segregation of reimbursables critical.
- **CBDT Circular 12/2022**  [regulation]  (https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india)
  Clarifies 194R: pure reimbursements on client's behalf with third-party invoices not perquisites.
- **GST Rule 33 (Pure Agent)**  [regulation]  (https://cleartax.in/s/gst-on-reimbursement-expenses-supplier)
  5 conditions to exclude reimbursements from GST taxable value.
- **GST Section 17(5) (Blocked ITC)**  [regulation]  (https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india)
  Blocks ITC on F&B, club, welfare, personal vehicles — forces line-item ITC flagging.
- **GST Rule 47A (RCM self-invoicing)**  [regulation]  (https://www.binarysemantics.com/blogs/reverse-charge-mechanism-rcm-under-gst-applicability-e-invoicing-import-of-services/)
  Self-invoice within 30 days for unregistered-supplier purchases; effective 1 Nov 2024.
- **Input Service Distributor (ISD) / CGST Section 20**  [regulation]  (https://www.taxmann.com/post/blog/analysis-input-service-distributor-isd-vs-cross-charge)
  Mandatory from 1 Apr 2025 (Finance Act 2024); ITC distribution across multi-GSTIN entities.
- **CBIC e-Invoicing / IRP / IRN regime**  [regulation]  (https://cleartax.in/s/e-invoicing-gst)
  Turnover-threshold e-invoicing; 30-day IRP reporting; validate vendor invoices.
- **RBI / FBIL Reference Rates**  [api]  (https://www.rbi.org.in/scripts/referenceratearchive.aspx)
  Authoritative daily INR reference FX rates; candidate FX source for reporting.
- **DPDP Act 2023 (data residency)**  [regulation]
  Drives preference for in-India OCR/data processing; log purpose, apply retention limits.
- **Zoho Expense**  [product]  (https://www.zoho.com/in/payroll/academy/payroll-operations/perquisites.html)
  India-origin competitor; free plan up to 3 users, multi-currency, Indian-language autoscan.
- **Happay**  [product]  (https://happay.com/blog/petty-cash-accounting/)
  India expense/petty-cash + corporate-card competitor.
- **Volopay**  [product]  (https://www.volopay.com/expense-management/maker-checker-workflow-for-expense-approvals/)
  Maker-checker workflow + multi-level approval reference; competitor.
- **EnKash**  [product]  (https://www.enkash.com/resources/blog/what-is-imprest-cash-meaning)
  India imprest/petty-cash + card competitor.
- **HyperVerge / Asprise / Taggun OCR**  [api]  (https://hyperverge.co/blog/receipt-scanner-app/)
  Receipt OCR incl. GSTIN extraction, Indic-script support, fake-receipt detection — build-vs-buy options.

## Risks / Caveats

- Several quantitative regulatory items (e-invoicing dropping to Rs 2 crore in Oct 2025; RCM Rule 47A specifics) are from secondary tax-advisory blogs rather than the CBIC notification text; confirm against the official CBIC/GST Council notification before hard-coding thresholds. Marked medium confidence.
- Mileage rates (~Rs 5/km, Rs 3/km) are illustrative industry practice, not statutory — India has no government per-km rate; do not present as a legal figure.
- Tax classification rules change with the Income-tax Act 2025 transition (allowance exemptions more tightly linked to actual expenditure) — the product's tax engine must be config-driven and versioned, not hardcoded; a payroll audit is advised for FY2025-26+.
- Some operational edge-case findings (recurring, split bills, on-behalf, clawbacks, partial line-item rejection) are grounded in product-vendor and best-practice sources rather than primary regulators; they are standard features but exact behavior is a design choice, marked medium confidence.
- GST treatment of employer-employee reimbursements can face AAR scrutiny (related-party/distinct-person rulings vary by state); legal review recommended for edge categories like gifts >Rs 50,000 and cross-charge.
- Maker-checker state names/transitions are a synthesized canonical model from multiple vendor descriptions (no single authoritative spec); treat as a reference design, not a standard.

## Recommendations

- Model the core entity at LINE-ITEM level (not claim header): each line carries reimbursable flag, tax category (Sec 10(14)/Rule 3 mapping), GST rate, ITC-eligibility (Sec 17(5) check), GSTIN/entity, place of supply, and who-paid (company card vs out-of-pocket). This single decision unlocks partial approval, mixed-bill handling, and ITC accuracy.
- Treat employee-reimbursement and vendor-invoice-reimbursement as two distinct workflows sharing a UI but diverging on tax engine: vendor path computes TDS (194C/194J/195) and RCM/self-invoice obligations; employee path computes Sec 10(14)/perquisite exemption and payout routing.
- Implement a canonical maker-checker FSM. States: DRAFT -> SUBMITTED -> UNDER_REVIEW -> (PARTIALLY_APPROVED | APPROVED | REJECTED | QUERIED/SENT_BACK) -> APPROVED -> PENDING_PAYMENT -> PAID -> SETTLED/CLOSED; plus CANCELLED and RECOVERY/CLAWBACK. Roles: Maker (claimant/booker), Checker/Approver (L1..Ln by amount threshold), Finance/Payout, Auditor (read-only). Transitions are role-gated and amount-threshold-routed (up to ~5 levels). Each approver may approve, reject, or partially approve specific lines (QUERIED sends back to maker without losing history).
- Add SLA timers per approval step with auto-escalation: if an approver does not act within N business hours/days, auto-escalate to the next level or notify; configurable auto-reminder, auto-escalate, and optional auto-approve-below-threshold. Record SLA breaches in the audit log.
- Build delegation / out-of-office: each approver can set a deputy + date window so claims route to the delegate when the primary is on leave, with the delegation itself captured in the audit trail (who delegated to whom, when).
- Make the audit trail append-only and immutable, capturing actor/action/timestamp/before-after on every transition, with a read-only Auditor role and one-click export; retain documents and trail for 72 months (Sec 36) with litigation-hold extension.
- Cash-advance lifecycle: issue advance -> spend -> submit claim -> net claim against advance -> return excess OR top-up; track outstanding advances per employee and block new advances above a configurable exposure limit; keep advances, vendor prepayments, and salary advances on separate ledgers.
- FX policy engine: per-org configurable rate source (RBI/FBIL reference, AD-bank TT, card/gateway rate) and rate date (purchase/submission/approval); always store original currency amount, INR amount, rate, and source for audit and FX gain/loss.
- Support per-diem rate tables (by city/grade, partial-day rules) AND actuals AND hybrid trips; mileage with configurable per-km rates by vehicle type plus mandatory logbook fields (date/route/purpose/distance) to preserve Sec 10(14) exemption.
- Duplicate/fraud guardrail: fingerprint each receipt (image hash + OCR fields: GSTIN, date, amount, merchant) and check org-wide before submission to catch resubmissions and near-duplicates with altered date/amount.
- Multi-entity from day one: mandatory entity + GSTIN + place-of-supply tagging on every expense; cost-center/branch allocation; ISD/cross-charge distribution support for centrally procured services (mandatory ISD since 1 Apr 2025).
- India-field UX: offline-first mobile capture queue that syncs when connectivity returns; Indic-script/regional-language OCR; in-India data processing for DPDP alignment; bulk/period-close batch approval, export, and accounting-system sync (Tally/Zoho Books/ERP).

## Sources

- Taxability of Reimbursement of Expenses to Employees in India: TDS, GST & ITC (2026) - Mysa — https://www.mysa.io/blogs/taxability-reimbursement-expenses-employees-india  (Primary synthesis of TDS sections, Rule 33 pure agent, Sec 17(5) blocked ITC, Sec 16 ITC, audit trail.)
- Employee Reimbursement under GST - IndiaFilings — https://www.indiafilings.com/learn/employee-reimbursement-under-gst/  (GST not applicable when employee buys from registered dealer for employer.)
- RCM under GST - Applicability, E-Invoice, Import of Services - BinarySemantics — https://www.binarysemantics.com/blogs/reverse-charge-mechanism-rcm-under-gst-applicability-e-invoicing-import-of-services/  (Rule 47A 30-day self-invoicing (effective 1 Nov 2024).)
- Period of Retention of Accounts - Section 36 of GST - A R Dhorajiya & Co — https://ardhorajiya.com/period-of-retention-of-accounts-section-36-of-gst/  (72-month retention, litigation extension.)
- Accounts & other records under GST & retention period (Sec 35-36) - TaxGuru — https://taxguru.in/goods-and-service-tax/accounts-other-records-gst-retention-period.html  (List of records to retain; electronic records acceptable.)
- Section 36 - CBIC GST Act explorer — https://taxinformation.cbic.gov.in/content-page/explore-act/1000306/1000001  (Primary CBIC text of Section 36.)
- Employees - Benefits allowable - Income Tax Department — https://www.incometaxindia.gov.in/w/employees-benefits-allowable  (Primary IT Dept page on Sec 10(14) reimbursements and perquisites.)
- Fuel Reimbursement Taxation Rules - Hinote — https://www.hinote.in/taxability-of-fuel-expense-reimbursement-to-employees-part-i-hinote-systems-outsourced-payroll-services-online-payroll-software/  (Rule 3 fuel/running-maintenance Rs 0 perquisite for official-only use.)
- Perquisites in Income Tax - ClearTax — https://cleartax.in/s/perquisites-in-income-tax  (Rule 3(7)(ix) telephone/mobile; Sec 17(2) taxable benefits.)
- India - Individual - Income determination - PwC Tax Summaries — https://taxsummaries.pwc.com/india/individual/income-determination  (Reimbursements excluded from salary regardless of direct vs on-behalf payment.)
- Advance Expense Management India - aiaccountant — https://www.aiaccountant.com/blog/advance-expense-management-india  (Employee advance vs vendor prepayment vs salary advance ledgers; settlement.)
- Petty Cash Accounting - Happay — https://happay.com/blog/petty-cash-accounting/  (Petty cash float Rs 5,000-20,000; reconciliation.)
- Imprest Cash System / Petty Cash Management - EnKash — https://www.enkash.com/resources/blog/what-is-imprest-cash-meaning  (Imprest float top-up/replenishment model.)
- RBI Reference Rate Archive — https://www.rbi.org.in/scripts/referenceratearchive.aspx  (Authoritative daily INR reference FX rates; FBIL since Jul 2018.)
- Foreign Currency Reconciliation India - aiaccountant — https://www.aiaccountant.com/blog/foreign-currency-reconciliation-india  (RBI reference vs AD-bank TT vs gateway rate policy.)
- Accounting for Foreign Currency - Expensify — https://use.expensify.com/blog/accounting-foreign-currency-expense-reports  (Rate-date and rate-source choices in expense reports.)
- International Per Diem Rates - Navan — https://navan.com/blog/international-per-diem-rates  (Per-diem flat-rate vs actuals tradeoffs.)
- Reimbursement for using a private vehicle - Motolog — https://motolog.app/vehicle-reimbursement-in-india  (No statutory per-km rate; ~Rs5/Rs3 examples; logbook for Sec 10(14).)
- India Mileage - Rydoo Compliance — https://www.rydoo.com/compliance/india/india-mileage/  (India mileage compliance overview.)
- GST Multi-state Branch Registration - Tally Solutions — https://tallysolutions.com/gst/multi-gst-registration-in-different-states/  (Per-state GSTIN mandatory; distinct persons.)
- ISD vs Cross Charge (post Finance Act 2024) - Taxmann — https://www.taxmann.com/post/blog/analysis-input-service-distributor-isd-vs-cross-charge  (Mandatory ISD from 1 Apr 2025; cross-charge deemed supply.)
- CBIC Circular 199/11/2023-GST — https://gstcouncil.gov.in/sites/default/files/2024-06/circular-cgst-199.pdf  (Primary circular on cross-charge / HO-branch services.)
- What is e-Invoicing Under GST - ClearTax — https://cleartax.in/s/e-invoicing-gst  (Thresholds, 30-day IRP reporting, penalties.)
- Mandatory GST E-Invoicing Rules & Deadlines - TaxGuru — https://taxguru.in/goods-and-service-tax/mandatory-gst-e-invoicing-rules-deadlines.html  (30-day IRP reporting for Rs 10cr+ from 1 Apr 2025.)
- E-Invoice Limit in India Updated Guide 2026 - GimBooks — https://www.gimbooks.com/blog/e-invoice-limit-in-india/  (Threshold trajectory toward Rs 2 crore.)
- Maker Checker for Expense Approvals - Volopay — https://www.volopay.com/expense-management/maker-checker-workflow-for-expense-approvals/  (Maker-checker states/roles; auto-approval params.)
- Multi Level Approval Workflow for Reimbursement - Volopay — https://www.volopay.com/blog/multi-level-approval-for-reimbursement/  (Up to 5-level threshold routing.)
- Expense Multi-Level Approval Hierarchy - Argano — https://argano.com/insights/articles/microsoft-expense-multilevel-approval-hierarchy-workflow.html  (Hierarchy and delegation patterns.)
- Expense Approval Workflow Design - Billdock — https://billdock.io/blog/expense-approval-workflow-design  (Exception handling, out-of-policy flags, partial review.)
- Expense Fraud: Detect and Prevent - Coupa — https://www.coupa.com/blog/expense-fraud/  (OCR-based org-wide duplicate/near-duplicate detection.)
- Fake Receipt Checker - Taggun — https://www.taggun.io/fake-receipt-checker  (Receipt-fraud / duplicate detection.)
- India Receipt OCR for Expense Claim - Asprise — https://asprise.com/receipt-ocr/blog-IN-india-receipt-ocr-for-expense-claim  (India receipt OCR / GSTIN extraction.)
- OCR Receipt Scanner Apps and APIs 2026 - HyperVerge — https://hyperverge.co/blog/receipt-scanner-app/  (Indic-script OCR, GSTIN/line-item extraction, India data-residency note.)
- India Income-tax Rules 2026 Payroll Audit - India Briefing — https://www.india-briefing.com/news/india-income-tax-rules-2026-employer-payroll-compliance-43610.html/  (Allowance exemptions more tightly linked to actual expenditure under Income-tax Act 2025.)

