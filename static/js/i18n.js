const translations = {
  ru: {
    nav: { about: 'Обо мне', projects: 'Проекты', timeline: 'Мой путь', contacts: 'Контакты'},
    hero: { scrollDown: '↓ Скролль вниз, чтобы узнать больше' },
    about: {
      title: 'Обо мне',
      techStack: 'Tech Stack:',
      skillsTitle: 'Распределение проектов по языкам'
    },
    projects: {
      title: 'Мои проекты',
      viewOnGithub: 'Посмотреть на GitHub →',
      scrollDown: '↓ Скролль дальше, чтобы связаться со мной',
      filters: { all: 'Все' }
    },
    contacts: {
      title: 'Контакты',
      text: 'Буду рад сотрудничеству!'
    },
    terminal: {
      welcome: 'Добро пожаловать в секретный терминал!',
      helpHint: 'Введите "help" для списка команд.',
      gameFinished: 'Игра завершена'
    }
  },
  en: {
    nav: { about: 'About', projects: 'Projects', timeline: 'Timeline', contacts: 'Contacts' },
    hero: { scrollDown: '↓ Scroll down to learn more' },
    about: {
      title: 'About Me',
      techStack: 'Tech Stack:',
      skillsTitle: 'Project distribution by language'
    },
    projects: {
      title: 'My Projects',
      viewOnGithub: 'View on GitHub →',
      scrollDown: '↓ Scroll down to contact me',
      filters: { all: 'All' }
    },
    contacts: {
      title: 'Contacts',
      text: 'Glad to cooperate!'
    },
    terminal: {
      welcome: 'Welcome to the secret terminal!',
      helpHint: 'Type "help" for commands list.',
      gameFinished: 'Game finished'
    }
  }
};

function t(key) {
  const lang = localStorage.getItem('lang') || 'ru';
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}

window.i18n = { t, translations };