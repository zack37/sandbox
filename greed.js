const range = (start, end) => {
  if (!end) {
    end = start;
    start = 0;
  }
  return Array.from({ length: end - start }, (_, i) => i + start);
};
const countBy = (fn, list) =>
  list.reduce((acc, cur) => {
    const key = fn(cur);
    return { ...acc, [key]: (acc[key] || 0) + 1 };
  }, {});

const rollDie = () => (((Math.random() * 100) << 0) % 6) + 1;
const rollDice = num => Array.from({ length: num }, rollDie);

const modify = ({ frequency, scoreModifier, dieFace }) => input => {
  if (!input.dice[dieFace] || input.dice[dieFace] < frequency) {
    return input;
  }

  return range(input.dice[dieFace] / frequency).reduce(
    ({ score, dice }) => ({
      score: score + scoreModifier,
      dice: { ...dice, [dieFace]: dice[dieFace] - frequency },
    }),
    input,
  );
};

const scoringAlgorithms = [
  modify({
    frequency: 3,
    scoreModifier: 1000,
    dieFace: 1,
  }),
  modify({
    frequency: 3,
    scoreModifier: 600,
    dieFace: 6,
  }),
  modify({
    frequency: 3,
    scoreModifier: 500,
    dieFace: 5,
  }),
  modify({
    frequency: 3,
    scoreModifier: 400,
    dieFace: 4,
  }),
  modify({
    frequency: 3,
    scoreModifier: 300,
    dieFace: 3,
  }),
  modify({
    frequency: 3,
    scoreModifier: 200,
    dieFace: 2,
  }),
  modify({
    frequency: 1,
    scoreModifier: 100,
    dieFace: 1,
  }),
  modify({
    frequency: 1,
    scoreModifier: 50,
    dieFace: 5,
  }),
];

const calculateScore = diceRolls => {
  const diceCounts = countBy(x => x, diceRolls);
  console.log(diceCounts);
  const { score } = scoringAlgorithms.reduce((acc, cur) => cur(acc), {
    dice: diceCounts,
    score: 0,
  });
  return score;
};

console.log(calculateScore([1, 1, 1, 5, 5]));
console.log(calculateScore(rollDice(5)));
