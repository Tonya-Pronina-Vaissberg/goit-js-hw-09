import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const dateTimePicker = document.getElementById('datetime-picker');
const strBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minField = document.querySelector('[data-minutes]');
const secField = document.querySelector('[data-seconds]');

let targetDate = null;
let countInterval = null;

const startCount = () => {
    targetDate = new Date(dateTimePicker.value);
    countInterval = setInterval(updateTime, 1000);
    strBtn.disabled = true;
    dateTimePicker.disabled = true
  };

strBtn.addEventListener('click', startCount)

const updateTime = () => {
    const currentDate = new Date();
    const remainingTime = targetDate - currentDate;

    if (remainingTime < 0) {
        clearInterval(countInterval);

        strBtn.disabled = true;

        dateTimePicker.disabled = false;
    };

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((remainingTime / 1000) % 60)
    .toString()
    .padStart(2, '0');

  daysField.textContent = days;
  hoursField.textContent = hours;
  minField.textContent = minutes;
  secField.textContent = seconds;

};


flatpickr(dateTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const nowDate = new Date();
      const slctdDate = selectedDates[0];

      if (slctdDate < nowDate) {
        Notiflix.Report.failure(
          'Please choose a date in the future'
        );

        strBtn.disabled = true;
      } else {
        strBtn.disabled = false;
      }
    },
})




