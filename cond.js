const R = require('ramda');

const cond = pairs => (...args) => {
  //let args = Array.prototype.slice.call(arguments);
  const match = pairs.find(([predicate]) => predicate.apply(null, args));
  return match && match[1].apply(null, args);
};

const fn = cond([
  [ R.equals(0), () => 'water freezes at 0°C' ],
  [ R.equals(100), () => 'water boils at 100°C' ],
  [ R.T, x => `nothing special happens at ${x}°C` ]
]);

console.log(fn(0));
console.log(fn(50));
console.log(fn(100));

//const between=(lower,upper)=>R.both(R.gte(R.__,lower),R.lte(R.__,upper));
const between = (lower, upper) => value => value <= upper && value >= lower;

const byGrade = R.groupBy(student => {
  return R.cond([
    [ R.lt(R.__, 60), R.always('F' ) ],
    [ between(60, 62), R.always('D-') ],
    [ between(63, 66), R.always('D' ) ],
    [ between(67, 69), R.always('D+') ],
    [ between(70, 72), R.always('C-') ],
    [ between(73, 76), R.always('C' ) ],
    [ between(77, 79), R.always('C+') ],
    [ between(80, 82), R.always('B-') ],
    [ between(83, 86), R.always('B' ) ],
    [ between(87, 89), R.always('B+') ],
    [ between(90, 92), R.always('A-') ],
    [ between(93, 96), R.always('A' ) ],
    [ between(97, 100), R.always('A+') ],
    [ R.T, R.always('N/A') ]
  ])(student.score);
});

const students = R.range(1, 101).map(s => ({ name: `Student${s}`, score: s }));
console.log('groupBy', byGrade(students));

const trunc = limit => str => {
  return str.length > limit
    ? str.substr(0, limit) + '...'
    : str;
};

const truncate = limit => R.when(
  R.propSatisfies(R.gt(R.__, limit), 'length'),
  R.pipe(R.take(limit), R.append('...'), R.join(''))
);

console.log(truncate(10)('12345'));
console.log(truncate(10)('1234567890ABCDEF'));
console.log(trunc(10)('12345'));
console.log(trunc(10)('1234567890ABCDEF'));

const values = obj => Object.keys(obj).map(x => obj[x]);
console.log(values({a:1, b:2, c:3}));
