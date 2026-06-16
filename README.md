# 📚 BCA Sem 5 Study Hub

An interactive, mobile-first study website for **BCA Semester V** exam preparation — built with pure HTML, CSS, and JavaScript.

> Brainware University · School of Computational & Applied Sciences · 2024

---

## ✨ Features

- **4 Subject Sections** — Software Engineering, Design & Analysis of Algorithms, Full-stack Development II, Machine Learning
- **20 Detailed Modules** — 5 modules per subject, covering every syllabus topic in depth
- **Credit Table Dashboard** — Complete semester overview with codes, credits, and evaluation breakdown
- **MCQ Quizzes** — 10 questions per module with instant feedback and explanations
- **Practice Questions** — Short-answer questions with expandable model answers
- **Interview Tips** — Key insights highlighted for placement preparation
- **Math Formula Rendering** — Proper LaTeX-style formulas via MathJax (Big-O, Master's theorem, etc.)
- **Progress Tracking** — Module completion and quiz scores saved in your browser
- **Dark / Light Theme** — Toggle with a click, preference remembered
- **Fully Responsive** — Works beautifully on phones, tablets, and desktops

---

## 🎨 Design

**Theme: "Neon Campus"** — A dark glassmorphic design with vibrant subject-specific accent colors.

| Subject | Accent Color |
|---------|-------------|
| Software Engineering | 🟦 Teal `#00cec9` |
| Design & Analysis of Algorithms | 🩷 Pink `#fd79a8` |
| Full-stack Development II | 🟨 Amber `#fdcb6e` |
| Machine Learning | 🟩 Mint `#55efc4` |

---

## 🚀 Getting Started

No installation needed. Just open the file in your browser:

```bash
# Clone the repo
git clone https://github.com/your-username/sem5-web.git

# Open in browser
open index.html
# or just double-click index.html
```

That's it. No npm, no Node, no build step.

---

## 📁 Project Structure

```
sem5-web/
├── index.html                 ← Entry point
├── css/
│   └── style.css              ← Design system & all styles
├── js/
│   ├── app.js                 ← Router, dashboard, navigation
│   ├── renderer.js            ← Module content renderer
│   └── quiz.js                ← MCQ quiz engine
├── data/
│   ├── subjects.json          ← Subject metadata & credit info
│   ├── se/                    ← Software Engineering modules
│   │   ├── module1.json
│   │   ├── module2.json
│   │   ├── module3.json
│   │   ├── module4.json
│   │   └── module5.json
│   ├── daa/                   ← Design & Analysis of Algorithms
│   │   └── module[1-5].json
│   ├── fsd/                   ← Full-stack Development II
│   │   └── module[1-5].json
│   └── ml/                    ← Machine Learning
│       └── module[1-5].json
├── implementation.md          ← Technical implementation details
├── todos.md                   ← Day-wise task breakdown
└── README.md                  ← This file
```

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Phone | < 480px | Single column, bottom tab nav, swipe gestures |
| Large Phone | 480–768px | Single column, wider cards |
| Tablet | 768–1024px | 2-column grid, slide-in sidebar |
| Desktop | > 1024px | 3-column grid, persistent sidebar, floating TOC |

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Structure & semantics |
| CSS3 | Styling, animations, responsive design |
| JavaScript (ES6+) | Routing, rendering, quiz logic |
| [Google Fonts](https://fonts.google.com/) | Inter + JetBrains Mono |
| [MathJax 3](https://www.mathjax.org/) | Mathematical formula rendering |

---

## 📖 Subjects & Modules

### Software Engineering (BCA50112) — 4 Credits
1. Introduction to Software Engineering
2. Software Development Process Models
3. Requirement Analysis & Specifications
4. Software Design & Development Tools
5. Software Testing & Project Management

### Design & Analysis of Algorithms (BCA50113) — 4 Credits
1. Algorithm Development & Complexity Analysis
2. Searching & Sorting Algorithms
3. Algorithm Design Techniques
4. Graph & Tree Algorithms
5. Complexity Classes

### Full-stack Development II (BCA57115) — 4 Credits
1. React JS & JSX with Components
2. React CSS, Bootstrap & Router
3. User Input Forms, Events & Deployment
4. API Requests & Data Binding
5. Directives, Controllers, Filters & Services

### Machine Learning (BCA57205) — 4 Credits
1. Introduction to Machine Learning
2. Types of Learning & Applications
3. Training Models in ML
4. AI & ML with Business Problems
5. Ensemble Learning

---

## 📄 License

This project is for educational purposes. Syllabus content belongs to Brainware University.