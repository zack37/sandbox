const R = require('ramda');

const round = places => value => {
  const shift = 10 ** places;
  return ((value * shift) << 0) / shift;
};

const round4 = round(4);

const pickValues = x => ({
  name: x.name,
  average: round4(x.stats.mean * 1e6),
  deviation: round4(x.stats.deviation * 1e6),
});

const pad = (longest, current) => {
  return ' '.repeat(longest - current.length + 2);
};

const max = source => {
  return Math.max(...source);
};

const template = (longestNameLength, { name, average, deviation }) => {
  const padding = pad(longestNameLength, name);
  return `${name}:${padding}${average} µs/iter (± ${deviation})`;
};

module.exports = function(benchmarkResults) {
  if (benchmarkResults.currentTarget) {
    benchmarkResults = benchmarkResults.currentTarget;
  }

  console.log('Showing µs/iter (lower is better)');
  console.log('---------------------------------');
  const results = R.sortBy(
    R.prop('average'),
    R.map(pickValues, benchmarkResults),
  );
  const longestNameLength = max(results.map(x => x.name.length));
  R.compose(
    R.forEach(console.log),
    R.map(template.bind(null, longestNameLength)),
  )(results);
};
