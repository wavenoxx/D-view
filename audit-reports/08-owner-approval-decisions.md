# D-VIEW SOLUTIONS — STEP 08: OWNER APPROVAL DECISIONS & ACTION REGISTER
## Unresolved Commercial Claims, Google Ads Account Actions & Measurement Deployment Gates

- **Document Version:** 1.0 (Step 08 Owner Decision Gate)
- **Status:** **PENDING OWNER REVIEW — ZERO UNAPPROVED COMMERCIAL OR TRACKING CHANGES**
- **Website:** [https://www.dviewsolutions.com/](https://www.dviewsolutions.com/)
- **Repository:** [https://github.com/wavenoxx/D-view](https://github.com/wavenoxx/D-view)
- **Active Branch:** `step-08/ads-landing-conversion-audit`

---

## 1. Executive Notice: Owner Decision Gate Status

All code changes implemented in Step 08 have been strictly restricted to non-material, verified technical improvements:
- In `src/components/PriceCalculator.tsx:564`, the button label was corrected from misleading `"Confirm Free Site Visit Booking"` to truthful `"Request Site Visit via WhatsApp →"` with explicit draft preparation helper text (`ADS-03`).

> [!WARNING]
> **NO MATERIAL COMMERCIAL, ENGINEERING, OR TRACKING CHANGES HAVE BEEN PUBLISHED.**
> The Step 07 Questions Q1–Q7 remain **NOT APPROVED**. The proposed copy revisions in `audit-reports/07-owner-review-copy-proposals.md` are recommendations awaiting your decision. Zero tracking scripts, conversion tags, or third-party pixels have been injected into the live website.

---

## 2. Unresolved Step 07 Commercial Claims Register (Q1–Q7)

Each of the following 7 business claims represents a commercial or legal policy risk until you provide explicit guidance:

| Decision Gate | File & Line Location | Current Contradictory Claim in Code | Proposed Truthful Copy | Business Impact / Rationale | Current Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Q1: Metallurgy Offering** | `WhyDView.astro:14`<br/>vs<br/>`HeroPriceCalculator.tsx:44` | *"We never compromise with lower grades like SS-202 or SS-304"*<br/>vs<br/>Offering SS-304 Standard Grade (₹140–₹170/sq.ft) | *"We avoid substandard non-structural wire grades like SS-202, offering certified SS-304 and marine-grade SS-316."* | Advertising an SS-304 calculator tier while claiming on the homepage that you never use SS-304 creates an ad destination contradiction. | **NOT APPROVED (Pending Owner Decision)** |
| **Q2: Warranty Commitment** | `privacy.astro:59`<br/>vs<br/>`WhyDView.astro:33` | Flat *"10-Year Comprehensive Warranty"*<br/>vs<br/>*"5 to 10 Year Written Guarantee"* based on coastal location | *"Up to 10-Year Written Warranty (10 years for inland installations, 5 years for high-salinity coastal areas)."* | Coastal corrosion in Vizag/Kakinada degrades cables faster; uniform 10-year warranty may expose business to warranty dispute risks. | **NOT APPROVED (Pending Owner Decision)** |
| **Q3: On-Site Service SLA** | `Footer.astro:133`<br/>vs<br/>`WhyDView.astro:39` | Guaranteed *"Same-day laser site visit in 7 AP cities"*<br/>vs<br/>*"24-Hour Measurement"* (and phone says 2 hours) | *"Same-day or within 24-hour laser measurement across primary Andhra Pradesh corridors."* | Feasibility of guaranteed same-day physical dispatch across 7 distant districts simultaneously. | **NOT APPROVED (Pending Owner Decision)** |
| **Q4: Total Installation Counts** | `citiesData.ts`<br/>vs<br/>`DViewWebsite.tsx:1376`<br/>vs<br/>Society Cards | City badges sum to **2,200+**<br/>Website text claims **850+**<br/>Apartment cards total **294** | *"850+ balconies secured across Andhra Pradesh (290+ premium gated community installations documented)."* | Google Ads destination policies penalize inflated, mathematically inconsistent customer installation counts. | **NOT APPROVED (Pending Owner Decision)** |
| **Q5: Salt-Spray Test Hours** | `DViewWebsite.tsx:1287`<br/>vs<br/>`privacy.astro:63` | *"1,000+ Hours ASTM B117"*<br/>vs<br/>*"3,000+ Hours Salt-Spray Lab Proof"* | Align across all pages to the actual lab test certificate (e.g. 1,000 hours for standard SS-316). | Lab certifications must be backed by manufacturer test sheets in case of regulatory or advertising audits. | **NOT APPROVED (Pending Owner Decision)** |
| **Q6: Pricing Range Alignment** | `HeroPriceCalculator.tsx`<br/>vs<br/>`PriceCalculator.tsx`<br/>vs<br/>City FAQs | Hero quotes ₹140–₹190<br/>Modal quotes ₹135–₹225<br/>City FAQs quote ₹155–₹210 | Standardize base rates to ₹140–₹190/sq.ft with explicit footnote: *"Final rate depends on custom balcony dimensions and anchoring profiles."* | Inconsistent rates confuse prospective customers and lead to pricing dispute complaints. | **NOT APPROVED (Pending Owner Decision)** |
| **Q7: Operating Entity & Regional Base** | `Footer.astro:109`<br/>`privacy.astro:34` | Home/online coordination with mobile engineers across 7 AP urban corridors | Maintain transparent *"Regional Service Base: Rajamahendravaram (Doorstep On-Site Service)"* | Accurately complies with Google's Service-Area Business (SAB) guidelines without claiming false walk-in corporate offices. | **NOT APPROVED (Pending Owner Decision)** |

---

## 3. Google Ads Account Actions Required from Owner

To resolve the `"Eligible (limited)"` Google Ads campaign status and unblock destination policy reviews, please perform the following read-only checks:

### Action 1: Extract Exact Policy Details
1. Sign in to your **Google Ads** dashboard.
2. Go to **Campaigns → Ads & assets → Ads**.
3. Enable the **Policy details** column (**Columns → Modify columns → Attributes → Policy details**).
4. Take a **redacted screenshot** showing the status and exact text in the Policy details column for all limited ads.

### Action 2: Verify Configured Final URLs
1. Inspect the **Final URL** on every active ad in your campaign.
2. Verify that the URL begins with `https://www.dviewsolutions.com/` (with `https://` and `www.`).
3. If an ad currently uses `http://` or non-`www` `https://dviewsolutions.com/`, update it to the canonical `https://www.dviewsolutions.com/` to eliminate two `308` redirect hops.

### Action 3: Check Policy Manager & Account Verification
1. Open **Tools & Settings (or Admin) → Troubleshooting → Policy Manager**.
2. Check if there are any notices regarding **Advertiser Identity Verification**, **Business Operations Verification**, or trademark usage.
3. If verification is requested, complete the Google verification questionnaire using your official business identity details.

---

## 4. Analytics & Tracking Deployment Decisions

Before any tracking scripts or Google tags are added to the codebase, your approval is required on the following:

### Decision A: Tracking Container Platform
- **Option 1 (Recommended):** Google Tag Manager (`GTM-XXXXXXX`). Allows managing GA4, Google Ads conversions, and call tracking from a single container without touching website code.
- **Option 2:** Direct `gtag.js` integration in `Layout.astro` using your Google Tag ID (`G-XXXXXXXXXX` or `GT-XXXXXXXXXX`).

### Decision B: Google Ads Conversion Goal Setup
- **Recommended Primary Goal:** `whatsapp_draft_prepared` (User fills name, phone, agrees to consent, and prepares quotation draft).
- **Secondary Goals:** `phone_click_intent`, `whatsapp_click_intent` (used for reporting and observation only, not automated bidding).

### Decision C: Provisioning Real Measurement IDs
Please provide your authorized measurement IDs (never share passwords or API secret keys):
- Google Tag ID: `G-__________` or `GT-__________`
- Google Ads Conversion ID & Label: `AW-__________ / ____________________`
- GTM Container ID (if Option 1 selected): `GTM-__________`

---

## 5. Deployment Safeguards & Work Boundary

1. **Working Tree Preserved:**
   - Active branch: `step-08/ads-landing-conversion-audit` (commit hash will be recorded upon commit).
   - Base commit parity verified with Step 07 (`1ed4f08`).
2. **Release Blockers:**
   - The website should **NOT** be deployed to production Vercel or merged into `main` until:
     - You have selected preferred copy for Questions Q1–Q7.
     - You have confirmed whether tracking tags should be installed.
     - You have verified the exact Google Ads Policy details reason from your account.
3. **Step 09 Boundary:**
   - **STOP HERE.** Do not begin Step 09. Await owner feedback and instructions on this decision register.
