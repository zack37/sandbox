const startCase = require('lodash/startCase');
const axios = require('axios');
const Promise = require('bluebird');
const { compose, join, map, path, toPairs } = require('ramda');

const packages = ['mod.js', 'fluent-assert', 'coin-flip'];
const timeframes = ['last-day', 'last-week', 'last-month'];

const downloadsUrl = pkg => timeframe => {
  return `https://api.npmjs.org/downloads/point/${timeframe}/${pkg}`;
};

const getDownloads = url => axios.get(url).then(path(['data', 'downloads']));

const format = compose(
  join('\n    '),
  map(([k, v]) => `${startCase(k)}: ${v}`),
  toPairs()
);

const fetchDownloads = pkg => {
  const pkgUrl = downloadsUrl(pkg);
  const timeframeUrls = map(pkgUrl, timeframes);
  return Promise.map(
    timeframeUrls,
    getDownloads
  ).spread((lastDay, lastWeek, lastMonth) => ({
    package: pkg,
    lastDay,
    lastWeek,
    lastMonth
  }));
};

Promise.map(packages, fetchDownloads)
  .then(compose(join('\n'), map(format)))
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
