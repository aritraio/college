// js/examprep.js - Exam Prep Engine (Dashboard & Interactive Revision)
(function () {
  const ExamPrep = {
    // Current flashcard index for active module
    currentCardIdx: 0,
    activeSubjectFilter: 'all',

    // Helper: get progress stats for subject/module
    getModuleProgress: function (subjectId, moduleId, prepData) {
      const totalOneLiners = prepData.oneLiners.length;
      const totalMCQs = prepData.mcqs.length;
      const totalFlashcards = prepData.flashCards.length;

      const key = `examprep_progress_${subjectId}_${moduleId}`;
      const stored = localStorage.getItem(key);
      if (!stored) {
        return { percent: 0, oneLinersCount: 0, mcqsCount: 0, mcqScore: 0, flashcardsCount: 0 };
      }
      try {
        const data = JSON.parse(stored);
        const readCount = data.oneLinersRead ? data.oneLinersRead.length : 0;
        const flashCount = data.flashcardsViewed ? data.flashcardsViewed.length : 0;
        const mcqCount = data.mcqsAnswered ? Object.keys(data.mcqsAnswered).length : 0;

        const totalFinished = readCount + flashCount + mcqCount;
        const totalPossible = totalOneLiners + totalFlashcards + totalMCQs;
        const percent = Math.round((totalFinished / totalPossible) * 100) || 0;

        // Calculate score
        let score = 0;
        if (data.mcqsAnswered) {
          Object.values(data.mcqsAnswered).forEach(val => {
            if (val.isCorrect) score++;
          });
        }

        return {
          percent: Math.min(100, percent),
          oneLinersCount: readCount,
          mcqsCount: mcqCount,
          mcqScore: score,
          flashcardsCount: flashCount
        };
      } catch (e) {
        return { percent: 0, oneLinersCount: 0, mcqsCount: 0, mcqScore: 0, flashcardsCount: 0 };
      }
    },

    // Save specific progress part
    saveProgress: function (subjectId, moduleId, section, index, extraData = {}) {
      const key = `examprep_progress_${subjectId}_${moduleId}`;
      let progress = localStorage.getItem(key);
      progress = progress ? JSON.parse(progress) : { oneLinersRead: [], mcqsAnswered: {}, flashcardsViewed: [] };

      if (section === 'oneLiners') {
        if (!progress.oneLinersRead.includes(index)) {
          progress.oneLinersRead.push(index);
        }
      } else if (section === 'flashcards') {
        if (!progress.flashcardsViewed.includes(index)) {
          progress.flashcardsViewed.push(index);
        }
      } else if (section === 'mcqs') {
        if (!progress.mcqsAnswered) progress.mcqsAnswered = {};
        progress.mcqsAnswered[index] = {
          selectedOpt: extraData.selectedOpt,
          isCorrect: extraData.isCorrect
        };
      }

      localStorage.setItem(key, JSON.stringify(progress));
    },

    // 1. RENDER EXAM PREP DASHBOARD
    renderDashboard: function (container) {
      const self = this;
      const subjects = window.appState && window.appState.subjects ? window.appState.subjects : [];
      
      let subjectTabsHTML = `
        <button class="btn btn-secondary filter-tab ${this.activeSubjectFilter === 'all' ? 'active' : ''}" data-subject="all">All Subjects</button>
      `;
      subjects.forEach(subj => {
        subjectTabsHTML += `
          <button class="btn btn-secondary filter-tab ${this.activeSubjectFilter === subj.id ? 'active' : ''}" data-subject="${subj.id}">${subj.name}</button>
        `;
      });

      container.innerHTML = `
        <!-- Hero Header -->
        <section class="quote-hero" style="min-height: 180px; padding: var(--space-lg) var(--space-xl);">
          <h2 class="font-headline-xl quote-hero-text" style="font-size: 2rem; margin-bottom: var(--space-xxs);">
            Exam Revision Center
          </h2>
          <p class="quote-hero-author" style="font-style: normal; color: var(--text-secondary); margin-top: 0;">
            ⚡ Quick revision facts, flashcards, expandable questions, and 20-30 interactive MCQs per module. Revision optimized for 15-20 minutes.
          </p>
        </section>

        <!-- Search and Filter Bar -->
        <div class="search-filter-row flex justify-between align-center m-b-xl" style="margin-top: var(--space-lg); gap: var(--space-md); flex-wrap: wrap;">
          <div class="top-nav-search" style="margin-left: 0; max-width: 400px; width: 100%; border: 1px solid var(--border-color); background: var(--bg-card);">
            <span class="material-symbols-outlined search-icon">search</span>
            <input type="text" placeholder="Search modules, concepts, or formulas..." id="prepSearchInput" style="width: 100%;">
          </div>
          
          <div class="filter-tabs flex gap-md" style="flex-wrap: wrap; gap: var(--space-md);">
            ${subjectTabsHTML}
          </div>
        </div>

        <!-- Modules Grid Container -->
        <div id="prepModulesGrid" style="display: flex; flex-direction: column; gap: var(--space-xl); width: 100%;">
          <div class="card text-center" style="padding: var(--space-xl) 0; width: 100%;">
            <p style="color: var(--text-muted);">Loading revision modules...</p>
          </div>
        </div>
      `;

      // Event listener for tab filtering
      container.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          self.activeSubjectFilter = tab.dataset.subject;
          self.filterAndRenderGrid(container);
        });
      });

      // Event listener for search
      const searchInput = container.querySelector('#prepSearchInput');
      searchInput.addEventListener('input', () => {
        self.filterAndRenderGrid(container, searchInput.value.trim());
      });

      // Preload all module data, then render the grid
      window.ExamPrepData.preloadAll().then(() => {
        self.filterAndRenderGrid(container);
      });
    },

    // Filter and update modules grid
    filterAndRenderGrid: function (container, searchQuery = '') {
      const grid = container.querySelector('#prepModulesGrid');
      if (!grid) return;

      const subjects = window.appState && window.appState.subjects ? window.appState.subjects : [];
      let gridHTML = '';

      subjects.forEach(subj => {
        // Filter by subject tab
        if (this.activeSubjectFilter !== 'all' && this.activeSubjectFilter !== subj.id) {
          return;
        }

        let subjectModulesHTML = '';
        subj.modules.forEach(mod => {
          const prepData = window.ExamPrepData.getModuleData(subj.id, mod.id);
          const progress = this.getModuleProgress(subj.id, mod.id, prepData);

          // Search criteria
          if (searchQuery !== '') {
            const query = searchQuery.toLowerCase();
            const matchesSubject = subj.name.toLowerCase().includes(query) || subj.code.toLowerCase().includes(query);
            const matchesModule = mod.title.toLowerCase().includes(query) || `module ${mod.id}`.includes(query);
            
            // Check vocab and definitions
            const matchesVocab = prepData.oneLiners.some(o => o.fact.toLowerCase().includes(query)) ||
                                 prepData.flashCards.some(f => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query));

            if (!matchesSubject && !matchesModule && !matchesVocab) {
              return; // skip if no match
            }
          }

          subjectModulesHTML += `
            <div class="card subject-list-card" style="border-left: 4px solid ${subj.accentColor || 'var(--accent-primary)'}; display: flex; flex-direction: column; gap: var(--space-md);" onclick="if (!event.target.closest('a')) window.location.hash = '#/examprep/subject/${subj.id}/module/${mod.id}'">
              <div class="flex justify-between align-start">
                <div>
                  <span style="font-family: var(--font-mono); color: var(--text-muted); font-size: 0.8rem;">${subj.code} · Module ${mod.id}</span>
                  <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 2px; line-height: 1.3;">${mod.title}</h3>
                </div>
              </div>
              
              <div class="progress-container" style="margin-top: auto; flex-direction: column; align-items: stretch; gap: var(--space-xxs);">
                <div class="flex justify-between align-center" style="font-size: 0.75rem; font-family: var(--font-mono);">
                  <span style="color: var(--text-muted);">Revision Progress</span>
                  <span style="font-weight: 700; color: var(--text-primary);">${progress.percent}%</span>
                </div>
                <div class="progress-bar-bg" style="height: 6px;">
                  <div class="progress-bar-fill" style="width: ${progress.percent}%; background-color: ${subj.accentColor || 'var(--accent-primary)'};"></div>
                </div>
              </div>

              <div class="flex justify-between align-center" style="padding-top: var(--space-sm); border-top: 1px solid var(--border-color); font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-muted);">
                <span>One-Liners: ${progress.oneLinersCount}/${prepData.oneLiners.length}</span>
                <span>MCQs: ${progress.mcqsCount}/${prepData.mcqs.length}</span>
                <span>Score: ${progress.mcqScore}/${progress.mcqsCount || 0}</span>
              </div>
              
              <div class="flex justify-between align-center">
                <a href="#/examprep/subject/${subj.id}/module/${mod.id}" class="resume-link" style="font-size: 0.85rem;">
                  Start Revision &rarr;
                </a>
              </div>
            </div>
          `;
        });

        if (subjectModulesHTML !== '') {
          gridHTML += `
            <div class="subject-prep-group" style="width: 100%;">
              <h3 style="font-size: 1.3rem; font-weight: 800; border-bottom: 2px solid ${subj.accentColor || 'var(--accent-primary)'}; padding-bottom: 6px; margin-bottom: var(--space-md); color: var(--text-primary); display: flex; align-items: center; gap: var(--space-sm);">
                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${subj.accentColor || 'var(--accent-primary)'};"></span>
                ${subj.name} (${subj.code})
              </h3>
              <div class="subjects-grid-page" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-md);">
                ${subjectModulesHTML}
              </div>
            </div>
          `;
        }
      });

      if (gridHTML === '') {
        grid.innerHTML = `
          <div class="card text-center" style="padding: var(--space-xxl) 0; width: 100%;">
            <p style="color: var(--text-muted);">No revision modules match your search query.</p>
          </div>
        `;
      } else {
        grid.innerHTML = gridHTML;
      }
    },

    // 2. RENDER DETAILED MODULE REVISION PAGE OR MULTI-PAGES (Consolidated)
    renderModule: function (container, subjectId, moduleId, subRoute = '') {
      const self = this;
      const subjects = window.appState && window.appState.subjects ? window.appState.subjects : [];
      const subj = subjects.find(s => s.id === subjectId);
      if (!subj) {
        container.innerHTML = `<div class="card text-center"><p>Subject not found.</p></div>`;
        return;
      }

      const mod = subj.modules.find(m => m.id === moduleId);
      if (!mod) {
        container.innerHTML = `<div class="card text-center"><p>Module not found.</p></div>`;
        return;
      }

      // Show loading state while data is fetched
      container.innerHTML = `<div class="card text-center" style="padding: var(--space-xxl) 0;"><p style="color: var(--text-muted);">Loading revision content...</p></div>`;

      // Load data async, then render
      window.ExamPrepData.loadModuleData(subjectId, moduleId).then(function (prepData) {
        self._renderModuleContent(container, subjectId, moduleId, subRoute, subj, mod, prepData);
      });
    },

    // Internal: render module content once data is loaded
    _renderModuleContent: function (container, subjectId, moduleId, subRoute, subj, mod, prepData) {
      const self = this;
      const progress = self.getModuleProgress(subjectId, moduleId, prepData);
      const key = `examprep_progress_${subjectId}_${moduleId}`;
      const savedData = () => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : { oneLinersRead: [], mcqsAnswered: {}, flashcardsViewed: [] };

      // HTML Layout
      container.innerHTML = `
        <!-- Breadcrumb back link -->
        <div class="m-t-md m-b-xl" style="margin-top: var(--space-md); margin-bottom: var(--space-xl);">
          <a href="#/examprep" class="btn btn-ghost" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Revision Center
          </a>
        </div>

        <!-- Module Progress Header Banner -->
        <div class="card m-b-xl" style="border-left: 4px solid ${subj.accentColor || 'var(--accent-primary)'}; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <span style="font-family: var(--font-mono); color: var(--text-muted);">${subj.code} · Module ${moduleId}</span>
            <h2 style="font-size: 1.85rem; font-weight: 800; margin-top: 4px;">${mod.title}</h2>
          </div>
          <div style="font-family: var(--font-mono); font-weight: 800; font-size: 1.3rem; border: 1px solid var(--border-color); padding: var(--space-sm) var(--space-md); text-align: center; min-width: 180px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 500; margin-bottom: 2px;">Overall Progress</div>
            <span id="liveProgressPercent">${progress.percent}</span>%
            <div class="progress-bar-bg" style="height: 6px; margin-top: 4px; width: 100%;">
              <div id="liveProgressBarFill" class="progress-bar-fill" style="width: ${progress.percent}%; background-color: ${subj.accentColor || 'var(--accent-primary)'};"></div>
            </div>
          </div>
        </div>

        <!-- Tab Buttons Bar -->
        <div class="flex gap-md m-b-lg" style="border-bottom: 1px solid var(--border-color); padding-bottom: var(--space-sm); flex-wrap: wrap; gap: var(--space-md); margin-bottom: var(--space-lg);">
          <button class="btn btn-secondary tab-btn active" data-tab="oneliners">💡 One-Liners & Mnemonics</button>
          <button class="btn btn-secondary tab-btn" data-tab="flashcards">🎴 Flashcards</button>
          <button class="btn btn-secondary tab-btn" data-tab="mcqs">📝 MCQ Practice</button>
          <button class="btn btn-secondary tab-btn" data-tab="short">❓ Short Answers</button>
          <button class="btn btn-secondary tab-btn" data-tab="long">📚 Long Answers</button>
        </div>

        <!-- Content Area -->
        <div id="tabContent_oneliners" class="tab-content active-content">
          <div class="examprep-layout-grid" style="display: grid; grid-template-columns: 1fr; gap: var(--space-xl);">
            <div class="card-section">
              <div class="section-header" style="margin-bottom: var(--space-md);">
                <h3 class="section-title">1. One-Liners Checklist</h3>
                <p class="section-desc">Mark each core definition or formula completed as you review them.</p>
              </div>
              <div class="one-liners-list" id="oneLinersList" style="display: flex; flex-direction: column; gap: var(--space-xs);">
                <!-- Checklist items will be injected here -->
              </div>
            </div>
            <div class="card-section">
              <div class="section-header" style="margin-bottom: var(--space-md);">
                <h3 class="section-title">2. Memory Mnemonics</h3>
                <p class="section-desc">Visual association phrase cards to link concepts rapidly.</p>
              </div>
              <div class="mnemonics-grid" id="mnemonicsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-md);">
                <!-- Mnemonics will be injected here -->
              </div>
            </div>
          </div>
        </div>

        <div id="tabContent_flashcards" class="tab-content" style="display: none;">
          <div style="max-width: 480px; margin: var(--space-xl) auto; width: 100%;">
            <div class="flashcard-viewport" style="perspective: 1000px; height: 240px; position: relative; cursor: pointer; width: 100%;">
              <div class="flashcard-inner" id="flashcardInner" style="position: absolute; width: 100%; height: 100%; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d;">
                <div class="flashcard-face flashcard-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: var(--bg-card); border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: var(--space-lg); text-align: center; border-radius: var(--radius-md);">
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: var(--space-md);">Question (Click to flip)</span>
                  <p id="flashcardFrontText" style="font-size: 1.15rem; font-weight: 600; line-height: 1.5; color: var(--text-primary);"></p>
                </div>
                <div class="flashcard-face flashcard-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: var(--bg-card-hover); border: 1px solid var(--border-color-hover); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: var(--space-lg); text-align: center; border-radius: var(--radius-md); transform: rotateY(180deg);">
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: var(--space-md);">Answer (Click to flip)</span>
                  <p id="flashcardBackText" style="font-size: 1.05rem; line-height: 1.5; color: var(--text-secondary);"></p>
                </div>
              </div>
            </div>
            <div class="flex justify-between align-center m-t-md" style="margin-top: var(--space-md);">
              <button class="btn btn-secondary" id="prevCardBtn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">&larr; Prev</button>
              <span id="flashcardCounter" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">Card 1 of X</span>
              <button class="btn btn-secondary" id="nextCardBtn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Next &rarr;</button>
            </div>
          </div>
        </div>

        <div id="tabContent_mcqs" class="tab-content" style="display: none;">
          <div id="mcqsList" style="display: flex; flex-direction: column; gap: var(--space-md); max-width: 800px; margin: 0 auto;">
            <!-- MCQs will be injected here -->
          </div>
        </div>

        <div id="tabContent_short" class="tab-content" style="display: none;">
          <div class="practice-list" id="shortQuestionsList" style="max-width: 800px; margin: 0 auto;">
            <!-- Short Qs accordions will be injected here -->
          </div>
        </div>

        <div id="tabContent_long" class="tab-content" style="display: none;">
          <div class="long-questions-list" id="longQuestionsList" style="display: flex; flex-direction: column; gap: var(--space-lg); max-width: 800px; margin: 0 auto;">
            <!-- Long Qs cards will be injected here -->
          </div>
        </div>
      `;

      // Helper function to update the progress bar in real-time
      const updateProgressDOM = () => {
        const liveProgress = self.getModuleProgress(subjectId, moduleId, prepData);
        const textElement = container.querySelector('#liveProgressPercent');
        const fillElement = container.querySelector('#liveProgressBarFill');
        if (textElement) textElement.textContent = liveProgress.percent;
        if (fillElement) fillElement.style.width = `${liveProgress.percent}%`;
      };

      // ----------------------------------------------------
      // SECTION 1: ONE-LINERS & MNEMONICS
      // ----------------------------------------------------
      const renderOneLiners = () => {
        const currentData = savedData();
        const oneLinersList = container.querySelector('#oneLinersList');
        let oneLinersHTML = '';
        prepData.oneLiners.forEach((o, index) => {
          const isChecked = currentData.oneLinersRead.includes(index);
          oneLinersHTML += `
            <div class="one-liner-card card flex justify-between align-center ${isChecked ? 'read' : ''}" data-index="${index}" style="padding: var(--space-sm) var(--space-md); cursor: pointer; gap: var(--space-md); border-left: 3px solid var(--border-color);">
              <div style="display: flex; align-items: center; gap: var(--space-md);">
                <span class="badge badge-major" style="font-size: 0.7rem; font-family: var(--font-mono);">${o.category}</span>
                <p class="one-liner-text" style="margin-bottom: 0; font-size: 0.95rem; color: ${isChecked ? 'var(--text-muted)' : 'var(--text-primary)'}; text-decoration: ${isChecked ? 'line-through' : 'none'};">${o.fact}</p>
              </div>
              <button class="one-liner-check-btn flex align-center justify-center" style="width: 22px; height: 22px; border: 1px solid ${isChecked ? 'var(--text-muted)' : 'var(--border-color-hover)'}; background: ${isChecked ? 'var(--text-primary)' : 'transparent'}; border-radius: var(--radius-sm);">
                ${isChecked ? `<span style="color: var(--bg-primary); font-size: 14px; font-weight: bold;">✓</span>` : ''}
              </button>
            </div>
          `;
        });
        oneLinersList.innerHTML = oneLinersHTML;

        // Bind clicks
        oneLinersList.querySelectorAll('.one-liner-card').forEach(card => {
          card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index, 10);
            const freshData = savedData();
            if (freshData.oneLinersRead.includes(index)) return; // already read

            self.saveProgress(subjectId, moduleId, 'oneLiners', index);
            card.classList.add('read');
            const txt = card.querySelector('.one-liner-text');
            txt.style.color = 'var(--text-muted)';
            txt.style.textDecoration = 'line-through';
            const btn = card.querySelector('.one-liner-check-btn');
            btn.style.background = 'var(--text-primary)';
            btn.style.borderColor = 'var(--text-muted)';
            btn.innerHTML = `<span style="color: var(--bg-primary); font-size: 14px; font-weight: bold;">✓</span>`;
            updateProgressDOM();
          });
        });

        // Render Mnemonics
        const mnemonicsGrid = container.querySelector('#mnemonicsGrid');
        let mnemonicsHTML = '';
        prepData.mnemonics.forEach(m => {
          mnemonicsHTML += `
            <div class="card" style="border: 1px dashed var(--border-color-hover); background: var(--bg-card-hover); padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-xs);">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Mnemonic Concept</div>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">${m.concept}</h4>
              <div class="mnemonic-phrase" style="font-size: 1rem; color: var(--text-primary); font-family: var(--font-mono); font-weight: 700; background: var(--bg-surface); padding: var(--space-xs); border: 1px solid var(--border-color); text-align: center; margin: var(--space-xxs) 0;">
                ${m.phrase}
              </div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">${m.association}</p>
            </div>
          `;
        });
        mnemonicsGrid.innerHTML = mnemonicsHTML;
      };

      // ----------------------------------------------------
      // SECTION 2: FLASHCARDS
      // ----------------------------------------------------
      const renderFlashcards = () => {
        self.currentCardIdx = 0;
        const flashcardInner = container.querySelector('#flashcardInner');
        const flashcardFrontText = container.querySelector('#flashcardFrontText');
        const flashcardBackText = container.querySelector('#flashcardBackText');
        const flashcardCounter = container.querySelector('#flashcardCounter');
        const prevCardBtn = container.querySelector('#prevCardBtn');
        const nextCardBtn = container.querySelector('#nextCardBtn');

        const updateFlashcard = () => {
          flashcardInner.style.transform = 'rotateY(0deg)';
          
          setTimeout(() => {
            const card = prepData.flashCards[self.currentCardIdx];
            flashcardFrontText.textContent = card.question;
            flashcardBackText.textContent = card.answer;
            flashcardCounter.textContent = `Card ${self.currentCardIdx + 1} of ${prepData.flashCards.length}`;

            // Save progress if not already saved
            const freshData = savedData();
            const alreadyViewed = freshData.flashcardsViewed.includes(self.currentCardIdx);
            if (!alreadyViewed) {
              self.saveProgress(subjectId, moduleId, 'flashcards', self.currentCardIdx);
              updateProgressDOM();
            }

            if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
              window.MathJax.typesetPromise([flashcardFrontText, flashcardBackText]).catch(e => console.error(e));
            }
          }, 100);
        };

        let isFlipped = false;
        const viewport = container.querySelector('.flashcard-viewport');
        viewport.addEventListener('click', () => {
          isFlipped = !isFlipped;
          flashcardInner.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        });

        prevCardBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          isFlipped = false;
          if (self.currentCardIdx > 0) {
            self.currentCardIdx--;
            updateFlashcard();
          }
        });

        nextCardBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          isFlipped = false;
          if (self.currentCardIdx < prepData.flashCards.length - 1) {
            self.currentCardIdx++;
            updateFlashcard();
          }
        });

        updateFlashcard();
      };

      // ----------------------------------------------------
      // SECTION 3: MCQS
      // ----------------------------------------------------
      const renderMCQs = () => {
        const currentData = savedData();
        const mcqsList = container.querySelector('#mcqsList');
        let mcqsHTML = '';
        prepData.mcqs.forEach((q, qIndex) => {
          const hasAnswered = currentData.mcqsAnswered && currentData.mcqsAnswered[qIndex] !== undefined;
          const savedAnswer = hasAnswered ? currentData.mcqsAnswered[qIndex] : null;

          let optionsHTML = '';
          q.options.forEach((opt, optIndex) => {
            let extraClass = '';
            if (hasAnswered) {
              if (optIndex === q.correct) {
                extraClass = 'correct';
              } else if (optIndex === savedAnswer.selectedOpt) {
                extraClass = 'wrong';
              }
            }

            optionsHTML += `
              <div class="quiz-option mcq-option-item ${extraClass}" data-qindex="${qIndex}" data-optindex="${optIndex}" style="${hasAnswered ? 'cursor: default;' : 'cursor: pointer;'}">
                <div class="quiz-option-marker">${String.fromCharCode(65 + optIndex)}</div>
                <div class="quiz-option-text">${opt}</div>
              </div>
            `;
          });

          mcqsHTML += `
            <div class="card mcq-question-card" id="mcq-card-${qIndex}" style="display: flex; flex-direction: column; gap: var(--space-sm);">
              <div class="flex justify-between align-center" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                <span>Practice MCQ ${qIndex + 1}</span>
                <span class="mcq-status" style="font-weight: bold; color: ${hasAnswered ? (savedAnswer.isCorrect ? 'var(--color-success)' : 'var(--color-error)') : 'var(--text-muted)'};">${hasAnswered ? (savedAnswer.isCorrect ? '✓ Correct' : '✗ Incorrect') : 'Unanswered'}</span>
              </div>
              <p class="quiz-question-text" style="font-weight: 600; margin-bottom: 2px;">${q.question}</p>
              <div class="quiz-options-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-xs);">
                ${optionsHTML}
              </div>
              <div class="quiz-explanation mcq-explanation-box" style="display: ${hasAnswered ? 'block' : 'none'}; background: var(--bg-surface); padding: var(--space-sm); border-left: 3px solid var(--border-color); font-size: 0.85rem; margin-top: var(--space-xxs);">
                <strong>Explanation:</strong> ${q.explanation}
              </div>
            </div>
          `;
        });
        mcqsList.innerHTML = mcqsHTML;

        // Bind clicks
        mcqsList.querySelectorAll('.mcq-option-item').forEach(opt => {
          opt.addEventListener('click', () => {
            const qIndex = parseInt(opt.dataset.qindex, 10);
            const optIndex = parseInt(opt.dataset.optindex, 10);

            const qCard = mcqsList.querySelector(`#mcq-card-${qIndex}`);
            const statusSpan = qCard.querySelector('.mcq-status');
            if (statusSpan.textContent !== 'Unanswered') return;

            const q = prepData.mcqs[qIndex];
            const isCorrect = optIndex === q.correct;

            self.saveProgress(subjectId, moduleId, 'mcqs', qIndex, { selectedOpt: optIndex, isCorrect: isCorrect });

            const options = qCard.querySelectorAll('.mcq-option-item');
            options.forEach((o, idx) => {
              o.style.cursor = 'default';
              if (idx === q.correct) {
                o.classList.add('correct');
              } else if (idx === optIndex) {
                o.classList.add('wrong');
              }
            });

            const expBox = qCard.querySelector('.mcq-explanation-box');
            expBox.style.display = 'block';
            statusSpan.textContent = isCorrect ? '✓ Correct' : '✗ Incorrect';
            statusSpan.style.color = isCorrect ? 'var(--color-success)' : 'var(--color-error)';

            updateProgressDOM();

            if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
              window.MathJax.typesetPromise([qCard]).catch(e => console.error(e));
            }

            if (isCorrect && typeof window.confetti === 'function') {
              const freshSaved = savedData();
              const correctCount = Object.values(freshSaved.mcqsAnswered).filter(v => v.isCorrect).length;
              if (correctCount === prepData.mcqs.length) {
                window.confetti({ particleCount: 100, spread: 60, origin: { y: 0.8 } });
              }
            }
          });
        });
      };

      // ----------------------------------------------------
      // SECTION 4: SHORT QUESTIONS
      // ----------------------------------------------------
      const renderShortQs = () => {
        const shortQuestionsList = container.querySelector('#shortQuestionsList');
        let shortHTML = '';
        prepData.shortQuestions.forEach((q, index) => {
          shortHTML += `
            <div class="practice-question-card" id="short-card-${index}">
              <div class="practice-question-header flex justify-between align-center" data-index="${index}" style="cursor: pointer; padding: var(--space-md); border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-card); transition: all var(--transition-fast);">
                <span style="font-weight: 600;">Q${index + 1}: ${q.question}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron" style="transition: transform var(--transition-normal);"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <div class="practice-answer-body" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; background: var(--bg-surface); border-left: 3px solid var(--border-color); padding: 0 var(--space-md);">
                <div style="padding-top: var(--space-xs); font-style: italic; color: var(--text-muted); font-size: 0.85rem; margin-bottom: var(--space-xxs);">Model Answer:</div>
                <div class="answer-text" style="padding-bottom: var(--space-md); color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${q.answer}</div>
              </div>
            </div>
          `;
        });
        shortQuestionsList.innerHTML = shortHTML;

        // Bind clicks
        shortQuestionsList.querySelectorAll('.practice-question-header').forEach(hdr => {
          hdr.addEventListener('click', () => {
            const index = hdr.dataset.index;
            const card = shortQuestionsList.querySelector(`#short-card-${index}`);
            const answerBody = card.querySelector('.practice-answer-body');
            const chevron = hdr.querySelector('.chevron');

            const isOpen = card.classList.contains('active');
            if (isOpen) {
              card.classList.remove('active');
              answerBody.style.maxHeight = '0px';
              chevron.style.transform = 'rotate(0deg)';
            } else {
              card.classList.add('active');
              answerBody.style.maxHeight = answerBody.scrollHeight + 'px';
              chevron.style.transform = 'rotate(180deg)';
            }
          });
        });
      };

      // ----------------------------------------------------
      // SECTION 5: LONG QUESTIONS
      // ----------------------------------------------------
      const renderLongQs = () => {
        const longQuestionsList = container.querySelector('#longQuestionsList');
        let longHTML = '';
        prepData.longQuestions.forEach((q, index) => {
          const keyPointsList = q.keyPoints ? q.keyPoints.map(kp => `<li style="margin-bottom: var(--space-xxs); position: relative; padding-left: 12px;"><span style="position: absolute; left: 0; color: var(--text-muted);">&bull;</span>${kp}</li>`).join('') : '';
          longHTML += `
            <div class="card" style="display: flex; flex-direction: column; gap: var(--space-sm); border-left: 4px solid ${subj.accentColor || 'var(--accent-primary)'};">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Long Question ${index + 1} (5 Marks)</div>
              <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); line-height: 1.4;">${q.question}</h4>
              
              <div style="margin-top: var(--space-xs); font-style: italic; color: var(--text-muted); font-size: 0.85rem;">Detailed Answer:</div>
              <div class="long-answer-text" style="color: var(--text-secondary); line-height: 1.75; font-size: 0.95rem; white-space: pre-line;">${q.answer}</div>
              
              ${keyPointsList ? `
                <div class="highlight-box" style="margin-top: var(--space-md); padding: var(--space-sm) var(--space-md); background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                  <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-primary); font-weight: bold; margin-bottom: var(--space-xs); text-transform: uppercase;">Key Points to Highlight in Exam:</div>
                  <ul style="list-style: none; margin-left: 0; color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5;">
                    ${keyPointsList}
                  </ul>
                </div>
              ` : ''}
            </div>
          `;
        });
        longQuestionsList.innerHTML = longHTML;
      };

      // Initial renders of sections
      renderOneLiners();
      renderFlashcards();
      renderMCQs();
      renderShortQs();
      renderLongQs();

      // Tab Toggling Logic
      const tabs = container.querySelectorAll('.tab-btn');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all tab buttons
          tabs.forEach(t => t.classList.remove('active'));
          // Add active class to current tab button
          tab.classList.add('active');

          // Hide all tab contents
          container.querySelectorAll('.tab-content').forEach(tc => {
            tc.style.display = 'none';
            tc.classList.remove('active-content');
          });

          // Show targeted tab content
          const targetTab = tab.dataset.tab;
          const targetContent = container.querySelector(`#tabContent_${targetTab}`);
          if (targetContent) {
            targetContent.style.display = 'block';
            targetContent.classList.add('active-content');
          }

          // Typeset any mathematical symbols inside the newly visible container
          if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            window.MathJax.typesetPromise([targetContent]).catch(e => console.error(e));
          }
        });
      });

      // Compile math formulas if CDN is loaded initially
      if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise([container]).catch(e => console.error(e));
      }
    }
  };

  window.ExamPrep = ExamPrep;
})();
