const isNil = value => value === null || value === undefined;

function streak(list) {
  let lastItem;
  let currentStreak;
  let highestStreak = 0;
  let streakValue;

  for (const item of list) {
    currentStreak =
      !isNil(lastItem) && lastItem === item ? currentStreak + 1 : 1;

    if (currentStreak > highestStreak) {
      highestStreak = currentStreak;
      streakValue = item;
    }

    lastItem = item;
  }

  return { count: highestStreak, value: streakValue };
}

const array = [
  2,
  5,
  3,
  1,
  1,
  1,
  3,
  7,
  9,
  6,
  4,
  'a',
  'a',
  'a',
  'a',
  'a',
  4,
  7,
  2,
  3,
  1,
  1,
  4,
  3,
];

console.log(streak(array));
