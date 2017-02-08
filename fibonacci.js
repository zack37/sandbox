const _ = require('lodash');
const assert = require('assert');

const inner = (n, a, b) => n <= 0 ? a : inner(n-1, b, a+b);

const fib = n => inner(n, 0, 1);

const times = parseInt(process.argv[2] || 10, 10);

const answers = [...Array(times).keys()].map(fib);

const window = source => windowSize => {
  return _(source)
    .map((x, i) => _(source).drop(i).take(windowSize).value())
    .filter(x => x.length === windowSize)
    .value();
};

const windows = window(answers)(3);
console.log(times <= 20 ? windows : `Not printing windows because n (${times}) is too large.`);
let values = [];
assert(windows.every(([ first, second, sum ]) => {
  values = [ first, second, sum ];
  return first + second === sum;
}), `Uh oh. Fibonacci Sequence is incorrect for values: ${values}`);

console.log('fibonacci sequence is correct');
