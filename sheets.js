const questions = [
    {
        question: "Which language is mainly used to structure a web page?",
        answers: [
            { text: "HTML", correct: true },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which language is used to style a web page?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which language is used to add interactivity to web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "variable", correct: false },
            { text: "var", correct: true },
            { text: "define", correct: false },
            { text: "value", correct: false }
        ]
    },

    {
        question: "Which method is used to select an element by its ID?",
        answers: [
            { text: "getElementById()", correct: true },
            { text: "getElement()", correct: false },
            { text: "selectById()", correct: false },
            { text: "findElement()", correct: false }
        ]
    },

    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answers: [
            { text: "<!-- -->", correct: false },
            { text: "/* */", correct: false },
            { text: "//", correct: true },
            { text: "#", correct: false }
        ]
    },

    {
        question: "Which data type represents true or false?",
        answers: [
            { text: "String", correct: false },
            { text: "Number", correct: false },
            { text: "Boolean", correct: true },
            { text: "Array", correct: false }
        ]
    },

    {
        question: "Which operator checks both value and data type in JavaScript?",
        answers: [
            { text: "=", correct: false },
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false }
        ]
    },

    {
        question: "Which method adds an item to the end of an array?",
        answers: [
            { text: "push()", correct: true },
            { text: "add()", correct: false },
            { text: "insert()", correct: false },
            { text: "append()", correct: false }
        ]
    },

    {
        question: "Which function is used to run code after a specific time?",
        answers: [
            { text: "setTime()", correct: false },
            { text: "wait()", correct: false },
            { text: "setTimeout()", correct: true },
            { text: "delay()", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextButton");
const questionNumber = document.getElementById("questionNumber");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");

const resultBox = document.getElementById("resultBox");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const restartButton = document.getElementById("restartButton");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    resultBox.classList.add("hidden");
    document.querySelector(".question-section").classList.remove("hidden");
    nextButton.classList.remove("hidden");
    document.querySelector(".quiz-info").classList.remove("hidden");
    document.querySelector(".progress-container").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    const progress =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.textContent = answer.text;
        button.classList.add("answer-button");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });

    startTimer();
}

function resetState() {
    clearInterval(timer);

    nextButton.disabled = true;

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {
    timeLeft = 15;
    timerElement.textContent = `Time: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;

        timerElement.textContent = `Time: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            showCorrectAnswer();
            nextButton.disabled = false;
        }
    }, 1000);
}

function selectAnswer(event) {
    clearInterval(timer);

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    showCorrectAnswer();

    nextButton.disabled = false;
}

function showCorrectAnswer() {
    const buttons = answerButtons.children;

    Array.from(buttons).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    clearInterval(timer);

    document.querySelector(".question-section").classList.add("hidden");
    nextButton.classList.add("hidden");
    document.querySelector(".quiz-info").classList.add("hidden");
    document.querySelector(".progress-container").classList.add("hidden");

    resultBox.classList.remove("hidden");

    finalScore.textContent = `${score} / ${questions.length}`;

    if (score === questions.length) {
        resultMessage.textContent = "Perfect score! Excellent work!";
    } else if (score >= 7) {
        resultMessage.textContent = "Great job! Keep learning!";
    } else if (score >= 5) {
        resultMessage.textContent = "Good attempt! You can improve!";
    } else {
        resultMessage.textContent = "Keep practicing and try again!";
    }
}

restartButton.addEventListener("click", startQuiz);

startQuiz();