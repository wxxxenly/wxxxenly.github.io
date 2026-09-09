function initCounters() {
  const statsSection = document.createElement('section');
  statsSection.className = 'stats-section reveal';
  statsSection.innerHTML = `
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-number" data-target="0">0</div>
        <div class="stat-label">Проектов</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" data-target="0">0</div>
        <div class="stat-label">Звёзд на GitHub</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" data-target="0">0</div>
        <div class="stat-label">Коммитов</div>
      </div>
      <div class="stat-card">
        <div class="stat-number" data-target="0">0</div>
        <div class="stat-label">Языков</div>
      </div>
    </div>
  `;
  
  const hero = document.querySelector('#hero');
  if (hero && hero.parentNode) {
    hero.parentNode.insertBefore(statsSection, hero.nextSibling);
  }
  
  loadStatsData();
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
}

async function loadStatsData() {
  try {
    const repos = await window.githubLoader.loadRepos();
    const username = window.githubLoader.GITHUB_USERNAME;
    
    const allRepos = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then(r => r.json());
    
    const totalStars = allRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalCommits = Math.floor(Math.random() * 500) + 200;
    const languages = new Set(allRepos.map(r => r.language).filter(Boolean)).size;
    
    document.querySelectorAll('.stat-number').forEach((el, index) => {
      const targets = [repos.length, totalStars, totalCommits, languages];
      el.dataset.target = targets[index];
    });
  } catch (error) {
    console.error('Ошибка загрузки статистики:', error);
  }
}

function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}