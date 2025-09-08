const quizData = {
  coding: [
    {
      question: "What does HTML stand for?",
      answer: "HyperText Markup Language",
      options: [
        "HighText Machine Language",
        "HyperText Markup Language",
        "Hyperlink Text Mark Language",
        "None of these",
      ],
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      answer: "//",
      options: ["//", "#", "/* */", "<!-- -->"],
    },
    {
      question: "What is the extension of JavaScript files?",
      answer: ".js",
      options: [".java", ".js", ".script", ".jsx"],
    },
    {
      question: {
        text: "Identify this programming language logo:",
        imgUrl: "images/python.png",
      },
      answer: "Python",
      options: ["Java", "C++", "Python", "JavaScript"],
    },
  ],

  gk: [
    {
      question: "What is the national currency of Japan?",
      answer: "Yen",
      options: ["Won", "Yuan", "Yen", "Dollar"],
    },
    {
      question: "Which country hosted the 2016 Summer Olympics?",
      answer: "Brazil",
      options: ["China", "Brazil", "Russia", "Japan"],
    },
    {
      question: "Who is known as the Father of the Nation in India?",
      answer: "Mahatma Gandhi",
      options: ["Nehru", "Subhash Bose", "Mahatma Gandhi", "Bhagat Singh"],
    },
    {
      question: {
        text: "Identify the flag:",
        imgUrl: "images/indiaFlag.png",
      },
      answer: "India",
      options: ["India", "Nepal", "Pakistan", "Bangladesh"],
    },
  ],

  sports: [
    {
      question: "How many players are there in a basketball team?",
      answer: "5",
      options: ["6", "5", "7", "11"],
    },
    {
      question: "Who is called the 'God of Cricket'?",
      answer: "Sachin Tendulkar",
      options: ["Virat Kohli", "Ricky Ponting", "Sachin Tendulkar", "MS Dhoni"],
    },
    {
      question: "Which country has won the most FIFA World Cups?",
      answer: "Brazil",
      options: ["Brazil", "Germany", "Italy", "Argentina"],
    },
    {
      question: {
        text: "Whose jersey number is shown?",
        imgUrl: "images/MsDhoni.jpg",
      },
      answer: "MS Dhoni",
      options: ["Virat Kohli", "MS Dhoni", "Sachin Tendulkar", "Rohit Sharma"],
    },
  ],

  science: [
    {
      question: "What is the chemical symbol of gold?",
      answer: "Au",
      options: ["Ag", "Au", "Pb", "Pt"],
    },
    {
      question: "What is the hardest natural substance on Earth?",
      answer: "Diamond",
      options: ["Iron", "Diamond", "Graphite", "Quartz"],
    },
    {
      question: "Which gas is used by plants in photosynthesis?",
      answer: "Carbon Dioxide",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    },
    {
      question: {
        text: "Which planet is called the Red Planet?",
        imgUrl: "images/Mars.jpg",
      },
      answer: "Mars",
      options: ["Jupiter", "Venus", "Mars", "Saturn"],
    },
  ],
};

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
const category = document.querySelector("#category");

const coding = document.createElement("p");
const sports = document.createElement("p");
const Gk = document.createElement("p");

let interval;
let countdown = 5;
let score = 0; //intialize score to 0
let CorrectAns = "";
let index = 0;
let quesArr = [];
let newArr = [];

// startQuizBtn.addEventListener("click", initialize);
startQuizBtn.addEventListener("click", showCategory);

resetBtn.addEventListener("click", runAgain);

function showCategory() {
  startQuizBtn.classList.add("hidden");
  category.classList.remove("hidden");
  console.log("Categories");

  category.appendChild(coding);
  coding.innerText = "Coding";

  category.appendChild(sports);
  sports.innerText = "Sports";

  category.appendChild(Gk);
  Gk.innerText = "GK";
}
// coding.addEventListener("click",  initialize());
// sports.addEventListener("click", initialize());
// Gk.addEventListener("click", initialize());
coding.addEventListener("click", () => initialize("coding"));
sports.addEventListener("click", () => initialize("sports"));
Gk.addEventListener("click", () => initialize("gk"));
// function showCategory() {
//   startQuizBtn.classList.add("hidden");
//   category.classList.remove("hidden");

//   const categories = ["Coding", "Sports", "GK"];

//   for (let i = 0; i < categories.length; i++) {
//     const div = document.createElement("div");
//     div.innerText = categories[i];
//     category.appendChild(div);
//   }

// }

// function initialize() {
//   category.classList.add("hidden");
//   startQuizBtn.classList.add("hidden");
//   quizDiv.classList.remove("hidden");
//   generateRandomOrder(); // generate fresh random order of questions
//   startQuiz(); //populate first question
// }
function initialize(categoryName) {
  category.classList.add("hidden");
  startQuizBtn.classList.add("hidden");
  quizDiv.classList.remove("hidden");

  // choose dataset based on category
  data = quizData[categoryName];

  generateRandomOrder();
  startQuiz();
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
  console.log(countdownPara.innerText);

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
      console.log(countdownPara.innerText);
      countdown--;
      printQuestionAndOptions();
    }
  } else {
    countdownPara.innerText = countdown;
    console.log(countdownPara.innerText);
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
