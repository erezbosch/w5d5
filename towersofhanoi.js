function HanoiGame() {
  this.stacks = [[1, 2, 3], [], []];
}

HanoiGame.prototype.isWon = function () {
  return this.stacks[0].length === 0 &&
         (this.stacks[1].length === 0 || this.stacks[2].length === 0);
}

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  return this.stacks[endTowerIdx].length === 0 ||
         this.stacks[startTowerIdx][0] < this.stacks[endTowerIdx][0];
}

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove) {
    this.stacks[endTowerIdx].unshift(this.stacks[startTowerIdx].shift());
    return true;
  } else {
    return false;
  }
}

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.stacks));
}

HanoiGame.prototype.promptMove = function (callback) {
  this.print();
  reader.question(
    "Please enter your the columns you would like to take from and move to:",
    callback
  );
}

HanoiGame.prototype.run = function (completionCallback) {
  this.promptMove(
    function(answer){
      var indices = answer.split(" ");
      var startIdx = parseInt(indices[0]);
      var endIdx   = parseInt(indices[1]);
      this.move(startIdx, endIdx);
      if (this.isWon()) {
        console.log("You win.")
        completionCallback();
      } else {
        this.run(completionCallback);
      }
    }.bind(this)
  );
}

var readline = require("readline");
reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

hg = new HanoiGame();
hg.run( function() { reader.close(); });
