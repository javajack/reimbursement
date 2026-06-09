# Pricing & Go-to-Market benchmarks for employee/vendor expense-reimbursement and B2B SaaS in India, plus freemium viability for an indie team

## Executive Summary

The Indian expense-management market has a wide price spread. Zoho Expense anchors the low end with a genuinely free tier (up to 3 users) and paid plans at INR 99/user/mo (Standard) and INR 199/user/mo (Premium) monthly, dropping ~25% to INR 79 and INR 149 on annual billing, with a 5-user minimum. Happay sits at ~INR 199/user/mo with no free trial and quote-based enterprise deals. Global/funded players are far pricier: Fyle (now Sage Expense Management) at USD 11.99-14.99/active-user/mo (~INR 1,000-1,300), SAP Concur at ~USD 9/user/mo plus ~USD 8-9 per expense report (quote-only), SutiExpense ~USD 6.50/active-submitter/mo, and ExpenseOnDemand from ~GBP 4.34/user/mo with pay-per-feature activation. Volopay does not publish prices (sales-led, card-led). The dominant India billing innovation is charging only for "active users/submitters" who actually file an expense, which materially lowers effective ACV. Indian SMB B2B SaaS economics are constrained: blended CAC INR 1.2L-2.5L, ACV INR 4L-8L, LTV:CAC 2.5-3x, and 14-20 month payback at the INR 10-30 Cr ARR band; PLG self-serve CAC can be as low as INR 500-1,500 vs INR 2,000-5,000 for sales-led at micro-deal sizes. Content/SEO (INR 40K-80K CAC) and partnerships/channels (INR 50K-1.5L) are the cheapest channels and best fit for an indie team; CA/accountant and Tally's 28,000+ partner ecosystem are credible India distribution channels. Variable costs are low enough to support freemium: OCR receipt extraction runs ~USD 0.0015/page (basic) to USD 8-10 per 1,000 pages (AWS Textract AnalyzeExpense), and payouts via RazorpayX are free for the first 250/month then ~INR 1.5-5 each. Freemium is viable but only with a tight free tier (small user cap) and a clear paid trigger, because India B2B free-to-paid conversion typically runs 1-5% on broad tools; Zoho is the proven India freemium-at-scale exemplar. Recommended model for an indie team: a Zoho-style free tier (3-5 users, capped OCR scans), per-active-submitter paid pricing around INR 79-149/user/mo annual, GST 18% added, sold via content/SEO + CA/Tally-partner channel + founder-led WhatsApp sales rather than an expensive outbound salesforce.

## Findings

- **Zoho Expense sets the India price floor with a real free tier and sub-INR 200 paid plans, making it the freemium benchmark any indie entrant must out-position rather than undercut on price alone.** _(high)_
  Free: 3 users, 5 GB, 20 autoscans. Standard INR 99/mo (INR 79 annual). Premium INR 199/mo (INR 149 annual). ~25% annual discount; 5-user minimum; GST extra; 14-day trial.
  - src: https://www.zoho.com/in/expense/pricing/
- **Funded/global players price 5-10x above Zoho, leaving a structural gap for a low-cost India-native reimbursement tool.** _(high)_
  Fyle USD 11.99-14.99/active user/mo (~INR 1,000-1,300); SAP Concur ~USD 9/user/mo + ~USD 8-9/report; vs Zoho INR 79-199. SutiExpense ~USD 6.50; ExpenseOnDemand ~GBP 4.34.
  - src: https://www.fylehq.com/pricing  |  https://www.getapp.com/finance-accounting-software/a/concur-expense/pricing/  |  https://www.capterra.com/p/118974/SutiExpense/pricing/
- **The dominant pricing model in expense SaaS is 'pay only for active submitters,' which lowers effective ACV and is the de facto standard an indie tool should adopt.** _(high)_
  Fyle bills only users who create an expense or transact on a connected card; SutiExpense bills only active submitters (approvers/admins free); ExpenseOnDemand charges only active users.
  - src: https://www.fylehq.com/pricing  |  https://www.capterra.com/p/118974/SutiExpense/pricing/  |  https://www.expenseondemand.com/uk-pricing
- **Happay does not offer a free trial and is quote-led, signaling the mid-market is sales-led while the SMB/self-serve lane is comparatively open below it.** _(high)_
  Techjockey lists Happay from ~INR 199/user/mo, explicitly states no free trial, pricing on request with 24-hour quote turnaround.
  - src: https://www.techjockey.com/detail/happay-expense-management
- **Indian SMB B2B SaaS unit economics are tight: low ACVs and multi-month sales cycles make expensive outbound sales hard to justify for an indie team.** _(high)_
  INR 10-30 Cr ARR band: CAC INR 1.2L-2.5L, ACV INR 4L-8L, LTV:CAC 2.5-3x, payback 14-20 months; mid-market sales cycle 3-9 months.
  - src: https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- **Content/SEO and partnerships are the lowest-CAC channels in India and are the right primary GTM for a capital-light indie team.** _(high)_
  Channel CAC: Content/SEO INR 40K-80K; Partnerships/Channels INR 50K-1.5L; vs Outbound/SDR INR 2L-4L and ABM INR 5L-12L.
  - src: https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- **PLG/self-serve dramatically lowers acquisition cost at micro-deal sizes and is now the default GTM for sub-$10M ARR India SaaS.** _(medium)_
  40%+ of sub-$10M ARR firms use PLG as primary channel; PLG median CAC INR 500-1,500 vs INR 2,000-5,000 sales-led; PLG+SEO yields 40-60% lower CAC than paid-ad reliance.
  - src: https://productgrowth.in/insights/saas/india-saas-trends/
- **Variable per-transaction costs (OCR + payout) are low enough that a capped free tier is financially survivable.** _(high)_
  OCR: basic ~USD 0.0015/page; receipt-specific AnalyzeExpense USD 8-10/1,000 pages; Google Vision first 1,000/mo free. Payouts: RazorpayX 250 free/mo then ~INR 1.5-5 each.
  - src: https://aws.amazon.com/textract/pricing/  |  https://cloud.google.com/vision/pricing  |  https://razorpay.com/docs/x/manage-teams/billing/
- **Freemium is viable in India B2B but conversion is low on broad tools, so the free tier must be deliberately constrained with a clear paid trigger.** _(high)_
  B2B free-to-paid conversion 1-5% for broad-market tools, 5-15% for tightly targeted; 3-5% 'good', 8-12% 'great' for self-serve freemium.
  - src: https://chartmogul.com/reports/saas-conversion-report/  |  https://firstpagesage.com/seo-blog/saas-freemium-conversion-rates/
- **Zoho is the canonical proof that generous freemium + PLG works at scale for cost-sensitive Indian SMBs, validating the model for the category.** _(medium)_
  Zoho used bottom-up PLG, 50+ integrated apps, and a feature-rich freemium tier to beat funded global incumbents; 60M+ users across 180+ countries; bootstrapped and profitable since 2002.
  - src: https://growthx.club/blog/zoho-business-model  |  https://marketplace.zoho.com/become-a-partner
- **The CA/accountant and Tally reseller ecosystems are credible, low-CAC India distribution channels for an expense/reimbursement tool.** _(medium)_
  Tally had 28,000+ partners (2022) with 3-star/5-star certification tiers; many partners are CA-founded and embedded with SMB accounting; partnership CAC INR 50K-1.5L.
  - src: https://tallysolutions.com/partners/  |  https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- **Marketplace/integration listings (Zoho Marketplace) and founder-led WhatsApp/community selling are practical, near-zero-cost top-of-funnel routes for India SMB.** _(medium)_
  Zoho Marketplace is free to publish to and reaches 60M+ users for lead-gen; India SMB GTM commonly runs over WhatsApp/email; SaaSBoomi is a 4,000+ founder pay-it-forward community.
  - src: https://marketplace.zoho.com/become-a-partner  |  https://saasboomi.org/
- **18% GST applies to SaaS subscriptions and B2B buyers reclaim it as Input Tax Credit, so list prices should be quoted ex-GST (as Zoho does) and the 18% is not a true cost to GST-registered buyers.** _(high)_
  GST 18% under SAC 9983/998314; B2B buyers with GSTIN claim full ITC; e-invoicing mandatory above turnover threshold; monthly returns by the 20th.
  - src: https://www.lemonsqueezy.com/blog/indian-sales-tax-gst-saas  |  https://www.registerkaro.in/post/gst-registration-for-software-it-services
- **SAP Concur's per-report fee model is a useful pricing lever to differentiate against, but per-report pricing penalizes high-volume submitters and is poorly suited to India SMB price sensitivity.** _(medium)_
  Concur charges ~USD 8-9 per expense report plus a per-user base; quote-only, no public list, hybrid base+overage model common.
  - src: https://www.getapp.com/finance-accounting-software/a/concur-expense/pricing/  |  https://redresscompliance.com/sap-concur-licensing-guide-for-cios-and-ctos/
- **Vendor (not just employee) reimbursement adds a payout-rail dependency whose costs are predictable and can be passed through or absorbed in higher tiers.** _(high)_
  RazorpayX payouts free for first 250/mo then ~INR 1.5 per payout; INR 5 + ~INR 0.90 GST on a INR 10,000 payout; up to INR 5L/transaction, 24x7.
  - src: https://razorpay.com/docs/x/manage-teams/billing/  |  https://razorpay.com/x/payouts/

## Data Points

- Zoho Expense Free plan: **INR 0; up to 3 users; 5 GB receipt storage; 20 receipt autoscans; no minimum** (2026-06)  — https://www.zoho.com/in/expense/pricing/
- Zoho Expense Standard plan (monthly): **INR 99 per user/month; min 5 users; excludes GST** (2026-06)  — https://www.zoho.com/in/expense/pricing/
- Zoho Expense Standard plan (annual): **INR 79 per user/month (~25% off); min 5 users** (2026-06)  — https://www.zoho.com/in/expense/pricing/
- Zoho Expense Premium plan (monthly): **INR 199 per user/month; min 5 users** (2026-06)  — https://www.zoho.com/in/expense/pricing/
- Zoho Expense Premium plan (annual): **INR 149 per user/month (~25% off); min 5 users** (2026-06)  — https://www.zoho.com/in/expense/pricing/
- Zoho Expense free trial: **14 days, no credit card required** (2026-06)  — https://www.zoho.com/in/expense/pricing/
- Fyle / Sage Expense Management Growth plan: **USD 11.99 per active user/month, billed annually; min 5 users** (2025)  — https://www.fylehq.com/pricing
- Fyle / Sage Expense Management Business plan: **USD 14.99 per active user/month, billed annually; min 10 users** (2025)  — https://www.fylehq.com/pricing
- Fyle Enterprise plan: **Custom pricing; 250+ employees** (2025)  — https://www.fylehq.com/pricing
- Happay Expense Management pricing: **Starts ~INR 199 per user/month; no free trial; quote-based** (2025)  — https://www.techjockey.com/detail/happay-expense-management
- SutiExpense pricing: **~USD 6.50 per active submitter/month; approvers/admins free; ~USD 120/mo for 10 users** (2025)  — https://www.capterra.com/p/118974/SutiExpense/pricing/
- ExpenseOnDemand pricing: **From ~GBP 4.34 per user/month; pay-per-feature activation; charged only for active users; monthly rolling contract** (2026)  — https://www.expenseondemand.com/uk-pricing
- SAP Concur pricing: **~USD 9 per user/month plus ~USD 8-9 per expense report; quote-only; ~5-user minimum** (2026)  — https://www.getapp.com/finance-accounting-software/a/concur-expense/pricing/
- Volopay India pricing: **Not published; custom/quote-based; sales-led, card-led** (2026)  — https://www.volopay.com/in/pricing/
- India B2B SaaS blended CAC (INR 10-30 Cr ARR): **INR 1.2L - 2.5L per customer** (2026)  — https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- India B2B SaaS typical SMB ACV (INR 10-30 Cr ARR): **INR 4L - 8L (~USD 4,800-9,600)** (2026)  — https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- India B2B SaaS LTV:CAC and payback (INR 10-30 Cr ARR): **LTV:CAC 2.5x-3x; payback 14-20 months** (2026)  — https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- India SaaS channel CAC: Content/SEO: **INR 40K - 80K per customer** (2026)  — https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- India SaaS channel CAC: Partnerships/Channels: **INR 50K - 1.5L per customer (all ARR bands)** (2026)  — https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- India SaaS channel CAC: Outbound/SDR: **INR 2L - 4L per customer** (2026)  — https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- India SaaS sales cycle (mid-market): **3-9 months; enterprise 9-18 months** (2025)  — https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/
- PLG vs sales-led CAC at micro-deal sizes (India): **PLG median CAC INR 500-1,500 vs INR 2,000-5,000 sales-led; 40%+ of sub-$10M ARR firms use PLG primary** (2026)  — https://productgrowth.in/insights/saas/india-saas-trends/
- B2B SaaS freemium free-to-paid conversion: **1-5% broad-market tools; 5-15% tightly targeted; 3-5% good, 8-12% great** (2025)  — https://chartmogul.com/reports/saas-conversion-report/
- AWS Textract basic OCR (DetectDocumentText): **~USD 1.50 per 1,000 pages (USD 0.0015/page); USD 0.0006/page above 1M pages/mo** (2026)  — https://aws.amazon.com/textract/pricing/
- AWS Textract AnalyzeExpense (receipts/invoices): **USD 8-10 per 1,000 pages** (2026)  — https://aws.amazon.com/textract/pricing/
- Google Cloud Vision OCR: **First 1,000 units/mo free; USD 1.50 per 1,000 (1,001-5M); USD 1.00 per 1,000 above 5M** (2026)  — https://cloud.google.com/vision/pricing
- RazorpayX payout cost: **First 250 payouts/month free (Current Account); then from ~INR 1.5 per payout; ~INR 5 + GST for INR 10,000 payout (Lite)** (2025)  — https://razorpay.com/docs/x/manage-teams/billing/
- India GST on SaaS subscriptions: **18% (SAC 9983 / 998314); B2B buyers can claim Input Tax Credit** (2026)  — https://www.lemonsqueezy.com/blog/indian-sales-tax-gst-saas
- Tally partner ecosystem size: **28,000+ partners (2022); 3-star and 5-star certified tiers** (2022)  — https://tallysolutions.com/partners/
- Zoho user base / Marketplace reach: **60M+ users across 180+ countries; free to build Marketplace apps** (2026)  — https://marketplace.zoho.com/become-a-partner

## Entities

- **Zoho Expense**  [Competitor / expense SaaS]  (https://www.zoho.com/in/expense/pricing/)
  India-built; genuine free tier (3 users), INR 99/199 monthly, INR 79/149 annual; 5-user min; the freemium benchmark to beat
- **Fyle (Sage Expense Management)**  [Competitor / expense SaaS]  (https://www.fylehq.com/pricing)
  India-origin, acquired by Sage; USD 11.99-14.99 per active user/mo; active-user billing; card-feed centric, US-leaning
- **Happay**  [Competitor / expense SaaS]  (https://happay.com/)
  India enterprise/mid-market; ~INR 199/user/mo, no free trial; CubeCorp/Volopay-class; card + T&E
- **Volopay**  [Competitor / spend+card platform]  (https://www.volopay.com/in/pricing/)
  Sales-led, card/credit-led, no public pricing; UPI payouts in India; competes on corporate cards not pure reimbursement
- **SutiExpense**  [Competitor / expense SaaS]  (https://www.sutisoft.com/sutiexpense/business-expense-software-pricing.html)
  ~USD 6.50 per active submitter/mo; approvers free; global SMB
- **ExpenseOnDemand**  [Competitor / expense SaaS]  (https://www.expenseondemand.com/)
  Pay-per-feature activation, from ~GBP 4.34/user/mo; modular pricing; UK/India presence
- **SAP Concur**  [Competitor / enterprise expense]  (https://www.concur.com/forms/request-a-quote)
  Quote-only; ~USD 9/user/mo + ~USD 8-9 per expense report; enterprise; hybrid base+overage
- **RazorpayX Payouts**  [Payout/banking API (cost input)]  (https://razorpay.com/x/payouts/)
  Reimbursement payout rail; 250 free/mo then ~INR 1.5-5 each; key variable cost for vendor/employee payouts
- **AWS Textract (AnalyzeExpense)**  [OCR API (cost input)]  (https://aws.amazon.com/textract/pricing/)
  Receipt/invoice OCR; USD 8-10 per 1,000 pages; purpose-built for expenses
- **Google Cloud Vision**  [OCR API (cost input)]  (https://cloud.google.com/vision/pricing)
  General OCR; first 1,000/mo free; USD 1.50 per 1,000; cheaper but less expense-structured
- **Tally partner network**  [Distribution channel]  (https://tallysolutions.com/partners/)
  28,000+ resellers/implementers; embedded with India SMB accounting; channel-partner GTM route
- **Zoho Marketplace**  [Distribution / marketplace]  (https://marketplace.zoho.com/become-a-partner)
  60M+ Zoho users; free to publish; lead-gen via integration listing
- **SaaSBoomi**  [Founder community / GTM]  (https://saasboomi.org/)
  4,000+ India SaaS founder community; pay-it-forward GTM/peer learning; useful for indie distribution and learning
- **GST (SAC 9983)**  [Regulation]  (https://www.lemonsqueezy.com/blog/indian-sales-tax-gst-saas)
  18% GST on SaaS; B2B ITC claimable; e-invoicing above turnover threshold; monthly returns by 20th

## Risks / Caveats

- Volopay, Happay, and SAP Concur do not publish full price lists; their numbers here are starting prices or analyst estimates, not confirmed quotes — treat as directional (medium confidence).
- Happay's ~INR 199/user/mo figure comes from a third-party listing (Techjockey), not Happay's own page; actual enterprise deals are bundled/quote-based and likely higher.
- CAC/ACV/sales-cycle benchmarks come from a single India consultancy (upGrowth) calibrated to INR 10-30 Cr+ ARR firms; a pre-revenue indie team will see different (often lower-ticket) economics, and these are not audited primary data.
- PLG-vs-sales-led CAC figures (INR 500-1,500 vs 2,000-5,000) are from a blog aggregator (productgrowth.in), not a primary benchmark dataset — directional only.
- Freemium conversion ranges are global B2B benchmarks; India-specific free-to-paid conversion for expense tools is not separately published, so applying 1-5% to India carries uncertainty.
- Fyle is now Sage Expense Management with US-centric reimbursement (ACH) features; its India go-forward positioning and INR pricing may differ from the USD list.
- OCR/payout costs scale with usage; a popular free tier could accumulate real COGS if OCR/autoscan caps are set too generously — model worst-case free-user behavior before launch.
- Currency conversions (USD/GBP to INR) are approximate and move with FX; verify against live rates when modeling.

## Recommendations

- Adopt a Zoho-anchored ladder: Free tier (3-5 users, capped OCR autoscans e.g. 20-50/mo, no payouts) -> paid 'per active submitter' at roughly INR 79-149/user/mo on annual billing (INR 99-199 monthly), quoted ex-GST, 5-user minimum. Do not try to undercut Zoho on price; win on India-specific reimbursement workflow (UPI/vendor payouts, GST-ready reports, faster approvals).
- Use 'active submitter' billing (only charge users who file an expense in the month) to match the category standard and lower the buyer's perceived ACV; make approvers/admins free like SutiExpense.
- Make freemium deliberately leaky-into-paid: cap free at a small team size and OCR volume, and gate the highest-value triggers (automated payouts, multi-stage approvals, accounting integration, GST/policy reports) to paid. Target a realistic 2-5% free-to-paid conversion and instrument it.
- Lead GTM with content/SEO (INR 40K-80K CAC) + Zoho Marketplace/Tally-integration listings + a CA/accountant and Tally-partner referral program (partnership CAC INR 50K-1.5L). Avoid building an outbound SDR motion early (INR 2L-4L CAC is unaffordable at India SMB ACVs).
- Run founder-led sales over WhatsApp/email for the first cohorts and plug into SaaSBoomi for distribution and learning; convert engaged free users via in-product nudges rather than a sales team.
- Keep per-transaction costs off the critical path: use Google Vision (first 1,000 OCR units/mo free) or Textract for receipts, and pass payout costs through in paid tiers (RazorpayX 250 free payouts/mo covers small customers). Reserve payouts for paid plans only.
- Price one tier above Zoho Premium only if you bundle vendor payout + GST/TDS compliance + Tally/Zoho Books sync, since that is where Concur/Fyle's USD 12-15 pricing is vulnerable in India on value-for-money.

## Sources

- Zoho Expense Pricing (India) — https://www.zoho.com/in/expense/pricing/  (Primary: free tier limits, INR Standard/Premium monthly & annual, 5-user min, 25% annual discount)
- Fyle / Sage Expense Management Pricing — https://www.fylehq.com/pricing  (Primary: USD 11.99-14.99 per active user/mo, 5/10-user minimums, active-user billing)
- Happay Expense Management Pricing & Reviews (Techjockey) — https://www.techjockey.com/detail/happay-expense-management  (~INR 199/user/mo, no free trial, quote-based)
- SutiExpense Pricing (Capterra) — https://www.capterra.com/p/118974/SutiExpense/pricing/  (~USD 6.50 per active submitter/mo; approvers free)
- ExpenseOnDemand UK Pricing — https://www.expenseondemand.com/uk-pricing  (From ~GBP 4.34/user/mo; pay-per-feature; charge active users only)
- SAP Concur Pricing Guide (GetApp) — https://www.getapp.com/finance-accounting-software/a/concur-expense/pricing/  (~USD 9/user/mo + ~USD 8-9 per report; quote-only)
- SAP Concur Licensing Guide for CIOs/CTOs — https://redresscompliance.com/sap-concur-licensing-guide-for-cios-and-ctos/  (Hybrid base+overage and per-report model detail)
- Volopay India Pricing — https://www.volopay.com/in/pricing/  (No public pricing; sales-led/custom)
- CAC Benchmarks for Indian B2B SaaS by ARR Band (upGrowth) — https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/  (CAC, ACV, LTV:CAC, payback, channel-level CAC, sales cycle)
- India SaaS Trends 2026 (productgrowth.in) — https://productgrowth.in/insights/saas/india-saas-trends/  (PLG vs sales-led CAC; PLG default sub-$10M ARR)
- ChartMogul SaaS Conversion Report — https://chartmogul.com/reports/saas-conversion-report/  (Free-to-paid conversion benchmarks)
- SaaS Freemium Conversion Rates (First Page Sage) — https://firstpagesage.com/seo-blog/saas-freemium-conversion-rates/  (3-5% good, 8-12% great freemium conversion)
- AWS Textract Pricing — https://aws.amazon.com/textract/pricing/  (OCR per-page and AnalyzeExpense receipt pricing)
- Google Cloud Vision Pricing — https://cloud.google.com/vision/pricing  (OCR free tier and per-1,000 unit pricing)
- RazorpayX Fees and Taxes (Docs) — https://razorpay.com/docs/x/manage-teams/billing/  (250 free payouts/mo, per-payout fee, payout fee example)
- RazorpayX Payouts — https://razorpay.com/x/payouts/  (Payout limits, 24x7 processing, instant bulk payouts)
- Indian GST for SaaS (Lemon Squeezy) — https://www.lemonsqueezy.com/blog/indian-sales-tax-gst-saas  (18% GST, RCM, B2B ITC, invoice requirements)
- GST Registration for Software/IT Services (RegisterKaro) — https://www.registerkaro.in/post/gst-registration-for-software-it-services  (18% rate, SAC codes, LUT/e-invoicing)
- Tally Partners — https://tallysolutions.com/partners/  (28,000+ partner ecosystem; 3-star/5-star tiers)
- Zoho Marketplace Partner Program — https://marketplace.zoho.com/become-a-partner  (60M+ users, free to publish, lead-gen reach)
- Zoho Business Model (GrowthX) — https://growthx.club/blog/zoho-business-model  (Bootstrapped PLG + freemium India exemplar)
- SaaSBoomi — https://saasboomi.org/  (4,000+ India SaaS founder community for GTM/distribution)

