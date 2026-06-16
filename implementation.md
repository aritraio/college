# BCA Sem 5 Study Hub — Implementation Guide

---

## Overview

An interactive, mobile-first study website for BCA Semester 5 examination preparation. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step, just open `index.html` and start studying.

**University**: Brainware University
**Program**: Bachelor of Computer Applications (BCA) — Semester V (2024)
**Total Credits**: 20 | **Total Subjects**: 6 | **Theory Sections**: 4

---

## Architecture

```
Browser loads index.html
        │
        ▼
   ┌─────────┐     ┌──────────────┐
   │ app.js   │────▶│ Hash Router   │
   │ (entry)  │     │ #/ → Dashboard│
   └────┬─────┘     │ #/subject/se  │
        │           │ #/subject/    │
        │           │   se/module/1 │
        ▼           └──────────────┘
   ┌──────────┐
   │renderer.js│───▶ Fetches data/*.json
   │          │     Renders HTML content
   │          │     Triggers MathJax
   └────┬─────┘
        │
        ▼
   ┌──────────┐
   │ quiz.js  │───▶ MCQ engine
   │          │     Score tracking
   │          │     localStorage
   └──────────┘
```

### How Routing Works

The app uses **hash-based routing** so it works as a static file (no server needed).

| Hash | View |
|------|------|
| `#/` | Dashboard (credit table + subject cards) |
| `#/subject/se` | Software Engineering landing page |
| `#/subject/se/module/1` | SE Module 1 content + quiz |
| `#/subject/daa` | DAA landing page |
| `#/subject/daa/module/3` | DAA Module 3 content + quiz |
| `#/subject/fsd` | Full-stack Dev landing page |
| `#/subject/ml` | Machine Learning landing page |

When the hash changes, `app.js` intercepts it via `window.onhashchange`, determines which view to show, and calls the appropriate renderer function.

---

## Tech Stack

| Technology | Purpose | Source |
|-----------|---------|--------|
| HTML5 | Page structure, semantic elements | Native |
| CSS3 | Styling, animations, responsive layout | Native |
| JavaScript (ES6+) | Routing, rendering, interactivity | Native |
| Google Fonts | Inter (body), JetBrains Mono (code) | CDN |
| MathJax 3 | Math formula rendering (LaTeX syntax) | CDN |

**No npm. No Node. No build tools. No frameworks.** Just files.

---

## Design System: "Neon Campus"

### Theme

Dark-mode-first glassmorphic design. Every surface is a semi-transparent panel with backdrop blur, sitting on a deep-space gradient background.

### Color Tokens

```css
/* Background */
--bg-primary:    #0a0a0f;
--bg-secondary:  #12121a;
--bg-surface:    rgba(255, 255, 255, 0.04);

/* Subject Accents */
--accent-se:     #00cec9;   /* Teal — Software Engineering */
--accent-daa:    #fd79a8;   /* Pink — Design & Analysis of Algorithms */
--accent-fsd:    #fdcb6e;   /* Amber — Full-stack Development II */
--accent-ml:     #55efc4;   /* Mint — Machine Learning */

/* Primary */
--accent-primary: #6c5ce7;  /* Electric Violet */

/* Text */
--text-primary:  #e8e8f0;
--text-muted:    #8888a0;

/* Feedback */
--color-success: #00b894;
--color-error:   #ff6b6b;
```

### Typography

| Use | Font | Weight | Size |
|-----|------|--------|------|
| Page title | Inter | 700 | 2.5rem |
| Section heading | Inter | 600 | 1.75rem |
| Subheading | Inter | 600 | 1.25rem |
| Body text | Inter | 400 | 1rem (16px) |
| Small text | Inter | 400 | 0.875rem |
| Code | JetBrains Mono | 400 | 0.9rem |

### Component Library

| Component | Description |
|-----------|-------------|
| `.card` | Glassmorphic card with backdrop-blur, border, and hover lift |
| `.btn-primary` | Solid accent-colored button with hover glow |
| `.btn-ghost` | Transparent button with border, used for secondary actions |
| `.subject-card` | Card with colored left border matching subject accent |
| `.progress-bar` | Horizontal bar with gradient fill |
| `.progress-ring` | SVG circular progress indicator |
| `.quiz-option` | Selectable option card with hover/selected/correct/wrong states |
| `.callout-tip` | Interview tip box with gradient left border |
| `.code-block` | Dark code container with copy button |
| `.credit-table` | Styled table with zebra stripes and sticky header |
| `.accordion` | Collapsible section with smooth height transition |
| `.bottom-nav` | Mobile-only fixed bottom navigation bar |

### Animations

| Animation | Usage | Duration |
|-----------|-------|----------|
| `fadeSlideUp` | Page transitions, card entrances | 0.4s ease-out |
| `pulse` | Correct answer feedback | 0.3s |
| `shake` | Wrong answer feedback | 0.4s |
| `glow` | Hover effects on subject cards | 0.3s |
| `confetti` | High score celebration (>= 80%) | 2s |
| `slideInLeft` | Interview tip callout entrance | 0.5s ease-out |
| `gradientShift` | Hero background animation | 8s infinite |

---

## Responsive Breakpoints

### Phone (< 480px)
- Single column layout
- Bottom tab navigation (fixed, 4 tabs)
- Full-width cards
- Collapsible accordion for topic sections
- Stacked quiz options
- Swipe left/right to navigate modules
- Minimum tap target: 44 × 44px

### Large Phone (480px – 768px)
- Single column, wider cards
- Bottom tab navigation
- Larger font size for readability

### Tablet (768px – 1024px)
- 2-column grid for subject cards
- Slide-in sidebar navigation (hamburger toggle)
- Floating table of contents visible
- Side-by-side layout for quiz options (2 per row)

### Desktop (> 1024px)
- Persistent sidebar navigation
- 3-column subject cards on dashboard
- Content area + floating TOC sidebar
- Wider reading area (max-width: 800px for content)
- Hover effects fully active

---

## Data Format

### subjects.json

Contains all subject metadata, credit information, and module titles.

```json
{
  "semester": "BCA Semester V — 2024",
  "university": "Brainware University",
  "totalCredits": 20,
  "subjects": [
    {
      "id": "se",
      "code": "BCA50112",
      "name": "Software Engineering",
      "credits": 4,
      "hours": { "L": 3, "T": 1, "P": 0 },
      "evaluation": { "CIA": 40, "ESE": 60, "total": 100 },
      "type": "Major",
      "accentColor": "#00cec9",
      "modules": [
        { "id": 1, "title": "Introduction to Software Engineering", "hours": "3H" },
        ...
      ],
      "courseObjective": "...",
      "courseOutcomes": ["CO1: ...", "CO2: ...", ...],
      "textbooks": ["..."],
      "references": ["..."]
    }
  ]
}
```

### Module JSON (e.g., data/se/module1.json)

Each module file contains all content, practice questions, and MCQs.

```json
{
  "module": 1,
  "title": "Introduction to Software Engineering",
  "hours": "3H",
  "topics": [
    {
      "title": "Definition of Software",
      "content": "<p>Software is a collection of programs...</p>",
      "interviewTip": "In interviews, emphasize that software is not just code — it includes documentation, configuration data, and user manuals."
    },
    {
      "title": "Types of Software",
      "content": "<p>Software is broadly classified into...</p><ul><li>System Software</li><li>Application Software</li>...</ul>"
    }
  ],
  "practiceQuestions": [
    {
      "question": "Differentiate between system software and application software with examples.",
      "answer": "System software manages hardware resources..."
    }
  ],
  "mcqs": [
    {
      "question": "Which of the following is NOT a characteristic of software?",
      "options": [
        "Software does not wear out",
        "Software is manufactured",
        "Software is engineered",
        "Software is custom-built"
      ],
      "correct": 1,
      "explanation": "Software is engineered, not manufactured. Manufacturing implies physical assembly, while software is developed through logical design."
    }
  ]
}
```

---

## localStorage Schema

All user progress is saved to the browser's localStorage.

| Key | Type | Description |
|-----|------|-------------|
| `theme` | `"dark"` or `"light"` | Current theme preference |
| `progress_se` | `{ "1": true, "2": false, ... }` | Module completion for SE |
| `progress_daa` | `{ "1": true, ... }` | Module completion for DAA |
| `progress_fsd` | `{ "1": false, ... }` | Module completion for FSD |
| `progress_ml` | `{ "1": false, ... }` | Module completion for ML |
| `quiz_se_1` | `{ "score": 8, "total": 10, "date": "..." }` | Quiz result for SE Module 1 |
| `quiz_daa_3` | `{ "score": 7, "total": 10, "date": "..." }` | Quiz result for DAA Module 3 |

---

## MathJax Usage

MathJax 3 is loaded from CDN for rendering mathematical formulas in DAA and ML modules.

### Inline Math
Use `\\( ... \\)` for inline formulas in JSON content:
```
"content": "The time complexity is \\( O(n \\log n) \\) in the average case."
```

### Block Math
Use `\\[ ... \\]` for display formulas:
```
"content": "Master's Theorem: \\[ T(n) = aT\\left(\\frac{n}{b}\\right) + f(n) \\]"
```

After injecting module content into the DOM, `renderer.js` calls:
```javascript
MathJax.typesetPromise();
```

---

## Key Features Summary

| Feature | Description |
|---------|-------------|
| Dashboard | Credit table, subject cards with progress rings, overall progress |
| Subject Pages | Course overview, 5 module cards, textbooks/references |
| Module Content | Detailed topic explanations, math formulas, code snippets |
| Interview Tips | Highlighted callout boxes with interview-relevant insights |
| MCQ Quizzes | 10 questions per module, instant feedback, explanations, scoring |
| Practice Questions | Short-answer questions with expandable model answers |
| Progress Tracking | localStorage-based, module completion + quiz scores |
| Theme Toggle | Dark/light mode with smooth transition |
| Responsive | Mobile-first, works on phones, tablets, and desktops |
| Swipe Navigation | Touch gestures to navigate between modules on mobile |
| Scroll Progress | Visual indicator of reading progress in each module |
| Confetti | Celebration animation on scoring 80%+ on quizzes |

---

## File Inventory

| File | Purpose | Est. Size |
|------|---------|-----------|
| `index.html` | Page shell, nav, scripts | ~3 KB |
| `css/style.css` | Complete design system | ~12 KB |
| `js/app.js` | Router, dashboard, navigation | ~8 KB |
| `js/renderer.js` | Content rendering, TOC, scroll-spy | ~6 KB |
| `js/quiz.js` | Quiz engine, scoring, confetti | ~5 KB |
| `data/subjects.json` | Subject metadata | ~4 KB |
| `data/se/module[1-5].json` | SE content × 5 | ~50 KB total |
| `data/daa/module[1-5].json` | DAA content × 5 | ~60 KB total |
| `data/fsd/module[1-5].json` | FSD content × 5 | ~50 KB total |
| `data/ml/module[1-5].json` | ML content × 5 | ~50 KB total |
| **Total** | | **~250 KB** |
