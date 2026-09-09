function initHeadingTypewriter() {
  const headings = document.querySelectorAll('section h2');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
        entry.target.classList.add('typed');
        const text = entry.target.textContent;
        entry.target.textContent = '';
        
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        cursor.textContent = '|';
        entry.target.appendChild(cursor);
        
        function type() {
          if (i < text.length) {
            const char = text.charAt(i);
            const textNode = document.createTextNode(char);
            entry.target.insertBefore(textNode, cursor);
            i++;
            setTimeout(type, 50);
          } else {
            setTimeout(() => cursor.remove(), 1000);
          }
        }
        
        setTimeout(type, 300);
      }
    });
  }, { threshold: 0.5 });
  
  headings.forEach(h => observer.observe(h));
}