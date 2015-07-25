function AIPlayer (board, piece) {
  this.piece = piece;
  this.board = board;
}

// "0 0"

AIPlayer.prototype.returnParsedMove = function () {
  var move = this.chooseMove();
  return move[0].toString + " " + move[1].toString;
}

AIPlayer.prototype.enemyPiece = function () {
  this.piece === "X" ? "O" : "X";
}

AIPlayer.prototype.triplesArray = function () {
  triplesArray = [];
  var upDiag = [];
  var downDiag = [];

  for (var i = 0; i < 3; i++) {
    var rowArr = [];
    var colArr = [];

    for (var j = 0; j < 3; j++) {
      rowArr.push([i, j]);
      colArr.push([i, j]);
    }

    upDiag.push(this.grid[i][2 - i]);
    downDiag.push(this.grid[i][i]);

    triplesArray.push(rowArr);
    triplesArray.push(colArr);
  }

  triplesArray.push(upDiag);
  triplesArray.push(downDiag);

  return triplesArray;
}

AIPlayer.prototype.chooseMove = function () {
  winningMove = getWinningMove();
  notLosingMove = getNotLosingMove();
  return winningMove ||
          notLosingMove ||
          [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
}

Board.prototype.getWinningMove = function () {
  var winningMove = null;
  for (var i = 0; i < this.triplesArray.length; i++) {
    var potentialMove = this.hasTwoOfThree(this.triplesArray[i], this.piece);
    if (potentialMove) {
      winningMove = potentialMove;
    }
  }

  return winningMove;
}

Board.prototype.getNotLosingMove = function () {
  var notLosingMove = null;
  for (var i = 0; i < this.triplesArray.length; i++) {
    var potentialMove = this.hasTwoOfThree(this.triplesArray[i], this.enemyPiece());
    if (potentialMove) {
      notLosingMove = potentialMove;
    }
  }

  return notLosingMove;
}

Board.prototype.hasTwoOfThree = function(positions, piece) {
  var num_pieces = 0;
  var empty = null;
  for (var i = 0; i < 3; i++) {
    var value = this.board.grid[positions[i][0]][positions[i][1]];
    if (value === piece) {
      num_pieces ++;
    } else if (value) {
      return false;
    } else {
      empty = positions[i];
    }
  }
  return num_pieces > 1 ? positions[i] : false;
}
