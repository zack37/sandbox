const benchmarkPrint = require('./benchmark-print');
const { Suite } = require('benchmark');
const { toLower } = require('lodash');

const cached = /test/i;

new Suite('RegExp vs toLowerCase')
  .add('uncached regexp', () => {
    return /test/i.test('TeSt');
  })
  .add('cached regexp', () => {
    return cached.test('TeSt');
  })
  .add('lodash#toLower', () => {
    return toLower('TeSt') === 'test';
  })
  .add('toLowerCase', () => {
    return 'TeSt'.toLowerCase() === 'test';
  })
  .on('complete', benchmarkPrint)
  .run();
