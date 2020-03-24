const _ = require('lodash');
const random = require('./random');
const wordsList = require('./big-word-list');

const rollDie = () => random.crypto.range(1, 7);

const numWords = 10;

async function run() {
  const numWordsRange = _.range(0, numWords);

  console.time('dice rolls');
  const results = await Promise.all(
    _.range(1, 100).map(() => {
      return _.map(numWordsRange, () => {
        const diceRolls = _.map(_.range(0, 5), rollDie).join('');
        return wordsList[diceRolls];
      }).join('');
    }),
  );
  console.log(results.join('\n'));
  console.timeEnd('dice rolls');
}

run();
