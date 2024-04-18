let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor(time % 60);
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function displayTime() {
  document.querySelector('.display').textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      displayTime();
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  laps = [];
  displayTime();
  document.querySelector('.laps').innerHTML = '';
}

function lapTimer() {
  if (isRunning) {
    laps.push(formatTime(elapsedTime));
    let lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
    document.querySelector('.laps').appendChild(lapItem);
  }
}

document.querySelector('.start').addEventListener('click', startTimer);
document.querySelector('.pause').addEventListener('click', pauseTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);
document.querySelector('.lap').addEventListener('click', lapTimer);
