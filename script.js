var timeRemaining = document.getElementById("time-remaining");
var questionField = document.getElementById("question-field");
var questionText = document.getElementById("question-text");
var subHeadding = document.getElementById("sub-heading");
var btnStartQuiz = document.getElementById("btn-start-quiz");
var btn1 = document.getElementById("btn-1");
var btn2 = document.getElementById("btn-2");
var btn3 = document.getElementById("btn-3");
var btn4 = document.getElementById("btn-4");

var answerField = document.getElementById("answer-field");

var numQuestions = 4;
var timeLeft = 0;

var quiz = {
    questions: ["Question 1", "Question2", "Question 3", "Question 4", "Question 5"],
    answers: {
        text: [["Answer 1", "Answer 2", "Answer 3", "Answer 4"], ["Answer 1", "Answer 2", "Answer 3", "Answer 4"], ["Answer 1", "Answer 2", "Answer 3", "Answer 4"], ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]],
        correct: [0, 1, 2, 3, 0]
    },
    usedQuestions: [],
    index: 0,
    correctAnswerText: "",
    runQuizTimer: function() { 
        timeLeft = 60;
        var timerInterval = setInterval(function(){
            timeLeft--;//decrement time by 1 each second
            timeRemaining.textContent = timeLeft;
        }, 1000);
    },
    getQuestionIndex: function () {
        // if all questions have been used, reset used questions array
        if (this.usedQuestions.length === this.questions.length) {
            this.usedQuestions = [];
        }
        while (true) {
            //find a random index in the question array, and if it hasn't been used yet, return that index
            var randomQuestionIndex = Math.floor(Math.random() * this.questions.length);
            if (!this.usedQuestions.includes(randomQuestionIndex)) {
                return (randomQuestionIndex);
            }// else loop again
        }
    },
    populateQuestion: function () {
        this.index = this.getQuestionIndex(); //set objects index to currently displayed question
        if (this.index < this.questions.length) {// if random index is within question array bounds
            questionText.textContent = this.questions[this.index];
            var answersArray = this.answers.text[this.index];
            btn1.textContent = "1. " + answersArray[0];
            btn2.textContent = "2. " + answersArray[1];
            btn3.textContent = "3. " + answersArray[2];
            btn4.textContent = "4. " + answersArray[3];
            this.correctAnswerText = this.answers.text[this.index][this.answers.correct[this.index]];
        }
    },
    determineAnswer: function (event) { // determine if user input was correct
        // console.log("Correct: "+ correctAnswerText);
        var userAnswerText = event.target.innerText.toString().substr(3);
        // console.log("User: " + userAnswerText);
        if (userAnswerText === correctAnswerText) {
            console.log("Correct");
        } else {
            console.log("Not Correct");
        }
    }
};

$




document.addEventListener("DOMContentLoaded", function (event) {

    //wait for 'Start Quiz' button press, then begin quiz
    btnStartQuiz.addEventListener("click", function (event) {
        event.preventDefault();
        //proceed with quiz, hide subHeading and start quiz btn
        subHeadding.style.display = "none";
        btnStartQuiz.style.display = "none";
        answerField.style.display = "block";
        // populate next question
        quiz.populateQuestion();
        //start timer
        quiz.runQuizTimer();
    });

    answerField.addEventListener("click", function (event) {
        console.log("Answer Recived");
        quiz.determineAnswer(event);
    });



});

