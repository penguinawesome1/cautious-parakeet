const timer = document.getElementById('timer');

function startTimer() {
    start = Date.now();
    startInterval();
}

function stopTimer() {
    clearInterval(intervalId);
}

function startInterval() {
    let minutes = 0;
    let seconds = 0;
    let startTime = Date.now();

    intervalId = setInterval(() => {
        const now = Date.now();
        const delta = now - startTime;
        
        seconds += Math.floor(delta / 1000) % 60;
        minutes += Math.floor(delta / (1000 * 60));
        
        startTime = now;
        timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000); // Update every second
}

startTimer();