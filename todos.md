# BCA Sem 5 Study Hub — Improvement TODOs

Structured checklist organized by implementation phase. Each phase builds on the previous one.

---

## Phase 1 — Monochromatic Theme Redesign (Foundation)

> Must be done first. All other changes depend on the new design tokens.

- [x] **1.1** Update CSS custom properties in `:root` to monochromatic palette (`#0A0A0A`, `#1A1A1A`, `#262626`, white)
- [x] **1.2** Update `:root[data-theme="light"]` tokens to monochromatic light palette
- [x] **1.3** Remove gradient `background-image` from `body` (both dark and light themes)
- [x] **1.4** Remove `backdrop-filter: blur()` from all components (cards, nav, bottom bar)
- [x] **1.5** Reduce all `border-radius` values to `0` or `2px` (brutalist aesthetic)
- [x] **1.6** Replace gradient text effects (`.hero-title`, `.logo-text`, `.quiz-score-num`) with solid colors
- [x] **1.7** Remove `translateY(-4px)` card hover effect — replace with `border-color` change
- [x] **1.8** Update subject accent colors (`--accent-se`, `--accent-daa`, etc.) to monochromatic greys
- [x] **1.9** Update `.logo-icon` gradient to flat monochromatic style
- [x] **1.10** Update `.bottom-nav` background to match new theme
- [x] **1.11** Update `.mobile-header` background and styling
- [x] **1.12** Update `.sidebar-link.active` from violet glow to monochromatic highlight
- [x] **1.13** Update `.btn-primary` from gradient to flat white-on-black style
- [x] **1.14** Update all `box-shadow` values — remove colored glows, use subtle dark shadows only
- [x] **1.15** Update `::selection` color from violet to white/grey
- [x] **1.16** Update `data/subjects.json` — change `accentColor` values to monochromatic greys
- [x] **1.17** Verify all pages render correctly with the new theme

---

## Phase 2 — Surgical Fixes (Quick Wins)

### 2A — Remove Scroll Progress Bar
- [x] **2A.1** Remove scroll progress bar HTML from `index.html` (lines 37-40)
- [x] **2A.2** Remove `.scroll-progress-container` and `.scroll-progress-bar` CSS rules
- [x] **2A.3** Remove `handleScroll()` function from `app.js`
- [x] **2A.4** Remove `window.addEventListener('scroll', handleScroll)` binding from `app.js`
- [x] **2A.5** Remove `scrollProgress` width reset in `router()` function

### 2B — Fix Favicon
- [x] **2B.1** Replace `<link rel="icon">` in `index.html` with inline SVG "S5" favicon
- [x] **2B.2** Optionally delete old `favicon.ico` file
- [x] **2B.3** Update sidebar logo text from "B" → "S5" and "BCA Sem 5 Hub" → "Study Hub"
- [x] **2B.4** Update mobile header title text to match
- [x] **2B.5** Update `.logo-icon` CSS to monochromatic design

### 2C — Fix Subject Click → Module Open
- [x] **2C.1** In `renderSubjectLanding()`, make entire `.module-card` div clickable (not just header row)
- [x] **2C.2** Add `cursor: pointer` to `.module-card` CSS
- [x] **2C.3** Add hover effect: `border-color` change and `→` arrow indicator
- [x] **2C.4** Test navigation from subject landing → each module for all 4 subjects

### 2D — Remove Course Outcomes & Textbooks from Subject Landing
- [x] **2D.1** Remove the `grid-2-col` section from `renderSubjectLanding()` (Course Outcomes + Textbooks cards)
- [x] **2D.2** Remove `outcomesHTML` and `booksHTML` variable construction code
- [x] **2D.3** Keep the data in `subjects.json` (don't delete from JSON, just don't render it)
- [x] **2D.4** Verify subject landing pages look clean without bottom sections

---

## Phase 3 — Major Feature Additions

### 3A — Dashboard Graffiti Art Enhancement (SVG)
- [x] **3A.1** Create `generateGraffitiSVG()` function in `app.js`
  - [x] Generate random splatter dots in monochromatic shades
  - [x] Generate abstract geometric lines and shapes
  - [x] Include text fragments ("CODE", "STUDY", "BCA", "SEM5")
  - [x] Make art randomize on each page load
- [x] **3A.2** Redesign hero section HTML with `.dashboard-hero` container
- [x] **3A.3** Add `.hero-tag` monospaced label ("SEMESTER V · 2024")
- [x] **3A.4** Style graffiti canvas as subtle SVG background overlay (opacity 0.06-0.08)
- [x] **3A.5** Test performance — ensure < 50ms render time
- [x] **3A.6** Verify graffiti renders correctly in both themes

### 3B — Reader Customization Sidebar (Kindle-Style)
- [x] **3B.1** Add Google Font import for Merriweather in `index.html`
- [x] **3B.2** Add reader preferences HTML section to sidebar in `index.html`
  - [x] Background color swatches — 4 Kindle-style options (Default, Sepia, Mint, Sunset)
  - [x] Font family selector buttons (Inter, Georgia, Merriweather, Mono)
  - [x] Font size selector buttons (Small, Medium, Large, XL)
- [x] **3B.3** Style reader preference controls in `style.css`
  - [x] `.reader-settings` container
  - [x] `.swatch` color buttons with visual preview of each tint
  - [x] `.font-opt` font buttons with active states
  - [x] `.size-opt` size buttons with graduated sizing
- [x] **3B.4** Add Kindle-style reader CSS override classes
  - [x] `body.reader-bg-sepia` — warm brown tint (dark: `#1A1611`, light: `#F5EDDC`)
  - [x] `body.reader-bg-mint` — green tint (dark: `#0F1A14`, light: `#E8F5EC`)
  - [x] `body.reader-bg-sunset` — peach tint (dark: `#1A1210`, light: `#FFF0E8`)
  - [x] Override both `--bg-primary` and `--text-primary` for readable contrast
  - [x] Font override classes (`.reader-font-georgia`, `.reader-font-merriweather`, `.reader-font-mono`)
  - [x] Size override classes (`.reader-size-sm`, `.reader-size-lg`, `.reader-size-xl`)
- [x] **3B.5** Add JavaScript logic in `app.js` for reader preferences
  - [x] Event listeners for swatch/font/size button clicks
  - [x] Apply CSS classes to `<body>` based on selection
  - [x] Save selections to `localStorage`
  - [x] Restore selections on page load
- [x] **3B.6** Test all combinations work correctly with both dark/light base themes
- [x] **3B.7** Ensure reader settings persist across page refreshes

### 3C — Mobile Home Page Redesign
- [x] **3C.1** Add `.desktop-only` and `.mobile-only` utility classes to CSS
- [x] **3C.2** Wrap credit table in `.desktop-only` container in `renderDashboard()`
- [x] **3C.3** Create mobile compact summary card (subjects count, credits, completion %)
- [x] **3C.4** Adjust hero section sizing for mobile (smaller font, full-width CTA)
- [x] **3C.5** Increase subject card spacing and touch targets on mobile
- [x] **3C.6** Fix bottom nav padding to prevent content overlap
- [x] **3C.7** Test on 375px (iPhone SE), 414px (iPhone 14), 390px (iPhone 15) viewports

---

## Phase 4 — UX Polish & Expert Recommendations

### 4A — Remove Floating Theme Toggle
- [x] **4A.1** Remove `#themeToggleBtn` element from `index.html`
- [x] **4A.2** Remove `.theme-toggle-btn` CSS rules
- [x] **4A.3** Add theme toggle switch to the reader preferences sidebar section
- [x] **4A.4** Remove related JS event listener, keep `setTheme()` and `toggleTheme()` functions

### 4B — Typography Improvements
- [x] **4B.1** Increase body `line-height` from `1.6` to `1.75`
- [x] **4B.2** Set `.module-content p` line-height to `1.8`
- [x] **4B.3** Set `.reading-column` max-width to `720px`
- [x] **4B.4** Increase paragraph bottom margin to `1.25em`
- [x] **4B.5** Add `font-feature-settings` and `text-rendering: optimizeLegibility`
- [x] **4B.6** Style inline `<code>` elements (not inside `<pre>`)

### 4C — Smooth Page Transitions
- [x] **4C.1** Implement fade-out → render → fade-in transition in `router()`
- [x] **4C.2** Add CSS transition on `#app` for `opacity` and `transform`
- [x] **4C.3** Test transition doesn't cause flash-of-unstyled-content

### 4D — Keyboard Navigation
- [x] **4D.1** Add `keydown` event listener in `app.js`
- [x] **4D.2** Implement `←`/`→` for module navigation
- [x] **4D.3** Implement `Esc` for back navigation
- [x] **4D.4** Implement `1-5` for module quick-jump from subject page
- [x] **4D.5** Only activate shortcuts when not in an input/textarea

### 4E — Code Block Styling
- [x] **4E.1** Update `.code-block` background to `#111111`
- [x] **4E.2** Set `border-radius: 0` on code blocks
- [x] **4E.3** Add inline `<code>` styling with border and background
- [x] **4E.4** Update code text color to match monochromatic theme

### 4F — Add Footer
- [x] **4F.1** Add footer HTML to `index.html`
- [x] **4F.2** Style footer in `style.css` with monochromatic design
- [x] **4F.3** Ensure footer doesn't overlap bottom nav on mobile

### 4G — Subjects List Page Improvement
- [x] **4G.1** Redesign `renderSubjectsList()` with grid layout
- [x] **4G.2** Add prominent subject numbering (01, 02, 03, 04)
- [x] **4G.3** Add "Resume where you left off" link per subject
- [x] **4G.4** Improve progress indicator visibility

---

## Phase 5 — Content Depth Enhancement + Resource Links

> Content depth is being addressed NOW alongside the UI work.

### 5A — Add Resource Links Infrastructure
- [x] **5A.1** Add `resources` array to each subject in `data/subjects.json`
- [x] **5A.2** Create "Learning Resources" section in `renderSubjectLanding()` (replaces removed Course Outcomes/Textbooks)
- [x] **5A.3** Style resource link cards with type badges (Video / Article / Docs / Book)
- [x] **5A.4** Each link opens in new tab (`target="_blank"`)

**Resource links to add:**

**Software Engineering:**
- [x] **5A.5** GeeksforGeeks: Software Engineering — https://www.geeksforgeeks.org/software-engineering/
- [x] **5A.6** JavaTPoint: SE Tutorial — https://www.javatpoint.com/software-engineering
- [x] **5A.7** Tutorialspoint: SE — https://www.tutorialspoint.com/software_engineering/
- [x] **5A.8** NPTEL: Software Engineering (YouTube/NPTEL)

**Design & Analysis of Algorithms:**
- [x] **5A.9** GeeksforGeeks: Algorithms — https://www.geeksforgeeks.org/fundamentals-of-algorithms/
- [x] **5A.10** Visualgo: Algorithm Visualizations — https://visualgo.net/
- [x] **5A.11** MIT OCW: Intro to Algorithms — https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
- [x] **5A.12** Abdul Bari Algorithms (YouTube) — https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O

**Full-stack Development:**
- [x] **5A.13** React Official Docs — https://react.dev/
- [x] **5A.14** W3Schools React — https://www.w3schools.com/react/
- [x] **5A.15** AngularJS Developer Guide — https://docs.angularjs.org/guide
- [x] **5A.16** freeCodeCamp: React — https://www.freecodecamp.org/learn/front-end-development-libraries/

**Machine Learning:**
- [x] **5A.17** GeeksforGeeks: ML — https://www.geeksforgeeks.org/machine-learning/
- [x] **5A.18** Andrew Ng's ML Course — https://www.coursera.org/learn/machine-learning
- [x] **5A.19** Scikit-learn Docs — https://scikit-learn.org/stable/
- [x] **5A.20** StatQuest (YouTube) — https://www.youtube.com/c/joshstarmer

### 5B — Content Structure Improvements
- [x] **5B.1** Add "Key Concept" summary box renderer to `renderer.js`
- [x] **5B.2** Add "Common Mistakes" callout box renderer to `renderer.js`
- [x] **5B.3** Style new content components in `style.css`

### 5C — Software Engineering Content Enrichment
- [x] **5C.1** Enrich `data/se/module1.json` — expand definitions, add real-world software project examples
- [x] **5C.2** Enrich `data/se/module2.json` — add SDLC model comparison table (Waterfall vs Agile vs Spiral vs V-Model)
- [x] **5C.3** Enrich `data/se/module3.json` — add SRS template walkthrough, requirement elicitation techniques
- [x] **5C.4** Enrich `data/se/module4.json` — add UML diagram examples, design pattern descriptions
- [x] **5C.5** Enrich `data/se/module5.json` — add testing strategy matrix, COCOMO estimation walkthrough

### 5D — Design & Analysis of Algorithms Content Enrichment
- [x] **5D.1** Enrich `data/daa/module1.json` — add Big-O/Omega/Theta comparison table, recurrence examples
- [x] **5D.2** Enrich `data/daa/module2.json` — add sorting algorithm step-by-step traces with pseudocode
- [x] **5D.3** Enrich `data/daa/module3.json` — add greedy vs DP worked examples (knapsack, coin change)
- [x] **5D.4** Enrich `data/daa/module4.json` — add Dijkstra/Bellman-Ford/Prim/Kruskal walkthroughs
- [x] **5D.5** Enrich `data/daa/module5.json` — add P vs NP explanation, NP-complete problem examples

### 5E — Full-stack Development Content Enrichment
- [x] **5E.1** Enrich `data/fsd/module1.json` — add JSX code examples, component lifecycle diagram
- [x] **5E.2** Enrich `data/fsd/module2.json` — add React Router code samples, CSS-in-JS comparison
- [x] **5E.3** Enrich `data/fsd/module3.json` — add controlled vs uncontrolled form examples
- [x] **5E.4** Enrich `data/fsd/module4.json` — add fetch/axios API examples, async/await patterns
- [x] **5E.5** Enrich `data/fsd/module5.json` — add Angular directive code, service injection examples

### 5F — Machine Learning Content Enrichment
- [x] **5F.1** Enrich `data/ml/module1.json` — add ML pipeline diagram, AI vs ML vs DL comparison
- [x] **5F.2** Enrich `data/ml/module2.json` — add supervised vs unsupervised vs reinforcement comparison table
- [x] **5F.3** Enrich `data/ml/module3.json` — add gradient descent walkthrough, bias-variance tradeoff
- [x] **5F.4** Enrich `data/ml/module4.json` — add industry use-case studies (healthcare, finance, retail)
- [x] **5F.5** Enrich `data/ml/module5.json` — add Bagging vs Boosting comparison, Random Forest walkthrough


---

## Summary

| Phase | Focus | Items | Priority |
|-------|-------|-------|----------|
| **Phase 1** | Monochromatic Theme Redesign | 17 | 🔴 Critical (do first) |
| **Phase 2** | Surgical Fixes (scroll bar, favicon, subject click, remove CO/textbooks) | 18 | 🔴 Critical |
| **Phase 3** | Major Features (SVG graffiti, Kindle reader, mobile) | 21 | 🟡 High |
| **Phase 4** | UX Polish (typography, transitions, keyboard nav, footer) | 20 | 🟢 Medium |
| **Phase 5** | Content Depth + Resource Links | 45 | 🔴 Critical (do alongside) |
| **Total** | | **121 items** | |
