#!/usr/bin/env node
/**
 * build-examprep.js
 * 
 * Reads all markdown question files from /questions/{subject}/m{1-5}/*.md
 * and generates js/examprep-data.js with properly formatted data for the
 * Exam Prep section of the Study Hub.
 * 
 * Usage: node build-examprep.js
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = path.join(__dirname, 'questions');
const OUTPUT_FILE = path.join(__dirname, 'js', 'examprep-data.js');

const SUBJECTS = ['se', 'daa', 'fsd', 'ml'];
const MODULES = [1, 2, 3, 4, 5];

// ─── Utility: escape string for JavaScript source ────────────────────────────
function jsEscape(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

// ─── Utility: convert $...$ math notation to \\(...\\) for MathJax ───────────
function convertMathNotation(text) {
  // Convert display math $$...$$ → \\[...\\]
  text = text.replace(/\$\$([^$]+)\$\$/g, '\\\\[$1\\\\]');
  // Convert inline math $...$ → \\(...\\)
  // Be careful not to match escaped dollar signs or currency amounts
  text = text.replace(/\$([^$\n]+?)\$/g, '\\\\($1\\\\)');
  return text;
}

// ─── Utility: clean markdown formatting for display ──────────────────────────
function cleanMarkdown(text) {
  // Remove bold markers
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  // Remove italic markers
  text = text.replace(/\*([^*]+)\*/g, '$1');
  // Convert math notation
  text = convertMathNotation(text);
  return text.trim();
}

// ─── Read file safely ────────────────────────────────────────────────────────
function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}

// ─── PARSER: MCQs ────────────────────────────────────────────────────────────
// Format:
// **1. Question text?**
// A) Option A
// B) Option B
// C) Option C
// D) Option D
// **Answer:** B
function parseMCQs(content) {
  if (!content) return [];
  
  const mcqs = [];
  // Split into individual question blocks
  const questionBlocks = content.split(/\n\*\*\d+\.\s+/).filter(b => b.trim());
  
  for (const block of questionBlocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 3) continue;
    
    // Extract question text (first line, may end with **)
    let questionText = lines[0].replace(/\*\*$/, '').trim();
    questionText = convertMathNotation(questionText);
    
    // Collect additional question lines (before options)
    let lineIdx = 1;
    while (lineIdx < lines.length && !lines[lineIdx].match(/^[A-D]\)/)) {
      // Additional question text lines (or marks/topic lines) 
      // Skip lines that start with * (bullet sub-points in question)
      if (!lines[lineIdx].match(/^\*\*Answer/)) {
        questionText += ' ' + lines[lineIdx];
      }
      lineIdx++;
    }
    
    // Extract options A-D
    const options = [];
    const optionLetters = ['A', 'B', 'C', 'D'];
    
    for (let oi = 0; oi < 4; oi++) {
      while (lineIdx < lines.length) {
        const optMatch = lines[lineIdx].match(new RegExp(`^${optionLetters[oi]}\\)\\s*(.+)`));
        if (optMatch) {
          options.push(convertMathNotation(optMatch[1].trim()));
          lineIdx++;
          break;
        }
        lineIdx++;
      }
    }
    
    if (options.length < 2) continue; // Need at least 2 options
    
    // Find answer
    let correctIndex = 0;
    for (let li = lineIdx; li < lines.length; li++) {
      const ansMatch = lines[li].match(/\*\*Answer:\*\*\s*([A-D])/);
      if (ansMatch) {
        correctIndex = ansMatch[1].charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
        break;
      }
    }
    
    // Generate explanation from the correct answer
    const explanation = `The correct answer is: ${options[correctIndex] || 'Option ' + optionLetters[correctIndex]}`;
    
    mcqs.push({
      question: questionText,
      options: options,
      correct: correctIndex,
      explanation: explanation
    });
  }
  
  return mcqs;
}

// ─── PARSER: One-Liners ──────────────────────────────────────────────────────
// Format:
// 1. **Question:** What is X?
// **Answer:** X is...
function parseOneLiners(content) {
  if (!content) return [];
  
  const oneLiners = [];
  // Split by numbered items
  const items = content.split(/\n\d+\.\s+/).filter(b => b.trim());
  
  for (const item of items) {
    const lines = item.split('\n').map(l => l.trim()).filter(l => l);
    
    let questionText = '';
    let answerText = '';
    
    for (const line of lines) {
      const qMatch = line.match(/\*\*Question:\*\*\s*(.+)/);
      const aMatch = line.match(/\*\*Answer:\*\*\s*(.+)/);
      
      if (qMatch) {
        questionText = qMatch[1].trim();
      } else if (aMatch) {
        answerText = aMatch[1].trim();
      }
    }
    
    if (answerText) {
      // Determine category based on content heuristics
      let category = 'Concept';
      const lower = answerText.toLowerCase();
      if (lower.includes('define') || lower.includes('is a ') || lower.includes('is the ') || lower.includes('refers to') || questionText.toLowerCase().startsWith('define') || questionText.toLowerCase().startsWith('what is')) {
        category = 'Definition';
      } else if (lower.includes('formula') || lower.includes('equation') || lower.includes('$') || lower.includes('complexity')) {
        category = 'Formula / Stat';
      } else if (lower.includes('differ') || lower.includes('distinguish') || lower.includes('vs') || lower.includes('contrast')) {
        category = 'Comparison';
      }
      
      oneLiners.push({
        fact: convertMathNotation(answerText),
        category: category
      });
    }
  }
  
  return oneLiners;
}

// ─── PARSER: Flashcards ──────────────────────────────────────────────────────
// Format:
// **Flashcard 1**
// *Front:* Question text
// *Back:* Answer text
function parseFlashcards(content) {
  if (!content) return [];
  
  const flashcards = [];
  // Split by flashcard headers
  const blocks = content.split(/\*\*Flashcard\s+\d+\*\*/).filter(b => b.trim());
  
  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    
    let front = '';
    let back = '';
    
    for (const line of lines) {
      const frontMatch = line.match(/\*Front:\*\s*(.+)/);
      const backMatch = line.match(/\*Back:\*\s*(.+)/);
      
      if (frontMatch) {
        front = frontMatch[1].trim();
      } else if (backMatch) {
        back = backMatch[1].trim();
      }
    }
    
    if (front && back) {
      flashcards.push({
        question: convertMathNotation(front),
        answer: convertMathNotation(back)
      });
    }
  }
  
  return flashcards;
}

// ─── PARSER: Short Answer Questions ──────────────────────────────────────────
// Format:
// **1. Question text (marks)**
// **Answer:** Answer text...
// Can have multi-line answers with numbered/bulleted sub-points
function parseShortAnswers(content) {
  if (!content) return [];
  
  const questions = [];
  // Split by question headers: **1. ... **
  const blocks = content.split(/\n\*\*\d+\.\s+/).filter(b => b.trim());
  
  for (const block of blocks) {
    const lines = block.split('\n');
    
    // First line is the question (may contain marks info)
    let questionText = lines[0].replace(/\*\*$/, '').replace(/\(\d+\s*marks?\)/i, '').trim();
    questionText = convertMathNotation(questionText);
    
    // Find the answer
    let answerLines = [];
    let foundAnswer = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.match(/\*\*Answer:\*\*/)) {
        foundAnswer = true;
        // The answer text might be on the same line
        const afterAnswer = line.replace(/\*\*Answer:\*\*\s*/, '').trim();
        if (afterAnswer) {
          answerLines.push(afterAnswer);
        }
        continue;
      }
      
      if (foundAnswer) {
        // Collect all subsequent lines as part of the answer
        const trimmed = line.trim();
        if (trimmed) {
          // Clean markdown formatting but preserve structure
          let cleaned = trimmed;
          // Convert bullet points and numbered lists to readable text
          cleaned = cleaned.replace(/^\*\s+/, '• ');
          cleaned = cleaned.replace(/^\d+\.\s+/, (m) => m);
          answerLines.push(cleaned);
        }
      }
    }
    
    if (questionText && answerLines.length > 0) {
      let answer = answerLines.join('\\n');
      // Clean bold markers from answer
      answer = answer.replace(/\*\*([^*]+)\*\*/g, '$1');
      answer = answer.replace(/\*([^*]+)\*/g, '$1');
      answer = convertMathNotation(answer);
      
      questions.push({
        question: questionText,
        answer: answer
      });
    }
  }
  
  return questions;
}

// ─── PARSER: Long Answer Questions ───────────────────────────────────────────
// Format:
// **1. Question text (marks)**
// **Answer:**
// Multi-paragraph answer with headers, bullet points, code blocks, etc.
function parseLongAnswers(content) {
  if (!content) return [];
  
  const questions = [];
  // Split by question headers
  const blocks = content.split(/\n\*\*\d+\.\s+/).filter(b => b.trim());
  
  for (const block of blocks) {
    const lines = block.split('\n');
    
    // Extract question — might span multiple lines before **Answer:**
    let questionLines = [];
    let answerLines = [];
    let foundAnswer = false;
    let inCodeBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Track code blocks to avoid parsing issues
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
      }
      
      if (!foundAnswer) {
        if (line.match(/\*\*Answer:\*\*/)) {
          foundAnswer = true;
          const afterAnswer = line.replace(/\*\*Answer:\*\*\s*/, '').trim();
          if (afterAnswer) {
            answerLines.push(afterAnswer);
          }
        } else {
          questionLines.push(line);
        }
      } else {
        answerLines.push(line);
      }
    }
    
    // Build the question text
    let questionText = questionLines.join(' ')
      .replace(/\*\*$/, '')
      .replace(/\*\*/g, '')
      .replace(/\(\d+\s*[Mm]arks?\)/g, '')
      .replace(/Topic:\s*/g, '')
      .trim();
    questionText = convertMathNotation(questionText);
    
    if (!questionText || answerLines.length === 0) continue;
    
    // Build the answer text - clean markdown but preserve structure
    let answerText = [];
    let keyPoints = [];
    
    for (const line of answerLines) {
      let cleaned = line;
      // Remove markdown headers
      cleaned = cleaned.replace(/^#+\s+/, '');
      // Clean bold/italic
      cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
      cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');
      
      answerText.push(cleaned);
    }
    
    let answer = answerText.join('\n').trim();
    answer = convertMathNotation(answer);
    
    // Extract key points from numbered lists or bullet points within the answer
    const bulletPoints = answer.match(/(?:^|\n)\s*(?:\d+\.\s+|\*\s+|•\s+)([^\n]+)/g);
    if (bulletPoints && bulletPoints.length > 0) {
      keyPoints = bulletPoints
        .slice(0, 5) // max 5 key points
        .map(bp => bp.replace(/^\s*(?:\d+\.\s+|\*\s+|•\s+)/, '').trim())
        .filter(kp => kp.length > 10 && kp.length < 200);
    }
    
    // If no key points extracted, create generic ones from first sentences
    if (keyPoints.length === 0) {
      const sentences = answer.split(/[.!?]\s/).filter(s => s.trim().length > 15);
      keyPoints = sentences.slice(0, 3).map(s => s.trim().substring(0, 150));
    }
    
    // Escape newlines for JS string
    answer = answer.replace(/\n/g, '\\n');
    
    questions.push({
      question: questionText,
      answer: answer,
      keyPoints: keyPoints
    });
  }
  
  return questions;
}

// ─── Default mnemonics per subject ───────────────────────────────────────────
const defaultMnemonics = {
  se: {
    1: [
      { concept: "Attributes of Good Software", phrase: "MDEA (My Dear Elegant Application)", association: "**M**aintainability, **D**ependability, **E**fficiency, **A**cceptability" },
      { concept: "Software Engineering Challenges", phrase: "HDT (High-Definition Testing)", association: "**H**eterogeneity, **D**elivery, **T**rust" }
    ],
    2: [
      { concept: "SDLC Phases", phrase: "RC-DD-TIE (Red Cats Drink Dairy Tea In Evening)", association: "**R**equirements, **C**onceptual design, **D**etailed design, **D**evelopment, **T**esting, **I**ntegration, **E**volution" },
      { concept: "Agile Manifesto Values", phrase: "IWCR (I Will Code Right)", association: "**I**ndividuals over processes, **W**orking software over docs, **C**ustomer collaboration over contracts, **R**esponding to change over plans" }
    ],
    3: [
      { concept: "Requirement Types", phrase: "FNS (Functional, Non-functional, System)", association: "**F**unctional (what system does), **N**on-functional (performance, security), **S**ystem (constraints)" },
      { concept: "SRS Document Sections", phrase: "IPDF (I Plan Documents First)", association: "**I**ntroduction, **P**roduct Description, **D**etailed Requirements, **F**unctional Specifications" }
    ],
    4: [
      { concept: "UML Diagram Types", phrase: "CUS (Class, Use-case, Sequence)", association: "**C**lass diagrams (structure), **U**se-case (behavior), **S**equence (interactions)" },
      { concept: "Design Principles", phrase: "SOLID", association: "**S**ingle Responsibility, **O**pen-Closed, **L**iskov Substitution, **I**nterface Segregation, **D**ependency Inversion" }
    ],
    5: [
      { concept: "Testing Levels", phrase: "UIST (Units Integrate System Tests)", association: "**U**nit testing, **I**ntegration testing, **S**ystem testing, **T**acceptance testing" },
      { concept: "Quality Frameworks", phrase: "CIS (CMM, ISO, Six Sigma)", association: "**C**MM for maturity, **I**SO for standards, **S**ix Sigma for defect reduction" }
    ]
  },
  daa: {
    1: [
      { concept: "Asymptotic Bounds", phrase: "OOT (Out Of Time)", association: "**O**mega (Floor/Lower), **O** (Ceiling/Upper), **T**heta (Tight/Middle)" },
      { concept: "Algorithm Complexity Ordering", phrase: "C-L-L-Q-E (Cool Llama Likes Quiet Evenings)", association: "**C**onstant O(1), **L**ogarithmic O(log n), **L**inear O(n), **Q**uadratic O(n²), **E**xponential O(2^n)" }
    ],
    2: [
      { concept: "Sorting Stability", phrase: "MIS (Merge, Insertion = Stable)", association: "**M**erge Sort and **I**nsertion Sort are **S**table (preserve equal element order)" },
      { concept: "Search Prerequisites", phrase: "BSS (Binary Searches Sorted)", association: "**B**inary Search requires **S**orted **S**equence" }
    ],
    3: [
      { concept: "Algorithm Design Techniques", phrase: "GDD (Greedy, Divide-conquer, Dynamic)", association: "**G**reedy (local optimal), **D**ivide & conquer (split-solve-merge), **D**ynamic programming (overlapping subproblems)" },
      { concept: "DP Properties", phrase: "OOS (Optimal, Overlapping, Substructure)", association: "**O**ptimal substructure + **O**verlapping **S**ubproblems" }
    ],
    4: [
      { concept: "Graph Traversals", phrase: "BD (Breadth-Depth)", association: "**B**FS (queue, level-order), **D**FS (stack, depth-first)" },
      { concept: "MST Algorithms", phrase: "KP (Keep Pruning)", association: "**K**ruskal's (edge-sort greedy), **P**rim's (vertex-grow greedy)" }
    ],
    5: [
      { concept: "Complexity Classes", phrase: "PNH (P, NP, NP-Hard)", association: "**P** (polynomial), **N**P (verifiable in P), **H**ard (reducible from NP)" },
      { concept: "NP-Complete Properties", phrase: "NP-C (Non-deterministic Polynomial Verification & Hardness)", association: "**N**P class membership (polynomial verification) + **P**olynomial **C**onversion (NP-Hard reduction)" }
    ]
  },
  fsd: {
    1: [
      { concept: "React Core Concepts", phrase: "CPS (Components, Props, State)", association: "**C**omponents (building blocks), **P**rops (input data), **S**tate (internal data)" },
      { concept: "JSX Rules", phrase: "SRE (Single Root Element)", association: "JSX must return a **S**ingle **R**oot **E**lement (or use fragments)" }
    ],
    2: [
      { concept: "React Styling Methods", phrase: "ICSM (Inline, CSS, Styled, Modules)", association: "**I**nline styles, **C**SS sheets, **S**tyled-components, CSS **M**odules" },
      { concept: "React Router Parts", phrase: "BRL (Browser, Routes, Links)", association: "**B**rowserRouter, **R**outes/Route, **L**ink components" }
    ],
    3: [
      { concept: "Form Handling", phrase: "CUF (Controlled, Uncontrolled, Forms)", association: "**C**ontrolled (state-driven), **U**ncontrolled (ref-driven), **F**orms (events)" },
      { concept: "React Events", phrase: "OCK (onClick, onChange, onKeyUp)", association: "**O**nClick, on**C**hange, on**K**eyUp — camelCase in JSX" }
    ],
    4: [
      { concept: "API Methods", phrase: "FAPG (Fetch, Axios, POST, GET)", association: "**F**etch API, **A**xios library, **P**OST/PUT/DELETE, **G**ET requests" },
      { concept: "React Lifecycle Phases", phrase: "M-U-U (Many Users Update)", association: "**M**ounting, **U**pdating, **U**nmounting" }
    ],
    5: [
      { concept: "AngularJS Concepts", phrase: "DSC (Directives, Services, Controllers)", association: "**D**irectives (DOM manipulation), **S**ervices (shared logic), **C**ontrollers (scope management)" },
      { concept: "State vs Props", phrase: "S-I-P-E (State Internal, Props External)", association: "**S**tate is **I**nternal component data, **P**rops are **E**xternal configurations passed down" }
    ]
  },
  ml: {
    1: [
      { concept: "ML Types", phrase: "S-U-R (Super Users Rule)", association: "**S**upervised, **U**nsupervised, **R**einforcement Learning" },
      { concept: "ML Pipeline Steps", phrase: "CDTME (Collect, Define, Train, Model, Evaluate)", association: "**C**ollect data, **D**efine problem, **T**rain model, **M**onitor performance, **E**valuate results" }
    ],
    2: [
      { concept: "Supervised vs Unsupervised", phrase: "LU (Labeled/Unlabeled)", association: "**L**abeled data → Supervised, **U**nlabeled data → Unsupervised" },
      { concept: "Classification vs Regression", phrase: "CR (Categories/Real)", association: "**C**lassification → discrete categories, **R**egression → continuous real values" }
    ],
    3: [
      { concept: "Overfitting Solutions", phrase: "RDC (Regularize, Dropout, Cross-validate)", association: "**R**egularization (L1/L2), **D**ropout, **C**ross-validation" },
      { concept: "Gradient Descent Types", phrase: "BSM (Batch, Stochastic, Mini-batch)", association: "**B**atch (full dataset), **S**tochastic (single sample), **M**ini-batch (subset)" }
    ],
    4: [
      { concept: "Business ML Steps", phrase: "DBDT (Define, Build, Deploy, Track)", association: "**D**efine business problem, **B**uild ML model, **D**eploy pilot project, **T**rack results" },
      { concept: "Evaluation Metrics", phrase: "P-R-F1 (Please Recall Formula 1)", association: "**P**recision, **R**ecall, **F**1-score" }
    ],
    5: [
      { concept: "Ensemble Methods", phrase: "BBR (Bagging, Boosting, Random Forest)", association: "**B**agging (parallel), **B**oosting (sequential), **R**andom Forest (bagging + feature selection)" },
      { concept: "Variance vs Bias", phrase: "BV-Trade (Bias-Variance Trade-off)", association: "High **B**ias = underfitting, High **V**ariance = overfitting" }
    ]
  }
};

// ─── Build the data for a single module ──────────────────────────────────────
function buildModuleData(subjectId, moduleId) {
  const moduleDir = path.join(QUESTIONS_DIR, subjectId, `m${moduleId}`);
  
  const mcqsContent = readFileSafe(path.join(moduleDir, 'mcqs.md'));
  const oneLinersContent = readFileSafe(path.join(moduleDir, 'one-liner.md'));
  const flashcardContent = readFileSafe(path.join(moduleDir, 'flashcard.md'));
  const shortContent = readFileSafe(path.join(moduleDir, 'short-answer.md'));
  const longContent = readFileSafe(path.join(moduleDir, 'long-answer.md'));
  
  const mcqs = parseMCQs(mcqsContent);
  const oneLiners = parseOneLiners(oneLinersContent);
  const flashCards = parseFlashcards(flashcardContent);
  const shortQuestions = parseShortAnswers(shortContent);
  const longQuestions = parseLongAnswers(longContent);
  
  // Get mnemonics for this module
  const mnemonics = (defaultMnemonics[subjectId] && defaultMnemonics[subjectId][moduleId])
    ? defaultMnemonics[subjectId][moduleId]
    : [
        { concept: `Module ${moduleId} Key Concepts`, phrase: "R-S-V-P (Revision Starts Very Promptly)", association: "**R**equirements, **S**tructured algorithms, **V**alidation tests, **P**rogress metrics" }
      ];
  
  return { oneLiners, mcqs, shortQuestions, longQuestions, mnemonics, flashCards };
}

// ─── Serialize a value to JS source code ─────────────────────────────────────
function serializeValue(value, indent = '') {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'string') return `"${jsEscape(value)}"`;
  
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map(v => `${indent}    ${serializeValue(v, indent + '    ')}`);
    return `[\n${items.join(',\n')}\n${indent}  ]`;
  }
  
  if (typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([k, v]) => `${indent}    ${k}: ${serializeValue(v, indent + '    ')}`)
      .join(',\n');
    return `{\n${entries}\n${indent}  }`;
  }
  
  return String(value);
}

// ─── Generate the output JS file ─────────────────────────────────────────────
function generateOutput() {
  console.log('🔧 Building examprep-data.js from markdown files...\n');
  
  let allData = {};
  let totalStats = { mcqs: 0, oneLiners: 0, flashCards: 0, shortQ: 0, longQ: 0 };
  
  for (const subject of SUBJECTS) {
    allData[subject] = {};
    for (const moduleId of MODULES) {
      const data = buildModuleData(subject, moduleId);
      allData[subject][moduleId] = data;
      
      totalStats.mcqs += data.mcqs.length;
      totalStats.oneLiners += data.oneLiners.length;
      totalStats.flashCards += data.flashCards.length;
      totalStats.shortQ += data.shortQuestions.length;
      totalStats.longQ += data.longQuestions.length;
      
      const total = data.mcqs.length + data.oneLiners.length + data.flashCards.length + data.shortQuestions.length + data.longQuestions.length;
      console.log(`  ✅ ${subject.toUpperCase()} Module ${moduleId}: ${data.mcqs.length} MCQs, ${data.oneLiners.length} One-Liners, ${data.flashCards.length} Flashcards, ${data.shortQuestions.length} Short, ${data.longQuestions.length} Long (${total} total)`);
    }
  }
  
  // Build the JS source
  let output = `// js/examprep-data.js - Exam Prep Content (Auto-generated from /questions/ markdown files)
// Generated at: ${new Date().toISOString()}
// Run "node build-examprep.js" to regenerate this file from updated markdown content.
(function () {
  const ExamPrepData = {};

  // All curated content parsed from /questions/{subject}/m{1-5}/*.md
  const moduleData = {\n`;

  for (const subject of SUBJECTS) {
    output += `    ${subject}: {\n`;
    for (const moduleId of MODULES) {
      const data = allData[subject][moduleId];
      output += `      ${moduleId}: {\n`;
      
      // One-Liners
      output += `        oneLiners: [\n`;
      for (const ol of data.oneLiners) {
        output += `          { fact: "${jsEscape(ol.fact)}", category: "${jsEscape(ol.category)}" },\n`;
      }
      output += `        ],\n`;
      
      // MCQs
      output += `        mcqs: [\n`;
      for (const mcq of data.mcqs) {
        const opts = mcq.options.map(o => `"${jsEscape(o)}"`).join(', ');
        output += `          { question: "${jsEscape(mcq.question)}", options: [${opts}], correct: ${mcq.correct}, explanation: "${jsEscape(mcq.explanation)}" },\n`;
      }
      output += `        ],\n`;
      
      // Short Questions
      output += `        shortQuestions: [\n`;
      for (const sq of data.shortQuestions) {
        output += `          { question: "${jsEscape(sq.question)}", answer: "${jsEscape(sq.answer)}" },\n`;
      }
      output += `        ],\n`;
      
      // Long Questions
      output += `        longQuestions: [\n`;
      for (const lq of data.longQuestions) {
        const kps = lq.keyPoints.map(kp => `"${jsEscape(kp)}"`).join(', ');
        output += `          {\n`;
        output += `            question: "${jsEscape(lq.question)}",\n`;
        output += `            answer: "${jsEscape(lq.answer)}",\n`;
        output += `            keyPoints: [${kps}]\n`;
        output += `          },\n`;
      }
      output += `        ],\n`;
      
      // Mnemonics
      output += `        mnemonics: [\n`;
      for (const m of data.mnemonics) {
        output += `          { concept: "${jsEscape(m.concept)}", phrase: "${jsEscape(m.phrase)}", association: "${jsEscape(m.association)}" },\n`;
      }
      output += `        ],\n`;
      
      // Flash Cards
      output += `        flashCards: [\n`;
      for (const fc of data.flashCards) {
        output += `          { question: "${jsEscape(fc.question)}", answer: "${jsEscape(fc.answer)}" },\n`;
      }
      output += `        ]\n`;
      
      output += `      },\n`;
    }
    output += `    },\n`;
  }
  
  output += `  };

  ExamPrepData.getModuleData = function (subjectId, moduleId) {
    if (moduleData[subjectId] && moduleData[subjectId][moduleId]) {
      return moduleData[subjectId][moduleId];
    }
    // Fallback: return empty structure
    return {
      oneLiners: [],
      mcqs: [],
      shortQuestions: [],
      longQuestions: [],
      mnemonics: [],
      flashCards: []
    };
  };

  window.ExamPrepData = ExamPrepData;
})();
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  
  console.log(`\n📊 Total: ${totalStats.mcqs} MCQs, ${totalStats.oneLiners} One-Liners, ${totalStats.flashCards} Flashcards, ${totalStats.shortQ} Short, ${totalStats.longQ} Long`);
  console.log(`✨ Written to: ${OUTPUT_FILE}`);
  console.log(`📦 File size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1)} KB`);
}

// ─── Run ─────────────────────────────────────────────────────────────────────
generateOutput();
