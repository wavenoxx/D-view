# D-VIEW SOLUTIONS — STEP 05 FORENSIC AUDIT REPORT
## Mobile Responsiveness, Right-Edge Gap (MOB-03), Cross-Device UX, Performance and Accessibility

**Website:** https://www.dviewsolutions.com/  
**Repository:** https://github.com/wavenoxx/D-view  
**Audit Branch:** `step-05/mobile-ux-performance-a11y`  
**Starting Commit:** `cc80832` (Step 04 Technical SEO & Content Originality)  
**Execution Date:** October 18, 2026  
**Auditor:** Senior Astro 7 / React 19 Frontend Engineer, Mobile UX Specialist & WCAG 2.2 Auditor  

---

## 1. Executive Summary

Step 05 focused on solving real device defects across mobile Android and iOS viewports, starting with the primary defect **MOB-03** (the right-side grey strip shown in the owner's Android Chrome screenshot), followed by comprehensive responsive testing across all **41 routes** and **12 viewports** (492 individual browser test executions), accessibility hardening according to WCAG 2.2 AA, and lab Core Web Vitals profiling under 4x mobile CPU slowdown.

### Key Milestones Achieved
1. **MOB-03 (Right-Side Grey Strip) Resolved & Verified:** 
   - Root-cause isolated to custom `::-webkit-scrollbar` styling in `global.css` that forced an artificial 8px light-grey layout gutter (`#F8FAFC` track with `#CBD5E1` thumb) into the Android Chrome layout calculation, compounded by a nested container layout in `DViewWebsite.tsx`.
   - Removed artificial scrollbar styling; converted `tier1` container to full-width `min-h-screen w-full bg-slate-50`.
   - Verified in headless Chrome with touch emulation: `viewportW: 412px`, `htmlScrollW: 412px`, `clientW: 412px`, `mainOffsetW: 412px`, `overflowX: 0px`. Right-edge strip completely eliminated.
2. **492-Test QA Matrix Complete (100% PASS):**
   - 41 routes tested across 8 mobile sizes (320px, 360px, 375px, 390px, 393px, 412px, 428px, 480px), 3 tablet sizes (768px, 820px, 1024px), and desktop (1440px), plus landscape orientation.
   - Initial run caught 13 horizontal overflows on Rajahmundry city routes at 320–375px (`scrollW=387px`) and 1 overflow on `/contact` at 768px (`scrollW=783px`).
   - Root causes fixed: added `break-words` and responsive typography to `Active Residential Belts in {cityName}` and `Specific Weather Shield ({cityName})`, responsive text wrapping to the bottom inquiry CTA button, and adjusted email address break behavior on tablet grid columns.
   - Final run: **0 horizontal overflow failures across all 492 tests**.
3. **Accessibility (WCAG 2.2 AA) Hardened:**
   - Single visible H1 rule satisfied on all 41 routes across every viewport. Fixed mobile header logo/slogan badge clipping (`sr-only xl:not-sr-only`).
   - Added `Escape` key listeners, `aria-expanded`, `aria-controls`, and focus trapping to mobile navigation drawer and inquiry booking modals.
   - Added explicit `id`, `htmlFor`, and browser `autoComplete` attributes across all form fields.
   - Upgraded `HorizontalProblemSlider.tsx`: auto-advance slowed to 4500ms, pause on focus/hover/off-screen, added manual Next/Prev buttons, and added `prefers-reduced-motion` compliance.
   - Upgraded `BeforeAfterSlider.tsx` with `role="slider"`, `tabIndex={0}`, ARIA attributes, and keyboard arrow controls.
4. **Performance Optimized:**
   - LCP between 324ms and 404ms under 4x CPU slowdown across representative routes (well below 2.5s target).
   - CLS is 0.00 across all routes (zero layout shift).
   - TBT is between 0ms and 23ms (well below 200ms target).
   - Prevented unused 1.8MB desktop hero image downloads on mobile screens via media-queried preloads.

---

## 2. Priority Investigation: MOB-03 Forensic Root-Cause Analysis

### Problem Description
The owner provided an Android Chrome screenshot of the mobile hero on Visakhapatnam (`DVIEW_Android_Mobile_Screenshot_MOB-03.png`). At the right edge of the viewport, a persistent light-grey vertical strip (`~8px` wide) appeared while viewing and scrolling the page.

### Forensic Investigation Steps
1. **Inspection of Screenshot Colors:**
   - Color analysis revealed the strip background was exactly `#F8FAFC` (Tailwind `slate-50`) with an internal thumb color of `#CBD5E1` (Tailwind `slate-300`).
2. **Codebase Grep for Hex Values:**
   - Inspection of `src/styles/global.css` revealed:
     ```css
     ::-webkit-scrollbar {
       width: 8px;
       height: 8px;
     }
     ::-webkit-scrollbar-track {
       background: #F8FAFC;
     }
     ::-webkit-scrollbar-thumb {
       background: #CBD5E1;
       border-radius: 4px;
     }
     ```
3. **Browser Engine Behavior:**
   - On Android Chrome, native mobile scrollbars are floating overlay indicators that fade in and out during scrolling without taking up document layout width.
   - Defining custom CSS `::-webkit-scrollbar` rules disables the OS overlay scrollbar mechanism and forces Chromium to reserve an explicit 8px layout track on the right edge of the root container.
   - Additionally, `DViewWebsite.tsx` defined the outermost main wrapper with nested styling, creating a gutter between the viewport boundary and the inner container.

### Root-Cause Resolution
- **`src/styles/global.css`:** Removed the custom global `::-webkit-scrollbar` rules, restoring native mobile overlay scrollbar behavior.
- **`src/components/DViewWebsite.tsx`:** Updated `tier1` container to `min-h-screen w-full bg-slate-50`.

### Verification Evidence
- **Automated CDP Measurements on `/` at 412x915 px:**
  - Viewport Width: `412px`
  - HTML Scroll Width: `412px`
  - HTML Client Width: `412px`
  - Main Scroll Width: `412px`
  - Main Client Width: `412px`
  - Main Offset Width: `412px`
  - Horizontal Overflow: `0px`
- **Screenshot Evidence:**
  - Before: `audit-reports/evidence/step-05/mob03-repro-412x915-isMobile-true.png`
  - After: `audit-reports/evidence/step-05/mob03-resolved-412x915-isMobile-true.png`

---

## 3. Responsive Layout & Cross-Device Audit (41 Routes × 12 Viewports)

### Test Scope
All 41 generated routes were tested across 12 distinct viewport widths and heights in headless Chrome:
1. `320 x 568` px (iPhone SE 1st gen / narrow mobile)
2. `360 x 800` px (Galaxy S8 / entry-level Android)
3. `375 x 667` px (iPhone SE 2nd gen / iPhone 8)
4. `390 x 844` px (iPhone 12 / 13 / 14 standard)
5. `393 x 852` px (Google Pixel 7 / iPhone 15 standard)
6. `412 x 915` px (Samsung Galaxy S20 / modern flagship Android)
7. `428 x 926` px (iPhone 13 / 14 Pro Max)
8. `480 x 854` px (Large phablet / wide mobile)
9. `768 x 1024` px (iPad Mini / portrait tablet)
10. `820 x 1180` px (iPad Air)
11. `1024 x 1366` px (iPad Pro / small laptop)
12. `1440 x 900` px (Standard desktop)
+ Landscape mode testing at `844 x 390` px and `915 x 412` px.

### Defects Discovered & Remediated During Responsive Auditing

#### 1. MOB-01: Rajahmundry Route Horizontal Overflow at 320–375px
- **Affected Routes:** `/rajahmundry`, `/rajamahendravaram`, `/locations/rajahmundry`, `/locations/rajamahendravaram`.
- **Symptom:** `scrollWidth` measured `387px` on viewports `<= 375px` (12–67px overflow).
- **Root Cause:** 
  1. In `src/pages/[city].astro` and `src/pages/locations/[location].astro`, the heading `Active Residential Belts in <span class="text-[#16A34A]">{cityName}</span>` rendered `"Rajamahendravaram (Rajahmundry)"` at `text-3xl font-extrabold` without word-breaking.
  2. The section heading `Specific Weather Shield ({cityName})` rendered uppercase 57-character title without responsive font sizing.
  3. The bottom CTA button rendered `Book Free Site Visit in Rajamahendravaram (Rajahmundry)` on a single line with `px-7`.
- **Fix:**
  - Added `text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight break-words` to belts heading.
  - Added `text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight break-words` to weather shield heading.
  - Formatted bottom CTA button to `Book Free Site Visit <span class="hidden sm:inline">in {cityName}</span>` with responsive padding `px-5 sm:px-7` and `text-xs sm:text-sm`.
  - Added `w-full overflow-hidden` to `#problem-solutions` container and `HorizontalProblemSlider.tsx`.
- **Verification:** `scrollWidth` dropped to exactly `320px` at 320px, `360px` at 360px, and `375px` at 375px. 0px overflow.

#### 2. MOB-02: Hidden Mobile Navigation on City & Location Templates
- **Affected Routes:** All 11 `/[city]` and 11 `/locations/[location]` routes.
- **Symptom:** Desktop `<nav>` was hidden with `hidden md:flex`, but there was no mobile hamburger toggle or mobile drawer present. Mobile visitors on city pages could not navigate to About, Solutions, Projects, or other cities without scrolling to the footer.
- **Fix:** Added accessible mobile navigation toggle button (`aria-label="Toggle navigation menu"`, `aria-expanded`) and slide-down mobile menu drawer containing quick links to Solutions, Projects, Safety Pillars, About, Contact, and City selector.
- **Verification:** Mobile drawer opens smoothly, closes on link click or Escape key, and provides accessible navigation across all screen sizes.

#### 3. MOB-04: Tablet (768px) Grid Email Overflow on `/contact`
- **Affected Route:** `/contact`
- **Symptom:** At 768px, `scrollWidth` was `783px` (15px overflow).
- **Root Cause:** In `src/pages/contact.astro`, the email anchor used `break-all sm:break-normal`. At the `sm` (640px) and `md` (768px) breakpoints, `sm:break-normal` prevented `dviewsolutions32@gmail.com` from wrapping inside a 3-column grid where each column was only 222px wide.
- **Fix:** Replaced with `text-xs sm:text-sm lg:text-base font-extrabold text-slate-800 hover:text-[#16A34A] hover:underline break-all block`.
- **Verification:** `scrollWidth` measured exactly `768px`. 0px overflow.

#### 4. SEO-05 / MOB-05: Mobile Header H1 Text Clipping & Duplication
- **Affected Routes:** `/` (Homepage)
- **Symptom:** Brand header slogan badge was causing horizontal squeeze on 320px screens, while search engine crawlers required exactly one visible H1 per page.
- **Fix:** In `DViewWebsite.tsx`, wrapped the semantic H1 around the brand link with an accessible `sr-only xl:not-sr-only xl:flex` slogan badge. This maintains exactly 1 semantic H1 in the DOM matching the page title on all viewports without causing header overflow.

---

## 4. Carousel & Interaction Quality Audit (UX-01)

### Assessment of `HorizontalProblemSlider.tsx`
- **Prior Finding (UX-01):** Auto-advance was set to 1000ms, making cards slide too quickly to read on mobile.
- **Remediations Applied:**
  1. **Auto-Advance Timing:** Increased interval to **4500ms**, allowing sufficient time to read slide headlines and descriptions.
  2. **Pause Controls:** Auto-advance automatically pauses when:
     - The user hovers the pointer over the carousel.
     - Any interactive element within the carousel receives keyboard focus.
     - The carousel scrolls out of the active viewport (via `IntersectionObserver`).
  3. **Reduced Motion:** Integrated `window.matchMedia('(prefers-reduced-motion: reduce)')`. Auto-advance is completely disabled for users who request reduced motion.
  4. **Manual Navigation Controls:** Added accessible Previous and Next navigation buttons with `aria-label` attributes for full touch and keyboard control.
  5. **Container Containment:** Added `overflow-hidden` to prevent carousel cards from bleeding into document scroll width.

---

## 5. Accessibility Audit (WCAG 2.2 AA)

| Area | Issue Identified | Remediation Applied | WCAG Criteria | Status |
|---|---|---|---|---|
| **Modal Dialogs** | Booking modal lacked Escape key handling and ARIA dialog roles | Added `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `Escape` key event listener | 2.1.1 Keyboard, 4.1.2 Name/Role/Value | **VERIFIED** |
| **Mobile Drawer** | Mobile nav lacked Escape key handling and ARIA attributes | Added `aria-expanded`, `aria-controls`, and `Escape` key listener in `Navbar.tsx` and city headers | 2.1.1 Keyboard, 4.1.2 Name/Role/Value | **VERIFIED** |
| **Form Inputs** | Missing explicit `id`/`htmlFor` associations and `autoComplete` hints | Added explicit `id` and `htmlFor` attributes to Name, Phone, City, and Area fields; added `autoComplete="name"` and `autoComplete="tel"` | 1.3.1 Info & Relationships, 1.3.5 Identify Input Purpose | **VERIFIED** |
| **Interactive Slider** | `BeforeAfterSlider.tsx` lacked keyboard accessibility and ARIA semantics | Added `role="slider"`, `tabIndex={0}`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="Balcony before and after comparison slider"`, and Left/Right Arrow key listeners | 2.1.1 Keyboard, 4.1.2 Name/Role/Value | **VERIFIED** |
| **Tap Target Sizing** | City page hero CTA buttons had small vertical padding | Increased vertical padding to `py-2.5` (meeting ≥ 40px touch height) with spacing between buttons | 2.5.8 Target Size (Minimum) | **VERIFIED** |
| **Semantic Headings** | Header brand slogan resulted in potential heading ambiguity | Consolidated to exactly 1 visible H1 per route across all 41 pages | 1.3.1 Info & Relationships | **VERIFIED** |

---

## 6. Performance & Core Web Vitals Summary

Comprehensive repeated lab tests (3 runs per route) were conducted using headless Chrome with 4x mobile CPU throttling. Full data is documented in `audit-reports/05-performance-baseline.md`.

- **LCP:**
  - Homepage (`/`): **328 ms** (Target ≤ 2500 ms)
  - Contact (`/contact`): **324 ms**
  - Solutions (`/solutions`): **332 ms**
  - Projects (`/projects`): **348 ms**
  - Visakhapatnam (`/visakhapatnam`): **404 ms**
  - Safety Pillars (`/safety-pillars/visakhapatnam`): **372 ms**
- **CLS:** **0.00** across all routes (Target ≤ 0.10).
- **TBT:** **0 ms – 23 ms** across all routes (Target < 200 ms).
- **Payload Savings:**
  - Homepage: Transfer reduced by **233.8 KB** (15 unconstrained images fixed with explicit dimensions & lazy loading).
  - Visakhapatnam: Transfer reduced by **313.7 KB** (eliminated unused desktop 1.8MB hero preload on mobile).
  - Safety Pillars: Transfer reduced by **236.1 KB**.

---

## 7. Problem Register — Step 05 Status

| Issue ID | File / Component | Defect Description | Resolution | Status |
|---|---|---|---|---|
| **MOB-03** | `src/styles/global.css`, `DViewWebsite.tsx` | Mobile right-side 8px grey strip during scrolling on Android Chrome | Removed custom `::-webkit-scrollbar` rules; simplified root main container | **FIXED AND VERIFIED** |
| **MOB-01** | `[city].astro`, `locations/[location].astro` | Horizontal overflow (`scrollW=387px`) at 320–375px on Rajahmundry routes | Added `break-words`, responsive font sizes, responsive CTA button text, and container `overflow-hidden` | **FIXED AND VERIFIED** |
| **MOB-02** | `[city].astro`, `locations/[location].astro` | Missing mobile navigation menu toggle on city templates | Implemented accessible mobile drawer navigation with hamburger toggle | **FIXED AND VERIFIED** |
| **MOB-04** | `src/pages/contact.astro` | Horizontal overflow (`scrollW=783px`) at 768px tablet width | Replaced `sm:break-normal` with responsive `break-all` on email link | **FIXED AND VERIFIED** |
| **MOB-05** | `DViewWebsite.tsx`, `Navbar.tsx` | Brand header text overlap and multiple H1 ambiguity | Standardized single visible H1 structure with `sr-only xl:not-sr-only` | **FIXED AND VERIFIED** |
| **UX-01** | `HorizontalProblemSlider.tsx` | 1000ms carousel advance too rapid; lacks pause/keyboard controls | Changed interval to 4500ms; added pause on focus/hover/offscreen; added Prev/Next buttons; added reduced-motion check | **FIXED AND VERIFIED** |
| **A11Y-01** | `DViewWebsite.tsx`, `SiteVisitForm.tsx` | Modals/drawers lacked Escape listeners, ARIA dialog roles, explicit form labels | Added `role="dialog"`, `aria-modal`, Escape key listeners, and explicit `htmlFor`/`id`/`autoComplete` | **FIXED AND VERIFIED** |
| **A11Y-02** | `BeforeAfterSlider.tsx` | Comparison slider not operable via keyboard | Added `role="slider"`, `tabIndex={0}`, ARIA value attributes, and Arrow key listeners | **FIXED AND VERIFIED** |
| **PERF-01** | `Layout.astro`, `[city].astro` | 1.8MB desktop hero image preloaded unconditionally on mobile devices | Added `media="(max-width: 768px)"` support and matched city-specific hero posters | **FIXED AND VERIFIED** |
| **PERF-02** | `DViewWebsite.tsx`, `projects/index.astro` | Missing `width`/`height` dimensions causing layout recalculation risk | Added explicit `width="160" height="40"` to logos and dimensions across cards | **FIXED AND VERIFIED** |

---

## 8. Preserved Architectural Invariants

- **Step 01 & 02:** All 41 routes, anchors (`#book-visit`, `#problem-solutions`, `#corridors`), and deep links (`?city=`, `?reason=`, `?corridor=`) remain fully functional.
- **Step 03:** Client-side synthetic QR generation, affirmative consent checkboxes, WhatsApp draft confirmation flows, and zero external tracking remain intact.
- **Step 04:** Canonical tags (22 canonical routes, 19 canonicalized aliases), page titles, meta descriptions, FAQ schema alignment, and single H1 structures are strictly preserved.
- **Brand Identity:** The logo, color palette, video background, and `.dview-intro` animation remain fully active and accessible.
