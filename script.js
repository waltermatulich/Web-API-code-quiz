// DOM CSS Selectors!

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// Where the quiz will state the variables.

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {

  // Hides the start screen!

  
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // Un-hides the questions from the section.

   questionsEl.removeAttribute("class");

  // Stars the timer.

  timerId = setInterval(clockTick, 1000);

  // Shows Start Time!

  timerEl.textContent = time;

  getQuestion();

}

function getQuestion() {

  // This will get the current question object from the array

  var currentQuestion = questions[currentQuestionIndex];

  // Title will be updated with the current question

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // Old questions will be cleared out

  choicesEl.innerHTML = "";

  // Choice loop!
  currentQuestion.choices.forEach(function(choice, i) {

    // New button will be created for each choice.

    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // Click event listener will be attached to each choice

    choiceNode.onclick = questionClick;

    // Page display

    choicesEl.appendChild(choiceNode);
  });

}

function questionClick() {

  // This will check if user guessed wrong

  if (this.value !== questions[currentQuestionIndex].answer) {

    // Time penalization!

    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // New time displayed on page!

    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }

  // Right/Wrong feedback will be flashed.
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // Next question ->
  currentQuestionIndex++;

  //Time Check!
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {

  // Stop time

  clearInterval(timerId);

  // Show end screen!

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Final score

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hide question section

  questionsEl.setAttribute("class", "hide");
}


function clockTick() {

  // Time updated

  time--;
  timerEl.textContent = time;

  // Check to see if user ran out of time

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {

  // Get input box value

  var initials = initialsEl.value.trim();

  if (initials !== "") {

    // Saved scores obtained from localstorage, or if not any, set to empty array


    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // New Score object formatted for the current user!


    var newScore = {
      score: time,
      initials: initials
    };

    //Save to localstorage


    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Redirect to next page

    window.location.href = "score.html";
  }
}

function checkForEnter(event) {

  // "13" represents the enter key


  if (event.key === "Enter") {
    saveHighscore();
  }
}

// Submit your initials!


submitBtn.onclick = saveHighscore;

// Start the Quiz!

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;