function initTimeline() {
  const timelineSection = document.createElement('section');
  timelineSection.className = 'timeline-section reveal visible';
  timelineSection.id = 'timeline';
  timelineSection.innerHTML = `
    <div class="timeline-container">
      <h2 class="timeline-title fade-up">Мой путь</h2>
      <div class="timeline-line"></div>
      <div class="timeline-items">
        <div class="timeline-item fade-left delay-1">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">2024</div>
            <h3 class="timeline-title-item">Junior Developer</h3>
            <p class="timeline-description">Начал карьеру в разработке. Изучаю новые технологии и работаю над пет-проектами.</p>
          </div>
        </div>
        
        <div class="timeline-item fade-right delay-2">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">2023</div>
            <h3 class="timeline-title-item">Обучение программированию</h3>
            <p class="timeline-description">Прошёл интенсивные курсы по Python и веб-разработке.</p>
          </div>
        </div>
        
        <div class="timeline-item fade-left delay-3">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">2022</div>
            <h3 class="timeline-title-item">Первый проект</h3>
            <p class="timeline-description">Создал свой первый полноценный веб-сайт.</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const contacts = document.querySelector('#contacts');
  if (contacts && contacts.parentNode) {
    contacts.parentNode.insertBefore(timelineSection, contacts);
  }
  
  // Применяем анимации к timeline элементам
  setTimeout(() => {
    document.querySelectorAll('.timeline-item, .timeline-title').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}