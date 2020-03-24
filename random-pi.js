const { Observable } = require('rxjs');

const TRIALS = 1e8;
const MIN = 1;
const MAX = 10000;

function hrToMs([s, ns]) {
  return s * 1000 + ns / 1e6;
}

function gcd(a, b) {
  if (b > a) {
    [a, b] = [b, a];
  }
  // eslint-disable-next-line no-constant-condition
  let r;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }

  return a;
}

function randomBetween(lower, upper) {
  return (Math.random() * (upper - lower) + lower) << 0;
}

function calculatePI(watchConvergence = false) {
  const startTime = process.hrtime();

  let generator$ = Observable.range(1, TRIALS).map(() => {
    const a = randomBetween(MIN, MAX);
    const b = randomBetween(MIN, MAX);

    return gcd(a, b);
  });

  generator$ = watchConvergence
    ? generator$.scan((acc, cur) => acc + (cur === 1 ? 1 : 0), 0)
    : generator$.count(x => x === 1);

  generator$.map(count => Math.sqrt(6 / (count / TRIALS))).subscribe({
    next: result => {
      console.log(`Estimated PI = ${result}`);
      console.log(
        `Difference of PI = ${Math.PI} - ${result} = ${Math.PI - result}`,
      );
    },
    complete: () => {
      const endTime = process.hrtime(startTime);
      console.log(`Process took ${hrToMs(endTime)}ms`);
    },
  });
}

calculatePI();
