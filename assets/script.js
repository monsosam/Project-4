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


startButton.addEventListener('click', startQuiz);

function startQuiz() {
    document.getElementById('start').classList.add('hidden');
    quizContainer.classList.remove("hidden");
    displayQuestion();
    timerInterval = setInterval(updateTimer, 1000);   
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    }
}

const choicesContainer = document.getElementById("choices-container");

// Displays the current question and answers
function displayQuestion() {

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = 
        `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    // Clear previous choices
    choicesContainer.innerHTML = "";

    // Create buttons for new choices
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => handleAnswer(choice));
        choicesContainer.appendChild(button);
    });
}
 
// Handles the anser to the quiz questions
function handleAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = selectedAnswer === currentQuestion.correctAnswer;


    if (isCorrect) {
        score++;
        displayFeedback("Correct!", true);
    } else {
        timeLeft = Math.max(timeLeft - 10, 0); // Subtract time and prevent negative
        timerElement.textContent = `Time: ${timeLeft}`; // Update timer immediately

        displayFeedback("Incorrect!", false);
        if (timeLeft === 0) {
            endQuiz();
            return;
        }
        choicesContainer.querySelectorAll("button")[currentQuestion.choices.indexOf(selectedAnswer)].classList.add("incorrect");
        displayFeedback("Incorrect!", false);
    }

    // Add a delay before displaying the next question
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

// Ends the Quiz and gives you a score
function endQuiz() {
    clearInterval(timerInterval);
    timerElement.textContent = `Time: 0`; // Explicitly set timer to 0
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    finalScoreElement.textContent = `Your final score is: ${score}`;
}

// Displays whether you got the question right or wrong
function displayFeedback(message, isSuccess) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = message;
    feedbackElement.className = ''; // Clear previous classes
    feedbackElement.classList.add(isSuccess ? 'correct' : 'incorrect');
    setTimeout(() => feedbackElement.textContent = '', 2000);
}
 
// Add event listener to the "Restart Quiz" button
document.getElementById("restart-btn").addEventListener("click", restartQuiz);

function restartQuiz() {
    
    // Reset quiz to its original state variables
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 75; 

    // Clear any running timer intervals
    clearInterval(timerInterval); 
    
    // Update UI elements to reflect the reset state
    timerElement.textContent = `Time: ${timeLeft}`;
    document.getElementById('start').classList.remove('hidden'); 
    quizContainer.classList.add("hidden"); 
    resultContainer.classList.add("hidden");
    document.getElementById('high-scores').classList.add('hidden'); 
    document.getElementById("feedback").textContent = ''; 
    
    initialsInput.value = ''; // Clear initials input

    saveButton.disabled = false; // Enable save button in case it was disabled
}

// Add event listener to saving a score to initials
saveButton.addEventListener("click", () => {
    const initials = initialsInput.value.trim();
    if (initials) {
        saveHighScore(initials, score);
        alert("Score saved!");
        initialsInput.value = ''; // Clear the input field after saving
        saveButton.disabled = true; // Optionally disable the save button to prevent multiple saves
    } else {
        alert("Please enter your initials!");
    }
});


// Save high scores to localStorage
function saveHighScore(initials, score) {
    const maxHighScores = 10; // Maximum number of high scores to keep
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    highScores.push({ initials, score }); // Add the new score

    highScores.sort((a, b) => b.score - a.score); // Sort scores descending

    // Limit the number of high scores saved
    highScores.splice(maxHighScores);

    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Shows you a list of the high scores
function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const scoresList = document.getElementById("scores-list");
    scoresList.innerHTML = ''; // Clear existing list items

    highScores.forEach(score => {
        const scoreEntry = document.createElement('div');
        scoreEntry.textContent = `${score.initials}: ${score.score}`;
        scoresList.appendChild(scoreEntry);
    });

    document.getElementById('high-scores').classList.remove('hidden'); // Show high scores section
}

// Add event listener to the "Close" button when viewing the high scores
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code here
    document.getElementById("close-high-scores").addEventListener("click", function() {
      // Hide high scores section
      document.getElementById('high-scores').classList.add('hidden'); 
      document.getElementById('start').classList.remove('hidden'); 
    });
});

// Add an Event listener to the "View High Scores" button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("view-high-scores").addEventListener("click", function() {
        // Hide any sections that shouldn't be visible when viewing high scores
        document.getElementById('start').classList.add('hidden');
        document.getElementById('quiz').classList.add('hidden');
        document.getElementById('result').classList.add('hidden');

        // Show the high scores section
        document.getElementById('high-scores').classList.remove('hidden');

        // Optionally call a function to populate and show the high scores if not already done
        displayHighScores();
    });
});
