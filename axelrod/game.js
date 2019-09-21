/* TODO: make an instnace for better checking of result/score objects */
/* TODO: import players in index file; make them classes to expose name */
const players = require('./players.js');

const niceLog = (o) => {
  console.log(JSON.stringify(o, null, 2));
};

/**
 * Gets choice history for given player
 *
 * @param {String} playerName
 * @param {Array} playHistory
 * @returns {Array} history of choices
 */
const getHistory = (playerName, playHistory) => playHistory
  .map((play) => typeof play === 'object' && play[playerName]);

/**
 * Plays a single game
 *
 * @param {Function} a strategy for player a
 * @param {Function} b strategy for player b
 * @param {Array} history - previous game results
 * @returns {Object} game result
 */
const play = (a, b, history) => {
  const startingScores = { a: 0, b: 0 };
  const histories = {
    a: getHistory('a', history),
    b: getHistory('b', history),
  };

  const getPlayerData = (playerName, scores=startingScores) => ({
      playerName,
      round: history.length - 1,
      myChoices: histories[playerName],
      theirChoices: histories[playerName === 'a' ? 'b' : 'a'],
      myScore: scores[playerName],
      theirScore: scores[playerName === 'a' ? 'b' : 'a'],
  });

  let scores = startingScores;
  if (history.length >= 1) {
    scores.a = getTotalScore('a', history.map(calculateScore));
    scores.b = getTotalScore('b', history.map(calculateScore));
  }

  const playerData = {
    a: getPlayerData('a', scores),
    b: getPlayerData('b', scores),
  };

  // invoke player strategy functions with
  // data about the history of the game
  return {
    a: a(getPlayerData('a')),
    b: b(getPlayerData('b')),
  };
};

/**
 * Gets scores for a single play
 *
 * @param {Object} play
 * @returns {Object} score
 */
const calculateScore = (play) => {
  const scoreMap = {
    'DEFLECT': {
      'DEFLECT': -2,
      'SILENT': 0,
    },
    'SILENT': {
      'DEFLECT': -3,
      'SILENT': -1,
    },
  };
  return {
    a: scoreMap[play.a][play.b],
    b: scoreMap[play.b][play.a],
  };
};

/**
 * @param {String} playerName
 * @param {Array} scores
 */
const getTotalScore = (playerName, scores) => scores
  .map((score) => score[playerName])
  .reduce((acc, curr) => acc + curr);

/**
 * @param {String} aStrategy strategy name for player a
 * @param {String} bStrategy strategy name for player b
 * @param {Number} playCount number of plays in game
 * @param {String} winner
 */
module.exports = (aStrategy, bStrategy, playCount) => {
  const plays = [];
  const a = players(aStrategy);
  const b = players(bStrategy);

  Array.from({ length: playCount }).forEach((v, i) => {
      console.log(`⚔️  ROUND ${i}`);
      const res = play(a, b, plays);
      plays.push(res);
      niceLog({
        a: `${res.a} | ${aStrategy} | ${calculateScore(res).a}`,
        b: `${res.b} | ${bStrategy} | ${calculateScore(res).b}`,
      })
  });

  const scores = plays.map(calculateScore);
  const aTotal = getTotalScore('a', scores);
  const bTotal = getTotalScore('b', scores);
  const winnerName = aTotal > bTotal ? 'A' : 'B';
  const winnerStrategy = winnerName === 'A' ? aStrategy : bStrategy;

  console.info('\n\n~~~~~~  🏁   ~~~~~~\n');
  if (aTotal === bTotal) {
    console.info(' 🙅  DRAW 🙅');
  } else {
    console.info(`** ${winnerName} (${winnerStrategy}) wins! **`)
  }
  console.info(`\n A | ${aStrategy} | total: ${aTotal}`);
  console.info(` B | ${bStrategy} | total: ${bTotal}`);
  console.info('\n~~~~~~~~~~~~~~~~~~~\n\n');
};

