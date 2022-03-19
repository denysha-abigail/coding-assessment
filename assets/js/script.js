// select the button element that holds the start-btn id
const startButton = document.getElementById('start-btn')
// select the div element that holds the question-container id
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')

// shuffledQuestions so questions don't always show up in the same exact order and is completely random; currentQuestionIndex so we know which questions inside of the shuffled questions away we're on; will both default to a value of undefined
let shuffledQuestions, currentQuestionIndex

// add click event listener for when start button is clicked to cue code that is inside of startGame function
startButton.addEventListener('click', startGame)


// function to start game when start button is clicked
function startGame () {
    console.log('started');
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
function setNextQuestion () {
    // create function to get and show question and take our current question (which is our shuffled questions) at the current question index 
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// function to take a question object from the questions array
function showQuestion (question) {
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
        button.addEventListener ('click', selectAnswer)
        // append button to answer button element
        answerButtonElement.appendChild(button)
    })
}

// function when correct answer is selected; will take button addEventListener click event as a parameter
function selectAnswer () {

}

// list of questions initialized to an array
const questions = [
    {
        // first object of array = first question; 'question:' is going to have the actual question itself (which is going to be the text of the question) and an array of answers with an object with a text keyword and correct keyword set to  either true or false
        question:'What is 2 + 2?',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    }
]















// var time = 60;
// var qAIndex = 0;

// var qA = [
//     {
//         question: 'Is the sky blue?',
//         answer: ["A", "B", "C", "D"],
//         correct: "C"
//     },
//     {
//         question: 'Is the sky blue?',
//         answer: ["A", "B", "C", "D"],
//         correct: "C"
//     },
//     {
//         question: 'Is the sky blue?',
//         answer: ["A", "B", "C", "D"],
//         correct: "C"
//     },
//     {
//         question: 'Is the sky blue?',
//         answer: ["A", "B", "C", "D"],
//         correct: "C"
//     }
// ];

// function showQ() {
//     if (qAIndex < qA.length) {
//         let obj = qA[qAIndex];
//         document.querySelector('.container').innerHTML = `
//         <div>
//             <h2>${obj.question}</h2>
//         </div>
//         `
//     }
// }

// showQ();

// var intervalId = setInterval(startQuiz, 1000);

// function startQuiz() {
//     time--;
//     document.querySelector("#time").innerText = time;
//     if (time < 1) {
//         clearInterval(intervalId)
//     }
// }