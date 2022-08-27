var currentquestionnumber = 0;
var time = Questions.length * 10;
var timerId;

var questions = document.getElementById("Questions");
var options = document.getElementById("options");
var startbtn = document.getElementById("start");
var submitbtn = document.getElementById('submit');
var timer = document.getElementById('time');
var initials = document.getElementById('initials');
var mainscreen = document.getElementById('frontpage');
var title = document.getElementById('title');




function startquestion() {
    mainscreen.style.display = 'none';

    questions.hidden = false;

    let count = 0;

    timerId = setInterval(function clockTick() {
        count += 1;
        timer.textContent = count;
    }, 1000)
};

function extractquestion() {
    var questionselector = QuestionsId[i];
    title.textContent = 'hahaha';
    options.innerHTML = "";

    // for (var i = 0; i < questionselector.length; i++) {
    //     var optionselector = questionselector.options[i];
    //     options.textContent = i + 1 + '. ' + options
    // };
};


// function clickquestion() {
//     if (!questionclickerbutton.matches('.questionselector')) {
//         return;
//     };

//     if (questionclickerbutton !== Questions[i].answer) {
//         time = time - 10
//         if (time < 0) {
//             time = 0;
//         };
//         timer.textContent = time;
//     };
//     CurrentQuestionIndex++
// };

// var questionclickerbutton = questionselector.addEventListener('Click', clickquestion);


// if (time <= 0 || CurrentQuestionIndex === Questions.length) {
//     quizend();
// }
// else {
//     extractquestion()
// };

startbtn.addEventListener('click', startquestion);