function initTypewriter() {
  // Hero subtitle - оставляем как есть (role из GitHub)
  const heroSubtitle = document.querySelector('.hero-subtitle');
  // Здесь ничего не меняем, role уже подставлен из about.role
  
  // Bio typewriter
  const bioElement = document.getElementById('bioTypewriter');
  if (!bioElement) return;
  
  const originalText = 'Люблю делать прикольные штуки ^_^';
  bioElement.textContent = '';
  
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  bioElement.appendChild(cursor);
  
  let i = 0;
  let deleting = false;
  
  function type() {
    if (!deleting && i < originalText.length) {
      const char = originalText.charAt(i);
      const textNode = document.createTextNode(char);
      bioElement.insertBefore(textNode, cursor);
      i++;
      setTimeout(type, 80);
    } else if (i === originalText.length) {
      setTimeout(() => {
        deleting = true;
        type();
      }, 3000); // Ждём 3 секунды перед удалением
    } else if (deleting && i > 0) {
      if (bioElement.childNodes.length > 1) {
        bioElement.removeChild(bioElement.childNodes[bioElement.childNodes.length - 2]);
        i--;
        setTimeout(type, 40);
      } else {
        deleting = false;
        setTimeout(type, 500);
      }
    }
  }
  
  // Начинаем через 1.5 секунды после загрузки
  setTimeout(type, 1500);
}