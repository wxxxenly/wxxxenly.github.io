document.addEventListener('DOMContentLoaded', async () => {
  // Загружаем все данные параллельно
  const [about, projects, languageStats, contact] = await Promise.all([
    window.githubLoader.loadUserData(),
    window.githubLoader.loadRepos(),
    window.githubLoader.loadLanguageStats(),
    Promise.resolve(window.githubLoader.loadContacts())
  ]);
  
  // Обновляем логотип в навбаре
  const navLogo = document.getElementById('navLogo');
  if (navLogo) navLogo.textContent = about.name;
  
  // Рендерим страницу
  renderPage(about, projects, languageStats, contact);
  
  // Инициализируем все модули
  initScrollAnimations();
  initCarousel();
  initNavbar();
  initTerminal();
});

function renderPage(about, projects, languageStats, contact) {
  const app = document.getElementById('app');
  
  // Формируем бейджи технологий (твой список)
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
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}/${t.icon}-original.svg" alt="${t.name}">
      <span>${t.name}</span>
    </div>
  `).join('');
  
  // Формируем статистику языков
  const langStatsHTML = languageStats.length > 0 
    ? languageStats.map(stat => `
        <div class="stat-item">
          <div class="stat-header">
            ${stat.icon_url ? `<img src="${stat.icon_url}" alt="${stat.language}" class="stat-icon">` : ''}
            <span class="stat-name">${stat.language}</span>
            <span class="stat-percentage">${stat.percentage}%</span>
          </div>
          <div class="stat-bar">
            <div class="stat-bar-fill" style="width: ${stat.percentage}%"></div>
          </div>
        </div>
      `).join('')
    : '<p class="no-stats">Статистика недоступна</p>';
  
  // Формируем карточки проектов
  const projectSlides = projects.map(p => `
    <div class="carousel-slide">
      <div class="project-card">
        <h3>${p.title}</h3>
        <p class="description">${p.description}</p>
        <div class="project-meta">
          ${p.icon_url ? `
            <div class="language-icon">
              <img src="${p.icon_url}" alt="${p.language}" width="20" height="20">
              <span>${p.language}</span>
            </div>
          ` : ''}
          ${p.stars > 0 ? `<span class="stars">⭐ ${p.stars}</span>` : ''}
        </div>
        <a href="${p.link}" target="_blank" class="link">Посмотреть на GitHub →</a>
      </div>
    </div>
  `).join('');
  
  const indicators = projects.map((_, i) => 
    `<span class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
  ).join('');
  
  // Собираем всё вместе
  app.innerHTML = `
    <!-- HERO -->
    <section id="hero" class="full-screen hero reveal">
      <div class="melting-text-container animate-item">
        <div class="avatar-container">
          ${about.avatar_url 
            ? `<img src="${about.avatar_url}" alt="${about.name}" class="avatar">`
            : `<div class="avatar-placeholder"></div>`
          }
        </div>
        <h1 class="melting-text" data-text="${about.name}">${about.name}</h1>
        <p class="hero-subtitle">${about.role}</p>
      </div>
      <div class="scroll-prompt animate-item">
        <span>↓ Скролль вниз, чтобы узнать больше</span>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="full-screen section-about reveal">
      <div class="section-content">
        <h2 class="animate-item">Обо мне</h2>
        <p class="bio animate-item">${about.bio}</p>
        
        <div class="about-grid animate-item">
          <div class="tech-stack-column">
            <h3 class="tech-stack-title">Tech Stack:</h3>
            <div class="tech-stack-grid">
              ${techBadges}
            </div>
          </div>
          
          <div class="stats-column">
            <h3 class="tech-stack-title">Most Used Languages:</h3>
            <div class="stats-wrapper">
              ${langStatsHTML}
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-prompt animate-item">
        <span>↓ Скролль дальше, чтобы увидеть проекты</span>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="full-screen section-projects reveal">
      <div class="section-content">
        <h2 class="animate-item">Мои проекты</h2>
        
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
        <span>↓ Скролль дальше, чтобы связаться со мной</span>
      </div>
    </section>

    <!-- CONTACTS -->
    <section id="contacts" class="full-screen section-contact reveal">
      <div class="section-content">
        <h2 class="animate-item">Контакты</h2>
        <p class="contact-text animate-item">Буду рад сотрудничеству!</p>
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
}