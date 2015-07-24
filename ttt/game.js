var Board = require("./board");

function Game(reader) {
  this.reader = reader;
  this.board = new Board();
  this.turn = "X";
}

Game.prototype.run = function () {
  this.board.render();
  reader.question(
    "Enter your desired move: ",
    function (answer) {
      this.move(answer);
      if (!this.board.over()) {
        this.run();
      } else {
        this.recordVictory();
        this.reader.close();
      }
    }.bind(this)
  );
}

Game.prototype.recordVictory = function () {
  this.board.render();
  if (this.board.winner) {
    console.log(this.board.winner + " wins the game!");
  } else {
    console.log("Cats game!");
  }
}

Game.prototype.move = function (answer) {
  var coordinates = answer.split(" ");
  var row = parseInt(coordinates[0]);
  var col = parseInt(coordinates[1]);
  if (this.board.makeMove(row, col, this.turn)) {
    this.turn = this.turn === "X" ? "O" : "X";
  }
}

module.exports = Game;
