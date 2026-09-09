// Анимация появления секций при скролле
function initScrollAnimations() {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        const items = entry.target.querySelectorAll('.animate-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 150);
        });
        
        if (entry.target.classList.contains('section-projects')) {
          const cards = entry.target.querySelectorAll('.project-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 200);
          });
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });
  
  document.querySelectorAll('.reveal').forEach(section => {
    sectionObserver.observe(section);
  });
}