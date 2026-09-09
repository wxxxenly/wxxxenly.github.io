// Загрузка данных с GitHub API с кэшированием
const GITHUB_USERNAME = 'wxxxenly'; // ЗАМЕНИ на свой
const CACHE_DURATION = 3600000; // 1 час в миллисекундах

const LANGUAGE_ICONS = {
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  "Rust": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "Ruby": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  "Swift": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  "Dart": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  "R": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  "Shell": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  "Dockerfile": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Jupyter Notebook": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
};

// Универсальная функция кэширования
function getCachedData(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
}

function setCachedData(key, data) {
  localStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}

// Загрузка данных пользователя
async function loadUserData() {
  const cacheKey = `github_user_${GITHUB_USERNAME}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;
  
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!response.ok) throw new Error('GitHub API error');
    const data = await response.json();
    
    const userData = {
      name: data.name || GITHUB_USERNAME,
      role: "Junior Python Developer",
      bio: data.bio || "Люблю делать прикольные штуки ^_^",
      avatar_url: data.avatar_url,
      github_url: data.html_url
    };
    
    setCachedData(cacheKey, userData);
    return userData;
  } catch (error) {
    console.error('Ошибка загрузки пользователя:', error);
    return {
      name: GITHUB_USERNAME,
      role: "Developer",
      bio: "Загрузка не удалась",
      avatar_url: null,
      github_url: `https://github.com/${GITHUB_USERNAME}`
    };
  }
}

// Загрузка репозиториев
async function loadRepos() {
  const cacheKey = `github_repos_${GITHUB_USERNAME}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;
  
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('GitHub API error');
    const repos = await response.json();
    
    // Фильтруем форки и сортируем по обновлению
    const filtered = repos
      .filter(r => !r.fork && r.description)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);
    
    const projects = filtered.map(repo => ({
      title: repo.name,
      description: repo.description,
      link: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language || 'Unknown',
      icon_url: LANGUAGE_ICONS[repo.language] || null
    }));
    
    setCachedData(cacheKey, projects);
    return projects;
  } catch (error) {
    console.error('Ошибка загрузки репозиториев:', error);
    return [];
  }
}

// Загрузка статистики языков
async function loadLanguageStats() {
  const cacheKey = `github_lang_stats_${GITHUB_USERNAME}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;
  
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
    if (!response.ok) throw new Error('GitHub API error');
    const repos = await response.json();
    
    const languageCounts = {};
    let totalSize = 0;
    
    repos.forEach(repo => {
      if (repo.fork) return;
      const lang = repo.language;
      const size = repo.size || 0;
      if (lang) {
        languageCounts[lang] = (languageCounts[lang] || 0) + size;
        totalSize += size;
      }
    });
    
    const sorted = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    const stats = sorted.map(([lang, size]) => ({
      language: lang,
      percentage: Math.round((size / totalSize) * 1000) / 10,
      icon_url: LANGUAGE_ICONS[lang] || null
    }));
    
    setCachedData(cacheKey, stats);
    return stats;
  } catch (error) {
    console.error('Ошибка загрузки статистики:', error);
    return [];
  }
}

// Контакты (статичные данные)
function loadContacts() {
  return {
    telegram: "@trplee",
    github: `github.com/${GITHUB_USERNAME}`
  };
}

// Экспорт функций
window.githubLoader = {
  loadUserData,
  loadRepos,
  loadLanguageStats,
  loadContacts,
  LANGUAGE_ICONS
};