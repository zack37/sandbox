const Rx = require('rxjs');

const printSubject = stuff => console.log('Subject:', stuff);

const makePromise = i =>
  Promise.resolve().then(() => console.log('made promise', i));

const ob = Rx.Observable
  .interval(10)
  .flatMap(i => Rx.Observable.fromPromise(makePromise(i)));

ob.subscribe();
