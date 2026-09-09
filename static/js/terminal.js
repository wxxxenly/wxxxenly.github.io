// Терминал-пасхалка

function initTerminal() {
  const terminalOverlay = document.getElementById('terminalOverlay');
  const terminalClose = document.getElementById('terminalClose');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');

  const avatar = document.querySelector('.avatar');
  let clickCount = 0;
  let clickTimer = null;

  // Тройной клик на аватарку
  if (avatar) {
    avatar.addEventListener('click', () => {
      clickCount++;

      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 500);
      }

      if (clickCount === 3) {
        clearTimeout(clickTimer);
        clickCount = 0;
        openTerminal();
      }
    });
  }

  function openTerminal() {
    if (terminalOverlay) terminalOverlay.classList.add('active');
    if (terminalInput) terminalInput.focus();

    printToTerminal('Добро пожаловать в секретный терминал! ', 'success');
    printToTerminal('Введите "help" для списка команд.\n', 'info');
  }

  function closeTerminal() {
    if (terminalOverlay) terminalOverlay.classList.remove('active');
    if (terminalOutput) terminalOutput.innerHTML = '';
    if (terminalInput) terminalInput.value = '';

    const inputLine = document.querySelector('.terminal-input-line');
    if (inputLine) {
      inputLine.style.display = 'flex';
    }
  }

  if (terminalClose) {
    terminalClose.addEventListener('click', closeTerminal);
  }

  // Закрытие по клику на тёмный фон
  if (terminalOverlay) {
    terminalOverlay.addEventListener('click', (e) => {
      if (e.target === terminalOverlay) {
        closeTerminal();
      }
    });
  }

  // Закрытие по клавише Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalOverlay && terminalOverlay.classList.contains('active')) {
      closeTerminal();
    }
  });

  if (terminalInput) {
    terminalInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        printToTerminal(`guest@portfolio:~$ ${command}`, 'prompt');

        await handleTerminalCommand(command);

        if (terminalBody) {
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
      }
    });
  }

  if (terminalBody) {
    terminalBody.addEventListener('click', () => {
      if (terminalInput) terminalInput.focus();
    });
  }

  function printToTerminal(text, type = 'normal') {
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.className = `line ${type}-line`;
    line.textContent = text;
    terminalOutput.appendChild(line);
  }

  async function handleTerminalCommand(cmd) {
    if (cmd === 'help') {
      printToTerminal(`
Доступные команды:
  help      - Показать список команд
  about     - Информация обо мне
  projects  - Список проектов
  contact   - Контактная информация
  clear     - Очистить экран
  close     - Закрыть терминал
  exit      - Закрыть терминал
      `, 'info');
    }
    else if (cmd === 'clear') {
      if (terminalOutput) terminalOutput.innerHTML = '';
    }
    else if (cmd === 'close' || cmd === 'exit') {
      closeTerminal();
    }
    else if (cmd === 'about') {
      try {
        const data = await window.githubLoader.loadUserData();
        printToTerminal(`
Имя: ${data.name}
Роль: ${data.role}
О себе: ${data.bio}
        `, 'info');
      } catch (error) {
        printToTerminal('Ошибка загрузки данных', 'error');
      }
    }
    else if (cmd === 'projects') {
      try {
        const projects = await window.githubLoader.loadRepos();

        if (projects.length === 0) {
          printToTerminal('Проекты не найдены', 'info');
        } else {
          projects.forEach(p => {
            printToTerminal(`▶ ${p.title}`, 'success');
            printToTerminal(`  Стек: ${p.language}`, 'info');
            printToTerminal(`  Ссылка: ${p.link}`, 'info');
            printToTerminal('');
          });
        }
      } catch (error) {
        printToTerminal('Ошибка загрузки проектов', 'error');
      }
    }
    else if (cmd === 'contact') {
      try {
        const data = window.githubLoader.loadContacts();
        printToTerminal(`
Telegram: ${data.telegram}
Email: ${data.email}
GitHub: ${data.github}
        `, 'info');
      } catch (error) {
        printToTerminal('Ошибка загрузки контактов', 'error');
      }
    }
    else if (cmd === '') {
      // Пустая команда
    }
    else {
      printToTerminal(`bash: ${cmd}: command not found`, 'error');
      printToTerminal('Введите "help" для списка команд', 'info');
    }
  }

  // Экспорт функций для других модулей
  window.terminalFunctions = {
    printToTerminal,
    closeTerminal,
    getTerminalOutput: () => terminalOutput,
    getTerminalInput: () => terminalInput,
  };
}