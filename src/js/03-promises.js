import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener('submit', onPromiseCreate);



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;

  setTimeout(() => {
    if (shouldResolve) {
  resolve({ position, delay });
     } else {
  reject({ position, delay });
     }
   }, delay);

  });
}

function onPromiseCreate(event) {
  event.preventDefault();
  const {delay, step, amount} = event.currentTarget.elements; 

  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  for (let i = 0; i < amountValue; i++) {
    createPromise(i, delayValue + stepValue * i)
      .then(({ position, delayValue }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delayValue}ms`
        );
      })
      .catch(({ position, delayValue }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delayValue}ms`
        );
      });
  }
}