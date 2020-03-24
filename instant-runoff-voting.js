const { sortBy } = require('ramda');

const BALLOT_PATTERN = /((?<name>[\w\s]+):? ?(?<rank>\d+))/gim;

const countVotes = ballots => {
  if (!ballots.length) {
    return '';
  }

  const firstChoices = ballots.map(b => b.options.find(o => o.choice === 1));
  console.log(firstChoices);
  const rankedFirstChoices = firstChoices.reduce(
    (acc, cur) => ({ ...acc, [cur.name]: (acc[cur.name] || 0) + 1 }),
    {},
  );
  console.log(rankedFirstChoices);
};

const getAllMatches = (pattern, string) => {
  let match,
    indexes = [];
  while ((match = pattern.exec(string))) {
    indexes.push(match.groups);
  }

  return indexes;
};

console.log(
  countVotes([
    {
      options: [
        { name: 'Barack Obama', choice: 3 },
        { name: 'Francois Hollande', choice: 2 },
        { name: 'Angela Merkel', choice: 1 },
      ],
    },
    {
      options: [
        { name: 'Barack Obama', choice: 3 },
        { name: 'Francois Hollande', choice: 2 },
        { name: 'Angela Merkel', choice: 1 },
      ],
    },
    {
      options: [
        { name: 'Barack Obama', choice: 1 },
        { name: 'Francois Hollande', choice: 2 },
        { name: 'Angela Merkel', choice: 3 },
      ],
    },
    {
      options: [
        { name: 'Barack Obama', choice: 3 },
        { name: 'Francois Hollande', choice: 1 },
        { name: 'Angela Merkel', choice: 2 },
      ],
    },
    {
      options: [
        { name: 'Barack Obama', choice: 2 },
        { name: 'Francois Hollande', choice: 3 },
        { name: 'Angela Merkel', choice: 1 },
      ],
    },
    {
      options: [
        { name: 'Barack Obama', choice: 1 },
        { name: 'Francois Hollande', choice: 2 },
        { name: 'Angela Merkel', choice: 3 },
      ],
    },
  ]),
);

console.log(
  getAllMatches(
    BALLOT_PATTERN,
    'Barrack Obama: 3 Francois Hollande: 2 Angela Merkel: 1',
  ),
  // BALLOT_PATTERN.exec('Barrack Obama: 3 Francois Hollande: 2 Angela Merkel: 1'),
);
