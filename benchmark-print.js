const R = require('ramda');

const round = places => value => {
  const shift = Math.pow(10, places);
  return (value * shift << 0) / shift;
};

const round2 = round(2);
const pickValues = x => {
  return {
    name: x.name,
    average: round2(x.stats.mean * 1e6),
    deviation: round2(x.stats.deviation * 1e6)
  };
};

const pad = (longest, current) => {
  return ' '.repeat(longest - current.length + 2);
};

const max = source => {
  return Math.max.apply(Math, source);
};

const template = longestNameLength => ({ name, average, deviation }) => {
  const padding = pad(longestNameLength, name);
  return `${name}:${padding}${average} µs/iter (± ${deviation})`;
};

module.exports = benchmarkResults => {
  const results = R.map(pickValues, benchmarkResults);
  const longestNameLength = max(R.map(x => x.name.length, results));
  const print = x => console.log(template(longestNameLength)(x));
  R.forEach(print, results);
};
