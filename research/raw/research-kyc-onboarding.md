# Employee & vendor onboarding/verification in India for an expense-reimbursement SaaS — capturing and verifying identity (PAN/GSTIN/Aadhaar/Udyam) and bank details for whitelisting payout accounts

## Executive Summary

An indie B2B reimbursement SaaS in India needs three verification primitives to safely whitelist payout accounts: PAN verification (identity/tax), bank account verification (penny-drop or penny-less/reverse-penny-drop), and — for vendors — GSTIN + MSME Udyam checks. The market is well served by API aggregators. Most publish "contact sales" pricing, but two transparent anchors exist: Setu and Cashfree both list bank account verification at ~Rs 3 per successful verification (GST extra), and the government Protean Online PAN Verification facility costs ~Rs 12,000/yr registration plus ~Rs 0.30 down to ~Rs 0.25 per PAN at high volume, with 750 free PANs/day. The Income Tax e-filing bulk PAN service is free for the first 750 then Rs 0.05–0.30/entry but is restricted to government/recognized agencies, so a SaaS will in practice route through an aggregator (Cashfree, Setu, Sandbox, Surepass, Deepvue, Bulkpe, Zoop, Signzy, HyperVerge, IDfy, Karza/Perfios). On bank verification, NPCI/UPI reverse-penny-drop (RPD) is now preferred over classic penny-drop because the user pays Re 1 (auto-refunded, typically within ~48h), no account number/IFSC is keyed, and success rates run ~95–97%; classic penny-drop still fails on some cooperative banks. A key regulatory tailwind: from 1 April 2025 RBI mandates a free beneficiary name look-up for NEFT/RTGS, reducing the value of paid penny-drop for some flows. On Aadhaar: private entities CANNOT freely do Aadhaar authentication/e-KYC; the 31 Jan 2025 MeitY amendment only permits it via a UIDAI-approved ministry-sponsored process, so a SaaS should rely on Aadhaar offline XML / DigiLocker (consented OVD) rather than live Aadhaar auth, and use PAN as the primary identity key. DPDP Act 2023 (Rules phased to ~May 2027) makes the SaaS a data fiduciary over this PII: consent, purpose limitation, an India-based DPO if classified an SDF, and penalties up to Rs 250 crore. Recommended employee-master design: HRMS sync where available, else self-registration plus admin/HR maker-checker on the master itself, with bank-account changes re-triggering verification before any payout.

## Findings



## Data Points

- Setu — bank account verification (penny-drop): **Rs 3 per successful verification (up to 1,000/month; bulk pricing above)** (2026)  — https://setu.co/data/kyc/bank-account-verification/
- Cashfree — bank account verification: **Rs 3 per verification + GST (Rs 100 free trial credit)** (2026)  — https://www.cashfree.com/bank-account-verification/
- Cashfree — bank verification coverage / success rate: **600+ banks incl 126+ co-operative banks; >97% success** (2026)  — https://www.cashfree.com/bank-account-verification/
- Cashfree — PAN verification free trial: **Rs 100 free credits, then custom/enterprise pricing** (2026)  — https://www.cashfree.com/PAN-verification/
- Protean (NSDL) Online PAN Verification — registration: **Rs 12,000 per year + GST (annual renewal)** (2026)  — https://www.protean-tinpan.com/services/online-pan-verification/pan-verification-charges.html
- Protean — free PAN verifications: **750 PANs/day free; rises to 1,000/day at higher annual slabs** (2026)  — https://tinpan.proteantech.in/faqs/online-pan-verification/faq-pan-verify-general.html
- Protean — per-PAN charge at volume: **~Rs 0.30/PAN (up to 7.5 lakh/yr); ~Rs 0.25/PAN (7.5–15 lakh/yr)** (2026)  — https://tinpan.proteantech.in/faqs/online-pan-verification/faq-pan-verify-general.html
- Income Tax e-filing — Bulk PAN/TAN verification: **First 750 free, then Rs 0.05–0.30 per entry (govt/recognized agencies only)** (2026)  — https://www.incometax.gov.in/iec/foportal/help/how-to-verify-bulk-pan-tan
- Reverse penny-drop — Re 1 refund window (Setu): **Re 1 refunded to user within 48 hours** (2026)  — https://docs.setu.co/data/bav/reverse-penny-drop/quickstart
- Reverse penny-drop success rate (HyperVerge): **~97% success; >95% fully automated** (2026)  — https://hyperverge.co/blog/reverse-penny-drop-101/
- RBI free beneficiary name look-up (NEFT/RTGS) go-live: **Mandatory from 1 April 2025; no charge to customers** (2025-04-01)  — https://www.businesstoday.in/technology/news/story/you-will-soon-be-able-to-verify-beneficiary-details-during-rtgs-neft-payments-for-free-459083-2024-12-31
- DPDP Act — maximum penalty: **Up to Rs 250 crore per breach** (2023)  — https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf
- DPDP Rules — broad compliance deadline: **Phased rollout, full compliance ~13 May 2027** (2025)  — https://www.ey.com/en_in/insights/cybersecurity/decoding-the-digital-personal-data-protection-act-2023
- Aadhaar private-entity authentication amendment: **Notified 31 Jan 2025; allowed only via UIDAI-approved ministry-sponsored process** (2025-01-31)  — https://www.lexology.com/library/detail.aspx?g=d22ac806-db2b-48d8-85a7-582c39237fac
- Perfios OneClick KYB data coverage: **30M+ businesses across 750+ sources (GSTIN/CIN/PAN/TAN/IEC/Udyam in one API)** (2026)  — https://perfios.ai/in/products/oneclick-onboarding/

## Entities

- **Protean eGov (NSDL) Online PAN Verification**  [Government PAN verification facility]  (https://www.proteantech.in/services/pan-opv/)
  Authoritative PAN OPV; Rs 12,000/yr + GST, 750 free PANs/day, paisa-level per-PAN at volume. Authorized-entity registration required.
- **Income Tax e-filing — Verify Bulk PAN/TAN**  [Government PAN verification]  (https://www.incometax.gov.in/iec/foportal/help/how-to-verify-bulk-pan-tan)
  Restricted to govt/recognized agencies; first 750 free then Rs 0.05–0.30/entry; File/Screen/API modes.
- **Cashfree Secure ID**  [Verification API aggregator]  (https://www.cashfree.com/kyc-verification/)
  PAN, bank (penny-drop/RPD), Aadhaar, GSTIN. Rs 3/bank verification + GST; Rs 100 free credits; 600+ banks; developer-friendly.
- **Setu (a Pine Labs company)**  [Verification API aggregator]  (https://setu.co/data/kyc/)
  PAN, GSTIN, bank (penny-drop + industry-first UPI reverse-penny-drop), DigiLocker. Bank verification Rs 3/successful; sales-gated onboarding (onboarding@setu.co).
- **Sandbox (sandbox.co.in)**  [Verification + GST/tax API aggregator]  (https://sandbox.co.in/kyc)
  PAN, GSTIN, penny-less bank verification, DigiLocker, MCA. Cost-calculator + sales-gated pricing; strong GST/e-invoice stack.
- **Surepass**  [Verification API aggregator]  (https://surepass.io/)
  PAN (incl PAN 2.0), penny-drop, reverse-penny-drop, penny-less bank verification. Pricing sales-gated.
- **Deepvue**  [Verification API aggregator]  (https://deepvue.ai/)
  PAN, RPD, Udyam, marketplace/gig onboarding focus. Pricing by volume/sales; clear developer docs.
- **Bulkpe**  [Verification + payouts API]  (https://bulkpe.in/verification)
  PAN, Aadhaar, bank (penny-drop, penny-less, RPD); per-txn price shown in dashboard; pairs verification with payouts (useful for reimbursement disbursal).
- **Zoop.one**  [Verification API aggregator]  (https://www.zoop.one/)
  PAN, bank verification, business KYC; free trial with preloaded balance; sales for full pricing.
- **Signzy**  [Enterprise KYC/KYB platform]  (https://www.signzy.com/fintech-apis/bank-account-verification-api/)
  No-code onboarding for banks; ranked top enterprise KYC provider; bank/PAN/name-match APIs.
- **HyperVerge**  [Enterprise KYC/KYB platform]  (https://hyperverge.co/in/integrations-marketplace/bank-account-verification-api/)
  Penny-drop + RPD (~97% success), wide doc coverage, India-regulation aware.
- **IDfy**  [Enterprise KYC + background verification]  (https://www.idfy.com/)
  Full KYC + employee background verification + video KYC; relevant for combined employee onboarding + verification.
- **Karza / Perfios**  [Enterprise KYB + financial intelligence]  (https://perfios.ai/in/products/oneclick-onboarding/)
  OneClick KYB bundles GSTIN/CIN/PAN/TAN/IEC/Udyam; 30M+ businesses, 750+ sources; lending/vendor focus. Perfios acquired Karza 2022.
- **UIDAI Aadhaar Offline e-KYC / DigiLocker**  [Identity (Aadhaar) — consent-based]  (https://www.uidai.gov.in/en/ecosystem/authentication-devices-documents/about-aadhaar-paperless-offline-e-kyc.html)
  Compliant path for private SaaS: consented offline XML / DigiLocker OVD rather than live Aadhaar auth. Aadhaar number must sit in an Aadhaar Data Vault if stored.
- **NPCI beneficiary name look-up (NEFT/RTGS)**  [Regulatory bank-name lookup]  (https://resources.probe42.in/regulatory-updates/rbi-circulars/rbi-circular-beneficiary-name-look-up-for-rtgs-and-neft-transactions/)
  RBI-mandated free name lookup from 1 Apr 2025; NPCI facilitates, stores nothing. Reduces reliance on paid penny-drop for NEFT/RTGS payouts.
- **DPDP Act 2023 / DPDP Rules 2025**  [Data protection regulation]  (https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)
  Governs PII handling; data-fiduciary duties, consent, SDF/DPO/DPIA; penalties up to Rs 250 crore.

## Risks / Caveats

- Most aggregator per-call prices (PAN, GSTIN, RPD) are sales-gated; the only firm public anchors are Setu/Cashfree bank verification at ~Rs 3 and the government Protean/ITD PAN slabs. All non-anchored cost figures should be confirmed by direct quote before modeling unit economics.
- The exact Protean per-PAN slab table (Rs 0.30 / Rs 0.25 etc.) was inferred from FAQ summaries because the live charges page did not render its table during fetch; verify against the current Protean charges PDF before quoting.
- Aadhaar authentication by private entities is materially restricted; assuming you can run live Aadhaar e-KYC is a compliance trap. The 2025 amendment route is ministry-sponsored and slow — design for DigiLocker/offline XML instead.
- Penny-drop and penny-less coverage is imperfect for some co-operative/regional banks (Cashfree itself notes verification 'may not be possible' for some co-op accounts); plan a manual-review fallback so onboarding does not hard-fail.
- DPDP Rules are still phasing in (broad compliance ~May 2027) and SDF thresholds/DPO obligations are not yet fully crystallized; build for the stricter interpretation to avoid rework and the Rs 250 crore penalty exposure.
- Vendor GSTIN status can change (suspended/cancelled) and bank accounts change over time; one-time verification is insufficient — schedule periodic re-verification and re-trigger on any account-detail edit.

## Recommendations

- Make PAN the primary identity key for both employees and vendors (universally available, cheap, paisa-level via Protean / sub-rupee via aggregators); avoid live Aadhaar authentication entirely and use DigiLocker/offline XML only if a document of address is genuinely needed.
- For payout-account whitelisting, default to UPI reverse-penny-drop (user pays Re 1, auto-refunded) for self-registration UX, and offer classic penny-drop as fallback for users without UPI; treat the returned name-match score as a maker-checker gate, routing partial matches to HR/admin review rather than auto-approving.
- Start on a transparent, self-serve aggregator (Cashfree or Setu at ~Rs 3/bank verification, plus their PAN/GSTIN endpoints) to avoid enterprise sales cycles; budget roughly Rs 3–8 per fully verified account (PAN + bank + name-match) at low volume and renegotiate at scale.
- For vendor onboarding, use a single KYB call (Perfios OneClick, Karza, or aggregator equivalents) that returns PAN + GSTIN + Udyam + bank in one flow; gate MSME benefits/payment-terms logic on a positive Udyam result.
- Design the employee master with two ingestion paths — HRMS/payroll sync (read-only authoritative feed) and self-registration — and enforce maker-checker on the master record itself so any new or changed bank account is re-verified and re-approved before it can receive a payout.
- Bake DPDP compliance in from day one: explicit purpose-bound consent at capture, an Aadhaar Data Vault if any Aadhaar number is stored, data-retention/erasure controls, and an India-based DPO plan in case the platform is later classed a Significant Data Fiduciary.
- Exploit the free RBI NEFT/RTGS beneficiary name look-up (live since 1 Apr 2025) at the actual disbursement step as a second, zero-cost name check layered on top of the one-time penny-drop done at onboarding.

## Sources

- Setu — Bank Account Verification API (pricing Rs 3/verification) — https://setu.co/data/kyc/bank-account-verification/  (Transparent price anchor; penny-drop returns account/IFSC/name)
- Setu — Reverse Penny Drop quickstart (Re 1, 48h refund) — https://docs.setu.co/data/bav/reverse-penny-drop/quickstart  (UPI RPD flow and refund timing)
- Setu — KYC API suite (PAN/GSTIN/bank/DigiLocker) — https://setu.co/data/kyc/  (Sales-gated onboarding)
- Cashfree — Bank Account Verification (Rs 3 + GST, 600+ banks, 97%) — https://www.cashfree.com/bank-account-verification/  (Price + coverage anchor)
- Cashfree — PAN Verification (Rs 100 credits, returns name/holder type) — https://www.cashfree.com/PAN-verification/  (PAN API fields and trial credits)
- Cashfree — Secure ID KYC suite — https://www.cashfree.com/kyc-verification/  (PAN/Aadhaar/GSTIN/bank bundle)
- Protean (NSDL) — Online PAN Verification charges — https://www.protean-tinpan.com/services/online-pan-verification/pan-verification-charges.html  (Rs 12,000/yr registration; official OPV)
- Protean — Online PAN Verification FAQ (free limits, slabs) — https://tinpan.proteantech.in/faqs/online-pan-verification/faq-pan-verify-general.html  (750/day free; per-PAN slabs)
- Income Tax Dept — Verify Bulk PAN/TAN — https://www.incometax.gov.in/iec/foportal/help/how-to-verify-bulk-pan-tan  (Agency-only; first 750 free then Rs 0.05–0.30/entry)
- Income Tax Dept — PAN Verification user manual (PDF) — https://www.incometax.gov.in/iec/foportal/sites/default/files/2022-08/PAN%20Verification_v1.0.pdf  (File/Screen/API modes; Yes/No field match)
- BusinessToday — RBI free beneficiary name look-up for NEFT/RTGS — https://www.businesstoday.in/technology/news/story/you-will-soon-be-able-to-verify-beneficiary-details-during-rtgs-neft-payments-for-free-459083-2024-12-31  (Free, mandatory 1 Apr 2025)
- Probe42 — RBI circular on beneficiary name look-up — https://resources.probe42.in/regulatory-updates/rbi-circulars/rbi-circular-beneficiary-name-look-up-for-rtgs-and-neft-transactions/  (CBS-based lookup; NPCI does not store data)
- HyperVerge — Reverse Penny Drop 101 (97% success) — https://hyperverge.co/blog/reverse-penny-drop-101/  (RPD mechanics and success rates)
- HyperVerge — What is Penny Drop (RBI KYC acceptance) — https://hyperverge.co/blog/what-is-penny-drop/  (Penny-drop accepted under RBI Master Direction)
- Surepass — Penny-less bank account verification — https://surepass.io/penny-less-bank-account-verification/  (Validation-only, no money moved)
- Sandbox — Penny-less bank verification API docs — https://developer.sandbox.co.in/reference/bank-account-verification-penny-less-api  (Penny-less endpoint)
- Sandbox — pricing (cost calculator) — https://sandbox.co.in/pricing  (Sales/calculator-gated pricing)
- Lexology — Aadhaar Authentication for Private Entities: 2025 Amendment — https://www.lexology.com/library/detail.aspx?g=d22ac806-db2b-48d8-85a7-582c39237fac  (31 Jan 2025 amendment, approval process)
- SSRana — Aadhaar authentication by private entities & privacy — https://ssrana.in/articles/aadhaar-authentication-by-private-entities-from-data-privacy-perspective/  (Restrictions on private Aadhaar auth)
- UIDAI — Aadhaar Paperless Offline e-KYC — https://www.uidai.gov.in/en/ecosystem/authentication-devices-documents/about-aadhaar-paperless-offline-e-kyc.html  (Offline XML KYC path)
- HyperVerge — DigiLocker for KYC (RBI 2025 acceptance) — https://hyperverge.co/blog/power-of-video-kyc-through-c-kyc-and-digilocker/  (DigiLocker OVD acceptance)
- EY — Decoding the DPDP Act 2023 / Rules 2025 — https://www.ey.com/en_in/insights/cybersecurity/decoding-the-digital-personal-data-protection-act-2023  (Compliance timeline ~May 2027, SDF/DPO)
- MeitY — Digital Personal Data Protection Act, 2023 (PDF) — https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf  (Primary law text; Rs 250 crore penalty)
- Perfios — OneClick Onboarding (KYB: GSTIN/PAN/TAN/Udyam) — https://perfios.ai/in/products/oneclick-onboarding/  (Single KYB API; 30M+ businesses)
- SignalX — MSME (Udyam) Verification API — https://signalx.ai/msme-verification-api/  (Udyam by URN/PAN/GSTIN for vendor onboarding)
- AuthBridge — Udyam Aadhaar / MSME Verification — https://authbridge.com/checks/udyam-aadhaar-verification/  (Udyam verification endpoint)
- Signzy — Top 10 KYC providers in India — https://www.signzy.com/blogs/top-10-kyc-verification-solution-providers-in-india  (Market positioning of enterprise providers)
- HyperVerge — types of bank account verification (name match) — https://hyperverge.co/blog/types-of-bank-account-verification/  (Fuzzy name-match score behavior)
- Volopay — Expense management (maker-checker, UPI/bank payout) — https://www.volopay.com/in/expense-management/  (Maker-checker and payout patterns)
- Happay — Top expense management software India — https://happay.com/blog/top-10-best-expense-management-software-india/  (HRMS sync + self-registration + payroll/UPI payout)

