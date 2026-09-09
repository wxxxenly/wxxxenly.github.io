function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide:not(.hidden)');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!track || slides.length === 0) return;
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === currentIndex);
    });
  }
  
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  let autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
  
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carouselContainer.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });
  }
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
  });
}