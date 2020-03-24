const _ = require('lodash');

const digits = parseInt(process.argv[2], 10) || 3;

const range = _.range(1, Math.pow(10, digits));

const result = _.flatMap(range, r1 => {
  return _.map(range, r2 => ({ r1, r2 }));
})
  .map(({ r1, r2 }) => r1 * r2)
  .filter(
    product =>
      product.toString() ===
      product
        .toString()
        .split('')
        .reverse()
        .join(''),
  )
  .sort((a, b) => b - a)[0];

console.log(result);
