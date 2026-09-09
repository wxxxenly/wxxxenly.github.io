function initKonamiCode() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let currentIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const expected = konamiCode[currentIndex].toLowerCase();
    
    if (key === expected) {
      currentIndex++;
      
      if (currentIndex === konamiCode.length) {
        currentIndex = 0;
        triggerKonamiEffect();
      }
    } else {
      currentIndex = 0;
    }
  });
}

function triggerKonamiEffect() {
  // Создаём canvas для фейерверка
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none;';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ['#ff6f61', '#ffbd44', '#ff8c69', '#ffc87c', '#e85d4e', '#00ff00', '#00bfff', '#ff00ff'];
  
  // Создаём частицы
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 8,
      vy: -(Math.random() * 15 + 10),
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      gravity: 0.3,
      life: 1
    });
  }
  
  // Сообщение
  const messages = [
    '🎉 KONAMI CODE ACTIVATED! 🎉',
    'Ты нашёл секретную пасхалку!',
    'Ты настоящий геймер! '
  ];
  
  let messageIndex = 0;
  let frameCount = 0;
  
  function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.008;
      
      if (p.life > 0) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Показываем сообщения
    frameCount++;
    if (frameCount % 120 === 0 && messageIndex < messages.length) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#ff6f61';
      ctx.font = 'bold 48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(messages[messageIndex], canvas.width / 2, canvas.height / 2 - messageIndex * 60);
      messageIndex++;
    }
    
    ctx.globalAlpha = 1;
    
    if (particles.some(p => p.life > 0)) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(() => canvas.remove(), 1000);
    }
  }
  
  animate();
  
  // Добавляем новые частицы каждые 300мс в течение 3 секунд
  let spawnCount = 0;
  const spawnInterval = setInterval(() => {
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 8,
        vy: -(Math.random() * 15 + 10),
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.3,
        life: 1
      });
    }
    spawnCount++;
    if (spawnCount > 10) clearInterval(spawnInterval);
  }, 300);
}