# THESIS — the spine every page must stay consistent with

This is the synthesized point of view for the Kharcha dossier, distilled from 14 domain studies + 7 adversarial fact-checks. Every authored page must agree with the verdict, the canonical figures, and the regulatory invariants below. Where a number is soft, say so with the stated confidence and provenance (analyst vs vendor-marketing vs our own derivation).

## The one-line verdict

**Conditional BUILD.** Worth building, but only as a focused, software-only, **Tally-native, WhatsApp-first reimbursement product for sub-200-employee Indian SMBs and field-heavy verticals**, with money movement partnered out (RazorpayX / Cashfree / bank file hand-off) and monetised on software seats, not card float. NOT worth building as a horizontal Zaggle / Happay / Volopay clone, and NOT as a card-issuing or float business.

Why the condition matters: incumbents win on distribution, bank partnerships and **card interchange + float** (roughly 75-80% of Zaggle's revenue is card interchange), not on superior software. An indie team cannot touch that pool without RBI licensing (non-bank PPI net worth ₹5 cr rising to ₹15 cr) or a bank partner. So compete where software still decides: India-native compliance depth, Tally integration, field/mobile UX, and reimbursement speed.

## The wedge (the defensible core)

India-native compliance and integration is the moat; OCR and cards are table-stakes.
1. **Tally-native two-way sync** is the single biggest deal-maker/breaker (~70-80% Indian SMB accounting, vendor-claimed). It is painful (desktop, on-prem, XML-over-HTTP port 9000) precisely because that deters competitors.
2. **GST ITC capture** (GSTIN validation, eligible-vs-blocked ITC under Sec 17(5), GSTR-2B reconciliation) turns soft ROI into a hard rupee number for the CFO.
3. **WhatsApp-first + offline mobile capture** for field staff that incumbents under-serve.
4. **Cash-advance / float issuance and settlement** (the unverifiable "black box" between advance and claim) for construction, logistics, field sales.
5. **Vendor-reimbursement adjacency** (TDS 194C/194J, RCM, MSME 45-day / Sec 43B(h) clock) as an underserved differentiator and a path toward the larger AP-automation market.

## Does it survive as an isolated product?

Partially, and not for long on its own. Pure receipt-capture-and-approve is thin and Zoho already anchors near-zero price. Survival requires (a) integration depth (Tally first, then Zoho Books / payroll), and (b) a credible expansion path toward AP automation / vendor payments (larger, GST-mandate-driven). Design for clean accounting/ERP integration to stay acquisition-ready: Happay (CRED to MakeMyTrip) and Fyle (to Sage) show the category's exit path is via travel and accounting suites.

## "Getting the over-ask right" — the MVP cut line

IN (MVP, ~3-6 months for a small team): WhatsApp + mobile + email capture; LLM-vision OCR with GST field extraction; configurable rule engine (6 actions: allow / flag / warn / cap / block / route) with line-item-then-claim rollup; maker-checker FSM with rupee-tiered Delegation-of-Authority and SLA escalation; employee self-registration + admin maker-checker on the master; PAN + bank penny-drop (reverse-penny-drop) whitelisting; line-item partial approval; GST ITC tagging; Tally + Zoho Books sync; payout via bank file hand-off (and optional RazorpayX); immutable audit trail; per-active-submitter pricing with a small free tier.

OUT (defer): own corporate cards / PPI / float; SOC 2; live Aadhaar auth; deep ERP (SAP/NetSuite/Dynamics); travel booking; multi-entity ISD/cross-charge complexity; bespoke fraud ML; native-app polish. Build these only when a paying deal funds them.

## ICP & positioning

- **Lead ICP:** Finance-led, 50-500 employees, Tally/ERP-first, field-or-travel-heavy. Economic buyer = CFO / Finance Controller / owner-founder; champion = the Finance/AP person or HR-Ops lead drowning in manual reconciliation; blocker = IT/Security (DPDP, SSO) or Finance demanding proven Tally/payroll integration.
- **HR vs Finance ownership** is genuinely shared in India. Resolve per deal with a 2-question qualifier: (1) Who owns the expense policy today? (2) Where does payout happen, payroll or AP? HRMS-first stack -> HR-Ops champion, native payroll disbursal is the wedge. Tally/ERP-first -> Finance/AP champion, Tally + GST ITC is the wedge.
- **Maker-checker (4-eyes)** with a rupee-tiered DoA matrix is the single most India-specific buying requirement and a credibility signal to Finance and Auditors. Treat it as a first-class feature, not a setting.

## Pricing & GTM stance

- Zoho-anchored ladder. Do not undercut Zoho on raw price; win on India reimbursement workflow (UPI/vendor payouts, GST-ready reports, faster approvals).
- Free tier (3-5 users, capped OCR autoscans, no payouts) -> paid **per active submitter ~₹79-149/user/mo on annual** (₹99-199 monthly), approvers/admins free, 5-user minimum, quoted ex-GST.
- Freemium is viable but only with a tight free tier and a clear paid trigger (payouts, multi-stage approvals, accounting sync, GST/policy reports); target a realistic 2-5% free-to-paid.
- GTM: content/SEO + Zoho Marketplace/Tally-partner listings + CA-accountant & Tally-reseller referral channel + founder-led WhatsApp/email sales + SaaSBoomi. Avoid an outbound SDR motion early (CAC ~₹2-4 L is unaffordable at India SMB ACVs).

## Regulatory invariants (never contradict these)

- **RBI / money movement:** stay a technology provider. Funds must NEVER touch an account the SaaS owns or controls. Compliant models: (a) file hand-off to the customer's own corporate bank, (b) regulated partner (RazorpayX/Cashfree) initiates from its escrow/current account, (c) connected banking on the customer's current account. Then no Payment Aggregator (PA) or PPI licence is required. Holding/pooling funds triggers PA (net worth ₹15 cr at application, ₹25 cr by year 3, mandatory escrow) or PPI (₹5 cr to ₹15 cr). Get a written legal opinion before go-live. "Funds never touch our account" is a product invariant.
- **GST Sec 17(5) blocked ITC:** clause (a) blocks ITC on motor vehicles for transport of persons with approved seating capacity not more than 13 (incl. driver), exceptions for resale / passenger transport / driving training; clause (b) blocks food & beverages, outdoor catering, beauty/health services, leasing/renting/hiring of motor vehicles (rent-a-cab), life & health insurance, club/fitness membership, and travel benefits to employees on vacation (LTC/LTA). KEY NUANCE: "travel benefits" means vacation/leave/home-travel concession, NOT ordinary business travel; business-travel ITC (air/rail for work) is generally available. Exceptions: obligatory-under-law (extended to all of clause (b) from 1 Feb 2019), and same-category outward taxable supply.
- **Income Tax:** Sec 37(1) "wholly & exclusively for business"; disallow personal/capital/illegal/penalty/CSR/freebies-to-professionals. Per-diem (Sec 10(14)/Rule 2BB) exempt only to the extent actually spent; unspent balance is taxable salary. LTA (Sec 10(5)) domestic fare only, 2 journeys / 4-year block, old regime. Fuel/car per Rule 3 fixed perquisite values. Gifts/vouchers exempt up to ₹5,000/year.
- **TDS on vendor reimbursements:** 194C (1%/2% contractors), 194J (10% professional / 2% technical), 194H (2% commission, w.e.f. 1 Oct 2024); plus possible GST RCM (rent-a-cab, GTA, legal, unregistered supplier). Version-date all rates by financial year.
- **Record retention:** default to the longest applicable, 8 financial years (Companies Act Sec 128); GST 72 months (Sec 36); Income Tax 6 years from AY end. Immutable audit trail + litigation hold.
- **DPDP Act 2023:** the SaaS is typically a Data Processor (and Data Fiduciary for its own staff data). Penalty ceiling ₹250 cr for failure of reasonable security safeguards (Sec 8(5)); ₹200 cr breach-notification; obligations on consent, purpose limitation, retention/erasure, 72-hour-plus-without-delay breach notification. DPDP Rules notified 14 Nov 2025, full data-fiduciary obligations phased to ~May 2027. DPDP does NOT itself govern Aadhaar (Aadhaar Act/UIDAI) and has no GDPR-style sensitive-data tier. Private entities cannot freely do live Aadhaar auth; use DigiLocker/offline XML, PAN as primary identity key. Buyers expect ISO 27001 (get first, ~₹5 L) and later SOC 2 Type II + VAPT.

## Canonical figures (use these exact numbers + caveats everywhere)

Market size (label provenance explicitly):
- Global expense-management software: ~USD 8.33-8.48B (2025-26), ~8-10% CAGR (Mordor; Fortune Business Insights). APAC fastest-growing ~17.1% CAGR. [analyst, medium]
- India expense/T&E software: defensible ~USD 120-350M today (point ~USD 150-250M), ~14-18% CAGR. "Fast-growing" yes; "large" overstated. MRFR's ~USD 593M-by-2025 is an outlier ceiling, not consensus. [our synthesis + adversarial check, medium]
- Bottoms-up India TAM: ~50k-150k addressable companies x ~USD 1.3-2.5k ACV ≈ USD 150-300M. SAM ~USD 80-150M. Indie SOM (3 yr) ~USD 0.5-2M ARR. [our derivation, low-medium]
- India T&E (business travel) spend 2024: ~USD 38.3B, world's 8th largest, ~15% growth 2025 (GBTA/Visa). [analyst, medium]

Demand denominators (primary govt sources, but most are NOT the paying market):
- Active GST taxpayers ~1.53 crore (Jun 2025). Udyam MSMEs ~7.83 crore (but ~97% micro/non-paying). MCA companies ~2.8M registered / ~1.8M active. EPFO formal salaried ~6.9 crore. [govt, high; but caveat that these overstate the addressable base]

Pricing benchmarks:
- Zoho Expense (India): Free <=3 users; Standard ₹99/user/mo (₹79 annual); Premium ₹199 (₹149 annual); min 5 users, +GST. [vendor page, high]
- Fyle/Sage ~USD 11.99-14.99/user/mo; SAP Concur ~USD 9/user/mo + per-report (quote); SutiExpense ~USD 6.50; Happay ~₹199/user/mo (third-party listing, soft). [mixed]

Unit-cost stack (for an indie):
- OCR via LLM-vision ~USD 0.0005-0.003/doc (Gemini 2.5 Flash-Lite/Flash, Claude Haiku 4.5) vs dedicated parsers ~USD 8-10 per 1,000 docs (Textract AnalyzeExpense, Google Doc AI, Azure). [vendor pricing, medium]
- Bank penny-drop ~₹3/successful (Setu published); PAN ~₹1-3; GSTIN ~₹1-3; all +18% GST, plus possible ₹5-15k setup. Protean PAN OPV ~₹12,000+GST/yr (eligible entities only). [Setu page high; others indicative]
- Payouts ~₹1.75-5/transaction; RazorpayX 250 free/month. [indicative]

Competitor status (correct these stale facts everywhere):
- Happay: CRED acquired 2021 (~USD 180M); CRED SOLD Happay's expense business to MakeMyTrip (announced 18 Nov 2024, closed early 2025); payments arm stayed with CRED. [high]
- Fyle: acquired by Sage Jul 2025, rebranded "Sage Expense Management"; ~USD 15.4M raised pre-acquisition. [high]
- Zaggle: publicly listed (IPO Sep 2023, listed ₹164; NSE: ZAGGLE); FY25 revenue ~₹1,303 cr (+68% YoY), PAT ~₹87.5 cr. [high]
- Sodexo benefits in India is now Pluxee (Sodexo BRS spun off, Euronext Paris PLX, 1 Feb 2024). Do not list Sodexo and Pluxee as two players. [high]
- Volopay ~USD 33.5M raised; EnKash ~USD 23M (holds PA + BBPOU + PPI licences); Kodo ~USD 9.5M (YC + Brex-backed). Volopay "$77.3M ARR" is self-reported and implausible: do not cite as fact. [high]

OCR/fraud:
- Field accuracy on clean printed invoices 94-99% (vendor-stated, optimistic); falls to low-to-mid 80s on faded thermal, crumpled, Devanagari. AI-generated receipt fraud rose from ~0% to ~14% of fraudulent docs in ~12 months (AppZen, Sept 2025). Layer deterministic checks (GSTIN Luhn-mod-36, e-invoice QR/IRN, arithmetic, perceptual-hash duplicate, EXIF) before any auto-approval.

Tally:
- ~70-80% Indian SMB accounting (vendor-claimed, NOT independently audited; present as such). XML-over-HTTP port 9000 is the primary interface; ODBC is read-only and deprecated from TallyPrime 4.0; TallyConnector is a community .NET wrapper that REDUCES pain. The real difficulty is operational (on-prem, always-on, static IP, firewall/port).

## Honest caveats to carry through

Many "pain" statistics (40-60 hrs/month, 60% ITC leakage, 30-45 day cycles, 18% ITC recovery) come from vendor/marketing blogs with an incentive to dramatize; mark them medium/low confidence and label as vendor-sourced. No tier-1 analyst publishes an India-only expense-software market number. Reddit/Quora/G2 primary threads were largely un-fetchable, so employee-voice evidence is under-sampled; recommend primary interviews. CBIC/Income-Tax primary pages were intermittently un-fetchable; statute wording was corroborated via ClearTax/Taxmann/IndianKanoon and should be re-checked against the live statute before hard-coding.
