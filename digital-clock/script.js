const d = document,
  $day = d.querySelector('.day'),
  $hour = d.querySelector('.hour'),
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const changeDate = () => {
  const date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    dayOfWeek = daysOfWeek[date.getDay()],
    dayofMonth = date.getDate();

  const formattedHours = hours < 10 ? `0${hours}` : hours,
    formattedMinutes = minutes < 10 ? `0${minutes}` : minutes,
    formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const day = `${dayOfWeek} ${dayofMonth}`,
    hour = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  $day.textContent = day;
  $hour.textContent = hour;
};

changeDate();

setInterval(() => {
  changeDate();
}, 100);
