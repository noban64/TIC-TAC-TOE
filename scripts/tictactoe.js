"use strict"
var visualGameboard = document.querySelectorAll(".board-piece");
var gameMessage = document.querySelector("#game-message");
var playerOneScore = document.querySelector("#playerone-score");
var playerTwoScore = document.querySelector("#playertwo-score");
gameMessage.textContent = "Press 'Start' to start!";
const firstPlayer = new Player("Player 1", "O");
const secondPlayer = new Player("Player 2", "X");

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.turn = false;
  this.win = false;
  this.score = 0;

  this.move = function (place) {
    if (
      place >= 0 &&
      place < 10 &&
      !visualGameboard[place].classList.contains("occupied")
    ) {
      visualGameboard[place].textContent = this.marker;
      visualGameboard[place].classList.add("occupied");
      this.turn = false;
      return true;
    } else if (place === null) {
      console.log("Player cancelled the interaction!");
      return true;
    } else {
      visualGameboard[place].classList.add("occupied");
      console.log("You can't make this move!");
    }
  };
}

function game(playerOne = firstPlayer, playerTwo = secondPlayer) {
  // Game pre-requisites

  var gameWin = false;
  var currentRound = 0;

  console.log(playerOne.score, playerTwo.score);
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const boardUpdate = () => {
    if (playerOne.turn == true) {
      gameMessage.textContent = `${playerOne.name}, It's your turn!`;
    } else {
      gameMessage.textContent = `${playerTwo.name}, It's your turn!`;
    }
    playerOneScore.textContent = `Player One: ${playerOne.score}`;
    playerTwoScore.textContent = `Player Two: ${playerTwo.score}`;
    if (playerOne.win == true) {
      gameMessage.textContent = `${playerOne.name} wins!`;
    } else if (playerTwo.win == true) {
      gameMessage.textContent = `${playerTwo.name} wins!`;
    }
    else if (gameWin && !playerOne.win &&!playerTwo.win){
      gameMessage.textContent = "It's a draw!";

    }
  };
  const visualMove = () => {
    visualGameboard.forEach((node) => {
      node.addEventListener("click", () => {
        if (gameWin == true) {
          this.abort;
        } else if (node.classList.contains("occupied")) {
          console.log("This space is occupied");
        } else {
          console.log(node.getAttribute("value"));
          if (playerOne.turn == true) {
            playerOne.move(node.getAttribute("value"));
            playerTwo.turn = true;
          } else if (playerTwo.turn == true) {
            playerTwo.move(node.getAttribute("value"));
            playerOne.turn = true;
          }
          round();
          checkWin();
        }
      }); // event listener
    });
  };

  const round = () => {
    currentRound++;
    console.log(`Round:${currentRound}`);
  };
  const checkWin = () => {
    winConditions.forEach((boardPieces) => {
      const [pOne, pTwo, pThree] = boardPieces;
      if (
        visualGameboard[pOne].textContent === playerOne.marker &&
        visualGameboard[pTwo].textContent === playerOne.marker &&
        visualGameboard[pThree].textContent === playerOne.marker
      ) {
        playerOne.win = true;
        playerOne.score += 1;
        gameWin = true;
      } else if (
        visualGameboard[pOne].textContent === playerTwo.marker &&
        visualGameboard[pTwo].textContent === playerTwo.marker &&
        visualGameboard[pThree].textContent === playerTwo.marker
      ) {
        playerTwo.win = true;
        playerTwo.score += 1;
        gameWin = true;
      }
    });
    if (currentRound >= 9 && !gameWin) {
      gameWin = true;
      gameMessage.textContent = "It's a tie!";
    }
    boardUpdate();
    return gameWin;
  };
  const gameStart = () => {
    if (currentRound == 0) {
      if (Math.random() == 1) {
        playerOne.turn = true;
      } else {
        playerTwo.turn = true;
      }
      boardUpdate();
    }
    visualMove();

    if (gameWin == true) {
      visualMove(); // disable movement
    }
  };
  resetGame(currentRound);
  gameStart();
}
function resetGame(round = 0) {
  visualGameboard.forEach((node) => {
    node.textContent = "";
    node.classList.remove("occupied");
  });
  firstPlayer.win = false;
  secondPlayer.win = false;

  console.log("Game reset!");
  return round = 0 
}
