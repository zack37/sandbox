const { cond, equals: eq, identity, test, T } = require('ramda');

const hexMap = cond([
  [eq('a'), () => 10],
  [eq('b'), () => 11],
  [eq('c'), () => 12],
  [eq('d'), () => 13],
  [eq('e'), () => 14],
  [eq('f'), () => 15],
  [test(/\d/), identity],
  [T, () => 0],
]);

const convert = n => {
  return n
    .toLowerCase()
    .split('')
    .reverse()
    .reduce((acc, cur, i) => acc + hexMap(cur) * 16 ** i, 0);
};

const [, , input] = process.argv;

console.log(`${input} converted to decimal is ${convert(input)}`);
console.log(`but with cheating, ${input} is ${Number.parseInt(input, 16)}`);
