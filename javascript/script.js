"use strict!";
const bttnNew = document.getElementById("newGameBttn");
const bttnRoll = document.getElementById("rollDiceBttn");
const bttnHold = document.getElementById("holdBttn");

const diceHolder = document.getElementById("diceHolder");

const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const dice3 = document.getElementById("dice3");
const dice4 = document.getElementById("dice4");
const dice5 = document.getElementById("dice5");
const dice6 = document.getElementById("dice6");

const playerOne = document.querySelector(".left-side");
const playerTwo = document.querySelector(".right-side");

const diceAllValues = [dice1, dice2, dice3, dice4, dice5, dice6];

let player1CurrPoints = document.getElementById("player1CurrPoints");
let player1CurrScore = 0;
let player2CurrPoints = document.getElementById("player2CurrPoints");
let player2CurrScore = 0;

let totalScorePl1 = 0;
let totalScorePl2 = 0;

let player = 1;

function invertSelected() {
  if (playerOne.classList.contains("non-selected")) console.log("contains");
}

function resetEverything() {
  //piket totale ne js
  totalScorePl1 = 0;
  totalScorePl2 = 0;
  //piket current qe shfaqen dhe ne js
  player1CurrPoints.textContent = 0;
  player1CurrScore = 0;
  player2CurrPoints.textContent = 0;
  player2CurrScore = 0;
  //piket totale qe shfaqen
  document.getElementById("score1Pl").innerHTML = 0;
  document.getElementById("score2Pl").innerHTML = 0;
  playerOne.classList.remove("non-selected");
  player = 1;
}

const wonMssg = document.querySelector(".won-mssg");

bttnRoll.addEventListener("click", function () {
  const dicedValue = Math.trunc(Math.random() * 6) + 1;
  console.log(dicedValue);
  diceHolder.classList.remove("diceHidder");
  if (dicedValue != 1) {
    // let dicedValueShower = document.getElementById("dice" + dicedValue);
    // dicedValueShower.classList.remove("hidden");
    for (let i = 0; i < diceAllValues.length; i++) {
      if (diceAllValues[i] === document.getElementById(`dice${dicedValue}`)) {
        diceAllValues[i].classList.remove("hidden");
      } else {
        diceAllValues[i].classList.add("hidden");
      }
    }

    switch (player) {
      case 1:
        player1CurrScore += dicedValue;
        player1CurrPoints.innerHTML = `${player1CurrScore}`;
        playerOne.classList.remove("non-selected");
        playerTwo.classList.add("non-selected");
        break;
      case 2:
        player2CurrScore += dicedValue;
        player2CurrPoints.innerHTML = `${player2CurrScore}`;
        playerOne.classList.add("non-selected");
        playerTwo.classList.remove("non-selected");
        break;
    }
  } else {
    for (let i = 0; i < diceAllValues.length; i++) {
      if (diceAllValues[i] === document.getElementById(`dice${dicedValue}`)) {
        diceAllValues[i].classList.remove("hidden");
      } else {
        diceAllValues[i].classList.add("hidden");
      }
    }
    switch (player) {
      case 1:
        player1CurrScore = 0;
        player1CurrPoints.innerHTML = `${player1CurrScore}`;
        playerOne.classList.add("non-selected");
        playerTwo.classList.remove("non-selected");
        player = 2;
        break;
      case 2:
        player2CurrScore = 0;
        player2CurrPoints.innerHTML = `${player2CurrScore}`;
        playerOne.classList.remove("non-selected");
        playerTwo.classList.add("non-selected");
        player = 1;
        break;
    }
  }
});

bttnHold.addEventListener("click", function () {
  switch (player) {
    case 1:
      if (player1CurrScore > 0) {
        totalScorePl1 += player1CurrScore;
        document.getElementById("score1Pl").innerHTML = `${totalScorePl1}`;
        player1CurrScore = 0;
        player1CurrPoints.innerHTML = 0;
        if (totalScorePl1 >= 100) {
          wonMssg.textContent = `🎉 Player 1 has won!`;
          resetEverything();
          document
            .querySelector(".main-content")
            .classList.add("have-a-winner");
        } else {
          playerOne.classList.add("non-selected");
          playerTwo.classList.remove("non-selected");
          player = 2;
        }
      }
      break;
    case 2:
      if (player2CurrScore > 0) {
        totalScorePl2 += player2CurrScore;
        document.getElementById("score2Pl").innerHTML = `${totalScorePl2}`;
        player2CurrScore = 0;
        player2CurrPoints.innerHTML = 0;
        if (totalScorePl2 >= 100) {
          wonMssg.textContent = `🎉 Player 2 has won!`;
          document
            .querySelector(".main-content")
            .classList.add("have-a-winner");
          resetEverything();
        } else {
          playerOne.classList.remove("non-selected");
          playerTwo.classList.add("non-selected");
          player = 1;
        }
      }
      break;
  }
});

bttnNew.addEventListener("click", resetEverything, function () {
  document.querySelector(".main-content").classList.remove("have-a-winner");
});
