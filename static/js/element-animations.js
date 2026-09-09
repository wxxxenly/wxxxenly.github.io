function initElementAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Наблюдаем за элементами с классами анимации
  const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .zoom-in');
  animatedElements.forEach(el => observer.observe(el));
}

// Функция для добавления анимаций к динамически созданным элементам
function applyElementAnimations() {
  // Добавляем анимации к карточкам проектов
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.classList.add('fade-up', `delay-${(index % 5) + 1}`);
  });
  
  // Добавляем анимации к бейджам технологий
  document.querySelectorAll('.tech-badge').forEach((badge, index) => {
    badge.classList.add('fade-up', `delay-${(index % 5) + 1}`);
  });
  
  // Добавляем анимации к stat-карточкам
  document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.classList.add('zoom-in', `delay-${index + 1}`);
  });
  
  // Перезапускаем observer для новых элементов
  initElementAnimations();
}