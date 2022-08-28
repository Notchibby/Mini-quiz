var currentquestionnumber = 0;
var time = QuestionId.length * 10;
var timerId;

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
var currentQuestionIndex = 0;

function clockTick() {
    time -= 1;
    timer.textContent = time;
}

function startquestion() {
    mainscreen.style.display = 'none';

    questions.hidden = false;


    extractquestion(currentQuestionIndex)

    timerId = setInterval(clockTick, 1000)
    timer.textContent = time;
};

function extractquestion() {
    var questionselector = QuestionId[currentQuestionIndex];
    var titleselector = document.getElementById('title');
    titleselector.textContent = questionselector.title;
    btnContainer.innerHTML = "";

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


    // if (!selectedanswer.matches('.options')) {
    //     return;
    // }

    if (selectedanswer.textContent !== QuestionId[currentQuestionIndex].answer) {

        time -= 10;
        if (time < 0) {
            time = 0;
        };
        timer.textContent = time;
        feedback.hidden = false

        feedback.textContent = "Wrong!";

    }
    else {

        feedback.hidden = false
        feedback.textContent = 'Correct!';

    };


    setTimeout(function () {
        feedback.hidden = true
    }, 800);

    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === QuestionId.length) { endquiz() }

    else { extractquestion(currentQuestionIndex) }
};

function endquiz() {
    clearInterval(timerId)
    questions.hidden = true;
    endpage.hidden = false;
    var finalscore = document.getElementById('finalscore');
    finalscore.textContent = time;
};



startbtn.onclick = startquestion
btnContainer.onclick = clickquestion

function highscore() {
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