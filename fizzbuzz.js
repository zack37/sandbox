const _ = require('lodash');

const divisible = x => m => x % m[0] === 0;
const getValue = m => m[1];

const matches = [[3, 'Fizz'], [5, 'Buzz'], [6, 'Bang']];

const fizzBuzz = x => _(matches).filter(divisible(x)).map(getValue).join('');

const fizzBuzzTo = (n, def) => _.range(1, n).map(x => fizzBuzz(x) || def || x);

console.time('fizzbuzz');
const result = fizzBuzzTo(31);
console.timeEnd('fizzbuzz');

console.log(result.join('\n'));
