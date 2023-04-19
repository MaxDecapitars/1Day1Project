const d = document,
  $time = d.querySelector('.time'),
  $ms = d.querySelector('.ms'),
  $panelLaps = d.querySelector('.panel-laps'),
  $rowsLaps = d.getElementById('rows-laps'),
  $lapsTemplate = d.getElementById('laps-template').content,
  $btnStart = d.querySelector('.btn-start'),
  $btnStop = d.querySelector('.btn-stop'),
  $btnReset = d.querySelector('.btn-reset'),
  $btnSplit = d.querySelector('.btn-split');

let chronometerData = JSON.parse(localStorage.getItem('chronometerData')) || {
    start: undefined,
    totalMs: 0,
    splits: [],
  },
  intervalId;

const formattedTime = (time) => {
  const milliseconds = time % 100,
    seconds = Math.floor(time / 100) % 60,
    minutes = Math.floor(time / (100 * 60)) % 60,
    hours = Math.floor(time / (100 * 60 * 60)) % 24,
    days = Math.floor(time / (100 * 60 * 60 * 24)),
    formattedMilliseconds = milliseconds < 10 ? `.0${milliseconds}` : `.${milliseconds}`,
    formattedSeconds = seconds < 10 ? `0${seconds}` : seconds,
    formattedMinutes = minutes < 10 ? `0${minutes}` : minutes,
    formattedHours = hours < 10 ? `0${hours}` : hours,
    formattedDays = days <= 0 ? '' : `${days} days`;

  return {
    milliseconds: formattedMilliseconds,
    seconds: formattedSeconds,
    minutes: formattedMinutes,
    hours: formattedHours,
    days: formattedDays,
  };
};

const changeTime = () => {
  const time = formattedTime(chronometerData.totalMs);

  $time.textContent = `${time.days} ${time.hours}:${time.minutes}:${time.seconds}`;
  $ms.textContent = time.milliseconds;
};

const fillRowsSplit = (ms, totalMs) => {
  const timeSplit = formattedTime(ms),
    time = formattedTime(totalMs),
    $clone = $lapsTemplate.cloneNode(true);

  $clone.querySelector('.laps').textContent = $rowsLaps.childElementCount + 1;
  $clone.querySelector(
    '.split'
  ).textContent = `${timeSplit.days} ${timeSplit.hours}:${timeSplit.minutes}:${timeSplit.seconds}${timeSplit.milliseconds}`;
  $clone.querySelector(
    '.total-time'
  ).textContent = `${time.days} ${time.hours}:${time.minutes}:${time.seconds}${time.milliseconds}`;

  $rowsLaps.insertAdjacentElement('afterbegin', $clone.firstElementChild);
};

const changeBtns = () => {
  $btnStart.classList.toggle('d-none');
  $btnStop.classList.toggle('d-none');
  $btnReset.classList.toggle('d-none');
  $btnSplit.classList.toggle('d-none');
};

const start = () => {
  changeBtns();
  chronometerData.start = Math.floor(Date.now() / 10);
  localStorage.setItem('chronometerData', JSON.stringify(chronometerData));

  intervalId = setInterval(() => {
    chronometerData.totalMs++;
    changeTime();
  }, 10);
};

const stop = () => {
  changeBtns();
  chronometerData.start = undefined;
  localStorage.setItem('chronometerData', JSON.stringify(chronometerData));

  clearInterval(intervalId);
};

const split = () => {
  let difference = 0;
  chronometerData.splits.forEach((split) => (difference += split.ms));

  const split = {
    ms: chronometerData.totalMs - difference,
    totalMs: chronometerData.totalMs,
  };

  chronometerData.splits.push(split);
  fillRowsSplit(split.ms, split.totalMs);
  $panelLaps.classList.remove('d-none');
  localStorage.setItem('chronometerData', JSON.stringify(chronometerData));
};

const reset = () => {
  chronometerData = {
    start: undefined,
    totalMs: 0,
    splits: [],
  };
  $time.textContent = '00:00:00';
  $ms.textContent = '.00';
  $rowsLaps.innerHTML = '';
  $panelLaps.classList.add('d-none');
  localStorage.removeItem('chronometerData');
};

const init = () => {
  if (chronometerData.start) {
    const actualDate = Math.floor(Date.now() / 10),
      difference = actualDate - chronometerData.start;

    chronometerData.totalMs += difference;

    start();
  } else {
    changeTime();
  }

  if (chronometerData.splits.length > 0) {
    chronometerData.splits.forEach((split) => fillRowsSplit(split.ms, split.totalMs));
    $panelLaps.classList.remove('d-none');
  }
};

d.addEventListener('DOMContentLoaded', init);

d.addEventListener('click', (e) => {
  if (e.target === $btnStart) start();

  if (e.target === $btnStop) stop();

  if (e.target === $btnReset) reset();

  if (e.target === $btnSplit) split();
});
