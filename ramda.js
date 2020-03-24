const R = require('ramda');

const mappingFunc = x => {
  console.log('mapping');
  return x * x;
};

const filterFunc = x => {
  console.log('filtering');
  return x % 3 === 0;
};

console.log(
  R.pipe(
    R.map(mappingFunc),
    R.filter(filterFunc),
  )(R.range(1, 10)),
);
