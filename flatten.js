function flatten(list, depth = Infinity, mapperFn, mapperCtx) {
  if (depth === 0) {
    return list;
  }
  return list.reduce((acc, cur, i) => {
    if (mapperFn) {
      cur = mapperFn.call(mapperCtx || list, cur, i, list);
    }
    return Array.isArray(cur)
      ? acc.concat(flatten(cur, depth - 1))
      : acc.concat(cur);
  }, []);
}

Array.prototype.flatten = function(depth = Infinity) {
  return flatten(this, depth);
};

Array.prototype.flatMap = function(fn, ctx) {
  return flatten(this, 1, fn, ctx);
};

const tests = [
  [1, [2, [3]], 4].flatten(), // <- [1, 2, 3, 4]
  [1, [2, [3]], 4].flatten(2), // <- [1, 2, 3, 4]
  [1, [2, [3]], 4].flatten(1), // <- [1, 2, [3], 4]
  [1, [2, [3]], 4].flatten(0) // <- [1, [2, [3]], 4]
];

const flatMapTests = [
  [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }].flatMap(c => [c.x, c.y]) // <- [1, 2, 3, 4, 5, 6]
];

tests.forEach((t, i) => console.log(`flatten tests ${i}:`, t));
flatMapTests.forEach((t, i) => console.log(`flatMap tests ${i}:`, t));

const flatMap = (fn, list) => {
  return list.reduce((acc, cur) => acc.concat(fn(cur)), []);
};

const easyFlatMap = flatMap(c => [c.x, c.y], [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 }
]);
console.log('easy flatMap test: ', easyFlatMap);
