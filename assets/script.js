const questions = [
    {
        question: "What is used primarily to add styling to a web page?",
        choices: ["HTML", "CSS", "Python", "React.js"],
        correctAnswer: "CSS"
    },
    {
        question: "Which programming language is used for web development?",
        choices: ["Java", "Python", "JavaScript", "C#"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What does HTML stand for?",
        choices: ["HyperText Markup Language", "High-Level Text Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correctAnswer: "HyperText Markup Language"
    },
    {
        question: "Which of the following tags is used to create a hyperlink in HTML?",
        choices: ["<a>", "<link>", "<href>", "<p>"],
        correctAnswer: "<a>"
    },
    {
        question: "In CSS, how can you select an element with id 'myElement'?",
        choices: ["#myElement", ".myElement", "element(myElement)", "@myElement"],
        correctAnswer: "#myElement"
    },
    {
        question: "What property is used to change the text color in CSS?",
        choices: ["text-color", "color", "font-color", "text-style"],
        correctAnswer: "color"
    },
    {
        question: "Which keyword is used to declare variables in JavaScript?",
        choices: ["var", "let", "const", "variable"],
        correctAnswer: "var"
    },
    {
        question: "What does the 'typeof' operator in JavaScript return for the data type 'array'?",
        choices: ["array", "object", "list", "type"],
        correctAnswer: "object"
    },
    {
        question: "What does API stand for in the context of web development?",
        choices: ["Advanced Programming Interface", "Application Programming Interface", "Automated Programming Interface", "Advanced Protocol Integration"],
        correctAnswer: "Application Programming Interface"
    },
    {
        question: "Which HTTP method is typically used for retrieving data from a server in a RESTful API?",
        choices: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: "GET"
    },
    
];

const startButton = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const finalScoreElement = document.getElementById("final-score");
const timerElement = document.getElementById("timer");
const initialsInput = document.getElementById("initials-input");
const saveButton = document.getElementById("save-btn");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 75; // Initial time for the quiz (in seconds)
let timerInterval;
 
function startQuiz() {
    startButton.classList.add("hidden");
    timerInterval = setInterval(updateTimer, 1000);

    displayQuestion();
    quizContainer.classList.remove("hidden");
}
 
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => handleAnswer(choice));
        choicesContainer.appendChild(button);
    });
}
 
 
function handleAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    } else {
        // Subtract time if the answer is incorrect
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0; // Ensure time doesn't go negative
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    finalScoreElement.textContent = score;
}

function updateTimer() {
    timerElement.textContent = `Time: ${timeLeft}`;

    if (timeLeft === 0) {
        endQuiz();
    }
}
 
saveButton.addEventListener("click", () => {
    const initials = initialsInput.value.trim();
    // Save initials and score as needed (you can use local storage, send to a server, etc.)
    console.log(`Initials: ${initials}, Score: ${score}`);
});

startButton.addEventListener("click", startQuiz);