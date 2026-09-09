const arcadeGames = [
  {
    id: 'snake',
    title: 'Змейка',
    description: 'Классическая змейка. Собирай еду, расти, не врезайся!',
    icon: '🐍'
  },
  {
    id: 'tetris',
    title: 'Тетрис',
    description: 'Складывай фигуры, заполняй линии, набирай очки!',
    icon: ''
  },
  {
    id: 'doodle-jump',
    title: 'Doodle Jump',
    description: 'Прыгай как можно выше, не падай!',
    icon: '🦘'
  },
  {
    id: 'pong',
    title: 'Pong',
    description: 'Классический пинг-понг. Играй против компьютера!',
    icon: ''
  }
];

function initArcadeGames() {
  // Функция для открытия секции arcade
  window.openArcade = function() {
    let arcadeSection = document.getElementById('arcade');
    
    if (arcadeSection) {
      // Если уже существует, просто показываем и скроллим
      arcadeSection.classList.add('visible');
      setTimeout(() => {
        arcadeSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    
    // Создаём секцию
    arcadeSection = document.createElement('section');
    arcadeSection.className = 'arcade-section visible';
    arcadeSection.id = 'arcade';
    
    const gamesHTML = arcadeGames.map(game => `
      <div class="arcade-card" data-game="${game.id}">
        <div class="arcade-card-header">
          <div class="arcade-card-title">${game.icon} ${game.title}</div>
          <div class="arcade-card-desc">${game.description}</div>
        </div>
        <div class="arcade-card-play">ИГРАТЬ →</div>
      </div>
    `).join('');
    
    arcadeSection.innerHTML = `
    <div class="arcade-container">
        <h2 class="arcade-title">🎮 Arcade Zone</h2>
        <p class="arcade-subtitle">Выбери игру и наслаждайся! (Esc или крестик для выхода)</p>
        <div class="arcade-grid">
        ${gamesHTML}
        </div>
    </div>
    
    <div class="arcade-modal" id="arcadeModal">
        <div class="arcade-modal-content">
        <button class="arcade-modal-close" id="arcadeModalClose">×</button>
        <iframe id="arcadeFrame" src="" allowfullscreen tabindex="0"></iframe>
        </div>
    </div>
    `;
    // Вставляем после #contacts
    const contacts = document.querySelector('#contacts');
    if (contacts && contacts.parentNode) {
      contacts.parentNode.insertBefore(arcadeSection, contacts.nextSibling);
    }
    
    // Обработчики кликов на карточки
    arcadeSection.querySelectorAll('.arcade-card').forEach(card => {
      card.addEventListener('click', () => {
        const gameId = card.dataset.game;
        openGameModal(gameId);
      });
    });
    
    // Обработчик закрытия модалки
    const modalClose = document.getElementById('arcadeModalClose');
    const modal = document.getElementById('arcadeModal');
    const frame = document.getElementById('arcadeFrame');
    
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        closeGameModal();
      });
    }
    
    // Закрытие по клику на фон
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeGameModal();
        }
      });
    }
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeGameModal();
      }
    });


    function closeGameModal() {
        console.log('🎮 Closing game modal');
        modal.classList.remove('active');
        
        // Очищаем iframe с задержкой
        setTimeout(() => {
            frame.src = '';
        }, 300);
    }

        // Глобальный обработчик Escape (работает даже когда iframe активен)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            e.preventDefault();
            e.stopPropagation();
            closeGameModal();
        }
    }, true);

    function openGameModal(gameId) {
        const game = arcadeGames.find(g => g.id === gameId);
        if (!game) {
            console.error('❌ Game not found:', gameId);
            return;
        }
        
        const gamePath = `static/games/${gameId}.html`;
        console.log('🎮 Loading game from:', gamePath);
        
        frame.src = gamePath;
        modal.classList.add('active');
        
        // Автоматический фокус на iframe после загрузки
        setTimeout(() => {
            frame.focus();
            frame.contentWindow.focus();
            
            // Добавляем tabindex для лучшего фокуса
            frame.setAttribute('tabindex', '0');
            frame.focus();
            
            console.log('🎮 Game focused');
        }, 100);
        }
    }


    // Убираем подсказку при закрытии
    function closeGameModal() {
        console.log('🎮 Closing game modal');
        modal.classList.remove('active');
    
        setTimeout(() => {
            frame.src = '';
        }, 300);
    }
}