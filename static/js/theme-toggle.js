function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  applyTheme(currentTheme);
  updateThemeText(themeToggle, currentTheme);
  
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(newTheme);
    updateThemeText(themeToggle, newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (window.particlesAnimation) {
      window.particlesAnimation.updateColors();
    }
    
    if (window.skillsChart) {
      updateChartTheme();
    }
  });
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

function updateThemeText(button, theme) {
  button.textContent = theme === 'light' ? 'Dark' : 'Light';
}

function updateChartTheme() {
  if (!window.skillsChart) return;
  const isLight = document.body.classList.contains('light-theme');
  const textColor = isLight ? '#333' : '#fff';
  const gridColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';
  
  const chart = window.skillsChart;
  chart.options.plugins.tooltip.backgroundColor = isLight ? '#fff' : '#1a1a1a';
  chart.options.plugins.tooltip.titleColor = textColor;
  chart.options.plugins.tooltip.bodyColor = textColor;
  chart.options.plugins.tooltip.borderColor = isLight ? '#ddd' : '#333';
  chart.options.scales.x.ticks.color = textColor;
  chart.options.scales.y.ticks.color = textColor;
  chart.options.scales.y.grid.color = gridColor;
  chart.update();
}