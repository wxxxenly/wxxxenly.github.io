function initTerminal() {
  const terminalOverlay = document.getElementById('terminalOverlay');
  const terminalClose = document.getElementById('terminalClose');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');

  const avatar = document.querySelector('.avatar');
  let clickCount = 0;
  let clickTimer = null;

  // Мини-игра "Угадай число"
  let guessGame = { active: false, number: 0, attempts: 0 };

  if (avatar) {
    avatar.addEventListener('click', () => {
      clickCount++;
      if (clickCount === 1) {
        clickTimer = setTimeout(() => { clickCount = 0; }, 500);
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
    printToTerminal(t('terminal.welcome') + ' ', 'success');
    printToTerminal(t('terminal.helpHint') + '\n', 'info');
  }

  function closeTerminal() {
    if (terminalOverlay) terminalOverlay.classList.remove('active');
    if (terminalOutput) terminalOutput.innerHTML = '';
    if (terminalInput) terminalInput.value = '';
    const inputLine = document.querySelector('.terminal-input-line');
    if (inputLine) inputLine.style.display = 'flex';
  }

  if (terminalClose) terminalClose.addEventListener('click', closeTerminal);

  if (terminalOverlay) {
    terminalOverlay.addEventListener('click', (e) => {
      if (e.target === terminalOverlay) closeTerminal();
    });
  }

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
        if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
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
    const parts = cmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    if (command === 'help') {
      printToTerminal(`
Доступные команды:
  help              - Показать список команд
  about             - Информация обо мне
  projects          - Список проектов
  contact           - Контактная информация
  neofetch          - Системная информация
  whoami            - Кратко обо мне
  date              - Текущая дата и время
  echo [текст]      - Вывести текст
  cowsay [текст]    - Корова говорит текст
  fortune           - Случайная цитата
  music/player      - 🎵 Музыкальный плеер (YouTube)
  joke              - Шутка про программистов
  stats             - Статистика посещений
  uptime            - Время на сайте
  guess [число]     - Угадать число (1-100)
  hack              - Попытаться взломать NASA
  open secret       - Секретная комната
  arcade/games      - Игровая зона
  lang [ru|en]      - Сменить язык
  sudo hire me      - Нанять меня
  sudo rm -rf /     - Опасная команда
  matrix            - Эффект матрицы
  clear             - Очистить экран
  close/exit        - Закрыть терминал
      `, 'info');
    }
    else if (command === 'clear') {
      if (terminalOutput) terminalOutput.innerHTML = '';
    }
    else if (command === 'close' || command === 'exit') {
      closeTerminal();
    }
    else if (command === 'about') {
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
    else if (command === 'projects') {
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
    else if (command === 'contact') {
      try {
        const data = window.githubLoader.loadContacts();
        printToTerminal(`
Telegram: ${data.telegram}
GitHub: ${data.github}
        `, 'info');
      } catch (error) {
        printToTerminal('Ошибка загрузки контактов', 'error');
      }
    }
    else if (command === 'neofetch') {
      const userData = await window.githubLoader.loadUserData();
      printToTerminal(`
  ╔══════════════════════════╗
  ║   NEOfetch              ║
  ╚══════════════════════════╝
  
  ОС: ${navigator.platform}
  Браузер: ${navigator.userAgent.split(' ').pop()}
  Разрешение: ${window.screen.width}x${window.screen.height}
  Язык: ${navigator.language}
  
  Пользователь: ${userData.name}
  GitHub: ${userData.github_url}
      `, 'success');
    }
    else if (command === 'whoami') {
      const userData = await window.githubLoader.loadUserData();
      printToTerminal(`
${userData.name} — ${userData.role}
${userData.bio}

Люблю создавать крутые вещи с помощью кода.
Открыт к новым проектам и сотрудничеству!
      `, 'info');
    }
    else if (command === 'date') {
      printToTerminal(new Date().toLocaleString('ru-RU'), 'info');
    }
    else if (command === 'echo') {
      printToTerminal(args || '', 'normal');
    }
    else if (command === 'cowsay') {
      const message = args || 'Привет!';
      const border = '_'.repeat(message.length + 2);
      const cow = `
 ${border}
< ${message} >
 ${'-'.repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
      `;
      printToTerminal(cow, 'success');
    }
    else if (command === 'fortune') {
      const fortunes = [
        'Код — это поэзия, которую понимают машины.',
        'Лучший код — это тот, который не нужно писать.',
        'Программирование — это искусство решения проблем.',
        'Баг сегодня — фича завтра.',
        'Не бойся ошибаться, бойся не учиться.',
        'Хороший код сам себя документирует.',
        'Простота — высшая форма изощренности.',
        'Делай, что можешь, с тем, что имеешь, там, где ты есть.'
      ];
      const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      printToTerminal(`\n  "${fortune}"\n`, 'info');
    }
    else if (command === 'joke') {
      const jokes = [
        'Почему программисты путают Хэллоуин и Рождество? Потому что Oct 31 = Dec 25.',
        '— Сколько программистов нужно, чтобы вкрутить лампочку?\n— Ни одного, это аппаратная проблема.',
        'Программист ставит на ночь два стакана: один с водой — если захочет пить, один пустой — если не захочет.',
        'Жена программиста: "Сходи в магазин, купи батон хлеба. Если будут яйца — возьми десяток."\nПрограммист вернулся с 10 батонами хлеба.',
        'В мире есть 10 типов людей: те, кто понимает двоичную систему, и те, кто не понимает.',
        'Программист — это машина, превращающая кофе в код.',
        'Баг — это не ошибка, это незадокументированная фича.',
        'Работает? Не трогай!'
      ];
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      printToTerminal(`\n  ${joke}\n`, 'success');
    }
    else if (command === 'stats') {
      const stats = window.siteStats || { visits: 0, uniqueDays: 0 };
      printToTerminal(`
 Статистика сайта:
  Всего посещений: ${stats.visits}
  Уникальных дней: ${stats.uniqueDays}
      `, 'info');
    }
    else if (command === 'uptime') {
      const time = window.sessionTime || { minutes: 0, seconds: 0, total: 0 };
      printToTerminal(`
⏱️ Время на сайте:
  ${time.minutes} мин ${time.seconds} сек
  Всего: ${time.total} секунд
      `, 'info');
    }
    else if (command === 'hack') {
      printToTerminal('Инициализация взлома...', 'error');
      setTimeout(() => {
        printToTerminal('Подключение к серверу NASA...', 'info');
      }, 500);
      setTimeout(() => {
        printToTerminal('Обход файрвола... [████████████] 100%', 'success');
      }, 1200);
      setTimeout(() => {
        printToTerminal('Загрузка данных... [████████████] 100%', 'success');
      }, 2000);
      setTimeout(() => {
        printToTerminal('ОШИБКА: Доступ запрещён! 😅', 'error');
      }, 2800);
      setTimeout(() => {
        printToTerminal('Это была шутка. Я не умею взламывать!', 'info');
      }, 3500);
    }
    else if (command === 'guess') {
      if (!args) {
        if (!guessGame.active) {
          guessGame.number = Math.floor(Math.random() * 100) + 1;
          guessGame.attempts = 0;
          guessGame.active = true;
          printToTerminal('Я загадал число от 1 до 100. Введи: guess [число]', 'info');
        } else {
          printToTerminal('Игра уже идёт! Введи guess [число] или guess reset', 'info');
        }
      } else if (args === 'reset') {
        guessGame.active = false;
        printToTerminal('Игра сброшена', 'info');
      } else {
        if (!guessGame.active) {
          printToTerminal('Сначала начни игру: guess', 'info');
          return;
        }
        const guess = parseInt(args);
        if (isNaN(guess)) {
          printToTerminal('Введи число!', 'error');
          return;
        }
        guessGame.attempts++;
        if (guess === guessGame.number) {
          printToTerminal(`🎉 Правильно! Число было ${guessGame.number}`, 'success');
          printToTerminal(`Попыток: ${guessGame.attempts}`, 'info');
          guessGame.active = false;
        } else if (guess < guessGame.number) {
          printToTerminal('Больше! ↑', 'info');
        } else {
          printToTerminal('Меньше! ↓', 'info');
        }
      }
    }
    else if (command === 'open' && args === 'secret') {
      printToTerminal(' Открываю секретную комнату...', 'success');
      setTimeout(() => {
        if (window.openSecretRoom) {
          window.openSecretRoom();
        }
      }, 1000);
    }
    else if (command === 'arcade' || command === 'games') {
      printToTerminal('🎮 Загружаю Arcade Zone...', 'success');
      setTimeout(() => {
        if (window.openArcade) {
          window.openArcade();
          printToTerminal('Arcade Zone открыт! Прокрути вниз.', 'info');
        }
      }, 500);
    }
    else if (command === 'sudo' && args === 'hire me') {
      const contact = window.githubLoader.loadContacts();
      printToTerminal(`Отличный выбор! Напишите мне:
Telegram: ${contact.telegram}`, 'success');
    }
    else if (command === 'sudo' && args === 'rm -rf /') {
      printToTerminal('Nice try! 😏', 'error');
      setTimeout(() => {
        printToTerminal('Но я не позволю тебе удалить систему!', 'info');
      }, 500);
      setTimeout(() => {
        printToTerminal('Шуточка! Твой сайт в безопасности!', 'success');
      }, 1000);
    }
    else if (command === 'lang') {
      if (args === 'ru' || args === 'en') {
        localStorage.setItem('lang', args);
        printToTerminal(`Язык изменён на ${args.toUpperCase()}. Обновите страницу.`, 'info');
      } else {
        printToTerminal('Использование: lang [ru|en]', 'error');
      }
    }
    else if (command === 'matrix') {
      printToTerminal('Запуск эффекта матрицы... (кликните, чтобы остановить)', 'success');
      startMatrixEffect();
    }
    else if (command === 'music' || command === 'player' || command === 'youtube') {
      printToTerminal('🎵 Открываю YouTube Music...', 'success');
      setTimeout(() => {
        if (window.openMusicPlayer) {
          window.openMusicPlayer();
        }
      }, 500);
    }
    else if (command === '') {
      // Пустая команда
    }
    else {
      printToTerminal(`bash: ${command}: command not found`, 'error');
      printToTerminal('Введите "help" для списка команд', 'info');
    }
  }

  function startMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:auto;cursor:pointer;';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    const interval = setInterval(draw, 33);
    
    canvas.addEventListener('click', () => {
      clearInterval(interval);
      canvas.remove();
    });
    
    setTimeout(() => {
      clearInterval(interval);
      if (canvas.parentNode) canvas.remove();
    }, 10000);
  }

  window.terminalFunctions = {
    printToTerminal,
    closeTerminal,
    getTerminalOutput: () => terminalOutput,
    getTerminalInput: () => terminalInput,
  };
}