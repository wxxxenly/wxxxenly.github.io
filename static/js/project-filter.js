function initProjectFilter() {
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;
    
    const language = e.target.dataset.language;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.language === language);
    });
    
    document.querySelectorAll('.carousel-slide').forEach(slide => {
      if (language === 'all' || slide.dataset.language === language) {
        slide.classList.remove('hidden');
      } else {
        slide.classList.add('hidden');
      }
    });
    
    const track = document.querySelector('.carousel-track');
    if (track) {
      track.style.transform = 'translateX(0)';
    }
    
    setTimeout(() => {
      initCarousel();
    }, 100);
  });
}