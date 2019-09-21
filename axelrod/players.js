// util
const randomChoice = () => [
  'DEFLECT',
  'SILENT',
][Math.floor(Math.random() * 2)];

const chat = (name, msg) => {
  console.info(`💬  Player ${name}: ${msg}`)
}

const isDeflect = (choice) =>
   choice == 'DEFLECT';
const isSilent = (choice) =>
   choice == 'SILENT';




const players = {

  // Deflect forever as soon as the oponent deflects
  burnBridges: ({
    playerName,
    theirChoices,
  }) => {
    let choice = 'SILENT';

    const isFirstDeflection = theirChoices
      .filter(isDeflect)
      .length === 1;

    if (theirChoices.includes('DEFLECT')) {
      choice = 'DEFLECT';
    }

    if (isFirstDeflection) {
      chat(
        playerName.toUpperCase(),
        '😡 🔥 FUCK YOU FOREVER!!!'
      );
    }

    return choice;
  },

  // just make a psuedo-random choice
  random: (data) => {
    return randomChoice();
  },

};

module.exports = (strategy) => players[strategy];
