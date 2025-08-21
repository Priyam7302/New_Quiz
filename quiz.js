const data = [
  {
    question: "What is 2+2?",
    answer: "4",
    options: [1, 2, 3, 4],
  },
  {
    question: "What is the capital of South Africa?",
    answer: "Cape Town",
    options: ["Cape Town", "Durban", "Jo'berg", "Pretoria"],
  },
  {
    question: "Where is Taj Mahal located?",
    answer: "Agra",
    options: ["Patna", "Lucknow", "Agra", "Jaipur"],
  },
  {
    question: {
      text: "Who discovered gravity?",
      imgUrl: "test1.jpg",
    },
    answer: "Isaac Newton",
    options: ["Bill Gates", "CV Raman", "Sundar Pichai", "Isaac Newton"],
  },
];

const startQuizBtn = document.querySelector("#startQuiz");
const quizDiv = document.querySelector("#quiz");
const questionPara = document.querySelector(".question");
const textPara = document.querySelector(".text");
const img = document.querySelector(".imgUrl");
const optionsPara = document.querySelectorAll(".option");
const countdownPara = document.querySelector(".countdown");
const scoreDiv = document.querySelector("#score"); //selecting score div
const scorePara = document.querySelector("#scorePara"); //selecting score para
const spanOfPara = document.querySelector("span"); //selecting score span
// const answerPara = document.querySelector(".answer"); ///selecting answer para
const resetBtn = document.querySelector("#resetBtn"); //selecting resetBtn

let interval;
let countdown = 5;
let score = 0; //intialize score to 0
let CorrectAns = "";
let index = 0;
let quesArr = [];
let newArr = [];

startQuizBtn.addEventListener("click", initialize);
resetBtn.addEventListener("click", runAgain);

function initialize() {
  startQuizBtn.classList.add("hidden");
  quizDiv.classList.remove("hidden");
  generateRandomOrder(); // generate fresh random order of questions
  startQuiz(); //populate first question
}

function getRandomNumber() {
  let randomNum = Math.floor(Math.random() * data.length);
  if (quesArr.length >= data.length) {
    return; // stop once all questions covered
  }
  if (quesArr.includes(randomNum)) {
    return getRandomNumber(); // try again
  } else {
    quesArr.push(randomNum);
    return randomNum;
  }
}

function generateRandomOrder() {
  quesArr = [];
  newArr = [];
  for (let i = 0; i < data.length; i++) {
    let quesNum = getRandomNumber();
    newArr.push(quesNum);
  }
}

function startQuiz() {
  printQuestionAndOptions(); //print first question instantly
  countdownPara.innerText = countdown;
  countdown--;

  //Start the interval which will change the question periodically
  interval = setInterval(runTheQuiz, 1000);
}

function runTheQuiz() {
  if (countdown <= 0) {
    ++index;

    console.log("newArr[index]", newArr[index]);
    if (index >= newArr.length) {
      clearInterval(interval);
      quizDiv.classList.add("hidden");
      scoreDiv.classList.remove("hidden"); //removing hidden class to show score div
      showScore(); //adding fn to show final score
      ShowResetBtn(); //showing reset btn
    } else {
      //RESET THE OPTIONS
      deselectOption();

      //5 SECONDS UP, CHANGE THE QUESTION
      countdown = 5;
      countdownPara.innerText = countdown;
      countdown--;
      printQuestionAndOptions();
    }
  } else {
    countdownPara.innerText = countdown;
    countdown--;
  }
}

function printQuestionAndOptions() {
  let q = data[newArr[index]].question;

  if (typeof q === "string") {
    // Hide image/text
    textPara.innerText = "";
    img.src = "";
    questionPara.innerText = q;
  } else {
    // Show text + image
    textPara.innerText = q.text;
    img.src = q.imgUrl;
    questionPara.innerText = ""; // clear old text
  }

  // print options
  for (let i = 0; i < optionsPara.length; i++) {
    optionsPara[i].innerText = data[newArr[index]].options[i];
  }

  storeCorrectAns();
}

for (let i = 0; i < optionsPara.length; i++) {
  optionsPara[i].addEventListener("click", selectOption);
}

function selectOption(event) {
  for (let i = 0; i < optionsPara.length; i++) {
    optionsPara[i].classList.add("disabled");
  }
  event.target.classList.add("selectedOption");

  //checking userans is matching with correct ans
  let userAns = event.target.innerText; //storing userAns
  if (userAns === CorrectAns) {
    //checking userans and correct ans
    score++;
  }

  //for going to nxt qn
  clearInterval(interval);
  ++index;

  if (index >= newArr.length) {
    quizDiv.classList.add("hidden");
    scoreDiv.classList.remove("hidden");
    showScore();
    ShowResetBtn();
  } else {
    deselectOption();
    countdown = 5;
    countdownPara.innerText = countdown;
    interval = setInterval(runTheQuiz, 1000);
    printQuestionAndOptions();
  }
}

function deselectOption() {
  for (let i = 0; i < optionsPara.length; i++) {
    optionsPara[i].classList.remove("disabled");
    optionsPara[i].classList.remove("selectedOption");
  }
}

function storeCorrectAns() {
  CorrectAns = data[newArr[index]].answer;
}

//showing score at the end of the game
function showScore() {
  // console.log(scorePara.innerText);
  // scorePara.innerText = score;
  scorePara.classList.remove("hidden");
  spanOfPara.innerText = score;
}

//showing ResetBtn and start the game again
function ShowResetBtn() {
  resetBtn.classList.remove("hidden");
}

// showing start quiz btn when reset btn is clicked
function runAgain() {
  resetBtn.classList.add("hidden"); // hide reset
  quizDiv.classList.add("hidden"); // hide quiz
  scoreDiv.classList.add("hidden"); // hide score

  // reset all values
  countdown = 5;
  score = 0;
  deselectOption();
  CorrectAns = "";
  scorePara.classList.add("hidden");
  index = 0;
  newArr = [];

  startQuizBtn.classList.remove("hidden"); // show Start Quiz button again
}
