const { range, filter, sum } = require('lodash');

function isPerfect(n) {
  const [upper, step] = n % 2 === 0 ? [n / 2, 1] : [n / 3, 2];
  return sum(filter(range(1, upper + 1, step), x => n % x === 0)) === n;
}

console.time('perfectNumbers');
const perfectNumbers = range(2, 100000).filter(isPerfect);
console.timeEnd('perfectNumbers');

console.log(perfectNumbers);
