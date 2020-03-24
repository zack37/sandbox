const pattern = /[aeiou]/i;
const vowelCount = s =>
  s
    .split('')
    .filter(x => pattern.test(x))
    .map(x => x.toLowerCase())
    .reduce(
      (acc, cur) => ({
        ...acc,
        sum: (acc.sum || 0) + 1,
        [cur]: (acc[cur] || 0) + 1,
      }),
      {},
    );

[
  'banana',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget blandit enim. Vivamus turpis nunc, fringilla quis ligula ultrices, tincidunt.',
].forEach(x => console.log(x, vowelCount(x)));
