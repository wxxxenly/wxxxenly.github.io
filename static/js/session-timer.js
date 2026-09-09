function initSessionTimer() {
  const startTime = Date.now();
  
  setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    window.sessionTime = { minutes, seconds, total: elapsed };
  }, 1000);
}