// util
const randomChoice = () => [
  'DEFLECT',
  'SILENT',
][Math.floor(Math.random() * 2)];

const chat = (name, msg) => {
  console.info(`💬  Player ${name.toUpperCase()}: ${msg}`)
}

const isDeflect = (choice) =>
   choice == 'DEFLECT';
const isSilent = (choice) =>
   choice == 'SILENT';




const players = {

  // random by default
  // Deflects if it's losing
  soreLoser: ({
    playerName,
    myScore,
    theirScore,
  }) => {
    let choice = randomChoice();

    if (myScore < theirScore) {
      chat(playerName, '😭  You\'re winning, it\'s not fair!');
      choice = 'DEFLECT';
    }

    return choice;
  },

  // Deflect forever as soon as the oponent deflects
  burnBridges: ({
    playerName,
    theirChoices,
  }) => {
    let choice = 'SILENT';

    if (theirChoices.includes('DEFLECT')) {
      chat(playerName, '🔥 I will never forgive you.');
      choice = 'DEFLECT';
    }

    return choice;
  },

  // tit for tat
  titForTat: ({
    playerName,
    theirChoices,
  }) => {
    let choice = 'SILENT';

    if (isDeflect([...theirChoices].pop())) {
      chat(playerName, '👁‍🗨  eye for an eye!');
      choice = 'DEFLECT';
    }

    if (
      isDeflect(theirChoices[theirChoices.length -2])
      && isSilent([...theirChoices].pop())
    ) {
      chat(playerName, '🕊  I forgive you');
    }

    return choice;
  },

  // just make a psuedo-random choice
  random: (data) => {
    return randomChoice();
  },

  // always chose silent
  silent: () => 'SILENT',

  // always chose DEFLECT
  deflect: () => 'DEFLECT',

};

module.exports = (strategy) => players[strategy];
