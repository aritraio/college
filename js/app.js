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
    
    const sidebarThemeIcon = document.getElementById('sidebarThemeIcon');
    const sidebarThemeText = document.getElementById('sidebarThemeText');
    if (sidebarThemeIcon) {
      sidebarThemeIcon.innerHTML = theme === 'dark' ? icons.sun : icons.moon;
    }
    if (sidebarThemeText) {
      sidebarThemeText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
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

  // Generate random graffiti art as background SVG string
  function generateGraffitiSVG() {
    const startTime = performance.now();
    const width = 800;
    const height = 240;
    const elements = [];

    // 1. Abstract geometric lines & shapes
    const numLines = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < numLines; i++) {
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      const x2 = Math.random() * width;
      const y2 = Math.random() * height;
      const strokeWidth = 1 + Math.random() * 2;
      const opacity = 0.12 + Math.random() * 0.15;
      const shades = ['var(--text-muted)', 'var(--border-color-hover)', 'var(--text-secondary)'];
      const color = shades[Math.floor(Math.random() * shades.length)];
      elements.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth}" opacity="${opacity}" />`);
    }

    const numRects = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numRects; i++) {
      const x = Math.random() * (width - 150);
      const y = Math.random() * (height - 80);
      const w = 40 + Math.random() * 100;
      const h = 20 + Math.random() * 60;
      const opacity = 0.05 + Math.random() * 0.12;
      const shades = ['var(--border-color)', 'var(--text-muted)'];
      const color = shades[Math.floor(Math.random() * shades.length)];
      elements.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-width="1.5" opacity="${opacity}" />`);
    }

    // 2. Splatter dots in monochromatic shades
    const numDots = 25 + Math.floor(Math.random() * 20);
    for (let i = 0; i < numDots; i++) {
      const cx = Math.random() * width;
      const cy = Math.random() * height;
      const r = 1 + Math.random() * 3.5;
      const opacity = 0.1 + Math.random() * 0.22;
      const shades = ['var(--text-muted)', 'var(--border-color-hover)', 'var(--text-secondary)', 'var(--border-color)'];
      const color = shades[Math.floor(Math.random() * shades.length)];
      elements.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}" />`);
    }

    // 3. Text fragments ("CODE", "STUDY", "BCA", "SEM5")
    const texts = ["CODE", "STUDY", "BCA", "SEM5"];
    texts.forEach(text => {
      const x = Math.random() * (width - 120) + 30;
      const y = Math.random() * (height - 40) + 35;
      const fontSize = 12 + Math.floor(Math.random() * 14);
      const opacity = 0.08 + Math.random() * 0.15;
      const rotate = -20 + Math.floor(Math.random() * 40);
      const shades = ['var(--text-muted)', 'var(--text-secondary)', 'var(--border-color-hover)'];
      const color = shades[Math.floor(Math.random() * shades.length)];
      elements.push(`<text x="${x}" y="${y}" font-family="var(--font-mono)" font-size="${fontSize}" font-weight="900" fill="${color}" opacity="${opacity}" transform="rotate(${rotate} ${x} ${y})">${text}</text>`);
    });

    const duration = performance.now() - startTime;
    console.log(`generateGraffitiSVG generated in ${duration.toFixed(2)}ms`);

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="none">
        ${elements.join('\n')}
      </svg>
    `;
  }

  // Apply Reader Preferences from selection or storage
  function applyReaderBg(bg) {
    document.body.classList.remove('reader-bg-sepia', 'reader-bg-mint', 'reader-bg-sunset');
    if (bg !== 'default') {
      document.body.classList.add(`reader-bg-${bg}`);
    }
    localStorage.setItem('reader_bg', bg);
    
    // Update active swatch state
    document.querySelectorAll('.swatch').forEach(btn => {
      if (btn.dataset.bg === bg) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function applyReaderFont(font) {
    document.body.classList.remove('reader-font-georgia', 'reader-font-merriweather', 'reader-font-mono');
    if (font !== 'inter') {
      document.body.classList.add(`reader-font-${font}`);
    }
    localStorage.setItem('reader_font', font);
    
    // Update active font button state
    document.querySelectorAll('.font-opt').forEach(btn => {
      if (btn.dataset.font === font) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function applyReaderSize(size) {
    document.body.classList.remove('reader-size-sm', 'reader-size-lg', 'reader-size-xl');
    if (size !== 'md') {
      document.body.classList.add(`reader-size-${size}`);
    }
    localStorage.setItem('reader_size', size);
    
    // Update active size button state
    document.querySelectorAll('.size-opt').forEach(btn => {
      if (btn.dataset.size === size) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function initReaderPreferences() {
    const bg = localStorage.getItem('reader_bg') || 'default';
    const font = localStorage.getItem('reader_font') || 'inter';
    const size = localStorage.getItem('reader_size') || 'md';
    
    applyReaderBg(bg);
    applyReaderFont(font);
    applyReaderSize(size);
  }

  function bindReaderPreferenceEvents() {
    document.querySelectorAll('.swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        applyReaderBg(btn.dataset.bg);
      });
    });
    
    document.querySelectorAll('.font-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        applyReaderFont(btn.dataset.font);
      });
    });
    
    document.querySelectorAll('.size-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        applyReaderSize(btn.dataset.size);
      });
    });
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

    const appContainer = document.getElementById('app');
    
    // Add fade-out transition class
    appContainer.classList.add('fade-out');

    setTimeout(() => {
      window.scrollTo(0, 0);

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

      // Remove fade-out transition class to trigger fade-in
      appContainer.classList.remove('fade-out');
    }, 150);
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

    const totalCredits = state.subjects.reduce((sum, s) => sum + s.credits, 0);
    const overallCompletion = getOverallProgress();

    container.innerHTML = `
      <div class="dashboard-hero hero">
        <div class="graffiti-overlay">${generateGraffitiSVG()}</div>
        <div class="hero-content">
          <span class="hero-tag">SEMESTER V · 2026</span>
          <h1 class="hero-title">BCA Semester V Study Hub</h1>
          <p class="hero-desc">Your ultimate companion for Brainware University exams. Tracking, quizzes, formulas, and resources for all 5th semester subjects.</p>
          <a href="#/subjects" class="btn btn-primary">
            Explore Subjects
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>

      <!-- Mobile Overview Stats -->
      <div class="mobile-summary-card mobile-only m-b-lg">
        <div class="mobile-summary-grid">
          <div class="summary-stat">
            <span class="summary-val">${state.subjects.length}</span>
            <span class="summary-lbl">Subjects</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-stat">
            <span class="summary-val">${totalCredits}</span>
            <span class="summary-lbl">Credits</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-stat">
            <span class="summary-val">${overallCompletion}%</span>
            <span class="summary-lbl">Completed</span>
          </div>
        </div>
        <div class="progress-container m-t-md">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${overallCompletion}%; background-color: var(--accent-primary);"></div>
          </div>
        </div>
      </div>

      <div class="section-header desktop-only">
        <h2 class="section-title">Semester Overview</h2>
        <p class="section-desc">Course credit breakdown and evaluation criteria.</p>
      </div>

      <div class="table-container m-b-lg desktop-only">
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
    state.subjects.forEach((subj, idx) => {
      const percent = getSubjectProgressPercent(subj.id);
      const completedCount = Object.values(state.progress[subj.id] || {}).filter(v => v === true).length;
      
      // Determine resume module link
      let resumeModuleId = 1;
      const progressObj = state.progress[subj.id] || {};
      for (let i = 1; i <= 5; i++) {
        if (!progressObj[i]) {
          resumeModuleId = i;
          break;
        }
      }
      
      const isAllCompleted = completedCount === 5;
      const resumeText = isAllCompleted ? 'Review Module 1' : `Resume Module ${resumeModuleId}`;
      const resumeHref = `#/subject/${subj.id}/module/${isAllCompleted ? 1 : resumeModuleId}`;

      listHTML += `
        <div class="card subject-list-card" style="border-left: 4px solid ${subj.accentColor || 'var(--accent-primary)'}; display: flex; flex-direction: column; gap: var(--space-md);">
          <div class="flex justify-between align-start">
            <div>
              <span style="font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem;">${subj.code} · ${subj.type}</span>
              <h3 style="font-size: 1.3rem; font-weight: 700; margin-top: 2px; line-height: 1.3;">${subj.name}</h3>
            </div>
            <span class="subject-number">0${idx + 1}</span>
          </div>
          
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; margin-bottom: auto;">${subj.courseObjective}</p>
          
          <div class="progress-container" style="margin-top: var(--space-sm); flex-direction: column; align-items: stretch; gap: var(--space-xs);">
            <div class="flex justify-between align-center" style="font-size: 0.85rem; margin-bottom: var(--space-xxs); font-family: var(--font-mono);">
              <span style="color: var(--text-muted);">${completedCount}/5 Modules Completed</span>
              <span style="font-weight: 700; color: var(--text-primary);">${percent}%</span>
            </div>
            <div class="progress-bar-bg" style="height: 8px;">
              <div class="progress-bar-fill" style="width: ${percent}%; background-color: ${subj.accentColor || 'var(--accent-primary)'};"></div>
            </div>
          </div>
          
          <div class="flex justify-between align-center" style="margin-top: var(--space-xs); padding-top: var(--space-md); border-top: 1px solid var(--border-color);">
            <a href="${resumeHref}" class="resume-link">
              ${resumeText} &rarr;
            </a>
            <a href="#/subject/${subj.id}" class="btn btn-ghost" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Syllabus</a>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">Subjects Directory</h2>
        <p class="section-desc">Browse syllabus guidelines, track progress, and resume where you left off.</p>
      </div>
      <div class="subjects-grid-page">
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
        <div class="card module-card" style="border-left-color: ${subj.accentColor};" onclick="window.location.hash = '#/subject/${subj.id}/module/${mod.id}'">
          <div class="module-header-row">
            <div class="module-info">
              <span class="module-num" style="color: ${subj.accentColor};">Module ${mod.id} (${mod.hours})</span>
              <h4 class="module-title">${mod.title}</h4>
            </div>
            <div style="display: flex; align-items: center; gap: var(--space-sm);">
              ${statusIcon}
              <span class="module-arrow">&rarr;</span>
            </div>
          </div>
        </div>
      `;
    });

    let resourcesHTML = '';
    if (subj.resources && subj.resources.length > 0) {
      let cardsHTML = '';
      subj.resources.forEach(res => {
        let badgeClass = 'badge-article';
        if (res.type.toLowerCase() === 'video') badgeClass = 'badge-video';
        if (res.type.toLowerCase() === 'docs') badgeClass = 'badge-docs';
        if (res.type.toLowerCase() === 'book') badgeClass = 'badge-book';
        
        cardsHTML += `
          <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="resource-card">
            <div>
              <span class="badge-resource ${badgeClass}">${res.type}</span>
              <h4 style="font-size: 1rem; font-weight: 700; margin-top: 4px; line-height: 1.4;">${res.title}</h4>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted); margin-top: var(--space-md); display: flex; align-items: center; gap: 4px;">
              Visit Resource 
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </span>
          </a>
        `;
      });

      resourcesHTML = `
        <div class="section-header" style="margin-top: var(--space-xl);">
          <h3 class="section-title">Learning Resources</h3>
          <p class="section-desc">External tutorials, visualizations, and video lectures to supplement your learning.</p>
        </div>
        <div class="resource-grid">
          ${cardsHTML}
        </div>
      `;
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

      ${resourcesHTML}
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
            <div style="font-size: 4.5rem; font-weight: 800; color: var(--text-primary);">
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

  // Keyboard Navigation listener
  document.addEventListener('keydown', (e) => {
    // Disable shortcuts when focusing inputs/textareas
    const activeEl = document.activeElement;
    if (activeEl && (
      activeEl.tagName === 'INPUT' || 
      activeEl.tagName === 'TEXTAREA' || 
      activeEl.isContentEditable
    )) {
      return;
    }

    const hash = window.location.hash || '#/';
    
    if (hash.startsWith('#/subject/')) {
      const parts = hash.split('/');
      const subjectId = parts[2];
      
      if (parts[3] === 'module' && parts[4]) {
        const moduleId = parseInt(parts[4], 10);
        
        if (e.key === 'ArrowLeft') {
          if (moduleId > 1) {
            window.location.hash = `#/subject/${subjectId}/module/${moduleId - 1}`;
          }
        } else if (e.key === 'ArrowRight') {
          if (moduleId < 5) {
            window.location.hash = `#/subject/${subjectId}/module/${moduleId + 1}`;
          }
        } else if (e.key === 'Escape') {
          window.location.hash = `#/subject/${subjectId}`;
        }
      } else {
        // Subject Landing
        if (e.key >= '1' && e.key <= '5') {
          const modId = parseInt(e.key, 10);
          window.location.hash = `#/subject/${subjectId}/module/${modId}`;
        } else if (e.key === 'Escape') {
          window.location.hash = '#/';
        }
      }
    }
  });

  // Bind DOM Event Listeners & Initialize
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Theme Setup
    initTheme();
    const sidebarToggle = document.getElementById('sidebarThemeToggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', toggleTheme);
    }

    // 1b. Initial Reader Settings Setup
    initReaderPreferences();
    bindReaderPreferenceEvents();

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
            accentColor: '#E0E0E0',
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
            references: [],
            resources: [
              { "title": "GeeksforGeeks: Software Engineering", "url": "https://www.geeksforgeeks.org/software-engineering/", "type": "Article" },
              { "title": "JavaTPoint: SE Tutorial", "url": "https://www.javatpoint.com/software-engineering", "type": "Article" },
              { "title": "Tutorialspoint: SE", "url": "https://www.tutorialspoint.com/software_engineering/", "type": "Article" },
              { "title": "NPTEL: Software Engineering Lectures", "url": "https://nptel.ac.in/courses/106105182", "type": "Video" }
            ]
          },
          {
            id: 'daa',
            code: 'BCA50113',
            name: 'Design & Analysis of Algorithms',
            credits: 4,
            hours: { L: 3, T: 1, P: 0 },
            evaluation: { CIA: 40, ESE: 60, total: 100 },
            type: 'Major',
            accentColor: '#B0B0B0',
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
            references: [],
            resources: [
              { "title": "GeeksforGeeks: Algorithms", "url": "https://www.geeksforgeeks.org/fundamentals-of-algorithms/", "type": "Article" },
              { "title": "Visualgo: Algorithm Visualizations", "url": "https://visualgo.net/", "type": "Docs" },
              { "title": "MIT OCW: Intro to Algorithms", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", "type": "Video" },
              { "title": "Abdul Bari Algorithms (YouTube)", "url": "https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", "type": "Video" }
            ]
          },
          {
            id: 'fsd',
            code: 'BCA57115',
            name: 'Full-stack Development II',
            credits: 4,
            hours: { L: 3, T: 0, P: 2 },
            evaluation: { CIA: 40, ESE: 60, total: 100 },
            type: 'Major / Practical',
            accentColor: '#D0D0D0',
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
            references: [],
            resources: [
              { "title": "React Official Docs", "url": "https://react.dev/", "type": "Docs" },
              { "title": "W3Schools React", "url": "https://www.w3schools.com/react/", "type": "Article" },
              { "title": "AngularJS Developer Guide", "url": "https://docs.angularjs.org/guide", "type": "Docs" },
              { "title": "freeCodeCamp: React", "url": "https://www.freecodecamp.org/learn/front-end-development-libraries/", "type": "Article" }
            ]
          },
          {
            id: 'ml',
            code: 'BCA57205',
            name: 'Machine Learning',
            credits: 4,
            hours: { L: 3, T: 1, P: 0 },
            evaluation: { CIA: 40, ESE: 60, total: 100 },
            type: 'Minor Elective',
            accentColor: '#C0C0C0',
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
            references: [],
            resources: [
              { "title": "GeeksforGeeks: ML", "url": "https://www.geeksforgeeks.org/machine-learning/", "type": "Article" },
              { "title": "Andrew Ng's ML Course", "url": "https://www.coursera.org/learn/machine-learning", "type": "Video" },
              { "title": "Scikit-learn Docs", "url": "https://scikit-learn.org/stable/", "type": "Docs" },
              { "title": "StatQuest (YouTube)", "url": "https://www.youtube.com/c/joshstarmer", "type": "Video" }
            ]
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
