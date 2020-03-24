const curry = require('lodash/fp/curry');

function _flatten(list, depth = Infinity, mapperFn, mapperCtx) {
  if (depth === 0) {
    return list;
  }
  return list.reduce((acc, cur, i) => {
    if (mapperFn) {
      cur = mapperFn.call(mapperCtx || list, cur, i, list);
    }
    return Array.isArray(cur)
      ? [...acc, ...flatten(cur, depth - 1)]
      : [...acc, cur];
  }, []);
}

const flatten = list => _flatten(1, list);
const flattenDeep = list => _flatten(Infinity, list);
const flatMap = curry((fn, list) => _flatten(list, 1, fn));

const tests = [
  flattenDeep([1, [2, [3]], 4]), // <- [1, 2, 3, 4]
  flatten([1, [2, [3]], 4]), // <- [1, 2, [3], 4]
];

const flatMapTests = [
  [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }].flatMap(c => [c.x, c.y]), // <- [1, 2, 3, 4, 5, 6]
];

tests.forEach((t, i) => console.log(`flatten tests ${i}:`, t));
flatMapTests.forEach((t, i) => console.log(`flatMap tests ${i}:`, t));

const easyFlatMap = flatMap(c => [c.x, c.y], [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
]);
console.log('easy flatMap test: ', easyFlatMap);
