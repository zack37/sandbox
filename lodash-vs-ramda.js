const lodash = require('lodash');
const underscore = require('underscore');
const benchmarkPrint = require('./benchmark-print');
const R = require('ramda');
const Suite = require('benchmark').Suite;
const suite = new Suite();

const collection = R.range(1, 10001);
const mapFunc = x => x*x;
const filterFunc = x => x % 2 === 0;

console.time('ramda#map');
R.map(mapFunc, collection);
console.timeEnd('ramda#map');

console.time('lodash#map');
lodash.map(collection, mapFunc);
console.timeEnd('lodash#map');

console.time('underscore#map');
underscore.map(collection, mapFunc);
console.timeEnd('underscore#map');

console.time('native#map');
collection.map(mapFunc);
console.timeEnd('native#map');

console.time('ramda#filter');
R.filter(filterFunc, collection);
console.timeEnd('ramda#filter');

console.time('lodash#filter');
lodash.filter(collection, filterFunc);
console.timeEnd('lodash#filter');

console.time('underscore#filter');
underscore.filter(collection, filterFunc);
console.timeEnd('underscore#filter');

console.time('native#filter');
collection.filter(filterFunc);
console.timeEnd('native#filter');

suite
  .add('ramda#map', () => {
    return R.map(mapFunc, collection);
  })
  .add('lodash#map', () => {
    return lodash.map(collection, mapFunc);
  })
  .add('underscore#map', () => {
    return underscore.map(collection, mapFunc);
  })
  .add('native#map', () => {
    return collection.map(mapFunc);
  })
  .add('ramda#filter', () => {
    return R.filter(filterFunc, collection);
  })
  .add('lodash#filter', () => {
    return lodash.filter(collection, filterFunc);
  })
  .add('underscore#filter', () => {
    return underscore.filter(collection, filterFunc);
  })
  .add('native#filter', () => {
    return collection.filter(filterFunc);
  })
  .on('complete', function() {
    benchmarkPrint(this);
  })
  .run();

