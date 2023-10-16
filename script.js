const rulesButton = document.querySelectorAll(".rule_btn");
const nextButton = document.getElementById("next-btn");
const playAgainBtn = document.querySelector("#play-again");
const replayBtn = document.querySelector("#replay");
const close = document.getElementById("cut");

const rulesModal = document.getElementById("rule_box");

const wonGame = document.querySelector(".won-game");

const playBoard = document.getElementById("play-board");

const resultBoard = document.getElementById("result-board");
const userResult = document.querySelector(".user-result");
const pcResult = document.querySelector(".pc-result");
let resultText = document.getElementById("result-text-1");
let resultText2 = document.getElementById("result-text-2");
let picked = document.querySelectorAll(".picked");

const computerScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");

let score = {
  user: 0,
  computer: 0,
};

if (localStorage.getItem("score")) {
  score = JSON.parse(localStorage.getItem("score"));
}

userScore.innerHTML = score.user;
computerScore.innerHTML = score.computer;

const result = {
  WIN: "YOU WIN",
  LOST: "YOU LOST",
  TIEUP: "TIE UP",
};

rulesButton.forEach((element) => {
  element.addEventListener("click", () => {
    rulesModal.style.display = "block";
  });
});

close.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

nextButton.addEventListener("click", () => {
  playBoard.style.display = "none";
  resultBoard.style.display = "none";
  wonGame.style.display = "flex";
});

playAgainBtn.addEventListener("click", playAgain);

replayBtn.addEventListener("click", playAgain);

function playAgain() {
  playBoard.style.display = "grid";
  resultBoard.style.display = "none";
  wonGame.style.display = "none";
  nextButton.style.display = "none";
}

const computer = ["rock", "paper", "scissor"];

function computerPicked() {
  let picked = Math.floor(Math.random() * 3);
  return computer[picked];
}

function setImg(picked) {
  let img = `<img src="./image/${picked}.png" alt=${picked} width="60px"/>`;
  return img;
}

function setStyles() {
  resultBoard.style.marginTop = "3rem";

  picked.forEach((element) => {
    element.style.top = "300px";
  });

  for (let index = 0; index < 3; index++) {
    userResult.classList.remove("rock-div");
    userResult.classList.remove("paper-div");
    userResult.classList.remove("scissor-div");
    pcResult.classList.remove("rock-div");
    pcResult.classList.remove("paper-div");
    pcResult.classList.remove("scissor-div");

    playAgainBtn.style.display = "block";
    resultText2.style.display = "block";
    replayBtn.style.display = "none";
    nextButton.style.display = "none";
  }
}

const start = (userPicked) => {
  let pcPicked = computerPicked();

  setStyles();

  let res;

  if (userPicked === pcPicked) {
    res = result.TIEUP;

    removeFocus();

    playAgainBtn.style.display = "none";
    replayBtn.style.display = "block";
    resultText2.style.display = "none";

    picked.forEach((element) => {
      element.style.top = "256px";
    });

    resultBoard.style.marginTop = "6rem";
  } else if (
    (userPicked === "rock" && pcPicked === "scissors") ||
    (userPicked === "paper" && pcPicked === "rock") ||
    (userPicked === "scissors" && pcPicked === "paper")
  ) {
    res = result.WIN;

    nextButton.style.display = "block";

    focusOnUserWinner();

    score.user++;
  } else {
    res = result.LOST;

    focusOnPCWinner();

    score.computer++;
  }
  playBoard.style.display = "none";
  resultBoard.style.display = "flex";

  userResult.classList.add(`${userPicked}-div`);
  pcResult.classList.add(`${pcPicked}-div`);
  userResult.innerHTML = setImg(userPicked);
  pcResult.innerHTML = setImg(pcPicked);
  resultText.innerHTML = res;

  userScore.innerHTML = score.user;
  computerScore.innerHTML = score.computer;

  localStorage.setItem("score", JSON.stringify(score));
};

let winUserBox1 = document.querySelector(".user-box-1");
let winUserBox2 = document.querySelector(".user-box-2");
let winUserBox3 = document.querySelector(".user-box-3");
let winPcBox1 = document.querySelector(".pc-box-1");
let winPcBox2 = document.querySelector(".pc-box-2");
let winPcBox3 = document.querySelector(".pc-box-3");

let focusOnUserWinner = () => {
  winPcBox1.classList.remove("winner-box-1");
  winPcBox2.classList.remove("winner-box-2");
  winPcBox3.classList.remove("winner-box-3");

  winUserBox1.classList.add("winner-box-1");
  winUserBox2.classList.add("winner-box-2");
  winUserBox3.classList.add("winner-box-3");
};
let focusOnPCWinner = () => {
  winUserBox1.classList.remove("winner-box-1");
  winUserBox2.classList.remove("winner-box-2");
  winUserBox3.classList.remove("winner-box-3");

  winPcBox1.classList.add("winner-box-1");
  winPcBox2.classList.add("winner-box-2");
  winPcBox3.classList.add("winner-box-3");
};

let removeFocus = () => {
  winUserBox1.classList.remove("winner-box-1");
  winUserBox2.classList.remove("winner-box-2");
  winUserBox3.classList.remove("winner-box-3");

  winPcBox1.classList.remove("winner-box-1");
  winPcBox2.classList.remove("winner-box-2");
  winPcBox3.classList.remove("winner-box-3");
};
