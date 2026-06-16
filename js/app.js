// js/app.js - Main Application Shell & SPA Router
(function () {
  // Application State
  const state = {
    subjects: [],
    theme: 'dark',
    progress: {}
  };
  window.appState = state;

  // SVG Icons for Nav and buttons
  const icons = {
    sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
  };

  // Helper: Get route active key
  function getRouteKey(hash) {
    if (!hash || hash === '#/' || hash === '#') return 'dashboard';
    if (hash.startsWith('#/subjects')) return 'subjects';
    if (hash.startsWith('#/subject/')) return 'subjects'; // group subjects/subject detail
    if (hash.startsWith('#/progress')) return 'progress';
    if (hash.startsWith('#/settings')) return 'settings';
    return '';
  }

  // Update navbar styling
  function updateActiveNav(hash) {
    const activeRoute = getRouteKey(hash);
    
    // Desktop sidebar
    document.querySelectorAll('.sidebar-link').forEach(link => {
      if (link.dataset.route === activeRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Mobile bottom nav
    document.querySelectorAll('.bottom-nav-link').forEach(link => {
      if (link.dataset.route === activeRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Scroll Progress Bar Update
  function handleScroll() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    } else {
      progressBar.style.width = '0%';
    }
  }

  // Initialize Theme Configuration
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    state.theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(state.theme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    state.theme = theme;
    
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? icons.sun : icons.moon;
    }
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }

  // Load subject completion progress
  function loadProgress() {
    state.subjects.forEach(subj => {
      const storedProgress = localStorage.getItem(`progress_${subj.id}`);
      state.progress[subj.id] = storedProgress ? JSON.parse(storedProgress) : {};
    });
  }

  // Calculate subject completion percentage
  function getSubjectProgressPercent(subjectId) {
    const subject = state.subjects.find(s => s.id === subjectId);
    if (!subject) return 0;
    
    const progressObj = state.progress[subjectId] || {};
    const completedCount = Object.values(progressObj).filter(v => v === true).length;
    return Math.round((completedCount / subject.modules.length) * 100);
  }

  // Calculate overall course progress (average of all subjects)
  function getOverallProgress() {
    if (state.subjects.length === 0) return 0;
    let totalPercent = 0;
    state.subjects.forEach(subj => {
      totalPercent += getSubjectProgressPercent(subj.id);
    });
    return Math.round(totalPercent / state.subjects.length);
  }

  // Router: Match paths & render layouts
  function router() {
    const hash = window.location.hash || '#/';
    updateActiveNav(hash);
    
    // Close sidebar overlay on route change (for mobile drawer)
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }

    // Reset scroll progress bar width
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) progressBar.style.width = '0%';
    window.scrollTo(0, 0);

    const appContainer = document.getElementById('app');
    
    // Transition effect by re-triggering class
    appContainer.classList.remove('fade-in-view');
    void appContainer.offsetWidth; // Force reflow
    appContainer.classList.add('fade-in-view');

    // Route logic
    if (hash === '#/' || hash === '') {
      renderDashboard(appContainer);
    } else if (hash === '#/subjects') {
      renderSubjectsList(appContainer);
    } else if (hash.startsWith('#/subject/')) {
      const parts = hash.split('/');
      const subjectId = parts[2];
      
      if (parts[3] === 'module' && parts[4]) {
        const moduleId = parseInt(parts[4], 10);
        renderModuleView(appContainer, subjectId, moduleId);
      } else {
        renderSubjectLanding(appContainer, subjectId);
      }
    } else if (hash === '#/progress') {
      renderProgressStats(appContainer);
    } else if (hash === '#/settings') {
      renderSettings(appContainer);
    } else {
      renderNotFound(appContainer);
    }
  }

  // View: Dashboard
  function renderDashboard(container) {
    let rowsHTML = '';
    state.subjects.forEach(subj => {
      const typeBadge = subj.type.includes('Major') ? 'badge-major' : 'badge-elective';
      rowsHTML += `
        <tr>
          <td><span style="font-family: var(--font-mono); font-weight: 500;">${subj.code}</span></td>
          <td><a href="#/subject/${subj.id}" style="font-weight: 600; color: var(--accent-primary);">${subj.name}</a></td>
          <td><span class="badge ${typeBadge}">${subj.type}</span></td>
          <td>${subj.credits}</td>
          <td><span style="font-family: var(--font-mono);">${subj.hours.L}-${subj.hours.T}-${subj.hours.P}</span></td>
          <td>${subj.evaluation.CIA}</td>
          <td>${subj.evaluation.ESE}</td>
          <td style="font-weight: 600;">${subj.evaluation.total}</td>
        </tr>
      `;
    });

    let cardsHTML = '';
    state.subjects.forEach(subj => {
      const percent = getSubjectProgressPercent(subj.id);
      const completedCount = Object.values(state.progress[subj.id] || {}).filter(v => v === true).length;
      
      // Calculate SVG stroke offset for circle
      const radius = 20;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;

      cardsHTML += `
        <div class="card subject-card ${subj.id}">
          <div class="subject-card-header">
            <span class="subject-code">${subj.code}</span>
            <div class="progress-ring-container">
              <svg class="progress-ring" width="48" height="48">
                <circle class="progress-ring-circle-bg" cx="24" cy="24" r="${radius}"></circle>
                <circle class="progress-ring-circle" cx="24" cy="24" r="${radius}" 
                  stroke-dasharray="${circumference}" 
                  stroke-dashoffset="${offset}"></circle>
              </svg>
              <div class="progress-ring-text">${percent}%</div>
            </div>
          </div>
          <h3 class="subject-card-title">${subj.name}</h3>
          
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${percent}%;"></div>
            </div>
            <span style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-muted);">${completedCount}/5</span>
          </div>

          <div class="subject-card-footer">
            <span class="subject-credits">${subj.credits} Credits</span>
            <a href="#/subject/${subj.id}" class="btn btn-ghost" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; border-radius: var(--radius-sm);">
              Study
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="hero">
        <h1 class="hero-title">BCA Semester V Study Hub</h1>
        <p class="hero-desc">Your ultimate companion for Brainware University exams. Tracking, quizzes, formulas, and resources for all 5th semester subjects.</p>
        <a href="#/subjects" class="btn btn-primary">
          Explore Subjects
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>

      <div class="section-header">
        <h2 class="section-title">Semester Overview</h2>
        <p class="section-desc">Course credit breakdown and evaluation criteria.</p>
      </div>

      <div class="table-container m-b-lg">
        <table class="credit-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Subject Name</th>
              <th>Type</th>
              <th>Credits</th>
              <th>L-T-P</th>
              <th>CIA</th>
              <th>ESE</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>
      </div>

      <div class="section-header">
        <h2 class="section-title">Active Courses</h2>
        <p class="section-desc">Track progress and access syllabus modules.</p>
      </div>

      <div class="subject-grid">
        ${cardsHTML}
      </div>
    `;
  }

  // View: Subjects List
  function renderSubjectsList(container) {
    let listHTML = '';
    state.subjects.forEach(subj => {
      const percent = getSubjectProgressPercent(subj.id);
      listHTML += `
        <div class="card m-b-md" style="display: flex; flex-direction: column; gap: var(--space-md);">
          <div class="flex justify-between align-center" style="flex-wrap: wrap; gap: var(--space-sm);">
            <div>
              <span style="font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem;">${subj.code} · ${subj.type}</span>
              <h3 style="font-size: 1.4rem; font-weight: 700; margin-top: 2px;">${subj.name}</h3>
            </div>
            <div style="font-size: 1.15rem; font-weight: 700; color: var(--accent-primary);">${percent}% Completed</div>
          </div>
          
          <p style="color: var(--text-secondary);">${subj.courseObjective}</p>
          
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${percent}%; background-color: ${subj.accentColor};"></div>
            </div>
          </div>
          
          <div class="flex justify-between align-center" style="margin-top: var(--space-sm); padding-top: var(--space-md); border-top: 1px solid var(--border-color);">
            <span style="color: var(--text-muted); font-size: 0.9rem;">${subj.credits} Credits · ${subj.modules.length} Modules</span>
            <a href="#/subject/${subj.id}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Open Curriculum</a>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Subjects Directory</h2>
        <p class="section-desc">Browse syllabus guidelines and open specific learning modules.</p>
      </div>
      <div class="flex flex-col m-t-lg">
        ${listHTML}
      </div>
    `;
  }

  // View: Subject Details Landing Page
  function renderSubjectLanding(container, subjectId) {
    const subj = state.subjects.find(s => s.id === subjectId);
    if (!subj) {
      renderNotFound(container);
      return;
    }

    const progressObj = state.progress[subjectId] || {};
    const percent = getSubjectProgressPercent(subjectId);

    // Build modules list HTML
    let modulesHTML = '';
    subj.modules.forEach(mod => {
      const isCompleted = progressObj[mod.id] === true;
      const statusIcon = isCompleted 
        ? `<span style="color: var(--color-success); font-weight: bold; display: flex; align-items: center; gap: 4px;">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             Done
           </span>`
        : `<span style="color: var(--text-muted); font-size: 0.85rem;">Incomplete</span>`;

      modulesHTML += `
        <div class="card module-card" style="border-left-color: ${subj.accentColor};">
          <div class="module-header-row" onclick="window.location.hash = '#/subject/${subj.id}/module/${mod.id}'">
            <div class="module-info">
              <span class="module-num" style="color: ${subj.accentColor};">Module ${mod.id} (${mod.hours})</span>
              <h4 class="module-title">${mod.title}</h4>
            </div>
            <div>
              ${statusIcon}
            </div>
          </div>
        </div>
      `;
    });

    // Outcomes
    let outcomesHTML = '';
    subj.courseOutcomes.forEach(co => {
      outcomesHTML += `<li style="margin-bottom: var(--space-xs);">${co}</li>`;
    });

    // Books
    let booksHTML = '';
    subj.textbooks.forEach(b => {
      booksHTML += `<li style="margin-bottom: var(--space-xxs);">${b}</li>`;
    });
    if (subj.references && subj.references.length > 0) {
      booksHTML += `<li style="margin-top: var(--space-sm); list-style: none; font-weight: 600; color: var(--text-primary);">Reference Books:</li>`;
      subj.references.forEach(r => {
        booksHTML += `<li style="margin-bottom: var(--space-xxs);">${r}</li>`;
      });
    }

    container.innerHTML = `
      <div style="margin-bottom: var(--space-lg);">
        <a href="#/" class="btn btn-ghost" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; margin-bottom: var(--space-md);">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Dashboard
        </a>
      </div>

      <div class="card m-b-xl" style="border-left: 4px solid ${subj.accentColor};">
        <span style="font-family: var(--font-mono); color: var(--text-muted);">${subj.code} · ${subj.type}</span>
        <h2 style="font-size: 2.2rem; font-weight: 800; margin-top: 4px; margin-bottom: var(--space-sm);">${subj.name}</h2>
        
        <div class="progress-container m-b-md">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${percent}%; background-color: ${subj.accentColor};"></div>
          </div>
          <span style="font-size: 0.9rem; font-weight: 700; font-family: var(--font-mono); color: ${subj.accentColor};">${percent}%</span>
        </div>
        
        <div style="margin-top: var(--space-md);">
          <h4 style="font-weight: 600; margin-bottom: var(--space-xs);">Course Objective</h4>
          <p style="color: var(--text-secondary);">${subj.courseObjective}</p>
        </div>
      </div>

      <div class="section-header">
        <h3 class="section-title">Course Modules</h3>
        <p class="section-desc">Study the theoretical concepts and test your knowledge with quizzes.</p>
      </div>

      <div class="module-list">
        ${modulesHTML}
      </div>

      <div class="grid-2-col m-t-xl" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-lg); margin-top: var(--space-xxl);">
        <div class="card">
          <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md); border-bottom: 1px solid var(--border-color); padding-bottom: var(--space-xs);">Course Outcomes (COs)</h4>
          <ul style="padding-left: var(--space-md); color: var(--text-secondary);">
            ${outcomesHTML}
          </ul>
        </div>
        
        <div class="card">
          <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md); border-bottom: 1px solid var(--border-color); padding-bottom: var(--space-xs);">Textbooks & Resources</h4>
          <ul style="padding-left: var(--space-md); color: var(--text-secondary);">
            ${booksHTML}
          </ul>
        </div>
      </div>
    `;
  }

  // View: Module Content View (delegated to Renderer in Day 2)
  function renderModuleView(container, subjectId, moduleId) {
    if (window.Renderer && typeof window.Renderer.renderModule === 'function') {
      window.Renderer.renderModule(container, subjectId, moduleId);
    } else {
      container.innerHTML = `<div class="card text-center"><p>Error: Renderer engine not loaded.</p></div>`;
    }
  }

  // View: Progress Stats
  function renderProgressStats(container) {
    const overall = getOverallProgress();
    
    let subjectsProgressHTML = '';
    state.subjects.forEach(subj => {
      const percent = getSubjectProgressPercent(subj.id);
      const progressObj = state.progress[subj.id] || {};
      const completedCount = Object.values(progressObj).filter(v => v === true).length;
      
      subjectsProgressHTML += `
        <div class="card m-b-md">
          <div class="flex justify-between align-center m-b-md" style="margin-bottom: var(--space-sm);">
            <h4 style="font-weight: 700; font-size: 1.15rem;">${subj.name}</h4>
            <span style="font-family: var(--font-mono); font-weight: bold; color: ${subj.accentColor};">${percent}%</span>
          </div>
          
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${percent}%; background-color: ${subj.accentColor};"></div>
            </div>
            <span style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--text-muted);">${completedCount}/5 Modules</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Your Progress Tracker</h2>
        <p class="section-desc">Visual summaries of subject completion and exam readiness.</p>
      </div>

      <div class="grid-2-col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg); margin-top: var(--space-xl);">
        <div class="card flex flex-col align-center justify-between" style="text-align: center; padding: var(--space-xl);">
          <div>
            <h3 style="font-weight: 600; color: var(--text-muted); margin-bottom: var(--space-sm);">Overall Semester Completion</h3>
            <div style="font-size: 4.5rem; font-weight: 800; background: linear-gradient(135deg, var(--accent-primary), var(--accent-se)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              ${overall}%
            </div>
          </div>
          <p style="color: var(--text-secondary); margin-top: var(--space-md); font-size: 0.95rem;">
            Calculated across all 20 modules in the syllabus course structures.
          </p>
        </div>
        
        <div class="flex flex-col gap-md">
          ${subjectsProgressHTML}
        </div>
      </div>
    `;
  }

  // View: Settings
  function renderSettings(container) {
    container.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Application Settings</h2>
        <p class="section-desc">Manage themes, data preferences, and app options.</p>
      </div>

      <div class="flex flex-col gap-md m-t-xl" style="max-width: 600px;">
        <div class="card">
          <h4 style="font-weight: 700; margin-bottom: var(--space-sm);">UI Theme Selector</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: var(--space-md);">Toggle between glassmorphic dark-mode or light-mode interfaces.</p>
          <button id="settingsThemeToggle" class="btn btn-primary">
            Toggle Current Theme (${state.theme === 'dark' ? 'Dark Mode' : 'Light Mode'})
          </button>
        </div>

        <div class="card">
          <h4 style="font-weight: 700; margin-bottom: var(--space-sm); color: var(--color-error);">Reset Study Progress</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: var(--space-md);">Warning: This will clear all localStorage attributes, resetting your subject progress and quiz records back to zero.</p>
          <button id="resetProgressBtn" class="btn btn-ghost" style="border-color: var(--color-error); color: var(--color-error);">
            Reset All Data
          </button>
        </div>
      </div>
    `;

    // Bind settings buttons
    const themeBtn = document.getElementById('settingsThemeToggle');
    themeBtn.addEventListener('click', () => {
      toggleTheme();
      themeBtn.textContent = `Toggle Current Theme (${state.theme === 'dark' ? 'Dark Mode' : 'Light Mode'})`;
    });

    const resetBtn = document.getElementById('resetProgressBtn');
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all completion records? This cannot be undone.')) {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('progress_') || key.startsWith('quiz_'))) {
            localStorage.removeItem(key);
          }
        }
        loadProgress();
        alert('All study progress has been reset successfully.');
        window.location.hash = '#/'; // Go back home
      }
    });
  }

  // View: 404 Not Found
  function renderNotFound(container) {
    container.innerHTML = `
      <div style="text-align: center; padding: var(--space-xxl) 0;">
        <h2 style="font-size: 3rem; font-weight: 800; color: var(--accent-primary); margin-bottom: var(--space-sm);">404</h2>
        <h3 style="font-weight: 600; margin-bottom: var(--space-md);">Route Not Found</h3>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">The path you requested does not exist or has been moved.</p>
        <a href="#/" class="btn btn-primary">Go to Dashboard</a>
      </div>
    `;
  }

  // Bind DOM Event Listeners & Initialize
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Theme Setup
    initTheme();
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

    // 2. Mobile Drawer Actions
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (hamburgerBtn && sidebar && overlay) {
      hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
      });
    }

    // 3. Navigation link highlights and drawer close on click
    document.querySelectorAll('.sidebar-link, .bottom-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (sidebar && overlay) {
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
        }
      });
    });

    // 4. Scroll Event Listeners for progress bar
    window.addEventListener('scroll', handleScroll);

    // 5. Fetch subjects list JSON
    fetch('data/subjects.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch subjects configuration');
        }
        return response.json();
      })
      .then(data => {
        state.subjects = data.subjects;
        loadProgress();
        
        // Setup Routing Listener
        window.addEventListener('hashchange', router);
        
        // Initial Route Trigger
        router();
      })
      .catch(err => {
        console.error('Initial Fetch Error:', err);
        // Fallback placeholder data if JSON fetch fails (e.g. running from file:// direct protocol)
        state.subjects = [
          {
            id: 'se',
            code: 'BCA50112',
            name: 'Software Engineering',
            credits: 4,
            hours: { L: 3, T: 1, P: 0 },
            evaluation: { CIA: 40, ESE: 60, total: 100 },
            type: 'Major',
            accentColor: '#00cec9',
            modules: [
              { id: 1, title: 'Introduction to Software Engineering', hours: '3H' },
              { id: 2, title: 'Software Development Process Models', hours: '3H' },
              { id: 3, title: 'Requirement Analysis & Specifications', hours: '3H' },
              { id: 4, title: 'Software Design & Development Tools', hours: '3H' },
              { id: 5, title: 'Software Testing & Project Management', hours: '3H' }
            ],
            courseObjective: 'To understand software development lifecycles and structured analysis.',
            courseOutcomes: ['CO1: Analyze models', 'CO2: Build SRS'],
            textbooks: ['Roger S. Pressman'],
            references: []
          },
          {
            id: 'daa',
            code: 'BCA50113',
            name: 'Design & Analysis of Algorithms',
            credits: 4,
            hours: { L: 3, T: 1, P: 0 },
            evaluation: { CIA: 40, ESE: 60, total: 100 },
            type: 'Major',
            accentColor: '#fd79a8',
            modules: [
              { id: 1, title: 'Algorithm Development & Complexity Analysis', hours: '3H' },
              { id: 2, title: 'Searching & Sorting Algorithms', hours: '3H' },
              { id: 3, title: 'Algorithm Design Techniques', hours: '3H' },
              { id: 4, title: 'Graph & Tree Algorithms', hours: '3H' },
              { id: 5, title: 'Complexity Classes', hours: '3H' }
            ],
            courseObjective: 'To understand complexities and design methodologies.',
            courseOutcomes: ['CO1: Analyze bounds'],
            textbooks: ['T.H. Cormen'],
            references: []
          },
          {
            id: 'fsd',
            code: 'BCA57115',
            name: 'Full-stack Development II',
            credits: 4,
            hours: { L: 3, T: 0, P: 2 },
            evaluation: { CIA: 40, ESE: 60, total: 100 },
            type: 'Major / Practical',
            accentColor: '#fdcb6e',
            modules: [
              { id: 1, title: 'React JS & JSX with Components', hours: '3H' },
              { id: 2, title: 'React CSS, Bootstrap & Router', hours: '3H' },
              { id: 3, title: 'User Input Forms, Events & Deployment', hours: '3H' },
              { id: 4, title: 'API Requests & Data Binding', hours: '3H' },
              { id: 5, title: 'Directives, Controllers, Filters & Services', hours: '3H' }
            ],
            courseObjective: 'To build web apps with React and Angular.',
            courseOutcomes: ['CO1: Write React components'],
            textbooks: ['Kirupa Chinnathambi'],
            references: []
          },
          {
            id: 'ml',
            code: 'BCA57205',
            name: 'Machine Learning',
            credits: 4,
            hours: { L: 3, T: 1, P: 0 },
            evaluation: { CIA: 40, ESE: 60, total: 100 },
            type: 'Minor Elective',
            accentColor: '#55efc4',
            modules: [
              { id: 1, title: 'Introduction to Machine Learning', hours: '3H' },
              { id: 2, title: 'Types of Learning & Applications', hours: '3H' },
              { id: 3, title: 'Training Models in ML', hours: '3H' },
              { id: 4, title: 'AI & ML with Business Problems', hours: '3H' },
              { id: 5, title: 'Ensemble Learning', hours: '3H' }
            ],
            courseObjective: 'To study learning theories and ensemble schemes.',
            courseOutcomes: ['CO1: Formulate ML workflows'],
            textbooks: ['Tom M. Mitchell'],
            references: []
          }
        ];
        
        loadProgress();
        
        // Setup Routing Listener
        window.addEventListener('hashchange', router);
        
        // Initial Route Trigger
        router();
      });
  });
})();
