// Progress
function updateProgress() {
    const activities = document.querySelectorAll(".time-card");
    const completedActivities = document.querySelectorAll(".time-card.completed").length;

    const goals = document.querySelectorAll(".goal-check");
    const completedGoals = document.querySelectorAll(".goal-check:checked").length;

    const total = activities.length + goals.length;
    const completed = completedActivities + completedGoals;

    const percentage = Math.round((completed / total) * 100);

    document.getElementById("progressFill").style.width = percentage + "%";
    document.getElementById("progressText").textContent =
        percentage + "% completed";
}


// Mark Complete buttons
document.querySelectorAll(".complete-btn").forEach(button => {
    button.addEventListener("click", function () {

        const card = this.closest(".time-card");

        card.classList.toggle("completed");

        if (card.classList.contains("completed")) {
            this.textContent = "✓ Completed";
        } else {
            this.textContent = "Mark Complete";
        }

        updateProgress();
    });
});


// Goal progress
document.querySelectorAll(".goal-check").forEach(checkBox => {
    checkBox.addEventListener("change", updateProgress);
});


// Start My Day button
function startDay() {
    document.getElementById("day").scrollIntoView({
        behavior: "smooth"
    });
}


// Dark / Light mode
function toggleTheme() {
    document.body.classList.toggle("dark");

    const button = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark")) {
        button.textContent = "☀️";
    } else {
        button.textContent = "🌙";
    }
}


// Pomodoro Timer
let timeLeft = 25 * 60;
let timerInterval = null;

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}

function startTimer() {

    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {

        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("🎉 Focus session completed!");
        }

    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateTimer();
}


// Habit Tracker
document.querySelectorAll(".habit").forEach(habit => {

    habit.addEventListener("click", function () {
        this.classList.toggle("active");
    });

});


// Initial setup
updateTimer();
updateProgress();