// js/renderer.js - Core Syllabus Content Rendering Engine
(function () {
  const Renderer = {
    // Current module data stored locally
    currentData: null,

    // Dynamic Module Loader
    renderModule: async function (container, subjectId, moduleId) {
      // 1. Render Loading State
      container.innerHTML = `
        <div style="text-align: center; padding: var(--space-xxl) 0;">
          <div class="card" style="display: inline-block; max-width: 320px; text-align: center;">
            <h3 style="font-weight: 600; margin-bottom: var(--space-md);">Loading Course Materials...</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Fetching Module ${moduleId} JSON from the server.</p>
          </div>
        </div>
      `;

      try {
        // 2. Fetch Module JSON Data
        const response = await fetch(`data/${subjectId}/module${moduleId}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load module content (HTTP ${response.status})`);
        }
        const data = await response.json();
        this.currentData = data;

        // Record recently opened module in history tracking
        if (window.appState && typeof window.appState.recordRecentlyOpened === 'function') {
          window.appState.recordRecentlyOpened(subjectId, moduleId);
        }

        // 3. Get Subject Information for accenting
        const subjectCode = window.appState && window.appState.subjects 
          ? window.appState.subjects.find(s => s.id === subjectId)?.code || ''
          : subjectId.toUpperCase();
        
        const accentColor = window.appState && window.appState.subjects
          ? window.appState.subjects.find(s => s.id === subjectId)?.accentColor || '#888888'
          : '#888888';

        // 4. Retrieve completion status
        const storedProgress = localStorage.getItem(`progress_${subjectId}`);
        const progressObj = storedProgress ? JSON.parse(storedProgress) : {};
        const isCompleted = progressObj[moduleId] === true;

        // 5. Build Layout Structure
        container.innerHTML = `
          <div class="module-layout">
            <div class="reading-column">
              
              <!-- Back and Mark Completed Controls -->
              <div class="flex justify-between align-center m-b-lg" style="margin-bottom: var(--space-lg); flex-wrap: wrap; gap: var(--space-sm);">
                <a href="#/subject/${subjectId}" class="btn btn-ghost" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Curriculum
                </a>
                
                <button id="toggleCompleteBtn" class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}" style="padding: 0.4rem 1rem; font-size: 0.85rem;">
                  ${isCompleted ? '✓ Completed' : 'Mark as Completed'}
                </button>
              </div>

              <!-- Module Card Banner -->
              <div class="card m-b-lg" style="border-left: 4px solid ${accentColor};">
                <span style="font-family: var(--font-mono); color: var(--text-muted);">${subjectCode} · Module ${moduleId} · ${data.hours || '3H'}</span>
                <h2 style="font-size: 1.85rem; font-weight: 800; margin-top: 4px;">${data.title}</h2>
              </div>

              <!-- Topic Content Area -->
              <div id="moduleContentArea" class="module-content card">
                <!-- Content injected dynamically -->
              </div>

              <!-- Previous / Next Controls -->
              <div class="module-navigation">
                ${moduleId > 1 
                  ? `<a href="#/subject/${subjectId}/module/${moduleId - 1}" class="btn btn-secondary" style="padding: 0.5rem 1rem;">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                       Previous Module
                     </a>`
                  : `<div></div>`
                }
                ${moduleId < 5
                  ? `<a href="#/subject/${subjectId}/module/${moduleId + 1}" class="btn btn-primary" style="padding: 0.5rem 1rem;">
                       Next Module
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                     </a>`
                  : `<a href="#/subject/${subjectId}" class="btn btn-primary" style="padding: 0.5rem 1rem;">
                       Subject Curriculum
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                     </a>`
                }
              </div>

              <!-- Collapsible Practice Questions -->
              <div id="practiceQuestionsArea" class="practice-questions-section"></div>

              <!-- MCQ Quiz Section -->
              <div id="quizArea" class="quiz-container"></div>
            </div>

            <!-- Table of Contents Column -->
            <div class="toc-column">
              <div class="toc-container">
                <h4 class="toc-title">On This Page</h4>
                <ul id="tocList" class="toc-list"></ul>
              </div>
            </div>
          </div>
        `;

        // 6. Bind Completion Toggle Button Click
        const toggleBtn = document.getElementById('toggleCompleteBtn');
        toggleBtn.addEventListener('click', () => {
          const requireQuiz = localStorage.getItem('require_quiz_to_complete') === 'true';
          const storedQuiz = localStorage.getItem(`quiz_${subjectId}_${moduleId}`);
          
          const stored = localStorage.getItem(`progress_${subjectId}`);
          const currentProgress = stored ? JSON.parse(stored) : {};
          const currentStatus = currentProgress[moduleId] === true;
          
          // If turning incomplete -> completed, and strict quiz rule is on
          if (!currentStatus && requireQuiz) {
            let quizPassed = false;
            if (storedQuiz) {
              try {
                const parsed = JSON.parse(storedQuiz);
                if (parsed.percent >= 60) {
                  quizPassed = true;
                }
              } catch (e) {}
            }
            
            if (!quizPassed) {
              alert("Study Rule Enforced: You must pass the Interactive MCQ Quiz for this module (score 60% or higher) before marking it completed manually.");
              return;
            }
          }
          
          currentProgress[moduleId] = !currentStatus;
          localStorage.setItem(`progress_${subjectId}`, JSON.stringify(currentProgress));
          
          // Sync changes back to global application state
          if (window.appState && window.appState.progress) {
            window.appState.progress[subjectId] = currentProgress;
          }

          // Re-render to update the view buttons and badges
          this.renderModule(container, subjectId, moduleId);
        });

        // 7. Render dynamic topics contents inside moduleContentArea
        const contentArea = document.getElementById('moduleContentArea');
        let htmlContent = '';
        data.topics.forEach((topic, idx) => {
          const topicId = `topic-${idx}`;
          htmlContent += `
            <div class="m-b-xl" style="margin-bottom: var(--space-xl);">
              <h3 id="${topicId}" class="topic-header" style="font-size: 1.4rem; font-weight: 700; margin-top: var(--space-lg); margin-bottom: var(--space-sm); scroll-margin-top: 90px;">
                ${topic.title}
              </h3>
          `;

          // Append key concept callout if exists
          if (topic.keyConcept) {
            htmlContent += `
              <div class="callout-concept">
                <div class="callout-concept-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  Key Concept
                </div>
                <div class="callout-concept-content">${topic.keyConcept}</div>
              </div>
            `;
          }

          htmlContent += `
              <div style="color: var(--text-secondary); line-height: 1.7;">
                ${topic.content}
              </div>
          `;

          // Append common mistakes callout if exists
          const mistakeContent = topic.commonMistakes || topic.commonMistake;
          if (mistakeContent) {
            htmlContent += `
              <div class="callout-mistake">
                <div class="callout-mistake-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  Common Mistake
                </div>
                <div class="callout-mistake-content">${mistakeContent}</div>
              </div>
            `;
          }
          
          // Append interview tips callout if exists
          if (topic.interviewTip) {
            htmlContent += `
              <div class="callout-tip">
                <div class="callout-tip-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line></svg>
                  Tip
                </div>
                <div class="callout-tip-content">${topic.interviewTip}</div>
              </div>
            `;
          }

          htmlContent += `</div>`; // Close topic wrap
        });
        contentArea.innerHTML = htmlContent;

        // 8. Style pre/code elements and inject Copy button
        contentArea.querySelectorAll('pre').forEach((pre, index) => {
          const code = pre.querySelector('code');
          if (!code) return;

          // Wrap pre inside .code-block container
          const wrapper = document.createElement('div');
          wrapper.className = 'code-block';
          
          const header = document.createElement('div');
          header.className = 'code-block-header';
          header.innerHTML = `
            <span>Code Snippet</span>
            <button class="copy-btn" id="copy-btn-${index}">Copy</button>
          `;

          pre.parentNode.insertBefore(wrapper, pre);
          wrapper.appendChild(header);
          wrapper.appendChild(pre);

          const copyBtn = header.querySelector('.copy-btn');
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(code.innerText).then(() => {
              copyBtn.textContent = 'Copied!';
              setTimeout(() => {
                copyBtn.textContent = 'Copy';
              }, 2000);
            });
          });
        });

        // 9. Generate TOC list nodes and bind smooth scroll
        const tocList = document.getElementById('tocList');
        const headings = contentArea.querySelectorAll('.topic-header');
        let tocHTML = '';
        
        headings.forEach((h) => {
          const headingId = h.getAttribute('id');
          tocHTML += `
            <li>
              <a href="javascript:void(0)" class="toc-link" data-target="${headingId}">
                ${h.innerText}
              </a>
            </li>
          `;
        });
        tocList.innerHTML = tocHTML;

        // Bind smooth scrolling on TOC click
        tocList.querySelectorAll('.toc-link').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });

        // 10. Implement Scroll-Spy observing headings
        if (window.activeIntersectionObserver) {
          window.activeIntersectionObserver.disconnect();
        }

        const observerOptions = {
          root: null,
          rootMargin: '-90px 0px -70% 0px',
          threshold: 0
        };

        const spyObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              tocList.querySelectorAll('.toc-link').forEach(link => {
                if (link.getAttribute('data-target') === id) {
                  link.classList.add('active');
                } else {
                  link.classList.remove('active');
                }
              });
            }
          });
        }, observerOptions);

        headings.forEach(h => spyObserver.observe(h));
        window.activeIntersectionObserver = spyObserver;

        // 11. Compile dynamic mathematical formulas (MathJax CDN trigger)
        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
          window.MathJax.typesetPromise([contentArea]).catch(err => console.error(err));
        }

        // 12. Setup Touch Swiping Actions (swipe left = next, swipe right = previous)
        this.setupSwipeActions(subjectId, moduleId);

        // 13. Initialize Practice Questions (accordion)
        if (window.Quiz && typeof window.Quiz.initPracticeQuestions === 'function') {
          window.Quiz.initPracticeQuestions(
            document.getElementById('practiceQuestionsArea'),
            data.practiceQuestions || []
          );
        }

        // 14. Initialize MCQ Quiz cards
        if (window.Quiz && typeof window.Quiz.init === 'function') {
          window.Quiz.init(
            document.getElementById('quizArea'),
            data.mcqs || [],
            subjectId,
            moduleId
          );
        }

      } catch (err) {
        console.error('Error rendering module content:', err);
        container.innerHTML = `
          <div class="card text-center" style="padding: var(--space-xxl) 0;">
            <h3 style="color: var(--color-error); margin-bottom: var(--space-md);">Failed to load module content</h3>
            <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">${err.message}</p>
            <a href="#/subject/${subjectId}" class="btn btn-primary">Return to subject details</a>
          </div>
        `;
      }
    },

    // Swiping Gestures setup
    setupSwipeActions: function (subjectId, moduleId) {
      let touchStartX = 0;
      let touchEndX = 0;
      const swipeThreshold = 120; //px min width for swipe

      const mainContent = document.querySelector('.main-content');
      if (!mainContent) return;

      // Clean up previous event listeners (to prevent multi-triggers)
      if (this._touchStartHandler) {
        mainContent.removeEventListener('touchstart', this._touchStartHandler);
        mainContent.removeEventListener('touchend', this._touchEndHandler);
      }

      this._touchStartHandler = function (e) {
        touchStartX = e.changedTouches[0].screenX;
      };

      this._touchEndHandler = function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0 && moduleId > 1) {
            // Swipe Right -> Go to Previous
            window.location.hash = `#/subject/${subjectId}/module/${moduleId - 1}`;
          } else if (diff < 0 && moduleId < 5) {
            // Swipe Left -> Go to Next
            window.location.hash = `#/subject/${subjectId}/module/${moduleId + 1}`;
          }
        }
      };

      mainContent.addEventListener('touchstart', this._touchStartHandler, { passive: true });
      mainContent.addEventListener('touchend', this._touchEndHandler, { passive: true });
    }
  };

  window.Renderer = Renderer;
})();
