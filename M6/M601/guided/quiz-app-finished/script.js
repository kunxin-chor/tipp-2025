// Quiz Questions
const quizData = [
    {
        question: "What is the capital of France?",
        correct: 0,
        choices: ["Paris", "London", "Berlin", "Madrid"]
    },
    {
        question: "Which planet is known as the Red Planet?",
        correct: 2,
        choices: ["Venus", "Jupiter", "Mars", "Saturn"]
    }
];

let currentQuestion = 0;
let score = 0;

// DOM Elements
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const progressEl = document.getElementById('progress');
const scoreEl = document.getElementById('score');
const quizContainer = document.getElementById('quiz-container');

// seup all the choice buttons
const choiceButtons = document.querySelectorAll('.choice-btn');

for (let i = 0; i < choiceButtons.length; i++) {
    // Add click event listener to each button
    
    choiceButtons[i].addEventListener('click', function () {
        // send the index of the button clicked to checkAnswer function
        checkAnswer(i);
    });
}

function displayQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;     

    // Create new choice buttons
    for (let i = 0;i < question.choices.length; i++) {
        if (choiceButtons[i]) {
            choiceButtons[i].classList.remove('correct', 'wrong');
            choiceButtons[i].disabled = false;
            choiceButtons[i].textContent = question.choices[i];
        }
    }

    updateProgress();
}

function checkAnswer(selectedIndex) {
    const question = quizData[currentQuestion];
    const buttons = choicesEl.querySelectorAll('.choice-btn');

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        score++;
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
    }

    scoreEl.textContent = 'Score: ' + score;

    setTimeout(function () {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function updateProgress() {
    progressEl.textContent = 'Question ' + (currentQuestion + 1) + ' of ' + quizData.length;
}

function showResults() {
    quizContainer.innerHTML = `
    <h2 class="text-center mb-4">Quiz Complete!</h2>
    <div class="alert alert-success">Final Score: ${score}/${quizData.length}</div>
    <button onclick="location.reload()" class="btn btn-primary w-100">Restart Quiz</button>
`;
}

// Initialize quiz
displayQuestion();