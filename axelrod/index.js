const game = require('./game.js');

// util
const randomChoice = () => [
  'DEFLECT',
  'SILENT',
][Math.floor(Math.random() * 2)];

// :TODO: it makes more sense to pass players
// instead of strings (closer to pure fn)
game(
  'random',
  'titForTat',
  5000
);
