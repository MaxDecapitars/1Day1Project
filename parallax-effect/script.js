const $main = document.querySelector('main');

let fancesPosition = 0,
  housesPosition = 0,
  buildingsPosition = 0;

const moveBackground = () => {
  fancesPosition = fancesPosition + 900;
  housesPosition = housesPosition + 90;
  buildingsPosition = buildingsPosition + 15;

  $main.style.backgroundPosition = `center bottom, ${fancesPosition}px bottom, ${housesPosition}px bottom, ${buildingsPosition}px bottom, center center`;
};

setTimeout(() => {
  $main.style.opacity = 1;
}, 2000);

setInterval(() => {
  moveBackground();
}, 2000);
