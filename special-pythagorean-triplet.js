const range = require('lodash/range');
const pretty = require('pretty-hrtime');

function simple(n) {
  for (const b of range(1, n / 2 + 1)) {
    for (const a of range(1, b)) {
      const c = n - b - a;
      if (a ** 2 + b ** 2 === c ** 2) {
        return a * b * c;
      }
    }
  }

  return 0;
}

function mathematical(sum) {
  let m = 0;
  for (const n of range(0, sum)) {
    const delta = n ** 2 + 2 * sum;
    const m1 = (-n + Math.sqrt(delta)) / 2;
    const m2 = (-n - Math.sqrt(delta)) / 2;
    if (m1 % 1 === 0 && m1 > n) {
      m = m1;
    } else if (m2 % 1 === 0 && m2 > n) {
      m = m2;
    }

    if (m !== 0) {
      const a = 2 * m * n;
      const b = m ** 2 - n ** 2;
      const c = m ** 2 + n ** 2;
      return a * b * c;
    }
  }

  return 0;
}

const run = fn => {
  const start = process.hrtime();
  const result = fn(1000);
  const end = process.hrtime(start);
  console.log('result', result);
  console.log(pretty(end));
};

[simple, mathematical].forEach(run);
