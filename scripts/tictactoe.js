var gameBoard = new Array("", "", "", "", "", "", "", "", "");
var visualGameboard = document.querySelectorAll(".board-piece");
/*
("0","1","2",
"3","4","5",
"6","7","8")
*/

function Player(name, marker, win = false) {
  this.name = name;
  this.marker = marker;
  this.win = win;
  this.turn = false;

  this.move = function (place) {
    if (
      place >= 0 &&
      place < 10 &&
      !visualGameboard[place].classList.contains("occupied")
    ) {
      console.log(visualGameboard[place]);
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

function game() {
  var gameWin = false;
  var currentRound = 0;
  const playerOne = new Player("Player 1", "O");
  const playerTwo = new Player("Player 2", "X");
  console.log(playerOne, playerTwo);
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
        console.log(
          `Win found at positions ${pOne + 1},${pTwo + 1},${pThree + 1}`
        );
        gameWin = true;
        playerOne.win = true;
        console.log(`${playerOne.name} wins!`);
      } else if (
        visualGameboard[pOne].textContent === playerTwo.marker &&
        visualGameboard[pTwo].textContent === playerTwo.marker &&
        visualGameboard[pThree].textContent === playerTwo.marker
      ) {
        console.log(
          `Win found at positions ${pOne + 1},${pTwo + 1},${pThree + 1}`
        );
        gameWin = true;
        playerTwo.win = true;
        console.log(`${playerTwo.name} wins!`);
      }
    });
    if (currentRound > 8) {
      gameWin = true;
      console.log("It's a tie!");
    }
    return gameWin;
  };
  const gameStart = () => {
    if (currentRound == 0) {
      playerOne.turn = true;
    }
    visualMove();
    if (gameWin == true) {
      visualMove(); // disable movement
    }
  };
  resetGame();
  gameStart();
}
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  visualGameboard.forEach((node) => {
    node.textContent = "";
    node.classList.remove("occupied");
  });
  console.log(visualGameboard);
  console.log(gameBoard);
}
