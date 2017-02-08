const _ = require('lodash');
const benchmarkPrint = require('./benchmark-print');
const R = require('ramda');
const { Suite } = require('benchmark');
const suite = new Suite();

const collection = [...Array(10000).keys()];
const mapFunc = x => x*x;
const filterFunc = x => x % 2 === 0;

console.time('ramda#map');
R.map(mapFunc, collection);
console.timeEnd('ramda#map');

console.time('lodash#map');
_.map(collection, mapFunc);
console.timeEnd('lodash#map');

console.time('native#map');
collection.map(mapFunc);
console.timeEnd('native#map');

console.time('ramda#filter');
R.filter(filterFunc, collection);
console.timeEnd('ramda#filter');

console.time('lodash#filter');
_.filter(collection, filterFunc);
console.timeEnd('lodash#filter');

console.time('native#filter');
collection.filter(filterFunc);
console.timeEnd('native#filter');

suite
  .add('ramda#map', () => {
    return R.map(mapFunc, collection);
  })
  .add('lodash#map', () => {
    return _.map(collection, mapFunc);
  })
  .add('native#map', () => {
    return collection.map(mapFunc);
  })
  .add('ramda#filter', () => {
    return R.filter(filterFunc, collection);
  })
  .add('lodash#filter', () => {
    return _.filter(collection, filterFunc);
  })
  .add('native#filter', () => {
    return collection.filter(filterFunc);
  })
  .on('complete', function() {
    benchmarkPrint(this);
  })
  .run();

