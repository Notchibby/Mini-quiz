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


function startquestion() {
    mainscreen.style.display = 'none';

    questions.hidden = false;


    extractquestion(currentQuestionIndex)
    let count = time;

    timerId = setInterval(function clockTick() {
        count -= 1;
        timer.textContent = count;
    }, 1000)
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
        btn.append(optionselector)
        li.append(btn)
        btnContainer.append(li)


        btn.addEventListener('click', function () {
            if (currentQuestionIndex < QuestionId.length - 1) {

                currentQuestionIndex++
            }
            else {
                endquiz()
            }

            btnContainer.innerHTML = ""

            extractquestion(currentQuestionIndex)
            clickquestion()
        })
    };
};



function clickquestion() {
    if (!btnContainer.matches('.questionselector')) {
        return;
    };

    if (btnContainer.value !== QuestionId[currentQuestionIndex].answer) {
        time = time - 10;
        if (time < 0) {
            time = 0;
        };
        timer.textContent = time;
        feedback.hidden = false;
        feedback.textContent = "Wrong!";
    }
    else {
        feedback.hidden = false;
        feedback.textContent = 'Correct!';

    };

    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === QuestionId.length) { endquiz() }

    else { extractquestion() }
};


function endquiz() {
    clearInterval(timerId)
    questions.hidden = true;
    endpage.hidden = false;
    var finalscore = document.getElementById('finalscore');
    finalscore.textContent = time;


};

startbtn.onclick = startquestion

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