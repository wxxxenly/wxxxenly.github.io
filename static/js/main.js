document.addEventListener('DOMContentLoaded', async () => {
  const [about, projects, languageStats, contact, topLanguages] = await Promise.all([
    window.githubLoader.loadUserData(),
    window.githubLoader.loadRepos(),
    window.githubLoader.loadLanguageStats(),
    Promise.resolve(window.githubLoader.loadContacts()),
    window.githubLoader.loadTopLanguages()
  ]);
  
  const navLogo = document.getElementById('navLogo');
  if (navLogo) navLogo.textContent = about.name;
  
  renderPage(about, projects, languageStats, contact, topLanguages);
  applyI18n();
  
  initScrollAnimations();
  initCarousel();
  initNavbar();
  initTerminal();
  initScrollTopButton();
  initThemeToggle();
  initParticles();
  initProjectFilter();
  initTypewriter();
  initCounters();
  initYouTubePlayer();
  
  // Новые фичи
  initCustomCursor();
  initSmoothScroll();
  initKonamiCode();
  initAnalytics();
  initSessionTimer();
  initSecretRoom();
  initArcadeGames();
  
  // Применяем анимации к динамически созданным элементам
  setTimeout(() => {
    applyElementAnimations();
    initElementAnimations();
    initHeadingTypewriter();
  }, 200);
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/js/service-worker.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW error:', err));
  }
});

function renderPage(about, projects, languageStats, contact, topLanguages) {
  const app = document.getElementById('app');
  
  const techStack = [
    { name: 'HTML5', icon: 'html5' },
    { name: 'CSS3', icon: 'css3' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'Vue.js', icon: 'vuejs' },
    { name: 'Python', icon: 'python' },
    { name: 'Java', icon: 'java' },
    { name: 'FastAPI', icon: 'fastapi' },
    { name: 'Flask', icon: 'flask' },
    { name: 'Docker', icon: 'docker' },
    { name: 'Nginx', icon: 'nginx' },
    { name: 'Apache', icon: 'apache' },
    { name: 'Bash', icon: 'bash' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'Redis', icon: 'redis' },
    { name: 'Git', icon: 'git' },
    { name: 'Figma', icon: 'figma' },
    { name: 'TensorFlow', icon: 'tensorflow' }
  ];
  
  const techBadges = techStack.map(t => `
    <div class="tech-badge" title="${t.name}">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}/${t.icon}-original.svg" alt="${t.name}" loading="lazy">
      <span>${t.name}</span>
    </div>
  `).join('');
  
  const languages = [...new Set(projects.map(p => p.language).filter(Boolean))];
  
  const filterButtons = languages.map(lang => `
    <button class="filter-btn" data-language="${lang}">${lang}</button>
  `).join('');
  
  const projectSlides = projects.map(p => `
    <div class="carousel-slide" data-language="${p.language}">
      <div class="project-card">
        <h3>${p.title}</h3>
        <p class="description">${p.description}</p>
        <div class="project-meta">
          ${p.icon_url ? `
            <div class="language-icon">
              <img src="${p.icon_url}" alt="${p.language}" width="20" height="20" loading="lazy">
              <span>${p.language}</span>
            </div>
          ` : ''}
          ${p.stars > 0 ? `<span class="stars">⭐ ${p.stars}</span>` : ''}
        </div>
        <a href="${p.link}" target="_blank" class="link">${t('projects.viewOnGithub')}</a>
      </div>
    </div>
  `).join('');
  
  const indicators = projects.map((_, i) => 
    `<span class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
  ).join('');
  
  app.innerHTML = `
    <section id="hero" class="full-screen hero reveal">
      <div class="melting-text-container animate-item">
        <div class="avatar-container">
          ${about.avatar_url 
            ? `<img src="${about.avatar_url}" alt="${about.name}" class="avatar" loading="lazy">`
            : `<div class="avatar-placeholder"></div>`
          }
        </div>
        <h1 class="melting-text glitch-hover" data-text="${about.name}">${about.name}</h1>
        <p class="hero-subtitle">${about.role}</p>
      </div>
      <div class="scroll-prompt animate-item">
        <span>${t('hero.scrollDown')}</span>
      </div>
    </section>

    <section id="about" class="full-screen section-about reveal">
      <div class="section-content">
        <h2 class="animate-item">${t('about.title')}</h2>
        <p class="bio animate-item" id="bioTypewriter"></p>
        
        <div class="about-grid animate-item">
          <div class="tech-stack-column">
            <h3 class="tech-stack-title">${t('about.techStack')}</h3>
            <div class="tech-stack-grid">
              ${techBadges}
            </div>
          </div>
          
          ${topLanguages.length > 0 ? `
          <div class="skills-chart">
            <h3 class="tech-stack-title">${t('about.skillsTitle')}</h3>
            <div class="chart-container">
              <canvas id="skillsChart"></canvas>
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    </section>

    <section id="projects" class="full-screen section-projects reveal">
      <div class="section-content">
        <h2 class="animate-item">${t('projects.title')}</h2>
        
        <div class="project-filters animate-item">
          <button class="filter-btn active" data-language="all">${t('projects.filters.all')}</button>
          ${filterButtons}
        </div>
        
        <div class="carousel-container animate-item">
          <div class="carousel">
            <div class="carousel-track">
              ${projectSlides}
            </div>
          </div>
          
          <button class="carousel-btn prev-btn" aria-label="Предыдущий проект">←</button>
          <button class="carousel-btn next-btn" aria-label="Следующий проект">→</button>
          
          <div class="carousel-indicators">
            ${indicators}
          </div>
        </div>
      </div>
      <div class="scroll-prompt animate-item">
        <span>${t('projects.scrollDown')}</span>
      </div>
    </section>

    <section id="contacts" class="full-screen section-contact reveal">
      <div class="section-content">
        <h2 class="animate-item">${t('contacts.title')}</h2>
        <p class="contact-text animate-item">${t('contacts.text')}</p>
        <div class="contact-links">
          <a href="https://t.me/${contact.telegram.replace('@', '')}" target="_blank" class="contact-btn animate-item">
            <span>Telegram</span>
            <strong>${contact.telegram}</strong>
          </a>
          <a href="https://${contact.github}" target="_blank" class="contact-btn animate-item">
            <span>GitHub</span>
            <strong>${contact.github}</strong>
          </a>
        </div>
      </div>
    </section>
  `;
  
  // Рендер графика навыков
  if (topLanguages.length > 0) {
    setTimeout(() => {
      const ctx = document.getElementById('skillsChart');
      if (ctx) {
        const isLight = document.body.classList.contains('light-theme');
        const textColor = isLight ? '#333' : '#fff';
        
        const barColors = ['#ff6f61', '#ffbd44', '#ff8c69', '#ffc87c', '#e85d4e', '#d4a03c'];
        
        window.skillsChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: topLanguages.map(l => l.language),
            datasets: [{
              label: 'Количество проектов',
              data: topLanguages.map(l => l.count),
              backgroundColor: barColors.slice(0, topLanguages.length),
              borderColor: barColors.slice(0, topLanguages.length),
              borderWidth: 1,
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.7,
              categoryPercentage: 0.8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: { display: false },
              tooltip: {
                backgroundColor: isLight ? '#fff' : '#1a1a1a',
                titleColor: textColor,
                bodyColor: textColor,
                borderColor: isLight ? '#ddd' : '#333',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8
              }
            },
            scales: {
              x: {
                ticks: { color: textColor, font: { family: 'Inter', size: 12 } },
                grid: { display: false }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: textColor,
                  font: { family: 'Inter', size: 12 },
                  stepSize: 1
                },
                grid: { color: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }
              }
            }
          }
        });
      }
    }, 100);
  }
  
  // Инициализируем timeline после рендера
  setTimeout(() => {
    initTimeline();
  }, 100);
}