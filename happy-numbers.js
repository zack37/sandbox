const R = require('ramda');

const digitSum = R.pipe(
  R.toString(),
  R.split(''),
  R.map(x => parseInt(x, 10)),
  R.map(x => x * x),
  R.sum()
);
const happyNumber = (num, prev = []) => {
  if (num === 1) {
    return true;
  }
  if (prev.includes(num)) {
    return false;
  }
  return happyNumber(digitSum(num), prev.concat(num));
};

const results = [...Array(101).keys()]
  .map((x, i) => [i, happyNumber(x)])
  .filter(x => x[1])
  .map(x => x[0]);
console.log(results);
