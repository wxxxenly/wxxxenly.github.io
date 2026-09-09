function initSecretRoom() {
  window.openSecretRoom = function() {
    const secretSection = document.createElement('section');
    secretSection.className = 'full-screen section-contact reveal visible';
    secretSection.id = 'secret';
    secretSection.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    secretSection.innerHTML = `
      <div class="section-content">
        <h2 style="color: white; font-size: 3rem; text-align: center;">🎉 Секретная комната!</h2>
        <p style="color: white; font-size: 1.5rem; text-align: center; margin-top: 20px;">
          Ты нашёл скрытую секцию!
        </p>
        <p style="color: white; font-size: 1.2rem; text-align: center; margin-top: 20px;">
          Вот промокод: <strong style="font-size: 1.5rem; color: #ffbd44;">HIRE_ME_2024</strong>
        </p>
      </div>
    `;
    
    const contacts = document.querySelector('#contacts');
    if (contacts && contacts.parentNode) {
      contacts.parentNode.insertBefore(secretSection, contacts.nextSibling);
      setTimeout(() => secretSection.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };
}