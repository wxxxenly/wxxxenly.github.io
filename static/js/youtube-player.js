// Массив плейлистов/треков (замени на свои)
const youtubePlaylists = [
  {
    title: 'Мой плейлист #1',
    description: 'Любимые треки',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLRBp0Fe2Gpgk5vY77WGQSLb6F3szX4TRg',
    // Пример: https://www.youtube.com/embed/videoseries?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
    cover: '🎵'
  },
  {
    title: 'Для работы',
    description: 'Фокус и концентрация',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLcPcCgO1DKZzivvlYnGeq2OKCILqiHaQp',
    cover: '💼'
  },
  {
    title: 'Вечерний чилл',
    description: 'Расслабляющая музыка',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLUD4m_UutEoSPG8U82xs7ANwGrz9YRE98',
    cover: '🌙'
  }
];

function initYouTubePlayer() {
  window.openMusicPlayer = function() {
    let playerSection = document.getElementById('youtube-player');
    
    if (playerSection) {
      playerSection.classList.add('visible');
      playerSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    playerSection = document.createElement('section');
    playerSection.className = 'youtube-player-section visible';
    playerSection.id = 'youtube-player';
    
    const playlistsHTML = youtubePlaylists.map((pl, index) => `
      <div class="playlist-card ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="playlist-icon">${pl.cover}</div>
        <div class="playlist-info">
          <div class="playlist-title">${pl.title}</div>
          <div class="playlist-desc">${pl.description}</div>
        </div>
      </div>
    `).join('');
    
    playerSection.innerHTML = `
      <div class="player-container">
        <h2 class="player-title">🎵 YouTube Music</h2>
        
        <div class="player-selector">
          <div class="selector-title">Выбери плейлист:</div>
          <div class="selector-list">
            ${playlistsHTML}
          </div>
        </div>
        
        <div class="player-embed">
          <iframe id="youtubeFrame" 
            src="${youtubePlaylists[0].embedUrl}" 
            width="100%" 
            height="400" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        
        <p class="player-note">
          💡 Для прослушивания нужна авторизация в YouTube (опционально)
        </p>
      </div>
    `;
    
    const contacts = document.querySelector('#contacts');
    if (contacts && contacts.parentNode) {
      contacts.parentNode.insertBefore(playerSection, contacts.nextSibling);
    }
    
    // Обработчики кликов по плейлистам
    setTimeout(() => {
      document.querySelectorAll('.playlist-card').forEach(card => {
        card.addEventListener('click', () => {
          const index = parseInt(card.dataset.index);
          switchPlaylist(index);
        });
      });
    }, 100);
  };
}

function switchPlaylist(index) {
  if (index < 0 || index >= youtubePlaylists.length) return;
  
  const playlist = youtubePlaylists[index];
  const frame = document.getElementById('youtubeFrame');
  
  if (frame) {
    frame.src = playlist.embedUrl;
  }
  
  // Обновляем активный плейлист
  document.querySelectorAll('.playlist-card').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
}