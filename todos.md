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

### 2D — Remove Course Outcomes & Textbooks from Subject Landing
- [ ] **2D.1** Remove the `grid-2-col` section from `renderSubjectLanding()` (Course Outcomes + Textbooks cards)
- [ ] **2D.2** Remove `outcomesHTML` and `booksHTML` variable construction code
- [ ] **2D.3** Keep the data in `subjects.json` (don't delete from JSON, just don't render it)
- [ ] **2D.4** Verify subject landing pages look clean without bottom sections

---

## Phase 3 — Major Feature Additions

### 3A — Dashboard Graffiti Art Enhancement (SVG)
- [ ] **3A.1** Create `generateGraffitiSVG()` function in `app.js`
  - [ ] Generate random splatter dots in monochromatic shades
  - [ ] Generate abstract geometric lines and shapes
  - [ ] Include text fragments ("CODE", "STUDY", "BCA", "SEM5")
  - [ ] Make art randomize on each page load
- [ ] **3A.2** Redesign hero section HTML with `.dashboard-hero` container
- [ ] **3A.3** Add `.hero-tag` monospaced label ("SEMESTER V · 2024")
- [ ] **3A.4** Style graffiti canvas as subtle SVG background overlay (opacity 0.06-0.08)
- [ ] **3A.5** Test performance — ensure < 50ms render time
- [ ] **3A.6** Verify graffiti renders correctly in both themes

### 3B — Reader Customization Sidebar (Kindle-Style)
- [ ] **3B.1** Add Google Font import for Merriweather in `index.html`
- [ ] **3B.2** Add reader preferences HTML section to sidebar in `index.html`
  - [ ] Background color swatches — 4 Kindle-style options (Default, Sepia, Mint, Sunset)
  - [ ] Font family selector buttons (Inter, Georgia, Merriweather, Mono)
  - [ ] Font size selector buttons (Small, Medium, Large, XL)
- [ ] **3B.3** Style reader preference controls in `style.css`
  - [ ] `.reader-settings` container
  - [ ] `.swatch` color buttons with visual preview of each tint
  - [ ] `.font-opt` font buttons with active states
  - [ ] `.size-opt` size buttons with graduated sizing
- [ ] **3B.4** Add Kindle-style reader CSS override classes
  - [ ] `body.reader-bg-sepia` — warm brown tint (dark: `#1A1611`, light: `#F5EDDC`)
  - [ ] `body.reader-bg-mint` — green tint (dark: `#0F1A14`, light: `#E8F5EC`)
  - [ ] `body.reader-bg-sunset` — peach tint (dark: `#1A1210`, light: `#FFF0E8`)
  - [ ] Override both `--bg-primary` and `--text-primary` for readable contrast
  - [ ] Font override classes (`.reader-font-georgia`, `.reader-font-merriweather`, `.reader-font-mono`)
  - [ ] Size override classes (`.reader-size-sm`, `.reader-size-lg`, `.reader-size-xl`)
- [ ] **3B.5** Add JavaScript logic in `app.js` for reader preferences
  - [ ] Event listeners for swatch/font/size button clicks
  - [ ] Apply CSS classes to `<body>` based on selection
  - [ ] Save selections to `localStorage`
  - [ ] Restore selections on page load
- [ ] **3B.6** Test all combinations work correctly with both dark/light base themes
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

## Phase 5 — Content Depth Enhancement + Resource Links

> Content depth is being addressed NOW alongside the UI work.

### 5A — Add Resource Links Infrastructure
- [ ] **5A.1** Add `resources` array to each subject in `data/subjects.json`
- [ ] **5A.2** Create "Learning Resources" section in `renderSubjectLanding()` (replaces removed Course Outcomes/Textbooks)
- [ ] **5A.3** Style resource link cards with type badges (Video / Article / Docs / Book)
- [ ] **5A.4** Each link opens in new tab (`target="_blank"`)

**Resource links to add:**

**Software Engineering:**
- [ ] **5A.5** GeeksforGeeks: Software Engineering — https://www.geeksforgeeks.org/software-engineering/
- [ ] **5A.6** JavaTPoint: SE Tutorial — https://www.javatpoint.com/software-engineering
- [ ] **5A.7** Tutorialspoint: SE — https://www.tutorialspoint.com/software_engineering/
- [ ] **5A.8** NPTEL: Software Engineering (YouTube/NPTEL)

**Design & Analysis of Algorithms:**
- [ ] **5A.9** GeeksforGeeks: Algorithms — https://www.geeksforgeeks.org/fundamentals-of-algorithms/
- [ ] **5A.10** Visualgo: Algorithm Visualizations — https://visualgo.net/
- [ ] **5A.11** MIT OCW: Intro to Algorithms — https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
- [ ] **5A.12** Abdul Bari Algorithms (YouTube) — https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O

**Full-stack Development:**
- [ ] **5A.13** React Official Docs — https://react.dev/
- [ ] **5A.14** W3Schools React — https://www.w3schools.com/react/
- [ ] **5A.15** AngularJS Developer Guide — https://docs.angularjs.org/guide
- [ ] **5A.16** freeCodeCamp: React — https://www.freecodecamp.org/learn/front-end-development-libraries/

**Machine Learning:**
- [ ] **5A.17** GeeksforGeeks: ML — https://www.geeksforgeeks.org/machine-learning/
- [ ] **5A.18** Andrew Ng's ML Course — https://www.coursera.org/learn/machine-learning
- [ ] **5A.19** Scikit-learn Docs — https://scikit-learn.org/stable/
- [ ] **5A.20** StatQuest (YouTube) — https://www.youtube.com/c/joshstarmer

### 5B — Content Structure Improvements
- [ ] **5B.1** Add "Key Concept" summary box renderer to `renderer.js`
- [ ] **5B.2** Add "Common Mistakes" callout box renderer to `renderer.js`
- [ ] **5B.3** Style new content components in `style.css`

### 5C — Software Engineering Content Enrichment
- [ ] **5C.1** Enrich `data/se/module1.json` — expand definitions, add real-world software project examples
- [ ] **5C.2** Enrich `data/se/module2.json` — add SDLC model comparison table (Waterfall vs Agile vs Spiral vs V-Model)
- [ ] **5C.3** Enrich `data/se/module3.json` — add SRS template walkthrough, requirement elicitation techniques
- [ ] **5C.4** Enrich `data/se/module4.json` — add UML diagram examples, design pattern descriptions
- [ ] **5C.5** Enrich `data/se/module5.json` — add testing strategy matrix, COCOMO estimation walkthrough

### 5D — Design & Analysis of Algorithms Content Enrichment
- [ ] **5D.1** Enrich `data/daa/module1.json` — add Big-O/Omega/Theta comparison table, recurrence examples
- [ ] **5D.2** Enrich `data/daa/module2.json` — add sorting algorithm step-by-step traces with pseudocode
- [ ] **5D.3** Enrich `data/daa/module3.json` — add greedy vs DP worked examples (knapsack, coin change)
- [ ] **5D.4** Enrich `data/daa/module4.json` — add Dijkstra/Bellman-Ford/Prim/Kruskal walkthroughs
- [ ] **5D.5** Enrich `data/daa/module5.json` — add P vs NP explanation, NP-complete problem examples

### 5E — Full-stack Development Content Enrichment
- [ ] **5E.1** Enrich `data/fsd/module1.json` — add JSX code examples, component lifecycle diagram
- [ ] **5E.2** Enrich `data/fsd/module2.json` — add React Router code samples, CSS-in-JS comparison
- [ ] **5E.3** Enrich `data/fsd/module3.json` — add controlled vs uncontrolled form examples
- [ ] **5E.4** Enrich `data/fsd/module4.json` — add fetch/axios API examples, async/await patterns
- [ ] **5E.5** Enrich `data/fsd/module5.json` — add Angular directive code, service injection examples

### 5F — Machine Learning Content Enrichment
- [ ] **5F.1** Enrich `data/ml/module1.json` — add ML pipeline diagram, AI vs ML vs DL comparison
- [ ] **5F.2** Enrich `data/ml/module2.json` — add supervised vs unsupervised vs reinforcement comparison table
- [ ] **5F.3** Enrich `data/ml/module3.json` — add gradient descent walkthrough, bias-variance tradeoff
- [ ] **5F.4** Enrich `data/ml/module4.json` — add industry use-case studies (healthcare, finance, retail)
- [ ] **5F.5** Enrich `data/ml/module5.json` — add Bagging vs Boosting comparison, Random Forest walkthrough

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
