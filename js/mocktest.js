// js/mocktest.js - AI Mock Test Generation & Testing Engine
(function () {
  const MockTest = {
    // State variables
    questions: [],
    answers: [], // Array of indices (0-3) selected by user, null if unanswered
    currentQuestionIdx: 0,
    timerSeconds: 0,
    totalDurationSeconds: 0,
    timerInterval: null,
    startTime: null,
    
    // Config state
    apiKey: '',
    apiModel: 'gemini-2.0-flash-lite',
    subjectId: 'se',
    moduleIds: ['1'],
    customSubject: '',
    customTopic: '',
    numQuestions: 20,
    timePerQuestionSec: 90,

    // Initializer/Router entry point
    render: function (container) {
      if (!container) return;
      this.clearTimer();
      this.renderSetup(container);
    },

    // 1. RENDER CONFIGURATION SETUP FORM
    renderSetup: function (container) {
      // Load stored configurations
      this.apiKey = localStorage.getItem('gemini_api_key') || '';
      this.apiModel = localStorage.getItem('gemini_api_model') || 'gemini-2.0-flash-lite';
      const lastSubject = localStorage.getItem('mock_last_subject') || 'se';
      const lastModuleStr = localStorage.getItem('mock_last_module') || '1';
      const lastModules = lastModuleStr.split(',');
      const lastTimePerQ = parseInt(localStorage.getItem('mock_last_time_per_q') || '90', 10);
      
      const subjects = window.appState && window.appState.subjects ? window.appState.subjects : [];

      container.innerHTML = `
        <div class="mock-test-setup-container card">
          <div class="section-header" style="margin-top: 0; margin-bottom: var(--space-md);">
            <h2 class="section-title">AI-Powered Mock Test</h2>
            <p class="section-desc">Generate custom MCQ mock tests based on your syllabus or custom topics using Gemini 3.1 Flash Lite / 2.0 Flash.</p>
          </div>

          <form id="mockConfigForm" style="display: flex; flex-direction: column; gap: var(--space-md);">
            
            <!-- Gemini API Key -->
            <div class="mock-form-group">
              <label for="mockApiKey">Gemini API Key</label>
              <div class="api-key-input-wrapper">
                <input type="password" id="mockApiKey" class="mock-input" placeholder="AIzaSy..." value="${this.apiKey}" required>
                <button type="button" class="api-key-toggle-btn" id="apiKeyToggleBtn" title="Toggle Visibility">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Stored locally in your browser and sent directly to Google APIs.</p>
            </div>

            <!-- Gemini Model Selection -->
            <div class="mock-form-group">
              <label for="mockModel">Gemini Model</label>
              <select id="mockModel" class="mock-select">
                <option value="gemini-2.0-flash-lite" ${this.apiModel === 'gemini-2.0-flash-lite' ? 'selected' : ''}>Gemini 2.0 Flash Lite (Recommended, Fast & Cost-effective)</option>
                <option value="gemini-3.1-flash-lite" ${this.apiModel === 'gemini-3.1-flash-lite' ? 'selected' : ''}>Gemini 3.1 Flash Lite</option>
                <option value="gemini-2.0-flash" ${this.apiModel === 'gemini-2.0-flash' ? 'selected' : ''}>Gemini 2.0 Flash</option>
                <option value="gemini-1.5-flash" ${this.apiModel === 'gemini-1.5-flash' ? 'selected' : ''}>Gemini 1.5 Flash</option>
                <option value="custom" ${!['gemini-2.0-flash-lite', 'gemini-3.1-flash-lite', 'gemini-2.0-flash', 'gemini-1.5-flash'].includes(this.apiModel) && this.apiModel ? 'selected' : ''}>Custom Model Name...</option>
              </select>
            </div>

            <!-- Custom Model Input Group -->
            <div class="mock-form-group" id="customModelGroup" style="display: none;">
              <label for="customModelName">Custom Model API String</label>
              <input type="text" id="customModelName" class="mock-input" placeholder="e.g. gemini-2.0-flash-lite-preview-02-05" value="${this.apiModel}">
            </div>

            <!-- Subject Selection -->
            <div class="mock-form-group">
              <label for="mockSubject">Subject</label>
              <select id="mockSubject" class="mock-select">
                ${subjects.map(s => `<option value="${s.id}" ${lastSubject === s.id ? 'selected' : ''}>${s.name} (${s.code})</option>`).join('')}
                <option value="custom" ${lastSubject === 'custom' ? 'selected' : ''}>Custom Subject / Field...</option>
              </select>
            </div>

            <!-- Custom Subject Input Group -->
            <div class="mock-form-group" id="customSubjectGroup" style="display: none;">
              <label for="customSubjectName">Subject Name</label>
              <input type="text" id="customSubjectName" class="mock-input" placeholder="e.g. Data Structures, Computer Networks">
            </div>

            <!-- Module / Topic Selection -->
            <div class="mock-form-group" id="moduleSelectGroup">
              <label>Syllabus Modules (Select one or more)</label>
              <div id="moduleCheckboxesContainer" style="display: flex; flex-direction: column; gap: var(--space-xs); background: var(--bg-surface); padding: var(--space-sm); border: 1px solid var(--border-color); max-height: 200px; overflow-y: auto;">
                <!-- Injected dynamically based on subject -->
              </div>
            </div>

            <!-- Custom Topic Input Group -->
            <div class="mock-form-group" id="customTopicGroup" style="display: none;">
              <label for="customTopicName">Topic / Models to Test On</label>
              <input type="text" id="customTopicName" class="mock-input" placeholder="e.g. Linear Regression, Greedy Algorithms, Dynamic Routing">
            </div>

            <!-- Slider: Question Count -->
            <div class="mock-form-group">
              <label for="mockQuestionsNum">Number of Questions (10 to 50)</label>
              <div class="slider-container">
                <input type="range" id="mockQuestionsNum" class="mock-slider" min="10" max="50" step="5" value="20">
                <span id="questionsVal" class="slider-val">20</span>
              </div>
            </div>

            <!-- Timer Dropdown -->
            <div class="mock-form-group">
              <label for="mockTimer">Time Per Question</label>
              <select id="mockTimer" class="mock-select">
                <option value="30" ${lastTimePerQ === 30 ? 'selected' : ''}>30 Seconds</option>
                <option value="45" ${lastTimePerQ === 45 ? 'selected' : ''}>45 Seconds</option>
                <option value="60" ${lastTimePerQ === 60 ? 'selected' : ''}>60 Seconds</option>
                <option value="90" ${lastTimePerQ === 90 ? 'selected' : ''}>90 Seconds (Default)</option>
                <option value="120" ${lastTimePerQ === 120 ? 'selected' : ''}>120 Seconds (2 mins)</option>
                <option value="180" ${lastTimePerQ === 180 ? 'selected' : ''}>180 Seconds (3 mins)</option>
                <option value="0" ${lastTimePerQ === 0 ? 'selected' : ''}>No Timer</option>
              </select>
            </div>

            <!-- Actions Row -->
            <div class="flex justify-between align-center m-t-lg" style="margin-top: var(--space-lg);">
              <div></div>
              <button type="submit" class="btn btn-primary" style="padding: 0.75rem 2rem;">
                Generate Mock Test
              </button>
            </div>

          </form>
        </div>
      `;

      // DOM Elements
      const form = container.querySelector('#mockConfigForm');
      const apiKeyInput = container.querySelector('#mockApiKey');
      const apiKeyToggle = container.querySelector('#apiKeyToggleBtn');
      const modelSelect = container.querySelector('#mockModel');
      const customModelGroup = container.querySelector('#customModelGroup');
      const customModelName = container.querySelector('#customModelName');
      const subjectSelect = container.querySelector('#mockSubject');
      const customSubjectGroup = container.querySelector('#customSubjectGroup');
      const customSubjectName = container.querySelector('#customSubjectName');
      const moduleSelectGroup = container.querySelector('#moduleSelectGroup');
      const moduleCheckboxesContainer = container.querySelector('#moduleCheckboxesContainer');
      const customTopicGroup = container.querySelector('#customTopicGroup');
      const customTopicName = container.querySelector('#customTopicName');
      const questionsSlider = container.querySelector('#mockQuestionsNum');
      const questionsVal = container.querySelector('#questionsVal');

      // Sync Slider display
      questionsSlider.addEventListener('input', () => {
        questionsVal.textContent = questionsSlider.value;
      });

      // API Key visibility toggle
      apiKeyToggle.addEventListener('click', () => {
        const icon = apiKeyToggle.querySelector('.material-symbols-outlined');
        if (apiKeyInput.type === 'password') {
          apiKeyInput.type = 'text';
          icon.textContent = 'visibility_off';
        } else {
          apiKeyInput.type = 'password';
          icon.textContent = 'visibility';
        }
      });

      // Show/Hide custom model field
      const toggleModelFields = () => {
        if (modelSelect.value === 'custom') {
          customModelGroup.style.display = 'flex';
          customModelName.setAttribute('required', 'true');
        } else {
          customModelGroup.style.display = 'none';
          customModelName.removeAttribute('required');
        }
      };
      modelSelect.addEventListener('change', toggleModelFields);
      toggleModelFields(); // trigger once to handle saved state

      // Populate Modules based on Subject Selection
      const updateModulesDropdown = () => {
        const subjId = subjectSelect.value;
        if (subjId === 'custom') {
          customSubjectGroup.style.display = 'flex';
          customSubjectName.setAttribute('required', 'true');
          moduleSelectGroup.style.display = 'none';
          customTopicGroup.style.display = 'flex';
          customTopicName.setAttribute('required', 'true');
          customTopicName.placeholder = 'e.g. Object-Oriented Principles, Database Normalization';
        } else {
          customSubjectGroup.style.display = 'none';
          customSubjectName.removeAttribute('required');
          moduleSelectGroup.style.display = 'flex';
          
          const subject = subjects.find(s => s.id === subjId);
          if (subject && subject.modules) {
            let optionsHTML = `
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: var(--space-xxs);">
                <input type="checkbox" id="selectAllModules" style="cursor: pointer;">
                <label for="selectAllModules" style="cursor: pointer; text-transform: none; color: var(--text-primary); font-weight: 600; font-size: 0.85rem;">Select All Modules</label>
              </div>
              <hr style="border: 0; border-top: 1px solid var(--border-color); margin: var(--space-xxs) 0;">
            `;
            
            subject.modules.forEach(m => {
              const isChecked = lastModules.includes(String(m.id));
              optionsHTML += `
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
                  <input type="checkbox" name="mockModules" value="${m.id}" id="modCheck-${m.id}" class="module-checkbox" ${isChecked ? 'checked' : ''} style="cursor: pointer;">
                  <label for="modCheck-${m.id}" style="cursor: pointer; text-transform: none; color: var(--text-secondary); font-weight: normal; font-size: 0.85rem;">Module ${m.id}: ${m.title}</label>
                </div>
              `;
            });
            
            const isCustomChecked = lastModules.includes('custom');
            optionsHTML += `
              <hr style="border: 0; border-top: 1px solid var(--border-color); margin: var(--space-xxs) 0;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="mockModules" value="custom" id="modCheck-custom" class="module-checkbox" ${isCustomChecked ? 'checked' : ''} style="cursor: pointer;">
                <label for="modCheck-custom" style="cursor: pointer; text-transform: none; color: var(--text-secondary); font-weight: normal; font-size: 0.85rem;">Custom Topic / Models...</label>
              </div>
            `;
            
            moduleCheckboxesContainer.innerHTML = optionsHTML;
            
            // Bind Select All
            const selectAllCheck = moduleCheckboxesContainer.querySelector('#selectAllModules');
            const checkboxes = moduleCheckboxesContainer.querySelectorAll('.module-checkbox:not(#modCheck-custom)');
            const customCheck = moduleCheckboxesContainer.querySelector('#modCheck-custom');
            
            selectAllCheck.addEventListener('change', () => {
              const isChecked = selectAllCheck.checked;
              checkboxes.forEach(cb => {
                cb.checked = isChecked;
              });
              if (isChecked) {
                customCheck.checked = false; // Uncheck custom if select all is checked
              }
              updateModuleFields();
            });
            
            checkboxes.forEach(cb => {
              cb.addEventListener('change', () => {
                const checkedCount = Array.from(checkboxes).filter(c => c.checked).length;
                selectAllCheck.checked = checkedCount === checkboxes.length;
                if (cb.checked) {
                  customCheck.checked = false; // Uncheck custom if a module checkbox is checked
                }
                updateModuleFields();
              });
            });
            
            customCheck.addEventListener('change', () => {
              if (customCheck.checked) {
                // Uncheck all standard modules
                selectAllCheck.checked = false;
                checkboxes.forEach(c => c.checked = false);
              }
              updateModuleFields();
            });

            // Initialize selectAll check state
            const checkedCount = Array.from(checkboxes).filter(c => c.checked).length;
            selectAllCheck.checked = checkedCount === checkboxes.length && checkboxes.length > 0;
          }
          updateModuleFields();
        }
      };

      const updateModuleFields = () => {
        const customCheck = moduleCheckboxesContainer.querySelector('#modCheck-custom');
        const isCustomChecked = customCheck && customCheck.checked;

        if (subjectSelect.value !== 'custom' && isCustomChecked) {
          customTopicGroup.style.display = 'flex';
          customTopicName.setAttribute('required', 'true');
          customTopicName.placeholder = 'e.g. Red Black Trees, SVM models, SRS generation';
        } else if (subjectSelect.value !== 'custom') {
          customTopicGroup.style.display = 'none';
          customTopicName.removeAttribute('required');
        }
      };

      subjectSelect.addEventListener('change', updateModulesDropdown);
      
      // Initialize dropdowns based on defaults
      updateModulesDropdown();

      // Form Submit Handler
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extract key and save it
        this.apiKey = apiKeyInput.value.trim();
        localStorage.setItem('gemini_api_key', this.apiKey);

        // Determine Gemini model parameter
        const modelSelection = modelSelect.value;
        if (modelSelection === 'custom') {
          this.apiModel = customModelName.value.trim();
        } else if (modelSelection === 'gemini-2.0-flash-lite') {
          this.apiModel = 'gemini-2.0-flash-lite-preview-02-05';
        } else {
          this.apiModel = modelSelection;
        }
        localStorage.setItem('gemini_api_model', modelSelection);

        // Gather test options
        this.subjectId = subjectSelect.value;
        localStorage.setItem('mock_last_subject', this.subjectId);

        if (this.subjectId === 'custom') {
          this.customSubject = customSubjectName.value.trim();
          this.customTopic = customTopicName.value.trim();
          this.moduleIds = ['custom'];
        } else {
          const selectedSubj = subjects.find(s => s.id === this.subjectId);
          this.customSubject = selectedSubj ? selectedSubj.name : this.subjectId;
          
          const checkedCheckboxes = Array.from(moduleCheckboxesContainer.querySelectorAll('.module-checkbox:checked'));
          this.moduleIds = checkedCheckboxes.map(cb => cb.value);

          if (this.moduleIds.length === 0) {
            alert("Please select at least one module or choose Custom Topic.");
            return;
          }

          localStorage.setItem('mock_last_module', this.moduleIds.join(','));

          if (this.moduleIds.includes('custom')) {
            this.customTopic = customTopicName.value.trim();
          } else {
            const selectedModules = selectedSubj.modules.filter(m => this.moduleIds.includes(String(m.id)));
            this.customTopic = selectedModules.map(m => `Module ${m.id}: ${m.title}`).join(', ');
          }
        }

        this.numQuestions = parseInt(questionsSlider.value, 10);
        this.timePerQuestionSec = parseInt(container.querySelector('#mockTimer').value, 10);
        localStorage.setItem('mock_last_time_per_q', this.timePerQuestionSec);
 
        // Trigger AI generator
        this.generateTest(container);
      });
    },

    // 2. GENERATE MOCK TEST WITH GEMINI API
    generateTest: async function (container) {
      // Show Premium Loader Screen
      container.innerHTML = `
        <div class="mock-loading-card">
          <div class="mock-loading-spinner"></div>
          <div class="mock-loading-status" id="mockLoadStatus">Connecting to Gemini...</div>
          <div class="mock-loading-desc" id="mockLoadDesc">Setting up mock exam configuration parameters.</div>
        </div>
      `;

      const loadStatus = container.querySelector('#mockLoadStatus');
      const loadDesc = container.querySelector('#mockLoadDesc');

      // Developer Mock / Testing Mode
      if (this.apiKey.toUpperCase() === 'MOCK' || this.apiKey.toLowerCase() === 'test') {
        loadStatus.textContent = 'Generating Mock Test (Dev Mode)...';
        loadDesc.textContent = 'Loading simulated questions for testing the timer, layout and navigation.';
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.questions = [
          {
            question: "What is the worst-case time complexity of searching in a Balanced Binary Search Tree (like AVL tree) with \\(n\\) nodes?",
            options: [
              "\\(O(1)\\)",
              "\\(O(\\log n)\\)",
              "\\(O(n)\\)",
              "\\(O(n \\log n)\\)"
            ],
            correct: 1,
            explanation: "In a balanced binary search tree, the height is maintained at \\(O(\\log n)\\). Therefore, operations like search, insertion, and deletion take \\(O(\\log n)\\) in the worst case."
          },
          {
            question: "Which software engineering process model is most suitable when requirements are well-defined, stable, and unlikely to change?",
            options: [
              "Spiral Model",
              "Waterfall Model",
              "Agile Scrum",
              "RAD Model"
            ],
            correct: 1,
            explanation: "The Waterfall model is linear and sequential, which works best for projects with clear, stable requirements where each phase can be completed before the next begins."
          },
          {
            question: "In React.js, which Hook is specifically designed to handle lifecycle side-effects in functional components?",
            options: [
              "useState",
              "useMemo",
              "useEffect",
              "useCallback"
            ],
            correct: 2,
            explanation: "The useEffect hook is used to perform side effects (data fetching, subscriptions, DOM updates) in functional components, replacing lifecycle methods like componentDidMount and componentDidUpdate."
          },
          {
            question: "Which type of machine learning task deals with predicting a continuous quantity, like house prices or temperature?",
            options: [
              "Classification",
              "Regression",
              "Clustering",
              "Association Rule Mining"
            ],
            correct: 1,
            explanation: "Regression models predict continuous values, whereas classification models predict discrete categories or labels."
          },
          {
            question: "Which algorithm finds the single-source shortest paths in a graph with positive edge weights, using a greedy approach?",
            options: [
              "Bellman-Ford Algorithm",
              "Floyd-Warshall Algorithm",
              "Dijkstra's Algorithm",
              "Kruskal's Algorithm"
            ],
            correct: 2,
            explanation: "Dijkstra's algorithm is a greedy algorithm that finds the shortest path from a single source node to all other nodes in a graph with non-negative edge weights."
          }
        ];

        // Duplicate/slice to match requested count
        while (this.questions.length < this.numQuestions) {
          this.questions = this.questions.concat(this.questions.map((q, idx) => ({
            ...q,
            question: `${q.question} (Duplicate Set ${Math.floor(this.questions.length / 5) + 1})`
          })));
        }
        this.questions = this.questions.slice(0, this.numQuestions);
        
        this.startExam(container);
        return;
      }

      // Enrich prompt with actual syllabus files if available
      let syllabusContext = '';
      if (this.subjectId !== 'custom' && !this.moduleIds.includes('custom')) {
        try {
          loadStatus.textContent = 'Analyzing local syllabus...';
          loadDesc.textContent = 'Enriching AI test generator parameters with syllabus lecture materials.';
          
          const fetchPromises = this.moduleIds.map(modId => 
            fetch(`data/${this.subjectId}/module${modId}.json`)
              .then(res => res.ok ? res.json() : null)
              .catch(e => {
                console.warn(`Failed to fetch module ${modId}:`, e);
                return null;
              })
          );
          
          const modulesData = await Promise.all(fetchPromises);
          
          syllabusContext = `Subject Name: ${this.customSubject}\n`;
          modulesData.forEach((data, index) => {
            if (data) {
              const modId = this.moduleIds[index];
              syllabusContext += `\nModule ${modId} Title: ${data.title}\n`;
              if (data.topics && Array.isArray(data.topics)) {
                syllabusContext += `Core Topics for Module ${modId}:\n` + 
                  data.topics.map(t => `- Topic: ${t.title}\n  Summary: ${t.keyConcept || ''} ${t.content.substring(0, 150)}...`).join('\n') + '\n';
              }
            }
          });
        } catch (e) {
          console.warn("Failed to enrich prompt from local JSON:", e);
        }
      }

      loadStatus.textContent = 'Generating questions...';
      loadDesc.textContent = `Drafting ${this.numQuestions} college-level MCQs. This might take 10-15 seconds.`;

      // Prompt engineering with schema
      const prompt = `You are a university college examiner for a Bachelor of Computer Applications (BCA) course.
Generate a structured mock test consisting of exactly ${this.numQuestions} Multiple Choice Questions (MCQs) for the subject "${this.customSubject}", specifically testing on the topic/module "${this.customTopic}".

${syllabusContext ? `Here is the official syllabus lecture content context to generate questions from:\n${syllabusContext}\n\n` : ''}
Guidelines:
1. Provide standard university exam level questions. Vary difficulty from easy to advanced.
2. Avoid generic questions; make them specific, technical, and accurate to the concepts.
3. Each question must have exactly 4 options.
4. Correct must be a 0-based integer index corresponding to the correct string option.
5. Provide a short, precise explanation explaining why that choice is correct and others are wrong.
6. Use LaTeX inline equation formatting if equations, math symbols, complexity notations (like Big O: \\(O(n)\\)), or code tokens are referenced.
7. Return raw JSON string matching the specified schema. Do not enclose in markdown codeblocks.`;

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.apiModel}:generateContent?key=${this.apiKey}`;

      const requestPayload = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              questions: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    question: { type: "STRING" },
                    options: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                      minItems: 4,
                      maxItems: 4
                    },
                    correct: { 
                      type: "INTEGER",
                      description: "0-based index of correct option" 
                    },
                    explanation: { type: "STRING" }
                  },
                  required: ["question", "options", "correct", "explanation"]
                }
              }
            },
            required: ["questions"]
          }
        }
      };

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestPayload)
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `HTTP error ${response.status}`;
          throw new Error(errMsg);
        }

        const resData = await response.json();
        
        // Extract content text
        const contentText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!contentText) {
          throw new Error("Empty response received from Gemini API.");
        }

        const parsedData = JSON.parse(contentText);
        if (!parsedData.questions || !Array.isArray(parsedData.questions) || parsedData.questions.length === 0) {
          throw new Error("No questions array found in response JSON.");
        }

        this.questions = parsedData.questions;
        // Start test!
        this.startExam(container);

      } catch (err) {
        console.error("Gemini Generation Error: ", err);
        container.innerHTML = `
          <div class="card text-center" style="max-width: 500px; margin: var(--space-xl) auto; padding: var(--space-xl);">
            <span class="material-symbols-outlined" style="font-size: 3rem; color: var(--color-error); margin-bottom: var(--space-md);">error</span>
            <h3 style="color: var(--color-error); margin-bottom: var(--space-md);">Generation Failed</h3>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-lg); font-size: 0.95rem;">
              Failed to connect or generate test from Gemini: <br>
              <strong style="color: var(--text-primary);">${err.message}</strong>
            </p>
            <div class="flex justify-center gap-md" style="justify-content: center; gap: var(--space-md);">
              <button id="retrySetupBtn" class="btn btn-primary">Adjust Configuration</button>
              ${this.apiModel !== 'gemini-2.0-flash-lite-preview-02-05' ? `
                <button id="fallbackModelBtn" class="btn btn-secondary">Use Default Model</button>
              ` : ''}
            </div>
          </div>
        `;

        container.querySelector('#retrySetupBtn').addEventListener('click', () => {
          this.renderSetup(container);
        });

        const fallbackBtn = container.querySelector('#fallbackModelBtn');
        if (fallbackBtn) {
          fallbackBtn.addEventListener('click', () => {
            this.apiModel = 'gemini-2.0-flash-lite-preview-02-05';
            localStorage.setItem('gemini_api_model', 'gemini-2.0-flash-lite');
            this.generateTest(container);
          });
        }
      }
    },

    // 3. START EXAM TIMER LOOP & LAYOUT
    startExam: function (container) {
      // Reset variables
      this.currentQuestionIdx = 0;
      this.answers = new Array(this.questions.length).fill(null);
      this.startTime = Date.now();
      
      if (this.timePerQuestionSec > 0) {
        this.totalDurationSeconds = this.questions.length * this.timePerQuestionSec;
      } else {
        this.totalDurationSeconds = 0;
      }
      this.timerSeconds = this.totalDurationSeconds;

      // Setup layout grid
      container.innerHTML = `
        <div class="m-t-md m-b-xl" style="margin-top: var(--space-md); margin-bottom: var(--space-xl); display: flex; justify-content: space-between; align-items: center;">
          <h2 style="font-size: 1.6rem; font-weight: 800; margin: 0;">Mock Exam</h2>
          <button id="quitExamBtn" class="btn btn-ghost" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; color: var(--color-error);">Quit Exam</button>
        </div>

        <div class="mock-test-layout">
          <!-- Left Main Column: Active Question -->
          <div class="mock-main-panel">
            
            <!-- Question Box -->
            <div class="card quiz-question-box" id="activeQuestionBox" style="margin-top: 0;">
              <!-- Dynamically populated -->
            </div>

            <!-- navigation button row -->
            <div class="flex justify-between align-center m-t-lg" style="margin-top: var(--space-lg);">
              <button id="prevQBtn" class="btn btn-secondary" style="padding: 0.5rem 1.5rem;">Previous</button>
              <button id="nextQBtn" class="btn btn-primary" style="padding: 0.5rem 1.5rem;">Next</button>
            </div>

          </div>

          <!-- Right Sidebar: Timer & Question Navigator Grid -->
          <div class="mock-side-panel">
            
            <!-- Countdown Timer Card -->
            ${this.totalDurationSeconds > 0 ? `
              <div class="mock-timer-card">
                <div class="mock-timer-row">
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Remaining Time</span>
                  <div class="mock-timer-display" id="timerDisplay">
                    <span class="material-symbols-outlined" style="font-size: 16px;">timer</span>
                    <span id="timerText">--:--</span>
                  </div>
                </div>
                <div class="mock-timer-bar">
                  <div class="mock-timer-fill" id="timerFill"></div>
                </div>
              </div>
            ` : ''}

            <!-- Navigator Grid Card -->
            <div class="question-grid-card">
              <div class="question-grid-title">Question Grid</div>
              <div class="question-grid" id="navigatorGrid">
                ${this.questions.map((_, idx) => `
                  <button class="question-grid-btn" data-index="${idx}">${idx + 1}</button>
                `).join('')}
              </div>
              <div style="margin-top: var(--space-md); border-top: 1px solid var(--border-color); padding-top: var(--space-sm); display: flex; flex-direction: column; gap: var(--space-xs); font-size: 0.75rem; color: var(--text-muted);">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="display: inline-block; width: 10px; height: 10px; border: 1px solid var(--border-color);"></span>
                  <span>Unanswered</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="display: inline-block; width: 10px; height: 10px; background: var(--border-color); border: 1px solid var(--border-color);"></span>
                  <span>Answered</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="display: inline-block; width: 10px; height: 10px; border: 1px solid var(--text-primary);"></span>
                  <span>Current Question</span>
                </div>
              </div>
            </div>

            <!-- Submit Exam Card -->
            <button id="submitExamBtn" class="btn btn-primary" style="width: 100%; margin-top: var(--space-md); padding: 0.75rem 1rem; font-weight: 700;">
              Submit Exam
            </button>

          </div>
        </div>
      `;

      // Setup Timer loop if timer is set
      if (this.totalDurationSeconds > 0) {
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
          this.timerSeconds--;
          this.updateTimerDisplay();

          if (this.timerSeconds <= 0) {
            this.clearTimer();
            alert("Time limit reached! Your exam is being automatically submitted.");
            this.submitExam(container);
          }
        }, 1000);
      }

      // Bind Quit
      container.querySelector('#quitExamBtn').addEventListener('click', () => {
        if (confirm("Are you sure you want to quit the exam? Your progress will be lost.")) {
          this.clearTimer();
          this.renderSetup(container);
        }
      });

      // Bind Navigator Grid Buttons
      container.querySelectorAll('.question-grid-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.currentQuestionIdx = parseInt(btn.dataset.index, 10);
          this.renderActiveQuestion(container);
        });
      });

      // Bind Submit Exam
      container.querySelector('#submitExamBtn').addEventListener('click', () => {
        const unansweredCount = this.answers.filter(ans => ans === null).length;
        let confirmMsg = "Are you sure you want to submit and complete the exam?";
        if (unansweredCount > 0) {
          confirmMsg = `You have ${unansweredCount} unanswered question(s). ${confirmMsg}`;
        }
        if (confirm(confirmMsg)) {
          this.clearTimer();
          this.submitExam(container);
        }
      });

      // Bind Next / Prev buttons
      container.querySelector('#prevQBtn').addEventListener('click', () => {
        if (this.currentQuestionIdx > 0) {
          this.currentQuestionIdx--;
          this.renderActiveQuestion(container);
        }
      });

      container.querySelector('#nextQBtn').addEventListener('click', () => {
        if (this.currentQuestionIdx === this.questions.length - 1) {
          container.querySelector('#submitExamBtn').click();
        } else {
          this.currentQuestionIdx++;
          this.renderActiveQuestion(container);
        }
      });

      // Render first question
      this.renderActiveQuestion(container);
    },

    // 4. RENDER SINGLE ACTIVE EXAM QUESTION
    renderActiveQuestion: function (container) {
      const q = this.questions[this.currentQuestionIdx];
      const selectedIndex = this.answers[this.currentQuestionIdx];

      const questionBox = container.querySelector('#activeQuestionBox');
      if (!questionBox) return;

      questionBox.innerHTML = `
        <div style="display: flex; justify-between: space-between; align-items: center; margin-bottom: var(--space-sm); border-bottom: 1px solid var(--border-color); padding-bottom: var(--space-xs);">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">Syllabus MCQ Challenge</span>
          <span class="quiz-progress" style="margin-left: auto;">Question ${this.currentQuestionIdx + 1} of ${this.questions.length}</span>
        </div>
        
        <p class="quiz-question-text" id="activeQText">${q.question}</p>
        
        <div class="quiz-options-grid">
          ${q.options.map((opt, idx) => `
            <div class="quiz-option ${selectedIndex === idx ? 'selected' : ''}" data-index="${idx}">
              <div class="quiz-option-marker">${String.fromCharCode(65 + idx)}</div>
              <div class="quiz-option-text">${opt}</div>
            </div>
          `).join('')}
        </div>
      `;

      // mathjax render
      const qTextEl = questionBox.querySelector('#activeQText');
      if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise([qTextEl, ...questionBox.querySelectorAll('.quiz-option-text')]).catch(e => console.error(e));
      }

      // Bind Option Selection
      questionBox.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
          questionBox.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          
          const optIndex = parseInt(opt.dataset.index, 10);
          this.answers[this.currentQuestionIdx] = optIndex;
          
          this.updateNavigatorStates(container);
        });
      });

      // Adjust state buttons in footer
      const prevBtn = container.querySelector('#prevQBtn');
      const nextBtn = container.querySelector('#nextQBtn');

      if (this.currentQuestionIdx === 0) {
        prevBtn.setAttribute('disabled', 'true');
      } else {
        prevBtn.removeAttribute('disabled');
      }

      if (this.currentQuestionIdx === this.questions.length - 1) {
        nextBtn.textContent = 'Submit Exam';
      } else {
        nextBtn.textContent = 'Next';
      }

      this.updateNavigatorStates(container);
    },

    // Update highlights in grid navigator
    updateNavigatorStates: function (container) {
      container.querySelectorAll('.question-grid-btn').forEach(btn => {
        const idx = parseInt(btn.dataset.index, 10);
        
        // Reset
        btn.className = 'question-grid-btn';

        if (this.answers[idx] !== null) {
          btn.classList.add('answered');
        }

        if (idx === this.currentQuestionIdx) {
          btn.classList.add('active');
        }
      });
    },

    // 5. COUNTDOWN TIMER RENDERING HANDLERS
    updateTimerDisplay: function () {
      const timerText = document.getElementById('timerText');
      const timerFill = document.getElementById('timerFill');
      const timerDisplay = document.getElementById('timerDisplay');
      if (!timerText) return;

      const mins = Math.floor(this.timerSeconds / 60);
      const secs = this.timerSeconds % 60;
      timerText.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      const percent = (this.timerSeconds / this.totalDurationSeconds) * 100;
      if (timerFill) {
        timerFill.style.width = `${percent}%`;
      }

      // Color warnings when timer is low (< 2 minutes / 120s remaining)
      if (this.timerSeconds <= 120) {
        timerDisplay.classList.add('warning');
        if (timerFill) timerFill.classList.add('warning');
      } else {
        if (timerDisplay) timerDisplay.classList.remove('warning');
        if (timerFill) timerFill.classList.remove('warning');
      }
    },

    clearTimer: function () {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },

    // 6. EVALUATE ANSWERS AND SHOW RESULTS CARD
    submitExam: function (container) {
      // Calculate time used
      const timeSpentSec = this.totalDurationSeconds > 0 
        ? this.totalDurationSeconds - this.timerSeconds 
        : Math.round((Date.now() - this.startTime) / 1000);
      
      const timeMins = Math.floor(timeSpentSec / 60);
      const timeSecs = timeSpentSec % 60;
      const timeSpentStr = `${timeMins} min ${timeSecs} sec`;

      // Evaluate Score
      this.score = 0;
      const reviewHTML = this.questions.map((q, idx) => {
        const userAns = this.answers[idx];
        const isCorrect = userAns === q.correct;
        const isUnanswered = userAns === null;

        if (isCorrect) this.score++;

        let optionsHTML = '';
        q.options.forEach((opt, optIdx) => {
          let optionClass = '';
          
          if (optIdx === q.correct) {
            optionClass = 'correct'; // Highlight correct option green
          } else if (optIdx === userAns) {
            optionClass = 'wrong'; // Highlight user selected incorrect option red
          }

          optionsHTML += `
            <div class="quiz-option ${optionClass}" style="cursor: default;">
              <div class="quiz-option-marker">${String.fromCharCode(65 + optIdx)}</div>
              <div class="quiz-option-text">${opt}</div>
            </div>
          `;
        });

        // Determine Badge Info
        let badgeClass = 'unanswered';
        let badgeText = 'Unanswered';
        if (!isUnanswered) {
          badgeClass = isCorrect ? 'correct' : 'wrong';
          badgeText = isCorrect ? '✓ Correct' : '✗ Incorrect';
        }

        return `
          <div class="review-question-card">
            <div class="review-question-header">
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">Question ${idx + 1}</span>
              <span class="review-question-badge ${badgeClass}">${badgeText}</span>
            </div>

            <p style="font-weight: 600; margin-bottom: var(--space-xs); font-size: 1.05rem;" class="reviewQText">${q.question}</p>
            
            <div class="quiz-options-grid" style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-xs); margin-bottom: var(--space-sm);">
              ${optionsHTML}
            </div>

            <div class="quiz-explanation" style="display: block; font-size: 0.85rem; padding: var(--space-sm); background: var(--bg-surface); border-left: 3px solid var(--border-color);">
              <strong style="display: block; margin-bottom: 2px;">Explanation:</strong>
              <span class="reviewQExp">${q.explanation}</span>
            </div>
          </div>
        `;
      }).join('');

      const percentage = Math.round((this.score / this.questions.length) * 100);

      // Determine grade message
      let assessment = '';
      if (percentage >= 90) assessment = "Outstanding! You have mastered this syllabus topic.";
      else if (percentage >= 80) assessment = "Excellent! You have a strong understanding of these concepts.";
      else if (percentage >= 60) assessment = "Good Job! Keep reviewing details to maximize your grades.";
      else assessment = "Keep Studying! Review the theoretical materials and try this mock test again.";

      // Load results scorecard HTML
      container.innerHTML = `
        <div class="m-t-md m-b-xl" style="margin-top: var(--space-md); margin-bottom: var(--space-xl);">
          <button id="backToSetupBtn" class="btn btn-ghost" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">
            &larr; Mock Test Configurator
          </button>
        </div>

        <div class="quiz-score-display card" style="max-width: 700px; margin: 0 auto var(--space-xl) auto; text-align: center;">
          <span style="font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase; font-size: 0.75rem;">AI Mock Exam Result</span>
          <h2 style="font-size: 2rem; font-weight: 800; margin-top: 4px; margin-bottom: var(--space-md);">${this.customSubject}</h2>
          
          <div class="quiz-score-num" style="margin: var(--space-md) auto;">${this.score} / ${this.questions.length}</div>
          
          <p style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 4px;">
            You scored <strong>${percentage}%</strong> in the test.
          </p>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: var(--space-md);">
            Time Used: <strong>${timeSpentStr}</strong>
          </p>
          
          <div class="highlight-box" style="background: var(--bg-surface); padding: var(--space-md); border: 1px dashed var(--border-color-hover); margin-bottom: var(--space-lg); text-align: center;">
            <p style="margin: 0; font-size: 0.95rem; line-height: 1.5; font-style: italic; color: var(--text-secondary);">${assessment}</p>
          </div>

          <div class="flex justify-center gap-md" style="justify-content: center; gap: var(--space-md);">
            <button id="retakeExamBtn" class="btn btn-primary">Retake Mock Test</button>
            <a href="#/subjects" class="btn btn-secondary">Subjects directory</a>
          </div>
        </div>

        <div class="section-header" style="max-width: 800px; margin: var(--space-xl) auto var(--space-md) auto;">
          <h3 class="section-title">Review Answers & Explanations</h3>
          <p class="section-desc">Look through each question to check correct choices and study examiner explanations.</p>
        </div>

        <div style="max-width: 800px; margin: 0 auto;" id="reviewListContainer">
          ${reviewHTML}
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

      // typeset reviewer mathematics formulas
      const reviewContainer = container.querySelector('#reviewListContainer');
      if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise([
          ...reviewContainer.querySelectorAll('.reviewQText'),
          ...reviewContainer.querySelectorAll('.quiz-option-text'),
          ...reviewContainer.querySelectorAll('.reviewQExp')
        ]).catch(e => console.error(e));
      }

      // Bind retake & back configuration actions
      container.querySelector('#backToSetupBtn').addEventListener('click', () => {
        this.renderSetup(container);
      });
      container.querySelector('#retakeExamBtn').addEventListener('click', () => {
        this.renderSetup(container);
      });
    }
  };

  window.MockTest = MockTest;
})();
