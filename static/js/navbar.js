function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navbarLinks = document.querySelectorAll('.navbar-link');
  const scrollProgress = document.getElementById('scrollProgress');
  
  // Показ/скрытие navbar при скролле + прогресс-бар
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 300) {
      if (navbar) navbar.classList.add('visible');
    } else {
      if (navbar) navbar.classList.remove('visible');
    }
    
    // Прогресс-бар
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }
    
    // Подсветка активной секции (с учётом динамически созданных)
    updateActiveSection();
  });
  
  // Бургер-меню
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
  }
  
  // Плавный скролл по клику на ссылки
  navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        if (navbarMenu && navbarMenu.classList.contains('active')) {
          navbarToggle.classList.remove('active');
          navbarMenu.classList.remove('active');
        }
      }
    });
  });
  
  // Подсветка активной секции (работает с динамически созданными секциями)
  function updateActiveSection() {
    const scrollPos = window.scrollY + 100;
    const allSections = document.querySelectorAll('section[id]');
    
    allSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navbarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Вызываем сразу при загрузке
  updateActiveSection();
}