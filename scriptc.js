const questions = [
    {
        question: "What is the primary mission of NavGurukul Foundation ?",
        answers: [
            { text: " To provide free medical care ", correct: false },
            { text: "To offer software engineering education to underprivileged youth ", correct: true },
            { text: "To promote environmental conservation ", correct: false },
            { text: "To support agricultural development ", correct: false },
        ]
    },
    {
        question: "Which of the following is a key feature of NavGurukul's program ?",
        answers: [
            { text: "Long-term residential courses ", correct: true },
            { text: "Online classes only ", correct: false },
            { text: "Training in traditional crafts ", correct: false },
            { text: "Focus on sports education ", correct: false },
        ]
    },
    {
        question: " Who can apply for NavGurukul's programs?",
        answers: [
            { text: "Only high school graduates  ", correct: false },
            { text: "Underprivileged youth from any background ", correct: true },
            { text: "Only students with a college degree ", correct: false },
            { text: "Anyone above 40 years old", correct: false },
        ]
    },
    {
        question: " In which of the following areas does NavGurukul mainly train its students?",
        answers: [
            { text: "Agriculture ", correct: false },
            { text: "Software Development ", correct: true },
            { text: "Fine Arts", correct: false },
            { text: "Finance", correct: false },
        ]
    },
    {
        question: "Which of the following best describes the learning environment at NavGurukul?",
        answers: [
            { text: "Strict classroom-based teaching", correct: false },
            { text: "Peer-to-peer learning with a focus on self-learning", correct: true },
            { text: "Distance learning with minimal interaction", correct: false },
            { text: "Traditional lecture-based education", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const Ans_btn = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}


function showQuestion() {
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach( answer  => {
        const button = document.createElement("button");
        button.innerHTML = answer.text; 
        button.classList.add("btn");
        Ans_btn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}
function resetstate(){
    nextButton.style.display ="none";
    while(Ans_btn.firstChild){
        Ans_btn.removeChild(Ans_btn.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        score++;
        selectedBtn.classList.add("correct");
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(Ans_btn.children).forEach(button => {
        if(button.dataset.correct  === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true"
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetstate();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length} !!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display ="block" ;

}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore(); 
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
} )
startQuiz();
