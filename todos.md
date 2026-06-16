# BCA Sem 5 Study Hub — Improvement TODOs

Structured checklist organized by implementation phase. Each phase builds on the previous one.

---

## Phase 1 — Monochromatic Theme Redesign (Foundation)

> Must be done first. All other changes depend on the new design tokens.

- [ ] **1.1** Update CSS custom properties in `:root` to monochromatic palette (`#0A0A0A`, `#1A1A1A`, `#262626`, white)
- [ ] **1.2** Update `:root[data-theme="light"]` tokens to monochromatic light palette
- [ ] **1.3** Remove gradient `background-image` from `body` (both dark and light themes)
- [ ] **1.4** Remove `backdrop-filter: blur()` from all components (cards, nav, bottom bar)
- [ ] **1.5** Reduce all `border-radius` values to `0` or `2px` (brutalist aesthetic)
- [ ] **1.6** Replace gradient text effects (`.hero-title`, `.logo-text`, `.quiz-score-num`) with solid colors
- [ ] **1.7** Remove `translateY(-4px)` card hover effect — replace with `border-color` change
- [ ] **1.8** Update subject accent colors (`--accent-se`, `--accent-daa`, etc.) to monochromatic greys
- [ ] **1.9** Update `.logo-icon` gradient to flat monochromatic style
- [ ] **1.10** Update `.bottom-nav` background to match new theme
- [ ] **1.11** Update `.mobile-header` background and styling
- [ ] **1.12** Update `.sidebar-link.active` from violet glow to monochromatic highlight
- [ ] **1.13** Update `.btn-primary` from gradient to flat white-on-black style
- [ ] **1.14** Update all `box-shadow` values — remove colored glows, use subtle dark shadows only
- [ ] **1.15** Update `::selection` color from violet to white/grey
- [ ] **1.16** Update `data/subjects.json` — change `accentColor` values to monochromatic greys
- [ ] **1.17** Verify all pages render correctly with the new theme

---

## Phase 2 — Surgical Fixes (Quick Wins)

### 2A — Remove Scroll Progress Bar
- [ ] **2A.1** Remove scroll progress bar HTML from `index.html` (lines 37-40)
- [ ] **2A.2** Remove `.scroll-progress-container` and `.scroll-progress-bar` CSS rules
- [ ] **2A.3** Remove `handleScroll()` function from `app.js`
- [ ] **2A.4** Remove `window.addEventListener('scroll', handleScroll)` binding from `app.js`
- [ ] **2A.5** Remove `scrollProgress` width reset in `router()` function

### 2B — Fix Favicon
- [ ] **2B.1** Replace `<link rel="icon">` in `index.html` with inline SVG "S5" favicon
- [ ] **2B.2** Optionally delete old `favicon.ico` file
- [ ] **2B.3** Update sidebar logo text from "B" → "S5" and "BCA Sem 5 Hub" → "Study Hub"
- [ ] **2B.4** Update mobile header title text to match
- [ ] **2B.5** Update `.logo-icon` CSS to monochromatic design

### 2C — Fix Subject Click → Module Open
- [ ] **2C.1** In `renderSubjectLanding()`, make entire `.module-card` div clickable (not just header row)
- [ ] **2C.2** Add `cursor: pointer` to `.module-card` CSS
- [ ] **2C.3** Add hover effect: `border-color` change and `→` arrow indicator
- [ ] **2C.4** Test navigation from subject landing → each module for all 4 subjects

---

## Phase 3 — Major Feature Additions

### 3A — Dashboard Graffiti Art Enhancement
- [ ] **3A.1** Create `generateGraffitiSVG()` function in `app.js`
  - [ ] Generate random splatter dots in monochromatic shades
  - [ ] Generate abstract geometric lines and shapes
  - [ ] Include text fragments ("CODE", "STUDY", "BCA", "SEM5")
  - [ ] Make art randomize on each page load
- [ ] **3A.2** Redesign hero section HTML with `.dashboard-hero` container
- [ ] **3A.3** Add `.hero-tag` monospaced label ("SEMESTER V · 2024")
- [ ] **3A.4** Style graffiti canvas as subtle background overlay (opacity 0.06-0.08)
- [ ] **3A.5** Test performance — ensure < 50ms render time
- [ ] **3A.6** Verify graffiti renders correctly in both themes

### 3B — Reader Customization Sidebar
- [ ] **3B.1** Add Google Font import for Merriweather in `index.html`
- [ ] **3B.2** Add reader preferences HTML section to sidebar in `index.html`
  - [ ] Background color swatches (4 options)
  - [ ] Font family selector buttons (4 options)
  - [ ] Font size selector buttons (4 options)
- [ ] **3B.3** Style reader preference controls in `style.css`
  - [ ] `.reader-settings` container
  - [ ] `.swatch` color buttons with active states
  - [ ] `.font-opt` font buttons with active states
  - [ ] `.size-opt` size buttons with active states
- [ ] **3B.4** Add reader preference CSS override classes
  - [ ] `body.reader-bg-warm`, `.reader-bg-cool`, `.reader-bg-paper`
  - [ ] `body.reader-font-georgia`, `.reader-font-merriweather`, `.reader-font-mono`
  - [ ] `body.reader-size-sm`, `.reader-size-lg`, `.reader-size-xl`
- [ ] **3B.5** Add JavaScript logic in `app.js` for reader preferences
  - [ ] Event listeners for swatch/font/size button clicks
  - [ ] Apply CSS classes to `<body>` based on selection
  - [ ] Save selections to `localStorage`
  - [ ] Restore selections on page load
- [ ] **3B.6** Test all 4×4×4 = 64 combinations work correctly
- [ ] **3B.7** Ensure reader settings persist across page refreshes

### 3C — Mobile Home Page Redesign
- [ ] **3C.1** Add `.desktop-only` and `.mobile-only` utility classes to CSS
- [ ] **3C.2** Wrap credit table in `.desktop-only` container in `renderDashboard()`
- [ ] **3C.3** Create mobile compact summary card (subjects count, credits, completion %)
- [ ] **3C.4** Adjust hero section sizing for mobile (smaller font, full-width CTA)
- [ ] **3C.5** Increase subject card spacing and touch targets on mobile
- [ ] **3C.6** Fix bottom nav padding to prevent content overlap
- [ ] **3C.7** Test on 375px (iPhone SE), 414px (iPhone 14), 390px (iPhone 15) viewports

---

## Phase 4 — UX Polish & Expert Recommendations

### 4A — Remove Floating Theme Toggle
- [ ] **4A.1** Remove `#themeToggleBtn` element from `index.html`
- [ ] **4A.2** Remove `.theme-toggle-btn` CSS rules
- [ ] **4A.3** Add theme toggle switch to the reader preferences sidebar section
- [ ] **4A.4** Remove related JS event listener, keep `setTheme()` and `toggleTheme()` functions

### 4B — Typography Improvements
- [ ] **4B.1** Increase body `line-height` from `1.6` to `1.75`
- [ ] **4B.2** Set `.module-content p` line-height to `1.8`
- [ ] **4B.3** Set `.reading-column` max-width to `720px`
- [ ] **4B.4** Increase paragraph bottom margin to `1.25em`
- [ ] **4B.5** Add `font-feature-settings` and `text-rendering: optimizeLegibility`
- [ ] **4B.6** Style inline `<code>` elements (not inside `<pre>`)

### 4C — Smooth Page Transitions
- [ ] **4C.1** Implement fade-out → render → fade-in transition in `router()`
- [ ] **4C.2** Add CSS transition on `#app` for `opacity` and `transform`
- [ ] **4C.3** Test transition doesn't cause flash-of-unstyled-content

### 4D — Keyboard Navigation
- [ ] **4D.1** Add `keydown` event listener in `app.js`
- [ ] **4D.2** Implement `←`/`→` for module navigation
- [ ] **4D.3** Implement `Esc` for back navigation
- [ ] **4D.4** Implement `1-5` for module quick-jump from subject page
- [ ] **4D.5** Only activate shortcuts when not in an input/textarea

### 4E — Code Block Styling
- [ ] **4E.1** Update `.code-block` background to `#111111`
- [ ] **4E.2** Set `border-radius: 0` on code blocks
- [ ] **4E.3** Add inline `<code>` styling with border and background
- [ ] **4E.4** Update code text color to match monochromatic theme

### 4F — Add Footer
- [ ] **4F.1** Add footer HTML to `index.html`
- [ ] **4F.2** Style footer in `style.css` with monochromatic design
- [ ] **4F.3** Ensure footer doesn't overlap bottom nav on mobile

### 4G — Subjects List Page Improvement
- [ ] **4G.1** Redesign `renderSubjectsList()` with grid layout
- [ ] **4G.2** Add prominent subject numbering (01, 02, 03, 04)
- [ ] **4G.3** Add "Resume where you left off" link per subject
- [ ] **4G.4** Improve progress indicator visibility

---

## Phase 5 — Content Depth Enhancement

> This phase can be done incrementally, module by module, and in parallel with other phases.

### 5A — Content Structure Improvements
- [ ] **5A.1** Add "Key Concept" summary box renderer to `renderer.js`
- [ ] **5A.2** Add "Common Mistakes" callout box renderer to `renderer.js`
- [ ] **5A.3** Style new content components in `style.css`

### 5B — Software Engineering Modules
- [ ] **5B.1** Enrich `data/se/module1.json` — add real-world examples, more detail per topic
- [ ] **5B.2** Enrich `data/se/module2.json` — add SDLC model comparison table
- [ ] **5B.3** Enrich `data/se/module3.json` — add SRS template examples
- [ ] **5B.4** Enrich `data/se/module4.json` — add UML diagram descriptions
- [ ] **5B.5** Enrich `data/se/module5.json` — add testing strategy examples

### 5C — Design & Analysis of Algorithms Modules
- [ ] **5C.1** Enrich `data/daa/module1.json` — add complexity comparison tables
- [ ] **5C.2** Enrich `data/daa/module2.json` — add sorting algorithm pseudocode & step-by-step
- [ ] **5C.3** Enrich `data/daa/module3.json` — add greedy/DP worked examples
- [ ] **5C.4** Enrich `data/daa/module4.json` — add graph algorithm walkthroughs
- [ ] **5C.5** Enrich `data/daa/module5.json` — add P vs NP explanations

### 5D — Full-stack Development Modules
- [ ] **5D.1** Enrich `data/fsd/module1.json` — add React code examples
- [ ] **5D.2** Enrich `data/fsd/module2.json` — add routing code samples
- [ ] **5D.3** Enrich `data/fsd/module3.json` — add form handling examples
- [ ] **5D.4** Enrich `data/fsd/module4.json` — add API fetch examples
- [ ] **5D.5** Enrich `data/fsd/module5.json` — add Angular directive examples

### 5E — Machine Learning Modules
- [ ] **5E.1** Enrich `data/ml/module1.json` — add ML pipeline diagrams
- [ ] **5E.2** Enrich `data/ml/module2.json` — add supervised vs unsupervised comparison
- [ ] **5E.3** Enrich `data/ml/module3.json` — add training workflow examples
- [ ] **5E.4** Enrich `data/ml/module4.json` — add business use-case studies
- [ ] **5E.5** Enrich `data/ml/module5.json` — add ensemble method comparison tables

---

## Summary

| Phase | Focus | Items | Priority |
|-------|-------|-------|----------|
| **Phase 1** | Monochromatic Theme Redesign | 17 | 🔴 Critical (do first) |
| **Phase 2** | Surgical Fixes (scroll bar, favicon, subject click) | 14 | 🔴 Critical |
| **Phase 3** | Major Features (graffiti art, reader settings, mobile) | 21 | 🟡 High |
| **Phase 4** | UX Polish (typography, transitions, keyboard nav, footer) | 20 | 🟢 Medium |
| **Phase 5** | Content Depth Enhancement | 23 | 🔵 Ongoing |
| **Total** | | **95 items** | |
