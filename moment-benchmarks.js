const moment = require('moment');
const { Suite } = require('benchmark');

const benchmarkPrint = require('./benchmark-print');

const suite = new Suite();

const timer = moment();

suite
  .add('moment()', () => {
    return timer.diff(moment());
  })
  .add('new Date()', () => {
    return timer.diff(new Date());
  })
  .add('+new Date()', () => {
    return timer.diff(Number(new Date()));
  })
  .add('moment.now()', () => {
    return timer.diff(moment.now());
  })
  .on('complete', function() {
    return benchmarkPrint(this);
  })
  .run();
