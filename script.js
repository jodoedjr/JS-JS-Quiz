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
var feedback = document.getElementById("feedback");
var feedbackText = document.getElementById("feedback-text");

var quiz = {
    questions: [ // questions structure: question, 4 answer choices, correct answer array index
        //questions from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
        {
            question: "JavaScript is added to an HTML page with what HTML element?",
            choices: ["<scripting>", "<script>", "<js>", "<javascript>"],
            correct: 1
        },
        {
            question: "Which of these JavaScript snippets will return \"53\"?",
            choices: ["alert(\"53\")", "\"5\" + 3", "5.concat(\"3\")", "\"5\" - 3"],
            correct: 1
        },
        {
            question: "Which of these is a JavaScript array?",
            choices: ["var colors = [\"red\", \"green\", \"blue\"]", "var colors = \"red\", \"green\", \"blue\"", "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")", "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")]"],
            correct: 0
        },
        {
            question: "Which of these JavaScript snippets will return true?",
            choices: ["true === 1", "true - true === 1", "1 < 2 < 3", "3 > 2 > 1"],
            correct: 2
        }
    ],
    index: 0,
    correctAnswerText: "",
    timeLeft: 0,
    quizStopped: false,

    runQuizTimer: function () {
        this.timeLeft = 75;
        this.quizStopped = false;
        var timerInterval = setInterval(function () {
            if (this.quizStopped) {// if quiz stopped due to user reaching the end of questions
                clearInterval(timerInterval);//clear the timer interval
                return; //return function
            }
            this.timeLeft--;//decrement time by 1 each second
            console.log(this.timeLeft);
            console.log(this.quizStopped);
            timeRemaining.textContent = this.timeLeft;
            //feedback.style.display = "none";
            if (this.timeLeft < 1) {
                //times up! quiz is over. navigate to high scores page
                clearInterval(timerInterval);
                window.location.href = "highscores.html";
            }
        }.bind(this), 1000); //1000ms interval
        //.bind(this) provides the 'quiz' object context to this anonymous function inside one of 'quiz's methods
    },

    populateQuestion: function () {
        //this.index = this.getQuestionIndex(); //set objects index to currently displayed question
        if (this.index < this.questions.length) {// if random index is within question array bounds
            var currQuestion = this.questions[this.index];
            questionText.textContent = currQuestion.question;
            btn1.textContent = currQuestion.choices[0];
            btn2.textContent = currQuestion.choices[1];
            btn3.textContent = currQuestion.choices[2];
            btn4.textContent = currQuestion.choices[3];
            //store the text of the correct answer for comparison
            //
            this.correctAnswerText = currQuestion.choices[currQuestion.correct];
            this.index++;//increment question index for next question
        }

    },

    determineAnswer: function (event) { // determine if user input was correct
        if (event.target.nodeName === "BUTTON") {// if click target was a button
            //find text of user answer, cut off the prepended "#. "
            var userAnswerText = event.target.innerText.toString();
            if (userAnswerText === this.correctAnswerText) { // text matches correct answer
                //display correct
                feedback.style.display = "block";
                feedbackText.textContent = "Correct!";
            } else { //else - wrong
                //display wrong
                feedback.style.display = "block";
                feedbackText.textContent = "Wrong!";
                this.timeLeft -= 10;
            }
            if (this.index > this.questions.length - 1) {//if quiz over, show highscores
                this.quizStopped = true;
                this.newHighscore();
            } else {
                this.populateQuestion();
            }
        }
    },

    newHighscore: function () {
        //all done
        //your final score is xx
        //enter your initials - form box - submit
        questionText.textContent = "Quiz Complete!";
        var finalScore = this.timeLeft;
        subHeadding.textContent = "Your final score was: " + finalScore;
        subHeadding.style.display = "block";
        answerField.style.display = "none";
        feedback.style.display = "none";

        var newDiv = document.createElement("div");
        newDiv.innerHTML = "Please enter your initials: ";

        var newInput = document.createElement("input");
        newInput.type = "Initials";
        newInput.classList = "form-control";
        newInput.id = "initials-form";

        var submit = document.createElement("button");
        submit.classList = "btn page-buttons";
        submit.textContent = "Submit";
        newDiv.appendChild(newInput);
        newDiv.appendChild(submit);
        subHeadding.appendChild(newDiv);

        submit.addEventListener("click", function (event) {
            var initials = newInput.value.trim();
            if (initials.trim() != "") {
                localStorage.setItem("newScore", JSON.stringify([initials, finalScore]));
                console.log(JSON.parse(localStorage.getItem("newScore")));
                document.location.href = "highscores.html";
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", function (event) {
    questionText.textContent = "Coding Quiz Challenge";
    subHeadding.innerHTML = "Try to answer the following code-related question within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
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
        quiz.determineAnswer(event);
    });

});

