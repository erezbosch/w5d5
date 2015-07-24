function Board () {
  this.grid = new Array(3);
  for (var i = 0; i < 3; i++) {
    this.grid[i] = new Array(3);
  }
  this.winner = undefined;
}

Board.prototype.empty = function (row, col) {
  return !this.grid[row][col];
}

Board.prototype.validMove = function (row, col) {
  var arr = [0, 1, 2];
  return arr.indexOf(row) != -1 &&
           arr.indexOf(col) != -1 &&
           this.empty(row, col);
}

Board.prototype.makeMove = function (row, col, piece) {
  if (this.validMove(row, col)) {
    this.grid[row][col] = piece;
    return true;
  } else {
    return false;
  }
}

Board.prototype.over = function () {
  return this.won("X") || this.won("O") || this.tie();
}

Board.prototype.won = function (piece) {
  return this.checkRowsCols(piece) || this.checkDiags(piece);
}

Board.prototype.tie = function () {
  var flatArr = [].concat.apply([], this.grid);

  for (var i = 0; i < flatArr.length; i++) {
    if (!flatArr[i]) {
      return false;
    }
  }
  return true;
}

Board.prototype.checkRowsCols = function (piece) {
  for (var i = 0; i < 3; i++) {
    var rowArr = [];
    var colArr = [];
    for (var j = 0; j < 3; j++) {
      rowArr.push(this.grid[i][j]);
      colArr.push(this.grid[j][i]);
    }
    if (this.checkTriple(rowArr, piece) || this.checkTriple(colArr, piece)) {
      this.winner = piece;
      return true;
    }
  }
  return false;
}

Board.prototype.checkDiags = function (piece) {
  var upDiag = [];
  var downDiag = [];
  for (var i = 0; i < 3; i++) {
    upDiag.push(this.grid[i][2 - i]);
    downDiag.push(this.grid[i][i]);
  }
  if (this.checkTriple(upDiag, piece) || this.checkTriple(downDiag, piece)) {
    this.winner = piece;
    return true;
  }
  return false;
}

Board.prototype.checkTriple = function(triple, piece) {
  return triple.every(function (pos) { return pos === piece });
}

Board.prototype.render = function () {
  for (var i = 0; i < 3; i++) {
    row_string = "";
    for (var j = 0; j < 3; j++) {
      row_string += this.grid[i][j] ? this.grid[i][j] + " " : "* ";
    }
    console.log(row_string);
  }
}

module.exports = Board;
