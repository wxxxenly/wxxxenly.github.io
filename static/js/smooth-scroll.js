function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return;
  
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });
  
  // Синхронизация с requestAnimationFrame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  // Интеграция с навбаром (плавный скролл по клику)
  const navbarLinks = document.querySelectorAll('.navbar-link[href^="#"]');
  navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        lenis.scrollTo(target, { duration: 1.5 });
      }
    });
  });
  
  // Кнопка "Наверх"
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      lenis.scrollTo(0, { duration: 1.5 });
    });
  }
  
  // Экспорт для использования в других модулях
  window.lenis = lenis;
}