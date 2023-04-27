import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const dateTimePicker = document.getElementById('datetime-picker');
const strBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minField = document.querySelector('[data-minutes]');
const secField = document.querySelector('[data-seconds]');

let intervalId;


strBtn.addEventListener('click', () => {
  strBtn.disabled = true;
  intervalId = setInterval(updateTime, 1000);
});


const updateTime = () => {

  const startTime = new Date();
  const endTime = new Date(dateTimePicker.value);
  const remainingTime = endTime - startTime;
  const remainingTimeToObj = convertMs(remainingTime);


  if (remainingTime >= 0) {
    daysField.textContent = addLeadingZero(remainingTimeToObj.remDays);
    hoursField.textContent = addLeadingZero(remainingTimeToObj.remHours);
    minField.textContent = addLeadingZero(remainingTimeToObj.remMinutes);
    secField.textContent = addLeadingZero(remainingTimeToObj.remSeconds);
  }
    // const currentDate = new Date();
    // // const remainingTime = selectedDate - currentDate;
    // // const secFieldValue = secField.innerHTML;

    // const timerId = setInterval(() => {
    //   strBtn.disabled = true;
    //   const remainingTime = selectedDate - currentDate;
    //   // console.log(time);
    //   if (remainingTime <= 0) {      
    //     clearInterval(timerId);
    //     return;
    //   }
    // }, 1000);
  

    // if (remainingTime <= 0 && secFieldValue <= 00 ) {
    //     clearInterval(countInterval);
      
    //     strBtn.disabled = true;

    //     dateTimePicker.disabled = false;
    // };


  //   console.log(selectedDate);


  // const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
  //   .toString()
  //   .padStart(2, '0');
  // const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24)
  //   .toString()
  //   .padStart(2, '0');
  // const minutes = Math.floor((remainingTime / 1000 / 60) % 60)
  //   .toString()
  //   .padStart(2, '0');
  // const seconds = Math.floor((remainingTime / 1000) % 60)
  //   .toString()
  //   .padStart(2, '0');

  // daysField.textContent = days;
  // hoursField.textContent = hours;
  // minField.textContent = minutes;
  // secField.textContent = seconds;

};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const remDays = Math.floor(ms / day);
  const remHours = Math.floor((ms % day) / hour);
  const remMinutes = Math.floor(((ms % day) % hour) / minute);
  const remSeconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { remDays, remHours, remMinutes, remSeconds };
};

const addLeadingZero = (value) => {
  return value.toString().padStart(2, '0');
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
});


