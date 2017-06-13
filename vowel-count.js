const pattern = /[aeiou]/i;
const vowelCount = s =>
  s.split('').filter(x => pattern.test(x)).map(x => x.toLowerCase()).reduce((
    acc,
    cur
  ) => {
    acc[cur] = (acc[cur] || 0) + 1;
    acc.sum += 1;
    return acc;
  }, { sum: 0 });

[
  'banana',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget blandit enim. Vivamus turpis nunc, fringilla quis ligula ultrices, tincidunt.'
].forEach(x => console.log(x, vowelCount(x)));
