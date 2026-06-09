# VERIFY: PAN, GSTIN and bank-account (penny-drop) verification are available via API from providers like Karza/Perfios, Signzy, Cashfree, Setu, Protean, Sandbox, Hyperverge, IDfy at low per-verification cost. (Plus: verify which providers offer these, the legality/authorized channels for PAN and Aadhaar, and indicative per-API pricing.)

- **Verdict:** partially-confirmed  (confidence: medium)
- **Corrected / best-supported:** Largely TRUE on availability and pricing, but the framing needs important legal caveats. (1) Availability: All named providers do offer PAN, GSTIN and bank-account/penny-drop verification via API (Setu does NOT sell GSTIN on its main KYC page and discontinued live Aadhaar; Protean is the underlying authorized PAN source, not a plug-and-play KYC aggregator like the others). (2) Pricing: "Low per-verification cost" is correct as an order of magnitude. Defensible indicative ranges: Bank-account penny-drop ~Rs 2-5 per successful verification (Setu publishes Rs 3/successful verification up to 1,000/mo; Deepvue "from Rs 2/check"); PAN verification ~Rs 1-3 per call; GSTIN verification ~Rs 1-3 per call. These are pre-tax list/headline prices at low volume; most vendors quote custom/contract pricing, add 18% GST, and may charge setup/activation (commonly Rs 5,000-15,000) or annual commitments, so true all-in cost is higher than the per-hit figure alone. (3) LEGALITY is the key caveat the claim omits: PAN verification is NOT a free-for-all - the Income Tax Dept authorizes only Protean (ex-NSDL) and UTIITSL as PAN agencies, and online bulk/API PAN verification (PAN OPV via Protean) is restricted to specific eligible entity categories (banks, NBFCs, AIR/SFT filers, large TDS/TCS deductors, exchanges, PFRDA PoPs, etc.) who register (Protean OPV ~Rs 12,000+GST/yr). Aggregators resell access but the end-user generally must qualify. AADHAAR is far more restricted: private entities CANNOT freely do live Aadhaar authentication/eKYC - it requires AUA/KUA (or sub-AUA/sub-KUA) status under the Aadhaar Act as amended 2019, is limited to permitted/notified purposes, and under 2025 rules a private entity must register with UIDAI and get government/ministry approval. So Aadhaar should NOT be assumed cheaply/freely API-callable; offline XML/DigiLocker are the compliant fallbacks. GSTIN verification is the most open - backed by the public GSTN "Search Taxpayer" API via GSPs and is low-cost/often near-free.

## Reasoning

Provider coverage is well-supported: aggregator/comparison sources and the vendors' own product pages confirm Karza/Perfios, Signzy, Cashfree, Sandbox, Hyperverge, IDfy and Setu all expose PAN, GSTIN and/or bank-account verification APIs; Protean is the ITD-authorized PAN backend rather than a comparable KYC aggregator, and Setu's public KYC page shows penny-drop + PAN but not GSTIN and notes its live Aadhaar service was discontinued after UIDAI changes. On pricing, only a few vendors publish per-call rates (Setu Rs 3/successful penny-drop up to 1,000/mo; Deepvue "from Rs 2/check"); most others gate pricing behind "contact sales," so I treated widely-cited Rs 3-5 penny-drop and Rs 1-3 PAN/GSTIN figures as indicative low-volume list prices and flagged that GST, setup fees and volume contracts change the effective cost - hence medium (not high) confidence on exact rupee figures. The strongest skeptical correction is legal: the claim's "available at low cost" glosses over that PAN OPV is restricted to authorized agencies (Protean/UTIITSL) and eligible registered entities, and that private-sector live Aadhaar authentication is tightly controlled (AUA/KUA licensing, 2019 amendment, 2025 UIDAI registration rules), so a generic SaaS cannot assume frictionless cheap access to PAN-bulk or Aadhaar. I did not independently confirm each vendor's current rupee price (paywalled/sales-gated), so pricing should be validated per-vendor at procurement time.

## Key Numbers

- Setu bank-account verification (penny drop), published price: **Rs 3 per successful verification (up to 1,000/month; bulk pricing above)**  — https://setu.co/data/kyc/bank-account-verification/
- Deepvue verification APIs, headline price: **From Rs 2 per check (varies by check type/plan)**  — https://deepvue.ai/pricing/
- Penny-drop / bank-account verification, market indicative range: **~Rs 3-5 per transaction at low volume (down to ~Rs 2-3 at scale)**  — https://www.noblewebstudio.com/blog/buy-bank-account-verification-api/
- Protean Online PAN Verification (OPV) registration: **~Rs 12,000 + GST per annum (entity must be an eligible category)**  — https://www.bankbazaar.com/pan-card/bulk-pan-verification.html
- Authorized PAN agencies (ITD): **Only 2: Protean eGov (ex-NSDL) and UTIITSL**  — https://www.proteantech.in/services/pan-opv/
- Setup/activation fees (where charged): **~Rs 5,000-15,000 one-time depending on plan/vendor**  — https://www.noblewebstudio.com/blog/buy-bank-account-verification-api/

## Sources

- Setu - Bank Account Verification API (penny drop) + pricing — https://setu.co/data/kyc/bank-account-verification/
- Deepvue - Pricing (pay-per-call / annual) — https://deepvue.ai/pricing/
- Protean - PAN OPV (Online PAN Verification by Authorized Entities) — https://www.proteantech.in/services/pan-opv/
- BankBazaar - Bulk PAN Verification (methods, eligibility, Rs 12,000+GST/yr) — https://www.bankbazaar.com/pan-card/bulk-pan-verification.html
- Sandbox (Quicko) - KYC API: Aadhaar/DigiLocker, PAN, GSTIN, Bank, MCA — https://sandbox.co.in/kyc
- Cashfree - Penny Drop / Bank Account Verification API — https://www.cashfree.com/penny-drop-verification/
- HyperVerge - Bank Account Verification (Penny Drop) API — https://hyperverge.co/in/integrations-marketplace/bank-account-verification-api/
- Gridlines - Top KYC API Providers in India (Signzy, Karza/Perfios, IDfy, HyperVerge, Setu) — https://gridlines.io/blogs/top-11-kyc-api-providers-in-india/
- UIDAI - Authentication Requesting Agency (AUA/KUA) — https://uidai.gov.in/en/ecosystem/authentication-ecosystem/authentication-requesting-agency.html
- PRS - The Aadhaar and Other Laws (Amendment) Bill, 2019 — https://prsindia.org/billtrack/the-aadhaar-and-other-laws-amendment-bill-2019
- Lexology - Aadhaar Authentication for Private Entities: 2025 Amendment — https://www.lexology.com/library/detail.aspx?g=d22ac806-db2b-48d8-85a7-582c39237fac
- Biometric Update - India to regulate private-sector Aadhaar verification (registration mandate) — https://www.biometricupdate.com/202512/india-to-ban-aadhaar-photocopying-as-uidai-moves-to-regulate-private-sector-verification
- GST portal - Search Taxpayer (official GSTIN verification) — https://services.gst.gov.in/services/searchtp
- Noble Web Studio - Buy Bank Account Verification API (indicative pricing/setup fees) — https://www.noblewebstudio.com/blog/buy-bank-account-verification-api/

