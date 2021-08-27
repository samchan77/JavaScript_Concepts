
var currentQuestionIndex = 0;
var time = question.lenght * 15;
var timerId;



var questionEl = document.getElementById ("questions");
var timerEl = document.getElementById ("timer");
var choicesEl = document.getElementById ("choices");
var submitBtn = document.getElementById ("submit");
var startBtn = document.getElementById ("start");
var initialsEl = document.getElementById ("initials");
var feedbackEl = document.getElementById ("feedback");



var sfxRight = new Audio ("assets/sfx/correct.wav");
var sfxWrong = new Audio ("assets/sfx/incorrect.wav");

function startQuiz () {

    var startScreenEl = document.getElementById ("start-screen");
    startScreenEl.setAttribute ("class" , "hide");

    questionEl.removeAttribute ("class");


    timerId = setInterval (clockTick, 1000);

    timerEl. textContent = time;

    getQuestion();
}


function getQuestion () {

    var currentQuestion = question [currentQuestionIndex];

    var titleEl = document.getElementById ("question-title");
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach (function (choice, i) {

        var choiceNode = document.createElement ("button");
        choiceNode.setAttribute ("class", "choice");
        choiceNode.setAttribute ("value", "choice");

        choiceNode.textContent = i + 1 + " . " + choice;


        choiceNode.onclick = questionClick;

        choicesEl.appendChild (choiceNode);

    });
}

function questionClick () {

    if (this.value !== questions [currentQuestionIndex] . answer) {

        time -= 15;

        if (time<0) {
            time = 0;
        }

        timerEl.textContent = time;

        sfxWrong.play ();

        feedbackEl.textContent = "Wrong!";

        sfxRight.play ();

        feedbackEl.textContent = "Correct!";

        feedbackEl.setAttribute ("class" , "feedback hide");

    } 1000;

    currentQuestionIndex ++;

    if (currentQuestionIndex ===questions.lenght) {
        quizEnd();

    } else {
        getQuestion();
    }   
        
}

function quizEnd() {

    clearInterval (timerId);

    var endScreenEl = document.getElementsById ("end-screen");
    endScreenEl.removeAttribute ("class");

    var finalScoreEl = document.getElementsById ("final-score");

    finalScoreEl.textContent = time;

    questionEl.setAttribute ("class", "hide");

}

function clockTick () {
    time--;

    titleEl.textContent = time;

    if (time <=0) {

        quizEnd ();
    }
}


function saveHighscores () {

    var initials = initialsEl.value.trim ();

    if (initials !=="") {

        var highscores = JSON.parse (window.localStorage.getItem ("highscores")) || [];

        var newScore = {

            score: time,
            initials:initials
        };

        highscores.push(newScore);
        window.localStorage.setItem ("highscores", JSON.stringify (highscores));

        window.location.href = "highscores.html";
    }
}


function checkForEnter (event) {

    if (event.key ==="Enter") {

        saveHighscores();
    }
}


submitBtn.onclick = saveHighscores;


startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;