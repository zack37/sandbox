const Suite = require('benchmark').Suite;

const benchmarkPrint = require('./benchmark-print');

const suite = new Suite();
const array = new Array(100000);

suite
  .add('let and length inside', () => {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      count++;
    }
    return count;
  })
  .add('var and length inside', () => {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      count++;
    }
    return count;
  })
  .add('let outside, length inside', () => {
    let count = 0;
    let i = 0;
    for (; i < array.length; i++) {
      count++;
    }
    return count;
  })
  .add('var outside, length inside', () => {
    let count = 0;
    let i = 0;
    for (; i < array.length; i++) {
      count++;
    }
    return count;
  })
  .add('let inside, length outside', () => {
    let count = 0;
    const length = array.length;
    for (let i = 0; i < length; i++) {
      count++;
    }
    return count;
  })
  .add('var inside, length outside', () => {
    let count = 0;
    const length = array.length;
    for (let i = 0; i < length; i++) {
      count++;
    }
    return count;
  })
  .add('let outside, length outside', () => {
    let count = 0;
    let i = 0;
    const length = array.length;
    for (; i < length; i++) {
      count++;
    }
    return count;
  })
  .add('var outside, length, outside', () => {
    let count = 0;
    let i = 0;
    const length = array.length;
    for (; i < length; i++) {
      count++;
    }
    return count;
  })
  .on('complete', function() {
    return benchmarkPrint(this);
  })
  .run();
