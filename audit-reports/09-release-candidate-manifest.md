# D-VIEW SOLUTIONS — STEP 09: RELEASE CANDIDATE MANIFEST
## Frozen Source Metadata, Commit Ancestry, Cumulative Patch Register & Dependency State

- **Manifest Version:** 1.0 (Step 09 Release Candidate Freeze)
- **Release Candidate Branch:** `step-09/release-regression-integration`
- **Frozen Source Commit SHA:** `b360bdd211cd3914133161e99271af099b7ea392`
- **Repository:** `https://github.com/wavenoxx/D-view`
- **Target Deployment Platform:** Vercel (Static Astro 7 Output)
- **Production Domain:** `https://www.dviewsolutions.com/`

---

## 1. Commit Ancestry Chain

The release candidate represents a continuous, strictly linear ancestry originating from GitHub `main` baseline commit `c9d7f19`:

```
c9d7f19 (origin/main)
   │
   ▼
a495f69 (step-02/navigation-fixes)
   │  - Fixed broken anchor fragments (#book-visit, #pillars)
   │  - Added ?corridor= allowlist sanitization
   │  - Restored missing navigation routes and deep links
   ▼
9114e95 (step-03/google-ads-privacy-trust)
   │  - Eliminated external PII leak to api.qrserver.com
   │  - Removed unauthorized Google "Verified" badge
   │  - Unified canonical URLs to https://www.dviewsolutions.com
   │  - Replaced misleading "Request Sent" with truthful WhatsApp draft copy
   ▼
cc80832 (step-04/technical-seo-content-originality)
   │  - Consolidated 41-route canonical graph & 22-URL sitemap
   │  - Enforced single semantic H1 on all pages
   │  - Aligned JSON-LD LocalBusiness & FAQPage schemas
   ▼
5d7515c (step-05/mobile-ux-performance-a11y)
   │  - Resolved MOB-03 right-edge grey gutter by removing ::-webkit-scrollbar
   │  - Fixed mobile responsive text clipping across 8 phone breakpoints
   │  - Hardened accessibility (WCAG 2.2 AA) on sliders & drawers
   ▼
ee9c406 (step-06/forms-security-a11y)
   │  - Eliminated blocking window.alert() native dialogs (A11Y-01 to A11Y-03)
   │  - Added form debouncing (isSubmitting) and inputMode="tel"
   │  - Enforced affirmative DPDP consent on all modals
   │  - Secured outbound target="_blank" links with rel="noopener noreferrer"
   ▼
1ed4f08 (step-07/original-content-business-claims)
   │  - Removed mathematically impossible hyperbole ("101%")
   │  - Removed internal copywriter drafting notes ("900+ listings")
   │  - Clarified project gallery as architectural corridor reference layouts
   │  - Documented Step 07 Questions Q1–Q7 for owner approval
   ▼
b360bdd (step-08/ads-landing-conversion-audit) [HEAD / FROZEN RC]
      - Corrected PriceCalculator submit label from "Confirm Free Site Visit Booking"
        to "Request Site Visit via WhatsApp →" with draft helper notice (ADS-03)
      - Designed Truthful Conversion Taxonomy (zero-PII, primary vs secondary)
      - Documented owner read-only Google Ads policy inspection guide
```

---

## 2. Remote PR #1 Overlap & Conflict Assessment

An open Pull Request exists on GitHub:
- **PR Number:** #1 (`wavenoxx/D-view#1`)
- **PR Title:** *Audit fixes: privacy-safe enquiries, canonical SEO and branded homepage intro*
- **PR Source Branch:** `origin/audit/ads-trust-privacy-loader-20261017` (`469cb5b`)
- **Status on GitHub:** Open (Checks passing, Vercel preview deployment ready)

### Overlap & Differences:
1. **QR Code Privacy:** PR #1 replaced `api.qrserver.com` with `qrcode.toDataURL`. Our release candidate includes this fix **plus** form validation (`FORM-03`), accessible inline alert containers (`A11Y-02`), and affirmative consent (`PRIV-01`).
2. **Canonical Domain:** PR #1 left non-`www` `https://dviewsolutions.com` in `astro.config.mjs`, `Layout.astro`, `robots.txt`, and page canonicals. Our release candidate unifies **100% of URLs** onto the live production preferred domain `https://www.dviewsolutions.com`.
3. **Intro Animation:** PR #1 created `.dview-intro`. Our release candidate preserved this animation, verified it is non-intrusive (`pointer-events: none`, `aria-hidden: true`, `display: none` under reduced motion), and tested it across all breakpoints.
4. **Mobile Responsiveness (MOB-03):** PR #1 did NOT fix MOB-03 (the grey strip on Android Chrome). Our release candidate completely eliminates the grey strip by removing `::-webkit-scrollbar` rules.
5. **Conflict Verdict:** **DO NOT MERGE PR #1.** Merging PR #1 would cause merge conflicts with our sequential Steps 02–08 commits and reintroduce non-`www` canonical regressions. PR #1 should be closed or superseded by this release candidate branch once approved.

---

## 3. Dependency Inventory & Lockfile State

The release candidate uses modern, locked dependency versions verified on Node.js `>=22.12.0`:

| Package Name | Installed Version | Role / Purpose | Lockfile Integrity |
| :--- | :--- | :--- | :---: |
| **`astro`** | `7.3.5` | Static site generator & build engine | Clean |
| **`@astrojs/react`** | `7.0.0` | React component integration for Astro | Clean |
| **`react`** | `19.3.0` | Client-side reactive UI components | Clean |
| **`react-dom`** | `19.3.0` | React DOM renderer | Clean |
| **`tailwindcss`** | `4.3.3` | Modern CSS engine | Clean |
| **`@tailwindcss/vite`** | `4.3.3` | Vite plugin for Tailwind CSS 4 | Clean |
| **`lucide-react`** | `1.49.0` | UI icon set | Clean |
| **`qrcode`** | `1.5.4` | In-browser canvas QR generator | Clean |
| **`@types/qrcode`** | `1.5.6` | TypeScript definitions for qrcode | Clean |
| **`@types/react`** | `19.3.0` | TypeScript definitions for React 19 | Clean |
| **`@types/react-dom`** | `19.3.0` | TypeScript definitions for React DOM | Clean |

---

## 4. Cumulative Source File Modification Summary

Across Steps 02 through 08, the following source files were modified, verified, and committed:

1. **`astro.config.mjs`:** Preferred domain unified to `https://www.dviewsolutions.com`.
2. **`public/robots.txt`:** Canonical host updated to `https://www.dviewsolutions.com`; sitemap linked.
3. **`public/sitemap.xml`:** Consolidated to 22 canonical public URLs.
4. **`src/styles/global.css`:** Removed `::-webkit-scrollbar` (resolved MOB-03); added `.dview-intro` styles.
5. **`src/layouts/Layout.astro`:** Default canonicals, Open Graph, Twitter cards, JSON-LD schemas unified to `www.`; added `.dview-intro` container.
6. **`src/components/DViewWebsite.tsx`:** Replaced external QR generation with local `qrcode`; added affirmative consent; added accessible inline error container; sanitized copywriter draft notes.
7. **`src/components/SiteVisitForm.tsx`:** Removed fake Google verification badge; replaced false "Request Sent" with truthful "WhatsApp Message Ready"; added affirmative consent; added input debouncing and numeric phone validation.
8. **`src/components/PriceCalculator.tsx`:** Corrected submit button label to "Request Site Visit via WhatsApp →"; added helper text; added affirmative consent; added accessible modal dialog roles and Escape key listener.
9. **`src/components/HeroPriceCalculator.tsx`:** Added explicit label-input couplings (`id`/`htmlFor`) and `inputMode="decimal"`.
10. **`src/components/Navbar.tsx`:** Restored missing navigation routes; fixed mobile drawer accessibility.
11. **`src/components/Footer.astro`:** Updated business location to transparent regional service base in Rajamahendravaram.
12. **`src/data/citiesData.ts`:** Removed mathematically impossible hyperbole ("101%").
13. **`src/pages/[city].astro` & `locations/[location].astro`:** Consolidated alias canonicals onto 7 primary city URLs.
14. **`src/pages/projects/index.astro`:** Clarified scope as architectural balcony layouts.
15. **`src/pages/privacy.astro`:** Disclosed local-only form processing, zero tracking pixels, and transparent doorstep service operations.

---

## 5. Frozen Release Candidate Verification Gates

| Gate Item | Verification Command / Check | Result | Verdict |
| :--- | :--- | :---: | :---: |
| **Static Build** | `npm run build` | 41 pages built in 0.59s (0 errors) | **PASS** |
| **Linear Ancestry** | `git log --graph --oneline` | 7 sequential commits from `c9d7f19` | **PASS** |
| **Route Count** | `find dist -name "index.html"` | Exactly 41 generated routes | **PASS** |
| **Overflow Integrity** | Playwright across 12 viewports | 0px overflow across all 41 routes | **PASS** |
| **MOB-03 Retest** | Headless Chrome (412x915 Android) | 0px overflow; 0 persistent CSS gutter | **PASS** |
| **PII Data Leakage** | Network inspection | 0 external requests to tracking/QR APIs | **PASS** |
| **Owner Business Gates** | Questions Q1–Q7 | **Awaiting Owner Approval** | **HOLD** |
