var gameBoard = new Array("", "", "", "", "", "", "", "", "");
/*
("0","1","2",
"3","4","5",
"6","7","8")
*/

// temp 
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


//

function Player(name, marker, win = false) {
  this.name = name;
  this.marker = marker;
  this.win = win;

  this.move = function () {
//temp
    // var place;

    // rl.question('Where do you want to move?', (answer) => {
    //     console.log(`You entered: ${answer}`);
    //     place = answer;
    //     rl.close();
    // });

    var place = prompt("Where on the board do you want to move?");
    // catch statement to ensure they enter a number that is valid

    if (place > 0 && place < 10) {
      gameBoard[place - 1] = this.marker;
      console.log(gameBoard);
    } else {
      this.move();
    }
  };
}

console.log(gameBoard);

function game() {
  var gameWin = false;
  var currentRound = 0;
  const playerOne = new Player("Player 1", "O");
  const playerTwo = new Player("Player 2", "X");

  const gameStart = () => {
    while (gameWin == false) {
      playerOne.move();
      round();
      checkWin();
      playerTwo.move();
      round();
      checkWin();
  };
  const round = () => {
    currentRound++;
    return currentRound;
  };
  const checkWin = () => {
    if (
      (gameBoard[0] === gameBoard[1] && gameBoard[2]) ||
      (gameBoard[3] === gameBoard[4] && gameBoard[5]) ||
      (gameBoard[6] === gameBoard[7] && gameBoard[8]) ||
      (gameBoard[0] === gameBoard[3] && gameBoard[6]) ||
      (gameBoard[1] === gameBoard[4] && gameBoard[7]) ||
      (gameBoard[2] === gameBoard[5] && gameBoard[8]) ||
      (gameBoard[0] === gameBoard[4] && gameBoard[8]) ||
      (gameBoard[2] === gameBoard[4] && gameBoard[6])
    ) {
      gameWin = true;
      gameWon();
    }
  };

  const gameWon = () => {
    if (gameWin == true) {
      this.playerOne.win = true;
      return "Someone wins!";
    } else if (currentRound > 9) {
      gameWin = true;
      return "It's a tie!";
    }
  };

  gameStart();
}
}

game();
