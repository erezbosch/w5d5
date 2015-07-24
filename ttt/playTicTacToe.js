
var TTT = require('./index');

var readline = require("readline");
reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

game = new TTT.Game(reader);
game.run();
