document.addEventListener("DOMContentLoaded", function () {
  const monthDisplay = document.querySelector(".month h2");
  const daysContainer = document.querySelector(".days");
  const submitBtn = document.getElementById("submitDateTime");
  const selectedDateTimeDisplay = document.getElementById("selectedDateTime");
  const hourInput = document.getElementById("hourInput");
  const minuteInput = document.getElementById("minuteInput");
  const amPmSelect = document.getElementById("amPmSelect");
  let selectedDate = new Date();
  let selectedDay = selectedDate.getDate();

  function updateMonthYearDisplay() {
    monthDisplay.textContent = selectedDate.toLocaleDateString("en-us", { month: "long", year: "numeric" });
  }

  function selectDay(day) {
    selectedDay = day;
    document.querySelectorAll(".days div").forEach(div => div.classList.remove('selected'));
    daysContainer.children[day - 1].classList.add('selected');
  }

  function generateDays() {
    daysContainer.innerHTML = "";
    let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    let daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  
    // Calculate the index of the first day of the month
    let firstDayIndex = firstDayOfMonth.getDay();
  
    // Create leading empty divs to align the first day of the month correctly
    for (let i = 0; i < firstDayIndex; i++) {
      let emptyDiv = document.createElement("div");
      daysContainer.appendChild(emptyDiv);
    }
  
    // Now create divs for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      let dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      if (i === selectedDay) {
        dayDiv.classList.add("selected");
      }
      dayDiv.addEventListener("click", function () {
        document.querySelectorAll(".days div").forEach(div => div.classList.remove('selected'));
        dayDiv.classList.add('selected');
        selectedDay = i;
      });
      daysContainer.appendChild(dayDiv);
    }
  }
  function formatTime(hour, minute, amPm) {
    return `${hour}:${minute < 10 ? '0' + minute : minute} ${amPm}`;
  }

  function getFormattedDateTime() {
    let hour = parseInt(hourInput.value);
    let minute = parseInt(minuteInput.value);
    let amPm = amPmSelect.value;
    let time = formatTime(hour, minute, amPm);
    return `${selectedDate.getMonth() + 1}/${selectedDay}/${selectedDate.getFullYear()} ${time}`;
  }

  submitBtn.addEventListener('click', function () {
    selectedDateTimeDisplay.textContent = `Selected Date and Time: ${getFormattedDateTime()}`;
  });

  document.querySelector(".prev").addEventListener("click", function () {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    generateDays();
    updateMonthYearDisplay();
  });

  document.querySelector(".next").addEventListener("click", function () {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    generateDays();
    updateMonthYearDisplay();
  });

  generateDays();
  updateMonthYearDisplay();
});

document.addEventListener("DOMContentLoaded", function () {
  // ... other existing code ...

  // DOM elements
  const hourInput = document.getElementById("hourInput");
  const minuteInput = document.getElementById("minuteInput");
  const amPmSelect = document.getElementById("amPmSelect");
  const timeBefore = document.getElementById("timeBefore");
  const timeAfter = document.getElementById("timeAfter");

  // Function to adjust and wrap around time values
  function adjustInput(input, max) {
    let value = parseInt(input.value, 10);
    if (isNaN(value)) {
      value = 0;
    } else if (value < 0) {
      value = max - 1;
    } else if (value >= max) {
      value = 0;
    }
    input.value = value.toString().padStart(2, '0');
  }

  // Event listeners for hour and minute inputs
  hourInput.addEventListener('change', () => adjustInput(hourInput, 13)); // max 12, but 13 as we start from 1
  minuteInput.addEventListener('change', () => adjustInput(minuteInput, 60));


  // Update adjacent times when inputs change
  function updateTimeDisplay() {
    const hour = parseInt(hourInput.value) || 0;
    const minute = parseInt(minuteInput.value) || 0;
    const isPm = amPmSelect.value === "PM";
    const baseTime = new Date(
      0,
      0,
      0,
      isPm ? hour + 12 : hour,
      minute,
      0
    );

    // Calculate times before and after
    const timeBeforeDate = new Date(baseTime.getTime() - 60 * 1000); // 1 minute before
    const timeAfterDate = new Date(baseTime.getTime() + 60 * 1000); // 1 minute after

    // Update the time display
    timeBefore.textContent = formatTime(timeBeforeDate);
    timeAfter.textContent = formatTime(timeAfterDate);
    selectedTime = formatTime(baseTime); // Set the selected time
  }

  // Format time for display
  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amPm = hours >= 12 ? "p.m" : "a.m";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + amPm;
  }

  // Event listeners for inputs
  hourInput.addEventListener("input", updateTimeDisplay);
  minuteInput.addEventListener("input", updateTimeDisplay);
  amPmSelect.addEventListener("change", updateTimeDisplay);

  // Initialize the current time
  const currentTime = new Date();
  hourInput.value = currentTime.getHours() % 12 || 12;
  minuteInput.value = currentTime
    .getMinutes()
    .toString()
    .padStart(2, "0");
  amPmSelect.value = currentTime.getHours() >= 12 ? "PM" : "AM";
  updateTimeDisplay(); // Initialize the times before and after

  function adjustTime(input, delta, min, max) {
    let currentValue = parseInt(input.value) || 0;
    currentValue += delta;
    if (currentValue < min) currentValue = max - (min - currentValue - 1);
    if (currentValue >= max) currentValue = min + (currentValue - max);
    input.value = currentValue;
    updateTimeDisplay();
  }

  hourInput.addEventListener("wheel", function (event) {
    adjustTime(this, event.deltaY < 0 ? 1 : -1, 1, 13);
    event.preventDefault();
  });

  minuteInput.addEventListener("wheel", function (event) {
    adjustTime(this, event.deltaY < 0 ? 1 : -1, 0, 60);
    event.preventDefault();
  });
});