const { Big: big } = require('big.js');
const { Observable, Scheduler } = require('rxjs');
const Progress = require('progress');
const prettyHRTime = require('pretty-hrtime');

function isPrimeSqrt(p) {
  if (p.eq(1)) {
    return false;
  }
  if (p.eq(2) || p.eq(3)) {
    return true;
  }
  if (p.mod(2).eq(0) || p.mod(3).eq(0)) {
    return false;
  }

  let bigI = big(5);
  let bigW = big(2);
  const bigP = big(p);
  const big6 = big(6);

  while (bigI.times(bigI).lte(bigP)) {
    if (bigP.mod(bigI).eq(0)) {
      return false;
    }

    bigI = bigI.plus(bigW);
    bigW = big6.minus(bigW);
  }

  return true;
}

// eslint-disable-next-line complexity
function leastFactor(n) {
  if (n === 0) {
    return 0;
  }
  if (n % 1 !== 0 || n * n < 2) {
    return 1;
  }
  if (n % 2 === 0) {
    return 2;
  }
  if (n % 3 === 0) {
    return 3;
  }
  if (n % 5 === 0) {
    return 5;
  }

  const m = Math.floor(Math.sqrt(n));
  for (let i = 7; i <= m; i += 30) {
    if (n % i === 0) {
      return i;
    }
    if (n % (i + 4) === 0) {
      return i + 4;
    }
    if (n % (i + 6) === 0) {
      return i + 6;
    }
    if (n % (i + 10) === 0) {
      return i + 10;
    }
    if (n % (i + 12) === 0) {
      return i + 12;
    }
    if (n % (i + 16) === 0) {
      return i + 16;
    }
    if (n % (i + 22) === 0) {
      return i + 22;
    }
    if (n % (i + 24) === 0) {
      return i + 24;
    }
  }

  return n;
}

function isPrimeLeastFactor(p) {
  return p === leastFactor(p);
}

function isPrimeBasic(p) {
  if (p === 1) {
    return false;
  }
  if (p === 2 || p === 3) {
    return true;
  }
  if (p % 2 === 0 || p % 3 === 0) {
    return false;
  }

  for (let i = 5; i < Math.floor(Math.sqrt(p)) + 1; i += 2) {
    if (p % i === 0) {
      return false;
    }
  }
  return true;
}

function arbitrary(upper) {
  const bar = new Progress('[:bar] :rate/s :percent', {
    total: upper - 2,
    width: Math.min(180, Math.floor(Math.sqrt(upper))),
    incomplete: ' ',
    head: '>',
  });
  bar.render();

  const progressStart = process.hrtime();

  return Observable.interval(0, Scheduler.asap)
    .scan(acc => acc.plus(1), big(2))
    .takeWhile(x => x.lt(upper))
    .do(() => bar.tick())
    .filter(isPrimeSqrt)
    .reduce(acc => acc.plus(1), big(0))
    .subscribe({
      next: count => {
        const ratio = count.div(upper).times(100);

        console.log(`Ratio of primes = ${count}/${upper} = ${ratio}%`);
      },
      complete: () => {
        const end = process.hrtime(progressStart);
        const prettyTime = prettyHRTime(end, { precise: true });
        console.log(`Generating primes took ${prettyTime}`);
      },
    });
}

function basic(upper) {
  const bar = new Progress('[:bar] :rate/s :percent', {
    total: upper - 2,
    width: Math.min(180, Math.floor(Math.sqrt(upper))),
    incomplete: ' ',
    head: '>',
  });
  bar.render();

  const basicStart = process.hrtime();

  return Observable.range(2, upper - 2, Scheduler.asap)
    .do(() => bar.tick())
    .filter(isPrimeLeastFactor)
    .count()
    .subscribe({
      next: count => {
        const ratio = (count / upper) * 100;

        console.log(`Ratio of primes = ${count}/${upper} = ${ratio}%`);
      },
      complete: () => {
        const end = process.hrtime(basicStart);
        const prettyTime = prettyHRTime(end, { precise: true });
        console.log(`Generating primes without progress took ${prettyTime}`);
      },
    });
}

function primitive(upper) {
  const primitiveStart = process.hrtime();
  let primeCount = 1; // 2
  const bar = new Progress('[:bar] :rate/s :percent', {
    total: upper - 2,
    width: Math.min(180, Math.floor(Math.sqrt(upper))),
    incomplete: ' ',
    head: '>',
  });
  bar.render();

  for (let i = 3; i < upper - 2; i += 2) {
    bar.tick();
    if (isPrimeLeastFactor(i)) {
      primeCount++;
    }
  }

  return Observable.of(primeCount).subscribe({
    next: count => {
      const ratio = (count / upper) * 100;

      console.log(`Ratio of primes = ${count}/${upper} = ${ratio}%`);
    },
    complete: () => {
      const end = process.hrtime(primitiveStart);
      const prettyTime = prettyHRTime(end, { precise: true });
      console.log(`Generating primes without progress took ${prettyTime}`);
    },
  });
}

Observable.concat(
  // Arbitrary(),
  basic(1000000),
  primitive(1000000),
);
