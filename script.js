const inputs = document.querySelectorAll(".inputs .input");
const hoursInput = document.getElementById("hours-input");
const minutesInput = document.getElementById("minutes-input");
const secondsInput = document.getElementById("seconds-input");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const pauseIcon = document.querySelector(".icon-pause");
const startIcon = document.querySelector(".icon-play");
const resetIcon = document.querySelector(".icon-arrows-cw");
const message = document.querySelector(".message");
const enterTimeBtn = document.getElementById("enter-time");
const popupContainer = document.getElementById("popup-container");
const closePopup = document.getElementById("close-popup");
const popupOverlay = document.getElementById("popup-overlay");
const countdownFinishedSound = document.getElementById(
  "countdown-finished-sound"
);

hoursEl.innerHTML = localStorage.getItem("hoursNumber") || 0o0;
minutesEl.innerHTML = localStorage.getItem("minutesNumber") || 0o0;
secondsEl.innerHTML = localStorage.getItem("secondsNumber") || 0o0;
let interval;

// Avoid letter "e"
inputs.forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if ((e.which != 8 && e.which != 0 && e.which < 48) || e.which > 57) {
      e.preventDefault();
    }
  });
});

// Get values from user input
enterTimeBtn.addEventListener("click", (e) => {
  if (
    hoursInput.value === "" &&
    minutesInput.value === "" &&
    secondsInput.value === ""
  ) {
    message.classList.remove("ds-none");
    return;
  } else {
    hoursEl.innerHTML = hoursInput.value;
    minutesEl.innerHTML = minutesInput.value;
    secondsEl.innerHTML = secondsInput.value;

    saveNumbersToLocalStorage("secondsNumber", secondsEl.innerHTML);
    saveNumbersToLocalStorage("minutesNumber", minutesEl.innerHTML);
    saveNumbersToLocalStorage("hoursNumber", hoursEl.innerHTML);

    showNumber(secondsEl, localStorage.getItem("secondsNumber") || 0o0);
    showNumber(minutesEl, localStorage.getItem("minutesNumber") || 0o0);
    showNumber(hoursEl, localStorage.getItem("hoursNumber") || 0o0);

    message.classList.add("ds-none");
  }

  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";
});

// put a zero before the number if it's less than 9
// and show the values in the html elements
function showNumber(element, number) {
  if (number <= 9) {
    element.innerHTML = `0${number}`;
  } else {
    element.innerHTML = number;
  }
}
showNumber(secondsEl, localStorage.getItem("secondsNumber") || 0o0);
showNumber(minutesEl, localStorage.getItem("minutesNumber") || 0o0);
showNumber(hoursEl, localStorage.getItem("hoursNumber") || 0o0);

// Play and pause audio after finishing time
function playAudio() {
  countdownFinishedSound.play();
}

function pauseAudio() {
  countdownFinishedSound.pause();
}

// The main function that decrease the numbers
function startDownTimer() {
  if (
    hoursEl.innerHTML == 0 &&
    minutesEl.innerHTML == 0 &&
    secondsEl.innerHTML == 0
  ) {
    secondsEl.innerHTML = 0o0;
    minutesEl.innerHTML = 0o0;
    hoursEl.innerHTML = 0o0;
    clearInterval(interval);
    popupContainer.classList.remove("ds-none");
    playAudio();
  } else if (secondsEl.innerHTML != 0) {
    secondsEl.innerHTML--;
    saveNumbersToLocalStorage("secondsNumber", secondsEl.innerHTML);
    showNumber(secondsEl, localStorage.getItem("secondsNumber") || 0o0);
  } else if (minutesEl.innerHTML != 0 && secondsEl.innerHTML == 0) {
    showNumber(secondsEl, localStorage.getItem("secondsNumber"));
    secondsEl.innerHTML = 60;
    minutesEl.innerHTML--;
    saveNumbersToLocalStorage("minutesNumber", minutesEl.innerHTML);
    showNumber(minutesEl, localStorage.getItem("minutesNumber"));
  } else if (hoursEl.innerHTML != 0 && minutesEl.innerHTML == 0) {
    minutesEl.innerHTML = 60;
    hoursEl.innerHTML--;
    saveNumbersToLocalStorage("hoursNumber", hoursEl.innerHTML);
    showNumber(hoursEl, localStorage.getItem("hoursNumber"));
  }
}

// Start the countdown timer
startIcon.addEventListener("click", (e) => {
  if (
    hoursEl.innerHTML === "00" &&
    minutesEl.innerHTML === "00" &&
    secondsEl.innerHTML === "00"
  ) {
    secondsEl.innerHTML = "00";
    minutesEl.innerHTML = "00";
    hoursEl.innerHTML = "00";
    message.classList.remove("ds-none");
    e.preventDefault();
  } else {
    if (interval == null) {
      interval = setInterval(function () {
        startDownTimer();
        console.log("working");
      }, 1000);
    }
  }
});

// Pause the countdown timer put keep numbers
pauseIcon.addEventListener("click", (e) => {
  clearInterval(interval);
});

// function clear storage
function clearStorage() {
  clearInterval(interval);
  localStorage.clear();
  location.reload();
  secondsEl.innerHTML = 0o0;
  minutesEl.innerHTML = 0o0;
  hoursEl.innerHTML = 0o0;
}

// Reset the numbers and clear the storage
resetIcon.addEventListener("click", clearStorage);

// Close popup and clear storage
function closePopupAndClearStorage() {
  popupContainer.classList.add("ds-none");
  pauseAudio();
  clearStorage();
}

closePopup.addEventListener("click", closePopupAndClearStorage);
popupOverlay.addEventListener("click", closePopupAndClearStorage);

// saveValues of (seconds-minutes-hours) in the localStorage
function saveNumbersToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
