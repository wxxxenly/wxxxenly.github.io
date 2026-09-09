function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.className = 'particles-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  `;
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouse = { x: null, y: null, radius: 150 };
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function getColors() {
    const isLight = document.body.classList.contains('light-theme');
    return {
      particle: isLight ? 'rgba(255, 111, 97, 0.5)' : 'rgba(255, 189, 68, 0.5)',
      line: isLight ? 'rgba(255, 111, 97, 0.15)' : 'rgba(255, 189, 68, 0.15)'
    };
  }
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.density = (Math.random() * 30) + 1;
    }
    
    update() {
      // Движение
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Отталкивание от курсора
      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;
          
          this.x -= directionX;
          this.y -= directionY;
        }
      }
      
      // Возврат к базовой позиции
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 20;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 20;
      }
      
      // Заворачивание по краям
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      const colors = getColors();
      ctx.fillStyle = colors.particle;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function init() {
    particles = [];
    const count = Math.min((canvas.width * canvas.height) / 15000, 100);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  
  function connectParticles() {
    const colors = getColors();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.strokeStyle = colors.line;
          ctx.lineWidth = 1 - distance / 150;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }
  
  // Отслеживание мыши
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  // Параллакс-эффект
  let scrollY = 0;
  let targetScrollY = 0;
  
  window.addEventListener('scroll', () => {
    targetScrollY = window.pageYOffset;
  });
  
  function smoothParallax() {
    scrollY += (targetScrollY - scrollY) * 0.1;
    
    particles.forEach((p, index) => {
      const speed = 0.02 + (index % 5) * 0.01;
      p.baseY += scrollY * speed * 0.01;
      
      if (p.baseY > canvas.height) p.baseY = 0;
      else if (p.baseY < 0) p.baseY = canvas.height;
    });
    
    requestAnimationFrame(smoothParallax);
  }
  
  window.addEventListener('resize', () => {
    resize();
    init();
  });
  
  resize();
  init();
  animate();
  smoothParallax();
  
  window.particlesAnimation = {
    updateColors: () => {}
  };
}