let timeLeft = 60;
let score = 0;
let initialsScore = [];

// define the button element that holds the start-btn id
var startButton = document.getElementById('start-btn');
// define the button element that holds the next-btn id
var nextButton = document.getElementById('next-btn');

// define the div element that holds the question-container id
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');

// define the div element that holds the countdown id
var timerElement = document.getElementById('countdown');

// define the div element that holds the end-game-container id
var endContainerElement = document.getElementById('end-game-container');

// define the div element that holds the end-game-form id
var formElement = document.getElementById('end-game-form');

// define the div element that holds the clock id
var clock = document.getElementById('clock');

// define the div element that holds the scorebox id
var scoreBox = document.getElementById('scorebox');

// define the div element that holds the controls id
var buttonBox = document.getElementById('controls');

// shuffledQuestions so questions don't always show up in the same exact order and is completely random; currentQuestionIndex so we know which questions inside of the shuffled questions away we're on; will both default to a value of undefined
let shuffledQuestions, currentQuestionIndex

// add click event listener for when start button is clicked to cue code that is inside of startGame function
startButton.addEventListener('click', () => {
    clock.classList.remove('hide');
    timeLeft = 60;
    startGame();
    startTimer();
})
// make Next button work by adding a click event listener
nextButton.addEventListener('click', () => {
    // take our current question index and add 1 to it so it increments to the next question we have
    currentQuestionIndex++
    // call the setNextQuestion function
    setNextQuestion()
})

// timer function that counts down from 60
function startTimer() {
    // use setInterval method to call function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        // as long as timeLeft is greater than 1
        if (timeLeft >= 1) {
            // set the text content of the timerElement to show the seconds remaining
            timerElement.textContent = timeLeft;
            // decrement timeLeft by 1
            timeLeft--;
        } else if (timeLeft === 0) {
            // once timeLeft reaches 0, set timeElement to an empty string
            timerElement.textContent = '';
            // use clearInterval method to stop timer
            clearInterval(timeInterval);
            endGame();
        }
    },
        1000);
}

// function to start game when start button is clicked
function startGame() {
    // hide form element
    endContainerElement.classList.add('hide');
    // hide start button
    startButton.classList.add('hide');
    // add hide class to start button so that it no longer shows up when start button is clicked
    // use classList not className because the start button already has a class of start-btn and btn; you're just adding another class to the list
    startButton.classList.add('hide');
    // set shuffled questions equal to the shuffled array; take current questions array and sort it; sort will take a function and sort it a certain way depending on if the number is positive or negative; if you want a random number that's either going to be below or above 0, use Math.random which will give you a number between 0 and 1; subtracting it be .5 is going to give us a number that is either less than 0 or more than 0 50% of the time which gives us a completely random array
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    // set question index to 0 because we're starting on the very first question in shuffled questions array
    currentQuestionIndex = 0;
    // remove hide class from the question container div so it shows up after start button gets hidden when it is clicked
    questionContainerElement.classList.remove('hide');
    // make function implement and show questions with another function that has your list of questions
    setNextQuestion();

}

// function to set next question when next button is clicked
function setNextQuestion() {
    // clears answers every single time we set our next question; resets everything related to our form, our questions, or body all back to its default state every time we set a new question
    resetState()
    // create function to get and show question and take our current question (which is our shuffled questions) at the current question index 
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// function to take a question object from the questions array
function showQuestion(question) {
    questionElement.innerText = question.question
    // populate different answers by looping through question's answers
    question.answers.forEach(answer => {
        // create button for each answer
        const button = document.createElement('button')
        // set inner text of button to be equal to the text keyword value of the answers array
        button.innerText = answer.text
        // set btn class to button
        button.classList.add('btn')
        // check if answer is correct
        if (answer.correct) {
            // dataset will add data attribute onto button element; attribute of correct is added with a value of answer.correct
            button.dataset.correct = answer.correct
        }
        // add click event listener for when correct answer is clicked to cue code that is inside of selectAnswer function
        button.addEventListener('click', selectAnswer)
        // append button to answer button element
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    // clear background color between sets
    clearStatusClass(document.body)
    // hide Next button; after answer is clicked we are going to show the Next button; when we show next question we are going to hide the Next button
    nextButton.classList.add('hide')
    // loop through all the children for our answer button elements; if there is a child inside the answer button element we want to remove it
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// function when correct answer is selected; will take button addEventListener click event as a parameter
function selectAnswer(event) {
    // get which button we selected; event.target is whatever we clicked on
    const selectedButton = event.target
    // check to see if it is correct; const correct will be set equal to the selected button to check for dataset.correct from the 'if' loop in the showQuestion function
    const correct = selectedButton.dataset.correct
    // add timeLeft to score when correct answer is selected and deduct timeLeft when incorrect answer is selected
    if (correct) {
        score++;
    } else {
        timeLeft -= 10;
    }
    // set status class of our body by creating function that will take document.body and take whether or not it should be set to correct or wrong
    setStatusClass(document.body, correct)
    // create an array from children of answerButtonsElement in order to be used with forEach loop and loop through all of the other buttons and set the class for them
    Array.from(answerButtonsElement.children).forEach(button => {
        // take button and check button.dataset.correct to set the status based on whether or not that answer was a correct answer
        setStatusClass(button, button.dataset.correct)
    })
    // check if we have any more questions to go through; check if length of shuffled questions is greater than the current question index + 1; this means we have more questions than we are currently on and not on the last question 
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // remove hidden class from Next button
        nextButton.classList.remove('hide')
    } else {
        // call endGame function
        endGame();
    }
}

function endGame() {
    // set final score to score from timeLeft
    var finalScore = score;
    // set score to zero
    score = 0;
    // show final score
    scoreBox.textContent = "Final Score : " + finalScore;
    // set timeLeft to empty string to stop timer
    timeLeft = "";
    // set hide class to clock container to hide timer
    clock.classList.add('hide');
    // after last question: show endContainerElement and hide questionContainerElement and Next button 
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
    endContainerElement.classList.remove('hide');
    // add form element back to html
    endContainerElement.append(formElement);
    // get user input
    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        var initialsInput = document.querySelector("input[name='initials']").value;
        // check if input value is empty string
        if (!initialsInput) {
            alert("You need to input your initials!");
            return false;
        }
        // create object that holds initials and score keys with their respective values
        var userScore = {
            initials: initialsInput,
            score: finalScore,
        };

        // store initialsScore into locatStorage
        var initialsScore = JSON.parse(localStorage.getItem("initialsScore")) || [];
        initialsScore.push(userScore);
        localStorage.setItem("initialsScore", JSON.stringify(initialsScore));



        // loop object and print each info//
        showScores();
    });

};

function showScores() {
    formElement.reset();
    formElement.remove();
    startButton.innerText = "Restart";
    startButton.classList.remove('hide');

    // var clearScores = document.createElement("button");
    // clearScores.classList = "btn start-btn";
    // clearScores.textContent = "Clear Scores";
    // buttonBox.appendChild(clearScores);
    // clearScores.addEventListener("click", () => {
    //     localStorage.clear();
    //     submitEl.reset();
    // });
    

    var initialsScore = JSON.parse(localStorage.getItem("initialsScore")) || [];
    for (i = 0; i < initialsScore.length; i++) {
        var submitEl = document.createElement("li");
        submitEl.className = "high-score";
        submitEl.textContent = initialsScore[i].initials + " : " + initialsScore[i].score;
        scoreBox.appendChild(submitEl);
    }


}

// take element and whether or not it is correct
function setStatusClass(element, correct) {
    // create function that will take any element we're going to clear status on
    clearStatusClass(element)
    // if this is correct we want to add correct class
    if (correct) {
        element.classList.add('correct')
        // if this is incorrect we want to add wrong class
    } else {
        element.classList.add('wrong')
    }
}

// same as setStatusClass function but instead of adding classes we are removing them
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// list of questions initialized to an array
const questions = [
    {
        // first object of array = first question; 'question:' is going to have the actual question itself (which is going to be the text of the question) and an array of answers with an object with a text keyword and correct keyword set to  either true or false
        question: 'Inside the HTML document, where do you place your JavaScript code?',
        answers: [
            { text: 'Inside the <link> element', correct: false },
            { text: 'Inside the <footer> element', correct: false },
            { text: 'Inside the <script> element', correct: true },
            { text: 'Inside the <head> element', correct: false }
        ]
    },
    {
        question: 'What operator is used to assign a value to a declared variable?',
        answers: [
            { text: 'Equal sign (=)', correct: true },
            { text: 'Colon (:)', correct: false },
            { text: 'Question mark (?)', correct: false },
            { text: 'Double-equal (==)', correct: false }
        ]
    },
    {
        question: 'How do we declare a conditional statement in JavaScript?',
        answers: [
            { text: 'for loop', correct: false },
            { text: 'while loop', correct: false },
            { text: 'if...else', correct: true },
            { text: 'difference...between', correct: false },
        ]
    },
    {
        question: 'Which statement below is NOT true about functions in JavaScript?',
        answers: [
            { text: 'A function must always be assigned an identifier', correct: true },
            { text: 'Functions are able to be recursive.', correct: false },
            { text: 'Functions can be reused throughout your code', correct: false },
            { text: 'Functions can receive arguments that can alter the output of a function', correct: false },
        ]
    },
    {
        question: "From the given array which index is the letter 'b' on? ['a', 'b', 'c', 'd']?",
        answers: [
            { text: '0', correct: false },
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '1', correct: true },
        ]
    },
]















