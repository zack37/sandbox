const moment = require('moment');
const Suite = require('benchmark').Suite;
const benchmarkPrint = require('./benchmark-print');

const iterations = 1000000;
const hrToMs = ([s, ns]) => s * 1e3 + ns / 1e6;
const timer = moment();
const suite = new Suite();

suite
  .add('moment diff', () => {
    return timer.diff(moment());
  })
  .add('date diff', () => {
    return timer.diff(new Date());
  })
  .add('now diff', () => {
    return timer.diff(moment.now());
  })
  .on('complete', function() {
    benchmarkPrint(this);
  })
  .run();
