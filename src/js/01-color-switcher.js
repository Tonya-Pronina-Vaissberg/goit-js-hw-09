const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");

startBtn.addEventListener('click', onStartChangingColor);
stopBtn.addEventListener('click', onStopChangingColor);

let colorChangeInterval = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

function onStartChangingColor() {
    startBtn.disabled = true;

    colorChangeInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

}

function onStopChangingColor() {
    startBtn.disabled = false;

    clearInterval(colorChangeInterval);

}
