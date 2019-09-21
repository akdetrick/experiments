const game = require('./game.js');

// util
const randomChoice = () => [
  'DEFLECT',
  'SILENT',
][Math.floor(Math.random() * 2)];

game(
  'burnBridges',
  'random',
  500
);
