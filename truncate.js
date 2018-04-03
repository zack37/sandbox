const {
  curry,
  when,
  propSatisfies,
  pipe,
  gt,
  __,
  append,
  join,
  take
} = require('ramda');

const truncate = curry((cutoff, tail, source) =>
  when(
    propSatisfies(gt(__, cutoff), 'length'),
    pipe(take(cutoff - tail.length), append(tail), join('')),
    source
  )
);

console.log(truncate(10, '...', '12345'));
console.log(truncate(10, '...', '0123456789ABCDEF'));
