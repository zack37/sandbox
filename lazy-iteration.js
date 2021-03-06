const range = function*(from, to) {
  for (let i = from; i < to; i++) {
    yield i;
  }
};

const map = (fn, caller) => {
  return function*(source) {
    for (const item of source) {
      yield fn.call(caller, item);
    }
  };
};

const filter = predicate => {
  return function*(source) {
    for (const item of source) {
      if (predicate(item)) {
        yield item;
      }
    }
  };
};

const juxt = fns => (...args) => {
  return map(fn => fn(...args))(fns);
};

const reduce = (fn, start) => source => {
  let acc = start,
    i = 0;
  if (start == null) {
    for (const x of source) {
      i = 1;
      acc = x;
      break;
    }
  }

  for (const item of source) {
    acc = fn(acc, item, i++);
  }
  return acc;
};

const join = (separator = ',') => source => {
  separator = separator.toString();
  const reduced = reduce((acc, cur) => acc + cur.toString() + separator, '')(
    source,
  );
  return reduced.substring(0, reduced.length - separator.length);
};

const pipe = (...fns) => init => {
  return reduce((acc, cur) => cur(acc), init)(fns);
};

const filterAsReduce = predicate => source => {
  return source.reduce(
    (acc, cur) => (predicate(cur) ? acc.concat(cur) : acc),
    [],
  );
};

console.log([...range(1, 10)]);
console.log([...filter(x => x % 2 === 0)([1, 2, 3, 4, 5, 6, 7])]);
console.log([...juxt([Math.min, Math.max])(-3, 4, 9, 1)]);
console.log(filterAsReduce(x => x % 2 === 0)([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(join(', ')([1, 2, 3, 4, 5, 6, 7]), 'plus other stuff');
const piped = pipe(
  map(x => x * 2),
  filter(x => !(x % 3)),
  join(', '),
);
console.log(piped([...new Array(100).keys()]));
