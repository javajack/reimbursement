# Indian regulatory & tax rules determining reimbursable vs non-reimbursable expenses (GST ITC, Income Tax, per-diem/LTA/fuel, TDS, record retention) for a B2B expense-reimbursement SaaS rule engine

## Executive Summary

Indian T&E reimbursement rules are governed by two distinct overlays that a rule engine must model separately: (1) GST input-tax-credit eligibility (CGST Sec 17(5)), which blocks ITC on most T&E categories — food & beverages, outdoor catering, club/health/fitness membership, rent-a-cab, life/health insurance, employee travel benefits/LTC, and passenger motor vehicles with seating capacity ≤13 — unless a narrow exception applies (obligatory for employer under law; same line of business; used to make an outward taxable supply of the same category); and (2) Income Tax deductibility for the company (Sec 37(1) "wholly & exclusively for business"), which disallows personal, capital, illegal, penalty/fine, CSR (Sec 135 via Explanation 2/3), and "prohibited by law" expenses including freebies to medical professionals. Separately, the engine must handle employee-side taxability of reimbursements/allowances: per-diem (Sec 10(14)/Rule 2BB) is exempt only to the extent actually spent on official duty (unspent balance is taxable salary); LTA (Sec 10(5)) covers only domestic travel fare, 2 journeys per 4-year block, old regime only; fuel/car reimbursement uses fixed Rule 3 perquisite values (Rs 1,800 or Rs 2,400/month plus Rs 900/month driver); gifts/vouchers to employees are exempt only up to Rs 5,000 aggregate per year (Rule 3(7)(iv)). Vendor payments trigger TDS under 194C (1%/2% contractors), 194J (10% professional / 2% technical), and 194H (2% commission, w.e.f. Oct 2024) with section-specific thresholds, plus possible GST reverse charge (RCM) on rent-a-cab, GTA, legal services, and unregistered-supplier purchases. Statutory retention periods differ by law: 8 financial years (Companies Act Sec 128), 6 years from end of relevant assessment year (Income Tax), and 72 months from annual-return due date (GST Sec 36), so the longest applicable period (effectively 8 years) should drive document archival. Standard company-policy non-reimbursables (alcohol, personal entertainment, traffic challans, donations, spa/grooming, minibar/in-room movies, no-show/late-checkout penalties) are policy choices that frequently overlap with the GST/Income-Tax disallowance categories, making them natural defaults for the rule engine. Note: GST and TDS thresholds/rates changed materially in 2024-2025 (e.g., 194H rate cut, 194J threshold raised to Rs 50,000), so the engine must be version-dated by financial year.

## Findings

- **GST Sec 17(5)(a) blocks ITC on motor vehicles for transport of persons with approved seating capacity of 13 or fewer (including driver); ITC is allowed only if seating capacity exceeds 13 or the vehicle is used for the specified businesses.** _(high)_
  ITC is not available for motor vehicles used to transport persons having seating capacity <=13 persons (including driver); available if seating capacity exceeds 13 persons. Exceptions: passenger transport, cab/bus rental, driving schools, and further supply (resale) of such vehicles.
  - src: https://cleartax.in/s/section-175-of-cgst-act  |  https://cleartax.in/s/gst-cases-where-input-tax-credit-is-unavailable
- **GST Sec 17(5)(b) blocks ITC on food & beverages, outdoor catering, beauty treatment, health services, cosmetic/plastic surgery, leasing/renting/hiring of motor vehicles (rent-a-cab), life & health insurance, membership of a club/health/fitness centre, and travel benefits to employees on vacation (LTC/home travel concession).** _(high)_
  Blocked: outdoor catering, food/beverages, health/beauty services, vehicle rentals, life/health insurance, club memberships, employee travel benefits/LTC. Enterprises cannot claim ITC on food & beverages served.
  - src: https://cleartax.in/s/section-175-of-cgst-act  |  https://cleartax.in/s/gst-cases-where-input-tax-credit-is-unavailable
- **Sec 17(5)(b) ITC exceptions: credit IS allowed where (i) the inward supply is used to make an outward taxable supply of the same category (or as part of a taxable composite/mixed supply), or (ii) providing the goods/service to employees is obligatory for the employer under any law in force.** _(high)_
  Exceptions: ITC allowed when goods/services are resold (same category outward supply), required by law for employer compliance, or included in composite/mixed supplies. For rent-a-cab/insurance, if a law mandates the employer provide it, ITC is allowed.
  - src: https://cleartax.in/s/section-175-of-cgst-act  |  https://cleartax.in/s/gst-cases-where-input-tax-credit-is-unavailable
- **GST Sec 17(5) also blocks ITC on vessels/aircraft (aa), insurance/repair/maintenance for blocked vehicles/vessels/aircraft (ab), works-contract & construction of immovable property (c/d), goods/services used for personal consumption (g), and goods lost/stolen/destroyed/written-off or disposed of by gift or free samples (h).** _(high)_
  Clause (g) blocks purchases for non-business/personal purposes (partial business use allows proportional ITC); clause (h) blocks ITC for stolen, damaged, written-off, or gifted goods/samples.
  - src: https://cleartax.in/s/section-175-of-cgst-act
- **Income Tax Sec 37(1) allows a business deduction only for expenditure laid out wholly & exclusively for business/profession that is NOT capital, NOT personal, and NOT covered by Secs 30-36; personal expenses, capital expenses, fines/penalties for legal violations (incl. traffic violations), and illegal expenses are disallowed.** _(high)_
  Expenses must be wholly and exclusively for business, revenue (not capital/personal), and legal. Fines for breaking laws (late tax filing, traffic violations) cannot be deducted; no deduction for any expense incurred for a purpose that is an offence or prohibited by law.
  - src: https://cleartax.in/s/section-37-of-income-tax  |  https://tax2win.in/guide/section-37-of-income-tax-act
- **CSR expenditure (mandatory under Companies Act Sec 135) is NOT deductible under Income Tax Sec 37(1) per Explanation 2; it is deemed not incurred wholly & exclusively for business.** _(high)_
  Explanation 2 to Sec 37 clarifies CSR expenditure is not allowed as a deduction; though mandatory for certain companies, CSR is for societal benefit, not exclusively for the business.
  - src: https://cleartax.in/s/section-37-of-income-tax  |  https://www.taxmann.com/post/blog/critical-analysis-of-section-37-of-the-income-tax-act
- **Freebies (gifts, travel, hospitality, cash) given to medical practitioners / their associations are disallowed under Sec 37(1) as 'prohibited by law' (IMC Regulations 2002, amended 2009); CBDT Circular 5/2012 codified this and Finance Act 2022 added Explanation 3 widening the 'prohibited by law' bar.** _(high)_
  CBDT Circular 5/2012 (dated 01.08.2012) held expense on freebies to doctors inadmissible u/s 37(1); the value of freebies is also taxable income in the hands of the recipient professional. Budget 2022 (Explanation 3) further clarified disallowance of expenditure for offences and prohibited activities.
  - src: https://taxguru.in/income-tax/cbdt-circular-disallowing-expenditure-freebies-medical-practitioners-valid.html  |  https://www.taxcorner.co.in/2022/02/disallowance-of-expenses-for-offence-under-section-37-further-clarified-budget-2022.html
- **Per-diem / daily allowance is exempt under Sec 10(14)(i) read with Rule 2BB only to the extent actually spent on official duty while away from the normal place of duty; any unspent/saved portion is taxable as salary.** _(high)_
  Daily allowance is not taxable if entirely spent; per-diem becomes taxable salary if the employee saves part of it. Exemption requires the expense be actually incurred in performance of official duties (bills/self-declaration support full claim).
  - src: https://taxguru.in/income-tax/diems-daily-allowance-taxability-salary.html  |  https://incometaxindia.gov.in/rules/income-tax%20rules/103120000000006985.htm
- **Leave Travel Allowance (LTA) exemption under Sec 10(5)/Rule 2B covers only travel fare (not food, accommodation, or sightseeing), only for domestic travel within India, for 2 journeys in a block of 4 calendar years, and is available only under the OLD tax regime.** _(high)_
  LTA exemption: two journeys within a 4-year block, travel fare only (excludes food/accommodation/sightseeing), domestic travel only (international not covered), available only under old regime.
  - src: https://cleartax.in/s/lta-leave-travel-allowance  |  https://tax2win.in/guide/lta-leave-travel-allowance
- **Employer-reimbursed car running/maintenance is valued as a perquisite under Rule 3: Rs 1,800/month (engine <=1.6L) or Rs 2,400/month (>1.6L), plus Rs 900/month if a driver is provided; if used wholly for official duty with a maintained logbook and employer certificate, the perquisite value is nil.** _(high)_
  Reimbursement of running/maintenance: perquisite Rs 1,800 + Rs 900 driver (<=1.6L) or Rs 2,400 + Rs 900 driver (>1.6L). If used only for official purpose, not taxable irrespective of engine capacity, subject to logbook (date, destination, mileage, expenditure) and an employer certificate of exclusive official use.
  - src: https://incometaxindia.gov.in/Rules/Income-Tax%20Rules/103120000000007059.htm  |  https://cleartax.in/s/tax-benefit-salaried-employee-car-provided-employer
- **Telephone/mobile/internet reimbursement for official use (with reasonable personal use) is exempt from tax for the employee when supported by bills.** _(medium)_
  Expenses for official and personal use of telephone/mobile bills up to a reasonable limit are exempt from tax (employer reimbursement against actual bills).
  - src: https://incometaxindia.gov.in/w/employees-benefits-allowable  |  https://tax2win.in/guide/section-17-2-of-income-tax-act
- **Fuel allowance offered as a flat allowance is commonly treated as exempt up to ~Rs 7,000/month only when used exclusively for official duties and backed by bills; the safer route is reimbursement against actual fuel bills under the Rule 3 perquisite framework.** _(low)_
  Sources cite a maximum limit of ~Rs 7,000/month treated as non-taxable for fuel allowance, contingent on official-duty use and supporting bills. This is a practitioner interpretation rather than a single statutory cap, so should be modeled conservatively against actuals.
  - src: https://www.pazcare.com/employee-benefits/fuel-allowance  |  https://www.hinote.in/taxability-of-fuel-expense-reimbursement-to-employees-part-i-hinote-systems-outsourced-payroll-services-online-payroll-software/
- **Gifts, vouchers, or tokens from employer to employee are exempt as a perquisite only up to aggregate Rs 5,000 per financial year (Rule 3(7)(iv)); above that, the EXCESS over Rs 5,000 is taxable. Cash / convertible-to-cash gifts (e.g., gift cheques) are fully taxable with no exemption.** _(high)_
  Rule 3(7)(iv): aggregate value of gifts/vouchers/tokens exempt up to Rs 5,000 per year; amount beyond Rs 5,000 is taxable as salary perquisite. Cash or convertible-money gifts are not exempt.
  - src: https://www.taxmanagementindia.com/visitor/detail_manual.asp?ID=887  |  https://taxguru.in/income-tax/fringe-benefits-gift-voucher-token-employees.html
- **TDS on vendor contractor payments (Sec 194C): 1% if payee is Individual/HUF, 2% otherwise; threshold Rs 30,000 per single contract / Rs 1,00,000 aggregate per year.** _(high)_
  194C TDS is 1% for Individual/HUF contractors and 2% for others. (Standard thresholds Rs 30,000 single / Rs 1,00,000 annual aggregate.) No-PAN cases attract 20%.
  - src: https://www.incometaxindia.gov.in/w/tds-rates-1  |  https://cleartax.in/s/tds-rate-chart
- **TDS on professional/technical services (Sec 194J): 10% for professional services, 2% for technical services; threshold raised to Rs 50,000 (from Rs 30,000) effective FY 2025-26.** _(high)_
  194J: 2% technical services, 10% professional services; threshold revised to Rs 50,000. No-PAN cases attract 20%.
  - src: https://www.incometaxindia.gov.in/w/tds-rates-1  |  https://cleartax.in/s/tds-rate-chart
- **TDS on commission/brokerage (Sec 194H): rate reduced to 2% effective 1 October 2024 (was 5%); threshold raised from Rs 15,000 to Rs 20,000 per financial year effective 1 April 2025.** _(high)_
  194H rate is 2% from 1 Oct 2024 (5% until 30 Sep 2024); threshold increases from Rs 15,000 to Rs 20,000/FY from 1 Apr 2025.
  - src: https://www.bajajfinserv.in/about-tds-on-commission  |  https://cleartax.in/s/tds-rate-chart
- **GST Reverse Charge Mechanism (RCM) shifts GST liability to the recipient (the company) for notified services and for purchases from unregistered suppliers — relevant T&E cases include rent-a-cab (where supplier opts), Goods Transport Agency (GTA) services, and legal services from advocates; recipient must self-invoice and can claim ITC if not otherwise blocked under 17(5).** _(medium)_
  RCM applies to notified services (legal services, GTA where GTA opts for RCM) and unregistered-supplier purchases; recipient must register, self-invoice, pay GST, and can claim ITC for business use. Cab rides via app aggregators (Ola/Uber) — GST paid by the platform under RCM/Sec 9(5).
  - src: https://cleartax.in/s/reverse-charge-gst  |  https://gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/Reverse%20charge%20Mechanism.pdf
- **Record/voucher retention: Companies Act 2013 Sec 128 requires books of account + vouchers for at least 8 financial years preceding the current year (longer if investigation ordered).** _(high)_
  Sec 128: company must keep books of account in good order for not less than 8 financial years immediately preceding; Central Govt may direct a longer period where an investigation is ordered.
  - src: https://ca2013.com/128-books-of-account-etc-to-be-kept-by-company/  |  https://taxguru.in/company-law/maintenance-books-accounts-section-128-companies-act-2013.html
- **Record retention under Income Tax: books of account must be preserved for 6 years from the end of the relevant assessment year (effectively ~7-8 prior previous years).** _(high)_
  Assessees must preserve specified books for 6 years from the end of the relevant assessment year.
  - src: https://incometaxmanagement.com/Pages/Tax-Ready-Reckoner/GST-India/66-Period-of-Retention-of-Accounts-under-GST-Section-36-of-the-CGST-Act.html
- **Record retention under GST Sec 36: every registered taxpayer must retain books and records for 72 months (6 years) from the due date of furnishing the annual return for that year; extended to 1 year after final disposal where appeals/proceedings/investigations are pending (whichever is later).** _(high)_
  Sec 36: retain records 72 months from the annual-return due date (annual return due 31 Dec following the FY). Where appeal/revision/proceeding/investigation pending, retain for 1 year after final disposal or 72 months, whichever is later.
  - src: https://academy.tax4wealth.com/public/blog/period-of-retention  |  https://www.aubsp.com/cgst-act-section-36-explained/
- **Standard company-policy non-reimbursable categories (alcohol, personal entertainment beyond limits, personal/grooming/spa items, in-room movies & minibar, traffic fines/challans, late-checkout/no-show penalties, donations, gifts above limits) are policy defaults that frequently overlap statutory disallowance — alcohol/entertainment and grooming map to blocked GST ITC (17(5)(b)) and Sec 37 personal-expense disallowance; fines/challans map to Sec 37 penalty disallowance; donations map to non-business/CSR disallowance.** _(medium)_
  Sec 37 disallows fines/penalties (e.g., traffic violations) and personal expenses; Sec 17(5)(b)/(g) block ITC on food & beverages, beauty/health services, club membership, and personal-consumption goods — aligning these common policy exclusions with statutory treatment. Donations/gifts above Rs 5,000 trigger perquisite tax and are typically non-deductible/non-business.
  - src: https://cleartax.in/s/section-37-of-income-tax  |  https://cleartax.in/s/section-175-of-cgst-act

## Data Points

- GST ITC motor-vehicle seating-capacity threshold (block applies at or below): **13 persons including driver**  — https://cleartax.in/s/section-175-of-cgst-act
- GST ITC wrongful-claim interest: **24% per annum**  — https://cleartax.in/s/gst-cases-where-input-tax-credit-is-unavailable
- TDS 194C rate (Individual/HUF contractor): **1%** (FY 2024-25)  — https://cleartax.in/s/tds-rate-chart
- TDS 194C rate (others): **2%** (FY 2024-25)  — https://cleartax.in/s/tds-rate-chart
- TDS 194J professional services rate: **10%**  — https://cleartax.in/s/tds-rate-chart
- TDS 194J technical services rate: **2%**  — https://cleartax.in/s/tds-rate-chart
- TDS 194J threshold (revised): **Rs 50,000** (FY 2025-26)  — https://cleartax.in/s/tds-rate-chart
- TDS 194H commission rate (from 1 Oct 2024): **2% (was 5%)** (2024-10-01)  — https://www.bajajfinserv.in/about-tds-on-commission
- TDS 194H threshold (from 1 Apr 2025): **Rs 20,000 (was Rs 15,000)** (2025-04-01)  — https://www.bajajfinserv.in/about-tds-on-commission
- TDS rate when payee has no PAN: **20%**  — https://cleartax.in/s/tds-rate-chart
- Car perquisite value (engine <=1.6L, employer pays running): **Rs 1,800/month**  — https://incometaxindia.gov.in/Rules/Income-Tax%20Rules/103120000000007059.htm
- Car perquisite value (engine >1.6L, employer pays running): **Rs 2,400/month**  — https://incometaxindia.gov.in/Rules/Income-Tax%20Rules/103120000000007059.htm
- Driver perquisite add-on: **Rs 900/month**  — https://incometaxindia.gov.in/Rules/Income-Tax%20Rules/103120000000007059.htm
- Employee gift/voucher perquisite exemption (aggregate per year): **Rs 5,000**  — https://www.taxmanagementindia.com/visitor/detail_manual.asp?ID=887
- Fuel allowance commonly-cited non-taxable cap (interpretive, bills required): **~Rs 7,000/month**  — https://www.pazcare.com/employee-benefits/fuel-allowance
- LTA exemption frequency: **2 journeys per block of 4 calendar years, domestic fare only, old regime only**  — https://cleartax.in/s/lta-leave-travel-allowance
- Record retention - Companies Act Sec 128: **8 financial years**  — https://ca2013.com/128-books-of-account-etc-to-be-kept-by-company/
- Record retention - Income Tax: **6 years from end of relevant assessment year**  — https://incometaxmanagement.com/Pages/Tax-Ready-Reckoner/GST-India/66-Period-of-Retention-of-Accounts-under-GST-Section-36-of-the-CGST-Act.html
- Record retention - GST Sec 36: **72 months (6 years) from annual-return due date**  — https://www.aubsp.com/cgst-act-section-36-explained/

## Entities

- **CGST Act Section 17(5)**  [Regulation - GST]  (https://cleartax.in/s/section-175-of-cgst-act)
  Blocked / ineligible input tax credit list; core of GST T&E ITC rule engine
- **Income Tax Act Section 37(1)**  [Regulation - Income Tax]  (https://cleartax.in/s/section-37-of-income-tax)
  General business deduction 'wholly & exclusively'; disallows personal/capital/penalty/illegal/CSR/freebies
- **Income Tax Section 10(14) / Rule 2BB**  [Regulation - Income Tax]  (https://incometaxindia.gov.in/rules/income-tax%20rules/103120000000006985.htm)
  Special allowances incl. daily/per-diem exemption to extent spent on official duty
- **Income Tax Section 10(5) / Rule 2B (LTA)**  [Regulation - Income Tax]  (https://cleartax.in/s/lta-leave-travel-allowance)
  LTA fare exemption, domestic only, 2 journeys/4-yr block, old regime
- **Income Tax Rule 3 (Perquisite valuation)**  [Regulation - Income Tax]  (https://incometaxindia.gov.in/Rules/Income-Tax%20Rules/103120000000007059.htm)
  Car (Rs 1,800/2,400) + driver (Rs 900) perquisite values; gift Rule 3(7)(iv) Rs 5,000
- **Companies Act 2013 Section 128**  [Regulation - Company Law]  (https://ca2013.com/128-books-of-account-etc-to-be-kept-by-company/)
  8-year books/voucher retention
- **CGST Act Section 36**  [Regulation - GST]  (https://www.aubsp.com/cgst-act-section-36-explained/)
  72-month GST record retention from annual-return due date
- **TDS Sections 194C / 194J / 194H**  [Regulation - Income Tax (TDS)]  (https://www.incometaxindia.gov.in/w/tds-rates-1)
  Vendor-payment withholding: contractors, professional/technical, commission
- **GST Reverse Charge Mechanism (Sec 9(3)/9(4)/9(5))**  [Regulation - GST]  (https://cleartax.in/s/reverse-charge-gst)
  RCM on rent-a-cab, GTA, legal services, unregistered-supplier purchases
- **CBDT Circular 5/2012**  [Regulation - Income Tax (CBDT)]  (https://taxguru.in/income-tax/cbdt-circular-disallowing-expenditure-freebies-medical-practitioners-valid.html)
  Freebies to medical professionals disallowed u/s 37(1)
- **Companies Act Section 135 (CSR)**  [Regulation - Company Law]  (https://www.csr.gov.in/content/csr/global/master/home/helpandfaqs.html)
  Mandatory CSR; spend not deductible u/s 37 (Explanation 2)
- **CBIC tax information portal**  [Government source]  (https://taxinformation.cbic.gov.in/)
  Primary CGST Act text (note: TLS certificate issue at fetch time on 2026-06-09)
- **Income Tax Department - Benefits allowable to employees**  [Government source]  (https://www.incometaxindia.gov.in/w/employees-benefits-allowable)
  Official list of allowances/perquisites and exemptions (returned 403 to automated fetch)

## Risks / Caveats

- The authoritative CBIC CGST Act page (taxinformation.cbic.gov.in) failed to fetch (TLS certificate error) and incometaxindia.gov.in returned HTTP 403 to automated fetch on 2026-06-09; clause wording here is corroborated via reputable secondary sources (ClearTax, TaxGuru, Taxmann) and should be re-verified against the live primary statute before hard-coding into the rule engine.
- Several figures changed in 2024-2026 (TDS 194H rate/threshold, 194J threshold) and a draft Income Tax Rules 2026 reportedly revises company-car perquisite valuation — all dated values must be confirmed against the current Finance Act and notifications for the relevant financial year.
- The ~Rs 7,000/month fuel allowance 'cap' is a practitioner interpretation, not a clean statutory limit; fuel is most defensibly handled as reimbursement-against-actual-bills under Rule 3, so treat the cap as low-confidence.
- The freebies-to-professionals disallowance (Sec 37 Explanation 1/3, CBDT Circular 5/2012) has had conflicting ITAT rulings on retrospectivity; the law is settled prospectively but historical periods carry litigation risk.
- RCM applicability is service- and notification-specific (e.g., rent-a-cab RCM depends on supplier's GST rate election; aggregator cab rides fall under Sec 9(5)); the engine should not blanket-apply RCM and must reference current GST notifications.
- Many 'non-reimbursable' categories are company-policy choices, not statutory bans — the engine should present them as configurable defaults, not as legal absolutes, to avoid over-blocking legitimate reimbursements.

## Recommendations

- Model GST ITC eligibility and Income-Tax deductibility as two independent boolean overlays per line item, plus a third employee-taxability overlay; a single expense can be reimbursable but ITC-blocked AND a taxable perquisite simultaneously.
- Encode Sec 17(5)(b) exceptions as conditional flags on the company profile: 'obligatory-under-law', 'same-line-of-business', and 'used-for-outward-taxable-supply' — default all to false so ITC is blocked unless explicitly justified.
- Version-date all rates/thresholds by financial year (e.g., 194H 5%->2% on 2024-10-01; 194J threshold ->Rs 50,000 in FY25-26; 194H threshold ->Rs 20,000 on 2025-04-01) and store an effective-from/effective-to range, since 2024-2025 saw multiple changes.
- Default the document/voucher retention policy to the longest applicable period (8 years, Companies Act Sec 128) to satisfy GST (72 months), Income Tax (6 years from AY end), and Companies Act simultaneously; add a hold mechanism to freeze deletion during litigation/investigation per Sec 36.
- Ship a default non-reimbursable category set (alcohol, personal entertainment, traffic challans/fines, donations, spa/grooming, minibar, in-room movies, no-show/late-checkout penalties, gifts > Rs 5,000) and let admins toggle each, since these straddle policy choice and statutory disallowance.
- For vendor (non-employee) reimbursements, auto-compute TDS (194C/194J/194H) and flag potential GST RCM (rent-a-cab, GTA, legal, unregistered supplier) so the company books the self-invoice and offsetting ITC where not blocked.
- Treat per-diem on an actuals/declaration basis in the engine: surface the unspent balance as a taxable-perquisite amount to feed payroll, rather than assuming the full per-diem is tax-free.

## Sources

- Section 17(5) of CGST Act - Blocked Credit Under GST (clause-by-clause) — https://cleartax.in/s/section-175-of-cgst-act  (Primary-corroborating: motor vehicle 13-seat threshold, food/beverage, club, rent-a-cab, exceptions)
- Ineligible ITC: Cases Where ITC under GST Cannot Be Availed — https://cleartax.in/s/gst-cases-where-input-tax-credit-is-unavailable  (ITC block categories incl. 24% interest on wrongful claims)
- CBIC tax information - Section 17 CGST Act (official statute) — https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter5/section17_v1.00.html  (Primary source; TLS cert error at fetch time 2026-06-09 - verify live)
- Section 37 of Income Tax Act - allowed & disallowed deductions — https://cleartax.in/s/section-37-of-income-tax  (Wholly & exclusively test; personal/capital/penalty/CSR disallowance)
- Critical Analysis of Section 37 of the Income Tax Act (Taxmann) — https://www.taxmann.com/post/blog/critical-analysis-of-section-37-of-the-income-tax-act  (CSR Explanation 2; offence/prohibited-by-law Explanation)
- CBDT Circular disallowing freebies to medical practitioners is valid (TaxGuru) — https://taxguru.in/income-tax/cbdt-circular-disallowing-expenditure-freebies-medical-practitioners-valid.html  (Circular 5/2012; freebies disallowance + recipient taxability)
- Disallowance of Expenses for Offence under Sec 37 - Budget 2022 (Explanation 3) — https://www.taxcorner.co.in/2022/02/disallowance-of-expenses-for-offence-under-section-37-further-clarified-budget-2022.html  (Finance Act 2022 widening of prohibited-by-law bar)
- Per diems (Daily allowance) Taxability as Salary (TaxGuru) — https://taxguru.in/income-tax/diems-daily-allowance-taxability-salary.html  (Unspent per-diem taxable)
- Prescribed allowances for Section 10(14) - Rule 2BB (Income Tax Dept) — https://incometaxindia.gov.in/rules/income-tax%20rules/103120000000006985.htm  (Official Rule 2BB allowance list)
- Leave Travel Allowance (LTA) - Exemption rules (ClearTax) — https://cleartax.in/s/lta-leave-travel-allowance  (Domestic fare only, 2 journeys/4-yr block, old regime)
- Valuation of perquisites - Rule 3 (Income Tax Dept) — https://incometaxindia.gov.in/Rules/Income-Tax%20Rules/103120000000007059.htm  (Official Rule 3; car/driver perquisite valuation)
- Tax benefit on a car provided by the employer (ClearTax) — https://cleartax.in/s/tax-benefit-salaried-employee-car-provided-employer  (Rs 1,800/2,400 + Rs 900 driver; official-use logbook/certificate)
- Perquisites - Gift, Voucher or Token - Rule 3(7)(iv) — https://www.taxmanagementindia.com/visitor/detail_manual.asp?ID=887  (Rs 5,000 gift/voucher exemption threshold)
- Fuel & Petrol Allowance exemption under section 10 (Pazcare) — https://www.pazcare.com/employee-benefits/fuel-allowance  (~Rs 7,000/month interpretive fuel cap (low confidence))
- TDS Rates (Income Tax Department) — https://www.incometaxindia.gov.in/w/tds-rates-1  (Official TDS section-wise rates)
- TDS Rate Chart (ClearTax) — https://cleartax.in/s/tds-rate-chart  (194C/194J/194H rates & thresholds, no-PAN 20%)
- TDS on Commission and Brokerage - Section 194H (Bajaj) — https://www.bajajfinserv.in/about-tds-on-commission  (194H 5%->2% Oct 2024; threshold Rs 15k->20k Apr 2025)
- All about Reverse Charge Mechanism (RCM) under GST (ClearTax) — https://cleartax.in/s/reverse-charge-gst  (RCM scope: legal, GTA, unregistered supplier, aggregator cabs)
- Reverse Charge Mechanism flyer (GST Council) — https://gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/Reverse%20charge%20Mechanism.pdf  (Official GST Council RCM flyer)
- Section 128 Books of account - Companies Act 2013 (CAIRR) — https://ca2013.com/128-books-of-account-etc-to-be-kept-by-company/  (8-year retention)
- Period of Retention of Accounts - Section 36 GST (AUBSP) — https://www.aubsp.com/cgst-act-section-36-explained/  (72-month GST record retention + extension during proceedings)
- Period of Retention of Accounts under GST Sec 36 / Income Tax 6-year rule — https://incometaxmanagement.com/Pages/Tax-Ready-Reckoner/GST-India/66-Period-of-Retention-of-Accounts-under-GST-Section-36-of-the-CGST-Act.html  (Income tax 6-year-from-AY-end retention)

