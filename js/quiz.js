// js/quiz.js - MCQ Testing Engine & Practice Questions Accordion
(function () {
  const Quiz = {
    // Current quiz state variables
    currentIdx: 0,
    mcqs: [],
    selectedOpt: null,
    answers: [], // holds true/false results per question
    score: 0,
    subjectId: '',
    moduleId: 1,

    // 1. Initialize MCQ Quiz UI
    init: function (container, mcqs, subjectId, moduleId) {
      if (!container) return;
      if (!mcqs || mcqs.length === 0) {
        container.style.display = 'none';
        return;
      }
      container.style.display = 'block';

      // Reset state
      this.currentIdx = 0;
      this.mcqs = mcqs;
      this.selectedOpt = null;
      this.answers = [];
      this.score = 0;
      this.subjectId = subjectId;
      this.moduleId = moduleId;

      this.renderQuestion(container);
    },

    // Render active question details
    renderQuestion: function (container) {
      const q = this.mcqs[this.currentIdx];
      const isLast = this.currentIdx === this.mcqs.length - 1;

      container.innerHTML = `
        <div class="quiz-header">
          <h3 class="quiz-title">Interactive MCQ Practice</h3>
          <span class="quiz-progress">Question ${this.currentIdx + 1} of ${this.mcqs.length}</span>
        </div>

        <div class="card quiz-question-box">
          <p class="quiz-question-text" id="quizQuestionText">${q.question}</p>
          
          <div class="quiz-options-grid" id="quizOptionsGrid">
            ${q.options.map((opt, idx) => `
              <div class="quiz-option" data-index="${idx}">
                <div class="quiz-option-marker">${String.fromCharCode(65 + idx)}</div>
                <div class="quiz-option-text">${opt}</div>
              </div>
            `).join('')}
          </div>

          <!-- Explanation box (hidden initially) -->
          <div class="quiz-explanation" id="quizExplanationBox" style="display: none;">
            <strong style="display: block; margin-bottom: 4px;">Explanation:</strong>
            <span>${q.explanation}</span>
          </div>

          <!-- Control Button Row -->
          <div class="flex justify-between align-center m-t-lg" style="margin-top: var(--space-lg);">
            <div id="quizStatusMsg" style="font-weight: 600;"></div>
            <button id="quizActionBtn" class="btn btn-primary" disabled style="padding: 0.5rem 1.5rem;">
              Submit Answer
            </button>
          </div>
        </div>
      `;

      const options = container.querySelectorAll('.quiz-option');
      const actionBtn = container.querySelector('#quizActionBtn');
      const explanationBox = container.querySelector('#quizExplanationBox');
      const statusMsg = container.querySelector('#quizStatusMsg');
      const questionTextEl = container.querySelector('#quizQuestionText');

      // Typeset formulas in question box
      if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise([questionTextEl, ...container.querySelectorAll('.quiz-option-text')]).catch(err => console.error(err));
      }

      this.selectedOpt = null;

      // Handle Option Clicks
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          // If already checked, click is disabled
          if (actionBtn.dataset.state === 'answered') return;

          options.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          this.selectedOpt = parseInt(opt.getAttribute('data-index'), 10);
          actionBtn.removeAttribute('disabled');
        });
      });

      // Handle Submit / Next Button clicks
      actionBtn.addEventListener('click', () => {
        const stateAttr = actionBtn.dataset.state;

        if (stateAttr !== 'answered') {
          // Submit and Validate Answer
          actionBtn.dataset.state = 'answered';
          const isCorrect = this.selectedOpt === q.correct;
          this.answers.push(isCorrect);
          
          if (isCorrect) {
            this.score++;
            options[this.selectedOpt].classList.add('correct');
            statusMsg.innerHTML = `<span style="color: var(--color-success); display: flex; align-items: center; gap: 4px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Correct Answer!
            </span>`;
          } else {
            options[this.selectedOpt].classList.add('wrong');
            options[q.correct].classList.add('correct'); // Highlight correct answer
            statusMsg.innerHTML = `<span style="color: var(--color-error); display: flex; align-items: center; gap: 4px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              Incorrect Answer
            </span>`;
          }

          // Show explanation
          explanationBox.style.display = 'block';
          if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            window.MathJax.typesetPromise([explanationBox]).catch(err => console.error(err));
          }

          // Update action button
          actionBtn.textContent = isLast ? 'Finish Quiz' : 'Next Question';
        } else {
          // Proceed to next question or end
          if (isLast) {
            this.showResults(container);
          } else {
            this.currentIdx++;
            this.renderQuestion(container);
          }
        }
      });
    },

    // Show final scorecard summary
    showResults: function (container) {
      const percentage = Math.round((this.score / this.mcqs.length) * 100);

      // Save quiz details to localStorage
      const quizResult = {
        score: this.score,
        total: this.mcqs.length,
        percent: percentage,
        date: new Date().toLocaleDateString()
      };
      localStorage.setItem(`quiz_${this.subjectId}_${this.moduleId}`, JSON.stringify(quizResult));

      container.innerHTML = `
        <div class="quiz-score-display card">
          <h3 style="font-weight: 700; margin-bottom: var(--space-md);">Quiz Completed!</h3>
          <div class="quiz-score-num">${this.score} / ${this.mcqs.length}</div>
          <p style="color: var(--text-secondary); margin-bottom: var(--space-lg); font-size: 1.1rem;">
            You scored <strong>${percentage}%</strong> on this module test.
          </p>
          <div class="flex justify-center gap-md" style="justify-content: center; gap: var(--space-md);">
            <button id="retakeQuizBtn" class="btn btn-secondary">Retake Quiz</button>
            <a href="#/subject/${this.subjectId}" class="btn btn-primary">Back to Subject</a>
          </div>
        </div>
      `;

      // Trigger Confetti explosion for high scores (>= 80%)
      if (percentage >= 80 && typeof window.confetti === 'function') {
        window.confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      // Bind retake action
      container.querySelector('#retakeQuizBtn').addEventListener('click', () => {
        this.init(container, this.mcqs, this.subjectId, this.moduleId);
      });
    },

    // 2. Initialize Collapsible Practice Questions Accordion
    initPracticeQuestions: function (container, practiceQs) {
      if (!container) return;
      if (!practiceQs || practiceQs.length === 0) {
        container.style.display = 'none';
        return;
      }
      container.style.display = 'block';

      container.innerHTML = `
        <div class="section-header" style="margin-top: 0; margin-bottom: var(--space-md);">
          <h3 class="section-title">Practice & Review Questions</h3>
          <p class="section-desc">Short answer questions. Click to reveal standard model responses.</p>
        </div>
        
        <div class="practice-list" id="practiceQuestionsList">
          ${practiceQs.map((q, idx) => `
            <div class="practice-question-card" id="practice-card-${idx}">
              <div class="practice-question-header" data-index="${idx}">
                <span>Q${idx + 1}: ${q.question}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div class="practice-answer-body">
                <div style="padding-top: var(--space-xs); font-style: italic; color: var(--text-muted); font-size: 0.85rem; margin-bottom: var(--space-xs);">Model Answer:</div>
                <div class="answer-text">${q.answer}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      // Render MathJax equations in questions and answers
      if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise([container]).catch(err => console.error(err));
      }

      // Bind collapsible event handlers
      container.querySelectorAll('.practice-question-header').forEach(header => {
        header.addEventListener('click', () => {
          const idx = header.getAttribute('data-index');
          const card = container.querySelector(`#practice-card-${idx}`);
          card.classList.toggle('active');
        });
      });
    }
  };

  window.Quiz = Quiz;
})();
