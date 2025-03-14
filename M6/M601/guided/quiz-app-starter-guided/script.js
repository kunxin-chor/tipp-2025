// quiz.js
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');

let currentQuestion = 0;
let score = 0;

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

// setup  all the choice buttons
const choiceButtons = document.querySelectorAll('.choice-btn');

for (let i = 0; i < choiceButtons.length; i++) {
    // Add click event listener to each button

    choiceButtons[i].addEventListener('click', function () {
        // send the index of the button clicked to checkAnswer function
        checkAnswer(i);
    });
}

function displayQuestion() {

    // get the current question object
    const question = quizData[currentQuestion];
    questionEl.innerHTML = question.question;

    // replace each choice button with the choices from the question object
    for (let i = 0; i < question.choices.length; i++) {
        choicesEl.children[i].innerHTML = question.choices[i];
    }

}

function checkAnswer(selectedIndex) {
    // check if the selected index is equal to the correct index
    const question = quizData[currentQuestion];
    if (selectedIndex === question.correct) {
        score += 1;
        choiceButtons[selectedIndex].classList.add('correct');
    } else {
        choiceButtons[selectedIndex].classList.add('wrong');
        choiceButtons[question.correct].classList.add('correct');
    }

    setTimeout(function () {
        // reset all the buttons
        for (let b of choiceButtons) {
            b.classList.remove('correct', 'wrong');
        }
        nextQuestion();

    }, 1500);

}

function nextQuestion() {
    // increment the currentQuestion variable
    currentQuestion++;
    // check if the currentQuestion is less than the length of the quizData array
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        alert('Quiz Over!');
    }
}

displayQuestion();