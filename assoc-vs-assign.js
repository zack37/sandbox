const Suite = require('benchmark').Suite;
const R = require('ramda');

const benchmarkPrint = require('./benchmark-print');

const suite = new Suite();

const obj = { a: 1, b: 2 };

suite
  .add('assoc', () => {
    return R.assoc('c', 3, obj);
  })
  .add('assign', () => {
    return Object.assign({}, obj, { c: 3 });
  })
  .on('complete', function() {
    return benchmarkPrint(this);
  })
  .run();
