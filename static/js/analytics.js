function initAnalytics() {
  // Простая локальная аналитика
  const visits = parseInt(localStorage.getItem('site_visits') || '0') + 1;
  localStorage.setItem('site_visits', visits.toString());
  
  const uniqueDays = getUniqueVisitDays();
  
  console.log(`📊 Статистика посещений:`);
  console.log(`   Всего посещений: ${visits}`);
  console.log(`   Уникальных дней: ${uniqueDays}`);
  
  // Сохраняем для терминала
  window.siteStats = { visits, uniqueDays };
}

function getUniqueVisitDays() {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('last_visit_day');
  
  if (lastVisit !== today) {
    localStorage.setItem('last_visit_day', today);
    const days = parseInt(localStorage.getItem('unique_days') || '0') + 1;
    localStorage.setItem('unique_days', days.toString());
    return days;
  }
  
  return parseInt(localStorage.getItem('unique_days') || '1');
}