let timer;
let isRunning = false;
let totalCost = 0;
let startTime;

const startBtn = document.getElementById('startBtn');
const counter = document.getElementById('counter');
const verdict = document.getElementById('verdict');
const attendeesInput = document.getElementById('attendees');
const rateInput = document.getElementById('rate');

function toggleTimer() {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  const attendees = parseInt(attendeesInput.value) || 0;
  const rate = parseInt(rateInput.value) || 0;
  
  if (attendees === 0 || rate === 0) return;

  // Calculate cost per second: (Rate * People) / 3600 seconds
  const costPerSecond = (rate * attendees) / 3600;
  
  isRunning = true;
  document.body.classList.add('running');
  startBtn.textContent = "Stop Meeting";
  
  // High precision timer logic
  // We subtract the current cost equivalent in time to allow resuming
  startTime = Date.now() - (totalCost / costPerSecond * 1000);

  timer = setInterval(() => {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    totalCost = elapsedSeconds * costPerSecond;
    updateDisplay();
  }, 100);
}

function stopTimer() {
  isRunning = false;
  document.body.classList.remove('running');
  clearInterval(timer);
  startBtn.textContent = "Resume Meeting";
}

function resetTimer() {
  stopTimer();
  totalCost = 0;
  startBtn.textContent = "Start Meeting";
  counter.textContent = "0.00";
  verdict.textContent = "Ready to burn cash?";
}

function updateDisplay() {
  counter.textContent = totalCost.toFixed(2);
  
  // The Snark Logic
  if (totalCost < 10) verdict.textContent = "Cheaper than a latte...";
  else if (totalCost < 50) verdict.textContent = "Okay, let's wrap it up.";
  else if (totalCost < 100) verdict.textContent = "Getting expensive...";
  else if (totalCost < 200) verdict.textContent = "THIS COULD HAVE BEEN AN EMAIL."; 
  else if (totalCost < 500) verdict.textContent = "We are literally burning profit.";
  else verdict.textContent = "Hope the ROI is worth it.";
}