const lodash = require('lodash');
const underscore = require('underscore');
const benchmarkPrint = require('./benchmark-print');
const R = require('ramda');
const Suite = require('benchmark').Suite;

const collection = R.range(1, 10001);
const mapFunc = x => x * x;
const filterFunc = x => x % 2 === 0;
const onComplete = function() {
  console.log(`${this.name} results: `);
  benchmarkPrint(this);
  console.log();
};

const mapSuite = new Suite('Map', { onComplete })
  .add('ramda', () => {
    return R.map(mapFunc, collection);
  })
  .add('lodash', () => {
    return lodash.map(collection, mapFunc);
  })
  .add('underscore', () => {
    return underscore.map(collection, mapFunc);
  })
  .add('native', () => {
    return collection.map(mapFunc);
  })
  .add('forLoop', () => {
    let i = 0,
      results = Array(collection.length);
    for (; i < results.length; i++) {
      results[i] = mapFunc(i);
    }
    return results;
  })
  .add('forLoop no function', () => {
    let i = 0,
      results = Array(collection.length);
    for (; i < results.length; i++) {
      results[i] = i * i;
    }
    return results;
  });

const filterSuite = new Suite('Filter', { onComplete })
  .add('ramda', () => {
    return R.filter(filterFunc, collection);
  })
  .add('lodash', () => {
    return lodash.filter(collection, filterFunc);
  })
  .add('underscore', () => {
    return underscore.filter(collection, filterFunc);
  })
  .add('native', () => {
    return collection.filter(filterFunc);
  })
  .add('forLoop', () => {
    let i = 0,
      results = Array(collection.length);
    for (; i < results.length; i++) {
      if (filterFunc(i)) {
        results[i] = i;
      }
    }
    return results;
  })
  .add('forLoop no function', () => {
    let i = 0,
      results = Array(collection.length);
    for (; i < results.length; i++) {
      if (i % 2 === 0) {
        results[i] = i;
      }
    }
    return results;
  });

const suites = [mapSuite, filterSuite];

suites.forEach(suite => {
  suite.run({ async: true });
});
