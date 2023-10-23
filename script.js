const rulesButton = document.querySelectorAll(".rule_btn");
const nextButton = document.getElementById("next-btn");
const computerScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");
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

let pc_Win_Box1 = document.querySelector(".p_box_1");
let pc_Win_Box2 = document.querySelector(".p_box_2");
let pc_Win_Box3 = document.querySelector(".p_box_3");

let user_Win_Box1 = document.querySelector(".u_box_1");
let user_Win_Box2 = document.querySelector(".u_box_2");
let user_Win_Box3 = document.querySelector(".u_box_3");

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
let focus_User_Winner = () => {
  pc_Win_Box1.classList.remove("box_1_won");
  pc_Win_Box2.classList.remove("box_2_won");
  pc_Win_Box3.classList.remove("box_3_won");

  user_Win_Box1.classList.add("box_1_won");
  user_Win_Box2.classList.add("box_2_won");
  user_Win_Box3.classList.add("box_3_won");
};

let focus_PC_Winner = () => {
  user_Win_Box1.classList.remove("box_1_won");
  user_Win_Box2.classList.remove("box_2_won");
  user_Win_Box3.classList.remove("box_3_won");

  pc_Win_Box1.classList.add("box_1_won");
  pc_Win_Box2.classList.add("box_2_won");
  pc_Win_Box3.classList.add("box_3_won");
};
const start = (user_Picked) => {
  let pcPicked = computerPicked();

  setStyles();

  let res;

  if (user_Picked === pcPicked) {
    res = result.TIEUP;

    remove_Focus();

    playAgainBtn.style.display = "none";
    replayBtn.style.display = "block";
    resultText2.style.display = "none";

    picked.forEach((element) => {
      element.style.top = "256px";
    });

    resultBoard.style.marginTop = "6rem";
  } else if (
    (user_Picked === "rock" && pcPicked === "scissors") ||
    (user_Picked === "paper" && pcPicked === "rock") ||
    (user_Picked === "scissors" && pcPicked === "paper")
  ) {
    res = result.WIN;

    nextButton.style.display = "block";

    focus_User_Winner();

    score.user++;
  } else {
    res = result.LOST;

    focus_PC_Winner();

    score.computer++;
  }
  playBoard.style.display = "none";
  resultBoard.style.display = "flex";

  userResult.classList.add(`${user_Picked}-div`);
  pcResult.classList.add(`${pcPicked}-div`);
  userResult.innerHTML = setImg(user_Picked);
  pcResult.innerHTML = setImg(pcPicked);
  resultText.innerHTML = res;

  userScore.innerHTML = score.user;
  computerScore.innerHTML = score.computer;

  localStorage.setItem("score", JSON.stringify(score));
};

let remove_Focus = () => {
  user_Win_Box1.classList.remove("box_1_won");
  user_Win_Box2.classList.remove("box_2_won");
  user_Win_Box3.classList.remove("box_3_won");

  pc_Win_Box1.classList.remove("box_1_won");
  pc_Win_Box2.classList.remove("box_2_won");
  pc_Win_Box3.classList.remove("box_3_won");
};
