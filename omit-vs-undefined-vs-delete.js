const _ = require('lodash');
const { Suite } = require('benchmark');
const benchmarkPrint = require('./benchmark-print');

const suite = new Suite();

let o = { p: 1 };

suite
  .add('omit', () => {
    return _.omit(o, ['p']);
  })
  //  .add('spread', () => {
  //    const { p, ...copy } = o;
  //   return copy;
  //  })
  .add('undefined', () => {
    o.p = undefined;
    return o;
  })
  .add('delete', () => {
    delete o.p;
    return o;
  })
  .on('complete', function() {
    benchmarkPrint(this);
  })
  .run();
