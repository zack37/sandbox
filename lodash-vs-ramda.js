const lodash = require('lodash');
const underscore = require('underscore');
const R = require('ramda');
const { Suite } = require('benchmark');
const benchmarkPrint = require('./benchmark-print');

const collection = R.range(1, 10001);
const mapFunc = x => x * x;
const filterFunc = x => x % 2 === 0;
const onComplete = function() {
  const label = this.name + ' results:';
  console.group(label);
  benchmarkPrint(this);
  console.groupEnd(label);
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
    let i = 0;
    const len = collection.length;
    const results = new Array(len);
    for (; i < len; i++) {
      results[i] = mapFunc(i);
    }
    return results;
  })
  .add('forLoop no function', () => {
    let i = 0;
    const len = collection.length;
    const results = new Array(len);
    for (; i < len; i++) {
      results[i] = i * i;
    }
    return results;
  })
  .add('while loop', () => {
    let idx = -1;
    const len = collection.length;
    const result = new Array(len);

    while (++idx < len) {
      result[idx] = mapFunc(collection[idx]);
    }
    return result;
  })
  .add('while loop no function', () => {
    let idx = -1;
    const len = collection.length;
    const result = new Array(len);

    while (++idx < len) {
      result[idx] = idx * idx;
    }
    return result;
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
    let i = 0;
    const len = collection.length;
    const results = new Array(len);
    for (; i < results.length; i++) {
      if (filterFunc(i)) {
        results[i] = i;
      }
    }
    return results;
  })
  .add('forLoop no function', () => {
    let i = 0;
    const len = collection.length;
    const results = new Array(len);
    for (; i < results.length; i++) {
      if (i % 2 === 0) {
        results[i] = i;
      }
    }
    return results;
  })
  .add('while loop', () => {
    let idx = -1;
    let item;
    const len = collection.length;
    const result = new Array(len);

    while (++idx < len) {
      item = collection[idx];
      if (filterFunc(item)) {
        result[result.length] = item;
      }
    }
    return result;
  })
  .add('while loop no function', () => {
    let idx = -1;
    let item;
    const len = collection.length;
    const result = new Array(len);

    while (++idx < len) {
      item = collection[idx];
      if (item % 2 === 0) {
        result[result.length] = item;
      }
    }
    return result;
  });

const arrayFromSuite = new Suite('Array#from', { onComplete })
  .add('.map', () => {
    return Array.from({ length: collection.length }).map((_, i) => i * i);
  })
  .add('mapping argument', () => {
    return Array.from({ length: collection.length }, (_, i) => i * i);
  })
  .add('for loop', () => {
    let i;
    const len = collection.length;
    const results = new Array(len);

    for (i = 0; i < len; i++) {
      results[i] = i * i;
    }

    return results;
  })
  .add('while loop', () => {
    let i = -1;
    const len = collection.length;
    const results = new Array(len);

    while (++i < len) {
      results[i] = i * i;
    }

    return results;
  });

const suites = [mapSuite, filterSuite, arrayFromSuite];

suites.forEach(suite => {
  suite.run({ async: true });
});
