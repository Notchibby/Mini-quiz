var currentquestionnumber = 0;
var time = questions.length * 10;

var questions = document.getElementById("questions");
var options = document.getElementById("options");
var startbtn = document.getElementById("start");
var submitbtn = document.getElementById('submit');
var timer = document.getElementById('timer');
var initials = document.getElementById('initials');
var mainscreen = documnet.getElementById('main');

function startquestion() {
    mainscreen.setAttribute("class", "hide");

    questions.removeAttribute("class");

    var timer = setInterval(this, 1000)
};
