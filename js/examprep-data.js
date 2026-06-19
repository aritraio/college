// js/examprep-data.js - Exam Prep Content Loader
// Dynamically fetches and parses markdown files from /questions/{subject}/m{moduleId}/
// The markdown files are the single source of truth for all exam prep content.
(function () {
  const ExamPrepData = {};

  // Cache parsed module data to avoid re-fetching
  const moduleCache = {};

  // ─── Markdown Parsers ──────────────────────────────────────────────────────

  /**
   * Convert $...$ math notation to \\(...\\) for MathJax inline,
   * and $$...$$ to \\[...\\] for MathJax display.
   */
  function convertMath(text) {
    if (!text) return '';
    // Display math first (greedy double-dollar)
    text = text.replace(/\$\$([^$]+)\$\$/g, '\\\\[$1\\\\]');
    // Inline math (non-greedy single-dollar, avoid currency-like patterns)
    text = text.replace(/\$([^$\n]+?)\$/g, '\\\\($1\\\\)');
    return text;
  }

  /**
   * Strip markdown bold/italic markers for clean display.
   */
  function stripMd(text) {
    if (!text) return '';
    text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
    text = text.replace(/\*([^*]+)\*/g, '$1');
    return text;
  }

  /**
   * Parse MCQs from markdown.
   * Format:
   *   **1. Question text?**
   *   A) Option A
   *   B) Option B
   *   C) Option C
   *   D) Option D
   *   **Answer:** B
   */
  function parseMCQs(content) {
    if (!content) return [];
    const mcqs = [];

    // Split into question blocks by the numbered header pattern
    const blocks = content.split(/\n\*\*\d+\.\s+/).filter(b => b.trim());

    for (const block of blocks) {
      const lines = block.split('\n').map(l => l.trim()).filter(l => l);
      if (lines.length < 3) continue;

      // Extract question text (first line; strip trailing **)
      let questionText = lines[0].replace(/\*\*\s*$/, '').trim();

      // Collect additional question lines before options start
      let li = 1;
      while (li < lines.length && !/^[A-D]\)/.test(lines[li]) && !/^\*\*Answer/.test(lines[li])) {
        questionText += ' ' + lines[li];
        li++;
      }
      questionText = convertMath(questionText);

      // Extract options A-D
      const options = [];
      const letters = ['A', 'B', 'C', 'D'];
      for (const letter of letters) {
        while (li < lines.length) {
          const m = lines[li].match(new RegExp('^' + letter + '\\)\\s*(.+)'));
          if (m) {
            options.push(convertMath(m[1].trim()));
            li++;
            break;
          }
          li++;
        }
      }

      if (options.length < 2) continue;

      // Find correct answer letter
      let correct = 0;
      for (let j = li; j < lines.length; j++) {
        const am = lines[j].match(/\*\*Answer:\*\*\s*([A-D])/);
        if (am) {
          correct = am[1].charCodeAt(0) - 65;
          break;
        }
      }

      mcqs.push({
        question: questionText,
        options: options,
        correct: correct,
        explanation: 'The correct answer is: ' + (options[correct] || letters[correct])
      });
    }

    return mcqs;
  }

  /**
   * Parse one-liner Q&A pairs from markdown.
   * Format:
   *   1. **Question:** What is X?
   *   **Answer:** X is...
   */
  function parseOneLiners(content) {
    if (!content) return [];
    const result = [];
    const items = content.split(/\n\d+\.\s+/).filter(b => b.trim());

    for (const item of items) {
      const lines = item.split('\n').map(l => l.trim()).filter(l => l);
      let answer = '';

      for (const line of lines) {
        const aMatch = line.match(/\*\*Answer:\*\*\s*(.+)/);
        if (aMatch) {
          answer = aMatch[1].trim();
        }
      }

      if (answer) {
        // Auto-categorize based on content
        let category = 'Concept';
        const lower = answer.toLowerCase();
        if (/\bdefin|is a |is the |refers to|is an /.test(lower)) {
          category = 'Definition';
        } else if (/formula|equation|\$|complexity|O\(|\\\\/.test(answer)) {
          category = 'Formula / Stat';
        } else if (/differ|distinguish|vs\b|contrast|compar/.test(lower)) {
          category = 'Comparison';
        }

        result.push({
          fact: convertMath(answer),
          category: category
        });
      }
    }

    return result;
  }

  /**
   * Parse flashcards from markdown.
   * Format:
   *   **Flashcard 1**
   *   *Front:* Question
   *   *Back:* Answer
   */
  function parseFlashcards(content) {
    if (!content) return [];
    const result = [];
    const blocks = content.split(/\*\*Flashcard\s+\d+\*\*/).filter(b => b.trim());

    for (const block of blocks) {
      const lines = block.split('\n').map(l => l.trim()).filter(l => l);
      let front = '', back = '';

      for (const line of lines) {
        const fm = line.match(/\*Front:\*\s*(.+)/);
        const bm = line.match(/\*Back:\*\s*(.+)/);
        if (fm) front = fm[1].trim();
        if (bm) back = bm[1].trim();
      }

      if (front && back) {
        result.push({
          question: convertMath(front),
          answer: convertMath(back)
        });
      }
    }

    return result;
  }

  /**
   * Parse short answer questions from markdown.
   * Format:
   *   **1. Question text (marks)**
   *   **Answer:** Answer text (possibly multi-line with bullets)
   */
  function parseShortAnswers(content) {
    if (!content) return [];
    const result = [];
    const blocks = content.split(/\n\*\*\d+\.\s+/).filter(b => b.trim());

    for (const block of blocks) {
      const lines = block.split('\n');

      // First line = question
      let questionText = lines[0]
        .replace(/\*\*\s*$/, '')
        .replace(/\(\d+\s*marks?\)/gi, '')
        .trim();
      questionText = convertMath(questionText);

      // Collect answer lines
      let answerLines = [];
      let foundAnswer = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/\*\*Answer:\*\*/.test(line)) {
          foundAnswer = true;
          const after = line.replace(/\*\*Answer:\*\*\s*/, '').trim();
          if (after) answerLines.push(after);
          continue;
        }
        if (foundAnswer && line.trim()) {
          let cleaned = line.trim();
          cleaned = cleaned.replace(/^\*\s+/, '• ');
          answerLines.push(cleaned);
        }
      }

      if (questionText && answerLines.length > 0) {
        let answer = answerLines.join('\n');
        answer = stripMd(answer);
        answer = convertMath(answer);

        result.push({ question: questionText, answer: answer });
      }
    }

    return result;
  }

  /**
   * Parse long answer questions from markdown.
   * Format:
   *   **1. Topic/Question text (marks)**
   *   **Answer:**
   *   Multi-paragraph answer...
   */
  function parseLongAnswers(content) {
    if (!content) return [];
    const result = [];
    const blocks = content.split(/\n\*\*\d+\.\s+/).filter(b => b.trim());

    for (const block of blocks) {
      const lines = block.split('\n');
      let questionLines = [];
      let answerLines = [];
      let foundAnswer = false;

      for (const line of lines) {
        if (/\*\*Answer:\*\*/.test(line)) {
          foundAnswer = true;
          const after = line.replace(/\*\*Answer:\*\*\s*/, '').trim();
          if (after) answerLines.push(after);
          continue;
        }
        if (!foundAnswer) {
          questionLines.push(line);
        } else {
          answerLines.push(line);
        }
      }

      let questionText = questionLines.join(' ')
        .replace(/\*\*/g, '')
        .replace(/\(\d+\s*[Mm]arks?\)/g, '')
        .replace(/Topic:\s*/g, '')
        .trim();
      questionText = convertMath(questionText);

      if (!questionText || answerLines.length === 0) continue;

      // Build answer
      let answer = answerLines.join('\n');
      answer = stripMd(answer);
      answer = convertMath(answer);

      // Extract key points from bullets/numbered items
      const bulletMatches = answer.match(/(?:^|\n)\s*(?:\d+\.\s+|\*\s+|•\s+)([^\n]+)/g);
      let keyPoints = [];
      if (bulletMatches && bulletMatches.length > 0) {
        keyPoints = bulletMatches
          .slice(0, 5)
          .map(bp => bp.replace(/^\s*(?:\d+\.\s+|\*\s+|•\s+)/, '').trim())
          .filter(kp => kp.length > 10 && kp.length < 250);
      }

      // Fallback: first sentences
      if (keyPoints.length === 0) {
        const sentences = answer.split(/[.!?]\s/).filter(s => s.trim().length > 15);
        keyPoints = sentences.slice(0, 3).map(s => s.trim().substring(0, 150));
      }

      result.push({ question: questionText, answer: answer, keyPoints: keyPoints });
    }

    return result;
  }

  // ─── Default Mnemonics (curated per subject/module) ──────────────────────

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
        { concept: "Requirement Types", phrase: "FND (Functional, Non-functional, Domain)", association: "**F**unctional (what system does), **N**on-functional (performance, security), **D**omain (industry constraints)" },
        { concept: "SRS Contents", phrase: "IOSD (I Observe System Details)", association: "**I**ntroduction, **O**verall Description, **S**pecific Requirements, **D**ata models" }
      ],
      4: [
        { concept: "UML Diagram Types", phrase: "CUS (Class, Use-case, Sequence)", association: "**C**lass diagrams (structure), **U**se-case (behavior), **S**equence (interactions)" },
        { concept: "Design Principles", phrase: "SOLID", association: "**S**ingle Responsibility, **O**pen-Closed, **L**iskov Substitution, **I**nterface Segregation, **D**ependency Inversion" }
      ],
      5: [
        { concept: "Testing Types", phrase: "BWI (Black, White, Integration)", association: "**B**lack-box (input/output), **W**hite-box (internal code), **I**ntegration (component interaction)" },
        { concept: "Quality Frameworks", phrase: "CIS (CMM, ISO, Six Sigma)", association: "**C**MM for maturity, **I**SO for standards, **S**ix Sigma for defect reduction" }
      ]
    },
    daa: {
      1: [
        { concept: "Asymptotic Bounds", phrase: "OOT (Out Of Time)", association: "**O**mega (Floor/Lower), **O** (Ceiling/Upper), **T**heta (Tight/Middle)" },
        { concept: "Complexity Ordering", phrase: "C-L-L-Q-E (Cool Llama Likes Quiet Evenings)", association: "**C**onstant O(1), **L**ogarithmic O(log n), **L**inear O(n), **Q**uadratic O(n²), **E**xponential O(2^n)" }
      ],
      2: [
        { concept: "Sorting Stability", phrase: "MIS (Merge, Insertion = Stable)", association: "**M**erge Sort and **I**nsertion Sort are **S**table (preserve equal element order)" },
        { concept: "Search Prerequisites", phrase: "BSS (Binary Searches Sorted)", association: "**B**inary Search requires **S**orted **S**equence" }
      ],
      3: [
        { concept: "Design Techniques", phrase: "GDD (Greedy, Divide, Dynamic)", association: "**G**reedy (local optimal), **D**ivide & conquer (split-solve-merge), **D**ynamic programming (overlapping subproblems)" },
        { concept: "DP Properties", phrase: "OOS (Optimal Overlapping Substructure)", association: "**O**ptimal substructure + **O**verlapping **S**ubproblems" }
      ],
      4: [
        { concept: "Graph Traversals", phrase: "BD (Breadth-Depth)", association: "**B**FS (queue, level-order), **D**FS (stack, depth-first)" },
        { concept: "MST Algorithms", phrase: "KP (Keep Pruning)", association: "**K**ruskal's (edge-sort greedy), **P**rim's (vertex-grow greedy)" }
      ],
      5: [
        { concept: "Complexity Classes", phrase: "PNH (P, NP, NP-Hard)", association: "**P** (polynomial), **N**P (verifiable in P), **H**ard (reducible from NP)" },
        { concept: "NP-Complete Properties", phrase: "NP-C = NP ∩ NP-Hard", association: "**N**P class membership (polynomial verification) + **P**olynomial **C**onversion (NP-Hard reduction)" }
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
        { concept: "API Methods", phrase: "FAP (Fetch, Axios, Promise)", association: "**F**etch API, **A**xios library, **P**romise-based chaining" },
        { concept: "React Lifecycle", phrase: "M-U-U (Many Users Update)", association: "**M**ounting, **U**pdating, **U**nmounting" }
      ],
      5: [
        { concept: "AngularJS Concepts", phrase: "DSC (Directives, Services, Controllers)", association: "**D**irectives (DOM manipulation), **S**ervices (shared logic), **C**ontrollers (scope management)" },
        { concept: "State vs Props", phrase: "S-I-P-E", association: "**S**tate is **I**nternal component data, **P**rops are **E**xternal configurations passed down" }
      ]
    },
    ml: {
      1: [
        { concept: "ML Types", phrase: "S-U-R (Super Users Rule)", association: "**S**upervised, **U**nsupervised, **R**einforcement Learning" },
        { concept: "ML Pipeline", phrase: "CDTME", association: "**C**ollect data, **D**efine problem, **T**rain model, **M**onitor, **E**valuate" }
      ],
      2: [
        { concept: "Supervised vs Unsupervised", phrase: "LU (Labeled/Unlabeled)", association: "**L**abeled data → Supervised, **U**nlabeled data → Unsupervised" },
        { concept: "Classification vs Regression", phrase: "CR (Categories/Real)", association: "**C**lassification → discrete categories, **R**egression → continuous values" }
      ],
      3: [
        { concept: "Overfitting Solutions", phrase: "RDC (Regularize, Dropout, Cross-validate)", association: "**R**egularization (L1/L2), **D**ropout, **C**ross-validation" },
        { concept: "Gradient Descent Types", phrase: "BSM (Batch, Stochastic, Mini-batch)", association: "**B**atch (full dataset), **S**tochastic (single sample), **M**ini-batch (subset)" }
      ],
      4: [
        { concept: "Business ML Steps", phrase: "DBDT", association: "**D**efine business problem, **B**uild ML model, **D**eploy pilot project, **T**rack results" },
        { concept: "Evaluation Metrics", phrase: "P-R-F1 (Please Recall Formula 1)", association: "**P**recision, **R**ecall, **F**1-score" }
      ],
      5: [
        { concept: "Ensemble Methods", phrase: "BBR (Bagging, Boosting, Random Forest)", association: "**B**agging (parallel), **B**oosting (sequential), **R**andom Forest (bagging + feature sampling)" },
        { concept: "Bias-Variance", phrase: "BV Trade-off", association: "High **B**ias = underfitting, High **V**ariance = overfitting" }
      ]
    }
  };

  // ─── Fetch and Parse a Single Module ───────────────────────────────────────

  async function fetchAndParse(subjectId, moduleId) {
    const basePath = `questions/${subjectId}/m${moduleId}`;
    const files = ['mcqs.md', 'one-liner.md', 'flashcard.md', 'short-answer.md', 'long-answer.md'];

    // Fetch all 5 files in parallel
    const contents = await Promise.all(
      files.map(f =>
        fetch(`${basePath}/${f}`)
          .then(r => r.ok ? r.text() : '')
          .catch(() => '')
      )
    );

    const [mcqsContent, oneLinerContent, flashcardContent, shortContent, longContent] = contents;

    const oneLiners = parseOneLiners(oneLinerContent);
    const mcqs = parseMCQs(mcqsContent);
    const flashCards = parseFlashcards(flashcardContent);
    const shortQuestions = parseShortAnswers(shortContent);
    const longQuestions = parseLongAnswers(longContent);

    // Get mnemonics
    const mnemonics = (defaultMnemonics[subjectId] && defaultMnemonics[subjectId][moduleId])
      ? defaultMnemonics[subjectId][moduleId]
      : [{ concept: "Module " + moduleId + " Key Concepts", phrase: "R-S-V-P", association: "**R**equirements, **S**tructure, **V**alidation, **P**rogress" }];

    return { oneLiners, mcqs, shortQuestions, longQuestions, mnemonics, flashCards };
  }

  // ─── Public API ────────────────────────────────────────────────────────────

  /**
   * Get module data. Returns cached data if available, otherwise fetches and parses.
   * This is now async — returns a Promise.
   */
  ExamPrepData.getModuleData = function (subjectId, moduleId) {
    const cacheKey = subjectId + '_' + moduleId;

    // Return cached data synchronously if available
    if (moduleCache[cacheKey]) {
      return moduleCache[cacheKey];
    }

    // Return empty structure as placeholder (will be populated async)
    return {
      oneLiners: [],
      mcqs: [],
      shortQuestions: [],
      longQuestions: [],
      mnemonics: (defaultMnemonics[subjectId] && defaultMnemonics[subjectId][moduleId])
        ? defaultMnemonics[subjectId][moduleId]
        : [],
      flashCards: []
    };
  };

  /**
   * Async fetch + parse + cache a module's data.
   * Call this before rendering to ensure data is loaded.
   */
  ExamPrepData.loadModuleData = async function (subjectId, moduleId) {
    const cacheKey = subjectId + '_' + moduleId;
    if (moduleCache[cacheKey]) {
      return moduleCache[cacheKey];
    }

    try {
      const data = await fetchAndParse(subjectId, moduleId);
      moduleCache[cacheKey] = data;
      return data;
    } catch (e) {
      console.error('Failed to load module data for', subjectId, moduleId, e);
      const fallback = {
        oneLiners: [],
        mcqs: [],
        shortQuestions: [],
        longQuestions: [],
        mnemonics: (defaultMnemonics[subjectId] && defaultMnemonics[subjectId][moduleId])
          ? defaultMnemonics[subjectId][moduleId]
          : [],
        flashCards: []
      };
      moduleCache[cacheKey] = fallback;
      return fallback;
    }
  };

  /**
   * Preload all modules for a subject (used by dashboard).
   */
  ExamPrepData.preloadSubject = async function (subjectId) {
    const promises = [];
    for (let m = 1; m <= 5; m++) {
      promises.push(ExamPrepData.loadModuleData(subjectId, m));
    }
    return Promise.all(promises);
  };

  /**
   * Preload all subjects and modules.
   */
  ExamPrepData.preloadAll = async function () {
    const subjects = ['se', 'daa', 'fsd', 'ml'];
    const promises = subjects.map(s => ExamPrepData.preloadSubject(s));
    return Promise.all(promises);
  };

  window.ExamPrepData = ExamPrepData;
})();
