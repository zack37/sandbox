'use strict';

const _ = require('lodash');
const { Observable, Scheduler } = require('rxjs');

const modifier = n => n % 2 === 0 ? n / 2 : 3 * n + 1;

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

// const longestSequence = _.maxBy(
//   [...Array(1000000).keys()].map(collatzInner),
//   x => x.length
// );

// console.log('Longest Sequence starting number', longestSequence[0]);

const collatzGenerator = n => {
  return Observable.create(obs => {
    // function inner(num, o) {
    //   o.next(num);

    //   return num === 1 ? o.complete() : inner(modifier(num), o);
    // }
    // inner(n, obs);
    let num = n;

    while(num !== 1) {
      obs.next(num);
      num = modifier(num);
    }

    obs.next(1);
    obs.complete();
  });
};

Observable.range(2, 1000000, Scheduler.asap)
  .flatMap(i => collatzGenerator(i).toArray())
  .map(sequence => [sequence[0], sequence.length])
  .max((a, b) => a[1] - b[1])
  .subscribe(console.log);
