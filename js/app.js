// js/app.js - Main Application Shell & SPA Router
(function () {
  // Application State
  const state = {
    subjects: [],
    theme: 'dark',
    progress: {}
  };
  window.appState = state;

  // Track recently opened modules
  state.recordRecentlyOpened = function (subjectId, moduleId) {
    let list = localStorage.getItem('recently_opened_modules');
    list = list ? JSON.parse(list) : [];
    list = list.filter(item => !(item.subjectId === subjectId && item.moduleId === moduleId));
    list.unshift({ subjectId, moduleId, timestamp: Date.now() });
    if (list.length > 3) list.pop();
    localStorage.setItem('recently_opened_modules', JSON.stringify(list));
  };

  state.getRecentlyOpened = function () {
    let list = localStorage.getItem('recently_opened_modules');
    list = list ? JSON.parse(list) : [];
    if (list.length === 0) {
      return [
        { subjectId: 'se', moduleId: 1 },
        { subjectId: 'daa', moduleId: 1 },
        { subjectId: 'fsd', moduleId: 1 }
      ];
    }
    return list;
  };

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
    if (hash.startsWith('#/examprep')) return 'examprep'; // exam prep
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
    document.body.classList.remove('reader-bg-sepia', 'reader-bg-mint', 'reader-bg-sunset', 'reader-bg-ocean', 'reader-bg-lavender', 'reader-bg-nord');
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
    document.body.classList.remove('reader-font-georgia', 'reader-font-merriweather', 'reader-font-mono', 'reader-font-lora', 'reader-font-system');
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
    document.body.classList.remove('reader-size-xs', 'reader-size-sm', 'reader-size-lg', 'reader-size-xl', 'reader-size-xxl');
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
      } else if (hash.startsWith('#/examprep')) {
        const parts = hash.split('/');
        // Format: #/examprep/subject/:subjectId/module/:moduleId
        if (parts[2] === 'subject' && parts[3] && parts[4] === 'module' && parts[5]) {
          const subjectId = parts[3];
          const moduleId = parseInt(parts[5], 10);
          if (window.ExamPrep && typeof window.ExamPrep.renderModule === 'function') {
            window.ExamPrep.renderModule(appContainer, subjectId, moduleId);
          } else {
            appContainer.innerHTML = `<div class="card text-center"><p>Error: Exam Prep module engine not loaded.</p></div>`;
          }
        } else {
          if (window.ExamPrep && typeof window.ExamPrep.renderDashboard === 'function') {
            window.ExamPrep.renderDashboard(appContainer);
          } else {
            appContainer.innerHTML = `<div class="card text-center"><p>Error: Exam Prep dashboard engine not loaded.</p></div>`;
          }
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
  // View: Dashboard
  function renderDashboard(container) {
    const recentlyOpened = state.getRecentlyOpened();
    let modulesHTML = '';
    
    recentlyOpened.forEach((item, idx) => {
      const subj = state.subjects.find(s => s.id === item.subjectId);
      if (!subj) return;
      
      const mod = subj.modules.find(m => m.id === item.moduleId);
      if (!mod) return;
      
      const isFirst = idx === 0;
      const btnText = isFirst ? 'Continue' : 'Review';
      const btnClass = isFirst ? 'scholarly-btn solid' : 'scholarly-btn outline';
      
      modulesHTML += `
        <div class="scholarly-card row-layout" onclick="if (!event.target.closest('a')) window.location.hash = '#/subject/${subj.id}/module/${mod.id}'">
          <div>
            <span class="scholarly-card-tag">${subj.code}</span>
            <h4 class="font-headline-lg-mobile scholarly-card-title">${subj.name}</h4>
            <p class="scholarly-card-subtitle">Module ${mod.id}: ${mod.title}</p>
          </div>
          <a href="#/subject/${subj.id}/module/${mod.id}" class="${btnClass}">
            ${btnText}
          </a>
        </div>
      `;
    });

    const completedCount = state.subjects.reduce((sum, subj) => {
      const progressObj = state.progress[subj.id] || {};
      return sum + Object.values(progressObj).filter(v => v === true).length;
    }, 0);
    
    const goalHours = parseInt(localStorage.getItem('study_goal') || '30', 10);
    let focusHours = 4 + completedCount * 4;
    if (focusHours > goalHours) focusHours = goalHours;
    const focusMinutes = 15;
    const focusPercent = Math.round((focusHours / goalHours) * 100);

    const subjectsBreakdown = state.subjects.map(subj => {
      const progressObj = state.progress[subj.id] || {};
      const completedInSubj = Object.values(progressObj).filter(v => v === true).length;
      const hours = 2 + completedInSubj * 5;
      return {
        code: subj.code,
        hours: hours
      };
    });
    subjectsBreakdown.sort((a, b) => b.hours - a.hours);
    const maxSubjHours = Math.max(...subjectsBreakdown.map(s => s.hours)) || 1;
    
    let subjectsHTML = '';
    subjectsBreakdown.forEach((s, idx) => {
      const width = (s.hours / maxSubjHours) * 100;
      const barClass = idx === 0 ? 'subject-time-fill active' : 'subject-time-fill';
      
      subjectsHTML += `
        <li class="subject-time-item">
          <span class="subject-time-code">${s.code}</span>
          <div class="subject-time-bar-container">
            <div class="subject-time-bar">
              <div class="${barClass}" style="width: ${width}%;"></div>
            </div>
            <span class="subject-time-value">${s.hours}h</span>
          </div>
        </li>
        ${idx < subjectsBreakdown.length - 1 ? '<li class="horizontal-divider"></li>' : ''}
      `;
    });

    container.innerHTML = `
      <!-- Quote Hero Section -->
      <section class="quote-hero">
        <h2 class="font-headline-xl quote-hero-text">
          "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
        </h2>
        <p class="quote-hero-author">— Brian Herbert</p>
      </section>

      <!-- Grid Layout -->
      <div class="dashboard-grid">
        <!-- Left Column: Recently Opened Modules -->
        <div class="dashboard-list-container">
          <div class="grid-section-header">
            <h3 class="grid-section-title">Recently Opened Modules</h3>
          </div>
          <div class="dashboard-list">
            ${modulesHTML}
          </div>
        </div>

        <!-- Right Column: Study Analytics -->
        <div class="dashboard-list-container">
          <div class="grid-section-header">
            <h3 class="grid-section-title">Study Analytics</h3>
          </div>
          <div class="dashboard-list">
            <!-- Stat Box 1: Focus Time -->
            <div class="scholarly-card">
              <p class="font-label-md" style="color: var(--text-muted);">Weekly Focus Time</p>
              <div class="font-headline-xl" style="font-size: 2.2rem; margin: var(--space-xs) 0; letter-spacing: -0.01em;">
                ${focusHours}<span class="font-headline-lg" style="color: var(--text-muted); font-size: 1.4rem;">h</span> ${focusMinutes}<span class="font-headline-lg" style="color: var(--text-muted); font-size: 1.4rem;">m</span>
              </div>
              <div class="analytics-meter">
                <div class="analytics-meter-header">
                  <span>Progress to goal (${goalHours}h)</span>
                  <span>${focusPercent}%</span>
                </div>
                <div class="analytics-meter-bar">
                  <div class="analytics-meter-fill" style="width: ${focusPercent}%;"></div>
                </div>
              </div>
            </div>

            <!-- Stat Box 2: Breakdown -->
            <div class="scholarly-card">
              <p class="font-label-md" style="color: var(--text-muted); margin-bottom: var(--space-sm);">Time by Subject</p>
              <ul class="subject-time-list">
                ${subjectsHTML}
              </ul>
            </div>
          </div>
        </div>
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
        <div class="card subject-list-card" style="border-left: 4px solid ${subj.accentColor || 'var(--accent-primary)'}; display: flex; flex-direction: column; gap: var(--space-md);" onclick="if (!event.target.closest('a')) window.location.hash = '#/subject/${subj.id}'">
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
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: var(--space-sm); border-top: 1px solid var(--border-color);">
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
      <div class="m-t-md m-b-xl" style="margin-top: var(--space-md); margin-bottom: var(--space-xl);">
        <a href="#/" class="btn btn-ghost" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">
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
    
    // Calculate total stats
    const totalModules = state.subjects.reduce((sum, s) => sum + s.modules.length, 0);
    const completedModules = state.subjects.reduce((sum, subj) => {
      const progressObj = state.progress[subj.id] || {};
      return sum + Object.values(progressObj).filter(v => v === true).length;
    }, 0);
    
    // Gather quiz results from localStorage
    const quizResults = [];
    state.subjects.forEach(subj => {
      subj.modules.forEach(mod => {
        const stored = localStorage.getItem(`quiz_${subj.id}_${mod.id}`);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            quizResults.push({
              subjectId: subj.id,
              subjectName: subj.name,
              subjectCode: subj.code,
              moduleId: mod.id,
              moduleTitle: mod.title,
              ...parsed
            });
          } catch (e) { /* skip invalid */ }
        }
      });
    });
    
    const quizCount = quizResults.length;
    const avgQuizScore = quizCount > 0
      ? Math.round(quizResults.reduce((sum, q) => sum + q.percent, 0) / quizCount)
      : 0;
    
    // Study streak: days since first progress entry
    let streakDays = 0;
    const firstOpened = localStorage.getItem('recently_opened_modules');
    if (firstOpened) {
      try {
        const list = JSON.parse(firstOpened);
        if (list.length > 0) {
          const oldest = list[list.length - 1];
          if (oldest.timestamp) {
            streakDays = Math.max(1, Math.floor((Date.now() - oldest.timestamp) / (1000 * 60 * 60 * 24)));
          }
        }
      } catch (e) { /* skip */ }
    }
    if (completedModules > 0 && streakDays === 0) streakDays = 1;
    
    // SVG ring calculations
    const radius = 76;
    const circumference = 2 * Math.PI * radius;
    const overallOffset = circumference - (overall / 100) * circumference;
    
    // Build per-subject detail cards
    let subjectCardsHTML = '';
    state.subjects.forEach(subj => {
      const percent = getSubjectProgressPercent(subj.id);
      const progressObj = state.progress[subj.id] || {};
      const completedCount = Object.values(progressObj).filter(v => v === true).length;
      
      // Mini ring calculations
      const miniRadius = 18;
      const miniCircumference = 2 * Math.PI * miniRadius;
      const miniOffset = miniCircumference - (percent / 100) * miniCircumference;
      
      // Module checklist
      let checklistHTML = '';
      subj.modules.forEach(mod => {
        const isCompleted = progressObj[mod.id] === true;
        const checkIcon = isCompleted
          ? `<span class="check-icon completed">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </span>`
          : `<span class="check-icon incomplete"></span>`;
        
        checklistHTML += `
          <li class="module-checklist-item">
            <a href="#/subject/${subj.id}/module/${mod.id}">
              ${checkIcon}
              <span class="module-check-label">${mod.title}</span>
            </a>
            <span class="module-check-num">${mod.hours}</span>
          </li>
        `;
      });
      
      subjectCardsHTML += `
        <div class="subject-detail-card" style="border-left-color: ${subj.accentColor};">
          <div class="subject-detail-header">
            <div>
              <span class="subject-detail-code">${subj.code} · ${subj.type}</span>
              <h4>${subj.name}</h4>
            </div>
            <div class="subject-detail-ring">
              <svg viewBox="0 0 48 48">
                <circle class="mini-ring-bg" cx="24" cy="24" r="${miniRadius}"></circle>
                <circle class="mini-ring-fill" cx="24" cy="24" r="${miniRadius}"
                  stroke="${subj.accentColor}"
                  stroke-dasharray="${miniCircumference}"
                  stroke-dashoffset="${miniCircumference}"
                  data-target-offset="${miniOffset}"></circle>
              </svg>
              <span class="mini-ring-label">${percent}%</span>
            </div>
          </div>
          
          <div class="progress-container" style="flex-direction: column; align-items: stretch; gap: var(--space-xxs);">
            <div class="flex justify-between" style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">
              <span>${completedCount}/${subj.modules.length} completed</span>
              <span style="font-weight: 700; color: var(--text-primary);">${percent}%</span>
            </div>
            <div class="progress-bar-bg" style="height: 6px;">
              <div class="progress-bar-fill" style="width: ${percent}%; background-color: ${subj.accentColor};"></div>
            </div>
          </div>
          
          <ul class="module-checklist">
            ${checklistHTML}
          </ul>
        </div>
      `;
    });
    
    // Build quiz performance cards
    let quizPerfHTML = '';
    if (quizResults.length > 0) {
      let quizCardsHTML = '';
      quizResults.forEach(q => {
        const passClass = q.percent >= 60 ? 'pass' : 'fail';
        quizCardsHTML += `
          <div class="quiz-perf-card">
            <span class="quiz-perf-subject">${q.subjectCode}</span>
            <span class="quiz-perf-module">Module ${q.moduleId}: ${q.moduleTitle}</span>
            <div class="quiz-perf-score">
              <span class="quiz-perf-value ${passClass}">${q.percent}%</span>
              <span class="quiz-perf-date">${q.score}/${q.total} · ${q.date}</span>
            </div>
          </div>
        `;
      });
      
      quizPerfHTML = `
        <div class="section-header" style="margin-top: var(--space-xl);">
          <h3 class="section-title">Quiz Performance</h3>
          <p class="section-desc">Your best scores across module quizzes.</p>
        </div>
        <div class="quiz-perf-grid">
          ${quizCardsHTML}
        </div>
      `;
    }
    
    // Empty state CTA when nothing completed
    const emptyStateCTA = completedModules === 0 && quizCount === 0
      ? `
        <div class="empty-state">
          <div class="empty-state-icon">📚</div>
          <h3>Your journey begins here</h3>
          <p>You haven't completed any modules yet. Start studying to see your progress visualized with detailed analytics and module checklists.</p>
          <a href="#/subjects" class="btn btn-primary">Browse Subjects →</a>
        </div>
      `
      : '';
    
    container.innerHTML = `
      <div class="section-header" style="margin-top: 0;">
        <h2 class="section-title">Progress Tracker</h2>
        <p class="section-desc">Visual summaries of subject completion, module checklists, and quiz performance.</p>
      </div>

      <div class="progress-hero">
        <!-- Large circular progress ring -->
        <div class="progress-ring-card">
          <h3>Overall Semester Completion</h3>
          <div class="progress-ring-large">
            <svg viewBox="0 0 180 180">
              <circle class="ring-bg" cx="90" cy="90" r="${radius}"></circle>
              <circle class="ring-fill" cx="90" cy="90" r="${radius}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference}"
                data-target-offset="${overallOffset}"></circle>
            </svg>
            <div class="ring-label">
              <span class="ring-label-percent" data-target="${overall}">0</span>
              <span class="ring-label-sub">percent</span>
            </div>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.85rem;">
            ${completedModules} of ${totalModules} modules across ${state.subjects.length} subjects
          </p>
        </div>
        
        <!-- Stats summary -->
        <div class="stats-summary-grid">
          <div class="stat-card">
            <span class="stat-card-label">Modules Completed</span>
            <span class="stat-card-value">${completedModules}<span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">/${totalModules}</span></span>
            <span class="stat-card-detail">${totalModules - completedModules} modules remaining</span>
          </div>
          <div class="stat-card">
            <span class="stat-card-label">Quiz Average</span>
            <span class="stat-card-value">${quizCount > 0 ? avgQuizScore + '%' : '—'}</span>
            <span class="stat-card-detail">${quizCount} quiz${quizCount !== 1 ? 'zes' : ''} attempted</span>
          </div>
          <div class="stat-card">
            <span class="stat-card-label">Study Streak</span>
            <span class="stat-card-value">${streakDays > 0 ? streakDays : '—'}<span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">${streakDays > 0 ? ' days' : ''}</span></span>
            <span class="stat-card-detail">${streakDays > 0 ? 'Keep it going!' : 'Start studying to begin'}</span>
          </div>
        </div>
      </div>

      ${emptyStateCTA}

      <div class="section-header">
        <h3 class="section-title">Subject Breakdown</h3>
        <p class="section-desc">Track each module individually. Click any module to jump to its content.</p>
      </div>
      <div class="progress-subjects-grid">
        ${subjectCardsHTML}
      </div>

      ${quizPerfHTML}
    `;
    
    // Animate the ring and counter after render
    requestAnimationFrame(() => {
      // Animate large ring
      const ringFill = container.querySelector('.ring-fill');
      if (ringFill) {
        ringFill.style.strokeDashoffset = ringFill.dataset.targetOffset;
      }
      
      // Animate mini rings
      container.querySelectorAll('.mini-ring-fill').forEach(el => {
        el.style.strokeDashoffset = el.dataset.targetOffset;
      });
      
      // Count-up animation for the percentage number
      const percentEl = container.querySelector('.ring-label-percent');
      if (percentEl) {
        const target = parseInt(percentEl.dataset.target, 10);
        if (target > 0) {
          let current = 0;
          const duration = 1200;
          const stepTime = duration / target;
          const timer = setInterval(() => {
            current++;
            percentEl.textContent = current;
            if (current >= target) clearInterval(timer);
          }, stepTime);
        } else {
          percentEl.textContent = '0';
        }
      }
    });
  }

  // View: Settings
  function renderSettings(container) {
    // Calculate data summary
    const totalModules = state.subjects.reduce((sum, s) => sum + s.modules.length, 0);
    const completedModules = state.subjects.reduce((sum, subj) => {
      const progressObj = state.progress[subj.id] || {};
      return sum + Object.values(progressObj).filter(v => v === true).length;
    }, 0);
    
    let quizCount = 0;
    state.subjects.forEach(subj => {
      subj.modules.forEach(mod => {
        if (localStorage.getItem(`quiz_${subj.id}_${mod.id}`)) quizCount++;
      });
    });
    
    // Count total localStorage keys used by this app
    let storageKeys = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('progress_') || key.startsWith('quiz_') || key.startsWith('recently_') || key === 'theme' || key === 'reader_bg' || key === 'reader_font' || key === 'reader_size')) {
        storageKeys++;
      }
    }

    container.innerHTML = `
      <div class="section-header" style="margin-top: 0;">
        <h2 class="section-title">Settings</h2>
        <p class="section-desc">Manage appearance, data, shortcuts, and application preferences.</p>
      </div>

      <div class="settings-grid m-t-xl">
        
        <!-- APPEARANCE -->
        <div class="settings-section">
          <h3 class="settings-section-title">Appearance</h3>
          
          <div class="settings-card">
            <h4>
              <span class="material-symbols-outlined">palette</span>
              Theme Mode
            </h4>
            <p>Switch between dark and light mode. Your preference is saved automatically.</p>
            <div class="btn-row">
              <button id="settingsThemeToggle" class="btn btn-primary" style="gap: var(--space-xs);">
                <span class="material-symbols-outlined" style="font-size: 18px;">${state.theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                ${state.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>
          
          <div class="settings-card">
            <h4>
              <span class="material-symbols-outlined">text_fields</span>
              Reader Preferences
            </h4>
            <p>Adjust reading background, font, and text size for comfortable study sessions.</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md); margin-top: var(--space-sm);">
              <div>
                <label class="reader-label" style="margin-bottom: var(--space-xs); display: block;">Background Theme</label>
                <div class="swatches-grid" id="settingsSwatches">
                  <button class="swatch swatch-default" data-bg="default" title="Default" aria-label="Default Background"></button>
                  <button class="swatch swatch-sepia" data-bg="sepia" title="Sepia" aria-label="Sepia Background"></button>
                  <button class="swatch swatch-mint" data-bg="mint" title="Mint" aria-label="Mint Background"></button>
                  <button class="swatch swatch-sunset" data-bg="sunset" title="Sunset" aria-label="Sunset Background"></button>
                  <button class="swatch swatch-ocean" data-bg="ocean" title="Ocean" aria-label="Ocean Background"></button>
                  <button class="swatch swatch-lavender" data-bg="lavender" title="Lavender" aria-label="Lavender Background"></button>
                  <button class="swatch swatch-nord" data-bg="nord" title="Nord" aria-label="Nord Background"></button>
                </div>
              </div>
              <div>
                <label class="reader-label" style="margin-bottom: var(--space-xs); display: block;">Font Family</label>
                <div class="font-options" id="settingsFonts" style="grid-template-columns: repeat(3, 1fr); gap: 4px;">
                  <button class="font-opt" data-font="inter" style="font-family: var(--font-body);">Sans</button>
                  <button class="font-opt" data-font="georgia" style="font-family: Georgia, serif;">Georgia</button>
                  <button class="font-opt" data-font="merriweather" style="font-family: 'Merriweather', serif;">Serif</button>
                  <button class="font-opt" data-font="mono" style="font-family: var(--font-mono);">Mono</button>
                  <button class="font-opt" data-font="lora" style="font-family: 'Lora', serif;">Lora</button>
                  <button class="font-opt" data-font="system" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">System</button>
                </div>
              </div>
            </div>
            <div style="margin-top: var(--space-sm);">
              <label class="reader-label" style="margin-bottom: var(--space-xs); display: block;">Font Size</label>
              <div class="size-options" id="settingsSizes" style="max-width: 320px; grid-template-columns: repeat(6, 1fr); gap: 4px;">
                <button class="size-opt" data-size="xs" title="Extra Small">A--</button>
                <button class="size-opt" data-size="sm" title="Small">A-</button>
                <button class="size-opt" data-size="md" title="Medium">A</button>
                <button class="size-opt" data-size="lg" title="Large">A+</button>
                <button class="size-opt" data-size="xl" title="Extra Large">A++</button>
                <button class="size-opt" data-size="xxl" title="Huge">A+++</button>
              </div>
            </div>
          </div>
        </div>

        <!-- STUDY PREFERENCES -->
        <div class="settings-section">
          <h3 class="settings-section-title">Study Preferences</h3>
          
          <div class="settings-card">
            <h4>
              <span class="material-symbols-outlined">trending_up</span>
              Weekly Study Goal
            </h4>
            <p>Set your target study hours. The progress ring on the dashboard will dynamically adjust based on this goal.</p>
            <div class="btn-row" id="settingsGoalHours" style="gap: var(--space-xs); flex-wrap: wrap; margin-top: var(--space-sm);">
              <button class="goal-opt btn btn-secondary" data-goal="10">10 Hours</button>
              <button class="goal-opt btn btn-secondary" data-goal="20">20 Hours</button>
              <button class="goal-opt btn btn-secondary" data-goal="30">30 Hours</button>
              <button class="goal-opt btn btn-secondary" data-goal="40">40 Hours</button>
              <button class="goal-opt btn btn-secondary" data-goal="50">50 Hours</button>
            </div>
          </div>

          <div class="settings-card">
            <h4>
              <span class="material-symbols-outlined">rule</span>
              Study Rules & Shortcuts
            </h4>
            <p>Enforce strict completion rules and toggle keyboard navigation shortcuts.</p>
            <div style="display: flex; flex-direction: column; gap: var(--space-sm); margin-top: var(--space-sm);">
              <label class="flex align-center gap-sm" style="cursor: pointer; user-select: none; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="requireQuizCheckbox" style="cursor: pointer; width: 18px; height: 18px; margin: 0;">
                <span>Require quiz passing score (60%) to mark module completed</span>
              </label>
              <label class="flex align-center gap-sm" style="cursor: pointer; user-select: none; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="enableShortcutsCheckbox" style="cursor: pointer; width: 18px; height: 18px; margin: 0;">
                <span>Enable keyboard shortcuts (Esc, Arrow keys, 1-5)</span>
              </label>
            </div>
          </div>
        </div>

        <!-- DATA MANAGEMENT -->
        <div class="settings-section">
          <h3 class="settings-section-title">Study Data</h3>
          
          <div class="settings-card">
            <h4>
              <span class="material-symbols-outlined">database</span>
              Data Summary
            </h4>
            <p>Overview of your locally stored study data.</p>
            <div class="data-summary-row">
              <div class="data-summary-item">
                <span class="ds-value">${completedModules}</span>
                <span class="ds-label">Modules Done</span>
              </div>
              <div class="data-summary-item">
                <span class="ds-value">${quizCount}</span>
                <span class="ds-label">Quizzes Taken</span>
              </div>
              <div class="data-summary-item">
                <span class="ds-value">${storageKeys}</span>
                <span class="ds-label">Storage Keys</span>
              </div>
            </div>
          </div>
          
          <div class="settings-card">
            <h4>
              <span class="material-symbols-outlined">download</span>
              Export & Import Progress
            </h4>
            <p>Download your progress as a JSON file for backup, or import a previously exported file to restore your data when switching browsers.</p>
            <div class="btn-row">
              <button id="exportDataBtn" class="btn btn-secondary" style="gap: var(--space-xs);">
                <span class="material-symbols-outlined" style="font-size: 16px;">download</span>
                Export Progress
              </button>
              <button id="importDataBtn" class="btn btn-ghost" style="gap: var(--space-xs);">
                <span class="material-symbols-outlined" style="font-size: 16px;">upload</span>
                Import Progress
              </button>
              <input type="file" id="importFileInput" class="hidden-input" accept=".json">
            </div>
          </div>
        </div>
        
        <!-- KEYBOARD SHORTCUTS -->
        <div class="settings-section">
          <h3 class="settings-section-title">Keyboard Shortcuts</h3>
          
          <div class="settings-card" style="padding: 0; overflow: hidden;">
            <table class="shortcut-table">
              <thead>
                <tr>
                  <th>Shortcut</th>
                  <th>Action</th>
                  <th>Context</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><kbd>←</kbd></td>
                  <td>Previous module</td>
                  <td>Module view</td>
                </tr>
                <tr>
                  <td><kbd>→</kbd></td>
                  <td>Next module</td>
                  <td>Module view</td>
                </tr>
                <tr>
                  <td><kbd>1</kbd> — <kbd>5</kbd></td>
                  <td>Jump to module N</td>
                  <td>Subject landing</td>
                </tr>
                <tr>
                  <td><kbd>Esc</kbd></td>
                  <td>Go back (to subject or dashboard)</td>
                  <td>Module / Subject</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- ABOUT -->
        <div class="settings-section">
          <h3 class="settings-section-title">About</h3>
          
          <div class="about-card">
            <div class="about-header">
              <div class="about-logo">S5</div>
              <div>
                <h4>BCA Sem 5 Study Hub</h4>
                <p>Interactive exam preparation tool</p>
              </div>
            </div>
            <dl class="about-details">
              <dt>Semester</dt>
              <dd>BCA Semester V — 2026</dd>
              <dt>University</dt>
              <dd>Brainware University</dd>
              <dt>Subjects</dt>
              <dd>${state.subjects.length} subjects · ${totalModules} modules</dd>
              <dt>Built by</dt>
              <dd>Aritra ❤️</dd>
              <dt>Version</dt>
              <dd>2.0.0</dd>
            </dl>
          </div>
        </div>
        
        <!-- DANGER ZONE -->
        <div class="settings-section">
          <h3 class="settings-section-title">Danger Zone</h3>
          
          <div class="danger-zone">
            <h4>
              <span class="material-symbols-outlined" style="font-size: 20px;">warning</span>
              Reset All Study Data
            </h4>
            <p>This will permanently clear all module completion records and quiz scores from your browser's local storage. Reader preferences and theme settings will be preserved. This action cannot be undone.</p>
            <button id="resetProgressBtn" class="btn-danger">
              Reset All Progress
            </button>
          </div>
        </div>
        
      </div>
    `;

    // Sync active states for reader preferences in settings
    const currentBg = localStorage.getItem('reader_bg') || 'default';
    const currentFont = localStorage.getItem('reader_font') || 'inter';
    const currentSize = localStorage.getItem('reader_size') || 'md';
    const currentGoal = localStorage.getItem('study_goal') || '30';
    const requireQuiz = localStorage.getItem('require_quiz_to_complete') === 'true';
    const enableShortcuts = localStorage.getItem('enable_shortcuts') !== 'false';
    
    container.querySelectorAll('#settingsSwatches .swatch').forEach(btn => {
      if (btn.dataset.bg === currentBg) btn.classList.add('active');
      btn.addEventListener('click', () => applyReaderBg(btn.dataset.bg));
    });
    
    container.querySelectorAll('#settingsFonts .font-opt').forEach(btn => {
      if (btn.dataset.font === currentFont) btn.classList.add('active');
      btn.addEventListener('click', () => applyReaderFont(btn.dataset.font));
    });
    
    container.querySelectorAll('#settingsSizes .size-opt').forEach(btn => {
      if (btn.dataset.size === currentSize) btn.classList.add('active');
      btn.addEventListener('click', () => applyReaderSize(btn.dataset.size));
    });

    container.querySelectorAll('#settingsGoalHours .goal-opt').forEach(btn => {
      if (btn.dataset.goal === currentGoal) {
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
      btn.addEventListener('click', () => {
        localStorage.setItem('study_goal', btn.dataset.goal);
        renderSettings(container);
      });
    });

    const quizCheckbox = container.querySelector('#requireQuizCheckbox');
    if (quizCheckbox) {
      quizCheckbox.checked = requireQuiz;
      quizCheckbox.addEventListener('change', (e) => {
        localStorage.setItem('require_quiz_to_complete', e.target.checked);
      });
    }

    const shortcutsCheckbox = container.querySelector('#enableShortcutsCheckbox');
    if (shortcutsCheckbox) {
      shortcutsCheckbox.checked = enableShortcuts;
      shortcutsCheckbox.addEventListener('change', (e) => {
        localStorage.setItem('enable_shortcuts', e.target.checked);
      });
    }

    // Bind theme toggle
    const themeBtn = document.getElementById('settingsThemeToggle');
    themeBtn.addEventListener('click', () => {
      toggleTheme();
      // Re-render to update button text
      renderSettings(container);
    });

    // Export progress
    const exportBtn = document.getElementById('exportDataBtn');
    exportBtn.addEventListener('click', () => {
      const exportData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('progress_') || key.startsWith('quiz_') || key.startsWith('recently_'))) {
          exportData[key] = localStorage.getItem(key);
        }
      }
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `study-hub-progress-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // Import progress
    const importBtn = document.getElementById('importDataBtn');
    const importInput = document.getElementById('importFileInput');
    importBtn.addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          let importedCount = 0;
          Object.entries(data).forEach(([key, value]) => {
            if (key.startsWith('progress_') || key.startsWith('quiz_') || key.startsWith('recently_')) {
              localStorage.setItem(key, value);
              importedCount++;
            }
          });
          loadProgress();
          alert(`Successfully imported ${importedCount} data entries. Your progress has been restored.`);
          renderSettings(container); // Re-render to update data summary
        } catch (err) {
          alert('Invalid file format. Please select a valid Study Hub export file.');
        }
      };
      reader.readAsText(file);
    });

    // Reset progress
    const resetBtn = document.getElementById('resetProgressBtn');
    resetBtn.addEventListener('click', () => {
      if (confirm('⚠️ Are you sure you want to delete all completion records and quiz scores?\n\nThis cannot be undone.')) {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('progress_') || key.startsWith('quiz_') || key.startsWith('recently_'))) {
            localStorage.removeItem(key);
          }
        }
        loadProgress();
        alert('All study progress has been reset successfully.');
        renderSettings(container); // Re-render to update data summary
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
    // Check if shortcuts are enabled
    if (localStorage.getItem('enable_shortcuts') === 'false') {
      return;
    }

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

  // Time & Weather Widget Initialization
  function initWeatherTime() {
    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const timeStr = `${hours}:${minutes} ${ampm}`;
      
      const widgetTime = document.getElementById('widgetTimeText');
      if (widgetTime) {
        widgetTime.textContent = timeStr;
      }
      
      const widgetWeatherIcon = document.getElementById('widgetWeatherIcon');
      const widgetWeatherText = document.getElementById('widgetWeatherText');
      if (widgetWeatherIcon && widgetWeatherText) {
        const currentHour = now.getHours();
        const isNight = currentHour >= 18 || currentHour < 6;
        if (isNight) {
          widgetWeatherIcon.textContent = 'nights_stay';
          widgetWeatherText.textContent = 'Kolkata, 27°C';
        } else {
          widgetWeatherIcon.textContent = 'sunny';
          widgetWeatherText.textContent = 'Kolkata, 32°C';
        }
      }
    }
    
    updateClock();
    setInterval(updateClock, 30000);
  }

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

    // 1c. Initial Time & Weather Setup
    initWeatherTime();

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
