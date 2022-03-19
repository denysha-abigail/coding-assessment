















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