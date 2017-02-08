const R = require('ramda');

const round2 = value => (value * 100 << 0) / 100;
const pickValues = x => {
  return { name: x.name, average: round2(x.stats.mean*1e6), deviation: round2(x.stats.deviation*1e6) };
};

const pad = (longest, current) => {
  return ' '.repeat(longest - current.length + 2);
};

const max = source => {
  return Math.max(...source);
};

const template = longestNameLength => ({ name, average, deviation }) => {
  return `${name}:${pad(longestNameLength, name)} ${average} µs/iter (± ${deviation})`
};

module.exports = (benchmarkResults) => {
  const results = R.map(pickValues, benchmarkResults);
  const longestNameLength = max(R.map(x => x.name.length, results));
  const print = x => console.log(template(longestNameLength)(x));
  R.forEach(print, results);
}
