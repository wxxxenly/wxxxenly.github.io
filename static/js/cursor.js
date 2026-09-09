function initCustomCursor() {
  // Не добавляем на мобильных
  if (window.innerWidth <= 768) return;
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  
  const cursorOutline = document.createElement('div');
  cursorOutline.className = 'custom-cursor-outline';
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorOutline);
  
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Точка следует мгновенно
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  
  // Обводка следует с задержкой (инерция)
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  
  // Увеличение при наведении на интерактивные элементы
  const hoverElements = document.querySelectorAll('a, button, .tech-badge, .project-card, .contact-btn, .filter-btn, .stat-card, .timeline-content');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorOutline.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorOutline.classList.remove('hover');
    });
  });
  
  // Для динамически создаваемых элементов
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .tech-badge, .project-card, .contact-btn, .filter-btn, .stat-card, .timeline-content');
    if (target) {
      cursor.classList.add('hover');
      cursorOutline.classList.add('hover');
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .tech-badge, .project-card, .contact-btn, .filter-btn, .stat-card, .timeline-content');
    if (target) {
      cursor.classList.remove('hover');
      cursorOutline.classList.remove('hover');
    }
  });
}