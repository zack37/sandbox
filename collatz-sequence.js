'use strict';

const { Observable, Scheduler } = require('rxjs');

const modifier = n => (n % 2 === 0 ? n / 2 : 3 * n + 1);

const collatzInner = n => {
  const sequence = [];
  let i = n;
  while (i > 1) {
    sequence.push(i);
    i = modifier(i);
  }
  sequence.push(i);
  return sequence;
};

const collatzGenerator = n => {
  return Observable.create(obs => {
    let num = n;

    while (num !== 1) {
      obs.next(num);
      num = modifier(num);
    }

    obs.next(1);
    obs.complete();
  });

  /// slightly slower, but much smaller
  // return Observable.of(n)
  //   .expand(num => Observable.of(modifier(num)))
  //   .takeWhile(x => x !== 1);
};

const startTime = process.hrtime();

Observable.range(2, 1000000, Scheduler.asap)
  .flatMap(i => collatzGenerator(i).toArray())
  .map(sequence => [sequence[0], sequence.length])
  .max(([, aLength], [, bLength]) => aLength - bLength)
  .subscribe({
    next: console.log,
    complete: () => {
      const [s, ns] = process.hrtime(startTime);

      console.log(`Process took ${s * 1000 + ns / 1e6} ms`);
    },
  });
