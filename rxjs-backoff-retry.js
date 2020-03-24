const { Observable, Subject } = require('rxjs');
const { red, yellow } = require('chalk');

const defaults = {
  attempts: 4,
  backoff: 2,
  initial: 1000,
  maxTimeout: Infinity,
  type: 'exp',
  timeoutFn: null,
};

const timeoutMap = {
  poly: (min, max, backoff, i) =>
    Math.min(min + backoff ** i * 10 ** Math.floor(Math.log10(min)), max),
  exp: (min, max, backoff, i) =>
    Math.min(min + i ** backoff * 10 ** Math.floor(Math.log10(min)), max),
  linear: (min, max, backoff, i) =>
    Math.min(min + i * backoff * 10 ** Math.floor(Math.log10(min)), max),
};

function backoffRetry(options = {}) {
  const {
    attempts,
    backoff,
    initial,
    maxTimeout,
    type,
    timeoutFn,
  } = Object.assign({}, defaults, options);
  const timeout = timeoutFn || timeoutMap[type] || (() => 0);

  return errorsObs$ => {
    const attempt$ = Number.isFinite(attempts)
      ? Observable.range(1, attempts + 1)
      : Observable.of(0);
    return Observable.zip(attempt$, errorsObs$).mergeMap(([attempt, err]) => {
      if (attempt === attempts) {
        console.error(red('Reached maximum number of retry attempts'));
        throw err;
      }
      const wait = timeout(initial, maxTimeout, backoff, attempt);

      console.warn(yellow('Request failed: ', err));
      console.warn(yellow('Retrying after ', wait, 'ms'));

      return Observable.timer(wait);
    });
  };
}

let counter = 0;

const ender = new Subject();

Observable.interval(1000)
  .takeUntil(ender)
  .subscribe(i => console.log(`${i + 1}s`));

Observable.of(0)
  .mergeMap(() => {
    counter++;
    console.log(`attempt ${counter}`);
    return counter < 3
      ? Observable.throw(new Error('DIE!!!'))
      : Observable.of('Success' + counter);
  })
  .retryWhen(backoffRetry({ type: 'linear', backoff: 2 }))
  .subscribe({
    next(v) {
      console.log('next', v);
    },
    error(e) {
      console.error('error', e);
      ender.next();
    },
    complete() {
      console.log('complete');
      ender.next();
    },
  });
