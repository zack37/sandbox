const { Suite } = require('benchmark');
const benchmarkPrint = require('./benchmark-print');

const bigList = [...Array(10000).keys()];

const indexWhileMap = (fn, functor) => {
  let idx = 0, len = functor.length, result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx++;
  }
  return result;
};

const indexForMap = (fn, functor) => {
  let idx = 0, len = functor.length, result = Array(len);
  for (; idx < len; idx++) {
    result[idx] = fn(functor[idx]);
  }
  return result;
};

new Suite()
  .add('index while', () => {
    return indexWhileMap(x => x, bigList);
  })
  .add('index for', () => {
    return indexForMap(x => x, bigList);
  })
  .on('complete', function() {
    benchmarkPrint(this);
  })
  .run();
