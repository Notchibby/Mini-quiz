var currentquestionnumber = 0;
var time = QuestionId.length * 10;
var timerId;

// Elements to help navigate the DOM
var questions = document.getElementById("Questions");
var options = document.getElementById("options");
var startbtn = document.getElementById("start");
var submitbtn = document.getElementById('submit');
var timer = document.getElementById('time');
var initials = document.getElementById('initials');
var mainscreen = document.getElementById('frontpage');
var btnContainer = document.getElementById('btnContainer');
var feedback = document.getElementById('feedback');
var endpage = document.getElementById('endpage');
var highscoreEl = document.getElementById('highscore');
var currentQuestionIndex = 0;

// Timer countdown
function clockTick() {
    if (time != 0) {
        time -= 1;
    } else {
        time = 0;
    }
    timer.textContent = time;
}

// function called when start button is clicked
function startquestion() {
    // hides homescreen
    mainscreen.style.display = 'none';
    // shows questions
    questions.hidden = false;


    extractquestion(currentQuestionIndex)

    // starts timer
    timerId = setInterval(clockTick, 1000)
    timer.textContent = time;
};

function extractquestion() {
    // selects question title from the Questions.js array
    var questionselector = QuestionId[currentQuestionIndex];
    var titleselector = document.getElementById('title');
    titleselector.textContent = questionselector.title;
    btnContainer.innerHTML = "";

    // uploads corresponding options
    for (var i = 0; i < questionselector.options.length; i++) {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        var optionselector = questionselector.options[i];
        btn.append(optionselector);
        li.append(btn);
        btnContainer.append(li);
    };
};



function clickquestion(event) {
    selectedanswer = event.target;

    // checks if selected option corresponds to the answer
    if (selectedanswer.textContent !== QuestionId[currentQuestionIndex].answer) {

        // if wrong anwer is selected time penalty.
        time -= 10;
        if (time < 0) {
            time = 0;
        };
        timer.textContent = time;
        feedback.hidden = false

        // displays wrong if wrong answer is selected
        feedback.textContent = "Wrong!";

    }
    else {

        //displays correct if the right anser is selected
        feedback.hidden = false
        feedback.textContent = 'Correct!';

    };

    // displays feedback for 0.8 seconds
    setTimeout(function () {
        feedback.hidden = true
    }, 800);

    // move to next question
    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === QuestionId.length) { endquiz() }

    else { extractquestion(currentQuestionIndex) }
};

function endquiz() {
    // stop timer
    clearInterval(timerId)
    // hide questions
    questions.hidden = true;
    // display endpage
    endpage.hidden = false;
    var finalscore = document.getElementById('finalscore');
    // prints final score
    finalscore.textContent = time;
};



startbtn.onclick = startquestion
btnContainer.onclick = clickquestion
submitbtn.onclick = highscoresave

function highscoresave() {
    highscoreEl.hidden = false;
    initials = initials.value.trim();
    if (initials !== '') {
        var highscores =
            JSON.parse(window.localStorage.getItem('highscores')) || [];

        var currentscore = {
            score: time,
            initials: initials,
        };

        highscores.push(currentscore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));



    }
};